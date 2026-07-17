import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../models/exam_track.dart';
import '../../models/language_option.dart';
import '../../models/niche.dart';
import '../../models/user_profile.dart';
import '../../state/lesson_provider.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/learn/daily_life_hero.dart';
import '../../widgets/learn/daily_life_module_card.dart';
import '../../widgets/lesson/course_unit_card.dart';
import '../../models/course_unit.dart';

class LearnScreen extends ConsumerWidget {
  const LearnScreen({super.key});

  String _trackTitle(
    String trackId,
    List<Niche> niches,
    List<ExamTrack> examTracks,
    String locale,
  ) {
    final exam = examTracks.where((track) => track.id == trackId).firstOrNull;
    if (exam != null) return exam.localizedTitle(locale);

    final direct = niches.where((n) => n.id == trackId).firstOrNull;
    if (direct != null) return direct.localizedTitle(locale);

    if (trackId.startsWith('exam_')) {
      final examLabel = trackId.substring(5).toUpperCase();
      final resolved = resolveCurriculumNicheId(trackId);
      final niche = niches.where((n) => n.id == resolved).firstOrNull;
      if (niche != null) return '$examLabel · ${niche.localizedTitle(locale)}';
      return examLabel;
    }

    final resolved = resolveCurriculumNicheId(trackId);
    return niches
            .where((n) => n.id == resolved)
            .map((n) => n.localizedTitle(locale))
            .firstOrNull ??
        trackId;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final learningCode = UserProfile.normalizeLearningLanguageCode(
      profile.learningLanguageCode,
    );
    final activeTracks = profile.effectiveActiveTracks;
    final currentTrack = profile.effectiveCurrentTrack;
    final nicheId = resolveCurriculumNicheId(currentTrack);
    final units = ref.watch(courseUnitsProvider);
    final catalogAsync = ref.watch(curriculumCatalogProvider);
    final learningOption = ref.watch(languageByCodeProvider(learningCode));
    final niches = ref.watch(nicheCatalogProvider).value ?? const [];
    final examTracks =
        ref.watch(examTrackCatalogProvider).value?[learningCode] ??
        const <ExamTrack>[];
    final nicheTitle = _trackTitle(currentTrack, niches, examTracks, locale);

    final completedIds = profile.lessonSessions.entries
        .where((e) => e.value['completedAt'] != null)
        .map((e) => e.key)
        .toSet();

    final trackLessonIds = units
        .expand((unit) => unit.lessons)
        .map((lesson) => lesson.id)
        .toSet();
    final trackCompletedCount = completedIds
        .where(trackLessonIds.contains)
        .length;

    final visibleLessonCount = units.fold<int>(
      0,
      (sum, unit) => sum + unit.lessons.length,
    );

    if (kDebugMode) {
      debugPrint(
        '[Learn] language=$learningCode track=$currentTrack niche=$nicheId '
        'units=${units.length} lessons=$visibleLessonCount '
        'fallback=${catalogAsync.hasError}',
      );
    }

    final isComingSoonLanguage = !learningOption.isCourseAvailable;
    final showEmpty = units.isEmpty;
    final isDailyLife = nicheId == 'daily_life';
    final foundationUnits = isDailyLife
        ? units
              .where((u) => u.moduleId?.startsWith('daily_life') != true)
              .toList()
        : const <CourseUnit>[];
    final dailyLifeModules = isDailyLife
        ? CurriculumModuleGroup.fromUnits(
            units
                .where((u) => u.moduleId?.startsWith('daily_life') == true)
                .toList(),
          )
        : const <CurriculumModuleGroup>[];

    return AppScaffold(
      title: L10n.text('learn', locale),
      selectedNavIndex: 0,
      child: ResponsivePage(
        pageStorageKey: const PageStorageKey<String>('learn-roadmap-scroll'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _LearnHeader(
              locale: locale,
              learningOption: learningOption,
              nicheTitle: nicheTitle,
              completedCount: trackCompletedCount,
              lessonCount: visibleLessonCount,
            ),
            const SizedBox(height: 16),
            Text(
              L10n.text('activeTracksTitle', locale),
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final trackId in activeTracks)
                  ChoiceChip(
                    label: Text(
                      _trackTitle(trackId, niches, examTracks, locale),
                    ),
                    selected: trackId == currentTrack,
                    onSelected: (_) => ref
                        .read(profileProvider.notifier)
                        .setCurrentTrack(trackId),
                  ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              L10n.text('trackProgress', locale)
                  .replaceAll('{done}', '$trackCompletedCount')
                  .replaceAll('{total}', '$visibleLessonCount'),
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(color: Colors.white70),
            ),
            if (activeTracks.length < UserProfile.maxActiveTracks) ...[
              const SizedBox(height: 12),
              AppButton(
                label: L10n.text('addSecondTrack', locale),
                outlined: true,
                onPressed: () {
                  if (profile.onboardingComplete) {
                    context.push('/profile/preferences');
                  } else {
                    context.push('/onboarding/niche');
                  }
                },
              ),
            ],
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
            else if (isDailyLife) ...[
              DailyLifeHero(
                locale: locale,
                title: nicheTitle,
                description: L10n.text('dailyLifeHeroDescription', locale),
                moduleCount: dailyLifeModules.length,
                unitCount: dailyLifeModules.fold(
                  0,
                  (sum, m) => sum + m.unitCount,
                ),
                lessonCount: dailyLifeModules.fold(
                  0,
                  (sum, m) => sum + m.lessonCount,
                ),
                hasReadyModule: dailyLifeModules.any((m) => !m.isBlueprint),
              ),
              const SizedBox(height: 16),
              for (final unit in foundationUnits) ...[
                CourseUnitCard(
                  unit: unit,
                  locale: locale,
                  learningLanguage: learningCode,
                  completedLessonIds: completedIds,
                  onLessonTap: (lesson) => context.push('/learn/${lesson.id}'),
                ),
                const SizedBox(height: 12),
              ],
              for (int i = 0; i < dailyLifeModules.length; i++) ...[
                DailyLifeModuleCard(
                  module: dailyLifeModules[i],
                  moduleIndex: i + 1,
                  locale: locale,
                  nativeLanguageCode: profile.nativeLanguageCode,
                  completedLessonIds: completedIds,
                  initiallyExpanded: i == 0,
                  onLessonTap: (lesson) => context.push('/learn/${lesson.id}'),
                ),
                const SizedBox(height: 12),
              ],
            ] else
              for (int i = 0; i < units.length; i++) ...[
                if ((units[i].moduleId?.isNotEmpty ?? false) &&
                    (i == 0 || units[i].moduleId != units[i - 1].moduleId)) ...[
                  if (i > 0) const SizedBox(height: 8),
                  Text(
                    '${L10n.text('moduleLabel', locale)} · ${units[i].localizedModuleTitle(locale)}',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 10),
                ],
                CourseUnitCard(
                  unit: units[i],
                  locale: locale,
                  learningLanguage: learningCode,
                  completedLessonIds: completedIds,
                  initiallyExpanded: i == 0,
                  onLessonTap: (lesson) => context.push('/learn/${lesson.id}'),
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
    final gradientColors = learningOption.heroGradient
        .map(_parseColor)
        .whereType<Color>()
        .toList(growable: false);
    final colors = gradientColors.length >= 2
        ? gradientColors
        : const [Color(0xFF173247), Color(0xFF31465A), Color(0xFF151B2A)];
    final screenWidth = MediaQuery.sizeOf(context).width;
    final headerHeight = (screenWidth * 0.58).clamp(228.0, 320.0);

    return SizedBox(
      height: headerHeight,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: colors,
          ),
          border: Border.all(color: Colors.white.withValues(alpha: 0.10)),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Positioned.fill(
              left: screenWidth * 0.20,
              child: SvgPicture.asset(
                'assets/shared/${learningOption.heroAsset}',
                fit: BoxFit.cover,
                alignment: Alignment.centerRight,
                placeholderBuilder: (_) => const SizedBox.shrink(),
                errorBuilder: (_, _, _) => SvgPicture.asset(
                  'assets/shared/language_hero/default.svg',
                  fit: BoxFit.cover,
                  alignment: Alignment.centerRight,
                ),
              ),
            ),
            Positioned.fill(
              child: DecoratedBox(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      const Color(0xFF080A14).withValues(alpha: 0.96),
                      const Color(0xFF080A14).withValues(alpha: 0.72),
                      const Color(
                        0xFF080A14,
                      ).withValues(alpha: learningOption.heroOverlayOpacity),
                      Colors.transparent,
                    ],
                    stops: const [0, 0.48, 0.74, 1],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(18),
              child: Stack(
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                      width: 46,
                      height: 46,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.black.withValues(alpha: 0.22),
                        border: Border.all(color: Colors.white24),
                      ),
                      child: Text(
                        learningOption.flagEmoji,
                        style: const TextStyle(fontSize: 23),
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomLeft,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          learningOption.nativeName,
                          style: Theme.of(context).textTheme.headlineMedium
                              ?.copyWith(fontWeight: FontWeight.w900),
                        ),
                        if (learningOption.nativeNameReading?.isNotEmpty ==
                            true)
                          Padding(
                            padding: const EdgeInsets.only(top: 2),
                            child: Text(
                              learningOption.nativeNameReading!,
                              style: const TextStyle(
                                color: Color(0xFFCFFAFE),
                                fontWeight: FontWeight.w700,
                                fontSize: 12,
                              ),
                            ),
                          ),
                        const SizedBox(height: 8),
                        Text(
                          nicheTitle,
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(
                            color: const Color(0xFFCFFAFE),
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(height: 6),
                        ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 430),
                          child: Text(
                            learningOption.description ??
                                L10n.text('learnSubtitle', locale),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: Theme.of(context).textTheme.bodySmall
                                ?.copyWith(color: Colors.white70, height: 1.4),
                          ),
                        ),
                        const SizedBox(height: 12),
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
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
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
  const _Chip({required this.icon, required this.label, required this.color});

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
        ? L10n.text(
            'curriculumLanguageComingSoon',
            locale,
          ).replaceAll('{language}', languageName)
        : L10n.text(
            'curriculumNicheComingSoon',
            locale,
          ).replaceAll('{niche}', nicheTitle);

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
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
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
          if (isLanguageComingSoon) ...[
            const SizedBox(height: 12),
            Text(
              L10n.text('roadmapPlanned', locale),
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.white54,
                height: 1.4,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
