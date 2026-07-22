---
id: es/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [es/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Spanish Localization Boundaries

Áp dụng nguyên tắc "UI Language Purity" / "Learning Content Language Purity"
(`AGENTS.md`) cho tiếng Tây Ban Nha.

## Language ownership matrix

| Content type | Language authority | Notes |
|---|---|---|
| App chrome, buttons, errors, loading | `uiLanguageCode` | `es` chưa có trong `native_language_options.json` với `isAvailableForUi: true` — kiểm tra lại khi kích hoạt thật (KHÔNG thuộc phạm vi task này) |
| Learner-support meaning/translation | `nativeLanguageCode` | Không ghi đè target text |
| Reading aid | not-applicable | Chính tả minh bạch, không cần romanization/furigana |
| Pronunciation | Spanish pronunciation authority | Trọng âm/tilde tách khỏi chính tả — xem `pronunciation.md` |
| Spanish target sentence/dialogue | learning language `es` | Không phải UI-language leak |
| Audio/TTS | Spanish speech field (surface text) | Script gốc — xem `tts-and-audio.md` |

## Provenance

`S-TRAINED-KNOWLEDGE` — áp dụng khuôn field-separation đã có sẵn trong repo.

## Chưa giải quyết

- `es` là learning-only (`roles: ["learning"]` trong `catalog.json`) — không
  có vai native/UI trong scope hiện tại của task này.
