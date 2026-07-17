# `pairs/` — Rule theo CẶP ngôn ngữ

Rule chỉ đúng cho một **cặp** ngôn ngữ cụ thể (nguồn → đích) nằm ở đây, KHÔNG
nằm trong `languages/<lang>/`.

Đặt tên: `pairs/<a>-<b>/` với `<a>` là ngôn ngữ nguồn, `<b>` là ngôn ngữ đích.

Ví dụ điển hình — "translation trap" (bẫy dịch): mẫu dịch nghĩa đen mà người
bản ngữ đích không dùng.

- `ja → en`: không dịch trợ từ cuối câu `ね` thành `isn't it?` một cách máy móc.
- `ja → en`: không tự chuyển `さん` thành `Mr/Ms`.

## Vì sao tách khỏi `languages/`

Invariant 1 của validator: `languages/<lang>/**` không được tham chiếu tới ngôn
ngữ khác (trừ `language-profile.md`). Bẫy dịch dính hai ngôn ngữ cụ thể nên
thuộc `pairs/`, không thuộc `languages/`. Gặp nội dung như vậy trong `languages/`
thì **dời sang đây, không xóa**.

Thư mục này hiện để trống (chưa có cặp nào được build); tạo cặp khi có task tương ứng.
