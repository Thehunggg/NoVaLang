import type { NativeLanguage } from "./types.js";
import { nativeLanguageOptions } from "./languageOptions.js";

/** Native/UI language catalog from shared/config/native_language_options.json (~100). */
export const nativeLanguages: NativeLanguage[] = nativeLanguageOptions.map((item) => ({
  code: item.code,
  name: item.englishName,
  nativeName: item.nativeName,
  flagEmoji: item.flagEmoji,
  direction: item.direction ?? "ltr",
  uiSupported: item.isAvailableForUi === true,
}));

/**
 * Single source of truth for "which locales the app UI is actually offered
 * in" — driven entirely by `isAvailableForUi` in
 * shared/config/native_language_options.json. Consumers (web
 * `translations.ts`, any future picker) must import this instead of
 * re-declaring their own list.
 */
export const uiSupportedLanguageCodes: string[] = nativeLanguageOptions
  .filter((item) => item.isAvailableForUi === true)
  .map((item) => item.code);

export const popularNativeLanguageCodes = [
  "vi",
  "en",
  "ja",
  "ko",
  "zh",
  "es",
  "fr",
  "de",
  "pt",
  "th",
  "id",
  "hi",
  "ar",
  "ru",
];
