---
id: id/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-UD-CORPUS, S-TRAINED-KNOWLEDGE]
---

# Indonesian Validation — Kiểm chứng

## Dataset (Bước 1)

- CLDR id → `orthography.data.json` (26 chữ Latin).
- WikiPron `ind_latn_broad` **18590 cặp** → `grapheme-to-phoneme.data.json`.
- UD Indonesian-GSD test → `word-class.data.json`.

## g2p-check (Bước 3, 18590 từ thật)

Digraph: ny 0.68%, ng 0.67%, sy 6.76%. Kỷ luật dữ liệu: c/j 5.41%/4.42% =
tie-bar-vs-space tokenization (đúng); y→[j] 44.80% = y trong digraph ny/sy
(digraph-precedence, giống uk/tr); 'e' [e]/[ə] schwa lexical. Ghi rõ
`phonology.rules.json`.

## corpus-check (Bước 3, 5598 câu thật)

- **KHÔNG** áp check 'month-always-lowercase' — KỶ LUẬT DỮ LIỆU: tiếng Indonesia
  VIẾT HOA tháng/thứ (Januari, Senin) như Anh; corpus 255 hoa vs 3 thường.
- id không có chữ đặc thù để làm regex_absent như uk/bg → check orthography là
  custom (casing + láy dấu nối).

**Corpus DƯỚI 10000** (5598 — trên sàn 2000) → ghi rõ.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014). Validator:
4 lỗi vi/zh cũ (ghi nợ), 0 lỗi mới cho id.
