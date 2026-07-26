# NovaLang — LESSON AUTHORING STANDARD (chuẩn viết lesson, dùng chung)

**MỘT file duy nhất** cho cả **người viết nội dung** (Claude Code) và **người
build giao diện** (Codex). Không phải nhớ file nào cho ai — đọc đúng phần của
mình:

| Bạn là | Đọc bắt buộc |
|---|---|
| Ai cũng đọc | **PHẦN A — Nguyên tắc chung** |
| Viết nội dung lesson | PHẦN A + **PHẦN B** + **PHẦN D** + **PHẦN G** |
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

**B2b. Card 2 — "Tham khảo thêm" (TÙY CHỌN, cấu trúc đầy đủ).** (Owner
2026-07-20) Trường **optional** `vocabularyReferences` — MỘT mảng đặt ở cấp
`fiveCardContent` (card 2), chứa các CÁCH NÓI KHÁC của từ trong bài; người học
THÍCH thì đọc, **KHÔNG bắt buộc nhớ**.

**Nội dung (luật viết):**
- **Tối đa 3–5 mục/bài.** Cách chọn: lấy **1–2 từ CÓ NHIỀU CÁCH NÓI NHẤT** trong
  bài rồi bổ sung biến thể của **chính từ đó** — KHÔNG rải mỗi từ một mục.
- Mỗi mục là một object, **BẮT BUỘC đủ trường, KHÔNG để nghĩa trống**:

  ```js
  {
    term: '‹cách-nói-khác›',        // 1. TỪ VỰNG — target-language; kèm hỗ trợ đọc
    reading: '‹cách-đọc-thuần›',    //    cách đọc thuần (như từ chính)
    speechText: '‹text-audio›',     //    audio — BẮT BUỘC mỗi mục
    meaning: '…',                   // 2. NGHĨA (native, localize đủ locale)
    register: '…',                  // 3. MỨC ĐỘ LỊCH SỰ — trang trọng/lịch sự/thân mật
    example: example(…),            // 4. VÍ DỤ — cùng khuôn `examples` của thẻ từ vựng
  }
  ```
  → **ĐÚNG 4 phần, owner chốt 2026-07-25** — không thêm mục nào khác. Bốn nhãn
  này dùng CHUNG key i18n với thẻ từ vựng (`register`, `vocabExample`): cùng một
  loại thông tin thì không được có hai cách gọi ở hai chỗ.

  **ĐÃ BỎ** `forWord` · `forWho` · `whenToUse` · `difference`. Không cần mục
  "không nên dùng" — mức độ lịch sự đã nói đủ. Trường cũ bỏ HẲN khỏi nguồn và
  UI (mobile + web): giữ ẩn thì dữ liệu chết vẫn nằm đó và lần sau lại có người
  điền vào.
  Ví dụ cụ thể bằng một ngôn ngữ: xem file nguồn riêng của ngôn ngữ đó (vd
  `scripts/content/sources/<mã>.md`).
- **KHÔNG tính vào ngân sách từ mới** (§F-d).
- **KHÔNG dùng ở Practice Q1–Q13.** **ĐƯỢC** dùng ở **Q14** nếu làm hội thoại tự
  nhiên/hay hơn (Q14 nâng cao, cho phép yếu tố đoán được qua ngữ cảnh).
- **Mức FREE** cho mọi người dùng (không phải nội dung Plus).

**Ràng buộc kỹ thuật:**
- **Optional:** bài không có `vocabularyReferences` vẫn validate PASS (Golden + L2
  vẫn PASS). `validateFiveCardsStructure` không cấm trường lạ ở `fiveCardContent`,
  nên đây là slot có sẵn — **không cần đổi validator**.
- **Localize:** các trường native (`meaning`/`forWho`/`whenToUse`/`difference`)
  đi qua `localizeSupport` → sinh `*ByNative` đủ locale. `term`/`reading`/
  `speechText`/`forWord` là **target-language**, giữ nguyên.
- `speechText` **BẮT BUỘC** ở mỗi mục (luật viết bài; validator hiện chỉ quét
  audio ở `vocabulary[]`/`examples`/dialogue/Q14 — người viết tự đảm bảo, và
  ledger liệt kê để owner soi).
- Render UI: xem **§C-Ref** (Cursor làm; prompt DATA chỉ ghi yêu cầu, không sửa
  frontend).

**B2c. Card 2 — 5 TRƯỜNG CHI TIẾT từ vựng (BA MỨC lịch sự).** (Owner
2026-07-25) Golden L1 điền 5 trường chi tiết cho mỗi thẻ; **từ L2 trở đi các
trường này bị bỏ trống**, UI hiện "Không có nội dung". UI đúng thiết kế — lỗi ở
DỮ LIỆU. Đây là luật chặn việc đó lặp lại.

**5 trường (khuôn lấy từ Golden L1, KHÔNG tự nghĩ khuôn mới):**

| Trường | Kiểu | Nội dung |
|---|---|---|
| `timingAndContext` | array | Dùng vào lúc nào / hoàn cảnh nào |
| `appropriateFor` | array | Dùng được với ai (đối tượng) |
| `avoid` | array | KHÔNG dùng khi nào |
| `register` | string | Mức lịch sự của CHÍNH cụm này — chỉ 3 giá trị, xem §B2e |
| `formal` | array | Cách nói TRANG TRỌNG tương đương + dùng với ai |
| `casual` | array | Cách nói THÂN MẬT tương đương + dùng với ai |

Mỗi trường native phải đi qua `localizeSupport` → sinh `*ByNative` đủ locale.
**Không hard-code một ngôn ngữ** (§A, TRANSLATION_STANDARD).

**BA MỨC (Owner chốt 2026-07-25).** Từ vựng có ba mức: **trang trọng · lịch sự ·
thân mật**. **Không bắt buộc từ nào cũng đủ ba mức**, NHƯNG **mức nào CÓ thì
BẮT BUỘC ghi vào — cấm bỏ trống**. Ánh xạ vào khuôn hiện tại:

- mức của chính cụm → `register`
- mức **trang trọng** tương đương → `formal`
- mức **thân mật** tương đương → `casual`

`formal` là trường **mới, owner chốt 2026-07-25**: khuôn Golden L1 chỉ có
`register` + `casual`, nên mức trang trọng trước đó không có chỗ ghi. Đã thêm
vào `shared/types.ts` (`FiveCardVocabularyDetail`) và vào cảnh báo mềm của
validator. **Golden L1 KHÔNG bị sửa** (đang frozen) — chỉ mở chỗ chứa.

**PHÂN BIỆT "ĐÃ KIỂM, KHÔNG CÓ" vs "CHƯA ĐIỀN" (owner chốt 2026-07-25).**
Nếu cả hai đều để trống thì lần sau không ai biết cái nào đã làm. Hiện trạng đã
kiểm: 5 trường này ở L2/L3 **vắng mặt hẳn** (`hasOwnProperty === false`), không
phải mảng rỗng — nên quy ước dưới đây **không cần migrate dữ liệu cũ**:

- **thiếu key hẳn** = **CHƯA ĐIỀN** → validator cảnh báo
- **`[]` (mảng rỗng) / `''` (chuỗi rỗng)** = **ĐÃ KIỂM, cụm này thật sự không có
  thông tin ở trường đó** → validator im lặng

Người viết phải **mở nguồn thật đối chiếu (G8)** trước khi đánh dấu `[]`; đánh
`[]` cho nhanh mà chưa tra là vi phạm G4.

**B2d. FURIGANA — mọi kanji hiển thị BẮT BUỘC kèm hiragana.** (Owner chốt
2026-07-25) Áp cho **mọi cấp độ**: sơ cấp, trung cấp, và cao cấp — ở cao cấp thì
kanji CHƯA HỌC vẫn phải có. **Không ngoại lệ.**

Quy ước hiển thị (giữ nguyên khuôn Golden, KHÔNG chế kiểu mới):

```text
お名前（なまえ）        お先（さき）に失礼（しつれい）します
```

