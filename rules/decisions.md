# NovaLang — Sổ quyết định rule ngôn ngữ

Nơi ghi mọi quyết định đã chốt cho pipeline `/build-language`, để lần build sau
không hỏi lại. Mỗi mục: **ID · ngày · quyết định · phạm vi · nguồn**.

**Phạm vi (scope):** `ALL` = áp cho mọi ngôn ngữ · `<mã>` = riêng ngôn ngữ đó.
**Nguồn (source):** `owner` = Project Owner chốt trực tiếp · `legacy` = trích từ
`rules/_legacy/**` (trí nhớ AI cũ — KHÔNG phải sự thật, repo + sổ này thắng) ·
`derived` = suy ra từ repo/dataset · `ADR` = quyết định kiến trúc đã duyệt.

> Thứ tự ưu tiên khi mâu thuẫn: Frozen spec → ADR đã duyệt → shared contract →
> `ACTIVE_TASK.md` → sổ này → source/test → README. File legacy KHÔNG override
> repo hay sổ này.

---

## 0. Nguyên tắc dạy tổng quát (đọc trước mọi mục bên dưới — áp cho MỌI ngôn ngữ)

- **⭐ D-50 · 2026-07-18 · owner · ALL — NGUYÊN TẮC DẠY CỦA NOVALANG** — Người
  mới học phải bớt khổ nhất có thể, độ khó nâng dần theo level. Khi có nhiều
  cách dạy đều đúng về ngôn ngữ, luôn chọn cách nhẹ nhàng hơn cho người mới,
  rồi gỡ dần trợ giúp ở level cao.

  **Hệ quả áp dụng** (suy ra từ nguyên tắc, không cần hỏi owner lại):
  - Trợ giúp đọc (romaji, phiên âm, furigana) có ở level thấp, gỡ dần lên cao
    — khớp D-11 bản (ii) đã chốt (A0–B1 ẩn mặc định + toggle; B2–C2 không toggle).
  - Cho gõ chữ Latin/romanization ở A0–B1 nếu hệ chữ đó khó gõ — khớp G-02.
    *(Đã giải quyết 2026-07-18: xem mục 0.1 bên dưới, G-02 — tại thời điểm ghi
    D-50 chưa có `G-02` nào khác trong repo để đối chiếu; G-02 sau đó được ghi
    chính là hệ quả này, cụ thể hoá thêm bằng yêu cầu viết SPEC chuẩn hoá
    romaji thay vì liệt kê tay từng biến thể.)*
  - Chấm đáp án khoan dung ở level thấp, chặt dần lên cao.
  - Nghi ngờ giữa hai cách đều đúng ngôn ngữ học → chọn cách người mới đỡ khổ hơn.

  **Cơ chế áp dụng — quan trọng cho mọi lần build sau:** từ D-50 trở đi, bất kỳ
  câu hỏi checklist Bước 4 nào **suy ra được** từ nguyên tắc này → agent **tự
  quyết, không hỏi owner** — chỉ báo một dòng dạng "đã áp nguyên tắc dạy, chọn
  X". Chỉ hỏi owner khi (a) nguyên tắc này KHÔNG đủ để quyết (vd không rõ
  level nào là "thấp"/"cao" cho hiện tượng cụ thể, hoặc không phương án nào rõ
  ràng "nhẹ nhàng hơn"), hoặc (b) hai nguyên tắc/quyết định đã chốt mâu thuẫn
  nhau (xử lý như D-11 trước khi được giải quyết — đưa vào checklist, không tự
  chọn bên nào).

---

## 1. Catalog & phạm vi sản phẩm

- **D-01 · 2026-07-17 · owner · ALL** — Catalog mục tiêu build rule = **60 ngôn
  ngữ** (thay quyết định cũ "20 learning languages"). Phân biệt: *build rule* cho
  60 ≠ *playable*. Xem `rules/catalog.json`.
- **D-02 · legacy (còn hiệu lực) · ALL** — Hiện chỉ **en + ja** playable (có bài
  học thật). Các ngôn ngữ khác: `preview` / comingSoon.
- **D-03 · legacy (còn hiệu lực) · ALL** — Scope lesson khóa ở **Daily Life →
  Greetings → Unit 1** cho en+ja trước; không mở rộng tới khi owner review.
  *(Lệnh `/build-language` KHÔNG đụng lesson — chỉ ghi để không quên ràng buộc.)*
- **D-04 · legacy · ALL** — Ngôn ngữ native đã đặt tên: **vi, en, ja, ko, zh**.

## 2. Mô hình vai trò ngôn ngữ

- **D-05 · legacy · ALL** — Ba trục: `learningLanguageCode` (nội dung học) /
  `nativeLanguageCode` (nghĩa, giải thích, hint, đáp án lựa chọn, feedback) /
  `uiLanguageCode` (chrome giao diện). **Không silent fallback chéo ngôn ngữ**
  (native=ja thì không được lòi tiếng Việt/Anh).
