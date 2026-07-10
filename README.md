## Curriculum rebuild workflow

NovaLang uses shared curriculum data for both Web and Flutter.

Do not edit only the Flutter data or only the Web data.
Curriculum changes should start from the shared source-of-truth, then generate/sync outputs.

Current rollout:
- 20 learning languages in catalog.
- Playable first: English and Japanese.
- Preview / coming soon: remaining 18 languages.
- First review scope: Daily Life → Greetings → Unit 1.

Lesson structure:
- 10 exercises per lesson.
- Exercises 1–7: Free fixed practice.
- Exercise 8: Plus Listening Gap-fill, device TTS, no AI API.
- Exercise 9: Plus controlled AI Q&A for the 390 yen/month plan.
- Exercise 10: Plus AI feedback/review, reusing Exercise 9 feedback if possible.

Commands:

```bash
npm run generate:curriculum
npm run validate:curriculum
npm run sync:flutter-assets
npm run build