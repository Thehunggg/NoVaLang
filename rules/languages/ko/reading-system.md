---
id: ko/reading-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ko/writing-system]
sources: [S-TRAINED-KNOWLEDGE]
---

# Korean reading system

## Not-applicable theo nghĩa furigana

Tiếng Nhật cần `reading_system` (furigana) vì kanji là **logographic** —
một ký tự không tự mang thông tin cách đọc, cần annotation riêng. Hangul
**không có vấn đề này**: mỗi khối âm tiết là **featural alphabet**, tự mang
đầy đủ thông tin cách đọc chuẩn (trước khi áp quy tắc biến âm — xem
`pronunciation.md`). Vì vậy `reading_system` được đánh dấu
`not-applicable` trong `coverage.json`, không phải một lỗ hổng.

## Không nhầm với reading_aid_policy

Câu hỏi thật cho tiếng Hàn không phải "có furigana không" mà là "có cung cấp
romanization (RR) làm công cụ tạm thời cho người mới hoàn toàn chưa đọc
được Hangul hay không, và ẩn/hiện theo trình độ ra sao" — đây là
`reading_aid_policy`, một **phenomenon riêng, chưa có quyết định owner**
(xem `coverage.json` và GIẢ ĐỊNH CẦN NGƯỜI DUYỆT A-03 trong
`review-checklist.md`).

## Provenance

`S-TRAINED-KNOWLEDGE` — sự kiện cấu trúc script (featural alphabet vs
logographic), không tranh cãi, không cần cross-check ngôn ngữ học.
