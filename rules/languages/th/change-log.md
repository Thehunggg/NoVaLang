---
id: th/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Thai Change Log

- **0.1.0 (2026-07-20)** — Khởi tạo bộ rule th (baseline th-TH, Trung Thái/
  Bangkok) qua `/build-language` Bước 0–4. Kra-Dai, hệ chữ THÁI (abugida) — ngôn
  ngữ KHÓ nhất đợt này. Dataset CLDR/UD/WikiPron (WikiPron `tha_thai_broad`
  18319 có thanh — LỚN; corpus UD Thai-PUD CHỈ 1000 test-only, DƯỚI 2000 — RẤT
  YẾU, ghi rõ; tool tự cảnh báo). g2p-check: âm đầu ก→[k] 0.49%, ม→[m] 0.23%
  (sạch); บ→[b] 37% = **coda neutralization thật** (บ cuối → [p̚]), không phải
  rule sai (kỷ luật dữ liệu). corpus-check `content-in-thai-script` 0.00% trên
  1000 câu (mọi câu chữ Thái); 98.9% có dấu thanh. `writing_systems`,
  `word_segmentation`, `phoneme_inventory`, `word_class`, `isolating_grammar`,
  `word_order`, `punctuation_layout`, `tts_audio_policy` → VALIDATED. **Trung
  thực dữ liệu:** g2p Thái ĐA YẾU TỐ (thanh từ lớp phụ âm × dấu thanh × loại âm
  tiết × độ dài + coda neutralization) → `grapheme_to_phoneme` + `tones` +
  `consonant_classes` giữ DRAFT/medium, cần audio; corpus rất nhỏ (1000). Đặc
  trưng: hệ chữ abugida (dấu nguyên âm quanh phụ âm), **5 THANH**, **3 lớp phụ
  âm**, **KHÔNG khoảng trắng giữa từ** (tách từ), **isolating** (không biến tố,
  như zh/vi — thuận lợi), **loại từ** khi đếm, đại từ theo tuổi/giới/quan hệ,
  trợ từ lịch sự ครับ/ค่ะ GẮN GIỚI người nói. `casing` + `stroke_order`
  not-applicable. HONORIFIC: ราชาศัพท์ (hoàng gia) TỒN TẠI nhưng out-of-scope
  baseline (KHÁC es B-02). **4 giả định cần owner duyệt:** D-th-01 (baseline
  th-TH), D-th-02 (dạy chữ Thái trực tiếp), D-th-03 (trợ đọc RTGS/IPA+thanh
  nhập môn ẩn dần, như hi/el), D-th-04 (thiếu/sai dấu thanh/nguyên âm = SAI theo
  pl D-64 + hi D-hi-04; không nhận Latin; nhắc cài bàn phím Thái), giữ DRAFT
  flag owner. `native-review-th.md` 7 mục chờ người bản ngữ. Status:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
