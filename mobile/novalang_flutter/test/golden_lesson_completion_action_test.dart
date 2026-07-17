import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/canonical_event.dart';
import 'package:novalang_flutter/models/lesson_completion.dart';
import 'package:novalang_flutter/repositories/canonical_event_repository.dart';
import 'package:novalang_flutter/repositories/curriculum_progress_repository.dart';
import 'package:novalang_flutter/repositories/lesson_completion_repository.dart';
import 'package:novalang_flutter/repositories/mock_subscriber_evidence_repository.dart';
import 'package:novalang_flutter/repositories/usage_ledger_repository.dart';
import 'package:novalang_flutter/services/canonical_event_dispatcher.dart';
import 'package:novalang_flutter/services/curriculum_progress_projector.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/services/golden_lesson_completion_action.dart';
import 'package:novalang_flutter/services/lesson_completion_orchestrator.dart';
import 'package:novalang_flutter/services/lesson_completion_service.dart';
import 'package:novalang_flutter/services/mock_core_subscribers.dart';
import 'package:novalang_flutter/services/usage_ledger_service.dart';
import 'package:novalang_flutter/state/profile_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';
const _lessonId = 'ja-daily_life-m01-u1-l1';
const _attemptId = 'attempt-1';

ExerciseAttemptSnapshot attempt({
  String attemptId = _attemptId,
  bool isCompleted = true,
}) => ExerciseAttemptSnapshot(
  userId: _userId,
  userTrackId: _trackId,
  attemptId: attemptId,
  lessonId: _lessonId,
  currentExerciseIndex: 13,
  orderByExercise: const {},
  results: const {},
  answers: const {},
  startedAt: '2026-07-14T00:00:00Z',
  lastUpdatedAt: '2026-07-14T00:30:00Z',
  isCompleted: isCompleted,
);

class _Ids
    implements
        CompletionIdGenerator,
        CanonicalEventIdGenerator,
        UsageEntryIdGenerator,
        MockEvidenceIdGenerator {
  _Ids(this.prefix);
  final String prefix;
  int index = 0;
  @override
  String nextId() => '$prefix-${++index}';
}

class _FixedClock
    implements CompletionClock, CanonicalEventClock, UsageLedgerClock {
  const _FixedClock();
  @override
  DateTime now() => DateTime.utc(2026, 7, 14, 10, 5);
}

class _AlwaysFailingSubscriber implements CanonicalEventSubscriber {
  @override
  String get subscriberId => 'test.always_fail';

  @override
  Future<void> handle(CanonicalEvent event) async {
    throw StateError('persistent subscriber failure');
  }
}

class _ControllableSubscriber implements CanonicalEventSubscriber {
  bool fail = true;
  int attempts = 0;

  @override
  String get subscriberId => 'test.controllable';

  @override
  Future<void> handle(CanonicalEvent event) async {
    attempts += 1;
    if (fail) {
      throw StateError('controllable subscriber failure');
    }
  }
}

class _DenyEligibility implements LessonCompletionEligibility {
  const _DenyEligibility();

  @override
  Future<bool> canComplete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => false;
}

