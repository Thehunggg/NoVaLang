---
id: sv/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Swedish Test Fixtures

Nguồn: câu thật UD Swedish (Talbanken + LinES, 11734 câu) và WikiPron
(5856 cặp từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Idag är det måndag.` / `Hon talar svenska.`
- FAIL: `idag är det måndag.` / `Idag är det Januari.`
- (corpus-check: 0.00% vi phạm trên 11734 câu.)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- `sj`→[ɧ]: sjö; `tj`→[ɕ]: tjugo
- `ä`→[ɛ]: säng; `ö`→[ø]: öl; `å`→[oː]: gå
- Mềm hoá bản ngữ: köpa=[ɕøːpa], göra=[jœːra]

## Grammar (grammar.rules.json)

- PASS: `Jag läser en bok.` / `den röda bilen` / `de är`
- FAIL: `den bil` (thiếu hậu tố) / `jag ären` (chia sai)

## Pragmatics (pragmatics.rules.json)

- PASS: `Talar du svenska?` / `Skulle du kunna hjälpa mig?`
- FAIL: `Vad vill du dricker?` (động từ không đổi theo ngôi)
