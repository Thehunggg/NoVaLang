import type { Language, LanguageCode } from "./types.js";
import languageOptionsConfig from "./config/language_options.json" with { type: "json" };
import nativeLanguageOptionsConfig from "./config/native_language_options.json" with { type: "json" };

/** Full language catalog entry from shared/config/language_options.json. */
export type LanguageOptionRecord = {
  code: string;
  englishName: string;
  nativeName: string;
  flagEmoji: string;
  aliases: string[];
  isSupportedAsNative: boolean;
  isSupportedAsLearning: boolean;
  courseStatus?: "available" | "coming_soon";
  learningContentStatus?: "available" | "blueprint" | "comingSoon";
  scriptType?:
    | "latin"
    | "kana"
    | "han"
    | "hangul"
    | "arabic"
    | "devanagari"
    | "cyrillic"
    | "other";
  hasFoundation?: boolean;
  contentAvailabilityNote?: string;
  color?: string;
  greeting?: string;
  description?: string;
  heroIllustrationKey?: string;
  heroAsset?: string;
  heroGradient?: string[];
  heroOverlayOpacity?: number;
  nativeNameReading?: string;
};

export type NativeLanguageOptionRecord = {
  code: string;
  englishName: string;
  nativeName: string;
  flagEmoji: string;
  aliases: string[];
  direction?: "ltr" | "rtl";
  isSupportedAsNative: boolean;
  isAvailableForUi?: boolean;
  fallbackLocale?: string;
};

/** All learning-language catalog entries from config (no invented allowlist). */
export const languageOptions: LanguageOptionRecord[] =
  languageOptionsConfig as LanguageOptionRecord[];

/** Native/UI language options (~100 languages). */
export const nativeLanguageOptions: NativeLanguageOptionRecord[] =
  nativeLanguageOptionsConfig as NativeLanguageOptionRecord[];

const toLanguage = (item: LanguageOptionRecord): Language => ({
  code: item.code,
  name: item.englishName,
  nativeName: item.nativeName,
  flag: item.flagEmoji,
  color: item.color ?? "#22d3ee",
  greeting: item.greeting ?? "",
  description: item.description ?? "",
});

/** Learning languages with playable courses (driven by courseStatus in config). */
export const learningLanguages: Language[] = languageOptions
  .filter(
    (item) =>
      item.isSupportedAsLearning &&
      (item.courseStatus ?? "coming_soon") === "available",
  )
  .map(toLanguage);

/** All languages marked as learning targets (including coming soon). */
export const allLearningLanguageOptions: LanguageOptionRecord[] =
  languageOptions.filter((item) => item.isSupportedAsLearning);

/** Picker list: available first, then coming soon — same catalog as Flutter. */
export const allLearningLanguages: Language[] = [...allLearningLanguageOptions]
  .sort((a, b) => {
    const av = (a.courseStatus ?? "coming_soon") === "available" ? 1 : 0;
    const bv = (b.courseStatus ?? "coming_soon") === "available" ? 1 : 0;
    return bv - av;
  })
  .map(toLanguage);

export const getLanguageOption = (code: string) =>
  languageOptions.find((item) => item.code === code) ??
  nativeLanguageOptions.find((item) => item.code === code);

export const getNativeLanguageOption = (code: string) =>
  nativeLanguageOptions.find((item) => item.code === code);

export const getLearningLanguage = (code: LanguageCode) =>
  allLearningLanguages.find((item) => item.code === code) ??
  learningLanguages.find((item) => item.code === code);

export const getLearningLanguageLabel = (code: string) =>
  getLanguageOption(code)?.englishName ?? code;

export const isCourseAvailable = (code: string) =>
  (getLanguageOption(code) as LanguageOptionRecord | undefined)?.courseStatus ===
  "available";

/** Resolve UI locale for a native language (fallback English when UI is not polished). */
export const resolveUiLocale = (nativeCode: string) => {
  const native = getNativeLanguageOption(nativeCode);
  if (native?.isAvailableForUi) return native.code;
  return native?.fallbackLocale ?? "en";
};
