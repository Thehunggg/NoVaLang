# es — Spanish rule set

Không có front-matter (README điều hướng, cùng quy ước ja/en/ko/README.md).

## Trạng thái

```text
language: es (Spanish / Español)
tier: t1 (learning only — không có vai native, khác ko)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG — build rule KHÔNG kích hoạt ngôn ngữ chạy thật
```

## File trong thư mục này

Cùng cấu trúc đã dùng cho `ko` (xem `rules/languages/ko/README.md` cho giải
thích đầy đủ vai trò từng loại file) — `coverage.json`, `sources.json`, 3
`.data.json` (dataset Bước 1), 4 `.rules.json` (orthography/phonology/
grammar/pragmatics), các `.md` narrative, `review-checklist.md`,
`native-review-es.md`, `pipeline-log.md`, `change-log.md`.

**Khác ko:** không có `romanization.md`/`reading-system.md` riêng — chữ Latin
chính tả minh bạch, không cần lớp reading-aid như furigana/romaji (xem
`reading_aid_policy: not-applicable` trong `coverage.json`, giải thích gộp
vào `orthography.md`).

## Đối chiếu khuôn

4 file `.rules.json` khớp top-level key set với `ja`/`en`/`ko`
(`id, version, status, phenomenon, enforces, sources, derived_by, config,
checks?, fixtures`). 15 file `.md` có front-matter thật theo
`_schema/front-matter.schema.json`, cùng khuôn đã xác nhận hoạt động ở `ko`.
