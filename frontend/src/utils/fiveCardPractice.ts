import type { FiveCardContent, FiveCardPractice, Lesson } from "../types/index";
import { asRecord, asRecordList, displayNativeText, resolveNativeContentMap } from "./nativeContent";

export type PracticePlan = "free" | "plus";

export interface PracticeOption {
  id: string;
  text: string;
  canonicalText?: string;
  audioText?: string;
}

export interface PracticeToken extends PracticeOption {}

export interface PracticePairSide {
  id: string;
  text: string;
}

export interface PracticePair {
  id: string;
  left: PracticePairSide;
  right: PracticePairSide;
}

export interface PracticeSlot {
  id: string;
  answerId?: string;
  placeholder?: string;
  displayText?: string;
  canonicalText?: string;
  audioText?: string;
  acceptedAnswers?: string[];
}

export interface PracticeAnswerSlot {
  id: string;
  expectedTokenId: string;
  afterText?: string;
}

export interface PracticeCharacter {
  id: string;
  displayName: string;
  canonicalName: string;
  audioName: string;
}

export interface PracticeDialogueLine {
  speakerId: string;
  targetText: string;
  reading?: string;
  speechText?: string;
  translation?: string;
  romanization?: string;
  audioLocale?: string;
}

export interface PracticeSceneDivider {
  afterDialogueLine: number;
  targetText?: string;
  translation?: string;
}

export interface PracticeChatSpeaker {
  id: string;
  label: string;
  alignment: "left" | "right";
}

export interface PracticeChatSegment {
  displayText?: string;
  canonicalText?: string;
  audioText?: string;
  slotId?: string;
}

export interface PracticeChatMessage {
  id: string;
  speakerId: string;
  segments: PracticeChatSegment[];
}

export interface PracticeChat {
  timestamp: string;
  context: string;
  speakers: PracticeChatSpeaker[];
  messages: PracticeChatMessage[];
}

export interface PracticeFeedback {
  correctAnswer?: string;
  explanation?: string;
  audioText?: string;
  canonicalAnswer?: string;
}

export interface PracticeExercise {
  id: string;
  order: number;
  plan: PracticePlan;
  type: string;
  prompt: string;
  context?: string;
  audioText?: string;
  correctOptionId?: string;
  options: PracticeOption[];
  tokens: PracticeToken[];
  answerSlots: PracticeAnswerSlot[];
  correctTokenIds: string[];
  unusedTokenIds: string[];
  pairs: PracticePair[];
  slots: PracticeSlot[];
  wordBank: PracticeOption[];
  dialogue: string[];
  subQuestions: PracticeExercise[];
  isNonGraded: boolean;
  scenarioTitle?: string;
  scenarioDescription?: string;
  characterIds: string[];
  dialogueLines: PracticeDialogueLine[];
  sceneDividers: PracticeSceneDivider[];
  feedback: PracticeFeedback;
  chat?: PracticeChat;
  raw: Record<string, unknown>;
}

export interface PracticeGroup {
  id: string;
  title: string;
  plan: PracticePlan;
  number?: string;
  range?: string;
  details?: string;
  badge?: string;
  start?: number;
  end?: number;
}

export interface ParsedFiveCardPractice {
  title: string;
  japaneseTitle: string;
  totalQuestions: number;
  estimatedMinutes: string;
  reviewTopics: string;
  groups: PracticeGroup[];
  exercises: PracticeExercise[];
  characterNamePool: PracticeCharacter[];
  gradedTotalQuestions: number;
}

export function normalizePracticeTextAnswer(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[。.!！]+$/u, "")
    .trim()
    .toLowerCase();
}

function textOf(value: unknown): string {
  return value == null ? "" : String(value);
}

function optionalText(value: unknown): string | undefined {
  const text = textOf(value).trim();
  return text ? text : undefined;
}

function parseOption(raw: Record<string, unknown>): PracticeOption {
  return {
    id: textOf(raw.id),
    text: textOf(raw.text),
    canonicalText: optionalText(raw.canonicalText),
    audioText: optionalText(raw.audioText),
  };
}

function parsePair(raw: Record<string, unknown>): PracticePair {
  const left = asRecord(raw.left) ?? {};
  const right = asRecord(raw.right) ?? {};
  return {
    id: textOf(raw.id),
    left: { id: textOf(left.id), text: textOf(left.text) },
    right: { id: textOf(right.id), text: textOf(right.text) },
  };
}

