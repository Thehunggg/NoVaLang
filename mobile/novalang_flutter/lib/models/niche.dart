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

  String localizedCategory(String languageCode) =>
      languageCode == 'vi' ? categoryVi : category;
  String localizedTitle(String languageCode) =>
      languageCode == 'vi' ? titleVi : title;
}
