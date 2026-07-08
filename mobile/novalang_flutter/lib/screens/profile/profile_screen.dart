import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../data/language_options.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.nativeLanguageCode;
    final nativeName = languageByCode(profile.nativeLanguageCode).nativeName;
    final learningName = languageByCode(
      profile.learningLanguageCode,
    ).englishName;

    return AppScaffold(
      title: L10n.text('profile', native),
      selectedNavIndex: 4,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Nova learner',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 14),
                  _row('Native/UI', nativeName),
                  _row('Learning', learningName),
                  _row('Goal', '${profile.dailyGoalMinutes} min/day'),
                  _row('Level', profile.levelCode),
                  _row('Primary focus', profile.primaryNiche ?? '-'),
                ],
              ),
            ),
            const SizedBox(height: 16),
            AppButton(
              label: native == 'vi' ? 'Tùy chọn học' : 'Learning preferences',
              icon: Icons.tune,
              onPressed: () => context.go('/profile/preferences'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Expanded(child: Text(label)),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: const TextStyle(fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }
}
