---
id: da/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [da/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Danish TTS and Audio (da-DK)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ æ ø å. TTS da-DK đọc trực tiếp
  (engine xử lý stød + phát âm không đều).
- **AUDIO/TTS đặc biệt quan trọng cho da**: chính tả không đoán được phát âm
  (soft d, stød, âm câm) → audio là kênh phát âm chính, ưu tiên approved audio
  chất lượng cao cho từ vựng cốt lõi.
- Văn bản gửi TTS **PHẢI giữ æ ø å** (là chữ, bỏ đọc/nghĩa sai).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75 (0.75 hữu ích vì da nói nhanh/nuốt âm).

## Locale

`da-DK`. Khớp WikiPron `dan` + UD Danish dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ æ ø å). Không thay đổi runtime
trong task này.
