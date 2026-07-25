// Ô gõ tiếng Nhật: dấu cách người học lỡ chèn KHÔNG được làm sai đáp án đúng.
// Bàn phím ja/zh trên điện thoại rất dễ chèn dấu cách ngoài ý muốn, mà tiếng
// Nhật không dùng dấu cách giữa từ nên nó không mang nghĩa gì.
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/constants/app_constants.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';

void main() {
  group('normalizePracticeTextAnswer — ngôn ngữ KHÔNG dùng dấu cách', () {
    test('tiếng Nhật: dấu cách bị xoá sạch, gõ có cách vẫn khớp', () {
      const expected = 'お名前';
      for (final typed in ['お名前', 'お 名前', ' お名前 ', 'お  名  前']) {
        expect(
          normalizePracticeTextAnswer(typed, languageCode: 'ja'),
          normalizePracticeTextAnswer(expected, languageCode: 'ja'),
          reason: 'gõ "$typed" phải khớp "$expected"',
        );
      }
    });

    test('vẫn bỏ dấu câu cuối như cũ', () {
      expect(
        normalizePracticeTextAnswer('お 名前。', languageCode: 'ja'),
        'お名前',
      );
    });

    test('nhận cả mã có vùng và khác hoa/thường', () {
      for (final code in ['ja', 'ja-JP', 'JA', 'zh', 'zh-TW']) {
        expect(languageOmitsWordSpacing(code), isTrue, reason: code);
      }
    });
  });

  group('normalizePracticeTextAnswer — ngôn ngữ CÓ dùng dấu cách', () {
    test('tiếng Anh giữ nguyên hành vi cũ: dấu cách vẫn phân biệt', () {
      expect(
        normalizePracticeTextAnswer('good morning', languageCode: 'en'),
        'good morning',
      );
      expect(
        normalizePracticeTextAnswer('goodmorning', languageCode: 'en'),
        isNot(normalizePracticeTextAnswer('good morning', languageCode: 'en')),
      );
    });

    test('gộp chuỗi khoảng trắng thành một, như trước', () {
      expect(
        normalizePracticeTextAnswer('good   morning', languageCode: 'en'),
        'good morning',
      );
    });

    test('không truyền languageCode thì giữ nguyên hành vi cũ', () {
      expect(normalizePracticeTextAnswer('good   morning'), 'good morning');
      expect(normalizePracticeTextAnswer('お 名前'), 'お 名前');
    });

    test('en/vi không nằm trong danh sách xoá dấu cách', () {
      expect(languageOmitsWordSpacing('en'), isFalse);
      expect(languageOmitsWordSpacing('vi'), isFalse);
      expect(languageOmitsWordSpacing(null), isFalse);
      expect(languageOmitsWordSpacing(''), isFalse);
    });
  });
}