class _Harness {
  _Harness({List<CanonicalEventSubscriber> extraSubscribers = const []})
    : attempts = SharedPreferencesExerciseAttemptRepository(),
      completions = SharedPreferencesLessonCompletionRepository(),
      events = SharedPreferencesCanonicalEventRepository(),
      usage = SharedPreferencesUsageLedgerRepository(),
      progress = SharedPreferencesCurriculumProgressRepository(),
      core5 = SharedPreferencesMockCore5EvidenceRepository(),
      core6 = SharedPreferencesMockCore6EvidenceRepository() {
    dispatcher = LocalCanonicalEventDispatcher(
      events: events,
      clock: const _FixedClock(),
      ids: _Ids('event'),
    );
    dispatcher.subscribe(
      UsageLedgerEventSubscriber(
        usageLedger: LocalUsageLedgerService(
          ledger: usage,
          clock: const _FixedClock(),
          dateResolver: const UtcUsageDateResolver(),
          ids: _Ids('usage'),
        ),
        clock: const _FixedClock(),
      ),
    );
    dispatcher.subscribe(CurriculumProgressProjector(repository: progress));
    dispatcher.subscribe(
      MockCore5Subscriber(repository: core5, ids: _Ids('evidence-core5')),
    );
    dispatcher.subscribe(
      MockCore6Subscriber(repository: core6, ids: _Ids('evidence-core6')),
    );
    for (final subscriber in extraSubscribers) {
      dispatcher.subscribe(subscriber);
    }
    orchestrator = GoldenLessonCompletionOrchestrator(
      completions: LocalLessonCompletionService(
        attempts: attempts,
        completions: completions,
        eligibility: const AllowLessonCompletionEligibility(),
        clock: const _FixedClock(),
        ids: _Ids('completion'),
      ),
      dispatcher: dispatcher,
      eventClock: const _FixedClock(),
    );
    action = GoldenLessonCompletionAction(
      attempts: attempts,
      orchestrator: orchestrator,
    );
  }

  final SharedPreferencesExerciseAttemptRepository attempts;
  final SharedPreferencesLessonCompletionRepository completions;
  final SharedPreferencesCanonicalEventRepository events;
  final SharedPreferencesUsageLedgerRepository usage;
  final SharedPreferencesCurriculumProgressRepository progress;
  final SharedPreferencesMockCore5EvidenceRepository core5;
  final SharedPreferencesMockCore6EvidenceRepository core6;
  late final LocalCanonicalEventDispatcher dispatcher;
  late final GoldenLessonCompletionOrchestrator orchestrator;
  late final GoldenLessonCompletionAction action;
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  test('legacy active() path cannot resolve a completed attempt', () async {
    final repository = SharedPreferencesExerciseAttemptRepository();
    await repository.save(attempt(isCompleted: true));

    expect(
      await repository.active(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      ),
      isNull,
    );
    expect(
      (await repository.findByAttemptId(_attemptId))?.isCompleted,
      isTrue,
    );
  });

  test(
    'production action runs pipeline via completed attemptId and applies UI-only bridge',
    () async {
      final harness = _Harness();
      await harness.attempts.save(attempt(isCompleted: true));

      final container = ProviderContainer();
      addTearDown(container.dispose);
      final profileBefore = container.read(profileProvider);
      final heartsBefore = profileBefore.hearts;
      final dailyRewardBefore = profileBefore.dailyGoalRewardClaimedDate;
      var bridgeApplications = 0;

      final result = await harness.action.run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: () async {
          final applied = await container
              .read(profileProvider.notifier)
              .applyLessonCompletionCompatibilityOnce(
                lessonId: _lessonId,
                stepId: 'five-card-exercise',
                currentStepIndex: 0,
                lessonComplete: true,
              );
          if (applied) bridgeApplications += 1;
          return applied;
        },
      );

      expect(result.outcome.completionResult.status, LessonCompletionStatus.recorded);
      expect(result.outcome.dispatchOutcome!.allSucceeded, isTrue);
      expect(result.compatibilityApplied, isTrue);
      final completionId = result.outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);
      final usageEntries = await harness.usage.listForUserTrackDate(
        userId: _userId,
        userTrackId: _trackId,
        usageDate: '2026-07-14',
      );
      final projection = await harness.progress.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      final core5 = await harness.core5.findByEventId(storedEvent!.eventId);
      final core6 = await harness.core6.findByEventId(storedEvent.eventId);
      final profileAfter = container.read(profileProvider);

      expect(storedEvent.sourceRecordId, completionId);
      expect(usageEntries.single.sourceRecordId, completionId);
      expect(usageEntries.single.sourceEventId, storedEvent.eventId);
      expect(projection!.sourceCompletionId, completionId);
      expect(projection.lastProcessedEventId, storedEvent.eventId);
      expect(core5!.eventId, storedEvent.eventId);
      expect(core5.sourceRecordId, completionId);
      expect(core6!.eventId, storedEvent.eventId);
      expect(core6.sourceRecordId, completionId);

