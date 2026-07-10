#!/usr/bin/env node
/**
 * Export review-only curriculum blueprint to PostgreSQL seed SQL.
 *
 * This script does not connect to PostgreSQL. It only reads:
 *   shared/review_drafts/curriculum_bulk_review.json
 * and writes:
 *   docs/db/curriculum_review_seed.sql
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INPUT = path.join(ROOT, "shared", "review_drafts", "curriculum_bulk_review.json");
const OUTPUT = path.join(ROOT, "docs", "db", "curriculum_review_seed.sql");

const TABLE_ORDER = [
  "review_exercise_options",
  "review_translations",
  "review_vocabulary_items",
  "review_exercises",
  "review_lessons",
  "review_units",
  "review_modules",
  "review_niches",
  "review_native_languages",
  "review_learning_languages",
  "review_validation_issues",
];

function sqlString(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlBool(value) {
  return value ? "TRUE" : "FALSE";
}

function sqlJson(value) {
  return `${sqlString(JSON.stringify(value ?? {}))}::jsonb`;
}

function sqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "boolean") return sqlBool(value);
  if (typeof value === "number") return String(value);
  return sqlString(value);
}

function insertRows(table, columns, rows, chunkSize = 500) {
  if (rows.length === 0) return "";
  const chunks = [];
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const values = chunk
      .map((row) => `(${columns.map((column) => row[column]).join(", ")})`)
      .join(",\n");
    chunks.push(`INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${values};`);
  }
  return chunks.join("\n\n");
}

function flattenBlueprint(blueprint) {
  const learningLanguages = (blueprint.learning_languages ?? []).map((language) => ({
    language_code: sqlString(language.language_code),
    english_name: sqlString(language.english_name),
    native_name: sqlString(language.native_name),
    status: sqlString(language.status ?? "available"),
    raw_json: sqlJson(language),
  }));

  const nativeLanguages = (blueprint.native_languages ?? []).map((language) => ({
    language_code: sqlString(language.language_code),
    english_name: sqlString(language.english_name),
    native_name: sqlString(language.native_name),
    status: sqlString(language.status ?? "available"),
    raw_json: sqlJson(language),
  }));

  const niches = [];
  const modules = [];
  const units = [];
  const lessons = [];
  const exercises = [];
  const translations = [];

  function addNiche(niche, category) {
    niches.push({
      niche_id: sqlString(niche.niche_id),
      category: sqlString(niche.category ?? category ?? null),
      title: sqlString(niche.title),
      description: sqlString(niche.description ?? niche.note ?? null),
      is_canonical: sqlBool(true),
      is_review_only: sqlBool(niche.is_review_only !== false),
      status: sqlString(niche.status ?? "draft_review"),
      raw_json: sqlJson({ ...niche, modules: undefined, tracks: undefined }),
    });
    translations.push({
      entity_type: sqlString("niche"),
      entity_id: sqlString(niche.niche_id),
      language_code: sqlString("en"),
      field_name: sqlString("title"),
      translated_text: sqlString(niche.title),
      raw_json: sqlJson({ source: "curriculum_bulk_review" }),
    });
  }

  function addModule(module, nicheId) {
    modules.push({
      module_id: sqlString(module.module_id),
      niche_id: sqlString(nicheId),
      title: sqlString(module.title),
      order_index: sqlValue(module.order_index ?? 1),
      required_level: sqlString(module.required_level ?? null),
      is_review_only: sqlBool(module.is_review_only !== false),
      status: sqlString(module.status ?? "draft_review"),
      raw_json: sqlJson({ ...module, units: undefined }),
    });
    translations.push({
      entity_type: sqlString("module"),
      entity_id: sqlString(module.module_id),
      language_code: sqlString("en"),
      field_name: sqlString("title"),
      translated_text: sqlString(module.title),
      raw_json: sqlJson({ source: "curriculum_bulk_review" }),
    });
  }

  function addUnit(unit, moduleId, nicheId) {
    units.push({
      unit_id: sqlString(unit.unit_id),
      module_id: sqlString(moduleId),
      niche_id: sqlString(nicheId),
      title: sqlString(unit.title),
      order_index: sqlValue(unit.order_index ?? 1),
      required_level: sqlString(unit.required_level ?? null),
      is_review_only: sqlBool(unit.is_review_only !== false),
      status: sqlString(unit.status ?? "draft_review"),
      raw_json: sqlJson({ ...unit, lessons: undefined }),
    });
    translations.push({
      entity_type: sqlString("unit"),
      entity_id: sqlString(unit.unit_id),
      language_code: sqlString("en"),
      field_name: sqlString("title"),
      translated_text: sqlString(unit.title),
      raw_json: sqlJson({ source: "curriculum_bulk_review" }),
    });
  }

  function addLesson(lesson) {
    lessons.push({
      lesson_id: sqlString(lesson.lesson_id),
      unit_id: sqlString(lesson.unit_id),
      niche_id: sqlString(lesson.niche_id),
      module_id: sqlString(lesson.module_id),
      learning_language: sqlString(lesson.learning_language),
      title: sqlString(lesson.title),
      order_index: sqlValue(lesson.order_index),
      required_level: sqlString(lesson.required_level),
      is_playable: sqlBool(lesson.is_playable === true),
      is_review_only: sqlBool(lesson.is_review_only !== false),
      status: sqlString(lesson.status ?? "draft_review"),
      total_exercises: sqlValue(lesson.total_exercises ?? lesson.exercise_slots?.length ?? 0),
      raw_json: sqlJson({ ...lesson, exercise_slots: undefined }),
    });
    translations.push({
      entity_type: sqlString("lesson"),
      entity_id: sqlString(lesson.lesson_id),
      language_code: sqlString("en"),
      field_name: sqlString("title"),
      translated_text: sqlString(lesson.title),
      raw_json: sqlJson({ source: "curriculum_bulk_review" }),
    });

    for (const slot of lesson.exercise_slots ?? []) {
      const exerciseId = `${lesson.lesson_id}-e${slot.order_index}`;
      exercises.push({
        exercise_id: sqlString(exerciseId),
        lesson_id: sqlString(lesson.lesson_id),
        order_index: sqlValue(slot.order_index),
        exercise_type: sqlString(slot.exercise_type),
        access_level: sqlString(slot.access_level),
        uses_ai: sqlBool(slot.uses_ai === true),
        ai_mode: sqlString(slot.ai_mode ?? null),
        audio_source: sqlString(slot.audio_source ?? null),
        prompt_text: sqlString(slot.prompt_text ?? null),
        correct_answer: sqlString(slot.correct_answer ?? null),
        raw_json: sqlJson(slot),
      });
    }
  }

  function walkReviewNiche(niche, category) {
    addNiche(niche, category);
    for (const module of niche.modules ?? []) {
      addModule(module, niche.niche_id);
      for (const unit of module.units ?? []) {
        addUnit(unit, module.module_id, niche.niche_id);
        for (const lesson of unit.lessons ?? []) addLesson(lesson);
      }
    }
  }

  walkReviewNiche(blueprint.architecture.core_foundation, "Core Foundation");
  for (const niche of blueprint.architecture.main_niches ?? []) {
    walkReviewNiche(niche, niche.category ?? "Main Niche");
  }

  const exam = blueprint.architecture.exam_preparation;
  addNiche(exam, "Exam Preparation");
  for (const [index, track] of (exam.tracks ?? []).entries()) {
    modules.push({
      module_id: sqlString(track.exam_id),
      niche_id: sqlString(exam.niche_id),
      title: sqlString(track.title),
      order_index: sqlValue(index + 1),
      required_level: sqlString(null),
      is_review_only: sqlBool(true),
      status: sqlString(track.status ?? "placeholder_review"),
      raw_json: sqlJson(track),
    });
  }

  return {
    learningLanguages,
    nativeLanguages,
    niches,
    modules,
    units,
    lessons,
    exercises,
    translations,
  };
}

async function main() {
  const raw = await readFile(INPUT, "utf8");
  const blueprint = JSON.parse(raw);
  const data = flattenBlueprint(blueprint);

  await mkdir(path.dirname(OUTPUT), { recursive: true });

  const sections = [
    "-- Generated by scripts/export-curriculum-review.mjs",
    `-- Source: ${path.relative(ROOT, INPUT).replaceAll("\\", "/")}`,
    "-- Review database only. Do not use as playable app curriculum.",
    "",
    "BEGIN;",
    "",
    `TRUNCATE TABLE ${TABLE_ORDER.join(", ")} RESTART IDENTITY CASCADE;`,
    "",
    insertRows("review_learning_languages", ["language_code", "english_name", "native_name", "status", "raw_json"], data.learningLanguages),
    insertRows("review_native_languages", ["language_code", "english_name", "native_name", "status", "raw_json"], data.nativeLanguages),
    insertRows("review_niches", ["niche_id", "category", "title", "description", "is_canonical", "is_review_only", "status", "raw_json"], data.niches),
    insertRows("review_modules", ["module_id", "niche_id", "title", "order_index", "required_level", "is_review_only", "status", "raw_json"], data.modules),
    insertRows("review_units", ["unit_id", "module_id", "niche_id", "title", "order_index", "required_level", "is_review_only", "status", "raw_json"], data.units),
    insertRows("review_lessons", ["lesson_id", "unit_id", "niche_id", "module_id", "learning_language", "title", "order_index", "required_level", "is_playable", "is_review_only", "status", "total_exercises", "raw_json"], data.lessons),
    insertRows("review_exercises", ["exercise_id", "lesson_id", "order_index", "exercise_type", "access_level", "uses_ai", "ai_mode", "audio_source", "prompt_text", "correct_answer", "raw_json"], data.exercises),
    insertRows("review_translations", ["entity_type", "entity_id", "language_code", "field_name", "translated_text", "raw_json"], data.translations),
    "",
    "COMMIT;",
    "",
  ].filter(Boolean);

  await writeFile(OUTPUT, `${sections.join("\n\n")}`, "utf8");

  console.log(`Generated ${path.relative(ROOT, OUTPUT)}`);
  console.log(`Learning languages: ${data.learningLanguages.length}`);
  console.log(`Native languages: ${data.nativeLanguages.length}`);
  console.log(`Niches: ${data.niches.length}`);
  console.log(`Modules: ${data.modules.length}`);
  console.log(`Units: ${data.units.length}`);
  console.log(`Lessons: ${data.lessons.length}`);
  console.log(`Exercises: ${data.exercises.length}`);
}

main().catch((error) => {
  console.error("export-curriculum-review failed:");
  console.error(error);
  process.exit(1);
});
