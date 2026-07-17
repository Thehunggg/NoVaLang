export type LearningLanguageCode = "en" | "ja";
export type LanguageCode = LearningLanguageCode;
export type SupportedUILanguage = "en" | "vi" | "ja" | "es";
export type NativeMeaningLanguage = "vi" | "en" | "ja" | "ko" | "zh";
export type NativeLanguageCode = string;
export type LevelId = "A0" | "A1_1" | "A1_2" | "A2_1" | "A2_2" | "B1_1" | "B1_2" | "B2";
export type LessonType = "pronunciation" | "vocabulary" | "grammar" | "dialogue" | "review" | "checkpoint" | "culture" | "speaking_placeholder" | "listening_placeholder";
export type Difficulty = "easy" | "medium" | "hard";
export type ExerciseType = "multiple_choice" | "translation" | "fill_blank" | "match_pairs" | "sentence_builder" | "choose_correct_sound" | "choose_correct_letter" | "choose_word_starting_with_letter" | "match_character_to_pronunciation" | "listening_placeholder" | "speaking_placeholder" | "dialogue_choice" | "choose_correct_reading" | "choose_word_starting_with_kana" | "match_kana_reading" | "choose_meaning" | "type_meaning" | "match_vocab_meaning" | "choose_correct_sentence" | "translate_sentence" | "read_short_sentence" | "answer_question" | "choose_summary" | "listen_and_choose_meaning" | "listen_and_choose_sentence" | "character_card" | "fill_missing_character" | "sound_to_character" | "next_in_sequence" | "choose_correct_pair" | "plus_listening_vocabulary_challenge";
export type TrackType = "exam" | "general";
export type ExamTrack =
  | "JLPT"
  | "JFT-Basic"
  | "BJT"
  | "TOEIC"
  | "IELTS"
  | "TOEFL"
  | "EIKEN"
  | "TOPIK"
  | "HSK"
  | "DELF"
  | "DALF"
  | "Goethe"
  | "TestDaF"
  | "telc"
  | "DELE"
  | "SIELE";
export type ExamLevel =
  | "KANA_STARTER"
  | "JLPT"
  | "JLPT_N5"
  | "JLPT_N4"
  | "JLPT_N3"
  | "JLPT_N2"
  | "JLPT_N1"
  | "GENERAL_ENGLISH"
  | "GENERAL_SPANISH"
  | "TOEIC"
  | "IELTS"
  | "TOEFL"
  | "EIKEN"
  | "TOPIK"
  | "HSK"
  | "DELF"
  | "DALF"
  | "GOETHE"
  | "TESTDAF"
  | "TELC"
  | "DELE"
  | "DELE_A1"
  | "DELE_A2"
  | "DELE_B1"
  | "DELE_B2";
export type TrackSkill = "kana" | "vocabulary" | "kanji" | "grammar" | "reading" | "listening" | "mock_test" | "mistake_review" | "speaking" | "general";
export type ReviewedStatus = "reviewed" | "draft" | "needs_review";
export type LocalizedText = string | Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
export type LocalizedAnswers = Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string[]>>;

export interface NativeLanguage { code: string; name: string; nativeName: string; flagEmoji: string; region?: string; direction?: "ltr" | "rtl"; uiSupported: boolean; }
export interface Language { code: LanguageCode; name: string; nativeName: string; flag: string; color: string; greeting: string; description: string; }
export interface ExampleSentence {
  text: string;
  translation: string;
  note?: string;
  reading?: string;
  speechText?: string;
  translationTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
}
export type LessonExample = ExampleSentence;
export interface MatchPair { left: string; right: string; }

