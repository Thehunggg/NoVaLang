// Phase A regression tests (NOVALANG-LESSON-RUNTIME-REMEDIATION-01):
// wrong-answer explanations must always resolve to the learner's *current*
// nativeLanguageCode, never a locale-frozen snapshot, for both statically
// authored content and AI-graded exercises — with safe backward
// compatibility for review records persisted before this fix.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/native_content.dart';
import 'package:novalang_flutter/data/curriculum_repository.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';
import 'package:novalang_flutter/screens/learn/exercises/five_card_exercise_flow.dart';
import 'package:novalang_flutter/services/ai_exercise_grader.dart';
import 'package:novalang_flutter/services/exercise_review_repository.dart';

const _goldenLessonId = 'ja-daily_life-m01-u1-l1';
const _goldenExercise1Id = 'ja-daily_life-m01-u1-l1-practice-1';

ExerciseReviewRecord _record({
  String exerciseId = _goldenExercise1Id,
  int exerciseNumber = 1,
  String exerciseType = 'multiple_choice',
  String? shortExplanation,
  String? explanationLanguageCode,
}) => ExerciseReviewRecord(
  attemptId: 'attempt-1',
  userId: 'user-1',
  localStudyDate: '2026-07-15',
  lessonId: _goldenLessonId,
  lessonTitle: 'Lesson 1',
  exerciseId: exerciseId,
  exerciseNumber: exerciseNumber,
  exerciseType: exerciseType,
  questionDisplay: 'Q',
  userAnswer: 'wrong',
  correctAnswer: 'right',
  isCorrect: false,
  completedAt: '2026-07-15T10:00:00',
  shortExplanation: shortExplanation,
  explanationLanguageCode: explanationLanguageCode,
);

Future<void> _expandCard(WidgetTester tester, int _) async {
  await tester.tap(find.byType(ExpansionTile).first);
  await tester.pumpAndSettle();
}

