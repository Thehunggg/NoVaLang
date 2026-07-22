---
id: pt/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [pt/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Portuguese Localization Boundaries

Vai trò của pt trong NovaLang: **learning language** (T1). Chưa dùng làm
`nativeLanguageCode`/`uiLanguageCode` mặc định (không thuộc 60 native, đang là
playable-needs-rule).

## Ranh giới trường

- `learningLanguageCode = pt`: câu/từ đích, phát âm, chính tả tiếng Bồ.
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch pt↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/pt/` (INV-1).

## Biến thể BR vs PT (ảnh hưởng nội dung)

Baseline BR. Khác biệt từ vựng thường gặp — nếu sau này thêm biến thể PT phải
tách rõ, không trộn:

| pt-BR | pt-PT |
|---|---|
| ônibus | autocarro |
| trem | comboio |
| celular | telemóvel |
| café da manhã | pequeno-almoço |
| você (thân mật) | tu (thân mật) |

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn `.` (1.234,56). Tiền: R$ (Real, Brazil).
Ngày: dd/mm/aaaa. Đây là quy ước hiển thị — theo locale pt-BR.
