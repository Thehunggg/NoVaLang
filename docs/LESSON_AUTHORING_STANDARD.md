# Chuẩn mực build bài — Five-Cards (tiếng Nhật)

Tài liệu này là chuẩn để triển khai một bài `five_cards` (Daily Life / Japanese)
từ nội dung do owner cung cấp. Chia làm **2 phần tách biệt**:

- **PHẦN 1 — RÀNG BUỘC TỪ CODE**: validator/generator **ép**, sai là **THROW/FAIL**.
  Mỗi khẳng định kèm `file:dòng` dẫn chứng.
- **PHẦN 2 — QUY ƯỚC NỘI DUNG**: quy ước sản phẩm của owner, **KHÔNG có trong
  code**, validator KHÔNG bắt — người viết bài phải tự giữ.

> ⚠️ **Đối chiếu trích dẫn:** Mọi `file:dòng` trong Phần 1 tham chiếu mã nguồn ở
> branch **`fix/curriculum-quality-gates`** (nơi chứa toàn bộ code five_cards:
> `scripts/content/daily-life/module-1/*`, `scripts/validate-curriculum.mjs`,
> `scripts/smoke-curriculum-flow.mjs`, `scripts/lib/*`, các file Flutter
> `mobile/novalang_flutter/**`). Tài liệu này được commit trên branch tài liệu và
> mô tả trạng thái code tại HEAD của branch trên. Số dòng có thể lệch nếu code đổi
> — khi nghi ngờ, grep lại tên hàm/hằng nêu kèm.

> Phân loại dùng xuyên suốt Phần 1:
> - **(A) LUẬT CHUNG** — validator ép cho lesson thường (generic path), THROW/FAIL.
> - **(B) CHỈ GOLDEN** — chỉ áp cho đúng lesson `ja-daily_life-m01-u1-l1` (literal-
>   lock), **không phải luật chung**. Bài khác không bị.
> - **(C) KHÔNG ÉP** — code không có ràng buộc nào; là quy ước mềm (xem Phần 2).

---

# ⛔ ĐIỀU KIỆN TIÊN QUYẾT: hiện chỉ MỘT id được đi đường five_cards viết tay

Trước mọi thứ khác: **theo code hiện tại, chỉ `ja-daily_life-m01-u1-l1` được phép
là `five_cards`.** Một bài five_cards thứ hai sẽ **fail CI** ở hai chốt:

**Chốt 1 — bắt buộc đúng 10 exercises cho mọi bài ≠ Golden**
`scripts/validate-curriculum.mjs:1310-1316`
```js
if (isApprovedJaUnitOneLesson(lesson)) {        // id === "ja-daily_life-m01-u1-l1"
  validateApprovedJaUnitOneLesson(lesson);
  continue;
}
if ((lesson.exercises ?? []).length !== 10) {   // mọi lesson khác PHẢI có đúng 10
  fail(`${lesson.id}: must have exactly 10 exercises (got ${(lesson.exercises ?? []).length})`);
}
```
Golden push với `exercises: []` (`scripts/content/daily-life/module-1/helpers.mjs:331`).
Bài five_cards khác bắt chước sẽ báo `got 0` → **fail**.

**Chốt 2 — scope guard: đúng 1 lesson five_cards và phải là Golden**
`scripts/smoke-curriculum-flow.mjs:209-217`
```js
const fiveCardLessons = lessons.filter((l) => l.lessonFormat === "five_cards");
if (fiveCardLessons.length !== 1 || fiveCardLessons[0]?.id !== APPROVED_JA_UNIT1_LESSON1) {
  fail(section, {...}, "only ja-daily_life-m01-u1-l1 may opt into five_cards");
}
```
(`APPROVED_JA_UNIT1_LESSON1 = "ja-daily_life-m01-u1-l1"`, dòng 77; guard được gọi ở
`scripts/smoke-curriculum-flow.mjs:1526`.)

**Hệ quả:** Muốn bài mới đi đường five_cards viết tay 14 bài, phải **nới hai guard
này trước** (xem "CÒN MƠ HỒ / CẦN QUYẾT SAU"). Tài liệu này mô tả *chuẩn cấu trúc*;
việc mở khóa scope là quyết định của owner, chưa làm trong tài liệu này.

