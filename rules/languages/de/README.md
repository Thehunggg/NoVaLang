# de — German rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: de (German / Deutsch)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG — build rule KHÔNG kích hoạt ngôn ngữ chạy thật
baseline_variety: de-DE (xem review-checklist D-de-01)
```

## File trong thư mục này

`coverage.json` (22 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1: orthography/word-class/grapheme-to-phoneme), 4 `.rules.json`
(orthography/phonology/grammar/pragmatics), các `.md` narrative có front-matter
(writing-system, orthography, pronunciation, grammar-and-usage,
style-and-register, localization-boundaries, learning-and-pedagogy,
tts-and-audio, test-fixtures, validation, change-log), `review-checklist.md`,
`native-review-de.md`, `pipeline-log.md`.

## Đặc trưng tiếng Đức nổi bật (so với es đã build)

- **Viết hoa MỌI danh từ** (không chỉ danh từ riêng) — casing.
- **Hệ 4 cách (Kasus)** — Nominativ/Akkusativ/Dativ/Genitiv.
- **Trật tự từ V2** + động từ cuối mệnh đề phụ.
- **Động từ tách được** (trennbare Verben).
- **ä/ö/ü/ß** + chuyển tự ae/oe/ue/ss.

Chữ Latin, chính tả minh bạch → `reading_aid_policy: not-applicable`.
