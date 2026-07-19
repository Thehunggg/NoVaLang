# it — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 23 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de.
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr it` →
  `orthography.data.json` (à è é ì ò ù). WikiPron `ita_latn_broad` (89403 cặp)
  → `grapheme-to-phoneme.data.json`. `ud it` (Italian-ISDT test) →
  `word-class.data.json`. Corpus: UD Italian-ISDT train+dev+test + PUD →
  15167 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (mạo từ theo âm
  đầu, essere/avere, tu/Lei, c/g mềm-cứng). HONORIFIC not-applicable: tự áp
  tiền lệ es B-02. Chính sách dấu phụ: tự áp tiền lệ es B-03 (cảnh báo nhẹ).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 89403 từ).** 6 quy tắc sạch:
  gn→[ɲ] 0.29%, ci→[t͡ʃ] 0.57%, ce 0.17%, chi→[k] 1.03%, gh→[ɡ] 0%, sci→[ʃ] 0%.
  Nâng `grapheme_to_phoneme` → VALIDATED (high). **Phát hiện real-data:**
  gli→[ʎ] CHỈ giữa từ; đầu từ gli-=[ɡli] (check ^gli=>^ʎ bắn 78.85%) → sửa mô
  tả theo dữ liệu, không giữ giả thuyết sai.
- 2026-07-19 — **Bước 3 (corpus-check 15167 câu).** month-weekday-not-
  capitalized: 0.03% (5/15167, tựa phim/tên riêng) — cực sạch, casing có bằng
  chứng corpus. Các check khác dùng `assert custom` (cần POS/parse).
- 2026-07-19 — **Bước 4 (review-checklist).** 2 mục quyết định sản phẩm:
  D-it-01 (baseline it-IT), D-it-02 (answer acceptance dấu phụ — tự áp tiền lệ
  es B-03). Sự kiện ngôn ngữ Ý thuần tuý → `native-review-it.md`. Trạng thái
  dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** `casing` NÂNG DRAFT→VALIDATED:
  V3 corpus-check THẬT 15167 câu (trên 10k) — month-weekday-not-capitalized
  0.03%, quy tắc hợp lệ; V1 Crusca/Treccani + V2 giáo trình + V4/V5 đồng thuận.
  Owner decisions D-it-01 (baseline it-IT) + D-it-02 (answer_acceptance B 'cảnh
  báo nhẹ', owner CHỦ ĐỘNG giữ DRAFT) tra lại 5 vòng — XÁC NHẬN ĐÚNG, KHÔNG nghi
  ngờ: dấu tiếng Ý (à è é ì ò ù) đều là dấu-trọng-âm, KHÔNG có chữ cái riêng
  kiểu ñ/pl → B hợp lý, khác es (es có ñ — xem owner-review-queue SUS-01). Giữ
  answer_acceptance_it DRAFT theo ý owner. Còn DRAFT cần người bản ngữ:
  syllable_stress, gender/number agreement, definite_articles, verb_conjugation,
  auxiliary_selection (essere/avere — khó điển hình), clitic_pronouns, word_order,
  diacritics_orthography. Status ngôn ngữ KHÔNG đổi.
