import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/app_scroll_behavior.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';
import 'package:novalang_flutter/screens/learn/lesson_screen.dart';

/// Regression test for the Vocabulary Card continuous-scroll contract.
/// Renders the real production widget tree (LessonVocabularyPage, not an isolated card in a
/// hand-built SingleChildScrollView) and performs REAL drag/pointer-scroll
/// gestures FROM AN EXPLICIT ON-SCREEN COORDINATE, asserting on actual
/// widget movement — not just absence of exceptions.
///
/// Deliberately does NOT use `tester.drag(finder, ...)` / `getCenter(finder)`
/// for the expanded-body drag start point: for a tall expanded card, a
/// widget's geometric center can legitimately fall outside the visible
/// viewport (confirmed via a `tester.drag` hit-test warning during initial
/// diagnosis), which would make the drag a no-op for reasons unrelated to
/// the real bug. Every drag/scroll below starts from a fixed, guaranteed
/// on-screen coordinate instead.
Future<Lesson> _loadLesson(String id) async {
  final raw = await rootBundle.loadString('assets/shared/lessons.json');
  final payload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
  final json = (payload['lessons'] as List)
      .cast<Map>()
      .map((item) => Map<String, dynamic>.from(item))
      .singleWhere((item) => item['id'] == id);
  return CurriculumLesson.fromJson(json).toLesson(nativeLanguage: 'en');
}

/// Test harness replicating the real production state-lifting pattern from
/// lesson_screen.dart's `_expandedVocabularyCards` / `onVocabularyExpansionChanged`.
class _Harness extends StatefulWidget {
  const _Harness({required this.lesson, this.initiallyExpanded = const {}});

  final Lesson lesson;
  final Set<String> initiallyExpanded;

  @override
  State<_Harness> createState() => _HarnessState();
}

class _HarnessState extends State<_Harness> {
  late final Set<String> expanded = {...widget.initiallyExpanded};

  @override
  Widget build(BuildContext context) => ProviderScope(
    child: MaterialApp(
      theme: ThemeData.dark(useMaterial3: true),
      scrollBehavior: AppScrollBehavior(),
      home: LessonVocabularyPage(
        lesson: widget.lesson,
        uiLanguageCode: 'en',
        nativeLanguageCode: 'en',
        learningLanguageCode: 'ja',
        expandedCardIds: expanded,
        onExpansionChanged: (id) => setState(() {
          if (expanded.contains(id)) {
            expanded.remove(id);
          } else {
            expanded.add(id);
          }
        }),
      ),
    ),
  );
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late Lesson golden;

  setUpAll(() async {
    await MobileUiStrings.load();
    golden = await _loadLesson('ja-daily_life-m01-u1-l1');
  });

  Future<void> setViewport(
    WidgetTester tester,
    double width,
    double height,
  ) async {
    tester.view.physicalSize = Size(width, height);
    tester.view.devicePixelRatio = 1;
    addTearDown(() {
      tester.view.resetPhysicalSize();
      tester.view.resetDevicePixelRatio();
    });
  }

  /// A point guaranteed to be both on-screen AND inside the given expanded
  /// details rect — computed from the rect's own on-screen top edge rather
  /// than a fixed viewport fraction, so it stays correct regardless of how
  /// much content (e.g. a kDebugMode diagnostic banner) is rendered above
  /// the card in the current build.
  Offset pointInsideDetails(WidgetTester tester, Key detailsKey) {
    final rect = tester.getRect(find.byKey(detailsKey));
    final screenHeight =
        tester.view.physicalSize.height / tester.view.devicePixelRatio;
    final y = (rect.top + 40).clamp(0.0, screenHeight - 8);
    return Offset(rect.center.dx, y);
  }

  group('Vocabulary Card real scroll behavior (production widget tree)', () {
    testWidgets(
      'touch drag from expanded body scrolls content while its header stays pinned',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstId = golden.vocabulary.first.displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId}),
        );
        await tester.pumpAndSettle();

        final headerKey = ValueKey('lesson-vocabulary-surface-$firstId');
        expect(find.byKey(headerKey), findsOneWidget);

