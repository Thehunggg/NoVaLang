# bg — Bulgarian rule set (Bộ rule tiếng Bulgaria)

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: bg (Bulgarian / Български)
tier: t1 (learning only)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: bg-BG (Standard Bulgarian)
family: South Slavic, hệ chữ Kirin (Cyrl)
difficulty: TRUNG BÌNH-KHÓ (chữ Kirin + động từ giàu + mạo từ hậu tố; NHƯNG mất cách = dễ) → 5 vòng
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json`, 4 `.rules.json`,
các `.md` narrative có front-matter, `review-checklist.md`, `native-review-bg.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Bulgaria nổi bật

- **Chữ Kirin 30** — **ъ [ɤ]** (nguyên âm, không phải dấu cứng), **щ [ʃt]** (sht),
  г→[g]; KHÔNG có ы/э/і/ё.
- **MẤT HẲN cách danh từ** (độc nhất Slavic — dễ hơn ru/uk/pl nhiều).
- **MẠO TỪ XÁC ĐỊNH HẬU TỐ** (столът/книгата/детето) — độc nhất Slavic (+Macedonia).
- **Không nguyên mẫu** (да + hiện tại); **evidential -л** (chứng kiến vs nghe kể).
- Giảm nguyên âm không nhấn; **ти/Вие**.

## Ghi chú dữ liệu (trung thực)

- WikiPron RẤT LỚN (47572) + corpus 11138 (trên 10k — đầy đủ) → tin cậy cao.
  Kỷ luật dữ liệu: щ tokenization, ъ giảm nguyên âm (ghi rõ). Ngữ pháp động từ
  ở rule_level medium; paradigm cần native review.
