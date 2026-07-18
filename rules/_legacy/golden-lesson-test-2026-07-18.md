# Golden Lesson rule test — 2026-07-18

**Nguồn:** một phiên khác đã chạy phép thử độc lập — áp rule `ja` + `_base`
hiện có lên Golden Lesson `ja-daily_life-m01-u1-l1` (bài viết tay, được duyệt
**trước khi** có hệ rule này). Phiên đó gắn nhãn `A1-A3` (rule bắt nhầm nội
dung đúng sư phạm), `B1-B4` (bài thiếu data), `C1-C7` (rule thiếu) — tổng
**14 mục**, không phải 7 như báo cáo miệng ban đầu (đếm sai, owner tự sửa).

**Kiểm chứng độc lập (kỷ luật 2 nguồn của chính pipeline này):** phiên hiện
tại tự đọc trực tiếp `shared/generated/lessons.json` +
`shared/content/curriculum/lessons.json` + rule thật (`rules/_base/*`,
`rules/languages/ja/*.rules.json`) — **không tin bản chuyển tiếp của owner
cho nhóm A/C**, tự chạy lại độc lập. Kết quả: **khớp 14/14**, không lệch,
chỉ bổ sung thêm 1 điểm nhỏ owner bỏ sót (Q1 "Chào buổi tối" cũng vi phạm
length_ratio_max, không chỉ "Chào buổi sáng"). Mỗi mục dưới đây ghi rõ bằng
chứng số liệu/trích dẫn thật đã tự đo, không suy diễn.

---

## NHÓM A — Rule bắt nhầm nội dung đúng sư phạm

### A1 — `_base/distractor.length_ratio_max = 1.5` quá chặt cho A0

Đo trực tiếp trên **3 câu** `multiple_choice` có cấu trúc `options` +
`correctOptionId` mà bản audit tay ban đầu kiểm được (Q1, Q2, Q7 — lúc đó
ghi "8 câu còn lại không có cấu trúc này hoặc là kiểu bài khác"):

| Câu | Đáp án đúng (độ dài) | Nhiễu vi phạm (độ dài) | Tỷ lệ |
|---|---|---|---|
| Q1 | "Xin chào" (8) | "Chào buổi sáng" (14) | **1.75** |
| Q1 | "Xin chào" (8) | "Chào buổi tối" (13) | **1.62** (owner bỏ sót, tự tìm thêm) |
| Q2 | "こんばんは" (5) | "おはようございます" (9) | **1.8** |
| Q7 | "です" (2) | "こんにちは" (5) | **2.5** |

Cả 4 nhiễu đều là **lời chào khác trong cùng bài** — bộ nhiễu tự nhiên nhất
có thể có ở trình độ A0 (cùng trường nghĩa "chào hỏi", người học thật sự dễ
nhầm). Rule `length_ratio_max: 1.5` không có căn cứ ngôn ngữ học hay sư phạm
— do AI viết prompt ban đầu tự đặt (owner xác nhận, xem G-01).

**Cập nhật 2026-07-18 (sau khi `tools/lesson-check.mjs` được xây ở việc-5):**
bản audit tay ban đầu **bỏ sót Q8, Q11, Q12** — cả 3 câu này CŨNG có đúng cấu
trúc `options[]` + `correctOptionId` (kiểu `contextual_response`/
`naturalness_judgement`, không phải `multiple_choice` thuần, nhưng cùng
shape dữ liệu), nên vẫn đo được `length_ratio_max` như Q1/Q2/Q7. Chạy
`node tools/lesson-check.mjs --lang ja --lesson-id ja-daily_life-m01-u1-l1`
(mặc định `--assume-provenance auto_generated`) phát hiện thêm 9 vi phạm
nữa, TỔNG CỘNG 14 (không phải 4 như bản tay ban đầu):

