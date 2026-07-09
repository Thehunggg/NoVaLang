import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/user_profile.dart';
import 'mock_auth_service.dart';

class LocalStorageService {
  static const _profilesKey = 'novalang_profiles_v2';
  static const _activeUserIdKey = 'novalang_active_user_id_v2';
  static const _legacyProfileKey = 'novalang_mobile_profile_v1';

  Future<Map<String, UserProfile>> _loadProfileMap() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_profilesKey);
    if (raw != null) {
      try {
        final map = jsonDecode(raw) as Map<String, dynamic>;
        return map.map(
          (key, value) => MapEntry(
            key,
            _normalizeProfile(
              UserProfile.fromJson(Map<String, dynamic>.from(value as Map)),
            ),
          ),
        );
      } catch (_) {
        return {};
      }
    }

    final legacy = prefs.getString(_legacyProfileKey);
    if (legacy == null) return {};

    try {
      final profile = _normalizeProfile(
        UserProfile.fromJson(jsonDecode(legacy) as Map<String, dynamic>),
      );
      final migrated = profile.userId.isEmpty
          ? profile.copyWith(
              userId: MockAuthIds.guest,
              authProvider: profile.authProvider.isEmpty
                  ? 'guest'
                  : profile.authProvider,
            )
          : profile;
      final profiles = {migrated.userId: migrated};
      await _saveProfileMap(profiles);
      await prefs.setString(_activeUserIdKey, migrated.userId);
      return profiles;
    } catch (_) {
      return {};
    }
  }

  Future<void> _saveProfileMap(Map<String, UserProfile> profiles) async {
    final prefs = await SharedPreferences.getInstance();
    final encoded = profiles.map(
      (key, value) => MapEntry(key, value.toJson()),
    );
    await prefs.setString(_profilesKey, jsonEncode(encoded));
  }

  UserProfile _normalizeProfile(UserProfile profile) => profile.copyWith(
    learningLanguageCode: UserProfile.normalizeLearningLanguageCode(
      profile.learningLanguageCode,
    ),
    contentVersion: UserProfile.currentContentVersion,
    userId: profile.userId.isEmpty ? MockAuthIds.guest : profile.userId,
    authProvider: profile.authProvider.isEmpty ? 'guest' : profile.authProvider,
  );

  Future<String?> getActiveUserId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_activeUserIdKey);
  }

  Future<void> setActiveUserId(String userId) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_activeUserIdKey, userId);
  }

  Future<void> clearActiveUser() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_activeUserIdKey);
  }

  /// Clears all local test data (profiles, active user, legacy profile).
  /// Lesson progress and mock auth state live inside profile JSON.
  Future<void> clearAllLocalTestData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_profilesKey);
    await prefs.remove(_activeUserIdKey);
    await prefs.remove(_legacyProfileKey);
  }

  Future<UserProfile?> loadProfileForUser(String userId) async {
    final profiles = await _loadProfileMap();
    return profiles[userId];
  }

  Future<UserProfile> loadProfile() async {
    final profiles = await _loadProfileMap();
    final activeId = await getActiveUserId();
    if (activeId != null && profiles.containsKey(activeId)) {
      return profiles[activeId]!;
    }
    if (profiles.isNotEmpty) {
      final first = profiles.values.first;
      await setActiveUserId(first.userId);
      return first;
    }
    return UserProfile.defaults();
  }

  Future<void> saveProfile(UserProfile profile) async {
    final normalized = _normalizeProfile(profile);
    final profiles = await _loadProfileMap();
    profiles[normalized.userId] = normalized;
    await _saveProfileMap(profiles);
    await setActiveUserId(normalized.userId);
  }
}
