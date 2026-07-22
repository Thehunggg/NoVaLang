---
id: hu/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [hu/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Hungarian Pronunciation (hu-HU)

✅ **Chính tả Hungary ĐỀU** (âm vị học). Xác nhận bằng `g2p-check.mjs` trên
WikiPron thật (`hun_latn_narrow`, **64764 cặp — bộ RẤT LỚN**). Trọng âm **luôn
âm tiết đầu** (đoán được).

## Chữ → âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `sz` | [s] | 1.25% |
| `cs` | [t͡ʃ] | 1.25% |
| `ny` | [ɲ] | 0.02% |
| `gy` | [ɟ] | 10.12% |
| `zs` | [ʒ] | 15.61% |

`gy`/`zs` cao hơn do phiên âm **narrow** (đồng hoá + biến thể) — dưới ngưỡng
20%, ghi rõ là noise chứ không phải rule sai.

## ⚠️ Bẫy lớn: s vs sz

- `s` = **[ʃ]** (như "sh" tiếng Anh) — *sok* [ʃok].
- `sz` = **[s]** — *szó* [soː].

**Ngược tiếng Anh** — điểm nhầm số một.

## Thêm (kiến thức chuẩn)

`ty`[c], `ly`[j] (=j), `dzs`[d͡ʒ]. `h`[h]. `r` rung.

## Nguyên âm (lexical — cần audio)

7 cặp ngắn/dài: a[ɒ]/á[aː], e[ɛ]/é[eː], i/í, o/ó, ö[ø]/ő[øː], u/ú, ü[y]/ű[yː].
Độ dài + chất khác, phân biệt nghĩa. Đồng hoá phụ âm + độ dài kép là lexical.

→ Chính tả đọc được ngay → g2p **VALIDATED**; chỉ độ dài/đồng hoá tinh tế để
audio.
