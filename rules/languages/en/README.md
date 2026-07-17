# English Language Rules

Thư mục này là nguồn canonical cho rule chi tiết riêng của English trong
NovaLang. Rule naturalness/register toàn cục vẫn nằm tại
[`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
và ADR kiến trúc vẫn là
[`ADR-016`](../../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture).

## Current profile

- [Style and register](./style-and-register.md): General International English,
  dùng en-US spelling và punctuation làm baseline.
- Status: `DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN`.
- Reviewer: `NOT_ASSIGNED`.
- Native review: chưa hoàn thành.

File tồn tại không đồng nghĩa profile đã `APPROVED`. Cho tới khi reviewer thật,
review date và evidence được ghi nhận, release QA không được cấp `PASS` chỉ dựa
trên profile draft này.

## Scope boundary

Thư mục này chỉ quản lý cách viết tự nhiên và register của English. Nó không tự
thay đổi curriculum, translation, schema, pronunciation, lesson content hay
Golden Lesson. Mọi audit hoặc remediation nội dung phải có task riêng.
