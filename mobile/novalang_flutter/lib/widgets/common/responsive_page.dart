import 'package:flutter/material.dart';

import '../../core/utils/responsive.dart';

class ResponsivePage extends StatelessWidget {
  const ResponsivePage({
    super.key,
    required this.child,
    this.scrollable = true,
    this.bottomPadding = 24,
  });

  final Widget child;
  final bool scrollable;
  final double bottomPadding;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final padding = Responsive.pagePadding(context);
        final content = Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: Responsive.maxContentWidth(context),
            ),
            child: child,
          ),
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
          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
          child: body,
        );
      },
    );
  }
}
