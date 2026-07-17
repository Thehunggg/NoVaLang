String normalizeNativeLocale(String languageCode) =>
    languageCode.trim().toLowerCase().replaceAll('_', '-').split('-').first;

String missingNativeContentSentinel(String path, String languageCode) =>
    '⟦missing-content:$path:${normalizeNativeLocale(languageCode)}⟧';

String strictNativeText(
  Map<String, String> values,
  String languageCode, {
  required String path,
  String legacy = '',
}) {
  final locale = normalizeNativeLocale(languageCode);
  if (values.isEmpty) {
    return legacy.trim().isEmpty
        ? missingNativeContentSentinel(path, locale)
        : legacy;
  }
  final value = values[locale]?.trim();
  return value == null || value.isEmpty
      ? missingNativeContentSentinel(path, locale)
      : value;
}

List<String> strictNativeTextList(
  Map<String, List<String>> values,
  String languageCode, {
  required String path,
  List<String> legacy = const [],
}) {
  final locale = normalizeNativeLocale(languageCode);
  if (values.isEmpty) {
    return legacy.isEmpty
        ? [missingNativeContentSentinel(path, locale)]
        : legacy;
  }
  final value = values[locale];
  if (value == null ||
      value.isEmpty ||
      value.any((item) => item.trim().isEmpty)) {
    return [missingNativeContentSentinel(path, locale)];
  }
  return value;
}

/// Resolves field-level `*ByNative` maps without crossing language boundaries.
///
/// Shared validators guarantee that learner-support fields contain vi/en/ja.
/// The sentinel keeps a malformed development asset visible without silently
/// substituting English or Vietnamese in production UI.
Map<String, dynamic> resolveNativeContentMap(
  Map<String, dynamic> source,
  String languageCode, {
  String path = 'content',
}) {
  final locale = normalizeNativeLocale(languageCode);
  final resolved = <String, dynamic>{};

  for (final entry in source.entries) {
    if (entry.key.endsWith('ByNative')) continue;
    final localized = source['${entry.key}ByNative'];
    resolved[entry.key] = localized is Map
        ? _resolveLocalizedValue(localized, locale, '$path.${entry.key}')
        : _resolveNested(entry.value, locale, '$path.${entry.key}');
  }

  for (final entry in source.entries.where(
    (entry) => entry.key.endsWith('ByNative'),
  )) {
    final baseKey = entry.key.substring(
      0,
      entry.key.length - 'ByNative'.length,
    );
    if (resolved.containsKey(baseKey)) continue;
    final localized = entry.value;
    if (localized is Map) {
      resolved[baseKey] = _resolveLocalizedValue(
        localized,
        locale,
        '$path.$baseKey',
      );
    }
  }

  return resolved;
}

dynamic _resolveLocalizedValue(
  Map<dynamic, dynamic> values,
  String locale,
  String path,
) {
  final value = values[locale];
  if (value == null || (value is String && value.trim().isEmpty)) {
    return missingNativeContentSentinel(path, locale);
  }
  return _resolveNested(value, locale, path);
}

dynamic _resolveNested(dynamic value, String locale, String path) {
  if (value is Map) {
    return resolveNativeContentMap(
      value.map((key, item) => MapEntry(key.toString(), item)),
      locale,
      path: path,
    );
  }
  if (value is List) {
    return List<dynamic>.generate(
      value.length,
      (index) => _resolveNested(value[index], locale, '$path[$index]'),
      growable: false,
    );
  }
  return value;
}
