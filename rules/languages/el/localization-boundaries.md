---
id: el/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Greek Localization Boundaries — Ranh giới bản địa hoá

- **learningLanguageCode = el**: sở hữu từ/câu đích, phát âm, chữ Hy Lạp.
- **nativeLanguageCode**: sở hữu nghĩa, dịch, giải thích ngữ pháp, gợi ý,
  phản hồi — theo ngôn ngữ mẹ đẻ người học. KHÔNG rò chữ Hy Lạp vào field hỗ
  trợ, KHÔNG rò tiếng của native vào text đích.
- **uiLanguageCode**: nhãn giao diện.

## Định dạng vùng (el-GR, từ CLDR)

- Số thập phân: dấu **phẩy** `,` (3,14); ngăn nghìn: dấu chấm `.` (1.000).
- Tiền tệ: Euro `€` (đứng SAU số: `10 €`).
- Ngày: `dd/MM/yyyy`. Tuần bắt đầu **thứ Hai**.
- Dấu câu theo `orthography.md`: dấu hỏi `;`, ano teleia `·`.

## Không thuộc file này

Cạm bẫy dịch giữa el và MỘT ngôn ngữ cụ thể (vd el↔en) thuộc `rules/pairs/`,
không thuộc `languages/el/` (INV-1).
