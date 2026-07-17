import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class ExerciseAttemptStorageException implements Exception {
  const ExerciseAttemptStorageException(this.message, [this.cause]);

  final String message;
  final Object? cause;

  @override
  String toString() => 'ExerciseAttemptStorageException: $message';
}

String _requiredIdentity(Map<String, dynamic> json, String field) {
  final value = json[field];
  if (value is! String || value.trim().isEmpty) {
    throw FormatException(
      'Exercise attempt snapshot without $field is unsupported',
    );
  }
  return value;
}

Map<String, List<String>> _asOrderByExercise(Object? value) {
  if (value == null) return const {};
  if (value is! Map) {
    throw const FormatException('orderByExercise must be a map');
  }
  final result = <String, List<String>>{};
  for (final entry in value.entries) {
    final key = entry.key;
    if (key is! String) {
      throw const FormatException('orderByExercise key must be a string');
    }
    final list = entry.value;
    if (list is! List) {
      throw FormatException('orderByExercise["$key"] must be a list');
    }
    final elements = <String>[];
    for (final item in list) {
      if (item is! String) {
        throw FormatException(
          'orderByExercise["$key"] elements must be strings',
        );
      }
      elements.add(item);
    }
    result[key] = elements;
  }
  return result;
}

Map<String, bool> _asResults(Object? value) {
  if (value == null) return const {};
  if (value is! Map) {
    throw const FormatException('results must be a map');
  }
  final result = <String, bool>{};
  for (final entry in value.entries) {
    final key = entry.key;
    if (key is! String) {
      throw const FormatException('results key must be a string');
    }
    final item = entry.value;
    if (item is! bool) {
      throw FormatException('results["$key"] must be a boolean');
    }
    result[key] = item;
  }
  return result;
}

Map<String, Map<String, dynamic>> _asAnswers(Object? value) {
  if (value == null) return const {};
  if (value is! Map) {
    throw const FormatException('answers must be a map');
  }
  final result = <String, Map<String, dynamic>>{};
  for (final entry in value.entries) {
    final key = entry.key;
    if (key is! String) {
      throw const FormatException('answers key must be a string');
    }
    final item = entry.value;
    if (item is! Map) {
      throw FormatException('answers["$key"] must be a map');
    }
    result[key] = Map<String, dynamic>.from(item);
  }
  return result;
}

List<bool> _asSubResults(Object? value) {
  if (value == null) return const [];
  if (value is! List) {
    throw const FormatException('subResults must be a list');
  }
  final result = <bool>[];
  for (final item in value) {
    if (item is! bool) {
      throw const FormatException('subResults elements must be booleans');
    }
    result.add(item);
  }
  return result;
}

Map<String, dynamic>? _asAiGrade(Object? value) {
  if (value == null) return null;
  if (value is! Map) {
    throw const FormatException('aiGrade must be a map');
  }
  for (final key in value.keys) {
    if (key is! String) {
      throw const FormatException('aiGrade key must be a string');
    }
  }
  return Map<String, dynamic>.from(value);
}

class ExerciseAttemptSnapshot {
  const ExerciseAttemptSnapshot({
    required this.userId,
    required this.userTrackId,
    required this.attemptId,
    required this.lessonId,
    required this.currentExerciseIndex,
    required this.orderByExercise,
    required this.results,
    required this.answers,
    required this.startedAt,
    required this.lastUpdatedAt,
    this.subIndex = 0,
    this.subResults = const [],
    this.checked,
    this.aiGrade,
    this.isCompleted = false,
  });
  final String userId;
  final String userTrackId;
  final String attemptId;
  final String lessonId;
  final int currentExerciseIndex;
  final Map<String, List<String>> orderByExercise;
  final Map<String, bool> results;
  final Map<String, Map<String, dynamic>> answers;
  final int subIndex;
  final List<bool> subResults;
  final bool? checked;
  final Map<String, dynamic>? aiGrade;
  final String startedAt;
  final String lastUpdatedAt;
  final bool isCompleted;

  Map<String, dynamic> toJson() => {
    'userId': userId,
    'userTrackId': userTrackId,
    'attemptId': attemptId,
    'lessonId': lessonId,
    'currentExerciseIndex': currentExerciseIndex,
    'orderByExercise': orderByExercise,
    'results': results,
    'answers': answers,
    'subIndex': subIndex,
    'subResults': subResults,
    'checked': checked,
    'aiGrade': aiGrade,
    'startedAt': startedAt,
    'lastUpdatedAt': lastUpdatedAt,
    'isCompleted': isCompleted,
  };

  factory ExerciseAttemptSnapshot.fromJson(Map<String, dynamic> json) {
    final userId = _requiredIdentity(json, 'userId');
    final userTrackId = _requiredIdentity(json, 'userTrackId');
    final attemptId = _requiredIdentity(json, 'attemptId');
    final lessonId = _requiredIdentity(json, 'lessonId');
    final startedAt = _requiredIdentity(json, 'startedAt');
    final lastUpdatedAt = _requiredIdentity(json, 'lastUpdatedAt');
    return ExerciseAttemptSnapshot(
      userId: userId,
      userTrackId: userTrackId,
      attemptId: attemptId,
      lessonId: lessonId,
      currentExerciseIndex: json['currentExerciseIndex'] as int? ?? 0,
      orderByExercise: _asOrderByExercise(json['orderByExercise']),
      results: _asResults(json['results']),
      answers: _asAnswers(json['answers']),
      subIndex: json['subIndex'] as int? ?? 0,
      subResults: _asSubResults(json['subResults']),
      checked: json['checked'] as bool?,
      aiGrade: _asAiGrade(json['aiGrade']),
      startedAt: startedAt,
      lastUpdatedAt: lastUpdatedAt,
      isCompleted: json['isCompleted'] == true,
    );
  }
}