/** Trial-only exercise schema for the approved five-card Japanese Lesson 1. */
export interface FiveCardPracticeOption {
  id: string;
  text: string;
  canonicalText?: string;
  audioText?: string;
}
export interface FiveCardPracticeToken extends FiveCardPracticeOption {}
/** Explicit locale/culture character contract; names are never inferred. */
export interface FiveCardCharacterName {
  id: string;
  displayName: string;
  canonicalName: string;
  audioName: string;
}
export interface FiveCardCharacterContext {
  targetLanguage: LearningLanguageCode;
  targetLocale: string;
  cultureContext: string;
  approvedCharacterNamePool: FiveCardCharacterName[];
}
export interface FiveCardPracticeAnswerSlot {
  id: string;
  expectedTokenId: string;
  afterText?: string;
}
export interface FiveCardChatSlot {
  id: string;
  displayText: string;
  canonicalText: string;
  audioText: string;
  acceptedAnswers: string[];
}
export interface FiveCardChatMessageSegment {
  displayText?: string;
  canonicalText?: string;
  audioText?: string;
  slotId?: string;
}
export interface FiveCardChatMessage {
  id: string;
  speakerId: string;
  segments: FiveCardChatMessageSegment[];
}
export interface FiveCardChatExercise {
  timestamp: string;
  context: string;
  speakers: { id: string; label: string; alignment: 'left' | 'right' }[];
  messages: FiveCardChatMessage[];
}
export interface FiveCardPracticeExercise {
  id: string;
  order: number;
  plan: 'free' | 'plus';
  type: string;
  prompt: string;
  maxCycles?: number;
  options?: FiveCardPracticeOption[];
  correctOptionId?: string;
  tokens?: FiveCardPracticeToken[];
  answerSlots?: FiveCardPracticeAnswerSlot[];
  correctTokenIds?: string[];
  unusedTokenIds?: string[];
  subQuestions?: FiveCardPracticeExercise[];
  chat?: FiveCardChatExercise;
  slots?: FiveCardChatSlot[];
}
export interface FiveCardPractice {
  title: string;
  japaneseTitle: string;
  totalQuestions: 14;
  estimatedMinutes: string;
  reviewTopics?: string;
  groups?: {
    id: string;
    number?: string;
    title: string;
    range?: string;
    details?: string;
    badge?: string;
    start?: number;
    end?: number;
    plan: 'free' | 'plus';
  }[];
  exercises: FiveCardPracticeExercise[];
}
export type FiveCardContent = Record<string, unknown> &
  Partial<FiveCardCharacterContext> & {
  practice?: FiveCardPractice;
};

export interface LearnCard {
  id: string;
  character: string;
  reading: string;
  displayText?: string;
  speechText: string;
  example: string;
  exampleReading?: string;
  exampleRomanization?: string;
  exampleSpeechText?: string;
  meaningByNative?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  meaningVi?: string;
  audioCardLabelByNative?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  feedbackByNative?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
}

export interface ExerciseSubQuestion {
  id: string;
  question: string;
  questionTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  audioText: string;
  audioLabel?: string;
  audioLabelTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  hideAudioText?: boolean;
  visibleBeforeAnswer?: string;
  visibleBeforeAnswerTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  options: string[];
  optionTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string[]>>;
  correctAnswer: string;
  acceptedAnswers?: LocalizedAnswers;
  revealAfterAnswer?: string;
  revealAfterAnswerTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  feedbackCorrectTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  feedbackWrongTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  level: LevelId;
  question: string;
  options?: string[];
  pairs?: MatchPair[];
  words?: string[];
  audioText?: string;
  audioLabel?: string;
  audioLabelTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  hideAudioText?: boolean;
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  targetLanguage: LanguageCode;
  nativeTranslation: string;
  difficulty: Difficulty;
  relatedIds?: string[];
  relatedVocabularyIds?: string[];
  relatedGrammarIds?: string[];
  relatedPronunciationIds?: string[];
  nativeLanguageMode?: boolean;
  targetKana?: string;
  matchPairMode?: "kana_reading" | "vocabulary_meaning";
  trackType?: TrackType;
  examTrack?: ExamTrack;
  examLevel?: ExamLevel;
  skill?: TrackSkill;
  reviewedStatus?: ReviewedStatus;
  acceptedAnswers?: LocalizedAnswers;
  meanings?: LocalizedAnswers;
  /** When true, answer compare uses locale lower-case. Default false. */
  caseInsensitive?: boolean;
  /** When true, strip common punctuation before compare. Default false. */
  ignorePunctuation?: boolean;
  /** Reserved; default "any" — do not filter answer scripts. */
  allowedScript?: "any" | "latin" | "kana" | "kanji" | "hangul" | "hanzi" | "arabic" | "thai" | "devanagari" | "cyrillic";
  questionTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  optionTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string[]>>;
  pairTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, MatchPair[]>>;
  explanationTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  hintTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  cards?: LearnCard[];
  subQuestions?: ExerciseSubQuestion[];
  revealAfterAnswer?: string;
  revealAfterAnswerTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  feedbackCorrectTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  feedbackWrongTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
}

