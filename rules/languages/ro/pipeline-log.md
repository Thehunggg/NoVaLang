# ro — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/nl/pl/sv/fi/cs.
  Rôman Đông + Balkan Sprachbund phức tạp. Baseline ro-RO (tự quyết, D-ro-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr ro` →
  `orthography.data.json` (ă â î ș ț). WikiPron `ron_latn_broad` (9286 cặp — bộ
  nhỏ) → `grapheme-to-phoneme.data.json`. `ud ro` (Romanian-RRT test) →
  `word-class.data.json`. Corpus: UD Romanian-RRT + Nonstandard train/dev/test
  → 33645 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (mạo từ hậu tố,
  giống trung, cách rút gọn, giả định să, nhân đôi tân ngữ, â/î 1993). HONORIFIC
  not-applicable: tự áp tiền lệ es B-02. Chấm thiếu dấu: tự áp tiền lệ pl D-64.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 9286 từ).** ș→[ʃ] 0.16%, ț→[t͡s]
  2.33%, ă→[ə] 0.14%, â→[ɨ] 0.24%, î→[ɨ] 0.33%, ce→[t͡ʃ] 2.20%, ge→[d͡ʒ] 4.23%,
  che→[k] 2.13%, ghe→[ɡ] 13.33% (bộ nhỏ 15 từ). Nâng `grapheme_to_phoneme` →
  VALIDATED. c/g mềm-cứng như es/it xác nhận trên dữ liệu thật.
- 2026-07-19 — **Bước 3 (corpus-check 33645 câu).** month-weekday-not-
  capitalized: **0.08%** (26/33645, tên riêng "Lunii Ianuarie"/ngày trang
  trọng/thơ) — casing có bằng chứng corpus. Check khác dùng `assert custom`.
- 2026-07-19 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-ro-01 (baseline ro-RO, vòng 1), D-ro-02 (chính tả â/î quy tắc 1993 — vòng
  2), D-ro-03 (chấm thiếu dấu — áp tiền lệ pl D-64), D-ro-04 (tu/dumneavoastră,
  bỏ dumneata — vòng 2). Sự kiện ngôn ngữ Rumani thuần tuý (mạo từ hậu tố,
  giống trung, giả định) → `native-review-ro.md`. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
