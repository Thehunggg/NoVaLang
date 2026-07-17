# NovaLang Agent Instructions

Đây là project NovaLang.

## Project path

Work only inside:

`C:\Dev\NovaLang\novalang`

## Project structure

- React Web: `frontend/`
- Android / iOS Flutter: `mobile/novalang_flutter/`
- Shared source of truth: `shared/`

## Cross-Platform Product Strategy — Chiến lược sản phẩm đa nền tảng

NovaLang targets three first-class platforms:

```text
Web
Android
iOS
```

### Android-first is not Android-only

Android is the current primary **validation** target (emulator/device, tests,
debug APK). That priority does not mean Android-only architecture.

### Mobile codebase (Android + iOS)

Android and iOS share one Flutter/Dart mobile application under
`mobile/novalang_flutter/`.

By default they must share:

- Dart models
- business rules
- application services
- repository interfaces
- application state
- lesson flow
- lesson content consumption
- design system
- most widgets, screens, and navigation logic
- tests

Do not create two full separate Android/iOS screen trees unless a concrete
technical need exists and an approved ADR documents it.

UI must be **responsive** (screen size) and **platform-adaptive** (platform
conventions). Pixel-identical Android/iOS UI is not required. Allowed
adaptations include back behavior, swipe-back, transitions, dialogs, pickers,
permission UX, system bars, and Safe Area.

### Web target

Web is a first-class product target, not a side demo.

Do not assume Web must use Flutter Web. Respect the existing repository
architecture (`frontend/` for React Web, `mobile/novalang_flutter/` for the
Flutter mobile app, `shared/` for shared truth).

Web and mobile must stay aligned on:

- shared contracts
- stable IDs
- curriculum/content schemas
- lesson data
- plan/entitlement semantics
- API semantics
- validation rules
- event names
- localization keys
- design principles
- product behavior

UI source may differ between React Web and Flutter mobile. Do not unnecessarily
duplicate business rules across platforms. Platform-specific Web or native
implementations must still follow the same shared contracts and product
behavior.

### Platform-specific code

Use platform-specific code only when required for permissions, microphone,
audio session, TTS, speech recognition, notifications, native auth, IAP, deep
links, file system, signing, native plugins, or platform navigation
conventions.

Isolate that code behind an interface, adapter, provider, or platform service.
Do not scatter `Platform.isAndroid` / `Platform.isIOS` / browser-unsafe
`dart:io` checks through shared domain or business logic. Prefer
`kIsWeb` / `defaultTargetPlatform` for UI adaptive behavior, and adapters for
native capabilities.

### Validation status

- Android: primary runtime validation target today.
- Web: must remain buildable; keep responsive browser behavior; do not break
  the Web target when adding shared features.
- iOS: source/configuration compatibility must be maintained from the start.
  Do **not** claim iOS runtime/build PASS without macOS + Xcode or a cloud
  macOS/iOS build.

### Required platform impact report

Every feature/task report must include:

```text
Shared behavior:
Android status:
Web status:
iOS compatibility:
Platform-specific code:
Deferred platform validation:
```

Do not report “cross-platform complete” only because Android tests passed.

## Platform and shared-data scope

For a UI-only task, modify only the requested platform. This includes layout,
responsive UI, card/button styling, navigation, and platform-specific screen
behavior.

For shared data, business logic, curriculum, localization, profile,
subscription, exercise/checking, or catalog work, update `shared/` first, then
sync the affected Web and Flutter consumers. Do not create inconsistent
platform-only copies of shared data. If Flutter must mirror shared JSON, update
the shared source and document the sync; do not hand-edit copied assets.

Trước khi thực hiện bất kỳ task nào, bắt buộc phải đọc:

- .cursor/rules/novalang.mdc (Core Rules; equivalent to the absent 01_novalang_core.mdc)
- .cursor/rules/02_novalang_lesson_standard.mdc

For pronunciation, reading, romanization, or TTS-language rules, also read
the global gateway `.cursor/rules/05_novalang_pronunciation_profiles.mdc` and
the applicable canonical directory under `rules/languages/<languageCode>/`.

For tasks that create, edit, translate, audit, or release user-facing content,
also read `rules/content/naturalness-and-register.md` and the applicable
`rules/languages/<languageCode>/style-and-register.md`. If the approved
language style profile does not exist, report
`LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`; the global baseline alone cannot
grant release `PASS`.

For a task that creates or changes an opt-in `lessonFormat: five_cards` lesson, also read:

- .cursor/rules/03_novalang_lesson_format_2_0.mdc
- .cursor/rules/04_novalang_lesson_format_3_0.mdc (Q14 only — the Format 2.0
  Q14 row/policy is superseded for lessons opted into Format 3.0; every other
  part of Format 2.0 remains authoritative)

Apply those rules in this order: `AGENTS.md`, `novalang.mdc`, Lesson Format
3.0 (`04`, Q14 behavior only), Lesson Format 2.0 (`03`, everything else),
then Lesson Standard (`02`).

