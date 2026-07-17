import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/niche.dart';
import '../common/app_card.dart';
import 'collapsible_notice_card.dart';
import 'niche_group_card.dart';

/// Renders every niche/domain group for the real "Trọng tâm học" (Learning
/// Focus) screen, embedding the 7 professional categories and their 27
/// domains directly on this same page — no drill-down to a separate
/// Category or Domain screen. Shared between [NicheScreen] (onboarding) and
/// [LearningPreferencesScreen] (profile) so both selection-flow screens
/// stay in sync from one grouping/rendering implementation.
class NicheGroupsList extends StatefulWidget {
  const NicheGroupsList({
    super.key,
    required this.groups,
    required this.selectedIds,
    required this.primaryId,
    required this.onToggle,
    required this.onPrimary,
    required this.languageCode,
    this.showLegacyReselectionNotice = false,
  });

  final Map<String, List<Niche>> groups;
  final Set<String> selectedIds;
  final String? primaryId;
  final void Function(String id, bool selected) onToggle;
  final ValueChanged<String> onPrimary;
  final String languageCode;
  final bool showLegacyReselectionNotice;

  /// Stable category IDs for the 7 professional categories (also used as
  /// the `category` field on each of the 27 domain niches in
  /// shared/config/niche_options.json), so they group under one
  /// professional section instead of 7 separate top-level cards.
  ///
  /// NOVALANG-DOMAIN-TAXONOMY-RESTRUCTURE-01 (2026-07-16): replaced
  /// care_health_education with health_care + education_social_services,
  /// and green_agriculture_supply_chain with
  /// agriculture_fisheries_sustainability.
  static const _professionalCategoryIds = <String>{
    'digital_technology',
    'corporate_business',
    'hospitality_customer_service',
    'engineering_production',
    'health_care',
    'education_social_services',
    'agriculture_fisheries_sustainability',
  };

  @override
  State<NicheGroupsList> createState() => _NicheGroupsListState();
}

class _NicheGroupsListState extends State<NicheGroupsList> {
  final Set<String> _expandedProfessionalCategories = <String>{};

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    var emittedProfessionalSection = false;

    for (final entry in widget.groups.entries) {
      if (NicheGroupsList._professionalCategoryIds.contains(entry.key)) {
        if (emittedProfessionalSection) continue;
        emittedProfessionalSection = true;
        children.add(_buildProfessionalSection(context));
        children.add(const SizedBox(height: 12));
        continue;
      }
      children.add(_buildGroupCard(entry));
      children.add(const SizedBox(height: 12));
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: children,
    );
  }

  Widget _buildProfessionalSection(BuildContext context) {
    final professionalEntries = widget.groups.entries
        .where(
          (entry) =>
              NicheGroupsList._professionalCategoryIds.contains(entry.key),
        )
        .toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: Text(
            L10n.text('professionalFocusSectionTitle', widget.languageCode),
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
          ),
        ),
        CollapsibleNoticeCard(languageCode: widget.languageCode),
        if (widget.showLegacyReselectionNotice) ...[
          const SizedBox(height: 12),
          AppCard(
            child: Text(
              L10n.text('legacyProfessionalFocusReselect', widget.languageCode),
              style: const TextStyle(color: Colors.amberAccent, height: 1.4),
            ),
          ),
        ],
        const SizedBox(height: 12),
        for (final entry in professionalEntries) ...[
          _buildGroupCard(entry, collapsible: true),
          const SizedBox(height: 12),
        ],
      ],
    );
  }

  Widget _buildGroupCard(
    MapEntry<String, List<Niche>> entry, {
    bool collapsible = false,
  }) {
    final expanded = _expandedProfessionalCategories.contains(entry.key);
    return NicheGroupCard(
      category: entry.key,
      niches: entry.value,
      selectedIds: widget.selectedIds,
      primaryId: widget.primaryId,
      onToggle: widget.onToggle,
      onPrimary: widget.onPrimary,
      languageCode: widget.languageCode,
      collapsible: collapsible,
      expanded: !collapsible || expanded,
      onExpansionChanged: collapsible
          ? (value) => setState(() {
              if (value) {
                _expandedProfessionalCategories.add(entry.key);
              } else {
                _expandedProfessionalCategories.remove(entry.key);
              }
            })
          : null,
    );
  }
}
