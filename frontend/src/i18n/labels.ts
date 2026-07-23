import type { Difficulty, ExerciseType, LessonType } from "../types/index";
import type { TranslationKey } from "./translations";

const exerciseTypeKeys: Record<ExerciseType, TranslationKey> = {
  multiple_choice: "exerciseTypeMultipleChoice",
  translation: "exerciseTypeTranslation",
  fill_blank: "exerciseTypeFillBlank",
  match_pairs: "exerciseTypeMatchPairs",
  sentence_builder: "exerciseTypeSentenceBuilder",
  choose_correct_sound: "exerciseTypeChooseSound",
  choose_correct_letter: "exerciseTypeChooseLetter",
  choose_word_starting_with_letter: "exerciseTypeChooseWordLetter",
  match_character_to_pronunciation: "exerciseTypeMatchPronunciation",
  listening_placeholder: "exerciseTypeListening",
  speaking_placeholder: "exerciseTypeSpeaking",
  dialogue_choice: "exerciseTypeDialogueChoice",
  choose_correct_reading: "exerciseTypeChooseReading",
  choose_word_starting_with_kana: "exerciseTypeChooseWordKana",
  match_kana_reading: "exerciseTypeMatchKana",
  choose_meaning: "exerciseTypeChooseMeaning",
  type_meaning: "exerciseTypeTypeMeaning",
  match_vocab_meaning: "exerciseTypeMatchMeaning",
  choose_correct_sentence: "exerciseTypeChooseSentence",
  translate_sentence: "exerciseTypeTranslateSentence",
  read_short_sentence: "exerciseTypeReadSentence",
  answer_question: "exerciseTypeAnswerQuestion",
  choose_summary: "exerciseTypeChooseSummary",
  listen_and_choose_meaning: "exerciseTypeListenMeaning",
  listen_and_choose_sentence: "exerciseTypeListenSentence",
  character_card: "exerciseTypeCharacterCard",
  fill_missing_character: "exerciseTypeFillCharacter",
  sound_to_character: "exerciseTypeSoundToCharacter",
  next_in_sequence: "exerciseTypeNextInSequence",
  choose_correct_pair: "exerciseTypeChoosePair",
  plus_listening_vocabulary_challenge: "exerciseTypePlusListening",
};

const difficultyKeys: Record<Difficulty, TranslationKey> = {
  easy: "difficultyEasy",
  medium: "difficultyMedium",
  hard: "difficultyHard",
};

const lessonTypeKeys: Record<LessonType, TranslationKey> = {
  pronunciation: "pronunciation",
  vocabulary: "vocabulary",
  grammar: "grammar",
  dialogue: "dialogue",
  review: "review",
  checkpoint: "lessonTypeCheckpoint",
  culture: "lessonTypeCulture",
  speaking_placeholder: "exerciseTypeSpeaking",
  listening_placeholder: "exerciseTypeListening",
};

export function exerciseTypeKey(type: string): TranslationKey {
  return exerciseTypeKeys[type as ExerciseType] ?? "practice";
}

export function difficultyKey(difficulty: string): TranslationKey {
  return difficultyKeys[difficulty as Difficulty] ?? "beginner";
}

export function lessonTypeKey(type: string): TranslationKey {
  return lessonTypeKeys[type as LessonType] ?? "learn";
}
