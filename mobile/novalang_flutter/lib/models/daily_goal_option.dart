class DailyGoalOption {
  const DailyGoalOption({required this.minutes, required this.nameKey});

  final int minutes;
  final String nameKey;

  factory DailyGoalOption.fromJson(Map<String, dynamic> json) =>
      DailyGoalOption(
        minutes: json['minutes'] as int,
        nameKey: json['nameKey'] as String,
      );
}
