import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../../models/exercise.dart';
import '../../core/utils/localization.dart';
import '../common/app_button.dart';
import '../common/app_card.dart';
import '../common/app_text_field.dart';
import '../learn/exercise_option_style.dart';
import 'speaker_button.dart';

class ExerciseCard extends StatefulWidget {
  const ExerciseCard({
    super.key,
    required this.exercise,
    required this.nativeLanguageCode,
    this.learningLanguageCode = 'ja',
    this.onChecked,
  });

  final Exercise exercise;
  final String nativeLanguageCode;
  final String learningLanguageCode;
  final ValueChanged<bool>? onChecked;

  @override
  State<ExerciseCard> createState() => _ExerciseCardState();
}

class _ExerciseCardState extends State<ExerciseCard> {
  String? selectedAnswer;
  String typedAnswer = '';
  Map<String, String> pairAnswers = {};
  bool? correct;
  int subQuestionIndex = 0;
  String? subQuestionAnswer;
  bool? subQuestionCorrect;
  final List<bool> subQuestionResults = [];
  String? selectedLeft;
  String? selectedRight;
  late List<String> shuffledRights;
  String? matchFeedback;
  final List<String> arrangedTiles = [];

  @override
  void initState() {
    super.initState();
    final pairs = widget.exercise.localizedPairs(widget.nativeLanguageCode);
    shuffledRights = pairs.map((pair) => pair.right).toList()..shuffle();
  }

