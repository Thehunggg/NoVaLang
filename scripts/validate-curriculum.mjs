#!/usr/bin/env node
/**
 * Validate shared curriculum output for Web + Flutter.
 * Run: npm run validate:curriculum
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  looksVietnamese,
  validateByNativeMap,
  validateTranslationsMap,
} from "./lib/native-localization.mjs";

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

const errors = [];
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
  // Katakana Exercise 8 uses the same listening-vocabulary challenge format as Hiragana L1.
  if (isFoundation && String(lesson.id).includes("katakana") && index === 7) {
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

async function main() {
  const coursesPayload = await loadJson("shared/generated/courses.json");
  const lessonsPayload = await loadJson("shared/generated/lessons.json");
  const catalog = await loadJson("shared/generated/curriculum_catalog.json");
  const languageOptions = await loadJson("shared/config/language_options.json");

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
  if (languageOptions.length !== 20) {
    fail(`language catalog must have 20 learning languages — got ${languageOptions.length}`);
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

  const allowedNiches = new Set(["daily_life", "core_foundation"]);
  for (const lesson of lessons) {
    if (!["en", "ja"].includes(lesson.languageCode)) {
      fail(`${lesson.id}: only en/ja playable lessons allowed in this scope`);
    }
    if (!allowedNiches.has(lesson.nicheId)) {
      fail(`${lesson.id}: unexpected nicheId ${lesson.nicheId}`);
    }
    if ((lesson.exercises ?? []).length !== 10) {
      fail(`${lesson.id}: must have exactly 10 exercises (got ${(lesson.exercises ?? []).length})`);
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
    (lesson.exercises ?? []).forEach((ex, i) => validateExercise(lesson, ex, i));
    for (const vocab of lesson.vocabulary ?? []) {
      validateJapaneseItem(lesson, vocab, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.translations) validateTranslations(vocab.translations, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.displayText === "こんにちわ" || vocab.text === "こんにちわ") {
        fail(`${lesson.id}: use こんにちは, not こんにちわ`);
      }
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

  // 10 hiragana + 10 katakana + 6 alphabet + 6 en greetings + 6 ja greetings
  if (lessons.length !== 38) {
    fail(
      `Expected 38 playable lessons (26 foundation + 12 greetings), got ${lessons.length}`,
    );
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

  // Unit/lesson displayOrder must be continuous 1..N within language+niche (and within each unit).
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
    if (units.length < 10) {
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
      }
    }
    for (const unit of units) {
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
