import 'package:flutter/material.dart';

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
  });

  final String category;
  final List<Niche> niches;
  final Set<String> selectedIds;
  final String? primaryId;
  final void Function(String id, bool selected) onToggle;
  final ValueChanged<String> onPrimary;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            category,
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 12),
          Wrap(
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
                ),
            ],
          ),
        ],
      ),
    );
  }
}
