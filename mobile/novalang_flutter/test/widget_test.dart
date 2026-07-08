import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/app.dart';

void main() {
  testWidgets('NovaLang app starts', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: NovaLangApp()));
    await tester.pump();
    expect(find.text('NovaLang'), findsWidgets);
  });
}
