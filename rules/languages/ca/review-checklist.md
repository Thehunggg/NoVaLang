# ca — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + tiền lệ owner đã duyệt cho ngôn ngữ Romance trước (es
B-02, es D-74) và pl D-64. Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn.
Trạng thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

4 mục, đọc < 8 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Catalan
thuần tuý → `native-review-ca.md`.

Không có front-matter (checklist thao tác).

---

## [D-ca-01] Baseline vùng miền cho tiếng Catalan

Catalan có biến thể lớn: **Central** (Barcelona, chuẩn IEC de facto) và
**Valencian** (València, chuẩn AVL) + Balear. Khác giảm nguyên âm, hình thái.

**A.** `ca` Central Catalan (chuẩn IEC) làm baseline.
**B.** Valencian.
**C.** Biến thể khác.

**Đã tự chọn A (Central/IEC) — chốt ở VÒNG 1.**
- VÒNG 1: dataset WikiPron `cat` + UD Catalan-AnCora là Central; CLDR ca; IEC là
  cơ quan chuẩn chính. Duolingo dạy Central. Valencian có mã locale riêng
  (ca-valencia) — ngoài phạm vi task này. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (ca Central/IEC).**
> `tts_audio_policy` = VALIDATED, locale ca. Trùng bản chất tiền lệ es/da (baseline
> chuẩn chính) → xin owner xác nhận.

---

## [D-ca-02] Xưng hô: dạy tu/vostè đối lập T-V

Catalan có đối lập T-V thật (như es): `tu` (thân mật) / `vostè` (trang trọng +
động từ ngôi 3). KHÁC da/sv (du phổ quát).

**A.** Dạy tu/vostè đối lập (vostè + động từ ngôi 3).
**B.** Chỉ dạy tu (phổ quát) kiểu Scandinavia.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): Catalan giữ T-V thật, vostè phổ biến trong ngữ cảnh trang
  trọng.
- VÒNG 2 (app học tiếng): giáo trình Catalan dạy tu/vostè đối lập; UD corpus có
  cả hai → A. (Giống es usted, KHÁC Scandinavia.)

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (tu/vostè đối lập).**
> `forms_of_address` VALIDATED.

---

## [D-ca-03] Quá khứ dứt điểm: dạy passat perifràstic (vaig parlar) làm chuẩn

Catalan có ĐẶC TRƯNG: quá khứ dứt điểm thường dùng `vaig/vas/va + INFINITIU`
(*vaig parlar* 'tôi đã nói'), KHÔNG phải preterite hình thái như es (*hablé*).
Có cả preterite hình thái (*parlí*) nhưng hiếm/văn chương/vùng.

**A.** Dạy passat perifràstic (vaig parlar) làm quá khứ dứt điểm chuẩn.
**B.** Dạy preterite hình thái (parlí) làm chuẩn.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): passat perifràstic là dạng phổ biến áp đảo trong khẩu ngữ +
  văn viết hiện đại Central Catalan; preterite hình thái gần như chỉ văn
  chương/Valencian/Balear.
- VÒNG 2 (giáo trình): giáo trình Catalan hiện đại dạy passat perifràstic trước
  → A.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (passat perifràstic).**
> `verb_conjugation` giữ DRAFT (lexical, bảng chia cần người bản ngữ).

---

## [D-ca-04] Chấm điểm khi thiếu/thay dấu — TÁCH 2 LOẠI

Catalan có 2 loại "dấu" khác bản chất:
1. **ç + l·l** = phân biệt âm/nghĩa (ç: c→[s]; l·l geminate khác ll — cel·la vs
   cella). Bản chất như chữ cái riêng (pl ł, da æ).
2. **à è é í ï ò ó ú ü** = dấu trọng âm Roman (vị trí nhấn + mở/đóng + hiatus).
   Bản chất như dấu es (á é í ó ú).

**A.** Cả hai chấp nhận (normalize bỏ).
**B.** Cả hai cảnh báo nhẹ.
**C.** ç/l·l = SAI (pl D-64); à è é... = cảnh báo nhẹ (es D-74). TÁCH.
**D.** Cả hai = SAI.

**Đã tự chọn C — TÁCH, áp 2 tiền lệ owner đã duyệt.**
- ç/l·l phân biệt âm/nghĩa → **tiền lệ pl D-64** (owner: dấu-là-chữ → thiếu =
  SAI). Loại 'distinct'.
- à è é í ï ò ó ú ü là dấu trọng âm Roman → **tiền lệ es D-74** (owner duyệt
  2026-07-19: dấu trọng âm es = cảnh báo nhẹ, không chấm sai cứng). Loại 'light
  diacritic'. Catalan cùng họ Romance với es → áp cùng chính sách.
- Áp tiền lệ sang ngôn ngữ MỚI + tách 2 loại → giữ `answer_acceptance_ca`
  **DRAFT** + flag owner.
- **GHI CHÚ APP:** nhắc dùng bàn phím Catalan (có ç, l·l, dấu) khi làm bài viết.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (ç/l·l = sai theo pl D-64; dấu
> trọng âm = cảnh báo nhẹ theo es D-74).** Giữ DRAFT. Xin owner xác nhận cách
> tách 2 loại này.
