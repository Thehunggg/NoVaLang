import 'package:flutter/foundation.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/platform/app_platform.dart';
import 'package:novalang_flutter/models/auth_provider_option.dart';
import 'package:novalang_flutter/services/tts_service.dart';

List<AuthProviderOption> visibleProviders(List<AuthProviderOption> providers) =>
    providers
        .where(
          (provider) =>
              provider.id != 'apple' || AppPlatform.supportsAppleSignIn,
        )
        .toList(growable: false);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('AppPlatform', () {
    test('never requires dart:io Platform for web-safe queries', () {
      // Accessing these getters must not throw Platform._operatingSystem.
      expect(AppPlatform.isWeb, isA<bool>());
      expect(AppPlatform.supportsAppleSignIn, isA<bool>());
      expect(AppPlatform.supportsDeviceTts, isA<bool>());
      expect(AppPlatform.isCupertino, isA<bool>());
    });

    test('Apple Sign In follows defaultTargetPlatform, not dart:io', () {
      final expected =
          !kIsWeb && defaultTargetPlatform == TargetPlatform.iOS;
      expect(AppPlatform.supportsAppleSignIn, expected);
    });

    test('device TTS is disabled when running as web', () {
      expect(AppPlatform.supportsDeviceTts, !kIsWeb);
    });
  });

  group('auth provider filtering', () {
    final providers = [
      const AuthProviderOption(
        id: 'google',
        labelEn: 'Google',
        labelVi: 'Google',
        implemented: true,
      ),
      const AuthProviderOption(
        id: 'apple',
        labelEn: 'Apple',
        labelVi: 'Apple',
        implemented: false,
      ),
      const AuthProviderOption(
        id: 'guest',
        labelEn: 'Guest',
        labelVi: 'Khách',
        implemented: true,
      ),
    ];

    test('filters apple using AppPlatform.supportsAppleSignIn', () {
      final visible = visibleProviders(providers);
      final hasApple = visible.any((provider) => provider.id == 'apple');
      expect(hasApple, AppPlatform.supportsAppleSignIn);
      expect(visible.any((provider) => provider.id == 'google'), isTrue);
      expect(visible.any((provider) => provider.id == 'guest'), isTrue);
    });
  });

  group('TtsService web safety', () {
    test('speak on unsupported platforms returns unavailable without throwing', () async {
      if (AppPlatform.supportsDeviceTts) {
        // Native test environments may still construct FlutterTts; skip the
        // web-deferred assertion there.
        return;
      }
      final result = await TtsService.instance.speak(
        text: 'こんにちは',
        languageCode: 'ja',
      );
      expect(result.ok, isFalse);
      expect(result.available, isFalse);
      expect(result.messageKey, 'ttsUnavailable');
    });
  });
}
