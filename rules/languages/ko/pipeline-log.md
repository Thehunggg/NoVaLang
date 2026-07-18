# ko — Pipeline log

Không có front-matter (log nội bộ, không phải rule/narrative — theo cùng quy
ước ja/en/pipeline-log.md, không nằm trong INV-2).

- 2026-07-18 — **Bước 0 (inventory) bắt đầu.** Tier = t1+t3 (learning + native,
  theo `rules/catalog.json`). 24 hiện tượng liệt kê trong `coverage.json`, dựa
  trên khuôn ja (phenomenon×rule_level/lexical_level×source×confidence×status)
  nhưng nội dung điều chỉnh theo cấu trúc thật tiếng Hàn (gộp
  `speech_level_endings` thay vì tách honorific/sentence-final-particle như
  ja, vì tiếng Hàn bắt buộc ngữ pháp — không tuỳ chọn ngữ dụng như ね/よ của
  ja; thêm `numeral_systems` riêng vì có 2 hệ số đếm song song mà ja không có
  ở dạng tương đương).
- 2026-07-18 — **Môi trường: phát hiện WebFetch/curl bị chặn 403 hầu hết
  domain ngoài** (chỉ `raw.githubusercontent.com` hoạt động). Ghi D-51 vào
  `rules/decisions.md`. Điều chỉnh Bước 2: dùng WebSearch (snippet, không
  toàn văn) thay cho subagent-đọc-nguyên-văn.
- 2026-07-18 — **Bước 1 (import dataset) HOÀN TẤT.** `cldr ko` ->
  `orthography.data.json` (exemplar characters đầy đủ khối âm tiết tổ hợp).
  `wikipron ko --url kor_hang_narrow_filtered.tsv` -> `grapheme-to-phoneme.data.json`
  (36146 cặp). `ud ko --url UD_Korean-GSD test split` -> `word-class.data.json`
  (14 nhãn UPOS, ADP=252). Corpus cho Bước 3: UD Korean-GSD train+dev+test +
  UD_Korean-PUD, trích `# text = ` -> `tools/cache/corpus/ko-sentences.txt`,
  7339 câu (không commit, đã gitignore). Cả 3 dataset đều `derived_by:dataset,
  confidence:high`, không vào hàng đợi review theo đúng quy ước Bước 1.
- 2026-07-18 — **`sources.json` Bước 0 hoàn tất** với 3 nguồn dataset (CLDR/
  WIKIPRON/UD) + 5 nguồn WebSearch/trained-knowledge (S-NIKL-ROMAN,
  S-WIKI-ROMAN, S-WIKI-SPEECHLEVELS, S-NIKL-SPACING, S-TRAINED-KNOWLEDGE),
  confidence trần medium/low cho nhóm sau theo D-51.
- 2026-07-18 — **Chốt chặn khuôn (yêu cầu đầu tiên của task).** Dựng
  `orthography.rules.json` đầu tiên, đối chiếu field-by-field với
  `ja/orthography.rules.json` (FROZEN) bằng script Node trực tiếp: top-level
  key set khớp 100% (`id,version,status,phenomenon,enforces,sources,
  derived_by,config,checks,fixtures`); `checks[].{id,description,assert,
  fixtures}` khớp; `checks[].assert.{type,pattern}` khớp; `fixtures.{pass,
  fail,_note}` khớp. Đối chiếu thêm cả 4 file `.rules.json` (orthography/
  phonology/grammar/pragmatics) với ja VÀ en: `checks[]` là optional theo
  `rules.schema.json` (ja tự bỏ nó ở phonology/grammar khi phenomenon không
  hợp regex-check — đúng, không phải lệch khuôn). KHÔNG phát hiện lệch khuôn
  cần sửa trước khi build tiếp — đủ điều kiện tiếp tục Bước 1-4 cho phần còn
  lại của tiếng Hàn.
