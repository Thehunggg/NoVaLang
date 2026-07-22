---
id: pl/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [pl/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Polish TTS and Audio (pl-PL)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ DẤU Ba Lan. TTS pl-PL đọc trực tiếp.
- Văn bản gửi TTS **PHẢI giữ đủ dấu** (ó≠o, ł≠l về âm) — bỏ dấu sẽ đọc sai từ.
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`pl-PL`. Khớp WikiPron `pol` + UD Polish dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ dấu). Không thay đổi runtime
trong task này.
