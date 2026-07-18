---
id: fr/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fr/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# French Localization Boundaries

Áp dụng nguyên tắc "UI Language Purity" / "Learning Content Language Purity"
(`AGENTS.md`) cho tiếng Pháp.

## Language ownership matrix

| Content type | Language authority | Notes |
|---|---|---|
| App chrome, buttons, errors | `uiLanguageCode` | `fr` chưa có trong `native_language_options.json` với `isAvailableForUi: true` — KHÔNG thuộc phạm vi task này |
| Learner-support meaning/translation | `nativeLanguageCode` | Không ghi đè target text |
| Reading aid | not-applicable | Chữ Latin, không cần romanization/furigana |
| Pronunciation | French pronunciation authority | Liaison/nasal vowels tách khỏi chính tả |
| French target sentence/dialogue | learning language `fr` | Không phải UI-language leak |
| Audio/TTS | French speech field (surface text) | Script gốc |

## Provenance

`S-TRAINED-KNOWLEDGE`.

## Chưa giải quyết

`fr` là learning-only, không có vai native/UI trong scope task này.
