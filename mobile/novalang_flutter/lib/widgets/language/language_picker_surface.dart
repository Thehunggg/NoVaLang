import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';

/// Login-aligned glass surface for the native-language picker.
///
/// This component is opt-in so existing language lists keep their current
/// appearance unless a caller explicitly selects the polished picker style.
class LanguagePickerSurface extends StatefulWidget {
  const LanguagePickerSurface({
    super.key,
    required this.child,
    this.onTap,
    this.padding = const EdgeInsets.all(18),
    this.prominent = false,
  });

  final Widget child;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry padding;
  final bool prominent;

  @override
  State<LanguagePickerSurface> createState() => _LanguagePickerSurfaceState();
}

class _LanguagePickerSurfaceState extends State<LanguagePickerSurface> {
  bool _hovered = false;
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    final interactive = widget.onTap != null;
    final active = interactive && (_hovered || _focused);
    final radius = widget.prominent ? 26.0 : 20.0;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 180),
      curve: Curves.easeOutCubic,
      transform: Matrix4.translationValues(0, _hovered ? -2 : 0, 0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(radius),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: active
              ? [
                  AppTheme.authGlassEdgeStrong.withValues(alpha: 0.44),
                  AppTheme.authPortalSecondary.withValues(alpha: 0.3),
                  AppTheme.authButtonBorderActive.withValues(alpha: 0.48),
                ]
              : [
                  AppTheme.authGlassBorder.withValues(alpha: 0.28),
                  AppTheme.authPortalSecondary.withValues(alpha: 0.2),
                  AppTheme.authGlassEdgeStrong.withValues(alpha: 0.3),
                ],
        ),
        boxShadow: [
          const BoxShadow(
            color: AppTheme.authGlassShadow,
            blurRadius: 28,
            offset: Offset(0, 14),
          ),
          BoxShadow(
            color: active
                ? AppTheme.authGlassShadowCyan.withValues(alpha: 0.08)
                : AppTheme.authGlassShadowPurple.withValues(alpha: 0.06),
            blurRadius: active ? 19 : 16,
            spreadRadius: -14,
          ),
        ],
      ),
      padding: const EdgeInsets.all(1),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(radius - 1),
        child: Material(
          color: Colors.transparent,
          child: Ink(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.authGlassSurfaceTop.withValues(alpha: 0.52),
                  AppTheme.authGlassSurfaceBottom.withValues(alpha: 0.48),
                ],
              ),
            ),
            child: InkWell(
              onTap: widget.onTap,
              onHover: interactive
                  ? (value) => setState(() => _hovered = value)
                  : null,
              onFocusChange: interactive
                  ? (value) => setState(() => _focused = value)
                  : null,
              hoverColor: AppTheme.authButtonHover.withValues(alpha: 0.32),
              focusColor: AppTheme.authButtonFocus.withValues(alpha: 0.24),
              splashColor: AppTheme.authAmbientCyan.withValues(alpha: 0.12),
              highlightColor: AppTheme.authButtonPressed.withValues(
                alpha: 0.36,
              ),
              child: Padding(padding: widget.padding, child: widget.child),
            ),
          ),
        ),
      ),
    );
  }
}

/// Fixed visual column shared by the globe and language flags.
class LanguagePickerBadge extends StatelessWidget {
  const LanguagePickerBadge({
    super.key,
    required this.child,
    this.accent = AppTheme.authAmbientCyan,
    this.size = 52,
  });

  final Widget child;
  final Color accent;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            accent.withValues(alpha: 0.14),
            AppTheme.authBadgeSurfaceBottom.withValues(alpha: 0.62),
          ],
        ),
        border: Border.all(color: accent.withValues(alpha: 0.28)),
        boxShadow: [
          BoxShadow(
            color: accent.withValues(alpha: 0.07),
            blurRadius: 10,
            spreadRadius: -4,
          ),
        ],
      ),
      child: child,
    );
  }
}
