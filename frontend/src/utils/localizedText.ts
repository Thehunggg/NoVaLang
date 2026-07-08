import type { LocalizedAnswers, LocalizedText, SupportedUILanguage } from "../types/index";

export const getLocalizedText = (value: LocalizedText | null | undefined, nativeLanguage: string, fallbackLanguage: SupportedUILanguage = "en"): string => {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value[nativeLanguage as SupportedUILanguage] ?? value[fallbackLanguage] ?? Object.values(value).find((item): item is string => typeof item === "string") ?? "";
};

export const getLocalizedAnswers = (value: LocalizedAnswers | null | undefined, nativeLanguage: string, fallbackLanguage: SupportedUILanguage = "en"): string[] => {
  if (!value) return [];
  return value[nativeLanguage as SupportedUILanguage] ?? value[fallbackLanguage] ?? Object.values(value).find((items): items is string[] => Array.isArray(items)) ?? [];
};
