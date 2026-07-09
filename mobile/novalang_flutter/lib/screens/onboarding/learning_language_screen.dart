import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../models/exam_track.dart';
import '../../models/language_option.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/language/language_option_tile.dart';
import '../../widgets/language/language_search_field.dart';

class LearningLanguageScreen extends ConsumerStatefulWidget {
  const LearningLanguageScreen({super.key});

  @override
  ConsumerState<LearningLanguageScreen> createState() =>
      _LearningLanguageScreenState();
}

class _LearningLanguageScreenState
    extends ConsumerState<LearningLanguageScreen> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.nativeLanguageCode;
    final catalogAsync = ref.watch(languageCatalogProvider);
    final tracksAsync = ref.watch(examTrackCatalogProvider);

    return AppScaffold(
      title: L10n.text('learningLanguage', locale),
      showBack: true,
      backPath: '/onboarding/basic',
      languageCode: locale,
      child: ResponsivePage(
        child: catalogAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Text(error.toString()),
          data: (catalog) {
            final items = catalog
                .where(
                  (item) => item.isSupportedAsLearning && item.matches(query),
                )
                .toList();
            final tracks = tracksAsync.maybeWhen(
              data: (value) => value,
              orElse: () => const <String, List<ExamTrack>>{},
            );

            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                OnboardingHeader(
                  title: L10n.text('learningLanguage', locale),
                  subtitle: L10n.text('learningLanguageSubtitle', locale),
                ),
                const SizedBox(height: 20),
                LanguageSearchField(
                  hint: L10n.text('searchLanguage', locale),
                  onChanged: (value) => setState(() => query = value),
                ),
                const SizedBox(height: 16),
                for (final language in items) ...[
                  LanguageOptionTile(
                    language: language,
                    trailing: _status(language, tracks),
                    onTap: () => _choose(language),
                  ),
                  const SizedBox(height: 10),
                ],
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _status(
    LanguageOption language,
    Map<String, List<ExamTrack>> tracks,
  ) {
    final languageTracks = tracks[language.code] ?? const <ExamTrack>[];
    if (languageTracks.isEmpty) {
      return const SizedBox.shrink();
    }
    final labels = languageTracks
        .where((track) => track.examTrack != null)
        .map((track) => track.examTrack!)
        .toSet()
        .join(' · ');
    if (labels.isEmpty) return const SizedBox.shrink();
    return Chip(label: Text(labels));
  }

  Future<void> _choose(LanguageOption language) async {
    await ref.read(profileProvider.notifier).setLearningLanguage(language.code);
    final tracks = await ref.read(availableExamTracksProvider(language.code).future);
    if (tracks.isNotEmpty) {
      await ref.read(profileProvider.notifier).setExamTrack(
            trackId: tracks.first.id,
            levelCode: tracks.first.levelId,
          );
    }
    if (!mounted) return;
    context.push('/onboarding/goal');
  }
}
