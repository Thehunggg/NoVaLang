#!/usr/bin/env node
/**
 * Validate shared curriculum output for Web + Flutter.
 * Run: npm run validate:curriculum
 */

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  NATIVE_CODES,
  looksVietnamese,
  validateByNativeMap,
  validateTranslationsMap,
} from "./lib/native-localization.mjs";
import { containsKana } from "./lib/japanese-pronunciation.mjs";
import { requireGeneratedQ14Romanization } from "./lib/q14-romanization-validation.mjs";
// Mẫu tên nháp còn sót — MỘT nguồn dùng chung với smoke-curriculum-flow.mjs
// (vá 2026-07-31, xem comment trong lib/draft-character-names.mjs).
import { DRAFT_CHARACTER_NAME_RE } from "./lib/draft-character-names.mjs";
// WALK CHUNG (2026-07-30) — dùng lại cho cổng chặn nhắc-nguồn trong nội dung
// hiển thị (§G5, vá 2026-08-01). Xem comment đầu file lesson-walk.mjs.
import { walkLessonStrings } from "./lib/lesson-walk.mjs";
// Ràng buộc định lượng của five_cards: KHOẢNG + lý do, giữ ở MỘT nơi
// (scripts/lib/five-cards-ranges.mjs) để validator và smoke không lệch nhau,
// và để người sửa sau đọc được căn cứ ngay tại chỗ. §D6c.
import { FIVE_CARDS_RANGES as RANGE, inRange, rangeText } from "./lib/five-cards-ranges.mjs";
// Bài tổng hợp cuối unit (ADR-022): dùng CHUNG hằng số với generator để ngưỡng
// vận hành (§F-h) chỉ nằm MỘT nơi — owner chỉnh một chỗ là cả generator lẫn
// validator cùng đổi, không lệch nhau.
import {
  planForLessonCount,
  BLANKS_BY_KIND,
  CHOICE_OPTION_COUNT,
  DIALOGUE_TURN_RANGE,
  MAX_TRAILING_BLANK_RATIO,
  MAX_CONSECUTIVE_SAME_LESSON,
} from "./lib/unit-comprehensive-test.mjs";
import { runSoftLinguisticChecks } from "../tools/lib/soft-linguistic-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
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

/**
 * Bóc furigana 「漢字（かな）」 → 「漢字」.
 *
 * Khoá nội dung Golden (ADR-008) đóng băng CÂU CHỮ, không đóng băng lớp hỗ trợ
 * đọc. Từ 2026-07-25 mọi kanji hiển thị đều kèm hiragana, nên khoá phải so
 * phần nội dung sau khi bóc — vẫn bắt được mọi thay đổi câu chữ thật, mà không
 * báo động vì một chú âm.
 */
const stripFurigana = (text) => String(text ?? '').replace(/（[぀-ゟー]+）/g, '');
export const errors = [];
const fail = (msg) => errors.push(msg);

/**
 * §B2c — 5 trường chi tiết từ vựng, khuôn lấy từ Golden L1 (không tự nghĩ khuôn
 * mới): dùng lúc nào · dùng với ai · tránh khi nào · mức lịch sự · cách nói
 * thân mật tương đương.
 */
export const VOCABULARY_DETAIL_FIELDS = [
  "timingAndContext",
  "appropriateFor",
  "avoid",
  "register",
  "formal",
  "casual",
];

/** Gom CẢNH BÁO MỀM §B2c — không bao giờ đẩy vào `errors`, không chặn build. */
const vocabularyDetailWarnings = [];

/**
 * CẢNH BÁO MỀM: thẻ `vocabularyDetails` **thiếu hẳn key** của một trường chi
 * tiết = CHƯA ĐIỀN (§B2c) → cảnh báo.
 *
 * Mảng rỗng `[]` / chuỗi rỗng `''` = ĐÃ KIỂM, cụm này thật sự không có thông
 * tin ở trường đó → im lặng. Phân biệt bằng `hasOwnProperty`, KHÔNG bằng độ
 * dài — đó chính là cơ chế đánh dấu mà §B2c đề xuất, và nó hoạt động được vì
 * dữ liệu hiện tại thiếu key hẳn chứ không phải rỗng.
 *
 * Mức mềm là cố ý: L2/L3 đang trống toàn bộ, fail cứng sẽ chặn mọi thứ.
 */
function collectVocabularyDetailWarnings(lesson) {
  for (const card of lesson.fiveCardContent?.vocabularyDetails ?? []) {
    const missing = VOCABULARY_DETAIL_FIELDS.filter(
      (field) => !Object.prototype.hasOwnProperty.call(card, field),
    );
    if (missing.length) {
      vocabularyDetailWarnings.push(
        `${lesson.id} · ${card.id}: chưa điền ${missing.join(", ")}`,
      );
    }
  }
}

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
 * BÀI TỔNG HỢP CUỐI UNIT (ADR-022) — kiểm trên OUTPUT ĐÃ SINH.
 *
 * Generator (`scripts/lib/unit-comprehensive-test.mjs`) đã throw ngay khi
 * nguồn sai, nhưng hàm này kiểm lại trên JSON đã sinh — cùng mô hình
 * `validateFiveCardsStructure` (generator dựng, validator soi lại output).
 * Bắt được cả trường hợp generated JSON bị sửa tay (điều bị cấm nhưng vẫn có
 * thể xảy ra) và là cửa kiểm mà CI/owner thật sự chạy.
 *
 * Unit KHÔNG có `comprehensiveTest` là HỢP LỆ — không lỗi, không cảnh báo.
 *
 * Exported ở module scope để script độc lập import chạy thử trực tiếp.
 */
/**
 * §B2e — MỨC ĐỘ LỊCH SỰ chỉ có ĐÚNG BA (owner chốt 2026-07-25):
 * **trang trọng · lịch sự · thân mật**. Không "trung tính", không "thông
 * thường", không biến thể mô tả dài kiểu "trung tính, lịch sự an toàn".
 *
 * MỨC CỨNG, có lý do: đây là từ vựng ĐÓNG do owner ấn định, không phải văn
 * xuôi tự do. Một giá trị ngoài danh sách nghĩa là có người vừa đặt ra một mức
 * thứ tư — đúng loại trôi mà owner đã phải nhắc nhiều lần, nên phải chặn ngay
 * chứ không nhắc nhở.
 *
 * `''` và thiếu key vẫn hợp lệ: §B2c đã quy định chúng mang nghĩa "đã kiểm,
 * không có" và "chưa điền". Luật này chỉ khoá TỪ VỰNG NHÃN, không ép phải điền.
 */
