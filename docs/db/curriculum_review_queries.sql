-- A. Lessons that do not have exactly 10 exercises.
SELECT l.lesson_id, l.title, l.total_exercises, COUNT(e.exercise_id) AS actual_exercises
FROM review_lessons AS l
LEFT JOIN review_exercises AS e ON e.lesson_id = l.lesson_id
GROUP BY l.lesson_id, l.title, l.total_exercises
HAVING COUNT(e.exercise_id) <> 10 OR l.total_exercises <> 10;

-- B. Exercise 1-7 that are not Free.
SELECT e.exercise_id, e.lesson_id, e.order_index, e.access_level
FROM review_exercises AS e
WHERE e.order_index BETWEEN 1 AND 7 AND e.access_level <> 'free';

-- C. Exercise 8-10 that are not Plus.
SELECT e.exercise_id, e.lesson_id, e.order_index, e.access_level
FROM review_exercises AS e
WHERE e.order_index BETWEEN 8 AND 10 AND e.access_level <> 'plus';

-- D. Exercises using AI outside Exercise 9/10.
SELECT e.exercise_id, e.lesson_id, e.order_index, e.exercise_type, e.uses_ai
FROM review_exercises AS e
WHERE e.uses_ai = TRUE AND e.order_index NOT IN (9, 10);

-- E. Exercise 9 that is open-ended chat.
SELECT e.exercise_id, e.lesson_id, e.ai_mode, e.raw_json
FROM review_exercises AS e
WHERE e.order_index = 9
  AND (e.ai_mode ILIKE '%open%' OR e.raw_json->>'open_ended_chat' = 'true');

-- F. Exercise 10 that triggers an extra AI call by default.
SELECT e.exercise_id, e.lesson_id, e.ai_mode, e.raw_json
FROM review_exercises AS e
WHERE e.order_index = 10
  AND e.raw_json->>'trigger_extra_ai_call_by_default' = 'true';

-- G. Japanese kana vocab missing reading, romanization, or speech_text.
SELECT v.vocab_id, v.lesson_id, v.text, v.reading, v.romanization, v.speech_text
FROM review_vocabulary_items AS v
WHERE v.learning_language = 'ja'
  AND v.text ~ '[ぁ-ゖァ-ヺ]'
  AND (
    v.reading IS NULL OR v.reading = ''
    OR v.romanization IS NULL OR v.romanization = ''
    OR v.speech_text IS NULL OR v.speech_text = ''
  );

-- H. Kana vocab where example_text equals the isolated target text.
SELECT v.vocab_id, v.lesson_id, v.text, v.example_text
FROM review_vocabulary_items AS v
WHERE v.learning_language = 'ja'
  AND v.text ~ '[ぁ-ゖァ-ヺ]'
  AND v.example_text = v.text;

-- I. Vocabulary missing example_text.
SELECT v.vocab_id, v.lesson_id, v.text
FROM review_vocabulary_items AS v
WHERE v.example_text IS NULL OR v.example_text = '';

-- J. Missing translations for vi/en/ja/ko/zh.
SELECT entities.entity_type, entities.entity_id,
  ARRAY_AGG(required.language_code ORDER BY required.language_code) AS missing_languages
FROM (
  SELECT DISTINCT rt.entity_type, rt.entity_id
  FROM review_translations AS rt
) AS entities
CROSS JOIN (VALUES ('vi'), ('en'), ('ja'), ('ko'), ('zh')) AS required(language_code)
LEFT JOIN review_translations AS t
  ON t.entity_type = entities.entity_type
  AND t.entity_id = entities.entity_id
  AND t.language_code = required.language_code
WHERE t.translation_id IS NULL OR t.translated_text IS NULL OR t.translated_text = ''
GROUP BY entities.entity_type, entities.entity_id;

-- K. Duplicate multiple-choice options.
SELECT o.exercise_id, o.native_language, o.option_text, COUNT(*) AS duplicate_count
FROM review_exercise_options AS o
GROUP BY o.exercise_id, o.native_language, o.option_text
HAVING COUNT(*) > 1;