| Câu | Đáp án đúng (độ dài) | Nhiễu vi phạm (độ dài) | Tỷ lệ |
|---|---|---|---|
| Q8 | "はじめまして。私は佐藤です。よろしくお願いします。" (39) | "おやすみなさい。" (8) | **4.88** |
| Q8 | (như trên, 39) | "いただきます。" (7) | **5.57** |
| Q8 | (như trên, 39) | "さようなら。" (6) | **6.50** |
| Q11 | "おはようございます。はじめまして。私は田中です。よろしくお願いします。" (49) | "こんばんは。私は田中です。" (23) | **2.13** |
| Q11 | (như trên, 49) | "さようなら。田中さんです。" (18) | **2.72** |
| Q11 | (như trên, 49) | "こんにちは。おやすみなさい。" (14) | **3.50** |
| Q12 | "はじめまして。私は田中です。よろしくお願いします。" (39) | "よろしくお願いします。私はです田中。" (18) | **2.17** |
| Q12 | (như trên, 39) | "田中さんは私です。" (19) | **2.05** |
| Q12 | (như trên, 39) | "こんばんは。はじめまして。さようなら。" (19) | **2.05** |

Nguồn phát hiện: **`tools/lesson-check.mjs`** (chạy thật, không phải đọc
tay) — chính công cụ được xây ở việc-5 để giải quyết vế "chưa có tool nào
chạy rule lên 1 file lesson JSON cụ thể" của C6. Điều này tự nó là bằng
chứng cho lý do C6/lesson-check.mjs tồn tại: audit tay, dù cẩn thận, vẫn bỏ
sót 3/6 câu multiple-choice-shaped thật có trong bài. Kết luận A1 KHÔNG đổi
(rule vẫn sai theo cách tương tự ở cả 9 câu mới), chỉ mở rộng phạm vi bằng
chứng — không ảnh hưởng G-01 (đã sửa đúng gốc bằng provenance, áp dụng đều
cho toàn bộ 14 câu, không chỉ 4 câu ban đầu — xác nhận bằng
`tools/lesson-check.mjs --assume-provenance owner_approved`: cả 14 vi phạm
đều chuyển thành MIỄN).

### A2 — `_base/distractor.same_word_class = true` sai chủ ý sư phạm ở Q7

Q7: đáp án đúng です (trợ động từ/copula), 3 nhiễu さん (hậu tố danh xưng) /
は (trợ từ) / こんにちは (thán từ chào hỏi) — **4 loại từ khác nhau hoàn
toàn**. Đây không phải bài lỗi mà là **chủ ý**: Q7 dạy phân biệt chức năng
ngữ pháp (khi nào dùng です, khi nào dùng さん/は), nhiễu khác loại từ chính
là điểm dạy. `same_word_class: true` áp cứng sẽ kết án đúng bài thiết kế tốt.

### A3 — check `baseline-polite-sentence-ends-desu-masu` (ja/pragmatics.rules.json) thiếu ngoại lệ cụm cố định

Nguyên văn check hiện tại: *"Chỉ áp cho nội dung sinh ở register baseline,
KHÔNG áp cho corpus văn viết chung."* — ngoại lệ này chỉ loại trừ "corpus văn
viết chung", **không** loại trừ cụm chào hỏi cố định xuất hiện ngay trong nội
dung bài (thứ chắc chắn tính là "nội dung sinh ở register baseline"). Bằng
chứng thật: Q14 dòng cuối "...さようなら。" (さようなら không có です/ます);
vocab headword こんにちは/こんばんは (`lesson.vocabulary[].displayText`)
đứng một mình, không です/ます. Nếu check chạy theo câu (tách bằng 。) trên
nội dung bài thay vì chỉ lúc generator sinh mới, các cụm này sẽ bị báo sai.
Thiếu danh sách miễn trừ "fixed expression/greeting".

---

## NHÓM B — Bài thiếu data (rule đúng), Golden FROZEN nên phải qua change control

### B1 — 3/8 mục từ vựng thiếu `romanization`

