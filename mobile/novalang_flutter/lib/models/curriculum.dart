import 'exercise.dart';
import 'lesson.dart';

Map<String, String> _stringMap(dynamic raw) {
  if (raw is! Map) return const {};
  return raw.map(
    (key, value) => MapEntry(key.toString(), value?.toString() ?? ''),
  );
}

Map<String, List<String>> _stringListMap(dynamic raw) {
  if (raw is! Map) return const {};
  return raw.map(
    (key, value) => MapEntry(
      key.toString(),
      (value as List<dynamic>? ?? const []).cast<String>(),
    ),
  );
}

/// Vocabulary item with pronunciation-ready fields.
class VocabularyItem {
  const VocabularyItem({
    required this.id,
    required this.displayText,
    required this.speechText,
    required this.meaningEn,
    required this.meaningVi,
    this.reading,
    this.romanization,
    this.exampleText,
    this.exampleReading,
    this.exampleRomanization,
    this.exampleSpeechText,
    this.exampleSentence,
    this.exampleSentenceVi,
    this.exampleTranslations = const {},
    this.translations = const {},
  });

  final String id;
  final String displayText;
  final String speechText;
  final String meaningEn;
  final String meaningVi;
  final String? reading;
  final String? romanization;
  final String? exampleText;
  final String? exampleReading;
  final String? exampleRomanization;
  final String? exampleSpeechText;
  final String? exampleSentence;
  final String? exampleSentenceVi;
  final Map<String, String> exampleTranslations;
  final Map<String, String> translations;

  factory VocabularyItem.fromJson(Map<String, dynamic> json) {
    Map<String, String> asStringMap(dynamic value) {
      if (value is! Map) return const {};
      return value.map(
        (key, item) => MapEntry(key.toString(), item?.toString() ?? ''),
      );
    }

    final translations = asStringMap(json['translations']);
    final exampleTranslations = asStringMap(json['exampleTranslations']);
    final exampleText =
        json['exampleText'] as String? ??
        json['exampleDisplay'] as String? ??
        json['exampleSentence'] as String?;

    return VocabularyItem(
      id: json['id'] as String? ?? '',
      displayText: json['displayText'] as String? ?? '',
      speechText:
          json['speechText'] as String? ?? json['displayText'] as String? ?? '',
      meaningEn: json['meaningEn'] as String? ?? translations['en'] ?? '',
      meaningVi: json['meaningVi'] as String? ?? translations['vi'] ?? '',
      reading: json['reading'] as String?,
      romanization: json['romanization'] as String?,
      exampleText: exampleText,
      exampleReading: json['exampleReading'] as String? ?? exampleText,
      exampleRomanization: json['exampleRomanization'] as String?,
      exampleSpeechText: json['exampleSpeechText'] as String? ?? exampleText,
      exampleSentence: json['exampleSentence'] as String? ?? exampleText,
      exampleSentenceVi:
          json['exampleSentenceVi'] as String? ?? exampleTranslations['vi'],
      exampleTranslations: exampleTranslations,
      translations: translations,
    );
  }

  String localizedMeaning(String locale) {
    if (translations[locale]?.isNotEmpty == true) return translations[locale]!;
    if (locale == 'vi' && meaningVi.isNotEmpty) return meaningVi;
    if (locale == 'en' && meaningEn.isNotEmpty) return meaningEn;
    return meaningEn.isNotEmpty
        ? meaningEn
        : (translations['en'] ??
              (translations.values.isNotEmpty
                  ? translations.values.first
                  : ''));
  }

  String localizedExampleTranslation(String locale) {
    if (exampleTranslations[locale]?.isNotEmpty == true) {
      return exampleTranslations[locale]!;
    }
    if (locale == 'vi' && (exampleSentenceVi?.isNotEmpty ?? false)) {
      return exampleSentenceVi!;
    }
    return exampleTranslations['en'] ?? exampleSentenceVi ?? '';
  }

  String get resolvedExampleText => exampleText ?? exampleSentence ?? '';
}

class KeyPhrase {
  const KeyPhrase({
    required this.id,
    required this.displayText,
    required this.speechText,
    required this.meaningEn,
    required this.meaningVi,
    this.usageNote,
    this.usageNoteVi,
  });

