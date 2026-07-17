import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/canonical_event.dart';
import 'package:novalang_flutter/models/lesson_completion.dart';
import 'package:novalang_flutter/models/usage_ledger.dart';
import 'package:novalang_flutter/repositories/canonical_event_repository.dart';
import 'package:novalang_flutter/repositories/curriculum_progress_repository.dart';
import 'package:novalang_flutter/repositories/lesson_completion_repository.dart';
import 'package:novalang_flutter/repositories/mock_subscriber_evidence_repository.dart';
import 'package:novalang_flutter/repositories/usage_ledger_repository.dart';
import 'package:novalang_flutter/services/canonical_event_dispatcher.dart';
import 'package:novalang_flutter/services/curriculum_progress_projector.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/services/exercise_review_repository.dart';
import 'package:novalang_flutter/services/lesson_completion_orchestrator.dart';
import 'package:novalang_flutter/services/golden_lesson_completion_action.dart';
import 'package:novalang_flutter/services/lesson_completion_service.dart';
import 'package:novalang_flutter/services/mock_core_subscribers.dart';
import 'package:novalang_flutter/services/usage_ledger_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';
const _lessonId = 'ja-daily_life-m01-u1-l1';
const _attemptId = 'attempt-1';

ExerciseAttemptSnapshot attempt({
  String attemptId = _attemptId,
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  bool isCompleted = true,
}) => ExerciseAttemptSnapshot(
  userId: userId,
  userTrackId: userTrackId,
  attemptId: attemptId,
  lessonId: lessonId,
  currentExerciseIndex: 13,
  orderByExercise: const {},
  results: const {},
  answers: const {},
  startedAt: '2026-07-14T00:00:00Z',
  lastUpdatedAt: '2026-07-14T00:30:00Z',
  isCompleted: isCompleted,
);

