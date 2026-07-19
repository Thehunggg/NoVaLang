# NovaLang — LESSON AUTHORING STANDARD (chuẩn viết lesson, dùng chung)

**MỘT file duy nhất** cho cả **người viết nội dung** (Claude Code) và **người
build giao diện** (Codex). Không phải nhớ file nào cho ai — đọc đúng phần của
mình:

| Bạn là | Đọc bắt buộc |
|---|---|
| Ai cũng đọc | **PHẦN A — Nguyên tắc chung** |
| Viết nội dung lesson | PHẦN A + **PHẦN B** + **PHẦN D** |
| Build UI / render | PHẦN A + **PHẦN C** + **PHẦN D** |
| Sửa validator/schema | PHẦN A + **PHẦN D** (kèm file:dòng) |

Nguồn: bản chuẩn chính thức của Project Owner (24 nguyên tắc, 2026-07-19) +
các ràng buộc kỹ thuật đối chiếu trực tiếp từ code
(`scripts/validate-curriculum.mjs`, `scripts/smoke-curriculum-flow.mjs`).
Khi mâu thuẫn: **Frozen spec / ADR > bản chuẩn owner > file này**. File này
KHÔNG thay `.cursor/rules/*` hay ADR — nó GOM lại cho dễ dùng.

> **Free/Plus (đã CHỐT 2026-07-19):** **Free = Q1–Q9, Plus = Q10–Q14.** Áp cho
> MỌI lesson kể cả Golden (Owner mở khoá ADR-008 — xem ADR-008 Amendment
> 2026-07-19). Code + Golden đã sửa khớp; viết theo ranh giới này (plan `free`
> cho Q1–Q9, `plus` cho Q10–Q14).

---

## PHẦN A — NGUYÊN TẮC CHUNG (mọi người đọc)

**A1. Áp đồng thời nhiều nguồn.** Mỗi lesson phải khớp CÙNG LÚC: Curriculum +
Lesson Authoring Rules (file này) + Lesson Format/Schema + Golden Lesson +
Language-specific Rule (`rules/languages/<code>/`) + kiến thức đã dạy ở lesson
trước. Không tự đổi curriculum, thứ tự lesson, hay tạo kiến thức ngoài phạm vi.
(Owner §1, §19, §24)

**A2. Kiểm hai chiều trước khi viết.** (Owner §1)
- **DỌC**: Curriculum → Module → Unit → Lesson — phục vụ đúng mục tiêu
  Unit/Module. Curriculum quyết định *học gì* và *thứ tự nào*; không tự đổi.
- **NGANG**: Lesson trước → hiện tại → sau — không dạy lại cũ như mới, không
  mâu thuẫn, không dạy trước hết kiến thức lesson sau, vẫn liên tục tích luỹ.
- Trước mỗi lesson: xác định module/unit/lesson hiện tại, mục tiêu, vocab/grammar
  đã dạy, người học được biết gì, lesson sau dự kiến dạy gì.

**A3. Tích luỹ kiến thức.** (Owner §2, §11)
- Lesson mới phải có **kiến thức mới rõ ràng**; không lấy trọng tâm lesson
  trước làm trọng tâm mới chỉ để đủ nội dung.
- Kiến thức cũ NÊN tái sử dụng trong: ví dụ vocab, dialogue, grammar examples,
  practice, distractor, Q14 — làm **nền**.
- Trong Practice: câu hỏi/ngữ cảnh có thể dùng kiến thức cũ, nhưng **PHẦN LỚN
  đáp án đúng Q1–Q13 phải kiểm tra kiến thức MỚI**. Cũ là nền, mới là trọng tâm
  đánh giá.

**A4. Cấu trúc 5 Card cố định** (không đổi thứ tự): **Intro → Vocabulary →
Dialogue → Grammar → Practice**. (Owner §3; ràng buộc code §D1)

**A5. Naturalness là bắt buộc** cho vocab examples, dialogue, grammar examples,
practice, Q14. (Owner §17) Câu đúng grammar vẫn KHÔNG chấp nhận nếu người bản
ngữ ít nói vậy trong tình huống đó. Luôn xét: người bản ngữ có nói vậy không ·
register phù hợp không · phản ứng hợp lượt trước không · tình huống hợp lý
không. **Không ưu tiên "đúng schema" hơn "tự nhiên" — đạt CẢ HAI.**

