import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/user_profile.dart';
import '../services/local_storage_service.dart';

final localStorageServiceProvider = Provider<LocalStorageService>(
  (ref) => LocalStorageService(),
);

final profileProvider = NotifierProvider<ProfileNotifier, UserProfile>(
  ProfileNotifier.new,
);

class ProfileNotifier extends Notifier<UserProfile> {
  @override
  UserProfile build() => UserProfile.defaults();

  Future<void> load() async {
    state = await ref.read(localStorageServiceProvider).loadProfile();
  }

  Future<void> _commit(UserProfile profile) async {
    state = profile;
    await ref.read(localStorageServiceProvider).saveProfile(profile);
  }

  Future<void> setNativeLanguage(String code) =>
      _commit(state.copyWith(nativeLanguageCode: code, uiLanguageCode: code));
  Future<void> setUserInfo({
    required String displayName,
    String? ageRange,
    String? country,
    String? region,
    String? occupationStatus,
  }) => _commit(
    state.copyWith(
      displayName: displayName,
      ageRange: ageRange,
      country: country,
      region: region,
      occupationStatus: occupationStatus,
    ),
  );
  Future<void> setLearningLanguage(String code) =>
      _commit(state.copyWith(learningLanguageCode: code));
  Future<void> setGoal(int minutes) =>
      _commit(state.copyWith(dailyGoalMinutes: minutes));
  Future<void> setLevel(String levelCode) =>
      _commit(state.copyWith(levelCode: levelCode));
  Future<void> setTrack(String track) =>
      _commit(state.copyWith(selectedTrack: track));

  Future<void> setExamTrack({
    required String trackId,
    String? levelCode,
  }) => _commit(
    state.copyWith(
      selectedTrack: trackId,
      levelCode: levelCode ?? state.levelCode,
    ),
  );

  Future<void> resetSession() async {
    state = UserProfile.defaults();
    await ref.read(localStorageServiceProvider).saveProfile(state);
  }

  Future<void> finishOnboarding() =>
      _commit(state.copyWith(onboardingComplete: true));

  Future<void> setPlacementResult(String levelCode) => _commit(
    state.copyWith(levelCode: levelCode, placementResultLevel: levelCode),
  );

  Future<void> saveLessonStep(String lessonId, int currentStepIndex) {
    final sessions = Map<String, Map<String, dynamic>>.from(
      state.lessonSessions,
    );
    final current = Map<String, dynamic>.from(sessions[lessonId] ?? const {});
    sessions[lessonId] = {
      'lessonId': lessonId,
      'currentStepIndex': currentStepIndex,
      'completedStepIds': current['completedStepIds'] ?? <String>[],
      if (current['completedAt'] != null) 'completedAt': current['completedAt'],
    };
    return _commit(state.copyWith(lessonSessions: sessions));
  }

  Future<bool> completeLessonStep({
    required String lessonId,
    required String stepId,
    required int currentStepIndex,
    required bool lessonComplete,
    int estimatedMinutes = 2,
  }) async {
    final today = DateTime.now().toIso8601String().substring(0, 10);
    final isNewDay = state.lastStudyDate != today;
    final sessions = Map<String, Map<String, dynamic>>.from(
      state.lessonSessions,
    );
    final current = Map<String, dynamic>.from(sessions[lessonId] ?? const {});
    final completed = List<String>.from(
      current['completedStepIds'] as List? ?? const [],
    );
    final isNewStep = !completed.contains(stepId);
    if (isNewStep) completed.add(stepId);
    final minutes =
        (isNewDay ? 0 : state.studyMinutesToday) +
        (isNewStep ? estimatedMinutes : 0);
    final rewarded =
        minutes >= state.dailyGoalMinutes &&
        state.dailyGoalRewardClaimedDate != today;
    sessions[lessonId] = {
      'lessonId': lessonId,
      'currentStepIndex': currentStepIndex,
      'completedStepIds': completed,
      if (lessonComplete) 'completedAt': DateTime.now().toIso8601String(),
    };
    final completedLessons = List<String>.from(state.completedLessonIds);
    if (lessonComplete && !completedLessons.contains(lessonId)) {
      completedLessons.add(lessonId);
    }
    await _commit(
      state.copyWith(
        lessonSessions: sessions,
        completedLessonIds: completedLessons,
        studyMinutesToday: minutes,
        lastStudyDate: today,
        hearts: rewarded
            ? (state.hearts >= 5 ? 5 : state.hearts + 1)
            : state.hearts,
        dailyGoalRewardClaimedDate: rewarded
            ? today
            : state.dailyGoalRewardClaimedDate,
      ),
    );
    return rewarded;
  }

  Future<void> setNiches(
    List<String> selected,
    String? primary, {
    String? decision,
  }) {
    return _commit(
      state.copyWith(
        selectedNiches: selected,
        primaryNiche: primary,
        nicheUpdatedAt: DateTime.now().toIso8601String(),
        levelDecisionAfterNicheChange: decision,
      ),
    );
  }
}
