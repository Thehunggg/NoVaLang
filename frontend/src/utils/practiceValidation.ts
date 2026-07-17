import type { Exercise, LanguageCode, MatchPair, SupportedUILanguage } from "../types/index";
import { isMatchPairExercise } from "./checkAnswer";

const normalize = (value: string) => value.normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();
const readingOrText = (value: string) => value.match(/\uFF08([^\uFF09]+)\uFF09/)?.[1] ?? value;
const vocabularyMeaningWords = new Set(["rain", "dog", "candy", "station", "m\u01B0a", "ch\u00F3", "k\u1EB9o", "nh\u00E0 ga"]);
const containsBareKanji = (value?: string) => Boolean(value && /[\u4E00-\u9FAF]/.test(value) && !/[\u3041-\u3093]/.test(value));

const warn = (language: LanguageCode, exercise: Exercise, problem: string) => {
  console.warn("[NovaLang validation]", { page: "practice", language, exerciseId: exercise.id, problem });
};

const localizedOptions = (exercise: Exercise, nativeLanguage: string) =>
  exercise.optionTranslations?.[nativeLanguage as SupportedUILanguage] ?? (nativeLanguage === "en" ? exercise.options ?? [] : []);

const localizedPairs = (exercise: Exercise, nativeLanguage: string): MatchPair[] =>
  exercise.pairTranslations?.[nativeLanguage as SupportedUILanguage] ?? (nativeLanguage === "en" ? exercise.pairs ?? [] : []);

const hasDuplicates = (items: string[]) => new Set(items.map(normalize)).size !== items.length;

export function validatePracticeExercises(language: LanguageCode, nativeLanguage: string, exercises: Exercise[]) {
  if (!import.meta.env.DEV) return;

  exercises.forEach((exercise) => {
    const options = localizedOptions(exercise, nativeLanguage);
    if (options.length && hasDuplicates(options)) warn(language, exercise, "duplicate options");

    if (exercise.type === "choose_word_starting_with_letter" || exercise.type === "choose_word_starting_with_kana") {
      if (!exercise.targetKana) warn(language, exercise, "missing targetKana");
      if (exercise.targetKana) {
        const matching = options.filter((option) => readingOrText(option).startsWith(exercise.targetKana!));
        if (matching.length !== 1) warn(language, exercise, `expected exactly one option starting with ${exercise.targetKana}, found ${matching.length}`);
      }
    }

    if (["multiple_choice", "choose_correct_sound", "listening_placeholder", "choose_correct_reading", "choose_meaning", "listen_and_choose_meaning", "listen_and_choose_sentence"].includes(exercise.type) && options.length) {
      const accepted = exercise.acceptedAnswers?.[nativeLanguage as SupportedUILanguage] ?? exercise.acceptedAnswers?.en ?? (Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer : [exercise.correctAnswer]);
      const correctOptions = options.filter((option) => accepted.some((answer) => normalize(answer) === normalize(option)));
      if (correctOptions.length !== 1) warn(language, exercise, `single-choice expected exactly one localized correct option, found ${correctOptions.length}`);
    }

    if (isMatchPairExercise(exercise.type)) {
      const pairs = localizedPairs(exercise, nativeLanguage);
      if (!pairs.length) warn(language, exercise, "match_pairs has no localized pairs");
      if (hasDuplicates(pairs.map((pair) => pair.left))) warn(language, exercise, "duplicate match left items");
      if (exercise.matchPairMode === "kana_reading") {
        if (pairs.some((pair) => vocabularyMeaningWords.has(normalize(pair.right)))) warn(language, exercise, "kana-reading match includes vocabulary meanings");
      }
      if (exercise.matchPairMode === "vocabulary_meaning") {
        if (pairs.some((pair) => /^[\u3041-\u3093]$/.test(pair.left))) warn(language, exercise, "vocabulary-meaning match includes kana-only left item");
      }
    }

    if (nativeLanguage === "vi" && exercise.nativeLanguageMode && options.some((option) => ["rain", "dog", "candy"].includes(normalize(option)))) {
      warn(language, exercise, "Vietnamese native language still shows English options");
    }
    if (language === "ja" && containsBareKanji(exercise.audioText)) warn(language, exercise, "Japanese audioText appears to contain bare kanji without kana reading");
  });
}
