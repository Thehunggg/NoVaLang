import type {
  Course,
  CourseLevel,
  DialogueLine,
  Exercise,
  LanguageCode,
  Lesson,
  LevelId,
  MicroLesson,
  PlacementQuestion,
  Unit,
  VocabularyItem,
} from "./types.js";
import coursesJson from "./generated/courses.json" with { type: "json" };
import lessonsJson from "./generated/lessons.json" with { type: "json" };
import catalogJson from "./generated/curriculum_catalog.json" with { type: "json" };
import { learningLanguages } from "./languageOptions.js";
import examTracksConfig from "./config/exam_tracks.json" with { type: "json" };
import type { ExamTrackOption } from "./types.js";

type FlatExercise = {
  id: string;
  type: string;
  prompt: string;
  promptVi?: string;
  displayText?: string;
  speechText?: string;
  options?: string[];
  optionsVi?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  acceptedAnswersVi?: string[];
  pairs?: Array<{ left: string; right: string }>;
  pairsVi?: Array<{ left: string; right: string }>;
  explanation?: string;
  explanationVi?: string;
  skill?: string;
};

type FlatLesson = {
  id: string;
  languageCode: string;
  nicheId: string;
  unitId: string;
  title: string;
  titleVi?: string;
  track: string;
  level: string;
  template?: string;
  description: string;
  descriptionVi?: string;
  estimatedMinutes?: number;
  comingSoon?: boolean;
  order: number;
  canDoObjective?: string;
  canDoObjectiveVi?: string;
  objectives?: string[];
  objectivesVi?: string[];
  introPoints?: string[];
  introPointsVi?: string[];
  vocabulary?: Array<{
    id: string;
    displayText: string;
    reading?: string;
    romanization?: string;
    speechText: string;
    meaningEn: string;
    meaningVi: string;
    exampleSentence?: string;
    exampleSentenceVi?: string;
  }>;
  keyPhrases?: Array<{
    id: string;
    displayText: string;
    speechText: string;
    meaningEn: string;
    meaningVi: string;
    usageNote?: string;
    usageNoteVi?: string;
  }>;
  dialogue?: Array<{
    id: string;
    speaker: string;
    displayText: string;
    speechText: string;
    meaningEn: string;
    meaningVi: string;
  }>;
  grammarFocus?: string;
  grammarFocusVi?: string;
  cultureNote?: string;
  cultureNoteVi?: string;
  reviewItems?: Array<{
    id: string;
    kind?: string;
    displayText: string;
    speechText: string;
    meaningEn: string;
    meaningVi: string;
  }>;
  exercises: FlatExercise[];
};

type FlatUnit = {
  id: string;
  title: string;
  titleVi?: string;
  levelCode: string;
  trackId: string;
  goal: string;
  goalVi?: string;
  order: number;
  lessonIds: string[];
};

type FlatCourse = {
  id: string;
  languageCode: string;
  nicheId: string;
  title: string;
  titleVi?: string;
  description: string;
  descriptionVi?: string;
  levelCode: string;
  order: number;
  unitIds: string[];
  isComingSoon?: boolean;
  units: FlatUnit[];
};

export const curriculumCatalog = catalogJson;
export const flatCourses = (coursesJson as { courses: FlatCourse[] }).courses;
export const flatLessons = (lessonsJson as { lessons: FlatLesson[] }).lessons;

const mapExerciseType = (type: string): Exercise["type"] => {
  switch (type) {
    case "chooseMeaning":
      return "choose_meaning";
    case "chooseReading":
      return "choose_correct_reading";
    case "matchPairs":
      return "match_pairs";
    case "typeAnswer":
      return "type_meaning";
    case "fillBlank":
      return "fill_blank";
    case "listenAndChoose":
      return "listen_and_choose_meaning";
    default:
      return "multiple_choice";
  }
};

const toLevelId = (value: string): LevelId => {
  const allowed: LevelId[] = ["A0", "A1_1", "A1_2", "A2_1", "A2_2", "B1_1", "B1_2", "B2"];
  return (allowed.includes(value as LevelId) ? value : "A1_1") as LevelId;
};

