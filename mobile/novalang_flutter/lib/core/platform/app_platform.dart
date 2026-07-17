import 'package:flutter/foundation.dart';

/// Safe platform queries for UI/adaptive behavior.
///
/// Never import `dart:io` here. Prefer this helper over [Platform] so Flutter
/// Web does not hit `Unsupported operation: Platform._operatingSystem`.
///
/// Do not use this for shared domain/business rules — only presentation and
/// native capability gating.
abstract final class AppPlatform {
  static bool get isWeb => kIsWeb;

  static bool get isCupertino =>
      !kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.iOS ||
          defaultTargetPlatform == TargetPlatform.macOS);

  /// Apple Sign In button is only offered on native iOS in Stage 1 UI.
  static bool get supportsAppleSignIn =>
      !kIsWeb && defaultTargetPlatform == TargetPlatform.iOS;

  /// Device TTS (flutter_tts) is native-only for now; Web uses a safe no-op.
  static bool get supportsDeviceTts => !kIsWeb;
}
