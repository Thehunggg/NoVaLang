class PlacementBand {
  const PlacementBand({
    required this.min,
    required this.max,
    required this.levelCode,
  });

  final int min;
  final int max;
  final String levelCode;

  factory PlacementBand.fromJson(Map<String, dynamic> json) => PlacementBand(
    min: json['min'] as int,
    max: json['max'] as int,
    levelCode: json['levelCode'] as String,
  );
}

class PlacementPolicy {
  const PlacementPolicy({required this.questionCount, required this.bands});

  final int questionCount;
  final List<PlacementBand> bands;

  factory PlacementPolicy.fromJson(Map<String, dynamic> json) => PlacementPolicy(
    questionCount: json['questionCount'] as int,
    bands: (json['bands'] as List<dynamic>)
        .map((item) => PlacementBand.fromJson(item as Map<String, dynamic>))
        .toList(),
  );

  String levelForScore(int score) {
    for (final band in bands) {
      if (score >= band.min && score <= band.max) {
        return band.levelCode;
      }
    }
    return 'A0';
  }
}
