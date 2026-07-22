# NovaLang Architecture Decisions — Quyết định kiến trúc

This file records approved cross-task architecture decisions.

It is not a replacement for frozen specifications, shared contracts, or task-specific implementation documents.

## Decision priority — Thứ tự ưu tiên

1. Frozen specifications
2. Approved architecture records
3. Shared contracts
4. Active task instructions
5. Platform-specific implementation rules

## ADR-001 — Six runtime cores

Status: `APPROVED / PROVISIONAL`

NovaLang uses six runtime cores:

1. Curriculum & Learning Paths
2. Lesson, Practice & Review Execution
3. Guided Conversation & AI Text
4. Audio, Voice & Speaking
5. Progress, Mastery & Personalization
6. Gamification, Rewards & Identity

## ADR-002 — Shared Usage Ledger

Status: `APPROVED / PROVISIONAL`

Usage Ledger is a shared service outside the six runtime cores.

## ADR-003 — Completion ownership

Status: `APPROVED / PROVISIONAL`

Core 2 owns the valid lesson-completion record.

Core 1 owns curriculum-progress projection.

Completion must not directly update usage, progress, mastery, or XP.

## ADR-004 — Review ownership

Status: `APPROVED / PROVISIONAL`

Core 5 owns review selection, due state, and priority.

Core 2 owns review execution and evidence.

## ADR-005 — Personalization boundary

Status: `APPROVED / PROVISIONAL`

Core 5 owns the approved personalization summary.

Core 3 and Core 4 must not independently read unrestricted raw user history.

## ADR-006 — Shared Domain Framework

Status: `APPROVED / PROVISIONAL`

Shared Domain Framework is a packaging and validation contract, not a seventh runtime core.

## ADR-007 — Knowledge ownership

Status: `APPROVED / PROVISIONAL`

Core 1 and the Content Catalog own static knowledge-item definitions.

Core 5 owns per-user mastery state.

## ADR-008 — Golden Reference Lesson

Status: `FROZEN`

- Language: Japanese
- Domain: Daily Life
- Lesson ID: `ja-daily_life-m01-u1-l1`
- Format: `Lesson Format 2.0`
- Main cards: exactly 5
- Exercises: exactly 14

Its content, order, flow, metadata, resume behavior, wrong-answer handling, and protected format must not be changed without explicit approval.

### Amendment — 2026-07-19: authoring rules apply to Golden too (Owner-approved Golden edits)

**Status:** `APPROVED` (explicit Owner approval to modify the Golden Lesson).

Context: Owner ratified `LESSON_AUTHORING_STANDARD.md` and decided the new
rules apply to **every** lesson **including the Golden Reference Lesson** —
Golden is no longer exempt. Owner explicitly authorized editing Golden for
consistency. Changes made under this amendment:

1. **Free/Plus boundary changed to Free = Q1–Q9 / Plus = Q10–Q14** (was Free
   Q1–Q10 / Plus Q11–Q14). Golden's Q10 (`chat_text_fill`) `plan` was changed
   `free → plus` in the approved source
   (`scripts/content/daily-life/module-1/ja-unit1-lesson1.mjs`). The generic
   validator boundary (`scripts/validate-curriculum.mjs`,
   `scripts/smoke-curriculum-flow.mjs`) and the Golden Flutter invariant test
   (`five_card_lesson_test.dart`) were updated to `index < 9 ? free : plus`.
2. **Per-example audio:** every vocabulary example now carries `speechText`
   (kana, taken from each example's already-authored `reading` — nothing
   invented). Golden's 10 vocab examples previously lacked `speechText`; they
   gained it. The generic validator now enforces `speechText` on every
   vocabulary card, vocabulary example, and dialogue line (Q14 lines were
   already enforced).
3. **Q14 line count** is no longer forced to exactly 14 for a normal lesson
   (generic check requires only ≥4). **Golden's Q14 remains locked to its exact
   14 approved Tanaka–Sato lines** via `validateApprovedGoldenLessonContent`
   — unchanged.

Unchanged and still frozen: Golden's language/domain/id, exactly 5 main cards,
exactly 14 exercises, Q1–Q9 content, the Q14 14-line approved dialogue, stable
exercise/token ids, order, resume/wrong-answer behavior. Verification:
`validate:curriculum` + `smoke:curriculum` PASS (same 4 pre-existing soft
`rules/` warnings, 0 new errors); Golden content-lock + five-cards scope guard
PASS. `flutter test` not run in this cloud env (no SDK) — the boundary test
source was updated to match; real Flutter verification pending a machine with
Flutter installed.

## ADR-009 — Multi-agent implementation workflow

Status: `APPROVED`

Default takeover order:

1. Claude Code
2. Codex
3. Cursor

Only one agent may hold write ownership at a time.

Ownership and continuation state are recorded in `docs/ai/ACTIVE_TASK.md`.

## ADR-010 — Stage 1 runtime foundation closed

Status: `APPROVED / CLOSED`

### Context

Stage 1 delivered the local Golden Lesson completion pipeline through VS0-02B
through VS0-08, including final Cursor patches for review blockers and Web
compatibility for Flutter browser startup.

### Decision

Stage 1 is officially **COMPLETE / CLOSED**.

```text
Final verdict: STAGE_1_REVIEW_PASSED
Open blockers: NONE
Full Flutter tests at final review: 214/214 PASS
Post-closure Web compatibility suite: 219/219 PASS
flutter analyze: PASS
Android debug APK: PASS
Contract validators: PASS
Golden Lesson changed: NONE
Stage 2 started: NO
Pilot implementation started: NO
```

Deferred risks remain documented but are **not** Stage 1 blockers:

- R1 — delimiter collision in scope keys
- R4 — Dart-only conflict exceptions outside wire contracts
- R5 — stale read during queued writes
- R6 — startup automatic reconciliation for completed attempts lacking a
  Completion Record

### Consequences

- Stage 2 must not start without a new approved task.
- Pilot implementation remains blocked until Pilot Scope authorization and
  per-lesson Content Specification approval.
- Future work must preserve Stage 1 contracts and Golden Lesson invariants.

### Approval

Approved by Codex final independent review (`STAGE_1_REVIEW_PASSED`) and
project-owner closure instruction.

## ADR-011 — Web, Android and iOS as First-Class Product Targets
— Web, Android và iOS là các nền tảng mục tiêu chính thức

Status: `APPROVED`

### Context

NovaLang already has a React Web app (`frontend/`), a Flutter mobile app
(`mobile/novalang_flutter/`), and shared contracts/content (`shared/`). The
product needs an explicit, durable rule that all three platforms are
first-class targets, while keeping Android as the current validation priority.

### Decision

- Product targets are Web, Android, and iOS.
- Android and iOS share one Flutter/Dart mobile application.
- Web is a first-class target and must follow shared contracts and product
  semantics.
- Web is not required to use the same UI framework as mobile when the
  repository architecture already separates React Web from Flutter mobile.
- Business rules must not be fragmented or duplicated without control.
- UI must be responsive and platform-adaptive.
- Platform-specific code must be isolated behind interfaces/adapters.
- Android is the primary validation target today.
- iOS PASS requires macOS/Xcode or a cloud iOS build; do not claim it early.

### Consequences

- New features must be evaluated for all three targets.
- Android-only shortcuts are technical debt unless explicitly approved.
- New plugins must be checked against the Web/Android/iOS support matrix.
- UI review must include mobile responsiveness and Web behavior.
- Implementation reports must include platform impact fields.

### Constraints

- Do not create separate full Android/iOS screen trees without an ADR.
- Do not put unsafe `dart:io` Platform checks on Web execution paths.
- Do not start Stage 2 or Pilot implementation from this ADR alone.

### Validation Strategy

- Android: emulator/device, Flutter tests, debug APK.
- Web: keep buildable; browser/responsive checks; Flutter Web or React Web
  according to the approved surface being changed.
- iOS: maintain compatibility in source/config; runtime PASS only after
  macOS/Xcode or cloud build evidence.

### Approval

Approved by project owner as part of post-Stage 1 governance closure.

## ADR-012 — Q14 Real-World Practice redesign (Lesson Format 3.0)

Status: `APPROVED`

### Context

Format 2.0 (ADR-008-linked, `.cursor/rules/03_novalang_lesson_format_2_0.mdc`)
froze Q14 of the Golden Reference Lesson as `controlled_ai_text`: a graded,
AI-checked, one-cycle production exercise. The project owner approved a
breaking change: Q14 becomes a non-graded advanced dialogue for reading,
listening, and repeating, under task
`NOVALANG-LESSON-RUNTIME-REMEDIATION-01`.

### Decision