Trường thật: `lesson.vocabulary[]` (8 mục). Đo trực tiếp:

| id | reading | romanization |
|---|---|---|
| ohayo-gozaimasu | おはようございます | ohayō gozaimasu |
| konnichiwa | こんにちは | konnichiwa |
| konbanwa | こんばんは | konbanwa |
| hajimemashite | はじめまして | hajimemashite |
| **desu** | **None** | **None** |
| yoroshiku-onegaishimasu | よろしくおねがいします | yoroshiku onegaishimasu |
| **kochira-koso** | こちらこそ、よろしくおねがいします | **None** |
| **sayounara** | さようなら | **None** |

Xác nhận đúng 3/8: `desu`, `kochira-koso`, `sayounara` thiếu `romanization`.

### B2 — `desu` thiếu luôn cả `reading`, không nhất quán với quy ước bài

4 mục kana-only khác (ohayo-gozaimasu, konnichiwa, konbanwa, hajimemashite)
đều có `reading` = chính `displayText` (quy ước: mục toàn kana thì reading tự
lặp lại chính nó). `desu` (displayText: "～です", toàn kana) là ngoại lệ duy
nhất có `reading: None` — vi phạm quy ước chính bài này tự đặt ra.

### B3 — Scene divider Q14 "着いた時" có kanji nhưng không `reading`/`romanization`

`Q14.sceneDividers[0]`: `{"afterDialogueLine": 10, "targetText": "着いた時", ...}`
— chỉ có `targetText` + `translationByNative`, không `reading`, không
`romanization`. 着 là kanji ngoài bảng kana-only, nên đây là khoảng trống
thật (khác các dòng hội thoại khác trong Q14 đều có đủ `reading`+`romanization`).

### B4 — `communicationStrategyByNative` rỗng cả 3 ngôn ngữ

`lesson.communicationStrategyByNative` = `{}` (rỗng hoàn toàn, không có
key `vi`/`en`/`ja`). Không vi phạm cứng nào (runtime có placeholder xử lý
trường rỗng), chỉ ghi nhận theo yêu cầu owner — không phải lỗi chặn.

---

## NHÓM C — Rule thiếu

### C1 — Không có rule về chấp nhận input romaji + chuẩn hoá tách từ

`Q10.slots[1].acceptedAnswers` (slot `chat_closing_slot`) chấp nhận cả:
`"yoroshiku onegaishimasu"` (liền) và `"yoroshiku onegai shimasu"` (tách) —
2 cách tách từ khác nhau cho cùng 1 câu trả lời romaji hợp lệ. D-13 (chấm
đáp án ja) chỉ nói về kana/kanji, không nói gì về input romaji. Phenomenon
`typing_input` có trong `exercise-phenomena.map.json` (`_meta.phenomenaVocabulary`
và `Q10.requiredPhenomena`) nhưng **0 lần xuất hiện** trong `coverage.json`
của bất kỳ ngôn ngữ nào (đã grep xác nhận cả 4 ngôn ngữ: ja/en/vi/zh = 0).

### C2 — Nhiễu/distractor cố ý sai là nội dung HỢP LỆ, validator toàn văn sẽ bắn nhầm

Bằng chứng thật:
- `Q12.options[1]` (id `unnatural_order`): text = `"よろしくお願いします。私はです田中。"`
  — chứa `私はです田中` (trật tự sai cố ý) — đúng hình mẫu fixture-fail tôi đã
  viết trong `grammar.rules.json`.
- `Q6.options[2]` (id `audio_evening_tanaka`): text = `"こんばんは。田中（たなか）さんです。"`
  — gắn さん vào tên chính mình, sai ngữ dụng cố ý — đúng hình mẫu fixture-fail
  trong `pragmatics.rules.json`.

Không có cơ chế đánh dấu "intentionally incorrect" trên các trường này — nếu
validator quét ngôn ngữ đúng/sai trên toàn văn bản (không phân biệt
`correctAnswer` vs `options`/nhiễu), sẽ báo sai các distractor thiết kế đúng
mục đích.

