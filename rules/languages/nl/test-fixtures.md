---
id: nl/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Dutch Test Fixtures

Nguồn: câu thật UD Dutch (Alpino + LassySmall, 30723 câu) và WikiPron
(58535 cặp từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Vandaag is het maandag.` / `Zij spreekt Nederlands.`
- FAIL: `vandaag is het maandag.` / `Vandaag is het Januari.`
- (corpus-check: 0.09% — vi phạm là tên riêng ngày lễ "Goede Vrijdag".)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- `ch`→[x]: lachen; `ij`→[ɛ i̯]: wijn; `ui`→[œ y̯]: huis
- `aa`→[aː]: maan; câm cuối: hond=[hɔnt]

## Grammar (grammar.rules.json)

- PASS: `Ik heb een boek gelezen.` / `het huis` / `Ik sta om zeven uur op.`
- FAIL: `Vandaag ik lees een boek.` (sai V2) / `het man` (sai de/het)

## Pragmatics (pragmatics.rules.json)

- PASS: `Wat wilt u drinken?` / `Wat wil je drinken?`
- FAIL: `Wat willen u drinken?` (u chia ngôi 3 số ít)
