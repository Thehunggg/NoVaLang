# ms — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-20 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` (orthography check Latin/no-foreign vì casing
  hoa tháng/thứ như id, không lowercase; không dấu phụ). Baseline ms-MY (tự
  quyết, D-ms-01).
- 2026-07-20 — **Bước 1 (dataset import) HOÀN TẤT (một phần).** `cldr ms` →
  `orthography.data.json`. WikiPron `msa_latn_broad` (6672 cặp) →
  `grapheme-to-phoneme.data.json`. **UD_Malay KHÔNG tồn tại → KHÔNG có
  word-class dataset; KHÔNG có corpus tiếng Mã Lai thật.** Ghi rõ.
- 2026-07-20 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông + đối chiếu id
  (V5): không biến tố, phụ tố meN- biến âm mũi, trùng lặp số nhiều, loại từ,
  thì qua từ, SVO + bổ nghĩa sau danh từ, saya/anda + encik/puan. HONORIFIC
  not-applicable (es B-02). KHÔNG dấu phụ → answer_acceptance đơn giản.
- 2026-07-20 — **Bước 3 (g2p-check WikiPron 6672 từ).** ng→[ŋ] 0.95%, ny→[ɲ]
  0.00%, sy→[ʃ] 0.00%, c→[t͡ʃ] 1.06% — TẤT CẢ SẠCH → chính tả Mã Lai rất đều,
  `grapheme_to_phoneme` VALIDATED. 'e' [e]/[ə] + k cuối [ʔ] lexical. **corpus-check
  KHÔNG chạy được (0 câu corpus Mã Lai).** GHI RÕ — casing/ngữ pháp không kiểm
  được trên dữ liệu thật, dựa kiến thức + đối chiếu id, độ tin medium.
- 2026-07-20 — **Bước 4 (review-checklist).** 4 mục quyết định sản phẩm:
  D-ms-01 (baseline ms-MY, v1), D-ms-02 (saya/anda baseline lịch sự, v2),
  D-ms-03 (dạy bahasa baku chuẩn, v2, product), D-ms-04 (chấm chính tả đơn giản,
  không dấu phụ). Sự kiện ngôn ngữ Mã Lai thuần tuý → `native-review-ms.md`
  (đặc biệt quan trọng, không corpus). Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
