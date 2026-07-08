# NovaLang AI Workflow Rules

## Purpose

This file explains how to use Codex and Cursor together without breaking NovaLang.

## Project structure

NovaLang has two platforms:

- Web React: frontend/
- Android Flutter: mobile/novalang_flutter/
- Shared source: shared/

## Tool responsibility

### Codex

Codex mainly handles:

- Web React
- frontend UI
- Web login screen
- Web lesson page
- Web profile/settings
- Web build checks

Main folder:

frontend/

### Cursor

Cursor mainly handles:

- Android Flutter
- Flutter screens
- Android layout
- Flutter navigation
- Flutter local storage
- Flutter build/analyze

Main folder:

mobile/novalang_flutter/

### Shared source

Shared product data and logic should live in:

shared/

Recommended folders:

- shared/config/
- shared/content/
- shared/i18n/
- shared/assets/

## Most important rule

UI-only changes can be platform-specific.

Shared data and logic changes must update shared/ first, then Web and Flutter must be synced.

## UI-only examples

These can be done only on the requested platform:

- Web navbar
- Android bottom navigation
- button style
- card style
- screen spacing
- responsive layout
- Flutter page design
- React page design

## Shared-data/business-logic examples

These must update shared/ first:

- language list
- language search aliases
- flags/language icons
- localization/i18n
- niche list
- exam track list
- level system
- lesson data
- vocabulary data
- grammar data
- kana/kanji data
- exercise data
- exercise builders
- answer checking
- accepted answers
- placement test
- daily goal
- heart/streak rules
- profile schema
- onboarding choices
- subscription plans
- AI quota rules

## Correct workflow

### Web UI-only task

Use Codex.

Prompt example:

This is a Web UI-only task.
Follow AGENTS.md.
Edit only frontend/.
Do not touch Flutter or shared unless necessary.
Run npm run build.

### Android Flutter UI-only task

Use Cursor.

Prompt example:

This is an Android Flutter UI-only task.
Follow .cursor/rules/novalang.mdc.
Edit only mobile/novalang_flutter/.
Do not touch Web or shared unless necessary.
Run flutter analyze.

### Shared data/business logic task

Use shared rule.

Prompt example:

This is a shared-data/business-logic task.
Follow AGENTS.md and NovaLang shared rule.
Update shared/ first.
Then update Web and Flutter so both use the same data/logic.
Do not create inconsistent platform-only versions.

## Current product strategy

NovaLang is Android-first.

Current priority:

1. Shape the app UI and learning flow using JSON/local data.
2. Complete Android MVP first.
3. Keep Web working and aligned with shared data.
4. Build database/API later after the schema is stable.
5. Move shared JSON data into database later.

## Current data strategy

Do not build the full database too early.

Use JSON/local data first.

Suggested files:

- shared/config/languages.json
- shared/config/niches.json
- shared/config/exam_tracks.json
- shared/config/daily_goals.json
- shared/i18n/vi.json
- shared/i18n/en.json
- shared/content/ja/kana_starter.json
- shared/content/ja/jlpt_n5.json

These JSON files are the draft version of the future database schema.

## Future database strategy

After UI and learning flow are stable, move data into Supabase or another database.

Future database may include:

- users
- profiles
- lessons
- lesson_items
- exercises
- exercise_options
- translations
- accepted_answers
- progress
- mistakes
- flashcards
- review_queue
- daily_goals
- subscriptions
- ai_quotas

## Localization rules

When the user chooses a native/UI language, all user-facing UI text should use that language.

Example:

learningLanguage = ja
uiLanguage = vi

Japanese target text stays Japanese:

こんにちは

Vietnamese UI/options:

xin chào
tạm biệt
cảm ơn
làm ơn

Do not show English UI/options when Vietnamese is selected, unless English is the target learning content.

## Exercise rules

### Single choice

Must have:

- 4 unique options when enough data exists
- exactly 1 correct answer
- no duplicate visible labels
- no duplicate values
- no distractor that is also correct

### Match pairs

Must:

- check every pair exactly
- not mark correct just because the user selected something
- separate kana-reading matching from vocabulary-meaning matching

Correct:

あ → a
い → i

Correct:

雨（あめ） → mưa
飴（あめ） → kẹo

Incorrect:

あ → mưa

### Typed answers

Use acceptedAnswers.

Normalize input:

- trim
- lowercase
- collapse repeated spaces
- accept no-accent variants if listed

Example:

橋（はし）

acceptedAnswers.vi = ["cây cầu", "cầu", "cay cau", "cau"]

### Japanese display and speech

Use separate fields:

displayText = 雨（あめ）
speechText = あめ

Do not send ambiguous kanji alone to speech/TTS when speechText exists.

## Lesson navigation rules

Lesson screens should support:

- Back to course
- Review previous step
- Next
- Resume from last step
- Review completed lesson

Do not make "Review lesson" jump to the start every time.

Save lesson session state:

- lessonId
- currentStepIndex
- completedStepIds
- isCompleted
- completedAt
- lastVisitedAt

## Android UI rules

Android is the main MVP.

Use:

- SafeArea
- LayoutBuilder
- MediaQuery
- mobile-first layout
- visible back buttons
- bottom navigation with max 5 tabs
- responsive spacing
- no fixed phone page size

Do not design only for one screen size.

## Auth rules

Current auth options:

- Google
- Facebook
- Instagram
- Apple
- Email
- Guest

Phone login is not required.

If OAuth is not configured, show a setup-required message.

Do not fake OAuth success.

Document missing OAuth config in:

docs/AUTH_SETUP.md

## Final report checklist

Every AI coding task should end with:

1. Current working directory
2. Task type: UI-only or shared-data/business-logic
3. Changed files in shared/
4. Changed files in frontend/
5. Changed files in mobile/novalang_flutter/
6. Whether Web and Flutter are synced
7. Web build result
8. Flutter analyze/build result or SDK issue
9. Remaining TODOs