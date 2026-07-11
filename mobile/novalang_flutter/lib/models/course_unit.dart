import 'lesson.dart';

/// A unit groups related lessons at the same level.
/// Schema mirrors the Web's [UnitBlueprint] in shared/lessonData.ts.
class CourseUnit {
  const CourseUnit({
    required this.id,
    required this.title,
    required this.titleVi,
    this.titleByNative = const {},
    required this.levelCode,
    required this.trackId,
    required this.goal,
    required this.goalVi,
    this.goalByNative = const {},
    required this.lessons,
    this.displayOrder = 1,
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
  final List<Lesson> lessons;
  final int displayOrder;

  String localizedTitle(String languageCode) =>
      titleByNative[languageCode] ?? (languageCode == 'vi' ? titleVi : title);
  String localizedGoal(String languageCode) =>
      goalByNative[languageCode] ?? (languageCode == 'vi' ? goalVi : goal);

  bool get hasAvailableLessons => lessons.any((l) => !l.comingSoon);
  int get availableCount => lessons.where((l) => !l.comingSoon).length;
}
