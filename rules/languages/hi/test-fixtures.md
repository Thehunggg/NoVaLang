---
id: hi/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON, S-UD-CORPUS]
---

# Hindi Test Fixtures — Bộ ca kiểm thử

## Orthography (corpus-check Bước 3, 16649 câu)

- danda-sentence-terminator: PASS `यह किताब है ।` / FAIL `यह किताब है.`
- devanagari-not-latin-native: PASS `मैं भारत में रहता हूँ ।` / FAIL `This is English.`

## g2p (g2p-check Bước 3, WikiPron 33057 từ)

- phụ âm gốc: `शहर`→[ʃ...], `भारत`→[bʱ...], `टमाटर`→[ʈ...] (<1%)
- nukta: `पढ़ना`→[...ɽ...], `ज़रूरी`→[z...] (chữ+nukta = âm khác)
- xoá schwa: `राम`→[raːm]

## Grammar (mẫu cố định — paradigm cần native)

- hậu giới từ: PASS `लड़के को`, `घर में` / FAIL `लड़का को`
- ergative: PASS `राम ने रोटी खाई` / FAIL `राम रोटी खाई`
- SOV: PASS `मैं हिन्दी सीखता हूँ` / FAIL `मैं सीखता हिन्दी`

## Register

- 3 mức: PASS `आप कैसे हैं?` / `तुम कैसे हो?` — FAIL `आप कैसे हो?`
- honorific जी: PASS `रामजी, नमस्ते।`

Câu pass ưu tiên lấy từ corpus thật khi có (Bước 3.6).
