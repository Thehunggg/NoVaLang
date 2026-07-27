// Ràng buộc ĐỊNH LƯỢNG của định dạng five_cards — MỘT CHỖ DUY NHẤT.
//
// Vì sao file này tồn tại (owner chốt 2026-07-27, §D6c của
// LESSON_AUTHORING_STANDARD.md):
//
// ADR-019 ghi rõ `validateFiveCardsStructure` được TÁCH RA TỪ bộ kiểm chỉ dành
// cho Golden L1, và chỉ 2 phép kiểm được tổng quát hoá. Nên mọi con số còn lại,
// THEO CẤU TẠO, là hình dạng của Golden chứ không phải luật sản phẩm. Hai ca
// "đúng 8 thẻ từ vựng → 6–15" và "hội thoại đúng 4–6 lượt → 2–8" chỉ là hai
// thành viên đã lộ của lớp lỗi đó. Lượt này bỏ HẾT phần còn lại.
//
// LUẬT CHUNG: mọi ràng buộc định lượng phải là KHOẢNG, kèm LÝ DO + CĂN CỨ ngay
// tại chỗ định nghĩa. Chỉ được để số cố định khi có lý do SẢN PHẨM ghi rõ.
//
// Thứ tự ưu tiên khi đặt khoảng:
//   1. ĐO nguồn thật. Đo được thì đo, ghi rõ đo cái gì, bao nhiêu mẫu.
//   2. Không đo được → khoảng RỘNG, chỉ chặn cái THẬT SỰ hỏng (rỗng, hoặc
//      nhiều tới mức vỡ màn). Ghi rõ "chưa có căn cứ đo".
//   3. TUYỆT ĐỐI KHÔNG chép số từ Golden rồi gọi đó là khoảng.

/** Khoảng đóng [min, max]. `why` đi kèm để người sửa sau không phải đoán. */
const range = (min, max, why) => ({ min, max, why });

export const FIVE_CARDS_RANGES = {
  // ── ĐO ĐƯỢC TỪ NGUỒN ────────────────────────────────────────────────
  vocabularyCards: range(6, 15,
    'ADR-019 amendment 2026-07-19 — owner chốt sau khi xác minh "đúng 8" là số của Golden, không phải luật Format 2.0.'),

  dialogueGroups: range(1, 8,
    'ĐO 264 khối kịch bản hội thoại trong 4 tập Irodori (A1→B1): ít nhất 1, trung vị 4, nhiều nhất 8. Số cũ "đúng 3" là số của Golden.'),

  dialogueLinesPerGroup: range(2, 8,
    'ĐO 634 đoạn hội thoại Irodori A1→B1: trung vị 2 lượt, p95 6, 99% ≤ 8. Sàn 2 = ngưỡng thật của một trao đổi (một người nói, một người đáp). Owner chốt 2026-07-27, §D3.'),

  grammarPatterns: range(1, 8,
    'ĐO 71 bài Irodori (4 tập): ít nhất 1 mẫu, trung vị 5, nhiều nhất 8. Số cũ "đúng 3" là số của Golden. Một bài chỉ dạy 1–2 mẫu là chuyện có thật trong giáo trình.'),

  // ── CHƯA CÓ CĂN CỨ ĐO → KHOẢNG RỘNG ────────────────────────────────
  // Bốn nhóm dưới là ĐỊNH DẠNG BÀI TẬP RIÊNG của NovaLang — không giáo trình
  // nào có để mà đo. Đã kiểm renderer Flutter: hoàn toàn generic, không khoá
  // cứng số nào (`exercise.pairs.length`, `for (final option in item.options)`),
  // nên giới hạn duy nhất là sư phạm và bề ngang màn hình.
  matchingPairs: range(3, 8,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. Dưới 3 thì ghép đôi thành mẹo loại trừ tầm thường; trên 8 thì một màn hẹp không chứa nổi. UI không khoá số.'),

  checkpointSubQuestions: range(3, 10,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. Dưới 3 thì không còn là điểm kiểm nhiều câu; trên 10 thì thành một bài riêng nằm giữa bài.'),

  optionsPerQuestion: range(2, 6,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. Dưới 2 thì không có gì để chọn; trên 6 thì vỡ màn hẹp.'),

  chatMessages: range(2, 12,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. Sàn 2 theo cùng lý lẽ với §D3 (một lượt hỏi, một lượt đáp). Số cũ "đúng 6" là số của Golden — u2-l1 đã phải ĐỘN từ 4 lên 6 cho vừa, đúng dấu hiệu nhận biết.'),

  chatSlots: range(1, 4,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. Dưới 1 thì không có ô nào để điền; trên 4 thì một đoạn chat ngắn bị khoét quá nhiều.'),

  advancedOrderingSlots: range(2, 10,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. Dưới 2 thì không còn là "sắp xếp"; trên 10 thì một câu quá dài cho thao tác kéo thả. Số cũ "đúng 6" là số của Golden — u2-l1 đã phải GHÉP HAI CÂU RỜI cho đủ ô.'),

  sceneDividers: range(0, 5,
    'CHƯA CÓ CĂN CỨ ĐO — khoảng rộng. 0 hợp lệ: một cảnh liền mạch không cần dải nào. Số cũ "đúng 1" là số của Golden — nó bắt u2-l1 phải VỨT BỎ một trong ba đoạn nguyên văn của nguồn.'),
};

/** true nếu `n` nằm trong khoảng. */
export const inRange = (n, r) => Number.isInteger(n) && n >= r.min && n <= r.max;

/** Mô tả khoảng để ghép vào thông báo lỗi. */
export const rangeText = (r) => (r.min === r.max ? `${r.min}` : `${r.min}–${r.max}`);
