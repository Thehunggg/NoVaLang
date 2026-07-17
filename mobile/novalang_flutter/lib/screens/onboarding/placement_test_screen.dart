import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/level_display.dart';
import '../../core/utils/localization.dart';
import '../../data/japanese_jlpt_seed.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/nova_mascot.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/learn/exercise_option_style.dart';

class PlacementTestScreen extends ConsumerStatefulWidget {
  const PlacementTestScreen({super.key});
  @override
  ConsumerState<PlacementTestScreen> createState() =>
      _PlacementTestScreenState();
}

class _PlacementTestScreenState extends ConsumerState<PlacementTestScreen> {
  int index = 0;
  int score = 0;
  String? answer;
  String? resultLevel;

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    if (resultLevel != null) {
      return _result(
        context,
        locale,
        profile.learningLanguageCode,
        profile.nativeLanguageCode,
      );
    }
    final question = japanesePlacementQuestions[index];
    final options = question.localizedOptions(locale);
    return AppScaffold(
      title: L10n.text('placementTitle', locale),
      showBack: true,
      backPath: '/onboarding/level',
      languageCode: locale,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            OnboardingHeader(
              title: L10n.text('placementTitle', locale),
              subtitle: '${index + 1}/15',
            ),
            const SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(99),
              child: LinearProgressIndicator(
                value: (index + 1) / japanesePlacementQuestions.length,
                minHeight: 6,
              ),
            ),
            const SizedBox(height: 20),
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    question.localizedPrompt(locale),
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w900,
                      color: AppTheme.questionForeground,
                    ),
                  ),
                  if (question.displayText != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      question.displayText!,
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontWeight: FontWeight.w900),
                    ),
                  ],
                  const SizedBox(height: 18),
                  for (final option in options)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 9),
                      child: SizedBox(
                        width: double.infinity,
                        child: ExerciseActionOptionChip(
                          label: option,
                          state: answer == option
                              ? ExerciseOptionVisualState.selected
                              : ExerciseOptionVisualState.available,
                          onPressed: () => setState(() => answer = option),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            AppButton(
              label: index == 14
                  ? L10n.text('placementResult', locale)
                  : L10n.text('next', locale),
              onPressed: answer == null ? null : _next,
            ),
          ],
        ),
      ),
    );
  }

  void _next() {
    final profile = ref.read(profileProvider);
    final correct = japanesePlacementQuestions[index].check(
      answer ?? '',
      profile.uiLanguageCode,
    );
    final nextScore = score + (correct ? 1 : 0);
    if (index == 14) {
      final policy = ref.read(placementPolicyProvider).value;
      setState(() {
        score = nextScore;
        resultLevel = policy?.levelForScore(nextScore) ?? 'A0';
        answer = null;
      });
    } else {
      setState(() {
        score = nextScore;
        index++;
        answer = null;
      });
    }
  }

  Widget _result(
    BuildContext context,
    String locale,
    String learningLanguage,
    String nativeLanguage,
  ) {
    final display = getLevelDisplayName(
      resultLevel!,
      learningLanguage,
      nativeLanguage: nativeLanguage,
    );
    return AppScaffold(
      title: L10n.text('placementResult', locale),
      showBack: true,
      backPath: '/onboarding/level',
      languageCode: locale,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Center(child: NovaMascot(size: 140)),
            const SizedBox(height: 16),
            OnboardingHeader(
              title: L10n.text('placementResult', locale),
              subtitle: display,
            ),
            const SizedBox(height: 8),
            Text(
              '$score/15',
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Color(0xFF67E8F9),
                fontWeight: FontWeight.w900,
                fontSize: 20,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '${L10n.text('recommended', locale)}: $display',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white.withValues(alpha: 0.72)),
            ),
            const SizedBox(height: 24),
            AppButton(
              label: L10n.text('startRecommended', locale),
              icon: Icons.play_arrow,
              onPressed: _startRecommended,
            ),
            const SizedBox(height: 10),
            AppButton(
              label: L10n.text('manualLevel', locale),
              outlined: true,
              onPressed: () => context.go('/onboarding/level'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _startRecommended() async {
    await ref.read(profileProvider.notifier).setPlacementResult(resultLevel!);
    await ref.read(profileProvider.notifier).finishOnboarding();
    if (mounted) context.go('/learn');
  }
}
