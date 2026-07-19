---
id: uk/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Ukrainian Localization Boundaries — Ranh giới bản địa hoá

- **learningLanguageCode = uk**: sở hữu từ/câu đích, phát âm, chữ Kirin.
- **nativeLanguageCode**: nghĩa, dịch, giải thích ngữ pháp, gợi ý, phản hồi —
  theo ngôn ngữ mẹ đẻ người học. KHÔNG rò chữ Kirin vào field hỗ trợ.
- **uiLanguageCode**: nhãn giao diện.

## Định dạng vùng (uk-UA, CLDR)

- Số thập phân: dấu **phẩy** `,`; ngăn nghìn: khoảng trắng (1 000).
- Tiền tệ: hryvnia `₴` (đứng sau số).
- Ngày: `dd.MM.yyyy`. Tuần bắt đầu **thứ Hai**.
- Ngoặc kép «...».

## Không thuộc file này

Cạm bẫy dịch uk↔ngôn ngữ cụ thể (đặc biệt uk↔ru — русизми) thuộc `rules/pairs/`,
không thuộc `languages/uk/` (INV-1).
