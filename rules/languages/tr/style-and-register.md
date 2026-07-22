---
id: tr/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [tr/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Turkish Style & Register — Văn phong và mức diễn đạt

Áp dụng ADR-016. Baseline `NATURAL_NEUTRAL_POLITE`.

## Xưng hô — CÓ đối lập T-V

- **sen** (số ít, thân mật): bạn bè, gia đình, trẻ, ngang hàng.
- **siz** (số nhiều HOẶC lịch sự số ít): người lạ, lớn tuổi, cấp trên — như
  `vous` của Pháp; động từ -siniz.
- Danh xưng: **Bey** (ông, SAU tên: Ahmet Bey), **Hanım** (bà, SAU tên: Ayşe
  Hanım).

Quyết định sản phẩm — dạy cả hai (xem `review-checklist.md` D-tr-05).

## Map taxonomy 6 mức (ADR-016)

| Mức | Tiếng Thổ |
|---|---|
| CASUAL | sen + selam, merhaba, naber |
| NATURAL_NEUTRAL_POLITE (baseline) | siz trung tính / sen ngang hàng |
| FORMAL | siz + Merhaba, lütfen, teşekkür ederim, özür dilerim + Bey/Hanım |
| HONORIFIC (modifier) | **not-applicable** (es B-02) — không có kính ngữ hình thái kiểu ja/ko |

## Thiết bị lịch sự

...abilir misiniz? (Ngài có thể...?), lütfen (làm ơn), rica ederim (xin mời),
özür dilerim (xin lỗi), teşekkür ederim (cảm ơn).

## Chưa giải quyết / native review

- Sắc thái evidential -miş trong hội thoại, ranh giới sen/siz thực tế, độ tự
  nhiên → `native-review-tr.md`.
