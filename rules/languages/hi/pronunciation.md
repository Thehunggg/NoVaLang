---
id: hi/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [hi/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Hindi Pronunciation — Phát âm tiếng Hindi

Devanagari khá đều (phonemic) trừ **xoá schwa**. g2p-check trên **33057 từ
WikiPron thật**: phụ âm gốc vi phạm <1%.

## Phụ âm — 4 chiều + retroflex (điểm khó)

- **4 chiều**: vô thanh / hữu thanh × không bật hơi / **bật hơi**: क k / ख kʰ /
  ग g / घ gʱ. Bật hơi phân biệt nghĩa.
- **RETROFLEX** (lưỡi cong): ट ʈ · ठ ʈʰ · ड ɖ · ढ ɖʱ · ण ɳ — khác âm răng
  त t̪ थ द ध न.

## Kỷ luật dữ liệu (g2p-check)

- श 0.30%, भ 0.00%, थ 0.48%, ट 0.00% — sạch.
- **ख 19%, ज 21%, ड 60% "vi phạm"** = do **NUKTA**: chữ+nukta là âm KHÁC —
  ड़→[ɽ] (rất phổ biến), ज़→[z], ख़→[x], क़→[q], ग़→[ɣ], फ़→[f]. Rule chữ-gốc
  đúng 100%; nukta = chữ/âm riêng.

## Xoá schwa (điểm khó đọc)

Nguyên âm 'a' cố hữu THƯỜNG CÂM cuối từ (+ vài vị trí giữa): राम = [raːm] không
[raːmə]; नमक = [nəmək]. Chính tả giữ phụ âm → đọc≠viết một phần. Cần audio.

## Trọng âm

Nhẹ, không phân biệt nghĩa. TTS hi-IN phải xoá schwa đúng — xem `tts-and-audio.md`.