ngoặc tròn **full-width** ngay sau đúng cụm kanji; kana đi kèm nằm NGOÀI ngoặc.

- **CHỈ trường HIỂN THỊ**: `displayText` · `text` · `targetText` ·
  `displayAnswer` · `term` · `pattern`. Trường máy dùng — `reading` ·
  `speechText` · `canonicalText` · `audioText` · `romanization` — **giữ
  nguyên**: chúng feed TTS và bộ chấm, thêm ngoặc vào là hỏng cả hai.
- **Người viết KHÔNG phải gõ tay.** Generator gắn furigana ở một chỗ duy nhất
  ngay trước khi ghi (`scripts/lib/japanese-furigana.mjs`), nên nội dung mới tự
  có. Chuỗi đã có furigana thì giữ nguyên, không gắn chồng.
- **Cách đọc KHÔNG đoán**: tách hình vị bằng `kuromoji`, lấy đúng reading của
  từng token — cùng bộ phân tích với đường La-tinh hoá, nên hai bên không lệch.
  Token không có reading thì **throw**, để người tra chứ máy không chế (G4/G8).
- **Khoá nội dung Golden so phần ĐÃ BÓC furigana.** ADR-008 đóng băng câu chữ,
  không đóng băng lớp hỗ trợ đọc; validator/smoke/test Q14 đều bóc trước khi so.
- **Validator: MỨC CỨNG, chỉ ngôn ngữ ja.** Generator đã bảo đảm, nên một lỗi ở
  đây nghĩa là cơ chế bị gỡ hoặc bị đi vòng — đúng loại hỏng phải chặn build.
  Giới hạn ở ja vì tiếng Trung cũng dùng chữ Hán nhưng không có furigana.

**B2e. MỨC ĐỘ LỊCH SỰ — ĐÚNG BA MỨC, không hơn.** (Owner chốt 2026-07-25)

| Mức | vi | en | ja |
|---|---|---|---|
| trang trọng | `Trang trọng.` | `Formal.` | `改まった言い方。` |
| lịch sự | `Lịch sự.` | `Polite.` | `丁寧。` |
| thân mật | `Thân mật.` | `Casual.` | `カジュアル。` |

Đây là **từ vựng ĐÓNG**, không phải văn xuôi tự do. **CẤM** mọi nhãn khác —
"trung tính", "thông thường", "bình thường", "phổ thông", và cả các mô tả dài
kiểu "trung tính, lịch sự an toàn" hay "lịch sự cơ bản". Muốn nói thêm sắc thái
thì viết ở `notes`, không nhét vào `register`.

- **Không bắt buộc đủ ba mức.** Một unit chỉ dùng hai mức là bình thường — luật
  khoá TỪ VỰNG NHÃN, không ép phải có đủ.
- **Cụm không mang mức lịch sự nào** (danh từ, trạng từ như `名前` · `来週` ·
  `もう一度`): owner chốt gán **lịch sự**, không để trống và không đặt mức thứ tư.
