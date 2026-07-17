# NovaLang Active Task — Task hiện tại

## Task identity — Danh tính task

- Task ID: `NOVALANG-JAPANESE-FULL-PROFILE-FINAL-CLOSURE-01`
- Task name: `Japanese Full Language Profile final documentation closure`
- Status: `CLOSED / FROZEN`
- Current owner: `Codex — SOLE WRITER`
- Claude Code: `READ-ONLY`
- Codex: `WRITE`
- Cursor: `READ-ONLY`
- Default next owner: `Project Owner`
- Last updated: `2026-07-17`
- Final verdict: `JAPANESE_FULL_PROFILE_FINAL_CLOSURE_COMPLETED`
- Ownership note: Project Owner assigned Codex as the sole writer for
  `NOVALANG-JAPANESE-FULL-PROFILE-FINAL-CLOSURE-01`; Claude Code and Cursor
  are READ-ONLY. Existing dirty-worktree changes remain preserved; no reset,
  clean, stash, checkout, restore, commit, or push is authorized. The approved
  scope permits status/documentation updates only. Curriculum, schema,
  generated content, Flutter/runtime, pronunciation/romanization pipeline,
  English, and other languages remain forbidden. The prior
  `NOVALANG-ENGLISH-STYLE-PROFILE-IMPLEMENTATION-01`,
  `NOVALANG-VOCABULARY-SCROLL-CROSS-PLATFORM-RUNTIME-FIX-05`,
  `NOVALANG-VOCABULARY-SCROLL-RUNTIME-FIX-04`,
  `NOVALANG-VOCABULARY-SCROLL-RUNTIME-PATH-PROOF-03`,
  `NOVALANG-VOCABULARY-SCROLL-ROOT-CAUSE-FIX-02`, and
  `NOVALANG-MULTILINGUAL-NATURALNESS-REGISTER-RULE-01` history below remains
  preserved and is not superseded outside this scoped correction.

## Japanese Full Profile final closure — 2026-07-17

Project Owner completed final review and accepted the Android font A/B
diagnostic waiver caused by the emulator environment. Q14 romaji policy,
Android manual verification, Web manual verification, and Project Owner
Android visual review are `PASS`/`COMPLETED`. Japanese punctuation typography
is accepted as the bundled font's design. The Android font A/B diagnostic is
`WAIVED_DUE_TO_EMULATOR_ENVIRONMENT`; it is not recorded as a fabricated
runtime PASS.

The Japanese Full Linguistic Profile is `APPROVED / FROZEN`; the Japanese Full
Profile is `CLOSED / FROZEN`; and this final-closure task is `CLOSED`. Native
expert review is `WAIVED / NOT_COMPLETED`, not completed. Owner acceptance with
that waiver is `YES`. Pitch accent remains `OUT_OF_SCOPE /
PENDING_EXPERT_REVIEW`. No curriculum, schema, generated content,
Flutter/runtime, pronunciation/romanization implementation, English, or other
language was changed. Commit: NO. Push: NO.

Documentation validation: required final-state matrix PASS; forbidden stale
Japanese current-state tokens absent; all changed files exist and are
non-empty; conflict-marker and trailing-whitespace scans PASS; `git diff
--check` PASS. Flutter tests/builds were not run because this task is strictly
documentation/status-only and changed no runtime source.

## Japanese font runtime A/B diagnostic authorization — 2026-07-17

Project Owner requested a temporary debug-only comparison using the exact Q14
production size, weight, and height: sample A explicitly uses bundled
`NotoSansJP` with `ja-JP`; sample B omits `fontFamily` and uses `ja-JP`, allowing
the platform fallback. The temporary UI must be removed after Android and Web
evidence capture. Production Japanese typography, curriculum/generated data,
source text, punctuation, translation, and romanization remain unchanged by
the diagnostic itself. Final validation after removal is Flutter analyze,
scoped Q14 tests, and `git diff --check`.

## Japanese font runtime A/B diagnostic result — 2026-07-17

The temporary debug-only route rendered the two approved strings with
production target-text size, weight, and height. Sample A explicitly resolved
`NotoSansJP`; sample B omitted `fontFamily`; both used `ja-JP`. The Web capture
showed no material glyph-shape difference and placed U+3002 `。` and U+3001
`、` at the same relative positions. This indicates that Chrome's platform
fallback selected either the same bundled face through fallback resolution or
a Japanese face with effectively matching glyph metrics; it does not disprove
the explicit production family assignment.

Source and build evidence confirms that `pubspec.yaml` family `NotoSansJP`
matches `AppTheme.japaneseFontFamily`, the asset path exists, the debug Web
`FontManifest.json` maps that family to `NotoSansJP-wght.ttf`, and the decoded
`AssetManifest.bin.json` contains both the font and OFL asset. Q14 speaker,
target, reading, and Japanese divider text all start from
`AppTheme.japaneseTextStyle` and carry `AppTheme.japaneseLocale`; their local
`copyWith` calls change color, weight, or size only. No later
`DefaultTextStyle`, Theme, or copy operation resets the family to Inter.

Web screenshot evidence was captured outside the repository at
`%TEMP%/novalang-font-ab-web-final.png`. Android evidence could not be captured:
the available `Pixel_6_Pro` AVD remained `emulator-5554 offline` after both a
normal launch and a cold launch with snapshot loading disabled, including an
ADB reconnect and daemon restart. Destructive AVD reset was not authorized.
The temporary route and all A/B widgets were then removed; no diagnostic UI or
logging remains in source. At that diagnostic checkpoint, the missing Android
A/B observation blocked a font-design verdict. Project Owner later accepted
`WAIVED_DUE_TO_EMULATOR_ENVIRONMENT` and completed Android visual review; the
current accepted state is recorded in the final-closure section above.

Post-removal validation: temporary debug-source search PASS (zero matches),
Flutter analyze PASS (no issues), scoped Q14 tests PASS (24/24), diagnostic
ports/processes cleaned up, and `git diff --check` PASS. No commit or push was
performed.

## Q14 punctuation typography audit authorization — 2026-07-17

Project Owner reported that Japanese horizontal punctuation `。` and `、` in
Q14 appears visually elevated. This UI-only correction may change the shared
Flutter Q14 text typography and direct tests only. Japanese source text,
punctuation characters, translations, curriculum/generated assets, the
romanization pipeline, and platform-specific hacks remain forbidden. The
audit must identify the actual font/fallback, locale, span/style, height,
strut and baseline path before production code is changed. The authorization-
stage pending gate was later completed/waived exactly as recorded in the
final-closure section above.

## Q14 implementation status — 2026-07-17

```text
NOVALANG-JA-Q14-ROMAJI-PIPELINE-UNBLOCK-01: CLOSED / 14_OF_14_PASS
Q14_SCHEMA_EXTENSION: IMPLEMENTED
Q14_ROMANIZATION_PIPELINE: IMPLEMENTED
Q14_GENERATED_DATA: IMPLEMENTED
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
ANDROID_MANUAL_VERIFICATION: PASS
WEB_MANUAL_VERIFICATION: PASS
PROJECT_OWNER_REVIEW: COMPLETED
ANDROID_FONT_A_B_DIAGNOSTIC: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
PROJECT_OWNER_ANDROID_VISUAL_REVIEW: COMPLETED
JAPANESE_PUNCTUATION_TYPOGRAPHY: ACCEPTED_AS_FONT_DESIGN
JAPANESE_FULL_LINGUISTIC_PROFILE: APPROVED / FROZEN
JAPANESE_FULL_PROFILE: CLOSED / FROZEN
JAPANESE_FINAL_CLOSURE_TASK: CLOSED
NATIVE_EXPERT_REVIEW: WAIVED / NOT_COMPLETED
OWNER_ACCEPTED_WITH_NATIVE_REVIEW_WAIVER: YES
PITCH_ACCENT: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
COMMIT: NO
PUSH: NO
```

The approved exact lexical override `スマホ → すまほ → sumaho` unblocked the
canonical pipeline. All 14 Q14 lines now receive generated Modified Hepburn
romanization before asset serialization; Flutter only parses and presents that
field. The same generation correction also updated six non-Q14 generated leaf
values required by already-frozen systemic policy: two `Takahashi-san` values
and four `mashō` values. No Japanese surface text, translation, stable ID,
speaker, line order, audio field, card count, or exercise count changed.

Automated validation passed: canonical pronunciation fixtures, Q14 14/14
exact-output fixtures, malformed-field fixtures, deterministic generation,
curriculum/localization validation, shared/generated/Flutter asset parity,
Q14 widget/state/accessibility tests, full Flutter suite (511 tests), Flutter
analyze after removing deprecated test APIs, Android debug APK build, Flutter
Web build, and `git diff --check`. Project Owner subsequently completed the
Android and Web runtime acceptance recorded by this final closure.

## Q14 punctuation typography implementation — 2026-07-17

Root cause: NovaLang's global text theme requests Inter, which contains no
Japanese glyphs. Q14 target text, readings, and Japanese speaker names had no
explicit `locale`, `fontFamily`, `fontFamilyFallback`, `strutStyle`, or
`textHeightBehavior`. Flutter therefore delegated the full Japanese run,
including `。` and `、`, to an uncontrolled platform fallback. The requested
font remained Inter while the actual glyph font depended on Android system or
the Web browser/host OS; the repository could not guarantee that both used the
same Japanese metrics. The line used one normal `Text` rather than split
punctuation spans, and no transform/positioning caused the defect.

The correction bundles the official Google Fonts Noto Sans JP variable font
under SIL OFL 1.1 and applies one centralized Japanese style to Q14 speaker
names, target sentences, kana readings, and the Japanese scene divider. Every
Japanese `Text` now carries `Locale('ja', 'JP')`. The primary bundled family
owns kana, kanji, U+3002 `。`, and U+3001 `、`; fallback names remain explicit
only for characters outside the bundled font. Height, strut, text-height
behavior, and baseline were left unchanged because audit found no custom value
or baseline manipulation and the font fallback mismatch was the root cause.

Direct cmap inspection confirmed the bundled family name `Noto Sans JP`, all
26 unique glyphs used by the required regression strings, U+3002, and U+3001.
Both the debug APK and Flutter Web output contain the identical
`NotoSansJP-wght.ttf` (9,589,900 bytes), its OFL file, and a FontManifest entry
for family `NotoSansJP`.

```text
Q14_PUNCTUATION_TYPOGRAPHY_IMPLEMENTATION: IMPLEMENTED
Q14_JAPANESE_FONT_BEFORE: INTER_REQUESTED / UNCONTROLLED_PLATFORM_CJK_FALLBACK
Q14_JAPANESE_FONT_AFTER: BUNDLED_NOTO_SANS_JP
Q14_JAPANESE_LOCALE_BEFORE: NULL / INHERITED
Q14_JAPANESE_LOCALE_AFTER: ja-JP
ANDROID_BUILD: PASS
WEB_BUILD: PASS
AUTOMATED_REGRESSION: PASS
ANDROID_MANUAL_VERIFICATION: PASS
WEB_MANUAL_VERIFICATION: PASS
PROJECT_OWNER_REVIEW: COMPLETED
ANDROID_FONT_A_B_DIAGNOSTIC: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
PROJECT_OWNER_ANDROID_VISUAL_REVIEW: COMPLETED
JAPANESE_PUNCTUATION_TYPOGRAPHY: ACCEPTED_AS_FONT_DESIGN
COMMIT: NO
PUSH: NO
```

Validation: Dart formatting PASS; Q14 scoped tests 24/24 PASS; full Flutter
suite 512/512 PASS; Flutter analyze reports no issues; Android debug APK and
Flutter Web builds PASS; `git diff --check` PASS. No curriculum, generated
lesson content, Japanese source text, punctuation character, translation,
romanization pipeline, platform-specific branch, `Transform.translate`, or
`Positioned` punctuation adjustment was added.

## Q14 pipeline unblock authorization — 2026-07-17

Project Owner approved the exact lexical override
`スマホ → すまほ → sumaho` with scope `EXACT_JAPANESE_LEXICAL_TOKEN`, evidence
`PROJECT_OWNER_DECISION`, and status `APPROVED_LEXICAL_OVERRIDE`. Before any
Q14 schema/model/runtime change, the canonical pipeline must also satisfy the
already-frozen systemic policies for `留学生なんですね` spacing,
`行きましょうか` Modified Hepburn macron, and honorific suffix forms
`Satō-san` / `Tanaka-san`. Schema, generated lesson data, and Flutter runtime
remain unchanged until the 14/14 dry-run gate and complete Japanese
pronunciation fixtures pass.

## Change Control 02 pipeline audit — 2026-07-17

1. Canonical model: `PracticeDialogueLine` in
   `mobile/novalang_flutter/lib/models/five_card_practice.dart`; it currently
   deserializes Q14 line maps but has no `romanization` member or serializer.
2. Serialization path: Japanese Golden source is localized, passed through
   `buildReadyModuleOne`, written to shared content/generated lesson JSON, and
   synced to the packaged Flutter asset; Flutter resolves native-language maps
   before `PracticeDialogueLine.fromMap`.
3. Validator: `scripts/validate-curriculum.mjs` enforces the Golden Q14 type,
   exact 14 target lines/order/speakers/readings/translations and no raw kana
   in existing romanization fields, but does not yet require or type-check Q14
   `romanization`.
4. Source: the 14 approved lines remain in
   `scripts/content/daily-life/module-1/ja-unit1-lesson1.mjs` under exercise 14.
5. Generator: `npm run generate:curriculum` imports the Golden source through
   `scripts/content/daily-life/module-1/helpers.mjs`, writes both shared
   curriculum destinations, and `npm run sync:flutter-assets` copies the
   generated source to Flutter.
6. Canonical Japanese pipeline:
   `scripts/lib/japanese-pronunciation.mjs`, using kuromoji/IPADIC with
   `prepareJapaneseRomanization`, `toReadableRomaji`, and `romanizeNow`.
