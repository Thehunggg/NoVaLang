import 'package:flutter/material.dart';

import '../../models/language_option.dart';
import '../common/app_button.dart';
import '../common/app_card.dart';

class DeviceLanguageSuggestion extends StatelessWidget {
  const DeviceLanguageSuggestion({
    super.key,
    required this.language,
    required this.onAccept,
    required this.onSearchAnother,
  });

  final LanguageOption language;
  final VoidCallback onAccept;
  final VoidCallback onSearchAnother;

  @override
  Widget build(BuildContext context) {
    final isVietnamese = language.code == 'vi';
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.language, color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 12),
          Text(
            isVietnamese
                ? 'Có vẻ bạn đang dùng Tiếng Việt.\nBạn có muốn chọn Tiếng Việt làm ngôn ngữ mẹ đẻ không?'
                : 'It looks like your device language is ${language.englishName}.\nDo you want to use ${language.englishName} as your native/UI language?',
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
                label: isVietnamese
                    ? 'Chọn Tiếng Việt'
                    : 'Use ${language.englishName}',
                onPressed: onAccept,
              ),
              AppButton(
                label: isVietnamese
                    ? 'Tìm ngôn ngữ khác'
                    : 'Search another language',
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
