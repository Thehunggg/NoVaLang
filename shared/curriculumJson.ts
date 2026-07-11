import type {
  Course,
  CourseLevel,
  DialogueLine,
  ExamLevel,
  Exercise,
  LanguageCode,
  Lesson,
  LevelId,
  MicroLesson,
  PlacementQuestion,
  TrackType,
  Unit,
  VocabularyItem,
  ExamTrackOption,
} from "./types.js";
import coursesJson from "./generated/courses.json" with { type: "json" };
import lessonsJson from "./generated/lessons.json" with { type: "json" };
import catalogJson from "./generated/curriculum_catalog.json" with { type: "json" };
import { learningLanguages } from "./languageOptions.js";
import examTracksConfig from "./config/exam_tracks.json" with { type: "json" };
type FlatExercise = {
  id: string;
  type: string;
  access?: "free" | "plus";
  plusOnly?: boolean;
  usesAi?: boolean;
  reusesPreviousAiFeedback?: boolean;
  triggerExtraAiCallByDefault?: boolean;
  prompt: string;
  promptVi?: string;
  prompts?: Record<string, string>;
  displayText?: string;
  displayTextByNative?: Record<string, string>;
  speechText?: string;
  hideSpeechLabel?: boolean;
  audioCardLabel?: string;
  audioCardLabelByNative?: Record<string, string>;
  options?: string[];
  optionsVi?: string[];
  optionsByNative?: Record<string, string[]>;
  correctAnswer: string;
  acceptedAnswers?: string[];
  acceptedAnswersVi?: string[];
  acceptedAnswersByNative?: Record<string, string[]>;
  pairs?: Array<{ left: string; right: string }>;
  pairsVi?: Array<{ left: string; right: string }>;
  pairsByNative?: Record<string, Array<{ left: string; right: string }>>;
  explanation?: string;
  explanationVi?: string;
  skill?: string;
  aiMode?: string;
  maxUserChars?: number;
  openEndedChat?: boolean;
  caseInsensitive?: boolean;
  ignorePunctuation?: boolean;
  allowedScript?: "any" | "latin" | "kana" | "kanji" | "hangul" | "hanzi" | "arabic" | "thai" | "devanagari" | "cyrillic";
  cards?: Array<{
    id: string;
    character: string;
    reading: string;
    displayText?: string;
    speechText: string;
    example: string;
    exampleReading?: string;
    exampleRomanization?: string;
    exampleSpeechText?: string;
    meaningByNative?: Record<string, string>;
    meaningVi?: string;
    audioCardLabelByNative?: Record<string, string>;
    feedbackByNative?: Record<string, string>;
  }>;
  subQuestions?: Array<{
    id: string;
    prompt?: string;
    prompts?: Record<string, string>;
    speechText: string;
    visibleBeforeAnswer?: string;
    visibleBeforeAnswerByNative?: Record<string, string>;
    audioCardLabel?: string;
    audioCardLabelByNative?: Record<string, string>;
    hideSpeechLabel?: boolean;
    options: string[];
    optionsVi?: string[];
    optionsByNative?: Record<string, string[]>;
    correctAnswer: string;
    acceptedAnswers?: string[];
    acceptedAnswersByNative?: Record<string, string[]>;
    revealAfterAnswer?: string;
    revealAfterAnswerByNative?: Record<string, string>;
    feedbackCorrectByNative?: Record<string, string>;
    feedbackWrongByNative?: Record<string, string>;
  }>;
  revealAfterAnswer?: string;
  revealAfterAnswerByNative?: Record<string, string>;
  feedbackCorrectByNative?: Record<string, string>;
  feedbackWrongByNative?: Record<string, string>;
};

