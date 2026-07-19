---
id: pt/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [pt/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Portuguese Pronunciation (pt-BR)

Baseline pt-BR. Xác nhận bằng `g2p-check.mjs` trên WikiPron Brazil thật
(`por_latn_bz_broad_filtered`, 187421 cặp từ→âm).

## 9 quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm | Ghi chú |
|---|---|---|---|
| `nh` | [ɲ] | 0.40% | palatal nasal: senhor, nhoque |
| `lh` | [ʎ] | 0.08% | palatal lateral: filho, trabalho |
| `ç` | [s] | 0.03% | cedilha luôn [s] trước a/o/u |
| `ch` | [ʃ] | 0.99% | ngoại lệ từ mượn (Belchior=[k]) |
| `ti` | [t͡ʃi] | 0.39% | **vòm hoá Brazil**: tia, noite |
| `di` | [d͡ʒi] | 0.26% | **vòm hoá Brazil**: dia, verdade |
| `l` cuối | [w] | 0.21% | **nguyên âm hoá**: Brasil=[bɾaziw] |
| `ão` | [ɐ̃ w̃] | 0.08% | nguyên âm đôi mũi: pão, coração |
| `rr` | [ʁ]/[x]/[h] | 0.15% | R rung mạnh/hầu, biến thể vùng |

## Đặc trưng pt-BR (khác es/it)

- **Vòm hoá `ti`/`di`** → [t͡ʃi]/[d͡ʒi]: dấu hiệu nhận biết giọng Brazil. pt-PT
  KHÔNG có.
- **Nguyên âm hoá `l` cuối** → [w]: `mal`, `Brasil`.
- **Nguyên âm mũi** (xem `nasalization`): nhiều hơn es/it — đặc trưng trung tâm.
- **`o`/`e` không nhấn cuối từ** → [u]/[i]: `menino`=[meninu], `leite`=[lejtʃi].

## Phát hiện real-data (kỷ luật dữ liệu)

Kiểm `ão` lần đầu bắn 100% "vi phạm" — do âm trong WikiPron **cách nhau bằng
dấu cách** (`ɐ̃ w̃` là 2 token, không phải 1 ký tự liền). Regex thiếu dấu
cách → sửa theo dữ liệu → còn 0.08%. Không giữ giả thuyết sai (giống bài học
gli→ʎ của tiếng Ý).

## Chưa g2p-check (để lexical/tương lai)

`x` đa âm ([ʃ]/[s]/[z]/[ks]); `s` giữa 2 nguyên âm → [z]; nguyên âm mũi trước
`m`/`n` coda.