const ALLOWED_REGISTERS = new Set([
  // vi
  "Trang trọng.",
  "Lịch sự.",
  "Thân mật.",
  // en
  "Formal.",
  "Polite.",
  "Casual.",
  // ja
  "改まった言い方。",
  "丁寧。",
  "カジュアル。",
]);

function validateRegisterVocabulary(node, lessonId, path = "") {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((item, index) =>
      validateRegisterVocabulary(item, lessonId, `${path}[${index}]`),
    );
    return;
  }
  if (typeof node !== "object") return;

  for (const [key, value] of Object.entries(node)) {
    const here = path ? `${path}.${key}` : key;
    if (key === "register" || key === "registerByNative") {
      const candidates =
        typeof value === "string" ? [value] : Object.values(value ?? {});
      for (const candidate of candidates) {
        if (typeof candidate !== "string" || candidate === "") continue;
        if (!ALLOWED_REGISTERS.has(candidate)) {
          fail(
            `${lessonId}: mức độ lịch sự KHÔNG hợp lệ tại ${here} — ` +
              `${JSON.stringify(candidate)}. Chỉ nhận trang trọng / lịch sự / ` +
              `thân mật (§B2e).`,
          );
        }
      }
      continue;
    }
    validateRegisterVocabulary(value, lessonId, here);
  }
}

/**
 * §G5 (LESSON_AUTHORING_STANDARD.md) — "Ghi nguồn / bậc CHỈ nằm trong báo cáo
 * cho owner — KHÔNG vào data app." Ca rò rỉ thật phát hiện 2026-08-01: ghi chú
 * thẻ từ vựng とんでもない nhắc "Theo JMdict"/"Theo 敬語の指針", tình huống hội
 * thoại nhắc "trong nguồn"/"đúng trạng thái trong nguồn" — người học đọc được
 * cả trên web (FiveCardVocabulary/FiveCardGrammar, nhãn "Ghi chú quan trọng")
 * lẫn Flutter (lesson_five_card_pages.dart, lesson_screen.dart).
 *
 * QUÉT TOÀN BỘ CÂY, không lọc theo tên trường: registry render-coverage.json
 * (G14-R14) chỉ theo dõi trường CHỨA KÝ TỰ NHẬT (`_luuY` trong chính file đó)
 * — `notes`/`overview`/`timingAndContext`… là học liệu tiếng Việt/Anh thuần
 * nên NẰM NGOÀI registry đó dù widget vẫn vẽ ra màn hình thật. Đây chính là
 * trường xảy ra rò rỉ, nên cổng này không dùng lại registry mà quét mọi chuỗi
 * lá của lesson/comprehensiveTest — không có trường nào trong data app có lý
 * do chính đáng để nhắc tên một cuốn từ điển/giáo trình cụ thể.
 *
 * KHỚP — TRÁNH ÂM TÍNH GIẢ (owner yêu cầu ví dụ cụ thể, cả hai đều có thật
 * trong bài đã duyệt và KHÔNG được coi là rò rỉ):
 *   - "nguồn nước" (nghĩa đen: nước) — nếu khớp bare "nguồn" sẽ bị chặn oan.
 *   - "Dạng từ điển — mức lịch sự nằm ở cách chia: 慣れます／慣れる" (u2-l2,
 *     dạng TỪ ĐIỂN = dictionary form, thuật ngữ ngữ pháp) — nếu khớp bare
 *     "từ điển" sẽ bị chặn oan.
 * → Tên riêng/thương hiệu (không có nghĩa nào khác trong văn xuôi dạy học)
 *   khớp BARE. Danh từ chung mơ hồ (nguồn, từ điển, dictionary, 辞書…) chỉ
 *   khớp khi đi kèm cụm mang nghĩa TRÍCH DẪN (theo/trong/trích từ…) — bare
 *   một mình không đủ để khớp.
 *
 * MỞ RỘNG 2026-08-01 (§G5 mục 5) — chú thích PROVENANCE lọt vào nội dung
 * hiển thị: nhãn trang duyệt kiểu "✎ tự soạn — <reason>" / "↩ <file>:<dòng>"
 * (xem provBadge() trong scripts/preview-lesson.mjs) chỉ được sống ở trang
 * duyệt + file provenance — không có lý do chính đáng để một trong các nhãn
 * đó (hay cụm "verbatim"/"roster"/"gắn tên nhân vật") xuất hiện trong data
 * app. Quét thật 2026-08-01: 0 chỗ trong lessons.json/courses.json (cả bản
 * shared/generated lẫn bản đồng bộ Flutter) — thêm pattern đây là PHÒNG,
 * không phải vá một rò rỉ đã xảy ra.
 *   - "<file>:<dòng>" khớp bằng regex tên-file (chữ/số/khoảng trắng/gạch
 *     ngang/gạch dưới, có dấu tiếng Việt) + đúng đuôi .json/.md/.txt + ":" +
 *     số — phá thật 2 câu đối kháng để tránh chặn oan giờ giấc kiểu "8:30" và
 *     câu liệt kê "Chương 5: ...": cả hai đều KHÔNG khớp (không có đuôi file).
 */
