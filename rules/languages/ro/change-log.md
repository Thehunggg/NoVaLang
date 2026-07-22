---
id: ro/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Romanian Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule ro (baseline ro-RO) qua
  `/build-language` Bước 0–4. Rôman Đông + đặc trưng Balkan. Dataset CLDR/UD/
  WikiPron (bộ nhỏ 9286 cặp; corpus lớn 33645 bù); g2p-check xác nhận ș/ț/ă/â/î
  + c/g mềm-cứng trên WikiPron thật; corpus-check casing 0.08% trên 33645 câu.
  `grapheme_to_phoneme`, `subjunctive_sa`, `forms_of_address`,
  `register_taxonomy` → VALIDATED. HONORIFIC not-applicable (es B-02). D-ro-01
  baseline ro-RO; D-ro-02 chính tả â/î theo quy tắc Viện Hàn lâm 1993 (î đầu/
  cuối, â giữa); D-ro-03 chấm thiếu dấu áp tiền lệ pl D-64 (5 dấu là chữ →
  thiếu = sai; ș/ț comma-below), giữ DRAFT flag owner; D-ro-04 tu/dumneavoastră
  (bỏ dumneata). Đặc trưng: mạo từ xác định hậu tố (Balkan), giống trung (neutru),
  hệ cách rút gọn, thức giả định să, nhân đôi tân ngữ. Hình thái ở lexical_level.
  Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.
