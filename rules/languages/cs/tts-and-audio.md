---
id: cs/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [cs/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Czech TTS and Audio (cs-CZ)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ dấu Séc. TTS cs-CZ đọc trực tiếp
  (trọng âm đầu từ cố định → TTS dễ, đáng tin).
- Văn bản gửi TTS **PHẢI giữ đầy đủ dấu** (háček + độ dài — bỏ đọc/nghĩa sai:
  byt/být).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`cs-CZ`. Khớp WikiPron `ces` + UD Czech dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ dấu). Không thay đổi runtime
trong task này.
