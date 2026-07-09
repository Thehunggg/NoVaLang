import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
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
    final comingSoon = L10n.text('comingSoon', languageCode);
    final label = niche.isReady ? title : '$title · $comingSoon';
    return InputChip(
      selected: selected,
      showCheckmark: true,
      avatar: primary
          ? const Icon(Icons.star, size: 18, color: Color(0xFF22D3EE))
          : null,
      label: Text(
        label,
        style: TextStyle(
          fontWeight: primary
              ? FontWeight.w800
              : selected
              ? FontWeight.w700
              : FontWeight.w500,
          color: selected ? Colors.white : Colors.white70,
        ),
      ),
      selectedColor: const Color(0xFF22D3EE).withValues(alpha: 0.24),
      backgroundColor: Colors.white.withValues(alpha: 0.06),
      checkmarkColor: const Color(0xFF22D3EE),
      side: BorderSide(
        color: primary
            ? const Color(0xFF22D3EE)
            : selected
            ? const Color(0xFF22D3EE).withValues(alpha: 0.55)
            : Colors.white.withValues(alpha: 0.14),
        width: primary ? 2 : 1,
      ),
      onSelected: onSelected,
      onPressed: selected ? onPrimary : null,
    );
  }
}
