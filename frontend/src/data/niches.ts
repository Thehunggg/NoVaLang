import rawNiches from "../../../shared/config/niche_options.json";
import nicheLabels from "../../../shared/i18n/niche_labels.json";
import type { SupportedUILanguage } from "../types/index";

export interface NicheOption {
  id: string;
  category: string;
  title: string;
  description: string;
  isReady: boolean;
}

const titleVi = nicheLabels.titles as Record<string, string>;
const categoryVi = nicheLabels.categories as Record<string, string>;

export const nicheOptions = rawNiches as NicheOption[];

export const nicheTitle = (niche: NicheOption, language: SupportedUILanguage) => language === "vi" ? titleVi[niche.id] ?? niche.title : niche.title;
export const nicheCategory = (category: string, language: SupportedUILanguage) => language === "vi" ? categoryVi[category] ?? category : category;

export const groupedNiches = () => nicheOptions.reduce<Record<string, NicheOption[]>>((groups, niche) => {
  groups[niche.category] = [...(groups[niche.category] ?? []), niche];
  return groups;
}, {});

