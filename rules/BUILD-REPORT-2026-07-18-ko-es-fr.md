# Báo cáo tổng hợp — Build rule ko / es / fr (2026-07-18)

Không có front-matter (báo cáo tổng hợp, không phải rule/narrative theo
`_schema/` — cùng cách xử lý các file dạng report/log khác trong `rules/`).

Thực hiện theo pipeline `/build-language` (6 bước: inventory → dataset →
derive → corpus check → review → freeze), tuần tự **ko → es → fr**, mỗi
ngôn ngữ hoàn tất sạch (tự-kiểm xong, self-test pass, commit riêng) trước
khi sang ngôn ngữ tiếp theo. Cả 3 ngôn ngữ đều **hoàn tất, không có ngôn
ngữ nào bị dừng vì bế tắc**. Trạng thái cuối cùng của cả 3:
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT` — **tuyệt đối không FROZEN**,
đúng yêu cầu tường minh.

Commit: `a5bb21a` (ko), `328cbd1` (es), `84cfca9` (fr), báo cáo này là commit
thứ 4/cuối cùng.

---

## 0. Vướng mắc hạ tầng ảnh hưởng CẢ 3 ngôn ngữ — đã ghi D-51

Ngay từ đầu (trước khi build ko), phát hiện: môi trường phiên này **chặn
403 hầu hết truy cập web ngoài** qua proxy tổ chức (`WebFetch`/`curl` đều
bị chặn tới `korean.go.kr`, `rae.es`, `wikipedia.org`, `unicode.org`,
`archive.org`...), chỉ `raw.githubusercontent.com` (dataset CLDR/UD/
WikiPron) hoạt động — xác nhận qua `curl http://127.0.0.1:38867/__agentproxy/status`,
đúng theo `/root/.ccr/README.md`: đây là **policy denial của tổ chức,
không phải lỗi kỹ thuật sửa được**.

**Hệ quả:** không thể thực hiện đúng nguyên văn Bước 2 (subagent đọc
nguyên văn 2 tài liệu độc lập). Đã điều chỉnh: dùng `WebSearch` (vẫn hoạt
động, trả snippet + URL thật) chạy nhiều truy vấn độc lập cho cùng một hiện
tượng, cộng kiến thức ngôn ngữ học đã huấn luyện sẵn cho sự kiện chuẩn phổ
thông — `confidence` trần ở `medium`, không bao giờ `high`, cho mọi mục chỉ
có nguồn này. Ghi đầy đủ trong `rules/decisions.md` mục 11 (D-51).

---

## 1. Tiếng Hàn (ko)

**Nguồn đã dùng:**
- Dataset: CLDR (charset), WikiPron `kor_hang_narrow_filtered` (36146 cặp
  âm), UD Korean-GSD (word class) + UD Korean-GSD/PUD (corpus 7339 câu).
- WebSearch: Wikipedia (Korean speech levels — 7 mức cổ điển, 3 mức hiện
  đại), NIKL Revised Romanization (2000), tổng hợp về độ phức tạp spacing
  (띄어쓰기).
- Trained-knowledge: cấu trúc khối âm tiết Hangul, patchim, vowel harmony,
  2 hệ số đếm.

**Kết quả self-test:**
- `node tools/validate.mjs`: PASS, 0 lỗi mới (4 lỗi pre-existing vi/zh
  không liên quan).
- Corpus check (7339 câu thật): 3/3 check trong `checks[]` sạch sau khi
  **tự sửa 2 bug thật** — 2 check ban đầu bị áp sai phạm vi (kiểm field
  romanization/pronunciation lên toàn corpus thay vì lên trường cụ thể;
  kiểm đuôi câu 해요체/하십시오체 lên văn tường thuật trung lập thay vì hội
  thoại trực tiếp).
- g2p-check: patchim ㅇ → [ŋ] xác nhận sạch 100% trên 552 từ thật.

**GIẢ ĐỊNH CẦN DUYỆT** (`review-checklist.md`, owner — không cần biết
tiếng Hàn):
- A-02: map register taxonomy 6-mức vào 해요체/하십시오체/해체.
- A-03: có cung cấp romanization reading-aid cho người mới hay không.
- A-06: chính sách chấm điểm khi lệch spacing (띄어쓰기).

**Cần người bản ngữ Hàn** (`native-review-ko.md`, CHƯA gửi):
- A-01: bảng romanization RR đầy đủ 19×21×27.
- A-04: bảng động từ 5 lớp bất quy tắc.
- A-05: bảng counter/lượng từ.

**CẦN GIẢI QUYẾT:** không có mục nào dừng hẳn — mọi bug tìm được đều tự sửa
được (lỗi cấu trúc rõ ràng, không phải mơ hồ ngôn ngữ học).

