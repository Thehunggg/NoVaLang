import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/language_option.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/models/user_profile.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';
import 'package:novalang_flutter/screens/onboarding/native_language_screen.dart';
import 'package:novalang_flutter/state/profile_provider.dart';
import 'package:novalang_flutter/state/shared_data_provider.dart';
import 'package:novalang_flutter/widgets/common/onboarding_header.dart';
import 'package:novalang_flutter/widgets/learn/exercise_option_style.dart';

const _uiLocales = <String>['vi', 'en', 'ja'];
const _viewportWidths = <double>[320, 375, 768, 1366, 1920];

/// Detail list rows are rendered as `• $value` (see `_DetailList`).
String _detailBullet(String value) => '• $value';

const _onboardingCatalog = <LanguageOption>[
  LanguageOption(
    code: 'vi',
    englishName: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    aliases: <String>['vietnamese'],
    isSupportedAsNative: true,
    isSupportedAsLearning: false,
    isAvailableForUi: true,
  ),
  LanguageOption(
    code: 'en',
    englishName: 'English',
    nativeName: 'English',
    aliases: <String>['english'],
    isSupportedAsNative: true,
    isSupportedAsLearning: false,
    isAvailableForUi: true,
  ),
  LanguageOption(
    code: 'ja',
    englishName: 'Japanese',
    nativeName: '日本語',
    aliases: <String>['japanese'],
    isSupportedAsNative: true,
    isSupportedAsLearning: false,
    isAvailableForUi: true,
  ),
];

/// Large asset IO must not run inside [testWidgets]' fake-async zone.
/// Loading `lessons.json` there hangs forever without [WidgetTester.runAsync].
Future<Lesson> _loadGoldenLesson() async {
  final raw = await rootBundle.loadString('assets/shared/lessons.json');
  final payload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
  final json = (payload['lessons'] as List)
      .cast<Map>()
      .map((item) => Map<String, dynamic>.from(item))
      .singleWhere((item) => item['id'] == 'ja-daily_life-m01-u1-l1');
  return CurriculumLesson.fromJson(json).toLesson(nativeLanguage: 'vi');
}

void _setViewport(WidgetTester tester, Size size) {
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
}

class _LocaleProfileNotifier extends ProfileNotifier {
  _LocaleProfileNotifier(this.locale);

  final String locale;

  @override
  UserProfile build() => UserProfile.defaults().copyWith(
    nativeLanguageCode: locale,
    uiLanguageCode: locale,
  );
}

