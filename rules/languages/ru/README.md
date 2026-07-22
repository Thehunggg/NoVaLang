# ru — Russian rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: ru (Russian / Русский)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
script: Cyrillic (Kirin, 33 chữ)
baseline_variety: ru-RU
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-ru.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Nga nổi bật

- **Hệ 6 cách (падежи)** — danh/tính/đại từ biến cách theo giống-số-cách.
- **Palatal hoá (cứng/mềm)** — cặp phụ âm phân biệt nghĩa (мат/мать).
- **Thể động từ** perfective/imperfective (делать/сделать).
- **Làm câm cuối từ** (final devoicing) — xác nhận g2p-check.
- **Số đếm chi phối cách** (два стола / пять столов).
- **Không mạo từ, không "быть" hiện tại**.
- **Trọng âm tự do + di động, không đánh dấu** → trợ đọc dấu ударение (khác Latin).

## Bằng chứng dữ liệu

- g2p-check: phụ âm ш/щ/ц/х/ч + làm câm cuối từ (г/б/д/з) sạch trên WikiPron
  narrow (466668 cặp). Nguyên âm giảm phụ thuộc trọng âm → medium (không
  g2p-check được bằng regex).
- corpus-check: casing 0.00% trên 22736 câu UD (GSD+SynTagRus).
