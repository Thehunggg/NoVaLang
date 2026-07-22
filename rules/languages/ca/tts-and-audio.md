---
id: ca/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ca/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Catalan TTS and Audio (ca)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ ç, l·l, à è é í ï ò ó ú ü. TTS ca đọc
  trực tiếp (engine xử lý giảm nguyên âm + xát).
- **AUDIO/TTS quan trọng cho ca**: giảm nguyên âm ([ə]/[u]) không suy được từ
  chữ → audio là kênh phát âm chính, ưu tiên approved audio cho từ vựng cốt lõi.
- Văn bản gửi TTS **PHẢI giữ ç/l·l/dấu** (bỏ = đọc/nghĩa sai).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`ca` (Central Catalan baseline). Khớp WikiPron `cat` + UD Catalan-AnCora
dataset. Valencian là biến thể (không phải locale mặc định).

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ ç/l·l/dấu). Không thay đổi runtime
trong task này.
