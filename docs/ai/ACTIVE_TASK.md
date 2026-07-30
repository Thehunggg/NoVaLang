# NovaLang Active Task — Task hiện tại

## Cuối phiên 2026-07-24

### ĐÃ XONG
- **Vá hệ luật G1–G9** (độ tin cậy ngôn ngữ + Tầng X) vào
  `LESSON_AUTHORING_STANDARD.md`.
- **Dựng tầng nguồn ja trong `local-sources/`** — Irodori / hanabira / JMdict /
  kanji-data / open-anki đọc được; sách scan N-level (Nihongo Sou Matome N1–N5,
  N5 まるごと) không đọc được (toàn ảnh, cần OCR). Danh mục đầy đủ + trạng thái
  "chữ thật / ảnh scan" trong `scripts/content/sources/ja.md`. `local-sources/`
  đã gitignore 100%.
- **Gộp nhánh + ĐƯA MAIN LÊN:** `origin/main` giờ = `62083af` (bản đầy đủ nhất) —
  fast-forward thuần từ `claude/build-language-jp-o91o6h`, 0 xung đột, không merge
  commit. **Mốc quay lại nếu cần: `fceae1b`.** **Từ nay branch ngôn ngữ mới TỪ
  `main`** (không tách từ branch build-language cũ nữa).
- **Sửa hết bug frontend đã rà:** gom danh sách locale vi/en/ja về nguồn tập
  trung (`shared/nativeLanguages.ts`); chặn bấm ngôn ngữ `coming_soon` (web ×3 +
  Flutter); `kanaExplanation` → key i18n (`LessonPage`); `CoursePath` localize
  cho mọi ngôn ngữ (bỏ nhánh chỉ `vi`); dọn sentinel `⟦missing⟧` + nhánh `es`
  chết + 4 component web chết + placeholder "sẽ bổ sung" trên thẻ Exercise;
  **thống nhất Free/Plus** — web + Flutter cùng đọc field `plan` (Q1–9 free,
  Q10–14 khóa), Flutter bỏ hard-code `index==9`.

### CẦN KIỂM TAY (local, có Flutter SDK — cloud không test được)
- **Paywall:** Q1–Q9 free, Q10 khóa (commit `62083af`) — chạy `flutter test` +
  kiểm tay để chốt runtime.
- **Màn đăng nhập / onboarding redesign** chạy đúng.

### CÒN TREO — cần LOCAL (có nguồn thật)
- Trích **subset JMdict** (112MB → JSON nhỏ dùng được).
- Tạo **danh sách cụm cố định ja** (quét bài + đối chiếu nguồn, chống nhiễm độc,
  **OWNER DUYỆT** trước khi dùng).
- **Rà + sửa L2/L3** (câu `私もよろしくお願いします` + đối chiếu nguồn thật).
- **Build bài tiếp theo** theo G1–G9 + nguồn.

### DỌN DẸP (tùy chọn)
- Xóa 2 nhánh đã gộp trọn vào main: `fix/curriculum-quality-gates`,
  `rescue/login-onboarding-redesign`.

### TỒN ĐỌNG owner tự làm
- Xóa 9 file thừa trong `local-sources/`.
- Xác minh điều khoản bản quyền Irodori + loại giấy phép CC của hanabira.

## CÒN LẠI — 2 VIỆC UI/NỘI DUNG LỚN, ĐÃ RÀ XONG CHƯA SỬA — 2026-07-25

Owner giao 5 việc sau khi test app. **Việc 3, 4, 5 đã xong và push.** Hai việc
dưới đây mới chạy xong bước RÀ (chính là bước owner yêu cầu làm trước); phần sửa
chưa làm.

### VIỆC 1 — UI bài tổng hợp phải giống UI bài tập lesson

Đã đo bằng cách đếm widget dùng ở hai màn. **Khác nhau ở 5 chỗ cụ thể:**

