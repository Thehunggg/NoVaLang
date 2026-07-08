import 'package:flutter/material.dart';

import '../../models/niche.dart';

class NicheChip extends StatelessWidget {
  const NicheChip({
    super.key,
    required this.niche,
    required this.selected,
    required this.primary,
    required this.onSelected,
    required this.onPrimary,
  });

  final Niche niche;
  final bool selected;
  final bool primary;
  final ValueChanged<bool> onSelected;
  final VoidCallback onPrimary;

  @override
  Widget build(BuildContext context) {
    final label = niche.isReady ? niche.title : '${niche.title} · Coming soon';
    return InputChip(
      selected: selected,
      avatar: primary ? const Icon(Icons.star, size: 18) : null,
      label: Text(label),
      onSelected: onSelected,
      onPressed: selected ? onPrimary : null,
      showCheckmark: true,
    );
  }
}
