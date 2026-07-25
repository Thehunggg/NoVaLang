// Xác nhận bài tổng hợp Unit 1 đã có NỘI DUNG THẬT trong dữ liệu đã ship, và
// bấm vào thẻ sẽ mở BÀI THẬT chứ không còn thông báo "đang chuẩn bị".
//
// Chạy trên `assets/shared/courses.json` thật (không phải fixture), nên nó thay
// cho việc bấm tay: nếu registry rỗng lại, hoặc generate ra thiếu câu, test đỏ.
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/data/curriculum_repository.dart';
import 'package:novalang_flutter/models/course_unit.dart';
import 'package:novalang_flutter/models/unit_comprehensive_test.dart';
import 'package:novalang_flutter/screens/learn/unit_comprehensive_test_screen.dart';
import 'package:novalang_flutter/widgets/learn/daily_life_module_card.dart';

const _unitId = 'ja-daily_life-m01-u1';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late UnitComprehensiveTest test;
  late CurriculumModuleGroup module;

  setUpAll(() async {
    await MobileUiStrings.load();
    await CurriculumRepository.load();
    final units = CurriculumRepository.unitsFor(
      languageCode: 'ja',
      nicheId: 'daily_life',
      nativeLanguage: 'vi',
    );
    final unit = units.firstWhere((u) => u.id == _unitId);
    test = unit.comprehensiveTest!;
    module = CurriculumModuleGroup.fromUnits(
      units.where((u) => u.moduleId == unit.moduleId).toList(),
    ).single;
  });

  group('nội dung thật đã vào dữ liệu', () {
    test_('unit 1 có bài tổng hợp 25 câu, gate Plus, có chấm điểm', () {
      expect(test.totalQuestions, 25);
      expect(test.questions, hasLength(25));
      expect(test.plan, 'plus');
      expect(test.graded, isTrue);
      expect(test.languageCode, 'ja');
    });

    test_('chia đúng hai mức 8 / 17 theo dải order', () {
      int countOf(UnitComprehensiveQuestionKind kind) =>
          test.questions.where((q) => q.kind == kind).length;
      expect(countOf(UnitComprehensiveQuestionKind.sentenceMultiBlankChoice), 8);
      expect(countOf(UnitComprehensiveQuestionKind.dialogueMultiBlankChoice), 17);
      // Dạng tự gõ đã bỏ khỏi MỌI kế hoạch (owner chốt 2026-07-25): câu tự gõ
      // không nêu đủ tình huống thì nhiều đáp án khác đáp án chuẩn VẪN đúng,
      // nên bộ chấm cố định chấm sai người trả lời đúng.
      expect(countOf(UnitComprehensiveQuestionKind.typedBlank), 0);
      for (final q in test.questions) {
        final expected = q.order <= 8
            ? UnitComprehensiveQuestionKind.sentenceMultiBlankChoice
            : UnitComprehensiveQuestionKind.dialogueMultiBlankChoice;
        expect(q.kind, expected, reason: 'câu ${q.order}');
      }
    });

    test_('mọi câu chấm bằng correctOptionId, 4 phương án phủ đủ mọi ô', () {
      for (final q in test.questions) {
        expect(q.options, hasLength(4), reason: 'câu ${q.order}');
        final ids = q.blanks.map((b) => b.id).toSet();
        for (final o in q.options) {
          expect(
            o.answersByBlankId.keys.toSet(),
            ids,
            reason: 'câu ${q.order} phương án ${o.id} phải phủ đúng đủ ô',
          );
        }
        expect(
          q.checksChoice(q.correctOptionId),
          isTrue,
          reason: 'câu ${q.order}: chọn đúng phải được chấm đúng',
        );
        for (final o in q.options.where((o) => o.id != q.correctOptionId)) {
          expect(
            q.checksChoice(o.id),
            isFalse,
            reason: 'câu ${q.order}: phương án ${o.id} phải bị chấm sai',
          );
        }
      }
    });

    test_('mỗi câu nêu RÕ tình huống trong context', () {
      // Thiếu đúng chỗ này là lý do dạng tự gõ bị bỏ: không đủ tình huống thì
      // đáp án khác cũng đúng. Câu chọn phương án vẫn cần context để loại trừ.
      for (final q in test.questions) {
        expect(q.context, isNotNull, reason: 'câu ${q.order}');
        expect(
          q.context!.trim().length,
          greaterThan(20),
          reason: 'câu ${q.order}: context quá ngắn để loại trừ phương án khác',
        );
      }
    });

    test_('đáp án đúng rải đều A/B/C/D — UI không xáo trộn nên dữ liệu phải tự rải', () {
      final counts = <int, int>{};
      for (final q in test.questions) {
        final index = q.options.indexWhere((o) => o.id == q.correctOptionId);
        expect(index, isNonNegative, reason: 'câu ${q.order}');
        counts[index] = (counts[index] ?? 0) + 1;
      }
      expect(counts.keys.toSet(), {0, 1, 2, 3});
      for (final entry in counts.entries) {
        expect(
          entry.value,
          inInclusiveRange(5, 8),
          reason: 'vị trí ${entry.key} có ${entry.value} câu — lệch quá',
        );
      }
    });
  });

  testWidgets('bấm vào thẻ mở BÀI THẬT, không còn "đang chuẩn bị"', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(1000, 2400);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);

    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          home: Scaffold(
            body: SingleChildScrollView(
              child: DailyLifeModuleCard(
                module: module,
                moduleIndex: 1,
                locale: 'vi',
                nativeLanguageCode: 'vi',
                completedLessonIds: const {},
                initiallyExpanded: true,
                onLessonTap: (_) {},
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    final card = find.text(L10n.text('unitComprehensiveTestTitle', 'vi'));
    expect(card, findsOneWidget);
    await tester.tap(card);
    await tester.pumpAndSettle();

    // Bài thật mở ra…
    expect(find.byType(UnitComprehensiveTestScreen), findsOneWidget);
    // …và KHÔNG còn thông báo tạm.
    expect(
      find.text(L10n.text('unitComprehensiveTestPreparing', 'vi')),
      findsNothing,
    );
    expect(
      find.text(L10n.text('unitComprehensiveTestLockedHint', 'vi')),
      findsNothing,
    );
    expect(tester.takeException(), isNull);
  });
}

/// Alias để không che tên biến `test` (bài tổng hợp) ở phạm vi trên.
void test_(String description, dynamic Function() body) =>
    test(description, body);
