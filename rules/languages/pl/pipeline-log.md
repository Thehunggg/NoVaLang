# pl — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 25 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/nl. Ngôn ngữ
  Slav Latin-script phức tạp. Baseline pl-PL (tự quyết, review-checklist D-pl-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr pl` →
  `orthography.data.json` (ą ć ę ł ń ó ś ź ż). WikiPron `pol_latn_broad`
  (157042 cặp) → `grapheme-to-phoneme.data.json`. `ud pl` (Polish-PDB test) →
  `word-class.data.json`. Corpus: UD Polish-PDB + LFG train/dev/test → 35926
  câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (7 cách, thể,
  giống nam-người, Pan/Pani, làm mềm theo i). HONORIFIC not-applicable: tự áp
  tiền lệ es B-02. Chấm thiếu dấu: tự áp tiền lệ es B-03 (có chú thích 'dấu là
  chữ').
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 157042 từ).** 15 quy tắc sạch:
  sz→[ʂ] 0.05%, cz→[t͡ʂ] 0.08%, rz→[ʐ]/[ʂ] 3.69%, ch→[x] 0.74%, ł→[w] 2.32%,
  dz→[d͡z]/[d͡ʑ] 0.84%, ć→[t͡ɕ] 0.34%, ń→[ɲ] 0.00%, ś→[ɕ] 0.06%, ż→[ʐ]/[ʂ]
  0.00%, ą chứa[ɔ] 0.01%, ę chứa[ɛ] 0.00%; làm câm cuối từ b→[p] 3.07%, d→[t]
  0.41%, g→[k] 0.63%. Nâng `grapheme_to_phoneme` + `final_devoicing` +
  `consonant_palatalization` + `nasal_vowels` → VALIDATED. **Kỷ luật dữ liệu
  (VÒNG 4):** (1) rz phẳng bắn 61.27% (>ngưỡng) → rz LÀM CÂM [ʂ] sau vô thanh +
  cuối từ; thêm [ʂ] → 3.69%. (2) dz phẳng bắn 67.02% → 'dzi' LÀM MỀM [d͡ʑ];
  thêm → 0.84%. Sửa mô hình theo dữ liệu, không bỏ quy tắc.
- 2026-07-19 — **Bước 3 (corpus-check 35926 câu).** month-weekday-not-
  capitalized: **0.02%** (6/35926, họ người Sobota/Piątek + đầu câu) — casing
  có bằng chứng corpus. Check khác dùng `assert custom` (cần POS/bảng biến cách).
- 2026-07-19 — **Bước 4 (review-checklist).** 2 mục quyết định sản phẩm:
  D-pl-01 (baseline pl-PL, vòng 1), D-pl-02 (chấm thiếu dấu — dấu Ba Lan là
  CHỮ không phải accent, cân nhắc tới VÒNG 2 cách app xử lý, chọn cảnh báo nhẹ
  có chú thích). Sự kiện ngôn ngữ Ba Lan thuần tuý (7 cách, số từ, giống
  nam-người) → `native-review-pl.md`. Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** `casing` NÂNG DRAFT→VALIDATED: V3 corpus-check THẬT (month-weekday-not-capitalized 0.02%) trên corpus lớn; V1 cơ quan chuẩn + V2 giáo trình + V4/V5 đồng thuận tháng/thứ viết thường. answer_acceptance_pl C (owner D-64) tra lại — XÁC NHẬN ĐÚNG (ł/ó/ą/ę/ż... là chữ cái riêng, đổi âm/nghĩa). Còn DRAFT cần người bản ngữ (ngữ pháp/paradigm/g2p ngoại lệ) — giữ nguyên, đã tra 5 vòng, cần người bản ngữ. Status ngôn ngữ KHÔNG đổi.
