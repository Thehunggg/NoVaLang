---
id: fi/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fi/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Finnish Localization Boundaries

Vai trò của fi trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = fi`: câu/từ đích, phát âm, chính tả Phần Lan (đầy đủ
  ä ö + độ dài đôi).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch fi↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/fi/` (INV-1).

## ä ö + độ dài bắt buộc trong dữ liệu

Văn bản đích PHẢI giữ đầy đủ ä ö và chữ đôi (độ dài phonemic + hoà âm — bỏ =
đổi nghĩa/phá hệ thống). Chỉ tầng chấm điểm mới bàn (xem `answer_acceptance_fi`
— đề xuất KHÔNG chấp nhận thiếu, theo tiền lệ pl D-64).

## Biến thể viết/nói

Baseline yleiskieli (chuẩn viết). puhekieli (khẩu ngữ) khác hệ thống — nếu thêm
sau phải tách rõ, gắn nhãn register, không trộn vào chuẩn viết.

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn dấu cách (1 234,56). Tiền: € (Euro). Ngày:
d.m.yyyy. Quy ước hiển thị theo locale fi-FI.
