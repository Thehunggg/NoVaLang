class LocalizedCopy {
  const LocalizedCopy({required this.en, required this.vi});

  final String en;
  final String vi;

  Map<String, dynamic> toJson() => {'en': en, 'vi': vi};
}

class UserProfile {
  const UserProfile({
    required this.contentVersion,
    required this.displayName,
    required this.ageRange,
    required this.country,
    required this.region,
    required this.occupationStatus,
    required this.nativeLanguageCode,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
    required this.dailyGoalMinutes,
    required this.selectedNiches,
    required this.primaryNiche,
    required this.levelCode,
    required this.selectedTrack,
    required this.nicheUpdatedAt,
    required this.levelDecisionAfterNicheChange,
    required this.onboardingComplete,
  });

  static const currentContentVersion = 'template-engine-profile-i18n-v3';

  final String contentVersion;
  final String displayName;
  final String ageRange;
  final String country;
  final String region;
  final String occupationStatus;
  final String nativeLanguageCode;
  final String uiLanguageCode;
  final String learningLanguageCode;
  final int dailyGoalMinutes;
  final List<String> selectedNiches;
  final String? primaryNiche;
  final String levelCode;
  final String selectedTrack;
  final String? nicheUpdatedAt;
  final String? levelDecisionAfterNicheChange;
  final bool onboardingComplete;

  factory UserProfile.defaults() => const UserProfile(
    contentVersion: currentContentVersion,
    displayName: '',
    ageRange: '',
    country: '',
    region: '',
    occupationStatus: '',
    nativeLanguageCode: 'en',
    uiLanguageCode: 'en',
    learningLanguageCode: 'ja',
    dailyGoalMinutes: 10,
    selectedNiches: ['jlpt'],
    primaryNiche: 'jlpt',
    levelCode: 'KANA_STARTER',
    selectedTrack: 'JLPT',
    nicheUpdatedAt: null,
    levelDecisionAfterNicheChange: null,
    onboardingComplete: false,
  );

  UserProfile copyWith({
    String? contentVersion,
    String? displayName,
    String? ageRange,
    String? country,
    String? region,
    String? occupationStatus,
    String? nativeLanguageCode,
    String? uiLanguageCode,
    String? learningLanguageCode,
    int? dailyGoalMinutes,
    List<String>? selectedNiches,
    String? primaryNiche,
    String? levelCode,
    String? selectedTrack,
    String? nicheUpdatedAt,
    String? levelDecisionAfterNicheChange,
    bool? onboardingComplete,
  }) {
    return UserProfile(
      contentVersion: contentVersion ?? this.contentVersion,
      displayName: displayName ?? this.displayName,
      ageRange: ageRange ?? this.ageRange,
      country: country ?? this.country,
      region: region ?? this.region,
      occupationStatus: occupationStatus ?? this.occupationStatus,
      nativeLanguageCode: nativeLanguageCode ?? this.nativeLanguageCode,
      uiLanguageCode: uiLanguageCode ?? this.uiLanguageCode,
      learningLanguageCode: learningLanguageCode ?? this.learningLanguageCode,
      dailyGoalMinutes: dailyGoalMinutes ?? this.dailyGoalMinutes,
      selectedNiches: selectedNiches ?? this.selectedNiches,
      primaryNiche: primaryNiche ?? this.primaryNiche,
      levelCode: levelCode ?? this.levelCode,
      selectedTrack: selectedTrack ?? this.selectedTrack,
      nicheUpdatedAt: nicheUpdatedAt ?? this.nicheUpdatedAt,
      levelDecisionAfterNicheChange:
          levelDecisionAfterNicheChange ?? this.levelDecisionAfterNicheChange,
      onboardingComplete: onboardingComplete ?? this.onboardingComplete,
    );
  }

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
    contentVersion: json['contentVersion'] as String? ?? currentContentVersion,
    displayName: json['displayName'] as String? ?? '',
    ageRange: json['ageRange'] as String? ?? '',
    country: json['country'] as String? ?? '',
    region: json['region'] as String? ?? '',
    occupationStatus: json['occupationStatus'] as String? ?? '',
    nativeLanguageCode: json['nativeLanguageCode'] as String? ?? 'en',
    uiLanguageCode:
        json['uiLanguageCode'] as String? ??
        json['nativeLanguageCode'] as String? ??
        'en',
    learningLanguageCode: json['learningLanguageCode'] as String? ?? 'ja',
    dailyGoalMinutes: json['dailyGoalMinutes'] as int? ?? 10,
    selectedNiches: (json['selectedNiches'] as List<dynamic>? ?? const ['jlpt'])
        .cast<String>(),
    primaryNiche: json['primaryNiche'] as String?,
    levelCode: json['levelCode'] as String? ?? 'KANA_STARTER',
    selectedTrack: json['selectedTrack'] as String? ?? 'JLPT',
    nicheUpdatedAt: json['nicheUpdatedAt'] as String?,
    levelDecisionAfterNicheChange:
        json['levelDecisionAfterNicheChange'] as String?,
    onboardingComplete: json['onboardingComplete'] as bool? ?? false,
  );

  Map<String, dynamic> toJson() => {
    'contentVersion': contentVersion,
    'displayName': displayName,
    'ageRange': ageRange,
    'country': country,
    'region': region,
    'occupationStatus': occupationStatus,
    'nativeLanguageCode': nativeLanguageCode,
    'uiLanguageCode': uiLanguageCode,
    'learningLanguageCode': learningLanguageCode,
    'dailyGoalMinutes': dailyGoalMinutes,
    'selectedNiches': selectedNiches,
    'primaryNiche': primaryNiche,
    'levelCode': levelCode,
    'selectedTrack': selectedTrack,
    'nicheUpdatedAt': nicheUpdatedAt,
    'levelDecisionAfterNicheChange': levelDecisionAfterNicheChange,
    'onboardingComplete': onboardingComplete,
  };
}