const SOURCE_MENTION_PATTERNS = [
  // Tên riêng / thương hiệu — không có cách dùng nào khác trong văn xuôi dạy
  // học, khớp bare an toàn.
  { label: "JMdict", re: /JMdict/i },
  { label: "Irodori", re: /Irodori/i },
  { label: "hanabira", re: /hanabira/i },
  { label: "Tanos", re: /Tanos/i },
  { label: "kanji-data", re: /kanji-data/i },
  { label: "Collins", re: /Collins/i },
  { label: "敬語の指針", re: /敬語の指針/ },
  { label: "出典", re: /出典/ },
  // Danh từ chung mơ hồ — CHỈ khớp khi đi kèm cụm mang nghĩa trích dẫn, để
  // không chặn oan "nguồn nước" / "nguồn gốc" / "dạng từ điển" (辞書形).
  { label: "trong nguồn", re: /\btrong\s+nguồn\b/i },
  { label: "theo nguồn", re: /\btheo\s+nguồn\b/i },
  { label: "nguồn tìm được", re: /\bnguồn\s+tìm\s+được\b/i },
  { label: "nguồn tài liệu", re: /\bnguồn\s+tài\s+liệu\b/i },
  { label: "theo từ điển", re: /\btheo\s+từ\s+điển\b/i },
  { label: "trong từ điển", re: /\btrong\s+từ\s+điển\b/i },
  { label: "trích từ", re: /\btrích\s+từ\b/i },
  { label: "theo sách", re: /\btheo\s+sách\b/i },
  { label: "giáo trình", re: /\bgiáo\s+trình\b/i },
  { label: "textbook", re: /\btextbook\b/i },
  { label: "dictionary (trích dẫn)", re: /\b(?:according to|per|in)\s+(?:the\s+|a\s+)?dictionary\b/i },
  { label: "辞書 (trích dẫn, khác 辞書形)", re: /辞書(?!形)/ },
  // Nhãn PROVENANCE (trang duyệt G14-R15 / file provenance) — không có lý do
  // chính đáng để lọt vào data app, khớp bare an toàn (không đụng phải nghĩa
  // nào khác trong văn xuôi dạy học tiếng Việt/Anh/Nhật của app này).
  { label: "✎", re: /✎/ },
  { label: "tự soạn", re: /\btự\s+soạn\b/i },
  { label: "verbatim", re: /\bverbatim\b/i },
  { label: "câu do người viết soạn", re: /do\s+người\s+viết\s+soạn/i },
  { label: "authored", re: /\bauthored\b/i },
  { label: "roster", re: /\broster\b/i },
  { label: "gắn tên nhân vật", re: /gắn\s+tên\s+nhân\s+vật/i },
  // "<file>:<dòng>" — mẫu trích dòng nguồn (vd IRODORI_So_cap_1_A2.md:23239).
  // Bắt đúng tên-file+đuôi thật (.json/.md/.txt) + ":" + số, để KHÔNG khớp
  // giờ giấc ("8:30") hay câu liệt kê ("Chương 5: ...") — cả hai không có
  // đuôi file nên không khớp.
  { label: "<file>:<dòng>", re: /[\p{L}\p{N}_\- ]+\.(?:json|md|txt):\d+/u },
];

function findSourceMention(value) {
  for (const { label, re } of SOURCE_MENTION_PATTERNS) {
    if (re.test(value)) return label;
  }
  return null;
}

function validateNoSourceMentionInDisplay(root, label) {
  for (const { path, value } of walkLessonStrings(root)) {
    const hit = findSourceMention(value);
    if (hit) {
      fail(
        `${label}: ${path} nhắc nguồn/từ điển trong nội dung hiển thị ` +
          `(khớp "${hit}") — §G5 chỉ cho phép ghi nguồn trong báo cáo cho ` +
          `owner, không được vào data app: ${JSON.stringify(value)}`,
      );
    }
  }
}

/**
 * §B2d — mọi kanji HIỂN THỊ cho người học phải kèm hiragana (owner chốt
 * 2026-07-25), ở MỌI cấp độ.
 *
 * MỨC CỨNG, có lý do: generator đã gắn furigana ở một chỗ duy nhất ngay trước
 * khi ghi, nên output luôn đạt. Một lỗi ở đây nghĩa là cơ chế đó bị gỡ hoặc bị
 * đi vòng — đúng loại hỏng phải chặn build, không phải nhắc nhở. Giới hạn ở
 * ngôn ngữ ja: tiếng Trung cũng dùng chữ Hán nhưng không có furigana, ép chung
 * là sai.
 */
const FURIGANA_DISPLAY_FIELDS = new Set([
  "displayText",
  "text",
  "targetText",
  "displayAnswer",
  "term",
  "pattern",
]);
const KANJI_PATTERN = /[一-龯]/;
const FURIGANA_PATTERN = /（[぀-ゟー]+）/;

function validateFuriganaCoverage(node, lessonId, path = "") {
  if (node == null) return;
  if (typeof node === "string") {
    const field = path.split(".").pop().replace(/\[\d+\]$/, "");
    if (!FURIGANA_DISPLAY_FIELDS.has(field)) return;
    if (KANJI_PATTERN.test(node) && !FURIGANA_PATTERN.test(node)) {
      fail(
        `${lessonId}: kanji hiển thị KHÔNG kèm hiragana tại ${path} — ` +
          `${JSON.stringify(node)} (§B2d)`,
      );
    }
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) =>
      validateFuriganaCoverage(item, lessonId, `${path}[${index}]`),
    );
    return;
  }
  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      validateFuriganaCoverage(value, lessonId, path ? `${path}.${key}` : key);
    }
  }
}

/** Gom CẢNH BÁO MỀM §B16 "cụm LUÔN SAI" — không bao giờ chặn build. */
const alwaysWrongWarnings = [];

/**
 * §B16 — CẢNH BÁO MỀM: cụm làm phương án sai ở >= 3 câu mà KHÔNG lần nào là
 * đáp án đúng. Đó là mẫu "thấy X thì loại" — người học đoán được mà không cần
 * hiểu.
 *
 * MỨC MỀM là bắt buộc, không phải nhân nhượng: §B16 MIỄN TRỪ các **dạng méo cố
 * ý** (thiếu thành phần bắt buộc, dạng bài học cấm rõ, trợ từ nhân đôi) — chúng
 * tồn tại chỉ để làm phương án sai, và máy KHÔNG phân biệt được chúng với một
 * biểu thức hợp lệ. Nên đây là việc người phải xét; máy chỉ chỉ chỗ để soi.
 */
function collectAlwaysWrongWarnings(unit) {
  const questions = unit?.comprehensiveTest?.questions ?? [];
  const wrongIn = new Map();
  const rightIn = new Map();
  const add = (map, key, order) => {
    if (!map.has(key)) map.set(key, new Set());
    map.get(key).add(order);
  };

  for (const q of questions) {
    const correct = (q.options ?? []).find((o) => o.id === q.correctOptionId);
    if (!correct) continue;
    for (const b of q.blanks ?? []) {
      add(rightIn, correct.answersByBlankId?.[b.id], q.order);
    }
    for (const opt of q.options ?? []) {
      if (opt.id === q.correctOptionId) continue;
      for (const b of q.blanks ?? []) {
        const value = opt.answersByBlankId?.[b.id];
        // Chỉ tính cụm KHÁC đáp án đúng ở CÙNG ô — cụm trùng đáp án không phải
        // thứ khiến phương án đó sai.
        if (value !== correct.answersByBlankId?.[b.id]) add(wrongIn, value, q.order);
      }
    }
  }

  for (const [phrase, orders] of wrongIn) {
    if (orders.size < 3) continue;
    if ((rightIn.get(phrase)?.size ?? 0) > 0) continue;
    alwaysWrongWarnings.push(
      `${unit.id}: '${phrase}' làm phương án sai ở ${orders.size} câu ` +
        `(${[...orders].sort((a, b) => a - b).join(', ')}) mà KHÔNG lần nào là đáp án ` +
        `đúng — kiểm xem có phải dạng méo cố ý (§B16 miễn trừ) hay không.`,
    );
  }
}