  final String id;
  final String displayText;
  final String speechText;
  final String meaningEn;
  final String meaningVi;
  final String? usageNote;
  final String? usageNoteVi;

  factory KeyPhrase.fromJson(Map<String, dynamic> json) => KeyPhrase(
    id: json['id'] as String? ?? '',
    displayText: json['displayText'] as String? ?? '',
    speechText:
        json['speechText'] as String? ?? json['displayText'] as String? ?? '',
    meaningEn: json['meaningEn'] as String? ?? '',
    meaningVi: json['meaningVi'] as String? ?? '',
    usageNote: json['usageNote'] as String?,
    usageNoteVi: json['usageNoteVi'] as String?,
  );
}

class ReviewItem {
  const ReviewItem({
    required this.id,
    required this.kind,
    required this.displayText,
    required this.speechText,
    required this.meaningEn,
    required this.meaningVi,
  });

  final String id;
  final String kind;
  final String displayText;
  final String speechText;
  final String meaningEn;
  final String meaningVi;

  factory ReviewItem.fromJson(Map<String, dynamic> json) => ReviewItem(
    id: json['id'] as String? ?? '',
    kind: json['kind'] as String? ?? 'vocabulary',
    displayText: json['displayText'] as String? ?? '',
    speechText:
        json['speechText'] as String? ?? json['displayText'] as String? ?? '',
    meaningEn: json['meaningEn'] as String? ?? '',
    meaningVi: json['meaningVi'] as String? ?? '',
  );
}

class DialogueLine {
  const DialogueLine({
    required this.id,
    required this.speaker,
    required this.displayText,
    required this.speechText,
    required this.meaningEn,
    required this.meaningVi,
  });

  final String id;
  final String speaker;
  final String displayText;
  final String speechText;
  final String meaningEn;
  final String meaningVi;

  factory DialogueLine.fromJson(Map<String, dynamic> json) => DialogueLine(
    id: json['id'] as String? ?? '',
    speaker: json['speaker'] as String? ?? '',
    displayText: json['displayText'] as String? ?? '',
    speechText:
        json['speechText'] as String? ?? json['displayText'] as String? ?? '',
    meaningEn: json['meaningEn'] as String? ?? '',
    meaningVi: json['meaningVi'] as String? ?? '',
  );
}

class CurriculumLesson {
  const CurriculumLesson({
    required this.id,
    required this.languageCode,
    required this.nicheId,
    required this.unitId,
    required this.title,
    required this.titleVi,
    this.titleByNative = const {},
    required this.track,
    required this.level,
    required this.template,
    required this.description,
    required this.descriptionVi,
    this.descriptionByNative = const {},
    required this.estimatedMinutes,
    required this.comingSoon,
    required this.order,
    required this.canDoObjective,
    required this.canDoObjectiveVi,
    this.canDoObjectiveByNative = const {},
    required this.objectives,
    required this.objectivesVi,
    required this.introPoints,
    required this.introPointsVi,
    this.introPointsByNative = const {},
    required this.vocabulary,
    required this.keyPhrases,
    required this.dialogue,
    required this.reviewItems,
    required this.exercises,
    this.grammarFocus,
    this.grammarFocusVi,
    this.cultureNote,
    this.cultureNoteVi,
  });

  final String id;
  final String languageCode;
  final String nicheId;
  final String unitId;
  final String title;
  final String titleVi;
  final Map<String, String> titleByNative;
  final String track;
  final String level;
  final LessonTemplate template;
  final String description;
  final String descriptionVi;
  final Map<String, String> descriptionByNative;
  final int estimatedMinutes;
  final bool comingSoon;
  final int order;
  final String canDoObjective;
  final String canDoObjectiveVi;
  final Map<String, String> canDoObjectiveByNative;
  final List<String> objectives;
  final List<String> objectivesVi;
  final List<String> introPoints;
  final List<String> introPointsVi;
  final Map<String, List<String>> introPointsByNative;
  final List<VocabularyItem> vocabulary;
  final List<KeyPhrase> keyPhrases;
  final List<DialogueLine> dialogue;
  final List<ReviewItem> reviewItems;
  final List<Exercise> exercises;
  final String? grammarFocus;
  final String? grammarFocusVi;
  final String? cultureNote;
  final String? cultureNoteVi;

