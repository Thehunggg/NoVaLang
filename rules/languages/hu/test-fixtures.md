---
id: hu/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Hungarian Test Fixtures

Nguồn: câu thật UD Hungarian-Szeged (1800 câu — DƯỚI 2000, corpus check yếu) và
WikiPron (64764 cặp từ→âm, bộ rất lớn). Ưu tiên câu thật; g2p dựa WikiPron lớn.

## Casing (orthography.rules.json)

- PASS: `Ma hétfő van.` / `Ő magyarul beszél.` / `Budapest Magyarország
  fővárosa.`
- FAIL: `ma hétfő van.` / `Ma Január van.`
- (corpus-check: 0.00–0.17% trên 1800 câu — nhỏ, ghi rõ yếu.)

## g2p (phonology.rules.json — chính tả đều, xác nhận trên 64764 từ)

- `sz`→[s]: szó; `cs`→[t͡ʃ]: csak; `ny`→[ɲ]: nyár; s→[ʃ]: sok (ngược Anh)
- Lexical (audio): nguyên âm dài á/é/ó/ő/ű; đồng hoá phụ âm

## Grammar (grammar.rules.json)

- PASS: `A házban vagyok.` / `Látom a házat.` / `Budapesten élek.`
- FAIL: `házben` (sai hoà âm) / `Látok a házat.` (định/bất định sai)

## Pragmatics (pragmatics.rules.json)

- PASS: `Te beszélsz magyarul?` / `Ön beszél magyarul?`
- FAIL: `Ön beszélsz magyarul?` (ön + động từ ngôi 2)