- Q14 keeps its stable exercise ID, its position (14/14), and its display
  name (vi: `Thực hành thực tế`, en: `Real-World Practice`, ja: `実践練習`).
- Q14's technical type changes to `real_world_practice_dialogue` and is
  non-graded: no answer input, no AI grading, no score, no
  correct/incorrect state, no AI quota, no retry cycles.
- The Golden Lesson keeps exactly 5 cards and exactly 14 exercises; Q1–Q13
  are unchanged.
- Only the Golden Lesson's Q14 target-language content changes, to the
  owner-approved Tanaka–Sato "asking the way" dialogue (14 lines), with
  hiragana readings for lines containing kanji (no romaji) and vi/en/ja
  translations for every line.
- The breaking change is documented as Lesson Format 3.0
  (`.cursor/rules/04_novalang_lesson_format_3_0.mdc`), which supersedes only
  the Q14 row/policy of Format 2.0; every other part of Format 2.0 remains
  authoritative and unmodified.
- This is distinct from `module_comprehensive_conversation` (a separate,
  Module-level, graded activity placed after Unit 3; see its own product
  contract). Q14 remains a Unit-level, per-lesson activity.

### Consequences

- The result page's graded score fraction excludes Q14 (denominator drops
  from 14 to 13 graded exercises); the position counter and total exercise
  count remain 14.
- The AI grader implementation is unaffected and remains available for any
  other exercise that still uses it; only Q14's dependency on it is removed.
- Validators (`scripts/validate-curriculum.mjs`) and the Flutter test suite
  must check the new Q14 contract instead of the old AI-graded one.

### Approval

Approved by project owner, 2026-07-15, as part of task
`NOVALANG-LESSON-RUNTIME-REMEDIATION-01`.

## ADR-013 — Module Comprehensive Conversation product contract (shell only)

Status: `APPROVED_FOR_SHELL_IMPLEMENTATION_CONTENT_PENDING_SEPARATE_APPROVAL`

### Context

The project owner confirmed the repository's curriculum hierarchy is
`Module → Unit → Lesson` and requested a new Module-level activity,
`module_comprehensive_conversation`, that reviews knowledge across Unit 1 +
Unit 2 + Unit 3 of a Module. This is distinct from the per-Lesson Q14
"Real-World Practice" dialogue (ADR-012), which is Unit/Lesson-scoped and
non-graded. No production billing/entitlement system exists yet, so this ADR
authorizes a UI shell and access-policy interface only — no comprehensive
conversation content is authored under this task.

### Decision

- **Scope**: Module-level. One `module_comprehensive_conversation` card per
  Module (`CurriculumModuleGroup`), combining Unit 1 + Unit 2 + Unit 3
  knowledge of that Module.
- **Insertion point**: Immediately after the third Unit's accordion inside
  the Module renderer (`DailyLifeModuleCard`), before Unit 4+ if present.
  Never after the whole Module, never between Unit 1 and Unit 2, never
  conflated with per-Lesson Q14.
- **Access**: Plus, Pro, and Ultimate. Free sees a locked state. Because no
  production entitlement/billing system exists, access is resolved through a
  new small interface, `PlanAccessPolicy`
  (`mobile/novalang_flutter/lib/services/plan_access_policy.dart`), whose
  default production implementation (`ProductionSafePlanAccessPolicy`)
  always returns `PlanTier.free` — it never grants Plus+ access to a real
  user. Tests substitute `FixedPlanAccessPolicy` to simulate each tier.
- **Content**: Out of scope for this task. Tapping an unlocked card shows a
  localized "content is being prepared" message; tapping a locked card shows
  a localized upgrade hint. No dialogue, script, or conversation content is
  invented. Real content requires a separate owner-approved task.
- **UI**: Title (`moduleComprehensiveConversationTitle`, `uiLanguageCode`,
  matching how sibling Module/Unit/Lesson titles in the same list are
  labeled), short description and learner-support messaging
  (`moduleComprehensiveConversationDescription`,
  `moduleComprehensiveConversationLockedHint`,
  `moduleComprehensiveConversationPreparing`, all `nativeLanguageCode`), and
  a Plus+ badge. Localized vi/en/ja; no repository-existing equivalent
  wording was found for the title, so the project owner's proposed wording
  (vi: `Hội thoại tổng hợp`, en: `Comprehensive Conversation`, ja:
  `総合会話練習`) was used as-is.
- **Future grading**: When real content and a production entitlement system
  land, this contract anticipates a graded, interactive activity — the shell
  built here does not implement grading, but does not preclude it either.

### Consequences

- `DailyLifeModuleCard` requires a `nativeLanguageCode` parameter in
  addition to its existing `locale` (`uiLanguageCode`) parameter.
- `PlanAccessPolicy`/`PlanTier` is a new, independent seam with no billing
  dependency; introducing real billing later only requires a new
  `PlanAccessPolicy` implementation wired into `planAccessPolicyProvider`,
  not changes to the card or curriculum models.
- Modules with fewer than 3 Units do not render the card (there is no
  "immediately after the third Unit" position without a third Unit).

### Approval

Approved by project owner, 2026-07-15, as part of task
`NOVALANG-LESSON-RUNTIME-REMEDIATION-01`, as a shell-only contract. Real
comprehensive-conversation content and production billing require separate
owner approval.

## ADR-014 — Unit Comprehensive Conversation placement correction

Status: `APPROVED_FOR_IMPLEMENTATION_PENDING_OWNER_RUNTIME_CONFIRMATION`

### Context

Project Owner runtime review found that ADR-013's module-level insertion after
the third Unit was incorrect for the product hierarchy. It placed the shell
outside the expanded Unit that owns its three child Lessons.

### Decision

- ADR-013 remains a historical record and is superseded for scope and
  placement by this ADR.
- The technical contract is `unit_comprehensive_conversation`.
- A Unit Comprehensive Conversation card is rendered after the third child
  Lesson inside each standard Unit. It is visually nested in that expanded
  Unit and is never inserted after Module-level Unit 3.
- Units with fewer than three child Lessons do not render the shell.
- The shell remains Free-locked and Plus/Pro/Ultimate-entitled through the
  existing `PlanAccessPolicy` seam. It still contains no approved dialogue or
  real-AI behavior; unlocked users receive only the localized preparing notice.
- The earlier module-level key/name is not retained because no persisted user
  activity exists for this shell. The replacement uses Unit-scoped i18n keys.

### Consequences

- The renderer accepts the owning `unitId`, not `moduleId`.
- Unit collapse/expand, lesson selection, lesson progress, completion records,
  and existing navigation remain unchanged.
- Q14 remains a per-Lesson `real_world_practice_dialogue` under ADR-012 and is
  unrelated to this Unit shell.

### Approval

Approved by Project Owner under
`NOVALANG-LESSON-RUNTIME-REMEDIATION-BLOCKERS-02`.

## ADR-015 — Pronunciation architecture: five-field contract and Pronunciation Profiles

Status: `APPROVED / FROZEN / PROJECT_OWNER_REVIEW_COMPLETED`

Project Owner review (2026-07-16) rejected the first Japanese implementation:
kana-free romanization output is not equivalent to correct, learner-readable
romanization (missing word/particle spacing, macrons, and capitalization),
and a growing lexical-exception list was rejected as an unreliable general
architecture for content not yet written. The five-field contract and
Pronunciation Profile governance structure below were unaffected by that
rejection; the Japanese romanization algorithm was rebuilt around a real
morphological analyzer (`kuromoji`, IPADIC dictionary) instead of a
character-level exception list — see
`rules/languages/ja/README.md` for the corrected standard (exact Hepburn
variant, word/particle spacing, macron
policy, capitalization, punctuation, ん apostrophe, small っ, youon, katakana
loanwords, proper nouns, and the token/POS-based disambiguation
architecture). Verified against the Project Owner's exact required examples
and re-validated end to end after the correction. Project Owner final review
and runtime confirmation are complete; the ADR is approved and frozen.

### Context

Runtime review found Vietnamese learner-support text leaking into
English/Japanese-native Vocabulary Cards (task
`NOVALANG-VOCABULARY-RUNTIME-REMEDIATION-01`). While auditing the vocabulary
pipeline for that defect, a separate, larger systemic bug was found: the
generic (non-Golden) Japanese lesson generator
(`scripts/content/daily-life/module-1/helpers.mjs`, function `vocab()`) set
`romanization: reading(line, language)` — copying the raw hiragana `reading`
string verbatim into the `romanization` field instead of transliterating it.
This affected 391 real occurrences across the generated curriculum and
included the specific defect the project owner reported: the direction
particle へ rendered as "he" instead of "e" (and, by the same bug class, は
never correctly rendered "wa" for the topic particle in generic-pipeline
content). The project owner then authorized a durable architecture — not a
point patch — under task
`NOVALANG-PRONUNCIATION-TRANSFORMATION-GOVERNANCE-01`, with Japanese as the
pilot language to implement fully now, and a mandatory contract/governance
scaffold for every other learning language.

