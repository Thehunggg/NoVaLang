/**
 * General languageCode -> display-name lookup, for use anywhere the
 * generator needs to show "this course is in <language X>" for an
 * arbitrary languageCode, not just the two languages currently playable.
 *
 * Source of truth (existing system data, not invented here):
 * - shared/config/language_options.json (learning-language catalog:
 *   englishName, nativeName per code)
 * - shared/config/native_language_options.json (native/UI-language
 *   catalog: same englishName/nativeName shape)
 *
 * Neither file records a full vi/en/ja/ko/zh cross-translation matrix
 * (e.g. "what is Japanese called in Vietnamese") for every code - only a
 * language's own English name and its own native-script self-name exist
 * generally. The two entries already in production (ja, en) are preserved
 * verbatim below (extracted from the prior hand-authored ternary they
 * replace, not retranslated) so existing output is unchanged. Any other
 * language code resolves through the general fallback: its own
 * native-script name for its own locale, and its English name everywhere
 * else (no fabricated cross-locale translation is invented).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');

function loadJson(relPath) {
  return JSON.parse(readFileSync(path.join(REPO_ROOT, relPath), 'utf8'));
}

const LEARNING_LANGUAGE_OPTIONS = loadJson('shared/config/language_options.json');
const NATIVE_LANGUAGE_OPTIONS = loadJson('shared/config/native_language_options.json');

const SELF_NAMES_BY_CODE = new Map();
for (const entry of [...LEARNING_LANGUAGE_OPTIONS, ...NATIVE_LANGUAGE_OPTIONS]) {
  if (!SELF_NAMES_BY_CODE.has(entry.code)) {
    SELF_NAMES_BY_CODE.set(entry.code, {
      englishName: entry.englishName,
      nativeName: entry.nativeName,
    });
  }
}

// Preserved verbatim from the prior daily-life-blueprint.mjs / helpers.mjs
// ternaries - the only two languages with a vetted, in-production
// vi/en/ja/ko/zh cross-translation set today.
const KNOWN_CROSS_LOCALE_NAMES = {
  ja: { vi: 'Tiếng Nhật', en: 'Japanese', ja: '日本語', ko: '일본어', zh: '日语' },
  en: { vi: 'Tiếng Anh', en: 'English', ja: '英語', ko: '영어', zh: '英语' },
};

/**
 * Resolve languageCode's display name as seen from nativeCode's locale.
 * Throws for a languageCode with no record in either config file at all
 * (a genuinely unknown code should fail loud, not silently guess).
 */
export function resolveLanguageDisplayName(languageCode, nativeCode) {
  const known = KNOWN_CROSS_LOCALE_NAMES[languageCode];
  if (known && known[nativeCode]) return known[nativeCode];

  const self = SELF_NAMES_BY_CODE.get(languageCode);
  if (!self) {
    throw new Error(
      `resolveLanguageDisplayName: unknown language code "${languageCode}" ` +
        `(not found in shared/config/language_options.json or native_language_options.json)`,
    );
  }
  if (nativeCode === languageCode) return self.nativeName;
  return self.englishName;
}

/**
 * Resolve languageCode's display name across all 5 NATIVE_CODES at once.
 */
export function resolveLanguageDisplayNameByNative(languageCode, nativeCodes) {
  return Object.fromEntries(
    nativeCodes.map((code) => [code, resolveLanguageDisplayName(languageCode, code)]),
  );
}
