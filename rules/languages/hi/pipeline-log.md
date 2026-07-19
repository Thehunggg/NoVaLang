# hi — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng. Devanagari
  abugida → KHÓ → 5 vòng. Baseline hi-IN (tự quyết, D-hi-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr hi` →
  `orthography.data.json`. WikiPron `hin_deva_broad` (33057 cặp — rất lớn) →
  `grapheme-to-phoneme.data.json`. `ud hi` (Hindi-HDTB test) →
  `word-class.data.json`. Corpus: UD Hindi-HDTB train/dev/test → 16649 câu
  (TRÊN 10000 — đầy đủ).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn (abugida, nukta, schwa,
  hậu giới từ, ergative, hợp giống, 3 mức तू/तुम/आप, danh từ trực tiếp/xiên).
  Casing NOT-APPLICABLE (unicameral). Chấm matra/phụ âm: pl D-64; nukta vay
  khoan dung. HONORIFIC partial-native (आप/जी) + es B-02.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 33057 từ).** Phụ âm gốc <1% (श 0.30%,
  भ 0.00%, थ 0.48%, ट 0.00%) → `grapheme_to_phoneme` VALIDATED. Kỷ luật dữ liệu:
  ख 19% / ज 21% / ड 60% "vi phạm" = NUKTA (chữ+nukta = âm khác: ड़[ɽ]/ज़[z]/
  ख़[x]/क़[q]/ग़[ɣ]/फ़[f]) — rule chữ-gốc đúng, nukta = chữ/âm riêng; schwa
  deletion lexical.
- 2026-07-19 — **Bước 3 (corpus-check 16649 câu).** danda । (regex_present):
  7.07% thiếu (mảnh câu/câu hỏi — rule hợp lệ 93%); no-Latin 0.55% (từ mượn) →
  punctuation + bảng chữ có bằng chứng corpus.
- 2026-07-19 — **Bước 4 (review-checklist).** 5 mục quyết định sản phẩm: D-hi-01
  (baseline hi-IN), D-hi-02 (chuẩn Devanagari), D-hi-03 (reading-aid — cân nhắc
  IAST nhập môn), D-hi-04 (chấm C matra/phụ âm + nukta vay khoan dung), D-hi-05
  (dạy 3 mức, आप baseline). Sự kiện ngôn ngữ Hindi thuần tuý →
  `native-review-hi.md` (7 mục). Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