type FlatLesson = {
  id: string;
  languageCode: string;
  nicheId: string;
  unitId: string;
  title: string;
  titleVi?: string;
  titleByNative?: Record<string, string>;
  track: string;
  level: string;
  template?: string;
  description: string;
  descriptionVi?: string;
  descriptionByNative?: Record<string, string>;
  estimatedMinutes?: number;
  comingSoon?: boolean;
  order: number;
  canDoObjective?: string;
  canDoObjectiveVi?: string;
  canDoObjectiveByNative?: Record<string, string>;
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
    meaningJa?: string;
    meaningKo?: string;
    meaningZh?: string;
    translations?: Record<string, string>;
    exampleText?: string;
    exampleReading?: string;
    exampleRomanization?: string;
    exampleSpeechText?: string;
    exampleTranslations?: Record<string, string>;
    exampleSentence?: string;
    exampleSentenceVi?: string;
    exampleDisplay?: string;
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
  titleByNative?: Record<string, string>;
  levelCode: string;
  trackId: string;
  goal: string;
  goalVi?: string;
  goalByNative?: Record<string, string>;
  order: number;
  lessonIds: string[];
};

type FlatCourse = {
  id: string;
  languageCode: string;
  nicheId: string;
  branch?: string;
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
    case "characterCard":
      return "character_card";
    case "chooseMeaning":
      return "choose_meaning";
    case "chooseReading":
      return "choose_correct_reading";
    case "fillMissingCharacter":
      return "fill_missing_character";
    case "soundToCharacter":
      return "sound_to_character";
    case "nextInSequence":
      return "next_in_sequence";
    case "chooseCorrectPair":
      return "choose_correct_pair";
    case "plusListeningVocabularyChallenge":
      return "plus_listening_vocabulary_challenge";
    case "chooseVocabulary":
    case "chooseCorrectAnswer":
      return "multiple_choice";
    case "matchPairs":
      return "match_pairs";
    case "typeAnswer":
      return "type_meaning";
    case "fillBlank":
    case "listeningGapFill":
      return "fill_blank";
    case "listenAndChoose":
      return "listen_and_choose_meaning";
    case "controlledAiQa":
    case "aiFeedbackReview":
      return "answer_question";
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
  const optionsEn = ex.optionsByNative?.en ?? ex.options;
  const optionsVi = ex.optionsByNative?.vi ?? ex.optionsVi ?? ex.options;
  const acceptedEn =
    ex.acceptedAnswersByNative?.en ??
    ex.acceptedAnswers ??
    (ex.correctAnswer ? [ex.correctAnswer] : []);
  const acceptedVi =
    ex.acceptedAnswersByNative?.vi ?? ex.acceptedAnswersVi ?? acceptedEn;
  const feedbackCorrect = ex.feedbackCorrectByNative;
  const feedbackWrong = ex.feedbackWrongByNative;
  return {
    id: ex.id,
    type: mapExerciseType(ex.type),
    level: levelId,
    question: ex.prompts?.en ?? ex.prompt,
    options: optionsEn,
    pairs: ex.pairsByNative?.en ?? ex.pairs,
    correctAnswer: isMatch
      ? ((ex.pairsByNative?.en ?? ex.pairs)?.map((p) => p.right) ?? [])
      : ex.correctAnswer,
    explanation: ex.explanation ?? "",
    targetLanguage: language,
    nativeTranslation: ex.prompts?.vi ?? ex.promptVi ?? ex.prompt,
    difficulty: "easy",
    matchPairMode: isMatch ? "vocabulary_meaning" : undefined,
    caseInsensitive: ex.caseInsensitive === true,
    ignorePunctuation: ex.ignorePunctuation === true,
    allowedScript: ex.allowedScript ?? "any",
    acceptedAnswers: {
      en: acceptedEn,
      vi: acceptedVi,
      ja: ex.acceptedAnswersByNative?.ja ?? acceptedEn,
      ko: ex.acceptedAnswersByNative?.ko ?? acceptedEn,
      zh: ex.acceptedAnswersByNative?.zh ?? acceptedEn,
    },
    questionTranslations: {
      en: ex.prompts?.en ?? ex.prompt,
      vi: ex.prompts?.vi ?? ex.promptVi ?? ex.prompt,
      ja: ex.prompts?.ja ?? ex.prompt,
      ko: ex.prompts?.ko ?? ex.prompt,
      zh: ex.prompts?.zh ?? ex.prompt,
    },
    optionTranslations: {
      en: optionsEn,
      vi: optionsVi,
      ja: ex.optionsByNative?.ja ?? optionsEn,
      ko: ex.optionsByNative?.ko ?? optionsEn,
      zh: ex.optionsByNative?.zh ?? optionsEn,
    },
    pairTranslations: {
      en: ex.pairsByNative?.en ?? ex.pairs,
      vi: ex.pairsByNative?.vi ?? ex.pairsVi ?? ex.pairs,
      ja: ex.pairsByNative?.ja ?? ex.pairs,
      ko: ex.pairsByNative?.ko ?? ex.pairs,
      zh: ex.pairsByNative?.zh ?? ex.pairs,
    },
    explanationTranslations: feedbackCorrect ?? (ex.explanationVi
      ? { en: ex.explanation ?? "", vi: ex.explanationVi }
      : undefined),
    audioText: ex.speechText ?? ex.displayText,
    audioLabel: ex.audioCardLabel,
    audioLabelTranslations: ex.audioCardLabelByNative,
    hideAudioText: ex.hideSpeechLabel,
    cards: ex.cards,
    subQuestions: ex.subQuestions?.map((subQuestion) => {
      const subOptionsEn = subQuestion.optionsByNative?.en ?? subQuestion.options;
      const subAcceptedEn =
        subQuestion.acceptedAnswersByNative?.en ??
        subQuestion.acceptedAnswers ??
        [subQuestion.correctAnswer];
      return {
        id: subQuestion.id,
        question: subQuestion.prompts?.en ?? subQuestion.prompt ?? "",
        questionTranslations: {
          en: subQuestion.prompts?.en ?? subQuestion.prompt ?? "",
          vi: subQuestion.prompts?.vi ?? subQuestion.prompt ?? "",
          ja: subQuestion.prompts?.ja ?? subQuestion.prompt ?? "",
          ko: subQuestion.prompts?.ko ?? subQuestion.prompt ?? "",
          zh: subQuestion.prompts?.zh ?? subQuestion.prompt ?? "",
        },
        audioText: subQuestion.speechText,
        audioLabel: subQuestion.audioCardLabel,
        audioLabelTranslations: subQuestion.audioCardLabelByNative,
        hideAudioText: subQuestion.hideSpeechLabel ?? true,
        visibleBeforeAnswer: subQuestion.visibleBeforeAnswer,
        visibleBeforeAnswerTranslations: subQuestion.visibleBeforeAnswerByNative,
        options: subOptionsEn,
        optionTranslations: {
          en: subOptionsEn,
          vi: subQuestion.optionsByNative?.vi ?? subQuestion.optionsVi ?? subQuestion.options,
          ja: subQuestion.optionsByNative?.ja ?? subOptionsEn,
          ko: subQuestion.optionsByNative?.ko ?? subOptionsEn,
          zh: subQuestion.optionsByNative?.zh ?? subOptionsEn,
        },
        correctAnswer: subQuestion.correctAnswer,
        acceptedAnswers: {
          en: subAcceptedEn,
          vi: subQuestion.acceptedAnswersByNative?.vi ?? subAcceptedEn,
          ja: subQuestion.acceptedAnswersByNative?.ja ?? subAcceptedEn,
          ko: subQuestion.acceptedAnswersByNative?.ko ?? subAcceptedEn,
          zh: subQuestion.acceptedAnswersByNative?.zh ?? subAcceptedEn,
        },
        revealAfterAnswer: subQuestion.revealAfterAnswer,
        revealAfterAnswerTranslations: subQuestion.revealAfterAnswerByNative,
        feedbackCorrectTranslations: subQuestion.feedbackCorrectByNative,
        feedbackWrongTranslations: subQuestion.feedbackWrongByNative,
      };
    }),
    revealAfterAnswer: ex.revealAfterAnswer,
    revealAfterAnswerTranslations: ex.revealAfterAnswerByNative,
    feedbackCorrectTranslations: feedbackCorrect,
    feedbackWrongTranslations: feedbackWrong,
  };
};

