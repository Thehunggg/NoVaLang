# pt — Portuguese rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: pt (Portuguese / Português)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: pt-BR (Brazil)
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-pt.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Bồ (pt-BR) nổi bật

- **Nguyên âm mũi** (ã/õ + m/n coda): sim=[sĩ], pão, coração — đặc trưng trung tâm.
- **Co kết giới từ + mạo từ** bắt buộc: do/da/no/na/ao/à/pelo/pela.
- **ser vs estar** — 2 động từ "to be".
- **Vòm hoá Brazil** ti/di → [t͡ʃ]/[d͡ʒ]; `l` cuối → [w].
- **você** làm ngôi 2 baseline (chia ngôi 3), không dạy chia `tu`.
- Chữ Latin → `reading_aid_policy: not-applicable`.

## Bằng chứng dữ liệu

- g2p-check: 9 quy tắc chữ→âm sạch (<1%) trên WikiPron Brazil (187421 cặp).
- corpus-check: casing 1.64% trên 21377 câu UD (GSD+Bosque).
