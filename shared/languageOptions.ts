import type { Language, LanguageCode } from "./types.js";
import languageOptionsConfig from "./config/language_options.json" with { type: "json" };

/** Full language catalog entry from shared/config/language_options.json. */
export type LanguageOptionRecord = {
  code: string;
  englishName: string;
  nativeName: string;
  flagEmoji: string;
  aliases: string[];
  isSupportedAsNative: boolean;
  isSupportedAsLearning: boolean;
  color?: string;
  greeting?: string;
  description?: string;
};

/** All language options (native + learning catalog). */
export const languageOptions: LanguageOptionRecord[] =
  languageOptionsConfig as LanguageOptionRecord[];

const isLearningLanguageCode = (code: string): code is LanguageCode =>
  code === "en" || code === "ja" || code === "es";

/** Learning languages used by Web, backend, and course generation. */
export const learningLanguages: Language[] = languageOptions
  .filter(
    (item): item is LanguageOptionRecord & { code: LanguageCode } =>
      item.isSupportedAsLearning && isLearningLanguageCode(item.code),
  )
  .map((item) => ({
    code: item.code,
    name: item.englishName,
    nativeName: item.nativeName,
    flag: item.flagEmoji,
    color: item.color ?? "#22d3ee",
    greeting: item.greeting ?? "",
    description: item.description ?? "",
  }));

export const getLanguageOption = (code: string) =>
  languageOptions.find((item) => item.code === code);

export const getLearningLanguage = (code: LanguageCode) =>
  learningLanguages.find((item) => item.code === code);