---

## 2. Tiếng Tây Ban Nha (es)

**Nguồn đã dùng:**
- Dataset: CLDR, WikiPron `spa_latn_la_broad_filtered` (132249 từ — bản
  Latin America, **DUY NHẤT có sẵn** trên WikiPron cho es, đã thử
  es/mx/ar/co/ni không tồn tại), UD Spanish-GSD (word class + corpus
  17013 câu, nguồn chủ yếu báo Tây Ban Nha).
- WebSearch: 4 nguồn độc lập cho quy tắc trọng âm/tilde (SpanishDict,
  StudySpanish, Berges Institute, Orbis Latinus — đồng thuận hoàn toàn),
  RAE Diccionario panhispánico de dudas (voseo/seseo).
- Trained-knowledge: ser/estar, giống ngữ pháp, chia động từ.

**Kết quả self-test:**
- `node tools/validate.mjs`: PASS, 0 lỗi mới. Tìm và sửa 1 lỗi khuôn thật:
  phenomenon đặt tên `pronouns_and_address` không khớp tên chuẩn
  `forms_of_address` mà `exercise-phenomena.map.json` dùng mặc định — đổi
  tên lại.
- Corpus check (17013 câu thật): 1 check thật sạch (0.60% vi phạm phong
  cách, "ok") — không có check nào bị áp sai phạm vi (rút kinh nghiệm từ ko).
- g2p-check: 3/3 giả thuyết sạch 100% (ñ→[ɲ] 2579 từ, qu→[k] 564 từ,
  z→[s] 651 từ — **xác nhận trực tiếp dataset dùng SESEO**, bằng chứng thật
  cho GIẢ ĐỊNH B-01, không phải suy đoán).

**GIẢ ĐỊNH CẦN DUYỆT** (`review-checklist.md`):
- **B-01 (QUAN TRỌNG NHẤT):** baseline vùng miền — tú+ustedes (seseo) hay
  Peninsular đầy đủ. Ảnh hưởng gần như toàn bộ `style-and-register.md` +
  TTS locale.
- B-02: xử lý HONORIFIC-modifier khi es không có hệ tương đương ja/ko.
- B-03: chính sách chấm điểm khi thiếu/sai tilde.

**Cần người bản ngữ Tây Ban Nha** (`native-review-es.md`, CHƯA gửi):
- B-04: tilde diacrítica đầy đủ + chính sách RAE 2010 (sólo/solo).
- B-05: ngoại lệ giống danh từ.
- B-06: bảng chia động từ bất quy tắc (ser/estar/ir/tener/hacer).
- B-07: mức độ chấp nhận leísmo/laísmo.

**CẦN GIẢI QUYẾT:** không có.

---

## 3. Tiếng Pháp (fr)

**Nguồn đã dùng:**
- Dataset: CLDR, WikiPron `fra_latn_broad_filtered` (97301 từ), UD
  French-GSD (word class + corpus 17342 câu) — **cả 2 dataset đúng ngay
  lần thử URL đầu tiên**, thuận lợi nhất trong 3 ngôn ngữ.
- WebSearch: 4 nguồn độc lập cho liaison (Master Your French, Comme une
  Française, Lawless French, Français interactif/UT Austin — đồng thuận
  hoàn toàn), 3 nguồn cho tu/vous (Vaia, Talk in French, Regina Coeli).
- Trained-knowledge: elision, giống ngữ pháp, chia động từ, y/en.

**Kết quả self-test:**
- `node tools/validate.mjs`: PASS, 0 lỗi mới.
- Corpus check (17342 câu thật): **tìm và tự sửa 3 bug thật, nhiều nhất
  trong 3 ngôn ngữ**, gồm 1 **bug kỹ thuật tổng quát**: JS `\b` (word
  boundary) không coi ký tự Latin có dấu (é/è/ê/à...) là word-char (JS `\w`
  luôn ASCII-only, flag `u` của `corpus-check.mjs` không sửa việc này) →
  `\bme` khớp nhầm bên trong "même". Đã kiểm tra chéo: **không ảnh hưởng
  es** (check của es dùng lookbehind khác, đã re-run xác nhận 102/17013 y
  hệt trước). Sau khi sửa cả 3 bug: 141/17342 (0.81%) residual, xác nhận là
  exception lexical thật (proper noun, bán-nguyên-âm).
- g2p-check: `on$→[ɔ̃]` sạch 98.10%; nhưng `an$→[ɑ̃]` chỉ 79.90% — **công cụ
  tự gắn nhãn "RULE NGHI NGỜ SAI"**. Đọc tay xác nhận toàn bộ vi phạm là
  tên riêng ngoại lai (Batman, Bowman, Brian, Dylan, Erdogan) lẫn trong
  WikiPron — không phải quy tắc tiếng Pháp sai, KHÔNG nâng confidence.

