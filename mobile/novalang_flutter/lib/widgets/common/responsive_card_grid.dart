import 'package:flutter/material.dart';

/// A responsive card grid for the Domain Navigation shell.
///
/// Unlike [GridView] with a fixed `mainAxisExtent`, each row is a [Row] of
/// [Expanded] cards so every card's height follows its own content (longer
/// domain/category names do not get clipped), while column count adapts to
/// available width via [LayoutBuilder]/[MediaQuery] rather than a fixed
/// device size.
class ResponsiveCardGrid extends StatelessWidget {
  const ResponsiveCardGrid({
    super.key,
    required this.itemCount,
    required this.itemBuilder,
    this.maxContentWidth = 1400,
    this.spacing = 14,
  });

  final int itemCount;
  final Widget Function(BuildContext context, int index) itemBuilder;
  final double maxContentWidth;
  final double spacing;

  static int columnsForWidth(double width) {
    if (width < 600) return 1;
    if (width < 1000) return 2;
    if (width < 1500) return 3;
    return 4;
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : MediaQuery.sizeOf(context).width;
        final columns = columnsForWidth(width);
        final content = _rows(context, columns);
        return Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: maxContentWidth),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: content,
            ),
          ),
        );
      },
    );
  }

  List<Widget> _rows(BuildContext context, int columns) {
    final rows = <Widget>[];
    for (var start = 0; start < itemCount; start += columns) {
      final end = (start + columns).clamp(0, itemCount);
      final cells = <Widget>[];
      for (var i = start; i < end; i++) {
        cells.add(
          Expanded(child: itemBuilder(context, i)),
        );
        if (i < end - 1) cells.add(SizedBox(width: spacing));
      }
      // Pad the last row with empty flexible space so cards keep their
      // intended column width instead of stretching when a row is partial.
      for (var i = end; i < start + columns; i++) {
        cells.add(SizedBox(width: spacing));
        cells.add(const Expanded(child: SizedBox.shrink()));
      }
      rows.add(
        Padding(
          padding: EdgeInsets.only(bottom: spacing),
          child: IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: cells,
            ),
          ),
        ),
      );
    }
    return rows;
  }
}
