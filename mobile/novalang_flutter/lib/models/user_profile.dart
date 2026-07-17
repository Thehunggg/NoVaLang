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
    required this.activeTracks,
    required this.currentTrack,
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

  static const currentContentVersion = 'cross-platform-onboarding-v6';
  static const maxActiveTracks = 2;
  static const ambiguousLegacyNicheIds = <String>{
    'environment_energy_agriculture',
    // NOVALANG-DOMAIN-TAXONOMY-RESTRUCTURE-01: finance_accounting_audit was
    // split into finance + accounting_audit; the old combined legacy id has
    // no single unambiguous forward target.
    'finance_accounting',
  };

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
  final List<String> activeTracks;
  final String? currentTrack;
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

  /// Prefer stored activeTracks; fall back to selectedNiches (max 2).
  List<String> get effectiveActiveTracks {
    if (activeTracks.isNotEmpty) {
      return activeTracks.take(maxActiveTracks).toList(growable: false);
    }
    return selectedNiches.take(maxActiveTracks).toList(growable: false);
  }

  /// Current Learn-screen track, constrained to effectiveActiveTracks when possible.
  String get effectiveCurrentTrack {
    final tracks = effectiveActiveTracks;
    final current = currentTrack;
    if (current != null &&
        current.isNotEmpty &&
        (tracks.isEmpty || tracks.contains(current))) {
      return current;
    }
    final primary = primaryNiche;
    if (primary != null &&
        primary.isNotEmpty &&
        (tracks.isEmpty || tracks.contains(primary))) {
      return primary;
    }
    return tracks.isNotEmpty ? tracks.first : 'daily_life';
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
    activeTracks: ['daily_life'],
    currentTrack: 'daily_life',
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
    List<String>? activeTracks,
    String? currentTrack,
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
    activeTracks: activeTracks ?? this.activeTracks,
    currentTrack: currentTrack ?? this.currentTrack,
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
      'ja' ||
      'japanese' ||
      'jp' ||
      'nihongo' ||
      'nihon' ||
      '日本語' ||
      '日本' => 'ja',
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
    final selectedNiches = _normalizeNicheList(
      (json['selectedNiches'] as List<dynamic>? ?? const ['daily_life'])
          .cast<String>(),
    );
    final primaryNiche = _normalizeNicheId(json['primaryNiche'] as String?);
    final activeTracks = _normalizeTrackList(
      (json['activeTracks'] as List<dynamic>?)?.cast<String>() ??
          selectedNiches.take(maxActiveTracks).toList(growable: false),
    );
    final currentTrack = _normalizeTrackId(
      (json['currentTrack'] as String?) ?? primaryNiche,
    );

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
      selectedNiches: selectedNiches,
      primaryNiche: primaryNiche,
      activeTracks: activeTracks,
      currentTrack: currentTrack,
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
    'activeTracks': activeTracks,
    'currentTrack': currentTrack,
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

  /// Maps legacy niche / exam track IDs onto the shared curriculum niche catalog.
  /// Includes exam_* aliases from shared/config/profile_schema.json.
  static const nicheLegacyIdMap = <String, String>{
    'everyday': 'daily_life',
    'travel': 'daily_life',
    'travel_hotel': 'daily_life',
    'shopping': 'daily_life',
    'restaurant_food_service': 'daily_life',
    'culture': 'daily_life',
    'social': 'daily_life',
    'jlpt': 'exam_preparation',
    'toeic': 'exam_preparation',
    'ielts': 'exam_preparation',
    'toefl': 'exam_preparation',
    'topik': 'exam_preparation',
    'hsk': 'exam_preparation',
    'other_exams': 'exam_preparation',
    'exam': 'exam_preparation',
    'exam_jlpt': 'exam_preparation',
    'exam_jft_basic': 'exam_preparation',
    'exam_bjt': 'exam_preparation',
    'exam_ielts': 'exam_preparation',
    'exam_toeic': 'exam_preparation',
    'exam_toefl': 'exam_preparation',
    'exam_eiken': 'exam_preparation',
    'exam_topik': 'exam_preparation',
    'exam_hsk': 'exam_preparation',
    'exam_delf': 'exam_preparation',
    'exam_dalf': 'exam_preparation',
    'exam_goethe': 'exam_preparation',
    'exam_testdaf': 'exam_preparation',
    'exam_telc': 'exam_preparation',
    'exam_dele': 'exam_preparation',
    'exam_siele': 'exam_preparation',
    'business': 'office_administration',
    'it': 'it_software',
    'engineering': 'manufacturing_engineering',
    'ai_data': 'ai_data_analytics',
    'healthcare': 'clinical_healthcare',
    // NOVALANG-LEARNING-FOCUS-INTEGRATION-FIX-01: the 12 legacy career niche
    // IDs were replaced by the 6-category / 25-domain professional catalog.
    // Map any persisted old selection forward to its new equivalent so it
    // still renders as selected (non-destructive; no data loss).
    'it_programming': 'it_software',
    'business_office': 'office_administration',
    'logistics_delivery': 'logistics_supply_chain',
    'marketing_content_creation': 'marketing_communications_content',
    // finance_accounting intentionally NOT mapped here — see
    // ambiguousLegacyNicheIds (finance_accounting_audit was split into
    // finance + accounting_audit; no single unambiguous forward target).
  };

  /// Curriculum niche id for a study track (maps exam_* → exam_preparation).
  static String resolveCurriculumNicheId(String? trackId) {
    if (trackId == null || trackId.trim().isEmpty) return 'daily_life';
    return nicheLegacyIdMap[trackId] ?? trackId;
  }

  static String _normalizeNicheId(String? raw) {
    if (raw == null || raw.trim().isEmpty) return 'daily_life';
    return nicheLegacyIdMap[raw] ?? raw;
  }

  static List<String> _normalizeNicheList(List<String> raw) {
    final mapped = raw.map(_normalizeNicheId).toSet().toList(growable: false);
    return mapped.isEmpty ? const ['daily_life'] : mapped;
  }

  /// Keep exam_* ids for display; map other legacy ids via nicheLegacyIdMap.
  static String _normalizeTrackId(String? raw) {
    if (raw == null || raw.trim().isEmpty) return 'daily_life';
    final id = raw.trim();
    if (id.startsWith('exam_')) return id;
    return nicheLegacyIdMap[id] ?? id;
  }

  static List<String> _normalizeTrackList(List<String> raw) {
    final seen = <String>{};
    final out = <String>[];
    for (final item in raw) {
      final id = _normalizeTrackId(item);
      if (seen.add(id)) out.add(id);
      if (out.length >= maxActiveTracks) break;
    }
    return out.isEmpty ? const ['daily_life'] : out;
  }
}
