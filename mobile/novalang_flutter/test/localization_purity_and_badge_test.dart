import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/theme/app_theme.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/models/daily_goal_option.dart';
import 'package:novalang_flutter/models/language_option.dart';
import 'package:novalang_flutter/models/user_profile.dart';
import 'package:novalang_flutter/screens/onboarding/goal_screen.dart';
import 'package:novalang_flutter/state/profile_provider.dart';
import 'package:novalang_flutter/state/shared_data_provider.dart';
import 'package:novalang_flutter/widgets/language/coming_soon_badge.dart';
import 'package:novalang_flutter/widgets/language/language_search_list.dart';

const _locales = ['vi', 'en', 'ja'];
const _widths = [320.0, 375.0, 768.0, 1366.0, 1920.0];
const _goalKeys = [
  'dailyGoalGentle',
  'dailyGoalSteady',
  'dailyGoalFocused',
  'dailyGoalSerious',
  'dailyGoalAccelerated',
  'dailyGoalDedicated',
];
const _englishGoalLabels = [
  'Gentle',
  'Steady',
  'Focused',
  'Serious',
  'Accelerated',
  'Dedicated',
];
const _badgeLabels = {'vi': 'Sắp ra mắt', 'en': 'Coming soon', 'ja': '近日公開'};

const _goals = [
  DailyGoalOption(minutes: 5, nameKey: 'dailyGoalGentle'),
  DailyGoalOption(minutes: 10, nameKey: 'dailyGoalSteady'),
  DailyGoalOption(minutes: 15, nameKey: 'dailyGoalFocused'),
  DailyGoalOption(minutes: 20, nameKey: 'dailyGoalSerious'),
  DailyGoalOption(minutes: 25, nameKey: 'dailyGoalAccelerated'),
  DailyGoalOption(minutes: 30, nameKey: 'dailyGoalDedicated'),
];

const _availableLanguage = LanguageOption(
  code: 'ja',
  englishName: 'Japanese',
  nativeName: '日本語',
  aliases: [],
  isSupportedAsNative: true,
  isSupportedAsLearning: true,
  courseStatus: 'available',
);

const _comingSoonLanguage = LanguageOption(
  code: 'fr',
  englishName: 'French',
  nativeName: 'Français',
  aliases: [],
  isSupportedAsNative: true,
  isSupportedAsLearning: true,
  courseStatus: 'coming_soon',
);

class _LocaleProfileNotifier extends ProfileNotifier {
  _LocaleProfileNotifier(this.locale);

  final String locale;

  @override
  UserProfile build() => UserProfile.defaults().copyWith(
    nativeLanguageCode: locale,
    uiLanguageCode: locale,
  );
}

void _setViewport(WidgetTester tester, double width) {
  tester.view.physicalSize = Size(width, 2000);
  tester.view.devicePixelRatio = 1;
}

double _contrast(Color foreground, Color background) {
  final light = foreground.computeLuminance() + 0.05;
  final dark = background.computeLuminance() + 0.05;
  return light > dark ? light / dark : dark / light;
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await MobileUiStrings.load();
  });

  tearDown(() {
    TestWidgetsFlutterBinding.instance.platformDispatcher
        .clearLocaleTestValue();
  });

  group('Daily Goal UI language purity', () {
    test(
      'shared UI bundle has complete vi/en/ja parity and strict lookup',
      () async {
        final bundle =
            jsonDecode(
                  await rootBundle.loadString('assets/shared/mobile_ui.json'),
                )
                as Map<String, dynamic>;
        for (final entry in bundle.entries) {
          final locales = entry.value as Map<String, dynamic>;
          for (final locale in _locales) {
            expect(
              locales[locale]?.toString().trim(),
              isNotEmpty,
              reason: '${entry.key}.$locale',
            );
          }
        }

        expect(MobileUiStrings.instance.lookup('continue', 'xx'), isNull);
        expect(L10n.text('continue', 'xx'), contains('missing:continue:xx'));
        expect(localizedMapText(const {'en': 'English only'}, 'ja'), isEmpty);
      },
    );

    for (final locale in _locales) {
      for (final width in _widths) {
        testWidgets('$locale at width $width has same-locale labels', (
          tester,
        ) async {
          _setViewport(tester, width);
          await tester.pumpWidget(
            ProviderScope(
              overrides: [
                profileProvider.overrideWith(
                  () => _LocaleProfileNotifier(locale),
                ),
                dailyGoalCatalogProvider.overrideWith((ref) async => _goals),
              ],
              child: const MaterialApp(home: GoalScreen()),
            ),
          );
          await tester.pump();

          for (final key in _goalKeys) {
            expect(find.text(L10n.text(key, locale)), findsOneWidget);
          }
          if (locale != 'en') {
            for (final english in _englishGoalLabels) {
              expect(find.text(english), findsNothing);
            }
          } else {
            for (final english in _englishGoalLabels) {
              expect(find.text(english), findsOneWidget);
            }
          }
          expect(
            find.text('5 ${L10n.text('minutesDay', locale)}'),
            findsOneWidget,
          );
          expect(tester.takeException(), isNull);
        });
      }
    }
  });

  group('NovaLang neon-tech Coming soon badge', () {
    testWidgets('uses distinct violet tone readable against dark surfaces', (
      tester,
    ) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: ComingSoonBadge(uiLanguageCode: 'en')),
        ),
      );

      final container = tester.widget<Container>(
        find.byKey(const ValueKey('coming-soon-neon-badge')),
      );
      final decoration = container.decoration! as BoxDecoration;
      expect(decoration.border!.top.color, ComingSoonBadge.border);
      expect(decoration.boxShadow!.single.color, ComingSoonBadge.glow);
      expect(decoration.gradient, isNotNull);
      final text = tester.widget<Text>(find.text('Coming soon'));
      expect(text.style!.color, ComingSoonBadge.foreground);

      // Contrast against a representative violet fill composited on scaffold.
      final compositedBackground = Color.alphaBlend(
        ComingSoonBadge.background,
        AppTheme.scaffoldBackground,
      );
      expect(
        _contrast(ComingSoonBadge.foreground, compositedBackground),
        greaterThanOrEqualTo(4.5),
      );
    });

    for (final locale in _locales) {
      for (final width in _widths) {
        testWidgets('$locale at width $width styles only unavailable card', (
          tester,
        ) async {
          _setViewport(tester, width);
          await tester.pumpWidget(
            MaterialApp(
              home: Scaffold(
                body: SingleChildScrollView(
                  child: LanguageSearchList(
                    items: const [_availableLanguage, _comingSoonLanguage],
                    locale: locale,
                    onTap: (_) {},
                    trailingBuilder: (language) => language.isCourseAvailable
                        ? const SizedBox.shrink()
                        : ComingSoonBadge(uiLanguageCode: locale),
                  ),
                ),
              ),
            ),
          );

          expect(find.text(_badgeLabels[locale]!), findsOneWidget);
          expect(
            find.byKey(const ValueKey('coming-soon-neon-badge')),
            findsOneWidget,
          );
          expect(tester.takeException(), isNull);
        });
      }
    }
  });
}
