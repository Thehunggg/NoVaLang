# fr — Pipeline log

Không có front-matter (log nội bộ, cùng quy ước ja/en/ko/es/pipeline-log.md).

- 2026-07-18 — **Bước 0 (inventory).** Tier = t1-only (learning). 22 hiện
  tượng trong `coverage.json`. Không lặp lại chốt chặn khuôn chi tiết (đã
  xác nhận ở ko) — kiểm nhanh 4 file `.rules.json` khớp top-level key set.
- 2026-07-18 — **Bước 1 (dataset import) HOÀN TẤT, thuận lợi nhất trong 3
  ngôn ngữ** — cả `fra_latn_broad_filtered.tsv` (WikiPron, 97301 từ) và
  `UD_French-GSD` đều tồn tại ngay lần thử đầu (khác ko/es phải dò nhiều
  tên file). Corpus Bước 3: UD French-GSD train+dev+test + UD_French-PUD ->
  17342 câu (vượt mốc 10000).
- 2026-07-18 — **Bước 2 (derive) — 2 truy vấn WebSearch độc lập.** (1) Quy
  tắc liaison: 4 nguồn (Master Your French, Comme une Française, Lawless
  French, Français interactif/UT Austin) đồng thuận hoàn toàn về hệ 3 loại
  obligatoire/interdite/facultative. (2) tu/vous: 3 nguồn (Vaia, Talk in
  French, Regina Coeli) đồng thuận — hệ 2 chiều ĐƠN GIẢN hơn hệ xưng hô
  es (không phân mảnh vùng miền ở mức ngữ pháp cốt lõi).
- 2026-07-18 — **Bước 3 (corpus check) — 3 bug thật tìm và sửa, nhiều nhất
  trong 3 ngôn ngữ đã build:**
  1. Check `elision-applied-before-vowel` coi 'h' là trigger elision tự
     động -> 740/17342 (4.27%) vi phạm. Đọc tay: TOÀN BỘ là **h aspiré**
     hợp lệ (de haute, de hauteur, de houx...) — h tiếng Pháp có 2 loại
     LEXICAL không phân biệt được bằng chính tả/phát âm đơn thuần. Sửa:
     loại h khỏi trigger set.
  2. Sau sửa (1), còn 582/17342 (3.36%) — điều tra bằng grep trực tiếp
     phát hiện **bug kỹ thuật thật trong chính regex engine**: JS `\b`
     (word boundary) coi ký tự có dấu (é/è/ê/à...) KHÔNG phải word-char
     (JS `\w` luôn ASCII-only, flag `u` của `corpus-check.mjs` không sửa
     việc này) — nên `\bme` khớp NHẦM bên trong "même" (dấu ê không phải
     `\w` -> `\b` kích hoạt sai ngay trước "me"). Grep thủ công tìm thấy
     46 lần "me année" (từ "même année") và các trường hợp tương tự khác
     (ce/ne/le/te/de...). Sửa: thay `\b` đầu pattern bằng
     `(?:^|[\s(«"'])` (khoảng trắng/dấu mở ngoặc, không phụ thuộc `\w`)
     -> còn 141/17342 (0.81%). **Đây là phát hiện kỹ thuật tổng quát, có
     thể ảnh hưởng bất kỳ ngôn ngữ Latin có dấu nào dùng `\b` trong
     `checks[].assert.pattern` — cần rà lại es/en nếu dùng `\b` gần ký tự
     có dấu (es tự kiểm: `Miércoles` trong check `month-weekday-not-
     capitalized` CÓ dùng `\b` cạnh ký tự é — chưa xác nhận lại, xem
     GIẢ ĐỊNH C-08, đề xuất sửa cho `tools/README.md` ở báo cáo cuối).**
  3. 141 vi phạm còn lại đọc tay: 2 lớp lexical thật — proper
     noun/tên nước ngoài (de Yesa, de Ibrahim — quy ước biên tập không
     elide tên riêng ngoại lai) và bán-nguyên-âm (que oui, không phải
     qu'oui — "oui" phát âm /w/). Dừng ở 0.81%, dưới ngưỡng rule-sai, ghi
     nhận là exception lexical cần bảng riêng (GIẢ ĐỊNH C-06).
- 2026-07-18 — **`g2p-check.mjs` trên WikiPron (97301 từ).** `on$->[ɔ̃]`:
  2843 áp dụng, 54 vi phạm (1.90%, "ok"). `an$->[ɑ̃]`: 413 áp dụng, **83 vi
  phạm (20.10%, RULE NGHI NGỜ SAI THEO CHÍNH CÔNG CỤ)** — đọc tay TOÀN BỘ
  vi phạm là tên riêng/từ mượn tiếng Anh-Ireland-Turkish (Batman, Bowman,
  Brian, Dylan, Erdogan) giữ nguyên cách đọc gốc, không phải quy tắc tiếng
  Pháp bản địa sai — WikiPron trộn tên riêng ngoại lai vào từ điển. KHÔNG
  nâng `nasal_vowels` lên VALIDATED — giữ DRAFT, ghi rõ cần lọc tên riêng
  trước khi coi là kiểm chứng đầy đủ (GIẢ ĐỊNH C-07).
