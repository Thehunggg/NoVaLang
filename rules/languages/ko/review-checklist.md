# ko — Review checklist (Bước 4)

**Trạng thái: 3/3 mục ĐÃ DUYỆT bởi Project Owner, 2026-07-19.** Xem quyết
định cụ thể ngay dưới mỗi mục. `coverage.json` đã cập nhật tương ứng
(phenomenon liên quan chuyển DRAFT → VALIDATED); trạng thái ngôn ngữ vẫn
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, không FROZEN.

3 mục, đọc ước lượng < 5 phút. Đây đều là **quyết định sản phẩm** (không
phải sự kiện ngôn ngữ Hàn thuần tuý — owner không cần biết tiếng Hàn để trả
lời, giống cách D-11/D-13/D-14/D-39 của ja đã được owner quyết dù owner
không đọc kanji). Sự kiện ngôn ngữ Hàn thuần tuý (owner không tự đánh giá
được) nằm ở `native-review-ko.md`, không đưa vào đây.

Không có front-matter (checklist thao tác, không phải rule/narrative — cùng
quy ước README/pipeline-log, INV-2 bỏ qua).

---

## [A-02] Map register taxonomy 6 mức của NovaLang vào hệ đuôi câu tiếng Hàn

Tiếng Hàn có 3 mức đuôi câu hiện đại phổ biến (해요체/하십시오체/해체) + hệ
kính ngữ trực giao (-시-, khiêm nhường ngữ). Đề xuất map:

- CASUAL ~ 해체/반말
- NATURAL_NEUTRAL_POLITE ~ 해요체 (mức mặc định app dạy đầu tiên)
- FORMAL ~ 하십시오체
- HONORIFIC = modifier trực giao (giống cấu trúc ja), không phải bậc riêng

**A.** Đồng ý map như trên.
**B.** Map khác (ghi rõ khác ở đâu).
**C.** Chưa quyết, để DRAFT chờ có nội dung thật để thử nghiệm.

**Tôi khuyên chọn A** vì đây là map thẳng-1-1 phổ biến nhất trong giáo trình
tiếng Hàn quốc tế, và giữ đúng nguyên tắc "modifier trực giao, không phải
bậc" đã áp dụng nhất quán cho ja.

**Nếu bạn không trả lời, tôi sẽ tự chọn C** (giữ DRAFT, không tự chốt A vì
đây là map SẢN PHẨM ảnh hưởng lâu dài tới mọi nội dung tương lai, khác các
quyết định thuần kỹ thuật tôi được phép tự quyết).

> **✅ ĐÃ DUYỆT — Project Owner, 2026-07-19: Chọn A.** `coverage.json`
> phenomenon `register_taxonomy` → `VALIDATED`.

---

## [A-03] Có cung cấp romanization (RR) làm reading-aid tạm thời cho người mới không?

Hangul là script ngữ âm — KHÔNG cần furigana như kanji. Nhưng người học
hoàn toàn mới (chưa đọc được Hangul) có thể cần romaji tạm thời, giống chính
sách D-11 đã chốt cho ja (ẩn mặc định A0-B1 có toggle, ẩn hẳn B2+).

**A.** Có, áp dụng chính sách giống D-11 của ja (ẩn mặc định + toggle theo
trình độ).
**B.** Có, nhưng chính sách khác ja (ghi rõ khác thế nào).
**C.** Không cung cấp — bắt học Hangul ngay từ đầu, không có romaji fallback.

**Tôi khuyên chọn A** vì nhất quán với chính sách đã duyệt cho ja, và
Hangul học nhanh hơn kanji đáng kể (bảng chữ cái ~24 ký tự cơ bản) nên
"giai đoạn cần romaji" sẽ ngắn hơn ja nhiều — rủi ro romaji trở thành nạng
đỡ vĩnh viễn thấp hơn.

**Nếu bạn không trả lời, tôi sẽ tự chọn để confidence:none** (không sinh
bài dùng romaji cho tới khi có quyết định — an toàn hơn tự đoán).

> **✅ ĐÃ DUYỆT — Project Owner, 2026-07-19: Chọn A** (theo tiền lệ D-11
> của ja). `coverage.json` phenomenon `reading_aid_policy` → `VALIDATED`.

---

## [A-06] Chính sách chấm điểm khi câu trả lời đúng nhưng lệch spacing (띄어쓰기)

Xác nhận qua nhiều nguồn: spacing tiếng Hàn phức tạp, mơ hồ NGAY CẢ với
người bản ngữ ở trường hợp biên (danh từ ghép, danh từ phụ thuộc, động từ
phụ trợ). Vd học viên gõ "스포츠선수" thay vì "스포츠 선수" (cầu thủ thể
thao) — đúng nghĩa, sai spacing chuẩn.

**A.** Chấp nhận (normalize bỏ qua spacing khi so khớp đáp án) — giống cách
`_base/answer-acceptance` đã `normalize_ignore: ["punctuation", "whitespace",
"char_width"]` cho mọi ngôn ngữ.
**B.** Cảnh báo nhẹ (accept nhưng hiện gợi ý spacing chuẩn) — cần thêm field
UI mới.
**C.** Coi là sai (spacing là một phần đáp án đúng) — rủi ro chấm oan vì
chính người bản ngữ cũng không thống nhất ở trường hợp biên.

**Tôi khuyên chọn A** vì `_base` đã có sẵn `whitespace` trong
`normalize_ignore` cho MỌI ngôn ngữ — áp dụng nguyên trạng cho ko là nhất
quán, không cần override riêng, và tránh chấm oan học viên ở đúng những chỗ
người bản ngữ cũng bất đồng.

**Nếu bạn không trả lời, tôi sẽ tự chọn A** (dùng nguyên `_base` mặc định,
không override — lựa chọn an toàn nhất, nhất quán với hành vi hệ thống đã
có sẵn cho mọi ngôn ngữ khác).

> **✅ ĐÃ DUYỆT — Project Owner, 2026-07-19: Chọn A.** `coverage.json`
> phenomenon `answer_acceptance_ko` → `VALIDATED`. (`spacing_orthography`
> — quy tắc spacing bản thân — vẫn giữ `DRAFT`, quyết định này chỉ chốt
> chính sách chấm điểm.)
