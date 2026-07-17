# `_script/` — Lớp rule theo hệ chữ viết

Lớp trung gian giữa `_base` (mọi ngôn ngữ) và `languages/<lang>` (một ngôn ngữ).
Gom các mặc định dùng chung cho tất cả ngôn ngữ viết bằng cùng một hệ chữ
(script), để không lặp lại ở từng ngôn ngữ.

Tên thư mục con dùng mã script ISO 15924, ví dụ:

- `Latn/` — chữ Latin (a, b, c...)
- `Jpan/` — Nhật (Kanji + Hiragana + Katakana); tạo khi build `ja` cần tới
- `Hang/` — Hangul; `Cyrl/` — Kirin; `Arab/` — Ả Rập; ...

## Thứ tự merge

```text
_base  →  _script/<writingSystem>  →  languages/<lang>
```

Một layer không tồn tại thì engine merge bỏ qua, không lỗi (`tools/resolve.mjs`).

Lần chạy đầu chỉ bắt buộc có `Latn/`. Các script khác được thêm khi ngôn ngữ
dùng tới, và phải có nguồn/duyệt như mọi rule khác — không bịa.