### Decision

- Five distinct fields must never be conflated: `surfaceText` (canonical
  script), `reading` (native phonetic script, e.g. kana — always literal,
  never particle-adjusted), `romanization` (Latin transliteration for
  learners — the only field where contextual particle rules apply),
  `pronunciation` (reserved for future IPA/regional notes; unused today),
  and `ttsText` (what is actually sent to the TTS engine — defaults to
  `surfaceText`/`reading`, never `romanization`).
- Every learning language requires an approved `PronunciationProfile`
  (`languageCode`, `profileVersion`, `writingSystem`, `readingSystem`,
  `romanizationStandard`, `pronunciationRules`, `contextualRules`,
  `lexicalExceptions`, `ttsPolicy`, `contentOverridePolicy`,
  `validatorRules`, `testFixtures`, `source`/`provenance`, `reviewStatus`)
  before it may enter real content production. A language with only
  blueprint/scaffold content needs only `reviewStatus =
  PRONUNCIATION_PROFILE_REQUIRED_BEFORE_CONTENT_RELEASE`; a full, approved
  profile is a **release blocker** the moment real lesson content is
  authored for that language, not deferred/optional future work.
- Contextual rules must never be a blind/global character substitution, and
  must not rely on a growing per-word exception list either (rejected by
  Project Owner review, 2026-07-16, as unreliable for lessons not yet
  written). `JapanesePronunciationProfile` (the pilot, fully implemented)
  instead tokenizes each sentence's real kanji+kana surface text with a
  Japanese morphological analyzer (`kuromoji`, IPADIC) and applies the
  particle romanization (は→wa, へ→e, を→o) only when the analyzer itself
  tags that exact token as a grammatical particle (助詞) — a real
  part-of-speech analysis of each new sentence, not a lookup table that
  must be manually extended per collision. Word/particle spacing,
  proper-noun capitalization, and long-vowel macrons are likewise derived
  from each token's real grammatical role, not character adjacency. A small,
  explicit table remains for genuine irregular pronunciations no POS tag can
  resolve (e.g. こんにちは/こんばんは), matched only against a token's exact
  whole surface form. When a token cannot be analyzed, the implementation
  fails loudly (throws) rather than guessing.
- Content authors may override `reading`/`romanization`/`pronunciation`/
  `ttsText` per item with a required reason/source; generators must never
  silently overwrite an approved override. The Golden Reference Lesson's 5
  hand-authored vocabulary `romanization` values are one such override
  class and were left untouched.
- TTS receives native-script text by default; a `ttsText` override is only
  for cases where native-script TTS is unreliable, and never changes the
  displayed canonical sentence.
- The global contract is recorded in the gateway
  `.cursor/rules/05_novalang_pronunciation_profiles.mdc`. The Japanese
  profile's detailed Single Source of Truth is `rules/languages/ja/`, applied
  after `AGENTS.md` and `novalang.mdc` and before the lesson-format rules.

### Consequences

- `scripts/lib/japanese-pronunciation.mjs` (`toReadableRomaji`,
  `prepareJapaneseRomanization`, `romanizeNow`, `containsKana`) is the
  canonical Modified Hepburn implementation for Japanese, built on the
  `kuromoji` npm dependency (pure JS morphological analyzer, Apache-2.0, no
  native bindings — a content-generation-time-only dependency, not shipped
  to the Flutter app or web bundle); `helpers.mjs`'s `vocab()` now tokenizes
  and romanizes the kanji surfaceText instead of copying `reading` verbatim.
  Because `kuromoji`'s dictionary build is async and the generator call
  graph is synchronous, every needed surface text is pre-tokenized once via
  top-level `await` when `helpers.mjs` is imported, and the generator itself
  does a synchronous cache lookup.
- `scripts/validate-curriculum.mjs` mechanically fails any lesson (any
  language) whose `romanization` field still contains hiragana/katakana,
  guarding against a regression of this exact bug class. This check is
  necessary but not sufficient on its own — it cannot detect wrong spacing,
  missing macrons, or missing capitalization.
- `scripts/test-japanese-pronunciation.mjs` (`npm run
  test:japanese-pronunciation`) asserts complete expected romanization
  strings (spacing, macrons, capitalization included), not just absence of
  kana, using real-data-derived cases.
- Every future learning language must ship a `PronunciationProfile` before
  its first real lesson is released; this is now a standing gate, not a
  one-time task.
- This ADR does not change Golden Lesson content, stable IDs, card/exercise
  counts, or completion semantics. Golden Lesson's own vocabulary
  romanization was already correct and is unchanged.

### Approval

Approved by project owner, 2026-07-16, as part of task
`NOVALANG-PRONUNCIATION-TRANSFORMATION-GOVERNANCE-01`. A first implementation
was rejected the same day (character-level lexical-exception architecture,
missing spacing/macrons/capitalization); the corrected token/POS-based
implementation above is locally validated against the project owner's exact
required examples. Project Owner final review completed on 2026-07-17; ADR-015
is approved and frozen. Native expert review is `WAIVED / NOT_COMPLETED`, and
pitch accent remains `OUT_OF_SCOPE / PENDING_EXPERT_REVIEW`.

## ADR-016 — Multilingual naturalness and register architecture

Status: `APPROVED / PROJECT_OWNER_DOCUMENTATION_REVIEW_PENDING / NOT_FROZEN`

### Context

Language purity and translation completeness do not prove that wording is
natural, contemporary, pragmatically correct, or appropriate to the speaker
relationship. NovaLang needs one cross-language writing-quality rule plus
reviewed per-language profiles, without treating automated similarity or LLM
scores as proof of native quality.

### Decision

- Canonical default base register: `NATURAL_NEUTRAL_POLITE`.
- Base-register taxonomy: `CASUAL`, `NATURAL_NEUTRAL_POLITE`, `FORMAL`.
- Orthogonal modifiers: `HONORIFIC`, `CEREMONIAL`, `SLANG`. Modifiers are not
  linear levels above or below a base register.
- Global canonical rule:
  `rules/content/naturalness-and-register.md`.
- Per-language canonical detail:
  `rules/languages/<languageCode>/style-and-register.md`, built from
  `rules/languages/_template/style-and-register.md`.
- Every language profile records status, version, reviewer, review date,
  provenance, unresolved decisions, and change log. File existence does not
  mean approval.
- The rule applies separately to target-language text, natural translation and
  learner support, literal gloss, grammar explanation, UI copy, and exact-form
  exercises. Natural translation remains the primary translation; literal
  structure belongs in `literalGloss` or an approved equivalent.
- No `registerIntent` field or other schema change is introduced by this ADR.

### Priority

1. Frozen specification and approved decision.
2. Intended meaning and pragmatic intent.
3. Situation, roles, and speaker relationship.
4. Teaching objective or exact form.
5. Specified base register and modifiers.
6. Natural target-language wording.
7. Teaching-relevant grammar information.
8. UI constraints.
9. Source wording only when needed for the teaching objective.

### Release gate

The gate applies to new content, modified content, the Golden Lesson, and
content preparing for release. Existing content is audited retrospectively in
a separate task. Native review coverage is 100% for the Golden Lesson and
release-critical content; large batches may use a documented risk-based sample.
Uncertainty results in `NEEDS_NATIVE_STYLE_REVIEW`.

### QA semantics

Canonical states:

- `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`: no approved language profile;
- `FAIL_DETERMINISTIC`: objective contract/locale/required-data/banned-fixture
  failure;
- `NEEDS_NATIVE_STYLE_REVIEW`: subjective naturalness/register or incomplete
  required review;
- `PASS`: approved profile, deterministic validation pass, required native
  review pass, verified context/teaching objective, and evidence tied to both
  profile version and content revision.

LLM score, word frequency, translation similarity, or another heuristic may
produce a review finding but must never automatically grant `PASS`.

### Consequences

- English and Vietnamese remain
  `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED` until separate profile tasks are
  approved and completed.
- Japanese style/register is now `APPROVED / FROZEN` by the later Japanese
  Full Profile final closure. Native expert review is `WAIVED /
  NOT_COMPLETED`; this is not a native-review completion claim.
- The Golden Lesson is not modified by this ADR; its 100% audit occurs in a
  separate task and any remediation still requires Golden Change Control.
- This ADR does not freeze Stage 1, any Lesson Format, or a language profile.
- Content remediation, curriculum/schema changes, generation, and runtime code
  are outside this documentation-only architecture task.

