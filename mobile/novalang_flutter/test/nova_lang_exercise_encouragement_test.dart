import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/widgets/common/nova_lang_exercise_encouragement.dart';

void main() {
  testWidgets('encouragement follows the learning language only', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: NovaLangExerciseEncouragement(
            learningLanguageCode: 'ja',
            availableSpace: true,
          ),
        ),
      ),
    );
    expect(find.text('がんばってね！'), findsOneWidget);
    expect(find.text('Try your best!'), findsNothing);
  });

  testWidgets('encouragement stays absent without available space', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: NovaLangExerciseEncouragement(
            learningLanguageCode: 'ja',
            availableSpace: false,
          ),
        ),
      ),
    );
    expect(find.text('がんばってね！'), findsNothing);
  });
}