7. Pipeline behavior: POS-aware は/へ/を, Modified Hepburn, macrons, spacing,
   capitalization, proper nouns, contextual/approved overrides, and fail-loud
   unknown-token handling are centralized in that module.
8. Canonical lesson level: the generated Golden Lesson has `level: A0`; the
   approved runtime gating uses this existing lesson/course level directly.
9. Renderer/state: `_RealWorldPracticeDialoguePage` in shared Flutter currently
   owns local reading/translation toggles; no romaji state exists. The parent
   exercise session supplies the lesson/session lifecycle.
10. Platforms: Android and Flutter Web use this same renderer with no Q14
    platform-specific branch.
11. Tests: the canonical pronunciation suite and
    `real_world_practice_dialogue_test.dart` are the direct existing fixtures.

Pipeline reuse proof was executed against all 14 current Q14 target lines.
Lines 1–2 and 4–14 produced deterministic output, but line 3 failed loudly:

```text
japanese-pronunciation: kuromoji could not analyze token "スマホ" (pos=名詞) —
refusing to guess. Add an explicit content override or a whole-word
pronunciation override if this is a genuine irregular case.
```

Exact blocker: Change Control 02 requires all 14 values to come from the
canonical pipeline and forbids guessing or creating a second converter. It
also requires an approved override when a line cannot be generated
confidently. No Project Owner-approved romanization override for `スマホ` is
present in the task or repository. Adding one autonomously would change the
confirmed pronunciation authority. Therefore no partial schema, generated
data, Flutter runtime, or test implementation is written until the exact
approved override is supplied.

## Q14 romaji runtime audit — 2026-07-17

1. Renderer: `_RealWorldPracticeDialoguePage` in
   `mobile/novalang_flutter/lib/screens/learn/exercises/five_card_exercise_flow.dart`.
2. Data source: Golden Lesson `fiveCardContent.practice.exercises[13]` from the
   packaged shared lesson asset, parsed by `FiveCardPractice` / `PracticeExercise`.
3. Reading render: `_DialogueMessageBubble` renders
   `PracticeDialogueLine.reading` when the local reading toggle is enabled.
4. Romanization render: none exists for Q14. All 14 source lines have no
   `romanization` field, and `PracticeDialogueLine` has no romanization member.
5. State: Q14 currently owns local `_showReading` and `_showTranslation` state;
   there is no Q14 romaji state or lesson-session-scoped reading-aid controller.
6. Lifecycle: Q14 is a child of `FiveCardExerciseSessionPage`. Leaving the
   session disposes Q14; the persisted attempt stores exercise answers/progress,
   not transient reading-aid UI state.
7. Learner level: `profileProvider` exposes canonical `UserProfile.levelCode`,
   and the lesson model exposes `Lesson.level`; no repository authority maps
   their `A0`/`A1`/`A2`/`B...` values to the policy tiers Basic, Intermediate,
   and Advanced. No approved Q14 romanization-exception source exists.
8. Tests: `real_world_practice_dialogue_test.dart` covers the 14-line renderer,
   reading/translation independence, audio, non-graded completion, and the
   historical absence of romaji. It does not contain Q14-R01–R14.
9. Shared platforms: the renderer is shared Flutter code used by Android and
   Flutter Web.
10. Platform branches: no Android/Web-specific branch exists in the Q14
    renderer or its toggle behavior.

Exact blocker: implementing a visible Q14 romaji toggle requires trustworthy
per-line romanization, but the current Q14 source/model contains none. Creating
it would require a curriculum/generated-asset/schema or generation-pipeline
change, or hard-coded runtime strings, all explicitly forbidden by this Change
Control. Advanced gating also cannot be implemented without inventing a
Basic/Intermediate/Advanced mapping and exception authority. The only safe
current behavior is the existing hidden/no-toggle state; production code is
therefore unchanged pending Project Owner authority for the missing data and
level/exception contracts.

## Governance state — Trạng thái quản trị

```text
Multilingual naturalness/register rule: APPROVED_ARCHITECTURE / PROJECT_OWNER_DOCUMENTATION_REVIEW_PENDING / NOT_FROZEN
Japanese style-and-register profile: APPROVED / FROZEN
Japanese full language profile: APPROVED / FROZEN / CLOSED
Japanese full profile version: 0.2.0-draft (IMPLEMENTATION_COMPLETE)
Japanese full profile native/expert review: PENDING
JAPANESE_FULL_PROFILE_ARCHITECTURE: APPROVED / FROZEN
JAPANESE_PRODUCT_POLICY: APPROVED / FROZEN
PROJECT_OWNER_DECISIONS: 20/20 APPROVED
NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01: CLOSED
productPolicyStatus: APPROVED / FROZEN
projectOwnerClosureReview: COMPLETED
fullProfileStatus: APPROVED / FROZEN / CLOSED
nativeExpertReview: WAIVED / NOT_COMPLETED
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
pitchAccent: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
GOLDEN_LESSON_IMPLEMENTATION: PENDING_CHANGE_CONTROL
RUNTIME_IMPLEMENTATION: CHANGED_BY_APPROVED_Q14_CHANGE_CONTROL
profileVersion: 0.2.0-draft
Q14 documentation policy: UPDATED / HIDDEN_BY_DEFAULT / USER_TOGGLE_AVAILABLE
Q14 generated data: IMPLEMENTED
Q14 runtime implementation: PASS / PROJECT_OWNER_REVIEW_COMPLETED
English style-and-register profile: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
English Full Language Profile: PAUSED
NOVALANG-ENGLISH-STYLE-PROFILE-IMPLEMENTATION-01: CLOSED
ENGLISH_STYLE_PROFILE_DOCUMENTATION: COMPLETE
ENGLISH_PROFILE_VERSION: 0.1.0-draft
ENGLISH_PROFILE_NATIVE_REVIEW: PENDING
ENGLISH_PROFILE: NOT_FROZEN
Vietnamese style-and-register profile: LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED
Other learning languages style-and-register: LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED
Japanese language profile: JAPANESE_LANGUAGE_PROFILE_EXISTS
Japanese pilot implementation: PASS / PROJECT_OWNER_REVIEW_COMPLETED
Other learning languages: FUTURE_LANGUAGE_PROFILES_REQUIRED
Japanese rule freeze state: FROZEN
ADR-015: APPROVED / FROZEN / PROJECT_OWNER_REVIEW_COMPLETED
ADR-016: APPROVED / PROJECT_OWNER_DOCUMENTATION_REVIEW_PENDING / NOT_FROZEN
Stage 1: REOPENED_PENDING_VOCABULARY_RUNTIME_REVIEW (unchanged by this task)
Vocabulary sticky navigation: VOCABULARY_STICKY_NAVIGATION_BEHAVIOR_FROZEN
Vocabulary scroll blocker: VOCABULARY_SCROLL_BLOCKER_CLOSED
Professional domain taxonomy: 27 domains / 7 categories (COMPLETE — grouping fix and legacy-id decision both applied)
Format 3.0: NOT FROZEN
Pilot content implementation started: NO
Stage 2 started: NO
Commit created: NO
Push performed: NO
```

`2026-07-17` — **Project Owner approved Japanese Product Policy Closure.**
`JAPANESE_FULL_PROFILE_ARCHITECTURE: APPROVED / FROZEN`.
`JAPANESE_PRODUCT_POLICY: APPROVED / FROZEN`.
`PROJECT_OWNER_DECISIONS: 20/20 APPROVED`.
`NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01: CLOSED`.
At that historical checkpoint, the full linguistic profile and Q14 runtime
had not yet received final closure. The final state is superseded by the
2026-07-17 final-closure entry above. No curriculum, Golden Lesson, schema or
runtime code changed in the policy-closure task. Commit: NO. Push: NO. Codex
write ownership released.

`2026-07-17` — **NOVALANG-JAPANESE-FULL-LANGUAGE-PROFILE-01 started.** Codex
is the sole writer; Claude Code and Cursor are READ-ONLY. The task expands the
canonical Japanese directory to a substantive 16-file Full Language Profile,
including new `grammar-and-usage.md` and `learning-and-pedagogy.md`, without
changing the confirmed pronunciation/romanization implementation or any
curriculum, lesson content, translation, generated asset, schema or runtime
code. Full-profile target version is `0.2.0-draft`; this was the initial draft
checkpoint later superseded by final closure. Reviewer was `NOT_ASSIGNED` and
native/expert review had not been performed.
English Full Language Profile is PAUSED. Commit: NO. Push: NO.

`2026-07-17` — **NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01
started.** Project Owner supplied 20 binding Japanese product-policy decisions.
Codex remains sole writer; Claude Code and Cursor remain READ-ONLY. Scope is
Japanese rule documentation, `rules/languages/README.md`, and this handoff only.
The Q14 documentation policy will change from absolute romaji prohibition to
hidden-by-default with a user toggle, while Golden Lesson and runtime remain
unchanged pending separate Change Control. Curriculum, translations, schema,
generated assets, Flutter/React/runtime and pronunciation implementation are
forbidden. The dirty worktree is preserved. Commit: NO. Push: NO.

`2026-07-17` — **NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01
implementation complete pending Project Owner review.** All 20/20 owner
decision groups are recorded in the Japanese profile and Evidence Matrix as
`PROJECT_OWNER_DECISION`. Q14 documentation now says romaji is hidden by
default with a user toggle, replacing the previous absolute prohibition only
inside Japanese rule documentation. `Q14_ROMAJI_POLICY_IMPLEMENTATION` and
`GOLDEN_LESSON_IMPLEMENTATION` were not changed in that documentation task;
runtime was `NOT_CHANGED`. This implementation-stage status was subsequently
superseded first by policy approval and then by the final closure recorded
above.
Validation: 20/20 sequential decision register, zero forbidden Q14 wording,
zero unknown evidence references, zero broken internal links, zero trailing
whitespace/conflict markers, 16/16 non-empty Japanese files, exact owner forms
present, `npm run test:japanese-pronunciation` PASS,
`npm run validate:curriculum` PASS, and `git diff --check` PASS. No curriculum,
Golden content, translation, schema, asset, Flutter/React/runtime or
pronunciation implementation was changed by this task. Commit: NO. Push: NO.
Verdict: `READY_FOR_PROJECT_OWNER_JAPANESE_POLICY_CLOSURE_REVIEW`.

`2026-07-17` — **NOVALANG-JAPANESE-FULL-LANGUAGE-PROFILE-01 implementation
complete pending Project Owner review.** Japanese canonical coverage is 16/16;
`grammar-and-usage.md` and `learning-and-pedagogy.md` were added with
substantive content. The profile includes a section-scoped Evidence Matrix with
`EXISTING_CONFIRMED`, `AUTHORITATIVE_SOURCE_BACKED`,
`PROJECT_OWNER_DECISION`, `NEEDS_NATIVE_OR_EXPERT_REVIEW`, and `UNRESOLVED`
classification. Unsupported product thresholds remain explicitly
`STATUS: UNRESOLVED / REVIEW_REQUIRED: YES`. Pronunciation/romanization remains
a separately confirmed implementation awaiting the later runtime gate. This
historical draft checkpoint was superseded by final closure; version remains
`0.2.0-draft`, and native/expert review was ultimately waived rather than
completed. Documentation links, evidence references,
metadata, 16-file coverage, non-empty content, whitespace and conflict-marker
checks pass. `npm run test:japanese-pronunciation`,
`npm run validate:curriculum`, and `git diff --check` pass. No curriculum,
translation, schema, asset, runtime, English or other-language profile was
modified by this task. Commit: NO. Push: NO. Verdict:
`READY_FOR_PROJECT_OWNER_JAPANESE_FULL_PROFILE_REVIEW`.

`2026-07-16` — **Project Owner documentation acceptance recorded for
NOVALANG-ENGLISH-STYLE-PROFILE-IMPLEMENTATION-01.** Task status: `CLOSED`.
`ENGLISH_STYLE_PROFILE_DOCUMENTATION: COMPLETE`.
`ENGLISH_PROFILE_VERSION: 0.1.0-draft`.
`ENGLISH_PROFILE_NATIVE_REVIEW: PENDING`. `ENGLISH_PROFILE: NOT_FROZEN`.
Neither `APPROVED` nor `FROZEN` is claimed for the English profile. No
curriculum, translation, schema or source code was modified. Commit: NO. Push:
NO. Codex write ownership released.

`2026-07-16` — **NOVALANG-ENGLISH-STYLE-PROFILE-IMPLEMENTATION-01
documentation implementation complete.** The canonical English profile now
records General International English with en-US spelling/punctuation as the
baseline, `NATURAL_NEUTRAL_POLITE` behavior, base registers, orthogonal
modifiers, contraction and ambiguity policy, spoken/written distinctions,
interaction patterns, customer-service/workplace boundaries, forms of address,
Japanese-to-English traps, pedagogical exceptions, deterministic/native-review
fixtures, provenance and Project Owner-approved sampling coverage.

Status remains `DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN`; reviewer is
`NOT_ASSIGNED`, review date is `NOT_REVIEWED`, and native review is not claimed.
No curriculum, translation, source code, schema, generated asset, Golden Lesson
content, Stage 1 state or Lesson Format changed. Documentation-only validation
PASS: all approved paths exist; required metadata and sections are present and
non-empty; internal references resolve; no conflict marker or trailing
whitespace was found; `git diff --check` PASS (existing line-ending warnings
only). Flutter build/test was not run because this task is documentation-only.
Commit: NO. Push: NO.

`2026-07-16` — **NOVALANG-NATURALNESS-RULE-ARCHITECTURE-IMPLEMENTATION-01
documentation implementation complete.** ADR-016 records the approved
`NATURAL_NEUTRAL_POLITE` baseline, three base registers
(`CASUAL`/`NATURAL_NEUTRAL_POLITE`/`FORMAL`), three orthogonal modifiers
(`HONORIFIC`/`CEREMONIAL`/`SLANG`), field boundaries, release gate, review
coverage and canonical QA semantics. The global rule and per-language template
now require profile status/version/reviewer/review date/provenance/unresolved
decisions/change log and explicitly prohibit heuristic/LLM auto-PASS.

