import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/core/utils/mobile_ui_strings.dart';
import 'package:novalang_flutter/data/curriculum_repository.dart';
import 'package:novalang_flutter/models/lesson.dart';
import 'package:novalang_flutter/screens/learn/lesson_five_card_pages.dart';

const _lessonId = 'ja-daily_life-m01-u1-l1';
const _expectedTitle = {
  'vi': 'Xin chào, tôi là…',
  'en': 'Hello, I am…',
  'ja': 'こんにちは、〜です',
};
const _expectedObjective = {
  'vi': 'Chọn lời chào phù hợp với thời điểm và quan hệ.',
  'en': 'Choose a greeting that fits the time and relationship.',
  'ja': '時間帯や相手との関係に合うあいさつを選べます。',
};
const _expectedDialogueTitle = {
  'vi': 'Buổi sáng trong lớp học',
  'en': 'Morning in the classroom',
  'ja': '教室での朝',
};
const _expectedGrammarMeaning = {
  'vi': 'Tôi là [tên].',
  'en': 'I am [name].',
  'ja': '私は［名前］です。',
};

List<String> _exerciseIds(Lesson lesson, String locale) {
  final content = lesson.localizedFiveCardContent(locale);
  final practice = content['practice'] as Map<String, dynamic>;
  final exercises = practice['exercises'] as List<dynamic>;
  return exercises
      .map((entry) => (entry as Map<String, dynamic>)['id'].toString())
      .toList(growable: false);
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await MobileUiStrings.load();
    await CurriculumRepository.load();
  });

  test(
    'cached catalog rebuilds the same lesson for vi -> ja without stale support text',
    () {
      final vietnamese = CurriculumRepository.findLesson(
        _lessonId,
        nativeLanguage: 'vi',
      )!;
      final japanese = CurriculumRepository.findLesson(
        _lessonId,
        nativeLanguage: 'ja',
      )!;

      expect(vietnamese.id, japanese.id);
      expect(vietnamese.localizedTitle('vi'), _expectedTitle['vi']);
      expect(japanese.localizedTitle('ja'), _expectedTitle['ja']);
      expect(japanese.localizedTitle('ja'), isNot(contains('Xin chào')));
      expect(_exerciseIds(vietnamese, 'vi'), _exerciseIds(japanese, 'ja'));
      expect(_exerciseIds(japanese, 'ja'), hasLength(14));
      expect(
        vietnamese.localizedFiveCardContent('vi')['mainCards'],
        japanese.localizedFiveCardContent('ja')['mainCards'],
      );
    },
  );

  for (final locale in const ['vi', 'en', 'ja']) {
    testWidgets(
      '$locale renders localized Golden introduction, dialogue and grammar',
      (tester) async {
        tester.view.physicalSize = const Size(768, 1800);
        tester.view.devicePixelRatio = 1;
        final lesson = CurriculumRepository.findLesson(
          _lessonId,
          nativeLanguage: locale,
        )!;

        expect(lesson.localizedTitle(locale), _expectedTitle[locale]);
        final content = lesson.localizedFiveCardContent(locale);
        final intro = content['intro'] as Map<String, dynamic>;
        expect(
          (intro['objectives'] as List<dynamic>).first,
          _expectedObjective[locale],
        );
        final dialogueGroups = content['dialogueGroups'] as List<dynamic>;
        expect(
          (dialogueGroups.first as Map<String, dynamic>)['title'],
          _expectedDialogueTitle[locale],
        );
        final grammarPatterns = content['grammarPatterns'] as List<dynamic>;
        expect(
          (grammarPatterns.first as Map<String, dynamic>)['meaning'],
          _expectedGrammarMeaning[locale],
        );

        await tester.pumpWidget(
          ProviderScope(
            child: MaterialApp(
              home: LessonIntroductionPage(
                lesson: lesson,
                uiLanguageCode: locale,
                nativeLanguageCode: locale,
              ),
            ),
          ),
        );
        await tester.pump();

      expect(find.textContaining(_expectedObjective[locale]!), findsOneWidget);
      if (locale != 'vi') {
        expect(find.textContaining(_expectedObjective['vi']!), findsNothing);
      }
      if (locale != 'en') {
        expect(find.textContaining(_expectedObjective['en']!), findsNothing);
      }
        expect(tester.takeException(), isNull);
      },
    );
  }
}
