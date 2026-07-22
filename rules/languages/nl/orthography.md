---
id: nl/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [nl/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Dutch Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng. **KHÁC de** — không hoa mọi danh từ.

- Tháng / thứ trong tuần: **viết thường** (`januari`, `maandag`) — giống es/it.
- **Tên ngôn ngữ + quốc tịch: VIẾT HOA** (`Nederlands`, `het Engels`, `een
  Nederlandse man`) — KHÁC es/it/pt, điểm riêng Hà Lan.
- Digraph `IJ` đầu từ: hoa cả hai (`IJsland`).

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.09%** trên 30723 câu
(vi phạm là tên riêng ngày lễ: "Goede Vrijdag" Thứ Sáu Tuần Thánh, "Zwarte
Vrijdag" Black Friday — viết hoa đúng). Casing có bằng chứng corpus mạnh.

## Chính tả nguyên âm dài/ngắn (đặc trưng)

Nguyên âm dài/ngắn đánh dấu qua **âm tiết mở/đóng + nhân đôi**:
`man` [mɑn] / `maan` [maːn]; `man-nen` [mɑnə] (ngắn, nhân đôi phụ âm) /
`ma-nen` [maːnə] (dài, âm tiết mở). Xem `vowel_length_spelling`.

## Dấu diacritic

Trema tách âm tiết (`geïnteresseerd`); dấu sắc nhấn/phân biệt (`één` số / `een`
mạo từ). Xem `diacritics_orthography` + `answer_acceptance_nl`.

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `„…"` (truyền thống) / `"…"` (hiện đại).
KHÔNG có dấu lật ngược như es.