### C3 — Không có nhãn register máy-đọc trên dòng/nhóm hội thoại

`lesson.dialogueGroups[2]` (nhóm hội thoại 3) chủ ý chuyển sang casual:
"あらためて、田中。よろしく！", "佐藤。よろしく！",
"佐藤さんじゃなくて、佐藤でいい？", "うん、いいよ。田中もよろしく！",
"じゃあ、また明日！", "またね！" — bài dạy chuyển register (formal ở nhóm
0-1, casual ở nhóm 2) nhưng schema `dialogueGroups[].lines[]` không có
trường register nào (chỉ có `speakerId`/`targetText`/...). Không cách nào
máy phân biệt "đoạn này CỐ Ý casual" với "đoạn này lẽ ra phải formal".

### C4 — Dấu ！ trong nội dung target chưa được D-39 xác nhận cho phép

D-39 (đã chốt): "app CHỈ dạy 。、". Nhóm hội thoại 3 (casual) có 4 dòng dùng
！ ("よろしく！", "またね！"...). D-39 nói về **quy ước dạy** (app dạy học
sinh dấu câu nào), không nói rõ **nội dung target-language** có được chứa ！
hay không. Đây là khoảng mờ giữa "dạy" và "xuất hiện trong nội dung", chưa
ai xác nhận.

### C5 — Trường register/casual của `vocabularyDetails` là văn xuôi, không máy-đọc theo taxonomy

Xác nhận trực tiếp (`fiveCardContent.vocabularyDetails[0]`, id `ohayo-gozaimasu`):
`"register": "Lịch sự."`, `"casual": ["Cách thân mật chuẩn:", "おはよう！", ...]`
— nội dung đúng về ngữ nghĩa (khớp tinh thần `_base/register.rules.json`:
baseline `NATURAL_NEUTRAL_POLITE`, có biến thể casual không bịa), nhưng là
**chuỗi văn xuôi tự do**, không map được vào taxonomy máy-đọc
(`CASUAL`/`NATURAL_NEUTRAL_POLITE`/`FORMAL` + `HONORIFIC`/`CEREMONIAL`/`SLANG`).

### C6 — Tên phenomena giữa `exercise-phenomena.map.json` và `coverage.json` không khớp

**Đã xác nhận ở lượt trước phiên này**, nhắc lại tóm tắt: `INV-9`
(`tools/validate.mjs`) chỉ đối chiếu `exercise-phenomena.map.json` với
chính `_meta.phenomenaVocabulary` của nó (tự tham chiếu), không bao giờ đối
chiếu với `coverage.json` thật của ngôn ngữ nào. Bằng chứng: vocabulary dùng
tên trừu tượng (`register`, `naturalness`, `reading_aid`, `audio_playback`...)
trong khi `ja/coverage.json` dùng tên cụ thể khác (`register_taxonomy`,
`naturalness_translation`, `reading_aid_policy`, `tts_audio_policy`...) —
hai bộ tên chưa từng khớp. Chưa có tool nào chạy rule lên 1 file lesson JSON
cụ thể (chỉ có fixture rời rạc trong từng `*.rules.json`).

### C7 — Ba bộ tên trường text sống song song, không thống nhất

| Nơi | Tên trường |
|---|---|
| `_base/text-fields.rules.json` | `displayText` / `canonicalText` / `audioText` |
| Schema `vocabulary[]` + `dialogueLines[]` thật | `displayText` / `reading` / `romanization` / `speechText` |
| ADR-015 (`docs/ai/ARCHITECTURE_DECISIONS.md`) | `surfaceText` / `reading` / `romanization` / `pronunciation` / `ttsText` |

Ba vai trò tương tự nhau (hiển thị / máy chấm-đọc-hiểu / TTS) nhưng ba bộ tên
khác nhau ở 3 tầng governance khác nhau — chưa có bảng ánh xạ chính thức.

