import type { LocalizedAnswers, LocalizedText, SupportedUILanguage } from "../types/index";

export const getLocalizedText = (value: LocalizedText | null | undefined, nativeLanguage: string): string => {
  if (typeof value === "string") return value;
  if (!value) return "";
  const locale = nativeLanguage.toLowerCase().replace("_", "-").split("-")[0] as SupportedUILanguage;
  const resolved = value[locale];
  if (resolved?.trim()) return resolved;
  if (import.meta.env.DEV) console.warn(`[i18n] missing content for ${locale}`);
  return "";
};

export const getLocalizedAnswers = (value: LocalizedAnswers | null | undefined, nativeLanguage: string): string[] => {
  if (!value) return [];
  const locale = nativeLanguage.toLowerCase().replace("_", "-").split("-")[0] as SupportedUILanguage;
  const resolved = value[locale];
  if (resolved?.length) return resolved;
  if (import.meta.env.DEV) console.warn(`[i18n] missing answers for ${locale}`);
  return [];
};
