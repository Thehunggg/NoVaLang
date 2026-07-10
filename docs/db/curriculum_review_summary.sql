-- NovaLang curriculum review one-click summary.
-- Run after curriculum_review_schema.sql and curriculum_review_seed.sql.

WITH
check_01 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT l.lesson_id
    FROM review_lessons AS l
    LEFT JOIN review_exercises AS e ON e.lesson_id = l.lesson_id
    GROUP BY l.lesson_id, l.total_exercises
    HAVING COUNT(e.exercise_id) <> 10 OR l.total_exercises <> 10
  ) AS issues
),
check_02 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_exercises AS e
  WHERE e.order_index BETWEEN 1 AND 7 AND e.access_level <> 'free'
),
check_03 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_exercises AS e
  WHERE e.order_index BETWEEN 8 AND 10 AND e.access_level <> 'plus'
),
check_04 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_exercises AS e
  WHERE e.uses_ai = TRUE AND e.order_index NOT IN (9, 10)
),
check_05 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_exercises AS e
  WHERE e.order_index = 9
    AND (e.ai_mode ILIKE '%open%' OR e.raw_json->>'open_ended_chat' = 'true')
),
check_06 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_exercises AS e
  WHERE e.order_index = 10
    AND e.raw_json->>'trigger_extra_ai_call_by_default' = 'true'
),
check_07 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_vocabulary_items AS v
  WHERE v.learning_language = 'ja'
    AND v.text ~ '[ぁ-ゖァ-ヺ]'
    AND (
      v.reading IS NULL OR v.reading = ''
      OR v.romanization IS NULL OR v.romanization = ''
      OR v.speech_text IS NULL OR v.speech_text = ''
    )
),
check_08 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_vocabulary_items AS v
  WHERE v.learning_language = 'ja'
    AND v.text ~ '[ぁ-ゖァ-ヺ]'
    AND v.example_text = v.text
),
check_09 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_vocabulary_items AS v
  WHERE v.example_text IS NULL OR v.example_text = ''
),
check_10 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT entities.entity_type, entities.entity_id
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
    GROUP BY entities.entity_type, entities.entity_id
  ) AS issues
),
check_11 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT o.exercise_id, o.native_language, o.option_text
    FROM review_exercise_options AS o
    GROUP BY o.exercise_id, o.native_language, o.option_text
    HAVING COUNT(*) > 1
  ) AS issues
),
check_12 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT o.exercise_id, o.native_language
    FROM review_exercise_options AS o
    WHERE o.is_correct = TRUE
    GROUP BY o.exercise_id, o.native_language
    HAVING COUNT(*) > 1
  ) AS issues
),
check_13 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT lang.language_code
    FROM review_learning_languages AS lang
    LEFT JOIN review_lessons AS l
      ON l.learning_language = lang.language_code
      AND l.is_playable = TRUE
    WHERE lang.status = 'available'
    GROUP BY lang.language_code
    HAVING COUNT(l.lesson_id) = 0
  ) AS issues
),
check_14 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_lessons AS l
  WHERE l.niche_id = 'daily_life'
    AND l.required_level = 'A0'
    AND COALESCE(l.raw_json->>'requires_core_foundation_completed', 'false') <> 'true'
),
check_15 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT l.lesson_id AS entity_id
    FROM review_lessons AS l
    WHERE l.title LIKE '%こんにちわ%'
    UNION ALL
    SELECT v.vocab_id AS entity_id
    FROM review_vocabulary_items AS v
    WHERE v.text LIKE '%こんにちわ%' OR COALESCE(v.example_text, '') LIKE '%こんにちわ%'
  ) AS issues
),
check_16 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM review_lessons AS l
  WHERE l.title IS NULL OR BTRIM(l.title) = ''
),
check_17 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT u.unit_id
    FROM review_units AS u
    LEFT JOIN review_lessons AS l ON l.unit_id = u.unit_id
    GROUP BY u.unit_id
    HAVING COUNT(l.lesson_id) < 5
  ) AS issues
),
check_18 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT m.module_id
    FROM review_modules AS m
    JOIN review_niches AS n ON n.niche_id = m.niche_id
    LEFT JOIN review_units AS u ON u.module_id = m.module_id
    WHERE n.niche_id <> 'exam_preparation'
    GROUP BY m.module_id
    HAVING COUNT(u.unit_id) < 5
  ) AS issues
),
check_18a AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT m.module_id
    FROM review_modules AS m
    JOIN review_niches AS n ON n.niche_id = m.niche_id
    LEFT JOIN review_units AS u ON u.module_id = m.module_id
    WHERE n.niche_id = 'exam_preparation'
    GROUP BY m.module_id
    HAVING COUNT(u.unit_id) = 0
  ) AS issues
),
check_19 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
  FROM (
    SELECT n.niche_id
    FROM review_niches AS n
    LEFT JOIN review_modules AS m ON m.niche_id = n.niche_id
    WHERE n.niche_id NOT IN ('core_foundation', 'exam_preparation')
    GROUP BY n.niche_id
    HAVING COUNT(m.module_id) < 6
  ) AS issues
),
check_20 AS (
  SELECT COUNT(*)::INTEGER AS issue_count
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
  )
)
SELECT '01' AS check_id, 'Lessons not having exactly 10 exercises' AS check_name, 'error' AS severity, check_01.issue_count, 'Each review lesson must have exactly 10 exercise rows.' AS note FROM check_01
UNION ALL SELECT '02', 'Exercise 1-7 not Free', 'error', check_02.issue_count, 'Free practice must occupy slots 1-7.' FROM check_02
UNION ALL SELECT '03', 'Exercise 8-10 not Plus', 'error', check_03.issue_count, 'Plus-only practice must occupy slots 8-10.' FROM check_03
UNION ALL SELECT '04', 'AI used outside Exercise 9/10', 'error', check_04.issue_count, 'Only controlled AI slots may use AI.' FROM check_04
UNION ALL SELECT '05', 'Exercise 9 open-ended chat', 'error', check_05.issue_count, 'Exercise 9 must be controlled one-turn QA.' FROM check_05
UNION ALL SELECT '06', 'Exercise 10 triggers extra AI call by default', 'error', check_06.issue_count, 'Exercise 10 should reuse previous feedback by default.' FROM check_06
UNION ALL SELECT '07', 'Japanese kana vocab missing reading / romanization / speech_text', 'error', check_07.issue_count, 'Kana items need safe display, reading, romanization, and TTS text.' FROM check_07
UNION ALL SELECT '08', 'Kana vocab where example_text = text', 'warning', check_08.issue_count, 'Kana examples should show a word, not only the isolated kana.' FROM check_08
UNION ALL SELECT '09', 'Vocab missing example_text', 'warning', check_09.issue_count, 'Review vocabulary examples before promoting content.' FROM check_09
UNION ALL SELECT '10', 'Missing translations for vi/en/ja/ko/zh', 'warning', check_10.issue_count, 'Review titles/options should include core native languages.' FROM check_10
UNION ALL SELECT '11', 'Duplicate multiple-choice options', 'error', check_11.issue_count, 'Choice labels must be unique per exercise/native language.' FROM check_11
UNION ALL SELECT '12', 'Multiple correct answers in one multiple-choice exercise', 'error', check_12.issue_count, 'Single-choice exercises should have one correct answer.' FROM check_12
UNION ALL SELECT '13', 'Available languages with no playable curriculum', 'info', check_13.issue_count, 'Expected for review-only or future languages.' FROM check_13
UNION ALL SELECT '14', 'A0 Daily Life accessible before Core Foundation', 'error', check_14.issue_count, 'A0 Daily Life should require Core Foundation completion or skip.' FROM check_14
UNION ALL SELECT '15', 'Wrong Japanese spelling: こんにちわ', 'error', check_15.issue_count, 'Use こんにちは for the greeting.' FROM check_15
UNION ALL SELECT '16', 'Empty lesson titles', 'error', check_16.issue_count, 'Lesson titles must be readable in review tables.' FROM check_16
UNION ALL SELECT '17', 'Units with fewer than 5 lessons', 'warning', check_17.issue_count, 'Review architecture expects 5-6 lessons per unit.' FROM check_17
UNION ALL SELECT '18', 'Modules with fewer than 5 units', 'warning', check_18.issue_count, 'Review architecture expects 5-6 units per non-exam module.' FROM check_18
UNION ALL SELECT '18a', 'Exam Preparation placeholders with 0 units', 'info', check_18a.issue_count, 'Expected until exam content build starts.' FROM check_18a
UNION ALL SELECT '19', 'Niches with fewer than 6 modules', 'warning', check_19.issue_count, 'Review architecture expects 6-8 modules per niche.' FROM check_19
UNION ALL SELECT '20', 'Unsupported exercise types', 'error', check_20.issue_count, 'Exercise types must match the review/template whitelist.' FROM check_20
ORDER BY check_id;
