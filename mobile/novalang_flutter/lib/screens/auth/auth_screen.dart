import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/platform/app_platform.dart';
import '../../core/utils/localization.dart';
import '../../models/auth_provider_option.dart';
import '../../services/mock_auth_service.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/auth/login_final_visual.dart';

class AuthScreen extends ConsumerWidget {
  const AuthScreen({super.key});

  static List<AuthProviderOption> _visibleProviders(
    List<AuthProviderOption> providers,
  ) {
    const rank = {
      'google': 0,
      'facebook': 1,
      'instagram': 2,
      'email': 3,
      'apple': 4,
    };
    final visible = providers
        .where(
          (provider) =>
              !provider.isGuest &&
              (provider.id != 'apple' || AppPlatform.supportsAppleSignIn),
        )
        .toList();
    visible.sort(
      (left, right) => (rank[left.id] ?? 99).compareTo(rank[right.id] ?? 99),
    );
    return List.unmodifiable(visible);
  }

  static void _redirectAfterAuth(BuildContext context, WidgetRef ref) {
    final profile = ref.read(profileProvider);
    if (!context.mounted) return;
    context.go(profile.onboardingComplete ? '/learn' : '/onboarding/native');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final explicitUiLocale = ref
        .read(profileProvider.notifier)
        .preferredUiLanguageCode;
    final sloganLocale = explicitUiLocale == null
        ? View.of(context).platformDispatcher.locale.languageCode
        : locale;
    final providersAsync = ref.watch(authProvidersProvider);

    void showLater() => ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(L10n.text('providerLater', locale))));

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

    return LoginFinalVisual(
      uiLanguageCode: locale,
      sloganLanguageCode: sloganLocale,
      providersAsync: providersAsync.when(
        data: (providers) => AsyncData(_visibleProviders(providers)),
        error: AsyncError.new,
        loading: AsyncLoading.new,
      ),
      onProviderPressed: handleProvider,
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
