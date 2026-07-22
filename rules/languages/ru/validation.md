---
id: ru/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Russian Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR ru → `orthography.data.json` (33 chữ Kirin);
  UD Russian-GSD → `word-class.data.json`; WikiPron `rus_cyrl_narrow` (466668
  cặp) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 22736 câu (UD GSD + SynTagRus) →
  `tools/cache/corpus/ru-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** phụ âm ш/щ/ц/х/ч sạch (<4.4%); LÀM CÂM CUỐI TỪ
  (final devoicing) г/б/д/з sạch (0.58–3.12%). `grapheme_to_phoneme` +
  `palatalization` → VALIDATED. Nguyên âm giảm phụ thuộc trọng âm không đánh
  dấu → medium (không g2p-check được bằng regex tĩnh, ghi rõ).
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.00%** trên
  22736 câu thật — casing có bằng chứng corpus mạnh.

## Invariant (tools/validate.mjs)

Ngôn ngữ ru phải pass 9 invariant. INV-9: mọi hiện tượng mặc định
(writing_systems, word_class, word_order, phoneme_inventory, tts_audio_policy,
register_taxonomy, forms_of_address, punctuation_layout, reading_aid_policy,
naturalness_translation, answer_acceptance_ru) đều ≥ medium ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Nga để kiểm false-positive trên nội dung.
Hình thái nặng (6 cách, thể động từ, trọng âm di động) phần lớn ở lexical_level
— cần bảng dữ liệu + native review trước khi lên nội dung thật.
