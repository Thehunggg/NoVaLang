# th — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-20 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` (orthography check chữ Thái vì casing n/a).
  Baseline th-TH Trung Thái/Bangkok (tự quyết, D-th-01). Ngôn ngữ khó nhất đợt.
- 2026-07-20 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr th` →
  `orthography.data.json`. WikiPron `tha_thai_broad` (18319 cặp có thanh — LỚN)
  → `grapheme-to-phoneme.data.json`. `ud th` (Thai-PUD test, đã tách từ) →
  `word-class.data.json`. Corpus: UD Thai-PUD test-only → 1000 câu (DƯỚI 2000 —
  RẤT YẾU, Thái không có UD train lớn).
- 2026-07-20 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (5 thanh, 3 lớp
  phụ âm, coda neutralization, isolating, loại từ, trợ từ thì, đại từ theo
  giới/quan hệ, ครับ/ค่ะ). Casing not-applicable (unicameral). Dạy chữ Thái
  trực tiếp (như el/hi). HONORIFIC ราชาศัพท์ tồn tại nhưng out-of-scope baseline.
- 2026-07-20 — **Bước 3 (g2p-check WikiPron 18319 từ).** Âm đầu ก→[k] 0.49%,
  ม→[m] 0.23% (sạch). บ→[b] 37% = **coda neutralization thật** (บ cuối → [p̚]) —
  KHÔNG phải rule sai, kỷ luật dữ liệu. Thanh đa yếu tố (lớp × dấu × loại âm tiết
  × độ dài) → g2p rule_level MEDIUM (không 1:1). Ưu tiên dữ liệu thật: chẩn đoán
  บ→b 'nổ' là hiện tượng, không ép rule.
- 2026-07-20 — **Bước 3 (corpus-check 1000 câu).** `content-in-thai-script`
  0.00% (mọi câu chữ Thái). Đo trực tiếp: 100% chữ Thái, 98.9% có dấu thanh,
  96.1% ký tự Thái (Latin 0.18% — vay/viết tắt). Corpus dưới 2000 — tool tự
  cảnh báo yếu.
- 2026-07-20 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-th-01 (baseline th-TH, v1), D-th-02 (dạy chữ Thái trực tiếp, v1, product),
  D-th-03 (trợ đọc RTGS/IPA+thanh nhập môn ẩn dần, v3, như hi/el), D-th-04
  (chấm thiếu/sai dấu thanh/nguyên âm — áp pl D-64 + hi D-hi-04). Sự kiện ngôn
  ngữ Thái thuần tuý → `native-review-th.md`. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
