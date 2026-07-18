# es — Pipeline log

Không có front-matter (log nội bộ, cùng quy ước ja/en/ko/pipeline-log.md).

- 2026-07-18 — **Bước 0 (inventory).** Tier = t1-only (learning, không có vai
  native — `roles: ["learning"]` trong `rules/catalog.json`, khác ko có cả
  t1+t3). 22 hiện tượng trong `coverage.json`. Không lặp lại toàn bộ chốt
  chặn khuôn chi tiết như ko (đã xác nhận cơ chế .rules.json/.md front-matter
  hoạt động đúng với ko) — nhưng vẫn kiểm nhanh: 4 file `.rules.json` khớp
  đúng top-level key set với ja/en/ko.
- 2026-07-18 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr es` ->
  `orthography.data.json`. WikiPron: chỉ có bản `spa_latn_la_broad_filtered.tsv`
  (Latin America, đã thử es/mx/ar/co/ni — không tồn tại) -> 132249 cặp ->
  `grapheme-to-phoneme.data.json`. `ud es --url UD_Spanish-GSD test` ->
  `word-class.data.json`. Corpus Bước 3: UD Spanish-GSD train+dev+test +
  UD_Spanish-PUD -> `tools/cache/corpus/es-sentences.txt`, 17013 câu (vượt
  mốc 10000, không yếu; nguồn chủ yếu báo/web Tây Ban Nha Peninsular).
- 2026-07-18 — **Bước 2 (derive) — 3 truy vấn WebSearch độc lập.** (1) Quy
  tắc trọng âm/tilde: 4 nguồn phụ (SpanishDict/StudySpanish/Berges/Orbis
  Latinus) đồng thuận HOÀN TOÀN, không lệch — confidence:medium (snippet,
  chưa đối chiếu RAE Ortografía gốc). (2) voseo/seseo: RAE Diccionario
  panhispánico de dudas (qua snippet) xác nhận voseo là "đặc trưng vùng"
  (Argentina/Uruguay/Trung Mỹ), KHÔNG phải chuẩn quốc tế — seseo "được chấp
  nhận hoàn toàn trong chuẩn mực văn hoá" khắp Mỹ Latin + một phần Tây Ban
  Nha (Canarias/Andalucía). Đây là bằng chứng trực tiếp cho đề xuất baseline
  dialect (GIẢ ĐỊNH B-01).
- 2026-07-18 — **Bước 3 (corpus check) trên 17013 câu UD Spanish-GSD/PUD
  thật.** `orthography.rules.json` check `month-weekday-not-capitalized`:
  102/17013 (0.60%) vi phạm — "ok" (dưới ngưỡng RULE NGHI NGỜ SAI), 102 câu
  là biến thể phong cách thật (viết hoa tháng trong ngày lễ/tiêu đề trang
  trọng) không phải bug. Không phát hiện check nào bị áp sai phạm vi lần này
  (khác ko, nơi 2 check phải sửa) — có thể vì đã rút kinh nghiệm từ ko, chỉ
  viết `checks[]` cho thứ THẬT SỰ kiểm được ở mức toàn-dòng văn bản, còn lại
  dùng `assert.type: custom` ngay từ đầu.
- 2026-07-18 — **`g2p-check.mjs` trên WikiPron (132249 từ).** 3 giả thuyết
  đều đúng phạm vi và sạch 100%: ñ->[ɲ] (2579 từ, 0%), qu (đầu từ)->[k] (564
  từ, 0%), z (đầu từ)->[s] (651 từ, 0% — XÁC NHẬN bản WikiPron 'la' dùng
  SESEO, bằng chứng trực tiếp cho GIẢ ĐỊNH B-01, không phải suy đoán). Nâng
  `grapheme_to_phoneme` lên VALIDATED.
