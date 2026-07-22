# Pipeline log — en

Nhật ký `/build-language en`. Mỗi dòng: bước · ngày giờ · kết quả chính. Dùng để
phiên sau **resume** đúng chỗ. File này là nhật ký quy trình, không phải rule.

- **Bước 0 (inventory) · 2026-07-17 · 🛑 DỪNG chờ owner (đợt hỏi 1)** — Kiểm kê
  23 hiện tượng tiếng Anh → `coverage.json` (stage 0-inventory) + `sources.json`
  (7 nguồn: CLDR, UD English-EWT, WikiPron eng, S-EN-STYLE narrative DRAFT,
  S-CONTENT-NATURALNESS, S-BASE, Wikipedia). Điểm khác ja: en CÓ hoa/thường
  (casing), chính tả sâu (g2p bất quy tắc), reading-aid thường không cần nhưng
  cần quyết định vì chính tả sâu. Tier t1+t3 (catalog). Tự áp theo pattern ja:
  scope "đủ dùng tái dùng" (D-34), tất cả kỹ năng (D-35), owner tự review en
  (decisions.md). 2 câu hỏi đợt 1: reading-aid phát âm (Q1), giọng en-US/en-GB
  (Q2). Style-and-register.md DRAFT của Codex giữ nguyên làm narrative (allowlist).
- **Bước 0 trả lời · 2026-07-17 · Auto Mode (không phản hồi thủ công)** — Owner
  gõ lại `/build-language en` không kèm câu trả lời; theo Auto Mode, áp dụng
  phương án khuyến nghị đã báo trước: D-40 reading-aid = IPA ẩn mặc định + toggle,
  D-41 giọng = en-US. Ghi vào decisions.md, chạy tiếp không dừng.
- **Bước 1 (import dataset) · 2026-07-17 · XONG** — CLDR (charset) → orthography.data.json.
  UD English-EWT → word-class.data.json (17 nhãn UPOS). WikiPron
  eng_latn_us_broad_filtered (theo D-41 en-US) → grapheme-to-phoneme.data.json,
  99.645 cặp chữ→âm (kèm trọng âm ˈ). Validator PASS.
- **Bước 1.5 (lexicon đóng) · 2026-07-17** — Import 2 bảng từ vựng đóng máy đọc
  được nhưng đơn tác giả (không phải chuẩn cộng đồng như CLDR/UD): 50 động từ
  bất quy tắc tần suất cao (kemitchell/english-irregular-verbs, CC0) và 145 mục
  rút gọn (andrewbury/contractions). Ghi `confidence: medium` (không phải high)
  vì đơn nguồn — sẽ cross-check với Wikipedia ở Bước 2. Tool mới
  `import-dataset.mjs lexicon` (tái dùng cho ngôn ngữ sau cần bảng từ đóng).
  Tải corpus thật UD English-EWT train+dev+test → 16.622 câu (vượt mốc 10.000)
  cho Bước 3.
- **Bước 2 (derive) · 2026-07-17 · XONG** — Khung 38 claim đóng
  `derive/claims-template.json`. 2 lượt derive độc lập: A = narrative nội bộ
  (S-EN-STYLE + naturalness rule + _base) 9/45, D = Wikipedia qua WebSearch
  36/38. `derive.mjs diff-multi`: **7 trùng → medium/ai-cross-checked · 1 lệch
  → review Bước 4 (R-01: sir/ma'am — quy tắc sản phẩm vs sự kiện ngôn ngữ) · 29
  chỉ-Wikipedia** (nguồn nội bộ không mô tả sự kiện ngôn ngữ, giữ đúng tiền lệ
  ja cho single-source: medium + trích dẫn, không bịa nguồn thứ hai). Sinh 4
  file rule: `orthography/phonology/grammar/pragmatics.rules.json` (fixtures
  đủ pass+fail, dùng luôn 2 bảng lexicon irregular-verbs/contractions). Validator
  PASS.
- **Bước 3 (corpus check) · 2026-07-17 · XONG** — Corpus 16.622 câu thật (UD
  English-EWT — văn Web: blog/forum/email/newsgroup). `corpus-check.mjs`:
  chữ hoa đầu câu vi phạm 14.66%, "I" hoa vi phạm 1.86% — cả hai < 20%, KHÔNG
  bác rule (văn Web informal, không phải rule sai). `g2p-check.mjs`: đo rhotic
  trên WikiPron US — 87.2% từ (nguyên âm)+r cuối có âm ɹ/ɚ, dưới ngưỡng nghi
  ngờ. **Phát hiện + sửa 2 lỗi thật:** (1) Bước 0/1 giả định sai WikiPron có
  đánh dấu trọng âm ˈ — kiểm trực tiếp cả bản broad (99.645) lẫn narrow (5.443):
  0 dòng có ˈ → hạ `lexical_stress.lexical_level` về none, KHÔNG dạy trọng âm
  theo từng từ (không bịa). (2) `g2p-check.mjs` (tool mới của phiên này) thiếu
  trường `index` (chữ hoa CLDR) khi tính charset coverage → phủ báo sai 80.78%;
  sửa tool, phủ thật 99.89%. Fixtures bổ sung câu thật từ corpus. Validator PASS.
- **Bước 4 (review) · 2026-07-17 · 🛑 DỪNG CHỜ OWNER** — `review-checklist.md`:
  1 mục (R-01 sir/ma'am dịch vụ — không phải mâu thuẫn thật, chỉ cần chốt cách
  dạy) · ~2 phút. Không cần native-review-en.md (owner tự review được tiếng
  Anh, theo decisions.md). Validator PASS. Chờ owner trả lời.
- **Bước 4 trả lời · 2026-07-17 · owner** — R-01: **A** (sir/ma'am có thật
  trong ngữ cảnh dịch vụ, không mặc định vào câu lịch sự thường ngày → D-42).
  Áp dụng vào pragmatics.rules.json + coverage. **Tự phát hiện thêm 1 lỗi khi
  rà trước freeze:** `sentence_final_particles` mang confidence medium từ Bước
  0 nhưng KHÔNG có trong `claims-template.json` → chưa từng qua Bước 2 derive
  thật. Sửa: hạ về none/not-applicable (tiếng Anh không có hệ trợ từ cuối câu
  như ja). Validator PASS. Hàng đợi review = RỖNG.
- **Bước 5 · 2026-07-17 · VALIDATED (đồng hồ Gate 5 bắt đầu)** — 22 VALIDATED
  · 2 not-applicable (stroke_order, sentence_final_particles) · 0 DEFERRED · 0
  DRAFT. `_meta.stage='validated'`, `validatedAt=2026-07-17`. Catalog
  `en.ruleStatus=VALIDATED_PENDING_FREEZE`. **CHƯA freeze** — cần ≥48h + owner
  xác nhận lần 2. lexical_level của lexical_stress/inflection_morphology/
  spelling_variants KHÔNG freeze (dữ liệu chưa đầy đủ theo-từng-từ).
- **Freeze (D-49, không chờ Gate 5) · 2026-07-18** — Owner xác nhận đóng băng
  22/24 hiện tượng ở **rule_level** (loại trừ stroke_order/sentence_final_particles
  not-applicable). 4 file `*.rules.json` bump `version: 1.0.0`, `status: FROZEN`.
  `lexical_level` của lexical_stress (none)/inflection_morphology (50/~200 động
  từ)/spelling_variants GIỮ NGUYÊN, không tự động freeze theo. Catalog
  `en.ruleStatus=FROZEN_RULE_LEVEL_LEXICAL_OPEN`. Validator PASS.
