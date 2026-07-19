---
id: cs/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Czech Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR cs → `orthography.data.json`; UD Czech-CAC →
  `word-class.data.json`; WikiPron `ces_latn_narrow` (65070 cặp) →
  `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 34869 câu (UD CAC + FicTree) →
  `tools/cache/corpus/cs-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** š/ž/č/ř/ch/ň + độ dài á/í/ý sạch (0.00–0.45%);
  ž→[ʃ] khi làm câm/đồng hoá → `grapheme_to_phoneme` + `final_devoicing` +
  `palatalization` VALIDATED. Âm ř→[r̝] xác nhận 0.00%.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.01%** trên
  34869 câu (họ người) — casing có bằng chứng corpus.

## Invariant (tools/validate.mjs)

Ngôn ngữ cs phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Séc. Nặng hình thái (7 cách, thể, giống+animacy,
clitic vị trí hai) phần lớn ở lexical_level, cần bảng dữ liệu + native review.
