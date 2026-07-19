# sv — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu 3 vòng. Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái ngôn
ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Thụy Điển
thuần tuý → `native-review-sv.md`.

Không có front-matter (checklist thao tác).

---

## [D-sv-01] Baseline vùng miền cho tiếng Thụy Điển

Tiếng Thụy Điển chuẩn hoá cao (rikssvenska, sv-SE). Biến thể lớn khác là
Finland Swedish (fi-SV) — khác phát âm (không pitch accent rõ), một số từ vựng;
là biến thể quốc gia riêng nhưng nhỏ hơn nhiều.

**A.** `sv-SE` (Thụy Điển) làm baseline.
**B.** Finland Swedish (fi-SV).

**Đã tự chọn A (sv-SE) — chốt ở VÒNG 1 (đồng thuận).**
- VÒNG 1: dataset WikiPron `swe` + UD Swedish-Talbanken/LinES là Thụy Điển
  chuẩn; Duolingo dạy sv-SE; số người nói lớn hơn nhiều. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (sv-SE).** `tts_audio_policy`
> = VALIDATED, locale sv-SE.

---

## [D-sv-02] Chấm điểm khi thiếu/thay å ä ö

å ä ö là **CHỮ CÁI THẬT** (vị trí bảng chữ + từ điển riêng, cuối bảng sau z) —
GIỐNG BẢN CHẤT pl. Bỏ/thay = sai chính tả, đôi khi đổi từ (mål 'mục tiêu' /
mal 'con nhậy'; för / for).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết cho pl 2026-07-19).**
- Owner đã quyết pl (D-64): với ngôn ngữ có dấu-là-chữ-cái-riêng, thiếu dấu =
  SAI (dạy gõ đúng, dùng bàn phím ngôn ngữ đó). å ä ö của sv **cùng bản chất**
  (thậm chí rõ hơn — là chữ cái độc lập trong bảng, không phải a/o biến thể) →
  pattern lặp lại, áp cùng phương án C (Phần B mục 2). NHƯNG đây là ÁP tiền lệ
  sang ngôn ngữ MỚI → giữ `answer_acceptance_sv` **DRAFT** + flag owner xác
  nhận (không tự nâng VALIDATED như pl vì owner chưa quyết trực tiếp cho sv).
- **GHI CHÚ APP (như pl D-64, không phải rule, chưa làm):** app nên nhắc người
  dùng cài/dùng bàn phím Thụy Điển hệ thống thay vì nút nhập ký tự trong bài.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (thiếu å/ä/ö = sai), theo tiền
> lệ pl D-64.** Giữ DRAFT. Nếu owner muốn khác (B/A cho sv), cập nhật.

---

## [D-sv-03] du phổ quát hay dạy đối lập du/ni

Nhờ **du-reformen** (thập niên 1960-70), tiếng Thụy Điển hiện đại dùng `du` cho
hầu hết mọi người (kể cả người lạ, lớn tuổi, dịch vụ). `ni` trang trọng số ít
đã cổ, đôi khi bị coi là kỳ.

**A.** Dạy `du` phổ quát (baseline), `ni` = số nhiều + ghi chú `ni` trang trọng
là cổ/tuỳ chọn.
**B.** Dạy đối lập du/ni kiểu de du/Sie.

**Đã tự chọn A (du phổ quát) — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả ngôn ngữ): du-reformen là sự kiện xã hội-ngôn ngữ nổi tiếng,
  mọi nguồn mô tả du phổ quát ở Thụy Điển hiện đại.
- VÒNG 2 (app học tiếng): Duolingo/Babbel tiếng Thụy Điển dạy `du` làm chuẩn,
  không dựng đối lập T-V mạnh → xác nhận A. (Khác hẳn de/fr nơi đối lập T-V
  là trọng tâm.)

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (du phổ quát).**
> `forms_of_address` VALIDATED với baseline du. `ni` dạy như số nhiều.
