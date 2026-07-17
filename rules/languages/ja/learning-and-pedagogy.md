# Japanese Learning and Pedagogy

## Status and scope

```text
status: APPROVED / FROZEN
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
projectOwnerReview: COMPLETED
nativeExpertReview: WAIVED / NOT_COMPLETED
```

File này mô tả framework có bằng chứng và tách riêng NovaLang product-policy
gaps. Nó không thiết kế lại curriculum hoặc lesson.

## Can-do and task orientation

Japanese learning objectives có thể được mô tả bằng việc learner làm được gì
trong communicative situation, kết hợp language knowledge với communication
activities. Listening, speaking, reading và writing cần được gắn với task và
context thay vì chỉ kiểm tra form tách rời.

**Evidence: `JA-EV-PEDAGOGY-01` — `AUTHORITATIVE_SOURCE_BACKED`. Sources: JF
Standard, Irodori overview/teaching guides. Japanese pedagogy adaptation review
required.**

## Skill objectives

Reading, listening, speaking, writing, vocabulary, grammar and conversation
objectives must name a learner action/context and required evidence. A form-only
objective may be used for explicit practice but cannot silently stand in for a
communicative Can-do.

**Evidence: `JA-EV-PEDAGOGY-01`; NovaLang mapping requires pedagogy review.**

## Learner progression

Progression must link an approved Can-do/content objective to demonstrated
learner needs. Owner-approved romaji behavior is:

- Basic: shown by default.
- Intermediate: hidden by default, learner may enable it.
- Advanced: not displayed except an approved exception.

Furigana defaults to kanji not yet learned/mastered; learner may enable all
furigana. Reading and romaji toggles are independent and remain constrained by
level/Q14 policy.

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

## Vocabulary presentation contract

Vocabulary design must consider surface form, reading, natural meaning,
example, collocation, register, audio, recycling, duplicate-knowledge handling
and proper nouns. Field separation is mandatory; exact selection, recycling
frequency and duplicate policy remain curriculum/product decisions.

**Evidence:** fields `JA-EV-RUNTIME-01`; selection/recycling
`JA-EV-PEDAGOGY-02 — UNRESOLVED`.

## Grammar teaching contract

A grammar item should identify target form, meaning, pragmatic use, formation,
contrast, positive examples/counterexamples and exact-form versus natural
alternatives. Japanese explanation/support ownership follows localization
boundaries. Actual wording and sequence require Japanese teacher review.

**Evidence: `JA-EV-GRAMMAR-01`, `JA-EV-PEDAGOGY-01`.**

## Knowledge and communication

Grammar, vocabulary, kanji và pronunciation có thể được dạy để hỗ trợ một
Can-do, nhưng một textbook sequence không tự trở thành mandatory NovaLang
sequence. Exact-form practice phải ghi teaching objective và không thay thế
communicative outcome assessment.

**Evidence: `JA-EV-PEDAGOGY-01`, `JA-EV-GRAMMAR-01` —
`AUTHORITATIVE_SOURCE_BACKED`; adaptation review pending.**

## Reading-aid progression

Learner có thể chọn reading only, romaji only, cả hai hoặc không hiện cả hai.
Q14 romaji ẩn mặc định nhưng user-toggle available ở A0–B1; B2/C1/C2 không có
toggle. Automated runtime implementation đã hoàn tất theo approved Change
Control; Project Owner Android/Web manual verification đã `PASS`.

Kanji-per-level, broader curriculum sequencing và accessibility realization
không phải Japanese product-policy question của closure này; chúng vẫn cần task
và evidence riêng nếu được đưa vào runtime/curriculum.

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

## Practice, feedback and audio policy

- Audio replay: unlimited.
- Standard speed: `1.0x`; slow mode: `0.75x`.
- Opening a card must not autoplay audio.
- Approved audio has priority, then correct-locale TTS, then explicit error.
- No silent fallback to another locale/voice.

Recording, retry and mastery architecture are outside this Japanese policy
closure; no Japanese-specific defaults are invented.

**Evidence: `JA-EV-OWNER-03` — `PROJECT_OWNER_DECISION`.**

## Reading and listening contract

Reading review covers furigana, kana reading, romaji, graded support, kanji
recognition, comprehension and accessibility. Listening review covers speed,
replay, transcript, reading/translation toggles, weak/connected speech,
task design and graded versus non-graded use. The approved playback defaults
are unlimited replay, `1.0x`, optional `0.75x`, and no card-open autoplay.

## Speaking and writing contract

Speaking distinguishes repetition/scripted practice from open speech and must
escalate when automated scoring is unreliable. Writing distinguishes
recognition, kana/kanji production, typing/IME and handwriting; handwriting is
outside this profile unless a future task approves it. Regional pronunciation
and open production require expert review.

## Exercise and answer contract

Exact-form, meaning-equivalent answers, multiple accepted answers,
normalization, punctuation tolerance, kana/kanji variants and open answers must
carry evidence and teaching intent. When kanji is not the objective, valid kana
or kanji is accepted. Kanji exact form may be required when kanji is the
explicit objective. Minor punctuation, whitespace and width differences are
normalized unless exact form requires them.

Structurally different but meaning-equivalent natural answers are accepted
automatically only when the variant is pre-approved. Uncertain open answers
must escalate for review. Valid Japanese must not be rejected merely because
it differs from one reference answer.

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

## Correction and feedback contract

Feedback must distinguish deterministic, grammar, orthography, register,
naturalness and pronunciation findings; explain at an approved learner level;
and not overcorrect approved variants. A minor typo does not receive PASS; it
is classified as a typo and gets light feedback rather than a full grammar
error. Register mismatch is incorrect when register is the teaching objective
or makes the utterance inappropriate to the situation; otherwise it is a
warning. Japanese grammar explanations, hints and feedback use clear, friendly
です／ます style. Linguistic realization remains native/pedagogy review gated.

**Evidence: `JA-EV-PEDAGOGY-02`, `JA-EV-OWNER-05` —
`PROJECT_OWNER_DECISION`.**

## Pedagogical exceptions

Controlled unnaturalness or literal gloss is allowed only with explicit
teaching objective, field/metadata, evidence and scope limited to that
exercise/lesson. It cannot become the natural translation or a global rule.

**Evidence: `JA-EV-NATURAL-01 — PROJECT_OWNER_DECISION`.**

## Assessment evidence

Deterministic tests phù hợp với exact field, stable fixture và exact-form
objective. Natural production, pragmatic appropriateness, register và open
answers cần Japanese teacher/native review. Corpus evidence chỉ hỗ trợ điều tra
usage, không tự cấp PASS.

**Evidence: `JA-EV-QA-01`, `JA-EV-CORPUS-01`.**

## Release application

Theo global naturalness rule, future Golden Lesson và release-critical content
revision vẫn áp dụng review gate riêng. Full Japanese profile đã được Project
Owner `APPROVED / FROZEN` với native expert review `WAIVED / NOT_COMPLETED`;
closure này không tự cấp PASS cho future content revision chỉ từ tài liệu.
