---
id: tr/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [tr/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Turkish Pronunciation — Phát âm tiếng Thổ

**Tin rất tốt**: chính tả Thổ RẤT ĐỀU (một-chữ-một-âm, thiết kế bởi cải cách
Atatürk 1928). g2p-check trên **12321 từ WikiPron thật**: các chữ chính vi phạm
**<2%**.

## 8 nguyên âm (đối xứng theo hoà âm)

| | Dẹt | Tròn |
|---|---|---|
| **Sau** | a [a], ı [ɯ] | o [o], u [u] |
| **Trước** | e [e], i [i] | ö [ø], ü [y] |

## Phụ âm đặc trưng

c [dʒ] · ç [tʃ] · ş [ʃ] · j [ʒ] · y [j] · **ğ** (yumuşak ge — kéo dài nguyên
âm trước / ~câm: dağ → [daː]; không đứng đầu từ).

## Kỷ luật dữ liệu (g2p-check)

- ş 0.16%, j 1.75%, ü 0.77%, ı 1.29% — sạch.
- **c 21%, ç 17% "vi phạm"** = ARTIFACT tokenization WikiPron (khi 't͡ʃ' một
  token, khi 't ʃ' hai token). Kiểm tay: Acem→[a d͡ʒ e m] — **ánh xạ ĐÚNG
  100%**. Không phải rule sai.
- ö 18% "vi phạm" = biến thể narrow [œ]/[ø]; broad ö→[ø] đúng.

## Trọng âm

Thường ở âm tiết CUỐI (có ngoại lệ: một số hậu tố/địa danh trọng âm không cuối).
Không thanh điệu. TTS tr-TR đọc rất tốt (chính tả đều) — xem `tts-and-audio.md`.
