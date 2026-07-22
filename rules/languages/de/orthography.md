---
id: de/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [de/writing-system]
sources: [S-TRAINED-KNOWLEDGE, S-DUDEN-RECHTSCHREIBUNG]
---

# German orthography

## Viết hoa danh từ — đặc trưng trung tâm

Mọi danh từ viết hoa chữ đầu, bất kể vị trí trong câu: `Ich lese ein Buch.`
(`Buch` = sách, danh từ chung, vẫn hoa). Lỗi phổ biến nhất của học viên là
quên hoa danh từ. Kiểm "mọi danh từ viết hoa" cần POS (gắn thẻ từ loại) lúc
generator chạy — không kiểm được bằng regex toàn-dòng.

## ß và ss (sau cải cách chính tả 1996)

`ß` dùng sau **nguyên âm dài / nguyên âm đôi**: `Straße`, `weiß`, `groß`,
`Fuß`. `ss` dùng sau **nguyên âm ngắn**: `dass`, `muss`, `Fluss`, `Kuss`.
Thụy Sĩ (de-CH) KHÔNG dùng `ß`, luôn viết `ss`. Chính sách chấp nhận `ss`
thay `ß` khi chấm đáp án là quyết định sản phẩm — xem `review-checklist.md`
D-de-02.

## Umlaut và chuyển tự

Khi bàn phím không gõ được `ä/ö/ü`, quy ước chuẩn (DIN 5007-2 / điện tín):
`ä→ae`, `ö→oe`, `ü→ue`, `ß→ss`. Ví dụ `Müller→Mueller`, `Straße→Strasse`.

## Dấu câu

Dấu phẩy **bắt buộc** trước mệnh đề phụ (Nebensatz) mở đầu bằng liên từ phụ
thuộc `dass/weil/wenn/ob/...`: `Ich weiß, dass du kommst.` — KHÁC tiếng Anh
(không bắt buộc phẩy trước *that*). Dấu ngoặc kép Đức: dạng `„ … “` (mở dưới,
đóng trên) hoặc guillemets `»…«` hướng vào.

**Phát hiện corpus Bước 3:** check "phẩy trước dass" bắn 10.05% trên 607 lần
`dass` giữa câu — nhưng ~một nửa là `so dass` (phẩy đứng trước `so`) và corpus
review web có lỗi phẩy thật của người dùng. KHÔNG dùng làm regex enforced;
giữ `assert custom`.

## Reading aid — not-applicable

Chữ Latin, chính tả minh bạch — không cần lớp reading-aid kiểu furigana/romaji.

## Provenance

`S-TRAINED-KNOWLEDGE`, `S-DUDEN-RECHTSCHREIBUNG` (chuẩn chính tả chính thức).

## Chưa giải quyết

- Chuẩn dấu ngoặc kép mặc định (`„ “` vs `»«`) chưa cross-check kỹ.
- Chính sách chấm `ss`/`ß`, `ae/oe/ue` (D-de-02).
