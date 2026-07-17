import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';
import 'package:novalang_flutter/services/ai_exercise_grader.dart';
import 'package:novalang_flutter/services/ai_exercise_quota_service.dart';

void main() {
  test('practice shuffle is non-original and stable within one attempt', () {
    final exercise = PracticeExercise.fromMap({
      'id': 'e1',
      'order': 1,
      'plan': 'free',
      'type': 'multiple_choice',
      'prompt': 'p',
      'options': [
        {'id': 'a', 'text': 'A'},
        {'id': 'b', 'text': 'B'},
        {'id': 'c', 'text': 'C'},
        {'id': 'd', 'text': 'D'},
      ],
    });
    final practice = FiveCardPractice(
      title: 't',
      japaneseTitle: 'r',
      totalQuestions: 14,
      estimatedMinutes: 'x',
      reviewTopics: '',
      groups: const [],
      exercises: [exercise],
    );
    final attempt = PracticeAttempt.create(practice, random: Random(0));
    final first = attempt.orderFor('e1:options');
    expect(first, isNot(['a', 'b', 'c', 'd']));
    expect(attempt.orderFor('e1:options'), first);
    expect(exercise.checksOption('a'), isFalse);
  });

  test('AI quota is account-global by user and local date', () async {
    final service = AiExerciseQuotaService(InMemoryAiExerciseQuotaStore());
    final day = DateTime(2026, 7, 13);
    for (var i = 0; i < 5; i += 1) {
      await service.recordCompletedSet('user-a', now: day);
    }
    expect((await service.status('user-a', now: day)).exhausted, isTrue);
    expect((await service.status('user-b', now: day)).remaining, 5);
    expect(
      (await service.status(
        'user-a',
        now: day.add(const Duration(days: 1)),
      )).remaining,
      5,
    );
  });

  test(
    'dev AI grader preserves Unicode learner names in its example',
    () async {
      final exercise = PracticeExercise.fromMap({
        'id': 'e14',
        'order': 14,
        'plan': 'plus',
        'type': 'controlled_ai_text',
        'prompt': 'p',
        'correctedExampleTemplate': {
          'greeting': 'はじめまして。',
          'introductionPrefix': 'わたしは',
          'introductionSuffix': 'です。',
          'closing': 'よろしくおねがいします。',
        },
      });
      final answer =
          'Hajimemashite. Watashi wa 김민수 desu. Yoroshiku onegaishimasu.';
      expect(isLocallyValidAiExerciseAnswer(answer, exercise), isTrue);
      final grade = await const DevMockAiExerciseGrader().grade(
        AiExerciseGradingRequest(
          exercise: exercise,
          answer: answer,
          nativeLanguageCode: 'vi',
        ),
      );
      expect(grade.passed, isTrue);
      expect(grade.correctedExample, contains('김민수'));
    },
  );

  test('chat fill normalizes punctuation, whitespace, and romaji casing', () {
    final chat = PracticeExercise.fromMap({
      'id': 'e10',
      'order': 10,
      'plan': 'free',
      'type': 'chat_text_fill',
      'prompt': 'p',
      'slots': [
        {
          'id': 'chat_greeting_slot',
          'displayText': 'こんにちは',
          'canonicalText': 'こんにちは',
          'audioText': 'こんにちは',
          'acceptedAnswers': ['こんにちは', 'コンニチハ', 'konnichiwa'],
        },
        {
          'id': 'chat_closing_slot',
          'displayText': 'よろしくお願（ねが）いします',
          'canonicalText': 'よろしくお願いします',
          'audioText': 'よろしくおねがいします',
          'acceptedAnswers': [
            'よろしくお願いします',
            'よろしくおねがいします',
            '宜しくお願いします',
            'yoroshiku onegaishimasu',
            'yoroshiku onegai shimasu',
          ],
        },
      ],
    });
    expect(
      chat.checksChatSlots({
        'chat_greeting_slot': ' KONNICHIWA! ',
        'chat_closing_slot': 'yoroshiku   onegai shimasu。',
      }),
      isTrue,
    );
    expect(
      chat.checksChatSlots({
        'chat_greeting_slot': 'コンニチハ。',
        'chat_closing_slot': '宜しくお願いします!',
      }),
      isTrue,
    );
    expect(normalizePracticeTextAnswer(' Konnichiwa！ '), 'konnichiwa');
    expect(chat.slots.first.displayText, 'こんにちは');
    expect(chat.slots.first.canonicalText, 'こんにちは');
    expect(chat.slots.last.audioText, 'よろしくおねがいします');
  });

  test('slot ordering checks stable slot ids and keeps punctuation out of input', () {
    final ordering = PracticeExercise.fromMap({
      'id': 'e13',
      'order': 13,
      'plan': 'plus',
      'type': 'slot_ordering',
      'prompt': 'p',
      'tokens': [
        {'id': 'hajimemashite', 'text': 'はじめまして'},
        {'id': 'watashi', 'text': '私（わたし）'},
        {'id': 'konbanwa_distractor', 'text': 'こんばんは'},
      ],
      'answerSlots': [
        {'id': 'intro', 'expectedTokenId': 'hajimemashite', 'afterText': '。'},
        {'id': 'subject', 'expectedTokenId': 'watashi'},
      ],
    });
    expect(ordering.answerSlots.where((slot) => slot.afterText == '。'), hasLength(1));
    expect(
      ordering.checksTokenSlots({'intro': 'hajimemashite', 'subject': 'watashi'}),
      isTrue,
    );
    expect(
      ordering.checksTokenSlots({'intro': 'watashi', 'subject': 'hajimemashite'}),
      isFalse,
    );
  });
}