const mapVocabulary = (lesson: FlatLesson): VocabularyItem[] =>
  (lesson.vocabulary ?? []).map((item) => {
    const meaningEn = item.meaningEn || item.translations?.en || "";
    const meaningVi = item.meaningVi || item.translations?.vi || meaningEn;
    const meaningJa = item.meaningJa || item.translations?.ja || meaningEn;
    const meaningKo = item.meaningKo || item.translations?.ko || meaningEn;
    const meaningZh = item.meaningZh || item.translations?.zh || meaningEn;
    const exampleText =
      item.exampleText || item.exampleDisplay || item.exampleSentence || "";
    const exampleEn = item.exampleTranslations?.en || "";
    const exampleVi = item.exampleTranslations?.vi || item.exampleSentenceVi || exampleEn;
    const exampleJa = item.exampleTranslations?.ja || exampleEn;
    const exampleKo = item.exampleTranslations?.ko || exampleEn;
    const exampleZh = item.exampleTranslations?.zh || exampleEn;
    return {
      kind: "vocabulary" as const,
      id: item.id,
      word: item.displayText,
      term: item.displayText,
      reading: item.reading,
      pronunciation: item.romanization ?? item.reading,
      meaning: meaningEn,
      translation: meaningEn,
      exampleSentence: exampleText,
      example: exampleText,
      exampleText,
      exampleReading: item.exampleReading || exampleText,
      exampleRomanization: item.exampleRomanization,
      exampleDisplay: exampleText,
      exampleSpeechText: item.exampleSpeechText || exampleText,
      sentenceTranslation: exampleEn,
      exampleTranslations: {
        en: exampleEn,
        vi: exampleVi,
        ja: exampleJa,
        ko: exampleKo,
        zh: exampleZh,
      },
      displayText: item.displayText,
      speechText: item.speechText,
      kana: item.reading,
      meanings: {
        en: [meaningEn],
        vi: [meaningVi],
        ja: [meaningJa],
        ko: [meaningKo],
        zh: [meaningZh],
      },
      acceptedAnswers: {
        en: [meaningEn],
        vi: [meaningVi],
        ja: [meaningJa],
        ko: [meaningKo],
        zh: [meaningZh],
      },
    };
  });

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
  const titleTranslations = flat.titleByNative ?? {
    en: flat.title,
    vi: flat.titleVi ?? flat.title,
  };
  const descriptionTranslations = flat.descriptionByNative ?? {
    en: flat.description,
    vi: flat.descriptionVi ?? flat.description,
  };
  const canDoTranslations = flat.canDoObjectiveByNative ?? {
    en: canDo,
    vi: canDoVi,
  };

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
    titleTranslations,
    objectiveTranslations: canDoTranslations,
    explanationTranslations: descriptionTranslations,
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
    titleTranslations,
    objective: canDo,
    objectiveTranslations: canDoTranslations,
    canDo,
    canDoTranslations,
    description: flat.description,
    descriptionTranslations,
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

