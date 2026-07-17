import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/theme/app_theme.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';
import 'package:novalang_flutter/widgets/common/app_card.dart';
import 'package:novalang_flutter/widgets/learn/exercise_option_style.dart';

double _contrast(Color foreground, Color background) {
  final foregroundLuminance = foreground.computeLuminance() + 0.05;
  final backgroundLuminance = background.computeLuminance() + 0.05;
  return foregroundLuminance > backgroundLuminance
      ? foregroundLuminance / backgroundLuminance
      : backgroundLuminance / foregroundLuminance;
}

void main() {
  group('lesson content dark surfaces', () {
    test(
      'central semantic tokens retain white/cyan contrast on dark cards',
      () {
        expect(AppTheme.lessonSurface, isNot(Colors.white));
        expect(AppTheme.lessonSurfaceElevated, isNot(Colors.white));
        expect(AppTheme.lessonBorderSubtle, isNot(Colors.white));
        expect(AppTheme.dialogueBubbleSpeakerA, isNot(Colors.white));
        expect(AppTheme.dialogueBubbleSpeakerB, isNot(Colors.white));
        expect(
          _contrast(AppTheme.contentPrimaryForeground, AppTheme.lessonSurface),
          greaterThanOrEqualTo(4.5),
        );
        expect(
          _contrast(AppTheme.contentAccentForeground, AppTheme.lessonSurface),
          greaterThanOrEqualTo(4.5),
        );
        expect(
          ExerciseOptionColors.availableBackground,
          AppTheme.lessonSurfaceElevated,
        );
      },
    );

    testWidgets('AppCard uses the centralized dark lesson tokens', (
      tester,
    ) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: AppCard(child: Text('lesson card'))),
        ),
      );

      final card = tester.widget<Card>(find.byType(Card));
      final shape = card.shape! as RoundedRectangleBorder;
      expect(card.color, AppTheme.lessonSurface);
      expect(shape.side.color, AppTheme.lessonBorderSubtle);
    });

    testWidgets('custom vocabulary surface uses dark lesson tokens', (
      tester,
    ) async {
      const item = LessonVocabCard(
        displayText: 'おはようございます',
        speechText: 'おはようございます',
        meaning: 'Good morning.',
      );
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: LessonVocabularyCard(
              item: item,
              details: const {},
              uiLanguageCode: 'en',
              learningLanguageCode: 'ja',
              expanded: false,
              onToggle: () {},
            ),
          ),
        ),
      );

      final surface = tester.widget<DecoratedBox>(
        find.byKey(const ValueKey('lesson-vocabulary-surface-おはようございます')),
      );
      final decoration = surface.decoration as BoxDecoration;
      expect(decoration.color, AppTheme.lessonSurface);
      expect(decoration.border!.top.color, AppTheme.lessonBorderSubtle);
    });
  });
}
