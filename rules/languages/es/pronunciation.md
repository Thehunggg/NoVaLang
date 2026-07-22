---
id: es/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [es/writing-system]
sources: [S-WIKI-STRESS, WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Spanish pronunciation

## Phoneme inventory & grapheme-to-phoneme

Đã import WikiPron Bước 1 (132249 cặp, bản Latin America `la`).
`grapheme_to_phoneme` **VALIDATED** sau Bước 3: 3 giả thuyết xác nhận sạch
100% trên dữ liệu thật — `ñ`->[ɲ] (2579 từ), `qu` đầu từ->[k] (564 từ), `z`
đầu từ->[s] (651 từ, xác nhận dataset dùng **seseo**, không phải distinción
Peninsular — xem `style-and-register.md` GIẢ ĐỊNH B-01).

## Trọng âm và tilde (syllable_stress)

4 loại từ, đồng thuận hoàn toàn giữa 4 nguồn WebSearch độc lập:

| Loại | Vị trí trọng âm | Có tilde khi |
|---|---|---|
| Aguda | Âm tiết cuối | Kết thúc bằng nguyên âm/n/s |
| Llana/Grave | Áp chót | KHÔNG kết thúc bằng nguyên âm/n/s |
| Esdrújula | Áp áp chót | LUÔN có tilde |
| Sobresdrújula | Xa hơn nữa | LUÔN có tilde |

Ví dụ: `comí`/`adiós`/`león` (aguda có tilde) vs `comer`/`control`/`reloj`
(aguda không tilde); `árbol`/`carácter`/`sandía` (llana có tilde) vs
`casa`/`coches`/`comen` (llana không tilde); `teléfono`/`helicóptero`
(esdrújula, luôn tilde).

## Tilde diacrítica (phân biệt từ đồng âm)

`él`/`el`, `tú`/`tu`, `sí`/`si`, `más`/`mas` — CHƯA xác nhận đầy đủ chính
sách RAE 2010 (đơn giản hoá `sólo`/`solo`) — xem GIẢ ĐỊNH B-04.

## Dialect baseline

Xem `style-and-register.md` GIẢ ĐỊNH B-01 — WikiPron dataset dùng seseo/Latin
America, chưa phải quyết định chính thức của app.

## Provenance

`S-WIKI-STRESS` (4 nguồn WebSearch đồng thuận) + `WIKIPRON` (dataset, xác
nhận bằng g2p-check thật).

## Chưa giải quyết

- Baseline dialect (GIẢ ĐỊNH B-01).
- Tilde diacrítica đầy đủ + chính sách RAE 2010 (GIẢ ĐỊNH B-04).
- 4/5 quy tắc ngoại lệ grapheme-to-phoneme còn lại (g mềm/cứng, h câm...)
  chưa g2p-check trực tiếp.
