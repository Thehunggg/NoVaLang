---
id: ms/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-ID-CROSSREF]
---

# Malay Test Fixtures

Nguồn: WikiPron (6672 cặp từ→âm — chính tả đều, g2p sạch). **KHÔNG có corpus
Mã Lai** (UD_Malay không tồn tại) → fixtures ngữ pháp/casing là tự bịa từ kiến
thức, chưa kiểm trên corpus thật; cần người bản ngữ.

## Orthography (orthography.rules.json)

- PASS (Latin): `Saya makan nasi.` / `Selamat pagi.` / `Kuala Lumpur ibu negara
  Malaysia.`
- FAIL (lẫn hệ chữ khác): `Saya makan 米.`
- Casing: tháng/thứ VIẾT HOA (Januari, Isnin) như id. KHÔNG corpus-verify được.

## Phonology (phonology.rules.json — g2p sạch trên WikiPron)

- `ng`→[ŋ]: bunga; `ny`→[ɲ]; `sy`→[ʃ]; `c`→[t͡ʃ]: cinta
- Lexical (audio): 'e' [e] emak / [ə] beli; k cuối [ʔ]: tidak

## Grammar (grammar.rules.json)

- PASS: `menulis surat` (meN-) / `rumah besar` (bổ nghĩa sau) / `tiga buah buku`
  (loại từ)
- FAIL: `menbaca` (sai biến âm mũi) / `besar rumah` (bổ nghĩa trước)

## Pragmatics (pragmatics.rules.json)

- PASS: `Saya suka kopi.` / `Boleh tolong saya?` / `Terima kasih.`
- FAIL: (thiếu) — cần người bản ngữ bổ sung câu sai tự nhiên
