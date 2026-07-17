import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/niche.dart';
import '../common/app_card.dart';
import 'niche_chip.dart';

class NicheGroupCard extends StatelessWidget {
  const NicheGroupCard({
    super.key,
    required this.category,
    required this.niches,
    required this.selectedIds,
    required this.primaryId,
    required this.onToggle,
    required this.onPrimary,
    required this.languageCode,
    this.collapsible = false,
    this.expanded = true,
    this.onExpansionChanged,
  });

  final String category;
  final List<Niche> niches;
  final Set<String> selectedIds;
  final String? primaryId;
  final void Function(String id, bool selected) onToggle;
  final ValueChanged<String> onPrimary;
  final String languageCode;
  final bool collapsible;
  final bool expanded;
  final ValueChanged<bool>? onExpansionChanged;

  @override
  Widget build(BuildContext context) {
    final containsPrimary =
        primaryId != null && niches.any((niche) => niche.id == primaryId);
    final containsSelection = niches.any(
      (niche) => selectedIds.contains(niche.id),
    );
    final selectedCount = niches
        .where((niche) => selectedIds.contains(niche.id))
        .length;
    final title = niches.isEmpty
        ? category
        : niches.first.localizedCategory(languageCode);
    final domainCount = L10n.text(
      'domainCount',
      languageCode,
    ).replaceAll('{n}', '${niches.length}');
    final selectedSummary = selectedCount == 0
        ? ''
        : L10n.text(
            'selectedDomainCount',
            languageCode,
          ).replaceAll('{count}', '$selectedCount');

    return AppCard(
      selected: containsPrimary || containsSelection,
      padding: collapsible ? EdgeInsets.zero : const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Semantics(
            button: collapsible,
            expanded: collapsible ? expanded : null,
            label: [
              title,
              domainCount,
              if (selectedSummary.isNotEmpty) selectedSummary,
            ].join(', '),
            child: InkWell(
              onTap: collapsible
                  ? () => onExpansionChanged?.call(!expanded)
                  : null,
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(24),
                bottom: Radius.circular(24),
              ),
              child: ConstrainedBox(
                constraints: const BoxConstraints(minHeight: 48),
                child: Padding(
                  padding: collapsible
                      ? const EdgeInsets.all(18)
                      : EdgeInsets.zero,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              title,
                              style: Theme.of(context).textTheme.titleMedium
                                  ?.copyWith(fontWeight: FontWeight.w900),
                            ),
                            if (collapsible) ...[
                              const SizedBox(height: 4),
                              Text(
                                [
                                  domainCount,
                                  if (selectedSummary.isNotEmpty)
                                    selectedSummary,
                                ].join(' · '),
                                style: Theme.of(context).textTheme.bodySmall
                                    ?.copyWith(color: Colors.white70),
                              ),
                            ],
                          ],
                        ),
                      ),
                      if (collapsible) ...[
                        const SizedBox(width: 12),
                        AnimatedRotation(
                          turns: expanded ? 0.5 : 0,
                          duration: const Duration(milliseconds: 180),
                          child: const Icon(
                            Icons.keyboard_arrow_down_rounded,
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
          if (!collapsible || expanded)
            Padding(
              padding: collapsible
                  ? const EdgeInsets.fromLTRB(18, 0, 18, 18)
                  : const EdgeInsets.only(top: 12),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final niche in niches)
                    NicheChip(
                      niche: niche,
                      selected: selectedIds.contains(niche.id),
                      primary: primaryId == niche.id,
                      onSelected: (value) => onToggle(niche.id, value),
                      onPrimary: () => onPrimary(niche.id),
                      languageCode: languageCode,
                    ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
