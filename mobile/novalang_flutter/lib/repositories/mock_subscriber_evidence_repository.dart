import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/mock_subscriber_evidence.dart';

abstract interface class MockSubscriberEvidenceRepository {
  Future<MockSubscriberEvidence?> findByEventId(String eventId);
  Future<List<MockSubscriberEvidence>> listForUserTrack({
    required String userId,
    required String userTrackId,
  });
  Future<void> save(MockSubscriberEvidence evidence);
}

class MockSubscriberEvidenceStorageException implements Exception {
  const MockSubscriberEvidenceStorageException(this.message, [this.cause]);

  final String message;
  final Object? cause;

  @override
  String toString() => 'MockSubscriberEvidenceStorageException: $message';
}

class MockSubscriberEvidenceUniquenessException implements Exception {
  const MockSubscriberEvidenceUniquenessException();

  @override
  String toString() =>
      'MockSubscriberEvidenceUniquenessException: evidence already exists '
      'for this event';
}

/// Persists provisional evidence for the mock Core 5 subscriber under its
/// own storage key, independent of the mock Core 6 subscriber's storage.
class SharedPreferencesMockCore5EvidenceRepository
    implements MockSubscriberEvidenceRepository {
  static const storageKey = 'novalang.mock_core5_evidence.v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<List<MockSubscriberEvidence>> _read() async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) return [];
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) {
        throw const FormatException('Mock Core 5 evidence storage root must be a list');
      }
      return decoded
          .map((value) => MockSubscriberEvidence.fromJson(Map<String, dynamic>.from(value as Map)))
          .toList(growable: true);
    } on MockSubscriberEvidenceStorageException {
      rethrow;
    } catch (error) {
      throw MockSubscriberEvidenceStorageException(
        'Stored mock Core 5 evidence is invalid',
        error,
      );
    }
  }

  Future<void> _write(List<MockSubscriberEvidence> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((value) => value.toJson()).toList()),
      );
      if (!written) {
        throw const MockSubscriberEvidenceStorageException(
          'Failed to persist mock Core 5 evidence',
        );
      }
    } on MockSubscriberEvidenceStorageException {
      rethrow;
    } catch (error) {
      throw MockSubscriberEvidenceStorageException(
        'Failed to persist mock Core 5 evidence',
        error,
      );
    }
  }

  @override
  Future<MockSubscriberEvidence?> findByEventId(String eventId) async =>
      _firstWhere(await _read(), (value) => value.eventId == eventId);

  @override
  Future<List<MockSubscriberEvidence>> listForUserTrack({
    required String userId,
    required String userTrackId,
  }) async {
    final values = await _read();
    return values
        .where((value) => value.userId == userId && value.userTrackId == userTrackId)
        .toList(growable: false);
  }

  @override
  Future<void> save(MockSubscriberEvidence evidence) => _serial(() async {
    evidence.validate();
    final values = await _read();
    final sameId = _firstWhere(values, (value) => value.evidenceId == evidence.evidenceId);
    if (sameId != null) {
      if (jsonEncode(sameId.toJson()) != jsonEncode(evidence.toJson())) {
        throw const MockSubscriberEvidenceUniquenessException();
      }
      return;
    }
    if (values.any((value) => value.eventId == evidence.eventId)) {
      throw const MockSubscriberEvidenceUniquenessException();
    }
    values.add(evidence);
    await _write(values);
  });
}

/// Persists provisional evidence for the mock Core 6 subscriber under its
/// own storage key, independent of the mock Core 5 subscriber's storage.
class SharedPreferencesMockCore6EvidenceRepository
    implements MockSubscriberEvidenceRepository {
  static const storageKey = 'novalang.mock_core6_evidence.v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<List<MockSubscriberEvidence>> _read() async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) return [];
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) {
        throw const FormatException('Mock Core 6 evidence storage root must be a list');
      }
      return decoded
          .map((value) => MockSubscriberEvidence.fromJson(Map<String, dynamic>.from(value as Map)))
          .toList(growable: true);
    } on MockSubscriberEvidenceStorageException {
      rethrow;
    } catch (error) {
      throw MockSubscriberEvidenceStorageException(
        'Stored mock Core 6 evidence is invalid',
        error,
      );
    }
  }

  Future<void> _write(List<MockSubscriberEvidence> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((value) => value.toJson()).toList()),
      );
      if (!written) {
        throw const MockSubscriberEvidenceStorageException(
          'Failed to persist mock Core 6 evidence',
        );
      }
    } on MockSubscriberEvidenceStorageException {
      rethrow;
    } catch (error) {
      throw MockSubscriberEvidenceStorageException(
        'Failed to persist mock Core 6 evidence',
        error,
      );
    }
  }

  @override
  Future<MockSubscriberEvidence?> findByEventId(String eventId) async =>
      _firstWhere(await _read(), (value) => value.eventId == eventId);

  @override
  Future<List<MockSubscriberEvidence>> listForUserTrack({
    required String userId,
    required String userTrackId,
  }) async {
    final values = await _read();
    return values
        .where((value) => value.userId == userId && value.userTrackId == userTrackId)
        .toList(growable: false);
  }

  @override
  Future<void> save(MockSubscriberEvidence evidence) => _serial(() async {
    evidence.validate();
    final values = await _read();
    final sameId = _firstWhere(values, (value) => value.evidenceId == evidence.evidenceId);
    if (sameId != null) {
      if (jsonEncode(sameId.toJson()) != jsonEncode(evidence.toJson())) {
        throw const MockSubscriberEvidenceUniquenessException();
      }
      return;
    }
    if (values.any((value) => value.eventId == evidence.eventId)) {
      throw const MockSubscriberEvidenceUniquenessException();
    }
    values.add(evidence);
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
