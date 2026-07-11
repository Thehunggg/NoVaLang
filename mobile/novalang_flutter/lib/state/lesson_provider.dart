import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/curriculum_repository.dart';
import '../data/japanese_course_data.dart';
import '../models/course_unit.dart';
import '../models/curriculum.dart';
import '../models/exam_track.dart';
import '../models/lesson.dart';
import '../models/user_profile.dart';
import 'profile_provider.dart';
import 'shared_data_provider.dart';

/// Legacy niche IDs → new shared niche IDs (includes exam_* aliases).
const nicheLegacyIdMap = <String, String>{
  'everyday': 'daily_life',
  'travel': 'daily_life',
  'travel_hotel': 'daily_life',
  'shopping': 'daily_life',
  'restaurant_food_service': 'daily_life',
  'culture': 'daily_life',
  'social': 'daily_life',
  'jlpt': 'exam_preparation',
  'toeic': 'exam_preparation',
  'ielts': 'exam_preparation',
  'toefl': 'exam_preparation',
  'topik': 'exam_preparation',
  'hsk': 'exam_preparation',
  'other_exams': 'exam_preparation',
  'exam': 'exam_preparation',
  'exam_jlpt': 'exam_preparation',
  'exam_jft_basic': 'exam_preparation',
  'exam_bjt': 'exam_preparation',
  'exam_ielts': 'exam_preparation',
  'exam_toeic': 'exam_preparation',
  'exam_toefl': 'exam_preparation',
  'exam_eiken': 'exam_preparation',
  'exam_topik': 'exam_preparation',
  'exam_hsk': 'exam_preparation',
  'exam_delf': 'exam_preparation',
  'exam_dalf': 'exam_preparation',
  'exam_goethe': 'exam_preparation',
  'exam_testdaf': 'exam_preparation',
  'exam_telc': 'exam_preparation',
  'exam_dele': 'exam_preparation',
  'exam_siele': 'exam_preparation',
  'business': 'business_office',
  'it': 'it_programming',
  'engineering': 'manufacturing_engineering',
  'ai_data': 'ai_data_analytics',
  'healthcare': 'healthcare',
};

String normalizeNicheId(String? raw) {
  if (raw == null || raw.isEmpty) return 'daily_life';
  return nicheLegacyIdMap[raw] ??
      UserProfile.nicheLegacyIdMap[raw] ??
      raw;
}

/// Maps a study track id (including exam_*) to a curriculum niche id.
String resolveCurriculumNicheId(String? trackId) {
  return UserProfile.resolveCurriculumNicheId(trackId);
}

String _effectiveLearningLanguage(Ref ref) =>
    UserProfile.normalizeLearningLanguageCode(
      ref.watch(profileProvider).learningLanguageCode,
    );

String? _effectiveNicheId(Ref ref) {
  final profile = ref.watch(profileProvider);
  return resolveCurriculumNicheId(profile.effectiveCurrentTrack);
}

/// Loads shared curriculum once (with fallback).
final curriculumCatalogProvider = FutureProvider<CurriculumCatalog>((ref) async {
  return CurriculumRepository.load();
});

/// Flat list of lessons for current language + current track niche.
final lessonProvider = Provider<List<Lesson>>((ref) {
  final language = _effectiveLearningLanguage(ref);
  final nicheId = _effectiveNicheId(ref);
  final profile = ref.watch(profileProvider);
  final catalogAsync = ref.watch(curriculumCatalogProvider);

  return catalogAsync.maybeWhen(
    data: (_) {
      final units = CurriculumRepository.unitsFor(
        languageCode: language,
        nicheId: nicheId,
        includeNiche: !profile.needsCoreFoundation,
        nativeLanguage: profile.nativeLanguageCode,
      );
      if (units.isNotEmpty) {
        return units.expand((unit) => unit.lessons).toList(growable: false);
      }
      // Fallback: Japanese legacy catalog when shared has no match.
      if (language == 'ja') return allJapaneseLessons;
      return const <Lesson>[];
    },
    orElse: () {
      if (language == 'ja') return allJapaneseLessons;
      return const <Lesson>[];
    },
  );
});

/// Grouped units for the Learn screen (follows effectiveCurrentTrack).
final courseUnitsProvider = Provider<List<CourseUnit>>((ref) {
  final language = _effectiveLearningLanguage(ref);
  final nicheId = _effectiveNicheId(ref);
  final profile = ref.watch(profileProvider);
  final catalogAsync = ref.watch(curriculumCatalogProvider);

  return catalogAsync.maybeWhen(
    data: (_) {
      final units = CurriculumRepository.unitsFor(
        languageCode: language,
        nicheId: nicheId,
        includeNiche: !profile.needsCoreFoundation,
        nativeLanguage: profile.nativeLanguageCode,
      );
      if (units.isNotEmpty) return units;
      if (language == 'ja') return japaneseCourseUnits;
      return const <CourseUnit>[];
    },
    orElse: () {
      if (language == 'ja') return japaneseCourseUnits;
      return const <CourseUnit>[];
    },
  );
});

/// True when language/niche has no playable curriculum yet.
final curriculumComingSoonProvider = Provider<bool>((ref) {
  final language = _effectiveLearningLanguage(ref);
  final units = ref.watch(courseUnitsProvider);
  if (units.isNotEmpty) return false;
  // Available languages without matching niche still show coming soon.
  const available = {'en', 'ja'};
  if (!available.contains(language)) return true;
  return true;
});

final examTrackProvider = Provider<List<ExamTrack>>((ref) {
  final language = _effectiveLearningLanguage(ref);
  final tracks = ref.watch(displayedExamTracksProvider(language));
  return tracks.maybeWhen(
    data: (value) => value,
    orElse: () => const <ExamTrack>[],
  );
});