  @override
  void didUpdateWidget(covariant ExerciseCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.exercise.id != widget.exercise.id) {
      final pairs = widget.exercise.localizedPairs(widget.nativeLanguageCode);
      shuffledRights = pairs.map((pair) => pair.right).toList()..shuffle();
      pairAnswers = {};
      selectedLeft = null;
      selectedRight = null;
      matchFeedback = null;
      correct = null;
      arrangedTiles.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    final exercise = widget.exercise;
    final locale = widget.nativeLanguageCode;
    if (exercise.type == ExerciseType.characterCard) {
      return _buildCharacterCardExercise(context, exercise, locale);
    }
    if (exercise.type == ExerciseType.plusListeningVocabularyChallenge) {
      return _buildPlusListeningVocabularyChallenge(context, exercise, locale);
    }
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  exercise.localizedPrompt(widget.nativeLanguageCode),
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                    color: AppTheme.questionForeground,
                  ),
                ),
              ),
              if (exercise.speechText != null)
                SpeakerButton(
                  speechText: exercise.speechText!,
                  languageCode: widget.learningLanguageCode,
                  uiLanguageCode: widget.nativeLanguageCode,
                  hideLabel:
                      exercise.hideSpeechLabel ||
                      exercise.type == ExerciseType.listenAndChoose ||
                      exercise.type == ExerciseType.listeningGapFill,
                ),
            ],
          ),
          if (exercise.localizedInstruction(locale).isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              exercise.localizedInstruction(locale),
              style: Theme.of(
                context,
            ).textTheme.bodyMedium?.copyWith(color: Colors.white70),
            ),
          ],
          if (exercise.displayText != null &&
              !(exercise.hideSpeechLabel &&
                  exercise.displayText == exercise.correctAnswer)) ...[
            const SizedBox(height: 12),
            Text(
              exercise.type == ExerciseType.listenAndChoose &&
                      (exercise.displayText == '🎧' ||
                          exercise.displayText == '🔊' ||
                          exercise.audioCardLabel != null ||
                          exercise.audioCardLabelByNative.isNotEmpty)
                  ? exercise.localizedAudioCardLabel(locale)
                  : exercise.localizedDisplayText(locale).isNotEmpty
                  ? exercise.localizedDisplayText(locale)
                  : exercise.displayText!,
              style: Theme.of(
                context,
              ).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w900),
            ),
          ],
          const SizedBox(height: 16),
          _buildAnswerArea(context),
          const SizedBox(height: 16),
          AppButton(label: L10n.text('checkAnswer', locale), onPressed: _check),
          if (correct != null) ...[
            const SizedBox(height: 12),
            Text(
              exercise.localizedFeedback(locale, correct!).isNotEmpty
                  ? exercise.localizedFeedback(locale, correct!)
                  : correct!
                  ? L10n.text('correct', locale)
                  : L10n.text('notQuite', locale),
              style: TextStyle(
                color: correct!
                    ? Colors.greenAccent
                    : Theme.of(context).colorScheme.error,
                fontWeight: FontWeight.w900,
              ),
            ),
            if (exercise.localizedReveal(locale).isNotEmpty) ...[
              const SizedBox(height: 10),
              DecoratedBox(
                decoration: BoxDecoration(
                  color: const Color(0x1A22D3EE),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: const Color(0x3322D3EE)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          exercise.localizedReveal(locale),
                          style: const TextStyle(fontWeight: FontWeight.w800),
                        ),
                      ),
                      if (exercise.speechText != null)
                        SpeakerButton(
                          speechText: exercise.speechText!,
                          languageCode: widget.learningLanguageCode,
                          uiLanguageCode: locale,
                        ),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ],
      ),
    );
  }

  Widget _buildCharacterCardExercise(
    BuildContext context,
    Exercise exercise,
    String locale,
  ) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            exercise.localizedPrompt(locale),
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 14),
          for (final card in exercise.cards)
            Padding(
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
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  card.character,
                                  style: Theme.of(context)
                                      .textTheme
                                      .displaySmall
                                      ?.copyWith(fontWeight: FontWeight.w900),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  card.reading,
                                  style: const TextStyle(
                                    color: Color(0xFF67E8F9),
                                    fontWeight: FontWeight.w900,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SpeakerButton(
                            speechText: card.speechText,
                            uiLanguageCode: locale,
                            label: card.localizedAudioLabel(locale),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        card.example,
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                      if (card.exampleRomanization?.isNotEmpty == true)
                        Padding(
                          padding: const EdgeInsets.only(top: 4),
                          child: Text(
                            card.exampleRomanization!,
                            style: const TextStyle(
                              color: Color(0xFFA5F3FC),
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      if (card.localizedMeaning(locale).isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(top: 4),
                          child: Text(card.localizedMeaning(locale)),
                        ),
                      if (card.localizedFeedback(locale).isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Text(
                            card.localizedFeedback(locale),
                            style: const TextStyle(height: 1.45),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          AppButton(
            label: correct == true
                ? L10n.text('correct', locale)
                : L10n.text('checkAnswer', locale),
            icon: Icons.check,
            onPressed: correct == true
                ? null
                : () {
                    setState(() => correct = true);
                    widget.onChecked?.call(true);
                  },
          ),
        ],
      ),
    );
  }

  Widget _buildPlusListeningVocabularyChallenge(
    BuildContext context,
    Exercise exercise,
    String locale,
  ) {
    final subQuestions = exercise.subQuestions;
    if (subQuestions.isEmpty) {
      return AppCard(child: Text(L10n.text('comingSoon', locale)));
    }
    final question = subQuestions[subQuestionIndex];
    final answered = subQuestionCorrect != null;
    final isLast = subQuestionIndex == subQuestions.length - 1;
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            exercise.localizedPrompt(locale),
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 8),
          Text(
            'Plus · ${subQuestionIndex + 1}/${subQuestions.length}',
            style: const TextStyle(
              color: Color(0xFFFBBF24),
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 14),
          DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0x3340E0D0)),
              color: const Color(0x1400BCD4),
            ),
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  SpeakerButton(
                    speechText: question.speechText,
                    uiLanguageCode: locale,
                    hideLabel: question.hideSpeechLabel,
                    label: question.localizedAudioCardLabel(locale),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      question.localizedVisibleBeforeAnswer(locale),
                      style: const TextStyle(fontWeight: FontWeight.w900),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            question.localizedPrompt(locale),
            style: const TextStyle(color: AppTheme.questionForeground),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              for (final option in question.options)
                ChoiceChip(
                  label: Text(option),
                  selected: subQuestionAnswer == option,
                  labelStyle: ExerciseOptionStyle.labelStyle(
                    answered
                        ? ExerciseOptionVisualState.disabled
                        : subQuestionAnswer == option
                        ? ExerciseOptionVisualState.selected
                        : ExerciseOptionVisualState.available,
                  ),
                  color: ExerciseOptionStyle.background(
                    answered
                        ? ExerciseOptionVisualState.disabled
                        : subQuestionAnswer == option
                        ? ExerciseOptionVisualState.selected
                        : ExerciseOptionVisualState.available,
                  ),
                  side: BorderSide(
                    color: ExerciseOptionStyle.borderFor(
                      answered
                          ? ExerciseOptionVisualState.disabled
                          : subQuestionAnswer == option
                          ? ExerciseOptionVisualState.selected
                          : ExerciseOptionVisualState.available,
                    ),
                  ),
                  onSelected: answered
                      ? null
                      : (_) => setState(() => subQuestionAnswer = option),
                ),
            ],
          ),
          const SizedBox(height: 16),
          if (!answered)
            AppButton(
              label: L10n.text('checkAnswer', locale),
              icon: Icons.check,
              onPressed: subQuestionAnswer == null
                  ? null
                  : () {
                      setState(() {
                        subQuestionCorrect = question.check(
                          subQuestionAnswer ?? '',
                        );
                      });
                    },
            )
          else ...[
            DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: subQuestionCorrect == true
                      ? Colors.greenAccent.withValues(alpha: 0.3)
                      : Theme.of(
                          context,
                        ).colorScheme.error.withValues(alpha: 0.3),
                ),
                color: subQuestionCorrect == true
                    ? Colors.greenAccent.withValues(alpha: 0.08)
                    : Theme.of(
                        context,
                      ).colorScheme.error.withValues(alpha: 0.08),
              ),
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (question.localizedRevealAfterAnswer(locale).isNotEmpty)
                      Text(
                        question.localizedRevealAfterAnswer(locale),
                        style: const TextStyle(fontWeight: FontWeight.w900),
                      ),
                    finalFeedbackText(context, question, locale),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            AppButton(
              label: isLast
                  ? L10n.text('next', locale)
                  : L10n.text('next', locale),
              icon: Icons.arrow_forward,
              onPressed: () {
                if (isLast) {
                  final allResults = [
                    ...subQuestionResults,
                    subQuestionCorrect == true,
                  ];
                  widget.onChecked?.call(allResults.every((item) => item));
                  return;
                }
                setState(() {
                  subQuestionResults.add(subQuestionCorrect == true);
                  subQuestionIndex += 1;
                  subQuestionAnswer = null;
                  subQuestionCorrect = null;
                });
              },
            ),
          ],
        ],
      ),
    );
  }

  Widget finalFeedbackText(
    BuildContext context,
    ExerciseSubQuestion question,
    String locale,
  ) {
    final feedback = question.localizedFeedback(
      locale,
      subQuestionCorrect == true,
    );
    if (feedback.isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        feedback,
        style: TextStyle(
          color: subQuestionCorrect == true
              ? Colors.greenAccent
              : Theme.of(context).colorScheme.error,
          fontWeight: FontWeight.w800,
          height: 1.45,
        ),
      ),
    );
  }

  Widget _buildAnswerArea(BuildContext context) {
    final exercise = widget.exercise;
    final locale = widget.nativeLanguageCode;
    if (exercise.type == ExerciseType.arrangeWords ||
        exercise.type == ExerciseType.arrangeLetters) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            constraints: const BoxConstraints(minHeight: 58),
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.white24),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (var i = 0; i < arrangedTiles.length; i++)
                  InputChip(
                    label: Text(arrangedTiles[i]),
                    onDeleted: () => setState(() => arrangedTiles.removeAt(i)),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (var i = 0; i < exercise.tiles.length; i++)
                if (_usedCount(exercise.tiles[i]) <
                    exercise.tiles
                        .take(i + 1)
                        .where((tile) => tile == exercise.tiles[i])
                        .length)
                  ActionChip(
                    label: Text(exercise.tiles[i]),
                    onPressed: () =>
                        setState(() => arrangedTiles.add(exercise.tiles[i])),
                  ),
            ],
          ),
        ],
      );
    }
    if (exercise.type == ExerciseType.matchPairs) {
      final pairs = exercise.localizedPairs(widget.nativeLanguageCode);
      final matched = pairAnswers.keys.toSet();
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  children: [
                    for (final pair in pairs)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: _MatchChip(
                          label: pair.left,
                          selected: selectedLeft == pair.left,
                          matched: matched.contains(pair.left),
                          onTap: matched.contains(pair.left)
                              ? null
                              : () => _onMatchLeftTap(pair.left),
                        ),
                      ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  children: [
                    for (final right in shuffledRights)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: _MatchChip(
                          label: right,
                          selected: selectedRight == right,
                          matched: pairAnswers.values.contains(right),
                          onTap: pairAnswers.values.contains(right)
                              ? null
                              : () => _onMatchRightTap(right, pairs),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
          if (matchFeedback != null) ...[
            const SizedBox(height: 8),
            Text(
              matchFeedback!,
              style: TextStyle(
                color: correct == true
                    ? const Color(0xFF34D399)
                    : const Color(0xFFF87171),
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ],
      );
    }

    if (exercise.type == ExerciseType.typeAnswer ||
        exercise.type == ExerciseType.fillBlank ||
        exercise.type == ExerciseType.listeningGapFill ||
        exercise.type == ExerciseType.controlledAiQa) {
      final options = exercise.localizedOptions(widget.nativeLanguageCode);
      // Foundation fill/sequence drills provide options — show them as choices.
      if (options.length >= 2 &&
          exercise.type != ExerciseType.controlledAiQa &&
          exercise.type != ExerciseType.listeningGapFill) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final option in options)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: OutlinedButton(
                  onPressed: () => setState(() => selectedAnswer = option),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: selectedAnswer == option
                        ? const Color(0x3340E0D0)
                        : null,
                  ),
                  child: Text(option),
                ),
              ),
          ],
        );
      }
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (exercise.plusOnly)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Text(
                L10n.text('plusAdvancedBadge', locale),
                style: const TextStyle(
                  color: Color(0xFFFBBF24),
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          if (exercise.type == ExerciseType.controlledAiQa) ...[
            Text(
              L10n.text('aiReviewHelper', locale),
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 10),
          ],
          AppTextField.answer(
            hint: L10n.text('answerHint', locale),
            onChanged: (value) => typedAnswer = value,
          ),
        ],
      );
    }

    if (exercise.type == ExerciseType.aiFeedbackReview) {
      final reviewText = exercise.localizedDisplayText(locale);
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            L10n.text('plusAiReviewTitle', locale),
            style: const TextStyle(
              color: Color(0xFFFBBF24),
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 10),
          if (reviewText.isNotEmpty)
            Text(
              reviewText,
              style: const TextStyle(fontWeight: FontWeight.w700),
            )
          else
            Text(L10n.text('aiFeedbackReuseHelper', locale)),
        ],
      );
    }

    final options = exercise.localizedOptions(widget.nativeLanguageCode);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (exercise.plusOnly)
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Text(
              L10n.text('plusAdvancedBadge', locale),
              style: const TextStyle(
                color: Color(0xFFFBBF24),
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            for (final option in options)
              ChoiceChip(
                label: Text(option),
                selected: selectedAnswer == option,
                labelStyle: ExerciseOptionStyle.labelStyle(
                  selectedAnswer == option
                      ? ExerciseOptionVisualState.selected
                      : ExerciseOptionVisualState.available,
                ),
                color: ExerciseOptionStyle.background(
                  selectedAnswer == option
                      ? ExerciseOptionVisualState.selected
                      : ExerciseOptionVisualState.available,
                ),
                side: BorderSide(
                  color: ExerciseOptionStyle.borderFor(
                    selectedAnswer == option
                        ? ExerciseOptionVisualState.selected
                        : ExerciseOptionVisualState.available,
                  ),
                ),
                onSelected: (_) => setState(() => selectedAnswer = option),
              ),
          ],
        ),
      ],
    );
  }

  void _check() {
    final exercise = widget.exercise;
    final options = exercise.localizedOptions(widget.nativeLanguageCode);
    final usesOptionChoices =
        options.length >= 2 &&
        (exercise.type == ExerciseType.fillBlank ||
            exercise.type == ExerciseType.typeAnswer);
    final Object answer = switch (exercise.type) {
      ExerciseType.matchPairs => pairAnswers,
      ExerciseType.typeAnswer ||
      ExerciseType.fillBlank when usesOptionChoices => selectedAnswer ?? '',
      ExerciseType.typeAnswer ||
      ExerciseType.fillBlank ||
      ExerciseType.listeningGapFill ||
      ExerciseType.controlledAiQa => typedAnswer,
      ExerciseType.aiFeedbackReview => 'reviewed',
      ExerciseType.arrangeWords => arrangedTiles.join(' '),
      ExerciseType.arrangeLetters => arrangedTiles.join(),
      _ => selectedAnswer ?? '',
    };
    final result = exercise.type == ExerciseType.aiFeedbackReview
        ? true
        : exercise.check(answer, widget.nativeLanguageCode);
    setState(() => correct = result);
    widget.onChecked?.call(result);
  }

  int _usedCount(String tile) =>
      arrangedTiles.where((item) => item == tile).length;

  void _onMatchLeftTap(String left) {
    setState(() {
      selectedLeft = left;
      selectedRight = null;
      matchFeedback = null;
    });
  }

  void _onMatchRightTap(String right, List<MatchPair> pairs) {
    final left = selectedLeft;
    if (left == null) {
      setState(() => selectedRight = right);
      return;
    }
    final expected = pairs.firstWhere(
      (pair) => pair.left == left,
      orElse: () => MatchPair(left: left, right: ''),
    );
    final isCorrect = expected.right == right;
    setState(() {
      selectedRight = right;
      if (isCorrect) {
        pairAnswers[left] = right;
        selectedLeft = null;
        selectedRight = null;
        matchFeedback = widget.exercise.localizedFeedback(
          widget.nativeLanguageCode,
          true,
        );
        if (pairAnswers.length == pairs.length) {
          correct = true;
          widget.onChecked?.call(true);
        }
      } else {
        matchFeedback = widget.exercise.localizedFeedback(
          widget.nativeLanguageCode,
          false,
        );
        correct = false;
      }
    });
  }
}

class _MatchChip extends StatelessWidget {
  const _MatchChip({
    required this.label,
    required this.selected,
    required this.matched,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final bool matched;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final accent = matched
        ? const Color(0xFF34D399)
        : selected
        ? const Color(0xFF22D3EE)
        : Colors.white24;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 160),
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: accent,
              width: selected || matched ? 2 : 1,
            ),
            color: matched
                ? const Color(0x2234D399)
                : selected
                ? const Color(0x3322D3EE)
                : Colors.white.withValues(alpha: 0.05),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 18,
              color: matched ? const Color(0xFFA7F3D0) : Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
