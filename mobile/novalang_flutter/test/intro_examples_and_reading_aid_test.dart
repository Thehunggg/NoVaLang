import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';
import 'package:novalang_flutter/state/lesson_reading_aid.dart';
import 'package:novalang_flutter/widgets/lesson/ja_sentence.dart';
import 'package:novalang_flutter/widgets/lesson/speaker_button.dart';

/// PHA A — câu minh hoạ ở thẻ ① Intro phải HIỆN và phải có nút nghe.
/// Trước 2026-07-29 `intro.examples` không được vẽ ở đâu cả (15 câu chết trên
/// 5 bài), và hai lượt audit bằng tay đều không bắt được.
///
/// PHA C — công tắc trợ đọc đổi trạng thái thật (G14-R14 [JA] b).
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late Lesson lesson;

  setUpAll(() async {
    // Asset lessons.json ~13MB — nạp MỘT lần ở setUpAll, không nạp trong
    // thân testWidgets (kênh asset của test cực chậm với payload cỡ này).
    final raw = File('assets/shared/lessons.json').readAsStringSync();
    final decoded = jsonDecode(raw);
    final list = (decoded is Map ? decoded['lessons'] : decoded) as List<dynamic>;
    final map = list
        .cast<Map>()
        .map((item) => Map<String, dynamic>.from(item))
        .firstWhere((l) => l['id'] == 'ja-daily_life-m01-u1-l1');
    lesson = CurriculumLesson.fromJson(map).toLesson(nativeLanguage: 'vi');
  });

  Widget host() => ProviderScope(
    child: MaterialApp(
      home: LessonIntroductionPage(
        lesson: lesson,
        uiLanguageCode: 'vi',
        nativeLanguageCode: 'vi',
        learningLanguageCode: 'ja',
      ),
    ),
  );

  testWidgets('Golden L1 — câu minh hoạ HIỆN ở thẻ Intro', (tester) async {
    await tester.pumpWidget(host());
    await tester.pump();

    final sentences = find.byType(JaSentence);
    expect(
      sentences,
      findsWidgets,
      reason: 'intro.examples phải được vẽ qua JaSentence',
    );
    // Golden L1 có đúng 3 câu minh hoạ.
    expect(tester.widgetList(sentences).length, 3);

    expect(find.text(L10n.text('exampleSentences', 'vi')), findsOneWidget);
  });

  testWidgets('mỗi câu minh hoạ có NÚT NGHE', (tester) async {
    await tester.pumpWidget(host());
    await tester.pump();

    final speakers = find.descendant(
      of: find.byType(JaSentence),
      matching: find.byType(SpeakerButton),
    );
    expect(tester.widgetList(speakers).length, 3);
  });

  testWidgets('dòng chính SẠCH — không có ngoặc chú âm khi vẽ', (tester) async {
    await tester.pumpWidget(host());
    await tester.pump();

    final texts = tester
        .widgetList<Text>(find.descendant(of: find.byType(JaSentence), matching: find.byType(Text)))
        .map((t) => t.data ?? '')
        .toList();
    expect(texts, isNotEmpty);
    for (final t in texts) {
      expect(
        RegExp(r'（[ぁ-ゟー]+）').hasMatch(t),
        isFalse,
        reason: 'dòng vẽ ra còn ngoặc chú âm: $t',
      );
    }
  });

  testWidgets('công tắc Furigana thêm dòng kana; tắt thì mất', (tester) async {
    await tester.pumpWidget(host());
    await tester.pump();

    final toggle = find.byKey(const ValueKey('reading-aid-furigana'));
    expect(toggle, findsOneWidget, reason: 'phải có công tắc furigana');

    int textCount() => tester
        .widgetList<Text>(
          find.descendant(of: find.byType(JaSentence), matching: find.byType(Text)),
        )
        .length;

    // Mặc định BẬT (giữ nguyên hành vi Q14 vốn có), nên lượt bấm đầu là TẮT.
    final withKana = textCount();
    await tester.tap(toggle);
    await tester.pump();
    final withoutKana = textCount();
    expect(withoutKana, lessThan(withKana), reason: 'tắt furigana phải BỚT dòng kana');

    await tester.tap(toggle);
    await tester.pump();
    expect(textCount(), withKana, reason: 'bật lại phải trở về như cũ');
  });

  testWidgets('PHƯƠNG ÁN bài tập: bật/tắt dòng kana ăn vào chip', (tester) async {
    // G14-R14 — thẻ ⑤. Dựng thẳng chip phương án trong một ReadingAidScope
    // để kiểm đúng mặt hiển thị đó, không phải cả màn bài tập.
    Widget host({required bool showFurigana}) => ProviderScope(
      child: MaterialApp(
        home: Scaffold(
          body: ReadingAidScope(
            lessonSessionKey: 'k',
            lessonLevel: 'A0',
            learningLanguageCode: 'ja',
            uiLanguageCode: 'vi',
            showFurigana: showFurigana,
            child: const JaSentence(
              displayText: '日本（にほん）に来（き）ました。',
              showSpeaker: false,
            ),
          ),
        ),
      ),
    );

    await tester.pumpWidget(host(showFurigana: false));
    await tester.pump();
    // Dòng chính luôn SẠCH — không ngoặc, bất kể công tắc.
    expect(find.text('日本に来ました。'), findsOneWidget);
    expect(find.text('にほん に きました。'), findsNothing);

    await tester.pumpWidget(host(showFurigana: true));
    await tester.pump();
    expect(find.text('日本に来ました。'), findsOneWidget);
    // Bật → thêm dòng kana wakachigaki (trợ từ に đứng riêng, okurigana dính).
    expect(find.text('にほん に きました。'), findsOneWidget);
  });

  test('store nhớ theo phiên, gate theo NGÔN NGỮ', () {
    final store = LessonReadingAidStore();
    final s = store.stateFor(lessonSessionKey: 'k', learningLanguageCode: 'ja');
    // Mặc định giữ y hệt Q14 cũ: dòng kana BẬT, romaji TẮT.
    expect(s.showFurigana, isTrue, reason: 'giữ nguyên mặc định Q14');
    expect(s.showRomaji, isFalse);
    expect(s.readingAidOn, isTrue);

    store.setShowFurigana('k', false);
    expect(
      store.stateFor(lessonSessionKey: 'k', learningLanguageCode: 'ja').showFurigana,
      isFalse,
    );

    // Ngôn ngữ không dùng chú âm → không có trợ đọc, bật cũng không ăn.
    final en = LessonReadingAidStore();
    en.stateFor(lessonSessionKey: 'x', learningLanguageCode: 'en');
    en.setShowRomaji('x', true);
    expect(
      en.stateFor(lessonSessionKey: 'x', learningLanguageCode: 'en').showRomaji,
      isFalse,
    );
  });
}
