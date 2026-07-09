import '../services/mock_auth_service.dart';

/// Auth provider entry from shared/config/auth_providers.json.
/// Source of truth: shared/config/auth_providers.json
class AuthProviderOption {
  const AuthProviderOption({
    required this.id,
    required this.labelEn,
    required this.labelVi,
    required this.implemented,
  });

  final String id;
  final String labelEn;
  final String labelVi;

  /// Whether the provider is marked implemented in shared config.
  /// Flutter login flow may still treat only [isGuest] as active for now.
  final bool implemented;

  factory AuthProviderOption.fromJson(Map<String, dynamic> json) {
    final label = json['label'] as Map<String, dynamic>;
    return AuthProviderOption(
      id: json['id'] as String,
      labelEn: label['en'] as String,
      labelVi: label['vi'] as String,
      implemented: json['implemented'] as bool? ?? false,
    );
  }

  String localizedLabel(String languageCode) =>
      languageCode == 'vi' ? labelVi : labelEn;

  bool get isGuest => id == 'guest';

  bool get supportsMockLogin => MockAuthService.isMockableProvider(id);
}
