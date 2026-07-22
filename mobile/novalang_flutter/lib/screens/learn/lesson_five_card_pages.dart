import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/localization.dart';
import '../../models/lesson.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/speaker_button.dart';
import 'exercises/five_card_exercise_flow.dart';

enum LessonFiveCardSection {
  introduction,
  vocabulary,
  dialogue,
  grammar,
  exercise,
}

Map<String, dynamic> _map(dynamic value) => value is Map
    ? value.map((key, item) => MapEntry(key.toString(), item))
    : const <String, dynamic>{};

List<dynamic> _list(dynamic value) => value is List ? value : const [];

String _text(dynamic value) => value?.toString() ?? '';

class LessonFiveCardMenu extends StatelessWidget {
  const LessonFiveCardMenu({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
    required this.learningLanguageCode,
    required this.vocabularyExpandedIds,
    required this.onVocabularyExpansionChanged,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String nativeLanguageCode;
  final String learningLanguageCode;
  final Set<String> vocabularyExpandedIds;
  final ValueChanged<String> onVocabularyExpansionChanged;

  @override
  Widget build(BuildContext context) {
    final items = <_MenuItem>[
      _MenuItem(
        section: LessonFiveCardSection.introduction,
        titleKey: 'lessonIntro',
        japaneseLabelKey: 'lessonSectionIntroJapanese',
        descriptionKey: 'lessonMenuIntroDescription',
        icon: Icons.menu_book_outlined,
        tint: const Color(0xFF22D3EE),
      ),
      _MenuItem(
        section: LessonFiveCardSection.vocabulary,
        titleKey: 'lessonVocabCardsSection',
        japaneseLabelKey: 'lessonSectionVocabularyJapanese',
        descriptionKey: 'lessonMenuVocabularyDescription',
        icon: Icons.style_outlined,
        tint: const Color(0xFFC4B5FD),
      ),
      _MenuItem(
        section: LessonFiveCardSection.dialogue,
        titleKey: 'learnMiniDialogue',
        japaneseLabelKey: 'lessonSectionDialogueJapanese',
        descriptionKey: 'lessonMenuDialogueDescription',
        icon: Icons.chat_bubble_outline,
        tint: const Color(0xFFF0ABFC),
      ),
      _MenuItem(
        section: LessonFiveCardSection.grammar,
        titleKey: 'learnGrammarPatterns',
        japaneseLabelKey: 'lessonSectionGrammarJapanese',
        descriptionKey: 'lessonMenuGrammarDescription',
        icon: Icons.account_tree_outlined,
        tint: const Color(0xFFFDE68A),
      ),
      _MenuItem(
        section: LessonFiveCardSection.exercise,
        titleKey: 'practiceExercises',
        japaneseLabelKey: 'lessonSectionExerciseJapanese',
        descriptionKey: 'lessonMenuExerciseDescription',
        icon: Icons.playlist_add_check_outlined,
        tint: const Color(0xFF86EFAC),
      ),
    ];

    return AppScaffold(
      title: lesson.localizedTitle(nativeLanguageCode),
      showBack: true,
      backPath: '/learn',
      languageCode: uiLanguageCode,
      selectedNavIndex: 0,
      child: ResponsivePage(
        pageStorageKey: PageStorageKey('five-card-menu-${lesson.id}'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              lesson.localizedTitle(nativeLanguageCode),
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 16),
            for (final item in items)
              Padding(
                padding: const EdgeInsets.only(bottom: 14),
                child: _MenuCard(
                  item: item,
                  uiLanguageCode: uiLanguageCode,
                  onTap: () => _openSection(context, item.section),
                ),
              ),
          ],
        ),
      ),
    );
  }