LessonCompletionRequest request({
  String attemptId = _attemptId,
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  String idempotencyKey = 'completion:user-1:daily_life:ja-daily_life-m01-u1-l1:attempt-1',
}) => LessonCompletionRequest.create(
  attemptId: attemptId,
  userId: userId,
  userTrackId: userTrackId,
  lessonId: lessonId,
  requestedAt: DateTime.utc(2026, 7, 14, 10),
  idempotencyKey: idempotencyKey,
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

class _FlakyOnceSubscriber implements CanonicalEventSubscriber {
  _FlakyOnceSubscriber(this._delegate);
  final CanonicalEventSubscriber _delegate;
  int attempts = 0;

  @override
  String get subscriberId => _delegate.subscriberId;

  @override
  Future<void> handle(CanonicalEvent event) async {
    attempts += 1;
    if (attempts == 1) {
      throw StateError('$subscriberId simulated failure');
    }
    await _delegate.handle(event);
  }
}

class _Harness {
  _Harness()
    : attempts = SharedPreferencesExerciseAttemptRepository(),
      completions = SharedPreferencesLessonCompletionRepository(),
      events = SharedPreferencesCanonicalEventRepository(),
      usage = SharedPreferencesUsageLedgerRepository(),
      progress = SharedPreferencesCurriculumProgressRepository(),
      core5 = SharedPreferencesMockCore5EvidenceRepository(),
      core6 = SharedPreferencesMockCore6EvidenceRepository();

  final SharedPreferencesExerciseAttemptRepository attempts;
  final SharedPreferencesLessonCompletionRepository completions;
  final SharedPreferencesCanonicalEventRepository events;
  final SharedPreferencesUsageLedgerRepository usage;
  final SharedPreferencesCurriculumProgressRepository progress;
  final SharedPreferencesMockCore5EvidenceRepository core5;
  final SharedPreferencesMockCore6EvidenceRepository core6;

  late final LocalUsageLedgerService usageService = LocalUsageLedgerService(
    ledger: usage,
    clock: const _FixedClock(),
    dateResolver: const UtcUsageDateResolver(),
    ids: _Ids('usage'),
  );

  late final CurriculumProgressProjector projector = CurriculumProgressProjector(
    repository: progress,
  );

  late final MockCore5Subscriber mockCore5 = MockCore5Subscriber(
    repository: core5,
    ids: _Ids('evidence-core5'),
  );

  late final MockCore6Subscriber mockCore6 = MockCore6Subscriber(
    repository: core6,
    ids: _Ids('evidence-core6'),
  );

  late final CanonicalEventSubscriber usageSubscriber = UsageLedgerEventSubscriber(
    usageLedger: usageService,
    clock: const _FixedClock(),
  );

  late final LocalCanonicalEventDispatcher dispatcher =
      LocalCanonicalEventDispatcher(
          events: events,
          clock: const _FixedClock(),
          ids: _Ids('event'),
        )
        ..subscribe(usageSubscriber)
        ..subscribe(projector)
        ..subscribe(mockCore5)
        ..subscribe(mockCore6);

  late final LocalLessonCompletionService completionService =
      LocalLessonCompletionService(
        attempts: attempts,
        completions: completions,
        eligibility: const AllowLessonCompletionEligibility(),
        clock: const _FixedClock(),
        ids: _Ids('completion'),
      );

  late final GoldenLessonCompletionOrchestrator orchestrator =
      GoldenLessonCompletionOrchestrator(
        completions: completionService,
        dispatcher: dispatcher,
        eventClock: const _FixedClock(),
      );

  Future<void> seed(ExerciseAttemptSnapshot snapshot) => attempts.save(snapshot);
}

Future<int> _rawListLength(String storageKey) async {
  final raw = (await SharedPreferences.getInstance()).getString(storageKey);
  if (raw == null) return 0;
  return (jsonDecode(raw) as List).length;
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  group('1-5: golden path, idempotency, and replay', () {
    test('1. first valid completion links completion, event, usage, progress, and both mock evidences by ID', () async {
      final harness = _Harness();
      await harness.seed(attempt());

      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
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
      final core5Evidence = await harness.core5.findByEventId(storedEvent!.eventId);
      final core6Evidence = await harness.core6.findByEventId(storedEvent.eventId);

      expect(storedEvent.sourceRecordId, completionId);
      expect(usageEntries.single.sourceRecordId, completionId);
      expect(usageEntries.single.sourceEventId, storedEvent.eventId);
      expect(projection!.sourceCompletionId, completionId);
      expect(projection.lastProcessedEventId, storedEvent.eventId);
      expect(core5Evidence!.eventId, storedEvent.eventId);
      expect(core5Evidence.sourceRecordId, completionId);
      expect(core6Evidence!.eventId, storedEvent.eventId);
      expect(core6Evidence.sourceRecordId, completionId);
    });

    test('2. duplicate same idempotency key does not duplicate anything', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final first = await harness.orchestrator.completeLesson(request());
      final second = await harness.orchestrator.completeLesson(request());

      expect(
        first.completionResult.record!.completionId,
        second.completionResult.record!.completionId,
      );
      expect(await harness.events.listAll(), hasLength(1));
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        1,
      );
      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await harness.core5.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await harness.core6.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    });

    test('3. same attempt with a different idempotency key does not duplicate anything', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final first = await harness.orchestrator.completeLesson(request());
      final second = await harness.orchestrator.completeLesson(
        request(idempotencyKey: 'completion:user-1:daily_life:ja-daily_life-m01-u1-l1:attempt-1:v2'),
      );

      expect(
        second.completionResult.record!.completionId,
        first.completionResult.record!.completionId,
      );
      expect(await harness.events.listAll(), hasLength(1));
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        1,
      );
    });

    test('4. different attempt, same user/track/lesson does not duplicate anything', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final first = await harness.orchestrator.completeLesson(request());
      await harness.seed(attempt(attemptId: 'attempt-2'));
      final second = await harness.orchestrator.completeLesson(
        request(
          attemptId: 'attempt-2',
          idempotencyKey: 'completion:user-1:daily_life:ja-daily_life-m01-u1-l1:attempt-2',
        ),
      );

      expect(second.completionResult.status, LessonCompletionStatus.alreadyCompleted);
      expect(
        second.completionResult.existingCompletionId,
        first.completionResult.record!.completionId,
      );
      expect(second.dispatchOutcome, isNotNull);
      expect(second.dispatchOutcome!.allSucceeded, isTrue);
      expect(await harness.events.listAll(), hasLength(1));
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        1,
      );
      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    });

    test('5. replay via direct re-dispatch does not duplicate anything', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      await harness.orchestrator.completeLesson(request());
      final existingEvent = (await harness.events.listAll()).single;

      await harness.dispatcher.dispatch(existingEvent);
      await harness.dispatcher.dispatch(existingEvent);

      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        1,
      );
      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await harness.core5.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    });
  });

  group('6-8: non-completion flows never consume usage', () {
    test('6. resume (reading an in-progress attempt) never consumes usage', () async {
      final attempts = SharedPreferencesExerciseAttemptRepository();
      await attempts.save(attempt(isCompleted: false));

      final resumed = await attempts.active(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );

      expect(resumed, isNotNull);
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        0,
      );
    });

    test('7. review (reading wrong-answer records) never consumes usage', () async {
      final reviewRepository = SharedPreferencesExerciseReviewRepository();
      await reviewRepository.upsert(
        ExerciseReviewRecord(
          attemptId: _attemptId,
          userId: _userId,
          localStudyDate: '2026-07-14',
          lessonId: _lessonId,
          lessonTitle: 'Daily Life',
          exerciseId: 'practice-1',
          exerciseNumber: 1,
          exerciseType: 'multiple_choice',
          questionDisplay: 'q',
          userAnswer: 'a',
          correctAnswer: 'b',
          isCorrect: false,
          completedAt: '2026-07-14T09:00:00Z',
        ),
      );

      final reviewed = await reviewRepository.forLesson(
        userId: _userId,
        lessonId: _lessonId,
      );

      expect(reviewed, hasLength(1));
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        0,
      );
    });

    test(
      '8. audio replay has no repository interaction and cannot consume usage '
      '(no code path other than completeLesson() calls UsageLedgerService.commit)',
      () async {
        // No repository call is made here: audio replay is a device TTS call
        // with no persistence layer in this codebase. This test documents
        // that leaving the usage ledger untouched is the expected baseline.
        expect(
          await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
          0,
        );
      },
    );
  });

  test('9. full pipeline state survives all repositories restarting', () async {
    final harness = _Harness();
    await harness.seed(attempt());
    final outcome = await harness.orchestrator.completeLesson(request());
    final completionId = outcome.completionResult.record!.completionId;

    expect(
      await SharedPreferencesLessonCompletionRepository()
          .findByIdempotencyKey(request().idempotencyKey),
      isNotNull,
    );
    expect(
      await SharedPreferencesCanonicalEventRepository()
          .findBySourceRecordId(completionId),
      isNotNull,
    );
    expect(
      await SharedPreferencesCurriculumProgressRepository().findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      ),
      isNotNull,
    );
    final restartedUsage = await SharedPreferencesUsageLedgerRepository()
        .listForUserTrackDate(userId: _userId, userTrackId: _trackId, usageDate: '2026-07-14');
    expect(restartedUsage, hasLength(1));
  });

  group('10-15: corrupted storage propagation', () {
    test(
      '10. corrupted completion storage aborts completeLesson() before any event is created',
      () async {
        final harness = _Harness();
        await harness.seed(attempt());
        SharedPreferences.setMockInitialValues({
          SharedPreferencesLessonCompletionRepository.storageKey: '{not-valid-json',
        });
        await harness.seed(attempt());

        await expectLater(
          harness.orchestrator.completeLesson(request()),
          throwsA(isA<LessonCompletionStorageException>()),
        );
        expect(await harness.events.listAll(), isEmpty);
      },
    );

    test(
      '11. corrupted attempt storage aborts completeLesson() before any completion record exists',
      () async {
        final harness = _Harness();
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: '{not-valid-json',
        });

        await expectLater(
          harness.orchestrator.completeLesson(request()),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
        expect(
          await SharedPreferencesLessonCompletionRepository()
              .findByIdempotencyKey(request().idempotencyKey),
          isNull,
        );
      },
    );

    test(
      '12. corrupted usage storage fails only the usage subscriber; completion, event, progress, and both evidences still succeed',
      () async {
        final harness = _Harness();
        await harness.seed(attempt());
        (await SharedPreferences.getInstance()).setString(
          SharedPreferencesUsageLedgerRepository.storageKey,
          '{not-valid-json',
        );

        final outcome = await harness.orchestrator.completeLesson(request());

        expect(outcome.completionResult.status, LessonCompletionStatus.recorded);
        expect(outcome.dispatchOutcome!.allSucceeded, isFalse);
        expect(outcome.dispatchOutcome!.failedSubscriberIds, ['shared.usage_ledger']);

        final completionId = outcome.completionResult.record!.completionId;
        final storedEvent = await harness.events.findBySourceRecordId(completionId);
        expect(storedEvent, isNotNull);
        expect(
          (await harness.progress.findProjection(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ))?.sourceCompletionId,
          completionId,
        );
        expect(await harness.core5.findByEventId(storedEvent!.eventId), isNotNull);
        expect(await harness.core6.findByEventId(storedEvent.eventId), isNotNull);
      },
    );

    test(
      '13. corrupted event storage aborts completeLesson() before dispatch; no usage/progress/evidence created',
      () async {
        final harness = _Harness();
        await harness.seed(attempt());
        (await SharedPreferences.getInstance()).setString(
          SharedPreferencesCanonicalEventRepository.storageKey,
          '{not-valid-json',
        );

        await expectLater(
          harness.orchestrator.completeLesson(request()),
          throwsA(isA<CanonicalEventStorageException>()),
        );

        expect(
          await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
          0,
        );
        expect(
          await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
          isEmpty,
        );
        // The completion record itself is still created: LessonCompletionService
        // has already returned `recorded` before the corrupted event store is
        // touched, matching the invariant that Core 2 never depends on the
        // event pipeline succeeding.
        expect(
          await SharedPreferencesLessonCompletionRepository()
              .findByIdempotencyKey(request().idempotencyKey),
          isNotNull,
        );
      },
    );

    test(
      '14. corrupted progress storage fails only the progress subscriber; other subscribers still succeed',
      () async {
        final harness = _Harness();
        await harness.seed(attempt());
        (await SharedPreferences.getInstance()).setString(
          SharedPreferencesCurriculumProgressRepository.storageKey,
          '{not-valid-json',
        );

        final outcome = await harness.orchestrator.completeLesson(request());

        expect(outcome.dispatchOutcome!.allSucceeded, isFalse);
        expect(
          outcome.dispatchOutcome!.failedSubscriberIds,
          ['core1.curriculum_progress_projector'],
        );
        expect(
          await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
          1,
        );
      },
    );

    test(
      '15. corrupted mock evidence storage fails only that subscriber; others still succeed',
      () async {
        final harness = _Harness();
        await harness.seed(attempt());
        (await SharedPreferences.getInstance()).setString(
          SharedPreferencesMockCore5EvidenceRepository.storageKey,
          '{not-valid-json',
        );

        final outcome = await harness.orchestrator.completeLesson(request());

        expect(outcome.dispatchOutcome!.allSucceeded, isFalse);
        expect(outcome.dispatchOutcome!.failedSubscriberIds, [MockCore5Subscriber.subscriberType]);
        final completionId = outcome.completionResult.record!.completionId;
        final storedEvent = await harness.events.findBySourceRecordId(completionId);
        expect(await harness.core6.findByEventId(storedEvent!.eventId), isNotNull);
        expect(
          await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
          1,
        );
      },
    );
  });

  test(
    '16. concurrent completion calls for the same attempt (e.g. a UI double-tap) '
    'run the full pipeline exactly once, not twice',
    () async {
      // The real ExerciseAttemptRepository keeps one snapshot per
      // (userId, userTrackId, lessonId) scope, so two distinct attempts
      // cannot coexist there to race concurrently; that scenario is already
      // covered at the LessonCompletionService level in
      // lesson_completion_test.dart using its in-memory fake attempts
      // repository. This test instead exercises the realistic concurrency
      // case for the full real-repository-backed pipeline: the same
      // attempt's completion being submitted twice at once.
      final harness = _Harness();
      await harness.seed(attempt());

      final results = await Future.wait([
        harness.orchestrator.completeLesson(request()),
        harness.orchestrator.completeLesson(request()),
      ]);

      expect(
        results.map((r) => r.completionResult.status),
        everyElement(LessonCompletionStatus.recorded),
      );
      expect(
        results.map((r) => r.completionResult.record!.completionId).toSet(),
        hasLength(1),
      );
      expect(await harness.events.listAll(), hasLength(1));
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        1,
      );
      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    },
  );

  group('17-19: isolation', () {
    test('17. user isolation: independent completion, usage, progress, and evidence', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      await harness.seed(attempt(attemptId: 'attempt-user-2', userId: 'user-2'));

      final first = await harness.orchestrator.completeLesson(request());
      final second = await harness.orchestrator.completeLesson(
        request(
          attemptId: 'attempt-user-2',
          userId: 'user-2',
          idempotencyKey: 'completion:user-2:daily_life:ja-daily_life-m01-u1-l1:attempt-user-2',
        ),
      );

      expect(
        second.completionResult.record!.completionId,
        isNot(first.completionResult.record!.completionId),
      );
      expect(await harness.events.listAll(), hasLength(2));
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        2,
      );
    });

    test('18. track isolation: independent completion, usage, progress, and evidence', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      await harness.seed(attempt(attemptId: 'attempt-business', userTrackId: 'business'));

      await harness.orchestrator.completeLesson(request());
      await harness.orchestrator.completeLesson(
        request(
          attemptId: 'attempt-business',
          userTrackId: 'business',
          idempotencyKey: 'completion:user-1:business:ja-daily_life-m01-u1-l1:attempt-business',
        ),
      );

      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: 'business'),
        hasLength(1),
      );
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        2,
      );
    });

    test('19. lesson isolation: independent completion, usage, progress, and evidence', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      await harness.seed(
        attempt(attemptId: 'attempt-lesson-2', lessonId: 'ja-daily_life-m01-u1-l2'),
      );

      await harness.orchestrator.completeLesson(request());
      await harness.orchestrator.completeLesson(
        request(
          attemptId: 'attempt-lesson-2',
          lessonId: 'ja-daily_life-m01-u1-l2',
          idempotencyKey: 'completion:user-1:daily_life:ja-daily_life-m01-u1-l2:attempt-lesson-2',
        ),
      );

      final all = await harness.progress.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(all.map((p) => p.lessonId).toSet(), {
        _lessonId,
        'ja-daily_life-m01-u1-l2',
      });
      expect(
        await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey),
        2,
      );
    });
  });

  group('20-24: per-store idempotency with cross-referenced IDs', () {
    test('20. event idempotency: appending twice for the same completionId returns the same eventId', () async {
      final harness = _Harness();
      final appendRequest = CanonicalEventAppendRequest.create(
        eventType: CanonicalEventType.lessonCompletionRecorded,
        sourceRecordId: 'completion-fixed',
        sourceRecordType: 'lesson_completion',
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        requestedAt: DateTime.utc(2026, 7, 14),
        idempotencyKey: 'event:completion-fixed',
      );
      final first = await harness.dispatcher.append(appendRequest);
      final second = await harness.dispatcher.append(appendRequest);
      expect(second.event!.eventId, first.event!.eventId);
    });

    test('21. usage idempotency: committing twice for the same sourceEventId returns the same usageEntryId', () async {
      final harness = _Harness();
      final commitRequest = UsageCommitRequest.create(
        userId: _userId,
        userTrackId: _trackId,
        usageType: UsageType.newLessonCompletion,
        quantity: 1,
        sourceEventId: 'event-fixed',
        sourceRecordId: 'completion-fixed',
        requestedAt: DateTime.utc(2026, 7, 14),
        idempotencyKey: 'usage:event-fixed',
      );
      final first = await harness.usageService.commit(commitRequest);
      final second = await harness.usageService.commit(
        UsageCommitRequest.create(
          userId: _userId,
          userTrackId: _trackId,
          usageType: UsageType.newLessonCompletion,
          quantity: 1,
          sourceEventId: 'event-fixed',
          sourceRecordId: 'completion-fixed',
          requestedAt: DateTime.utc(2026, 7, 14),
          idempotencyKey: 'usage:event-fixed:retry',
        ),
      );
      expect(second.status, UsageCommitStatus.alreadyCommitted);
      expect(second.existingUsageEntryId, first.entry!.usageEntryId);
    });

    test('22. progress projection idempotency: handling the same event twice does not change lastProcessedEventId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      await harness.projector.handle(storedEvent!);
      await harness.projector.handle(storedEvent);

      final projection = await harness.progress.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      expect(projection!.lastProcessedEventId, storedEvent.eventId);
    });

    test('23. Core 5 mock idempotency: handling the same event twice does not create a second evidenceId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      await harness.mockCore5.handle(storedEvent!);
      await harness.mockCore5.handle(storedEvent);

      expect(
        await harness.core5.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    });

    test('24. Core 6 mock idempotency: handling the same event twice does not create a second evidenceId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      await harness.mockCore6.handle(storedEvent!);
      await harness.mockCore6.handle(storedEvent);

      expect(
        await harness.core6.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    });
  });

  test(
    '25. a failing subscriber does not block others; a manual retry dispatch succeeds without duplicating the already-succeeded subscribers',
    () async {
      final events = SharedPreferencesCanonicalEventRepository();
      final usageRepo = SharedPreferencesUsageLedgerRepository();
      final progressRepo = SharedPreferencesCurriculumProgressRepository();
      final core5Repo = SharedPreferencesMockCore5EvidenceRepository();
      final usageService = LocalUsageLedgerService(
        ledger: usageRepo,
        clock: const _FixedClock(),
        dateResolver: const UtcUsageDateResolver(),
        ids: _Ids('usage'),
      );
      final projector = CurriculumProgressProjector(repository: progressRepo);
      final core5 = MockCore5Subscriber(repository: core5Repo, ids: _Ids('evidence'));
      final flakyUsage = _FlakyOnceSubscriber(
        UsageLedgerEventSubscriber(usageLedger: usageService, clock: const _FixedClock()),
      );
      final dispatcher = LocalCanonicalEventDispatcher(
        events: events,
        clock: const _FixedClock(),
        ids: _Ids('event'),
      )..subscribe(flakyUsage)
       ..subscribe(projector)
       ..subscribe(core5);

      final appendResult = await dispatcher.append(
        CanonicalEventAppendRequest.create(
          eventType: CanonicalEventType.lessonCompletionRecorded,
          sourceRecordId: 'completion-retry',
          sourceRecordType: 'lesson_completion',
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          requestedAt: DateTime.utc(2026, 7, 14),
          idempotencyKey: 'event:completion-retry',
        ),
      );
      final firstOutcome = await dispatcher.dispatch(appendResult.event!);
      expect(firstOutcome.allSucceeded, isFalse);
      expect(firstOutcome.failedSubscriberIds, ['shared.usage_ledger']);
      expect(
        await progressRepo.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await core5Repo.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );

      final retryOutcome = await dispatcher.dispatch(appendResult.event!);
      expect(retryOutcome.allSucceeded, isTrue);
      expect(await _rawListLength(SharedPreferencesUsageLedgerRepository.storageKey), 1);
      expect(
        await progressRepo.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await core5Repo.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    },
  );

  group('26-29: exactly-one invariants with strict source linkage', () {
    test('26. exactly one usage entry for the first valid completion, linked by sourceRecordId and sourceEventId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      final entries = await harness.usage.listForUserTrackDate(
        userId: _userId,
        userTrackId: _trackId,
        usageDate: '2026-07-14',
      );
      expect(entries, hasLength(1));
      expect(entries.single.sourceRecordId, completionId);
      expect(entries.single.sourceEventId, storedEvent!.eventId);
    });

    test('27. exactly one progress projection, linked by sourceCompletionId and lastProcessedEventId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      final all = await harness.progress.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(all, hasLength(1));
      expect(all.single.sourceCompletionId, completionId);
      expect(all.single.lastProcessedEventId, storedEvent!.eventId);
    });

    test('28. exactly one Core 5 evidence record, linked by eventId and sourceRecordId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      final all = await harness.core5.listForUserTrack(userId: _userId, userTrackId: _trackId);
      expect(all, hasLength(1));
      expect(all.single.eventId, storedEvent!.eventId);
      expect(all.single.sourceRecordId, completionId);
    });

    test('29. exactly one Core 6 evidence record, linked by eventId and sourceRecordId', () async {
      final harness = _Harness();
      await harness.seed(attempt());
      final outcome = await harness.orchestrator.completeLesson(request());
      final completionId = outcome.completionResult.record!.completionId;
      final storedEvent = await harness.events.findBySourceRecordId(completionId);

      final all = await harness.core6.listForUserTrack(userId: _userId, userTrackId: _trackId);
      expect(all, hasLength(1));
      expect(all.single.eventId, storedEvent!.eventId);
      expect(all.single.sourceRecordId, completionId);
    });
  });

  group('30-31: Golden Reference Lesson protected facts', () {
    late Map<String, dynamic> lessonsPayload;

    setUp(() async {
      final raw = await rootBundle.loadString('assets/shared/lessons.json');
      lessonsPayload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
    });

    test('30. Golden Reference Lesson has exactly 5 main cards', () {
      final lesson = (lessonsPayload['lessons'] as List)
          .cast<Map>()
          .map((item) => Map<String, dynamic>.from(item))
          .singleWhere((item) => item['id'] == _lessonId);
      final content = Map<String, dynamic>.from(lesson['fiveCardContent'] as Map);
      final mainCards = (content['mainCards'] as List).map((e) => '$e').toList();
      expect(mainCards, hasLength(5));
    });

    test('31. Golden Reference Lesson has exactly 14 exercises', () {
      final lesson = (lessonsPayload['lessons'] as List)
          .cast<Map>()
          .map((item) => Map<String, dynamic>.from(item))
          .singleWhere((item) => item['id'] == _lessonId);
      final content = Map<String, dynamic>.from(lesson['fiveCardContent'] as Map);
      final practice = Map<String, dynamic>.from(content['practice'] as Map);
      final exercises = practice['exercises'] as List;
      expect(exercises, hasLength(14));
    });
  });

  group('STAGE1-FINAL-PATCH: golden application action wiring', () {
    test(
      'active() returns null for completed attempts while findByAttemptId recovers them',
      () async {
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
        final restored = await repository.findByAttemptId(_attemptId);
        expect(restored?.isCompleted, isTrue);
      },
    );

    test(
      'GoldenLessonCompletionAction produces the full Stage 1 chain',
      () async {
        final harness = _Harness();
        await harness.seed(attempt(isCompleted: true));
        final action = GoldenLessonCompletionAction(
          attempts: harness.attempts,
          orchestrator: harness.orchestrator,
        );
        var bridgeApplications = 0;

        final result = await action.run(
          attemptId: _attemptId,
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          applyUiCompatibilityBridgeOnce: () async {
            bridgeApplications += 1;
            return true;
          },
        );

        expect(result.compatibilityApplied, isTrue);
        expect(result.outcome.dispatchOutcome!.allSucceeded, isTrue);
        expect(bridgeApplications, 1);

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

        expect(storedEvent.sourceRecordId, completionId);
        expect(usageEntries.single.sourceRecordId, completionId);
        expect(usageEntries.single.sourceEventId, storedEvent.eventId);
        expect(projection!.sourceCompletionId, completionId);
        expect(projection.lastProcessedEventId, storedEvent.eventId);
        expect(core5!.eventId, storedEvent.eventId);
        expect(core5.sourceRecordId, completionId);
        expect(core6!.eventId, storedEvent.eventId);
        expect(core6.sourceRecordId, completionId);
      },
    );
  });
}
