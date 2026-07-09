import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../data/japanese_course_data.dart';
import '../../models/user_profile.dart';
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
    final locale = profile.uiLanguageCode;
    final learningCode = UserProfile.normalizeLearningLanguageCode(
      profile.learningLanguageCode,
    );
    final units = ref.watch(courseUnitsProvider);
    final visibleUnits = learningCode == 'ja' && units.isEmpty
        ? japaneseCourseUnits
        : units;
    final visibleLessonCount = visibleUnits.fold<int>(
      0,
      (sum, unit) => sum + unit.lessons.length,
    );

    if (kDebugMode) {
      debugPrint(
        '[Learn] language=$learningCode raw=${profile.learningLanguageCode} '
        'level=${profile.levelCode} units=${visibleUnits.length} '
        'lessons=$visibleLessonCount',
      );
    }

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
            _Header(
              locale: locale,
              learningOption: learningOption,
              selectedTrack: selectedTrack?.title,
              completedCount: completedIds.length,
            ),
            const SizedBox(height: 20),
            if (learningCode != 'ja')
              _EmptyState(
                locale: locale,
                message: L10n.text('noLessonsForLanguage', locale),
                debugLine: kDebugMode
                    ? 'language=$learningCode · level=${profile.levelCode}'
                    : null,
              )
            else if (visibleUnits.isEmpty)
              _EmptyState(
                locale: locale,
                message: L10n.text('noLessonsForLanguage', locale),
                debugLine: kDebugMode
                    ? 'language=$learningCode · level=${profile.levelCode} · units=0'
                    : null,
              )
            else
              for (int i = 0; i < visibleUnits.length; i++) ...[
                CourseUnitCard(
                  unit: visibleUnits[i],
                  locale: locale,
                  learningLanguage: learningCode,
                  completedLessonIds: completedIds,
                  initiallyExpanded: i == 0,
                  onLessonTap: (lesson) => context.go('/learn/${lesson.id}'),
                ),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({
    required this.locale,
    required this.message,
    this.debugLine,
  });

  final String locale;
  final String message;
  final String? debugLine;

  @override
  Widget build(BuildContext context) {
    return Center(
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
              message,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white54,
              ),
            ),
            if (debugLine != null) ...[
              const SizedBox(height: 8),
              Text(
                debugLine!,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.white30,
                ),
              ),
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
