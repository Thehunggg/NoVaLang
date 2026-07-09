import 'package:flutter/material.dart';

import '../../models/language_option.dart';
import '../../core/utils/localization.dart';
import '../common/app_card.dart';

class LanguageOptionTile extends StatelessWidget {
  const LanguageOptionTile({
    super.key,
    required this.language,
    required this.onTap,
    this.trailing,
    this.languageCode = 'en',
  });

  final LanguageOption language;
  final VoidCallback onTap;
  final Widget? trailing;
  final String languageCode;

  @override
  Widget build(BuildContext context) {
    final accent = _parseColor(language.color) ??
        Theme.of(context).colorScheme.primary;

    return AppCard(
      onTap: onTap,
      child: Row(
        children: [
          Container(
            width: 52,
            height: 52,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                colors: [
                  accent.withValues(alpha: 0.35),
                  accent.withValues(alpha: 0.12),
                ],
              ),
              border: Border.all(color: accent.withValues(alpha: 0.35)),
            ),
            child: Text(
              language.flagEmoji,
              style: const TextStyle(fontSize: 24),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  language.englishName,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  language.nativeName,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white70,
                  ),
                ),
                if (language.isSupportedAsLearning) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: language.isCourseAvailable
                          ? const Color(0xFF22D3EE).withValues(alpha: 0.14)
                          : Colors.orangeAccent.withValues(alpha: 0.14),
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      language.isCourseAvailable
                          ? L10n.text('availableNow', languageCode)
                          : L10n.text('comingSoon', languageCode),
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: language.isCourseAvailable
                            ? const Color(0xFF22D3EE)
                            : Colors.orangeAccent,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
          ?trailing,
        ],
      ),
    );
  }

  Color? _parseColor(String? hex) {
    if (hex == null || hex.isEmpty) return null;
    final cleaned = hex.replaceFirst('#', '');
    if (cleaned.length != 6) return null;
    return Color(int.parse('FF$cleaned', radix: 16));
  }
}