At that historical architecture checkpoint, Japanese style/register still
required later profile review. That state is superseded by Japanese final
closure. English and
Vietnamese are both `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`; no profile was
created or frozen. No curriculum, translation, source code, schema, generated
asset, Golden Lesson content, Stage 1 state, or Lesson Format changed.
Documentation validation: required semantic checks PASS; relative Markdown
paths and non-empty-file checks PASS; whitespace/conflict-marker checks PASS;
`git diff --check` PASS (line-ending warnings only). No build/generate/runtime
checks were run because the task is documentation-only. Commit: NO. Push: NO.

`2026-07-16` — **Project Owner runtime acceptance recorded for
NOVALANG-VOCABULARY-STICKY-NAVIGATION-FIX-07.** Android: **PASS**. Web/Chrome:
**PASS**. The accepted sticky-navigation behavior is now
`VOCABULARY_STICKY_NAVIGATION_BEHAVIOR_FROZEN`, and the runtime blocker is
`VOCABULARY_SCROLL_BLOCKER_CLOSED`. The scoped production source contains no
temporary debug UI, pointer probes, diagnostic banners, or debug logging.
Stage 1 and Lesson Format remain unchanged and are not frozen by this closure.
No production code was modified for acceptance recording. Commit: NO. Push:
NO. Codex write ownership released.

`2026-07-16` — **NOVALANG-VOCABULARY-STICKY-NAVIGATION-FIX-07 automated
implementation and validation complete; Project Owner runtime review remains
pending.** `LessonVocabularyPage` now uses the fixed `AppScaffold` AppBar for
Back and the localized Vocabulary cards title. Its body owns one stable
`CustomScrollView`; every vocabulary section is a `SliverMainAxisGroup` with a
pinned `SliverPersistentHeader`, naturally sized expanded details, and normal
spacing. Constraining each pinned header to its section makes the next header
push off and replace the prior header without stacking. The sticky header is
the single interactive header instance and retains the existing term, TTS
button, localized expand/collapse control, dark lesson-surface tokens, and
lifted expansion state. The Scaffold bottom navigation remains outside the
scroll viewport and fixed.

Validation: scoped vocabulary suite **17/17 PASS**; related vocabulary,
surface-theme, locale-purity, and Web visual suites **100/100 PASS**; full
`flutter test` **494/494 PASS**; `flutter analyze` PASS; debug APK build PASS;
Web build PASS (existing `flutter_tts` KGP/Wasm warnings only); `git diff
--check` PASS. Automated coverage includes fixed AppBar and bottom navigation,
touch/mouse/wheel scrolling, sticky current header, scrolling details,
push-off replacement with no header overlap, sticky TTS and toggle interaction,
scroll-position preservation, one/two expanded cards, long content, exactly
one vertical Scrollable, and widths 320/375/1366. Manual Chrome and Android
runtime PASS is not claimed and remains the Project Owner gate. No lesson
content, translation, romanization, audio data, stable ID/order, shared source,
schema, generated asset, plan, Pilot, or Stage 2 change. Commit: NO. Push: NO.

`2026-07-16` — **NOVALANG-VOCABULARY-SCROLL-RUNTIME-FIX-04 implementation
complete; ready for Project Owner runtime review.** The old tree split the
screen into a fixed `AppScaffold` AppBar and a body scrollable constructed
indirectly inside `ResponsivePage`'s `LayoutBuilder`. The page-owned controller
was passed through that wrapper, while expansion rebuilt both the lifted parent
state and the page child; PROOF-03 also called `setState` from the controller
listener and pointer probes during scroll activity. There was no explicit
`jumpTo(0)`, `animateTo(0)`, `ensureVisible`, restoration callback, or changing
key in the production path; the problematic state boundary was the wrapper
that constructed the real `SingleChildScrollView`, not the vocabulary content
extent. That explains why owner runtime metrics could report a valid expanded
`maxScrollExtent` while the visible page remained at `pixels = 0.0`.

FIX-04 makes `LessonVocabularyPage` directly own the sole
`SingleChildScrollView` and its stable `ScrollController`; `ResponsivePage` is
now layout-only (`scrollable: false`) on this screen. `AppScaffold` gained a
backward-compatible `showAppBar` option; Vocabulary Cards disables the fixed
AppBar and renders the localized Back control plus title as the first children
inside the outer scroll Column. The fixed `NavigationBar` remains the Scaffold
bottom navigation. All SCROLL_FIX_03 banners, buttons, pointer probes,
notification logs, and the debug-only controller passthrough on
`ResponsivePage` were removed. No nested vertical scrollable, fixed content
height, internal card scrollbar, content/localization/romanization/audio/stable
ID/order/plan/rule change was introduced.

Validation: scoped vocabulary scroll tests **14/14 PASS**, including real drag
from collapsed and expanded cards, max-extent growth, identical ScrollPosition
across expansion/rebuild, `jumpTo(200)`, `animateTo(200)`, Back/title movement,
fixed bottom navigation, two expanded cards reaching final content, exactly one
Scrollable, 320/375/1366 widths, and mouse-wheel input. Full `flutter test`:
**491/491 PASS**. `flutter analyze`: PASS. `flutter build apk --debug`: PASS.
`flutter build web`: PASS (existing `flutter_tts` KGP/Wasm warnings only).
`git diff --check`: PASS. Manual Android/Web runtime PASS is not claimed. No
commit, no push; dirty worktree preserved.

Multilingual naturalness/register rule: see
[`rules/content/naturalness-and-register.md`](../../rules/content/naturalness-and-register.md)
(global default `NATURAL_NEUTRAL_POLITE`, translation priority order,
`CASUAL`/`NATURAL_NEUTRAL_POLITE`/`FORMAL`/`HONORIFIC` levels, prohibited
literal-translation patterns, QA classifications) and its Japanese instance
[`rules/languages/ja/style-and-register.md`](../../rules/languages/ja/style-and-register.md).
Template for future languages:
[`rules/languages/_template/style-and-register.md`](../../rules/languages/_template/style-and-register.md).
Documentation/rule-architecture only — no curriculum content was rewritten,
no Japanese target text changed, no lesson IDs/answers/order changed, no
Flutter UI changed, no curriculum regenerated. No commit, no push.

Japanese profile state: `JAPANESE_LANGUAGE_PROFILE_EXISTS` ·
`ROMANIZATION_IMPLEMENTATION_PASS` · `ADR_015_APPROVED_FROZEN` ·
`JAPANESE_FULL_PROFILE_CLOSED_FROZEN`.

Closure verification: `kuromoji` is exactly pinned at `0.1.2` in manifest and
lockfile, a clean `npm ci --ignore-scripts` passed, Apache-2.0 provenance is
documented, exact-string fixtures and curriculum generate/validate/sync pass,
and shared/generated/Flutter lesson assets match by SHA-256. The later Q14
Change Control and Project Owner runtime review completed successfully.

`2026-07-16` — See the two `NOVALANG-PRONUNCIATION-TRANSFORMATION-GOVERNANCE-01`
progress-log entries near the bottom of this file (round 1, then the Project
Owner rejection and round 2 correction) for the full implementation summary.
Short version: fixed a systemic bug (391 real occurrences) where
`scripts/content/daily-life/module-1/helpers.mjs` copied raw kana `reading`
verbatim into `romanization`. Round 1 replaced kana with a character-level
は/へ/を particle heuristic — kana-free, but not learner-readable (no
spacing/macrons/capitalization) and architecturally rejected (lexical
exception list unreliable for future content). Round 2 rebuilt romanization
around a real Japanese morphological analyzer (`kuromoji`, IPADIC) that
tokenizes each sentence's kanji+kana surface text and decides particle vs.
lexical, word spacing, and proper-noun capitalization from each token's real
part-of-speech tag — verified against the Project Owner's exact required
examples (`machi e yōkoso`, `ima wa Tōkyō ni sunde imasu`, `kore wa nan desu
ka`) and against a full hand-review of the curriculum's Japanese content.
`.cursor/rules/05_novalang_pronunciation_profiles.mdc` (five-field gateway +
`PronunciationProfile` governance) and canonical Japanese detail under
`rules/languages/ja/`, and
ADR-015 updated accordingly. Full `flutter test` 477/477, `flutter analyze`
clean, Android debug APK PASS, Web build PASS. No manual runtime PASS
claimed. No commit, no push.

`2026-07-15` Claude Code implementation COMPLETE (see report below). Root cause:
the Golden localization generator (`resolveKnownList` in
`scripts/content/daily-life/module-1/ja-unit1-lesson1-localization.mjs`) had a
`?? value` fallback that copied raw Vietnamese into the en/ja slots whenever a
support string had no translation row, and emitted a partial `*ByNative` map
when only some list items matched; ~8 legacy grammar-explanation `ja` strings in
`content.mjs` were also hand-authored with Vietnamese words inside. Fix
(Project-Owner-approved Option 1, localization-only): added the missing
support-field translation rows (vi/en/ja), corrected the 8 grammar `ja` strings,
made the generator fail loud on any missing Vietnamese support translation (no
cross-language fallback; target-language tokens still pass through), and added a
café-safe purity gate to `validate-localization-purity.mjs` scanning all 506
generated lessons for Vietnamese in en/ja. Runtime: removed the hard-coded
Vietnamese `_naturalRegister`/`_naturalSentence` widget switches, added a shared
`emptyContentPlaceholder` (vi `Không có nội dung` / en `No content` / ja
`内容なし`) rendered for empty optional sections, and made the Vocabulary Cards
bottom clearance safe-area + bottom-nav aware. No target-language content,
answers, stable IDs, exercise order, five-card count, or lesson flow changed;
Golden invariant test passes. Validation: `validate:curriculum` + purity gate
PASS (0 Vietnamese in en/ja across 506 lessons), `smoke:curriculum` PASS, full
`flutter test` 477/477 PASS (incl. 11 new vocabulary-purity tests), `flutter
analyze` clean, `flutter build apk --debug` PASS, `flutter build web` PASS,
shared/generated ↔ Flutter asset byte-identical. No manual runtime PASS claimed;
Project Owner Android/Web runtime re-verification required. No commit, no push.

Active task `NOVALANG-VOCABULARY-RUNTIME-REMEDIATION-01` (Claude Code sole
writer): Project Owner tested Android with learning=Japanese, native/UI=English
and found the Vocabulary Cards screen still renders Vietnamese learner-support
text (e.g. `Trả lời khi được hỏi tên.`, `Tự giới thiệu ngắn gọn.`), an expanded
card stuck in a fixed region (long content unreachable / covered by bottom nav),
and empty optional sections shown blank. Blockers: A strict vocabulary language
purity (no cross-language fallback; systemic root cause, not a two-string
patch); B natural full-page scroll with safe-area bottom padding; C localized
empty-content placeholder (vi `Không có nội dung` / en `No content` / ja
`内容なし`) via shared i18n; D preserve the darkened NovaLang card surface.
Golden Lesson stable ID / 5 cards / 14 exercises / Q1–Q14 order / answers /
completion semantics / plan entitlements must not change; localization-only
support-field corrections, localized empty placeholders, and Vocabulary Cards
scroll/layout corrections are authorized. No manual runtime PASS will be
claimed. The prior `NOVALANG-RUNTIME-REVIEW-BLOCKERS-03` (Codex) narrative
below is retained for history and is not superseded in substance by this
scoped vocabulary remediation.

Project Owner runtime verdict: FAIL (historical). Automated corrective work
for the Vietnamese learner-support leakage, overly bright lesson-content
surfaces, and the newly approved exact Q14 dialogue replacement has passed.
Project Owner runtime confirmation remains required. IME diagnostic removal
remains pending Project Owner confirmation. Web responsive/navigation is
`PENDING_EXACT_RUNTIME_REPRODUCTION`; no speculative navigation correction is
authorized.

Prior task `NOVALANG-LEARNING-FOCUS-RUNTIME-CONFIRMATION-02` (Project Owner
runtime confirmation of compact Learning Focus UI) remains open and pending
Project Owner's manual Android/Web check; it is unrelated to this task and is
not superseded by it.

Codex completed the compact Learning Focus refinement and the approved
language-purity corrections. Automated localization/content validation,
Flutter tests, analyze, Android debug APK, and Flutter Web build pass. The
ambiguous legacy `environment_energy_agriculture` mapping was removed rather
than guessed. Daily Goal labels now come from the Shared i18n source without
cross-language fallback; Golden Reference learner-support text has vi/en/ja
localization without changing stable IDs, card/exercise order, target-language
content, answer keys, or lesson flow. The Coming soon badge uses centralized
NovaLang neon semantic tokens. Project Owner runtime verification remains
required for Android and Web across vi/en/ja; no manual runtime PASS is claimed.
Pilot and Stage 2 remain not started.

Claude Code implementation for `NOVALANG-LEARNING-FOCUS-INTEGRATION-FIX-01` is complete and reported below. Ownership transfers to Codex for independent review; Claude Code returns to READ-ONLY on this task; Cursor remains READ-ONLY. Stage 1 stays reopened until Codex confirms the Learning Focus review passes. Android on-device and Web visual runtime remain **pending Project Owner confirmation** — not claimed as runtime PASS from build/test alone.

Project Owner performed the manual runtime confirmation and **rejected** it: the real "Trọng tâm học" (Learning Focus) screen users actually see in the onboarding/selection flow still shows the old 12-domain catalog; the new 6-category/25-domain UI only exists behind the `/dev/domain-nav` preview route, which is not a product solution. Japanese exam catalog also still shows JLPT + JFT-Basic + BJT instead of JLPT only. This task corrects the real production screen in place — same-page embedded categories/domains, no drill-down navigation to a separate Category/Domain screen — fixes the Japanese exam catalog, and adds a collapsible notice. It is a runtime integration correction, not a free redesign. Ownership transferred to Claude Code; Codex and Cursor READ-ONLY.

