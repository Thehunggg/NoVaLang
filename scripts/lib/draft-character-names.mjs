// Mẫu tên nháp còn sót trong nội dung five_cards — MỘT nguồn duy nhất, dùng
// chung giữa validate-curriculum.mjs và smoke-curriculum-flow.mjs (trước
// 2026-07-31 mỗi file tự viết một bản substring riêng — bản ở
// smoke-curriculum-flow.mjs không được vá cùng lúc với validate-curriculum.mjs,
// lộ ra khi bài m02-u1-l1 dùng lại chữ タイミング hợp lệ: validate PASS nhưng
// smoke vẫn FAIL vì bản thứ hai còn khớp kiểu substring cũ). Đặt ở lib/ trung
// lập, không phải trong validate-curriculum.mjs, vì file đó gọi main() vô
// điều kiện ở cuối (không có entry-point guard) — import thẳng từ đó sẽ tự
// chạy toàn bộ validator như tác dụng phụ.
//
// Khớp TÊN TRỌN, không phải substring: "ミン" chỉ bắt khi KHÔNG nằm trong
// một chuỗi KATAKANA dài hơn (ranh giới theo SCRIPT, vì katakana không có
// dấu cách giữa các mảnh — タイミング/ミント phải PASS, còn ミンさん vẫn phải
// FAIL vì さん là hiragana, khác script). Minh/Hưng/Linh dùng ranh giới CHỮ
// CÁI chung (`\p{L}`) vì đây là tên Latin/Việt, luôn có khoảng trắng phân
// cách trong văn bản thật — không có kiểu lỗi "dính liền" như katakana.
const DRAFT_NAME_KATAKANA_RANGE = "ァ-ヶー";
export const DRAFT_CHARACTER_NAME_RE = new RegExp(
  `(?<![${DRAFT_NAME_KATAKANA_RANGE}])ミン(?![${DRAFT_NAME_KATAKANA_RANGE}])` +
    `|(?<!\\p{L})Minh(?!\\p{L})` +
    `|(?<!\\p{L})Hưng(?!\\p{L})` +
    `|(?<!\\p{L})Linh(?!\\p{L})`,
  "u",
);
