import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/usage_ledger.dart';

abstract interface class UsageLedgerRepository {
  Future<UsageLedgerEntry?> findByIdempotencyKey(String key);
  Future<UsageLedgerEntry?> findBySourceEventId(String sourceEventId);
  Future<int> countForDateAndType({
    required String userId,
    required String userTrackId,
    required String usageDate,
    required UsageType usageType,
  });
  Future<List<UsageLedgerEntry>> listForUserTrackDate({
    required String userId,
    required String userTrackId,
    required String usageDate,
  });
  Future<void> save(UsageLedgerEntry entry);
}

class UsageLedgerStorageException implements Exception {
  const UsageLedgerStorageException(this.message, [this.cause]);

  final String message;
  final Object? cause;

  @override
  String toString() => 'UsageLedgerStorageException: $message';
}

enum UsageLedgerUniqueness { usageEntryId, idempotencyKey, sourceEventId }

class UsageLedgerUniquenessException implements Exception {
  const UsageLedgerUniquenessException(this.conflict);

  final UsageLedgerUniqueness conflict;

  @override
  String toString() =>
      'UsageLedgerUniquenessException: ${conflict.name} already exists';
}

class SharedPreferencesUsageLedgerRepository implements UsageLedgerRepository {
  static const storageKey = 'novalang.usage_ledger.v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<List<UsageLedgerEntry>> _read() async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) {
      return [];
    }
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) {
        throw const FormatException('Usage ledger storage root must be a list');
      }
      return decoded
          .map(
            (value) => UsageLedgerEntry.fromJson(
              Map<String, dynamic>.from(value as Map),
            ),
          )
          .toList(growable: true);
    } on UsageLedgerStorageException {
      rethrow;
    } catch (error) {
      throw UsageLedgerStorageException(
        'Stored usage ledger entries are invalid',
        error,
      );
    }
  }

  Future<void> _write(List<UsageLedgerEntry> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((value) => value.toJson()).toList()),
      );
      if (!written) {
        throw const UsageLedgerStorageException(
          'Failed to persist usage ledger entries',
        );
      }
    } on UsageLedgerStorageException {
      rethrow;
    } catch (error) {
      throw UsageLedgerStorageException(
        'Failed to persist usage ledger entries',
        error,
      );
    }
  }

  @override
  Future<UsageLedgerEntry?> findByIdempotencyKey(String key) async =>
      _firstWhere(await _read(), (value) => value.idempotencyKey == key);

  @override
  Future<UsageLedgerEntry?> findBySourceEventId(String sourceEventId) async =>
      _firstWhere(await _read(), (value) => value.sourceEventId == sourceEventId);

  @override
  Future<int> countForDateAndType({
    required String userId,
    required String userTrackId,
    required String usageDate,
    required UsageType usageType,
  }) async {
    final values = await _read();
    return values
        .where(
          (value) =>
              value.userId == userId &&
              value.userTrackId == userTrackId &&
              value.usageDate == usageDate &&
              value.usageType == usageType,
        )
        .length;
  }

  @override
  Future<List<UsageLedgerEntry>> listForUserTrackDate({
    required String userId,
    required String userTrackId,
    required String usageDate,
  }) async {
    final values = await _read();
    return values
        .where(
          (value) =>
              value.userId == userId &&
              value.userTrackId == userTrackId &&
              value.usageDate == usageDate,
        )
        .toList(growable: false);
  }

  @override
  Future<void> save(UsageLedgerEntry entry) => _serial(() async {
    entry.validate();
    final values = await _read();
    final sameId = _firstWhere(
      values,
      (value) => value.usageEntryId == entry.usageEntryId,
    );
    if (sameId != null) {
      if (jsonEncode(sameId.toJson()) != jsonEncode(entry.toJson())) {
        throw const UsageLedgerUniquenessException(
          UsageLedgerUniqueness.usageEntryId,
        );
      }
      return;
    }
    if (values.any((value) => value.idempotencyKey == entry.idempotencyKey)) {
      throw const UsageLedgerUniquenessException(
        UsageLedgerUniqueness.idempotencyKey,
      );
    }
    if (values.any((value) => value.sourceEventId == entry.sourceEventId)) {
      throw const UsageLedgerUniquenessException(
        UsageLedgerUniqueness.sourceEventId,
      );
    }
    values.add(entry);
    await _write(values);
  });
}

T? _firstWhere<T>(Iterable<T> values, bool Function(T value) matches) {
  for (final value in values) {
    if (matches(value)) {
      return value;
    }
  }
  return null;
}
