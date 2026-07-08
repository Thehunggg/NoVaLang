import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class BottomNav extends StatelessWidget {
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
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: selectedIndex,
      onDestinationSelected: (index) => context.go(_routes[index]),
      destinations: const [
        NavigationDestination(
          icon: Icon(Icons.school_outlined),
          selectedIcon: Icon(Icons.school),
          label: 'Learn',
        ),
        NavigationDestination(
          icon: Icon(Icons.fitness_center_outlined),
          selectedIcon: Icon(Icons.fitness_center),
          label: 'Practice',
        ),
        NavigationDestination(
          icon: Icon(Icons.refresh_outlined),
          selectedIcon: Icon(Icons.refresh),
          label: 'Review',
        ),
        NavigationDestination(
          icon: Icon(Icons.style_outlined),
          selectedIcon: Icon(Icons.style),
          label: 'Cards',
        ),
        NavigationDestination(
          icon: Icon(Icons.person_outline),
          selectedIcon: Icon(Icons.person),
          label: 'Profile',
        ),
      ],
    );
  }
}
