class ExamTrack {
  const ExamTrack({
    required this.id,
    required this.language,
    required this.title,
    required this.description,
    required this.trackType,
    this.examTrack,
    this.examLevel,
    this.levelId,
    this.comingSoon = false,
  });

  final String id;
  final String language;
  final String title;
  final String description;
  final String trackType;
  final String? examTrack;
  final String? examLevel;
  final String? levelId;
  final bool comingSoon;

  factory ExamTrack.fromJson(Map<String, dynamic> json) => ExamTrack(
    id: json['id'] as String,
    language: json['language'] as String,
    title: json['title'] as String,
    description: json['description'] as String,
    trackType: json['trackType'] as String,
    examTrack: json['examTrack'] as String?,
    examLevel: json['examLevel'] as String?,
    levelId: json['levelId'] as String?,
    comingSoon: json['comingSoon'] as bool? ?? false,
  );

  bool get isAvailable => !comingSoon;
}
