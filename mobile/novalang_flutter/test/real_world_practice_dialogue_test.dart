// Q14 UI tests (NOVALANG-LESSON-RUNTIME-REMEDIATION-01, Lesson Format 3.0):
// the Golden Lesson's Q14 "Real-World Practice" must render the approved
// 14-line Tanaka–Sato dialogue as a non-graded read/listen/repeat activity —
// no answer input, no AI grading, no score, no legacy AI UI — with
// independent reading/translation toggles, per-line audio, and idempotent
// non-graded completion.
import 'dart:convert';
import 'dart:ui' show SemanticsAction, Tristate;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/theme/app_theme.dart';
import 'package:novalang_flutter/models/curriculum.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';
import 'package:novalang_flutter/screens/learn/exercises/five_card_exercise_flow.dart';
import 'package:novalang_flutter/services/ai_exercise_grader.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/widgets/common/app_button.dart';

const _lessonId = 'ja-daily_life-m01-u1-l1';
const _trackId = 'daily_life';

const _approvedLines = <String>[
  'こんばんは。すみません、ちょっとよろしいですか。',
  'こんばんは。はい、どうしましたか。',
  'はじめまして。留学生の田中です。すみませんが、実は、スマホが使えなくて、道がわからないんです。',
  'あ、留学生なんですね。はじめまして。佐藤です。',
  'それは大変ですね。どこへ行きたいんですか。',
  'さくら寮です。場所、わかりますか。',
  'はい、わかりますよ。ここから近いですよ。',
  '一緒に行きましょうか。',
  'え、いいんですか。本当にありがとうございます。',
  'いえいえ。なんでもないです。',
  '着きましたよ。ここです。',
  '助かりました。佐藤さん、ありがとうございました。',
  'なんでもないです。',
  '田中さん、勉強を頑張ってくださいね。さようなら。',
];

const _approvedSpeakers = <String>[
  'tanaka',
  'sato',
  'tanaka',
  'sato',
  'sato',
  'tanaka',
  'sato',
  'sato',
  'tanaka',
  'sato',
  'sato',
  'tanaka',
  'sato',
  'sato',
];

const _approvedRomanizations = <String>[
  'konbanwa. sumimasen, chotto yoroshii desu ka.',
  'konbanwa. hai, dō shimashita ka.',
  'hajimemashite. ryūgakusei no Tanaka desu. sumimasen ga, jitsu wa, sumaho ga tsukaenakute, michi ga wakaranai n desu.',
  'a, ryūgakusei nan desu ne. hajimemashite. Satō desu.',
  'sore wa taihen desu ne. doko e ikitai n desu ka.',
  'sakura ryō desu. basho, wakarimasu ka.',
  'hai, wakarimasu yo. koko kara chikai desu yo.',
  'issho ni ikimashō ka.',
  'e, ii n desu ka. hontōni arigatō gozaimasu.',
  'ieie. nan de mo nai desu.',
  'tsukimashita yo. koko desu.',
  'tasukarimashita. Satō-san, arigatō gozaimashita.',
  'nan de mo nai desu.',
  'Tanaka-san, benkyō o ganbatte kudasai ne. sayōnara.',
];

class _MemoryAttempts implements ExerciseAttemptRepository {
  final Map<String, ExerciseAttemptSnapshot> snapshots = {};
  int saveCalls = 0;

