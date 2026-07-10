import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import '../../models/user_profile.dart';
import '../../state/lesson_provider.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/course_unit_card.dart';

class LearnScreen extends ConsumerWidget {
  const LearnScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final learningCode = UserProfile.normalizeLearningLanguageCode(
      profile.learningLanguageCode,
    );
    final nicheId = normalizeNicheId(profile.primaryNiche);
    final units = ref.watch(courseUnitsProvider);
    final catalogAsync = ref.watch(curriculumCatalogProvider);
    final learningOption = ref.watch(languageByCodeProvider(learningCode));
    final niches = ref.watch(nicheCatalogProvider).value ?? const [];
    final nicheTitle = niches
            .where((n) => n.id == nicheId)
            .map((n) => n.localizedTitle(locale))
            .firstOrNull ??
        nicheId;

    final completedIds = profile.lessonSessions.entries
        .where((e) => e.value['completedAt'] != null)
        .map((e) => e.key)
        .toSet();

    final visibleLessonCount = units.fold<int>(
      0,
      (sum, unit) => sum + unit.lessons.length,
    );

    if (kDebugMode) {
      debugPrint(
        '[Learn] language=$learningCode niche=$nicheId '
        'units=${units.length} lessons=$visibleLessonCount '
        'fallback=${catalogAsync.hasError}',
      );
    }

    final isComingSoonLanguage = !learningOption.isCourseAvailable;
    final showEmpty = units.isEmpty;

    return AppScaffold(
      title: L10n.text('learn', locale),
      selectedNavIndex: 0,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _LearnHeader(
              locale: locale,
              learningOption: learningOption,
              nicheTitle: nicheTitle,
              completedCount: completedIds.length,
              lessonCount: visibleLessonCount,
            ),
            const SizedBox(height: 20),
            if (profile.needsCoreFoundation) ...[
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      L10n.text('coreFoundationRequired', locale),
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(L10n.text('coreFoundationRequiredHelp', locale)),
                    const SizedBox(height: 12),
                    AppButton(
                      label: L10n.text('skipCoreFoundation', locale),
                      outlined: true,
                      onPressed: () => ref
                          .read(profileProvider.notifier)
                          .skipCoreFoundation(),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
            ],
            if (catalogAsync.isLoading)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 48),
                child: Center(child: CircularProgressIndicator()),
              )
            else if (showEmpty)
              _ComingSoonState(
                locale: locale,
                languageName: learningOption.nativeName,
                nicheTitle: nicheTitle,
                isLanguageComingSoon: isComingSoonLanguage,
              )
            else
              for (int i = 0; i < units.length; i++) ...[
                CourseUnitCard(
                  unit: units[i],
                  locale: locale,
                  learningLanguage: learningCode,
                  completedLessonIds: completedIds,
                  initiallyExpanded: i == 0,
                  onLessonTap: (lesson) => context.go('/learn/${lesson.id}'),
                ),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}

class _LearnHeader extends StatelessWidget {
  const _LearnHeader({
    required this.locale,
    required this.learningOption,
    required this.nicheTitle,
    required this.completedCount,
    required this.lessonCount,
  });

  final String locale;
  final LanguageOption learningOption;
  final String nicheTitle;
  final int completedCount;
  final int lessonCount;

  @override
  Widget build(BuildContext context) {
    final accent = _parseColor(learningOption.color) ?? const Color(0xFF22D3EE);

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            accent.withValues(alpha: 0.28),
            const Color(0xFF8B5CF6).withValues(alpha: 0.18),
            Colors.white.withValues(alpha: 0.04),
          ],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.10)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 48,
                height: 48,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.white.withValues(alpha: 0.10),
                ),
                child: Text(
                  learningOption.flagEmoji,
                  style: const TextStyle(fontSize: 24),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      learningOption.nativeName,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      nicheTitle,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(
            L10n.text('learnSubtitle', locale),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white60,
            ),
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _Chip(
                icon: Icons.menu_book_outlined,
                label: L10n.text(
                  'lessonsAvailableCount',
                  locale,
                ).replaceAll('{n}', '$lessonCount'),
                color: accent,
              ),
              if (completedCount > 0)
                _Chip(
                  icon: Icons.auto_awesome,
                  label: L10n.text(
                    completedCount == 1
                        ? 'lessonsCompletedSingular'
                        : 'lessonsCompletedPlural',
                    locale,
                  ).replaceAll('{n}', '$completedCount'),
                  color: const Color(0xFF22D3EE),
                ),
              if (!learningOption.isCourseAvailable)
                _Chip(
                  icon: Icons.schedule,
                  label: L10n.text('comingSoon', locale),
                  color: Colors.orangeAccent,
                ),
            ],
          ),
        ],
      ),
    );
  }

  Color? _parseColor(String? hex) {
    if (hex == null || hex.isEmpty) return null;
    final cleaned = hex.replaceFirst('#', '');
    if (cleaned.length != 6) return null;
    return Color(int.parse('FF$cleaned', radix: 16));
  }
}

class _Chip extends StatelessWidget {
  const _Chip({
    required this.icon,
    required this.label,
    required this.color,
  });

  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: color.withValues(alpha: 0.35)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 15, color: color),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.w700,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}

class _ComingSoonState extends StatelessWidget {
  const _ComingSoonState({
    required this.locale,
    required this.languageName,
    required this.nicheTitle,
    required this.isLanguageComingSoon,
  });

  final String locale;
  final String languageName;
  final String nicheTitle;
  final bool isLanguageComingSoon;

  @override
  Widget build(BuildContext context) {
    final message = isLanguageComingSoon
        ? L10n.text('curriculumLanguageComingSoon', locale)
            .replaceAll('{language}', languageName)
        : L10n.text('curriculumNicheComingSoon', locale)
            .replaceAll('{niche}', nicheTitle);

    return Container(
      padding: const EdgeInsets.fromLTRB(20, 36, 20, 36),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            const Color(0xFF8B5CF6).withValues(alpha: 0.16),
            Colors.white.withValues(alpha: 0.04),
          ],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.10)),
      ),
      child: Column(
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: const Color(0xFF22D3EE).withValues(alpha: 0.12),
            ),
            child: const Icon(
              Icons.rocket_launch_outlined,
              size: 34,
              color: Color(0xFF22D3EE),
            ),
          ),
          const SizedBox(height: 18),
          Text(
            L10n.text('comingSoon', locale),
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            message,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white70,
              height: 1.45,
            ),
          ),
        ],
      ),
    );
  }
}
