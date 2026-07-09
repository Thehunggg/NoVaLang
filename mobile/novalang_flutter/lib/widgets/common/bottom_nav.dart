import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';

class BottomNav extends ConsumerWidget {
  const BottomNav({super.key, required this.selectedIndex});

  final int selectedIndex;

  static const _routes = [
    '/learn',
    '/practice',
    '/review',
    '/flashcards',
    '/profile',
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(profileProvider).uiLanguageCode;

    return NavigationBar(
      selectedIndex: selectedIndex,
      onDestinationSelected: (index) => context.go(_routes[index]),
      destinations: [
        NavigationDestination(
          icon: const Icon(Icons.school_outlined),
          selectedIcon: const Icon(Icons.school),
          label: L10n.text('learn', locale),
        ),
        NavigationDestination(
          icon: const Icon(Icons.fitness_center_outlined),
          selectedIcon: const Icon(Icons.fitness_center),
          label: L10n.text('practice', locale),
        ),
        NavigationDestination(
          icon: const Icon(Icons.refresh_outlined),
          selectedIcon: const Icon(Icons.refresh),
          label: L10n.text('review', locale),
        ),
        NavigationDestination(
          icon: const Icon(Icons.style_outlined),
          selectedIcon: const Icon(Icons.style),
          label: L10n.text('flashcards', locale),
        ),
        NavigationDestination(
          icon: const Icon(Icons.person_outline),
          selectedIcon: const Icon(Icons.person),
          label: L10n.text('profile', locale),
        ),
      ],
    );
  }
}
