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
- **Bước 2 (derive) · 2026-07-18 · XONG** — Khung 28 claim đóng. 2 lượt: A =
  narrative nội bộ 0/28 (dự đoán đúng, không mô tả sự kiện ngôn ngữ), D =
  Wikipedia 28/28. Diff: **0 trùng, 0 lệch, 28 chỉ-Wikipedia** (medium, có trích
  dẫn — không nguồn thứ hai mở, cùng tình huống en/vi). Sinh 4 file rule:
  orthography/phonology/grammar/pragmatics.rules.json (fixtures pass+fail đủ,
  gồm 5 chữ minimal-pair thanh điệu 妈/麻/马/骂/吗). Validator PASS.
- **Bước 3 (corpus check) · 2026-07-18 · XONG, có 1 lỗi thật phát hiện + sửa
  ngay** — **PHÁT HIỆN NGHIÊM TRỌNG:** dataset Bước 1 `UD_Chinese-GSD` (đã dùng
  cho word_class + corpus check ban đầu) hóa ra là **PHỒN THỂ** (README chính
  thức của treebank: "Traditional Chinese Universal Dependencies Treebank"),
  mâu thuẫn trực tiếp D-37 (Hans). Phát hiện khi đối chiếu corpus thật với 20
  cặp giản/phồn đã biết: 7593 lượt ký tự Hant / chỉ 20 lượt Hans. Cùng lúc phát
  hiện WikiPron `cmn_hani_standard_broad` (nguồn Bước 1 cho tone/g2p) cũng
  Hant-keyed: kiểm 42 cặp giản/phồn → 40/42 chỉ có bản Hant (giá trị THANH vẫn
  đúng khi đối chiếu tay, chỉ khóa chữ sai).
  **Sửa:** đổi UD sang `UD_Chinese-GSDSimp` (Hans, OpenCC + sửa tay) — import
  lại `word-class.data.json`, tải lại corpus (4997 câu), xác nhận 0 Hant/7613
  Hans trong 20 cặp kiểm. Corpus check sạch: 0% vi phạm 2 text-assert.
  WikiPron cmn_hani KHÔNG có bản Hans thay thế trên WikiPron — hạ
  `tone_system.lexical_level`/`grapheme_to_phoneme.lexical_level` từ high→medium,
  ghi rõ khoảng trống: cần bảng chuyển đổi S2T (OpenCC) trước khi generator
  dùng được bảng tra Hán tự→âm cho Hans — đề xuất báo cáo cuối, KHÔNG tự thêm
  dataset mới ngoài phạm vi phiên này. g2p-check đo thanh: 99.93% mục WikiPron
  có ký hiệu thanh (121/168655 không thanh, đa số khinh thanh hợp lệ). Fixtures
  bổ sung câu thật từ corpus GSDSimp. Validator PASS.
- **Bước 4 (review) · 2026-07-18 · Hàng đợi RỖNG, không cần hỏi owner** — 0
  lệch từ Bước 2, corpus sạch, mọi quyết định sản phẩm đã tự quyết qua D-50
  (reading_aid_policy, answer_acceptance_zh) hoặc pattern tái dùng (script,
  stroke_order). Soạn `native-review-zh.md` (tiếng Anh, 15 tick, ~5 phút, theo
  D-36 pattern) cho phần chủ quan: register 您/你 (mục A), trợ từ cuối câu
  吗/呢/吧 (mục B), trợ từ khía cạnh 了/过 (mục C), lượng từ (mục D), xưng hô
  (mục E), dịch tự nhiên (mục F). Không đưa owner checklist vì owner không
  biết tiếng Trung — đúng luật Phần D Bước 4 mục 3.
- **Bước 5 · 2026-07-18 · VALIDATED (D-49: không chờ Gate 5)** — 20 VALIDATED
  · 1 not-applicable (casing) · 1 DEFERRED (stroke_order). `_meta.stage=
  'validated'`, `validatedAt=2026-07-18`. Catalog
  `zh.ruleStatus=VALIDATED_PENDING_FREEZE`. lexical_level của tone_system/
  grapheme_to_phoneme hạ xuống medium (WikiPron Hant-keyed) — KHÔNG freeze cho
  tới khi có bảng chuyển đổi S2T. classifiers/pronoun_system/forms_of_address
  lexical KHÔNG freeze (thiếu dữ liệu theo-từng-từ). Validator PASS.
- **Bước 5 (freeze) · 2026-07-18 · FROZEN (D-49: không chờ Gate 5)** — Golden
  Lesson audit (owner, cùng ngày) sửa `_base/distractor` (G-01) +
  `_base/text-fields` (C7) lên version 1.1.0; owner chọn re-validate ja/en/vi
  trên `_base` mới rồi freeze lại thay vì giữ pin cũ, và freeze zh luôn nếu đủ
  điều kiện trên `_base` mới. zh chưa từng có front-matter `version`/`status`
  ở 4 file `*.rules.json` (orthography/phonology/grammar/pragmatics) — thêm
  `version: 1.0.0`, `status: FROZEN` (khớp mẫu ja/en/vi). `coverage.json`
  `_meta.stage='frozen-rule-level'`, `frozenAt=2026-07-18`,
  `baseDependencies` ghim đúng version hiện tại của `_base` (distractor/
  text-fields = 1.1.0, còn lại 1.0.0; zh không có `_script/Hans/` nên không
  ghim layer script). Catalog `zh.ruleStatus=FROZEN_RULE_LEVEL_LEXICAL_OPEN`.
  `punctuation_layout` (thiếu hoàn toàn, phát hiện bởi INV-9 thật) được ghi
  nhận riêng: `confidence: none` + ghi nợ tường minh trong coverage, KHÔNG tự
  vá — để lần build sau xử theo đúng quy trình (Bước 1–3). `node
  tools/validate.mjs` PASS (0 lỗi) sau khi thêm entry đó vẫn cần xác nhận lại
  (xem quyết định trong `rules/_legacy/golden-lesson-test-2026-07-18.md`).
