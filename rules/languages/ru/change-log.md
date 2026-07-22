---
id: ru/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Russian Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule ru (baseline ru-RU, chữ Kirin) qua
  `/build-language` Bước 0–4. Ngôn ngữ T1 Kirin đầu tiên. Dataset CLDR/UD/
  WikiPron narrow; g2p-check xác nhận phụ âm + làm câm cuối từ trên WikiPron
  thật; corpus-check casing 0.00% trên 22736 câu. `grapheme_to_phoneme`,
  `palatalization`, `no_articles`, `forms_of_address`, `register_taxonomy`
  → VALIDATED. HONORIFIC not-applicable (tiền lệ es B-02); chấm ё/е + dấu
  trọng âm → cảnh báo nhẹ/normalize (tiền lệ es B-03), `answer_acceptance_ru`
  giữ DRAFT chờ owner. Hình thái nặng (cách/thể/trọng âm) ở lexical_level chờ
  bảng dữ liệu + native review. Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`,
  KHÔNG FROZEN.
