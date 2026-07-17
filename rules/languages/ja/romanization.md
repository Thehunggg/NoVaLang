# Japanese Romanization

## Subsystem status and standard

```text
status: PASS
standard: Modified Hepburn
runtimeReview: PROJECT_OWNER_REVIEW_COMPLETED
profileFreeze: FROZEN
nativeExpertReview: WAIVED / NOT_COMPLETED
Evidence: JA-EV-ROMAJI-01
```

Implementation dùng Modified Hepburn với macron cho long vowels. Các mapping
đã xác nhận gồm `shi`, `chi`, `tsu`, `fu`, `ji`; syllabic `n` không đổi thành
Traditional-Hepburn `m`; `ei` và `ii` không tự merge; macron không vượt token
boundary tùy ý. Khi tokenizer tách một cụm trợ động từ nhưng canonical spacing
đã xác định các token phải gắn liền (ví dụ `ましょ + う`), pipeline ghép long
vowel trước khi tạo learner-facing output (`mashō`, không phải `mashou`).

Confirmed suite also covers apostrophes for ambiguous syllabic `n`, Japanese
punctuation retention, katakana input and number/counter/suffix binding. An
alternate romanization system is allowed only when the content context names
it explicitly; it must not overwrite canonical learner-facing Modified
Hepburn.

## Input and output contract

Romanization được sinh từ pronunciation reading có token/POS context, không từ
translation và không phải TTS input. Word spacing đi theo confirmed token
grammar: particles thường tách word; connective て/で, suffix/counter,
punctuation và honorific prefix theo binding rules trong executable tests.
Proper noun được analyzer tag phù hợp mới nhận capitalization.

**Evidence: `JA-EV-ROMAJI-01` — `EXISTING_CONFIRMED`.**

## Exact regression examples

```text
町へようこそ → machi e yōkoso
今は東京に住んでいます → ima wa Tōkyō ni sunde imasu
これは何ですか → kore wa nan desu ka
```

Punctuation-bearing asset values retain their punctuation in exact runtime
expectation. `町へようこそ` là generator/test fixture; task documentation này
không dùng nó để claim Q14 runtime visibility.

## Presentation boundary

Romanization là optional learner aid. Nó không thay Japanese target text,
literal kana, pronunciation reading hoặc natural translation. UI show/hide
policy phải theo approved product decision.

Q14 romaji ẩn mặc định và learner có thể bật bằng toggle. Reading và romaji có
hai toggle độc lập. Đây là documentation policy mới, thay thế absolute ban cũ.

```text
DOCUMENTATION_POLICY: UPDATED
Q14_ROMAJI_POLICY: HIDDEN_BY_DEFAULT / USER_TOGGLE_AVAILABLE
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
GOLDEN_LESSON_IMPLEMENTATION: PENDING_CHANGE_CONTROL
ANDROID_MANUAL_VERIFICATION: PASS
WEB_MANUAL_VERIFICATION: PASS
PROJECT_OWNER_REVIEW: COMPLETED
ANDROID_FONT_A_B_DIAGNOSTIC: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
PROJECT_OWNER_ANDROID_VISUAL_REVIEW: COMPLETED
JAPANESE_PUNCTUATION_TYPOGRAPHY: ACCEPTED_AS_FONT_DESIGN
RUNTIME_IMPLEMENTATION: CHANGED_BY_APPROVED_Q14_CHANGE_CONTROL
```

## Aid visibility policy

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

- Basic: shown by default.
- Intermediate: hidden by default, user-toggle available.
- Advanced: not displayed except an approved exception.
- Q14: hidden by default, user-toggle available at A0/A1/A2/B1; B2/C1/C2
  remain hidden without a toggle. Automated implementation and Project Owner
  Android/Web manual verification are complete and `PASS`.

## Owner-approved forms

Exact Q14 generation additionally uses the Project Owner-approved lexical
override below because kuromoji/IPADIC cannot analyze that token reliably:

```text
surfaceToken: スマホ
reading: すまほ
romanization: sumaho
scope: EXACT_JAPANESE_LEXICAL_TOKEN
evidenceType: PROJECT_OWNER_DECISION
status: APPROVED_LEXICAL_OVERRIDE
```

The override is lexical and exact-token only. It does not replace Japanese
source text and is not a line-specific or Flutter runtime override.

**Evidence: `JA-EV-OWNER-04` — `PROJECT_OWNER_DECISION`.**

```text
です → desu
こちらこそ → kochira koso
さようなら → sayōnara
日本 → Nihon
高橋さん → Takahashi-san
```

`Nippon` chỉ dùng cho official name hoặc context yêu cầu. Các quyết định này là
documentation policy; asset/runtime content chỉ đổi qua Change Control riêng.

## Deterministic validation

Validate exact string, raw-kana absence, macron/apostrophe/capitalization,
spacing, punctuation and source-field provenance. Kana-free output alone is a
false PASS. Approved content overrides require stable location, reason and
expected exact output.