- **`''` và thiếu key vẫn hợp lệ** theo §B2c ("đã kiểm, không có" / "chưa
  điền") — luật này chỉ chặn nhãn LẠ, không ép phải điền.
- **Validator: MỨC CỨNG.** Từ vựng đóng do owner ấn định thì một giá trị ngoài
  danh sách nghĩa là ai đó vừa đặt ra mức thứ tư — đúng loại trôi owner đã phải
  nhắc nhiều lần, nên chặn build chứ không nhắc nhở. Áp cho cả `register` và
  `registerByNative`, kiểm từng locale riêng (lệch một locale cũng bắt).

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
  `speechText` · `translationByNative` đủ locale native · `reading` không chứa
  chữ Latin · `romanization` theo pipeline của ngôn ngữ (nếu có) · đúng 1 scene divider có dịch đủ locale.

**B15. Dịch nghĩa review.** (Owner §20, A7) Native language giả định để owner
kiểm; chất lượng cao, tự nhiên, đúng sắc thái — không word-by-word.

**B16. DANH SÁCH KIỂM TRƯỚC KHI NỘP BÀI.** (Owner 2026-07-25) Rút từ **5 vòng
sửa thật** của bài tổng hợp Unit 1 (đợt 1 sửa 3 lần, đợt 2 sửa 1 lần). Mỗi mục
dưới đây là một lỗi **đã thực sự lọt qua** rồi mới bị bắt. Chạy hết trước khi
nộp — kể cả khi thấy chắc.

**Cân bằng hình thức**
- **Đáp án đúng rải đều A/B/C/D.** UI **KHÔNG xáo trộn phương án** lúc chạy
  (render đúng thứ tự dữ liệu) → **dữ liệu phải tự rải**. Đã dính: cả 8 câu đáp
  án đều là A.
- **Trần lặp cụm làm phương án sai — CO GIÃN theo cỡ bài, không phải số cứng.**
  Đếm theo **cụm GÂY SAI** (cụm ở ô khiến phương án đó sai), không đếm cụm đi
  kèm vô can.

  ```text
  trần = ceil( số_ô_phương_án_sai / số_cụm_phân_biệt_dùng_làm_sai ) + 1
  ```

  Số cụm phân biệt bị chặn trên bởi vốn từ unit đã dạy, nên **số cứng là bất
  khả thi ở bài lớn**. Ví dụ thật: bài 25 câu có 75 ô sai / 30 cụm ⇒ trung bình
  2,5 ⇒ **trần 4**. Bài 18 câu có 54 ô / ~28 cụm ⇒ trung bình 1,9 ⇒ **trần 3**.
  Trần cũ "tối đa 2" viết cho đợt 8–10 câu; giữ nguyên nó ở bài 25 câu là bắt
  làm chuyện số học không làm được (2 × 30 = 60 < 75).

- **ĐIỀU KIỆN THẬT SỰ QUAN TRỌNG — cụm không được "LUÔN SAI".** Trần ở trên chỉ
  là *proxy*; thứ cần chặn là mẫu "thấy X thì loại". Luật:

  > Một cụm là **biểu thức hợp lệ đã dạy** mà làm phương án sai ở **≥ 3 câu**
  > thì phải là **ĐÁP ÁN ĐÚNG ở ít nhất 1 câu**.

  Hai điều kiện thu hẹp, đều cần thiết:
  - **≥ 3, không phải ≥ 2.** Xuất hiện 2 lần chưa đủ để người học rút ra quy
    luật; siết xuống 2 chỉ tạo báo động giả.
  - **Chỉ áp cho biểu thức HỢP LỆ.** **Dạng méo cố ý được MIỄN**: cụm thiếu
    thành phần bắt buộc (「伊藤ですね」 thiếu さん), dạng bài học CẤM RÕ
    (「私のお名前」), trợ từ nhân đôi (「お名前はは？」). Chúng tồn tại *chỉ để*
    làm phương án sai — bắt chúng phải đúng ở đâu đó tức là đi dạy cái sai. Đây
    cũng chính là loại phương án sai mà mục "lỗi TỰ NÓ SAI" bên dưới xếp hạng
    cao nhất.

  Đo thật trên bài 25 câu Unit 1 ja: 0 vi phạm. Hai cụm chạm ngưỡng —
  `ですね` (4 lần sai) và `私のお名前` (3 lần sai) — đều là dạng méo cố ý nên
  được miễn. Cụm hợp lệ lặp nhiều nhất là `そうですか` 4 lần sai / 3 lần đúng.
- **Mỗi ô trống phải được ÍT NHẤT một phương án sai kiểm.** Nếu cả 4 phương án
  cùng giá trị ở một ô thì ô đó không kiểm gì.

**Phương án sai phải SAI THẬT**
- Trước khi chốt, tự hỏi: **"câu này có phải là câu hợp lệ trong ĐÚNG bối cảnh
  đó không?"** Nếu có → không dùng làm phương án sai.
- Bẫy đã dính, **cấm dùng lại làm lý do sai**:
  - "lược trợ từ trước `お願いします`" — lược trợ từ là **chuẩn đời thường**
    (`コーヒーお願いします`), không sai ngữ pháp;
  - "hỏi tên đối phương sau khi tự giới thiệu" — **tự nhiên**, không sai;
  - bất kỳ luật nào **chính bài học đã dặn đừng tuyệt đối hoá**.
- **Ưu tiên lỗi TỰ NÓ SAI** hơn lỗi chỉ sai vì bối cảnh: bài học **cấm nguyên
  văn** > sai trợ từ cơ học > ngược trình tự hành vi > sai thời điểm > lạc mạch.
- Lỗi chỉ sai vì bối cảnh **được phép**, nhưng bối cảnh đó phải nằm trong trường
  `context` (UI có hiện) — không được nằm trong đầu người viết.

**Nhất quán nội bộ**
- **Không để câu tự mâu thuẫn.** Soi MỌI cụm trong cùng một câu xem có hợp nhau
  về **thời gian / quan hệ / nơi chốn** không. Đã dính: lời chúc "lâu mới gặp
  lại" đặt cạnh lời hẹn "tuần sau".
- **Vai nhân vật NHẤT QUÁN TOÀN BÀI.** Một tên không được lúc là thầy, lúc là
  đồng nghiệp, lúc là hàng xóm. Chốt bảng vai **trước khi viết câu đầu tiên**.
  Đã dính: 1 tên mang 5 vai khác nhau trong cùng một bài.

**CHUẨN XÃ HỘI + VAI VẾ — tầng KHÔNG luật máy nào bắt**
> Bốn ca dưới đây đều **hợp dữ liệu bài, tra nguồn ra, validator im lặng** —
> nhưng sai chuẩn xã hội. Đây là tầng phải kiểm **bằng người**.
- Lời chào/chia tay có đúng **quan hệ + nơi chốn** không (đã dính: lời chào buổi
  tối dùng với đồng nghiệp **trong công sở**, nơi chuẩn là lời chào riêng của
  môi trường làm việc).
- **Cách xưng hô có đúng vai vế** không (đã dính: gọi thầy bằng hậu tố dành cho
  người ngang hàng).
- **Độ trang trọng có khớp quan hệ** không (đã dính: cụm trang trọng dành cho
  người trên đặt vào miệng hai người bạn ngang hàng).
- Bối cảnh có đòi **lớp kính ngữ nằm NGOÀI vốn đã dạy** không (đã dính: nhân
  viên khách sạn nói với khách). Nếu có → **đổi bối cảnh**, đừng viết bừa.
- **Nếu cụm chuẩn xã hội không có trong vốn đã dạy → ĐỔI BỐI CẢNH**, không được
  dùng cụm sai chuẩn cho tiện.

**Bảng tự kiểm**
- Tổng phải **khớp**: số phương án sai = số câu × 3. Kiểm **cả chiều dọc** (mỗi
  câu đúng 3 mục). Đã dính: bảng ghi 6 nhưng liệt kê 7, và một mục bỏ lửng
  `...` chưa điền.
- **Không tin luật máy khi chưa kiểm chứng.** Đã dính:
  `MAX_TRAILING_BLANK_RATIO` đếm 0% trong khi thực tế 20% (xem nợ kỹ thuật ở
  `docs/ai/ACTIVE_TASK.md`). Đếm theo **ý định của luật**, và báo cả hai số.

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

**C2. Hỗ trợ đọc — CƠ CHẾ THẬT (đã kiểm code Flutter).** Với ngôn ngữ **có hệ
chữ cần hỗ trợ đọc**, dữ liệu tách trường + hiển thị theo **quy ước RIÊNG của
ngôn ngữ đó** (chi tiết cụ thể — định dạng chú âm, ví dụ — nằm ở
`scripts/content/sources/<mã>.md`, **KHÔNG** mô tả trong file chung này):
- **(a) Trường CÁCH ĐỌC THUẦN** (`reading`): dùng cho đối chiếu / bài tập; là
  **TRƯỜNG RIÊNG**, không ghép vào text hiển thị.
- **(b) Trường HIỂN THỊ** (`displayText` = `targetText`): văn bản chuẩn, có thể
  gắn hỗ trợ đọc theo quy ước của ngôn ngữ đó.
- **(c) Quy ước hiển thị cụ thể** (chú âm nội dòng / dòng trợ đọc riêng / chuyển
  tự La-tinh / chú âm / dấu trọng âm / tách âm tiết…) do **file nguồn riêng của
  ngôn ngữ đó** định nghĩa.

→ **Người build UI:** repo có sẵn **HAI kiểu** render, dùng đúng chỗ (không có
bước tự động ghép `displayText` + `reading`): **(1)** trường `reading` hiển thị
như **dòng trợ đọc riêng / toggle** (`five_card_practice.dart` `hasReading` =
`reading` ≠ `targetText`; `lesson_five_card_pages.dart:~606/980/1096`); **(2)**
hỗ trợ đọc **nhúng sẵn trong `displayText`** (dữ liệu pre-authored, hiển thị
nguyên văn). Validator ép: hệ chữ cần chú âm ⇒ trường `reading` không rỗng (§D9).

**C3. Toggle hỗ trợ đọc.** Reading aid / romanization / translation toggle hiển
thị theo hệ thống + Language Rule + level. Q14 hỗ trợ reading/pronunciation
aid + translation toggle + audio + romanization nếu ngôn ngữ+level hỗ trợ.
Không hardcode một native language vào logic.

**C4. Listening không lộ đáp án.** (Owner §16) Với bài nghe: KHÔNG hiển thị
nguyên văn audio trước khi người học trả lời (validator có check chống lộ với
một số dạng — §D10 — nhưng UI vẫn phải đảm bảo hành vi thật).

**C-Ref. Khối "Tham khảo thêm" (card 2) — YÊU CẦU RENDER (Cursor làm; xem dữ
liệu §B2b).** (Owner 2026-07-20) Dữ liệu: `fiveCardContent.vocabularyReferences`
(mảng optional; bài không có thì KHÔNG hiện khối này).
- **Vị trí:** đặt ở **CUỐI card Vocabulary (card 2)**, sau danh sách từ vựng
  chính.
- **Mặc định THU GỌN** (collapsed) — có tiêu đề "Tham khảo thêm" (localize theo
  `uiLanguageCode`), bấm mới mở ra; không tự bung.
- **Mỗi mục hiển thị đủ:** `term` (+ hỗ trợ đọc nếu hệ chữ cần), `reading`, **NÚT LOA RIÊNG** phát
  `speechText`, `meaning` (theo `nativeLanguageCode`), "Tham khảo cho:" `forWord`,
  "Dùng cho:" `forWho`, "Dùng khi:" `whenToUse`, "Khác gì:" `difference`.
- **Mức FREE** — hiện cho mọi người dùng, không khóa Plus.
- **Áp cả web + mobile.** Nhãn/tiêu đề qua i18n (không hard-code) — cần key mới:
  `vocabularyReferencesTitle`, `referenceForWord`, `referenceForWho`,
  `referenceWhenToUse`, `referenceDifference` (Cursor thêm vào i18n web +
  `mobile_ui.json`, đủ locale).

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
`speechText` · `translationByNative` đủ locale native · `reading` KHÔNG chứa
chữ Latin (`[a-zA-Z]`) · `romanization` qua pipeline. Đúng **1 scene divider**
có dịch đủ locale native. (`:1026–1069`)

**D8. Audio (tầng nội dung — validator ÉP).** `validateFiveCardsStructure` ép
`speechText` KHÔNG rỗng trên (2026-07-19):
- Mỗi **Vocabulary card** (`speechText`, `:~1105`).
- Mỗi **Vocabulary example** (`speechText`, `:~1108`).
- Mỗi **dòng Dialogue** (`speechText`, `:~1113`).
- Mỗi **dòng Q14** (`targetText` + `speechText`, `:1042`).
- **Chat slot Q10** (`audioText`, `:1011`).
- Ngôn ngữ có hệ chú âm: `speechText` của vocab example = **cách đọc thuần** đã
  có sẵn (KHÔNG bịa cách đọc; quy ước cụ thể ở file nguồn riêng của ngôn ngữ đó).
Grammar examples: `speechText` CHƯA ép (audio grammar tuỳ Language Rule — Owner
§21). Thiếu `speechText` ở item bị ép = validator throw. (Đây là *điều kiện
cần* để có nút loa — tầng render là việc UI, PHẦN C1.)

> **§D9–D12 dưới đây là BẢN SAO CODE THẬT** cho một artifact / nội dung **ja
> CỤ THỂ đã tồn tại** (validator hiện kiểm ja, và bài Golden là artifact tham
> chiếu đã ĐÓNG BĂNG). Đây **KHÔNG phải quy ước áp cho mọi ngôn ngữ** — trừu
> tượng hoá sẽ làm tài liệu lệch với code thật. Ngôn ngữ mới có ràng buộc
> reading / hệ chữ / nhân vật RIÊNG, định ở **file nguồn riêng + rule ngôn ngữ**,
> không suy ra từ các mục ja này.

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
= `reading` (cách đọc thuần đã có sẵn — KHÔNG bịa cách đọc); Golden 10 example đủ audio.
Validator ép `speechText` trên vocab card + vocab example + dialogue line +
Q14 line (§D8). validate PASS.

**E3. ✅ Hỗ trợ đọc — cơ chế thật đã ghi (trừu tượng) ở PHẦN C2.** Kiểm code
Flutter: có HAI kiểu render — trường `reading` RIÊNG hiển thị như dòng trợ đọc /
toggle; hoặc hỗ trợ đọc NHÚNG SẴN trong `displayText`. KHÔNG có bước tự động ghép
`displayText` + `reading`. **Quy ước hiển thị cụ thể của từng ngôn ngữ** (định
dạng chú âm, ví dụ) nằm ở **file nguồn riêng của ngôn ngữ đó**, không ở file
chung. Reading = trường riêng, validator ép (§D9).

**E4. 🔨 Bài tổng hợp cuối Unit — ĐÃ CHỐT THIẾT KẾ + CÓ SCHEMA (2026-07-25);
generator/validator/UI CHƯA làm.**

*Owner đã chốt (2026-07-25):* dạng bài = **CLOZE — điền vào chỗ trống**, chấm
bằng **so khớp cố định, KHÔNG dùng AI** (tiết kiệm chi phí API); nội dung
**chỉ gộp từ vựng + mẫu ngữ pháp ĐÃ DẠY trong unit** (§G7); **CÓ chấm điểm**;
**gate PLUS toàn bài** (nhất quán ranh giới Q10–Q14 của lesson thường).

**ĐÚNG 25 CÂU, chia 3 mức (mở rộng 2026-07-25):**

| Câu | Loại (`kind`) | Hình thức | Số ô | Cách nhập |
|---|---|---|---|---|
| 1–8 | `sentence_multi_blank_choice` | 1 câu hoặc 2 câu ngắn | **2** | Chọn 1 trong **4 phương án** |
| 9–18 | `dialogue_multi_blank_choice` | **Hội thoại 2–3 lượt** | **3** | Chọn 1 trong **4 phương án** |
| 19–25 | `typed_blank` | Câu | ≥1 | **Tự gõ** vào ô trống |

- **Mỗi phương án chứa đáp án cho TẤT CẢ ô** của câu (vd `A. ①です
  ②よろしくお願いします`) → chọn một lần là điền xong cả câu; đúng khi chọn
  đúng phương án (tức mọi ô đều đúng).
- Câu tự gõ: **chỉ gõ phần trong ô**, KHÔNG gõ lại cả câu. Có thể kèm `hint`.
- **Hội thoại phải NGẮN (2–3 lượt).** Đọc dài làm mất thời gian và biến bài
  kiểm tra thành bài đọc hiểu — owner nhấn mạnh.
- **VỊ TRÍ Ô TRỐNG:** rải khắp câu (đầu/giữa/cuối), **thứ tự mỗi câu một
  khác**. **CẤM luôn khoét cuối câu** — người học sẽ đoán theo thói quen thay
  vì thật sự hiểu.
- **TRỘN XEN KẼ kiến thức L1/L2/L3**, không gom từng lesson thành từng khối.
  Độ khó tăng dần suốt bài.

**RÀNG BUỘC NỘI DUNG (generator/validator phải theo):**

1. **Phạm vi từ — §G7, phương án B (owner chốt):** phần **BỊ CHẤM** (nội dung
   điền vào ô trống) **CHỈ** dùng từ/mẫu ĐÃ DẠY trong unit; mọi ô phải truy
   được về một mục trong `reviews[]`. **Ngữ cảnh xung quanh KHÔNG bị chấm**
   (tên riêng, quốc gia, câu dẫn) được phép lấy từ nguồn local đã ghi cấp độ.
2. **KHÔNG hard-code một ngôn ngữ:** file nguồn local có sẵn nghĩa tiếng
   Việt/Anh — **KHÔNG bê nguyên vào bài**. Mọi nghĩa/dịch đi qua hệ đa ngôn
   ngữ (`*ByNative`, `targetLocale`) theo `TRANSLATION_STANDARD.md`; nguồn
   chỉ dùng để **HIỂU**.
3. **Ví dụ/nhân vật TRUNG TÍNH:** không gắn quốc tịch người học vào bài
   (không dùng "người Việt"); dùng bối cảnh Nhật Bản hoặc các nước châu Âu,
   tên trung tính.
4. **CHẤT LIỆU — làm mới câu, KHÔNG bê nguyên:** rút từ/mẫu ĐÃ DUYỆT trong
   các lesson của unit nhưng **viết câu MỚI**. Bài Plus phải khác bài free:
   câu **dài hơn**, chỗ điền **dài hơn** (điền cả cụm/vế, không chỉ một từ),
   **gộp nhiều mẫu**, **ít gợi ý hơn** lesson thường.
5. **§G8 — mở nguồn thật:** mọi cụm cố định / cặp từ–trợ từ dùng trong bài
   phải đối chiếu nguồn thật trong `local-sources/` (hanabira, JMdict, file
   N-level). **Cấm dựa trí nhớ mô hình.** Không tra được → **không dùng**
   (§G4). Báo cáo phải ghi rõ đã mở nguồn nào.

**E4-gen. CƠ CHẾ SINH BÀI (generator) — `scripts/lib/unit-comprehensive-test.mjs`**

Bài tổng hợp đi đúng dây chuyền **Source → Generate → Validate → Sync** như
lesson thường, theo cùng mô hình `helpers.mjs` + `FIVE_CARDS_REGISTRY`:

- **File generator là CƠ CHẾ LẮP RÁP, KHÔNG sinh tiếng Nhật.** Nó không tự
  đặt câu, không tự nghĩ phương án sai, không tự chọn từ — đúng `AGENTS.md`
  ("không tự sáng tạo") và §G8. Câu chữ thật, **kể cả 3 phương án sai**, nằm
  trong file nguồn ĐÃ DUYỆT của unit.
- **Thêm một bài** = viết file nguồn đã duyệt (theo G1–G9, có đối chiếu nguồn
  thật) → thêm **đúng một dòng** vào `UNIT_COMPREHENSIVE_REGISTRY`, khoá theo
  `languageCode` rồi `unitId` THẬT. Vòng lặp sinh curriculum không phải sửa.
- **Unit chưa có bài tổng hợp là trạng thái HỢP LỆ** — generator trả `null`,
  không sinh vỏ rỗng.
- Chạy: `npm run generate:curriculum` → `npm run sync:flutter-assets` →
  `npm run validate:curriculum` + `npm run smoke:curriculum` (y hệt lesson
  thường).

**Số câu SUY RA từ số lesson thật của unit** (generator tự tính, file nguồn
KHÔNG được tự khai):

| Số lesson của unit | Tổng câu | Chia 3 mức | Dải order |
|---|---|---|---|
| 3 lesson | **25** | 8 / 10 / 7 | 1–8 · 9–18 · 19–25 |
| 2 lesson | **18** | 6 / 7 / 5 | 1–6 · 7–13 · 14–18 |

Số lesson khác → generator **fail loud**, KHÔNG tự chế tỉ lệ mới; thêm kế
hoạch mới cần owner duyệt.

**Generator ép sẵn (throw ngay khi nguồn sai):** đủ/đúng số câu · `order` là
1..N đủ và không trùng · `kind` khớp dải order · số ô đúng theo kind (2 / 3 /
≥1) · `blankId` khớp 1-1 giữa thân câu và `blanks` · `acceptedAnswers` chứa
`canonicalAnswer` · đúng 4 phương án, mỗi phương án phủ **đúng và đủ** mọi ô ·
`correctOptionId` trỏ tới phương án có thật và khớp `acceptedAnswers` · mọi
`reviews[].lessonId` thuộc unit (§G7) · hội thoại 2–3 lượt · tỉ lệ câu kết
thúc bằng ô trống ≤ 50% · không quá 3 câu liên tiếp chỉ ôn một lesson.

Hai ngưỡng cuối là **số vận hành** (§F-h) — owner chỉnh được, không phải hằng
số bất biến.

*Đã có (2026-07-25):*
- **Schema** — `shared/types.ts` (`UnitComprehensiveTest` + type con), gắn
  optional vào `Unit.comprehensiveTest`. Quyết định kiến trúc: **ADR-022**.
- **Generator** — `scripts/lib/unit-comprehensive-test.mjs` (xem §E4-gen).
- **Validator** — `validateUnitComprehensiveTest` trong
  `scripts/validate-curriculum.mjs` + section "Unit comprehensive tests"
  trong `scripts/smoke-curriculum-flow.mjs`, kiểm trên OUTPUT đã sinh.
- **UI thật** — `lib/screens/learn/unit_comprehensive_test_screen.dart`
  (render 3 loại câu + chấm), model
  `lib/models/unit_comprehensive_test.dart`, lối vào
  `lib/widgets/learn/unit_comprehensive_test_card.dart`. Card đọc gate qua
  `PlanAccessPolicy` và `plan` trong dữ liệu (KHÔNG hard-code); unit chưa có
  bài thì tap ra thông báo "đang chuẩn bị" thay vì mở màn hình rỗng.
- **Đã đổi tên** `unit_comprehensive_conversation` → `unit_comprehensive_test`
  / `unit_comprehensive_cloze` (widget, khoá i18n `unitComprehensiveTest*`,
  mọi tham chiếu) — thiết kế là bài cloze, không phải hội thoại; ADR-014 có
  tiền lệ cho phép ("no persisted user activity exists for this shell").

*CHƯA có:* **nội dung bài thật.** `UNIT_COMPREHENSIVE_REGISTRY` vẫn RỖNG, nên
chưa unit nào có bài tổng hợp chạy được trong app. Viết nội dung là task
riêng, cần Owner duyệt theo `AGENTS.md`.

---

**§D-Cloze. CƠ CHẾ CHẤM (bài tổng hợp) — TÁI DÙNG cơ chế đã chạy thật.**

Bài tổng hợp có **hai cách chấm**, tuỳ `kind` của câu:

**(A) Câu CHỌN PHƯƠNG ÁN** (`sentence_multi_blank_choice`,
`dialogue_multi_blank_choice`): chấm bằng **so id phương án** — đúng khi
người học chọn `options[].id` trùng `correctOptionId`. Vì mỗi phương án đã
chứa đáp án cho **mọi** ô (`answersByBlankId`), chọn đúng phương án nghĩa là
tất cả ô đều đúng — **không có điểm từng phần**. `acceptedAnswers` của các ô
vẫn phải điền đúng (để hiển thị khi chữa bài + TTS) nhưng KHÔNG tham gia
chấm.

**(B) Câu TỰ GÕ** (`typed_blank`): chấm bằng **so khớp `acceptedAnswers`**,
dùng nguyên cơ chế cloze mà Q10 `chat_text_fill` của lesson thường đã chạy
thật — **KHÔNG tự chế cơ chế so khớp mới**:

1. Chuẩn hoá **cả hai vế** (đáp án người học gõ và từng mục trong
   `acceptedAnswers`) bằng `normalizePracticeTextAnswer`
   (`mobile/novalang_flutter/lib/models/five_card_practice.dart:26`), gồm 5
   bước theo đúng thứ tự: `trim()` → gộp mọi chuỗi khoảng trắng thành MỘT dấu
   cách → **bỏ dấu câu cuối câu** (`。` `.` `!` `！`, lặp lại) → `trim()` →
   `toLowerCase()`.
2. **Đúng** khi bản chuẩn hoá của đáp án người học **trùng khớp với BẤT KỲ**
   mục nào trong `acceptedAnswers` đã chuẩn hoá.
3. Không có so khớp mờ, không gọi AI.

**Câu tự gõ có NHIỀU ô — chấm thế nào (đã chốt):** so khớp **TỪNG Ô RIÊNG**
(mỗi ô đối chiếu `acceptedAnswers` của chính nó), nhưng **CÂU chỉ tính đúng
khi MỌI ô đều đúng** — không có điểm từng phần ở cấp câu.

- Chấm từng ô là để **phản hồi**: người học thấy đúng ô nào, sai ô nào. Đây
  đúng cách Q10 `chat_text_fill` đang chạy (`incorrectChatSlotIds` đánh dấu
  riêng từng slot sai), nên không phát sinh cơ chế mới.
- Cấp câu không chia điểm lẻ, để **nhất quán với 2 kind chọn phương án**
  (chọn đúng phương án = mọi ô đúng; chọn sai = cả câu sai).

**Hệ quả cho người viết bài (áp cho câu TỰ GÕ):**
- `acceptedAnswers` phải liệt kê **mọi dạng viết hợp lệ**: dạng có hỗ trợ đọc,
  dạng thuần chữ đích, dạng kana thuần… Thiếu một dạng = người học gõ đúng
  vẫn bị chấm sai.
- Phải chứa cả `canonicalAnswer`.
- Vì bước 3 tự bỏ dấu câu cuối, **không cần** thêm biến thể chỉ khác dấu chấm.
- Vì bước 5 hạ chữ thường, khác biệt hoa/thường **không** ảnh hưởng.
- Khoảng trắng thừa giữa từ **không** ảnh hưởng (bước 2), nhưng **có/không có
  khoảng trắng** thì vẫn khác nhau — nếu cả hai cách viết đều đúng, phải liệt
  kê cả hai.

**Hệ quả cho người viết bài (áp cho câu CHỌN PHƯƠNG ÁN):**
- Đúng **4 phương án**; `answersByBlankId` của MỖI phương án phải phủ **đúng
  và đủ** mọi `blankId` của câu — không thiếu ô, không dư ô.
- 3 phương án sai phải **sai hợp lý** (§B9): sai trợ từ, sai register, đúng
  ngữ pháp nhưng sai ngữ cảnh… KHÔNG để phương án sai vô nghĩa khiến đáp án
  đúng lộ ra.
- Vì không có điểm từng phần, tránh kiểu phương án "đúng 1 ô sai 1 ô" gây ức
  chế — mỗi phương án nên sai vì MỘT lý do nhất quán, giải thích được trong
  `explanation`.

---

## PHẦN F — QUY TRÌNH BUILD BÀI (Owner 2026-07-20)

**F-a. CHECKLIST ĐỌC TRƯỚC (bắt buộc mỗi lần build bài):**
- `LESSON_AUTHORING_STANDARD.md` (file này).
- **SỔ KIẾN THỨC của ngôn ngữ đang build** (chỉ mục tra nhanh
  từ/ngữ pháp/nhân vật/bối cảnh đã dạy + đang ở bài nào). Mỗi ngôn ngữ MỘT sổ
  riêng; **đường dẫn sổ + lệnh sinh sổ ghi trong file nguồn riêng** của ngôn ngữ
  đó (không đích danh trong file chung này).
- `scripts/content/sources/<mã>.md` (FILE NGUỒN RIÊNG — V1..V5 + tầng X + giấy
  phép + đường dẫn sổ/lệnh + quy ước hỗ trợ đọc của ngôn ngữ đó). **Chưa có file
  này cho ngôn ngữ đang build → DỪNG, chạy vòng tra "ngôn ngữ mới" ở §F-b trước.**
- `rules/languages/<mã>/` (rule ngôn ngữ FROZEN của ngôn ngữ đang build).
- **Bài đã APPROVED của ngôn ngữ đang build** làm MẪU phong cách (đường dẫn cụ
  thể ghi trong file nguồn riêng).
- `scripts/lib/daily-life-blueprint.mjs` (khung module domain daily_life) — lấy
  ĐÚNG bài tiếp theo, đúng thứ tự, đúng mục tiêu. KHÔNG tự đổi thứ tự curriculum.

**F-b. NGUỒN NỘI DUNG — QUY TRÌNH 5 VÒNG KIỂM NGUỒN (định nghĩa theo LOẠI
nguồn; áp cho MỌI ngôn ngữ).**

> **Tầng:** tên giáo trình CỤ THỂ của từng ngôn ngữ **KHÔNG ghi ở đây** (ghi vào
> file chung = sai tầng — mai build ngôn ngữ khác thì tên của ngôn ngữ trước vô
> nghĩa). Tên cụ thể nằm ở **file nguồn riêng** `scripts/content/sources/<mã>.md`.
> File chung này chỉ định nghĩa 5 vòng theo LOẠI nguồn.

**Năm vòng (định nghĩa theo LOẠI, không theo tên):**
- **V1 — TÀI LIỆU CHUẨN CỦA VIỆN NGÔN NGỮ CHÍNH THỨC** nước đó. Ưu tiên bộ **MIỄN
  PHÍ, có audio, giấy phép cho phép phỏng theo**. Đây là **NGUỒN CHÍNH + CHỐT CHẶN
  CUỐI**.
- **V2 — GIÁO TRÌNH LỚN THỨ HAI** (cùng viện đó, hoặc uy tín tương đương). Dùng khi
  V1 không phủ chủ đề.
- **V3 — GIÁO TRÌNH THƯƠNG MẠI PHỔ BIẾN NHẤT** của tiếng đó — đối chiếu cách trình
  bày ngữ pháp sơ cấp. (Thường bản quyền, không mở nguyên văn → chỉ đối chiếu ở
  **mức chủ đề**, KHÔNG bịa số bài/số trang.)
- **V4 — HAI APP HỌC TIẾNG LỚN** — đối chiếu cách trình bày / độ khó / thứ tự dạy.
  **CHỈ đối chiếu, KHÔNG dùng làm nguồn nội dung chính.**
- **V5 — KHUNG NĂNG LỰC CHÍNH THỨC + KỲ THI CHUẨN** của tiếng đó — kiểm **ĐÚNG CẤP
  ĐỘ** (từ/ngữ pháp này có thuộc trình độ đang dạy không, hay vượt trình độ). Rồi
  **ĐỐI CHIẾU CHÉO và CHỐT**.

**LUẬT CHỐT khi các nguồn đá nhau:**
- Theo **V1** (tài liệu viện ngôn ngữ chính thức).
- V1 **KHÔNG có** nội dung đó → theo **V2**. Vẫn không có → **V3**, và **GHI RÕ
  trong bài "nội dung này ra ngoài V1"** để owner biết.
- Vẫn mâu thuẫn sau 5 vòng → chọn hợp lý nhất, **GHI RÕ đã chọn gì, vì sao, HỎI
  owner**.
- **TUYỆT ĐỐI KHÔNG BỊA** từ vựng/ngữ pháp/hội thoại; không thêm vượt trình độ.
  Không chắc → **HỎI owner**. (KHÔNG cần bảng đối chiếu nguồn/số bài — owner tự
  kiểm nội dung khi duyệt bản đọc.)

**KHI BẮT ĐẦU NGÔN NGỮ MỚI (bắt buộc TRƯỚC khi build bài đầu tiên của ngôn ngữ
X):** chạy MỘT vòng tra xác định — (a) viện ngôn ngữ chính thức của X là gì · (b)
tài liệu chuẩn / miễn phí nào · (c) khung năng lực + kỳ thi chuẩn nào · (d) 2 app
lớn nào dạy X · (e) **GIẤY PHÉP** từng nguồn (được phỏng theo không · có audio
không · dùng thương mại được không) → ghi thành **file nguồn riêng**
`scripts/content/sources/<X>.md` (theo template `scripts/content/sources/_TEMPLATE.md`)
→ **rồi mới build**. Chỉ tạo file riêng KHI thật sự build bài cho X — **KHÔNG tạo
sẵn 33 file rỗng**.

**F-c. LUẬT — ÔN LẠI CÓ KẾ HOẠCH (bắt buộc):** mỗi bài PHẢI cho xuất hiện lại
**3–5 mục** (từ/mẫu) từ **bài liền trước** + **2–3 mục** từ **bài cách 3–4 bài**
— trong ví dụ / hội thoại / practice / Q14, **KHÔNG dạy lại như kiến thức mới**
(không đưa thành headword vocab hay grammar pattern mới). Tra sổ kiến thức để
chọn mục ôn.
> **Vế "bài cách 3–4 bài" CHỈ áp khi ĐÃ ĐỦ số bài trước đó.** Các bài đầu chuỗi
> (chưa có bài cách 3–4 bài) → **bỏ vế này, KHÔNG bịa mục ôn** cho đủ số. Vế "bài
> liền trước" cũng bỏ ở bài đầu tiên tuyệt đối của một ngôn ngữ (không có bài
> trước).

