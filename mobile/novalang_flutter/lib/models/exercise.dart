enum ExerciseType {
  chooseMeaning,
  chooseReading,
  matchPairs,
  typeAnswer,
  fillBlank,
  listenAndChoose,
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
    this.displayText,
    this.speechText,
    this.options = const [],
    this.optionsVi = const [],
    this.correctAnswer = '',
    this.acceptedAnswers = const [],
    this.acceptedAnswersVi = const [],
    this.pairs = const [],
    this.pairsVi = const [],
  });

  final String id;
  final ExerciseType type;
  final String prompt;
  final String? displayText;
  final String? speechText;
  final List<String> options;
  final List<String> optionsVi;
  final String correctAnswer;
  final List<String> acceptedAnswers;
  final List<String> acceptedAnswersVi;
  final List<MatchPair> pairs;
  final List<MatchPair> pairsVi;

  List<String> localizedOptions(String nativeLanguageCode) =>
      nativeLanguageCode == 'vi' && optionsVi.isNotEmpty ? optionsVi : options;
  List<String> localizedAccepted(String nativeLanguageCode) =>
      nativeLanguageCode == 'vi' && acceptedAnswersVi.isNotEmpty
      ? acceptedAnswersVi
      : acceptedAnswers;
  List<MatchPair> localizedPairs(String nativeLanguageCode) =>
      nativeLanguageCode == 'vi' && pairsVi.isNotEmpty ? pairsVi : pairs;

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
    final accepted = localizedAccepted(nativeLanguageCode);
    final value = normalize(answer.toString());
    return accepted.any((item) => normalize(item) == value);
  }

  static String normalize(String value) =>
      value.toLowerCase().trim().replaceAll(RegExp(r'\s+'), ' ');
}
