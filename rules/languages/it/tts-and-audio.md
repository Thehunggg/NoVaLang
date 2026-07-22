---
id: it/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [it/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Italian TTS and audio

- `speechText` = surface text Latin (chính tả minh bạch, TTS đọc trực tiếp).
- Locale mặc định: **it-IT** (khớp WikiPron/UD dataset).
- Kế thừa `_base/audio.rules.json`: ưu tiên approved_audio → tts_correct_locale
  → explicit_error; không silent fallback; không autoplay; replay không giới
  hạn; tốc độ 1.0 và 0.75.

## Provenance

`S-TRAINED-KNOWLEDGE`.
