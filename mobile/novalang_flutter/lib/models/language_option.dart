class LanguageOption {
  const LanguageOption({
    required this.code,
    required this.englishName,
    required this.nativeName,
    this.flagEmoji = '🌐',
    required this.aliases,
    required this.isSupportedAsNative,
    required this.isSupportedAsLearning,
    this.courseStatus = 'coming_soon',
    this.learningContentStatus,
    this.scriptType,
    this.hasFoundation = false,
    this.contentAvailabilityNote,
    this.isAvailableForUi,
    this.fallbackLocale,
    this.color,
    this.greeting,
    this.description,
    this.direction = 'ltr',
    this.heroIllustrationKey = 'default',
    this.heroAsset = 'language_hero/default.svg',
    this.heroGradient = const ['#173247', '#31465A', '#151B2A'],
    this.heroOverlayOpacity = 0.36,
    this.nativeNameReading,
  });

  final String code;
  final String englishName;
  final String nativeName;
  final String flagEmoji;
  final List<String> aliases;
  final bool isSupportedAsNative;
  final bool isSupportedAsLearning;
  final String courseStatus;
  final String? learningContentStatus;
  final String? scriptType;
  final bool hasFoundation;
  final String? contentAvailabilityNote;
  final bool? isAvailableForUi;
  final String? fallbackLocale;
  final String? color;
  final String? greeting;
  final String? description;
  final String direction;
  final String heroIllustrationKey;
  final String heroAsset;
  final List<String> heroGradient;
  final double heroOverlayOpacity;
  final String? nativeNameReading;

  bool get isCourseAvailable => courseStatus == 'available';

  bool get isComingSoonContent =>
      !isCourseAvailable ||
      learningContentStatus == 'comingSoon' ||
      courseStatus == 'coming_soon';

  factory LanguageOption.fromJson(Map<String, dynamic> json) => LanguageOption(
    code: json['code'] as String,
    englishName: json['englishName'] as String,
    nativeName: json['nativeName'] as String,
    flagEmoji: json['flagEmoji'] as String? ?? '🌐',
    aliases: (json['aliases'] as List<dynamic>? ?? const []).cast<String>(),
    isSupportedAsNative: json['isSupportedAsNative'] as bool? ?? false,
    isSupportedAsLearning: json['isSupportedAsLearning'] as bool? ?? false,
    courseStatus: json['courseStatus'] as String? ?? 'coming_soon',
    learningContentStatus: json['learningContentStatus'] as String?,
    scriptType: json['scriptType'] as String?,
    hasFoundation: json['hasFoundation'] as bool? ?? false,
    contentAvailabilityNote: json['contentAvailabilityNote'] as String?,
    isAvailableForUi: json['isAvailableForUi'] as bool?,
    fallbackLocale: json['fallbackLocale'] as String?,
    color: json['color'] as String?,
    greeting: json['greeting'] as String?,
    description: json['description'] as String?,
    direction: json['direction'] as String? ?? 'ltr',
    heroIllustrationKey: json['heroIllustrationKey'] as String? ?? 'default',
    heroAsset: json['heroAsset'] as String? ?? 'language_hero/default.svg',
    heroGradient:
        (json['heroGradient'] as List<dynamic>? ??
                const ['#173247', '#31465A', '#151B2A'])
            .map((value) => value.toString())
            .toList(growable: false),
    heroOverlayOpacity:
        (json['heroOverlayOpacity'] as num?)?.toDouble() ?? 0.36,
    nativeNameReading: json['nativeNameReading'] as String?,
  );

  bool matches(String rawQuery) {
    final query = rawQuery.trim().toLowerCase();
    if (query.isEmpty) return true;
    final haystack = [
      code,
      englishName,
      nativeName,
      ...aliases,
    ].join(' ').toLowerCase();
    return haystack.contains(query);
  }
}
