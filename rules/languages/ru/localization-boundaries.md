---
id: ru/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ru/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Russian Localization Boundaries

Vai trò của ru trong NovaLang: **learning language** (T1). Chưa dùng làm
`nativeLanguageCode`/`uiLanguageCode` mặc định (đang là playable-needs-rule).

## Ranh giới trường

- `learningLanguageCode = ru`: câu/từ đích, phát âm, chính tả Kirin.
- Trợ đọc dấu trọng âm (ударение) là lớp HIỂN THỊ, không thay chính tả gốc.
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch ru↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/ru/` (INV-1).

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn dấu cách (1 234,56). Tiền: ₽ (Rúp).
Ngày: dd.mm.yyyy. Quy ước hiển thị theo locale ru-RU.

## ё và trọng âm khi hiển thị

- Văn bản đích có thể hiển thị `ё` đầy đủ (trợ đọc) hoặc `е` (chuẩn đời thường)
  — thống nhất trong một bài; khi chấm chấp nhận cả hai (xem `answer_acceptance_ru`).
- Dấu trọng âm chỉ ở lớp trợ đọc; văn bản lưu/gửi TTS không mang dấu trọng âm
  trừ khi engine hỗ trợ + được duyệt.