**`validateApprovedJaUnitOneLesson`** (`scripts/validate-curriculum.mjs:1018-1218`)
chỉ chạy khi `lesson.id === "ja-daily_life-m01-u1-l1"` (điều kiện ở dòng 1310, hằng
ở 1007). Đây là **literal-lock**: nó khóa cả nội dung literal (14 câu Q14, token id,
văn bản こんにちは…). **Bài mới KHÔNG bị hàm này** — nên phần lớn ràng buộc dưới đây
gắn nhãn **(B) CHỈ GOLDEN**.

---

# PHẦN 1 — RÀNG BUỘC TỪ CODE

## 1.1. Thứ tự & sự tồn tại 5 card

| Ràng buộc | Phân loại | Dẫn chứng |
|---|---|---|
| `mainCards` **đúng** `intro,vocabulary,dialogue,grammar,practice` | **(B)** | `validate-curriculum.mjs:1027-1030` |

```js
const expectedCards = "intro,vocabulary,dialogue,grammar,practice";
if ((content.mainCards ?? []).join(",") !== expectedCards)
  fail(`${lesson.id}: must define exactly five main cards in the approved order`);
```
→ Ép thứ tự **chỉ cho Golden**. Bài thường không có `fiveCardContent` nên không bị.

## 1.2. Số lượng phần tử

| Thành phần | Số lượng ép | Phân loại | Dẫn chứng |
|---|---|---|---|
| `vocabulary` | **đúng 8** | **(B)** | `validate-curriculum.mjs:1031-1033` |
| `vocabularyDetails` | **đúng 8** | **(B)** | `validate-curriculum.mjs:1031-1033` |
| `dialogueGroups` | **đúng 3 nhóm, mỗi nhóm 4–6 dòng** | **(B)** | `validate-curriculum.mjs:1034-1037` |
| `dialogueGroups` (generic) | **đúng 3 nhóm, 4–6 dòng** | **(A)** | `helpers.mjs:151-160` (throw), `validate-curriculum.mjs:386-397` |
| `grammarPatterns` | **đúng 3** | **(B)** | `validate-curriculum.mjs:1056-1058` |
| `practice.exercises` + `totalQuestions` | **đúng 14 / 14** | **(B)** | `validate-curriculum.mjs:1061-1063` |
| Phân plan: order 1–10 = `free`, 11–14 = `plus` | ép | **(B)** | `validate-curriculum.mjs:1064-1069` |

```js
// 1031-1033
if ((lesson.vocabulary ?? []).length !== 8 || (content.vocabularyDetails ?? []).length !== 8)
  fail(`${lesson.id}: Card 2 must contain exactly 8 vocabulary cards`);
// 1064-1069
for (const [index, exercise] of practiceExercises.entries()) {
  const expectedPlan = index < 10 ? "free" : "plus";
  if (exercise.order !== index + 1 || exercise.plan !== expectedPlan) fail(...);
}
```

> **Về "vocab 6–15" và "khớp vocabularyDetails 1-1 theo id + thứ tự":**
> **KHÔNG ĐÚNG với code.** Code ép **đúng 8** (không phải khoảng 6–15), và **chỉ ép
> độ dài hai mảng cùng = 8** — **KHÔNG** có check khớp id/thứ tự 1-1 giữa
> `vocabulary` và `vocabularyDetails`. Khớp id là **(C) không ép** (quy ước mềm).
> `helpers.mjs` chỉ đọc `vocabularyDetails` gián tiếp; không có vòng lặp so id.

## 1.3. Practice — validator ép TYPE câu nào?

**(B) CHỈ GOLDEN.** Chỉ **6 câu** bị ép type + cấu trúc; **8 câu còn lại KHÔNG bị
ép type** (chỉ ép order + plan ở 1.2):

