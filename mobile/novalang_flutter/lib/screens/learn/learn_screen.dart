import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/lesson_provider.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/course_unit_card.dart';

class LearnScreen extends ConsumerWidget {
  const LearnScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final units = ref.watch(courseUnitsProvider);
    final locale = profile.uiLanguageCode;
    final learningCode = profile.learningLanguageCode;

    final learningOption = ref.watch(languageByCodeProvider(learningCode));
    final trackAsync = ref.watch(availableExamTracksProvider(learningCode));
    final selectedTrack = trackAsync.maybeWhen(
      data: (tracks) =>
          tracks.where((t) => t.id == profile.selectedTrack).firstOrNull ??
          tracks.firstOrNull,
      orElse: () => null,
    );

    // Collect completed lesson IDs from saved sessions.
    final sessions = profile.lessonSessions;
    final completedIds = sessions.entries
        .where((e) => e.value['completedAt'] != null)
        .map((e) => e.key)
        .toSet();

    return AppScaffold(
      title: L10n.text('learn', locale),
      selectedNavIndex: 0,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ── Header ──────────────────────────────────────────────────────
            _Header(
              locale: locale,
              learningOption: learningOption,
              selectedTrack: selectedTrack?.title,
              completedCount: completedIds.length,
            ),
            const SizedBox(height: 20),

            // ── Course units or coming-soon ─────────────────────────────────
            if (learningCode != 'ja')
              Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 40),
                  child: Column(
                    children: [
                      const Icon(
                        Icons.construction,
                        size: 48,
                        color: Colors.white38,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        L10n.text('comingSoon', locale),
                        style: Theme.of(context).textTheme.titleMedium
                            ?.copyWith(color: Colors.white54),
                      ),
                    ],
                  ),
                ),
              )
            else
              for (int i = 0; i < units.length; i++) ...[
                CourseUnitCard(
                  unit: units[i],
                  locale: locale,
                  learningLanguage: learningCode,
                  completedLessonIds: completedIds,
                  initiallyExpanded: i == 0,
                  onLessonTap: (lesson) =>
                      context.go('/learn/${lesson.id}'),
                ),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({
    required this.locale,
    required this.learningOption,
    required this.selectedTrack,
    required this.completedCount,
  });

  final String locale;
  final dynamic learningOption;
  final String? selectedTrack;
  final int completedCount;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${learningOption.flagEmoji} ${learningOption.nativeName}'
          '${selectedTrack != null ? ' · $selectedTrack' : ''}',
          style: Theme.of(context)
              .textTheme
              .headlineSmall
              ?.copyWith(fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 6),
        Text(
          L10n.text('learnSubtitle', locale),
          style: Theme.of(context)
              .textTheme
              .bodyMedium
              ?.copyWith(color: Colors.white70),
        ),
        if (completedCount > 0) ...[
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(
                Icons.auto_awesome,
                size: 15,
                color: Color(0xFF22D3EE),
              ),
              const SizedBox(width: 6),
              Text(
                L10n.text(
                  completedCount == 1
                      ? 'lessonsCompletedSingular'
                      : 'lessonsCompletedPlural',
                  locale,
                ).replaceAll('{n}', '$completedCount'),
                style: const TextStyle(
                  color: Color(0xFF22D3EE),
                  fontWeight: FontWeight.w700,
                  fontSize: 13,
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }
}
