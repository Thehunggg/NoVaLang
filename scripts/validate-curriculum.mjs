#!/usr/bin/env node
/**
 * Validate shared curriculum output for Web + Flutter.
 * Run: npm run validate:curriculum
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];
const FREE_TYPES = new Set([
  "chooseMeaning",
  "chooseVocabulary",
  "matchPairs",
  "fillBlank",
  "chooseCorrectAnswer",
  "listenAndChoose",
  "typeAnswer",
]);
const PLUS_TYPES = new Set([
  "listeningGapFill",
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

function validateExercise(lesson, ex, index) {
  const label = `${lesson.id} exercise[${index + 1}] (${ex.id})`;
  const expectedType = EXPECTED_SLOT_TYPES[index];
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
    ["chooseMeaning", "chooseVocabulary", "fillBlank", "chooseCorrectAnswer", "listenAndChoose"].includes(
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
    (lesson.exercises ?? []).forEach((ex, i) => validateExercise(lesson, ex, i));
    for (const vocab of lesson.vocabulary ?? []) {
      validateJapaneseItem(lesson, vocab, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.translations) validateTranslations(vocab.translations, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.displayText === "こんにちわ" || vocab.text === "こんにちわ") {
        fail(`${lesson.id}: use こんにちは, not こんにちわ`);
      }
    }
  }

  // Japanese Core Foundation Unit 1 Lesson 1 must teach individual kana, not greetings.
  const hiraganaL1 = lessonById.get("ja-hiragana-u1-l1");
  if (!hiraganaL1) {
    fail("Missing Japanese Core Foundation lesson ja-hiragana-u1-l1");
  } else {
    const bannedPhrases = ["こんにちは", "ありがとう", "さようなら", "こんにちわ"];
    const texts = (hiraganaL1.vocabulary ?? []).map((v) => v.displayText || v.text || "");
    if (texts.join("") !== "あいうえお") {
      fail(
        `ja-hiragana-u1-l1 must teach only あいうえお as individual characters, got [${texts.join(", ")}]`,
      );
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
  if (katakanaLessons.length !== 6) {
    fail(`Expected 6 Katakana Basics lessons, got ${katakanaLessons.length}`);
  }
  for (const lesson of katakanaLessons) {
    if ((lesson.exercises ?? []).length !== 10) {
      fail(`${lesson.id}: playable Katakana lesson must have exactly 10 exercises`);
    }
  }

  // 6 hiragana + 6 katakana + 6 alphabet + 6 en greetings + 6 ja greetings
  if (lessons.length !== 30) {
    fail(
      `Expected 30 playable lessons (18 foundation + 12 greetings), got ${lessons.length}`,
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
  const alphabetLetters = new Set();
  for (const lesson of alphabetLessons) {
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

  // After sync, Flutter assets should match; warn only (generate→validate→sync order).
  try {
    const flutterLessons = await loadJson(
      "mobile/novalang_flutter/assets/shared/lessons.json",
    );
    if (flutterLessons.version !== coursesPayload.version) {
      console.warn(
        "warn: Flutter lessons.json is stale — run npm run sync:flutter-assets",
      );
    }
  } catch {
    console.warn(
      "warn: Flutter lessons.json not synced yet — run npm run sync:flutter-assets",
    );
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
