import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';

/// Semantic visual states shared by exercise token/option chips.
enum ExerciseOptionVisualState {
  available,
  selected,
  correct,
  incorrect,
  disabled,
}

/// NovaLang semantic colors for exercise options on dark lesson surfaces.
abstract final class ExerciseOptionColors {
  static const availableBackground = AppTheme.lessonSurfaceElevated;
  static const availableForeground = AppTheme.answerOptionForeground;
  static const availableBorder = Color(0xFF514A63);

  static const selectedBackground = Color(0xFF4A3378);
  static const selectedForeground = AppTheme.answerOptionSelectedForeground;
  static const selectedBorder = Color(0xFF9EEAF9);

  static const correctBackground = Color(0xFF14532D);
  static const correctForeground = Color(0xFFDCFCE7);
  static const correctBorder = Color(0xFF4ADE80);

  static const incorrectBackground = Color(0xFF7F1D1D);
  static const incorrectForeground = Color(0xFFFEE2E2);
  static const incorrectBorder = Color(0xFFF87171);

  static const disabledBackground = Color(0xFF201C2B);
  static const disabledForeground = AppTheme.answerOptionDisabledForeground;
  static const disabledBorder = Color(0xFF3A3548);

  static const hoveredBackground = Color(0xFF342B49);
  static const focusedBackground = Color(0xFF3A3152);
  static const pressedBackground = Color(0xFF51406F);
}

abstract final class ExerciseOptionStyle {
  static Color backgroundFor(ExerciseOptionVisualState state) =>
      switch (state) {
        ExerciseOptionVisualState.available =>
          ExerciseOptionColors.availableBackground,
        ExerciseOptionVisualState.selected =>
          ExerciseOptionColors.selectedBackground,
        ExerciseOptionVisualState.correct =>
          ExerciseOptionColors.correctBackground,
        ExerciseOptionVisualState.incorrect =>
          ExerciseOptionColors.incorrectBackground,
        ExerciseOptionVisualState.disabled =>
          ExerciseOptionColors.disabledBackground,
      };

  static Color foregroundFor(ExerciseOptionVisualState state) =>
      switch (state) {
        ExerciseOptionVisualState.available =>
          ExerciseOptionColors.availableForeground,
        ExerciseOptionVisualState.selected =>
          ExerciseOptionColors.selectedForeground,
        ExerciseOptionVisualState.correct =>
          ExerciseOptionColors.correctForeground,
        ExerciseOptionVisualState.incorrect =>
          ExerciseOptionColors.incorrectForeground,
        ExerciseOptionVisualState.disabled =>
          ExerciseOptionColors.disabledForeground,
      };

  static Color borderFor(ExerciseOptionVisualState state) => switch (state) {
    ExerciseOptionVisualState.available => ExerciseOptionColors.availableBorder,
    ExerciseOptionVisualState.selected => ExerciseOptionColors.selectedBorder,
    ExerciseOptionVisualState.correct => ExerciseOptionColors.correctBorder,
    ExerciseOptionVisualState.incorrect => ExerciseOptionColors.incorrectBorder,
    ExerciseOptionVisualState.disabled => ExerciseOptionColors.disabledBorder,
  };

  static WidgetStateProperty<Color?> background(
    ExerciseOptionVisualState state,
  ) => WidgetStateProperty.resolveWith((states) {
    if (state == ExerciseOptionVisualState.disabled ||
        (states.contains(WidgetState.disabled) &&
            state != ExerciseOptionVisualState.correct &&
            state != ExerciseOptionVisualState.incorrect)) {
      return ExerciseOptionColors.disabledBackground;
    }
    if (states.contains(WidgetState.pressed)) {
      return ExerciseOptionColors.pressedBackground;
    }
    if (states.contains(WidgetState.hovered)) {
      return ExerciseOptionColors.hoveredBackground;
    }
    if (states.contains(WidgetState.focused)) {
      return ExerciseOptionColors.focusedBackground;
    }
    return backgroundFor(state);
  });

  static WidgetStateProperty<Color?> foreground(
    ExerciseOptionVisualState state,
  ) => WidgetStateProperty.resolveWith((states) {
    if (state == ExerciseOptionVisualState.disabled ||
        (states.contains(WidgetState.disabled) &&
            state != ExerciseOptionVisualState.correct &&
            state != ExerciseOptionVisualState.incorrect)) {
      return ExerciseOptionColors.disabledForeground;
    }
    return foregroundFor(state);
  });

  static WidgetStateProperty<BorderSide?> side(
    ExerciseOptionVisualState state,
  ) => WidgetStateProperty.resolveWith((states) {
    final resolvedState =
        states.contains(WidgetState.disabled) &&
            state != ExerciseOptionVisualState.correct &&
            state != ExerciseOptionVisualState.incorrect
        ? ExerciseOptionVisualState.disabled
        : state;
    return BorderSide(color: borderFor(resolvedState));
  });

  static TextStyle labelStyle(ExerciseOptionVisualState state) => TextStyle(
    color: WidgetStateColor.resolveWith(
      (states) => foreground(state).resolve(states)!,
    ),
    fontWeight: FontWeight.w700,
  );
}

class ExerciseActionOptionChip extends StatelessWidget {
  const ExerciseActionOptionChip({
    super.key,
    required this.label,
    required this.state,
    required this.onPressed,
  });

  final String label;
  final ExerciseOptionVisualState state;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) => ActionChip(
    label: Text(label),
    labelStyle: ExerciseOptionStyle.labelStyle(state),
    color: ExerciseOptionStyle.background(state),
    disabledColor: ExerciseOptionColors.disabledBackground,
    side: BorderSide(color: ExerciseOptionStyle.borderFor(state)),
    onPressed: onPressed,
  );
}

class ExerciseSelectedOptionChip extends StatelessWidget {
  const ExerciseSelectedOptionChip({
    super.key,
    required this.label,
    required this.state,
    required this.onDeleted,
  });

  final String label;
  final ExerciseOptionVisualState state;
  final VoidCallback? onDeleted;

  @override
  Widget build(BuildContext context) => InputChip(
    label: Text(label),
    labelStyle: ExerciseOptionStyle.labelStyle(state),
    color: ExerciseOptionStyle.background(state),
    disabledColor: ExerciseOptionColors.disabledBackground,
    deleteIconColor: ExerciseOptionStyle.foregroundFor(state),
    side: BorderSide(color: ExerciseOptionStyle.borderFor(state)),
    onDeleted: onDeleted,
  );
}