type RawExamTrackConfig = {
  id: string;
  learningLanguage?: string;
  language?: string;
  examCode?: string;
  examTrack?: string;
  title?: string | Record<string, string>;
  shortDescription?: string | Record<string, string>;
  description?: string | Record<string, string>;
  iconKey?: string;
  displayOrder?: number;
  enabled?: boolean;
  comingSoon?: boolean;
  trackType?: TrackType;
  examLevel?: ExamLevel;
  levelId?: LevelId;
};

const pickLocalized = (
  value: string | Record<string, string> | undefined,
  fallback: string,
) => {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value.en ?? value.vi ?? Object.values(value)[0] ?? fallback;
};

const examTracksFor = (language: LanguageCode): ExamTrackOption[] => {
  const raw = (examTracksConfig as Record<string, RawExamTrackConfig[]>)[language] ?? [];
  return raw
    .filter((track) => track.enabled !== false)
    .slice()
    .sort((a, b) => Number(a.displayOrder ?? 0) - Number(b.displayOrder ?? 0))
    .slice(0, 3)
    .map((track) => {
      const examCode = track.examCode ?? track.examTrack ?? track.id;
      const title = pickLocalized(track.title, examCode);
      const description = pickLocalized(
        track.shortDescription ?? track.description,
        title,
      );
      return {
        id: track.id,
        language: track.learningLanguage ?? track.language ?? language,
        learningLanguage: track.learningLanguage ?? track.language ?? language,
        examCode,
        title,
        description,
        titleByNative:
          typeof track.title === "object" ? track.title : undefined,
        shortDescriptionByNative:
          typeof track.shortDescription === "object"
            ? track.shortDescription
            : undefined,
        iconKey: track.iconKey,
        displayOrder: track.displayOrder,
        enabled: track.enabled ?? true,
        trackType: track.trackType ?? "exam",
        examTrack: examCode as ExamTrackOption["examTrack"],
        examLevel: track.examLevel,
        levelId: track.levelId,
        comingSoon: track.comingSoon ?? false,
      } satisfies ExamTrackOption;
    });
};

