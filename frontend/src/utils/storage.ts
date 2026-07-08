import { nativeLanguages } from "../data/nativeLanguages";
import { getEffectiveUILanguage, isUISupportedForNativeLanguage } from "../i18n/translations";
import type { AppProgress, LanguageCode, NativeLanguage, NativeLanguageCode, SupportedUILanguage } from "../types/index";
import { levelOrder } from "../../../shared/levelDisplay";

const APP_STORAGE_KEY = "novalang-progress-v3";
const OLD_STORAGE_KEY = "linguaquest-ai-progress-v2";
const NATIVE_LANGUAGE_KEY = "nativeLanguage";
const UI_LANGUAGE_KEY = "effectiveUILanguage";
const LEARNING_LANGUAGE_KEY = "learningLanguage";

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
export const getLearningLanguage = (): LanguageCode => { try { return normalizeLearningLanguage(localStorage.getItem(LEARNING_LANGUAGE_KEY)); } catch { return "en"; } };
export const setLearningLanguage = (language: LanguageCode): void => { try { localStorage.setItem(LEARNING_LANGUAGE_KEY, language); } catch { /* In-memory state remains functional. */ } };

export const initialAppProgress: AppProgress = {
  nativeLanguage: "en", effectiveUILanguage: "en", learningLanguage: "en",
  onboardingCompleted: false, selectedLanguage: "en", experienceLevel: "beginner",
  selectedLevel: "A0", currentLevel: "A0", currentUnitId: null, dailyGoalMinutes: 10, placementResult: null,
  totalXp: 0, xpToday: 0, streak: 0, lastActiveDate: null, hearts: 5,
  completedLessonIds: [], completedMicroLessonIds: [],
  unlockedLessonIds: ["en-a0-u1-l1", "ja-a0-u1-l1", "es-a0-u1-l1"], placedLessonIds: [],
  currentLessonId: null, currentMicroLessonId: null, reviewItems: [], mistakes: [], improvedMistakeIds: [],
  savedFlashcards: [], achievements: [], perfectLessonIds: [], completedPracticeCount: 0, lessonsCompletedToday: 0
};

export const getProgress = (): AppProgress => {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY) ?? localStorage.getItem(OLD_STORAGE_KEY);
    const value = raw ? JSON.parse(raw) as Partial<AppProgress> & { selectedLanguage?: string; learningLanguage?: string } : {};
    const nativeLanguage = getNativeLanguage();
    const effectiveUILanguage = getEffectiveUILanguage(nativeLanguage);
    const learningLanguage = normalizeLearningLanguage(value.learningLanguage ?? value.selectedLanguage ?? localStorage.getItem(LEARNING_LANGUAGE_KEY));
    const today = new Date().toISOString().slice(0, 10);
    return {
      ...initialAppProgress, ...value, nativeLanguage, effectiveUILanguage, learningLanguage, selectedLanguage: learningLanguage,
      selectedLevel: normalizeLevel(value.selectedLevel),
      currentLevel: normalizeLevel(value.currentLevel),
      xpToday: value.lastActiveDate === today ? value.xpToday ?? 0 : 0,
      lessonsCompletedToday: value.lastActiveDate === today ? value.lessonsCompletedToday ?? 0 : 0,
      completedMicroLessonIds: value.completedMicroLessonIds ?? [], reviewItems: value.reviewItems ?? [], placedLessonIds: value.placedLessonIds ?? []
    };
  } catch {
    const nativeLanguage = getNativeLanguage(); const learningLanguage = getLearningLanguage();
    return { ...initialAppProgress, nativeLanguage, effectiveUILanguage: getEffectiveUILanguage(nativeLanguage), learningLanguage, selectedLanguage: learningLanguage };
  }
};

export const saveAppProgress = (progress: AppProgress): void => {
  try { localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(progress)); } catch { /* Keep session state working. */ }
  setNativeLanguage(progress.nativeLanguage); setLearningLanguage(progress.learningLanguage);
};

export const resetProgress = (): AppProgress => {
  const nativeLanguage = getNativeLanguage(); const effectiveUILanguage = getEffectiveUILanguage(nativeLanguage); const learningLanguage = getLearningLanguage();
  try { localStorage.removeItem(APP_STORAGE_KEY); localStorage.removeItem(OLD_STORAGE_KEY); } catch { /* No-op. */ }
  return { ...initialAppProgress, nativeLanguage, effectiveUILanguage, learningLanguage, selectedLanguage: learningLanguage };
};
