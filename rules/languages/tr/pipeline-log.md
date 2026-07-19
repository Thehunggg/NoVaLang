# tr — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng. Typology
  chắp dính + hoà âm → KHÓ → 5 vòng. Baseline tr-TR (tự quyết, D-tr-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr tr` →
  `orthography.data.json`. WikiPron `tur_latn_broad` (12321 cặp) →
  `grapheme-to-phoneme.data.json`. `ud tr` (Turkish-BOUN test) →
  `word-class.data.json`. Corpus: UD Turkish-BOUN train/dev/test → 9761 câu
  (gần 10000, trên sàn 2000 rất nhiều).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn (hoà âm 2/4 chiều, biến âm,
  6 cách, chắp dính, evidential -miş, SOV, sen/siz, ı/i). HONORIFIC
  not-applicable: es B-02. Chấm thiếu chữ riêng: pl D-64. reading-aid
  not-applicable (chữ Latin).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 12321 từ).** ş 0.16%, j 1.75%, ü
  0.77%, ı 1.29% → `grapheme_to_phoneme` VALIDATED. Kỷ luật dữ liệu: c 21% / ç
  17% "vi phạm" = tie-bar-vs-space tokenization WikiPron (ç→[t͡ʃ]/c→[d͡ʒ] đúng
  100%, kiểm tay Acem→[a d͡ʒ e m]); ö 18% = narrow [œ]/[ø]. Không phải rule sai.
- 2026-07-19 — **Bước 3 (corpus-check 9761 câu).** no-q-w-x-native 1.14% (từ
  ngoại lai). **KỶ LUẬT DỮ LIỆU (corpus mâu thuẫn giả thuyết → sửa theo dữ
  liệu):** ban đầu định áp check 'month-always-lowercase' như es/it; corpus cho
  thấy 0.98% tháng/thứ VIẾT HOA — điều tra thấy tiếng Thổ (TDK) HOA tháng/thứ ở
  NGÀY CỤ THỂ (5 Aralık), thường khi chung → BỎ check month-lowercase, ghi rõ
  quy tắc ngữ cảnh-ngày. casing giữ medium (cần native cho ranh giới).
- 2026-07-19 — **Bước 4 (review-checklist).** 5 mục quyết định sản phẩm:
  D-tr-01 (baseline tr-TR), D-tr-02 (chuẩn TDK), D-tr-03 (reading-aid N/A),
  D-tr-04 (chấm thiếu chữ riêng — circumflex khoan dung + locale casing),
  D-tr-05 (dạy đối lập sen/siz + Bey/Hanım). Sự kiện ngôn ngữ Thổ thuần tuý →
  `native-review-tr.md` (7 mục). Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
