class DailyGoalOption {
  const DailyGoalOption({required this.minutes, required this.nameEn, required this.nameVi});

  final int minutes;
  final String nameEn;
  final String nameVi;

  factory DailyGoalOption.fromJson(Map<String, dynamic> json) {
    final name = json['name'] as Map<String, dynamic>;
    return DailyGoalOption(
      minutes: json['minutes'] as int,
      nameEn: name['en'] as String,
      nameVi: name['vi'] as String,
    );
  }

  String localizedName(String languageCode) =>
      languageCode == 'vi' ? nameVi : nameEn;
}
