# Per-Language Rule Template

Đây là template kiến trúc, không phải nguồn quy tắc ngữ âm cho một ngôn ngữ.
Khi một learning language chuẩn bị có lesson thật, tạo thư mục mã ngôn ngữ và
điền các file cùng tên như `ja/`. Không sao chép nội dung Japanese để làm mẫu.

Mỗi file phải ghi rõ nguồn, trạng thái `CONFIRMED`/`DRAFT`/`UNRESOLVED`, và
chỉ mô tả quyết định đã được Project Owner xác nhận. Profile đầy đủ với
`reviewStatus = APPROVED` là release gate trước content production; blueprint
không được suy diễn thành rule ngôn ngữ học.

Các file chuẩn: `language-profile.md`, `writing-system.md`, `orthography.md`,
`reading-system.md`, `pronunciation.md`, `romanization.md`,
`grammar-particles.md`, `style-and-register.md`, `tts-and-audio.md`,
`localization-boundaries.md`, `validation.md`, `test-fixtures.md`, và
`change-log.md`.

`style-and-register.md` chi tiết hóa
[`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
cho ngôn ngữ này — không lặp lại nguyên tắc toàn cục, chỉ bổ sung chi tiết
riêng của ngôn ngữ.
