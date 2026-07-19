# cs — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 25 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/nl/pl/sv/fi.
  Slav Tây Latin-script phức tạp. Baseline cs-CZ spisovná (tự quyết, D-cs-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr cs` →
  `orthography.data.json` (háček + acute + ů). WikiPron `ces_latn_narrow`
  (65070 cặp — chỉ narrow) → `grapheme-to-phoneme.data.json`. `ud cs`
  (Czech-CAC test) → `word-class.data.json`. Corpus: UD Czech-CAC + FicTree
  train/dev/test → 34869 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (7 cách, thể,
  giống+animacy, clitic vị trí hai, spisovná/obecná). HONORIFIC not-applicable:
  tự áp tiền lệ es B-02. Chấm thiếu dấu: tự áp tiền lệ pl D-64.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron narrow 65070 từ).** š→[ʃ] 0.05%,
  ž→[ʒ]/[ʃ] 0.00%, č→[t͡ʃ]/[d͡ʒ] 0.00%, ř→[r̝] 0.00% (âm đặc trưng), ch→[x]
  0.45%, ň→[ɲ] 0.00%, á→[aː] 0.00%, í→[iː] 0.00%, ý→[iː] 0.03%. Nâng
  `grapheme_to_phoneme` + `final_devoicing` + `palatalization` → VALIDATED.
  **Kỷ luật dữ liệu:** ž phẳng bắn 16.63% → làm câm/đồng hoá thành [ʃ] cuối từ +
  trước vô thanh (Ambrož→[ʃ], Anežka→[ʃk]); thêm [ʃ] → 0.00%.
- 2026-07-19 — **Bước 3 (corpus-check 34869 câu).** month-weekday-not-
  capitalized: **0.01%** (2/34869, họ người Sobota + đầu câu Květen) — casing
  có bằng chứng corpus. Check khác dùng `assert custom`.
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-cs-01 (baseline cs-CZ, vòng 1), D-cs-02 (spisovná vs obecná — vòng 2, dạy
  chuẩn viết + cảnh báo), D-cs-03 (chấm thiếu dấu — áp tiền lệ pl D-64). Sự kiện
  ngôn ngữ Séc thuần tuý (7 cách, animacy, clitic) → `native-review-cs.md`.
  Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
