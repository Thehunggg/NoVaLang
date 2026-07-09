import 'dart:convert';

import 'package:flutter/services.dart';

/// Loads JSON files mirrored from [shared/] into Flutter assets.
///
/// Source of truth: `shared/config/` and `shared/i18n/`.
/// After editing shared files, copy them to `assets/shared/`.
class SharedAssetLoader {
  const SharedAssetLoader._();

  static const _root = 'assets/shared';

  static Future<List<dynamic>> loadList(String fileName) async {
    final raw = await rootBundle.loadString('$_root/$fileName');
    return jsonDecode(raw) as List<dynamic>;
  }

  static Future<Map<String, dynamic>> loadMap(String fileName) async {
    final raw = await rootBundle.loadString('$_root/$fileName');
    return jsonDecode(raw) as Map<String, dynamic>;
  }
}
