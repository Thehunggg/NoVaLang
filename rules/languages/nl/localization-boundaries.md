---
id: nl/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [nl/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Dutch Localization Boundaries

Vai trò của nl trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = nl`: câu/từ đích, phát âm, chính tả Hà Lan.
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch nl↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/nl/` (INV-1).

## Biến thể nl-NL vs nl-BE (Flemish)

Baseline nl-NL. Khác biệt nếu sau thêm Flemish — tách rõ, không trộn:

| nl-NL | nl-BE (Flemish) |
|---|---|
| je/jij | gij/ge (khẩu ngữ) |
| g cứng [x] | g mềm hơn |
| jij/u | u dùng rộng hơn |
| một số từ vựng | (patat/friet...) |

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn `.` (1.234,56). Tiền: € (Euro). Ngày:
dd-mm-jjjj. Quy ước hiển thị theo locale nl-NL.
