export type {
  Language, LanguageCode, LearningLanguageCode, Lesson, LessonExample, NativeLanguage,
  NativeLanguageCode, PracticeSet, QuizQuestion, SavedFlashcard, SupportedUILanguage, VocabularyItem
} from "../../shared/types";

import type { LearningLanguageCode, SavedFlashcard, SupportedUILanguage } from "../../shared/types";

export interface UserProgress {
  nativeLanguage: string;
  effectiveUILanguage: SupportedUILanguage;
  learningLanguage: LearningLanguageCode;
  level: string;
  dailyGoal: string;
  totalXP: number;
  streak: number;
  hearts: number;
  completedLessons: string[];
  unlockedLessons: string[];
  flashcards: SavedFlashcard[];
}
