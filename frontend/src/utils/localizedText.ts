import type { LocalizedAnswers, LocalizedText, SupportedUILanguage } from "../types/index";

export const getLocalizedText = (value: LocalizedText | null | undefined, nativeLanguage: string): string => {
  if (typeof value === "string") return value;
  if (!value) return "";
  const locale = nativeLanguage.toLowerCase().replace("_", "-").split("-")[0] as SupportedUILanguage;
  return value[locale] ?? `⟦missing-content:${locale}⟧`;
};

export const getLocalizedAnswers = (value: LocalizedAnswers | null | undefined, nativeLanguage: string): string[] => {
  if (!value) return [];
  const locale = nativeLanguage.toLowerCase().replace("_", "-").split("-")[0] as SupportedUILanguage;
  return value[locale] ?? [`⟦missing-content:${locale}⟧`];
};
