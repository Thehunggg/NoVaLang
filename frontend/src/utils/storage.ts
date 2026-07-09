import { nativeLanguages } from "../data/nativeLanguages";
import { getEffectiveUILanguage, isUISupportedForNativeLanguage } from "../i18n/translations";
import type { AppProgress, LanguageCode, NativeLanguage, NativeLanguageCode, SupportedUILanguage } from "../types/index";
import { levelOrder } from "../../../shared/levelDisplay";

const APP_STORAGE_KEY = "novalang-progress-v3";
const OLD_STORAGE_KEY = "linguaquest-ai-progress-v2";
const NATIVE_LANGUAGE_KEY = "nativeLanguage";
const UI_LANGUAGE_KEY = "effectiveUILanguage";
const LEARNING_LANGUAGE_KEY = "learningLanguage";
export const CONTENT_VERSION = "cross-platform-onboarding-v4";

export { getEffectiveUILanguage, isUISupportedForNativeLanguage };

export const getNativeLanguage = (): NativeLanguageCode => {
  try { return localStorage.getItem(NATIVE_LANGUAGE_KEY)?.trim() || "en"; } catch { return "en"; }
};

export const getNativeLanguageInfo = (code = getNativeLanguage()): NativeLanguage =>
  nativeLanguages.find((language) => language.code === code) ?? nativeLanguages.find((language) => language.code === "en")!;

export const setNativeLanguage = (language: NativeLanguageCode): SupportedUILanguage => {
  const effectiveUILanguage = getEffectiveUILanguage(language);
  try {
    localStorage.setItem(NATIVE_LANGUAGE_KEY, language);
    localStorage.setItem(UI_LANGUAGE_KEY, effectiveUILanguage);
  } catch { /* React state remains functional when storage is unavailable. */ }
  return effectiveUILanguage;
};

export const updateNativeLanguage = setNativeLanguage;

const normalizeLearningLanguage = (value?: string | null): LanguageCode => value === "ja" || value === "japanese" ? "ja" : value === "es" || value === "spanish" ? "es" : "en";
const normalizeLevel = (value?: string | null) => levelOrder.includes(value as AppProgress["currentLevel"]) ? value as AppProgress["currentLevel"] : "A0";

const nicheLegacyIdMap: Record<string, string> = {
  everyday: "daily_life",
  travel: "travel_hotel",
  shopping: "restaurant_food_service",
  culture: "daily_life",
  social: "daily_life",
  jlpt: "daily_life",
  toeic: "daily_life",
  ielts: "daily_life",
  toefl: "daily_life",
  other_exams: "daily_life",
  business: "business_office",
  it: "it_programming",
  engineering: "manufacturing_engineering",
  ai_data: "ai_data_analytics",
  healthcare: "healthcare",
};

const normalizeNicheId = (value?: string | null) => {
  if (!value) return "daily_life";
  return nicheLegacyIdMap[value] ?? value;
};

const normalizeNicheList = (values?: string[] | null) => {
  const mapped = [...new Set((values ?? []).map(normalizeNicheId))];
  return mapped.length ? mapped : ["daily_life"];
};
export const getLearningLanguage = (): LanguageCode => { try { return normalizeLearningLanguage(localStorage.getItem(LEARNING_LANGUAGE_KEY)); } catch { return "en"; } };
export const setLearningLanguage = (language: LanguageCode): void => { try { localStorage.setItem(LEARNING_LANGUAGE_KEY, language); } catch { /* In-memory state remains functional. */ } };

export const initialAppProgress: AppProgress = {
  contentVersion: CONTENT_VERSION,
  displayName: "", ageRange: "", country: "", region: "", occupationStatus: "",
  nativeLanguage: "en", uiLanguage: "en", effectiveUILanguage: "en", learningLanguage: "en",
  selectedNiches: ["daily_life"], primaryNiche: "daily_life", nicheUpdatedAt: null, levelDecisionAfterNicheChange: null,
  onboardingCompleted: false, selectedLanguage: "en", experienceLevel: "beginner",
  selectedLevel: "A0", currentLevel: "A0", currentUnitId: null, dailyGoalMinutes: 10, placementResult: null,
  totalXp: 0, xpToday: 0, streak: 0, lastActiveDate: null, hearts: 5,
  completedLessonIds: [], completedMicroLessonIds: [],
  unlockedLessonIds: ["en-a0-u1-l1", "ja-a0-u1-l1", "es-a0-u1-l1"], placedLessonIds: [],
  currentLessonId: null, currentMicroLessonId: null, reviewItems: [], mistakes: [], improvedMistakeIds: [],
  savedFlashcards: [], achievements: [], perfectLessonIds: [], completedPracticeCount: 0, lessonsCompletedToday: 0,
  studyMinutesToday: 0, dailyGoalRewardClaimedDate: null, lessonSessions: {}
};

