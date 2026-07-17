# NovaLang Multilingual Naturalness and Register

Status: `APPROVED_ARCHITECTURE` ·
`PROJECT_OWNER_DOCUMENTATION_REVIEW_PENDING` · `NOT_FROZEN`

Architecture decision: [ADR-016](../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture).
This rule does not add a curriculum/schema field and does not authorize any
content rewrite. Existing content remediation requires a separate approved
audit and change task.

Đây là rule canonical duy nhất cho chất lượng viết (naturalness) và mức độ
trang trọng (register) áp dụng cho **mọi** ngôn ngữ NovaLang dùng: learning
language (nội dung mục tiêu), translation/support language (bản dịch, giải
thích, gợi ý), và UI language (giao diện). Áp dụng sau `AGENTS.md` và
`.cursor/rules/novalang.mdc`, cùng cấp với gateway phát âm
[`05_novalang_pronunciation_profiles.mdc`](../../.cursor/rules/05_novalang_pronunciation_profiles.mdc)
nhưng phạm vi khác: rule đó quản lý *cách đọc*, rule này quản lý *cách viết
tự nhiên và đúng mức trang trọng*. Không rule nào ghi đè rule kia.

Rule chi tiết theo từng ngôn ngữ nằm ở
[`rules/languages/<languageCode>/style-and-register.md`](../languages/README.md)
và chỉ được **bổ sung**, không được mâu thuẫn với yêu cầu cốt lõi ở đây nếu
không có lý do đã được Project Owner duyệt tường minh. A language profile is
not approved merely because its file exists.

## 1. Global default — Mức trang trọng mặc định toàn cục

Mức trang trọng mặc định cho nội dung hướng tới người học trong NovaLang là:

```text
NATURAL_NEUTRAL_POLITE
```

Định nghĩa:

- tự nhiên với một người bản ngữ có học thức;
- lịch sự và phù hợp khi nói với người chưa thân thiết;
- phù hợp giao tiếp đời thường, giáo dục và công việc thông thường;
- không nặng tiếng lóng (slang-heavy);
- không thô lỗ hay quá suồng sã;
- không cổ/cũ (archaic);
- không mang tính nghi lễ (ceremonial);
- không mang giọng luật/hành chính (legalistic);
- không trang trọng một cách giả tạo (artificially formal);
- không phải bản dịch từng-từ-một (word-for-word) của ngôn ngữ nguồn.

**Lịch sự không có nghĩa là trang trọng tối đa.** Diễn đạt tự nhiên của
người bản ngữ được ưu tiên hơn việc sao chép ngữ pháp hay trật tự từ của
ngôn ngữ nguồn, miễn là ý nghĩa, ý định và mức trang trọng (register) được
giữ nguyên.

## 2. Translation priority — Thứ tự ưu tiên khi dịch

Áp dụng đúng thứ tự sau, không được đảo:

1. Frozen specification và approved decision.
2. Intended meaning và pragmatic intent.
3. Tình huống, vai trò và quan hệ người nói.
4. Teaching objective hoặc exact form đang được kiểm tra.
5. Base register và modifiers được chỉ định.
6. Cách diễn đạt tự nhiên trong ngôn ngữ đích.
7. Thông tin ngữ pháp cần giữ cho người học.
8. Ràng buộc UI về độ dài, wrapping và khả năng đọc.
9. Source wording chỉ khi việc giữ nó thực sự phục vụ teaching objective.

**Không ưu tiên trật tự từ theo nghĩa đen hơn ngôn ngữ tự nhiên.** Một bản
dịch không được nghe như dịch máy chỉ vì mọi từ nguồn đều được thể hiện —
đại diện đủ từ không đồng nghĩa với bản dịch đúng.

## 3. Register taxonomy — Taxonomy chuẩn

### Base register — Register nền

Ba base register canonical:

```text
CASUAL
NATURAL_NEUTRAL_POLITE
FORMAL
```

