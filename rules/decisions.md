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

- **D-01 · 2026-07-17 · owner · ALL — ⚠️ SỬA BỞI D-55 (2026-07-19).** Bản gốc:
  "Catalog mục tiêu build rule = **60 ngôn ngữ** (thay quyết định cũ '20 learning
  languages')." Bản gốc GỘP build-rule và native làm một con số 60. **D-55 tách
  đôi:** mục tiêu build **rule** giảm còn **33** (playable); con số **60** chuyển
  thành mục tiêu **native** (chỉ cần dịch nghĩa, KHÔNG build rule). Đọc D-55 bên
  dưới thay cho D-01. Xem `rules/catalog.json`.
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

## 0.3 Kiến trúc curriculum domain Giao tiếp hàng ngày (P-01 .. P-12, + P-03b) — 2026-07-18

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
  cuốn. **Cập nhật 2026-07-18:** câu mô tả khối A là 1 key i18n (nguồn vi):
  *"Dành cho người sắp ra nước ngoài — để không bối rối trước những việc
  thiết yếu đầu tiên."* — chưa dịch en/ja/... (xem ADR-018 điểm 1).
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
- **P-03b · 2026-07-18 · owner · ALL — luật ngôn ngữ hiển thị, áp toàn hệ
  thống, không riêng domain này** — Tên hiển thị phải THUẦN `nativeLanguageCode`,
  TUYỆT ĐỐI không vay mượn từ của `learningLanguageCode`, kể cả từ vay mượn đó
  phổ biến trong lời nói thật. Vd bản vi học ja: ghi "làm thêm" (không
  "baito"/バイト), "thẻ cư trú" (không "zairyu card"), "gia hạn" (không
  "shinsei"). Lỗi dễ mắc vì người viết quen dùng từ bản ngữ nước sở tại — mỗi
  tên hiển thị là 1 key i18n, mỗi ngôn ngữ có bản dịch thuần riêng, không lẫn.
  Cụ thể hoá thêm cho luật "Learning Content Language Purity" đã có trong
  `AGENTS.md` (chưa nêu rõ tên trường hợp vay mượn ngược này trước ADR-018).
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
- **P-09 · 2026-07-18 (sửa) · owner · ALL — GIẢ ĐỊNH BAN ĐẦU, chờ dữ liệu,
  KHÔNG cố định** — Entitlement khối A, phân loại theo **TẦM QUAN TRỌNG nội
  dung, KHÔNG theo thời gian** (bỏ khung "mồi 24h" cũ — dễ hiểu nhầm là gói
  dùng thử hết hạn; Free ở đây là mở vĩnh viễn, không đếm ngược):
  - **Free** (một số bài thiết yếu nhất, mở sẵn, không giới hạn thời gian):
    sân bay & nhập cảnh, mua sắm, tàu điện & đi lại.
  - **Plus trở lên** (mở hết khối): visa & xuất nhập cảnh, mở tài khoản ngân
    hàng, đăng ký điện thoại/SIM, thuê nhà, bảo hiểm & khám bệnh, làm thêm,
    cảnh sát, bưu điện.
  - Danh sách bài Free cụ thể vẫn là giả định, chờ điều chỉnh theo dữ liệu
    người dùng thật. Độc lập với bậc Plus/Pro/Max (chưa chốt).
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

## 11. Build rule ko/es/fr (2026-07-18) — hạ tầng bị chặn mạng ngoài, điều chỉnh phương pháp

