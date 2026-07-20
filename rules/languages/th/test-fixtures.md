---
id: th/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Thai Test Fixtures

Nguồn: câu thật UD Thai-PUD (1000 câu — test-only, DƯỚI 2000, RẤT YẾU) và
WikiPron (18319 cặp từ→âm có thanh, bộ lớn). g2p dựa WikiPron lớn; corpus nhỏ.

## Orthography (orthography.rules.json)

- PASS (chữ Thái): `สวัสดีครับ` / `ผมพูดภาษาไทย` / `คุณพูดภาษาไทยไหม`
- FAIL (chuyển tự Latin): `sawatdi khrap` / `khun phut phasa thai`
- (corpus-check: 0.00% vi phạm trên 1000 câu — mọi câu có chữ Thái.)
- Casing: not-applicable (unicameral).

## Phonology (phonology.rules.json — âm đầu ổn định; coda + thanh đa yếu tố)

- Âm đầu: `ก`→[k], `ม`→[m] (g2p-check sạch)
- Coda neutralization: `บ` cuối → [p̚] (báo 37% g2p = hiện tượng thật, không phải lỗi)
- Thanh: đa yếu tố (lớp phụ âm × dấu thanh × loại âm tiết) — audio

## Grammar (grammar.rules.json)

- PASS: `ผมพูดภาษาไทย` / `หนังสือสามเล่ม` (loại từ) / `ผมจะไป` (trợ từ thì)
- FAIL: `สามหนังสือ` (sai thứ tự loại từ)

## Pragmatics (pragmatics.rules.json)

- PASS: `สวัสดีครับ` (nam) / `สวัสดีค่ะ` (nữ) / `ขอบคุณครับ`
- FAIL: `สวัสดีครับค่ะ` (trộn trợ từ nam+nữ)
