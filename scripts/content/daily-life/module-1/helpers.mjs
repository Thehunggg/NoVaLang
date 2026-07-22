import { MODULE_ONE_CONTENT, moduleOneNative as N } from './content.mjs';
import { MODULE_ONE_DIALOGUES } from './dialogues.mjs';
import { JA_UNIT1_LESSON1 } from './ja-unit1-lesson1.mjs';
import { JA_UNIT1_LESSON2 } from './ja-unit1-lesson2.mjs';
import { JA_UNIT1_LESSON3 } from './ja-unit1-lesson3.mjs';
import { prepareJapaneseRomanization, toReadableRomaji } from '../../../lib/japanese-pronunciation.mjs';
import { resolveLanguageDisplayName } from '../../../lib/language-names.mjs';

// Tokenizer-based Japanese romanization (JapanesePronunciationProfile,
// scripts/lib/japanese-pronunciation.mjs) needs an async morphological
// analyzer build. Rather than making this synchronous generator module
// (and everything that calls it) async, every Japanese surfaceText this
// module will ever romanize is pre-tokenized once, up front, via top-level
// await — ESM blocks the whole import graph on this before any dependent
// module's synchronous code runs, so buildReadyModuleOne() below stays a
// plain synchronous function.
// Every approved five_cards lesson's Q14 (real_world_practice_dialogue) has its
// romanization generated at build time from targetText via toReadableRomaji
// (withGeneratedQ14Romanization below). Collect those targetTexts from each
// registered lesson so the async tokenizer can pre-build them all in one pass.
const q14Targets = (lesson) =>
  lesson.lesson.content.practice.exercises
    .find((exercise) => exercise.type === 'real_world_practice_dialogue')
    ?.dialogueLines?.map((line) => line.targetText) ?? [];

await prepareJapaneseRomanization([
  ...MODULE_ONE_CONTENT.flatMap((spec) =>
    (spec.lines ?? []).map((line) => line.ja),
  ),
  ...q14Targets(JA_UNIT1_LESSON1),
  ...q14Targets(JA_UNIT1_LESSON2),
  ...q14Targets(JA_UNIT1_LESSON3),
]);

// Registry of approved five_cards lessons, keyed by language then the FINAL
// LESSON ID string (e.g. 'ja-daily_life-m01-u1-l1') — never by array
// position/index. This is the ID-stability fix from the 15-topic × 3-tier
// restructure (owner decision, 2026-07-18): the id is derived from each
// unit's/lesson's own explicit `order` field in daily-life-blueprint.mjs,
// not from where it happens to sit in an array, so reordering, inserting, or
// removing a topic/unit elsewhere can never silently make this resolve to
// the wrong content — a stale/renamed key simply resolves to nothing (the
// slot is skipped, not filled with the wrong lesson). To add a new
// five_cards lesson: write its approved source module (matching
// JA_UNIT1_LESSON1's shape, declaring `lessonFormat: 'five_cards'`) and add
// exactly one entry here keyed by that lesson's real, final id — the
// generation loop does not need to change.
const FIVE_CARDS_REGISTRY = {
  ja: {
    'ja-daily_life-m01-u1-l1': JA_UNIT1_LESSON1,
    'ja-daily_life-m01-u1-l2': JA_UNIT1_LESSON2,
    'ja-daily_life-m01-u1-l3': JA_UNIT1_LESSON3,
  },
};

const CODES = ['vi', 'en', 'ja', 'ko', 'zh'];
const AUDIO = { en: 'en-US', ja: 'ja-JP' };
const localized = (en, vi, ja) => N(en, vi, ja);
const target = (line, language) => line[language];
const reading = (line, language) => language === 'ja' ? line.reading : undefined;
// Deterministic, learner-readable romanization for Japanese vocabulary/key
// phrases, per JapanesePronunciationProfile (scripts/lib/japanese-pronunciation.mjs).
// Tokenizes the surfaceText (kanji+kana, target(line, 'ja')) rather than the
// pre-extracted kana `reading` — the analyzer needs the kanji for reliable
// word segmentation. Not the same string as `reading` — see AGENTS.md
// pronunciation governance: surfaceText/reading/romanization are distinct
// fields.
const romanization = (line, language) =>
  language === 'ja' ? toReadableRomaji(target(line, language)) : undefined;
