---
id: fi/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fi/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Finnish TTS and Audio (fi-FI)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ ä ö + chữ đôi. TTS fi-FI đọc trực
  tiếp (chính tả 1:1 + trọng âm đầu từ cố định → TTS rất dễ, đáng tin).
- Văn bản gửi TTS **PHẢI giữ ä ö + chữ đôi** (độ dài phonemic, bỏ đọc/nghĩa sai:
  tuli/tuuli/tulli).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`fi-FI`. Khớp WikiPron `fin` + UD Finnish dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ ä ö + độ dài). Không thay đổi
runtime trong task này.
