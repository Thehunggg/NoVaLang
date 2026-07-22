---
id: ko/orthography
version: 0.1.0
status: DRAFT
tier: [t1, t3]
role: [both]
enforced_by: orthography.rules.json
depends_on: [ko/writing-system]
sources: [S-TRAINED-KNOWLEDGE, S-NIKL-SPACING]
---

# Korean orthography

## Spacing (띄어쓰기) — KHÁC ja

Không giống tiếng Nhật (viết liền, không khoảng trắng giữa từ), tiếng Hàn
**có** khoảng trắng phân tách từ, giống tiếng Việt/Anh về hình thức bề mặt.
Nhưng quy tắc "từ nào tính là một từ" phức tạp hơn nhiều so với ngôn ngữ Âu:

- **조사** (particle/hậu trí từ) LUÔN dính liền vào từ đứng trước, không
  tách — quy tắc rõ, không tranh cãi. Vd: 학교 + 는 -> 학교는 (không phải
  "학교 는").
- Danh từ ghép, danh từ phụ thuộc (의존명사), động từ phụ trợ có quy tắc
  spacing riêng, và **ngay cả người bản ngữ cũng thường không thống nhất**
  ở các trường hợp biên này (xác nhận qua WebSearch nhiều nguồn độc lập,
  xem `sources.json` S-NIKL-SPACING).

**Vì lý do trên, app KHÔNG chấm lỗi spacing nghiêm ngặt cho tới khi có quyết
định owner** — xem GIẢ ĐỊNH CẦN NGƯỜI DUYỆT A-06 trong `review-checklist.md`.

## Dấu câu — KHÁC ja

Tiếng Hàn hiện đại dùng dấu câu kiểu phương Tây tiêu chuẩn: `.` `,` `?` `!`
và ngoặc kép `" "` (half-width). **KHÔNG** dùng `。` `、` full-width bắt buộc
như tiếng Nhật — đây là khác biệt thật giữa hai ngôn ngữ, đã kiểm tra kỹ để
không sao chép nhầm khuôn ja.

`「」` (ngoặc kép kiểu Nhật/Đông Á) vẫn thấy trong một số xuất bản trang
trọng/truyền thống, nhưng không phải chuẩn chủ đạo — app dùng `" "` làm mặc
định.

## Charset

Xem `writing-system.md` — dùng chung dữ liệu CLDR.

## Provenance

- Quy tắc particle dính liền: `S-TRAINED-KNOWLEDGE` (sự kiện ngữ pháp chuẩn).
- Độ phức tạp/mơ hồ ở trường hợp biên: `S-NIKL-SPACING` (WebSearch snippet,
  xem D-51 — confidence thấp, chưa đối chiếu văn bản quy định gốc).

## Chưa giải quyết

- Chính sách chấm điểm khi lệch spacing ở trường hợp biên (GIẢ ĐỊNH A-06).
- Bảng 조사 đóng đầy đủ để kiểm spacing tự động (hiện `assert.type: custom`,
  chưa mã hoá được).
