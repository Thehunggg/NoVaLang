---
id: id/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Indonesian Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule id (baseline id-ID / Bahasa
  Indonesia baku) qua `/build-language` Bước 0–4, tra cứu 5 vòng. Austronesian,
  chữ Latin (26 chữ), t1. Dataset CLDR/UD/WikiPron: WikiPron **18590 cặp**,
  corpus UD-GSD **5598 câu** (dưới 10k — ghi rõ). g2p-check digraph ny/ng/sy
  thấp. Kỷ luật dữ liệu: c/j "vi phạm" = tie-bar-vs-space tokenization (đúng);
  y→[j] 44.80% = y trong digraph ny/sy (digraph-precedence, giống uk/tr); 'e'
  [e]/[ə] schwa lexical. **KỶ LUẬT DỮ LIỆU casing (như tr):** tiếng Indonesia
  VIẾT HOA tháng/thứ (Januari, Senin) như Anh → KHÔNG áp check month-lowercase
  (corpus 255 hoa vs 3 thường). HONORIFIC not-applicable hình thái (es B-02);
  reading-aid NOT-APPLICABLE (chữ Latin). Đặc trưng: KHÔNG biến tố (không
  giống/cách/chia thì/số nhiều — điểm dễ nhất), thì qua hư từ (sudah/sedang/
  akan), PHỤ TỐ PHÁI SINH (meN- biến âm mũi, ber-/di-/ter-/-kan/-i/ke-...-an),
  LÁY (buku-buku), tính từ SAU danh từ, đại từ lịch sự (saya/aku, Anda/kamu,
  kami/kita). id KHÔNG có dấu phụ → answer_acceptance đơn giản (base). D-id-01
  baseline id-ID; D-id-02 chuẩn EYD V/Badan Bahasa; D-id-03 reading-aid N/A;
  D-id-04 answer_acceptance dùng _base (không cần luật riêng vì không có
  chữ-cái-riêng); D-id-05 dạy đại từ lịch sự (mức baku). native-review-id 7 mục.
  Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
