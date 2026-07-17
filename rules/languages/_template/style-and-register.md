# Style and Register Template — `<languageCode>`

Đây là khung file, không phải nguồn quy tắc ngôn ngữ học. Không sao chép nội
dung Japanese để làm mẫu; không tự bịa nội dung ngôn ngữ học chưa được
Project Owner xác nhận. Nguyên tắc cốt lõi (global default, translation
priority, register levels, prohibited patterns) nằm ở
[`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
— file này chỉ **làm rõ/chi tiết hóa** cho một ngôn ngữ cụ thể, không lặp
lại nội dung đó.

Khi ngôn ngữ này chưa có hồ sơ được duyệt, mọi tác vụ liên quan phải báo cáo
đúng nguyên văn: `Language style/register profile not implemented`.

## Profile metadata — Bắt buộc

```text
languageCode: <languageCode>
status: PROFILE_REQUIRED_BEFORE_CONTENT_RELEASE
version: NOT_ASSIGNED
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: NOT_PROVIDED
unresolvedDecisions: PROFILE_NOT_IMPLEMENTED
```

Thay status bằng `DRAFT` khi bắt đầu điền. Chỉ dùng `APPROVED` sau khi reviewer,
review date, provenance, unresolved decisions và change log đã được hoàn tất và
Project Owner xác nhận. File tồn tại không đồng nghĩa với profile approved.

## Normal neutral-polite register

<!-- Mô tả mức NATURAL_NEUTRAL_POLITE thông thường của ngôn ngữ này: cấu
     trúc câu, đại từ mặc định, mức lịch sự chuẩn. UNRESOLVED nếu chưa có
     nguồn xác nhận. -->

## Casual register

<!-- Khi nào và với ai dùng CASUAL; khác biệt cụ thể so với neutral-polite. -->

## Formal register

<!-- Khi nào dùng FORMAL; khác biệt cụ thể so với neutral-polite. -->

## Honorific modifier (nếu ngôn ngữ có hệ thống kính ngữ)

<!-- Chỉ điền nếu ngôn ngữ có hệ thống kính ngữ ngữ pháp riêng biệt (không
     suy diễn từ ngôn ngữ khác). Nếu không áp dụng, ghi rõ "Not applicable"
     kèm lý do ngắn. -->

## Ceremonial modifier

<!-- Chỉ mô tả ngôn ngữ nghi lễ/công thức truyền thống có nguồn xác nhận.
     Không coi CEREMONIAL là mức cao hơn FORMAL hoặc HONORIFIC. -->

## Slang modifier

<!-- Mô tả slang theo nhóm/vùng/thế hệ và giới hạn sử dụng. Không coi SLANG
     là mức thấp hơn CASUAL. Nội dung time-sensitive phải có review date. -->

## Pronouns / forms of address

<!-- Đại từ nhân xưng, cách xưng hô theo tuổi/vai trò/mối quan hệ. -->

## Contraction behavior

<!-- Khi nào dạng rút gọn vẫn được coi là lịch sự/tự nhiên; khi nào dạng đầy
     đủ là bắt buộc. -->

## Politeness markers

<!-- Từ/hình thái đánh dấu lịch sự cụ thể của ngôn ngữ (không phải trợ từ
     cuối câu — xem mục riêng bên dưới nếu có). -->

## Sentence-final particles (nếu có)

<!-- Chỉ điền nếu ngôn ngữ có trợ từ cuối câu mang chức năng ngữ dụng riêng.
     Phải dịch theo chức năng, không máy móc theo ký tự. -->

## Service / customer-facing language

<!-- Cách nói trong bối cảnh dịch vụ/khách hàng nếu khác với neutral-polite
     thông thường. -->

## Written versus spoken differences

<!-- Khác biệt giữa văn viết và văn nói nếu có ý nghĩa cho nội dung học. -->

## Unacceptable literal-translation patterns

<!-- Các mẫu dịch nghĩa đen/calque cụ thể của ngôn ngữ này mà người bản ngữ
     không dùng — liệt kê có nguồn, không suy đoán. -->

## Target-language content criteria

<!-- Tiêu chí naturalness/register cho target words, sentences, dialogue và
     examples. Ghi rõ cách xử lý exact teaching form. -->

## Natural translation and learner-support criteria

<!-- Tiêu chí cho translation, meaning, explanation, hint và feedback. Natural
     translation là bản chính; literal structure nằm trong literalGloss hoặc
     trường tương đương đã được duyệt. -->

## UI copy criteria

<!-- Tiêu chí ngắn gọn, lịch sự và tự nhiên cho app chrome. Không trộn với
     target-language content hoặc learner support. -->

## Pedagogically controlled language

<!-- Khi nào exact form được ưu tiên, phạm vi constraint, và cách ngăn rule đó
     làm sai bản dịch chính hoặc phủ nhận biến thể tự nhiên ngoài exercise. -->

## QA fixtures and review evidence

<!-- Banned exact fixtures deterministic; native-review fixtures; profile
     version/content revision; required review coverage. Không dùng heuristic
     hoặc LLM score để auto-PASS. -->

## Unresolved decisions

<!-- Liệt kê rõ. Không để trống; dùng `NONE` chỉ sau review. -->

## Source / provenance

<!-- Nguồn tham chiếu đã dùng cho từng mục ở trên. Không để trống khi status
     khác PROFILE_REQUIRED_BEFORE_CONTENT_RELEASE. -->

## Change log

<!-- Mỗi thay đổi ghi ngày, version, reviewer/owner decision, nội dung thay đổi
     và phạm vi content cần re-review. -->
