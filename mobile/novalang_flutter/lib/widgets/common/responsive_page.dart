import 'package:flutter/material.dart';

import '../../core/utils/responsive.dart';

class ResponsivePage extends StatelessWidget {
  const ResponsivePage({
    super.key,
    required this.child,
    this.scrollable = true,
    this.bottomPadding = 24,
    this.pageStorageKey,
  });

  final Widget child;
  final bool scrollable;
  final double bottomPadding;
  final PageStorageKey<String>? pageStorageKey;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final padding = Responsive.pagePadding(context);
        final availableWidth = (constraints.maxWidth - padding.horizontal)
            .clamp(0.0, double.infinity);
        final configuredMaxWidth = Responsive.maxContentWidth(context);
        final contentWidth =
            configuredMaxWidth.isFinite && configuredMaxWidth < availableWidth
            ? configuredMaxWidth
            : availableWidth;
        final content = Align(
          alignment: Alignment.topCenter,
          child: SizedBox(width: contentWidth, child: child),
        );
        final body = Padding(
          padding: EdgeInsets.fromLTRB(
            padding.left,
            padding.top,
            padding.right,
            bottomPadding,
          ),
          child: content,
        );
        if (!scrollable) return body;
        return SingleChildScrollView(
          key: pageStorageKey,
          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
          child: body,
        );
      },
    );
  }
}
