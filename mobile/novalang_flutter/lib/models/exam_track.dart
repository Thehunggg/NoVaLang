import '../core/utils/localization.dart';

class ExamTrack {
  const ExamTrack({
    required this.id,
    required this.learningLanguage,
    required this.examCode,
    required this.titleByLocale,
    required this.shortDescriptionByLocale,
    required this.iconKey,
    required this.displayOrder,
    this.trackType = 'exam',
    this.enabled = true,
    this.comingSoon = false,
    this.levelId,
    /// Legacy aliases kept for older callers.
    this.language,
    this.examTrack,
    this.examLevel,
  });

  final String id;
  final String learningLanguage;
  final String examCode;

  /// Localized titles keyed by native/UI language (vi/en/ja/ko/zh).
  final Map<String, String> titleByLocale;

  /// Localized short descriptions keyed by native/UI language.
  final Map<String, String> shortDescriptionByLocale;
  final String iconKey;
  final int displayOrder;
  final String trackType;
  final bool enabled;
  final bool comingSoon;
  final String? levelId;
  final String? language;
  final String? examTrack;
  final String? examLevel;

  /// Legacy alias for [titleByLocale] (do not pass into Text widgets).
  Map<String, String> get title => titleByLocale;

  /// Legacy alias for [shortDescriptionByLocale].
  Map<String, String> get shortDescription => shortDescriptionByLocale;

  /// English fallback description for older callers; never null.
  String get description =>
      localizedMapText(shortDescriptionByLocale, 'en', fallback: examCode);

  factory ExamTrack.fromJson(Map<String, dynamic> json) {
    Map<String, String> localeMap(dynamic raw, String fallback) {
      if (raw is Map) {
        return raw.map(
          (key, value) => MapEntry(key.toString(), value?.toString() ?? ''),
        );
      }
      if (raw is String && raw.trim().isNotEmpty) {
        return {
          'en': raw,
          'vi': raw,
          'ja': raw,
          'ko': raw,
          'zh': raw,
        };
      }
      return {
        'en': fallback,
        'vi': fallback,
        'ja': fallback,
        'ko': fallback,
        'zh': fallback,
      };
    }

    final learningLanguage =
        (json['learningLanguage'] as String?) ??
        (json['language'] as String?) ??
        '';
    final examCode =
        (json['examCode'] as String?) ??
        (json['examTrack'] as String?) ??
        (json['title'] is String ? json['title'] as String : null) ??
        '';
    final titleMap = localeMap(
      json['title'],
      examCode.isNotEmpty ? examCode : (json['id'] as String? ?? ''),
    );
    final descriptionMap = localeMap(
      json['shortDescription'] ?? json['description'],
      titleMap['en'] ?? examCode,
    );

    return ExamTrack(
      id: json['id'] as String,
      learningLanguage: learningLanguage,
      examCode: examCode,
      titleByLocale: titleMap,
      shortDescriptionByLocale: descriptionMap,
      iconKey: json['iconKey'] as String? ?? 'graduation_cap',
      displayOrder: json['displayOrder'] as int? ?? 0,
      trackType: json['trackType'] as String? ?? 'exam',
      enabled: json['enabled'] as bool? ?? true,
      comingSoon: json['comingSoon'] as bool? ?? false,
      levelId: json['levelId'] as String?,
      language: learningLanguage,
      examTrack: examCode,
      examLevel: json['examLevel'] as String?,
    );
  }

  bool get isAvailable => enabled && !comingSoon;
  bool get isDisplayed => enabled;

  String localizedTitle(String languageCode) => localizedMapText(
        titleByLocale,
        languageCode,
        fallback: examCode,
      );

  String localizedDescription(String languageCode) => localizedMapText(
        shortDescriptionByLocale,
        languageCode,
        fallback: '',
      );
}
