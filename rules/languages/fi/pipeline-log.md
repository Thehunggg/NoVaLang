# fi — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 25 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/nl/pl/sv.
  Ngôn ngữ Ural (Uralic) chắp dính — T1 phi-Ấn-Âu đầu tiên. Baseline fi-FI
  yleiskieli (tự quyết, review-checklist D-fi-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr fi` →
  `orthography.data.json` (a e i o u y ä ö). WikiPron `fin_latn_broad` (173449
  cặp) → `grapheme-to-phoneme.data.json`. `ud fi` (Finnish-TDT test) →
  `word-class.data.json`. Corpus: UD Finnish-TDT + FTB train/dev/test → 30117
  câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (15 cách, hoà âm,
  luân phiên phụ âm, phủ định ei, không giống/mạo từ, sinä/te, yleiskieli/
  puhekieli). HONORIFIC not-applicable: tự áp tiền lệ es B-02. Chấm thiếu ä/ö:
  tự áp tiền lệ pl D-64 (dấu là chữ + phá hoà âm → thiếu = sai).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 173449 từ).** Chính tả 1:1 minh
  bạch: aa→[ɑː] 0.01%, ää→[æː] 0.00%, ii→[iː] 0.00%, uu→[uː] 0.01%, kk→[kː]
  0.18%, tt→[tː] 0.26%, ä→[æ] 0.02%, ö→[ø] 0.00%, y→[y] 1.07%, ng→[ŋː] 2.38%.
  Nâng `grapheme_to_phoneme` + `vowel_length` + `consonant_length` → VALIDATED
  (hệ chữ→âm sạch nhất đã build). **Kỷ luật dữ liệu:** nk→[ŋk] bắn 41.12% vì
  phần lớn TỪ GHÉP (Anjalan+koski) giữ [nk] qua ranh giới hình vị → giữ medium/
  lexical, không giả vờ high.
- 2026-07-19 — **Bước 3 (corpus-check 30117 câu).** month-weekday-not-
  capitalized: **0.00%** — cực sạch, casing có bằng chứng corpus. Check khác
  (hoà âm, phủ định) dùng `assert custom` (cần phân tích hình thái).
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-fi-01 (baseline fi-FI, vòng 1), D-fi-02 (yleiskieli vs puhekieli — vòng 2,
  dạy chuẩn viết + cảnh báo khẩu ngữ), D-fi-03 (chấm thiếu ä/ö — áp tiền lệ pl
  D-64, thiếu = sai). Sự kiện ngôn ngữ Phần Lan thuần tuý (15 cách, luân phiên,
  hoà âm) → `native-review-fi.md`. Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
