---
id: fi/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Finnish Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR fi → `orthography.data.json`; UD Finnish-TDT
  → `word-class.data.json`; WikiPron `fin_latn_broad` (173449 cặp) →
  `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 30117 câu (UD TDT + FTB) →
  `tools/cache/corpus/fi-sentences.txt` (không commit). Vượt mốc 10000.
- **g2p-check (Bước 3):** độ dài nguyên âm/phụ âm (aa/ää/ii/uu/kk/tt) + ä/ö/y/ng
  sạch (0.00–2.38%) → `grapheme_to_phoneme` + `vowel_length` + `consonant_length`
  VALIDATED. Chính tả 1:1 minh bạch nhất trong các ngôn ngữ đã build.
- **corpus-check (Bước 3):** `month-weekday-not-capitalized` **0.00%** trên
  30117 câu — casing có bằng chứng corpus mạnh.

## Ghi chú kỷ luật dữ liệu

`nk → [ŋk]` bắn 41% do từ ghép giữ [nk] qua ranh giới hình vị → giữ medium/
lexical thay vì cưỡng ép VALIDATED (đối chiếu ng nội bộ gốc sạch 2.38%).

## Invariant (tools/validate.mjs)

Ngôn ngữ fi phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Phần Lan. Chính tả rất đơn giản (1:1) NHƯNG hình
thái CỰC nặng — 15 cách, luân phiên phụ âm, hoà âm, chắp dính phần lớn ở
lexical_level, cần bảng dữ liệu + native review trước khi lên nội dung thật.
