import { useCallback } from "react";
import { useApp } from "../context/AppContext";
import { translations, type TranslationKey } from "./translations";

export function useTranslation() {
  const { progress } = useApp();
  const t = useCallback((key: TranslationKey, variables?: Record<string, string | number>) => {
    let value = translations[progress.effectiveUILanguage][key];
    if (variables) Object.entries(variables).forEach(([name, replacement]) => { value = value.split(`{${name}}`).join(String(replacement)); });
    return value;
  }, [progress.effectiveUILanguage]);
  return { t, language: progress.effectiveUILanguage };
}

