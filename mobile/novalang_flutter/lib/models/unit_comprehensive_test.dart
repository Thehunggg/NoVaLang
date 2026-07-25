import 'five_card_practice.dart' show normalizePracticeTextAnswer;

/// Bài tổng hợp cuối Unit — Unit Comprehensive Test (ADR-022).
///
/// Schema nguồn: `UnitComprehensiveTest` trong `shared/types.ts`.
/// Luật viết bài + cách chấm: `LESSON_AUTHORING_STANDARD.md` §E4 / §D-Cloze.
///
/// Ba loại câu, hai đường chấm — cả hai đều SO KHỚP CỐ ĐỊNH, KHÔNG gọi AI:
///  - `sentence_multi_blank_choice` / `dialogue_multi_blank_choice`
///    → chấm bằng so `correctOptionId`.
///  - `typed_blank` → chấm bằng `acceptedAnswers` +
///    [normalizePracticeTextAnswer], TÁI DÙNG nguyên cơ chế Q10
///    `chat_text_fill` (không chế cơ chế mới).
enum UnitComprehensiveQuestionKind {
  sentenceMultiBlankChoice,
  dialogueMultiBlankChoice,
  typedBlank;

  static UnitComprehensiveQuestionKind fromJson(String? raw) {
    switch (raw) {
      case 'sentence_multi_blank_choice':
        return UnitComprehensiveQuestionKind.sentenceMultiBlankChoice;
      case 'dialogue_multi_blank_choice':
        return UnitComprehensiveQuestionKind.dialogueMultiBlankChoice;
      case 'typed_blank':
        return UnitComprehensiveQuestionKind.typedBlank;
      default:
        throw FormatException('Unknown comprehensive question kind: $raw');
    }
  }

  /// Câu này người học CHỌN phương án (thay vì tự gõ)?
  bool get isChoice => this != UnitComprehensiveQuestionKind.typedBlank;
}

/// Một ô trống. `acceptedAnswers` chỉ dùng để chấm ở câu tự gõ; ở câu chọn
/// phương án nó phục vụ hiển thị đáp án đúng khi chữa bài + đọc TTS.
class UnitComprehensiveBlank {
  const UnitComprehensiveBlank({
    required this.id,
    required this.displayAnswer,
    required this.canonicalAnswer,
    required this.audioText,
    required this.acceptedAnswers,
    this.hint,
  });

  final String id;
  final String displayAnswer;
  final String canonicalAnswer;
  final String audioText;
  final List<String> acceptedAnswers;
  final String? hint;

  /// So khớp một đáp án người học gõ với ô này (§D-Cloze).
  bool matches(String submitted, {String? languageCode}) {
    final normalized = normalizePracticeTextAnswer(
      submitted,
      languageCode: languageCode,
    );
    return acceptedAnswers
        .map((a) => normalizePracticeTextAnswer(a, languageCode: languageCode))
        .contains(normalized);
  }

  factory UnitComprehensiveBlank.fromMap(Map<String, dynamic> value) =>
      UnitComprehensiveBlank(
        id: value['id'] as String? ?? '',
        displayAnswer: value['displayAnswer'] as String? ?? '',
        canonicalAnswer: value['canonicalAnswer'] as String? ?? '',
        audioText: value['audioText'] as String? ?? '',
        acceptedAnswers: (value['acceptedAnswers'] as List? ?? const [])
            .map((e) => e.toString())
            .toList(growable: false),
        hint: value['hint'] as String?,
      );
}

/// Một đoạn của câu. Đoạn có [blankId] là ô điền; đoạn còn lại hiển thị
/// nguyên văn. Cùng khuôn với segment của Q10 `chat_text_fill`.
class UnitComprehensiveSegment {
  const UnitComprehensiveSegment({
    this.displayText,
    this.canonicalText,
    this.audioText,
    this.blankId,
  });

