---
id: sv/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [sv/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Swedish Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng. **KHÁC de** — không hoa mọi danh từ.

- Tháng / thứ trong tuần: **viết thường** (`januari`, `måndag`) — giống es/it.
- Tên ngôn ngữ / quốc tịch: **viết thường** (`svenska`, `engelska`).

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.00%** trên 11734 câu
— cực sạch, casing có bằng chứng corpus mạnh.

## Dấu = chữ (å ä ö)

`å ä ö` là chữ cái, không phải accent — bỏ/thay = sai chính tả + đổi từ (`mål`/
`mal`). Xem `answer_acceptance_sv` (giống bản chất pl: dấu là chữ → tiền lệ D-64).

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `"…"` (cao-cao, giống en) hoặc `»…»`. KHÔNG có
dấu lật ngược như es. Dấu phẩy ít bắt buộc hơn de (không bắt buộc trước `att/som`).
