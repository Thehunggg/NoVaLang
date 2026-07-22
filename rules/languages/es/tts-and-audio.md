---
id: es/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [es/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Spanish TTS and Audio

## speechText

`speechText` = surface text Latin (chính tả minh bạch, TTS đọc trực tiếp
được, không cần lớp chuyển đổi trung gian như ja/ko).

## Locale

**CHƯA CHỐT** — phụ thuộc trực tiếp GIẢ ĐỊNH B-01 (`style-and-register.md`):
`es-ES` (Tây Ban Nha, distinción) hay `es-419`/`es-MX`/`es-AR` (Mỹ Latin,
seseo). WikiPron dataset đã import dùng bản `la` (seseo) — gợi ý thiên về
`es-419` nhưng KHÔNG phải quyết định chính thức.

## Kế thừa `_base/audio.rules.json`

Không có gì cần override riêng — thứ tự ưu tiên `approved_audio ->
tts_correct_locale -> explicit_error`, không fallback im lặng, tốc độ
`[1.0, 0.75]`.

## Provenance

`S-TRAINED-KNOWLEDGE`.

## Chưa giải quyết

Locale cụ thể (es-ES vs es-419) — phụ thuộc B-01.
