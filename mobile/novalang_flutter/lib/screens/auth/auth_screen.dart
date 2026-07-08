import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
import '../../core/utils/localization.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/responsive_page.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    void showLater() {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(L10n.text('providerLater', 'en'))));
    }

    return Scaffold(
      body: SafeArea(
        child: ResponsivePage(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 28),
              Icon(
                Icons.auto_awesome,
                color: Theme.of(context).colorScheme.primary,
                size: 56,
              ),
              const SizedBox(height: 14),
              Text(
                AppConstants.appName,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Mobile-first language learning',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 36),
              AppButton(
                label: 'Continue with Google',
                icon: Icons.g_mobiledata,
                onPressed: showLater,
              ),
              const SizedBox(height: 12),
              AppButton(
                label: 'Continue with Facebook',
                icon: Icons.facebook,
                onPressed: showLater,
                outlined: true,
              ),
              const SizedBox(height: 12),
              AppButton(
                label: 'Continue with Instagram',
                icon: Icons.camera_alt_outlined,
                onPressed: showLater,
                outlined: true,
              ),
              const SizedBox(height: 12),
              AppButton(
                label: 'Continue with Apple',
                icon: Icons.apple,
                onPressed: showLater,
                outlined: true,
              ),
              const SizedBox(height: 12),
              AppButton(
                label: 'Continue with Email',
                icon: Icons.mail_outline,
                onPressed: showLater,
                outlined: true,
              ),
              const SizedBox(height: 12),
              AppButton(
                label: 'Continue as Guest',
                icon: Icons.person_outline,
                onPressed: () => context.go('/onboarding/native'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
