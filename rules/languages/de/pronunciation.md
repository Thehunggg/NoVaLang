---
id: de/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [de/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# German pronunciation

## Phoneme inventory & grapheme-to-phoneme

Đã import WikiPron Bước 1 (57662 cặp, bản broad transcription `deu_latn_broad`).
`grapheme_to_phoneme` **VALIDATED** sau Bước 3: 4 quy tắc chữ→âm xác nhận trên
dữ liệu thật bằng `g2p-check.mjs`:

| Chữ | Âm | Áp dụng | Vi phạm | Ghi chú |
|---|---|---|---|---|
| `sch` | `[ʃ]` | 6330 từ | 1.17% | ngoại lệ: hậu tố `-chen` sau s (Häus-chen → s ç) |
| `w`- | `[v]` | 765 từ | 0.13% | sạch |
| `z`- | `[ts]` | 810 từ | 0.99% | ngoại lệ: từ mượn zoom/zappen (/z/) |
| `v`- | `[f]`/`[v]` | 1354 từ | 0.15% | [f] gốc Đức, [v] từ mượn |

## Chưa g2p-check (mô tả từ kiến thức chuẩn, medium)

- Nguyên âm đôi: `ei→[aɪ]`, `au→[aʊ]`, `eu/äu→[ɔʏ]`; `ie→[iː]` (i dài).
- `ch→[ç]` sau nguyên âm trước/phụ âm (ich, Milch); `ch→[x]` sau nguyên âm
  sau (Bach, doch).
- **Auslautverhärtung** (làm điếc âm cuối): `b/d/g` cuối âm tiết → `[p]/[t]/[k]`
  (Tag→[taːk], und→[ʊnt]).
- `ß→[s]` (luôn vô thanh).

## Trọng âm

KHÔNG đánh dấu trong chính tả (khác es tilde). Từ gốc Đức: trọng âm ở thân từ
(thường âm tiết đầu). Tiền tố **tách** mang trọng âm (`áufstehen`); tiền tố
**không tách** `be-/ge-/ver-/ent-` KHÔNG mang trọng âm (`verstéhen`). Từ mượn
theo quy tắc riêng (`Studént`, `Natión`). Cần từ điển phát âm để kiểm — giữ
DRAFT.

## Provenance

`WIKIPRON` (dataset, xác nhận bằng g2p-check thật) + `S-TRAINED-KNOWLEDGE`.

## Chưa giải quyết

- `syllable_stress` (không có dấu, cần từ điển phát âm).
- Các quy tắc g2p còn lại (ei/ch/Auslautverhärtung) chưa g2p-check trực tiếp.
