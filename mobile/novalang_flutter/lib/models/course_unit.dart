import 'lesson.dart';
import '../core/utils/native_content.dart';

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
    this.moduleId,
    this.moduleTitle,
    this.moduleTitleByNative = const {},
    this.levelRange,
    this.moduleOrder = 0,
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
  final String? moduleId;
  final String? moduleTitle;
  final Map<String, String> moduleTitleByNative;
  final String? levelRange;
  final int moduleOrder;

  String localizedTitle(String languageCode) => strictNativeText(
    titleByNative,
    languageCode,
    path: 'unit.$id.title',
    legacy: languageCode == 'vi' ? titleVi : title,
  );
  String localizedGoal(String languageCode) => strictNativeText(
    goalByNative,
    languageCode,
    path: 'unit.$id.goal',
    legacy: languageCode == 'vi' ? goalVi : goal,
  );
  String localizedModuleTitle(String languageCode) => strictNativeText(
    moduleTitleByNative,
    languageCode,
    path: 'module.${moduleId ?? id}.title',
    legacy: moduleTitle ?? moduleId ?? '',
  );

  String get levelBadge =>
      (levelRange != null && levelRange!.isNotEmpty) ? levelRange! : levelCode;

  bool get hasAvailableLessons => lessons.any((l) => !l.isBlueprint);
  int get availableCount => lessons.where((l) => !l.isBlueprint).length;
  bool get isBlueprintModule =>
      lessons.isNotEmpty && lessons.every((l) => l.isBlueprint);
}

/// Groups flat [CourseUnit]s by module for Daily Life roadmap UI.
class CurriculumModuleGroup {
  CurriculumModuleGroup({
    required this.moduleId,
    required this.moduleTitle,
    required this.moduleTitleByNative,
    required List<CourseUnit> units,
    this.levelRange,
    this.moduleOrder = 0,
    this.goal = '',
    this.goalByNative = const {},
  }) : units = List<CourseUnit>.from(units);

  final String moduleId;
  final String moduleTitle;
  final Map<String, String> moduleTitleByNative;
  final List<CourseUnit> units;
  final String? levelRange;
  final int moduleOrder;
  final String goal;
  final Map<String, String> goalByNative;

  String localizedTitle(String locale) => strictNativeText(
    moduleTitleByNative,
    locale,
    path: 'module.$moduleId.title',
    legacy: moduleTitle,
  );

  String localizedGoal(String locale) => strictNativeText(
    goalByNative,
    locale,
    path: 'module.$moduleId.goal',
    legacy: goal,
  );

  int get unitCount => units.length;
  int get lessonCount =>
      units.fold(0, (sum, unit) => sum + unit.lessons.length);

  String get levelBadge {
    if (levelRange != null && levelRange!.isNotEmpty) return levelRange!;
    return units.isNotEmpty ? units.first.levelBadge : '';
  }

  bool get isBlueprint => units.every((u) => u.isBlueprintModule);

  static List<CurriculumModuleGroup> fromUnits(List<CourseUnit> units) {
    final order = <String>[];
    final map = <String, CurriculumModuleGroup>{};

    for (final unit in units) {
      final moduleId = unit.moduleId;
      if (moduleId == null || moduleId.isEmpty) {
        final key = 'unit:${unit.id}';
        order.add(key);
        map[key] = CurriculumModuleGroup(
          moduleId: unit.id,
          moduleTitle: unit.title,
          moduleTitleByNative: unit.titleByNative,
          units: [unit],
          levelRange: unit.levelRange,
          moduleOrder: unit.moduleOrder,
          goal: unit.goal,
          goalByNative: unit.goalByNative,
        );
        continue;
      }

      final existing = map[moduleId];
      if (existing == null) {
        order.add(moduleId);
        map[moduleId] = CurriculumModuleGroup(
          moduleId: moduleId,
          moduleTitle: unit.moduleTitle ?? moduleId,
          moduleTitleByNative: unit.moduleTitleByNative,
          units: [unit],
          levelRange: unit.levelRange,
          moduleOrder: unit.moduleOrder,
          goal: unit.goal,
          goalByNative: unit.goalByNative,
        );
      } else {
        existing.units.add(unit);
      }
    }

    return [for (final key in order) map[key]!]
      ..sort((a, b) => a.moduleOrder.compareTo(b.moduleOrder));
  }
}