| Câu | index | Ép | Dẫn chứng |
|---|---|---|---|
| Q3 | [2] | `matching` + **đúng 4 pairs**, mỗi pair có `id/left.id/right.id` | `validate-curriculum.mjs:1082-1089` |
| Q4 | [3] | `correctTokenIds` **== `watashi\|topic_wa\|tanaka\|desu\|period`** (literal) | `:1090-1093` |
| Q9 | [8] | `checkpoint` + **đúng 5 subQuestions**, mỗi câu **đúng 4 options** + `correctOptionId` hợp lệ | `:1070-1081` |
| Q10 | [9] | `chat_text_fill` + **6 messages** + **2 slots** id `chat_greeting_slot`/`chat_closing_slot` + slot đủ `displayText/canonicalText/audioText/acceptedAnswers` | `:1094-1104` |
| Q13 | [12] | `slot_ordering` + **6 answerSlots** + có token `konbanwa_distractor` + **đúng 3** slot `afterText==='。'` | `:1105-1113` |
| Q14 | [13] | xem 1.6 | `:1117-1181` |

→ Q1, Q2, Q5, Q6, Q7, Q8, Q11, Q12: **(B/C) không bị ép type**.

**Generic path (bài thường, không five_cards)** có bộ ép type **khác hẳn** — 10 câu
với thứ tự cố định `DAILY_MODULE_ONE_SLOT_TYPES`
(`validate-curriculum.mjs:80-84`, ép ở `validateReadyDailyModuleOneLesson`,
`:343-422`). Bộ này **không dùng** cho five_cards.

## 1.4. `reading` — format thật

**Format = TRƯỜNG RIÊNG chứa chuỗi kana thuần. KHÔNG phải ruby `[漢字|かな]`.**

- Helper tạo dòng: `reading` là tham số string riêng.
  `scripts/content/daily-life/module-1/ja-unit1-lesson1.mjs:18-29`
  ```js
  const line = (speaker, text, reading, translation, speechText = text) => ({
    speaker, ..., reading, speechText, ...
  });
  ```
- `displayText` chứa **furigana kiểu ngoặc tròn full-width** `漢字（かな）`:
  `ja-unit1-lesson1.mjs:12` → `displayName: '先生（せんせい）'`; `:81` →
  `token('watashi', '私（わたし）', '私', 'わたし')`.
- Frontend tách reading từ `（）`: `frontend/src/utils/practiceValidation.ts:5`
  ```js
  const readingOrText = (value) => value.match(/（([^）]+)）/)?.[1] ?? value;
  ```
- **Không tồn tại** format ruby `[…|…]`/`｜` trong source Golden (đã grep, 0 kết quả).

**Kanji bắt buộc có reading:**
- **(B) Golden** — `requireReading` (`validate-curriculum.mjs:1201-1217`): text khớp
  `/[㐀-鿿]/u` mà `reading` rỗng → fail. Áp cho: vocabulary (1207),
  dialogue lines (1208), **ví dụ trong vocabularyDetails** (1209-1211), **grammar
  formula** (1213: thiếu `formulaReading` → fail) + grammar examples (1216).
- **(A) generic** — dialogue `:406-408`, vocabulary `:416-420`; JA item chung
  `:593-595` (`if (!item.reading) fail("missing reading")`).

**Câu toàn kana:** `reading` = **chính chuỗi kana đó** (không đổi).
Ví dụ `ja-unit1-lesson1.mjs:415`: `displayText: 'おはようございます'`,
`reading: 'おはようございます'`. Với kanji, reading = phiên bản **hiragana thuần**
của cả câu (vd `私は田中です。` → `わたしはたなかです。`).

## 1.5. Q14 — cấu trúc (real_world_practice_dialogue)

**(B) CHỈ GOLDEN** (`validate-curriculum.mjs:1117-1181`):

- `type === 'real_world_practice_dialogue'` **và** `nonGraded === true` — bắt buộc
  (`:1137-1138`).
- **Đúng 14 dòng** `dialogueLines` (`:1139`) **và** 14 dòng khớp **literal** với
  `approvedQ14Targets` (`:1120-1135`, so ở `:1168-1170`).
- `scenarioTitleByNative.vi` + `scenarioDescriptionByNative.vi` bắt buộc (`:1140-1141`).
- Mỗi dòng: `speakerId` ∈ pool (`:1146-1148`); `targetText` + `speechText` bắt buộc
  (`:1149-1151`); translation **vi/en/ja** bắt buộc (`:1152-1155`); `reading`
  **không được chứa romaji** `/[a-zA-Z]/` (`:1156-1158`); `romanization` hợp lệ
  (`:1159-1167`).
