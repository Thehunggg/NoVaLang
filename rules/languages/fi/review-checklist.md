# fi — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu (3 vòng, nâng 4 vòng cho ngôn ngữ phức tạp). Mỗi mục ghi rõ đã chọn gì, đi
tới vòng mấy, nguồn. Trạng thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`,
KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Phần Lan
thuần tuý (15 cách, luân phiên phụ âm, hoà âm) → `native-review-fi.md`.

Không có front-matter (checklist thao tác).

> **✅ CẬP NHẬT 2026-07-19: owner ĐÃ DUYỆT cả 3 mục** (D-fi-01, D-fi-02, D-fi-03
> phương án C — xem dấu ✅). `native-review-fi.md` GIỮ NGUYÊN. Status ngôn ngữ
> KHÔNG đổi (VALIDATED_NOT_YET_PROVEN, không FROZEN); `answer_acceptance_fi`
> nâng C/VALIDATED. Ghi kèm: `decisions.md` D-67.

---

## [D-fi-01] Baseline vùng miền cho tiếng Phần Lan

Tiếng Phần Lan chuẩn hoá cao (yleiskieli, Kotus — Viện Ngôn ngữ Phần Lan). Biến
thể vùng (phương ngữ) tồn tại nhưng không phải chuẩn cạnh tranh. (Meänkieli/
Kven là ngôn ngữ riêng.)

**A.** `fi-FI` (chuẩn Phần Lan) làm baseline.
**B.** Biến thể khác (không có ứng viên chuẩn đáng kể).

**Đã tự chọn A (fi-FI) — chốt ở VÒNG 1 (không tranh chấp).**
- VÒNG 1: dataset WikiPron `fin` + UD Finnish-TDT/FTB là chuẩn Phần Lan; Kotus
  chuẩn hoá yleiskieli; Duolingo dạy fi-FI. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (fi-FI).** `tts_audio_policy`
> = VALIDATED, locale fi-FI.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: baseline fi-FI.** Chốt chính thức.

---

## [D-fi-02] Dạy yleiskieli (chuẩn viết) hay puhekieli (khẩu ngữ)

**Đặc trưng quan trọng của fi:** khoảng cách LỚN giữa yleiskieli (chuẩn viết)
và puhekieli (khẩu ngữ hàng ngày): minä→mä, sinä→sä, me olemme→me ollaan,
hän→se. Người Phần viết yleiskieli nhưng NÓI puhekieli.

**A.** Dạy yleiskieli (chuẩn viết) làm baseline + cảnh báo puhekieli.
**B.** Dạy puhekieli (khẩu ngữ) làm baseline.
**C.** Dạy cả hai song song từ đầu.

**Đã tự chọn A (yleiskieli baseline) — chốt ở VÒNG 2.**
- VÒNG 1 (sư phạm ngôn ngữ): yleiskieli là chuẩn cần cho văn bản, chính thức,
  ngữ pháp nền tảng (15 cách, hoà âm rõ nhất ở chuẩn viết); puhekieli tinh giản
  không hệ thống theo vùng.
- VÒNG 2 (app học tiếng): Duolingo/giáo trình Phần Lan dạy yleiskieli trước,
  puhekieli ở trình độ cao/ghi chú → xác nhận A. Dạy puhekieli trước sẽ khiến
  học viên không đọc/viết được văn bản chuẩn.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (yleiskieli baseline + cảnh báo
> puhekieli).** Ghi nhận khoảng cách viết/nói lớn cho học viên. Nếu owner muốn
> ưu tiên khẩu ngữ (giao tiếp trước), đổi sang C/B — nhưng cần bộ nội dung
> puhekieli riêng.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: dạy yleiskieli (chuẩn viết) làm nền + cảnh báo
> puhekieli (khẩu ngữ).** Giữ cách xử này. Chốt chính thức.

---

## [D-fi-03] Chấm điểm khi thiếu/thay ä ö

ä ö là **CHỮ CÁI THẬT** (vị trí bảng chữ riêng, cuối bảng) VÀ thuộc **nhóm hoà
âm TRƯỚC** (khác a/o nhóm sau). Bỏ/thay = sai chữ + **phá hoà âm** + đổi từ
(sää 'thời tiết' / saa 'được'; tällä / talla).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết cho pl 2026-07-19).**
- Owner quyết pl D-64: dấu-là-chữ-cái-riêng → thiếu = SAI. ä ö của fi CÙNG bản
  chất (chữ cái độc lập) + có LÝ DO RIÊNG mạnh hơn: bỏ ä/ö **phá hoà âm nguyên
  âm** (sai hệ thống ngữ pháp, không chỉ sai chữ). Pattern lặp lại → áp phương
  án C (Phần B mục 2). NHƯNG áp tiền lệ sang ngôn ngữ MỚI → giữ
  `answer_acceptance_fi` **DRAFT** + flag owner (không tự nâng VALIDATED như pl).
- **GHI CHÚ APP (như pl D-64, chưa làm):** app nên nhắc dùng bàn phím Phần Lan
  hệ thống thay vì nút nhập ký tự trong bài.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (thiếu ä/ö = sai), theo tiền lệ
> pl D-64 + lý do hoà âm.** Giữ DRAFT. Nếu owner muốn khác cho fi, cập nhật.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: phương án C (thiếu ä/ö = SAI).** Owner xác
> nhận lý do mạnh hơn pl: bỏ ä/ö **phá HOÀ ÂM nguyên âm** — sai cả hệ thống,
> không chỉ sai chữ. `answer_acceptance_fi` cập nhật hướng C + nâng VALIDATED.
> Nhắc người dùng cài bàn phím Phần Lan (như pl D-64).
