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
    required this.hearts,
    required this.studyMinutesToday,
    required this.lastStudyDate,
    required this.dailyGoalRewardClaimedDate,
    required this.placementResultLevel,
    required this.coreFoundationCompleted,
    required this.coreFoundationSkipped,
    required this.completedLessonIds,
    required this.lessonSessions,
    required this.userId,
    required this.authProvider,
    this.email,
  });

  static const currentContentVersion = 'cross-platform-onboarding-v5';

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
  final int hearts;
  final int studyMinutesToday;
  final String? lastStudyDate;
  final String? dailyGoalRewardClaimedDate;
  final String? placementResultLevel;
  final bool coreFoundationCompleted;
  final bool coreFoundationSkipped;
  final List<String> completedLessonIds;
  final Map<String, Map<String, dynamic>> lessonSessions;
  final String userId;
  final String authProvider;
  final String? email;

  /// Absolute beginners (A0 / low placement) must finish or skip Core Foundation
  /// before niche lessons such as Daily Life greetings.
  bool get needsCoreFoundation {
    if (coreFoundationCompleted || coreFoundationSkipped) return false;
    return levelCode == 'A0';
  }

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
    selectedNiches: ['daily_life'],
    primaryNiche: 'daily_life',
    levelCode: 'A0',
    selectedTrack: 'ja-kana-starter',
    nicheUpdatedAt: null,
    levelDecisionAfterNicheChange: null,
    onboardingComplete: false,
    hearts: 5,
    studyMinutesToday: 0,
    lastStudyDate: null,
    dailyGoalRewardClaimedDate: null,
    placementResultLevel: null,
    coreFoundationCompleted: false,
    coreFoundationSkipped: false,
    completedLessonIds: [],
    lessonSessions: {},
    userId: 'mock_guest_user',
    authProvider: 'guest',
    email: null,
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
    int? hearts,
    int? studyMinutesToday,
    String? lastStudyDate,
    String? dailyGoalRewardClaimedDate,
    String? placementResultLevel,
    bool? coreFoundationCompleted,
    bool? coreFoundationSkipped,
    List<String>? completedLessonIds,
    Map<String, Map<String, dynamic>>? lessonSessions,
    String? userId,
    String? authProvider,
    String? email,
  }) => UserProfile(
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
    hearts: hearts ?? this.hearts,
    studyMinutesToday: studyMinutesToday ?? this.studyMinutesToday,
    lastStudyDate: lastStudyDate ?? this.lastStudyDate,
    dailyGoalRewardClaimedDate:
        dailyGoalRewardClaimedDate ?? this.dailyGoalRewardClaimedDate,
    placementResultLevel: placementResultLevel ?? this.placementResultLevel,
    coreFoundationCompleted:
        coreFoundationCompleted ?? this.coreFoundationCompleted,
    coreFoundationSkipped: coreFoundationSkipped ?? this.coreFoundationSkipped,
    completedLessonIds: completedLessonIds ?? this.completedLessonIds,
    lessonSessions: lessonSessions ?? this.lessonSessions,
    userId: userId ?? this.userId,
    authProvider: authProvider ?? this.authProvider,
    email: email ?? this.email,
  );

  static String normalizeLearningLanguageCode(String? raw) {
    final trimmed = (raw ?? '').trim();
    if (trimmed.isEmpty) return 'ja';

    final lower = trimmed.toLowerCase();
    return switch (lower) {
      'ja' || 'japanese' || 'jp' || 'nihongo' || 'nihon' || '日本語' || '日本' => 'ja',
      'en' || 'english' || 'eng' => 'en',
      'vi' || 'vietnamese' || 'vietnam' => 'vi',
      'es' || 'spanish' || 'espanol' || 'español' => 'es',
      _ when trimmed.length <= 3 => lower,
      _ => trimmed,
    };
  }

  static String? _readLearningLanguageRaw(Map<String, dynamic> json) {
    final direct = json['learningLanguageCode'];
    if (direct is String && direct.trim().isNotEmpty) return direct;

    final legacy = json['learningLanguage'];
    if (legacy is String && legacy.trim().isNotEmpty) return legacy;
    if (legacy is Map) {
      final code = legacy['code'];
      if (code is String && code.trim().isNotEmpty) return code;
    }

    final selected = json['selectedLanguage'];
    if (selected is String && selected.trim().isNotEmpty) return selected;

    return null;
  }

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    final rawSessions =
        json['lessonSessions'] as Map<String, dynamic>? ?? const {};
    return UserProfile(
      contentVersion:
          json['contentVersion'] as String? ?? currentContentVersion,
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
      learningLanguageCode: normalizeLearningLanguageCode(
        _readLearningLanguageRaw(json),
      ),
      dailyGoalMinutes: json['dailyGoalMinutes'] as int? ?? 10,
      selectedNiches: _normalizeNicheList(
        (json['selectedNiches'] as List<dynamic>? ?? const ['daily_life'])
            .cast<String>(),
      ),
      primaryNiche: _normalizeNicheId(json['primaryNiche'] as String?),
      levelCode: _normalizeLevel(json['levelCode'] as String?),
      selectedTrack: json['selectedTrack'] as String? ?? 'ja-kana-starter',
      nicheUpdatedAt: json['nicheUpdatedAt'] as String?,
      levelDecisionAfterNicheChange:
          json['levelDecisionAfterNicheChange'] as String?,
      onboardingComplete: json['onboardingComplete'] as bool? ?? false,
      hearts: json['hearts'] as int? ?? 5,
      studyMinutesToday: json['studyMinutesToday'] as int? ?? 0,
      lastStudyDate: json['lastStudyDate'] as String?,
      dailyGoalRewardClaimedDate: json['dailyGoalRewardClaimedDate'] as String?,
      placementResultLevel: json['placementResultLevel'] as String?,
      coreFoundationCompleted:
          json['coreFoundationCompleted'] as bool? ?? false,
      coreFoundationSkipped: json['coreFoundationSkipped'] as bool? ?? false,
      completedLessonIds:
          (json['completedLessonIds'] as List<dynamic>? ?? const [])
              .cast<String>(),
      lessonSessions: rawSessions.map(
        (key, value) => MapEntry(key, Map<String, dynamic>.from(value as Map)),
      ),
      userId: json['userId'] as String? ?? '',
      authProvider: json['authProvider'] as String? ?? 'guest',
      email: json['email'] as String?,
    );
  }

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
    'hearts': hearts,
    'studyMinutesToday': studyMinutesToday,
    'lastStudyDate': lastStudyDate,
    'dailyGoalRewardClaimedDate': dailyGoalRewardClaimedDate,
    'placementResultLevel': placementResultLevel,
    'coreFoundationCompleted': coreFoundationCompleted,
    'coreFoundationSkipped': coreFoundationSkipped,
    'completedLessonIds': completedLessonIds,
    'lessonSessions': lessonSessions,
    'userId': userId,
    'authProvider': authProvider,
    if (email != null) 'email': email,
  };

  static String _normalizeLevel(String? value) => switch (value) {
    'KANA_STARTER' => 'A0',
    'JLPT_N5' => 'A1_2',
    'JLPT_N4' => 'A2_2',
    'JLPT_N3' => 'B1_2',
    'JLPT_N2' || 'JLPT_N1' => 'B2',
    'A0' ||
    'A1_1' ||
    'A1_2' ||
    'A2_1' ||
    'A2_2' ||
    'B1_1' ||
    'B1_2' ||
    'B2' => value!,
    _ => 'A0',
  };

  /// Maps legacy niche IDs from older profiles onto the shared niche catalog.
  static const nicheLegacyIdMap = <String, String>{
    'everyday': 'daily_life',
    'travel': 'travel_hotel',
    'shopping': 'restaurant_food_service',
    'culture': 'daily_life',
    'social': 'daily_life',
    'jlpt': 'daily_life',
    'toeic': 'daily_life',
    'ielts': 'daily_life',
    'toefl': 'daily_life',
    'other_exams': 'daily_life',
    'business': 'business_office',
    'it': 'it_programming',
    'engineering': 'manufacturing_engineering',
    'ai_data': 'ai_data_analytics',
    'healthcare': 'healthcare',
  };

  static String _normalizeNicheId(String? raw) {
    if (raw == null || raw.trim().isEmpty) return 'daily_life';
    return nicheLegacyIdMap[raw] ?? raw;
  }

  static List<String> _normalizeNicheList(List<String> raw) {
    final mapped = raw.map(_normalizeNicheId).toSet().toList(growable: false);
    return mapped.isEmpty ? const ['daily_life'] : mapped;
  }
}
