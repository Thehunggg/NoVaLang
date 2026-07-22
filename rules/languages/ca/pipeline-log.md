# ca — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn Romance (es/it/ro). Baseline ca
  Central/IEC (tự quyết, D-ca-01). Central Catalan, KHÔNG Valencian.
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr ca` →
  `orthography.data.json`. WikiPron `cat_latn_broad` (176 cặp — RẤT NHỎ) →
  `grapheme-to-phoneme.data.json`. `ud ca` (Catalan-AnCora test) →
  `word-class.data.json`. Corpus: UD Catalan-AnCora train/dev/test → 16678 câu
  (TRÊN 10000 — đầy đủ).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (ç/l·l, giảm
  nguyên âm, passat perifràstic, pronoms febles hi/en, tu/vostè, apostrophe/rút
  gọn). HONORIFIC not-applicable: tự áp tiền lệ es B-02. Chấm điểm: tách 2 loại
  dấu — ç/l·l áp pl D-64, dấu trọng âm áp es D-74.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 176 từ).** **QUÁ NHỎ, KHÔNG đáng
  tin:** ç→s áp dụng 0, ll→ʎ 58% "vi phạm" (yod hoá phương ngữ mirall→[j] +
  đồng hoá enlloc→[ɲ]), ny→ɲ 0% nhưng 2 mẫu. **Trung thực dữ liệu:** KHÔNG dùng
  g2p-check làm bằng chứng dương cho ca; giữ g2p medium, phụ âm dựa kiến thức
  chuẩn, giảm nguyên âm lexical cần audio.
- 2026-07-19 — **Bước 3 (corpus-check 16678 câu).** month-weekday-not-
  capitalized: **0.05%** (8/16678, tên riêng/festival "Saló d'Octubre") →
  `casing` VALIDATED. Đo trực tiếp: ç 11.60% câu, l·l 7.37% câu (đặc trưng
  thật), ¿¡ 0.84% (chuẩn Catalan không dùng dấu lật ngược, KHÁC es). Corpus lớn
  → orthography có bằng chứng mạnh.
- 2026-07-19 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-ca-01 (baseline ca Central/IEC, v1), D-ca-02 (tu/vostè đối lập, v2), D-ca-03
  (passat perifràstic làm quá khứ chuẩn, v2), D-ca-04 (chấm 2 loại dấu — ç/l·l
  pl D-64, dấu trọng âm es D-74). Sự kiện ngôn ngữ Catalan thuần tuý →
  `native-review-ca.md`. Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG
  FROZEN (ADR-014).
