import 'package:flutter/material.dart';

import '../../models/exercise.dart';
import '../common/app_button.dart';
import '../common/app_card.dart';
import '../common/app_text_field.dart';
import 'speaker_button.dart';

class ExerciseCard extends StatefulWidget {
  const ExerciseCard({
    super.key,
    required this.exercise,
    required this.nativeLanguageCode,
  });

  final Exercise exercise;
  final String nativeLanguageCode;

  @override
  State<ExerciseCard> createState() => _ExerciseCardState();
}

class _ExerciseCardState extends State<ExerciseCard> {
  String? selectedAnswer;
  String typedAnswer = '';
  Map<String, String> pairAnswers = {};
  bool? correct;

  @override
  Widget build(BuildContext context) {
    final exercise = widget.exercise;
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  exercise.prompt,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
              if (exercise.speechText != null)
                SpeakerButton(speechText: exercise.speechText!),
            ],
          ),
          if (exercise.displayText != null) ...[
            const SizedBox(height: 12),
            Text(
              exercise.displayText!,
              style: Theme.of(
                context,
              ).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w900),
            ),
          ],
          const SizedBox(height: 16),
          _buildAnswerArea(context),
          const SizedBox(height: 16),
          AppButton(label: 'Check answer', onPressed: _check),
          if (correct != null) ...[
            const SizedBox(height: 12),
            Text(
              correct! ? 'Correct' : 'Not quite',
              style: TextStyle(
                color: correct!
                    ? Colors.greenAccent
                    : Theme.of(context).colorScheme.error,
                fontWeight: FontWeight.w900,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildAnswerArea(BuildContext context) {
    final exercise = widget.exercise;
    if (exercise.type == ExerciseType.matchPairs) {
      final pairs = exercise.localizedPairs(widget.nativeLanguageCode);
      final rights = pairs.map((pair) => pair.right).toList();
      return Column(
        children: [
          for (final pair in pairs)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      pair.left,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      initialValue: pairAnswers[pair.left],
                      items: rights
                          .map(
                            (right) => DropdownMenuItem(
                              value: right,
                              child: Text(right),
                            ),
                          )
                          .toList(),
                      onChanged: (value) => setState(() {
                        if (value != null) pairAnswers[pair.left] = value;
                      }),
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.swap_horiz),
                        hintText: 'Match',
                      ),
                    ),
                  ),
                ],
              ),
            ),
        ],
      );
    }

    if (exercise.type == ExerciseType.typeAnswer ||
        exercise.type == ExerciseType.fillBlank) {
      return AppTextField(
        hint: widget.nativeLanguageCode == 'vi'
            ? 'Nhập câu trả lời'
            : 'Type your answer',
        onChanged: (value) => typedAnswer = value,
      );
    }

    final options = exercise.localizedOptions(widget.nativeLanguageCode);
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        for (final option in options)
          ChoiceChip(
            label: Text(option),
            selected: selectedAnswer == option,
            onSelected: (_) => setState(() => selectedAnswer = option),
          ),
      ],
    );
  }

  void _check() {
    final exercise = widget.exercise;
    final Object answer = switch (exercise.type) {
      ExerciseType.matchPairs => pairAnswers,
      ExerciseType.typeAnswer || ExerciseType.fillBlank => typedAnswer,
      _ => selectedAnswer ?? '',
    };
    setState(() => correct = exercise.check(answer, widget.nativeLanguageCode));
  }
}