export interface PronunciationItem {
  kind: "pronunciation";
  id: string;
  symbol: string;
  pronunciation: string;
  exampleWord: string;
  meaning: string;
  exampleSentence: string;
  sentenceTranslation: string;
  note?: string;
  practice?: Exercise;
  displayText?: string;
  reading?: string;
  kanji?: string;
  kana?: string;
  speechText?: string;
  meanings?: LocalizedAnswers;
  exampleDisplay?: string;
  exampleSpeechText?: string;
  exampleTranslations?: Partial<Record<SupportedUILanguage, string>>;
}

export interface VocabularyItem {
  kind: "vocabulary";
  id: string;
  word: string;
  reading?: string;
  pronunciation?: string;
  meaning: string;
  exampleSentence: string;
  sentenceTranslation: string;
  tags?: string[];
  term: string;
  translation: string;
  example: string;
  target?: string;
  displayText?: string;
  kanji?: string;
  kana?: string;
  speechText?: string;
  partOfSpeech?: string;
  meanings?: LocalizedAnswers;
  acceptedAnswers?: LocalizedAnswers;
  exampleText?: string;
  exampleReading?: string;
  exampleRomanization?: string;
  exampleDisplay?: string;
  exampleSpeechText?: string;
  exampleTranslations?: Partial<Record<SupportedUILanguage, string>>;
  note?: string;
}

export interface GrammarPoint {
  kind: "grammar";
  id: string;
  title: string;
  pattern: string;
  explanation: string;
  examples: ExampleSentence[];
  explanationTranslations?: Partial<Record<SupportedUILanguage, string>>;
}

export interface DialogueLine {
  kind: "dialogue";
  id: string;
  speaker: string;
  text: string;
  translation: string;
  audioPlaceholder?: string;
  speechText?: string;
  translations?: Partial<Record<SupportedUILanguage, string>>;
  reading?: string;
}

export type ContentItem = PronunciationItem | VocabularyItem | GrammarPoint | DialogueLine;

export interface MicroLesson {
  id: string;
  lessonId: string;
  title: string;
  objective: string;
  explanation: string;
  contentItems: ContentItem[];
  exercises: Exercise[];
  xpReward: number;
  order: number;
  estimatedMinutes: number;
  unlockStatus: "locked" | "available";
  titleTranslations?: Partial<Record<SupportedUILanguage, string>>;
  objectiveTranslations?: Partial<Record<SupportedUILanguage, string>>;
  explanationTranslations?: Partial<Record<SupportedUILanguage, string>>;
}

export interface QuizQuestion { id: string; prompt: string; options: string[]; correctAnswer: string; explanation: string; wrongAnswerExplanation: string; }

