class Niche {
  const Niche({
    required this.id,
    required this.category,
    required this.categoryVi,
    required this.title,
    required this.titleVi,
    required this.description,
    this.isReady = false,
  });

  final String id;
  final String category;
  final String categoryVi;
  final String title;
  final String titleVi;
  final String description;
  final bool isReady;

  factory Niche.fromSharedJson(
    Map<String, dynamic> json, {
    required String categoryVi,
    required String titleVi,
  }) => Niche(
    id: json['id'] as String,
    category: json['category'] as String,
    categoryVi: categoryVi,
    title: json['title'] as String,
    titleVi: titleVi,
    description: json['description'] as String,
    isReady: json['isReady'] as bool? ?? false,
  );

  String localizedCategory(String languageCode) => switch (languageCode) {
    'vi' => categoryVi,
    'ja' => category,
    _ => category,
  };

  String localizedTitle(String languageCode) => switch (languageCode) {
    'vi' => titleVi,
    'ja' => title,
    _ => title,
  };
}
