import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/data/curriculum_repository.dart';
import 'package:novalang_flutter/models/user_profile.dart';
import 'package:novalang_flutter/screens/learn/exercises/five_card_exercise_flow.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';
import 'package:novalang_flutter/screens/onboarding/placement_test_screen.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/services/exercise_review_repository.dart';
import 'package:novalang_flutter/state/profile_provider.dart';

const _lessonId = 'ja-daily_life-m01-u1-l1';
const _locales = ['vi', 'en', 'ja'];
const _widths = [320.0, 375.0, 768.0, 1366.0, 1920.0];

const _groupTitles = {
  'vi': ['Luyện tập cơ bản', 'Luyện tập nâng cao'],
  'en': ['Core Practice', 'Advanced Practice'],
  'ja': ['基本練習', '発展練習'],
};
const _groupRanges = {
  'vi': ['Câu 1–10', 'Câu 11–14'],
  'en': ['Questions 1–10', 'Questions 11–14'],
  'ja': ['第1問～第10問', '第11問～第14問'],
};
const _vocabularyMeaning = {
  'vi': 'Chào buổi sáng.',
  'en': 'Good morning.',
  'ja': 'おはようございます。',
};
const _grammarMeaning = {
  'vi': 'Tôi là [tên].',
  'en': 'I am [name].',
  'ja': '私は［名前］です。',
};
const _reviewQuestion = {'vi': 'Câu 1', 'en': 'Question 1', 'ja': '問題1'};

class _LocaleProfileNotifier extends ProfileNotifier {
  _LocaleProfileNotifier(this.locale);

  final String locale;

  @override
  UserProfile build() => UserProfile.defaults().copyWith(
    nativeLanguageCode: locale,
    uiLanguageCode: locale,
    learningLanguageCode: 'ja',
  );
}

class _EmptyAttempts implements ExerciseAttemptRepository {
  @override
  Future<ExerciseAttemptSnapshot?> active({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => null;

  @override
  Future<void> complete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async {}

  @override
  Future<ExerciseAttemptSnapshot?> findByAttemptId(String attemptId) async =>
      null;

  @override
  Future<void> save(ExerciseAttemptSnapshot snapshot) async {}
}

class _EmptyReviews implements WrongAnswerRepository {
  @override
  Future<List<ExerciseReviewRecord>> forLesson({
    required String userId,
    required String lessonId,
  }) async => const [];

  @override
  Future<void> resolve(ExerciseReviewRecord record) async {}

  @override
  Future<void> upsert(ExerciseReviewRecord record) async {}
}

ExerciseReviewRecord _reviewRecord() => const ExerciseReviewRecord(
  attemptId: 'attempt-1',
  userId: 'user-1',
  localStudyDate: '2026-07-15',
  lessonId: _lessonId,
  lessonTitle: 'Golden lesson',
  exerciseId: 'ja-daily_life-m01-u1-l1-practice-1',
  exerciseNumber: 1,
  exerciseType: 'multiple_choice',
  questionDisplay: 'こんにちは',
  userAnswer: 'wrong',
  correctAnswer: 'right',
  isCorrect: true,
  completedAt: '2026-07-15T10:00:00Z',
);

void _setViewport(WidgetTester tester, double width) {
  tester.view.physicalSize = Size(width, 1800);
  tester.view.devicePixelRatio = 1;
}

Widget _wrap({required String locale, required Widget child}) => ProviderScope(
  overrides: [
    profileProvider.overrideWith(() => _LocaleProfileNotifier(locale)),
    exerciseAttemptRepositoryProvider.overrideWithValue(_EmptyAttempts()),
    wrongAnswerRepositoryProvider.overrideWithValue(_EmptyReviews()),
  ],
  child: MaterialApp(theme: ThemeData.dark(), home: child),
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await MobileUiStrings.load();
    await CurriculumRepository.load();
  });

  tearDown(() {
    TestWidgetsFlutterBinding.instance.platformDispatcher
        .clearLocaleTestValue();
  });

