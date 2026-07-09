import 'package:flutter/foundation.dart';

import '../models/user_profile.dart';

/// Mock auth identifiers for local development profiles.
class MockAuthIds {
  static const guest = 'mock_guest_user';
  static const google = 'mock_google_user';
  static const facebook = 'mock_facebook_user';

  static String emailUserId(String email) {
    final normalized = email.trim().toLowerCase();
    final safe = normalized
        .replaceAll('@', '_at_')
        .replaceAll('.', '_')
        .replaceAll(RegExp(r'[^a-z0-9_]+'), '_');
    return 'mock_email_$safe';
  }
}

/// Mock auth is for local development only. Replace with Supabase Auth before production.
class MockAuthService {
  MockAuthService._();

  /// Enabled in debug builds only until real Supabase OAuth ships.
  static bool get enabled => kDebugMode;

  static const defaultEmail = 'demo@novalang.local';

  static UserProfile guestTemplate() => UserProfile.defaults().copyWith(
    userId: MockAuthIds.guest,
    authProvider: 'guest',
  );

  static UserProfile googleTemplate() => UserProfile.defaults().copyWith(
    userId: MockAuthIds.google,
    authProvider: 'google_mock',
    displayName: 'Google Demo User',
    email: 'demo.google@novalang.local',
  );

  static UserProfile facebookTemplate() => UserProfile.defaults().copyWith(
    userId: MockAuthIds.facebook,
    authProvider: 'facebook_mock',
    displayName: 'Facebook Demo User',
    email: 'demo.facebook@novalang.local',
  );

  static UserProfile emailTemplate(String email) {
    final resolved = email.trim().isEmpty ? defaultEmail : email.trim();
    return UserProfile.defaults().copyWith(
      userId: MockAuthIds.emailUserId(resolved),
      authProvider: 'email_mock',
      displayName: resolved.split('@').first,
      email: resolved,
    );
  }

  static bool isMockableProvider(String providerId) =>
      providerId == 'google' || providerId == 'facebook' || providerId == 'email';
}
