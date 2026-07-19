---
id: id/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [id/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Indonesian Style & Register — Văn phong và mức diễn đạt

Áp dụng ADR-016. Baseline `NATURAL_NEUTRAL_POLITE` = **bahasa baku** (chuẩn).

## Đại từ nhạy lịch sự (thay đối lập T-V hình thái)

- **tôi**: saya (lịch sự/trung tính) / aku (thân) / gua-gue (rất suồng).
- **bạn**: Anda (lịch sự, viết hoa) / kamu (thân) / kau (văn) / lu-lo (suồng).
- **chúng tôi/ta**: kami (loại trừ người nghe) / **kita** (bao gồm người nghe)
  — phân biệt quan trọng.
- Danh xưng thay đại từ: **Bapak/Pak** (ông), **Ibu/Bu** (bà), Mas (anh), Mbak
  (chị).

Quyết định sản phẩm — dạy mức nào (xem `review-checklist.md` D-id-05).

## Map taxonomy 6 mức (ADR-016)

| Mức | Tiếng Indonesia |
|---|---|
| CASUAL | aku/kamu + bahasa gaul (halo, gimana, nggak) |
| NATURAL_NEUTRAL_POLITE (baseline) | saya/Anda — bahasa baku |
| FORMAL | saya/Bapak-Ibu + Selamat pagi, tolong, terima kasih, maaf, permisi |
| HONORIFIC (modifier) | **not-applicable hình thái** (es B-02) — lịch sự qua đại từ + danh xưng, không biến tố kính ngữ kiểu ja/ko |

## Bahasa baku vs gaul

Khoảng cách chuẩn (baku) ↔ khẩu ngữ (gaul) **lớn**. Dạy **baku** làm nền (trừ
khi mục tiêu là khẩu ngữ).

## Chưa giải quyết / native review

- Mức đại từ phù hợp ngữ cảnh, kami/kita, độ tự nhiên → `native-review-id.md`.