### Approval

Architecture, taxonomy, release gate, review coverage, and QA semantics
approved by Project Owner under
`NOVALANG-NATURALNESS-RULE-ARCHITECTURE-IMPLEMENTATION-01`. Documentation
wording remains pending final Project Owner review; no language profile is
frozen by this approval.

## ADR-017 — Gate 5 removed for the language rule-build pipeline

Status: `APPROVED`

### Context

`/build-language`'s Bước 5 (freeze step) used a "Gate 5" wait — a hiện tượng
(language phenomenon) had to sit at `VALIDATED` for ≥48 hours, and the Project
Owner had to confirm a second time, before it could be proposed `FROZEN`. Gate
5 assumes a second reviewer with enough linguistic expertise to catch problems
missed the first time. NovaLang is a one-person company; the Project Owner is
not a linguist and cannot audit rule content by eye. A time gap alone does not
produce a materially different second review under that constraint — it is an
empty procedural step, not real verification.

### Decision

- Gate 5 (the 48–72 hour wait between a `VALIDATED` proposal and a `FROZEN`
  confirmation) is **removed for the language rule-build pipeline only**
  (`/build-language`, its Bước 5, and `tools/validate.mjs`).
- A phenomenon that meets the existing `VALIDATED` bar (confidence ≥ medium,
  sufficient pass+fail fixtures, a clean corpus check, and every `depends_on`
  already ≥ `VALIDATED`) may be proposed `FROZEN` in the same session — no
  waiting period required.
- Real review is replaced by two mechanisms already built into the pipeline:
  **native review** (`native-review-<lang>.md`, or direct Project Owner
  confirmation when the language is one the Owner reads natively — vi/ja/en
  per `rules/decisions.md`) and **corpus check** (Bước 3 — running the rule
  against real text and demoting confidence on mass violations). Both produce
  actual evidence; neither depends on elapsed time.
- The other `FROZEN` conditions are unchanged: `version ≥ 1.0.0`, every
  `depends_on` also `FROZEN`, and explicit Project Owner confirmation (freeze
  is an irreversible-in-spirit action and still requires that confirmation).
- `tools/validate.mjs` never programmatically enforced the 48-hour gap — it
  was only checked manually by whichever agent proposed a freeze, by
  comparing dates in `pipeline-log.md`. That manual check is dropped; INV-3's
  success message was updated to match.

### Scope

This ADR and its source decision (`rules/decisions.md` D-49) apply **only**
to the language rule-build pipeline. Gate 5 remains in full effect for every
other NovaLang architecture decision or release process that references it.

### Consequences

- Language phenomena for `ja`, `en`, and `vi` already sitting at `VALIDATED`
  may be proposed for `FROZEN` immediately, without waiting for their prior
  48-hour clocks to elapse.
- Freeze proposals still require the Project Owner's explicit second
  confirmation per hiện tượng — only the elapsed-time requirement is dropped.
- Does not change the Golden Reference Lesson, Lesson Format, Stage
  1/completion contracts, or any non-language-rule ADR.

### Approval

Approved by Project Owner, 2026-07-18, effective immediately. Recorded in
`rules/decisions.md` as D-49 (source of truth for wording/rationale); this
ADR is the architecture-level pointer for future readers.

## ADR-018 — Daily Life domain curriculum architecture: two blocks, 15 shared topics × 3 tiers, per-language concurrency and entitlement model

Status: `APPROVED AS DESIGN DIRECTION / NOT FROZEN / IMPLEMENTATION NOT STARTED`

This is a **design record, not an implementation order**. It documents an
architecture the Project Owner has decided for the `daily_life` domain,
intended to apply to every learning language. It does **not** change
`shared/content/curriculum/curriculum_catalog.json` or any generated
curriculum data — the current 10-module blueprint (ADR-scoped as a temporary
layout test, see Context) is untouched by this ADR. A separate task, with its
own plan and checkpoints, is required before any code or content change.
Several sub-decisions below are explicitly marked as **initial
assumptions**, not frozen values — see "Explicitly open / assumption-only"
at the end.

### Context

The `daily_life` domain currently exists as a temporary 10-module × 8-unit ×
3-lesson blueprint (`scripts/lib/daily-life-blueprint.mjs`), built only to
test the five-card layout end-to-end (one real lesson: Golden Reference
Lesson, ADR-008). The Project Owner is redesigning this domain's real
architecture before authoring content at scale, and wants the design captured
before any code/content change so implementation does not have to be
re-derived or guessed later.

Investigation prior to this ADR (read-only, same session) established the
concrete blast radius of the old 10-module number (`docs/ai/ARCHITECTURE_DECISIONS.md`
history is silent on it; the hardcoded assertions live in
`scripts/lib/daily-life-blueprint.mjs`, `scripts/generate-curriculum.mjs`,
`scripts/smoke-curriculum-flow.mjs`, `scripts/validate-curriculum.mjs`, and
the three synced copies of `curriculum_catalog.json`), that placement-test
scoring is independent of module/unit counts, that only Module 1 (Golden
Lesson + 47 sibling lessons) is `playable`/`ready` today, and that lesson IDs
are the completion-record scope key (`shared/contracts/lesson_completion.rules.md`,
C2/C9) — so ID stability matters only for already-playable content.

### Decision

**1. Two blocks inside `daily_life`, structurally different:**

- **Block A — "Những ngày đầu" (working name only, not a display string):**
  procedural/survival situations for someone who just arrived. **No 3-tier
  split, no scroll-window gating** — an "emergency valve": open access, no
  forced structure. **Description (i18n key source text, vi original,
  2026-07-18, needs translation into every supported native language before
  release — not yet translated by this ADR):** *"Dành cho người sắp ra nước
  ngoài — để không bối rối trước những việc thiết yếu đầu tiên."* This is
  marketing copy, not narrative — it must live as one i18n key, resolved via
  `nativeLanguageCode` like every other display string, never hardcoded.
- **Block B — main track:** everyday recurring communication topics, split
  into **3 display tiers** (Cơ bản / Trung cấp / Cao cấp), with scroll-window
  gating (existing pattern, unchanged mechanism).

**2. Block B has 15 shared topics, same 15 across all 3 tiers, fixed order
for reference (not necessarily a hard display order requirement):**

1. Chào hỏi & làm quen
2. Bản thân
3. Số đếm & tiền
4. Thời gian & ngày tháng
5. Mua sắm
6. Ăn uống & gọi món
7. Chỉ đường
8. Tàu điện & đi lại
9. Khi không hiểu
10. Gia đình & người quen
11. Sở thích
12. Hẹn gặp & rủ rê
13. Điện thoại & tin nhắn
14. Thời tiết & sức khỏe
15. Cảm ơn / xin lỗi / lịch sự

Each tier covers the *same* topic with increasing complexity/fluency of
expression, not disjoint sub-topics — a higher tier may add situational
depth, but it is a continuation of the same topic, not a new one.

**2b. Naming — two layers, never conflated:**

- **Technical name (code/ID/docs):** a stable key. The 15 labels above are
  **internal reference labels for this ADR only, not display strings and not
  the literal ID text.** The concrete technical id/slug for the
  module/topic tier is an implementation choice made when the design is
  actually built (must stay consistent with existing code conventions, e.g.
  the `daily_life_m##_snake_case` pattern already in use) — not fixed by this
  ADR.
- **Display name (user-facing):** **mandatory through i18n**, keyed by
  `nativeLanguageCode` (vi/en/ja/ko/zh/...). **Never hardcode a topic display
  string in any language inside rendering code.** One i18n key per topic,
  translated into every supported native language — same discipline already
  required elsewhere in this repo (AGENTS.md "UI Language Purity" /
  "Learning Content Language Purity").
- **Topic IDs are immutable**: no language embedded in the id, and the id
  never changes when the display name changes. This is the same principle
  already enforced structurally for lesson IDs via the completion-record
  scope key (`lesson_completion.rules.md` C2/C9) — extended here explicitly
  to topic/module ids, matching the Project Owner's referenced "ID bền
  trong SRS" principle (no single named decision by that exact tag was found
  in-repo prior to this ADR; this ADR is now that record).
- **Display-language purity (added 2026-07-18) — system-wide, not just this
  domain:** a display name MUST be written entirely in the learner's chosen
  `nativeLanguageCode`, and MUST NOT borrow a word from the language being
  learned (`learningLanguageCode`), no matter how common that borrowing is
  among real speakers of the native language. Example (vi native, ja
  learning): write "làm thêm", never "baito"/バイト; write "thẻ cư trú",
  never "zairyu card"; write "gia hạn", never "shinsei". This is an easy
  mistake because content authors are often fluent in the target-country's
  own loanword habits — the rule exists specifically to catch that habit.
  Every display name is an i18n key; each native language gets its own pure
  translation, never a shared or cross-contaminated string. This generalizes
  the existing "Learning Content Language Purity" rule in `AGENTS.md` (which
  already separates `learningLanguageCode` from `nativeLanguageCode` content)
  to explicitly cover the failure mode of *borrowing the target language's
  own vocabulary into native-language display text*, which that rule did not
  spell out by name before this ADR.

