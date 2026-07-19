---
id: sv/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Swedish Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR sv → `orthography.data.json` (+ å ä ö); UD
  Swedish-Talbanken → `word-class.data.json`; WikiPron `swe_latn_broad` (5856
  cặp, bộ nhỏ) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 11734 câu (UD Talbanken + LinES) →
  `tools/cache/corpus/sv-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** sj/tj/ä/ö/å sạch (1.25–7.25%) → `grapheme_to_phoneme`
  VALIDATED. Mềm hoá âm đầu k/g/sk giữ **medium** (g2p bắn 35–73% do pitch
  marker + từ mượn — phát hiện thật, không giả vờ high).
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.00%** trên
  11734 câu — casing có bằng chứng corpus mạnh.

## Ghi chú dữ liệu

WikiPron sv nhỏ hơn các ngôn ngữ trước (5856 vs 58k–466k). Đủ xác nhận quy tắc
cốt lõi (sj/tj/vowel), nhưng bộ nặng tên riêng/từ mượn làm quy tắc mềm-hoá-âm-
đầu không g2p-validated được — ghi rõ, hạ medium thay vì cưỡng ép.

## Invariant (tools/validate.mjs)

Ngôn ngữ sv phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Thụy Điển để kiểm false-positive. en/ett + hậu
tố xác định + động từ mạnh + pitch accent ở lexical_level.
