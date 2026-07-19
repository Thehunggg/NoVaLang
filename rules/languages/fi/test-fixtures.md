---
id: fi/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Finnish Test Fixtures

Nguồn: câu thật UD Finnish (TDT + FTB, 30117 câu) và WikiPron (173449 cặp
từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Tänään on maanantai.` / `Hän puhuu suomea.`
- FAIL: `tänään on maanantai.` / `Tänään on Tammikuu.`
- (corpus-check: 0.00% vi phạm trên 30117 câu.)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- Độ dài: `tuuli` [tuːli] / `tulli` [tulːi] (chữ đôi = dài)
- `ä`→[æ]: sää; `ö`→[ø]: yö; `y`→[y]: hyvä

## Grammar (grammar.rules.json)

- PASS: `Minä puhun suomea.` / `talossa` (hoà âm) / `en puhu englantia`
- FAIL: `talossä` (sai hoà âm) / `en puhun` (phủ định + gốc)

## Pragmatics (pragmatics.rules.json)

- PASS: `Puhutko sinä suomea?` / `Puhutteko te suomea?`
- FAIL: `Puhutteko sinä suomea?` (te/sinä lệch chia)