**GIẢ ĐỊNH CẦN DUYỆT** (`review-checklist.md`):
- C-01: phân biệt FORMAL vs NATURAL_NEUTRAL_POLITE khi cả hai cùng dùng
  "vous" (fr không có đại từ riêng như usted của es).
- C-02: chính sách chấm dấu phụ/elision.
- C-03: dialect baseline Pháp/Québécois (nhẹ hơn B-01 của es — không ảnh
  hưởng ngữ pháp cốt lõi).

**Cần người bản ngữ Pháp** (`native-review-fr.md`, CHƯA gửi):
- C-04: ngoại lệ giống danh từ.
- C-05: bảng chia động từ bất quy tắc (être/avoir/aller/faire).
- C-06: lexicon h aspiré/h muet + bán-nguyên-âm.

**CẦN GIẢI QUYẾT:**
- Kỹ thuật (không phải ngôn ngữ học, đã tự sửa trong phạm vi fr). Đã kiểm
  tra chéo toàn bộ `rules/languages/{en,vi}/*.rules.json` bằng grep tìm
  `\b` cạnh literal có dấu — **KHÔNG tìm thấy pattern nào dính bug này**
  (en không có ký tự có dấu bản địa; vi's checks không dùng `\b` cạnh ký
  tự có dấu). Cùng với `es` đã re-run xác nhận không đổi kết quả — **bug
  này được xác nhận chỉ ảnh hưởng fr trong toàn bộ repo hiện tại, đã sửa
  xong, không còn mục nào cần rà thêm.**
- Nasal vowel g2p-check của fr cần lọc tên riêng khỏi WikiPron trước khi có
  thể nâng confidence — việc lọc cụ thể (danh sách proper noun) chưa làm,
  để dành cho lần build sau hoặc khi có thời gian.

---

## 4. Đề xuất sửa file lệnh (theo Phần H mục 5 của `/build-language`)

Phát hiện trong lúc build fr, đáng đưa vào `tools/README.md` (không tự sửa
file lệnh theo đúng quy định Phần I):

> **Cảnh báo kỹ thuật cho mọi ngôn ngữ dùng chữ Latin có dấu (es/fr/vi và
> tương lai):** khi viết `checks[].assert.pattern` dạng `regex_absent`/
> `regex_present` cho `corpus-check.mjs`, **không dùng `\b` (word boundary)
> ngay sát vị trí có thể có ký tự có dấu** — JS `\w`/`\b` luôn chỉ nhận
> diện ASCII `[A-Za-z0-9_]`, flag `u` không mở rộng việc này. Ký tự có dấu
> (é/è/ê/à/ñ/ç...) bị coi là "không phải word char", tạo `\b` giả ngay
> trước/sau nó, gây khớp nhầm bên trong từ (vd `\bme` khớp nhầm trong
> "même"). Dùng anchor tường minh thay thế, ví dụ `(?:^|[\s(«"'])` cho đầu
> từ, hoặc `(?=[\s.,;:!?]|$)` cho cuối từ.

---

## 5. Tổng kết

| Ngôn ngữ | Hiện tượng | Trạng thái | Bug tìm+sửa (Bước 3) | Giả định owner | Giả định native |
|---|---|---|---|---|---|
| ko | 24 | VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT | 2 | 3 (A-02/03/06) | 3 (A-01/04/05) |
| es | 22 | VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT | 1 (khuôn) | 3 (B-01/02/03) | 4 (B-04..07) |
| fr | 22 | VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT | 3 (1 kỹ thuật tổng quát) | 3 (C-01/02/03) | 3 (C-04/05/06) |

**Không có ngôn ngữ nào FROZEN.** Không đụng `PLAYABLE_LANGUAGES`,
`language_options.json`, `generate-curriculum.mjs`, hay
`rules/languages/{ja,en,vi,zh}/**` ở bất kỳ bước nào — xác nhận bằng
`git status --short` trước mỗi commit (ghi trong từng commit message).

**Việc tiếp theo cần Project Owner:**
1. Đọc + trả lời 3 file `review-checklist.md` (ko/es/fr), mỗi file <5 phút.
2. Gửi 3 file `native-review-*.md` cho người bản ngữ tương ứng nếu có.
3. Quyết định có chạy lại Bước 2 khi môi trường cho WebFetch đầy đủ trở lại
   (để nâng các mục `confidence:medium`-do-WebSearch lên chuẩn "2 nguồn độc
   lập đọc nguyên văn" — điều kiện cần cho FROZEN sau này).
4. Rà `tools/README.md` theo đề xuất mục 4 ở trên.
