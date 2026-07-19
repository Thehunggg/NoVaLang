---
id: da/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Danish Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule da (baseline da-DK) qua
  `/build-language` Bước 0–4. Bắc Âu (gần sv/nb). Dataset CLDR/UD/WikiPron (bộ
  NHỎ: WikiPron 4773, corpus 5512 dưới 10k — ghi rõ). g2p-check xác nhận chữ
  nguyên âm æ/ø/å trên WikiPron thật; corpus-check casing 0.04% trên 5512 câu.
  `grapheme_to_phoneme` (chữ nguyên âm), `forms_of_address`, `register_taxonomy`
  → VALIDATED. **Trung thực dữ liệu:** g2p tổng quát KHÔNG đáng tin (chính tả
  Đan Mạch không đều — soft d/stød/âm câm lexical); corpus dưới 10k — cả hai ghi
  rõ, không giả vờ đủ. HONORIFIC not-applicable (es B-02). D-da-01 baseline
  da-DK; D-da-02 du phổ quát (De gần tuyệt chủng); D-da-03 chấm thiếu æ/ø/å áp
  tiền lệ pl D-64 (dấu là chữ → thiếu = sai), giữ DRAFT flag owner. Đặc trưng:
  hậu tố xác định (nhưng mạo từ trước khi có tính từ, KHÁC sv), động từ không
  chia theo ngôi, stød, V2. Phát âm cần audio. Trạng thái tổng:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