**F-d. LUẬT — NGÂN SÁCH TỪ MỚI:** bài thường **6–10 từ mới** (dù §D2 cho 6–15);
chỉ bài dạng **danh sách** (số đếm, ngày tháng, giờ) mới 12–15. Lý do: bài
10–20 phút, nhồi 15 từ + 3 ngữ pháp là quá tải. Mục **"tham khảo thêm"** (§B2b)
KHÔNG tính vào ngân sách này.

**F-e. LUẬT — DẠY LẠI TRONG NGỮ CẢNH MỚI (làm rõ "không lặp trọng tâm"):** một
từ **ĐÃ DẠY VẪN ĐƯỢC** đưa lại làm từ vựng chính ở bài sau **NẾU** dạy trong
**NGỮ CẢNH / CÁCH DÙNG MỚI** (một từ có nhiều ngữ cảnh — vd một từ dùng ở tình
huống A bài này, tình huống B bài sau). **CẤM** lặp y nguyên ngữ cảnh cũ chỉ để
đủ số. **Ghi rõ trong sổ kiến thức:** từ đó đã dạy ngữ cảnh nào (bài nào), bài
sau dạy ngữ cảnh nào — để phân biệt "dạy lại có chủ đích" với "lặp thừa".

**F-f. SAU MỖI BÀI (bắt buộc, đúng thứ tự):**
1. Cập nhật **sổ kiến thức của ngôn ngữ đang build** (sinh lại từ file bài thật,
   KHÔNG viết tay; lệnh sinh sổ ghi trong file nguồn riêng của ngôn ngữ đó).
