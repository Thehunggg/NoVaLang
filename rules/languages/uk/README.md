# uk — Ukrainian rule set (Bộ rule tiếng Ukraina)

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: uk (Ukrainian / Українська)
tier: t1 (learning only)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: uk-UA (Standard Ukrainian, Правопис 2019)
family: East Slavic, hệ chữ Kirin (Cyrl)
difficulty: KHÓ (chữ Kirin + 3 giống + 7 cách gồm vocative + thể động từ) → 5 vòng tra cứu
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json`, 4 `.rules.json`
(orthography/phonology/grammar/pragmatics), các `.md` narrative có front-matter,
`review-checklist.md`, `native-review-uk.md`, `pipeline-log.md`.

## Đặc trưng tiếng Ukraina nổi bật

- **Bảng chữ Kirin 33 chữ** — CÓ і/ї/є/ґ, KHÔNG có ы/э/ъ/ё (khác Nga).
- **г → [ɦ]** (không [g] như Nga); **ґ → [g]** chữ riêng; **и → [ɪ]**.
- **Dấu nháy '** bắt buộc (об'єкт, п'ять); **dấu mềm ь**.
- **Chính tả khá đều** — g2p-check phụ âm <1% trên 53021 từ.
- **7 CÁCH gồm VOCATIVE** (Петре! Мамо!) — giữ sống, khác Nga.
- **Quá khứ hợp giống+số** (читав/читала); **thể động từ**; tương lai tổng hợp
  читатиму (đặc trưng Ukraina).
- **Đối lập ти/ви** + vocative lịch sự.

## Ghi chú dữ liệu (trung thực)

- WikiPron RẤT LỚN (53021) → g2p rất tin cậy. Corpus 7092 câu (dưới 10k — ghi
  rõ, UD-IU). Ngữ pháp hình thái (cách/chia/mềm hoá) ở rule_level medium;
  paradigm cụ thể cần native review.
