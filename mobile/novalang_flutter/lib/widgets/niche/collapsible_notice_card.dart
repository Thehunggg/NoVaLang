import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../common/app_card.dart';

/// Expand/collapse notice shown above the professional-focus category
/// cards. Default state is collapsed with a preview + "tap to read more"
/// affordance; the whole card (not just the affordance line) is the tap
/// target. No route change, no dialog, no bottom sheet — content just
/// pushes the cards below it down.
class CollapsibleNoticeCard extends StatefulWidget {
  const CollapsibleNoticeCard({super.key, required this.languageCode});

  final String languageCode;

  @override
  State<CollapsibleNoticeCard> createState() => _CollapsibleNoticeCardState();
}

class _CollapsibleNoticeCardState extends State<CollapsibleNoticeCard> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    final locale = widget.languageCode;
    final title = L10n.text('professionalNoticeTitle', locale);
    final bodyText = _expanded
        ? L10n.text('professionalNoticeFull', locale)
        : L10n.text('professionalNoticePreview', locale);
    final tapMore = L10n.text('professionalNoticeTapMore', locale);

    return Semantics(
      button: true,
      expanded: _expanded,
      label: title,
      child: AppCard(
        onTap: () => setState(() => _expanded = !_expanded),
        child: AnimatedSize(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeInOut,
          alignment: Alignment.topCenter,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(
                    Icons.warning_amber_rounded,
                    color: Colors.amberAccent,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      title,
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  AnimatedRotation(
                    turns: _expanded ? 0.5 : 0,
                    duration: const Duration(milliseconds: 200),
                    child: const Icon(
                      Icons.keyboard_arrow_down_rounded,
                      color: Colors.white70,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                bodyText,
                style: const TextStyle(color: Colors.white70, height: 1.4),
              ),
              if (!_expanded) ...[
                const SizedBox(height: 8),
                Text(
                  tapMore,
                  style: const TextStyle(
                    color: Color(0xFF22D3EE),
                    fontWeight: FontWeight.w700,
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