**A6. Language-specific Rule tách khỏi rule chung.** (Owner §19) Rule chung ở
đây áp cho mọi ngôn ngữ. Hệ chữ, reading, pronunciation, romanization,
transliteration, TTS, audio locale, quy tắc riêng → do
`rules/languages/<code>/` quyết. Không nhét quy tắc một ngôn ngữ vào rule chung.

**A7. Bản dịch review là giả định, chất lượng vẫn phải cao.** (Owner §20) Giai
đoạn owner review dùng MỘT native language dịch giả định để kiểm — chỉ phục vụ
review, KHÔNG hardcode vào logic, KHÔNG giả định mọi người học dùng native đó.
Dù giả định, bản dịch phải tự nhiên, trôi chảy, đúng ngữ cảnh/sắc thái, giống
người bản ngữ thật — không word-by-word (chỉ dịch sát khi cần giải thích điểm
ngôn ngữ).

**A8. Build & Approval.** (Owner §22, §23) Draft → Owner Review → Revision →
APPROVED → (khi owner yêu cầu) ghi file chính thức. Chưa APPROVED: chỉ build +
sửa theo feedback; KHÔNG tự coi xong, KHÔNG tự ghi Approved/Frozen, KHÔNG tự
tạo file chính thức. Author chủ động theo dõi lesson nào Draft/APPROVED, đang
tới đâu, lesson sau là gì — owner không cần tự nhớ.

---

## PHẦN B — VIẾT NỘI DUNG (cho người viết bài)

**B1. Card 1 — Intro.** (Owner §4) Giúp người học hiểu: đã biết gì, học thêm gì,
tại sao cần, xuất hiện trong tình huống nào, sau lesson làm được gì. NÊN có: kết
nối lesson trước, tình huống thực tế, mục tiêu, ghi chú giao tiếp/văn hoá nếu
cần. KHÔNG viết như danh sách kiến thức khô cứng.

**B2. Card 2 — Vocabulary.** (Owner §5; ràng buộc §D2)
- **6–15 cards** (code ép), phục vụ trực tiếp mục tiêu + kiến thức mới. Không
  lấy trọng tâm lesson trước làm vocab chính chỉ để đủ số.
- `vocabulary` và `vocabularyDetails`: **cùng số lượng, khớp ID 1-1, đúng thứ
  tự** (code ép).
- Mỗi card đủ để hiểu và dùng được: từ/cụm đích, nghĩa native, giải thích cách
  dùng, ví dụ thực tế, **dịch nghĩa TẤT CẢ ví dụ**, pronunciation/audio,
  `reading` nếu Language Rule yêu cầu, register nếu có nghĩa, điểm dễ nhầm nếu
  cần.
- Ví dụ phải là câu có thể xuất hiện thật (không máy móc). Từ đa nghĩa/nhiều
  cách đọc/nhiều register: chỉ giải thích phần hợp trình độ, ghi rõ cách khác
  học sâu ở cấp phù hợp; không đơn giản hoá thành quy tắc tuyệt đối nếu thực tế
  không đúng.

**B3. Card 3 — Dialogue.** (Owner §6; ràng buộc §D3)
- **Đúng 3 nhóm, mỗi nhóm 4–6 dòng** (code ép). Tự nhiên, mục đích giao tiếp
  rõ, lượt sau phản ứng hợp lý với lượt trước, phù hợp tình huống. Trọng tâm là
  kiến thức mới; tái dùng cũ cho phong phú.
- Không ghép vocab+grammar thành câu rời rạc. Câu đúng ngữ pháp vẫn loại nếu
  người bản ngữ ít nói vậy. Ưu tiên Naturalness + Context + Communicative
  Purpose.
- Dùng **character pool** theo hệ thống; KHÔNG dùng placeholder `[Tên]` nếu hệ
  thống yêu cầu nhân vật cụ thể (mọi `speakerId` phải nằm trong
  `approvedCharacterNamePool` — code ép, §D3).

