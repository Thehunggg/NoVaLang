---
id: de/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# German writing system

## Tổng quan

Chữ Latin tiêu chuẩn + 3 nguyên âm biến âm (Umlaut) `ä ö ü` + `ß` (Eszett /
scharfes S, "s sắc"). `ä/ö/ü` là nguyên âm biến âm, KHÔNG phải chữ cái riêng
trong bảng chữ cái (xếp cùng a/o/u khi sắp thứ tự). `ß` chỉ là chữ thường —
khi viết hoa toàn bộ thay bằng `SS` (chữ hoa `ẞ` mới chuẩn hoá 2017 nhưng
hiếm dùng).

## Hướng viết

LTR ngang, chuẩn Latin, không tranh cãi.

## Chữ hoa/thường — đặc trưng nổi bật

Tiếng Đức viết hoa chữ đầu của **mọi danh từ** (cả danh từ chung lẫn riêng):
`das Haus`, `die Katze`, `der Tisch`. Đây là điểm khác biệt lớn nhất so với
en/es (chỉ hoa danh từ riêng). Cộng: đại từ trang trọng `Sie/Ihnen/Ihr`
viết hoa. Xem `orthography.md`.

## Charset

Đã import CLDR Bước 1 (`orthography.data.json`) — xác nhận `ä ö ü ß`.

## Provenance

`S-TRAINED-KNOWLEDGE` + `CLDR` (dataset, high).
