import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/localization.dart';
import '../../models/lesson.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/exercise_card.dart';

class LessonScreen extends ConsumerWidget {
  const LessonScreen({super.key, required this.lesson});

  final Lesson? lesson;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.nativeLanguageCode;

    if (lesson == null) {
      return AppScaffold(
        title: L10n.text('learn', native),
        showBack: true,
        selectedNavIndex: 0,
        child: const ResponsivePage(
          child: Center(child: Text('Lesson not found')),
        ),
      );
    }

    return AppScaffold(
      title: lesson!.title,
      showBack: true,
      selectedNavIndex: 0,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    lesson!.title,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(lesson!.description),
                ],
              ),
            ),
            const SizedBox(height: 12),
            if (lesson!.comingSoon)
              AppCard(child: Text(L10n.text('comingSoon', native)))
            else if (lesson!.exercises.isEmpty)
              const AppCard(child: Text('Coming soon'))
            else
              for (final exercise in lesson!.exercises) ...[
                ExerciseCard(exercise: exercise, nativeLanguageCode: native),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}
