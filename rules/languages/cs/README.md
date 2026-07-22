# cs — Czech rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: cs (Czech / Čeština)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: cs-CZ (spisovná čeština)
family: West Slavic, Latin-script
```

## File trong thư mục này

`coverage.json` (25 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-cs.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Séc nổi bật

- **Hệ 7 cách** (có vokativ) + **giống nam animacy** (sống/không sống).
- **Âm ř** [r̝] — âm hiếm trên thế giới (g2p 0.00%).
- **Clitic vị trí thứ hai** (Wackernagel) — đặc trưng, không có ở es/de.
- **Độ dài nguyên âm phonemic** (byt/být) + **trọng âm cố định** âm tiết đầu.
- **Thể động từ**, số đếm chi phối cách, không mạo từ.
- **Dấu là chữ** (háček đổi âm, acute = độ dài) → chính sách chấm theo pl D-64.

## Bằng chứng dữ liệu

- g2p-check: sibilants + ř→[r̝] + độ dài + làm câm cuối từ sạch trên WikiPron
  narrow (65070 cặp).
- corpus-check: casing 0.01% trên 34869 câu UD (CAC+FicTree).
