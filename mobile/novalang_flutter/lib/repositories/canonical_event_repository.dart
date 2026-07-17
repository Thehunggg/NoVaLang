import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/canonical_event.dart';

abstract interface class CanonicalEventRepository {
  Future<CanonicalEvent?> findByIdempotencyKey(String key);
  Future<CanonicalEvent?> findBySourceRecordId(String sourceRecordId);
  Future<CanonicalEvent?> findById(String eventId);
  Future<List<CanonicalEvent>> listAll();
  Future<void> save(CanonicalEvent event);
}

class CanonicalEventStorageException implements Exception {
  const CanonicalEventStorageException(this.message, [this.cause]);

  final String message;
  final Object? cause;

  @override
  String toString() => 'CanonicalEventStorageException: $message';
}

enum CanonicalEventUniqueness { eventId, idempotencyKey, sourceRecordId }

class CanonicalEventUniquenessException implements Exception {
  const CanonicalEventUniquenessException(this.conflict);

  final CanonicalEventUniqueness conflict;

  @override
  String toString() =>
      'CanonicalEventUniquenessException: ${conflict.name} already exists';
}

class SharedPreferencesCanonicalEventRepository
    implements CanonicalEventRepository {
  static const storageKey = 'novalang.canonical_events.v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<List<CanonicalEvent>> _read() async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) {
      return [];
    }
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) {
        throw const FormatException('Canonical event storage root must be a list');
      }
      return decoded
          .map(
            (value) => CanonicalEvent.fromJson(
              Map<String, dynamic>.from(value as Map),
            ),
          )
          .toList(growable: true);
    } on CanonicalEventStorageException {
      rethrow;
    } catch (error) {
      throw CanonicalEventStorageException(
        'Stored canonical events are invalid',
        error,
      );
    }
  }

  Future<void> _write(List<CanonicalEvent> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((value) => value.toJson()).toList()),
      );
      if (!written) {
        throw const CanonicalEventStorageException(
          'Failed to persist canonical events',
        );
      }
    } on CanonicalEventStorageException {
      rethrow;
    } catch (error) {
      throw CanonicalEventStorageException(
        'Failed to persist canonical events',
        error,
      );
    }
  }

  @override
  Future<CanonicalEvent?> findByIdempotencyKey(String key) async =>
      _firstWhere(await _read(), (value) => value.idempotencyKey == key);

  @override
  Future<CanonicalEvent?> findBySourceRecordId(String sourceRecordId) async =>
      _firstWhere(await _read(), (value) => value.sourceRecordId == sourceRecordId);

  @override
  Future<CanonicalEvent?> findById(String eventId) async =>
      _firstWhere(await _read(), (value) => value.eventId == eventId);

  @override
  Future<List<CanonicalEvent>> listAll() => _read();

  @override
  Future<void> save(CanonicalEvent event) => _serial(() async {
    event.validate();
    final values = await _read();
    final sameId = _firstWhere(
      values,
      (value) => value.eventId == event.eventId,
    );
    if (sameId != null) {
      if (jsonEncode(sameId.toJson()) != jsonEncode(event.toJson())) {
        throw const CanonicalEventUniquenessException(
          CanonicalEventUniqueness.eventId,
        );
      }
      return;
    }
    if (values.any((value) => value.idempotencyKey == event.idempotencyKey)) {
      throw const CanonicalEventUniquenessException(
        CanonicalEventUniqueness.idempotencyKey,
      );
    }
    if (values.any((value) => value.sourceRecordId == event.sourceRecordId)) {
      throw const CanonicalEventUniquenessException(
        CanonicalEventUniqueness.sourceRecordId,
      );
    }
    values.add(event);
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
