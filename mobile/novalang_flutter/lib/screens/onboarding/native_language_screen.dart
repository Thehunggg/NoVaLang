import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_header.dart';
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
    final locale = profile.nativeLanguageCode;
    final catalogAsync = ref.watch(languageCatalogProvider);

    return AppScaffold(
      title: L10n.text('nativeLanguage', locale),
      showBack: true,
      backPath: '/auth',
      languageCode: locale,
      onBeforeBack: _returnToLogin,
      child: ResponsivePage(
        child: catalogAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Text(error.toString()),
          data: (catalog) {
            final deviceLanguage = _deviceLanguage(catalog);
            final items = catalog
                .where(
                  (item) => item.isSupportedAsNative && item.matches(query),
                )
                .toList();

            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                OnboardingHeader(
                  title: L10n.text('nativeLanguage', locale),
                ),
                const SizedBox(height: 20),
                if (showSuggestion &&
                    query.isEmpty &&
                    deviceLanguage != null) ...[
                  DeviceLanguageSuggestion(
                    language: deviceLanguage,
                    onAccept: () => _choose(deviceLanguage),
                    onSearchAnother: () =>
                        setState(() => showSuggestion = false),
                  ),
                  const SizedBox(height: 16),
                ],
                LanguageSearchField(
                  hint: L10n.text('searchLanguage', locale),
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
            );
          },
        ),
      ),
    );
  }

  LanguageOption? _deviceLanguage(List<LanguageOption> catalog) {
    final code =
        WidgetsBinding.instance.platformDispatcher.locale.languageCode;
    return catalog
        .where((item) => item.code == code && item.isSupportedAsNative)
        .firstOrNull;
  }

  Future<void> _returnToLogin() async {
    await ref.read(profileProvider.notifier).resetSession();
  }

  Future<void> _choose(LanguageOption language) async {
    await ref.read(profileProvider.notifier).setNativeLanguage(language.code);
    if (!mounted) return;
    context.push('/onboarding/basic');
  }
}
