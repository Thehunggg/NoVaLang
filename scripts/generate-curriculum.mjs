#!/usr/bin/env node
/**
 * Generate shared curriculum JSON for Web + Flutter.
 * Run: node scripts/generate-curriculum.mjs
 *
 * Original NovaLang curriculum content (not copied from any third-party app).
 * CEFR can-do / task-based principles are used only as a structural guide
 * (what a learner should be able to DO after a lesson) — all wording,
 * dialogues, and phrases below are written specifically for NovaLang.
 *
 * Output:
 *   shared/generated/{courses,lessons,curriculum_catalog}.json
 *   shared/content/curriculum/{same + README.md}
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIRS = [
  path.join(ROOT, "shared", "generated"),
  path.join(ROOT, "shared", "content", "curriculum"),
];

const VERSION = "curriculum-v2";

// ── low-level content helpers ───────────────────────────────────────

const v = (id, displayText, meaningEn, meaningVi, extra = {}) => ({
  id,
  displayText,
  speechText: extra.speechText ?? displayText,
  meaningEn,
  meaningVi,
  ...(extra.reading ? { reading: extra.reading } : {}),
  ...(extra.romanization ? { romanization: extra.romanization } : {}),
  ...(extra.exampleSentence ? { exampleSentence: extra.exampleSentence } : {}),
  ...(extra.exampleSentenceVi ? { exampleSentenceVi: extra.exampleSentenceVi } : {}),
});

const kp = (id, displayText, meaningEn, meaningVi, extra = {}) => ({
  id,
  displayText,
  speechText: extra.speechText ?? displayText,
  meaningEn,
  meaningVi,
  ...(extra.usageNote ? { usageNote: extra.usageNote } : {}),
  ...(extra.usageNoteVi ? { usageNoteVi: extra.usageNoteVi } : {}),
});

const dl = (id, speaker, displayText, meaningEn, meaningVi, speechText) => ({
  id,
  speaker,
  displayText,
  speechText: speechText ?? displayText,
  meaningEn,
  meaningVi,
});

const reviewFromVocab = (item) => ({
  id: `${item.id}-rv`,
  kind: "vocabulary",
  displayText: item.displayText,
  speechText: item.speechText,
  meaningEn: item.meaningEn,
  meaningVi: item.meaningVi,
});

const reviewFromPhrase = (item) => ({
  id: `${item.id}-rv`,
  kind: "phrase",
  displayText: item.displayText,
  speechText: item.speechText,
  meaningEn: item.meaningEn,
  meaningVi: item.meaningVi,
});

// ── exercise builders ───────────────────────────────────────────────

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function rotated(arr, seedId) {
  if (arr.length <= 1) return arr.slice();
  const k = hashStr(seedId) % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

function assertUnique(arr, label) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) throw new Error(`Duplicate ${label}: "${item}"`);
    seen.add(item);
  }
}

function exChooseMeaning(id, target, pool, skill = "vocabulary") {
  const seen = new Set([target.meaningEn]);
  const distractors = [];
  for (const item of pool) {
    if (distractors.length >= 3) break;
    if (item.id === target.id || seen.has(item.meaningEn)) continue;
    seen.add(item.meaningEn);
    distractors.push(item);
  }
  if (distractors.length < 3) {
    throw new Error(`exChooseMeaning ${id}: need 3 unique distractors for "${target.displayText}"`);
  }
  const all = rotated(
    [
      { en: target.meaningEn, vi: target.meaningVi },
      ...distractors.slice(0, 3).map((d) => ({ en: d.meaningEn, vi: d.meaningVi })),
    ],
    id,
  );
  const options = all.map((x) => x.en);
  const optionsVi = all.map((x) => x.vi);
  assertUnique(options, `chooseMeaning options (${id})`);
  return {
    id,
    type: "chooseMeaning",
    prompt: "What does this mean?",
    promptVi: "Từ/câu này nghĩa là gì?",
    displayText: target.displayText,
    speechText: target.speechText ?? target.displayText,
    options,
    optionsVi,
    correctAnswer: target.meaningEn,
    acceptedAnswers: [target.meaningEn],
    acceptedAnswersVi: [target.meaningVi],
    skill,
  };
}

function exListenAndChoose(id, target, pool, skill = "listening") {
  const seen = new Set([target.meaningEn]);
  const distractors = [];
  for (const item of pool) {
    if (distractors.length >= 3) break;
    if (item.id === target.id || seen.has(item.meaningEn)) continue;
    seen.add(item.meaningEn);
    distractors.push(item);
  }
  if (distractors.length < 3) {
    throw new Error(`exListenAndChoose ${id}: need 3 unique distractors for "${target.displayText}"`);
  }
  const all = rotated(
    [
      { en: target.meaningEn, vi: target.meaningVi },
      ...distractors.slice(0, 3).map((d) => ({ en: d.meaningEn, vi: d.meaningVi })),
    ],
    id,
  );
  const options = all.map((x) => x.en);
  const optionsVi = all.map((x) => x.vi);
  assertUnique(options, `listenAndChoose options (${id})`);
  return {
    id,
    type: "listenAndChoose",
    prompt: "Listen and choose the meaning.",
    promptVi: "Nghe và chọn nghĩa đúng.",
    speechText: target.speechText ?? target.displayText,
    options,
    optionsVi,
    correctAnswer: target.meaningEn,
    acceptedAnswers: [target.meaningEn],
    acceptedAnswersVi: [target.meaningVi],
    skill,
  };
}

/** chooseReading: kanji/word → kana reading (options are kana strings). */
function exChooseReading(id, target, pool, skill = "reading") {
  if (!target.reading) throw new Error(`exChooseReading ${id}: target missing reading`);
  const seen = new Set([target.reading]);
  const distractors = [];
  for (const item of pool) {
    if (distractors.length >= 3) break;
    if (!item.reading || item.id === target.id || seen.has(item.reading)) continue;
    seen.add(item.reading);
    distractors.push(item.reading);
  }
  if (distractors.length < 3) {
    throw new Error(`exChooseReading ${id}: need 3 unique reading distractors for "${target.displayText}"`);
  }
  const options = rotated([target.reading, ...distractors.slice(0, 3)], id);
  assertUnique(options, `chooseReading options (${id})`);
  return {
    id,
    type: "chooseReading",
    prompt: "Choose the correct reading.",
    promptVi: "Chọn cách đọc đúng.",
    displayText: target.displayText,
    speechText: target.speechText ?? target.reading,
    options,
    optionsVi: options,
    correctAnswer: target.reading,
    acceptedAnswers: [target.reading, ...(target.romanization ? [target.romanization] : [])],
    acceptedAnswersVi: [target.reading],
    skill,
  };
}

/** chooseReading variant for kana rows: kana char → romanization. */
function exChooseRomanization(id, target, pool, skill = "reading") {
  if (!target.romanization) throw new Error(`exChooseRomanization ${id}: target missing romanization`);
  const seen = new Set([target.romanization]);
  const distractors = [];
  for (const item of pool) {
    if (distractors.length >= 3) break;
    if (!item.romanization || item.id === target.id || seen.has(item.romanization)) continue;
    seen.add(item.romanization);
    distractors.push(item.romanization);
  }
  if (distractors.length < 3) {
    throw new Error(`exChooseRomanization ${id}: need 3 unique romanization distractors for "${target.displayText}"`);
  }
  const options = rotated([target.romanization, ...distractors.slice(0, 3)], id);
  assertUnique(options, `chooseRomanization options (${id})`);
  return {
    id,
    type: "chooseReading",
    prompt: "Choose the correct reading.",
    promptVi: "Chọn cách đọc đúng.",
    displayText: target.displayText,
    speechText: target.speechText ?? target.displayText,
    options,
    optionsVi: options,
    correctAnswer: target.romanization,
    acceptedAnswers: [target.romanization],
    acceptedAnswersVi: [target.romanization],
    skill,
  };
}

function exMatchPairs(id, items, opts = {}) {
  const rightKey = opts.rightKey ?? "meaningEn";
  const rightKeyVi = opts.rightKeyVi ?? "meaningVi";
  const pairs = items.map((it) => ({ left: it.displayText, right: it[rightKey] }));
  const pairsVi = items.map((it) => ({ left: it.displayText, right: it[rightKeyVi] ?? it[rightKey] }));
  assertUnique(pairs.map((p) => p.left), `matchPairs lefts (${id})`);
  assertUnique(pairs.map((p) => p.right), `matchPairs rights (${id})`);
  return {
    id,
    type: "matchPairs",
    prompt: "Match each item with its meaning.",
    promptVi: "Ghép mỗi mục với nghĩa đúng.",
    correctAnswer: "",
    acceptedAnswers: [],
    pairs,
    pairsVi,
    skill: opts.skill ?? "vocabulary",
  };
}

function exTypeAnswer(id, { displayText, speechText, acceptedAnswers, acceptedAnswersVi, prompt, promptVi, skill = "vocabulary" }) {
  if (!acceptedAnswers?.length) throw new Error(`exTypeAnswer ${id}: need acceptedAnswers`);
  return {
    id,
    type: "typeAnswer",
    prompt: prompt ?? "Type the meaning.",
    promptVi: promptVi ?? "Gõ nghĩa của câu này.",
    displayText,
    speechText: speechText ?? displayText,
    correctAnswer: acceptedAnswers[0],
    acceptedAnswers,
    acceptedAnswersVi: acceptedAnswersVi ?? acceptedAnswers,
    skill,
  };
}

function exFillBlank(id, { sentence, sentenceSpeech, blankWord, optionWords, prompt, promptVi, skill = "grammar" }) {
  const idx = sentence.indexOf(blankWord);
  if (idx === -1) throw new Error(`exFillBlank ${id}: blankWord "${blankWord}" not found in "${sentence}"`);
  const blanked = `${sentence.slice(0, idx)}___${sentence.slice(idx + blankWord.length)}`;
  const opts = [...new Set(optionWords)];
  if (!opts.includes(blankWord)) opts.unshift(blankWord);
  if (opts.length !== 4) {
    throw new Error(`exFillBlank ${id}: need exactly 4 unique option words, got ${opts.length} (${opts.join(", ")})`);
  }
  const options = rotated(opts, id);
  return {
    id,
    type: "fillBlank",
    prompt: prompt ?? "Complete the sentence.",
    promptVi: promptVi ?? "Điền vào chỗ trống.",
    displayText: blanked,
    speechText: sentenceSpeech ?? sentence,
    options,
    optionsVi: options,
    correctAnswer: blankWord,
    acceptedAnswers: [blankWord],
    acceptedAnswersVi: [blankWord],
    skill,
  };
}

// ── lesson assembly ─────────────────────────────────────────────────

function makeLesson({
  id,
  languageCode,
  nicheId,
  unitId,
  title,
  titleVi,
  track,
  level,
  template = "vocabularyLesson",
  description,
  descriptionVi,
  estimatedMinutes = 6,
  order,
  canDoObjective,
  canDoObjectiveVi,
  objectives,
  objectivesVi,
  introPoints,
  introPointsVi,
  vocabulary = [],
  keyPhrases = [],
  dialogue = [],
  grammarFocus,
  grammarFocusVi,
  cultureNote,
  cultureNoteVi,
  reviewItems,
  exercises = [],
}) {
  const finalReviewItems =
    reviewItems ?? [...vocabulary.map(reviewFromVocab), ...keyPhrases.map(reviewFromPhrase)];
  return {
    id,
    languageCode,
    nicheId,
    unitId,
    title,
    titleVi,
    track,
    level,
    template,
    description,
    descriptionVi,
    estimatedMinutes,
    comingSoon: false,
    order,
    canDoObjective,
    canDoObjectiveVi,
    objectives,
    objectivesVi,
    introPoints,
    introPointsVi,
    vocabulary,
    keyPhrases,
    dialogue,
    ...(grammarFocus ? { grammarFocus, grammarFocusVi } : {}),
    ...(cultureNote ? { cultureNote, cultureNoteVi } : {}),
    reviewItems: finalReviewItems,
    exercises,
  };
}

function buildStandardExercises({ id, languageCode, vocabulary, phrase, listenIndex = 2 }) {
  const [v0, v1, v2] = vocabulary;
  const exercises = [exChooseMeaning(`${id}-e1`, v0, vocabulary)];

  if (languageCode === "ja") {
    exercises.push(exChooseReading(`${id}-e2`, v1 ?? v0, vocabulary));
  } else {
    exercises.push(
      exFillBlank(`${id}-e2`, {
        sentence: phrase.displayText,
        sentenceSpeech: phrase.speechText,
        blankWord: v0.displayText,
        optionWords: vocabulary.slice(0, 4).map((item) => item.displayText),
      }),
    );
  }

  exercises.push(exMatchPairs(`${id}-e3`, vocabulary.slice(0, Math.min(vocabulary.length, 6))));

  exercises.push(
    exTypeAnswer(`${id}-e4`, {
      displayText: phrase.displayText,
      speechText: phrase.speechText,
      acceptedAnswers: [phrase.meaningEn],
      acceptedAnswersVi: [phrase.meaningVi],
      prompt: "Type the meaning of this phrase.",
      promptVi: "Gõ nghĩa của câu này.",
      skill: "dialogue",
    }),
  );

  const target = vocabulary[listenIndex] ?? v2 ?? v0;
  exercises.push(exListenAndChoose(`${id}-e5`, target, vocabulary));

  return exercises;
}

function topicLesson({
  id,
  languageCode,
  nicheId,
  unitId,
  order,
  level,
  template = "vocabularyLesson",
  title,
  titleVi,
  description,
  descriptionVi,
  canDo,
  canDoVi,
  estimatedMinutes = 6,
  vocabulary,
  phrase,
  extraPhrases = [],
  dialogue,
  grammarFocus,
  grammarFocusVi,
  cultureNote,
  cultureNoteVi,
  listenIndex,
}) {
  const track = `${languageCode}-${nicheId}`;
  const exercises = buildStandardExercises({ id, languageCode, vocabulary, phrase, listenIndex });
  const vocabLine = vocabulary
    .slice(0, 4)
    .map((item) => `${item.displayText} — ${item.meaningEn}`)
    .join("; ");
  const vocabLineVi = vocabulary
    .slice(0, 4)
    .map((item) => `${item.displayText} — ${item.meaningVi}`)
    .join("; ");
  return makeLesson({
    id,
    languageCode,
    nicheId,
    unitId,
    title,
    titleVi,
    track,
    level,
    template,
    description,
    descriptionVi,
    estimatedMinutes,
    order,
    canDoObjective: canDo,
    canDoObjectiveVi: canDoVi,
    objectives: [canDo, "Recognize and use the new vocabulary in context."],
    objectivesVi: [canDoVi, "Nhận biết và sử dụng từ vựng mới trong tình huống thực tế."],
    introPoints: [description, `Key words: ${vocabLine}`, `Key phrase: ${phrase.displayText} — ${phrase.meaningEn}`],
    introPointsVi: [descriptionVi, `Từ khóa: ${vocabLineVi}`, `Câu chính: ${phrase.displayText} — ${phrase.meaningVi}`],
    vocabulary,
    keyPhrases: [phrase, ...extraPhrases],
    dialogue,
    grammarFocus,
    grammarFocusVi,
    cultureNote,
    cultureNoteVi,
    exercises,
  });
}

function buildKanaExercises(id, kanaList) {
  const [k0, k1, k2, k3] = kanaList;
  return [
    exChooseRomanization(`${id}-e1`, k0, kanaList),
    exChooseRomanization(`${id}-e2`, k1 ?? k0, kanaList),
    exMatchPairs(`${id}-e3`, kanaList, { rightKey: "romanization", rightKeyVi: "romanization", skill: "reading" }),
    exTypeAnswer(`${id}-e4`, {
      displayText: (k2 ?? k0).displayText,
      speechText: (k2 ?? k0).speechText,
      acceptedAnswers: [(k2 ?? k0).romanization],
      acceptedAnswersVi: [(k2 ?? k0).romanization],
      prompt: "Type the reading.",
      promptVi: "Gõ cách đọc.",
      skill: "reading",
    }),
    exListenAndChoose(`${id}-e5`, k3 ?? k0, kanaList, "listening"),
  ];
}

function kanaLesson({
  id,
  nicheId,
  unitId,
  order,
  title,
  titleVi,
  description,
  descriptionVi,
  canDo,
  canDoVi,
  chars,
  estimatedMinutes = 5,
}) {
  const track = `ja-${nicheId}`;
  const vocabulary = chars.map(([char, roma], idx) =>
    v(`${id}-v${idx + 1}`, char, roma, roma, { reading: char, romanization: roma, speechText: char }),
  );
  const exercises = buildKanaExercises(id, vocabulary);
  const charLine = chars.map(([c]) => c).join(" ");
  const romaLine = chars.map(([, r]) => r).join(" ");
  return makeLesson({
    id,
    languageCode: "ja",
    nicheId,
    unitId,
    title,
    titleVi,
    track,
    level: "A0",
    template: "kanaLesson",
    description,
    descriptionVi,
    estimatedMinutes,
    order,
    canDoObjective: canDo,
    canDoObjectiveVi: canDoVi,
    objectives: [canDo, `Recognize and read: ${charLine}`],
    objectivesVi: [canDoVi, `Nhận biết và đọc: ${charLine}`],
    introPoints: [description, `Characters: ${charLine}`, `Romanization: ${romaLine}`],
    introPointsVi: [descriptionVi, `Ký tự: ${charLine}`, `Cách đọc la-tinh: ${romaLine}`],
    vocabulary,
    keyPhrases: [],
    dialogue: [
      dl(`${id}-d1`, "Teacher", charLine, romaLine, romaLine, charLine),
      dl(`${id}-d2`, "Student", chars[0][0], chars[0][1], chars[0][1], chars[0][0]),
    ],
    exercises,
  });
}

function buildCourse({ languageCode, nicheId, title, titleVi, description, descriptionVi, levelCode, units }) {
  const track = `${languageCode}-${nicheId}`;
  const lessons = units.flatMap((u) => u.lessons);
  const unitDefs = units.map((u, idx) => ({
    id: u.id,
    title: u.title,
    titleVi: u.titleVi,
    levelCode: u.levelCode,
    trackId: track,
    goal: u.goal,
    goalVi: u.goalVi,
    order: idx + 1,
    lessonIds: u.lessons.map((l) => l.id),
  }));
  return {
    course: {
      id: track,
      languageCode,
      nicheId,
      title,
      titleVi,
      description,
      descriptionVi,
      levelCode,
      order: 1,
      unitIds: unitDefs.map((u) => u.id),
      isComingSoon: false,
      units: unitDefs,
    },
    lessons,
  };
}

// ── Japanese · Daily Life (kana + practical) ────────────────────────