**B4. Card 4 — Grammar.** (Owner §7; ràng buộc §D4) **Đúng 3 patterns** (code
ép), là kiến thức mới hoặc mở rộng hợp lý cái đã học. Không lấy nguyên grammar
trọng tâm lesson trước coi lại là mới. Giải thích dễ hiểu, đúng trình độ, không
khô cứng, không quy tắc tuyệt đối nếu có ngoại lệ. Chỉ dạy một phần cấu trúc lớn
thì giới hạn rõ phạm vi; không dạy toàn hệ thống trong một lesson.

**B5. Card 5 — Practice: 14 items.** (Owner §8; ràng buộc §D5)
- **Free = Q1–Q9, Plus = Q10–Q14** (đã chốt + code khớp): plan `free` cho
  Q1–Q9, plan `plus` cho Q10–Q14.
- Q1–Q13 **graded**; Q14 = `real_world_practice_dialogue`, `nonGraded: true`.

**B6. Tăng độ khó Q1→Q13.** (Owner §9) Tăng dần, KHÔNG phải 13 câu chỉ đổi vocab
cùng kiểu tư duy. Hướng: nhận biết → hiểu nghĩa → ghép nối → tái tạo → hoàn
thành → nghe hiểu → grammar → phản ứng ngữ cảnh → tổng hợp → chủ động tạo → xử
lý tình huống → đánh giá tự nhiên → tái tạo cấu trúc khó hơn. Không tăng khó
bằng kiến thức chưa dạy.

**B7. Khung câu hỏi Q1–Q14 (GỢI Ý, không phải loại cứng từng câu).** (Owner §10;
đối chiếu §D6) Khung để tăng độ khó — Q1 meaning MC · Q2 target-language MC ·
**Q3 matching** · Q4 sentence ordering · Q5 dialogue fill · Q6 listening MC ·
Q7 grammar-fill · Q8 contextual response · **Q9 checkpoint** (tổng hợp, không
phải MC đổi tên) · **Q10 chat_text_fill** · Q11 situation MC · Q12 naturalness
judgement · **Q13 slot_ordering** · **Q14 real_world_practice_dialogue**.
→ **Code CHỈ ép cứng loại của Q3, Q9, Q10, Q13, Q14** (§D6). Các câu còn lại
(Q1/Q2/Q4/Q5/Q6/Q7/Q8/Q11/Q12): người viết chọn loại theo khung gợi ý + độ khó,
KHÔNG bị code trói loại cụ thể.

**B8. Đáp án.** (Owner §11) Practice được dùng kiến thức cũ trong câu hỏi/dẫn/
dialogue/tình huống/distractor/nền, nhưng **phần lớn đáp án đúng Q1–Q13 tập
trung kiến thức MỚI**.

**B9. Distractor.** (Owner §12) Gây nhầm HỢP LÝ, không sai vô nghĩa. Dựa trên:
kiến thức cũ, từ gần nghĩa, cấu trúc dễ nhầm, register sai, đúng grammar sai
context, thứ tự từ sai hợp lý. Câu khó: distractor phải buộc người học hiểu nội
dung + ngữ cảnh mới chọn được. Không để đáp án đúng lộ vì lựa chọn khác vô lý.

**B10. Sentence ordering.** (Owner §13) Token bank = toàn bộ token cần + **ÍT
NHẤT 2 distractor**. Không cho chính xác số token cần. Đáp án A+B+C+D → bank tối
thiểu `[A][B][C][D][X][Y]`. Distractor hợp lý.

**B11. Slot ordering.** (Owner §14) Khó hơn sentence ordering (token nhỏ hơn /
nhiều slot hơn / cấu trúc dài hơn / distractor khó hơn), không dùng kiến thức
chưa dạy, vẫn **ÍT NHẤT 2 distractor**. (Q13 code ép: 6 answerSlots + ≥1
unusedToken — §D6.)

**B12. Matching.** (Owner §15) 2 cột **shuffle độc lập**, không để thứ tự tự
tương ứng, mỗi item mapping rõ, tránh nhiều đáp án cùng đúng nếu không hỗ trợ.
Kiểm tra hiểu thật. (Q3 code ép: 4 pairs, mỗi pair có id/left.id/right.id —
§D6.)

