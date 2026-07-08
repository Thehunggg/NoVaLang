import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/nova_mascot.dart';
import '../../widgets/common/responsive_page.dart';

class AuthScreen extends ConsumerWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(profileProvider).uiLanguageCode;
    void showLater() => ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(L10n.text('providerLater', locale))));
    final providers = <({String key, IconData icon, bool guest})>[
      (key: 'google', icon: Icons.alternate_email, guest: false),
      (key: 'facebook', icon: Icons.groups_outlined, guest: false),
      (key: 'instagram', icon: Icons.camera_alt_outlined, guest: false),
      (key: 'apple', icon: Icons.apple, guest: false),
      (key: 'email', icon: Icons.mail_outline, guest: false),
      (key: 'explorer', icon: Icons.person_outline, guest: true),
    ];

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
                for (var index = 0; index < providers.length; index++) ...[
                  AppButton(
                    label: L10n.text(providers[index].key, locale),
                    icon: providers[index].icon,
                    outlined: index != 0,
                    onPressed: providers[index].guest
                        ? () => context.go('/onboarding/native')
                        : showLater,
                  ),
                  if (index != providers.length - 1) const SizedBox(height: 10),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
