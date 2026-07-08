import 'package:flutter/material.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.outlined = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool outlined;

  @override
  Widget build(BuildContext context) {
    final child = icon == null
        ? Text(label)
        : Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 20),
              const SizedBox(width: 10),
              Flexible(child: Text(label, overflow: TextOverflow.ellipsis)),
            ],
          );
    if (outlined) {
      return OutlinedButton(onPressed: onPressed, child: child);
    }
    return FilledButton(onPressed: onPressed, child: child);
  }
}
