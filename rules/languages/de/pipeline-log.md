# de — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only (learning,
  `roles: ["learning"]` trong catalog.json). 22 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp top-level key set với ja/en/es.
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr de` →
  `orthography.data.json` (xác nhận ä ö ü ß). WikiPron `deu_latn_broad_filtered`
  (57662 cặp) → `grapheme-to-phoneme.data.json`. `ud de` (German-GSD test) →
  `word-class.data.json`. Corpus Bước 3: UD German-GSD train+dev+test +
  UD_German-PUD → `tools/cache/corpus/de-sentences.txt`, 16589 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Chủ yếu kiến thức chuẩn phổ thông
  (viết hoa danh từ, 4 cách, V2, du/Sie) + Duden/Rechtschreibung snippet.
  HONORIFIC not-applicable: tự áp theo TIỀN LỆ es B-02 đã duyệt (pattern lặp
  lại, Phần B mục 2) — không đưa lại checklist.
- 2026-07-19 — **Bước 3 (g2p-check trên WikiPron 57662 từ).** 4 quy tắc chữ→âm
  đều sạch: sch→[ʃ] (6330 từ, 1.17% — ngoại lệ -chen sau s), w-→[v] (765,
  0.13%), z-→[ts] (810, 0.99% — ngoại lệ từ mượn; WikiPron lẫn t͡s/t s), v-→[f/v]
  (1354, 0.15%). Nâng `grapheme_to_phoneme` → VALIDATED.
- 2026-07-19 — **Bước 3 (corpus check 16589 câu).** 4 `.rules.json` dùng
  `assert custom` (cần POS/parse) → không assert văn-bản-level. Thử regex
  "phẩy trước dass": 10.05% bắn (một nửa `so dass` + lỗi phẩy thật corpus
  review web) → KHÔNG dùng làm regex enforced, giữ custom. Đây là phát hiện
  real-data-driven, không phải bịa.
- 2026-07-19 — **Bước 4 (review-checklist).** 2 mục quyết định sản phẩm:
  D-de-01 (baseline variety de-DE/AT/CH), D-de-02 (answer acceptance ss/ae/oe/ue).
  Sự kiện ngôn ngữ Đức thuần tuý (owner không đọc được tiếng Đức) → tách
  `native-review-de.md`, không đưa owner. Trạng thái dừng ở
  VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** KHÔNG có điểm DRAFT nào nâng
  được bằng DỮ LIỆU THẬT: `casing` (đặc trưng de: viết hoa MỌI danh từ) KHÔNG
  kiểm máy được không có POS-tagger (regex không phân biệt danh từ/tính từ sau
  mạo từ) — quy tắc chắc chắn đúng (Duden, phổ thông) nhưng thiếu bằng chứng
  corpus cơ học → giữ DRAFT trung thực, cần POS/native; `syllable_stress`
  WikiPron de không đánh trọng âm sạch → không g2p-verify; `punctuation_layout`
  (ngoặc „…") không có regex sạch; grapheme_to_phoneme ĐÃ VALIDATED (không đụng).
  Owner decisions D-de-01 (baseline de-DE) + D-de-02 (phương án A: chấp nhận
  normalize ss=ß, ae/oe/ue) tra lại 5 vòng — **XÁC NHẬN ĐÚNG, KHÔNG nghi ngờ**:
  KHÁC pl/da/el (C, thiếu dấu = sai) là ĐÚNG vì ä/ö/ü tiếng Đức là a/o/u+umlaut
  (KHÔNG phải chữ cái riêng của bảng chữ), và ae/oe/ue + ss là biến thể thay
  thế CHÍNH THỨC (Duden; Thụy Sĩ bỏ hẳn ß→ss; Müller=Mueller không đổi nghĩa)
  → A (chấp nhận normalize) hợp lý và nhất quán ngôn ngữ học. Còn DRAFT cần
  người bản ngữ/POS: casing, syllable_stress, gender/number, case_system (4
  cách — khó), verb_conjugation, separable_verbs, word_order (V2/khung động từ),
  punctuation_layout, umlaut_orthography, answer_acceptance_de (owner giữ DRAFT).
  Status ngôn ngữ KHÔNG đổi. (Không có thay đổi coverage — chỉ ghi nhận rà soát.)
