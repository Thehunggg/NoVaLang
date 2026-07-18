#!/usr/bin/env node
/**
 * Validate shared curriculum output for Web + Flutter.
 * Run: npm run validate:curriculum
 */

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  looksVietnamese,
  validateByNativeMap,
  validateTranslationsMap,
} from "./lib/native-localization.mjs";
import { containsKana } from "./lib/japanese-pronunciation.mjs";
import { requireGeneratedQ14Romanization } from "./lib/q14-romanization-validation.mjs";
import { runSoftLinguisticChecks } from "../tools/lib/soft-linguistic-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];
const FREE_TYPES = new Set([
  "characterCard",
  "chooseMeaning",
  "chooseReading",
  "chooseVocabulary",
  "fillMissingCharacter",
  "soundToCharacter",
  "nextInSequence",
  "chooseCorrectPair",
  "matchPairs",
  "fillBlank",
  "chooseCorrectAnswer",
  "listenAndChoose",
  "typeAnswer",
]);
const PLUS_TYPES = new Set([
  "listeningGapFill",
  "plusListeningVocabularyChallenge",
  "controlledAiQa",
  "aiFeedbackReview",
]);
const SUPPORTED_TYPES = new Set([...FREE_TYPES, ...PLUS_TYPES]);
const EXPECTED_SLOT_TYPES = [
  "chooseMeaning",
  "chooseVocabulary",
  "matchPairs",
  "fillBlank",
  "chooseCorrectAnswer",
  "listenAndChoose",
  "typeAnswer",
  "listeningGapFill",
  "controlledAiQa",
  "aiFeedbackReview",
];
/** Foundation character drills use a proven listen/read/fill/sequence pattern. */
const FOUNDATION_SLOT_TYPES = [
  "matchPairs",
  "listenAndChoose",
  "chooseCorrectAnswer",
  "fillBlank",
  "chooseVocabulary",
  "chooseMeaning",
  "typeAnswer",
  "listeningGapFill",
  "controlledAiQa",
  "aiFeedbackReview",
];
const HIRAGANA_L1_SLOT_TYPES = [
  "matchPairs",
  "listenAndChoose",
  "chooseReading",
  "fillMissingCharacter",
  "soundToCharacter",
  "nextInSequence",
  "chooseCorrectPair",
  "plusListeningVocabularyChallenge",
  "controlledAiQa",
  "aiFeedbackReview",
];
const DAILY_MODULE_ONE_SLOT_TYPES = [
  "matchPairs", "listenAndChoose", "multipleChoiceMeaning", "typeAnswer",
  "arrange", "dialogueCompletion", "naturalResponseChoice",
  "plusListeningVocabularyChallenge", "controlledAiQa", "aiFeedbackReview",
];
const KANJI_RE = /[\u3400-\u4dbf\u4e00-\u9fff]/u;
const FOUNDATION_MODULES = new Set([
  "hiragana_starter",
  "katakana_starter",
  "alphabet_starter",
]);
const BLANK_RE = /_|＿|\{blank\}|\[blank\]/;
const FILL_PROMPT_RE = /fill|missing|blank|điền|còn thiếu|空欄|빈칸|缺少/i;
const EXPECTED_HIRAGANA_46 = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split("");
const EXPECTED_KATAKANA_46 = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
const EXPECTED_ALPHABET_26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const EXPECTED_HIRAGANA_ROWS = [
  "あいうえお", "かきくけこ", "さしすせそ", "たちつてと", "なにぬねの",
  "はひふへほ", "まみむめも", "やゆよ", "らりるれろ", "わをん",
];
const EXPECTED_KATAKANA_ROWS = [
  "アイウエオ", "カキクケコ", "サシスセソ", "タチツテト", "ナニヌネノ",
  "ハヒフヘホ", "マミムメモ", "ヤユヨ", "ラリルレロ", "ワヲン",
];

export const errors = [];
const fail = (msg) => errors.push(msg);

async function loadJson(rel) {
  const raw = await readFile(path.join(ROOT, rel), "utf8");
  return JSON.parse(raw);
}

function hasUnique(arr) {
  return new Set(arr).size === arr.length;
}

function validateTranslations(map, label) {
  if (!map || typeof map !== "object") {
    fail(`${label}: missing translations object`);
    return;
  }
  for (const code of NATIVE_CODES) {
    if (!map[code] || String(map[code]).trim() === "") {
      fail(`${label}: missing translation for ${code}`);
    }
  }
}

function validateExerciseNativeLocalization(lesson, ex, index) {
  const label = `${lesson.id} exercise[${index + 1}] (${ex.id})`;

  if (ex.feedbackCorrectByNative) {
    validateByNativeMap(ex.feedbackCorrectByNative, `${label} feedbackCorrectByNative`, fail);
  }
  if (ex.feedbackWrongByNative) {
    validateByNativeMap(ex.feedbackWrongByNative, `${label} feedbackWrongByNative`, fail);
  }
  if (ex.feedbackByNative) {
    validateByNativeMap(ex.feedbackByNative, `${label} feedbackByNative`, fail);
  }
  if (ex.displayTextByNative) {
    validateByNativeMap(ex.displayTextByNative, `${label} displayTextByNative`, fail);
  } else if (ex.displayText && looksVietnamese(ex.displayText)) {
    fail(`${label}: displayText is Vietnamese-only; add displayTextByNative`);
  }

  if (ex.audioCardLabelByNative) {
    validateByNativeMap(ex.audioCardLabelByNative, `${label} audioCardLabelByNative`, fail);
  } else if (ex.audioCardLabel && looksVietnamese(ex.audioCardLabel)) {
    fail(`${label}: audioCardLabel is Vietnamese-only; add audioCardLabelByNative`);
  }

  if (ex.revealAfterAnswerByNative) {
    validateByNativeMap(ex.revealAfterAnswerByNative, `${label} revealAfterAnswerByNative`, fail);
  }

  for (const card of ex.cards ?? []) {
    if (card.meaningByNative) {
      validateByNativeMap(card.meaningByNative, `${label} card ${card.id} meaningByNative`, fail);
    }
    if (card.feedbackByNative) {
      validateByNativeMap(card.feedbackByNative, `${label} card ${card.id} feedbackByNative`, fail);
    }
  }

  for (const [sqIndex, sq] of (ex.subQuestions ?? []).entries()) {
    const sqLabel = `${label} subQuestion[${sqIndex + 1}]`;
    if (sq.prompts) validateTranslationsMap(sq.prompts, `${sqLabel} prompts`, fail);
    if (sq.feedbackCorrectByNative) {
      validateByNativeMap(sq.feedbackCorrectByNative, `${sqLabel} feedbackCorrectByNative`, fail);
    }
    if (sq.feedbackWrongByNative) {
      validateByNativeMap(sq.feedbackWrongByNative, `${sqLabel} feedbackWrongByNative`, fail);
    }
    if (sq.revealAfterAnswerByNative) {
      validateByNativeMap(sq.revealAfterAnswerByNative, `${sqLabel} revealAfterAnswerByNative`, fail);
    } else if (sq.revealAfterAnswer) {
      fail(`${sqLabel}: revealAfterAnswer must use revealAfterAnswerByNative`);
    }
    if (sq.audioCardLabelByNative) {
      validateByNativeMap(sq.audioCardLabelByNative, `${sqLabel} audioCardLabelByNative`, fail);
    } else if (sq.audioCardLabel && looksVietnamese(sq.audioCardLabel)) {
      fail(`${sqLabel}: audioCardLabel is Vietnamese-only; add audioCardLabelByNative`);
    }
    if (sq.visibleBeforeAnswerByNative) {
      validateByNativeMap(sq.visibleBeforeAnswerByNative, `${sqLabel} visibleBeforeAnswerByNative`, fail);
    } else if (sq.visibleBeforeAnswer && looksVietnamese(sq.visibleBeforeAnswer)) {
      fail(`${sqLabel}: visibleBeforeAnswer is Vietnamese-only; add visibleBeforeAnswerByNative`);
    }
    if (sq.prompt && looksVietnamese(sq.prompt) && !sq.prompts?.en) {
      fail(`${sqLabel}: legacy prompt is Vietnamese; prompts.en must exist`);
    }
  }
}

function validateExercise(lesson, ex, index) {
  const label = `${lesson.id} exercise[${index + 1}] (${ex.id})`;
  const isFoundation = FOUNDATION_MODULES.has(lesson.moduleId);
  const foundationSlots =
    lesson.id === "ja-hiragana-u1-l1"
      ? HIRAGANA_L1_SLOT_TYPES
      : FOUNDATION_SLOT_TYPES;
  let expectedType = (isFoundation ? foundationSlots : EXPECTED_SLOT_TYPES)[index];
  // Katakana / English alphabet Exercise 8 use listening-vocabulary challenge (not gap-fill).
  if (
    isFoundation &&
    index === 7 &&
    (String(lesson.id).includes("katakana") || String(lesson.id).startsWith("en-alphabet-u1-"))
  ) {
    expectedType = "plusListeningVocabularyChallenge";
  }
  if (!SUPPORTED_TYPES.has(ex.type)) {
    fail(`${label}: unsupported type "${ex.type}"`);
  }
  if (ex.type !== expectedType) {
    fail(`${label}: expected type ${expectedType}, got ${ex.type}`);
  }

  if (index < 7) {
    if (ex.access !== "free" || ex.plusOnly === true) {
      fail(`${label}: exercises 1–7 must be free`);
    }
    if (ex.usesAi === true) {
      fail(`${label}: free exercises must not use AI`);
    }
  } else {
    if (ex.access !== "plus" || ex.plusOnly !== true) {
      fail(`${label}: exercises 8–10 must be Plus gated`);
    }
  }

  if (ex.type === "listeningGapFill" && ex.usesAi === true) {
    fail(`${label}: listeningGapFill must not use AI API`);
  }
  if (ex.type === "controlledAiQa") {
    if (ex.openEndedChat === true) {
      fail(`${label}: controlledAiQa must not be open-ended chat`);
    }
    if (ex.aiMode !== "controlled_qa") {
      fail(`${label}: controlledAiQa must use aiMode=controlled_qa`);
    }
    if ((ex.maxUserChars ?? 0) < 300 || (ex.maxUserChars ?? 0) > 500) {
      fail(`${label}: maxUserChars should be 300–500`);
    }
    if (ex.saveChatHistory === true) {
      fail(`${label}: must not save long chat history`);
    }
  }
  if (ex.type === "aiFeedbackReview") {
    if (ex.triggerExtraAiCallByDefault === true || ex.usesAi === true) {
      fail(`${label}: aiFeedbackReview must not trigger extra AI call by default`);
    }
    if (ex.reusesPreviousAiFeedback !== true) {
      fail(`${label}: aiFeedbackReview should reuse Exercise 9 feedback`);
    }
  }

  if (ex.prompts) validateTranslations(ex.prompts, `${label} prompts`);

  if (ex.type === "chooseMeaning" || ex.type === "listenAndChoose") {
    const byNative = ex.optionsByNative;
    if (!byNative) {
      fail(`${label}: missing optionsByNative for native-language meanings`);
    } else {
      for (const code of NATIVE_CODES) {
        const opts = byNative[code];
        if (!Array.isArray(opts) || opts.length !== 4) {
          fail(`${label}: optionsByNative.${code} must have 4 options`);
          continue;
        }
        if (!hasUnique(opts)) fail(`${label}: duplicate optionsByNative.${code}`);
        const accepted = ex.acceptedAnswersByNative?.[code];
        if (!accepted?.length) {
          fail(`${label}: missing acceptedAnswersByNative.${code}`);
        } else if (!opts.includes(accepted[0])) {
          fail(`${label}: correct answer missing from optionsByNative.${code}`);
        }
      }
    }
  }

  if (Array.isArray(ex.options) && !hasUnique(ex.options)) {
    fail(`${label}: duplicate options`);
  }
  if (Array.isArray(ex.optionsVi) && !hasUnique(ex.optionsVi)) {
    fail(`${label}: duplicate optionsVi`);
  }

  if (
    [
      "chooseMeaning",
      "chooseReading",
      "chooseVocabulary",
      "fillBlank",
      "fillMissingCharacter",
      "soundToCharacter",
      "nextInSequence",
      "chooseCorrectPair",
      "chooseCorrectAnswer",
      "listenAndChoose",
    ].includes(
      ex.type,
    )
  ) {
    const opts = ex.options ?? [];
    if (opts.length !== 4) fail(`${label}: multiple choice must have 4 options`);
    const correctCount = opts.filter((o) => o === ex.correctAnswer).length;
    if (correctCount !== 1) {
      fail(`${label}: multiple choice must have exactly 1 correct answer`);
    }
  }

  if (ex.type === "matchPairs") {
    const pairs = ex.pairs ?? [];
    if (pairs.length < 3) fail(`${label}: matchPairs needs at least 3 pairs`);
    const lefts = pairs.map((p) => p.left);
    const rights = pairs.map((p) => p.right);
    if (!hasUnique(lefts) || !hasUnique(rights)) {
      fail(`${label}: matchPairs has duplicate left/right labels`);
    }
    if (ex.pairsByNative) {
      for (const code of NATIVE_CODES) {
        const nativePairs = ex.pairsByNative[code];
        if (!nativePairs?.length) {
          fail(`${label}: missing pairsByNative.${code}`);
          continue;
        }
        const nativeRights = nativePairs.map((p) => p.right);
        if (!hasUnique(nativeRights)) {
          fail(`${label}: duplicate pairsByNative.${code} rights`);
        }
      }
    }
  }

  if (isFoundation) {
    validateFoundationExerciseQuality(lesson, ex, index);
  }

  validateExerciseNativeLocalization(lesson, ex, index);
}

