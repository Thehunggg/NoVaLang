# fil — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-20 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` (orthography check chữ Latin vì casing hoa
  tháng/thứ theo en/es, không lowercase). Baseline fil-PH (tự quyết, D-fil-01).
- 2026-07-20 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr fil` →
  `orthography.data.json`. WikiPron `tgl_latn_broad` (28295 cặp — LỚN, có ghi
  âm tắc thanh hầu ʔ) → `grapheme-to-phoneme.data.json`. `ud fil`
  (Tagalog-Ugnayan test, RẤT NHỎ 94) → `word-class.data.json`. Corpus: UD
  Tagalog TRG + Ugnayan → 222 câu (RẤT NHỎ, dưới 2000 nhiều — Tagalog không có
  UD lớn).
- 2026-07-20 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (hệ tiêu điểm/
  trigger, phụ tố + trùng lặp, tiểu từ ang/ng/sa, po/ho, VSO). Corpus quá nhỏ →
  nhiều mục medium/DRAFT, ghi rõ cần người bản ngữ. HONORIFIC not-applicable
  (po/ho ~ register, es B-02).
- 2026-07-20 — **Bước 3 (g2p-check WikiPron 28295 từ).** ng→[ŋ] 0.59% (sạch) →
  `grapheme_to_phoneme` VALIDATED. **Kỷ luật dữ liệu:** ép ny→[nj] báo 100% →
  'ny' KHÔNG phải digraph Tagalog (chỉ n+y ngẫu nhiên), BỎ giả thuyết (ưu tiên
  dữ liệu thật). Trọng âm + âm tắc thanh hầu không viết → lexical.
- 2026-07-20 — **Bước 3 (corpus-check 222 câu).** `content-latin-script` 0.00%
  (Latin). Casing: tháng/thứ VIẾT HOA (Enero/Lunes) → KHÔNG áp rule lowercase
  (giả thuyết lowercase bị dữ liệu bác, như tr/id). accents 0/222 → Filipino
  bỏ dấu. Corpus dưới 2000 — tool tự cảnh báo RẤT YẾU.
- 2026-07-20 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-fil-01 (baseline fil-PH, v1), D-fil-02 (po/ho baseline lịch sự, v2), D-fil-03
  (dạy Filipino chuẩn không Taglish, v2, product), D-fil-04 (accents tuỳ chọn,
  không bắt buộc — NGOẠI LỆ khoan dung). Sự kiện ngôn ngữ Filipino thuần tuý →
  `native-review-fil.md` (đặc biệt quan trọng, corpus nhỏ). Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
