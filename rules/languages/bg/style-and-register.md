---
id: bg/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [bg/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Bulgarian Style & Register — Văn phong và mức diễn đạt

Áp dụng ADR-016. Baseline `NATURAL_NEUTRAL_POLITE`.

## Xưng hô — CÓ đối lập T-V

- **ти** (số ít, thân mật): bạn bè, gia đình, trẻ, ngang hàng.
- **Вие** (số nhiều HOẶC lịch sự số ít): người lạ, lớn tuổi, cấp trên — như
  `vous` Pháp; **viết hoa Вие/Ви** khi lịch sự (phân biệt số nhiều thường вие).
- Danh xưng: **господин** (ông), **госпожа** (bà), **госпожица** (cô).

Quyết định sản phẩm — dạy cả hai (xem `review-checklist.md` D-bg-05).

## Map taxonomy 6 mức (ADR-016)

| Mức | Tiếng Bulgaria |
|---|---|
| CASUAL | ти + здравей, здрасти |
| NATURAL_NEUTRAL_POLITE (baseline) | Вие trung tính / ти ngang hàng |
| FORMAL | Вие + Добър ден, моля, благодаря, извинете + господин/госпожа |
| HONORIFIC (modifier) | **not-applicable** (es B-02) — không có kính ngữ hình thái kiểu ja/ko |

## Thiết bị lịch sự

Бихте ли...? (Ngài có thể...?), моля (làm ơn), заповядайте (xin mời), извинете
(xin lỗi), благодаря (cảm ơn).

## Chưa giải quyết / native review

- Sắc thái evidential -л, ranh giới ти/Вие, độ tự nhiên → `native-review-bg.md`.
