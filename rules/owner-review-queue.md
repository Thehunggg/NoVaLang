# NGHI NGỜ — XIN OWNER XEM LẠI (Phần B re-audit, 2026-07-19)

Không có front-matter (danh sách rà soát cho owner).

Đây là **DUY NHẤT MỘT CHỖ** gom mọi điểm nghi ngờ về **quyết định owner đã
chốt** phát hiện khi rà lại 19 ngôn ngữ theo chuẩn 5 vòng (Phần B). Mỗi mục:
owner đã chốt gì · 5 vòng nói gì khác · vì sao nghi. **CHỈ BÁO — KHÔNG TỰ SỬA**
(theo yêu cầu loại 2). Không phải lỗi cần vá gấp; là điểm owner nên xem một
lượt rồi quyết.

Trạng thái ngôn ngữ KHÔNG đổi vì các mục này; answer_acceptance liên quan vẫn
giữ nguyên như owner đã duyệt cho tới khi owner quyết lại.

---

## [SUS-01] es — `answer_acceptance_es` (B-03): quyết định "cảnh báo nhẹ" chỉ khung quanh TILDE, chưa xử lý riêng chữ ñ

- **Owner đã chốt (2026-07-19, B-03):** phương án **B** — thiếu/sai **tilde**
  (dấu sắc: cómo/como, él/el, sí/si) = *cảnh báo nhẹ*, accept + hiện gợi ý
  tilde đúng (KHÔNG coi là sai hoàn toàn). Ví dụ trong quyết định đều là
  tilde-accent.
- **5 vòng nói gì:** V1 RAE — **ñ là CHỮ CÁI thứ 15 của bảng chữ Tây Ban Nha**,
  KHÔNG phải n + dấu; `año` (năm) ≠ `ano` (hậu môn) — đổi hẳn nghĩa từ. V2 mọi
  giáo trình/app dạy ñ là chữ riêng, año/ano là ví dụ kinh điển. V4/V5 mọi
  ngữ pháp tham chiếu: tilde-accent (á é í ó ú) và chữ ñ là HAI phạm trù khác
  nhau — tilde là dấu trọng âm, ñ là chữ cái.
- **Vì sao nghi:** quyết định B-03 chỉ nói về "thiếu/sai tilde" và ví dụ toàn
  tilde-accent; **không đề cập ñ**. Nếu B (cảnh báo nhẹ) áp luôn cho việc gõ
  thiếu ñ (`ano` thay `año`), thì mâu thuẫn với chính lý do owner duyệt C cho
  pl/da/el ("dấu-là-chữ-cái-riêng → thiếu = SAI"): ñ CÙNG bản chất đó (là chữ,
  đổi nghĩa). Có khả năng khi duyệt B owner chỉ nghĩ tới tilde-accent, chưa
  tách riêng ñ.
- **Đề xuất để owner cân nhắc (KHÔNG tự làm):** giữ **B cho tilde-accent** (á
  é í ó ú — hợp lý), nhưng **C cho ñ** (thiếu ñ = SAI, như pl/da/el), để nhất
  quán với nguyên tắc "chữ-cái-riêng đổi nghĩa = sai". Nếu owner đồng ý, mới
  cập nhật `answer_acceptance_es`.
