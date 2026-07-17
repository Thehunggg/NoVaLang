import 'dart:math';

import 'lesson.dart';

Map<String, dynamic> _map(dynamic value) => value is Map
    ? value.map((key, item) => MapEntry(key.toString(), item))
    : const <String, dynamic>{};

List<Map<String, dynamic>> _maps(dynamic value) =>
    (value as List? ?? const []).map(_map).toList(growable: false);

String _text(dynamic value) => value?.toString() ?? '';

String? _optionalString(Map<String, dynamic> value, String key) {
  final candidate = value[key];
  if (candidate == null) return null;
  if (candidate is! String) {
    throw FormatException('$key must be a string when present');
  }
  final normalized = candidate.trim();
  return normalized.isEmpty ? null : normalized;
}

/// Keeps answer comparison local to the approved trial data. It accepts
/// Japanese scripts and romaji without exposing reading aids to the checker.
String normalizePracticeTextAnswer(String value) => value
    .trim()
    .replaceAll(RegExp(r'\s+'), ' ')
    .replaceFirst(RegExp(r'[。.!！]+$'), '')
    .trim()
    .toLowerCase();

class PracticeCharacter {
  const PracticeCharacter({
    required this.id,
    required this.displayName,
    required this.canonicalName,
    required this.audioName,
  });

  final String id;
  final String displayName;
  final String canonicalName;
  final String audioName;

  factory PracticeCharacter.fromMap(Map<String, dynamic> value) =>
      PracticeCharacter(
        id: _text(value['id']),
        displayName: _text(value['displayName']),
        canonicalName: _text(value['canonicalName']),
        audioName: _text(value['audioName']),
      );
}

class FiveCardPractice {
  const FiveCardPractice({
    required this.title,
    required this.japaneseTitle,
    required this.totalQuestions,
    required this.estimatedMinutes,
    required this.reviewTopics,
    required this.groups,
    required this.exercises,
    this.characterNamePool = const [],
  });

  final String title;
  final String japaneseTitle;
  final int totalQuestions;
  final String estimatedMinutes;
  final String reviewTopics;
  final List<PracticeGroup> groups;
  final List<PracticeExercise> exercises;
  final List<PracticeCharacter> characterNamePool;

  /// Number of exercises that contribute to the checked/scored total. Excludes
  /// non-graded activities (e.g. the Real-World Practice dialogue) so the
  /// result screen never shows an unreachable perfect score.
  int get gradedTotalQuestions =>
      exercises.where((exercise) => !exercise.isNonGraded).length;

  PracticeCharacter? characterById(String id) =>
      characterNamePool.where((character) => character.id == id).firstOrNull;

  static FiveCardPractice? fromLesson(
    Lesson lesson, {
    required String nativeLanguageCode,
  }) {
    final content = lesson.localizedFiveCardContent(nativeLanguageCode);
    final raw = _map(content['practice']);
    if (raw.isEmpty) return null;
    return FiveCardPractice(
      title: _text(raw['title']),
      japaneseTitle: _text(raw['japaneseTitle']),
      totalQuestions: raw['totalQuestions'] as int? ?? 0,
      estimatedMinutes: _text(raw['estimatedMinutes']),
      reviewTopics: _text(raw['reviewTopics']),
      groups: _maps(raw['groups']).map(PracticeGroup.fromMap).toList(),
      exercises: _maps(
        raw['exercises'],
      ).map(PracticeExercise.fromMap).toList(growable: false),
      characterNamePool: _maps(
        content['approvedCharacterNamePool'],
      ).map(PracticeCharacter.fromMap).toList(growable: false),
    );
  }
}

class PracticeGroup {
  const PracticeGroup({
    required this.id,
    required this.title,
    required this.plan,
    required this.raw,
  });

  final String id;
  final String title;
  final String plan;
  final Map<String, dynamic> raw;

  factory PracticeGroup.fromMap(Map<String, dynamic> value) => PracticeGroup(
    id: _text(value['id']),
    title: _text(value['title']),
    plan: _text(value['plan']),
    raw: value,
  );

  String get number => _text(raw['number']);
  String get range => _text(raw['range']);
  String get details => _text(raw['details']);
  String get badge => _text(raw['badge']);
}

class PracticeOption {
  const PracticeOption({
    required this.id,
    required this.text,
    required this.canonicalText,
    required this.audioText,
  });

  final String id;
  final String text;
  final String canonicalText;
  final String audioText;

  factory PracticeOption.fromMap(Map<String, dynamic> value) => PracticeOption(
    id: _text(value['id']),
    text: _text(value['text']),
    canonicalText: _text(value['canonicalText']).isNotEmpty
        ? _text(value['canonicalText'])
        : _text(value['text']),
    audioText: _text(value['audioText']).isNotEmpty
        ? _text(value['audioText'])
        : _text(value['canonicalText']).isNotEmpty
        ? _text(value['canonicalText'])
        : _text(value['text']),
  );
}

