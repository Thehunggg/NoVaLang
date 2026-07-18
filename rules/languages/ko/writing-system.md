---
id: ko/writing-system
version: 0.1.0
status: DRAFT
tier: [t1, t3]
role: [both]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Korean writing system — Hangul

## Tổng quan

Tiếng Hàn viết bằng **Hangul (한글)**, một featural alphabet (chữ cái mô
phỏng hình dạng bộ máy phát âm) do vua Sejong công bố năm 1446. Đây là hệ
chữ **duy nhất** app dạy — Hanja (chữ Hán mượn, còn dùng hạn chế trong báo
chí/học thuật/tên riêng trang trọng) **ngoài scope**, giống cách ja giới hạn
phạm vi dạy jōyō kanji.

## Cấu trúc khối âm tiết

Mỗi khối âm tiết (một "chữ" nhìn thấy) ghép từ 2-3 thành phần theo thứ tự
cố định:

1. **초성** (chosung, phụ âm đầu) — bắt buộc; nếu âm tiết không có phụ âm
   đầu thật, dùng ㅇ câm làm placeholder.
2. **중성** (jungsung, nguyên âm) — bắt buộc.
3. **종성** (jongsung, phụ âm cuối / patchim) — tuỳ chọn.

Ví dụ: 한 = ㅎ(초성) + ㅏ(중성) + ㄴ(종성). 어 = ㅇ(초성 câm) + ㅓ(중성),
không có 종성.

Unicode mã hoá mỗi khối theo công thức cố định
`U+AC00 + (초성_index × 21 + 중성_index) × 28 + 종성_index`, nên việc
tách/ghép khối là xác định 100% bằng máy — không phải suy đoán ngôn ngữ học.

## Hướng viết

Ngang, trái sang phải (LTR) là chuẩn hiện đại — app chỉ dạy hướng này.
Viết dọc lịch sử (phải sang trái, từng cột) tồn tại nhưng ngoài scope, cùng
quyết định đã áp cho ja (`OUT_OF_SCOPE`).

## Chữ hoa/thường

Không áp dụng — Hangul không có khái niệm hoa/thường.

## Charset

Đã import CLDR Bước 1 (`orthography.data.json`): toàn bộ khối âm tiết tổ hợp
Unicode hợp lệ (11172 khối theo chuẩn, CLDR liệt kê exemplar characters thực
tế dùng), cộng auxiliary/punctuation/numbers/index. `machine_readable: true`.

## Provenance

- Cấu trúc khối âm tiết + Unicode composition: `S-TRAINED-KNOWLEDGE`
  (sự kiện chuẩn hoá Unicode, không tranh cãi, không cần cross-check ngôn
  ngữ học).
- Charset: `CLDR` (dataset, confidence high).

## Chưa giải quyết

- Hanja (chữ Hán mượn) hoàn toàn ngoài scope — không có kế hoạch dạy, cần
  quyết định owner riêng nếu muốn đưa vào tương lai.
