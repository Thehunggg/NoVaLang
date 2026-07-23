import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../common/app_text_field.dart';

class LanguageSearchField extends StatefulWidget {
  const LanguageSearchField({
    super.key,
    required this.hint,
    required this.onChanged,
    this.loginGlass = false,
  });

  final String hint;
  final ValueChanged<String> onChanged;
  final bool loginGlass;

  @override
  State<LanguageSearchField> createState() => _LanguageSearchFieldState();
}

class _LanguageSearchFieldState extends State<LanguageSearchField> {
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    if (!widget.loginGlass) {
      return AppTextField(hint: widget.hint, onChanged: widget.onChanged);
    }

    final base = Theme.of(context);
    final radius = BorderRadius.circular(18);
    return Focus(
      onFocusChange: (value) => setState(() => _focused = value),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeOutCubic,
        decoration: BoxDecoration(
          borderRadius: radius,
          boxShadow: [
            const BoxShadow(
              color: AppTheme.authGlassShadow,
              blurRadius: 22,
              offset: Offset(0, 10),
            ),
            if (_focused)
              BoxShadow(
                color: AppTheme.authGlassShadowCyan.withValues(alpha: 0.07),
                blurRadius: 15,
                spreadRadius: -8,
              ),
          ],
        ),
        child: Theme(
          data: base.copyWith(
            inputDecorationTheme: InputDecorationTheme(
              filled: true,
              fillColor: AppTheme.authGlassSurfaceBottom.withValues(
                alpha: 0.48,
              ),
              hintStyle: const TextStyle(
                color: AppTheme.contentDisabledForeground,
              ),
              prefixIconColor: _focused
                  ? AppTheme.contentAccentForeground
                  : AppTheme.contentSecondaryForeground,
              border: OutlineInputBorder(
                borderRadius: radius,
                borderSide: BorderSide(
                  color: AppTheme.authGlassBorder.withValues(alpha: 0.3),
                ),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: radius,
                borderSide: BorderSide(
                  color: AppTheme.authGlassBorder.withValues(alpha: 0.3),
                ),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: radius,
                borderSide: BorderSide(
                  color: AppTheme.authButtonBorderActive.withValues(
                    alpha: 0.46,
                  ),
                  width: 1.4,
                ),
              ),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 18,
                vertical: 16,
              ),
            ),
          ),
          child: AppTextField(hint: widget.hint, onChanged: widget.onChanged),
        ),
      ),
    );
  }
}
