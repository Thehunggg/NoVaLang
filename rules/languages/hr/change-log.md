---
id: hr/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Croatian Change Log

- **0.1.0 (2026-07-20)** — Khởi tạo bộ rule hr (baseline hr-HR) qua
  `/build-language` Bước 0–4. Nam Slav, chữ Latin (Gaj, 30 chữ gồm digraph
  dž/lj/nj) + č ć š ž đ. Dataset CLDR/UD/WikiPron (WikiPron `hbs_latn_broad`
  27457 — LỚN; corpus UD Croatian-SET 9010, gần 10k). g2p-check xác nhận chính
  tả CỰC ĐỀU: č 1.09%, ć 1.90%, š 0.31%, ž 0.33%, c 0.95% (tất cả sạch) →
  `grapheme_to_phoneme` VALIDATED. corpus-check casing 0.00% trên 9010 câu →
  `casing` VALIDATED. `grapheme_to_phoneme`, `casing`, `word_order`,
  `forms_of_address`, `punctuation_layout`, `diacritics_orthography`,
  `register_taxonomy`, `tts_audio_policy` → VALIDATED. **Trung thực dữ liệu:**
  hình thái Slav (7 cách, thể perfective/imperfective) + pitch accent (4 kiểu)
  ở lexical/paradigm — cần bảng biến cách + audio + người bản ngữ; ghi rõ.
  HONORIFIC not-applicable (es B-02). Đặc trưng: **7 CÁCH** (không mạo từ),
  **thể động từ**, **enclitic vị trí 2** (Wackernagel), ba âm tắc-xát č/ć/c
  riêng, ti/Vi đối lập T-V (KHÁC scandinavia), pro-drop. hr-HR (Latin, KHÁC sr
  Cyrillic; từ vựng khác sr/bs). **4 giả định cần owner duyệt:** D-hr-01
  (baseline hr-HR), D-hr-02 (ti/Vi đối lập), D-hr-03 (trình tự dạy cách), D-hr-04
  (thiếu č/ć/š/ž/đ = SAI theo pl D-64), giữ DRAFT flag owner. Trạng thái tổng:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
