import 'package:flutter/material.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.iconColor,
    this.leading,
    this.leadingColumnWidth,
    this.outlined = false,
    this.fullWidth = true,
  }) : assert(icon == null || leading == null),
       assert(leadingColumnWidth == null || leadingColumnWidth > 0),
       assert(leadingColumnWidth == null || fullWidth);

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final Color? iconColor;
  final Widget? leading;
  final double? leadingColumnWidth;
  final bool outlined;
  final bool fullWidth;

  @override
  Widget build(BuildContext context) {
    final leadingWidget =
        leading ??
        (icon == null ? null : Icon(icon, size: 20, color: iconColor));
    final child = leadingWidget == null
        ? Text(
            label,
            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
          )
        : leadingColumnWidth != null
        ? Row(
            mainAxisSize: MainAxisSize.max,
            children: [
              SizedBox(
                width: leadingColumnWidth,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: leadingWidget,
                ),
              ),
              Expanded(
                child: Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.left,
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          )
        : Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              leadingWidget,
              const SizedBox(width: 12),
              Flexible(
                child: Text(
                  label,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          );

    final button = outlined
        ? OutlinedButton(onPressed: onPressed, child: child)
        : FilledButton(onPressed: onPressed, child: child);

    if (!fullWidth) return button;
    return SizedBox(width: double.infinity, child: button);
  }
}