double _contrastRatio(Color foreground, Color background) {
  final first = foreground.computeLuminance() + 0.05;
  final second = background.computeLuminance() + 0.05;
  return first > second ? first / second : second / first;
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late Lesson goldenLesson;
  late LessonVocabCard firstVocab;
  late Map<String, dynamic> representativeDetails;
  late String firstContext;

  setUpAll(() async {
    await MobileUiStrings.load();
    goldenLesson = await _loadGoldenLesson();
    firstVocab = goldenLesson.vocabulary.first;
    final details = (goldenLesson.fiveCardContent!['vocabularyDetails'] as List)
        .cast<Map>()
        .first;
    firstContext = (details['timingAndContext'] as List).first.toString();
    representativeDetails = <String, dynamic>{
      'timingAndContext': [firstContext],
      'examples': [(details['examples'] as List).first],
    };
  });

  tearDown(() {
    TestWidgetsFlutterBinding.instance.platformDispatcher
        .clearLocaleTestValue();
  });

  test(
    'exercise option semantic states keep readable dark-surface contrast',
    () {
      for (final state in ExerciseOptionVisualState.values) {
        final foreground = ExerciseOptionStyle.foregroundFor(state);
        final background = ExerciseOptionStyle.backgroundFor(state);
        expect(foreground, isNot(Colors.black), reason: state.name);
        expect(
          _contrastRatio(foreground, background),
          greaterThanOrEqualTo(4.5),
          reason: state.name,
        );
      }
      expect(
        ExerciseOptionStyle.background(
          ExerciseOptionVisualState.available,
        ).resolve({WidgetState.hovered}),
        ExerciseOptionColors.hoveredBackground,
      );
      expect(
        ExerciseOptionStyle.background(
          ExerciseOptionVisualState.available,
        ).resolve({WidgetState.focused}),
        ExerciseOptionColors.focusedBackground,
      );
      expect(
        ExerciseOptionStyle.background(
          ExerciseOptionVisualState.available,
        ).resolve({WidgetState.pressed}),
        ExerciseOptionColors.pressedBackground,
      );
    },
  );

  testWidgets('exercise option chips use semantic colors in vi en and ja', (
    tester,
  ) async {
    addTearDown(() {
      tester.view.resetPhysicalSize();
      tester.view.resetDevicePixelRatio();
    });
    for (final locale in _uiLocales) {
      for (final width in <double>[320, 1366]) {
        _setViewport(tester, Size(width, 360));
        final localizedOptions = L10n.text('exerciseOptions', locale);
        if (locale != 'en') {
          expect(localizedOptions, isNot(L10n.text('exerciseOptions', 'en')));
        }
        await tester.pumpWidget(
          MaterialApp(
            theme: ThemeData.dark(useMaterial3: true),
            home: Scaffold(
              body: Wrap(
                children: [
                  for (final state in ExerciseOptionVisualState.values)
                    ExerciseActionOptionChip(
                      label: localizedOptions,
                      state: state,
                      onPressed: state == ExerciseOptionVisualState.disabled
                          ? null
                          : () {},
                    ),
                  ExerciseSelectedOptionChip(
                    label: L10n.text('exerciseYourAnswer', locale),
                    state: ExerciseOptionVisualState.selected,
                    onDeleted: () {},
                  ),
                ],
              ),
            ),
          ),
        );
        await tester.pump();

        final chips = find.byType(ActionChip);
        expect(chips, findsWidgets, reason: '$locale width $width');
        expect(find.text(localizedOptions), findsNWidgets(5));
        final chip = tester.widget<ActionChip>(chips.first);
        expect(chip.color, isNotNull);
        expect(
          chip.color!.resolve(const {}),
          ExerciseOptionColors.availableBackground,
        );
        final labelColor = WidgetStateProperty.resolveAs<Color?>(
          chip.labelStyle!.color,
          const {},
        );
        expect(labelColor, ExerciseOptionColors.availableForeground);
        expect(tester.takeException(), isNull, reason: '$locale width $width');
      }
    }
  });

  for (final locale in _uiLocales) {
    for (final width in _viewportWidths) {
      testWidgets(
        'collapsed vocabulary card lays out without overflow $locale width $width',
        (tester) async {
          addTearDown(() {
            tester.view.resetPhysicalSize();
            tester.view.resetDevicePixelRatio();
          });
          _setViewport(tester, Size(width, 900));
          await tester.pumpWidget(
            MaterialApp(
              theme: ThemeData.dark(useMaterial3: true),
              home: Scaffold(
                body: SingleChildScrollView(
                  child: LessonVocabularyCard(
                    item: firstVocab,
                    details: const {},
                    uiLanguageCode: locale,
                    learningLanguageCode: 'ja',
                    expanded: false,
                    onToggle: () {},
                  ),
                ),
              ),
            ),
          );
          await tester.pump();

          expect(find.text(firstVocab.displayText), findsOneWidget);
          expect(find.text(firstVocab.meaning), findsNothing);
          expect(
            find.byKey(ValueKey('vocabulary-details-${firstVocab.displayText}')),
            findsNothing,
          );
          expect(tester.takeException(), isNull, reason: '$locale width $width');
        },
      );
    }
  }

  for (final locale in _uiLocales) {
    for (final width in _viewportWidths) {
      testWidgets('expanded vocabulary renders body $locale width $width', (
        tester,
      ) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        _setViewport(tester, Size(width, 900));
        await tester.pumpWidget(
          MaterialApp(
            theme: ThemeData.dark(useMaterial3: true),
            home: Scaffold(
              body: SingleChildScrollView(
                child: LessonVocabularyCard(
                  item: firstVocab,
                  details: representativeDetails,
                  uiLanguageCode: locale,
                  learningLanguageCode: 'ja',
                  expanded: true,
                  onToggle: () {},
                ),
              ),
            ),
          ),
        );
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 300));

        expect(find.text(firstVocab.displayText), findsOneWidget);
        expect(find.text(_detailBullet(firstVocab.meaning)), findsOneWidget);
        expect(find.text(_detailBullet(firstContext)), findsOneWidget);
        if (firstVocab.reading?.isNotEmpty == true) {
          expect(
            find.text(_detailBullet(firstVocab.reading!)),
            findsOneWidget,
          );
        }
        final meaningLabel = L10n.text('vocabMeaning', locale);
        expect(meaningLabel, isNot('vocabMeaning'));
        if (locale != 'en') {
          expect(meaningLabel, isNot(L10n.text('vocabMeaning', 'en')));
        }
        expect(find.text(meaningLabel), findsOneWidget);
        final detailsRect = tester.getRect(
          find.byKey(ValueKey('vocabulary-details-${firstVocab.displayText}')),
        );
        expect(detailsRect.height, greaterThan(0));
        expect(detailsRect.left, greaterThanOrEqualTo(0));
        expect(detailsRect.right, lessThanOrEqualTo(width));
        expect(tester.takeException(), isNull, reason: '$locale width $width');
      });
    }
  }

  for (final locale in _uiLocales) {
    for (final width in _viewportWidths) {
      testWidgets('native onboarding header stays in $locale width $width', (
        tester,
      ) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        TestWidgetsFlutterBinding.instance.platformDispatcher.localeTestValue =
            Locale(locale);
        _setViewport(tester, Size(width, 900));
        // Override catalog: asset FutureProviders hang in testWidgets fake-async
        // the same way lessons.json did (never complete without runAsync).
        await tester.pumpWidget(
          ProviderScope(
            overrides: [
              profileProvider.overrideWith(
                () => _LocaleProfileNotifier(locale),
              ),
              nativeLanguageCatalogProvider.overrideWith(
                (ref) async => _onboardingCatalog,
              ),
            ],
            child: MaterialApp(
              theme: ThemeData.dark(useMaterial3: true),
              home: const NativeLanguageScreen(),
            ),
          ),
        );
        await tester.pump();
        await tester.pump();

        final header = find.byType(OnboardingHeader);
        expect(header, findsOneWidget, reason: '$locale width $width');
        final rect = tester.getRect(header);
        expect(
          rect.left,
          greaterThanOrEqualTo(0),
          reason: '$locale width $width',
        );
        expect(
          rect.right,
          lessThanOrEqualTo(width),
          reason: '$locale width $width',
        );
        final title = L10n.text('nativeLanguage', locale);
        expect(title, isNot('nativeLanguage'));
        if (locale != 'en') {
          expect(title, isNot(L10n.text('nativeLanguage', 'en')));
        }
        expect(
          find.descendant(of: header, matching: find.text(title)),
          findsOneWidget,
        );
        expect(tester.takeException(), isNull, reason: '$locale width $width');
      });
    }
  }
}