  factory CurriculumLesson.fromJson(Map<String, dynamic> json) {
    final canDo =
        json['canDoObjective'] as String? ??
        ((json['objectives'] as List<dynamic>?)?.cast<String>().firstOrNull) ??
        json['description'] as String? ??
        '';
    final canDoVi =
        json['canDoObjectiveVi'] as String? ??
        ((json['objectivesVi'] as List<dynamic>?)
            ?.cast<String>()
            .firstOrNull) ??
        json['descriptionVi'] as String? ??
        canDo;
    return CurriculumLesson(
      id: json['id'] as String,
      languageCode: json['languageCode'] as String? ?? '',
      nicheId: json['nicheId'] as String? ?? '',
      unitId: json['unitId'] as String? ?? '',
      title: json['title'] as String? ?? '',
      titleVi: json['titleVi'] as String? ?? json['title'] as String? ?? '',
      titleByNative: _stringMap(json['titleByNative']),
      track: json['track'] as String? ?? '',
      level: json['level'] as String? ?? 'A1_1',
      template: _templateFrom(json['template'] as String?),
      description: json['description'] as String? ?? '',
      descriptionVi:
          json['descriptionVi'] as String? ??
          json['description'] as String? ??
          '',
      descriptionByNative: _stringMap(json['descriptionByNative']),
      estimatedMinutes: json['estimatedMinutes'] as int? ?? 6,
      comingSoon: json['comingSoon'] as bool? ?? false,
      order: json['order'] as int? ?? 0,
      canDoObjective: canDo,
      canDoObjectiveVi: canDoVi,
      canDoObjectiveByNative: _stringMap(json['canDoObjectiveByNative']),
      objectives: (json['objectives'] as List<dynamic>? ?? const [])
          .cast<String>(),
      objectivesVi: (json['objectivesVi'] as List<dynamic>? ?? const [])
          .cast<String>(),
      introPoints: (json['introPoints'] as List<dynamic>? ?? const [])
          .cast<String>(),
      introPointsVi: (json['introPointsVi'] as List<dynamic>? ?? const [])
          .cast<String>(),
      introPointsByNative: _stringListMap(json['introPointsByNative']),
      vocabulary: (json['vocabulary'] as List<dynamic>? ?? const [])
          .map((item) => VocabularyItem.fromJson(item as Map<String, dynamic>))
          .toList(growable: false),
      keyPhrases: (json['keyPhrases'] as List<dynamic>? ?? const [])
          .map((item) => KeyPhrase.fromJson(item as Map<String, dynamic>))
          .toList(growable: false),
      dialogue: (json['dialogue'] as List<dynamic>? ?? const [])
          .map((item) => DialogueLine.fromJson(item as Map<String, dynamic>))
          .toList(growable: false),
      reviewItems: (json['reviewItems'] as List<dynamic>? ?? const [])
          .map((item) => ReviewItem.fromJson(item as Map<String, dynamic>))
          .toList(growable: false),
      grammarFocus: json['grammarFocus'] as String?,
      grammarFocusVi: json['grammarFocusVi'] as String?,
      cultureNote: json['cultureNote'] as String?,
      cultureNoteVi: json['cultureNoteVi'] as String?,
      exercises: (json['exercises'] as List<dynamic>? ?? const [])
          .map((item) => _exerciseFromJson(item as Map<String, dynamic>))
          .toList(growable: false),
    );
  }

