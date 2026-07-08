import type { AppProgress, ContentItem, LanguageCode, ReviewItem } from "../types/index";

export const addXP = (progress: AppProgress, amount: number): AppProgress => ({ ...progress, totalXp: progress.totalXp + amount, xpToday: progress.xpToday + amount });
export const loseHeart = (progress: AppProgress): AppProgress => ({ ...progress, hearts: Math.max(0, progress.hearts - 1) });
export const restoreHeart = (progress: AppProgress): AppProgress => ({ ...progress, hearts: Math.min(5, progress.hearts + 1) });

const itemDetails = (item: ContentItem) => item.kind === "vocabulary" ? { itemType: "vocabulary" as const, label: item.displayText ?? item.word, meaning: item.meaning, meaningTranslations: item.meanings, speechText: item.speechText ?? item.reading ?? item.kana ?? item.word } : item.kind === "pronunciation" ? { itemType: "pronunciation" as const, label: item.symbol, meaning: item.pronunciation, meaningTranslations: { en: [item.pronunciation], vi: [item.pronunciation], ja: [item.pronunciation], es: [item.pronunciation] }, speechText: item.speechText ?? item.reading ?? item.kana ?? item.symbol } : item.kind === "grammar" ? { itemType: "grammar" as const, label: item.pattern, meaning: item.explanation, speechText: item.pattern } : { itemType: "sentence" as const, label: item.text, meaning: item.translation, speechText: item.speechText ?? item.text };

export const scheduleReviewItem = (current: ReviewItem[], item: ContentItem, language: LanguageCode): ReviewItem[] => {
  if (current.some((review) => review.itemId === item.id)) return current;
  const details = itemDetails(item);
  return [...current, { id: `review-${item.id}`, language, itemId: item.id, ...details, easeScore: 2.5, correctCount: 0, wrongCount: 0, nextReviewAt: new Date().toISOString(), intervalDays: 0 }];
};

export const updateReviewAfterAnswer = (item: ReviewItem, correct: boolean): ReviewItem => {
  const correctCount = item.correctCount + (correct ? 1 : 0);
  const intervalDays = correct ? correctCount >= 3 ? 7 : correctCount === 2 ? 3 : 1 : 0;
  const next = new Date();
  next.setDate(next.getDate() + intervalDays);
  return { ...item, correctCount, wrongCount: item.wrongCount + (correct ? 0 : 1), easeScore: Math.max(1.3, item.easeScore + (correct ? 0.1 : -0.25)), lastReviewedAt: new Date().toISOString(), nextReviewAt: next.toISOString(), intervalDays };
};

export const getDueReviewItems = (items: ReviewItem[]): ReviewItem[] => items.filter((item) => new Date(item.nextReviewAt).getTime() <= Date.now());

export const checkAchievements = (progress: AppProgress): string[] => {
  const earned = new Set(progress.achievements);
  if (progress.completedLessonIds.length) earned.add("first-lesson");
  if (progress.streak >= 3) earned.add("three-day-streak");
  if (progress.totalXp >= 100) earned.add("hundred-xp");
  if (progress.perfectLessonIds.length) earned.add("first-perfect");
  if (progress.savedFlashcards.length >= 10) earned.add("ten-flashcards");
  if (progress.completedPracticeCount) earned.add("first-practice");
  return [...earned];
};
