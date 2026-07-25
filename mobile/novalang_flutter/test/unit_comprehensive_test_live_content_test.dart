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

    test_('chia đúng ba mức 8 / 10 / 7 theo dải order', () {
      int countOf(UnitComprehensiveQuestionKind kind) =>
          test.questions.where((q) => q.kind == kind).length;
      expect(countOf(UnitComprehensiveQuestionKind.sentenceMultiBlankChoice), 8);
      expect(countOf(UnitComprehensiveQuestionKind.dialogueMultiBlankChoice), 10);
      expect(countOf(UnitComprehensiveQuestionKind.typedBlank), 7);
      for (final q in test.questions) {
        final expected = q.order <= 8
            ? UnitComprehensiveQuestionKind.sentenceMultiBlankChoice
            : q.order <= 18
                ? UnitComprehensiveQuestionKind.dialogueMultiBlankChoice
                : UnitComprehensiveQuestionKind.typedBlank;
        expect(q.kind, expected, reason: 'câu ${q.order}');
      }
    });

    test_('ô tự gõ chấm được đúng cả dạng kanji lẫn kana, kể cả gõ thừa dấu cách', () {
      final typed = test.questions
          .where((q) => q.kind == UnitComprehensiveQuestionKind.typedBlank);
      for (final q in typed) {
        for (final b in q.blanks) {
          for (final accepted in b.acceptedAnswers) {
            expect(
              b.matches(accepted, languageCode: test.languageCode),
              isTrue,
              reason: 'câu ${q.order} ô ${b.id}: "$accepted" phải đúng',
            );
          }
          // Dấu cách người học lỡ chèn không được làm sai đáp án đúng.
          expect(
            b.matches(
              ' ${b.canonicalAnswer} ',
              languageCode: test.languageCode,
            ),
            isTrue,
            reason: 'câu ${q.order} ô ${b.id}: gõ thừa dấu cách vẫn phải đúng',
          );
        }
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
