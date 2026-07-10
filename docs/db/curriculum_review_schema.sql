DROP TABLE IF EXISTS review_validation_issues CASCADE;
DROP TABLE IF EXISTS review_exercise_options CASCADE;
DROP TABLE IF EXISTS review_translations CASCADE;
DROP TABLE IF EXISTS review_vocabulary_items CASCADE;
DROP TABLE IF EXISTS review_exercises CASCADE;
DROP TABLE IF EXISTS review_lessons CASCADE;
DROP TABLE IF EXISTS review_units CASCADE;
DROP TABLE IF EXISTS review_modules CASCADE;
DROP TABLE IF EXISTS review_niches CASCADE;
DROP TABLE IF EXISTS review_native_languages CASCADE;
DROP TABLE IF EXISTS review_learning_languages CASCADE;

CREATE TABLE review_learning_languages (
  language_code TEXT PRIMARY KEY,
  english_name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_native_languages (
  language_code TEXT PRIMARY KEY,
  english_name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_niches (
  niche_id TEXT PRIMARY KEY,
  category TEXT,
  title TEXT NOT NULL,
  description TEXT,
  is_canonical BOOLEAN NOT NULL DEFAULT TRUE,
  is_review_only BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'draft_review',
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_modules (
  module_id TEXT PRIMARY KEY,
  niche_id TEXT NOT NULL REFERENCES review_niches(niche_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  required_level TEXT,
  is_review_only BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'draft_review',
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_units (
  unit_id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES review_modules(module_id) ON DELETE CASCADE,
  niche_id TEXT NOT NULL REFERENCES review_niches(niche_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  required_level TEXT,
  is_review_only BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'draft_review',
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_lessons (
  lesson_id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES review_units(unit_id) ON DELETE CASCADE,
  niche_id TEXT NOT NULL REFERENCES review_niches(niche_id) ON DELETE CASCADE,
  module_id TEXT NOT NULL REFERENCES review_modules(module_id) ON DELETE CASCADE,
  learning_language TEXT NOT NULL REFERENCES review_learning_languages(language_code),
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  required_level TEXT NOT NULL,
  is_playable BOOLEAN NOT NULL DEFAULT FALSE,
  is_review_only BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'draft_review',
  total_exercises INTEGER NOT NULL DEFAULT 10,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_exercises (
  exercise_id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES review_lessons(lesson_id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  exercise_type TEXT NOT NULL,
  access_level TEXT NOT NULL,
  uses_ai BOOLEAN NOT NULL DEFAULT FALSE,
  ai_mode TEXT,
  audio_source TEXT,
  prompt_text TEXT,
  correct_answer TEXT,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_vocabulary_items (
  vocab_id TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES review_lessons(lesson_id) ON DELETE CASCADE,
  learning_language TEXT REFERENCES review_learning_languages(language_code),
  text TEXT NOT NULL,
  reading TEXT,
  romanization TEXT,
  speech_text TEXT,
  meaning_en TEXT,
  meaning_vi TEXT,
  example_text TEXT,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_translations (
  translation_id BIGSERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  language_code TEXT NOT NULL,
  field_name TEXT NOT NULL,
  translated_text TEXT,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_exercise_options (
  option_id BIGSERIAL PRIMARY KEY,
  exercise_id TEXT NOT NULL REFERENCES review_exercises(exercise_id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  native_language TEXT,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE review_validation_issues (
  issue_id BIGSERIAL PRIMARY KEY,
  severity TEXT NOT NULL DEFAULT 'warning',
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  issue_code TEXT NOT NULL,
  message TEXT NOT NULL,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_review_lessons_lesson_id ON review_lessons(lesson_id);
CREATE INDEX idx_review_lessons_niche_id ON review_lessons(niche_id);
CREATE INDEX idx_review_lessons_module_id ON review_lessons(module_id);
CREATE INDEX idx_review_lessons_unit_id ON review_lessons(unit_id);
CREATE INDEX idx_review_lessons_learning_language ON review_lessons(learning_language);
CREATE INDEX idx_review_lessons_status ON review_lessons(status);
CREATE INDEX idx_review_exercises_lesson_id ON review_exercises(lesson_id);
CREATE INDEX idx_review_exercises_exercise_type ON review_exercises(exercise_type);
CREATE INDEX idx_review_exercises_access_level ON review_exercises(access_level);
CREATE INDEX idx_review_exercises_uses_ai ON review_exercises(uses_ai);
CREATE INDEX idx_review_modules_niche_id ON review_modules(niche_id);
CREATE INDEX idx_review_units_module_id ON review_units(module_id);
CREATE INDEX idx_review_units_niche_id ON review_units(niche_id);
CREATE INDEX idx_review_vocabulary_lesson_id ON review_vocabulary_items(lesson_id);
CREATE INDEX idx_review_vocabulary_learning_language ON review_vocabulary_items(learning_language);
CREATE INDEX idx_review_options_exercise_id ON review_exercise_options(exercise_id);
CREATE INDEX idx_review_translations_entity ON review_translations(entity_type, entity_id);
CREATE INDEX idx_review_issues_code ON review_validation_issues(issue_code);