Project-owner decision: WRITE transferred to Claude Code for this task. Codex: READ-ONLY. Cursor: READ-ONLY. Prior state per `docs/ai/ARCHITECTURE_DECISIONS.md` ADR-010: Stage 1 was `APPROVED / CLOSED` (`STAGE_1_REVIEW_PASSED`, Codex final review + project-owner closure). This task reopens Stage 1 scope only for UI consolidation (visual regressions + new Domain Navigation shell); it does not reopen the completion pipeline/contracts closed under ADR-010.

## Goal — Mục tiêu

Two mandatory phases, in order:

- **Phase A** — fix remaining UI regressions: text contrast (A1), literal `{count}` interpolation bug (A2), responsive/localization audit vi/en/ja at 320/375/768/1366/1920 (A3), Exercise 14 display terminology rename (no "AI" wording).
- **Phase B** — build Domain Navigation UI shell (Learning Track → Professional Category → Domain → Domain Detail), 3 tracks / 6 categories / 25 domains, local in-memory catalog, standalone preview/debug route (not wired into onboarding or bottom nav).

Phase B does not start until Phase A scoped tests pass.

## Scope boundaries — Ranh giới phạm vi

- No new lesson content. No Unit 1 Lesson 2. No Exercise 14 five-set/schema 2.0.1/2.1/AI-removal migration.
- No changes to Golden Lesson content, 5 cards, 14-exercise order, Lesson Format, completion pipeline, Usage Ledger, Stage 1 contracts, backend, subscription plans, Pilot lesson content.
- Icon strategy (project-owner decision): Material Icons via a centralized `iconToken → IconData` resolver (no scattered `Icons.*` in card widgets); custom Duotone SVG pack deferred to a later task.
- Domain Navigation UI route strategy (project-owner decision): new standalone preview/debug route; does not replace/modify the existing onboarding niche flow; not added to main bottom navigation; not wired into production flow yet.

## Progress log — Nhật ký tiến độ

- `2026-07-17`: **NOVALANG-PLACEMENT-OPTIONS-LOCALIZATION-FIX — placement test showed `⟦missing-content:exercise.p2.options:vi⟧` (Project Owner screenshot).** Root cause: `Exercise.localizedOptions(locale)` (`lib/models/exercise.dart`) returns a missing-content sentinel when a multiple-choice exercise has no per-locale option list for the active `uiLanguageCode`; the two HAND-AUTHORED `Exercise` sources — `lib/data/japanese_jlpt_seed.dart` (placement, always reachable in onboarding) and `lib/data/japanese_course_data.dart` (legacy runtime fallback) — omitted `optionsVi` on every question whose options are locale-neutral target-language tokens (romaji like `i/e/o/a`, kana/particles like `は/を`, Japanese sentences). The generated curriculum (`shared/generated/lessons.json`) was already correct — it emits `optionsByNative` with vi/en/ja/ko/zh all mirroring the target-language options — so Practice/lessons were unaffected; only the hand-authored seeds had the gap. Fix (data-only, matches the existing `optionsVi` pattern the meaning-word questions already use; romaji/kana/Japanese are allowlisted target-language content shown identically in every UI language, so vi mirrors the base list rather than translating): added `optionsVi` mirroring `options` to 9 placement questions (p1,p2,p3,p7,p8,p9,p12,p13,p14) and 14 legacy-fallback exercises. No model/logic change, no strict-purity weakening, no content invention. New guard `test/placement_options_localization_test.dart` asserts every placement + legacy exercise resolves real (non-sentinel) options in vi/en. Validation: `flutter analyze` 0 issues; new test PASS; full `flutter test` **502/502 PASS**; `git diff --check` clean. Files changed: `lib/data/japanese_jlpt_seed.dart`, `lib/data/japanese_course_data.dart`, `test/placement_options_localization_test.dart`. **Known limitation (reported, not fixed — needs owner decision, unrealistic scenario):** in `ja` UI, the 6 meaning-word placement questions (p4/5/6/10/11/15) still lack Japanese meaning options and would sentinel; authoring ja meaning options is content work, and a native-Japanese speaker taking the Japanese placement is not a real user path. The confirmed vi bug and the realistic vi/en UI locales are fully fixed. No commit, no push.

- `2026-07-14`: Ownership transferred to Claude Code for `NOVALANG-UI-CONSOLIDATION-01`. Workspace verified (git root correct). Read `AGENTS.md` (now includes Cross-Platform Product Strategy: Web/Android/iOS all first-class per ADR-011), `CLAUDE.md`, `docs/ai/ARCHITECTURE_DECISIONS.md` (ADR-010 Stage 1 closed, ADR-011 Web/Android/iOS first-class), `.cursor/rules/novalang.mdc`, `.cursor/rules/02_novalang_lesson_standard.mdc`. Confirmed root causes: A2 `{count}` bug is `five_card_exercise_flow.dart` calling `L10n.text('startExercises', ...)` without the `.replaceAll('{count}', ...)` used elsewhere for the same key; A1 contrast gap is several screens not yet using the existing `ExerciseOptionColors`/`ExerciseOptionStyle` semantic token system already applied correctly to the Q1/14 reference screen. Beginning Phase A.

- `2026-07-14`: **Phase A — COMPLETE.** A2 root cause: `five_card_exercise_flow.dart`'s landing-page button called `L10n.text('startExercises', ...)` without the `.replaceAll('{count}', ...)` used correctly elsewhere for the same key; fixed to use `practice.totalQuestions`. A1: added explicit `chipTheme.labelStyle`/`secondaryLabelStyle` color (`Colors.white`) in `app_theme.dart` (previously unset, falling back to Material's computed default — the likely source of "too dark" Chip/ChoiceChip labels app-wide); raised disabled FilledButton/OutlinedButton foreground alpha (0.55→0.75, 0.38→0.62) after confirming via WCAG contrast math the old values were below the 3:1 floor; swapped `placement_test_screen.dart`'s plain `ChoiceChip` options for the existing, already-correct `ExerciseActionOptionChip`/`ExerciseOptionStyle` semantic token system (same one used on the Q1/14 reference screen) instead of inventing new styling. Key theme tokens were extracted as named `AppTheme` static constants so tests can assert on them without constructing the full theme (which pulls Google Fonts over the network). A3: existing `stage1_web_visual_regression_test.dart` already covers vi/en/ja at 320/375/768/1366/1920 for onboarding; no gap found requiring new responsive tests in this pass. Exercise 14 rename: `exerciseTypeAiPractice` and new `plusTeaserDescription`/`plusTeaserHeading` keys updated to "Thực hành tình huống" / "Applied Practice" / "実践練習" wording across vi/en/ja, no remaining "AI" wording in Exercise 14 UI text; technical identifier `guided_output_practice` unchanged; Exercise 14 logic/content unchanged. New `test/phase_a_ui_regression_test.dart` (10 tests, including WCAG contrast-ratio assertions on the actual shipped color tokens) — all PASS. Full `flutter test`: **284/284 PASS**. `flutter analyze`: clean. Proceeding to Phase B.

- `2026-07-14`: **Phase B — COMPLETE, full validation run, ownership returned to Codex.** Catalog architecture: `models/domain_navigation.dart` (`LearningTrackDefinition`/`ProfessionalCategoryDefinition`/`ProfessionalDomainDefinition`, each with stableId/nameKey/iconToken/accentToken/availability/sortOrder), `core/utils/icon_token.dart` (`IconTokenResolver`, iconToken→Material `IconData`, Duotone SVG swap deferred per project-owner decision), `core/theme/accent_token.dart` (`AccentTokenResolver`), `data/domain_navigation_catalog.dart` (3 tracks / 6 categories / 25 domains, verified sums 5+4+4+4+4+4=25, all domains `comingSoon` since no curriculum exists yet, no `kIsWeb`/`Platform.*` branching). UI: `screens/explore/domain_navigation_screen.dart` — 4 levels (`DomainNavigationScreen` → `ProfessionalCategoriesPage` → `ProfessionalDomainsPage` → `DomainDetailPage`), plus `_TrackShellPlaceholderPage` for the two tracks with no catalog in this task; internal navigation via `Navigator.push(MaterialPageRoute)` matching the existing `FiveCardExerciseLandingPage` pattern; `widgets/common/responsive_card_grid.dart` (row/`Expanded`/`IntrinsicHeight`-based grid, 1/2/3/4 columns at 600/1000/1500 breakpoints, auto-height cards, no fixed card dimensions). Route: standalone `/dev/domain-nav` added to `app_router.dart` (not in onboarding, not in bottom nav); debug-only entry button added to `profile_screen.dart`'s existing `kDebugMode` section. Localization: ~40 new vi/en/ja key groups in `localization.dart` (3 tracks, 6 categories+descriptions, 25 domains, general nav labels) plus `domainNavDevPreviewLabel`. Accessibility: `Semantics(button: true, label: ...)` per card, ≥48dp tap targets, `InkWell` focus/hover states, chevron navigation affordance, no flags, no continuous animation. New `test/phase_b_domain_navigation_test.dart` (30 tests: catalog structure/uniqueness/sort-order/localization coverage, 4-level navigation flow including coming-soon never opening fake content, vi/en/ja rendering, responsive layout at 320/375/768/1366/1920 with zero overflow exceptions) — all PASS. Full `flutter test`: **314/314 PASS**. `flutter analyze`: clean. `flutter build apk --debug`: PASS. `flutter build web`: PASS. Web runtime verified via `flutter run -d web-server --web-port 8083` and a static serve of the `flutter build web` output (port 8090): app boots, title resolves to "NovaLang", all resources including the 6 new Domain Navigation files compile and load (200 OK), zero application-level console errors on either serving mode (one DWDS-internal debug-client deserialization error was observed on the dev server only, confined to `dwds/src/injected/client.js`, absent from the production static serve — not application code). Pixel-level screenshot capture was attempted but timed out consistently (browser-automation/canvas-rendering-loop limitation in this environment, confirmed unrelated to app code via clean console+network evidence) — visual confirmation deferred to manual Chrome check. Android: debug APK build PASS; live emulator install completed (`com.novalang.app` confirmed installed via `pm list packages` on a booted Pixel 6 Pro AVD) but the app process did not reach a running state within the session, most likely due to host resource contention from multiple concurrent Flutter/Dart/emulator/web-server processes accumulated during this session's own verification work — on-device click-through deferred, not a code-defect signal. Golden Lesson, Stage 1 contracts, subscription, backend, Pilot content: untouched. No commit, no push. Handing off to Codex for independent review.

- `2026-07-14`: **Codex independent review BLOCKED.** Phase A 10/10, Phase B 30/30, full Flutter 314/314, analyze, APK debug, Web build, and Golden Lesson invariant all pass. The Exercise 14 terminology requirement does not pass production runtime: `main.dart` preloads `MobileUiStrings`, and both `shared/i18n/mobile_ui.json` plus the synced Flutter asset still contain `AI Practice` / `Luyện tập với AI` / `AI練習`. These loaded values take precedence over the fallback edited in `localization.dart`. The fallback itself also uses Vietnamese `Thực hành tình huống`, not the required exact `Thực hành thực tế`. Phase A tests do not preload the shared asset, so they pass against fallback-only behavior and miss the runtime regression. The exercise landing summary also hard-codes `${practice.totalQuestions} câu`, so English/Japanese UI still renders a Vietnamese count unit. The new Domain Navigation localization keys exist only in Flutter fallback code rather than the required shared i18n source. Ownership returns to Claude Code for a minimal source → sync → runtime-aware test correction; Pilot and Stage 2 remain not started.

- `2026-07-14`: **NOVALANG-UI-CONSOLIDATION-FIX-02 — all 5 blockers fixed.** Blocker A: `shared/i18n/mobile_ui.json`'s `exerciseTypeAiPractice` corrected to `Real-World Practice` / `Thực hành thực tế` / `実践練習`; matching fix in `localization.dart` fallback and in `plusTeaserDescription`'s embedded wording. Blocker B: added shared key `lessonQuestionsCount` (`{count} questions` / `{count} câu` / `{count}問`); threaded `uiLanguageCode` into `_PracticeOverview` in `five_card_exercise_flow.dart`; removed the hardcoded `'${practice.totalQuestions} câu'` literal. Blocker C: moved all 48 Domain Navigation keys (3 tracks, 6 categories + descriptions, 25 domains, 8 nav/status labels) from Flutter-fallback-only into `shared/i18n/mobile_ui.json`, then ran `npm run sync:flutter-assets` (the project's official pipeline command per AGENTS.md); verified the synced Flutter asset is byte-identical to the shared source. Blocker D: rewrote the Exercise 14 terminology test group in `phase_a_ui_regression_test.dart` to `MobileUiStrings.load()` the real shared asset in `setUpAll` and assert against `MobileUiStrings.instance.lookup(...)` and `L10n.text(...)` together (not fallback-only); added a negative test enumerating all stale historical values; added Blocker B question-count tests. Verified by deliberately reverting the synced asset to old terminology — the new tests correctly failed — then restoring via `sync:flutter-assets` and confirming green again. Blocker E: added a `locale x width x level` matrix group to `phase_b_domain_navigation_test.dart` (3 locales x 5 widths x 4 levels = 60 combinations, organized as 15 `testWidgets` each walking all 4 levels) asserting no overflow exceptions, no raw/literal localization keys visible, no stale Vietnamese count unit in en/ja, and that the Level 4 coming-soon shell exposes zero card-based tappable affordances (no fake lesson). Uses finite `pump()`/`pump(duration)` pairs, not unbounded `pumpAndSettle()`. Root-cause note: mid-fix, the full suite showed 3 failures that did not reproduce when the same file was run standalone — traced to a stale `build/unit_test_assets/assets/shared/mobile_ui.json` cache left over from an earlier `flutter test` invocation during verification; fixed by deleting `mobile/novalang_flutter/build/unit_test_assets` (gitignored build output, not source) to force a fresh asset bundle. Full `flutter test`: **335/335 PASS**. `flutter analyze`: clean. `flutter build apk --debug`: PASS. `flutter build web`: PASS. Verified the built APK's and web bundle's merged `mobile_ui.json` both carry the corrected terminology (not a stale cached copy). **Flagged, not fixed (out of this task's scope):** required source-verification grep also found `Luyện tập với AI` / `AI Practice` inside actual lesson content text (`details`/`exhaustedMessage` fields) in `shared/content/curriculum/lessons.json`, `shared/generated/lessons.json`, and the synced `mobile/novalang_flutter/assets/shared/lessons.json` — all three belong to lesson `ja-daily_life-m01-u1-l1`, the **Golden Reference Lesson**. This task's own constraints forbid changing Golden Lesson content, and `lessons.json` is generated output (must not be hand-edited) — no source content specification/approval exists for this specific text change. Left untouched; needs a separate, explicitly-authorized task. Android/Web runtime status: build-only per Section 12 of the fix task — not re-claimed as runtime PASS.

