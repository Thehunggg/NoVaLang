---
id: uk/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [uk/writing-system]
sources: [S-TRAINED-KNOWLEDGE, CLDR, S-UD-CORPUS]
---

# Ukrainian Orthography — Chính tả tiếng Ukraina

Chuẩn: **Правопис 2019** (Chính tả Ukraina).

## Chữ cái riêng (không phải biến thể có dấu)

і, ї, є, ґ là **CHỮ CÁI RIÊNG** của bảng chữ — không phải i/e/g "có dấu". Bỏ/thay
= sai chính tả + đổi âm/nghĩa. Xem `answer_acceptance_uk`.

## Dấu nháy ' (apostrophe) — bắt buộc

Đặt sau phụ âm môi (б п в м ф) hoặc р, trước я/ю/є/ї, để chỉ **[j] tách + phụ âm
cứng**: об'єкт, п'ять, м'ясо, сім'я, здоров'я. Bỏ = sai chính tả + sai đọc.
Corpus: 628/7092 câu có dấu nháy — đặc trưng phổ biến.

## Dấu mềm ь

Làm mềm phụ âm trước (кінь [kinʲ], день). Là chữ cái, bắt buộc.

## Viết hoa

Hoa đầu câu + danh từ riêng. Tháng/thứ/quốc tịch/tên ngôn ngữ **viết thường**
(січень, понеділок, українська) — giống ru/pl. [corpus-check 0.04%.] Đại từ
lịch sự **Ви** có thể viết hoa trong thư từ.

## Dấu câu

Ngoặc kép «...» hoặc „...". Gạch ngang dài — thay động từ 'là' (Київ — столиця
України). Còn lại như Latin.
