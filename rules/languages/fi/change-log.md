---
id: fi/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Finnish Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule fi (baseline fi-FI yleiskieli) qua
  `/build-language` Bước 0–4. Ngôn ngữ Ural (Uralic) T1 đầu tiên — không phải
  Ấn-Âu, chắp dính. Dataset CLDR/UD/WikiPron (173449 cặp); g2p-check xác nhận
  chính tả gần như 1:1 âm vị (độ dài đôi, ä/ö/y) trên WikiPron thật; corpus-check
  casing 0.00% trên 30117 câu. `grapheme_to_phoneme`, `vowel_length`,
  `consonant_length`, `no_gender_no_articles`, `forms_of_address`,
  `register_taxonomy` → VALIDATED. **Phát hiện thật:** nk→[ŋk] bắn 41% do từ
  ghép giữ [nk] qua ranh giới hình vị → giữ medium/lexical. HONORIFIC
  not-applicable (es B-02). D-fi-01 baseline fi-FI; D-fi-02 yleiskieli baseline
  (khoảng cách lớn với puhekieli); D-fi-03 chấm thiếu ä/ö áp tiền lệ pl D-64
  (dấu là chữ + phá hoà âm → thiếu = sai), giữ DRAFT flag owner. Hình thái CỰC
  nặng (15 cách, partitiivi, luân phiên phụ âm, hoà âm) ở lexical_level chờ bảng
  + native review. Thuận lợi: chính tả 1:1, trọng âm cố định, không giống/mạo
  từ. Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
