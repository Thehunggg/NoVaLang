---
id: el/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON, S-UD-CORPUS]
---

# Greek Test Fixtures — Bộ ca kiểm thử

## Orthography (corpus-check Bước 3, 4285 câu — 0% vi phạm)

- monotonic (không polytonic): PASS `Καλημέρα, τι κάνεις;` / FAIL `ἡ πόλις`
- dấu hỏi Hy Lạp `;`: PASS `Τι ώρα είναι;` / FAIL `Τι ώρα είναι?`

## g2p (g2p-check Bước 3, WikiPron 19133 từ)

- phụ âm ma sát: `βιβλίο`→[v...], `θάλασσα`→[θ...], `δρόμος`→[ð...] (all <1%)
- digraph nguyên âm: `ουρανός`→[u...], `παιδί`→[...e/i], `αύριο`→[av...]

## Grammar (mẫu cố định — paradigm cần native review)

- giống/mạo từ: PASS `ο άνθρωπος`, `η μέρα`, `το παιδί` / FAIL `το άνθρωπος`
- chia động từ: PASS `γράφω/γράφεις/γράφουμε` / FAIL `εμείς γράφω`
- clitic: PASS `τον βλέπω` / FAIL `βλέπω τον`

## Register

- εσύ/εσείς: PASS `Τι κάνεις;` / `Τι κάνετε;` — FAIL `Εσείς τι κάνεις;`

Câu pass ưu tiên lấy từ corpus thật khi có (Bước 3.6).
