import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/auth_provider_option.dart';
import '../models/daily_goal_option.dart';
import '../models/exam_track.dart';
import '../models/language_option.dart';
import '../models/niche.dart';
import '../models/placement_policy.dart';
import '../models/user_profile.dart';
import '../services/shared_asset_loader.dart';
import 'profile_provider.dart';

/// Shared catalog providers.
///
/// Data is loaded from `assets/shared/*.json`, mirrored from `shared/`.
/// Update shared/ first, then run: `npm run sync:flutter-assets`
final nicheCatalogProvider = FutureProvider<List<Niche>>((ref) async {
  final rawNiches = await SharedAssetLoader.loadList('niche_options.json');
  final labels = await SharedAssetLoader.loadMap('niche_labels.json');
  final titles = labels['titles'] as Map? ?? const {};
  final categories = labels['categories'] as Map? ?? const {};
  final descriptions = labels['descriptions'] as Map? ?? const {};

  Map<String, String> localeMap(dynamic value) {
    if (value is! Map) return const {};
    return value.map(
      (key, item) => MapEntry(key.toString(), item.toString()),
    );
  }

  return rawNiches
      .map((item) {
        final json = item as Map<String, dynamic>;
        final category = json['category'] as String;
        final id = json['id'] as String;
        final title = json['title'] as String;
        final titleLocales = localeMap(titles[id]);
        final categoryLocales = localeMap(categories[category]);
        final descriptionLocales = localeMap(descriptions[id]);
        return Niche.fromSharedJson(
          json,
          categoryVi: categoryLocales['vi'] ?? category,
          titleVi: titleLocales['vi'] ?? title,
          titleByLocale: titleLocales,
          categoryByLocale: categoryLocales,
          descriptionByLocale: descriptionLocales,
        );
      })
      .where((niche) => niche.quickSelect)
      .toList(growable: false);
});

/// Focus chips for onboarding: Daily Life + career niches + specific exam tracks
/// for the current learning language (never a generic-only Exam chip).
final groupedNichesProvider = FutureProvider<Map<String, List<Niche>>>((ref) async {
  final niches = await ref.watch(nicheCatalogProvider.future);
  final profile = ref.watch(profileProvider);
  final learningCode = UserProfile.normalizeLearningLanguageCode(
    profile.learningLanguageCode,
  );
  final examCatalog = await ref.watch(examTrackCatalogProvider.future);
  final examTracks = (examCatalog[learningCode] ?? const <ExamTrack>[])
      .where((track) => track.isDisplayed)
      .toList(growable: false)
    ..sort((a, b) => a.displayOrder.compareTo(b.displayOrder));

  final labels = await SharedAssetLoader.loadMap('niche_labels.json');
  final categories = labels['categories'] as Map? ?? const {};
  Map<String, String> categoryLocales(String category) {
    final raw = categories[category];
    if (raw is! Map) return const {};
    return raw.map((key, item) => MapEntry(key.toString(), item.toString()));
  }

  final examCategory = 'Exam Preparation';
  final examCategoryLocales = categoryLocales(examCategory);
  final examNiches = examTracks
      .map(
        (track) => Niche(
          id: track.id,
          category: examCategory,
          categoryVi: examCategoryLocales['vi'] ?? examCategory,
          title: track.localizedTitle('en'),
          titleVi: track.localizedTitle('vi'),
          description: track.localizedDescription('en'),
          descriptionByLocale: track.shortDescriptionByLocale,
          titleByLocale: track.titleByLocale,
          categoryByLocale: examCategoryLocales,
          isReady: track.isAvailable,
          iconKey: track.iconKey,
          branchType: 'exam',
          quickSelect: true,
        ),
      )
      .toList(growable: false);

  final groups = <String, List<Niche>>{};
  for (final niche in niches) {
    if (niche.id == 'exam_preparation' || niche.branchType == 'exam') {
      continue; // replaced by concrete exam tracks below
    }
    groups.putIfAbsent(niche.category, () => []).add(niche);
  }
  if (examNiches.isNotEmpty) {
    groups[examCategory] = examNiches;
  }
  return groups;
});

