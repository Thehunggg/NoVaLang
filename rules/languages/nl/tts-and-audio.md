---
id: nl/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [nl/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Dutch TTS and Audio (nl-NL)

## Chính sách

- `speechText` = surface text Latin (chữ đích). TTS nl-NL đọc trực tiếp.
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`nl-NL` (chuẩn Hà Lan). Khớp WikiPron `nld` + UD Dutch dataset.

**KHÔNG** dùng giọng `nl-BE` (Flemish) cho baseline nl-NL: khác rõ (g mềm hơn
ở miền Nam, một số nguyên âm) → sai với những gì học viên thấy/học.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích). Không thay đổi runtime trong task này.
