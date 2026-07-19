# nb — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn Scandinavia (da/sv). Baseline
  nb-NO Bokmål (tự quyết, D-nb-01). Bokmål (nb), KHÔNG Nynorsk (nn).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr nb` →
  `orthography.data.json` (+ æ ø å). WikiPron `nob_latn_broad` (3432 cặp — bộ
  nhỏ) → `grapheme-to-phoneme.data.json`. `ud nb` (Norwegian-Bokmaal) →
  `word-class.data.json`. Corpus: UD Norwegian-Bokmaal train/dev/test → 20044
  câu (TRÊN 10000 — đầy đủ).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (hậu tố xác định +
  xác định kép giống sv, mạo từ ei/en/et cho phép gộp, động từ không chia ngôi,
  du phổ quát, pitch accent thay stød). HONORIFIC not-applicable: tự áp tiền lệ
  es B-02. Chấm thiếu æ/ø/å: tự áp tiền lệ pl D-64.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 3432 từ).** æ→[æ/ɛ] 0.00%, ø→[ø/œ]
  0.44%, å→[ɔ/oː] 8.02%, sj-lyd sj→[ʂ/ʃ] 0.00%, kj→[ç] 12.09% →
  `grapheme_to_phoneme` VALIDATED cho các chữ/tổ hợp này. **Trung thực dữ liệu:**
  pitch accent + âm câm (hv→v, gj→j, d/g cuối câm) KHÔNG g2p-validate được —
  lexical, ghi rõ, không nâng cả hệ. WikiPron nhỏ → g2p tổng quát medium.
- 2026-07-19 — **Bước 3 (corpus-check 20044 câu).** month-weekday-not-
  capitalized: **0.08%** (16/20044, tên riêng) — casing có bằng chứng corpus
  mạnh (corpus lớn, trên 10k).
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-nb-01 (baseline nb-NO Bokmål, vòng 1), D-nb-02 (dạy 3 giống chấp nhận gộp
  masc+fem, vòng 2), D-nb-03 (chấm thiếu æ/ø/å — áp tiền lệ pl D-64). Sự kiện
  ngôn ngữ Na Uy thuần tuý → `native-review-nb.md`. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
