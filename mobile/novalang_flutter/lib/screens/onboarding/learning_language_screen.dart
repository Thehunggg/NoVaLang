import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../data/language_options.dart';
import '../../models/language_option.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/language/language_option_tile.dart';
import '../../widgets/language/language_search_field.dart';

class LearningLanguageScreen extends ConsumerStatefulWidget {
  const LearningLanguageScreen({super.key});

  @override
  ConsumerState<LearningLanguageScreen> createState() =>
      _LearningLanguageScreenState();
}

class _LearningLanguageScreenState
    extends ConsumerState<LearningLanguageScreen> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final items = languageOptions
        .where((item) => item.isSupportedAsLearning && item.matches(query))
        .toList();

    return AppScaffold(
      title: L10n.text('learningLanguage', profile.nativeLanguageCode),
      showBack: true,
      backPath: '/onboarding/basic',
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            LanguageSearchField(
              hint: L10n.text('searchLanguage', profile.nativeLanguageCode),
              onChanged: (value) => setState(() => query = value),
            ),
            const SizedBox(height: 16),
            for (final language in items) ...[
              LanguageOptionTile(
                language: language,
                trailing: _status(language),
                onTap: () => _choose(language),
              ),
              const SizedBox(height: 10),
            ],
          ],
        ),
      ),
    );
  }

  Widget _status(LanguageOption language) {
    if (language.code == 'ja') {
      return Chip(label: Text(language.code == 'ja' ? 'JLPT' : ''));
    }
    if (language.code == 'en') {
      return const Chip(label: Text('TOEIC · IELTS · TOEFL'));
    }
    if (language.code == 'es') {
      return const Chip(label: Text('DELE'));
    }
    return const SizedBox.shrink();
  }

  Future<void> _choose(LanguageOption language) async {
    await ref.read(profileProvider.notifier).setLearningLanguage(language.code);
    if (!mounted) return;
    context.push('/onboarding/goal');
  }
}
