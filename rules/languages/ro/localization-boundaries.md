---
id: ro/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ro/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Romanian Localization Boundaries

Vai trò của ro trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = ro`: câu/từ đích, phát âm, chính tả Rumani (đầy đủ
  ă/â/î/ș/ț, ș/ț comma-below).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch ro↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/ro/` (INV-1).

## Dấu bắt buộc + comma-below

Văn bản đích PHẢI giữ đầy đủ 5 dấu, và ș/ț dùng **comma-below** (U+0219/U+021B),
KHÔNG cedilla. Chỉ tầng chấm điểm mới bàn (xem `answer_acceptance_ro` — đề xuất
KHÔNG chấp nhận thiếu, tiền lệ pl D-64).

## Biến thể

Baseline ro-RO. Tiếng Moldova (limba moldovenească) = cùng ngôn ngữ, nay dùng
Latin — không cần biến thể riêng.

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn `.` (1.234,56). Tiền: lei/RON. Ngày:
zz.ll.aaaa. Quy ước hiển thị theo locale ro-RO.
