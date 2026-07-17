import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/localization.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';

/// Café-safe Vietnamese detector: keys on letters/diacritics unique to
/// Vietnamese so Latin loanwords (e.g. "café") are not false positives.
final _viSpecific = RegExp('[đĐăĂâÂêÊôÔơƠưƯ]');
final _viStacked = RegExp(
  '[ằẳẵặầẩẫậảãạắấểễệềỉĩịọỏốồổỗộớờởỡợủũụứừửữựỳỷỹỵ]',
  caseSensitive: false,
);
bool _containsVietnamese(String s) =>
    _viSpecific.hasMatch(s) || _viStacked.hasMatch(s);

/// Collect every support string reachable in a resolved five-card content map,
/// skipping raw `*ByNative`/`*Vi` keys (already resolved) and skipping the
/// learning-language target fields (Japanese target text/readings are allowed
/// to remain Japanese regardless of native language).
List<String> _supportStrings(dynamic node, {String path = ''}) {
  final out = <String>[];
  void walk(dynamic n, String p) {
    if (n == null) return;
    if (n is String) {
      out.add(n);
      return;
    }
    if (n is List) {
      for (var i = 0; i < n.length; i++) {
        walk(n[i], '$p[$i]');
      }
      return;
    }
    if (n is Map) {
      n.forEach((key, value) {
        final k = key.toString();
        // Target-language fields: displayText/targetText/reading/speechText and
        // vocabulary headwords are learning-language content, not support.
        if (const {
          'displayText',
          'targetText',
          'reading',
          'speechText',
          'audioText',
          'canonicalText',
          'id',
          'audioLocale',
        }.contains(k)) {
          return;
        }
        walk(value, '$p.$k');
      });
    }
  }

  walk(node, path);
  return out;
}

