---
id: uk/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [uk/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Ukrainian Style & Register — Văn phong và mức diễn đạt

Áp dụng ADR-016. Baseline `NATURAL_NEUTRAL_POLITE`.

## Xưng hô — CÓ đối lập T-V

- **ти** (số ít, thân mật): bạn bè, gia đình, trẻ, ngang hàng.
- **ви** (số nhiều HOẶC lịch sự số ít): người lạ, lớn tuổi, cấp trên — như `vous`
  của Pháp. **Ви** có thể viết hoa trong thư từ.

Gọi lịch sự dùng **vocative** + пане/пані: пане Петре!, пані Оксано!. Quyết định
sản phẩm — dạy cả hai (xem `review-checklist.md` D-uk-05).

## Map taxonomy 6 mức (ADR-016)

| Mức | Tiếng Ukraina |
|---|---|
| CASUAL | ти + привіт, як справи |
| NATURAL_NEUTRAL_POLITE (baseline) | ви trung tính / ти ngang hàng |
| FORMAL | ви + Доброго дня, будь ласка, дякую, перепрошую + vocative |
| HONORIFIC (modifier) | **not-applicable** (es B-02) — không có kính ngữ hình thái kiểu ja/ko |

## Tránh русизми (từ Nga không chuẩn)

Dùng từ Ukraina chuẩn: **дякую** (không *спасибі* ở trang trọng), будь ласка,
гаразд, перепрошую. Đây là điểm nhạy cảm văn hoá/ngôn ngữ — native review.

## Chưa giải quyết / native review

- Ranh giới русизм cụ thể, sắc thái vocative, độ tự nhiên → `native-review-uk.md`.
