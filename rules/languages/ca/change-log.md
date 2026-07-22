---
id: ca/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Catalan Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule ca (baseline ca, Central/IEC) qua
  `/build-language` Bước 0–4. Romance (Occitano-Romance, gần es/fr/it). Dataset
  CLDR/UD/WikiPron (WikiPron RẤT NHỎ 176 — g2p KHÔNG đáng tin, ghi rõ; corpus
  LỚN 16678 trên 10k). corpus-check casing 0.05% trên 16678 câu → `casing`
  VALIDATED; đo thêm ç 11.60% + l·l 7.37% (đặc trưng thật) + ¿¡ 0.84% (chuẩn
  Catalan không dùng dấu lật ngược, KHÁC es). `casing`, `word_order`,
  `forms_of_address`, `punctuation_layout`, `diacritics_orthography`,
  `register_taxonomy`, `tts_audio_policy` → VALIDATED. **Trung thực dữ liệu:**
  g2p tổng quát chỉ medium (WikiPron 176 quá nhỏ, không g2p-check được); giảm
  nguyên âm + pronoms febles lexical, cần audio — ghi rõ. HONORIFIC
  not-applicable (es B-02). Đặc trưng: ç [s] + **l·l** (ela geminada, khác ll),
  **giảm nguyên âm** (a/e→ə, o/u→u — như pt/ru), **passat perifràstic** (vaig
  parlar), **pronoms febles** (hi/en, khác es), tu/vostè đối lập T-V (KHÁC da/sv
  du-phổ-quát), pro-drop, chia động từ theo ngôi, apostrophe/rút gọn (l'home,
  del). Central Catalan (KHÔNG Valencian). **4 giả định cần owner duyệt:**
  D-ca-01 baseline ca Central/IEC; D-ca-02 tu/vostè đối lập; D-ca-03 passat
  perifràstic làm quá khứ chuẩn; D-ca-04 chấm điểm 2 loại dấu (ç/l·l = sai theo
  pl D-64; à è é í ï ò ó ú ü = cảnh báo nhẹ theo es D-74), giữ DRAFT flag owner.
  Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
