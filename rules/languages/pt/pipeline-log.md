# pt — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it. Baseline pt-BR
  (tự quyết, xem review-checklist D-pt-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr pt` →
  `orthography.data.json` (á â ã à é ê í ó ô õ ú ç). WikiPron
  `por_latn_bz_broad_filtered` (187421 cặp) → `grapheme-to-phoneme.data.json`.
  `ud pt` (Portuguese-GSD test, Brazil) → `word-class.data.json`. Corpus: UD
  Portuguese-GSD + Bosque train/dev/test → 21377 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (co kết giới từ,
  ser/estar, você baseline, nguyên âm mũi). HONORIFIC not-applicable: tự áp
  tiền lệ es B-02. Chính sách dấu phụ: tự áp tiền lệ es B-03 (cảnh báo nhẹ).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 187421 từ).** 9 quy tắc sạch:
  nh→[ɲ] 0.40%, lh→[ʎ] 0.08%, ç→[s] 0.03%, ch→[ʃ] 0.99%, ti→[t͡ʃ] 0.39%,
  di→[d͡ʒ] 0.26%, l cuối→[w] 0.21%, ão→[ɐ̃ w̃] 0.08%, rr→[ʁ]/[x]/[h] 0.15%.
  Nâng `grapheme_to_phoneme` + `nasalization` → VALIDATED (high). **Phát hiện
  real-data:** ão bắn 100% lần đầu do âm WikiPron cách nhau dấu cách ([ɐ̃ w̃] =
  2 token) → sửa regex theo dữ liệu → 0.08%. Không giữ giả thuyết sai.
- 2026-07-19 — **Bước 3 (corpus-check 21377 câu).** month-weekday-not-
  capitalized: 1.64% (351/21377, phần lớn tên riêng/lễ hội "Sete de Setembro"
  hoặc quy ước cũ) — dưới ngưỡng 20%, casing có bằng chứng corpus. Check khác
  dùng `assert custom` (cần POS/parse).
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-pt-01 (baseline pt-BR, vòng 1 đồng thuận), D-pt-02 (chỉ dạy você, vòng 1
  đồng thuận), D-pt-03 (answer acceptance dấu — tự áp tiền lệ es B-03). Sự kiện
  ngôn ngữ Bồ thuần tuý → `native-review-pt.md`. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** `casing` NÂNG DRAFT→VALIDATED: V3 corpus-check THẬT (month-weekday-not-capitalized 1.64% (chính tả cũ trước Acordo 1990 hoa tháng; chuẩn nay viết thường)) trên corpus lớn; V1 cơ quan chuẩn + V2 giáo trình + V4/V5 đồng thuận tháng/thứ viết thường. answer_acceptance_pt vẫn DRAFT (chưa owner quyết) — pt dùng á/â/ã/ç: dấu trọng âm + til (nasal) + cedilha; KHÔNG có chữ cái riêng kiểu ñ; hướng B (cảnh báo nhẹ) như es/it hợp lý, chờ owner. Còn DRAFT cần người bản ngữ (ngữ pháp/paradigm/g2p ngoại lệ) — giữ nguyên, đã tra 5 vòng, cần người bản ngữ. Status ngôn ngữ KHÔNG đổi.
