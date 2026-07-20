---
id: ms/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, CLDR, S-ID-CROSSREF]
---

# Malay Validation

## Đã chạy (Bước 1–3)

- **Dataset import (Bước 1):** CLDR ms → `orthography.data.json`; WikiPron
  `msa_latn_broad` (6672 cặp) → `grapheme-to-phoneme.data.json`. **KHÔNG có
  UD_Malay** → KHÔNG có `word-class.data.json` (ghi rõ; hệ từ loại gần id).
- **Corpus (Bước 3):** **0 CÂU — KHÔNG có corpus tiếng Mã Lai** trong môi
  trường này (UD_Malay không tồn tại; không fetch được Tatoeba/Leipzig theo
  D-51). corpus-check KHÔNG chạy được. GHI RÕ.
- **g2p-check (Bước 3):** ng→[ŋ] 0.95%, ny→[ɲ] 0.00%, sy→[ʃ] 0.00%, c→[t͡ʃ]
  1.06% — TẤT CẢ SẠCH trên 6672 từ → `grapheme_to_phoneme` VALIDATED (chính tả
  Mã Lai rất đều). 'e' [e]/[ə] + k cuối [ʔ] lexical.

## Ghi chú dữ liệu (TRUNG THỰC — quan trọng)

WikiPron 6672 sạch → g2p đáng tin. NHƯNG **KHÔNG có corpus/UD Mã Lai** →
casing + ngữ pháp (phụ tố, trùng lặp, loại từ, đại từ) KHÔNG kiểm được trên dữ
liệu Mã Lai thật; dựa **kiến thức + mô tả chuẩn + đối chiếu id (V5)**. Nhiều mục
để **medium/DRAFT** với ghi chú 'cần người bản ngữ'. KHÔNG thổi phồng độ tin
(bài học ca WikiPron 176). Native review ĐẶC BIỆT quan trọng. Bù lại: Mã Lai
hình thái đơn giản + rất gần id (đã build+duyệt) nên rủi ro sai hệ thống thấp.

## Invariant (tools/validate.mjs)

Ngôn ngữ ms phải pass 9 invariant. INV-9: mọi hiện tượng mặc định đều ≥ medium
ở rule_level.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`. KHÔNG FROZEN (ADR-014): chưa có
bài học thật (playable) tiếng Mã Lai. g2p đáng tin (WikiPron sạch); NHƯNG không
có corpus → casing/ngữ pháp dựa kiến thức + đối chiếu id, cần người bản ngữ
trước khi có nội dung thật.