- **Scene divider: ép ĐÚNG 1**, tại `afterDialogueLine === 10`, `targetText ===
  '着いた時'`, có vi/en/ja (`:1171-1181`).

> **Quan trọng — số scene divider:** ràng buộc "đúng 1 divider" là **(B) CHỈ
> GOLDEN**. Với bài mới (id khác), hàm literal-lock **không chạy** → **(C) code
> KHÔNG ép số scene divider**. Bài mới được **0, 1 hay nhiều** scene divider (miễn
> đã mở scope ở phần tiên quyết). Runtime Flutter không giới hạn số divider.
>
> **Số dòng Q14:** "đúng 14" cũng là **(B) CHỈ GOLDEN**. Bài mới **(C) không bị ép
> đúng 14 dòng** bởi validator (nhưng vẫn nên là tiểu phẩm hoàn chỉnh — Phần 2, mục 9).

## 1.6. localization — five_cards dùng đúng 3 locale (vi/en/ja)

**Có hai tầng, phân biệt rõ:**

- **File localization của Golden** dùng **đúng 3** locale:
  `scripts/content/daily-life/module-1/ja-unit1-lesson1-localization.mjs:423`
  ```js
  const localeCodes = ['vi', 'en', 'ja'];
  ```
  Helper: `add(vi, en, ja)` (`:10`); Map `supportTextByVietnamese` (`:421`);
  `localizeGoldenSupport()` tự sinh khóa `<key>ByNative` (`:456-492`).
- **Fail-loud:** chuỗi tiếng Việt lọt ra en/ja mà thiếu row dịch → **throw**
  `[golden-support] missing …` (`ja-unit1-lesson1-localization.mjs:440-448` và
  `:479-485`). Có cờ dev `GOLDEN_COLLECT_MISSING=1` để gom hết (`:6-7`).
- **Golden lock** chỉ kiểm **vi/en/ja** (vd Q14 `:1152-1155`; scenario `:1140-1141`).

> **Đối chiếu với validator 5 locale:** `NATIVE_CODES = ["vi","en","ja","ko","zh"]`
> (`validate-curriculum.mjs:20`) và `validateTranslations` đòi đủ 5 (`:117-127`).
> **NHƯNG** với five_cards Golden, `validateTranslations` **không được gọi** — nên
> **five_cards chỉ cần vi/en/ja**. 5 locale là **(A) LUẬT của bài generic**
> (`validateJapaneseItem:598`, vocab `:1338`), **không phải** luật của five_cards.

## 1.7. `approvedCharacterNamePool` — speakerId phải trỏ pool

**(B) CHỈ GOLDEN.**
- Pool + tra cứu: `ja-unit1-lesson1.mjs:11-16`. Renderer tự resolve tên qua
  `speakerId`; helper `dialogueLine` set `speaker: undefined` (`:31-44`).
- Mỗi `speakerId` trong dialogue phải ∈ pool: `validate-curriculum.mjs:1049-1055`.
- Mỗi `speakerId` trong Q14 phải ∈ pool: `:1145-1148`.
- Pool bắt buộc đủ `id/displayName/canonicalName/audioName`: `:1044-1048`.

Runtime Flutter cũng resolve qua pool:
`mobile/.../exercises/five_card_exercise_flow.dart:2181-2183`
(`.characterById(lines[i].speakerId)`).

---

## 1.8. CƠ CHẾ (a) — AUDIO / NÚT LOA (xác minh kỹ)

**Nút loa = widget `SpeakerButton`**, phát trường **`speechText`** qua TTS.
`mobile/novalang_flutter/lib/widgets/lesson/speaker_button.dart:5-46`
```dart
class SpeakerButton extends StatelessWidget {
  const SpeakerButton({ required this.speechText, this.languageCode = 'ja', ... });
  ...
  onPressed: () async {
    final result = await TtsService.instance.speak(
      text: speechText, languageCode: languageCode);
    ...
  }
}
```

**Trường nào phát audio, ở đâu:**

