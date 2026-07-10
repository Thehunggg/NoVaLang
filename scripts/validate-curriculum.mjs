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

function validateJapaneseItem(lesson, item, label) {
  if (lesson.languageCode !== "ja") return;
  if (!item.reading) fail(`${label}: missing reading`);
  if (!item.romanization) fail(`${label}: missing romanization`);
  if (!item.speechText) fail(`${label}: missing speechText`);
  if (item.translations) validateTranslations(item.translations, `${label} translations`);
  else fail(`${label}: missing translations vi/en/ja/ko/zh`);
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

  for (const lesson of lessons) {
    if (!["en", "ja"].includes(lesson.languageCode)) {
      fail(`${lesson.id}: only en/ja playable lessons allowed in this scope`);
    }
    if (lesson.nicheId !== "daily_life") {
      fail(`${lesson.id}: only daily_life niche is playable in this scope`);
    }
    if ((lesson.exercises ?? []).length !== 10) {
      fail(`${lesson.id}: must have exactly 10 exercises (got ${(lesson.exercises ?? []).length})`);
    }
    (lesson.exercises ?? []).forEach((ex, i) => validateExercise(lesson, ex, i));
    for (const vocab of lesson.vocabulary ?? []) {
      validateJapaneseItem(lesson, vocab, `${lesson.id} vocab ${vocab.id}`);
      if (vocab.translations) validateTranslations(vocab.translations, `${lesson.id} vocab ${vocab.id}`);
    }
  }

  if (lessons.length !== 12) {
    fail(`Expected 12 playable lessons (6 en + 6 ja), got ${lessons.length}`);
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
