# id — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng. Latin,
  không biến tố → DỄ, nhưng vẫn 5 vòng. Baseline id-ID (tự quyết, D-id-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr id` →
  `orthography.data.json`. WikiPron `ind_latn_broad` (18590 cặp) →
  `grapheme-to-phoneme.data.json`. `ud id` (Indonesian-GSD test) →
  `word-class.data.json`. Corpus: UD Indonesian-GSD train/dev/test → 5598 câu
  (DƯỚI 10000 — ghi rõ, trên sàn 2000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn (không biến tố, thì-hư-từ,
  meN- biến âm mũi, láy, đại từ lịch sự, 'e' schwa). HONORIFIC not-applicable
  hình thái: es B-02. reading-aid N/A (Latin). answer_acceptance = _base (id
  không có chữ-cái-riêng).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 18590 từ).** Digraph ny 0.68%, ng
  0.67%, sy 6.76% → `grapheme_to_phoneme` VALIDATED. Kỷ luật dữ liệu: c/j
  5.41%/4.42% "vi phạm" = tie-bar-vs-space tokenization (đúng); y→[j] 44.80% =
  y trong digraph ny/sy (digraph-precedence); 'e' [e]/[ə] schwa lexical.
- 2026-07-19 — **Bước 3 (corpus-check 5598 câu).** KỶ LUẬT DỮ LIỆU (như tr):
  KHÔNG áp check 'month-always-lowercase' — corpus cho thấy tiếng Indonesia VIẾT
  HOA tháng/thứ (255 hoa vs 3 thường) như Anh. id không có chữ đặc thù để làm
  regex_absent → check orthography là custom (casing + láy dấu nối).
- 2026-07-19 — **Bước 4 (review-checklist).** 5 mục quyết định sản phẩm:
  D-id-01 (baseline id-ID), D-id-02 (chuẩn EYD V/Badan Bahasa), D-id-03
  (reading-aid N/A), D-id-04 (answer_acceptance dùng _base — id không có
  chữ-cái-riêng nên không cần luật C riêng), D-id-05 (dạy đại từ lịch sự, mức
  baku). Sự kiện ngôn ngữ Indonesia thuần tuý → `native-review-id.md` (7 mục).
  Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
