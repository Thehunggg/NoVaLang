# bg — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Tra cứu **5 vòng** cho MỌI quyết
định sản phẩm. Mỗi mục ghi rõ đã chọn gì, các vòng ra gì, vì sao. Trạng thái:
`VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

5 mục, đọc < 10 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Bulgaria
thuần tuý → `native-review-bg.md`.

Không có front-matter (checklist thao tác).

---

## [D-bg-01] Baseline vùng miền

**A.** `bg-BG` (Standard Bulgarian). **B.** Khác.

**Đã tự chọn A — chốt VÒNG 1 (không tranh chấp).**
- V1: dataset WikiPron `bul` + UD Bulgarian-BTB là chuẩn; CLDR `bg` mặc định
  bg-BG; Институт за български език chuẩn hoá. Không biến thể viết cạnh tranh.

> **TỰ QUYẾT 2026-07-19: A (bg-BG).** `tts_audio_policy` VALIDATED, locale bg-BG.

---

## [D-bg-02] Chuẩn chính tả

**A.** Институт за български език (BAN, chuẩn nhà nước). **B.** Khác.

**Đã tự chọn A — chốt VÒNG 2.**
- V1/V2: Институт за български език (Viện Ngôn ngữ, Viện Hàn lâm Bulgaria) +
  Официален правописен речник là chuẩn; giáo trình theo đó. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A.**

---

## [D-bg-03] Có dùng chuyển tự Latin làm reading aid không

bg là hệ chữ Kirin.

**A.** Không — dạy chữ Kirin trực tiếp (audio là kênh phát âm). **B.** Hiện
chuyển tự cho nhập môn, ẩn dần. **C.** Luôn hiện.

**Đã tự chọn A — chốt sau VÒNG 3 (product).**
- V1: chuyển tự Latin của bg ('shlyokavitsa') là quy ước chat KHÔNG chính thức,
  nhiều biến thể; có chuẩn ISO 9/nhà nước nhưng cho tên/tài liệu, không phải
  chú đọc học tập.
- V2: app học tiếng dạy chữ Kirin trực tiếp.
- V3/tiền lệ: nhất quán el/uk (không chuyển tự); chính tả bg đều → đọc sớm.
- Quyết định sản phẩm → tự chọn A, flag owner.

> **TỰ QUYẾT 2026-07-19: A (không chuyển tự, dạy chữ Kirin trực tiếp).**

---

## [D-bg-04] Chấm điểm chữ Kirin bg

Bulgaria KHÔNG có dấu phụ (mọi chữ là chữ Kirin cơ bản). Vấn đề: gõ đúng chữ
(đặc biệt ъ [ɤ] — nguyên âm thật) + không dùng chuyển tự Latin.

**A.** Chấp nhận (bỏ qua). **B.** Cảnh báo nhẹ. **C.** Coi là SAI.

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64. KHÔNG có 'ngoại lệ khoan dung' (khác
uk/tr) vì bg không có dấu phụ.**
- V1/V2: mọi chữ Kirin bg là chữ bắt buộc; ъ là nguyên âm THẬT đổi từ (пъпка
  'nụ'/папка 'thư mục'). Sai/bỏ = sai chính tả — như pl/uk (C). Chuyển tự Latin
  không chấp nhận làm đáp án.
- V4/V5: Bulgaria không có chữ có dấu → không có trường hợp "dấu phụ hiếm" để
  khoan dung như circumflex tr/ґ uk. Thẳng C.

> **TỰ QUYẾT 2026-07-19: C (sai chữ Kirin/gõ Latin = sai).** Giữ
> `answer_acceptance_bg` DRAFT + flag owner. Nhắc cài bàn phím Bulgaria.

---

## [D-bg-05] Dạy đối lập ти/Вие

**A.** Dạy đối lập ти (thân)/Вие (lịch sự) + господин/госпожа. **B.** Một dạng.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: Bulgaria dùng sống đối lập ти/Вие (Вие lịch sự với người lạ/lớn tuổi —
  chuẩn xã hội thật) + господин/госпожа.
- V2: giáo trình bg dạy cả hai. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (dạy đối lập ти/Вие).** `forms_of_address` VALIDATED.