function parseSlot(raw: Record<string, unknown>): PracticeSlot {
  const accepted = Array.isArray(raw.acceptedAnswers)
    ? raw.acceptedAnswers.map((item) => textOf(item))
    : undefined;
  return {
    id: textOf(raw.id),
    answerId: optionalText(raw.answerId),
    placeholder: optionalText(raw.placeholder),
    displayText: optionalText(raw.displayText),
    canonicalText: optionalText(raw.canonicalText),
    audioText: optionalText(raw.audioText),
    acceptedAnswers: accepted,
  };
}

function parseAnswerSlot(raw: Record<string, unknown>): PracticeAnswerSlot {
  return {
    id: textOf(raw.id),
    expectedTokenId: textOf(raw.expectedTokenId),
    afterText: optionalText(raw.afterText),
  };
}

function parseDialogueLine(raw: Record<string, unknown>): PracticeDialogueLine {
  return {
    speakerId: textOf(raw.speakerId),
    targetText: textOf(raw.targetText || raw.displayText),
    reading: optionalText(raw.reading),
    speechText: optionalText(raw.speechText),
    translation: optionalText(raw.translation),
    romanization: optionalText(raw.romanization),
    audioLocale: optionalText(raw.audioLocale),
  };
}

function parseSceneDivider(raw: Record<string, unknown>): PracticeSceneDivider {
  return {
    afterDialogueLine: typeof raw.afterDialogueLine === "number" ? raw.afterDialogueLine : 0,
    targetText: optionalText(raw.targetText),
    translation: optionalText(raw.translation),
  };
}

function parseChat(raw: Record<string, unknown>): PracticeChat {
  return {
    timestamp: textOf(raw.timestamp),
    context: textOf(raw.context),
    speakers: asRecordList(raw.speakers).map((speaker) => ({
      id: textOf(speaker.id),
      label: textOf(speaker.label),
      alignment: speaker.alignment === "right" ? "right" : "left",
    })),
    messages: asRecordList(raw.messages).map((message) => ({
      id: textOf(message.id),
      speakerId: textOf(message.speakerId),
      segments: asRecordList(message.segments).map((segment) => ({
        displayText: optionalText(segment.displayText),
        canonicalText: optionalText(segment.canonicalText),
        audioText: optionalText(segment.audioText),
        slotId: optionalText(segment.slotId),
      })),
    })),
  };
}

function parseFeedback(raw: Record<string, unknown> | null): PracticeFeedback {
  if (!raw) return {};
  return {
    correctAnswer: optionalText(raw.correctAnswer),
    explanation: optionalText(raw.explanation),
    audioText: optionalText(raw.audioText),
    canonicalAnswer: optionalText(raw.canonicalAnswer),
  };
}

function parseExercise(raw: Record<string, unknown>): PracticeExercise {
  const plan = textOf(raw.plan) === "plus" ? "plus" : "free";
  const chatRaw = asRecord(raw.chat);
  return {
    id: textOf(raw.id),
    order: typeof raw.order === "number" ? raw.order : 0,
    plan,
    type: textOf(raw.type) || "multiple_choice",
    prompt: textOf(raw.prompt),
    context: optionalText(raw.context),
    audioText: optionalText(raw.audioText),
    correctOptionId: optionalText(raw.correctOptionId),
    options: asRecordList(raw.options).map(parseOption),
    tokens: asRecordList(raw.tokens).map(parseOption),
    answerSlots: asRecordList(raw.answerSlots).map(parseAnswerSlot),
    correctTokenIds: (Array.isArray(raw.correctTokenIds) ? raw.correctTokenIds : []).map(textOf),
    unusedTokenIds: (Array.isArray(raw.unusedTokenIds) ? raw.unusedTokenIds : []).map(textOf),
    pairs: asRecordList(raw.pairs).map(parsePair),
    slots: asRecordList(raw.slots).map(parseSlot),
    wordBank: asRecordList(raw.wordBank).map(parseOption),
    dialogue: (Array.isArray(raw.dialogue) ? raw.dialogue : []).map(textOf),
    subQuestions: asRecordList(raw.subQuestions).map(parseExercise),
    isNonGraded: raw.nonGraded === true,
    scenarioTitle: optionalText(raw.scenarioTitle),
    scenarioDescription: optionalText(raw.scenarioDescription),
    characterIds: (Array.isArray(raw.characterIds) ? raw.characterIds : []).map(textOf),
    dialogueLines: asRecordList(raw.dialogueLines).map(parseDialogueLine),
    sceneDividers: asRecordList(raw.sceneDividers).map(parseSceneDivider),
    feedback: parseFeedback(asRecord(raw.feedback)),
    chat: chatRaw ? parseChat(chatRaw) : undefined,
    raw,
  };
}

