class LanguageOption {
  const LanguageOption({
    required this.code,
    required this.englishName,
    required this.nativeName,
    this.flagEmoji = '🌐',
    required this.aliases,
    required this.isSupportedAsNative,
    required this.isSupportedAsLearning,
  });

  final String code;
  final String englishName;
  final String nativeName;
  final String flagEmoji;
  final List<String> aliases;
  final bool isSupportedAsNative;
  final bool isSupportedAsLearning;

  factory LanguageOption.fromJson(Map<String, dynamic> json) => LanguageOption(
    code: json['code'] as String,
    englishName: json['englishName'] as String,
    nativeName: json['nativeName'] as String,
    flagEmoji: json['flagEmoji'] as String? ?? '🌐',
    aliases: (json['aliases'] as List<dynamic>).cast<String>(),
    isSupportedAsNative: json['isSupportedAsNative'] as bool,
    isSupportedAsLearning: json['isSupportedAsLearning'] as bool,
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
