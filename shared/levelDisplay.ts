import type { LanguageCode, LevelId, NativeLanguageCode } from "./types.js";
import levelLabelsConfig from "./i18n/level_labels.json" with { type: "json" };

type LevelLabelsFile = {
  levelOrder: LevelId[];
  tracks: Record<
    string,
    { labels: Record<string, Partial<Record<LevelId, string>>> }
  >;
};

const config = levelLabelsConfig as LevelLabelsFile;

/** Stable level order — sourced from shared/i18n/level_labels.json */
export const levelOrder: LevelId[] = config.levelOrder;

const defaultLabels = config.tracks.default?.labels.en ?? {};
const japaneseLabelsEn = config.tracks.ja?.labels.en ?? {};
const japaneseLabelsVi = config.tracks.ja?.labels.vi ?? {};

export function getLevelDisplayName(
  levelCode: LevelId,
  learningLanguage: LanguageCode,
  nativeLanguage?: NativeLanguageCode,
): string {
  if (learningLanguage === "ja") {
    const labels =
      nativeLanguage === "vi" ? japaneseLabelsVi : japaneseLabelsEn;
    return labels[levelCode] ?? levelCode;
  }
  return defaultLabels[levelCode] ?? levelCode;
}
