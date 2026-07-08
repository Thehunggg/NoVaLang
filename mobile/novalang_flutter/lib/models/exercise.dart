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
    this.promptVi,
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
  final String? promptVi;
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
  String localizedPrompt(String nativeLanguageCode) =>
      nativeLanguageCode == 'vi' && promptVi != null ? promptVi! : prompt;

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
