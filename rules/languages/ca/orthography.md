---
id: ca/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [ca/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Catalan Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng.

- Tháng / thứ trong tuần: **viết thường** (`gener`, `dilluns`) — giống es/fr/it.
- Tên ngôn ngữ / quốc tịch: **viết thường** (`català`, `anglès`).

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.05–0.09%** trên
16678 câu thật (vi phạm là tên riêng/festival: "Saló d'Octubre"). Casing có
bằng chứng corpus mạnh.

## Dấu — HAI loại khác bản chất

1. **ç + l·l = phân biệt âm/nghĩa** (loại 'distinct'):
   - `ç` — bỏ = đổi âm (caça 'săn' → caca).
   - `l·l` (ela geminada) — khác `ll`: *cel·la* vs *cella*.
2. **à è é í ï ò ó ú ü = dấu trọng âm** (loại 'light diacritic', như es):
   - Vị trí trọng âm + mở/đóng (`è` mở / `é` đóng; `ò` mở / `ó` đóng).
   - Hiatus/phân âm: `ï` `ü` (raïm, qüestió).

→ Chính sách chấm KHÁC nhau cho 2 loại — xem `answer_acceptance_ca` (ç/l·l theo
pl D-64 = sai; dấu trọng âm theo es D-74 = cảnh báo nhẹ).

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `«…»` (cometes baixes, chuẩn Catalan) / `"…"`.
**KHÁC es: KHÔNG dùng dấu lật ngược `¿ ¡`** (chỉ ? ! cuối câu). [corpus: ¿¡
0.84%, nhiễu vay tiếng TBN.]

## Apostrophe (dấu lược)

Rất phổ biến: `l'home`, `d'un`, `s'ha`, `n'hi`. Rút gọn `al`/`del`/`pel`. Xem
`grammar-and-usage.md`.