        final beforeY = tester.getTopLeft(find.byKey(headerKey)).dy;
        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        final detailsKey = ValueKey('vocabulary-details-$firstId');
        final dragPoint = pointInsideDetails(tester, detailsKey);

        // Sanity: the drag start point must actually land on the expanded
        // details surface, not empty space — otherwise this test would not
        // be testing what it claims to.
        final detailsRect = tester.getRect(find.byKey(detailsKey));
        final detailsBeforeY = detailsRect.top;
        expect(
          detailsRect.contains(dragPoint),
          isTrue,
          reason:
              'Test setup error: drag point $dragPoint is not inside the '
              'expanded body rect $detailsRect. Strengthen/shrink the fixture '
              'so the sanity check holds.',
        );

        await tester.dragFrom(
          dragPoint,
          const Offset(0, -500),
          kind: PointerDeviceKind.touch,
        );
        await tester.pumpAndSettle();

        expect(position.pixels, greaterThan(100));
        expect(
          tester.getTopLeft(find.byKey(detailsKey)).dy,
          lessThan(detailsBeforeY - 100),
          reason: 'Only the card header may pin; expanded content must scroll.',
        );
        expect(
          tester.getTopLeft(find.byKey(headerKey)).dy,
          closeTo(beforeY, 0.01),
          reason:
              'The current card header must remain pinned while its body scrolls.',
        );
      },
    );

    testWidgets(
      'dragging with a MOUSE from inside the expanded body scrolls while its header stays pinned '
      '(FIX-05: every prior drag test in this file used PointerDeviceKind.touch, '
      'which never exercises ScrollBehavior.dragDevices\' real-world mouse gate)',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstId = golden.vocabulary.first.displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId}),
        );
        await tester.pumpAndSettle();

        final headerKey = ValueKey('lesson-vocabulary-surface-$firstId');
        final beforeY = tester.getTopLeft(find.byKey(headerKey)).dy;
        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        final detailsKey = ValueKey('vocabulary-details-$firstId');
        final dragPoint = pointInsideDetails(tester, detailsKey);

        await tester.dragFrom(
          dragPoint,
          const Offset(0, -500),
          kind: PointerDeviceKind.mouse,
        );
        await tester.pumpAndSettle();

        expect(position.pixels, greaterThan(100));
        expect(
          tester.getTopLeft(find.byKey(headerKey)).dy,
          closeTo(beforeY, 0.01),
        );
      },
    );

    testWidgets('expanding a long card increases maxScrollExtent', (
      tester,
    ) async {
      await setViewport(tester, 375, 812);
      await tester.pumpWidget(_Harness(lesson: golden));
      await tester.pumpAndSettle();

      final scrollable = find.byType(Scrollable);
      expect(scrollable, findsOneWidget);
      final position = tester.state<ScrollableState>(scrollable).position;
      final before = position.maxScrollExtent;
      final firstId = golden.vocabulary.first.displayText;
      final firstSurface = find.byKey(
        ValueKey('lesson-vocabulary-surface-$firstId'),
      );

      await tester.tap(
        find.descendant(
          of: firstSurface,
          matching: find.byIcon(Icons.keyboard_arrow_down),
        ),
      );
      await tester.pumpAndSettle();

      final positionAfterExpansion = tester
          .state<ScrollableState>(find.byType(Scrollable))
          .position;
      expect(
        identical(position, positionAfterExpansion),
        isTrue,
        reason: 'Expansion must not detach or replace the page ScrollPosition.',
      );
      expect(
        position.maxScrollExtent,
        greaterThan(before),
        reason:
            'Expanded details must add their natural height to the same '
            'outer scroll extent.',
      );
    });

    testWidgets('dragging from a collapsed card scrolls the whole page', (
      tester,
    ) async {
      await setViewport(tester, 375, 500);
      await tester.pumpWidget(_Harness(lesson: golden));
      await tester.pumpAndSettle();

      final position = tester
          .state<ScrollableState>(find.byType(Scrollable))
          .position;
      expect(position.maxScrollExtent, greaterThan(0));

      await tester.dragFrom(
        const Offset(187.5, 300),
        const Offset(0, -200),
        kind: PointerDeviceKind.touch,
      );
      await tester.pumpAndSettle();

      expect(position.pixels, greaterThan(0));
    });

    testWidgets(
      'the final vocabulary card becomes reachable above the bottom nav after dragging',
      (tester) async {
        await setViewport(tester, 375, 812);
        final allIds = golden.vocabulary.map((v) => v.displayText).toSet();
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: allIds),
        );
        await tester.pumpAndSettle();

        final lastItem = golden.vocabulary.last;
        final lastHeaderKey = ValueKey(
          'lesson-vocabulary-surface-${lastItem.displayText}',
        );
        final screenHeight =
            tester.view.physicalSize.height / tester.view.devicePixelRatio;
        bool isOnScreenAboveNav(WidgetTester t) {
          final finder = find.byKey(lastHeaderKey);
          if (finder.evaluate().isEmpty) return false;
          final y = t.getTopLeft(finder).dy;
          return y >= 0 && y < screenHeight - kBottomNavigationBarHeight;
        }

        // Initially the last card must not already be on-screen (otherwise
        // this test would trivially pass without proving anything). All
        // vocabulary cards exist in the element tree regardless of scroll
        // position (a plain, non-virtualized Column) — the meaningful check
        // is screen POSITION, not find()-existence.
        expect(
          isOnScreenAboveNav(tester),
          isFalse,
          reason:
              'Fixture is not long enough to require scrolling — '
              'strengthen the fixture before trusting this test.',
        );

        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        var attempts = 0;
        while (!isOnScreenAboveNav(tester) && attempts < 40) {
          position.jumpTo(
            (position.pixels + 600).clamp(0, position.maxScrollExtent),
          );
          await tester.pump();
          attempts += 1;
        }

        expect(
          isOnScreenAboveNav(tester),
          isTrue,
          reason:
              'Could not reach the final vocabulary card above the '
              'bottom nav after $attempts drags.',
        );
      },
    );

    testWidgets(
      'collapsing and re-expanding a card does not jump the page back to the top',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstId = golden.vocabulary.first.displayText;
        final secondId = golden.vocabulary.elementAt(1).displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId, secondId}),
        );
        await tester.pumpAndSettle();

        final headerKey = ValueKey('lesson-vocabulary-surface-$firstId');
        final dragPoint = pointInsideDetails(
          tester,
          ValueKey('vocabulary-details-$firstId'),
        );

        // Small drag that keeps the card's own toggle on-screen — the point
        // of this test is scroll-position preservation, not re-locating a
        // toggle that has scrolled away (that is normal scrolling, not a bug).
        await tester.dragFrom(
          dragPoint,
          const Offset(0, -80),
          kind: PointerDeviceKind.touch,
        );
        await tester.pumpAndSettle();

        final scrollable = find.byType(Scrollable);
        final scrolledPixels = tester
            .state<ScrollableState>(scrollable)
            .position
            .pixels;
        expect(
          scrolledPixels,
          greaterThan(0),
          reason:
              'Sanity check: the drag should have scrolled the page at all.',
        );

        // Collapse then re-expand the SAME card. Use ensureVisible first since
        // the toggle's exact on-screen position after a drag is an
        // implementation detail we should not need to hand-compute here.
        final toggle = find.descendant(
          of: find.byKey(headerKey),
          matching: find.byIcon(Icons.keyboard_arrow_up),
        );
        expect(toggle, findsOneWidget);
        await tester.ensureVisible(toggle);
        await tester.pumpAndSettle();
        await tester.tap(toggle);
        await tester.pumpAndSettle();
        expect(
          find.byKey(ValueKey('vocabulary-details-$firstId')),
          findsNothing,
        );

        final pixelsAfterCollapse = tester
            .state<ScrollableState>(scrollable)
            .position
            .pixels;
        expect(
          pixelsAfterCollapse,
          greaterThan(0),
          reason:
              'Collapsing a card must not reset the scroll offset to 0. '
              'before=$scrolledPixels afterCollapse=$pixelsAfterCollapse',
        );

        final expandToggle = find.descendant(
          of: find.byKey(headerKey),
          matching: find.byIcon(Icons.keyboard_arrow_down),
        );
        expect(expandToggle, findsOneWidget);
        await tester.ensureVisible(expandToggle);
        await tester.pumpAndSettle();
        await tester.tap(expandToggle);
        await tester.pumpAndSettle();

        final pixelsAfterReexpand = tester
            .state<ScrollableState>(scrollable)
            .position
            .pixels;
        expect(
          pixelsAfterReexpand,
          greaterThan(0),
          reason:
              'Re-expanding must not reset the scroll offset to 0 either. '
              'before=$scrolledPixels afterReexpand=$pixelsAfterReexpand',
        );
      },
    );

    testWidgets(
      'the next card header pushes off and replaces the pinned current header',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstId = golden.vocabulary.first.displayText;
        final secondId = golden.vocabulary.elementAt(1).displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId, secondId}),
        );
        await tester.pumpAndSettle();

        final first = find.byKey(
          ValueKey('lesson-vocabulary-surface-$firstId'),
        );
        final second = find.byKey(
          ValueKey('lesson-vocabulary-surface-$secondId'),
        );
        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        final pinnedY = tester.getTopLeft(first).dy;

        position.jumpTo(200);
        await tester.pump();
        expect(tester.getTopLeft(first).dy, closeTo(pinnedY, 0.01));

        var attempts = 0;
        while (attempts < 40 &&
            (second.evaluate().isEmpty ||
                tester.getTopLeft(second).dy > pinnedY + 0.01)) {
          position.jumpTo(
            (position.pixels + 100).clamp(0, position.maxScrollExtent),
          );
          await tester.pump();
          attempts += 1;
        }

        expect(second, findsOneWidget);
        expect(tester.getTopLeft(second).dy, closeTo(pinnedY, 0.01));
        if (first.evaluate().isNotEmpty) {
          expect(
            tester.getRect(first).overlaps(tester.getRect(second)),
            isFalse,
            reason:
                'The outgoing and incoming sticky headers must not overlap.',
          );
        }
      },
    );

    testWidgets('audio remains interactive on the pinned card header', (
      tester,
    ) async {
      await setViewport(tester, 375, 812);
      final calls = <MethodCall>[];
      final messenger =
          TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
      messenger.setMockMethodCallHandler(const MethodChannel('flutter_tts'), (
        call,
      ) async {
        calls.add(call);
        return 1;
      });
      addTearDown(
        () => messenger.setMockMethodCallHandler(
          const MethodChannel('flutter_tts'),
          null,
        ),
      );

      final first = golden.vocabulary.first;
      await tester.pumpWidget(
        _Harness(lesson: golden, initiallyExpanded: {first.displayText}),
      );
      await tester.pumpAndSettle();
      final position = tester
          .state<ScrollableState>(find.byType(Scrollable))
          .position;
      position.jumpTo(200);
      await tester.pump();

      final audio = find.byKey(
        ValueKey('lesson-vocabulary-audio-${first.displayText}'),
      );
      expect(audio, findsOneWidget);
      await tester.tap(audio);
      await tester.pumpAndSettle();

      expect(calls.any((call) => call.method == 'speak'), isTrue);
      expect(
        find.byKey(ValueKey('lesson-vocabulary-toggle-${first.displayText}')),
        findsOneWidget,
        reason: 'There must be one interactive header, not a sticky duplicate.',
      );
    });

    testWidgets(
      'multiple expanded cards stay inside the same outer scroll flow',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstTwo = golden.vocabulary
            .take(2)
            .map((v) => v.displayText)
            .toSet();
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: firstTwo),
        );
        await tester.pumpAndSettle();

        // Exactly one Scrollable should exist in the whole page — no
        // independent inner scrollable inside either expanded card.
        final scrollables = find.byType(Scrollable);
        expect(
          scrollables.evaluate().length,
          1,
          reason:
              'Expected exactly one Scrollable (the outer page); found '
              '${scrollables.evaluate().length}. An extra Scrollable means a '
              'card contains an independent inner scroll surface.',
        );

        // No independent scrollbar widget.
        expect(find.byType(Scrollbar), findsNothing);
        expect(find.byType(RawScrollbar), findsNothing);

        // Both expanded cards must be reachable (scrolled into view) from the
        // same drag flow. Widgets exist in the tree regardless of scroll
        // position (non-virtualized Column), so check actual screen position.
        final secondId = golden.vocabulary.elementAt(1).displayText;
        final secondHeaderKey = ValueKey('lesson-vocabulary-surface-$secondId');
        final screenHeight =
            tester.view.physicalSize.height / tester.view.devicePixelRatio;
        bool isOnScreen(WidgetTester t, Key key) {
          final finder = find.byKey(key);
          if (finder.evaluate().isEmpty) return false;
          final y = t.getTopLeft(finder).dy;
          return y >= 0 && y < screenHeight - kBottomNavigationBarHeight;
        }

        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        var attempts = 0;
        while (!isOnScreen(tester, secondHeaderKey) && attempts < 40) {
          position.jumpTo(
            (position.pixels + 300).clamp(0, position.maxScrollExtent),
          );
          await tester.pump();
          attempts += 1;
        }
        expect(
          isOnScreen(tester, secondHeaderKey),
          isTrue,
          reason:
              'Second expanded card was not reachable via the outer scroll.',
        );
      },
    );

    testWidgets(
      'two expanded cards expose their final content through the same scroll flow',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstTwo = golden.vocabulary
            .take(2)
            .map((v) => v.displayText)
            .toSet();
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: firstTwo),
        );
        await tester.pumpAndSettle();

        final secondId = golden.vocabulary.elementAt(1).displayText;
        final endFinder = find.byKey(
          ValueKey('vocabulary-details-end-$secondId'),
        );
        final screenHeight =
            tester.view.physicalSize.height / tester.view.devicePixelRatio;
        bool endIsVisible() {
          if (endFinder.evaluate().isEmpty) return false;
          final y = tester.getTopLeft(endFinder).dy;
          return y >= 0 && y < screenHeight - kBottomNavigationBarHeight;
        }

        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        var attempts = 0;
        while (!endIsVisible() && attempts < 20) {
          position.jumpTo(
            (position.pixels + 300).clamp(0, position.maxScrollExtent),
          );
          await tester.pump();
          attempts += 1;
        }

        expect(
          endIsVisible(),
          isTrue,
          reason:
              'The end of the second expanded card was not reachable '
              'after $attempts drags on the single outer scrollable.',
        );
      },
    );

    for (final width in [320.0, 375.0, 1366.0]) {
      testWidgets(
        'no horizontal overflow at width=$width with a card expanded',
        (tester) async {
          await setViewport(tester, width, 812);
          final firstId = golden.vocabulary.first.displayText;
          await tester.pumpWidget(
            _Harness(lesson: golden, initiallyExpanded: {firstId}),
          );
          await tester.pumpAndSettle();
          expect(tester.takeException(), isNull);
        },
      );
    }

    testWidgets(
      'mouse-wheel-style pointer scroll moves content (Web input path)',
      (tester) async {
        await setViewport(tester, 1280, 800);
        final firstId = golden.vocabulary.first.displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId}),
        );
        await tester.pumpAndSettle();

        final headerKey = ValueKey('lesson-vocabulary-surface-$firstId');
        final beforeY = tester.getTopLeft(find.byKey(headerKey)).dy;
        final position = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        final detailsKey = ValueKey('vocabulary-details-$firstId');
        final scrollPoint = pointInsideDetails(tester, detailsKey);

        final detailsRect = tester.getRect(find.byKey(detailsKey));
        expect(
          detailsRect.contains(scrollPoint),
          isTrue,
          reason:
              'Test setup error: scroll point $scrollPoint is not inside '
              'the expanded body rect $detailsRect.',
        );

        await tester.sendEventToBinding(
          PointerEnterEvent(position: scrollPoint),
        );
        await tester.sendEventToBinding(
          PointerScrollEvent(
            position: scrollPoint,
            scrollDelta: const Offset(0, 600),
          ),
        );
        await tester.pumpAndSettle();

        expect(position.pixels, greaterThan(100));
        expect(
          tester.getTopLeft(find.byKey(headerKey)).dy,
          closeTo(beforeY, 0.01),
        );
      },
    );

    testWidgets(
      'jumpTo and animateTo reach 200 and a rebuild does not reset pixels',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstId = golden.vocabulary.first.displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId}),
        );
        await tester.pumpAndSettle();

        final scrollable = find.byType(Scrollable);
        expect(scrollable, findsOneWidget);
        final position = tester.state<ScrollableState>(scrollable).position;
        expect(position.pixels, 0);

        position.jumpTo(200);
        await tester.pump();
        expect(position.pixels, greaterThan(0));

        position.jumpTo(0);
        await tester.pump();
        final animation = position.animateTo(
          200,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 300));
        await animation;
        expect(position.pixels, greaterThan(0));

        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId}),
        );
        await tester.pump();
        final positionAfterRebuild = tester
            .state<ScrollableState>(find.byType(Scrollable))
            .position;
        expect(identical(position, positionAfterRebuild), isTrue);
        expect(
          position.pixels,
          greaterThan(0),
          reason:
              'Rebuilding the page must retain its ScrollPosition '
              'instead of restoring pixels to zero.',
        );
      },
    );

    testWidgets(
      'Back and title stay fixed with the bottom navigation while cards scroll',
      (tester) async {
        await setViewport(tester, 375, 812);
        final firstId = golden.vocabulary.first.displayText;
        await tester.pumpWidget(
          _Harness(lesson: golden, initiallyExpanded: {firstId}),
        );
        await tester.pumpAndSettle();

        final appBar = find.byType(AppBar);
        expect(appBar, findsOneWidget);
        final back = find.descendant(
          of: appBar,
          matching: find.byIcon(Icons.arrow_back_ios_new),
        );
        final title = find.descendant(
          of: appBar,
          matching: find.text('Vocabulary cards'),
        );
        final bottomNav = find.byType(NavigationBar);
        expect(back, findsOneWidget);
        expect(title, findsOneWidget);
        expect(bottomNav, findsOneWidget);

        final backBefore = tester.getTopLeft(back).dy;
        final titleBefore = tester.getTopLeft(title).dy;
        final navBefore = tester.getTopLeft(bottomNav).dy;
        final dragPoint = pointInsideDetails(
          tester,
          ValueKey('vocabulary-details-$firstId'),
        );

        await tester.dragFrom(
          dragPoint,
          const Offset(0, -500),
          kind: PointerDeviceKind.touch,
        );
        await tester.pumpAndSettle();

        expect(tester.getTopLeft(back).dy, closeTo(backBefore, 0.01));
        expect(tester.getTopLeft(title).dy, closeTo(titleBefore, 0.01));
        expect(tester.getTopLeft(bottomNav).dy, closeTo(navBefore, 0.01));
      },
    );

    testWidgets(
      'full LessonScreen route keeps the vocabulary position after expansion rebuild',
      (tester) async {
        await setViewport(tester, 375, 812);
        await tester.pumpWidget(
          ProviderScope(
            child: MaterialApp(
              theme: ThemeData.dark(useMaterial3: true),
              home: LessonScreen(lesson: golden),
            ),
          ),
        );
        await tester.pumpAndSettle();

        await tester.tap(find.byIcon(Icons.style_outlined).first);
        await tester.pumpAndSettle();
        expect(find.byType(LessonVocabularyPage), findsOneWidget);

        final firstId = golden.vocabulary.first.displayText;
        final firstSurface = find.byKey(
          ValueKey('lesson-vocabulary-surface-$firstId'),
        );
        await tester.tap(
          find.descendant(
            of: firstSurface,
            matching: find.byIcon(Icons.keyboard_arrow_down),
          ),
        );
        await tester.pumpAndSettle();

        final scrollable = find.byType(Scrollable);
        expect(scrollable, findsOneWidget);
        final position = tester.state<ScrollableState>(scrollable).position;
        expect(position.maxScrollExtent, greaterThan(0));
        position.jumpTo(200);
        await tester.pump();
        expect(position.pixels, greaterThan(0));
        await tester.pump();
        expect(position.pixels, greaterThan(0));
      },
    );
  });
}
