# Japanese Style and Register

## Profile metadata

```text
languageCode: ja
profileVersion: 0.2.0-draft
status: APPROVED / FROZEN
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: SECTION_SCOPED
nativeReview: WAIVED / NOT_COMPLETED
architectureStatus: APPROVED / FROZEN
productPolicyStatus: APPROVED / FROZEN
projectOwnerDecisions: 20/20 APPROVED
projectOwnerClosureReview: COMPLETED
```

File này cụ thể hóa taxonomy từ ADR-016 cho Japanese. Nó không thay
pronunciation/romanization. Project Owner final closure waives native review
for profile closure only; future content release vẫn theo review gate riêng.

## Baseline and taxonomy

Base registers:

- `CASUAL`
- `NATURAL_NEUTRAL_POLITE`
- `FORMAL`

Orthogonal modifiers:

- `HONORIFIC`
- `CEREMONIAL`
- `SLANG`

Modifiers không phải các bậc tuyến tính cao/thấp hơn base register.

**Evidence: `JA-EV-STYLE-01` — `PROJECT_OWNER_DECISION`.**

## NATURAL_NEUTRAL_POLITE

Japanese realization dự kiến dùng mức lịch sự tự nhiên hằng ngày phù hợp vai
trò/quan hệ, thường liên quan です／ます nhưng không được kết luận từ morphology
đơn lẻ. Bản dịch sang ngôn ngữ khác phải giữ pragmatic intent, không tự biến
thành ceremonial wording.

**Evidence:** taxonomy/product behavior là `JA-EV-STYLE-01`; câu Japanese cụ thể
là `JA-EV-STYLE-02 — NEEDS_NATIVE_OR_EXPERT_REVIEW`.

## CASUAL and FORMAL

- `CASUAL` chỉ dùng khi context xác nhận closeness, persona hoặc communicative
  intent; plain form không tự đồng nghĩa slang.
- `FORMAL` dùng khi situation/genre yêu cầu formal wording; formal không tự
  đồng nghĩa honorific.

Mọi realization cụ thể, contraction hoặc omission phải qua Japanese native
style review; không suy ra age/gender/relationship từ stereotype.

**Evidence: `JA-EV-STYLE-01`, `JA-EV-STYLE-02`.**

## HONORIFIC

Keigo choice phải giữ role, relationship và hướng tôn trọng/khiêm nhường; không
làm phẳng service/workplace context thành neutral wording. Recognized keigo
categories và guidance đến từ Agency for Cultural Affairs, nhưng lựa chọn câu
cụ thể vẫn cần native/keigo expert.

**Evidence: `JA-EV-KEIGO-01` — `AUTHORITATIVE_SOURCE_BACKED`; expert review
required.**

## CEREMONIAL and SLANG

Ceremonial và slang đều opt-in. Mỗi use phải có explicit context, provenance,
review date và native/expert review. Slang còn phải ghi region/user group/tone.
Profile chưa có approved inventory/fixture; không tự phát minh hoặc dùng corpus
frequency làm approval.

**Evidence: `JA-EV-OWNER-05` — `PROJECT_OWNER_DECISION`; realization remains
`NEEDS_NATIVE_OR_EXPERT_REVIEW`.**

## Address, pronouns and persona

Không tự động chọn pronoun, title, suffix hoặc gendered/persona form nếu
context không xác nhận. Không tự dịch さん thành một title cố định ở ngôn ngữ
khác. Address form và omission phải được review cùng relationship/role.

**Evidence classification: `JA-EV-STYLE-02 — NEEDS_NATIVE_OR_EXPERT_REVIEW`.**

## Contractions and sentence-final particles

Spoken contractions, ellipsis và forms như ね/よ/か phải được hiểu theo
pragmatic context. Không map ね thành một tag question cố định, không map よ
thành exclamation mặc định, và không dùng casual contraction chỉ để làm câu
“nghe tự nhiên” khi register không cho phép.

**Evidence: product translation boundary `JA-EV-NATURAL-01`; Japanese
realization `JA-EV-STYLE-02 — NEEDS_NATIVE_OR_EXPERT_REVIEW`.**

## Spoken, written, service and workplace language

Genre/channel phải được khai báo trong review context. Spoken wording không tự
thay written wording; service/workplace wording phải rõ role và không áp keigo
máy móc. Agency keigo guidance cung cấp framework, còn từng utterance cần
native review.

**Evidence: `JA-EV-KEIGO-01`, `JA-EV-STYLE-02`.**

## Output-specific criteria

### Target-language content

Giữ intended meaning, context, teaching objective, base register và modifiers.
Japanese naturalness bắt buộc native review theo release gate.

### Natural translation and learner support

Primary translation truyền meaning/pragmatic intent tự nhiên. Literal Japanese
structure phải ở literal gloss hoặc field tương đương đã phê duyệt.

### UI copy

Japanese UI copy theo `uiLanguageCode`: ngắn, hiện đại,
`NATURAL_NEUTRAL_POLITE`, và dùng direct button labels như `戻る`, `続ける`.
Không ép mọi UI string thành câu đầy đủ です／ます. UI được review riêng với
target-language lesson text.

### Japanese learner support

Japanese grammar explanations, hints và feedback dùng です／ます, rõ ràng và
thân thiện. Product style đã được quyết định; natural realization vẫn cần
native/pedagogy review.

### Exact-form exercise

Có thể giữ structure hơi không tự nhiên chỉ khi exact form là approved teaching
objective và scope được ghi rõ; exception không lan sang primary translation.

**Evidence: `JA-EV-NATURAL-01` — `PROJECT_OWNER_DECISION`; actual Japanese
wording remains native-review gated.**

UI/support product style additionally uses `JA-EV-OWNER-05`.

This same gate applies when Japanese is learning language, native/support
language, UI language or output translation language. Translation from
Japanese preserves pragmatic intent in the destination; translation into
Japanese reconstructs natural register, omission and address rather than
copying source structure.

## Humble language and keigo boundary

Humble/respectful realization belongs to the HONORIFIC modifier and must be
reviewed with actor/beneficiary/status relationships. It is not inferred from
FORMAL alone, and neutral-polite です／ます is not sufficient evidence that a
keigo relation has been preserved.

**Evidence: `JA-EV-KEIGO-01`; expert review required.**

## Provenance

- Taxonomy/naturalness priority: ADR-016 and global content rule.
- Keigo framework: Agency for Cultural Affairs keigo guidance.
- Japanese education context: JF Standard/Irodori.
- Usage investigation: NINJAL BCCWJ, evidence only.

## Unresolved decisions

- Native reviewer chưa được chỉ định.
- Ceremonial/slang fixtures chưa được native/expert review.
- Pronoun/address/contraction inventories chưa được expert-reviewed.
- Golden/release-critical Japanese content chưa được audit theo profile này.

Không còn Japanese product-policy question nào trong closure scope chưa được
trả lời. Architecture/product policy đã được Project Owner phê duyệt và frozen;
full linguistic profile đã được Project Owner `APPROVED / FROZEN`. Native
expert review là `WAIVED / NOT_COMPLETED`, không phải completed; các future
content fixtures vẫn cần review theo release gate tương ứng.
