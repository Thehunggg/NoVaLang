---
id: fil/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Filipino Test Fixtures

Nguồn: câu thật UD Tagalog (222 câu — TRG + Ugnayan test-only, RẤT NHỎ) và
WikiPron (28295 cặp từ→âm, bộ lớn). g2p dựa WikiPron lớn; corpus rất nhỏ → nhiều
mục cần người bản ngữ.

## Orthography (orthography.rules.json)

- PASS (Latin): `Kumain ang bata.` / `Sinulat ko ang liham.` / `Magandang umaga
  po.`
- FAIL (lẫn hệ chữ khác): `Kumain ang 子供.`
- (corpus-check: 0.00% vi phạm trên 222 câu.) Casing: tháng/thứ VIẾT HOA (Enero,
  Lunes) — không lowercase.

## Phonology (phonology.rules.json — ng sạch; glottal/trọng âm lexical)

- `ng`→[ŋ]: ngayon (g2p-check 0.59%)
- Lexical (audio): âm tắc thanh hầu bata [bataʔ]; trọng âm áso/asó
- `ny` KHÔNG phải digraph (loại theo dữ liệu)

## Grammar (grammar.rules.json)

- PASS: `Kumain ang bata.` (actor focus) / `Kinain ng bata ang kanin.` (object
  focus) / `magandang babae` (linker)
- FAIL: `Kumain ng bata.` (focus sai) / `maganda babae` (thiếu linker)

## Pragmatics (pragmatics.rules.json)

- PASS: `Magandang umaga po.` / `Salamat po.` / `Kumusta ka?`
- FAIL: `Magandang po umaga.` (po sai vị trí)
