---
id: tr/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Turkish Writing System — Hệ chữ viết tiếng Thổ Nhĩ Kỳ

Tiếng Thổ viết bằng **chữ Latin** (từ cải cách Atatürk 1928), 29 chữ. Người học
phương Tây đọc được ngay — nhưng có vài chữ và quy tắc đặc biệt.

## Bảng chữ 29 chữ

a b c ç d e f g **ğ** h **ı** i j k l m n o **ö** p r s **ş** t u **ü** v y z

**KHÔNG có q, w, x** (chỉ trong từ ngoại lai/tên).

## Bẫy lớn nhất: ı (không chấm) vs i (có chấm)

Đây là **HAI CHỮ khác nhau**, hai âm khác nhau:

- **ı** = [ɯ] (không chấm), hoa là **I**.
- **i** = [i] (có chấm), hoa là **İ** (có chấm cả khi hoa).

⚠️ Thuật toán viết hoa/thường **phải theo locale `tr`**: mặc định Unicode biến
I→i (thêm chấm sai) và İ→i̇. Ví dụ: `İSTANBUL` → `istanbul` (đúng, có chấm),
`IRMAK` → `ırmak` (đúng, không chấm).

## Chữ riêng khác

ç [tʃ] · ş [ʃ] · ğ (yumuşak ge — kéo dài nguyên âm, không đứng đầu từ) · ö [ø] ·
ü [y]. Đều là **chữ cái riêng** (không phải c/s/g/o/u "có dấu").

## Dấu nháy '

Tách hậu tố khỏi tên riêng: **İstanbul'da** (ở Istanbul), **Türkiye'nin** (của
Thổ). Bắt buộc.

Nguồn: CLDR (đã import Bước 1) + kiến thức phổ thông. LTR.
