---
id: cs/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Czech Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule cs (baseline cs-CZ spisovná) qua
  `/build-language` Bước 0–4. Slav Tây Latin-script. Dataset CLDR/UD/WikiPron
  narrow (65070 cặp); g2p-check xác nhận sibilants (š/ž/č) + ř→[r̝] 0.00% (âm
  đặc trưng) + độ dài + làm câm cuối từ trên WikiPron thật; corpus-check casing
  0.01% trên 34869 câu. `grapheme_to_phoneme`, `final_devoicing`,
  `palatalization`, `no_articles`, `forms_of_address`, `register_taxonomy` →
  VALIDATED. **Kỷ luật dữ liệu:** ž→ʒ bắn 16.63% → thêm [ʃ] (làm câm/đồng hoá)
  → 0.00%. HONORIFIC not-applicable (es B-02). D-cs-01 baseline cs-CZ; D-cs-02
  spisovná vs obecná (dạy chuẩn viết + cảnh báo khẩu ngữ); D-cs-03 chấm thiếu
  dấu áp tiền lệ pl D-64 (háček/độ dài đổi âm+nghĩa → thiếu = sai), giữ DRAFT
  flag owner. Đặc trưng: 7 cách (vokativ), animacy, clitic vị trí thứ hai
  (Wackernagel), âm ř, trọng âm cố định. Hình thái nặng ở lexical_level. Trạng
  thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