| Mục | Trường phát | Locale TTS | Dẫn chứng |
|---|---|---|---|
| Thẻ từ vựng | `item.speechText` | `learningLanguageCode` | `lesson_five_card_pages.dart:498-503` |
| Dòng hội thoại (card 3) | `line['speechText']` | `learningLanguageCode` | `lesson_five_card_pages.dart:997-998` |
| Ví dụ ngữ pháp (card 4) | `value['text']` | `learningLanguageCode` | `lesson_five_card_pages.dart:1113-1114` |
| Bài nghe (Q6/Q8…) | `exercise.audioText` | — | `five_card_exercise_flow.dart:1176-1177` |
| Dòng Q14 | `lines[i].speechText` | `widget.learningLanguageCode` | `five_card_exercise_flow.dart:2191`, `_play` `:2021-2035` |

**Kết luận cơ chế loa:**
- **Để một mục CÓ loa: phải điền `speechText`** (với bài nghe là `audioText`; với
  ví dụ ngữ pháp là trường `text` của ví dụ). Nút `SpeakerButton` **luôn được render**
  bởi card tương ứng — nó **không tự ẩn** khi `speechText` rỗng; nếu rỗng thì bấm sẽ
  phát chuỗi rỗng (không có tiếng). Tức "có nút" do card quyết định, "có tiếng" do
  `speechText` quyết định.
- **`audioLocale`:** là trường **có trong model** (`five_card_practice.dart:305,320,
  340-342,353`) và **bị validator generic/test kiểm tồn tại** (vd
  `validate-curriculum.mjs:399`, dialogue). **NHƯNG** locale thực tế khi phát TTS
  trong renderer five_cards lấy từ **`learningLanguageCode` / `SpeakerButton.languageCode`
  (mặc định `'ja'`)**, **không** phải từ `audioLocale` của từng item. Vẫn nên điền
  `audioLocale: 'ja-JP'` cho đúng contract dữ liệu.
- **`speechText` có buộc kana thuần không?** **KHÔNG (C).** Trong Golden, `speechText`
  của dòng hội thoại = chính text **có kanji** (`ja-unit1-lesson1.mjs:24`
  `speechText = text`); nhiều `audioText` lại là kana. Chỗ duy nhất đụng tới là
  frontend **DEV-only, chỉ CẢNH BÁO không throw**:
  `frontend/src/utils/practiceValidation.ts:22` (`if (!import.meta.env.DEV) return;`)
  + `:57` (`containsBareKanji(exercise.audioText)` → `warn`). → text có kanji vẫn chạy.
- **Grammar có cần audio không?** **KHÔNG bắt buộc (C).** Ví dụ ngữ pháp chỉ phát khi
  card render `SpeakerButton` với `value['text']`; validator **không** ép audio cho
  grammar. (Reading của formula/ví dụ mới bị ép nếu có kanji — 1.4.)

**→ Người viết bài cần điền để có loa:** `speechText` cho mỗi từ vựng / dòng hội
thoại / dòng Q14 (và `audioText` cho bài nghe). Kèm `audioLocale: 'ja-JP'` cho đúng
schema.

## 1.9. CƠ CHẾ (b) — Q14 TOGGLE (reading / romaji / translation)

**Nơi định nghĩa:** `mobile/.../exercises/five_card_exercise_flow.dart`.

- State: `Q14ReadingAidSessionState { showReading, showRomanization, ... }` (`:47-73`).
- **Mặc định** (`:95-102`):
  ```dart
  showReading: true,        // Hiragana (reading): BẬT
  showRomanization: false,  // Romaji: TẮT
  romanizationToggleAllowed: q14RomanizationToggleAllowed(normalizedLevel),
  ```
- `_showTranslation = true` — **translation: BẬT** mặc định (`:2016`).
- **Toggle romaji chỉ hiện ở level A0/A1/A2/B1:**
  ```dart
  bool q14RomanizationToggleAllowed(String level) =>
      const {'A0', 'A1', 'A2', 'B1'}.contains(level.trim().toUpperCase());  // :75-76
  ```
  B2/C1/C2 → không hiện toggle romaji (`setShowRomanization` cũng chặn nếu không
  allowed, `:114-123`; điều kiện hiện toggle `:2062-2063`).
