import rawNiches from "../../../shared/config/niche_options.json";
import nicheLabels from "../../../shared/i18n/niche_labels.json";
import type { SupportedUILanguage } from "../types/index";

export interface NicheOption {
  id: string;
  category: string;
  title: string;
  description: string;
  isReady: boolean;
  iconKey?: string;
  quickSelect?: boolean;
  branchType?: string;
  subtopics?: string[];
}

type LocalizedMap = Record<string, string | Record<string, string>>;

const titles = nicheLabels.titles as LocalizedMap;
const categories = nicheLabels.categories as LocalizedMap;
export const nicheLegacyIdMap =
  ((nicheLabels as { legacyIdMap?: Record<string, string> }).legacyIdMap ??
    {}) as Record<string, string>;

const pickLabel = (value: string | Record<string, string> | undefined, language: SupportedUILanguage, fallback: string) => {
  if (!value) return fallback;
  if (typeof value === "string") return language === "vi" ? value : language === "en" ? fallback : `⟦missing:${language}⟧`;
  return value[language] ?? `⟦missing:${language}⟧`;
};

export const nicheOptions = rawNiches as NicheOption[];

export const normalizeNicheId = (id: string | null | undefined) => {
  if (!id) return id;
  return nicheLegacyIdMap[id] ?? id;
};

export const nicheTitle = (niche: NicheOption, language: SupportedUILanguage) =>
  pickLabel(titles[niche.id], language, niche.title);

export const nicheCategory = (category: string, language: SupportedUILanguage) =>
  pickLabel(categories[category], language, category);

export const groupedNiches = () =>
  nicheOptions
    .filter((niche) => niche.quickSelect !== false)
    .reduce<Record<string, NicheOption[]>>((groups, niche) => {
      groups[niche.category] = [...(groups[niche.category] ?? []), niche];
      return groups;
    }, {});
