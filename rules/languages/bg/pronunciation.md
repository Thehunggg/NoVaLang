---
id: bg/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [bg/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Bulgarian Pronunciation — Phát âm tiếng Bulgaria

Chính tả KHÁ ĐỀU (phonemic) trừ **giảm nguyên âm không nhấn**. g2p-check trên
**47572 từ WikiPron thật**: phụ âm sạch (<1%, trừ ж biến âm cuối).

## 6 nguyên âm

а [a] · е [ɛ] · и [i] · о [ɔ] · у [u] · **ъ [ɤ]** (ер голям, đặc trưng).

## Phụ âm

г [g] (KHÁC Ukraina) · ж [ʒ] · ш [ʃ] · ч [tʃ] · ц [ts] · х [x] · **щ [ʃt]**
(sht — KHÁC Nga).

## Kỷ luật dữ liệu (g2p-check)

- ш 0.00%, ч 0.08%, ц 0.25%, х 0.00%, ж 4.22% (biến âm cuối câm [ʃ]).
- **щ→[ʃt] báo 100% "vi phạm"** = artifact tokenization (WikiPron tách 'ʃ t');
  kiểm tay щ→[ʃ t] **đúng 100%**.
- **ъ→[ɤ] báo 67%** = GIẢM NGUYÊN ÂM: ъ nhấn→[ɤ], không nhấn→[ɐ] (а/ъ trộn) —
  quy tắc âm vị học thật.

## Giảm nguyên âm + trọng âm

Nguyên âm không nhấn giảm (а/ъ→[ɐ], о→[o~u]). Trọng âm động di động, KHÔNG đánh
dấu → audio quan trọng. Xem `tts-and-audio.md`.
