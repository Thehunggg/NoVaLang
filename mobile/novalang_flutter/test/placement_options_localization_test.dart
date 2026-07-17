import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/data/japanese_course_data.dart';
import 'package:novalang_flutter/data/japanese_jlpt_seed.dart';
import 'package:novalang_flutter/models/exercise.dart';

/// Regression guard for the placement-test / legacy-exercise option
/// localization bug (screenshot: `⟦missing-content:exercise.p2.options:vi⟧`).
///
/// `Exercise.localizedOptions(locale)` returns a missing-content sentinel when
/// an exercise has multiple-choice options but no per-locale value for that
/// locale. The Japanese placement seed and the legacy fallback course data
/// hand-author `Exercise` objects; several `chooseReading`/`chooseMeaning`
/// questions have locale-neutral options (romaji / kana / Japanese script)
/// that must be shown as-authored in every UI language. Without an explicit
/// per-locale value those rendered the sentinel instead of the option.
bool _isSentinel(String value) => value.contains('⟦missing-content:');

void _expectNoSentinelOptions(
  List<Exercise> exercises,
  String label,
) {
  // vi and en are the two UI languages this Japanese-learning flow realistically
  // runs in; both must resolve real options for every multiple-choice question.
  for (final locale in const ['vi', 'en']) {
    for (final exercise in exercises) {
      // typeAnswer / matchPairs questions have no `options`; skip them.
      if (exercise.options.isEmpty) continue;
      final resolved = exercise.localizedOptions(locale);
      for (final option in resolved) {
        expect(
          _isSentinel(option),
          isFalse,
          reason:
              '$label exercise "${exercise.id}" produced a missing-content '
              'sentinel option in locale "$locale": $resolved',
        );
      }
      expect(
        resolved.length,
        exercise.options.length,
        reason:
            '$label exercise "${exercise.id}" resolved ${resolved.length} '
            'options in "$locale" but has ${exercise.options.length} base '
            'options',
      );
    }
  }
}

void main() {
  test(
    'every Japanese placement question resolves real options (no sentinel) in vi/en',
    () {
      _expectNoSentinelOptions(japanesePlacementQuestions, 'placement');
    },
  );

  test(
    'every legacy fallback course exercise resolves real options (no sentinel) in vi/en',
    () {
      final exercises = allJapaneseLessons
          .expand((lesson) => lesson.exercises)
          .toList();
      _expectNoSentinelOptions(exercises, 'legacy-course');
    },
  );
}
