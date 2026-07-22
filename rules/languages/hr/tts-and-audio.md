---
id: hr/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [hr/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Croatian TTS and Audio (hr-HR)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ č ć š ž đ + dž lj nj. TTS hr-HR đọc
  trực tiếp (chính tả đều, engine xử lý pitch accent).
- **AUDIO/TTS cho pitch accent**: hệ trọng âm 4 kiểu không đánh dấu → audio là
  kênh phát âm chính cho phần thanh điệu; phần còn lại đọc được từ chữ.
- Văn bản gửi TTS **PHẢI giữ č ć š ž đ** (là chữ, bỏ = đọc/nghĩa sai).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`hr-HR`. Khớp WikiPron `hbs` (Latin) + UD Croatian-SET dataset. KHÔNG dùng sr
(thường Cyrillic).

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ dấu). Không thay đổi runtime
trong task này.
