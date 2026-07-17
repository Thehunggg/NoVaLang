import '../models/lesson_completion.dart';
import '../repositories/lesson_completion_repository.dart';
import 'exercise_attempt_repository.dart';

abstract interface class LessonCompletionEligibility {
  Future<bool> canComplete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  });
}

class AllowLessonCompletionEligibility implements LessonCompletionEligibility {
  const AllowLessonCompletionEligibility();

  @override
  Future<bool> canComplete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => true;
}

abstract interface class CompletionClock {
  DateTime now();
}

class SystemCompletionClock implements CompletionClock {
  const SystemCompletionClock();

  @override
  DateTime now() => DateTime.now().toUtc();
}

abstract interface class CompletionIdGenerator {
  String nextId();
}

abstract interface class LessonCompletionService {
  Future<LessonCompletionResult> complete(LessonCompletionRequest request);
}

class IdempotencyConflictException implements Exception {
  const IdempotencyConflictException(this.idempotencyKey);

  final String idempotencyKey;

  @override
  String toString() =>
      'IdempotencyConflictException: key $idempotencyKey belongs to a '
      'different completion identity';
}

class CompletionIdentityConflictException implements Exception {
  const CompletionIdentityConflictException(this.attemptId);

  final String attemptId;

  @override
  String toString() =>
      'CompletionIdentityConflictException: attempt $attemptId belongs to a '
      'different completion identity';
}

class LocalLessonCompletionService implements LessonCompletionService {
  LocalLessonCompletionService({
    required this.attempts,
    required this.completions,
    required this.eligibility,
    required this.clock,
    required this.ids,
  });

  final ExerciseAttemptRepository attempts;
  final LessonCompletionRepository completions;
  final LessonCompletionEligibility eligibility;
  final CompletionClock clock;
  final CompletionIdGenerator ids;
  Future<void> _tail = Future.value();

  @override
  Future<LessonCompletionResult> complete(LessonCompletionRequest request) {
    request.validate();
    final next = _tail.then((_) => _complete(request));
    _tail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<LessonCompletionResult> _complete(
    LessonCompletionRequest request,
  ) async {
    final idempotent = await completions.findByIdempotencyKey(
      request.idempotencyKey,
    );
    if (idempotent != null) {
      return _idempotentResult(idempotent, request);
    }

    final attempt = await attempts.findByAttemptId(request.attemptId);
    if (attempt == null ||
        attempt.userId != request.userId ||
        attempt.userTrackId != request.userTrackId ||
        attempt.lessonId != request.lessonId ||
        !attempt.isCompleted) {
      return LessonCompletionResult.invalidAttempt();
    }

    final byAttempt = await completions.findByAttemptId(request.attemptId);
    if (byAttempt != null) {
      return _attemptResult(byAttempt, request);
    }

    final existing = await completions.findFirstCompletion(
      userId: request.userId,
      userTrackId: request.userTrackId,
      lessonId: request.lessonId,
    );
    if (existing != null) {
      return LessonCompletionResult.alreadyCompleted(existing.completionId);
    }

    if (!await eligibility.canComplete(
      userId: request.userId,
      userTrackId: request.userTrackId,
      lessonId: request.lessonId,
    )) {
      return LessonCompletionResult.notEligible();
    }

    final record = LessonCompletionRecord.create(
      completionId: ids.nextId(),
      attemptId: request.attemptId,
      userId: request.userId,
      userTrackId: request.userTrackId,
      lessonId: request.lessonId,
      completedAt: clock.now(),
      idempotencyKey: request.idempotencyKey,
    );
    try {
      await completions.save(record);
      return LessonCompletionResult.recorded(record);
    } on LessonCompletionUniquenessException catch (conflict) {
      return _resolveUniquenessRace(request, conflict);
    }
  }

  LessonCompletionResult _idempotentResult(
    LessonCompletionRecord record,
    LessonCompletionRequest request,
  ) {
    if (!_sameIdentity(record, request)) {
      throw IdempotencyConflictException(request.idempotencyKey);
    }
    return LessonCompletionResult.recorded(record);
  }

  LessonCompletionResult _attemptResult(
    LessonCompletionRecord record,
    LessonCompletionRequest request,
  ) {
    if (!_sameIdentity(record, request)) {
      throw CompletionIdentityConflictException(request.attemptId);
    }
    return LessonCompletionResult.recorded(record);
  }

  Future<LessonCompletionResult> _resolveUniquenessRace(
    LessonCompletionRequest request,
    LessonCompletionUniquenessException originalConflict,
  ) async {
    final idempotent = await completions.findByIdempotencyKey(
      request.idempotencyKey,
    );
    if (idempotent != null) {
      return _idempotentResult(idempotent, request);
    }
    final byAttempt = await completions.findByAttemptId(request.attemptId);
    if (byAttempt != null) {
      return _attemptResult(byAttempt, request);
    }
    final existing = await completions.findFirstCompletion(
      userId: request.userId,
      userTrackId: request.userTrackId,
      lessonId: request.lessonId,
    );
    if (existing != null) {
      return LessonCompletionResult.alreadyCompleted(existing.completionId);
    }
    throw originalConflict;
  }
}

bool _sameIdentity(
  LessonCompletionRecord record,
  LessonCompletionRequest request,
) =>
    record.attemptId == request.attemptId &&
    record.userId == request.userId &&
    record.userTrackId == request.userTrackId &&
    record.lessonId == request.lessonId;
