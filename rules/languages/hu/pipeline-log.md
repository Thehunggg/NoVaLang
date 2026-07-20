# hu — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-20 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn Ural (fi). Baseline hu-HU (tự
  quyết, D-hu-01).
- 2026-07-20 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr hu` →
  `orthography.data.json`. WikiPron `hun_latn_narrow` (64764 cặp — RẤT LỚN) →
  `grapheme-to-phoneme.data.json`. `ud hu` (Hungarian-Szeged test) →
  `word-class.data.json`. Corpus: UD Hungarian-Szeged train/dev/test → 1800 câu
  (DƯỚI 2000 — corpus check yếu, chỉ có Szeged).
- 2026-07-20 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (chắp dính, hoà
  âm nguyên âm, ~18 hậu tố cách, chia định/bất định, te/ön, s/sz ngược Anh).
  HONORIFIC not-applicable: tự áp tiền lệ es B-02. Chấm thiếu á/é/ö/ő...: tự áp
  tiền lệ pl D-64.
- 2026-07-20 — **Bước 3 (g2p-check WikiPron 64764 từ).** sz→[s] 1.25%, cs→[t͡ʃ]
  1.25%, ny→[ɲ] 0.02% — SẠCH → `grapheme_to_phoneme` VALIDATED. gy→[ɟ] 10.12%,
  zs→[ʒ] 15.61% cao hơn (phiên âm narrow + đồng hoá; dưới ngưỡng 20%) — ghi rõ
  là noise, không phải rule sai. Chính tả Hungary đều; WikiPron rất lớn → g2p
  mạnh.
- 2026-07-20 — **Bước 3 (corpus-check 1800 câu).** month-weekday-not-
  capitalized: **0.00–0.17%** → `casing` VALIDATED nhưng bằng chứng YẾU (corpus
  dưới 2000, tool tự cảnh báo). Đo trực tiếp: á 94%, é 93%, ó 66%, ö 63%, ő 64%
  câu (chữ riêng cực thường xuyên).
- 2026-07-20 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-hu-01 (baseline hu-HU, v1), D-hu-02 (te/ön đối lập, v2), D-hu-03 (trình tự
  dạy hậu tố cách, v2), D-hu-04 (chấm thiếu á é í ó ö ő ú ü ű — áp tiền lệ pl
  D-64). Sự kiện ngôn ngữ Hungary thuần tuý → `native-review-hu.md`. Trạng thái
  dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
