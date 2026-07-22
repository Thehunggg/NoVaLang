---
id: ms/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ms/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Malay Localization Boundaries

Vai trò của ms trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = ms`: câu/từ đích, phát âm, chính tả Mã Lai (Rumi).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch ms↔<X> (đặc biệt ms↔id vì
  rất gần) → `rules/pairs/`, KHÔNG ở `languages/ms/` (INV-1).
- **ms ≠ id**: giữ chuẩn Mã Lai (wang không uang; chính tả/từ vựng Malaysia).

## Chữ Latin + audio

Văn bản đích viết chữ Latin Mã Lai (Rumi), không dấu phụ. 'e' [e]/[ə] + k cuối
[ʔ] cần **audio/TTS**. Tầng chấm điểm: xem `answer_acceptance_ms` (đơn giản,
không dấu phụ).

## Số / ngày / tiền tệ

Thập phân `.`, phân nhóm nghìn `,` (kiểu Anh). Tiền: RM (Ringgit Malaysia, MYR).
Ngày: dd/mm/yyyy. Quy ước theo locale ms-MY.
