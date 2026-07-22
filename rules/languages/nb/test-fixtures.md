---
id: nb/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Norwegian Bokmål Test Fixtures

Nguồn: câu thật UD Norwegian-Bokmaal (20044 câu, TRÊN mốc 10k — đầy đủ) và
WikiPron (3432 cặp từ→âm, bộ nhỏ). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `I dag er det mandag.` / `Hun snakker norsk.` / `Oslo er Norges
  hovedstad.`
- FAIL: `i dag er det mandag.` / `I dag er det Januar.`
- (corpus-check: 0.08% vi phạm trên 20044 câu — bằng chứng mạnh.)

## g2p (phonology.rules.json — chữ nguyên âm + sj/kj xác nhận; phần khác lexical)

- `æ`→[æ]: lære; `ø`→[ø]: hør; `å`→[ɔ/oː]: gå
- `sj`→[ʂ]: skjorte; `kj`→[ç]: kjøre
- Lexical (audio): pitch accent bønder/bønner; âm câm god=[gu], jeg=[jæi]

## Grammar (grammar.rules.json)

- PASS: `Jeg leser en bok.` / `den røde bilen` / `de er`
- FAIL: `den røde bil` (bỏ xác định kép — đúng da, sai nb) / `jeg eren` (chia sai)

## Pragmatics (pragmatics.rules.json)

- PASS: `Snakker du norsk?` / `Kunne du hjelpe meg?`
- FAIL: `Hva vil du drikker?` (động từ không đổi theo ngôi)