| | bài tập lesson (`five_card_exercise_flow.dart`) | bài tổng hợp (`unit_comprehensive_test_screen.dart`) |
|---|---|---|
| Khung trang | `ResponsivePage` | **không có** — bố cục/bề ngang khác hẳn |
| Phương án | `ExerciseActionOptionChip` + `ExerciseOptionStyle` (hệ token dùng chung) | **không có** — tự dựng bằng `AppCard` |
| Thanh tiến độ | `LinearProgressIndicator` | **không có** |
| Nghe câu | `SpeakerButton` | **không có** |
| Phản hồi đúng/sai | panel dùng `correctMessage` + `ExerciseOptionColors` | tự dựng riêng |

→ Hướng sửa: **tái dùng** `ResponsivePage` + `ExerciseActionOptionChip` +
`ExerciseOptionStyle` + `SpeakerButton`, thêm thanh tiến độ. Giữ khác biệt bắt
buộc (3 ô thay 1 ô) nhưng cùng phong cách. **Không đụng logic chấm.**

### VIỆC 2 — mọi kanji phải có hiragana — XONG 2026-07-25

**217 → 0.** Gắn furigana ở MỘT chỗ: pass cuối trong ,
dùng  (kuromoji, cùng bộ phân tích với đường
La-tinh hoá). Đo thật: gắn 446 chuỗi, bỏ qua 131 chuỗi đã có furigana.

**GOLDEN L1 ĐÃ BỊ ĐỤNG** — owner cho phép, chỉ để thêm furigana. Không đổi câu
chữ, không đổi đáp án, không đổi thứ tự. Khoá nội dung Golden (ADR-008) nay so
phần ĐÃ BÓC furigana ở cả validator, smoke và 2 test Flutter — vẫn bắt mọi thay
đổi câu chữ thật, không báo động vì một chú âm.

Luật ghi ở §B2d. Validator kiểm MỨC CỨNG, chỉ ngôn ngữ ja (tiếng Trung cũng
dùng chữ Hán nhưng không có furigana). Sau khi sửa: 0 lỗi.

### VIỆC 1 — UI bài tổng hợp giống UI bài tập — XONG 2026-07-25

Tái dùng 4/5. Chỗ thứ 5 phải TÁCH ra mới dùng chung được: panel phản hồi vốn là
`_Feedback` private trong `five_card_exercise_flow.dart` và bám kiểu
`PracticeExercise`, nên đã tách phần hình thức thành
`widgets/learn/exercise_feedback_panel.dart` (chỉ nhận chuỗi) — cả hai màn cùng
dùng, không copy code.

| Thành phần | Cách xử |
|---|---|
| Khung trang | `Scaffold` + `AppBar` tiêu đề `n/N` + `Responsive.pagePadding` — đúng khung mà màn bài tập dùng cho MÀN CÂU HỎI (`ResponsivePage` là của màn landing, không phải màn làm bài) |
| Hệ chip phương án | `ExerciseActionOptionChip` + bảng `ExerciseOptionVisualState` |
| Thanh tiến độ | `LinearProgressIndicator` ở `AppBar.bottom` |
| Nút nghe | `SpeakerButton`, CHỈ hiện sau khi chấm (đọc trước là lộ đáp án) |
| Panel phản hồi | `ExerciseFeedbackPanel` mới tách, dùng chung |

Khác bắt buộc còn giữ: mỗi phương án điền 2–3 ô, nên chip có thêm dòng
`①… ②…` bên dưới nhãn — vẫn trong cùng một chip, một vùng bấm, một bảng màu.

**Chưa kiểm được bằng test — owner tự xem khi chạy app:** chip nhiều dòng có bị
tràn/xuống dòng xấu ở màn hẹp không, và khoảng cách giữa các khối đọc có thoáng
như màn bài tập không. Test chỉ khẳng định ĐÚNG widget được dùng, không khẳng
định bố cục nhìn đẹp.
## CÒN LẠI — GHI NGUỒN 25 CÂU BÀI TỔNG HỢP + REGISTRY — 2026-07-25

