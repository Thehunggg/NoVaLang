import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/lesson_provider.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/lesson_card.dart';

class LearnScreen extends ConsumerWidget {
  const LearnScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final lessons = ref.watch(lessonProvider);
    final native = profile.nativeLanguageCode;
    final learningOption = ref.watch(
      languageByCodeProvider(profile.learningLanguageCode),
    );
    final trackAsync = ref.watch(
      availableExamTracksProvider(profile.learningLanguageCode),
    );
    final selectedTrack = trackAsync.maybeWhen(
      data: (tracks) =>
          tracks.where((item) => item.id == profile.selectedTrack).firstOrNull ??
          tracks.firstOrNull,
      orElse: () => null,
    );

    return AppScaffold(
      title: L10n.text('learn', native),
      selectedNavIndex: 0,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              '${learningOption.flagEmoji} ${learningOption.nativeName}${selectedTrack == null ? '' : ' · ${selectedTrack.title}'}',
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 6),
            Text(
              native == 'vi'
                  ? 'Mẫu nội dung hiện tập trung vào Kana Starter và JLPT N5.'
                  : 'Sample content focuses on Kana Starter and JLPT N5.',
            ),
            const SizedBox(height: 18),
            if (profile.learningLanguageCode != 'ja')
              Center(child: Text(L10n.text('comingSoon', native)))
            else
              for (final lesson in lessons) ...[
                LessonCard(
                  lesson: lesson,
                  locale: native,
                  learningLanguage: profile.learningLanguageCode,
                  onTap: () => context.go('/learn/${lesson.id}'),
                ),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}