- **D-06 · legacy · ALL** — Lưu tách biệt `displayText` (UI) / `canonicalText`
  (máy chấm) / `audioText` (TTS đọc). Không dùng display làm answer key.

## 3. Hệ trình độ & cây học

- **D-07 · legacy · ALL** — Level: A0 / A1 / A2 / B1 / B2 / C1 / C2. Cây học:
  Language → Level → Niche/Focus → Unit → Lesson → Exercises. Golden Lesson =
  level A0.

## 4. Reading aid (furigana / romaji)

- **D-08 · legacy · ja** — Furigana mặc định chỉ hiện cho kanji người học **chưa
  học / chưa thành thạo**; người học có thể bật hiện toàn bộ.
- **D-09 · legacy · ja** — Reading và romaji là **hai toggle độc lập**: chọn được
  reading-only / romaji-only / cả hai / không cái nào.
- **D-10 · legacy · ja** — Q14 romaji: `HIDDEN_BY_DEFAULT / USER_TOGGLE_AVAILABLE`;
  A0–B1 ẩn mặc định + bật được; B2–C2 không toggle.
- **✅ D-11 · 2026-07-17 · owner · ja · ĐÃ GIẢI QUYẾT** — Chốt **bản (ii)**:
  A0–B1 **ẩn romaji mặc định** có toggle bật / B2–C2 không toggle. Bản (i)
  (Basic hiện mặc định) bị loại. Nhất quán với D-10 và fail-safe D-12. (Trước đó
  legacy có hai bản ngược nhau; Project Owner chọn (ii) ở review Bước 4.)
- **D-12 · legacy · ALL** — Level unknown/missing → **fail safe**: không romaji,
  không toggle, ghi diagnostic, **không tự suy ra level**.

## 5. Chấm đáp án

- **D-13 · legacy · ja** — Bài không kiểm kanji: chấp nhận kana **hoặc** kanji;
  bài kiểm kanji có thể đòi kanji theo exact-form objective.
- **D-14 · legacy · ALL** — Chuẩn hóa & bỏ qua khác biệt nhỏ về dấu câu /
  khoảng trắng / full-width vs half-width; exact-form exercise có thể đòi chính xác.
- **D-15 · legacy · ALL** — Single-choice: đúng một đáp án, không option trùng,
  nhiễu không được thoả luật câu.
- **D-16 · legacy · ALL** — Match-pairs: kiểm mọi cặp; một cặp sai → sai; không
  hiện "Chính xác" nếu chưa đủ đúng; không trộn item kana-only với item nghĩa
  từ vựng trong cùng bài match.
- **D-17 · legacy · ALL** — Chỉ tự động chấp nhận biến thể nghĩa **đã được duyệt**;
  open answer chưa chắc chắn phải escalate/review.
- **D-18 · legacy · ALL** — Typo nhỏ: **không** PASS; phân loại là typo; phản hồi nhẹ.
- **D-19 · legacy · ALL** — Sai register: tính sai chỉ khi register là mục tiêu
  bài học hoặc làm câu không phù hợp tình huống; còn lại chỉ cảnh báo.

## 6. Audio / TTS

- **D-20 · legacy · ALL** — Ưu tiên audio: (1) audio đã duyệt → (2) TTS đúng
  locale → (3) báo lỗi rõ. Không fallback âm thầm sang voice/locale khác.
- **D-21 · legacy · ALL (tốc độ xác nhận cho ja)** — Replay không giới hạn; 1.0x
  chuẩn; 0.75x chậm; không autoplay khi mở card / câu listening.
- **D-22 · legacy · ja** — speechText dùng kana/reading, không đưa kanji mơ hồ
  một mình vào TTS. Display `雨（あめ）` → speech `あめ`.
- **D-23 · legacy · ja** — Q14 audio từng dòng: mỗi lần 1 dòng; nghe lại không
  mất quota.

## 7. Register & naturalness

- **D-24 · legacy/ADR-016 · ALL** — Baseline `NATURAL_NEUTRAL_POLITE`. Mức lõi:
  `CASUAL` / `NATURAL_NEUTRAL_POLITE` / `FORMAL`. Modifier trực giao (không phải
  thang cao-thấp): `HONORIFIC` / `CEREMONIAL` / `SLANG`. **Cấm** sao chép profile
  register ngôn ngữ này sang ngôn ngữ khác; **cấm** bịa biến thể cho đủ ô
  (danh từ trung tính không có casual riêng → not-applicable).
- **D-25 · legacy · ALL** — Bản dịch chính phải tự nhiên; cấu trúc sát nghĩa nằm
  ở `literalGloss` riêng; không làm cứng bản dịch chính để thay gloss.
