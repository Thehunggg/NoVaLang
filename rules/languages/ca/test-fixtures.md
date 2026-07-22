---
id: ca/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Catalan Test Fixtures

Nguồn: câu thật UD Catalan-AnCora (16678 câu, TRÊN mốc 10k — đầy đủ) và WikiPron
(176 cặp — RẤT NHỎ, chỉ tham khảo, không đủ g2p-check). Ưu tiên câu thật.

## Casing (orthography.rules.json)

- PASS: `Avui és dilluns.` / `Ella parla català.` / `Barcelona és la capital de
  Catalunya.`
- FAIL: `avui és dilluns.` / `Avui és Febrer.`
- (corpus-check: 0.05% vi phạm trên 16678 câu — bằng chứng mạnh.)

## Phonology (phonology.rules.json — phụ âm đặc trưng; nguyên âm lexical)

- `ç`→[s]: caça; `ll`→[ʎ]: mirall; `ny`→[ɲ]: canya; `x`→[ʃ]: xocolata
- Lexical (audio): giảm nguyên âm del→[dəl], barca→[barkə]; l·l geminate cel·la

## Grammar (grammar.rules.json)

- PASS: `Parlo català.` / `l'home` / `vaig parlar amb ell.`
- FAIL: `el home` (không rút gọn) / `jo parla` (chia sai ngôi)

## Pragmatics (pragmatics.rules.json)

- PASS: `Tu parles català?` / `Vostè parla català?`
- FAIL: `Vostè parles català?` (vostè + động từ ngôi 2)
