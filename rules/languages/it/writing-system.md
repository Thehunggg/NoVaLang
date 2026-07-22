---
id: it/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Italian writing system

## Tổng quan

Chữ Latin — bảng chữ cái gốc 21 chữ (`j k w x y` chỉ dùng trong từ mượn) +
nguyên âm mang dấu `à è é ì ò ù`. Dấu huyền (grave) `à è ì ò ù` phổ biến; dấu
sắc (acute) chủ yếu ở `é ó` cuối từ (`perché`, `poté`).

## Hướng viết

LTR ngang, chuẩn Latin.

## Chữ hoa/thường

Giống en/es (đầu câu + danh từ riêng), KHÁC de (tiếng Ý KHÔNG viết hoa mọi
danh từ). Tháng/thứ/quốc tịch/tên ngôn ngữ viết thường (`gennaio`, `lunedì`,
`italiano`) — xem `orthography.md`.

## Charset

Đã import CLDR Bước 1 (`orthography.data.json`) — xác nhận `à è é ì ò ù`.

## Provenance

`S-TRAINED-KNOWLEDGE` + `CLDR` (dataset, high).
