---
id: pt/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Portuguese Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule pt (baseline pt-BR) qua
  `/build-language` Bước 0–4. Dataset CLDR/UD/WikiPron Brazil; 9 quy tắc g2p
  xác nhận trên WikiPron thật; corpus-check casing trên 21377 câu.
  `grapheme_to_phoneme`, `nasalization`, `forms_of_address`, `register_taxonomy`
  → VALIDATED. HONORIFIC not-applicable (tiền lệ es B-02); chấm điểm thiếu dấu
  → cảnh báo nhẹ (tiền lệ es B-03), `answer_acceptance_pt` giữ DRAFT chờ owner.
  Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
