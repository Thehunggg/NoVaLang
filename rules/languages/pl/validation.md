---
id: pl/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Polish Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR pl → `orthography.data.json` (32 chữ); UD
  Polish-PDB → `word-class.data.json`; WikiPron `pol_latn_broad` (157042 cặp)
  → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 35926 câu (UD PDB + LFG) →
  `tools/cache/corpus/pl-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** 15 quy tắc chữ→âm sạch (0.00–3.69%), kể cả làm mềm
  theo i (dz→d͡ʑ), làm câm cuối từ (b/d/g), rz devoicing → `grapheme_to_phoneme`
  + `final_devoicing` + `consonant_palatalization` + `nasal_vowels` VALIDATED.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.02%** trên
  35926 câu (vi phạm là họ người) — casing có bằng chứng corpus mạnh.

## Invariant (tools/validate.mjs)

Ngôn ngữ pl phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Ba Lan để kiểm false-positive. Ngôn ngữ nặng
hình thái (7 cách, thể, giống nam-người, số từ) — phần lớn ở lexical_level,
cần bảng dữ liệu + native review trước khi lên nội dung thật.
