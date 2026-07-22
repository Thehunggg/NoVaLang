---
id: da/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Danish Test Fixtures

Nguồn: câu thật UD Danish-DDT (5512 câu, dưới mốc 10k — ghi rõ) và WikiPron
(4773 cặp từ→âm, bộ nhỏ). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `I dag er det mandag.` / `Hun taler dansk.`
- FAIL: `i dag er det mandag.` / `I dag er det Januar.`
- (corpus-check: 0.04% vi phạm trên 5512 câu.)

## g2p (phonology.rules.json — chữ nguyên âm xác nhận; phần khác lexical)

- `æ`→[ɛ]: læse; `ø`→[ø]: hør; `å`→[ɔ]: gå
- Lexical (audio): soft d `mad`=[mað]; stød `mor`/`mord`

## Grammar (grammar.rules.json)

- PASS: `Jeg læser en bog.` / `den røde bil` / `de er`
- FAIL: `den røde bilen` (xác định kép sv) / `jeg eren` (chia sai)

## Pragmatics (pragmatics.rules.json)

- PASS: `Taler du dansk?` / `Kunne du hjælpe mig?`
- FAIL: `Hvad vil du drikker?` (động từ không đổi theo ngôi)
