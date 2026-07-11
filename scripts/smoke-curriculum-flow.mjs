#!/usr/bin/env node
/**
 * Fast command-line smoke tests for the generated NovaLang curriculum.
 *
 * This script only reads shared/generated/*.json. It does not modify app state,
 * generated curriculum, Web, or Flutter.
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

const EXPECTED_VERSION = "curriculum-v3";
const EXPECTED_COURSE_COUNT = 5;
const EXPECTED_LESSON_COUNT = 38;
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
const ALL_NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];
const MEANING_CHOICE_TYPES = new Set(["chooseMeaning", "listenAndChoose"]);
const SUPPORTED_TYPES = new Set([
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
  "listeningGapFill",
  "plusListeningVocabularyChallenge",
  "controlledAiQa",
  "aiFeedbackReview",
]);
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

const results = new Map();
const failures = [];

function pass(section, message) {
  if (!results.has(section)) results.set(section, { passed: 0, failed: 0 });
  results.get(section).passed += 1;
  void message;
}

function fail(section, context, reason) {
  if (!results.has(section)) results.set(section, { passed: 0, failed: 0 });
  results.get(section).failed += 1;
  failures.push({ section, ...context, reason });
  const where = [
    context.courseId && `courseId=${context.courseId}`,
    context.lessonId && `lessonId=${context.lessonId}`,
    context.exerciseIndex && `exerciseIndex=${context.exerciseIndex}`,
    context.subQuestionIndex && `subQuestionIndex=${context.subQuestionIndex}`,
    context.exerciseType && `exerciseType=${context.exerciseType}`,
    context.kana && `kana=${context.kana}`,
    context.expectedOrder !== undefined && `expectedOrder=${context.expectedOrder}`,
    context.actualOrder !== undefined && `actualOrder=${context.actualOrder}`,
    context.visiblePrompt && `visiblePrompt=${JSON.stringify(context.visiblePrompt)}`,
    context.displayText && `displayText=${JSON.stringify(context.displayText)}`,
    context.correctAnswer && `correctAnswer=${JSON.stringify(context.correctAnswer)}`,
  ].filter(Boolean).join(" ");
  console.log(`FAIL [${section}] ${where} ${reason}`.trim());
}

function hasJapaneseText(value) {
  return /[\u3040-\u30ff\u3400-\u9fff]/u.test(String(value ?? ""));
}

function unique(values) {
  return new Set(values).size === values.length;
}

async function loadJson(relPath) {
  return JSON.parse(await readFile(path.join(ROOT, relPath), "utf8"));
}

function checkExpectedShape(coursesJson, lessonsJson) {
  const section = "Playable curriculum";
  if (coursesJson.version === EXPECTED_VERSION && lessonsJson.version === EXPECTED_VERSION) {
    pass(section, `version=${EXPECTED_VERSION}`);
  } else {
    fail(section, {}, `expected version ${EXPECTED_VERSION}, got courses=${coursesJson.version}, lessons=${lessonsJson.version}`);
  }

  if (coursesJson.courses.length === EXPECTED_COURSE_COUNT) {
    pass(section, `course count=${EXPECTED_COURSE_COUNT}`);
  } else {
    fail(section, {}, `expected ${EXPECTED_COURSE_COUNT} courses, got ${coursesJson.courses.length}`);
  }

  if (lessonsJson.lessons.length === EXPECTED_LESSON_COUNT) {
    pass(section, `lesson count=${EXPECTED_LESSON_COUNT}`);
  } else {
    fail(section, {}, `expected ${EXPECTED_LESSON_COUNT} lessons, got ${lessonsJson.lessons.length}`);
  }
}

function checkCourseLessonLinks(courses, lessonById) {
  const section = "Course lesson links";
  for (const course of courses) {
    const missing = course.units
      .flatMap((unit) => unit.lessonIds)
      .filter((lessonId) => !lessonById.has(lessonId));
    if (missing.length === 0) {
      pass(section, `${course.id}/${course.moduleId} links to existing lessons`);
    } else {
      fail(section, { courseId: course.id }, `missing lesson ids: ${missing.join(", ")}`);
    }
  }
}

function checkLessonExercises(lessons) {
  const section = "Lesson exercise slots";
  for (const lesson of lessons) {
    const exercises = lesson.exercises ?? [];
    if (exercises.length !== 10) {
      fail(section, { lessonId: lesson.id }, `expected 10 exercises, got ${exercises.length}`);
      continue;
    }

    if (unique(exercises.map((exercise) => exercise.id))) {
      pass(section, `${lesson.id} has 10 unique exercises`);
    } else {
      fail(section, { lessonId: lesson.id }, "duplicate exercise ids");
    }

    exercises.forEach((exercise, index) => {
      const exerciseIndex = index + 1;
      if (exerciseIndex <= 7) {
        if (exercise.access === "free" && exercise.plusOnly !== true) {
          pass("Free/Plus slot rules", `${lesson.id} e${exerciseIndex} is free`);
        } else {
          fail("Free/Plus slot rules", { lessonId: lesson.id, exerciseIndex }, `expected free slot, got access=${exercise.access}, plusOnly=${exercise.plusOnly}`);
        }
      } else if (exercise.access === "plus" && exercise.plusOnly === true) {
        pass("Free/Plus slot rules", `${lesson.id} e${exerciseIndex} is plus`);
      } else {
        fail("Free/Plus slot rules", { lessonId: lesson.id, exerciseIndex }, `expected plus slot, got access=${exercise.access}, plusOnly=${exercise.plusOnly}`);
      }
    });
  }
}

function checkAiRules(lessons) {
  const section = "AI rules";
  for (const lesson of lessons) {
    (lesson.exercises ?? []).forEach((exercise, index) => {
      const exerciseIndex = index + 1;
      if (exercise.usesAi === true && ![9, 10].includes(exerciseIndex)) {
        fail(section, { lessonId: lesson.id, exerciseIndex }, "AI is only allowed in exercise 9/10");
      }

      if (exerciseIndex === 9) {
        const oneTurnMode = exercise.aiMode === "controlled_qa" || exercise.aiMode === "controlled_one_turn";
        if (exercise.type === "controlledAiQa" && oneTurnMode && exercise.openEndedChat !== true) {
          pass(section, `${lesson.id} exercise 9 is controlled one-turn QA`);
        } else {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `expected controlled one-turn QA, got type=${exercise.type}, aiMode=${exercise.aiMode}, openEndedChat=${exercise.openEndedChat}`);
        }
      }

      if (exerciseIndex === 10) {
        if (exercise.type === "aiFeedbackReview" && exercise.triggerExtraAiCallByDefault !== true) {
          pass(section, `${lesson.id} exercise 10 reuses feedback by default`);
        } else {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `expected no extra AI call by default, got type=${exercise.type}, triggerExtraAiCallByDefault=${exercise.triggerExtraAiCallByDefault}`);
        }
      }
    });
  }
}

function checkRouting(courses, catalog) {
  const section = "A0 beginner routing data";
  for (const languageCode of ["ja", "en"]) {
    const languageCourses = courses.filter((course) => course.languageCode === languageCode);
    const firstCourse = languageCourses[0];
    if (firstCourse?.nicheId === "core_foundation" && firstCourse?.levelCode === "A0") {
      pass(section, `${languageCode} beginner starts with Core Foundation`);
    } else {
      fail(section, { courseId: firstCourse?.id }, `${languageCode} beginner should start with A0 Core Foundation`);
    }

    const coreIndex = courses.findIndex((course) => course.languageCode === languageCode && course.nicheId === "core_foundation");
    const dailyIndex = courses.findIndex((course) => course.languageCode === languageCode && course.nicheId === "daily_life" && course.levelCode === "A0");
    if (coreIndex >= 0 && dailyIndex > coreIndex) {
      pass(section, `${languageCode} Daily Life appears after Core Foundation`);
    } else {
      fail(section, {}, `${languageCode} Daily Life A0 should appear after Core Foundation`);
    }
  }

  const policyNote = catalog.architecture?.coreFoundation?.note ?? "";
  if (/finish|skip/i.test(policyNote) && /before niche lessons/i.test(policyNote)) {
    pass(section, "catalog documents Core Foundation completion/skip before niche lessons");
  } else {
    fail(section, {}, "catalog must document Core Foundation completion/skip before Daily Life A0");
  }
}

function courseIdForModule(courses, languageCode, moduleId) {
  return courses.find((course) => course.languageCode === languageCode && course.moduleId === moduleId)?.id;
}

function checkKanaCoverageAndOrder(lessons, courses, { sectionName, script, moduleId, expected }) {
  const section = sectionName;
  const courseId = courseIdForModule(courses, "ja", moduleId);
  const items = lessons
    .filter((lesson) => lesson.languageCode === "ja" && lesson.moduleId === moduleId)
    .flatMap((lesson) =>
      (lesson.vocabulary ?? [])
        .filter((item) => item.isBasicKana === true || item.kanaScript === script)
        .map((item) => ({ lesson, item })),
    );

  const seenChars = new Map();
  const byOrder = new Map();
  for (const { lesson, item } of items) {
    const kana = item.displayText || item.text || "";
    const actualOrder = item.characterOrder ?? item.displayOrder;
    const expectedOrder = expected.indexOf(kana) + 1;

    if (expectedOrder <= 0) {
      fail(section, { courseId, lessonId: lesson.id, kana, actualOrder }, `not part of canonical ${script} basic 46`);
      continue;
    }
    if (!Number.isInteger(actualOrder)) {
      fail(section, { courseId, lessonId: lesson.id, kana, expectedOrder, actualOrder }, "missing characterOrder/displayOrder");
      continue;
    }
    if (actualOrder !== expectedOrder || item.displayOrder !== expectedOrder) {
      fail(section, { courseId, lessonId: lesson.id, kana, expectedOrder, actualOrder }, `wrong ${script} order metadata`);
    }
    if (byOrder.has(actualOrder)) {
      fail(section, { courseId, lessonId: lesson.id, kana, expectedOrder, actualOrder }, `duplicate order already used by ${byOrder.get(actualOrder)}`);
    }
    byOrder.set(actualOrder, kana);
    if (seenChars.has(kana)) {
      fail(section, { courseId, lessonId: lesson.id, kana, expectedOrder, actualOrder }, `duplicate kana already in ${seenChars.get(kana)}`);
    }
    seenChars.set(kana, lesson.id);
  }

  for (let i = 0; i < expected.length; i += 1) {
    const kana = expected[i];
    if (!seenChars.has(kana)) {
      fail(section, { courseId, kana, expectedOrder: i + 1 }, "missing canonical basic kana");
    }
  }

  const ordered = [...byOrder.entries()].sort((a, b) => a[0] - b[0]).map(([, kana]) => kana);
  if (ordered.join("") === expected.join("") && items.length === expected.length) {
    pass(section, `${script} basic 46 are complete, unique, and canonical`);
  } else {
    fail(section, { courseId }, `canonical order mismatch or wrong count; expected ${expected.length}, got ${items.length}`);
  }
}

function checkEnglishAlphabetCoverageAndOrder(lessons, courses) {
  const section = "English alphabet coverage/order";
  const courseId = courseIdForModule(courses, "en", "alphabet_starter");
  const seen = new Map();
  for (const lesson of lessons.filter((l) => l.languageCode === "en" && l.moduleId === "alphabet_starter")) {
    if (String(lesson.id).endsWith("-l6")) continue;
    for (const item of lesson.vocabulary ?? []) {
      const letter = String(item.displayText || item.text || "").toUpperCase();
      if (!/^[A-Z]$/.test(letter)) continue;
      const expectedOrder = EXPECTED_ALPHABET_26.indexOf(letter) + 1;
      const actualOrder = item.characterOrder ?? item.displayOrder;
      if (actualOrder !== expectedOrder || item.displayOrder !== expectedOrder) {
        fail(section, { courseId, lessonId: lesson.id, kana: letter, expectedOrder, actualOrder }, "wrong alphabet order metadata");
      }
      if (seen.has(letter)) {
        fail(section, { courseId, lessonId: lesson.id, kana: letter, expectedOrder, actualOrder }, `duplicate alphabet letter already in ${seen.get(letter)}`);
      }
      seen.set(letter, lesson.id);
    }
  }
  for (let i = 0; i < EXPECTED_ALPHABET_26.length; i += 1) {
    const letter = EXPECTED_ALPHABET_26[i];
    if (!seen.has(letter)) fail(section, { courseId, kana: letter, expectedOrder: i + 1 }, "missing alphabet letter");
  }
  if (seen.size === EXPECTED_ALPHABET_26.length) {
    pass(section, "English A-Z are complete, unique, and ordered");
  }
}

function checkJapaneseFoundationSafety(lessons) {
  const section = "Japanese foundation safety";
  const serialized = JSON.stringify(lessons);
  if (!serialized.includes("こんにちわ")) {
    pass(section, "wrong spelling こんにちわ not found");
  } else {
    fail(section, {}, "wrong spelling こんにちわ found");
  }

  const firstHiraganaLesson = lessons.find((lesson) => lesson.id === "ja-hiragana-u1-l1");
  if (firstHiraganaLesson && !JSON.stringify(firstHiraganaLesson).includes("こんにちは")) {
    pass(section, "first Hiragana lesson does not teach greeting content");
  } else {
    fail(section, { lessonId: firstHiraganaLesson?.id }, "こんにちは should not appear in the first Hiragana character lesson");
  }

  const greetingLessons = lessons.filter((lesson) => lesson.languageCode === "ja" && lesson.nicheId === "daily_life");
  if (greetingLessons.some((lesson) => JSON.stringify(lesson).includes("こんにちは"))) {
    pass(section, "こんにちは appears in Japanese greeting content");
  } else {
    fail(section, {}, "こんにちは should appear in Japanese greeting lessons");
  }

  const kanaLessons = lessons.filter((lesson) => lesson.languageCode === "ja" && ["hiragana_starter", "katakana_starter"].includes(lesson.moduleId));
  for (const lesson of kanaLessons) {
    const vocab = lesson.vocabulary ?? [];
    if (vocab.some((item) => /[\u3040-\u30ff]/u.test(item.text ?? ""))) {
      pass(section, `${lesson.id} contains kana basics`);
    } else {
      fail(section, { lessonId: lesson.id }, "kana starter lesson must contain kana basics");
    }

    for (const item of vocab) {
      if (!item.reading || !item.romanization || !item.speechText) {
        fail(section, { lessonId: lesson.id }, `kana vocab ${item.id} missing reading/romanization/speechText`);
      }
      if (item.exampleText && item.exampleText === item.text) {
        fail(section, { lessonId: lesson.id }, `kana vocab ${item.id} has exampleText equal to isolated kana`);
      }
    }
  }
}

function checkNativeLanguageOptions(lessons) {
  const section = "Native language options";
  let checkedEnJa = false;
  let checkedJaVi = false;

  for (const lesson of lessons) {
    for (const exercise of lesson.exercises ?? []) {
      if (!MEANING_CHOICE_TYPES.has(exercise.type)) continue;
      const englishOptions = JSON.stringify(exercise.options ?? []);
      const exerciseIndex = Number(String(exercise.id).split("-e").pop());

      for (const nativeCode of ALL_NATIVE_CODES) {
        const nativeOptions = exercise.optionsByNative?.[nativeCode];
        const accepted = exercise.acceptedAnswersByNative?.[nativeCode];
        if (!Array.isArray(nativeOptions) || nativeOptions.length !== 4) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `missing 4 optionsByNative.${nativeCode}`);
          continue;
        }
        // Character-option drills (kana/letters) intentionally share labels across natives.
        const looksLikeCharacters = nativeOptions.every((opt) => [...String(opt)].length <= 2);
        if (
          nativeCode !== "en" &&
          !looksLikeCharacters &&
          JSON.stringify(nativeOptions) === englishOptions
        ) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `optionsByNative.${nativeCode} silently falls back to English`);
        }
        if (!accepted?.length || !nativeOptions.includes(accepted[0])) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `correct answer missing from optionsByNative.${nativeCode}`);
        }
      }

      if (lesson.languageCode === "en" && !checkedEnJa) {
        const jaOptions = exercise.optionsByNative?.ja ?? [];
        const looksLikeCharacters = jaOptions.every((opt) => [...String(opt)].length <= 2);
        if (looksLikeCharacters) {
          // Skip letter/kana option drills; wait for a true meaning-choice sample.
        } else if (jaOptions.some(hasJapaneseText)) {
          pass(section, "native ja + learning en has Japanese meaning labels");
          checkedEnJa = true;
        } else {
          fail(section, { lessonId: lesson.id, exerciseIndex }, "native ja + learning en expected Japanese meaning labels");
        }
      }

      if (lesson.languageCode === "ja" && !checkedJaVi) {
        const viOptions = exercise.optionsByNative?.vi ?? [];
        const looksLikeCharacters = viOptions.every((opt) => [...String(opt)].length <= 2);
        if (
          !looksLikeCharacters &&
          viOptions.length === 4 &&
          JSON.stringify(viOptions) !== JSON.stringify(exercise.options ?? [])
        ) {
          pass(section, "native vi + learning ja has Vietnamese meaning labels");
          checkedJaVi = true;
        } else if (!looksLikeCharacters) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, "native vi + learning ja expected Vietnamese meaning labels");
        }
      }
    }
  }

  if (!checkedEnJa) fail(section, {}, "did not find native ja + learning en sample");
  if (!checkedJaVi) fail(section, {}, "did not find native vi + learning ja sample");
}

function checkExerciseQuality(lessons, courses) {
  const section = "Exercise template quality checks";
  const foundationModules = new Set(["hiragana_starter", "katakana_starter", "alphabet_starter"]);
  const blankRe = /_|＿|\{blank\}|\[blank\]/;
  const fillPromptRe = /fill|missing|blank|điền|còn thiếu|空欄|빈칸|缺少/i;
  const foundationSlots = [
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

  for (const lesson of lessons) {
    if (!foundationModules.has(lesson.moduleId)) continue;
    const courseId = courses.find(
      (c) => c.languageCode === lesson.languageCode && c.moduleId === lesson.moduleId,
    )?.id;

    (lesson.exercises ?? []).forEach((exercise, index) => {
      const exerciseIndex = index + 1;
      const ctx = {
        courseId,
        lessonId: lesson.id,
        exerciseIndex,
        exerciseType: exercise.type,
        visiblePrompt: exercise.prompt,
        displayText: exercise.displayText,
        correctAnswer: exercise.correctAnswer,
      };

      const expectedSlots = lesson.id === "ja-hiragana-u1-l1"
        ? HIRAGANA_L1_SLOT_TYPES
        : foundationSlots;
      let expectedType = expectedSlots[index];
      if (String(lesson.id).includes("katakana") && index === 7) {
        expectedType = "plusListeningVocabularyChallenge";
      }
      if (exercise.type !== expectedType) {
        fail(section, ctx, `expected ${expectedType}, got ${exercise.type}`);
      } else {
        pass(section, `${lesson.id} e${exerciseIndex} type ${exercise.type}`);
      }

      if (Array.isArray(exercise.options) && !unique(exercise.options)) {
        fail(section, ctx, "multiple choice has duplicate options");
      }

      if (exercise.type === "fillBlank" || exercise.type === "fillMissingCharacter" || exercise.type === "listeningGapFill") {
        const texts = exercise.type === "listeningGapFill"
          ? (exercise.gapSentences ?? []).map((s) => s.text)
          : [exercise.displayText];
        for (const text of texts) {
          if (!blankRe.test(String(text ?? ""))) {
            fail(section, ctx, "fill/gap exercise missing blank marker");
          }
          if (exercise.correctAnswer && String(text).includes(String(exercise.correctAnswer))) {
            fail(section, ctx, "fill/gap visible text includes correct answer");
          }
        }
      }

      const promptBlob = `${exercise.prompt ?? ""} ${exercise.promptVi ?? ""}`;
      if (fillPromptRe.test(promptBlob) && !["controlledAiQa", "aiFeedbackReview"].includes(exercise.type)) {
        const checkText = exercise.type === "listeningGapFill"
          ? (exercise.gapSentences ?? []).map((s) => s.text).join("\n")
          : String(exercise.displayText ?? "");
        if (checkText && !blankRe.test(checkText)) {
          fail(section, ctx, "prompt asks to fill blank but visible text has no blank");
        }
      }

      if (exercise.type === "listenAndChoose") {
        if (exercise.displayText && exercise.displayText === exercise.correctAnswer) {
          fail(section, ctx, "listen-and-choose displays correct answer in card");
        }
        if (exercise.hideSpeechLabel !== true) {
          fail(section, ctx, "listen-and-choose must set hideSpeechLabel");
        }
        if (exercise.reading || exercise.romanization) {
          fail(section, ctx, "listen-and-choose must not expose reading/romanization on audio card");
        }
        if (exercise.speechText && exercise.speechText === exercise.correctAnswer && exercise.hideSpeechLabel !== true) {
          fail(section, ctx, "audio card reveals speechText equal to correct answer");
        } else {
          pass(section, `${lesson.id} e${exerciseIndex} listen card does not leak answer`);
        }
      }

      if (
        index > 0 &&
        [
          "chooseVocabulary",
          "listenAndChoose",
          "fillBlank",
          "fillMissingCharacter",
          "soundToCharacter",
          "nextInSequence",
          "chooseCorrectPair",
        ].includes(exercise.type) &&
        exercise.displayText === exercise.correctAnswer
      ) {
        fail(section, ctx, "correct answer appears in visible clue");
      }

      if (exercise.sequenceMode === "gojuon_next" || (exercise.type === "typeAnswer" && String(exercise.displayText ?? "").includes("→"))) {
        const parts = String(exercise.displayText)
          .split("→")
          .map((p) => p.trim())
          .filter((p) => p && p !== "?");
        const lessonOrder = (lesson.vocabulary ?? [])
          .map((v) => v.displayText || v.text)
          .filter(Boolean);
        let ok = true;
        let expectedNext;
        if (lesson.moduleId === "alphabet_starter") {
          for (let i = 0; i < parts.length - 1; i += 1) {
            const a = lessonOrder.indexOf(parts[i]);
            const b = lessonOrder.indexOf(parts[i + 1]);
            if (a < 0 || b !== a + 1) ok = false;
          }
          expectedNext = lessonOrder[lessonOrder.indexOf(parts[parts.length - 1]) + 1];
        } else {
          const canon =
            lesson.moduleId === "katakana_starter"
              ? EXPECTED_KATAKANA_46
              : EXPECTED_HIRAGANA_46;
          for (let i = 0; i < parts.length - 1; i += 1) {
            const a = canon.indexOf(parts[i]);
            const b = canon.indexOf(parts[i + 1]);
            if (a < 0 || b !== a + 1) ok = false;
          }
          expectedNext = canon[canon.indexOf(parts[parts.length - 1]) + 1];
        }
        if (!ok || (expectedNext && exercise.correctAnswer !== expectedNext)) {
          fail(section, ctx, "sequence order is not canonical gojūon/lesson order");
        } else {
          pass(section, `${lesson.id} e${exerciseIndex} sequence follows canonical order`);
        }
      }
    });
  }
}

function checkPlusListeningVocabulary(lessons, courses) {
  const section = "Plus listening vocabulary checks";
  const lesson = lessons.find((item) => item.id === "ja-hiragana-u1-l1");
  const courseId = courseIdForModule(courses, "ja", "hiragana_starter");
  if (!lesson) {
    fail(section, { courseId, lessonId: "ja-hiragana-u1-l1" }, "missing Hiragana Lesson 1");
    return;
  }
  const exercise = lesson.exercises?.[7];
  const ctx = {
    courseId,
    lessonId: lesson.id,
    exerciseIndex: 8,
    exerciseType: exercise?.type,
    visiblePrompt: exercise?.prompt,
    displayText: exercise?.displayText,
    correctAnswer: exercise?.correctAnswer,
  };

  if (exercise?.type !== "plusListeningVocabularyChallenge") {
    fail(section, ctx, `expected plusListeningVocabularyChallenge, got ${exercise?.type}`);
    return;
  }
  if (exercise.access !== "plus" || exercise.plusOnly !== true || exercise.usesAi === true) {
    fail(section, ctx, "Exercise 8 must be Plus, plusOnly, and not use AI");
  } else {
    pass(section, "Exercise 8 is Plus gated and non-AI");
  }

  const subQuestions = exercise.subQuestions ?? [];
  if (subQuestions.length !== 5) {
    fail(section, ctx, `expected 5 subQuestions, got ${subQuestions.length}`);
    return;
  }
  pass(section, "Exercise 8 has 5 subQuestions");

  const expectedStarts = ["あ", "い", "う", "え", "お"];
  const revealRe = /^[ぁ-ん]+（.+）—\s+.+$/u;
  const seenStarts = new Set();
  subQuestions.forEach((subQuestion, index) => {
    const sqCtx = {
      ...ctx,
      subQuestionIndex: index + 1,
      visiblePrompt: subQuestion.visibleBeforeAnswer ?? subQuestion.prompt,
      correctAnswer: subQuestion.correctAnswer,
    };
    for (const field of ["speechText", "options", "correctAnswer", "revealAfterAnswerByNative"]) {
      const value = subQuestion[field];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        fail(section, sqCtx, `subQuestion missing ${field}`);
      }
    }
    if (!subQuestion.feedbackCorrectByNative || !subQuestion.feedbackWrongByNative) {
      fail(section, sqCtx, "subQuestion missing feedbackCorrectByNative/feedbackWrongByNative");
    } else {
      const errors = [];
      validateByNativeMap(subQuestion.feedbackCorrectByNative, "feedbackCorrectByNative", (msg) => errors.push(msg));
      validateByNativeMap(subQuestion.feedbackWrongByNative, "feedbackWrongByNative", (msg) => errors.push(msg));
      validateByNativeMap(subQuestion.revealAfterAnswerByNative, "revealAfterAnswerByNative", (msg) => errors.push(msg));
      if (subQuestion.audioCardLabelByNative) {
        validateByNativeMap(subQuestion.audioCardLabelByNative, "audioCardLabelByNative", (msg) => errors.push(msg));
      }
      for (const err of errors) fail(section, sqCtx, err);
      if (!errors.length) pass(section, `subQuestion ${index + 1} native localization complete`);
    }
    if (!unique(subQuestion.options ?? [])) {
      fail(section, sqCtx, "subQuestion options contain duplicates");
    }
    if (!(subQuestion.options ?? []).includes(subQuestion.correctAnswer)) {
      fail(section, sqCtx, "subQuestion options do not include correctAnswer");
    }
    const visibleBefore = `${subQuestion.visibleBeforeAnswer ?? ""} ${subQuestion.audioCardLabel ?? ""} ${Object.values(subQuestion.visibleBeforeAnswerByNative ?? {}).join(" ")} ${subQuestion.prompt ?? ""}`;
    const revealValues = [
      subQuestion.revealAfterAnswer,
      ...Object.values(subQuestion.revealAfterAnswerByNative ?? {}),
    ].filter(Boolean);
    for (const leaked of [subQuestion.speechText, subQuestion.correctAnswer, ...revealValues]) {
      if (leaked && visibleBefore.includes(leaked)) {
        fail(section, { ...sqCtx, displayText: visibleBefore }, "visible-before-answer leaks hidden answer data");
      }
    }
    for (const code of ALL_NATIVE_CODES) {
      const reveal = subQuestion.revealAfterAnswerByNative?.[code];
      if (!revealRe.test(reveal ?? "")) {
        fail(section, { ...sqCtx, displayText: reveal }, `revealAfterAnswerByNative.${code} must look like hiragana（kanji）— meaning`);
      }
    }
    if (subQuestion.revealAfterAnswerByNative?.en && looksVietnamese(subQuestion.revealAfterAnswerByNative.en)) {
      fail(section, { ...sqCtx, displayText: subQuestion.revealAfterAnswerByNative.en }, "English revealAfterAnswer must not contain Vietnamese");
    }
    const start = [...String(subQuestion.speechText ?? "")][0];
    seenStarts.add(start);
    if (start !== expectedStarts[index] || subQuestion.correctAnswer !== expectedStarts[index]) {
      fail(section, sqCtx, `expected start/correct ${expectedStarts[index]}, got ${start}/${subQuestion.correctAnswer}`);
    } else {
      pass(section, `subQuestion ${index + 1} starts with ${expectedStarts[index]}`);
    }
  });
  if (expectedStarts.every((kana) => seenStarts.has(kana))) {
    pass(section, "Exercise 8 covers あ い う え お exactly once");
  } else {
    fail(section, ctx, `Exercise 8 starts missing one of ${expectedStarts.join(", ")}`);
  }
}

function checkKatakanaPlusListeningVocabulary(lessons, courses) {
  const section = "Katakana Plus listening vocabulary checks";
  const courseId = courseIdForModule(courses, "ja", "katakana_starter");
  const hiraganaE8 = lessons.find((item) => item.id === "ja-hiragana-u1-l1")?.exercises?.[7];

  for (let lessonNum = 1; lessonNum <= 10; lessonNum += 1) {
    const lessonId = `ja-katakana-u4-l${lessonNum}`;
    const lesson = lessons.find((item) => item.id === lessonId);
    if (!lesson) {
      fail(section, { courseId, lessonId }, "missing Katakana lesson");
      continue;
    }
    const exercise = lesson.exercises?.[7];
    const ctx = {
      courseId,
      lessonId,
      exerciseIndex: 8,
      exerciseType: exercise?.type,
      visiblePrompt: exercise?.prompt,
      displayText: exercise?.displayText,
      correctAnswer: exercise?.correctAnswer,
    };

    if (
      exercise?.type === "listeningGapFill" ||
      exercise?.type === "fillBlank" ||
      exercise?.type === "fillMissingCharacter"
    ) {
      fail(section, ctx, `Katakana Exercise 8 must not be fill/gap type, got ${exercise.type}`);
      continue;
    }
    if (exercise?.type !== "plusListeningVocabularyChallenge") {
      fail(section, ctx, `expected plusListeningVocabularyChallenge, got ${exercise?.type}`);
      continue;
    }
    if (hiraganaE8?.type && exercise.type !== hiraganaE8.type) {
      fail(section, ctx, `type must match Hiragana Exercise 8 (${hiraganaE8.type})`);
    }
    if (exercise.access !== "plus" || exercise.plusOnly !== true || exercise.usesAi === true) {
      fail(section, ctx, "Exercise 8 must be Plus, plusOnly, and not use AI");
    } else {
      pass(section, `${lessonId} Exercise 8 is Plus gated and non-AI`);
    }

    if (String(exercise.displayText ?? "").includes("_")) {
      fail(section, ctx, "Exercise 8 displayText must not contain blank markers (_)");
    }

    const subQuestions = exercise.subQuestions ?? [];
    if (subQuestions.length < 3) {
      fail(section, ctx, `expected subQuestions, got ${subQuestions.length}`);
      continue;
    }
    pass(section, `${lessonId} Exercise 8 has ${subQuestions.length} subQuestions`);

    subQuestions.forEach((subQuestion, index) => {
      const sqCtx = {
        ...ctx,
        subQuestionIndex: index + 1,
        visiblePrompt: subQuestion.visibleBeforeAnswer ?? subQuestion.prompt,
        correctAnswer: subQuestion.correctAnswer,
      };
      for (const field of ["speechText", "options", "correctAnswer", "revealAfterAnswerByNative"]) {
        const value = subQuestion[field];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          fail(section, sqCtx, `subQuestion missing ${field}`);
        }
      }
      if (!subQuestion.feedbackCorrectByNative || !subQuestion.feedbackWrongByNative) {
        fail(section, sqCtx, "subQuestion missing feedbackCorrectByNative/feedbackWrongByNative");
      } else {
        const errors = [];
        validateByNativeMap(subQuestion.feedbackCorrectByNative, "feedbackCorrectByNative", (msg) => errors.push(msg));
        validateByNativeMap(subQuestion.feedbackWrongByNative, "feedbackWrongByNative", (msg) => errors.push(msg));
        validateByNativeMap(subQuestion.revealAfterAnswerByNative, "revealAfterAnswerByNative", (msg) => errors.push(msg));
        for (const err of errors) fail(section, sqCtx, err);
        if (!errors.length) pass(section, `${lessonId} subQuestion ${index + 1} localization complete`);
      }
      if (!unique(subQuestion.options ?? [])) {
        fail(section, sqCtx, "subQuestion options contain duplicates");
      }
      if (!(subQuestion.options ?? []).includes(subQuestion.correctAnswer)) {
        fail(section, sqCtx, "subQuestion options do not include correctAnswer");
      }
      if (String(subQuestion.speechText ?? "").includes("_")) {
        fail(section, sqCtx, "subQuestion speechText must not contain blank markers");
      }
      const visibleBefore = `${subQuestion.visibleBeforeAnswer ?? ""} ${subQuestion.audioCardLabel ?? ""} ${Object.values(subQuestion.visibleBeforeAnswerByNative ?? {}).join(" ")} ${subQuestion.prompt ?? ""}`;
      const revealValues = [
        subQuestion.revealAfterAnswer,
        ...Object.values(subQuestion.revealAfterAnswerByNative ?? {}),
      ].filter(Boolean);
      for (const leaked of [subQuestion.speechText, ...revealValues]) {
        if (leaked && visibleBefore.includes(leaked)) {
          fail(section, { ...sqCtx, displayText: visibleBefore }, "visible-before-answer leaks hidden answer data");
        }
      }
    });
  }
}

function checkExerciseNativeLocalization(lessons) {
  const section = "Exercise native localization checks";
  for (const lesson of lessons) {
    for (const [index, exercise] of (lesson.exercises ?? []).entries()) {
      const ctx = { lessonId: lesson.id, exerciseIndex: index + 1, exerciseType: exercise.type };
      const errors = [];
      const capture = (msg) => errors.push(msg);
      if (exercise.feedbackCorrectByNative) {
        validateByNativeMap(exercise.feedbackCorrectByNative, "feedbackCorrectByNative", capture);
      }
      if (exercise.feedbackWrongByNative) {
        validateByNativeMap(exercise.feedbackWrongByNative, "feedbackWrongByNative", capture);
      }
      if (exercise.feedbackByNative) {
        validateByNativeMap(exercise.feedbackByNative, "feedbackByNative", capture);
      }
      if (exercise.displayTextByNative) {
        validateByNativeMap(exercise.displayTextByNative, "displayTextByNative", capture);
      } else if (exercise.displayText && looksVietnamese(exercise.displayText)) {
        capture("displayText is Vietnamese-only");
      }
      if (exercise.audioCardLabel && looksVietnamese(exercise.audioCardLabel) && !exercise.audioCardLabelByNative) {
        capture("audioCardLabel is Vietnamese-only");
      }
      if (exercise.prompts) {
        validateTranslationsMap(exercise.prompts, "prompts", capture);
      }
      for (const err of errors) fail(section, ctx, err);
      if (!errors.length) pass(section, `${lesson.id} e${index + 1} localization ok`);
    }
  }
}

function checkMobileUiNativeLanguages() {
  const section = "Mobile UI native language checks";
  const requiredKeys = [
    "plusAdvancedBadge",
    "aiReviewHelper",
    "checkAnswer",
    "next",
    "tryAgain",
    "notQuite",
    "correct",
    "plusAiReviewTitle",
    "aiFeedbackReuseHelper",
    "playingAudio",
    "listenTooltip",
    "ttsUnavailable",
    "lessonIntro",
    "startExercises",
    "exerciseNumber",
    "vocabulary",
  ];
  return readFile(path.join(ROOT, "shared/i18n/mobile_ui.json"), "utf8").then((raw) => {
    const mobileUi = JSON.parse(raw);
    for (const key of requiredKeys) {
      const entry = mobileUi[key];
      if (!entry || typeof entry !== "object") {
        fail(section, { key }, "missing mobile_ui key");
        continue;
      }
      validateTranslationsMap(entry, `mobile_ui.${key}`, (msg) => fail(section, { key }, msg));
      if (entry.en && looksVietnamese(entry.en)) {
        fail(section, { key }, "mobile_ui English text contains Vietnamese");
      }
      pass(section, `${key} has vi/en/ja/ko/zh`);
    }
  });
}

function checkExerciseTypeWhitelist(lessons) {
  const section = "Exercise type whitelist";
  for (const lesson of lessons) {
    for (const [index, exercise] of (lesson.exercises ?? []).entries()) {
      if (SUPPORTED_TYPES.has(exercise.type)) {
        pass(section, `${lesson.id} e${index + 1} type ${exercise.type} is supported`);
      } else {
        fail(section, {
          lessonId: lesson.id,
          exerciseIndex: index + 1,
          exerciseType: exercise.type,
        }, `unsupported exercise type ${exercise.type}`);
      }
    }
  }
}

async function checkFocusExamAndUnitOrder(courses, lessons) {
  const section = "Focus / exam / unit order checks";
  const niches = await loadJson("shared/config/niche_options.json");
  const examTracks = await loadJson("shared/config/exam_tracks.json");
  const profileSchema = await loadJson("shared/config/profile_schema.json");
  if ((profileSchema.maxActiveTracks ?? 0) !== 2) {
    fail(section, {}, "profile_schema.maxActiveTracks must be 2");
  } else {
    pass(section, "profile_schema maxActiveTracks=2");
  }
  if (!profileSchema.fields?.activeTracks || !profileSchema.fields?.currentTrack) {
    fail(section, {}, "profile_schema missing activeTracks/currentTrack");
  } else {
    pass(section, "profile_schema has activeTracks/currentTrack");
  }
  const quickIds = niches.filter((n) => n.quickSelect !== false).map((n) => n.id);
  for (const banned of ["travel_hotel", "restaurant_food_service"]) {
    if (quickIds.includes(banned)) {
      fail(section, { nicheId: banned }, "travel/restaurant must not be separate quick-select chips");
    } else {
      pass(section, `${banned} not exposed as quick-select chip`);
    }
  }
  if (!quickIds.includes("daily_life") || !quickIds.includes("exam_preparation")) {
    fail(section, {}, "daily_life and exam_preparation must exist in quick-select");
  } else {
    pass(section, "daily_life + exam_preparation quick-select present");
  }
  for (const niche of niches) {
    if (!niche.iconKey) fail(section, { nicheId: niche.id }, "missing iconKey");
    else pass(section, `${niche.id} has iconKey=${niche.iconKey}`);
  }
  for (const [lang, needle] of [
    ["ja", "JLPT"],
    ["en", "IELTS"],
    ["ko", "TOPIK"],
    ["zh", "HSK"],
    ["fr", "DELF"],
    ["de", "Goethe"],
    ["es", "DELE"],
  ]) {
    const tracks = (examTracks[lang] ?? []).filter((t) => t.enabled !== false);
    if (tracks.length > 3) {
      fail(section, { language: lang }, `more than 3 displayed exam tracks (${tracks.length})`);
    } else {
      pass(section, `${lang} has ${tracks.length} exam track(s) (≤3)`);
    }
    const orders = tracks.map((t) => Number(t.displayOrder)).sort((a, b) => a - b);
    const expected = tracks.map((_, i) => i + 1);
    if (orders.join(",") !== expected.join(",")) {
      fail(section, { language: lang }, `exam displayOrder expected ${expected.join(",")} got ${orders.join(",")}`);
    }
    for (const track of tracks) {
      if (!track.learningLanguage && !track.language) {
        fail(section, { language: lang, trackId: track.id }, "missing learningLanguage");
      }
      if (!track.examCode && !track.examTrack) {
        fail(section, { language: lang, trackId: track.id }, "missing examCode");
      }
      if (!track.iconKey) {
        fail(section, { language: lang, trackId: track.id }, "missing iconKey");
      }
      for (const code of ["vi", "en", "ja", "ko", "zh"]) {
        if (!track.title?.[code]) {
          fail(section, { language: lang, trackId: track.id }, `missing title.${code}`);
        }
        if (!(track.shortDescription ?? track.description)?.[code]) {
          fail(section, { language: lang, trackId: track.id }, `missing shortDescription.${code}`);
        }
      }
    }
    if (!tracks.some((t) => String(t.examCode ?? t.examTrack ?? "").includes(needle))) {
      fail(section, { language: lang }, `missing exam option ${needle}`);
    } else {
      pass(section, `${lang} has exam option ${needle}`);
    }
  }

  try {
    const flutterExams = await loadJson("mobile/novalang_flutter/assets/shared/exam_tracks.json");
    if (JSON.stringify(flutterExams) !== JSON.stringify(examTracks)) {
      fail(section, {}, "Flutter exam_tracks.json not synced with shared/config");
    } else {
      pass(section, "Flutter exam_tracks.json synced");
    }
  } catch (error) {
    fail(section, {}, `Flutter exam_tracks.json missing: ${error.message}`);
  }

  const listeningTypes = new Set(["listenAndChoose", "listeningGapFill", "plusListeningVocabularyChallenge"]);
  for (const lesson of lessons) {
    for (const [index, exercise] of (lesson.exercises ?? []).entries()) {
      if (!listeningTypes.has(exercise.type)) continue;
      const speech = exercise.speechText || (exercise.subQuestions ?? []).every((sq) => sq.speechText);
      if (!speech) {
        fail(section, { lessonId: lesson.id, exerciseIndex: index + 1 }, "listening exercise missing speechText");
      }
    }
  }

  for (const language of ["ja", "en"]) {
    const foundation = courses
      .filter((c) => c.languageCode === language && c.nicheId === "core_foundation")
      .slice()
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
    const units = foundation.flatMap((c) => c.units ?? []);
    for (const unit of units) {
      const localizationErrors = [];
      validateByNativeMap(unit.titleByNative, `${unit.id}.titleByNative`, (message) => localizationErrors.push(message));
      validateByNativeMap(unit.goalByNative, `${unit.id}.goalByNative`, (message) => localizationErrors.push(message));
      for (const message of localizationErrors) {
        fail(section, { language, unitId: unit.id }, message);
      }
    }
    const orders = units.map((u) => Number(u.displayOrder ?? u.order));
    const expected = units.map((_, i) => i + 1);
    if (orders.join(",") !== expected.join(",")) {
      fail(section, { language }, `Core Foundation unit displayOrder expected ${expected.join(",")} got ${orders.join(",")}`);
    } else {
      pass(section, `${language} Core Foundation unit order ${orders.join(",")}`);
    }
    if (orders.some((n) => n >= 100)) {
      fail(section, { language }, "Core Foundation has abnormal unit number >= 100");
    }
  }

  const flutterCourses = await loadJson("mobile/novalang_flutter/assets/shared/courses.json");
  if (JSON.stringify(flutterCourses.courses) !== JSON.stringify(courses)) {
    fail(section, {}, "Flutter courses.json not synced with shared/generated");
  } else {
    pass(section, "Flutter courses.json synced with shared/generated");
  }
}

async function checkWebFlutterFlowParity() {
  const section = "Web/Flutter lesson-flow parity";
  const [webData, webLesson, webProgress, flutterLesson, flutterProgress, sharedLessons, flutterLessons] =
    await Promise.all([
      readFile(path.join(ROOT, "shared/lessonData.ts"), "utf8"),
      readFile(path.join(ROOT, "frontend/src/pages/LessonPage.tsx"), "utf8"),
      readFile(path.join(ROOT, "frontend/src/context/AppContext.tsx"), "utf8"),
      readFile(path.join(ROOT, "mobile/novalang_flutter/lib/screens/learn/lesson_screen.dart"), "utf8"),
      readFile(path.join(ROOT, "mobile/novalang_flutter/lib/state/profile_provider.dart"), "utf8"),
      readFile(path.join(ROOT, "shared/generated/lessons.json"), "utf8"),
      readFile(path.join(ROOT, "mobile/novalang_flutter/assets/shared/lessons.json"), "utf8"),
    ]);

  if (!webData.includes("curriculumCourses") || !webData.includes("getCurriculumLessonById")) {
    fail(section, {}, "Web is not wired to shared/generated curriculum source-of-truth");
  } else {
    pass(section, "Web reads the shared/generated curriculum adapter");
  }
  for (const [platform, source] of [["Web", webLesson], ["Flutter", flutterLesson]]) {
    if (!source.includes("startExercises") || !source.includes("exerciseNumber")) {
      fail(section, { platform }, `${platform} is missing intro/start or Exercise X/10 flow labels`);
    } else {
      pass(section, `${platform} exposes intro → Start exercises → Exercise X/10`);
    }
  }
  if (!webProgress.includes("[lessonId]") || !webProgress.includes("introCompleted: true")) {
    fail(section, { platform: "Web" }, "introCompleted is not stored per lessonId");
  } else {
    pass(section, "Web stores introCompleted per lessonId");
  }
  if (!flutterProgress.includes("sessions[lessonId]") || !flutterProgress.includes("'introCompleted'")) {
    fail(section, { platform: "Flutter" }, "introCompleted is not stored per lessonId");
  } else {
    pass(section, "Flutter stores introCompleted per lessonId");
  }
  if (flutterLesson.includes("introDone || startedExercises")) {
    fail(section, { platform: "Flutter" }, "legacy exercise state can still skip a lesson intro");
  } else {
    pass(section, "Flutter legacy sessions cannot bypass an unseen intro");
  }
  if (JSON.stringify(JSON.parse(sharedLessons)) !== JSON.stringify(JSON.parse(flutterLessons))) {
    fail(section, {}, "Flutter lesson asset differs from shared/generated lessons");
  } else {
    pass(section, "Flutter lesson asset exactly matches shared/generated");
  }
}


async function main() {
  const coursesJson = await loadJson("shared/generated/courses.json");
  const lessonsJson = await loadJson("shared/generated/lessons.json");
  const catalogJson = await loadJson("shared/generated/curriculum_catalog.json");
  const courses = coursesJson.courses ?? [];
  const lessons = lessonsJson.lessons ?? [];
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  console.log("NovaLang curriculum smoke test");
  console.log(`Loaded ${courses.length} courses and ${lessons.length} lessons from shared/generated.\n`);

  checkExpectedShape(coursesJson, lessonsJson);
  checkCourseLessonLinks(courses, lessonById);
  checkLessonExercises(lessons);
  checkAiRules(lessons);
  checkRouting(courses, catalogJson);
  checkKanaCoverageAndOrder(lessons, courses, {
    sectionName: "Kana coverage/order checks",
    script: "hiragana",
    moduleId: "hiragana_starter",
    expected: EXPECTED_HIRAGANA_46,
  });
  checkKanaCoverageAndOrder(lessons, courses, {
    sectionName: "Kana coverage/order checks",
    script: "katakana",
    moduleId: "katakana_starter",
    expected: EXPECTED_KATAKANA_46,
  });
  checkEnglishAlphabetCoverageAndOrder(lessons, courses);
  checkJapaneseFoundationSafety(lessons);
  // Hiragana L1 Exercise 1 must be matchPairs with 5 kana↔sound pairs.
  {
    const section = "Hiragana L1 matchPairs Exercise 1";
    const lesson = lessons.find((item) => item.id === "ja-hiragana-u1-l1");
    const e1 = lesson?.exercises?.[0];
    if (!lesson) {
      fail(section, { lessonId: "ja-hiragana-u1-l1" }, "missing lesson");
    } else if (e1?.type !== "matchPairs") {
      fail(section, { lessonId: lesson.id, exerciseType: e1?.type }, "Exercise 1 must be matchPairs");
    } else if ((e1.pairs ?? []).length !== 5) {
      fail(section, { lessonId: lesson.id }, `Exercise 1 must have 5 pairs, got ${(e1.pairs ?? []).length}`);
    } else if (e1.type === "characterCard") {
      fail(section, { lessonId: lesson.id }, "characterCard must not remain on Exercise 1");
    } else {
      const lefts = new Set((e1.pairs ?? []).map((p) => p.left));
      const rights = new Set((e1.pairs ?? []).map((p) => p.right));
      for (const kana of ["あ", "い", "う", "え", "お"]) {
        if (!lefts.has(kana)) fail(section, { lessonId: lesson.id }, `missing left ${kana}`);
      }
      for (const sound of ["a", "i", "u", "e", "o"]) {
        if (!rights.has(sound)) fail(section, { lessonId: lesson.id }, `missing right ${sound}`);
      }
      for (const code of ["vi", "en", "ja", "ko", "zh"]) {
        if (!e1.prompts?.[code] && !(code === "en" && e1.prompt) && !(code === "vi" && e1.promptVi)) {
          fail(section, { lessonId: lesson.id }, `missing prompt.${code}`);
        }
        if (!e1.instructionByNative?.[code]) {
          fail(section, { lessonId: lesson.id }, `missing instructionByNative.${code}`);
        }
      }
      pass(section, "ja-hiragana-u1-l1 Exercise 1 is matchPairs with 5 pairs + translations");
    }
  }
  // Lesson intro vocabulary cards must exist before exercises (shared source-of-truth).
  {
    const section = "Lesson intro vocabulary cards";
    const required = [
      ...EXPECTED_HIRAGANA_ROWS.map((row, index) => [
        `ja-hiragana-u1-l${index + 1}`,
        [...row],
      ]),
      ...EXPECTED_KATAKANA_ROWS.map((row, index) => [
        `ja-katakana-u4-l${index + 1}`,
        [...row],
      ]),
      ["en-alphabet-u1-l1", ["A", "E", "I", "O", "U"]],
      ["en-alphabet-u1-l2", ["B", "C", "D", "F", "G"]],
      ["en-alphabet-u1-l3", ["H", "J", "K", "L", "M"]],
      ["en-alphabet-u1-l4", ["N", "P", "Q", "R", "S"]],
      ["en-alphabet-u1-l5", ["T", "V", "W", "X", "Y", "Z"]],
      ["en-alphabet-u1-l6", ["A", "M", "S", "Y", "Z"]],
    ];
    for (const [lessonId, expected] of required) {
      const lesson = lessons.find((item) => item.id === lessonId);
      if (!lesson) {
        fail(section, { lessonId }, "missing lesson");
        continue;
      }
      const vocab = lesson.vocabulary ?? [];
      const localizationErrors = [];
      validateByNativeMap(lesson.titleByNative, `${lessonId}.titleByNative`, (message) => localizationErrors.push(message));
      validateByNativeMap(lesson.descriptionByNative, `${lessonId}.descriptionByNative`, (message) => localizationErrors.push(message));
      validateByNativeMap(lesson.canDoObjectiveByNative, `${lessonId}.canDoObjectiveByNative`, (message) => localizationErrors.push(message));
      for (const message of localizationErrors) {
        fail(section, { lessonId }, message);
      }
      if (vocab.length !== expected.length) {
        fail(section, { lessonId }, `expected exactly ${expected.length} intro vocabulary cards, got ${vocab.length}`);
      }
      const texts = vocab.map((v) => v.displayText || v.text || "");
      if (texts.join("") !== expected.join("")) {
        fail(section, { lessonId }, `intro group mismatch: expected ${expected.join("")}, got ${texts.join("")}`);
      }
      for (const ch of expected) {
        if (!texts.includes(ch)) {
          fail(section, { lessonId }, `missing intro card for ${ch}`);
        }
      }
      for (const item of vocab) {
        if (!item.speechText && !item.displayText && !item.text) {
          fail(section, { lessonId, vocabId: item.id }, "intro card missing speechText/displayText");
        }
        const meaning =
          item.translations ||
          item.meaningEn ||
          item.meaningVi;
        if (!meaning) {
          fail(section, { lessonId, vocabId: item.id }, "intro card missing localized meaning");
        }
      }
      if ((lesson.exercises ?? []).length !== 10) {
        fail(section, { lessonId }, `expected 10 exercises for X/10 label, got ${(lesson.exercises ?? []).length}`);
      }
      if (lesson.exercises?.[0]?.type !== "matchPairs") {
        fail(section, { lessonId, exerciseIndex: 1 }, "alphabet/kana foundation Exercise 1 must be matchPairs");
      }
      for (const [index, exercise] of (lesson.exercises ?? []).entries()) {
        const hasTitle =
          exercise.prompt ||
          exercise.promptVi ||
          (exercise.prompts && Object.keys(exercise.prompts).length > 0);
        if (!hasTitle) {
          fail(section, { lessonId, exerciseIndex: index + 1 }, "exercise missing title/prompt for Exercise X/10");
        }
      }
      pass(section, `${lessonId} has intro vocabulary + 10 titled exercises`);
    }
    try {
      const flutterLessons = await loadJson("mobile/novalang_flutter/assets/shared/lessons.json");
      const sharedLessons = await loadJson("shared/generated/lessons.json");
      if (JSON.stringify(flutterLessons) !== JSON.stringify(sharedLessons)) {
        fail(section, {}, "Flutter lessons.json out of sync with shared/generated");
      } else {
        pass(section, "Flutter lessons.json synced for intro cards");
      }
    } catch (error) {
      fail(section, {}, `Flutter lessons.json missing: ${error.message}`);
    }
  }
  checkNativeLanguageOptions(lessons);
  checkExerciseQuality(lessons, courses);
  checkPlusListeningVocabulary(lessons, courses);
  checkKatakanaPlusListeningVocabulary(lessons, courses);
  checkExerciseNativeLocalization(lessons);
  await checkMobileUiNativeLanguages();
  checkExerciseTypeWhitelist(lessons);
  await checkFocusExamAndUnitOrder(courses, lessons);
  await checkWebFlutterFlowParity();

  console.log("\nSummary");
  for (const [section, counts] of results.entries()) {
    console.log(`- ${section}: ${counts.passed} pass, ${counts.failed} fail`);
  }

  if (failures.length > 0) {
    console.log("\nFailures");
    for (const failure of failures) {
      const where = [
        failure.courseId && `courseId=${failure.courseId}`,
        failure.lessonId && `lessonId=${failure.lessonId}`,
        failure.exerciseIndex && `exerciseIndex=${failure.exerciseIndex}`,
        failure.subQuestionIndex && `subQuestionIndex=${failure.subQuestionIndex}`,
      ].filter(Boolean).join(" ");
      console.log(`- [${failure.section}] ${where} ${failure.reason}`.trim());
    }
    process.exit(1);
  }

  console.log("\nPASS: curriculum smoke test completed successfully.");
}

main().catch((error) => {
  console.error("smoke:curriculum failed unexpectedly:");
  console.error(error);
  process.exit(1);
});
