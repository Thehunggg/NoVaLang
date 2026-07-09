import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
import '../../core/utils/localization.dart';
import '../../models/auth_provider_option.dart';
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

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(profileProvider).uiLanguageCode;
    final providersAsync = ref.watch(authProvidersProvider);

    void showLater() => ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(L10n.text('providerLater', locale))),
    );

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
                  data: (providers) => Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      for (var index = 0; index < providers.length; index++) ...[
                        _ProviderButton(
                          provider: providers[index],
                          locale: locale,
                          outlined: index != 0,
                          onPressed: providers[index].isGuest
                              ? () => context.go('/onboarding/native')
                              : showLater,
                        ),
                        if (index != providers.length - 1)
                          const SizedBox(height: 10),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
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
