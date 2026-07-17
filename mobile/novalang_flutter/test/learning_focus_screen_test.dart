import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/models/niche.dart';
import 'package:novalang_flutter/models/user_profile.dart';
import 'package:novalang_flutter/screens/onboarding/niche_screen.dart';
import 'package:novalang_flutter/state/profile_provider.dart';
import 'package:novalang_flutter/state/shared_data_provider.dart';
import 'package:novalang_flutter/widgets/niche/collapsible_notice_card.dart';
import 'package:novalang_flutter/widgets/niche/niche_chip.dart';

/// Stable IDs for the 7 professional categories (also the `category` field
/// on each of the 27 domain niches in shared/config/niche_options.json).
///
/// NOVALANG-DOMAIN-TAXONOMY-RESTRUCTURE-01 (2026-07-16): split
/// robotics_iot_automation -> robotics_automation + iot;
/// finance_accounting_audit -> finance + accounting_audit; moved
/// ecommerce_online_operations and logistics_supply_chain into
/// corporate_business; renamed green_agriculture_supply_chain ->
/// agriculture_fisheries_sustainability (logistics moved out); split
/// care_health_education -> health_care + education_social_services.
const _professionalCategoryIds = <String>{
  'digital_technology',
  'corporate_business',
  'hospitality_customer_service',
  'engineering_production',
  'health_care',
  'education_social_services',
  'agriculture_fisheries_sustainability',
};

const _expectedDomainCountByCategory = <String, int>{
  'digital_technology': 5,
  'corporate_business': 8,
  'hospitality_customer_service': 4,
  'engineering_production': 3,
  'health_care': 2,
  'education_social_services': 2,
  'agriculture_fisheries_sustainability': 3,
};

const _uiLocales = <String>['vi', 'en', 'ja'];
const _viewportWidths = <double>[320, 375, 768, 1366, 1920];

class _LearningLanguageProfileNotifier extends ProfileNotifier {
  _LearningLanguageProfileNotifier(
    this._learningLanguageCode,
    this._uiLanguageCode,
  );

  final String _learningLanguageCode;
  final String _uiLanguageCode;

  @override
  UserProfile build() => UserProfile.defaults().copyWith(
    learningLanguageCode: _learningLanguageCode,
    uiLanguageCode: _uiLanguageCode,
  );
}

ProviderContainer _containerFor({
  String learningLanguageCode = 'ja',
  String uiLanguageCode = 'vi',
}) {
  final container = ProviderContainer(
    overrides: [
      profileProvider.overrideWith(
        () => _LearningLanguageProfileNotifier(
          learningLanguageCode,
          uiLanguageCode,
        ),
      ),
    ],
  );
  addTearDown(container.dispose);
  return container;
}

void _setViewport(WidgetTester tester, Size size) {
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
}

