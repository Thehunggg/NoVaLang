import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { courses } from "../data/fallbackCourses";
import type { AppProgress, ContentItem, DailyGoal, Exercise, ExperienceLevel, LanguageCode, Lesson, LevelDecisionAfterNicheChange, MicroLesson, NativeLanguageCode, PlacementResult, ReviewItem, VocabularyItem } from "../types/index";
import { firstIncompleteMicroLesson, isLessonCompletedFromMicroLessons, unlockNextLesson, unlockNextMicroLesson, unlockStartingPointFromPlacement } from "../utils/lessonEngine";
import { addXP as addXpPure, checkAchievements, getDueReviewItems, loseHeart as loseHeartPure, restoreHeart as restoreHeartPure, scheduleReviewItem, updateReviewAfterAnswer } from "../utils/progress";
import { getNativeLanguage, getProgress, resetProgress as resetStoredProgress, saveAppProgress, setNativeLanguage as saveNativeLanguage, setLearningLanguage } from "../utils/storage";
import { updateStreak } from "../utils/streak";

interface AppContextValue {
  progress: AppProgress;
  setNativeLanguage: (language: NativeLanguageCode) => void;
  getNativeLanguage: () => NativeLanguageCode;
  updateNativeLanguage: (language: NativeLanguageCode) => void;
  updateProfileInfo: (info: Partial<Pick<AppProgress, "displayName" | "ageRange" | "country" | "region" | "occupationStatus">>) => void;
  updateNiches: (selectedNiches: string[], primaryNiche: string | null, decision?: LevelDecisionAfterNicheChange) => void;
  finishOnboarding: (language: LanguageCode, level: AppProgress["selectedLevel"], goal: DailyGoal, profileInfo?: Partial<Pick<AppProgress, "displayName" | "ageRange" | "country" | "region" | "occupationStatus">>, nicheInfo?: { selectedNiches: string[]; primaryNiche: string | null }) => void;
  selectLanguage: (language: LanguageCode) => void;
  applyPlacement: (result: PlacementResult, startFromZero?: boolean) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  setCurrentMicroLesson: (microLessonId: string | null) => void;
  saveLessonStep: (lessonId: string, stepIndex: number) => void;
  completeMicroLesson: (micro: MicroLesson, lesson: Lesson, score: number, total: number) => { xpEarned: number; nextMicroLessonId: string | null; lessonCompleted: boolean; nextLessonId: string | null; dailyGoalRewarded: boolean };
  completeLesson: (lesson: Lesson, score: number, total: number) => { xpEarned: number; nextLessonId: string | null };
  addXP: (amount: number) => void;
  loseHeart: () => void;
  restoreHeart: () => void;
  completePractice: (score: number, total: number) => void;
  addMistake: (exercise: Exercise, lessonId: string) => void;
  markMistakeImproved: (exerciseId: string) => void;
  addFlashcard: (vocabulary: VocabularyItem, lessonId: string, language: LanguageCode) => void;
  removeFlashcard: (vocabularyId: string) => void;
  scheduleContentForReview: (items: ContentItem[], language: LanguageCode) => void;
  answerReviewItem: (reviewId: string, correct: boolean) => void;
  dueReviewItems: ReviewItem[];
  resetProgress: () => void;
  isLessonUnlocked: (lesson: Lesson) => boolean;
  isMicroLessonUnlocked: (lesson: Lesson, micro: MicroLesson) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);
