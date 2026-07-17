import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/lesson_completion.dart';
import 'exercise_attempt_repository.dart';
import 'lesson_completion_orchestrator.dart';

/// Thrown when the Stage 1 completion pipeline did not finish cleanly enough
/// for the Golden Result Page to treat the flow as UI success.
///
/// Application/runtime only — not part of any shared wire contract.
class GoldenLessonCompletionPipelineException implements Exception {
  const GoldenLessonCompletionPipelineException({
    required this.failedSubscriberIds,
    this.eventId,
    this.completionId,
    this.message,
  });

  final List<String> failedSubscriberIds;
  final String? eventId;
  final String? completionId;
  final String? message;

  @override
  String toString() {
    final details = <String>[
      ?message,
      if (completionId != null) 'completionId=$completionId',
      if (eventId != null) 'eventId=$eventId',
      if (failedSubscriberIds.isNotEmpty)
        'failedSubscriberIds=${failedSubscriberIds.join(",")}',
    ];
    return 'GoldenLessonCompletionPipelineException: '
        '${details.isEmpty ? "pipeline incomplete" : details.join("; ")}';
  }
}

/// Result of the Golden Result Page completion application action.
class GoldenLessonCompletionActionResult {
  const GoldenLessonCompletionActionResult({
    required this.attempt,
    required this.outcome,
    required this.compatibilityApplied,
  });

  final ExerciseAttemptSnapshot attempt;
  final LessonCompletionOutcome outcome;

  /// True only when this call newly applied the UI compatibility bridge.
  final bool compatibilityApplied;
}

/// Production application action used by the Golden Result Page.
///
/// Resolves a completed attempt by stable [attemptId], runs the Stage 1
/// pipeline through [LessonCompletionOrchestrator], requires every subscriber
/// to succeed, then applies the UI-only compatibility bridge at most once per
/// lesson marker. Navigation stays in the widget layer.
class GoldenLessonCompletionAction {
  GoldenLessonCompletionAction({
    required this.attempts,
    required this.orchestrator,
  });

  final ExerciseAttemptRepository attempts;
  final LessonCompletionOrchestrator orchestrator;

  Future<GoldenLessonCompletionActionResult> run({
    required String attemptId,
    required String userId,
    required String userTrackId,
    required String lessonId,
    required Future<bool> Function() applyUiCompatibilityBridgeOnce,
  }) async {
    // Ensure the scope-keyed snapshot is marked completed, then reload by the
    // stable attempt identity. Never use active() here — it intentionally
    // returns null for completed attempts and would skip the Stage 1 pipeline.
    await attempts.complete(
      userId: userId,
      userTrackId: userTrackId,
      lessonId: lessonId,
    );
    final snapshot = await attempts.findByAttemptId(attemptId);
    if (snapshot == null) {
      throw StateError(
        'Completed attempt $attemptId was not found after mark-complete',
      );
    }
    if (snapshot.userId != userId ||
        snapshot.userTrackId != userTrackId ||
        snapshot.lessonId != lessonId) {
      throw StateError(
        'Attempt $attemptId does not belong to user=$userId '
        'track=$userTrackId lesson=$lessonId',
      );
    }
    if (!snapshot.isCompleted) {
      throw StateError('Attempt $attemptId is not marked completed');
    }

    final outcome = await orchestrator.completeLesson(
      LessonCompletionRequest.create(
        attemptId: snapshot.attemptId,
        userId: userId,
        userTrackId: userTrackId,
        lessonId: lessonId,
        requestedAt: DateTime.now().toUtc(),
        idempotencyKey:
            'completion:$userId:$userTrackId:$lessonId:${snapshot.attemptId}',
      ),
    );

    final status = outcome.completionResult.status;
    if (status != LessonCompletionStatus.recorded &&
        status != LessonCompletionStatus.alreadyCompleted) {
      throw StateError(
        'Lesson completion pipeline failed with status ${status.wire}',
      );
    }

    final dispatch = outcome.dispatchOutcome;
    if (dispatch == null || !dispatch.allSucceeded) {
      throw GoldenLessonCompletionPipelineException(
        failedSubscriberIds: dispatch?.failedSubscriberIds ?? const [],
        eventId: dispatch?.event.eventId,
        completionId:
            outcome.completionResult.record?.completionId ??
            outcome.completionResult.existingCompletionId,
        message: dispatch == null
            ? 'dispatch outcome missing after completion'
            : 'one or more subscribers failed after retry',
      );
    }

    // Temporary UI compatibility bridge runs only after pipeline success, and
    // at most once per durable lesson marker.
    final compatibilityApplied = await applyUiCompatibilityBridgeOnce();

    return GoldenLessonCompletionActionResult(
      attempt: snapshot,
      outcome: outcome,
      compatibilityApplied: compatibilityApplied,
    );
  }
}

final goldenLessonCompletionActionProvider = Provider<GoldenLessonCompletionAction>(
  (ref) => GoldenLessonCompletionAction(
    attempts: SharedPreferencesExerciseAttemptRepository(),
    orchestrator: ref.read(lessonCompletionOrchestratorProvider),
  ),
);
