import '../core/utils/localization.dart';
import '../core/utils/native_content.dart';

class Niche {
  const Niche({
    required this.id,
    required this.category,
    required this.categoryVi,
    required this.title,
    required this.titleVi,
    required this.description,
    this.descriptionByLocale = const {},
    this.titleByLocale = const {},
    this.categoryByLocale = const {},
    this.isReady = false,
    this.iconKey = 'chat_bubbles',
    this.branchType = 'niche',
    this.quickSelect = true,
  });

  final String id;
  final String category;
  final String categoryVi;
  final String title;
  final String titleVi;
  final String description;
  final Map<String, String> descriptionByLocale;
  final Map<String, String> titleByLocale;
  final Map<String, String> categoryByLocale;
  final bool isReady;
  final String iconKey;
  final String branchType;
  final bool quickSelect;

  factory Niche.fromSharedJson(
    Map<String, dynamic> json, {
    required String categoryVi,
    required String titleVi,
    Map<String, String> titleByLocale = const {},
    Map<String, String> categoryByLocale = const {},
    Map<String, String> descriptionByLocale = const {},
  }) => Niche(
    id: json['id'] as String,
    category: json['category'] as String,
    categoryVi: categoryVi,
    title: json['title'] as String,
    titleVi: titleVi,
    description: json['description'] as String? ?? '',
    descriptionByLocale: descriptionByLocale,
    titleByLocale: titleByLocale,
    categoryByLocale: categoryByLocale,
    isReady: json['isReady'] as bool? ?? false,
    iconKey: json['iconKey'] as String? ?? 'chat_bubbles',
    branchType: json['branchType'] as String? ?? 'niche',
    quickSelect: json['quickSelect'] as bool? ?? true,
  );

  String localizedCategory(String languageCode) {
    final fromMap = localizedMapText(categoryByLocale, languageCode);
    if (fromMap.isNotEmpty) return fromMap;
    final locale = normalizeNativeLocale(languageCode);
    if (locale == 'vi') return categoryVi;
    if (locale == 'en') return category;
    return missingNativeContentSentinel('niche.$id.category', locale);
  }

  String localizedTitle(String languageCode) {
    final fromMap = localizedMapText(titleByLocale, languageCode);
    if (fromMap.isNotEmpty) return fromMap;
    final locale = normalizeNativeLocale(languageCode);
    if (locale == 'vi') return titleVi;
    if (locale == 'en') return title;
    return missingNativeContentSentinel('niche.$id.title', locale);
  }

  String localizedDescription(String languageCode) {
    final fromMap = localizedMapText(descriptionByLocale, languageCode);
    if (fromMap.isNotEmpty) return fromMap;
    final locale = normalizeNativeLocale(languageCode);
    return locale == 'en'
        ? description
        : missingNativeContentSentinel('niche.$id.description', locale);
  }
}
