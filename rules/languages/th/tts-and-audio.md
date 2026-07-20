---
id: th/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [th/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Thai TTS and Audio (th-TH)

## Chính sách

- `speechText` = surface text chữ Thái ĐẦY ĐỦ dấu nguyên âm + dấu thanh. TTS
  th-TH đọc trực tiếp (engine xử lý thanh + tách từ nội bộ).
- **AUDIO/TTS ĐẶC BIỆT quan trọng cho th**: 5 thanh + hệ suy thanh đa yếu tố
  không đoán dễ từ chữ với người mới → audio là kênh phát âm chính; approved
  audio cho từ vựng cốt lõi rất giá trị.
- Văn bản gửi TTS **PHẢI giữ dấu thanh/nguyên âm** (bỏ = đổi thanh/nghĩa).
- **KHÔNG gửi RTGS/chuyển tự Latin cho TTS** — chỉ chữ Thái.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75 (0.75 hữu ích để nghe thanh).

## Locale

`th-TH`. Khớp WikiPron `tha` + UD Thai-PUD dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ Thái đầy đủ dấu). Không thay đổi runtime
trong task này.
