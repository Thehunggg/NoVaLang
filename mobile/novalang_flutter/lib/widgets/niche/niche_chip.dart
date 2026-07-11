import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/niche.dart';

IconData nicheIconFor(String iconKey) {
  return switch (iconKey) {
    'chat_bubbles' || 'home' => Icons.chat_bubble_outline_rounded,
    'code' || 'laptop' => Icons.code_rounded,
    'brain' || 'chart' => Icons.psychology_alt_outlined,
    'medical_cross' || 'heart' => Icons.health_and_safety_outlined,
    'briefcase' => Icons.work_outline_rounded,
    'headset' || 'shopping_bag' => Icons.headset_mic_outlined,
    'school' || 'graduation_cap' => Icons.school_outlined,
    'gear' => Icons.settings_outlined,
    'building' || 'hammer' => Icons.apartment_outlined,
    'truck' => Icons.local_shipping_outlined,
    'wallet' || 'calculator' => Icons.account_balance_wallet_outlined,
    'megaphone' || 'edit' => Icons.campaign_outlined,
    'leaf' || 'energy' => Icons.eco_outlined,
    _ => Icons.category_outlined,
  };
}

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
    final accent = niche.isReady
        ? const Color(0xFF22D3EE)
        : Colors.orangeAccent;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => onSelected(!selected),
        onLongPress: selected ? onPrimary : null,
        borderRadius: BorderRadius.circular(18),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          constraints: const BoxConstraints(minHeight: 48),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            gradient: selected
                ? LinearGradient(
                    colors: [
                      accent.withValues(alpha: 0.28),
                      accent.withValues(alpha: 0.10),
                    ],
                  )
                : null,
            color: selected ? null : Colors.white.withValues(alpha: 0.05),
            border: Border.all(
              color: primary
                  ? accent
                  : selected
                  ? accent.withValues(alpha: 0.55)
                  : Colors.white.withValues(alpha: 0.12),
              width: primary ? 2 : 1,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                nicheIconFor(niche.iconKey),
                size: 18,
                color: selected ? accent : Colors.white54,
              ),
              const SizedBox(width: 8),
              if (primary) ...[
                Icon(Icons.star_rounded, size: 18, color: accent),
                const SizedBox(width: 6),
              ] else if (selected) ...[
                Icon(Icons.check_circle, size: 16, color: accent),
                const SizedBox(width: 6),
              ],
              Flexible(
                child: Text(
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
              ),
              if (selected && !primary) ...[
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: onPrimary,
                  child: const Icon(
                    Icons.star_outline_rounded,
                    size: 18,
                    color: Colors.white54,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
