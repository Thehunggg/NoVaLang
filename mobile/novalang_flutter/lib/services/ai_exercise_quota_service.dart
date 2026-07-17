import 'package:shared_preferences/shared_preferences.dart';

class AiExerciseQuota {
  const AiExerciseQuota({
    required this.userId,
    required this.localQuotaDate,
    required this.aiSetsUsed,
    this.dailyLimit = 5,
  });

  final String userId;
  final String localQuotaDate;
  final int aiSetsUsed;
  final int dailyLimit;

  int get remaining => (dailyLimit - aiSetsUsed).clamp(0, dailyLimit);
  bool get exhausted => remaining == 0;
}

abstract interface class AiExerciseQuotaStore {
  Future<int> read({required String userId, required String localQuotaDate});
  Future<void> write({
    required String userId,
    required String localQuotaDate,
    required int aiSetsUsed,
  });
}

class SharedPreferencesAiExerciseQuotaStore implements AiExerciseQuotaStore {
  static const _prefix = 'ai_exercise_quota';

  String _key(String userId, String localQuotaDate) =>
      '$_prefix:$userId:$localQuotaDate';

  @override
  Future<int> read({
    required String userId,
    required String localQuotaDate,
  }) async {
    final preferences = await SharedPreferences.getInstance();
    return preferences.getInt(_key(userId, localQuotaDate)) ?? 0;
  }

  @override
  Future<void> write({
    required String userId,
    required String localQuotaDate,
    required int aiSetsUsed,
  }) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setInt(_key(userId, localQuotaDate), aiSetsUsed);
  }
}

class InMemoryAiExerciseQuotaStore implements AiExerciseQuotaStore {
  final Map<String, int> _values = <String, int>{};

  String _key(String userId, String localQuotaDate) =>
      '$userId:$localQuotaDate';

  @override
  Future<int> read({
    required String userId,
    required String localQuotaDate,
  }) async => _values[_key(userId, localQuotaDate)] ?? 0;

  @override
  Future<void> write({
    required String userId,
    required String localQuotaDate,
    required int aiSetsUsed,
  }) async {
    _values[_key(userId, localQuotaDate)] = aiSetsUsed;
  }
}

/// Local/dev quota contract. Production must replace the store with a
/// server-backed account quota implementation.
class AiExerciseQuotaService {
  AiExerciseQuotaService(this._store, {this.dailyLimit = 5});

  final AiExerciseQuotaStore _store;
  final int dailyLimit;

  String localQuotaDate([DateTime? now]) {
    final value = now ?? DateTime.now();
    return '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}';
  }

  Future<AiExerciseQuota> status(String userId, {DateTime? now}) async {
    final date = localQuotaDate(now);
    final used = await _store.read(userId: userId, localQuotaDate: date);
    return AiExerciseQuota(
      userId: userId,
      localQuotaDate: date,
      aiSetsUsed: used,
      dailyLimit: dailyLimit,
    );
  }

  /// Records one set only after a grader has returned a result.
  Future<AiExerciseQuota> recordCompletedSet(
    String userId, {
    DateTime? now,
  }) async {
    final current = await status(userId, now: now);
    if (current.exhausted) return current;
    final updated = current.aiSetsUsed + 1;
    await _store.write(
      userId: current.userId,
      localQuotaDate: current.localQuotaDate,
      aiSetsUsed: updated,
    );
    return AiExerciseQuota(
      userId: current.userId,
      localQuotaDate: current.localQuotaDate,
      aiSetsUsed: updated,
      dailyLimit: dailyLimit,
    );
  }
}