class PracticeToken extends PracticeOption {
  const PracticeToken({
    required super.id,
    required super.text,
    required super.canonicalText,
    required super.audioText,
  });

  factory PracticeToken.fromMap(Map<String, dynamic> value) {
    final option = PracticeOption.fromMap(value);
    return PracticeToken(
      id: option.id,
      text: option.text,
      canonicalText: option.canonicalText,
      audioText: option.audioText,
    );
  }
}

class PracticePair {
  const PracticePair({
    required this.id,
    required this.left,
    required this.right,
  });

  final String id;
  final PracticeOption left;
  final PracticeOption right;

  factory PracticePair.fromMap(Map<String, dynamic> value) => PracticePair(
    id: _text(value['id']),
    left: PracticeOption.fromMap(_map(value['left'])),
    right: PracticeOption.fromMap(_map(value['right'])),
  );
}

class PracticeSlot {
  const PracticeSlot({
    required this.id,
    required this.answerId,
    required this.placeholder,
    required this.displayText,
    required this.canonicalText,
    required this.audioText,
    required this.acceptedAnswers,
  });

  final String id;
  final String answerId;
  final String placeholder;
  final String displayText;
  final String canonicalText;
  final String audioText;
  final List<String> acceptedAnswers;

  factory PracticeSlot.fromMap(Map<String, dynamic> value) => PracticeSlot(
    id: _text(value['id']),
    answerId: _text(value['answerId']),
    placeholder: _text(value['placeholder']),
    displayText: _text(value['displayText']),
    canonicalText: _text(value['canonicalText']),
    audioText: _text(value['audioText']),
    acceptedAnswers: (value['acceptedAnswers'] as List? ?? const [])
        .map(_text)
        .toList(growable: false),
  );
}

class PracticeAnswerSlot {
  const PracticeAnswerSlot({
    required this.id,
    required this.expectedTokenId,
    required this.afterText,
  });

  final String id;
  final String expectedTokenId;
  final String afterText;

  factory PracticeAnswerSlot.fromMap(Map<String, dynamic> value) =>
      PracticeAnswerSlot(
        id: _text(value['id']),
        expectedTokenId: _text(value['expectedTokenId']),
        afterText: _text(value['afterText']),
      );
}

class PracticeChatMessage {
  const PracticeChatMessage({
    required this.id,
    required this.speakerId,
    required this.segments,
  });

  final String id;
  final String speakerId;
  final List<Map<String, dynamic>> segments;

  factory PracticeChatMessage.fromMap(Map<String, dynamic> value) =>
      PracticeChatMessage(
        id: _text(value['id']),
        speakerId: _text(value['speakerId']),
        segments: _maps(value['segments']),
      );
}

class PracticeChat {
  const PracticeChat({
    required this.timestamp,
    required this.context,
    required this.speakers,
    required this.messages,
  });

  final String timestamp;
  final String context;
  final List<Map<String, dynamic>> speakers;
  final List<PracticeChatMessage> messages;

  factory PracticeChat.fromMap(Map<String, dynamic> value) => PracticeChat(
    timestamp: _text(value['timestamp']),
    context: _text(value['context']),
    speakers: _maps(value['speakers']),
    messages: _maps(
      value['messages'],
    ).map(PracticeChatMessage.fromMap).toList(growable: false),
  );
}

/// One turn of the non-graded Real-World Practice dialogue (current Format
/// 3.0 Q14 contract). Reuses the same shape as the existing dialogue-group
/// lines authored in lesson source content: [speakerId] resolves through the
/// lesson's approved character pool, [reading] is learning-language-only
/// (hiragana; omitted/equal-to-text when the line has no kanji), and
/// [translationByNative] is native-language-only support text.
class PracticeDialogueLine {
  const PracticeDialogueLine({
    required this.speakerId,
    required this.targetText,
    required this.reading,
    required this.speechText,
    required this.translation,
    required this.audioLocale,
    this.romanization,
  });

  final String speakerId;
  final String targetText;
  final String reading;
  final String speechText;

  /// Already resolved for the current `nativeLanguageCode` — content
  /// authors provide `translationByNative` (vi/en/ja); by the time this
  /// model is built, [Lesson.localizedFiveCardContent] has collapsed it to
  /// this single locale-correct string via `resolveNativeContentMap`, the
  /// same convention every other dialogue renderer in this codebase uses.
  final String translation;
  final String audioLocale;
  final String? romanization;

  /// True when [reading] differs from [targetText] — i.e. the line contains
  /// kanji and a furigana-style reading is meaningful to show.
  bool get hasReading => reading.trim().isNotEmpty && reading != targetText;
  bool get hasRomanization => romanization?.isNotEmpty == true;

