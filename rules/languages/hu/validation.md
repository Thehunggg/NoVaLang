---
id: hu/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Hungarian Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR hu → `orthography.data.json`; UD
  Hungarian-Szeged → `word-class.data.json`; WikiPron `hun_latn_narrow` (64764
  cặp, bộ RẤT LỚN) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 1800 câu (UD Hungarian-Szeged train/dev/test) →
  `tools/cache/corpus/hu-sentences.txt` (không commit). **DƯỚI 2000 (1800) —
  corpus check YẾU** (chỉ có Szeged cho hu); tool tự cảnh báo. Ghi rõ.
- **g2p-check (Bước 3):** sz→[s] 1.25% (âm quan trọng: sz=s không phải ʃ),
  cs→[t͡ʃ] 1.25%, ny→[ɲ] 0.02% — SẠCH → `grapheme_to_phoneme` VALIDATED. gy→[ɟ]
  10.12% và zs→[ʒ] 15.61% cao hơn (phiên âm narrow + đồng hoá + gy/zs hiếm ở
  vài vị trí) — dưới ngưỡng 20%, ghi rõ là narrow-transcription noise, không
  phải rule sai. WikiPron RẤT LỚN → g2p mạnh.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.00–0.17%** trên
  1800 câu → `casing` VALIDATED nhưng bằng chứng YẾU hơn (corpus nhỏ, ~99 lần
  xuất hiện).

## Ghi chú dữ liệu (trung thực)

WikiPron RẤT LỚN (64764) → g2p mạnh (điểm mạnh). NHƯNG corpus CHỈ 1800 (dưới
2000) → casing check yếu hơn hr/ca, ghi rõ. Hình thái chắp dính (hoà âm, ~18
hậu tố cách, định/bất định) ở lexical/paradigm — cần bảng hậu tố + người bản
ngữ.

## Invariant (tools/validate.mjs)

Ngôn ngữ hu phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Hungary. g2p mạnh (corpus yếu, ghi rõ); hoà âm +
chắp dính + định/bất định ở lexical/paradigm_level.
