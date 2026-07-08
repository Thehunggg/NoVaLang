import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../screens/auth/auth_screen.dart';
import '../screens/flashcards/flashcards_screen.dart';
import '../screens/home/home_screen.dart';
import '../screens/learn/learn_screen.dart';
import '../screens/learn/lesson_screen.dart';
import '../screens/onboarding/goal_screen.dart';
import '../screens/onboarding/basic_info_screen.dart';
import '../screens/onboarding/learning_language_screen.dart';
import '../screens/onboarding/level_screen.dart';
import '../screens/onboarding/native_language_screen.dart';
import '../screens/onboarding/niche_screen.dart';
import '../screens/practice/practice_screen.dart';
import '../screens/profile/learning_preferences_screen.dart';
import '../screens/profile/profile_screen.dart';
import '../screens/review/review_screen.dart';
import '../screens/splash_screen.dart';
import '../state/lesson_provider.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(path: '/auth', builder: (context, state) => const AuthScreen()),
      GoRoute(
        path: '/onboarding/native',
        builder: (context, state) => const NativeLanguageScreen(),
      ),
      GoRoute(
        path: '/onboarding/basic',
        builder: (context, state) => const BasicInfoScreen(),
      ),
      GoRoute(
        path: '/onboarding/learning',
        builder: (context, state) => const LearningLanguageScreen(),
      ),
      GoRoute(
        path: '/onboarding/goal',
        builder: (context, state) => const GoalScreen(),
      ),
      GoRoute(
        path: '/onboarding/niche',
        builder: (context, state) => const NicheScreen(),
      ),
      GoRoute(
        path: '/onboarding/level',
        builder: (context, state) => const LevelScreen(),
      ),
      GoRoute(path: '/home', builder: (context, state) => const HomeScreen()),
      GoRoute(path: '/learn', builder: (context, state) => const LearnScreen()),
      GoRoute(
        path: '/learn/:lessonId',
        builder: (context, state) {
          final lessonId = state.pathParameters['lessonId'] ?? '';
          final lessons = ref.read(lessonProvider);
          final lesson = lessons
              .where((item) => item.id == lessonId)
              .firstOrNull;
          return LessonScreen(lesson: lesson);
        },
      ),
      GoRoute(
        path: '/practice',
        builder: (context, state) => const PracticeScreen(),
      ),
      GoRoute(
        path: '/review',
        builder: (context, state) => const ReviewScreen(),
      ),
      GoRoute(
        path: '/flashcards',
        builder: (context, state) => const FlashcardsScreen(),
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/profile/preferences',
        builder: (context, state) => const LearningPreferencesScreen(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(child: Text(state.error?.message ?? 'Route not found')),
    ),
  );
});
