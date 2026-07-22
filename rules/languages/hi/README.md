# hi — Hindi rule set (Bộ rule tiếng Hindi)

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: hi (Hindi / हिन्दी)
tier: t1 (learning only)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: hi-IN (Standard Hindi)
family: Indo-Aryan, hệ chữ Devanagari (abugida)
difficulty: KHÓ (Devanagari abugida + ergative + hợp giống động từ + 3 mức tôn kính) → 5 vòng
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json`, 4 `.rules.json`,
các `.md` narrative có front-matter, `review-checklist.md`, `native-review-hi.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Hindi nổi bật

- **Devanagari abugida** — phụ âm + nguyên âm cố hữu + matra + ký tự ghép;
  UNICAMERAL (không hoa/thường → không casing); danda ।.
- **Nukta** ़: chữ+nukta = âm khác (ड़[ɽ] bản địa; क़/ज़/ख़ vay, tuỳ chọn).
- **Xoá schwa** (राम=[raːm]); **retroflex** (ट/ड); **bật hơi** 4 chiều.
- **Hậu giới từ** (ने/को/से/में/पर) + dạng xiên; **ERGATIVE** ने (thể hoàn thành,
  động từ hợp tân ngữ); **SOV**.
- **3 mức** तू/तुम/आप + hậu tố tôn kính जी.

## Ghi chú dữ liệu (trung thực)

- WikiPron RẤT LỚN (33057) + corpus 16649 (trên 10k) → tin cậy cao. Kỷ luật dữ
  liệu: nukta + schwa (ghi rõ). Ngữ pháp hình thái (ergative/giống/động từ) ở
  rule_level medium; paradigm cần native review.
