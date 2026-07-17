import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  const AppTheme._();

  // Bundled Japanese typography prevents Android and Web from selecting
  // different platform fallback fonts for kana, kanji, and Japanese
  // punctuation. Keep the locale on each Japanese Text/RichText as well so
  // language-specific glyph shaping is explicit.
  static const japaneseFontFamily = 'NotoSansJP';
  static const japaneseLocale = Locale('ja', 'JP');
  static const japaneseFontFamilyFallback = <String>[
    'Noto Sans CJK JP',
    'Noto Sans JP',
    'Yu Gothic',
    'Meiryo',
  ];
  static const japaneseTextStyle = TextStyle(
    fontFamily: japaneseFontFamily,
    fontFamilyFallback: japaneseFontFamilyFallback,
  );

  /// Semantic tokens exposed as named constants (rather than inlined only
  /// inside [dark]) so tests can assert on the exact values NovaLang ships
  /// without constructing a full [ThemeData] (which pulls Google Fonts and
  /// is unsuitable for plain unit tests).
  static const scaffoldBackground = Color(0xFF080510);

  // Shared lesson-content surfaces. These intentionally sit only a little
  // above [scaffoldBackground] so white primary text and cyan learning cues,
  // rather than large gray panels, carry the visual hierarchy.
  static const lessonSurface = Color(0xFF100B1A);
  static const lessonSurfaceElevated = Color(0xFF161022);
  static const lessonBorderSubtle = Color(0xFF2B2438);
  static const lessonSelectedBorder = Color(0xFF22D3EE);
  static const lessonSelectionOverlay = Color(0x3340E0D0);
  static const dialogueBubbleSpeakerA = Color(0xFF17112B);
  static const dialogueBubbleSpeakerB = Color(0xFF101A2E);
  static const dialogueBubbleSpeakerABorder = Color(0xFF3B2F64);
  static const dialogueBubbleSpeakerBBorder = Color(0xFF244469);

  static const contentPrimaryForeground = Color(0xFFF8FAFC);
  static const contentAccentForeground = Color(0xFF67E8F9);
  static const contentSecondaryForeground = Color(0xFFC8C1D2);
  static const contentDisabledForeground = Color(0xFF9F96AE);
  static const dialogueSpeakerForeground = Color(0xFFF0ABFC);

  static const chipLabelColor = Colors.white;
  static const disabledButtonBackground = Color(0xFF3A3548);
  static final disabledFilledButtonForeground = Colors.white.withValues(
    alpha: 0.75,
  );
  static final disabledOutlinedButtonForeground = Colors.white.withValues(
    alpha: 0.62,
  );

  // NovaLang neon-tech status badge. These tokens are intentionally scoped
  // to unavailable language content and must not recolor the language card.
  static const comingSoonBadgeBackground = Color(0x3322D3EE);
  static const comingSoonBadgeBorder = Color(0xFF67E8F9);
  static const comingSoonBadgeForeground = Color(0xFFF0FDFF);
  static const comingSoonBadgeGlow = Color(0x402A7FFF);

  // Question surfaces retain the dark NovaLang treatment. These foreground
  // tokens distinguish prompt text from learner-selectable answers without
  // relying on Material's platform defaults.
  static const questionForeground = contentPrimaryForeground;
  static const answerOptionForeground = contentAccentForeground;
  static const answerOptionSelectedForeground = Color(0xFFCFFAFE);
  static const answerOptionDisabledForeground = Color(0xFF7DD3FC);

  static ThemeData dark() {
    const seed = Color(0xFF8B5CF6);
    final scheme = ColorScheme.fromSeed(
      seedColor: seed,
      brightness: Brightness.dark,
      surface: lessonSurface,
      primary: const Color(0xFF6D4BD1),
      secondary: const Color(0xFF22D3EE),
    );
    final textTheme = GoogleFonts.interTextTheme(ThemeData.dark().textTheme);

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: scaffoldBackground,
      textTheme: textTheme.apply(
        bodyColor: Colors.white,
        displayColor: Colors.white,
      ),
      cardTheme: CardThemeData(
        color: lessonSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: lessonBorderSubtle),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: const Color(0xFF5B3FA8),
          foregroundColor: Colors.white,
          disabledBackgroundColor: disabledButtonBackground,
          disabledForegroundColor: disabledFilledButtonForeground,
          minimumSize: const Size.fromHeight(52),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: const Color(0xFF9EEAF9),
          disabledForegroundColor: disabledOutlinedButtonForeground,
          side: BorderSide(color: Colors.white.withValues(alpha: 0.22)),
          minimumSize: const Size.fromHeight(52),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: const Color(0xFF9EEAF9),
          textStyle: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: lessonSurfaceElevated,
        hintStyle: const TextStyle(color: contentDisabledForeground),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: lessonBorderSubtle),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: lessonBorderSubtle),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: lessonSelectedBorder, width: 1.4),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 18,
          vertical: 16,
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: lessonSurfaceElevated,
        selectedColor: const Color(0xFF6D4BD1).withValues(alpha: 0.55),
        side: const BorderSide(color: lessonBorderSubtle),
        labelStyle: const TextStyle(
          color: chipLabelColor,
          fontWeight: FontWeight.w600,
        ),
        secondaryLabelStyle: const TextStyle(
          color: chipLabelColor,
          fontWeight: FontWeight.w600,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: Color(0xFF22D3EE),
        linearTrackColor: Color(0xFF1E293B),
      ),
    );
  }
}
