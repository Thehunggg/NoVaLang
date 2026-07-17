import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

const _goldenLessonId = 'ja-daily_life-m01-u1-l1';
const _goldenUnitId = 'ja-daily_life-m01-u1';
const _goldenCardIds = [
  'intro',
  'vocabulary',
  'dialogue',
  'grammar',
  'practice',
];
const _goldenExerciseIds = [
  'ja-daily_life-m01-u1-l1-practice-1',
  'ja-daily_life-m01-u1-l1-practice-2',
  'ja-daily_life-m01-u1-l1-practice-3',
  'ja-daily_life-m01-u1-l1-practice-4',
  'ja-daily_life-m01-u1-l1-practice-5',
  'ja-daily_life-m01-u1-l1-practice-6',
  'ja-daily_life-m01-u1-l1-practice-7',
  'ja-daily_life-m01-u1-l1-practice-8',
  'ja-daily_life-m01-u1-l1-practice-9',
  'ja-daily_life-m01-u1-l1-practice-10',
  'ja-daily_life-m01-u1-l1-practice-11',
  'ja-daily_life-m01-u1-l1-practice-12',
  'ja-daily_life-m01-u1-l1-practice-13',
  'ja-daily_life-m01-u1-l1-practice-14',
];

Map<String, dynamic> _map(Object? value) => value is Map
    ? value.map((key, item) => MapEntry('$key', item))
    : const <String, dynamic>{};

List<Map<String, dynamic>> _maps(Object? value) =>
    (value as List? ?? const []).map(_map).toList(growable: false);

bool _hasText(Map<String, dynamic> value, String key) =>
    (value[key]?.toString().trim().isNotEmpty ?? false);

Future<Map<String, dynamic>> _loadAsset(String path) async =>
    _map(jsonDecode(await rootBundle.loadString(path)));

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test(
    'golden five-card lesson keeps its catalog, identity, and metadata invariants',
    () async {
      // This test reads packaged Flutter assets only; it does not generate or
      // write lesson content.
      final lessonsPayload = await _loadAsset('assets/shared/lessons.json');
      final coursesPayload = await _loadAsset('assets/shared/courses.json');
      final lessons = _maps(lessonsPayload['lessons']);
      final lesson = lessons.singleWhere(
        (item) => item['id'] == _goldenLessonId,
      );
      final content = _map(lesson['fiveCardContent']);
      final cardIds = (content['mainCards'] as List? ?? const [])
          .map((item) => '$item')
          .toList(growable: false);
      final practice = _map(content['practice']);
      final exercises = _maps(practice['exercises']);
      final exerciseIds = exercises.map((item) => '${item['id']}').toList();

      expect(lesson['id'], _goldenLessonId);
      expect(lesson['unitId'], _goldenUnitId);
      expect(lesson['lessonFormat'], 'five_cards');
      expect(cardIds, _goldenCardIds);
      expect(cardIds, hasLength(5));
      expect(cardIds.toSet(), hasLength(cardIds.length));
      expect(exerciseIds, _goldenExerciseIds);
      expect(exercises, hasLength(14));
      expect(exerciseIds.toSet(), hasLength(exerciseIds.length));

      final mappedUnit = _maps(coursesPayload['courses'])
          .expand((course) => _maps(course['units']))
          .singleWhere((unit) => unit['id'] == lesson['unitId']);
      final mappedLessonIds = (mappedUnit['lessonIds'] as List? ?? const [])
          .map((item) => '$item');
      expect(mappedLessonIds, contains(_goldenLessonId));

      final vocabulary = _maps(lesson['vocabulary']);
      expect(vocabulary, isNotEmpty);
      expect(
        vocabulary.every(
          (item) =>
              _hasText(item, 'id') &&
              _hasText(item, 'displayText') &&
              _hasText(item, 'speechText'),
        ),
        isTrue,
      );
      expect(vocabulary.where((item) => _hasText(item, 'reading')), isNotEmpty);
      final vocabularyDetails = _maps(content['vocabularyDetails']);
      expect(vocabularyDetails, isNotEmpty);
      expect(
        vocabularyDetails.every(
          (item) =>
              _hasText(item, 'id') &&
              _maps(item['examples']).every(
                (example) =>
                    _hasText(example, 'text') && _hasText(example, 'reading'),
              ),
        ),
        isTrue,
      );

      final characters = _maps(content['approvedCharacterNamePool']);
      expect(characters, isNotEmpty);
      expect(
        characters.every(
          (item) =>
              _hasText(item, 'id') &&
              _hasText(item, 'displayName') &&
              _hasText(item, 'canonicalName') &&
              _hasText(item, 'audioName'),
        ),
        isTrue,
      );

      final dialogueLines = _maps(
        content['dialogueGroups'],
      ).expand((group) => _maps(group['lines']));
      expect(dialogueLines, isNotEmpty);
      expect(
        dialogueLines.every(
          (line) =>
              _hasText(line, 'targetText') &&
              _hasText(line, 'reading') &&
              _hasText(line, 'speechText') &&
              _hasText(line, 'audioLocale') &&
              _hasText(line, 'speakerId'),
        ),
        isTrue,
      );
      expect(
        dialogueLines.every(
          (line) => characters.any((item) => item['id'] == line['speakerId']),
        ),
        isTrue,
      );
      // Lesson Format 3.0 (ADR-012): exercise 14 is the non-graded
      // Real-World Practice dialogue and carries its reading-aid content as
      // per-line `reading` (hiragana) on `dialogueLines`, not the old
      // exercise-level `readingAid` string from `controlled_ai_text`.
      final realWorldPractice = exercises.last;
      expect(realWorldPractice['type'], 'real_world_practice_dialogue');
      expect(realWorldPractice['nonGraded'], isTrue);
      final q14Lines = _maps(realWorldPractice['dialogueLines']);
      expect(q14Lines, hasLength(14));
      expect(q14Lines.any((line) => _hasText(line, 'reading')), isTrue);
      final q14SceneDividers = _maps(realWorldPractice['sceneDividers']);
      expect(q14SceneDividers, hasLength(1));
      expect(q14SceneDividers.single['afterDialogueLine'], 10);
      expect(q14SceneDividers.single['targetText'], '着いた時');
      final dividerTranslations = Map<String, dynamic>.from(
        q14SceneDividers.single['translationByNative'] as Map,
      );
      expect(dividerTranslations.keys, containsAll(const ['vi', 'en', 'ja']));
    },
  );
}
