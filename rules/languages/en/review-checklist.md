# Review checklist — en (Bước 4)

**Số mục: 1 · Ước lượng: ~2 phút.**
Trả lời: `R-01: A` (hoặc B/C).

---

## [R-01] Sir/Ma'am trong ngữ cảnh dịch vụ khách hàng — dạy sao cho đúng?

Hai nguồn không thực sự "sai" nhau, mà nói hai chuyện khác nhau, cần một quyết
định để không lẫn lộn khi viết bài học:

- **Nguồn A — hồ sơ style nội bộ (`style-and-register.md`, DRAFT):** "tránh tự
  động thêm sir/madam máy móc" — đây là lời khuyên viết bài **tránh sáo rỗng**.
- **Nguồn B — Wikipedia "English honorifics":** "Sir/Madam/Ma'am thường được
  nhân viên dịch vụ dùng thật" — đây là **sự kiện**: người Mỹ/Anh thật có nói
  vậy trong ngữ cảnh phục vụ khách hàng (nhà hàng, khách sạn, gọi điện...).

Ví dụ cụ thể: "How can I help you, sir?" (nhân viên khách sạn nói khách) là
câu tự nhiên, đúng thật; nhưng nếu bài học nào cũng máy móc chèn "sir/ma'am"
vào mọi câu lịch sự thì nghe giả tạo, sáo rỗng.

**Chọn:**
**A.** Dạy sir/ma'am là **có thật** trong ngữ cảnh dịch vụ (nhà hàng/khách
sạn/tổng đài) — nhưng **không** áp mặc định vào mọi câu lịch sự thông thường
(bạn bè, đồng nghiệp không cần).
**B.** Không dạy sir/ma'am ở giai đoạn này — để dành cho bài học sau (nếu app
có card riêng về dịch vụ khách hàng).
**C.** Để DRAFT, chưa quyết.

**Tôi khuyên chọn A vì** đây là dung hòa đúng cả hai nguồn: A không hề mâu
thuẫn với "tránh máy móc" — nó chỉ định rõ *khi nào* sir/ma'am tự nhiên (ngữ
cảnh dịch vụ) và khi nào không cần (giao tiếp thường ngày), đúng tinh thần
register mà ADR-016 muốn: gắn theo tình huống, không gắn cứng theo mọi câu.
**Nếu bạn không trả lời, tôi sẽ tự chọn A.**

---

## Ghi chú — KHÔNG cần trả lời

1. **1 lỗi tự phát hiện và tự sửa trong lúc chạy máy** (không phải chỗ cần
   bạn quyết): giả định ban đầu "WikiPron có đánh dấu trọng âm" là sai — kiểm
   tra trực tiếp dữ liệu thì không có. Đã sửa: app sẽ KHÔNG dạy trọng âm theo
   từng từ cụ thể (không đủ nguồn), chỉ dạy khái niệm chung (trọng âm phân
   biệt nghĩa, danh từ ghép nhấn thành tố đầu) — vẫn có nguồn Wikipedia.
2. **29/38 claim chỉ có 1 nguồn xác nhận** (Wikipedia) vì hồ sơ nội bộ của dự
   án không mô tả sự kiện ngôn ngữ (chỉ nói về register/style sản phẩm). Đây
   là các sự kiện tiếng Anh phổ thông, không tranh cãi (SVO, số nhiều -s, quá
   khứ -ed, a/an theo âm...) — không tìm được nguồn mở thứ hai trong môi trường
   mạng hạn chế của phiên này (chỉ mở được GitHub raw + Wikipedia). Giữ
   `confidence: medium`, có trích dẫn rõ ràng, không phải bịa.
3. **Corpus 16.622 câu** (UD English-EWT, văn Web thật): 2 rule về viết hoa có
   14,66%/1,86% "vi phạm" — nhưng đó là văn phong informal thật (blog/chat
   viết thường), không phải rule sai. Đã ghi rõ trong coverage.json.
