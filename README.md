# NovaLang

NovaLang is a complete neon-styled language-learning MVP for English, Japanese, and Spanish. It includes a React + Vite + TypeScript frontend, an Express + TypeScript API, resilient offline fallback content, and browser-based progress persistence.

## Run locally

Requirements: Node.js 20+ and npm.

```powershell
cd C:\Users\thehu\OneDrive\Desktop\NovaLang\novalang
npm run install:all
npm run dev
```

Open the frontend URL printed by Vite (normally `http://localhost:5173`). The API runs at `http://localhost:5000/api`.

If either port is already occupied, stop the earlier development terminal with `Ctrl+C`. Vite may automatically choose another frontend port; the API must use port 5000.

## Learning structure

```text
Language → Course → Level → Unit → Lesson → MicroLesson → Exercises
```

- Internal level codes stay stable from A0 to B2, while user-facing labels are language-specific.
- Japanese shows an exam track: Kana Starter and JLPT N5 sample modules, with JLPT N4, N3, N2, and N1 shown as roadmap items.
- English and Spanish keep general CEFR-style A0/A1/A2/B1/B2 labels, with exam placeholders such as TOEIC, IELTS, TOEFL, and DELE marked coming soon.
- Every normal lesson has 3–5 micro-lessons; alphabet/pronunciation lessons have 4–6; reviews have 2–3; checkpoints use one test micro-lesson.
- Every micro-lesson contains 5–8 functional exercises and grants XP.
- English and Spanish alphabet lessons and Japanese hiragana lessons contain symbol, sound, example word, meaning, example sentence, translation, and practice.
- Higher Japanese exam levels are locked roadmap stages until their reviewed local content is ready.

## Features

- Three learning languages only: English, Japanese, and Spanish.
- A searchable catalog of 150+ native languages, stored separately from the learning language.
- Complete local UI translations for English, Vietnamese, Japanese, and Spanish.
- Other native languages can still be selected and saved; the interface safely falls back to English without deleting progress.
- Placement tests use the same language-specific level display helper as the course path.
- Sequential lesson and micro-lesson unlocking.
- XP, hearts, streaks, daily goals, mistakes, achievements, flashcards, practice, and spaced review.
- Progress stored locally in the browser.
- Frontend automatically falls back to the bundled curriculum when the backend is offline.
- Responsive neon interface designed for desktop and mobile preview.

## API

- `GET /api/health`
- `GET /api/native-languages`
- `GET /api/languages`
- `GET /api/courses/:language`
- `GET /api/lessons/:language`
- `GET /api/lesson/:lessonId`
- `GET /api/placement/:language`
- `GET /api/review/:language`
- `GET /api/practice/:language`

Supported language codes are `en`, `ja`, and `es`.

## Native language and local UI translation

NovaLang deliberately separates the language a user studies from the language used for explanations and menus:

- Learning languages: English, Japanese, and Spanish.
- Native language choices: 150+ world languages with searchable native names.
- Fully translated interface locales: English (`en`), Vietnamese (`vi`), Japanese (`ja`), and Spanish (`es`).
- Selecting any other native language keeps that selection in Profile / Settings while using English as the interface fallback.

All translations are local TypeScript objects. This MVP does not use OpenAI, Google Translate, DeepL, browser translation, or any translation API. It requires no API key and makes no remote translation request. A future version may add optional explanation services, but they are not part of this portfolio MVP.

## Scripts

- `npm run install:all` installs root, frontend, and backend packages.
- `npm run dev` starts frontend and backend together.
- `npm run build` type-checks and builds both applications.
- `npm run dev:frontend` or `npm run dev:backend` starts one side only.

No API key, paid service, or copyrighted asset is required.
