import 'package:flutter/material.dart';

import '../../core/utils/responsive.dart';
import '../common/app_button.dart';

/// Scrollable niche list with a sticky bottom action bar for Android focus selection.
class FocusSelectionLayout extends StatelessWidget {
  const FocusSelectionLayout({
    super.key,
    this.header,
    required this.body,
    required this.locale,
    required this.hasSelection,
    required this.actionLabel,
    required this.onAction,
    this.hintWhenEmpty,
  });

  final Widget? header;
  final Widget body;
  final String locale;
  final bool hasSelection;
  final String actionLabel;
  final VoidCallback? onAction;
  final String? hintWhenEmpty;

  @override
  Widget build(BuildContext context) {
    final padding = Responsive.pagePadding(context);
    final maxWidth = Responsive.maxContentWidth(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(
          child: SingleChildScrollView(
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            padding: EdgeInsets.fromLTRB(
              padding.left,
              padding.top,
              padding.right,
              12,
            ),
            child: Center(
              child: ConstrainedBox(
                constraints: BoxConstraints(maxWidth: maxWidth),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    if (header != null) ...[
                      header!,
                      const SizedBox(height: 20),
                    ],
                    body,
                  ],
                ),
              ),
            ),
          ),
        ),
        SafeArea(
          top: false,
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: const Color(0xFF090612).withValues(alpha: 0.96),
              border: Border(
                top: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
              ),
            ),
            child: Padding(
              padding: EdgeInsets.fromLTRB(
                padding.left,
                12,
                padding.right,
                16,
              ),
              child: Center(
                child: ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: maxWidth),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      if (!hasSelection && hintWhenEmpty != null) ...[
                        Text(
                          hintWhenEmpty!,
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: Colors.white54,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 10),
                      ],
                      SizedBox(
                        height: 52,
                        child: AppButton(
                          label: actionLabel,
                          onPressed: onAction,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
