import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';

/// Panel phản hồi đúng/sai DÙNG CHUNG cho mọi màn làm bài.
///
/// Tách ra từ `_Feedback` của `five_card_exercise_flow.dart`: phần hình thức
/// (khung xanh khi đúng, dấu ✕ đỏ + thẻ con khi sai) vốn không phụ thuộc loại
/// bài, nhưng lại nằm private và bám vào `PracticeExercise`, nên màn bài tổng
/// hợp không import được và đã phải tự dựng — dẫn tới hai bài trông khác nhau.
///
/// Widget này chỉ nhận CHUỖI ĐÃ DỰNG SẴN: nó không biết gì về mô hình bài tập
/// hay bài tổng hợp, nên cả hai bên dùng chung mà không bên nào phải lộ kiểu dữ
/// liệu của mình. Mọi nhãn cố định đi qua [L10n].
class ExerciseFeedbackPanel extends StatelessWidget {
  const ExerciseFeedbackPanel({
    super.key,
    required this.correct,
    required this.uiLanguageCode,
    this.correctMessage = '',
    this.correctAnswer = '',
    this.explanation = '',
  });

  /// Câu này người học làm đúng chưa.
  final bool correct;

  /// Chrome của app — nhãn "Đúng/Sai", "Đáp án đúng", "Giải thích".
  final String uiLanguageCode;

  /// Lời khen thêm khi đúng (tuỳ chọn).
  final String correctMessage;

  /// Đáp án đúng, hiện khi sai.
  final String correctAnswer;

  /// Giải thích, hiện khi sai.
  final String explanation;

  @override
  Widget build(BuildContext context) {
    if (correct) {
      return Padding(
        padding: const EdgeInsets.only(top: 16),
        child: DecoratedBox(
          decoration: const BoxDecoration(
            color: Color(0x1F40E0D0),
            borderRadius: BorderRadius.all(Radius.circular(14)),
            border: Border.fromBorderSide(BorderSide(color: Color(0x805EEAD4))),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              [
                '✓ ${L10n.text('correctStatus', uiLanguageCode)}',
                if (correctMessage.isNotEmpty) correctMessage,
              ].join('\n\n'),
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
          ),
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '✕ ${L10n.text('incorrectStatus', uiLanguageCode)}',
            style: const TextStyle(
              color: Colors.redAccent,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 10),
          if (correctAnswer.isNotEmpty)
            ExerciseFeedbackSubCard(
              title: L10n.text('exerciseCorrectAnswer', uiLanguageCode),
              text: correctAnswer,
            ),
          if (explanation.isNotEmpty)
            ExerciseFeedbackSubCard(
              title: '💡 ${L10n.text('exerciseExplanation', uiLanguageCode)}',
              text: explanation,
            ),
        ],
      ),
    );
  }
}

/// Một thẻ con trong panel phản hồi (đáp án đúng / giải thích).
class ExerciseFeedbackSubCard extends StatelessWidget {
  const ExerciseFeedbackSubCard({
    super.key,
    required this.title,
    required this.text,
  });

  final String title;
  final String text;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.04),
        borderRadius: const BorderRadius.all(Radius.circular(14)),
        border: Border.fromBorderSide(
          BorderSide(color: Colors.white.withValues(alpha: 0.08)),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 6),
            Text(text, style: const TextStyle(height: 1.4)),
          ],
        ),
      ),
    ),
  );
}