Future<Lesson> _loadLesson(String id) async {
  final raw = await rootBundle.loadString('assets/shared/lessons.json');
  final payload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
  final json = (payload['lessons'] as List)
      .cast<Map>()
      .map((item) => Map<String, dynamic>.from(item))
      .singleWhere((item) => item['id'] == id);
  return CurriculumLesson.fromJson(json).toLesson(nativeLanguage: 'vi');
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late Lesson golden;

  setUpAll(() async {
    await MobileUiStrings.load();
    golden = await _loadLesson('ja-daily_life-m01-u1-l1');
  });

  group('Blocker A — resolver purity (Golden five-card vocabulary/support)', () {
    test('English native: no Vietnamese in resolved support content', () {
      final content = golden.localizedFiveCardContent('en');
      final leaks = _supportStrings(content['vocabularyDetails'])
          .where(_containsVietnamese)
          .toList();
      expect(leaks, isEmpty, reason: 'Vietnamese leaked into English: $leaks');
    });

    test('Japanese native: no Vietnamese in resolved support content', () {
      final content = golden.localizedFiveCardContent('ja');
      final leaks = _supportStrings(content['vocabularyDetails'])
          .where(_containsVietnamese)
          .toList();
      expect(leaks, isEmpty, reason: 'Vietnamese leaked into Japanese: $leaks');
    });

    test('Vietnamese native: support content is actually Vietnamese', () {
      final content = golden.localizedFiveCardContent('vi');
      final strings = _supportStrings(content['vocabularyDetails']);
      expect(strings.any(_containsVietnamese), isTrue);
    });

    test('the previously-leaking desu timingAndContext resolves per locale', () {
      final en = golden.localizedFiveCardContent('en')['vocabularyDetails']
          as List;
      final ja = golden.localizedFiveCardContent('ja')['vocabularyDetails']
          as List;
      final vi = golden.localizedFiveCardContent('vi')['vocabularyDetails']
          as List;
      final desuEn =
          (en.cast<Map>().firstWhere((m) => m['id'] == 'desu')['timingAndContext']
                  as List)
              .cast<String>();
      final desuJa =
          (ja.cast<Map>().firstWhere((m) => m['id'] == 'desu')['timingAndContext']
                  as List)
              .cast<String>();
      final desuVi =
          (vi.cast<Map>().firstWhere((m) => m['id'] == 'desu')['timingAndContext']
                  as List)
              .cast<String>();
      expect(desuEn.any(_containsVietnamese), isFalse);
      expect(desuJa.any(_containsVietnamese), isFalse);
      expect(desuVi.every(_containsVietnamese), isTrue);
      // Locale switch produces distinct, non-stale content.
      expect(desuEn, isNot(equals(desuVi)));
      expect(desuJa, isNot(equals(desuVi)));
      expect(desuEn, contains('Answer when asked their name.'));
    });
  });

  group('Blocker C — localized empty-content placeholder', () {
    // A vocab item whose optional support fields are empty.
    final emptyItem = const LessonVocabCard(
      displayText: 'テスト',
      meaning: 'test',
      reading: 'てすと',
      speechText: 'テスト',
    );

    Widget host(String locale, Map<String, dynamic> details) => MaterialApp(
      theme: ThemeData.dark(useMaterial3: true),
      home: Scaffold(
        body: SingleChildScrollView(
          child: LessonVocabularyCard(
            item: emptyItem,
            details: details,
            uiLanguageCode: locale,
            learningLanguageCode: 'ja',
            expanded: true,
            onToggle: () {},
          ),
        ),
      ),
    );

    for (final entry in const {
      'en': 'No content',
      'vi': 'Không có nội dung',
      'ja': '内容なし',
    }.entries) {
      testWidgets('empty optional fields show "${entry.value}" in ${entry.key}', (
        tester,
      ) async {
        await tester.pumpWidget(host(entry.key, const {}));
        await tester.pump();
        // Heading kept + localized placeholder shown (at least once).
        expect(find.text(entry.value), findsWidgets);
        expect(find.text(L10n.text('avoidUse', entry.key)), findsOneWidget);
        // No blank bullet / null / [] rendered.
        expect(find.text('•'), findsNothing);
        expect(find.text('• '), findsNothing);
        expect(find.text('null'), findsNothing);
        expect(find.text('[]'), findsNothing);
        expect(tester.takeException(), isNull);
      });
    }

    testWidgets('a populated optional field shows content, not the placeholder', (
      tester,
    ) async {
      await tester.pumpWidget(
        host('en', const {
          'avoid': ['Do not use it at night.'],
        }),
      );
      await tester.pump();
      expect(find.text('• Do not use it at night.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('Blocker B — expanded card lays out without overflow at narrow width', () {
    testWidgets('expanded Golden desu card has no overflow at 320w', (
      tester,
    ) async {
      addTearDown(() {
        tester.view.resetPhysicalSize();
        tester.view.resetDevicePixelRatio();
      });
      tester.view.physicalSize = const Size(320, 2400);
      tester.view.devicePixelRatio = 1;

      final content = golden.localizedFiveCardContent('en');
      final details = (content['vocabularyDetails'] as List)
          .cast<Map>()
          .map((m) => Map<String, dynamic>.from(m))
          .firstWhere((m) => m['id'] == 'desu');
      final desu = golden.vocabulary.firstWhere(
        (v) => v.displayText.isNotEmpty,
        orElse: () => golden.vocabulary.first,
      );

      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData.dark(useMaterial3: true),
          home: Scaffold(
            body: SingleChildScrollView(
              child: LessonVocabularyCard(
                item: desu,
                details: details,
                uiLanguageCode: 'en',
                learningLanguageCode: 'ja',
                expanded: true,
                onToggle: () {},
              ),
            ),
          ),
        ),
      );
      await tester.pump();
      expect(tester.takeException(), isNull);
    });
  });

  group('Blocker A — shared source and Flutter asset stay in sync', () {
    test('emptyContentPlaceholder resolves in vi/en/ja', () {
      expect(L10n.text('emptyContentPlaceholder', 'en'), 'No content');
      expect(L10n.text('emptyContentPlaceholder', 'vi'), 'Không có nội dung');
      expect(L10n.text('emptyContentPlaceholder', 'ja'), '内容なし');
    });

    test(
      'Golden + legacy parity: no Vietnamese in en/ja of any locale map in the '
      'synced Flutter lessons asset',
      () async {
        final raw = await rootBundle.loadString('assets/shared/lessons.json');
        final payload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
        final lessons = (payload['lessons'] as List).cast<Map>();
        final leaks = <String>[];

        void scan(dynamic node, String path, String id) {
          if (node is List) {
            for (var i = 0; i < node.length; i++) {
              scan(node[i], '$path[$i]', id);
            }
            return;
          }
          if (node is! Map) return;
          final keys = node.keys.map((k) => k.toString()).toSet();
          final isLocaleMap =
              keys.contains('vi') &&
              (keys.contains('en') || keys.contains('ja')) &&
              keys.every(
                (k) => const {'vi', 'en', 'ja', 'ko', 'zh'}.contains(k),
              );
          if (isLocaleMap) {
            for (final code in const ['en', 'ja']) {
              final value = node[code];
              void check(dynamic s, String sub) {
                if (s is String && _containsVietnamese(s)) {
                  leaks.add('$id$path.$code$sub: ${s.substring(0, s.length.clamp(0, 50))}');
                }
              }

              if (value is String) check(value, '');
              if (value is List) {
                for (var i = 0; i < value.length; i++) {
                  check(value[i], '[$i]');
                }
              }
            }
            return;
          }
          node.forEach((k, v) => scan(v, '$path.$k', id));
        }

        for (final lesson in lessons) {
          scan(lesson, '', lesson['id']?.toString() ?? 'unknown');
        }
        expect(
          leaks,
          isEmpty,
          reason: 'Vietnamese leaked into en/ja in ${leaks.length} slot(s): '
              '${leaks.take(10).join(' | ')}',
        );
      },
    );
  });
}
