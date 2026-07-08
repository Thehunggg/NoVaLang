import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../data/japanese_jlpt_seed.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';

class GoalScreen extends ConsumerWidget {
  const GoalScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.nativeLanguageCode;
    final goals = [5, 10, 15, 20, 30];

    return AppScaffold(
      title: L10n.text('goalTrack', native),
      showBack: true,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              native == 'vi' ? 'Mục tiêu mỗi ngày' : 'Daily goal',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final minutes in goals)
                  ChoiceChip(
                    label: Text('$minutes min'),
                    selected: profile.dailyGoalMinutes == minutes,
                    onSelected: (_) =>
                        ref.read(profileProvider.notifier).setGoal(minutes),
                  ),
              ],
            ),
            const SizedBox(height: 24),
            Text(
              native == 'vi' ? 'Lộ trình thi' : 'Exam track',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 12),
            for (final track in _tracks(profile.learningLanguageCode)) ...[
              AppCard(
                selected: profile.levelCode == track.levelCode,
                onTap: track.comingSoon
                    ? null
                    : () {
                        ref.read(profileProvider.notifier).setTrack('JLPT');
                        ref
                            .read(profileProvider.notifier)
                            .setLevel(track.levelCode);
                      },
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        track.title,
                        style: Theme.of(context).textTheme.titleMedium
                            ?.copyWith(fontWeight: FontWeight.w900),
                      ),
                    ),
                    Chip(
                      label: Text(
                        track.comingSoon
                            ? L10n.text('comingSoon', native)
                            : 'Ready',
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),
            ],
            const SizedBox(height: 16),
            AppButton(
              label: L10n.text('continue', native),
              onPressed: () => context.go('/onboarding/niche'),
            ),
          ],
        ),
      ),
    );
  }

  List<ExamTrackInfo> _tracks(String learningLanguage) {
    if (learningLanguage == 'ja') return japaneseExamTracks;
    if (learningLanguage == 'en') {
      return const [
        ExamTrackInfo(title: 'TOEIC', levelCode: 'TOEIC', comingSoon: true),
        ExamTrackInfo(title: 'IELTS', levelCode: 'IELTS', comingSoon: true),
        ExamTrackInfo(title: 'TOEFL', levelCode: 'TOEFL', comingSoon: true),
      ];
    }
    if (learningLanguage == 'es') {
      return const [
        ExamTrackInfo(title: 'DELE', levelCode: 'DELE', comingSoon: true),
      ];
    }
    return const [];
  }
}