---

## Quyết định của owner (G-01 .. G-04)

- **⭐ G-01 · 2026-07-18 · owner · ALL (`_base/distractor`)** — Sửa GỐC, không
  thêm ngoại lệ theo danh sách. `length_ratio_max` và `same_word_class` **CHỈ
  áp cho distractor SINH TỰ ĐỘNG** (generator tạo ra). Nội dung **đã duyệt**
  (hand-authored, qua review) miễn theo **provenance** (nguồn gốc: ai/quy
  trình nào tạo ra nội dung này), không theo danh sách ngoại lệ liệt kê tay
  từng trường hợp. Khớp luật cũ đã có: "Không dùng word frequency/LLM score/
  regex phong cách để tự động tạo PASS" (D-26) — cùng tinh thần "không dùng
  máy móc để tự động kết án nội dung đã người duyệt".
- **G-02 · 2026-07-18 · owner · ALL** — Đã ghi ở D-50. Bổ sung ở đây: viết
  **SPEC chuẩn hoá romaji** (macron ō/ou/o, shi/si, quy tắc tách từ) làm quy
  tắc chung, **KHÔNG liệt kê tay từng biến thể chấp nhận** (như 2 cách tách
  `yoroshiku onegaishimasu`/`yoroshiku onegai shimasu` hiện tại — đó là triệu
  chứng của việc thiếu spec, không phải giải pháp). Nếu spec phình quá phạm
  vi hợp lý khi viết → dừng, báo owner, không tự mở rộng phạm vi.
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
    `dialogueGroups`**, ghi nợ rõ ràng ở đây và trong `decisions.md`, không
    tự bịa trường mới mà không có schema change được duyệt riêng.

---

## Việc kế tiếp (thực hiện trong phiên ghi tài liệu này, xem `decisions.md` mục tương ứng)

1. `_base/*.rules.json` (6 file) thiếu front-matter (`status`/`version`) →
   khiến trạng thái FROZEN của ja/en/vi không phủ được lớp `_base` chúng phụ
   thuộc. Sửa: thêm front-matter, mở rộng invariant 3, chặn/hạ trạng thái khi
   sửa `_base` mà có ngôn ngữ FROZEN phụ thuộc. **XONG** — commit `3e294df`.
2. Sửa invariant 9 thật — đối chiếu `exercise-phenomena.map.json` với
   `coverage.json` thật từng ngôn ngữ (C6). **XONG** — commit `9ae79e9`.
3. Sửa `_base/distractor.rules.json` theo G-01 (provenance-based exemption).
   **XONG** — commit `3c621da`.
4. C7 — bảng ánh xạ tên trường; công cụ `lesson-check.mjs` chạy rule thật
   lên 1 lesson JSON; A3 — thêm ngoại lệ cụm cố định. **XONG** — commit
   `5a02a7f`.
5. Báo cáo trạng thái FROZEN của ja/en/vi/zh sau khi `_base` đổi. **Xem mục
   dưới đây.**

---

## Báo cáo trạng thái FROZEN sau việc 1–4 (2026-07-18) — KHÔNG tự freeze/unfreeze

`_base/distractor` và `_base/text-fields` đổi version (1.0.0 → 1.1.0, việc 3
và việc 4). `coverage.json._meta.baseDependencies` của ja/en/vi/zh vẫn ghim ở
1.0.0 (bản chụp lúc freeze/validate gần nhất, việc 1) — theo thiết kế, KHÔNG
tự cập nhật theo. `node tools/validate.mjs` hiện **FAIL** (chạy trực tiếp để
xác nhận, không suy đoán):