  group('runtime lesson locale purity', () {
    for (final locale in _locales) {
      for (final width in _widths) {
        testWidgets('Exercises landing is $locale-pure at $width', (
          tester,
        ) async {
          _setViewport(tester, width);
          final lesson = CurriculumRepository.findLesson(
            _lessonId,
            nativeLanguage: locale,
          )!;

          await tester.pumpWidget(
            _wrap(
              locale: locale,
              child: FiveCardExerciseLandingPage(
                lesson: lesson,
                uiLanguageCode: locale,
                learningLanguageCode: 'ja',
                nativeLanguageCode: locale,
              ),
            ),
          );
          await tester.pump();
          await tester.pump(const Duration(milliseconds: 50));

          for (final label in _groupTitles[locale]!) {
            expect(find.text(label), findsOneWidget);
          }
          for (final range in _groupRanges[locale]!) {
            expect(find.text(range), findsOneWidget);
          }
          for (final otherLocale in _locales.where(
            (candidate) => candidate != locale,
          )) {
            for (final label in _groupTitles[otherLocale]!) {
              expect(find.text(label), findsNothing);
            }
            for (final range in _groupRanges[otherLocale]!) {
              expect(find.text(range), findsNothing);
            }
          }
          expect(tester.takeException(), isNull);
        });
      }
    }

    testWidgets(
      'switching vi to en to ja in one runtime never retains stale learner support',
      (tester) async {
        _setViewport(tester, 768);

        for (final locale in _locales) {
          final lesson = CurriculumRepository.findLesson(
            _lessonId,
            nativeLanguage: locale,
          )!;
          await tester.pumpWidget(
            _wrap(
              locale: locale,
              child: FiveCardExerciseLandingPage(
                lesson: lesson,
                uiLanguageCode: locale,
                learningLanguageCode: 'ja',
                nativeLanguageCode: locale,
              ),
            ),
          );
          await tester.pump();

          for (final label in _groupTitles[locale]!) {
            expect(find.text(label), findsOneWidget);
          }
          for (final otherLocale in _locales.where(
            (candidate) => candidate != locale,
          )) {
            for (final label in _groupTitles[otherLocale]!) {
              expect(find.text(label), findsNothing);
            }
          }
        }

        expect(tester.takeException(), isNull);
      },
    );

    for (final locale in _locales) {
      testWidgets('$locale renders vocabulary and grammar learner support', (
        tester,
      ) async {
        _setViewport(tester, 768);
        final lesson = CurriculumRepository.findLesson(
          _lessonId,
          nativeLanguage: locale,
        )!;

        final vocabularyItem = lesson.vocabulary.first;
        expect(vocabularyItem.meaning, _vocabularyMeaning[locale]);
        await tester.pumpWidget(
          _wrap(
            locale: locale,
            child: Scaffold(
              body: LessonVocabularyCard(
                item: vocabularyItem,
                details: const {},
                uiLanguageCode: locale,
                learningLanguageCode: 'ja',
                expanded: true,
                onToggle: () {},
              ),
            ),
          ),
        );
        await tester.pump();
        expect(
          find.textContaining(_vocabularyMeaning[locale]!),
          findsOneWidget,
        );

        await tester.pumpWidget(
          _wrap(
            locale: locale,
            child: LessonGrammarPage(
              lesson: lesson,
              uiLanguageCode: locale,
              nativeLanguageCode: locale,
            ),
          ),
        );
        await tester.pump();
        expect(find.textContaining(_grammarMeaning[locale]!), findsOneWidget);
        if (locale != 'vi') {
          expect(find.text(_grammarMeaning['vi']!), findsNothing);
        }
        if (locale != 'en') {
          expect(find.text(_grammarMeaning['en']!), findsNothing);
        }
        expect(tester.takeException(), isNull);
      });

      testWidgets('$locale localizes review and placement chrome', (
        tester,
      ) async {
        _setViewport(tester, 768);
        await tester.pumpWidget(
          _wrap(
            locale: locale,
            child: WrongAnswerReviewCard(
              record: _reviewRecord(),
              uiLanguageCode: locale,
              nativeLanguageCode: locale,
            ),
          ),
        );
        await tester.pump();
        expect(find.text(_reviewQuestion[locale]!), findsOneWidget);
        if (locale != 'vi') expect(find.text('Câu 1'), findsNothing);

        await tester.pumpWidget(
          _wrap(locale: locale, child: const PlacementTestScreen()),
        );
        await tester.pump();
        expect(
          find.text(MobileUiStrings.instance.lookup('placementTitle', locale)!),
          findsWidgets,
        );
        expect(tester.takeException(), isNull);
      });
    }
  });
}
