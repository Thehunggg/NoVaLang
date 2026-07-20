---
id: ms/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ms/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Malay TTS and Audio (ms-MY)

## Chính sách

- `speechText` = surface text Latin Mã Lai (Rumi). TTS ms-MY đọc trực tiếp
  (chính tả đều).
- **AUDIO/TTS**: 'e' [e]/[ə] + k cuối [ʔ] không suy chắc từ chữ → audio là kênh
  phát âm chính cho phần đó; phần còn lại đọc được từ chữ.
- Văn bản gửi TTS giữ nguyên chữ Mã Lai.
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`ms-MY`. Khớp WikiPron `msa`. (KHÔNG có UD Mã Lai; dùng CLDR + WikiPron.)

## Đã kiểm

TTS baseline dùng `speechText` (chữ Mã Lai). Không thay đổi runtime trong task
này.
