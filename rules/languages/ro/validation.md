---
id: ro/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Romanian Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR ro → `orthography.data.json`; UD Romanian-RRT
  → `word-class.data.json`; WikiPron `ron_latn_broad` (9286 cặp, bộ nhỏ) →
  `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 33645 câu (UD RRT + Nonstandard) →
  `tools/cache/corpus/ro-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** ș/ț/ă/â/î + c/g mềm-cứng (ce/ge/che/ghe) sạch
  (0.14–13.33%; ghe bộ nhỏ 15 từ) → `grapheme_to_phoneme` VALIDATED.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.08%** trên
  33645 câu (tên riêng/ngày trang trọng) — casing có bằng chứng corpus.

## Ghi chú dữ liệu

WikiPron ro nhỏ (9286) nhưng corpus lớn (33645) bù lại. Quy tắc cốt lõi (5 chữ,
c/g mềm-cứng) xác nhận đủ; ghe/ghi chỉ 15 từ nên confidence quy tắc đó thấp hơn
(vẫn dưới ngưỡng, ghi rõ).

## Invariant (tools/validate.mjs)

Ngôn ngữ ro phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Rumani. Hình thái (mạo từ hậu tố, giống trung,
cách rút gọn, giả định să) phần lớn ở lexical_level, cần bảng + native review.