- **D-26 · legacy · ALL** — **Cấm** auto-PASS bằng word frequency / translation
  similarity / LLM score / regex phong cách.
- **D-27 · legacy · ALL** — Câu target hơi "kiểm soát" chỉ giữ khi: đúng ngữ pháp
  + approved objective đòi exact form + learner biết đây là mẫu đang học +
  validator không mở rộng ràng buộc đó sang mọi câu tương đương tự nhiên.

## 8. Five-cards & bài tập

- **D-28 · legacy · ALL (format)** — `five_cards` = đúng 5 thẻ, thứ tự:
  1) Introduction 2) Vocabulary cards 3) Short dialogue 4) Grammar 5) Exercises.
  Golden ref: `ja-daily_life-m01-u1-l1`.
- **D-29 · legacy · ALL (format)** — Bản đồ Q1–Q14 ở
  `rules/exercise-phenomena.map.json`. Q14 = `real_world_practice_dialogue`
  (non-graded, thay `controlled_ai_text` cũ). **Q15 = DEFERRED.** Plan: Free
  Q1–Q10, Plus Q11–Q14.
- **D-30 · legacy · ALL** — Dữ liệu nhân vật phải có `targetLanguage`,
  `targetLocale`, `cultureContext`, `approvedCharacterNamePool`.

## 9. Quy trình & gate

- **D-31 · legacy · ALL** — Source → Generate → Validate → Sync; không hand-edit
  generated JSON. Gate 5 = review có khoảng cách 48–72 giờ. **⚠ SUPERSEDED
  trong phạm vi pipeline `/build-language` bởi D-49 (2026-07-18)** — Gate 5 vẫn
  áp nguyên vẹn cho mọi quyết định kiến trúc khác ngoài phạm vi đó.
- **D-32 · legacy · ALL** — Trạng thái tài liệu: DRAFT / REVIEW_CANDIDATE /
  PROVISIONAL / VALIDATED / FROZEN / DEFERRED. QA state style: 
  LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED / FAIL_DETERMINISTIC /
  NEEDS_NATIVE_STYLE_REVIEW / PASS.

## 10. Quyết định của lần chạy này

