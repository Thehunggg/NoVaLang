import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/level_display.dart';
import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/nova_mascot.dart';
import '../../widgets/common/responsive_page.dart';

class LevelScreen extends ConsumerStatefulWidget {
  const LevelScreen({super.key});
  @override
  ConsumerState<LevelScreen> createState() => _LevelScreenState();
}

class _LevelScreenState extends ConsumerState<LevelScreen> {
  bool manual = false;
  String selectedLevel = 'A0';

  @override
  void initState() {
    super.initState();
    selectedLevel = ref.read(profileProvider).levelCode;
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final levels = profile.learningLanguageCode == 'ja'
        ? const ['A0', 'A1_1', 'A1_2', 'A2_1', 'A2_2', 'B1_1', 'B1_2', 'B2']
        : const ['A0', 'A1_1', 'A1_2', 'A2_1', 'A2_2', 'B1_1', 'B1_2', 'B2'];

    return AppScaffold(
      title: L10n.text('level', locale),
      showBack: true,
      backPath: '/onboarding/niche',
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Center(child: NovaMascot(size: 96)),
            Text(
              L10n.text('placementChoice', locale),
              textAlign: TextAlign.center,
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 22),
            if (!manual) ...[
              AppButton(
                label: L10n.text('takePlacement', locale),
                icon: Icons.fact_check_outlined,
                onPressed: () => context.push('/placement'),
              ),
              const SizedBox(height: 12),
              AppButton(
                label: L10n.text('manualLevel', locale),
                icon: Icons.tune,
                outlined: true,
                onPressed: () => setState(() => manual = true),
              ),
              const SizedBox(height: 12),
              AppButton(
                label: L10n.text('startBeginning', locale),
                icon: Icons.play_arrow,
                outlined: true,
                onPressed: () => _finish('A0'),
              ),
            ] else ...[
              for (final level in levels) ...[
                AppCard(
                  selected: selectedLevel == level,
                  onTap: () => setState(() => selectedLevel = level),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          getLevelDisplayName(
                            level,
                            profile.learningLanguageCode,
                          ),
                          style: const TextStyle(
                            fontWeight: FontWeight.w900,
                            fontSize: 16,
                          ),
                        ),
                      ),
                      if (selectedLevel == level)
                        const Icon(
                          Icons.check_circle,
                          color: Color(0xFF67E8F9),
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
              ],
              AppButton(
                label: L10n.text('continue', locale),
                onPressed: () => _finish(selectedLevel),
              ),
              const SizedBox(height: 10),
              TextButton.icon(
                onPressed: () => setState(() => manual = false),
                icon: const Icon(Icons.arrow_back),
                label: Text(L10n.text('back', locale)),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Future<void> _finish(String level) async {
    await ref.read(profileProvider.notifier).setLevel(level);
    await ref.read(profileProvider.notifier).finishOnboarding();
    if (mounted) context.go('/learn');
  }
}
