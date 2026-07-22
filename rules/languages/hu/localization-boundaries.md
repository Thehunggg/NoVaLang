---
id: hu/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [hu/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Hungarian Localization Boundaries

Vai trò của hu trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = hu`: câu/từ đích, phát âm, chính tả Hungary (đầy đủ
  á é í ó ö ő ú ü ű + digraph).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch hu↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/hu/` (INV-1).

## Dấu bắt buộc + audio

Văn bản đích PHẢI giữ á é í ó ö ő ú ü ű (là chữ, ngắn/dài đổi nghĩa). Tầng chấm
điểm: xem `answer_acceptance_hu` (thiếu dấu = sai theo pl D-64).

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn ` ` (khoảng trắng, 1 234,56). Tiền: Ft
(forint, HUF). Ngày: yyyy. mm. dd. (thứ tự LỚN→NHỎ, đặc trưng Hungary). Quy ước
hiển thị theo locale hu-HU.
