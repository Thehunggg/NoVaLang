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
    required this.languageCode,
  });

  final Niche niche;
  final bool selected;
  final bool primary;
  final ValueChanged<bool> onSelected;
  final VoidCallback onPrimary;
  final String languageCode;

  @override
  Widget build(BuildContext context) {
    final title = niche.localizedTitle(languageCode);
    final comingSoon = languageCode == 'vi' ? 'Sắp ra mắt' : 'Coming soon';
    final label = niche.isReady ? title : '$title · $comingSoon';
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
