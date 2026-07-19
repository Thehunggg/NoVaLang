# uk — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng. Hệ chữ
  Kirin → KHÓ → 5 vòng. Baseline uk-UA (tự quyết, D-uk-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr uk` →
  `orthography.data.json`. WikiPron `ukr_cyrl_narrow` (53021 cặp — RẤT LỚN) →
  `grapheme-to-phoneme.data.json`. `ud uk` (Ukrainian-IU test) →
  `word-class.data.json`. Corpus: UD Ukrainian-IU train/dev/test → 7092 câu
  (DƯỚI 10000 — ghi rõ, trên sàn 2000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn (33 chữ, г/ґ, 7 cách +
  vocative, thể động từ, quá khứ hợp giống, ти/ви, iotation). HONORIFIC
  not-applicable: es B-02. Chấm thiếu chữ riêng: pl D-64. Không chuyển tự Latin:
  D-uk-03.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 53021 từ).** Phụ âm <1% (ж 0.13%,
  ш 0.96%, ч 0.23%, ц 0.12%, х 0.70%, ґ 0.00%, ї 0.30%) → `grapheme_to_phoneme`
  VALIDATED. Kỷ luật dữ liệu: 'ю→ju' 97.48% 'vi phạm' = quy tắc iotation (я/ю/є
  sau phụ âm → mềm hoá + [a/u/e], không [ja/ju/je]; ї luôn [ji]) — g2p đúng
  ngữ cảnh, giữ rule, ghi rõ.
- 2026-07-19 — **Bước 3 (corpus-check 7092 câu).** month-weekday-not-capitalized
  0.00%; no-russian-only-letters (ы э ъ ё) 0.06% (4 câu trích dẫn) → casing +
  bảng chữ có bằng chứng corpus.
- 2026-07-19 — **Bước 4 (review-checklist).** 5 mục quyết định sản phẩm:
  D-uk-01 (baseline uk-UA), D-uk-02 (Правопис 2019), D-uk-03 (không chuyển tự
  Latin), D-uk-04 (chấm thiếu chữ riêng + dấu nháy — lưu ý ґ/г khoan dung),
  D-uk-05 (dạy đối lập ти/ви + vocative). Sự kiện ngôn ngữ Ukraina thuần tuý →
  `native-review-uk.md` (7 mục). Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
