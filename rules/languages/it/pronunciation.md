---
id: it/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [it/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Italian pronunciation

## Grapheme-to-phoneme

Đã import WikiPron Bước 1 (89403 cặp, `ita_latn_broad`). `grapheme_to_phoneme`
**VALIDATED** sau Bước 3 — `g2p-check.mjs` xác nhận trên dữ liệu thật:

| Chữ | Âm | Áp dụng | Vi phạm | Ghi chú |
|---|---|---|---|---|
| `gn` | `[ɲ]` | 1396 | 0.29% | ngoại lệ: từ mượn Anh (design) |
| `ci`/`ce` | `[t͡ʃ]` | 704/596 | 0.57%/0.17% | c mềm trước e/i |
| `chi`/`che`/`gh` | `[k]`/`[ɡ]` | 291/85 | 1.03%/0.00% | ngoại lệ: chic/chip |
| `sci`/`sce` | `[ʃ]` | 249 | 0.00% | sạch tuyệt đối |

**Phát hiện thật (real-data-driven):** `gli → [ʎ]` CHỈ đúng khi ở GIỮA từ
(`figlio`, `famiglia`). Ở ĐẦU từ `gli-` phần lớn là `[ɡli]` (`glicemia`,
`gliale`) — check `^gli=>^ʎ` bắn 78.85%, chứng minh quy tắc KHÔNG áp cho vị
trí đầu từ. Đã sửa mô tả theo dữ liệu, không giữ giả thuyết sai.

## Chưa g2p-check (kiến thức chuẩn)

- `c`/`g` CỨNG trước a/o/u ([k]/[ɡ]: casa, gatto); MỀM trước e/i ([t͡ʃ]/[d͡ʒ]:
  cena, gelato).
- **Phụ âm đôi (geminate)** đọc DÀI, phân biệt nghĩa (`nono`/`nonno`,
  `pala`/`palla`).
- `h` luôn CÂM (`ho`, `hanno`).
- `z → [ts]`/`[dz]` tuỳ từ (lexical).

## Trọng âm

Phần lớn áp chót (`casa`, `amore`). Trọng âm cuối BẮT BUỘC đánh dấu huyền
(`città`, `però`, `caffè`). Sdrucciole (áp-áp-chót: `tavolo`, `medico`) không
đánh dấu — lexical.

## Provenance

`WIKIPRON` (xác nhận g2p-check thật) + `S-TRAINED-KNOWLEDGE`.
