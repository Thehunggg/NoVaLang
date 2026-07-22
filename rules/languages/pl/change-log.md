---
id: pl/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Polish Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule pl (baseline pl-PL) qua
  `/build-language` Bước 0–4. Dataset CLDR/UD/WikiPron; g2p-check xác nhận 15
  quy tắc chữ→âm trên WikiPron thật (157042 cặp); corpus-check casing 0.02%
  trên 35926 câu. `grapheme_to_phoneme`, `final_devoicing`,
  `consonant_palatalization`, `nasal_vowels`, `no_articles`, `forms_of_address`,
  `register_taxonomy` → VALIDATED. Real-data (VÒNG 4): rz bắn 61% → làm câm
  [ʂ]; dz bắn 67% → dzi làm mềm [d͡ʑ]; sửa theo dữ liệu. HONORIFIC not-applicable
  (es B-02); chấm thiếu dấu → cảnh báo nhẹ với chú thích 'dấu là chữ' (es B-03
  điều chỉnh), `answer_acceptance_pl` DRAFT. Hình thái nặng (7 cách/thể/giống
  nam-người/số từ) ở lexical_level chờ bảng + native review. Trạng thái tổng:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
