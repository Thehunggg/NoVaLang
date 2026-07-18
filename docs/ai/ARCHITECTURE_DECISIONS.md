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
