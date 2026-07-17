# `_base/` — Rule sản phẩm đúng cho MỌI ngôn ngữ

Đây là lớp **máy-đọc-được** của rule sản phẩm trung lập ngôn ngữ. Phần narrative
(giải thích, lý do) không nằm ở đây mà ở `rules/content/naturalness-and-register.md`
(canonical) và ADR-016 — các file dưới đây `enforces` chúng, không lặp lại.

| File | Enforce cái gì | Narrative nguồn |
|---|---|---|
| `distractor.rules.json` | Cách sinh phương án nhiễu hợp lệ | naturalness-and-register.md + legacy Q3/Q1 |
| `answer-acceptance.rules.json` | Chấm đáp án: single/match, normalize, typo, register | naturalness-and-register.md |
| `audio.rules.json` | Ưu tiên audio, replay, tốc độ, không autoplay | legacy TTS/audio |
| `fail-safe.rules.json` | Level unknown, không fallback chéo ngôn ngữ | legacy reading policy |
| `register.rules.json` | Baseline `NATURAL_NEUTRAL_POLITE`, 3 mức lõi + 3 modifier | naturalness-and-register.md, ADR-016 |
| `text-fields.rules.json` | Tách `displayText` / `canonicalText` / `audioText` | legacy TTS/audio |

## Cách merge (resolve)

Config hiệu lực cho một ngôn ngữ = merge theo thứ tự:

```text
_base  →  _script/<writingSystem>  →  languages/<lang>
```

Layer sau ghi đè layer trước ở cùng khoá. Chạy `node tools/resolve.mjs <lang> --effective`
để xem config đã merge. Một layer không tồn tại thì bị bỏ qua, không lỗi.

## Nguyên tắc

- Cấm sao chép profile register của một ngôn ngữ sang ngôn ngữ khác.
- Cấm dùng word frequency / translation similarity / LLM score / regex phong cách
  để tự động cấp `PASS`.
- Mỗi file có `fixtures.pass` và `fixtures.fail` để validator kiểm (invariant 5).
