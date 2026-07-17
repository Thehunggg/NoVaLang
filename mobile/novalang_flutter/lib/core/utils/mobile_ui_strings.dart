import '../../services/shared_asset_loader.dart';

/// Mobile UI strings loaded from shared/i18n/mobile_ui.json.
/// Source of truth: shared/i18n/mobile_ui.json
class MobileUiStrings {
  MobileUiStrings._(this._strings);

  final Map<String, Map<String, String>> _strings;

  static MobileUiStrings? _instance;

  static MobileUiStrings get instance => _instance ?? MobileUiStrings._empty();

  static bool get isLoaded => _instance != null;

  /// Preload UI strings before the app UI renders.
  static Future<void> load() async {
    final raw = await SharedAssetLoader.loadMap('mobile_ui.json');
    final parsed = <String, Map<String, String>>{};
    for (final entry in raw.entries) {
      final value = entry.value;
      if (value is! Map) continue;
      parsed[entry.key] = value.map(
        (locale, text) => MapEntry(locale.toString(), text.toString()),
      );
    }
    _instance = MobileUiStrings._(parsed);
  }

  static MobileUiStrings _empty() => MobileUiStrings._({});

  /// Returns null when the key or requested locale is missing from JSON.
  /// Never falls through to another language.
  String? lookup(String key, String languageCode) {
    final entry = _strings[key];
    if (entry == null) return null;
    final locale = _resolveLocale(languageCode);
    return entry[locale];
  }

  static String _resolveLocale(String languageCode) {
    final normalized = languageCode.trim().toLowerCase().replaceAll('_', '-');
    return normalized.split('-').first;
  }
}