2. Ráp `.mjs` + thêm nhánh `FIVE_CARDS_REGISTRY` cho id bài trong
   `helpers.mjs` (+ **bước tiền-xử-lý dữ liệu riêng của ngôn ngữ** nếu quy trình
   ngôn ngữ đó cần — theo file nguồn riêng).
3. `npm run generate:curriculum` → `sync:flutter-assets` → `validate:curriculum`
   + `smoke:curriculum` **PASS** (các **lỗi mềm cũ đã biết** giữ nguyên, **0 lỗi
   mới**; Golden + các bài trước vẫn PASS).
4. **Commit riêng từng bài.**
5. Xuất bản **bản đọc** (readable) cho Owner duyệt (bằng ngôn ngữ đang build).
   CHƯA coi là xong tới khi Owner duyệt.

**F-g. CÂU LỆNH NGẮN:** khi Owner nói **"build N bài tiếp"** → tự chạy TOÀN BỘ
quy trình F-a…F-f cho N bài tuần tự, KHÔNG cần Owner nhắc lại chi tiết. Chạm
giới hạn thì dừng, lần sau tiếp (không mất tiến độ).

**F-h. GHI CHÚ ĐỊNH LƯỢNG (các con số là ƯỚC LƯỢNG VẬN HÀNH, KHÔNG bất biến):**
các con số định lượng trong chuẩn này — số **từ mới** (§F-d), số **mục ôn**
(§F-c), số **mục tham khảo** (§B2b), số nhân vật hội thoại (§G6) … — là **ước
lượng vận hành phục vụ chất lượng học, Owner chỉnh được**, KHÔNG phải hằng số bất
biến. Chỉ **ràng buộc code (PHẦN D)** mới là ngưỡng cứng do validator ép; đừng
lẫn "khuyến nghị vận hành" với "luật validator".

