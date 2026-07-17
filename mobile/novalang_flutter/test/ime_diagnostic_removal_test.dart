import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

void main() {
  test('production exercise flow has no IME diagnostic screen or entry point', () {
    final diagnostic = File('lib/screens/learn/exercises/ime_diagnostic_page.dart');
    final flow = File(
      'lib/screens/learn/exercises/five_card_exercise_flow.dart',
    ).readAsStringSync();

    expect(diagnostic.existsSync(), isFalse);
    expect(flow, isNot(contains('ImeDiagnosticPage')));
    expect(flow, isNot(contains('IME diagnostic')));
    expect(flow, isNot(contains('keyboard_alt_outlined')));
  });
}
