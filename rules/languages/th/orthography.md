---
id: th/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [th/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Thai Orthography

## Viết hoa

**NOT-APPLICABLE** — chữ Thái unicameral (không hoa/thường). Không có quy tắc
viết hoa tháng/thứ/tên riêng.

## Không khoảng trắng giữa từ

Đặc trưng: **khoảng trắng đánh dấu ranh giới cụm/câu**, KHÔNG phải giữa từ. Tách
từ (word segmentation) cần thuật toán/từ điển (như zh). Ảnh hưởng hiển thị, TTS,
và **chấm đáp án không dựa khoảng trắng**. Xem `word_segmentation` trong
`coverage.json`.

→ corpus-check Bước 3: `content-in-thai-script` **0.00%** vi phạm trên 1000 câu
(mọi câu có chữ Thái). Corpus RẤT NHỎ (1000, PUD test-only) — ghi rõ yếu.

## Dấu nguyên âm + dấu thanh = bắt buộc

Dấu nguyên âm (đặt quanh phụ âm) và **dấu thanh** (่ ้ ๊ ๋) là **bắt buộc** +
phân biệt nghĩa (đổi dấu thanh = đổi thanh = đổi từ). Bản chất giống matra hi.
Xem `answer_acceptance_th` (thiếu/sai = sai; không nhận chuyển tự Latin).

## Dấu câu

Truyền thống KHÔNG dùng dấu chấm câu Latin — khoảng trắng đánh dấu ngắt. Dấu
riêng: **ๆ** (mái yamok — lặp từ trước đó), **ฯ** (viết tắt), **ฯลฯ** (v.v.).
Số Thái ๐๑๒๓ (số Ả Rập cũng dùng). Ngày nay `?` `!` dùng trong văn phong không
trang trọng. KHÔNG dấu lật ngược như es.
