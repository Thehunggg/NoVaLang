import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';
import 'package:novalang_flutter/screens/learn/exercises/chat_text_fill_exercise.dart';

void main() {
  testWidgets(
    'chat text inputs preserve Vietnamese and Japanese Unicode text',
    (tester) async {
      Map<String, String> latest = {};
      final exercise = PracticeExercise.fromMap({
        'id': 'e10',
        'order': 10,
        'plan': 'free',
        'type': 'chat_text_fill',
        'prompt': 'p',
        'chat': {
          'timestamp': '11:00',
          'context': 'c',
          'speakers': [
            {'id': 'a', 'label': 'A', 'alignment': 'right'},
          ],
          'messages': [
            {
              'id': 'm1',
              'speakerId': 'a',
              'segments': [
                {'slotId': 'greeting'},
                {'slotId': 'closing'},
              ],
            },
          ],
        },
        'slots': [
          {
            'id': 'greeting',
            'displayText': 'こんにちは',
            'canonicalText': 'こんにちは',
            'audioText': 'こんにちは',
            'acceptedAnswers': ['こんにちは'],
          },
          {
            'id': 'closing',
            'displayText': 'よろしくお願いします',
            'canonicalText': 'よろしくお願いします',
            'audioText': 'よろしくおねがいします',
            'acceptedAnswers': ['よろしくお願いします'],
          },
        ],
      });
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ChatTextFillExercise(
              exercise: exercise,
              enabled: true,
              incorrectSlotIds: const {},
              uiLanguageCode: 'vi',
              onChanged: (answers) => latest = answers,
            ),
          ),
        ),
      );
      final fields = find.byType(TextField);
      await tester.enterText(fields.at(0), 'こんにちは 私 わたし tiếng Việt có dấu');
      await tester.enterText(fields.at(1), 'よろしくお願いします');
      expect(latest['greeting'], 'こんにちは 私 わたし tiếng Việt có dấu');
      expect(latest['closing'], 'よろしくお願いします');
    },
  );

  testWidgets('chat slot controller and focus node survive a parent rebuild', (
    tester,
  ) async {
    final exercise = PracticeExercise.fromMap({
      'id': 'e10',
      'order': 10,
      'plan': 'free',
      'type': 'chat_text_fill',
      'prompt': 'p',
      'chat': {
        'timestamp': '11:00',
        'context': 'c',
        'speakers': [
          {'id': 'a', 'label': 'A', 'alignment': 'right'},
        ],
        'messages': [
          {
            'id': 'm1',
            'speakerId': 'a',
            'segments': [
              {'slotId': 'greeting'},
              {'slotId': 'closing'},
            ],
          },
        ],
      },
      'slots': [
        {
          'id': 'greeting',
          'displayText': 'こんにちは',
          'canonicalText': 'こんにちは',
          'audioText': 'こんにちは',
          'acceptedAnswers': ['こんにちは'],
        },
        {
          'id': 'closing',
          'displayText': 'よろしくお願いします',
          'canonicalText': 'よろしくお願いします',
          'audioText': 'よろしくおねがいします',
          'acceptedAnswers': ['よろしくお願いします'],
        },
      ],
    });
    late StateSetter rebuildParent;
    await tester.pumpWidget(
      MaterialApp(
        home: StatefulBuilder(
          builder: (context, setState) {
            rebuildParent = setState;
            return Scaffold(
              body: ChatTextFillExercise(
                exercise: exercise,
                enabled: true,
                incorrectSlotIds: const {},
                uiLanguageCode: 'vi',
                onChanged: (_) {},
              ),
            );
          },
        ),
      ),
    );
    final first = tester.widget<TextField>(
      find.byKey(const ValueKey('chat-input-greeting')),
    );
    final controller = first.controller;
    final focusNode = first.focusNode;
    await tester.enterText(
      find.byKey(const ValueKey('chat-input-greeting')),
      'こんにちは',
    );
    rebuildParent(() {});
    await tester.pump();
    final after = tester.widget<TextField>(
      find.byKey(const ValueKey('chat-input-greeting')),
    );
    expect(identical(after.controller, controller), isTrue);
    expect(identical(after.focusNode, focusNode), isTrue);
    expect(after.controller!.text, 'こんにちは');
    expect(after.inputFormatters, isNull);
  });
}
