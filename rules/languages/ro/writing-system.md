---
id: ro/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Romanian Writing System

Baseline: **ro-RO**. Rôman Đông, mang đặc trưng **Balkan**. Chữ Latin.

## Bảng chữ + 5 chữ riêng

`ă` [ə], `â` [ɨ], `î` [ɨ], `ș` [ʃ], `ț` [t͡s]. (q w y chỉ từ mượn.) CLDR xác nhận.

- `â` và `î` **cùng âm** [ɨ] — phân bố theo quy tắc chính tả (xem `diacritics_orthography`, D-ro-02).
- `ș`/`ț` đúng phải dùng **dấu phẩy dưới** (comma-below, U+0219/U+021B), KHÔNG phải
  cedilla (`ş`/`ţ`) — lỗi mã hoá phổ biến cần tránh.

## Hướng viết

LTR ngang. `stroke_order`: not-applicable.

## Điểm học viên hay nhầm

- 5 dấu là chữ, bỏ = sai + đổi nghĩa. Xem `answer_acceptance_ro`.
- ș/ț là comma-below, không phải cedilla.
