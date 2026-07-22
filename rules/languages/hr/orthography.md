---
id: hr/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [hr/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Croatian Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng.

- Tháng / thứ trong tuần: **viết thường** (`siječanj`, `ponedjeljak`) — chuẩn
  Slav.
- Tên ngôn ngữ / quốc tịch (tính từ): **viết thường** (`hrvatski`, `engleski`).

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.00%** trên 9010 câu
thật. Casing có bằng chứng corpus rất mạnh.

## Dấu = chữ (č ć š ž đ + dž lj nj)

`č ć š ž đ` là **chữ cái riêng** (đổi âm/nghĩa thật): č[t͡ʃ]≠ć[t͡ɕ]≠c[t͡s];
š≠s; ž≠z; đ≠d. `dž lj nj` là digraph (một chữ). [corpus: č 57%, ć 47%, š 54%,
ž 42%, đ 21% câu — cực thường xuyên.] Bản chất **giống pl** (chữ có dấu là chữ
riêng). Xem `answer_acceptance_hr` (tiền lệ pl D-64: thiếu = sai).

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `„…”` (dưới-trên, kiểu Trung Âu) / `»…«`.
KHÔNG có dấu lật ngược như es. Dấu phẩy thập phân, chấm phân nhóm nghìn
(1.234,56).

## Không mạo từ

Croatia **không có mạo từ** — chức năng xác định/không xác định do ngữ cảnh +
cách + trật tự. Xem `grammar-and-usage.md`.
