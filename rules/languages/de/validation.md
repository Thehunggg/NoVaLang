---
id: de/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# German validation record

## Bước 1 — dataset

- CLDR de → `orthography.data.json` (xác nhận ä ö ü ß).
- UD German-GSD test → `word-class.data.json` (17 upos).
- WikiPron `deu_latn_broad` → `grapheme-to-phoneme.data.json` (57662 cặp).
- Corpus: UD German-GSD train/dev/test + PUD → 16589 câu (>10000, không yếu).

## Bước 3 — corpus/g2p check

- `g2p-check.mjs` (WikiPron 57662 từ): sch→[ʃ] 1.17%, w-→[v] 0.13%, z-→[ts]
  0.99%, v-→[f/v] 0.15% — cả 4 sạch (dưới ngưỡng RULE NGHI NGỜ SAI), nâng
  `grapheme_to_phoneme` lên VALIDATED.
- `corpus-check.mjs` (16589 câu): 4 `.rules.json` dùng `assert custom` (kiểm
  ngữ pháp/POS lúc generator chạy) → không có assert văn-bản-level nào chạy
  trên corpus. Thử nghiệm regex "phẩy trước dass": 10.05% bắn (một nửa là
  `so dass` + lỗi phẩy thật corpus review) → KHÔNG dùng làm regex enforced.

## Trạng thái

VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT. Chưa FROZEN. Chưa có bài học thật.

## Provenance

`UD`, `WIKIPRON`, `CLDR`, `S-UD-CORPUS`.