const translation = (line, language) => localized(
  language === 'en' ? line.en : line.en,
  line.vi,
  language === 'ja' ? line.ja : line.ja,
);
const rotate = (values) => values.length > 1 ? [...values.slice(1), values[0]] : values;
const graphemes = (value) => Array.from(value).filter((character) => !/\s/u.test(character)).slice(0, 24);
const uniqueBy = (items, key) => {
  const seen = new Set();
  return items.filter((item) => {
    const value = key(item);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

function withGeneratedQ14Romanization(content) {
  return {
    ...content,
    practice: {
      ...content.practice,
      exercises: content.practice.exercises.map((exercise) =>
        exercise.type === 'real_world_practice_dialogue'
          ? {
              ...exercise,
              dialogueLines: exercise.dialogueLines.map((line) => ({
                ...line,
                romanization: toReadableRomaji(line.targetText),
              })),
            }
          : exercise,
      ),
    },
  };
}
const distinctLines = (lines, language, count) =>
  uniqueBy(lines, (line) => target(line, language)).slice(0, count);
const pairLines = (lines, language, nativeCode, count) => {
  const targets = new Set();
  const meanings = new Set();
  return lines.filter((line) => {
    const left = target(line, language);
    const right = translation(line, language)[nativeCode];
    if (targets.has(left) || meanings.has(right)) return false;
    targets.add(left);
    meanings.add(right);
    return true;
  }).slice(0, count);
};
const safeHint = (line, language) => Object.fromEntries(CODES.map((code) => [
  code,
  code === language || translation(line, language)[code] === target(line, language)
    ? (code === 'ja' ? 'このレッスンで学んだ表現を使いましょう。' : 'Use a phrase from this lesson.')
    : translation(line, language)[code],
]));
const afterSubmitReveal = (line, language) => Object.fromEntries(CODES.map((code) => {
  const parts = [target(line, language)];
  if (language === 'ja' && line.reading && line.reading !== line.ja) parts.push(line.reading);
  parts.push(translation(line, language)[code]);
  return [code, parts.join('\n')];
}));

function vocab(lessonId, line, index, language) {
  const text = target(line, language);
  const meanings = translation(line, language);
  return {
    id: `${lessonId}-p${index + 1}`,
    targetText: text,
    displayText: text,
    reading: reading(line, language),
    romanization: romanization(line, language),
    translationByNative: meanings,
    translations: meanings,
    speechText: text,
    audioLocale: AUDIO[language],
    meaningEn: meanings.en,
    meaningVi: meanings.vi,
    meaningJa: meanings.ja,
    meaningKo: meanings.en,
    meaningZh: meanings.en,
    exampleText: text,
    exampleReading: reading(line, language),
    exampleSpeechText: text,
    exampleTranslationByNative: meanings,
    exampleTranslations: meanings,
  };
}

function dialogueLine(lessonId, groupIndex, lineIndex, line, language) {
  const text = target(line, language);
  const meanings = translation(line, language);
  return {
    id: `${lessonId}-dg${groupIndex + 1}-d${lineIndex + 1}`,
    speaker: line.speaker,
    targetText: text,
    displayText: text,
    reading: reading(line, language),
    translationByNative: meanings,
    translations: meanings,
    meaningEn: meanings.en,
    meaningVi: meanings.vi,
    meaningJa: meanings.ja,
    meaningKo: meanings.en,
    meaningZh: meanings.en,
    speechText: text,
    audioLocale: AUDIO[language],
  };
}

function buildDialogueGroups(lessonId, contentId, language) {
  const groups = MODULE_ONE_DIALOGUES[contentId];
  if (!Array.isArray(groups) || groups.length !== 3) {
    throw new Error(`Module 1 lesson ${contentId} must define exactly 3 dialogue groups`);
  }
  return groups.map((group, groupIndex) => {
    const lines = group.lines ?? [];
    if (lines.length < 4 || lines.length > 6) {
      throw new Error(`Module 1 lesson ${contentId} dialogue ${groupIndex + 1} must have 4-6 lines`);
    }
    return {
      id: `${lessonId}-dg${groupIndex + 1}`,
      titleByNative: group.titleByNative,
      situationByNative: group.situationByNative,
      lines: lines.map((line, lineIndex) => dialogueLine(lessonId, groupIndex, lineIndex, line, language)),
    };
  });
}

function baseExercise(id, order, type, plan, promptByNative) {
  return {
    id: `${id}-e${order}`, order, type, plan, access: plan,
    plusOnly: plan === 'plus', stage: order <= 5 ? 'warmup' : 'real_world',
    status: 'ready', prompt: promptByNative.en, promptVi: promptByNative.vi,
    prompts: promptByNative,
  };
}

function exercises(id, spec, language) {
  const lines = spec.lines;
  const texts = lines.map((line) => target(line, language));
  const audioLocale = AUDIO[language];
  const commonAccepted = (line) => Object.fromEntries(CODES.map((code) => [code, [target(line, language)]]));
  const choiceLines = distinctLines(lines, language, 4);
  const e1 = {
    ...baseExercise(id, 1, 'matchPairs', 'free', localized('Match each phrase with its meaning.','Nối mỗi cụm câu với nghĩa.','フレーズと意味を組み合わせましょう。')),
    pairs: pairLines(lines, language, 'en', 3).map((line) => ({ left: target(line, language), right: translation(line, language).en })),
    pairsByNative: Object.fromEntries(CODES.map((code) => [code, pairLines(lines, language, code, 3).map((line) => ({ left: target(line, language), right: translation(line, language)[code] }))])),
  };
  const meaningOptions = (code) => uniqueBy(lines, (line) => translation(line, language)[code])
    .slice(0, 4)
    .map((line) => translation(line, language)[code]);
  const meaningTarget = uniqueBy(lines, (line) => translation(line, language).en)[2] ?? lines[2];
  const e2 = {
    ...baseExercise(id, 2, 'listenAndChoose', 'free', localized('Listen and choose the phrase.','Nghe và chọn câu.','聞いてフレーズを選びましょう。')),
    speechText: target(choiceLines[1], language), audioLocale, hideSpeechLabel: true,
    options: choiceLines.map((line) => target(line, language)),
    optionsByNative: Object.fromEntries(CODES.map((code) => [code, choiceLines.map((line) => target(line, language))])),
    correctAnswer: target(choiceLines[1], language),
    acceptedAnswersByNative: commonAccepted(choiceLines[1]),
  };
  const e3 = {
    ...baseExercise(id, 3, 'multipleChoiceMeaning', 'free', localized(`What does “${target(meaningTarget, language)}” mean?`,`“${target(meaningTarget, language)}” có nghĩa là gì?`,`「${target(meaningTarget, language)}」はどういう意味ですか。`)),
    options: meaningOptions('en'),
    optionsByNative: Object.fromEntries(CODES.map((code) => [code, meaningOptions(code)])),
    correctAnswer: translation(meaningTarget, language).en,
    acceptedAnswersByNative: Object.fromEntries(CODES.map((code) => [code, [translation(meaningTarget, language)[code]]])),
  };
  const e4 = {
    ...baseExercise(id, 4, 'typeAnswer', 'free', localized('Type the target-language phrase for the meaning below.','Tự nhập câu bằng ngôn ngữ đang học cho nghĩa bên dưới.','下の意味に合う学習言語の文を入力しましょう。')),
    hintByNative: safeHint(lines[0], language),
    hint: safeHint(lines[0], language).en,
    instructionByNative: safeHint(lines[0], language),
    acceptedAnswers: [texts[0]], correctAnswer: texts[0],
    acceptedAnswersByNative: commonAccepted(lines[0]), caseInsensitive: language === 'en',
    ignorePunctuation: true, allowedScript: 'any', revealAfterAnswer: texts[0],
    revealAfterAnswerByNative: afterSubmitReveal(lines[0], language), fullSentence: texts[0],
    translationByNative: translation(lines[0], language), speechText: texts[0], audioLocale,
  };
  const sourceTiles = language === 'ja' ? graphemes(texts[3]) : texts[3].split(/\s+/);
  const shuffled = rotate(sourceTiles);
  const e5 = {
    ...baseExercise(id, 5, language === 'ja' ? 'arrangeLetters' : 'arrangeWords', 'free', localized('Arrange the tiles into the correct phrase.','Sắp xếp các ô thành câu đúng.','タイルを正しい順番に並べましょう。')),
    tiles: shuffled, options: shuffled, correctAnswer: texts[3],
    acceptedAnswers: [texts[3]],
    acceptedAnswersByNative: Object.fromEntries(CODES.map((code) => [code, [texts[3]]])),
    fullSentence: texts[3], translationByNative: translation(lines[3], language),
    speechText: texts[3], audioLocale, revealAfterAnswer: texts[3],
    revealAfterAnswerByNative: afterSubmitReveal(lines[3], language),
  };
  const e6 = {
    ...baseExercise(id, 6, 'dialogueCompletion', 'free', localized(`In the lesson dialogue, A says “${texts[4]}”. Which exact reply completes this exchange?`,`Trong hội thoại của bài, A nói “${texts[4]}”. Câu đáp nào hoàn thành đúng đoạn hội thoại này?`,`このレッスンの会話で、Aは「${texts[4]}」と言います。会話を完成させる正しい返事を選びましょう。`)),
    dialogueContextByNative: localized(`A: ${texts[4]}\nB: ___`,`A: ${texts[4]}\nB: ___`,`A: ${texts[4]}\nB: ___`),
    options: [texts[5], texts[0], texts[2]], correctAnswer: texts[5], acceptedAnswersByNative: commonAccepted(lines[5]),
  };
  const e7 = {
    ...baseExercise(id, 7, 'naturalResponseChoice', 'free', localized(`Choose a natural response to “${texts[0]}”.`,`Chọn phản hồi tự nhiên cho “${texts[0]}”.`,`「${texts[0]}」への自然な返事を選びましょう。`)),
    options: [texts[1], texts[3], texts[5]], correctAnswer: texts[1], acceptedAnswersByNative: commonAccepted(lines[1]),
  };
  const subQuestions = lines.slice(0, 5).map((line, index) => ({
    id: `${id}-e8-q${index + 1}`,
    instructionByNative: localized('Listen and choose.','Nghe và chọn.','聞いて選びましょう。'),
    prompt: 'Listen and choose the phrase.', prompts: localized('Listen and choose the phrase.','Nghe và chọn câu.','聞いてフレーズを選びましょう。'),
    speechText: target(line, language), audioLocale, hideSpeechLabel: true,
    options: [target(line, language), target(lines[(index + 1) % lines.length], language), target(lines[(index + 2) % lines.length], language)],
    correctAnswer: target(line, language), translationByNative: translation(line, language),
    revealAfterAnswer: target(line, language), revealAfterAnswerByNative: translation(line, language),
    feedbackCorrectByNative: localized('Correct.','Chính xác.','正解です。'), feedbackWrongByNative: localized('Listen once more.','Hãy nghe lại một lần.','もう一度聞きましょう。'),
  }));
  const e8 = { ...baseExercise(id, 8, 'plusListeningVocabularyChallenge', 'plus', localized('Complete five listening questions.','Hoàn thành năm câu nghe.','五つのリスニング問題に答えましょう。')), usesAi: false, audioLocale, subQuestions };
  const e9 = {
    ...baseExercise(id, 9, 'controlledAiQa', 'plus', localized(texts[1], texts[1], texts[1])),
    aiMode: 'controlled_qa', maxCycles: 1, maxUserChars: 400, openEndedChat: false,
    targetQuestion: texts[1], speechText: texts[1], audioLocale, expectedAnswer: texts[2],
    acceptedAnswers: [texts[2]], correctAnswer: texts[2], usesAi: true,
    feedbackByNative: localized('Give one short correction, then end.','Chỉ sửa ngắn một lần rồi kết thúc.','短く一度だけ添削して終了します。'),
  };
  const e10 = {
    ...baseExercise(id, 10, 'aiFeedbackReview', 'plus', localized('Review the key phrases from this lesson.','Ôn các câu chính của bài.','このレッスンの大切な表現を復習しましょう。')),
    usesAi: false, triggerExtraAiCallByDefault: false, reusesPreviousAiFeedback: true,
    reviewQuestions: lines.slice(0, 5).map((line, index) => ({ id: `${id}-e10-q${index + 1}`, targetText: target(line, language), translationByNative: translation(line, language), speechText: target(line, language), audioLocale })),
    options: [texts[0], texts[1], texts[2]], correctAnswer: texts[0], acceptedAnswersByNative: commonAccepted(lines[0]),
  };
  return [e1,e2,e3,e4,e5,e6,e7,e8,e9,e10];
}

// Resolves ONE lesson slot to its approved five_cards content, if any exists
// in FIVE_CARDS_REGISTRY for this `language` + final `lessonId`. Returns the
// fully-built lesson object (via `makeLesson`), or `null` when no registry
// entry matches. Extracted from `buildReadyModuleOne`'s inner lesson-building
// logic (owner decision, 2026-07-19: every module's Cơ bản tier may now mix
// one real five_cards lesson with several named blueprint placeholder
// lessons in the same unit, not just Module 1) — the field construction
// below is unchanged from the prior Module-1-only path, so the Golden Lesson
// object it produces is unaffected by this extraction. Callers (the unified
// loop in daily-life-blueprint.mjs) fall back to building a placeholder
// lesson for a slot when this returns `null`.
export function resolveApprovedFiveCardsLesson(language, lessonId, { unitId, lessonOrder, moduleId, makeLesson }) {
  const approved = FIVE_CARDS_REGISTRY[language]?.[lessonId];
  if (!approved) return null;
  const approvedContent = withGeneratedQ14Romanization(approved.lesson.content);
  const approvedVocabulary = approved.vocabulary;
  const approvedDialogueGroups = approvedContent.dialogueGroups.map((group) => ({
    id: `${lessonId}-${group.id}`,
    titleByNative: group.titleByNative,
    situationByNative: group.situationByNative,
    explanationByNative: Object.fromEntries(
      Object.entries(group.explanationByNative).map(([code, lines]) => [
        code,
        lines.join('\n'),
      ]),
    ),
    lines: group.lines.map((item, index) => ({ ...item, id: `${lessonId}-${group.id}-${index + 1}` })),
  }));
  return makeLesson({
    id: lessonId, languageCode: language, nicheId: 'daily_life', branch: 'niche',
    moduleId, unitId, order: lessonOrder, level: 'A0', levelRange: 'A0–A1',
    placementTag: 'daily_life_basic', template: 'vocabularyLesson',
    title: approved.lesson.title, titleVi: approved.lesson.title, titleByNative: approved.lesson.titleByNative,
    description: approved.lesson.description, descriptionVi: approved.lesson.description,
    descriptionByNative: approved.lesson.descriptionByNative,
    canDoObjective: approved.lesson.description, canDoObjectiveVi: approved.lesson.description,
    canDoObjectiveByNative: approved.lesson.descriptionByNative,
    goalByNative: approved.lesson.descriptionByNative,
    situationByNative: Object.fromEntries(
      Object.entries(approvedContent.intro.situationByNative).map(([code, lines]) => [
        code,
        lines.join('\n'),
      ]),
    ),
    objectives: approvedContent.intro.objectives, objectivesVi: approvedContent.intro.objectives,
    objectivesByNative: approvedContent.intro.objectivesByNative,
    introPoints: approvedContent.intro.objectives, introPointsVi: approvedContent.intro.objectives,
    introPointsByNative: approvedContent.intro.objectivesByNative,
    estimatedMinutes: 12, track: `${language}-daily_life`, vocabulary: approvedVocabulary,
    keyPhrases: [], dialogue: approvedDialogueGroups.flatMap((group) => group.lines),
    dialogueGroups: approvedDialogueGroups, reviewItems: [], grammarFocus: null, grammarFocusVi: null,
    cultureNote: null, cultureNoteVi: null, contextualVariations: [], communicationStrategyByNative: {},
    lessonFormat: approved.lessonFormat, fiveCardContent: approvedContent,
    contentStatus: 'ready', playable: true, comingSoon: false, canSkip: false,
    exerciseStatus: 'ready',
    learnSection: {
      lessonIntro: { status: 'ready' }, vocabularyPhraseCards: { status: 'ready' },
      miniDialogue: { status: 'ready', dialogueGroupCount: 3 }, grammarSentencePatterns: { status: 'ready' },
      practiceExercises: { status: 'ready' },
    },
    saveToReview: { status: 'ready', itemIds: approvedVocabulary.map((card) => card.id) },
    exercises: [],
  });
}

// Topic 1 (Chào hỏi & làm quen) builder — SUPERSEDED, no longer called.
// Kept on disk unreferenced (same precedent as content.mjs/dialogues.mjs
// after ADR-020): daily-life-blueprint.mjs's `buildDailyLifeCourses` now
// calls `resolveApprovedFiveCardsLesson` directly from its own unified loop
// (used uniformly for all 16 modules) instead of special-casing Module 1
// through this function. Left here in case any of its course/unit assembly
// shape is useful reference later — not wired into generation.
export function buildReadyModuleOne(language, context) {
  const { makeCourse, makeLesson, moduleDef, courseOrder } = context;
  const courseId = `${language}-daily_life-m01`;
  const units = [];
  const lessons = [];
  for (const unitDef of moduleDef.units) {
    const unitOrder = unitDef.order;
    const unitId = `${courseId}-u${unitOrder}`;
    const lessonIds = [];
    let approvedUnitMeta = null;
    for (const lessonSlot of unitDef.lessons) {
      const lessonOrder = lessonSlot.order;
      const lessonId = `${unitId}-l${lessonOrder}`;
      const approvedFiveCards = FIVE_CARDS_REGISTRY[language]?.[lessonId];
      if (!approvedFiveCards) continue;
      const approved = approvedFiveCards;
      approvedUnitMeta = approved.unit;
      const approvedContent = withGeneratedQ14Romanization(
        approved.lesson.content,
      );
      const approvedVocabulary = approved.vocabulary;
      const approvedDialogueGroups = approvedContent.dialogueGroups.map((group) => ({
        id: `${lessonId}-${group.id}`,
        titleByNative: group.titleByNative,
        situationByNative: group.situationByNative,
        explanationByNative: Object.fromEntries(
          Object.entries(group.explanationByNative).map(([code, lines]) => [
            code,
            lines.join('\n'),
          ]),
        ),
        lines: group.lines.map((item, index) => ({ ...item, id: `${lessonId}-${group.id}-${index + 1}` })),
      }));
      lessonIds.push(lessonId);
      lessons.push(makeLesson({
        id: lessonId, languageCode: language, nicheId: 'daily_life', branch: 'niche',
        moduleId: moduleDef.moduleId, unitId, order: lessonOrder, level: 'A0', levelRange: 'A0–A1',
        placementTag: 'daily_life_basic', template: 'vocabularyLesson',
        title: approved.lesson.title, titleVi: approved.lesson.title, titleByNative: approved.lesson.titleByNative,
        description: approved.lesson.description, descriptionVi: approved.lesson.description,
        descriptionByNative: approved.lesson.descriptionByNative,
        canDoObjective: approved.lesson.description, canDoObjectiveVi: approved.lesson.description,
        canDoObjectiveByNative: approved.lesson.descriptionByNative,
        goalByNative: approved.lesson.descriptionByNative,
        situationByNative: Object.fromEntries(
          Object.entries(approvedContent.intro.situationByNative).map(([code, lines]) => [
            code,
            lines.join('\n'),
          ]),
        ),
        objectives: approvedContent.intro.objectives, objectivesVi: approvedContent.intro.objectives,
        objectivesByNative: approvedContent.intro.objectivesByNative,
        introPoints: approvedContent.intro.objectives, introPointsVi: approvedContent.intro.objectives,
        introPointsByNative: approvedContent.intro.objectivesByNative,
        estimatedMinutes: 12, track: `${language}-daily_life`, vocabulary: approvedVocabulary,
        keyPhrases: [], dialogue: approvedDialogueGroups.flatMap((group) => group.lines),
        dialogueGroups: approvedDialogueGroups, reviewItems: [], grammarFocus: null, grammarFocusVi: null,
        cultureNote: null, cultureNoteVi: null, contextualVariations: [], communicationStrategyByNative: {},
        lessonFormat: approved.lessonFormat, fiveCardContent: approvedContent,
        contentStatus: 'ready', playable: true, comingSoon: false, canSkip: false,
        exerciseStatus: 'ready',
        learnSection: {
          lessonIntro: { status: 'ready' }, vocabularyPhraseCards: { status: 'ready' },
          miniDialogue: { status: 'ready', dialogueGroupCount: 3 }, grammarSentencePatterns: { status: 'ready' },
          practiceExercises: { status: 'ready' },
        },
        saveToReview: { status: 'ready', itemIds: approvedVocabulary.map((card) => card.id) },
        exercises: [],
      }));
    }
    if (!lessonIds.length) continue; // no approved content for this unit/language yet — don't create it
    units.push({
      id: unitId,
      title: approvedUnitMeta?.title ?? `Unit ${unitOrder}: ${unitDef.titleByNative.en}`,
      titleVi: approvedUnitMeta?.title ?? `Bài ${unitOrder}: ${unitDef.titleByNative.vi}`,
      titleByNative: approvedUnitMeta?.titleByNative ?? unitDef.titleByNative,
      levelCode: 'A0', levelRange: 'A0–A1', tier: unitDef.tier,
      trackId: `${language}-daily_life`, moduleId: moduleDef.moduleId,
      goal: moduleDef.goalByNative.en, goalVi: moduleDef.goalByNative.vi, goalByNative: moduleDef.goalByNative,
      displayOrder: unitOrder, order: unitOrder, lessonIds,
    });
  }
  const moduleTitle = moduleDef.titleByNative;
  return makeCourse({ courseId, languageCode: language, nicheId: 'daily_life', branch: 'niche', moduleId: moduleDef.moduleId, moduleTitle: moduleTitle.en, moduleTitleVi: moduleTitle.vi, moduleTitleByNative: moduleTitle, title: `${resolveLanguageDisplayName(language, 'en')} · ${moduleTitle.en}`, titleVi: `${resolveLanguageDisplayName(language, 'vi')} · ${moduleTitle.vi}`, titleByNative: moduleTitle, description: moduleDef.goalByNative.en, descriptionVi: moduleDef.goalByNative.vi, descriptionByNative: moduleDef.goalByNative, order: courseOrder, levelCode: 'A0', levelRange: 'A0–A1', placementTag: 'daily_life_basic', contentStatus: units.length ? 'ready' : 'blueprint', playable: units.length > 0, type: 'communication', unlockRequirement: 'core_foundation_completed', units, lessons });
}