  /// Convert to the existing Flutter [Lesson] model used by lesson UI.
  Lesson toLesson({String nativeLanguage = 'en'}) => Lesson(
    id: id,
    title: title,
    titleVi: titleVi,
    titleByNative: titleByNative,
    track: track,
    level: level,
    template: template,
    description: canDoObjective.isNotEmpty ? canDoObjective : description,
    descriptionVi: canDoObjectiveVi.isNotEmpty
        ? canDoObjectiveVi
        : descriptionVi,
    descriptionByNative: canDoObjectiveByNative.isNotEmpty
        ? canDoObjectiveByNative
        : descriptionByNative,
    exercises: exercises,
    introPoints: introPoints.isNotEmpty
        ? introPoints
        : (canDoObjective.isNotEmpty ? [canDoObjective] : const []),
    introPointsVi: introPointsVi.isNotEmpty
        ? introPointsVi
        : (canDoObjectiveVi.isNotEmpty ? [canDoObjectiveVi] : const []),
    introPointsByNative: introPointsByNative,
    vocabulary: vocabulary
        .map(
          (item) => LessonVocabCard(
            displayText: item.displayText,
            speechText: item.speechText,
            meaning: item.localizedMeaning(nativeLanguage),
            reading: item.romanization ?? item.reading,
            romanization: item.romanization,
            exampleText: item.resolvedExampleText.isEmpty
                ? null
                : item.resolvedExampleText,
            exampleReading: item.exampleReading,
            exampleRomanization: item.exampleRomanization,
            exampleSpeechText:
                item.exampleSpeechText ?? item.resolvedExampleText,
            exampleTranslation: item.localizedExampleTranslation(
              nativeLanguage,
            ),
          ),
        )
        .toList(growable: false),
    estimatedMinutes: estimatedMinutes,
    comingSoon: comingSoon,
  );

  static LessonTemplate _templateFrom(String? value) => switch (value) {
    'kanaLesson' => LessonTemplate.kanaLesson,
    'grammarLesson' => LessonTemplate.grammarLesson,
    'readingLesson' => LessonTemplate.readingLesson,
    'listeningLesson' => LessonTemplate.listeningLesson,
    'miniTestLesson' => LessonTemplate.miniTestLesson,
    _ => LessonTemplate.vocabularyLesson,
  };
}