abstract interface class ExerciseAttemptRepository {
  Future<ExerciseAttemptSnapshot?> findByAttemptId(String attemptId);
  Future<ExerciseAttemptSnapshot?> active({
    required String userId,
    required String userTrackId,
    required String lessonId,
  });
  Future<void> save(ExerciseAttemptSnapshot snapshot);
  Future<void> complete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  });
}

class SharedPreferencesExerciseAttemptRepository
    implements ExerciseAttemptRepository {
  static const storageKey = 'novalang_exercise_attempts_v1';
  static Future<void> _sharedTail = Future.value();

  Future<T> _serial<T>(Future<T> Function() action) {
    final next = _sharedTail.then((_) => action());
    _sharedTail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  String _entryKey(String userId, String userTrackId, String lessonId) =>
      '$userId|$userTrackId|$lessonId';

  String _legacyEntryKey(String userId, String lessonId) => '$userId|$lessonId';

  Future<Map<String, ExerciseAttemptSnapshot>> _read({
    String? legacyUserId,
    String? legacyUserTrackId,
    String? legacyLessonId,
  }) async {
    final raw = (await SharedPreferences.getInstance()).getString(storageKey);
    if (raw == null) {
      return {};
    }
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! Map) {
        throw const FormatException(
          'Exercise attempt storage root must be a map',
        );
      }
      final values = <String, ExerciseAttemptSnapshot>{};
      var migratedLegacyEntry = false;
      for (final entry in decoded.entries) {
        final key = '${entry.key}';
        final value = entry.value;
        if (value is! Map) {
          throw FormatException('Exercise attempt entry "$key" must be a map');
        }
        final json = Map<String, dynamic>.from(value);
        final canMigrateLegacyTrack =
            legacyUserId != null &&
            legacyUserTrackId != null &&
            legacyLessonId != null &&
            key == _legacyEntryKey(legacyUserId, legacyLessonId) &&
            json['userId'] == legacyUserId &&
            json['lessonId'] == legacyLessonId &&
            json['userTrackId'] == null;
        if (canMigrateLegacyTrack) {
          final migratedKey = _entryKey(
            legacyUserId,
            legacyUserTrackId,
            legacyLessonId,
          );
          if (decoded.containsKey(migratedKey)) {
            throw FormatException(
              'Legacy exercise attempt collides with scoped entry "$migratedKey"',
            );
          }
          json['userTrackId'] = legacyUserTrackId;
          values[migratedKey] = ExerciseAttemptSnapshot.fromJson(json);
          migratedLegacyEntry = true;
        } else {
          values[key] = ExerciseAttemptSnapshot.fromJson(json);
        }
      }
      if (migratedLegacyEntry) {
        await _write(values);
      }
      return values;
    } on ExerciseAttemptStorageException {
      rethrow;
    } catch (error) {
      throw ExerciseAttemptStorageException(
        'Stored exercise attempts are invalid',
        error,
      );
    }
  }

  Future<void> _write(Map<String, ExerciseAttemptSnapshot> values) async {
    try {
      final written = await (await SharedPreferences.getInstance()).setString(
        storageKey,
        jsonEncode(values.map((key, value) => MapEntry(key, value.toJson()))),
      );
      if (!written) {
        throw const ExerciseAttemptStorageException(
          'Failed to persist exercise attempts',
        );
      }
    } on ExerciseAttemptStorageException {
      rethrow;
    } catch (error) {
      throw ExerciseAttemptStorageException(
        'Failed to persist exercise attempts',
        error,
      );
    }
  }

  @override
  Future<ExerciseAttemptSnapshot?> findByAttemptId(String attemptId) async {
    for (final value in (await _read()).values) {
      if (value.attemptId == attemptId) return value;
    }
    return null;
  }

  @override
  Future<ExerciseAttemptSnapshot?> active({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) => _serial(() async {
    final snapshot = (await _read(
      legacyUserId: userId,
      legacyUserTrackId: userTrackId,
      legacyLessonId: lessonId,
    ))[_entryKey(userId, userTrackId, lessonId)];
    if (snapshot == null) return null;
    return snapshot.isCompleted ? null : snapshot;
  });

  @override
  Future<void> save(ExerciseAttemptSnapshot snapshot) => _serial(() async {
    final values = await _read(
      legacyUserId: snapshot.userId,
      legacyUserTrackId: snapshot.userTrackId,
      legacyLessonId: snapshot.lessonId,
    );
    values[_entryKey(
          snapshot.userId,
          snapshot.userTrackId,
          snapshot.lessonId,
        )] =
        snapshot;
    await _write(values);
  });

  @override
  Future<void> complete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) => _serial(() async {
    final values = await _read(
      legacyUserId: userId,
      legacyUserTrackId: userTrackId,
      legacyLessonId: lessonId,
    );
    final key = _entryKey(userId, userTrackId, lessonId);
    final snapshot = values[key];
    if (snapshot != null) {
      values[key] = ExerciseAttemptSnapshot(
        userId: snapshot.userId,
        userTrackId: snapshot.userTrackId,
        attemptId: snapshot.attemptId,
        lessonId: snapshot.lessonId,
        currentExerciseIndex: snapshot.currentExerciseIndex,
        orderByExercise: snapshot.orderByExercise,
        results: snapshot.results,
        answers: snapshot.answers,
        subIndex: snapshot.subIndex,
        subResults: snapshot.subResults,
        checked: snapshot.checked,
        aiGrade: snapshot.aiGrade,
        startedAt: snapshot.startedAt,
        lastUpdatedAt: DateTime.now().toIso8601String(),
        isCompleted: true,
      );
      await _write(values);
    }
  });
}
