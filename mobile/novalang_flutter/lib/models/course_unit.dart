import 'lesson.dart';

/// A unit groups related lessons at the same level.
/// Schema mirrors the Web's [UnitBlueprint] in shared/lessonData.ts.
class CourseUnit {
  const CourseUnit({
    required this.id,
    required this.title,
    required this.titleVi,
    required this.levelCode,
    required this.trackId,
    required this.goal,
    required this.goalVi,
    required this.lessons,
  });

  final String id;
  final String title;
  final String titleVi;
  final String levelCode;
  final String trackId;
  final String goal;
  final String goalVi;
  final List<Lesson> lessons;

  String localizedTitle(String languageCode) =>
      languageCode == 'vi' ? titleVi : title;
  String localizedGoal(String languageCode) =>
      languageCode == 'vi' ? goalVi : goal;

  bool get hasAvailableLessons => lessons.any((l) => !l.comingSoon);
  int get availableCount => lessons.where((l) => !l.comingSoon).length;
}