- Ba toggle render: reading `:2130-2140`, romaji (nếu allowed) `:2141-2156`,
  translation `:2157-2167`.

**Romaji viết tay hay tự sinh?**
- **Q14: TỰ SINH** — ghi đè bằng `toReadableRomaji(line.targetText)`:
  `helpers.mjs:58-75` (`withGeneratedQ14Romanization`).
- Hàm sinh: `scripts/lib/japanese-pronunciation.mjs:609-613` (`toReadableRomaji`,
  **throw nếu chưa pre-tokenize**), phải gọi `prepareJapaneseRomanization()` trước
  (`:589`). `helpers.mjs:14-25` hiện chỉ pre-tokenize **Q14 của Golden** → **bài mới
  có Q14 phải bổ sung targets vào mảng này**, nếu không `toReadableRomaji` throw.
- Ràng buộc romaji: `romanization` **không được chứa kana** —
  `requireGeneratedQ14Romanization` (`scripts/lib/q14-romanization-validation.mjs`:
  string, không rỗng, không kana) + `validateNoRawKanaInRomanization`
  (`validate-curriculum.mjs:565-580`, gọi ở `:1309`).
- **Vocab romaji thì VIẾT TAY** (khác Q14): `ja-unit1-lesson1.mjs:415`
  `romanization: 'ohayō gozaimasu'`.

**→ Người viết bài cần cung cấp:** `reading` (kana) cho mỗi dòng Q14 — hệ thống
**tự lo romaji** (sinh từ `targetText`). Với **vocab**, cung cấp cả `reading` **và**
`romanization` (viết tay). Không cần lo hiển thị toggle (Flutter tự quản; mặc định
reading BẬT, romaji TẮT, translation BẬT).

---

# PHẦN 2 — QUY ƯỚC NỘI DUNG (owner, KHÔNG có trong code)

> **Toàn bộ mục dưới đây là QUY ƯỚC SẢN PHẨM của owner, KHÔNG phải ràng buộc code.**
> Validator **KHÔNG bắt** — người viết bài phải **tự giữ**. (Trừ vài chốt literal
> Golden trùng khớp tình cờ, đã chú ở nơi liên quan.)

1. **Trung tính về người học.** Không nhắc quốc tịch trong giải thích. "người Việt
   hay sai X" → **SAI**; dùng "người học thường nhầm X". Áp cho **mọi** trường giải
   thích (`explanation`, `notes`, `importantNote`, `avoid`, `casual`, feedback…).
   *(Code: không có check cấm quốc tịch. Golden chỉ cấm tên nhân vật tiếng Việt cụ
   thể — `validate-curriculum.mjs:1182-1184` — đó là (B), không phải luật chung.)*

2. **Không dùng placeholder `[tên]`.** Viết thẳng tên thật bằng ngôn ngữ đích;
   người học tự ghép tên mình. *(Code: (C) không có check placeholder.)*

3. **Tên nhân vật** dùng ngôn ngữ đích thật; **ưu tiên dùng lại pool đã có** để nối
   mạch câu chuyện xuyên các lesson.

4. **Từ đa nghĩa / nhiều cách đọc:** cho **1–2 ví dụ mỗi nghĩa/cách đọc**, rồi ghi
   "giải thích sâu hơn ở Trung cấp/Cao cấp". Không giải thích hết sắc thái ở Cơ bản.

5. **Câu sắp xếp (`sentence_ordering` / `slot_ordering`):** cho **dư token**, **ít
   nhất 2 token nhiễu** (distractor không dùng). Không cho sẵn đúng số token.
   *(Code: (C) không ép số distractor tối thiểu. Golden chỉ ép đúng 1 distractor
   literal `konbanwa_distractor` cho Q13 — `validate-curriculum.mjs:1105-1113`, là
   (B). Quy ước owner ≥2 mạnh hơn code.)*

6. **Mọi ví dụ trong thẻ từ vựng phải có dịch nghĩa** (dù validator không ép).
   *(Code: (C) — `example.translation` là string thô, không bị kiểm đủ locale.)*

7. **Mọi từ vựng / ví dụ / dòng hội thoại phải có audio** (điền `speechText`) —
   không sót. *(Xem 1.8: đây vừa là quy ước, vừa là điều kiện kỹ thuật để có tiếng.)*

