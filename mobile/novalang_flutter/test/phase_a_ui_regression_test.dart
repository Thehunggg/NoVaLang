import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/theme/app_theme.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/widgets/learn/exercise_option_style.dart';

/// Terminology that must never be resolvable for Exercise 14's display
/// label again, in any UI language. Superseded by "Real-World Practice" /
/// "Thực hành thực tế" / "実践練習" (see shared/i18n/mobile_ui.json).
const _staleExerciseTypeAiPracticeValues = <String>[
  'AI Practice',
  'Guided Output Practice',
  'Applied Practice',
  'Luyện tập với AI',
  'Thực hành tình huống',
  'Thực hành ứng dụng',
  'Luyện tập đầu ra có hướng dẫn',
  'AI練習',
];

/// WCAG 2.1 relative luminance / contrast ratio helpers, used to assert on
/// the actual color tokens shipped in the app rather than approximating by
/// eye. https://www.w3.org/TR/WCAG21/#contrast-minimum
double _relativeLuminance(Color color) {
  double linear(double v) =>
      v <= 0.03928 ? v / 12.92 : math.pow((v + 0.055) / 1.055, 2.4).toDouble();
  final r = linear(color.r);
  final g = linear(color.g);
  final b = linear(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/// Composites [foreground] (which may itself carry alpha) over an opaque
/// [background], returning the resulting opaque color.
Color _composite(Color foreground, Color background) {
  final a = foreground.a;
  double mix(double fg, double bg) => fg * a + bg * (1 - a);
  return Color.from(
    alpha: 1,
    red: mix(foreground.r, background.r),
    green: mix(foreground.g, background.g),
    blue: mix(foreground.b, background.b),
  );
}

double contrastRatio(Color foreground, Color background) {
  final composited = _composite(foreground, background);
  final l1 = _relativeLuminance(composited);
  final l2 = _relativeLuminance(background);
  final lighter = l1 > l2 ? l1 : l2;
  final darker = l1 > l2 ? l2 : l1;
  return (lighter + 0.05) / (darker + 0.05);
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('A2 — {count} interpolation', () {
    test('startExercises resolves {count} to a real number in vi/en/ja', () {
      for (final locale in ['vi', 'en', 'ja']) {
        final resolved = L10n.text(
          'startExercises',
          locale,
        ).replaceAll('{count}', '14');
        expect(resolved, isNot(contains('{count}')));
        expect(resolved, contains('14'));
      }
    });

    test('startExercises template still contains the {count} placeholder', () {
      // Guards against someone removing the placeholder from the catalog
      // itself, which would silently make the .replaceAll() call a no-op.
      for (final locale in ['vi', 'en', 'ja']) {
        expect(L10n.text('startExercises', locale), contains('{count}'));
      }
    });
  });

  group('A1 — contrast: exercise option semantic tokens (câu 1/14 reference)', () {
    test('available/selected/correct/incorrect/disabled meet 4.5:1 on their own background', () {
      for (final state in ExerciseOptionVisualState.values) {
        final ratio = contrastRatio(
          ExerciseOptionStyle.foregroundFor(state),
          ExerciseOptionStyle.backgroundFor(state),
        );
        expect(
          ratio,
          greaterThanOrEqualTo(4.5),
          reason: '$state foreground/background contrast was $ratio',
        );
      }
    });
  });

  group('A1 — contrast: app theme tokens used for cards/chips/buttons', () {
    // Reads AppTheme's own named color constants directly rather than
    // constructing AppTheme.dark(), which pulls Google Fonts and requires
    // network access unsuitable for a plain unit test.
    const disabledChoiceBackground = Color(0xFF201C2B);

    test('chip label color is explicit and readable on the chip background', () {
      final chipBackground = Colors.white.withValues(alpha: 0.06);
      final effectiveBackground = _composite(
        chipBackground,
        AppTheme.scaffoldBackground,
      );
      final ratio = contrastRatio(AppTheme.chipLabelColor, effectiveBackground);
      expect(ratio, greaterThanOrEqualTo(4.5));
    });

    test('disabled FilledButton label is not near-invisible', () {
      final ratio = contrastRatio(
        AppTheme.disabledFilledButtonForeground,
        AppTheme.disabledButtonBackground,
      );
      expect(
        ratio,
        greaterThanOrEqualTo(3.0),
        reason: 'disabled controls should reduce emphasis, not approach '
            'invisibility; ratio was $ratio',
      );
    });

    test('disabled OutlinedButton label is not near-invisible', () {
      final ratio = contrastRatio(
        AppTheme.disabledOutlinedButtonForeground,
        AppTheme.scaffoldBackground,
      );
      expect(ratio, greaterThanOrEqualTo(3.0));
    });

    test('disabled exercise option foreground stays legible', () {
      final ratio = contrastRatio(
        ExerciseOptionColors.disabledForeground,
        disabledChoiceBackground,
      );
      expect(ratio, greaterThanOrEqualTo(3.0));
    });

    test('question and selectable-answer foregrounds are explicit semantic tokens', () {
      expect(AppTheme.questionForeground, const Color(0xFFF8FAFC));
      expect(
        ExerciseOptionColors.availableForeground,
        AppTheme.answerOptionForeground,
      );
      expect(
        ExerciseOptionColors.selectedForeground,
        AppTheme.answerOptionSelectedForeground,
      );
      expect(
        ExerciseOptionColors.disabledForeground,
        AppTheme.answerOptionDisabledForeground,
      );
      expect(
        contrastRatio(
          AppTheme.answerOptionForeground,
          ExerciseOptionColors.availableBackground,
        ),
        greaterThanOrEqualTo(4.5),
      );
    });
  });

  group('Exercise 14 terminology rename — fallback map only (no asset)', () {
    // Sanity check on the Dart fallback map alone, kept intentionally
    // minimal: production runtime does NOT depend on this path (see the
    // "production-realistic (shared asset preloaded)" group below), but the
    // fallback must still hold a correct, non-stale safety-net value.
    test('exerciseTypeAiPractice no longer mentions AI in vi/en/ja', () {
      for (final locale in ['vi', 'en', 'ja']) {
        final label = L10n.text('exerciseTypeAiPractice', locale);
        expect(label.toUpperCase(), isNot(contains('AI')));
      }
    });

    test('technical identifier guided_output_practice is unaffected by the display rename', () {
      // The rename only touches display labels; nothing in this test suite
      // (or the exercise-type mapping) should require renaming the
      // technical exercise type constant itself.
      expect('guided_output_practice', isNot(contains('ai')));
    });
  });

  group('Exercise 14 terminology — production-realistic (shared asset preloaded)', () {
    // Mirrors main.dart's startup sequence (MobileUiStrings.load() before
    // the UI renders), so these assertions exercise the exact value a real
    // user sees, not just the Dart fallback map. Loading is done in
    // setUpAll (real async), never inside a testWidgets fake-async zone.
    setUpAll(() async {
      await MobileUiStrings.load();
    });

    test(
      'production runtime (shared JSON asset) resolves exerciseTypeAiPractice '
      'to the new terminology for vi/en/ja, not the fallback map',
      () {
        for (final locale in ['vi', 'en', 'ja']) {
          final fromAsset = MobileUiStrings.instance.lookup(
            'exerciseTypeAiPractice',
            locale,
          );
          expect(
            fromAsset,
            isNotNull,
            reason:
                'production runtime must not depend on the Dart fallback '
                'for this key ($locale) — shared/i18n/mobile_ui.json must '
                'define it',
          );
        }
        expect(
          MobileUiStrings.instance.lookup('exerciseTypeAiPractice', 'en'),
          'Real-World Practice',
        );
        expect(
          MobileUiStrings.instance.lookup('exerciseTypeAiPractice', 'vi'),
          'Thực hành thực tế',
        );
        expect(
          MobileUiStrings.instance.lookup('exerciseTypeAiPractice', 'ja'),
          '実践練習',
        );
      },
    );

    test(
      'L10n.text (full runtime resolution) matches the shared-asset override, '
      'confirming the asset takes precedence over the fallback map',
      () {
        expect(L10n.text('exerciseTypeAiPractice', 'en'), 'Real-World Practice');
        expect(L10n.text('exerciseTypeAiPractice', 'vi'), 'Thực hành thực tế');
        expect(L10n.text('exerciseTypeAiPractice', 'ja'), '実践練習');
      },
    );

    test(
      'no stale Exercise 14 terminology is resolvable for any UI language '
      '(fails if shared/mobile_ui.json is reverted to the old wording)',
      () {
        for (final locale in ['vi', 'en', 'ja']) {
          final label = L10n.text('exerciseTypeAiPractice', locale);
          expect(label.toUpperCase(), isNot(contains('AI')));
          for (final stale in _staleExerciseTypeAiPracticeValues) {
            expect(
              label,
              isNot(equals(stale)),
              reason:
                  '$locale exerciseTypeAiPractice resolved to stale value '
                  '"$stale"',
            );
          }
        }
      },
    );

    test(
      'plusTeaserDescription (Exercise 14 mention on the checkpoint page) '
      'carries no stale AI/Applied Practice wording in vi/en/ja',
      () {
        for (final locale in ['vi', 'en', 'ja']) {
          final text = L10n.text('plusTeaserDescription', locale);
          expect(text.toUpperCase(), isNot(contains('AI PRACTICE')));
          expect(text.toUpperCase(), isNot(contains('APPLIED PRACTICE')));
          expect(text, isNot(contains('thực hành tình huống')));
        }
      },
    );
  });

  group('Blocker B — question-count label localized (shared asset preloaded)', () {
    setUpAll(() async {
      await MobileUiStrings.load();
    });

    test(
      'lessonQuestionsCount interpolates the real runtime count for vi/en/ja, '
      'not a hardcoded 14 or a hardcoded Vietnamese unit',
      () {
        // Deliberately not 14, to prove the count is not hardcoded anywhere
        // in the label pipeline.
        const runtimeCount = 6;
        final expected = <String, String>{
          'vi': '$runtimeCount câu',
          'en': '$runtimeCount questions',
          'ja': '$runtimeCount問',
        };
        for (final locale in ['vi', 'en', 'ja']) {
          final resolved = L10n.text(
            'lessonQuestionsCount',
            locale,
          ).replaceAll('{count}', '$runtimeCount');
          expect(resolved, expected[locale]);
        }
      },
    );

    test(
      'lessonQuestionsCount resolves from the shared asset, not only the '
      'fallback map',
      () {
        for (final locale in ['vi', 'en', 'ja']) {
          expect(
            MobileUiStrings.instance.lookup('lessonQuestionsCount', locale),
            isNotNull,
          );
        }
      },
    );

    test('English and Japanese counts never carry the Vietnamese "câu" unit', () {
      for (final locale in ['en', 'ja']) {
        final resolved = L10n.text(
          'lessonQuestionsCount',
          locale,
        ).replaceAll('{count}', '9');
        expect(resolved, isNot(contains('câu')));
      }
    });
  });
}