const withAchievements = (progress: AppProgress): AppProgress => ({ ...progress, achievements: checkAchievements(progress) });
const withActivity = (progress: AppProgress): AppProgress => {
  const today = new Date().toISOString().slice(0, 10);
  const isNewDay = progress.lastActiveDate !== today;
  return {
    ...progress,
    ...updateStreak(progress.lastActiveDate, progress.streak),
    xpToday: isNewDay ? 0 : progress.xpToday,
    lessonsCompletedToday: isNewDay ? 0 : progress.lessonsCompletedToday,
    studyMinutesToday: isNewDay ? 0 : progress.studyMinutesToday
  };
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<AppProgress>(getProgress);
  useEffect(() => { saveAppProgress(progress); document.documentElement.lang = progress.effectiveUILanguage; document.documentElement.dir = "ltr"; }, [progress]);

  const value = useMemo<AppContextValue>(() => {
    const setNative = (nativeLanguage: NativeLanguageCode) => { const effectiveUILanguage = saveNativeLanguage(nativeLanguage); setProgress((current) => ({ ...current, nativeLanguage, uiLanguage: effectiveUILanguage, effectiveUILanguage })); };
    return {
      progress,
      setNativeLanguage: setNative,
      getNativeLanguage: () => progress.nativeLanguage,
      updateNativeLanguage: setNative,
      updateProfileInfo: (info) => setProgress((current) => ({ ...current, ...info })),
      updateNiches: (selectedNiches, primaryNiche, decision) => setProgress((current) => ({
        ...current,
        selectedNiches,
        primaryNiche,
        nicheUpdatedAt: new Date().toISOString(),
        levelDecisionAfterNicheChange: decision ?? current.levelDecisionAfterNicheChange
      })),
      finishOnboarding: (selectedLanguage, selectedLevel, dailyGoalMinutes, profileInfo, nicheInfo) => {
        setLearningLanguage(selectedLanguage);
        setProgress((current) => {
          const course = courses.find((item) => item.language === selectedLanguage)!;
          const firstLesson = course.levels.find((item) => item.id === selectedLevel)?.units[0]?.lessons[0] ?? course.levels[0].units[0].lessons[0];
          const starting = unlockStartingPointFromPlacement(course, { completed: true, score: 0, level: selectedLevel, date: new Date().toISOString(), startingUnitId: firstLesson.unitId, startingLessonId: firstLesson.id });
          const experienceLevel: ExperienceLevel = selectedLevel === "A0" || selectedLevel.startsWith("A1") ? "beginner" : selectedLevel.startsWith("A2") ? "elementary" : "intermediate";
          return {
            ...current,
            onboardingCompleted: true,
            ...profileInfo,
            selectedNiches: nicheInfo?.selectedNiches?.length ? nicheInfo.selectedNiches : current.selectedNiches,
            primaryNiche: nicheInfo?.primaryNiche ?? current.primaryNiche,
            selectedLanguage,
            learningLanguage: selectedLanguage,
            experienceLevel,
            dailyGoalMinutes,
            selectedLevel,
            currentLevel: selectedLevel,
            currentUnitId: starting.currentUnitId,
            currentLessonId: starting.unlockedLessonId,
            currentMicroLessonId: null,
            unlockedLessonIds: starting.unlockedLessonId && !current.unlockedLessonIds.includes(starting.unlockedLessonId) ? [...current.unlockedLessonIds, starting.unlockedLessonId] : current.unlockedLessonIds,
            placedLessonIds: starting.placedLessonIds
          };
        });
      },
      selectLanguage: (selectedLanguage) => { setLearningLanguage(selectedLanguage); setProgress((current) => ({ ...current, selectedLanguage, learningLanguage: selectedLanguage })); },
      applyPlacement: (incomingResult, startFromZero = false) => setProgress((current) => {
        const course = courses.find((item) => item.language === current.selectedLanguage)!;
        const firstLesson = course.levels[0].units[0].lessons[0];
        const result = startFromZero ? { ...incomingResult, level: "A0" as const, startingUnitId: firstLesson.unitId, startingLessonId: firstLesson.id } : incomingResult;
        const starting = unlockStartingPointFromPlacement(course, result);
        return { ...current, placementResult: result, selectedLevel: result.level, currentLevel: result.level, currentUnitId: starting.currentUnitId, currentLessonId: starting.unlockedLessonId, unlockedLessonIds: starting.unlockedLessonId && !current.unlockedLessonIds.includes(starting.unlockedLessonId) ? [...current.unlockedLessonIds, starting.unlockedLessonId] : current.unlockedLessonIds, placedLessonIds: starting.placedLessonIds };
      }),
      setCurrentLesson: (currentLessonId) => setProgress((current) => ({ ...current, currentLessonId })),
      setCurrentMicroLesson: (currentMicroLessonId) => setProgress((current) => ({ ...current, currentMicroLessonId })),
      saveLessonStep: (lessonId, currentStepIndex) => setProgress((current) => ({
        ...current,
        currentLessonId: lessonId,
        lessonSessions: {
          ...current.lessonSessions,
          [lessonId]: {
            lessonId,
            currentStepIndex,
            completedStepIds: current.lessonSessions[lessonId]?.completedStepIds ?? []
          }
        }
      })),
      completeMicroLesson: (micro, lesson, score, total) => {
        const newMicro = !progress.completedMicroLessonIds.includes(micro.id);
        const completedMicroIds = newMicro ? [...progress.completedMicroLessonIds, micro.id] : progress.completedMicroLessonIds;
        const lessonCompleted = isLessonCompletedFromMicroLessons(lesson, completedMicroIds);
        const newlyCompletedLesson = lessonCompleted && !progress.completedLessonIds.includes(lesson.id);
        const nextMicroLessonId = unlockNextMicroLesson(lesson, micro.id);
        const course = courses.find((item) => item.language === lesson.language)!;
        const nextLessonId = newlyCompletedLesson ? unlockNextLesson(course, lesson.id) : null;
        const perfect = score === total;
        const xpEarned = (newMicro ? micro.xpReward : 2) + (newlyCompletedLesson ? 15 : 0);
        const today = new Date().toISOString().slice(0, 10);
        const dailyGoalRewarded = progress.studyMinutesToday + (newMicro ? micro.estimatedMinutes : 0) >= progress.dailyGoalMinutes && progress.dailyGoalRewardClaimedDate !== today;
        setProgress((current) => {
          let next = addXpPure(withActivity(current), xpEarned);
          let reviewItems = next.reviewItems;
          micro.contentItems.forEach((item) => { reviewItems = scheduleReviewItem(reviewItems, item, lesson.language); });
          const studyMinutesToday = next.studyMinutesToday + (newMicro ? micro.estimatedMinutes : 0);
          const sessionCompletedIds = next.lessonSessions[lesson.id]?.completedStepIds ?? [];
          next = {
            ...next, reviewItems,
            studyMinutesToday,
            hearts: dailyGoalRewarded ? Math.min(5, next.hearts + 1) : next.hearts,
            dailyGoalRewardClaimedDate: dailyGoalRewarded ? today : next.dailyGoalRewardClaimedDate,
            completedMicroLessonIds: next.completedMicroLessonIds.includes(micro.id) ? next.completedMicroLessonIds : [...next.completedMicroLessonIds, micro.id],
            completedLessonIds: newlyCompletedLesson && !next.completedLessonIds.includes(lesson.id) ? [...next.completedLessonIds, lesson.id] : next.completedLessonIds,
            unlockedLessonIds: nextLessonId && !next.unlockedLessonIds.includes(nextLessonId) ? [...next.unlockedLessonIds, nextLessonId] : next.unlockedLessonIds,
            perfectLessonIds: newlyCompletedLesson && perfect && !next.perfectLessonIds.includes(lesson.id) ? [...next.perfectLessonIds, lesson.id] : next.perfectLessonIds,
            lessonsCompletedToday: next.lessonsCompletedToday + (newlyCompletedLesson ? 1 : 0),
            currentLessonId: nextLessonId ?? lesson.id,
            currentMicroLessonId: nextMicroLessonId,
            currentLevel: nextLessonId ? course.units.flatMap((unit) => unit.lessons).find((item) => item.id === nextLessonId)?.levelId ?? lesson.levelId : lesson.levelId,
            currentUnitId: nextLessonId ? course.units.flatMap((unit) => unit.lessons).find((item) => item.id === nextLessonId)?.unitId ?? lesson.unitId : lesson.unitId,
            lessonSessions: {
              ...next.lessonSessions,
              [lesson.id]: {
                lessonId: lesson.id,
                currentStepIndex: Math.min(micro.order, lesson.microLessons.length - 1),
                completedStepIds: sessionCompletedIds.includes(micro.id) ? sessionCompletedIds : [...sessionCompletedIds, micro.id],
                completedAt: lessonCompleted ? new Date().toISOString() : undefined
              }
            }
          };
          return withAchievements(next);
        });
        return { xpEarned, nextMicroLessonId, lessonCompleted, nextLessonId, dailyGoalRewarded };
      },
      completeLesson: (lesson, score, total) => {
        const course = courses.find((item) => item.language === lesson.language)!;
        const nextLessonId = unlockNextLesson(course, lesson.id);
        const xpEarned = 15 + (score === total ? 5 : 0);
        setProgress((current) => withAchievements(addXpPure(current, xpEarned)));
        return { xpEarned, nextLessonId };
      },
      addXP: (amount) => setProgress((current) => withAchievements(addXpPure(withActivity(current), amount))),
      loseHeart: () => setProgress((current) => loseHeartPure(current)),
      restoreHeart: () => setProgress((current) => restoreHeartPure(current)),
      completePractice: (score, total) => setProgress((current) => { const xp = Math.max(5, Math.round((score / Math.max(1, total)) * 15)); const next = { ...restoreHeartPure(addXpPure(withActivity(current), xp)), completedPracticeCount: current.completedPracticeCount + 1 }; return withAchievements(next); }),
      addMistake: (exercise, lessonId) => setProgress((current) => { const existing = current.mistakes.find((item) => item.exercise.id === exercise.id); const mistakes = existing ? current.mistakes.map((item) => item.exercise.id === exercise.id ? { ...item, attempts: item.attempts + 1, improved: false } : item) : [{ exercise, lessonId, attempts: 1, createdAt: new Date().toISOString(), improved: false }, ...current.mistakes]; return { ...current, mistakes }; }),
      markMistakeImproved: (exerciseId) => setProgress((current) => ({ ...current, mistakes: current.mistakes.map((item) => item.exercise.id === exerciseId ? { ...item, improved: true } : item), improvedMistakeIds: current.improvedMistakeIds.includes(exerciseId) ? current.improvedMistakeIds : [...current.improvedMistakeIds, exerciseId] })),
      addFlashcard: (vocabulary, lessonId, language) => setProgress((current) => current.savedFlashcards.some((card) => card.id === vocabulary.id) ? current : withAchievements({ ...current, savedFlashcards: [...current.savedFlashcards, { ...vocabulary, lessonId, language, savedAt: new Date().toISOString() }] })),
      removeFlashcard: (vocabularyId) => setProgress((current) => ({ ...current, savedFlashcards: current.savedFlashcards.filter((card) => card.id !== vocabularyId) })),
      scheduleContentForReview: (items, language) => setProgress((current) => { let reviewItems = current.reviewItems; items.forEach((item) => { reviewItems = scheduleReviewItem(reviewItems, item, language); }); return { ...current, reviewItems }; }),
      answerReviewItem: (reviewId, correct) => setProgress((current) => ({ ...current, reviewItems: current.reviewItems.map((item) => item.id === reviewId ? updateReviewAfterAnswer(item, correct) : item) })),
      dueReviewItems: getDueReviewItems(progress.reviewItems),
      resetProgress: () => setProgress(resetStoredProgress()),
      isLessonUnlocked: (lesson) => progress.unlockedLessonIds.includes(lesson.id) || progress.completedLessonIds.includes(lesson.id) || progress.placedLessonIds.includes(lesson.id),
      isMicroLessonUnlocked: (lesson, micro) => micro.order === 1 || progress.completedMicroLessonIds.includes(micro.id) || lesson.microLessons.slice(0, micro.order - 1).every((item) => progress.completedMicroLessonIds.includes(item.id))
    };
  }, [progress]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => { const context = useContext(AppContext); if (!context) throw new Error("useApp must be used inside AppProvider"); return context; };

