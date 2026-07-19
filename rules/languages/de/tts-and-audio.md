---
id: de/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [de/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# German TTS and audio

- `speechText` = surface text Latin (chính tả minh bạch, TTS đọc trực tiếp).
  KHÔNG dùng lớp phiên âm riêng.
- Locale mặc định: **de-DE** (khớp WikiPron/UD dataset). Xem review-checklist
  D-de-01 nếu owner muốn de-AT (Áo) / de-CH (Thụy Sĩ).
- Kế thừa `_base/audio.rules.json`: ưu tiên approved_audio → tts_correct_locale
  → explicit_error; không silent fallback; không autoplay; replay không giới
  hạn; tốc độ 1.0 và 0.75.

## Provenance

`S-TRAINED-KNOWLEDGE`.
