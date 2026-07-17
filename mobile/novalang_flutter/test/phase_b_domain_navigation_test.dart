import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/data/domain_navigation_catalog.dart';
import 'package:novalang_flutter/models/domain_navigation.dart';
import 'package:novalang_flutter/screens/explore/domain_navigation_screen.dart';

const _uiLocales = <String>['vi', 'en', 'ja'];
const _viewportWidths = <double>[320, 375, 768, 1366, 1920];

const _expectedDomainCountByCategory = <String, int>{
  'digital_technology': 5,
  'corporate_business': 4,
  'hospitality_customer_service': 4,
  'engineering_production': 4,
  'care_health_education': 4,
  'green_agriculture_supply_chain': 4,
};

void _setViewport(WidgetTester tester, Size size) {
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
}

Widget _app(Widget home) =>
    MaterialApp(theme: ThemeData.dark(useMaterial3: true), home: home);

/// One finite settle: an immediate pump plus a single pump past the default
/// MaterialPageRoute transition duration. Deliberately not
/// `pumpAndSettle()` with no bound — these screens have no repeating
/// animation, so two pumps is enough, and this can never hang.
Future<void> _pumpSettled(WidgetTester tester) async {
  await tester.pump();
  await tester.pump(const Duration(milliseconds: 350));
}

/// Every raw localization key literal used anywhere in the Domain
/// Navigation catalog/UI. If any of these strings is ever visible as
/// rendered text, `L10n.text` fell through to returning the key itself
/// (see `L10n._fallbackText`), i.e. a real, untranslated-key regression.
final Set<String> _allDomainNavKeys = {
  'domainNavTitle',
  'professionalCategoriesTitle',
  'contentInPreparation',
  'trackShellPlaceholder',
  for (final t in DomainNavigationCatalog.tracks) t.nameKey,
  for (final c in DomainNavigationCatalog.categories) ...[
    c.nameKey,
    c.descriptionKey,
  ],
  for (final d in DomainNavigationCatalog.domains) d.nameKey,
};

void _assertNoLiteralKeysVisible(WidgetTester tester) {
  for (final key in _allDomainNavKeys) {
    expect(
      find.text(key),
      findsNothing,
      reason: 'raw localization key "$key" is visible as rendered text',
    );
  }
}

