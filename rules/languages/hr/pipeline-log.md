# hr — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-20 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn Slav. Baseline hr-HR štokavian (tự
  quyết, D-hr-01). Latin (Gaj), KHÁC sr Cyrillic.
- 2026-07-20 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr hr` →
  `orthography.data.json`. WikiPron `hbs_latn_broad` (27457 cặp — Serbo-Croatian
  macrolang Latin, dùng cho hr; bộ LỚN) → `grapheme-to-phoneme.data.json`.
  `ud hr` (Croatian-SET test) → `word-class.data.json`. Corpus: UD Croatian-SET
  train/dev/test → 9010 câu (gần 10000, hơi dưới).
- 2026-07-20 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (7 cách, thể
  perfective/imperfective, enclitic vị trí 2, ti/Vi, không mạo từ, pitch accent).
  HONORIFIC not-applicable: tự áp tiền lệ es B-02. Chấm thiếu č/ć/š/ž/đ: tự áp
  tiền lệ pl D-64.
- 2026-07-20 — **Bước 3 (g2p-check WikiPron 27457 từ).** č→[t͡ʃ] 1.09%, ć→[t͡ɕ]
  1.90%, š→[ʃ] 0.31%, ž→[ʒ] 0.33%, c→[t͡s] 0.95% — TẤT CẢ SẠCH → chính tả
  Croatia cực đều, `grapheme_to_phoneme` VALIDATED (chắc). Chỉ pitch accent
  (4 kiểu, không đánh dấu) là lexical, cần audio.
- 2026-07-20 — **Bước 3 (corpus-check 9010 câu).** month-weekday-not-
  capitalized: **0.00%** → `casing` VALIDATED (bằng chứng rất mạnh). Đo trực
  tiếp: č 57%, ć 47%, š 54%, ž 42%, đ 21% câu (chữ riêng cực thường xuyên).
- 2026-07-20 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-hr-01 (baseline hr-HR, v1), D-hr-02 (ti/Vi đối lập, v2), D-hr-03 (trình tự
  dạy cách, v2), D-hr-04 (chấm thiếu č/ć/š/ž/đ — áp tiền lệ pl D-64). Sự kiện
  ngôn ngữ Croatia thuần tuý → `native-review-hr.md`. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