function validateReadyDailyModuleOneLesson(lesson) {
  const exercises = lesson.exercises ?? [];
  if (exercises.length !== 10) fail(`${lesson.id}: Module 1 must have exactly 10 exercises`);
  exercises.forEach((ex, index) => {
    const expected = DAILY_MODULE_ONE_SLOT_TYPES[index];
    const actual = index === 4 && ["arrangeWords", "arrangeLetters"].includes(ex?.type)
      ? "arrange"
      : ex?.type;
    if (actual !== expected) fail(`${lesson.id} e${index + 1}: expected ${expected}, got ${ex?.type}`);
    const plan = index < 7 ? "free" : "plus";
    if (ex?.access !== plan || ex?.plusOnly !== (plan === "plus")) {
      fail(`${lesson.id} e${index + 1}: must be ${plan}`);
    }
    if (ex?.status !== "ready") fail(`${lesson.id} e${index + 1}: must be ready`);
  });
  const e4 = exercises[3];
  if (e4?.type !== "typeAnswer" || !(e4.acceptedAnswers ?? []).length) {
    fail(`${lesson.id}: Exercise 4 must be Unicode text input with acceptedAnswers`);
  }
  for (const [code, hint] of Object.entries(e4?.hintByNative ?? {})) {
    if (String(hint).trim() === String(e4.correctAnswer).trim()) {
      fail(`${lesson.id}: Exercise 4 hintByNative.${code} leaks correctAnswer`);
    }
  }
  const e5 = exercises[4];
  if ((e5?.tiles ?? []).join(e5?.type === "arrangeWords" ? " " : "") === e5?.correctAnswer) {
    fail(`${lesson.id}: Exercise 5 tiles must be shuffled`);
  }
  const e8 = exercises[7];
  if ((e8?.subQuestions ?? []).length !== 5) fail(`${lesson.id}: Exercise 8 must have exactly 5 subQuestions`);
  for (const sq of e8?.subQuestions ?? []) {
    for (const field of ["speechText", "audioLocale", "correctAnswer"]) {
      if (!sq[field]) fail(`${lesson.id} ${sq.id}: missing ${field}`);
    }
    if (!(sq.options ?? []).length || !sq.revealAfterAnswerByNative) fail(`${lesson.id} ${sq.id}: incomplete listening question`);
  }
  const e9 = exercises[8];
  if (e9?.maxCycles !== 1 || e9?.openEndedChat === true || e9?.maxUserChars > 500) {
    fail(`${lesson.id}: Exercise 9 must be one controlled AI cycle`);
  }
  if (exercises[9]?.usesAi === true || exercises[9]?.triggerExtraAiCallByDefault === true) {
    fail(`${lesson.id}: Exercise 10 must not call AI`);
  }
  const dialogueGroups = lesson.dialogueGroups ?? [];
  if (dialogueGroups.length !== 3) {
    fail(`${lesson.id}: dialogueGroups must have exactly 3 short dialogues`);
  }
  for (const [groupIndex, group] of dialogueGroups.entries()) {
    if (!group?.titleByNative?.vi || !group?.situationByNative?.vi) {
      fail(`${lesson.id} dialogue ${groupIndex + 1}: missing title/situation by native`);
    }
    const lines = group.lines ?? [];
    if (lines.length < 4 || lines.length > 6) {
      fail(`${lesson.id} dialogue ${groupIndex + 1}: must have 4-6 lines`);
    }
    for (const line of lines) {
      for (const field of ["displayText", "speechText", "audioLocale"]) {
        if (!line[field]) fail(`${lesson.id} ${line.id}: dialogue missing ${field}`);
      }
      if (!line.speaker && !line.speakerId) fail(`${lesson.id} ${line.id}: dialogue missing speaker or speakerId`);
      for (const code of ["vi", "en", "ja"]) {
        if (!line.translationByNative?.[code]) fail(`${lesson.id} ${line.id}: missing dialogue translation ${code}`);
      }
      if (lesson.languageCode === "ja" && KANJI_RE.test(line.displayText) && !line.reading) {
        fail(`${lesson.id} ${line.id}: Japanese kanji must include hiragana reading`);
      }
    }
  }
  const flatDialogue = lesson.dialogue ?? [];
  const expectedFlat = dialogueGroups.reduce((sum, group) => sum + (group.lines?.length ?? 0), 0);
  if (flatDialogue.length !== expectedFlat) {
    fail(`${lesson.id}: dialogue flat list must match dialogueGroups lines`);
  }
  for (const item of lesson.vocabulary ?? []) {
    if (!item.speechText || !item.audioLocale || !item.translationByNative) fail(`${lesson.id} ${item.id}: incomplete phrase card`);
    if (lesson.languageCode === "ja" && KANJI_RE.test(item.displayText) && !item.reading) {
      fail(`${lesson.id} ${item.id}: Japanese kanji must include hiragana reading`);
    }
  }
}

function qualityFail(lesson, ex, index, reason) {
  fail(
    [
      `courseId=${lesson.languageCode}-${lesson.nicheId}`,
      `lessonId=${lesson.id}`,
      `exerciseIndex=${index + 1}`,
      `exerciseType=${ex.type}`,
      `reason=${reason}`,
      `visiblePrompt=${JSON.stringify(ex.prompt ?? "")}`,
      `displayText=${JSON.stringify(ex.displayText ?? "")}`,
      `correctAnswer=${JSON.stringify(ex.correctAnswer ?? "")}`,
    ].join(" | "),
  );
}

function validateFoundationExerciseQuality(lesson, ex, index) {
  const visible = String(ex.displayText ?? "");
  const promptBlob = `${ex.prompt ?? ""} ${ex.promptVi ?? ""} ${Object.values(ex.prompts ?? {}).join(" ")}`;
  const correct = String(ex.correctAnswer ?? "");
  const allowVisibleAnswer = ex.answerVisibleOk === true || index === 0;

  if (Array.isArray(ex.options) && !hasUnique(ex.options)) {
    qualityFail(lesson, ex, index, "multiple choice has duplicate options");
  }

  if (ex.type === "fillBlank" || ex.type === "fillMissingCharacter" || ex.type === "listeningGapFill") {
    const texts = ex.type === "listeningGapFill"
      ? (ex.gapSentences ?? []).map((s) => s.text)
      : [visible];
    for (const text of texts) {
      if (!BLANK_RE.test(text ?? "")) {
        qualityFail(lesson, ex, index, "fill/gap exercise missing blank marker");
      }
      if (correct && String(text).includes(correct)) {
        qualityFail(lesson, ex, index, "fill/gap visible text includes correct answer");
      }
    }
  }

  if (FILL_PROMPT_RE.test(promptBlob) && ex.type !== "controlledAiQa" && ex.type !== "aiFeedbackReview") {
    const checkText = ex.type === "listeningGapFill"
      ? (ex.gapSentences ?? []).map((s) => s.text).join("\n")
      : visible;
    if (checkText && !BLANK_RE.test(checkText)) {
      qualityFail(lesson, ex, index, "prompt asks to fill blank but visible text has no blank");
    }
  }

  if (ex.type === "listenAndChoose") {
    if (correct && visible === correct) {
      qualityFail(lesson, ex, index, "listen-and-choose displays correct answer in card");
    }
    if (ex.hideSpeechLabel !== true) {
      qualityFail(lesson, ex, index, "listen-and-choose must hide speech label / not reveal audio text");
    }
    if (ex.reading === correct || ex.romanization === correct) {
      // reading/romanization fields on listen card can leak for character answers
    }
    if (ex.reading || ex.romanization) {
      qualityFail(lesson, ex, index, "listen-and-choose must not expose reading/romanization on the audio card");
    }
  }

  if (
    !allowVisibleAnswer &&
    correct &&
    [
      "chooseVocabulary",
      "listenAndChoose",
      "fillBlank",
      "fillMissingCharacter",
      "soundToCharacter",
      "nextInSequence",
      "chooseCorrectPair",
      "typeAnswer",
    ].includes(ex.type)
  ) {
    if (visible === correct) {
      qualityFail(lesson, ex, index, "correct answer appears as visible clue/card text");
    }
    if (ex.speechText && String(ex.speechText) === correct && ex.hideSpeechLabel !== true) {
      qualityFail(lesson, ex, index, "audio card speechText equals correct answer without hideSpeechLabel");
    }
  }

  if (ex.sequenceMode === "gojuon_next" || (ex.type === "typeAnswer" && String(visible).includes("→"))) {
    const parts = String(visible)
      .split("→")
      .map((p) => p.trim())
      .filter((p) => p && p !== "?");
    const lessonOrder = (lesson.vocabulary ?? [])
      .map((v) => v.displayText || v.text)
      .filter(Boolean);

    if (lesson.moduleId === "alphabet_starter") {
      // Alphabet lessons teach non-consecutive letter groups (e.g. vowels).
      // Sequence must follow this lesson's vocabulary order.
      for (let i = 0; i < parts.length - 1; i += 1) {
        const a = lessonOrder.indexOf(parts[i]);
        const b = lessonOrder.indexOf(parts[i + 1]);
        if (a < 0 || b !== a + 1) {
          qualityFail(lesson, ex, index, "alphabet sequence is not lesson vocabulary order");
          break;
        }
      }
      const lastShown = parts[parts.length - 1];
      const next = lessonOrder[lessonOrder.indexOf(lastShown) + 1];
      if (next && correct !== next) {
        qualityFail(lesson, ex, index, `alphabet sequence next expected ${next}, got ${correct}`);
      }
    } else {
      const canon =
        lesson.moduleId === "katakana_starter"
          ? EXPECTED_KATAKANA_46
          : EXPECTED_HIRAGANA_46;
      for (let i = 0; i < parts.length - 1; i += 1) {
        const a = canon.indexOf(parts[i]);
        const b = canon.indexOf(parts[i + 1]);
        if (a < 0 || b < 0 || b !== a + 1) {
          qualityFail(lesson, ex, index, "sequence order is not canonical gojūon order");
          break;
        }
      }
      const lastShown = parts[parts.length - 1];
      const next = canon[canon.indexOf(lastShown) + 1];
      if (next && correct !== next) {
        qualityFail(lesson, ex, index, `sequence next expected ${next}, got ${correct}`);
      }
    }
  }
}