- 2026-07-18 — **Bước 2 (derive) thực hiện với phương pháp điều chỉnh theo
  D-51.** Không dùng subagent-đọc-nguyên-văn-2-nguồn (WebFetch bị chặn).
  Thay bằng: (a) `S-TRAINED-KNOWLEDGE` cho sự kiện chuẩn phổ thông (cấu trúc
  Hangul, patchim, vowel harmony, 2 hệ số đếm...), (b) 4 truy vấn WebSearch
  độc lập cho các điểm cần cross-check thật (romanization NIKL, speech
  levels, spacing) — mỗi truy vấn diễn đạt khác nhau, kết quả đối chiếu thủ
  công (không dùng script diff tự động như derive.mjs vì snippet, không phải
  văn bản có cấu trúc cố định để máy diff). Kết quả: 2/2 WebSearch cho
  romanization khớp nhau (ㄱ/ㄷ/ㅂ->g/d/b trước nguyên âm, k/t/p trước phụ âm;
  어->eo, 으->eu, ㅢ->ui) -> confidence:medium. Speech-level taxonomy: 1
  WebSearch (Wikipedia + nhiều nguồn thứ cấp đồng thuận) -> confidence:medium.
  Spacing: nguồn đồng thuận về độ PHỨC TẠP/mơ hồ, không đưa ra quy tắc đóng
  -> confidence:low, giữ DRAFT, đưa vào review-checklist (A-06).
- 2026-07-18 — **14 file `.md` viết với front-matter thật theo
  `_schema/front-matter.schema.json`** (README/pipeline-log/change-log/
  review-checklist/native-review-ko không cần front-matter, cùng quy ước
  ja/en). Đây là file `.md` pipeline ĐẦU TIÊN trong repo có front-matter
  thật được validator kiểm — ja/en đều nằm trong `narrative-allowlist.json`
  (miễn kiểm, narrative có trước pipeline). `node tools/validate.mjs` xác
  nhận: `INV-2 front-matter: 14 file .md pipeline hợp lệ`.
- 2026-07-18 — **Bước 3 (corpus check) chạy `tools/corpus-check.mjs` trên
  `tools/cache/corpus/ko-sentences.txt` (7339 câu UD Korean-GSD/PUD).**
  Phát hiện 2 bug thật trong chính rule tôi vừa viết (đúng vai trò Bước 3 —
  "rule bị vi phạm hàng loạt = rule sai chỗ áp dụng"), SỬA NGAY (lỗi cú
  pháp/cấu trúc rõ ràng, không phải mơ hồ ngôn ngữ học — theo đúng mục 4 của
  yêu cầu "tự sửa được thì tự sửa"):
  1. `phonology.rules.json`: 2 check `regex_absent` kiểm "romanization/
     pronunciation field không chứa Hangul thô" bị áp NHẦM lên toàn bộ dòng
     corpus (câu tiếng Hàn thật, dĩ nhiên chứa Hangul) — 100%/100% vi phạm
     giả. SỬA: chuyển từ `checks[]` sang `config.field_scoped_constraints`
     (mô tả, không phải corpus-check) — cùng cách ja/phonology.rules.json đã
     chọn không có `checks[]` cho phenomenon không hợp kiểu kiểm text-toàn-
     dòng.
  2. `pragmatics.rules.json`: 2 check `regex_present` kiểm "câu phải kết
     thúc bằng đuôi 해요체/하십시오체" bị áp lên TOÀN corpus (văn tường
     thuật/bách khoa trung lập, không phải hội thoại trực tiếp) — 85.62%/
     95.95% vi phạm. Phát hiện thật: văn viết bách khoa tiếng Hàn dùng thể
     trần thuật trung lập (다/이다/했다...), không dùng 해요체/하십시오체 (2
     thể chỉ xuất hiện khi có người nói trực tiếp hướng người nghe cụ thể).
     SỬA: chuyển từ `checks[]` sang `config.ending_patterns` (mô tả, validator
     thật sau này chỉ áp khi có nhãn speech-level đã biết cho câu đó).
  Sau khi sửa, chạy lại: **3/3 check còn lại trong `checks[]` sạch**
  (`sentence-ends-with-verb-or-adjective-morphology`: 71/7339=0.97% "ok";
  `line-contains-hangul`: 0/7339=0.00%; `no-japanese-style-fullwidth-
  terminator`: 0/7339=0.00%).
