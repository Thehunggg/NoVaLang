import '../core/utils/answer_normalize.dart';

enum ExerciseType {
  characterCard,
  chooseMeaning,
  chooseReading,
  chooseVocabulary,
  chooseCorrectAnswer,
  fillMissingCharacter,
  soundToCharacter,
  nextInSequence,
  chooseCorrectPair,
  matchPairs,
  typeAnswer,
  fillBlank,
  listenAndChoose,
  listeningGapFill,
  plusListeningVocabularyChallenge,
  controlledAiQa,
  aiFeedbackReview,
}

class MatchPair {
  const MatchPair({required this.left, required this.right});

  final String left;
  final String right;
}

class LearnCard {
  const LearnCard({
    required this.id,
    required this.character,
    required this.reading,
    required this.speechText,
    required this.example,
    this.exampleReading,
    this.exampleRomanization,
    this.exampleSpeechText,
    this.meaningByNative = const {},
    this.audioCardLabelByNative = const {},
    this.feedbackByNative = const {},
  });

  final String id;
  final String character;
  final String reading;
  final String speechText;
  final String example;
  final String? exampleReading;
  final String? exampleRomanization;
  final String? exampleSpeechText;
  final Map<String, String> meaningByNative;
  final Map<String, String> audioCardLabelByNative;
  final Map<String, String> feedbackByNative;

  String localizedMeaning(String nativeLanguageCode) =>
      meaningByNative[nativeLanguageCode] ?? meaningByNative['en'] ?? '';

  String localizedAudioLabel(String nativeLanguageCode) =>
      audioCardLabelByNative[nativeLanguageCode] ??
      audioCardLabelByNative['en'] ??
      'Listen';

  String localizedFeedback(String nativeLanguageCode) =>
      feedbackByNative[nativeLanguageCode] ?? feedbackByNative['en'] ?? '';
}

class ExerciseSubQuestion {
  const ExerciseSubQuestion({
    required this.id,
    required this.prompt,
    required this.speechText,
    required this.options,
    required this.correctAnswer,
    this.prompts = const {},
    this.visibleBeforeAnswer,
    this.visibleBeforeAnswerByNative = const {},
    this.audioCardLabel,
    this.audioCardLabelByNative = const {},
    this.hideSpeechLabel = true,
    this.revealAfterAnswer,
    this.revealAfterAnswerByNative = const {},
    this.feedbackCorrectByNative = const {},
    this.feedbackWrongByNative = const {},
  });

  final String id;
  final String prompt;
  final Map<String, String> prompts;
  final String speechText;
  final String? visibleBeforeAnswer;
  final Map<String, String> visibleBeforeAnswerByNative;
  final String? audioCardLabel;
  final Map<String, String> audioCardLabelByNative;
  final bool hideSpeechLabel;
  final List<String> options;
  final String correctAnswer;
  final String? revealAfterAnswer;
  final Map<String, String> revealAfterAnswerByNative;
  final Map<String, String> feedbackCorrectByNative;
  final Map<String, String> feedbackWrongByNative;

  String localizedPrompt(String nativeLanguageCode) =>
      prompts[nativeLanguageCode] ?? prompts['en'] ?? prompt;

  String localizedVisibleBeforeAnswer(String nativeLanguageCode) =>
      visibleBeforeAnswerByNative[nativeLanguageCode] ??
      visibleBeforeAnswerByNative['en'] ??
      visibleBeforeAnswer ??
      '';

  String localizedAudioCardLabel(String nativeLanguageCode) =>
      audioCardLabelByNative[nativeLanguageCode] ??
      audioCardLabelByNative['en'] ??
      audioCardLabel ??
      'Listen';

  String localizedRevealAfterAnswer(String nativeLanguageCode) =>
      revealAfterAnswerByNative[nativeLanguageCode] ??
      revealAfterAnswerByNative['en'] ??
      revealAfterAnswer ??
      '';

  String localizedFeedback(String nativeLanguageCode, bool correct) {
    final map = correct ? feedbackCorrectByNative : feedbackWrongByNative;
    return map[nativeLanguageCode] ?? map['en'] ?? '';
  }

  bool check(String answer, {NormalizeAnswerOptions options = const NormalizeAnswerOptions()}) =>
      answersMatch(answer, correctAnswer, options: options);
}

class Exercise {
  const Exercise({
    required this.id,
    required this.type,
    required this.prompt,
    this.promptVi,
    this.prompts = const {},
    this.displayText,
    this.displayTextByNative = const {},
    this.speechText,
    this.hideSpeechLabel = false,
    this.audioCardLabel,
    this.audioCardLabelByNative = const {},
    this.cards = const [],
    this.subQuestions = const [],
    this.revealAfterAnswer,
    this.feedbackCorrectByNative = const {},
    this.feedbackWrongByNative = const {},
    this.options = const [],
    this.optionsVi = const [],
    this.optionsByNative = const {},
    this.correctAnswer = '',
    this.acceptedAnswers = const [],
    this.acceptedAnswersVi = const [],
    this.acceptedAnswersByNative = const {},
    this.pairs = const [],
    this.pairsVi = const [],
    this.pairsByNative = const {},
    this.instructionByNative = const {},
    this.plusOnly = false,
    this.usesAi = false,
    this.reusesPreviousAiFeedback = false,
    this.triggerExtraAiCallByDefault = false,
    this.maxUserChars = 400,
    this.caseInsensitive = false,
    this.ignorePunctuation = false,
  });

