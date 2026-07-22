---
id: fil/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fil/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Filipino Localization Boundaries

Vai trò của fil trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = fil`: câu/từ đích, phát âm, chính tả Filipino.
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch fil↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/fil/` (INV-1).
- **Taglish**: giữ nội dung đích là Filipino chuẩn, không trộn tiếng Anh trong
  bài chuẩn (dù đời thường phổ biến).

## Chữ Latin + audio cho trọng âm/glottal

Văn bản đích viết chữ Latin Filipino. Trọng âm + âm tắc thanh hầu (không viết)
cần **audio/TTS**. Tầng chấm điểm: xem `answer_acceptance_fil` (accents tuỳ
chọn, không bắt buộc).

## Số / ngày / tiền tệ

Thập phân `.`, phân nhóm nghìn `,` (kiểu Mỹ). Tiền: ₱ (peso, PHP). Ngày:
mm/dd/yyyy (ảnh hưởng Mỹ) hoặc dd/mm/yyyy. Quy ước theo locale fil-PH.
