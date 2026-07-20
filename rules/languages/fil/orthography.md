---
id: fil/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [fil/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Filipino Orthography

## Viết hoa — theo quy ước en/es (KHÁC Roman/Slav)

Hoa đầu câu + danh từ riêng. **Tháng / thứ trong tuần VIẾT HOA** (`Enero`,
`Lunes`), tên ngôn ngữ/quốc tịch thường HOA (`Filipino`, `Ingles`) — theo quy
ước tiếng Anh/Tây Ban Nha.

→ **KHÔNG áp rule lowercase** cho tháng/thứ: giả thuyết "tháng viết thường" bị
dữ liệu bác (corpus cho thấy Enero/Lunes viết hoa) — cùng kỷ luật đã áp cho
tr/id. corpus RẤT NHỎ (222 câu) — bằng chứng yếu, ghi rõ.

## Dấu (accents) — tuỳ chọn

`á à â` đánh dấu trọng âm/glottal nhưng **thường bỏ** trong văn thường ([corpus:
0/222 câu]). → NGOẠI LỆ CÓ CƠ SỞ (khoan dung): không bắt buộc, không chấm sai
khi thiếu (xem `answer_acceptance_fil`). `ñ` (từ vay TBN) nên đúng khi xuất hiện.

## Không khoảng trắng giữa từ? — KHÔNG, có khoảng trắng

Filipino DÙNG khoảng trắng giữa từ (khác th/zh). Kiểm tra chính: nội dung là
chữ Latin (`content-latin-script`, corpus 0.00% vi phạm).

## Dấu câu

Chuẩn Latin `. , ? !` theo quy ước en (ảnh hưởng Mỹ). Ngoặc kép `"…"`. KHÔNG dấu
lật ngược es. Thập phân `.`, phân nhóm nghìn `,` (kiểu Mỹ).
