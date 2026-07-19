---
id: pl/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [pl/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Polish Localization Boundaries

Vai trò của pl trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = pl`: câu/từ đích, phát âm, chính tả Ba Lan (đầy đủ dấu).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch pl↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/pl/` (INV-1).

## Dấu là bắt buộc trong dữ liệu

Văn bản đích PHẢI giữ đầy đủ dấu Ba Lan (ą/ć/ę/ł/ń/ó/ś/ź/ż) — vì là chữ cái,
bỏ dấu đọc/nghĩa sai. Chỉ tầng CHẤM ĐIỂM mới nới lỏng (xem `answer_acceptance_pl`),
không phải tầng lưu dữ liệu.

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn dấu cách (1 234,56). Tiền: zł (Złoty).
Ngày: dd.mm.rrrr. Quy ước hiển thị theo locale pl-PL.
