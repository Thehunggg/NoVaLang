import 'package:flutter/material.dart';

import '../../core/theme/accent_token.dart';
import '../../core/utils/icon_token.dart';
import '../../core/utils/localization.dart';
import '../../data/domain_navigation_catalog.dart';
import '../../models/domain_navigation.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_card_grid.dart';

/// Level 1 — Domain Navigation UI entry point (Learning Tracks).
///
/// This is a standalone preview/debug route (project-owner decision): it
/// does not replace or modify the existing onboarding niche flow and is not
/// added to the main bottom navigation. `professional_career` is the only
/// track with a fully built Level 2-4 catalog in this task; the other two
/// tracks open a placeholder shell page.
class DomainNavigationScreen extends StatelessWidget {
  const DomainNavigationScreen({super.key, required this.uiLanguageCode});

  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) {
    final tracks = DomainNavigationCatalog.sortedTracks();
    return AppScaffold(
      title: L10n.text('domainNavTitle', uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: ResponsiveCardGrid(
          itemCount: tracks.length,
          itemBuilder: (context, index) {
            final track = tracks[index];
            return _NavCard(
              title: L10n.text(track.nameKey, uiLanguageCode),
              description: null,
              icon: IconTokenResolver.resolve(track.iconToken),
              accent: AccentTokenResolver.resolve(track.accentToken),
              badge: null,
              onTap: () => _openTrack(context, track),
            );
          },
        ),
      ),
    );
  }

  void _openTrack(BuildContext context, LearningTrackDefinition track) {
    if (track.stableId == 'professional_career') {
      Navigator.of(context).push(
        MaterialPageRoute<void>(
          builder: (_) =>
              ProfessionalCategoriesPage(uiLanguageCode: uiLanguageCode),
        ),
      );
      return;
    }
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => _TrackShellPlaceholderPage(
          uiLanguageCode: uiLanguageCode,
          title: L10n.text(track.nameKey, uiLanguageCode),
        ),
      ),
    );
  }
}

/// Level 2 — the 6 professional category cards.
class ProfessionalCategoriesPage extends StatelessWidget {
  const ProfessionalCategoriesPage({super.key, required this.uiLanguageCode});

  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) {
    final categories = DomainNavigationCatalog.categoriesForTrack(
      'professional_career',
    );
    return AppScaffold(
      title: L10n.text('professionalCategoriesTitle', uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: ResponsiveCardGrid(
          itemCount: categories.length,
          itemBuilder: (context, index) {
            final category = categories[index];
            final domainCount = DomainNavigationCatalog.domainsForCategory(
              category.stableId,
            ).length;
            return _NavCard(
              title: L10n.text(category.nameKey, uiLanguageCode),
              description: L10n.text(category.descriptionKey, uiLanguageCode),
              icon: IconTokenResolver.resolve(category.iconToken),
              accent: AccentTokenResolver.resolve(category.accentToken),
              badge: L10n
                  .text('domainCount', uiLanguageCode)
                  .replaceAll('{n}', '$domainCount'),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => ProfessionalDomainsPage(
                    uiLanguageCode: uiLanguageCode,
                    category: category,
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

/// Level 3 — domains belonging to one professional category.
class ProfessionalDomainsPage extends StatelessWidget {
  const ProfessionalDomainsPage({
    super.key,
    required this.uiLanguageCode,
    required this.category,
  });

  final String uiLanguageCode;
  final ProfessionalCategoryDefinition category;

  @override
  Widget build(BuildContext context) {
    final domains = DomainNavigationCatalog.domainsForCategory(
      category.stableId,
    );
    return AppScaffold(
      title: L10n.text(category.nameKey, uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: ResponsiveCardGrid(
          itemCount: domains.length,
          itemBuilder: (context, index) {
            final domain = domains[index];
            return _NavCard(
              title: L10n.text(domain.nameKey, uiLanguageCode),
              description: null,
              icon: IconTokenResolver.resolve(domain.iconToken),
              accent: AccentTokenResolver.resolve(domain.accentToken),
              badge: domain.availability == CatalogAvailability.comingSoon
                  ? L10n.text('comingSoon', uiLanguageCode)
                  : L10n.text('availableNow', uiLanguageCode),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => DomainDetailPage(
                    uiLanguageCode: uiLanguageCode,
                    domain: domain,
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

/// Level 4 — domain detail / curriculum shell. No domain in this task has a
/// real curriculum yet, so every domain currently shows the "content in
/// preparation" state; this page never fabricates lesson content or
/// navigates to data that does not exist.
class DomainDetailPage extends StatelessWidget {
  const DomainDetailPage({
    super.key,
    required this.uiLanguageCode,
    required this.domain,
  });

  final String uiLanguageCode;
  final ProfessionalDomainDefinition domain;

  @override
  Widget build(BuildContext context) {
    final accent = AccentTokenResolver.resolve(domain.accentToken);
    return AppScaffold(
      title: L10n.text(domain.nameKey, uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 48),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  IconTokenResolver.resolve(domain.iconToken),
                  size: 48,
                  color: accent,
                ),
                const SizedBox(height: 16),
                if (domain.availability == CatalogAvailability.comingSoon)
                  Text(
                    L10n.text('contentInPreparation', uiLanguageCode),
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TrackShellPlaceholderPage extends StatelessWidget {
  const _TrackShellPlaceholderPage({
    required this.uiLanguageCode,
    required this.title,
  });

  final String uiLanguageCode;
  final String title;

  @override
  Widget build(BuildContext context) => AppScaffold(
    title: title,
    showBack: true,
    languageCode: uiLanguageCode,
    child: Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Text(
          L10n.text('trackShellPlaceholder', uiLanguageCode),
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.white70),
        ),
      ),
    ),
  );
}

class _NavCard extends StatelessWidget {
  const _NavCard({
    required this.title,
    required this.description,
    required this.icon,
    required this.accent,
    required this.badge,
    required this.onTap,
  });

  final String title;
  final String? description;
  final IconData icon;
  final Color accent;
  final String? badge;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final semanticLabel = [
      title,
      if (description != null && description!.isNotEmpty) description,
      if (badge != null && badge!.isNotEmpty) badge,
    ].join('. ');

    return Semantics(
      button: true,
      label: semanticLabel,
      child: Card(
        color: Colors.white.withValues(alpha: 0.045),
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.white.withValues(alpha: 0.08)),
        ),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          focusColor: accent.withValues(alpha: 0.18),
          hoverColor: Colors.white.withValues(alpha: 0.04),
          child: ConstrainedBox(
            constraints: const BoxConstraints(minHeight: 48),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [
                              accent.withValues(alpha: 0.32),
                              accent.withValues(alpha: 0.10),
                            ],
                          ),
                          border: Border.all(
                            color: accent.withValues(alpha: 0.4),
                          ),
                        ),
                        child: Icon(icon, color: accent, size: 22),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          title,
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(fontWeight: FontWeight.w800),
                        ),
                      ),
                      const Icon(
                        Icons.chevron_right,
                        color: Colors.white54,
                      ),
                    ],
                  ),
                  if (description != null && description!.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    Text(
                      description!,
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: Colors.white70,
                        height: 1.35,
                      ),
                    ),
                  ],
                  if (badge != null && badge!.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: accent.withValues(alpha: 0.16),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          child: Text(
                            badge!,
                            style: TextStyle(
                              color: accent,
                              fontWeight: FontWeight.w700,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