/**
 * Mechanical regression guard for the systemic bug fixed under
 * NOVALANG-PRONUNCIATION-TRANSFORMATION-GOVERNANCE-01: a "romanization"
 * field that is actually still raw hiragana/katakana (previously produced
 * by code that copied `reading` verbatim into `romanization`). Walks the
 * full lesson object — vocabulary, dialogue, exercises, sub-questions,
 * examples — so it catches this bug class regardless of which field path
 * introduces it, not just the specific call sites known today.
 */
function validateNoRawKanaInRomanization(lesson) {
  const visit = (node, path) => {
    if (node == null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((entry, i) => visit(entry, `${path}[${i}]`));
      return;
    }
    if (typeof node.romanization === "string" && containsKana(node.romanization)) {
      fail(
        `${lesson.id} ${path}: romanization must not contain raw kana ("${node.romanization}")`,
      );
    }
    for (const key of Object.keys(node)) visit(node[key], `${path}.${key}`);
  };
  visit(lesson, lesson.id);
}

function isKanaFoundationLesson(lesson) {
  return (
    lesson.languageCode === "ja" &&
    lesson.nicheId === "core_foundation" &&
    (lesson.moduleId === "hiragana_starter" ||
      lesson.moduleId === "katakana_starter" ||
      String(lesson.id).includes("hiragana") ||
      String(lesson.id).includes("katakana"))
  );
}

function validateJapaneseItem(lesson, item, label) {
  if (lesson.languageCode !== "ja") return;
  if (!item.reading) fail(`${label}: missing reading`);
  if (!item.romanization) fail(`${label}: missing romanization`);
  if (!item.speechText) fail(`${label}: missing speechText`);
  if (item.translations) validateTranslations(item.translations, `${label} translations`);
  else fail(`${label}: missing translations vi/en/ja/ko/zh`);

  if (!isKanaFoundationLesson(lesson)) return;

  const text = item.displayText || item.text || "";
  const exampleText = item.exampleText || item.exampleSentence || item.exampleDisplay || "";
  if (!exampleText) fail(`${label}: missing exampleText`);
  if (exampleText === text) {
    fail(`${label}: exampleText must not be identical to kana text "${text}"`);
  }
  if (!item.exampleReading && !item.exampleText) {
    fail(`${label}: missing exampleReading`);
  } else if (!item.exampleReading && item.exampleText) {
    // exampleReading may equal exampleText for kana words
  }
  if (!item.exampleReading) fail(`${label}: missing exampleReading`);
  if (!item.exampleRomanization) fail(`${label}: missing exampleRomanization`);
  if (!item.exampleSpeechText && !item.exampleSpeechTextLegacy) {
    fail(`${label}: missing exampleSpeechText`);
  }
  if (item.exampleTranslations) {
    validateTranslations(item.exampleTranslations, `${label} exampleTranslations`);
  } else {
    fail(`${label}: missing exampleTranslations vi/en/ja/ko/zh`);
  }

  const meaningEn = item.meaningEn || item.translations?.en || "";
  const exampleEn = item.exampleTranslations?.en || "";
  if (meaningEn && exampleEn && meaningEn === exampleEn) {
    fail(
      `${label}: example translation must not reuse kana meaning ("${meaningEn}")`,
    );
  }
}

function validateKanaCoverage(lessons, { script, moduleId, expected }) {
  const items = lessons
    .filter((lesson) => lesson.languageCode === "ja" && lesson.moduleId === moduleId)
    .flatMap((lesson) =>
      (lesson.vocabulary ?? [])
        .filter((item) => item.isBasicKana === true || item.kanaScript === script)
        .map((item) => ({ lesson, item })),
    );

  const byOrder = new Map();
  const seenChars = new Map();
  for (const { lesson, item } of items) {
    const kana = item.displayText || item.text || "";
    const actualOrder = item.characterOrder ?? item.displayOrder;
    if (!Number.isInteger(actualOrder)) {
      fail(`${lesson.id}: ${kana}: missing characterOrder/displayOrder`);
      continue;
    }
    const expectedOrder = expected.indexOf(kana) + 1;
    if (expectedOrder <= 0) {
      fail(`${lesson.id}: ${kana}: not part of canonical ${script} basic 46`);
      continue;
    }
    if (actualOrder !== expectedOrder || item.displayOrder !== expectedOrder) {
      fail(`${lesson.id}: ${kana}: expectedOrder=${expectedOrder}, actualOrder=${actualOrder}, displayOrder=${item.displayOrder}`);
    }
    if (byOrder.has(actualOrder)) {
      fail(`${lesson.id}: ${kana}: duplicate ${script} order ${actualOrder} also used by ${byOrder.get(actualOrder)}`);
    }
    byOrder.set(actualOrder, kana);
    if (seenChars.has(kana)) {
      fail(`${lesson.id}: ${kana}: duplicate ${script} character also in ${seenChars.get(kana)}`);
    }
    seenChars.set(kana, lesson.id);
  }

  const actual = [...byOrder.entries()].sort((a, b) => a[0] - b[0]).map(([, kana]) => kana);
  const missing = expected.filter((kana) => !seenChars.has(kana));
  if (missing.length) fail(`${script}: missing basic kana: ${missing.join(", ")}`);
  if (actual.join("") !== expected.join("")) {
    fail(`${script}: canonical order mismatch; expected ${expected.join("")}, got ${actual.join("")}`);
  }
  if (items.length !== expected.length) {
    fail(`${script}: expected ${expected.length} basic kana items, got ${items.length}`);
  }
}

function validateAlphabetCoverage(lessons) {
  const seen = new Map();
  for (const lesson of lessons.filter((l) => l.languageCode === "en" && l.moduleId === "alphabet_starter")) {
    for (const item of lesson.vocabulary ?? []) {
      const letter = String(item.displayText || item.text || "").toUpperCase();
      if (!/^[A-Z]$/.test(letter)) continue;
      const expectedOrder = EXPECTED_ALPHABET_26.indexOf(letter) + 1;
      const actualOrder = item.characterOrder ?? item.displayOrder;
      if (actualOrder !== expectedOrder || item.displayOrder !== expectedOrder) {
        fail(`${lesson.id}: ${letter}: expected alphabet order ${expectedOrder}, got ${actualOrder}/${item.displayOrder}`);
      }
      if (String(lesson.id).endsWith("-l6")) continue;
      if (seen.has(letter)) fail(`${lesson.id}: duplicate alphabet letter ${letter} also in ${seen.get(letter)}`);
      seen.set(letter, lesson.id);
    }
  }
  const missing = EXPECTED_ALPHABET_26.filter((letter) => !seen.has(letter));
  if (missing.length) fail(`English Alphabet Starter must include all A-Z; missing: ${missing.join(", ")}`);
}

function lessonSpecFail(lesson, ex, index, reason, extra = {}) {
  fail(
    [
      `courseId=${lesson.languageCode}-${lesson.nicheId}`,
      `lessonId=${lesson.id}`,
      Number.isInteger(index) && `exerciseIndex=${index + 1}`,
      Number.isInteger(extra.subQuestionIndex) && `subQuestionIndex=${extra.subQuestionIndex + 1}`,
      ex?.type && `exerciseType=${ex.type}`,
      `reason=${reason}`,
      extra.visibleText !== undefined && `visibleText=${JSON.stringify(extra.visibleText)}`,
      (extra.prompt ?? ex?.prompt) !== undefined && `prompt=${JSON.stringify(extra.prompt ?? ex?.prompt)}`,
      (extra.correctAnswer ?? ex?.correctAnswer) !== undefined &&
        `correctAnswer=${JSON.stringify(extra.correctAnswer ?? ex?.correctAnswer)}`,
    ]
      .filter(Boolean)
      .join(" | "),
  );
}

function validateHiraganaLessonOneSpec(lesson) {
  const exercises = lesson.exercises ?? [];
  if (exercises.length !== 10) {
    lessonSpecFail(lesson, null, null, `Lesson Hiragana 1 must have 10 exercises, got ${exercises.length}`);
    return;
  }

  HIRAGANA_L1_SLOT_TYPES.forEach((expectedType, index) => {
    const ex = exercises[index];
    if (ex?.type !== expectedType) {
      lessonSpecFail(lesson, ex, index, `expected ${expectedType}, got ${ex?.type}`);
    }
    if (index < 7 && (ex?.access !== "free" || ex?.plusOnly === true)) {
      lessonSpecFail(lesson, ex, index, "Exercise 1-7 must be Free");
    }
    if (index >= 7 && (ex?.access !== "plus" || ex?.plusOnly !== true)) {
      lessonSpecFail(lesson, ex, index, "Exercise 8-10 must be Plus");
    }
  });

  if (JSON.stringify(lesson).includes("こんにちは")) {
    lessonSpecFail(lesson, exercises[0], 0, "こんにちは must not appear in Hiragana Lesson 1");
  }

  const e1 = exercises[0];
  if (e1?.type !== "matchPairs") {
    lessonSpecFail(lesson, e1, 0, `Exercise 1 must be matchPairs, got ${e1?.type}`);
  } else {
    const pairs = e1.pairs ?? [];
    if (pairs.length !== 5) {
      lessonSpecFail(lesson, e1, 0, `Exercise 1 must have exactly 5 pairs, got ${pairs.length}`);
    }
    const leftSet = new Set(pairs.map((p) => p.left));
    const rightSet = new Set(pairs.map((p) => p.right));
    for (const kana of ["あ", "い", "う", "え", "お"]) {
      if (!leftSet.has(kana)) {
        lessonSpecFail(lesson, e1, 0, `Exercise 1 missing pair for ${kana}`);
      }
    }
    for (const sound of ["a", "i", "u", "e", "o"]) {
      if (!rightSet.has(sound)) {
        lessonSpecFail(lesson, e1, 0, `Exercise 1 missing sound ${sound}`);
      }
    }
    validateTranslations(e1.prompts ?? { en: e1.prompt, vi: e1.promptVi }, `${lesson.id} e1 prompts`);
    validateByNativeMap(e1.instructionByNative, `${lesson.id} e1 instructionByNative`, fail);
    validateByNativeMap(e1.feedbackCorrectByNative, `${lesson.id} e1 feedbackCorrectByNative`, fail);
    validateByNativeMap(e1.feedbackWrongByNative, `${lesson.id} e1 feedbackWrongByNative`, fail);
  }

  const e2 = exercises[1];
  if (e2.hideSpeechLabel !== true || e2.displayText === e2.speechText || e2.displayText === e2.correctAnswer) {
    lessonSpecFail(lesson, e2, 1, "listenAndChoose must not reveal speechText/correctAnswer before answer");
  }
  if (e2.reading || e2.romanization) {
    lessonSpecFail(lesson, e2, 1, "listenAndChoose must not expose reading/romanization");
  }

  const e4 = exercises[3];
  if (!BLANK_RE.test(e4.displayText ?? "")) {
    lessonSpecFail(lesson, e4, 3, "fill missing character must include blank marker");
  }
  if (String(e4.displayText ?? "").includes(String(e4.correctAnswer ?? ""))) {
    lessonSpecFail(lesson, e4, 3, "fill missing character visible sequence leaks correct answer");
  }

  const e6 = exercises[5];
  if (e6.displayText !== "あ → い → ?" || e6.correctAnswer !== "う") {
    lessonSpecFail(lesson, e6, 5, "nextInSequence must use あ → い → ? with answer う");
  }

  const e7 = exercises[6];
  const correctCount = (e7.options ?? []).filter((option) => option === e7.correctAnswer).length;
  if (correctCount !== 1 || !hasUnique(e7.options ?? [])) {
    lessonSpecFail(lesson, e7, 6, "chooseCorrectPair must have exactly one correct, no duplicates");
  }

  const e8 = exercises[7];
  const subQuestions = e8.subQuestions ?? [];
  if (subQuestions.length !== 5) {
    lessonSpecFail(lesson, e8, 7, `Exercise 8 must have exactly 5 subQuestions, got ${subQuestions.length}`);
  }
  const expectedStarts = ["あ", "い", "う", "え", "お"];
  const seenStarts = new Set();
  subQuestions.forEach((sq, sqIndex) => {
    for (const field of ["speechText", "options", "correctAnswer", "revealAfterAnswer"]) {
      if (!sq[field] || (Array.isArray(sq[field]) && sq[field].length === 0)) {
        lessonSpecFail(lesson, e8, 7, `subQuestion missing ${field}`, {
          subQuestionIndex: sqIndex,
          prompt: sq.prompt,
          correctAnswer: sq.correctAnswer,
        });
      }
    }
    if (!sq.feedback && (!sq.feedbackCorrectByNative || !sq.feedbackWrongByNative)) {
      lessonSpecFail(lesson, e8, 7, "subQuestion missing feedback", {
        subQuestionIndex: sqIndex,
        prompt: sq.prompt,
        correctAnswer: sq.correctAnswer,
      });
    }
    if (!hasUnique(sq.options ?? [])) {
      lessonSpecFail(lesson, e8, 7, "subQuestion options must be unique", {
        subQuestionIndex: sqIndex,
        prompt: sq.prompt,
        correctAnswer: sq.correctAnswer,
      });
    }
    if (!(sq.options ?? []).includes(sq.correctAnswer)) {
      lessonSpecFail(lesson, e8, 7, "subQuestion options must include correctAnswer", {
        subQuestionIndex: sqIndex,
        prompt: sq.prompt,
        correctAnswer: sq.correctAnswer,
      });
    }
    const visibleBefore = `${sq.visibleBeforeAnswer ?? ""} ${sq.audioCardLabel ?? ""} ${Object.values(sq.visibleBeforeAnswerByNative ?? {}).join(" ")} ${sq.prompt ?? ""}`;
    const revealValues = [
      sq.revealAfterAnswer,
      ...Object.values(sq.revealAfterAnswerByNative ?? {}),
    ].filter(Boolean);
    for (const leaked of [sq.speechText, sq.correctAnswer, ...revealValues]) {
      if (leaked && visibleBefore.includes(leaked)) {
        lessonSpecFail(lesson, e8, 7, "subQuestion visible-before-answer leaks hidden answer data", {
          subQuestionIndex: sqIndex,
          visibleText: visibleBefore,
          prompt: sq.prompt,
          correctAnswer: sq.correctAnswer,
        });
      }
    }
    for (const code of NATIVE_CODES) {
      const reveal = sq.revealAfterAnswerByNative?.[code];
      if (!reveal || !/^[ぁ-ん]+（.+）—\s+.+$/u.test(reveal)) {
        lessonSpecFail(lesson, e8, 7, `revealAfterAnswerByNative.${code} must look like hiragana（kanji）— meaning`, {
          subQuestionIndex: sqIndex,
          visibleText: reveal,
          prompt: sq.prompt,
          correctAnswer: sq.correctAnswer,
        });
      }
    }
    const start = [...String(sq.speechText ?? "")][0];
    seenStarts.add(start);
    if (start !== expectedStarts[sqIndex] || sq.correctAnswer !== expectedStarts[sqIndex]) {
      lessonSpecFail(lesson, e8, 7, `subQuestion must start with ${expectedStarts[sqIndex]}`, {
        subQuestionIndex: sqIndex,
        prompt: sq.prompt,
        correctAnswer: sq.correctAnswer,
      });
    }
  });
  if (expectedStarts.some((kana) => !seenStarts.has(kana))) {
    lessonSpecFail(lesson, e8, 7, `Exercise 8 must cover starts ${expectedStarts.join(", ")}`);
  }

  const kanjiRe = /[\u3400-\u9fff]/u;
  for (const [index, ex] of exercises.entries()) {
    for (const option of ex.options ?? []) {
      if (kanjiRe.test(option)) {
        lessonSpecFail(lesson, ex, index, "Kanji must not be used as a primary answer option for A0", {
          visibleText: option,
        });
      }
    }
    if (typeof ex.correctAnswer === "string" && kanjiRe.test(ex.correctAnswer)) {
      lessonSpecFail(lesson, ex, index, "Kanji must not be used as primary correctAnswer for A0");
    }
  }

  const e9 = exercises[8];
  if (e9.openEndedChat === true || e9.aiMode !== "controlled_qa") {
    lessonSpecFail(lesson, e9, 8, "Exercise 9 must stay controlled AI Q&A");
  }
  const e10 = exercises[9];
  if (e10.triggerExtraAiCallByDefault === true || e10.usesAi === true) {
    lessonSpecFail(lesson, e10, 9, "Exercise 10 must not call AI by default");
  }
}

