# id — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Tra cứu **5 vòng** cho MỌI quyết
định sản phẩm. Mỗi mục ghi rõ đã chọn gì, các vòng ra gì, vì sao. Trạng thái:
`VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

5 mục, đọc < 10 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Indonesia
thuần tuý → `native-review-id.md`.

Không có front-matter (checklist thao tác).

---

## [D-id-01] Baseline vùng miền

**A.** `id-ID` (Bahasa Indonesia baku). **B.** Khác (ms Malaysia — ngôn ngữ
riêng, không phải biến thể).

**Đã tự chọn A — chốt VÒNG 1 (không tranh chấp).**
- V1: dataset WikiPron `ind` + UD Indonesian-GSD là chuẩn; CLDR `id` mặc định
  id-ID; Badan Bahasa chuẩn hoá. ms (Malay Malaysia) là mã ngôn ngữ RIÊNG
  (không trộn).

> **TỰ QUYẾT 2026-07-19: A (id-ID).** `tts_audio_policy` VALIDATED, locale id-ID.

---

## [D-id-02] Chuẩn chính tả

**A.** EYD V / PUEBI (Badan Bahasa, chuẩn nhà nước). **B.** Khác.

**Đã tự chọn A — chốt VÒNG 2.**
- V1/V2: EYD V (Ejaan yang Disempurnakan, bản 2022) / PUEBI của Badan
  Pengembangan dan Pembinaan Bahasa là chuẩn; giáo trình theo đó. Không cần
  vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A.**

---

## [D-id-03] Reading aid

**A.** NOT-APPLICABLE — chữ Latin, chính tả đều. **B.** Cần trợ đọc.

**Đã tự chọn A — chốt VÒNG 1.**
- V1: chữ Latin + chính tả khá đều; người học phương Tây đọc được ngay. Chỉ 'e'
  [e]/[ə] cần audio (không cần hệ chú đọc).

> **TỰ QUYẾT 2026-07-19: A (reading-aid NOT-APPLICABLE).**

---

## [D-id-04] Chính sách chấm điểm (answer_acceptance)

id KHÔNG có dấu phụ / chữ cái riêng (khác pl/da/el/tr/uk/bg). Không có vấn đề
"chữ-cái-riêng thiếu = sai".

**A.** Dùng chính sách `_base` mặc định (chính tả đúng thông thường; typo nhẹ).
**B.** Luật đặc thù.

**Đã tự chọn A — chốt sau VÒNG 3.**
- V1/V2/V3: id không có chữ có dấu; 'e' viết như nhau cho [e]/[ə] nên không có
  bẫy chấm dấu. Vấn đề duy nhất là dấu nối láy (buku-buku) — chính tả bắt buộc,
  nằm trong "chính tả đúng" của _base. Không cần override C/khoan-dung như các
  ngôn ngữ có chữ-cái-riêng.

> **TỰ QUYẾT 2026-07-19: A (dùng _base, không luật riêng).** Giữ
> `answer_acceptance_id` DRAFT + flag owner xác nhận không cần luật đặc thù.

---

## [D-id-05] Dạy mức đại từ lịch sự nào làm nền

id không có đối lập T-V hình thái nhưng đại từ NHẠY LỊCH SỰ (saya/aku,
Anda/kamu) + khoảng cách baku↔gaul lớn.

**A.** Dạy bahasa baku (saya/Anda) làm nền, giới thiệu thân mật (aku/kamu) +
danh xưng (Bapak/Ibu); kami vs kita rõ. **B.** Dạy gaul làm nền.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: bahasa baku là chuẩn giáo dục/chính thức; an toàn xã hội (lịch sự với
  người lạ). gaul (khẩu ngữ Jakarta) không phổ quát, dễ sai ngữ cảnh.
- V2: giáo trình id dạy baku làm nền + giới thiệu đại từ theo lịch sự. Không cần
  vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (baku làm nền, dạy phân tầng đại từ + kami/kita).**
> `pronouns_register` VALIDATED.
