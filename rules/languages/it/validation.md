---
id: it/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Italian validation record

## Bước 1 — dataset

- CLDR it → `orthography.data.json` (xác nhận à è é ì ò ù).
- UD Italian-ISDT test → `word-class.data.json`.
- WikiPron `ita_latn_broad` → `grapheme-to-phoneme.data.json` (89403 cặp).
- Corpus: UD Italian-ISDT train/dev/test + PUD → 15167 câu (>10000).

## Bước 3 — corpus/g2p check

- `g2p-check.mjs` (WikiPron 89403 từ): gn→[ɲ] 0.29%, ci→[t͡ʃ] 0.57%, ce→[t͡ʃ]
  0.17%, chi→[k] 1.03%, gh→[ɡ] 0.00%, sci→[ʃ] 0.00% — tất cả sạch, nâng
  `grapheme_to_phoneme` VALIDATED (confidence high). PHÁT HIỆN: gli→[ʎ] chỉ ở
  giữa từ (đầu từ gli-=ɡli, check bắn 78.85% → sửa mô tả).
- `corpus-check.mjs` (15167 câu): month-weekday-not-capitalized bắn 0.03%
  (5 câu là tựa phim/tên riêng) — cực sạch, casing có bằng chứng corpus.

## Trạng thái

VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT. Chưa FROZEN. Chưa có bài học thật.

## Provenance

`UD`, `WIKIPRON`, `CLDR`, `S-UD-CORPUS`.
