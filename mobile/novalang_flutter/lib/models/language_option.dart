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
