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
      _commit(state.copyWith(nativeLanguageCode: code));
  Future<void> setLearningLanguage(String code) =>
      _commit(state.copyWith(learningLanguageCode: code));
  Future<void> setGoal(int minutes) =>
      _commit(state.copyWith(dailyGoalMinutes: minutes));
  Future<void> setLevel(String levelCode) =>
      _commit(state.copyWith(levelCode: levelCode));
  Future<void> setTrack(String track) =>
      _commit(state.copyWith(selectedTrack: track));
  Future<void> finishOnboarding() =>
      _commit(state.copyWith(onboardingComplete: true));

  Future<void> setNiches(List<String> selected, String? primary) {
    return _commit(
      state.copyWith(selectedNiches: selected, primaryNiche: primary),
    );
  }
}