**B13. Listening.** (Owner §16) Dùng audio target language. Kiểm: nghe nội dung
/ hiểu nghĩa / hiểu ý định / chọn phản hồi. **Không hiện nguyên văn audio trước
khi trả lời** nếu mục tiêu là kiểm tra nghe. TTS/pronunciation/locale cụ thể
theo Language Rule.

**B14. Q14 — Real-World Practice Dialogue (HỘI THOẠI NÂNG CAO, cầu nối lên Trung
cấp).** (Owner §18)
- `real_world_practice_dialogue`, `nonGraded: true`. **KHÔNG bắt buộc đúng 14
  dòng** — ít/nhiều hơn tuỳ nội dung, không kéo/cắt máy móc. (Code đã nới: chỉ
  còn sàn tối thiểu, xem §D7. Golden khoá riêng ở 14 dòng.)
- Phải là **story/hội thoại liên tục có diễn biến tự nhiên**, không ghép câu rời
  rạc; ưu tiên story liên tục thay vì chia scene máy móc.
- **CHÍNH:** cao hơn trình độ hiện tại về **độ phức tạp giao tiếp** (dài hơn,
  nhiều lượt tự nhiên, tình huống thật), chủ yếu dùng kiến thức ĐÃ HỌC (lesson
  này + trước).
- **MỘT CHÚT mới:** được phép VÀI từ/cách nói chưa dạy để hội thoại TỰ NHIÊN
  hơn — **RẤT ÍT, phải ĐOÁN ĐƯỢC qua ngữ cảnh**, không nhồi ngữ pháp mới thành
  gánh nặng. Mục tiêu: người học quen dần "tiếng thật", lên Trung cấp đỡ bỡ
  ngỡ.
- Hỗ trợ learning aids theo hệ thống + Language Rule: reading/pronunciation
  aid, translation toggle, audio, romanization nếu ngôn ngữ+level hỗ trợ. Không
  hardcode một native language vào logic lesson.
- Ràng buộc code mỗi dòng Q14 (§D7): `speakerId` trong pool · `targetText` +
  `speechText` · `translationByNative` đủ vi/en/ja · `reading` không chứa
  romaji · `romanization` theo pipeline · đúng 1 scene divider có dịch vi/en/ja.

**B15. Dịch nghĩa review.** (Owner §20, A7) Native language giả định để owner
kiểm; chất lượng cao, tự nhiên, đúng sắc thái — không word-by-word.

---

## PHẦN C — GIAO DIỆN (cho người build UI / Codex)

> Đây là tầng **validator KHÔNG kiểm được** — người build UI chịu trách nhiệm +
> **kiểm mắt trên bài thật**.

**C1. AUDIO / NÚT LOA — 2 TẦNG (Owner §21).**
- **TẦNG NỘI DUNG (validator ép — xem §D8):** mỗi item bắt buộc có trường audio
  (`speechText`). Validator throw nếu thiếu trên: mỗi vocab card, mỗi vocab
  example, mỗi dòng dialogue, mỗi dòng Q14 (+ chat slot `audioText`). Đây là
  *điều kiện cần* để có loa.
- **TẦNG GIAO DIỆN (Codex, validator KHÔNG kiểm):**
  - Render **nút loa RIÊNG** tại đúng từng item/câu: mỗi Vocabulary Card (từ
    chính) · mỗi example sentence trong Vocabulary · mỗi dòng Card Dialogue ·
    mỗi dòng Q14. **KHÔNG dùng một nút loa chung cho cả card.**
  - Audio phát **ĐÚNG nội dung item đó** — không dùng audio câu khác, không gộp
    nhiều câu thành một audio nếu schema yêu cầu phát từng câu.
  - Grammar examples: nếu Lesson Format/Language Rule yêu cầu audio thì mỗi
    example cũng có **nút loa riêng**.
  - Text cho TTS / pronunciation handling / locale → theo Language-specific
    Rule (không hardcode).

**C2. Reading / furigana — CƠ CHẾ THẬT (đã kiểm code Flutter, E3 chốt).**
Trong repo có **HAI cơ chế** tuỳ ngữ cảnh — dùng đúng chỗ:

1. **Vocab card / Dialogue line / Q14 line** (mặc định): `displayText` (=
   `targetText`) lưu **văn bản chuẩn CÓ kanji** (`田中さん、今日も…`); `reading`
   là **trường RIÊNG kana thuần** (`たなかさん、きょうも…`). Render
   (`five_card_practice.dart` `hasReading` = `reading` ≠ `targetText`;
   `lesson_five_card_pages.dart:~599/973/1089`) hiển thị `reading` như **dòng
   trợ đọc riêng / toggle** — **KHÔNG** ghép thành `漢字（かな）`, **KHÔNG ruby**.
   Không tồn tại widget parser `漢字（かな）→ ruby`.
2. **Chat_text_fill segment** (Q10) + đôi chỗ có furigana nội dòng: `displayText`
   **nhúng sẵn `漢字（かな）` trong text** (VD `私（わたし）は田中（たなか）です。`),
   hiển thị nguyên văn (parens LÀ furigana). Đây là dữ liệu pre-authored, không
   phải render kết hợp.

→ **Người build UI:** furigana-in-parens `漢字（かな）` là do (1) **dòng reading
riêng** hoặc (2) **text nhúng sẵn** — KHÔNG có bước "displayText + reading →
漢字（かな）" tự động. Reading là trường riêng (validator ép kanji ⇒ có reading,
§D9). Golden để nguyên (cả hai cơ chế đều chạy; không có mâu thuẫn phá vỡ) —
không đổi displayText.

**C3. Toggle hỗ trợ đọc.** Reading aid / romanization / translation toggle hiển
thị theo hệ thống + Language Rule + level. Q14 hỗ trợ reading/pronunciation
aid + translation toggle + audio + romanization nếu ngôn ngữ+level hỗ trợ.
Không hardcode một native language vào logic.

**C4. Listening không lộ đáp án.** (Owner §16) Với bài nghe: KHÔNG hiển thị
nguyên văn audio trước khi người học trả lời (validator có check chống lộ với
một số dạng — §D10 — nhưng UI vẫn phải đảm bảo hành vi thật).

---

## PHẦN D — RÀNG BUỘC CODE (validator ÉP — kèm file:dòng)

File: `scripts/validate-curriculum.mjs`, hàm **`validateFiveCardsStructure()`**
(chạy cho MỌI lesson `lessonFormat: five_cards`). Song song:
`scripts/smoke-curriculum-flow.mjs` (`checkFiveCardsLessonStructure`, generic) +
`checkApprovedJaUnitOneLesson` (Golden-only). Số dòng theo bản 2026-07-19.

**D1. 5 card đúng thứ tự.** `mainCards` phải = `intro,vocabulary,dialogue,
grammar,practice`. (`validate-curriculum.mjs:919`)

**D2. Card 2 vocabulary.** `vocabulary` **6–15 cards**; `vocabularyDetails`
**cùng số lượng**; ids khớp **1-1 đúng thứ tự**. (`:934–948`; ADR-019 amendment
2026-07-19 — số 6–15 là range, không phải fixed 8)

**D3. Card 3 dialogue.** **Đúng 3 nhóm, mỗi nhóm 4–6 dòng** (`:950`). Bắt buộc:
`targetLanguage === lesson.languageCode`, `targetLocale`, `cultureContext`,
`approvedCharacterNamePool` (mỗi nhân vật có `id/displayName/canonicalName/
audioName`); mọi `speakerId` phải nằm trong pool. (`:953–971`)

**D4. Card 4 grammar.** **Đúng 3 grammar patterns.** (`:972`)

**D5. Card 5 practice.** `totalQuestions === 14` và **đúng 14 exercises**
(`:977`). Mỗi exercise: `order === index+1`. **Plan boundary: `index < 9` →
`free`, còn lại → `plus`** = **Free Q1–Q9 / Plus Q10–Q14** (`:981`; smoke
`:164`, `:250`). Áp cho mọi lesson kể cả Golden (ADR-008 Amendment 2026-07-19;
Golden Q10 đã đổi `free → plus`).

