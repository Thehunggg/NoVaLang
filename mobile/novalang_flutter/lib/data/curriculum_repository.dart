import '../models/course_unit.dart';
import '../models/curriculum.dart';
import '../models/lesson.dart';
import '../services/shared_asset_loader.dart';
import 'japanese_course_data.dart';

/// Loads shared curriculum JSON with safe fallback to japanese_course_data.dart.
class CurriculumRepository {
  CurriculumRepository._();

  static CurriculumCatalog? _cache;
  static bool _usedFallback = false;

  static bool get usedFallback => _usedFallback;

  static Future<CurriculumCatalog> load() async {
    if (_cache != null) return _cache!;
    try {
      final coursesRaw = await SharedAssetLoader.loadMap('courses.json');
      final lessonsRaw = await SharedAssetLoader.loadMap('lessons.json');
      final courseList = (coursesRaw['courses'] as List<dynamic>? ?? const [])
          .map((item) => CurriculumCourse.fromJson(item as Map<String, dynamic>))
          .toList(growable: false);
      final lessonList = (lessonsRaw['lessons'] as List<dynamic>? ?? const [])
          .map((item) => CurriculumLesson.fromJson(item as Map<String, dynamic>))
          .toList(growable: false);

      if (courseList.isEmpty || lessonList.isEmpty) {
        throw StateError('Curriculum JSON empty');
      }

      final lessonById = {
        for (final lesson in lessonList) lesson.id: lesson,
      };
      _cache = CurriculumCatalog(
        courses: courseList,
        lessons: lessonList,
        lessonById: lessonById,
      );
      _usedFallback = false;
      return _cache!;
    } catch (_) {
      _usedFallback = true;
      _cache = _fallbackCatalog();
      return _cache!;
    }
  }

  static CurriculumCatalog? peek() => _cache;

  static Lesson? findLesson(String id) {
    final fromShared = _cache?.findLesson(id)?.toLesson();
    if (fromShared != null) return fromShared;
    return lessonById(id);
  }

  static List<CourseUnit> unitsFor({
    required String languageCode,
    String? nicheId,
  }) {
    final catalog = _cache;
    if (catalog == null || catalog.isEmpty || _usedFallback) {
      if (languageCode == 'ja') return japaneseCourseUnits;
      return const [];
    }

    final courses = catalog.coursesFor(
      languageCode: languageCode,
      nicheId: nicheId,
    );
    if (courses.isEmpty) return const [];

    final units = <CourseUnit>[];
    for (final course in courses) {
      for (final unit in course.units) {
        final lessons = unit.lessonIds
            .map((id) => catalog.findLesson(id)?.toLesson())
            .whereType<Lesson>()
            .toList(growable: false);
        if (lessons.isEmpty) continue;
        units.add(
          CourseUnit(
            id: unit.id,
            title: unit.title,
            titleVi: unit.titleVi,
            levelCode: unit.levelCode,
            trackId: unit.trackId,
            goal: unit.goal,
            goalVi: unit.goalVi,
            lessons: lessons,
          ),
        );
      }
    }
    return units;
  }

  static CurriculumCatalog _fallbackCatalog() {
    final lessons = allJapaneseLessons
        .map(
          (lesson) => CurriculumLesson(
            id: lesson.id,
            languageCode: 'ja',
            nicheId: 'daily_life',
            unitId: lesson.track,
            title: lesson.title,
            titleVi: lesson.titleVi ?? lesson.title,
            track: lesson.track,
            level: lesson.level,
            template: lesson.template,
            description: lesson.description,
            descriptionVi: lesson.descriptionVi ?? lesson.description,
            estimatedMinutes: lesson.estimatedMinutes,
            comingSoon: lesson.comingSoon,
            order: 0,
            canDoObjective: lesson.description,
            canDoObjectiveVi: lesson.descriptionVi ?? lesson.description,
            objectives: const [],
            objectivesVi: const [],
            introPoints: lesson.introPoints,
            introPointsVi: lesson.introPointsVi,
            vocabulary: const [],
            keyPhrases: const [],
            dialogue: const [],
            reviewItems: const [],
            exercises: lesson.exercises,
          ),
        )
        .toList(growable: false);

    return CurriculumCatalog(
      courses: [
        CurriculumCourse(
          id: 'ja-daily_life-fallback',
          languageCode: 'ja',
          nicheId: 'daily_life',
          title: 'Japanese · Daily Life (fallback)',
          titleVi: 'Tiếng Nhật · Đời sống (fallback)',
          description: 'Fallback from japanese_course_data.dart',
          descriptionVi: 'Fallback từ japanese_course_data.dart',
          levelCode: 'A0',
          order: 1,
          unitIds: japaneseCourseUnits.map((u) => u.id).toList(),
          isComingSoon: false,
          units: japaneseCourseUnits
              .map(
                (unit) => CurriculumUnit(
                  id: unit.id,
                  title: unit.title,
                  titleVi: unit.titleVi,
                  levelCode: unit.levelCode,
                  trackId: unit.trackId,
                  goal: unit.goal,
                  goalVi: unit.goalVi,
                  order: 0,
                  lessonIds: unit.lessons.map((l) => l.id).toList(),
                ),
              )
              .toList(growable: false),
        ),
      ],
      lessons: lessons,
      lessonById: {for (final lesson in lessons) lesson.id: lesson},
    );
  }
}
