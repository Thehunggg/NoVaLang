# Content Rules

Thư mục này là kiến trúc canonical cho rule chất lượng nội dung áp dụng
chung cho mọi ngôn ngữ (không riêng theo ngôn ngữ học chi tiết — rule đó nằm
ở [`rules/languages/`](../languages/README.md)).

## Files

- [naturalness-and-register.md](./naturalness-and-register.md): mức trang
  trọng mặc định (`NATURAL_NEUTRAL_POLITE`), base registers
  (`CASUAL`/`NATURAL_NEUTRAL_POLITE`/`FORMAL`), modifiers
  (`HONORIFIC`/`CEREMONIAL`/`SLANG`), thứ tự ưu tiên, field boundaries,
  release gate và QA semantics. Áp dụng riêng biệt cho target-language text,
  translation/learner support và UI copy.

Architecture được ghi tại ADR-016. Rule hiện là approved architecture nhưng
vẫn `PROJECT_OWNER_DOCUMENTATION_REVIEW_PENDING / NOT_FROZEN`; nó không tự
thêm schema field hoặc cho phép sửa content.

## Status vocabulary

- `APPROVED_ARCHITECTURE`: quyết định kiến trúc/taxonomy đã được Project Owner
  phê duyệt.
- `DRAFT`: profile/nội dung tài liệu chưa đủ reviewer hoặc provenance.
- `PROJECT_OWNER_DOCUMENTATION_REVIEW_PENDING`: wording và cross-reference
  sau implementation đang chờ Project Owner review.
- `PROJECT_OWNER_REVIEW_PENDING`: cần Project Owner xác nhận.
- `NOT_FROZEN`: không được coi là quyết định đóng băng.
