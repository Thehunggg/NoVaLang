import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import '../common/app_button.dart';
import '../common/app_card.dart';

class DeviceLanguageSuggestion extends StatelessWidget {
  const DeviceLanguageSuggestion({
    super.key,
    required this.language,
    required this.uiLanguageCode,
    required this.onAccept,
    required this.onSearchAnother,
  });

  final LanguageOption language;
  final String uiLanguageCode;
  final VoidCallback onAccept;
  final VoidCallback onSearchAnother;

  @override
  Widget build(BuildContext context) {
    final languageName = language.nativeName;
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.language, color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 12),
          Text(
            L10n.text(
              'deviceLanguageSuggestion',
              uiLanguageCode,
            ).replaceAll('{language}', languageName),
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              AppButton(
                label: L10n.text(
                  'useDeviceLanguage',
                  uiLanguageCode,
                ).replaceAll('{language}', languageName),
                onPressed: onAccept,
              ),
              AppButton(
                label: L10n.text('searchAnotherLanguage', uiLanguageCode),
                onPressed: onSearchAnother,
                outlined: true,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