Exercise _exerciseFromJson(Map<String, dynamic> json) {
  final type = switch (json['type'] as String?) {
    'characterCard' => ExerciseType.characterCard,
    'chooseReading' => ExerciseType.chooseReading,
    'chooseVocabulary' => ExerciseType.chooseVocabulary,
    'chooseCorrectAnswer' => ExerciseType.chooseCorrectAnswer,
    'fillMissingCharacter' => ExerciseType.fillMissingCharacter,
    'soundToCharacter' => ExerciseType.soundToCharacter,
    'nextInSequence' => ExerciseType.nextInSequence,
    'chooseCorrectPair' => ExerciseType.chooseCorrectPair,
    'matchPairs' => ExerciseType.matchPairs,
    'typeAnswer' => ExerciseType.typeAnswer,
    'fillBlank' => ExerciseType.fillBlank,
    'listenAndChoose' => ExerciseType.listenAndChoose,
    'listeningGapFill' => ExerciseType.listeningGapFill,
    'plusListeningVocabularyChallenge' =>
      ExerciseType.plusListeningVocabularyChallenge,
    'controlledAiQa' => ExerciseType.controlledAiQa,
    'aiFeedbackReview' => ExerciseType.aiFeedbackReview,
    _ => ExerciseType.chooseMeaning,
  };

  List<MatchPair> parsePairs(dynamic raw) => (raw as List<dynamic>? ?? const [])
      .map((item) {
        final map = item as Map<String, dynamic>;
        return MatchPair(
          left: map['left'] as String? ?? '',
          right: map['right'] as String? ?? '',
        );
      })
      .toList(growable: false);

  Map<String, List<String>> parseStringListMap(dynamic raw) {
    if (raw is! Map) return const {};
    return raw.map(
      (key, value) => MapEntry(
        key.toString(),
        (value as List<dynamic>? ?? const []).cast<String>(),
      ),
    );
  }

  Map<String, List<MatchPair>> parsePairsMap(dynamic raw) {
    if (raw is! Map) return const {};
    return raw.map((key, value) => MapEntry(key.toString(), parsePairs(value)));
  }

  Map<String, String> parseStringMap(dynamic raw) {
    if (raw is! Map) return const {};
    return raw.map(
      (key, value) => MapEntry(key.toString(), value?.toString() ?? ''),
    );
  }

  List<LearnCard> parseCards(dynamic raw) {
    return (raw as List<dynamic>? ?? const [])
        .map((item) {
          final map = item as Map<String, dynamic>;
          return LearnCard(
            id: map['id'] as String? ?? '',
            character:
                map['character'] as String? ??
                map['displayText'] as String? ??
                '',
            reading: map['reading'] as String? ?? '',
            speechText: map['speechText'] as String? ?? '',
            example: map['example'] as String? ?? '',
            exampleReading: map['exampleReading'] as String?,
            exampleRomanization: map['exampleRomanization'] as String?,
            exampleSpeechText: map['exampleSpeechText'] as String?,
            meaningByNative: parseStringMap(map['meaningByNative']),
            audioCardLabelByNative: parseStringMap(
              map['audioCardLabelByNative'],
            ),
            feedbackByNative: parseStringMap(map['feedbackByNative']),
          );
        })
        .toList(growable: false);
  }

  List<ExerciseSubQuestion> parseSubQuestions(dynamic raw) {
    return (raw as List<dynamic>? ?? const [])
        .map((item) {
          final map = item as Map<String, dynamic>;
          return ExerciseSubQuestion(
            id: map['id'] as String? ?? '',
            prompt: map['prompt'] as String? ?? '',
            prompts: parseStringMap(map['prompts']),
            speechText: map['speechText'] as String? ?? '',
            visibleBeforeAnswer: map['visibleBeforeAnswer'] as String?,
            visibleBeforeAnswerByNative: parseStringMap(
              map['visibleBeforeAnswerByNative'],
            ),
            audioCardLabel: map['audioCardLabel'] as String?,
            audioCardLabelByNative: parseStringMap(
              map['audioCardLabelByNative'],
            ),
            hideSpeechLabel: map['hideSpeechLabel'] as bool? ?? true,
            options: (map['options'] as List<dynamic>? ?? const [])
                .cast<String>(),
            correctAnswer: map['correctAnswer'] as String? ?? '',
            revealAfterAnswer: map['revealAfterAnswer'] as String?,
            revealAfterAnswerByNative: parseStringMap(
              map['revealAfterAnswerByNative'],
            ),
            feedbackCorrectByNative: parseStringMap(
              map['feedbackCorrectByNative'],
            ),
            feedbackWrongByNative: parseStringMap(map['feedbackWrongByNative']),
          );
        })
        .toList(growable: false);
  }

  return Exercise(
    id: json['id'] as String? ?? '',
    type: type,
    prompt: json['prompt'] as String? ?? '',
    promptVi: json['promptVi'] as String?,
    prompts: parseStringMap(json['prompts']),
    displayText: json['displayText'] as String?,
    displayTextByNative: parseStringMap(json['displayTextByNative']),
    speechText: json['speechText'] as String?,
    hideSpeechLabel: json['hideSpeechLabel'] as bool? ?? false,
    audioCardLabel: json['audioCardLabel'] as String?,
    audioCardLabelByNative: parseStringMap(json['audioCardLabelByNative']),
    cards: parseCards(json['cards']),
    subQuestions: parseSubQuestions(json['subQuestions']),
    revealAfterAnswer: json['revealAfterAnswer'] as String?,
    feedbackCorrectByNative: parseStringMap(json['feedbackCorrectByNative']),
    feedbackWrongByNative: parseStringMap(json['feedbackWrongByNative']),
    options: (json['options'] as List<dynamic>? ?? const []).cast<String>(),
    optionsVi: (json['optionsVi'] as List<dynamic>? ?? const []).cast<String>(),
    optionsByNative: parseStringListMap(json['optionsByNative']),
    correctAnswer: json['correctAnswer'] as String? ?? '',
    acceptedAnswers: (json['acceptedAnswers'] as List<dynamic>? ?? const [])
        .cast<String>(),
    acceptedAnswersVi: (json['acceptedAnswersVi'] as List<dynamic>? ?? const [])
        .cast<String>(),
    acceptedAnswersByNative: parseStringListMap(
      json['acceptedAnswersByNative'],
    ),
    pairs: parsePairs(json['pairs']),
    pairsVi: parsePairs(json['pairsVi']),
    pairsByNative: parsePairsMap(json['pairsByNative']),
    instructionByNative: parseStringMap(json['instructionByNative']),
    plusOnly: json['plusOnly'] as bool? ?? json['access'] == 'plus',
    usesAi: json['usesAi'] as bool? ?? false,
    reusesPreviousAiFeedback:
        json['reusesPreviousAiFeedback'] as bool? ?? false,
    triggerExtraAiCallByDefault:
        json['triggerExtraAiCallByDefault'] as bool? ?? false,
    maxUserChars: json['maxUserChars'] as int? ?? 400,
    caseInsensitive: json['caseInsensitive'] as bool? ?? false,
    ignorePunctuation: json['ignorePunctuation'] as bool? ?? false,
  );
}

