---
id: ro/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Romanian Test Fixtures

Nguồn: câu thật UD Romanian (RRT + Nonstandard, 33645 câu) và WikiPron (9286
cặp từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Astăzi este luni.` / `Ea vorbește română.`
- FAIL: `astăzi este luni.` / `Astăzi este Ianuarie.`
- (corpus-check: 0.08% — vi phạm là tên riêng/ngày trang trọng.)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- `ș`→[ʃ]: și; `ț`→[t͡s]: țară; `ă`→[ə]: casă; `â`/`î`→[ɨ]: român/în
- c/g mềm: `cine`→[t͡ʃine]; cứng: `ghem`→[ɡem]

## Grammar (grammar.rules.json)

- PASS: `băiatul` / `Vreau să merg.` / `un scaun`
- FAIL: `ul băiat` (mạo từ trước) / `Vreau a merge.` (nguyên mẫu thay să)

## Pragmatics (pragmatics.rules.json)

- PASS: `Vorbești română?` / `Vorbiți română?`
- FAIL: `Vorbești dumneavoastră română?` (tu/dvs lệch chia)
