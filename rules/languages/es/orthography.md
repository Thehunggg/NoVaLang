---
id: es/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [es/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Spanish orthography

## Dấu câu — đặc trưng nổi tiếng

`¿` `¡` mở đầu câu hỏi/câu cảm thán (kèm `?`/`!` chuẩn ở cuối):
`¿Cómo estás?`, `¡Qué bien!`. Xác nhận sạch 100% trên corpus thật (Bước 3,
0/17013 vi phạm cho check liên quan — xem `pipeline-log.md`).

Dấu ngoặc kép: RAE khuyến nghị `« »` (comillas angulares) làm chuẩn hàn lâm,
nhưng `" "` phổ biến trong xuất bản thực tế hiện đại — app dùng `" "` làm
mặc định thực dụng, **chưa cross-check kỹ điểm này**.

## Chữ hoa/thường — khác tiếng Anh

Tháng, thứ trong tuần, quốc tịch, tên ngôn ngữ viết **thường** (trừ đầu
câu): `enero`, `lunes`, `español` — khác `January`/`Monday`/`Spanish` viết
hoa trong tiếng Anh. Xác nhận trên corpus thật: 102/17013 (0.60%) câu viết
hoa tháng/thứ — dưới ngưỡng "rule sai", 102 câu là biến thể phong cách thật
(tiêu đề, ngày lễ trang trọng), không phải bằng chứng quy tắc sai.

## Reading aid — not-applicable

Không giống ja/ko (cần furigana/romanization reading-aid), chữ Latin của
tiếng Tây Ban Nha có chính tả minh bạch (gần như 1 chữ-1 âm) — không cần lớp
annotation-cách-đọc-riêng. `reading_aid_policy` đánh dấu `not-applicable`
trong `coverage.json`.

## Provenance

`S-TRAINED-KNOWLEDGE`, xác nhận bằng corpus check thật (Bước 3).

## Chưa giải quyết

- Chuẩn dấu ngoặc kép (`« »` vs `" "`) chưa cross-check kỹ.
