---
id: ms/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Malay Change Log

- **0.1.0 (2026-07-20)** — Khởi tạo bộ rule ms (baseline ms-MY, Bahasa Melayu)
  qua `/build-language` Bước 0–4. Austronesian, chữ Latin (Rumi) 26 chữ, KHÔNG
  dấu phụ. Dataset CLDR + WikiPron `msa_latn_broad` 6672 (chính tả đều → g2p
  sạch). **VƯỚNG DỮ LIỆU (ghi rõ): KHÔNG có UD_Malay → không có word-class
  dataset; KHÔNG có corpus tiếng Mã Lai → corpus-check KHÔNG chạy được.** g2p-check:
  ng→[ŋ] 0.95%, ny→[ɲ] 0.00%, sy→[ʃ] 0.00%, c→[t͡ʃ] 1.06% (tất cả sạch) →
  `grapheme_to_phoneme` VALIDATED. `writing_systems`, `casing` (đối chiếu id,
  medium), `phoneme_inventory`, `grapheme_to_phoneme`, `no_inflection`,
  `word_order`, `punctuation_layout`, `diacritics_orthography` (không dấu phụ),
  `answer_acceptance_ms` (đơn giản, không dấu), `tts_audio_policy` → VALIDATED.
  **Trung thực dữ liệu:** casing/word_class/ngữ pháp KHÔNG có corpus Mã Lai →
  dựa kiến thức + mô tả chuẩn + đối chiếu id (V5), nhiều mục medium/DRAFT, cần
  người bản ngữ; KHÔNG thổi phồng (bài học ca WikiPron 176). Đặc trưng: KHÔNG
  biến tố (thì qua từ sudah/akan/sedang), **phụ tố meN-** biến âm mũi
  (menulis/membaca/mengambil), **trùng lặp** số nhiều (buku-buku), **loại từ**
  ([số]+[loại từ]+[danh từ]: tiga buah buku), SVO + bổ nghĩa sau danh từ (giống
  vi), không mạo từ, 'e' [e]/[ə] schwa + k cuối [ʔ] (audio). Rất gần id (khác
  chuẩn/chính tả: ms wang / id uang). Không dấu phụ → chấm chính tả đơn giản
  (KHÁC pl/hr/hu). HONORIFIC not-applicable (es B-02; bahasa istana out-of-scope).
  **4 giả định cần owner duyệt:** D-ms-01 (baseline ms-MY), D-ms-02 (saya/anda
  baseline lịch sự), D-ms-03 (dạy bahasa baku chuẩn không bahasa pasar), D-ms-04
  (chấm chính tả đơn giản, không dấu phụ), giữ DRAFT flag owner. `native-review-ms.md`
  7 mục — ĐẶC BIỆT quan trọng vì KHÔNG có corpus. Status:
  `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