---

# Vai trò

Bạn là Software Engineer.

Bạn KHÔNG phải:

- Product Designer
- UI Designer
- UX Designer
- Curriculum Designer
- Language Teacher

Không được tự thay đổi các quyết định sản phẩm đã được phê duyệt.

---

# Không được tự sáng tạo

Không được tự:

- thiết kế lesson
- thiết kế UI lesson
- thiết kế format lesson
- chọn từ vựng
- viết hội thoại
- viết ngữ pháp
- viết bài tập
- thay đổi lesson flow
- thay đổi số lượng card
- thay đổi plan
- đơn giản hóa nội dung
- dịch máy sang ngôn ngữ khác để tạo lesson

Nếu prompt chưa cung cấp đủ nội dung:

→ Dừng.
→ Báo thiếu gì.

Không được tự suy diễn.

---

# Lesson Format 2.0 (five_cards)

`03_novalang_lesson_format_2_0.mdc` is the frozen Single Source of Truth for
the opt-in `five_cards` format. Its golden reference is
`ja-daily_life-m01-u1-l1`.

`04_novalang_lesson_format_3_0.mdc` is the Single Source of Truth for Q14's
behavior only (owner-approved breaking change, 2026-07-15): Q14 is a
non-graded `real_world_practice_dialogue`, not `controlled_ai_text`. Format
2.0 remains authoritative for Q1–Q13, the five cards, access plans, and every
other part of the format.

`unit_comprehensive_conversation` is a separate, Unit-level shell activity.
It renders immediately after the third child Lesson inside each standard Unit,
is gated to Plus/Pro/Ultimate, and must never be conflated with per-Lesson
Q14. See ADR-014 in `docs/ai/ARCHITECTURE_DECISIONS.md`.

Do not migrate legacy lessons automatically, and do not create or alter lesson
content, plans, exercise flows, or UI decisions without an approved owner
instruction.

---

# Shared Source Of Truth

Nếu task ảnh hưởng:

- lesson
- curriculum
- vocabulary
- dialogue
- grammar
- exercises
- localization
- language
- level
- niche
- domain
- subscription
- profile
- generator
- validator

thì phải sửa Shared Source Of Truth.

Không sửa generated JSON bằng tay.

Quy trình:

Source
↓

Generate
↓

Validate
↓

Sync

For changes under `shared/config/` or `shared/i18n/`, run
`npm run sync:flutter-assets` after the approved source change. Do not manually
edit `mobile/novalang_flutter/assets/shared/` unless explicitly instructed.

---

# Localization

All user-facing UI labels, explanations, hints, feedback, and meaning options
follow the selected UI language through localization. Learning-language text
remains in the learning language. Do not leave English UI/options in a
Vietnamese UI unless English is the learning target.

## UI Language Purity

- All user-facing app chrome uses `uiLanguageCode`.
- When the app has no separately selected UI language, `uiLanguageCode`
  defaults to `nativeLanguageCode`.
- Never silently fall back from Vietnamese or Japanese UI to English.
- Do not hard-code English display strings in widgets, models, or catalogs.
- User-facing display strings live in the Shared i18n Source of Truth and must
  have non-empty `vi`, `en`, and `ja` values before release.
- Missing keys/locales fail validation and tests. Development builds may log or
  render a missing-key sentinel, but must not cross language boundaries.

Allowed exceptions are brand names, proper nouns, standardized exam names,
approved technical acronyms (for example AI and UI/UX), user-generated
content, and target-language learning content.

## Learning Content Language Purity

- `learningLanguageCode` owns target words/sentences, dialogue, pronunciation,
  and target-language reading.
- `nativeLanguageCode` owns learner-support content: translations, meanings,
  grammar/usage/context explanations, hints, instructions, feedback, review
  explanations, and lesson/unit/module support titles.
- `uiLanguageCode` owns app chrome, navigation, buttons, tabs, status,
  settings, dialogs, and accessibility labels.
- Learner-support fields must have non-empty `vi`, `en`, and `ja` values in the
  approved Shared content source. Missing content fails generation/validation;
  runtime code must not fall back to another language.
- Content caches/providers include `nativeLanguageCode` in resolution or keep
  cached data language-neutral and re-resolve it whenever native language
  changes.
- Do not use runtime machine translation, widget heuristics, or hard-coded
  language switches.

The same exceptions apply to target-language content, proper nouns, NovaLang,
standardized exam names, and approved technical acronyms. Vietnamese or
English instructional sentences are never allowlisted in Japanese native
mode.

## Naturalness and Register

The canonical writing-quality and register architecture is
`rules/content/naturalness-and-register.md` (ADR-016). It applies separately to
target-language text, natural translation/learner support, and UI copy. The
default base register is `NATURAL_NEUTRAL_POLITE`; language-specific rules live
only in `rules/languages/<languageCode>/style-and-register.md`. Do not use
heuristics or LLM scores to auto-PASS content, and do not alter approved content
without a separately authorized content task.

---

# Checks and reporting