export interface Lesson {
  id: string;
  lessonFormat?: "five_cards";
  fiveCardContent?: FiveCardContent;
  language: LanguageCode;
  levelId: LevelId;
  unitId: string;
  type: LessonType;
  title: string;
  objective: string;
  canDo: string;
  description: string;
  microLessons: MicroLesson[];
  pronunciationItems?: PronunciationItem[];
  vocabulary: VocabularyItem[];
  grammarPoints?: GrammarPoint[];
  dialogue?: DialogueLine[];
  examples: ExampleSentence[];
  exercises: Exercise[];
  xpReward: number;
  order: number;
  unlockRule?: string;
  requiredHearts: number;
  durationMinutes: number;
  level: "Beginner" | "Elementary" | "Intermediate" | "Upper Intermediate";
  subtitle: string;
  explanation: string;
  quiz: QuizQuestion[];
  trackType?: TrackType;
  examTrack?: ExamTrack;
  examLevel?: ExamLevel;
  skill?: TrackSkill;
  reviewedStatus?: ReviewedStatus;
  titleTranslations?: Partial<Record<SupportedUILanguage, string>>;
  objectiveTranslations?: Partial<Record<SupportedUILanguage, string>>;
  canDoTranslations?: Partial<Record<SupportedUILanguage, string>>;
  descriptionTranslations?: Partial<Record<SupportedUILanguage, string>>;
  contentStatus?: "ready" | "blueprint" | string;
  playable?: boolean;
  situationByNative?: Partial<Record<SupportedUILanguage, string>>;
  goalByNative?: Partial<Record<SupportedUILanguage, string>>;
  learnSection?: Record<string, { status?: string }>;
  practiceStages?: Array<{
    key: string;
    labelByNative?: Partial<Record<SupportedUILanguage, string>>;
    exerciseOrders?: number[];
  }>;
  cultureNoteTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
  contextualVariations?: VocabularyItem[];
  communicationStrategyTranslations?: Partial<Record<SupportedUILanguage | NativeMeaningLanguage, string>>;
}

export interface Unit {
  id: string;
  language: LanguageCode;
  levelId: LevelId;
  title: string;
  titleTranslations?: Partial<Record<SupportedUILanguage, string>>;
  communicationGoal: string;
  communicationGoalTranslations?: Partial<Record<SupportedUILanguage, string>>;
  description: string;
  estimatedMinutes: number;
  order: number;
  lessons: Lesson[];
  trackType?: TrackType;
  examTrack?: ExamTrack;
  examLevel?: ExamLevel;
  skill?: TrackSkill;
  reviewedStatus?: ReviewedStatus;
  comingSoon?: boolean;
}

export interface CourseLevel { id: LevelId; title: string; description: string; cefr?: string; jlpt?: string; units: Unit[]; trackType?: TrackType; examTrack?: ExamTrack; examLevel?: ExamLevel; reviewedStatus?: ReviewedStatus; comingSoon?: boolean; comingSoonLabel?: string; }
export interface ExamTrackOption {
  id: string;
  language: string;
  learningLanguage?: string;
  examCode?: string;
  title: string;
  description: string;
  titleByNative?: Record<string, string>;
  shortDescriptionByNative?: Record<string, string>;
  iconKey?: string;
  displayOrder?: number;
  enabled?: boolean;
  trackType: TrackType;
  examTrack?: ExamTrack;
  examLevel?: ExamLevel;
  levelId?: LevelId;
  comingSoon?: boolean;
}
export interface Course { id: string; language: LanguageCode; title: string; description: string; nativeLanguageSupport: NativeLanguageCode[]; mapping: string; levels: CourseLevel[]; units: Unit[]; placementTest: PlacementQuestion[]; examTracks?: ExamTrackOption[]; }

export interface PlacementQuestion extends Exercise { placementScore: number; }
export interface PlacementResult { completed: boolean; score: number; level: LevelId; date: string; startingUnitId: string; startingLessonId: string; }
export interface ReviewItem { id: string; language: LanguageCode; itemType: "vocabulary" | "pronunciation" | "grammar" | "sentence"; itemId: string; label: string; meaning: string; easeScore: number; correctCount: number; wrongCount: number; lastReviewedAt?: string; nextReviewAt: string; intervalDays: number; meaningTranslations?: LocalizedAnswers; speechText?: string; }

export interface PracticeSet { language: LanguageCode; title: string; exercises: Exercise[]; questions: QuizQuestion[]; potentialXp: number; dataVersion?: string; }
export interface MistakeRecord { exercise: Exercise; lessonId: string; attempts: number; createdAt: string; improved: boolean; }
export interface SavedFlashcard extends VocabularyItem { lessonId: string; language: LanguageCode; savedAt: string; }
