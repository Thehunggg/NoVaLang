import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import '../common/app_card.dart';
import 'coming_soon_badge.dart';
import 'language_picker_surface.dart';

/// Shared language list with Popular / All sections for large catalogs.
class LanguageSearchList extends StatelessWidget {
  const LanguageSearchList({
    super.key,
    required this.items,
    required this.locale,
    required this.onTap,
    this.popularCodes = const [],
    this.query = '',
    this.showComingSoonBadge = false,
    this.trailingBuilder,
    this.loginGlass = false,
    this.showResultsWhenQueryEmpty = true,
  });

  final List<LanguageOption> items;
  final String locale;
  final void Function(LanguageOption language) onTap;
  final List<String> popularCodes;
  final String query;
  final bool showComingSoonBadge;
  final Widget Function(LanguageOption language)? trailingBuilder;
  final bool loginGlass;
  final bool showResultsWhenQueryEmpty;

  @override
  Widget build(BuildContext context) {
    if (!showResultsWhenQueryEmpty && query.trim().isEmpty) {
      return const SizedBox.shrink();
    }

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
          const SizedBox(height: 10),
          for (final language in popular) ...[
            _tile(language),
            const SizedBox(height: 10),
          ],
          const SizedBox(height: 8),
          Text(
            L10n.text('allLanguages', locale),
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 10),
        ],
        for (final language in rest) ...[
          _tile(language),
          const SizedBox(height: 10),
        ],
        if (filtered.isEmpty)
          AppCard(
            child: Text(
              L10n.text('noLanguagesFound', locale),
              style: const TextStyle(color: Colors.white70),
            ),
          ),
      ],
    );
  }

  Widget _tile(LanguageOption language) {
    return _LanguageListTile(
      language: language,
      locale: locale,
      showComingSoonBadge: showComingSoonBadge,
      trailing: trailingBuilder?.call(language),
      loginGlass: loginGlass,
      onTap: () => onTap(language),
    );
  }
}

class _LanguageListTile extends StatelessWidget {
  const _LanguageListTile({
    required this.language,
    required this.locale,
    required this.onTap,
    this.showComingSoonBadge = false,
    this.trailing,
    this.loginGlass = false,
  });

  final LanguageOption language;
  final String locale;
  final VoidCallback onTap;
  final bool showComingSoonBadge;
  final Widget? trailing;
  final bool loginGlass;

  @override
  Widget build(BuildContext context) {
    final accent =
        _parseColor(language.color) ?? Theme.of(context).colorScheme.primary;

    final content = Row(
      children: [
        if (loginGlass)
          LanguagePickerBadge(
            accent: accent,
            child: Text(
              language.flagEmoji,
              style: const TextStyle(fontSize: 24),
            ),
          )
        else
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
                language.nativeName,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: loginGlass ? AppTheme.contentPrimaryForeground : null,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                language.englishName,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: loginGlass
                      ? AppTheme.contentSecondaryForeground
                      : Colors.white70,
                ),
              ),
              if (showComingSoonBadge && language.isComingSoonContent) ...[
                const SizedBox(height: 8),
                ComingSoonBadge(uiLanguageCode: locale),
              ],
            ],
          ),
        ),
        ?trailing,
      ],
    );

    if (loginGlass) {
      return LanguagePickerSurface(onTap: onTap, child: content);
    }
    return AppCard(onTap: onTap, child: content);
  }

  Color? _parseColor(String? hex) {
    if (hex == null || hex.isEmpty) return null;
    final cleaned = hex.replaceFirst('#', '');
    if (cleaned.length != 6) return null;
    return Color(int.parse('FF$cleaned', radix: 16));
  }
}