- **D-33 · 2026-07-18 · owner · ja** — Hồ sơ `ja` FROZEN (định dạng Codex "Full
  Language Profile", 16 file) được **giữ nguyên làm narrative**; pipeline dựng
  lớp rule máy-đọc-được **bao quanh**, nối bằng `enforced_by` (giống cách xử lý
  `rules/content/`). **KHÔNG** cách ly, xóa, hay sửa file FROZEN. (Option A.)
- **D-34 · 2026-07-18 · owner · ja** — Phạm vi build rule ja = **"đủ dùng, tái
  dùng"**: build toàn bộ rule_level đạt ≥ medium ngay; hoãn các lỗ hổng thật
  (pitch accent, thứ tự nét, rendaku/counter theo từng từ). Tái dùng cho mọi bài ja.
- **D-35 · 2026-07-18 · owner · ja** — Ưu tiên **tất cả kỹ năng** (đọc, nghe, nói,
  viết) — không giới hạn hiện tượng nào theo kỹ năng.
- **D-36 · 2026-07-18 · owner · ja** — **Sẽ có native review** (giờ hoặc sau) →
  build DRAFT có nguồn + soạn `native-review-ja.md` (checklist tiếng Anh
  tick-được); phần chủ quan (keigo, trợ từ cuối câu, dịch tự nhiên) giữ đường lên
  PASS, không tự cấp PASS bằng máy.
- **D-37 · 2026-07-18 · owner · ALL** — Duyệt catalog 60 ngôn ngữ như bản nháp;
  zh mặc định **Hans** (giản thể), chốt lại khi build tới zh; sửa danh sách sau tùy ý.
- **D-38 · 2026-07-17 · owner · ja** — Động từ bất quy tắc = **2** (する・くる).
  ある là godan có đúng một ngoại lệ (phủ định ない), dạy như dạng từ vựng riêng,
  không xếp vào lớp bất quy tắc. (Review Bước 4, R-01: chọn B.)
- **D-39 · 2026-07-17 · owner · ja** — Dấu câu dạy: chỉ **。（句点）và 、（読点）**.
  JLREQ ghi nhận cả `．，` cho sách khoa học kỹ thuật, nhưng app chỉ dạy một quy
  ước phổ thông; máy chấm normalize bỏ khác biệt dấu câu (D-14) nên bài chứa
  `．，` không bị chấm sai. (Review Bước 4, R-02: chọn A.)
- **D-40 · 2026-07-17 · owner (mặc định tự động, không phản hồi) · en** — Có
  gợi ý phát âm dạng **IPA** (ký hiệu phiên âm quốc tế), **ẩn mặc định + có nút
  bật** — cùng chính sách với romaji ja (D-11 bản ii). Nguồn: WikiPron cấp sẵn
  dữ liệu IPA khớp máy được. Owner được báo phương án khuyến nghị (A) ở Bước 0
  đợt hỏi 1 kèm câu "không trả lời → tôi chọn A"; không có phản hồi trong phiên
  → tự áp dụng theo Auto Mode.
- **D-41 · 2026-07-17 · owner (mặc định tự động, không phản hồi) · en** —
  Giọng chuẩn cho phát âm + TTS = **en-US** (General American). Nhất quán với
  baseline chính tả en-US đã chốt ở `S-EN-STYLE`. Cùng cơ chế mặc định như D-40.
- **D-42 · 2026-07-17 · owner · en** — Sir/Ma'am: dạy là **có thật** khi nói
  với nhân viên phục vụ (nhà hàng, khách sạn, tổng đài...), nhưng **không**
  tự động chèn vào mọi câu lịch sự bình thường (bạn bè, đồng nghiệp không
  cần). Dung hòa nguồn nội bộ (tránh máy móc) và Wikipedia (có dùng thật) —
  gắn theo tình huống, không gắn cứng theo mọi câu, đúng tinh thần ADR-016.
  (Review Bước 4, R-01: chọn A.)
- **D-43 · 2026-07-18 · owner · vi** — Giọng chuẩn cho phát âm + TTS = **Hà
  Nội (Bắc)**. Khớp chuẩn chính tả (đủ 6 thanh rõ nhất), chuẩn dạy tiếng Việt
  cho người nước ngoài trong hầu hết giáo trình.
- **D-44 · 2026-07-18 · owner · vi** — Có gợi ý cách đọc dấu thanh (mô tả bằng
  lời + audio), **ẩn mặc định + có nút bật** — cùng chính sách với romaji ja
  (D-11 bản ii) và IPA en (D-40).
- **D-45 · 2026-07-18 · owner · vi** — Thiếu/sai dấu thanh (vd gõ "ma" thay
  "má") chấm **SAI** (đổi nghĩa — âm vị thật, không phải typo nhỏ), khác khoảng
  trắng/dấu câu (D-14, được normalize). Không áp dụng chính sách typo D-18 cho
  trường hợp này.
- **D-46 · 2026-07-18 · owner · vi** — Xác nhận quy tắc viết hoa cơ bản: chữ
  đầu câu và danh từ riêng viết hoa, giống mọi ngôn ngữ Latin khác. (Review
  Bước 4, R-01: chọn A.)
- **D-47 · 2026-07-18 · owner · vi** — Xác nhận tiểu từ "ạ" cuối câu đánh dấu
  sự lễ phép khi nói với người lớn tuổi/bề trên (vd "Con chào ông ạ."). (Review
  Bước 4, R-02: chọn A.)
- **D-48 · 2026-07-18 · owner · vi** — Xác nhận "tôi" là đại từ gần trung tính
  nhất trong hệ đại từ tiếng Việt: dùng được rộng rãi, không xác định quan hệ
  tuổi/vai vế, nhưng hơi giữ khoảng cách/trang trọng so với xưng hô thân tộc
  thân mật — không có đại từ nào hoàn toàn trung tính tuyệt đối. (Review Bước
  4, R-03: chọn A.)
- **⚠ D-49 · 2026-07-18 · owner · ALL (chỉ phạm vi pipeline `/build-language`)
  · BỎ GATE 5 CHO BUILD RULE NGÔN NGỮ, CÓ HIỆU LỰC NGAY** — Gate 5 (chờ
  48–72 giờ giữa đề xuất VALIDATED và xác nhận FROZEN lần hai) bị bỏ cho quy
  trình build rule ngôn ngữ (Bước 5 của `/build-language`).
  **Lý do:** Gate 5 giả định có người review đủ chuyên môn ngôn ngữ học ở lần
  xác nhận thứ hai. NovaLang là công ty một người, Project Owner không phải
  chuyên gia ngôn ngữ học và không thẩm định được nội dung rule bằng mắt —
  khoảng cách thời gian chờ không tạo ra một lần review thật sự khác biệt so
  với lần đầu, nó chỉ là thủ tục rỗng (không ai đọc lại kỹ hơn chỉ vì đã qua
  48 giờ).
  **Thay thế bằng:** review thật đến từ (a) **native review** —
  `native-review-<lang>.md` khi hiện tượng cần người bản ngữ (D-36), hoặc owner
  tự xác nhận trực tiếp khi ngôn ngữ nằm trong danh sách owner tự đánh giá
  được (vi/ja/en); và (b) **corpus check** (Bước 3) — chạy rule lên văn bản
  thật, hạ confidence nếu rule bị vi phạm hàng loạt. Hai cơ chế này đã tồn tại
  sẵn trong pipeline và tạo bằng chứng thật, không phụ thuộc thời gian chờ.
  **Hệ quả cụ thể:** một hiện tượng đạt **VALIDATED** (đủ điều kiện Bước 5:
  confidence ≥ medium, đủ fixture pass+fail, corpus check sạch, mọi
  `depends_on` cũng ≥ VALIDATED) có thể được đề xuất **FROZEN ngay trong cùng
  phiên**, không cần chờ. Điều kiện FROZEN khác (`version ≥ 1.0.0`,
  `depends_on` cũng FROZEN, owner xác nhận — hành động không đảo ngược) vẫn
  giữ nguyên, chỉ bỏ riêng điều kiện khoảng cách thời gian.
  **Phạm vi:** CHỈ áp cho pipeline build rule ngôn ngữ (`/build-language`,
  Bước 5, và validator `tools/validate.mjs`). **Không** áp cho quyết định kiến
  trúc khác — mọi ADR/quyết định ngoài phạm vi build-rule-ngôn-ngữ vẫn giữ
  nguyên yêu cầu Gate 5 nếu đã có.
  **Kỹ thuật:** `tools/validate.mjs` chưa từng lập trình kiểm tra 48 giờ (chỉ
  kiểm `version ≥ 1.0.0` + `depends_on` FROZEN) — khoảng cách thời gian trước
  đây chỉ được kiểm **thủ công** bởi agent khi đề xuất freeze, đối chiếu
  `pipeline-log.md`. D-49 bỏ bước kiểm thủ công đó; thông báo/comment liên quan
  trong `validate.mjs` được cập nhật theo.

---

## 0.1 Golden Lesson audit 2026-07-18 — quyết định G-01 .. G-04

Nguồn: một phiên khác chạy phép thử độc lập — đối chiếu Golden Reference Lesson
(`ja-daily_life-m01-u1-l1`, ADR-008, hand-authored trước khi có `rules/**`) với
rule ja + `_base` hiện có. Tìm được 14 lỗ hổng (nhóm A: rule bắt nhầm nội dung
đúng sư phạm · nhóm B: bài thiếu data · nhóm C: rule thiếu) cộng 4 quyết định
owner G-01..G-04. Toàn bộ 14 lỗ hổng + bằng chứng đã được **kiểm chứng độc lập
lại** (đọc trực tiếp `shared/content/curriculum/lessons.json` +
`shared/generated/lessons.json` + `rules/_base/**` + `rules/languages/ja/**`)
trước khi ghi vào đây — khớp 14/14, đúng kỷ luật 2 nguồn độc lập của chính
pipeline này (xem Bước 2). Chi tiết đầy đủ 14 lỗ hổng + bằng chứng:
`rules/_legacy/golden-lesson-test-2026-07-18.md`.

- **⭐ G-01 · 2026-07-18 · owner · ALL (`_base/distractor`)** — Sửa GỐC, không
  thêm ngoại lệ theo danh sách. `length_ratio_max` và `same_word_class` **CHỈ
  áp cho distractor SINH TỰ ĐỘNG** (generator tạo ra). Nội dung **đã duyệt**
  (hand-authored, qua review) miễn theo **provenance** (nguồn gốc: ai/quy
  trình nào tạo ra nội dung này), không theo danh sách ngoại lệ liệt kê tay
  từng trường hợp. Khớp luật cũ đã có: "Không dùng word frequency/LLM score/
  regex phong cách để tự động tạo PASS" (D-26) — cùng tinh thần "không dùng
  máy móc để tự động kết án nội dung đã người duyệt".
- **G-02 · 2026-07-18 · owner · ALL** — Giải quyết ghi chú kỹ thuật còn treo ở
  mục 0 (D-50 dòng "khớp G-02" — tại thời điểm ghi D-50, `G-02` chưa tồn tại ở
  đâu khác trong repo để đối chiếu). G-02 **chính là** hệ quả "cho gõ chữ
  Latin/romanization ở A0–B1 nếu hệ chữ khó gõ" đã tự suy ra từ D-50 — không
  phải một quyết định khác, chỉ là ca cụ thể C1 (Q10, chấp nhận romaji) làm lộ
  ra khoảng trống đó thiếu spec thực thi. Bổ sung cụ thể: viết **SPEC chuẩn
  hoá romaji** (macron ō/ou/o, shi/si, quy tắc tách từ) làm quy tắc chung,
  **KHÔNG liệt kê tay từng biến thể chấp nhận** (như 2 cách tách
  `yoroshiku onegaishimasu`/`yoroshiku onegai shimasu` hiện tại — đó là triệu
  chứng của việc thiếu spec, không phải giải pháp). Nếu spec phình quá phạm vi
  hợp lý khi viết → dừng, báo owner, không tự mở rộng phạm vi.
- **G-03 · 2026-07-18 · owner · ja + ALL** — Hai phần:
  - **(A) B1–B3 (dữ liệu Golden thiếu):** sửa qua **change control đúng quy
    trình** Source → Generate → Validate → Sync. **KHÔNG hand-edit**
    `shared/generated/lessons.json`. Đây là việc riêng, ngoài phạm vi
    `rules/**`/`tools/**` của phiên hiện tại — cần task/change-control riêng.
  - **(B) Rule chung mới:** "toggle trợ giúp đọc **chỉ bật khi coverage đủ
    100%**" cho ngôn ngữ đó — không bật cho ngôn ngữ có dữ liệu kém (kể cả
    khi đó là chính Golden Lesson). Cùng triết lý fail-safe đã có (D-12:
    unknown level → ẩn, ghi diagnostic, không tự suy ra) — mở rộng nguyên
    tắc đó sang "coverage không đủ → ẩn, ghi diagnostic, không tự suy ra".
