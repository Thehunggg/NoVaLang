import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/curriculum_progress_projection.dart';

abstract interface class CurriculumProgressRepository {
  Future<CurriculumProgressProjection?> findProjection({
    required String userId,
    required String userTrackId,
    required String lessonId,
  });
  Future<List<CurriculumProgressProjection>> listForUserTrack({
    required String userId,
    required String userTrackId,
  });
  Future<void> save(CurriculumProgressProjection projection);
}

class CurriculumProgressStorageException implements Exception {
  const CurriculumProgressStorageException(this.message, [this.cause]);

  final String message;
  final Object? cause;

  @override
  String toString() => 'CurriculumProgressStorageException: $message';
}

class CurriculumProgressUniquenessException implements Exception {
  const CurriculumProgressUniquenessException();

  @override
  String toString() =>
      'CurriculumProgressUniquenessException: a projection already exists '
      'for this user/track/lesson scope';
}

class SharedPreferencesCurriculumProgressRepository
    implements CurriculumProgressRepository {
  static const storageKey = 'novalang.curriculum_progress_projections.v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  String _scopeKey(String userId, String userTrackId, String lessonId) =>
      '$userId|$userTrackId|$lessonId';

  Future<Map<String, CurriculumProgressProjection>> _read() async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) {
      return {};
    }
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! Map) {
        throw const FormatException(
          'Curriculum progress storage root must be a map',
        );
      }
      final values = <String, CurriculumProgressProjection>{};
      for (final entry in decoded.entries) {
        final key = '${entry.key}';
        final value = entry.value;
        if (value is! Map) {
          throw FormatException(
            'Curriculum progress entry "$key" must be a map',
          );
        }
        values[key] = CurriculumProgressProjection.fromJson(
          Map<String, dynamic>.from(value),
        );
      }
      return values;
    } on CurriculumProgressStorageException {
      rethrow;
    } catch (error) {
      throw CurriculumProgressStorageException(
        'Stored curriculum progress projections are invalid',
        error,
      );
    }
  }

  Future<void> _write(Map<String, CurriculumProgressProjection> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((key, value) => MapEntry(key, value.toJson()))),
      );
      if (!written) {
        throw const CurriculumProgressStorageException(
          'Failed to persist curriculum progress projections',
        );
      }
    } on CurriculumProgressStorageException {
      rethrow;
    } catch (error) {
      throw CurriculumProgressStorageException(
        'Failed to persist curriculum progress projections',
        error,
      );
    }
  }

  @override
  Future<CurriculumProgressProjection?> findProjection({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => (await _read())[_scopeKey(userId, userTrackId, lessonId)];

  @override
  Future<List<CurriculumProgressProjection>> listForUserTrack({
    required String userId,
    required String userTrackId,
  }) async {
    final values = await _read();
    return values.values
        .where(
          (value) => value.userId == userId && value.userTrackId == userTrackId,
        )
        .toList(growable: false);
  }

  @override
  Future<void> save(CurriculumProgressProjection projection) => _serial(() async {
    projection.validate();
    final values = await _read();
    final key = _scopeKey(
      projection.userId,
      projection.userTrackId,
      projection.lessonId,
    );
    final existing = values[key];
    if (existing != null) {
      if (jsonEncode(existing.toJson()) != jsonEncode(projection.toJson())) {
        throw const CurriculumProgressUniquenessException();
      }
      return;
    }
    values[key] = projection;
    await _write(values);
  });
}
