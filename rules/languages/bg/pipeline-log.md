# bg — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng. Hệ chữ
  Kirin → 5 vòng. Baseline bg-BG (tự quyết, D-bg-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr bg` →
  `orthography.data.json`. WikiPron `bul_cyrl_narrow` (47572 cặp — rất lớn) →
  `grapheme-to-phoneme.data.json`. `ud bg` (Bulgarian-BTB test) →
  `word-class.data.json`. Corpus: UD Bulgarian-BTB train/dev/test → 11138 câu
  (TRÊN 10000 — đầy đủ).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn (mất cách, mạo từ hậu tố,
  không nguyên mẫu, evidential -л, ти/Вие, ъ nguyên âm). HONORIFIC
  not-applicable: es B-02. Chấm sai chữ Kirin: pl D-64. Không chuyển tự Latin:
  D-bg-03.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 47572 từ).** Phụ âm sạch: ш 0.00%,
  ч 0.08%, ц 0.25%, х 0.00%, ж 4.22% (biến âm cuối) → `grapheme_to_phoneme`
  VALIDATED. Kỷ luật dữ liệu: щ→[ʃt] 100% "vi phạm" = tokenization ('ʃ t' tách,
  đúng 100% kiểm tay); ъ→[ɤ] 67% "vi phạm" = giảm nguyên âm (nhấn [ɤ]/không
  nhấn [ɐ]) — quy tắc âm vị học, không phải rule sai.
- 2026-07-19 — **Bước 3 (corpus-check 11138 câu).** month-weekday-not-capitalized
  0.00%; no-non-bulgarian-cyrillic (ы э ё і...) 0.00% → casing + bảng chữ có
  bằng chứng corpus đầy đủ.
- 2026-07-19 — **Bước 4 (review-checklist).** 5 mục quyết định sản phẩm:
  D-bg-01 (baseline bg-BG), D-bg-02 (chuẩn Институт), D-bg-03 (không chuyển tự
  Latin), D-bg-04 (chấm C — sai chữ Kirin = sai, bg không dấu phụ nên không
  ngoại lệ khoan dung), D-bg-05 (dạy ти/Вие). Sự kiện ngôn ngữ Bulgaria thuần
  tuý → `native-review-bg.md` (7 mục). Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
