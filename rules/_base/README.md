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

## Front-matter và pin version (từ 2026-07-18, Golden Lesson audit G-đợt 2)

Mỗi file `_base/*.rules.json` (và `_script/<ws>/*.rules.json`) nay có
`version`/`status`/`depends_on` giống file cấp ngôn ngữ. Vì mọi ngôn ngữ FROZEN
đều **ngầm phụ thuộc** các layer này qua `tools/resolve.mjs` (merge live theo
`id`, không cache), mỗi ngôn ngữ FROZEN ghi lại `_meta.baseDependencies` trong
`coverage.json` — bản chụp `{id: version}` của `_base`/`_script` tại thời điểm
freeze. `tools/validate.mjs` (invariant 3, phần mở rộng) đối chiếu bản chụp đó
với version **hiện tại** trên đĩa; nếu một file `_base`/`_script` mà một ngôn
ngữ FROZEN phụ thuộc đã đổi version kể từ lúc freeze → validator **CHẶN**
(lỗi, không tự hạ trạng thái ngôn ngữ đó). Sửa `_base`/`_script` mà không bump
`version` sẽ không bị validator phát hiện — luôn bump `version` khi đổi
`config` có ý nghĩa.