class CurriculumUnit {
  const CurriculumUnit({
    required this.id,
    required this.title,
    required this.titleVi,
    this.titleByNative = const {},
    required this.levelCode,
    required this.trackId,
    required this.goal,
    required this.goalVi,
    this.goalByNative = const {},
    required this.order,
    required this.lessonIds,
  });

  final String id;
  final String title;
  final String titleVi;
  final Map<String, String> titleByNative;
  final String levelCode;
  final String trackId;
  final String goal;
  final String goalVi;
  final Map<String, String> goalByNative;
  final int order;
  final List<String> lessonIds;

  factory CurriculumUnit.fromJson(Map<String, dynamic> json) => CurriculumUnit(
    id: json['id'] as String,
    title: json['title'] as String? ?? '',
    titleVi: json['titleVi'] as String? ?? json['title'] as String? ?? '',
    titleByNative: _stringMap(json['titleByNative']),
    levelCode: json['levelCode'] as String? ?? 'A1_1',
    trackId: json['trackId'] as String? ?? '',
    goal: json['goal'] as String? ?? '',
    goalVi: json['goalVi'] as String? ?? json['goal'] as String? ?? '',
    goalByNative: _stringMap(json['goalByNative']),
    order: (json['displayOrder'] as int?) ?? (json['order'] as int? ?? 0),
    lessonIds: (json['lessonIds'] as List<dynamic>? ?? const []).cast<String>(),
  );
}

class CurriculumCourse {
  const CurriculumCourse({
    required this.id,
    required this.languageCode,
    required this.nicheId,
    required this.title,
    required this.titleVi,
    required this.description,
    required this.descriptionVi,
    required this.levelCode,
    required this.order,
    required this.unitIds,
    required this.isComingSoon,
    required this.units,
  });

  final String id;
  final String languageCode;
  final String nicheId;
  final String title;
  final String titleVi;
  final String description;
  final String descriptionVi;
  final String levelCode;
  final int order;
  final List<String> unitIds;
  final bool isComingSoon;
  final List<CurriculumUnit> units;

  factory CurriculumCourse.fromJson(Map<String, dynamic> json) =>
      CurriculumCourse(
        id: json['id'] as String,
        languageCode: json['languageCode'] as String? ?? '',
        nicheId: json['nicheId'] as String? ?? '',
        title: json['title'] as String? ?? '',
        titleVi: json['titleVi'] as String? ?? json['title'] as String? ?? '',
        description: json['description'] as String? ?? '',
        descriptionVi:
            json['descriptionVi'] as String? ??
            json['description'] as String? ??
            '',
        levelCode: json['levelCode'] as String? ?? 'A1_1',
        order: json['order'] as int? ?? 0,
        unitIds: (json['unitIds'] as List<dynamic>? ?? const []).cast<String>(),
        isComingSoon: json['isComingSoon'] as bool? ?? false,
        units: (json['units'] as List<dynamic>? ?? const [])
            .map(
              (item) => CurriculumUnit.fromJson(item as Map<String, dynamic>),
            )
            .toList(growable: false),
      );
}

class CurriculumCatalog {
  const CurriculumCatalog({
    required this.courses,
    required this.lessons,
    required this.lessonById,
  });

  final List<CurriculumCourse> courses;
  final List<CurriculumLesson> lessons;
  final Map<String, CurriculumLesson> lessonById;

  bool get isEmpty => courses.isEmpty || lessons.isEmpty;

  List<CurriculumCourse> coursesFor({
    required String languageCode,
    String? nicheId,
  }) {
    return courses
        .where(
          (course) =>
              course.languageCode == languageCode &&
              (nicheId == null || nicheId.isEmpty || course.nicheId == nicheId),
        )
        .toList(growable: false);
  }

  CurriculumLesson? findLesson(String id) => lessonById[id];
}
