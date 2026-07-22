---
id: hr/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [hr/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Croatian Localization Boundaries

Vai trò của hr trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = hr`: câu/từ đích, phát âm, chính tả Croatia (đầy đủ
  č ć š ž đ + dž lj nj).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch hr↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/hr/` (INV-1).
- **hr ≠ sr/bs**: chuẩn Croatia riêng (từ vựng + chữ Latin). Không trộn.

## Dấu bắt buộc + audio cho pitch accent

Văn bản đích PHẢI giữ č ć š ž đ (là chữ). Pitch accent cần **audio/TTS**. Tầng
chấm điểm: xem `answer_acceptance_hr` (thiếu dấu = sai theo pl D-64).

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn `.` (1.234,56). Tiền: € (euro, từ 2023).
Ngày: dd.mm.yyyy. Quy ước hiển thị theo locale hr-HR.
