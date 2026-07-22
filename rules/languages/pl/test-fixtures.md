---
id: pl/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Polish Test Fixtures

Nguồn: câu thật UD Polish (PDB + LFG, 35926 câu) và WikiPron (157042 cặp
từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Dzisiaj jest poniedziałek.` / `Ona mówi po polsku.`
- FAIL: `dzisiaj jest poniedziałek.` / `Dzisiaj jest Stycznia.`
- (corpus-check: 0.02% — vi phạm là họ người Sobota/Piątek + đầu câu.)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- `sz`/`cz`→[ʂ]/[t͡ʂ]: szum, czas
- `rz`→[ʐ]/[ʂ]: rzeka / przez (làm câm); `dz`→[d͡z]/[d͡ʑ]: dzwon / dzień
- `ł`→[w]: mały; câm cuối: chleb=[xlɛp]

## Grammar (grammar.rules.json)

- PASS: `Jestem studentem.` / `dwa stoły` / `pięć stołów`
- FAIL: `Ja student.` (thiếu być) / `dwa stołów` (sai cách)

## Pragmatics (pragmatics.rules.json)

- PASS: `Czy Pan mówi po polsku?` / `Czy mówisz po polsku?`
- FAIL: `Czy Pan mówisz po polsku?` (Pan chia ngôi 3)
