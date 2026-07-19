---
id: nl/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Dutch Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR nl → `orthography.data.json`; UD
  Dutch-Alpino → `word-class.data.json`; WikiPron `nld_latn_broad_filtered`
  (58535 cặp) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 30723 câu (UD Alpino + LassySmall) →
  `tools/cache/corpus/nl-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** ch/ij/ui/oe/sch/aa/oo/ng/ge sạch (0.17–18.69%); làm
  câm cuối từ d/b sạch → `grapheme_to_phoneme` + `final_devoicing` +
  `vowel_length_spelling` VALIDATED.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.09%** trên
  30723 câu (vi phạm là tên riêng ngày lễ) — casing có bằng chứng corpus.

## Invariant (tools/validate.mjs)

Ngôn ngữ nl phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Hà Lan để kiểm false-positive trên nội dung.
de/het + động từ mạnh + gốc giảm nhẹ ở lexical_level — cần bảng dữ liệu +
native review.
