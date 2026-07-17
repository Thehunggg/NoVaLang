/// Catalog/navigation-shell models for Learning Track → Professional
/// Category → Professional Domain. These are pure data definitions with no
/// widget or backend dependency, designed so a future backend-backed catalog
/// can replace the local in-memory source in `data/domain_navigation_catalog.dart`
/// without changing stable IDs, routes, or card structure.
library;

enum CatalogAvailability { available, comingSoon }

class LearningTrackDefinition {
  const LearningTrackDefinition({
    required this.stableId,
    required this.nameKey,
    required this.iconToken,
    required this.accentToken,
    required this.availability,
    required this.sortOrder,
  });

  final String stableId;
  final String nameKey;
  final String iconToken;
  final String accentToken;
  final CatalogAvailability availability;
  final int sortOrder;
}

class ProfessionalCategoryDefinition {
  const ProfessionalCategoryDefinition({
    required this.stableId,
    required this.trackId,
    required this.nameKey,
    required this.descriptionKey,
    required this.iconToken,
    required this.accentToken,
    required this.availability,
    required this.sortOrder,
  });

  final String stableId;
  final String trackId;
  final String nameKey;
  final String descriptionKey;
  final String iconToken;
  final String accentToken;
  final CatalogAvailability availability;
  final int sortOrder;
}

class ProfessionalDomainDefinition {
  const ProfessionalDomainDefinition({
    required this.stableId,
    required this.categoryId,
    required this.nameKey,
    required this.iconToken,
    required this.accentToken,
    required this.availability,
    required this.sortOrder,
  });

  final String stableId;
  final String categoryId;
  final String nameKey;
  final String iconToken;
  final String accentToken;
  final CatalogAvailability availability;
  final int sortOrder;
}
