import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await MobileUiStrings.load();
  });

  Lesson lessonWith({
    required String id,
    List<Map<String, dynamic>>? vocabularyReferences,
  }) {
    return Lesson(
      id: id,
      title: 'Test',
      track: 'daily_life',
      level: 'A0',
      template: LessonTemplate.vocabularyLesson,
      description: 'Test',
      exercises: const [],
      vocabulary: const [
        LessonVocabCard(
          displayText: 'じゃあ、また',
          meaning: 'See you',
          speechText: 'じゃあ、また',
        ),
      ],
      lessonFormat: 'five_cards',
      fiveCardContent: {
        'intro': {'title': 'Intro', 'body': 'Body'},
        'vocabularyDetails': [
          {'overview': 'Overview'},
        ],
        'dialogueGroups': [
          {
            'id': 'g1',
            'lines': [
              {'speakerId': 'a', 'text': 'hi', 'speechText': 'hi'},
            ],
          },
        ],
        'grammarPatterns': [
          {'id': 'p1', 'title': 'Pattern'},
        ],
        if (vocabularyReferences != null)
          'vocabularyReferences': vocabularyReferences,
      },
    );
  }

  Future<void> pumpPage(
    WidgetTester tester, {
    required Lesson lesson,
    required String uiLanguageCode,
    required String nativeLanguageCode,
  }) {
    return tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          home: LessonVocabularyPage(
            lesson: lesson,
            uiLanguageCode: uiLanguageCode,
            nativeLanguageCode: nativeLanguageCode,
            learningLanguageCode: 'ja',
            expandedCardIds: const {},
            onExpansionChanged: (_) {},
          ),
        ),
      ),
    );
  }

  testWidgets('shows collapsed vocabulary references and expands items', (
    tester,
  ) async {
    final lesson = lessonWith(
      id: 'ja-daily_life-m01-u1-l3-ui',
      vocabularyReferences: [
        {
          'term': 'またね',
          'reading': 'またね',
          'speechText': 'またね',
          'meaning': 'See you (very casual).',
          'register': 'Casual.',
          'example': {
            'text': 'またね。',
            'reading': 'またね。',
            'translation': 'See you.',
          },
        },
        {
          'term': 'じゃあね',
          'reading': 'じゃあね',
          'speechText': 'じゃあね',
          'meaning': 'See ya.',
          'register': 'Casual.',
          'example': {
            'text': 'じゃあね。',
            'reading': 'じゃあね。',
            'translation': 'See ya.',
          },
        },
      ],
    );

    await pumpPage(
      tester,
      lesson: lesson,
      uiLanguageCode: 'en',
      nativeLanguageCode: 'en',
    );
    await tester.pumpAndSettle();

    expect(
      find.byKey(const ValueKey('vocabulary-references-section')),
      findsOneWidget,
    );
    expect(find.text('Further references'), findsOneWidget);
    expect(find.text('またね'), findsNothing);

    await tester.tap(find.byKey(const ValueKey('vocabulary-references-toggle')));
    await tester.pumpAndSettle();

    // Từ TOÀN KANA thì chú âm trùng chính nó — JaSentence bỏ dòng lặp đó
    // (G14-R14), nên chỉ còn MỘT. Trước đây vẽ hai lần y hệt nhau.
    expect(find.text('またね'), findsOneWidget);
    expect(find.text('じゃあね'), findsOneWidget);
    expect(find.text('See you (very casual).'), findsOneWidget);
    // §B2b — mục tham khảo còn 4 phần: từ vựng · nghĩa · mức độ lịch sự · ví dụ.
    // Nhãn "Register" là key DÙNG CHUNG với thẻ từ vựng, không phải nhãn riêng
    // của phần tham khảo — đó chính là điểm thống nhất owner yêu cầu.
    expect(find.text('Register'), findsWidgets);
    expect(find.text('Casual.'), findsWidgets);
    // Các nhãn cũ đã bỏ hẳn.
    for (final gone in const [
      'Reference for',
      'For whom',
      'When to use',
      'Difference',
    ]) {
      expect(find.text(gone), findsNothing, reason: gone);
    }
    expect(
      find.byKey(const ValueKey('vocabulary-reference-audio-0')),
      findsOneWidget,
    );
    expect(
      find.byKey(const ValueKey('vocabulary-reference-audio-1')),
      findsOneWidget,
    );
  });

  testWidgets('hides vocabulary references when field is absent', (
    tester,
  ) async {
    final lesson = lessonWith(id: 'ja-daily_life-m01-u1-l1-ui');

    await pumpPage(
      tester,
      lesson: lesson,
      uiLanguageCode: 'vi',
      nativeLanguageCode: 'vi',
    );
    await tester.pumpAndSettle();

    expect(
      find.byKey(const ValueKey('vocabulary-references-section')),
      findsNothing,
    );
    expect(find.text('Tham khảo thêm'), findsNothing);
  });
}