const mapExercise = (ex: FlatExercise, language: LanguageCode, levelId: LevelId): Exercise => {
  const isMatch = ex.type === "matchPairs";
  return {
    id: ex.id,
    type: mapExerciseType(ex.type),
    level: levelId,
    question: ex.prompt,
    options: ex.options,
    pairs: ex.pairs,
    correctAnswer: isMatch
      ? (ex.pairs?.map((p) => p.right) ?? [])
      : ex.correctAnswer,
    explanation: ex.explanation ?? "",
    targetLanguage: language,
    nativeTranslation: ex.promptVi ?? ex.prompt,
    difficulty: "easy",
    matchPairMode: isMatch ? "vocabulary_meaning" : undefined,
    acceptedAnswers: {
      en: ex.acceptedAnswers ?? (ex.correctAnswer ? [ex.correctAnswer] : []),
      vi: ex.acceptedAnswersVi ?? ex.acceptedAnswers ?? [],
    },
    questionTranslations: {
      en: ex.prompt,
      vi: ex.promptVi ?? ex.prompt,
    },
    optionTranslations: ex.optionsVi
      ? { en: ex.options, vi: ex.optionsVi }
      : undefined,
    pairTranslations: ex.pairsVi
      ? { en: ex.pairs, vi: ex.pairsVi }
      : undefined,
    explanationTranslations: ex.explanationVi
      ? { en: ex.explanation ?? "", vi: ex.explanationVi }
      : undefined,
    audioText: ex.speechText ?? ex.displayText,
  };
};

const mapVocabulary = (lesson: FlatLesson): VocabularyItem[] =>
  (lesson.vocabulary ?? []).map((item) => ({
    kind: "vocabulary",
    id: item.id,
    word: item.displayText,
    term: item.displayText,
    reading: item.reading,
    pronunciation: item.romanization ?? item.reading,
    meaning: item.meaningEn,
    translation: item.meaningEn,
    exampleSentence: item.displayText,
    example: item.displayText,
    sentenceTranslation: item.meaningEn,
    displayText: item.displayText,
    speechText: item.speechText,
    kana: item.reading,
    meanings: { en: [item.meaningEn], vi: [item.meaningVi] },
    acceptedAnswers: { en: [item.meaningEn], vi: [item.meaningVi] },
  }));

const mapDialogue = (lesson: FlatLesson): DialogueLine[] =>
  (lesson.dialogue ?? []).map((item) => ({
    kind: "dialogue",
    id: item.id,
    speaker: item.speaker,
    text: item.displayText,
    translation: item.meaningEn,
    speechText: item.speechText,
    translations: { en: item.meaningEn, vi: item.meaningVi },
  }));

const mapLesson = (flat: FlatLesson): Lesson => {
  const language = flat.languageCode as LanguageCode;
  const levelId = toLevelId(flat.level);
  const vocabulary = mapVocabulary(flat);
  const dialogue = mapDialogue(flat);
  const exercises = (flat.exercises ?? []).map((ex) =>
    mapExercise(ex, language, levelId),
  );
  const contentItems = [
    ...vocabulary,
    ...dialogue,
    ...(flat.grammarFocus
      ? [
          {
            kind: "grammar" as const,
            id: `${flat.id}-g1`,
            title: flat.grammarFocus,
            pattern: flat.grammarFocus,
            explanation: flat.grammarFocusVi ?? flat.grammarFocus,
            examples: [],
            explanationTranslations: {
              en: flat.grammarFocus,
              vi: flat.grammarFocusVi ?? flat.grammarFocus,
            },
          },
        ]
      : []),
  ];

  const canDo = flat.canDoObjective ?? flat.objectives?.[0] ?? flat.description;
  const canDoVi =
    flat.canDoObjectiveVi ??
    flat.objectivesVi?.[0] ??
    flat.descriptionVi ??
    flat.description;

  const micro: MicroLesson = {
    id: `${flat.id}-m1`,
    lessonId: flat.id,
    title: flat.title,
    objective: canDo,
    explanation: flat.description,
    contentItems,
    exercises,
    xpReward: 20,
    order: 1,
    estimatedMinutes: flat.estimatedMinutes ?? 6,
    unlockStatus: flat.comingSoon ? "locked" : "available",
    titleTranslations: { en: flat.title, vi: flat.titleVi ?? flat.title },
    objectiveTranslations: {
      en: canDo,
      vi: canDoVi,
    },
    explanationTranslations: {
      en: flat.description,
      vi: flat.descriptionVi ?? flat.description,
    },
  };

  const examples = [
    ...vocabulary.slice(0, 2).map((item) => ({
      text: item.displayText ?? item.word,
      translation: item.meaning,
    })),
    ...dialogue.slice(0, 2).map((item) => ({
      text: item.text,
      translation: item.translation,
    })),
  ];

  return {
    id: flat.id,
    language,
    levelId,
    unitId: flat.unitId,
    type: flat.template === "kanaLesson" ? "pronunciation" : "vocabulary",
    title: flat.title,
    titleTranslations: { en: flat.title, vi: flat.titleVi ?? flat.title },
    objective: canDo,
    objectiveTranslations: {
      en: canDo,
      vi: canDoVi,
    },
    canDo,
    canDoTranslations: { en: canDo, vi: canDoVi },
    description: flat.description,
    descriptionTranslations: {
      en: flat.description,
      vi: flat.descriptionVi ?? flat.description,
    },
    microLessons: [micro],
    vocabulary,
    dialogue: dialogue.length ? dialogue : undefined,
    examples,
    exercises,
    xpReward: 25,
    order: flat.order,
    unlockRule: "Complete the previous lesson",
    requiredHearts: 1,
    durationMinutes: flat.estimatedMinutes ?? 6,
    level: levelId.startsWith("A0") || levelId.startsWith("A1") ? "Beginner" : "Elementary",
    subtitle: canDo,
    explanation: flat.description,
    quiz: exercises.slice(0, 5).map((exercise) => ({
      id: `${exercise.id}-quiz`,
      prompt: exercise.question,
      options: exercise.options ?? [],
      correctAnswer: Array.isArray(exercise.correctAnswer)
        ? exercise.correctAnswer[0] ?? ""
        : String(exercise.correctAnswer),
      explanation: exercise.explanation ?? "",
      wrongAnswerExplanation: "",
    })),
    // Practical niche curriculum — keep general track (exam tracks stay separate).
    trackType: "general",
    skill: flat.template === "kanaLesson" ? "kana" : "vocabulary",
    reviewedStatus: flat.comingSoon ? "draft" : "reviewed",
  };
};

