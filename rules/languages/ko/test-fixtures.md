---
id: ko/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1, t3]
role: [both]
enforced_by: guidance-only
depends_on: [ko/validation]
sources: [S-UD-CORPUS]
---

# Korean Test Fixtures

## Nguồn fixture

- **Fixture tự viết** (trong mỗi `checks[].fixtures`): minh hoạ trực tiếp
  quy tắc, dùng để tự-test cấu trúc rule.
- **Fixture từ corpus thật** (đánh dấu `_note` trong mỗi `.rules.json`):
  trích từ `tools/cache/corpus/ko-sentences.txt` (UD Korean-GSD/PUD, 7339
  câu) — theo đúng yêu cầu Bước 3 mục 6 ("thay/bổ sung fixture pass bằng
  câu thật lấy từ corpus khi có").

## Banned exact fixtures (deterministic)

Chưa có — cần dữ liệu thật/native review trước khi xác định câu cụ thể bị
cấm (vd bẫy dịch, lỗi register nghiêm trọng).

## Native-review fixtures

Xem `native-review-ko.md` — khung checklist đã có, CHƯA gửi review, CHƯA có
kết quả.

## Chưa giải quyết

Toàn bộ mục "Banned exact fixtures" và "Native-review fixtures" cần nội
dung thật, hiện chỉ có khung.