8. **Văn phong giải thích:** ấm, đời thường, như người bản ngữ giảng cho bạn mình.

9. **Q14 = tiểu phẩm có cốt truyện thật** (mở — thân — kết), không phải câu rời.
   *(Code: (C) với bài mới — không ép số dòng/cốt truyện; Golden khóa literal 14 câu.)*

10. **Nội dung học = ngôn ngữ đích** (kể cả tên riêng); **khung giải thích = tiếng
    mẹ đẻ thuần** (không lẫn từ phiên âm). *(Trùng một phần với 1.6 fail-loud, nhưng
    yêu cầu "thuần, không lẫn phiên âm" là quy ước owner.)*

11. **Lesson nối mạch trong unit:** mỗi lesson đào phần tiếp theo, không lặp bài
    trước.

12. **Xử lý dấu theo bản chất ngôn ngữ** (khi mở rộng sang ngôn ngữ khác):
    - Dấu là **chữ cái riêng** (Ba Lan `ł/ó`) → thiếu dấu = **sai** + nhắc cài bàn
      phím.
    - Dấu phụ **nhẹ** (Ý/Bồ/TBN) → **cảnh báo nhẹ**, không tính sai gắt.
    *(Code: (C) — chưa có cơ chế phân loại dấu cho các ngôn ngữ này trong repo.)*

---

# CÒN MƠ HỒ / CẦN QUYẾT SAU

1. **Nới scope guard cho bài viết tay ngoài Golden — CẦN OWNER QUYẾT.**
   Hiện `five_cards` bị khóa cứng vào đúng `ja-daily_life-m01-u1-l1` bởi **2 chốt**
   (`smoke-curriculum-flow.mjs:209-217` và `validate-curriculum.mjs:1314`). Phương
   án đề xuất (chưa làm): thay việc so **một id** bằng **một danh sách id được phê
   duyệt** (allow-list), và cho phép lesson trong danh sách push `exercises: []`.
   Cần owner chốt: (a) danh sách id nào; (b) có viết một `validateApprovedFiveCards
   Lesson()` **generic** (kiểm cấu trúc 5-card mà **không** literal-lock nội dung)
   để thay cho `validateApprovedJaUnitOneLesson` khi bài không phải Golden không.

2. **Special-case trong `helpers.mjs`.** Hiện chỉ có nhánh cho u1l1
   (`helpers.mjs:280-333`). Bài viết tay mới cần thêm nhánh tương tự (đổi điều kiện
   `unitIndex/lessonIndex`, `approved = <LESSON MỚI>`, `order`, id). **Chưa có** —
   là việc build, ngoài phạm vi tài liệu.

3. **Pre-tokenize romaji cho Q14 bài mới.** `helpers.mjs:14-25` chỉ nạp targets của
   Q14 Golden. Bài mới có Q14 phải thêm targets, nếu không `toReadableRomaji` throw
   (`japanese-pronunciation.mjs:613`). Cần chuẩn hoá cách gom targets cho nhiều bài.

4. **`audioLocale` vs locale TTS thực tế.** Model có `audioLocale` per-item nhưng
   renderer five_cards phát theo `learningLanguageCode` (1.8). Cần owner xác nhận
   đây là chủ ý (một ngôn ngữ học/1 lesson) hay nên tôn trọng `audioLocale` per-item
   (vd chèn từ mượn khác locale).

5. **`speechText` chứa kanji.** Hiện chỉ **cảnh báo** (DEV-only,
   `practiceValidation.ts:57`), không throw. Cần quyết: có nên siết `speechText`/
   `audioText` về kana thuần để TTS chuẩn hơn không (hiện engine đọc được kanji).

6. **Khớp `vocabulary` ↔ `vocabularyDetails` theo id.** Code chỉ ép **độ dài = 8**,
   không ép khớp id/thứ tự (1.2). Nếu coi khớp id là quan trọng, cần thêm check —
   hiện là quy ước mềm.

---

_Tài liệu chuẩn — chỉ mô tả, không sửa validator/helpers, không build bài. Trích
dẫn theo branch `fix/curriculum-quality-gates`._