/**
 * Structural contract for ANY lesson with `lessonFormat === 'five_cards'`
 * (NovaLang Lesson Format 2.0/3.0, .cursor/rules/03_.../04_...): shape,
 * required fields, and generic quality rules that do not depend on which
 * approved lesson content was used. Runs for every five_cards lesson,
 * including the Golden Lesson (which additionally gets
 * validateApprovedGoldenLessonContent, defined inside main()).
 * Exported at module scope (moved out of main()) so a standalone script can
 * import and exercise it directly against a minimal placeholder lesson.
 */
export function validateFiveCardsStructure(lesson) {
  if (lesson.contentStatus !== "ready" || lesson.playable !== true || lesson.comingSoon === true) {
    fail(`${lesson.id}: five_cards lesson must remain ready and playable`);
  }
  if ((lesson.exercises ?? []).length !== 0 || lesson.exerciseStatus !== "ready") {
    fail(`${lesson.id}: legacy exercises must remain empty while Card 5 practice is ready`);
  }
  const content = lesson.fiveCardContent ?? {};
  const expectedCards = "intro,vocabulary,dialogue,grammar,practice";
  if ((content.mainCards ?? []).join(",") !== expectedCards) {
    fail(`${lesson.id}: must define exactly five main cards in the approved order`);
  }
  if ((lesson.vocabulary ?? []).length !== 8 || (content.vocabularyDetails ?? []).length !== 8) {
    fail(`${lesson.id}: Card 2 must contain exactly 8 vocabulary cards`);
  }
  const groups = content.dialogueGroups ?? [];
  if (groups.length !== 3 || groups.some((group) => (group.lines ?? []).length < 4 || (group.lines ?? []).length > 6)) {
    fail(`${lesson.id}: Card 3 must contain exactly 3 dialogue groups with 4–6 lines`);
  }
  const approvedCharacters = content.approvedCharacterNamePool ?? [];
  const approvedCharacterIds = new Set(approvedCharacters.map((item) => item?.id));
  if (
    !content.targetLanguage ||
    content.targetLanguage !== lesson.languageCode ||
    !content.targetLocale ||
    !content.cultureContext ||
    approvedCharacters.length === 0 ||
    approvedCharacters.some((item) => !item?.id || !item?.displayName || !item?.canonicalName || !item?.audioName)
  ) {
    fail(`${lesson.id}: Card 3 character metadata requires targetLanguage matching the lesson's languageCode, targetLocale, cultureContext, and approvedCharacterNamePool`);
  }
  for (const group of groups) {
    for (const entry of group.lines ?? []) {
      if (!entry.speakerId || !approvedCharacterIds.has(entry.speakerId)) {
        fail(`${lesson.id}: dialogue speakerId ${entry.speakerId ?? "(missing)"} is outside approvedCharacterNamePool`);
      }
    }
  }
  if ((content.grammarPatterns ?? []).length !== 3) {
    fail(`${lesson.id}: Card 4 must contain exactly 3 grammar patterns`);
  }
  const practice = content.practice ?? {};
  const practiceExercises = practice.exercises ?? [];
  if (practice.totalQuestions !== 14 || practiceExercises.length !== 14) {
    fail(`${lesson.id}: Card 5 practice must contain exactly 14 exercises`);
  }
  for (const [index, exercise] of practiceExercises.entries()) {
    const expectedPlan = index < 10 ? "free" : "plus";
    if (exercise.order !== index + 1 || exercise.plan !== expectedPlan) {
      fail(`${lesson.id}: practice exercise ${index + 1} must use order ${index + 1} and plan ${expectedPlan}`);
    }
  }
  const checkpoint = practiceExercises[8];
  if (
    checkpoint?.type !== "checkpoint" ||
    (checkpoint.subQuestions ?? []).length !== 5 ||
    (checkpoint.subQuestions ?? []).some((question) =>
      (question.options ?? []).length !== 4 ||
      !question.correctOptionId ||
      !(question.options ?? []).some((option) => option.id === question.correctOptionId),
    )
  ) {
    fail(`${lesson.id}: exercise 9 must contain five four-option checkpoint questions with stable correct ids`);
  }
  const matching = practiceExercises[2];
  if (
    matching?.type !== "matching" ||
    (matching.pairs ?? []).length !== 4 ||
    (matching.pairs ?? []).some((pair) => !pair.id || !pair.left?.id || !pair.right?.id)
  ) {
    fail(`${lesson.id}: exercise 3 must define four stable matching pairs`);
  }
  const chatFill = practiceExercises[9];
  if (
    chatFill?.type !== "chat_text_fill" ||
    (chatFill.chat?.messages ?? []).length !== 6 ||
    (chatFill.slots ?? []).length !== 2 ||
    !chatFill.slots?.every((slot) => slot.displayText && slot.canonicalText && slot.audioText && (slot.acceptedAnswers ?? []).length)
  ) {
    fail(`${lesson.id}: exercise 10 must be a six-message, two-slot chat text fill with complete slot fields`);
  }
  const advancedOrdering = practiceExercises[12];
  if (
    advancedOrdering?.type !== "slot_ordering" ||
    (advancedOrdering?.answerSlots ?? []).length !== 6 ||
    !(advancedOrdering?.unusedTokenIds ?? []).length
  ) {
    fail(`${lesson.id}: exercise 13 must use six answer slots and include at least one unused distractor token`);
  }
  // Lesson Format 3.0 (Owner-approved breaking change, 2026-07-15):
  // exercise 14 is a non-graded Real-World Practice dialogue, not
  // controlled AI text. See .cursor/rules/04_novalang_lesson_format_3_0.mdc.
  const realWorldPractice = practiceExercises[13];
  const dialogueLines = realWorldPractice?.dialogueLines ?? [];
  const sceneDividers = realWorldPractice?.sceneDividers ?? [];
  if (
    realWorldPractice?.type !== "real_world_practice_dialogue" ||
    realWorldPractice?.nonGraded !== true ||
    dialogueLines.length !== 14 ||
    !realWorldPractice?.scenarioTitleByNative?.vi ||
    !realWorldPractice?.scenarioDescriptionByNative?.vi
  ) {
    fail(`${lesson.id}: exercise 14 must be a 14-line non-graded Real-World Practice dialogue with a localized scenario`);
  }
  for (const [lineIndex, entry] of dialogueLines.entries()) {
    if (!entry.speakerId || !approvedCharacterIds.has(entry.speakerId)) {
      fail(`${lesson.id}: exercise 14 line ${lineIndex + 1} speakerId is outside approvedCharacterNamePool`);
    }
    if (!entry.targetText || !entry.speechText) {
      fail(`${lesson.id}: exercise 14 line ${lineIndex + 1} is missing targetText/speechText`);
    }
    const translation = entry.translationByNative ?? {};
    if (!translation.vi || !translation.en || !translation.ja) {
      fail(`${lesson.id}: exercise 14 line ${lineIndex + 1} is missing a vi/en/ja translation`);
    }
    if (/[a-zA-Z]/.test(entry.reading ?? "")) {
      fail(`${lesson.id}: exercise 14 line ${lineIndex + 1} reading must not use romaji`);
    }
    try {
      requireGeneratedQ14Romanization(
        entry.romanization,
        `${lesson.id}: exercise 14 line ${lineIndex + 1}`,
      );
    } catch (error) {
      fail(error.message);
    }
  }
  const divider = sceneDividers[0];
  if (
    sceneDividers.length !== 1 ||
    !divider?.translationByNative?.vi ||
    !divider?.translationByNative?.en ||
    !divider?.translationByNative?.ja
  ) {
    fail(`${lesson.id}: exercise 14 must have exactly one localized non-spoken scene divider`);
  }
  if (/(ミン|Minh|Hưng|Linh)/u.test(JSON.stringify(content))) {
    fail(`${lesson.id}: five_cards lesson must not contain leftover draft Vietnamese character names`);
  }
  const requireReading = (entry, label) => {
    const text = String(entry?.targetText ?? entry?.displayText ?? entry?.text ?? "");
    if (/[㐀-鿿]/u.test(text) && !String(entry?.reading ?? "").trim()) {
      fail(`${lesson.id}: ${label} contains Kanji without reading`);
    }
  };
  for (const item of lesson.vocabulary ?? []) requireReading(item, `vocabulary ${item.id}`);
  for (const group of groups) for (const entry of group.lines ?? []) requireReading(entry, `dialogue ${group.id}`);
  for (const detail of content.vocabularyDetails ?? []) {
    for (const entry of detail.examples ?? []) requireReading(entry, `vocabulary detail ${detail.id}`);
  }
  for (const pattern of content.grammarPatterns ?? []) {
    if (/[㐀-鿿]/u.test(String(pattern.formula ?? "")) && !String(pattern.formulaReading ?? "").trim()) {
      fail(`${lesson.id}: grammar formula contains Kanji without reading`);
    }
    for (const entry of pattern.examples ?? []) requireReading(entry, `grammar ${pattern.title}`);
  }
}

