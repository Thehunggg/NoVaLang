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
- **ÂM THANH PHÁT HÀNH = TTS CỦA THIẾT BỊ** (owner chốt 2026-07-30). Không thu
  âm, không file audio đóng gói. `speechText` là **hợp đồng dữ liệu** với TTS —
  viết đúng cách đọc, không viết mặt chữ còn ngoặc chú âm. Nếu sau này mua
  audio thu sẵn thì **chỉ THÊM trường mới**, `speechText` giữ nguyên, không
  đổi nghĩa, không bỏ.
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

**B2f. NGHĨA CỦA TỪ CHƯA DẠY TRONG HỘI THOẠI — CƠ CHẾ ĐÃ CHỐT (owner
2026-08-02, thay bản "CHƯA CÓ" 2026-07-27).**
(§G7 vùng B điều kiện 3 phụ thuộc mục này.)

**Lịch sử ngắn:** bản 2026-07-27 kiểm schema/UI lúc đó, kết luận không có
trường `gloss`/`annotation`/`newWords` gắn vào TỪNG DÒNG hay TỪNG NHÓM hội
thoại — đúng, vẫn đúng tới hôm nay (`shared/types.ts`, model Flutter
`PracticeDialogueLine`, `_DialoguePanel` không đổi). Từ đó kết luận
`vocabularyReferences` "dùng cho việc này là bẻ cong ý nghĩa của trường" và
**§G7 vùng B chưa dùng được**. Kết luận đó bị chính thực tế build vượt qua
**một ngày sau**: `ja-daily_life-m01-u2-l2` (2026-07-28) dùng đúng
`vocabularyReferences` cho `半年`/`なんとか` — hai từ xuất hiện trong Q14,
chưa từng là thẻ từ vựng — với ghi chú tại chỗ "'Tham khảo thêm' (§B2b) —
hai từ xuất hiện ở Q14, đúng mức 'dư 1–2 từ mới' mà §G14-R5 cho phép." Bài
đó đã lên `shared/generated/lessons.json`, qua mọi cổng, chưa ai gỡ.

**Trạng thái: CÓ, dạng WORKAROUND — không phải cơ chế lý tưởng.**
- `vocabularyReferences` (card 2) là một **danh mục ĐỘC LẬP với vị trí dùng**
  — không gắn vào một dòng/nhóm hội thoại cụ thể như `newWords[]` ở đề xuất
  cũ sẽ làm, nhưng người học vẫn tra được: mở card 2, tìm đúng `term`.
- Không phân biệt được "từ lạ trong dialogueGroups (card 3)" với "từ lạ
  trong Q14 (card 5)" hay "cách dùng mới của từ đã dạy" (§B2b) bằng CẤU
  TRÚC — cùng một mảng, cùng một hình dạng. Phân biệt bằng **ghi chú tại
  chỗ trong code** (comment ngay trên mảng, như ca `半年`/`なんとか` và ca
  こちらこそ ở `m02-u1-l2`) — không phải trường máy đọc được.
- **Đủ để thoả điều kiện 3 của §G7 vùng B** (owner chốt): nghĩa CÓ hiển thị
  cho người học, chỉ là không hiển thị NGAY TẠI DÒNG hội thoại chứa từ đó.
  Owner chấp nhận đánh đổi này để không phải chờ xây `newWords[]`.

→ **Hệ quả:** §G7 vùng B **DÙNG ĐƯỢC** kể từ 2026-08-02, với điều kiện 3 thoả
mãn bằng `vocabularyReferences`. `verify-provenance.mjs` gác bằng máy (G14-R5
mở rộng) — mọi từ lạ trong khối hội thoại phải khớp một `term` trong
`vocabularyReferences`, thiếu → FAIL.

**Đề xuất cũ (vẫn CHƯA làm, vẫn là hướng tốt hơn nếu có ngân sách sau
này):** trường TUỲ CHỌN `newWords[]` gắn thẳng vào cấp NHÓM hội thoại/Q14 —
xem lý do trong lịch sử git của mục này (bản 2026-07-27). Không bắt buộc khi
`vocabularyReferences` đã đủ thoả điều kiện 3.

**B3. Card 3 — Dialogue.** (Owner §6; ràng buộc §D3)
- Số nhóm và số dòng mỗi nhóm là **KHOẢNG**, định nghĩa ở
  `scripts/lib/five-cards-ranges.mjs` (`dialogueGroups` · `dialogueLinesPerGroup`)
  — xem §D3. Tự nhiên, mục đích giao tiếp
  rõ, lượt sau phản ứng hợp lý với lượt trước, phù hợp tình huống. Trọng tâm là
  kiến thức mới; tái dùng cũ cho phong phú.
- Không ghép vocab+grammar thành câu rời rạc. Câu đúng ngữ pháp vẫn loại nếu
  người bản ngữ ít nói vậy. Ưu tiên Naturalness + Context + Communicative
  Purpose.
- Dùng **character pool** theo hệ thống; KHÔNG dùng placeholder `[Tên]` nếu hệ
  thống yêu cầu nhân vật cụ thể (mọi `speakerId` phải nằm trong
  `approvedCharacterNamePool` — code ép, §D3).

**B4. Card 4 — Grammar.** (Owner §7; ràng buộc §D4) Số mẫu ngữ pháp là
**KHOẢNG**, định nghĩa ở `scripts/lib/five-cards-ranges.mjs` (`grammarPatterns`)
— xem §D4, là kiến thức mới hoặc mở rộng hợp lý cái đã học. Không lấy nguyên grammar
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
chưa dạy, vẫn **ÍT NHẤT 2 distractor**. (Q13 code ép: số `answerSlots` là
KHOẢNG — `advancedOrderingSlots` trong `scripts/lib/five-cards-ranges.mjs` —
+ ≥1 unusedToken — §D6.)

**B12. Matching.** (Owner §15) 2 cột **shuffle độc lập**, không để thứ tự tự
tương ứng, mỗi item mapping rõ, tránh nhiều đáp án cùng đúng nếu không hỗ trợ.
Kiểm tra hiểu thật. (Q3 code ép: số pairs là KHOẢNG — `matchingPairs` trong
`scripts/lib/five-cards-ranges.mjs` — mỗi pair có id/left.id/right.id — §D6.)

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
  chữ Latin · `romanization` theo pipeline của ngôn ngữ (nếu có) · số scene
  divider là KHOẢNG (`sceneDividers` trong `scripts/lib/five-cards-ranges.mjs`),
  mỗi dải có dịch đủ locale.

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
> **Luật chọn loại nhiễu đứng TRƯỚC danh sách kiểm này: §G13** — mặc định dùng
> **nhiễu cơ học**; nhiễu cả cụm / cả câu là **hạn chế**, không chắc thì đổi sang
> cơ học. Các mục dưới đây là bước kiểm sau khi đã chọn loại.
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

