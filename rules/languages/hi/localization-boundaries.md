---
id: hi/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Hindi Localization Boundaries — Ranh giới bản địa hoá

- **learningLanguageCode = hi**: từ/câu đích, phát âm, chữ Devanagari.
- **nativeLanguageCode**: nghĩa, dịch, giải thích, gợi ý, phản hồi.
- **uiLanguageCode**: nhãn giao diện.

## Định dạng vùng (hi-IN, CLDR)

- Số: hệ **lakh/crore** (1,00,000 = một lakh) — nhóm khác phương Tây.
- Tiền tệ: rupee `₹` (đứng trước số).
- Ngày: `dd/MM/yyyy`. Chữ số Devanagari ०-९ hoặc Latin.

## Không thuộc file này

Cạm bẫy dịch hi↔ngôn ngữ cụ thể (đặc biệt hi↔ur — Hindi/Urdu gần về khẩu ngữ,
khác chữ viết) thuộc `rules/pairs/` (INV-1).
