import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';

/// Soft-3D elevated surface used only by the Learning Language screen.
///
/// Opt-in by design: other language pickers keep [AppCard] / glass surfaces
/// unchanged. Depth targets premium soft-3D (not arcade neon).
class LearningLanguageElevatedCard extends StatefulWidget {
  const LearningLanguageElevatedCard({
    super.key,
    required this.child,
    this.onTap,
    this.muted = false,
    this.padding = const EdgeInsets.fromLTRB(16, 16, 16, 16),
  });

  final Widget child;
  final VoidCallback? onTap;
  final bool muted;
  final EdgeInsetsGeometry padding;

  @override
  State<LearningLanguageElevatedCard> createState() =>
      _LearningLanguageElevatedCardState();
}

class _LearningLanguageElevatedCardState
    extends State<LearningLanguageElevatedCard> {
  bool _hovered = false;
  bool _pressed = false;
  bool _focused = false;

  static const _radius = 22.0;

  // Deep navy / indigo family — distinct from the Coming Soon violet badge.
  static const _surfaceTop = Color(0xFF1A1630);
  static const _surfaceMid = Color(0xFF141028);
  static const _surfaceBottom = Color(0xFF0E0B1C);
  static const _rim = Color(0xFF3A3358);
  static const _rimActive = Color(0xFF5B4F8A);
  static const _topHighlight = Color(0x33A78BFA);
  static const _edgeCyan = Color(0x2222D3EE);
  static const _edgePurple = Color(0x286D4BD1);

  @override
  Widget build(BuildContext context) {
    final interactive = widget.onTap != null;
    final active = interactive && (_hovered || _focused);
    final lift = !interactive
        ? 0.0
        : _pressed
        ? 0.0
        : active
        ? -2.0
        : 0.0;
    final opacity = widget.muted ? 0.88 : 1.0;

    return Opacity(
      opacity: opacity,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 160),
        curve: Curves.easeOutCubic,
        transform: Matrix4.translationValues(0, lift, 0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(_radius),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: _pressed ? 0.28 : 0.42),
              blurRadius: _pressed ? 10 : 22,
              offset: Offset(0, _pressed ? 4 : 12),
              spreadRadius: -6,
            ),
            BoxShadow(
              color: _edgePurple,
              blurRadius: active ? 18 : 14,
              offset: const Offset(0, 8),
              spreadRadius: -10,
            ),
            BoxShadow(
              color: _edgeCyan,
              blurRadius: active ? 14 : 10,
              offset: const Offset(0, 2),
              spreadRadius: -8,
            ),
          ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: widget.onTap,
            onHover: interactive
                ? (value) => setState(() => _hovered = value)
                : null,
            onFocusChange: interactive
                ? (value) => setState(() => _focused = value)
                : null,
            onHighlightChanged: interactive
                ? (value) => setState(() => _pressed = value)
                : null,
            borderRadius: BorderRadius.circular(_radius),
            hoverColor: AppTheme.lessonSelectionOverlay.withValues(alpha: 0.12),
            focusColor: AppTheme.lessonSelectionOverlay.withValues(alpha: 0.16),
            splashColor: const Color(0xFF6D4BD1).withValues(alpha: 0.14),
            highlightColor: Colors.white.withValues(alpha: 0.03),
            child: Ink(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(_radius),
                gradient: const LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [_surfaceTop, _surfaceMid, _surfaceBottom],
                  stops: [0.0, 0.45, 1.0],
                ),
                border: Border.all(
                  color: active ? _rimActive : _rim,
                  width: active ? 1.35 : 1.1,
                ),
              ),
              child: Stack(
                children: [
                  // Subtle top-edge inner highlight for soft-3D volume.
                  Positioned(
                    left: 1,
                    right: 1,
                    top: 1,
                    height: 18,
                    child: IgnorePointer(
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          borderRadius: const BorderRadius.vertical(
                            top: Radius.circular(_radius - 1),
                          ),
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              _topHighlight,
                              _topHighlight.withValues(alpha: 0),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Padding(padding: widget.padding, child: widget.child),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
