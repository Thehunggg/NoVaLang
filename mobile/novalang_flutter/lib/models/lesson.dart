import 'exercise.dart';

enum LessonTemplate {
  kanaLesson,
  vocabularyLesson,
  grammarLesson,
  readingLesson,
  listeningLesson,
  miniTestLesson,
}

/// Slim vocab card model for lesson intro UI (avoids circular imports).
class LessonVocabCard {
  const LessonVocabCard({
    required this.displayText,
    required this.speechText,
    required this.meaning,
    this.reading,
    this.romanization,
    this.exampleText,
    this.exampleReading,
    this.exampleRomanization,
    this.exampleSpeechText,
    this.exampleTranslation,
  });

  final String displayText;
  final String speechText;
  final String meaning;
  final String? reading;
  final String? romanization;
  final String? exampleText;
  final String? exampleReading;
  final String? exampleRomanization;
  final String? exampleSpeechText;
  final String? exampleTranslation;
}

class Lesson {
  const Lesson({
    required this.id,
    required this.title,
    this.titleVi,
    this.titleByNative = const {},
    required this.track,
    required this.level,
    required this.template,
    required this.description,
    this.descriptionVi,
    this.descriptionByNative = const {},
    required this.exercises,
    this.introPoints = const [],
    this.introPointsVi = const [],
    this.introPointsByNative = const {},
    this.vocabulary = const [],
    this.estimatedMinutes = 5,
    this.comingSoon = false,
  });

  final String id;
  final String title;
  final String? titleVi;
  final Map<String, String> titleByNative;
  final String track;
  final String level;
  final LessonTemplate template;
  final String description;
  final String? descriptionVi;
  final Map<String, String> descriptionByNative;
  final List<Exercise> exercises;
  final List<String> introPoints;
  final List<String> introPointsVi;
  final Map<String, List<String>> introPointsByNative;
  final List<LessonVocabCard> vocabulary;
  final int estimatedMinutes;
  final bool comingSoon;

  String localizedTitle(String languageCode) =>
      titleByNative[languageCode] ??
      (languageCode == 'vi' && titleVi != null ? titleVi! : title);
  String localizedDescription(String languageCode) =>
      descriptionByNative[languageCode] ??
      (languageCode == 'vi' && descriptionVi != null
          ? descriptionVi!
          : description);
  List<String> localizedIntroPoints(String languageCode) =>
      introPointsByNative[languageCode] ??
      (languageCode == 'vi' && introPointsVi.isNotEmpty
          ? introPointsVi
          : introPoints);
}
