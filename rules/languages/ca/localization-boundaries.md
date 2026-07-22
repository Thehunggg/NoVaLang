---
id: ca/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ca/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Catalan Localization Boundaries

Vai trò của ca trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = ca`: câu/từ đích, phát âm, chính tả Catalan (đầy đủ
  ç, l·l, à è é í ï ò ó ú ü).
- Không tự dịch máy sang ngôn ngữ khác. **Cặp bẫy ca↔es đặc biệt quan trọng**
  (Catalan và tiếng TBN gần nhau, dễ lẫn castellanismes) → `rules/pairs/ca-es/`,
  KHÔNG ở `languages/ca/` (INV-1).
- **ca ≠ es**: Catalan là ngôn ngữ riêng, không phải phương ngữ tiếng TBN.

## ç/l·l/dấu bắt buộc + audio cho phát âm

Văn bản đích PHẢI giữ ç, l·l, dấu. Giảm nguyên âm cần **audio/TTS** làm kênh
phát âm chính (xem `tts_audio_policy`). Tầng chấm điểm: xem `answer_acceptance_ca`
(ç/l·l = sai theo pl D-64; dấu trọng âm = cảnh báo nhẹ theo es D-74).

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn `.` (1.234,56). Tiền: € (euro). Ngày:
dd/mm/yyyy. Quy ước hiển thị theo locale ca (Catalunya/Espanya).
