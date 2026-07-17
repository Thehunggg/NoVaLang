# `_script/Latn/` — Mặc định cho ngôn ngữ chữ Latin

Áp cho mọi ngôn ngữ có `writingSystem: Latn` trừ khi ngôn ngữ đó override.

- Có phân biệt hoa/thường (`hasCase: true`).
- Reading aid (furigana/romaji/phiên âm) mặc định **not-applicable** — ngôn ngữ
  Latin thường không cần chú thích cách đọc trên đầu từng chữ. Ngôn ngữ cụ thể
  có thể override nếu có nguồn (ví dụ tiếng Việt hiển thị thanh điệu là một phần
  của chính chữ, không phải reading aid tách rời).

Chi tiết máy-đọc-được ở `script.rules.json`.
