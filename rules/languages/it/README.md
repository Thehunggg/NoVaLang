# it — Italian rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: it (Italian / Italiano)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: it-IT
```

## File trong thư mục này

`coverage.json` (23 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-it.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Ý nổi bật

- **Mạo từ xác định theo âm đầu** (il/lo/la/l'/i/gli/le).
- **Chọn trợ động từ essere/avere** + hoà giống phân từ với essere.
- **c/g cứng-mềm** + digraph gn/gli/sc; **phụ âm đôi (geminate)** phân biệt nghĩa.
- Chính tả rất minh bạch → `grapheme_to_phoneme` VALIDATED (g2p-check high).
- Chữ Latin → `reading_aid_policy: not-applicable`.
