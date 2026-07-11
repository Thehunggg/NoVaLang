import 'package:flutter/foundation.dart';
import 'package:flutter_tts/flutter_tts.dart';

/// Device TTS helper for Basic Audio (Free/Plus). No OpenAI / cloud TTS.
class TtsService {
  TtsService._();

  static final TtsService instance = TtsService._();

  final FlutterTts _tts = FlutterTts();
  bool _ready = false;
  String? _lastLocale;

  static const Map<String, String> _localeByLanguage = {
    'ja': 'ja-JP',
    'en': 'en-US',
    'ko': 'ko-KR',
    'zh': 'zh-CN',
    'vi': 'vi-VN',
  };

  Future<void> _ensureReady() async {
    if (_ready) return;
    await _tts.setSpeechRate(0.42);
    await _tts.setVolume(1.0);
    await _tts.setPitch(1.0);
    _ready = true;
  }

  String localeFor(String languageCode) =>
      _localeByLanguage[languageCode] ?? languageCode;

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

    await _ensureReady();
    var available = true;
    try {
      final result = await _tts.isLanguageAvailable(locale);
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
      await _tts.setLanguage(locale);
      _lastLocale = locale;
    }

    try {
      final result = await _tts.speak(trimmed);
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
