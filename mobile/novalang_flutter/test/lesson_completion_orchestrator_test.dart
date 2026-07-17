import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/lesson_completion.dart';
import 'package:novalang_flutter/repositories/canonical_event_repository.dart';
import 'package:novalang_flutter/repositories/curriculum_progress_repository.dart';
import 'package:novalang_flutter/repositories/lesson_completion_repository.dart';
import 'package:novalang_flutter/repositories/mock_subscriber_evidence_repository.dart';
import 'package:novalang_flutter/repositories/usage_ledger_repository.dart';
import 'package:novalang_flutter/services/canonical_event_dispatcher.dart';
import 'package:novalang_flutter/services/curriculum_progress_projector.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/services/lesson_completion_orchestrator.dart';
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
  isCompleted: true,
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

class _Ids implements CompletionIdGenerator, CanonicalEventIdGenerator, UsageEntryIdGenerator, MockEvidenceIdGenerator {
  _Ids(this.prefix);
  final String prefix;
  int index = 0;
  @override
  String nextId() => '$prefix-${++index}';
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
    clock: _FixedClock(),
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

  late final LocalCanonicalEventDispatcher dispatcher =
      LocalCanonicalEventDispatcher(
          events: events,
          clock: _FixedClock(),
          ids: _Ids('event'),
        )
        ..subscribe(
          UsageLedgerEventSubscriber(usageLedger: usageService, clock: _FixedClock()),
        )
        ..subscribe(projector)
        ..subscribe(mockCore5)
        ..subscribe(mockCore6);

  late final LocalLessonCompletionService completionService =
      LocalLessonCompletionService(
        attempts: attempts,
        completions: completions,
        eligibility: const AllowLessonCompletionEligibility(),
        clock: _FixedClock(),
        ids: _Ids('completion'),
      );

  late final GoldenLessonCompletionOrchestrator orchestrator =
      GoldenLessonCompletionOrchestrator(
        completions: completionService,
        dispatcher: dispatcher,
        eventClock: _FixedClock(),
      );

  Future<void> seedCompletedAttempt(ExerciseAttemptSnapshot snapshot) =>
      attempts.save(snapshot);
}

class _FixedClock implements CompletionClock, CanonicalEventClock, UsageLedgerClock {
  @override
  DateTime now() => DateTime.utc(2026, 7, 14, 10, 5);
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  test(
    'a valid completed golden lesson attempt runs the full pipeline exactly once',
    () async {
      final harness = _Harness();
      await harness.seedCompletedAttempt(attempt());

      final outcome = await harness.orchestrator.completeLesson(request());

      expect(outcome.completionResult.status, LessonCompletionStatus.recorded);
      final completionId = outcome.completionResult.record!.completionId;
      expect(outcome.dispatchOutcome!.allSucceeded, isTrue);

      final storedEvent = await harness.events.findBySourceRecordId(completionId);
      expect(storedEvent, isNotNull);
      expect(storedEvent!.userId, _userId);
      expect(storedEvent.lessonId, _lessonId);

      final usageEntries = await harness.usage.listForUserTrackDate(
        userId: _userId,
        userTrackId: _trackId,
        usageDate: '2026-07-14',
      );
      expect(usageEntries, hasLength(1));
      expect(usageEntries.single.sourceEventId, storedEvent.eventId);
      expect(usageEntries.single.sourceRecordId, completionId);

      final projection = await harness.progress.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      expect(projection, isNotNull);
      expect(projection!.sourceCompletionId, completionId);
      expect(projection.lastProcessedEventId, storedEvent.eventId);

      final core5Evidence = await harness.core5.findByEventId(storedEvent.eventId);
      final core6Evidence = await harness.core6.findByEventId(storedEvent.eventId);
      expect(core5Evidence, isNotNull);
      expect(core6Evidence, isNotNull);
    },
  );

