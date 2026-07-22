# nb — Norwegian Bokmål rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: nb (Norwegian Bokmål / Norsk bokmål)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: nb-NO (Bokmål, Østnorsk/Oslo)
family: North Germanic, Latin-script
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-nb.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Na Uy Bokmål nổi bật

- **Bokmål (nb) ≠ Nynorsk (nn)** — đây là Bokmål (~85% dạng viết).
- **Pitch accent** — 2 thanh (tonelag 1/2) phân biệt nghĩa (bønder/bønner),
  không đánh dấu; thay chức năng **stød** của da.
- **Chính tả đều hơn da** — æ/ø/å + sj/kj có quy tắc g2p; chỉ pitch accent +
  âm câm cần audio.
- **Mạo từ xác định hậu tố** (bilen) + **xác định KÉP** khi có tính từ (den røde
  bilen) — GIỐNG sv, KHÁC da.
- **Động từ KHÔNG chia theo ngôi** (jeg/du/de er) — thuận lợi lớn.
- **en/ei/et** 3 giống (cho phép gộp masc+fem); **V2**; **du phổ quát** (De gần
  tuyệt chủng).
- **æ ø å** là chữ cái → chính sách chấm theo pl D-64.

## Ghi chú dữ liệu (trung thực)

- Corpus LỚN (20044, trên 10k) → casing rất chắc. WikiPron nhỏ (3432) → g2p
  tổng quát chỉ medium; chỉ æ/ø/å + sj/kj validated. Pitch accent + âm câm
  lexical, cần audio — ghi rõ.
