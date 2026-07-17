# Japanese Test Fixtures

## Executable confirmed suite

Canonical pronunciation suite được chạy bằng
`npm run test:japanese-pronunciation` và bảo vệ complete expected strings.
Repository test/command là authority thực tế; tài liệu này không thay expected
output.

**Evidence: `JA-EV-RUNTIME-01`, `JA-EV-ROMAJI-01` —
`EXISTING_CONFIRMED`.**

Coverage bắt buộc gồm particle-vs-lexical は/へ/を, spacing, macrons, proper-name
capitalization, 拗音, small っ, syllabic ん, katakana, punctuation,
numbers/counters/suffixes và failure cho unmapped/ambiguous input.

Q14 closure fixtures additionally protect:

```text
スマホ → sumaho
留学生なんですね → ryūgakusei nan desu ne
行きましょうか → ikimashō ka
佐藤さん → Satō-san
田中さん → Tanaka-san
```

`スマホ` is the exact Project Owner-approved lexical override; the remaining
outputs exercise canonical systemic spacing, macron and name-suffix rules.

## Exact closure fixtures

```text
町へようこそ → machi e yōkoso
今は東京に住んでいます → ima wa Tōkyō ni sunde imasu
これは何ですか → kore wa nan desu ka
```

`町へようこそ` chỉ là exact generator/test fixture. Q14 documentation now allows
romaji hidden by default with a user toggle at A0–B1. Q14 generated-romaji
runtime implementation is complete under approved Change Control; Project
Owner Android/Web verification is `PASS`.

## Owner-approved romanization fixtures

```text
です → desu
こちらこそ → kochira koso
さようなら → sayōnara
日本 → Nihon
日本 (official-name/context override) → Nippon
高橋さん → Takahashi-san
```

**Evidence: `JA-EV-OWNER-04` — `PROJECT_OWNER_DECISION`.** These are policy
fixtures; executable asset/runtime updates require separate Change Control.

## Documentation review fixtures

Các case sau là review prompts, không phải executable PASS fixtures cho tới khi
native/expert reviewer ghi expected output, context và evidence:

- same meaning across CASUAL / NATURAL_NEUTRAL_POLITE / FORMAL;
- service utterance với HONORIFIC modifier;
- ね/よ translation trong hai pragmatic contexts;
- pronoun/address omission versus explicit form;
- spoken contraction versus written form;
- natural translation versus literal gloss;
- furigana/romaji aid at different learner stages.

**Evidence classification: `NEEDS_NATIVE_OR_EXPERT_REVIEW` (`JA-EV-STYLE-02`,
`JA-EV-PEDAGOGY-02`).**

## Required fixture coverage matrix

Each row must eventually include a PASS candidate, `FAIL_DETERMINISTIC`
candidate, `NEEDS_NATIVE_STYLE_REVIEW` candidate, context-bound fixture,
accepted-variant fixture and false-positive prevention fixture. Until reviewed,
the row is a required catalog, not fabricated expected Japanese.

| Group | Required evidence surface | Current status |
|---|---|---|
| Writing system / orthography | scripts, width, punctuation, spelling and variants | REVIEW_REQUIRED |
| Reading / reading-aid fading | literal reading, furigana, multi-reading and accessibility | PRODUCT POLICY DOCUMENTED / IMPLEMENTATION REVIEW REQUIRED |
| Pronunciation / romanization / particles | exact pipeline cases and fail-loud uncertainty | EXECUTABLE CONFIRMED for existing suite |
| Grammar / usage | context, natural omission, exact versus natural variant | REVIEW_REQUIRED |
| Vocabulary presentation | surface, reading, meaning, example, register and audio | REVIEW_REQUIRED |
| Answers | exact, meaning-equivalent, accepted variants and open escalation | PRODUCT POLICY DOCUMENTED / FIXTURES REVIEW REQUIRED |
| Correction / feedback | deterministic versus grammar/register/naturalness issue | PRODUCT POLICY DOCUMENTED / NATIVE REVIEW REQUIRED |
| Japanese UI | locale purity, tone, overflow-independent wording | NATIVE REVIEW REQUIRED |
| Japanese support language | explanation/hint/feedback naturalness | NATIVE/PEDAGOGY REVIEW REQUIRED |
| Translation from Japanese | pragmatic intent and no pair-wide ban | DESTINATION PROFILE + REVIEW REQUIRED |
| Translation into Japanese | grammar, omission, register and orthography | JAPANESE NATIVE REVIEW REQUIRED |
| Literal gloss | separate from natural translation | FIELD CHECK REQUIRED |
| TTS/audio | field precedence, locale, ambiguity and no romaji input | PARTIAL DETERMINISTIC / RUNTIME REVIEW |
| Fallback/language purity | no silent English/cross-language substitution | DETERMINISTIC REQUIRED |
| Register/keigo/ceremonial/slang | context and modifier realization | PRODUCT POLICY DOCUMENTED / NATIVE REVIEW REQUIRED |

