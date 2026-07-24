import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { JA_UNIT1_LESSON1 } from './content/daily-life/module-1/ja-unit1-lesson1.mjs';
import { NATIVE_CODES } from './lib/native-localization.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAME_EN_JA_ALLOWLIST = new Set([
  'xp',
  'emailMockHint',
  'lessonSectionIntroJapanese',
  'lessonSectionVocabularyJapanese',
  'lessonSectionDialogueJapanese',
  'lessonSectionGrammarJapanese',
  'lessonSectionExerciseJapanese',
]);

const errors = [];
const fail = (message) => errors.push(message);
const readJson = async (relativePath) => JSON.parse(
  await readFile(path.join(ROOT, relativePath), 'utf8'),
);
// Single source of truth: which locales mobile_ui.json entries are required
// to have, driven by isAvailableForUi in
// shared/config/native_language_options.json (was a hard-coded ['vi','en','ja']
// literal, now dynamic — see docs/ai commit history for the consolidation).
const REQUIRED_UI_LOCALES = (await readJson('shared/config/native_language_options.json'))
  .filter((item) => item.isAvailableForUi)
  .map((item) => item.code);

function validateLocaleMap(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${label}: expected locale map`);
    return;
  }
  for (const locale of REQUIRED_UI_LOCALES) {
    const localized = value[locale];
    if (typeof localized !== 'string' || localized.trim() === '') {
      fail(`${label}.${locale}: missing or empty`);
    }
  }
}

function validateNativeValue(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${label}: expected native-language map`);
    return;
  }
  for (const locale of REQUIRED_UI_LOCALES) {
    const localized = value[locale];
    const validString = typeof localized === 'string' && localized.trim() !== '';
    const validList = Array.isArray(localized)
      && localized.length > 0
      && localized.every((entry) => typeof entry === 'string' && entry.trim() !== '');
    if (!validString && !validList) fail(`${label}.${locale}: missing or empty`);
  }
}

function validateGoldenNativeMaps(value, label = 'golden') {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => validateGoldenNativeMaps(entry, `${label}[${index}]`));
    return;
  }
  if (!value || typeof value !== 'object') return;

  const keys = Object.keys(value);
  const isLocaleMap = keys.length > 0
    && keys.every((key) => REQUIRED_UI_LOCALES.includes(key));
  if (isLocaleMap) {
    validateNativeValue(value, label);
    return;
  }

  for (const [key, entry] of Object.entries(value)) {
    if (key.endsWith('ByNative')) validateNativeValue(entry, `${label}.${key}`);
    validateGoldenNativeMaps(entry, `${label}.${key}`);
  }
}

const mobileUi = await readJson('shared/i18n/mobile_ui.json');
for (const [key, value] of Object.entries(mobileUi)) {
  validateLocaleMap(value, `mobile_ui.${key}`);
  if (value.en === value.ja && !SAME_EN_JA_ALLOWLIST.has(key)) {
    fail(`mobile_ui.${key}: Japanese value unexpectedly equals English`);
  }
}

for (const allowed of SAME_EN_JA_ALLOWLIST) {
  if (!Object.hasOwn(mobileUi, allowed)) {
    fail(`mobile_ui allowlist contains unknown key: ${allowed}`);
  }
}

const dailyGoals = await readJson('shared/config/daily_goal_options.json');
for (const [index, option] of dailyGoals.entries()) {
  if (!Number.isInteger(option.minutes) || option.minutes <= 0) {
    fail(`daily_goal_options[${index}].minutes: expected positive integer`);
  }
  if (!option.nameKey || !Object.hasOwn(mobileUi, option.nameKey)) {
    fail(`daily_goal_options[${index}].nameKey: missing mobile_ui key`);
  }
}

validateGoldenNativeMaps(JA_UNIT1_LESSON1);

// NOVALANG-VOCABULARY-RUNTIME-REMEDIATION-01: systemic purity gate.
// The completeness checks above verify vi/en/ja are non-empty, but never
// verified that the en/ja values are not actually Vietnamese. Scan the whole
// generated curriculum and fail if any en or ja slot of a locale map contains
// Vietnamese. Detection is café-safe: it keys on letters/diacritics unique to
// Vietnamese, so Latin loanwords such as "café" are not false-positives.
const VI_SPECIFIC_LETTERS = /[đĐăĂâÂêÊôÔơƠưƯ]/;
const VI_STACKED_DIACRITICS =
  /[ằẳẵặầẩẫậảãạắấểễệềỉĩịọỏốồổỗộớờởỡợủũụứừửữựỳỷỹỵ]/i;
const containsVietnamese = (value) =>
  typeof value === 'string'
  && (VI_SPECIFIC_LETTERS.test(value) || VI_STACKED_DIACRITICS.test(value));

function scanGeneratedPurity(node, path, lessonId) {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((entry, index) => scanGeneratedPurity(entry, `${path}[${index}]`, lessonId));
    return;
  }
  if (typeof node !== 'object') return;
  const keys = Object.keys(node);
  const isLocaleMap = keys.includes('vi')
    && (keys.includes('en') || keys.includes('ja'))
    && keys.every((key) => NATIVE_CODES.includes(key));
  if (isLocaleMap) {
    for (const code of ['en', 'ja']) {
      const localized = node[code];
      const check = (text, suffix) => {
        if (containsVietnamese(text)) {
          fail(
            `${lessonId}${path}.${code}${suffix}: Vietnamese leaked into ${code} `
              + `slot: ${String(text).slice(0, 70)}`,
          );
        }
      };
      if (typeof localized === 'string') check(localized, '');
      else if (Array.isArray(localized)) localized.forEach((text, index) => check(text, `[${index}]`));
    }
    return;
  }
  for (const key of keys) scanGeneratedPurity(node[key], `${path}.${key}`, lessonId);
}

const generatedCurriculum = await readJson('shared/generated/lessons.json');
const generatedLessons = Array.isArray(generatedCurriculum)
  ? generatedCurriculum
  : generatedCurriculum.lessons ?? [];
for (const lesson of generatedLessons) {
  scanGeneratedPurity(lesson, '', lesson.id ?? 'unknown');
}

if (errors.length > 0) {
  console.error(`Localization purity validation failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Localization purity validation passed: ${Object.keys(mobileUi).length} UI keys, `
      + `${dailyGoals.length} daily-goal options, Golden vi/en/ja maps complete, `
      + `${generatedLessons.length} generated lessons scanned with no Vietnamese in en/ja.`,
  );
}
