import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import 'coming_soon_badge.dart';
import 'learning_language_elevated_card.dart';

/// Learning Language–only list with elevated soft-3D cards.
///
/// Kept separate from [LanguageSearchList] so Native/UI Language and Login
/// pickers are unaffected. Catalog filtering/status is unchanged — this
/// widget only controls presentation.
class LearningLanguageList extends StatelessWidget {
  const LearningLanguageList({
    super.key,
    required this.items,
    required this.locale,
    required this.onTap,
    this.popularCodes = const [],
    this.query = '',
    this.trailingBuilder,
  });

  final List<LanguageOption> items;
  final String locale;
  final void Function(LanguageOption language) onTap;
  final List<String> popularCodes;
  final String query;
  final Widget Function(LanguageOption language)? trailingBuilder;

  @override
  Widget build(BuildContext context) {
    final filtered = items.where((item) => item.matches(query)).toList();
    final popular = <LanguageOption>[];
    if (query.isEmpty && popularCodes.isNotEmpty) {
      for (final code in popularCodes) {
        final match = filtered.where((item) => item.code == code).firstOrNull;
        if (match != null) popular.add(match);
      }
    }
    final popularIds = popular.map((e) => e.code).toSet();
    final rest = filtered
        .where((item) => !popularIds.contains(item.code))
        .toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (popular.isNotEmpty) ...[
          Text(
            L10n.text('popularLanguages', locale),
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 12),
          for (final language in popular) ...[
            _tile(language),
            const SizedBox(height: 12),
          ],
          const SizedBox(height: 6),
          Text(
            L10n.text('allLanguages', locale),
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 12),
        ],
        for (final language in rest) ...[
          _tile(language),
          const SizedBox(height: 12),
        ],
        if (filtered.isEmpty)
          LearningLanguageElevatedCard(
            child: Text(
              L10n.text('noLanguagesFound', locale),
              style: const TextStyle(color: Colors.white70),
            ),
          ),
      ],
    );
  }

  Widget _tile(LanguageOption language) {
    return _LearningLanguageTile(
      language: language,
      locale: locale,
      trailing: trailingBuilder?.call(language),
      onTap: () => onTap(language),
    );
  }
}

class _LearningLanguageTile extends StatelessWidget {
  const _LearningLanguageTile({
    required this.language,
    required this.locale,
    required this.onTap,
    this.trailing,
  });

  final LanguageOption language;
  final String locale;
  final VoidCallback onTap;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final accent =
        _parseColor(language.color) ?? Theme.of(context).colorScheme.primary;
    final comingSoon = !language.isCourseAvailable;

    return LearningLanguageElevatedCard(
      onTap: onTap,
      muted: comingSoon,
      // Extra right/top inset keeps the Coming Soon badge clear of the card rim.
      padding: const EdgeInsets.fromLTRB(16, 16, 14, 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 52,
            height: 52,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  accent.withValues(alpha: 0.38),
                  accent.withValues(alpha: 0.12),
                ],
              ),
              border: Border.all(color: accent.withValues(alpha: 0.4)),
              boxShadow: [
                BoxShadow(
                  color: accent.withValues(alpha: 0.12),
                  blurRadius: 10,
                  spreadRadius: -4,
                ),
              ],
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
                  style: Theme.of(
                    context,
                  ).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                ),
              ],
            ),
          ),
          if (trailing != null) ...[
            const SizedBox(width: 10),
            // Inset from the elevated card rim so badge border ≠ card border.
            Padding(
              padding: const EdgeInsets.only(left: 2, right: 2),
              child: trailing,
            ),
          ] else if (comingSoon) ...[
            const SizedBox(width: 10),
            Padding(
              padding: const EdgeInsets.only(left: 2, right: 2),
              child: ComingSoonBadge(uiLanguageCode: locale),
            ),
          ],
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