export function validateUnitComprehensiveTest(unit) {
  const test = unit?.comprehensiveTest;
  if (!test) return; // unit chưa có bài tổng hợp — trạng thái hợp lệ.

  collectAlwaysWrongWarnings(unit);

  const lessonIds = unit.lessonIds ?? [];
  const at = `${unit.id} comprehensiveTest`;

  validateNoSourceMentionInDisplay(test, at);

  if (test.unitId !== unit.id) {
    fail(`${at}: unitId='${test.unitId}' không khớp unit chứa nó ('${unit.id}')`);
  }
  if (test.format !== "unit_comprehensive_cloze") {
    fail(`${at}: format phải là 'unit_comprehensive_cloze' (đang '${test.format}')`);
  }
  if (test.plan !== "plus") fail(`${at}: plan phải là 'plus' (đang '${test.plan}')`);
  if (test.graded !== true) fail(`${at}: graded phải là true`);

  // sourceLessonIds phải đúng các lesson của unit.
  const src = test.sourceLessonIds ?? [];
  if (src.join(",") !== lessonIds.join(",")) {
    fail(`${at}: sourceLessonIds [${src.join(", ")}] không khớp lessonIds của unit [${lessonIds.join(", ")}]`);
  }

  // Số câu + chia mức suy ra từ số lesson thật.
  let plan;
  try {
    plan = planForLessonCount(lessonIds.length);
  } catch (error) {
    fail(`${at}: ${error.message}`);
    return;
  }
  const questions = test.questions ?? [];
  if (test.totalQuestions !== plan.totalQuestions || questions.length !== plan.totalQuestions) {
    fail(
      `${at}: unit ${lessonIds.length} lesson phải có đúng ${plan.totalQuestions} câu ` +
        `(chia ${plan.sections.map((s) => s.count).join("/")}) — ` +
        `totalQuestions=${test.totalQuestions}, questions=${questions.length}`,
    );
    return;
  }

  // order 1..N đủ, không trùng.
  const orders = questions.map((q) => q.order).sort((a, b) => a - b);
  const expectedOrders = Array.from({ length: plan.totalQuestions }, (_, i) => i + 1);
  if (orders.join(",") !== expectedOrders.join(",")) {
    fail(`${at}: order phải là 1..${plan.totalQuestions} đủ và không trùng (đang: ${orders.join(",")})`);
    return;
  }

  const kindForOrder = (order) =>
    plan.sections.find((s) => order >= s.start && order <= s.end)?.kind ?? null;
  const bodySegments = (q) =>
    q.kind === "dialogue_multi_blank_choice"
      ? (q.dialogue ?? []).flatMap((t) => t.segments ?? [])
      : (q.segments ?? []);

  const ordered = [...questions].sort((a, b) => a.order - b.order);

  for (const q of ordered) {
    const qAt = `${at} câu order=${q.order}`;

    const expectedKind = kindForOrder(q.order);
    if (q.kind !== expectedKind) {
      fail(`${qAt}: kind='${q.kind}' nhưng dải order này phải là '${expectedKind}'`);
      continue;
    }

    // Thân câu đúng trường theo kind.
    if (q.kind === "dialogue_multi_blank_choice") {
      const turns = (q.dialogue ?? []).length;
      if (turns < DIALOGUE_TURN_RANGE.min || turns > DIALOGUE_TURN_RANGE.max) {
        fail(`${qAt}: hội thoại ${turns} lượt — phải ${DIALOGUE_TURN_RANGE.min}–${DIALOGUE_TURN_RANGE.max} lượt`);
      }
      if (q.segments) fail(`${qAt}: kind hội thoại không dùng 'segments'`);
    } else {
      if (!(q.segments ?? []).length) fail(`${qAt}: thiếu 'segments'`);
      if (q.dialogue) fail(`${qAt}: kind này không dùng 'dialogue'`);
    }

    // Số ô theo kind.
    const rule = BLANKS_BY_KIND[q.kind] ?? {};
    const blanks = q.blanks ?? [];
    if (rule.exactly !== undefined && blanks.length !== rule.exactly) {
      fail(`${qAt}: có ${blanks.length} ô — kind này phải đúng ${rule.exactly}`);
    }
    if (rule.min !== undefined && blanks.length < rule.min) {
      fail(`${qAt}: có ${blanks.length} ô — kind này cần tối thiểu ${rule.min}`);
    }

    // blankId khớp 1-1 giữa thân câu và blanks[].
    const bodyIds = bodySegments(q).filter((s) => s.blankId).map((s) => s.blankId);
    const declaredIds = blanks.map((b) => b.id);
    const onlyDeclared = declaredIds.filter((id) => !bodyIds.includes(id));
    const onlyBody = bodyIds.filter((id) => !declaredIds.includes(id));
    if (onlyDeclared.length || onlyBody.length) {
      fail(
        `${qAt}: blankId lệch — khai nhưng không có trong câu: [${onlyDeclared.join(", ")}]; ` +
          `có trong câu nhưng không khai: [${onlyBody.join(", ")}]`,
      );
    }

    // acceptedAnswers chứa canonicalAnswer.
    for (const b of blanks) {
      if (!(b.acceptedAnswers ?? []).length) {
        fail(`${qAt}: ô '${b.id}' thiếu acceptedAnswers`);
      } else if (!b.acceptedAnswers.includes(b.canonicalAnswer)) {
        fail(`${qAt}: ô '${b.id}' có acceptedAnswers không chứa canonicalAnswer ('${b.canonicalAnswer}')`);
      }
    }

    // Phương án chọn.
    if (q.kind === "typed_blank") {
      if (q.options || q.correctOptionId) fail(`${qAt}: câu tự gõ không dùng options/correctOptionId`);
    } else {
      const options = q.options ?? [];
      if (options.length !== CHOICE_OPTION_COUNT) {
        fail(`${qAt}: có ${options.length} phương án — phải đúng ${CHOICE_OPTION_COUNT}`);
      }
      if (!hasUnique(options.map((o) => o.id))) fail(`${qAt}: trùng id phương án`);
      for (const opt of options) {
        const answered = Object.keys(opt.answersByBlankId ?? {});
        const missing = declaredIds.filter((id) => !answered.includes(id));
        const extra = answered.filter((id) => !declaredIds.includes(id));
        if (missing.length || extra.length) {
          fail(
            `${qAt}: phương án '${opt.id}' phải phủ đúng đủ mọi ô — ` +
              `thiếu: [${missing.join(", ")}]; dư: [${extra.join(", ")}]`,
          );
        }
      }
      const correct = options.find((o) => o.id === q.correctOptionId);
      if (!correct) {
        fail(`${qAt}: correctOptionId='${q.correctOptionId}' không trỏ tới phương án nào`);
      } else {
        for (const b of blanks) {
          const filled = correct.answersByBlankId?.[b.id];
          if (!(b.acceptedAnswers ?? []).includes(filled)) {
            fail(`${qAt}: phương án đúng điền '${filled}' vào ô '${b.id}' nhưng không có trong acceptedAnswers`);
          }
        }
      }
    }

    // §G7 — mọi mục ôn phải trỏ về lesson thuộc unit này.
    if (!(q.reviews ?? []).length) {
      fail(`${qAt}: thiếu reviews — không chứng minh được §G7`);
    }
    for (const r of q.reviews ?? []) {
      if (!lessonIds.includes(r.lessonId)) {
        fail(`${qAt}: reviews trỏ lesson '${r.lessonId}' không thuộc unit này — vi phạm §G7`);
      }
    }
  }

  // Luật toàn bài: vị trí ô trống + trộn xen kẽ lesson.
  const endsWithBlank = (q) => {
    const segs = bodySegments(q);
    return Boolean(segs[segs.length - 1]?.blankId);
  };
  const trailing = ordered.filter(endsWithBlank).length;
  const ratio = trailing / ordered.length;
  if (ratio > MAX_TRAILING_BLANK_RATIO) {
    fail(
      `${at}: ${trailing}/${ordered.length} câu (${Math.round(ratio * 100)}%) kết thúc bằng ô trống — ` +
        `vượt ngưỡng ${Math.round(MAX_TRAILING_BLANK_RATIO * 100)}% (§E4: ô trống phải rải, ` +
        `luôn khoét cuối câu khiến người học đoán theo thói quen)`,
    );
  }

  let run = 0;
  let runLesson = null;
  for (const q of ordered) {
    const lessons = new Set((q.reviews ?? []).map((r) => r.lessonId));
    const only = lessons.size === 1 ? [...lessons][0] : null;
    if (only && only === runLesson) run += 1;
    else {
      run = only ? 1 : 0;
      runLesson = only;
    }
    if (run > MAX_CONSECUTIVE_SAME_LESSON) {
      fail(
        `${at}: ${run} câu liên tiếp chỉ ôn lesson '${runLesson}' (tới order=${q.order}) — ` +
          `vượt ngưỡng ${MAX_CONSECUTIVE_SAME_LESSON} (§E4: kiến thức các lesson phải xen kẽ)`,
      );
      break;
    }
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
// G14-R14 [JA] (c) — CHẶN CỨNG: câu HIỂN THỊ có kanji thì phải có nguyên liệu
// trợ đọc, tức `reading` bên cạnh hoặc chú âm gõ thẳng vào mặt chữ. Thiếu là
// người học gặp kanji trần, và công tắc [Furigana] không có gì để dựng.
//
// Chỉ soi TRƯỜNG CÂU ĐÍCH, không soi mọi chuỗi có ký tự Nhật: `prompt`,
// `explanation`… trong giao diện tiếng Nhật đương nhiên có kanji mà không cần
// chú âm — chúng là lời dẫn, không phải câu để học đọc.
//
// Câu TOÀN KANA không cần `reading` (nó chính là dòng đọc), nên không tính.
const R14_SENTENCE_FIELDS = new Set(["displayText", "targetText", "text", "term"]);
const R14_KANJI = /[一-龯㐀-䶿々]/;
const R14_FURIGANA = /（[぀-ゟー]+）/;

function validateJapaneseReadingMaterial(lesson) {
  if (lesson.languageCode !== "ja") return; // tầng [JA] — ngôn ngữ khác tự miễn
  const missing = [];
  const walk = (node, where) => {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${where}[${i}]`));
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      const here = where ? `${where}.${key}` : key;
      if (typeof value === "string") {
        if (!R14_SENTENCE_FIELDS.has(key)) continue;
        if (!R14_KANJI.test(value)) continue;
        if (R14_FURIGANA.test(value)) continue;
        if (typeof node.reading === "string" && node.reading.trim()) continue;
        missing.push(`${here} = ${value.slice(0, 40)}`);
      } else walk(value, here);
    }
  };
  walk(lesson.fiveCardContent ?? {}, "fiveCardContent");
  walk({ vocabulary: lesson.vocabulary ?? [] }, "");
  for (const m of missing) {
    fail(`${lesson.id}: G14-R14 [JA] — câu hiển thị có kanji mà thiếu chú âm/reading: ${m}`);
  }
}

export function validateFiveCardsStructure(lesson) {
  validateJapaneseReadingMaterial(lesson);
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
  // Card 2 vocabulary count: a RANGE, not a fixed number. The old "exactly 8"
  // check was a Golden-Lesson-specific implementation detail that leaked
  // into this generic function when ADR-019 generalized it for reuse across
  // every five_cards lesson — 8 was never a documented Format 2.0/3.0
  // product requirement (see .cursor/rules/03_novalang_lesson_format_2_0.mdc
  // Card 2, which only says to preserve the approved source's vocabulary
  // data/order, not a literal count). Content authors decide the real count
  // per lesson; this only guards against an empty/near-empty card (min) and
  // an unreasonably bloated one (max). What remains hard-enforced: `vocabulary`
  // and `vocabularyDetails` must have the SAME count and match ids 1-1 in the
  // same order — only the total is flexible, not the pairing between the two
  // arrays (owner decision, 2026-07-19).
  const MIN_VOCAB_CARDS = 6;
  const MAX_VOCAB_CARDS = 15;
  const vocabList = lesson.vocabulary ?? [];
  const vocabDetailsList = content.vocabularyDetails ?? [];
  if (vocabList.length < MIN_VOCAB_CARDS || vocabList.length > MAX_VOCAB_CARDS) {
    fail(`${lesson.id}: Card 2 must contain between ${MIN_VOCAB_CARDS} and ${MAX_VOCAB_CARDS} vocabulary cards, got ${vocabList.length}`);
  }
  if (vocabDetailsList.length !== vocabList.length) {
    fail(`${lesson.id}: Card 2 vocabularyDetails count (${vocabDetailsList.length}) must match vocabulary count (${vocabList.length})`);
  }
  const vocabIds = vocabList.map((item) => item?.id);
  const vocabDetailIds = vocabDetailsList.map((item) => item?.id);
  if (vocabIds.some((id, index) => id !== vocabDetailIds[index])) {
    fail(`${lesson.id}: Card 2 vocabulary and vocabularyDetails must match ids 1-1 in the same order`);
  }
  const groups = content.dialogueGroups ?? [];
  // §D3 (owner 2026-07-27): độ dài đi theo ĐOẠN NGUỒN, không theo con số ép.
  // Sàn 2 = ngưỡng thật của một trao đổi (một người nói, một người đáp). Sàn 4 cũ
  // CAO HƠN cái nguồn cấp — đo 634 đoạn hội thoại giáo trình A1→B1: trung vị 2
  // lượt, riêng mảng chào hỏi nhập môn không có đoạn nào quá 3 — nên nó buộc
  // người viết tự kéo dài, tức tự xếp (§G10). Trần 8 = 99% đoạn thật (95% ≤ 6,
  // dài nhất 12); quá 8 thì hết là hội thoại mẫu nghe-nhắc-lại và thành bài đọc
  // hiểu, vốn là việc của Q14 chứ không phải card 3.
  if (!inRange(groups.length, RANGE.dialogueGroups) || groups.some((group) => !inRange((group.lines ?? []).length, RANGE.dialogueLinesPerGroup))) {
    fail(`${lesson.id}: Card 3 must contain ${rangeText(RANGE.dialogueGroups)} dialogue groups of ${rangeText(RANGE.dialogueLinesPerGroup)} lines each`);
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
  if (!inRange((content.grammarPatterns ?? []).length, RANGE.grammarPatterns)) {
    fail(`${lesson.id}: Card 4 must contain ${rangeText(RANGE.grammarPatterns)} grammar patterns`);
  }
  const practice = content.practice ?? {};
  const practiceExercises = practice.exercises ?? [];
  if (practice.totalQuestions !== 14 || practiceExercises.length !== 14) {
    fail(`${lesson.id}: Card 5 practice must contain exactly 14 exercises`);
  }
  for (const [index, exercise] of practiceExercises.entries()) {
    // Owner decision (2026-07-19): Free = Q1–Q9, Plus = Q10–Q14
    // (LESSON_AUTHORING_STANDARD.md §B5/§D5, ADR-008 amendment). Applies to
    // every five_cards lesson including the Golden Reference Lesson.
    const expectedPlan = index < 9 ? "free" : "plus";
    if (exercise.order !== index + 1 || exercise.plan !== expectedPlan) {
      fail(`${lesson.id}: practice exercise ${index + 1} must use order ${index + 1} and plan ${expectedPlan}`);
    }
  }
  const checkpoint = practiceExercises[8];
  if (
    checkpoint?.type !== "checkpoint" ||
    !inRange((checkpoint.subQuestions ?? []).length, RANGE.checkpointSubQuestions) ||
    (checkpoint.subQuestions ?? []).some((question) =>
      !inRange((question.options ?? []).length, RANGE.optionsPerQuestion) ||
      !question.correctOptionId ||
      !(question.options ?? []).some((option) => option.id === question.correctOptionId),
    )
  ) {
    fail(`${lesson.id}: exercise 9 must contain ${rangeText(RANGE.checkpointSubQuestions)} checkpoint questions of ${rangeText(RANGE.optionsPerQuestion)} options each, with stable correct ids`);
  }
  const matching = practiceExercises[2];
  if (
    matching?.type !== "matching" ||
    !inRange((matching.pairs ?? []).length, RANGE.matchingPairs) ||
    (matching.pairs ?? []).some((pair) => !pair.id || !pair.left?.id || !pair.right?.id)
  ) {
    fail(`${lesson.id}: exercise 3 must define ${rangeText(RANGE.matchingPairs)} stable matching pairs`);
  }
  const chatFill = practiceExercises[9];
  if (
    chatFill?.type !== "chat_text_fill" ||
    !inRange((chatFill.chat?.messages ?? []).length, RANGE.chatMessages) ||
    !inRange((chatFill.slots ?? []).length, RANGE.chatSlots) ||
    !chatFill.slots?.every((slot) => slot.displayText && slot.canonicalText && slot.audioText && (slot.acceptedAnswers ?? []).length)
  ) {
    fail(`${lesson.id}: exercise 10 must be a chat text fill of ${rangeText(RANGE.chatMessages)} messages and ${rangeText(RANGE.chatSlots)} slots, with complete slot fields`);
  }
  const advancedOrdering = practiceExercises[12];
  if (
    advancedOrdering?.type !== "slot_ordering" ||
    !inRange((advancedOrdering?.answerSlots ?? []).length, RANGE.advancedOrderingSlots) ||
    !(advancedOrdering?.unusedTokenIds ?? []).length
  ) {
    fail(`${lesson.id}: exercise 13 must use ${rangeText(RANGE.advancedOrderingSlots)} answer slots and include at least one unused distractor token`);
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
    !realWorldPractice?.scenarioTitleByNative?.vi ||
    !realWorldPractice?.scenarioDescriptionByNative?.vi
  ) {
    fail(`${lesson.id}: exercise 14 must be a non-graded Real-World Practice dialogue with a localized scenario`);
  }
  // Owner decision (2026-07-19): Q14's line count is NOT fixed at 14 for a
  // normal lesson — content decides how many turns the advanced bridge
  // dialogue needs (fewer or more), with no mechanical padding/trimming
  // (see LESSON_AUTHORING_STANDARD.md §18). This generic check therefore only
  // enforces a small sanity FLOOR (a real dialogue needs at least a few turns)
  // and NO upper cap. The Golden Reference Lesson keeps its exact 14-line lock
  // separately via validateApprovedGoldenLessonContent (ADR-008), so this
  // loosening never weakens Golden.
  const Q14_MIN_LINES = 4;
  if (dialogueLines.length < Q14_MIN_LINES) {
    fail(`${lesson.id}: exercise 14 must have at least ${Q14_MIN_LINES} dialogue lines`);
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
  if (
    !inRange(sceneDividers.length, RANGE.sceneDividers) ||
    sceneDividers.some((divider) =>
      !divider?.translationByNative?.vi ||
      !divider?.translationByNative?.en ||
      !divider?.translationByNative?.ja,
    )
  ) {
    fail(`${lesson.id}: exercise 14 must have ${rangeText(RANGE.sceneDividers)} localized non-spoken scene dividers`);
  }
  // Khớp TÊN TRỌN, không phải substring — vá 2026-07-31 (owner chỉ ra): bản
  // cũ khớp substring nên chặn nhầm chữ Nhật hợp lệ chứa "ミン" làm mảnh con
  // (vd タイミング, ミント). ミン chỉ bị bắt khi KHÔNG nằm trong một chuỗi
  // katakana dài hơn (ranh giới theo SCRIPT — ミンさん vẫn bắt được vì さん là
  // hiragana, khác script với katakana của ミン). Minh/Hưng/Linh dùng ranh
  // giới CHỮ CÁI chung (\p{L}) vì đây là tên Latin/Việt, không có vấn đề
  // "dính liền không dấu cách" như katakana.
  if (DRAFT_CHARACTER_NAME_RE.test(JSON.stringify(content))) {
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
  // Content-tier audio (Owner decision 2026-07-19; LESSON_AUTHORING_STANDARD.md
  // §C1/§D8): every vocabulary card, every vocabulary example, and every
  // dialogue line must carry a non-empty speechText so the UI can render a
  // per-item speaker button. (Q14 dialogue lines are already checked above.)
  const requireSpeech = (entry, label) => {
    if (!String(entry?.speechText ?? "").trim()) {
      fail(`${lesson.id}: ${label} is missing speechText (per-item audio)`);
    }
  };
  for (const item of lesson.vocabulary ?? []) requireSpeech(item, `vocabulary ${item.id}`);
  for (const detail of content.vocabularyDetails ?? []) {
    for (const [exIndex, entry] of (detail.examples ?? []).entries()) {
      requireSpeech(entry, `vocabulary detail ${detail.id} example ${exIndex + 1}`);
    }
  }
  for (const group of groups) for (const entry of group.lines ?? []) requireSpeech(entry, `dialogue ${group.id}`);
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
  // Learning ("playable") target is DYNAMIC, mirroring the native count below:
  // read from rules/catalog.json._meta.ruleTargetCount (33 today, owner D-55)
  // instead of a stale hard-coded floor of 40. The generated learning catalog
  // must contain exactly that many languages. When the owner changes the
  // playable target they bump ruleTargetCount + the generator seeds; this check
  // follows automatically. (This is a count that tracks the authoritative
  // config target — not a change to what/how content is validated.)
  let expectedLearningCount = null;
  try {
    const rulesCatalogForLearning = await loadJson("rules/catalog.json");
    const n = rulesCatalogForLearning?._meta?.ruleTargetCount;
    if (Number.isInteger(n) && n > 0) expectedLearningCount = n;
  } catch {
    // rules/catalog.json missing/unreadable — fall through to the floor check.
  }
  if (expectedLearningCount != null) {
    if (languageOptions.length !== expectedLearningCount) {
      fail(
        `learning language catalog must have exactly ${expectedLearningCount} languages (rules/catalog.json._meta.ruleTargetCount) — got ${languageOptions.length}`,
      );
    }
  } else if (languageOptions.length < 1) {
    fail("learning language catalog is empty");
  }
  // Native language target is DYNAMIC (owner decision, 2026-07-19): the count
  // is not hard-coded here. It is read from the authoritative target the owner
  // maintains in rules/catalog.json._meta.nativeTargetCount (60 today). The
  // generated native catalog is produced from `nativeSeeds` in
  // scripts/generate-language-catalogs.mjs (which writes ALL of nativeSeeds),
  // so its length must equal that declared target. When the owner expands the
  // native set, they bump nativeTargetCount + add seeds; this check follows
  // automatically instead of needing a manual number update here. (nativeSeeds
  // stays inline in the generator per the owner's decision, and the generator
  // has import-time writeFileSync side effects, so it is not imported directly;
  // nativeTargetCount is the side-effect-free authoritative source.)
  let expectedNativeCount = null;
  try {
    const rulesCatalog = await loadJson("rules/catalog.json");
    const n = rulesCatalog?._meta?.nativeTargetCount;
    if (Number.isInteger(n) && n > 0) expectedNativeCount = n;
  } catch {
    // rules/catalog.json missing/unreadable — fall through to the floor check.
  }
  if (expectedNativeCount != null) {
    if (nativeLanguageOptions.length !== expectedNativeCount) {
      fail(
        `native language catalog must have exactly ${expectedNativeCount} languages (rules/catalog.json._meta.nativeTargetCount) — got ${nativeLanguageOptions.length}`,
      );
    }
  } else if (nativeLanguageOptions.length < 1) {
    fail("native language catalog is empty");
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
  // Mirrors the learning-count check above: track the authoritative
  // ruleTargetCount (33) instead of a stale hard-coded 40 floor.
  if (expectedLearningCount != null) {
    if ((catalog.languages ?? []).length !== expectedLearningCount) {
      fail(
        `curriculum_catalog.languages must have exactly ${expectedLearningCount} codes (rules/catalog.json._meta.ruleTargetCount) — got ${(catalog.languages ?? []).length}`,
      );
    }
  } else if ((catalog.languages ?? []).length < 1) {
    fail("curriculum_catalog.languages is empty");
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
      // Bài tổng hợp cuối unit (ADR-022) — no-op khi unit chưa có bài.
      validateUnitComprehensiveTest(unit);
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
    if (dialogueLines.map((entry) => stripFurigana(entry.targetText)).join("|") !== approvedQ14Targets.join("|")) {
      fail(`${lesson.id}: exercise 14 must match the owner-approved Tanaka–Sato dialogue exactly`);
    }
    const divider = sceneDividers[0];
    if (divider?.afterDialogueLine !== 10 || stripFurigana(divider?.targetText) !== "着いた時") {
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
    validateNoSourceMentionInDisplay(lesson, lesson.id);
    if (!["en", "ja"].includes(lesson.languageCode)) {
      fail(`${lesson.id}: only en/ja playable lessons allowed in this scope`);
    }
    if (!allowedNiches.has(lesson.nicheId)) {
      fail(`${lesson.id}: unexpected nicheId ${lesson.nicheId}`);
    }
    if (lesson.languageCode === "ja") {
      validateNoRawKanaInRomanization(lesson);
      validateFuriganaCoverage(lesson.fiveCardContent, lesson.id, "fiveCardContent");
      validateRegisterVocabulary(lesson.fiveCardContent, lesson.id, "fiveCardContent");
    }
    if (lesson.lessonFormat === "five_cards") {
      validateFiveCardsStructure(lesson);
      collectVocabularyDetailWarnings(lesson);
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

  // Daily Life Communication: 16 modules × 3 tiers, Cơ bản tier fully named
  // (owner decision, 2026-07-19; replaces the prior 15-topic × 3-tier empty
  // skeleton). Every module's Cơ bản tier now has real named unit/lesson
  // slots; only the Golden Lesson (ja-daily_life-m01-u1-l1) resolves to real
  // five_cards content — every other Cơ bản slot is a NAMED placeholder
  // (blueprint lesson, real title, no real exercises yet). Trung cấp/Cao cấp
  // remain a valid empty shell (no units yet) for every module. What is
  // still enforced hard: exactly 16 modules per language; every course's
  // ready/playable status matches whether it contains a ready lesson; every
  // unit that exists has >=1 lesson (an empty-but-created unit would
  // indicate a generator bug, not intentional "not written yet"); and the
  // Golden Lesson's own unit/course still match their frozen ADR-008 values.
  for (const language of ["en", "ja"]) {
    const dailyCourses = courses
      .filter((c) => c.languageCode === language && c.nicheId === "daily_life")
      .slice()
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
    if (dailyCourses.length !== 16) {
      fail(`${language} Daily Life must have exactly 16 modules, got ${dailyCourses.length}`);
    }
    const dailyLessons = lessons.filter(
      (l) => l.languageCode === language && l.nicheId === "daily_life",
    );
    for (const course of dailyCourses) {
      const isModuleOne = course.moduleId === "daily_life_m01_basic_social_survival";
      const hasUnits = (course.units ?? []).length > 0;
      // Every module now has named Cơ bản units full of placeholder lessons
      // (owner decision, 2026-07-19), so "has units" no longer implies "has
      // real content" — a course is ready/playable only when it actually
      // contains a ready lesson (today: only Module 1's Golden Lesson, ja).
      const courseLessons = dailyLessons.filter((l) => l.moduleId === course.moduleId);
      const hasReadyLesson = courseLessons.some((l) => l.playable === true);
      if (hasReadyLesson && (course.contentStatus !== "ready" || course.playable !== true)) {
        fail(`${course.id}: a module with a ready lesson must be ready/playable`);
      }
      if (!hasReadyLesson && (course.contentStatus !== "blueprint" || course.playable !== false)) {
        fail(`${course.id}: a module with no ready lesson yet must stay blueprint/non-playable`);
      }
      if (isModuleOne && language === "ja" && !hasUnits) {
        fail(`${course.id}: Module 1 (Golden Lesson) must have at least one unit`);
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
          if (unit.titleByNative?.vi !== "Bài 1: Làm quen lần đầu") {
            fail(`${unit.id}: must keep the approved Vietnamese Unit 1 title`);
          }
        } else {
          validateByNativeMap(unit.titleByNative, `${unit.id} titleByNative`, fail);
        }
      }
    }
    // Exactly one lesson across the whole Daily Life domain may be
    // ready/playable: the Golden Lesson itself (APPROVED_JA_UNIT1_LESSON1).
    // Every sibling lesson — including the new named placeholder lessons now
    // sharing Module 1 with the Golden Lesson — must stay blueprint. This
    // replaces a prior moduleId-based check that incorrectly required EVERY
    // Module 1 lesson to be ready, which broke once Module 1 gained
    // non-Golden placeholder siblings (owner decision, 2026-07-19).
    if (language === "ja") {
      const golden = dailyLessons.find((l) => isApprovedJaUnitOneLesson(l));
      if (!golden || golden.playable !== true || golden.contentStatus !== "ready") {
        fail(`${language} Daily Life must contain the Golden Lesson, ready/playable`);
      }
    }
    // Approved, ready/playable Daily Life five_cards lessons. The Golden Lesson
    // was the first; owner-approved sibling lessons are added here by their
    // final id (which is language-prefixed, so an entry is ja-only by
    // construction). Every OTHER Daily Life lesson must remain a blueprint
    // placeholder — a named slot with no real content. This replaces the prior
    // "only the Golden Lesson" guard (owner decision: five_cards is a reusable
    // format, more than one approved lesson may now be playable).
    const APPROVED_READY_DAILY_LESSON_IDS = new Set([
      APPROVED_JA_UNIT1_LESSON1,
      "ja-daily_life-m01-u1-l2",
      "ja-daily_life-m01-u1-l3",
      "ja-daily_life-m01-u2-l1",
      "ja-daily_life-m01-u2-l2",
      "ja-daily_life-m02-u1-l1",
      "ja-daily_life-m02-u1-l2",
    ]);
    const unexpectedReady = dailyLessons.filter(
      (l) =>
        !APPROVED_READY_DAILY_LESSON_IDS.has(l.id) &&
        (l.playable === true || l.contentStatus !== "blueprint"),
    );
    if (unexpectedReady.length) {
      fail(
        `${language} Daily Life: only approved five_cards lessons may be ready/playable; every other lesson must remain blueprint/non-playable (offending: ${unexpectedReady
          .map((l) => l.id)
          .join(", ")})`,
      );
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

  // --- Lớp CẢNH BÁO MỀM §B2c: trường chi tiết từ vựng chưa điền (2026-07-25) ---
  // KHÔNG chặn build (L2/L3 đang trống toàn bộ; fail cứng sẽ chặn mọi thứ).
  // --- Lớp CẢNH BÁO MỀM §B16: cụm "LUÔN SAI" trong bài tổng hợp (2026-07-25) ---
  if (alwaysWrongWarnings.length) {
    console.warn(
      `\n[§B16] ${alwaysWrongWarnings.length} cảnh báo mềm — cụm làm phương án sai nhiều lần ` +
        `mà không lần nào là đáp án đúng (không chặn build; dạng méo cố ý được §B16 miễn trừ):`,
    );
    for (const warning of alwaysWrongWarnings) console.warn(`  ! ${warning}`);
  }

  if (vocabularyDetailWarnings.length) {
    console.warn(
      `\n[§B2c] ${vocabularyDetailWarnings.length} cảnh báo mềm — trường chi tiết từ vựng CHƯA ĐIỀN ` +
        `(không chặn build; '[]' / '' = đã kiểm & thật sự không có, sẽ không cảnh báo):`,
    );
    for (const w of vocabularyDetailWarnings) console.warn(`  ! ${w}`);
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
