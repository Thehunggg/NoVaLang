---
id: sv/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [sv/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Swedish Localization Boundaries

Vai trò của sv trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = sv`: câu/từ đích, phát âm, chính tả Thụy Điển (đầy đủ
  å ä ö).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch sv↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/sv/` (INV-1).

## å ä ö bắt buộc trong dữ liệu

Văn bản đích PHẢI giữ đầy đủ å ä ö (là chữ cái, bỏ đọc/nghĩa sai). Chỉ tầng
chấm điểm mới bàn tới việc chấp nhận/không (xem `answer_acceptance_sv` — đề
xuất KHÔNG chấp nhận thiếu, theo tiền lệ pl D-64).

## Biến thể

Baseline sv-SE (Thụy Điển). Finland Swedish (fi-SV) khác về phát âm (không
pitch accent rõ, một số từ vựng) — nếu thêm sau phải tách rõ.

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn dấu cách (1 234,56). Tiền: kr (Krona). Ngày:
åååå-mm-dd (ISO, phổ biến ở Thụy Điển). Quy ước hiển thị theo locale sv-SE.