No fixture may turn a pair-specific translation example into a global ban.

## Candidate matrix by group

Các candidate dưới đây định nghĩa loại bằng chứng phải tạo, không tự phê duyệt
Japanese output chưa được review.

| Group | PASS candidate | FAIL_DETERMINISTIC candidate | Native-review candidate | Context-bound candidate | Accepted-variant candidate | False-positive prevention |
|---|---|---|---|---|---|---|
| Writing system | approved script/form matches exact fixture | required Japanese field replaced by romaji | mixed-script name without authority | Latin acronym allowed only in named UI/content context | approved width/script alternative | kana-only form is not auto-wrong |
| Orthography | approved modern spelling exact match | fixture punctuation/okurigana drift | two sourced common variants | historical spelling in historical content | approved kana/kanji pair | common variant not rejected by one reference |
| Reading | confirmed literal kana preserved | particle spelling mutated in literal reading | unsourced name/jukujikun reading | counter reading with explicit sentence | reviewed multiple reading | surface kanji alone does not select trusted reading |
| Pronunciation | executable exact reading fixture | analyzer failure silently accepted | regional/devoicing/pitch case | connected-speech case with channel | reviewed regional realization | automated score alone cannot PASS |
| Romanization | three exact closure strings | kana leak/macron/spacing mismatch | owner-pending name form | explicit alternate-system context | approved content override | kana-free output alone cannot PASS |
| Particles | POS-tagged は/へ/を exact output | character-only replacement | ambiguous POS token | particle versus lexical minimal context | approved analyzer override | lexical character not treated as particle |
| Grammar/usage | sourced form in specified context | required exact form malformed | formally possible but unnatural output | same form across role/register contexts | native-approved natural alternative | source-order similarity cannot PASS |
| Vocabulary presentation | all approved fields stay separated | surface/reading/meaning crossed | collocation/register naturalness | proper noun with source context | approved reading/spelling pair | duplicate surface is not duplicate knowledge by itself |
| Reading-aid fading | Basic shown, Intermediate hidden/toggle, Advanced exception-only | aid replaces target text or violates level/Q14 limits | accessibility exception | same item at approved levels | furigana/kana aid approved alternatives | independent reading/romaji toggles remain independent |
| Exact-form answers | exact approved form matches | required target form absent | natural alternative outside objective | fixture names exact teaching objective | explicitly accepted spelling variant | exact-form rule does not globalize |
| Meaning-equivalent answers | pre-approved semantic variant | language/field mismatch | uncertain open answer escalates | role/relationship changes acceptance | native-reviewed paraphrase | string inequality is not automatic FAIL |
| Open answers | reviewed answer linked to revision | empty/invalid-language answer | all natural free production | prompt/context captured | multiple native-reviewed answers | LLM similarity cannot auto-PASS |
| Correction/feedback | minor typo gets light typo feedback without PASS | typo incorrectly granted PASS | naturalness/register explanation | register target versus warning context | approved variant not overcorrected | typo is not a total grammar failure |
| Japanese UI | approved ja key/value rendered | English silent fallback | tone/compactness review | action and screen named | approved synonymous label | target Japanese is not UI leakage |
| Japanese support language | approved Japanese explanation | support text overwrites target | pedagogy/tone review | learner level and target item stated | reviewed explanation variant | literal gloss not primary explanation |
| Translation from Japanese | destination-natural meaning preserved | omitted required meaning | pragmatic/register transfer | source role and destination profile stated | destination-native alternatives | one pair example is not a global ban |
| Translation into Japanese | native-approved grammar/register | source-language token leaked | omission/address/keigo choice | speaker relationship and channel stated | Japanese natural variants | word-order similarity cannot auto-PASS |
| Literal gloss | stored/displayed in gloss role | gloss used as natural translation | gloss granularity review | exact teaching explanation | approved notation alternative | awkward gloss does not condemn natural translation |
| TTS/audio | approved audio, then correct-locale TTS; 1.0x/0.75x; no autoplay | romanization/wrong locale/silent fallback | voice/pronunciation quality | engine/voice/platform named | approved speech override | successful playback is not linguistic PASS |
| Fallback/language purity | same-locale value exists | silent cross-language fallback | proper-noun allowlist review | approved brand/acronym context | same-locale embedded source | shared acronym is not leakage by itself |
| Register/keigo | native-approved role/register form | declared register metadata missing | all contextual realization | same intent across base/modifier combinations | reviewed natural variants | です／ます alone does not prove full register |
| Ceremonial/slang | only future approved fixture | missing required region/tone metadata | every proposed realization | event/region/group/date specified | reviewed time-bound alternative | corpus frequency cannot auto-PASS |

## Fixture record requirements

Mỗi fixture mới phải ghi: stable fixture ID, input fields, context, teaching
objective, expected exact output hoặc review question, evidence ID, profile
version, content revision, reviewer role/date và status. AI không được điền
native-review completion.

## Q14 implementation fixture status

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
