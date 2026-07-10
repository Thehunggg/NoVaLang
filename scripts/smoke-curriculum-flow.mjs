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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EXPECTED_VERSION = "curriculum-v3";
const EXPECTED_COURSE_COUNT = 5;
const EXPECTED_LESSON_COUNT = 30;
const NATIVE_CODES = ["vi", "ja", "ko", "zh"];
const MEANING_CHOICE_TYPES = new Set(["chooseMeaning", "listenAndChoose"]);
const SUPPORTED_TYPES = new Set([
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
]);

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

      for (const nativeCode of NATIVE_CODES) {
        const nativeOptions = exercise.optionsByNative?.[nativeCode];
        const accepted = exercise.acceptedAnswersByNative?.[nativeCode];
        if (!Array.isArray(nativeOptions) || nativeOptions.length !== 4) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `missing 4 optionsByNative.${nativeCode}`);
          continue;
        }
        if (JSON.stringify(nativeOptions) === englishOptions) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `optionsByNative.${nativeCode} silently falls back to English`);
        }
        if (!accepted?.length || !nativeOptions.includes(accepted[0])) {
          fail(section, { lessonId: lesson.id, exerciseIndex }, `correct answer missing from optionsByNative.${nativeCode}`);
        }
      }

      if (lesson.languageCode === "en" && !checkedEnJa) {
        const jaOptions = exercise.optionsByNative?.ja ?? [];
        if (jaOptions.some(hasJapaneseText)) {
          pass(section, "native ja + learning en has Japanese meaning labels");
          checkedEnJa = true;
        } else {
          fail(section, { lessonId: lesson.id, exerciseIndex }, "native ja + learning en expected Japanese meaning labels");
        }
      }

      if (lesson.languageCode === "ja" && !checkedJaVi) {
        const viOptions = exercise.optionsByNative?.vi ?? [];
        if (viOptions.length === 4 && JSON.stringify(viOptions) !== JSON.stringify(exercise.options ?? [])) {
          pass(section, "native vi + learning ja has Vietnamese meaning labels");
          checkedJaVi = true;
        } else {
          fail(section, { lessonId: lesson.id, exerciseIndex }, "native vi + learning ja expected Vietnamese meaning labels");
        }
      }
    }
  }

  if (!checkedEnJa) fail(section, {}, "did not find native ja + learning en sample");
  if (!checkedJaVi) fail(section, {}, "did not find native vi + learning ja sample");
}

function checkExerciseTypes(lessons) {
  const section = "Exercise type whitelist";
  for (const lesson of lessons) {
    (lesson.exercises ?? []).forEach((exercise, index) => {
      if (SUPPORTED_TYPES.has(exercise.type)) {
        pass(section, `${lesson.id} e${index + 1} type=${exercise.type}`);
      } else {
        fail(section, { lessonId: lesson.id, exerciseIndex: index + 1 }, `unsupported exercise type ${exercise.type}`);
      }
    });
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
  checkJapaneseFoundationSafety(lessons);
  checkNativeLanguageOptions(lessons);
  checkExerciseTypes(lessons);

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
