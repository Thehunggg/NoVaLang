// Phase F tests (NOVALANG-LESSON-RUNTIME-REMEDIATION-01): the
// unit_comprehensive_conversation card must render inside each expanded Unit,
// immediately after the third child Lesson, must respect the
// PlanAccessPolicy locked/available contract, and must never open invented
// content.
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/models/course_unit.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/services/plan_access_policy.dart';
import 'package:novalang_flutter/widgets/learn/daily_life_module_card.dart';

Lesson _lesson(String id) => Lesson(
  id: id,
  title: id,
  track: 'daily_life',
  level: 'N5',
  template: LessonTemplate.vocabularyLesson,
  description: id,
  exercises: const [],
);

CourseUnit _unitWithLessonCount(String id, String title, int lessonCount) => CourseUnit(
  id: id,
  title: title,
  titleVi: title,
  titleByNative: {'vi': title, 'en': title, 'ja': title},
  levelCode: 'N5',
  trackId: 'daily_life',
  goal: 'goal',
  goalVi: 'goal',
  goalByNative: {'vi': 'goal', 'en': 'goal', 'ja': 'goal'},
  lessons: List.generate(lessonCount, (index) => _lesson('$id-l${index + 1}')),
  moduleId: 'm1',
  moduleTitle: 'Module 1',
  moduleTitleByNative: {'vi': 'Module 1', 'en': 'Module 1', 'ja': 'Module 1'},
);

CourseUnit _unit(String id, String title) => _unitWithLessonCount(id, title, 3);

CurriculumModuleGroup _module(List<CourseUnit> units) =>
    CurriculumModuleGroup.fromUnits(units).single;

Widget _wrapCard(
  CurriculumModuleGroup module, {
  PlanAccessPolicy? policy,
}) => ProviderScope(
  overrides: [
    if (policy != null) planAccessPolicyProvider.overrideWithValue(policy),
  ],
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
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('position within a Unit', () {
    testWidgets(
      'appears immediately after Lesson 3 inside Unit 1 and before Unit 2',
      (tester) async {
        final module = _module([
          _unit('u1', 'Unit 1'),
          _unit('u2', 'Unit 2'),
        ]);
        await tester.pumpWidget(_wrapCard(module));
        await tester.pumpAndSettle();

        expect(
          find.text(L10n.text('unitComprehensiveConversationTitle', 'vi')),
          findsOneWidget,
        );

        final lesson3Y = tester.getCenter(find.text('u1-l3')).dy;
        final cardY = tester
            .getCenter(
              find.text(L10n.text('unitComprehensiveConversationTitle', 'vi')),
            )
            .dy;
        final unit2Y = tester.getCenter(find.text('Unit 2')).dy;

        expect(lesson3Y, lessThan(cardY));
        expect(cardY, lessThan(unit2Y));
      },
    );

    testWidgets('does not render for a Unit with fewer than three lessons', (
      tester,
    ) async {
      final module = _module([
        _unitWithLessonCount('u1', 'Unit 1', 2),
        _unit('u2', 'Unit 2'),
      ]);
      await tester.pumpWidget(_wrapCard(module));
      await tester.pumpAndSettle();

      expect(
        find.text(L10n.text('unitComprehensiveConversationTitle', 'vi')),
        findsNothing,
      );
    });
  });

  group('access-policy locked/available shell', () {
    testWidgets('Free tier (production-safe default) shows locked hint', (
      tester,
    ) async {
      final module = _module([
        _unit('u1', 'Unit 1'),
        _unit('u2', 'Unit 2'),
        _unit('u3', 'Unit 3'),
      ]);
      await tester.pumpWidget(_wrapCard(module));
      await tester.pumpAndSettle();

      expect(
        find.text(
          L10n.text('unitComprehensiveConversationLockedHint', 'vi'),
        ),
        findsOneWidget,
      );

      await tester.tap(
        find.text(L10n.text('unitComprehensiveConversationTitle', 'vi')),
      );
      await tester.pumpAndSettle();
      expect(
        find.text(
          L10n.text('unitComprehensiveConversationLockedHint', 'vi'),
        ),
        findsWidgets,
      );
      expect(
        find.text(
          L10n.text('unitComprehensiveConversationPreparing', 'vi'),
        ),
        findsNothing,
      );
    });

    for (final tier in [PlanTier.plus, PlanTier.pro, PlanTier.ultimate]) {
      testWidgets(
        '${tier.name} tier shows available shell (no locked hint) and no fake content on tap',
        (tester) async {
          final module = _module([
            _unit('u1', 'Unit 1'),
            _unit('u2', 'Unit 2'),
            _unit('u3', 'Unit 3'),
          ]);
          await tester.pumpWidget(
            _wrapCard(module, policy: FixedPlanAccessPolicy(tier)),
          );
          await tester.pumpAndSettle();

          expect(
            find.text(
              L10n.text('unitComprehensiveConversationLockedHint', 'vi'),
            ),
            findsNothing,
          );

          await tester.tap(
            find.text(L10n.text('unitComprehensiveConversationTitle', 'vi')),
          );
          await tester.pumpAndSettle();

          // Tapping an unlocked-but-content-less card must never open a
          // fake conversation screen — only a "preparing" notice.
          expect(
            find.text(
              L10n.text('unitComprehensiveConversationPreparing', 'vi'),
            ),
            findsOneWidget,
          );
        },
      );
    }

    testWidgets('free tier never has plus access; plus/pro/ultimate all do', (
      tester,
    ) async {
      expect(PlanTier.free.hasPlusAccess, isFalse);
      expect(PlanTier.plus.hasPlusAccess, isTrue);
      expect(PlanTier.pro.hasPlusAccess, isTrue);
      expect(PlanTier.ultimate.hasPlusAccess, isTrue);
    });

    test('production-safe policy always resolves Free for any user', () {
      const policy = ProductionSafePlanAccessPolicy();
      expect(policy.tierFor('any-user'), PlanTier.free);
      expect(policy.tierFor('mock_guest_user'), PlanTier.free);
    });
  });

  group('localization purity', () {
    for (final locale in ['vi', 'en', 'ja']) {
      test('$locale has non-empty, non-sentinel text for all card keys', () {
        for (final key in [
          'unitComprehensiveConversationTitle',
          'unitComprehensiveConversationDescription',
          'unitComprehensiveConversationLockedHint',
          'unitComprehensiveConversationPreparing',
        ]) {
          final text = L10n.text(key, locale);
          expect(text, isNotEmpty, reason: '$key/$locale');
          expect(text.contains('missing-content'), isFalse, reason: '$key/$locale');
        }
      });
    }

    test('vi/en/ja title wording is distinct per locale (no cross-language leak)', () {
      final vi = L10n.text('unitComprehensiveConversationTitle', 'vi');
      final en = L10n.text('unitComprehensiveConversationTitle', 'en');
      final ja = L10n.text('unitComprehensiveConversationTitle', 'ja');
      expect({vi, en, ja}, hasLength(3));
    });
  });
}
