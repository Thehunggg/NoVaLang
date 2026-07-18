# Pipeline log — zh

Nhật ký `/build-language zh`. Mỗi dòng: bước · ngày giờ · kết quả chính. Dùng để
phiên sau **resume** đúng chỗ. File này là nhật ký quy trình, không phải rule.

- **Bước 0 (inventory) · 2026-07-18 · XONG, KHÔNG DỪNG (Auto Mode + D-50)** —
  Kiểm kê 20 hiện tượng tiếng Trung (Quan thoại) → `coverage.json` (stage
  0-inventory) + `sources.json` (7 nguồn: CLDR, UD Chinese-GSD, WikiPron cmn_hani
  168655 mục, S-CONTENT-NATURALNESS, S-BASE, Wikipedia, ghi chú pattern-reuse).
  Script = **Hans (giản thể)** — D-37 chốt lại hôm nay (không hỏi lại, quyết
  định cũ áp dụng). Hai hiện tượng trung tâm: `tone_system` (4 thanh + khinh
  thanh, giống cấu trúc vi nhưng số thanh khác) và `word_segmentation` (KHÔNG
  khoảng trắng giữa chữ/từ — nặng hơn cả vi).
  **Áp dụng D-50 (nguyên tắc dạy) tự quyết, không hỏi:**
  - `reading_aid_policy` (pinyin): ẩn mặc định + toggle A0–B1, không toggle
    B2–C2 — giống D-11 bản (ii).
  - `answer_acceptance_zh`: cho nhập pinyin thay Hán tự ở A0–B1 (hệ chữ khó
    gõ), khoan dung dấu thanh; chặt dần từ B1 lên C1 (yêu cầu Hán tự + thanh
    chính xác).
  **Pattern tái dùng từ ja (không hỏi lại):** `stroke_order` = DEFERRED (không
  dạy viết tay); native review = sẽ có, soạn `native-review-zh.md`, không tự
  cấp PASS nội dung chủ quan (D-36 pattern).
  **Pattern tái dùng từ D-17:** không tự động chấp nhận phồn thể (Hant) làm
  biến thể tương đương giản thể — biến thể chưa được duyệt.
  **Câu hỏi duy nhất còn lại (ràng buộc thực tế, không suy ra được từ D-50):**
  owner có quen người bản ngữ tiếng Trung không? Auto Mode đang bật → áp dụng
  mặc định "chưa có, chuẩn bị native-review-zh.md" và chạy tiếp luôn; owner có
  thể điều chỉnh sau nếu thực ra có quen ai đó.
- **Bước 1 (import dataset) · 2026-07-18 · XONG** — CLDR (4.421 chữ Hán mẫu) →
  orthography.data.json. UD Chinese-GSD → word-class.data.json (16 nhãn UPOS).
  WikiPron cmn_hani_standard_broad → grapheme-to-phoneme.data.json, 168.655
  cặp — có ký hiệu thanh Chao tone (số góc trên, vd ⁵¹/²¹⁴/³⁵). Validator PASS.
