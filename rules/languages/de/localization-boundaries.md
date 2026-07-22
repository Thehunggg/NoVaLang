---
id: de/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [de/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# German localization boundaries

Ranh giới 3 trục nội dung (theo D-05):

- `learningLanguageCode = de`: câu/từ đích tiếng Đức (surface text, có ä/ö/ü/ß,
  danh từ viết hoa).
- `nativeLanguageCode`: nghĩa, giải thích ngữ pháp, hint, feedback — theo
  ngôn ngữ mẹ đẻ người học, KHÔNG lẫn tiếng Đức trừ thuật ngữ đích.
- `uiLanguageCode`: chrome giao diện.

Không silent fallback chéo ngôn ngữ. Thuật ngữ ngữ pháp Đức (Kasus, Umlaut,
trennbare Verben) khi giải thích phải dịch/chú thích sang ngôn ngữ mẹ đẻ,
không để nguyên tiếng Đức trần trong ô giải thích.

## Provenance

`S-TRAINED-KNOWLEDGE`.
