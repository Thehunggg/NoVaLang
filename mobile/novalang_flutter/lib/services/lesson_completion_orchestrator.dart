import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/canonical_event.dart';
import '../models/lesson_completion.dart';
import '../models/usage_ledger.dart';
import '../repositories/canonical_event_repository.dart';
import '../repositories/curriculum_progress_repository.dart';
import '../repositories/lesson_completion_repository.dart';
import '../repositories/mock_subscriber_evidence_repository.dart';
import '../repositories/usage_ledger_repository.dart';
import 'canonical_event_dispatcher.dart';
import 'curriculum_progress_projector.dart';
import 'exercise_attempt_repository.dart';
import 'lesson_completion_service.dart';
import 'mock_core_subscribers.dart';
import 'usage_ledger_service.dart';

/// Generates locally unique IDs using this codebase's existing convention
/// (see the attempt-ID fallback in `five_card_exercise_flow.dart`), with an
/// added counter so multiple IDs requested within the same microsecond do
/// not collide. No new package dependency is introduced for this.
class MicrosecondSequentialIdGenerator
    implements
        CompletionIdGenerator,
        CanonicalEventIdGenerator,
        UsageEntryIdGenerator,
        MockEvidenceIdGenerator {
  MicrosecondSequentialIdGenerator(this.prefix);

  final String prefix;
  int _counter = 0;

  @override
  String nextId() {
    _counter += 1;
    return '$prefix-${DateTime.now().microsecondsSinceEpoch}-$_counter';
  }
}

/// Bridges a canonical `lesson_completion_recorded` event to a Local Usage
/// Ledger commit. Usage is recorded only through this subscriber, and only
/// once per canonical event: `UsageLedgerService.commit` dedupes by
/// `sourceEventId`, so a re-dispatched (replayed, retried) event commits no
/// additional usage.
class UsageLedgerEventSubscriber implements CanonicalEventSubscriber {
  UsageLedgerEventSubscriber({required this.usageLedger, required this.clock});

  final UsageLedgerService usageLedger;
  final UsageLedgerClock clock;

  @override
  String get subscriberId => 'shared.usage_ledger';

  @override
  Future<void> handle(CanonicalEvent event) async {
    if (event.eventType != CanonicalEventType.lessonCompletionRecorded) {
      return;
    }
    await usageLedger.commit(
      UsageCommitRequest.create(
        userId: event.userId,
        userTrackId: event.userTrackId,
        usageType: UsageType.newLessonCompletion,
        quantity: 1,
        sourceEventId: event.eventId,
        sourceRecordId: event.sourceRecordId,
        requestedAt: clock.now(),
        idempotencyKey: 'usage:${event.eventId}',
      ),
    );
  }
}

class LessonCompletionOutcome {
  const LessonCompletionOutcome({
    required this.completionResult,
    this.dispatchOutcome,
  });

  final LessonCompletionResult completionResult;

  /// Null when no event pipeline ran for this call (`invalid_attempt` or
  /// `not_eligible`). For `recorded` and `already_completed`, the orchestrator
  /// appends/re-dispatches and retries once so callers can require
  /// [EventDispatchOutcome.allSucceeded] before UI success.
  final EventDispatchOutcome? dispatchOutcome;
}

abstract interface class LessonCompletionOrchestrator {
  Future<LessonCompletionOutcome> completeLesson(LessonCompletionRequest request);
}

/// Coordinates the Stage 1 golden completion flow:
///
/// valid completed attempt -> LessonCompletionService -> LessonCompletionRecord
/// -> CanonicalEvent: lesson_completion_recorded -> Local Usage Ledger
/// -> Curriculum Progress Projector -> Mock Core 5 Subscriber -> Mock Core 6
/// Subscriber.
///
/// `LessonCompletionService` only ever produces a `LessonCompletionResult`
/// and never becomes aware of the dispatcher or any subscriber. All side
/// effects are coordinated here, strictly after a completion record exists.
class GoldenLessonCompletionOrchestrator implements LessonCompletionOrchestrator {
  GoldenLessonCompletionOrchestrator({
    required this.completions,
    required this.dispatcher,
    required this.eventClock,
  });

  final LessonCompletionService completions;
  final CanonicalEventDispatcher dispatcher;
  final CanonicalEventClock eventClock;

