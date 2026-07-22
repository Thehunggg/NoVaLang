---
id: ro/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [ro/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Romanian Orthography

## Viết hoa

Hoa đầu câu + danh từ riêng. **Viết thường (trừ đầu câu)** — giống es/it:

- Tháng: `ianuarie, februarie, ...`
- Thứ trong tuần: `luni, marți, ...`
- Ngôn ngữ / quốc tịch: `română`, `român`.

→ corpus-check Bước 3: `month-weekday-not-capitalized` **0.08%** trên 33645 câu
(vi phạm là tên riêng "Lunii Ianuarie", ngày tháng trang trọng, thơ). Casing có
bằng chứng corpus.

## â vs î (cùng âm [ɨ]) — quy tắc Viện Hàn lâm 1993

- `î` ở **đầu/cuối** từ + phái sinh: *început, a coborî, înainte, întreba*.
- `â` ở **giữa** từ: *când, român, mâine, pâine*.

(Trước 1993 có quy ước khác; chuẩn hiện đại theo 1993.) Xem D-ro-02.

## Dấu = chữ

5 dấu (ă/â/î/ș/ț) là chữ, bỏ = sai + đổi âm/nghĩa. ș/ț **comma-below**, không
cedilla. Xem `answer_acceptance_ro` (tiền lệ pl D-64).

## Dấu câu

Chuẩn Latin `. , ? !`. Ngoặc kép `„…"` / `«…»`. KHÔNG có dấu lật ngược như es.