export const getProgress = (): AppProgress => {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY) ?? localStorage.getItem(OLD_STORAGE_KEY);
    const value = raw ? JSON.parse(raw) as Partial<AppProgress> & { selectedLanguage?: string; learningLanguage?: string } : {};
    const nativeLanguage = getNativeLanguage();
    const effectiveUILanguage = getEffectiveUILanguage(nativeLanguage);
    const learningLanguage = normalizeLearningLanguage(value.learningLanguage ?? value.selectedLanguage ?? localStorage.getItem(LEARNING_LANGUAGE_KEY));
    const staleContent = value.contentVersion !== CONTENT_VERSION;
    const today = new Date().toISOString().slice(0, 10);
    return {
      ...initialAppProgress, ...value, contentVersion: CONTENT_VERSION, nativeLanguage, uiLanguage: effectiveUILanguage, effectiveUILanguage, learningLanguage, selectedLanguage: learningLanguage,
      displayName: value.displayName ?? "",
      ageRange: value.ageRange ?? "",
      country: value.country ?? "",
      region: value.region ?? "",
      occupationStatus: value.occupationStatus ?? "",
      selectedNiches: normalizeNicheList(value.selectedNiches),
      primaryNiche: normalizeNicheId(value.primaryNiche ?? value.selectedNiches?.[0]),
      nicheUpdatedAt: value.nicheUpdatedAt ?? null,
      levelDecisionAfterNicheChange: value.levelDecisionAfterNicheChange ?? null,
      selectedLevel: normalizeLevel(value.selectedLevel),
      currentLevel: normalizeLevel(value.currentLevel),
      xpToday: value.lastActiveDate === today ? value.xpToday ?? 0 : 0,
      lessonsCompletedToday: value.lastActiveDate === today ? value.lessonsCompletedToday ?? 0 : 0,
      studyMinutesToday: value.lastActiveDate === today ? value.studyMinutesToday ?? 0 : 0,
      dailyGoalRewardClaimedDate: value.dailyGoalRewardClaimedDate ?? null,
      lessonSessions: value.lessonSessions ?? {},
      completedMicroLessonIds: value.completedMicroLessonIds ?? [],
      reviewItems: value.reviewItems ?? [],
      placedLessonIds: value.placedLessonIds ?? [],
      currentMicroLessonId: staleContent ? null : value.currentMicroLessonId ?? null,
      mistakes: staleContent ? [] : value.mistakes ?? []
    };
  } catch {
    const nativeLanguage = getNativeLanguage(); const learningLanguage = getLearningLanguage();
    const effectiveUILanguage = getEffectiveUILanguage(nativeLanguage);
    return { ...initialAppProgress, nativeLanguage, uiLanguage: effectiveUILanguage, effectiveUILanguage, learningLanguage, selectedLanguage: learningLanguage };
  }
};

export const saveAppProgress = (progress: AppProgress): void => {
  try { localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(progress)); } catch { /* Keep session state working. */ }
  setNativeLanguage(progress.nativeLanguage); setLearningLanguage(progress.learningLanguage);
};

export const resetProgress = (): AppProgress => {
  const nativeLanguage = getNativeLanguage(); const effectiveUILanguage = getEffectiveUILanguage(nativeLanguage); const learningLanguage = getLearningLanguage();
  try { localStorage.removeItem(APP_STORAGE_KEY); localStorage.removeItem(OLD_STORAGE_KEY); } catch { /* No-op. */ }
  return { ...initialAppProgress, nativeLanguage, uiLanguage: effectiveUILanguage, effectiveUILanguage, learningLanguage, selectedLanguage: learningLanguage };
};
