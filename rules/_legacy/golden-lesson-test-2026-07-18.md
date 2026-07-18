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

Đo trực tiếp trên toàn bộ 3 câu `multiple_choice` có cấu trúc `options` +
`correctOptionId` đo được (Q1, Q2, Q7 — 8 câu còn lại không có cấu trúc này
hoặc là kiểu bài khác):

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
   sửa `_base` mà có ngôn ngữ FROZEN phụ thuộc.
2. Sửa invariant 9 thật — đối chiếu `exercise-phenomena.map.json` với
   `coverage.json` thật từng ngôn ngữ (C6).
3. Sửa `_base/distractor.rules.json` theo G-01 (provenance-based exemption).
4. C7 — bảng ánh xạ tên trường; công cụ `lesson-check.mjs` chạy rule thật
   lên 1 lesson JSON; A3 — thêm ngoại lệ cụm cố định.
5. Báo cáo trạng thái FROZEN của ja/en/vi/zh sau khi `_base` đổi.