      expect(bridgeApplications, 1);
      expect(profileAfter.completedLessonIds, [_lessonId]);
      expect(profileAfter.hearts, heartsBefore);
      expect(profileAfter.dailyGoalRewardClaimedDate, dailyRewardBefore);
    },
  );

  test(
    'persistent subscriber failure fails the action and skips the bridge',
    () async {
      final harness = _Harness(extraSubscribers: [_AlwaysFailingSubscriber()]);
      await harness.attempts.save(attempt(isCompleted: true));
      final container = ProviderContainer();
      addTearDown(container.dispose);
      var bridgeApplications = 0;

      await expectLater(
        harness.action.run(
          attemptId: _attemptId,
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          applyUiCompatibilityBridgeOnce: () async {
            bridgeApplications += 1;
            return true;
          },
        ),
        throwsA(
          isA<GoldenLessonCompletionPipelineException>().having(
            (error) => error.failedSubscriberIds,
            'failedSubscriberIds',
            contains('test.always_fail'),
          ),
        ),
      );

      expect(bridgeApplications, 0);
      expect(container.read(profileProvider).completedLessonIds, isEmpty);
      expect(await harness.completions.findByAttemptId(_attemptId), isNotNull);
      expect(await harness.events.listAll(), hasLength(1));
    },
  );

  test(
    'failure then recovery applies the bridge exactly once without duplicates',
    () async {
      final controllable = _ControllableSubscriber();
      final harness = _Harness(extraSubscribers: [controllable]);
      await harness.attempts.save(attempt(isCompleted: true));
      final container = ProviderContainer();
      addTearDown(container.dispose);
      var bridgeApplications = 0;

      Future<bool> bridgeOnce() async {
        final applied = await container
            .read(profileProvider.notifier)
            .applyLessonCompletionCompatibilityOnce(
              lessonId: _lessonId,
              stepId: 'five-card-exercise',
              currentStepIndex: 0,
              lessonComplete: true,
            );
        if (applied) bridgeApplications += 1;
        return applied;
      }

      await expectLater(
        harness.action.run(
          attemptId: _attemptId,
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          applyUiCompatibilityBridgeOnce: bridgeOnce,
        ),
        throwsA(isA<GoldenLessonCompletionPipelineException>()),
      );
      expect(bridgeApplications, 0);
      expect(controllable.attempts, greaterThanOrEqualTo(2));

      controllable.fail = false;
      final recovered = await harness.action.run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: bridgeOnce,
      );

      expect(recovered.compatibilityApplied, isTrue);
      expect(bridgeApplications, 1);
      expect(await harness.events.listAll(), hasLength(1));
      expect(
        await harness.usage.listForUserTrackDate(
          userId: _userId,
          userTrackId: _trackId,
          usageDate: '2026-07-14',
        ),
        hasLength(1),
      );
      expect(
        await harness.progress.listForUserTrack(
          userId: _userId,
          userTrackId: _trackId,
        ),
        hasLength(1),
      );
      expect(
        await harness.core5.listForUserTrack(
          userId: _userId,
          userTrackId: _trackId,
        ),
        hasLength(1),
      );
      expect(
        await harness.core6.listForUserTrack(
          userId: _userId,
          userTrackId: _trackId,
        ),
        hasLength(1),
      );
      expect(container.read(profileProvider).completedLessonIds, [_lessonId]);
    },
  );

  test(
    'duplicate completion applies the compatibility bridge exactly once',
    () async {
      final harness = _Harness();
      await harness.attempts.save(attempt(isCompleted: true));
      final container = ProviderContainer();
      addTearDown(container.dispose);
      var bridgeApplications = 0;

      Future<bool> bridgeOnce() async {
        final applied = await container
            .read(profileProvider.notifier)
            .applyLessonCompletionCompatibilityOnce(
              lessonId: _lessonId,
              stepId: 'five-card-exercise',
              currentStepIndex: 0,
              lessonComplete: true,
              estimatedMinutes: 2,
            );
        if (applied) bridgeApplications += 1;
        return applied;
      }

      final first = await harness.action.run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: bridgeOnce,
      );
      final afterFirst = container.read(profileProvider);
      final completedAt = afterFirst.lessonSessions[_lessonId]?['completedAt'];
      final studyMinutes = afterFirst.studyMinutesToday;
      final session = Map<String, dynamic>.from(
        afterFirst.lessonSessions[_lessonId]!,
      );

      final second = await harness.action.run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: bridgeOnce,
      );
      final afterSecond = container.read(profileProvider);

      expect(first.compatibilityApplied, isTrue);
      expect(second.compatibilityApplied, isFalse);
      expect(bridgeApplications, 1);
      expect(afterSecond.completedLessonIds, [_lessonId]);
      expect(afterSecond.studyMinutesToday, studyMinutes);
      expect(afterSecond.lessonSessions[_lessonId]?['completedAt'], completedAt);
      expect(afterSecond.lessonSessions[_lessonId], session);
      expect(await harness.events.listAll(), hasLength(1));
    },
  );

  test(
    'crash recovery: pipeline done without bridge marker still applies once',
    () async {
      final harness = _Harness();
      await harness.attempts.save(attempt(isCompleted: true));

      // Pipeline succeeds with no bridge (crash before UI compatibility).
      final pipelineOnly = await harness.orchestrator.completeLesson(
        LessonCompletionRequest.create(
          attemptId: _attemptId,
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          requestedAt: DateTime.utc(2026, 7, 14, 10),
          idempotencyKey:
              'completion:$_userId:$_trackId:$_lessonId:$_attemptId',
        ),
      );
      expect(pipelineOnly.dispatchOutcome!.allSucceeded, isTrue);

      final container = ProviderContainer();
      addTearDown(container.dispose);
      expect(container.read(profileProvider).completedLessonIds, isEmpty);
      var bridgeApplications = 0;

      Future<bool> bridgeOnce() async {
        final applied = await container
            .read(profileProvider.notifier)
            .applyLessonCompletionCompatibilityOnce(
              lessonId: _lessonId,
              stepId: 'five-card-exercise',
              currentStepIndex: 0,
              lessonComplete: true,
            );
        if (applied) bridgeApplications += 1;
        return applied;
      }

      final first = await harness.action.run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: bridgeOnce,
      );
      final second = await harness.action.run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: bridgeOnce,
      );

      expect(first.compatibilityApplied, isTrue);
      expect(second.compatibilityApplied, isFalse);
      expect(bridgeApplications, 1);
      expect(await harness.events.listAll(), hasLength(1));
      expect(container.read(profileProvider).completedLessonIds, [_lessonId]);
    },
  );

  test('pipeline failure does not apply compatibility update', () async {
    final harness = _Harness();
    await harness.attempts.save(attempt(isCompleted: true));
    var bridgeApplications = 0;

    await expectLater(
      harness.action.run(
        attemptId: 'missing-attempt',
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: () async {
          bridgeApplications += 1;
          return true;
        },
      ),
      throwsA(isA<StateError>()),
    );
    expect(bridgeApplications, 0);
    expect(await harness.events.listAll(), isEmpty);
    expect(await harness.completions.findByAttemptId(_attemptId), isNull);
  });

  test(
    'not_eligible pipeline status does not apply compatibility update',
    () async {
      final attempts = SharedPreferencesExerciseAttemptRepository();
      await attempts.save(attempt(isCompleted: true));
      final events = SharedPreferencesCanonicalEventRepository();
      final dispatcher = LocalCanonicalEventDispatcher(
        events: events,
        clock: const _FixedClock(),
        ids: _Ids('event'),
      );
      final action = GoldenLessonCompletionAction(
        attempts: attempts,
        orchestrator: GoldenLessonCompletionOrchestrator(
          completions: LocalLessonCompletionService(
            attempts: attempts,
            completions: SharedPreferencesLessonCompletionRepository(),
            eligibility: const _DenyEligibility(),
            clock: const _FixedClock(),
            ids: _Ids('completion'),
          ),
          dispatcher: dispatcher,
          eventClock: const _FixedClock(),
        ),
      );
      var bridgeApplications = 0;

      await expectLater(
        action.run(
          attemptId: _attemptId,
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          applyUiCompatibilityBridgeOnce: () async {
            bridgeApplications += 1;
            return true;
          },
        ),
        throwsA(isA<StateError>()),
      );
      expect(bridgeApplications, 0);
      expect(await events.listAll(), isEmpty);
    },
  );

  test(
    'restart recovery: findByAttemptId after recreate then action succeeds',
    () async {
      final writer = SharedPreferencesExerciseAttemptRepository();
      await writer.save(attempt(isCompleted: false));
      await writer.complete(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );

      final reader = SharedPreferencesExerciseAttemptRepository();
      final restored = await reader.findByAttemptId(_attemptId);
      expect(restored!.isCompleted, isTrue);

      final harness = _Harness();
      final container = ProviderContainer();
      addTearDown(container.dispose);

      final result = await GoldenLessonCompletionAction(
        attempts: reader,
        orchestrator: harness.orchestrator,
      ).run(
        attemptId: _attemptId,
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        applyUiCompatibilityBridgeOnce: () => container
            .read(profileProvider.notifier)
            .applyLessonCompletionCompatibilityOnce(
              lessonId: _lessonId,
              stepId: 'five-card-exercise',
              currentStepIndex: 0,
              lessonComplete: true,
            ),
      );

      expect(result.outcome.completionResult.status, LessonCompletionStatus.recorded);
      expect(result.compatibilityApplied, isTrue);
      expect(container.read(profileProvider).completedLessonIds, [_lessonId]);
      expect(await harness.events.listAll(), hasLength(1));
    },
  );

  test(
    'compatibility-only API does not change hearts or daily reward',
    () async {
      SharedPreferences.setMockInitialValues({});
      final container = ProviderContainer();
      addTearDown(container.dispose);
      final notifier = container.read(profileProvider.notifier);

      await notifier.completeLessonStep(
        lessonId: 'warmup-lesson',
        stepId: 'warmup',
        currentStepIndex: 0,
        lessonComplete: false,
        estimatedMinutes: 10,
      );
      final mid = container.read(profileProvider);
      final heartsAfterLegacy = mid.hearts;
      final claimedAfterLegacy = mid.dailyGoalRewardClaimedDate;

      final applied = await notifier.applyLessonCompletionCompatibilityOnce(
        lessonId: _lessonId,
        stepId: 'five-card-exercise',
        currentStepIndex: 0,
        lessonComplete: true,
        estimatedMinutes: 10,
      );

      final after = container.read(profileProvider);
      expect(applied, isTrue);
      expect(after.completedLessonIds, contains(_lessonId));
      expect(after.hearts, heartsAfterLegacy);
      expect(after.dailyGoalRewardClaimedDate, claimedAfterLegacy);
    },
  );

  test(
    'Result Page seam: pipeline exception must not signal navigation success',
    () async {
      // Mirrors FiveCardExerciseResultPage._completeAndLeave:
      // success → navigate; catch → reset guard, do not navigate.
      final harness = _Harness(extraSubscribers: [_AlwaysFailingSubscriber()]);
      await harness.attempts.save(attempt(isCompleted: true));

      var isCompleting = false;
      var navigated = false;

      Future<void> completeAndLeave() async {
        if (isCompleting) return;
        isCompleting = true;
        try {
          await harness.action.run(
            attemptId: _attemptId,
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
            applyUiCompatibilityBridgeOnce: () async => true,
          );
          navigated = true;
        } catch (_) {
          isCompleting = false;
          rethrow;
        }
      }

      await expectLater(completeAndLeave(), throwsA(isA<GoldenLessonCompletionPipelineException>()));
      expect(navigated, isFalse);
      expect(isCompleting, isFalse);

      // Guard reset allows retry; still fails while subscriber is broken.
      await expectLater(completeAndLeave(), throwsA(isA<GoldenLessonCompletionPipelineException>()));
      expect(navigated, isFalse);
      expect(isCompleting, isFalse);
    },
  );
}