  final String? displayText;
  final String? canonicalText;
  final String? audioText;
  final String? blankId;

  bool get isBlank => blankId != null && blankId!.isNotEmpty;

  factory UnitComprehensiveSegment.fromMap(Map<String, dynamic> value) =>
      UnitComprehensiveSegment(
        displayText: value['displayText'] as String?,
        canonicalText: value['canonicalText'] as String?,
        audioText: value['audioText'] as String?,
        blankId: value['blankId'] as String?,
      );
}

/// Một lượt nói trong câu hội thoại (2–3 lượt, §E4).
class UnitComprehensiveDialogueTurn {
  const UnitComprehensiveDialogueTurn({
    required this.id,
    required this.speakerId,
    required this.segments,
  });

  final String id;
  final String speakerId;
  final List<UnitComprehensiveSegment> segments;

  factory UnitComprehensiveDialogueTurn.fromMap(Map<String, dynamic> value) =>
      UnitComprehensiveDialogueTurn(
        id: value['id'] as String? ?? '',
        speakerId: value['speakerId'] as String? ?? '',
        segments: (value['segments'] as List? ?? const [])
            .whereType<Map>()
            .map((e) =>
                UnitComprehensiveSegment.fromMap(Map<String, dynamic>.from(e)))
            .toList(growable: false),
      );
}

/// Một phương án — chứa đáp án cho TẤT CẢ ô của câu, nên chọn một lần là
/// điền xong cả câu.
class UnitComprehensiveOption {
  const UnitComprehensiveOption({
    required this.id,
    required this.text,
    required this.answersByBlankId,
  });

  final String id;
  final String text;
  final Map<String, String> answersByBlankId;

  factory UnitComprehensiveOption.fromMap(Map<String, dynamic> value) =>
      UnitComprehensiveOption(
        id: value['id'] as String? ?? '',
        text: value['text'] as String? ?? '',
        answersByBlankId:
            (value['answersByBlankId'] as Map? ?? const {}).map(
          (key, dynamic v) => MapEntry(key.toString(), v.toString()),
        ),
      );
}

/// Một câu hỏi của bài tổng hợp.
class UnitComprehensiveQuestion {
  const UnitComprehensiveQuestion({
    required this.id,
    required this.order,
    required this.kind,
    required this.prompt,
    required this.blanks,
    required this.explanation,
    this.context,
    this.segments = const [],
    this.dialogue = const [],
    this.options = const [],
    this.correctOptionId,
  });

  final String id;
  final int order;
  final UnitComprehensiveQuestionKind kind;
  final String prompt;
  final String? context;
  final List<UnitComprehensiveSegment> segments;
  final List<UnitComprehensiveDialogueTurn> dialogue;
  final List<UnitComprehensiveOption> options;
  final String? correctOptionId;
  final List<UnitComprehensiveBlank> blanks;
  final String explanation;

  UnitComprehensiveBlank? blankById(String id) {
    for (final b in blanks) {
      if (b.id == id) return b;
    }
    return null;
  }

  /// Đáp án đúng của từng ô, để hiển thị khi chữa bài.
  Map<String, String> get correctAnswersByBlankId => {
        for (final b in blanks) b.id: b.displayAnswer,
      };

  /// Chấm câu CHỌN PHƯƠNG ÁN: đúng khi chọn đúng phương án (mọi ô đều đúng).
  bool checksChoice(String? selectedOptionId) =>
      selectedOptionId != null &&
      correctOptionId != null &&
      selectedOptionId == correctOptionId;

  /// Chấm TỪNG Ô của câu tự gõ — dùng để phản hồi đúng/sai từng ô.
  Set<String> incorrectTypedBlankIds(
    Map<String, String> typed, {
    String? languageCode,
  }) => {
        for (final b in blanks)
          if (!b.matches(typed[b.id] ?? '', languageCode: languageCode)) b.id,
      };

