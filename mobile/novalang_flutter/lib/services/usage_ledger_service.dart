import '../models/usage_ledger.dart';
import '../repositories/usage_ledger_repository.dart';

abstract interface class UsageLedgerClock {
  DateTime now();
}

class SystemUsageLedgerClock implements UsageLedgerClock {
  const SystemUsageLedgerClock();

  @override
  DateTime now() => DateTime.now().toUtc();
}

abstract interface class UsageDateResolver {
  String todayFor(DateTime now);
}

class UtcUsageDateResolver implements UsageDateResolver {
  const UtcUsageDateResolver();

  @override
  String todayFor(DateTime now) {
    final utc = now.toUtc();
    final year = utc.year.toString().padLeft(4, '0');
    final month = utc.month.toString().padLeft(2, '0');
    final day = utc.day.toString().padLeft(2, '0');
    return '$year-$month-$day';
  }
}

abstract interface class UsageEntryIdGenerator {
  String nextId();
}

abstract interface class UsageLedgerService {
  Future<UsageCommitResult> commit(UsageCommitRequest request);
}

class UsageIdempotencyConflictException implements Exception {
  const UsageIdempotencyConflictException(this.idempotencyKey);

  final String idempotencyKey;

  @override
  String toString() =>
      'UsageIdempotencyConflictException: key $idempotencyKey belongs to a '
      'different usage commit identity';
}

class LocalUsageLedgerService implements UsageLedgerService {
  LocalUsageLedgerService({
    required this.ledger,
    required this.clock,
    required this.dateResolver,
    required this.ids,
  });

  final UsageLedgerRepository ledger;
  final UsageLedgerClock clock;
  final UsageDateResolver dateResolver;
  final UsageEntryIdGenerator ids;
  Future<void> _tail = Future.value();

  @override
  Future<UsageCommitResult> commit(UsageCommitRequest request) {
    request.validate();
    final next = _tail.then((_) => _commit(request));
    _tail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<UsageCommitResult> _commit(UsageCommitRequest request) async {
    final byKey = await ledger.findByIdempotencyKey(request.idempotencyKey);
    if (byKey != null) {
      return _idempotentResult(byKey, request);
    }

    final bySource = await ledger.findBySourceEventId(request.sourceEventId);
    if (bySource != null) {
      return UsageCommitResult.alreadyCommitted(bySource.usageEntryId);
    }

    final now = clock.now();
    final entry = UsageLedgerEntry.create(
      usageEntryId: ids.nextId(),
      userId: request.userId,
      userTrackId: request.userTrackId,
      usageDate: dateResolver.todayFor(now),
      usageType: request.usageType,
      quantity: request.quantity,
      sourceEventId: request.sourceEventId,
      sourceRecordId: request.sourceRecordId,
      recordedAt: now,
      idempotencyKey: request.idempotencyKey,
    );
    try {
      await ledger.save(entry);
      return UsageCommitResult.committed(entry);
    } on UsageLedgerUniquenessException catch (conflict) {
      return _resolveUniquenessRace(request, conflict);
    }
  }

  UsageCommitResult _idempotentResult(
    UsageLedgerEntry entry,
    UsageCommitRequest request,
  ) {
    if (!_sameIdentity(entry, request)) {
      throw UsageIdempotencyConflictException(request.idempotencyKey);
    }
    return UsageCommitResult.committed(entry);
  }

  Future<UsageCommitResult> _resolveUniquenessRace(
    UsageCommitRequest request,
    UsageLedgerUniquenessException originalConflict,
  ) async {
    final byKey = await ledger.findByIdempotencyKey(request.idempotencyKey);
    if (byKey != null) {
      return _idempotentResult(byKey, request);
    }
    final bySource = await ledger.findBySourceEventId(request.sourceEventId);
    if (bySource != null) {
      return UsageCommitResult.alreadyCommitted(bySource.usageEntryId);
    }
    throw originalConflict;
  }
}

bool _sameIdentity(UsageLedgerEntry entry, UsageCommitRequest request) =>
    entry.sourceEventId == request.sourceEventId &&
    entry.userId == request.userId &&
    entry.userTrackId == request.userTrackId &&
    entry.usageType == request.usageType;
