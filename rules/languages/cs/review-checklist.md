# cs — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu (ngôn ngữ phức tạp → tới 4 vòng). Mỗi mục ghi rõ đã chọn gì, đi tới vòng
mấy, nguồn. Trạng thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`,
KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Séc thuần
tuý (7 cách, animacy, clitic) → `native-review-cs.md`.

Không có front-matter (checklist thao tác).

> **✅ CẬP NHẬT 2026-07-19: owner ĐÃ DUYỆT cả 3 mục** (D-cs-01, D-cs-02, D-cs-03
> phương án C — xem dấu ✅). `native-review-cs.md` GIỮ NGUYÊN. Status ngôn ngữ
> KHÔNG đổi (VALIDATED_NOT_YET_PROVEN, không FROZEN); `answer_acceptance_cs`
> nâng C/VALIDATED. Ghi kèm: `decisions.md` D-70.

---

## [D-cs-01] Baseline vùng miền cho tiếng Séc

Tiếng Séc chuẩn hoá cao (spisovná čeština, Ústav pro jazyk český — Viện Ngôn
ngữ Séc). Phương ngữ Moravia tồn tại nhưng spisovná là chuẩn thống nhất.

**A.** `cs-CZ` (spisovná) làm baseline.
**B.** Biến thể khác (không có chuẩn cạnh tranh).

**Đã tự chọn A (cs-CZ) — chốt ở VÒNG 1 (không tranh chấp).**
- VÒNG 1: dataset WikiPron `ces` + UD Czech-CAC/FicTree là chuẩn Séc; Ústav pro
  jazyk český chuẩn hoá spisovná; Duolingo dạy cs-CZ. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (cs-CZ).** `tts_audio_policy`
> = VALIDATED, locale cs-CZ.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: baseline cs-CZ.** Chốt chính thức.

---

## [D-cs-02] Dạy spisovná (chuẩn viết) hay obecná čeština (khẩu ngữ)

Tiếng Séc có hai tầng: spisovná čeština (chuẩn viết/trang trọng) vs obecná
čeština (khẩu ngữ Bohemia thông dụng): dobrý→dobrej, dobré→dobrý, okno→vokno.

**A.** Dạy spisovná (chuẩn) làm baseline + cảnh báo obecná.
**B.** Dạy obecná (khẩu ngữ) làm baseline.
**C.** Cả hai song song.

**Đã tự chọn A (spisovná baseline) — chốt ở VÒNG 2.**
- VÒNG 1 (sư phạm): spisovná là chuẩn cần cho văn bản/chính thức/ngữ pháp nền
  tảng (7 cách rõ nhất ở chuẩn viết); obecná biến đổi theo vùng.
- VÒNG 2 (app học tiếng): Duolingo/giáo trình Séc dạy spisovná trước, obecná ở
  ghi chú → xác nhận A. (Ít cực đoan hơn diglossia của fi nhưng cùng hướng xử.)

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (spisovná baseline + cảnh báo
> obecná).** Nếu owner muốn ưu tiên khẩu ngữ, đổi — nhưng cần bộ nội dung obecná
> riêng.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: dạy spisovná (chuẩn viết) làm nền + lưu ý
> obecná (khẩu ngữ).** Chốt chính thức.

---

## [D-cs-03] Chấm điểm khi thiếu dấu Séc

Dấu Séc: HÁČEK (č/š/ž/ř/ě/ň/ď/ť) đổi ÂM (s [s]/š [ʃ]); ACUTE/KROUŽEK (á/é/í/ó/ú/
ů/ý) = ĐỘ DÀI đổi nghĩa (byt/být). Thiếu dấu = sai chữ + đổi âm/nghĩa. GIỐNG BẢN
CHẤT pl (dấu là chữ).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết cho pl 2026-07-19).**
- Owner quyết pl D-64: dấu-đổi-âm/nghĩa → thiếu = SAI (dạy gõ đúng, bàn phím
  ngôn ngữ đó). Dấu Séc CÙNG bản chất (háček đổi âm, acute đổi độ dài/nghĩa) →
  pattern lặp lại, áp phương án C (Phần B mục 2). NHƯNG áp tiền lệ sang ngôn ngữ
  MỚI → giữ `answer_acceptance_cs` **DRAFT** + flag owner (không tự nâng VALIDATED
  như pl).
- **GHI CHÚ APP (như pl D-64, chưa làm):** app nên nhắc dùng bàn phím Séc hệ
  thống thay vì nút nhập ký tự trong bài.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (thiếu dấu Séc = sai), theo tiền
> lệ pl D-64.** Giữ DRAFT. Nếu owner muốn khác cho cs, cập nhật.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: phương án C (thiếu dấu Séc = SAI, tiền lệ pl
> D-64).** `answer_acceptance_cs` cập nhật hướng C + nâng VALIDATED. Nhắc cài
> bàn phím Séc.
