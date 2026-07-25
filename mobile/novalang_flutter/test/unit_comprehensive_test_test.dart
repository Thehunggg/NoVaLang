import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/unit_comprehensive_test.dart';

/// Bài tổng hợp cuối unit (ADR-022) — kiểm PARSE + CƠ CHẾ CHẤM.
///
/// Trọng tâm: chứng minh hai đường chấm (§D-Cloze) chạy đúng, đặc biệt luật
/// đã chốt cho câu tự gõ nhiều ô — so khớp TỪNG Ô để phản hồi, nhưng CÂU chỉ
/// đúng khi MỌI ô đúng.
void main() {
  Map<String, dynamic> choiceQuestionJson() => {
        'id': 'q1',
        'order': 1,
        'kind': 'sentence_multi_blank_choice',
        'prompt': 'prompt',
        'segments': [
          {'blankId': 'b1'},
          {'displayText': 'は'},
          {'blankId': 'b2'},
          {'displayText': 'です。'},
        ],
        'blanks': [
          {
            'id': 'b1',
            'displayAnswer': '私（わたし）',
            'canonicalAnswer': '私',
            'audioText': 'わたし',
            'acceptedAnswers': ['私', 'わたし'],
          },
          {
            'id': 'b2',
            'displayAnswer': '田中（たなか）',
            'canonicalAnswer': '田中',
            'audioText': 'たなか',
            'acceptedAnswers': ['田中', 'たなか'],
          },
        ],
        'options': [
          {
            'id': 'o1',
            'text': '①私 ②田中',
            'answersByBlankId': {'b1': '私', 'b2': '田中'},
          },
          {
            'id': 'o2',
            'text': '①私 ②佐藤',
            'answersByBlankId': {'b1': '私', 'b2': '佐藤'},
          },
          {
            'id': 'o3',
            'text': '①あなた ②田中',
            'answersByBlankId': {'b1': 'あなた', 'b2': '田中'},
          },
          {
            'id': 'o4',
            'text': '①あなた ②佐藤',
            'answersByBlankId': {'b1': 'あなた', 'b2': '佐藤'},
          },
        ],
        'correctOptionId': 'o1',
        'reviews': [
          {'lessonId': 'l1', 'kind': 'vocabulary', 'ref': 'watashi'},
        ],
        'difficulty': 1,
        'explanation': 'giải thích',
      };

  Map<String, dynamic> typedQuestionJson() => {
        'id': 'q19',
        'order': 19,
        'kind': 'typed_blank',
        'prompt': 'prompt',
        'segments': [
          {'displayText': 'すみません、'},
          {'blankId': 't1'},
          {'displayText': 'は？'},
        ],
        'blanks': [
          {
            'id': 't1',
            'displayAnswer': 'お名前（なまえ）',
            'canonicalAnswer': 'お名前',
            'audioText': 'おなまえ',
            'acceptedAnswers': ['お名前', 'おなまえ'],
            'hint': 'gợi ý',
          },
        ],
        'reviews': [
          {'lessonId': 'l2', 'kind': 'vocabulary', 'ref': 'onamae'},
        ],
        'difficulty': 3,
        'explanation': 'giải thích',
      };

  Map<String, dynamic> testJson(List<Map<String, dynamic>> questions) => {
        'id': 'u1-comprehensive',
        'unitId': 'u1',
        'format': 'unit_comprehensive_cloze',
        'languageCode': 'ja',
        'targetLocale': 'ja-JP',
        'plan': 'plus',
        'graded': true,
        'title': 'Bài tổng hợp',
        'estimatedMinutes': '15',
        'totalQuestions': questions.length,
        'sourceLessonIds': ['l1', 'l2'],
        'questions': questions,
      };

  group('parse', () {
    test('đọc được bài tổng hợp đầy đủ 3 loại câu', () {
      final parsed = UnitComprehensiveTest.tryFromMap(
        testJson([choiceQuestionJson(), typedQuestionJson()]),
      );
      expect(parsed, isNotNull);
      expect(parsed!.questions.length, 2);
      expect(parsed.plan, 'plus');
      expect(parsed.graded, isTrue);
      expect(parsed.isPlusOnly, isTrue);
      expect(
        parsed.questions.first.kind,
        UnitComprehensiveQuestionKind.sentenceMultiBlankChoice,
      );
      expect(
        parsed.questions.last.kind,
        UnitComprehensiveQuestionKind.typedBlank,
      );
    });

    test('null/rỗng -> null (unit chưa có bài là trạng thái hợp lệ)', () {
      expect(UnitComprehensiveTest.tryFromMap(null), isNull);
      expect(UnitComprehensiveTest.tryFromMap(const {}), isNull);
    });

    test('câu hỏi được sắp theo order', () {
      final parsed = UnitComprehensiveTest.tryFromMap(
        testJson([typedQuestionJson(), choiceQuestionJson()]),
      );
      expect(parsed!.questions.map((q) => q.order), [1, 19]);
    });
  });

  group('chấm câu CHỌN PHƯƠNG ÁN', () {
    late UnitComprehensiveQuestion q;
    setUp(() {
      q = UnitComprehensiveTest.tryFromMap(testJson([choiceQuestionJson()]))!
          .questions
          .first;
    });

    test('chọn đúng phương án -> đúng', () {
      expect(q.checksChoice('o1'), isTrue);
    });

    test('chọn sai -> sai, kể cả phương án đúng 1 ô sai 1 ô', () {
      // o2 điền đúng b1 nhưng sai b2 — vẫn SAI cả câu (không có điểm từng phần).
      expect(q.checksChoice('o2'), isFalse);
      expect(q.checksChoice('o3'), isFalse);
      expect(q.checksChoice('o4'), isFalse);
    });

    test('chưa chọn -> sai', () {
      expect(q.checksChoice(null), isFalse);
    });

    test('đáp án đúng hiển thị được cho mọi ô khi chữa bài', () {
      expect(q.correctAnswersByBlankId, {
        'b1': '私（わたし）',
        'b2': '田中（たなか）',
      });
    });
  });

  group('chấm câu TỰ GÕ (§D-Cloze)', () {
    late UnitComprehensiveQuestion q;
    setUp(() {
      q = UnitComprehensiveTest.tryFromMap(testJson([typedQuestionJson()]))!
          .questions
          .first;
    });

    test('gõ dạng kanji -> đúng', () {
      expect(q.checksTyped({'t1': 'お名前'}), isTrue);
    });

    test('gõ dạng kana -> cũng đúng (nhiều đáp án chấp nhận được)', () {
      expect(q.checksTyped({'t1': 'おなまえ'}), isTrue);
    });

    test('normalizer tự bỏ dấu câu cuối + khoảng trắng thừa', () {
      expect(q.checksTyped({'t1': ' お名前。 '}), isTrue);
      expect(q.checksTyped({'t1': 'お名前！'}), isTrue);
    });

    test('gõ sai -> sai', () {
      expect(q.checksTyped({'t1': '名前'}), isFalse);
      expect(q.checksTyped({'t1': ''}), isFalse);
    });

    test('chỉ ra ĐÚNG Ô NÀO sai (phản hồi từng ô)', () {
      expect(q.incorrectTypedBlankIds({'t1': 'お名前'}), isEmpty);
      expect(q.incorrectTypedBlankIds({'t1': 'sai'}), {'t1'});
    });
  });

  group('câu TỰ GÕ NHIỀU Ô — luật đã chốt', () {
    late UnitComprehensiveQuestion q;
    setUp(() {
      final json = typedQuestionJson();
      json['segments'] = [
        {'displayText': 'A'},
        {'blankId': 't1'},
        {'displayText': 'B'},
        {'blankId': 't2'},
      ];
      (json['blanks'] as List).add({
        'id': 't2',
        'displayAnswer': 'です',
        'canonicalAnswer': 'です',
        'audioText': 'です',
        'acceptedAnswers': ['です'],
      });
      q = UnitComprehensiveTest.tryFromMap(testJson([json]))!.questions.first;
    });

    test('mọi ô đúng -> CÂU đúng', () {
      expect(q.checksTyped({'t1': 'お名前', 't2': 'です'}), isTrue);
    });

    test('đúng 1 ô, sai 1 ô -> CÂU SAI (không có điểm từng phần)', () {
      expect(q.checksTyped({'t1': 'お名前', 't2': 'sai'}), isFalse);
    });

    test('vẫn chỉ ra riêng ô nào sai để phản hồi', () {
      expect(q.incorrectTypedBlankIds({'t1': 'お名前', 't2': 'sai'}), {'t2'});
      expect(q.incorrectTypedBlankIds({'t1': 'sai', 't2': 'です'}), {'t1'});
      expect(
        q.incorrectTypedBlankIds({'t1': 'sai', 't2': 'sai'}),
        {'t1', 't2'},
      );
    });
  });
}
