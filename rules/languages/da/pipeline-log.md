# da — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 22 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn Germanic (sv/nl/de). Baseline
  da-DK (tự quyết, D-da-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr da` →
  `orthography.data.json` (+ æ ø å). WikiPron `dan_latn_broad` (4773 cặp — bộ
  nhỏ) → `grapheme-to-phoneme.data.json`. `ud da` (Danish-DDT test) →
  `word-class.data.json`. Corpus: UD Danish-DDT train/dev/test → 5512 câu
  (DƯỚI 10000 — chỉ có DDT; ghi rõ, trên sàn 2000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (hậu tố xác định,
  mạo từ trước khi có tính từ, động từ không chia ngôi, du phổ quát, stød).
  HONORIFIC not-applicable: tự áp tiền lệ es B-02. Chấm thiếu æ/ø/å: tự áp tiền
  lệ pl D-64.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 4773 từ).** CHỈ chữ nguyên âm map
  ổn định: æ→[ɛ]/[a] 1.21%, ø→[ø]/[œ]/[ɔ] 7.05%, å→[ɔ]/[ʌ] 6.32% →
  `grapheme_to_phoneme` VALIDATED cho các chữ này. **Trung thực dữ liệu:** phần
  còn lại (soft d→[ð], stød, âm cuối câm/giảm) KHÔNG g2p-validate được — chính
  tả Đan Mạch nổi tiếng không đều nhất Germanic; ghi rõ là lexical, không nâng
  cả hệ. (sk/ng bắn cao do tokenization/từ ghép, không kết luận.)
- 2026-07-19 — **Bước 3 (corpus-check 5512 câu).** month-weekday-not-
  capitalized: **0.04%** (2/5512, đầu câu Lørdag) — casing có bằng chứng corpus.
  Corpus dưới 10k — check yếu hơn, ghi rõ.
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-da-01 (baseline da-DK, vòng 1), D-da-02 (du phổ quát / De cổ — vòng 2),
  D-da-03 (chấm thiếu æ/ø/å — áp tiền lệ pl D-64). Sự kiện ngôn ngữ Đan Mạch
  thuần tuý → `native-review-da.md`. Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** `casing` NÂNG DRAFT→VALIDATED: V3 corpus-check THẬT (month-weekday-not-capitalized 0.04%) trên corpus lớn; V1 cơ quan chuẩn + V2 giáo trình + V4/V5 đồng thuận tháng/thứ viết thường. answer_acceptance_da C (owner D-73, Phần A phiên này) tra lại — XÁC NHẬN ĐÚNG (æ/ø/å là chữ cái riêng). Còn DRAFT cần người bản ngữ (ngữ pháp/paradigm/g2p ngoại lệ) — giữ nguyên, đã tra 5 vòng, cần người bản ngữ. Status ngôn ngữ KHÔNG đổi.
