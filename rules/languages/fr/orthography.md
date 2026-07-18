---
id: fr/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [fr/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# French orthography

## Elision — quy tắc chính tả bắt buộc

le/la/de/que/je/ne/se/ce/me/te mất nguyên âm cuối, thay bằng `'`, khi từ
sau bắt đầu bằng nguyên âm: `l'ami`, `d'accord`, `qu'il`, `j'ai`. **KHÔNG
áp dụng cho từ bắt đầu bằng `h` aspiré** (`le héros`, `la haute`, `le
hasard`) dù `h` không phát âm trong cả hai loại — đây là phân biệt LEXICAL
thuần tuý, không đoán được từ chính tả/phát âm. Cũng không áp dụng cho một
nhóm nhỏ từ viết bằng nguyên âm nhưng phát âm bán-nguyên-âm (`que oui`,
`le onze`, `le yaourt`). Xem `pipeline-log.md` cho quá trình phát hiện thật
qua corpus check (Bước 3) — bao gồm 1 bug kỹ thuật tổng quát trong chính
regex engine (JS `\b` không nhận ký tự có dấu).

## Liaison — quy tắc phát âm (KHÁC elision)

Xem `pronunciation.md`. Liaison và elision là 2 hiện tượng riêng biệt dù
liên quan bề mặt (cả hai xử lý ranh giới từ trước nguyên âm) — liaison là
phát âm, elision là chính tả.

## Dấu câu — khoảng trắng trước `; : ! ?` và `«»`

Xuất bản chuẩn Pháp dùng khoảng trắng hẹp không ngắt dòng (espace fine
insécable) trước `; : ! ?` và bên trong `« »`: `Comment ça va ?`. Xác nhận
sạch trên corpus thật (Bước 3: 3/17342 vi phạm cho check liên quan tới `?`).
**Chưa cross-check** liệu quy tắc này có nhất quán trong xuất bản
web/Canada hiện đại hay không.

## Chữ hoa/thường

Giống es (tháng/thứ không viết hoa) nhưng khác biệt tinh vi: quốc
tịch/ngôn ngữ dùng làm TÍNH TỪ không viết hoa (`un livre français`), nhưng
dùng làm DANH TỪ chỉ người THÌ viết hoa (`un Français`) — es/en không có
phân biệt tính từ/danh từ này (es không bao giờ viết hoa quốc tịch).

## Provenance

`S-TRAINED-KNOWLEDGE`, xác nhận bằng corpus check thật (Bước 3, 3 vòng sửa
bug — xem `pipeline-log.md`).

## Chưa giải quyết

- Lexicon h aspiré/h muet + bán-nguyên-âm (GIẢ ĐỊNH C-06).
- Quy tắc khoảng trắng trước dấu câu trong xuất bản hiện đại/web.
