import 'package:flutter/foundation.dart';
import 'package:flutter_tts/flutter_tts.dart';

import '../core/platform/app_platform.dart';

/// Device TTS helper for Basic Audio (Free/Plus). No OpenAI / cloud TTS.
///
/// On Flutter Web, [flutter_tts] may touch `dart:io` Platform APIs that throw
/// `Unsupported operation: Platform._operatingSystem`. Web therefore uses a
/// safe unavailable result and never constructs [FlutterTts].
class TtsService {
  TtsService._();

  static final TtsService instance = TtsService._();

  FlutterTts? _tts;
  bool _ready = false;
  String? _lastLocale;

  static const Map<String, String> _localeByLanguage = {
    'ja': 'ja-JP',
    'en': 'en-US',
    'ko': 'ko-KR',
    'zh': 'zh-CN',
    'vi': 'vi-VN',
  };

  FlutterTts get _engine => _tts ??= FlutterTts();

  Future<void> _ensureReady() async {
    if (_ready) return;
    await _engine.setSpeechRate(0.42);
    await _engine.setVolume(1.0);
    await _engine.setPitch(1.0);
    // Without this, `speak()`'s Future resolves as soon as playback *starts*
    // (native "speak accepted" ack), not when it finishes — so any UI that
    // uses the Future to gate "is this line currently playing" (e.g. Q14's
    // one-at-a-time audio buttons) would re-enable almost instantly while
    // audio is still audibly playing. This makes the Future track the full
    // utterance duration on supported platforms instead.
    await _engine.awaitSpeakCompletion(true);
    _ready = true;
  }

  String localeFor(String languageCode) =>
      _localeByLanguage[languageCode] ?? languageCode;

  /// Stops the current fixed-lesson utterance when a learner changes line or
  /// leaves the screen. Web remains a safe no-op because no engine is created.
  Future<void> stop() async {
    if (!AppPlatform.supportsDeviceTts || _tts == null) return;
    try {
      await _engine.stop();
    } catch (error) {
      debugPrint('[TTS] stop result=error:$error');
    }
  }

  Future<TtsSpeakResult> speak({
    required String text,
    required String languageCode,
  }) async {
    final trimmed = text.trim();
    final locale = localeFor(languageCode);
    if (trimmed.isEmpty) {
      debugPrint('[TTS] speak text= locale=$locale available=false result=empty');
      return const TtsSpeakResult(
        ok: false,
        locale: '',
        available: false,
        messageKey: 'ttsUnavailable',
      );
    }

    if (!AppPlatform.supportsDeviceTts) {
      debugPrint(
        '[TTS] speak text=$trimmed locale=$locale available=false result=web-deferred',
      );
      return TtsSpeakResult(
        ok: false,
        locale: locale,
        available: false,
        messageKey: 'ttsUnavailable',
      );
    }

    await _ensureReady();
    var available = true;
    try {
      final result = await _engine.isLanguageAvailable(locale);
      available = result == 1 || result == true || result == '1';
    } catch (_) {
      available = false;
    }

    if (!available) {
      debugPrint(
        '[TTS] speak text=$trimmed locale=$locale available=false result=unavailable',
      );
      return TtsSpeakResult(
        ok: false,
        locale: locale,
        available: false,
        messageKey: 'ttsUnavailable',
      );
    }

    if (_lastLocale != locale) {
      await _engine.setLanguage(locale);
      _lastLocale = locale;
    }

    try {
      final result = await _engine.speak(trimmed);
      final ok = result == 1 || result == true || result == '1';
      debugPrint(
        '[TTS] speak text=$trimmed locale=$locale available=true result=$result',
      );
      return TtsSpeakResult(
        ok: ok,
        locale: locale,
        available: true,
        messageKey: ok ? 'playingAudio' : 'ttsUnavailable',
      );
    } catch (error) {
      debugPrint(
        '[TTS] speak text=$trimmed locale=$locale available=true result=error:$error',
      );
      return TtsSpeakResult(
        ok: false,
        locale: locale,
        available: true,
        messageKey: 'ttsUnavailable',
      );
    }
  }
}

class TtsSpeakResult {
  const TtsSpeakResult({
    required this.ok,
    required this.locale,
    required this.available,
    required this.messageKey,
  });

  final bool ok;
  final String locale;
  final bool available;
  final String messageKey;
}
