---
id: ro/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ro/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Romanian TTS and Audio (ro-RO)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ ă/â/î/ș/ț (ș/ț comma-below). TTS
  ro-RO đọc trực tiếp.
- Văn bản gửi TTS **PHẢI giữ đầy đủ dấu** (là chữ, bỏ đọc/nghĩa sai) + đúng
  comma-below cho ș/ț (cedilla có thể làm engine đọc khác).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`ro-RO`. Khớp WikiPron `ron` + UD Romanian dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ dấu). Không thay đổi runtime
trong task này.
