---
id: nb/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [nb/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Norwegian Bokmål TTS and Audio (nb-NO)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ æ ø å. TTS nb-NO đọc trực tiếp
  (engine xử lý pitch accent + âm câm).
- **AUDIO/TTS quan trọng cho nb**: pitch accent (2 thanh) + âm câm (hv→v, d/g
  cuối câm) không suy được từ chữ → audio là kênh phát âm chính, ưu tiên approved
  audio cho từ vựng cốt lõi.
- Văn bản gửi TTS **PHẢI giữ æ ø å** (là chữ, bỏ đọc/nghĩa sai).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`nb-NO` (baseline Østnorsk/Oslo). Khớp WikiPron `nob` + UD Norwegian-Bokmaal
dataset. KHÔNG dùng nn (Nynorsk).

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ æ ø å). Không thay đổi runtime
trong task này.
