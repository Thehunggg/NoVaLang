import type { LanguageCode, LevelId, NativeLanguageCode } from "./types.js";

export const levelOrder: LevelId[] = ["A0", "A1_1", "A1_2", "A2_1", "A2_2", "B1_1", "B1_2", "B2"];

const cefrDisplay: Record<LevelId, string> = {
  A0: "A0",
  A1_1: "A1",
  A1_2: "A1",
  A2_1: "A2",
  A2_2: "A2",
  B1_1: "B1",
  B1_2: "B1",
  B2: "B2"
};

const japaneseDisplay: Record<LevelId, string> = {
  A0: "Kana Starter",
  A1_1: "JLPT N5 Early",
  A1_2: "JLPT N5",
  A2_1: "JLPT N4 Early",
  A2_2: "JLPT N4",
  B1_1: "JLPT N3 Early",
  B1_2: "JLPT N3",
  B2: "JLPT N2"
};

export function getLevelDisplayName(levelCode: LevelId, learningLanguage: LanguageCode, nativeLanguage?: NativeLanguageCode): string {
  if (learningLanguage === "ja" && nativeLanguage === "vi") {
    const viDisplay: Record<LevelId, string> = {
      A0: "Nhập môn Kana",
      A1_1: "JLPT N5 sớm",
      A1_2: "JLPT N5",
      A2_1: "JLPT N4 sớm",
      A2_2: "JLPT N4",
      B1_1: "JLPT N3 sớm",
      B1_2: "JLPT N3",
      B2: "JLPT N2"
    };
    return viDisplay[levelCode];
  }
  if (learningLanguage === "ja") return japaneseDisplay[levelCode];
  return cefrDisplay[levelCode];
}
