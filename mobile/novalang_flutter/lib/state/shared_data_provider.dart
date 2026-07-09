import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/auth_provider_option.dart';
import '../models/daily_goal_option.dart';
import '../models/exam_track.dart';
import '../models/language_option.dart';
import '../models/niche.dart';
import '../models/placement_policy.dart';
import '../services/shared_asset_loader.dart';

/// Shared catalog providers.
///
/// Data is loaded from `assets/shared/*.json`, mirrored from `shared/config/`
/// and `shared/i18n/`. Update shared/ first, then run:
/// `npm run sync:flutter-assets`
final nicheCatalogProvider = FutureProvider<List<Niche>>((ref) async {
  final rawNiches = await SharedAssetLoader.loadList('niche_options.json');
  final labels = await SharedAssetLoader.loadMap('niche_labels.json');
  final titlesVi = Map<String, String>.from(labels['titles'] as Map);
  final categoriesVi = Map<String, String>.from(labels['categories'] as Map);

  return rawNiches
      .map((item) {
        final json = item as Map<String, dynamic>;
        final category = json['category'] as String;
        final id = json['id'] as String;
        return Niche.fromSharedJson(
          json,
          categoryVi: categoriesVi[category] ?? category,
          titleVi: titlesVi[id] ?? json['title'] as String,
        );
      })
      .toList(growable: false);
});

final groupedNichesProvider = FutureProvider<Map<String, List<Niche>>>((ref) async {
  final niches = await ref.watch(nicheCatalogProvider.future);
  final groups = <String, List<Niche>>{};
  for (final niche in niches) {
    groups.putIfAbsent(niche.category, () => []).add(niche);
  }
  return groups;
});

final languageCatalogProvider = FutureProvider<List<LanguageOption>>((ref) async {
  final raw = await SharedAssetLoader.loadList('language_options.json');
  return raw
      .map((item) => LanguageOption.fromJson(item as Map<String, dynamic>))
      .toList(growable: false);
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
          .toList(growable: false),
    ),
  );
});

final availableExamTracksProvider =
    FutureProvider.family<List<ExamTrack>, String>((ref, languageCode) async {
      final catalog = await ref.watch(examTrackCatalogProvider.future);
      return (catalog[languageCode] ?? const <ExamTrack>[])
          .where((track) => track.isAvailable)
          .toList(growable: false);
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
