# fi — Finnish rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: fi (Finnish / Suomi)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: fi-FI (yleiskieli)
family: Uralic (không phải Ấn-Âu)
```

## File trong thư mục này

`coverage.json` (25 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-fi.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Phần Lan nổi bật

- **Ngôn ngữ Ural chắp dính** (agglutinative) — T1 phi-Ấn-Âu đầu tiên trong repo.
- **15 cách** (hậu tố cách thay giới từ); **partitiivi** đặc trưng khó.
- **Hoà âm nguyên âm** (sau a/o/u vs trước ä/ö/y) + **luân phiên phụ âm**.
- **Chính tả gần như hoàn hảo 1:1 âm vị** (minh bạch nhất) + **độ dài phonemic**
  (chữ đôi = dài) + **trọng âm cố định** âm tiết đầu.
- **KHÔNG giống, KHÔNG mạo từ, một đại từ ngôi 3** (hän) — thuận lợi lớn.
- **Phủ định bằng động từ `ei`** chia theo ngôi.
- **ä ö** là chữ cái + nhóm hoà âm trước — chính sách chấm điểm theo tiền lệ pl D-64.

## Bằng chứng dữ liệu

- g2p-check: độ dài + ä/ö/y/ng sạch (0.00–2.38%) trên WikiPron (173449 cặp) —
  hệ chữ→âm sạch nhất đã build.
- corpus-check: casing 0.00% trên 30117 câu UD (TDT+FTB).
