---
id: hr/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Croatian Test Fixtures

Nguồn: câu thật UD Croatian-SET (9010 câu, gần 10k) và WikiPron (27457 cặp
từ→âm, bộ lớn). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Danas je ponedjeljak.` / `Ona govori hrvatski.` / `Zagreb je glavni
  grad Hrvatske.`
- FAIL: `danas je ponedjeljak.` / `Danas je Siječanj.`
- (corpus-check: 0.00% vi phạm trên 9010 câu.)

## g2p (phonology.rules.json — chính tả cực đều, xác nhận)

- `č`→[t͡ʃ]: čaša; `ć`→[t͡ɕ]: ćup; `š`→[ʃ]: škola; `ž`→[ʒ]: žena; `c`→[t͡s]: cesta
- Lexical (audio): pitch accent grȁd/grȃd

## Grammar (grammar.rules.json)

- PASS: `Idem u školu.` / `Vidio sam ga.` / `Ona čita knjigu.`
- FAIL: `iz Zagreb` (thiếu genitiv) / `Sam vidio ga.` (enclitic sai vị trí)

## Pragmatics (pragmatics.rules.json)

- PASS: `Govoriš li hrvatski?` / `Možete li mi pomoći?`
- FAIL: `Vi govoriš hrvatski?` (Vi + động từ ngôi 2 số ít)
