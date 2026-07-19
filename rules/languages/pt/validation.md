---
id: pt/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Portuguese Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR pt → `orthography.data.json`; UD
  Portuguese-GSD → `word-class.data.json`; WikiPron `por_latn_bz_broad_filtered`
  (187421 cặp) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 21377 câu (UD GSD + Bosque) → `tools/cache/corpus/pt-sentences.txt`
  (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** 9 quy tắc chữ→âm sạch (<1% mỗi quy tắc, xem
  `pronunciation.md`). `grapheme_to_phoneme` → VALIDATED high.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` vi phạm 1.64%
  trên câu thật (dưới ngưỡng 20%, phần lớn tên riêng/quy ước cũ) — casing có
  bằng chứng corpus.

## Invariant (tools/validate.mjs)

Ngôn ngữ pt phải pass 9 invariant. INV-9 (map hiện tượng): mọi hiện tượng mặc
định (writing_systems, word_class, word_order, phoneme_inventory,
tts_audio_policy, register_taxonomy, forms_of_address, punctuation_layout,
reading_aid_policy, naturalness_translation, answer_acceptance_pt) đều ≥ medium
ở rule_level — không có confidence:none bị generator dùng.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Bồ để kiểm false-positive trên nội dung.
