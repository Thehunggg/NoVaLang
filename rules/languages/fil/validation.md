---
id: fil/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Filipino Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR fil → `orthography.data.json`; UD
  Tagalog-Ugnayan → `word-class.data.json`; WikiPron `tgl_latn_broad` (28295
  cặp, bộ LỚN) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 222 câu (UD Tagalog TRG + Ugnayan, test-only) →
  `tools/cache/corpus/fil-sentences.txt` (không commit). **RẤT NHỎ (222, dưới
  2000 nhiều) — corpus check RẤT YẾU**, tool tự cảnh báo. GHI RÕ, không thổi
  phồng.
- **g2p-check (Bước 3):** ng→[ŋ] 0.59% (sạch) → `grapheme_to_phoneme`
  VALIDATED (WikiPron lớn 28295). **Kỷ luật dữ liệu:** ép ny→[nj] báo 100% →
  'ny' KHÔNG phải digraph Tagalog, BỎ giả thuyết. Trọng âm + âm tắc thanh hầu
  (không viết) là lexical.
- **corpus-check (Bước 3):** `content-latin-script` 0.00% trên 222 câu (Latin).
  **Casing:** tháng/thứ VIẾT HOA (Enero/Lunes, quy ước en/es) — KHÔNG áp rule
  lowercase (giả thuyết lowercase bị dữ liệu bác, như tr/id). Accents: 0/222 câu
  → Filipino thường bỏ dấu.

## Ghi chú dữ liệu (TRUNG THỰC — quan trọng)

WikiPron LỚN (28295) → g2p chữ→âm cơ bản đáng tin. NHƯNG corpus RẤT NHỎ (222,
test-only — Tagalog không có UD lớn) → casing + ngữ pháp (hệ tiêu điểm, phụ tố,
po/ho, tiểu từ) bằng chứng YẾU, phần lớn dựa kiến thức + mô tả học thuật. Nhiều
mục để **medium/DRAFT** với ghi chú "cần người bản ngữ". KHÔNG thổi phồng độ tin
từ dữ liệu mỏng (bài học từ ca WikiPron 176). Native review ĐẶC BIỆT quan trọng.

## Invariant (tools/validate.mjs)

Ngôn ngữ fil phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Filipino. g2p đáng tin (WikiPron lớn); NHƯNG hệ
tiêu điểm/trigger + phụ tố + po/ho ở lexical/DRAFT, corpus rất nhỏ — cần người
bản ngữ trước khi có nội dung thật.