**D3. Card 3 dialogue.** Số nhóm và số lượt mỗi nhóm là **KHOẢNG**, định nghĩa ở
**`scripts/lib/five-cards-ranges.mjs`** (`dialogueGroups` · `dialogueLinesPerGroup`)
— **một nguồn duy nhất**, validator và smoke cùng đọc. Cỡ soạn mặc định: **G14-R3b**.
Đừng chép số ra đây; số ở file này cũ đi mà không ai biết (bản trước ghi "đúng 3
nhóm" trong khi code đã là khoảng).
(Owner chốt 2026-07-27 — hạ sàn từ 4, đặt trần 8. Cùng loại tiền lệ với
"đúng 8 thẻ từ vựng" → khoảng 6–15, ADR-019 amendment.)

- **Sàn 2, không phải 4.** Sàn 4 cũ **cao hơn cái nguồn cấp**: đo 634 đoạn hội
  thoại thật trong giáo trình chính thống (A1→B1) thì **trung vị 2 lượt**, và
  riêng mảng chào hỏi trình độ nhập môn thì **không có đoạn nào quá 3 lượt** —
  vì ngoài đời lời chào vốn ngắn: chào một hai câu rồi rẽ sang việc chính.
  Sàn 4 vì thế **buộc người viết phải tự kéo dài**, tức tự xếp — chính là gốc
  của ba vòng sửa mạch hội thoại ở một bài. Sàn 2 là ngưỡng thật của một cuộc
  trao đổi: một người nói, một người đáp. Dưới 2 thì không còn là hội thoại.
- **Độ dài đi theo ĐOẠN NGUỒN, không theo con số.** Nguồn cho 2 lượt thì viết
  2 lượt. Cấm kéo dài cho "đủ đẹp". Tự xếp thì phải khai theo **§G10**.
- **Trần 8.** Cùng phép đo trên: **95% đoạn ≤ 6 lượt, 99% ≤ 8**, dài nhất 12.
  Chọn 8 vì nó phủ gần trọn cái thật mà vẫn chặn được thứ đã hết là hội thoại
  mẫu: quá 8 lượt thì người học không còn NGHE-NHẮC-LẠI được nữa, nó thành bài
  ĐỌC HIỂU — mà đọc hiểu là việc của Q14 và của bài tổng hợp, không phải của
  card 3. Trần này lấy từ số đo nguồn, **không chép từ Golden**.

Bắt buộc:
`targetLanguage === lesson.languageCode`, `targetLocale`, `cultureContext`,
`approvedCharacterNamePool` (mỗi nhân vật có `id/displayName/canonicalName/
audioName`); mọi `speakerId` phải nằm trong pool. (`:953–971`)

**D4. Card 4 grammar.** Số mẫu ngữ pháp là **KHOẢNG**, định nghĩa ở
**`scripts/lib/five-cards-ranges.mjs`** (`grammarPatterns`) — **một nguồn duy
nhất**. Cỡ soạn mặc định: **G14-R3b**. (Bản trước ghi "đúng 3" trong khi code đã
là khoảng.)

**D5. Card 5 practice.** `totalQuestions === 14` và **đúng 14 exercises**
(`:977`). Mỗi exercise: `order === index+1`. **Plan boundary: `index < 9` →
`free`, còn lại → `plus`** = **Free Q1–Q9 / Plus Q10–Q14** (`:981`; smoke
`:164`, `:250`). Áp cho mọi lesson kể cả Golden (ADR-008 Amendment 2026-07-19;
Golden Q10 đã đổi `free → plus`).

**D6. Loại câu ÉP CỨNG (chỉ 5 câu; còn lại tự do).**
LOẠI câu bị ép; **SỐ LƯỢNG bên trong mỗi câu là KHOẢNG** ở
**`scripts/lib/five-cards-ranges.mjs`** — tên khoảng ghi trong ngoặc dưới đây.
Không chép số ra đây.
- Q3 (index 2) = `matching`, `matchingPairs` cặp, mỗi pair có `id/left.id/right.id`.
  (`:998`)
- Q9 (index 8) = `checkpoint`, `checkpointSubQuestions` câu con, mỗi câu
  `optionsPerQuestion` phương án + `correctOptionId` hợp lệ. (`:986`)
- Q10 (index 9) = `chat_text_fill`, `chatMessages` tin nhắn, `chatSlots` ô, mỗi ô đủ
  `displayText/canonicalText/audioText/acceptedAnswers`. (`:1006`)
- Q13 (index 12) = `slot_ordering`, `advancedOrderingSlots` `answerSlots`,
  **≥1 `unusedTokenIds`** (distractor). (`:1015`)
- Q14 (index 13) = `real_world_practice_dialogue` (§D7).
- **Q1, Q2, Q4, Q5, Q6, Q7, Q8, Q11, Q12: loại KHÔNG bị ép** — chọn theo khung
  gợi ý §B7.

**D6c. LUẬT CHUNG — MỌI RÀNG BUỘC ĐỊNH LƯỢNG PHẢI LÀ KHOẢNG.**
(Owner chốt 2026-07-27. **Đây là luật đứng trên §D6b** — §D6b nay chỉ còn giá
trị lịch sử, ghi lại lớp lỗi đã phát hiện; §D6c là luật áp cho về sau.)

1. **Mọi ràng buộc định lượng trong validator PHẢI là KHOẢNG `[min, max]`**,
   KHÔNG phải số cố định — trừ khi có **lý do sản phẩm ghi rõ ngay tại chỗ**
   (hiện chỉ còn `totalQuestions = 14`: độ dài bài là quyết định sản phẩm).
2. **Mỗi khoảng phải kèm LÝ DO + CĂN CỨ ngay tại chỗ định nghĩa**, không phải
   ở tài liệu khác. Tất cả nằm trong **`scripts/lib/five-cards-ranges.mjs`**,
   dùng chung cho validator và smoke để hai bên không lệch nhau.
3. **Thứ tự ưu tiên khi đặt khoảng:**
   - **(a) ĐO nguồn thật.** Đo được thì đo; ghi rõ đo cái gì, bao nhiêu mẫu.
   - **(b) Không đo được → khoảng RỘNG**, chỉ chặn cái *thật sự* hỏng (rỗng,
     hoặc nhiều tới mức vỡ màn). Ghi rõ **"chưa có căn cứ đo"**.
   - **(c) TUYỆT ĐỐI KHÔNG** chép số từ Golden rồi gọi đó là khoảng.
4. **DẤU HIỆU NHẬN BIẾT số chép từ Golden:** khi viết bài mới phải **THÊM/BỚT
   nội dung cho vừa con số**, thay vì nội dung tự nhiên rơi vào khoảng đó.
   Ba ca đã lộ đúng dấu hiệu này: Q10 phải độn 4→6 tin nhắn; Q13 phải ghép hai
   câu rời cho đủ 6 ô; Q14 phải **vứt bỏ một trong ba đoạn nguyên văn** của
   nguồn vì luật chỉ cho đúng 1 dải phân cảnh.
5. **Gặp số ép chưa có lý do → NỚI thành khoảng rộng và ghi chú. KHÔNG bẻ nội
   dung cho vừa.** Bẻ nội dung là làm hỏng bài để chiều một con số chưa ai kiểm.
6. **Số ép còn sót phát hiện sau này: SỬA LUÔN theo luật này, KHÔNG cần hỏi
   owner từng cái.** Chỉ báo lại trong báo cáo.
7. **Ngoại lệ duy nhất — khoá nội dung Golden** (`validateApprovedGoldenLesson\
Content`, `checkApprovedJaUnitOneLesson`): ở đó số cố định là ĐÚNG, vì nhiệm vụ
   của nó là khoá đúng hình dạng thật của Golden, không phải ra luật chung.

**D6b. RÀ CÁC CON SỐ ĐANG BỊ ÉP — cái nào có lý do thật, cái nào chép từ Golden.**
(Rà 2026-07-27. **ĐÃ XỬ LÝ XONG 2026-07-27 theo §D6c** — mọi mục "NGỜ" bên dưới
nay đã thành khoảng trong `scripts/lib/five-cards-ranges.mjs`. Giữ bảng lại làm
hồ sơ lớp lỗi, không còn là việc tồn.)

**Bằng chứng nền:** ADR-019 ghi rõ `validateFiveCardsStructure` được **tách ra
từ** `validateApprovedJaUnitOneLesson` (bộ kiểm CHỈ dành cho Golden), và chỉ nêu
đích danh **2** phép kiểm được tổng quát hoá (`targetLanguage`,
`unusedTokenIds`). Mọi con số còn lại **theo cấu tạo là hình dạng của Golden**,
không phải luật sản phẩm. Ca "đúng 8 thẻ từ vựng → khoảng 6–15" (ADR-019
amendment) là **một** thành viên của lớp lỗi này; dưới đây là các thành viên còn
lại. Đo trên cả 4 bài five_cards hiện có thì mọi ô đều bằng nhau — **không phải
bằng chứng con số đúng, mà vì validator ép chúng bằng nhau**; nên phải xét lý do
chứ không xét dữ liệu.

| Con số bị ép | Giá | Xếp loại |
|---|---|---|
| `dialogueGroups` = **3** | 3 | **Có ý định thật** — owner §6: ba tình huống = ba biến thể vai vế/ngữ cảnh. Vẫn nên cân nhắc thành khoảng. |
| `grammarPatterns` = **3** | 3 | **Có ý định thật** (§B4) nhưng ngờ: một bài có 2 mẫu là chuyện bình thường. |
| Q3 `matching.pairs` = **4** | 4 | **Có thể do UI** — 4 cặp vừa một màn không cuộn. Chưa ai kiểm 3 hay 5 có vỡ không. |
| Q9 `subQuestions` = **5** | 5 | **NGỜ** — số tròn, không thấy ràng buộc nào. |
| Q10 `chat.messages` = **6** | 6 | **NGỜ NẶNG — nhiều khả năng chép Golden.** Bằng chứng thực nghiệm: khi viết u2-l1 tôi đã phải **độn từ 4 lên 6 tin nhắn** cho vừa con số, không phải vì nội dung cần. |
| Q10 `slots` = **2** | 2 | Đi kèm dòng trên; 2 ô là hợp lý nhưng cũng chưa ai kiểm. |
| Q13 `answerSlots` = **6** | 6 | **NGỜ NẶNG — nhiều khả năng chép Golden.** Bằng chứng thực nghiệm: u2-l1 phải **ghép hai câu rời** 「先生、おはようございます。ひさしぶりですね。」 chỉ để đủ 6 ô. Đúng triệu chứng bẻ nội dung cho vừa con số. |
| `totalQuestions` = **14** | 14 | **Quyết định sản phẩm** (độ dài bài), không cùng lớp — để nguyên. |

**Dấu hiệu nhận biết chung:** con số nào mà khi viết bài mới ta phải **thêm/bớt
nội dung cho vừa nó** thay vì nội dung tự nhiên rơi vào khoảng đó → gần như chắc
là số chép từ Golden. Hai ca Q10 và Q13 ở trên đều đã lộ đúng dấu hiệu này.

**D7. Q14 real_world_practice_dialogue.** `type === real_world_practice_dialogue`,
`nonGraded === true`, có `scenarioTitleByNative.vi` + `scenarioDescriptionByNative
.vi`. **Số dòng: đã NỚI (Owner 2026-07-19)** — chỉ còn **sàn ≥ 4 dòng**, KHÔNG
trần, KHÔNG ép đúng 14 (`validate-curriculum.mjs:~1029–1043`;
`smoke:~265–275`). Mỗi dòng: `speakerId` trong pool · `targetText` +
`speechText` · `translationByNative` đủ locale native · `reading` KHÔNG chứa
chữ Latin (`[a-zA-Z]`) · `romanization` qua pipeline. Số dải phân cảnh theo khoảng
`sceneDividers` (`scripts/lib/five-cards-ranges.mjs`), mỗi dải có dịch đủ locale
native. (`:1026–1069`) — bản trước ghi "đúng 1", trong khi code cho phép **0**:
chính con số 1 đó từng bắt u2-l1 vứt bỏ một đoạn nguyên văn của nguồn (§D6b).

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

**E4. Bài tổng hợp cuối Unit — ĐÃ CHỐT THIẾT KẾ + generator/validator/UI ĐÃ
LÀM (2026-07-25, xem "Đã có" cuối mục này); CHƯA có nội dung bài thật ngoài
`ja-daily_life-m01-u1`.**

*Owner đã chốt (2026-07-25):* dạng bài = **CLOZE — điền vào chỗ trống**, chấm
bằng **so khớp cố định, KHÔNG dùng AI** (tiết kiệm chi phí API); nội dung
**chỉ gộp từ vựng + mẫu ngữ pháp ĐÃ DẠY trong unit** (§G7); **CÓ chấm điểm**;
**gate PLUS toàn bài** (nhất quán ranh giới Q10–Q14 của lesson thường).

**SỐ CÂU = KHOẢNG 18–25, quy đổi theo lượng nội dung unit** (owner chốt
2026-07-30 — đây là con trỏ hiện tượng, không phải một khoảng liên tục để nội
suy; số THẬT nằm ở `SECTION_PLANS`, `scripts/lib/unit-comprehensive-test.mjs`,
đo lại ở bảng "Số câu SUY RA" bên dưới. **CHỈ 2 mức** (không phải 3 — mức thứ
ba `typed_blank` đã bỏ, xem dưới):

| Câu (unit 3 lesson) | Loại (`kind`) | Hình thức | Số ô | Cách nhập |
|---|---|---|---|---|
| 1–8 | `sentence_multi_blank_choice` | 1 câu hoặc 2 câu ngắn | **2** | Chọn 1 trong **4 phương án** |
| 9–25 | `dialogue_multi_blank_choice` | **Hội thoại 2–3 lượt** | **3** | Chọn 1 trong **4 phương án** |

- **`typed_blank` (tự gõ) ĐÃ BỎ KHỎI MỌI KẾ HOẠCH — owner chốt 2026-07-25,
  commit `1b470ac`.** Lý do (nguyên văn code): "câu tự gõ không nêu đủ tình
  huống thì NHIỀU đáp án khác đáp án chuẩn vẫn đúng, nên bộ chấm cố định sẽ
  chấm sai người trả lời đúng." Kiểu này vẫn còn trong schema/generator/
  Flutter enum để dùng lại sau, nhưng **hiện KHÔNG kế hoạch nào ánh xạ tới
  nó** — không viết câu `typed_blank` cho bài mới.
- **Mỗi phương án chứa đáp án cho TẤT CẢ ô** của câu (vd `A. ①です
  ②よろしくお願いします`) → chọn một lần là điền xong cả câu; đúng khi chọn
  đúng phương án (tức mọi ô đều đúng).
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
KHÔNG được tự khai) — đo trực tiếp từ `SECTION_PLANS`/`SECTION_KINDS`
(`scripts/lib/unit-comprehensive-test.mjs`, cập nhật lần cuối commit
`1b470ac`, 2026-07-25):

| Số lesson của unit | Tổng câu | Chia 2 mức | Dải order |
|---|---|---|---|
| 3 lesson | **25** | 8 / 17 | 1–8 · 9–25 |
| 2 lesson | **18** | 6 / 12 | 1–6 · 7–18 |

Số lesson khác → generator **fail loud**, KHÔNG tự chế tỉ lệ mới; thêm kế
hoạch mới cần owner duyệt. (Bản trước ghi "chia 3 mức" và dải order 3-lesson
sai — 9–18 thay vì 9–25 — sót lại từ thiết kế gốc trước khi `typed_blank` bị
bỏ cùng ngày; số ở bảng này giờ khớp trực tiếp code, không chép tay.)

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

*Nội dung bài thật:* `UNIT_COMPREHENSIVE_REGISTRY` có **một** mục
(`ja-daily_life-m01-u1`, 25 câu, 2026-07-25) — không còn rỗng. Mọi unit khác
chưa có bài tổng hợp chạy được trong app. Viết nội dung là task riêng, cần
Owner duyệt theo `AGENTS.md`.

---

**§D-Cloze. CƠ CHẾ CHẤM (bài tổng hợp) — TÁI DÙNG cơ chế đã chạy thật.**

> **(B) dưới đây KHÔNG DÙNG HIỆN TẠI.** `typed_blank` đã bỏ khỏi mọi kế hoạch
> 2026-07-25 (xem §E4). Giữ mục (B) lại làm tài liệu cơ chế — schema/generator/
> Flutter vẫn còn nguyên để dùng lại sau — nhưng **không viết câu `typed_blank`
> cho bài mới**; mọi bài hiện tại chỉ dùng (A).

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

**PHẠM VI — TÁCH VAI với G14-R3 (owner chốt 2026-07-30).** §F-b và G14-R3
từng đọc như hai luật trái nhau về cùng một câu hỏi "Irodori xếp ưu tiên mấy".
Owner tách rõ: §F-b trả lời **"nhiều nguồn nói khác nhau về MỘT SỰ THẬT NGÔN
NGỮ (từ này có nghĩa gì, mẫu này dùng khi nào) thì tin ai"** — vẫn dùng nguyên
khi build một ngôn ngữ MỚI, nơi có thật nhiều nhà xuất bản độc lập cần xếp
hạng độ tin cậy. G14-R3 trả lời một câu khác — **"trong kho nguồn ĐÃ MỞ của
`ja`, ô dữ liệu này lấy CÂU/CỤM từ file nào trước"** — G14-R3 **GIỮ NGUYÊN**,
không sửa gì ở đây.

**Vì sao thang V1–V5 KHÔNG áp được cho kho nguồn owner tự soạn** (owner xác
nhận 2026-07-30): thang V1–V5 xếp hạng theo ĐỘ TIN CẬY CỦA NHÀ XUẤT BẢN — viện
ngôn ngữ chính thức tin hơn app học tiếng, giáo trình lớn tin hơn giáo trình
nhỏ. Khi TOÀN BỘ kho (Irodori, `topic1-5.json`, `ban1.txt`, `ban2.txt`) đều là
**owner tự soạn hoặc thuê soạn** (G14-R3, xác nhận 2026-07-30), không còn
nhiều "nhà xuất bản" để so — thang tin-cậy-theo-nhà-xuất-bản mất nghĩa. Xếp
Irodori là "V1" trong hoàn cảnh đó không sai lý thuyết, nhưng vô nghĩa: không
có V2/V3 độc lập nào để Irodori "thắng". Vì vậy nhãn V1 đã **bỏ khỏi các file
IRODORI** trong `scripts/content/sources/ja.md` — xem file đó.

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

**MIỄN TRỪ ĐÃ GHI — `ja-daily_life-m01-u2-l2`, khoản "xen kẽ trang trọng/thân
mật theo vai vế".** Phần "xen kẽ trang trọng/thân mật theo vai vế" — owner quyết
2026-07-30 giữ đồng loạt thể lịch sự cho u2-l2. Đây là QUYẾT ĐỊNH SẢN PHẨM của
owner, KHÔNG phải hạn chế kỹ thuật: u2-l1 đã dạy thể thường (久しぶり/元気？/うん)
và có nhóm both-casual + mixed-register, nên xen kẽ là làm được.

Ba khoản còn lại của G6 **vẫn áp đủ** cho u2-l2 — riêng khoản "giải thích tình
huống + vai vế trước hội thoại" đã ghi cho cả 5 bài ngày 2026-07-30.

**G7 — PHẠM VI TỪ VỰNG — TÁCH LÀM HAI VÙNG.** (Owner chốt 2026-07-27, thay bản
"cấm mọi từ chưa dạy" trước đó.)

Bản cũ cấm từ chưa dạy ở **mọi** chỗ. Luật đó **có giá trị thật** — nó đã bắt
được lỗi ở nhiều bài (từ chỉ mốc thời gian chưa dạy, tiểu từ chưa dạy, trợ từ
cuối câu chưa dạy) — nên **KHÔNG bỏ**. Nhưng áp một mức nghiêm cho cả bài làm
hội thoại nghèo đi một cách vô lý: người học ĐỌC được nhiều hơn nhiều so với
những gì họ SẢN XUẤT được, và ép hội thoại chỉ chứa vốn đã dạy thì buộc người
viết phải **tự chế câu** thay vì lấy câu thật. Vì vậy tách vùng áp dụng:

**VÙNG A — BỊ CHẤM ĐIỂM. G7 NGHIÊM NGẶT, không ngoại lệ.**
Gồm: toàn bộ bài tập có chấm (ở lesson thường là Q1–Q13), đáp án, ô điền,
phương án chọn, token sắp xếp, và mọi chuỗi mà câu trả lời của người học được
so với nó.
→ **Chỉ dùng vốn ĐÃ DẠY** (tra sổ kiến thức).
→ **Lý do:** chấm điểm bằng từ chưa học là chấm sai người trả lời đúng. Người
  học sai không phải vì không hiểu bài, mà vì bài dùng thứ chưa dạy họ. Đây là
  lỗi của người viết, không phải của người học.

**VÙNG B — CHỈ ĐỌC HIỂU. ĐƯỢC dùng từ chưa dạy, kèm 4 điều kiện BẮT BUỘC.**
Gồm: hội thoại (card 3), ví dụ của thẻ từ vựng và mẫu ngữ pháp, mục tham khảo
(§B2b), và hội thoại thực tế không chấm (Q14 / §G6).
→ Được dùng từ chưa dạy **khi và chỉ khi đủ CẢ BỐN**:
  1. **Đoạn lấy NGUYÊN VĂN từ nguồn** (§G10). Cấm tự chế câu chứa từ chưa dạy —
     từ chưa dạy chỉ được đi vào bài **bám theo một câu thật**, không bao giờ
     do người viết ghép ra.
  2. **Mọi kanji có furigana** (§B2d, vốn đã bắt buộc — nhắc lại vì vùng này là
     nơi kanji lạ hay xuất hiện nhất).
  3. **Từ chưa dạy phải có NGHĨA hiển thị cho người học** — không để họ đoán
     mò. Cơ chế hiển thị xem §B2f.
  4. **Không lạm dụng.** Từ chưa dạy là **ngữ cảnh**, không phải trọng tâm. Nếu
     người học phải hiểu từ chưa dạy mới nắm được điểm dạy của bài thì đó là
     lỗi thiết kế — hoặc dạy từ đó hẳn, hoặc chọn đoạn khác.

**Ranh giới khi một chuỗi nằm ở cả hai vùng:** áp VÙNG A. Ví dụ một câu hội
thoại được bê nguyên làm đáp án của một bài tập → câu đó chịu luật vùng A.

**G10 — HỘI THOẠI LẤY NGUYÊN ĐOẠN, KHÔNG TỰ XẾP CỤM.** (Owner chốt 2026-07-27,
sau ba vòng sửa mạch hội thoại ở một bài — cả ba đều là lỗi XẾP, không phải lỗi
CỤM.)

Cách làm sai đã lộ: lấy đúng **từng cụm** từ nguồn rồi **tự xếp** thành hội
thoại. Cụm thì đúng, nhưng thứ tự và ai-đáp-ai là do người viết nghĩ ra — nên
mạch hỏng (một lượt gộp hai việc trái nhau; có người chào mà không ai đáp; chào
xong tạm biệt ngay). **Cụm có nguồn KHÔNG làm cho đoạn ghép có nguồn.**

- **Hội thoại trong bài phải LẤY NGUYÊN ĐOẠN có sẵn trong nguồn.** Nguồn đã có
  hội thoại thật thì mạch đã đúng sẵn — không phải tự nghĩ, không phải sửa lại.
- **Ưu tiên đoạn PHONG PHÚ**: nhiều lượt, nhiều vai, tự nhiên. Giữa hai đoạn
  cùng đúng, chọn đoạn dài và giàu hơn.
- **Chỉ được tự sắp xếp khi thật sự không có đoạn nào dùng được.** Khi đó
  **BẮT BUỘC ghi rõ "đoạn này do tự xếp"** trong báo cáo cho owner, kèm lý do
  đã tìm mà không có. Không ghi = coi như khai man nguồn.
- **Ghi chú vận hành (đo thật, 2026-07-27):** ở trình độ nhập môn, hội thoại
  chào hỏi trong giáo trình chính thống thường chỉ **2–3 lượt** rồi rẽ sang nội
  dung khác — vì ngoài đời lời chào vốn ngắn. Sàn "4–6 lượt mỗi nhóm hội thoại"
  ở §D vì thế **cao hơn cái nguồn cấp** cho riêng loại chủ đề này. Gặp mâu
  thuẫn giữa §D và §G10 thì **DỪNG, hỏi owner** — không tự nới sàn, cũng không
  tự kéo dài đoạn nguồn cho đủ số lượt.

**§G10a — ĐỔI TÊN NHÂN VẬT KHI NỚI ĐOẠN (owner chốt 2026-08-02).** Ca thật:
`ja-daily_life-m02-u1-l2` khối こちらこそ chỉ trích được 2 lượt từ Irodori vì
đoạn liền kề (cảnh chào hỏi ở nhà, nhiều lượt) dùng nhân vật NGOÀI roster đã
duyệt (トアン／福田／福田の妻／タケル) — nới đoạn bị ROSTER chặn, không phải bị
ngưỡng từ lạ (§G14-R5) chặn. Hai giới hạn này ĐỘC LẬP, đừng lẫn.

- **Khi nới đoạn** (đã đủ điều kiện §G7 vùng B, kể cả ngưỡng từ lạ) **mà lượt
  liền kề trong nguồn dùng tên nhân vật NGOÀI `approvedCharacterNamePool`**,
  được phép **ĐỔI TÊN NGƯỜI** sang một tên trong roster đã duyệt, để dùng
  được đoạn dài hơn.
- **Chỉ đổi TÊN NGƯỜI** (phần chỉ đích danh nhân vật) — **không đổi bất kỳ
  chữ nào khác** trong câu (không đổi thể, không đổi trợ từ, không thêm bớt
  từ). Đây vẫn là trích **NGUYÊN VĂN** theo §G10, chỉ khác ở nhãn người nói.
- **Tên mới phải NHẤT QUÁN trong cả khối** (một nhân vật gốc → luôn cùng một
  tên roster trong toàn khối, không đổi giữa chừng) **và HỢP VAI VẾ** đã khai
  ở `situation` (§G6) — không đổi một nhân vật ngoài roster thành một tên
  roster mà quan hệ/mức thân sơ không khớp bối cảnh đã dựng.
- **Provenance:** vẫn khai `verbatim: true` + `source`/`line` như bình
  thường (không phát minh trường mới) — thêm dòng `reason` hoặc mở rộng
  `note` ghi rõ **đã đổi tên nào thành tên nào** (vd "nguyên bản Irodori
  dùng トアン, đổi thành 田中 cho hợp roster — không đổi gì khác trong câu").
  Đúng mẫu đã dùng không chính thức ở `ja-daily_life-m02-u1-l2` cho
  こちらこそ／お世話になっています trước khi luật này tồn tại thành văn.
- **Áp dụng:** khối hội thoại (card 3) và Q14. **KHÔNG áp cho chuỗi vùng A**
  (§G7 vùng A) — đáp án/ô điền/phương án chấm điểm không được đổi tên nhân
  vật của câu nguồn, vì đó không còn là "trích nguyên văn" theo nghĩa vùng A
  đòi hỏi.

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

**G11 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.** (Nội dung cũ xoá; còn trong git.)

**G11.1 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

**G11.2 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

**G11.3 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

**G11.4 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

**G11.5 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

**G12 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

**G13 — THAY BẰNG G14, 2026-07-29, theo số liệu đo INVENTORY.**

---

**G14 — QUY TẮC BUILD BÀI, bản v2.** (Owner chốt **2026-07-29**. Thay trọn
G11 · G11.1–G11.5 · G12 · G13. Mọi luật dưới đây có **số liệu đo 2026-07-27/28/29**
trong `scripts/content/sources/INVENTORY.md`. **Luật mất cơ sở đo → đo lại, không
suy diễn.**)

> **NẾU VỀ SAU PULL VỀ bất kỳ mục G11.3/G12/G13 nào** (từ nhánh/commit khác phía
> cloud — ca đã gặp: `bf15c2b`): **BẢN NÀY THẮNG.** Diff và báo owner, **không giữ
> hai luật đá nhau**. Nội dung cũ đã rút còn một dòng ở trên; lịch sử nằm trong git.

**G14-R0. PHẠM VI.** `languageCode=ja` · `nicheId=daily_life` · level A0–A1 ·
`template=vocabularyLesson` (five_cards). **Cấu hình A (R3b) là mặc định TOÀN KHOÁ
daily_life.** Ngoài phạm vi → **DỪNG, BÁO**: bài kanji/review/checkpoint, niche
khác (Irodori là 生活の日本語 nên mất vai nguồn hội thoại), ngôn ngữ khác. Mục
**[JA]** là riêng tiếng Nhật.
**NGOẠI LỆ CÓ CHỦ ĐÍCH:** `ja-daily_life-m01-u2-l1` viết **100% nguyên văn Irodori**
và **chốt TRƯỚC** rule này (2026-07-27) → **GIỮ NGUYÊN, không viết lại.** Cùng tinh
thần với G11.5 cũ: nguyên văn từ một nguồn uy tín không phải lỗi.

**G14-R1. HAI LOẠI CÂU — không có loại thứ ba.** Mọi chuỗi tiếng Nhật người học
nhìn thấy là **VERBATIM** (bê nguyên từ đúng MỘT nguồn, không sửa một ký tự, không
ghép) hoặc **AUTHORED** (tự soạn, khai lý do). **CẤM** "phỏng theo / diễn đạt lại /
chỉnh nhẹ". MUTATION là AUTHORED đặc biệt dành cho nhiễu (R6). Dịch lấy từ nguồn
n5-Việt rồi sửa lỗi dính chữ = **AUTHORED**, reason `hiệu đính từ <file>:<dòng>` —
có sửa tay thì không còn là verbatim.

> **PHẠM VI R1 — MỘT CHUỖI.** R1 xét từng chuỗi một. Việc **ghép nhiều chuỗi
> thành một đoạn hội thoại** do **§G10** quản: *cụm có nguồn KHÔNG làm cho đoạn
> ghép có nguồn*. Mỗi lượt đều verbatim mà đoạn vẫn có thể sai — đọc §G10.

**G14-R2. PROVENANCE — file song song, cổng máy kiểm.**
`shared/content/curriculum/provenance/<lessonId>.provenance.json`. Mỗi item:
`{path, targetText}` + một trong ba: `{source, line, verbatim:true}` ·
`{authored:true, reason}` · `{mutation:{from, op}}`.
**Khai:** mọi trường chứa câu/cụm tiếng Nhật **hiển thị**.
**Không khai:** `reading` / `speechText` (dẫn xuất — R12a kiểm riêng), `formula`,
bản dịch. `scripts/verify-provenance.mjs` **exit 0** = điều kiện bài xong. Nguồn
nằm trong `blocked-sources.json` (R9) → **FAIL**. §G5 giữ nguyên: **không** ghi
nguồn vào `lessons.json`.

**G14-R3. NGUỒN THEO Ô** (đo 2026-07-27/29 — đổi kho hoặc đổi niche thì **đo lại**):

> **NGUỒN OWNER — chủ đề nguồn gốc ĐÓNG cho TOÀN KHO.** Owner xác nhận
> **2026-07-30**: các file **IRODORI**, `topic1-5.json`, `ban1.txt`, `ban2.txt`
> đều là nội dung **owner tự soạn hoặc thuê soạn**. Không hỏi lại nguồn gốc,
> không tự đưa vào blocklist vì lý do bản quyền.
>
> **Dữ liệu BÊN THỨ BA vẫn còn dùng** — JMdict/EDRDG · hanabira · Tanos — chưa
> đóng, xem LS-11 (màn "Nguồn & Ghi công", bắt buộc trước phát hành).

| Ô | Nguồn | Cơ sở đo |
|---|---|---|
| `dialogueGroups`, Q14, `intro.examples` | **thang ưu tiên mới, xem dưới bảng** | Irodori lùi cuối từ 2026-07-30 |
| `grammarPatterns` | **`n5_ngu-phap-vi` + hanabira md + N5GM** — 3 nguồn độc lập | trùng câu ví dụ 0/278 và 3% |
| `vocabularyDetails[].examples` | **`n5_ngu-phap-vi`** (278 câu A0–A1, lọc R5: 0 câu rớt) → tái dùng câu trong bài → Irodori | `sentences_*.json` **KHÔNG dùng ở A0–A1** (toàn N3+) — mở lại từ N4 |
| `vocabularyReferences` | Tanos + JMdict | |
| Cách đọc từ | **JMdict quyết** | R12a |
| Dịch vi | **`n5_ngu-phap-vi` (hiệu đính)** khi câu lấy từ đó; còn lại viết tay | nguồn ĐẦU TIÊN có dịch Việt gắn câu |
| Bài tập — điểm kiểm | **Irodori 練習 + 解答** (OCR 0 lỗi) | R7 |
| Nhiễu có nguồn | hanabira Common Mistakes (280 cặp) khi mẫu đó có | u2-l2: 0/4 mẫu → dùng mutation |
| `speechText`, `register`, ô Q10 | **AUTHORED** | đo: không nguồn nào có |

**THANG ƯU TIÊN — hội thoại · Q14 · `intro.examples`** (đổi 2026-07-30):

1. **TÁI DÙNG** câu đã có trong chính bài đó — không tốn gì.
2. **NGUỒN OWNER khớp tình huống** — `topic1-5.json` (5.256 hội thoại, nhãn
   A/B, 4–12 lượt) · `n5_ngu-phap-vi` (4 khối, có sẵn dịch Việt) · `ban1.txt`
   (96 khối Dialogue, có romaji + dịch Anh).
3. **Irodori — LÙI XUỐNG CUỐI.** Chỉ dùng khi 1–2 không có gì khớp.

> **BỎ QUA HỘI THOẠI BỊ CỜ:** máy gom chất liệu **phải đọc**
> `scripts/content/sources/ten-lech-nhan.json` và **bỏ qua** mọi hội thoại có
> trong đó — chúng còn tên người không khớp nhãn mà luật hẹp a/b/c không xử
> được (nhắc người thứ ba, cấu trúc lạ). Kho sạch còn lại vẫn thừa dùng.

> **GIÁ của `topic1-5`:** nguồn chỉ có mặt chữ — **không furigana, không
> romaji, không dịch**. Mỗi câu lấy ra phải **viết tay `reading`** (G14-R14
> [JA] (c) chặn cứng, **không đổi**) **và viết tay dịch vi**. Đổi lại: kho
> hội thoại gấp >8 lần Irodori và trải 5 chủ đề.
>
> Lọc vốn từ đo được: dải **N4** (50 câu mẫu → 16 sạch · 25 có 1–2 kanji lạ ·
> 9 có >2). Dùng ở A0–A1 thì phải chọn câu, không lấy đại.

**Path chính thức:** `local-sources/ja/n5/n5_ngu-phap-vi.txt`
(sha256 `778414d2…848c9e79`, 63.054 byte, 1.056 dòng / 41 mục / 278 câu).

**G14-R3b. CẤU HÌNH A — cỡ bài mặc định toàn khoá daily_life.**
Mục tiêu kép: an toàn ngang tối đa + **owner check ít nhất**.
- `grammarPatterns` **4–5** (trần 8) · `vocabulary` **8–10** (trần 15)
- `dialogueGroups` **3 nhóm × 4–6 lượt** (owner chốt 2026-08-02, nâng từ
  3–4 — bản 3–4 tối ưu tốc độ duyệt nhưng đánh đổi bằng hội thoại thiếu câu
  mở/câu chốt: owner duyệt preview `m02-u1-l2` thấy CỤT, vào thẳng すみません,
  kết ngay どういたしまして. Validator đã cho phép tới 8 từ trước
  (`dialogueLinesPerGroup` ở `five-cards-ranges.mjs`) — mục này chỉ nâng CỠ
  SOẠN MẶC ĐỊNH cho khớp, không đổi trần validator), lấy từ **≥2 kịch bản
  khác nhau**. Nguyên tắc: ưu tiên đoạn **DÀI NHẤT** nguồn có, trong giới
  hạn lọc R5 mức khối — **KHÔNG** ghép câu tự soạn để kéo dài; nguồn chỉ đủ
  4 lượt thì giữ 4 và **ghi rõ lý do** (đo được bao nhiêu, ngưỡng nào) trong
  báo cáo.
- Q14 **6–8 lượt** (validator ≥4)
- **CÂN NGUỒN, không xếp thứ tự ưu tiên** (owner chốt 2026-08-01 — thay cho
  bản cũ "(1) tái dùng → (2) `n5_ngu-phap-vi` → (3) Irodori": thang tuần tự
  khiến nguồn dưới KHÔNG BAO GIỜ được gọi khi nguồn trên đủ hàng. Ca thật:
  `ja-daily_life-m02-u1-l1` ra 0% Irodori — nhưng đó là CHƯA TRA, không phải
  TRA RỒI KHÔNG CÓ, vì PHA A lượt đó không quét Irodori):
  1. Mỗi bài phải **quét MỌI nguồn trong kho** (xem
     `scripts/content/sources/INVENTORY.md` mục 1–2 cho danh sách thật —
     không bỏ nguồn nào chỉ vì thứ tự ưu tiên).
  2. Nguồn nào **có hàng qua lọc R5 (mức khối)** → phải đóng góp **ít nhất
     1 câu mẹ** vào bài.
  3. Nguồn quét ra 0 → được phép 0%, nhưng báo cáo **bắt buộc** ghi "đã
     quét, không có" kèm cách quét (pattern/từ khoá đã dùng) — 0% không kèm
     bằng chứng đã quét là KHÔNG hợp lệ.
  4. **Không nguồn nào chiếm quá 50% số câu mẹ** trong một bài.
  5. "Tái dùng câu đã có trong bài" (từ thẻ khác trong CHÍNH bài,
     `from_lesson`) KHÔNG tính vào phép cân nguồn 4 mục trên — đó là tiết
     kiệm công viết, không phải chọn nguồn ngoài.
  `sentences_*.json`: không dùng ở A0–A1.
  **Máy kiểm:** PHA A phải xuất `scripts/content/sources/scan/<lessonId>.scan.json`
  — `{ lessonId, ngày, nguồn: [ { path, coHang, soCauQuaLoc, cachQuet } ] }`,
  một dòng mỗi nguồn đã quét. `verify-provenance.mjs` đọc file này + provenance
  của bài, FAIL nếu mục 2 hoặc mục 4 bị vi phạm. Bài không có `scan.json` (xây
  trước 2026-08-01) → cổng này bỏ qua, nhưng phải khai rõ trong
  `scripts/content/sources/provenance-exemptions.json` (`scope` chứa
  `"source-balance"`) — không được miễn ngầm.
- **Cổng tỉ lệ %:** mục 4 ở trên LÀ một cổng tỉ lệ cứng (>50% một nguồn →
  FAIL). Ngoài trần 50% đó, tỉ lệ Irodori giảm dần bằng **thêm nguồn** và vốn
  từ tích luỹ, **không** bằng phình bài. Báo cáo in tỉ lệ thật theo **câu duy
  nhất** (tái dùng không đếm trùng) **và** theo trường.

**G14-R4. HỘI THOẠI — điều khoản lùi + danh sách pattern tập trung.**
Dò hội thoại đã trượt **3 lần, 3 quy ước**: `Ａ：` · `- **A:**` · `A ` (không dấu
hai chấm — `n5_ngu-phap-vi`).
**Quy ước thứ TƯ, thêm 2026-07-30** — `Tên Latin + ':'` đầu dòng (`ban1.txt`:
`Emily:` `Yamamoto:`), romaji + dịch Anh **cùng dòng**, câu Nhật ở **dòng sau**,
furigana ở **dòng riêng phía trên**. Đây là bố cục giáo trình, không phải kịch
bản — dò bằng pattern `Ａ：` sẽ trả 0 sai.
**Quy ước thứ NĂM** — JSON có trường (`topic1-5.json`: `utterances[].speaker`);
không dò bằng regex dòng, đọc thẳng trường.
1. Danh sách pattern nhãn người nói đặt **Ở MỘT CHỖ** (hằng số trong script dò),
   hiện gồm cả ba; gặp quy ước mới → **NỐI vào**, không dò tay lẻ.
2. Mọi kết luận **"0 hội thoại" phải kèm danh sách pattern đã dò**.
3. Tra hanabira + n1–n5 + `n5_ngu-phap-vi` theo mẫu bài dạy; khối ≥2 lượt qua lọc
   R5 → verbatim.
4. Rỗng → Irodori, đa dạng **trong** Irodori (≥2 kịch bản); báo cáo ghi đã tra gì.

**G14-R5. LỌC VỐN TỪ cho câu nhập ngoài.**
- Mọi token ∈ (Tanos N5 ∪ `taught-vocabulary.json` tới bài này). So khớp **bỏ dấu
  câu** (「元気？」 khớp 「元気」).
- Nguồn **có phân từ sẵn** (`n5_ngu-phap-vi`: 「わたしは ケーキを たべました」 — cố
  ý, không phải lỗi) → tách token **theo phân từ của nguồn**, chính xác hơn bộ thô.
- **Dư ≤6 từ lạ DUY NHẤT trên cả khối** (mức khối — khử trùng lặp qua UNION,
  KHÔNG cộng dồn theo từng lượt riêng; owner chốt 2026-08-02, nâng lần 2
  trong cùng ngày, từ ≤4 lên ≤6 — sau lượt nới ≤2→≤4, owner duyệt preview
  `m02-u1-l2` vẫn thấy hội thoại CỤT ở khối 1 (topic2:575, cần thêm 5 từ lạ
  mới đạt độ dài mong muốn, vượt ≤4) và khối 3 (chặn bởi ROSTER, xem §G10a,
  không phải bởi ngưỡng từ). Owner ưu tiên hội thoại đủ dài, đánh
  đổi bằng nhiều từ tra hơn — bù lại bằng TRẦN TOÀN BÀI ngay dưới đây để bài
  không loãng) → nhận, với điều kiện **đủ CẢ 4 điều khoản §G7 vùng B**
  (không phải luật mới, nhắc lại vì hay bị bỏ sót điều kiện 3):
  1. Đoạn lấy NGUYÊN VĂN từ nguồn (§G10) — không tự chế câu chứa từ lạ.
  2. Mọi kanji có furigana (§B2d).
  3. **Từ lạ phải có NGHĨA hiển thị cho người học** — cơ chế: mục
     `vocabularyReferences` (card 2), đúng hình dạng `term/reading/
     speechText/meaning/register/example` đã dùng cho `半年`/`なんとか` ở
     `ja-daily_life-m01-u2-l2` (Q14). §B2f trước đây ghi "chưa có cơ chế,
     dùng `vocabularyReferences` cho việc này là bẻ cong ý nghĩa của
     trường" — đã LỖI THỜI kể từ chính lượt build đó; §B2f đã cập nhật lại
     cho khớp thực tế.
  4. Không lạm dụng — từ lạ là ngữ cảnh, không phải trọng tâm bài.
  **Dư >6** → loại. **Dạng chia của từ đã biết** (たべました←たべる) không tính là từ mới.
  > **NGƯỠNG "≤6" CHỈ CHO VÙNG B.** Theo **§G7**, ngưỡng này áp cho **vùng B**
  > (câu đọc hiểu). **Vùng A** — mọi chuỗi bị CHẤM: Q1–Q13, đáp án, ô trống,
  > phương án, token — theo **§G7 vùng A**: **chỉ vốn đã dạy, không có ngoại lệ
  > dư từ**. Đừng mang ngưỡng B sang A.

  **TRẦN TOÀN BÀI (owner chốt 2026-08-02, cổng CỨNG) — ngưỡng ≤6/khối chỉ
  chặn TỪNG khối riêng lẻ; không có gì ngăn 3 khối cộng lại làm bài loãng
  từ tra cứu. Tổng từ lạ DUY NHẤT của CẢ BÀI (union tất cả `dialogueGroups`,
  khử trùng lặp giữa các khối) phải ≤ 1,5 × số từ vựng chính
  (`vocabulary[].length`).** Vượt trần → **RÚT NGẮN khối dài nhất** cho tới
  khi đạt, không được nới tiếp khối khác để bù. Đây là cổng CỨNG
  (`verify-provenance.mjs`), không phải cảnh báo mềm — khác hẳn ngưỡng
  ≤6/khối vốn chỉ là mức soạn mặc định.
- **[JA]** Câu có **kính ngữ cấp cao** (される・いらっしゃいます・でございます…) →
  **loại khỏi A0–A1** bất kể vốn từ.
- `sentences_*.json` (khi dùng lại từ N4): khoá bỏ `_` cuối + **bắt buộc** kiểm
  từ-khoá có thật trong `sentence_original` (đo được mục gán sai khoá).
- Biến thể chính tả (どのくらい↔どのぐらい) **không** phải cùng mẫu khi verbatim.

**G14-R6. NHIỄU — không bao giờ phán độ tự nhiên.**
(3 lần dính: 「お名前お願いします」・「お名前は？」・「伊藤さんですか」 — máy phán
"thiếu tự nhiên" và trượt.) Bốn đường, **khai trong provenance**:
1. **MUTATION** — `op` ∈ {`particle_swap` (は↔が↔を↔も↔の) · `form_swap`
   (lịch sự↔thường) · `conj_error` · `san_drop` / `san_add` · `o_prefix_self` ·
   `particle_dup`}. `from` = câu **có thật trong bài**. Máy kiểm theo R12b.
2. **SOURCE_MARKED** — vế Mistake **nguyên văn** từ Common Mistakes hanabira
   (`source` + `line`), **chỉ khi** thuộc mẫu đang dạy; lý do của nguồn đổ vào
   `feedback.explanation`. Parser xử **≥3 format**, **bỏ** khối không có câu Nhật.
3. **CLOSED_FACT** — nhiễu đọc / nghĩa / kanji lấy từ **mục khác** trong JMdict.
4. **MỤC TỪ KHÁC ĐÃ DẠY TRONG CHÍNH BÀI** (owner chốt 2026-07-31, feed từ
   lượt build `ja-daily_life-m02-u1-l1`) — phương án là một cụm THẬT đã dạy
   ở CHÍNH bài đang viết (không phải cụm bịa/mượn ngoài bài). Hợp lệ **CHỈ
   KHI** ngữ cảnh đề bài nêu **RÕ** trục phân biệt (mức lịch sự / thì / vai
   vế…) **VÀ** trục đó loại trừ được **MỌI** phương án còn lại — không nêu
   rõ trục thì không được dùng loại này (quay lại 1–3). **Áp dụng TỪ bài
   `ja-daily_life-m02-u1-l1` TRỞ ĐI — không hồi tố bài cũ nào, không đụng
   Golden.**

**CẤM nhiễu máy tự nghĩ.** **RÀ ĐỐI KHÁNG theo bối cảnh đề bài** với **từng**
phương án: *"trong bối cảnh này, nó có thể đúng không?"* — **mutation cũng
rà, loại 4 cũng rà** (đây chính là điều kiện bắt buộc của loại 4, không phải
điều khoản miễn rà).

**G14-R7. BÀI TẬP — dẫn xuất, không tự nghĩ.**
- Dạng: validator khoá (Q3 matching · Q9 checkpoint · Q10 chat_text_fill ·
  Q13 slot_ordering · Q14 real_world; free 1–9 / plus 10–14).
- Điểm kiểm: **Irodori 練習+解答**, khai `derived_from {source, line}` ở mức
  exercise. Không có → `authored` + ghi **"đã tra gì"**.
- Chất liệu: **câu của chính bài**. Không nhập câu lạ vào bài tập.
- Q10: nền **verbatim từng dòng**; vị trí ô + `acceptedAnswers` = **authored**
  (đo toàn kho: không nguồn nào có).
- Q14: kịch bản Irodori verbatim, **6–8 lượt** (R3b); `sceneDividers` authored.

**G14-R8. [JA] REGISTER — ba tầng, KHÔNG tra từ điển.**
9 chuỗi đóng (§B2e ≡ validator dòng 991–1004, khớp từng ký tự).
1. **Đuôi câu** của `displayText`: です/ます (kể cả 〜か) → `Lịch sự.` ·
   でございます/おります/いたします/申します/伺います/存じます → `Trang trọng.` ·
   thể thường (kể cả câu hỏi trống 「元気？」) → `Thân mật.`
2. **Vị trí trong cấu trúc nguồn**: từ rời (はい・うん) — nằm trong kịch bản **thể
   nào** của nguồn thì mang nhãn đó (**đọc dữ liệu**, không phán đoán).
3. Không áp được → `''` (§B2c) + **ghi báo cáo**.

**Thẻ LEMMA vs thẻ LỜI NÓI** (owner chốt 2026-07-29, sau khi u2-l2 lộ ca này):
- **Thẻ dạng TỪ ĐIỂN / danh từ / trạng từ** (慣れる · 半年 · 生活 · 日本 ·
  どのぐらい…): **`register: ''`**. Chúng là **lemma**, không phải một lời nói,
  nên không mang mức lịch sự nào. **CẤM bịa nhãn thứ tư** ("trung tính"…) —
  §B2e là từ vựng đóng.
- **Từ CHIA ĐƯỢC** (động từ, tính từ) thêm **một dòng `notes`** giải thích vì
  sao trống, để người học không tưởng là thiếu dữ liệu: nêu mức lịch sự nằm ở
  **cách chia** và liệt kê dạng lịch sự ↔ dạng thân mật. `notes` là trường
  **render thật** ở màn từ vựng (mục "Giải thích").
- **Danh từ / trạng từ**: `''` trơn, **không** ghi chú — chúng không chia.
- **Thẻ dạng LỜI NÓI** (`そうですか。` · `はい、おかげさまで。`…): giữ nhãn theo
  **đuôi câu**, đúng tầng 1 ở trên.

**CẤM:** JMdict `pol/hon/hum` (phủ **1,63%**, **sai trục** — xung đột thật ở
「お願いします」: JMdict `hum` vs NovaLang `Lịch sự.`) · ánh xạ **敬語の指針** (5 hệ
kính ngữ ≠ 3 mức trang trọng) · lấy お/ご làm căn cứ.
**敬語の指針 CHỈ để viết giải thích**, không để gán nhãn.

**G14-R2b. PHẠM VI CỔNG NGUYÊN VĂN — danh sách miễn TƯỜNG MINH + MÁY ĐỌC ĐƯỢC.**

Cổng provenance (kể cả kiểm phủ trường-mới) **chỉ áp bài CÓ file provenance**,
tức **`ja-daily_life-m01-u2-l2` trở đi**.

**Danh sách miễn — NGUỒN DUY NHẤT:**
`scripts/content/sources/provenance-exemptions.json`. Bảng dưới đây phải khớp
file đó; đổi một bên mà quên bên kia là tạo hai nguồn sự thật.

**Hai `scope` độc lập** (file thêm trường `scope` 2026-08-01, xem G14-R3b cho
cổng thứ hai): `provenance` = miễn TOÀN BỘ cổng verify-provenance.mjs (bài
không có file `<lessonId>.provenance.json`). `source-balance` = bài **vẫn có
provenance thật, mọi cổng khác vẫn chạy** — chỉ riêng cổng CÂN NGUỒN (đọc
`scan.json`) bị bỏ qua vì bài xây trước khi `scan.json` tồn tại (2026-08-01).
Hai scope không suy ra lẫn nhau — một bài có thể ở scope này mà không ở scope
kia.

**scope `provenance` — ĐÓNG cho m01, xét lại từ m02 (owner chốt 2026-07-30) —
4 bài build TRƯỚC pipeline G14 + 1 bài tổng hợp dẫn xuất từ chúng:**

| bài / mục | loại | lý do miễn |
|---|---|---|
| `ja-daily_life-m01-u1-l1` (Golden) | lesson | build 2026-07 trước khi có G14/provenance |
| `ja-daily_life-m01-u1-l2` | lesson | như trên |
| `ja-daily_life-m01-u1-l3` | lesson | như trên |
| `ja-daily_life-m01-u2-l1` | lesson | như trên |
| `ja-daily_life-m01-u1-comprehensive` | bài tổng hợp | dẫn xuất từ u1-l1/l2/l3 — cả 3 đều miễn. Đòi provenance cho bản dẫn xuất trong khi nguồn được miễn là không nhất quán. Owner chốt 2026-07-30 |

**Vì sao miễn chứ không truy hồi tố (4 lesson):** bốn bài đó viết khi chưa có
sổ nguồn. Dựng provenance cho chúng bây giờ là **đoán xem câu nào lấy từ đâu**
— đúng định nghĩa bịa (WORKING_RULES §g). Miễn tường minh, ghi lý do, hơn là
có một sổ nguồn trông-như-thật mà không ai kiểm được.

**`ja-daily_life-m01-u2-comprehensive` KHÔNG có trong scope `provenance`** (gỡ
2026-07-31, PHA C) — có file provenance thật
(`ja-daily_life-m01-u2-comprehensive.provenance.json`, 220 mục, 91 `from_lesson`
+ 129 `authored`). `from_lesson` (mới, PHA C) trỏ path đích danh vào MỘT lesson
đã build (`lessons.json`), cổng mở lesson đó và so thật giá trị tại path —
xem `checkFromLesson` trong `scripts/verify-provenance.mjs`. Nguồn của bài này
là u2-l1 (miễn — chuỗi trace qua u2-l1 DỪNG Ở ĐÓ, không truy tiếp xuống Irodori)
+ u2-l2 (có provenance thật). `ja-daily_life-m01-u1-comprehensive` (25 câu) vẫn
miễn scope `provenance` — không thuộc phạm vi PHA C, xét lại riêng sau.

**scope `source-balance` — KHÔNG đóng theo mốc m01/m02, mở cho MỌI bài đã có
provenance thật nhưng xây trước 2026-08-01 (thêm 2026-08-01, cùng lượt sửa
G14-R3b từ thang tuần tự sang cân nguồn):**

| bài / mục | loại | lý do miễn |
|---|---|---|
| `ja-daily_life-m01-u2-l2` | lesson | có provenance thật (166/166, commit `8edb029`, 2026-07-28) — xây trước khi `scan.json`/cổng cân nguồn tồn tại |
| `ja-daily_life-m01-u2-comprehensive` | bài tổng hợp | có provenance thật (220 mục, 2026-07-31) — xây trước khi `scan.json`/cổng cân nguồn tồn tại |
| `ja-daily_life-m02-u1-l1` | lesson | build 2026-07-31 trước khi có luật cân nguồn; PHA A của bài đó không quét Irodori nên 0% Irodori là chưa-tra chứ không phải không-có. Owner chốt giữ nguyên bài, luật mới áp từ `m02-u1-l2` (2026-08-01) |

Bài xây SAU 2026-08-01 bắt buộc có `scan.json` — không được thêm vào scope
`source-balance` chỉ vì tiện.

**G14-R9. BLOCKLIST — máy đọc.** `scripts/content/sources/blocked-sources.json`.
Cổng **FAIL** mọi verbatim trỏ vào. Mục `{path, reason, mức}`, `mức` ∈
`cấm-trích` | `cấm-hẳn`. Khởi tạo theo INVENTORY: **5 file n5** OCR 9–23%
(gồm cả 3 file Minna — hai tập **chồng nhau 2 file**) → `cấm-trích` ·
**5 PDF Sou Matome** (0 dòng chữ Nhật) → `cấm-hẳn` · **Collins** (dấu cách chen
giữa từ) → `cấm-trích`.

**G14-R10. BÁO CÁO — máy in, không viết tay.** `verify-provenance.mjs` in cuối lượt:
đếm câu theo nguồn (**hai số**: theo câu duy nhất **+** theo trường) · authored theo
`reason` · mutation theo `op` · **PASS-yếu** (qua mức-2 chuẩn hoá / nối dòng ±3 —
rủi ro cột bên, đo 4 dòng) · ô **"đã tra mà rỗng"** ·
**mục CẦN MẮT NGƯỜI** — danh sách **đúng từng chuỗi** owner cần soi, xếp theo rủi
ro: (1) cờ furigana đa-âm R12a · (2) dịch hiệu đính · (3) authored ngoài danh mục
thường lệ · (4) PASS-yếu. Owner duyệt danh sách này thay vì bơi trong JSON.

**G14-R11. SỔ VỐN TỪ.** `shared/content/curriculum/taught-vocabulary.json` — sau
mỗi bài, **nối** `displayText` (bỏ furigana trong ngoặc, **giữ dạng thật** kể cả
「？」; R5 tự bỏ dấu câu khi so). **Máy đọc** từ `lessons.json`, không gõ tay.

**Bắt buộc chạy lại `node scripts/build-taught-vocabulary.mjs` cuối MỖI lượt
build/sửa bài** (owner chốt 2026-08-02, sau khi build m02-u1-l2), ngay sau
`generate:curriculum`, commit sổ cùng nhóm content. Ca thật gây ra luật này:
sổ không được cập nhật sau khi build `m02-u1-l1` — 2 lượt sau, `estimate-
source-coverage.mjs` coi `ありがとう`/`どうも` là "từ lạ" vì sổ chưa có, làm
sai toàn bộ phép đo mức-khối của bài kế tiếp. Script đã tồn tại từ trước
(chính comment đầu file `build-taught-vocabulary.mjs` ghi nhận đây là lần
**thứ hai** sổ bị bỏ quên — lần đầu thiếu u2-l2) — vấn đề không phải thiếu
công cụ, mà thiếu bước gọi nó vào đúng quy trình.

**G14-R12. MÁY KIỂM BỔ SUNG** (trong `verify-provenance.mjs`):
- **a. Furigana đối chiếu JMdict** — validator cũ chỉ bắt **THIẾU**, không bắt
  **SAI**. Mọi reading đối chiếu danh sách kana của từ trong JMdict: không nằm
  trong → **FAIL**; từ thuộc danh sách đa-âm đã biết (何・人・日・中・方・行 — mở
  rộng dần) → **FLAG** vào CẦN MẮT NGƯỜI.
- **b. Kiểm mutation** — `from` phải xuất hiện trong bài; `text ≠ from`; `op` ∈
  whitelist. Riêng `particle_swap`/`particle_dup`: diff giữa `from` và `text` phải
  đúng **MỘT** vị trí thuộc bộ trợ từ — máy diff được, **kiểm chặt**. Op khác:
  kiểm mềm.
- **c. Ví dụ đúng mẫu** — câu ví dụ của `grammarPattern` X phải **chứa chuỗi bề
  mặt** của X (hoặc biến thể đã khai trong pattern). So chuỗi, **FAIL** nếu không.

**G14-R13. LOCAL-SOURCES — quyền đọc/ghi.** (Sửa luật cũ "không đụng
local-sources".)
- **ĐỌC: tự do.** Mở, grep, bóc PDF, đo — không cần xin.
- **GHI NỘI DUNG: CẤM.** Không sửa, không thêm, không xoá nội dung file nguồn.
- **ĐỔI TÊN / DI CHUYỂN: cần owner cấp phép từng lần**, và **bắt buộc sha256
  trước–sau phải giống hệt**; lệch → hoàn tác, DỪNG, báo. (Đã dùng một lần
  2026-07-29 cho `n5_ngu-phap-vi.txt`.)
- **SỬA NỘI DUNG: chỉ khi owner cấp phép NGOẠI LỆ từng lần**, và **bắt buộc
  BACKUP TRƯỚC KHI ĐỤNG**:
  ```
  cp -p local-sources/ja/<file>  local-sources-backup/<YYYY-MM-DD>/<file>
  ```
  Xác minh sha256 bản sao == bản gốc **trước khi** sửa dòng nào. Sửa xong ghi
  sha256 trước/sau vào `INVENTORY.md`. `local-sources-backup/` đã gitignore.

  > **VÌ SAO:** lượt đổi nhãn người nói 2026-07-30 sửa 6 file mà **không có
  > backup**. `local-sources/` gitignore nên git không revert được — nếu sai
  > thì mất luôn bản gốc. Từ nay bắt buộc, không có ngoại lệ của ngoại lệ.

- Giải nén archive owner bỏ vào + xoá archive sau khi xác minh: theo cùng cơ chế
  cấp phép từng lần.


**G — GIỚI HẠN THẬT (ghi rõ, không giấu).** Hệ luật G + tầng X chỉ chặn được **lỗi
TRA CỨU ĐƯỢC**: cấu trúc bắt buộc (X1), kết hợp từ phổ biến (X2), loại từ / biến
đổi dạng (X3), từ chưa dạy (§G7). Chúng **KHÔNG chặn được sắc thái tinh tế**
(giọng điệu, độ tự nhiên sâu, hàm ý văn hoá) — **chốt cuối là NGƯỜI DUYỆT biết
ngôn ngữ đó.** Ngôn ngữ **chưa có người duyệt** → độ tin cậy **thấp hơn một bậc**;
**ghi nhận điều này khi quyết định thứ tự ra mắt** ngôn ngữ.

---

**G14-R14. PHỦ HIỂN THỊ + NÚT NGHE + TRỢ ĐỌC.** (Hiệu lực 2026-07-29.)

Luật này sinh ra từ một ca thật: `intro.examples` có đủ `displayText` ·
`reading` · dịch · `speechText` trên **cả 5 bài** (15 câu), viết tay và đã
duyệt, mà **không nền nào vẽ**. **Hai lượt rà bằng mắt đều lọt**, vì không có
chỗ nào ghi "trường này phải hiện ở đâu". Rà tay không phải cơ chế.

### Tầng chung — MỌI ngôn ngữ

**(a) Trường hiển thị phải render trên CẢ HAI nền.** Mọi trường mang chuỗi
ngôn ngữ đích trong `lessons.json` phải có một dòng khai trong
`shared/config/render-coverage.json`, ghi **class** và **nền đã vẽ**.
Trường cố ý không render (ví dụ dữ liệu chỉ dùng cho SRS) khai `waived` **kèm
lý do** — không được để trống.

**(b) Mọi mặt hiển thị chuỗi ngôn ngữ đích phải có NÚT NGHE lấy từ
`speechText`, và phải đi qua WIDGET CÂU DÙNG CHUNG.** **Cấm vẽ chuỗi ngôn ngữ
đích trần** bằng `Text(...)` / `<span>` rời. Widget dùng chung:
`mobile/.../widgets/lesson/ja_sentence.dart` · `frontend/src/components/learning/JaSentence.tsx`.
Nút nghe nhận `speechText`, **không** nhận mặt chữ — mặt chữ còn ngoặc chú âm
thì máy đọc luôn cả phần chú âm.

**(c) Phân loại trường** — bốn lớp, khai trong bản đồ:

| lớp | nghĩa | hiện ra? |
|---|---|---|
| `display` | chuỗi người học đọc | **có**, cả 2 nền |
| `aid` | trợ đọc: chú âm, dạng chuẩn hoá | nguyên liệu cho `display` |
| `tts` | chuỗi đưa cho máy đọc | **không** |
| `internal` | dữ liệu máy dùng (chấm, SRS, khoá tra) | **không** |

**Cổng:** `node scripts/check-render-coverage.mjs` — bóc mọi trường mang
ngôn ngữ đích ra khỏi `lessons.json`, đối chiếu bản đồ. Trường lạ chưa khai,
hoặc `display` mà thiếu nền, hoặc `waived` không lý do → **FAIL**.

### Tầng [JA] — CỨNG cho mọi bài tiếng Nhật, nay và sau này

Ghi kiểu **[JA]** như R8: sang ngôn ngữ khác thì tầng này **tự miễn**.

**(a) Dòng chính LUÔN SẠCH.** Bỏ ngoặc chú âm **khi vẽ**, ở **mọi** mặt hiển
thị. Dữ liệu ngoặc **giữ nguyên** — nó là nguyên liệu dựng dòng wakachigaki và
là thứ **R12d** dùng để đối chiếu. **Không** vẽ ruby (kana trên đầu kanji) —
owner bỏ lối đó 2026-07-29.

**(b) Hai công tắc, phạm vi CẢ BÀI**, qua `LessonReadingAidStore` dùng chung
(không phải store riêng của một câu hỏi):

- **[Furigana]** → thêm **dòng kana wakachigaki** dưới câu. Ranh giới khối ráp
  từ **chính dữ liệu ngoặc** (cùng phép R12d dùng), **không đoán ranh giới từ**.
  Câu không có chú âm → không thêm gì.
- **[Romaji]** → thêm dòng romaji. Có `romanization` viết tay (Q14) thì dùng;
  chỗ khác **phiên máy kana→romaji**.

**Mặc định:** ở **A0–A1** dòng kana **BẬT** sẵn, romaji **TẮT** — người mới
chưa đọc nổi kanji trần. Cấp cao hơn **xét lại khi tới cấp đó**, đừng đoán
trước. (Đây cũng là mặc định Q14 đã chạy từ trước và owner đã duyệt.)

### RENDER ĐỒNG NHẤT — owner chốt 2026-07-29

> **Dữ liệu là CHUNG nên render phải ĐỒNG NHẤT.** Một mặt hiển thị không được
> có trình bày riêng. Khác biệt chỉ tồn tại được khi có **LÝ DO SẢN PHẨM** nằm
> trong **danh sách miễn đóng** dưới đây. **"Test đang khoá" KHÔNG BAO GIỜ là
> lý do** — test khoá trình bày cũ thì **sửa TEST theo chuẩn mới**, không bẻ
> chuẩn theo test.

### DANH SÁCH MIỄN — ĐÓNG, chỉ 3 mục

Miễn **dòng trợ đọc** (vẫn phải sạch ngoặc + vẫn phải có đường nghe ở chỗ
khác). Thêm mục mới vào danh sách này cần owner duyệt riêng.

| Mặt | Lý do sản phẩm |
|---|---|
| Thẻ token `sentence_ordering` | Mảnh chữ 1–3 ký tự xếp thành lưới; thêm dòng kana dưới mỗi ô làm vỡ lưới và mất nghĩa "mảnh để ghép" |
| Thẻ token `slot_ordering` | Như trên |
| Ô ghép `matching` | Như trên |

**KHÔNG nằm trong danh sách miễn** (và vì thế đã sửa): dòng đọc Q14 — nay là
kana wakachigaki như mọi mặt khác, 6 chỗ assert trong test Q14 đã đổi sang
tính theo cách vẽ chuẩn thay vì khoá chuỗi liền cũ.

**Đầu thẻ từ vựng thu gọn** giữ một dòng (`maxLines: 1` + ellipsis, chỉ bỏ
ngoặc) — **không phải ngoại lệ**: dòng đọc của chính từ đó **đã hiện trong
thân thẻ** khi mở ra (hàng "Đọc"), nên không mặt nào mất trợ đọc. Đo được:
`_DetailList(title: vocabReading, values: [item.reading])`.

> **Phiên kana→romaji là CHUYỂN TỰ CƠ HỌC 1-1, KHÔNG thuộc lệnh cấm đoán âm
> kanji.** Lệnh cấm ở R14/generator là cấm **tra từ điển để đoán cách đọc của
> KANJI**. Kana thì mỗi ký tự có đúng một âm; chuyển tự không cần biết nghĩa,
> không cần tách từ, không có chỗ để đoán sai. Ba bản (Node · Dart · TS) phải
> cho ra **đúng cùng kết quả**, chứng bằng bộ fixtures dùng chung
> `shared/config/japanese_text_fixtures.json`
> (`scripts/test-japanese-text-parity.mjs` + `test/japanese_text_fixtures_test.dart`).

**(c) CỔNG:** chuỗi Nhật **hiển thị** mà thiếu `reading` hoặc `speechText` →
**FAIL** `validate:curriculum`. Chặn cứng, không phải cảnh báo.

**(d) Bài mới KHÔNG phải làm gì thêm.** Công tắc sống ở renderer dùng chung;
rule chỉ chặn **DỮ LIỆU thiếu nguyên liệu**. Viết đủ `reading` + `speechText`
là bài tự có trợ đọc.

---

**G14-R15. TRANG DUYỆT TĨNH LÀ ĐƯỜNG DUYỆT MẶC ĐỊNH.** (Owner chốt 2026-07-30.)

Owner **không duyệt qua app nữa** — đăng nhập + onboarding tốn thời gian mỗi
lượt. Đường duyệt chính thức là **trang HTML tĩnh**.

**Mọi lượt build hoặc sửa NỘI DUNG bài phải KẾT THÚC bằng:**

1. Xuất trang duyệt cho **mọi bài vừa đụng**:
   `node scripts/preview-lesson.mjs <lessonId> [lessonId...]`
2. **Tự mở** file trong trình duyệt (script tự làm; `--no-open` để tắt), và
   **báo path dạng `file:///…`** để owner mở lại bất cứ lúc nào.
3. Nhiều bài → mỗi bài một file **+ `index.html`** liệt kê link; mở mục lục.

**Trang duyệt phải đủ để duyệt KHÔNG cần app:**

| Phải có | Ghi chú |
|---|---|
| Hai công tắc **[Dòng đọc kana] [Romaji]** | kana **mặc định BẬT**, như app |
| Nút **🔊 nghe từng câu** | Web Speech giọng `ja-JP` của trình duyệt; máy không có giọng Nhật thì nút tự báo, không im lặng |
| Thẻ ⑤ đầy đủ | đề · **mọi** phương án · ✓ đúng · ✗ nhiễu kèm op · feedback |
| **Lấy chất liệu từ** — mỗi bài tập | TÍNH từ provenance theo path, không phải trường `derived_from` (trường đó **không tồn tại** trong dữ liệu) |
| Khối provenance cuối trang | `source:line` **bấm là chép** |

**Dev server + cờ `VITE_DEV_BYPASS`: GIỮ, nhưng là đường PHỤ.** Không dựng
server mặc định mỗi lượt nữa — chỉ dựng khi owner yêu cầu, hoặc khi cần kiểm
thứ mà trang tĩnh không dựng được (tương tác thật, điều hướng, trạng thái).

**Không thay thế cổng.** Trang duyệt là để owner NHÌN; `validate` · `smoke` ·
`verify-provenance` · `check-render-coverage` · `flutter test` vẫn phải xanh
trước khi xuất trang.

---

**G14-R16. THỨ TỰ BUILD — bài tổng hợp xong TRƯỚC khi sang unit kế tiếp.**
(Owner chốt 2026-07-30.)

> Build bài đi theo THỨ TỰ. Bài tổng hợp của một unit phải hoàn thành TRƯỚC
> khi bắt đầu bài của unit kế tiếp. Không làm unit mới rồi quay lại bài tổng
> hợp unit cũ.

**THỨ TỰ** = `(course.order, unit.order)` trong `shared/generated/courses.json`
— đo được, không suy diễn (vd `ja-daily_life-m02` course.order=12 đứng ngay
sau `ja-daily_life-m01` order=11).

**Áp cho unit ĐỦ ĐIỀU KIỆN** — số lesson của unit khớp một plan trong
`SECTION_PLANS` (`scripts/lib/unit-comprehensive-test.mjs`, hiện 2 hoặc 3).
Unit ngoài phạm vi đó (vd 10 lesson/unit ở Core Foundation hiragana/katakana,
không phải `five_cards`) chưa áp được cơ chế `unit_comprehensive_cloze` —
KHÔNG tính là "thiếu".

> **MIỄN TRỪ KANA — owner chốt 2026-07-30.** Unit Core Foundation (học chữ
> kana) MIỄN bài tổng hợp. Lý do: bài kana dạy CHỮ, không dạy tình huống giao
> tiếp; dạng cloze theo unit không áp được. Đây là QUYẾT ĐỊNH SẢN PHẨM của
> owner, KHÔNG phải hạn chế kỹ thuật.

Khác với đoạn "ngoài phạm vi `SECTION_PLANS`" ở trên (quan sát KỸ THUẬT — số
lesson không khớp plan): miễn trừ này khai theo **`niche === 'core_foundation'`**,
độc lập với `SECTION_PLANS`. Dù sau này `SECTION_PLANS` mở rộng hỗ trợ unit
10 lesson, Core Foundation **vẫn miễn** vì bản chất nội dung, không phải vì
thiếu cơ chế kỹ thuật. `scripts/check-build-order.mjs` đọc `course.nicheId`
để áp miễn trừ này riêng, không dựa vào việc `eligiblePlan` tình cờ false.

**Đo 2026-07-30 (lúc ghi luật này):** `ja-daily_life-m01-u1` đã có bài tổng
hợp (25 câu). `ja-daily_life-m01-u2` **2/2 lesson ready nhưng CHƯA có bài
tổng hợp** — đây là việc phải xong TRƯỚC khi bắt đầu viết `ja-daily_life-m02-*`.
Chưa unit nào sau `m01-u2` có nội dung, nên **hiện KHÔNG có vi phạm THẬT**,
nhưng đây chính là hàng đợi kế tiếp theo luật này.

**Kiểm (REPORT-ONLY, chưa nối vào validate/smoke):**
`node scripts/check-build-order.mjs` — quét mọi course/unit, in trạng thái
từng unit theo thứ tự thật, đánh dấu **VI PHẠM THẬT** khi một unit SAU đã có
nội dung ready mà một unit TRƯỚC (đủ điều kiện) vẫn chưa có bài tổng hợp.
Không throw — owner chốt giữ report-only vì bật cổng cứng ngay sẽ chặn mọi
việc khác cho tới khi các bài tổng hợp còn thiếu được viết xong.

**LÀM SAU** (ghi thêm ở `scripts/content/sources/INVENTORY.md`):
1. Nối `check-build-order.mjs` thành cổng cứng sau khi các bài tổng hợp còn
   thiếu (hiện: `ja-daily_life-m01-u2`) đã viết xong.
2. `validateUnitComprehensiveTest` (`validate-curriculum.mjs:1136`) hiện
   `if (!test) return;` — unit thiếu bài tổng hợp **im lặng cho qua tuyệt
   đối**, kể cả khi unit đã đủ điều kiện từ lâu. Cùng họ lỗi đã vá ở
   `check-render-coverage.mjs` (trường thiếu lọt qua vì không ai khai nó phải
   có). Sửa: in CẢNH BÁO (không fail) khi unit đủ điều kiện mà thiếu — tách
   biệt với việc bật cổng cứng ở mục 1.

---

## Changelog file này

- **2026-07-31 (PHA C — from_lesson + khai provenance) — G14-R2b** — gỡ
  `ja-daily_life-m01-u2-comprehensive` khỏi danh sách miễn (thêm 2026-07-30,
  gỡ ngay hôm sau): viết xong provenance thật cho bài này (220 mục — 91
  `from_lesson`, 129 `authored`), cổng PASS 0 FAIL. Cơ chế `from_lesson` MỚI
  trong `verify-provenance.mjs` (`checkFromLesson`) cho phép một item trỏ
  `{lessonId, path}` thẳng vào một Lesson đã build thay vì khớp chuỗi trong
  file nguồn thô — mở `lessons.json`, tra path, so targetText thật. `m01-u1`
  (25 câu) vẫn miễn, không đổi.
- **2026-07-30 (lượt gộp PHA A) — §E4, §F-b/G14-R3, §B số cứng, G14-R2b** —
  **§E4:** số câu bài tổng hợp SỬA thành khoảng 18–25 quy đổi theo
  `SECTION_PLANS` (đo trực tiếp từ commit `1b470ac`: 3 lesson→25 (8/17), 2
  lesson→18 (6/12)) — bản trước ghi cố định "25 câu chia 3 mức" và dải order
  3-lesson sai (9–18 thay vì 9–25), sót lại từ thiết kế gốc trước khi
  `typed_blank` bị bỏ CÙNG NGÀY 2026-07-25. Xoá mọi mô tả `typed_blank` khỏi
  §E4 (đã bỏ khỏi mọi kế hoạch, commit `1b470ac`); §D-Cloze (B) đánh dấu
  "không dùng hiện tại", không xoá (vẫn là tài liệu cơ chế cho schema còn
  giữ). Sửa 2 câu stale khác trong §E4 (generator/UI đã làm; registry có 1
  mục, không còn rỗng).
  **§F-b ↔ G14-R3:** tách vai — §F-b xử "nhiều nguồn nói khác một sự thật",
  vẫn dùng khi build ngôn ngữ mới; G14-R3 GIỮ NGUYÊN, xử "ô dữ liệu lấy từ
  file nào trong kho ja đã mở". Ghi rõ thang V1–V5 không áp cho kho owner tự
  soạn (một tác giả thì không còn nhiều nhà xuất bản để so). Bỏ nhãn V1 khỏi
  mục Irodori trong `scripts/content/sources/ja.md`.
  **§B3/§B4/§B11/§B12/§B14:** 5 số cứng còn sót (4–6 dòng · 3 patterns · 4
  pairs · 6 answerSlots · 1 scene divider) chuyển thành con trỏ sang
  `scripts/lib/five-cards-ranges.mjs`, cùng tiền lệ §D3/§D4. Rà hết §B/§C/§E:
  không còn số cứng nào khác lệch code (`4 phương án`/`2-3 ô` trong §D-Cloze
  và §E4 là hằng số THẬT trong code — `CHOICE_OPTION_COUNT`/`BLANKS_BY_KIND
  exactly` — không phải khoảng, giữ nguyên).
  **G14-R2b:** thêm 2 mục miễn provenance — bài tổng hợp `m01-u1` (dẫn xuất
  từ 3 lesson đã miễn) và `m01-u2` (dẫn xuất từ 1 lesson miễn + 1 lesson CÓ
  provenance thật — miễn theo quyết định owner, không phải vì mọi nguồn đều
  miễn). Danh sách miễn nay có bản MÁY ĐỌC ĐƯỢC:
  `scripts/content/sources/provenance-exemptions.json`, đóng cho m01, xét lại
  từ m02.
- **2026-07-30 — G14-R16 (THỨ TỰ BUILD)** — owner chốt: bài tổng hợp của một
  unit phải xong TRƯỚC khi sang unit kế tiếp. Kiểm report-only:
  `scripts/check-build-order.mjs`. Đo lúc ghi luật: `ja-daily_life-m01-u2`
  đủ điều kiện (2/2 lesson ready) nhưng chưa có bài tổng hợp — 0 vi phạm THẬT
  vì chưa unit nào sau nó có nội dung. **Cùng ngày, bổ sung miễn trừ:** unit
  Core Foundation (kana) MIỄN bài tổng hợp — quyết định sản phẩm, khai theo
  `niche`, không phụ thuộc `SECTION_PLANS`.
- **2026-07-29 (bản 12 — G14 QUY TẮC BUILD BÀI v2, thay trọn G11–G13)** —
  G11 · G11.1–G11.5 · G12 · G13 rút mỗi mục còn MỘT DÒNG "thay bằng G14";
  nội dung cũ xoá, lịch sử còn trong git. **G14** vào ở số kế tiếp còn trống,
  giữ nguyên cấu trúc R0–R13 bên trong. Kèm ghi chú: pull về bất kỳ mục
  G11.3/G12/G13 nào (ca đã gặp: commit `bf15c2b`) thì **G14 THẮNG** — diff và
  báo owner, không giữ hai luật đá nhau. Ghi **ngoại lệ có chủ đích**
  `ja-daily_life-m01-u2-l1` (100% nguyên văn Irodori, chốt TRƯỚC rule) và
  **ngày hiệu lực 2026-07-29**. **G14-R13** sửa luật local-sources thành
  ĐỌC tự do / CẤM GHI nội dung / đổi tên cần owner cấp phép từng lần + sha256
  trước-sau phải khớp.

- **2026-07-28 (bản 13 — AN TOÀN ĐỨNG TRÊN "dùng hết nguồn": chống lỗi kết hợp
  từ, bài tập lấy từ nguồn, nhiễu cơ học)** —
  **§G11.3 VIẾT LẠI HẲN** (thay bản "làm giàu từ vựng" của bản 12 cùng ngày — bản
  đó nới quá tay): dự án **không có nguồn collocation**, nên **trong mẫu câu chỉ
  được thay bằng từ CÙNG NGUỒN CÙNG BÀI** (tài liệu liệt kê = tài liệu đã xác
  nhận ghép được); **cấm** lấy từ nguồn khác ghép vào mẫu của nguồn này; **ngoài
  mẫu câu** thì dùng thoải mái nguồn khác, mỗi ví dụ lấy nguyên từ **một** nguồn.
  Thêm **§G12**: bài tập **lấy nội dung từ nguồn rồi đổi vỏ** sang dạng app hỗ
  trợ — giữ nguyên điểm kiểm, chỉ đổi cách trả lời; nguồn không có bài phù hợp
  mới tự soạn và **phải ghi "tự soạn"**. Thêm **§G13**: phương án nhiễu **mặc
  định dùng loại CƠ HỌC** (lỗi tự nó sai bất kể bối cảnh); nhiễu cả cụm / cả câu
  là **hạn chế**, phải kiểm có vô tình đúng không; **không chắc → đổi sang cơ
  học** — sau **3 lần dính** nhiễu "hoá ra cũng đúng" làm câu hỏi có 2 đáp án
  đúng. §B16 thêm con trỏ sang §G13. Danh sách loại nhiễu cơ học **cụ thể** và 3
  ca đã dính nằm ở `scripts/content/sources/<mã>.md`.

- **2026-07-28 (bản 12 — CHIA VIỆC THEO TẦNG NGUỒN, không dồn một nguồn)** —
  Thêm **§G11**: mỗi **tầng việc** gán cho nguồn **mạnh nhất ở tầng đó**, **cấm
  chia đều theo phần trăm** (§G11.1); tầng có **≥2 nguồn** thì phải **mở cả hai**,
  **lệch nhau → báo owner, không tự chọn** (§G11.2 — cách này đã bắt được một lỗi
  đọc sai thật); **làm giàu từ vựng** — được thay từ nội dung trong mẫu câu bằng
  từ ở nguồn khác, giữ nguyên cấu trúc, không thay khi từ đó bắt buộc cho nghĩa,
  phải khai rõ đoạn nào nguyên văn / đoạn nào đã thay (§G11.3, mở rộng §G3); mỗi
  bài **bắt buộc kèm bảng "phần nào lấy từ nguồn nào"** trong báo cáo, thiếu bảng
  là chưa đủ điều kiện duyệt (§G11.4); bài chốt trước mốc theo hướng một-nguồn
  **giữ nguyên, không viết lại** (§G11.5). Bảng tầng → nguồn **cụ thể** và **mốc
  áp dụng** của từng ngôn ngữ nằm ở `scripts/content/sources/<mã>.md`, không ở
  file chung này (cùng nguyên tắc §G8).

- **2026-07-27 (bản 11 — BỎ HẾT SỐ ÉP CỨNG, mọi ràng buộc thành KHOẢNG)** —
  Thêm **§D6c**, luật chung đứng trên §D6b: mọi ràng buộc định lượng phải là
  khoảng kèm lý do + căn cứ ngay tại chỗ định nghĩa; đo được thì đo, không đo
  được thì khoảng rộng và ghi rõ "chưa có căn cứ đo"; cấm chép số từ Golden;
  gặp số ép còn sót thì **sửa luôn, không cần hỏi owner từng cái**. Toàn bộ
  khoảng gom về **`scripts/lib/five-cards-ranges.mjs`** dùng chung cho validator
  và smoke. Đã đổi 11 ràng buộc: `dialogueGroups` 3→**1–8** và
  `grammarPatterns` 3→**1–8** (đo thật: 264 khối kịch bản và 71 bài Irodori);
  `matchingPairs` 4→**3–8**, `checkpointSubQuestions` 5→**3–10**,
  `optionsPerQuestion` 4→**2–6**, `chatMessages` 6→**2–12**, `chatSlots`
  2→**1–4**, `advancedOrderingSlots` 6→**2–10**, `sceneDividers` 1→**0–5**
  (nhóm này chưa đo được — khoảng rộng, đã ghi chú; renderer Flutter xác minh
  là generic, không khoá số nào). Giữ nguyên `totalQuestions = 14` (quyết định
  sản phẩm) và toàn bộ khoá nội dung Golden.
- **2026-07-27 (bản 10 — hạ sàn hội thoại theo độ dài NGUỒN)** — **D3** bỏ sàn
  cứng 4–6 lượt, thay bằng **2–8** và nguyên tắc "độ dài đi theo đoạn nguồn".
  Cả hai con số lấy từ phép đo thật, không chép Golden: đo **634 đoạn hội thoại**
  trong giáo trình chính thống A1→B1 — trung vị **2** lượt, p95 **6**, **99% ≤ 8**,
  dài nhất 12; riêng mảng chào hỏi nhập môn **không có đoạn nào quá 3 lượt**. Sàn
  4 cũ vì thế cao hơn cái nguồn cấp và **buộc người viết tự kéo dài** — đúng gốc
  của ba vòng sửa mạch hội thoại. Sửa validator ở **hai** chỗ (`validateFiveCards\
Structure` + guard trong smoke); chỗ 4–6 còn lại trong `validateReadyDailyModule\
OneLesson` **để nguyên** vì đã xác minh không bao giờ chạy cho five_cards (`continue`
ở nhánh trên), và chỗ trong `checkApprovedJaUnitOneLesson` cũng để nguyên vì đó
là **khoá nội dung Golden**, không phải luật chung. Thêm **D6b** — bảng rà mọi
con số đang bị ép, phân loại có-lý-do vs. chép-Golden, kèm dấu hiệu nhận biết.
  Cùng lớp tiền lệ với "đúng 8 thẻ từ vựng → 6–15" (ADR-019 amendment).
- **2026-07-27 (bản 9 — tách vùng G7 + luật lấy nguyên đoạn hội thoại)** —
  **G7** viết lại thành **hai vùng**: vùng A (bị chấm — Q1–Q13, đáp án, ô điền,
  phương án, token) giữ nguyên mức nghiêm "chỉ vốn đã dạy", lý do ghi rõ là
  chấm bằng từ chưa học thì chấm sai người trả lời đúng; vùng B (chỉ đọc hiểu —
  hội thoại, ví dụ, tham khảo, Q14) được dùng từ chưa dạy nhưng phải đủ **cả
  bốn** điều kiện (nguyên văn từ nguồn · furigana · có hiển thị nghĩa · không
  lạm dụng). Chuỗi nằm ở cả hai vùng thì áp vùng A. Thêm **G10 — hội thoại lấy
  NGUYÊN ĐOẠN, không tự xếp cụm**, sinh ra sau ba vòng sửa mạch hội thoại ở một
  bài mà cả ba đều là lỗi XẾP chứ không phải lỗi CỤM: **cụm có nguồn không làm
  cho đoạn ghép có nguồn**; buộc phải tự xếp thì phải khai "đoạn này do tự xếp".
  Thêm **B2f** ghi trạng thái cơ chế hiển thị nghĩa từ chưa dạy: **CHƯA CÓ**
  (soi cả schema lẫn UI), kèm hệ quả là **vùng B chưa dùng được** cho tới khi
  có cơ chế, và một đề xuất chưa thực hiện. Ghi thêm một số đo thật vào G10:
  hội thoại chào hỏi ở trình độ nhập môn trong giáo trình chính thống chỉ 2–3
  lượt, tức **thấp hơn sàn 4–6 lượt của §D3** — mâu thuẫn này phải hỏi owner,
  không tự nới sàn cũng không tự kéo dài đoạn nguồn.
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
