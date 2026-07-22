---
id: th/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-UD-CORPUS, WIKIPRON, UD, CLDR]
---

# Thai Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR th → `orthography.data.json`; UD Thai-PUD
  → `word-class.data.json`; WikiPron `tha_thai_broad` (18319 cặp có thanh, bộ
  lớn) → `grapheme-to-phoneme.data.json`.
- **Corpus (Bước 3):** 1000 câu (UD Thai-PUD **test-only** — Thái không có UD
  train lớn) → `tools/cache/corpus/th-sentences.txt` (không commit). **DƯỚI 2000
  (1000) — corpus check RẤT YẾU**, tool tự cảnh báo. Ghi rõ.
- **g2p-check (Bước 3):** âm ĐẦU ổn định — ก→[k] 0.49%, ม→[m] 0.23% (sạch).
  บ→[b] báo 37% 'vi phạm' = **coda neutralization thật** (บ cuối → [p̚]), KHÔNG
  phải rule sai — kỷ luật dữ liệu. Thanh điệu đa yếu tố → g2p rule_level
  **MEDIUM** (không 1:1). WikiPron lớn (có thanh) nhưng g2p Thái phức.
- **corpus-check (Bước 3):** `content-in-thai-script` **0.00%** trên 1000 câu
  (mọi câu có chữ Thái). Casing not-applicable.
- **Đo trực tiếp corpus:** 100% câu chữ Thái, 98.9% có dấu thanh, 96.1% ký tự
  Thái (Latin 0.18% — từ vay/viết tắt).

## Ghi chú dữ liệu (trung thực)

WikiPron lớn (18319, có thanh) NHƯNG g2p Thái ĐA YẾU TỐ (thanh + coda) → chỉ
medium, không nâng lên high. Corpus RẤT NHỎ (1000, test-only) → check yếu, ghi
rõ. Thanh + lớp phụ âm + loại từ + đại từ ở lexical/rule phức, cần audio + người
bản ngữ. Isolating là thuận lợi (không paradigm).

## Invariant (tools/validate.mjs)

Ngôn ngữ th phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Thái. Hệ chữ + thanh là điểm khó; g2p medium (đa
yếu tố); corpus rất nhỏ. Ngôn ngữ KHÓ nhất đợt build này.
