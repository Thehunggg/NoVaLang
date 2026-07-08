import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../data/language_options.dart';
import '../../models/language_option.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/language/device_language_suggestion.dart';
import '../../widgets/language/language_option_tile.dart';
import '../../widgets/language/language_search_field.dart';

class NativeLanguageScreen extends ConsumerStatefulWidget {
  const NativeLanguageScreen({super.key});

  @override
  ConsumerState<NativeLanguageScreen> createState() =>
      _NativeLanguageScreenState();
}

class _NativeLanguageScreenState extends ConsumerState<NativeLanguageScreen> {
  String query = '';
  bool showSuggestion = true;

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final deviceLanguage = _deviceLanguage();
    final items = languageOptions
        .where((item) => item.isSupportedAsNative && item.matches(query))
        .toList();

    return AppScaffold(
      title: L10n.text('nativeLanguage', profile.nativeLanguageCode),
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (showSuggestion && query.isEmpty && deviceLanguage != null) ...[
              DeviceLanguageSuggestion(
                language: deviceLanguage,
                onAccept: () => _choose(deviceLanguage),
                onSearchAnother: () => setState(() => showSuggestion = false),
              ),
              const SizedBox(height: 16),
            ],
            LanguageSearchField(
              hint: L10n.text('searchLanguage', profile.nativeLanguageCode),
              onChanged: (value) => setState(() => query = value),
            ),
            const SizedBox(height: 16),
            for (final language in items) ...[
              LanguageOptionTile(
                language: language,
                onTap: () => _choose(language),
              ),
              const SizedBox(height: 10),
            ],
          ],
        ),
      ),
    );
  }

  LanguageOption? _deviceLanguage() {
    final code = WidgetsBinding.instance.platformDispatcher.locale.languageCode;
    return languageOptions
        .where((item) => item.code == code && item.isSupportedAsNative)
        .firstOrNull;
  }

  Future<void> _choose(LanguageOption language) async {
    await ref.read(profileProvider.notifier).setNativeLanguage(language.code);
    if (!mounted) return;
    context.push('/onboarding/basic');
  }
}
