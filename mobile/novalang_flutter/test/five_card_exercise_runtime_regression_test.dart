import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';
import 'package:novalang_flutter/models/lesson_completion.dart';
import 'package:novalang_flutter/models/user_profile.dart';
import 'package:novalang_flutter/screens/learn/exercises/five_card_exercise_flow.dart';
import 'package:novalang_flutter/services/ai_exercise_grader.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/services/golden_lesson_completion_action.dart';
import 'package:novalang_flutter/services/lesson_completion_orchestrator.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _lessonId = 'ja-daily_life-m01-u1-l1';
const _trackId = 'daily_life';
const _attemptId = 'runtime-attempt-1';

ExerciseAttemptSnapshot _snapshot({
  int index = 13,
  bool completed = false,
  String attemptId = _attemptId,
  Map<String, List<String>> orderByExercise = const {},
}) => ExerciseAttemptSnapshot(
  userId: UserProfile.defaults().userId,
  userTrackId: _trackId,
  attemptId: attemptId,
  lessonId: _lessonId,
  currentExerciseIndex: index,
  orderByExercise: orderByExercise,
  results: const {},
  answers: const {},
  startedAt: '2026-07-14T00:00:00Z',
  lastUpdatedAt: '2026-07-14T00:05:00Z',
  isCompleted: completed,
);

ExerciseAttemptSnapshot _copySnapshot(
  ExerciseAttemptSnapshot value, {
  bool? completed,
}) => ExerciseAttemptSnapshot(
  userId: value.userId,
  userTrackId: value.userTrackId,
  attemptId: value.attemptId,
  lessonId: value.lessonId,
  currentExerciseIndex: value.currentExerciseIndex,
  orderByExercise: value.orderByExercise,
  results: value.results,
  answers: value.answers,
  subIndex: value.subIndex,
  subResults: value.subResults,
  checked: value.checked,
  aiGrade: value.aiGrade,
  startedAt: value.startedAt,
  lastUpdatedAt: value.lastUpdatedAt,
  isCompleted: completed ?? value.isCompleted,
);

class _MemoryAttempts implements ExerciseAttemptRepository {
  _MemoryAttempts([ExerciseAttemptSnapshot? initial]) {
    if (initial != null) snapshots[initial.attemptId] = initial;
  }

  final Map<String, ExerciseAttemptSnapshot> snapshots = {};
  int saveCalls = 0;

  @override
  Future<ExerciseAttemptSnapshot?> active({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => snapshots.values
      .where(
        (item) =>
            item.userId == userId &&
            item.userTrackId == userTrackId &&
            item.lessonId == lessonId &&
            !item.isCompleted,
      )
      .firstOrNull;

  @override
  Future<void> complete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async {
    for (final entry in snapshots.entries.toList()) {
      final item = entry.value;
      if (item.userId == userId &&
          item.userTrackId == userTrackId &&
          item.lessonId == lessonId) {
        snapshots[entry.key] = _copySnapshot(item, completed: true);
      }
    }
  }

  @override
  Future<ExerciseAttemptSnapshot?> findByAttemptId(String attemptId) async =>
      snapshots[attemptId];

  @override
  Future<void> save(ExerciseAttemptSnapshot snapshot) async {
    saveCalls += 1;
    snapshots[snapshot.attemptId] = snapshot;
  }
}

class _UnusedOrchestrator implements LessonCompletionOrchestrator {
  @override
  Future<LessonCompletionOutcome> completeLesson(
    LessonCompletionRequest request,
  ) => throw UnimplementedError();
}

typedef _ActionBehavior = Future<GoldenLessonCompletionActionResult> Function();

class _FakeCompletionAction extends GoldenLessonCompletionAction {
  _FakeCompletionAction({required super.attempts, required this.behavior})
    : super(orchestrator: _UnusedOrchestrator());

  final _ActionBehavior behavior;
  int calls = 0;

  @override
  Future<GoldenLessonCompletionActionResult> run({
    required String attemptId,
    required String userId,
    required String userTrackId,
    required String lessonId,
    required Future<bool> Function() applyUiCompatibilityBridgeOnce,
  }) {
    calls += 1;
    return behavior();
  }
}

GoldenLessonCompletionActionResult _successResult(
  ExerciseAttemptSnapshot attempt,
) => GoldenLessonCompletionActionResult(
  attempt: attempt,
  outcome: LessonCompletionOutcome(
    completionResult: LessonCompletionResult.invalidAttempt(),
  ),
  compatibilityApplied: false,
);

class _NavigationObserver extends NavigatorObserver {
  int pops = 0;

  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    pops += 1;
    super.didPop(route, previousRoute);
  }
}

Future<FiveCardPractice> _loadPractice() async {
  final raw = await rootBundle.loadString('assets/shared/lessons.json');
  final payload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
  final lessonJson = (payload['lessons'] as List)
      .cast<Map>()
      .map((item) => Map<String, dynamic>.from(item))
      .singleWhere((item) => item['id'] == _lessonId);
  final lesson = CurriculumLesson.fromJson(
    lessonJson,
  ).toLesson(nativeLanguage: 'vi');
  return FiveCardPractice.fromLesson(lesson, nativeLanguageCode: 'vi')!;
}

Future<void> _pumpSession(
  WidgetTester tester, {
  required FiveCardPractice practice,
  required _MemoryAttempts attempts,
  required GoldenLessonCompletionAction action,
  required ExerciseAttemptSnapshot restoredAttempt,
  NavigatorObserver? observer,
}) async {
  tester.view.physicalSize = const Size(800, 360);
  tester.view.devicePixelRatio = 1;
  addTearDown(() {
    tester.view.resetPhysicalSize();
    tester.view.resetDevicePixelRatio();
  });
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        exerciseAttemptRepositoryProvider.overrideWithValue(attempts),
        goldenLessonCompletionActionProvider.overrideWithValue(action),
        aiExerciseGraderProvider.overrideWithValue(
          const DevMockAiExerciseGrader(),
        ),
      ],
      child: MaterialApp(
        theme: ThemeData.dark(),
        navigatorObservers: [?observer],
        home: Builder(
          builder: (context) => Scaffold(
            body: Center(
              child: FilledButton(
                onPressed: () => Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (_) => FiveCardExerciseSessionPage(
                      practice: practice,
                      lessonId: _lessonId,
                      lessonLevel: 'A0',
                      userTrackId: _trackId,
                      lessonTitle: 'Golden lesson',
                      uiLanguageCode: 'vi',
                      learningLanguageCode: 'ja',
                      nativeLanguageCode: 'vi',
                      restoredAttempt: restoredAttempt,
                    ),
                  ),
                ),
                child: const Text('Open exercise'),
              ),
            ),
          ),
        ),
      ),
    ),
  );
  await tester.tap(find.text('Open exercise'));
  await tester.pumpAndSettle();
}

