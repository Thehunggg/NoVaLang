import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';
import 'core/utils/level_display_labels.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await LevelDisplayLabels.load();
  runApp(const ProviderScope(child: NovaLangApp()));
}
