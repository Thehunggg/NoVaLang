# Pipeline log — en

Nhật ký `/build-language en`. Mỗi dòng: bước · ngày giờ · kết quả chính. Dùng để
phiên sau **resume** đúng chỗ. File này là nhật ký quy trình, không phải rule.

- **Bước 0 (inventory) · 2026-07-17 · 🛑 DỪNG chờ owner (đợt hỏi 1)** — Kiểm kê
  23 hiện tượng tiếng Anh → `coverage.json` (stage 0-inventory) + `sources.json`
  (7 nguồn: CLDR, UD English-EWT, WikiPron eng, S-EN-STYLE narrative DRAFT,
  S-CONTENT-NATURALNESS, S-BASE, Wikipedia). Điểm khác ja: en CÓ hoa/thường
  (casing), chính tả sâu (g2p bất quy tắc), reading-aid thường không cần nhưng
  cần quyết định vì chính tả sâu. Tier t1+t3 (catalog). Tự áp theo pattern ja:
  scope "đủ dùng tái dùng" (D-34), tất cả kỹ năng (D-35), owner tự review en
  (decisions.md). 2 câu hỏi đợt 1: reading-aid phát âm (Q1), giọng en-US/en-GB
  (Q2). Style-and-register.md DRAFT của Codex giữ nguyên làm narrative (allowlist).
- **Bước 0 trả lời · 2026-07-17 · Auto Mode (không phản hồi thủ công)** — Owner
  gõ lại `/build-language en` không kèm câu trả lời; theo Auto Mode, áp dụng
  phương án khuyến nghị đã báo trước: D-40 reading-aid = IPA ẩn mặc định + toggle,
  D-41 giọng = en-US. Ghi vào decisions.md, chạy tiếp không dừng.
- **Bước 1 (import dataset) · 2026-07-17 · XONG** — CLDR (charset) → orthography.data.json.
  UD English-EWT → word-class.data.json (17 nhãn UPOS). WikiPron
  eng_latn_us_broad_filtered (theo D-41 en-US) → grapheme-to-phoneme.data.json,
  99.645 cặp chữ→âm (kèm trọng âm ˈ). Validator PASS.
- **Bước 1.5 (lexicon đóng) · 2026-07-17** — Import 2 bảng từ vựng đóng máy đọc
  được nhưng đơn tác giả (không phải chuẩn cộng đồng như CLDR/UD): 50 động từ
  bất quy tắc tần suất cao (kemitchell/english-irregular-verbs, CC0) và 145 mục
  rút gọn (andrewbury/contractions). Ghi `confidence: medium` (không phải high)
  vì đơn nguồn — sẽ cross-check với Wikipedia ở Bước 2. Tool mới
  `import-dataset.mjs lexicon` (tái dùng cho ngôn ngữ sau cần bảng từ đóng).
  Tải corpus thật UD English-EWT train+dev+test → 16.622 câu (vượt mốc 10.000)
  cho Bước 3.
- **Bước 2 (derive) · 2026-07-17** — Khung 40 claim đóng
  `derive/claims-template.json`. 2 lượt derive độc lập song song: A = narrative
  nội bộ (S-EN-STYLE + naturalness rule + _base), D = Wikipedia qua WebSearch.
