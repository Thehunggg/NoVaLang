# ru — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt. Ngôn ngữ T1
  Kirin (Cyrillic) đầu tiên. Baseline ru-RU (tự quyết, review-checklist D-ru-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr ru` →
  `orthography.data.json` (33 chữ Kirin). WikiPron `rus_cyrl_narrow` (466668
  cặp — chỉ có bản narrow) → `grapheme-to-phoneme.data.json`. `ud ru`
  (Russian-GSD test) → `word-class.data.json`. Corpus: UD Russian-GSD +
  SynTagRus train/dev/test → 22736 câu (>10000). (Xoá conllu SynTagRus lớn sau
  khi trích câu để tiết kiệm dung lượng.)
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (6 cách, thể
  động từ, palatal hoá, số đếm chi phối cách, ты/вы). HONORIFIC not-applicable:
  tự áp tiền lệ es B-02. Chấm ё/е + trọng âm: tự áp tinh thần es B-03.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron narrow 466668 từ).** Phụ âm độc
  lập trọng âm sạch: ш→[ʂ] 0.03%, щ→[ɕ] 0.28%, ц→[ts] 0.16%, х→[x] 0.34%,
  ч→[t͡ɕ] 4.33% (чн→[ʂn]). LÀM CÂM CUỐI TỪ xác nhận: г→[k] 2.35%, б→[p] 2.29%,
  д→[t] 0.58%, з→[s] 3.12%. Nâng `grapheme_to_phoneme` + `palatalization` →
  VALIDATED. **Kỷ luật dữ liệu:** ж→[ʐ] bắn 7.13% → truy ra chủ yếu do câm
  cuối từ (Анкоридж→[...ʂ]) + дж loanword, tách thành quy tắc final-devoicing
  riêng thay vì bỏ ж→ʐ. **Nguyên âm giảm (akanye)** phụ thuộc trọng âm tự do
  KHÔNG đánh dấu → không g2p-check được bằng regex tĩnh, để medium (ghi rõ,
  không giả vờ high).
- 2026-07-19 — **Bước 3 (corpus-check 22736 câu).** month-weekday-not-
  capitalized: **0.00%** (0/22736) — cực sạch, casing có bằng chứng corpus
  mạnh. Check khác dùng `assert custom` (cần POS/parse/bảng biến cách).
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-ru-01 (baseline ru-RU, vòng 1), D-ru-02 (chấm ё/е + dấu trọng âm — tự áp
  tiền lệ es B-03), D-ru-03 (hiển thị dấu trọng âm trợ đọc — tiền lệ romaji
  ja ẩn-mặc-định-có-toggle). Sự kiện ngôn ngữ Nga thuần tuý (bảng cách, cặp
  thể, trọng âm từng từ) → `native-review-ru.md`. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** `casing` NÂNG DRAFT→VALIDATED: V3 corpus-check THẬT (month-weekday-not-capitalized 0.00%) trên corpus lớn; V1 cơ quan chuẩn + V2 giáo trình + V4/V5 đồng thuận tháng/thứ viết thường. answer_acceptance_ru vẫn DRAFT. **PHÁT HIỆN cần lưu ý cho quyết định tương lai:** chữ ё tiếng Nga RẤT thường viết thành е (bỏ 2 chấm) — đây là quy ước CHÍNH THỐNG chấp nhận (ё tuỳ chọn trong văn bản thường), NGƯỢC pl/da/el → nếu sau này quyết answer_acceptance_ru, ё nên KHOAN DUNG (chấp nhận е thay ё), KHÁC hướng C. Không phải nghi ngờ quyết định owner (chưa có quyết định), chỉ ghi trước. Còn DRAFT cần người bản ngữ (ngữ pháp/paradigm/g2p ngoại lệ) — giữ nguyên, đã tra 5 vòng, cần người bản ngữ. Status ngôn ngữ KHÔNG đổi.