**3. Three-tier principle:** same topic, tier increases **expressive
complexity**, not just vocabulary volume. Worked example (Chào hỏi &
làm quen): Cơ bản = short, disconnected sentences; Trung cấp = compound
sentences with modifying clauses; Cao cấp = nuance + honorific/register
control. Tier labels shown to the learner are **Cơ bản / Trung cấp / Cao
cấp only — CEFR never displayed**, CEFR (or an equivalent internal level
scale) still runs underneath for placement/gating purposes only.

**4. Free horizontal movement, locked vertical progression:**

- Inside one tier: the learner may pick any topic's unit in any order — no
  forced sequence across topics within a tier.
- Between tiers: Trung cấp is locked until Cơ bản is fully completed; Cao
  cấp is locked until Trung cấp is fully completed. Rationale: higher-tier
  expression genuinely depends on groundwork laid across *multiple* topics
  in the tier below, not just the same topic's own lower tier.

**5. Concurrency and Free-tier limits — every language fully independent
(no cross-language pooling of any limit):**

- Free: at most **2 languages** learned in parallel.
- Per language: at most **2 domains** in parallel.
- Per (language × domain): **2 units/day**.
- Per language: a **separate** SRS review cap of **30 items/day** (not
  shared across the account's other languages).
- Level, progress, SRS queue, and notifications are all per-language;
  switching language surfaces that language's own SRS/notifications only.
- A lesson **not yet completed** = new learning = **consumes** the daily
  quota. A lesson **already completed** (including via placement-test
  skip) = review = **does not consume** quota (matches the general SRS
  principle that review doesn't spend new-content quota); the UI shows a
  light "you're reviewing, this won't cost a slot" notice *before* the tap
  registers, not after.

**6. Content rule for every Block B lesson (a real authoring constraint, not
just a design note):** because tier movement is free-horizontal, **every
unit within a tier must stand alone — it must not assume any other
topic/unit in the same tier has already been studied.** Foundational
grammar (copula です/ます, counting, etc.) belongs to Core Foundation, and
must never be an *implicit* prerequisite baked into a Block-B unit.

**7. Entry mechanisms (already existing, kept as-is, not redesigned by this
ADR):**
   a. Placement test → opens the correct tier directly; lower tiers are
      marked completed but remain reviewable.
   b. Manual level selection.
   c. Core Foundation (kana) skip button.

**8. Block A ("Những ngày đầu") entitlement split — INITIAL ASSUMPTION,
explicitly not fixed, pending data; also explicitly independent of the
not-yet-decided Plus/Pro/Max tier structure (see 9). Revised 2026-07-18:
classification is by CONTENT IMPORTANCE, not by elapsed time — the earlier
"24-hour hook" framing is retired because it reads as a time-limited trial
that expires, which is not the intent. Free content stays free permanently;
it is not a countdown.**

- **Free (a set of the most essential situations, permanently open, no time
  limit):** airport & immigration, shopping, trains & transit.
- **Plus and above (unlocks the rest of the block):** visa & immigration
  procedures, opening a bank account, phone/SIM registration, renting
  housing, insurance & seeing a doctor, part-time work, police, post office.
- The exact Free-tier situation list above remains an **initial assumption**,
  subject to change once real usage data exists — do not treat the specific
  items as final.

**9. What paid tiers sell — explicitly NOT unit count** (Free already ships
8 units/day across up to 2×2 language/domain slots, which the Project Owner
judges as already generous): remove ads, unlock the "Những ngày đầu"
deep-stock block, remove the language/domain concurrency caps, and advanced
features. **Exact allocation across a Plus/Pro/Max tier structure is
explicitly deferred** — no tier boundaries are decided by this ADR.

**10. Pricing principle for the paid block (principle only, no number
fixed):** value is judged against "cost of hiring an interpreter / attending
a language center," not against "cheapest possible." "Worth the money" means
content that is genuinely usable in a real situation. Because this is the
highest-stakes, most expert-dependent content in the product, it requires
the **strictest review** — a person with lived experience of the actual
situation, **not AI-generated-then-skim-reviewed**. Exact price is deferred
pending data (referenced by the Project Owner as "Gate 6" — see the note in
ADR-017's context on `.claude/commands/build-language.md`'s Phần E table,
where "Gate 6" appears once, undefined; this ADR does not resolve what Gate
6 is, only records that pricing is explicitly gated behind it).

**11. Unit/lesson count per (topic × tier) cell: intentionally left open.**
No multiplication table is frozen on paper; the real count is decided when
the first real content for that cell is authored.

**12. Root design philosophy:** unlike a physical classroom, the app has no
teacher to field an ad-hoc question, so the structure **must** let a learner
pull the exact situation they need on demand rather than being forced through
a rigid linear sequence — the only locking that survives this philosophy is
the cross-tier lock in point 4, justified specifically by genuine grammar/
expression dependency, not by content-ordering preference.

### Explicitly open / assumption-only (do not treat as frozen)

- The working name "Những ngày đầu" for Block A.
- The exact Free/Paid situation split in point 8.
- Any Plus/Pro/Max tier boundary or feature allocation (point 9).
- Any concrete price (point 10).
- Per-cell unit/lesson counts (point 11).
- Ad-supported-vs-ad-free mechanics beyond "paid removes ads."
- The concrete technical id/slug scheme for topics/tiers (point 2b only
  fixes the *principle* — stable id, i18n-only display — not the literal
  strings).

### Consequences

- `curriculum_catalog.json` (all three synced copies) and
  `scripts/lib/daily-life-blueprint.mjs`'s 10-module blueprint remain
  unchanged until a separate, explicitly scoped task replaces them — that
  task must carry its own plan and checkpoints (per the Project Owner's
  standing requirement for this kind of structural change) and must account
  for the ID-stability finding above (Module 1 / Golden Lesson content must
  not be renumbered without a completion-record migration plan; Modules 2–10
  are blueprint-only today and can be freely restructured).
- Block A's "no scroll-window, open access" behavior and Block B's tiered
  scroll-window behavior are two distinct gating mechanisms that must be
  implemented as such, not as one mechanism with a flag — Block A must never
  inherit Block B's tier-lock (point 4) or vice versa.
- Any future placement-test, level-selection, or Core-Foundation-skip work
  must preserve the three existing entry mechanisms (point 7) rather than
  redesigning them.
- Content authoring for Block B must be reviewed against the standalone-unit
  constraint (point 6) — a reviewer must be able to reject a unit for
  assuming cross-topic prior knowledge within the same tier.
- Paid-block content (point 10) requires a human reviewer with real
  situational experience before release; this ADR does not authorize
  AI-authored-and-skim-reviewed content for that block.
- The display-language-purity rule (point 2b) is a real, checkable authoring
  constraint: content review for every display string (topic names, Block A
  marketing copy, and beyond this domain wherever `nativeLanguageCode` text
  is authored) must reject any word borrowed from `learningLanguageCode`,
  even a borrowing that is common in everyday speech among real speakers of
  that native language.
- Does not change ADR-008 (Golden Reference Lesson, still FROZEN), ADR-012
  (Q14), ADR-013/ADR-014 (Unit/Module Comprehensive Conversation), or any
  language-rule ADR (ADR-015/ADR-016/ADR-017).

### Approval

Recorded by Project Owner instruction, 2026-07-18, as a documentation-only
design record. No code or generated-content change is authorized by this
ADR. Implementation requires a separate task with its own plan and
checkpoints, per explicit Project Owner instruction.

## ADR-019 — `five_cards` is a standard, reusable lesson-format mechanism, not a Golden-Lesson-only mechanism

Status: `APPROVED`

### Context

Since ADR-008/Lesson Format 2.0, the `lessonFormat: five_cards` generation
and validation pipeline was wired to exactly one lesson: the Golden
Reference Lesson (`ja-daily_life-m01-u1-l1`). Three places encoded this as a
hard boundary rather than a format contract: the generator
(`scripts/content/daily-life/module-1/helpers.mjs`) triggered the five_cards
branch only via the literal condition
`language === 'ja' && unitIndex === 0 && lessonIndex === 0`; the validator
(`scripts/validate-curriculum.mjs`) ran one function,
`validateApprovedJaUnitOneLesson`, that mixed generic format-shape checks
(five cards, 14 exercises, dialogue group counts, character metadata) with
literal Golden-content checks (exact token ids, exact slot ids, the exact
14-line Tanaka–Sato dialogue, the exact こんにちは casual-opening wording) in
one function gated only by `lesson.id === APPROVED_JA_UNIT1_LESSON1`; and
the smoke test (`scripts/smoke-curriculum-flow.mjs`) had an explicit scope
guard failing unless exactly one lesson used `lessonFormat: five_cards` and
its id was the Golden Lesson's. A future five_cards lesson could not be
added without editing the validator and smoke guard by hand each time.

### Decision

- `lessonFormat: five_cards` (NovaLang Lesson Format 2.0,
  `.cursor/rules/03_novalang_lesson_format_2_0.mdc`, and Format 3.0's Q14
  amendment, `.cursor/rules/04_novalang_lesson_format_3_0.mdc`) is the
  **standard, reusable format contract** for any approved five-card lesson,
  not a mechanism reserved for the Golden Lesson alone.
- **Generation**: `helpers.mjs` looks up approved five_cards source content
  through `FIVE_CARDS_REGISTRY`, keyed by `languageCode` then
  `"${unitOrder}-${lessonOrder}"` (today: `{ ja: { '1-1': JA_UNIT1_LESSON1 } }`).
  Adding a future five_cards lesson is a source-module addition plus exactly
  one registry entry — it does not require editing the generation loop.
- **Validation**: the former `validateApprovedJaUnitOneLesson` is split into
  `validateFiveCardsStructure(lesson)` — the generic structural contract
  (five ordered main cards, 8 vocabulary/8 vocabularyDetails, 3 dialogue
  groups of 4–6 lines, character-metadata completeness and speakerId
  validity, 3 grammar patterns, 14 exercises with the Free 1–10/Plus 11–14
  boundary, Q3/Q9/Q10/Q13/Q14 shape, kanji-requires-reading, no leftover
  draft Vietnamese names) — versus `validateApprovedGoldenLessonContent(lesson)`
  — the literal content lock (exact token ids, exact slot ids, the exact
  14-line dialogue, exact scene-divider fields, the exact こんにちは content),
  called only when `lesson.id === APPROVED_JA_UNIT1_LESSON1`. Every lesson
  with `lessonFormat === 'five_cards'` runs the structural function; only the
  Golden Lesson additionally runs the content-lock function. No existing
  condition was weakened — every check that existed before this split still
  runs for the Golden Lesson; two checks were **generalized**, not loosened:
  `targetLanguage` must equal the lesson's own `languageCode` (previously
  hard-coded to `"ja"`, which would have rejected a correct non-Japanese
  five_cards lesson), and exercise 13 requires a non-empty `unusedTokenIds`
  (previously required the literal id `"konbanwa_distractor"`, which is
  Golden-specific wording now checked only in the content-lock function).
- **Smoke test**: `checkFiveCardsScopeGuard` now requires every
  `lessonFormat: five_cards` lesson to pass a structural check (mirroring
  `validateFiveCardsStructure`'s boundary), instead of requiring exactly one
  lesson with exactly the Golden Lesson's id. `checkApprovedJaUnitOneLesson`
  (the full Golden-content smoke check) is unchanged and still runs only for
  the Golden Lesson at its existing call sites.
- **This ADR authorizes engineering plumbing only.** It does not authorize,
  approve, or pre-clear the creation of any new lesson content. A future
  five_cards lesson still requires: an explicit owner content instruction
  (vocabulary, dialogue, grammar, exercises — nothing may be invented per
  `AGENTS.md`/`novalang.mdc`), full compliance with Format 2.0 for Q1–13 and
  Format 3.0 for Q14, and passing both `validateFiveCardsStructure` and the
  smoke structural guard. The Golden Lesson's own content, stable IDs, card
  count, exercise count, and order remain governed by ADR-008 and are
  unchanged by this ADR.

### Consequences

- `scripts/content/daily-life/module-1/helpers.mjs`,
  `scripts/validate-curriculum.mjs`, and `scripts/smoke-curriculum-flow.mjs`
  are the three files that implement this contract; none of
  `shared/**`, `mobile/novalang_flutter/lib/**`, or `rules/**` were touched
  to make the format reusable — the Flutter/Web render layer already keyed
  off `lesson.lessonFormat == 'five_cards'` generically (confirmed by source
  read before this change) and required no change.
- Verified as a pure refactor for the existing corpus: after the split,
  `npm run generate:curriculum` produced `shared/generated/lessons.json`,
  `courses.json`, and `curriculum_catalog.json` byte-for-byte identical
  (SHA-256) to their pre-change contents, and `npm run validate:curriculum`
  produced output identical to the pre-change baseline (23 courses, 506
  lessons, PASS, same 4 pre-existing soft `rules/` warnings). `npm run
  smoke:curriculum` passed, including the rewritten scope guard.
  `validateFiveCardsStructure` was additionally exercised directly (exported
  for this purpose) against a brand-new, non-Golden, scratchpad-only lesson
  object: a complete minimal five_cards shape passed with 0 errors, and the
  same object with only 7 (not 8) vocabulary items failed with exactly the
  expected single error. `flutter test` could not be run in this session's
  cloud environment (no Flutter SDK available); Flutter/Dart runtime
  re-verification on a machine with Flutter installed remains an open item
  before this task is considered fully closed — see
  `docs/ai/ACTIVE_TASK.md`.
- Future five_cards work should read `FIVE_CARDS_REGISTRY`,
  `validateFiveCardsStructure`, and `checkFiveCardsScopeGuard` as the
  reusable contract surface, and treat `validateApprovedGoldenLessonContent`/
  `checkApprovedJaUnitOneLesson` as Golden-Lesson-only content locks that a
  new lesson never runs.

### Approval

Approved by Project Owner, 2026-07-18, executing the previously reported and
approved generalization plan (registry in `helpers.mjs`, structural/content
validator split, smoke scope-guard change) under this task. The smoke
scope-guard change was explicitly called out in the original plan report as
a real product decision requiring separate confirmation; the Project Owner's
instruction to execute this task explicitly included it.

### Amendment — 2026-07-19: Card 2 vocabulary count is a range, not a fixed 8

**Status:** `APPROVED`

**Context:** `validateFiveCardsStructure`'s Card 2 check
(`scripts/validate-curriculum.mjs`, then line ~922) required
`lesson.vocabulary.length === 8` and `fiveCardContent.vocabularyDetails.length
=== 8` for every five_cards lesson. That literal "8" was never a documented
Format 2.0/3.0 product requirement — `.cursor/rules/03_novalang_lesson_format_2_0.mdc`'s
Card 2 section only says to preserve the approved source's vocabulary
data/order, with no numeric count. The "8" was the Golden Lesson's own actual
vocabulary count, which leaked into this function as a hard-coded literal
when this ADR generalized it for reuse beyond Golden. Content authors, not
this validator, should decide how many vocabulary cards a given lesson needs.

**Decision:** Replace the fixed `=== 8` check with a range: **minimum 6,
maximum 15** vocabulary cards. `lesson.vocabulary` and
`fiveCardContent.vocabularyDetails` must still have the exact same count as
each other, and must match ids 1-1 in the same order — only the total count
became flexible; the pairing between the two arrays is still hard-enforced
(a new check, not present before, since the prior fixed-8-on-both-arrays
check made an explicit id-pairing check redundant — with a range, count
alone no longer guarantees the two arrays describe the same cards).

**Consequences:**
- Golden Lesson (8 vocabulary cards) is unaffected — 8 sits well inside
  [6, 15] — verified by re-running `validate:curriculum`/`smoke:curriculum`
  against the real generated output (see `docs/ai/ACTIVE_TASK.md`
  2026-07-19 entry): identical numbers to the pre-change baseline (35
  courses, 172 lessons, same 4 pre-existing soft warnings), and no
  `shared/generated/**` file changed (this was a validator-only edit; the
  generator was not touched).
- Verified in isolation against the new range logic directly (copy-tested,
  not just read): 5 → fail (below min), 6 → pass, 8 → pass (Golden's real
  shape), 10 → pass, 15 → pass (at max), 16 → fail (above max); a
  count-mismatch between `vocabulary`/`vocabularyDetails` and a same-count
  id-order mismatch both correctly fail with their own distinct messages.
- A future five_cards lesson (e.g. a Plus lesson needing more vocabulary
  than Golden's 8) may now use any count from 6–15 without needing a
  validator change; going outside that range is still a real, deliberate
  guard (an accidentally near-empty or absurdly bloated Card 2), not a
  Golden-derived accident.

**Approval:** Approved by Project Owner, 2026-07-19, who identified the
"exactly 8" check as a Golden-derived implementation accident rather than an
intended product rule, and specified the 6–15 range along with the
requirement to keep `vocabulary`/`vocabularyDetails` paired.

## ADR-020 — Daily Life domain: 10-module blueprint replaced by 15-topic × 3-tier skeleton (en+ja), old non-Golden Module 1 content removed

Status: `APPROVED / IMPLEMENTED (SKELETON ONLY — NO NEW LESSON CONTENT AUTHORED)`

### Context

ADR-018 recorded the 15-topic × 3-tier design direction for the Daily Life
domain as `NOT FROZEN / IMPLEMENTATION NOT STARTED`. Before implementing it,
the Project Owner asked for a read-only scope report: what would break, what
would be orphaned, and what the real language footprint of the existing
10-module blueprint (`scripts/lib/daily-life-blueprint.mjs`) actually was.

That investigation found: (a) the blueprint is generated for exactly two
languages, `en` and `ja` (two literal calls in
`scripts/generate-curriculum.mjs`, not a loop) — `vi`/`zh` have FROZEN
linguistic rules but zero lesson content of any kind and are untouched by
this domain; (b) of Module 1's 8 units (24 lessons/language), only Unit 1
("Chào và nói tên", containing the Golden Lesson) and Unit 6 ("Thanks, sorry,
politeness") mapped cleanly onto the approved 15-topic list — the other 6
units (nationality/origin, language-learning talk, simple check-ins, "when
you don't understand", scattered info questions, first-conversation/shopping)
did not correspond to any single new topic; (c) Modules 2–10 were always
blueprint-only placeholder lessons (`contentStatus: "blueprint"`, no real
Q&A), never real content; (d) `FIVE_CARDS_REGISTRY`
(`scripts/content/daily-life/module-1/helpers.mjs`) resolved Golden Lesson
content by raw array position (`` `${unitIndex+1}-${lessonIndex+1}` ``) — a
real silent-mismatch risk if units were ever reordered; (e)
`placement_policy.json` and `LevelId` have no module/domain awareness at all
and are unaffected by any of this.

### Decision

- The prior 10-module × 8-unit × 3-lesson blueprint is replaced **entirely**
  by a 15-topic list (order 1–15, matching ADR-018's approved names), each
  topic split into 3 tiers (`basic` / `intermediate` / `advanced` — Cơ bản /
  Trung cấp / Cao cấp). A tier is its own block of units, never a
  sub-division inside one unit.
- **Scope, explicitly decided by the Project Owner:** `vi`/`zh` are **not
  touched** — connecting them to this domain is a separate, future decision.
  `en` and `ja` both get the new 15-topic skeleton (since both were already
  generated by the old blueprint).
- **Golden Lesson (`ja-daily_life-m01-u1-l1`) is kept, unchanged, ID
  unchanged.** It becomes Topic 1 ("Chào hỏi & làm quen") / Tier Cơ bản /
  Unit 1 / Lesson 1. Its lesson content, vocabulary, dialogue, grammar, and
  all 14 exercises are byte-for-byte identical to before this task (verified
  by direct JSON diff against the last committed `lessons.json`, not
  assumed). The `moduleId` string `daily_life_m01_basic_social_survival` is
  also kept unchanged (reinterpreted as "Topic 1", not renamed) — this is
  the "keep the ID, reinterpret the meaning" option the Project Owner chose
  specifically to avoid the 34-file/ADR-008 ID-change blast radius reported
  earlier.
- **Everything else is deleted, not migrated.** Module 1's other 23 ja +
  246 en generic lessons (Units 2–8, including Unit 6 which did map cleanly
  to the new Topic 15 but was not special-cased — the Project Owner's
  instruction was to drop all non-Golden Module 1 content without exception)
  and all of Modules 2–10's blueprint-placeholder lessons for both languages
  are gone. Topics 2–15 (both languages) and Topic 1's `en` slot are **empty
  course shells** (`units: []`, `contentStatus: "blueprint"`,
  `playable: false`) — an intentionally valid, non-error state, not a
  placeholder-populated blueprint the way Modules 2–10 used to be. The
  generic-content authoring helpers in `helpers.mjs` (`vocab`,
  `buildDialogueGroups`, `exercises`, and their sub-helpers) and their data
  sources (`content.mjs`, `dialogues.mjs`) are now unreferenced by the
  generator; they were **not deleted from disk**, in case any of their raw
  vocabulary/dialogue material is reusable when real content is written for
  a future topic — a follow-up decision, not resolved here.
- **`FIVE_CARDS_REGISTRY` is now keyed by the final resolved lesson id
  string** (e.g. `'ja-daily_life-m01-u1-l1'`), never by array position. Each
  unit/lesson in the blueprint now carries an explicit `order` field (and
  each unit an explicit `tier`) that is used to compute the id — reordering,
  inserting, or removing an entry elsewhere in the arrays can no longer
  silently change which content a registry entry resolves to; a stale or
  mismatched key now simply resolves to nothing (an empty slot), never to
  the wrong lesson.
- `assertDailyLifeBlueprintShape()` (`daily-life-blueprint.mjs`) and the
  Daily Life sections of `validate-curriculum.mjs` and
  `smoke-curriculum-flow.mjs` no longer enforce the old fixed 10×8×3/240
  counts. They enforce: exactly 15 topics per language (a real fixed
  invariant — the topic *count* does not grow, only topic *content* does);
  every unit/lesson `order` is an explicit positive integer, unique within
  its parent; every unit's `tier` is valid; a course's
  `ready+playable` vs `blueprint+non-playable` status matches whether it
  actually has units; and a created unit must have at least one lesson (an
  empty topic is valid, an empty *unit* is not — it should not have been
  created). Total daily_life lesson/course counts are no longer fixed magic
  numbers (they would need updating every time content is added); they are
  now self-consistency checks (total = foundation + daily_life, playable
  count matches what lessons themselves declare).
- This ADR does **not** amend ADR-008. Every field ADR-008 actually freezes
  (id, format, five main cards, 14 exercises, content/order/flow/metadata/
  resume/wrong-answer behavior) is unchanged and was verified unchanged, not
  assumed — see Consequences. What changed is Golden's *container* (it now
  has 1 sibling-less unit instead of 3 lessons in its unit, and the
  surrounding course/topic title changed from "First Conversations" to
  "Chào hỏi & làm quen" / "Greetings & Getting Acquainted"), which ADR-008
  does not govern.

### Consequences

- Verified end to end in this session: `npm run generate:curriculum`
  produced **33 courses, 27 lessons** (down from 23 courses/506 lessons) with
  no thrown error; `npm run validate:curriculum` **PASS** with the exact
  same 4 pre-existing soft `rules/` warnings as the pre-restructure baseline,
  no new ones; `npm run smoke:curriculum` **PASS**, including the Golden
  Lesson's full content-lock check (`Approved Japanese Daily Life Unit 1
  Lesson 1: 2 pass, 0 fail`) and the five_cards structural scope guard
  (`Five-cards scope guard: 2 pass, 0 fail`, ADR-019).
  `ja-daily_life-m01-u1-l1`'s lesson object was diffed directly against the
  last committed `shared/generated/lessons.json` and is byte-for-byte
  identical.
- Real numbers, before → after: Daily Life courses 20 (10 modules × 2
  languages) → 30 (15 topics × 2 languages); Daily Life lessons 480 (240 ×
  2) → 1 (Golden only, `ja`); total curriculum lessons 506 → 27; total
  courses 23 → 33 (foundation's 3 courses unchanged). `en`'s Topic 1 has
  zero units (no five_cards content exists for `en`), consistent with every
  other empty topic — this was an explicit Project Owner decision, not
  something inferred.
- `generate-curriculum.mjs`'s `catalog.architecture.dailyLifeCommunication`
  metadata block (`moduleCount`/`unitsPerModule`/`lessonsPerUnit`/
  `lessonsPerLanguage`) is replaced with `topicCount: 15` and an updated
  note; nothing else in that file changed.
- `flutter test` could not be run in this session's cloud environment (same
  known constraint as ADR-019); no `.dart` file was touched by this task.
  The Flutter/React rendering layers were checked for empty-course/
  empty-unit safety before implementation (not assumed): a course with
  `units: []` never gets a `CurriculumModuleGroup` built for it
  (`CurriculumModuleGroup.fromUnits` groups by iterating real `CourseUnit`
  objects, so an empty course silently produces no card — confirmed by
  source read, `mobile/novalang_flutter/lib/models/course_unit.dart`), and
  the daily-life module card's progress calculation already guards divide-
  by-zero (`total > 0 ? completed / total : 0.0`,
  `daily_life_module_card.dart`). Real on-device/browser confirmation
  remains the Project Owner's own gate, as with every other task in this
  file.
- Future topic/tier content authoring must add an explicit `order`
  (unit-level) and `order` (lesson-slot-level) plus `tier`, register any new
  five_cards lesson in `FIVE_CARDS_REGISTRY` by its final id string (not by
  position), and follow the same owner-content-approval process as any other
  lesson (`AGENTS.md`/`novalang.mdc` — this ADR authorizes structural
  plumbing only, not new lesson content).
- `placement_policy.json` and `LevelId`/level-mapping code were confirmed
  unaffected (no module/domain awareness in either) and were not touched.

### Approval

Approved by Project Owner, 2026-07-18, after a dedicated read-only scope
report (language footprint, orphan risk, ID-collision risk) and an explicit
scope decision (vi/zh untouched; en gets the same empty skeleton as ja; all
non-Golden Module 1 content and all Module 2–10 blueprint content dropped,
not migrated). Per the Project Owner's explicit instruction, ADR-008 itself
was not modified — this ADR was written to record the change and confirms no
ADR-008-governed field required amendment.

## ADR-021 — Daily Life domain: 16-module × 3-tier skeleton, Cơ bản tier fully named (33 units / 73 lessons)

Status: `APPROVED / IMPLEMENTED (SKELETON ONLY — NO NEW LESSON CONTENT AUTHORED)`

### Context

ADR-020's 15-topic × 3-tier skeleton left every topic except Topic 1 as a
fully empty `units: []` shell. The Project Owner subsequently supplied a
complete, spelled-out Cơ bản (basic) tier structure — 16 modules, each with
named units and named lessons, exact Vietnamese titles for every one — and
requested it replace the 15-topic skeleton, with Trung cấp (intermediate)
and Cao cấp (advanced) remaining a valid empty shell per module. The
Project Owner's own task message contained an internal inconsistency (a
header summary of "35 unit · 82 lesson" that did not match a manual count
of "33 unit · 73 lesson" from the same message's fully detailed
module-by-module list); per standing instruction to stop rather than guess
on this kind of discrepancy, the mismatch was reported before any file was
edited. The Project Owner confirmed the detailed list (33 units / 73
lessons) was correct and the header was a summation error.

### Decision

- Replace the 15-topic empty-shell `DAILY_LIFE_MODULES` (ADR-020) with a
  16-module structure. Every module's Cơ bản tier is now fully named: real
  unit titles and real lesson titles (5-locale `titleByNative`, no
  target-language sentence content), totaling exactly 33 units and 73
  lesson slots across the 16 modules. Trung cấp and Cao cấp remain a valid,
  intentional empty shell for every module — no `unit(...)` entries with
  `tier: 'intermediate'`/`'advanced'` exist yet. `TIER_LEVELS` already
  declares all three tiers structurally, independent of what content
  exists, so this is not a schema change — it is the same "absence is
  valid" pattern ADR-020 already established, now applied per-tier instead
  of per-topic.
- Progression principle for Trung cấp/Cao cấp, recorded verbatim per
  Project Owner instruction for when that content is eventually authored:
  Trung cấp và Cao cấp dựa trên cùng chủ đề của Cơ bản, nâng độ mạch
  lạc/trơn tru (fluently), keigo tăng dần (Cơ bản teineigo → Trung cấp chia
  thể → Cao cấp đầy đủ + kết hợp). Unit/lesson cụ thể chốt sau khi có nội
  dung Cơ bản thật.
- Exactly ONE lesson slot across the entire 16-module × 2-language skeleton
  resolves to real, playable content: Module 1 / Unit 1 / Lesson 1 (ja),
  the Golden Reference Lesson (ADR-008), unchanged, byte-for-byte identical
  to before this task. Every other lesson slot — including Module 1's own
  3 new named siblings and the same slot for `en` (which has no Golden
  Lesson) — is a named BLUEPRINT placeholder: a real title, no real
  exercise/dialogue/vocabulary content yet.
- A course's `contentStatus`/`playable` is derived from whether it actually
  contains a ready lesson, not from whether it has units. This is a
  necessary correction from ADR-020's derivation (`hasUnits` as the
  ready/playable proxy), which stops being valid once every module has
  named units regardless of whether any of their lessons are real.
- Module 1's `moduleId`, the Golden Lesson's id
  (`ja-daily_life-m01-u1-l1`), and its containing unit id
  (`ja-daily_life-m01-u1`) are unchanged. The unit's own title is
  intentionally renamed from ADR-020's "Chào và nói tên" to the Project
  Owner's new approved title "Làm quen lần đầu" (rendered with its unit-number
  prefix as "Bài 1: Làm quen lần đầu" in the generated Vietnamese
  `titleByNative`), because the unit now spans 3 lessons (Golden + 2 new
  named siblings) instead of Golden alone — this rename is authorized by
  this ADR and does not touch any ADR-008-governed field (Golden's own
  lesson object, not its containing unit's title, is what ADR-008 freezes).

### Engineering changes (mechanism, not content)

- `FIVE_CARDS_REGISTRY` continues to resolve by the lesson's final id string
  (ADR-019/ADR-020's fix), never by array position.
- The generator's Module-1 special case (`buildReadyModuleOne`, routed
  through a dedicated function) is replaced by one unified loop in
  `buildDailyLifeCourses`, used identically for all 16 modules: every
  lesson slot first tries `resolveApprovedFiveCardsLesson` (extracted from
  `buildReadyModuleOne`'s lesson-building logic, field construction
  unchanged); when it returns `null`, a named placeholder lesson is built
  from the slot's own `titleByNative` instead. `buildReadyModuleOne` itself
  is left on disk, unreferenced, matching the ADR-020 precedent for
  superseded-but-not-deleted helpers.
- A bare `{ order: N }` slot (no `titleByNative`) is reserved for a lesson
  meant to resolve through the registry; if it fails to resolve for a given
  language, generation now fails loudly with a clear error naming the exact
  module/unit/lesson, instead of silently skipping the slot (ADR-020's
  behavior) or fabricating content. This surfaced one real, expected gap
  during implementation: the Golden slot has no `en` registry entry (Golden
  is ja-only), so it was given a named placeholder title too — for `ja` the
  registry lookup still wins and that title is never read; for `en` it
  correctly becomes an ordinary named blueprint placeholder instead of
  silently vanishing.
- Unit container titles are now always taken from the blueprint's own
  `unitDef.titleByNative`, never from the Golden source file's bundled
  `approved.unit` override (which existed only to let `buildReadyModuleOne`
  special-case Module 1's unit title). This override mechanism is retired
  from the generation path entirely, not just for Module 1.

### Consequences

- Generated output: 35 courses (3 Core Foundation + 32 daily_life = 16
  modules × 2 languages), 172 lessons (26 Core Foundation + 146 daily_life =
  73 × 2 languages), 27 playable (26 Core Foundation + 1 Golden Lesson).
  Verified via direct query of the generated output, not assumed from the
  module/unit/lesson counts alone.
- `npm run validate:curriculum` and `npm run smoke:curriculum` both PASS
  with the same 4 pre-existing soft `rules/` warnings and zero new errors;
  both scripts' Daily Life sections were updated for the 16-module count and
  two real pre-existing bugs were fixed in the same edit: a moduleId-based
  "every Module 1 lesson must be ready" check (would have wrongly failed
  Module 1's new non-Golden siblings) corrected to gate on the Golden
  Lesson's own id, and a "has units ⇒ ready" course check corrected to "has
  a ready lesson ⇒ ready" for the reason above.
- `flutter test` could not be run in this session's cloud environment (no
  Flutter SDK); no `.dart` file was touched by this task. Real `flutter
  test` verification on a machine with Flutter installed remains required —
  see `docs/ai/ACTIVE_TASK.md`.
- Future content authoring for Trung cấp/Cao cấp must follow the
  progression principle recorded above and the same owner-content-approval
  process as any other lesson content (this ADR authorizes structural
  skeleton only).
- Does not amend ADR-008, ADR-018, ADR-019, or ADR-020 (ADR-020's own record
  of the 15-topic skeleton is retained for history; this ADR supersedes only
  its `DAILY_LIFE_MODULES` content, not its reasoning about scope/language
  footprint, which still applies).

### Approval

Approved by Project Owner, 2026-07-19, with the exact 16-module / 33-unit /
73-lesson Cơ bản structure supplied in full, after the header/detailed-list
discrepancy above was reported and resolved by explicit confirmation. Golden
Lesson byte-identity, registry ID-based resolution, and Trung cấp/Cao cấp as
a valid empty shell were all explicit, binding requirements of that
instruction and are verified in `docs/ai/ACTIVE_TASK.md`.
