# fr — French rule set

Không có front-matter (README điều hướng, cùng quy ước ja/en/ko/es).

## Trạng thái

```text
language: fr (French / Français)
tier: t1 (learning only)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG — build rule KHÔNG kích hoạt ngôn ngữ chạy thật
```

Ngôn ngữ 3/3 trong chuỗi build ko → es → fr (2026-07-18).

## File trong thư mục này

Cùng cấu trúc `ko`/`es` — `coverage.json`, `sources.json`, 3 `.data.json`,
4 `.rules.json`, các `.md` narrative, `review-checklist.md`,
`native-review-fr.md`, `pipeline-log.md`, `change-log.md`.

## Điểm đặc trưng của fr so với ko/es (không sao chép nhầm khuôn)

- **Bước 1 thuận lợi nhất** — cả dataset WikiPron và UD đều tồn tại ngay
  lần thử URL đầu tiên (ko/es phải dò nhiều biến thể tên file).
- **Bước 3 tìm được nhiều bug thật nhất** — bao gồm 1 bug kỹ thuật tổng
  quát (JS `\b` không nhận ký tự Latin có dấu là word-char), không chỉ bug
  "áp sai phạm vi" như ko. Xem `pipeline-log.md` cho chi tiết đầy đủ.
- **Xưng hô (tu/vous) đơn giản hơn es** — hệ 2 chiều, không phân mảnh vùng
  miền ở mức ngữ pháp cốt lõi (khác tú/usted/vos/vosotros của es).
- **liaison + elision là 2 hiện tượng TÁCH BIỆT** — liaison là phát âm (khi
  nào đọc phụ âm câm), elision là chính tả (khi nào viết dấu nháy '). Không
  gộp làm một dù có vẻ liên quan.