  @override
  Future<LessonCompletionOutcome> completeLesson(
    LessonCompletionRequest request,
  ) async {
    final result = await completions.complete(request);
    if (result.status == LessonCompletionStatus.recorded) {
      final record = result.record!;
      return LessonCompletionOutcome(
        completionResult: result,
        dispatchOutcome: await _appendAndDispatchWithRetry(
          sourceRecordId: record.completionId,
          userId: record.userId,
          userTrackId: record.userTrackId,
          lessonId: record.lessonId,
        ),
      );
    }
    if (result.status == LessonCompletionStatus.alreadyCompleted) {
      // Re-dispatch the existing event so a retry can heal persistent
      // subscriber failures without creating a second completion/event.
      final completionId = result.existingCompletionId!;
      return LessonCompletionOutcome(
        completionResult: result,
        dispatchOutcome: await _appendAndDispatchWithRetry(
          sourceRecordId: completionId,
          userId: request.userId,
          userTrackId: request.userTrackId,
          lessonId: request.lessonId,
        ),
      );
    }
    return LessonCompletionOutcome(completionResult: result);
  }

  Future<EventDispatchOutcome> _appendAndDispatchWithRetry({
    required String sourceRecordId,
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async {
    var outcome = await dispatcher.appendAndDispatch(
      CanonicalEventAppendRequest.create(
        eventType: CanonicalEventType.lessonCompletionRecorded,
        sourceRecordId: sourceRecordId,
        sourceRecordType: 'lesson_completion',
        userId: userId,
        userTrackId: userTrackId,
        lessonId: lessonId,
        requestedAt: eventClock.now(),
        idempotencyKey: 'event:$sourceRecordId',
      ),
    );
    if (!outcome.allSucceeded) {
      // Bounded, single synchronous retry: subscriber idempotency (by
      // eventId/sourceEventId) makes redelivery safe. A more robust
      // scheduled retry queue is future work beyond Stage 1.
      outcome = await dispatcher.dispatch(outcome.event);
    }
    return outcome;
  }
}

final lessonCompletionRepositoryProvider = Provider<LessonCompletionRepository>(
  (_) => SharedPreferencesLessonCompletionRepository(),
);

final lessonCompletionServiceProvider = Provider<LessonCompletionService>(
  (ref) => LocalLessonCompletionService(
    attempts: SharedPreferencesExerciseAttemptRepository(),
    completions: ref.read(lessonCompletionRepositoryProvider),
    eligibility: const AllowLessonCompletionEligibility(),
    clock: const SystemCompletionClock(),
    ids: MicrosecondSequentialIdGenerator('completion'),
  ),
);

final canonicalEventDispatcherProvider = Provider<CanonicalEventDispatcher>((ref) {
  final dispatcher = LocalCanonicalEventDispatcher(
    events: SharedPreferencesCanonicalEventRepository(),
    clock: const SystemCanonicalEventClock(),
    ids: MicrosecondSequentialIdGenerator('event'),
  );
  dispatcher.subscribe(
    UsageLedgerEventSubscriber(
      usageLedger: LocalUsageLedgerService(
        ledger: SharedPreferencesUsageLedgerRepository(),
        clock: const SystemUsageLedgerClock(),
        dateResolver: const UtcUsageDateResolver(),
        ids: MicrosecondSequentialIdGenerator('usage'),
      ),
      clock: const SystemUsageLedgerClock(),
    ),
  );
  dispatcher.subscribe(
    CurriculumProgressProjector(
      repository: SharedPreferencesCurriculumProgressRepository(),
    ),
  );
  dispatcher.subscribe(
    MockCore5Subscriber(
      repository: SharedPreferencesMockCore5EvidenceRepository(),
      ids: MicrosecondSequentialIdGenerator('evidence-core5'),
    ),
  );
  dispatcher.subscribe(
    MockCore6Subscriber(
      repository: SharedPreferencesMockCore6EvidenceRepository(),
      ids: MicrosecondSequentialIdGenerator('evidence-core6'),
    ),
  );
  return dispatcher;
});

final lessonCompletionOrchestratorProvider = Provider<LessonCompletionOrchestrator>(
  (ref) => GoldenLessonCompletionOrchestrator(
    completions: ref.read(lessonCompletionServiceProvider),
    dispatcher: ref.read(canonicalEventDispatcherProvider),
    eventClock: const SystemCanonicalEventClock(),
  ),
);
