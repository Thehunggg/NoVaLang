# nl — Dutch rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: nl (Dutch / Nederlands)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: nl-NL
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-nl.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Hà Lan nổi bật

- **de/het** — 2 giống mạo từ, phần lớn lexical (~2/3 là de).
- **Trật tự V2** (mệnh đề chính) + động từ về cuối (mệnh đề phụ), giống de.
- **Âm hầu [x]/[ɣ]** (hard g, ch); nguyên âm đôi ij/ui.
- **Làm câm cuối từ** (hond=[hɔnt]) + nguyên âm dài/ngắn qua nhân đôi chính tả.
- **Động từ tách** (opstaan) + **giảm nhẹ -je** rất năng sản.
- Tên ngôn ngữ/quốc tịch VIẾT HOA (Nederlands) — khác es/it/pt.
- Chữ Latin → `reading_aid_policy: not-applicable`.

## Bằng chứng dữ liệu

- g2p-check: 9 nhóm quy tắc chữ→âm + làm câm cuối từ trên WikiPron (58535 cặp).
- corpus-check: casing 0.09% trên 30723 câu UD (Alpino+LassySmall).
