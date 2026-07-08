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
    required this.track,
    required this.level,
    required this.template,
    required this.description,
    required this.exercises,
    this.comingSoon = false,
  });

  final String id;
  final String title;
  final String track;
  final String level;
  final LessonTemplate template;
  final String description;
  final List<Exercise> exercises;
  final bool comingSoon;
}
