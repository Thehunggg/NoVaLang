# sv — Pipeline log

Không có front-matter (log nội bộ).

- 2026-07-19 — **Bước 0 (inventory).** Tier = t1-only. 23 hiện tượng trong
  `coverage.json`. 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/nl/pl.
  Baseline sv-SE (tự quyết, review-checklist D-sv-01).
- 2026-07-19 — **Bước 1 (dataset import) HOÀN TẤT.** `cldr sv` →
  `orthography.data.json` (+ å ä ö). WikiPron `swe_latn_broad` (5856 cặp — bộ
  nhỏ) → `grapheme-to-phoneme.data.json`. `ud sv` (Swedish-Talbanken test) →
  `word-class.data.json`. Corpus: UD Swedish-Talbanken + LinES train/dev/test
  → 11734 câu (>10000).
- 2026-07-19 — **Bước 2 (derive).** Kiến thức chuẩn phổ thông (hậu tố xác định,
  V2, động từ không chia ngôi, du-reformen, mềm hoá âm đầu). HONORIFIC
  not-applicable: tự áp tiền lệ es B-02. Chấm thiếu å/ä/ö: tự áp tiền lệ pl
  D-64 (dấu là chữ → thiếu = sai).
- 2026-07-19 — **Bước 3 (g2p-check WikiPron 5856 từ).** sj→[ɧ] 4.08%, tj→[ɕ]
  7.25%, ä→[ɛ] 1.65%, ö→[ø] 2.49%, å→[oː] 1.25% → `grapheme_to_phoneme`
  VALIDATED. **Kỷ luật dữ liệu:** mềm hoá âm đầu ^k[eiyäö]→^ɕ bắn 48%, ^g→^j
  42%, ^sk→^ɧ 35% — KHÔNG lên VALIDATED: (1) dấu pitch ¹/² đầu chuỗi chặn
  ^anchor, (2) dataset nặng từ mượn giữ cứng (keff/gebit/gem/skeptisk) hoặc
  g→[ɧ] (Pháp). Quy tắc đúng cho từ bản ngữ nhưng hạn chế theo nguyên từ →
  giữ medium, ghi rõ. rs→[ʂ] bắn 64% → không phổ quát trong dataset broad, để
  vùng/lexical.
- 2026-07-19 — **Bước 3 (corpus-check 11734 câu).** month-weekday-not-
  capitalized: **0.00%** — cực sạch, casing có bằng chứng corpus. Check khác
  dùng `assert custom`.
- 2026-07-19 — **Bước 4 (review-checklist).** 3 mục quyết định sản phẩm:
  D-sv-01 (baseline sv-SE, vòng 1), D-sv-02 (chấm thiếu å/ä/ö — áp tiền lệ pl
  D-64, thiếu = sai), D-sv-03 (du phổ quát / ni cổ — vòng 1-2, du-reformen).
  Sự kiện ngôn ngữ Thụy Điển thuần tuý → `native-review-sv.md`. Trạng thái
  dừng ở VALIDATED_NOT_YET_PROVEN, KHÔNG FROZEN (ADR-014).