  void _openSection(BuildContext context, LessonFiveCardSection section) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => switch (section) {
          LessonFiveCardSection.introduction => LessonIntroductionPage(
            lesson: lesson,
            uiLanguageCode: uiLanguageCode,
            nativeLanguageCode: nativeLanguageCode,
          ),
          LessonFiveCardSection.vocabulary => LessonVocabularyPage(
            lesson: lesson,
            uiLanguageCode: uiLanguageCode,
            nativeLanguageCode: nativeLanguageCode,
            learningLanguageCode: learningLanguageCode,
            expandedCardIds: vocabularyExpandedIds,
            onExpansionChanged: onVocabularyExpansionChanged,
          ),
          LessonFiveCardSection.dialogue => LessonDialoguePage(
            lesson: lesson,
            uiLanguageCode: uiLanguageCode,
            nativeLanguageCode: nativeLanguageCode,
            learningLanguageCode: learningLanguageCode,
          ),
          LessonFiveCardSection.grammar => LessonGrammarPage(
            lesson: lesson,
            uiLanguageCode: uiLanguageCode,
            nativeLanguageCode: nativeLanguageCode,
          ),
          LessonFiveCardSection.exercise => FiveCardExerciseLandingPage(
            lesson: lesson,
            uiLanguageCode: uiLanguageCode,
            nativeLanguageCode: nativeLanguageCode,
            learningLanguageCode: learningLanguageCode,
          ),
        },
      ),
    );
  }
}

class _MenuItem {
  const _MenuItem({
    required this.section,
    required this.titleKey,
    required this.japaneseLabelKey,
    required this.descriptionKey,
    required this.icon,
    required this.tint,
  });

  final LessonFiveCardSection section;
  final String titleKey;
  final String japaneseLabelKey;
  final String descriptionKey;
  final IconData icon;
  final Color tint;
}

class _MenuCard extends StatelessWidget {
  const _MenuCard({
    required this.item,
    required this.uiLanguageCode,
    required this.onTap,
  });

