# el — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 24 hiện tượng trong
  `coverage.json` (nhiều hơn da: thêm `noun_case`, `accent_system` thay chỗ
  `stod`). Hệ chữ Hy Lạp → RẤT KHÓ → 5 vòng. Baseline el-GR (tự quyết,
  D-el-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr el` →
  `orthography.data.json` (24 chữ + tonos + dieresis + ς cuối). WikiPron
  `ell_grek_broad_filtered` (19133 cặp — bộ LỚN) →
  `grapheme-to-phoneme.data.json`. `ud el` (Greek-GDT test) →
  `word-class.data.json`. Corpus: UD Greek-GDT (train/dev/test) + Greek-GUD
  (train/test) → 4285 câu (DƯỚI 10000 — chỉ có 2 treebank; ghi rõ, trên sàn
  2000). [Ghi chú: lần fetch WikiPron đầu trả rỗng qua proxy → parse 0 pairs;
  chạy lại sau khi cache đúng → 19133.]
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (3 giống, 4
  cách, chia động từ theo ngôi/thể, monotonic, dấu hỏi Hy Lạp, εσύ/εσείς).
  HONORIFIC not-applicable: tự áp tiền lệ es B-02. Chấm thiếu tonos/ς: tự áp
  tiền lệ pl D-64. Không Greeklish: quyết định sản phẩm (D-el-03).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 19133 từ).** Phụ âm/nguyên
  âm/digraph cơ bản <1% (β 0.06%, δ 0.48%, θ 0.10%, φ 0.05%, χ 0.10%, ψ
  0.00%, ξ 0.62%, η 0.05%, αι 0.14%, ου 0.12%, τσ 0.74%, τζ 0.00%, ντ 1.94%)
  → `grapheme_to_phoneme` VALIDATED. Ngoại lệ CÓ QUY LUẬT: υ-trong-digraph
  (11.51% — ưu tiên digraph), synizesis ει/οι, μπ heterosyllabic — giữ rule,
  ghi rõ.
- 2026-07-19 — **Bước 3 (corpus-check 4285 câu).** monotonic (không polytonic
  U+1F00–1FFF): **0.00%**; dấu hỏi Hy Lạp `;` (không `?` Latin): **0.00%** →
  `punctuation_layout` + `accent_system` có bằng chứng corpus. Corpus dưới
  10k — check yếu hơn, ghi rõ.
- 2026-07-19 — **Bước 4 (review-checklist).** 5 mục quyết định sản phẩm (RẤT
  KHÓ → 5 vòng): D-el-01 (baseline el-GR), D-el-02 (monotonic), D-el-03
  (không Greeklish — dạy chữ Hy Lạp trực tiếp), D-el-04 (chấm thiếu tonos/ς),
  D-el-05 (dạy đối lập εσύ/εσείς). Sự kiện ngôn ngữ Hy Lạp thuần tuý →
  `native-review-el.md` (7 mục). Trạng thái dừng ở VALIDATED_NOT_YET_PROVEN,
  KHÔNG FROZEN (ADR-014).
