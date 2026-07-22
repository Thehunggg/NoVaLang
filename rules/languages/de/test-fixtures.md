---
id: de/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# German test fixtures

Fixture pass/fail nằm trong 4 file `.rules.json`. Câu pass đầu mỗi file lấy
từ corpus thật UD German-GSD (Bước 3 mục 6). Fixture g2p (sch/w/z/v) đối
chiếu WikiPron thật qua `g2p-check.mjs`.

- orthography: viết hoa danh từ, đầu câu.
- phonology: sch→ʃ, chữ→âm.
- grammar: giống mạo từ, V2, động từ tách.
- pragmatics: Sie viết hoa, chia ngôi 3 số nhiều.

## Provenance

`S-UD-CORPUS` (16589 câu), `WIKIPRON` (57662 cặp).
