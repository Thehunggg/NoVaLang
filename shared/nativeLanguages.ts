import type { NativeLanguage } from "./types.js";
import { nativeLanguageOptions } from "./languageOptions.js";

const UI_SUPPORTED = new Set(["vi", "en", "ja"]);

/** Native/UI language catalog from shared/config/native_language_options.json (~100). */
export const nativeLanguages: NativeLanguage[] = nativeLanguageOptions.map((item) => ({
  code: item.code,
  name: item.englishName,
  nativeName: item.nativeName,
  flagEmoji: item.flagEmoji,
  direction: item.direction ?? "ltr",
  uiSupported: item.isAvailableForUi === true || UI_SUPPORTED.has(item.code),
}));

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
