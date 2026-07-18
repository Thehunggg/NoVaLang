---
id: es/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Spanish writing system

## Tổng quan

Chữ Latin tiêu chuẩn + `ñ` (chữ cái riêng biệt trong bảng chữ cái tiếng Tây
Ban Nha, không phải "n có dấu") + nguyên âm mang dấu sắc (á é í ó ú, đánh
dấu trọng âm — xem `pronunciation.md`) + `ü` (diaeresis, chỉ xuất hiện sau
`g` trong `güe`/`güi` để báo hiệu `u` được phát âm, vd `pingüino`).

## Hướng viết

LTR ngang, chuẩn Latin, không tranh cãi.

## Chữ hoa/thường

Quy tắc cơ bản giống tiếng Anh (đầu câu, danh từ riêng) nhưng có khác biệt
quan trọng: tháng/thứ trong tuần/quốc tịch/tên ngôn ngữ **không** viết hoa
(`lunes`, `enero`, `español`) — xem `orthography.md`.

## Charset

Đã import CLDR Bước 1 (`orthography.data.json`).

## Provenance

`S-TRAINED-KNOWLEDGE` + `CLDR` (dataset, high).
