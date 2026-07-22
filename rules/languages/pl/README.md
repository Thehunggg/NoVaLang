# pl — Polish rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: pl (Polish / Polski)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: pl-PL
```

## File trong thư mục này

`coverage.json` (25 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-pl.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Ba Lan nổi bật

- **Hệ 7 cách** (thêm wołacz so với ru 6 cách).
- **Giống nam-người** (męskoosobowy) trong số nhiều — không có ở es/de.
- **Phụ âm xuýt/vòm** (sz/cz/ż vs ś/ć/ź) + làm mềm theo i + cụm phụ âm dày.
- **Nguyên âm mũi** ą/ę; **làm câm cuối từ**; **trọng âm đều** (áp chót).
- **Pan/Pani** trang trọng (danh từ + động từ ngôi 3), không có 'vy' kiểu ru.
- **Dấu là CHỮ** (ł≠l, ó≠o), không phải accent — chính sách chấm điểm riêng.
- Chữ Latin → `reading_aid_policy: not-applicable`.

## Bằng chứng dữ liệu

- g2p-check: 15 quy tắc chữ→âm sạch trên WikiPron (157042 cặp), kể cả rz
  devoicing + dz i-làm-mềm (phát hiện real-data).
- corpus-check: casing 0.02% trên 35926 câu UD (PDB+LFG).