- **G-04 · 2026-07-18 · owner · ja** — Cách A cho cả C2 và C3, nhưng **hai
  ca xử lý khác nhau**:
  - **C2 — giải quyết bằng field-path, KHÔNG cần flag mới.** Rule ngôn ngữ
    (đúng/sai ngữ pháp, ngữ dụng) chỉ áp lên `correctAnswer` + nội dung
    trình bày là "đúng" cho người học — **KHÔNG áp lên `options`/nhiễu**.
    Đây là ranh giới field đã có sẵn trong schema (correctAnswer vs options),
    không cần thêm trường mới.
  - **C3 — field-path KHÔNG giải quyết được.** Đây là ca thật cần trường
    machine-readable mới (nhãn register trên dòng/nhóm hội thoại) — **chưa
    có trong phạm vi phiên này**. Tạm thời: **không áp check register lên
    `dialogueGroups`**, ghi nợ rõ ràng ở đây và trong file audit, không tự
    bịa trường mới mà không có schema change được duyệt riêng.

---

## 0.2 Nợ nội dung Golden Lesson (B1/B2, 4 mục) — ghi nợ, CHƯA sửa

**Trạng thái: NỢ CÓ TÊN, chưa làm.** Xác nhận bằng chứng nhiều lần trong phiên
2026-07-18 (đọc trực tiếp `scripts/content/daily-life/module-1/ja-unit1-lesson1.mjs`,
và độc lập bằng `tools/lesson-check.mjs` chạy trên toàn bộ 506 bài thật — kết
quả 505/506 sạch, đúng 4 cảnh báo này còn lại, không đổi qua nhiều lần chạy).