- `CASUAL`: dùng khi quan hệ gần gũi hoặc tình huống đã duyệt cho phép cách
  nói thân mật; không đồng nghĩa với slang.
- `NATURAL_NEUTRAL_POLITE`: baseline mặc định cho giao tiếp hiện đại, lịch sự
  thông thường; không phải formal tối đa.
- `FORMAL`: dùng trong bối cảnh chính thức, nghề nghiệp, học thuật hoặc hành
  chính khi chính bối cảnh yêu cầu.

### Modifiers — Thuộc tính bổ sung

Ba modifier canonical:

```text
HONORIFIC
CEREMONIAL
SLANG
```

- `HONORIFIC`: hệ thống kính trọng/khiêm nhường hoặc cách xưng hô dựa trên
  vai trò xã hội.
- `CEREMONIAL`: ngôn ngữ nghi thức, tuyên bố, lễ nghi hoặc công thức truyền
  thống.
- `SLANG`: từ ngữ mang tính nhóm, vùng, thế hệ hoặc rất thân mật và có thể
  thay đổi theo thời gian.

Modifiers không phải các mức tuyến tính cao hơn hoặc thấp hơn base register.
Một output có thể có một base register và modifier được duyệt khi ngữ cảnh yêu
cầu. Không được suy ra `HONORIFIC > FORMAL`, `CEREMONIAL > HONORIFIC`, hoặc
`SLANG < CASUAL`.

`NATURAL_NEUTRAL_POLITE` chỉ là mặc định khi approved context **không** chỉ
định base register khác. **Không được chuyển toàn bộ hội thoại về cùng một
register** khi quan hệ hoặc mục đích của từng lượt lời yêu cầu khác nhau.

Ví dụ định hướng (không phải danh sách đầy đủ):

- bạn bè và người thân gần gũi: có thể dùng `CASUAL`;
- gặp lần đầu thông thường, dịch vụ hàng ngày: thường dùng
  `NATURAL_NEUTRAL_POLITE`, có thể thêm `HONORIFIC` nếu profile và vai trò yêu
  cầu;
- phỏng vấn, thuyết trình chính thức, thư từ trang trọng: có thể dùng
  `FORMAL`;
- nghi lễ hoặc tuyên bố truyền thống: chỉ thêm `CEREMONIAL` khi được duyệt;
- slang: chỉ thêm `SLANG` khi lesson chủ đích dạy hoặc phản ánh đúng nhóm nói.

Tình huống, mối quan hệ giữa người nói, tuổi tác, vai trò và bối cảnh xã hội
**ghi đè** mức mặc định toàn cục.

## 4. Field-specific behavior — Hành vi theo từng loại trường dữ liệu

**Target-language dialogue** (hội thoại ngôn ngữ mục tiêu):

- phải nghe tự nhiên trong tình huống thực tế đã nêu;
- phải giữ đúng mối quan hệ người nói và mức trang trọng dự định;
- không được trang trọng hóa chỉ vì đây là nội dung giáo dục.

**Target-language text** (từ/câu/ví dụ ngôn ngữ mục tiêu):

- phải đúng ngữ pháp và tự nhiên trong register/modifiers đã duyệt;
- có thể bị kiểm soát để làm nổi bật exact form đang dạy, nhưng không được sai
  ngữ pháp hoặc làm sai pragmatic intent;
- một constraint của exact-form exercise không được biến thành tuyên bố rằng
  mọi cách diễn đạt tự nhiên tương đương đều sai ngoài exercise đó.

**Natural translation** (bản dịch tự nhiên, hiển thị cho người học):

- phải idiomatic (tự nhiên theo lối nói) ở ngôn ngữ đích;
- phải truyền đạt đúng ý định và nghĩa ngữ dụng (pragmatic meaning), không
  chỉ nghĩa từ điển;
- được phép tái cấu trúc câu;
- là bản dịch chính hiển thị cho người học và không được bị làm cứng để mô
  phỏng source word order.

