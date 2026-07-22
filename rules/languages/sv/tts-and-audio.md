---
id: sv/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [sv/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Swedish TTS and Audio (sv-SE)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ å ä ö. TTS sv-SE đọc trực tiếp
  (engine tự xử lý pitch accent + độ dài nguyên âm).
- Văn bản gửi TTS **PHẢI giữ å ä ö** (là chữ, bỏ đọc/nghĩa sai).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`sv-SE`. Khớp WikiPron `swe` + UD Swedish dataset.

**KHÔNG** dùng giọng Finland Swedish (fi-SV) cho baseline sv-SE (khác pitch
accent + một số nguyên âm).

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ å ä ö). Không thay đổi runtime
trong task này.