/// The three (learningLanguage, uiLanguage) combos exercised by the
/// responsive matrix, keyed by UI locale.
const _responsiveProfiles = <String, ({String learning, String ui})>{
  'vi': (learning: 'en', ui: 'vi'),
  'en': (learning: 'en', ui: 'en'),
  'ja': (learning: 'ja', ui: 'ja'),
};

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  // Pre-warmed containers for the widget tests. The chained catalog
  // FutureProviders (niche catalog -> exam catalog -> groupedNichesProvider)
  // read assets via rootBundle; that IO must run in a real async zone, not
  // inside testWidgets' fake-async pump zone (loading there hangs — same
  // caveat noted in stage1_web_visual_regression_test.dart). Reading them
  // once in setUpAll caches the resolved data so each widget test sees an
  // already-resolved AsyncData on first build instead of racing finite
  // pumps against asset IO.
  final warmedContainers = <String, ProviderContainer>{};

  setUpAll(() async {
    for (final entry in _responsiveProfiles.entries) {
      final container = ProviderContainer(
        overrides: [
          profileProvider.overrideWith(
            () => _LearningLanguageProfileNotifier(
              entry.value.learning,
              entry.value.ui,
            ),
          ),
        ],
      );
      await container.read(groupedNichesProvider.future);
      await container.read(nicheCatalogProvider.future);
      warmedContainers[entry.key] = container;
    }
  });

  tearDownAll(() {
    for (final container in warmedContainers.values) {
      container.dispose();
    }
    warmedContainers.clear();
  });

  group('Catalog/integration (real production data source)', () {
    test(
      'professional focus has exactly 7 categories and 27 domains, 5/8/4/3/2/2/3',
      () async {
        final container = _containerFor();
        final groups = await container.read(groupedNichesProvider.future);
        final professionalKeys = groups.keys
            .where(_professionalCategoryIds.contains)
            .toSet();
        expect(professionalKeys, _professionalCategoryIds);

        var total = 0;
        for (final entry in _expectedDomainCountByCategory.entries) {
          final count = groups[entry.key]?.length ?? 0;
          expect(count, entry.value, reason: 'category ${entry.key}');
          total += count;
        }
        expect(total, 27);
      },
    );

    test('robotics_automation and iot exist under digital_technology', () async {
      final container = _containerFor();
      final niches = await container.read(nicheCatalogProvider.future);
      for (final id in ['robotics_automation', 'iot']) {
        final matches = niches.where((n) => n.id == id).toList();
        expect(matches, hasLength(1), reason: id);
        expect(matches.single.category, 'digital_technology', reason: id);
      }
      expect(niches.any((n) => n.id == 'robotics_iot_automation'), isFalse);
    });

    test('finance and accounting_audit exist under corporate_business', () async {
      final container = _containerFor();
      final niches = await container.read(nicheCatalogProvider.future);
      for (final id in ['finance', 'accounting_audit']) {
        final matches = niches.where((n) => n.id == id).toList();
        expect(matches, hasLength(1), reason: id);
        expect(matches.single.category, 'corporate_business', reason: id);
      }
      expect(niches.any((n) => n.id == 'finance_accounting_audit'), isFalse);
    });

    test(
      'ecommerce_online_operations and logistics_supply_chain moved to corporate_business',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        for (final id in [
          'ecommerce_online_operations',
          'logistics_supply_chain',
        ]) {
          final matches = niches.where((n) => n.id == id).toList();
          expect(matches, hasLength(1), reason: id);
          expect(matches.single.category, 'corporate_business', reason: id);
        }
      },
    );

    test(
      'health_care and education_social_services replace care_health_education',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        const expected = <String, String>{
          'clinical_healthcare': 'health_care',
          'nursing_elderly_care': 'health_care',
          'education_school': 'education_social_services',
          'social_public_services': 'education_social_services',
        };
        for (final entry in expected.entries) {
          final matches = niches.where((n) => n.id == entry.key).toList();
          expect(matches, hasLength(1), reason: entry.key);
          expect(matches.single.category, entry.value, reason: entry.key);
        }
        expect(
          niches.any((n) => n.category == 'care_health_education'),
          isFalse,
        );
      },
    );

    test(
      'agriculture_fisheries_sustainability replaces green_agriculture_supply_chain',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        const domains = [
          'agriculture_agritech',
          'fisheries_aquaculture',
          'green_energy_building_operations',
        ];
        for (final id in domains) {
          final matches = niches.where((n) => n.id == id).toList();
          expect(matches, hasLength(1), reason: id);
          expect(
            matches.single.category,
            'agriculture_fisheries_sustainability',
            reason: id,
          );
        }
        expect(
          niches.any((n) => n.category == 'green_agriculture_supply_chain'),
          isFalse,
        );
      },
    );

    test(
      'food_processing_beverage_production is not a top-level selectable niche',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        expect(
          niches.any((n) => n.id == 'food_processing_beverage_production'),
          isFalse,
        );
      },
    );

    test(
      'marketing_communications_content exists under corporate_business',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        final matches = niches
            .where((n) => n.id == 'marketing_communications_content')
            .toList();
        expect(matches, hasLength(1));
        expect(matches.single.category, 'corporate_business');
      },
    );

    test(
      'old 12-domain legacy catalog no longer exists as parallel data',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        const oldIds = <String>[
          'it_programming',
          'business_office',
          'healthcare',
          'logistics_delivery',
          'finance_accounting',
          'marketing_content_creation',
          'environment_energy_agriculture',
        ];
        for (final id in oldIds) {
          expect(niches.any((n) => n.id == id), isFalse, reason: id);
        }
      },
    );

    test(
      'all 27 domains are present directly in the grouped result (no navigation needed)',
      () async {
        final container = _containerFor();
        final groups = await container.read(groupedNichesProvider.future);
        final allProfessionalNiches = _professionalCategoryIds
            .expand((id) => groups[id] ?? const <Niche>[])
            .toList();
        expect(allProfessionalNiches.length, 27);
        expect(
          allProfessionalNiches.map((n) => n.id).toSet().length,
          27,
          reason: 'domain ids must be unique',
        );
      },
    );

    test(
      'every professional category/domain resolves vi/en/ja localization',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        final professional = niches.where(
          (n) => _professionalCategoryIds.contains(n.category),
        );
        for (final niche in professional) {
          for (final locale in _uiLocales) {
            expect(
              niche.localizedTitle(locale).trim(),
              isNotEmpty,
              reason: niche.id,
            );
            expect(
              niche.localizedCategory(locale).trim(),
              isNotEmpty,
              reason: niche.id,
            );
          }
        }
      },
    );

    test(
      'legacy career niche IDs migrate forward to valid catalog IDs (no data loss)',
      () async {
        final container = _containerFor();
        final niches = await container.read(nicheCatalogProvider.future);
        final validIds = niches.map((n) => n.id).toSet()
          ..add('daily_life')
          ..add('exam_preparation');

        // Every legacyIdMap target must resolve to a real, current catalog id
        // (guards against dangling migration targets after the 12->25 rename).
        for (final entry in UserProfile.nicheLegacyIdMap.entries) {
          expect(
            validIds.contains(entry.value),
            isTrue,
            reason:
                'legacy "${entry.key}" -> "${entry.value}" is not a valid '
                'current niche id',
          );
        }

        // The specific removed/renamed career IDs must each migrate forward.
        const expectedMigrations = <String, String>{
          'it_programming': 'it_software',
          'business_office': 'office_administration',
          'healthcare': 'clinical_healthcare',
          'logistics_delivery': 'logistics_supply_chain',
          'marketing_content_creation': 'marketing_communications_content',
        };
        for (final entry in expectedMigrations.entries) {
          expect(
            UserProfile.resolveCurriculumNicheId(entry.key),
            entry.value,
            reason: 'legacy ${entry.key} should map to ${entry.value}',
          );
        }

        expect(
          UserProfile.nicheLegacyIdMap,
          isNot(contains('environment_energy_agriculture')),
        );
        expect(
          UserProfile.resolveCurriculumNicheId(
            'environment_energy_agriculture',
          ),
          'environment_energy_agriculture',
        );
        expect(
          UserProfile.ambiguousLegacyNicheIds,
          contains('environment_energy_agriculture'),
        );

        // NOVALANG-DOMAIN-TAXONOMY-RESTRUCTURE-01: finance_accounting_audit
        // was split into finance + accounting_audit, so the old combined
        // legacy id has no single unambiguous forward target — same
        // treatment as environment_energy_agriculture above.
        expect(
          UserProfile.nicheLegacyIdMap,
          isNot(contains('finance_accounting')),
        );
        expect(
          UserProfile.resolveCurriculumNicheId('finance_accounting'),
          'finance_accounting',
        );
        expect(
          UserProfile.ambiguousLegacyNicheIds,
          contains('finance_accounting'),
        );
      },
    );
  });

  group('Collapsible notice', () {
    Widget wrap(Widget child) => MaterialApp(
      theme: ThemeData.dark(useMaterial3: true),
      home: Scaffold(body: child),
    );

    testWidgets(
      'defaults to collapsed with preview + tap-to-read-more affordance',
      (tester) async {
        await tester.pumpWidget(
          wrap(const CollapsibleNoticeCard(languageCode: 'vi')),
        );
        await tester.pump();

        expect(
          find.text(L10n.text('professionalNoticeTitle', 'vi')),
          findsOneWidget,
        );
        expect(
          find.text(L10n.text('professionalNoticePreview', 'vi')),
          findsOneWidget,
        );
        expect(
          find.text(L10n.text('professionalNoticeTapMore', 'vi')),
          findsOneWidget,
        );
        expect(
          find.text(L10n.text('professionalNoticeFull', 'vi')),
          findsNothing,
        );
      },
    );

    testWidgets(
      'tapping the whole card expands: full content shows, tap-more disappears',
      (tester) async {
        await tester.pumpWidget(
          wrap(const CollapsibleNoticeCard(languageCode: 'en')),
        );
        await tester.pump();

        await tester.tap(find.byType(CollapsibleNoticeCard));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 250));

        expect(
          find.text(L10n.text('professionalNoticeFull', 'en')),
          findsOneWidget,
        );
        expect(
          find.text(L10n.text('professionalNoticeTapMore', 'en')),
          findsNothing,
        );
        expect(
          find.text(L10n.text('professionalNoticePreview', 'en')),
          findsNothing,
        );
        expect(tester.takeException(), isNull);
      },
    );

    testWidgets('tapping again collapses back to preview state', (
      tester,
    ) async {
      await tester.pumpWidget(
        wrap(const CollapsibleNoticeCard(languageCode: 'ja')),
      );
      await tester.pump();

      await tester.tap(find.byType(CollapsibleNoticeCard));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 250));
      await tester.tap(find.byType(CollapsibleNoticeCard));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 250));

      expect(
        find.text(L10n.text('professionalNoticePreview', 'ja')),
        findsOneWidget,
      );
      expect(
        find.text(L10n.text('professionalNoticeTapMore', 'ja')),
        findsOneWidget,
      );
      expect(tester.takeException(), isNull);
    });

    testWidgets('exposes button + expanded/collapsed semantics state', (
      tester,
    ) async {
      final handle = tester.ensureSemantics();

      await tester.pumpWidget(
        wrap(const CollapsibleNoticeCard(languageCode: 'en')),
      );
      await tester.pump();

      expect(
        tester.getSemantics(find.byType(CollapsibleNoticeCard)),
        isSemantics(isButton: true, hasExpandedState: true, isExpanded: false),
      );

      await tester.tap(find.byType(CollapsibleNoticeCard));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 250));

      expect(
        tester.getSemantics(find.byType(CollapsibleNoticeCard)),
        isSemantics(hasExpandedState: true, isExpanded: true),
      );

      handle.dispose();
    });
  });

  group('Exam catalog (embedded in the same Learning Focus screen)', () {
    test('Japanese shows only JLPT — JFT-Basic and BJT are hidden', () async {
      final container = _containerFor(learningLanguageCode: 'ja');
      final groups = await container.read(groupedNichesProvider.future);
      final examNiches = groups['Exam Preparation'] ?? const <Niche>[];
      expect(examNiches, hasLength(1));
      expect(examNiches.single.id, 'exam_jlpt');
    });

    test('English shows exactly IELTS and TOEIC — TOEFL is hidden', () async {
      final container = _containerFor(learningLanguageCode: 'en');
      final groups = await container.read(groupedNichesProvider.future);
      final examNiches = groups['Exam Preparation'] ?? const <Niche>[];
      expect(examNiches.map((n) => n.id).toSet(), <String>{
        'exam_ielts',
        'exam_toeic',
      });
    });
  });

  group('Responsive x locale matrix on the real Learning Focus screen', () {
    testWidgets(
      'professional categories collapse independently and preserve selection',
      (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        _setViewport(tester, const Size(375, 3000));
        final container = warmedContainers['vi']!;
        final niches = container.read(nicheCatalogProvider).requireValue;
        final digital = niches
            .where((niche) => niche.category == 'digital_technology')
            .toList();
        final corporate = niches
            .where((niche) => niche.category == 'corporate_business')
            .toList();
        final digitalCategory = digital.first.localizedCategory('vi');
        final corporateCategory = corporate.first.localizedCategory('vi');
        final digitalDomain = digital.first.localizedTitle('vi');
        final corporateDomain = corporate.first.localizedTitle('vi');

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              theme: ThemeData.dark(useMaterial3: true),
              home: const NicheScreen(),
            ),
          ),
        );
        await tester.pump();

        expect(find.textContaining(digitalDomain), findsNothing);
        expect(find.textContaining(corporateDomain), findsNothing);

        await tester.tap(find.text(digitalCategory).first);
        await tester.pump(const Duration(milliseconds: 200));
        expect(find.textContaining(digitalDomain), findsOneWidget);
        expect(
          find.descendant(
            of: find.ancestor(
              of: find.textContaining(digitalDomain),
              matching: find.byType(NicheChip),
            ),
            matching: find.byType(Icon),
          ),
          findsNothing,
          reason: 'unselected domains have no decorative leading icon',
        );

        await tester.tap(find.text(corporateCategory).first);
        await tester.pump(const Duration(milliseconds: 200));
        expect(find.textContaining(digitalDomain), findsOneWidget);
        expect(find.textContaining(corporateDomain), findsOneWidget);

        await tester.tap(find.textContaining(digitalDomain));
        await tester.pump();
        expect(
          find.textContaining(
            L10n.text('selectedDomainCount', 'vi').replaceAll('{count}', '1'),
          ),
          findsOneWidget,
        );

        await tester.tap(find.text(digitalCategory).first);
        await tester.pump(const Duration(milliseconds: 200));
        expect(find.textContaining(digitalDomain), findsNothing);
        expect(find.textContaining(corporateDomain), findsOneWidget);

        await tester.tap(find.text(digitalCategory).first);
        await tester.pump(const Duration(milliseconds: 200));
        expect(find.textContaining(digitalDomain), findsOneWidget);
        expect(tester.takeException(), isNull);
      },
    );

    testWidgets(
      'Project Owner report: every one of the 7 professional categories '
      'individually expands and collapses (not just digital_technology/'
      'corporate_business, which the test above already covers)',
      (tester) async {
        addTearDown(() {
          tester.view.resetPhysicalSize();
          tester.view.resetDevicePixelRatio();
        });
        _setViewport(tester, const Size(375, 4000));
        final container = warmedContainers['vi']!;
        final niches = container.read(nicheCatalogProvider).requireValue;

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              theme: ThemeData.dark(useMaterial3: true),
              home: const NicheScreen(),
            ),
          ),
        );
        await tester.pump();

        for (final categoryId in _professionalCategoryIds) {
          final domainsInCategory = niches
              .where((niche) => niche.category == categoryId)
              .toList();
          expect(
            domainsInCategory,
            isNotEmpty,
            reason: 'category $categoryId has no domains in the real catalog',
          );
          final categoryLabel = domainsInCategory.first.localizedCategory(
            'vi',
          );
          final domainLabel = domainsInCategory.first.localizedTitle('vi');

          final headerFinder = find.text(categoryLabel);
          expect(
            headerFinder,
            findsWidgets,
            reason: 'category header not found for $categoryId ("$categoryLabel")',
          );

          expect(
            find.textContaining(domainLabel),
            findsNothing,
            reason:
                '$categoryId ("$categoryLabel") should start collapsed but '
                '"$domainLabel" is already visible',
          );

          await tester.tap(headerFinder.first);
          await tester.pump(const Duration(milliseconds: 200));
          expect(
            find.textContaining(domainLabel),
            findsOneWidget,
            reason:
                'Tapping the $categoryId ("$categoryLabel") header did not '
                'reveal its domain "$domainLabel" — this category does not '
                'expand.',
          );

          await tester.tap(headerFinder.first);
          await tester.pump(const Duration(milliseconds: 200));
          expect(
            find.textContaining(domainLabel),
            findsNothing,
            reason:
                'Tapping the $categoryId ("$categoryLabel") header a second '
                'time did not collapse it back — "$domainLabel" is still '
                'visible.',
          );

          expect(tester.takeException(), isNull, reason: categoryId);
        }
      },
    );

    for (final locale in _uiLocales) {
      for (final width in _viewportWidths) {
        testWidgets(
          'locale=$locale width=$width renders embedded categories/domains '
          'without overflow, no stale labels, no fake exam options',
          (tester) async {
            addTearDown(() {
              tester.view.resetPhysicalSize();
              tester.view.resetDevicePixelRatio();
            });
            _setViewport(tester, Size(width, 2400));

            final container = warmedContainers[locale]!;
            // Warmed in setUpAll, so the AsyncValue is already resolved —
            // read synchronously to avoid any await inside the fake-async
            // test body.
            final niches = container.read(nicheCatalogProvider).requireValue;
            final digitalTechLabel = niches
                .firstWhere((n) => n.category == 'digital_technology')
                .localizedCategory(locale);

            // Mount the real production NicheScreen against the pre-warmed
            // container: catalog data is already resolved, so it renders on
            // the first frame with no async load inside the fake-async zone.
            await tester.pumpWidget(
              UncontrolledProviderScope(
                container: container,
                child: MaterialApp(
                  theme: ThemeData.dark(useMaterial3: true),
                  home: const NicheScreen(),
                ),
              ),
            );
            await tester.pump();

            // The real screen must show the professional section heading
            // and at least one localized category name directly (no
            // navigation), proving the embedded layout loaded.
            expect(
              find.text(L10n.text('professionalFocusSectionTitle', locale)),
              findsOneWidget,
              reason: 'locale=$locale width=$width',
            );
            expect(
              find.text(digitalTechLabel),
              findsWidgets,
              reason: 'locale=$locale width=$width',
            );

            // No stale 12-domain labels (old catalog fully retired).
            expect(find.text('IT & Programming'), findsNothing);
            expect(find.text('Business & Office'), findsNothing);

            // No JFT-Basic/BJT chip for Japanese; no TOEFL chip for English.
            if (locale == 'ja') {
              expect(find.textContaining('JFT-Basic'), findsNothing);
              expect(find.textContaining('BJT'), findsNothing);
            }
            if (locale != 'ja') {
              expect(find.textContaining('TOEFL'), findsNothing);
            }

            expect(
              tester.takeException(),
              isNull,
              reason: 'locale=$locale width=$width',
            );
          },
        );
      }
    }
  });
}
