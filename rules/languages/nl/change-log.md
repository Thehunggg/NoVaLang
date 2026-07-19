---
id: nl/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Dutch Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule nl (baseline nl-NL) qua
  `/build-language` Bước 0–4. Dataset CLDR/UD/WikiPron; g2p-check xác nhận
  ch/ij/ui/oe/sch/aa/oo/ng/ge + làm câm cuối từ trên WikiPron thật;
  corpus-check casing 0.09% trên 30723 câu. `grapheme_to_phoneme`,
  `final_devoicing`, `vowel_length_spelling`, `forms_of_address`,
  `register_taxonomy` → VALIDATED. Real-data: ij/ui tokenization (dấu phi-âm-
  tiết), g phẳng over-fire do ng nuốt g → tách ng/ge. HONORIFIC not-applicable
  (es B-02); chấm trema/dấu → cảnh báo nhẹ (es B-03), `answer_acceptance_nl`
  DRAFT. de/het + động từ mạnh ở lexical_level chờ bảng + native review. Trạng
  thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
