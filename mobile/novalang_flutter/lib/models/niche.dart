class Niche {
  const Niche({
    required this.id,
    required this.category,
    required this.title,
    required this.description,
    this.isReady = false,
  });

  final String id;
  final String category;
  final String title;
  final String description;
  final bool isReady;
}
