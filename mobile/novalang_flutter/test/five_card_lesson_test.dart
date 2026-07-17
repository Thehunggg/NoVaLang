import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/lesson.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  Future<List<Map<String, dynamic>>> loadLessons() async {
    final raw = await rootBundle.loadString('assets/shared/lessons.json');
    final payload = jsonDecode(raw) as Map<String, dynamic>;
    return (payload['lessons'] as List<dynamic>).cast<Map<String, dynamic>>();
  }

  CurriculumLesson curriculumLesson(Map<String, dynamic> json) =>
      CurriculumLesson.fromJson(json);

  test(
    'Japanese Daily Life Unit 1 Lesson 1 keeps approved five-card data',
    () async {
      final lessons = await loadLessons();
      final lessonJson = lessons.singleWhere(
        (lesson) => lesson['id'] == 'ja-daily_life-m01-u1-l1',
      );
      final lesson = curriculumLesson(
        lessonJson,
      ).toLesson(nativeLanguage: 'vi');
      final content = lesson.fiveCardContent!;

      expect(lesson.lessonFormat, 'five_cards');
      expect(lesson.usesFiveCardLayout, isTrue);
      expect(content['mainCards'], [
        'intro',
        'vocabulary',
        'dialogue',
        'grammar',
        'practice',
      ]);
      expect(lesson.vocabulary, hasLength(8));
      expect((content['vocabularyDetails'] as List<dynamic>), hasLength(8));
      expect((content['dialogueGroups'] as List<dynamic>), hasLength(3));
      expect(content['targetLanguage'], 'ja');
      expect(content['targetLocale'], 'ja-JP');
      expect(content['cultureContext'], 'Japan');
      final characters = (content['approvedCharacterNamePool'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      expect(
        characters.map((item) => item['id']),
        containsAll(['tanaka', 'sato']),
      );
      expect(
        characters.singleWhere((item) => item['id'] == 'tanaka')['displayName'],
        '田中（たなか）',
      );
      expect(
        characters.singleWhere((item) => item['id'] == 'sato')['displayName'],
        '佐藤（さとう）',
      );
      final dialogueLines = (content['dialogueGroups'] as List<dynamic>)
          .cast<Map<String, dynamic>>()
          .expand(
            (group) =>
                (group['lines'] as List<dynamic>).cast<Map<String, dynamic>>(),
          );
      expect(
        dialogueLines.every(
          (line) => characters.any((item) => item['id'] == line['speakerId']),
        ),
        isTrue,
      );
      expect((content['grammarPatterns'] as List<dynamic>), hasLength(3));
      expect(lesson.exercises, isEmpty);
      expect(jsonEncode(content), isNot(contains('ミン')));
      expect(jsonEncode(content), isNot(contains('Minh')));
      expect(jsonEncode(content), isNot(contains('やあ')));
      final konnichiwa = (content['vocabularyDetails'] as List<dynamic>)
          .cast<Map<String, dynamic>>()
          .singleWhere((detail) => detail['id'] == 'konnichiwa');
      expect(konnichiwa['casualTitle'], 'Cách mở đầu thân mật theo ngữ cảnh');
      expect(jsonEncode(konnichiwa), isNot(contains('やあ')));
      final practice = content['practice'] as Map<String, dynamic>;
      final exercises = (practice['exercises'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      expect(practice['totalQuestions'], 14);
      expect(exercises, hasLength(14));
      expect(jsonEncode(practice), isNot(contains('Câu 15: Thiết kế sau')));
      expect(practice['reviewTopics'], 'Từ vựng · Nghe · Hội thoại · Ngữ pháp');
      final groups = (practice['groups'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      expect(groups, hasLength(2));
      expect(groups[0]['range'], 'Câu 1–10');
      expect(groups[1]['range'], 'Câu 11–14');
      // Lesson Format 3.0 (ADR-012): the "plus" group's old AI-trial badge
      // wording is gone now that exercise 14 is the non-graded Real-World
      // Practice dialogue, not `controlled_ai_text`.
      expect(groups[1]['badge'], isNull);
      expect(
        groups[1]['details'],
        'Tình huống thực tế\nHội thoại thực hành nâng cao',
      );
      expect(
        exercises.take(10).every((item) => item['plan'] == 'free'),
        isTrue,
      );
      expect(
        exercises.skip(10).every((item) => item['plan'] == 'plus'),
        isTrue,
      );
      final checkpoint = exercises[8];
      final subQuestions = (checkpoint['subQuestions'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      expect(subQuestions, hasLength(5));
      for (final question in subQuestions) {
        final options = (question['options'] as List<dynamic>)
            .cast<Map<String, dynamic>>();
        expect(options, hasLength(4));
        expect(
          options.any((option) => option['id'] == question['correctOptionId']),
          isTrue,
        );
      }
      final advancedOrdering = exercises[12];
      expect(advancedOrdering['type'], 'slot_ordering');
      final answerSlots = (advancedOrdering['answerSlots'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      expect(answerSlots, hasLength(6));
      expect(
        answerSlots.where((slot) => slot['afterText'] == '。'),
        hasLength(3),
      );
      expect(
        (advancedOrdering['tokens'] as List<dynamic>)
            .cast<Map<String, dynamic>>()
            .map((token) => token['id']),
        contains('konbanwa_distractor'),
      );
      final basicOrdering = exercises[3];
      expect(basicOrdering['type'], 'sentence_ordering');
      expect(
        (basicOrdering['tokens'] as List<dynamic>),
        everyElement(isA<Map<String, dynamic>>()),
      );
      expect(exercises[9]['type'], 'chat_text_fill');
      final chat = exercises[9]['chat'] as Map<String, dynamic>;
      expect((chat['messages'] as List<dynamic>), hasLength(6));
      final slots = (exercises[9]['slots'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      expect(slots.map((slot) => slot['id']), [
        'chat_greeting_slot',
        'chat_closing_slot',
      ]);
      expect(
        slots[0]['acceptedAnswers'],
        containsAll(['こんにちは', 'コンニチハ', 'konnichiwa']),
      );
      expect(
        slots[1]['acceptedAnswers'],
        containsAll([
          'よろしくお願いします',
          'よろしくおねがいします',
          '宜しくお願いします',
          'yoroshiku onegaishimasu',
          'yoroshiku onegai shimasu',
        ]),
      );
      expect(
        slots.every(
          (slot) =>
              slot.containsKey('displayText') &&
              slot.containsKey('canonicalText') &&
              slot.containsKey('audioText'),
        ),
        isTrue,
      );
      expect(slots[1]['displayText'], isNot(slots[1]['canonicalText']));
      expect(
        slots.every(
          (slot) => (slot['audioText'] as String).contains('（') == false,
        ),
        isTrue,
      );
      // Lesson Format 3.0 (ADR-012): exercise 14 is the non-graded
      // Real-World Practice dialogue (`real_world_practice_dialogue`), not
      // the old `controlled_ai_text` (`maxCycles`/`scriptPolicy` no longer
      // exist on any exercise).
      final realWorldPractice = exercises[13];
      expect(realWorldPractice['type'], 'real_world_practice_dialogue');
      expect(realWorldPractice['nonGraded'], isTrue);
      expect(
        (realWorldPractice['dialogueLines'] as List<dynamic>),
        hasLength(14),
      );
      expect((realWorldPractice['scenarioTitle'] as String), isNotEmpty);
      expect(
        (realWorldPractice['scenarioDescription'] as String),
        isNotEmpty,
      );
    },
  );

  test('Hiragana lessons do not use five_cards', () async {
    final lessons = await loadLessons();
    final hiragana = lessons.where(
      (lesson) => (lesson['id'] as String).contains('hiragana'),
    );
    expect(hiragana, isNotEmpty);
    for (final raw in hiragana) {
      final lesson = curriculumLesson(raw).toLesson(nativeLanguage: 'vi');
      expect(lesson.lessonFormat, isNull, reason: lesson.id);
      expect(lesson.fiveCardContent, isNull, reason: lesson.id);
      expect(lesson.usesFiveCardLayout, isFalse, reason: lesson.id);
      expect(lesson.exercises, isNotEmpty, reason: lesson.id);
    }
  });

  test('Katakana lessons do not use five_cards', () async {
    final lessons = await loadLessons();
    final katakana = lessons.where(
      (lesson) => (lesson['id'] as String).contains('katakana'),
    );
    expect(katakana, isNotEmpty);
    for (final raw in katakana) {
      final lesson = curriculumLesson(raw).toLesson(nativeLanguage: 'vi');
      expect(lesson.lessonFormat, isNull, reason: lesson.id);
      expect(lesson.fiveCardContent, isNull, reason: lesson.id);
      expect(lesson.usesFiveCardLayout, isFalse, reason: lesson.id);
      expect(lesson.exercises, isNotEmpty, reason: lesson.id);
    }
  });

  test('English Alphabet lessons do not use five_cards', () async {
    final lessons = await loadLessons();
    final alphabet = lessons.where(
      (lesson) => (lesson['id'] as String).startsWith('en-alphabet'),
    );
    expect(alphabet, isNotEmpty);
    for (final raw in alphabet) {
      final lesson = curriculumLesson(raw).toLesson(nativeLanguage: 'vi');
      expect(lesson.lessonFormat, isNull, reason: lesson.id);
      expect(lesson.fiveCardContent, isNull, reason: lesson.id);
      expect(lesson.usesFiveCardLayout, isFalse, reason: lesson.id);
      expect(lesson.exercises, isNotEmpty, reason: lesson.id);
    }
  });

  test('lesson without lessonFormat stays on legacy renderer flag', () async {
    const lesson = Lesson(
      id: 'legacy-sample',
      title: 'Legacy',
      track: 'ja-hiragana',
      level: 'A0',
      template: LessonTemplate.kanaLesson,
      description: 'legacy',
      exercises: [],
      vocabulary: [
        LessonVocabCard(displayText: 'あ', speechText: 'あ', meaning: 'a'),
      ],
    );
    expect(lesson.lessonFormat, isNull);
    expect(lesson.usesFiveCardLayout, isFalse);
  });

  test('invalid fiveCardContent disables five_cards layout flag', () {
    const lesson = Lesson(
      id: 'broken-five-cards',
      title: 'Broken',
      track: 'ja-daily_life',
      level: 'A0',
      template: LessonTemplate.vocabularyLesson,
      description: 'broken',
      exercises: [],
      lessonFormat: 'five_cards',
      fiveCardContent: {'intro': 'bad'},
    );
    expect(lesson.lessonFormat, 'five_cards');
    expect(lesson.isValidFiveCardContent, isFalse);
    expect(lesson.usesFiveCardLayout, isFalse);
  });
}