const examTracksFor = (language: LanguageCode): ExamTrackOption[] =>
  (examTracksConfig as Record<LanguageCode, ExamTrackOption[]>)[language] ?? [];

const buildCourseForLanguage = (language: LanguageCode): Course => {
  const nicheCourses = flatCourses.filter((c) => c.languageCode === language);
  const lessonById = new Map(flatLessons.map((l) => [l.id, l]));
  const units: Unit[] = nicheCourses.flatMap((course) =>
    course.units.map((unit) => {
      const lessons = unit.lessonIds
        .map((id) => lessonById.get(id))
        .filter((l): l is FlatLesson => Boolean(l))
        .map(mapLesson);
      return {
        id: unit.id,
        language,
        levelId: toLevelId(unit.levelCode),
        title: unit.title,
        communicationGoal: unit.goal,
        description: unit.goalVi ?? unit.goal,
        estimatedMinutes: lessons.reduce((sum, l) => sum + l.durationMinutes, 0),
        order: unit.order,
        lessons,
        trackType: "general",
        skill: "general",
        reviewedStatus: "reviewed",
      } satisfies Unit;
    }),
  );

  const levelIds = [...new Set(units.map((u) => u.levelId))];
  const levels: CourseLevel[] = levelIds.map((levelId) => ({
    id: levelId,
    title: levelId,
    description: `${language.toUpperCase()} ${levelId}`,
    units: units.filter((u) => u.levelId === levelId),
    trackType: "general",
    reviewedStatus: "reviewed",
  }));

  const meta = learningLanguages.find((item) => item.code === language);
  const allLessons = units.flatMap((u) => u.lessons);
  const placementPool = allLessons.flatMap((l) => l.exercises).slice(0, 15);
  const placementTest: PlacementQuestion[] = placementPool.map((exercise, index) => ({
    ...exercise,
    id: `${language}-placement-curriculum-${index + 1}`,
    placementScore: 1,
  }));

  return {
    id: `${language}-complete-course`,
    language,
    title: `${meta?.name ?? language} Complete Path`,
    description: meta?.description ?? "",
    nativeLanguageSupport: ["en", "vi", "ja", "es"],
    mapping: "Shared curriculum JSON (practical niche tracks; exam tracks separate)",
    levels,
    units,
    placementTest,
    examTracks: examTracksFor(language),
  };
};

export const curriculumCourses: Course[] = (["en", "ja", "es"] as LanguageCode[]).map(
  buildCourseForLanguage,
);

export const curriculumLessons: Lesson[] = curriculumCourses.flatMap((course) =>
  course.units.flatMap((unit) => unit.lessons),
);

export const getCurriculumCourseByLanguage = (language: string) =>
  curriculumCourses.find((course) => course.language === language);

export const getCurriculumLessonById = (lessonId: string) =>
  curriculumLessons.find((lesson) => lesson.id === lessonId);

export const getCurriculumLessonsByLanguage = (language: string) =>
  getCurriculumCourseByLanguage(language)?.units.flatMap((unit) => unit.lessons) ?? [];

export const getFlatCoursesByNiche = (languageCode: string, nicheId: string) =>
  flatCourses.filter(
    (course) => course.languageCode === languageCode && course.nicheId === nicheId,
  );
