# English Style and Register Profile

Profile này chi tiết hóa
[`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
theo kiến trúc của
[`ADR-016`](../../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture).
Global rule vẫn có quyền ưu tiên; file này không tạo schema field và không cho
phép tự động sửa nội dung hiện có.

## Profile metadata

```text
languageCode: en
canonicalEnglish: General International English
baselineSpellingAndPunctuation: en-US
status: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
version: 0.1.0-draft
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: SECTION_LEVEL_REFERENCES_RECORDED
unresolvedDecisions: NATIVE_REVIEWER_AND_REVIEW_DATE_NOT_ASSIGNED
```

AI không được ghi là native reviewer. Profile này chưa được native review và
chưa đủ điều kiện `APPROVED` hoặc release `PASS`.

## Scope

Profile áp dụng riêng, với tiêu chí tách biệt, cho:

- **target English content**: từ, câu, hội thoại, ví dụ và bài tập khi English là
  learning language;
- **English natural translation and learner support**: translation, meaning,
  hint, feedback và grammar explanation;
- **English UI copy**: app chrome, button, title, status, instruction và
  empty/error state.

Profile không quản lý pronunciation, curriculum, lesson format, schema hay
stable ID. Nó không cho phép audit hoặc sửa Golden Lesson nếu không có task
riêng được Project Owner phê duyệt.

## NATURAL_NEUTRAL_POLITE

Baseline English của NovaLang là contemporary General International English,
dùng en-US spelling và punctuation nhất quán. Output phải:

- tự nhiên với người dùng English hiện đại có học thức;
- lịch sự với người chưa thân, đồng nghiệp, giáo viên, người học, khách hàng và
  nhân viên dịch vụ trong tình huống thông thường;
- rõ ràng, trực tiếp nhưng không thô hoặc áp đặt;
- ưu tiên idiomatic collocation và English information structure;
- cho phép contractions thông dụng khi chúng làm câu tự nhiên hơn;
- tránh slang, ceremonial wording, legalistic wording và excessive deference
  nếu context không yêu cầu;
- không trở nên cứng chỉ để mô phỏng word order hoặc full forms của source.

`Hi` thuộc `NATURAL_NEUTRAL_POLITE` trong UI và workplace hiện đại. Không dùng
`Hi` làm mặc định trong bối cảnh nghi lễ hoặc rất trang trọng.

Ví dụ ordinary modern small talk:

```text
Preferred: Good evening. It's cold today, isn't it?
Flag in this context: Good evening. It is cold today, is it not?
```

Câu thứ hai đúng ngữ pháp nhưng full forms và `is it not?` tạo sắc thái formal,
rhetorical hoặc emphatic không phù hợp với ordinary small talk. Câu đó vẫn có
thể hợp lệ trong ceremonial/formal writing, lời thoại có chủ ý, emphasis hoặc
exact-form exercise. Vì vậy contraction không phải luật tuyệt đối và fixture
không được cấm câu đó ngoài context đã ghi.

## CASUAL

`CASUAL` dùng khi quan hệ gần gũi hoặc context đã xác nhận cho phép:

- contractions, ellipsis và conversational discourse markers được dùng khi tự
  nhiên;
- `Hi`, `Thanks`, `Bye` và `See you` có thể phù hợp;
- câu có thể ngắn và trực tiếp hơn baseline;
- không tự động thêm slang, profanity hoặc intimacy chưa được context xác nhận.

`CASUAL` không đồng nghĩa với `SLANG`.

## FORMAL

`FORMAL` dùng khi chính context yêu cầu, chẳng hạn academic writing, legal
copy, official correspondence, formal presentation hoặc high-stakes record:

- cấu trúc đầy đủ và full forms có thể được ưu tiên;
- terminology và logical relationship phải chính xác;
- vẫn phải dùng clear modern English, không cổ hóa hoặc quan liêu hóa giả tạo;
- không suy ra mọi written English đều `FORMAL`, cũng không suy ra mọi spoken
  English đều casual.

## HONORIFIC modifier

English không có một hệ thống honorific grammar rộng tương đương Japanese.
`HONORIFIC` trong profile này chỉ là modifier giới hạn cho title, role và form
of address có căn cứ.

- Không tự động thêm `Mr`, `Ms`, `sir` hoặc `madam`.
- Chỉ dùng khi context, role hoặc preferred form of address đã được xác nhận.
- Không tự động chuyển Japanese `さん` thành `Mr` hoặc `Ms`.
- Không suy ra `HONORIFIC` cao hơn `FORMAL` trên một thang tuyến tính.

## CEREMONIAL modifier

`CEREMONIAL` chỉ dùng cho wording nghi lễ, tuyên thệ, tưởng niệm, tuyên bố
truyền thống hoặc công thức đã được context/phê duyệt xác nhận. Modifier này:

- không phải phiên bản “cao hơn” của `FORMAL`;
- có thể giữ formulaic hoặc full-form wording khi chính nghi thức yêu cầu;
- không được đưa vào UI, workplace hoặc customer service thông thường để tạo
  cảm giác trang trọng giả tạo.

## SLANG modifier

`SLANG` là opt-in only. Mỗi usage bắt buộc ghi:

- region;
- user group;
- tone;
- review date.

Slang phải được review lại ít nhất mỗi 12 tháng. Nếu provenance hoặc current
usage không chắc chắn, kết quả là `NEEDS_NATIVE_STYLE_REVIEW`; không dùng slang
làm baseline và không xem nó là mức thấp hơn `CASUAL`.

## Contractions

Contractions được phép và thường được ưu tiên khi tự nhiên trong:

- spoken English;
- UI copy;
- learner-support thông thường;
- workplace English hiện đại;
- customer-service English hiện đại.

Các dạng phổ biến gồm `I'm`, `it's`, `don't`, `isn't`, `can't`, `we're` và
`I'll`. Không ép mọi câu phải contract. Full forms có thể phù hợp hoặc cần thiết
trong:

- exact-form exercise;
- emphasis hoặc contrast;
- academic, legal hoặc ceremonial text;
- context rất formal;
- trường hợp contraction gây mơ hồ hoặc cản trở mục tiêu học.

Không dùng contraction gượng chỉ để rút ngắn UI. Spelling phải phân biệt
`it's` (`it is`/`it has`) với possessive `its`.

## Ambiguous contractions

`I'd`, `they'd`, `he'd`, `she'd` và các dạng tương tự chỉ dùng khi context làm
rõ nghĩa (`had` hay `would`). Nếu learner có thể hiểu nhầm:

- dùng full form; hoặc
- giữ contraction nhưng cung cấp explanation phù hợp với teaching objective.

Ambiguity không được giải quyết bằng cách đoán từ source wording.

## Spoken versus written English

**Spoken English** có thể dùng contractions, ellipsis, discourse markers và
câu ngắn hơn khi tự nhiên. Không tự thêm filler như `um`, `like` hoặc `you know`
trừ khi lesson chủ đích dạy hoặc phản ánh chúng.

**Written English** phụ thuộc audience và purpose:

- UI, chat, email thông thường và learner support có thể dùng contractions;
- academic, legal, ceremonial hoặc official record có thể dùng full forms;
- spelling/punctuation theo en-US baseline, trừ khi content được phê duyệt rõ
  là một regional variant khác;
- medium không tự quyết định register.

## Greetings and farewells

- `Hi` và `Hello` có thể là neutral-polite trong UI/workplace hiện đại.
- `Good morning`, `Good afternoon` và `Good evening` phù hợp neutral-polite khi
  time/context đúng.
- `Hi` không phải mặc định cho ceremonial hoặc very formal context.
- `Good night` dùng khi chia tay cuối ngày hoặc trước khi ngủ, không mặc định là
  greeting buổi tối.
- `Goodbye`, `Bye`, `See you` và `Have a good day` phải theo relationship và
  context, không thay thế máy móc cho mọi Japanese farewell.

## Thanks and apologies

- `Thank you` là lựa chọn neutral-polite an toàn; `Thanks` có thể casual hoặc
  neutral tùy context.
- `I'm sorry` phù hợp apology thông thường; `Sorry` hoặc `Excuse me` có thể phù
  hợp attention-getting hoặc minor inconvenience.
- `I apologize` mang sắc thái formal/stronger và không thay máy móc cho mọi
  `すみません`.
- Cường độ lời cảm ơn/xin lỗi phải giữ pragmatic intent, không chỉ nghĩa từ
  điển.

## Requests, offers and questions

- `Can you ...?` thường tự nhiên và trực tiếp hơn.
- `Could you ...?` thường mềm/lịch sự hơn, nhưng không tự động là lựa chọn duy
  nhất.
- `Would you ...?` dùng khi function và context phù hợp.
- `Would you like ...?` dùng cho offer/invitation, không thay bằng `Do you like
  ...?` nếu đang đưa ra một offer cụ thể.
- `May I ...?` có thể phù hợp với permission formal hơn.
- `please` phải được đặt theo tone dự kiến; không chèn máy móc vào mọi request.
- Tránh overly deferential wording như `Would you be so kind as to ...` trong
  ordinary neutral-polite interaction nếu context không yêu cầu.

Tag questions chỉ dùng khi phù hợp pragmatic context:

- không tự động dịch Japanese `ね` thành `isn't it?`;
- `right?`, direct confirmation hoặc không dùng tag đều có thể hợp lệ;
- auxiliary, polarity, pronoun và intonation/function phải đúng;
- tag question là teaching objective riêng, không phải translation default.

## Customer-service and workplace English

Chưa tách US/UK. Dùng General International English với en-US baseline:

- polite, clear và action-oriented;
- dùng active voice khi nó làm trách nhiệm/hành động rõ hơn;
- contractions được phép và thường tự nhiên, nhưng không bắt buộc;
- điều chỉnh directness theo role, power relationship và urgency;
- tránh excessive deference, passive voice không cần thiết, `kindly` máy móc và
  `sir`/`madam` máy móc;
- không dùng title nếu preferred form of address chưa được xác nhận.

## Forms of address

- Dùng preferred name/form of address nếu đã được xác nhận.
- First name có thể phù hợp trong modern workplace nhưng không được suy đoán khi
  context không đủ.
- `Mr`, `Ms`, `Dr`, `Professor` và role title chỉ dùng khi identity/role/context
  xác nhận.
- Không tự suy đoán marital status, gender hoặc title.
- Không dịch Japanese name suffix theo bảng thay thế cố định.

## Japanese-to-English translation traps

Các pattern sau phải được gắn cờ hoặc đưa native review, tùy fixture/context:

- `です／ます` không tự động yêu cầu English full forms hoặc stiff formality;
- `ね` có thể biểu thị agreement-seeking, shared stance, acknowledgement hoặc
  softening, không luôn là một tag question;
- `よ` không tự động trở thành `you know` hoặc dấu chấm than;
- `すみません` có thể là `Excuse me`, `Sorry` hoặc lời cảm ơn mang sắc thái
  indebtedness tùy context;
- `よろしくお願いします` không có một translation English cố định; tránh `Please
  take care of me` khi pragmatic context không hỗ trợ;
- `お疲れさまです` không máy móc thành `You must be tired`;
- `さん` không tự động thành `Mr`/`Ms`;
- Japanese omitted subjects không cho phép tự đoán pronoun, gender hoặc speaker;
- topic marker `は` không mặc định dịch thành `As for ...`;
- Japanese word order không được giữ nếu làm English không tự nhiên;
- politeness phải được chuyển theo pragmatic function, không theo số lượng từ
  formal tương ứng.

Natural translation là bản chính. Literal structure chỉ được đặt trong
`literalGloss` hoặc trường tương đương đã được phê duyệt.

## Target English content criteria

- Grammar, collocation, information structure và register phải tự nhiên trong
  approved context.
- Controlled language cho learner level không được tạo câu sai hoặc thay đổi
  pragmatic intent.
- Dialogue không được formal hóa chỉ vì là educational content.
- Exact teaching form phải được tách khỏi tuyên bố về các biến thể tự nhiên bên
  ngoài exercise.

## Natural translation and learner-support criteria

- Bản dịch chính phải idiomatic và giữ intended/pragmatic meaning.
- Có thể tái cấu trúc source để tạo English tự nhiên.
- Explanation/hint/feedback dùng clear neutral-polite English và giải thích
  register khi liên quan.
- Không biến literal gloss thành learner-facing translation chính.
- Ambiguous source phải chuyển sang `NEEDS_NATIVE_STYLE_REVIEW`, không được đoán.

## UI copy criteria

- Ngắn gọn, natural, respectful và action-oriented.
- `Hi` và common contractions được phép trong modern UI.
- Không dùng bureaucratic/legalistic wording, slang hoặc excessive deference
  nếu product context không yêu cầu.
- Không tạo awkward contraction chỉ để giảm độ dài.
- UI constraints không được làm sai meaning hoặc register.

## Pedagogical exceptions

Có thể giữ full form hoặc controlled structure khi exact teaching objective
yêu cầu, ví dụ dạy auxiliary, negation, contraction expansion hoặc question-tag
formation. Mỗi exception phải:

- ghi form đang được kiểm tra và lý do;
- giới hạn constraint trong đúng exercise/field;
- không làm cứng natural translation chính;
- không tuyên bố biến thể tự nhiên khác là sai ngoài exact-form task;
- không tự thêm schema field.

## Deterministic fixtures

`FAIL_DETERMINISTIC` áp dụng khi máy có thể xác nhận một trong các lỗi sau:

- locale sai, cross-language fallback, missing/empty English value;
- thiếu metadata/profile version/content revision/review evidence bắt buộc;
- status `PASS` khi profile chưa `APPROVED`;
- `it's` được dùng thay possessive `its` trong fixture có meaning xác định;
- question tag sai auxiliary, polarity hoặc pronoun trong fixture không mơ hồ;
- exact-form answer không khớp approved teaching form;
- output khớp banned exact fixture đã được phê duyệt với cùng context.

Required contextual fixture:

```text
context: ordinary modern weather small talk
baseRegister: NATURAL_NEUTRAL_POLITE
flagExact: Good evening. It is cold today, is it not?
preferredExact: Good evening. It's cold today, isn't it?
```

`flagExact` không phải global ban; trong formal, rhetorical, emphatic,
ceremonial hoặc exact-form context nó có thể hợp lệ.

## Native-review fixtures and coverage

Human native-style review bắt buộc cho:

- greeting/farewell và mức thân mật theo context;
- apology/thanks strength;
- tag-question pragmatic function và intonation intent;
- title, preferred address, `sir`/`madam`;
- customer-service/workplace tone và power relationship;
- slang/current regional usage;
- Japanese `ね`, `よ`, `すみません`, `よろしくお願いします`, `お疲れさまです` và name
  suffixes khi dịch sang English;
- UI brevity khi có nhiều wording tự nhiên nhưng khác tone;
- mọi ambiguity chưa được deterministic fixture giải quyết.

Coverage policy đã được Project Owner phê duyệt:

- Golden Lesson: 100%;
- release-critical content: 100%;
- high-risk batch: tối thiểu 25%;
- normal batch: tối thiểu 10%;
- approved repeated templates: 5%;
- nếu sample phát hiện lỗi hệ thống, mở rộng review toàn batch.

Task này không audit Golden Lesson và không ghi native review là hoàn thành.

Canonical QA order:

1. profile chưa `APPROVED` → `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`;
2. deterministic validation fail → `FAIL_DETERMINISTIC`;
3. subjective review hoặc required coverage chưa đủ →
   `NEEDS_NATIVE_STYLE_REVIEW`;
4. chỉ khi approved profile, deterministic checks, required native review,
   context/teaching objective, profile version và content revision đều được xác
   nhận → `PASS`.

LLM score, word frequency, translation similarity và heuristic không được tự
động cấp `PASS`.

## Unresolved decisions

- Human native English reviewer: `NOT_ASSIGNED`.
- Bilingual Japanese-English reviewer: `NOT_ASSIGNED`.
- Product English/UI reviewer: `NOT_ASSIGNED`.
- First native review date: `NOT_REVIEWED`.
- Profile promotion from `0.1.0-draft` to an approved version: pending reviewer
  evidence and Project Owner approval.

Không còn unresolved decision về canonical variety, en-US baseline, `Hi`,
titles/address, contractions, tag questions, slang cadence, customer-service
variant hoặc sampling percentages; các mục đó đã được Project Owner quyết định
trong task này.

## Source / provenance

| Section | Provenance |
|---|---|
| Architecture, taxonomy, QA and release gate | [ADR-016](../../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture), [global rule](../../content/naturalness-and-register.md), Project Owner decisions for `NOVALANG-ENGLISH-STYLE-PROFILE-IMPLEMENTATION-01` |
| Contractions and full forms | [Cambridge Grammar — Contractions](https://dictionary.cambridge.org/grammar/british-grammar/contractions), [Cambridge Grammar — Not](https://dictionary.cambridge.org/grammar/british-grammar/not), [Microsoft Writing Style](https://learn.microsoft.com/en-us/windows/apps/design/style/writing-style) |
| Register and spoken/written distinction | [Cambridge Grammar — Formal and informal language](https://dictionary.cambridge.org/grammar/british-grammar/formal-and-), [Cambridge Grammar — Spoken English](https://dictionary.cambridge.org/grammar/british-grammar/spoken-english) |
| Tag questions | [Cambridge Grammar — Tags](https://dictionary.cambridge.org/grammar/british-grammar/question-tags) |
| Greetings/farewells | [Cambridge Grammar — Greetings and farewells](https://dictionary.cambridge.org/grammar/british-grammar/greetings-) |
| Requests/offers/politeness | [Cambridge Grammar — Requests](https://dictionary.cambridge.org/grammar/british-grammar/requests), [Cambridge Grammar — Politeness](https://dictionary.cambridge.org/grammar/british-grammar/politeness) |
| Names and forms of address | [Cambridge Grammar — Names and titles](https://dictionary.cambridge.org/grammar/british-grammar/names-and-titles-addressing-people) |
| Sociolinguistic appropriateness and mediation | [Council of Europe — CEFR Companion Volume](https://www.coe.int/en/web/common-european-framework-reference-languages) |
| Japanese-to-English traps | Global naturalness rule, canonical Japanese [style profile](../ja/style-and-register.md), and Project Owner-approved decisions in this task; native bilingual evidence remains required before approval |

External references provide provenance, not native-review completion. Nếu một
reference URL hoặc wording thay đổi, profile phải được reviewed trước khi cập
nhật rule.

## Change log

- `2026-07-16` — `0.1.0-draft` — Codex documented Project Owner-approved
  General International English/en-US baseline, register/modifier behavior,
  contraction and tag policies, address boundaries, Japanese-to-English traps,
  sampling requirements and QA fixtures. Reviewer remains `NOT_ASSIGNED`;
  status remains `DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN`. No
  curriculum, translation, schema, source code or Golden Lesson content was
  changed.
