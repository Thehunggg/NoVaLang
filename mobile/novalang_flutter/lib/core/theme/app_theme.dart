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

  // Authentication surfaces use the same NovaLang purple/cyan identity while
  // keeping their glass depth isolated from lesson cards and global buttons.
  static const authBackgroundTop = Color(0xFF080510);
  static const authBackgroundMiddle = Color(0xFF120A20);
  static const authBackgroundBottom = Color(0xFF06151C);
  static const authAmbientPurple = Color(0x668B5CF6);
  static const authAmbientCyan = Color(0x5522D3EE);
  static const authAmbientBlue = Color(0x443B82F6);
  static const authGlassSurfaceTop = Color(0xCC171124);
  static const authGlassSurfaceBottom = Color(0xB30C1620);
  static const authCardOcclusion = Color(0xFF0D0A16);
  static const authGlassBorder = Color(0x667DD3FC);
  static const authGlassEdgeStrong = Color(0xA667E8F9);
  static const authGlassInnerEdge = Color(0x38F8FAFC);
  static const authGlassHighlight = Color(0x40F8FAFC);
  static const authGlassShadow = Color(0x99000000);
  static const authGlassShadowPurple = Color(0x4D7C3AED);
  static const authGlassShadowCyan = Color(0x3322D3EE);
  static const authPortalPrimary = Color(0xB367E8F9);
  static const authPortalSecondary = Color(0x8F8B5CF6);
  static const authPortalFaint = Color(0x267DD3FC);
  static const authGreetingForeground = Color(0xFFF0FDFF);
  static const authGreetingGlow = Color(0x5C67E8F9);
  static const authLogoRim = Color(0xFFE0F2FE);
  static const authLogoCyanHighlight = Color(0xFFA5F3FC);
  static const authLogoElectricBlue = Color(0xFF3B82F6);
  static const authLogoPageTop = Color(0xFF263A5A);
  static const authLogoPageBottom = Color(0xFF111827);
  static const authLogoPageLine = Color(0x8067E8F9);
  static const authLogoCore = Color(0xFF67E8F9);
  static const authButtonSurface = Color(0x7A161B2B);
  static const authButtonSurfaceStrong = Color(0x8F272044);
  static const authButtonHover = Color(0xA62B3150);
  static const authButtonPressed = Color(0xB31B2440);
  static const authButtonFocus = Color(0x5538BDF8);
  static const authButtonBorder = Color(0x807DD3FC);
  static const authButtonBorderActive = Color(0xFF67E8F9);
  static const authButtonForeground = contentPrimaryForeground;
  static const authButtonIcon = contentAccentForeground;
  static const authBadgeSurfaceTop = Color(0xD92A263B);
  static const authBadgeSurfaceBottom = Color(0xC20C1320);
  static const authBadgeBorder = Color(0x668BE9FD);
  static const authGoogleBlue = Color(0xFF4285F4);
  static const authGoogleRed = Color(0xFFEA4335);
  static const authGoogleYellow = Color(0xFFFBBC05);
  static const authGoogleGreen = Color(0xFF34A853);
  static const authFacebookBlue = Color(0xFF1877F2);
  static const authFacebookBlueDeep = Color(0xFF0B4EB3);
  static const authInstagramPurple = Color(0xFF833AB4);
  static const authInstagramPink = Color(0xFFE1306C);
  static const authInstagramOrange = Color(0xFFFCAF45);
  static const authEmailBlue = Color(0xFF38BDF8);
  static const authWordmarkForeground = Color(0xFFF8FBFF);
  static const authWordmarkPurple = Color(0xFFA970FF);
  static const authWordmarkBlue = Color(0xFF4DA3FF);
  static const authBackdropHeroGlow = Color(0x332C65D8);
  static const authHeroGlow = Color(0x3322D3EE);
  static const authMapCyan = Color(0xFF35E6F2);
  static const authMapPurple = Color(0xFFA970FF);
  static const authMapNetwork = Color(0xFF73B7FF);
  static const authMascotGroundGlow = Color(0x6635E6F2);
  static const authBubbleSurfaceTop = Color(0xE61A2540);
  static const authBubbleSurfaceBottom = Color(0xD90A1020);
  static const authBubbleCyan = Color(0xFF54E7F4);
  static const authBubblePurple = Color(0xFFA970FF);
  static const authGreetingSecondary = Color(0xFFD9D7F7);
  static const authPrimaryButtonSurface = Color(0xFFF7FAFF);
  static const authPrimaryButtonHover = Color(0xFFFFFFFF);
  static const authPrimaryButtonPressed = Color(0xFFE2E8F0);
  static const authPrimaryButtonForeground = Color(0xFF0B1220);
  static const authPrimaryButtonBorder = Color(0xFFDCE8F7);
  static const authPrimaryButtonGlow = Color(0x5538BDF8);
  static const authSecondaryButtonSurface = Color(0xCC0D1525);
  static const authEmailButtonBorder = Color(0xCC38BDF8);
  static const authEmailButtonForeground = Color(0xFF67E8F9);
  static const authDivider = Color(0x665B6B85);
  static const authLegalTerms = Color(0xFF67E8F9);
  static const authLegalPrivacy = Color(0xFFB690FF);

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