  final String id;
  final ExerciseType type;
  final String prompt;
  final String? promptVi;
  final Map<String, String> prompts;
  final String? displayText;
  final Map<String, String> displayTextByNative;
  final String? speechText;
  final bool hideSpeechLabel;
  final String? audioCardLabel;
  final Map<String, String> audioCardLabelByNative;
  final List<LearnCard> cards;
  final List<ExerciseSubQuestion> subQuestions;
  final String? revealAfterAnswer;
  final Map<String, String> feedbackCorrectByNative;
  final Map<String, String> feedbackWrongByNative;
  final List<String> options;
  final List<String> optionsVi;
  final Map<String, List<String>> optionsByNative;
  final String correctAnswer;
  final List<String> acceptedAnswers;
  final List<String> acceptedAnswersVi;
  final Map<String, List<String>> acceptedAnswersByNative;
  final List<MatchPair> pairs;
  final List<MatchPair> pairsVi;
  final Map<String, List<MatchPair>> pairsByNative;
  final Map<String, String> instructionByNative;
  final bool plusOnly;
  final bool usesAi;
  final bool reusesPreviousAiFeedback;
  final bool triggerExtraAiCallByDefault;
  final int maxUserChars;
  final bool caseInsensitive;
  final bool ignorePunctuation;

  NormalizeAnswerOptions get normalizeOptions => NormalizeAnswerOptions(
        caseInsensitive: caseInsensitive,
        ignorePunctuation: ignorePunctuation,
      );

  List<String> localizedOptions(String nativeLanguageCode) {
    final byNative = optionsByNative[nativeLanguageCode];
    if (byNative != null && byNative.isNotEmpty) return byNative;
    if (nativeLanguageCode == 'vi' && optionsVi.isNotEmpty) return optionsVi;
    return options;
  }

  List<String> localizedAccepted(String nativeLanguageCode) {
    final byNative = acceptedAnswersByNative[nativeLanguageCode];
    if (byNative != null && byNative.isNotEmpty) return byNative;
    if (nativeLanguageCode == 'vi' && acceptedAnswersVi.isNotEmpty) {
      return acceptedAnswersVi;
    }
    return acceptedAnswers;
  }

  List<MatchPair> localizedPairs(String nativeLanguageCode) {
    final byNative = pairsByNative[nativeLanguageCode];
    if (byNative != null && byNative.isNotEmpty) return byNative;
    if (nativeLanguageCode == 'vi' && pairsVi.isNotEmpty) return pairsVi;
    return pairs;
  }

  String localizedPrompt(String nativeLanguageCode) {
    final byNative = prompts[nativeLanguageCode];
    if (byNative != null && byNative.isNotEmpty) return byNative;
    if (nativeLanguageCode == 'vi' && promptVi != null) return promptVi!;
    return prompt;
  }

  String localizedInstruction(String nativeLanguageCode) =>
      instructionByNative[nativeLanguageCode] ??
      instructionByNative['en'] ??
      '';

  String localizedDisplayText(String nativeLanguageCode) =>
      displayTextByNative[nativeLanguageCode] ??
      displayTextByNative['en'] ??
      displayText ??
      '';

  String localizedAudioCardLabel(String nativeLanguageCode) =>
      audioCardLabelByNative[nativeLanguageCode] ??
      audioCardLabelByNative['en'] ??
      audioCardLabel ??
      'Listen';

  String localizedFeedback(String nativeLanguageCode, bool correct) {
    final map = correct ? feedbackCorrectByNative : feedbackWrongByNative;
    return map[nativeLanguageCode] ?? map['en'] ?? '';
  }

  bool check(Object answer, String nativeLanguageCode) {
    final opts = normalizeOptions;
    if (type == ExerciseType.characterCard) return true;
    if (type == ExerciseType.matchPairs) {
      final expected = localizedPairs(nativeLanguageCode);
      final submitted = answer is Map<String, String>
          ? answer
          : <String, String>{};
      if (submitted.length != expected.length) return false;
      return expected.every(
        (pair) => answersMatch(
          submitted[pair.left],
          pair.right,
          options: opts,
        ),
      );
    }
    if (type == ExerciseType.listeningGapFill) {
      final accepted = localizedAccepted(nativeLanguageCode);
      if (answer is List) {
        if (answer.length != accepted.length) return false;
        for (var i = 0; i < accepted.length; i += 1) {
          if (!answersMatch(answer[i].toString(), accepted[i], options: opts)) {
            return false;
          }
        }
        return true;
      }
      final parts = answer.toString().split('|');
      if (parts.length != accepted.length) return false;
      for (var i = 0; i < accepted.length; i += 1) {
        if (!answersMatch(parts[i], accepted[i], options: opts)) return false;
      }
      return true;
    }
    if (type == ExerciseType.controlledAiQa ||
        type == ExerciseType.aiFeedbackReview) {
      final text = answer.toString().trim();
      return text.isNotEmpty && text.length <= maxUserChars;
    }
    final accepted = localizedAccepted(nativeLanguageCode);
    final value = normalizeAnswer(answer.toString(), options: opts);
    return accepted.any(
      (item) => normalizeAnswer(item, options: opts) == value,
    );
  }

  /// Shared Unicode-safe answer normalization (does not strip accents).
  static String normalize(
    String value, {
    NormalizeAnswerOptions options = const NormalizeAnswerOptions(),
  }) =>
      normalizeAnswer(value, options: options);
}
