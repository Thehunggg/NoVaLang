---
id: ko/validation
version: 0.1.0
status: DRAFT
tier: [t1, t3]
role: [both]
enforced_by: guidance-only
depends_on: [ko/orthography, ko/pronunciation, ko/grammar-and-usage, ko/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Korean Validation Summary

## Trạng thái theo pipeline

```text
Bước 0 (inventory): HOÀN TẤT — 24 hiện tượng, coverage.json
Bước 1 (dataset import): HOÀN TẤT — CLDR/UD/WikiPron
Bước 2 (derive 2 nguồn độc lập): ĐIỀU CHỈNH theo D-51 — WebSearch + trained-knowledge
  thay cho subagent-đọc-nguyên-văn (WebFetch bị chặn phiên này)
Bước 3 (corpus check): xem pipeline-log.md cho kết quả cụ thể
Bước 4 (review checklist): xem review-checklist.md + native-review-ko.md
Bước 5 (freeze): KHÔNG THỰC HIỆN — status trần VALIDATED theo yêu cầu Project Owner
```

## Kết quả `node tools/validate.mjs`

Xem `pipeline-log.md` cho log chi tiết từng lần chạy. Tóm tắt cuối cùng
(thời điểm hoàn tất): PASS 9 invariant, không phát sinh lỗi mới ngoài 4 lỗi
pre-existing của vi/zh (`punctuation_layout`, không liên quan tới task này).

## Kết quả self-test (fixtures.pass/fixtures.fail)

Mỗi file `.rules.json` (`orthography`, `phonology`, `grammar`, `pragmatics`)
có >=1 fixture pass và >=1 fixture fail theo đúng `rules.schema.json` —
kiểm bằng `node tools/validate.mjs` (invariant 4/5) và xác nhận thủ công
từng `checks[].fixtures`/top-level `fixtures` khớp logic mô tả.

## Giới hạn đã biết (không che giấu)

- Corpus check dùng UD Korean-GSD/PUD (7339 câu), KHÔNG phải Tatoeba/Wikipedia
  (bị chặn egress) — cùng tình trạng đã xảy ra với ja.
- Derive Bước 2 dùng WebSearch snippet thay vì đọc nguyên văn tài liệu gốc —
  confidence trần medium cho các mục chỉ có nguồn này.
- Chưa có bài học thật (playable) nào bằng tiếng Hàn để chạy rule lên kiểm
  tra false-positive như đã làm với 506 bài ja — đây chính là lý do status
  trần `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, không phải `FROZEN`.

## Provenance

`S-TRAINED-KNOWLEDGE` + kết quả thực thi `tools/validate.mjs`/`corpus-check.mjs`
thật (không phải mô tả suy đoán).
