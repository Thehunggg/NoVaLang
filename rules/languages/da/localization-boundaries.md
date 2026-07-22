---
id: da/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [da/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Danish Localization Boundaries

Vai trò của da trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = da`: câu/từ đích, phát âm, chính tả Đan Mạch (đầy đủ
  æ ø å).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch da↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/da/` (INV-1).

## æ ø å bắt buộc + audio cho phát âm

Văn bản đích PHẢI giữ æ ø å (là chữ). Vì chính tả không đoán phát âm, **audio/
TTS là kênh phát âm chính** cho da (xem `tts_audio_policy`). Chỉ tầng chấm điểm
mới bàn chấp nhận/không (xem `answer_acceptance_da` — đề xuất KHÔNG chấp nhận
thiếu, tiền lệ pl D-64).

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn `.` (1.234,56). Tiền: kr (Krone). Ngày:
dd-mm-yyyy hoặc dd/mm/yyyy. Quy ước hiển thị theo locale da-DK.
