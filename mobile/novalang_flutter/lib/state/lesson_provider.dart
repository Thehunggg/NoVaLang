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

/// Legacy niche IDs → new shared niche IDs.
const nicheLegacyIdMap = <String, String>{
  'everyday': 'daily_life',
  'travel': 'travel_hotel',
  'shopping': 'restaurant_food_service',
  'culture': 'daily_life',
  'social': 'daily_life',
  'jlpt': 'daily_life',
  'toeic': 'daily_life',
  'ielts': 'daily_life',
  'toefl': 'daily_life',
  'other_exams': 'daily_life',
  'business': 'business_office',
  'it': 'it_programming',
  'engineering': 'manufacturing_engineering',
  'ai_data': 'ai_data_analytics',
  'healthcare': 'healthcare',
};

String normalizeNicheId(String? raw) {
  if (raw == null || raw.isEmpty) return 'daily_life';
  return nicheLegacyIdMap[raw] ?? raw;
}

String _effectiveLearningLanguage(Ref ref) =>
    UserProfile.normalizeLearningLanguageCode(
      ref.watch(profileProvider).learningLanguageCode,
    );

String? _effectiveNicheId(Ref ref) {
  final profile = ref.watch(profileProvider);
  final primary = normalizeNicheId(profile.primaryNiche);
  if (profile.selectedNiches.isEmpty) return primary;
  return primary;
}

/// Loads shared curriculum once (with fallback).
final curriculumCatalogProvider = FutureProvider<CurriculumCatalog>((ref) async {
  return CurriculumRepository.load();
});

/// Flat list of lessons for current language + primary niche.
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

/// Grouped units for the Learn screen.
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
  final tracks = ref.watch(availableExamTracksProvider(language));
  return tracks.maybeWhen(
    data: (value) => value,
    orElse: () => const <ExamTrack>[],
  );
});
