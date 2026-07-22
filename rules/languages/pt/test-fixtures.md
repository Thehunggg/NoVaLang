---
id: pt/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Portuguese Test Fixtures

Nguồn fixture: câu thật UD Portuguese (GSD + Bosque, 21377 câu) và WikiPron
Brazil (187421 cặp từ→âm). Ưu tiên câu thật hơn câu tự bịa (tránh cùng thiên
kiến với rule).

## Casing (orthography.rules.json)

- PASS: `Hoje é segunda-feira.` / `Ela fala português.`
- FAIL: `hoje é segunda.` / `Hoje é 3 de Janeiro.`

## g2p (phonology.rules.json — xác nhận trên WikiPron thật)

- `nh` → [ɲ]: senhor, banho
- `ti`/`di` (Brazil) → [t͡ʃ]/[d͡ʒ]: tia, dia
- `l` cuối → [w]: Brasil, mal
- `ão` → [ɐ̃ w̃]: pão, coração

## Grammar (grammar.rules.json)

- PASS: `A casa do João é grande.` / `Estou na escola.`
- FAIL: `o casa` / `Vou a o mercado.` (thiếu co kết)

## Pragmatics (pragmatics.rules.json)

- PASS: `Você fala português?` / `O senhor gostaria de um café?`
- FAIL: `Você falas português?` (você phải chia ngôi 3)