  @override
  Future<ExerciseAttemptSnapshot?> active({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => snapshots.values
      .where(
        (item) =>
            item.userId == userId &&
            item.userTrackId == userTrackId &&
            item.lessonId == lessonId &&
            !item.isCompleted,
      )
      .firstOrNull;

  @override
  Future<void> complete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async {}

  @override
  Future<ExerciseAttemptSnapshot?> findByAttemptId(String attemptId) async =>
      snapshots[attemptId];

  @override
  Future<void> save(ExerciseAttemptSnapshot snapshot) async {
    saveCalls += 1;
    snapshots[snapshot.attemptId] = snapshot;
  }
}

// `assets/shared/lessons.json` is a large (multi-MB) generated bundle.
// Flutter's test asset channel becomes pathologically slow when awaited
// directly inside a `testWidgets` callback for a payload this size, so it
// must only ever be loaded once per native language, up front in
// `setUpAll` — never per-test — mirroring the working pattern already used
// by `five_card_exercise_runtime_regression_test.dart`.
Future<FiveCardPractice> _loadPractice(String nativeLanguageCode) async {
  final raw = await rootBundle.loadString('assets/shared/lessons.json');
  final payload = Map<String, dynamic>.from(jsonDecode(raw) as Map);
  final lessonJson = (payload['lessons'] as List)
      .cast<Map>()
      .map((item) => Map<String, dynamic>.from(item))
      .singleWhere((item) => item['id'] == _lessonId);
  final lesson = CurriculumLesson.fromJson(
    lessonJson,
  ).toLesson(nativeLanguage: nativeLanguageCode);
  return FiveCardPractice.fromLesson(
    lesson,
    nativeLanguageCode: nativeLanguageCode,
  )!;
}

Future<void> _mockTtsChannel() async {
  TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
      .setMockMethodCallHandler(const MethodChannel('flutter_tts'), (
        call,
      ) async {
        if (call.method == 'isLanguageAvailable') return 1;
        if (call.method == 'speak') {
          // Real devices with `awaitSpeakCompletion(true)` (see TtsService)
          // only resolve once the utterance finishes, not the instant it
          // starts. A short artificial delay here exercises that same
          // "mid-playback" window so tests can assert the one-line-at-a-time
          // audio contract instead of racing a same-frame resolution.
          await Future<void>.delayed(const Duration(milliseconds: 200));
          return 1;
        }
        return 1;
      });
}

FiveCardPractice _withoutFirstQ14Romanization(FiveCardPractice practice) {
  final q14 = practice.exercises.last;
  final q14Raw = Map<String, dynamic>.from(q14.raw);
  final lines = (q14Raw['dialogueLines'] as List)
      .cast<Map>()
      .map((line) => Map<String, dynamic>.from(line))
      .toList(growable: false);
  lines.first.remove('romanization');
  q14Raw['dialogueLines'] = lines;
  return FiveCardPractice(
    title: practice.title,
    japaneseTitle: practice.japaneseTitle,
    totalQuestions: practice.totalQuestions,
    estimatedMinutes: practice.estimatedMinutes,
    reviewTopics: practice.reviewTopics,
    groups: practice.groups,
    exercises: [
      ...practice.exercises.take(practice.exercises.length - 1),
      PracticeExercise.fromMap(q14Raw),
    ],
    characterNamePool: practice.characterNamePool,
  );
}

Future<void> _pumpQ14(
  WidgetTester tester, {
  required FiveCardPractice practice,
  required _MemoryAttempts attempts,
  String uiLanguageCode = 'vi',
  String nativeLanguageCode = 'vi',
  String lessonLevel = 'A0',
  NavigatorObserver? observer,
}) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        exerciseAttemptRepositoryProvider.overrideWithValue(attempts),
        aiExerciseGraderProvider.overrideWithValue(
          const DevMockAiExerciseGrader(),
        ),
      ],
      child: MaterialApp(
        theme: ThemeData.dark(),
        navigatorObservers: [?observer],
        home: FiveCardExerciseSessionPage(
          practice: practice,
          lessonId: _lessonId,
          lessonLevel: lessonLevel,
          userTrackId: _trackId,
          lessonTitle: 'Golden lesson',
          uiLanguageCode: uiLanguageCode,
          learningLanguageCode: 'ja',
          nativeLanguageCode: nativeLanguageCode,
          initialIndex: practice.exercises.length - 1,
        ),
      ),
    ),
  );
  // Bounded pumps: some ambient chrome animation elsewhere in the app shell
  // never fully quiesces, so pumpAndSettle() can hang indefinitely here.
  await tester.pump();
  await tester.pump(const Duration(milliseconds: 400));
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUpAll(_mockTtsChannel);

  // The Golden Lesson bundle (`assets/shared/lessons.json`) is large; per
  // the comment on `_loadPractice`, it is loaded exactly once per native
  // language here in `setUpAll`, never inside an individual `testWidgets`
  // body.
  late FiveCardPractice practiceVi;
  late FiveCardPractice practiceEn;
  late FiveCardPractice practiceJa;
  setUpAll(() async {
    practiceVi = await _loadPractice('vi');
    practiceEn = await _loadPractice('en');
    practiceJa = await _loadPractice('ja');
  });

  group('Q14 generated romanization contract', () {
    test('model round-trips optional generated romanization strictly', () {
      final line = PracticeDialogueLine.fromMap(const {
        'speakerId': 'sato',
        'targetText': '佐藤さん',
        'reading': 'さとうさん',
        'speechText': '佐藤さん',
        'translation': 'Mr. Sato',
        'audioLocale': 'ja-JP',
        'romanization': 'Satō-san',
      });
      expect(line.romanization, 'Satō-san');
      expect(line.hasRomanization, isTrue);
      expect(line.toMap()['romanization'], 'Satō-san');

      final legacyLine = PracticeDialogueLine.fromMap(const {
        'speakerId': 'sato',
        'targetText': 'こんばんは',
      });
      expect(legacyLine.romanization, isNull);
      expect(legacyLine.toMap().containsKey('romanization'), isFalse);
      expect(
        () => PracticeDialogueLine.fromMap(const {
          'speakerId': 'sato',
          'targetText': 'こんばんは',
          'romanization': 42,
        }),
        throwsFormatException,
      );
    });

    test('level policy is explicit and unknown levels fail safely', () {
      for (final level in const ['A0', 'A1', 'A2', 'B1']) {
        expect(q14RomanizationToggleAllowed(level), isTrue, reason: level);
      }
      for (final level in const ['B2', 'C1', 'C2', 'UNKNOWN', '']) {
        expect(q14RomanizationToggleAllowed(level), isFalse, reason: level);
      }
    });

    test('session state restores only within the same lesson session', () {
      final store = Q14ReadingAidSessionStore();
      final first = store.stateFor(
        lessonSessionKey: 'lesson-a:attempt-1',
        currentLevel: 'A0',
      );
      expect(first.showRomanization, isFalse);
      store.setShowRomanization('lesson-a:attempt-1', true);
      expect(
        store
            .stateFor(
              lessonSessionKey: 'lesson-a:attempt-1',
              currentLevel: 'A0',
            )
            .showRomanization,
        isTrue,
      );
      expect(
        store
            .stateFor(
              lessonSessionKey: 'lesson-b:attempt-1',
              currentLevel: 'A0',
            )
            .showRomanization,
        isFalse,
      );
      expect(
        Q14ReadingAidSessionStore()
            .stateFor(
              lessonSessionKey: 'lesson-a:attempt-1',
              currentLevel: 'A0',
            )
            .showRomanization,
        isFalse,
      );
    });
  });

  group('Q14 renders the approved Tanaka-Sato dialogue', () {
    testWidgets(
      'Japanese target, reading, names, and punctuation share bundled font and ja-JP locale',
      (tester) async {
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
        );

        final targetTexts = tester
            .widgetList<Text>(
              find.byKey(const ValueKey('dialogue-line-target-text')),
            )
            .toList(growable: false);
        expect(targetTexts, hasLength(14));
        for (final text in targetTexts) {
          expect(text.locale, AppTheme.japaneseLocale);
          expect(text.style?.fontFamily, AppTheme.japaneseFontFamily);
          expect(
            text.style?.fontFamilyFallback,
            AppTheme.japaneseFontFamilyFallback,
          );
          expect(text.textSpan, isNull);
        }

        final readingTexts = tester.widgetList<Text>(
          find.byKey(const ValueKey('dialogue-line-reading')),
        );
        expect(readingTexts, isNotEmpty);
        for (final text in readingTexts) {
          expect(text.locale, AppTheme.japaneseLocale);
          expect(text.style?.fontFamily, AppTheme.japaneseFontFamily);
        }

        for (final fragment in const [
          'です。',
          '場所、',
          'わかりますか。',
          '佐藤さん、ありがとうございました。',
          'さようなら。',
        ]) {
          expect(
            targetTexts.any((text) => text.data?.contains(fragment) == true),
            isTrue,
            reason: fragment,
          );
        }
      },
    );

    testWidgets(
      'uses speaker-based bubbles, including consecutive Sato turns',
      (tester) async {
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
        );

        expect(
          find.byKey(const ValueKey('dialogue-message-bubble-tanaka')),
          findsNWidgets(5),
        );
        expect(
          find.byKey(const ValueKey('dialogue-message-bubble-sato')),
          findsNWidgets(9),
        );
        final tanakaBubble = tester.widget<DecoratedBox>(
          find.byKey(const ValueKey('dialogue-message-bubble-tanaka')).first,
        );
        final satoBubble = tester.widget<DecoratedBox>(
          find.byKey(const ValueKey('dialogue-message-bubble-sato')).first,
        );
        expect(
          (tanakaBubble.decoration as BoxDecoration).color,
          AppTheme.dialogueBubbleSpeakerA,
        );
        expect(
          (satoBubble.decoration as BoxDecoration).color,
          AppTheme.dialogueBubbleSpeakerB,
        );
      },
    );

    testWidgets('exactly 14 dialogue lines render, in speaker order', (
      tester,
    ) async {
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());

      for (var i = 0; i < 14; i++) {
        expect(find.byKey(ValueKey('dialogue-line-$i')), findsOneWidget);
      }
      expect(find.byKey(const ValueKey('dialogue-line-14')), findsNothing);
    });

    testWidgets(
      'Japanese target strings exactly match the owner-approved text',
      (tester) async {
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
        );

        final exercise = practiceVi.exercises.last;
        expect(exercise.type, 'real_world_practice_dialogue');
        expect(exercise.dialogueLines, hasLength(14));
        for (var i = 0; i < 14; i++) {
          expect(exercise.dialogueLines[i].targetText, _approvedLines[i]);
          expect(exercise.dialogueLines[i].speakerId, _approvedSpeakers[i]);
        }
      },
    );

    testWidgets(
      'renders the non-spoken scene divider after turn 10 without audio',
      (tester) async {
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
        );

        final exercise = practiceVi.exercises.last;
        expect(exercise.sceneDividers, hasLength(1));
        expect(exercise.sceneDividers.single.afterDialogueLine, 10);
        expect(exercise.sceneDividers.single.targetText, '着いた時');
        expect(
          find.byKey(const ValueKey('dialogue-scene-divider-10')),
          findsOneWidget,
        );
        expect(find.text('Khi đến nơi'), findsOneWidget);
        expect(
          find.byKey(const ValueKey('dialogue-line-audio-button')),
          findsNWidgets(14),
        );
      },
    );

    testWidgets('romaji is separate from reading and hidden by default', (
      tester,
    ) async {
      final exercise = practiceVi.exercises.last;
      final romaji = RegExp('[a-zA-Z]');
      for (var index = 0; index < exercise.dialogueLines.length; index++) {
        final line = exercise.dialogueLines[index];
        expect(romaji.hasMatch(line.reading), isFalse, reason: line.reading);
        expect(line.romanization, _approvedRomanizations[index]);
      }
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());
      for (final line in exercise.dialogueLines.where((l) => l.hasReading)) {
        expect(find.text(line.reading), findsWidgets);
      }
      for (final romanization in _approvedRomanizations) {
        expect(find.text(romanization), findsNothing);
      }
    });

    testWidgets('vi/en/ja translations are complete and locale-correct', (
      tester,
    ) async {
      final expectedFirstTranslations = {
        practiceVi:
            'Chào buổi tối. Xin lỗi, tôi có thể hỏi bạn một chút được không?',
        practiceEn: 'Good evening. Excuse me, may I ask you something?',
        practiceJa: 'こんばんは。すみません、少しお尋ねしてもよろしいですか。',
      };
      for (final practice in [practiceVi, practiceEn, practiceJa]) {
        final exercise = practice.exercises.last;
        for (final line in exercise.dialogueLines) {
          expect(line.translation, isNotEmpty);
          expect(line.translation.contains('missing-content'), isFalse);
        }
        expect(
          exercise.dialogueLines.first.translation,
          expectedFirstTranslations[practice],
        );
      }
      expect(
        practiceEn.exercises.last.dialogueLines.first.translation,
        isNot(contains('Chào')),
      );
      expect(
        practiceJa.exercises.last.dialogueLines.first.translation,
        isNot(contains('Good evening')),
      );
    });
  });

  group('Q14 toggles are independent', () {
    testWidgets('romanization toggle shows and hides generated output', (
      tester,
    ) async {
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());

      expect(
        find.byKey(const ValueKey('dialogue-romanization-toggle')),
        findsOneWidget,
      );
      expect(find.text(_approvedRomanizations.first), findsNothing);

      await tester.tap(
        find.byKey(const ValueKey('dialogue-romanization-toggle')),
      );
      await tester.pump();
      expect(find.text(_approvedRomanizations.first), findsOneWidget);

      await tester.tap(
        find.byKey(const ValueKey('dialogue-romanization-toggle')),
      );
      await tester.pump();
      expect(find.text(_approvedRomanizations.first), findsNothing);
    });

    testWidgets('reading and romanization support all independent states', (
      tester,
    ) async {
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());
      final reading = practiceVi.exercises.last.dialogueLines
          .firstWhere((line) => line.hasReading)
          .reading;

      await tester.tap(
        find.byKey(const ValueKey('dialogue-romanization-toggle')),
      );
      await tester.pump();
      expect(find.text(reading), findsWidgets);
      expect(find.text(_approvedRomanizations.first), findsOneWidget);

      await tester.tap(find.byKey(const ValueKey('dialogue-reading-toggle')));
      await tester.pump();
      expect(find.text(reading), findsNothing);
      expect(find.text(_approvedRomanizations.first), findsOneWidget);
    });

    testWidgets('romanization toggle exposes button and toggled semantics', (
      tester,
    ) async {
      final semanticsHandle = tester.ensureSemantics();
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());
      final finder = find.byKey(const ValueKey('dialogue-romanization-toggle'));
      var node = tester.getSemantics(finder);
      expect(node.label, 'Hiện phiên âm Latin');
      expect(node.flagsCollection.isButton, isTrue);
      expect(node.flagsCollection.isToggled, Tristate.isFalse);
      expect(node.getSemanticsData().hasAction(SemanticsAction.tap), isTrue);

      await tester.tap(finder);
      await tester.pump();
      node = tester.getSemantics(finder);
      expect(node.flagsCollection.isToggled, Tristate.isTrue);
      semanticsHandle.dispose();
    });

    testWidgets('romanization toggle is hidden from B2 onward', (tester) async {
      await _pumpQ14(
        tester,
        practice: practiceVi,
        attempts: _MemoryAttempts(),
        lessonLevel: 'B2',
      );
      expect(
        find.byKey(const ValueKey('dialogue-romanization-toggle')),
        findsNothing,
      );
    });

    testWidgets('missing generated romanization hides the toggle fail-safe', (
      tester,
    ) async {
      await _pumpQ14(
        tester,
        practice: _withoutFirstQ14Romanization(practiceVi),
        attempts: _MemoryAttempts(),
      );
      expect(
        find.byKey(const ValueKey('dialogue-romanization-toggle')),
        findsNothing,
      );
      expect(find.text(_approvedRomanizations.first), findsNothing);
    });

    testWidgets('romanization control is localized for vi, en, and ja', (
      tester,
    ) async {
      for (final entry in const {
        'vi': 'Hiện phiên âm Latin',
        'en': 'Show romanization',
        'ja': 'ローマ字を表示',
      }.entries) {
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
          uiLanguageCode: entry.key,
        );
        expect(find.text(entry.value), findsOneWidget);
      }
    });

    testWidgets(
      'reading toggle off hides hiragana while translation stays visible',
      (tester) async {
        final practice = practiceVi;
        await _pumpQ14(tester, practice: practice, attempts: _MemoryAttempts());

        final firstReadingLine = practice.exercises.last.dialogueLines
            .firstWhere((l) => l.hasReading);
        expect(find.text(firstReadingLine.reading), findsWidgets);
        expect(
          find.byKey(const ValueKey('dialogue-line-translation')),
          findsWidgets,
        );

        await tester.tap(find.byKey(const ValueKey('dialogue-reading-toggle')));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 400));

        expect(find.text(firstReadingLine.reading), findsNothing);
        expect(
          find.byKey(const ValueKey('dialogue-line-translation')),
          findsWidgets,
        );
      },
    );

    testWidgets(
      'translation toggle off hides translation while reading stays visible',
      (tester) async {
        final practice = practiceVi;
        await _pumpQ14(tester, practice: practice, attempts: _MemoryAttempts());

        final firstReadingLine = practice.exercises.last.dialogueLines
            .firstWhere((l) => l.hasReading);

        await tester.tap(
          find.byKey(const ValueKey('dialogue-translation-toggle')),
        );
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 400));

        expect(
          find.byKey(const ValueKey('dialogue-line-translation')),
          findsNothing,
        );
        expect(find.text(firstReadingLine.reading), findsWidgets);
      },
    );

    testWidgets('both toggles off hides both; both back on shows both', (
      tester,
    ) async {
      final practice = practiceVi;
      await _pumpQ14(tester, practice: practice, attempts: _MemoryAttempts());
      final firstReadingLine = practice.exercises.last.dialogueLines.firstWhere(
        (l) => l.hasReading,
      );

      await tester.tap(find.byKey(const ValueKey('dialogue-reading-toggle')));
      await tester.tap(
        find.byKey(const ValueKey('dialogue-translation-toggle')),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 400));
      expect(find.text(firstReadingLine.reading), findsNothing);
      expect(
        find.byKey(const ValueKey('dialogue-line-translation')),
        findsNothing,
      );

      await tester.tap(find.byKey(const ValueKey('dialogue-reading-toggle')));
      await tester.tap(
        find.byKey(const ValueKey('dialogue-translation-toggle')),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 400));
      expect(find.text(firstReadingLine.reading), findsWidgets);
      expect(
        find.byKey(const ValueKey('dialogue-line-translation')),
        findsWidgets,
      );
    });
  });

  group('Q14 audio', () {
    testWidgets('every line has an audio button', (tester) async {
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());

      expect(
        find.byKey(const ValueKey('dialogue-line-audio-button')),
        findsNWidgets(14),
      );
    });

    testWidgets('switching lines replaces playback and replay is allowed', (
      tester,
    ) async {
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());

      final buttons = find.byKey(const ValueKey('dialogue-line-audio-button'));
      await tester.tap(buttons.first);
      await tester.pump();
      // The active line is visibly gated, while another line remains
      // tappable so it can stop/replace the prior utterance.
      expect(tester.widget<IconButton>(buttons.first).onPressed, isNull);
      expect(tester.widget<IconButton>(buttons.at(1)).onPressed, isNotNull);
      expect(find.byIcon(Icons.graphic_eq), findsOneWidget);

      await tester.ensureVisible(buttons.at(1));
      await tester.pump();
      await tester.tap(buttons.at(1));
      await tester.pump();
      expect(find.byIcon(Icons.graphic_eq), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 400));
      // Playback finished — replay is allowed again (never permanently
      // disabled, never consumes a quota).
      for (final element in tester.widgetList<IconButton>(buttons)) {
        expect(element.onPressed, isNotNull);
      }
    });
  });

  group('Q14 has no legacy AI UI', () {
    testWidgets(
      'no trial label, no AI set, no text input, no Check Answer, no score',
      (tester) async {
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
        );

        expect(find.textContaining('トライアル'), findsNothing);
        expect(find.textContaining('Trial'), findsNothing);
        expect(find.textContaining('thử nghiệm'), findsNothing);
        expect(find.byType(TextField), findsNothing);
        expect(find.byType(TextFormField), findsNothing);
        expect(find.text('Kiểm tra'), findsNothing);
        expect(find.textContaining('Check Answer'), findsNothing);
        expect(find.textContaining('/6'), findsNothing);
        expect(find.textContaining('điểm'), findsNothing);
      },
    );
  });

  group('Q14 completion is non-graded and idempotent', () {
    testWidgets(
      'completion button navigates to the result page exactly once even under a rapid double tap',
      (tester) async {
        final observer = TestNavigatorObserver();
        await _pumpQ14(
          tester,
          practice: practiceVi,
          attempts: _MemoryAttempts(),
          observer: observer,
        );

        final button = find.byKey(const ValueKey('dialogue-complete-button'));
        expect(button, findsOneWidget);
        // `observer` also counts the initial route push that happens when
        // the session page itself first mounts, so the "did completion
        // navigate exactly once" assertion below must compare against this
        // baseline rather than an absolute count.
        final baseline = observer.pushCount;

        await tester.tap(button);
        // The first tap already navigates away (see assertions below), so
        // this second tap intentionally may not hit anything meaningful —
        // that is exactly the "double tap is safely idempotent" case being
        // tested, hence `warnIfMissed: false`.
        await tester.tap(button, warnIfMissed: false);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 400));

        expect(find.text('FiveCardExerciseResultPage'), findsNothing);
        expect(observer.pushCount - baseline, 1);
      },
    );

    testWidgets('does not require listening to every line before completing', (
      tester,
    ) async {
      await _pumpQ14(tester, practice: practiceVi, attempts: _MemoryAttempts());

      final button = find.byKey(const ValueKey('dialogue-complete-button'));
      expect(tester.widget<AppButton>(button).onPressed, isNotNull);
    });
  });
}

class TestNavigatorObserver extends NavigatorObserver {
  int pushCount = 0;

  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    pushCount += 1;
    super.didPush(route, previousRoute);
  }

  @override
  void didReplace({Route<dynamic>? newRoute, Route<dynamic>? oldRoute}) {
    if (newRoute != null) pushCount += 1;
    super.didReplace(newRoute: newRoute, oldRoute: oldRoute);
  }
}