**Đúng 4 mục, đúng dòng nguồn:**

| Vocabulary id | Dòng nguồn (`ja-unit1-lesson1.mjs`) | Thiếu field |
|---|---|---|
| `desu` | dòng 419 | `reading` VÀ `romanization` (cả hai) |
| `kochira-koso` | dòng 421 | `romanization` |
| `sayounara` | dòng 422 | `romanization` |

**Vì sao chưa sửa:** cả 3 mục thuộc `vocabulary[]` của Golden Reference Lesson
(`ja-daily_life-m01-u1-l1`, ADR-008, FROZEN). Sửa nội dung Golden bắt buộc đi
qua đúng quy trình **Source → Generate → Validate → Sync** (D-31) —
KHÔNG hand-edit `shared/generated/lessons.json`, KHÔNG sửa trực tiếp file
generated. Sửa đúng chỗ là ở `ja-unit1-lesson1.mjs` (dòng 419/421/422), rồi
chạy lại `npm run generate:curriculum` → `validate:curriculum` → sync Flutter
assets. Đây là thay đổi nội dung FROZEN, cần task/change-control riêng, không
tự làm trong lúc chỉ đang sửa `rules/**`+`tools/**`.

**Quyết định owner (2026-07-18):** để lại nợ, **chưa sửa ngay** — gom vào lần
có nhiều việc change-control khác cho Golden Lesson để làm một thể (đỡ tốn một
lượt generate→validate→sync riêng chỉ cho 4 dòng). Không chặn build: lớp
validate mềm (`scripts/validate-curriculum.mjs`, xem mục nối lớp A cùng ngày)
chỉ in cảnh báo, không fail.

**Việc cần làm khi tới lượt (không làm bây giờ):**
1. Sửa `ja-unit1-lesson1.mjs` dòng 419: thêm `reading: 'たなかです。'`-kiểu
   (hoặc giá trị đúng theo ngữ cảnh `～です` là copula rời, cần owner/native
   xác nhận giá trị chính xác, không tự suy đoán) và `romanization` tương ứng.
2. Dòng 421 (`kochira-koso`): thêm `romanization` (đã có `reading` đúng —
   "こちらこそ、よろしくおねがいします").
