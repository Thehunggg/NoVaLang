export type {
  ContentItem, Course, CourseLevel, DialogueLine, Difficulty, ExampleSentence, ExamLevel, ExamTrack, ExamTrackOption, Exercise, ExerciseType,
  GrammarPoint, Language, LanguageCode, Lesson, LessonExample, LessonType, LevelId, LocalizedAnswers, LocalizedText, MatchPair, MicroLesson,
  LearningLanguageCode, MistakeRecord, NativeLanguage, NativeLanguageCode, PlacementQuestion, PlacementResult, PracticeSet,
  PronunciationItem, QuizQuestion, ReviewedStatus, ReviewItem, SavedFlashcard, SupportedUILanguage, TrackSkill, TrackType, Unit, VocabularyItem
} from "../../../shared/types";

import type { LanguageCode, LevelId, MistakeRecord, NativeLanguageCode, PlacementResult, ReviewItem, SavedFlashcard, SupportedUILanguage } from "../../../shared/types";
export type DailyGoal = 5 | 10 | 20;
export type ExperienceLevel = "beginner" | "elementary" | "intermediate";

export interface AppProgress {
  nativeLanguage: NativeLanguageCode;
  effectiveUILanguage: SupportedUILanguage;
  learningLanguage: LanguageCode;
  onboardingCompleted: boolean;
  selectedLanguage: LanguageCode;
  experienceLevel: ExperienceLevel;
  selectedLevel: LevelId;
  currentLevel: LevelId;
  currentUnitId: string | null;
  dailyGoalMinutes: DailyGoal;
  placementResult: PlacementResult | null;
  totalXp: number;
  xpToday: number;
  streak: number;
  lastActiveDate: string | null;
  hearts: number;
  completedLessonIds: string[];
  completedMicroLessonIds: string[];
  unlockedLessonIds: string[];
  placedLessonIds: string[];
  currentLessonId: string | null;
  currentMicroLessonId: string | null;
  reviewItems: ReviewItem[];
  mistakes: MistakeRecord[];
  improvedMistakeIds: string[];
  savedFlashcards: SavedFlashcard[];
  achievements: string[];
  perfectLessonIds: string[];
  completedPracticeCount: number;
  lessonsCompletedToday: number;
}
