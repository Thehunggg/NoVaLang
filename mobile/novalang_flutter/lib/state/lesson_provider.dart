import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/japanese_jlpt_seed.dart';
import '../models/exam_track.dart';
import '../models/lesson.dart';
import 'profile_provider.dart';
import 'shared_data_provider.dart';

final lessonProvider = Provider<List<Lesson>>((ref) => japaneseLessons);

final examTrackProvider = Provider<List<ExamTrack>>((ref) {
  final language = ref.watch(profileProvider).learningLanguageCode;
  final tracks = ref.watch(availableExamTracksProvider(language));
  return tracks.maybeWhen(
    data: (value) => value,
    orElse: () => const <ExamTrack>[],
  );
});
