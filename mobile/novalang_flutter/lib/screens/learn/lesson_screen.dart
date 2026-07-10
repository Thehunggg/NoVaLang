import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/level_display.dart';
import '../../core/utils/localization.dart';
import '../../models/lesson.dart';
import '../../state/lesson_provider.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/nova_mascot.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/exercise_card.dart';
import '../../widgets/lesson/speaker_button.dart';

class LessonScreen extends ConsumerStatefulWidget {
  const LessonScreen({super.key, required this.lesson});
  final Lesson? lesson;
  @override
  ConsumerState<LessonScreen> createState() => _LessonScreenState();
}

class _LessonScreenState extends ConsumerState<LessonScreen> {
  int stepIndex = 0;
  bool answered = false;
  bool completed = false;

  @override
  void initState() {
    super.initState();
    final lesson = widget.lesson;
    if (lesson != null) {
      final session = ref.read(profileProvider).lessonSessions[lesson.id];
      stepIndex = (session?['currentStepIndex'] as int? ?? 0).clamp(
        0,
        lesson.exercises.isEmpty ? 0 : lesson.exercises.length - 1,
      );
      completed = session?['completedAt'] != null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final lesson = widget.lesson;
    if (lesson == null) {
      return AppScaffold(
        title: L10n.text('learn', locale),
        showBack: true,
        backPath: '/learn',
        child: ResponsivePage(
          child: Center(child: Text(L10n.text('lessonNotFound', locale))),
        ),
      );
    }

    return AppScaffold(
      title: lesson.localizedTitle(locale),
      showBack: true,
      backPath: '/learn',
      selectedNavIndex: 0,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: TextButton.icon(
                    onPressed: () => context.go('/learn'),
                    icon: const Icon(Icons.arrow_back),
                    label: Text(L10n.text('courseBack', locale)),
                  ),
                ),
                if (stepIndex > 0)
                  Expanded(
                    child: TextButton.icon(
                      onPressed: _previous,
                      icon: const Icon(Icons.history),
                      label: Text(L10n.text('previousStep', locale)),
                    ),
                  ),
              ],
            ),
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              getLevelDisplayName(
                                lesson.level,
                                profile.learningLanguageCode,
                                nativeLanguage: profile.nativeLanguageCode,
                              ),
                              style: const TextStyle(
                                color: Color(0xFF67E8F9),
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              lesson.localizedTitle(locale),
                              style: Theme.of(context).textTheme.headlineSmall
                                  ?.copyWith(fontWeight: FontWeight.w900),
                            ),
                            const SizedBox(height: 8),
                            Text(lesson.localizedDescription(locale)),
                          ],
                        ),
                      ),
                      const NovaMascot(size: 82),
                    ],
                  ),
                  if (profile.lessonSessions[lesson.id] != null &&
                      !completed) ...[
                    const SizedBox(height: 12),
                    Text(
                      L10n.text('resume', locale),
                      style: const TextStyle(
                        color: Color(0xFFC4B5FD),
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 14),
            if (lesson.comingSoon)
              AppCard(child: Text(L10n.text('comingSoon', locale)))
            else if (lesson.exercises.isEmpty)
              _intro(context, lesson, locale)
            else if (completed)
              _completion(context, lesson, locale)
            else ...[
              LinearProgressIndicator(
                value: (stepIndex + 1) / lesson.exercises.length,
              ),
              const SizedBox(height: 12),
              ExerciseCard(
                key: ValueKey('${lesson.id}-$stepIndex'),
                exercise: lesson.exercises[stepIndex],
                nativeLanguageCode: locale,
                onChecked: (_) => setState(() => answered = true),
              ),
              const SizedBox(height: 12),
              AppButton(
                label: L10n.text('next', locale),
                icon: Icons.arrow_forward,
                onPressed: answered ? _next : null,
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _intro(BuildContext context, Lesson lesson, String locale) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (lesson.vocabulary.isNotEmpty) ...[
            Text(
              L10n.text('vocabulary', locale),
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 10),
            for (final item in lesson.vocabulary)
              _vocabCard(context, item, locale),
            const SizedBox(height: 8),
          ] else
            for (final point in lesson.localizedIntroPoints(locale))
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Padding(
                      padding: EdgeInsets.only(top: 3),
                      child: Icon(
                        Icons.auto_awesome,
                        size: 17,
                        color: Color(0xFF67E8F9),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(point, style: const TextStyle(height: 1.5)),
                    ),
                  ],
                ),
              ),
          const SizedBox(height: 8),
          AppButton(
            label: L10n.text('next', locale),
            icon: Icons.arrow_forward,
            onPressed: completed ? _nextLesson : _completeIntro,
          ),
        ],
      ),
    );
  }

  Widget _vocabCard(
    BuildContext context,
    LessonVocabCard item,
    String locale,
  ) {
    final example = item.exampleText;
    final exampleReading = item.exampleReading ?? item.exampleRomanization;
    final exampleTranslation = item.exampleTranslation;
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0x3340E0D0)),
          color: const Color(0x1400BCD4),
        ),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      item.displayText,
                      style: Theme.of(context).textTheme.headlineSmall
                          ?.copyWith(fontWeight: FontWeight.w900),
                    ),
                  ),
                  SpeakerButton(speechText: item.speechText),
                ],
              ),
              if (item.reading != null && item.reading!.isNotEmpty) ...[
                const SizedBox(height: 6),
                Text(
                  '${L10n.text('vocabReading', locale)}: ${item.reading}',
                  style: const TextStyle(
                    color: Color(0xFF67E8F9),
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
              const SizedBox(height: 6),
              Text(
                '${L10n.text('vocabMeaning', locale)}: ${item.meaning}',
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
              if (example != null &&
                  example.isNotEmpty &&
                  example != item.displayText) ...[
                const SizedBox(height: 10),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${L10n.text('vocabExample', locale)}: $example',
                            style: const TextStyle(fontWeight: FontWeight.w800),
                          ),
                          if (exampleReading != null &&
                              exampleReading.isNotEmpty)
                            Padding(
                              padding: const EdgeInsets.only(top: 4),
                              child: Text(
                                '${L10n.text('vocabReading', locale)}: $exampleReading',
                                style: const TextStyle(
                                  color: Color(0xFF67E8F9),
                                  fontWeight: FontWeight.w700,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          if (exampleTranslation != null &&
                              exampleTranslation.isNotEmpty &&
                              exampleTranslation != item.meaning)
                            Padding(
                              padding: const EdgeInsets.only(top: 4),
                              child: Text(
                                '${L10n.text('vocabTranslation', locale)}: $exampleTranslation',
                                style: const TextStyle(
                                  color: Color(0xFFA5F3FC),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                    SpeakerButton(
                      speechText: item.exampleSpeechText ?? example,
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _completion(BuildContext context, Lesson lesson, String locale) =>
      AppCard(
        child: Column(
          children: [
            const NovaMascot(size: 112),
            Text(
              L10n.text('reviewLesson', locale),
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 14),
            AppButton(
              label: L10n.text('reviewLesson', locale),
              outlined: true,
              onPressed: () => setState(() {
                completed = false;
                stepIndex = 0;
                answered = false;
              }),
            ),
            const SizedBox(height: 10),
            AppButton(label: L10n.text('next', locale), onPressed: _nextLesson),
          ],
        ),
      );

  void _previous() => setState(() {
    stepIndex--;
    answered = true;
  });

  Future<void> _next() async {
    final lesson = widget.lesson!;
    final isLast = stepIndex == lesson.exercises.length - 1;
    final rewarded = await ref
        .read(profileProvider.notifier)
        .completeLessonStep(
          lessonId: lesson.id,
          stepId: lesson.exercises[stepIndex].id,
          currentStepIndex: isLast ? stepIndex : stepIndex + 1,
          lessonComplete: isLast,
          estimatedMinutes: (lesson.estimatedMinutes / lesson.exercises.length)
              .ceil(),
        );
    if (!mounted) return;
    if (rewarded) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            L10n.text('goalReward', ref.read(profileProvider).uiLanguageCode),
          ),
        ),
      );
    }
    setState(() {
      answered = false;
      if (isLast) {
        completed = true;
      } else {
        stepIndex++;
      }
    });
  }

  Future<void> _completeIntro() async {
    final lesson = widget.lesson!;
    final rewarded = await ref
        .read(profileProvider.notifier)
        .completeLessonStep(
          lessonId: lesson.id,
          stepId: 'intro',
          currentStepIndex: 0,
          lessonComplete: true,
          estimatedMinutes: lesson.estimatedMinutes,
        );
    if (!mounted) return;
    if (rewarded) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            L10n.text('goalReward', ref.read(profileProvider).uiLanguageCode),
          ),
        ),
      );
    }
    setState(() => completed = true);
    _nextLesson();
  }

  void _nextLesson() {
    final lessons = ref.read(lessonProvider);
    final currentId = widget.lesson!.id;
    // Find the next non-coming-soon lesson in the catalog.
    final index = lessons.indexWhere((l) => l.id == currentId);
    if (index >= 0) {
      for (int i = index + 1; i < lessons.length; i++) {
        if (!lessons[i].comingSoon) {
          context.go('/learn/${lessons[i].id}');
          return;
        }
      }
    }
    context.go('/learn');
  }
}
