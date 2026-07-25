/**
 * Helper dựng nội dung bài tổng hợp cuối Unit.
 *
 * TÁCH RIÊNG khỏi `unit-comprehensive-test.mjs` vì file nguồn đã duyệt cần
 * các helper này, còn registry trong file kia lại import ngược file nguồn —
 * để chung sẽ thành vòng lặp import ESM và helper chưa kịp khởi tạo.
 */

/* ── Helper cho người viết file nguồn ĐÃ DUYỆT ───────────────────────────── */

/** Một đoạn văn bản hiển thị (không phải ô trống). */
export const seg = (displayText, canonicalText, audioText) => ({
  displayText,
  ...(canonicalText === undefined ? {} : { canonicalText }),
  ...(audioText === undefined ? {} : { audioText }),
});

/** Một đoạn LÀ Ô TRỐNG, trỏ tới `blanks[].id`. */
export const blankSeg = (blankId) => ({ blankId });

/**
 * Một ô trống. `acceptedAnswers` phải liệt kê MỌI dạng viết hợp lệ (chữ đích,
 * kana thuần, dạng kèm hỗ trợ đọc…) và phải chứa cả `canonicalAnswer` —
 * §D-Cloze. Chỉ dùng để chấm ở câu `typed_blank`; ở câu chọn phương án nó
 * vẫn phải đúng để hiển thị khi chữa bài + đọc TTS.
 */
export const blank = (id, { displayAnswer, canonicalAnswer, audioText, acceptedAnswers, hint }) => ({
  id,
  displayAnswer,
  canonicalAnswer,
  audioText,
  acceptedAnswers,
  ...(hint === undefined ? {} : { hint }),
});

/**
 * Một PHƯƠNG ÁN của câu chọn. `answersByBlankId` phải phủ ĐÚNG và ĐỦ mọi ô
 * của câu — chọn một lần là điền xong cả câu.
 */
export const choiceOption = (id, text, answersByBlankId, { canonicalText, audioText } = {}) => ({
  id,
  text,
  ...(canonicalText === undefined ? {} : { canonicalText }),
  ...(audioText === undefined ? {} : { audioText }),
  answersByBlankId,
});

/** Một lượt nói trong câu hội thoại. */
export const dialogueTurn = (id, speakerId, segments) => ({ id, speakerId, segments });

/** Một mục kiến thức đang ôn — bằng chứng §G7 bằng dữ liệu. */
export const review = (lessonId, kind, ref) => ({ lessonId, kind, ref });
