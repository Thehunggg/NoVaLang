# NovaLang curriculum review database

Thư mục này chỉ phục vụ review curriculum trong pgAdmin4.

Database này không thay thế JSON trong `shared/`, không phải source-of-truth, và Web/Flutter không đọc trực tiếp dữ liệu này. Các file SQL chỉ giúp xem, lọc, và bắt lỗi blueprint trước khi biến nội dung thành curriculum thật.

Exam Preparation hiện được phép là placeholder-only. Các module exam như JLPT, TOEIC/IELTS/TOEFL/EIKEN, TOPIK, HSK, DELE, DELF/DALF, Goethe/TestDaF/telc có thể có 0 unit trong giai đoạn này và không bị tính là warning cho tới khi bắt đầu build exam content thật.

## Cách dùng trong pgAdmin4

1. Tạo database riêng, ví dụ `novalang_curriculum_review`.
2. Mở Query Tool và chạy `docs/db/curriculum_review_schema.sql`.
3. Chạy lệnh export ở root project:

```powershell
npm run review:curriculum:export
```

4. Trong pgAdmin4, chạy file mới tạo: `docs/db/curriculum_review_seed.sql`.
5. Chạy `docs/db/curriculum_review_summary.sql` để xem một bảng tổng hợp `check_id`, `check_name`, `severity`, `issue_count`, `note`.
6. Chỉ chạy `docs/db/curriculum_review_queries.sql` khi một dòng summary có `issue_count > 0` và bạn cần xem chi tiết lỗi.

## Nguyên tắc sửa lỗi

Nếu query phát hiện vấn đề, không sửa trực tiếp trong database review. Hãy sửa trong source-of-truth/generator ở `shared/` hoặc `scripts/`, sau đó xuất lại seed SQL.

## File trong thư mục này

- `curriculum_review_schema.sql`: tạo lại bảng review an toàn bằng `DROP TABLE IF EXISTS`.
- `curriculum_review_seed.sql`: được sinh bởi script export, không cần viết tay.
- `curriculum_review_summary.sql`: bảng tổng hợp một lần chạy cho 20 nhóm kiểm tra.
- `curriculum_review_queries.sql`: các truy vấn audit A-T.