- **⚠ D-51 · 2026-07-18 · derived · ALL (áp cho mọi lần build rule ngôn ngữ
  trong PHIÊN NÀY và mọi phiên chạy trong cùng loại môi trường cloud) —
  KHÔNG fetch được hầu hết web ngoài, chỉ vài domain cụ thể còn mở.** Xác
  nhận qua `curl http://127.0.0.1:38867/__agentproxy/status`: proxy trả 403
  "policy denial" cho `tatoeba.org`, `ko.wikipedia.org`,
  `downloads.tatoeba.org`. Test tay thêm: `en.wikipedia.org`, `unicode.org`,
  `www.unicode.org`, `archive.org`, `www.rae.es`, `dle.rae.es`,
  `www.korean.go.kr` (trang chính thức National Institute of Korean
  Language), `assets.publishing.service.gov.uk` (PDF quy tắc La-tinh hoá
  chính thức UK-hosted) — **TẤT CẢ 403 CONNECT tunnel failed**, kể cả qua
  công cụ `WebFetch` (không chỉ `curl`). Theo đúng `/root/.ccr/README.md`:
  đây là **policy denial của tổ chức, KHÔNG phải lỗi kỹ thuật sửa được** —
  "không được retry, không được vòng qua, phải báo lại". Domain còn dùng
  được đã xác nhận: `raw.githubusercontent.com` (dataset CLDR/UD/WikiPron —
  dùng để import Bước 1 như bình thường), registry npm/PyPI (theo `noProxy`
  của proxy). `WebSearch` (công cụ tìm kiếm, KHÔNG fetch trực tiếp trang
  đích) **vẫn hoạt động** và trả về snippet thật kèm URL nguồn.
  **Hệ quả cho phương pháp Bước 2 (derive 2 nguồn độc lập bằng subagent, mỗi
  lượt chỉ đọc 1 tài liệu):** không thể thực hiện đúng nguyên văn — subagent
  trong cùng container sẽ gặp đúng proxy này, không fetch được tài liệu gốc
  (trang chính phủ, Wikipedia, sách ngữ pháp online). **Điều chỉnh áp dụng
  cho ko/es/fr (khác ja — lúc build ja, WebFetch còn hoạt động, xem
  `S-W3C-JLREQ`/`S-NRGRAMMAR`/Wikipedia trong `sources.json` của ja):**
  - Dùng `WebSearch` (nhiều truy vấn độc lập, diễn đạt khác nhau, cho cùng
    một hiện tượng) làm nguồn cross-check thay cho "subagent đọc nguyên văn
    2 tài liệu" — vẫn trả về snippet + URL nguồn thật, chỉ không đọc được
    toàn văn trang.
  - Tri thức ngôn ngữ học đã huấn luyện sẵn (trained knowledge) của chính
    người viết rule được dùng làm nguồn bổ sung cho các sự kiện ngôn ngữ học
    chuẩn, phổ thông, không tranh cãi (bảng chữ cái, cấu trúc âm tiết, loại
    từ, trật tự từ cơ bản...) — ghi `derived_by: human`, **KHÔNG bao giờ
    `confidence: high`** cho các mục chỉ có nguồn này (trần `medium`), và
    ghi rõ trong `sources.json`/`coverage.json` đây là giới hạn của phiên
    này, không phải "đã đối chiếu tài liệu gốc" thật.
  - Bất kỳ hiện tượng nào WebSearch cũng không cho đủ bằng chứng cụ thể
    (không phải kiến thức phổ thông, cần trích dẫn chính xác từ văn bản quy
    định — vd bảng La-tinh hoá chính thức đầy đủ, ranh giới register chính
    xác) → hạ `confidence: none` hoặc đưa vào "GIẢ ĐỊNH CẦN NGƯỜI DUYỆT",
    KHÔNG bịa cho đủ.
  - Corpus check (Bước 3) KHÔNG bị ảnh hưởng — vẫn dùng UD treebank qua
    `raw.githubusercontent.com` như ja đã làm (Tatoeba/Wikipedia cũng bị
    chặn y hệt cho ja, đây là tình trạng lặp lại, không phải mới).
  - **Khi Project Owner quay lại:** nếu môi trường lúc đó cho fetch web đầy
    đủ (như lúc build ja), nên chạy lại Bước 2 cho các mục đang ở
    `confidence: medium`-do-WebSearch để nâng lên đúng chuẩn "2 nguồn độc
    lập đọc nguyên văn" nếu muốn FROZEN sau này — ghi rõ trong từng
    `coverage.json` mục nào cần làm lại kiểu này.

