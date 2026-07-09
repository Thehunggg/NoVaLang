import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';
import 'core/utils/level_display_labels.dart';
import 'core/utils/mobile_ui_strings.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Future.wait([
    LevelDisplayLabels.load(),
    MobileUiStrings.load(),
  ]);
  runApp(const ProviderScope(child: NovaLangApp()));
}