**CHƯA LÀM.** Hạ tầng xong hết, chỉ còn bước ghi nội dung. Owner đã duyệt cả 3
đợt; nội dung nằm ở 2 bản đọc trên Desktop:
`ban-doc-18-cau-KHOI-PHUC-OGENKIDE.txt` (câu 1–18) và
`ban-doc-dot3-cau-19-25.txt` (câu 19–25).

### ĐÃ RÀ XONG — quy tắc 2^N cho `acceptedAnswers` của 12 ô đợt 3

N = số **nhóm kanji độc lập** trong cụm → 2^N dạng viết hợp lệ. Kết quả rà:

| ô | cụm | nhóm kanji | cần | bản đọc có | |
|---|---|---|---|---|---|
| 19-① | おはようございます | – | 1 | 1 | ok |
| 20-① | お名前 | 名前 | 2 | 2 | ok |
| 21-① | こちらこそ | – | 1 | 1 | ok |
| 21-② | よろしくお願いします | 宜·願 | **4** | **3** | **THIẾU `宜しくおねがいします`** |
| 22-① | すみません | – | 1 | 1 | ok |
| 22-② | もう一度 | 一度 | 2 | 2 | ok |
| 23-① | お先に失礼します | 先·失礼 | 4 | 4 | ok |
| 23-② | 来週 | 来週 | 2 | 2 | ok |
| 24-① | さんですね | – | 1 | 1 | ok |
| 24-② | はじめまして | 初 | 2 | 2 | ok |
| 25-① | そうですか | – | 1 | 1 | ok |
| 25-② | お元気で | 元気 | 2 | 2 | ok |

→ Đúng **một** chỗ thiếu, owner đã chỉ ra chính xác. Tổng biến thể sau khi bổ
sung: **23** chuỗi cho 12 ô (bản đọc ghi 22).

### Việc còn phải làm

1. Viết file nguồn 25 câu (dùng helper `seg` · `blankSeg` · `blank` ·
   `choiceOption` · `dialogueTurn` · `review` của
   `scripts/lib/unit-comprehensive-test.mjs`).
2. Bổ sung `宜しくおねがいします` vào ô 21-②.
3. Thêm dòng dịch vi/en/ja cho MỌI chuỗi tiếng Việt (prompt · context ·
   explanation · hint) — thiếu một dòng là `localizeSupport` throw, không lọt
   âm thầm.
4. Đăng ký một dòng vào `UNIT_COMPREHENSIVE_REGISTRY`
   (`scripts/lib/unit-comprehensive-test.mjs:357`).
5. `generate → sync → validate → smoke`. Generator tự ép: số câu theo mức, số ô
   theo loại, 4 phương án phủ đủ ô, reviews nằm trong unit (§G7), 2–3 lượt hội
   thoại, tỉ lệ ô cuối câu, trộn xen kẽ lesson. Throw thì **sửa nội dung**,
   không nới ngưỡng.