  factory PracticeDialogueLine.fromMap(Map<String, dynamic> value) {
    final targetText = _text(value['targetText']);
    return PracticeDialogueLine(
      speakerId: _text(value['speakerId']),
      targetText: targetText,
      reading: _text(value['reading']).isEmpty
          ? targetText
          : _text(value['reading']),
      speechText: _text(value['speechText']).isEmpty
          ? targetText
          : _text(value['speechText']),
      translation: _text(value['translation']),
      audioLocale: _text(value['audioLocale']).isEmpty
          ? 'ja-JP'
          : _text(value['audioLocale']),
      romanization: _optionalString(value, 'romanization'),
    );
  }

  Map<String, dynamic> toMap() => {
    'speakerId': speakerId,
    'targetText': targetText,
    'reading': reading,
    'speechText': speechText,
    'translation': translation,
    'audioLocale': audioLocale,
    if (romanization != null) 'romanization': romanization,
  };
}

/// A non-spoken scene transition in the Format 3.0 Q14 dialogue. It is kept
/// separate from [PracticeDialogueLine] so it never gains speaker metadata,
/// an audio control, or a place in the required 14 spoken turns.
class PracticeSceneDivider {
  const PracticeSceneDivider({
    required this.afterDialogueLine,
    required this.targetText,
    required this.translation,
  });

  final int afterDialogueLine;
  final String targetText;
  final String translation;

  factory PracticeSceneDivider.fromMap(Map<String, dynamic> value) =>
      PracticeSceneDivider(
        afterDialogueLine: value['afterDialogueLine'] as int? ?? 0,
        targetText: _text(value['targetText']),
        translation: _text(value['translation']),
      );
}

class PracticeFeedback {
  const PracticeFeedback({
    required this.correctAnswer,
    required this.explanation,
    this.correctMessage = '',
  });

  final String correctAnswer;
  final String explanation;
  final String correctMessage;

  factory PracticeFeedback.fromMap(Map<String, dynamic> value) =>
      PracticeFeedback(
        correctAnswer: _text(value['correctAnswer']),
        explanation: _text(value['explanation']),
        correctMessage: _text(value['correctMessage']),
      );
}

class PracticeExercise {
  const PracticeExercise({
    required this.id,
    required this.order,
    required this.plan,
    required this.type,
    required this.prompt,
    required this.raw,
  });

  final String id;
  final int order;
  final String plan;
  final String type;
  final String prompt;
  final Map<String, dynamic> raw;

  factory PracticeExercise.fromMap(Map<String, dynamic> value) =>
      PracticeExercise(
        id: _text(value['id']),
        order: value['order'] as int? ?? 0,
        plan: _text(value['plan']),
        type: _text(value['type']),
        prompt: _text(value['prompt']),
        raw: value,
      );

  String get context => _text(raw['context']);
  String get audioText => _text(raw['audioText']);
  String get readingAid => _text(raw['readingAid']);
  String get translation => _text(raw['translation']);
  int get maxCycles => raw['maxCycles'] as int? ?? 0;
  String get correctOptionId => _text(raw['correctOptionId']);
  List<PracticeOption> get options =>
      _maps(raw['options']).map(PracticeOption.fromMap).toList(growable: false);
  List<PracticeToken> get tokens =>
      _maps(raw['tokens']).map(PracticeToken.fromMap).toList(growable: false);
  List<PracticeAnswerSlot> get answerSlots => _maps(
    raw['answerSlots'],
  ).map(PracticeAnswerSlot.fromMap).toList(growable: false);
  List<String> get correctTokenIds =>
      (raw['correctTokenIds'] as List? ?? const []).map(_text).toList();
  List<String> get unusedTokenIds =>
      (raw['unusedTokenIds'] as List? ?? const []).map(_text).toList();
  List<PracticePair> get pairs =>
      _maps(raw['pairs']).map(PracticePair.fromMap).toList(growable: false);
  List<PracticeSlot> get slots =>
      _maps(raw['slots']).map(PracticeSlot.fromMap).toList(growable: false);
  List<PracticeOption> get wordBank => _maps(
    raw['wordBank'],
  ).map(PracticeOption.fromMap).toList(growable: false);
  List<String> get dialogue =>
      (raw['dialogue'] as List? ?? const []).map(_text).toList(growable: false);
  List<PracticeExercise> get subQuestions =>
      _maps(raw['subQuestions']).map(PracticeExercise.fromMap).toList();

