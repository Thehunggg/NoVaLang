# sv — Swedish rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: sv (Swedish / Svenska)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: sv-SE
```

## File trong thư mục này

`coverage.json` (23 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-sv.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Thụy Điển nổi bật

- **Mạo từ xác định = HẬU TỐ** (bilen, huset) + xác định kép (den röda bilen).
- **en/ett** — 2 giống, phần lớn lexical.
- **V2** (mệnh đề chính), giống de/nl.
- **Động từ KHÔNG chia theo ngôi** (jag/du/de är) — thuận lợi lớn.
- **Âm [ɧ]** (sj-ljud) + mềm hoá k/g/sk trước nguyên âm trước.
- **du phổ quát** (du-reformen) — không đối lập T-V mạnh.
- **å ä ö** là chữ cái (cuối bảng) — chính sách chấm điểm theo tiền lệ pl D-64.

## Bằng chứng dữ liệu

- g2p-check: sj/tj/ä/ö/å sạch trên WikiPron (5856 cặp — bộ nhỏ); mềm-hoá-âm-đầu
  giữ medium (phát hiện thật: từ mượn + pitch marker).
- corpus-check: casing 0.00% trên 11734 câu UD (Talbanken+LinES).
