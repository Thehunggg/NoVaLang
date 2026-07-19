---
id: nb/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [nb/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Norwegian Bokmål Localization Boundaries

Vai trò của nb trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = nb`: câu/từ đích, phát âm, chính tả Na Uy Bokmål (đầy
  đủ æ ø å).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch nb↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/nb/` (INV-1).
- **nb ≠ nn**: đây là Bokmål; Nynorsk là mã ngôn ngữ riêng (nn), không trộn.

## æ ø å bắt buộc + audio cho phát âm

Văn bản đích PHẢI giữ æ ø å (là chữ). Pitch accent + âm câm cần **audio/TTS**
làm kênh phát âm chính (xem `tts_audio_policy`). Chỉ tầng chấm điểm mới bàn chấp
nhận/không (xem `answer_acceptance_nb` — đề xuất KHÔNG chấp nhận thiếu, tiền lệ
pl D-64).

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn ` ` (khoảng trắng) hoặc `.` (1 234,56).
Tiền: kr (Norske kroner, NOK). Ngày: dd.mm.yyyy. Quy ước hiển thị theo locale
nb-NO.
