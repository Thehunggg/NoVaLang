---
id: cs/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [cs/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Czech Pronunciation (cs-CZ)

Xác nhận bằng `g2p-check.mjs` trên WikiPron narrow thật (`ces_latn_narrow`,
65070 cặp từ→âm).

## Quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `š` | [ʃ] | 0.05% |
| `ž` | [ʒ]/[ʃ] | 0.00% (làm câm/đồng hoá) |
| `č` | [t͡ʃ]/[d͡ʒ] | 0.00% |
| `ř` | [r̝] | **0.00%** (âm đặc trưng Séc) |
| `ch` | [x] | 0.45% |
| `ň` | [ɲ] | 0.00% |
| `á`/`í`/`ý` | [aː]/[iː]/[iː] | 0.00–0.03% |

## Đặc trưng

- **Âm ř** [r̝] — âm hiếm trên thế giới, khó cho học viên; g2p 0.00% (rất ổn định).
- **Độ dài nguyên âm phonemic** (á/é/í/ó/ú/ů/ý) — byt/být khác nghĩa.
- **Phụ âm vòm** ď [ɟ] / ť [c] / ň [ɲ]; `h` → [ɦ] (hữu thanh, khác ch [x]).
- **Trọng âm cố định** âm tiết đầu (độc lập với độ dài).
- `ý` = `í` về âm ([iː]) — hai chữ, một âm.

## Làm câm cuối từ + đồng hoá thanh

Phụ âm hữu thanh cuối từ → vô thanh (b→p, d→t, ž→š, z→s). g2p `ž→ʒ` bắn 16.63%
khi bỏ qua devoicing → về **0.00%** khi thêm [ʃ]: Ambrož→[...ʃ], Anežka→[...ʃk].
Xem `final_devoicing`.

## Chưa g2p-check

dě/tě/ně → vòm [ɟɛ]/[cɛ]/[ɲɛ]; bě/pě/vě → [bjɛ]…; mě → [mɲɛ]; c → [t͡s].
