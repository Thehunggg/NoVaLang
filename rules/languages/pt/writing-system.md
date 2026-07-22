---
id: pt/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Portuguese Writing System

Baseline: **pt-BR** (tiếng Bồ Đào Nha Brazil). Xem `review-checklist.md` D-pt-01.

## Bảng chữ

Chữ Latin, 26 chữ cái. `k`, `w`, `y` trước Acordo Ortográfico 1990 chỉ dùng
trong từ mượn/tên riêng; sau Acordo (thực thi ~2009 ở Brazil) chính thức nằm
trong bảng chữ.

## Ký tự có dấu (đã xác nhận CLDR — `orthography.data.json`)

- Dấu sắc (agudo): `á é í ó ú` — trọng âm + nguyên âm mở.
- Dấu mũ (circunflexo): `â ê ô` — trọng âm + nguyên âm đóng.
- Dấu ngã (til): `ã õ` — **nguyên âm mũi**, đặc trưng tiếng Bồ.
- Dấu huyền (grave): `à` — CHỈ dùng cho crase (a + a = à/às).
- Cedilha: `ç` — [s] trước a/o/u (`faça`, `moço`, `açúcar`).

## Hướng viết

LTR ngang, chuẩn Latin. `stroke_order`: not-applicable.

## Điểm học viên hay nhầm

- `ç` là chữ thật, không thay bằng `c` (`faça` ≠ `faca` 'con dao').
- Dấu ngã `ã/õ` báo nguyên âm mũi, không phải "a/o có dấu trang trí".