const buildCourseForLanguage = (language: LanguageCode): Course => {
  const nicheCourses = flatCourses
    .filter((c) => c.languageCode === language)
    .slice()
    .sort((a, b) => {
      const aRank = a.nicheId === "core_foundation" || a.branch === "core_foundation" ? 0 : 1;
      const bRank = b.nicheId === "core_foundation" || b.branch === "core_foundation" ? 0 : 1;
      if (aRank !== bRank) return aRank - bRank;
      return (a.order ?? 0) - (b.order ?? 0);
    });
  const lessonById = new Map(flatLessons.map((l) => [l.id, l]));
  // Display Unit numbers from per-module displayOrder (never courseIndex*100 + global blueprint).
  const units: Unit[] = nicheCourses.flatMap((course) =>
    course.units.map((unit) => {
      const lessons = unit.lessonIds
        .map((id) => lessonById.get(id))
        .filter((l): l is FlatLesson => Boolean(l))
        .map(mapLesson);
      const displayOrder = Number(
        (unit as { displayOrder?: number }).displayOrder ?? unit.order ?? 1,
      );
      return {
        id: unit.id,
        language,
        levelId: toLevelId(unit.levelCode),
        title: unit.title,
        titleTranslations: unit.titleByNative ?? {
          en: unit.title,
          vi: unit.titleVi ?? unit.title,
        },
        communicationGoal: unit.goal,
        communicationGoalTranslations: unit.goalByNative ?? {
          en: unit.goal,
          vi: unit.goalVi ?? unit.goal,
        },
        description: unit.goalVi ?? unit.goal,
        estimatedMinutes: lessons.reduce((sum, l) => sum + l.durationMinutes, 0),
        order: displayOrder,
        lessons,
        trackType: "general",
        skill: course.nicheId === "core_foundation" ? "kana" : "general",
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
    nativeLanguageSupport: ["en", "vi", "ja", "ko", "zh"],
    mapping: "Shared curriculum JSON (practical niche tracks; exam tracks separate)",
    levels,
    units,
    placementTest,
    examTracks: examTracksFor(language),
  };
};

export const curriculumCourses: Course[] = (["en", "ja"] as LanguageCode[]).map(
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
