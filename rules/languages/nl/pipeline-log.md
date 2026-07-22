# nl — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru. Baseline
  nl-NL (tự quyết, review-checklist D-nl-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr nl` →
  `orthography.data.json` (+ digraph {ij}). WikiPron `nld_latn_broad_filtered`
  (58535 cặp) → `grapheme-to-phoneme.data.json`. `ud nl` (Dutch-Alpino test) →
  `word-class.data.json`. Corpus: UD Dutch-Alpino + LassySmall train/dev/test
  → 30723 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (V2, de/het,
  động từ tách, giảm nhẹ, làm câm cuối từ). HONORIFIC not-applicable: tự áp
  tiền lệ es B-02. Chấm trema/dấu: tự áp tiền lệ es B-03.
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 58535 từ).** ch→[x] 18.69%
  (-isch→[s]), ij→[ɛ i̯] 11.30%, ui→[œ y̯] 2.92%, oe→[u] 0.41%, sch chứa[s]
  0.74%, aa→[aː] 0.17%, oo→[oː] 2.35%, ng→[ŋ] 9.01%, ge→[ɣ] 15.58%. Làm câm
  cuối từ d→[t] 0.59%, b→[p] 4.49%. Nâng `grapheme_to_phoneme` +
  `final_devoicing` + `vowel_length_spelling` → VALIDATED. **Kỷ luật dữ liệu:**
  (1) ij/ui bắn 100% do âm cách nhau dấu cách + dấu phi-âm-tiết ([ɛ i̯]/[œ y̯]
  = 2 token) → sửa regex → 11.30%/2.92%. (2) g phẳng bắn 21.98% (>ngưỡng) vì
  ng nuốt g thành [ŋ] + loanword g→[ɡ] → tách ng→[ŋ] + ge→[ɣ] riêng, không bỏ
  quy tắc hard-g.
- 2026-07-19 — **Bước 3 (corpus-check 30723 câu).** month-weekday-not-
  capitalized: **0.09%** (27/30723, tên riêng ngày lễ "Goede Vrijdag"/"Zwarte
  Vrijdag") — casing có bằng chứng corpus. Check khác dùng `assert custom`.
- 2026-07-19 — **Bước 4 (review-checklist).** 2 mục quyết định sản phẩm:
  D-nl-01 (baseline nl-NL, vòng 1), D-nl-02 (chấm trema/dấu + ij/y — tự áp
  tiền lệ es B-03). Sự kiện ngôn ngữ Hà Lan thuần tuý → `native-review-nl.md`.
  Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).

- 2026-07-19 — **RÀ LẠI 5 VÒNG (Phần B audit).** `casing` NÂNG DRAFT→VALIDATED: V3 corpus-check THẬT (month-weekday-not-capitalized 0.09%) trên corpus lớn; V1 cơ quan chuẩn + V2 giáo trình + V4/V5 đồng thuận tháng/thứ viết thường. answer_acceptance_nl vẫn DRAFT — nl hầu như không dùng dấu (chỉ diaeresis coördinatie + accent trọng âm hiếm); vấn đề answer chủ yếu là digraph IJ, chờ owner. Còn DRAFT cần người bản ngữ (ngữ pháp/paradigm/g2p ngoại lệ) — giữ nguyên, đã tra 5 vòng, cần người bản ngữ. Status ngôn ngữ KHÔNG đổi.
