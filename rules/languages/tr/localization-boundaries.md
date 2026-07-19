---
id: tr/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Turkish Localization Boundaries — Ranh giới bản địa hoá

- **learningLanguageCode = tr**: sở hữu từ/câu đích, phát âm.
- **nativeLanguageCode**: nghĩa, dịch, giải thích ngữ pháp, gợi ý, phản hồi.
- **uiLanguageCode**: nhãn giao diện.

## ĐẶC BIỆT: locale casing tr

Thuật toán viết hoa/thường **phải dùng locale `tr`** (i↔İ, ı↔I) ở MỌI nơi xử lý
chuỗi tiếng Thổ (tìm kiếm, so khớp đáp án, hiển thị) — dùng locale mặc định sẽ
làm sai chấm i. Đây là ranh giới kỹ thuật bắt buộc.

## Định dạng vùng (tr-TR, CLDR)

- Số thập phân: dấu **phẩy** `,`; ngăn nghìn: dấu chấm `.`.
- Tiền tệ: lira `₺` (đứng sau số).
- Ngày: `dd.MM.yyyy`. Tuần bắt đầu **thứ Hai**.

## Không thuộc file này

Cạm bẫy dịch tr↔ngôn ngữ cụ thể thuộc `rules/pairs/` (INV-1).