  test(
    'same idempotency key retry does not duplicate event, usage, progress, or evidence',
    () async {
      final harness = _Harness();
      await harness.seedCompletedAttempt(attempt());

      final first = await harness.orchestrator.completeLesson(request());
      final second = await harness.orchestrator.completeLesson(request());

      expect(
        first.completionResult.record!.completionId,
        second.completionResult.record!.completionId,
      );
      final allEvents = await harness.events.listAll();
      expect(allEvents, hasLength(1));

      final usageRaw = (await SharedPreferences.getInstance()).getString(
        SharedPreferencesUsageLedgerRepository.storageKey,
      );
      expect(jsonDecode(usageRaw!) as List, hasLength(1));

      final progressAll = await harness.progress.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(progressAll, hasLength(1));

      expect(
        await harness.core5.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await harness.core6.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    },
  );

  test(
    'same attempt with a different idempotency key does not duplicate side effects',
    () async {
      final harness = _Harness();
      await harness.seedCompletedAttempt(attempt());

      await harness.orchestrator.completeLesson(request());
      await harness.orchestrator.completeLesson(
        request(idempotencyKey: 'completion:user-1:daily_life:ja-daily_life-m01-u1-l1:attempt-1:retry'),
      );

      expect(await harness.events.listAll(), hasLength(1));
      final usageRaw = (await SharedPreferences.getInstance()).getString(
        SharedPreferencesUsageLedgerRepository.storageKey,
      );
      expect(jsonDecode(usageRaw!) as List, hasLength(1));
    },
  );

  test(
    'a different attempt in the same scope does not duplicate usage, progress, or evidence',
    () async {
      final harness = _Harness();
      await harness.seedCompletedAttempt(attempt());
      await harness.orchestrator.completeLesson(request());

      await harness.seedCompletedAttempt(attempt(attemptId: 'attempt-2'));
      final second = await harness.orchestrator.completeLesson(
        request(
          attemptId: 'attempt-2',
          idempotencyKey: 'completion:user-1:daily_life:ja-daily_life-m01-u1-l1:attempt-2',
        ),
      );

      expect(second.completionResult.status, LessonCompletionStatus.alreadyCompleted);
      expect(second.dispatchOutcome, isNotNull);
      expect(second.dispatchOutcome!.allSucceeded, isTrue);

      expect(await harness.events.listAll(), hasLength(1));
      final usageRaw = (await SharedPreferences.getInstance()).getString(
        SharedPreferencesUsageLedgerRepository.storageKey,
      );
      expect(jsonDecode(usageRaw!) as List, hasLength(1));
      expect(
        await harness.progress.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    },
  );

  test('replay does not consume additional usage', () async {
    final harness = _Harness();
    await harness.seedCompletedAttempt(attempt());
    await harness.orchestrator.completeLesson(request());

    // Replay: dispatch the already-appended event again directly, simulating
    // a retry of a partially-failed delivery.
    final existingEvent = (await harness.events.listAll()).single;
    await harness.dispatcher.dispatch(existingEvent);

    final usageRaw = (await SharedPreferences.getInstance()).getString(
      SharedPreferencesUsageLedgerRepository.storageKey,
    );
    expect(jsonDecode(usageRaw!) as List, hasLength(1));
  });

  test('pipeline state persists after all repositories restart', () async {
    final harness = _Harness();
    await harness.seedCompletedAttempt(attempt());
    final outcome = await harness.orchestrator.completeLesson(request());
    final completionId = outcome.completionResult.record!.completionId;

    final restartedEvents = SharedPreferencesCanonicalEventRepository();
    final restartedUsage = SharedPreferencesUsageLedgerRepository();
    final restartedProgress = SharedPreferencesCurriculumProgressRepository();

    expect(await restartedEvents.findBySourceRecordId(completionId), isNotNull);
    expect(
      await restartedProgress.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      ),
      isNotNull,
    );
    final restartedUsageEntries = await restartedUsage.listForUserTrackDate(
      userId: _userId,
      userTrackId: _trackId,
      usageDate: '2026-07-14',
    );
    expect(restartedUsageEntries, hasLength(1));
  });
}
