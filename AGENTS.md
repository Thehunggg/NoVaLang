# NovaLang — Agent Rules

## Project path

Work only inside:

C:\Users\thehu\OneDrive\Desktop\NovaLang\novalang

Do not work inside:

C:\Users\thehu\Documents\Codex

Do not create or edit:

linguaquest-ai

## Project structure

NovaLang has two platforms:

- Web React: frontend/
- Android Flutter: mobile/novalang_flutter/
- Shared source of truth: shared/

## Main rule

UI-only changes should modify only the requested platform.

Examples of UI-only changes:

- Web layout
- Flutter Android layout
- button style
- card style
- navbar
- bottom navigation
- screen spacing
- responsive UI

Shared data/business logic changes must update shared/ first, then sync Web and Flutter.

Shared logic includes:

- language list
- language search aliases
- flags/language icons
- i18n/localization
- niche list
- exam tracks
- level system
- lesson data
- vocabulary data
- grammar data
- kana/kanji data
- exercise data
- exercise builder logic
- answer checking logic
- accepted answers
- placement test
- daily goal
- heart/streak rules
- profile schema
- onboarding choices
- subscription plans
- AI quota rules

Do not fix shared logic only in Web.

Do not fix shared logic only in Flutter.

Do not create inconsistent duplicate data.

Preferred shared folders:

- shared/config/
- shared/content/
- shared/i18n/
- shared/assets/

If Flutter cannot directly read shared JSON, mirror the same JSON into Flutter assets and document the sync.

## Codex role

Codex mainly handles the Web React app.

Main folder:

frontend/

Do not edit Flutter unless the task explicitly requires Web + Flutter sync.

For Web tasks, run:

npm run build

Do not finish until Web build passes.

## Flutter rule

Flutter Android lives in:

mobile/novalang_flutter/

For Flutter tasks, run if Flutter SDK exists:

cd mobile/novalang_flutter
flutter pub get
flutter analyze

If Flutter SDK is missing, report it clearly.

## Localization rule

When user selects a native/UI language, every user-facing UI label, explanation, hint, feedback, and meaning option must use that language.

The learning-language target text remains in the learning language.

Example:

learningLanguage = ja
uiLanguage = vi

Target text:

こんにちは

UI/options/meaning:

xin chào
tạm biệt
cảm ơn
làm ơn

Do not show English UI/options when Vietnamese UI is selected, unless English is the learning target.

## Exercise rules

Single-choice exercises must have:

- exactly 4 unique options when enough data exists
- exactly 1 correct answer
- no duplicate visible labels
- no duplicate values
- no distractor that is also correct
- localized options when options are meanings

Match-pairs exercises must:

- check every pair exactly
- not mark correct just because something was selected
- not mix kana-only items with vocabulary meanings

Correct kana match:

あ → a
い → i

Correct vocabulary match:

雨（あめ） → mưa
飴（あめ） → kẹo

Incorrect:

あ → mưa

Typed answers must use acceptedAnswers.

Normalize typed answers:

- trim
- lowercase
- collapse repeated spaces
- accept no-accent variants if listed

Japanese rule:

- separate displayText and speechText
- displayText: 雨（あめ）
- speechText: あめ
- do not send ambiguous kanji alone to TTS if speechText exists
- do not split 雨（あめ） into 雨 / （ / あめ / ） in sentence builder

## Lesson navigation rules

Lesson screens should support:

- Back to course
- Review previous step
- Next
- Resume from last step
- Review completed lesson

Do not make "Review lesson" jump to the beginning every time.

Save lesson session state:

- lessonId
- currentStepIndex
- completedStepIds
- isCompleted
- completedAt
- lastVisitedAt

## Android-first strategy

NovaLang is Android-first.

Flutter Android is the main mobile MVP.

Web must stay working and aligned with shared data, but Web does not need to be more polished than Android at this stage.

## Final report

Always report:

1. Current working directory
2. Task type: UI-only or shared-data/business-logic
3. Files changed in shared/
4. Files changed in frontend/
5. Files changed in mobile/novalang_flutter/
6. Whether Web and Flutter are synced
7. Web build result
8. Flutter check result or SDK missing reason