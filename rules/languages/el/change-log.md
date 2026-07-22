---
id: el/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Greek Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule el (baseline el-GR / Standard
  Modern Greek) qua `/build-language` Bước 0–4. Hệ chữ HY LẠP (Grek, không
  Latin) → RẤT KHÓ, tra cứu 5 vòng cho quyết định sản phẩm. Dataset
  CLDR/UD/WikiPron: WikiPron **19133 cặp** (bộ lớn), corpus GDT+GUD **4285
  câu** (dưới 10k — ghi rõ, trên sàn 2000). g2p-check xác nhận chính tả Hy
  Lạp KHÁ ĐỀU (phụ âm/nguyên âm/digraph <1%); corpus-check xác nhận monotonic
  (0 polytonic) + dấu hỏi Hy Lạp `;` (0 `?` Latin), cả hai 0.00%.
  `grapheme_to_phoneme`, `accent_system`, `punctuation_layout`,
  `phoneme_inventory`, `forms_of_address`, `register_taxonomy`,
  `tts_audio_policy`, writing_system/charset/writing_direction → VALIDATED.
  Đặc trưng KHÓ: 3 giống, 4 cách (nom/gen/acc/voc), động từ chia đầy đủ
  (ngôi/số/thì/thể/dạng, không nguyên mẫu), clitic trước động từ, đối lập T-V
  (εσύ/εσείς). Kỷ luật dữ liệu: υ-trong-digraph, synizesis, μπ heterosyllabic
  giữ nguyên rule, ghi rõ. HONORIFIC not-applicable (es B-02). D-el-01
  baseline el-GR; D-el-02 monotonic; D-el-03 không Greeklish (dạy chữ Hy Lạp
  trực tiếp); D-el-04 chấm thiếu tonos/ς = sai (áp tiền lệ pl D-64, giữ
  DRAFT); D-el-05 dạy đối lập εσύ/εσείς. native-review-el 7 mục. Trạng thái:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