  /// Chấm CÂU tự gõ: chỉ đúng khi MỌI ô đều đúng (§D-Cloze — không có điểm
  /// từng phần ở cấp câu, nhất quán với câu chọn phương án).
  bool checksTyped(Map<String, String> typed, {String? languageCode}) =>
      incorrectTypedBlankIds(typed, languageCode: languageCode).isEmpty;

  factory UnitComprehensiveQuestion.fromMap(Map<String, dynamic> value) =>
      UnitComprehensiveQuestion(
        id: value['id'] as String? ?? '',
        order: (value['order'] as num?)?.toInt() ?? 0,
        kind: UnitComprehensiveQuestionKind.fromJson(value['kind'] as String?),
        prompt: value['prompt'] as String? ?? '',
        context: value['context'] as String?,
        segments: (value['segments'] as List? ?? const [])
            .whereType<Map>()
            .map((e) =>
                UnitComprehensiveSegment.fromMap(Map<String, dynamic>.from(e)))
            .toList(growable: false),
        dialogue: (value['dialogue'] as List? ?? const [])
            .whereType<Map>()
            .map((e) => UnitComprehensiveDialogueTurn.fromMap(
                Map<String, dynamic>.from(e)))
            .toList(growable: false),
        options: (value['options'] as List? ?? const [])
            .whereType<Map>()
            .map((e) =>
                UnitComprehensiveOption.fromMap(Map<String, dynamic>.from(e)))
            .toList(growable: false),
        correctOptionId: value['correctOptionId'] as String?,
        blanks: (value['blanks'] as List? ?? const [])
            .whereType<Map>()
            .map((e) =>
                UnitComprehensiveBlank.fromMap(Map<String, dynamic>.from(e)))
            .toList(growable: false),
        explanation: value['explanation'] as String? ?? '',
      );
}

/// Bài tổng hợp của MỘT unit. Toàn bài Plus + có chấm điểm.
class UnitComprehensiveTest {
  const UnitComprehensiveTest({
    required this.id,
    required this.unitId,
    required this.title,
    required this.totalQuestions,
    required this.questions,
    this.description,
    this.estimatedMinutes,
    this.plan = 'plus',
    this.graded = true,
    this.languageCode,
  });

  final String id;
  final String unitId;
  final String title;
  final String? description;
  final String? estimatedMinutes;
  final int totalQuestions;
  final List<UnitComprehensiveQuestion> questions;

  /// Đọc từ dữ liệu — KHÔNG hard-code. Paywall dựa vào field này.
  /// Ngôn ngữ ĐANG HỌC của bài — quyết định cách chuẩn hoá đáp án tự gõ:
  /// ngôn ngữ không dùng dấu cách giữa từ thì xoá sạch khoảng trắng khi so
  /// khớp (xem kNoWordSpacingLanguages).
  final String? languageCode;

  final String plan;
  final bool graded;

  bool get isPlusOnly => plan == 'plus';

  static UnitComprehensiveTest? tryFromMap(Map<String, dynamic>? value) {
    if (value == null || value.isEmpty) return null;
    final questions = (value['questions'] as List? ?? const [])
        .whereType<Map>()
        .map((e) =>
            UnitComprehensiveQuestion.fromMap(Map<String, dynamic>.from(e)))
        .toList(growable: false)
      ..sort((a, b) => a.order.compareTo(b.order));
    if (questions.isEmpty) return null;
    return UnitComprehensiveTest(
      id: value['id'] as String? ?? '',
      unitId: value['unitId'] as String? ?? '',
      title: value['title'] as String? ?? '',
      description: value['description'] as String?,
      estimatedMinutes: value['estimatedMinutes'] as String?,
      totalQuestions:
          (value['totalQuestions'] as num?)?.toInt() ?? questions.length,
      questions: questions,
      languageCode: value['languageCode'] as String?,
      plan: value['plan'] as String? ?? 'plus',
      graded: value['graded'] as bool? ?? true,
    );
  }
}
