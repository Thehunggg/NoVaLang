import '../../services/shared_asset_loader.dart';

/// Level display labels loaded from shared/i18n/level_labels.json.
/// Source of truth: shared/i18n/level_labels.json
class LevelDisplayLabels {
  LevelDisplayLabels._(this._tracks, this.levelOrder);

  final Map<String, dynamic> _tracks;
  final List<String> levelOrder;

  static LevelDisplayLabels? _instance;

  static LevelDisplayLabels get instance =>
      _instance ?? LevelDisplayLabels._fallback();

  static bool get isLoaded => _instance != null;

  /// Preload labels before the app UI renders.
  static Future<void> load() async {
    final raw = await SharedAssetLoader.loadMap('level_labels.json');
    _instance = LevelDisplayLabels._(
      Map<String, dynamic>.from(raw['tracks'] as Map),
      (raw['levelOrder'] as List<dynamic>).cast<String>(),
    );
  }

  static LevelDisplayLabels _fallback() {
    return LevelDisplayLabels._({
      'default': {
        'labels': {
          'en': {
            'A0': 'A0',
            'A1_1': 'A1',
            'A1_2': 'A1',
            'A2_1': 'A2',
            'A2_2': 'A2',
            'B1_1': 'B1',
            'B1_2': 'B1',
            'B2': 'B2',
          },
        },
      },
      'ja': {
        'labels': {
          'en': {
            'A0': 'Kana Starter',
            'A1_1': 'JLPT N5 Early',
            'A1_2': 'JLPT N5',
            'A2_1': 'JLPT N4 Early',
            'A2_2': 'JLPT N4',
            'B1_1': 'JLPT N3 Early',
            'B1_2': 'JLPT N3',
            'B2': 'JLPT N2',
          },
          'vi': {
            'A0': 'Nhập môn Kana',
            'A1_1': 'JLPT N5 sớm',
            'A1_2': 'JLPT N5',
            'A2_1': 'JLPT N4 sớm',
            'A2_2': 'JLPT N4',
            'B1_1': 'JLPT N3 sớm',
            'B1_2': 'JLPT N3',
            'B2': 'JLPT N2',
          },
        },
      },
    }, const [
      'A0',
      'A1_1',
      'A1_2',
      'A2_1',
      'A2_2',
      'B1_1',
      'B1_2',
      'B2',
    ]);
  }

  String displayName(
    String levelCode,
    String learningLanguage, {
    String? nativeLanguage,
  }) {
    if (learningLanguage == 'ja') {
      final jaTrack = _tracks['ja'] as Map<String, dynamic>?;
      final labels = jaTrack?['labels'] as Map<String, dynamic>?;
      final locale = nativeLanguage == 'vi' ? 'vi' : 'en';
      final localeLabels = labels?[locale] as Map<String, dynamic>?;
      return localeLabels?[levelCode] as String? ?? levelCode;
    }

    final defaultTrack = _tracks['default'] as Map<String, dynamic>?;
    final labels = defaultTrack?['labels'] as Map<String, dynamic>?;
    final enLabels = labels?['en'] as Map<String, dynamic>?;
    return enLabels?[levelCode] as String? ?? levelCode;
  }
}
