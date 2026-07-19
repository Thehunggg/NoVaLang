---
id: nb/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Norwegian Bokmål Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule nb (baseline nb-NO, Bokmål) qua
  `/build-language` Bước 0–4. Bắc Âu (gần da/sv). Dataset CLDR/UD/WikiPron
  (WikiPron nhỏ 3432, NHƯNG corpus LỚN 20044 trên 10k). g2p-check xác nhận
  æ/ø/å (0.00/0.44/8.02%) + sj-lyd (0.00%) + kj-lyd (12.09%) trên WikiPron
  thật; corpus-check casing 0.08% trên 20044 câu (bằng chứng mạnh).
  `grapheme_to_phoneme` (chữ nguyên âm + sj/kj), `casing`, `forms_of_address`,
  `register_taxonomy`, `tts_audio_policy` → VALIDATED. **Trung thực dữ liệu:**
  g2p tổng quát chỉ medium (WikiPron nhỏ); pitch accent + âm câm lexical, cần
  audio — ghi rõ. HONORIFIC not-applicable (es B-02). D-nb-01 baseline nb-NO
  (Bokmål, Østnorsk); D-nb-02 dạy 3 giống chấp nhận gộp masc+fem; D-nb-03 chấm
  thiếu æ/ø/å áp tiền lệ pl D-64 (dấu là chữ → thiếu = sai), giữ DRAFT flag
  owner. Đặc trưng: hậu tố xác định + **xác định KÉP** khi có tính từ (den røde
  bilen, GIỐNG sv KHÁC da), động từ không chia theo ngôi, pitch accent (thay
  stød của da), V2, du phổ quát. Bokmål (KHÔNG Nynorsk nn). Trạng thái tổng:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
