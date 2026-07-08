class LocalizedCopy {
  const LocalizedCopy({required this.en, required this.vi});

  final String en;
  final String vi;

  Map<String, dynamic> toJson() => {'en': en, 'vi': vi};
}

class UserProfile {
  const UserProfile({
    required this.nativeLanguageCode,
    required this.learningLanguageCode,
    required this.dailyGoalMinutes,
    required this.selectedNiches,
    required this.primaryNiche,
    required this.levelCode,
    required this.selectedTrack,
    required this.onboardingComplete,
  });

  final String nativeLanguageCode;
  final String learningLanguageCode;
  final int dailyGoalMinutes;
  final List<String> selectedNiches;
  final String? primaryNiche;
  final String levelCode;
  final String selectedTrack;
  final bool onboardingComplete;

  factory UserProfile.defaults() => const UserProfile(
    nativeLanguageCode: 'en',
    learningLanguageCode: 'ja',
    dailyGoalMinutes: 10,
    selectedNiches: ['jlpt'],
    primaryNiche: 'jlpt',
    levelCode: 'KANA_STARTER',
    selectedTrack: 'JLPT',
    onboardingComplete: false,
  );

  UserProfile copyWith({
    String? nativeLanguageCode,
    String? learningLanguageCode,
    int? dailyGoalMinutes,
    List<String>? selectedNiches,
    String? primaryNiche,
    String? levelCode,
    String? selectedTrack,
    bool? onboardingComplete,
  }) {
    return UserProfile(
      nativeLanguageCode: nativeLanguageCode ?? this.nativeLanguageCode,
      learningLanguageCode: learningLanguageCode ?? this.learningLanguageCode,
      dailyGoalMinutes: dailyGoalMinutes ?? this.dailyGoalMinutes,
      selectedNiches: selectedNiches ?? this.selectedNiches,
      primaryNiche: primaryNiche ?? this.primaryNiche,
      levelCode: levelCode ?? this.levelCode,
      selectedTrack: selectedTrack ?? this.selectedTrack,
      onboardingComplete: onboardingComplete ?? this.onboardingComplete,
    );
  }

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
    nativeLanguageCode: json['nativeLanguageCode'] as String? ?? 'en',
    learningLanguageCode: json['learningLanguageCode'] as String? ?? 'ja',
    dailyGoalMinutes: json['dailyGoalMinutes'] as int? ?? 10,
    selectedNiches: (json['selectedNiches'] as List<dynamic>? ?? const ['jlpt'])
        .cast<String>(),
    primaryNiche: json['primaryNiche'] as String?,
    levelCode: json['levelCode'] as String? ?? 'KANA_STARTER',
    selectedTrack: json['selectedTrack'] as String? ?? 'JLPT',
    onboardingComplete: json['onboardingComplete'] as bool? ?? false,
  );

  Map<String, dynamic> toJson() => {
    'nativeLanguageCode': nativeLanguageCode,
    'learningLanguageCode': learningLanguageCode,
    'dailyGoalMinutes': dailyGoalMinutes,
    'selectedNiches': selectedNiches,
    'primaryNiche': primaryNiche,
    'levelCode': levelCode,
    'selectedTrack': selectedTrack,
    'onboardingComplete': onboardingComplete,
  };
}
