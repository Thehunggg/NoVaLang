---
id: es/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [es/orthography, es/pronunciation, es/grammar-and-usage, es/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Spanish Validation Summary

## Trạng thái theo pipeline

```text
Bước 0 (inventory): HOÀN TẤT — 22 hiện tượng, coverage.json
Bước 1 (dataset import): HOÀN TẤT — CLDR/UD/WikiPron (bản 'la')
Bước 2 (derive): ĐIỀU CHỈNH theo D-51 — WebSearch + trained-knowledge
Bước 3 (corpus check): HOÀN TẤT — xem pipeline-log.md
Bước 4 (review checklist): xem review-checklist.md + native-review-es.md
Bước 5 (freeze): KHÔNG THỰC HIỆN — status trần VALIDATED
```

## Kết quả `node tools/validate.mjs`

PASS 9 invariant, không phát sinh lỗi mới ngoài 4 lỗi pre-existing của
vi/zh (không liên quan task này).

## Kết quả corpus check (Bước 3)

`orthography.rules.json` check `month-weekday-not-capitalized`: 102/17013
(0.60%) — "ok". Không có check nào bị áp sai phạm vi (rút kinh nghiệm từ
`ko`, chỉ đưa vào `checks[]` thứ thật sự kiểm được ở mức toàn-dòng).

## Kết quả g2p-check (Bước 3)

3/3 giả thuyết sạch 100% trên WikiPron thật (132249 từ): ñ->[ɲ] (2579 từ),
qu đầu từ->[k] (564 từ), z đầu từ->[s] (651 từ — xác nhận seseo).

## Giới hạn đã biết

- Corpus dùng UD Spanish-GSD/PUD (17013 câu, Peninsular/báo chí), KHÔNG phải
  Tatoeba/Wikipedia (bị chặn egress).
- Derive Bước 2 dùng WebSearch snippet, không đọc nguyên văn RAE gốc.
- Dialect baseline (B-01) CHƯA quyết — ảnh hưởng lớn tới style-and-register,
  pronunciation locale, và TTS.
- Chưa có bài học thật (playable) tiếng Tây Ban Nha nào để kiểm false-positive
  trên nội dung thật.

## Provenance

`S-TRAINED-KNOWLEDGE` + kết quả thực thi `tools/validate.mjs`/
`corpus-check.mjs`/`g2p-check.mjs` thật.
