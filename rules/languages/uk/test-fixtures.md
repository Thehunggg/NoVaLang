---
id: uk/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON, S-UD-CORPUS]
---

# Ukrainian Test Fixtures — Bộ ca kiểm thử

## Orthography (corpus-check Bước 3, 7092 câu)

- month-weekday-not-capitalized: PASS `Ми зустрінемося в січні.` / FAIL `...в Січні.`
- no-russian-only-letters: PASS `Я вивчаю українську.` / FAIL `Это русский текст.`

## g2p (g2p-check Bước 3, WikiPron 53021 từ)

- phụ âm: `жінка`→[ʒ...], `шість`→[ʃ...], `ґудзик`→[g...] (all <1%)
- iotation ngữ cảnh: `яблуко`→[ja...], `об'єкт`→[obˈjɛkt] (' ngăn mềm)
- г/ґ: `гора`→[ɦ...] / `ґанок`→[g...]

## Grammar (mẫu cố định — paradigm cần native)

- vocative: PASS `Петре!`, `друже` / FAIL `Петр!`
- quá khứ hợp giống: PASS `він читав` / `вона читала` — FAIL `вона читав`

## Register

- ти/ви: PASS `Як ти?` / `Як ви?` — FAIL `Ви як ти?`
- vocative lịch sự: PASS `Пане Петре, добрий день!`

Câu pass ưu tiên lấy từ corpus thật khi có (Bước 3.6).