**D6. Loại câu ÉP CỨNG (chỉ 5 câu; còn lại tự do):**
- Q3 (index 2) = `matching`, đúng 4 pairs, mỗi pair có `id/left.id/right.id`.
  (`:998`)
- Q9 (index 8) = `checkpoint`, 5 câu con, mỗi câu 4 options + `correctOptionId`
  hợp lệ. (`:986`)
- Q10 (index 9) = `chat_text_fill`, 6 messages, 2 slots, mỗi slot đủ
  `displayText/canonicalText/audioText/acceptedAnswers`. (`:1006`)
- Q13 (index 12) = `slot_ordering`, 6 `answerSlots`, **≥1 `unusedTokenIds`**
  (distractor). (`:1015`)
- Q14 (index 13) = `real_world_practice_dialogue` (§D7).
- **Q1, Q2, Q4, Q5, Q6, Q7, Q8, Q11, Q12: loại KHÔNG bị ép** — chọn theo khung
  gợi ý §B7.

**D7. Q14 real_world_practice_dialogue.** `type === real_world_practice_dialogue`,
`nonGraded === true`, có `scenarioTitleByNative.vi` + `scenarioDescriptionByNative
.vi`. **Số dòng: đã NỚI (Owner 2026-07-19)** — chỉ còn **sàn ≥ 4 dòng**, KHÔNG
trần, KHÔNG ép đúng 14 (`validate-curriculum.mjs:~1029–1043`;
`smoke:~265–275`). Mỗi dòng: `speakerId` trong pool · `targetText` +
`speechText` · `translationByNative` đủ vi/en/ja · `reading` KHÔNG chứa romaji
(`[a-zA-Z]`) · `romanization` qua pipeline. Đúng **1 scene divider** có dịch
vi/en/ja. (`:1026–1069`)

**D8. Audio (tầng nội dung — validator ÉP).** `validateFiveCardsStructure` ép
`speechText` KHÔNG rỗng trên (2026-07-19):
- Mỗi **Vocabulary card** (`speechText`, `:~1105`).
- Mỗi **Vocabulary example** (`speechText`, `:~1108`).
- Mỗi **dòng Dialogue** (`speechText`, `:~1113`).
- Mỗi **dòng Q14** (`targetText` + `speechText`, `:1042`).
- **Chat slot Q10** (`audioText`, `:1011`).
- Với ja: `speechText` của vocab example = kana thuần (từ `reading` đã có sẵn).
Grammar examples: `speechText` CHƯA ép (audio grammar tuỳ Language Rule — Owner
§21). Thiếu `speechText` ở item bị ép = validator throw. (Đây là *điều kiện
cần* để có nút loa — tầng render là việc UI, PHẦN C1.)

**D9. Reading (ja) — trường riêng.** Kanji `[㐀-鿿]` trong text ⇒ bắt buộc có
`reading` không rỗng — áp cho vocabulary, dialogue line, vocabularyDetails
examples, grammar examples, grammar `formula`→`formulaReading`.
(`:1073–1089`). Q14 `reading` không được chứa romaji (`:1049`). **Không có
check ép định dạng `漢字（かな）` trong displayText** — furigana-parens là việc
render (PHẦN C2).

**D10. Locale & chống lộ đáp án.** `targetLocale` bắt buộc (§D3); các card audio
có `audioLocale`; một số dạng nghe có check chống lộ speechText/correctAnswer
(`:478, :505, :772`).

**D11. Golden Lesson khoá riêng (KHÔNG đụng).** `ja-daily_life-m01-u1-l1` chạy
THÊM `validateApprovedGoldenLessonContent` (`:1242+`): khoá LITERAL token ids,
**Q14 đúng 14 dòng Tanaka–Sato** (`:1265–1283`), scene divider
`afterDialogueLine=10`/`着いた時`, casual openings こんにちは… v.v. Golden có
**đúng 5 card, đúng 14 exercise** (ADR-008 FROZEN). Mọi thay đổi Golden cần
Change Control ADR-008. Việc nới Q14 số dòng (§D7) KHÔNG đụng Golden vì Golden
khoá 14 dòng ở đây.

**D12. Cấm.** Không để tên nhân vật nháp Việt (`ミン/Minh/Hưng/Linh`) trong
five_cards content (`:1070`). Không sửa generated JSON bằng tay — sửa Shared
Source → generate → validate → sync.