-- L. Multiple correct answers in one multiple-choice exercise.
SELECT o.exercise_id, o.native_language, COUNT(*) AS correct_count
FROM review_exercise_options AS o
WHERE o.is_correct = TRUE
GROUP BY o.exercise_id, o.native_language
HAVING COUNT(*) > 1;

-- M. Available languages with no playable curriculum.
SELECT lang.language_code, lang.english_name
FROM review_learning_languages AS lang
LEFT JOIN review_lessons AS l
  ON l.learning_language = lang.language_code
  AND l.is_playable = TRUE
WHERE lang.status = 'available'
GROUP BY lang.language_code, lang.english_name
HAVING COUNT(l.lesson_id) = 0;

-- N. A0 Daily Life lessons accessible before Core Foundation.
SELECT l.lesson_id, l.title, l.required_level,
  l.raw_json->>'requires_core_foundation_completed' AS requires_core_foundation_completed
FROM review_lessons AS l
WHERE l.niche_id = 'daily_life'
  AND l.required_level = 'A0'
  AND COALESCE(l.raw_json->>'requires_core_foundation_completed', 'false') <> 'true';

-- O. Wrong Japanese spelling: こんにちわ.
SELECT 'lesson' AS entity_type, l.lesson_id AS entity_id, l.title AS text_value
FROM review_lessons AS l
WHERE l.title LIKE '%こんにちわ%'
UNION ALL
SELECT 'vocab' AS entity_type, v.vocab_id AS entity_id, v.text AS text_value
FROM review_vocabulary_items AS v
WHERE v.text LIKE '%こんにちわ%' OR COALESCE(v.example_text, '') LIKE '%こんにちわ%';

-- P. Lessons with empty title.
SELECT l.lesson_id, l.title
FROM review_lessons AS l
WHERE l.title IS NULL OR BTRIM(l.title) = '';

-- Q. Units with fewer than 5 lessons.
SELECT u.unit_id, u.title, COUNT(l.lesson_id) AS lesson_count
FROM review_units AS u
LEFT JOIN review_lessons AS l ON l.unit_id = u.unit_id
GROUP BY u.unit_id, u.title
HAVING COUNT(l.lesson_id) < 5;

-- R. Modules with fewer than 5 units, excluding Exam Preparation placeholders.
SELECT m.module_id, m.title, COUNT(u.unit_id) AS unit_count
FROM review_modules AS m
JOIN review_niches AS n ON n.niche_id = m.niche_id
LEFT JOIN review_units AS u ON u.module_id = m.module_id
WHERE n.niche_id <> 'exam_preparation'
GROUP BY m.module_id, m.title
HAVING COUNT(u.unit_id) < 5;

-- R-info. Exam Preparation placeholders with 0 units.
SELECT m.module_id, m.title, COUNT(u.unit_id) AS unit_count
FROM review_modules AS m
JOIN review_niches AS n ON n.niche_id = m.niche_id
LEFT JOIN review_units AS u ON u.module_id = m.module_id
WHERE n.niche_id = 'exam_preparation'
GROUP BY m.module_id, m.title
HAVING COUNT(u.unit_id) = 0;

-- S. Niches with fewer than 6 modules.
SELECT n.niche_id, n.title, COUNT(m.module_id) AS module_count
FROM review_niches AS n
LEFT JOIN review_modules AS m ON m.niche_id = n.niche_id
WHERE n.niche_id NOT IN ('core_foundation', 'exam_preparation')
GROUP BY n.niche_id, n.title
HAVING COUNT(m.module_id) < 6;

-- T. Unsupported exercise_type.
SELECT e.exercise_id, e.lesson_id, e.order_index, e.exercise_type
FROM review_exercises AS e
WHERE e.exercise_type NOT IN (
  'chooseMeaning',
  'chooseVocabulary',
  'chooseCharacter',
  'matchPairs',
  'fillBlank',
  'chooseCorrectAnswer',
  'chooseCorrectReading',
  'listenAndChoose',
  'typeAnswer',
  'reorderSentence',
  'listeningGapFill',
  'controlledAiQa',
  'aiFeedbackReview'
);