**Literal gloss** (dịch sát nghĩa từng thành phần):

- được phép bám sát ngôn ngữ nguồn hơn;
- phải được đánh dấu rõ ràng là literal gloss;
- phải nằm trong `literalGloss` hoặc trường tương đương đã được phê duyệt;
- không được thay thế bản dịch tự nhiên hiển thị chính cho người học.

**Grammar explanation** (giải thích ngữ pháp):

- phải rõ ràng, tự nhiên, mức trang trọng trung tính-lịch sự
  (`NATURAL_NEUTRAL_POLITE`);
- tránh từ ngữ học thuật hoặc cổ không cần thiết;
- phải giải thích khác biệt về register khi có liên quan.

**UI copy** (chữ giao diện):

- phải ngắn gọn, tự nhiên, tôn trọng người dùng;
- không được nghe mang tính hành chính/quan liêu (bureaucratic);
- không dùng tiếng lóng trừ khi bối cảnh sản phẩm yêu cầu tường minh.

**Exact-form exercise** (bài tập kiểm tra đúng cấu trúc):

- có thể giới hạn đáp án theo teaching objective đã duyệt;
- phải ghi rõ hình thức nào đang được kiểm tra và vì sao;
- không được dùng exact-form requirement để tạo một bản dịch chính cứng hoặc
  để phủ nhận biến thể tự nhiên ngoài phạm vi bài tập;
- không tự thêm schema field trong task kiến trúc này.

**Examples and exercises** (ví dụ và bài tập):

- phải giữ đúng register đang được dạy;
- đáp án không được từ chối một cách diễn đạt tự nhiên khác chỉ vì nó không
  sao chép từng-từ-một, **trừ khi** bài tập kiểm tra đúng một hình thức cụ
  thể (exact form).

## 5. Prohibited output patterns — Mẫu output bị cấm/cần gắn cờ

Gắn cờ hoặc từ chối các mẫu sau:

- calque nghĩa đen mà người bản ngữ không dùng trong giao tiếp thường;
- trật tự từ không tự nhiên sao chép từ ngôn ngữ nguồn;
- dùng dạng đầy đủ cứng nhắc ở nơi lời nói lịch sự thông thường dùng dạng
  rút gọn (contraction);
- từ ngữ cổ hoặc mang tính nghi lễ trong tình huống thông thường;
- giọng điệu pháp lý/hành chính không cần thiết;
- tiếng lóng trong nội dung neutral-polite;
- kính ngữ tự bịa (invented honorific language) không có căn cứ ngôn ngữ
  học thật;
- trộn nhiều mức trang trọng trong cùng một đoạn hội thoại mà không có lý do
  ngữ cảnh;
- coi `HONORIFIC`, `CEREMONIAL` hoặc `SLANG` là một bậc tuyến tính của base
  register;
- thêm ceremonial/slang/honorific chỉ để làm câu nghe “cao cấp” hơn;
- bản dịch giữ đúng nghĩa từ điển nhưng mất ý định ngữ dụng (pragmatic
  intent);
- bản dịch làm thay đổi mức lịch sự, mối quan hệ người nói, hoặc sắc thái
  cảm xúc so với nguồn.

## 6. Example to record — Ví dụ tham chiếu bắt buộc ghi lại

```text
Japanese source:
こんばんは。今日は寒いですね。

Unnatural/stiff English:
Good evening. It is cold today, is it not?

Approved natural neutral-polite English:
Good evening. It's cold today, isn't it?
```

Giải thích:

- `is it not?` đúng ngữ pháp nhưng quá cứng cho một cuộc trò chuyện thông
  thường;
- `isn't it?` giữ đúng chức năng "tìm kiếm sự đồng thuận" (agreement-seeking
  function) của `ですね`;
- dạng rút gọn (contraction) vẫn lịch sự trong tiếng Anh đương đại thông
  thường.