---

## PHẦN G — ĐỘ TIN CẬY NGÔN NGỮ (LANGUAGE RELIABILITY — mọi ngôn ngữ)

> Nhóm luật **provenance**: mọi câu/cụm trong bài phải **truy được nguồn gốc**.
> Áp cho MỌI ngôn ngữ. Tên nguồn / danh sách / ngưỡng CỤ THỂ của từng ngôn ngữ
> nằm ở **file nguồn riêng** (`scripts/content/sources/<mã>.md`) — PHẦN G chỉ
> định nghĩa **cơ chế trừu tượng**. Gom + thay các mảnh provenance từng rải ở
> §A3 / §B8 / §F-b.

**G1 — PHÂN HAI LOẠI VẬT LIỆU.**
- **LOẠI A (cụm cố định):** đơn vị nguồn dạy **NGUYÊN KHỐI**, mọi chỗ xuất hiện
  đều y hệt, **KHÔNG có ô trống**.
- **LOẠI B (mẫu ngữ pháp):** khung **CÓ Ô TRỐNG**, nguồn dạy kèm nhiều ví dụ thay
  thế đa dạng.
- Phân loại theo **CÁCH NGUỒN TRÌNH BÀY** + theo **DANH SÁCH cụm cố định** của
  ngôn ngữ đó (danh sách ở tầng riêng — file nguồn riêng, sinh khi làm ngôn ngữ
  đó). **KHÔNG theo cảm giác AI.**