  final _MenuItem item;
  final String uiLanguageCode;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Material(
    color: Colors.transparent,
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Ink(
        decoration: BoxDecoration(
          color: item.tint.withValues(alpha: 0.08),
          border: Border.all(color: item.tint.withValues(alpha: 0.22)),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              DecoratedBox(
                decoration: BoxDecoration(
                  color: item.tint.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Icon(item.icon, color: item.tint, size: 28),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      L10n.text(item.titleKey, uiLanguageCode),
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      L10n.text(item.japaneseLabelKey, uiLanguageCode),
                      style: TextStyle(
                        color: item.tint,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      L10n.text(item.descriptionKey, uiLanguageCode),
                      style: const TextStyle(
                        color: AppTheme.contentSecondaryForeground,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 14),
              const ExcludeSemantics(
                child: Icon(Icons.chevron_right, size: 24),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

class LessonIntroductionPage extends StatelessWidget {
  const LessonIntroductionPage({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String nativeLanguageCode;

  @override
  Widget build(BuildContext context) {
    final content = lesson.localizedFiveCardContent(nativeLanguageCode);
    final intro = _map(content['intro']);
    return AppScaffold(
      title: L10n.text('lessonIntro', uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      selectedNavIndex: 0,
      child: ResponsivePage(
        pageStorageKey: PageStorageKey('five-card-intro-${lesson.id}'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _ContentPanel(
              title: L10n.text('goalLabel', uiLanguageCode),
              icon: Icons.flag_outlined,
              child: _BulletList(_list(intro['objectives'])),
            ),
            _ContentPanel(
              title: L10n.text('situationLabel', uiLanguageCode),
              icon: Icons.place_outlined,
              child: Text(
                _list(intro['situation']).join('\n'),
                style: const TextStyle(height: 1.45),
              ),
            ),
            _ContentPanel(
              title: L10n.text('afterLessonCanDo', uiLanguageCode),
              icon: Icons.check_circle_outline,
              child: Text(
                lesson.localizedDescription(nativeLanguageCode),
                style: const TextStyle(height: 1.45),
              ),
            ),
            _ContentPanel(
              title: L10n.text('todayLearn', uiLanguageCode),
              icon: Icons.auto_stories_outlined,
              child: _BulletList(
                lesson.vocabulary.map((item) => item.displayText).toList(),
              ),
            ),
            _ContentPanel(
              title: L10n.text('shortNote', uiLanguageCode),
              icon: Icons.info_outline,
              child: _BulletList(_list(intro['importantNote'])),
            ),
          ],
        ),
      ),
    );
  }
}

class LessonVocabularyPage extends StatefulWidget {
  const LessonVocabularyPage({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
    required this.learningLanguageCode,
    required this.expandedCardIds,
    required this.onExpansionChanged,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String nativeLanguageCode;
  final String learningLanguageCode;
  final Set<String> expandedCardIds;
  final ValueChanged<String> onExpansionChanged;

  @override
  State<LessonVocabularyPage> createState() => _LessonVocabularyPageState();
}

class _LessonVocabularyPageState extends State<LessonVocabularyPage> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final content = widget.lesson.localizedFiveCardContent(
      widget.nativeLanguageCode,
    );
    final details = _list(content['vocabularyDetails']).map(_map).toList();
    return AppScaffold(
      title: L10n.text('lessonVocabCardsSection', widget.uiLanguageCode),
      showBack: true,
      languageCode: widget.uiLanguageCode,
      selectedNavIndex: 0,
      child: ResponsivePage(
        scrollable: false,
        bottomPadding: 0,
        child: CustomScrollView(
          key: PageStorageKey('five-card-vocabulary-${widget.lesson.id}'),
          controller: _scrollController,
          primary: false,
          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
          slivers: [
            for (
              var index = 0;
              index < widget.lesson.vocabulary.length;
              index++
            )
              SliverMainAxisGroup(
                slivers: [
                  SliverPersistentHeader(
                    pinned: true,
                    delegate: _VocabularyStickyHeaderDelegate(
                      child: _VocabularyCardHeader(
                        item: widget.lesson.vocabulary[index],
                        uiLanguageCode: widget.uiLanguageCode,
                        learningLanguageCode: widget.learningLanguageCode,
                        expanded: widget.expandedCardIds.contains(
                          widget.lesson.vocabulary[index].displayText,
                        ),
                        onToggle: () {
                          widget.onExpansionChanged(
                            widget.lesson.vocabulary[index].displayText,
                          );
                          setState(() {});
                        },
                      ),
                    ),
                  ),
                  if (widget.expandedCardIds.contains(
                    widget.lesson.vocabulary[index].displayText,
                  ))
                    SliverToBoxAdapter(
                      child: _VocabularyDetails(
                        item: widget.lesson.vocabulary[index],
                        details: details.length > index
                            ? details[index]
                            : const {},
                        uiLanguageCode: widget.uiLanguageCode,
                        learningLanguageCode: widget.learningLanguageCode,
                      ),
                    ),
                  const SliverToBoxAdapter(child: SizedBox(height: 12)),
                ],
              ),
            SliverToBoxAdapter(
              child: _VocabularyReferencesSection(
                references: _list(content['vocabularyReferences']),
                uiLanguageCode: widget.uiLanguageCode,
                learningLanguageCode: widget.learningLanguageCode,
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 24)),
          ],
        ),
      ),
    );
  }
}

class _VocabularyStickyHeaderDelegate extends SliverPersistentHeaderDelegate {
  const _VocabularyStickyHeaderDelegate({required this.child});

  static const double extent = 64;
  final Widget child;

  @override
  double get minExtent => extent;

  @override
  double get maxExtent => extent;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return ColoredBox(
      color: AppTheme.scaffoldBackground,
      child: SizedBox.expand(child: child),
    );
  }

  @override
  bool shouldRebuild(_VocabularyStickyHeaderDelegate oldDelegate) => true;
}

class _VocabularyCardHeader extends StatelessWidget {
  const _VocabularyCardHeader({
    required this.item,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
    required this.expanded,
    required this.onToggle,
  });

  final LessonVocabCard item;
  final String uiLanguageCode;
  final String learningLanguageCode;
  final bool expanded;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: '${item.displayText}, ${item.meaning}',
      child: DecoratedBox(
        key: ValueKey('lesson-vocabulary-surface-${item.displayText}'),
        decoration: BoxDecoration(
          color: AppTheme.lessonSurface,
          border: Border.all(color: AppTheme.lessonBorderSubtle),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Material(
          color: Colors.transparent,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    item.displayText,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                SpeakerButton(
                  key: ValueKey('lesson-vocabulary-audio-${item.displayText}'),
                  speechText: item.speechText,
                  languageCode: learningLanguageCode,
                  uiLanguageCode: uiLanguageCode,
                ),
                IconButton(
                  key: ValueKey('lesson-vocabulary-toggle-${item.displayText}'),
                  tooltip: L10n.text(
                    expanded ? 'hideDetails' : 'showDetails',
                    uiLanguageCode,
                  ),
                  onPressed: onToggle,
                  icon: Icon(
                    expanded
                        ? Icons.keyboard_arrow_up
                        : Icons.keyboard_arrow_down,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class LessonVocabularyCard extends StatelessWidget {
  const LessonVocabularyCard({
    super.key,
    required this.item,
    required this.details,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
    required this.expanded,
    required this.onToggle,
  });

  final LessonVocabCard item;
  final Map<String, dynamic> details;
  final String uiLanguageCode;
  final String learningLanguageCode;
  final bool expanded;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _VocabularyCardHeader(
          item: item,
          uiLanguageCode: uiLanguageCode,
          learningLanguageCode: learningLanguageCode,
          expanded: expanded,
          onToggle: onToggle,
        ),
        if (expanded)
          _VocabularyDetails(
            item: item,
            details: details,
            uiLanguageCode: uiLanguageCode,
            learningLanguageCode: learningLanguageCode,
          ),
      ],
    );
  }
}

class _VocabularyDetails extends StatelessWidget {
  const _VocabularyDetails({
    required this.item,
    required this.details,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
  });

  final LessonVocabCard item;
  final Map<String, dynamic> details;
  final String uiLanguageCode;
  final String learningLanguageCode;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    key: ValueKey('vocabulary-details-${item.displayText}'),
    decoration: BoxDecoration(
      color: AppTheme.lessonSurfaceElevated,
      border: Border.all(color: AppTheme.lessonBorderSubtle),
      borderRadius: const BorderRadius.vertical(bottom: Radius.circular(8)),
    ),
    child: Padding(
      padding: const EdgeInsets.fromLTRB(14, 8, 14, 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (item.meaning.isNotEmpty)
            _DetailList(
              title: L10n.text('vocabMeaning', uiLanguageCode),
              values: [item.meaning],
            ),
          if (item.reading?.isNotEmpty == true)
            _DetailList(
              title: L10n.text('vocabReading', uiLanguageCode),
              values: [item.reading!],
            ),
          if (item.romanization?.isNotEmpty == true)
            _DetailList(
              title: L10n.text('romanization', uiLanguageCode),
              values: [item.romanization!],
            ),
          if (_text(details['overview']).isNotEmpty)
            _Paragraph(value: _text(details['overview'])),
          _DetailList(
            title: L10n.text('whenToUse', uiLanguageCode),
            values: _list(details['timingAndContext']),
            uiLanguageCode: uiLanguageCode,
            optional: true,
          ),
          _DetailList(
            title: L10n.text('appropriateFor', uiLanguageCode),
            values: _list(details['appropriateFor']),
            uiLanguageCode: uiLanguageCode,
            optional: true,
          ),
          _DetailList(
            title: L10n.text('avoidUse', uiLanguageCode),
            values: _list(details['avoid']),
            uiLanguageCode: uiLanguageCode,
            optional: true,
          ),
          _DetailList(
            title: L10n.text('register', uiLanguageCode),
            values: [_text(details['register'])],
            uiLanguageCode: uiLanguageCode,
            optional: true,
          ),
          if (_text(details['casualIntro']).isNotEmpty) ...[
            _DetailList(
              title: _text(details['casualTitle']).isEmpty
                  ? L10n.text('otherExpressions', uiLanguageCode)
                  : _text(details['casualTitle']),
              values: const [],
            ),
            _Paragraph(value: _text(details['casualIntro'])),
          ],
          _DetailList(
            title: _text(details['casualTitle']).isEmpty
                ? L10n.text('otherExpressions', uiLanguageCode)
                : _text(details['casualTitle']),
            values: _list(details['casual']),
            showTitle: _text(details['casualIntro']).isEmpty,
            uiLanguageCode: uiLanguageCode,
            optional: _text(details['casualIntro']).isEmpty,
          ),
          _DetailList(
            title: L10n.text('importantNote', uiLanguageCode),
            values: _list(details['casualNotes']),
          ),
          _DetailList(
            title: L10n.text('explanation', uiLanguageCode),
            values: _list(details['notes']),
          ),
          if (_list(details['examples']).isNotEmpty)
            _DetailList(
              title: L10n.text('vocabExample', uiLanguageCode),
              values: const [],
            ),
          for (final raw in _list(details['examples']))
            _ExampleRow(
              value: _map(raw),
              uiLanguageCode: uiLanguageCode,
              learningLanguageCode: learningLanguageCode,
            ),
          SizedBox(
            key: ValueKey('vocabulary-details-end-${item.displayText}'),
            height: 0,
          ),
        ],
      ),
    ),
  );
}

class _Paragraph extends StatelessWidget {
  const _Paragraph({required this.value});

  final String value;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(top: 14),
    child: Text(value, style: const TextStyle(height: 1.45)),
  );
}

class LessonDialoguePage extends StatelessWidget {
  const LessonDialoguePage({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
    required this.learningLanguageCode,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String nativeLanguageCode;
  final String learningLanguageCode;

  @override
  Widget build(BuildContext context) {
    final groups = _list(
      lesson.localizedFiveCardContent(nativeLanguageCode)['dialogueGroups'],
    ).map(_map).toList();
    final characters = _list(
      lesson.localizedFiveCardContent(
        nativeLanguageCode,
      )['approvedCharacterNamePool'],
    ).map(_map).toList();
    return AppScaffold(
      title: L10n.text('learnMiniDialogue', uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      selectedNavIndex: 0,
      child: ResponsivePage(
        pageStorageKey: PageStorageKey('five-card-dialogue-${lesson.id}'),
        child: Column(
          children: [
            for (final group in groups)
              _DialoguePanel(
                group: group,
                characters: characters,
                uiLanguageCode: uiLanguageCode,
                learningLanguageCode: learningLanguageCode,
              ),
          ],
        ),
      ),
    );
  }
}

class LessonGrammarPage extends StatelessWidget {
  const LessonGrammarPage({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String nativeLanguageCode;

  @override
  Widget build(BuildContext context) {
    final content = lesson.localizedFiveCardContent(nativeLanguageCode);
    final patterns = _list(content['grammarPatterns']).map(_map).toList();
    return AppScaffold(
      title: L10n.text('learnGrammarPatterns', uiLanguageCode),
      showBack: true,
      languageCode: uiLanguageCode,
      selectedNavIndex: 0,
      child: ResponsivePage(
        pageStorageKey: PageStorageKey('five-card-grammar-${lesson.id}'),
        child: Column(
          children: [
            for (final pattern in patterns)
              _GrammarPanel(pattern: pattern, uiLanguageCode: uiLanguageCode),
            _ContentPanel(
              title: L10n.text('distinctions', uiLanguageCode),
              icon: Icons.compare_arrows_outlined,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final raw in _list(content['distinctions']))
                    _DetailList(
                      title: _text(_map(raw)['term']),
                      values: _list(_map(raw)['points']),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class LessonExercisePage extends StatelessWidget {
  const LessonExercisePage({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String nativeLanguageCode;

  @override
  Widget build(BuildContext context) => AppScaffold(
    title: L10n.text('practiceExercises', uiLanguageCode),
    showBack: true,
    languageCode: uiLanguageCode,
    selectedNavIndex: 0,
    child: ResponsivePage(
      pageStorageKey: PageStorageKey('five-card-exercise-${lesson.id}'),
      child: _ContentPanel(
        title: L10n.text('practiceExercises', uiLanguageCode),
        icon: Icons.info_outline,
        child: Text(
          _text(
            lesson.localizedFiveCardContent(
              nativeLanguageCode,
            )['practicePlaceholder'],
          ),
          style: const TextStyle(height: 1.45),
        ),
      ),
    ),
  );
}

class _ContentPanel extends StatelessWidget {
  const _ContentPanel({
    required this.title,
    required this.icon,
    required this.child,
  });

  final String title;
  final IconData icon;
  final Widget child;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: DecoratedBox(
      decoration: BoxDecoration(
        color: AppTheme.lessonSurface,
        border: Border.all(color: AppTheme.lessonBorderSubtle),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, size: 18, color: AppTheme.contentAccentForeground),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(fontWeight: FontWeight.w900),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            child,
          ],
        ),
      ),
    ),
  );
}

class _DialoguePanel extends StatelessWidget {
  const _DialoguePanel({
    required this.group,
    required this.characters,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
  });

  final Map<String, dynamic> group;
  final List<Map<String, dynamic>> characters;
  final String uiLanguageCode;
  final String learningLanguageCode;

  @override
  Widget build(BuildContext context) => _ContentPanel(
    title: _text(group['title']),
    icon: Icons.chat_bubble_outline,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          _text(group['situation']),
          style: const TextStyle(
            color: AppTheme.contentSecondaryForeground,
            height: 1.4,
          ),
        ),
        const SizedBox(height: 10),
        for (final raw in _list(group['lines']))
          _DialogueLine(
            line: _map(raw),
            characters: characters,
            uiLanguageCode: uiLanguageCode,
            learningLanguageCode: learningLanguageCode,
          ),
        _DetailList(
          title: L10n.text('explanation', uiLanguageCode),
          values: _list(group['explanation']),
        ),
      ],
    ),
  );
}

class _DialogueLine extends StatelessWidget {
  const _DialogueLine({
    required this.line,
    required this.characters,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
  });

  final Map<String, dynamic> line;
  final List<Map<String, dynamic>> characters;
  final String uiLanguageCode;
  final String learningLanguageCode;

  @override
  Widget build(BuildContext context) {
    final translation = _text(line['translation']);
    final character = characters
        .where((item) => _text(item['id']) == _text(line['speakerId']))
        .firstOrNull;
    final speakerName = _text(character?['displayName']);
    final speakerReading = _text(character?['audioName']);
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: AppTheme.lessonSurfaceElevated,
          border: Border.all(color: AppTheme.lessonBorderSubtle),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      speakerName,
                      style: const TextStyle(
                        color: AppTheme.dialogueSpeakerForeground,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    if (speakerReading.isNotEmpty)
                      Text(
                        speakerReading,
                        style: const TextStyle(
                          color: AppTheme.contentAccentForeground,
                          fontSize: 12,
                        ),
                      ),
                    const SizedBox(height: 4),
                    Text(
                      _text(line['targetText']),
                      style: const TextStyle(fontWeight: FontWeight.w800),
                    ),
                    if (_text(line['reading']).isNotEmpty)
                      Padding(
                        padding: const EdgeInsets.only(top: 3),
                        child: Text(
                          _text(line['reading']),
                          style: const TextStyle(
                            color: AppTheme.contentAccentForeground,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    if (translation.isNotEmpty)
                      Padding(
                        padding: const EdgeInsets.only(top: 4),
                        child: Text(
                          translation,
                          style: const TextStyle(
                            color: AppTheme.contentSecondaryForeground,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              SpeakerButton(
                speechText: _text(line['speechText']),
                languageCode: learningLanguageCode,
                uiLanguageCode: uiLanguageCode,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _GrammarPanel extends StatelessWidget {
  const _GrammarPanel({required this.pattern, required this.uiLanguageCode});

  final Map<String, dynamic> pattern;
  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) => _ContentPanel(
    title: _text(pattern['title']),
    icon: Icons.account_tree_outlined,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (_text(pattern['formula']).isNotEmpty) ...[
          _DetailList(
            title: L10n.text('formula', uiLanguageCode),
            values: [
              _text(pattern['formula']),
              _text(pattern['formulaReading']),
            ],
          ),
        ],
        if (_text(pattern['meaning']).isNotEmpty)
          _DetailList(
            title: L10n.text('vocabMeaning', uiLanguageCode),
            values: [_text(pattern['meaning'])],
          ),
        for (final raw in _list(pattern['examples']))
          _ExampleRow(
            value: _map(raw),
            uiLanguageCode: uiLanguageCode,
            learningLanguageCode: 'ja',
          ),
        _DetailList(
          title: L10n.text('whenToUse', uiLanguageCode),
          values: _list(pattern['whenToUse']),
        ),
        _DetailList(
          title: L10n.text('commonMistake', uiLanguageCode),
          values: _list(pattern['commonMistake']),
        ),
        _DetailList(
          title: L10n.text('importantNote', uiLanguageCode),
          values: _list(pattern['notes']),
        ),
        _DetailList(
          title: L10n.text('comparison', uiLanguageCode),
          values: _list(pattern['comparison']),
        ),
      ],
    ),
  );
}

class _ExampleRow extends StatelessWidget {
  const _ExampleRow({
    required this.value,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
  });

  final Map<String, dynamic> value;
  final String uiLanguageCode;
  final String learningLanguageCode;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(top: 10),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _text(value['text']),
                style: const TextStyle(fontWeight: FontWeight.w800),
              ),
              if (_text(value['reading']).isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 3),
                  child: Text(
                    _text(value['reading']),
                    style: const TextStyle(
                      color: AppTheme.contentAccentForeground,
                      fontSize: 12,
                    ),
                  ),
                ),
              if (_text(value['translation']).isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Text(
                    _text(value['translation']),
                    style: const TextStyle(
                      color: AppTheme.contentSecondaryForeground,
                    ),
                  ),
                ),
            ],
          ),
        ),
        SpeakerButton(
          speechText: _text(value['text']),
          languageCode: learningLanguageCode,
          uiLanguageCode: uiLanguageCode,
        ),
      ],
    ),
  );
}

class _VocabularyReferencesSection extends StatefulWidget {
  const _VocabularyReferencesSection({
    required this.references,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
  });

  final List<dynamic> references;
  final String uiLanguageCode;
  final String learningLanguageCode;

  @override
  State<_VocabularyReferencesSection> createState() =>
      _VocabularyReferencesSectionState();
}

class _VocabularyReferencesSectionState
    extends State<_VocabularyReferencesSection> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    final items = widget.references
        .map(_map)
        .where((item) => _text(item['term']).trim().isNotEmpty)
        .toList(growable: false);
    if (items.isEmpty) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 8),
      child: DecoratedBox(
        key: const ValueKey('vocabulary-references-section'),
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
                key: const ValueKey('vocabulary-references-toggle'),
                borderRadius: BorderRadius.circular(8),
                onTap: () => setState(() => _expanded = !_expanded),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 10,
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          L10n.text(
                            'vocabularyReferencesTitle',
                            widget.uiLanguageCode,
                          ),
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(fontWeight: FontWeight.w900),
                        ),
                      ),
                      Icon(
                        _expanded
                            ? Icons.keyboard_arrow_up
                            : Icons.keyboard_arrow_down,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            if (_expanded)
              Padding(
                padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
                child: Column(
                  children: [
                    for (var index = 0; index < items.length; index++) ...[
                      if (index > 0) const SizedBox(height: 10),
                      _VocabularyReferenceItem(
                        item: items[index],
                        index: index,
                        uiLanguageCode: widget.uiLanguageCode,
                        learningLanguageCode: widget.learningLanguageCode,
                      ),
                    ],
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _VocabularyReferenceItem extends StatelessWidget {
  const _VocabularyReferenceItem({
    required this.item,
    required this.index,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
  });

  final Map<String, dynamic> item;
  final int index;
  final String uiLanguageCode;
  final String learningLanguageCode;

  @override
  Widget build(BuildContext context) {
    final term = _text(item['term']);
    final reading = _text(item['reading']);
    final speechText = _text(item['speechText']);
    final meaning = _text(item['meaning']);
    final forWord = _text(item['forWord']);
    final forWho = _text(item['forWho']);
    final whenToUse = _text(item['whenToUse']);
    final difference = _text(item['difference']);

    return DecoratedBox(
      key: ValueKey('vocabulary-reference-item-$index'),
      decoration: BoxDecoration(
        color: AppTheme.lessonSurfaceElevated,
        border: Border.all(color: AppTheme.lessonBorderSubtle),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 10, 8, 12),
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
                        term,
                        style: Theme.of(context).textTheme.titleMedium
                            ?.copyWith(fontWeight: FontWeight.w900),
                      ),
                      if (reading.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(top: 2),
                          child: Text(
                            reading,
                            style: const TextStyle(
                              color: AppTheme.contentAccentForeground,
                              fontWeight: FontWeight.w700,
                              fontSize: 13,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
                if (speechText.isNotEmpty)
                  SpeakerButton(
                    key: ValueKey('vocabulary-reference-audio-$index'),
                    speechText: speechText,
                    languageCode: learningLanguageCode,
                    uiLanguageCode: uiLanguageCode,
                  ),
              ],
            ),
            if (meaning.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Text(meaning, style: const TextStyle(height: 1.4)),
              ),
            if (forWord.isNotEmpty)
              _ReferenceLabeledLine(
                label: L10n.text('referenceForWord', uiLanguageCode),
                value: forWord,
              ),
            if (forWho.isNotEmpty)
              _ReferenceLabeledLine(
                label: L10n.text('referenceForWho', uiLanguageCode),
                value: forWho,
              ),
            if (whenToUse.isNotEmpty)
              _ReferenceLabeledLine(
                label: L10n.text('referenceWhenToUse', uiLanguageCode),
                value: whenToUse,
              ),
            if (difference.isNotEmpty)
              _ReferenceLabeledLine(
                label: L10n.text('referenceDifference', uiLanguageCode),
                value: difference,
              ),
          ],
        ),
      ),
    );
  }
}

class _ReferenceLabeledLine extends StatelessWidget {
  const _ReferenceLabeledLine({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              color: AppTheme.contentAccentForeground,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(height: 1.4)),
        ],
      ),
    );
  }
}

class _DetailList extends StatelessWidget {
  const _DetailList({
    required this.title,
    required this.values,
    this.showTitle = true,
    this.uiLanguageCode,
    this.optional = false,
  });

  final String title;
  final List<dynamic> values;
  final bool showTitle;

  /// Required when [optional] is true so the empty-content placeholder can be
  /// resolved strictly from the current UI language.
  final String? uiLanguageCode;

  /// When true and there is no content, the section keeps its heading and
  /// renders a localized "no content" placeholder instead of a blank gap.
  final bool optional;

  @override
  Widget build(BuildContext context) {
    final nonEmpty = values
        .map(_text)
        .where((value) => value.trim().isNotEmpty)
        .toList();
    if (nonEmpty.isEmpty && !showTitle) return const SizedBox.shrink();
    // Optional support sections keep their heading and show a localized
    // placeholder rather than an empty section, a blank bullet, null, or [].
    if (nonEmpty.isEmpty && !optional) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(top: 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showTitle) ...[
            Text(
              title,
              style: const TextStyle(
                color: AppTheme.contentAccentForeground,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 5),
          ],
          if (nonEmpty.isEmpty && optional)
            Text(
              L10n.text('emptyContentPlaceholder', uiLanguageCode ?? 'en'),
              style: const TextStyle(
                color: AppTheme.contentSecondaryForeground,
                height: 1.4,
                fontStyle: FontStyle.italic,
              ),
            ),
          for (final value in nonEmpty)
            Padding(
              padding: const EdgeInsets.only(bottom: 5),
              child: value.endsWith(':') || value.startsWith('Nghĩa:\n')
                  ? Text(value, style: const TextStyle(height: 1.4))
                  : Text('• $value', style: const TextStyle(height: 1.4)),
            ),
        ],
      ),
    );
  }
}

class _BulletList extends StatelessWidget {
  const _BulletList(this.values);

  final List<dynamic> values;

  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      for (final value in values)
        Padding(
          padding: const EdgeInsets.only(bottom: 6),
          child: Text('• ${_text(value)}', style: const TextStyle(height: 1.4)),
        ),
    ],
  );
}
