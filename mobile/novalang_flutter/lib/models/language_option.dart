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
    this.color,
    this.greeting,
    this.description,
    this.direction = 'ltr',
  });

  final String code;
  final String englishName;
  final String nativeName;
  final String flagEmoji;
  final List<String> aliases;
  final bool isSupportedAsNative;
  final bool isSupportedAsLearning;
  final String courseStatus;
  final String? color;
  final String? greeting;
  final String? description;
  final String direction;

  bool get isCourseAvailable => courseStatus == 'available';

  factory LanguageOption.fromJson(Map<String, dynamic> json) => LanguageOption(
    code: json['code'] as String,
    englishName: json['englishName'] as String,
    nativeName: json['nativeName'] as String,
    flagEmoji: json['flagEmoji'] as String? ?? '🌐',
    aliases: (json['aliases'] as List<dynamic>? ?? const []).cast<String>(),
    isSupportedAsNative: json['isSupportedAsNative'] as bool? ?? false,
    isSupportedAsLearning: json['isSupportedAsLearning'] as bool? ?? false,
    courseStatus: json['courseStatus'] as String? ??
        ((json['isSupportedAsLearning'] as bool? ?? false)
            ? 'coming_soon'
            : 'coming_soon'),
    color: json['color'] as String?,
    greeting: json['greeting'] as String?,
    description: json['description'] as String?,
    direction: json['direction'] as String? ?? 'ltr',
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