- 2026-07-18 — **`g2p-check.mjs` chạy trên WikiPron `kor_hang_narrow_filtered`
  (36146 cặp).** Giả thuyết đầu tiên (`ㅋ`/`ㅌ`/`ㅍ` là jamo rời => áp dụng
  ~0 vì WikiPron dùng khối âm tiết tổ hợp, không phải jamo rời — bài học kỹ
  thuật thật, ghi lại để tránh lặp lại). Giả thuyết thứ hai đúng phạm vi:
  patchim ㅇ cuối âm tiết (강/공/영/용 làm âm tiết đầu) => phone chứa [ŋ] —
  552 từ áp dụng, **0/552 (0.00%) vi phạm**, xác nhận mạnh cho
  `phoneme_inventory`. 4/5 quy tắc biến âm còn lại của `pronunciation_contextual`
  CHƯA kiểm trực tiếp bằng g2p-check trong phiên này (cần xây implication
  phức tạp hơn dựa trên khối âm tiết tổ hợp) — giữ confidence:medium, không
  nâng.
- 2026-07-18 — **Cập nhật `coverage.json` sau Bước 3:** nâng `word_order`,
  `punctuation_layout`, `phoneme_inventory` (đã VALIDATED từ Bước 1, thêm
  bằng chứng Bước 3), `tts_audio_policy` lên `VALIDATED` (đủ điều kiện:
  confidence>=medium + fixtures + corpus check sạch). GIỮ NGUYÊN DRAFT cho
  `spacing_orthography`, `pronunciation_contextual`, `particles_josa`,
  `conjugation`, `speech_level_endings`, `forms_of_address`, `counters`,
  `register_taxonomy`, `romanization_rr`, `reading_aid_policy`,
  `answer_acceptance_ko`, `naturalness_translation` — chưa đủ bằng chứng
  hoặc phụ thuộc quyết định sản phẩm/native review chưa có. **KHÔNG có mục
  nào được gắn FROZEN** — đúng yêu cầu tường minh của Project Owner.
- 2026-07-18 — **Bước 4 (review) hoàn tất.** `review-checklist.md`: 3 mục
  (A-02 map register, A-03 reading-aid policy, A-06 spacing grading) — đều
  là quyết định sản phẩm, đọc <5 phút, dưới trần 8 mục. `native-review-ko.md`:
  3 mục (A-01 bảng romanization đầy đủ, A-04 bảng động từ bất quy tắc, A-05
  bảng counter) — sự kiện ngôn ngữ Hàn thuần tuý, owner không tự đánh giá
  được (owner tự đánh giá được vi/ja/en, không có ko) — checklist tiếng Anh
  đơn giản, tick-được, CHƯA gửi review.
- 2026-07-18 — **Bước 5: KHÔNG FREEZE bất kỳ hiện tượng nào**, theo yêu cầu
  tường minh của Project Owner (status trần `VALIDATED`, coverage._meta.status
  = `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`). `node tools/validate.mjs`:
  PASS 9/9 invariant chính, 1 cảnh báo (reading_aid_policy confidence:none —
  đúng, có chủ đích), 4 lỗi pre-existing của vi/zh punctuation_layout —
  KHÔNG liên quan tới task này, xác nhận baseline trước khi ko được thêm vào
  vẫn y hệt 4 lỗi này (validate.mjs baseline chụp trước khi bắt đầu task).
  **ko HOÀN TẤT sạch — sẵn sàng commit.**