For Web tasks, run `npm run build`. For Flutter tasks, run `flutter pub get`
and `flutter analyze`, and run `flutter build apk --debug` when the task or
workspace rules require it. Report a missing SDK or configuration issue clearly.

The final report identifies the working directory, task type, changed shared,
Web, and Flutter files, sync status, platform impact for Web/Android/iOS, and
each requested build/analyze/test result.

---

# Sau khi hoàn thành

Luôn báo:

- File đã sửa
- Shared source đã sửa
- Schema thay đổi
- Generate
- Validate
- Build
- Analyze
- Test

Không commit nếu người dùng chưa yêu cầu.

# Multi-Agent Development Protocol — Quy trình phát triển nhiều AI

## Shared authority — Nguồn rule chung

`AGENTS.md` is the shared source of truth for Claude Code, Codex, and Cursor.

All agents must also read:

- `docs/ai/ACTIVE_TASK.md`
- applicable files under `.cursor/rules/`
- relevant shared contracts and frozen specifications

Tool-specific files may reference this file, but must not duplicate or redefine its business rules.

## Default agent order — Thứ tự AI mặc định

The default implementation and takeover order is:

1. Claude Code
2. Codex
3. Cursor

The project owner may explicitly override this order for a specific task.

## Single-writer rule — Quy tắc một người sửa

Only one AI may hold write ownership at a time.

Other agents must remain read-only unless ownership is explicitly transferred.

Never allow two agents to edit the same project files concurrently.

## Active ownership — Quyền sở hữu task

Before editing, every agent must read `docs/ai/ACTIVE_TASK.md`.

The agent may edit only when:

- it is listed as `Current owner`; or
- the project owner explicitly assigns ownership in the current conversation.

If ownership is unclear, the agent must remain read-only.

## Dirty worktree protection — Bảo vệ worktree đang có thay đổi

The worktree may contain unrelated modified and untracked files.

Never run destructive or broad cleanup commands, including:

- `git reset`
- `git clean`
- `git stash`
- `git checkout`
- `git restore`
- broad auto-formatting
- deletion of untracked files

Do not revert or overwrite changes created before the current task.

## Git restrictions — Hạn chế Git

Do not run the following unless the project owner explicitly approves:

- `git add`
- `git commit`
- `git push`
- branch creation or switching
- rebasing
- merging
- force operations

## Task scope — Phạm vi task

Before coding, confirm:

- task ID;
- task goal;
- current owner;
- allowed files;
- forbidden files;
- frozen specifications;
- required tests;
- exact next action.

Do not modify files outside the approved scope.

## Takeover protocol — Quy trình tiếp quản

When taking over from another AI:

1. Start in read-only mode.
2. Run:
   - `pwd`
   - `git rev-parse --show-toplevel`
   - `git status --short`
   - `git diff --check`
3. Read:
   - `AGENTS.md`
   - `docs/ai/ACTIVE_TASK.md`
   - the previous handoff
   - all task files currently changed
   - related tests and contracts
4. Verify the previous agent's work from source and diff.
5. Continue from the recorded next action.
6. Do not rewrite working code without identifying a concrete blocker.

## Handoff requirement — Yêu cầu bàn giao

Before stopping because of quota, context, interruption, or tool switching, the current owner must update the handoff information with:

- completed work;
- files changed;
- unfinished work;
- last commands run;
- passing and failing tests;
- known blockers;
- known risks;
- exact next action;
- files that must not be modified.

## Sudden interruption recovery — Khôi phục khi bị gián đoạn

If the previous agent could not write a handoff, the next agent must reconstruct state using:

- `git status --short`
- `git --no-pager diff --stat`
- scoped `git --no-pager diff`
- existing test output
- `docs/ai/ACTIVE_TASK.md`

Never assume incomplete changes should be deleted.

## Rule priority — Thứ tự ưu tiên

When information conflicts, use this priority:

1. Frozen specifications
2. Approved architecture decisions
3. Shared contracts
4. `docs/ai/ACTIVE_TASK.md`
5. Platform-specific rules
6. Source and tests
7. README and general documentation
8. Temporary conversation summaries

README must not override a frozen rule or verified source contract.

## NovaLang protected facts — Sự thật được bảo vệ

- Git root: `C:/Dev/NovaLang/novalang`
- Golden Reference Lesson ID: `ja-daily_life-m01-u1-l1`
- Golden Reference Lesson has exactly 5 main cards.
- Golden Reference Lesson has exactly 14 exercises.
- Shared contracts must remain platform-neutral.
- Usage, progress, mastery, XP, and canonical events must remain separated unless an approved task explicitly integrates them.

## Before coding — Trước khi code

The active writer must report:

- workspace verification;
- files intended to change;
- implementation plan;
- risks or ambiguities.

## After coding — Sau khi code

The active writer must report:

- files added or modified;
- behavior implemented;
- commands executed;
- test and analysis results;
- remaining risks;
- deferred work;
- whether shared contracts or frozen content changed;
- final readiness verdict.
