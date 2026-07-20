---
id: ms/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [ms/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Malay Orthography

## Viết hoa — theo quy ước en/id (KHÁC Roman/Slav)

Hoa đầu câu + danh từ riêng. **Tháng / thứ trong tuần VIẾT HOA** (`Januari`,
`Isnin`), tên ngôn ngữ/quốc tịch thường HOA (`Melayu`, `Inggeris`) — quy ước
tiếng Anh, giống id.

→ **KHÔNG áp rule lowercase** cho tháng/thứ (như id — corpus id đã bác giả
thuyết lowercase; ms cùng quy ước). **KHÔNG có corpus Mã Lai** để tự kiểm →
confidence MEDIUM (đối chiếu id + kiến thức), ghi rõ.

## Không dấu phụ

Chính tả Mã Lai chuẩn hiện đại KHÔNG có dấu phụ (a-z thuần). → không có vấn đề
chữ-cái-có-dấu; chấm chính tả đơn giản (chỉ chính tả gốc + digraph đúng). KHÁC
pl/hr/hu. Xem `answer_acceptance_ms`.

## Dấu câu

Chuẩn Latin `. , ? !` theo quy ước en. Ngoặc kép `"…"`. KHÔNG dấu lật ngược es.
Thập phân `.`, phân nhóm nghìn `,`.

## Ghi chú dữ liệu

**KHÔNG có UD/corpus Mã Lai** trong môi trường này → orthography check chỉ có
fixture, không corpus-verify. Ghi rõ, không thổi phồng.