- Nghi ngờ thuộc loại nào → **xử như LOẠI A** + hỏi owner để bổ sung danh sách.

**G2 — LOẠI A: chỉ dùng NGUYÊN MẪU.** Đúng dạng có trong nguồn hoặc danh sách đã
duyệt. **CẤM thêm / bớt / ghép / đảo / suy biến thể.** Không có trong nguồn →
**KHÔNG DÙNG.** CẤM dùng LOẠI A làm vật liệu điền vào ô trống của LOẠI B.

**G3 — LOẠI B: luật thay thế theo mẫu.**
- Lấy mẫu từ nguồn (mẫu ngữ pháp = **quy ước chung của ngôn ngữ**, không của riêng
  tài liệu nào). Câu ví dụ **TỰ VIẾT bằng thay thế — KHÔNG chép ví dụ của tài
  liệu.**
- Thay **HẾT** từ nội dung trong ô trống bằng **từ ĐÃ DẠY**. Không thay-một-chữ.
- **GIỮ NGUYÊN phần ngữ pháp cốt lõi** của mẫu (phần "cốt lõi không được đụng" do
  **file nguồn riêng từng ngôn ngữ** định nghĩa).
- Từ thay vào phải **HỢP NGHĨA** với vị trí đó (kiểm bằng **tầng X — §G8**).
- Chỉ thay trong **CÙNG NHÓM VAI VẾ**; muốn đổi sang vai đòi cách nói khác → đó là
  **bài dạy riêng về register**, KHÔNG phải thay thế.

**G4 — KHÔNG CHẮC → KHÔNG DÙNG.** Không lấy "đúng ngữ pháp" làm lý do giữ câu chưa
xác minh. **Thà câu đơn giản chắc đúng.**

**G5 — BA BẬC TIN CẬY** (gắn cho **MỌI câu** trong BÁO CÁO cho owner):
- **CHẮC:** chép **nguyên mẫu** từ nguồn / danh sách đã duyệt (ghi kèm tìm thấy ở
  đâu).
- **THEO LUẬT:** câu thay thế **tuân đủ §G3** (kiểm được từng điều kiện).
- **CẦN SOI KỸ:** mọi thứ còn lại (cụm mới, yếu tố mượn trước, câu ghép nhiều
  mẫu).
- **AI KHÔNG được tự xếp câu nó tạo vào bậc CHẮC.** Danh sách **CẦN SOI KỸ đặt
  ĐẦU** bản báo cáo. Ghi nguồn / bậc **CHỈ nằm trong báo cáo cho owner — KHÔNG
  vào data app.**

**G6 — HỘI THOẠI NÂNG CAO (câu cuối bài).**
- Nhiều nhân vật (**3–4** khi vốn từ đủ; bài đầu ít từ thì ngắn hơn, lớn dần).
- **BẮT BUỘC giải thích tình huống + vai vế TRƯỚC hội thoại.**
- Xen kẽ mức **trang trọng / thân mật THEO VAI VẾ.**
- **Lũy tiến:** bài sau dùng thêm vật liệu bài trước; đơn vị sau dùng của đơn vị
  trước; phần sau dùng của phần trước.
- Được dùng yếu tố **CAO HƠN TRÌNH ĐỘ (i+1)** nhưng **CHỈ** từ: **(a)** nguyên
  mẫu **có thật trong nguồn V1/V2**, hoặc **(b)** chương trình bài sau **KHI bài
  đó ĐÃ VIẾT THẬT trong repo**. Bài sau chưa tồn tại → chỉ còn kênh (a). KHÔNG có
  nguồn → **KHÔNG dùng**. Mọi yếu tố mượn trước phải **ĐÁNH DẤU trong báo cáo**
  (thuộc CẦN SOI KỸ).

**G7 — PHẠM VI TỪ VỰNG.** Card nội dung + bài tập **chấm điểm** chỉ dùng **TỪ ĐÃ
DẠY** (tra sổ kiến thức). **Ngoại lệ duy nhất:** hội thoại nâng cao (§G6) và mục
tham khảo (§B2b). Cần từ mới để tự nhiên → **dạy nó**, hoặc **đổi cách viết**,
hoặc **đưa vào tham khảo**. (Bản provenance của §A3 / §B8.)

**G8 — LUẬT TẦNG X (XÁC MINH NGÔN NGỮ) — MỌI ngôn ngữ.** Ba câu hỏi **bắt buộc
tra NGUỒN DỮ LIỆU (KHÔNG dựa trí nhớ mô hình):**
- **X1:** từ này **BẮT BUỘC** đi với cấu trúc / thành phần ngữ pháp nào? (và khi
  biến đổi dạng thì cấu trúc đó đổi thế nào?)
- **X2:** người bản ngữ **CÓ THẬT SỰ** kết hợp các từ này với nhau không?
- **X3:** từ này thuộc **loại nào**, biến đổi dạng theo **quy tắc nào**?
- Nguồn để tra X1–X3 do **file nguồn riêng từng ngôn ngữ** chỉ định (**tầng X**).
  **KHÔNG TRA ĐƯỢC → KHÔNG DÙNG** tổ hợp đó — chọn vật liệu khác đã tra được, hoặc
  hỏi owner. Kết quả tra ghi thành **bảng trong BÁO CÁO** (không vào app).
