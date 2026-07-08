import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../widgets/common/app_button.dart';
import '../../widgets/common/responsive_page.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ResponsivePage(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 24),
              Text(
                'NovaLang',
                style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 12),
              const Text('Your mobile learning space is ready.'),
              const SizedBox(height: 24),
              AppButton(
                label: 'Go to Learn',
                icon: Icons.school,
                onPressed: () => context.go('/learn'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
