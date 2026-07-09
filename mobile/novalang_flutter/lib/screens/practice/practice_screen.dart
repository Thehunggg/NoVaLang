import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/localization.dart';
import '../../state/lesson_provider.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/exercise_card.dart';

class PracticeScreen extends ConsumerWidget {
  const PracticeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final exercises = ref
        .watch(lessonProvider)
        .expand((lesson) => lesson.exercises)
        .take(4)
        .toList();

    return AppScaffold(
      title: L10n.text('practice', profile.uiLanguageCode),
      selectedNavIndex: 1,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              L10n.text('practiceTitle', profile.uiLanguageCode),
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 12),
            if (exercises.isEmpty)
              Text(L10n.text('comingSoon', profile.uiLanguageCode))
            else
              for (final exercise in exercises) ...[
                ExerciseCard(
                  exercise: exercise,
                  nativeLanguageCode: profile.nativeLanguageCode,
                ),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}