**Không được biến ví dụ tiếng Anh này thành một quy tắc chấm câu hoặc ngữ
pháp phổ quát cho các ngôn ngữ khác.** Ví dụ này minh họa nguyên tắc (ưu
tiên chức năng ngữ dụng hơn hình thức cứng nhắc), không phải một quy tắc
chính tả/ngữ pháp máy móc để áp dụng lại nguyên văn.

## 7. Language-specific profiles — Hồ sơ riêng theo từng ngôn ngữ

Rule chi tiết theo ngôn ngữ nằm ở
`rules/languages/<languageCode>/style-and-register.md`, dùng khung mẫu tại
[`rules/languages/_template/style-and-register.md`](../languages/_template/style-and-register.md).
Mỗi hồ sơ ngôn ngữ đã triển khai có thể định nghĩa:

- mức neutral-polite thông thường của ngôn ngữ đó;
- mức casual;
- mức formal;
- mức honorific (nếu ngôn ngữ có hệ thống kính ngữ);
- đại từ nhân xưng / cách xưng hô;
- hành vi rút gọn (contraction);
- các dấu hiệu lịch sự (politeness markers);
- trợ từ cuối câu (sentence-final particles) nếu có;
- ngôn ngữ phục vụ khách hàng/dịch vụ;
- khác biệt văn viết và văn nói;
- các mẫu dịch nghĩa đen không chấp nhận được.

Mỗi profile bắt buộc có:

- status;
- version;
- reviewer;
- review date;
- provenance;
- unresolved decisions;
- change log.

Profile cũng phải phân biệt tiêu chí cho target-language content, natural
translation/learner support, và UI copy. `APPROVED` chỉ được dùng khi reviewer
và provenance đủ rõ; file tồn tại hoặc có nội dung draft không tạo approval.

Hồ sơ theo ngôn ngữ được phép làm rõ/chi tiết hóa rule toàn cục này nhưng
**không được mâu thuẫn** với yêu cầu naturalness cốt lõi ở trên nếu không có
lý do đã được Project Owner duyệt tường minh.

**Không được tự bịa hồ sơ ngôn ngữ học đầy đủ cho một ngôn ngữ chưa được
nghiên cứu và duyệt.** Với một ngôn ngữ chưa có hồ sơ, báo cáo đúng nguyên
văn:

```text
Language style/register profile not implemented
```

## 8. Release gate and review coverage — Cổng phát hành

Release gate áp dụng cho:

- content mới;
- content được sửa;
- Golden Lesson;
- content chuẩn bị phát hành.

Nội dung cũ không thuộc các nhóm trên được audit hồi tố bằng task riêng; rule
này không tự động sửa hoặc retroactively cấp PASS cho nội dung đó.

Native review coverage:

- Golden Lesson: 100%;
- release-critical content: 100%;
- batch lớn: sampling dựa trên rủi ro, với sampling plan và reviewer được ghi
  lại;
- mọi trường hợp không chắc chắn: `NEEDS_NATIVE_STYLE_REVIEW`.

Release gate không đạt nếu language profile chưa `APPROVED`, deterministic
validation fail, native review bắt buộc chưa hoàn tất, hoặc QA result không gắn
với profile version và content revision.

## 9. Japanese relationship — Quan hệ với Japanese

Rule này liên kết tới thư mục Japanese canonical tại
[`rules/languages/ja/`](../languages/ja/README.md), cụ thể
[`rules/languages/ja/style-and-register.md`](../languages/ja/style-and-register.md).

**Không được thay đổi** rule phát âm hoặc romanization Japanese đã duyệt
(`rules/languages/ja/pronunciation.md`, `romanization.md`,
`grammar-particles.md`). Rule ở đây chỉ quản lý *register/naturalness* của
target text và bản dịch, không quản lý cách đọc.

Nội dung target-language Japanese phải giữ đúng register thật của nó. Ví dụ:

- です／ます không tự động yêu cầu bản dịch trang trọng cứng nhắc;
- trợ từ cuối câu như ね và よ phải được dịch theo chức năng ngữ dụng, không
  máy móc theo từng ký tự;
- 敬語 (kính ngữ) không được làm phẳng thành lời nói trung tính thông thường
  khi mối quan hệ kính ngữ có ý nghĩa trong tình huống;
- tiếng Nhật lịch sự thông thường không được biến thành tiếng Anh, tiếng
  Việt, hay ngôn ngữ đích khác mang tính nghi lễ.

## 10. QA classification — Phân loại kiểm định chất lượng

Naturalness không phải lúc nào cũng xác định được hoàn toàn máy móc
(deterministic). Dùng các phân loại sau:

```text
LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED
FAIL_DETERMINISTIC
NEEDS_NATIVE_STYLE_REVIEW
PASS
```

`FAIL_DETERMINISTIC` áp dụng cho lỗi có thể xác định máy móc, ví dụ:

- sai locale;
- fallback bị cấm (cross-language fallback);
- thiếu bản dịch;
- metadata register được chỉ định tường minh nhưng output mâu thuẫn với nó;
- khớp đúng một fixture đã được xác nhận là cấm (banned exact fixture).

`LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED` áp dụng khi ngôn ngữ chưa có profile
được duyệt. Global baseline có thể định hướng intent nhưng không thay thế bằng
chứng cứ idiomatic của language profile và không đủ để cấp release PASS.

Phát hiện về naturalness mang tính chủ quan, register còn mơ hồ, hoặc review
coverage chưa hoàn tất dùng `NEEDS_NATIVE_STYLE_REVIEW`.

`PASS` chỉ được cấp khi tất cả điều kiện sau đều đúng:

- language profile đã `APPROVED`;
- deterministic validation pass;
- native review bắt buộc đã pass;
- context và teaching objective đã được kiểm tra;
- kết quả được gắn với profile version và content revision cụ thể.

Thứ tự quyết định canonical:

1. thiếu approved profile → `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`;
2. có lỗi xác định máy móc → `FAIL_DETERMINISTIC`;
3. còn review chủ quan hoặc coverage chưa đủ → `NEEDS_NATIVE_STYLE_REVIEW`;
4. chỉ khi mọi gate đạt → `PASS`.

**Không được tự động viết lại nội dung đã duyệt chỉ dựa trên một điểm số
heuristic.** Một phát hiện `NEEDS_NATIVE_STYLE_REVIEW` yêu cầu xác nhận của
người có thẩm quyền ngôn ngữ học/Project Owner trước khi thay đổi nội dung.

Không dùng LLM score, word frequency, translation similarity hoặc heuristic
để tự động cấp `PASS`. Những công cụ đó chỉ có thể tạo finding cần review, và
không được thay thế deterministic validation hoặc native reviewer.

## Required validation checks

- Không nội dung mới nào được coi là "đúng" chỉ vì đại diện đủ từ nguồn
  (word-for-word coverage) — phải đúng ý định và register.
- Mọi thay đổi register phải có lý do ngữ cảnh (tình huống/mối quan hệ/vai
  trò) ghi lại được, không suy đoán.
- Không hồ sơ ngôn ngữ nào được tự bịa nội dung ngôn ngữ học chưa duyệt; báo
  cáo `Language style/register profile not implemented` khi thiếu.
- Không rule ở đây được mâu thuẫn với rule phát âm/romanization đã duyệt của
  bất kỳ ngôn ngữ nào.
- Natural translation và literal gloss phải tách biệt; source-like wording
  không được làm cứng bản dịch chính.
- Mọi `PASS` phải truy được profile version, content revision, deterministic
  validation result và native-review evidence.
- Không bổ sung `registerIntent` hoặc bất kỳ schema field nào từ rule này nếu
  chưa có task/schema approval riêng.