async function main() {
  const coursesPayload = await loadJson("shared/generated/courses.json");
  const lessonsPayload = await loadJson("shared/generated/lessons.json");
  const catalog = await loadJson("shared/generated/curriculum_catalog.json");
  const languageOptions = await loadJson("shared/config/language_options.json");
  const nativeLanguageOptions = await loadJson(
    "shared/config/native_language_options.json",
  );

  if (coursesPayload.version !== "curriculum-v3") {
    fail(`Expected curriculum-v3, got ${coursesPayload.version}`);
  }

  const courses = coursesPayload.courses ?? [];
  const lessons = lessonsPayload.lessons ?? [];
  if (!courses.length || !lessons.length) fail("Courses/lessons empty — Web/Flutter cannot load curriculum");

  const lessonById = new Map(lessons.map((l) => [l.id, l]));
  const courseIds = courses.map((course) => course.id);
  if (!hasUnique(courseIds)) {
    fail(`Course IDs must be unique; got [${courseIds.join(", ")}]`);
  }

  if (catalog.playableLanguages?.join(",") !== "en,ja") {
    fail(`playableLanguages must be en,ja — got ${catalog.playableLanguages}`);
  }

  const available = languageOptions.filter((l) => l.courseStatus === "available").map((l) => l.code);
  if (available.sort().join(",") !== "en,ja") {
    fail(`language_options available must be only en,ja — got ${available.join(",")}`);
  }
  if (languageOptions.length < 40) {
    fail(`language catalog must have >= 40 learning languages — got ${languageOptions.length}`);
  }
  if (nativeLanguageOptions.length < 100) {
    fail(
      `native language catalog must have >= 100 languages — got ${nativeLanguageOptions.length}`,
    );
  }
  for (const item of languageOptions) {
    if (!item.code || !item.englishName || !item.nativeName || !item.flagEmoji) {
      fail(`learning language missing code/name/nativeName/flagEmoji: ${JSON.stringify(item)}`);
    }
    const status = item.learningContentStatus || item.courseStatus;
    if (!["available", "blueprint", "comingSoon", "coming_soon"].includes(status)) {
      fail(`learning language ${item.code} missing content status`);
    }
    if (!item.heroIllustrationKey || !item.heroAsset || !Array.isArray(item.heroGradient)) {
      fail(`learning language ${item.code} missing shared hero metadata`);
    }
    if (item.courseStatus === "available") {
      try {
        await access(path.join(ROOT, "shared", "assets", item.heroAsset));
      } catch {
        fail(`test language ${item.code} hero asset does not exist: ${item.heroAsset}`);
      }
    }
  }
  try {
    await access(path.join(ROOT, "shared", "assets", "language_hero", "default.svg"));
  } catch {
    fail("language hero fallback asset does not exist");
  }
  for (const item of nativeLanguageOptions) {
    if (!item.code || !item.englishName || !item.nativeName || !item.flagEmoji) {
      fail(`native language missing code/name/nativeName/flagEmoji: ${JSON.stringify(item)}`);
    }
  }
  if ((catalog.languages ?? []).length < 40) {
    fail(
      `curriculum_catalog.languages must have >= 40 codes — got ${(catalog.languages ?? []).length}`,
    );
  }

  for (const course of courses) {
    for (const unit of course.units ?? []) {
      if (course.nicheId === "core_foundation") {
        validateByNativeMap(unit.titleByNative, `${unit.id} titleByNative`, fail);
        validateByNativeMap(unit.goalByNative, `${unit.id} goalByNative`, fail);
      }
      for (const lessonId of unit.lessonIds ?? []) {
        if (!lessonById.has(lessonId)) {
          fail(`Course ${course.id} unit ${unit.id} references missing lesson ${lessonId}`);
        }
      }
    }
  }

  const BLUEPRINT_EXERCISE_TYPES = [
    "matchPairs",
    "listenAndChoose",
    "multipleChoiceMeaning",
    "fillBlank",
    "arrangeWords",
    "dialogueCompletion",
    "naturalResponseChoice",
    "plusListeningVocabularyChallenge",
    "controlledAiQa",
    "reviewCheckpoint",
  ];
  const LEARN_SECTION_KEYS = [
    "vocabularyPhraseCards",
    "grammarSentencePatterns",
    "miniDialogue",
    "cultureNuanceNote",
    "contextualVariations",
    "communicationStrategy",
  ];
  const APPROVED_JA_UNIT1_LESSON1 = "ja-daily_life-m01-u1-l1";
  const isApprovedJaUnitOneLesson = (lesson) => lesson.id === APPROVED_JA_UNIT1_LESSON1;

  function isBlueprintLesson(lesson) {
    return !isApprovedJaUnitOneLesson(lesson) && (
      lesson.contentStatus === "blueprint" ||
      lesson.playable === false ||
      lesson.exerciseStatus === "placeholder"
    );
  }

  /**
   * Literal content lock for the Golden Reference Lesson only
   * (ja-daily_life-m01-u1-l1, ADR-008). Every check here is the exact
   * wording/id the project owner approved — carried over verbatim from the
   * former validateApprovedJaUnitOneLesson, not weakened. A new five_cards
   * lesson never runs this function; it only runs validateFiveCardsStructure
   * above.
   */
  function validateApprovedGoldenLessonContent(lesson) {
    const content = lesson.fiveCardContent ?? {};
    const practice = content.practice ?? {};
    const practiceExercises = practice.exercises ?? [];

    const ordering = practiceExercises[3];
    if ((ordering?.correctTokenIds ?? []).join("|") !== "watashi|topic_wa|tanaka|desu|period") {
      fail(`${lesson.id}: exercise 4 must preserve approved token ids`);
    }
    const chatFill = practiceExercises[9];
    if (chatFill?.slots?.[0]?.id !== "chat_greeting_slot" || chatFill?.slots?.[1]?.id !== "chat_closing_slot") {
      fail(`${lesson.id}: exercise 10 must use the approved chat_greeting_slot/chat_closing_slot ids`);
    }
    const advancedOrdering = practiceExercises[12];
    if (
      !(advancedOrdering?.tokens ?? []).some((item) => item.id === "konbanwa_distractor") ||
      (advancedOrdering?.answerSlots ?? []).filter((slot) => slot.afterText === "。").length !== 3
    ) {
      fail(`${lesson.id}: exercise 13 must use generated punctuation and the approved unused distractor`);
    }
    const realWorldPractice = practiceExercises[13];
    const dialogueLines = realWorldPractice?.dialogueLines ?? [];
    const sceneDividers = realWorldPractice?.sceneDividers ?? [];
    const approvedQ14Targets = [
      "こんばんは。すみません、ちょっとよろしいですか。",
      "こんばんは。はい、どうしましたか。",
      "はじめまして。留学生の田中です。すみませんが、実は、スマホが使えなくて、道がわからないんです。",
      "あ、留学生なんですね。はじめまして。佐藤です。",
      "それは大変ですね。どこへ行きたいんですか。",
      "さくら寮です。場所、わかりますか。",
      "はい、わかりますよ。ここから近いですよ。",
      "一緒に行きましょうか。",
      "え、いいんですか。本当にありがとうございます。",
      "いえいえ。なんでもないです。",
      "着きましたよ。ここです。",
      "助かりました。佐藤さん、ありがとうございました。",
      "なんでもないです。",
      "田中さん、勉強を頑張ってくださいね。さようなら。",
    ];
    if (dialogueLines.map((entry) => entry.targetText).join("|") !== approvedQ14Targets.join("|")) {
      fail(`${lesson.id}: exercise 14 must match the owner-approved Tanaka–Sato dialogue exactly`);
    }
    const divider = sceneDividers[0];
    if (divider?.afterDialogueLine !== 10 || divider?.targetText !== "着いた時") {
      fail(`${lesson.id}: exercise 14 scene divider must match the approved afterDialogueLine/targetText`);
    }
    const konnichiwa = (content.vocabularyDetails ?? []).find((item) => item.id === "konnichiwa");
    const expectedCasualOpenings = [
      "gọi tên người kia;",
      "hỏi ngay 元気？;",
      "dùng よっ！ hoặc おっ！ trong một số nhóm bạn thân;",
      "bắt đầu trực tiếp câu chuyện.",
    ];
    if (
      !konnichiwa ||
      konnichiwa.casualTitle !== "Cách mở đầu thân mật theo ngữ cảnh" ||
      konnichiwa.casualIntro !== "こんにちは không có một cách nói thân mật cố định tương đương.\n\nKhi nói với bạn bè hoặc người quen thân, tùy người và tình huống, người nói có thể:" ||
      (konnichiwa.casual ?? []).join("|") !== expectedCasualOpenings.join("|") ||
      JSON.stringify(content).includes("やあ")
    ) {
      fail(`${lesson.id}: こんにちは must use the approved contextual casual-opening content without やあ`);
    }
  }

  function validateBlueprintLesson(lesson) {
    if (lesson.contentStatus !== "blueprint") {
      fail(`${lesson.id}: blueprint lesson must have contentStatus=blueprint`);
    }
    if (lesson.playable !== false) {
      fail(`${lesson.id}: blueprint lesson must have playable=false`);
    }
    if (lesson.comingSoon !== true) {
      fail(`${lesson.id}: blueprint lesson must have comingSoon=true`);
    }
    if (lesson.canSkip !== true) {
      fail(`${lesson.id}: blueprint lesson must have canSkip=true`);
    }
    if (lesson.exerciseStatus !== "placeholder") {
      fail(`${lesson.id}: blueprint lesson must have exerciseStatus=placeholder`);
    }
    validateByNativeMap(lesson.titleByNative, `${lesson.id} titleByNative`, fail);
    validateByNativeMap(lesson.goalByNative ?? lesson.canDoObjectiveByNative, `${lesson.id} goalByNative`, fail);
    validateByNativeMap(lesson.situationByNative, `${lesson.id} situationByNative`, fail);

    const learn = lesson.learnSection ?? {};
    for (const key of LEARN_SECTION_KEYS) {
      if (!learn[key] || learn[key].status !== "placeholder") {
        fail(`${lesson.id}: learnSection.${key} must be placeholder`);
      }
    }

    const stages = lesson.practiceStages ?? [];
    if (stages.length !== 2) {
      fail(`${lesson.id}: must have exactly 2 practiceStages`);
    }
    const warmup = stages.find((s) => s.key === "warmup");
    const realWorld = stages.find((s) => s.key === "real_world");
    if (!warmup || !realWorld) {
      fail(`${lesson.id}: practiceStages must include warmup and real_world`);
    }
    if ((warmup?.exerciseOrders ?? []).join(",") !== "1,2,3,4,5") {
      fail(`${lesson.id}: warmup must cover exercises 1–5`);
    }
    if ((realWorld?.exerciseOrders ?? []).join(",") !== "6,7,8,9,10") {
      fail(`${lesson.id}: real_world must cover exercises 6–10`);
    }
    validateByNativeMap(warmup?.labelByNative, `${lesson.id} warmup.labelByNative`, fail);
    validateByNativeMap(realWorld?.labelByNative, `${lesson.id} real_world.labelByNative`, fail);

    const exercises = lesson.exercises ?? [];
    if (exercises.length !== 10) {
      fail(`${lesson.id}: blueprint must have exactly 10 placeholder exercises`);
    }
    for (const [index, ex] of exercises.entries()) {
      const expectedType = BLUEPRINT_EXERCISE_TYPES[index];
      if (ex.type !== expectedType) {
        fail(`${lesson.id} e${index + 1}: expected type ${expectedType}, got ${ex.type}`);
      }
      if (ex.status !== "placeholder") {
        fail(`${lesson.id} e${index + 1}: status must be placeholder`);
      }
      const expectedPlan = index < 7 ? "free" : "plus";
      if (ex.plan !== expectedPlan && ex.access !== expectedPlan) {
        fail(`${lesson.id} e${index + 1}: plan/access must be ${expectedPlan}`);
      }
      validateByNativeMap(ex.titleByNative, `${lesson.id} e${index + 1} titleByNative`, fail);
      for (const banned of [
        "question",
        "options",
        "correctAnswer",
        "pairs",
        "acceptedAnswers",
        "acceptedAnswersByNative",
        "optionsByNative",
      ]) {
        if (ex[banned] != null) {
          fail(`${lesson.id} e${index + 1}: blueprint must not include real content field ${banned}`);
        }
      }
      if (ex.prompts && Object.keys(ex.prompts).length) {
        fail(`${lesson.id} e${index + 1}: blueprint must not include prompts content`);
      }
    }
  }

  const allowedNiches = new Set(["daily_life", "core_foundation"]);
  for (const lesson of lessons) {
    if (!["en", "ja"].includes(lesson.languageCode)) {
      fail(`${lesson.id}: only en/ja playable lessons allowed in this scope`);
    }
    if (!allowedNiches.has(lesson.nicheId)) {
      fail(`${lesson.id}: unexpected nicheId ${lesson.nicheId}`);
    }
    if (lesson.languageCode === "ja") validateNoRawKanaInRomanization(lesson);
    if (lesson.lessonFormat === "five_cards") {
      validateFiveCardsStructure(lesson);
      if (isApprovedJaUnitOneLesson(lesson)) validateApprovedGoldenLessonContent(lesson);
      continue;
    }
    if ((lesson.exercises ?? []).length !== 10) {
      fail(`${lesson.id}: must have exactly 10 exercises (got ${(lesson.exercises ?? []).length})`);
    }
    if (isBlueprintLesson(lesson)) {
      validateBlueprintLesson(lesson);
      continue;
    }
    if (FOUNDATION_MODULES.has(lesson.moduleId)) {
      validateByNativeMap(lesson.titleByNative, `${lesson.id} titleByNative`, fail);
      validateByNativeMap(lesson.descriptionByNative, `${lesson.id} descriptionByNative`, fail);
      validateByNativeMap(
        lesson.canDoObjectiveByNative,
        `${lesson.id} canDoObjectiveByNative`,
        fail,
      );
      if (!(lesson.vocabulary ?? []).length && !(lesson.introPoints ?? []).length) {
        fail(`${lesson.id}: Foundation lesson must include vocabulary/intro content`);
      }
    }
    const isReadyDailyModuleOne = lesson.moduleId === "daily_life_m01_basic_social_survival";
    if (isReadyDailyModuleOne) validateReadyDailyModuleOneLesson(lesson);
    else (lesson.exercises ?? []).forEach((ex, i) => validateExercise(lesson, ex, i));
    for (const vocab of lesson.vocabulary ?? []) {
      if (!isReadyDailyModuleOne) validateJapaneseItem(lesson, vocab, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.translations) validateTranslations(vocab.translations, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.displayText === "こんにちわ" || vocab.text === "こんにちわ") {
        fail(`${lesson.id}: use こんにちは, not こんにちわ`);
      }
    }
  }

  // Daily Life Communication: 15 topics × 3 tiers (owner decision, 2026-07-18;
  // replaces the prior 10-module × 8-unit × 3-lesson blueprint entirely).
  // Content is written in incrementally — an empty topic (0 units) or an
  // empty tier is a VALID, intentional state, not an error (see
  // assertDailyLifeBlueprintShape in scripts/lib/daily-life-blueprint.mjs).
  // What is still enforced hard: exactly 15 topics per language; every
  // course's ready/playable status matches whether it actually has units;
  // every unit that exists has >=1 lesson (an empty-but-created unit would
  // indicate a generator bug, not intentional "not written yet"); and the
  // Golden Lesson's own unit/course still match their frozen ADR-008 values.
  for (const language of ["en", "ja"]) {
    const dailyCourses = courses
      .filter((c) => c.languageCode === language && c.nicheId === "daily_life")
      .slice()
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
    if (dailyCourses.length !== 15) {
      fail(`${language} Daily Life must have exactly 15 topics, got ${dailyCourses.length}`);
    }
    const dailyLessons = lessons.filter(
      (l) => l.languageCode === language && l.nicheId === "daily_life",
    );
    for (const course of dailyCourses) {
      const isModuleOne = course.moduleId === "daily_life_m01_basic_social_survival";
      const hasUnits = (course.units ?? []).length > 0;
      if (hasUnits && (course.contentStatus !== "ready" || course.playable !== true)) {
        fail(`${course.id}: a topic with real units must be ready/playable`);
      }
      if (!hasUnits && (course.contentStatus !== "blueprint" || course.playable !== false)) {
        fail(`${course.id}: an empty topic (no units yet) must stay blueprint/non-playable`);
      }
      if (isModuleOne && language === "ja" && !hasUnits) {
        fail(`${course.id}: Topic 1 (Golden Lesson) must have at least one unit`);
      }
      if (course.unlockRequirement !== "core_foundation_completed") {
        fail(`${course.id}: missing unlockRequirement core_foundation_completed`);
      }
      for (const unit of course.units ?? []) {
        if ((unit.lessonIds ?? []).length === 0) {
          fail(`${unit.id}: a created unit must contain at least one lesson (empty units should not be created)`);
        }
        if (!["basic", "intermediate", "advanced"].includes(unit.tier)) {
          fail(`${unit.id}: missing/invalid tier (must be basic|intermediate|advanced)`);
        }
        if (unit.id === "ja-daily_life-m01-u1") {
          if (unit.titleByNative?.vi !== "Chào và nói tên") {
            fail(`${unit.id}: must keep the approved Vietnamese Unit 1 title`);
          }
        } else {
          validateByNativeMap(unit.titleByNative, `${unit.id} titleByNative`, fail);
        }
      }
    }
    const moduleOneLessons = dailyLessons.filter((l) => l.moduleId === "daily_life_m01_basic_social_survival");
    if (language === "ja" && (moduleOneLessons.length < 1 || moduleOneLessons.some((l) => l.playable !== true || l.contentStatus !== "ready"))) {
      fail(`${language} Daily Life Topic 1 must contain at least the Golden Lesson, ready/playable`);
    }
    const laterLessons = dailyLessons.filter((l) => l.moduleId !== "daily_life_m01_basic_social_survival");
    if (laterLessons.some((l) => l.playable === true || l.contentStatus !== "blueprint")) {
      fail(`${language} Daily Life Module 2-10 must remain blueprint/non-playable`);
    }
  }

  // Every gojūon row is one lesson: intro first, then exactly 10 exercises.
  for (const lessonId of EXPECTED_HIRAGANA_ROWS.map((_, index) => `ja-hiragana-u1-l${index + 1}`)) {
    const lesson = lessonById.get(lessonId);
    if (!lesson) {
      fail(`Missing Hiragana lesson ${lessonId}`);
      continue;
    }
    if ((lesson.vocabulary ?? []).length < 1) {
      fail(`${lessonId}: missing intro vocabulary cards`);
    }
    if ((lesson.exercises ?? []).length !== 10) {
      fail(`${lessonId}: must have exactly 10 exercises`);
    }
    const e1 = lesson.exercises?.[0];
    if (e1?.type !== "matchPairs") {
      fail(`${lessonId}: Exercise 1 must be matchPairs, got ${e1?.type}`);
    }
    for (const [index, exercise] of (lesson.exercises ?? []).entries()) {
      if (index < 7 && (exercise.access !== "free" || exercise.plusOnly === true)) {
        fail(`${lessonId} e${index + 1}: must be Free`);
      }
      if (index >= 7 && (exercise.access !== "plus" || exercise.plusOnly !== true)) {
        fail(`${lessonId} e${index + 1}: must be Plus`);
      }
    }
    const e8 = lesson.exercises?.[7];
    if (lessonId.endsWith("-l1")) {
      if (e8?.type !== "plusListeningVocabularyChallenge" || (e8.subQuestions ?? []).length !== 5) {
        fail(`${lessonId}: Exercise 8 must be plusListeningVocabularyChallenge with 5 subquestions`);
      }
    } else if (e8?.type !== "listeningGapFill") {
      fail(`${lessonId}: Exercise 8 must be listeningGapFill, got ${e8?.type}`);
    }
    const e9 = lesson.exercises?.[8];
    if (e9?.type !== "controlledAiQa" || e9.triggerExtraAiCallByDefault === true) {
      fail(`${lessonId}: Exercise 9 must be controlledAiQa`);
    }
    const e10 = lesson.exercises?.[9];
    if (
      e10?.type !== "aiFeedbackReview" ||
      e10.triggerExtraAiCallByDefault === true ||
      e10.reusesPreviousAiFeedback !== true
    ) {
      fail(`${lessonId}: Exercise 10 must reuse AI feedback and not trigger extra AI by default`);
    }
  }

  for (const [index, expectedRow] of EXPECTED_HIRAGANA_ROWS.entries()) {
    const lessonId = `ja-hiragana-u1-l${index + 1}`;
    const actual = (lessonById.get(lessonId)?.vocabulary ?? [])
      .map((item) => item.displayText || item.text || "")
      .join("");
    if (actual !== expectedRow) {
      fail(`${lessonId}: must contain exactly one Hiragana row ${expectedRow}, got ${actual}`);
    }
  }

  // Japanese Core Foundation Unit 1 Lesson 1 must teach individual kana, not greetings.
  const hiraganaL1 = lessonById.get("ja-hiragana-u1-l1");
  if (!hiraganaL1) {
    fail("Missing Japanese Core Foundation lesson ja-hiragana-u1-l1");
  } else {
    validateHiraganaLessonOneSpec(hiraganaL1);
    const bannedPhrases = ["こんにちは", "ありがとう", "さようなら", "こんにちわ"];
    const texts = (hiraganaL1.vocabulary ?? []).map((v) => v.displayText || v.text || "");
    if (texts.join("") !== "あいうえお") {
      fail(
        `ja-hiragana-u1-l1 must teach only あいうえお as individual characters, got [${texts.join(", ")}]`,
      );
    }
    for (const vocab of hiraganaL1.vocabulary ?? []) {
      if (!vocab.speechText) fail(`ja-hiragana-u1-l1 ${vocab.id}: missing speechText for intro TTS`);
      if (!vocab.exampleText && !vocab.exampleDisplay && !vocab.exampleSentence) {
        fail(`ja-hiragana-u1-l1 ${vocab.id}: missing example for intro card`);
      }
      const hasMeaning =
        (vocab.translations && Object.keys(vocab.translations).length >= 5) ||
        (vocab.meaningEn && vocab.meaningVi);
      if (!hasMeaning) {
        fail(`ja-hiragana-u1-l1 ${vocab.id}: intro meaning must be localized`);
      }
    }
    for (const [index, exercise] of (hiraganaL1.exercises ?? []).entries()) {
      const hasTitle =
        exercise.prompt ||
        exercise.promptVi ||
        (exercise.prompts && Object.keys(exercise.prompts).length > 0);
      if (!hasTitle) {
        fail(`ja-hiragana-u1-l1 e${index + 1}: missing prompt/title for Exercise X/10`);
      }
    }
    for (const phrase of bannedPhrases) {
      if (texts.some((t) => t.includes(phrase) && t.length > 1)) {
        fail(`ja-hiragana-u1-l1 must not include greeting phrase ${phrase}`);
      }
    }
    for (const text of texts) {
      if ([...text].length !== 1) {
        fail(`ja-hiragana-u1-l1 item "${text}" must be a single hiragana character`);
      }
    }
  }

  const katakanaL1 = lessonById.get("ja-katakana-u4-l1");
  if (!katakanaL1) {
    fail("Missing Japanese Core Foundation Katakana Basics lesson ja-katakana-u4-l1");
  } else {
    const texts = (katakanaL1.vocabulary ?? []).map((v) => v.displayText || v.text || "");
    if (texts.join("") !== "アイウエオ") {
      fail(
        `ja-katakana-u4-l1 must teach only アイウエオ as individual characters, got [${texts.join(", ")}]`,
      );
    }
  }

  const hasHiragana = lessons.some(
    (l) => l.languageCode === "ja" && String(l.id).includes("hiragana"),
  );
  const hasKatakana = lessons.some(
    (l) => l.languageCode === "ja" && String(l.id).includes("katakana"),
  );
  if (hasHiragana && !hasKatakana) {
    fail("Japanese Core Foundation has Hiragana but no Katakana Basics");
  }

  const katakanaLessons = lessons.filter(
    (l) => l.languageCode === "ja" && String(l.id).includes("katakana"),
  );
  if (katakanaLessons.length !== 10) {
    fail(`Expected 10 Katakana Basics lessons, got ${katakanaLessons.length}`);
  }
  for (const lesson of katakanaLessons) {
    if ((lesson.exercises ?? []).length !== 10) {
      fail(`${lesson.id}: playable Katakana lesson must have exactly 10 exercises`);
    }
  }

  // Katakana Exercise 8 must mirror Hiragana plusListeningVocabularyChallenge (not gap-fill).
  const hiraganaE8Type = lessonById.get("ja-hiragana-u1-l1")?.exercises?.[7]?.type;
  for (const [index] of EXPECTED_KATAKANA_ROWS.entries()) {
    const lessonId = `ja-katakana-u4-l${index + 1}`;
    const lesson = lessonById.get(lessonId);
    const e8 = lesson?.exercises?.[7];
    if (!e8) {
      fail(`${lessonId}: missing Exercise 8`);
      continue;
    }
    if (e8.type === "listeningGapFill" || e8.type === "fillBlank" || e8.type === "fillMissingCharacter") {
      fail(`${lessonId}: Exercise 8 must not be fill blank / gap-fill / text input, got ${e8.type}`);
    }
    if (e8.type !== "plusListeningVocabularyChallenge") {
      fail(`${lessonId}: Exercise 8 must be plusListeningVocabularyChallenge, got ${e8.type}`);
    }
    if (hiraganaE8Type && e8.type !== hiraganaE8Type) {
      fail(`${lessonId}: Exercise 8 type ${e8.type} must match Hiragana Exercise 8 type ${hiraganaE8Type}`);
    }
    if (e8.access !== "plus" || e8.plusOnly !== true) {
      fail(`${lessonId}: Exercise 8 must be Plus`);
    }
    const displayBlob = [
      e8.displayText,
      e8.prompt,
      ...(e8.gapSentences ?? []).map((g) => g?.text ?? g?.displayText ?? ""),
      ...(e8.sentences ?? []).map((g) => g?.text ?? ""),
    ].join("\n");
    if (displayBlob.includes("_")) {
      fail(`${lessonId}: Exercise 8 must not contain blank markers (_)`);
    }
    const subQuestions = e8.subQuestions ?? [];
    if (subQuestions.length < 3) {
      fail(`${lessonId}: Exercise 8 must have subQuestions, got ${subQuestions.length}`);
    }
    subQuestions.forEach((sq, sqIndex) => {
      for (const field of ["speechText", "options", "correctAnswer"]) {
        if (!sq[field] || (Array.isArray(sq[field]) && sq[field].length === 0)) {
          fail(`${lessonId} e8-s${sqIndex + 1}: missing ${field}`);
        }
      }
      if (!sq.revealAfterAnswerByNative) {
        fail(`${lessonId} e8-s${sqIndex + 1}: missing revealAfterAnswerByNative`);
      } else {
        for (const code of NATIVE_CODES) {
          const reveal = sq.revealAfterAnswerByNative[code];
          if (!reveal || String(reveal).trim() === "") {
            fail(`${lessonId} e8-s${sqIndex + 1}: revealAfterAnswerByNative.${code} missing`);
          }
        }
      }
      if (!(sq.options ?? []).includes(sq.correctAnswer)) {
        fail(`${lessonId} e8-s${sqIndex + 1}: options must include correctAnswer`);
      }
      if (String(sq.speechText ?? "").includes("_") || String(JSON.stringify(sq.options ?? "")).includes("_")) {
        fail(`${lessonId} e8-s${sqIndex + 1}: must not use blank markers`);
      }
    });
  }

  for (const [index, expectedRow] of EXPECTED_KATAKANA_ROWS.entries()) {
    const lessonId = `ja-katakana-u4-l${index + 1}`;
    const lesson = lessonById.get(lessonId);
    const actual = (lesson?.vocabulary ?? [])
      .map((item) => item.displayText || item.text || "")
      .join("");
    if (!lesson) fail(`Missing Katakana lesson ${lessonId}`);
    else if (actual !== expectedRow) {
      fail(`${lessonId}: must contain exactly one Katakana row ${expectedRow}, got ${actual}`);
    }
    if (lesson?.exercises?.[0]?.type !== "matchPairs") {
      fail(`${lessonId}: Exercise 1 must be matchPairs`);
    }
  }

  // Core Foundation (hiragana/katakana/alphabet) has a fixed, frozen shape —
  // 26 lessons, all always playable. Daily Life (15 topics × 3 tiers, owner
  // decision 2026-07-18) is written in incrementally, so its lesson count is
  // NOT a fixed magic number anymore; these are self-consistency checks
  // instead (total = foundation + daily_life; playable count matches what
  // each lesson itself declares), which stay valid as content grows rather
  // than needing a manual update every time a topic gets real content.
  const foundationLessons = lessons.filter((l) => l.nicheId === "core_foundation");
  const dailyLifeLessonsTotal = lessons.filter((l) => l.nicheId === "daily_life");
  const playableCount = lessons.filter((l) => l.playable !== false && !l.comingSoon).length;
  if (foundationLessons.length !== 26) {
    fail(`Expected 26 Core Foundation lessons, got ${foundationLessons.length}`);
  }
  if (foundationLessons.some((l) => l.playable !== true)) {
    fail("Every Core Foundation lesson must be playable");
  }
  if (lessons.length !== foundationLessons.length + dailyLifeLessonsTotal.length) {
    fail(
      `Lesson total ${lessons.length} does not equal foundation (${foundationLessons.length}) + daily_life (${dailyLifeLessonsTotal.length}) — unexpected nicheId present`,
    );
  }
  const expectedPlayableCount =
    foundationLessons.length + dailyLifeLessonsTotal.filter((l) => l.playable === true).length;
  if (playableCount !== expectedPlayableCount) {
    fail(`Playable lesson count ${playableCount} does not match expected ${expectedPlayableCount}`);
  }

  const enAlphabetL1 = lessonById.get("en-alphabet-u1-l1");
  if (!enAlphabetL1) {
    fail("Missing English Core Foundation lesson en-alphabet-u1-l1");
  } else {
    const texts = (enAlphabetL1.vocabulary ?? []).map((v) => v.displayText || v.text || "");
    if (texts.join("") !== "AEIOU") {
      fail(`en-alphabet-u1-l1 must teach A E I O U, got [${texts.join(", ")}]`);
    }
    for (const banned of ["Hello", "Goodbye", "Nice to meet you"]) {
      if (texts.some((t) => t.includes(banned))) {
        fail(`en-alphabet-u1-l1 must not include phrase ${banned}`);
      }
    }
  }

  const alphabetLessons = lessons.filter(
    (l) => l.languageCode === "en" && String(l.id).startsWith("en-alphabet-u1-"),
  );
  if (alphabetLessons.length !== 6) {
    fail(`Expected 6 English Alphabet/Core Foundation lessons, got ${alphabetLessons.length}`);
  }
  const alphabetLetters = new Set();
  for (const lesson of alphabetLessons) {
    if (!(lesson.vocabulary ?? []).length) fail(`${lesson.id}: missing intro vocabulary cards`);
    if ((lesson.vocabulary ?? []).length > 6) fail(`${lesson.id}: groups too many alphabet letters`);
    if ((lesson.exercises ?? []).length !== 10) fail(`${lesson.id}: must have exactly 10 exercises`);
    if (lesson.exercises?.[0]?.type !== "matchPairs") fail(`${lesson.id}: Exercise 1 must be matchPairs`);
    if (String(lesson.id).endsWith("-l6")) continue; // checkpoint may repeat
    for (const vocab of lesson.vocabulary ?? []) {
      const letter = String(vocab.displayText || vocab.text || "").toUpperCase();
      if (/^[A-Z]$/.test(letter)) alphabetLetters.add(letter);
    }
  }
  const missingLetters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].filter(
    (ch) => !alphabetLetters.has(ch),
  );
  if (missingLetters.length) {
    fail(
      `English Alphabet Starter must include all A–Z; missing: ${missingLetters.join(", ")}`,
    );
  }

  if (enAlphabetL1) {
    const e1 = (enAlphabetL1.exercises ?? [])[0];
    if (e1?.type !== "matchPairs") {
      fail(`en-alphabet-u1-l1 exercise 1 must be matchPairs, got ${e1?.type}`);
    } else {
      const leftSet = new Set((e1.pairs ?? []).map((p) => p.left));
      for (const letter of ["A", "E", "I", "O", "U"]) {
        if (!leftSet.has(letter)) {
          fail(`en-alphabet-u1-l1 matchPairs missing letter ${letter}`);
        }
      }
    }
  }

  // English Foundation Exercise 8 must mirror Hiragana/Katakana listening vocabulary challenge.
  const referenceE8Type =
    lessonById.get("ja-hiragana-u1-l1")?.exercises?.[7]?.type ??
    lessonById.get("ja-katakana-u4-l1")?.exercises?.[7]?.type;
  for (let lessonNum = 1; lessonNum <= 6; lessonNum += 1) {
    const lessonId = `en-alphabet-u1-l${lessonNum}`;
    const lesson = lessonById.get(lessonId);
    const e8 = lesson?.exercises?.[7];
    if (!e8) {
      fail(`${lessonId}: missing Exercise 8`);
      continue;
    }
    if (e8.type === "listeningGapFill" || e8.type === "fillBlank" || e8.type === "fillMissingCharacter") {
      fail(`${lessonId}: Exercise 8 must not be fill blank / gap-fill, got ${e8.type}`);
    }
    if (e8.type !== "plusListeningVocabularyChallenge") {
      fail(`${lessonId}: Exercise 8 must be plusListeningVocabularyChallenge, got ${e8.type}`);
    }
    if (referenceE8Type && e8.type !== referenceE8Type) {
      fail(`${lessonId}: Exercise 8 type ${e8.type} must match reference E8 type ${referenceE8Type}`);
    }
    if (e8.access !== "plus" || e8.plusOnly !== true) {
      fail(`${lessonId}: Exercise 8 must be Plus`);
    }
    const displayBlob = [
      e8.displayText,
      e8.prompt,
      ...(e8.gapSentences ?? []).map((g) => g?.text ?? g?.displayText ?? ""),
    ].join("\n");
    if (displayBlob.includes("_")) {
      fail(`${lessonId}: Exercise 8 must not contain blank markers (_)`);
    }
    const subQuestions = e8.subQuestions ?? [];
    if (subQuestions.length < 3) {
      fail(`${lessonId}: Exercise 8 must have subQuestions, got ${subQuestions.length}`);
    }
    subQuestions.forEach((sq, sqIndex) => {
      for (const field of ["speechText", "options", "correctAnswer"]) {
        if (!sq[field] || (Array.isArray(sq[field]) && sq[field].length === 0)) {
          fail(`${lessonId} e8-s${sqIndex + 1}: missing ${field}`);
        }
      }
      if (!sq.revealAfterAnswerByNative) {
        fail(`${lessonId} e8-s${sqIndex + 1}: missing revealAfterAnswerByNative`);
      } else {
        for (const code of NATIVE_CODES) {
          const reveal = sq.revealAfterAnswerByNative[code];
          if (!reveal || String(reveal).trim() === "") {
            fail(`${lessonId} e8-s${sqIndex + 1}: revealAfterAnswerByNative.${code} missing`);
          }
        }
      }
      if (!(sq.options ?? []).includes(sq.correctAnswer)) {
        fail(`${lessonId} e8-s${sqIndex + 1}: options must include correctAnswer`);
      }
      if (String(sq.speechText ?? "").includes("_")) {
        fail(`${lessonId} e8-s${sqIndex + 1}: must not use blank markers`);
      }
    });
  }

  // Unit/lesson displayOrder must be continuous 1..N within each course/module
  // (Daily Life has 10 modules × 8 units; Core Foundation may span multiple courses).
  const nicheGroups = new Map();
  for (const course of courses) {
    const key = `${course.languageCode}::${course.nicheId}`;
    if (!nicheGroups.has(key)) nicheGroups.set(key, []);
    nicheGroups.get(key).push(course);
  }
  for (const [key, group] of nicheGroups) {
    const sortedCourses = group
      .slice()
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));

    for (const course of sortedCourses) {
      const units = (course.units ?? [])
        .slice()
        .sort(
          (a, b) =>
            Number(a.displayOrder ?? a.order ?? 0) -
            Number(b.displayOrder ?? b.order ?? 0),
        );
      // Daily Life / multi-module niches: order resets per module/course.
      // Core Foundation: keep legacy cross-course Unit 1/2 numbering on the niche group below.
      if (course.nicheId === "daily_life") {
        const orders = units.map((unit) => Number(unit.displayOrder ?? unit.order));
        const expected = units.map((_, index) => index + 1);
        if (orders.join(",") !== expected.join(",")) {
          fail(
            `${course.id}: unit displayOrder must be continuous 1..${units.length}, got [${orders.join(", ")}]`,
          );
        }
      }
      for (const unit of units) {
        const n = Number(unit.displayOrder ?? unit.order);
        if (n >= 100) {
          fail(
            `${key}: unit ${unit.id} displayOrder ${n} looks like a global/blueprint number`,
          );
        }
        if (/Unit\s+10[0-9]\b/i.test(String(unit.title ?? ""))) {
          fail(`${key}: unit title embeds invalid global number: ${unit.title}`);
        }
        const unitLessons = (unit.lessonIds ?? [])
          .map((id) => lessonById.get(id))
          .filter(Boolean)
          .sort((a, b) => Number(a.displayOrder ?? a.order ?? 0) - Number(b.displayOrder ?? b.order ?? 0));
        const lessonOrders = unitLessons.map((lesson) =>
          Number(lesson.displayOrder ?? lesson.order),
        );
        const lessonExpected = unitLessons.map((_, index) => index + 1);
        if (lessonOrders.join(",") !== lessonExpected.join(",")) {
          fail(
            `${unit.id}: lesson displayOrder must be continuous 1..${unitLessons.length}, got [${lessonOrders.join(", ")}]`,
          );
        }
      }
    }

    if (key.endsWith("::core_foundation")) {
      const units = sortedCourses.flatMap((course) =>
        (course.units ?? [])
          .slice()
          .sort(
            (a, b) =>
              Number(a.displayOrder ?? a.order ?? 0) -
              Number(b.displayOrder ?? b.order ?? 0),
          ),
      );
      const orders = units.map((unit) => Number(unit.displayOrder ?? unit.order));
      const expected = units.map((_, index) => index + 1);
      if (orders.join(",") !== expected.join(",")) {
        fail(
          `${key}: unit displayOrder must be continuous 1..${units.length}, got [${orders.join(", ")}]`,
        );
      }
    }
  }

  // Japanese/English Core Foundation must come before Daily Life by course.order.
  for (const language of ["ja", "en"]) {
    const langCourses = courses
      .filter((course) => course.languageCode === language)
      .slice()
      .sort((a, b) => {
        const aRank = a.nicheId === "core_foundation" ? 0 : 1;
        const bRank = b.nicheId === "core_foundation" ? 0 : 1;
        if (aRank !== bRank) return aRank - bRank;
        return Number(a.order ?? 0) - Number(b.order ?? 0);
      });
    const niches = langCourses.map((course) => course.nicheId);
    const firstCore = niches.indexOf("core_foundation");
    const firstDaily = niches.indexOf("daily_life");
    if (firstCore < 0 || firstDaily < 0) {
      fail(`${language}: missing core_foundation or daily_life course`);
    } else if (firstCore > firstDaily) {
      fail(`${language}: Core Foundation must sort before Daily Life`);
    }
    const foundationUnits = langCourses
      .filter((course) => course.nicheId === "core_foundation")
      .flatMap((course) => course.units ?? []);
    if (foundationUnits.length >= 2) {
      const first = Number(foundationUnits[0].displayOrder ?? foundationUnits[0].order);
      const second = Number(foundationUnits[1].displayOrder ?? foundationUnits[1].order);
      if (first !== 1 || second !== 2) {
        fail(
          `${language} Core Foundation units must start Unit 1 then Unit 2, got ${first},${second}`,
        );
      }
    }
  }

  // Niche quick-select must not expose travel/restaurant as separate chips.
  const nicheOptions = await loadJson("shared/config/niche_options.json");
  const quickIds = nicheOptions
    .filter((n) => n.quickSelect !== false)
    .map((n) => n.id);
  for (const banned of ["travel_hotel", "restaurant_food_service"]) {
    if (quickIds.includes(banned)) {
      fail(`quick-select niches must not include separate chip ${banned}`);
    }
  }
  if (!quickIds.includes("daily_life")) fail("daily_life must remain a quick-select niche");
  if (!quickIds.includes("exam_preparation")) fail("exam_preparation branch missing from niches");
  for (const niche of nicheOptions) {
    if (!niche.iconKey || String(niche.iconKey).trim() === "") {
      fail(`niche ${niche.id} missing iconKey`);
    }
  }
  const examTracks = await loadJson("shared/config/exam_tracks.json");
  const NATIVE = ["vi", "en", "ja", "ko", "zh"];
  for (const [lang, tracks] of Object.entries(examTracks)) {
    const list = Array.isArray(tracks) ? tracks : [];
    const displayed = list.filter((track) => track.enabled !== false);
    if (displayed.length > 3) {
      fail(`exam_tracks.${lang}: more than 3 enabled/displayed tracks (${displayed.length})`);
    }
    const orders = displayed
      .map((track) => Number(track.displayOrder))
      .sort((a, b) => a - b);
    const expected = displayed.map((_, index) => index + 1);
    if (orders.join(",") !== expected.join(",")) {
      fail(
        `exam_tracks.${lang}: displayOrder must be continuous 1..${displayed.length}, got [${orders.join(", ")}]`,
      );
    }
    for (const track of displayed) {
      const label = `exam_tracks.${lang}.${track.id ?? "?"}`;
      if (!track.learningLanguage && !track.language) {
        fail(`${label}: missing learningLanguage`);
      }
      if (!track.examCode && !track.examTrack) {
        fail(`${label}: missing examCode`);
      }
      if (!track.iconKey || String(track.iconKey).trim() === "") {
        fail(`${label}: missing iconKey`);
      }
      const title = track.title;
      const description = track.shortDescription ?? track.description;
      if (!title || typeof title !== "object") {
        fail(`${label}: title must be localized object vi/en/ja/ko/zh`);
      } else {
        for (const code of NATIVE) {
          if (!title[code] || String(title[code]).trim() === "") {
            fail(`${label}: missing title.${code}`);
          }
        }
      }
      if (!description || typeof description !== "object") {
        fail(`${label}: shortDescription must be localized object vi/en/ja/ko/zh`);
      } else {
        for (const code of NATIVE) {
          if (!description[code] || String(description[code]).trim() === "") {
            fail(`${label}: missing shortDescription.${code}`);
          }
        }
      }
    }
  }
  for (const [lang, expected] of [
    ["ja", "JLPT"],
    ["en", "IELTS"],
    ["ko", "TOPIK"],
    ["zh", "HSK"],
    ["fr", "DELF"],
    ["de", "Goethe"],
    ["es", "DELE"],
  ]) {
    const tracks = examTracks[lang] ?? [];
    if (!tracks.some((track) => String(track.examCode ?? track.examTrack ?? "").includes(expected))) {
      fail(`exam_tracks.${lang} must include ${expected}`);
    }
  }
  try {
    const flutterExams = await loadJson(
      "mobile/novalang_flutter/assets/shared/exam_tracks.json",
    );
    if (JSON.stringify(flutterExams) !== JSON.stringify(examTracks)) {
      fail("Flutter exam_tracks.json out of sync with shared/config — run npm run sync:flutter-assets");
    }
  } catch (error) {
    fail(`Flutter exam_tracks.json missing/unreadable: ${error.message}`);
  }

  // After sync, Flutter assets should match; warn only (generate→validate→sync order).
  validateKanaCoverage(lessons, {
    script: "hiragana",
    moduleId: "hiragana_starter",
    expected: EXPECTED_HIRAGANA_46,
  });
  validateKanaCoverage(lessons, {
    script: "katakana",
    moduleId: "katakana_starter",
    expected: EXPECTED_KATAKANA_46,
  });
  validateAlphabetCoverage(lessons);

  try {
    const flutterLessons = await loadJson(
      "mobile/novalang_flutter/assets/shared/lessons.json",
    );
    const flutterCourses = await loadJson(
      "mobile/novalang_flutter/assets/shared/courses.json",
    );
    if (flutterLessons.version !== coursesPayload.version) {
      fail("Flutter lessons.json version mismatch — run npm run sync:flutter-assets");
    }
    if (JSON.stringify(flutterCourses.courses) !== JSON.stringify(coursesPayload.courses)) {
      fail("Flutter courses.json out of sync with shared/generated — run npm run sync:flutter-assets");
    }
  } catch (error) {
    fail(`Flutter shared assets missing/unreadable: ${error.message}`);
  }

  // --- Lớp CẢNH BÁO MỀM từ rules/ (2026-07-18) ---
  // Chỉ 2 check đã hiệu chỉnh trên 506 bài thật (text-fields + register ja,
  // xem rules/_legacy/golden-lesson-test-2026-07-18.md): IN CẢNH BÁO, KHÔNG
  // BAO GIỜ đẩy vào `errors`/fail build — không thay đổi hành vi pass/fail
  // hiện có của validator này theo bất kỳ cách nào. provenance suy tại chỗ
  // là owner_approved cho nội dung literal (quyết định owner), nên không có
  // check distractor ở đây (luôn miễn, không cần chạy). Bọc try/catch riêng:
  // lớp mềm lỗi cũng không được kéo sập validator chính.
  try {
    const softWarnings = runSoftLinguisticChecks(lessons, path.join(ROOT, "rules"));
    if (softWarnings.length) {
      console.warn(`\n[rules/] ${softWarnings.length} cảnh báo mềm (không chặn build, xem rules/_legacy/golden-lesson-test-2026-07-18.md):`);
      for (const w of softWarnings) console.warn(`  ! ${w}`);
    }
  } catch (error) {
    console.warn(`[rules/] lớp cảnh báo mềm gặp lỗi nội bộ, bỏ qua (không chặn build): ${error.message}`);
  }

  if (errors.length) {
    console.error(`validate:curriculum FAILED (${errors.length} error(s)):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log(
    `validate:curriculum PASS — ${courses.length} courses, ${lessons.length} lessons, version ${coursesPayload.version}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
