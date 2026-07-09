import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/common/responsive_page.dart';

class GoalScreen extends ConsumerWidget {
  const GoalScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final goalsAsync = ref.watch(dailyGoalCatalogProvider);

    return AppScaffold(
      title: L10n.text('dailyGoal', locale),
      showBack: true,
      backPath: '/onboarding/learning',
      languageCode: locale,
      child: ResponsivePage(
        child: goalsAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Text(error.toString()),
          data: (goals) => Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              OnboardingHeader(
                title: L10n.text('dailyGoal', locale),
                subtitle: L10n.text('dailyGoalSubtitle', locale),
              ),
              const SizedBox(height: 20),
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
                                  color: Theme.of(
                                    context,
                                  ).colorScheme.secondary,
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        goal.localizedName(locale),
                                        style: const TextStyle(
                                          fontWeight: FontWeight.w900,
                                          fontSize: 17,
                                        ),
                                      ),
                                      Text(
                                        '${goal.minutes} ${L10n.text('minutesDay', locale)}',
                                        style: TextStyle(
                                          color: Colors.white.withValues(
                                            alpha: 0.68,
                                          ),
                                        ),
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
      ),
    );
  }
}
