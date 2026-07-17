import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/localization.dart';

class ComingSoonBadge extends StatelessWidget {
  const ComingSoonBadge({super.key, required this.uiLanguageCode});

  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) {
    final label = L10n.text('comingSoon', uiLanguageCode);
    return Semantics(
      label: label,
      child: Container(
        key: const ValueKey('coming-soon-neon-badge'),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: AppTheme.comingSoonBadgeBackground,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: AppTheme.comingSoonBadgeBorder),
          boxShadow: const [
            BoxShadow(color: AppTheme.comingSoonBadgeGlow, blurRadius: 8),
          ],
        ),
        child: Text(
          label,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(
            color: AppTheme.comingSoonBadgeForeground,
            fontSize: 11,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.15,
          ),
        ),
      ),
    );
  }
}
