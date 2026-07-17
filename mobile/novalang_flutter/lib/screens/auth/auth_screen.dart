import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
import '../../core/platform/app_platform.dart';
import '../../core/utils/localization.dart';
import '../../models/auth_provider_option.dart';
import '../../services/mock_auth_service.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/nova_mascot.dart';
import '../../widgets/common/responsive_page.dart';

class AuthScreen extends ConsumerWidget {
  const AuthScreen({super.key});

  static IconData _iconFor(String id) => switch (id) {
    'google' => Icons.alternate_email,
    'facebook' => Icons.groups_outlined,
    'instagram' => Icons.camera_alt_outlined,
    'apple' => Icons.apple,
    'email' => Icons.mail_outline,
    'guest' => Icons.person_outline,
    _ => Icons.login,
  };

  static List<AuthProviderOption> _visibleProviders(
    List<AuthProviderOption> providers,
  ) =>
      providers
          .where(
            (provider) =>
                provider.id != 'apple' || AppPlatform.supportsAppleSignIn,
          )
          .toList(growable: false);

  static void _redirectAfterAuth(BuildContext context, WidgetRef ref) {
    final profile = ref.read(profileProvider);
    if (!context.mounted) return;
    context.go(profile.onboardingComplete ? '/learn' : '/onboarding/native');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(profileProvider).uiLanguageCode;
    final providersAsync = ref.watch(authProvidersProvider);

    void showLater() => ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(L10n.text('providerLater', locale))),
    );

    Future<void> handleProvider(AuthProviderOption provider) async {
      if (provider.isGuest) {
        await ref.read(profileProvider.notifier).signInGuest();
        if (!context.mounted) return;
        _redirectAfterAuth(context, ref);
        return;
      }

      if (!MockAuthService.enabled || !provider.supportsMockLogin) {
        showLater();
        return;
      }

      switch (provider.id) {
        case 'google':
          await ref.read(profileProvider.notifier).signInGoogleMock();
          if (!context.mounted) return;
          _redirectAfterAuth(context, ref);
        case 'facebook':
          await ref.read(profileProvider.notifier).signInFacebookMock();
          if (!context.mounted) return;
          _redirectAfterAuth(context, ref);
        case 'email':
          if (!context.mounted) return;
          await _showEmailMockDialog(context, ref, locale);
        default:
          showLater();
      }
    }

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF090612), Color(0xFF171022), Color(0xFF07171B)],
          ),
        ),
        child: SafeArea(
          child: ResponsivePage(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 12),
                const Center(child: NovaMascot(size: 132)),
                Text(
                  AppConstants.appName,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  L10n.text('tagline', locale),
                  textAlign: TextAlign.center,
                  style: Theme.of(
                    context,
                  ).textTheme.bodyLarge?.copyWith(color: Colors.white70),
                ),
                if (MockAuthService.enabled) ...[
                  const SizedBox(height: 8),
                  Text(
                    L10n.text('mockAuthDevNote', locale),
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.white38,
                    ),
                  ),
                ],
                const SizedBox(height: 28),
                providersAsync.when(
                  loading: () => const Center(
                    child: Padding(
                      padding: EdgeInsets.symmetric(vertical: 24),
                      child: CircularProgressIndicator(),
                    ),
                  ),
                  error: (error, _) => Center(
                    child: Text(L10n.text('authProvidersError', locale)),
                  ),
                  data: (providers) {
                    final visible = _visibleProviders(providers);
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        for (var index = 0; index < visible.length; index++) ...[
                          _ProviderButton(
                            provider: visible[index],
                            locale: locale,
                            outlined: index != 0,
                            onPressed: () => handleProvider(visible[index]),
                          ),
                          if (index != visible.length - 1)
                            const SizedBox(height: 10),
                        ],
                      ],
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static Future<void> _showEmailMockDialog(
    BuildContext context,
    WidgetRef ref,
    String locale,
  ) async {
    final controller = TextEditingController();
    final email = await showDialog<String>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: Text(L10n.text('emailMockTitle', locale)),
        content: TextField(
          controller: controller,
          keyboardType: TextInputType.emailAddress,
          decoration: InputDecoration(
            hintText: L10n.text('emailMockHint', locale),
          ),
          autofocus: true,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(''),
            child: Text(L10n.text('emailMockSkip', locale)),
          ),
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(controller.text),
            child: Text(L10n.text('continue', locale)),
          ),
        ],
      ),
    );
    controller.dispose();
    if (!context.mounted || email == null) return;

    await ref.read(profileProvider.notifier).signInEmailMock(email);
    if (!context.mounted) return;
    _redirectAfterAuth(context, ref);
  }
}

class _ProviderButton extends StatelessWidget {
  const _ProviderButton({
    required this.provider,
    required this.locale,
    required this.outlined,
    required this.onPressed,
  });

  final AuthProviderOption provider;
  final String locale;
  final bool outlined;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return AppButton(
      label: provider.localizedLabel(locale),
      icon: AuthScreen._iconFor(provider.id),
      outlined: outlined,
      onPressed: onPressed,
    );
  }
}