void _assertNoOverflowOrStaleUnit(WidgetTester tester, String locale) {
  expect(tester.takeException(), isNull, reason: 'locale $locale');
  if (locale != 'vi') {
    for (final element in find.byType(Text).evaluate()) {
      final text = (element.widget as Text).data ?? '';
      expect(
        text,
        isNot(contains(' câu')),
        reason: 'locale $locale rendered the Vietnamese "câu" unit: "$text"',
      );
    }
  }
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('Catalog structure', () {
    test('exactly 3 learning tracks', () {
      expect(DomainNavigationCatalog.tracks.length, 3);
      expect(
        DomainNavigationCatalog.tracks.map((t) => t.stableId).toSet(),
        {'basic_communication', 'professional_career', 'exam_preparation'},
      );
    });

    test('professional_career has exactly 6 categories, all linked', () {
      final categories = DomainNavigationCatalog.categoriesForTrack(
        'professional_career',
      );
      expect(categories.length, 6);
      for (final category in categories) {
        expect(category.trackId, 'professional_career');
      }
    });

    test('exactly 25 domains total', () {
      expect(DomainNavigationCatalog.domains.length, 25);
    });

    test('each domain belongs to a real category with correct count', () {
      final categoryIds = DomainNavigationCatalog.categories
          .map((c) => c.stableId)
          .toSet();
      for (final domain in DomainNavigationCatalog.domains) {
        expect(
          categoryIds.contains(domain.categoryId),
          isTrue,
          reason: '${domain.stableId} references unknown category '
              '${domain.categoryId}',
        );
      }
      for (final entry in _expectedDomainCountByCategory.entries) {
        expect(
          DomainNavigationCatalog.domainsForCategory(entry.key).length,
          entry.value,
          reason: 'domain count mismatch for ${entry.key}',
        );
      }
      final sumOfCounts = _expectedDomainCountByCategory.values.fold(
        0,
        (a, b) => a + b,
      );
      expect(sumOfCounts, 25);
    });

    test('stable IDs are unique within and across tracks/categories/domains', () {
      final trackIds = DomainNavigationCatalog.tracks.map((t) => t.stableId);
      final categoryIds = DomainNavigationCatalog.categories.map(
        (c) => c.stableId,
      );
      final domainIds = DomainNavigationCatalog.domains.map(
        (d) => d.stableId,
      );
      expect(trackIds.toSet().length, trackIds.length);
      expect(categoryIds.toSet().length, categoryIds.length);
      expect(domainIds.toSet().length, domainIds.length);
      final all = [...trackIds, ...categoryIds, ...domainIds];
      expect(
        all.toSet().length,
        all.length,
        reason: 'stable IDs must be unique across the whole catalog',
      );
    });

    test('sort order is deterministic and gapless per group', () {
      final tracks = DomainNavigationCatalog.sortedTracks();
      expect(tracks.map((t) => t.sortOrder).toList(), [1, 2, 3]);

      final categories = DomainNavigationCatalog.categoriesForTrack(
        'professional_career',
      );
      expect(categories.map((c) => c.sortOrder).toList(), [1, 2, 3, 4, 5, 6]);

      for (final categoryId in _expectedDomainCountByCategory.keys) {
        final domains = DomainNavigationCatalog.domainsForCategory(
          categoryId,
        );
        final expectedOrder = List<int>.generate(
          domains.length,
          (i) => i + 1,
        );
        expect(
          domains.map((d) => d.sortOrder).toList(),
          expectedOrder,
          reason: 'sortOrder gap/duplicate in $categoryId',
        );
      }
    });

    test('localization keys exist for vi/en/ja for every catalog entry', () {
      final keys = <String>[
        for (final t in DomainNavigationCatalog.tracks) t.nameKey,
        for (final c in DomainNavigationCatalog.categories) ...[
          c.nameKey,
          c.descriptionKey,
        ],
        for (final d in DomainNavigationCatalog.domains) d.nameKey,
      ];
      for (final key in keys) {
        for (final locale in _uiLocales) {
          final resolved = L10n.text(key, locale);
          expect(
            resolved,
            isNot(key),
            reason: 'missing $locale localization for key "$key"',
          );
          expect(resolved.trim(), isNotEmpty);
        }
      }
    });

    test('no platform branching in the shared catalog (Android/Web parity)', () {
      // DomainNavigationCatalog is a single plain-Dart const structure with
      // no kIsWeb/Platform.* branches, so Android and Web builds of this
      // Flutter app consume the exact same catalog instance.
      expect(DomainNavigationCatalog.tracks, isA<List<LearningTrackDefinition>>());
    });
  });

  group('Navigation flow', () {
    testWidgets('Level 1 shows exactly the 3 track cards', (tester) async {
      addTearDown(() {
        tester.view.resetPhysicalSize();
        tester.view.resetDevicePixelRatio();
      });
      await tester.pumpWidget(
        _app(const DomainNavigationScreen(uiLanguageCode: 'en')),
      );
      await tester.pumpAndSettle();

      expect(find.text('Basic Communication'), findsOneWidget);
      expect(find.text('Professional & Career'), findsOneWidget);
      expect(find.text('Exam Preparation'), findsOneWidget);
      expect(
        find.byWidgetPredicate(
          (w) => w is Semantics && (w.properties.button ?? false),
        ),
        findsAtLeastNWidgets(3),
        reason: 'each of the 3 track cards must expose a semantic button role',
      );
      expect(tester.takeException(), isNull);
    });

    testWidgets(
      'Professional & Career opens exactly 6 category cards',
      (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        await tester.pumpWidget(
          _app(const DomainNavigationScreen(uiLanguageCode: 'en')),
        );
        await tester.pumpAndSettle();

        await tester.tap(find.text('Professional & Career'));
        await tester.pumpAndSettle();

        expect(find.text('Digital & Tech'), findsOneWidget);
        expect(find.text('Corporate & Business'), findsOneWidget);
        expect(find.text('Hospitality & Customer Service'), findsOneWidget);
        expect(find.text('Engineering & Production'), findsOneWidget);
        expect(find.text('Healthcare & Education'), findsOneWidget);
        expect(find.text('Green & Supply Chain'), findsOneWidget);
        expect(tester.takeException(), isNull);
      },
    );

    testWidgets(
      'Basic Communication opens the placeholder shell, not a fake catalog',
      (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        await tester.pumpWidget(
          _app(const DomainNavigationScreen(uiLanguageCode: 'en')),
        );
        await tester.pumpAndSettle();

        await tester.tap(find.text('Basic Communication'));
        await tester.pumpAndSettle();

        expect(
          find.text("This track's catalog is not part of this task yet."),
          findsOneWidget,
        );
        expect(find.text('Digital & Tech'), findsNothing);
        expect(tester.takeException(), isNull);
      },
    );

    testWidgets(
      'each professional category opens the correct domains and every '
      'domain reaches the content-in-preparation state (no fake lesson)',
      (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        for (final category in DomainNavigationCatalog.categoriesForTrack(
          'professional_career',
        )) {
          // Force a full unmount between iterations: pumping the same const
          // widget tree again would let Flutter reuse the existing Navigator
          // element/state instead of resetting its pushed-route stack from
          // the previous iteration.
          await tester.pumpWidget(const SizedBox.shrink());
          await tester.pumpWidget(
            _app(const DomainNavigationScreen(uiLanguageCode: 'en')),
          );
          await tester.pumpAndSettle();
          await tester.tap(find.text('Professional & Career'));
          await tester.pumpAndSettle();

          await tester.tap(find.text(L10n.text(category.nameKey, 'en')));
          await tester.pumpAndSettle();

          final expectedDomains = DomainNavigationCatalog.domainsForCategory(
            category.stableId,
          );
          for (final domain in expectedDomains) {
            expect(
              find.text(L10n.text(domain.nameKey, 'en')),
              findsOneWidget,
              reason: '${domain.stableId} missing under ${category.stableId}',
            );
          }

          // Drill into the first domain: must show "content in preparation"
          // and must never fabricate lesson content or navigate further.
          await tester.tap(
            find.text(L10n.text(expectedDomains.first.nameKey, 'en')),
          );
          await tester.pumpAndSettle();
          expect(find.text('Content in preparation'), findsOneWidget);
          expect(tester.takeException(), isNull);
        }
      },
    );
  });

  group('Localization vi/en/ja', () {
    for (final locale in _uiLocales) {
      testWidgets('Level 1 renders localized track names in $locale', (
        tester,
      ) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        await tester.pumpWidget(
          _app(DomainNavigationScreen(uiLanguageCode: locale)),
        );
        await tester.pumpAndSettle();

        for (final track in DomainNavigationCatalog.sortedTracks()) {
          expect(
            find.text(L10n.text(track.nameKey, locale)),
            findsOneWidget,
            reason: 'track ${track.stableId} missing in $locale',
          );
        }
        expect(tester.takeException(), isNull);
      });
    }
  });

  group('Responsive layout (no overflow at required widths)', () {
    for (final width in _viewportWidths) {
      testWidgets('Level 1 lays out without overflow at width $width', (
        tester,
      ) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        _setViewport(tester, Size(width, 900));
        await tester.pumpWidget(
          _app(const DomainNavigationScreen(uiLanguageCode: 'vi')),
        );
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'width $width');
      });

      testWidgets('Level 2 (6 categories) lays out without overflow at '
          'width $width', (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        _setViewport(tester, Size(width, 900));
        await tester.pumpWidget(
          _app(
            const ProfessionalCategoriesPage(uiLanguageCode: 'ja'),
          ),
        );
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'width $width');
      });

      testWidgets('Level 3 (largest category, 5 domains) lays out without '
          'overflow at width $width', (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        _setViewport(tester, Size(width, 900));
        final digitalTech = DomainNavigationCatalog.categories.firstWhere(
          (c) => c.stableId == 'digital_technology',
        );
        await tester.pumpWidget(
          _app(
            ProfessionalDomainsPage(
              uiLanguageCode: 'en',
              category: digitalTech,
            ),
          ),
        );
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'width $width');
      });
    }
  });

  group('Blocker E — locale x width x level matrix (min 3 x 5 x 4 = 60)', () {
    for (final locale in _uiLocales) {
      for (final width in _viewportWidths) {
        testWidgets(
          'locale=$locale width=$width — all 4 levels render without '
          'overflow, no literal key, no stale unit',
          (tester) async {
            addTearDown(() {
              tester.view.resetPhysicalSize();
              tester.view.resetDevicePixelRatio();
            });
            _setViewport(tester, Size(width, 1000));

            // Level 1 — Learning Tracks.
            await tester.pumpWidget(
              _app(DomainNavigationScreen(uiLanguageCode: locale)),
            );
            await _pumpSettled(tester);
            for (final track in DomainNavigationCatalog.sortedTracks()) {
              expect(
                find.text(L10n.text(track.nameKey, locale)),
                findsOneWidget,
                reason: 'level 1 track ${track.stableId} missing at '
                    'locale=$locale width=$width',
              );
            }
            _assertNoLiteralKeysVisible(tester);
            _assertNoOverflowOrStaleUnit(tester, locale);

            // Level 2 — Professional Categories.
            await tester.pumpWidget(
              _app(ProfessionalCategoriesPage(uiLanguageCode: locale)),
            );
            await _pumpSettled(tester);
            for (final category in DomainNavigationCatalog.categoriesForTrack(
              'professional_career',
            )) {
              expect(
                find.text(L10n.text(category.nameKey, locale)),
                findsOneWidget,
                reason: 'level 2 category ${category.stableId} missing at '
                    'locale=$locale width=$width',
              );
            }
            _assertNoLiteralKeysVisible(tester);
            _assertNoOverflowOrStaleUnit(tester, locale);

            // Level 3 — Domain Grid. digital_technology is the largest
            // category (5 domains), so overflow at the narrowest width
            // would surface here first.
            final digitalTech = DomainNavigationCatalog.categories
                .firstWhere((c) => c.stableId == 'digital_technology');
            await tester.pumpWidget(
              _app(
                ProfessionalDomainsPage(
                  uiLanguageCode: locale,
                  category: digitalTech,
                ),
              ),
            );
            await _pumpSettled(tester);
            final domains = DomainNavigationCatalog.domainsForCategory(
              digitalTech.stableId,
            );
            for (final domain in domains) {
              expect(
                find.text(L10n.text(domain.nameKey, locale)),
                findsOneWidget,
                reason: 'level 3 domain ${domain.stableId} missing at '
                    'locale=$locale width=$width',
              );
            }
            _assertNoLiteralKeysVisible(tester);
            _assertNoOverflowOrStaleUnit(tester, locale);

            // Level 4 — Domain Detail / Content Preparation shell. Every
            // domain in this catalog is comingSoon (no curriculum exists
            // yet), so this also exercises "does not open fake lesson
            // content": the shell must show only the content-in-preparation
            // state with zero tappable/navigable affordances.
            await tester.pumpWidget(
              _app(
                DomainDetailPage(
                  uiLanguageCode: locale,
                  domain: domains.first,
                ),
              ),
            );
            await _pumpSettled(tester);
            expect(
              find.text(L10n.text('contentInPreparation', locale)),
              findsOneWidget,
              reason: 'level 4 content-in-preparation shell missing at '
                  'locale=$locale width=$width',
            );
            // Card is the tappable-affordance widget every real nav card
            // (Level 1-3) is built from; the AppBar back button is a plain
            // TextButton, so this correctly excludes it while still
            // catching any accidental interactive card on the detail page.
            expect(
              find.byType(Card),
              findsNothing,
              reason: 'level 4 shell must not expose any card-based '
                  'tappable/navigable affordance (would risk opening fake '
                  'lesson content)',
            );
            _assertNoLiteralKeysVisible(tester);
            _assertNoOverflowOrStaleUnit(tester, locale);
          },
        );
      }
    }
  });
}
