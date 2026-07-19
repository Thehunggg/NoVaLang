---
id: ca/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [ca/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Catalan Pronunciation (ca, Central baseline)

⚠️ **WikiPron ca RẤT NHỎ (176 cặp)** — g2p-check KHÔNG đáng tin cho ca, không
dùng làm bằng chứng dương. Phụ âm dựa kiến thức chuẩn; phát âm nguyên âm dựa
audio.

## Phụ âm đặc trưng (kiến thức chuẩn)

| Chữ | Âm |
|---|---|
| `ç`, `c`(+e,i), `z` | [s] |
| `ll` | [ʎ] (phương ngữ yod [j]: mirall) |
| `l·l` | [ɫː] geminate (KHÁC ll) |
| `ny` | [ɲ] (canya) |
| `x` | [ʃ] (xocolata) |
| `ig` cuối | [tʃ] (faig, roig) |
| `j`, `g`(+e,i) | [ʒ] (jardí, gel) |

`b/d/g` → xát [β/ð/ɣ] giữa nguyên âm (như es).

## Giảm nguyên âm (ĐẶC TRƯNG — lexical, cần audio)

Đông/Trung Catalan: nguyên âm **KHÔNG NHẤN** giảm:
- `a`, `e` → **[ə]** (schwa): *del* [dəl], *barca* [barkə], *Elna* [elnə].
- `o`, `u` → **[u]**: *bonic* [bunik].

WikiPron xác nhận mẫu này. **KHÔNG đánh dấu chính tả** → phát âm phải học qua
**audio**, không đoán từ chữ. Valencian không giảm mạnh như vậy (biến thể).

## 7 nguyên âm nhấn

`a [a] · e [ɛ]/[e] · i [i] · o [ɔ]/[o] · u [u]` — è/é và ò/ó phân biệt mở/đóng
(dấu chỉ). Hệ giàu hơn es (es chỉ 5).

→ TTS/audio là kênh phát âm chính (xem `tts_audio_policy`). g2p tổng quát KHÔNG
nâng lên high (WikiPron quá nhỏ).
