---
id: ru/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [ru/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Russian Pronunciation (ru-RU)

Xác nhận bằng `g2p-check.mjs` trên WikiPron narrow thật (`rus_cyrl_narrow`,
466668 cặp từ→âm). Chỉ có bản **narrow** (không có broad) cho tiếng Nga.

## Phụ âm (độc lập trọng âm — đã xác nhận)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `ш` | [ʂ] | 0.03% |
| `щ` | [ɕː] | 0.28% |
| `ц` | [ts] | 0.16% |
| `х` | [x] | 0.34% |
| `ч` | [t͡ɕ] | 4.33% (чн→[ʂn] конечно/скучно) |
| `ж` | [ʐ] | (giữa từ; cuối từ câm — xem dưới) |

## Làm câm cuối từ (final devoicing) — quy tắc lớn, đã xác nhận

Phụ âm hữu thanh cuối từ → vô thanh: `б→п г→к д→т ж→ш з→с в→ф`.

| | % vi phạm |
|---|---|
| `г$`→[k] | 2.35% (ngoại lệ Бог→[box]) |
| `б$`→[p] | 2.29% |
| `д$`→[t] | 0.58% |
| `з$`→[s] | 3.12% (giới từ proclitic без/близ) |

## Đặc trưng phụ thuộc trọng âm (KHÔNG g2p-check được bằng regex)

- **Nguyên âm giảm (akanye)**: `о` không nhấn → [ɐ]/[ə] (молоко=[məɫɐˈko]);
  `е/я` không nhấn → [ɪ]. Phụ thuộc TRỌNG ÂM tự do + không đánh dấu → không
  kiểm bằng regex tĩnh (WikiPron narrow xác nhận [ɐ]/[ə] tồn tại nhưng vị trí
  theo từng từ). Để confidence medium — xem `vowel_reduction`, `word_stress`.
- **Palatal hoá (mềm hoá)**: phụ âm + я/е/ё/ю/и/ь → mềm [ʲ] — xem
  `palatalization` (đặc trưng trung tâm).
- **Iotation**: я/е/ё/ю đầu từ / sau nguyên âm/ъ/ь → [ja]/[je]/[jo]/[ju]
  (ёж=[joʂ]).

## Kỷ luật dữ liệu

`ж→[ʐ]` bắn 7.13% — KHÔNG kết luận "rule sai" mà truy ra: chủ yếu là ж cuối
từ **câm** thành [ʂ] (Анкоридж) + `дж` loanword → [d͡ʑ]. Tách thành quy tắc
final-devoicing riêng thay vì bỏ ж→ʐ. Sửa mô hình theo dữ liệu.