Widget _wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await CurriculumRepository.load();
  });

  group('static-content explanation re-resolves live per nativeLanguageCode', () {
    testWidgets(
      'vi native shows the vi explanation, not a stale frozen string',
      (tester) async {
        final record = _record(
          shortExplanation: 'STALE FROZEN VI TEXT FROM A PREVIOUS ANSWER',
        );
        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: record,
              uiLanguageCode: 'vi',
              nativeLanguageCode: 'vi',
            ),
          ),
        );
        await _expandCard(tester, 1);

        expect(
          find.textContaining('là lời chào thường dùng vào ban ngày'),
          findsOneWidget,
        );
        expect(
          find.text('💡 STALE FROZEN VI TEXT FROM A PREVIOUS ANSWER'),
          findsNothing,
        );
      },
    );

    testWidgets(
      'switching nativeLanguageCode to ja shows Japanese, not the vi text',
      (tester) async {
        final record = _record(
          shortExplanation: 'こんにちは là lời chào thường dùng vào ban ngày.',
        );

        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: record,
              uiLanguageCode: 'ja',
              nativeLanguageCode: 'ja',
            ),
          ),
        );
        await _expandCard(tester, 1);

        expect(find.textContaining('日中によく使うあいさつ'), findsOneWidget);
        expect(find.textContaining('là lời chào'), findsNothing);
      },
    );

    testWidgets('en native shows the English explanation', (tester) async {
      final record = _record(shortExplanation: 'legacy frozen text');
      await tester.pumpWidget(
        _wrap(
          WrongAnswerReviewCard(
            record: record,
            uiLanguageCode: 'en',
            nativeLanguageCode: 'en',
          ),
        ),
      );
      await _expandCard(tester, 1);

      expect(
        find.textContaining('is a greeting commonly used during the day'),
        findsOneWidget,
      );
      expect(find.textContaining('legacy frozen text'), findsNothing);
    });

    testWidgets(
      'progress/record survives a native-language switch: same record renders correctly in vi then ja',
      (tester) async {
        final record = _record();

        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: record,
              uiLanguageCode: 'vi',
              nativeLanguageCode: 'vi',
            ),
          ),
        );
        await _expandCard(tester, 1);
        expect(find.textContaining('là lời chào'), findsOneWidget);

        // Same underlying record, only nativeLanguageCode changes — nothing
        // about the persisted record is mutated or lost. Reset to an empty
        // tree first so the new card mounts fresh (collapsed) rather than
        // reusing the previous ExpansionTile's open animation state.
        await tester.pumpWidget(_wrap(const SizedBox.shrink()));
        await tester.pumpAndSettle();
        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: record,
              uiLanguageCode: 'ja',
              nativeLanguageCode: 'ja',
            ),
          ),
        );
        await _expandCard(tester, 1);
        expect(find.textContaining('日中によく使うあいさつ'), findsOneWidget);
        expect(find.textContaining('là lời chào'), findsNothing);
        expect(record.userAnswer, 'wrong');
        expect(record.correctAnswer, 'right');
      },
    );
  });

  group('AI-graded explanation locale contract', () {
    testWidgets(
      'matching explanationLanguageCode shows the persisted AI explanation',
      (tester) async {
        final record = _record(
          exerciseType: 'controlled_ai_text',
          shortExplanation: 'Câu trả lời còn thiếu: lời chào.',
          explanationLanguageCode: 'vi',
        );
        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: record,
              uiLanguageCode: 'vi',
              nativeLanguageCode: 'vi',
            ),
          ),
        );
        await _expandCard(tester, 1);

        expect(
          find.byKey(const ValueKey('wrong-answer-explanation')),
          findsOneWidget,
        );
        expect(
          find.byKey(const ValueKey('wrong-answer-explanation-notice')),
          findsNothing,
        );
      },
    );

    testWidgets(
      'mismatched explanationLanguageCode surfaces a notice instead of stale-language text',
      (tester) async {
        final record = _record(
          exerciseType: 'controlled_ai_text',
          shortExplanation: 'Câu trả lời còn thiếu: lời chào.',
          explanationLanguageCode: 'vi',
        );
        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: record,
              uiLanguageCode: 'ja',
              nativeLanguageCode: 'ja',
            ),
          ),
        );
        await _expandCard(tester, 1);

        expect(
          find.byKey(const ValueKey('wrong-answer-explanation-notice')),
          findsOneWidget,
        );
        expect(
          find.byKey(const ValueKey('wrong-answer-explanation')),
          findsNothing,
        );
        expect(find.textContaining('lời chào'), findsNothing);
      },
    );

    testWidgets(
      'legacy record with no explanationLanguageCode is treated as unknown-locale, never shown as a locale match',
      (tester) async {
        final legacyRecord = _record(
          exerciseType: 'controlled_ai_text',
          shortExplanation: 'frozen text persisted before this fix existed',
          explanationLanguageCode: null,
        );

        await tester.pumpWidget(
          _wrap(
            WrongAnswerReviewCard(
              record: legacyRecord,
              uiLanguageCode: 'vi',
              nativeLanguageCode: 'vi',
            ),
          ),
        );
        await _expandCard(tester, 1);

        // No crash (backward compatible), and the frozen text is never
        // silently presented as if it matched the current locale.
        expect(
          find.byKey(const ValueKey('wrong-answer-explanation-notice')),
          findsOneWidget,
        );
        expect(find.textContaining('frozen text persisted'), findsNothing);
      },
    );
  });

  group('ExerciseReviewRecord backward compatibility', () {
    test(
      'fromJson on a pre-fix payload without explanationLanguageCode does not crash',
      () {
        final legacyJson = <String, dynamic>{
          'attemptId': 'a1',
          'userId': 'u1',
          'localStudyDate': '2026-07-01',
          'lessonId': _goldenLessonId,
          'lessonTitle': 'Lesson 1',
          'exerciseId': _goldenExercise1Id,
          'exerciseNumber': 1,
          'exerciseType': 'controlled_ai_text',
          'questionDisplay': 'Q',
          'userAnswer': 'a',
          'correctAnswer': 'b',
          'isCorrect': false,
          'shortExplanation': 'old frozen explanation',
          'completedAt': '2026-07-01T00:00:00',
          // Deliberately no 'explanationLanguageCode' key at all.
        };

        final record = ExerciseReviewRecord.fromJson(legacyJson);

        expect(record.explanationLanguageCode, isNull);
        expect(record.shortExplanation, 'old frozen explanation');
        expect(record.isAiGradedExplanation, isTrue);
      },
    );

    test('round-trips explanationLanguageCode through toJson/fromJson', () {
      final record = _record(
        exerciseType: 'controlled_ai_text',
        shortExplanation: 'text',
        explanationLanguageCode: 'ja',
      );
      final restored = ExerciseReviewRecord.fromJson(record.toJson());
      expect(restored.explanationLanguageCode, 'ja');
      expect(restored.isAiGradedExplanation, isTrue);
    });

    test('isAiGradedExplanation is false for statically authored types', () {
      expect(
        _record(exerciseType: 'multiple_choice').isAiGradedExplanation,
        isFalse,
      );
      expect(
        _record(exerciseType: 'chat_text_fill').isAiGradedExplanation,
        isFalse,
      );
    });
  });

  group('AI grading request/response locale contract', () {
    PracticeExercise exercise() => PracticeExercise.fromMap(const {
      'id': 'ex',
      'order': 1,
      'plan': 'plus',
      'type': 'controlled_ai_text',
    });

    test(
      'request carries nativeLanguageCode and grader honors it (vi/en/ja)',
      () async {
        const grader = DevMockAiExerciseGrader();

        final vi = await grader.grade(
          AiExerciseGradingRequest(
            exercise: exercise(),
            answer: 'no matching phrases',
            nativeLanguageCode: 'vi',
          ),
        );
        final en = await grader.grade(
          AiExerciseGradingRequest(
            exercise: exercise(),
            answer: 'no matching phrases',
            nativeLanguageCode: 'en',
          ),
        );
        final ja = await grader.grade(
          AiExerciseGradingRequest(
            exercise: exercise(),
            answer: 'no matching phrases',
            nativeLanguageCode: 'ja',
          ),
        );

        expect(vi.shortExplanation, contains('lời chào'));
        expect(en.shortExplanation, contains('a greeting'));
        expect(ja.shortExplanation, contains('あいさつ'));
        // No cross-language leakage between locales.
        expect(vi.shortExplanation, isNot(contains('greeting')));
        expect(en.shortExplanation, isNot(contains('lời chào')));
        expect(ja.shortExplanation, isNot(contains('lời chào')));
      },
    );

    test('unsupported locale never silently falls back to vi/en', () async {
      const grader = DevMockAiExerciseGrader();
      final result = await grader.grade(
        AiExerciseGradingRequest(
          exercise: exercise(),
          answer: 'no matching phrases',
          nativeLanguageCode: 'fr',
        ),
      );

      expect(
        result.shortExplanation,
        missingNativeContentSentinel('aiExerciseGrader.explanation', 'fr'),
      );
      expect(result.shortExplanation, isNot(contains('lời chào')));
      expect(result.shortExplanation, isNot(contains('greeting')));
    });

    test(
      'passing answer produces no explanation regardless of locale',
      () async {
        const grader = DevMockAiExerciseGrader();
        final result = await grader.grade(
          AiExerciseGradingRequest(
            exercise: exercise(),
            answer: 'はじめまして。私はTanakaです。よろしくお願いします。',
            nativeLanguageCode: 'vi',
          ),
        );
        expect(result.passed, isTrue);
        expect(result.shortExplanation, isEmpty);
      },
    );
  });
}