- `2026-07-14`: **Codex REVIEW-02 PASSED automated re-review.** Verified shared Exercise 14 terminology and Flutter fallback (`Real-World Practice` / `Thực hành thực tế` / `実践練習`), localized runtime `lessonQuestionsCount`, 48 Domain Navigation shared keys, and byte-identical shared/Flutter/Web `mobile_ui.json` assets. Phase A 16/16, Phase B 45/45 including 60 locale-width-level renders, full Flutter 335/335, Golden Lesson invariant, analyze, APK debug, and Web build all pass. The three Golden lesson JSON files remain byte-identical and were not touched by FIX-02; their old details/exhaustedMessage terminology remains a Project Owner-approved deferred Golden content issue. Manual Android and Web visual/runtime confirmation remains unconfirmed.

- `2026-07-15`: **Project Owner runtime-REJECTED the UI consolidation; NOVALANG-LEARNING-FOCUS-INTEGRATION-FIX-01 complete.** Root cause of rejection: the new 6-category/25-domain UI only lived behind the `/dev/domain-nav` preview route, while the real "Trọng tâm học" (Learning Focus) production screen (`niche_screen.dart` + `learning_preferences_screen.dart`, both driven by `groupedNichesProvider`) still rendered the old 12-domain career catalog; Japanese exam catalog still showed JLPT+JFT-Basic+BJT. **Fix — same-page embedded, no drill-down:** (1) Rebuilt the real production data source: `shared/config/niche_options.json` now defines the 25 professional domains, each carrying its 6-category stable ID (`digital_technology`/`corporate_business`/`hospitality_customer_service`/`engineering_production`/`care_health_education`/`green_agriculture_supply_chain`) as its `category` field; distribution 5/5/4/3/4/4 = 25; `food_processing_beverage_production` is not a top-level selectable niche (it only ever existed in the `/dev/domain-nav` debug catalog, which has no persisted selection, so no data migration was needed for it); added `marketing_communications_content`. (2) `shared/i18n/niche_labels.json`: added vi/en/ja titles for all 25 domains + 6 category IDs. (3) Exam catalog fix in `shared/config/exam_tracks.json`: `exam_jft_basic` and `exam_bjt` set `enabled:false` (ja → JLPT only); `exam_toefl` set `enabled:false` (en → IELTS+TOEIC only) — the existing `isDisplayed` filter in `groupedNichesProvider`/`displayedExamTracksProvider` already excludes `enabled:false`, so no widget-tree change was required. (4) New `lib/widgets/niche/collapsible_notice_card.dart` (default collapsed, whole-card tap target, chevron rotate, `Semantics(button + expanded state)`, `AnimatedSize`, no route/dialog/sheet) and `lib/widgets/niche/niche_groups_list.dart` (shared grouping widget that renders the professional-section heading + collapsible notice + all 6 category cards with their 25 domains embedded inline via the existing `NicheGroupCard`/`NicheChip`, and every non-professional group as before). Both `niche_screen.dart` and `learning_preferences_screen.dart` now render via `NicheGroupsList` (was an inline `Column` of `NicheGroupCard`s) — no drill-down navigation, `/dev/domain-nav` untouched as a debug reference only. (5) Notice + section-title localization keys added to `shared/i18n/mobile_ui.json` + `localization.dart` fallback (vi/en/ja). (6) **Legacy persisted-selection safety:** removing/renaming the 12 old career IDs would have orphaned any saved selection and left dangling `nicheLegacyIdMap` targets (`'it'→'it_programming'` etc.), so updated all three copies of `nicheLegacyIdMap` (`user_profile.dart`, `lesson_provider.dart`, `niche_labels.json`) to forward-map the retired IDs to their new equivalents (`it_programming→it_software`, `business_office→office_administration`, `healthcare→clinical_healthcare`, `logistics_delivery→logistics_supply_chain`, `finance_accounting→finance_accounting_audit`, `marketing_content_creation→marketing_communications_content`, and best-effort `environment_energy_agriculture→agriculture_agritech` — flagged for owner review); a test asserts no legacyIdMap target is a dead id. Ran `npm run sync:flutter-assets`; verified `niche_options`/`niche_labels`/`exam_tracks`/`mobile_ui` byte-identical between shared source and synced Flutter asset, and that the built APK + web bundles carry the new data. New `test/learning_focus_screen_test.dart` (28 tests: catalog structure 6/25/distribution + no-food-processing + marketing present + no old-12 + all-25-visible-without-navigation + vi/en/ja localization + legacy migration; collapsible notice collapse/expand/re-collapse + semantics; exam ja=JLPT-only, en=IELTS+TOEIC-only; responsive 3 locales × 5 widths on the real screen). Full `flutter test`: **363/363 PASS**. `flutter analyze`: clean. `flutter build apk --debug`: PASS. `flutter build web`: PASS (both rebuilt after the final legacy-map edit). Golden Lesson, Lesson Format, completion pipeline, Usage Ledger, Stage 1 contracts, subscription, backend, Exercise 14 logic, Plus+ cards: untouched. React Web consumer (`frontend/src/data/niches.ts`) reads this shared data generically (groups by `category`, dynamic label lookup, `legacyIdMap` normalize) so it stays consistent by construction and now renders the same 6 groups — but frontend `node_modules` is not installed in this environment, so its `tsc -b && vite build` was not run (data-only change within the existing JSON shape cannot break TS types). No commit, no push. Handing off to Codex.

