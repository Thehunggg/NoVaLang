---
id: fr/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fr/orthography, fr/pronunciation, fr/grammar-and-usage, fr/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# French Validation Summary

## Trạng thái theo pipeline

```text
Bước 0 (inventory): HOÀN TẤT — 22 hiện tượng, coverage.json
Bước 1 (dataset import): HOÀN TẤT — CLDR/UD/WikiPron (cả 2 URL đúng ngay lần đầu)
Bước 2 (derive): ĐIỀU CHỈNH theo D-51 — WebSearch + trained-knowledge
Bước 3 (corpus check): HOÀN TẤT — 3 bug thật tìm và sửa, xem pipeline-log.md
Bước 4 (review checklist): xem review-checklist.md + native-review-fr.md
Bước 5 (freeze): KHÔNG THỰC HIỆN — status trần VALIDATED
```

## Kết quả `node tools/validate.mjs`

PASS 9 invariant, không lỗi mới ngoài 4 lỗi pre-existing vi/zh.

## Kết quả corpus check (Bước 3) — nhiều phát hiện nhất trong 3 ngôn ngữ

1. h aspiré không elide — loại 'h' khỏi trigger (740->giảm).
2. **Bug kỹ thuật tổng quát**: JS `\b` không nhận ký tự Latin có dấu là
   word-char, gây khớp nhầm bên trong từ như "même" — sửa bằng anchor
   khoảng trắng thay vì `\b`. Đề xuất sửa `tools/README.md`/kiểm lại
   es xem có bị ảnh hưởng không (GIẢ ĐỊNH C-08).
3. 141/17342 (0.81%) còn lại là exception lexical thật (proper noun, bán
   nguyên âm) — dưới ngưỡng rule-sai.
4. g2p-check nasal vowel `an$->[ɑ̃]`: 20.10% vi phạm, TOÀN BỘ là tên riêng
   ngoại lai trong WikiPron — không nâng confidence, cần lọc tên riêng.

## Giới hạn đã biết

- Corpus dùng UD French-GSD/PUD (17342 câu), không phải Tatoeba/Wikipedia.
- Derive Bước 2 dùng WebSearch snippet, không đọc nguyên văn nguồn gốc.
- Dialect baseline (Pháp/Québécois) chưa quyết — nhẹ hơn vấn đề es.
- Chưa có bài học thật (playable) tiếng Pháp nào để kiểm false-positive
  trên nội dung thật.

## Provenance

`S-TRAINED-KNOWLEDGE` + kết quả thực thi `tools/validate.mjs`/
`corpus-check.mjs`/`g2p-check.mjs` thật.
