---
id: nl/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [nl/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Dutch Pronunciation (nl-NL)

Xác nhận bằng `g2p-check.mjs` trên WikiPron thật (`nld_latn_broad_filtered`,
58535 cặp từ→âm).

## Quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm | Ghi chú |
|---|---|---|---|
| `ch` | [x] | 18.69% | ngoại lệ `-isch`→[-is] (ch câm) |
| `ij` | [ɛ i̯] | 11.30% | nguyên âm đôi |
| `ui` | [œ y̯] | 2.92% | nguyên âm đôi đặc trưng Hà Lan |
| `oe` | [u] | 0.41% | |
| `sch` | [sx]/[s] | 0.74% | school=[sxoːl]; -isch=[s] |
| `aa`/`oo` | [aː]/[oː] | 0.17%/2.35% | nguyên âm dài nhân đôi |
| `ng` | [ŋ] | 9.01% | |
| `ge` | [ɣ]/[x] | 15.58% | hard g |

## Đặc trưng (khác es/it/pt)

- **Âm hầu [x]/[ɣ]** (hard g, ch) — âm đặc trưng Hà Lan.
- **Nguyên âm đôi** ij/ui/ei/ou/au nhiều.
- **Làm câm cuối từ** (xem `final_devoicing`): hond=[hɔnt], heb=[hɛp].
- **Nguyên âm dài/ngắn qua nhân đôi chính tả** (xem `vowel_length_spelling`).

## Phát hiện real-data (kỷ luật dữ liệu)

1. `ij`/`ui` bắn 100% lần đầu → âm WikiPron cách nhau **dấu cách** + mang dấu
   **phi-âm-tiết** [i̯]/[y̯] (U+032F). [ɛ i̯]/[œ y̯] là 2 token — sửa regex
   theo dữ liệu → 11.30%/2.92%.
2. `g` phẳng bắn 21.98% (>ngưỡng) vì digraph **`ng` nuốt g** thành [ŋ] +
   loanword g→[ɡ]. Tách thành `ng`→[ŋ] + `ge`→[ɣ] riêng thay vì bỏ quy tắc
   hard-g. Sửa mô hình theo dữ liệu.

## Chưa g2p-check

`v`→[v]/`w`→[ʋ] (khác [w] Anh); `eu`→[øː]; schwa cuối từ.
