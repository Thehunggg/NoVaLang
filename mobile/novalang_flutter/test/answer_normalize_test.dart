import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/answer_normalize.dart';

void main() {
  group('normalizeAnswer Unicode', () {
    const samples = <String, String>{
      'Vietnamese': 'Tôi uống cà phê ở Đà Nẵng',
      'French': 'élève déjà',
      'German': 'München groß',
      'Spanish': 'niño corazón',
      'Japanese': 'ありがとう 日本 カメラ',
      'Chinese': '你好 我学习中文',
      'Korean': '안녕하세요',
      'Thai': 'สวัสดี',
      'Arabic': 'مرحبا',
      'Hindi': 'नमस्ते',
      'Cyrillic': 'Привет',
    };

    for (final entry in samples.entries) {
      test('keeps ${entry.key}', () {
        expect(normalizeAnswer(entry.value), entry.value);
      });
    }

    test('does not strip Vietnamese accents', () {
      expect(answersMatch('cà phê', 'ca phe'), isFalse);
      expect(answersMatch('cà phê', 'cà phê'), isTrue);
    });

    test('caseInsensitive is opt-in', () {
      expect(normalizeAnswer('München'), 'München');
      expect(
        normalizeAnswer('HELLO', options: const NormalizeAnswerOptions(caseInsensitive: true)),
        'hello',
      );
    });

    test('null becomes empty', () {
      expect(normalizeAnswer(null), '');
    });
  });
}
