import 'exercise.dart';

enum LessonTemplate {
  kanaLesson,
  vocabularyLesson,
  grammarLesson,
  readingLesson,
  listeningLesson,
  miniTestLesson,
}

class Lesson {
  const Lesson({
    required this.id,
    required this.title,
    this.titleVi,
    required this.track,
    required this.level,
    required this.template,
    required this.description,
    this.descriptionVi,
    required this.exercises,
    this.introPoints = const [],
    this.introPointsVi = const [],
    this.estimatedMinutes = 5,
    this.comingSoon = false,
  });

  final String id;
  final String title;
  final String? titleVi;
  final String track;
  final String level;
  final LessonTemplate template;
  final String description;
  final String? descriptionVi;
  final List<Exercise> exercises;
  final List<String> introPoints;
  final List<String> introPointsVi;
  final int estimatedMinutes;
  final bool comingSoon;

  String localizedTitle(String languageCode) =>
      languageCode == 'vi' && titleVi != null ? titleVi! : title;
  String localizedDescription(String languageCode) =>
      languageCode == 'vi' && descriptionVi != null
      ? descriptionVi!
      : description;
  List<String> localizedIntroPoints(String languageCode) =>
      languageCode == 'vi' && introPointsVi.isNotEmpty
      ? introPointsVi
      : introPoints;
}