- **Ngôn ngữ nào ĐÃ CÓ file nguồn cục bộ** (bản scan/PDF/tài liệu offline đã có
  sẵn) thì việc tra X1–X3 + đối chiếu cụm cố định (§G1/§G2) / mẫu ngữ pháp
  (§G3) **PHẢI thực hiện bằng cách MỞ FILE NGUỒN THẬT** — **CẤM thay bằng trí
  nhớ mô hình**, dù trí nhớ có vẻ đúng. Báo cáo cho owner phải ghi rõ **đã mở
  nguồn nào, phần/mục nào** trong nguồn đó để đối chiếu — không ghi chung
  chung "đã tra nguồn". Đường dẫn ổ đĩa + tên file cụ thể của từng ngôn ngữ
  **KHÔNG ghi ở đây** — nằm trong **file nguồn riêng của ngôn ngữ đó**
  (`scripts/content/sources/<mã>.md`).

**G9 — LUẬT CHỐT NGUỒN.** Nội dung không có ở V1 → V2 → V3 (ghi rõ "ra ngoài V1")
→ cả ba không có → **DỪNG, hỏi owner. KHÔNG tự soạn.** (Bản gắn-nhãn-tin-cậy của
luật chốt §F-b.)

**G — GIỚI HẠN THẬT (ghi rõ, không giấu).** Hệ luật G + tầng X chỉ chặn được **lỗi
TRA CỨU ĐƯỢC**: cấu trúc bắt buộc (X1), kết hợp từ phổ biến (X2), loại từ / biến
đổi dạng (X3), từ chưa dạy (§G7). Chúng **KHÔNG chặn được sắc thái tinh tế**
(giọng điệu, độ tự nhiên sâu, hàm ý văn hoá) — **chốt cuối là NGƯỜI DUYỆT biết
ngôn ngữ đó.** Ngôn ngữ **chưa có người duyệt** → độ tin cậy **thấp hơn một bậc**;
**ghi nhận điều này khi quyết định thứ tự ra mắt** ngôn ngữ.

---

## Changelog file này

- **2026-07-19 (bản 1)** — Tạo mới. Gom 24 nguyên tắc Owner + đối chiếu code.
  Nới Q14 số dòng (bỏ ép đúng 14 cho lesson thường, sàn ≥4; Golden khoá 14
  riêng). Free/Plus + audio-example + hỗ-trợ-đọc + bài-20-câu: DỪNG chờ Owner.
- **2026-07-22 (bản 4 — nhóm luật ĐỘ TIN CẬY NGÔN NGỮ)** — Thêm **PHẦN G**
  (G1 phân LOẠI A/B · G2 nguyên mẫu LOẠI A · G3 thay thế theo mẫu LOẠI B · G4
  không chắc → không dùng · G5 ba bậc tin cậy trong báo cáo · G6 hội thoại nâng
  cao + i+1 có nguồn · G7 phạm vi từ đã dạy · G8 tầng X xác minh X1/X2/X3 · G9
  chốt nguồn) + **giới hạn thật** (luật + tầng X không chặn sắc thái tinh tế —
  chốt cuối là người duyệt; chưa có người duyệt → tin cậy thấp hơn một bậc). Toàn
  bộ định nghĩa **trừu tượng theo LOẠI**, không tên ngôn ngữ/nguồn/ví dụ cụ thể.
  **F-c** thêm điều kiện "vế bài cách 3–4 bài chỉ áp khi đủ số bài trước". **F-h**
  ghi rõ các con số định lượng là **ước lượng vận hành** (owner chỉnh được), chỉ
  PHẦN D là ngưỡng cứng. Thêm PHẦN G vào bảng người-đọc cho người viết nội dung.
- **2026-07-22 (bản 3 — sửa lỗi tầng nguồn nội dung)** — **F-b** viết lại thành
  **QUY TRÌNH 5 VÒNG KIỂM NGUỒN định nghĩa theo LOẠI** (V1 viện ngôn ngữ chính
  thức · V2 giáo trình lớn thứ hai · V3 giáo trình thương mại phổ biến · V4 hai
  app lớn chỉ đối chiếu · V5 khung năng lực + kỳ thi chuẩn), + luật chốt khi nguồn
  đá nhau, + quy trình bắt buộc khi bắt đầu ngôn ngữ mới. **Kéo tên giáo trình
  CỤ THỂ của ngôn ngữ pilot RA KHỎI file chung** (danh sách tên nằm ở git
  history + file nguồn riêng) — chuyển vào file nguồn riêng
  `scripts/content/sources/<mã>.md` (template `scripts/content/sources/_TEMPLATE.md`;
  ngôn ngữ pilot đã điền file nguồn riêng). **F-a** thêm file nguồn riêng vào
  checklist đọc trước. Không đụng nội dung bài / rule ngôn ngữ / frontend.
- **2026-07-19 (bản 2 — Owner mở khoá Golden)** — Áp rule mới cho MỌI bài kể cả
  Golden (ADR-008 Amendment). **E1** Free/Plus → Q1–Q9 / Q10–Q14 (Golden Q10
  free→plus, boundary `index<9`, invariant test cập nhật). **E2** audio mọi
  vocab example (`speechText`=`reading` cách-đọc-thuần), validator ép speechText
  trên vocab card + example + dialogue line + Q14. **E3** hỗ trợ đọc: ghi cơ chế
  thật (reading trường riêng, không auto-ghép), Golden displayText giữ nguyên.
  **E4** bài 20 câu cuối unit: ghi đặc tả, chờ triển khai (chưa build).
  validate:curriculum + smoke:curriculum PASS, Golden PASS.

- **2026-07-22 (bản 5 — dọn nợ tầng cơ chế hỗ trợ đọc + ví dụ + tên file
  ngôn-ngữ)** — **A1** §C2/§E3 mô tả hỗ trợ đọc viết lại TRỪU TƯỢNG ((a) trường
  đọc thuần cho đối chiếu/bài tập, (b) trường hiển thị gắn hỗ trợ đọc, (c) quy
  ước hiển thị do file nguồn riêng định) — bỏ tên/định dạng/ví dụ của một ngôn
  ngữ. **A2** ví dụ B2b thay bằng placeholder trừu tượng (ví dụ cụ thể → file
  nguồn riêng). **A3** §F-a/§F-f nhắc sổ kiến thức + bài mẫu theo "ngôn ngữ đang
  build" (đường dẫn/lệnh ở file nguồn riêng), KHÔNG đổi tên file/script thật.
  **A4** §D9–D12 GIỮ NGUYÊN (bản sao code thật + artifact Golden đã đóng băng) +
  thêm câu chú giải đây là tham chiếu cụ thể, không phải quy ước mọi ngôn ngữ.
  **A5** rà nốt: "romaji"→"chữ Latin", locale-set trong instruction→"đủ locale",
  ví dụ ngôn ngữ trong prose/changelog → trừu tượng. File chung + template giờ
  chỉ còn token cụ thể ở khối D9–D12/E1–E2 (artifact ref, cố ý giữ + đã chú
  giải).

- **2026-07-23 (bản 6 — G8 bổ sung: bắt buộc mở file nguồn cục bộ thật)** —
  **G8** thêm bullet: ngôn ngữ đã có file nguồn cục bộ (scan/PDF offline) thì
  tra X1–X3 + đối chiếu cụm cố định/mẫu ngữ pháp **phải mở file nguồn thật**,
  **cấm** thay bằng trí nhớ mô hình; báo cáo phải ghi rõ đã mở nguồn nào/phần
  nào. Đường dẫn + tên file cụ thể vẫn KHÔNG ghi ở đây — nằm ở file nguồn
  riêng từng ngôn ngữ. Không đụng nội dung bài / rule ngôn ngữ / frontend.
  Đồng thời: nhận diện xong toàn bộ file nguồn cục bộ tiếng Nhật thật (chữ
  thật vs ảnh scan), tổ chức lại `local-sources/` theo quy ước
  `<mã ISO>/<loại-nguồn>/` (trước đây thư mục tên `japanese/`, không nhất
  quán với `rules/languages/ja/`), và thêm mục "ĐƯỜNG DẪN FILE NGUỒN CỤC BỘ"
  + ghi chú ngắn cho ngôn ngữ mới vào `_TEMPLATE.md`. Không có file bản quyền
  nào được commit (`local-sources/` vẫn gitignore).