Future<void> _pumpResult(
  WidgetTester tester, {
  required FiveCardPractice practice,
  required GoldenLessonCompletionAction action,
  NavigatorObserver? observer,
  String attemptId = _attemptId,
}) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        goldenLessonCompletionActionProvider.overrideWithValue(action),
      ],
      child: MaterialApp(
        theme: ThemeData.dark(),
        navigatorObservers: [?observer],
        home: Builder(
          builder: (context) => Scaffold(
            body: Center(
              child: FilledButton(
                onPressed: () => Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (_) => FiveCardExerciseResultPage(
                      practice: practice,
                      results: const {},
                      uiLanguageCode: 'vi',
                      lessonId: _lessonId,
                      userTrackId: _trackId,
                      attemptId: attemptId,
                    ),
                  ),
                ),
                child: const Text('Open result'),
              ),
            ),
          ),
        ),
      ),
    ),
  );
  await tester.tap(find.text('Open result'));
  await tester.pumpAndSettle();
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late FiveCardPractice practice;

  setUpAll(() async {
    practice = await _loadPractice();
  });

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  testWidgets(
    '1. system Back before completion opens safe exit and preserves attempt',
    (tester) async {
      final attempts = _MemoryAttempts(_snapshot(index: 0));
      final action = _FakeCompletionAction(
        attempts: attempts,
        behavior: () async => _successResult(_snapshot()),
      );
      await _pumpSession(
        tester,
        practice: practice,
        attempts: attempts,
        action: action,
        restoredAttempt: _snapshot(index: 0),
      );

      await tester.binding.handlePopRoute();
      await tester.pumpAndSettle();

      expect(find.byType(AlertDialog), findsOneWidget);
      await tester.tap(
        find.descendant(
          of: find.byType(AlertDialog),
          matching: find.byType(FilledButton),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Open exercise'), findsOneWidget);
      expect(attempts.snapshots[_attemptId], isNotNull);
      expect(attempts.snapshots[_attemptId]!.isCompleted, isFalse);
      expect(action.calls, 0);
    },
  );

  testWidgets('2. Back from feedback keeps the checked exercise usable', (
    tester,
  ) async {
    final restored = _snapshot(
      index: 0,
      orderByExercise: PracticeAttempt.create(practice).orderByExercise,
    );
    final attempts = _MemoryAttempts(restored);
    final action = _FakeCompletionAction(
      attempts: attempts,
      behavior: () async => _successResult(_snapshot()),
    );
    await _pumpSession(
      tester,
      practice: practice,
      attempts: attempts,
      action: action,
      restoredAttempt: restored,
    );
    final firstOption = find.byType(OutlinedButton).first;
    await tester.ensureVisible(firstOption);
    await tester.tap(firstOption);
    await tester.tap(find.text(L10n.text('checkAnswer', 'vi')));
    await tester.pumpAndSettle();
    expect(find.text(L10n.text('continue', 'vi')), findsOneWidget);

    await tester.binding.handlePopRoute();
    await tester.pumpAndSettle();
    await tester.tap(
      find.descendant(
        of: find.byType(AlertDialog),
        matching: find.byType(TextButton),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text(L10n.text('continue', 'vi')), findsOneWidget);
    expect(action.calls, 0);
  });

  testWidgets(
    '3. Q14 happy path persists completion, opens Result, and leaves once',
    (tester) async {
      final attempts = _MemoryAttempts(_snapshot());
      final action = _FakeCompletionAction(
        attempts: attempts,
        behavior: () async => _successResult(_snapshot(completed: true)),
      );
      final observer = _NavigationObserver();
      await _pumpSession(
        tester,
        practice: practice,
        attempts: attempts,
        action: action,
        restoredAttempt: _snapshot(),
        observer: observer,
      );

      // Lesson Format 3.0: Q14 is the non-graded Real-World Practice dialogue
      // — no text input, no Check Answer, no AI grading. Completing it goes
      // straight to the Result page (it is the last exercise).
      await tester.tap(find.byKey(const ValueKey('dialogue-complete-button')));
      await tester.pumpAndSettle();

      expect(find.byType(FiveCardExerciseResultPage), findsOneWidget);
      expect(attempts.snapshots[_attemptId]!.isCompleted, isTrue);
      await tester.tap(find.text(L10n.text('backToLesson', 'vi')));
      await tester.pumpAndSettle();
      expect(find.text('Open exercise'), findsOneWidget);
      expect(action.calls, 1);
      expect(observer.pops, 1);
    },
  );

  testWidgets('4. Q14 pipeline failure stays on Result and exposes Retry', (
    tester,
  ) async {
    final attempts = _MemoryAttempts(_snapshot(completed: true));
    final action = _FakeCompletionAction(
      attempts: attempts,
      behavior: () async => throw const GoldenLessonCompletionPipelineException(
        failedSubscriberIds: ['test.subscriber'],
      ),
    );
    await _pumpResult(tester, practice: practice, action: action);

    await tester.tap(find.text(L10n.text('backToLesson', 'vi')));
    await tester.pumpAndSettle();

    expect(tester.takeException(), isNull);
    expect(find.byType(FiveCardExerciseResultPage), findsOneWidget);
    expect(find.text(L10n.text('tryAgain', 'vi')), findsWidgets);
    expect(action.calls, 1);
  });

  testWidgets('5. failure then Retry recovers and navigates once', (
    tester,
  ) async {
    final attempts = _MemoryAttempts(_snapshot(completed: true));
    var shouldFail = true;
    final action = _FakeCompletionAction(
      attempts: attempts,
      behavior: () async {
        if (shouldFail) {
          shouldFail = false;
          throw const GoldenLessonCompletionPipelineException(
            failedSubscriberIds: ['test.subscriber'],
          );
        }
        return _successResult(_snapshot(completed: true));
      },
    );
    final observer = _NavigationObserver();
    await _pumpResult(
      tester,
      practice: practice,
      action: action,
      observer: observer,
    );

    await tester.tap(find.text(L10n.text('backToLesson', 'vi')));
    await tester.pumpAndSettle();
    await tester.tap(find.text(L10n.text('tryAgain', 'vi')).last);
    await tester.pumpAndSettle();

    expect(find.text('Open result'), findsOneWidget);
    expect(action.calls, 2);
    expect(observer.pops, 1);
  });

  testWidgets('6. rapid completion taps run one action and one navigation', (
    tester,
  ) async {
    final attempts = _MemoryAttempts(_snapshot(completed: true));
    final pending = Completer<GoldenLessonCompletionActionResult>();
    final action = _FakeCompletionAction(
      attempts: attempts,
      behavior: () => pending.future,
    );
    final observer = _NavigationObserver();
    await _pumpResult(
      tester,
      practice: practice,
      action: action,
      observer: observer,
    );
    final finish = find.text(L10n.text('backToLesson', 'vi'));

    await tester.tap(finish);
    await tester.tap(finish);
    await tester.tap(finish);
    await tester.pump();
    expect(action.calls, 1);

    pending.complete(_successResult(_snapshot(completed: true)));
    await tester.pumpAndSettle();
    expect(find.text('Open result'), findsOneWidget);
    expect(observer.pops, 1);
  });

  testWidgets(
    '7. restarted repository resolves completed attemptId through Result action',
    (tester) async {
      final writer = SharedPreferencesExerciseAttemptRepository();
      await writer.save(
        _snapshot(completed: true, attemptId: 'restart-attempt'),
      );
      final restarted = SharedPreferencesExerciseAttemptRepository();
      final restored = await restarted.findByAttemptId('restart-attempt');
      expect(restored?.isCompleted, isTrue);

      final action = _FakeCompletionAction(
        attempts: restarted,
        behavior: () async => _successResult(restored!),
      );
      await _pumpResult(
        tester,
        practice: practice,
        action: action,
        attemptId: 'restart-attempt',
      );
      await tester.tap(find.text(L10n.text('backToLesson', 'vi')));
      await tester.pumpAndSettle();

      expect(find.text('Open result'), findsOneWidget);
      expect(action.calls, 1);
    },
  );
}
