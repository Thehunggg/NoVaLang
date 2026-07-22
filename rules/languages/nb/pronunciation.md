---
id: nb/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [nb/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Norwegian Bokmål Pronunciation (nb-NO, Østnorsk baseline)

Chính tả Na Uy TƯƠNG ĐỐI đều (đều hơn da). Xác nhận bằng `g2p-check.mjs` trên
WikiPron thật (`nob_latn_broad`, **3432 cặp — bộ nhỏ**).

## Chữ/âm đã xác nhận (Bước 3)

| Chữ/tổ hợp | Âm | % vi phạm |
|---|---|---|
| `æ` | [æ]/[ɛ] | 0.00% |
| `ø` | [ø]/[œ] | 0.44% |
| `å` | [ɔ]/[oː] | 8.02% |
| `sj`-lyd (sj/skj/sk+i,y) | [ʂ]/[ʃ] | 0.00% |
| `kj`-lyd (kj/ki/ky/tj) | [ç] | 12.09% |

`kj`-lyd: `kj`→[ç] (kjøre, kjærlighet); `kj`→[k] trước nguyên âm sau (kjole)
là biệt lệ lexical.

## Phần lexical (KHÔNG g2p tổng quát — kỷ luật dữ liệu)

- **Pitch accent** (2 thanh, tonelag 1/2) — phân biệt nghĩa (bønder 'nông dân'
  / bønner 'đậu'), **KHÔNG đánh dấu chính tả**, lexical, cần audio. Tương ứng
  chức năng với **stød** của da (da dùng stød, no/sv dùng thanh).
- **Âm câm/giảm**: hv→[v] (hva, hvor); gj/hj/lj→[j] (gjøre, hjem); d/g/t cuối
  thường câm (god=[gu], jeg=[jæi]); retroflex rt/rd/rn/rl/rs.

→ TTS/audio là kênh phát âm chính cho pitch accent + âm câm (xem
`tts_audio_policy`). Chỉ æ/ø/å + sj/kj validated; phần còn lại ghi rõ lexical.

## Đặc trưng

- Hệ nguyên âm giàu (dài/ngắn phân biệt nghĩa).
- Pitch accent thay chức năng stød của da. Khác vùng miền lớn (Đông/Tây/Bắc) —
  baseline Østnorsk/Oslo. Không thiết yếu trình độ đầu.
