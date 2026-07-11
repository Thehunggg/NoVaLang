import type { Exercise, SupportedUILanguage } from "../types/index";
import { getLocalizedAnswers, getLocalizedText } from "./localizedText";
import { normalizeAnswer, type NormalizeAnswerOptions } from "../../../shared/answerNormalize";

export type { NormalizeAnswerOptions };
export { normalizeAnswer };

export const normalizeUserAnswer = (
  value: string | null | undefined,
  options: NormalizeAnswerOptions = {},
): string => normalizeAnswer(value, options);

export interface AnswerCheckResult { correct: boolean; explanation: string; acceptedAnswers: string[]; }
export const isMatchPairExercise = (type: Exercise["type"]) => type === "match_pairs" || type === "match_kana_reading" || type === "match_vocab_meaning";

const optionsFromExercise = (exercise: Exercise): NormalizeAnswerOptions => ({
  caseInsensitive: exercise.caseInsensitive === true,
  ignorePunctuation: exercise.ignorePunctuation === true,
  allowedScript: exercise.allowedScript ?? "any",
});

export const checkAnswer = (userAnswer: string | string[], exercise: Exercise, nativeLanguage: string): AnswerCheckResult => {
  const normOpts = optionsFromExercise(exercise);
  if (isMatchPairExercise(exercise.type)) {
    const pairs = exercise.pairTranslations?.[nativeLanguage as SupportedUILanguage] ?? exercise.pairTranslations?.en ?? exercise.pairs ?? [];
    const submitted = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    const submittedMap = new Map(submitted.map((item) => {
      const [left, ...rightParts] = item.split("=");
      return [normalizeUserAnswer(left, normOpts), normalizeUserAnswer(rightParts.join("="), normOpts)];
    }));
    const acceptedAnswers = pairs.map((pair) => `${pair.left}=${pair.right}`);
    const correct = pairs.length > 0 && submittedMap.size === pairs.length && pairs.every((pair) => submittedMap.get(normalizeUserAnswer(pair.left, normOpts)) === normalizeUserAnswer(pair.right, normOpts));
    return { correct, acceptedAnswers, explanation: getLocalizedText(exercise.explanationTranslations ?? exercise.explanation, nativeLanguage as SupportedUILanguage) };
  }
  const localized = getLocalizedAnswers(exercise.acceptedAnswers, nativeLanguage);
  const meanings = getLocalizedAnswers(exercise.meanings, nativeLanguage);
  const fallback = localized.length || meanings.length ? [...localized, ...meanings] : Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer : [exercise.correctAnswer];
  const acceptedAnswers = [...new Set(fallback.filter(Boolean))];
  const submitted = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
  const submittedNormalized = submitted.map((item) => normalizeUserAnswer(item, normOpts));
  const correct = Array.isArray(exercise.correctAnswer) && !localized.length && !meanings.length
    ? acceptedAnswers.every((answer) => submittedNormalized.includes(normalizeUserAnswer(answer, normOpts)))
    : acceptedAnswers.some((answer) => submittedNormalized.includes(normalizeUserAnswer(answer, normOpts)));
  return { correct, acceptedAnswers, explanation: getLocalizedText(exercise.explanationTranslations ?? exercise.explanation, nativeLanguage as SupportedUILanguage) };
};

export const getExerciseQuestion = (exercise: Exercise, nativeLanguage: string) => getLocalizedText(exercise.questionTranslations ?? exercise.question, nativeLanguage);
export const getExerciseExplanation = (exercise: Exercise, nativeLanguage: string) => getLocalizedText(exercise.explanationTranslations ?? exercise.explanation, nativeLanguage);
export const getExerciseHint = (exercise: Exercise, nativeLanguage: string) => getLocalizedText(exercise.hintTranslations ?? exercise.hint, nativeLanguage);
export const getExerciseOptions = (exercise: Exercise, nativeLanguage: string) => exercise.optionTranslations?.[nativeLanguage as SupportedUILanguage] ?? exercise.optionTranslations?.en ?? exercise.options;