- **D-52 · 2026-07-18 · derived · ko — `ko` build HOÀN TẤT, trạng thái
  `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.** 24 hiện tượng
  trong `rules/languages/ko/coverage.json`; 4 file `.rules.json`
  (orthography/phonology/grammar/pragmatics) đối chiếu khuôn thành công với
  `ja` (FROZEN) — xem `rules/languages/ko/pipeline-log.md` cho log chi tiết
  từng bước. Bước 3 (corpus check trên 7339 câu UD Korean-GSD/PUD thật) tìm
  và tự sửa 2 bug thật trong rule mới viết (check bị áp sai phạm vi — xem
  pipeline-log). `node tools/validate.mjs` PASS, không phát sinh lỗi mới
  ngoài 4 lỗi pre-existing của vi/zh (không liên quan). 3 mục cần Project
  Owner quyết (`review-checklist.md`: A-02 map register, A-03 reading-aid
  policy, A-06 spacing grading) và 3 mục cần người bản ngữ Hàn
  (`native-review-ko.md`: A-01 bảng romanization, A-04 bảng động từ bất quy
  tắc, A-05 bảng counter) — CHƯA gửi review, CHỈ khung checklist. Không đụng
  `PLAYABLE_LANGUAGES`/`language_options.json`/`generate-curriculum.mjs`
  hay `rules/languages/{ja,en,vi,zh}/**`. Commit riêng ngay sau entry này.

- **D-53 · 2026-07-18 · derived · es — `es` build HOÀN TẤT, trạng thái
  `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.** 22 hiện tượng
  trong `rules/languages/es/coverage.json`; 4 file `.rules.json` khớp khuôn
  với ja/en/ko — xem `rules/languages/es/pipeline-log.md`. Bug tìm được ở
  `ko` (check bị áp sai phạm vi) KHÔNG lặp lại ở `es` — viết `checks[]` cẩn
  thận hơn ngay từ đầu, chỉ đưa vào thứ thật sự kiểm được ở mức toàn-dòng.
  Một lỗi khuôn thật tìm được và sửa: phenomenon tôi đặt tên
  `pronouns_and_address` không khớp tên chuẩn `forms_of_address` mà
  `rules/exercise-phenomena.map.json` đã dùng cho `ko`/mặc định toàn hệ
  thống — đổi tên lại cho khớp. Bước 3 (corpus check 17013 câu UD
  Spanish-GSD/PUD + g2p-check 132249 từ WikiPron) xác nhận sạch 100% cho 3
  giả thuyết grapheme-to-phoneme (ñ->[ɲ], qu->[k], z->[s] — xác nhận dataset
  dùng SESEO/Latin America). `node tools/validate.mjs` PASS, không lỗi mới.
  **Phát hiện quan trọng nhất của es (khác ko):** tiếng Tây Ban Nha không có
  MỘT chuẩn vùng miền duy nhất (tú/usted/vos/vosotros, seseo/distinción) —
  đây là GIẢ ĐỊNH B-01, ảnh hưởng gần như toàn bộ `style-and-register.md`
  và locale TTS, đưa vào `review-checklist.md` làm mục đầu tiên/quan trọng
  nhất. 3 mục review-checklist (B-01 dialect baseline, B-02 HONORIFIC
  mapping khi không có hệ tương ứng, B-03 chính sách chấm tilde) + 4 mục
  native-review (B-04 tilde diacrítica, B-05 ngoại lệ giống danh từ, B-06
  bảng động từ bất quy tắc, B-07 leísmo/laísmo) — CHƯA gửi review. Không
  đụng `PLAYABLE_LANGUAGES`/`language_options.json`/`generate-curriculum.mjs`
  hay `rules/languages/{ja,en,vi,zh,ko}/**`. Commit riêng ngay sau entry này.

- **D-54 · 2026-07-18 · derived · fr — `fr` build HOÀN TẤT, trạng thái
  `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN. Ngôn ngữ 3/3,
  chuỗi ko→es→fr HOÀN TẤT.** 22 hiện tượng trong
  `rules/languages/fr/coverage.json`; 4 file `.rules.json` khớp khuôn với
  ja/en/ko/es — xem `rules/languages/fr/pipeline-log.md`. Bước 1 thuận lợi
  nhất (dataset đúng ngay lần thử đầu). Bước 3 (corpus check 17342 câu UD
  French-GSD/PUD thật) tìm và sửa 3 bug thật, nhiều nhất trong 3 ngôn ngữ:
  (1) check elision coi 'h' là trigger tự động — sửa bằng loại h khỏi
  trigger, phát hiện h aspiré là exception lexical thật; (2) **bug kỹ thuật
  tổng quát**: JS `\b` (word boundary) không coi ký tự Latin có dấu (é/è/ê/
  à...) là word-char (`\w` JS luôn ASCII-only, flag `u` không sửa việc
  này), gây khớp nhầm bên trong từ như "même" — sửa bằng anchor khoảng
  trắng `(?:^|[\s(«"'])` thay `\b`; (3) residual 141/17342 (0.81%) là
  exception lexical thật (proper noun ngoại lai, bán-nguyên-âm như "que
  oui"). g2p-check trên WikiPron thật (97301 từ): `on$->[ɔ̃]` sạch 98.10%
  nhưng `an$->[ɑ̃]` chỉ 79.90% — **công cụ tự gắn nhãn RULE NGHI NGỜ SAI**,
  đọc tay xác nhận toàn bộ vi phạm là tên riêng ngoại lai (Batman, Bowman,
  Brian, Dylan, Erdogan) lẫn trong WikiPron, KHÔNG nâng confidence
  `nasal_vowels`. **Đã kiểm tra chéo:** bug (2) không ảnh hưởng `es` (check
  `month-weekday-not-capitalized` đã re-run, vẫn 102/17013 — es dùng
  lookbehind `(?<!^\w+)` không phải `\b`, không dính bug này). `node
  tools/validate.mjs` PASS, không lỗi mới. 3 mục review-checklist (C-01
  phân biệt FORMAL/NATURAL_NEUTRAL_POLITE khi cùng dùng "vous", C-02 chính
  sách chấm dấu phụ/elision, C-03 dialect Pháp/Québécois — nhẹ hơn B-01 của
  es vì không ảnh hưởng ngữ pháp cốt lõi) + 3 mục native-review (C-04 ngoại
  lệ giống danh từ, C-05 bảng động từ bất quy tắc, C-06 lexicon h aspiré/
  bán-nguyên-âm) — CHƯA gửi review. Không đụng
  `PLAYABLE_LANGUAGES`/`language_options.json`/`generate-curriculum.mjs`
  hay `rules/languages/{ja,en,vi,zh,ko,es}/**`. Commit riêng ngay sau entry
  này, rồi viết báo cáo tổng hợp 3 ngôn ngữ thành commit cuối cùng.

## 11b. Build rule de/it (2026-07-19) — phiên tự động, 2 ngôn ngữ, không có owner

- **D-56 · 2026-07-19 · derived · de — `de` (tiếng Đức) build HOÀN TẤT, trạng
  thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014).**
  22 hiện tượng trong `rules/languages/de/coverage.json`; 4 `.rules.json`
  (orthography/phonology/grammar/pragmatics) khớp khuôn ja/en/es. Dataset thật:
  CLDR de, UD German-GSD (word-class), WikiPron `deu_latn_broad` (57662 cặp).
  Corpus 16589 câu (UD German-GSD+PUD). **g2p-check** xác nhận 4 quy tắc chữ→âm
  sạch: sch→[ʃ] 1.17%, w-→[v] 0.13%, z-→[ts] 0.99%, v-→[f/v] 0.15% → nâng
  `grapheme_to_phoneme` VALIDATED. Đặc trưng Đức: viết hoa mọi danh từ, 4 cách
  (Kasus), V2, động từ tách được, ä/ö/ü/ß. **HONORIFIC not-applicable** — tự áp
  theo TIỀN LỆ es B-02 đã duyệt (ngôn ngữ châu Âu không có kính ngữ hình thái;
  pattern lặp lại, Phần B mục 2 của /build-language). 2 mục review-checklist
  tự quyết (không có owner): D-de-01 baseline de-DE (nguồn: Goethe-Institut +
  WikiPron/UD), D-de-02 chấp nhận ss/ae/oe/ue (nguồn: DIN 5007-2 + chuẩn Thụy
  Sĩ) — `answer_acceptance_de`/`umlaut_orthography` giữ DRAFT vì là chính sách
  chấm điểm có caveat, không tự nâng VALIDATED. Sự kiện ngôn ngữ Đức thuần tuý
  (adjective declension, strong verbs, noun gender) → `native-review-de.md`.
  `catalog.json` de.ruleStatus NOT_STARTED → VALIDATED_NOT_YET_PROVEN. Không
  đụng playable config/lesson/`generate-curriculum` hay ngôn ngữ khác. Commit
  riêng.

- **D-57 · 2026-07-19 · derived · it — `it` (tiếng Ý) build HOÀN TẤT, trạng
  thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014).**
  23 hiện tượng trong `rules/languages/it/coverage.json`; 4 `.rules.json` khớp
  khuôn ja/en/es/de. Dataset thật: CLDR it, UD Italian-ISDT (word-class),
  WikiPron `ita_latn_broad` (89403 cặp). Corpus 15167 câu (UD Italian-ISDT+PUD).
  **g2p-check** xác nhận 6 quy tắc chữ→âm sạch (gn→[ɲ] 0.29%, ci/ce→[t͡ʃ]
  0.57%/0.17%, chi→[k] 1.03%, gh→[ɡ] 0%, sci→[ʃ] 0%) → `grapheme_to_phoneme`
  VALIDATED high. **Phát hiện real-data:** gli→[ʎ] CHỈ ở giữa từ (đầu từ
  gli-=[ɡli], check ^gli=>^ʎ bắn 78.85%) — sửa mô tả theo dữ liệu, không giữ
  giả thuyết sai. **corpus-check** month-weekday 0.03% (cực sạch). Đặc trưng
  Ý: mạo từ theo âm đầu (il/lo/la/gli), essere/avere + hoà giống phân từ, c/g
  mềm-cứng, geminate. HONORIFIC not-applicable (tiền lệ es B-02). 2 mục
  review-checklist tự quyết (không có owner): D-it-01 baseline it-IT, D-it-02
  chính sách dấu phụ — TỰ ÁP tiền lệ es B-03 (cảnh báo nhẹ, vì dấu phân biệt
  nghĩa e/è, da/dà) → `answer_acceptance_it` giữ DRAFT. Sự kiện ngôn ngữ Ý
  thuần tuý → `native-review-it.md`. `catalog.json` it.ruleStatus
  NOT_STARTED → VALIDATED_NOT_YET_PROVEN. Không đụng playable config/lesson
  hay ngôn ngữ khác. Commit riêng.

- **D-58 · 2026-07-19 · owner · de,it — Owner DUYỆT 4 giả định sản phẩm của
  de/it (chốt các mục TỰ QUYẾT ở D-56/D-57).** Cập nhật này CHỈ là tracking
  duyệt — KHÔNG đổi status ngôn ngữ (cả hai vẫn `VALIDATED_NOT_YET_PROVEN`,
  KHÔNG FROZEN), KHÔNG đụng rule/coverage/lesson.
  - **D-de-01 → DUYỆT phương án A:** baseline **de-DE** (Đức chuẩn, không thêm
    Áo de-AT / Thụy Sĩ de-CH).
  - **D-de-02 → DUYỆT phương án A:** chấp nhận normalize `ss=ß`,
    `ae/oe/ue=ä/ö/ü` khi chấm. Owner đồng ý cách xử thận trọng: **GIỮ**
    `answer_acceptance_de` + `umlaut_orthography` ở **DRAFT** (vì ß/ss đôi khi
    đổi nghĩa Maße/Masse) — không nâng VALIDATED cho 2 mục đó.
  - **D-it-01 → DUYỆT phương án A:** baseline **it-IT** (Ý chuẩn).
  - **D-it-02 → DUYỆT phương án B:** cảnh báo nhẹ khi thiếu/sai dấu phụ (nhất
    quán tiền lệ es B-03). Owner đồng ý **GIỮ** `answer_acceptance_it` ở
    **DRAFT**.
  - **Các mục `native-review-de.md` / `native-review-it.md` GIỮ NGUYÊN** chờ
    người bản ngữ (bảng chia động từ, giống danh từ, độ tự nhiên bản dịch...):
    owner KHÔNG tự duyệt được, không đánh dấu duyệt.
  - Ghi vào: `rules/languages/de/review-checklist.md`,
    `rules/languages/it/review-checklist.md` (dấu ✅ mỗi mục). Commit riêng.

- **D-59 · 2026-07-19 · derived · pt — `pt` (tiếng Bồ Đào Nha, baseline pt-BR)
  build HOÀN TẤT, trạng thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG
  FROZEN (ADR-014).** 24 hiện tượng trong `rules/languages/pt/coverage.json`;
  4 `.rules.json` khớp khuôn ja/en/es/de/it. Dataset thật: CLDR pt, UD
  Portuguese-GSD (word-class, Brazil), WikiPron `por_latn_bz_broad_filtered`
  (187421 cặp, Brazil). Corpus 21377 câu (UD GSD+Bosque). **g2p-check** xác
  nhận 9 quy tắc chữ→âm sạch (<1% mỗi cái): nh→[ɲ] 0.40%, lh→[ʎ] 0.08%, ç→[s]
  0.03%, ch→[ʃ] 0.99%, ti→[t͡ʃ] 0.39% (vòm hoá Brazil), di→[d͡ʒ] 0.26%, l
  cuối→[w] 0.21%, ão→[ɐ̃ w̃] 0.08%, rr→[ʁ]/[x]/[h] 0.15% → `grapheme_to_phoneme`
  + `nasalization` VALIDATED high. **Phát hiện real-data:** ão bắn 100% lần
  đầu do âm WikiPron cách nhau dấu cách ([ɐ̃ w̃] = 2 token) → sửa regex theo dữ
  liệu → 0.08%. **corpus-check** month-weekday 1.64% (351/21377, tên riêng/quy
  ước cũ, dưới ngưỡng). Đặc trưng Bồ: nguyên âm mũi, co kết giới từ+mạo từ
  (do/da/no/na/ao/à/pelo), ser/estar, vòm hoá ti/di. HONORIFIC not-applicable
  (tiền lệ es B-02). 3 mục review-checklist tự quyết (không có owner, đều chốt
  ở VÒNG 1 đồng thuận): D-pt-01 baseline pt-BR, D-pt-02 chỉ dạy você (không
  chia tu), D-pt-03 chấm điểm dấu — tự áp tiền lệ es B-03 (cảnh báo nhẹ) →
  `answer_acceptance_pt` giữ DRAFT. Sự kiện ngôn ngữ Bồ thuần tuý →
  `native-review-pt.md`. `catalog.json` pt.ruleStatus NOT_STARTED →
  VALIDATED_NOT_YET_PROVEN. Không đụng playable config/lesson hay ngôn ngữ
  khác. Commit riêng.

- **D-60 · 2026-07-19 · derived · ru — `ru` (tiếng Nga, ru-RU, chữ Kirin)
  build HOÀN TẤT, trạng thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG
  FROZEN (ADR-014). Ngôn ngữ T1 Kirin (Cyrillic) đầu tiên.** 24 hiện tượng
  trong `rules/languages/ru/coverage.json`; 4 `.rules.json` khớp khuôn ja/en/
  es/de/it/pt. Dataset thật: CLDR ru (33 chữ Kirin), UD Russian-GSD
  (word-class), WikiPron `rus_cyrl_narrow` (466668 cặp — chỉ có bản narrow).
  Corpus 22736 câu (UD GSD+SynTagRus). **g2p-check** xác nhận phụ âm độc lập
  trọng âm sạch: ш→[ʂ] 0.03%, щ→[ɕ] 0.28%, ц→[ts] 0.16%, х→[x] 0.34%, ч→[t͡ɕ]
  4.33% (чн→[ʂn]); và LÀM CÂM CUỐI TỪ (final devoicing) г→[k] 2.35%, б→[p]
  2.29%, д→[t] 0.58%, з→[s] 3.12% → `grapheme_to_phoneme` + `palatalization`
  VALIDATED. **Kỷ luật dữ liệu:** ж→[ʐ] bắn 7.13% → truy ra do câm cuối từ
  (Анкоридж→[...ʂ]) + дж loanword, tách thành quy tắc final-devoicing riêng.
  **Nguyên âm giảm (akanye)** phụ thuộc TRỌNG ÂM tự do KHÔNG đánh dấu → không
  g2p-check được bằng regex tĩnh, để medium (ghi rõ, không giả vờ high).
  **corpus-check** month-weekday **0.00%** (22736 câu). Đặc trưng Nga: 6 cách,
  palatal hoá cứng/mềm, thể động từ, số đếm chi phối cách, không mạo từ/không
  быть hiện tại. Hình thái nặng (cách/thể/trọng âm di động) phần lớn ở
  lexical_level chờ bảng dữ liệu + native review. HONORIFIC not-applicable
  (tiền lệ es B-02). 3 mục review-checklist tự quyết (không có owner, đều chốt
  vòng 1): D-ru-01 baseline ru-RU, D-ru-02 chấm ё/е+trọng âm (tự áp es B-03),
  D-ru-03 hiển thị dấu trọng âm trợ đọc (tiền lệ romaji ja ẩn-có-toggle) →
  `answer_acceptance_ru` + `reading_aid_policy` giữ DRAFT. Sự kiện ngôn ngữ Nga
  thuần tuý → `native-review-ru.md`. `catalog.json` ru.ruleStatus NOT_STARTED
  → VALIDATED_NOT_YET_PROVEN. Không đụng playable config/lesson hay ngôn ngữ
  khác. Commit riêng.

- **D-61 · 2026-07-19 · owner · pt,ru — Owner DUYỆT 6 giả định sản phẩm của
  pt/ru (chốt các mục TỰ QUYẾT ở D-59/D-60).** Cập nhật này CHỈ là tracking
  duyệt — KHÔNG đổi status ngôn ngữ (cả hai vẫn `VALIDATED_NOT_YET_PROVEN`,
  KHÔNG FROZEN), KHÔNG đụng rule/coverage/lesson.
  - **D-pt-01 → DUYỆT:** baseline **pt-BR** (Brazil).
  - **D-pt-02 → DUYỆT:** chỉ dạy **você**, không dạy chia `tu`.
  - **D-pt-03 → DUYỆT:** thiếu dấu/cedilha **cảnh báo nhẹ** (tiền lệ es B-03);
    GIỮ `answer_acceptance_pt` ở **DRAFT**.
  - **D-ru-01 → DUYỆT:** baseline **ru-RU**.
  - **D-ru-02 → DUYỆT:** chấm **ё=е** + normalize bỏ dấu trọng âm; GIỮ
    `answer_acceptance_ru` ở **DRAFT**.
  - **D-ru-03 → DUYỆT:** hiển thị dấu trọng âm làm trợ đọc, mặc định trình độ
    đầu + ẩn-có-toggle (tiền lệ romaji ja); GIỮ `reading_aid_policy` ở **DRAFT**.
  - **Các mục `native-review-pt.md` (7) / `native-review-ru.md` (7) GIỮ
    NGUYÊN** chờ người bản ngữ (bảng cách/thể, giống danh từ, độ tự nhiên...):
    owner KHÔNG tự duyệt được, không đánh dấu duyệt.
  - Ghi vào: `rules/languages/pt/review-checklist.md`,
    `rules/languages/ru/review-checklist.md` (dấu ✅ mỗi mục). Commit riêng.

- **D-62 · 2026-07-19 · derived · nl — `nl` (tiếng Hà Lan, nl-NL) build HOÀN
  TẤT, trạng thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN
  (ADR-014).** 24 hiện tượng; 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru.
  Dataset thật: CLDR nl, UD Dutch-Alpino (word-class), WikiPron
  `nld_latn_broad_filtered` (58535 cặp). Corpus 30723 câu (UD Alpino+
  LassySmall). **g2p-check** xác nhận: ch→[x] 18.69% (-isch→[s]), ij→[ɛ i̯]
  11.30%, ui→[œ y̯] 2.92%, oe→[u] 0.41%, sch 0.74%, aa→[aː] 0.17%, oo→[oː]
  2.35%, ng→[ŋ] 9.01%, ge→[ɣ] 15.58%; làm câm cuối từ d→[t] 0.59%, b→[p]
  4.49% → `grapheme_to_phoneme` + `final_devoicing` + `vowel_length_spelling`
  VALIDATED. **Kỷ luật dữ liệu:** (1) ij/ui bắn 100% do âm cách nhau dấu cách +
  dấu phi-âm-tiết [i̯]/[y̯] → sửa regex → 11.30%/2.92%. (2) g phẳng bắn 21.98%
  (>ngưỡng) vì ng nuốt g → tách ng→[ŋ] + ge→[ɣ] riêng. **corpus-check**
  month-weekday **0.09%** (tên riêng ngày lễ). Đặc trưng: de/het, V2 + động từ
  cuối, âm hầu [x]/[ɣ], động từ tách, giảm nhẹ -je, tên ngôn ngữ/quốc tịch
  viết hoa. HONORIFIC not-applicable (es B-02). D-nl-01 baseline nl-NL, D-nl-02
  chấm trema/dấu (es B-03) → `answer_acceptance_nl` DRAFT. Sự kiện Hà Lan thuần
  tuý → `native-review-nl.md`. `catalog.json` nl.ruleStatus NOT_STARTED →
  VALIDATED_NOT_YET_PROVEN. Không đụng playable config/lesson hay ngôn ngữ khác.
  Commit riêng.

- **D-63 · 2026-07-19 · derived · pl — `pl` (tiếng Ba Lan, pl-PL) build HOÀN
  TẤT, trạng thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN
  (ADR-014). Ngôn ngữ Slav Latin-script phức tạp (7 cách, thể, giống
  nam-người).** 25 hiện tượng; 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/
  nl. Dataset thật: CLDR pl, UD Polish-PDB (word-class), WikiPron
  `pol_latn_broad` (157042 cặp). Corpus 35926 câu (UD PDB+LFG). **g2p-check**
  xác nhận 15 quy tắc chữ→âm sạch (0.00–3.69%): sz/cz/rz/ch/ł/dz/ć/ń/ś/ż + ą/ę
  mũi + làm câm cuối từ b/d/g → `grapheme_to_phoneme` + `final_devoicing` +
  `consonant_palatalization` + `nasal_vowels` VALIDATED. **Kỷ luật dữ liệu
  (VÒNG 4):** (1) rz phẳng bắn 61.27% → rz làm câm [ʂ] sau vô thanh + cuối từ;
  thêm [ʂ] → 3.69%. (2) dz phẳng bắn 67.02% → 'dzi' làm mềm [d͡ʑ]; thêm →
  0.84%. **corpus-check** month-weekday **0.02%** (họ người). Đặc trưng: 7 cách
  (có wołacz), giống nam-người, Pan/Pani ngôi 3 (không có 'vy' kiểu ru), trọng
  âm đều, dấu-là-chữ. HONORIFIC not-applicable (es B-02). D-pl-01 baseline
  pl-PL (vòng 1); D-pl-02 chấm thiếu dấu — dấu Ba Lan là CHỮ không phải accent,
  cân nhắc tới VÒNG 2 (cách app xử lý), chọn cảnh báo nhẹ có chú thích →
  `answer_acceptance_pl` DRAFT (điểm khác bản chất es/it/pt/nl, cần owner duyệt
  rõ). Sự kiện Ba Lan thuần tuý → `native-review-pl.md`. `catalog.json`
  pl.ruleStatus NOT_STARTED → VALIDATED_NOT_YET_PROVEN. Không đụng playable
  config/lesson hay ngôn ngữ khác. Commit riêng.

- **D-64 · 2026-07-19 · owner · nl,pl — Owner DUYỆT 4 giả định sản phẩm của
  nl/pl (chốt D-62/D-63), có 1 OVERRIDE quan trọng cho pl.** Cập nhật tracking
  duyệt + 1 thay đổi nội dung coverage (answer_acceptance_pl). KHÔNG đổi status
  ngôn ngữ (cả hai vẫn `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN).
  - **D-nl-01 → DUYỆT:** baseline **nl-NL** (không Flemish).
  - **D-nl-02 → DUYỆT:** trema/dấu **cảnh báo nhẹ** (tiền lệ es B-03); GIỮ
    `answer_acceptance_nl` ở **DRAFT**.
  - **D-pl-01 → DUYỆT:** baseline **pl-PL**.
  - **⚠️ D-pl-02 → owner CHỌN C (KHÔNG phải B tôi đề xuất):** thiếu/sai dấu Ba
    Lan = **SAI**, KHÔNG chấp nhận như đáp án đúng. **Lý do owner:** dấu Ba Lan
    là CHỮ CÁI thật (ł≠l, ó≠u), gõ thiếu là sai chính tả — dạy đúng như người
    Ba Lan viết; học viên nghiêm túc (sang Ba Lan sống/làm) phải dùng bàn phím
    Ba Lan cho mọi việc, nên học gõ đúng từ đầu là kỹ năng thật. Đây là quyết
    định **khác tiền lệ es B-03** (owner chủ động chọn nghiêm hơn vì bản chất
    "dấu là chữ" của pl). `answer_acceptance_pl` đã cập nhật theo hướng C
    (chấm khớp-đúng chuẩn, dấu bắt buộc, không normalize, không cảnh-báo-nhẹ)
    và **nâng VALIDATED** (quyết định đã dứt khoát, không cần UI cảnh-báo-nhẹ).
  - **📝 GHI CHÚ APP (không phải rule, KHÔNG làm bây giờ):** với ngôn ngữ có dấu
    là chữ cái riêng (như pl), app NÊN NHẮC người dùng cài/dùng bàn phím ngôn
    ngữ đó (bàn phím hệ thống), thay vì tự xây nút nhập ký tự trong bài. Thuộc
    UX app — ghi lại đây + `pl/review-checklist.md` + `pl/coverage.json`
    (answer_acceptance_pl note) để lần sau nhớ; chưa triển khai trong task
    build-rule.
  - **Các mục `native-review-nl.md` (6) / `native-review-pl.md` (7) GIỮ NGUYÊN**
    chờ người bản ngữ. Ghi vào: `nl/review-checklist.md`, `pl/review-checklist.md`
    (dấu ✅), `pl/coverage.json` (answer_acceptance_pl → C/VALIDATED). Commit riêng.

- **D-65 · 2026-07-19 · derived · sv — `sv` (tiếng Thụy Điển, sv-SE) build HOÀN
  TẤT, trạng thái `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN
  (ADR-014).** 23 hiện tượng; 4 `.rules.json` khớp khuôn ja/en/es/de/it/pt/ru/
  nl/pl. Dataset thật: CLDR sv, UD Swedish-Talbanken (word-class), WikiPron
  `swe_latn_broad` (**5856 cặp — bộ nhỏ**, ghi rõ). Corpus 11734 câu (UD
  Talbanken+LinES). **g2p-check** xác nhận sj→[ɧ] 4.08%, tj→[ɕ] 7.25%, ä→[ɛ]
  1.65%, ö→[ø] 2.49%, å→[oː] 1.25% → `grapheme_to_phoneme` VALIDATED.
  **Phát hiện thật (kỷ luật dữ liệu):** mềm hoá âm đầu ^k[eiyäö]→^ɕ bắn 48%,
  ^g→^j 42%, ^sk→^ɧ 35% — KHÔNG lên VALIDATED: dấu pitch ¹/² chặn ^anchor +
  dataset nặng TỪ MƯỢN giữ cứng (keff/gebit/gem/skeptisk) hoặc g→[ɧ] (Pháp);
  quy tắc đúng cho từ bản ngữ nhưng hạn chế theo nguyên từ → giữ **medium**,
  không giả vờ high. **corpus-check** month-weekday **0.00%** (11734 câu). Đặc
  trưng: hậu tố xác định (bilen/huset) + xác định kép, en/ett, V2, ĐỘNG TỪ
  KHÔNG CHIA THEO NGÔI (thuận lợi), sj-ljud, du phổ quát (du-reformen). HONORIFIC
  not-applicable (es B-02). D-sv-01 baseline sv-SE (vòng 1); D-sv-02 chấm thiếu
  å/ä/ö — TỰ ÁP TIỀN LỆ pl D-64 (å ä ö là chữ cái → thiếu = SAI, phương án C),
  giữ `answer_acceptance_sv` DRAFT + flag owner (áp tiền lệ sang ngôn ngữ mới,
  không tự nâng VALIDATED như pl); D-sv-03 du phổ quát (vòng 2). Ghi chú app
  (như pl D-64): nhắc dùng bàn phím Thụy Điển. Sự kiện Thụy Điển thuần tuý →
  `native-review-sv.md`. `catalog.json` sv.ruleStatus NOT_STARTED →
  VALIDATED_NOT_YET_PROVEN. Không đụng playable config/lesson hay ngôn ngữ khác.
  Commit riêng.

## 12. Tách mục tiêu playable (rule) khỏi native (dịch) — 2026-07-19

- **⭐ D-55 · 2026-07-19 · owner · ALL — TÁCH BẠCH hai loại mục tiêu ngôn ngữ,
  thay D-01.** Sửa nội dung này chỉ là **tracking/tài liệu** — KHÔNG build rule,
  KHÔNG chạy `/build-language`, KHÔNG đụng lesson/coverage/`generate-curriculum`/
  `language_options`.
  - **PLAYABLE = 33 ngôn ngữ** (ngôn ngữ được HỌC). Cần **build rule**
    (`/build-language`) cho từng cái. Chọn đúng 33 vì gắn với giới hạn voice của
    **Azure Pronunciation Assessment (~33 ngôn ngữ, tính năng chấm phát âm gói
    Max)** — build rule cho ngôn ngữ không ai học/không có voice là công thừa.
    Mục tiêu build rule GIẢM từ 60 (D-01 cũ) → **33**.
  - **NATIVE = 60 ngôn ngữ** (tiếng mẹ đẻ người học, để DỊCH NGHĨA/giải thích).
    Chỉ cần **bản dịch nghĩa**, KHÔNG cần rule. **33 playable NẰM TRONG 60
    native** (một ngôn ngữ có thể vừa được học vừa là tiếng mẹ đẻ). 27 ngôn ngữ
    chênh (60−33) CHỈ cần dịch.
  - **Thứ tự owner chốt:** build rule 33 playable **TRƯỚC**, làm dịch 60 native
    **SAU**. (Bước 2026-07-19 chỉ ghi nhận mục tiêu, chưa thực thi.)
  - **Hai danh sách chính thức (mã ISO)** lưu ở `rules/catalog.json._meta.languageTargets`:
    - `playable33_needRule` (33): en, ja, ko, zh, es, fr, de, it, pt, ru, vi, ar,
      nl, pl, sv, tr, el, cs, da, fi, nb, ro, th, id, hi, he, uk, hu, fil, ms, bg,
      hr, ca. **Đã build 7:** ja/en/vi/zh (FROZEN rule-level), ko/es/fr
      (VALIDATED_NOT_YET_PROVEN). **Còn 26** = NOT_STARTED.
    - `nativeOnly27_noRule` (27): fa, ur, bn, my, ta, te, mr, yue, km, lo, sk, lt,
      ne, si, gu, pa, kn, ml, sw, am, ha, yo, zu, mn, kk, uz, sr.
  - **Mã cần owner xác nhận:** `nb` (owner ghi "Tiếng Na Uy" chung — dùng Bokmål
    khớp Azure `nb-NO`, không phải `nn` Nynorsk); `fil` (owner ghi "Tagalog"=ISO
    `tl` — dùng `fil` để khớp catalog cũ + voice Azure `fil-PH`, vì 33 gắn với
    voice); `yue` (Quảng Đông, ISO 639-3, mã mới).
  - **Mâu thuẫn với repo (BÁO owner, KHÔNG tự hòa giải):** (a) 7 mã `af, sl, lv,
    et, is, ga, eu` đang trong `catalog.languages[]` nhưng KHÔNG thuộc 60 native
    của owner — giữ nguyên, đánh `target=review_pending_not_in_owner_60`, chờ
    owner quyết giữ/bỏ; (b) 7 mã native-only mới `yue, ha, yo, zu, mn, kk, uz`
    chưa có dòng trong `languages[]` — ghi ở `_meta.languageTargets` là
    authoritative, chưa thêm dòng (native-only không cần rule, `languages[]` là
    lớp theo dõi rule); (c) `shared/config/native_language_options.json` có **100**
    entry và `scripts/validate-curriculum.mjs` (~dòng 1128) ÉP CỨNG native ≥ 100
    — KHÁC target 60; nằm ngoài phạm vi bước tracking này (shared/ + validator
    curriculum), CHƯA sửa.
  - `catalog._meta.targetCount` giữ 60 = số dòng sanity-check của `languages[]`
    (native universe), **KHÔNG phải rule target**; rule target = `ruleTargetCount`
    (33). Field `target` trên mỗi entry là phân loại authoritative 2026-07-19;
    field `roles` cũ (mô hình D-01) KHÔNG cập nhật ở bước này.

---

## Ghi chú (không phải quyết định đã chốt)

- Giao diện thẻ từ vựng (collapsed: target + reading + audio; expanded: meaning +
  usage + example + translation + note) là **spec sản phẩm**, do owner cung cấp
  file riêng — **không** thuộc `rules/languages/`. Ghi lại đây chỉ để tham chiếu.
- Danh sách ngôn ngữ owner tự đánh giá được (dùng cho Bước 4): **vi, ja, en**.
  Cập nhật khi thay đổi.
