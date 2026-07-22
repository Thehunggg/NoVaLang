---
id: nb/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Norwegian Bokmål Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR nb → `orthography.data.json`; UD
  Norwegian-Bokmaal → `word-class.data.json`; WikiPron `nob_latn_broad` (3432
  cặp, bộ nhỏ) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 20044 câu (UD Norwegian-Bokmaal train/dev/test) →
  `tools/cache/corpus/nb-sentences.txt` (không commit). **TRÊN mốc 10000** —
  corpus check ĐẦY ĐỦ, tin cậy.
- **g2p-check (Bước 3):** æ→[æ/ɛ] 0.00%, ø→[ø/œ] 0.44%, å→[ɔ/oː] 8.02%,
  sj-lyd→[ʂ/ʃ] 0.00%, kj→[ç] 12.09% → `grapheme_to_phoneme` VALIDATED cho các
  chữ/tổ hợp đó. Phần còn lại (pitch accent, âm câm hv/gj, d/g cuối câm) là
  lexical — ghi rõ, không nâng cả hệ. WikiPron nhỏ (3432) nên g2p tổng quát chỉ
  medium.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.08%** trên
  20044 câu — casing có bằng chứng corpus mạnh.

## Ghi chú dữ liệu (trung thực)

Corpus nb LỚN (20044, trên 10k) → casing/orthography rất chắc. NHƯNG WikiPron
nhỏ (3432) → g2p tổng quát chỉ medium; chỉ æ/ø/å + sj/kj validated. Pitch accent
+ âm câm ở lexical_level, cần audio — ghi rõ, không giả vờ đủ.

## Invariant (tools/validate.mjs)

Ngôn ngữ nb phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Na Uy. Ngữ pháp đơn giản (như sv/da) nhưng pitch
accent + giống + động từ mạnh ở lexical_level; phát âm cần audio.
