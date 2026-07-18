# Bảng ánh xạ tên trường văn bản (crosswalk) — guidance-only

**Phát hiện từ phép thử độc lập rule ja × Golden Lesson (C7, 2026-07-18):**
repo hiện có **3 bộ tên trường** cùng mô tả gần như cùng một khái niệm
(hiển thị / chấm đáp án / TTS đọc), sống song song ở 3 tầng khác nhau. Không
bộ nào sai — mỗi bộ đúng ở tầng của nó — nhưng nếu không có bảng nối, một rule
hoặc validator có thể kiểm nhầm tên trường không tồn tại ở tầng đang xét.

## Ba bộ tên

| # | Tên bộ | Sống ở đâu | Phạm vi |
|---|---|---|---|
| **A** | `_base/text-fields` (rule layer) | `rules/_base/text-fields.rules.json` | Trừu tượng, dùng chung mọi ngôn ngữ — tên rule đặt ra để nói "phải tách 3 việc" |
| **B** | Product schema (dữ liệu bài học thật) | `shared/generated/lessons.json` (KHÔNG thuộc phạm vi sửa của `rules/`) | Cụ thể, do generator sinh — tên trường thật object JSON của vocab/dialogue/exercise |
| **C** | Five-field pronunciation contract | ADR-015 (`docs/ai/ARCHITECTURE_DECISIONS.md`), narrative ở `rules/languages/ja/tts-and-audio.md` | Trừu tượng, đặc thù bài toán phát âm — áp cho mọi ngôn ngữ có reading/romanization |

## Bảng nối theo mục đích

| Mục đích | A (`_base/text-fields`) | B (product schema — vocab/dialogue item) | B (product schema — exercise slot, vd Q10) | C (ADR-015) |
|---|---|---|---|---|
| Chữ viết chuẩn (script gốc, dùng để hiển thị) | `displayText` | `displayText` | `displayText` | `surfaceText` |
| Máy chấm đáp án dùng | `canonicalText` | *(không có trường riêng — suy ra: kana-only item dùng `reading`; item cho kanji dùng `displayText` đã bỏ furigana; xem D-13)* | `canonicalText` | *(không đặt tên — gần nhất là `surfaceText`, chọn theo exact-form objective)* |
| TTS đọc | `audioText` | `speechText` | `audioText` | `ttsText` |
| Cách đọc bản ngữ (kana, luôn có, không điều chỉnh theo trợ từ) | *(không mô hình hoá)* | `reading` | *(không có — slot không cần reading riêng)* | `reading` |
| Phiên âm Latin cho người học | *(không mô hình hoá)* | `romanization` | *(không có)* | `romanization` |
| IPA / vùng miền (dự trữ, chưa dùng) | *(không mô hình hoá)* | *(chưa có)* | *(chưa có)* | `pronunciation` (reserved, unused) |
| Nghĩa/dịch cho người học | *(không mô hình hoá)* | `meaningVi`, `translationByNative`, `translations` | *(theo từng loại bài, vd `promptByNative`)* | *(ngoài phạm vi 5 trường; thuộc `naturalness-and-register.md`)* |

## Quan sát quan trọng (đã xác minh trên Golden Lesson thật)

- **Slot bài tập gõ chữ (Q10) đã dùng ĐÚNG bộ A y hệt**: `displayText` /
  `canonicalText` / `audioText` xuất hiện literal trong
  `fiveCardContent.practice.exercises[9].slots[]`. Đây là chỗ duy nhất trong
  bài mà bộ A và bộ B trùng tên 1:1.
- **Mục từ vựng/hội thoại/Q14 KHÔNG dùng bộ A** — dùng bộ B riêng
  (`displayText`/`reading`/`romanization`/`speechText`). Không sai, chỉ là một
  schema sản phẩm khác cho một loại nội dung khác (item có phiên âm, không
  phải slot chấm điểm).
- Vì vậy: **một validator/rule viết cứng theo tên bộ A (`canonicalText`,
  `audioText`) sẽ không tìm thấy trường đó trên object vocab/dialogue** — không
  phải lỗi dữ liệu, mà là áp nhầm bộ tên. Khi viết `checks` mới trong
  `*.rules.json` nhắm vào nội dung thật (JSON đã generate), phải chọn đúng
  cột B ở bảng trên, không phải cột A.

## Trạng thái

`guidance-only` — không có `*.rules.json` riêng cho chính bảng này (bảng
không tự nó là một ràng buộc kiểm được, mà là tài liệu tra cứu để viết rule
khác cho đúng tên trường). `text-fields.rules.json` hiện hành (bộ A) giữ
nguyên, không đổi.

## Không thuộc phạm vi sửa ở đây

Đổi tên trường thật trong `shared/generated/lessons.json` hoặc trong
generator (`scripts/content/**`) là thay đổi Shared Source Of Truth — phải đi
qua quy trình Source → Generate → Validate → Sync, không phải qua `rules/`.
File này chỉ ghi lại bản đồ đã quan sát, không đề xuất đổi tên.