function parseGroup(raw: Record<string, unknown>): PracticeGroup {
  return {
    id: textOf(raw.id),
    title: textOf(raw.title),
    plan: textOf(raw.plan) === "plus" ? "plus" : "free",
    number: optionalText(raw.number),
    range: optionalText(raw.range),
    details: optionalText(raw.details),
    badge: optionalText(raw.badge),
    start: typeof raw.start === "number" ? raw.start : undefined,
    end: typeof raw.end === "number" ? raw.end : undefined,
  };
}

function parseCharacter(raw: Record<string, unknown>): PracticeCharacter {
  return {
    id: textOf(raw.id),
    displayName: textOf(raw.displayName),
    canonicalName: textOf(raw.canonicalName),
    audioName: textOf(raw.audioName),
  };
}

export function isValidFiveCardContent(content: FiveCardContent | null | undefined): boolean {
  if (!content) return false;
  const intro = asRecord(content.intro);
  const vocabularyDetails = content.vocabularyDetails;
  const dialogueGroups = content.dialogueGroups;
  const grammarPatterns = content.grammarPatterns;
  return (
    intro != null &&
    Array.isArray(vocabularyDetails) &&
    vocabularyDetails.length > 0 &&
    Array.isArray(dialogueGroups) &&
    dialogueGroups.length > 0 &&
    Array.isArray(grammarPatterns) &&
    grammarPatterns.length > 0
  );
}

export function shouldUseFiveCardFlow(lesson: Lesson | null | undefined): boolean {
  return lesson?.lessonFormat === "five_cards" && isValidFiveCardContent(lesson.fiveCardContent);
}

export function resolveLessonFiveCardContent(
  lesson: Lesson,
  nativeLanguage: string,
): Record<string, unknown> {
  return resolveNativeContentMap(
    (lesson.fiveCardContent ?? {}) as Record<string, unknown>,
    nativeLanguage,
    "fiveCardContent",
  );
}

export function parseFiveCardPractice(
  lesson: Lesson,
  nativeLanguage: string,
): ParsedFiveCardPractice | null {
  const content = resolveLessonFiveCardContent(lesson, nativeLanguage);
  const raw = asRecord(content.practice);
  if (!raw) return null;

  const exercises = asRecordList(raw.exercises).map(parseExercise);
  return {
    title: textOf(raw.title),
    japaneseTitle: textOf(raw.japaneseTitle),
    totalQuestions: typeof raw.totalQuestions === "number" ? raw.totalQuestions : exercises.length,
    estimatedMinutes: textOf(raw.estimatedMinutes),
    reviewTopics: textOf(raw.reviewTopics),
    groups: asRecordList(raw.groups).map(parseGroup),
    exercises,
    characterNamePool: asRecordList(content.approvedCharacterNamePool).map(parseCharacter),
    gradedTotalQuestions: exercises.filter((exercise) => !exercise.isNonGraded).length,
  };
}

export function characterById(
  pool: PracticeCharacter[],
  id: string,
): PracticeCharacter | undefined {
  return pool.find((character) => character.id === id);
}

export function checksOption(exercise: PracticeExercise, optionId: string): boolean {
  return optionId === exercise.correctOptionId;
}

export function checksOrder(exercise: PracticeExercise, selectedIds: string[]): boolean {
  const unusedOk = exercise.unusedTokenIds.every((id) => !selectedIds.includes(id));
  const sameLength = selectedIds.length === exercise.correctTokenIds.length;
  const sameOrder =
    sameLength &&
    selectedIds.every((id, index) => id === exercise.correctTokenIds[index]);
  return sameOrder && unusedOk;
}

export function checksTokenSlots(
  exercise: PracticeExercise,
  answers: Record<string, string>,
): boolean {
  return (
    Object.keys(answers).length === exercise.answerSlots.length &&
    exercise.answerSlots.every((slot) => answers[slot.id] === slot.expectedTokenId)
  );
}

export function checksPairs(
  exercise: PracticeExercise,
  answers: Record<string, string>,
): boolean {
  return (
    Object.keys(answers).length === exercise.pairs.length &&
    exercise.pairs.every((pair) => answers[pair.left.id] === pair.right.id)
  );
}

