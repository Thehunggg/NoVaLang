import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../models/exam_track.dart';
import '../../models/user_profile.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/nova_mascot.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/common/responsive_page.dart';
import '../../core/utils/level_display.dart';

class LevelScreen extends ConsumerStatefulWidget {
  const LevelScreen({super.key});
  @override
  ConsumerState<LevelScreen> createState() => _LevelScreenState();
}

class _LevelScreenState extends ConsumerState<LevelScreen> {
  bool manual = false;
  String? selectedTrackId;

  @override
  void initState() {
    super.initState();
    selectedTrackId = ref.read(profileProvider).selectedTrack;
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final tracksAsync = ref.watch(
      availableExamTracksProvider(profile.learningLanguageCode),
    );

    return AppScaffold(
      title: L10n.text('level', locale),
      showBack: true,
      backPath: '/onboarding/niche',
      languageCode: locale,
      onBeforeBack: _saveDraft,
      child: ResponsivePage(
        child: tracksAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Text(error.toString()),
          data: (tracks) => _content(context, locale, profile, tracks),
        ),
      ),
    );
  }

  Widget _content(
    BuildContext context,
    String locale,
    UserProfile profile,
    List<ExamTrack> tracks,
  ) {
    final selectedTrack = tracks
        .where((track) => track.id == selectedTrackId)
        .firstOrNull;
    final selectedLevel = selectedTrack?.levelId ?? profile.levelCode;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Center(child: NovaMascot(size: 96)),
        const SizedBox(height: 16),
        OnboardingHeader(
          title: L10n.text('level', locale),
          subtitle: L10n.text('placementChoice', locale),
        ),
        const SizedBox(height: 22),
        if (!manual) ...[
          AppButton(
            label: L10n.text('takePlacement', locale),
            icon: Icons.fact_check_outlined,
            onPressed: () => context.push('/placement'),
          ),
          const SizedBox(height: 12),
          AppButton(
            label: L10n.text('manualLevel', locale),
            icon: Icons.tune,
            outlined: true,
            onPressed: () => setState(() => manual = true),
          ),
          const SizedBox(height: 12),
          AppButton(
            label: L10n.text('startBeginning', locale),
            icon: Icons.play_arrow,
            outlined: true,
            onPressed: () => _finishWithTrack(
              tracks.isNotEmpty ? tracks.first : null,
              'A0',
            ),
          ),
        ] else ...[
          for (final track in tracks) ...[
            AppCard(
              selected: selectedTrackId == track.id,
              onTap: () => setState(() => selectedTrackId = track.id),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          track.levelId == null
                              ? track.title
                              : getLevelDisplayName(
                                  track.levelId!,
                                  profile.learningLanguageCode,
                                  nativeLanguage: profile.nativeLanguageCode,
                                ),
                          style: const TextStyle(
                            fontWeight: FontWeight.w900,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          track.description,
                          style: TextStyle(
                            color: Colors.white.withValues(alpha: 0.68),
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (selectedTrackId == track.id)
                    const Icon(
                      Icons.check_circle,
                      color: Color(0xFF67E8F9),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 10),
          ],
          const SizedBox(height: 4),
          AppButton(
            label: L10n.text('continue', locale),
            onPressed: selectedTrack == null
                ? null
                : () => _finishWithTrack(selectedTrack, selectedLevel),
          ),
          const SizedBox(height: 10),
          AppButton(
            label: L10n.text('back', locale),
            icon: Icons.arrow_back,
            outlined: true,
            onPressed: () => setState(() => manual = false),
          ),
        ],
      ],
    );
  }

  Future<void> _saveDraft() async {
    if (!manual || selectedTrackId == null) return;
    final tracks = await ref.read(
      availableExamTracksProvider(
        ref.read(profileProvider).learningLanguageCode,
      ).future,
    );
    final track = tracks.where((item) => item.id == selectedTrackId).firstOrNull;
    if (track != null) {
      await ref.read(profileProvider.notifier).setExamTrack(
            trackId: track.id,
            levelCode: track.levelId,
          );
    }
  }

  Future<void> _finishWithTrack(ExamTrack? track, String level) async {
    if (track != null) {
      await ref.read(profileProvider.notifier).setExamTrack(
            trackId: track.id,
            levelCode: track.levelId ?? level,
          );
    } else {
      await ref.read(profileProvider.notifier).setLevel(level);
    }
    await ref.read(profileProvider.notifier).finishOnboarding();
    if (mounted) context.go('/learn');
  }
}
