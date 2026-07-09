import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/japanese_course_data.dart';
import '../models/course_unit.dart';
import '../models/exam_track.dart';
import '../models/lesson.dart';
import 'profile_provider.dart';
import 'shared_data_provider.dart';

/// Flat list of all available lessons for the current learning language.
/// Source: japanese_course_data.dart (ported from Web shared/lessonData.ts).
final lessonProvider = Provider<List<Lesson>>((ref) {
  final language = ref.watch(profileProvider).learningLanguageCode;
  if (language == 'ja') return allJapaneseLessons;
  return const <Lesson>[];
});

/// Grouped units for the course path view.
final courseUnitsProvider = Provider<List<CourseUnit>>((ref) {
  final language = ref.watch(profileProvider).learningLanguageCode;
  if (language == 'ja') return japaneseCourseUnits;
  return const <CourseUnit>[];
});

final examTrackProvider = Provider<List<ExamTrack>>((ref) {
  final language = ref.watch(profileProvider).learningLanguageCode;
  final tracks = ref.watch(availableExamTracksProvider(language));
  return tracks.maybeWhen(
    data: (value) => value,
    orElse: () => const <ExamTrack>[],
  );
});
