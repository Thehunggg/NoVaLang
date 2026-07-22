---
id: id/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Indonesian Localization Boundaries — Ranh giới bản địa hoá

- **learningLanguageCode = id**: sở hữu từ/câu đích, phát âm.
- **nativeLanguageCode**: nghĩa, dịch, giải thích ngữ pháp, gợi ý, phản hồi.
- **uiLanguageCode**: nhãn giao diện.

## Định dạng vùng (id-ID, CLDR)

- Số thập phân: dấu **phẩy** `,`; ngăn nghìn: dấu chấm `.`.
- Tiền tệ: rupiah `Rp` (đứng trước số: Rp10.000).
- Ngày: `dd/MM/yyyy`. Tuần bắt đầu **Chủ nhật** hoặc thứ Hai (theo ngữ cảnh).

## Không thuộc file này

Cạm bẫy dịch id↔ngôn ngữ cụ thể (đặc biệt id↔ms — Malay rất gần) thuộc
`rules/pairs/` (INV-1).
