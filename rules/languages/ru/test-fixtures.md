---
id: ru/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON]
---

# Russian Test Fixtures

Nguồn: câu thật UD Russian (GSD + SynTagRus, 22736 câu) và WikiPron narrow
(466668 cặp từ→âm). Ưu tiên câu thật hơn tự bịa.

## Casing (orthography.rules.json)

- PASS: `Сегодня понедельник.` / `Он говорит по-русски.`
- FAIL: `сегодня понедельник.` / `Сегодня Января.`
- (corpus-check: 0.00% vi phạm trên 22736 câu.)

## g2p (phonology.rules.json — xác nhận WikiPron thật)

- `ш`→[ʂ]: шум; `ч`→[t͡ɕ]: час; `х`→[x]: хлеб
- Câm cuối từ: `год`→[got], `друг`→[druk], `нож`→[noʂ]

## Grammar (grammar.rules.json)

- PASS: `два стола` / `пять столов` / `Я студент.`
- FAIL: `два стол` / `пять стола` / `Я есть студент.`

## Pragmatics (pragmatics.rules.json)

- PASS: `Ты читаешь книгу.` / `Вы читаете книгу.`
- FAIL: `Ты читаете книгу.` / `Вы читаешь книгу.`
