import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/lesson_completion.dart';

abstract interface class LessonCompletionRepository {
  Future<LessonCompletionRecord?> findByIdempotencyKey(String key);
  Future<LessonCompletionRecord?> findFirstCompletion({
    required String userId,
    required String userTrackId,
    required String lessonId,
  });
  Future<LessonCompletionRecord?> findByAttemptId(String attemptId);
  Future<void> save(LessonCompletionRecord record);
}

class LessonCompletionStorageException implements Exception {
  const LessonCompletionStorageException(this.message, [this.cause]);

  final String message;
  final Object? cause;

  @override
  String toString() => 'LessonCompletionStorageException: $message';
}

enum LessonCompletionUniqueness {
  completionId,
  idempotencyKey,
  attemptId,
  lessonScope,
}

class LessonCompletionUniquenessException implements Exception {
  const LessonCompletionUniquenessException(this.conflict);

  final LessonCompletionUniqueness conflict;

  @override
  String toString() =>
      'LessonCompletionUniquenessException: ${conflict.name} already exists';
}

class SharedPreferencesLessonCompletionRepository
    implements LessonCompletionRepository {
  static const storageKey = 'novalang.lesson_completions.v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<List<LessonCompletionRecord>> _read() async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) {
      return [];
    }
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) {
        throw const FormatException('Completion storage root must be a list');
      }
      return decoded
          .map(
            (value) => LessonCompletionRecord.fromJson(
              Map<String, dynamic>.from(value as Map),
            ),
          )
          .toList(growable: true);
    } on LessonCompletionStorageException {
      rethrow;
    } catch (error) {
      throw LessonCompletionStorageException(
        'Stored lesson completions are invalid',
        error,
      );
    }
  }

  Future<void> _write(List<LessonCompletionRecord> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((value) => value.toJson()).toList()),
      );
      if (!written) {
        throw const LessonCompletionStorageException(
          'Failed to persist lesson completions',
        );
      }
    } on LessonCompletionStorageException {
      rethrow;
    } catch (error) {
      throw LessonCompletionStorageException(
        'Failed to persist lesson completions',
        error,
      );
    }
  }

  @override
  Future<LessonCompletionRecord?> findByIdempotencyKey(String key) async =>
      _firstWhere(await _read(), (value) => value.idempotencyKey == key);

  @override
  Future<LessonCompletionRecord?> findByAttemptId(String attemptId) async =>
      _firstWhere(await _read(), (value) => value.attemptId == attemptId);

  @override
  Future<LessonCompletionRecord?> findFirstCompletion({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => _firstWhere(
    await _read(),
    (value) =>
        value.userId == userId &&
        value.userTrackId == userTrackId &&
        value.lessonId == lessonId,
  );

  @override
  Future<void> save(LessonCompletionRecord record) => _serial(() async {
    record.validate();
    final values = await _read();
    final sameId = _firstWhere(
      values,
      (value) => value.completionId == record.completionId,
    );
    if (sameId != null) {
      if (jsonEncode(sameId.toJson()) != jsonEncode(record.toJson())) {
        throw const LessonCompletionUniquenessException(
          LessonCompletionUniqueness.completionId,
        );
      }
      return;
    }
    if (values.any((value) => value.idempotencyKey == record.idempotencyKey)) {
      throw const LessonCompletionUniquenessException(
        LessonCompletionUniqueness.idempotencyKey,
      );
    }
    if (values.any((value) => value.attemptId == record.attemptId)) {
      throw const LessonCompletionUniquenessException(
        LessonCompletionUniqueness.attemptId,
      );
    }
    if (values.any(
      (value) =>
          value.userId == record.userId &&
          value.userTrackId == record.userTrackId &&
          value.lessonId == record.lessonId,
    )) {
      throw const LessonCompletionUniquenessException(
        LessonCompletionUniqueness.lessonScope,
      );
    }
    values.add(record);
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
