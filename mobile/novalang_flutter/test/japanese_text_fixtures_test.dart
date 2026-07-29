import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/japanese_text.dart';

/// G14-R14 [JA] — bản Dart phải cho ra ĐÚNG cùng kết quả với bản Node và bản
/// TypeScript. Bộ chứng dùng chung: shared/config/japanese_text_fixtures.json.
/// Web chạy cùng file này ở frontend/src/utils/japaneseText.test.ts.
void main() {
  late Map<String, dynamic> fx;

  setUpAll(() {
    // Test chạy từ mobile/novalang_flutter nên lùi 2 cấp về gốc repo.
    final file = File('../../shared/config/japanese_text_fixtures.json');
    expect(
      file.existsSync(),
      isTrue,
      reason: 'không thấy bộ fixtures dùng chung: ${file.absolute.path}',
    );
    fx = jsonDecode(file.readAsStringSync()) as Map<String, dynamic>;
  });

  test('stripFurigana khớp fixtures dùng chung', () {
    final cases = fx['stripFurigana'] as List<dynamic>;
    expect(cases, isNotEmpty);
    for (final c in cases) {
      final input = (c as List)[0] as String;
      final want = c[1] as String;
      expect(stripFurigana(input), want, reason: 'stripFurigana("$input")');
    }
  });

  test('furiganaBlocks khớp fixtures dùng chung', () {
    final cases = fx['blocks'] as List<dynamic>;
    expect(cases, isNotEmpty);
    for (final c in cases) {
      final input = (c as List)[0] as String;
      final want = (c[1] as List).cast<String>();
      expect(furiganaBlocks(input), want, reason: 'furiganaBlocks("$input")');
    }
  });

  test('kanaToRomaji khớp fixtures dùng chung', () {
    final cases = fx['romaji'] as List<dynamic>;
    expect(cases, isNotEmpty);
    for (final c in cases) {
      final input = (c as List)[0] as String;
      final want = c[1] as String;
      expect(kanaToRomaji(input), want, reason: 'kanaToRomaji("$input")');
    }
  });

  test('romajiLine khớp fixtures dùng chung', () {
    final cases = fx['romajiLine'] as List<dynamic>;
    expect(cases, isNotEmpty);
    for (final c in cases) {
      final text = (c as List)[0] as String;
      final reading = c[1] as String;
      final want = c[2] as String;
      expect(romajiLine(text, reading), want, reason: 'romajiLine("$text")');
    }
  });

  test('wakachigaki bỏ qua câu không có chú âm', () {
    expect(wakachigaki('こんにちは。'), '');
    expect(wakachigaki('はい。'), '');
    // Okurigana dính vào khối kanji; trợ từ の・に đứng riêng (bảng đóng).
    expect(
      wakachigaki('去年（きょねん）の9月（くがつ）に来（き）ました。'),
      'きょねん の くがつ に きました。',
    );
    // Khối chữ thường KHÔNG khớp bảng thì giữ nguyên, không cắt trong lòng.
    expect(wakachigaki('とても元気（げんき）です'), 'とても げんきです');
  });

  test('ngoặc chứa KANJI là chú giải, không phải chú âm — giữ nguyên', () {
    // Bài kana viết 「あめ（雨）— mưa」 để dạy "あめ viết là 雨".
    expect(stripFurigana('あめ（雨）— mưa'), 'あめ（雨）— mưa');
    expect(furiganaBlocks('あめ（雨）— mưa'), ['あめ（雨）— mưa']);
  });
}
