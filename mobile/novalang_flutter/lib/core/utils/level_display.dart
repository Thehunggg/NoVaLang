import 'level_display_labels.dart';

/// Display name for a level code.
///
/// Labels are loaded from `assets/shared/level_labels.json`
/// (mirrored from `shared/i18n/level_labels.json`).
///
/// [nativeLanguage] is used for Japanese + Vietnamese labels,
/// matching Web `getLevelDisplayName()` behavior.
String getLevelDisplayName(
  String levelCode,
  String learningLanguage, {
  String? nativeLanguage,
}) {
  return LevelDisplayLabels.instance.displayName(
    levelCode,
    learningLanguage,
    nativeLanguage: nativeLanguage,
  );
}

List<String> get levelOrder => LevelDisplayLabels.instance.levelOrder;