3. Dòng 422 (`sayounara`): thêm `romanization` (đã có `reading` đúng —
   "さようなら").
4. Chạy `npm run generate:curriculum` → `validate:curriculum` → sync Flutter
   assets. Xác nhận `tools/lesson-check.mjs --lang ja --lesson-id
   ja-daily_life-m01-u1-l1` về 0 cảnh báo.

---

## 0.3 Kiến trúc curriculum domain Giao tiếp hàng ngày (P-01 .. P-12) — 2026-07-18

**Lưu ý phạm vi:** sổ này (`rules/decisions.md`) vốn ghi quyết định cho pipeline
`/build-language` (luật ngôn ngữ: chính tả, ngữ âm, ngữ pháp, ngữ dụng), không
phải quyết định kiến trúc curriculum/sản phẩm. Mục này là **ngoại lệ ghi theo
đúng chỉ thị owner** ("ghi vào decisions.md") cho một quyết định thiết kế
curriculum áp mọi ngôn ngữ — dùng tiền tố **P-** (Product/Curriculum) để tách
hẳn khỏi dãy **D-** (quyết định ngôn ngữ), tránh lẫn hai loại. **Bản đầy đủ,
có ngữ cảnh và hệ quả, nằm ở `docs/ai/ARCHITECTURE_DECISIONS.md` ADR-018** —
mục này là bản tóm tắt đối chiếu nhanh, không phải bản gốc.

**Trạng thái: THIẾT KẾ đã được owner chốt hướng, CHƯA FROZEN, CHƯA đổi code,
CHƯA đụng `curriculum_catalog.json`.** Nhiều điểm là **giả định ban đầu**, đánh
dấu rõ dưới đây — không đóng băng dù đã ghi ra.

- **P-01 · 2026-07-18 · owner · ALL (mọi ngôn ngữ học)** — Domain `daily_life`
  chia **2 khối**: (A) "Những ngày đầu" (tên tạm) — tình huống thủ tục mới
  sang, KHÔNG chia 3 chặng, KHÔNG cửa sổ cuốn, mở tự do ("van xả cấp cứu");
  (B) lộ trình chính — chủ đề lặp hàng ngày, chia 3 chặng hiển thị, có cửa sổ
  cuốn.
- **P-02 · owner · ALL** — Khối B có **15 chủ đề dùng chung cả 3 chặng**, thứ
  tự tham chiếu: Chào hỏi&làm quen · Bản thân · Số đếm&tiền · Thời gian&ngày
  tháng · Mua sắm · Ăn uống&gọi món · Chỉ đường · Tàu điện&đi lại · Khi không
  hiểu · Gia đình&người quen · Sở thích · Hẹn gặp&rủ rê · Điện thoại&tin nhắn ·
  Thời tiết&sức khỏe · Cảm ơn/xin lỗi/lịch sự. Chặng cao hơn = cùng chủ đề,
  nói phức tạp/liền mạch hơn, không phải chủ đề rời.
- **P-03 · owner · ALL** — Tên kỹ thuật (id/code) tách hẳn khỏi tên hiển thị.
  15 nhãn ở P-02 chỉ là nhãn tham chiếu nội bộ, không phải chuỗi hiển thị.
  Tên hiển thị **bắt buộc qua i18n** theo `nativeLanguageCode`, cấm hardcode
  bất kỳ ngôn ngữ nào trong code hiển thị. **ID chủ đề bất biến**, không nhúng
  ngôn ngữ, không đổi khi đổi tên hiển thị — cùng nguyên tắc đã xác nhận cho
  lesson ID qua completion-record (`shared/contracts/lesson_completion.rules.md`
  C2/C9), mở rộng áp dụng cho topic/module ID.
- **P-04 · owner · ALL** — 3 chặng: cùng chủ đề, TĂNG độ phức tạp diễn đạt
  (không phải tăng khối lượng từ vựng). Nhãn hiển thị Cơ bản/Trung cấp/Cao cấp;
  KHÔNG hiện CEFR (CEFR/thang mức tương đương vẫn chạy ngầm cho xếp lớp/khoá).
- **P-05 · owner · ALL** — Tự do ngang trong 1 chặng (chọn unit từ bất kỳ chủ
  đề nào, không ép tuần tự); khoá dọc giữa chặng (Trung cấp khoá tới khi xong
  Cơ bản, Cao cấp khoá tới khi xong Trung cấp) — vì cách nói chặng cao cần nền
  nhiều chủ đề chặng dưới, không chỉ nền của chính chủ đề đó.
