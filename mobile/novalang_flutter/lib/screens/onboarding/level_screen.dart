import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';

class LevelScreen extends ConsumerStatefulWidget {
  const LevelScreen({super.key});

  @override
  ConsumerState<LevelScreen> createState() => _LevelScreenState();
}

class _LevelScreenState extends ConsumerState<LevelScreen> {
  String? selectedLevel;

  @override
  void initState() {
    super.initState();
    selectedLevel = ref.read(profileProvider).levelCode;
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final native = profile.nativeLanguageCode;
    final levels = _levels(profile.learningLanguageCode);

    return AppScaffold(
      title: L10n.text('level', native),
      showBack: true,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              native == 'vi'
                  ? 'Người mới có thể bắt đầu từ Kana Starter.'
                  : 'New learners can start from Kana Starter.',
            ),
            const SizedBox(height: 16),
            for (final item in levels) ...[
              AppCard(
                selected: selectedLevel == item.code,
                onTap: item.comingSoon
                    ? null
                    : () => setState(() => selectedLevel = item.code),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.title,
                            style: Theme.of(context).textTheme.titleMedium
                                ?.copyWith(fontWeight: FontWeight.w900),
                          ),
                          const SizedBox(height: 4),
                          Text(item.description),
                        ],
                      ),
                    ),
                    if (item.comingSoon)
                      Chip(label: Text(L10n.text('comingSoon', native))),
                  ],
                ),
              ),
              const SizedBox(height: 10),
            ],
            const SizedBox(height: 16),
            AppButton(
              label: native == 'vi' ? 'Bắt đầu học' : 'Start learning',
              onPressed: selectedLevel == null ? null : _finish,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _finish() async {
    await ref.read(profileProvider.notifier).setLevel(selectedLevel!);
    await ref.read(profileProvider.notifier).finishOnboarding();
    if (!mounted) return;
    context.go('/learn');
  }

  List<_LevelItem> _levels(String languageCode) {
    if (languageCode == 'ja') {
      return const [
        _LevelItem(
          'KANA_STARTER',
          'Kana Starter',
          'Hiragana, Katakana, basic sounds, greetings.',
        ),
        _LevelItem(
          'JLPT_N5',
          'JLPT N5',
          'Particles, basic verbs, daily objects, food, and time.',
        ),
        _LevelItem(
          'JLPT_N4',
          'JLPT N4',
          'Te-form, requests, routine, directions, and shopping.',
          comingSoon: true,
        ),
        _LevelItem(
          'JLPT_N3',
          'JLPT N3',
          'Longer sentences, opinions, short reading, and repair.',
          comingSoon: true,
        ),
        _LevelItem(
          'JLPT_N2',
          'JLPT N2',
          'Nuanced grammar, longer reading, academic and workplace language.',
          comingSoon: true,
        ),
        _LevelItem(
          'JLPT_N1',
          'JLPT N1',
          'Advanced literacy and high-level professional Japanese.',
          comingSoon: true,
        ),
      ];
    }
    if (languageCode == 'en') {
      return const [
        _LevelItem('TOEIC', 'TOEIC', 'Coming soon.', comingSoon: true),
        _LevelItem('IELTS', 'IELTS', 'Coming soon.', comingSoon: true),
        _LevelItem('TOEFL', 'TOEFL', 'Coming soon.', comingSoon: true),
      ];
    }
    return const [_LevelItem('DELE', 'DELE', 'Coming soon.', comingSoon: true)];
  }
}

class _LevelItem {
  const _LevelItem(
    this.code,
    this.title,
    this.description, {
    this.comingSoon = false,
  });

  final String code;
  final String title;
  final String description;
  final bool comingSoon;
}
