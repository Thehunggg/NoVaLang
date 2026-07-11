import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/user_profile.dart';
import '../services/local_storage_service.dart';
import '../services/mock_auth_service.dart';

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
  Future<void> setLearningLanguage(String code) => _commit(
    state.copyWith(
      learningLanguageCode: UserProfile.normalizeLearningLanguageCode(code),
    ),
  );
  Future<void> setGoal(int minutes) =>
      _commit(state.copyWith(dailyGoalMinutes: minutes));
  Future<void> setLevel(String levelCode) => _commit(
    state.copyWith(
      levelCode: levelCode,
      coreFoundationSkipped: levelCode != 'A0'
          ? true
          : state.coreFoundationSkipped,
      coreFoundationCompleted: levelCode != 'A0'
          ? true
          : state.coreFoundationCompleted,
    ),
  );
  Future<void> setTrack(String track) =>
      _commit(state.copyWith(selectedTrack: track));

  Future<void> setExamTrack({required String trackId, String? levelCode}) =>
      _commit(
        state.copyWith(
          selectedTrack: trackId,
          levelCode: levelCode ?? state.levelCode,
          coreFoundationSkipped: (levelCode ?? state.levelCode) != 'A0'
              ? true
              : state.coreFoundationSkipped,
          coreFoundationCompleted: (levelCode ?? state.levelCode) != 'A0'
              ? true
              : state.coreFoundationCompleted,
        ),
      );

  Future<void> resetSession() async {
    final fresh = _templateForCurrentUser();
    await _commit(fresh);
  }

  /// Signs out without deleting saved profiles for mock users.
  Future<void> signOut() async {
    state = UserProfile.defaults();
    await ref.read(localStorageServiceProvider).clearActiveUser();
  }

  /// Debug-only: wipe all local profiles and progress, then return to auth.
  Future<void> resetLocalTestData() async {
    await ref.read(localStorageServiceProvider).clearAllLocalTestData();
    state = UserProfile.defaults();
  }

  /// Mock auth is for local development only. Replace with Supabase Auth before production.
  Future<void> signInGuest() =>
      _signInWithTemplate(MockAuthService.guestTemplate());

  Future<void> signInGoogleMock() =>
      _signInWithTemplate(MockAuthService.googleTemplate());

  Future<void> signInFacebookMock() =>
      _signInWithTemplate(MockAuthService.facebookTemplate());

  Future<void> signInEmailMock(String email) =>
      _signInWithTemplate(MockAuthService.emailTemplate(email));

  Future<void> _signInWithTemplate(UserProfile template) async {
    final storage = ref.read(localStorageServiceProvider);
    final existing = await storage.loadProfileForUser(template.userId);
    final profile = existing ?? template;
    await _commit(profile);
  }

  UserProfile _templateForCurrentUser() => switch (state.authProvider) {
    'google_mock' => MockAuthService.googleTemplate(),
    'facebook_mock' => MockAuthService.facebookTemplate(),
    'email_mock' => MockAuthService.emailTemplate(
      state.email ?? MockAuthService.defaultEmail,
    ),
    _ => MockAuthService.guestTemplate(),
  };

  Future<void> finishOnboarding() =>
      _commit(state.copyWith(onboardingComplete: true));

  Future<void> setPlacementResult(String levelCode) => _commit(
    state.copyWith(
      levelCode: levelCode,
      placementResultLevel: levelCode,
      coreFoundationSkipped: levelCode != 'A0'
          ? true
          : state.coreFoundationSkipped,
      coreFoundationCompleted: levelCode != 'A0'
          ? true
          : state.coreFoundationCompleted,
    ),
  );

  Future<void> completeCoreFoundation() =>
      _commit(state.copyWith(coreFoundationCompleted: true));

  Future<void> skipCoreFoundation() =>
      _commit(state.copyWith(coreFoundationSkipped: true));

  Future<void> saveLessonStep(String lessonId, int currentStepIndex) {
    final sessions = Map<String, Map<String, dynamic>>.from(
      state.lessonSessions,
    );
    final current = Map<String, dynamic>.from(sessions[lessonId] ?? const {});
    sessions[lessonId] = {
      'lessonId': lessonId,
      'currentStepIndex': currentStepIndex,
      'completedStepIds': current['completedStepIds'] ?? <String>[],
      'introCompleted': current['introCompleted'] == true,
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
      'introCompleted': stepId == 'intro' || current['introCompleted'] == true,
      if (lessonComplete) 'completedAt': DateTime.now().toIso8601String(),
    };
    final completedLessons = List<String>.from(state.completedLessonIds);
    if (lessonComplete && !completedLessons.contains(lessonId)) {
      completedLessons.add(lessonId);
    }
    final foundationDone =
        state.coreFoundationCompleted ||
        (completedLessons.contains('ja-hiragana-u1-l10') &&
            completedLessons.contains('ja-katakana-u4-l10')) ||
        completedLessons.contains('en-alphabet-u1-l6');
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
        coreFoundationCompleted: foundationDone,
      ),
    );
    return rewarded;
  }

  Future<void> setNiches(
    List<String> selected,
    String? primary, {
    String? decision,
  }) {
    final capped = selected
        .take(UserProfile.maxActiveTracks)
        .toList(growable: false);
    final activeTracks = List<String>.from(capped);
    final currentTrack = (primary != null && activeTracks.contains(primary))
        ? primary
        : (activeTracks.isNotEmpty ? activeTracks.first : 'daily_life');
    return _commit(
      state.copyWith(
        selectedNiches: capped,
        primaryNiche: primary != null && activeTracks.contains(primary)
            ? primary
            : (activeTracks.isNotEmpty ? activeTracks.first : primary),
        activeTracks: activeTracks,
        currentTrack: currentTrack,
        nicheUpdatedAt: DateTime.now().toIso8601String(),
        levelDecisionAfterNicheChange: decision,
      ),
    );
  }

  Future<void> setCurrentTrack(String trackId) {
    final tracks = state.effectiveActiveTracks;
    if (tracks.isNotEmpty && !tracks.contains(trackId)) {
      return Future.value();
    }
    return _commit(state.copyWith(currentTrack: trackId));
  }
}
