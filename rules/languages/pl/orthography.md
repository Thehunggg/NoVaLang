---
id: pl/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [pl/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Polish Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng. **Viết thường (trừ đầu câu)** — giống ru/es/it:

- Tháng: `styczeń, luty, marzec, ...`
- Thứ trong tuần: `poniedziałek, wtorek, ...`
- Tên ngôn ngữ + tính từ ngôn ngữ: `polski`, `język polski` (nhưng dân tộc
  danh từ hoa: `Polak`).

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.02%** trên 35926 câu
(vi phạm là họ người: Sobota/Piątek/Marzec + đầu câu). Casing có bằng chứng
corpus mạnh.

`Pan/Pani` (đại từ lịch sự) viết hoa (danh từ, quy ước).

## Dấu = chữ (xem `diacritics_orthography`)

ą ć ę ł ń ó ś ź ż là chữ cái, không phải accent. Xem `answer_acceptance_pl`
(khác bản chất với chính sách dấu của es/it/pt/nl).

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `„…"` (thấp-cao, giống de). Dấu phẩy dùng
nhiều & bắt buộc trước mệnh đề phụ (że, który, ponieważ). KHÔNG có dấu lật
ngược như es.
