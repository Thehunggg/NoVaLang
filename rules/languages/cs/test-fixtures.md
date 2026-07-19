---
id: cs/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Czech Test Fixtures

Nguồn: câu thật UD Czech (CAC + FicTree, 34869 câu) và WikiPron narrow (65070
cặp từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Dnes je pondělí.` / `Mluví česky.`
- FAIL: `dnes je pondělí.` / `Dnes je Ledna.`
- (corpus-check: 0.01% — vi phạm là họ người Sobota + đầu câu.)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- `ř`→[r̝]: řeka; `č`→[t͡ʃ]: čas; `š`→[ʃ]: šest
- Độ dài: `být` [biːt] / `byt` [bɪt]; làm câm: `led` [lɛt]

## Grammar (grammar.rules.json)

- PASS: `dva stoly` / `pět stolů` / `Včera jsem se ti smál.`
- FAIL: `dva stolů` / `Včera se ti jsem smál.` (clitic sai vị trí)

## Pragmatics (pragmatics.rules.json)

- PASS: `Mluvíš česky?` / `Mluvíte česky?`
- FAIL: `Mluvíš vy česky?` (ty/vy lệch chia)
