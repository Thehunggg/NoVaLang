---
id: fr/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [fr/writing-system]
sources: [S-WIKI-LIAISON, WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# French pronunciation

## Phoneme inventory & grapheme-to-phoneme

Đã import WikiPron Bước 1 (97301 cặp). Chính tả tiếng Pháp **kém minh bạch
hơn hẳn** tiếng Tây Ban Nha (nhiều phụ âm cuối câm, nguyên âm ghép phức tạp:
`eau`/`au`/`ô` đều đọc gần giống nhau, nhiều cách viết cho cùng 1 âm) — gần
độ phức tạp của tiếng Anh hơn.

## Liaison — 3 loại

| Loại | Khi nào | Ví dụ |
|---|---|---|
| Obligatoire (bắt buộc) | mạo từ+danh từ, tính từ+danh từ, sau giới từ/trạng từ ngắn | `les_amis`, `un_ingénieur` |
| Interdite (cấm) | giữa danh từ số ít làm chủ ngữ và động từ, giữa danh từ số ít và tính từ theo sau | (không nối) |
| Facultative (tuỳ chọn) | sau être/avoir chia, sau trạng từ dài, giữa danh từ số nhiều và tính từ | càng trang trọng càng nối nhiều |

Xác nhận qua 4 nguồn WebSearch độc lập, đồng thuận hoàn toàn.

## Nguyên âm mũi

4 nguyên âm phân biệt nghĩa: an/en (ɑ̃), in/ain/ein (ɛ̃), on (ɔ̃), un (œ̃ —
nhiều người Pháp hiện đại hợp nhất vào ɛ̃). **Bước 3 (g2p-check trên WikiPron
thật, 97301 từ):** `on$->[ɔ̃]` sạch 98.10% (54/2843 vi phạm, "ok"); nhưng
`an$->[ɑ̃]` chỉ 79.90% (83/413 vi phạm) — **RULE NGHI NGỜ SAI theo chính công
cụ**. Đọc tay: toàn bộ vi phạm là tên riêng/từ mượn tiếng Anh-Ireland-Turkish
(Batman, Bowman, Brian, Dylan, Erdogan) giữ nguyên cách đọc gốc — WikiPron
trộn tên riêng ngoại lai vào từ điển, không phải quy tắc tiếng Pháp bản địa
sai. **Chưa nâng confidence** — xem GIẢ ĐỊNH C-07 (cần lọc tên riêng trước
khi coi là kiểm chứng đầy đủ).

## Provenance

`S-WIKI-LIAISON` (4 nguồn WebSearch đồng thuận) + `WIKIPRON` (dataset, xác
nhận một phần bằng g2p-check — kết quả pha trộn, xem trên).

## Chưa giải quyết

- Lọc tên riêng khỏi WikiPron trước khi kiểm nasal_vowels đầy đủ (C-07).
- h aspiré/h muet + bán-nguyên-âm ảnh hưởng liaison tương tự elision (C-06).
- Dialect baseline (Pháp vs Québécois) — xem `style-and-register.md` C-03.