  /// Non-graded advanced dialogue practice (Lesson Format 3.0 Q14 contract).
  bool get isNonGraded => raw['nonGraded'] == true;
  String get scenarioTitle => _text(raw['scenarioTitle']);
  String get scenarioDescription => _text(raw['scenarioDescription']);
  List<String> get characterIds => (raw['characterIds'] as List? ?? const [])
      .map(_text)
      .toList(growable: false);
  List<PracticeDialogueLine> get dialogueLines => _maps(
    raw['dialogueLines'],
  ).map(PracticeDialogueLine.fromMap).toList(growable: false);
  List<PracticeSceneDivider> get sceneDividers => _maps(
    raw['sceneDividers'],
  ).map(PracticeSceneDivider.fromMap).toList(growable: false);
  List<String> get aiCriteria =>
      (raw['aiCriteria'] as List? ?? const []).map(_text).toList();
  PracticeFeedback get feedback =>
      PracticeFeedback.fromMap(_map(raw['feedback']));
  PracticeChat? get chat {
    final value = _map(raw['chat']);
    return value.isEmpty ? null : PracticeChat.fromMap(value);
  }

  bool checksOption(String optionId) => optionId == correctOptionId;

  bool checksOrder(List<String> selectedIds) =>
      _sameIds(selectedIds, correctTokenIds) &&
      unusedTokenIds.every((id) => !selectedIds.contains(id));

  bool checksTokenSlots(Map<String, String> answers) =>
      answers.length == answerSlots.length &&
      answerSlots.every((slot) => answers[slot.id] == slot.expectedTokenId);

  bool checksPairs(Map<String, String> answers) =>
      answers.length == pairs.length &&
      pairs.every((pair) => answers[pair.left.id] == pair.right.id);

  bool checksSlots(Map<String, String> answers) =>
      answers.length == slots.length &&
      slots.every((slot) => answers[slot.id] == slot.answerId);

  bool checksChatSlots(Map<String, String> answers) =>
      answers.length == slots.length &&
      slots.every(
        (slot) => slot.acceptedAnswers
            .map(normalizePracticeTextAnswer)
            .contains(normalizePracticeTextAnswer(answers[slot.id] ?? '')),
      );

  bool _sameIds(List<String> actual, List<String> expected) =>
      actual.length == expected.length &&
      List.generate(
        actual.length,
        (index) => actual[index] == expected[index],
      ).every((same) => same);
}

/// Orders are made once per attempt and remain stable across widget rebuilds.
class PracticeAttempt {
  PracticeAttempt._({required this.orderByExercise});

  final Map<String, List<String>> orderByExercise;

  factory PracticeAttempt.create(FiveCardPractice practice, {Random? random}) {
    final source = random ?? Random();
    final orders = <String, List<String>>{};
    for (final exercise in practice.exercises) {
      if (exercise.options.isNotEmpty) {
        orders['${exercise.id}:options'] = _shuffledIds(
          exercise.options.map((item) => item.id).toList(),
          source,
        );
      }
      if (exercise.tokens.isNotEmpty) {
        orders['${exercise.id}:tokens'] = _shuffledIds(
          exercise.tokens.map((item) => item.id).toList(),
          source,
        );
      }
      if (exercise.wordBank.isNotEmpty) {
        orders['${exercise.id}:wordBank'] = _shuffledIds(
          exercise.wordBank.map((item) => item.id).toList(),
          source,
        );
      }
      if (exercise.pairs.isNotEmpty) {
        orders['${exercise.id}:left'] = _shuffledIds(
          exercise.pairs.map((item) => item.left.id).toList(),
          source,
        );
        orders['${exercise.id}:right'] = _shuffledIds(
          exercise.pairs.map((item) => item.right.id).toList(),
          source,
        );
      }
      for (final question in exercise.subQuestions) {
        orders['${question.id}:options'] = _shuffledIds(
          question.options.map((item) => item.id).toList(),
          source,
        );
      }
    }
    return PracticeAttempt._(orderByExercise: orders);
  }

  factory PracticeAttempt.restore(Map<String, List<String>> orderByExercise) =>
      PracticeAttempt._(
        orderByExercise: Map.unmodifiable(
          orderByExercise.map(
            (key, value) => MapEntry(key, List<String>.unmodifiable(value)),
          ),
        ),
      );

  List<String> orderFor(String key) =>
      List.unmodifiable(orderByExercise[key] ?? const <String>[]);

  static List<String> _shuffledIds(List<String> source, Random random) {
    if (source.length < 2) return List.unmodifiable(source);
    final shuffled = List<String>.from(source)..shuffle(random);
    if (_sameOrder(source, shuffled)) {
      shuffled.add(shuffled.removeAt(0));
    }
    return List.unmodifiable(shuffled);
  }

  static bool _sameOrder(List<String> left, List<String> right) =>
      left.length == right.length &&
      List.generate(
        left.length,
        (index) => left[index] == right[index],
      ).every((same) => same);
}
