---
id: fil/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fil/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Filipino TTS and Audio (fil-PH)

## Chính sách

- `speechText` = surface text Latin Filipino. TTS fil-PH đọc trực tiếp.
- **AUDIO/TTS**: trọng âm + âm tắc thanh hầu KHÔNG viết → audio là kênh phát âm
  chính (approved audio giá trị cao cho từ vựng cốt lõi).
- Văn bản gửi TTS giữ nguyên chữ Filipino.
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`fil-PH`. Khớp WikiPron `tgl` + UD Tagalog dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ Filipino). Không thay đổi runtime trong task
này.
