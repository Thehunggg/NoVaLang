---
id: el/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [el/writing-system]
sources: [S-TRAINED-KNOWLEDGE, CLDR, S-UD-CORPUS]
---

# Greek Orthography — Chính tả tiếng Hy Lạp

## Hệ dấu MONOTONIC (chuẩn từ 1982)

Tiếng Hy Lạp hiện đại chỉ dùng **hai dấu**:

- **tonos** `´` (dấu sắc): đánh **trọng âm** trên nguyên âm của âm tiết nhấn.
  BẮT BUỘC với mọi từ đa âm tiết (ά έ ή ί ό ύ ώ).
- **dieresis** `¨`: tách nguyên âm khỏi digraph phía trước (ϊ ϋ) — ví dụ
  `μαϊντανός` đọc a-ï (không phải ai). Kết hợp cả hai: ΐ ΰ.

Hệ **polytonic** cổ (dấu mũ περισπωμένη, spiritus δασεία/ψιλή) đã bị **bãi bỏ**
năm 1982 — chỉ còn trong văn bản cổ/tôn giáo. **Corpus-check Bước 3 (4285 câu
thật): 0 ký tự polytonic** (khối Greek Extended U+1F00–1FFF) → xác nhận
monotonic 100% trên văn bản hiện đại.

tonos **phân biệt nghĩa**: `πότε` (khi nào) / `ποτέ` (không bao giờ);
`νόμος` (luật) / `νομός` (tỉnh). Vì thế bỏ/sai tonos = sai chính tả (xem
`answer_acceptance_el`).

## Dấu câu đặc trưng (corpus-check xác nhận)

- **Dấu hỏi** = `;` (ερωτηματικό, U+003B) — trông giống dấu chấm phẩy Latin
  nhưng là dấu HỎI. **KHÔNG dùng `?` Latin.** Corpus-check: 233/4285 câu kết
  thúc bằng `;`, **0 câu chứa `?`**.
- **Dấu chấm phẩy** = `·` (άνω τελεία / ano teleia, U+00B7 — chấm trên).
- Dấu chấm `.` và phẩy `,` như Latin. Ngoặc kép: «…».

## Viết hoa

Hoa đầu câu + danh từ riêng. **KHÁC da/sv/es**: tháng và thứ trong tuần
**VIẾT HOA** (`Ιανουάριος`, `Δευτέρα`) — như tiếng Anh. Chữ hoa **đơn** bỏ
tonos (viết `Α`, không `Ά`); nhưng chữ hoa đầu một từ nhiều chữ vẫn giữ tonos
ở vị trí trọng âm.