- **P-06 · owner · ALL** — Học song song & giới hạn Free, **mỗi ngôn ngữ độc
  lập hoàn toàn, không cộng dồn**: tối đa 2 ngôn ngữ song song; mỗi ngôn ngữ
  tối đa 2 domain song song; mỗi (ngôn ngữ×domain) 2 unit/ngày; SRS cap 30
  mục/ngày riêng từng ngôn ngữ; level/tiến độ/SRS/thông báo tách riêng theo
  ngôn ngữ. Bài chưa hoàn thành = tính lượt; bài đã hoàn thành (kể cả placement
  bỏ qua) = ôn lại, KHÔNG tính lượt, có nhắc nhẹ trước khi bấm.
- **P-07 · owner · ALL** — Luật nội dung bắt buộc cho mọi unit khối B: vì tự do
  ngang, mỗi unit PHẢI tự đứng được, không giả định đã học unit/chủ đề khác
  cùng chặng. Ngữ pháp nền (です/ます, số đếm...) thuộc Core Foundation, không
  phải điều kiện ẩn của một unit khối B.
- **P-08 · owner · ALL** — Giữ nguyên 3 cơ chế vào đã có: placement test (mở
  đúng chặng, chặng dưới coi như hoàn thành nhưng vẫn ôn lại được), tự chọn
  level, nút bỏ qua Core Foundation (kana). Không thiết kế lại 3 cơ chế này.
- **P-09 · owner · ALL — GIẢ ĐỊNH BAN ĐẦU, chờ dữ liệu, KHÔNG cố định** —
  Entitlement khối A: Free (mồi 24h) = sân bay&nhập cảnh, mua sắm/siêu thị,
  tàu điện&đi lại; Trả phí (hàng sâu) = visa/xuất nhập cảnh, ngân hàng, SIM,
  thuê nhà, bảo hiểm, baito, cảnh sát, bưu điện. Độc lập với bậc Plus/Pro/Max
  (chưa chốt).
- **P-10 · owner · ALL** — Trả phí KHÔNG bán bằng số unit (Free đã 8 unit/ngày
  qua 2×2 slot ngôn ngữ/domain, coi là đủ nhiều). Bán: bỏ quảng cáo + khối
  "Những ngày đầu" hàng sâu + bỏ giới hạn số ngôn ngữ/domain song song + tính
  năng nâng cao. Phân bổ theo bậc Plus/Pro/Max: CHƯA CHỐT.
- **P-11 · owner · ALL — nguyên tắc, KHÔNG chốt số** — Định giá khối trả phí so
  với "chi phí thuê phiên dịch/học trung tâm", không so "rẻ tuyệt đối". Nội
  dung khối này (chuyên môn cao, hàng bán) phải được người có trải nghiệm thật
  rà soát kỹ nhất — KHÔNG AI-sinh-rồi-đọc-lướt. Giá cụ thể chờ dữ liệu
  ("Gate 6" — xem ADR-017: tên xuất hiện đúng 1 lần trong
  `.claude/commands/build-language.md`, chưa từng định nghĩa; ADR-018 không tự
  định nghĩa Gate 6, chỉ ghi nhận giá đang chờ nó).
- **P-12 · owner · ALL — để mở, không chốt trên giấy** — Số unit/lesson mỗi ô
  (chủ đề×chặng) quyết khi viết bài thật đầu tiên, không nhân sẵn ra một bảng
  cố định.

**Triết lý gốc (không phải quyết định riêng, là lý do xuyên suốt P-01..P-12):**
app không có giáo viên hỏi đột xuất như trường tiếng, nên cấu trúc phải cho
người học tự lấy đúng tình huống cần ngay, không khoá cứng tuyến tính — chỉ
khoá dọc giữa chặng (P-05) là ngoại lệ, vì có căn cứ phụ thuộc ngữ pháp/diễn
đạt thật, không phải sở thích sắp xếp nội dung.

**Còn treo, đánh dấu rõ để không đóng băng nhầm:** tên "Những ngày đầu", tỉ lệ
Free/Trả phí cụ thể ở P-09, mọi ranh giới/tính năng theo bậc Plus/Pro/Max, mọi
con số giá, số unit/lesson mỗi ô (P-12), cơ chế quảng cáo ngoài "trả phí thì
hết quảng cáo", và chuỗi id/slug kỹ thuật cụ thể cho topic/tier (P-03 chỉ chốt
NGUYÊN TẮC — id bền + hiển thị qua i18n — không chốt chuỗi ký tự cụ thể).

---

## Ghi chú (không phải quyết định đã chốt)

- Giao diện thẻ từ vựng (collapsed: target + reading + audio; expanded: meaning +
  usage + example + translation + note) là **spec sản phẩm**, do owner cung cấp
  file riêng — **không** thuộc `rules/languages/`. Ghi lại đây chỉ để tham chiếu.
- Danh sách ngôn ngữ owner tự đánh giá được (dùng cho Bước 4): **vi, ja, en**.
  Cập nhật khi thay đổi.