final languageCatalogProvider = FutureProvider<List<LanguageOption>>((ref) async {
  final raw = await SharedAssetLoader.loadList('language_options.json');
  return raw
      .map((item) => LanguageOption.fromJson(item as Map<String, dynamic>))
      .toList(growable: false);
});

/// Native/UI languages from shared/config/native_language_options.json (5 for now).
final nativeLanguageCatalogProvider = FutureProvider<List<LanguageOption>>((ref) async {
  try {
    final raw = await SharedAssetLoader.loadList('native_language_options.json');
    return raw
        .map((item) {
          final json = Map<String, dynamic>.from(item as Map);
          json['isSupportedAsLearning'] = false;
          json['isSupportedAsNative'] = true;
          return LanguageOption.fromJson(json);
        })
        .toList(growable: false);
  } catch (_) {
    // Fallback: filter learning catalog for native-capable entries.
    final all = await ref.watch(languageCatalogProvider.future);
    return all.where((item) => item.isSupportedAsNative).toList(growable: false);
  }
});

final dailyGoalCatalogProvider = FutureProvider<List<DailyGoalOption>>((ref) async {
  final raw = await SharedAssetLoader.loadList('daily_goal_options.json');
  return raw
      .map((item) => DailyGoalOption.fromJson(item as Map<String, dynamic>))
      .toList(growable: false);
});

final examTrackCatalogProvider = FutureProvider<Map<String, List<ExamTrack>>>((ref) async {
  final raw = await SharedAssetLoader.loadMap('exam_tracks.json');
  return raw.map(
    (language, tracks) => MapEntry(
      language,
      (tracks as List<dynamic>)
          .map((item) => ExamTrack.fromJson(item as Map<String, dynamic>))
          .toList(growable: false)
        ..sort((a, b) => a.displayOrder.compareTo(b.displayOrder)),
    ),
  );
});

/// Displayed exam tracks for a language (enabled, max 3 by config), including comingSoon.
final displayedExamTracksProvider =
    FutureProvider.family<List<ExamTrack>, String>((ref, languageCode) async {
      final catalog = await ref.watch(examTrackCatalogProvider.future);
      return (catalog[languageCode] ?? const <ExamTrack>[])
          .where((track) => track.isDisplayed)
          .take(3)
          .toList(growable: false);
    });

final availableExamTracksProvider =
    FutureProvider.family<List<ExamTrack>, String>((ref, languageCode) async {
      final tracks = await ref.watch(displayedExamTracksProvider(languageCode).future);
      return tracks.where((track) => track.isAvailable).toList(growable: false);
    });

final placementPolicyProvider = FutureProvider<PlacementPolicy>((ref) async {
  final raw = await SharedAssetLoader.loadMap('placement_policy.json');
  return PlacementPolicy.fromJson(raw);
});

final authProvidersProvider = FutureProvider<List<AuthProviderOption>>((ref) async {
  final raw = await SharedAssetLoader.loadList('auth_providers.json');
  return raw
      .map((item) => AuthProviderOption.fromJson(item as Map<String, dynamic>))
      .toList(growable: false);
});

LanguageOption fallbackLanguage(String code) => LanguageOption(
  code: code,
  englishName: code,
  nativeName: code,
  aliases: const [],
  isSupportedAsNative: true,
  isSupportedAsLearning: false,
);

final languageByCodeProvider = Provider.family<LanguageOption, String>((ref, code) {
  final catalog = ref.watch(languageCatalogProvider);
  return catalog.maybeWhen(
    data: (items) => items.where((item) => item.code == code).firstOrNull ??
        fallbackLanguage(code),
    orElse: () => fallbackLanguage(code),
  );
});

/// Normalize niche id using the shared legacy map on [UserProfile].
String normalizeSharedNicheId(String? raw) =>
    UserProfile.nicheLegacyIdMap[raw] ?? raw ?? 'daily_life';
