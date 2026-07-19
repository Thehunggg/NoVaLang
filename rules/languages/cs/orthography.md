---
id: cs/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [cs/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Czech Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng. **Viết thường (trừ đầu câu)** — giống ru/pl:

- Tháng: `leden, únor, březen, ...`
- Thứ trong tuần: `pondělí, úterý, ...`
- Ngôn ngữ / tính từ: `čeština`, `česky`, `český`.

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.01%** trên 34869 câu
(vi phạm là họ người "Sobota" + đầu câu "Květen"). Casing có bằng chứng corpus.

`Vy/Vás` (đại từ lịch sự) viết hoa trong thư từ.

## Dấu = chữ

Háček (č/š/ž/ř/ě/ň/ď/ť) đổi âm; acute/kroužek (á/é/í/ó/ú/ů/ý) = độ dài. Bỏ = sai
+ đổi nghĩa (byt/být). Xem `answer_acceptance_cs` (giống bản chất pl → tiền lệ D-64).

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `„…"` (thấp-cao, giống de/pl). Dấu phẩy bắt
buộc trước mệnh đề phụ (že, který, protože). KHÔNG có dấu lật ngược như es.
