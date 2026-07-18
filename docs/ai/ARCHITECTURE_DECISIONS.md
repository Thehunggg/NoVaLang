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