export function checksSlots(
  exercise: PracticeExercise,
  answers: Record<string, string>,
): boolean {
  return (
    Object.keys(answers).length === exercise.slots.length &&
    exercise.slots.every((slot) => answers[slot.id] === slot.answerId)
  );
}

export function checksChatSlots(
  exercise: PracticeExercise,
  answers: Record<string, string>,
): boolean {
  return (
    Object.keys(answers).length === exercise.slots.length &&
    exercise.slots.every((slot) =>
      (slot.acceptedAnswers ?? [])
        .map(normalizePracticeTextAnswer)
        .includes(normalizePracticeTextAnswer(answers[slot.id] ?? "")),
    )
  );
}

export function gradedScore(
  results: Record<string, boolean>,
  practice: ParsedFiveCardPractice,
): { correct: number; total: number; percent: number } {
  const gradedIds = new Set(
    practice.exercises.filter((exercise) => !exercise.isNonGraded).map((exercise) => exercise.id),
  );
  const correct = Object.entries(results).filter(
    ([id, value]) => value && gradedIds.has(id),
  ).length;
  const total = practice.gradedTotalQuestions;
  const percent = total ? Math.round((correct / total) * 100) : 100;
  return { correct, total, percent };
}

export function q14RomanizationToggleAllowed(levelOrLevelId: string): boolean {
  const normalized = levelOrLevelId.trim().toUpperCase();
  const prefix = normalized.split(/[_\s-]/)[0] ?? "";
  return prefix === "A0" || prefix === "A1" || prefix === "A2" || prefix === "B1";
}

export function lineHasReading(line: PracticeDialogueLine): boolean {
  const reading = line.reading?.trim() ?? "";
  return reading.length > 0 && reading !== line.targetText.trim();
}

export function lineHasRomanization(line: PracticeDialogueLine): boolean {
  return Boolean(line.romanization?.trim());
}

export function shuffleIds(ids: string[]): string[] {
  const next = [...ids];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  if (next.length > 1 && next.every((id, index) => id === ids[index])) {
    return shuffleIds(ids);
  }
  return next;
}

export function createAttemptOrders(practice: ParsedFiveCardPractice): Record<string, string[]> {
  const orders: Record<string, string[]> = {};
  for (const exercise of practice.exercises) {
    if (exercise.options.length) {
      orders[`${exercise.id}:options`] = shuffleIds(exercise.options.map((item) => item.id));
    }
    if (exercise.tokens.length) {
      orders[`${exercise.id}:tokens`] = shuffleIds(exercise.tokens.map((item) => item.id));
    }
    if (exercise.wordBank.length) {
      orders[`${exercise.id}:wordBank`] = shuffleIds(exercise.wordBank.map((item) => item.id));
    }
    if (exercise.pairs.length) {
      orders[`${exercise.id}:left`] = shuffleIds(exercise.pairs.map((item) => item.left.id));
      orders[`${exercise.id}:right`] = shuffleIds(exercise.pairs.map((item) => item.right.id));
    }
    for (const question of exercise.subQuestions) {
      if (question.options.length) {
        orders[`${question.id}:options`] = shuffleIds(question.options.map((item) => item.id));
      }
    }
  }
  return orders;
}

export function orderedByIds<T extends { id: string }>(
  items: T[],
  orderedIds: string[] | undefined,
): T[] {
  if (!orderedIds?.length) return items;
  const map = new Map(items.map((item) => [item.id, item]));
  return orderedIds.map((id) => map.get(id)).filter((item): item is T => item != null);
}

export function exerciseTypeLabelKey(type: string): string {
  switch (type) {
    case "matching":
      return "exerciseTypeMatching";
    case "sentence_ordering":
    case "dialogue_ordering":
    case "slot_ordering":
      return "exerciseTypeOrdering";
    case "dialogue_fill":
      return "exerciseTypeDialogueFill";
    case "chat_text_fill":
      return "exerciseTypeChatFill";
    case "listening_multiple_choice":
      return "exerciseTypeListening";
    case "checkpoint":
      return "exerciseTypeCheckpoint";
    case "controlled_ai_text":
    case "real_world_practice_dialogue":
      return "exerciseTypeAiPractice";
    case "multiple_choice":
    default:
      return "exerciseTypeChoice";
  }
}

export function readingLineForDisplay(targetText: string, reading?: string): string {
  const trimmedReading = displayNativeText(reading);
  if (!trimmedReading || trimmedReading === targetText.trim()) return "";
  return trimmedReading;
}

/** Re-export shared practice type for consumers that need the thin schema shape. */
export type { FiveCardPractice };
