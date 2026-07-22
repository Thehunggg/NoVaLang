---
id: fil/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Filipino Change Log

- **0.1.0 (2026-07-20)** — Khởi tạo bộ rule fil (baseline fil-PH = Tagalog
  chuẩn hoá) qua `/build-language` Bước 0–4. Austronesian, chữ Latin (28 chữ +
  ng + ñ). Dataset CLDR/UD/WikiPron: WikiPron `tgl_latn_broad` 28295 (LỚN — g2p
  đáng tin); corpus UD Tagalog TRG+Ugnayan CHỈ 222 câu (test-only, RẤT NHỎ, dưới
  2000 nhiều — corpus check RẤT YẾU, ghi rõ). g2p-check: ng→[ŋ] 0.59% (sạch) →
  `grapheme_to_phoneme` VALIDATED. **Kỷ luật dữ liệu:** ép ny→[nj] báo 100% →
  'ny' KHÔNG phải digraph Tagalog, BỎ giả thuyết; casing tháng/thứ VIẾT HOA
  (Enero/Lunes, en/es) → KHÔNG áp rule lowercase (dữ liệu bác giả thuyết, như
  tr/id); accents 0/222 câu → Filipino thường bỏ dấu. `writing_systems`,
  `casing`, `phoneme_inventory`, `grapheme_to_phoneme`, `word_class`,
  `word_order`, `forms_of_address`(→ giữ DRAFT), `punctuation_layout`,
  `tts_audio_policy` → VALIDATED (casing/word_class medium do corpus nhỏ).
  **Trung thực dữ liệu:** hệ TIÊU ĐIỂM/TRIGGER + phụ tố/trùng lặp + tiểu từ
  ang/ng/sa + po/ho ở lexical/DRAFT — corpus quá nhỏ, cần người bản ngữ; KHÔNG
  thổi phồng (bài học ca WikiPron 176). Đặc trưng: **hệ tiêu điểm/trigger**
  (actor -um-/mag- vs object -in/i-/-an, tiểu từ ang/ng), **phụ tố + trùng lặp**
  (s-um-ulat, susulat), **tiểu từ ang/ng/sa** (không biến cách danh từ),
  **po/ho** tôn trọng (quan trọng xã hội), VSO + linker na/-ng, âm tắc thanh hầu
  + trọng âm (không viết). HONORIFIC not-applicable (po/ho ~ register, es B-02).
  **4 giả định cần owner duyệt:** D-fil-01 (baseline fil-PH), D-fil-02 (po/ho
  baseline lịch sự), D-fil-03 (dạy Filipino chuẩn không Taglish), D-fil-04
  (accents TUỲ CHỌN, không bắt buộc — NGOẠI LỆ khoan dung, KHÁC pl/hr; ñ đúng
  khi xuất hiện), giữ DRAFT flag owner. `native-review-fil.md` 7 mục — ĐẶC BIỆT
  quan trọng vì corpus nhỏ. Status: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
