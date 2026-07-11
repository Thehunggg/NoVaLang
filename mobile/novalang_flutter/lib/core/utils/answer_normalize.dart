/// Shared answer normalization (mirrors shared/answerNormalize.ts).
///
/// - null -> ""
/// - Preserve Unicode (no accent stripping, no non-Latin removal)
/// - Trim + collapse whitespace
/// - Case fold / punctuation strip only when explicitly requested
library;

class NormalizeAnswerOptions {
  const NormalizeAnswerOptions({
    this.caseInsensitive = false,
    this.ignorePunctuation = false,
    this.allowedScript = 'any',
  });

  final bool caseInsensitive;
  final bool ignorePunctuation;

  /// Reserved; default "any" means no script filtering on answers.
  final String allowedScript;
}

final RegExp _whitespaceCollapse = RegExp(r'\s+');
final RegExp _punctuation = RegExp(r'[.!?¡¿。、「」""''„«»]');

String normalizeAnswer(
  String? value, {
  NormalizeAnswerOptions options = const NormalizeAnswerOptions(),
}) {
  if (value == null) return '';
  // Keep all Unicode code points. Do not NFD-decompose or strip marks.
  // Full ICU NFC is not built into Dart; composed IME input is preserved as-is.
  var text = value.trim().replaceAll(_whitespaceCollapse, ' ');
  if (options.ignorePunctuation) {
    text = text.replaceAll(_punctuation, '');
  }
  if (options.caseInsensitive) {
    text = text.toLowerCase();
  }
  return text;
}

bool answersMatch(
  String? submitted,
  String? expected, {
  NormalizeAnswerOptions options = const NormalizeAnswerOptions(),
}) =>
    normalizeAnswer(submitted, options: options) ==
    normalizeAnswer(expected, options: options);
