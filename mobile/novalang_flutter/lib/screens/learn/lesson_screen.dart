import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
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
import 'lesson_five_card_pages.dart';

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

  /// Shared lesson intro (vocabulary / introPoints) before Exercise 1.
  bool showingIntro = true;

  /// Card/section index inside the lesson intro flow.
  int introSectionIndex = 0;
  final Set<String> _expandedFiveCards = <String>{
    'intro',
    'vocabulary',
    'dialogue',
    'grammar',
    'practice',
  };
  final Set<String> _expandedVocabularyCards = <String>{};

  bool _hasIntroContent(Lesson lesson) =>
      lesson.vocabulary.isNotEmpty ||
      lesson.localizedIntroPoints('en').isNotEmpty;

  void _backToRoadmap(BuildContext context) {
    if (context.canPop()) {
      context.pop();
    } else {
      context.go('/learn');
    }
  }

  String _lessonLevelLabel(
    Lesson lesson,
    String learningCode,
    String nativeLocale,
  ) {
    final isDailyLife =
        lesson.moduleId?.startsWith('daily_life') == true ||
        lesson.track.contains('daily_life');
    if (isDailyLife) {
      final moduleTitle = localizedMapText(
        lesson.moduleTitleByNative,
        nativeLocale,
      );
      if (moduleTitle.trim().isNotEmpty) {
        return 'A0–A1 · $moduleTitle';
      }
      return 'A0–A1';
    }
    return getLevelDisplayName(
      lesson.level,
      learningCode,
      nativeLanguage: nativeLocale,
    );
  }

  bool _shouldUseFiveCardRenderer(Lesson lesson) {
    if (lesson.lessonFormat != 'five_cards') return false;
    if (lesson.isValidFiveCardContent) return true;
    debugPrint(
      '[five_cards] fallback for ${lesson.id}: fiveCardContent missing or invalid',
    );
    return false;
  }

  Widget _fiveCardInvalidState(Lesson lesson, String locale) {
    return AppScaffold(
      title: lesson.localizedTitle(locale),
      showBack: true,
      backPath: '/learn',
      selectedNavIndex: 0,
      child: ResponsivePage(
        child: AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                L10n.text('lessonNotFound', locale),
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 8),
              Text(
                'Debug: lesson ${lesson.id} has lessonFormat=five_cards but fiveCardContent is missing or invalid.',
                style: const TextStyle(
                  color: AppTheme.contentSecondaryForeground,
                  height: 1.45,
                ),
              ),
              const SizedBox(height: 14),
              AppButton(
                label: L10n.text('courseBack', locale),
                outlined: true,
                icon: Icons.arrow_back,
                onPressed: () => _backToRoadmap(context),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    final lesson = widget.lesson;
    if (lesson == null) return;

    final session = ref.read(profileProvider).lessonSessions[lesson.id];
    completed = session?['completedAt'] != null;

    if (completed) {
      showingIntro = false;
      stepIndex = 0;
      introSectionIndex = 0;
      return;
    }

    final introDone = session?['introCompleted'] == true;
    final savedStep = (session?['currentStepIndex'] as int? ?? 0).clamp(
      0,
      lesson.exercises.isEmpty ? 0 : lesson.exercises.length - 1,
    );

    if (!_hasIntroContent(lesson)) {
      showingIntro = false;
      stepIndex = savedStep;
    } else if (introDone) {
      showingIntro = false;
      stepIndex = savedStep;
    } else {
      showingIntro = true;
      stepIndex = 0;
      introSectionIndex = 0;
    }
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final nativeLocale = profile.nativeLanguageCode;
    final learningCode = profile.learningLanguageCode;
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

    if (lesson.id == 'ja-daily_life-m01-u1-l1' &&
        lesson.lessonFormat == 'five_cards') {
      if (_shouldUseFiveCardRenderer(lesson)) {
        return LessonFiveCardMenu(
          lesson: lesson,
          uiLanguageCode: locale,
          nativeLanguageCode: nativeLocale,
          learningLanguageCode: learningCode,
          vocabularyExpandedIds: _expandedVocabularyCards,
          onVocabularyExpansionChanged: (id) => setState(() {
            if (_expandedVocabularyCards.contains(id)) {
              _expandedVocabularyCards.remove(id);
            } else {
              _expandedVocabularyCards.add(id);
            }
          }),
        );
      }
      final hasLegacy =
          lesson.vocabulary.isNotEmpty ||
          lesson.exercises.isNotEmpty ||
          lesson.localizedIntroPoints(nativeLocale).isNotEmpty;
      if (!hasLegacy) {
        return _fiveCardInvalidState(lesson, locale);
      }
    }

    final canGoPrevious =
        !showingIntro && (stepIndex > 0 || _hasIntroContent(lesson));

    return AppScaffold(
      title: lesson.localizedTitle(nativeLocale),
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
                    onPressed: () => _backToRoadmap(context),
                    icon: const Icon(Icons.arrow_back),
                    label: Text(L10n.text('courseBack', locale)),
                  ),
                ),
                if (canGoPrevious)
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
                              _lessonLevelLabel(
                                lesson,
                                learningCode,
                                nativeLocale,
                              ),
                              style: const TextStyle(
                                color: AppTheme.contentAccentForeground,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              lesson.localizedTitle(nativeLocale),
                              style: Theme.of(context).textTheme.headlineSmall
                                  ?.copyWith(fontWeight: FontWeight.w900),
                            ),
                            const SizedBox(height: 8),
                            Text(lesson.localizedDescription(nativeLocale)),
                          ],
                        ),
                      ),
                      const NovaMascot(size: 82),
                    ],
                  ),
                  if (profile.lessonSessions[lesson.id] != null &&
                      !completed &&
                      !showingIntro) ...[
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
            if (lesson.isBlueprint)
              _blueprintPreview(context, lesson, locale, nativeLocale)
            else if (completed)
              _completion(context, lesson, locale)
            else if (showingIntro)
              _intro(context, lesson, locale, nativeLocale, learningCode)
            else ...[
              LinearProgressIndicator(
                value: (stepIndex + 1) / lesson.exercises.length,
              ),
              const SizedBox(height: 10),
              Text(
                _exerciseHeader(lesson, stepIndex, nativeLocale),
                style: const TextStyle(
                  color: AppTheme.contentAccentForeground,
                  fontWeight: FontWeight.w900,
                  fontSize: 13,
                  letterSpacing: 0.2,
                ),
              ),
              const SizedBox(height: 12),
              ExerciseCard(
                key: ValueKey('${lesson.id}-$stepIndex'),
                exercise: lesson.exercises[stepIndex],
                nativeLanguageCode: nativeLocale,
                learningLanguageCode: learningCode,
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

  List<dynamic> _contentList(dynamic value) =>
      value is List ? value : const <dynamic>[];

  Map<String, dynamic> _contentMap(dynamic value) => value is Map
      ? value.map((key, item) => MapEntry(key.toString(), item))
      : const <String, dynamic>{};

  String _contentText(dynamic value) => value?.toString() ?? '';

  // ignore: unused_element
  Widget _fiveCardLesson(
    BuildContext context,
    Lesson lesson,
    String locale,
    String nativeLocale,
    String learningCode,
  ) {
    final content = lesson.fiveCardContent ?? const <String, dynamic>{};
    final intro = _contentMap(content['intro']);
    final vocabularyDetails = _contentList(
      content['vocabularyDetails'],
    ).map(_contentMap).toList(growable: false);
    final dialogueGroups = _contentList(
      content['dialogueGroups'],
    ).map(_contentMap).toList(growable: false);
    final grammarPatterns = _contentList(
      content['grammarPatterns'],
    ).map(_contentMap).toList(growable: false);

    // Default all five main cards expanded so the lesson is never an empty dark screen.
    // (Initialized in field declaration.)

    return AppScaffold(
      title: lesson.localizedTitle(nativeLocale),
      showBack: true,
      backPath: '/learn',
      selectedNavIndex: 0,
      child: ResponsivePage(
        pageStorageKey: PageStorageKey('five-card-lesson-${lesson.id}'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextButton.icon(
              onPressed: () => _backToRoadmap(context),
              icon: const Icon(Icons.arrow_back),
              label: Text(L10n.text('courseBack', locale)),
            ),
            Text(
              lesson.localizedTitle(nativeLocale),
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 12),
            _fiveExpandableCard(
              id: 'intro',
              title: L10n.text('lessonIntro', locale),
              icon: Icons.menu_book_outlined,
              child: _introCardBody(context, lesson, intro, locale),
            ),
            _fiveExpandableCard(
              id: 'vocabulary',
              title: L10n.text('lessonVocabCardsSection', locale),
              icon: Icons.style_outlined,
              child: Column(
                children: [
                  for (var index = 0; index < lesson.vocabulary.length; index++)
                    _fiveVocabulary(
                      context,
                      lesson.vocabulary[index],
                      vocabularyDetails.length > index
                          ? vocabularyDetails[index]
                          : const <String, dynamic>{},
                      locale,
                      learningCode,
                    ),
                ],
              ),
            ),
            _fiveExpandableCard(
              id: 'dialogue',
              title: L10n.text('learnMiniDialogue', locale),
              icon: Icons.chat_bubble_outline,
              child: Column(
                children: [
                  for (final group in dialogueGroups)
                    _fiveDialogue(context, group, locale, learningCode),
                ],
              ),
            ),
            _fiveExpandableCard(
              id: 'grammar',
              title: L10n.text('learnGrammarPatterns', locale),
              icon: Icons.account_tree_outlined,
              child: _fiveGrammar(context, grammarPatterns, content, locale),
            ),
            _fiveExpandableCard(
              id: 'practice',
              title: L10n.text('practiceExercises', locale),
              icon: Icons.playlist_add_check_outlined,
              child: Text(
                _contentText(content['practicePlaceholder']),
                style: const TextStyle(
                  height: 1.45,
                  color: AppTheme.contentSecondaryForeground,
                ),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _fiveExpandableCard({
    required String id,
    required String title,
    required IconData icon,
    required Widget child,
  }) {
    final expanded = _expandedFiveCards.contains(id);
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: AppTheme.lessonSurface,
          border: Border.all(color: AppTheme.lessonBorderSubtle),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: () => setState(() {
                  if (expanded) {
                    _expandedFiveCards.remove(id);
                  } else {
                    _expandedFiveCards.add(id);
                  }
                }),
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 12,
                  ),
                  child: Row(
                    children: [
                      Icon(
                        icon,
                        size: 18,
                        color: AppTheme.contentAccentForeground,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          title,
                          style: const TextStyle(fontWeight: FontWeight.w900),
                        ),
                      ),
                      Icon(expanded ? Icons.expand_less : Icons.expand_more),
                    ],
                  ),
                ),
              ),
            ),
            if (expanded)
              Padding(
                padding: const EdgeInsets.fromLTRB(14, 0, 14, 14),
                child: child,
              ),
          ],
        ),
      ),
    );
  }

  Widget _introCardBody(
    BuildContext context,
    Lesson lesson,
    Map<String, dynamic> intro,
    String locale,
  ) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _fiveList(
        L10n.text('goalLabel', locale),
        _contentList(intro['objectives']).take(3).toList(growable: false),
      ),
      _fiveList(
        L10n.text('situationLabel', locale),
        _contentList(intro['situation']),
      ),
      _fiveLabel(L10n.text('afterLessonCanDo', locale)),
      Text(lesson.localizedDescription(locale)),
      _fiveList(
        L10n.text('todayLearn', locale),
        lesson.vocabulary
            .map((item) => item.displayText)
            .toList(growable: false),
      ),
      _fiveList(
        L10n.text('shortNote', locale),
        _contentList(intro['importantNote']).take(1).toList(growable: false),
      ),
    ],
  );

  Widget _fiveVocabulary(
    BuildContext context,
    LessonVocabCard item,
    Map<String, dynamic> details,
    String locale,
    String learningCode,
  ) {
    final expanded = _expandedVocabularyCards.contains(item.displayText);
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: AppTheme.lessonSurface,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppTheme.lessonBorderSubtle),
        ),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Text(
                      item.displayText,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                  SpeakerButton(
                    speechText: item.speechText,
                    languageCode: learningCode,
                    uiLanguageCode: locale,
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(item.meaning, style: const TextStyle(height: 1.4)),
              const SizedBox(height: 4),
              TextButton.icon(
                onPressed: () => setState(() {
                  if (expanded) {
                    _expandedVocabularyCards.remove(item.displayText);
                  } else {
                    _expandedVocabularyCards.add(item.displayText);
                  }
                }),
                icon: Icon(expanded ? Icons.expand_less : Icons.expand_more),
                label: Text(
                  L10n.text(expanded ? 'hideDetails' : 'showDetails', locale),
                ),
              ),
              if (expanded) ...[
                if (item.reading?.isNotEmpty == true) ...[
                  _fiveLabel(L10n.text('vocabReading', locale)),
                  Text(item.reading!),
                ],
                if (item.romanization?.isNotEmpty == true) ...[
                  const SizedBox(height: 4),
                  Text(
                    item.romanization!,
                    style: const TextStyle(
                      color: AppTheme.contentAccentForeground,
                    ),
                  ),
                ],
                if (_contentText(details['overview']).isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Text(
                    _contentText(details['overview']),
                    style: const TextStyle(height: 1.45),
                  ),
                ],
                _fiveList(
                  L10n.text('whenToUse', locale),
                  _contentList(details['timingAndContext']),
                  icon: Icons.schedule_outlined,
                ),
                _fiveList(
                  L10n.text('appropriateFor', locale),
                  _contentList(details['appropriateFor']),
                  icon: Icons.bookmark_outline,
                ),
                _fiveList(
                  L10n.text('avoidUse', locale),
                  _contentList(details['avoid']),
                  icon: Icons.warning_amber_outlined,
                ),
                if (_contentText(details['register']).isNotEmpty) ...[
                  _fiveLabel(
                    L10n.text('register', locale),
                    icon: Icons.tune_outlined,
                  ),
                  Text(_contentText(details['register'])),
                ],
                if (_contentText(details['casualIntro']).isNotEmpty) ...[
                  _fiveLabel(
                    _contentText(details['casualTitle']).isEmpty
                        ? L10n.text('otherExpressions', locale)
                        : _contentText(details['casualTitle']),
                    icon: Icons.forum_outlined,
                  ),
                  Text(
                    _contentText(details['casualIntro']),
                    style: const TextStyle(height: 1.45),
                  ),
                ],
                _fiveList(
                  _contentText(details['casualTitle']).isEmpty
                      ? L10n.text('otherExpressions', locale)
                      : _contentText(details['casualTitle']),
                  _contentList(details['casual']),
                  icon: _contentText(details['casualIntro']).isEmpty
                      ? Icons.forum_outlined
                      : null,
                  showTitle: _contentText(details['casualIntro']).isEmpty,
                ),
                _fiveList(
                  L10n.text('importantNote', locale),
                  _contentList(details['casualNotes']),
                  icon: Icons.info_outline,
                ),
                _fiveList(
                  L10n.text('explanation', locale),
                  _contentList(details['notes']),
                  icon: Icons.info_outline,
                ),
                if (_contentList(details['examples']).isNotEmpty)
                  _fiveLabel(
                    L10n.text('vocabExample', locale),
                    icon: Icons.format_quote_outlined,
                  ),
                for (final raw in _contentList(details['examples']))
                  _fiveExample(context, _contentMap(raw), locale, learningCode),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _fiveDialogue(
    BuildContext context,
    Map<String, dynamic> group,
    String locale,
    String learningCode,
  ) => Container(
    width: double.infinity,
    margin: const EdgeInsets.only(bottom: 16),
    padding: const EdgeInsets.only(bottom: 16),
    decoration: const BoxDecoration(
      border: Border(bottom: BorderSide(color: AppTheme.lessonBorderSubtle)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          _contentText(group['title']),
          style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
        ),
        const SizedBox(height: 4),
        Text(
          _contentText(group['situation']),
          style: const TextStyle(color: AppTheme.contentSecondaryForeground),
        ),
        const SizedBox(height: 10),
        for (final raw in _contentList(group['lines']))
          _fiveExample(context, _contentMap(raw), locale, learningCode),
        _fiveList(
          L10n.text('explanation', locale),
          _contentList(group['explanation']),
        ),
      ],
    ),
  );

  Widget _fiveGrammar(
    BuildContext context,
    List<Map<String, dynamic>> patterns,
    Map<String, dynamic> content,
    String locale,
  ) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      for (final pattern in patterns)
        Container(
          width: double.infinity,
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.only(bottom: 16),
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(color: AppTheme.lessonBorderSubtle),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _contentText(pattern['title']),
                style: const TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 16,
                ),
              ),
              if (_contentText(pattern['formula']).isNotEmpty) ...[
                _fiveLabel(L10n.text('formula', locale)),
                _readingBlock(
                  context,
                  _contentText(pattern['formula']),
                  _contentText(pattern['formulaReading']).isEmpty
                      ? null
                      : _contentText(pattern['formulaReading']),
                ),
              ],
              if (_contentText(pattern['meaning']).isNotEmpty) ...[
                _fiveLabel(L10n.text('vocabMeaning', locale)),
                Text(_contentText(pattern['meaning'])),
              ],
              for (final raw in _contentList(pattern['examples']))
                _fiveExample(context, _contentMap(raw), locale, 'ja'),
              _fiveList(
                L10n.text('explanation', locale),
                _contentList(pattern['explanation']),
              ),
              _fiveList(
                L10n.text('whenToUse', locale),
                _contentList(pattern['whenToUse']),
              ),
              _fiveList(
                L10n.text('otherExpressions', locale),
                _contentList(pattern['casual']),
              ),
              _fiveList(
                L10n.text('commonMistake', locale),
                _contentList(pattern['commonMistake']),
              ),
              _fiveList(
                L10n.text('comparison', locale),
                _contentList(pattern['comparison']),
              ),
              _fiveList(
                L10n.text('importantNote', locale),
                _contentList(pattern['notes']),
              ),
            ],
          ),
        ),
      _fiveLabel(L10n.text('distinctions', locale)),
      for (final raw in _contentList(content['distinctions']))
        _fiveList(
          _contentText(_contentMap(raw)['term']),
          _contentList(_contentMap(raw)['points']),
        ),
    ],
  );

  Widget _fiveExample(
    BuildContext context,
    Map<String, dynamic> value,
    String locale,
    String learningCode,
  ) {
    final translationMap = _contentMap(value['translationByNative']);
    final translation = _contentText(
      translationMap['vi'] ?? value['translation'],
    );
    return Padding(
      padding: const EdgeInsets.only(top: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (_contentText(value['label']).isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Text(
                      _contentText(value['label']),
                      style: const TextStyle(fontWeight: FontWeight.w800),
                    ),
                  ),
                if (_contentText(value['speaker']).isNotEmpty)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _contentText(value['speaker']),
                        style: const TextStyle(
                          color: AppTheme.dialogueSpeakerForeground,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      if (_contentText(value['speakerReading']).isNotEmpty)
                        Text(
                          _contentText(value['speakerReading']),
                          style: const TextStyle(
                            color: AppTheme.contentAccentForeground,
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                    ],
                  ),
                _readingBlock(
                  context,
                  _contentText(value['targetText'] ?? value['text']),
                  _contentText(value['reading']).isEmpty
                      ? null
                      : _contentText(value['reading']),
                ),
                if (translation.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      translation,
                      style: const TextStyle(
                        color: AppTheme.contentSecondaryForeground,
                        height: 1.4,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          if (_contentText(value['speechText'] ?? value['text']).isNotEmpty)
            SpeakerButton(
              speechText: _contentText(value['speechText'] ?? value['text']),
              languageCode: learningCode,
              uiLanguageCode: locale,
            ),
        ],
      ),
    );
  }

  Widget _fiveLabel(String value, {IconData? icon}) => Padding(
    padding: const EdgeInsets.only(top: 14, bottom: 5),
    child: Row(
      children: [
        if (icon != null) ...[
          Icon(icon, size: 16, color: AppTheme.contentAccentForeground),
          const SizedBox(width: 6),
        ],
        Expanded(
          child: Text(
            value,
            style: const TextStyle(
              color: AppTheme.contentAccentForeground,
              fontWeight: FontWeight.w800,
            ),
          ),
        ),
      ],
    ),
  );

  Widget _fiveList(
    String title,
    List<dynamic> items, {
    IconData? icon,
    bool showTitle = true,
  }) {
    if (items.isEmpty) return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (showTitle) _fiveLabel(title, icon: icon),
        for (final item in items)
          Padding(
            padding: const EdgeInsets.only(bottom: 5),
            child: Text(
              '• ${_contentText(item)}',
              style: const TextStyle(height: 1.4),
            ),
          ),
      ],
    );
  }

  String _exerciseHeader(Lesson lesson, int index, String nativeLocale) {
    final total = lesson.exercises.length;
    final numberLabel = L10n.text(
      'exerciseNumber',
      nativeLocale,
    ).replaceAll('{current}', '${index + 1}').replaceAll('{total}', '$total');
    final title = lesson.exercises[index].localizedPrompt(nativeLocale).trim();
    if (title.isEmpty) return numberLabel;
    return '$numberLabel · $title';
  }

  Widget _blueprintPreview(
    BuildContext context,
    Lesson lesson,
    String locale,
    String nativeLocale,
  ) {
    final situation = lesson.localizedSituation(nativeLocale);
    final goal = lesson.localizedDescription(nativeLocale);
    final learnLabels = {
      'vocabularyPhraseCards': L10n.text('learnVocabPhrases', locale),
      'grammarSentencePatterns': L10n.text('learnGrammarPatterns', locale),
      'miniDialogue': L10n.text('learnMiniDialogue', locale),
      'cultureNuanceNote': L10n.text('learnCultureNuance', locale),
      'contextualVariations': L10n.text('learnContextualVariations', locale),
      'communicationStrategy': L10n.text('learnCommunicationStrategy', locale),
    };

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  L10n.text('blueprintPreviewTitle', locale),
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.orangeAccent.withValues(alpha: 0.16),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  L10n.text('blueprintInProgress', locale),
                  style: const TextStyle(
                    color: Colors.orangeAccent,
                    fontWeight: FontWeight.w800,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            lesson.localizedTitle(nativeLocale),
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
          ),
          if (lesson.level.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              '${L10n.text('level', locale)} · ${lesson.level}',
              style: const TextStyle(
                color: AppTheme.contentAccentForeground,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
          const SizedBox(height: 12),
          Text(
            L10n.text('blueprintNotPlayable', locale),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.contentSecondaryForeground,
            ),
          ),
          if (goal.isNotEmpty) ...[
            const SizedBox(height: 14),
            Text(
              L10n.text('goalLabel', locale),
              style: const TextStyle(
                color: AppTheme.contentAccentForeground,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 4),
            Text(goal),
          ],
          if (situation.isNotEmpty) ...[
            const SizedBox(height: 12),
            Text(
              L10n.text('situationLabel', locale),
              style: const TextStyle(
                color: AppTheme.contentAccentForeground,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 4),
            Text(situation),
          ],
          const SizedBox(height: 14),
          Text(
            L10n.text('youWillLearn', locale),
            style: const TextStyle(
              color: AppTheme.contentAccentForeground,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 6),
          for (final key
              in lesson.learnSectionKeys.isEmpty
                  ? learnLabels.keys
                  : lesson.learnSectionKeys)
            Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Text(
                '• ${learnLabels[key] ?? key}',
                style: const TextStyle(
                  color: AppTheme.contentSecondaryForeground,
                ),
              ),
            ),
          const SizedBox(height: 12),
          Text(
            L10n.text('practiceLater', locale),
            style: const TextStyle(
              color: AppTheme.contentAccentForeground,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 6),
          if (lesson.practiceStageLabels.isNotEmpty)
            for (final stage in lesson.practiceStageLabels)
              Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: Text(
                  '• ${localizedMapText(stage.map((key, value) => MapEntry(key, value.toString())), nativeLocale)}',
                  style: const TextStyle(
                    color: AppTheme.contentSecondaryForeground,
                  ),
                ),
              )
          else ...[
            Text(
              '• ${L10n.text('warmupStageHint', locale)}',
              style: const TextStyle(
                color: AppTheme.contentSecondaryForeground,
              ),
            ),
            Text(
              '• ${L10n.text('realWorldStageHint', locale)}',
              style: const TextStyle(
                color: AppTheme.contentSecondaryForeground,
              ),
            ),
          ],
          const SizedBox(height: 16),
          Text(
            L10n.text('blueprintFooterNote', locale),
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.white54,
              height: 1.35,
            ),
          ),
          const SizedBox(height: 14),
          AppButton(
            label: L10n.text('backToRoadmap', locale),
            outlined: true,
            icon: Icons.arrow_back,
            onPressed: () => _backToRoadmap(context),
          ),
        ],
      ),
    );
  }

  Widget _intro(
    BuildContext context,
    Lesson lesson,
    String locale,
    String nativeLocale,
    String learningCode,
  ) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            L10n.text('lessonIntro', locale),
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 10),
          if (lesson.vocabulary.isNotEmpty) ...[
            for (final item in lesson.vocabulary)
              _vocabCard(context, item, locale, learningCode),
            const SizedBox(height: 8),
          ] else
            for (final point in lesson.localizedIntroPoints(nativeLocale))
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
                        color: AppTheme.contentAccentForeground,
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
            label: lesson.exercises.isEmpty
                ? L10n.text('next', locale)
                : L10n.text(
                    'startExercises',
                    locale,
                  ).replaceAll('{count}', '${lesson.exercises.length}'),
            icon: Icons.arrow_forward,
            onPressed: _startFromIntro,
          ),
        ],
      ),
    );
  }

  Widget _readingBlock(BuildContext context, String text, String? reading) =>
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            text,
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w900),
          ),
          if (reading?.isNotEmpty == true)
            Padding(
              padding: const EdgeInsets.only(top: 3),
              child: Text(
                reading!,
                style: const TextStyle(
                  color: AppTheme.contentAccentForeground,
                  fontWeight: FontWeight.w700,
                  fontSize: 12,
                ),
              ),
            ),
        ],
      );

  Widget _vocabCard(
    BuildContext context,
    LessonVocabCard item,
    String locale,
    String learningCode,
  ) {
    final example = item.exampleText;
    final exampleReading = item.exampleReading ?? item.exampleRomanization;
    final exampleTranslation = item.exampleTranslation;
    final reading = item.romanization ?? item.reading;
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppTheme.lessonBorderSubtle),
          color: AppTheme.lessonSurfaceElevated,
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
                  SpeakerButton(
                    speechText: item.speechText,
                    languageCode: learningCode,
                    uiLanguageCode: locale,
                  ),
                ],
              ),
              if (reading != null && reading.isNotEmpty) ...[
                const SizedBox(height: 6),
                Text(
                  '${L10n.text('vocabReading', locale)}: $reading',
                  style: const TextStyle(
                    color: AppTheme.contentAccentForeground,
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
                                  color: AppTheme.contentAccentForeground,
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
                                  color: AppTheme.contentAccentForeground,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                    SpeakerButton(
                      speechText: item.exampleSpeechText ?? example,
                      languageCode: learningCode,
                      uiLanguageCode: locale,
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
                showingIntro = _hasIntroContent(lesson);
                stepIndex = 0;
                introSectionIndex = 0;
                answered = false;
              }),
            ),
            const SizedBox(height: 10),
            AppButton(label: L10n.text('next', locale), onPressed: _nextLesson),
          ],
        ),
      );

  void _previous() {
    final lesson = widget.lesson!;
    if (stepIndex > 0) {
      setState(() {
        stepIndex--;
        answered = true;
      });
      return;
    }
    if (_hasIntroContent(lesson)) {
      setState(() {
        showingIntro = true;
        introSectionIndex = 0;
        answered = false;
      });
    }
  }

  Future<void> _startFromIntro() async {
    final lesson = widget.lesson!;
    if (lesson.exercises.isEmpty) {
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
      return;
    }

    await ref
        .read(profileProvider.notifier)
        .completeLessonStep(
          lessonId: lesson.id,
          stepId: 'intro',
          currentStepIndex: 0,
          lessonComplete: false,
          estimatedMinutes: 1,
        );
    if (!mounted) return;
    setState(() {
      showingIntro = false;
      stepIndex = 0;
      introSectionIndex = 0;
      answered = false;
    });
  }

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

  void _nextLesson() {
    final lessons = ref.read(lessonProvider);
    final currentId = widget.lesson!.id;
    final index = lessons.indexWhere((l) => l.id == currentId);
    if (index >= 0) {
      for (int i = index + 1; i < lessons.length; i++) {
        if (!lessons[i].comingSoon) {
          context.push('/learn/${lessons[i].id}');
          return;
        }
      }
    }
    _backToRoadmap(context);
  }
}
