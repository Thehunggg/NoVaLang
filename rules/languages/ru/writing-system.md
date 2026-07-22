---
id: ru/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Russian Writing System

Baseline: **ru-RU** (tiếng Nga chuẩn). Chữ **Kirin (Cyrillic)**.

## Bảng chữ (33 chữ, xác nhận CLDR)

`а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я`

- **10 nguyên âm**: а е ё и о у ы э ю я (mỗi nguyên âm "cứng" có cặp "mềm":
  а/я, о/ё, у/ю, э/е, ы/и — nguyên âm mềm báo phụ âm trước MỀM/palatal).
- **21 phụ âm**.
- **2 dấu không có âm riêng**: `ъ` (dấu cứng — twёрдый знак, tách âm) và
  `ь` (dấu mềm — мягкий знак, báo phụ âm trước MỀM).

## ё và е

`ё` thường viết thành `е` trong văn thường (ё chỉ bắt buộc trong từ điển/sách
học/khi mơ hồ). Ảnh hưởng chấm điểm — xem `answer_acceptance_ru` (chấp nhận е=ё).

## Hướng viết

LTR ngang. `stroke_order`: not-applicable (bảng chữ cái, không phải chữ Hán).

## Trợ đọc

KHÁC ngôn ngữ Latin: trọng âm tự do + không đánh dấu → học liệu dùng dấu sắc
(ударение: рука́) làm trợ đọc. CLDR có sẵn nguyên âm đánh dấu (а́ е́ и́ о́ у́ ...).
Xem `reading_aid_policy`.
