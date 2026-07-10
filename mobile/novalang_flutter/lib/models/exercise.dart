enum ExerciseType {
  chooseMeaning,
  chooseReading,
  chooseVocabulary,
  chooseCorrectAnswer,
  matchPairs,
  typeAnswer,
  fillBlank,
  listenAndChoose,
  listeningGapFill,
  controlledAiQa,
  aiFeedbackReview,
}

class MatchPair {
  const MatchPair({required this.left, required this.right});

  final String left;
  final String right;
}

class Exercise {
  const Exercise({
    required this.id,
    required this.type,
    required this.prompt,
    this.promptVi,
    this.prompts = const {},
    this.displayText,
    this.speechText,
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
    this.plusOnly = false,
    this.usesAi = false,
    this.reusesPreviousAiFeedback = false,
    this.triggerExtraAiCallByDefault = false,
    this.maxUserChars = 400,
  });

  final String id;
  final ExerciseType type;
  final String prompt;
  final String? promptVi;
  final Map<String, String> prompts;
  final String? displayText;
  final String? speechText;
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
  final bool plusOnly;
  final bool usesAi;
  final bool reusesPreviousAiFeedback;
  final bool triggerExtraAiCallByDefault;
  final int maxUserChars;

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

  bool check(Object answer, String nativeLanguageCode) {
    if (type == ExerciseType.matchPairs) {
      final expected = localizedPairs(nativeLanguageCode);
      final submitted = answer is Map<String, String>
          ? answer
          : <String, String>{};
      if (submitted.length != expected.length) return false;
      return expected.every(
        (pair) =>
            normalize(submitted[pair.left] ?? '') == normalize(pair.right),
      );
    }
    if (type == ExerciseType.listeningGapFill) {
      final accepted = localizedAccepted(nativeLanguageCode);
      if (answer is List) {
        if (answer.length != accepted.length) return false;
        for (var i = 0; i < accepted.length; i += 1) {
          if (normalize(answer[i].toString()) != normalize(accepted[i])) {
            return false;
          }
        }
        return true;
      }
      final parts = answer.toString().split('|');
      if (parts.length != accepted.length) return false;
      for (var i = 0; i < accepted.length; i += 1) {
        if (normalize(parts[i]) != normalize(accepted[i])) return false;
      }
      return true;
    }
    if (type == ExerciseType.controlledAiQa ||
        type == ExerciseType.aiFeedbackReview) {
      final text = answer.toString().trim();
      return text.isNotEmpty && text.length <= maxUserChars;
    }
    final accepted = localizedAccepted(nativeLanguageCode);
    final value = normalize(answer.toString());
    return accepted.any((item) => normalize(item) == value);
  }

  static String normalize(String value) {
    const accents = {
      'à': 'a',
      'á': 'a',
      'ả': 'a',
      'ã': 'a',
      'ạ': 'a',
      'ă': 'a',
      'ằ': 'a',
      'ắ': 'a',
      'ẳ': 'a',
      'ẵ': 'a',
      'ặ': 'a',
      'â': 'a',
      'ầ': 'a',
      'ấ': 'a',
      'ẩ': 'a',
      'ẫ': 'a',
      'ậ': 'a',
      'è': 'e',
      'é': 'e',
      'ẻ': 'e',
      'ẽ': 'e',
      'ẹ': 'e',
      'ê': 'e',
      'ề': 'e',
      'ế': 'e',
      'ể': 'e',
      'ễ': 'e',
      'ệ': 'e',
      'ì': 'i',
      'í': 'i',
      'ỉ': 'i',
      'ĩ': 'i',
      'ị': 'i',
      'ò': 'o',
      'ó': 'o',
      'ỏ': 'o',
      'õ': 'o',
      'ọ': 'o',
      'ô': 'o',
      'ồ': 'o',
      'ố': 'o',
      'ổ': 'o',
      'ỗ': 'o',
      'ộ': 'o',
      'ơ': 'o',
      'ờ': 'o',
      'ớ': 'o',
      'ở': 'o',
      'ỡ': 'o',
      'ợ': 'o',
      'ù': 'u',
      'ú': 'u',
      'ủ': 'u',
      'ũ': 'u',
      'ụ': 'u',
      'ư': 'u',
      'ừ': 'u',
      'ứ': 'u',
      'ử': 'u',
      'ữ': 'u',
      'ự': 'u',
      'ỳ': 'y',
      'ý': 'y',
      'ỷ': 'y',
      'ỹ': 'y',
      'ỵ': 'y',
      'đ': 'd',
    };
    return value
        .toLowerCase()
        .split('')
        .map((char) => accents[char] ?? char)
        .join()
        .replaceAll(RegExp(r'[.!?。、「」“”’]'), '')
        .trim()
        .replaceAll(RegExp(r'\s+'), ' ');
  }
}
