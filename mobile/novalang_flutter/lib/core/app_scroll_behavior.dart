import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

/// App-wide [ScrollBehavior] override.
///
/// Flutter's default [MaterialScrollBehavior.dragDevices] excludes
/// [PointerDeviceKind.mouse] (touch/stylus/trackpad only), so a desktop
/// mouse click-and-drag does not pan a [Scrollable] unless a pointer kind is
/// explicitly added here. Mouse-wheel scrolling is unaffected either way —
/// it is delivered as a [PointerScrollEvent], a separate path not gated by
/// `dragDevices` — this only restores click-and-drag panning for a mouse.
class AppScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
    ...super.dragDevices,
    PointerDeviceKind.mouse,
  };
}