```text
X  INV-3: en đang khai FROZEN nhưng lớp phụ thuộc '_base/distractor' đã đổi version (1.0.0 -> 1.1.0)
X  INV-3: en đang khai FROZEN nhưng lớp phụ thuộc '_base/text-fields' đã đổi version (1.0.0 -> 1.1.0)
X  INV-3: ja đang khai FROZEN nhưng lớp phụ thuộc '_base/distractor' đã đổi version (1.0.0 -> 1.1.0)
X  INV-3: ja đang khai FROZEN nhưng lớp phụ thuộc '_base/text-fields' đã đổi version (1.0.0 -> 1.1.0)
X  INV-3: vi đang khai FROZEN nhưng lớp phụ thuộc '_base/distractor' đã đổi version (1.0.0 -> 1.1.0)
X  INV-3: vi đang khai FROZEN nhưng lớp phụ thuộc '_base/text-fields' đã đổi version (1.0.0 -> 1.1.0)
```

**Theo ngôn ngữ:**

- **ja — KHÔNG còn hợp lệ để coi là FROZEN nguyên trạng.** `catalog.json`
  vẫn ghi `FROZEN_RULE_LEVEL_LEXICAL_OPEN` và `coverage.json._meta.stage`
  vẫn `frozen-rule-level`, nhưng đó là trạng thái **CŨ, chưa re-validate**.
  Rủi ro thật (không phải hình thức): ja có nhiều bài `multiple_choice` dùng
  distractor là lời chào/cụm cố định gần nghĩa (chính là Q1/Q2/Q7 trong audit
  này) — trước G-01 các distractor đó **lẽ ra bị `_base/distractor` kết án
  sai** (A1/A2); muốn ja thật sự hợp lệ dưới rule mới, `chạy
  `tools/lesson-check.mjs --lang ja --lesson-id ja-daily_life-m01-u1-l1`
  xác nhận: 14 vi phạm `length_ratio_max` biến mất khi giả định
  `--assume-provenance owner_approved` (đúng như kỳ vọng G-01), nhưng đây là
  giả định thủ công của tool, KHÔNG phải field `provenance` thật trong schema
  (field đó chưa tồn tại — xem `implementationNote` trong
  `_base/distractor.rules.json`). Vì vậy re-validate ja cần: (a) xác nhận
  không có nội dung ja nào khác dựa vào hành vi CŨ của `length_ratio_max`/
  `same_word_class` mà giờ đổi kết quả không mong muốn — audit này mới chỉ
  chạy `lesson-check.mjs` trên **1 lesson** (Golden); ja có nhiều lesson
  khác từ pipeline generic chưa được quét; (b) bump
  `coverage.json._meta.baseDependencies` sau khi (a) xong.
- **en — KHÔNG còn hợp lệ để coi là FROZEN nguyên trạng**, cùng lý do cấu
  trúc như ja (phụ thuộc `_base/distractor`/`_base/text-fields` y hệt qua
  `_script/Latn`). Chưa chạy `lesson-check.mjs` trên lesson en nào trong
  audit này — cần làm trước khi coi là re-validate xong.
- **vi — KHÔNG còn hợp lệ để coi là FROZEN nguyên trạng**, cùng lý do. Chưa
  chạy `lesson-check.mjs` trên lesson vi nào trong audit này.
- **zh — KHÔNG bị validator gắn cờ (không FAIL vì zh)**, nhưng KHÔNG phải vì
  "vẫn ổn" — mà vì zh **chưa từng FROZEN** (`catalog.json`:
  `VALIDATED_PENDING_FREEZE`, `coverage.json._meta.stage`: `validated`).
  Invariant 3 mở rộng (việc 1) chỉ kiểm ngôn ngữ đang khai FROZEN. zh vẫn
  ghim `_base/distractor`/`_base/text-fields` ở 1.0.0 trong
  `baseDependencies` — nếu zh được đề xuất FROZEN sau thời điểm này, bước đề
  xuất đó tự nhiên cần đối chiếu lại với `_base` hiện tại (1.1.0) trước, nên
  không có hành động thêm nào cần làm riêng cho zh ở đây.

**Mức độ nghiêm trọng thực tế (không chỉ hình thức):** phần `config` thật sự
đổi hành vi chỉ có `_base/distractor` (G-01 — nới lỏng có điều kiện, không
làm rule chặt hơn cho nội dung có sẵn, nên rủi ro False-Negative-mới thấp
hơn False-Positive-cũ đã xác nhận ở A1/A2). `_base/text-fields` chỉ thêm
`fieldNameMapping` (tài liệu/ánh xạ tên trường) — **không đổi `config` thật
sự được enforce** — nên phần bump version của riêng file này mang tính hình
thức/an toàn (bump để không bỏ sót), rủi ro thấp hơn hẳn so với
`_base/distractor`.

**Không tự động thực hiện, chờ owner quyết định hướng nào:**

- (A) Chấp nhận rủi ro thấp đã phân tích ở trên, owner tự xác nhận trực tiếp
  (ja/vi/en đều trong danh sách owner tự đánh giá được — `decisions.md` mục
  Ghi chú) → bump `baseDependencies` của ja/en/vi lên `1.1.0` cho 2 id này,
  coi là re-validate xong, không cần chạy lại toàn bộ Bước 0–4.
- (B) Yêu cầu quét `lesson-check.mjs` (hoặc mở rộng nó để chạy hàng loạt) lên
  toàn bộ lesson generic của ja/en/vi trước khi bump pin — chặt hơn, tốn thời
  gian hơn, loại trừ khả năng còn nội dung khác bị ảnh hưởng ngoài Golden
  Lesson.
- (C) Giữ nguyên trạng thái FAIL của validator như một nhắc nhở treo cho tới
  khi có task riêng xử lý — không làm gì thêm ở đây.

---

## Phép thử quy mô lớn (506 bài thật, read-only) + sửa rule — 2026-07-18

Owner chốt: nối lớp A (validate hậu kiểm), nhưng trước khi nối vào
`validate-curriculum.mjs`, chạy `lesson-check.mjs` (chỉ check text-fields +
register, `--assume-provenance owner_approved`) lên **toàn bộ 506 bài thật**
trong `shared/generated/lessons.json` (Golden + 505 bài generic) — read-only,
không sửa/không commit output nội dung.

### Kết quả lần chạy đầu (rule CŨ, trước khi sửa)

439/506 sạch (86.8%), 0 error, 67 bài có cảnh báo — 3 loại: `romanization_missing`
(147), `reading_missing` (145), `register_baseline_violation` (138). Đọc tay
từng cảnh báo (không chỉ đếm):

- **Check register (A3): 0/138 lần bắt trúng lỗi thật — 100% báo động giả.**
  20 bài hiragana/katakana: check chạy nhầm lên vocabulary là 1 ký tự đơn
  (bảng chữ cái), không phải câu. 22 bài ja daily_life khác Golden, 41 chuỗi
  duy nhất: 14 thiếu mẫu `ですか` trong enders regex (chỉ có `ますか`), 3
  thiếu `ましたか`, 3 thiếu trợ từ cuối câu ね/よ gắn sau です/ます, 11 là câu
  yêu cầu lịch sự て-form/N+を+ください (rule chưa từng công nhận cấu trúc
  này là baseline-polite), 8 là cụm cố định chưa có trong exemption
  (ありがとう/どういたしまして/こちらこそ/どうぞ/ようこそ), 2 là câu hỏi rút
  gọn N+は？.
- **Check text-fields (reading/romanization): ja sạch gần tuyệt đối (4/506,
  đúng 3 mục Golden đã biết — desu/kochira-koso/sayounara), nhưng en 144/144
  (100%) thiếu — nghi báo động giả do lệch cấu trúc** (`en-daily_life`'s
  vocabulary thực ra là câu hội thoại mẫu có field `targetText`, không phải
  từ-đơn kiểu ja) — chưa kết luận chắc, cần owner quyết.

### Quyết định owner (AskUserQuestion, 2026-07-18)

- **En reading-aid:** chọn "Bỏ qua en, ghi nợ D-40 riêng". Bằng chứng đưa ra
  khi hỏi: D-40 (FROZEN) nói en cần IPA, nhưng đúng hợp đồng 5-field ADR-015
  thì IPA thuộc field `pronunciation` (KHÔNG phải `reading`/`romanization` —
  hai field đó là kiểu kana/La-tinh-hoá riêng cho ja); kiểm tra thật: 0/506
  bài có field `pronunciation` ở bất kỳ đâu → D-40 chưa từng được implement
  vào schema. Quyết: check text-fields bỏ qua en hoàn toàn; việc D-40/
  `pronunciation` chưa implement là **gap riêng, ghi nợ tách biệt, KHÔNG sửa
  trong lần này**.
- **N+は？ (câu hỏi rút gọn):** chọn "Coi là hợp lệ, thêm vào regex". Lý do
  đưa ra khi hỏi: đây là cách hỏi rút gọn tự nhiên, đúng ngữ pháp, lịch sự
  trung tính trong tiếng Nhật thật (lược phần đã rõ từ ngữ cảnh), không phải
  câu thiếu lịch sự.

### Sửa rule (chỉ `rules/**` + `tools/**`, không đụng `scripts/`/`shared/`/`lib/`)

- `rules/languages/ja/pragmatics.rules.json` (1.1.0 → 1.2.0): check
  `baseline-polite-sentence-ends-desu-masu` viết lại — `enders_regex_source`
  tham số hoá trong config (thêm ですか/ましたか/ですね/ですよ/ますね/ますよ,
  cộng lớp `ください` và lớp `は` — N+は？), `fixed_expression_exemptions`
  +5 mục (ありがとう/どういたしまして/こちらこそ/どうぞ/ようこそ) và đổi
  cách khớp từ nguyên-văn sang **endsWith** (phủ cả câu dài kết bằng cụm cố
  định, vd "...ありがとう。"), thêm `skip_single_character: true`. 9 fixture
  pass mới lấy nguyên văn từ 41 chuỗi bị bắt nhầm khi chạy thật.
- `tools/lesson-check.mjs`: check 3 đọc `enders_regex_source`/
  `skip_single_character`/`fixed_expression_exemptions` (endsWith) từ chính
  rule file thay vì hard-code cứng như trước. Check 1: reading/romanization
  chỉ áp khi (a) ngôn ngữ có `_script/<ws>.config.reading_aids.applicable`
  ≠ false (đọc từ rule thật, không đoán) VÀ (b) `lang !== 'en'` (quyết định
  owner ở trên) VÀ (c) vocabulary item KHÔNG có field `targetText` (dấu hiệu
  cấu trúc: đây là câu hội thoại mẫu, không phải headword từ-đơn).

### Kết quả lần chạy lại (sau khi sửa, cùng 506 bài, cùng phương pháp)

```
TỔNG: 506 bài
SẠCH HOÀN TOÀN: 505 (99.8%)
CÓ LỖI (error): 0
CÓ CẢNH BÁO: 1 — đúng ja-daily_life-m01-u1-l1 (Golden), 4 cảnh báo
  reading_missing: 1 (desu)
  romanization_missing: 3 (desu, kochira-koso, sayounara)
register_baseline_violation: 0 (giảm từ 138 → 0)
```

**Mục tiêu đạt đúng như owner đặt ra: 506 bài chỉ còn lại 4 lỗi thật (Golden,
hand-typed, đã biết từ lịch sử), báo động giả register về 0.** `node
tools/validate.mjs`: PASS invariant liên quan (chỉ còn FAIL 4 lỗi
`punctuation_layout` vi/zh — nợ cũ, không liên quan việc này, đã ghi nhận
riêng ở trên). Chưa nối vào `validate-curriculum.mjs` — chờ owner quyết bước
tiếp theo.
