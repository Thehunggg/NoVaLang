import '../core/utils/native_content.dart';
import '../models/five_card_practice.dart';

class AiExerciseGrade {
  const AiExerciseGrade({
    required this.passed,
    required this.score,
    required this.missingPartIndexes,
    required this.shortExplanation,
    required this.correctedExample,
  });

  final bool passed;
  final int score;
  final List<int> missingPartIndexes;
  final String shortExplanation;
  final String correctedExample;
}

class AiExerciseGradingRequest {
  const AiExerciseGradingRequest({
    required this.exercise,
    required this.answer,
    required this.nativeLanguageCode,
  });

  final PracticeExercise exercise;
  final String answer;

  /// Locale the grader must use for `correction`/`explanation`/`feedback`
  /// text. Every grader implementation — including dev mocks — must honor
  /// this and must never silently substitute Vietnamese or English.
  final String nativeLanguageCode;
}

abstract interface class AiExerciseGrader {
  Future<AiExerciseGrade> grade(AiExerciseGradingRequest request);
}

class AiExerciseOfflineException implements Exception {
  const AiExerciseOfflineException();
}

/// Development-only structured grader. It deliberately makes no network call
/// and is replaceable by a production grader implementation.
class DevMockAiExerciseGrader implements AiExerciseGrader {
  const DevMockAiExerciseGrader({this.forceOffline = false});

  final bool forceOffline;

  @override
  Future<AiExerciseGrade> grade(AiExerciseGradingRequest request) async {
    if (forceOffline) throw const AiExerciseOfflineException();
    final answer = request.answer.trim();
    final normalized = answer.toLowerCase();
    final greeting =
        answer.contains('はじめまして') || normalized.contains('hajimemashite');
    final introduction =
        (answer.contains('私') &&
            (answer.contains('です') || normalized.contains('desu'))) ||
        (normalized.contains('watashi') && normalized.contains('desu'));
    final closing = answer.contains('よろしく') || normalized.contains('yoroshiku');
    final checks = [greeting, introduction, closing];
    final missing = <int>[
      for (var index = 0; index < checks.length; index++)
        if (!checks[index]) index,
    ];
    final passed = missing.isEmpty;
    return AiExerciseGrade(
      passed: passed,
      score: ((checks.where((value) => value).length / checks.length) * 100)
          .round(),
      missingPartIndexes: missing,
      shortExplanation: passed
          ? ''
          : _explanation(missing, request.nativeLanguageCode),
      correctedExample: _correctedExample(request.exercise, answer),
    );
  }

  static const List<Map<String, String>> _missingPartLabels = [
    {'vi': 'lời chào', 'en': 'a greeting', 'ja': 'あいさつ'},
    {'vi': 'phần giới thiệu tên', 'en': 'a self-introduction', 'ja': '名前の紹介'},
    {'vi': 'lời chào kết', 'en': 'a closing phrase', 'ja': '結びの言葉'},
  ];

  static const Map<String, String> _explanationTemplate = {
    'vi': 'Câu trả lời còn thiếu: {parts}.',
    'en': 'Your answer is missing: {parts}.',
    'ja': '回答に不足している部分: {parts}。',
  };

  static const Map<String, String> _joiner = {'vi': ', ', 'en': ', ', 'ja': '、'};

  String _explanation(List<int> missing, String nativeLanguageCode) {
    final locale = normalizeNativeLocale(nativeLanguageCode);
    final template = _explanationTemplate[locale];
    if (template == null) {
      return missingNativeContentSentinel(
        'aiExerciseGrader.explanation',
        locale,
      );
    }
    final parts = missing
        .where((index) => index < _missingPartLabels.length)
        .map((index) => _missingPartLabels[index][locale] ?? '')
        .where((label) => label.isNotEmpty)
        .join(_joiner[locale] ?? ', ');
    return template.replaceAll('{parts}', parts);
  }

  String _correctedExample(PracticeExercise exercise, String answer) {
    final name = _nameFromAnswer(answer);
    final template = exercise.raw['correctedExampleTemplate'] as Map?;
    if (template == null || name.isEmpty) return '';
    return '${template['greeting']}\n${template['introductionPrefix']}$name${template['introductionSuffix']}\n${template['closing']}';
  }

  String _nameFromAnswer(String answer) {
    final japanese = RegExp(
      r'私(?:は|わ)(.+?)(?:です|だよ)',
      unicode: true,
    ).firstMatch(answer);
    if (japanese != null) return japanese.group(1)?.trim() ?? '';
    final romaji = RegExp(
      r'watashi\s+wa\s+(.+?)\s+desu',
      caseSensitive: false,
      unicode: true,
    ).firstMatch(answer);
    return romaji?.group(1)?.trim() ?? '';
  }
}

bool isLocallyValidAiExerciseAnswer(String value, PracticeExercise exercise) {
  final trimmed = value.trim();
  if (trimmed.isEmpty) return false;
  if (!RegExp(r'[\p{L}\p{N}]', unicode: true).hasMatch(trimmed)) return false;
  final policy = exercise.raw['localValidation'] as Map?;
  final minLetters = policy?['minLetters'] as int? ?? 1;
  return RegExp(r'[\p{L}\p{N}]', unicode: true).allMatches(trimmed).length >=
      minLetters;
}
