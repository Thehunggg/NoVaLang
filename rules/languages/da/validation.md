---
id: da/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Danish Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR da → `orthography.data.json`; UD Danish-DDT
  → `word-class.data.json`; WikiPron `dan_latn_broad` (4773 cặp, bộ nhỏ) →
  `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 5512 câu (UD-DDT) → `tools/cache/corpus/da-sentences.txt`
  (không commit). **DƯỚI mốc 10000** (chỉ có UD-DDT cho da) nhưng trên sàn 2000
  — ghi rõ: corpus check của da yếu hơn các ngôn ngữ trước.
- **g2p-check (Bước 3):** CHỈ chữ nguyên âm æ/ø/å sạch (1.21–7.05%) →
  `grapheme_to_phoneme` VALIDATED cho các chữ đó. Phần còn lại (soft d, stød,
  âm câm) là lexical — ghi rõ, không nâng cả hệ (da là ngoại lệ minh bạch chính
  tả trong Germanic).
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.04%** trên
  5512 câu — casing có bằng chứng corpus.

## Ghi chú dữ liệu (trung thực)

da là ngôn ngữ dữ liệu NHỎ NHẤT tới giờ trong pipeline này (WikiPron 4773,
corpus 5512). Đủ xác nhận casing + chữ nguyên âm, nhưng g2p tổng quát không đáng
tin (bản chất chính tả da) và corpus dưới 10k — cả hai đều ghi rõ, không giả
vờ đủ.

## Invariant (tools/validate.mjs)

Ngôn ngữ da phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Đan. Ngữ pháp đơn giản (như sv) nhưng phát âm/stød
+ en/et + động từ mạnh ở lexical_level; phát âm cần audio.