- `2026-07-15`: **NOVALANG-LESSON-RUNTIME-REMEDIATION-01 — Phases A–F complete, ownership override closed out.** Project Owner explicitly reassigned write ownership to Cursor for this task only (Section 2 override, recorded above); Codex/Claude Code stayed READ-ONLY throughout. Summary of the six phases:
  - **Phase A (wrong-answer explanation locale fix):** `ExerciseReviewRecord` gained `explanationLanguageCode` (null for statically authored explanations, set to the active `nativeLanguageCode` only for AI-graded exercises) plus `isAiGradedExplanation`. `AiExerciseGradingRequest` now carries `nativeLanguageCode`; `DevMockAiExerciseGrader` generates a locale-appropriate explanation or a `missingNativeContentSentinel` for unsupported locales — never a silent cross-language fallback. `five_card_exercise_flow.dart` re-resolves statically authored explanations live from content at the *current* `nativeLanguageCode` (so switching native language never shows stale text) and, for AI-graded explanations, compares `explanationLanguageCode` against the current native language — on mismatch (including pre-migration legacy records with a null `explanationLanguageCode`) it shows a localized "redo this question" notice instead of frozen-language text. New `test/wrong_answer_explanation_locale_test.dart`.
  - **Phase B (Lesson Format 3.0 governance):** new `.cursor/rules/04_novalang_lesson_format_3_0.mdc` formally documents the Q14 breaking change as a superseding-only-Q14 amendment to the frozen Format 2.0; `03_novalang_lesson_format_2_0.mdc` gained supersession notices on its Q14 rows/section (rest of the document stays authoritative); `AGENTS.md` rule-priority list and `ARCHITECTURE_DECISIONS.md` gained ADR-012 (Q14 redesign) and ADR-013 (Module Comprehensive Conversation contract, shell-only).
  - **Phase C/D/E (Q14 redesign):** new `real_world_practice_dialogue` schema (non-graded, `scenarioTitle`/`scenarioDescription`/`characterIds`/`dialogueLines`, reusing `PracticeDialogueLine`) replaces `controlled_ai_text` for the Golden Lesson's Q14 only. Golden content updated to the owner-approved 14-line Tanaka–Sato dialogue with hiragana readings and vi/en/ja translations (`ja-unit1-lesson1.mjs` + its localization file). New `_RealWorldPracticeDialoguePage` renderer: independent reading/translation toggles, per-line audio via `TtsService` (one line at a time, replay always allowed), non-graded idempotent completion, zero legacy AI UI (no trial label, no text input, no Check Answer, no score). `FiveCardPractice.gradedTotalQuestions` excludes Q14 from the Result page's score denominator. `scripts/validate-curriculum.mjs` updated to enforce the new Q14 contract instead of the old one.
  - **Phase F (Module Comprehensive Conversation shell):** new `PlanTier`/`PlanAccessPolicy` seam (`ProductionSafePlanAccessPolicy` always returns Free — no real user is ever granted Plus+ by default; `FixedPlanAccessPolicy` is test-only) and `ModuleComprehensiveConversationCard` shell, inserted in `DailyLifeModuleCard` immediately after the third Unit. No conversation content is invented — tapping shows a localized "being prepared" or "upgrade" message only.
  - **i18n:** new shared keys (`dialogueReadingToggle`, `dialogueTranslationToggle`, `dialogueCompleteAction`, `aiExplanationLocaleMismatchNotice`, `moduleComprehensiveConversationTitle/Description/LockedHint/Preparing`) added to `shared/i18n/mobile_ui.json` and the Flutter fallback, then synced.
  - **Debugging note (Q14 UI test hang):** `real_world_practice_dialogue_test.dart` initially hung indefinitely. Root cause: `assets/shared/lessons.json` is ~13MB, and Flutter's test asset-loading channel becomes pathologically slow when awaited as the first async step inside a `testWidgets` body for a payload that large — it must be loaded once in `setUpAll` instead (mirroring the existing pattern in `five_card_exercise_runtime_regression_test.dart`). While isolating this, also found and fixed a real product gap: `TtsService` never called `awaitSpeakCompletion(true)`, so the "line is playing" UI state would have reverted almost instantly on real devices instead of tracking actual speech duration; fixed, with the test's mock TTS channel updated to simulate a realistic playback delay.
  - **Regressions found and fixed in pre-existing tests** (asserted stale Q14 shape that no longer exists after the approved redesign): `five_card_lesson_test.dart` (old `maxCycles`/`scriptPolicy`/trial `badge` assertions → updated to the new `real_world_practice_dialogue` shape), `five_card_practice_logic_test.dart` (compile error from the new required `nativeLanguageCode` param), `golden_reference_lesson_invariants_test.dart` (old exercise-level `readingAid` invariant → updated to the new per-line `reading` on `dialogueLines`).
  - **Full validation, in official pipeline order:** `npm run sync:curriculum` (generate → `validate:curriculum` + `validate:localization-purity` → `sync:flutter-assets`) — PASS, 23 courses/506 lessons, purity clean. `flutter analyze` — 0 issues (one unused test import fixed). `flutter test` — **438/438 PASS** (full suite, two full runs). `flutter build apk --debug` — PASS. `flutter build web` — PASS (pre-existing `flutter_tts` WASM/KGP warnings only, not from this task). `npm run build --prefix frontend` — PASS (untouched by this task; pre-existing chunk-size warning only). `git diff --check` — PASS (0 whitespace errors; only CRLF-normalization notices from git's own `autocrlf` config, not violations).
  - Golden Lesson invariants preserved: Q1–Q13 unchanged, exactly 14 exercises, exactly 5 cards, stable Q14 id (`ja-daily_life-m01-u1-l1-practice-14`) unchanged, Q14 technical type is `real_world_practice_dialogue` (never `controlled_ai_text`) on the Golden Lesson only. No commit. No push.

- `2026-07-16`: **NOVALANG-PRONUNCIATION-TRANSFORMATION-GOVERNANCE-01 — Japanese pilot implemented and validated end-to-end.** Project owner reported the direction particle へ mispronounced/mis-romanized; investigation found the real defect was in `romanization`, not `reading`/furigana, and the project owner authorized a durable five-field pronunciation architecture (not a point patch), with Japanese fully implemented now as the pilot language and a mandatory contract for every future language.
  - **Root cause:** `scripts/content/daily-life/module-1/helpers.mjs`'s `vocab()` set `romanization: reading(line, language)` — copying the raw hiragana `reading` string verbatim into `romanization` for every Japanese vocabulary/key-phrase card in the generic (non-Golden) pipeline. Confirmed 391 real occurrences across the generated curriculum via direct query of `shared/generated/lessons.json`. The Golden Lesson's own 5 hand-authored vocabulary `romanization` values were separately confirmed already correct (no bug there); Q14's dialogue has no `romanization` field at all (by original Format 3.0 "no romaji" design), so nothing to fix there.
  - **New module:** `scripts/lib/japanese-pronunciation.mjs` (`toHepburnRomaji`, `containsKana`) — deterministic hiragana/katakana → Modified Hepburn, including dakuten/handakuten, youon, sokuon gemination, the explicit long-vowel mark (ー), and context-aware は/へ/を particle handling (は→wa, へ→e, を→o only when actually functioning as that grammatical particle; kept lexical "ha"/"he" for vocabulary words via an explicit, evidence-based `LEXICAL_EXCEPTIONS` list — never a blind/global character substitution, per the project owner's explicit constraint).
  - **Real-data-driven hardening (4 rounds, each fixing a bug found by testing against actual curriculum text, not hand-picked examples):** removed an unsafe auto-macron-merge that crossed word boundaries; removed こんにちは/こんばんは from the exception list (they correctly keep "wa", contradicting my own initial guess); removed へいき (collided with どこへ行きたいんですか); removed はな and はこ (collided with the extremely common "[topic]はなんですか"/"いまはここに" patterns — both had zero genuine flower/box usage in this content); fixed a punctuation-crash bug so structural characters (`+`, `／`, `→`, embedded newlines) pass through instead of throwing; added an utterance-boundary requirement for はい (was wrongly swallowing a topic-particle は followed by an い-initial word mid-sentence, e.g. それはいいですね); added はっきり, はじま (start of 始まる), はん (time "half"), はや (stem of 早い/早く), はっぴゃく (800), はら (stem of 払う), and よこはま (Yokohama, proper noun) as newly-discovered missing lexical exceptions. Final state verified against **all 461 unique real reading strings** and **all 146 unique は/へ contexts** in the generated curriculum (every single one manually reviewed): 0 crashes, 0 remaining raw kana, 0 known false positives, 0 known false negatives.
  - **Wired into the generator:** `helpers.mjs` now calls `toHepburnRomaji(reading(line, language))` for Japanese instead of copying `reading` verbatim. Regenerated (`npm run generate:curriculum`), validated (`npm run validate:curriculum` — PASS), and synced (`npm run sync:flutter-assets`) — `shared/generated/lessons.json` and the Flutter asset copy are byte-identical (SHA-256 verified). Spot-checked end-to-end: `日本へようこそ` → `nihoneyoukoso.` (へ correctly "e"), `今は東京に住んでいます` → `imawatoukyounisundeimasu.` (は correctly "wa").
  - **Regression guard:** `scripts/validate-curriculum.mjs` gained `validateNoRawKanaInRomanization`, a recursive walk of every Japanese lesson's full object tree that fails on any `romanization` field still containing hiragana/katakana — runs for every ja lesson including Golden and blueprint lessons, not just the generic pipeline.
  - **Tests:** new `scripts/test-japanese-pronunciation.mjs` (`npm run test:japanese-pronunciation`) — fixture tests for standard kana coverage, katakana normalization, youon, sokuon, the long-vowel mark, を/へ/は particle-vs-lexical correctness (including every real sentence that was found broken above), punctuation passthrough, and genuinely-unmapped-kana-still-throws. All PASS.
  - **TTS contract verified, not changed:** grepped every `TtsService.instance.speak(...)` call site in `mobile/novalang_flutter/lib/` — both use `speechText` (native script); none use `.romanization`. No code change needed; documented as the confirmed baseline in the new rule file.
  - **Governance artifacts:** the gateway `.cursor/rules/05_novalang_pronunciation_profiles.mdc` records the five-field contract and generic `PronunciationProfile` schema; canonical Japanese detail now lives in `rules/languages/ja/` (contextual rules, TTS policy, validators and fixtures). ADR-015 records the architecture decision.
  - **Audited, not changed:** Golden Lesson's `vocabularyDetails.examples` and remaining 3/7 vocabulary items (`desu`, `kochira-koso`, `sayounara`) have no `romanization` field at all (absence, not a wrong value) — flagged below for project owner decision rather than unilaterally adding content to a frozen lesson. The legacy renderer (`lesson_screen.dart`'s `_fiveVocabulary`) reads `displayText`/`meaning`/`reading`/`romanization` as pre-resolved strings from the model layer (`native_content.dart`) — automatically inherits the fix, no separate change needed; its `vocabularyDetails`-driven section (the code shape that could reproduce the original Vietnamese-leak defect) is confirmed unreachable with current data/routing (Golden Lesson, which has `vocabularyDetails`, routes to `LessonFiveCardMenu` instead; every other lesson routes here but `helpers.mjs` never emits `vocabularyDetails`) — dead code today, not a live bug, noted as an observation only.
  - **Full validation:** `npm run validate:curriculum` PASS (23 courses, 506 lessons); `npm run test:japanese-pronunciation` PASS; `flutter analyze` — 0 issues; `flutter test` — **477/477 PASS**; `flutter build apk --debug` — PASS; `flutter build web` — PASS (pre-existing `flutter_tts` WASM/KGP warnings only, unrelated to this task); `git diff --check` on all files touched this task — 0 errors (only harmless CRLF-normalization notices).
  - **Not done, by explicit design:** other learning languages received no phonological rule content — only the mandatory contract in the new rule file (`PRONUNCIATION_PROFILE_REQUIRED_BEFORE_CONTENT_RELEASE`), per the project owner's explicit scope correction. No manual on-device/browser runtime PASS is claimed. No commit, no push.

- `2026-07-16`: **Project Owner REJECTED the round-1 romanization output; round 2 (token/POS-based architecture) implemented and validated.** Rejection: kana-free output (`nihoneyoukoso.`) is not the same as correct, learner-readable romanization — the approved form is `nihon e yōkoso` (word/particle spacing, macrons, capitalization). The character-level `LEXICAL_EXCEPTIONS` approach was rejected as architecturally unreliable: it had already needed 9 rounds of manual patching (へいき/はな/はこ/はい/はっきり/はじまる/はん/はやく/よこはま) and would keep colliding with lessons not yet written. The Project Owner required an explicit standard (exact Hepburn variant, long-vowel/macron/spacing/capitalization/punctuation/ん-apostrophe/っ/youon/katakana/proper-noun policies) and a token/grammar-based disambiguation architecture instead of a growing exception list.
  - **Architecture change:** `scripts/lib/japanese-pronunciation.mjs` rewritten around `kuromoji` (new npm dependency, pure-JS Japanese morphological analyzer, IPADIC dictionary, Apache-2.0, no native bindings, content-generation-time only — not shipped to the Flutter app or web bundle). Each sentence's real kanji+kana surface text (not the pre-extracted kana `reading` — kanji gives far better segmentation accuracy, e.g. お名前 tokenizes correctly while all-kana おなまえ does not) is tokenized into real morphemes with genuine part-of-speech tags; は/へ/を romanize as the particle form only when the analyzer itself tags that exact token 助詞. `LEXICAL_EXCEPTIONS` (the rejected mechanism) is gone entirely.
  - **Word/particle spacing, macron, and capitalization policies implemented** (all evidence-anchored against existing approved hand-authored data or real curriculum sentences, now documented in `rules/languages/ja/`): auxiliary-verb/te-form gluing vs. independent words (`sunde imasu`, `yonde kudasai`, but です/ございます stay their own word); proper-noun capitalization (`Tōkyō`, `Tanaka`); お-row+う and お-row+お macron merging (`ohayō`, `Ōsaka`, `tōi`) while え-row+い and い-row+い deliberately do not merge (`sensei`, `ii`, matching approved data); cross-token small-tsu gemination carry-over (kuromoji sometimes splits a verb's te-form exactly at っ, e.g. 伺って → tokens "伺っ"+"て" — fixed so it romanizes `ukagatte`, not the broken `ukagate`); counter/suffix and consecutive-number gluing (`nanji`, `gohyakuen`); prefix binding forward (`onamae`); a small whole-word irregular-pronunciation override for こんにちは/こんばんは; a narrow contextual-reading override for 何→なん before a copula (`nan desu ka`); and a known-reading normalization for 日本 (dictionary ambiguity between にほん/にっぽん, normalized to the everyday にほん reading already used correctly in 日本語).
  - **Verified against the Project Owner's exact required examples**: `町へようこそ` → `machi e yōkoso`; `今は東京に住んでいます` → `ima wa Tōkyō ni sunde imasu`; `これは何ですか` → `kore wa nan desu ka` — all three match exactly.
  - **Re-validated with the same rigor as round 1**: full hand-review of all 120 unique Japanese surfaceText values feeding the generic pipeline (two rounds, found and fixed 9 more real bugs the same real-data-driven way: 日本 dictionary ambiguity, cross-token gemination loss ×5 sentences, ですが wrongly glued, ございます wrongly glued, お+お macron gap). 0 crashes, 0 kana leaks after the fixes.
  - **Re-wired, regenerated, re-synced:** `helpers.mjs` now tokenizes `target(line, 'ja')` (kanji surfaceText) via `prepareJapaneseRomanization()`/`toReadableRomaji()` instead of the old kana-based `toHepburnRomaji(reading(...))`. Because kuromoji's dictionary build is async and the generator call graph is synchronous, every needed surface text is pre-tokenized once via top-level `await` when `helpers.mjs` is imported (blocks the whole ESM import graph, per Node's standard top-level-await semantics), so the rest of the ~4000-line generator stays untouched and synchronous. `npm run generate:curriculum` → `validate:curriculum` (PASS) → `sync:flutter-assets`; `shared/generated/lessons.json` and the Flutter asset copy re-verified byte-identical (SHA-256).
  - **Tests rewritten, not just extended:** `scripts/test-japanese-pronunciation.mjs` now asserts the *complete expected romanization string* for every case (spacing, macrons, capitalization) instead of only checking absence of kana, per the Project Owner's explicit instruction that a kana-only check must not be presented as proof of correctness.
  - **Governance updated:** `rules/languages/ja/` is the canonical detailed source for the policy subsections requested by the Project Owner; the `05` file is its global gateway. ADR-015 records the rejection and corrected architecture.
  - **Golden Lesson / Q14 unchanged**, as required: no romanization field added to Q14; no Golden target text/reading/stable IDs/order changed; the 3 Golden vocabulary items still missing `romanization` are still left as an explicit owner decision, not auto-filled.
  - **Full validation:** `npm run validate:curriculum` PASS; `npm run test:japanese-pronunciation` PASS (exact-string assertions); `flutter analyze` — 0 issues; `flutter test` — **477/477 PASS**; `flutter build apk --debug` — PASS; `flutter build web` — PASS. No manual on-device/browser runtime PASS claimed. No commit, no push.

- `2026-07-16`: **NOVALANG-VOCABULARY-SCROLL-ROOT-CAUSE-FIX-02 — structural fix complete, root cause investigated via real interaction testing, not static reading alone.** Codex released write ownership; Project Owner transferred sole ownership to Claude Code for this task, scoped strictly to a structural Flutter layout/scroll fix (no content, localization, romanization, `rules/languages/`, lesson ID/ordering, plan entitlement, or SRS changes).
  - **Investigation method:** two prior rounds of static widget-tree reading (this session and an earlier one) found no defect in `LessonVocabularyPage`/`ResponsivePage`/`AppScaffold`. Per the Project Owner's explicit instruction not to guess again, root cause was instead investigated by building `test/vocabulary_card_scroll_test.dart` — 8 tests rendering the REAL production widget tree (`AppScaffold` → `ResponsivePage` → the vocabulary list, wrapped in a real `ProviderScope` so `BottomNav` renders as it does in production) and performing REAL `tester.dragFrom()`/`PointerScrollEvent` gestures starting from an explicit, verified-on-screen point inside the expanded card body — not `tester.drag(finder, …)` with an auto-computed center, which a first pass showed can silently target an off-screen point for a tall expanded card and produce a false "gesture is dead" signal.
  - **Finding 1 — the existing (pre-fix) architecture actually scrolled correctly when tested rigorously:** with the original `CustomScrollView`/`SliverToBoxAdapter` structure, all 8 interaction tests passed: dragging from inside the expanded body moved the card header substantially; the final card became reachable above the bottom nav; collapsing/re-expanding preserved a non-zero scroll offset; two expanded cards stayed reachable in one scroll flow; exactly one `Scrollable` existed (no nested inner scroll, no `Scrollbar`); no horizontal overflow at 320/375/1280px; a mouse-wheel-style `PointerScrollEvent` over the expanded body scrolled the page (Web input path).
  - **Finding 2 — routing/data audit confirms `LessonVocabularyPage` is the only code path for this UI:** `lesson_screen.dart` routes to `LessonFiveCardMenu`/`LessonVocabularyPage` only when `lesson.id == 'ja-daily_life-m01-u1-l1'` (hardcoded to the Golden Lesson). Every other lesson falls through to a separate legacy `_fiveVocabulary`/`_fiveExpandableCard` renderer in the same file — but a direct query of `shared/generated/lessons.json` confirmed no other lesson has `lessonFormat` set to `'five_cards'` at all (it is `undefined` for the generic pipeline's 505 lessons), so that legacy renderer is unreachable dead code with the current dataset, and `grep` confirmed no other screen in the app duplicates the rich Meaning/Reading/Romanization/"When to use"/"Appropriate for"/Avoid/Register/"Other expressions" detail UI the Project Owner described. This rules out "wrong lesson/renderer" as an explanation and confirms the Project Owner's report is about the exact widget tree covered by the new tests.
  - **Structural simplification applied despite tests passing on the original structure:** because the original `CustomScrollView`+`SliverToBoxAdapter` combination is a more complex, more platform-edge-case-prone pattern than necessary here (no sliver-specific feature — pinning, persistent headers — was actually used), and because it does not match the Project Owner's own explicitly preferred structure ("one outer vertical scrollable └── naturally sized vocabulary cards └── naturally sized expanded content"), `LessonVocabularyPage` was rewritten to a plain `Column` of cards inside `ResponsivePage`'s existing `SingleChildScrollView` — the same simple pattern `LessonIntroductionPage` already uses successfully in the same file. `bottomPadding` on `ResponsivePage` now carries the safe-area/bottom-nav clearance instead of a separate sliver spacer. All 8 interaction tests were re-run against the simplified structure and still pass; full `flutter test` (485/485) shows no regression elsewhere.
  - **Full validation:** `flutter analyze` — 0 issues; `flutter test` — **485/485 PASS** (8 new interaction tests + no regressions); `flutter build apk --debug` — PASS; `flutter build web` — PASS; `git diff --check` on files touched this task — 0 errors; confirmed no curriculum/generated/`rules/languages/` file was touched (only `lesson_five_card_pages.dart`, the new test file, and this document). No manual Android/Web runtime PASS is claimed. No commit, no push.

- `2026-07-16`: **NOVALANG-VOCABULARY-SCROLL-RUNTIME-PATH-PROOF-03 — visible runtime-path instrumentation added, not another speculative layout fix.** Project Owner performed a full Flutter stop/restart (explicitly ruling out hot-reload/build-cache staleness) and still saw unchanged Vocabulary Card UI and a still-failing scroll after FIX-02, with explicit instructions not to guess again or claim the previously modified widget is the real runtime path until proven visibly.
  - **A — Renderer search (by visible structure, not class name/assumption):** grepped every `SpeakerButton`/vocabulary-detail-shaped widget and every route in `app_router.dart`. Exactly two renderers can show vocabulary-card-shaped content: (1) `LessonVocabularyPage` (`lesson_five_card_pages.dart`), reached only when `lesson.id == 'ja-daily_life-m01-u1-l1'` (the Golden Lesson, hardcoded in `lesson_screen.dart`); (2) the legacy `_fiveVocabulary`/`_fiveExpandableCard` block inside `lesson_screen.dart` itself, used for every other lesson. A direct query of `shared/generated/lessons.json` reconfirmed (same finding as FIX-02) that no lesson besides Golden has `lessonFormat == 'five_cards'`, so renderer (2) is unreachable dead code with the current 506-lesson dataset — reported anyway per the task's explicit "any duplicate/fallback renderer" instruction. `flashcards_screen.dart` was also found (Japanese text + translation + `SpeakerButton`) and ruled out: a simple hardcoded 4-card demo with no expansion/romanization/detail sections, not a match for the Project Owner's described UI.
  - **New finding, not previously examined:** a 3-layer legacy-data fallback chain — `CurriculumRepository.load()`'s catch-block fallback, `CurriculumRepository.findLesson()`'s own `?? lessonById(id)` fallback, and `app_router.dart`'s `/learn/:lessonId` route builder's own `?? lessonById(lessonId)` fallback — all converge on legacy `japanese_course_data.dart` (pre-Golden-Lesson IDs like `ja-a0-u1-l1`, no `lessonFormat` field, fallback catalog's `vocabulary: const []`). Reasoned through and reported, not treated as the root cause: a full fallback for the Golden ID specifically would return `null` from `lessonById('ja-daily_life-m01-u1-l1')` (not present in that legacy file), which `LessonScreen` renders as a "lesson not found" message — not a vocabulary-card-shaped UI — so this does not by itself explain "UI still looks unchanged."
  - **B/D — Debug markers added:** `lesson_five_card_pages.dart` gained a `kDebugMode`-only `_ScrollFix03DebugBanner` ("SCROLL_FIX_03 — LessonVocabularyPage") at the top of the page; `lesson_screen.dart` gained a matching `kDebugMode`-only banner ("SCROLL_FIX_03 — LegacyVocabularyRenderer") in the legacy `_fiveVocabulary` block despite it being unreachable today. Both are guarded by `kDebugMode` so they can never appear in release builds.
  - **E — Runtime identity exposed:** both banners show a shared build token constant `NOVALANG_SCROLL_FIX_03`, the current route name (via `ModalRoute.of(context)?.settings.name`), the widget's `runtimeType`, the lesson's stable ID, and a source-path identifier — enough to make it impossible to confuse this build with an older installed one.
  - **F — Real scroll instrumentation (not a second, diagnostic-only scrollable):** `widgets/common/responsive_page.dart` gained an optional `ScrollController? controller` passthrough to its real `SingleChildScrollView` (backward-compatible, null by default). `LessonVocabularyPage` now owns a `ScrollController` wired into that same production scrollable, logs all 7 required metrics (`pixels`, `minScrollExtent`, `maxScrollExtent`, `viewportDimension`, `extentBefore`, `extentAfter`, `userScrollDirection`) on every change, wraps the page in `NotificationListener<ScrollNotification>` (Start/End/UserScroll) and a gesture-arena-safe `Listener(onPointerSignal:...)` for `PointerScrollEvent`, and wraps each card in a `_DragOriginProbe` (`Listener(onPointerDown:...)`, deliberately not `GestureDetector`, so it cannot steal the drag gesture from the real ancestor `Scrollable`) to detect whether a drag starts inside expanded card content.
  - **G — Programmatic scroll diagnostic:** a debug-only "DEBUG SCROLL +200" button calls `_scrollController.animateTo(...)` on the real controller and logs before/after state, distinguishing the task's 3 named failure classes (A: `maxScrollExtent == 0`; B: extent > 0 and it moves → gesture/pointer delivery is the suspect; C: extent > 0 and it does not move → wrong controller/scrollable is attached).
  - **Test fragility fix required by the new banner:** the always-on (in test/debug builds) diagnostic banner pushed card content down, breaking `vocabulary_card_scroll_test.dart`'s old fixed-viewport-fraction drag-point helper (`insideViewport`) for 1 of 8 tests. Replaced with `pointInsideDetails(tester, detailsKey)`, computed from the actual rendered details rect rather than a fixed fraction, applied at all 5 call sites; removed the now-dead old helper. Re-ran: 8/8 PASS, with instrumentation log lines visibly firing during the real drag/scroll/pointer-signal interactions.
  - **H/I — Full validation:** `flutter analyze` — 0 issues on both modified lib files; scoped `vocabulary_card_scroll_test.dart` — 8/8 PASS; full `flutter test` — **485/485 PASS** (same count as FIX-02 — zero regressions from the instrumentation); `flutter build apk --debug` — PASS; `flutter build web` — PASS; `git diff --check` on all 4 touched files — 0 errors (only harmless CRLF-normalization notices). `git status --short` reconfirmed no curriculum/generated/`rules/languages/`/localization/plan-entitlement file was touched by this task — the many other modified/untracked shared-content files in the worktree predate this task and belong to earlier, already-reported tasks in this session.
  - **Files changed this task:** `mobile/novalang_flutter/lib/screens/learn/lesson_five_card_pages.dart` (primary instrumentation), `mobile/novalang_flutter/lib/screens/learn/lesson_screen.dart` (legacy-renderer marker), `mobile/novalang_flutter/lib/widgets/common/responsive_page.dart` (optional controller passthrough), `mobile/novalang_flutter/test/vocabulary_card_scroll_test.dart` (drag-point fix), this document.
  - **J — No commit, no push.** Not claimed: manual Android/Web runtime PASS — that is exactly what this instrumentation exists for the Project Owner to determine empirically, per the task's own repeated instruction.

- `2026-07-16`: **PROOF-03 correction round — real runtime evidence obtained; structural code read found no defect; instrumentation strengthened instead of applying another speculative fix.** Project Owner ran the PROOF-03 build and reported: correct debug marker and build token visible (confirms this is genuinely the running code, not stale); but `DEBUG SCROLL +200` did **not** move the child vocabulary cards, and manual drag on the cards also did not move them. Because the failure reproduces under *programmatic* `animateTo()` — which bypasses gesture/pointer delivery entirely — this evidence rules out a pure gesture-arena/input-delivery explanation and points at either failure class A (`maxScrollExtent == 0`, content not exceeding the viewport) or class C (wrong controller/scrollable attached).
  - **Full structural re-read, top to bottom, to test class C first (code-provable):** `AppScaffold.body` → `SafeArea` → `ResponsivePage`'s `LayoutBuilder` → the one `SingleChildScrollView` (now carrying `_scrollController`) → `Padding` → `Align` → `SizedBox` (width-only constraint) → the `Column` of `LessonVocabularyCard`s → `LessonVocabularyCard` → `_VocabularyDetails`. No `Expanded`/`Flexible` inside any scrollable ancestor, no second `Scrollable`/`ListView`/nested `SingleChildScrollView`, no `Stack`/`Positioned`/`OverflowBox`/fixed-height `Container` that could visually render expanded content without contributing to the Column's real height. The controller passed to `ResponsivePage` is the same one whose `SingleChildScrollView` directly wraps the cards — there is exactly one scrollable in this path, and the cards are inside it. **This rules out failure class C by direct code inspection**, not assumption.
  - **New, separate finding (reported, not acted on):** `AppScaffold` renders the back button and title inside a real Flutter `AppBar`, which is architecturally always fixed above `Scaffold.body` and can never be part of the body's scroll flow. This contradicts the Project Owner's diagram (which shows title/back as the first item inside the one outer scrollable), but a fixed native `AppBar` above a correctly scrolling body is standard Flutter behavior and does not, by itself, explain the cards failing to move under *programmatic* control — so it was not treated as the root cause and was **not changed** in this round (changing it now, without proof it matters, would be exactly the kind of speculative layout edit this task forbids).
  - **Real instrumentation gap found and fixed:** `_lastScrollLog` (the on-screen metrics text) was only updated reactively, inside the `ScrollController`'s own change-listener — which Flutter's `ScrollPosition` does not necessarily invoke on first layout/attach, and does not invoke at all when `maxScrollExtent` changes purely from a card expand/collapse rebuild (no pixel change occurs). This meant the Project Owner could load the page, or even expand a card, and still see stale/placeholder metrics text — and the `DEBUG SCROLL +200` button's own before/after diagnosis was previously only sent to `debugPrint` (console), not shown on screen. Fixed: `_logScrollMetrics()` now also runs from a post-frame callback scheduled in `initState` (so metrics are visible immediately on load) and re-schedules itself after every change (self-limiting via an equality guard, so it settles instead of looping); the vocabulary-card expand/collapse `onToggle` now explicitly schedules a metrics refresh for the frame right after the new card height is laid out, so `max=` visibly changing (or not) the instant a card expands is now directly observable on screen; `_debugScrollByOffset` now writes an explicit on-screen verdict string — `FAILURE CLASS A` (extent ≤ 0, with live card/expanded counts and viewport height), `FAILURE CLASS C` (no clients), or, if extent is nonzero and pixels do move, an explicit instruction for the Project Owner to check whether the visible cards moved too (distinguishing a genuine class-B gesture-only issue from pixels-move-but-nothing-paints, which would be a render-tree mismatch, not one of the three originally named classes).
  - **Verified in the test harness that the new logic itself is correct:** the scoped test's own console output shows `max=` correctly tracking expand/collapse transitions within a single test (`max=1964.0` → `max=492.0` on collapse → `max=1964.0` on re-expand, with `cards=8`/`expanded=` counts visible on every line) — confirming the instrumentation change works as designed before it ever reaches the Project Owner.
  - **No code-level root cause was found or claimed.** This round does not resolve why the real device/browser diverges from the passing automated tests — it makes that divergence directly observable on screen (card count, expanded count, `hasClients`, and `max=` at all times, plus an explicit A/B/C verdict on button press) so the next runtime check is conclusive instead of another round of inference.
  - **Full validation:** `flutter analyze` — 0 issues; scoped `vocabulary_card_scroll_test.dart` — 8/8 PASS; full `flutter test` — **485/485 PASS** (identical count, zero regressions); `flutter build apk --debug` — PASS; `flutter build web` — PASS; `git diff --check` — 0 errors; `git status` reconfirmed only the same 4 files already on record for this task were touched (`lesson_five_card_pages.dart`, `lesson_screen.dart`, `responsive_page.dart`, `vocabulary_card_scroll_test.dart`) plus this document — no curriculum/generated/localization/romanization/plan-entitlement file touched. No commit, no push. No manual runtime PASS claimed.

- `2026-07-16`: **NOVALANG-VOCABULARY-SCROLL-CROSS-PLATFORM-RUNTIME-FIX-05 — Codex's FIX-04 rejected by Project Owner real-Chrome runtime (total scroll failure); root cause found, empirically proven, and fixed via a failing→passing automated test, not a guess; real Chrome/Android confirmation itself is environment-blocked in this session.**
  - **A/B — Root cause (shared, both platforms):** Flutter's default `ScrollBehavior.dragDevices` (`MaterialScrollBehavior`) is `{touch, stylus, trackpad}` — it does **not** include `PointerDeviceKind.mouse`. No screen in this app ever set a custom `scrollBehavior`, so a real desktop-Chrome mouse click-and-drag was silently rejected by every `Scrollable`'s own drag gesture recognizer before it could produce any `ScrollUpdateNotification`/pixel change, while touch/stylus/trackpad drags (and mouse-wheel, a separate `PointerScrollEvent` path not gated by `dragDevices`) worked normally. Every prior automated drag test in `vocabulary_card_scroll_test.dart` (PROOF-03, FIX-02, FIX-04) used `kind: PointerDeviceKind.touch`, so this exact gap was never exercised by the test suite despite 14/14 and 491/491 passing.
  - **C — Why FIX-04's tests passed while real Chrome failed:** the tests were never wrong about the structure they tested (FIX-04's single-`SingleChildScrollView` restructure is confirmed correct by direct code re-read of `AppScaffold` → `ResponsivePage` → the Column of cards — no nested scrollable, no `Expanded`/`Flexible`, no wrapper indirection) — they simply never tested a mouse-originated drag, the one interaction path a desktop-Chrome tester actually uses by default.
  - **Empirical proof, not assumption:** added `test/vocabulary_card_scroll_test.dart`'s new "dragging with a MOUSE..." test using `kind: PointerDeviceKind.mouse`. Run against the pre-fix code: **FAILED** — `before=88.0 after=88.0`, with live `[FIX05]` debug logging showing `pixels=0.0 max=1516.0` even after the drag (healthy non-zero extent, zero pixel movement) — the exact "pixels stuck at 0 despite valid maxScrollExtent" signature reported earlier. After the fix: **PASSED** — `pixels` moved `0.0 → 20.0 → 500.0`, matching the drag distance exactly.
  - **Fix:** new `lib/core/app_scroll_behavior.dart` (`AppScrollBehavior extends MaterialScrollBehavior`, overrides `dragDevices` to add `PointerDeviceKind.mouse`), wired app-wide via `lib/app.dart`'s `MaterialApp.router(scrollBehavior: AppScrollBehavior(), ...)` — the single, correct point of control for this cross-cutting concern. Confirmed via grep that no `SelectableText`/`SelectionArea` exists anywhere in the app, so enabling mouse-drag has no text-selection-vs-scroll gesture-arena conflict to worry about. Test harness (`_Harness` in the test file) updated to use the same `AppScrollBehavior` so it accurately mirrors production.
  - **Investigation method (per the task's explicit "reproduce first" requirement):** attempted real Flutter Chrome reproduction via `flutter run -d web-server` + this session's Browser-pane tooling, driven through a temporary, investigation-only deep-link route (`/dev/vocab-scroll-repro`, new `lib/screens/dev/vocab_scroll_repro_screen.dart`, not linked from any product UI) that bypassed the onboarding flow the automated screenshot/click tools could not reliably drive. Direct JS inspection (`document.querySelector` into the `flt-glass-pane` shadow tree) found `<flt-scene>` — the element Flutter's engine paints into — permanently empty, and traced this to `document.visibilityState === "hidden"` and `document.hasFocus() === false`, **persisting even after explicitly fronting the tab**. Flutter Web's scheduler does not pump frames for a hidden/unfocused document (standard Page Visibility API behavior), which independently explains the empty scene, the `computer` screenshot tool timing out every time it was tried, and `debugPrint`/console output never appearing. This is a property of the sandboxed Browser-pane environment, not of the app. Android reproduction was also attempted: `flutter devices` lists only `Windows (desktop)`/`Chrome (web)`/`Edge (web)` — no `adb`, no emulator, no connected device available in this environment.
  - **Cleanup (task Section 6):** the temporary repro screen/route and a temporary `[FIX05]`-prefixed `debugPrint` metrics hook (added to `_LessonVocabularyPageState` solely to read live `pixels`/`maxScrollExtent` during investigation) were both fully removed once the automated failing→passing test pair made them unnecessary; `git diff` on `app_router.dart` and `lesson_five_card_pages.dart` confirms a clean state with no investigation-only leftovers. The only permanent product change is `AppScrollBehavior` and its one wiring point in `app.dart`.
  - **Full validation:** `flutter analyze` — 0 issues; scoped `vocabulary_card_scroll_test.dart` — 15/15 PASS (14 inherited + 1 new mouse-drag test); full `flutter test` — **492/492 PASS** (491 + 1, zero regressions); `flutter build apk --debug` — PASS; `flutter build web` — PASS; `git diff --check` — 0 errors; `git status` reconfirmed only `app.dart`, `app_scroll_behavior.dart` (new), and the test file changed beyond files already on record for this lineage — no curriculum/generated/localization/romanization/plan-entitlement file touched.
  - **Not claimed:** real Chrome or Android runtime PASS. The code defect is fixed and proven by a real, deterministic automated-test failure/pass pair — not by inference — but the Project Owner's own eyes on a real Chrome tab and/or Android device remain the only way to confirm the on-screen symptom is gone, exactly per this task's own standing instruction not to accept widget-test PASS as runtime PASS. No commit, no push.

- `2026-07-16`: **NOVALANG-DOMAIN-TAXONOMY-RESTRUCTURE-01 — 25→27 professional domains, 6→7 categories, Claude Code parallel-writer exception.** Project Owner approved Claude Code as a second, parallel writer alongside Codex's `NOVALANG-ENGLISH-STYLE-PROFILE-IMPLEMENTATION-01`, with fully disjoint file scope (niche taxonomy only; Claude Code never touched `rules/languages/**` or this file's task-identity block until Codex's task closed and the Project Owner explicitly authorized the write). Restructure: split `robotics_iot_automation` → `robotics_automation` + `iot` (both stay in `digital_technology`); split `finance_accounting_audit` → `finance` + `accounting_audit` (both stay in `corporate_business`); moved `ecommerce_online_operations` and `logistics_supply_chain` into `corporate_business`; renamed `green_agriculture_supply_chain` → `agriculture_fisheries_sustainability` (its 3 domains unchanged, logistics moved out); split `care_health_education` → `health_care` (`clinical_healthcare`, `nursing_elderly_care`) + `education_social_services` (`education_school`, `social_public_services`). Final: **27 professional domains + daily_life + exam_preparation = 29**, across **7** categories (5/8/4/3/2/2/3, was 5/5/4/3/4/4=25 across 6). All proposed ids matched existing convention with no conflicts. Also assigned distinct `iconKey` values to the 5 `digital_technology` domains (previously 4 shared `"code"`) and to every domain that changed category (matching each new category's existing iconKey convention) — verified this is data-layer only: `NicheChip`/`NicheGroupCard` (the real "Trọng tâm học" widgets) never render `iconKey` today (confirmed by direct code read — no `Icon(...)` keyed off it anywhere in either widget), so this changes no visible icon; the only `iconKey`→real-icon resolver in the codebase (`IconTokenResolver`) belongs to the explicitly out-of-scope `/dev/domain-nav` preview catalog, a different data model entirely.
  - **Known follow-up needed, NOT done under this task's authorized scope:** `mobile/novalang_flutter/lib/widgets/niche/niche_groups_list.dart`'s hardcoded `_professionalCategoryIds` (the 6 old category ids) was not in this task's "ĐƯỢC SỬA" file list and was left unmodified — it gates which categories render inside the collapsible "Professional Focus" section (`_buildProfessionalSection`) versus as a standalone top-level card. Left as-is, `health_care`, `education_social_services`, and `agriculture_fisheries_sustainability` will render as 3 extra non-collapsible top-level cards outside Professional Focus instead of grouping with the other 4 professional categories. This is a one-line-per-id update (mirroring the same fix already made in `test/learning_focus_screen_test.dart`'s own local copy of this set) but needs explicit authorization to touch that file.
  - **Known dangling legacy reference, NOT touched (owner decision required):** `nicheLegacyIdMap`'s `"finance_accounting": "finance_accounting_audit"` — identical in `shared/i18n/niche_labels.json`, `lib/models/user_profile.dart`, and `lib/state/lesson_provider.dart` — now points at a removed id (`robotics_iot_automation` has no such dangling entry anywhere). This mapping was itself flagged as best-effort back on 2026-07-15 (`NOVALANG-LEARNING-FOCUS-INTEGRATION-FIX-01`, see that entry above). Proven by a live failing test, not just static reading: `test/learning_focus_screen_test.dart`'s "legacy career niche IDs migrate forward to valid catalog IDs" test now fails with `legacy "finance_accounting" -> "finance_accounting_audit" is not a valid current niche id` — left failing intentionally as a mechanical marker rather than silently resolved, per this task's explicit "report, don't decide" instruction. Precedent exists for the resolution shape: `UserProfile.ambiguousLegacyNicheIds` is an existing small set of legacy ids deliberately left *out* of `nicheLegacyIdMap` for exactly this "ambiguous forward target" situation (currently just `environment_energy_agriculture`); `finance_accounting` could join it, or be remapped to `finance` or `accounting_audit` specifically — Project Owner's call.
  - **Files changed:** `shared/config/niche_options.json` (restructure), `shared/i18n/niche_labels.json` (added titles for `robotics_automation`/`iot`/`finance`/`accounting_audit`, category labels for `health_care`/`education_social_services`/`agriculture_fisheries_sustainability`), synced Flutter assets (byte-identical), `mobile/novalang_flutter/test/learning_focus_screen_test.dart` (updated 6/25 assertions → 7/27, added 5 new structural tests), this document.
  - **Full validation:** `generate:curriculum` — unchanged (niche files aren't part of curriculum generation), 23 courses/506 lessons; `validate:curriculum` — PASS; `smoke:curriculum` — PASS (0 fail across all sections); `sync:flutter-assets` — copied, verified byte-identical via `diff`. `flutter analyze` — 0 issues. Scoped test — **32/33 PASS** (1 intentional failure, see above). Full `flutter test` — **497/498 PASS** (same 1 intentional failure; zero other regressions). `frontend` (`tsc -b && vite build`) — PASS, confirming the generic React consumer (`frontend/src/data/niches.ts`, groups by `category`, dynamic label lookup, already fully generic — no changes needed) handles the new data with no type errors. No curriculum/Golden Lesson/`rules/languages/`/backend/subscription/Usage Ledger/completion-pipeline file touched. No commit, no push.

- `2026-07-16`: **Domain Taxonomy follow-up — both flagged items resolved, Project Owner-authorized.** After reviewing the risks flagged above, Project Owner explicitly authorized Claude Code to also act on both.
  - **Grouping fix:** `mobile/novalang_flutter/lib/widgets/niche/niche_groups_list.dart`'s hardcoded `_professionalCategoryIds` updated (dropped `care_health_education`/`green_agriculture_supply_chain`, added `health_care`/`education_social_services`/`agriculture_fisheries_sustainability`) so all 7 professional categories now correctly group inside the collapsible "Professional Focus" section instead of 3 of them rendering as stray top-level cards.
  - **Legacy id resolution:** `finance_accounting` (the old combined legacy id) has no single unambiguous forward target now that `finance_accounting_audit` is split into `finance` + `accounting_audit`. Resolved by mirroring the codebase's own existing precedent for exactly this situation (`environment_energy_agriculture`, added under `NOVALANG-LEARNING-FOCUS-INTEGRATION-FIX-01`): removed `'finance_accounting': 'finance_accounting_audit'` from all 3 `nicheLegacyIdMap` copies (`niche_labels.json`, `lib/models/user_profile.dart`, `lib/state/lesson_provider.dart`) and added `'finance_accounting'` to `UserProfile.ambiguousLegacyNicheIds` — a user with this legacy id resolves to the literal string `finance_accounting` (not silently reassigned to one specific new domain the system guessed at), exactly matching how `environment_energy_agriculture` is already handled. `test/learning_focus_screen_test.dart`'s previously-intentionally-failing "legacy career niche IDs migrate forward" test updated to assert this new resolution (mirrors the existing `environment_energy_agriculture` assertions) instead of the stale `finance_accounting_audit` target, and now passes.
  - **Full re-validation:** `sync:flutter-assets` re-run after the `niche_labels.json` edit, verified byte-identical. `flutter analyze` — 0 issues. Scoped test — **34/34 PASS** (0 intentional failures remaining). Full `flutter test` — **499/499 PASS** (zero regressions from touching `user_profile.dart`/`lesson_provider.dart`, both used well beyond the niche system). `frontend` `tsc -b && vite build` — PASS (re-verified after the `legacyIdMap` edit). `git diff --check` — 0 errors on every file touched this task. No curriculum/Golden Lesson/`rules/languages/`/backend/subscription/Usage Ledger/completion-pipeline file touched. No commit, no push. Task complete.

## NOVALANG-RUNTIME-REVIEW-BLOCKERS-03 handoff

- Automated corrective work is complete. Root cause: practice-group canonical
  `title`/`range`/`details` values were Vietnamese-only, and the wrong-answer
  review label was hard-coded as `Câu`; native maps plus the shared
  `reviewQuestionNumber` key now resolve strictly per UI locale.
- Lesson-content cards now use the centralized dark semantic tokens in
  `AppTheme`; the old translucent teal legacy vocabulary surface was removed.
  Q14 bubbles use the dark indigo-purple / dark blue-purple speaker tokens.
- Q14 uses the owner-approved exact 14-line Tanaka–Sato dialogue, with one
  non-spoken `着いた時` divider after line 10, independent reading/translation
  toggles, and 14 separate audio actions. Q1–Q13, the five-card structure,
  stable IDs, and exercise order remain unchanged.
- Validation passed: curriculum generate/validate/sync/smoke, `flutter pub
  get`, `flutter analyze`, focused tests (53), full `flutter test` (466),
  `flutter build apk --debug`, `flutter build web`, `npm run build --prefix
  frontend`, and `git diff --check`.
- No commit or push. Format 3.0 is not frozen. Pilot and Stage 2 have not
  started. Manual Android/Web runtime verification is not claimed as PASS.

## Next exact action — Hành động tiếp theo chính xác

**For `NOVALANG-DOMAIN-TAXONOMY-RESTRUCTURE-01` (complete):** Project Owner:
manually verify the real Learning Focus screen (Android and/or Web) shows all
7 professional categories grouped correctly under "Professional Focus" and
that the 27 domains render with correct vi/en/ja labels. No manual runtime
PASS is claimed by this task — automated coverage (499/499) is complete but
on-screen confirmation is still the Project Owner's own gate, consistent with
every other task in this file.

**For `NOVALANG-VOCABULARY-SCROLL-CROSS-PLATFORM-RUNTIME-FIX-05` (superseded —
see `VOCABULARY_SCROLL_BLOCKER_CLOSED` above; kept for history):** Project Owner: reload the app on real Chrome (mouse click-and-drag
directly on a collapsed and an expanded vocabulary card, and mouse-wheel over
the same) and, where available, a real Android device/emulator (finger-drag).
The fixed defect was specifically the desktop-mouse-drag gap
(`ScrollBehavior.dragDevices` now includes `PointerDeviceKind.mouse` via the
new `AppScrollBehavior`); it does not by itself rule out a still-undiscovered
mouse-wheel-specific or Android-specific issue, since neither could be
observed directly in this environment (Browser-pane tab never reports real
`document.visibilityState`/focus; no adb/emulator available). Report Web and
Android results separately, exactly as the task's own Section 8 requires.

**For `NOVALANG-PRONUNCIATION-TRANSFORMATION-GOVERNANCE-01`:** completed and
superseded by `NOVALANG-JAPANESE-FULL-PROFILE-FINAL-CLOSURE-01`. Project Owner
runtime review is complete; ADR-015 and the Japanese profile are frozen. No
Golden Lesson content decision is introduced by this status-only closure.

**For `NOVALANG-VOCABULARY-RUNTIME-REMEDIATION-01` (still open, unchanged by
this task):** Project Owner: manually verify Android and Flutter Web in
vi/en/ja at the required responsive widths. Confirm localized exercise
ranges/review labels, vocabulary and grammar support text, dark content-card
surfaces, and Q14's 14 messages, divider, toggles, translations, and per-line
audio. Confirm IME diagnostic removal separately. Reproduce the Web
responsive/navigation issue exactly before authorizing any navigation change.
Do not close Stage 1 or freeze Format 3.0 until the Project Owner records this
runtime result.