6. `flutter run` → bấm bài tổng hợp phải ra 25 câu thật (hết snackbar "đang
   chuẩn bị"). Paywall đã mở sẵn ở debug, không cần cờ.

### Hạ tầng đã sẵn sàng (không còn vướng gì)

- generator + validator + màn hình UI thật: xong (ADR-022).
- Mở khoá Plus khi debug: mặc định BẬT, chỉ cần `flutter run`.
- Normalizer đã xoá sạch dấu cách cho ja/zh → ô tự gõ chấm đúng.
- `UnitComprehensiveTest.languageCode` đã parse từ dữ liệu.

## UNIT 2 — BƯỚC 1 XONG (u2-l1), BƯỚC 2 CHƯA LÀM — 2026-07-27

`ja-daily_life-m01-u2-l1` 「知り合いにあいさつする」 đã ghi data và push
(`b5daa49`). 6 thẻ · 3 hội thoại · 3 mẫu · 14 bài tập. Golden L1/L2/L3 trong
bản sinh: byte-identical (kiểm bằng so chuỗi JSON, không phải đếm).

### Bài học rút ra — quy tắc NGUYÊN VĂN bắt được lỗi mà G1–G9 không bắt

Owner nhắc: "bí thì lấy nguyên văn trong nguồn, không tự ghép từ mảnh". Rà
lại bản đọc theo luật đó thì ngoài 3 chỗ owner chỉ, **tôi tự bắt được chỗ
thứ 4 của chính mình**: 「また会いましょう」 — 0 lượt trong local-sources, do
tôi ghép また (L3) + 会いましょう (nguồn). Kéo theo cả mẫu ngữ pháp
「また＋động từ ましょう」 cũng phải bỏ vì đó là quy tắc sinh tôi tự suy ra.

→ **Cách kiểm đáng tin:** grep NGUYÊN CỤM trong `local-sources/`, không grep
từng mảnh rồi tự nối. Mảnh nào cũng có nguồn không có nghĩa là cụm ghép có
nguồn.

Đã bỏ vì 0 lượt: `どうも` (chào đứng một mình) · `また会いましょう` ·
`お久しぶりです`. Thay bằng `また会おう。` và `ではまた。` (đều nguyên văn
hanabira, phủ đúng hai mức thân mật/lịch sự).

### Hai ràng buộc validator ép khuôn (không phải ý tôi)

`validateFiveCardsStructure` bắt Q10 phải **đúng 6 tin nhắn / 2 ô** và Q13
phải **đúng 6 ô**. Chưa rà xem đây là luật thật của Format 2.0 hay là con số
lấy từ Golden rồi hoá cứng (giống ca "đúng 8 thẻ từ vựng" đã sửa thành khoảng
6–15 ở ADR-019 amendment). **Nếu bài sau lại vướng thì rà trước khi chiều
theo** — đừng bẻ nội dung cho vừa một con số chưa ai kiểm.

### CÒN LẠI

- **BƯỚC 2: u2-l2 「Đáp lời hỏi thăm」** (お元気ですか + cách đáp) — tên bài do
  **owner chốt 2026-07-28** (đã đổi trong blueprint + data; **KHÔNG lấy tên bài
  của Irodori** 「日本に来てどのぐらいですか？」 — chép tên bài là chép cách họ
  chia chương trình). Xuất bản đọc cho owner duyệt TRƯỚC, chưa ghi data. Đã biết
  trước: 「お元気ですか」 có nguyên văn ở cả n5 và hanabira; **câu ĐÁP lại thì
  CHƯA quét nguồn** — phải quét trước khi viết, không có nguyên văn thì báo chứ
  không tự chế.
  **Bài này là bài ĐẦU TIÊN áp §G11** (chia việc theo tầng nguồn, không dồn một
  nguồn) — phải mở đủ nguồn theo bảng tầng trong `scripts/content/sources/ja.md`
  và báo cáo kèm **bảng "phần nào lấy từ nguồn nào"** (§G11.4). Phải chạy ở
  **LOCAL** vì cần mở `local-sources/` (cloud không có).
- **Bài tổng hợp Unit 2 (18 câu)** — việc riêng, sau khi cả hai lesson duyệt.

## NỢ NỘI DUNG — 「お元気で」 thẻ từ vựng ĐÁ NHAU với hội thoại cùng bài — 2026-07-25

Cần **NGƯỜI BẢN NGỮ** quyết. **CHƯA sửa gì** — không sửa thẻ, không sửa hội thoại.

`ja-daily_life-m01-u1-l3` · `vocabularyDetails[ogenki-de].overview`:

> "Giữ sức khỏe nhé (KHI LÂU MỚI GẶP LẠI)."

Nhưng `dialogueGroups` **đã duyệt của chính L3** ghép nó với mốc NGẮN HẠN:

- [Rời lớp một cách lịch sự] 「また明日。お元気で。」 · 「お元気で。失礼します。」
- [Bạn bè chào tạm biệt] 「また来週。お元気で。」 · 「うん、お元気で。」

Nguồn local không phân xử được: hanabira/n5 gần như chỉ có 「お元気ですか」 (câu
HỎI "có khoẻ không"); duy nhất một chỗ có 「それじゃ、お元気で。」 (lời chia tay).

**GIẢI QUYẾT — Owner chốt quy tắc 2026-07-25 (thay phương án (c) tạm thời trước đó):**

> 「お元気で」 dùng khi mốc chia tay **từ MỘT TUẦN TRỞ LÊN**.
> · また来週 / lâu hơn / không hẹn ngày gặp lại → **ĐÚNG**
> · また明日 / trong vài ngày → **SAI**

Đây là **quyết định của owner**, không suy ra từ nguồn. Nó thay mô tả mập mờ
"khi lâu mới gặp lại" và giải luôn mâu thuẫn trên: hội thoại 「また来週。
お元気で。」 ĐÚNG, hội thoại 「また明日。お元気で。」 SAI.

Đã áp dụng: thẻ `ogenki-de` đổi sang "khi chia tay từ một tuần trở lên"
(`ja-unit1-lesson3.mjs` 4 chỗ + 1 dòng dịch vi/en/ja); 「お元気で」 khôi phục
làm trục đúng/sai ở bài tổng hợp cuối Unit. Quy tắc ghi ở
`scripts/content/sources/ja.md`.

### NỢ CÒN LẠI — 2 chỗ trong L3 dùng 「お元気で」 SAI MỐC (chưa sửa, owner quyết)

Quét toàn bộ L1/L2/L3: **L1 và L2 không dùng 「お元気で」 chỗ nào**. Chỉ L3, và
sai mốc đúng **một câu** 「また明日。お元気で。」 — nhưng câu đó được viết ở
**HAI nơi nguồn khác nhau**, phải sửa cả hai nếu owner đồng ý:

1. `scripts/content/daily-life/module-1/ja-unit1-lesson3.mjs`
   → Card 3, `dialogueGroups[1]` ("Rời lớp một cách lịch sự"), `lines[2]`
2. cùng file → **Q14** `practice.exercises[13]` (`real_world_practice_dialogue`),
   `dialogueLines[4]`

Câu đáp ngay sau đó — `dialogueGroups[1].lines[3]` / `dialogueLines[5]`
「お元気で。失礼します。」 — không tự nó chứa mốc gần, nhưng nằm trong cùng lượt
trao đổi, nên sửa thì phải xét cùng.

**Mâu thuẫn nội bộ sắc hơn:** chính `dialogueGroups[1].explanation[1]` của nhóm
đó ghi "お元気で dùng khi sẽ lâu mới gặp lại" — tức lời giải thích của nhóm đá
lại chính lời thoại của nhóm.

**Hai hướng sửa, owner chọn:**
- (A) đổi 「また明日」 → 「また来週」 trong lượt đó (giữ お元気で), hoặc
- (B) bỏ 「お元気で」 khỏi lượt đó, thay bằng cụm hợp mốc gần.

L3 không frozen nhưng là nội dung ĐÃ DUYỆT → không tự sửa.

**Chưa cập nhật theo quy tắc mới (cùng một mô tả mập mờ, 3 chỗ):** vẫn ghi "lâu
mới gặp lại" ở `dialogueGroups[1].explanation[1]`, `practice.exercises[9]`
`slotFeedback.chat_farewell_slot.explanation`, và `vocabularyReferences[1]
.difference`. Để nguyên vì nằm ngoài phạm vi owner giao (chỉ giao thẻ
`ogenki-de`); nên sửa cùng lượt với quyết định ở trên để L3 nhất quán.

## NỢ KỸ THUẬT — `MAX_TRAILING_BLANK_RATIO` đếm KHÔNG SÁT ý định §E4 — 2026-07-25

Phát hiện khi soạn nội dung ĐỢT 2 (câu 9–18, `dialogue_multi_blank_choice`) của
bài tổng hợp Unit 1. **Chưa sửa code** — ghi lại để làm thành task riêng.

`endsWithBlank()` (`scripts/lib/unit-comprehensive-test.mjs:167-175`) gộp
`segments` của **mọi lượt nói** rồi xét xem **đoạn cuối cùng** có phải ô trống
không:

```js
const last = segments[segments.length - 1];
return Boolean(last && last.blankId);
```

Vấn đề: câu tiếng Nhật luôn kết bằng 「。」, mà 「。」 là một đoạn **văn bản**
(`seg('。')`), không phải `blankSeg`. Nên một câu khoét đúng ngay trước dấu
chấm cuối — tức đúng cái §E4 muốn chặn — vẫn cho `endsWithBlank === false`.
Thực đo trên 10 câu ĐỢT 2: luật máy đếm **0/10**, trong khi đếm theo ý định
§E4 (ô nằm cuối lượt nói cuối, phía sau chỉ còn dấu câu) là **2/10**.

Hệ quả: `MAX_TRAILING_BLANK_RATIO` hiện gần như **không bao giờ kích hoạt** cho
`dialogue_multi_blank_choice` và `sentence_multi_blank_choice` viết theo lối tự
nhiên → luật §E4 đang được giữ **bằng tay trong bản đọc**, không phải bằng máy.

Hướng sửa (chưa làm): bỏ qua các đoạn văn bản chỉ chứa dấu câu kết
(`。` `.` `!` `！` `？` `?`, có thể kèm khoảng trắng) khi tìm đoạn cuối, rồi mới
xét `blankId`. Cần thêm test cho cả hai kind. Không đụng ngưỡng `0.5`.

## NỢ WEB — chuyển cho Codex (env build được `frontend/node_modules`) — 2026-07-20

Ghi lại để không quên (ngoài reminder trong `scripts/check-hardcoded-ui.mjs`).
Hai khoản nợ này **cần Codex** làm ở môi trường có thể cài `frontend/node_modules`
và chạy `tsc -b && vite build` để kiểm chứng — ở env cloud hiện tại không build
được web nên Claude Code không đụng tới (chỉ làm phần verify được: mobile +
Core-Foundation web key-hoá + rule warn).

1. **Web i18n chuẩn (hard-code rải khắp):** `PracticePage` (toàn màn kết
   quả + intro), `AchievementBadge` (cả bảng huy hiệu tiếng Anh),
   `NativeLanguageSelector` (chuỗi tiếng Việt/Anh cứng dòng ~30),
   `LessonPage` (map inline chỉ en/vi/ja + câu giải thích cứng vi/en),
   `CoursePath` (nhánh chỉ `vi`), `LandingPage`, `HomePage` (đã xử phần
   Core Foundation), 4 component chết (`Quiz`/`LanguageCard`/`LessonCard`/
   `Status`). Kèm: **enum nội bộ hiện thô ra UI** (`exercise.type`/`lesson.type`/
   `difficulty`/`itemType` → "multiple choice · beginner"…) ở
   `LessonPage`/`PracticePage`/`ReviewPage`/`MistakesPage`, và **sentinel
   `⟦missing:…⟧`** hiện cho user. Cần key-hoá qua `t()`, lấp ~16 key đang bị
   copy nguyên tiếng Anh vào map `ja`/`es` (`translations.ts`), map enum →
   nhãn localize. **Sau khi dọn xong web → BẬT chặn cứng:** đặt
   `STRICT_WEB = true` trong `scripts/check-hardcoded-ui.mjs` (và/hoặc cho CI
   fail trên web findings).

2. **Web đọc động danh sách ngôn ngữ học (mở 3 tầng khóa en/ja):** web đang
   khóa cứng en/ja ở `LanguageCode = "en"|"ja"` (type), `normalizeLearningLanguage`
   (ép mọi code ≠ ja về "en"), `finishOnboarding(language: LanguageCode)` +
   courses chỉ có en/ja. Để web hiện/chọn được 33 ngôn ngữ (badge coming_soon,
   cho bấm) như mobile → cần mở rộng `LanguageCode` toàn app + xử course rỗng.
   Là task riêng, **cần env build web để `tsc` kiểm chứng**. → Codex.

---

## Lịch sử

Nhật ký các lượt đã xong (2026-07-17 → 2026-07-19) chuyển sang
`docs/ai/ACTIVE_TASK_ARCHIVE.md` ngày 2026-07-30. File này từ nay chỉ giữ
TRẠNG THÁI HIỆN TẠI.
