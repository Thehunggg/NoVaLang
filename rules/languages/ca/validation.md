---
id: ca/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Catalan Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR ca → `orthography.data.json`; UD
  Catalan-AnCora → `word-class.data.json`; WikiPron `cat_latn_broad` (176 cặp —
  RẤT NHỎ) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 16678 câu (UD Catalan-AnCora train/dev/test) →
  `tools/cache/corpus/ca-sentences.txt` (không commit). **TRÊN mốc 10000** —
  corpus check ĐẦY ĐỦ, tin cậy.
- **g2p-check (Bước 3):** WikiPron ca CHỈ 176 cặp — **QUÁ NHỎ, KHÔNG đáng tin**:
  ç→s áp dụng 0, ll→ʎ 58% "vi phạm" (do yod hoá phương ngữ + đồng hoá), ny→ɲ 0%
  nhưng chỉ 2 mẫu. KHÔNG dùng g2p-check làm bằng chứng dương cho ca; g2p tổng
  quát giữ medium, phụ âm dựa kiến thức chuẩn, nguyên âm (giảm nguyên âm) lexical
  cần audio.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.05%** trên
  16678 câu → `casing` VALIDATED. Đo thêm trực tiếp: ç 11.60% câu, l·l 7.37% câu
  (đặc trưng thật, thường xuyên); ¿¡ chỉ 0.84% (chuẩn Catalan không dùng dấu lật
  ngược, khác es).

## Ghi chú dữ liệu (trung thực)

Corpus ca LỚN (16678, trên 10k) → casing/ç/l·l/dấu câu rất chắc. NHƯNG WikiPron
ca RẤT NHỎ (176) → g2p KHÔNG đáng tin, chỉ medium; giảm nguyên âm + pronoms
febles ở lexical, cần audio — ghi rõ, không giả vờ đủ.

## Invariant (tools/validate.mjs)

Ngôn ngữ ca phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Catalan. Ngữ pháp Roman quen nhưng giảm nguyên âm
+ pronoms febles + passat perifràstic ở lexical_level; phát âm cần audio.
