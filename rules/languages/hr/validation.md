---
id: hr/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Croatian Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR hr → `orthography.data.json`; UD Croatian-SET
  → `word-class.data.json`; WikiPron `hbs_latn_broad` (27457 cặp, bộ lớn) →
  `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 9010 câu (UD Croatian-SET train/dev/test) →
  `tools/cache/corpus/hr-sentences.txt` (không commit). **GẦN mốc 10000** (9010,
  hơi dưới) nhưng trên sàn 2000 nhiều — ghi rõ hơi dưới 10k.
- **g2p-check (Bước 3):** č→[t͡ʃ] 1.09%, ć→[t͡ɕ] 1.90%, š→[ʃ] 0.31%, ž→[ʒ]
  0.33%, c→[t͡s] 0.95% — TẤT CẢ SẠCH trên 27457 từ → `grapheme_to_phoneme`
  VALIDATED (chắc). Croatia là hệ chính tả cực đều; chỉ pitch accent (4 kiểu,
  không đánh dấu) là lexical.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.00%** trên
  9010 câu → `casing` VALIDATED (bằng chứng rất mạnh).

## Ghi chú dữ liệu (trung thực)

WikiPron LỚN (27457) + chính tả đều → g2p rất chắc (khác ca/da — hr g2p là điểm
mạnh). Corpus 9010 hơi dưới 10k (chỉ có UD-SET) nhưng đủ mạnh cho casing. Hình
thái Slav (7 cách, thể) ở lexical/paradigm_level — cần bảng biến cách + người
bản ngữ; ghi rõ.

## Invariant (tools/validate.mjs)

Ngôn ngữ hr phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Croatia. g2p + casing chắc, nhưng 7 cách + thể +
enclitic ở lexical/paradigm_level; pitch accent cần audio.