---

## PHẦN E — TRẠNG THÁI (E1–E3 đã áp; E4 chờ triển khai)

**E1. ✅ Free/Plus = Q1–Q9 / Q10–Q14 — ĐÃ ÁP (kể cả Golden).** Owner mở khoá
ADR-008. Đã sửa: Golden Q10 `plan free → plus` (source
`ja-unit1-lesson1.mjs`), validator boundary `index < 9`
(`validate-curriculum.mjs:981`, `smoke:164/250`), Golden invariant test
(`five_card_lesson_test.dart` take(9)/skip(9)). ADR-008 Amendment 2026-07-19.
validate + smoke PASS, Golden PASS.

**E2. ✅ Audio mọi vocab example — ĐÃ ÁP.** `example()` helper thêm `speechText`
= `reading` (kana đã có sẵn — KHÔNG bịa cách đọc); Golden 10 example đủ audio.
Validator ép `speechText` trên vocab card + vocab example + dialogue line +
Q14 line (§D8). validate PASS.

**E3. ✅ Furigana — cơ chế thật đã ghi ở PHẦN C2.** Kiểm code Flutter: có HAI
cơ chế (reading trường riêng cho vocab/dialogue/Q14; `漢字（かな）` nhúng sẵn cho
chat segment). KHÔNG có bước "displayText + reading → 漢字（かな）" tự động; KHÔNG
ruby. Golden displayText giữ nguyên (không mâu thuẫn phá vỡ; cả hai cơ chế
chạy). Reading = trường riêng, validator ép (§D9).

**E4. ⏳ Bài tổng hợp cuối Unit (20 câu) — CHỜ TRIỂN KHAI (chưa build).**
*Đặc tả (ghi để nhớ):* bài tổng hợp cuối mỗi Unit = **20 câu**, tổng hợp kiến
thức từ lesson ĐẦU → CUỐI unit, **khó hơn lesson thường** nhưng vẫn **dễ→khó
dần**. **Hiện trạng code:** chỉ có **SHELL** — `unit_comprehensive_conversation`
(ADR-014): card render sau Lesson thứ 3 trong Unit, gate Plus/Pro/Ultimate qua
`PlanAccessPolicy`, tap ra thông báo "đang chuẩn bị"/"nâng cấp" — **KHÔNG câu
hỏi, KHÔNG bộ 20 câu, KHÔNG schema/generation nội dung**. File:
`mobile/novalang_flutter/lib/widgets/learn/unit_comprehensive_conversation_card
.dart` + `services/plan_access_policy.dart` + i18n `unitComprehensiveConversation*`.
**Chưa build** (Owner: chỉ ghi đặc tả, "chờ triển khai sau khi có lesson
thường", không build shell mới). Khi làm cần: Owner duyệt nội dung + cách chấm
(graded? Free/Plus?), schema mới cho activity tổng hợp (khác 5-card lesson),
generation + validator + UI thật thay shell.

---

## Changelog file này

- **2026-07-19 (bản 1)** — Tạo mới. Gom 24 nguyên tắc Owner + đối chiếu code.
  Nới Q14 số dòng (bỏ ép đúng 14 cho lesson thường, sàn ≥4; Golden khoá 14
  riêng). Free/Plus + audio-example + furigana + bài-20-câu: DỪNG chờ Owner.
- **2026-07-19 (bản 2 — Owner mở khoá Golden)** — Áp rule mới cho MỌI bài kể cả
  Golden (ADR-008 Amendment). **E1** Free/Plus → Q1–Q9 / Q10–Q14 (Golden Q10
  free→plus, boundary `index<9`, invariant test cập nhật). **E2** audio mọi
  vocab example (`speechText`=kana `reading`), validator ép speechText trên
  vocab card + example + dialogue line + Q14. **E3** furigana: ghi cơ chế thật
  (reading trường riêng, không auto-ghép, không ruby), Golden displayText giữ
  nguyên. **E4** bài 20 câu cuối unit: ghi đặc tả, chờ triển khai (chưa build).
  validate:curriculum + smoke:curriculum PASS, Golden PASS.
