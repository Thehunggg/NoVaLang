# el — Greek rule set (Bộ rule tiếng Hy Lạp)

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: el (Greek / Ελληνικά)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: el-GR (Standard Modern Greek)
family: Hellenic (nhánh Ấn-Âu riêng), hệ chữ Hy Lạp (Grek)
difficulty: RẤT KHÓ (chữ mới + 3 giống + 4 cách + động từ chia đầy đủ) → 5 vòng tra cứu
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-el.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Hy Lạp nổi bật

- **Hệ chữ Hy Lạp** (24 chữ, không Latin) — rào cản đầu tiên. sigma cuối ς.
- **Chính tả KHÁ ĐỀU** (ngược da) — g2p-check <1%; cái khó là chiều VIẾT
  (iotacism: 7 cách viết cho âm [i]).
- **MONOTONIC** (tonos + dieresis, từ 1982) — corpus xác nhận 0 polytonic.
- **Dấu hỏi `;`** (không `?`), ano teleia `·` — corpus xác nhận.
- **3 giống** (ο/η/το) + **4 cách** (nom/gen/acc/voc) — hình thái nặng.
- **Động từ chia đầy đủ** (ngôi/số/thì/thể/dạng, không nguyên mẫu).
- **Đối lập T-V** εσύ/εσείς (khác da/sv "du phổ quát").

## Ghi chú dữ liệu (trung thực)

- WikiPron LỚN (19133) → g2p rất tin cậy. Corpus 4285 câu (dưới 10k — ghi rõ,
  chỉ 2 treebank UD el). Ngữ pháp hình thái (giống/cách/chia) ở rule_level
  medium; paradigm cụ thể cần native review.
