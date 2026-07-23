import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';

/// Status chip for unavailable learning content.
///
/// Visual tone is intentionally distinct from Learning Language card surfaces
/// (deep navy / indigo): this badge uses a violet / electric-purple accent so
/// it never reads as a second card border.
///
/// Label always resolves via [L10n.text] with [uiLanguageCode] — never
/// [learningLanguageCode] or [nativeLanguageCode], and never a hardcoded
/// Vietnamese string in the widget.
class ComingSoonBadge extends StatelessWidget {
  const ComingSoonBadge({super.key, required this.uiLanguageCode});

  final String uiLanguageCode;

  /// Violet fill — separate from deep-navy language cards.
  static const background = Color(0x553B1D7A);

  /// Electric violet border — not the card rim color.
  static const border = Color(0xFFC4B5FD);

  static const foreground = Color(0xFFF5F3FF);

  /// Soft violet glow (kept subtle; not neon arcade).
  static const glow = Color(0x55A78BFA);

  @override
  Widget build(BuildContext context) {
    final label = L10n.text('comingSoon', uiLanguageCode);
    return Semantics(
      label: label,
      child: Container(
        key: const ValueKey('coming-soon-neon-badge'),
        padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 6),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: border, width: 1.2),
          boxShadow: const [
            BoxShadow(color: glow, blurRadius: 10, spreadRadius: -2),
          ],
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0x884C1D95), Color(0x663B1D7A)],
          ),
        ),
        child: Text(
          label,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(
            color: foreground,
            fontSize: 11,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.2,
            height: 1.15,
          ),
        ),
      ),
    );
  }
}
