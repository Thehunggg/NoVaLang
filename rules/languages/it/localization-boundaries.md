---
id: it/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [it/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Italian localization boundaries

Ranh giới 3 trục nội dung (D-05):

- `learningLanguageCode = it`: câu/từ đích tiếng Ý (surface text, có à/è/é/ì/ò/ù).
- `nativeLanguageCode`: nghĩa, giải thích, hint, feedback theo ngôn ngữ mẹ đẻ,
  KHÔNG lẫn tiếng Ý trừ thuật ngữ đích.
- `uiLanguageCode`: chrome giao diện.

Không silent fallback chéo ngôn ngữ. Thuật ngữ ngữ pháp Ý (articolo, ausiliare,
clitico) khi giải thích phải dịch sang ngôn ngữ mẹ đẻ.

## Provenance

`S-TRAINED-KNOWLEDGE`.