function jaDailyLife() {
  const nicheId = "daily_life";
  const u1 = "ja-a0-u1";
  const u2 = "ja-a0-u2";
  const u3 = "ja-daily_life-u3";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    kanaLesson({
      id: `${u1}-l1`,
      nicheId,
      unitId: u1,
      order: next(),
      title: "Hiragana Intro",
      titleVi: "Giới thiệu Hiragana",
      description: "Hiragana is the first Japanese writing system you will learn — every character is one sound.",
      descriptionVi: "Hiragana là hệ chữ viết đầu tiên bạn học trong tiếng Nhật — mỗi ký tự là một âm.",
      canDo: "I can explain what hiragana is and recognize the first four vowel sounds.",
      canDoVi: "Tôi có thể giải thích hiragana là gì và nhận biết bốn nguyên âm đầu tiên.",
      chars: [
        ["あ", "a"],
        ["い", "i"],
        ["う", "u"],
        ["え", "e"],
      ],
    }),
    kanaLesson({
      id: `${u1}-l2`,
      nicheId,
      unitId: u1,
      order: next(),
      title: "Vowels あいうえお",
      titleVi: "Nguyên âm あいうえお",
      description: "All five hiragana vowels — the base sound for every other hiragana character.",
      descriptionVi: "Cả 5 nguyên âm hiragana — âm gốc cho mọi ký tự hiragana khác.",
      canDo: "I can read and write all five hiragana vowels from memory.",
      canDoVi: "Tôi có thể đọc và viết cả 5 nguyên âm hiragana từ trí nhớ.",
      chars: [
        ["あ", "a"],
        ["い", "i"],
        ["う", "u"],
        ["え", "e"],
        ["お", "o"],
      ],
    }),
    kanaLesson({
      id: `${u1}-l3`,
      nicheId,
      unitId: u1,
      order: next(),
      title: "K-row かきくけこ",
      titleVi: "Hàng K かきくけこ",
      description: "The K-row combines the K sound with each vowel: ka, ki, ku, ke, ko.",
      descriptionVi: "Hàng K kết hợp âm K với từng nguyên âm: ka, ki, ku, ke, ko.",
      canDo: "I can read and write the five K-row hiragana characters.",
      canDoVi: "Tôi có thể đọc và viết 5 ký tự hiragana hàng K.",
      chars: [
        ["か", "ka"],
        ["き", "ki"],
        ["く", "ku"],
        ["け", "ke"],
        ["こ", "ko"],
      ],
    }),
    kanaLesson({
      id: `${u1}-l4`,
      nicheId,
      unitId: u1,
      order: next(),
      title: "S-row さしすせそ",
      titleVi: "Hàng S さしすせそ",
      description: "The S-row: sa, shi, su, se, so — note that し is \"shi\", not \"si\".",
      descriptionVi: "Hàng S: sa, shi, su, se, so — lưu ý し đọc là \"shi\", không phải \"si\".",
      canDo: "I can read and write the five S-row hiragana characters.",
      canDoVi: "Tôi có thể đọc và viết 5 ký tự hiragana hàng S.",
      chars: [
        ["さ", "sa"],
        ["し", "shi"],
        ["す", "su"],
        ["せ", "se"],
        ["そ", "so"],
      ],
    }),
    kanaLesson({
      id: `${u1}-l5`,
      nicheId,
      unitId: u1,
      order: next(),
      title: "Hiragana Checkpoint",
      titleVi: "Kiểm tra Hiragana",
      description: "Review vowels, K-row, and S-row together before moving to katakana.",
      descriptionVi: "Ôn lại nguyên âm, hàng K và hàng S trước khi học katakana.",
      canDo: "I can read a short mix of hiragana from the vowels, K-row, and S-row.",
      canDoVi: "Tôi có thể đọc một đoạn hiragana pha trộn từ nguyên âm, hàng K và hàng S.",
      chars: [
        ["い", "i"],
        ["け", "ke"],
        ["す", "su"],
        ["こ", "ko"],
        ["さ", "sa"],
      ],
    }),
  ];

  const u2Lessons = [
    kanaLesson({
      id: `${u2}-l1`,
      nicheId,
      unitId: u2,
      order: next(),
      title: "Katakana Intro",
      titleVi: "Giới thiệu Katakana",
      description: "Katakana looks sharper than hiragana and is mainly used for foreign words and emphasis.",
      descriptionVi: "Katakana có nét góc cạnh hơn hiragana, dùng chủ yếu cho từ ngoại lai và nhấn mạnh.",
      canDo: "I can explain when katakana is used and recognize the first four vowel sounds.",
      canDoVi: "Tôi có thể giải thích khi nào dùng katakana và nhận biết bốn nguyên âm đầu tiên.",
      chars: [
        ["ア", "a"],
        ["イ", "i"],
        ["ウ", "u"],
        ["エ", "e"],
      ],
    }),
    kanaLesson({
      id: `${u2}-l2`,
      nicheId,
      unitId: u2,
      order: next(),
      title: "Katakana Vowels アイウエオ",
      titleVi: "Nguyên âm Katakana アイウエオ",
      description: "Katakana vowels sound identical to hiragana vowels — only the shape changes.",
      descriptionVi: "Nguyên âm katakana có âm giống hiragana — chỉ khác hình dạng ký tự.",
      canDo: "I can read and write all five katakana vowels from memory.",
      canDoVi: "Tôi có thể đọc và viết cả 5 nguyên âm katakana từ trí nhớ.",
      chars: [
        ["ア", "a"],
        ["イ", "i"],
        ["ウ", "u"],
        ["エ", "e"],
        ["オ", "o"],
      ],
    }),
    kanaLesson({
      id: `${u2}-l3`,
      nicheId,
      unitId: u2,
      order: next(),
      title: "Katakana K-row カキクケコ",
      titleVi: "Hàng K Katakana カキクケコ",
      description: "The katakana K-row: ka, ki, ku, ke, ko — the same sounds as hiragana か.",
      descriptionVi: "Hàng K katakana: ka, ki, ku, ke, ko — cùng âm với hiragana か.",
      canDo: "I can read and write the five K-row katakana characters.",
      canDoVi: "Tôi có thể đọc và viết 5 ký tự katakana hàng K.",
      chars: [
        ["カ", "ka"],
        ["キ", "ki"],
        ["ク", "ku"],
        ["ケ", "ke"],
        ["コ", "ko"],
      ],
    }),
    topicLesson({
      id: `${u2}-l4`,
      languageCode: "ja",
      nicheId,
      unitId: u2,
      order: next(),
      level: "A0",
      template: "kanaLesson",
      title: "Loanwords ホテル・バス・コーヒー",
      titleVi: "Từ ngoại lai ホテル・バス・コーヒー",
      description: "Katakana spells out foreign loanwords you will see everywhere in Japan.",
      descriptionVi: "Katakana dùng để viết từ ngoại lai mà bạn sẽ thấy khắp nơi ở Nhật.",
      canDo: "I can read four common katakana loanwords and ask a simple question about one.",
      canDoVi: "Tôi có thể đọc 4 từ ngoại lai katakana thường gặp và hỏi một câu đơn giản.",
      vocabulary: [
        v(`${u2}-l4-v1`, "ホテル", "hotel", "khách sạn", { reading: "ホテル", romanization: "hoteru", speechText: "ホテル" }),
        v(`${u2}-l4-v2`, "バス", "bus", "xe buýt", { reading: "バス", romanization: "basu", speechText: "バス" }),
        v(`${u2}-l4-v3`, "コーヒー", "coffee", "cà phê", { reading: "コーヒー", romanization: "koohii", speechText: "コーヒー" }),
        v(`${u2}-l4-v4`, "タクシー", "taxi", "tắc xi", { reading: "タクシー", romanization: "takushii", speechText: "タクシー" }),
      ],
      phrase: kp(`${u2}-l4-p1`, "ホテルはどこですか。", "Where is the hotel?", "Khách sạn ở đâu?", { speechText: "ホテルはどこですか" }),
      dialogue: [
        dl(`${u2}-l4-d1`, "A", "ホテルはどこですか。", "Where is the hotel?", "Khách sạn ở đâu?", "ホテルはどこですか"),
        dl(`${u2}-l4-d2`, "B", "バスの前です。", "It is in front of the bus stop.", "Ở phía trước điểm xe buýt.", "バスのまえです"),
      ],
    }),
    kanaLesson({
      id: `${u2}-l5`,
      nicheId,
      unitId: u2,
      order: next(),
      title: "Katakana Checkpoint",
      titleVi: "Kiểm tra Katakana",
      description: "Review katakana vowels and K-row together before moving to practical Japanese.",
      descriptionVi: "Ôn lại nguyên âm và hàng K katakana trước khi học tiếng Nhật thực dụng.",
      canDo: "I can read a short mix of katakana from the vowels and K-row.",
      canDoVi: "Tôi có thể đọc một đoạn katakana pha trộn từ nguyên âm và hàng K.",
      chars: [
        ["イ", "i"],
        ["ケ", "ke"],
        ["ウ", "u"],
        ["コ", "ko"],
        ["ア", "a"],
      ],
    }),
  ];

  const u3Lessons = [
    topicLesson({
      id: `${u3}-l1`,
      languageCode: "ja",
      nicheId,
      unitId: u3,
      order: next(),
      level: "A1_1",
      title: "Greetings",
      titleVi: "Chào hỏi",
      description: "The everyday greetings you will use the most in Japan.",
      descriptionVi: "Những câu chào hỏi bạn dùng nhiều nhất khi ở Nhật.",
      canDo: "I can greet someone appropriately at different times of day.",
      canDoVi: "Tôi có thể chào hỏi phù hợp vào các thời điểm khác nhau trong ngày.",
      vocabulary: [
        v(`${u3}-l1-v1`, "こんにちは", "hello / good afternoon", "xin chào", { reading: "こんにちは", romanization: "konnichiwa", speechText: "こんにちは" }),
        v(`${u3}-l1-v2`, "おはよう", "good morning", "chào buổi sáng", { reading: "おはよう", romanization: "ohayou", speechText: "おはよう" }),
        v(`${u3}-l1-v3`, "こんばんは", "good evening", "chào buổi tối", { reading: "こんばんは", romanization: "konbanwa", speechText: "こんばんは" }),
        v(`${u3}-l1-v4`, "ありがとう", "thank you", "cảm ơn", { reading: "ありがとう", romanization: "arigatou", speechText: "ありがとう" }),
      ],
      phrase: kp(`${u3}-l1-p1`, "こんにちは、元気ですか。", "Hello, how are you?", "Xin chào, bạn khỏe không?", { speechText: "こんにちは、げんきですか" }),
      dialogue: [
        dl(`${u3}-l1-d1`, "A", "こんにちは、元気ですか。", "Hello, how are you?", "Xin chào, bạn khỏe không?", "こんにちは、げんきですか"),
        dl(`${u3}-l1-d2`, "B", "元気です。ありがとう。", "I am fine. Thank you.", "Tôi khỏe. Cảm ơn.", "げんきです。ありがとう"),
      ],
      cultureNote: "A small bow usually accompanies greetings in Japan — the more formal the situation, the deeper the bow.",
      cultureNoteVi: "Một cái cúi đầu nhẹ thường đi kèm khi chào hỏi ở Nhật — càng trang trọng thì cúi càng sâu.",
    }),
    topicLesson({
      id: `${u3}-l2`,
      languageCode: "ja",
      nicheId,
      unitId: u3,
      order: next(),
      level: "A1_1",
      title: "Self-introduction 私は〜です",
      titleVi: "Tự giới thiệu 私は〜です",
      description: "Use the pattern 私は〜です to say who you are.",
      descriptionVi: "Dùng cấu trúc 私は〜です để nói bạn là ai.",
      canDo: "I can introduce myself using 私は〜です and respond politely.",
      canDoVi: "Tôi có thể tự giới thiệu bằng 私は〜です và đáp lại lịch sự.",
      vocabulary: [
        v(`${u3}-l2-v1`, "私", "I / me", "tôi", { reading: "わたし", romanization: "watashi", speechText: "わたし" }),
        v(`${u3}-l2-v2`, "名前", "name", "tên", { reading: "なまえ", romanization: "namae", speechText: "なまえ" }),
        v(`${u3}-l2-v3`, "です", "am / is / are (polite)", "là (lịch sự)", { reading: "です", romanization: "desu", speechText: "です" }),
        v(`${u3}-l2-v4`, "よろしく", "nice to meet you", "rất vui được gặp", { reading: "よろしく", romanization: "yoroshiku", speechText: "よろしく" }),
      ],
      phrase: kp(`${u3}-l2-p1`, "私はハナです。よろしくお願いします。", "I am Hana. Nice to meet you.", "Tôi là Hana. Rất vui được gặp bạn.", { speechText: "わたしはハナです。よろしくおねがいします" }),
      dialogue: [
        dl(`${u3}-l2-d1`, "A", "お名前は。", "What is your name?", "Bạn tên gì?", "おなまえは"),
        dl(`${u3}-l2-d2`, "B", "私はハナです。よろしくお願いします。", "I am Hana. Nice to meet you.", "Tôi là Hana. Rất vui được gặp bạn.", "わたしはハナです。よろしくおねがいします"),
      ],
      grammarFocus: "私は [name] です = \"I am [name]\". は marks the topic; です is the polite copula.",
      grammarFocusVi: "私は [tên] です = \"Tôi là [tên]\". は đánh dấu chủ đề; です là trợ động từ lịch sự.",
    }),
    (() => {
      const id = `${u3}-l3`;
      const vocabulary = [
        v(`${id}-v1`, "一", "one", "một", { reading: "いち", romanization: "ichi", speechText: "いち" }),
        v(`${id}-v2`, "二", "two", "hai", { reading: "に", romanization: "ni", speechText: "に" }),
        v(`${id}-v3`, "三", "three", "ba", { reading: "さん", romanization: "san", speechText: "さん" }),
        v(`${id}-v4`, "五", "five", "năm", { reading: "ご", romanization: "go", speechText: "ご" }),
        v(`${id}-v5`, "八", "eight", "tám", { reading: "はち", romanization: "hachi", speechText: "はち" }),
        v(`${id}-v6`, "十", "ten", "mười", { reading: "じゅう", romanization: "juu", speechText: "じゅう" }),
      ];
      const phrase = kp(`${id}-p1`, "りんごを三つください。", "Three apples, please.", "Cho tôi ba quả táo.", { speechText: "りんごをみっつください" });
      return topicLesson({
        id,
        languageCode: "ja",
        nicheId,
        unitId: u3,
        order: next(),
        level: "A1_1",
        title: "Numbers 1–10",
        titleVi: "Số đếm 1–10",
        description: "Core numbers you will use for prices, time, and quantities.",
        descriptionVi: "Số đếm cơ bản dùng cho giá cả, thời gian và số lượng.",
        canDo: "I can count from one to ten and use a number to ask for a quantity.",
        canDoVi: "Tôi có thể đếm từ một đến mười và dùng số để yêu cầu số lượng.",
        vocabulary,
        phrase,
        dialogue: [
          dl(`${id}-d1`, "A", "いくつですか。", "How many?", "Bao nhiêu cái?", "いくつですか"),
          dl(`${id}-d2`, "B", "りんごを三つください。", "Three apples, please.", "Cho tôi ba quả táo.", "りんごをみっつください"),
        ],
      });
    })(),
    topicLesson({
      id: `${u3}-l4`,
      languageCode: "ja",
      nicheId,
      unitId: u3,
      order: next(),
      level: "A1_1",
      title: "Daily Objects & 雨",
      titleVi: "Đồ vật hàng ngày & 雨",
      description: "Common everyday nouns, including 雨（あめ）= rain.",
      descriptionVi: "Danh từ thường gặp hàng ngày, gồm 雨（あめ）= mưa.",
      canDo: "I can name common daily objects and talk about the weather using 雨.",
      canDoVi: "Tôi có thể gọi tên đồ vật hàng ngày và nói về thời tiết bằng 雨.",
      vocabulary: [
        v(`${u3}-l4-v1`, "雨", "rain", "mưa", { reading: "あめ", romanization: "ame", speechText: "あめ" }),
        v(`${u3}-l4-v2`, "水", "water", "nước", { reading: "みず", romanization: "mizu", speechText: "みず" }),
        v(`${u3}-l4-v3`, "家", "house / home", "nhà", { reading: "いえ", romanization: "ie", speechText: "いえ" }),
        v(`${u3}-l4-v4`, "猫", "cat", "mèo", { reading: "ねこ", romanization: "neko", speechText: "ねこ" }),
      ],
      phrase: kp(`${u3}-l4-p1`, "雨です。家にいます。", "It is raining. I am staying home.", "Trời mưa. Tôi ở nhà.", { speechText: "あめです。いえにいます" }),
      dialogue: [
        dl(`${u3}-l4-d1`, "A", "今日は雨ですか。", "Is it raining today?", "Hôm nay trời mưa à?", "きょうはあめですか"),
        dl(`${u3}-l4-d2`, "B", "はい、雨です。家にいます。", "Yes, it is raining. I am staying home.", "Vâng, trời mưa. Tôi ở nhà.", "はい、あめです。いえにいます"),
      ],
    }),
    topicLesson({
      id: `${u3}-l5`,
      languageCode: "ja",
      nicheId,
      unitId: u3,
      order: next(),
      level: "A1_1",
      title: "Shopping & Prices いくら",
      titleVi: "Mua sắm & giá cả いくら",
      description: "Ask the price of something and describe it as cheap or expensive.",
      descriptionVi: "Hỏi giá của một món đồ và mô tả nó rẻ hay đắt.",
      canDo: "I can ask how much something costs and understand a simple price.",
      canDoVi: "Tôi có thể hỏi giá một món đồ và hiểu một mức giá đơn giản.",
      vocabulary: [
        v(`${u3}-l5-v1`, "いくら", "how much", "bao nhiêu tiền", { reading: "いくら", romanization: "ikura", speechText: "いくら" }),
        v(`${u3}-l5-v2`, "円", "yen", "yên (tiền Nhật)", { reading: "えん", romanization: "en", speechText: "えん" }),
        v(`${u3}-l5-v3`, "安い", "cheap", "rẻ", { reading: "やすい", romanization: "yasui", speechText: "やすい" }),
        v(`${u3}-l5-v4`, "高い", "expensive", "đắt", { reading: "たかい", romanization: "takai", speechText: "たかい" }),
      ],
      phrase: kp(`${u3}-l5-p1`, "これはいくらですか。", "How much is this?", "Cái này bao nhiêu tiền?", { speechText: "これはいくらですか" }),
      dialogue: [
        dl(`${u3}-l5-d1`, "A", "これはいくらですか。", "How much is this?", "Cái này bao nhiêu tiền?", "これはいくらですか"),
        dl(`${u3}-l5-d2`, "B", "五百円です。安いですよ。", "It is 500 yen. It is cheap.", "500 yên. Rẻ đấy.", "ごひゃくえんです。やすいですよ"),
      ],
    }),
    topicLesson({
      id: `${u3}-l6`,
      languageCode: "ja",
      nicheId,
      unitId: u3,
      order: next(),
      level: "A1_1",
      title: "Directions どこ",
      titleVi: "Hỏi đường どこ",
      description: "Ask where something is and understand simple directions.",
      descriptionVi: "Hỏi một nơi ở đâu và hiểu chỉ đường đơn giản.",
      canDo: "I can ask where a place is and understand left/right directions.",
      canDoVi: "Tôi có thể hỏi một nơi ở đâu và hiểu chỉ đường trái/phải.",
      vocabulary: [
        v(`${u3}-l6-v1`, "どこ", "where", "ở đâu", { reading: "どこ", romanization: "doko", speechText: "どこ" }),
        v(`${u3}-l6-v2`, "駅", "station", "nhà ga", { reading: "えき", romanization: "eki", speechText: "えき" }),
        v(`${u3}-l6-v3`, "右", "right", "bên phải", { reading: "みぎ", romanization: "migi", speechText: "みぎ" }),
        v(`${u3}-l6-v4`, "左", "left", "bên trái", { reading: "ひだり", romanization: "hidari", speechText: "ひだり" }),
      ],
      phrase: kp(`${u3}-l6-p1`, "駅はどこですか。", "Where is the station?", "Nhà ga ở đâu?", { speechText: "えきはどこですか" }),
      dialogue: [
        dl(`${u3}-l6-d1`, "A", "駅はどこですか。", "Where is the station?", "Nhà ga ở đâu?", "えきはどこですか"),
        dl(`${u3}-l6-d2`, "B", "右です。", "It is to the right.", "Ở bên phải.", "みぎです"),
      ],
    }),
    topicLesson({
      id: `${u3}-l7`,
      languageCode: "ja",
      nicheId,
      unitId: u3,
      order: next(),
      level: "A1_1",
      title: "Asking for Help 助けて",
      titleVi: "Nhờ giúp đỡ 助けて",
      description: "Words and phrases for when you urgently need help.",
      descriptionVi: "Từ vựng và câu dùng khi bạn cần giúp đỡ gấp.",
      canDo: "I can call for help and name where I need to go for assistance.",
      canDoVi: "Tôi có thể gọi giúp đỡ và nói nơi tôi cần đến để được hỗ trợ.",
      vocabulary: [
        v(`${u3}-l7-v1`, "助けて", "help!", "cứu tôi / giúp tôi", { reading: "たすけて", romanization: "tasukete", speechText: "たすけて" }),
        v(`${u3}-l7-v2`, "警察", "police", "cảnh sát", { reading: "けいさつ", romanization: "keisatsu", speechText: "けいさつ" }),
        v(`${u3}-l7-v3`, "病院", "hospital", "bệnh viện", { reading: "びょういん", romanization: "byouin", speechText: "びょういん" }),
        v(`${u3}-l7-v4`, "迷子", "lost (person)", "bị lạc", { reading: "まいご", romanization: "maigo", speechText: "まいご" }),
      ],
      phrase: kp(`${u3}-l7-p1`, "助けてください。道に迷いました。", "Please help me. I am lost.", "Xin hãy giúp tôi. Tôi bị lạc đường.", { speechText: "たすけてください。みちにまよいました" }),
      dialogue: [
        dl(`${u3}-l7-d1`, "A", "助けてください。道に迷いました。", "Please help me. I am lost.", "Xin hãy giúp tôi. Tôi bị lạc đường.", "たすけてください。みちにまよいました"),
        dl(`${u3}-l7-d2`, "B", "大丈夫ですか。病院に行きますか。", "Are you okay? Do you need to go to the hospital?", "Bạn có sao không? Bạn cần đến bệnh viện không?", "だいじょうぶですか。びょういんにいきますか"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "ja",
    nicheId,
    title: "Japanese · Daily Life",
    titleVi: "Tiếng Nhật · Đời sống hàng ngày",
    description: "Kana foundations plus greetings, numbers, and everyday vocabulary.",
    descriptionVi: "Nền tảng kana cùng chào hỏi, số đếm và từ vựng hàng ngày.",
    levelCode: "A0",
    units: [
      { id: u1, title: "Kana Starter: Hiragana", titleVi: "Khởi động Kana: Hiragana", levelCode: "A0", goal: "Read basic hiragana vowels and K/S rows.", goalVi: "Đọc nguyên âm hiragana và hàng K/S.", lessons: u1Lessons },
      { id: u2, title: "Kana Starter: Katakana", titleVi: "Khởi động Kana: Katakana", levelCode: "A0", goal: "Read katakana vowels, K-row, and common loanwords.", goalVi: "Đọc nguyên âm, hàng K katakana và từ ngoại lai thường gặp.", lessons: u2Lessons },
      { id: u3, title: "Greetings & Daily Life", titleVi: "Chào hỏi & đời sống hàng ngày", levelCode: "A1_1", goal: "Greet, introduce yourself, count, shop, ask directions, and get help.", goalVi: "Chào hỏi, tự giới thiệu, đếm số, mua sắm, hỏi đường và nhờ giúp đỡ.", lessons: u3Lessons },
    ],
  });
}

// ── Japanese · Travel & Hotel ───────────────────────────────────────

function jaTravel() {
  const nicheId = "travel_hotel";
  const u1 = "ja-travel_hotel-u1";
  const u2 = "ja-travel_hotel-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Hotel Reservation", titleVi: "Đặt phòng khách sạn",
      description: "State that you already have a hotel reservation.",
      descriptionVi: "Nói rằng bạn đã có đặt phòng khách sạn.",
      canDo: "I can state that I have a reservation and give my name.",
      canDoVi: "Tôi có thể nói rằng tôi đã đặt phòng và cho biết tên của mình.",
      vocabulary: [
        v(`${u1}-l1-v1`, "予約", "reservation", "đặt chỗ / đặt phòng", { reading: "よやく", romanization: "yoyaku", speechText: "よやく" }),
        v(`${u1}-l1-v2`, "名前", "name", "tên", { reading: "なまえ", romanization: "namae", speechText: "なまえ" }),
        v(`${u1}-l1-v3`, "部屋", "room", "phòng", { reading: "へや", romanization: "heya", speechText: "へや" }),
        v(`${u1}-l1-v4`, "泊まる", "to stay overnight", "ở lại qua đêm", { reading: "とまる", romanization: "tomaru", speechText: "とまる" }),
      ],
      phrase: kp(`${u1}-l1-p1`, "予約があります。", "I have a reservation.", "Tôi có đặt phòng.", { speechText: "よやくがあります" }),
      dialogue: [
        dl(`${u1}-l1-d1`, "Guest", "予約があります。", "I have a reservation.", "Tôi có đặt phòng.", "よやくがあります"),
        dl(`${u1}-l1-d2`, "Staff", "お名前をお願いします。", "Your name, please.", "Cho tôi xin tên của bạn.", "おなまえをおねがいします"),
      ],
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Hotel Check-in", titleVi: "Nhận phòng khách sạn",
      description: "Ask to check in and hand over your passport.",
      descriptionVi: "Xin nhận phòng và đưa hộ chiếu.",
      canDo: "I can ask to check in and understand what document is needed.",
      canDoVi: "Tôi có thể xin nhận phòng và hiểu cần giấy tờ gì.",
      vocabulary: [
        v(`${u1}-l2-v1`, "チェックイン", "check-in", "nhận phòng", { reading: "チェックイン", romanization: "chekku-in", speechText: "チェックイン" }),
        v(`${u1}-l2-v2`, "鍵", "key", "chìa khóa", { reading: "かぎ", romanization: "kagi", speechText: "かぎ" }),
        v(`${u1}-l2-v3`, "パスポート", "passport", "hộ chiếu", { reading: "パスポート", romanization: "pasupooto", speechText: "パスポート" }),
        v(`${u1}-l2-v4`, "サイン", "signature", "chữ ký", { reading: "サイン", romanization: "sain", speechText: "サイン" }),
      ],
      phrase: kp(`${u1}-l2-p1`, "チェックインをお願いします。", "Check-in, please.", "Cho tôi nhận phòng.", { speechText: "チェックインをおねがいします" }),
      dialogue: [
        dl(`${u1}-l2-d1`, "Guest", "チェックインをお願いします。", "Check-in, please.", "Cho tôi nhận phòng.", "チェックインをおねがいします"),
        dl(`${u1}-l2-d2`, "Staff", "パスポートをお願いします。", "Your passport, please.", "Cho tôi xin hộ chiếu.", "パスポートをおねがいします"),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Where is the Gate / Toilet?", titleVi: "Cổng / nhà vệ sinh ở đâu?",
      description: "Ask where the gate, toilet, or an information counter is.",
      descriptionVi: "Hỏi cổng, nhà vệ sinh hoặc quầy thông tin ở đâu.",
      canDo: "I can ask where a place in the airport or hotel is.",
      canDoVi: "Tôi có thể hỏi một địa điểm trong sân bay hoặc khách sạn ở đâu.",
      vocabulary: [
        v(`${u1}-l3-v1`, "ゲート", "gate", "cổng (sân bay)", { reading: "ゲート", romanization: "geeto", speechText: "ゲート" }),
        v(`${u1}-l3-v2`, "トイレ", "toilet", "nhà vệ sinh", { reading: "トイレ", romanization: "toire", speechText: "トイレ" }),
        v(`${u1}-l3-v3`, "案内", "information", "thông tin / hướng dẫn", { reading: "あんない", romanization: "annai", speechText: "あんない" }),
        v(`${u1}-l3-v4`, "近い", "near", "gần", { reading: "ちかい", romanization: "chikai", speechText: "ちかい" }),
      ],
      phrase: kp(`${u1}-l3-p1`, "ゲートはどこですか。", "Where is the gate?", "Cổng ở đâu?", { speechText: "ゲートはどこですか" }),
      dialogue: [
        dl(`${u1}-l3-d1`, "A", "すみません、トイレはどこですか。", "Excuse me, where is the toilet?", "Xin lỗi, nhà vệ sinh ở đâu?", "すみません、トイレはどこですか"),
        dl(`${u1}-l3-d2`, "B", "案内の近くです。", "It is near the information counter.", "Ở gần quầy thông tin.", "あんないのちかくです"),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Missing Baggage", titleVi: "Hành lý bị mất",
      description: "Report that your baggage did not arrive.",
      descriptionVi: "Báo rằng hành lý của bạn chưa đến.",
      canDo: "I can report missing baggage and ask where the baggage counter is.",
      canDoVi: "Tôi có thể báo mất hành lý và hỏi quầy hành lý ở đâu.",
      vocabulary: [
        v(`${u1}-l4-v1`, "荷物", "baggage", "hành lý", { reading: "にもつ", romanization: "nimotsu", speechText: "にもつ" }),
        v(`${u1}-l4-v2`, "ない", "there isn't / missing", "không có / bị mất", { reading: "ない", romanization: "nai", speechText: "ない" }),
        v(`${u1}-l4-v3`, "届く", "to arrive", "đến / được giao tới", { reading: "とどく", romanization: "todoku", speechText: "とどく" }),
        v(`${u1}-l4-v4`, "カウンター", "counter", "quầy", { reading: "カウンター", romanization: "kauntaa", speechText: "カウンター" }),
      ],
      phrase: kp(`${u1}-l4-p1`, "荷物がありません。", "My baggage is missing.", "Hành lý của tôi bị mất.", { speechText: "にもつがありません" }),
      dialogue: [
        dl(`${u1}-l4-d1`, "Guest", "荷物がありません。", "My baggage is missing.", "Hành lý của tôi bị mất.", "にもつがありません"),
        dl(`${u1}-l4-d2`, "Staff", "カウンターにご案内します。", "I will guide you to the counter.", "Tôi sẽ hướng dẫn bạn đến quầy.", "カウンターにごあんないします"),
      ],
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Taxi & Train", titleVi: "Tắc xi & tàu điện",
      description: "Tell a taxi driver your destination and ask about the fare.",
      descriptionVi: "Nói điểm đến với lái xe tắc xi và hỏi về giá cước.",
      canDo: "I can tell a driver my destination and ask how much it costs.",
      canDoVi: "Tôi có thể nói điểm đến với lái xe và hỏi giá bao nhiêu.",
      vocabulary: [
        v(`${u2}-l1-v1`, "タクシー", "taxi", "tắc xi", { reading: "タクシー", romanization: "takushii", speechText: "タクシー" }),
        v(`${u2}-l1-v2`, "電車", "train", "tàu điện", { reading: "でんしゃ", romanization: "densha", speechText: "でんしゃ" }),
        v(`${u2}-l1-v3`, "駅まで", "to the station", "đến nhà ga", { reading: "えきまで", romanization: "eki made", speechText: "えきまで" }),
        v(`${u2}-l1-v4`, "料金", "fare", "giá cước", { reading: "りょうきん", romanization: "ryoukin", speechText: "りょうきん" }),
      ],
      phrase: kp(`${u2}-l1-p1`, "駅までお願いします。", "To the station, please.", "Cho tôi đến nhà ga.", { speechText: "えきまでおねがいします" }),
      dialogue: [
        dl(`${u2}-l1-d1`, "Guest", "駅までお願いします。", "To the station, please.", "Cho tôi đến nhà ga.", "えきまでおねがいします"),
        dl(`${u2}-l1-d2`, "Driver", "料金は千円です。", "The fare is 1,000 yen.", "Giá cước là 1.000 yên.", "りょうきんはせんえんです"),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Buying Tickets", titleVi: "Mua vé",
      description: "Ask for a one-way or round-trip ticket at the counter.",
      descriptionVi: "Yêu cầu vé một chiều hoặc hai chiều tại quầy.",
      canDo: "I can buy the number and type of ticket I need.",
      canDoVi: "Tôi có thể mua đúng số lượng và loại vé mình cần.",
      vocabulary: [
        v(`${u2}-l2-v1`, "切符", "ticket", "vé", { reading: "きっぷ", romanization: "kippu", speechText: "きっぷ" }),
        v(`${u2}-l2-v2`, "片道", "one-way", "một chiều", { reading: "かたみち", romanization: "katamichi", speechText: "かたみち" }),
        v(`${u2}-l2-v3`, "往復", "round-trip", "hai chiều", { reading: "おうふく", romanization: "oufuku", speechText: "おうふく" }),
        v(`${u2}-l2-v4`, "窓口", "ticket counter", "quầy bán vé", { reading: "まどぐち", romanization: "madoguchi", speechText: "まどぐち" }),
      ],
      phrase: kp(`${u2}-l2-p1`, "切符を二枚お願いします。", "Two tickets, please.", "Cho tôi hai vé.", { speechText: "きっぷをにまいおねがいします" }),
      dialogue: [
        dl(`${u2}-l2-d1`, "Guest", "切符を二枚お願いします。片道です。", "Two tickets, please. One-way.", "Cho tôi hai vé. Một chiều.", "きっぷをにまいおねがいします。かたみちです"),
        dl(`${u2}-l2-d2`, "Staff", "窓口はあちらです。", "The ticket counter is over there.", "Quầy bán vé ở đằng kia.", "まどぐちはあちらです"),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Tourist Map", titleVi: "Bản đồ du lịch",
      description: "Ask for a tourist map and mention you want to go sightseeing.",
      descriptionVi: "Xin bản đồ du lịch và nói bạn muốn đi tham quan.",
      canDo: "I can ask for a map and say I want to visit a famous place.",
      canDoVi: "Tôi có thể xin bản đồ và nói tôi muốn đến một nơi nổi tiếng.",
      vocabulary: [
        v(`${u2}-l3-v1`, "地図", "map", "bản đồ", { reading: "ちず", romanization: "chizu", speechText: "ちず" }),
        v(`${u2}-l3-v2`, "観光", "sightseeing", "tham quan / du lịch", { reading: "かんこう", romanization: "kankou", speechText: "かんこう" }),
        v(`${u2}-l3-v3`, "有名", "famous", "nổi tiếng", { reading: "ゆうめい", romanization: "yuumei", speechText: "ゆうめい" }),
        v(`${u2}-l3-v4`, "写真", "photo", "ảnh / hình", { reading: "しゃしん", romanization: "shashin", speechText: "しゃしん" }),
      ],
      phrase: kp(`${u2}-l3-p1`, "地図をもらえますか。", "Could I get a map?", "Tôi có thể xin bản đồ không?", { speechText: "ちずをもらえますか" }),
      dialogue: [
        dl(`${u2}-l3-d1`, "Guest", "地図をもらえますか。観光したいです。", "Could I get a map? I want to go sightseeing.", "Tôi có thể xin bản đồ không? Tôi muốn đi tham quan.", "ちずをもらえますか。かんこうしたいです"),
        dl(`${u2}-l3-d2`, "Staff", "はい、どうぞ。これは有名な場所です。", "Here you go. This is a famous place.", "Đây bạn. Đây là nơi nổi tiếng.", "はい、どうぞ。これはゆうめいなばしょです"),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Emergency Help", titleVi: "Trợ giúp khẩn cấp",
      description: "Ask for help in an emergency and describe being hurt.",
      descriptionVi: "Xin giúp đỡ trong tình huống khẩn cấp và nói bạn bị thương.",
      canDo: "I can call for help during a travel emergency and say I am injured.",
      canDoVi: "Tôi có thể gọi giúp đỡ khi gặp tình huống khẩn cấp và nói tôi bị thương.",
      vocabulary: [
        v(`${u2}-l4-v1`, "けが", "injury", "vết thương / bị thương", { reading: "けが", romanization: "kega", speechText: "けが" }),
        v(`${u2}-l4-v2`, "病院", "hospital", "bệnh viện", { reading: "びょういん", romanization: "byouin", speechText: "びょういん" }),
        v(`${u2}-l4-v3`, "電話", "phone", "điện thoại", { reading: "でんわ", romanization: "denwa", speechText: "でんわ" }),
        v(`${u2}-l4-v4`, "緊急", "emergency", "khẩn cấp", { reading: "きんきゅう", romanization: "kinkyuu", speechText: "きんきゅう" }),
      ],
      phrase: kp(`${u2}-l4-p1`, "けがをしました。助けてください。", "I am injured. Please help me.", "Tôi bị thương. Xin hãy giúp tôi.", { speechText: "けがをしました。たすけてください" }),
      dialogue: [
        dl(`${u2}-l4-d1`, "A", "けがをしました。助けてください。", "I am injured. Please help me.", "Tôi bị thương. Xin hãy giúp tôi.", "けがをしました。たすけてください"),
        dl(`${u2}-l4-d2`, "B", "緊急ですね。病院に電話します。", "This is an emergency. I will call the hospital.", "Đây là trường hợp khẩn cấp. Tôi sẽ gọi bệnh viện.", "きんきゅうですね。びょういんにでんわします"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "ja",
    nicheId,
    title: "Japanese · Travel & Hotel",
    titleVi: "Tiếng Nhật · Du lịch & khách sạn",
    description: "Airport, hotel check-in, transport, and travel emergencies.",
    descriptionVi: "Sân bay, nhận phòng khách sạn, di chuyển và tình huống khẩn cấp khi du lịch.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "Airport & Hotel", titleVi: "Sân bay & khách sạn", levelCode: "A1_1", goal: "Check in, find your way, and report missing baggage.", goalVi: "Nhận phòng, tìm đường và báo mất hành lý.", lessons: u1Lessons },
      { id: u2, title: "Getting Around", titleVi: "Di chuyển & tình huống khẩn cấp", levelCode: "A1_2", goal: "Take taxis and trains, buy tickets, and ask for help.", goalVi: "Đi tắc xi, tàu điện, mua vé và nhờ giúp đỡ.", lessons: u2Lessons },
    ],
  });
}

// ── Japanese · Restaurant & Food Service ────────────────────────────

function jaRestaurant() {
  const nicheId = "restaurant_food_service";
  const u1 = "ja-restaurant_food_service-u1";
  const u2 = "ja-restaurant_food_service-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Asking for a Reservation", titleVi: "Yêu cầu đặt bàn",
      description: "Ask to reserve a table for a certain number of people and time.",
      descriptionVi: "Xin đặt bàn cho một số người và giờ nhất định.",
      canDo: "I can ask to make a restaurant reservation for a number of people.",
      canDoVi: "Tôi có thể xin đặt bàn nhà hàng cho một số người nhất định.",
      vocabulary: [
        v(`${u1}-l1-v1`, "予約", "reservation", "đặt bàn / đặt chỗ", { reading: "よやく", romanization: "yoyaku", speechText: "よやく" }),
        v(`${u1}-l1-v2`, "二名", "two people", "hai người", { reading: "にめい", romanization: "nimei", speechText: "にめい" }),
        v(`${u1}-l1-v3`, "時間", "time", "thời gian / giờ", { reading: "じかん", romanization: "jikan", speechText: "じかん" }),
        v(`${u1}-l1-v4`, "席", "seat / table", "chỗ ngồi / bàn", { reading: "せき", romanization: "seki", speechText: "せき" }),
      ],
      phrase: kp(`${u1}-l1-p1`, "予約をお願いします。", "I would like to make a reservation.", "Tôi muốn đặt bàn.", { speechText: "よやくをおねがいします" }),
      dialogue: [
        dl(`${u1}-l1-d1`, "Guest", "予約をお願いします。二名です。", "I would like to make a reservation. Two people.", "Tôi muốn đặt bàn. Hai người.", "よやくをおねがいします。にめいです"),
        dl(`${u1}-l1-d2`, "Staff", "何時がよろしいですか。", "What time would be good?", "Mấy giờ thì tiện cho bạn?", "なんじがよろしいですか"),
      ],
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Ordering これをお願いします", titleVi: "Gọi món これをお願いします",
      description: "Point at the menu and order using これをお願いします.",
      descriptionVi: "Chỉ vào thực đơn và gọi món bằng これをお願いします.",
      canDo: "I can order a dish by pointing and saying これをお願いします.",
      canDoVi: "Tôi có thể gọi món bằng cách chỉ tay và nói これをお願いします.",
      vocabulary: [
        v(`${u1}-l2-v1`, "これ", "this", "cái này", { reading: "これ", romanization: "kore", speechText: "これ" }),
        v(`${u1}-l2-v2`, "お願いします", "please", "xin làm ơn / cho tôi", { reading: "おねがいします", romanization: "onegaishimasu", speechText: "おねがいします" }),
        v(`${u1}-l2-v3`, "メニュー", "menu", "thực đơn", { reading: "メニュー", romanization: "menyuu", speechText: "メニュー" }),
        v(`${u1}-l2-v4`, "注文", "order", "gọi món / đơn hàng", { reading: "ちゅうもん", romanization: "chuumon", speechText: "ちゅうもん" }),
      ],
      phrase: kp(`${u1}-l2-p1`, "これをお願いします。", "This, please.", "Cho tôi cái này.", { speechText: "これをおねがいします" }),
      dialogue: [
        dl(`${u1}-l2-d1`, "Staff", "ご注文はお決まりですか。", "Have you decided on your order?", "Bạn đã quyết định gọi món chưa?", "ごちゅうもんはおきまりですか"),
        dl(`${u1}-l2-d2`, "Guest", "これをお願いします。", "This, please.", "Cho tôi cái này.", "これをおねがいします"),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Peanut Allergy", titleVi: "Dị ứng đậu phộng",
      description: "Tell staff about a peanut allergy and ask if a dish is safe.",
      descriptionVi: "Báo với nhân viên về dị ứng đậu phộng và hỏi món có an toàn không.",
      canDo: "I can say I have a peanut allergy and ask if a dish is safe for me.",
      canDoVi: "Tôi có thể nói tôi bị dị ứng đậu phộng và hỏi món ăn có an toàn không.",
      vocabulary: [
        v(`${u1}-l3-v1`, "アレルギー", "allergy", "dị ứng", { reading: "アレルギー", romanization: "arerugii", speechText: "アレルギー" }),
        v(`${u1}-l3-v2`, "ピーナッツ", "peanut", "đậu phộng", { reading: "ピーナッツ", romanization: "piinattsu", speechText: "ピーナッツ" }),
        v(`${u1}-l3-v3`, "入っています", "it contains", "có chứa", { reading: "はいっています", romanization: "haitteimasu", speechText: "はいっています" }),
        v(`${u1}-l3-v4`, "大丈夫", "okay / safe", "ổn / an toàn", { reading: "だいじょうぶ", romanization: "daijoubu", speechText: "だいじょうぶ" }),
      ],
      phrase: kp(`${u1}-l3-p1`, "ピーナッツのアレルギーがあります。", "I have a peanut allergy.", "Tôi bị dị ứng đậu phộng.", { speechText: "ピーナッツのアレルギーがあります" }),
      dialogue: [
        dl(`${u1}-l3-d1`, "Guest", "ピーナッツのアレルギーがあります。大丈夫ですか。", "I have a peanut allergy. Is this okay?", "Tôi bị dị ứng đậu phộng. Món này có ổn không?", "ピーナッツのアレルギーがあります。だいじょうぶですか"),
        dl(`${u1}-l3-d2`, "Staff", "ピーナッツは入っていません。大丈夫です。", "There are no peanuts in it. It is safe.", "Không có đậu phộng. Món này an toàn.", "ピーナッツははいっていません。だいじょうぶです"),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "ja", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Asking for the Bill お会計", titleVi: "Xin thanh toán お会計",
      description: "Ask for the bill and choose how to pay.",
      descriptionVi: "Xin thanh toán và chọn cách trả tiền.",
      canDo: "I can ask for the bill and say whether I want to pay by card or cash.",
      canDoVi: "Tôi có thể xin thanh toán và nói muốn trả bằng thẻ hay tiền mặt.",
      vocabulary: [
        v(`${u1}-l4-v1`, "お会計", "the bill", "hóa đơn / tính tiền", { reading: "おかいけい", romanization: "okaikei", speechText: "おかいけい" }),
        v(`${u1}-l4-v2`, "カード", "card", "thẻ", { reading: "カード", romanization: "kaado", speechText: "カード" }),
        v(`${u1}-l4-v3`, "現金", "cash", "tiền mặt", { reading: "げんきん", romanization: "genkin", speechText: "げんきん" }),
        v(`${u1}-l4-v4`, "別々", "separately", "riêng / tách ra", { reading: "べつべつ", romanization: "betsubetsu", speechText: "べつべつ" }),
      ],
      phrase: kp(`${u1}-l4-p1`, "お会計をお願いします。", "The bill, please.", "Cho tôi thanh toán.", { speechText: "おかいけいをおねがいします" }),
      dialogue: [
        dl(`${u1}-l4-d1`, "Guest", "お会計をお願いします。カードでお願いします。", "The bill, please. By card, please.", "Cho tôi thanh toán. Trả bằng thẻ.", "おかいけいをおねがいします。カードでおねがいします"),
        dl(`${u1}-l4-d2`, "Staff", "かしこまりました。", "Certainly.", "Vâng, được rồi.", "かしこまりました"),
      ],
      cultureNote: "Tipping is not expected in Japanese restaurants — the bill shown is the full amount to pay.",
      cultureNoteVi: "Ở Nhật không cần cho tiền tip tại nhà hàng — số tiền trên hóa đơn là số tiền cần trả đủ.",
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Welcoming Guests いらっしゃいませ", titleVi: "Đón khách いらっしゃいませ",
      description: "Greet arriving guests and ask how many people are in their group.",
      descriptionVi: "Chào khách khi đến và hỏi nhóm khách có bao nhiêu người.",
      canDo: "I can welcome a guest and ask how many people are in their party.",
      canDoVi: "Tôi có thể chào khách và hỏi nhóm khách có bao nhiêu người.",
      vocabulary: [
        v(`${u2}-l1-v1`, "いらっしゃいませ", "welcome", "xin chào mừng (dùng ở quán/tiệm)", { reading: "いらっしゃいませ", romanization: "irasshaimase", speechText: "いらっしゃいませ" }),
        v(`${u2}-l1-v2`, "何名様", "how many people", "bao nhiêu người (lịch sự)", { reading: "なんめいさま", romanization: "nanmeisama", speechText: "なんめいさま" }),
        v(`${u2}-l1-v3`, "こちら", "this way", "hướng này / phía này", { reading: "こちら", romanization: "kochira", speechText: "こちら" }),
        v(`${u2}-l1-v4`, "どうぞ", "please / go ahead", "xin mời", { reading: "どうぞ", romanization: "douzo", speechText: "どうぞ" }),
      ],
      phrase: kp(`${u2}-l1-p1`, "いらっしゃいませ。何名様ですか。", "Welcome! How many people?", "Xin chào mừng! Có bao nhiêu người ạ?", { speechText: "いらっしゃいませ。なんめいさまですか" }),
      dialogue: [
        dl(`${u2}-l1-d1`, "Staff", "いらっしゃいませ。何名様ですか。", "Welcome! How many people?", "Xin chào mừng! Có bao nhiêu người ạ?", "いらっしゃいませ。なんめいさまですか"),
        dl(`${u2}-l1-d2`, "Guest", "二人です。", "Two people.", "Hai người.", "ふたりです"),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Recommending a Dish", titleVi: "Gợi ý món ăn",
      description: "Recommend today's special and mention that it is popular.",
      descriptionVi: "Gợi ý món đặc biệt hôm nay và nói rằng nó được ưa chuộng.",
      canDo: "I can recommend a dish and explain that it is popular today.",
      canDoVi: "Tôi có thể gợi ý một món ăn và nói rằng nó đang được ưa chuộng.",
      vocabulary: [
        v(`${u2}-l2-v1`, "おすすめ", "recommendation", "gợi ý / món khuyên dùng", { reading: "おすすめ", romanization: "osusume", speechText: "おすすめ" }),
        v(`${u2}-l2-v2`, "人気", "popular", "được ưa chuộng", { reading: "にんき", romanization: "ninki", speechText: "にんき" }),
        v(`${u2}-l2-v3`, "本日", "today", "hôm nay", { reading: "ほんじつ", romanization: "honjitsu", speechText: "ほんじつ" }),
        v(`${u2}-l2-v4`, "特別", "special", "đặc biệt", { reading: "とくべつ", romanization: "tokubetsu", speechText: "とくべつ" }),
      ],
      phrase: kp(`${u2}-l2-p1`, "本日のおすすめです。", "This is today's special.", "Đây là món đặc biệt hôm nay.", { speechText: "ほんじつのおすすめです" }),
      dialogue: [
        dl(`${u2}-l2-d1`, "Guest", "おすすめは何ですか。", "What do you recommend?", "Bạn gợi ý món gì?", "おすすめはなんですか"),
        dl(`${u2}-l2-d2`, "Staff", "本日のおすすめです。人気ですよ。", "This is today's special. It is popular.", "Đây là món đặc biệt hôm nay. Rất được ưa chuộng.", "ほんじつのおすすめです。にんきですよ"),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Apologizing 申し訳ございません", titleVi: "Xin lỗi 申し訳ございません",
      description: "Apologize formally for a mistake and offer to fix it right away.",
      descriptionVi: "Xin lỗi trang trọng vì sai sót và đề nghị sửa ngay.",
      canDo: "I can apologize formally and promise to fix a mistake right away.",
      canDoVi: "Tôi có thể xin lỗi trang trọng và hứa sửa lỗi ngay.",
      vocabulary: [
        v(`${u2}-l3-v1`, "申し訳ございません", "I am very sorry (formal)", "tôi rất xin lỗi (trang trọng)", { reading: "もうしわけございません", romanization: "moushiwake gozaimasen", speechText: "もうしわけございません" }),
        v(`${u2}-l3-v2`, "すぐに", "right away", "ngay lập tức", { reading: "すぐに", romanization: "sugu ni", speechText: "すぐに" }),
        v(`${u2}-l3-v3`, "交換", "exchange / replace", "đổi / thay", { reading: "こうかん", romanization: "koukan", speechText: "こうかん" }),
        v(`${u2}-l3-v4`, "失礼しました", "excuse the mistake", "xin lỗi vì sơ suất", { reading: "しつれいしました", romanization: "shitsurei shimashita", speechText: "しつれいしました" }),
      ],
      phrase: kp(`${u2}-l3-p1`, "申し訳ございません。すぐに交換します。", "I am very sorry. I will replace it right away.", "Tôi rất xin lỗi. Tôi sẽ đổi ngay.", { speechText: "もうしわけございません。すぐにこうかんします" }),
      dialogue: [
        dl(`${u2}-l3-d1`, "Guest", "これは注文と違います。", "This is different from my order.", "Món này khác với tôi gọi.", "これはちゅうもんとちがいます"),
        dl(`${u2}-l3-d2`, "Staff", "申し訳ございません。すぐに交換します。", "I am very sorry. I will replace it right away.", "Tôi rất xin lỗi. Tôi sẽ đổi ngay.", "もうしわけございません。すぐにこうかんします"),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "ja", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Takeout 持ち帰り", titleVi: "Mang về 持ち帰り",
      description: "Confirm whether an order is for takeout and give a wait time.",
      descriptionVi: "Xác nhận đơn hàng có mang về không và cho biết thời gian chờ.",
      canDo: "I can confirm a takeout order and tell the guest how long to wait.",
      canDoVi: "Tôi có thể xác nhận đơn mang về và nói khách cần chờ bao lâu.",
      vocabulary: [
        v(`${u2}-l4-v1`, "持ち帰り", "takeout", "mang về", { reading: "もちかえり", romanization: "mochikaeri", speechText: "もちかえり" }),
        v(`${u2}-l4-v2`, "お待たせしました", "sorry for the wait", "xin lỗi vì để bạn chờ", { reading: "おまたせしました", romanization: "omataseshimashita", speechText: "おまたせしました" }),
        v(`${u2}-l4-v3`, "包む", "to wrap", "gói / bọc lại", { reading: "つつむ", romanization: "tsutsumu", speechText: "つつむ" }),
        v(`${u2}-l4-v4`, "袋", "bag", "túi", { reading: "ふくろ", romanization: "fukuro", speechText: "ふくろ" }),
      ],
      phrase: kp(`${u2}-l4-p1`, "持ち帰りでよろしいですか。", "Would you like that to take out?", "Bạn muốn mang về phải không?", { speechText: "もちかえりでよろしいですか" }),
      dialogue: [
        dl(`${u2}-l4-d1`, "Staff", "持ち帰りでよろしいですか。", "Would you like that to take out?", "Bạn muốn mang về phải không?", "もちかえりでよろしいですか"),
        dl(`${u2}-l4-d2`, "Guest", "はい、お願いします。", "Yes, please.", "Vâng, làm ơn.", "はい、おねがいします"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "ja",
    nicheId,
    title: "Japanese · Restaurant & Food Service",
    titleVi: "Tiếng Nhật · Nhà hàng & phục vụ ẩm thực",
    description: "Ordering, allergies, and payment as a guest; greeting and service as staff.",
    descriptionVi: "Gọi món, dị ứng và thanh toán khi là khách; chào đón và phục vụ khi là nhân viên.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "As a Customer", titleVi: "Khi là khách hàng", levelCode: "A1_1", goal: "Reserve, order, mention allergies, and pay the bill.", goalVi: "Đặt bàn, gọi món, báo dị ứng và thanh toán.", lessons: u1Lessons },
      { id: u2, title: "As Restaurant Staff", titleVi: "Khi là nhân viên nhà hàng", levelCode: "A1_2", goal: "Welcome guests, recommend dishes, apologize, and handle takeout.", goalVi: "Chào đón khách, gợi ý món, xin lỗi và xử lý đơn mang về.", lessons: u2Lessons },
    ],
  });
}

// ── English · Daily Life ────────────────────────────────────────────

function enDailyLife() {
  const nicheId = "daily_life";
  const u1 = "en-daily_life-u1";
  const u2 = "en-daily_life-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "My Name Is...", titleVi: "Tôi tên là...",
      description: "Introduce yourself with your name and greet someone new.",
      descriptionVi: "Tự giới thiệu tên của bạn và chào một người mới.",
      canDo: "I can say my name and respond politely when meeting someone.",
      canDoVi: "Tôi có thể nói tên của mình và đáp lại lịch sự khi gặp ai đó.",
      vocabulary: [
        v(`${u1}-l1-v1`, "My name is", "my name is", "tên tôi là"),
        v(`${u1}-l1-v2`, "nice to meet you", "nice to meet you", "rất vui được gặp bạn"),
        v(`${u1}-l1-v3`, "hello", "hello", "xin chào"),
        v(`${u1}-l1-v4`, "goodbye", "goodbye", "tạm biệt"),
      ],
      phrase: kp(`${u1}-l1-p1`, "My name is Anna. Nice to meet you.", "My name is Anna. Nice to meet you.", "Tôi tên là Anna. Rất vui được gặp bạn."),
      dialogue: [
        dl(`${u1}-l1-d1`, "A", "Hello! What is your name?", "Hello! What is your name?", "Xin chào! Bạn tên là gì?"),
        dl(`${u1}-l1-d2`, "B", "My name is Anna. Nice to meet you.", "My name is Anna. Nice to meet you.", "Tôi tên là Anna. Rất vui được gặp bạn."),
      ],
      grammarFocus: "\"My name is ___\" uses the verb \"to be\" (is) to state a fact about yourself.",
      grammarFocusVi: "\"My name is ___\" dùng động từ \"to be\" (is) để nói một sự thật về bản thân.",
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "This Is My Family", titleVi: "Đây là gia đình tôi",
      description: "Introduce members of your family.",
      descriptionVi: "Giới thiệu các thành viên trong gia đình bạn.",
      canDo: "I can introduce a family member and say how many siblings I have.",
      canDoVi: "Tôi có thể giới thiệu một người trong gia đình và nói mình có bao nhiêu anh chị em.",
      vocabulary: [
        v(`${u1}-l2-v1`, "This is my family", "this is my family", "đây là gia đình tôi"),
        v(`${u1}-l2-v2`, "brother", "brother", "anh / em trai"),
        v(`${u1}-l2-v3`, "sister", "sister", "chị / em gái"),
        v(`${u1}-l2-v4`, "parents", "parents", "bố mẹ"),
      ],
      phrase: kp(`${u1}-l2-p1`, "This is my family. I have one brother.", "This is my family. I have one brother.", "Đây là gia đình tôi. Tôi có một anh trai."),
      dialogue: [
        dl(`${u1}-l2-d1`, "A", "Do you have brothers or sisters?", "Do you have brothers or sisters?", "Bạn có anh chị em không?"),
        dl(`${u1}-l2-d2`, "B", "This is my family. I have one brother.", "This is my family. I have one brother.", "Đây là gia đình tôi. Tôi có một anh trai."),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Live In...", titleVi: "Tôi sống ở...",
      description: "Say where you live and describe it briefly.",
      descriptionVi: "Nói bạn sống ở đâu và mô tả ngắn gọn.",
      canDo: "I can say where I live and describe my home briefly.",
      canDoVi: "Tôi có thể nói nơi mình sống và mô tả ngắn gọn về nơi đó.",
      vocabulary: [
        v(`${u1}-l3-v1`, "I live in", "I live in", "tôi sống ở"),
        v(`${u1}-l3-v2`, "city", "city", "thành phố"),
        v(`${u1}-l3-v3`, "house", "house", "nhà"),
        v(`${u1}-l3-v4`, "room", "room", "phòng"),
      ],
      phrase: kp(`${u1}-l3-p1`, "I live in Hanoi. It is a big city.", "I live in Hanoi. It is a big city.", "Tôi sống ở Hà Nội. Đó là một thành phố lớn."),
      dialogue: [
        dl(`${u1}-l3-d1`, "A", "Where do you live?", "Where do you live?", "Bạn sống ở đâu?"),
        dl(`${u1}-l3-d2`, "B", "I live in Hanoi. It is a big city.", "I live in Hanoi. It is a big city.", "Tôi sống ở Hà Nội. Đó là một thành phố lớn."),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Need...", titleVi: "Tôi cần...",
      description: "Politely say what you need.",
      descriptionVi: "Nói điều bạn cần một cách lịch sự.",
      canDo: "I can politely say what I need using \"please\".",
      canDoVi: "Tôi có thể lịch sự nói điều mình cần bằng cách dùng \"please\".",
      vocabulary: [
        v(`${u1}-l4-v1`, "I need", "I need", "tôi cần"),
        v(`${u1}-l4-v2`, "help", "help", "sự giúp đỡ"),
        v(`${u1}-l4-v3`, "water", "water", "nước"),
        v(`${u1}-l4-v4`, "please", "please", "làm ơn"),
      ],
      phrase: kp(`${u1}-l4-p1`, "I need help, please.", "I need help, please.", "Tôi cần giúp đỡ, làm ơn."),
      dialogue: [
        dl(`${u1}-l4-d1`, "A", "I need help, please.", "I need help, please.", "Tôi cần giúp đỡ, làm ơn."),
        dl(`${u1}-l4-d2`, "B", "Sure, what do you need?", "Sure, what do you need?", "Được, bạn cần gì?"),
      ],
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Where Is...?", titleVi: "... ở đâu?",
      description: "Ask where a place is and understand a direction.",
      descriptionVi: "Hỏi một nơi ở đâu và hiểu chỉ đường.",
      canDo: "I can ask where a place is and understand left/right directions.",
      canDoVi: "Tôi có thể hỏi một nơi ở đâu và hiểu chỉ đường trái/phải.",
      vocabulary: [
        v(`${u2}-l1-v1`, "Where is", "where is", "... ở đâu"),
        v(`${u2}-l1-v2`, "station", "station", "nhà ga / bến xe"),
        v(`${u2}-l1-v3`, "left", "left", "bên trái"),
        v(`${u2}-l1-v4`, "right", "right", "bên phải"),
      ],
      phrase: kp(`${u2}-l1-p1`, "Where is the station? Turn left.", "Where is the station? Turn left.", "Nhà ga ở đâu? Rẽ trái."),
      dialogue: [
        dl(`${u2}-l1-d1`, "A", "Where is the station?", "Where is the station?", "Nhà ga ở đâu?"),
        dl(`${u2}-l1-d2`, "B", "Turn left. It is close.", "Turn left. It is close.", "Rẽ trái. Nó gần đây."),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "How Much Is This?", titleVi: "Cái này bao nhiêu tiền?",
      description: "Ask the price of something and comment on it.",
      descriptionVi: "Hỏi giá một món đồ và nhận xét về nó.",
      canDo: "I can ask the price of an item and say if it is cheap or expensive.",
      canDoVi: "Tôi có thể hỏi giá một món đồ và nói nó rẻ hay đắt.",
      vocabulary: [
        v(`${u2}-l2-v1`, "How much is this", "how much is this", "cái này bao nhiêu tiền"),
        v(`${u2}-l2-v2`, "price", "price", "giá"),
        v(`${u2}-l2-v3`, "cheap", "cheap", "rẻ"),
        v(`${u2}-l2-v4`, "expensive", "expensive", "đắt"),
      ],
      phrase: kp(`${u2}-l2-p1`, "How much is this? It looks expensive.", "How much is this? It looks expensive.", "Cái này bao nhiêu tiền? Nó trông có vẻ đắt."),
      dialogue: [
        dl(`${u2}-l2-d1`, "A", "How much is this? It looks expensive.", "How much is this? It looks expensive.", "Cái này bao nhiêu tiền? Nó trông có vẻ đắt."),
        dl(`${u2}-l2-d2`, "B", "It is ten dollars. It is cheap!", "It is ten dollars. It is cheap!", "Nó là mười đô la. Rẻ đó!"),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "I Have a Fever", titleVi: "Tôi bị sốt",
      description: "Describe a symptom and ask about medicine.",
      descriptionVi: "Mô tả triệu chứng và hỏi về thuốc.",
      canDo: "I can describe a simple symptom and ask for medicine.",
      canDoVi: "Tôi có thể mô tả một triệu chứng đơn giản và hỏi về thuốc.",
      vocabulary: [
        v(`${u2}-l3-v1`, "I have a fever", "I have a fever", "tôi bị sốt"),
        v(`${u2}-l3-v2`, "sick", "sick", "bị bệnh / mệt"),
        v(`${u2}-l3-v3`, "medicine", "medicine", "thuốc"),
        v(`${u2}-l3-v4`, "doctor", "doctor", "bác sĩ"),
      ],
      phrase: kp(`${u2}-l3-p1`, "I have a fever. I feel sick.", "I have a fever. I feel sick.", "Tôi bị sốt. Tôi cảm thấy mệt."),
      dialogue: [
        dl(`${u2}-l3-d1`, "A", "I have a fever. I feel sick.", "I have a fever. I feel sick.", "Tôi bị sốt. Tôi cảm thấy mệt."),
        dl(`${u2}-l3-d2`, "B", "You should see a doctor.", "You should see a doctor.", "Bạn nên đi khám bác sĩ."),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Can You Help Me?", titleVi: "Bạn có thể giúp tôi không?",
      description: "Ask for help when you are lost or in trouble.",
      descriptionVi: "Xin giúp đỡ khi bạn bị lạc hoặc gặp rắc rối.",
      canDo: "I can ask for help and say that I am lost.",
      canDoVi: "Tôi có thể xin giúp đỡ và nói rằng tôi bị lạc.",
      vocabulary: [
        v(`${u2}-l4-v1`, "Can you help me", "can you help me", "bạn có thể giúp tôi không"),
        v(`${u2}-l4-v2`, "lost", "lost", "bị lạc"),
        v(`${u2}-l4-v3`, "police", "police", "cảnh sát"),
        v(`${u2}-l4-v4`, "emergency", "emergency", "khẩn cấp"),
      ],
      phrase: kp(`${u2}-l4-p1`, "Can you help me? I am lost.", "Can you help me? I am lost.", "Bạn có thể giúp tôi không? Tôi bị lạc."),
      dialogue: [
        dl(`${u2}-l4-d1`, "A", "Can you help me? I am lost.", "Can you help me? I am lost.", "Bạn có thể giúp tôi không? Tôi bị lạc."),
        dl(`${u2}-l4-d2`, "B", "Of course. Where are you going?", "Of course. Where are you going?", "Tất nhiên. Bạn đang đi đâu?"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "en",
    nicheId,
    title: "English · Daily Life",
    titleVi: "Tiếng Anh · Đời sống hàng ngày",
    description: "Introductions, home, shopping, health, and asking for help.",
    descriptionVi: "Giới thiệu bản thân, nhà cửa, mua sắm, sức khỏe và nhờ giúp đỡ.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "Introductions & Home", titleVi: "Giới thiệu & nhà cửa", levelCode: "A1_1", goal: "Introduce yourself, your family, your home, and your needs.", goalVi: "Giới thiệu bản thân, gia đình, nhà cửa và nhu cầu của bạn.", lessons: u1Lessons },
      { id: u2, title: "Around Town & Health", titleVi: "Trong thành phố & sức khỏe", levelCode: "A1_2", goal: "Ask directions and prices, and talk about health and help.", goalVi: "Hỏi đường, hỏi giá và nói về sức khỏe, nhờ giúp đỡ.", lessons: u2Lessons },
    ],
  });
}

// ── English · Travel & Hotel ────────────────────────────────────────

function enTravel() {
  const nicheId = "travel_hotel";
  const u1 = "en-travel_hotel-u1";
  const u2 = "en-travel_hotel-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Have a Reservation", titleVi: "Tôi có đặt phòng",
      description: "Check in with a hotel using your reservation.",
      descriptionVi: "Nhận phòng khách sạn bằng đặt phòng của bạn.",
      canDo: "I can state that I have a hotel reservation under my name.",
      canDoVi: "Tôi có thể nói rằng tôi đã đặt phòng dưới tên của mình.",
      vocabulary: [
        v(`${u1}-l1-v1`, "I have a reservation", "I have a reservation", "tôi có đặt phòng"),
        v(`${u1}-l1-v2`, "name", "name", "tên"),
        v(`${u1}-l1-v3`, "room", "room", "phòng"),
        v(`${u1}-l1-v4`, "night", "night", "đêm"),
      ],
      phrase: kp(`${u1}-l1-p1`, "I have a reservation under my name.", "I have a reservation under my name.", "Tôi có đặt phòng dưới tên của tôi."),
      dialogue: [
        dl(`${u1}-l1-d1`, "Guest", "I have a reservation under my name.", "I have a reservation under my name.", "Tôi có đặt phòng dưới tên của tôi."),
        dl(`${u1}-l1-d2`, "Staff", "May I have your name, please?", "May I have your name, please?", "Cho tôi xin tên của bạn được không?"),
      ],
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Would Like to Check In", titleVi: "Tôi muốn nhận phòng",
      description: "Ask to check in and hand over your passport.",
      descriptionVi: "Xin nhận phòng và đưa hộ chiếu.",
      canDo: "I can ask to check in and hand over the required document.",
      canDoVi: "Tôi có thể xin nhận phòng và đưa giấy tờ cần thiết.",
      vocabulary: [
        v(`${u1}-l2-v1`, "I would like to check in", "I would like to check in", "tôi muốn nhận phòng"),
        v(`${u1}-l2-v2`, "key", "key", "chìa khóa"),
        v(`${u1}-l2-v3`, "passport", "passport", "hộ chiếu"),
        v(`${u1}-l2-v4`, "signature", "signature", "chữ ký"),
      ],
      phrase: kp(`${u1}-l2-p1`, "I would like to check in. Here is my passport.", "I would like to check in. Here is my passport.", "Tôi muốn nhận phòng. Đây là hộ chiếu của tôi."),
      dialogue: [
        dl(`${u1}-l2-d1`, "Guest", "I would like to check in. Here is my passport.", "I would like to check in. Here is my passport.", "Tôi muốn nhận phòng. Đây là hộ chiếu của tôi."),
        dl(`${u1}-l2-d2`, "Staff", "Thank you. Here is your key.", "Thank you. Here is your key.", "Cảm ơn. Đây là chìa khóa của bạn."),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Where Is the Gate?", titleVi: "Cổng ở đâu?",
      description: "Ask where your boarding gate is at the airport.",
      descriptionVi: "Hỏi cổng lên máy bay ở đâu tại sân bay.",
      canDo: "I can ask where my gate is and understand boarding information.",
      canDoVi: "Tôi có thể hỏi cổng của mình ở đâu và hiểu thông tin lên máy bay.",
      vocabulary: [
        v(`${u1}-l3-v1`, "Where is the gate", "where is the gate", "cổng ở đâu"),
        v(`${u1}-l3-v2`, "gate", "gate", "cổng"),
        v(`${u1}-l3-v3`, "boarding", "boarding", "lên máy bay"),
        v(`${u1}-l3-v4`, "information", "information", "thông tin"),
      ],
      phrase: kp(`${u1}-l3-p1`, "Where is the gate? My flight is boarding soon.", "Where is the gate? My flight is boarding soon.", "Cổng ở đâu? Chuyến bay của tôi sắp lên máy bay."),
      dialogue: [
        dl(`${u1}-l3-d1`, "A", "Where is the gate? My flight is boarding soon.", "Where is the gate? My flight is boarding soon.", "Cổng ở đâu? Chuyến bay của tôi sắp lên máy bay."),
        dl(`${u1}-l3-d2`, "B", "Ask at the information counter.", "Ask at the information counter.", "Hãy hỏi tại quầy thông tin."),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "My Baggage Is Missing", titleVi: "Hành lý của tôi bị mất",
      description: "Report missing baggage and find the counter.",
      descriptionVi: "Báo mất hành lý và tìm quầy hỗ trợ.",
      canDo: "I can report missing baggage and ask where the counter is.",
      canDoVi: "Tôi có thể báo mất hành lý và hỏi quầy hỗ trợ ở đâu.",
      vocabulary: [
        v(`${u1}-l4-v1`, "My baggage is missing", "my baggage is missing", "hành lý của tôi bị mất"),
        v(`${u1}-l4-v2`, "baggage", "baggage", "hành lý"),
        v(`${u1}-l4-v3`, "counter", "counter", "quầy"),
        v(`${u1}-l4-v4`, "claim", "claim (baggage claim)", "khu nhận hành lý"),
      ],
      phrase: kp(`${u1}-l4-p1`, "My baggage is missing. Where is the baggage counter?", "My baggage is missing. Where is the baggage counter?", "Hành lý của tôi bị mất. Quầy hành lý ở đâu?"),
      dialogue: [
        dl(`${u1}-l4-d1`, "A", "My baggage is missing. Where is the baggage counter?", "My baggage is missing. Where is the baggage counter?", "Hành lý của tôi bị mất. Quầy hành lý ở đâu?"),
        dl(`${u1}-l4-d2`, "B", "It is next to the claim area.", "It is next to the claim area.", "Nó ở cạnh khu nhận hành lý."),
      ],
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "To the Station, Please", titleVi: "Cho tôi đến nhà ga",
      description: "Tell a taxi driver your destination and ask the fare.",
      descriptionVi: "Nói điểm đến với lái xe tắc xi và hỏi giá cước.",
      canDo: "I can tell a driver my destination and ask how much it will cost.",
      canDoVi: "Tôi có thể nói điểm đến với lái xe và hỏi giá bao nhiêu.",
      vocabulary: [
        v(`${u2}-l1-v1`, "To the station, please", "to the station, please", "cho tôi đến nhà ga"),
        v(`${u2}-l1-v2`, "taxi", "taxi", "tắc xi"),
        v(`${u2}-l1-v3`, "train", "train", "tàu điện"),
        v(`${u2}-l1-v4`, "fare", "fare", "giá cước"),
      ],
      phrase: kp(`${u2}-l1-p1`, "To the station, please. How much is the fare?", "To the station, please. How much is the fare?", "Cho tôi đến nhà ga. Giá cước bao nhiêu?"),
      dialogue: [
        dl(`${u2}-l1-d1`, "Guest", "To the station, please. How much is the fare?", "To the station, please. How much is the fare?", "Cho tôi đến nhà ga. Giá cước bao nhiêu?"),
        dl(`${u2}-l1-d2`, "Driver", "About ten dollars.", "About ten dollars.", "Khoảng mười đô la."),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Two Tickets, Please", titleVi: "Cho tôi hai vé",
      description: "Buy a one-way or round-trip ticket.",
      descriptionVi: "Mua vé một chiều hoặc hai chiều.",
      canDo: "I can buy the ticket type I need and specify the quantity.",
      canDoVi: "Tôi có thể mua đúng loại vé cần và nói số lượng.",
      vocabulary: [
        v(`${u2}-l2-v1`, "Two tickets, please", "two tickets, please", "cho tôi hai vé"),
        v(`${u2}-l2-v2`, "ticket", "ticket", "vé"),
        v(`${u2}-l2-v3`, "one-way", "one-way", "một chiều"),
        v(`${u2}-l2-v4`, "round-trip", "round-trip", "hai chiều"),
      ],
      phrase: kp(`${u2}-l2-p1`, "Two tickets, please. One-way, not round-trip.", "Two tickets, please. One-way, not round-trip.", "Cho tôi hai vé. Một chiều, không phải hai chiều."),
      dialogue: [
        dl(`${u2}-l2-d1`, "Guest", "Two tickets, please. One-way, not round-trip.", "Two tickets, please. One-way, not round-trip.", "Cho tôi hai vé. Một chiều, không phải hai chiều."),
        dl(`${u2}-l2-d2`, "Staff", "Sure, that will be twenty dollars.", "Sure, that will be twenty dollars.", "Được, tổng cộng hai mươi đô la."),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Could I Get a Map?", titleVi: "Tôi có thể xin bản đồ không?",
      description: "Ask for a tourist map and mention sightseeing plans.",
      descriptionVi: "Xin bản đồ du lịch và nói kế hoạch tham quan.",
      canDo: "I can ask for a map and say I want to go sightseeing.",
      canDoVi: "Tôi có thể xin bản đồ và nói tôi muốn đi tham quan.",
      vocabulary: [
        v(`${u2}-l3-v1`, "Could I get a map", "could I get a map", "tôi có thể xin bản đồ không"),
        v(`${u2}-l3-v2`, "map", "map", "bản đồ"),
        v(`${u2}-l3-v3`, "sightseeing", "sightseeing", "tham quan"),
        v(`${u2}-l3-v4`, "famous", "famous", "nổi tiếng"),
      ],
      phrase: kp(`${u2}-l3-p1`, "Could I get a map? I want to go sightseeing.", "Could I get a map? I want to go sightseeing.", "Tôi có thể xin bản đồ không? Tôi muốn đi tham quan."),
      dialogue: [
        dl(`${u2}-l3-d1`, "A", "Could I get a map? I want to go sightseeing.", "Could I get a map? I want to go sightseeing.", "Tôi có thể xin bản đồ không? Tôi muốn đi tham quan."),
        dl(`${u2}-l3-d2`, "B", "Here you go. This place is famous.", "Here you go. This place is famous.", "Đây bạn. Nơi này rất nổi tiếng."),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Please Help Me, I Am Hurt", titleVi: "Xin hãy giúp tôi, tôi bị thương",
      description: "Ask for emergency help while traveling.",
      descriptionVi: "Xin giúp đỡ khẩn cấp khi đang du lịch.",
      canDo: "I can ask for help during a travel emergency and say I am hurt.",
      canDoVi: "Tôi có thể xin giúp đỡ khi gặp tình huống khẩn cấp và nói tôi bị thương.",
      vocabulary: [
        v(`${u2}-l4-v1`, "Please help me, I am hurt", "please help me, I am hurt", "xin hãy giúp tôi, tôi bị thương"),
        v(`${u2}-l4-v2`, "hospital", "hospital", "bệnh viện"),
        v(`${u2}-l4-v3`, "emergency", "emergency", "khẩn cấp"),
        v(`${u2}-l4-v4`, "phone", "phone", "điện thoại"),
      ],
      phrase: kp(`${u2}-l4-p1`, "Please help me, I am hurt. Call the hospital.", "Please help me, I am hurt. Call the hospital.", "Xin hãy giúp tôi, tôi bị thương. Gọi bệnh viện."),
      dialogue: [
        dl(`${u2}-l4-d1`, "A", "Please help me, I am hurt. Call the hospital.", "Please help me, I am hurt. Call the hospital.", "Xin hãy giúp tôi, tôi bị thương. Gọi bệnh viện."),
        dl(`${u2}-l4-d2`, "B", "This is an emergency. I am calling now.", "This is an emergency. I am calling now.", "Đây là trường hợp khẩn cấp. Tôi đang gọi ngay."),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "en",
    nicheId,
    title: "English · Travel & Hotel",
    titleVi: "Tiếng Anh · Du lịch & khách sạn",
    description: "Airport, hotel check-in, transport, and travel emergencies.",
    descriptionVi: "Sân bay, nhận phòng khách sạn, di chuyển và tình huống khẩn cấp khi du lịch.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "Airport & Hotel", titleVi: "Sân bay & khách sạn", levelCode: "A1_1", goal: "Check in, find your way, and report missing baggage.", goalVi: "Nhận phòng, tìm đường và báo mất hành lý.", lessons: u1Lessons },
      { id: u2, title: "Getting Around", titleVi: "Di chuyển & tình huống khẩn cấp", levelCode: "A1_2", goal: "Take taxis and trains, buy tickets, and ask for help.", goalVi: "Đi tắc xi, tàu điện, mua vé và nhờ giúp đỡ.", lessons: u2Lessons },
    ],
  });
}

// ── English · Restaurant & Food Service ─────────────────────────────

function enRestaurant() {
  const nicheId = "restaurant_food_service";
  const u1 = "en-restaurant_food_service-u1";
  const u2 = "en-restaurant_food_service-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Would Like to Make a Reservation", titleVi: "Tôi muốn đặt bàn",
      description: "Reserve a table for a number of people.",
      descriptionVi: "Đặt bàn cho một số người nhất định.",
      canDo: "I can make a restaurant reservation for a number of people.",
      canDoVi: "Tôi có thể đặt bàn nhà hàng cho một số người nhất định.",
      vocabulary: [
        v(`${u1}-l1-v1`, "I would like to make a reservation", "I would like to make a reservation", "tôi muốn đặt bàn"),
        v(`${u1}-l1-v2`, "table", "table", "bàn"),
        v(`${u1}-l1-v3`, "people", "people", "người"),
        v(`${u1}-l1-v4`, "time", "time", "giờ / thời gian"),
      ],
      phrase: kp(`${u1}-l1-p1`, "I would like to make a reservation for two people.", "I would like to make a reservation for two people.", "Tôi muốn đặt bàn cho hai người."),
      dialogue: [
        dl(`${u1}-l1-d1`, "Guest", "I would like to make a reservation for two people.", "I would like to make a reservation for two people.", "Tôi muốn đặt bàn cho hai người."),
        dl(`${u1}-l1-d2`, "Staff", "What time would you like?", "What time would you like?", "Bạn muốn đặt lúc mấy giờ?"),
      ],
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Would Like This, Please", titleVi: "Cho tôi món này",
      description: "Order a dish by pointing at the menu.",
      descriptionVi: "Gọi món bằng cách chỉ vào thực đơn.",
      canDo: "I can order a dish by pointing at it and request a drink.",
      canDoVi: "Tôi có thể gọi món bằng cách chỉ tay và yêu cầu thêm đồ uống.",
      vocabulary: [
        v(`${u1}-l2-v1`, "I would like this, please", "I would like this, please", "cho tôi món này"),
        v(`${u1}-l2-v2`, "menu", "menu", "thực đơn"),
        v(`${u1}-l2-v3`, "order", "order", "gọi món"),
        v(`${u1}-l2-v4`, "water", "water", "nước"),
      ],
      phrase: kp(`${u1}-l2-p1`, "I would like this, please. Can I also get water?", "I would like this, please. Can I also get water?", "Cho tôi món này. Cho tôi thêm nước được không?"),
      dialogue: [
        dl(`${u1}-l2-d1`, "Staff", "Are you ready to order?", "Are you ready to order?", "Bạn đã sẵn sàng gọi món chưa?"),
        dl(`${u1}-l2-d2`, "Guest", "I would like this, please. Can I also get water?", "I would like this, please. Can I also get water?", "Cho tôi món này. Cho tôi thêm nước được không?"),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "I Am Allergic to Peanuts", titleVi: "Tôi bị dị ứng đậu phộng",
      description: "Tell staff about a peanut allergy and ask if a dish is safe.",
      descriptionVi: "Báo với nhân viên về dị ứng đậu phộng và hỏi món có an toàn không.",
      canDo: "I can say I have a peanut allergy and ask if a dish is safe.",
      canDoVi: "Tôi có thể nói tôi bị dị ứng đậu phộng và hỏi món ăn có an toàn không.",
      vocabulary: [
        v(`${u1}-l3-v1`, "I am allergic to peanuts", "I am allergic to peanuts", "tôi bị dị ứng đậu phộng"),
        v(`${u1}-l3-v2`, "allergic", "allergic", "bị dị ứng"),
        v(`${u1}-l3-v3`, "peanuts", "peanuts", "đậu phộng"),
        v(`${u1}-l3-v4`, "safe", "safe", "an toàn"),
      ],
      phrase: kp(`${u1}-l3-p1`, "I am allergic to peanuts. Is this dish safe?", "I am allergic to peanuts. Is this dish safe?", "Tôi bị dị ứng đậu phộng. Món này có an toàn không?"),
      dialogue: [
        dl(`${u1}-l3-d1`, "Guest", "I am allergic to peanuts. Is this dish safe?", "I am allergic to peanuts. Is this dish safe?", "Tôi bị dị ứng đậu phộng. Món này có an toàn không?"),
        dl(`${u1}-l3-d2`, "Staff", "Yes, there are no peanuts in it.", "Yes, there are no peanuts in it.", "Vâng, món này không có đậu phộng."),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "en", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "The Bill, Please", titleVi: "Cho tôi thanh toán",
      description: "Ask for the bill and choose how to pay.",
      descriptionVi: "Xin thanh toán và chọn cách trả tiền.",
      canDo: "I can ask for the bill and say if I want to pay separately.",
      canDoVi: "Tôi có thể xin thanh toán và nói muốn trả riêng.",
      vocabulary: [
        v(`${u1}-l4-v1`, "The bill, please", "the bill, please", "cho tôi thanh toán"),
        v(`${u1}-l4-v2`, "card", "card", "thẻ"),
        v(`${u1}-l4-v3`, "cash", "cash", "tiền mặt"),
        v(`${u1}-l4-v4`, "separate", "separate", "riêng / tách ra"),
      ],
      phrase: kp(`${u1}-l4-p1`, "The bill, please. Can we pay separately?", "The bill, please. Can we pay separately?", "Cho tôi thanh toán. Chúng tôi có thể trả riêng không?"),
      dialogue: [
        dl(`${u1}-l4-d1`, "Guest", "The bill, please. Can we pay separately?", "The bill, please. Can we pay separately?", "Cho tôi thanh toán. Chúng tôi có thể trả riêng không?"),
        dl(`${u1}-l4-d2`, "Staff", "Of course, no problem.", "Of course, no problem.", "Tất nhiên, không sao cả."),
      ],
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Welcome! How Many People?", titleVi: "Xin chào mừng! Có bao nhiêu người?",
      description: "Greet arriving guests and ask the size of their group.",
      descriptionVi: "Chào khách khi đến và hỏi số người trong nhóm.",
      canDo: "I can welcome a guest and ask how many people are in their group.",
      canDoVi: "Tôi có thể chào khách và hỏi nhóm khách có bao nhiêu người.",
      vocabulary: [
        v(`${u2}-l1-v1`, "Welcome! How many people", "welcome! how many people", "xin chào mừng! có bao nhiêu người"),
        v(`${u2}-l1-v2`, "table", "table", "bàn"),
        v(`${u2}-l1-v3`, "this way", "this way", "hướng này"),
        v(`${u2}-l1-v4`, "please sit", "please sit", "xin mời ngồi"),
      ],
      phrase: kp(`${u2}-l1-p1`, "Welcome! How many people? This way, please.", "Welcome! How many people? This way, please.", "Xin chào mừng! Có bao nhiêu người? Xin đi theo hướng này."),
      dialogue: [
        dl(`${u2}-l1-d1`, "Staff", "Welcome! How many people? This way, please.", "Welcome! How many people? This way, please.", "Xin chào mừng! Có bao nhiêu người? Xin đi theo hướng này."),
        dl(`${u2}-l1-d2`, "Guest", "Two people, please.", "Two people, please.", "Hai người, làm ơn."),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "I Recommend This Dish", titleVi: "Tôi gợi ý món này",
      description: "Recommend a popular dish to a guest.",
      descriptionVi: "Gợi ý một món được ưa chuộng cho khách.",
      canDo: "I can recommend a dish and explain that it is popular.",
      canDoVi: "Tôi có thể gợi ý một món ăn và nói rằng nó đang được ưa chuộng.",
      vocabulary: [
        v(`${u2}-l2-v1`, "I recommend this dish", "I recommend this dish", "tôi gợi ý món này"),
        v(`${u2}-l2-v2`, "popular", "popular", "được ưa chuộng"),
        v(`${u2}-l2-v3`, "special", "special", "đặc biệt"),
        v(`${u2}-l2-v4`, "today", "today", "hôm nay"),
      ],
      phrase: kp(`${u2}-l2-p1`, "I recommend this dish. It is very popular today.", "I recommend this dish. It is very popular today.", "Tôi gợi ý món này. Hôm nay nó rất được ưa chuộng."),
      dialogue: [
        dl(`${u2}-l2-d1`, "Guest", "What do you recommend?", "What do you recommend?", "Bạn gợi ý món gì?"),
        dl(`${u2}-l2-d2`, "Staff", "I recommend this dish. It is very popular today.", "I recommend this dish. It is very popular today.", "Tôi gợi ý món này. Hôm nay nó rất được ưa chuộng."),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "I Am Very Sorry", titleVi: "Tôi rất xin lỗi",
      description: "Apologize for a mistake and offer to fix it right away.",
      descriptionVi: "Xin lỗi vì sai sót và đề nghị sửa ngay.",
      canDo: "I can apologize for a mistake and say I will fix it right away.",
      canDoVi: "Tôi có thể xin lỗi vì sai sót và nói sẽ sửa ngay.",
      vocabulary: [
        v(`${u2}-l3-v1`, "I am very sorry", "I am very sorry", "tôi rất xin lỗi"),
        v(`${u2}-l3-v2`, "mistake", "mistake", "sai sót"),
        v(`${u2}-l3-v3`, "replace", "replace", "đổi / thay"),
        v(`${u2}-l3-v4`, "right away", "right away", "ngay lập tức"),
      ],
      phrase: kp(`${u2}-l3-p1`, "I am very sorry. I will replace it right away.", "I am very sorry. I will replace it right away.", "Tôi rất xin lỗi. Tôi sẽ đổi nó ngay."),
      dialogue: [
        dl(`${u2}-l3-d1`, "Guest", "This is not what I ordered.", "This is not what I ordered.", "Đây không phải món tôi gọi."),
        dl(`${u2}-l3-d2`, "Staff", "I am very sorry. I will replace it right away.", "I am very sorry. I will replace it right away.", "Tôi rất xin lỗi. Tôi sẽ đổi nó ngay."),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "en", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Is This for Takeout?", titleVi: "Đây là mang về phải không?",
      description: "Confirm a takeout order and give a wait time.",
      descriptionVi: "Xác nhận đơn mang về và cho biết thời gian chờ.",
      canDo: "I can confirm a takeout order and tell the guest the wait time.",
      canDoVi: "Tôi có thể xác nhận đơn mang về và nói thời gian chờ.",
      vocabulary: [
        v(`${u2}-l4-v1`, "Is this for takeout", "is this for takeout", "đây là mang về phải không"),
        v(`${u2}-l4-v2`, "takeout", "takeout", "mang về"),
        v(`${u2}-l4-v3`, "ready", "ready", "sẵn sàng / xong"),
        v(`${u2}-l4-v4`, "minutes", "minutes", "phút"),
      ],
      phrase: kp(`${u2}-l4-p1`, "Is this for takeout? It will be ready in ten minutes.", "Is this for takeout? It will be ready in ten minutes.", "Đây là mang về phải không? Sẽ xong trong mười phút."),
      dialogue: [
        dl(`${u2}-l4-d1`, "Staff", "Is this for takeout?", "Is this for takeout?", "Đây là mang về phải không?"),
        dl(`${u2}-l4-d2`, "Guest", "Yes. How long will it take?", "Yes. How long will it take?", "Vâng. Sẽ mất bao lâu?"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "en",
    nicheId,
    title: "English · Restaurant & Food Service",
    titleVi: "Tiếng Anh · Nhà hàng & phục vụ ẩm thực",
    description: "Ordering, allergies, and payment as a guest; greeting and service as staff.",
    descriptionVi: "Gọi món, dị ứng và thanh toán khi là khách; chào đón và phục vụ khi là nhân viên.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "As a Customer", titleVi: "Khi là khách hàng", levelCode: "A1_1", goal: "Reserve, order, mention allergies, and pay the bill.", goalVi: "Đặt bàn, gọi món, báo dị ứng và thanh toán.", lessons: u1Lessons },
      { id: u2, title: "As Restaurant Staff", titleVi: "Khi là nhân viên nhà hàng", levelCode: "A1_2", goal: "Welcome guests, recommend dishes, apologize, and handle takeout.", goalVi: "Chào đón khách, gợi ý món, xin lỗi và xử lý đơn mang về.", lessons: u2Lessons },
    ],
  });
}

// ── Spanish · Daily Life ─────────────────────────────────────────────

function esDailyLife() {
  const nicheId = "daily_life";
  const u1 = "es-daily_life-u1";
  const u2 = "es-daily_life-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Hola, me llamo...", titleVi: "Xin chào, tôi tên là...",
      description: "Introduce yourself with your name and greet someone new.",
      descriptionVi: "Tự giới thiệu tên của bạn và chào một người mới.",
      canDo: "I can say my name in Spanish and respond politely when meeting someone.",
      canDoVi: "Tôi có thể nói tên của mình bằng tiếng Tây Ban Nha và đáp lại lịch sự khi gặp ai đó.",
      vocabulary: [
        v(`${u1}-l1-v1`, "Hola, me llamo", "hello, my name is", "xin chào, tôi tên là"),
        v(`${u1}-l1-v2`, "mucho gusto", "nice to meet you", "rất vui được gặp"),
        v(`${u1}-l1-v3`, "adiós", "goodbye", "tạm biệt"),
        v(`${u1}-l1-v4`, "buenos días", "good morning", "chào buổi sáng"),
      ],
      phrase: kp(`${u1}-l1-p1`, "Hola, me llamo Ana. Mucho gusto.", "Hello, my name is Ana. Nice to meet you.", "Xin chào, tôi tên là Ana. Rất vui được gặp bạn."),
      dialogue: [
        dl(`${u1}-l1-d1`, "A", "¡Hola! ¿Cómo te llamas?", "Hello! What is your name?", "Xin chào! Bạn tên là gì?"),
        dl(`${u1}-l1-d2`, "B", "Hola, me llamo Ana. Mucho gusto.", "Hello, my name is Ana. Nice to meet you.", "Xin chào, tôi tên là Ana. Rất vui được gặp bạn."),
      ],
      grammarFocus: "\"Me llamo ___\" literally means \"I call myself ___\" and is the natural way to say your name.",
      grammarFocusVi: "\"Me llamo ___\" nghĩa đen là \"tôi tự gọi mình là ___\", là cách tự nhiên để nói tên bạn.",
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Esta es mi familia", titleVi: "Đây là gia đình tôi",
      description: "Introduce members of your family.",
      descriptionVi: "Giới thiệu các thành viên trong gia đình bạn.",
      canDo: "I can introduce a family member and say how many siblings I have.",
      canDoVi: "Tôi có thể giới thiệu một người trong gia đình và nói mình có bao nhiêu anh chị em.",
      vocabulary: [
        v(`${u1}-l2-v1`, "Esta es mi familia", "this is my family", "đây là gia đình tôi"),
        v(`${u1}-l2-v2`, "hermano", "brother", "anh / em trai"),
        v(`${u1}-l2-v3`, "hermana", "sister", "chị / em gái"),
        v(`${u1}-l2-v4`, "padres", "parents", "bố mẹ"),
      ],
      phrase: kp(`${u1}-l2-p1`, "Esta es mi familia. Tengo un hermano.", "This is my family. I have one brother.", "Đây là gia đình tôi. Tôi có một anh trai."),
      dialogue: [
        dl(`${u1}-l2-d1`, "A", "¿Tienes hermanos?", "Do you have siblings?", "Bạn có anh chị em không?"),
        dl(`${u1}-l2-d2`, "B", "Esta es mi familia. Tengo un hermano.", "This is my family. I have one brother.", "Đây là gia đình tôi. Tôi có một anh trai."),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Vivo en...", titleVi: "Tôi sống ở...",
      description: "Say where you live and describe it briefly.",
      descriptionVi: "Nói bạn sống ở đâu và mô tả ngắn gọn.",
      canDo: "I can say where I live and describe my home briefly.",
      canDoVi: "Tôi có thể nói nơi mình sống và mô tả ngắn gọn về nơi đó.",
      vocabulary: [
        v(`${u1}-l3-v1`, "Vivo en", "I live in", "tôi sống ở"),
        v(`${u1}-l3-v2`, "ciudad", "city", "thành phố"),
        v(`${u1}-l3-v3`, "casa", "house", "nhà"),
        v(`${u1}-l3-v4`, "habitación", "room", "phòng"),
      ],
      phrase: kp(`${u1}-l3-p1`, "Vivo en Madrid. Es una ciudad grande.", "I live in Madrid. It is a big city.", "Tôi sống ở Madrid. Đó là một thành phố lớn."),
      dialogue: [
        dl(`${u1}-l3-d1`, "A", "¿Dónde vives?", "Where do you live?", "Bạn sống ở đâu?"),
        dl(`${u1}-l3-d2`, "B", "Vivo en Madrid. Es una ciudad grande.", "I live in Madrid. It is a big city.", "Tôi sống ở Madrid. Đó là một thành phố lớn."),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Necesito...", titleVi: "Tôi cần...",
      description: "Politely say what you need.",
      descriptionVi: "Nói điều bạn cần một cách lịch sự.",
      canDo: "I can politely say what I need using \"por favor\".",
      canDoVi: "Tôi có thể lịch sự nói điều mình cần bằng cách dùng \"por favor\".",
      vocabulary: [
        v(`${u1}-l4-v1`, "Necesito", "I need", "tôi cần"),
        v(`${u1}-l4-v2`, "ayuda", "help", "sự giúp đỡ"),
        v(`${u1}-l4-v3`, "agua", "water", "nước"),
        v(`${u1}-l4-v4`, "por favor", "please", "làm ơn"),
      ],
      phrase: kp(`${u1}-l4-p1`, "Necesito agua, por favor.", "I need water, please.", "Tôi cần nước, làm ơn."),
      dialogue: [
        dl(`${u1}-l4-d1`, "A", "Necesito agua, por favor.", "I need water, please.", "Tôi cần nước, làm ơn."),
        dl(`${u1}-l4-d2`, "B", "Claro, un momento.", "Of course, one moment.", "Được, chờ một chút."),
      ],
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "¿Dónde está...?", titleVi: "... ở đâu?",
      description: "Ask where a place is and understand a direction.",
      descriptionVi: "Hỏi một nơi ở đâu và hiểu chỉ đường.",
      canDo: "I can ask where a place is and understand left/right directions.",
      canDoVi: "Tôi có thể hỏi một nơi ở đâu và hiểu chỉ đường trái/phải.",
      vocabulary: [
        v(`${u2}-l1-v1`, "¿Dónde está", "where is", "... ở đâu"),
        v(`${u2}-l1-v2`, "estación", "station", "nhà ga"),
        v(`${u2}-l1-v3`, "izquierda", "left", "bên trái"),
        v(`${u2}-l1-v4`, "derecha", "right", "bên phải"),
      ],
      phrase: kp(`${u2}-l1-p1`, "¿Dónde está la estación? Gire a la izquierda.", "Where is the station? Turn left.", "Nhà ga ở đâu? Rẽ trái."),
      dialogue: [
        dl(`${u2}-l1-d1`, "A", "¿Dónde está la estación?", "Where is the station?", "Nhà ga ở đâu?"),
        dl(`${u2}-l1-d2`, "B", "Gire a la izquierda. Está cerca.", "Turn left. It is close.", "Rẽ trái. Nó gần đây."),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "¿Cuánto cuesta esto?", titleVi: "Cái này bao nhiêu tiền?",
      description: "Ask the price of something and comment on it.",
      descriptionVi: "Hỏi giá một món đồ và nhận xét về nó.",
      canDo: "I can ask the price of an item and say if it is cheap or expensive.",
      canDoVi: "Tôi có thể hỏi giá một món đồ và nói nó rẻ hay đắt.",
      vocabulary: [
        v(`${u2}-l2-v1`, "¿Cuánto cuesta esto", "how much does this cost", "cái này bao nhiêu tiền"),
        v(`${u2}-l2-v2`, "precio", "price", "giá"),
        v(`${u2}-l2-v3`, "barato", "cheap", "rẻ"),
        v(`${u2}-l2-v4`, "caro", "expensive", "đắt"),
      ],
      phrase: kp(`${u2}-l2-p1`, "¿Cuánto cuesta esto? Parece caro.", "How much does this cost? It looks expensive.", "Cái này bao nhiêu tiền? Nó trông có vẻ đắt."),
      dialogue: [
        dl(`${u2}-l2-d1`, "A", "¿Cuánto cuesta esto? Parece caro.", "How much does this cost? It looks expensive.", "Cái này bao nhiêu tiền? Nó trông có vẻ đắt."),
        dl(`${u2}-l2-d2`, "B", "Son diez euros. ¡Es barato!", "It is ten euros. It is cheap!", "Nó là mười euro. Rẻ đó!"),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Me duele...", titleVi: "Tôi bị đau...",
      description: "Describe a symptom and ask about medicine.",
      descriptionVi: "Mô tả triệu chứng và hỏi về thuốc.",
      canDo: "I can describe a simple symptom and ask for medicine.",
      canDoVi: "Tôi có thể mô tả một triệu chứng đơn giản và hỏi về thuốc.",
      vocabulary: [
        v(`${u2}-l3-v1`, "Me duele", "it hurts / I have pain", "tôi bị đau"),
        v(`${u2}-l3-v2`, "fiebre", "fever", "sốt"),
        v(`${u2}-l3-v3`, "medicina", "medicine", "thuốc"),
        v(`${u2}-l3-v4`, "médico", "doctor", "bác sĩ"),
      ],
      phrase: kp(`${u2}-l3-p1`, "Me duele la cabeza. Tengo fiebre.", "My head hurts. I have a fever.", "Tôi đau đầu. Tôi bị sốt."),
      dialogue: [
        dl(`${u2}-l3-d1`, "A", "Me duele la cabeza. Tengo fiebre.", "My head hurts. I have a fever.", "Tôi đau đầu. Tôi bị sốt."),
        dl(`${u2}-l3-d2`, "B", "Necesitas ver a un médico.", "You need to see a doctor.", "Bạn nên đi khám bác sĩ."),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "¿Puede ayudarme?", titleVi: "Bạn có thể giúp tôi không?",
      description: "Ask for help when you are lost or in trouble.",
      descriptionVi: "Xin giúp đỡ khi bạn bị lạc hoặc gặp rắc rối.",
      canDo: "I can ask for help and say that I am lost.",
      canDoVi: "Tôi có thể xin giúp đỡ và nói rằng tôi bị lạc.",
      vocabulary: [
        v(`${u2}-l4-v1`, "¿Puede ayudarme", "can you help me", "bạn có thể giúp tôi không"),
        v(`${u2}-l4-v2`, "perdido", "lost", "bị lạc"),
        v(`${u2}-l4-v3`, "policía", "police", "cảnh sát"),
        v(`${u2}-l4-v4`, "emergencia", "emergency", "khẩn cấp"),
      ],
      phrase: kp(`${u2}-l4-p1`, "¿Puede ayudarme? Estoy perdido.", "Can you help me? I am lost.", "Bạn có thể giúp tôi không? Tôi bị lạc."),
      dialogue: [
        dl(`${u2}-l4-d1`, "A", "¿Puede ayudarme? Estoy perdido.", "Can you help me? I am lost.", "Bạn có thể giúp tôi không? Tôi bị lạc."),
        dl(`${u2}-l4-d2`, "B", "Claro. ¿A dónde va?", "Of course. Where are you going?", "Tất nhiên. Bạn đang đi đâu?"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "es",
    nicheId,
    title: "Spanish · Daily Life",
    titleVi: "Tiếng Tây Ban Nha · Đời sống hàng ngày",
    description: "Introductions, home, shopping, health, and asking for help.",
    descriptionVi: "Giới thiệu bản thân, nhà cửa, mua sắm, sức khỏe và nhờ giúp đỡ.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "Presentaciones y hogar", titleVi: "Giới thiệu & nhà cửa", levelCode: "A1_1", goal: "Introduce yourself, your family, your home, and your needs.", goalVi: "Giới thiệu bản thân, gia đình, nhà cửa và nhu cầu của bạn.", lessons: u1Lessons },
      { id: u2, title: "En la ciudad y la salud", titleVi: "Trong thành phố & sức khỏe", levelCode: "A1_2", goal: "Ask directions and prices, and talk about health and help.", goalVi: "Hỏi đường, hỏi giá và nói về sức khỏe, nhờ giúp đỡ.", lessons: u2Lessons },
    ],
  });
}

// ── Spanish · Travel & Hotel ────────────────────────────────────────

function esTravel() {
  const nicheId = "travel_hotel";
  const u1 = "es-travel_hotel-u1";
  const u2 = "es-travel_hotel-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Tengo una reserva", titleVi: "Tôi có đặt phòng",
      description: "Check in with a hotel using your reservation.",
      descriptionVi: "Nhận phòng khách sạn bằng đặt phòng của bạn.",
      canDo: "I can state that I have a hotel reservation under my name.",
      canDoVi: "Tôi có thể nói rằng tôi đã đặt phòng dưới tên của mình.",
      vocabulary: [
        v(`${u1}-l1-v1`, "Tengo una reserva", "I have a reservation", "tôi có đặt phòng"),
        v(`${u1}-l1-v2`, "nombre", "name", "tên"),
        v(`${u1}-l1-v3`, "habitación", "room", "phòng"),
        v(`${u1}-l1-v4`, "noche", "night", "đêm"),
      ],
      phrase: kp(`${u1}-l1-p1`, "Tengo una reserva a mi nombre.", "I have a reservation under my name.", "Tôi có đặt phòng dưới tên của tôi."),
      dialogue: [
        dl(`${u1}-l1-d1`, "Guest", "Tengo una reserva a mi nombre.", "I have a reservation under my name.", "Tôi có đặt phòng dưới tên của tôi."),
        dl(`${u1}-l1-d2`, "Staff", "¿Cuál es su nombre, por favor?", "What is your name, please?", "Cho tôi xin tên của bạn được không?"),
      ],
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Quiero hacer el check-in", titleVi: "Tôi muốn nhận phòng",
      description: "Ask to check in and hand over your passport.",
      descriptionVi: "Xin nhận phòng và đưa hộ chiếu.",
      canDo: "I can ask to check in and hand over the required document.",
      canDoVi: "Tôi có thể xin nhận phòng và đưa giấy tờ cần thiết.",
      vocabulary: [
        v(`${u1}-l2-v1`, "Quiero hacer el check-in", "I want to check in", "tôi muốn nhận phòng"),
        v(`${u1}-l2-v2`, "llave", "key", "chìa khóa"),
        v(`${u1}-l2-v3`, "pasaporte", "passport", "hộ chiếu"),
        v(`${u1}-l2-v4`, "firma", "signature", "chữ ký"),
      ],
      phrase: kp(`${u1}-l2-p1`, "Quiero hacer el check-in. Aquí está mi pasaporte.", "I want to check in. Here is my passport.", "Tôi muốn nhận phòng. Đây là hộ chiếu của tôi."),
      dialogue: [
        dl(`${u1}-l2-d1`, "Guest", "Quiero hacer el check-in. Aquí está mi pasaporte.", "I want to check in. Here is my passport.", "Tôi muốn nhận phòng. Đây là hộ chiếu của tôi."),
        dl(`${u1}-l2-d2`, "Staff", "Gracias. Aquí tiene su llave.", "Thank you. Here is your key.", "Cảm ơn. Đây là chìa khóa của bạn."),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "¿Dónde está la puerta doce?", titleVi: "Cổng mười hai ở đâu?",
      description: "Ask where your boarding gate is at the airport.",
      descriptionVi: "Hỏi cổng lên máy bay ở đâu tại sân bay.",
      canDo: "I can ask where my gate is and understand boarding information.",
      canDoVi: "Tôi có thể hỏi cổng của mình ở đâu và hiểu thông tin lên máy bay.",
      vocabulary: [
        v(`${u1}-l3-v1`, "¿Dónde está la puerta doce", "where is gate twelve", "cổng mười hai ở đâu"),
        v(`${u1}-l3-v2`, "puerta", "gate", "cổng"),
        v(`${u1}-l3-v3`, "embarque", "boarding", "lên máy bay"),
        v(`${u1}-l3-v4`, "información", "information", "thông tin"),
      ],
      phrase: kp(`${u1}-l3-p1`, "¿Dónde está la puerta doce? El embarque es pronto.", "Where is gate twelve? Boarding is soon.", "Cổng mười hai ở đâu? Sắp lên máy bay rồi."),
      dialogue: [
        dl(`${u1}-l3-d1`, "A", "¿Dónde está la puerta doce? El embarque es pronto.", "Where is gate twelve? Boarding is soon.", "Cổng mười hai ở đâu? Sắp lên máy bay rồi."),
        dl(`${u1}-l3-d2`, "B", "Pregunte en información.", "Ask at the information counter.", "Hãy hỏi tại quầy thông tin."),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Mi equipaje no aparece", titleVi: "Hành lý của tôi bị mất",
      description: "Report missing baggage and find the counter.",
      descriptionVi: "Báo mất hành lý và tìm quầy hỗ trợ.",
      canDo: "I can report missing baggage and ask where the counter is.",
      canDoVi: "Tôi có thể báo mất hành lý và hỏi quầy hỗ trợ ở đâu.",
      vocabulary: [
        v(`${u1}-l4-v1`, "Mi equipaje no aparece", "my baggage is missing", "hành lý của tôi bị mất"),
        v(`${u1}-l4-v2`, "equipaje", "baggage", "hành lý"),
        v(`${u1}-l4-v3`, "mostrador", "counter", "quầy"),
        v(`${u1}-l4-v4`, "reclamo", "claim (baggage claim)", "khu nhận hành lý"),
      ],
      phrase: kp(`${u1}-l4-p1`, "Mi equipaje no aparece. ¿Dónde está el mostrador?", "My baggage is missing. Where is the counter?", "Hành lý của tôi bị mất. Quầy ở đâu?"),
      dialogue: [
        dl(`${u1}-l4-d1`, "A", "Mi equipaje no aparece. ¿Dónde está el mostrador?", "My baggage is missing. Where is the counter?", "Hành lý của tôi bị mất. Quầy ở đâu?"),
        dl(`${u1}-l4-d2`, "B", "Está junto al reclamo de equipaje.", "It is next to the baggage claim.", "Nó ở cạnh khu nhận hành lý."),
      ],
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "A la estación, por favor", titleVi: "Cho tôi đến nhà ga",
      description: "Tell a taxi driver your destination and ask the fare.",
      descriptionVi: "Nói điểm đến với lái xe tắc xi và hỏi giá cước.",
      canDo: "I can tell a driver my destination and ask how much it will cost.",
      canDoVi: "Tôi có thể nói điểm đến với lái xe và hỏi giá bao nhiêu.",
      vocabulary: [
        v(`${u2}-l1-v1`, "A la estación, por favor", "to the station, please", "cho tôi đến nhà ga"),
        v(`${u2}-l1-v2`, "taxi", "taxi", "tắc xi"),
        v(`${u2}-l1-v3`, "tren", "train", "tàu điện"),
        v(`${u2}-l1-v4`, "tarifa", "fare", "giá cước"),
      ],
      phrase: kp(`${u2}-l1-p1`, "A la estación, por favor. ¿Cuál es la tarifa?", "To the station, please. What is the fare?", "Cho tôi đến nhà ga. Giá cước bao nhiêu?"),
      dialogue: [
        dl(`${u2}-l1-d1`, "Guest", "A la estación, por favor. ¿Cuál es la tarifa?", "To the station, please. What is the fare?", "Cho tôi đến nhà ga. Giá cước bao nhiêu?"),
        dl(`${u2}-l1-d2`, "Driver", "Son diez euros.", "It is ten euros.", "Khoảng mười euro."),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Dos billetes, por favor", titleVi: "Cho tôi hai vé",
      description: "Buy a one-way or round-trip ticket.",
      descriptionVi: "Mua vé một chiều hoặc hai chiều.",
      canDo: "I can buy the ticket type I need and specify the quantity.",
      canDoVi: "Tôi có thể mua đúng loại vé cần và nói số lượng.",
      vocabulary: [
        v(`${u2}-l2-v1`, "Dos billetes, por favor", "two tickets, please", "cho tôi hai vé"),
        v(`${u2}-l2-v2`, "billete", "ticket", "vé"),
        v(`${u2}-l2-v3`, "ida", "one-way", "một chiều"),
        v(`${u2}-l2-v4`, "ida y vuelta", "round-trip", "hai chiều"),
      ],
      phrase: kp(`${u2}-l2-p1`, "Dos billetes, por favor. De ida, no de ida y vuelta.", "Two tickets, please. One-way, not round-trip.", "Cho tôi hai vé. Một chiều, không phải hai chiều."),
      dialogue: [
        dl(`${u2}-l2-d1`, "Guest", "Dos billetes, por favor. De ida, no de ida y vuelta.", "Two tickets, please. One-way, not round-trip.", "Cho tôi hai vé. Một chiều, không phải hai chiều."),
        dl(`${u2}-l2-d2`, "Staff", "Claro, son veinte euros.", "Sure, that is twenty euros.", "Được, tổng cộng hai mươi euro."),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "¿Podría darme un mapa?", titleVi: "Tôi có thể xin bản đồ không?",
      description: "Ask for a tourist map and mention sightseeing plans.",
      descriptionVi: "Xin bản đồ du lịch và nói kế hoạch tham quan.",
      canDo: "I can ask for a map and say I want to go sightseeing.",
      canDoVi: "Tôi có thể xin bản đồ và nói tôi muốn đi tham quan.",
      vocabulary: [
        v(`${u2}-l3-v1`, "¿Podría darme un mapa", "could you give me a map", "tôi có thể xin bản đồ không"),
        v(`${u2}-l3-v2`, "mapa", "map", "bản đồ"),
        v(`${u2}-l3-v3`, "turismo", "sightseeing", "tham quan"),
        v(`${u2}-l3-v4`, "famoso", "famous", "nổi tiếng"),
      ],
      phrase: kp(`${u2}-l3-p1`, "¿Podría darme un mapa? Quiero hacer turismo.", "Could you give me a map? I want to go sightseeing.", "Tôi có thể xin bản đồ không? Tôi muốn đi tham quan."),
      dialogue: [
        dl(`${u2}-l3-d1`, "A", "¿Podría darme un mapa? Quiero hacer turismo.", "Could you give me a map? I want to go sightseeing.", "Tôi có thể xin bản đồ không? Tôi muốn đi tham quan."),
        dl(`${u2}-l3-d2`, "B", "Aquí tiene. Este lugar es famoso.", "Here you go. This place is famous.", "Đây bạn. Nơi này rất nổi tiếng."),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Ayúdeme, estoy herido", titleVi: "Xin hãy giúp tôi, tôi bị thương",
      description: "Ask for emergency help while traveling.",
      descriptionVi: "Xin giúp đỡ khẩn cấp khi đang du lịch.",
      canDo: "I can ask for help during a travel emergency and say I am hurt.",
      canDoVi: "Tôi có thể xin giúp đỡ khi gặp tình huống khẩn cấp và nói tôi bị thương.",
      vocabulary: [
        v(`${u2}-l4-v1`, "Ayúdeme, estoy herido", "help me, I am hurt", "xin hãy giúp tôi, tôi bị thương"),
        v(`${u2}-l4-v2`, "hospital", "hospital", "bệnh viện"),
        v(`${u2}-l4-v3`, "emergencia", "emergency", "khẩn cấp"),
        v(`${u2}-l4-v4`, "teléfono", "phone", "điện thoại"),
      ],
      phrase: kp(`${u2}-l4-p1`, "Ayúdeme, estoy herido. Llame al hospital.", "Help me, I am hurt. Call the hospital.", "Xin hãy giúp tôi, tôi bị thương. Gọi bệnh viện."),
      dialogue: [
        dl(`${u2}-l4-d1`, "A", "Ayúdeme, estoy herido. Llame al hospital.", "Help me, I am hurt. Call the hospital.", "Xin hãy giúp tôi, tôi bị thương. Gọi bệnh viện."),
        dl(`${u2}-l4-d2`, "B", "Es una emergencia. Estoy llamando ahora.", "This is an emergency. I am calling now.", "Đây là trường hợp khẩn cấp. Tôi đang gọi ngay."),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "es",
    nicheId,
    title: "Spanish · Travel & Hotel",
    titleVi: "Tiếng Tây Ban Nha · Du lịch & khách sạn",
    description: "Airport, hotel check-in, transport, and travel emergencies.",
    descriptionVi: "Sân bay, nhận phòng khách sạn, di chuyển và tình huống khẩn cấp khi du lịch.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "Aeropuerto y hotel", titleVi: "Sân bay & khách sạn", levelCode: "A1_1", goal: "Check in, find your way, and report missing baggage.", goalVi: "Nhận phòng, tìm đường và báo mất hành lý.", lessons: u1Lessons },
      { id: u2, title: "Cómo moverse", titleVi: "Di chuyển & tình huống khẩn cấp", levelCode: "A1_2", goal: "Take taxis and trains, buy tickets, and ask for help.", goalVi: "Đi tắc xi, tàu điện, mua vé và nhờ giúp đỡ.", lessons: u2Lessons },
    ],
  });
}

// ── Spanish · Restaurant & Food Service ─────────────────────────────

function esRestaurant() {
  const nicheId = "restaurant_food_service";
  const u1 = "es-restaurant_food_service-u1";
  const u2 = "es-restaurant_food_service-u2";
  let order = 0;
  const next = () => (order += 1);

  const u1Lessons = [
    topicLesson({
      id: `${u1}-l1`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Quisiera hacer una reserva", titleVi: "Tôi muốn đặt bàn",
      description: "Reserve a table for a number of people.",
      descriptionVi: "Đặt bàn cho một số người nhất định.",
      canDo: "I can make a restaurant reservation for a number of people.",
      canDoVi: "Tôi có thể đặt bàn nhà hàng cho một số người nhất định.",
      vocabulary: [
        v(`${u1}-l1-v1`, "Quisiera hacer una reserva", "I would like to make a reservation", "tôi muốn đặt bàn"),
        v(`${u1}-l1-v2`, "mesa", "table", "bàn"),
        v(`${u1}-l1-v3`, "personas", "people", "người"),
        v(`${u1}-l1-v4`, "hora", "time", "giờ"),
      ],
      phrase: kp(`${u1}-l1-p1`, "Quisiera hacer una reserva para dos personas.", "I would like to make a reservation for two people.", "Tôi muốn đặt bàn cho hai người."),
      dialogue: [
        dl(`${u1}-l1-d1`, "Guest", "Quisiera hacer una reserva para dos personas.", "I would like to make a reservation for two people.", "Tôi muốn đặt bàn cho hai người."),
        dl(`${u1}-l1-d2`, "Staff", "¿A qué hora, por favor?", "At what time, please?", "Vào giờ nào, làm ơn?"),
      ],
    }),
    topicLesson({
      id: `${u1}-l2`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Quisiera este plato", titleVi: "Cho tôi món này",
      description: "Order a dish by pointing at the menu.",
      descriptionVi: "Gọi món bằng cách chỉ vào thực đơn.",
      canDo: "I can order a dish by pointing at it and request a drink.",
      canDoVi: "Tôi có thể gọi món bằng cách chỉ tay và yêu cầu thêm đồ uống.",
      vocabulary: [
        v(`${u1}-l2-v1`, "Quisiera este plato", "I would like this dish", "cho tôi món này"),
        v(`${u1}-l2-v2`, "menú", "menu", "thực đơn"),
        v(`${u1}-l2-v3`, "pedido", "order", "đơn hàng / gọi món"),
        v(`${u1}-l2-v4`, "agua", "water", "nước"),
      ],
      phrase: kp(`${u1}-l2-p1`, "Quisiera este plato. ¿Me trae agua también?", "I would like this dish. Could you also bring water?", "Cho tôi món này. Cho tôi thêm nước được không?"),
      dialogue: [
        dl(`${u1}-l2-d1`, "Staff", "¿Ya sabe qué va a pedir?", "Do you know what you would like to order?", "Bạn đã biết muốn gọi món gì chưa?"),
        dl(`${u1}-l2-d2`, "Guest", "Quisiera este plato. ¿Me trae agua también?", "I would like this dish. Could you also bring water?", "Cho tôi món này. Cho tôi thêm nước được không?"),
      ],
    }),
    topicLesson({
      id: `${u1}-l3`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "Soy alérgico a los cacahuetes", titleVi: "Tôi bị dị ứng đậu phộng",
      description: "Tell staff about a peanut allergy and ask if a dish is safe.",
      descriptionVi: "Báo với nhân viên về dị ứng đậu phộng và hỏi món có an toàn không.",
      canDo: "I can say I have a peanut allergy and ask if a dish is safe.",
      canDoVi: "Tôi có thể nói tôi bị dị ứng đậu phộng và hỏi món ăn có an toàn không.",
      vocabulary: [
        v(`${u1}-l3-v1`, "Soy alérgico a los cacahuetes", "I am allergic to peanuts", "tôi bị dị ứng đậu phộng", {
          exampleSentence: "Soy alérgico a los cacahuetes. ¿Este plato es seguro?",
          exampleSentenceVi: "Tôi bị dị ứng đậu phộng. Món này có an toàn không?",
        }),
        v(`${u1}-l3-v2`, "alérgico", "allergic", "bị dị ứng"),
        v(`${u1}-l3-v3`, "cacahuetes", "peanuts", "đậu phộng"),
        v(`${u1}-l3-v4`, "seguro", "safe", "an toàn"),
      ],
      phrase: kp(`${u1}-l3-p1`, "Soy alérgico a los cacahuetes. ¿Este plato es seguro?", "I am allergic to peanuts. Is this dish safe?", "Tôi bị dị ứng đậu phộng. Món này có an toàn không?", {
        usageNote: "A woman would say \"Soy alérgica\" — the ending agrees with gender.",
        usageNoteVi: "Nếu là nữ thì nói \"Soy alérgica\" — đuôi từ thay đổi theo giới tính.",
      }),
      dialogue: [
        dl(`${u1}-l3-d1`, "Guest", "Soy alérgico a los cacahuetes. ¿Este plato es seguro?", "I am allergic to peanuts. Is this dish safe?", "Tôi bị dị ứng đậu phộng. Món này có an toàn không?"),
        dl(`${u1}-l3-d2`, "Staff", "Sí, no tiene cacahuetes.", "Yes, it does not have peanuts.", "Vâng, món này không có đậu phộng."),
      ],
    }),
    topicLesson({
      id: `${u1}-l4`, languageCode: "es", nicheId, unitId: u1, order: next(), level: "A1_1",
      title: "La cuenta, por favor", titleVi: "Cho tôi thanh toán",
      description: "Ask for the bill and choose how to pay.",
      descriptionVi: "Xin thanh toán và chọn cách trả tiền.",
      canDo: "I can ask for the bill and say if I want to pay separately.",
      canDoVi: "Tôi có thể xin thanh toán và nói muốn trả riêng.",
      vocabulary: [
        v(`${u1}-l4-v1`, "La cuenta, por favor", "the bill, please", "cho tôi thanh toán"),
        v(`${u1}-l4-v2`, "tarjeta", "card", "thẻ"),
        v(`${u1}-l4-v3`, "efectivo", "cash", "tiền mặt"),
        v(`${u1}-l4-v4`, "separada", "separate", "riêng / tách ra"),
      ],
      phrase: kp(`${u1}-l4-p1`, "La cuenta, por favor. ¿Podemos pagar por separado?", "The bill, please. Can we pay separately?", "Cho tôi thanh toán. Chúng tôi có thể trả riêng không?"),
      dialogue: [
        dl(`${u1}-l4-d1`, "Guest", "La cuenta, por favor. ¿Podemos pagar por separado?", "The bill, please. Can we pay separately?", "Cho tôi thanh toán. Chúng tôi có thể trả riêng không?"),
        dl(`${u1}-l4-d2`, "Staff", "Claro, no hay problema.", "Of course, no problem.", "Tất nhiên, không sao cả."),
      ],
      cultureNote: "In Spain a small tip (\"propina\") is appreciated but not mandatory — leaving loose change is common.",
      cultureNoteVi: "Ở Tây Ban Nha, tiền tip nhỏ (\"propina\") được đánh giá cao nhưng không bắt buộc — để lại tiền lẻ là phổ biến.",
    }),
  ];

  const u2Lessons = [
    topicLesson({
      id: `${u2}-l1`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "¿Tiene una reserva?", titleVi: "Bạn có đặt bàn không?",
      description: "Ask arriving guests if they have a reservation.",
      descriptionVi: "Hỏi khách vừa đến có đặt bàn trước không.",
      canDo: "I can ask a guest if they have a reservation and show them to a table.",
      canDoVi: "Tôi có thể hỏi khách có đặt bàn không và dẫn khách đến bàn.",
      vocabulary: [
        v(`${u2}-l1-v1`, "¿Tiene una reserva", "do you have a reservation", "bạn có đặt bàn không"),
        v(`${u2}-l1-v2`, "mesa", "table", "bàn"),
        v(`${u2}-l1-v3`, "por aquí", "this way", "hướng này"),
        v(`${u2}-l1-v4`, "siéntese", "please sit", "xin mời ngồi"),
      ],
      phrase: kp(`${u2}-l1-p1`, "¿Tiene una reserva? Por aquí, por favor.", "Do you have a reservation? This way, please.", "Bạn có đặt bàn không? Xin đi theo hướng này."),
      dialogue: [
        dl(`${u2}-l1-d1`, "Staff", "¿Tiene una reserva? Por aquí, por favor.", "Do you have a reservation? This way, please.", "Bạn có đặt bàn không? Xin đi theo hướng này."),
        dl(`${u2}-l1-d2`, "Guest", "Sí, a nombre de Ana.", "Yes, under the name Ana.", "Có, đặt tên Ana."),
      ],
    }),
    topicLesson({
      id: `${u2}-l2`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Le recomiendo este plato", titleVi: "Tôi gợi ý món này",
      description: "Recommend a popular dish to a guest.",
      descriptionVi: "Gợi ý một món được ưa chuộng cho khách.",
      canDo: "I can recommend a dish and explain that it is popular.",
      canDoVi: "Tôi có thể gợi ý một món ăn và nói rằng nó đang được ưa chuộng.",
      vocabulary: [
        v(`${u2}-l2-v1`, "Le recomiendo este plato", "I recommend this dish", "tôi gợi ý món này"),
        v(`${u2}-l2-v2`, "popular", "popular", "được ưa chuộng"),
        v(`${u2}-l2-v3`, "especial", "special", "đặc biệt"),
        v(`${u2}-l2-v4`, "hoy", "today", "hôm nay"),
      ],
      phrase: kp(`${u2}-l2-p1`, "Le recomiendo este plato. Es muy popular hoy.", "I recommend this dish. It is very popular today.", "Tôi gợi ý món này. Hôm nay nó rất được ưa chuộng."),
      dialogue: [
        dl(`${u2}-l2-d1`, "Guest", "¿Qué recomienda?", "What do you recommend?", "Bạn gợi ý món gì?"),
        dl(`${u2}-l2-d2`, "Staff", "Le recomiendo este plato. Es muy popular hoy.", "I recommend this dish. It is very popular today.", "Tôi gợi ý món này. Hôm nay nó rất được ưa chuộng."),
      ],
    }),
    topicLesson({
      id: `${u2}-l3`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "Lo siento mucho", titleVi: "Tôi rất xin lỗi",
      description: "Apologize for a mistake and offer to fix it right away.",
      descriptionVi: "Xin lỗi vì sai sót và đề nghị sửa ngay.",
      canDo: "I can apologize for a mistake and say I will fix it right away.",
      canDoVi: "Tôi có thể xin lỗi vì sai sót và nói sẽ sửa ngay.",
      vocabulary: [
        v(`${u2}-l3-v1`, "Lo siento mucho", "I am very sorry", "tôi rất xin lỗi"),
        v(`${u2}-l3-v2`, "error", "mistake", "sai sót"),
        v(`${u2}-l3-v3`, "cambiar", "to change / replace", "đổi / thay"),
        v(`${u2}-l3-v4`, "enseguida", "right away", "ngay lập tức"),
      ],
      phrase: kp(`${u2}-l3-p1`, "Lo siento mucho. Lo cambio enseguida.", "I am very sorry. I will change it right away.", "Tôi rất xin lỗi. Tôi sẽ đổi ngay."),
      dialogue: [
        dl(`${u2}-l3-d1`, "Guest", "Esto no es lo que pedí.", "This is not what I ordered.", "Đây không phải món tôi gọi."),
        dl(`${u2}-l3-d2`, "Staff", "Lo siento mucho. Lo cambio enseguida.", "I am very sorry. I will change it right away.", "Tôi rất xin lỗi. Tôi sẽ đổi ngay."),
      ],
    }),
    topicLesson({
      id: `${u2}-l4`, languageCode: "es", nicheId, unitId: u2, order: next(), level: "A1_2",
      title: "¿Es para llevar?", titleVi: "Đây là mang về phải không?",
      description: "Confirm a takeout order and give a wait time.",
      descriptionVi: "Xác nhận đơn mang về và cho biết thời gian chờ.",
      canDo: "I can confirm a takeout order and tell the guest the wait time.",
      canDoVi: "Tôi có thể xác nhận đơn mang về và nói thời gian chờ.",
      vocabulary: [
        v(`${u2}-l4-v1`, "¿Es para llevar", "is this for takeout", "đây là mang về phải không"),
        v(`${u2}-l4-v2`, "para llevar", "takeout", "mang về"),
        v(`${u2}-l4-v3`, "listo", "ready", "sẵn sàng / xong"),
        v(`${u2}-l4-v4`, "minutos", "minutes", "phút"),
      ],
      phrase: kp(`${u2}-l4-p1`, "¿Es para llevar? Estará listo en diez minutos.", "Is this for takeout? It will be ready in ten minutes.", "Đây là mang về phải không? Sẽ xong trong mười phút."),
      dialogue: [
        dl(`${u2}-l4-d1`, "Staff", "¿Es para llevar?", "Is this for takeout?", "Đây là mang về phải không?"),
        dl(`${u2}-l4-d2`, "Guest", "Sí. ¿Cuánto tiempo tarda?", "Yes. How long will it take?", "Vâng. Sẽ mất bao lâu?"),
      ],
    }),
  ];

  return buildCourse({
    languageCode: "es",
    nicheId,
    title: "Spanish · Restaurant & Food Service",
    titleVi: "Tiếng Tây Ban Nha · Nhà hàng & phục vụ ẩm thực",
    description: "Ordering, allergies, and payment as a guest; greeting and service as staff.",
    descriptionVi: "Gọi món, dị ứng và thanh toán khi là khách; chào đón và phục vụ khi là nhân viên.",
    levelCode: "A1_1",
    units: [
      { id: u1, title: "Como cliente", titleVi: "Khi là khách hàng", levelCode: "A1_1", goal: "Reserve, order, mention allergies, and pay the bill.", goalVi: "Đặt bàn, gọi món, báo dị ứng và thanh toán.", lessons: u1Lessons },
      { id: u2, title: "Como personal del restaurante", titleVi: "Khi là nhân viên nhà hàng", levelCode: "A1_2", goal: "Welcome guests, recommend dishes, apologize, and handle takeout.", goalVi: "Chào đón khách, gợi ý món, xin lỗi và xử lý đơn mang về.", lessons: u2Lessons },
    ],
  });
}

// ── QA ───────────────────────────────────────────────────────────────

function runQa(lessons, courses) {
  const errors = [];
  const lessonIdSeen = new Set();

  for (const lesson of lessons) {
    if (lessonIdSeen.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}`);
    lessonIdSeen.add(lesson.id);

    if (!lesson.title?.trim()) errors.push(`Lesson ${lesson.id}: empty title`);
    if (!lesson.titleVi?.trim()) errors.push(`Lesson ${lesson.id}: empty titleVi`);

    const exIdSeen = new Set();
    for (const ex of lesson.exercises) {
      if (exIdSeen.has(ex.id)) errors.push(`Lesson ${lesson.id}: duplicate exercise id ${ex.id}`);
      exIdSeen.add(ex.id);

      if (!ex.prompt?.trim()) errors.push(`Lesson ${lesson.id} exercise ${ex.id}: empty prompt`);

      if (Array.isArray(ex.options) && ex.options.length) {
        if (ex.options.length !== 4) {
          errors.push(`Lesson ${lesson.id} exercise ${ex.id}: expected 4 options, got ${ex.options.length}`);
        }
        if (new Set(ex.options).size !== ex.options.length) {
          errors.push(`Lesson ${lesson.id} exercise ${ex.id}: duplicate options`);
        }
        if (!ex.options.includes(ex.correctAnswer)) {
          errors.push(`Lesson ${lesson.id} exercise ${ex.id}: correctAnswer not among options`);
        }
      }

      if (Array.isArray(ex.pairs) && ex.pairs.length) {
        const lefts = ex.pairs.map((p) => p.left);
        const rights = ex.pairs.map((p) => p.right);
        if (new Set(lefts).size !== lefts.length) {
          errors.push(`Lesson ${lesson.id} exercise ${ex.id}: duplicate match lefts`);
        }
        if (new Set(rights).size !== rights.length) {
          errors.push(`Lesson ${lesson.id} exercise ${ex.id}: duplicate match rights`);
        }
      }
    }

    for (const item of lesson.vocabulary ?? []) {
      if (item.displayText === "雨") {
        if (item.reading !== "あめ") errors.push(`Lesson ${lesson.id}: 雨 reading must be あめ, got "${item.reading}"`);
        if (item.romanization !== "ame") errors.push(`Lesson ${lesson.id}: 雨 romanization must be ame, got "${item.romanization}"`);
        if (item.meaningVi !== "mưa") errors.push(`Lesson ${lesson.id}: 雨 meaningVi must be mưa, got "${item.meaningVi}"`);
        if (item.speechText !== "あめ") errors.push(`Lesson ${lesson.id}: 雨 speechText must be あめ, got "${item.speechText}"`);
      }
    }
  }

  const hasAme = lessons.some((l) => (l.vocabulary ?? []).some((item) => item.displayText === "雨"));
  if (!hasAme) errors.push("雨 vocabulary entry is missing from the curriculum");

  for (const course of courses) {
    const courseLessons = lessons.filter((l) => course.unitIds.includes(l.unitId));
    if (courseLessons.length === 0) {
      errors.push(`Course ${course.id}: no lessons found`);
      continue;
    }
    if (courseLessons.every((l) => l.comingSoon)) {
      errors.push(`Course ${course.id}: all lessons are comingSoon`);
    }
    const playable = courseLessons.filter((l) => !l.comingSoon);
    if (playable.length < 6) {
      errors.push(`Course ${course.id}: only ${playable.length} playable lessons (min 6 required)`);
    }
  }

  if (errors.length) {
    console.error(`QA FAILED with ${errors.length} error(s):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log(`QA passed: ${lessons.length} lessons across ${courses.length} courses.`);
}

// ── main ─────────────────────────────────────────────────────────────

async function main() {
  const packs = [
    jaDailyLife(),
    jaTravel(),
    jaRestaurant(),
    enDailyLife(),
    enTravel(),
    enRestaurant(),
    esDailyLife(),
    esTravel(),
    esRestaurant(),
  ];

  const courses = packs.map((p) => p.course);
  const lessons = packs.flatMap((p) => p.lessons);

  runQa(lessons, courses);

  const unitCount = courses.reduce((sum, c) => sum + c.units.length, 0);
  const generatedAt = new Date().toISOString();

  const catalog = {
    version: VERSION,
    generatedAt,
    languages: ["en", "ja", "es"],
    niches: ["daily_life", "travel_hotel", "restaurant_food_service"],
    courseCount: courses.length,
    lessonCount: lessons.length,
    unitCount,
    courses: courses.map((c) => {
      const courseLessons = lessons.filter((l) => c.unitIds.includes(l.unitId));
      return {
        id: c.id,
        languageCode: c.languageCode,
        nicheId: c.nicheId,
        title: c.title,
        lessonCount: courseLessons.length,
        playableLessonCount: courseLessons.filter((l) => !l.comingSoon).length,
      };
    }),
  };

  const coursesPayload = { version: VERSION, generatedAt, courses };
  const lessonsPayload = { version: VERSION, generatedAt, lessons };

  const readme = `# Shared curriculum

Generated by \`scripts/generate-curriculum.mjs\` (${VERSION}).

Original NovaLang curriculum content — CEFR can-do / task-based principles are
used only as a structural guide, not copied from any third-party app.

Do not hand-edit JSON under \`shared/generated/\` or these mirrored copies.
Edit the generator script and re-run:

\`\`\`bash
node scripts/generate-curriculum.mjs
npm run sync:flutter-assets
\`\`\`
`;

  for (const dir of OUT_DIRS) {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "courses.json"), JSON.stringify(coursesPayload, null, 2), "utf8");
    await writeFile(path.join(dir, "lessons.json"), JSON.stringify(lessonsPayload, null, 2), "utf8");
    await writeFile(path.join(dir, "curriculum_catalog.json"), JSON.stringify(catalog, null, 2), "utf8");
  }
  await writeFile(path.join(ROOT, "shared", "content", "curriculum", "README.md"), readme, "utf8");

  const exerciseTypes = new Set();
  for (const lesson of lessons) {
    for (const ex of lesson.exercises) exerciseTypes.add(ex.type);
  }

  console.log(`Generated ${courses.length} courses, ${unitCount} units, ${lessons.length} lessons.`);
  for (const entry of catalog.courses) {
    console.log(`  - ${entry.id}: ${entry.playableLessonCount}/${entry.lessonCount} playable`);
  }
  console.log(`Exercise types used: ${[...exerciseTypes].sort().join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
