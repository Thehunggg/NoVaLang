---
id: bg/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON, S-UD-CORPUS]
---

# Bulgarian Test Fixtures — Bộ ca kiểm thử

## Orthography (corpus-check Bước 3, 11138 câu)

- month-weekday-not-capitalized: PASS `...през януари.` / FAIL `...през Януари.`
- no-non-bulgarian-cyrillic (ы э ё і): PASS `Уча български.` / FAIL `Это русский.`

## g2p (g2p-check Bước 3, WikiPron 47572 từ)

- phụ âm: `жена`→[ʒ...], `щастие`→[ʃt...], `хляб`→[x...] (<1%, ж biến âm cuối)
- ъ: `ъгъл`→[ɤ...] (nhấn) — giảm [ɐ] khi không nhấn

## Grammar (mẫu cố định — paradigm cần native)

- mạo từ hậu tố: PASS `книгата`, `столът`, `детето` / FAIL `та книга`
- không nguyên mẫu: PASS `искам да ям` / FAIL `искам ям`
- clitic: PASS `го виждам`

## Register

- ти/Вие: PASS `Как си?` / `Как сте?` — FAIL `Вие как си?`
- господин sau tên: PASS `Добър ден, господин Петров!`

Câu pass ưu tiên lấy từ corpus thật khi có (Bước 3.6).
