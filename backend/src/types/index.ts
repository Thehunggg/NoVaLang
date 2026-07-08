export type {
  Language,
  LanguageCode,
  Lesson,
  LessonExample,
  PracticeSet,
  QuizQuestion,
  VocabularyItem
} from "../../../shared/types.js";

export interface ApiError extends Error {
  status?: number;
}
