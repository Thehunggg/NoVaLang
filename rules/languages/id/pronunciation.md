---
id: id/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [id/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Indonesian Pronunciation — Phát âm tiếng Indonesia

Chính tả KHÁ ĐỀU (phonemic) trừ 'e' nhập nhằng. g2p-check trên **18590 từ
WikiPron thật**: digraph vi phạm thấp.

## 6 nguyên âm

a [a] · i [i] · u [u] · o [o] · **e [e ~ ə]** (schwa nhập nhằng).

## Phụ âm

c [tʃ] · j [dʒ] · y [j] · ng [ŋ] · ny [ɲ] · sy [ʃ] · kh [x]; glottal stop [ʔ]
(k cuối / ').

## Kỷ luật dữ liệu (g2p-check)

- ny 0.68%, ng 0.67%, sy 6.76% — tốt.
- **c/j 5.41%/4.42% "vi phạm"** = artifact tie-bar-vs-space tokenization (ánh
  xạ đúng).
- **y→[j] báo 44.80%** = y nằm TRONG digraph ny [ɲ] / sy [ʃ] bị nuốt trước →
  rule đúng, ưu tiên digraph (giống uk/tr).
- **'e' [e]/[ə]** không phân biệt chính tả (emas [ə]/enak [e]) — lexical, audio.

## Trọng âm

Nhẹ, không phân biệt nghĩa (thường áp chót). TTS id-ID đọc tốt — xem
`tts-and-audio.md`.
