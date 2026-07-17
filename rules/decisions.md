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
  generated JSON. Gate 5 = review có khoảng cách 48–72 giờ.
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

---

## Ghi chú (không phải quyết định đã chốt)

- Giao diện thẻ từ vựng (collapsed: target + reading + audio; expanded: meaning +
  usage + example + translation + note) là **spec sản phẩm**, do owner cung cấp
  file riêng — **không** thuộc `rules/languages/`. Ghi lại đây chỉ để tham chiếu.
- Danh sách ngôn ngữ owner tự đánh giá được (dùng cho Bước 4): **vi, ja, en**.
  Cập nhật khi thay đổi.
