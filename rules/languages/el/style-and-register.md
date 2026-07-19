---
id: el/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [el/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Greek Style & Register — Văn phong và mức diễn đạt

Áp dụng ADR-016 (naturalness & register). Baseline `NATURAL_NEUTRAL_POLITE`.

## Xưng hô — CÓ đối lập T-V (khác da/sv)

- **εσύ** (số ít, thân mật): bạn bè, gia đình, trẻ em, ngang hàng.
- **εσείς** (số nhiều HOẶC lịch sự số ít): người lạ, lớn tuổi, cấp trên,
  trang trọng — dùng động từ ngôi 2 số nhiều để nói lịch sự với **một** người
  (như `vous` của tiếng Pháp).

Đây là quyết định sản phẩm — dạy cả hai, chọn theo quan hệ (xem
`review-checklist.md` D-el-05).

## Map taxonomy 6 mức (ADR-016)

| Mức | Tiếng Hy Lạp |
|---|---|
| CASUAL | εσύ + γεια, γεια σου, τι κάνεις |
| NATURAL_NEUTRAL_POLITE (baseline) | εσείς trung tính (người lạ) / εσύ ngang hàng |
| FORMAL | εσείς + Καλημέρα σας, παρακαλώ, ευχαριστώ πολύ, συγγνώμη |
| HONORIFIC (modifier) | **not-applicable** — xem dưới |
| CEREMONIAL / SLANG | theo `_base` (không đặc thù el ở giai đoạn này) |

**HONORIFIC not-applicable**: tiếng Hy Lạp không có hệ kính ngữ hình thái
riêng biệt kiểu ja (敬語)/ko (-시-). Lịch sự thể hiện qua εσείς + từ vựng — đã
bao trong FORMAL. Tự áp **tiền lệ es B-02** (owner duyệt 2026-07-19, ngôn ngữ
châu Âu).

## Lưu ý diglossia lịch sử

katharevousa (thể thức cổ) vs dimotiki (bình dân) đã hợp nhất thành Standard
Modern Greek (1976). katharevousa chỉ còn dấu vết từ vựng trang trọng/pháp
lý/tôn giáo — KHÔNG dạy làm register riêng.

## Thiết bị lịch sự (gián tiếp)

`Θα μπορούσατε...;` (Ngài có thể...?), `Παρακαλώ` (làm ơn), `Θα ήθελα...`
(Tôi muốn...), `συγγνώμη` (xin lỗi/xin phép), `ευχαριστώ` (cảm ơn).

## Chưa giải quyết / native review

- Sắc thái từ vựng katharevousa còn sống trong văn phong trang trọng.
- Độ tự nhiên bản dịch → `native-review-el.md`.
