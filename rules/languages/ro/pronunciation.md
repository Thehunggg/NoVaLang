---
id: ro/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [ro/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Romanian Pronunciation (ro-RO)

Xác nhận bằng `g2p-check.mjs` trên WikiPron thật (`ron_latn_broad`, **9286 cặp
— bộ nhỏ**; corpus 33645 câu bù lại).

## Quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `ș` | [ʃ] | 0.16% |
| `ț` | [t͡s] | 2.33% |
| `ă` | [ə] | 0.14% |
| `â`/`î` | [ɨ] | 0.24%/0.33% (cùng âm) |
| `ce`/`ci` | [t͡ʃ] | 2.20% (c mềm) |
| `ge`/`gi` | [d͡ʒ] | 4.23% (g mềm) |
| `che`/`chi` | [k] | 2.13% (c cứng) |
| `ghe`/`ghi` | [ɡ] | 13.33% (bộ nhỏ 15 từ) |

## Đặc trưng

- **Nguyên âm giữa** ă [ə] + â/î [ɨ] — hiếm trong Rôman.
- **c/g mềm-cứng** như es/it: trước e/i → [t͡ʃ]/[d͡ʒ]; ch/gh → [k]/[ɡ] cứng.
- **Nhiều nguyên âm đôi/ba**: ea [e̯a], oa [o̯a], ia [ja]; e đầu đại từ → [je]
  (el=[jel], este=[jeste]).

## Chưa g2p-check

Nguyên âm đôi chi tiết (regex khó với bán nguyên âm); x → [ks]/[ɡz].
