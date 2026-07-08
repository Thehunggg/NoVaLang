import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
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
    final locale = profile.uiLanguageCode;
    const goals = [
      (minutes: 5, en: 'Gentle', vi: 'Nhẹ nhàng'),
      (minutes: 10, en: 'Steady', vi: 'Đều đặn'),
      (minutes: 15, en: 'Focused', vi: 'Tập trung'),
      (minutes: 20, en: 'Serious', vi: 'Nghiêm túc'),
      (minutes: 25, en: 'Accelerated', vi: 'Tăng tốc'),
      (minutes: 30, en: 'Dedicated', vi: 'Chuyên tâm'),
    ];

    return AppScaffold(
      title: L10n.text('dailyGoal', locale),
      showBack: true,
      backPath: '/onboarding/learning',
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              L10n.text('dailyGoal', locale),
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 16),
            LayoutBuilder(
              builder: (context, constraints) {
                final twoColumns = constraints.maxWidth >= 520;
                return Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    for (final goal in goals)
                      SizedBox(
                        width: twoColumns
                            ? (constraints.maxWidth - 12) / 2
                            : constraints.maxWidth,
                        child: AppCard(
                          selected: profile.dailyGoalMinutes == goal.minutes,
                          onTap: () => ref
                              .read(profileProvider.notifier)
                              .setGoal(goal.minutes),
                          child: Row(
                            children: [
                              Icon(
                                Icons.schedule,
                                color: Theme.of(context).colorScheme.secondary,
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      locale == 'vi' ? goal.vi : goal.en,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w900,
                                        fontSize: 17,
                                      ),
                                    ),
                                    Text(
                                      '${goal.minutes} ${L10n.text('minutesDay', locale)}',
                                    ),
                                  ],
                                ),
                              ),
                              if (profile.dailyGoalMinutes == goal.minutes)
                                const Icon(
                                  Icons.check_circle,
                                  color: Color(0xFF67E8F9),
                                ),
                            ],
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
            const SizedBox(height: 24),
            AppButton(
              label: L10n.text('continue', locale),
              onPressed: () => context.push('/onboarding/niche'),
            ),
          ],
        ),
      ),
    );
  }
}
