---
id: it/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Italian test fixtures

Fixture pass/fail nằm trong 4 file `.rules.json`. Câu pass đầu mỗi file lấy từ
corpus thật UD Italian-ISDT (Bước 3 mục 6). Fixture g2p (gn/ci/chi/sci) đối
chiếu WikiPron thật qua `g2p-check.mjs`.

- orthography: tháng/thứ viết thường (corpus 0.03% vi phạm).
- phonology: gn→ɲ, c/g mềm-cứng.
- grammar: mạo từ theo âm đầu, giống-số.
- pragmatics: Lei chia ngôi 3 số ít.

## Provenance

`S-UD-CORPUS` (15167 câu), `WIKIPRON` (89403 cặp).
