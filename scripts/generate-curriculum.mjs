#!/usr/bin/env node
/**
 * Generate shared curriculum JSON for Web + Flutter.
 * Run: npm run generate:curriculum
 *
 * curriculum-v3 scope (review before expanding):
 * - Catalog: 20 learning languages (en/ja available, others comingSoon)
 * - Playable: Daily Life → Greetings → Unit 1 only for en + ja
 * - Each lesson: exactly 10 exercises (1–7 free, 8–10 Plus)
 * - Exam Preparation: placeholder branch only (not built)
 *
 * Original NovaLang content — do not copy third-party lesson text.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KATAKANA_E8_SPECS } from "./katakana-e8-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIRS = [
  path.join(ROOT, "shared", "generated"),
  path.join(ROOT, "shared", "content", "curriculum"),
];

const VERSION = "curriculum-v3";
const GENERATED_AT = "2026-07-10T00:00:00.000Z";
const NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];
const LEARNING_CATALOG = [
  "en", "ja", "es", "ko", "zh", "fr", "de", "it", "pt", "vi",
  "th", "id", "ms", "tl", "hi", "ar", "ru", "nl", "sv", "tr",
];
const PLAYABLE_LANGUAGES = ["en", "ja"];
const FREE_TYPES = [
  "characterCard",
  "chooseMeaning",
  "chooseReading",
  "chooseVocabulary",
  "fillMissingCharacter",
  "soundToCharacter",
  "nextInSequence",
  "chooseCorrectPair",
  "matchPairs",
  "fillBlank",
  "chooseCorrectAnswer",
  "listenAndChoose",
  "typeAnswer",
];
const PLUS_TYPES = [
  "listeningGapFill",
  "plusListeningVocabularyChallenge",
  "controlledAiQa",
  "aiFeedbackReview",
];

function t(map) {
  for (const code of NATIVE_CODES) {
    if (!map[code] || String(map[code]).trim() === "") {
      throw new Error(`Missing translation for ${code}: ${JSON.stringify(map)}`);
    }
  }
  return map;
}

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

function item(id, text, meanings, extra = {}) {
  const translations = t(meanings);
  return {
    id,
    text,
    displayText: text,
    reading: extra.reading ?? text,
    romanization: extra.romanization ?? "",
    speechText: extra.speechText ?? extra.reading ?? text,
    translations,
    meaningEn: translations.en,
    meaningVi: translations.vi,
    meaningJa: translations.ja,
    meaningKo: translations.ko,
    meaningZh: translations.zh,
  };
}

function meaningOf(entry, code) {
  return entry.translations[code] ?? entry.meaningEn;
}

function promptMap(en, vi, ja, ko, zh) {
  return t({ en, vi, ja, ko, zh });
}

function optionsByNative(entries, seedId) {
  const byNative = {};
  for (const code of NATIVE_CODES) {
    const labels = rotated(
      entries.map((e) => meaningOf(e, code)),
      `${seedId}-${code}`,
    );
    assertUnique(labels, `options[${code}] ${seedId}`);
    byNative[code] = labels;
  }
  return byNative;
}

function acceptedByNative(entry) {
  const out = {};
  for (const code of NATIVE_CODES) out[code] = [meaningOf(entry, code)];
  return out;
}

function pairsByNative(entries, seedId) {
  const byNative = {};
  for (const code of NATIVE_CODES) {
    const pairs = rotated(
      entries.map((e) => ({ left: e.displayText, right: meaningOf(e, code) })),
      `${seedId}-${code}`,
    );
    const rights = pairs.map((p) => p.right);
    assertUnique(rights, `pair rights[${code}] ${seedId}`);
    byNative[code] = pairs;
  }
  return byNative;
}

function readingPairsByNative(entries, seedId) {
  const pairs = rotated(
    entries.slice(0, Math.min(5, entries.length)).map((e) => ({
      left: e.displayText,
      right: e.romanization,
    })),
    seedId,
  );
  assertUnique(
    pairs.map((p) => p.left),
    `reading pair lefts ${seedId}`,
  );
  assertUnique(
    pairs.map((p) => p.right),
    `reading pair rights ${seedId}`,
  );
  return Object.fromEntries(NATIVE_CODES.map((code) => [code, pairs]));
}

function charOptions(entries, seedId) {
  const options = rotated(
    entries.slice(0, 4).map((e) => e.displayText),
    seedId,
  );
  assertUnique(options, `char options ${seedId}`);
  return options;
}

function romanizationOptions(entries, seedId) {
  const options = rotated(
    entries.slice(0, 4).map((e) => e.romanization),
    seedId,
  );
  assertUnique(options, `romanization options ${seedId}`);
  return options;
}

function blankSequence(chars, blankIndex) {
  return chars
    .map((ch, i) => (i === blankIndex ? "_" : ch))
    .join(" ");
}

function sequenceClue(chars, questionIndex) {
  return chars
    .slice(0, questionIndex)
    .concat(["?"])
    .join(" → ");
}

function baseExercise(id, type, access, prompts, fields = {}) {
  return {
    id,
    type,
    access, // free | plus
    plusOnly: access === "plus",
    usesAi: type === "controlledAiQa",
    reusesPreviousAiFeedback: type === "aiFeedbackReview",
    prompt: prompts.en,
    promptVi: prompts.vi,
    prompts,
    ...fields,
  };
}

function exChooseMeaning(id, target, pool) {
  const distractors = pool.filter((p) => p.id !== target.id).slice(0, 3);
  if (distractors.length < 3) throw new Error(`chooseMeaning ${id}: need 3 distractors`);
  const entries = [target, ...distractors];
  const optionsByNativeLang = optionsByNative(entries, id);
  return baseExercise(
    id,
    "chooseMeaning",
    "free",
    promptMap(
      "What does this mean?",
      "Từ/câu này nghĩa là gì?",
      "これはどういう意味ですか？",
      "이 말은 무슨 뜻인가요?",
      "这句话是什么意思？",
    ),
    {
      displayText: target.displayText,
      speechText: target.speechText,
      reading: target.reading,
      romanization: target.romanization,
      options: optionsByNativeLang.en,
      optionsVi: optionsByNativeLang.vi,
      optionsByNative: optionsByNativeLang,
      correctAnswer: target.meaningEn,
      acceptedAnswers: [target.meaningEn],
      acceptedAnswersVi: [target.meaningVi],
      acceptedAnswersByNative: acceptedByNative(target),
      skill: "vocabulary",
    },
  );
}

function exChooseVocabulary(id, target, pool) {
  const distractors = pool.filter((p) => p.id !== target.id).slice(0, 3);
  if (distractors.length < 3) throw new Error(`chooseVocabulary ${id}: need 3 distractors`);
  const options = rotated(
    [target, ...distractors].map((e) => e.displayText),
    id,
  );
  assertUnique(options, `chooseVocabulary ${id}`);
  const prompts = promptMap(
    `Choose the word/phrase that means “${target.meaningEn}”.`,
    `Chọn từ/cụm từ có nghĩa “${target.meaningVi}”.`,
    `「${target.meaningJa}」の意味の語／フレーズを選んでください。`,
    `“${target.meaningKo}” 뜻의 단어/표현을 고르세요.`,
    `请选择意思为“${target.meaningZh}”的词语。`,
  );
  return baseExercise(id, "chooseVocabulary", "free", prompts, {
    displayText: target.meaningEn,
    speechText: target.speechText,
    options,
    optionsVi: options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
    correctAnswer: target.displayText,
    acceptedAnswers: [target.displayText],
    acceptedAnswersVi: [target.displayText],
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((c) => [c, [target.displayText]]),
    ),
    skill: "vocabulary",
  });
}

function exMatchPairs(id, entries) {
  const selected = entries.slice(0, Math.min(5, entries.length));
  if (selected.length < 3) throw new Error(`matchPairs ${id}: need at least 3 pairs`);
  const byNative = pairsByNative(selected, id);
  return baseExercise(
    id,
    "matchPairs",
    "free",
    promptMap(
      "Match each word/phrase with its meaning.",
      "Nối mỗi từ/cụm từ với nghĩa đúng.",
      "語／フレーズと意味を組み合わせてください。",
      "단어/표현을 뜻과 짝지으세요.",
      "将词语与意思配对。",
    ),
    {
      pairs: byNative.en,
      pairsVi: byNative.vi,
      pairsByNative: byNative,
      correctAnswer: byNative.en.map((p) => p.right).join("|"),
      skill: "vocabulary",
    },
  );
}

function exFillBlank(id, sentence, blankWord, optionWords, speechText) {
  const options = rotated(optionWords.slice(0, 4), id);
  assertUnique(options, `fillBlank ${id}`);
  if (!options.includes(blankWord)) {
    throw new Error(`fillBlank ${id}: blankWord missing from options`);
  }
  if (!/_|＿|\{blank\}|\[blank\]/.test(sentence)) {
    throw new Error(`fillBlank ${id}: visible sentence must include a blank marker`);
  }
  if (String(sentence).includes(blankWord)) {
    throw new Error(`fillBlank ${id}: correct answer must not appear in visible blank sentence`);
  }
  const fields = {
    displayText: sentence,
    options,
    optionsVi: options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
    correctAnswer: blankWord,
    acceptedAnswers: [blankWord],
    acceptedAnswersVi: [blankWord],
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((c) => [c, [blankWord]]),
    ),
    skill: "grammar",
  };
  // Do not attach speech that reveals the missing answer in the audio card.
  if (speechText && !String(speechText).includes(blankWord)) {
    fields.speechText = speechText;
  }
  return baseExercise(
    id,
    "fillBlank",
    "free",
    promptMap(
      "Fill in the missing character.",
      "Điền ký tự còn thiếu.",
      "空欄に入る文字を選んでください。",
      "빈칸에 알맞은 글자를 고르세요.",
      "填入缺少的字符。",
    ),
    fields,
  );
}

function exChooseCorrectAnswer(id, promptTarget, correct, distractors) {
  const options = rotated([correct, ...distractors.slice(0, 3)], id);
  assertUnique(options, `chooseCorrectAnswer ${id}`);
  const fields = {
    displayText: promptTarget.displayText,
    options,
    optionsVi: options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
    correctAnswer: correct,
    acceptedAnswers: [correct],
    acceptedAnswersVi: [correct],
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((c) => [c, [correct]]),
    ),
    skill: "dialogue",
  };
  if (
    promptTarget.speechText &&
    promptTarget.speechText !== correct &&
    promptTarget.allowSpeech !== false
  ) {
    fields.speechText = promptTarget.speechText;
  }
  return baseExercise(
    id,
    "chooseCorrectAnswer",
    "free",
    promptMap(
      promptTarget.en,
      promptTarget.vi,
      promptTarget.ja,
      promptTarget.ko,
      promptTarget.zh,
    ),
    fields,
  );
}

function exListenAndChoose(id, target, pool) {
  const distractors = pool.filter((p) => p.id !== target.id).slice(0, 3);
  if (distractors.length < 3) throw new Error(`listenAndChoose ${id}: need 3 distractors`);
  const entries = [target, ...distractors];
  const optionsByNativeLang = optionsByNative(entries, id);
  return baseExercise(
    id,
    "listenAndChoose",
    "free",
    promptMap(
      "Listen and choose the meaning.",
      "Nghe và chọn nghĩa đúng.",
      "聞いて意味を選んでください。",
      "듣고 뜻을 고르세요.",
      "听音频并选择意思。",
    ),
    {
      displayText: "🎧",
      speechText: target.speechText,
      hideSpeechLabel: true,
      ...AUDIO_LABEL_LISTEN,
      options: optionsByNativeLang.en,
      optionsVi: optionsByNativeLang.vi,
      optionsByNative: optionsByNativeLang,
      correctAnswer: target.meaningEn,
      acceptedAnswers: [target.meaningEn],
      acceptedAnswersVi: [target.meaningVi],
      acceptedAnswersByNative: acceptedByNative(target),
      skill: "listening",
      usesAi: false,
    },
  );
}

function exListenAndChooseCharacter(id, target, pool) {
  const distractors = pool.filter((p) => p.id !== target.id).slice(0, 3);
  if (distractors.length < 3) {
    throw new Error(`listenAndChooseCharacter ${id}: need 3 distractors`);
  }
  const options = charOptions([target, ...distractors], id);
  return baseExercise(
    id,
    "listenAndChoose",
    "free",
    promptMap(
      "Listen to the pronunciation and choose the correct character.",
      "Nghe phát âm và chọn chữ đúng.",
      "発音を聞いて正しい文字を選んでください。",
      "발음을 듣고 올바른 글자를 고르세요.",
      "听发音并选择正确的字符。",
    ),
    {
      displayText: "🎧",
      speechText: target.speechText,
      hideSpeechLabel: true,
      ...AUDIO_LABEL_LISTEN,
      options,
      optionsVi: options,
      optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
      correctAnswer: target.displayText,
      acceptedAnswers: [target.displayText],
      acceptedAnswersVi: [target.displayText],
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((c) => [c, [target.displayText]]),
      ),
      skill: "listening",
      usesAi: false,
    },
  );
}

function exChooseCharacterBySound(id, target, pool) {
  const distractors = pool.filter((p) => p.id !== target.id).slice(0, 3);
  if (distractors.length < 3) {
    throw new Error(`chooseCharacterBySound ${id}: need 3 distractors`);
  }
  const options = charOptions([target, ...distractors], id);
  const sound = target.romanization;
  return baseExercise(
    id,
    "chooseVocabulary",
    "free",
    promptMap(
      `Choose the character for the sound “${sound}”.`,
      `Chọn chữ có âm “${sound}”.`,
      `「${sound}」の音の文字を選んでください。`,
      `“${sound}” 소리의 글자를 고르세요.`,
      `请选择发 “${sound}” 音的字符。`,
    ),
    {
      displayText: sound,
      options,
      optionsVi: options,
      optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
      correctAnswer: target.displayText,
      acceptedAnswers: [target.displayText],
      acceptedAnswersVi: [target.displayText],
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((c) => [c, [target.displayText]]),
      ),
      skill: "vocabulary",
      hideSpeechLabel: true,
    },
  );
}

function exChooseReading(id, target, pool) {
  const distractors = pool.filter((p) => p.id !== target.id).slice(0, 3);
  if (distractors.length < 3) throw new Error(`chooseReading ${id}: need 3 distractors`);
  const options = romanizationOptions([target, ...distractors], id);
  return baseExercise(
    id,
    "chooseCorrectAnswer",
    "free",
    promptMap(
      "How is this character read?",
      "Chữ này đọc là gì?",
      "この文字の読みは何ですか？",
      "이 글자는 어떻게 읽나요?",
      "这个字怎么读？",
    ),
    {
      displayText: target.displayText,
      speechText: target.speechText,
      options,
      optionsVi: options,
      optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
      correctAnswer: target.romanization,
      acceptedAnswers: [target.romanization],
      acceptedAnswersVi: [target.romanization],
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((c) => [c, [target.romanization]]),
      ),
      skill: "reading",
      answerVisibleOk: true,
    },
  );
}

function exMatchReadingPairs(id, entries) {
  const byNative = readingPairsByNative(entries, id);
  return baseExercise(
    id,
    "matchPairs",
    "free",
    promptMap(
      "Match each character with its reading.",
      "Nối mỗi chữ với cách đọc đúng.",
      "文字と読みを組み合わせてください。",
      "글자와 읽기를 짝지으세요.",
      "将字符与读音配对。",
    ),
    {
      pairs: byNative.en,
      pairsVi: byNative.vi,
      pairsByNative: byNative,
      correctAnswer: byNative.en.map((p) => p.right).join("|"),
      skill: "reading",
      matchPairMode: "kana_reading",
    },
  );
}

function exSequenceNext(id, focusChars, optionPool = focusChars) {
  if (focusChars.length < 3) {
    throw new Error(`sequenceNext ${id}: need at least 3 characters`);
  }
  const questionIndex = Math.min(2, focusChars.length - 1);
  const correctItem = focusChars[questionIndex];
  const correct = correctItem.displayText;
  const distractors = optionPool
    .filter((e) => e.displayText !== correct)
    .map((e) => e.displayText)
    .slice(0, 3);
  if (distractors.length < 3) {
    throw new Error(`sequenceNext ${id}: need 3 distractors`);
  }
  const options = rotated([correct, ...distractors], id);
  assertUnique(options, `sequenceNext ${id}`);
  const clue = sequenceClue(
    focusChars.slice(0, questionIndex + 1).map((e) => e.displayText),
    questionIndex,
  );
  if (clue.replaceAll("?", "").includes(correct)) {
    throw new Error(`sequenceNext ${id}: correct answer leaked in clue`);
  }
  return baseExercise(
    id,
    "typeAnswer",
    "free",
    promptMap(
      "What character comes next in order?",
      "Chữ nào tiếp theo trong thứ tự?",
      "次に来る文字はどれですか？",
      "순서상 다음에 오는 글자는?",
      "按顺序下一个字符是什么？",
    ),
    {
      displayText: clue,
      options,
      optionsVi: options,
      optionsByNative: Object.fromEntries(NATIVE_CODES.map((c) => [c, options])),
      correctAnswer: correct,
      acceptedAnswers: [correct, correctItem.romanization],
      acceptedAnswersVi: [correct, correctItem.romanization],
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((c) => [c, [correct, correctItem.romanization]]),
      ),
      skill: "review",
      sequenceMode: "gojuon_next",
    },
  );
}

function exTypeAnswer(id, target) {
  const acceptedByNativeLang = acceptedByNative(target);
  // Also accept learning-language text for type/reorder style answers.
  for (const code of NATIVE_CODES) {
    if (!acceptedByNativeLang[code].includes(target.displayText)) {
      acceptedByNativeLang[code] = [...acceptedByNativeLang[code], target.displayText];
    }
  }
  return baseExercise(
    id,
    "typeAnswer",
    "free",
    promptMap(
      "Type the meaning (or the target phrase).",
      "Gõ nghĩa (hoặc cụm từ đích).",
      "意味（または目標フレーズ）を入力してください。",
      "뜻(또는 목표 표현)을 입력하세요.",
      "输入意思（或目标短语）。",
    ),
    {
      displayText: target.displayText,
      speechText: target.speechText,
      reading: target.reading,
      romanization: target.romanization,
      correctAnswer: target.meaningEn,
      acceptedAnswers: [target.meaningEn, target.displayText],
      acceptedAnswersVi: [target.meaningVi, target.displayText],
      acceptedAnswersByNative: acceptedByNativeLang,
      skill: "writing",
    },
  );
}

function exListeningGapFill(id, sentences) {
  // Plus: device TTS only, no AI API.
  for (const sentence of sentences) {
    if (!/_|＿|\{blank\}|\[blank\]/.test(sentence.text)) {
      throw new Error(`listeningGapFill ${id}: gap sentence missing blank marker`);
    }
    if (String(sentence.text).includes(sentence.blankWord)) {
      throw new Error(`listeningGapFill ${id}: blankWord leaked in visible gap text`);
    }
  }
  const gaps = sentences.map((s) => s.blankWord);
  return baseExercise(
    id,
    "listeningGapFill",
    "plus",
    promptMap(
      "Listen to the short lines and fill the missing characters.",
      "Nghe các dòng ngắn và điền ký tự còn thiếu.",
      "短い行を聞いて空欄の文字を埋めてください。",
      "짧은 줄을 듣고 빈칸 글자를 채우세요.",
      "听短句并填入缺少的字符。",
    ),
    {
      displayText: sentences.map((s) => s.text).join("\n"),
      speechText: sentences.map((s) => s.speechText).join("。"),
      hideSpeechLabel: true,
      gapSentences: sentences,
      correctAnswer: gaps.join("|"),
      acceptedAnswers: gaps,
      acceptedAnswersVi: gaps,
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((c) => [c, gaps]),
      ),
      skill: "listening",
      usesAi: false,
      plusOnly: true,
    },
  );
}

function exControlledAiQa(id, questionByNative, expectedFocus) {
  return baseExercise(
    id,
    "controlledAiQa",
    "plus",
    promptMap(
      "Answer the short lesson question (one turn).",
      "Trả lời câu hỏi ngắn của bài (một lượt).",
      "レッスンの短い質問に1回だけ答えてください。",
      "수업의 짧은 질문에 한 번만 답하세요.",
      "回答本课的简短问题（仅一轮）。",
    ),
    {
      displayText: questionByNative.en,
      aiMode: "controlled_qa",
      maxUserChars: 400,
      maxAiChars: 220,
      saveChatHistory: false,
      openEndedChat: false,
      questionByNative: t(questionByNative),
      expectedFocus,
      usesAi: true,
      plusOnly: true,
      skill: "speaking",
    },
  );
}

function exAiFeedbackReview(id) {
  return baseExercise(
    id,
    "aiFeedbackReview",
    "plus",
    promptMap(
      "Review your AI feedback from the previous step.",
      "Xem lại phản hồi AI từ bước trước.",
      "前のステップのAIフィードバックを確認してください。",
      "이전 단계의 AI 피드백을 확인하세요.",
      "查看上一步的 AI 反馈。",
    ),
    {
      displayText: "AI feedback review",
      usesAi: false,
      reusesPreviousAiFeedback: true,
      triggerExtraAiCallByDefault: false,
      plusOnly: true,
      skill: "review",
    },
  );
}

function feedbackMap(vi, en, ja, ko, zh) {
  return t({ vi, en, ja, ko, zh });
}

function localizedAudioLabels(en, vi, ja, ko, zh) {
  const labels = t({ en, vi, ja, ko, zh });
  const withIcon = Object.fromEntries(
    NATIVE_CODES.map((code) => [code, `🔊 ${labels[code]}`]),
  );
  return {
    audioCardLabel: en,
    audioCardLabelByNative: labels,
    visibleBeforeAnswer: withIcon.en,
    visibleBeforeAnswerByNative: withIcon,
    displayTextByNative: withIcon,
  };
}

function revealMap(vi, en, ja, ko, zh) {
  const byNative = t({ vi, en, ja, ko, zh });
  return {
    revealAfterAnswer: en,
    revealAfterAnswerByNative: byNative,
  };
}

const AUDIO_LABEL_LISTEN = localizedAudioLabels(
  "Listen",
  "Nghe phát âm",
  "発音を聞く",
  "발음 듣기",
  "听发音",
);
const AUDIO_LABEL_LISTEN_WORD = localizedAudioLabels(
  "Listen to word",
  "Nghe từ",
  "単語を聞く",
  "단어 듣기",
  "听单词",
);

function plusListeningSubQuestion({
  id,
  speechText,
  wordDisplay,
  meanings,
  options,
  correctAnswer,
  feedbackCorrect,
  feedbackWrong,
  prompts,
  revealByNative,
}) {
  const audio = AUDIO_LABEL_LISTEN_WORD;
  const resolvedPrompts =
    prompts ??
    promptMap(
      "Choose the first Hiragana character.",
      "Chọn chữ Hiragana đầu tiên.",
      "最初のひらがなを選んでください。",
      "첫 히라가나를 고르세요.",
      "选择第一个平假名。",
    );
  const reveal =
    revealByNative ??
    revealMap(
      `${wordDisplay}— ${meanings.vi}`,
      `${wordDisplay}— ${meanings.en}`,
      `${wordDisplay}— ${meanings.ja}`,
      `${wordDisplay}— ${meanings.ko}`,
      `${wordDisplay}— ${meanings.zh}`,
    );
  return {
    id,
    speechText,
    hideSpeechLabel: true,
    audioCardLabel: audio.audioCardLabel,
    audioCardLabelByNative: audio.audioCardLabelByNative,
    visibleBeforeAnswer: audio.visibleBeforeAnswer,
    visibleBeforeAnswerByNative: audio.visibleBeforeAnswerByNative,
    prompt: resolvedPrompts.en,
    prompts: resolvedPrompts,
    options,
    correctAnswer,
    acceptedAnswers: [correctAnswer],
    ...(revealByNative
      ? {
          revealAfterAnswer: revealByNative.en,
          revealAfterAnswerByNative: t(revealByNative),
        }
      : reveal),
    feedbackCorrectByNative: feedbackCorrect,
    feedbackWrongByNative: feedbackWrong,
  };
}

function exCharacterCard(id, cards) {
  return baseExercise(
    id,
    "characterCard",
    "free",
    promptMap(
      "Learn the first 5 Hiragana characters.",
      "Học 5 chữ Hiragana đầu tiên.",
      "最初の5つのひらがなを学びましょう。",
      "첫 히라가나 5글자를 배워요.",
      "学习前 5 个平假名。",
    ),
    {
      displayText: "あ い う え お",
      cards,
      correctAnswer: "learned",
      acceptedAnswers: ["learned"],
      acceptedAnswersVi: ["learned", "đã học"],
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((code) => [code, ["learned"]]),
      ),
      skill: "reading",
      answerVisibleOk: true,
    },
  );
}

function exFixedMultipleChoice(id, type, prompts, fields) {
  const options = fields.options ?? [];
  assertUnique(options, `${type} ${id} options`);
  if (options.length !== 4) {
    throw new Error(`${type} ${id}: multiple choice must have exactly 4 options`);
  }
  if (!options.includes(fields.correctAnswer)) {
    throw new Error(`${type} ${id}: correct answer missing from options`);
  }
  return baseExercise(id, type, "free", prompts, {
    ...fields,
    options,
    optionsVi: options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((code) => [code, options])),
    acceptedAnswers: [fields.correctAnswer],
    acceptedAnswersVi: [fields.correctAnswer],
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((code) => [code, [fields.correctAnswer]]),
    ),
  });
}

function exPlusListeningVocabularyChallenge(id, subQuestions, promptOverride) {
  if (subQuestions.length < 3 || subQuestions.length > 5) {
    throw new Error(
      `${id}: plusListeningVocabularyChallenge must have 3–5 subQuestions, got ${subQuestions.length}`,
    );
  }
  const prompts =
    promptOverride ??
    promptMap(
      "Listen to each Japanese word and choose the first Hiragana character.",
      "Nghe từng từ tiếng Nhật và chọn chữ Hiragana đầu tiên.",
      "日本語の単語を聞いて、最初のひらがなを選んでください。",
      "일본어 단어를 듣고 첫 히라가나를 고르세요.",
      "听每个日语单词，选择开头的平假名。",
    );
  return baseExercise(
    id,
    "plusListeningVocabularyChallenge",
    "plus",
    prompts,
    {
      displayText: AUDIO_LABEL_LISTEN_WORD.visibleBeforeAnswer,
      displayTextByNative: AUDIO_LABEL_LISTEN_WORD.displayTextByNative,
      hideSpeechLabel: true,
      audioCardLabel: AUDIO_LABEL_LISTEN_WORD.audioCardLabel,
      audioCardLabelByNative: AUDIO_LABEL_LISTEN_WORD.audioCardLabelByNative,
      subQuestions,
      correctAnswer: subQuestions.map((q) => q.correctAnswer).join("|"),
      acceptedAnswers: subQuestions.map((q) => q.correctAnswer),
      acceptedAnswersVi: subQuestions.map((q) => q.correctAnswer),
      acceptedAnswersByNative: Object.fromEntries(
        NATIVE_CODES.map((code) => [code, subQuestions.map((q) => q.correctAnswer)]),
      ),
      skill: "listening",
      usesAi: false,
      plusOnly: true,
    },
  );
}

function meaningFromReveal(reveal) {
  const meanings = {};
  for (const code of NATIVE_CODES) {
    const text = reveal[code] ?? "";
    const sep = text.indexOf(" — ");
    meanings[code] = sep >= 0 ? text.slice(sep + 3).trim() : text;
  }
  return meanings;
}

function buildKatakanaPlusListeningE8(lessonId) {
  const spec = KATAKANA_E8_SPECS[lessonId];
  if (!spec) {
    throw new Error(`${lessonId}: missing Katakana Exercise 8 spec`);
  }
  const targetMode = spec.listeningTargetMode ?? "first";
  const exercisePrompt = promptMap(
    spec.prompt.en,
    spec.prompt.vi,
    spec.prompt.ja,
    spec.prompt.ko,
    spec.prompt.zh,
  );
  const subPrompt = promptMap(
    spec.subPrompt.en,
    spec.subPrompt.vi,
    spec.subPrompt.ja,
    spec.subPrompt.ko,
    spec.subPrompt.zh,
  );

  const subQuestions = spec.items.map((item, index) => {
    const meanings = meaningFromReveal(item.reveal);
    const fb = hiraganaListeningFeedback(item.speechText, meanings, item.correctAnswer, {
      targetMode,
    });
    return plusListeningSubQuestion({
      id: `${lessonId}-e8-s${index + 1}`,
      speechText: item.speechText,
      wordDisplay: item.speechText,
      meanings,
      options: item.options,
      correctAnswer: item.correctAnswer,
      feedbackCorrect: fb.correct,
      feedbackWrong: fb.wrong,
      prompts: subPrompt,
      revealByNative: item.reveal,
    });
  }).map((question) => ({
    ...question,
    optionsVi: question.options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((code) => [code, question.options])),
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((code) => [code, [question.correctAnswer]]),
    ),
    feedback: {
      correct: question.feedbackCorrectByNative,
      wrong: question.feedbackWrongByNative,
    },
  }));

  return exPlusListeningVocabularyChallenge(`${lessonId}-e8`, subQuestions, exercisePrompt);
}

function buildTenExercises({ id, vocab, focus, fill, chooseSentence, listenIndex, gapSentences, aiQuestion }) {
  const pool = vocab;
  const v0 = pool[0];
  const v1 = pool[1] ?? pool[0];
  const vListen = pool[listenIndex] ?? pool[2] ?? pool[0];
  const typeTarget = focus ?? v0;

  const exercises = [
    exChooseMeaning(`${id}-e1`, v0, pool),
    exChooseVocabulary(`${id}-e2`, v1, pool),
    exMatchPairs(`${id}-e3`, pool),
    exFillBlank(`${id}-e4`, fill.sentence, fill.blankWord, fill.options, fill.speechText),
    exChooseCorrectAnswer(`${id}-e5`, chooseSentence.prompt, chooseSentence.correct, chooseSentence.distractors),
    exListenAndChoose(`${id}-e6`, vListen, pool),
    exTypeAnswer(`${id}-e7`, typeTarget),
    exListeningGapFill(`${id}-e8`, gapSentences),
    exControlledAiQa(`${id}-e9`, aiQuestion, typeTarget.displayText),
    exAiFeedbackReview(`${id}-e10`),
  ];

  if (exercises.length !== 10) {
    throw new Error(`Lesson ${id}: expected 10 exercises, got ${exercises.length}`);
  }
  for (let i = 0; i < 7; i += 1) {
    if (exercises[i].access !== "free" || exercises[i].plusOnly) {
      throw new Error(`Lesson ${id}: exercise ${i + 1} must be free`);
    }
    if (!FREE_TYPES.includes(exercises[i].type)) {
      throw new Error(`Lesson ${id}: unexpected free type ${exercises[i].type}`);
    }
  }
  for (let i = 7; i < 10; i += 1) {
    if (exercises[i].access !== "plus" || !exercises[i].plusOnly) {
      throw new Error(`Lesson ${id}: exercise ${i + 1} must be Plus`);
    }
    if (!PLUS_TYPES.includes(exercises[i].type)) {
      throw new Error(`Lesson ${id}: unexpected plus type ${exercises[i].type}`);
    }
  }
  return exercises;
}

/** Foundation kana/alphabet: no answer leaks, real blanks, proven drill patterns. */
function buildFoundationCharacterExercises({ id, vocab, distractorVocab = [], scriptLabel, scriptLabelVi, aiQuestion }) {
  const pool = [...vocab, ...distractorVocab].filter(
    (entry, index, all) => all.findIndex((candidate) => candidate.id === entry.id) === index,
  );
  if (pool.length < 4) {
    throw new Error(`Foundation lesson ${id}: need at least 4 characters`);
  }
  const focus = vocab.slice(0, Math.min(5, vocab.length));
  const [c0, c1, c2, c3, c4] = [
    focus[0],
    focus[1] ?? focus[0],
    focus[2] ?? focus[0],
    focus[3] ?? focus[0],
    focus[4] ?? focus[0],
  ];
  const focusChars = focus.map((v) => v.displayText);
  const blankIndex = 1;
  const blankWord = focus[blankIndex].displayText;
  const fillSentence = blankSequence(focusChars.slice(0, 5), blankIndex);
  const fillOptions = charOptions(pool, `${id}-fill`);

  const gapSentences = [
    {
      text: blankSequence([c0.displayText, c1.displayText, c2.displayText], 0),
      blankWord: c0.displayText,
      speechText: `${c0.displayText} ${c1.displayText} ${c2.displayText}`,
    },
    {
      text: blankSequence([c0.displayText, c1.displayText, c2.displayText], 1),
      blankWord: c1.displayText,
      speechText: `${c0.displayText} ${c1.displayText} ${c2.displayText}`,
    },
    focus.length >= 5
      ? {
          text: blankSequence([c2.displayText, c3.displayText, c4.displayText], 2),
          blankWord: c4.displayText,
          speechText: `${c2.displayText} ${c3.displayText} ${c4.displayText}`,
        }
      : {
          text: blankSequence([c0.displayText, c1.displayText, c2.displayText], 2),
          blankWord: c2.displayText,
          speechText: `${c0.displayText} ${c1.displayText} ${c2.displayText}`,
        },
  ];

  // Exercise 1: shared matchPairs (letter/kana → reading) for all foundation languages.
  const e1 = exMatchReadingPairs(`${id}-e1`, focus);
  e1.prompt = "Match letters with their sounds";
  e1.promptVi = "Nối chữ cái với âm đọc";
  e1.promptByNative = promptMap(
    "Match letters with their sounds",
    "Nối chữ cái với âm đọc",
    "アルファベットと音を結びましょう",
    "알파벳과 소리를 연결하세요",
    "连接字母和读音",
  );
  if (scriptLabel !== "alphabet") {
    e1.prompt = "Match each character with its reading.";
    e1.promptVi = "Nối mỗi chữ với cách đọc đúng.";
    e1.promptByNative = promptMap(
      "Match each character with its reading.",
      "Nối mỗi chữ với cách đọc đúng.",
      "文字と読みを組み合わせてください。",
      "글자와 읽기를 짝지으세요.",
      "将字符与读音配对。",
    );
  }

  const exercises = [
    e1,
    exListenAndChooseCharacter(`${id}-e2`, c1, pool),
    exChooseReading(`${id}-e3`, c1, pool),
    exFillBlank(`${id}-e4`, fillSentence, blankWord, fillOptions, null),
    exChooseCharacterBySound(`${id}-e5`, c2, pool),
    exChooseMeaning(`${id}-e6`, c0, pool),
    exSequenceNext(`${id}-e7`, focus, pool),
    exListeningGapFill(`${id}-e8`, gapSentences),
    exControlledAiQa(
      `${id}-e9`,
      aiQuestion ?? {
        en: `Name these ${scriptLabel} characters in order: ${focusChars.join(", ")}.`,
        vi: `Nêu các chữ ${scriptLabelVi} theo thứ tự: ${focusChars.join(", ")}.`,
        ja: `次の文字を順番に言ってください：${focusChars.join(", ")}。`,
        ko: `다음 글자를 순서대로 말하세요: ${focusChars.join(", ")}.`,
        zh: `按顺序说出这些字符：${focusChars.join(", ")}。`,
      },
      focusChars.join(" "),
    ),
    exAiFeedbackReview(`${id}-e10`),
  ];

  if (exercises.length !== 10) {
    throw new Error(`Lesson ${id}: expected 10 exercises, got ${exercises.length}`);
  }
  const expectedTypes = [
    "matchPairs",
    "listenAndChoose",
    "chooseCorrectAnswer",
    "fillBlank",
    "chooseVocabulary",
    "chooseMeaning",
    "typeAnswer",
    "listeningGapFill",
    "controlledAiQa",
    "aiFeedbackReview",
  ];
  exercises.forEach((ex, i) => {
    if (ex.type !== expectedTypes[i]) {
      throw new Error(`Lesson ${id}: e${i + 1} expected ${expectedTypes[i]}, got ${ex.type}`);
    }
    if (i < 7 && (ex.access !== "free" || ex.plusOnly)) {
      throw new Error(`Lesson ${id}: exercise ${i + 1} must be free`);
    }
    if (i >= 7 && (ex.access !== "plus" || !ex.plusOnly)) {
      throw new Error(`Lesson ${id}: exercise ${i + 1} must be Plus`);
    }
  });
  return exercises;
}

function buildHiraganaAiueoExercises({ id, vocab }) {
  const byChar = new Map(vocab.map((entry) => [entry.displayText, entry]));
  const a = byChar.get("あ");
  const i = byChar.get("い");
  const u = byChar.get("う");
  const e = byChar.get("え");
  const o = byChar.get("お");
  if (!a || !i || !u || !e || !o) {
    throw new Error(`${id}: Hiragana あいうえお vocabulary is incomplete`);
  }

  const focus = [a, i, u, e, o];
  // Keep left column in gojuon order; Flutter shuffles right-side answers for display.
  const orderedPairs = focus.map((entry) => ({
    left: entry.displayText,
    right: entry.romanization,
  }));
  const readingPairs = Object.fromEntries(
    NATIVE_CODES.map((code) => [code, orderedPairs]),
  );
  const e1 = baseExercise(
    `${id}-e1`,
    "matchPairs",
    "free",
    promptMap(
      "Match Hiragana with its sound",
      "Nối chữ Hiragana với âm đọc",
      "ひらがなと読み方を結びましょう",
      "히라가나와 소리를 연결하세요",
      "连接平假名和读音",
    ),
    {
      instructionByNative: t({
        en: "Select a character on the left, then select the correct sound on the right.",
        vi: "Chọn một chữ bên trái, rồi chọn âm đọc đúng bên phải.",
        ja: "左の文字を選び、右の正しい読み方を選びましょう。",
        ko: "왼쪽의 글자를 고른 다음 오른쪽의 올바른 소리를 고르세요.",
        zh: "先选择左边的字符，再选择右边正确的读音。",
      }),
      pairs: orderedPairs,
      pairsVi: orderedPairs,
      pairsByNative: readingPairs,
      correctAnswer: orderedPairs.map((p) => p.right).join("|"),
      skill: "reading",
      matchPairMode: "kana_reading",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. Bạn đã nối đúng chữ với âm đọc.",
        "Correct. You matched the character with the right sound.",
        "正解です。文字と読み方を正しく結びました。",
        "맞아요. 글자와 소리를 올바르게 연결했어요.",
        "正确。你把字符和读音连接对了。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Hãy nhìn lại chữ và chọn âm đọc phù hợp.",
        "Not quite. Look at the character again and choose the matching sound.",
        "まだ違います。文字をもう一度見て、合う読み方を選びましょう。",
        "아직 아니에요. 글자를 다시 보고 맞는 소리를 골라 보세요.",
        "还不对。再看看字符，选择对应的读音。",
      ),
    },
  );

  const e2 = exFixedMultipleChoice(
    `${id}-e2`,
    "listenAndChoose",
    promptMap(
      "Listen to the pronunciation and choose the correct character.",
      "Nghe phát âm và chọn chữ đúng.",
      "発音を聞いて正しい文字を選んでください。",
      "발음을 듣고 올바른 글자를 고르세요.",
      "听发音并选择正确的字符。",
    ),
    {
      displayText: "🔊",
      speechText: "い",
      hideSpeechLabel: true,
      ...AUDIO_LABEL_LISTEN,
      options: ["あ", "い", "う", "え"],
      correctAnswer: "い",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. Âm bạn nghe là 'i', viết bằng Hiragana là い. Ví dụ: いぬ（犬） nghĩa là chó.",
        "Correct. The sound is 'i', written in Hiragana as い. Example: いぬ（犬） means dog.",
        "正解です。聞こえた音は「i」で、ひらがなでは い です。例：いぬ（犬）。",
        "맞아요. 들은 소리는 'i'이고 히라가나로 い입니다. 예: いぬ（犬）.",
        "正确。你听到的音是“i”，平假名写作 い。例：いぬ（犬）。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Hãy nghe lại âm 'i'. Chữ đúng là い. Ví dụ: いぬ（犬） nghĩa là chó.",
        "Not yet. Listen again for 'i'. The correct character is い. Example: いぬ（犬） means dog.",
        "まだ違います。「i」の音をもう一度聞きましょう。正解は い です。",
        "아직 아니에요. 'i' 소리를 다시 들어 보세요. 정답은 い입니다.",
        "还不对。再听一次“i”的音。正确答案是 い。",
      ),
      skill: "listening",
    },
  );

  const e3 = exFixedMultipleChoice(
    `${id}-e3`,
    "chooseReading",
    promptMap(
      "How is this character read?",
      "Chữ này đọc là gì?",
      "この文字の読みは何ですか？",
      "이 글자는 어떻게 읽나요?",
      "这个字怎么读？",
    ),
    {
      displayText: "う",
      speechText: "う",
      options: ["a", "i", "u", "e"],
      correctAnswer: "u",
      answerVisibleOk: true,
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. う đọc là 'u'. Ví dụ: うみ（海） nghĩa là biển.",
        "Correct. う is read as 'u'. Example: うみ（海） means sea.",
        "正解です。う は「u」と読みます。例：うみ（海）。",
        "맞아요. う는 'u'로 읽습니다. 예: うみ（海）.",
        "正确。う 读作“u”。例：うみ（海）表示海。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. う đọc là 'u', như trong うみ（海）.",
        "Not yet. う is read as 'u', as in うみ（海）.",
        "まだ違います。う は「u」と読みます。例：うみ（海）。",
        "아직 아니에요. う는 'u'로 읽습니다. 예: うみ（海）.",
        "还不对。う 读作“u”，如 うみ（海）。",
      ),
      skill: "reading",
    },
  );

  const e4 = exFixedMultipleChoice(
    `${id}-e4`,
    "fillMissingCharacter",
    promptMap(
      "Fill in the missing character in the Hiragana sequence.",
      "Điền chữ còn thiếu trong chuỗi Hiragana.",
      "ひらがなの順番で抜けている文字を選んでください。",
      "히라가나 순서에서 빠진 글자를 고르세요.",
      "填入平假名顺序中缺少的字符。",
    ),
    {
      displayText: "あ _ う え お",
      options: ["い", "か", "え", "お"],
      correctAnswer: "い",
      sequenceMode: "gojuon_fill_missing",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. Thứ tự chuẩn là あ → い → う → え → お. Ví dụ với い: いぬ（犬） nghĩa là chó.",
        "Correct. The standard order is あ → い → う → え → お. With い: いぬ（犬） means dog.",
        "正解です。順番は あ → い → う → え → お です。例：いぬ（犬）。",
        "맞아요. 순서는 あ → い → う → え → お입니다. 예: いぬ（犬）.",
        "正确。标准顺序是 あ → い → う → え → お。例：いぬ（犬）。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Sau あ là い, nên chuỗi đúng là あ い う え お.",
        "Not yet. After あ comes い, so the correct sequence is あ い う え お.",
        "まだ違います。あ の次は い です。正しい順番は あ い う え お です。",
        "아직 아니에요. あ 다음은 い입니다. 올바른 순서는 あ い う え お입니다.",
        "还不对。あ 后面是 い，正确顺序是 あ い う え お。",
      ),
      skill: "review",
    },
  );

  const e5 = exFixedMultipleChoice(
    `${id}-e5`,
    "soundToCharacter",
    promptMap(
      "Choose the character for the sound 'e'.",
      "Chọn chữ có âm 'e'.",
      "「e」の音の文字を選んでください。",
      "'e' 소리의 글자를 고르세요.",
      "选择发“e”音的字符。",
    ),
    {
      displayText: "e",
      options: ["あ", "い", "え", "お"],
      correctAnswer: "え",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. Âm 'e' viết bằng Hiragana là え. Ví dụ: えき（駅） nghĩa là nhà ga.",
        "Correct. The sound 'e' is written in Hiragana as え. Example: えき（駅） means station.",
        "正解です。「e」の音は え です。例：えき（駅）。",
        "맞아요. 'e' 소리는 히라가나로 え입니다. 예: えき（駅）.",
        "正确。“e”的音用平假名写作 え。例：えき（駅）。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Âm 'e' tương ứng với chữ え.",
        "Not yet. The sound 'e' matches え.",
        "まだ違います。「e」の音は え です。",
        "아직 아니에요. 'e' 소리는 え입니다.",
        "还不对。“e”的音对应 え。",
      ),
      skill: "reading",
    },
  );

  const e6 = exFixedMultipleChoice(
    `${id}-e6`,
    "nextInSequence",
    promptMap(
      "What character comes next?",
      "Chữ tiếp theo là gì?",
      "次の文字は何ですか？",
      "다음 글자는 무엇인가요?",
      "下一个字符是什么？",
    ),
    {
      displayText: "あ → い → ?",
      options: ["え", "う", "お", "か"],
      correctAnswer: "う",
      sequenceMode: "gojuon_next",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. Thứ tự là あ → い → う. Ví dụ với う: うみ（海） nghĩa là biển.",
        "Correct. The order is あ → い → う. With う: うみ（海） means sea.",
        "正解です。順番は あ → い → う です。例：うみ（海）。",
        "맞아요. 순서는 あ → い → う입니다. 예: うみ（海）.",
        "正确。顺序是 あ → い → う。例：うみ（海）。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Sau あ và い là う.",
        "Not yet. After あ and い comes う.",
        "まだ違います。あ、い の次は う です。",
        "아직 아니에요. あ와 い 다음은 う입니다.",
        "还不对。あ 和 い 后面是 う。",
      ),
      skill: "review",
    },
  );

  const e7 = exFixedMultipleChoice(
    `${id}-e7`,
    "chooseCorrectPair",
    promptMap(
      "Which pair correctly matches the Hiragana character with its reading?",
      "Cặp nào ghép đúng chữ Hiragana với cách đọc?",
      "ひらがなと読みの正しい組み合わせはどれですか？",
      "히라가나와 읽기가 올바르게 짝지어진 것은 무엇인가요?",
      "哪一组平假名和读音匹配正确？",
    ),
    {
      displayText: "あ / い / え / お",
      options: ["あ → i", "い → u", "え → e", "お → a"],
      correctAnswer: "え → e",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. え đọc là 'e'. Ví dụ: えき（駅） nghĩa là nhà ga.",
        "Correct. え is read as 'e'. Example: えき（駅） means station.",
        "正解です。え は「e」と読みます。例：えき（駅）。",
        "맞아요. え는 'e'로 읽습니다. 예: えき（駅）.",
        "正确。え 读作“e”。例：えき（駅）表示车站。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Cặp đúng là え → e. あ đọc là a, い đọc là i, お đọc là o.",
        "Not yet. The correct pair is え → e. あ is a, い is i, and お is o.",
        "まだ違います。正しい組み合わせは え → e です。あ は a、い は i、お は o です。",
        "아직 아니에요. 올바른 짝은 え → e입니다. あ는 a, い는 i, お는 o입니다.",
        "还不对。正确组合是 え → e。あ 读 a，い 读 i，お 读 o。",
      ),
      skill: "reading",
    },
  );

  const subQuestions = [
    plusListeningSubQuestion({
      id: `${id}-e8-s1`,
      speechText: "あさ",
      wordDisplay: "あさ（朝）",
      meanings: { vi: "buổi sáng", en: "morning", ja: "朝", ko: "아침", zh: "早晨" },
      options: ["あ", "い", "う", "え"],
      correctAnswer: "あ",
      feedbackCorrect: feedbackMap(
        "Đúng rồi. あさ（朝） nghĩa là buổi sáng. Từ này bắt đầu bằng あ.",
        "Correct. あさ（朝） means morning. This word starts with あ.",
        "正解です。あさ（朝）は「朝」という意味です。この単語は「あ」から始まります。",
        "맞아요. あさ（朝）는 아침이라는 뜻입니다. 이 단어는 あ로 시작합니다.",
        "正确。あさ（朝）的意思是早晨。这个词以「あ」开头。",
      ),
      feedbackWrong: feedbackMap(
        "Chưa đúng. あさ（朝） nghĩa là buổi sáng. Từ này bắt đầu bằng あ.",
        "Not quite. あさ（朝） means morning. This word starts with あ.",
        "まだ違います。あさ（朝）は「朝」という意味です。この単語は「あ」から始まります。",
        "아직 아니에요. あさ（朝）는 아침이라는 뜻입니다. 이 단어는 あ로 시작합니다.",
        "还不对。あさ（朝）的意思是早晨。这个词以「あ」开头。",
      ),
    }),
    plusListeningSubQuestion({
      id: `${id}-e8-s2`,
      speechText: "いんしょう",
      wordDisplay: "いんしょう（印象）",
      meanings: { vi: "ấn tượng", en: "impression", ja: "印象", ko: "인상", zh: "印象" },
      options: ["あ", "い", "う", "お"],
      correctAnswer: "い",
      feedbackCorrect: feedbackMap(
        "Đúng rồi. いんしょう（印象） nghĩa là ấn tượng. Từ này bắt đầu bằng い.",
        "Correct. いんしょう（印象） means impression. This word starts with い.",
        "正解です。いんしょう（印象）は「印象」という意味です。この単語は「い」から始まります。",
        "맞아요. いんしょう（印象）는 인상이라는 뜻입니다. 이 단어는 い로 시작합니다.",
        "正确。いんしょう（印象）的意思是印象。这个词以「い」开头。",
      ),
      feedbackWrong: feedbackMap(
        "Chưa đúng. いんしょう（印象） nghĩa là ấn tượng. Từ này bắt đầu bằng い.",
        "Not quite. いんしょう（印象） means impression. This word starts with い.",
        "まだ違います。いんしょう（印象）は「印象」という意味です。この単語は「い」から始まります。",
        "아직 아니에요. いんしょう（印象）는 인상이라는 뜻입니다. 이 단어는 い로 시작합니다.",
        "还不对。いんしょう（印象）的意思是印象。这个词以「い」开头。",
      ),
    }),
    plusListeningSubQuestion({
      id: `${id}-e8-s3`,
      speechText: "うみ",
      wordDisplay: "うみ（海）",
      meanings: { vi: "biển", en: "sea", ja: "海", ko: "바다", zh: "海" },
      options: ["え", "あ", "う", "お"],
      correctAnswer: "う",
      feedbackCorrect: feedbackMap(
        "Đúng rồi. うみ（海） nghĩa là biển. Từ này bắt đầu bằng う.",
        "Correct. うみ（海） means sea. This word starts with う.",
        "正解です。うみ（海）は「海」という意味です。この単語は「う」から始まります。",
        "맞아요. うみ（海）는 바다라는 뜻입니다. 이 단어는 う로 시작합니다.",
        "正确。うみ（海）的意思是海。这个词以「う」开头。",
      ),
      feedbackWrong: feedbackMap(
        "Chưa đúng. うみ（海） nghĩa là biển. Từ này bắt đầu bằng う.",
        "Not quite. うみ（海） means sea. This word starts with う.",
        "まだ違います。うみ（海）は「海」という意味です。この単語は「う」から始まります。",
        "아직 아니에요. うみ（海）는 바다라는 뜻입니다. 이 단어는 う로 시작합니다.",
        "还不对。うみ（海）的意思是海。这个词以「う」开头。",
      ),
    }),
    plusListeningSubQuestion({
      id: `${id}-e8-s4`,
      speechText: "えいが",
      wordDisplay: "えいが（映画）",
      meanings: { vi: "phim", en: "movie", ja: "映画", ko: "영화", zh: "电影" },
      options: ["い", "え", "お", "あ"],
      correctAnswer: "え",
      feedbackCorrect: feedbackMap(
        "Đúng rồi. えいが（映画） nghĩa là phim. Từ này bắt đầu bằng え.",
        "Correct. えいが（映画） means movie. This word starts with え.",
        "正解です。えいが（映画）は「映画」という意味です。この単語は「え」から始まります。",
        "맞아요. えいが（映画）는 영화라는 뜻입니다. 이 단어는 え로 시작합니다.",
        "正确。えいが（映画）的意思是电影。这个词以「え」开头。",
      ),
      feedbackWrong: feedbackMap(
        "Chưa đúng. えいが（映画） nghĩa là phim. Từ này bắt đầu bằng え.",
        "Not quite. えいが（映画） means movie. This word starts with え.",
        "まだ違います。えいが（映画）は「映画」という意味です。この単語は「え」から始まります。",
        "아직 아니에요. えいが（映画）는 영화라는 뜻입니다. 이 단어는 え로 시작합니다.",
        "还不对。えいが（映画）的意思是电影。这个词以「え」开头。",
      ),
    }),
    plusListeningSubQuestion({
      id: `${id}-e8-s5`,
      speechText: "おかね",
      wordDisplay: "おかね（お金）",
      meanings: { vi: "tiền", en: "money", ja: "お金", ko: "돈", zh: "钱" },
      options: ["う", "え", "あ", "お"],
      correctAnswer: "お",
      feedbackCorrect: feedbackMap(
        "Đúng rồi. おかね（お金） nghĩa là tiền. Từ này bắt đầu bằng お.",
        "Correct. おかね（お金） means money. This word starts with お.",
        "正解です。おかね（お金）は「お金」という意味です。この単語は「お」から始まります。",
        "맞아요. おかね（お金）는 돈이라는 뜻입니다. 이 단어는 お로 시작합니다.",
        "正确。おかね（お金）的意思是钱。这个词以「お」开头。",
      ),
      feedbackWrong: feedbackMap(
        "Chưa đúng. おかね（お金） nghĩa là tiền. Từ này bắt đầu bằng お.",
        "Not quite. おかね（お金） means money. This word starts with お.",
        "まだ違います。おかね（お金）は「お金」という意味です。この単語は「お」から始まります。",
        "아직 아니에요. おかね（お金）는 돈이라는 뜻입니다. 이 단어는 お로 시작합니다.",
        "还不对。おかね（お金）的意思是钱。这个词以「お」开头。",
      ),
    }),
  ].map((question) => ({
    ...question,
    optionsVi: question.options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((code) => [code, question.options])),
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((code) => [code, [question.correctAnswer]]),
    ),
    feedback: {
      correct: question.feedbackCorrectByNative,
      wrong: question.feedbackWrongByNative,
    },
  }));

  const e8 = exPlusListeningVocabularyChallenge(`${id}-e8`, subQuestions);

  const e9 = exControlledAiQa(
    `${id}-e9`,
    {
      en: "Among あ い う え お, which character is read as 'u'?",
      vi: "Trong 5 chữ あ い う え お, chữ nào đọc là 'u'?",
      ja: "あ い う え お の中で「u」と読む文字はどれですか？",
      ko: "あ い う え お 중에서 'u'로 읽는 글자는 무엇인가요?",
      zh: "在 あ い う え お 中，哪个字符读作“u”？",
    },
    "う",
  );
  e9.expectedAnswer = "う";
  e9.feedbackByNative = feedbackMap(
    "Đúng rồi. う đọc là 'u'. Ví dụ: うみ（海） nghĩa là biển.",
    "Correct. う is read as 'u'. Example: うみ（海） means sea.",
    "正解です。う は「u」と読みます。例：うみ（海）。",
    "맞아요. う는 'u'로 읽습니다. 예: うみ（海）.",
    "正确。う 读作“u”。例：うみ（海）表示海。",
  );

  const e10 = exAiFeedbackReview(`${id}-e10`);
  e10.displayTextByNative = {
    en: "あ い う え お\nあ → い → う → え → お\nあめ（雨）— rain\nいぬ（犬）— dog\nうみ（海）— sea\nえき（駅）— station\nおに（鬼）— demon / ogre",
    vi: "あ い う え お\nあ → い → う → え → お\nあめ（雨）— mưa\nいぬ（犬）— chó\nうみ（海）— biển\nえき（駅）— nhà ga\nおに（鬼）— quỷ / yêu quái",
    ja: "あ い う え お\nあ → い → う → え → お\nあめ（雨）\nいぬ（犬）\nうみ（海）\nえき（駅）\nおに（鬼）",
    ko: "あ い う え お\nあ → い → う → え → お\nあめ（雨）— 비\nいぬ（犬）— 개\nうみ（海）— 바다\nえき（駅）— 역\nおに（鬼）— 도깨비",
    zh: "あ い う え お\nあ → い → う → え → お\nあめ（雨）— 雨\nいぬ（犬）— 狗\nうみ（海）— 海\nえき（駅）— 车站\nおに（鬼）— 鬼",
  };
  e10.displayText = e10.displayTextByNative.en;
  e10.reviewPointsByNative = {
    en: [
      "Review: あ い う え お",
      "Order: あ → い → う → え → お",
      "Examples: あめ（雨） rain, いぬ（犬） dog, うみ（海） sea, えき（駅） station, おに（鬼） demon / ogre",
    ],
    vi: [
      "Nhắc lại 5 chữ: あ い う え お",
      "Thứ tự: あ → い → う → え → お",
      "Ví dụ: あめ（雨） mưa, いぬ（犬） chó, うみ（海） biển, えき（駅） nhà ga, おに（鬼） quỷ / yêu quái",
    ],
    ja: [
      "復習：あ い う え お",
      "順番：あ → い → う → え → お",
      "例：あめ（雨）、いぬ（犬）、うみ（海）、えき（駅）、おに（鬼）",
    ],
    ko: [
      "복습: あ い う え お",
      "순서: あ → い → う → え → お",
      "예: あめ（雨）, いぬ（犬）, うみ（海）, えき（駅）, おに（鬼）",
    ],
    zh: [
      "复习：あ い う え お",
      "顺序：あ → い → う → え → お",
      "例：あめ（雨）、いぬ（犬）、うみ（海）、えき（駅）、おに（鬼）",
    ],
  };

  const exercises = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10];
  exercises.forEach((exercise, index) => {
    if (index < 7 && (exercise.access !== "free" || exercise.plusOnly)) {
      throw new Error(`${id}: exercise ${index + 1} must be Free`);
    }
    if (index >= 7 && (exercise.access !== "plus" || !exercise.plusOnly)) {
      throw new Error(`${id}: exercise ${index + 1} must be Plus`);
    }
  });
  return exercises;
}

function assertHiraganaFreePlus(id, exercises) {
  if (exercises.length !== 10) {
    throw new Error(`${id}: expected 10 exercises, got ${exercises.length}`);
  }
  exercises.forEach((exercise, index) => {
    if (index < 7 && (exercise.access !== "free" || exercise.plusOnly)) {
      throw new Error(`${id}: exercise ${index + 1} must be Free`);
    }
    if (index >= 7 && (exercise.access !== "plus" || !exercise.plusOnly)) {
      throw new Error(`${id}: exercise ${index + 1} must be Plus`);
    }
  });
}

function hiraganaListeningFeedback(wordDisplay, meanings, correct, { targetMode = "first" } = {}) {
  const meaningLine = (code) => meanings[code];
  const viHint =
    targetMode === "target"
      ? `Chữ mục tiêu là ${correct}.`
      : `Từ này bắt đầu bằng ${correct}.`;
  const enHint =
    targetMode === "target"
      ? `The target character is ${correct}.`
      : `This word starts with ${correct}.`;
  const jaHint =
    targetMode === "target"
      ? `目標の文字は ${correct} です。`
      : `この単語は「${correct}」から始まります。`;
  const koHint =
    targetMode === "target"
      ? `목표 글자는 ${correct}입니다.`
      : `이 단어는 ${correct}로 시작합니다.`;
  const zhHint =
    targetMode === "target"
      ? `目标字符是 ${correct}。`
      : `这个词以「${correct}」开头。`;
  return {
    correct: feedbackMap(
      `Đúng rồi. ${wordDisplay} nghĩa là ${meaningLine("vi")}. ${viHint}`,
      `Correct. ${wordDisplay} means ${meaningLine("en")}. ${enHint}`,
      `正解です。${wordDisplay}は「${meaningLine("ja")}」という意味です。${jaHint}`,
      `맞아요. ${wordDisplay}는 ${meaningLine("ko")}라는 뜻입니다. ${koHint}`,
      `正确。${wordDisplay}的意思是${meaningLine("zh")}。${zhHint}`,
    ),
    wrong: feedbackMap(
      `Chưa đúng. ${wordDisplay} nghĩa là ${meaningLine("vi")}. ${viHint}`,
      `Not quite. ${wordDisplay} means ${meaningLine("en")}. ${enHint}`,
      `まだ違います。${wordDisplay}は「${meaningLine("ja")}」という意味です。${jaHint}`,
      `아직 아니에요. ${wordDisplay}는 ${meaningLine("ko")}라는 뜻입니다. ${koHint}`,
      `还不对。${wordDisplay}的意思是${meaningLine("zh")}。${zhHint}`,
    ),
  };
}

function buildHiraganaLessonExercisesFromSpec({ id, vocab, spec }) {
  const byChar = new Map(vocab.map((entry) => [entry.displayText, entry]));
  for (const ch of spec.requiredChars) {
    if (!byChar.has(ch)) {
      throw new Error(`${id}: missing vocabulary for ${ch}`);
    }
  }

  const orderedPairs = vocab.map((entry) => ({
    left: entry.displayText,
    right: entry.romanization,
  }));
  const readingPairs = Object.fromEntries(
    NATIVE_CODES.map((code) => [code, orderedPairs]),
  );

  const e1 = baseExercise(
    `${id}-e1`,
    "matchPairs",
    "free",
    promptMap(
      "Match Hiragana with its sound",
      "Nối chữ Hiragana với âm đọc",
      "ひらがなと読み方を結びましょう",
      "히라가나와 소리를 연결하세요",
      "连接平假名和读音",
    ),
    {
      instructionByNative: t({
        en: "Select a character on the left, then select the correct sound on the right.",
        vi: "Chọn một chữ bên trái, rồi chọn âm đọc đúng bên phải.",
        ja: "左の文字を選び、右の正しい読み方を選びましょう。",
        ko: "왼쪽의 글자를 고른 다음 오른쪽의 올바른 소리를 고르세요.",
        zh: "先选择左边的字符，再选择右边正确的读音。",
      }),
      pairs: orderedPairs,
      pairsVi: orderedPairs,
      pairsByNative: readingPairs,
      correctAnswer: orderedPairs.map((p) => p.right).join("|"),
      skill: "reading",
      matchPairMode: "kana_reading",
      feedbackCorrectByNative: feedbackMap(
        "Đúng rồi. Bạn đã nối đúng chữ với âm đọc.",
        "Correct. You matched the character with the right sound.",
        "正解です。文字と読み方を正しく結びました。",
        "맞아요. 글자와 소리를 올바르게 연결했어요.",
        "正确。你把字符和读音连接对了。",
      ),
      feedbackWrongByNative: feedbackMap(
        "Chưa đúng. Hãy nhìn lại chữ và chọn âm đọc phù hợp.",
        "Not quite. Look at the character again and choose the matching sound.",
        "まだ違います。文字をもう一度見て、合う読み方を選びましょう。",
        "아직 아니에요. 글자를 다시 보고 맞는 소리를 골라 보세요.",
        "还不对。再看看字符，选择对应的读音。",
      ),
    },
  );

  const e2 = exFixedMultipleChoice(
    `${id}-e2`,
    "listenAndChoose",
    promptMap(
      "Listen to the pronunciation and choose the correct character.",
      "Nghe phát âm và chọn chữ đúng.",
      "発音を聞いて正しい文字を選んでください。",
      "발음을 듣고 올바른 글자를 고르세요.",
      "听发音并选择正确的字符。",
    ),
    {
      displayText: "🔊",
      speechText: spec.listen.speechText,
      hideSpeechLabel: true,
      ...AUDIO_LABEL_LISTEN,
      options: spec.listen.options,
      correctAnswer: spec.listen.correct,
      feedbackCorrectByNative: spec.listen.feedbackCorrect,
      feedbackWrongByNative: spec.listen.feedbackWrong,
      skill: "listening",
    },
  );

  const e3 = exFixedMultipleChoice(
    `${id}-e3`,
    "chooseReading",
    promptMap(
      "How is this character read?",
      "Chữ này đọc là gì?",
      "この文字の読みは何ですか？",
      "이 글자는 어떻게 읽나요?",
      "这个字怎么读？",
    ),
    {
      displayText: spec.chooseReading.visible,
      speechText: spec.chooseReading.visible,
      options: spec.chooseReading.options,
      correctAnswer: spec.chooseReading.correct,
      answerVisibleOk: true,
      feedbackCorrectByNative: spec.chooseReading.feedbackCorrect,
      feedbackWrongByNative: spec.chooseReading.feedbackWrong,
      skill: "reading",
    },
  );

  const e4 = exFixedMultipleChoice(
    `${id}-e4`,
    "fillMissingCharacter",
    promptMap(
      "Fill in the missing character in the Hiragana sequence.",
      "Điền chữ còn thiếu trong chuỗi Hiragana.",
      "ひらがなの順番で抜けている文字を選んでください。",
      "히라가나 순서에서 빠진 글자를 고르세요.",
      "填入平假名顺序中缺少的字符。",
    ),
    {
      displayText: spec.fillMissing.visible,
      options: spec.fillMissing.options,
      correctAnswer: spec.fillMissing.correct,
      sequenceMode: "gojuon_fill_missing",
      feedbackCorrectByNative: spec.fillMissing.feedbackCorrect,
      feedbackWrongByNative: spec.fillMissing.feedbackWrong,
      skill: "review",
    },
  );

  const e5 = exFixedMultipleChoice(
    `${id}-e5`,
    "soundToCharacter",
    promptMap(
      `Choose the character for the sound '${spec.soundToCharacter.clue}'.`,
      `Chọn chữ có âm '${spec.soundToCharacter.clue}'.`,
      `「${spec.soundToCharacter.clue}」の音の文字を選んでください。`,
      `'${spec.soundToCharacter.clue}' 소리의 글자를 고르세요.`,
      `选择发“${spec.soundToCharacter.clue}”音的字符。`,
    ),
    {
      displayText: spec.soundToCharacter.clue,
      options: spec.soundToCharacter.options,
      correctAnswer: spec.soundToCharacter.correct,
      feedbackCorrectByNative: spec.soundToCharacter.feedbackCorrect,
      feedbackWrongByNative: spec.soundToCharacter.feedbackWrong,
      skill: "reading",
    },
  );

  const e6 = exFixedMultipleChoice(
    `${id}-e6`,
    "nextInSequence",
    promptMap(
      "What character comes next?",
      "Chữ tiếp theo là gì?",
      "次の文字は何ですか？",
      "다음 글자는 무엇인가요?",
      "下一个字符是什么？",
    ),
    {
      displayText: spec.nextInSequence.visible,
      options: spec.nextInSequence.options,
      correctAnswer: spec.nextInSequence.correct,
      sequenceMode: "gojuon_next",
      feedbackCorrectByNative: spec.nextInSequence.feedbackCorrect,
      feedbackWrongByNative: spec.nextInSequence.feedbackWrong,
      skill: "review",
    },
  );

  const e7 = exFixedMultipleChoice(
    `${id}-e7`,
    "chooseCorrectPair",
    promptMap(
      "Which pair correctly matches the Hiragana character with its reading?",
      "Cặp nào ghép đúng chữ Hiragana với cách đọc?",
      "ひらがなと読みの正しい組み合わせはどれですか？",
      "히라가나와 읽기가 올바르게 짝지어진 것은 무엇인가요?",
      "哪一组平假名和读音匹配正确？",
    ),
    {
      displayText: spec.chooseCorrectPair.displayText,
      options: spec.chooseCorrectPair.options,
      correctAnswer: spec.chooseCorrectPair.correct,
      feedbackCorrectByNative: spec.chooseCorrectPair.feedbackCorrect,
      feedbackWrongByNative: spec.chooseCorrectPair.feedbackWrong,
      skill: "reading",
    },
  );

  const listeningTargetMode = spec.listeningTargetMode ?? "first";
  const subPrompts =
    listeningTargetMode === "target"
      ? promptMap(
          "Listen to the word or phrase and choose the target Hiragana you hear.",
          "Nghe từ/cụm từ và chọn chữ Hiragana mục tiêu bạn nghe thấy.",
          "単語やフレーズを聞いて、聞こえたひらがなを選びましょう。",
          "단어나 표현을 듣고 들리는 히라가나를 고르세요.",
          "听单词或短语，选择你听到的目标平假名。",
        )
      : undefined;

  const subQuestions = spec.listeningItems.map((item, index) => {
    const entry = byChar.get(item.correct);
    if (!entry) throw new Error(`${id}: listening item missing vocab ${item.correct}`);
    const wordDisplay = item.revealDisplay ?? entry.exampleText;
    const meanings = item.meanings ?? entry.exampleTranslations;
    const fb = hiraganaListeningFeedback(wordDisplay, meanings, item.correct, {
      targetMode: listeningTargetMode,
    });
    return plusListeningSubQuestion({
      id: `${id}-e8-s${index + 1}`,
      speechText: item.speechText,
      wordDisplay,
      meanings,
      options: item.options,
      correctAnswer: item.correct,
      feedbackCorrect: fb.correct,
      feedbackWrong: fb.wrong,
      prompts: subPrompts,
    });
  }).map((question) => ({
    ...question,
    optionsVi: question.options,
    optionsByNative: Object.fromEntries(NATIVE_CODES.map((code) => [code, question.options])),
    acceptedAnswersByNative: Object.fromEntries(
      NATIVE_CODES.map((code) => [code, [question.correctAnswer]]),
    ),
    feedback: {
      correct: question.feedbackCorrectByNative,
      wrong: question.feedbackWrongByNative,
    },
  }));

  const e8PromptOverride =
    listeningTargetMode === "target"
      ? promptMap(
          "Listen to the word or phrase and choose the target Hiragana you hear.",
          "Nghe từ/cụm từ và chọn chữ Hiragana mục tiêu bạn nghe thấy.",
          "単語やフレーズを聞いて、聞こえたひらがなを選びましょう。",
          "단어나 표현을 듣고 들리는 히라가나를 고르세요.",
          "听单词或短语，选择你听到的目标平假名。",
        )
      : undefined;
  const e8 = exPlusListeningVocabularyChallenge(`${id}-e8`, subQuestions, e8PromptOverride);

  const e9 = exControlledAiQa(`${id}-e9`, spec.aiQa.questionByNative, spec.aiQa.expectedAnswer);
  e9.expectedAnswer = spec.aiQa.expectedAnswer;
  e9.feedbackByNative = spec.aiQa.feedbackByNative;

  const e10 = exAiFeedbackReview(`${id}-e10`);
  e10.displayTextByNative = spec.review.displayTextByNative;
  e10.displayText = spec.review.displayTextByNative.en;
  e10.reviewPointsByNative = spec.review.reviewPointsByNative;

  const exercises = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10];
  assertHiraganaFreePlus(id, exercises);
  return exercises;
}

function makeLesson(fields) {
  return {
    ...fields,
    moduleId: fields.moduleId ?? "greetings",
    branch: fields.branch ?? "niche",
    comingSoon: false,
  };
}

function makeCourse({
  courseId,
  languageCode,
  nicheId,
  branch = "niche",
  moduleId = "greetings",
  moduleTitle = "Greetings",
  moduleTitleVi = "Chào hỏi",
  title,
  titleVi,
  description,
  descriptionVi,
  order = 1,
  units,
  lessons,
}) {
  // Per-course/module unit numbers must be continuous 1..N (never global blueprint ids).
  const normalizedUnits = units.map((unit, index) => {
    const displayOrder = Number(unit.displayOrder ?? index + 1);
    return {
      ...unit,
      displayOrder,
      order: displayOrder,
    };
  });
  const normalizedLessons = lessons.map((lesson) => {
    const siblings = lessons
      .filter((item) => item.unitId === lesson.unitId)
      .slice()
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
    const displayOrder =
      siblings.findIndex((item) => item.id === lesson.id) + 1 || Number(lesson.order ?? 1);
    return {
      ...lesson,
      displayOrder,
      order: displayOrder,
    };
  });
  return {
    course: {
      id: courseId ?? `${languageCode}-${nicheId}`,
      languageCode,
      nicheId,
      branch,
      moduleId,
      moduleTitle,
      moduleTitleVi,
      title,
      titleVi,
      description,
      descriptionVi,
      levelCode: "A0",
      order,
      unitIds: normalizedUnits.map((u) => u.id),
      isComingSoon: false,
      units: normalizedUnits,
    },
    lessons: normalizedLessons,
  };
}

function kanaExample(ex) {
  const translations = t(ex.translations);
  return {
    exampleText: ex.text,
    exampleReading: ex.reading ?? ex.text,
    exampleRomanization: ex.romanization,
    exampleSpeechText: ex.speechText ?? ex.reading ?? ex.text,
    exampleTranslations: translations,
    // Legacy aliases used by older adapters / UI.
    exampleSentence: ex.text,
    exampleSentenceVi: translations.vi,
    exampleDisplay: ex.text,
    exampleSpeechTextLegacy: ex.speechText ?? ex.text,
  };
}

function kanaItem(char, romaji, example, { script = "hiragana", idPrefix = "ja-kana", order, row, meaning, idKey } = {}) {
  const meaningMap =
    meaning ??
    (script === "katakana"
      ? {
          en: `katakana sound ${romaji}`,
          vi: `âm ${romaji} trong katakana`,
          ja: `カタカナの${char}`,
          ko: `가타카나 ${romaji} 소리`,
          zh: `片假名 ${romaji} 音`,
        }
      : {
          en: `sound ${romaji}`,
          vi: `âm ${romaji}`,
          ja: `${char}の音`,
          ko: `${romaji} 소리`,
          zh: `${romaji} 音`,
        });
  const base = item(
    `${idPrefix}-${idKey ?? romaji}`,
    char,
    meaningMap,
    { reading: char, romanization: romaji, speechText: char },
  );
  if (!example) {
    throw new Error(`kanaItem ${char}: example word is required`);
  }
  if (example.text === char) {
    throw new Error(`kanaItem ${char}: exampleText must not equal the kana character`);
  }
  return {
    ...base,
    characterOrder: order,
    displayOrder: order,
    row,
    kanaScript: script,
    isBasicKana: Number.isInteger(order) && order >= 1 && order <= 46,
    ...kanaExample(example),
  };
}

function buildKanaLesson({
  id,
  unitId,
  order,
  title,
  titleVi,
  chars,
  distractorChars = [],
  isCheckpoint = false,
  script = "hiragana",
  moduleId = "hiragana_starter",
}) {
  const vocab = chars.map(([char, romaji, example, metadata = {}]) =>
    kanaItem(char, romaji, example, {
      script,
      idPrefix: script === "katakana" ? "ja-kata" : "ja-kana",
      ...metadata,
    }),
  );
  const distractorVocab = distractorChars.map(([char, romaji, example, metadata = {}]) =>
    kanaItem(char, romaji, example, {
      script,
      idPrefix: script === "katakana" ? "ja-kata" : "ja-kana",
      ...metadata,
    }),
  );
  const allChars = vocab.map((v) => v.displayText);
  const scriptLabel = script === "katakana" ? "katakana" : "hiragana";
  const scriptLabelVi = script === "katakana" ? "katakana" : "hiragana";
  const joinedChars = allChars.join(" / ");
  const scriptNames = script === "katakana"
    ? { ja: "カタカナ", ko: "가타카나", zh: "片假名" }
    : { ja: "ひらがな", ko: "히라가나", zh: "平假名" };
  const titleByNative = t({
    en: title,
    vi: titleVi,
    ja: `${scriptNames.ja} ${order}: ${allChars.join("")}`,
    ko: `${scriptNames.ko} ${order}: ${allChars.join("")}`,
    zh: `${scriptNames.zh} ${order}: ${allChars.join("")}`,
  });
  const descriptionByNative = t({
    en: `Learn the ${scriptLabel} characters ${joinedChars}.`,
    vi: `Học các chữ ${scriptLabelVi} ${joinedChars}.`,
    ja: `${scriptNames.ja}の文字 ${joinedChars} を学びます。`,
    ko: `${scriptNames.ko} 문자 ${joinedChars}를 배웁니다.`,
    zh: `学习${scriptNames.zh}字符 ${joinedChars}。`,
  });
  const canDoObjectiveByNative = t({
    en: `I can recognize ${allChars.join(", ")}.`,
    vi: `Tôi có thể nhận biết ${allChars.join(", ")}.`,
    ja: `${allChars.join("、")}を見分けられます。`,
    ko: `${allChars.join(", ")}를 구별할 수 있습니다.`,
    zh: `我能识别${allChars.join("、")}。`,
  });

  return makeLesson({
    id,
    languageCode: "ja",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId,
    unitId,
    order,
    level: "A0",
    template: isCheckpoint ? "miniTestLesson" : "kanaLesson",
    title,
    titleVi,
    titleByNative,
    description: descriptionByNative.en,
    descriptionVi: descriptionByNative.vi,
    descriptionByNative,
    canDoObjective: canDoObjectiveByNative.en,
    canDoObjectiveVi: canDoObjectiveByNative.vi,
    canDoObjectiveByNative,
    estimatedMinutes: isCheckpoint ? 10 : 8,
    track: "ja-core_foundation",
    vocabulary: vocab,
    keyPhrases: [],
    introPoints: vocab.map(
      (v) =>
        `${v.displayText} (${v.romanization}) — ${v.exampleText} = ${v.exampleTranslations.en}`,
    ),
    introPointsVi: vocab.map(
      (v) =>
        `${v.displayText} (${v.romanization}) — ${v.exampleText} = ${v.exampleTranslations.vi}`,
    ),
    exercises: (() => {
      const built =
        id === "ja-hiragana-u1-l1"
          ? buildHiraganaAiueoExercises({ id, vocab })
          : buildFoundationCharacterExercises({
              id,
              vocab,
              distractorVocab,
              scriptLabel,
              scriptLabelVi,
              aiQuestion: {
                en: `Name the ${scriptLabel} characters in this lesson in order.`,
                vi: `Nêu các chữ ${scriptLabelVi} trong bài theo thứ tự.`,
                ja: `このレッスンの${script === "katakana" ? "カタカナ" : "ひらがな"}を順番に言ってください。`,
                ko: `이 수업의 ${script === "katakana" ? "가타카나" : "히라가나"}를 순서대로 말하세요.`,
                zh: `按顺序说出本课的${script === "katakana" ? "片假名" : "平假名"}。`,
              },
            });
      if (script !== "katakana") return built;
      const next = [...built];
      next[7] = buildKatakanaPlusListeningE8(id);
      return next;
    })(),
  });
}

function jaHiraganaFoundationUnit1() {
  const unitId = "ja-core-foundation-hiragana-u1";
  const rows = [
    {
      id: "ja-hiragana-u1-l1",
      order: 1,
      title: "あ / い / う / え / お",
      titleVi: "あ / い / う / え / お",
      chars: [
        ["あ", "a", { text: "あめ", romanization: "ame", translations: { en: "rain", vi: "mưa", ja: "雨", ko: "비", zh: "雨" } }],
        ["い", "i", { text: "いえ", romanization: "ie", translations: { en: "house", vi: "nhà", ja: "家", ko: "집", zh: "家" } }],
        ["う", "u", { text: "うみ", romanization: "umi", translations: { en: "sea", vi: "biển", ja: "海", ko: "바다", zh: "海" } }],
        ["え", "e", { text: "えき", romanization: "eki", translations: { en: "station", vi: "nhà ga", ja: "駅", ko: "역", zh: "车站" } }],
        ["お", "o", { text: "おに", romanization: "oni", translations: { en: "demon", vi: "quỷ", ja: "鬼", ko: "도깨비", zh: "鬼" } }],
      ],
    },
    {
      id: "ja-hiragana-u1-l2",
      order: 2,
      title: "か / き / く / け / こ",
      titleVi: "か / き / く / け / こ",
      chars: [
        ["か", "ka", { text: "かさ", romanization: "kasa", translations: { en: "umbrella", vi: "ô", ja: "傘", ko: "우산", zh: "伞" } }],
        ["き", "ki", { text: "きく", romanization: "kiku", translations: { en: "chrysanthemum", vi: "cúc", ja: "菊", ko: "국화", zh: "菊" } }],
        ["く", "ku", { text: "くるま", romanization: "kuruma", translations: { en: "car", vi: "xe hơi", ja: "車", ko: "자동차", zh: "车" } }],
        ["け", "ke", { text: "けむり", romanization: "kemuri", translations: { en: "smoke", vi: "khói", ja: "煙", ko: "연기", zh: "烟" } }],
        ["こ", "ko", { text: "こども", romanization: "kodomo", translations: { en: "child", vi: "trẻ em", ja: "子供", ko: "아이", zh: "孩子" } }],
      ],
    },
    {
      id: "ja-hiragana-u1-l3",
      order: 3,
      title: "さ / し / す / せ / そ",
      titleVi: "さ / し / す / せ / そ",
      chars: [
        ["さ", "sa", { text: "さかな", romanization: "sakana", translations: { en: "fish", vi: "cá", ja: "魚", ko: "물고기", zh: "鱼" } }],
        ["し", "shi", { text: "しろ", romanization: "shiro", translations: { en: "castle", vi: "lâu đài", ja: "城", ko: "성", zh: "城" } }],
        ["す", "su", { text: "すし", romanization: "sushi", translations: { en: "sushi", vi: "sushi", ja: "寿司", ko: "스시", zh: "寿司" } }],
        ["せ", "se", { text: "せんせい", romanization: "sensei", translations: { en: "teacher", vi: "giáo viên", ja: "先生", ko: "선생님", zh: "老师" } }],
        ["そ", "so", { text: "そら", romanization: "sora", translations: { en: "sky", vi: "bầu trời", ja: "空", ko: "하늘", zh: "天空" } }],
      ],
    },
    {
      id: "ja-hiragana-u1-l4",
      order: 4,
      title: "た / ち / つ / て / と",
      titleVi: "た / ち / つ / て / と",
      chars: [
        ["た", "ta", { text: "たまご", romanization: "tamago", translations: { en: "egg", vi: "trứng", ja: "卵", ko: "달걀", zh: "蛋" } }],
        ["ち", "chi", { text: "ちず", romanization: "chizu", translations: { en: "map", vi: "bản đồ", ja: "地図", ko: "지도", zh: "地图" } }],
        ["つ", "tsu", { text: "つき", romanization: "tsuki", translations: { en: "moon", vi: "mặt trăng", ja: "月", ko: "달", zh: "月亮" } }],
        ["て", "te", { text: "てがみ", romanization: "tegami", translations: { en: "letter", vi: "lá thư", ja: "手紙", ko: "편지", zh: "信" } }],
        ["と", "to", { text: "とり", romanization: "tori", translations: { en: "bird", vi: "chim", ja: "鳥", ko: "새", zh: "鸟" } }],
      ],
    },
    {
      id: "ja-hiragana-u1-l5",
      order: 5,
      title: "な / に / ぬ / ね / の",
      titleVi: "な / に / ぬ / ね / の",
      chars: [
        ["な", "na", { text: "なつ", romanization: "natsu", translations: { en: "summer", vi: "mùa hè", ja: "夏", ko: "여름", zh: "夏天" } }],
        ["に", "ni", { text: "にく", romanization: "niku", translations: { en: "meat", vi: "thịt", ja: "肉", ko: "고기", zh: "肉" } }],
        ["ぬ", "nu", { text: "ぬの", romanization: "nuno", translations: { en: "cloth", vi: "vải", ja: "布", ko: "천", zh: "布" } }],
        ["ね", "ne", { text: "ねこ", romanization: "neko", translations: { en: "cat", vi: "mèo", ja: "猫", ko: "고양이", zh: "猫" } }],
        ["の", "no", { text: "のり", romanization: "nori", translations: { en: "seaweed", vi: "rong biển", ja: "海苔", ko: "김", zh: "紫菜" } }],
      ],
    },
  ];

  const lessons = rows.map((row) =>
    buildKanaLesson({
      id: row.id,
      unitId,
      order: row.order,
      title: row.title,
      titleVi: row.titleVi,
      chars: row.chars,
      distractorChars: row.distractorChars,
      script: "hiragana",
      moduleId: "hiragana_starter",
    }),
  );

  const checkpointChars = [
    ["あ", "a", { text: "あめ", romanization: "ame", translations: { en: "rain", vi: "mưa", ja: "雨", ko: "비", zh: "雨" } }],
    ["か", "ka", { text: "かさ", romanization: "kasa", translations: { en: "umbrella", vi: "ô", ja: "傘", ko: "우산", zh: "伞" } }],
    ["さ", "sa", { text: "さかな", romanization: "sakana", translations: { en: "fish", vi: "cá", ja: "魚", ko: "물고기", zh: "鱼" } }],
    ["た", "ta", { text: "たまご", romanization: "tamago", translations: { en: "egg", vi: "trứng", ja: "卵", ko: "달걀", zh: "蛋" } }],
    ["な", "na", { text: "なつ", romanization: "natsu", translations: { en: "summer", vi: "mùa hè", ja: "夏", ko: "여름", zh: "夏天" } }],
  ];
  lessons.push(
    buildKanaLesson({
      id: "ja-hiragana-u1-l6",
      unitId,
      order: 6,
      title: "Unit checkpoint: Hiragana basics",
      titleVi: "Kiểm tra unit: Hiragana cơ bản",
      chars: checkpointChars,
      isCheckpoint: true,
      script: "hiragana",
      moduleId: "hiragana_starter",
    }),
  );

  const unit = {
    id: unitId,
    title: "Unit 1: Hiragana basics",
    titleVi: "Unit 1: Hiragana cơ bản",
    levelCode: "A0",
    trackId: "ja-core_foundation",
    moduleId: "hiragana_starter",
    goal: "Recognize the first five hiragana rows as individual characters.",
    goalVi: "Nhận biết năm hàng hiragana đầu dưới dạng từng chữ cái.",
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    languageCode: "ja",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId: "hiragana_starter",
    moduleTitle: "Hiragana Starter",
    moduleTitleVi: "Hiragana Starter",
    title: "Japanese · Core Foundation",
    titleVi: "Tiếng Nhật · Nền tảng",
    description: "Start with individual hiragana characters before phrases.",
    descriptionVi: "Bắt đầu với từng chữ hiragana trước khi học cụm từ.",
    order: 0,
    units: [unit],
    lessons,
  });
}

function jaKatakanaFoundationUnit4() {
  const unitId = "ja-core-foundation-katakana-u4";
  const rows = [
    {
      id: "ja-katakana-u4-l1",
      order: 1,
      title: "ア / イ / ウ / エ / オ",
      titleVi: "ア / イ / ウ / エ / オ",
      chars: [
        ["ア", "a", { text: "アイス", romanization: "aisu", translations: { en: "ice cream", vi: "kem", ja: "アイス", ko: "아이스크림", zh: "冰淇淋" } }],
        ["イ", "i", { text: "イス", romanization: "isu", translations: { en: "chair", vi: "ghế", ja: "椅子", ko: "의자", zh: "椅子" } }],
        ["ウ", "u", { text: "ウール", romanization: "uuru", translations: { en: "wool", vi: "len", ja: "ウール", ko: "울", zh: "羊毛" } }],
        ["エ", "e", { text: "エアコン", romanization: "eakon", translations: { en: "air conditioner", vi: "máy lạnh", ja: "エアコン", ko: "에어컨", zh: "空调" } }],
        ["オ", "o", { text: "オレンジ", romanization: "orenji", translations: { en: "orange", vi: "cam", ja: "オレンジ", ko: "오렌지", zh: "橙子" } }],
      ],
    },
    {
      id: "ja-katakana-u4-l2",
      order: 2,
      title: "カ / キ / ク / ケ / コ",
      titleVi: "カ / キ / ク / ケ / コ",
      chars: [
        ["カ", "ka", { text: "カメラ", romanization: "kamera", translations: { en: "camera", vi: "máy ảnh", ja: "カメラ", ko: "카메라", zh: "相机" } }],
        ["キ", "ki", { text: "キス", romanization: "kisu", translations: { en: "kiss", vi: "hôn", ja: "キス", ko: "키스", zh: "吻" } }],
        ["ク", "ku", { text: "クラス", romanization: "kurasu", translations: { en: "class", vi: "lớp học", ja: "クラス", ko: "클래스", zh: "班级" } }],
        ["ケ", "ke", { text: "ケーキ", romanization: "keeki", translations: { en: "cake", vi: "bánh ngọt", ja: "ケーキ", ko: "케이크", zh: "蛋糕" } }],
        ["コ", "ko", { text: "コーヒー", romanization: "koohii", translations: { en: "coffee", vi: "cà phê", ja: "コーヒー", ko: "커피", zh: "咖啡" } }],
      ],
    },
    {
      id: "ja-katakana-u4-l3",
      order: 3,
      title: "サ / シ / ス / セ / ソ",
      titleVi: "サ / シ / ス / セ / ソ",
      chars: [
        ["サ", "sa", { text: "サラダ", romanization: "sarada", translations: { en: "salad", vi: "salad", ja: "サラダ", ko: "샐러드", zh: "沙拉" } }],
        ["シ", "shi", { text: "シャツ", romanization: "shatsu", translations: { en: "shirt", vi: "áo sơ mi", ja: "シャツ", ko: "셔츠", zh: "衬衫" } }],
        ["ス", "su", { text: "スーパー", romanization: "suupaa", translations: { en: "supermarket", vi: "siêu thị", ja: "スーパー", ko: "슈퍼", zh: "超市" } }],
        ["セ", "se", { text: "セーター", romanization: "seetaa", translations: { en: "sweater", vi: "áo len", ja: "セーター", ko: "스웨터", zh: "毛衣" } }],
        ["ソ", "so", { text: "ソファ", romanization: "sofa", translations: { en: "sofa", vi: "ghế sofa", ja: "ソファ", ko: "소파", zh: "沙发" } }],
      ],
    },
    {
      id: "ja-katakana-u4-l4",
      order: 4,
      title: "タ / チ / ツ / テ / ト",
      titleVi: "タ / チ / ツ / テ / ト",
      chars: [
        ["タ", "ta", { text: "タクシー", romanization: "takushii", translations: { en: "taxi", vi: "taxi", ja: "タクシー", ko: "택시", zh: "出租车" } }],
        ["チ", "chi", { text: "チーズ", romanization: "chiizu", translations: { en: "cheese", vi: "phô mai", ja: "チーズ", ko: "치즈", zh: "奶酪" } }],
        ["ツ", "tsu", { text: "ツアー", romanization: "tsuaa", translations: { en: "tour", vi: "tour", ja: "ツアー", ko: "투어", zh: "旅行团" } }],
        ["テ", "te", { text: "テスト", romanization: "tesuto", translations: { en: "test", vi: "bài kiểm tra", ja: "テスト", ko: "테스트", zh: "测验" } }],
        ["ト", "to", { text: "トマト", romanization: "tomato", translations: { en: "tomato", vi: "cà chua", ja: "トマト", ko: "토마토", zh: "番茄" } }],
      ],
    },
    {
      id: "ja-katakana-u4-l5",
      order: 5,
      title: "ナ / ニ / ヌ / ネ / ノ",
      titleVi: "ナ / ニ / ヌ / ネ / ノ",
      chars: [
        ["ナ", "na", { text: "ナイフ", romanization: "naifu", translations: { en: "knife", vi: "dao", ja: "ナイフ", ko: "나이프", zh: "刀" } }],
        ["ニ", "ni", { text: "ニュース", romanization: "nyuusu", translations: { en: "news", vi: "tin tức", ja: "ニュース", ko: "뉴스", zh: "新闻" } }],
        ["ヌ", "nu", { text: "ヌードル", romanization: "nuudoru", translations: { en: "noodles", vi: "mì", ja: "ヌードル", ko: "누들", zh: "面条" } }],
        ["ネ", "ne", { text: "ネクタイ", romanization: "nekutai", translations: { en: "necktie", vi: "cà vạt", ja: "ネクタイ", ko: "넥타이", zh: "领带" } }],
        ["ノ", "no", { text: "ノート", romanization: "nooto", translations: { en: "notebook", vi: "vở", ja: "ノート", ko: "노트", zh: "笔记本" } }],
      ],
    },
  ];

  const lessons = rows.map((row) =>
    buildKanaLesson({
      id: row.id,
      unitId,
      order: row.order,
      title: row.title,
      titleVi: row.titleVi,
      chars: row.chars,
      script: "katakana",
      moduleId: "katakana_starter",
    }),
  );

  lessons.push(
    buildKanaLesson({
      id: "ja-katakana-u4-l6",
      unitId,
      order: 6,
      title: "Unit checkpoint: Katakana basics",
      titleVi: "Kiểm tra unit: Katakana cơ bản",
      chars: [
        ["ア", "a", { text: "アイス", romanization: "aisu", translations: { en: "ice cream", vi: "kem", ja: "アイス", ko: "아이스크림", zh: "冰淇淋" } }],
        ["カ", "ka", { text: "カメラ", romanization: "kamera", translations: { en: "camera", vi: "máy ảnh", ja: "カメラ", ko: "카메라", zh: "相机" } }],
        ["サ", "sa", { text: "サラダ", romanization: "sarada", translations: { en: "salad", vi: "salad", ja: "サラダ", ko: "샐러드", zh: "沙拉" } }],
        ["タ", "ta", { text: "タクシー", romanization: "takushii", translations: { en: "taxi", vi: "taxi", ja: "タクシー", ko: "택시", zh: "出租车" } }],
        ["ナ", "na", { text: "ナイフ", romanization: "naifu", translations: { en: "knife", vi: "dao", ja: "ナイフ", ko: "나이프", zh: "刀" } }],
      ],
      isCheckpoint: true,
      script: "katakana",
      moduleId: "katakana_starter",
    }),
  );

  const unit = {
    id: unitId,
    title: "Unit 4: Katakana Basics",
    titleVi: "Unit 4: Katakana cơ bản",
    levelCode: "A0",
    trackId: "ja-core_foundation",
    moduleId: "katakana_starter",
    goal: "Recognize the first five katakana rows as individual characters.",
    goalVi: "Nhận biết năm hàng katakana đầu dưới dạng từng chữ cái.",
    order: 4,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    languageCode: "ja",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId: "katakana_starter",
    moduleTitle: "Katakana Basics",
    moduleTitleVi: "Katakana cơ bản",
    title: "Japanese · Core Foundation · Katakana",
    titleVi: "Tiếng Nhật · Nền tảng · Katakana",
    description: "Learn individual katakana characters with short loanword examples.",
    descriptionVi: "Học từng chữ katakana với ví dụ từ mượn ngắn.",
    order: 1,
    units: [unit],
    lessons,
  });
}

// ── English Daily Life → Greetings → Unit 1 ─────────────────────────

function enGreetingsUnit1() {
  const languageCode = "en";
  const nicheId = "daily_life";
  const unitId = "en-daily_life-greetings-u1";

  const hello = item("en-hello", "Hello", {
    en: "Hello",
    vi: "Xin chào",
    ja: "こんにちは",
    ko: "안녕하세요",
    zh: "你好",
  }, { romanization: "hello", speechText: "Hello" });

  const hi = item("en-hi", "Hi", {
    en: "Hi",
    vi: "Chào",
    ja: "やあ",
    ko: "안녕",
    zh: "嗨",
  }, { romanization: "hi", speechText: "Hi" });

  const goodMorning = item("en-good-morning", "Good morning", {
    en: "Good morning",
    vi: "Chào buổi sáng",
    ja: "おはようございます",
    ko: "좋은 아침이에요",
    zh: "早上好",
  }, { romanization: "good morning", speechText: "Good morning" });

  const goodEvening = item("en-good-evening", "Good evening", {
    en: "Good evening",
    vi: "Chào buổi tối",
    ja: "こんばんは",
    ko: "좋은 저녁이에요",
    zh: "晚上好",
  }, { romanization: "good evening", speechText: "Good evening" });

  const goodbye = item("en-goodbye", "Goodbye", {
    en: "Goodbye",
    vi: "Tạm biệt",
    ja: "さようなら",
    ko: "안녕히 가세요",
    zh: "再见",
  }, { romanization: "goodbye", speechText: "Goodbye" });

  const seeYou = item("en-see-you", "See you", {
    en: "See you",
    vi: "Hẹn gặp lại",
    ja: "またね",
    ko: "또 봐요",
    zh: "再见（回头见）",
  }, { romanization: "see you", speechText: "See you" });

  const howAreYou = item("en-how-are-you", "How are you?", {
    en: "How are you?",
    vi: "Bạn khỏe không?",
    ja: "お元気ですか？",
    ko: "잘 지내요?",
    zh: "你好吗？",
  }, { romanization: "how are you", speechText: "How are you?" });

  const imFine = item("en-im-fine", "I'm fine", {
    en: "I'm fine",
    vi: "Tôi khỏe",
    ja: "元気です",
    ko: "잘 지내요",
    zh: "我很好",
  }, { romanization: "im fine", speechText: "I'm fine" });

  const niceToMeetYou = item("en-nice-to-meet-you", "Nice to meet you", {
    en: "Nice to meet you",
    vi: "Rất vui được gặp bạn",
    ja: "はじめまして",
    ko: "만나서 반가워요",
    zh: "很高兴认识你",
  }, { romanization: "nice to meet you", speechText: "Nice to meet you" });

  const takeCare = item("en-take-care", "Take care", {
    en: "Take care",
    vi: "Bảo trọng",
    ja: "気をつけて",
    ko: "조심하세요",
    zh: "保重",
  }, { romanization: "take care", speechText: "Take care" });

  const lessons = [
    makeLesson({
      id: "en-daily-greetings-u1-l1",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 1,
      level: "A0",
      template: "vocabularyLesson",
      title: "Hello and Hi",
      titleVi: "Hello và Hi",
      description: "Meet someone with a clear daytime greeting.",
      descriptionVi: "Chào người khác bằng lời chào ban ngày rõ ràng.",
      canDoObjective: "I can say hello and hi to start a short talk.",
      canDoObjectiveVi: "Tôi có thể nói hello và hi để bắt đầu trò chuyện ngắn.",
      estimatedMinutes: 8,
      track: "en-daily_life",
      vocabulary: [hello, hi, goodMorning, goodbye],
      keyPhrases: [hello, hi],
      exercises: buildTenExercises({
        id: "en-daily-greetings-u1-l1",
        vocab: [hello, hi, goodMorning, goodbye],
        focus: hello,
        fill: {
          sentence: "___! My name is Nova.",
          blankWord: "Hello",
          options: ["Hello", "Goodbye", "See you", "Take care"],
          speechText: "Hello! My name is Nova.",
        },
        chooseSentence: {
          prompt: t({
            en: "Which greeting fits a friendly daytime hello?",
            vi: "Lời chào nào phù hợp để chào thân thiện ban ngày?",
            ja: "日中の親しいあいさつに合うのはどれですか？",
            ko: "낮에 친근하게 인사할 때 알맞은 말은?",
            zh: "白天友好打招呼时该用哪一句？",
            displayText: "Daytime greeting",
            speechText: "Hello",
          }),
          correct: "Hello",
          distractors: ["Goodbye", "Take care", "See you later"],
        },
        listenIndex: 0,
        gapSentences: [
          { text: "___ there.", blankWord: "Hi", speechText: "Hi there." },
          { text: "___! How are you?", blankWord: "Hello", speechText: "Hello! How are you?" },
        ],
        aiQuestion: {
          en: "When would you say “Hi” instead of “Goodbye”?",
          vi: "Khi nào bạn nói “Hi” thay vì “Goodbye”?",
          ja: "「Goodbye」ではなく「Hi」と言うのはどんな時ですか？",
          ko: "“Goodbye” 대신 “Hi”를 언제 말하나요?",
          zh: "什么时候说 “Hi” 而不是 “Goodbye”？",
        },
      }),
    }),
    makeLesson({
      id: "en-daily-greetings-u1-l2",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 2,
      level: "A0",
      template: "vocabularyLesson",
      title: "Morning and evening",
      titleVi: "Buổi sáng và buổi tối",
      description: "Pick a greeting that matches the time of day.",
      descriptionVi: "Chọn lời chào phù hợp với thời điểm trong ngày.",
      canDoObjective: "I can use good morning and good evening.",
      canDoObjectiveVi: "Tôi có thể dùng good morning và good evening.",
      estimatedMinutes: 8,
      track: "en-daily_life",
      vocabulary: [goodMorning, goodEvening, hello, goodbye],
      keyPhrases: [goodMorning, goodEvening],
      exercises: buildTenExercises({
        id: "en-daily-greetings-u1-l2",
        vocab: [goodMorning, goodEvening, hello, goodbye],
        focus: goodMorning,
        fill: {
          sentence: "___! Did you sleep well?",
          blankWord: "Good morning",
          options: ["Good morning", "Good evening", "Goodbye", "See you"],
          speechText: "Good morning! Did you sleep well?",
        },
        chooseSentence: {
          prompt: t({
            en: "It is 8 p.m. Which greeting fits best?",
            vi: "Bây giờ là 8 giờ tối. Lời chào nào phù hợp nhất?",
            ja: "午後8時です。いちばん合うあいさつは？",
            ko: "저녁 8시입니다. 가장 알맞은 인사는?",
            zh: "现在是晚上 8 点。哪句问候最合适？",
            displayText: "Evening",
            speechText: "Good evening",
          }),
          correct: "Good evening",
          distractors: ["Good morning", "See you", "I'm fine"],
        },
        listenIndex: 1,
        gapSentences: [
          { text: "___. Ready for work?", blankWord: "Good morning", speechText: "Good morning. Ready for work?" },
          { text: "___. Welcome back.", blankWord: "Good evening", speechText: "Good evening. Welcome back." },
        ],
        aiQuestion: {
          en: "Give one situation for “Good morning”.",
          vi: "Nêu một tình huống dùng “Good morning”.",
          ja: "「Good morning」を使う場面を1つ書いてください。",
          ko: "“Good morning”을 쓰는 상황을 하나 적어 주세요.",
          zh: "写出一个使用 “Good morning” 的场景。",
        },
      }),
    }),
    makeLesson({
      id: "en-daily-greetings-u1-l3",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 3,
      level: "A0",
      template: "vocabularyLesson",
      title: "Saying goodbye",
      titleVi: "Nói tạm biệt",
      description: "Leave a chat politely with goodbye or see you.",
      descriptionVi: "Kết thúc trò chuyện lịch sự bằng goodbye hoặc see you.",
      canDoObjective: "I can end a short talk with goodbye or see you.",
      canDoObjectiveVi: "Tôi có thể kết thúc trò chuyện ngắn bằng goodbye hoặc see you.",
      estimatedMinutes: 8,
      track: "en-daily_life",
      vocabulary: [goodbye, seeYou, takeCare, hello],
      keyPhrases: [goodbye, seeYou],
      exercises: buildTenExercises({
        id: "en-daily-greetings-u1-l3",
        vocab: [goodbye, seeYou, takeCare, hello],
        focus: goodbye,
        fill: {
          sentence: "I have to go now. ___!",
          blankWord: "Goodbye",
          options: ["Goodbye", "Hello", "Good morning", "How are you?"],
          speechText: "I have to go now. Goodbye!",
        },
        chooseSentence: {
          prompt: t({
            en: "Which line means you will meet again soon?",
            vi: "Câu nào nghĩa là bạn sẽ sớm gặp lại?",
            ja: "またすぐ会う意味の文はどれですか？",
            ko: "곧 다시 만난다는 뜻의 말은?",
            zh: "哪一句表示很快会再见面？",
            displayText: "Parting",
            speechText: "See you",
          }),
          correct: "See you",
          distractors: ["Hello", "Good morning", "How are you?"],
        },
        listenIndex: 0,
        gapSentences: [
          { text: "Thanks for today. ___.", blankWord: "Goodbye", speechText: "Thanks for today. Goodbye." },
          { text: "Same place tomorrow. ___.", blankWord: "See you", speechText: "Same place tomorrow. See you." },
        ],
        aiQuestion: {
          en: "Write one polite goodbye you can say after class.",
          vi: "Viết một lời tạm biệt lịch sự sau giờ học.",
          ja: "授業の後に使える丁寧な別れのあいさつを1つ書いてください。",
          ko: "수업 후에 쓸 수 있는 정중한 작별 인사를 하나 쓰세요.",
          zh: "写一句课后可用的礼貌道别。",
        },
      }),
    }),
    makeLesson({
      id: "en-daily-greetings-u1-l4",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 4,
      level: "A0",
      template: "vocabularyLesson",
      title: "How are you?",
      titleVi: "Bạn khỏe không?",
      description: "Ask and answer a simple wellness check.",
      descriptionVi: "Hỏi và trả lời câu thăm sức khỏe đơn giản.",
      canDoObjective: "I can ask “How are you?” and answer “I'm fine”.",
      canDoObjectiveVi: "Tôi có thể hỏi “How are you?” và trả lời “I'm fine”.",
      estimatedMinutes: 8,
      track: "en-daily_life",
      vocabulary: [howAreYou, imFine, hello, goodbye],
      keyPhrases: [howAreYou, imFine],
      exercises: buildTenExercises({
        id: "en-daily-greetings-u1-l4",
        vocab: [howAreYou, imFine, hello, goodbye],
        focus: howAreYou,
        fill: {
          sentence: "A: ___ B: I'm fine.",
          blankWord: "How are you?",
          options: ["How are you?", "Goodbye", "See you", "Take care"],
          speechText: "How are you? I'm fine.",
        },
        chooseSentence: {
          prompt: t({
            en: "Someone asks “How are you?”. What can you answer?",
            vi: "Ai đó hỏi “How are you?”. Bạn có thể trả lời gì?",
            ja: "「How are you?」と聞かれたら何と答えますか？",
            ko: "“How are you?”라고 물으면 뭐라고 답할까요?",
            zh: "有人问 “How are you?”，你可以怎么回答？",
            displayText: "Reply",
            speechText: "I'm fine",
          }),
          correct: "I'm fine",
          distractors: ["Goodbye", "See you", "Good evening"],
        },
        listenIndex: 1,
        gapSentences: [
          { text: "Hi! ___", blankWord: "How are you?", speechText: "Hi! How are you?" },
          { text: "___, thanks.", blankWord: "I'm fine", speechText: "I'm fine, thanks." },
        ],
        aiQuestion: {
          en: "Reply briefly if a friend asks how you are.",
          vi: "Trả lời ngắn nếu bạn hỏi bạn khỏe không.",
          ja: "友だちに元気か聞かれたら短く答えてください。",
          ko: "친구가 잘 지내냐고 물으면 짧게 답하세요.",
          zh: "如果朋友问你好吗，请简短回答。",
        },
      }),
    }),
    makeLesson({
      id: "en-daily-greetings-u1-l5",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 5,
      level: "A0",
      template: "vocabularyLesson",
      title: "First meeting",
      titleVi: "Lần đầu gặp",
      description: "Use a warm line when you meet someone new.",
      descriptionVi: "Dùng câu thân thiện khi gặp người mới.",
      canDoObjective: "I can say “Nice to meet you” in a first meeting.",
      canDoObjectiveVi: "Tôi có thể nói “Nice to meet you” khi gặp lần đầu.",
      estimatedMinutes: 8,
      track: "en-daily_life",
      vocabulary: [niceToMeetYou, hello, hi, goodbye],
      keyPhrases: [niceToMeetYou],
      exercises: buildTenExercises({
        id: "en-daily-greetings-u1-l5",
        vocab: [niceToMeetYou, hello, hi, goodbye],
        focus: niceToMeetYou,
        fill: {
          sentence: "Hello, I'm Lan. ___.",
          blankWord: "Nice to meet you",
          options: ["Nice to meet you", "Goodbye", "Take care", "See you"],
          speechText: "Hello, I'm Lan. Nice to meet you.",
        },
        chooseSentence: {
          prompt: t({
            en: "You just met a classmate. Which line fits?",
            vi: "Bạn vừa gặp bạn cùng lớp. Câu nào phù hợp?",
            ja: "クラスメイトと初めて会いました。合う文は？",
            ko: "반 친구를 처음 만났습니다. 알맞은 말은?",
            zh: "你刚认识一位同学。哪一句合适？",
            displayText: "First meeting",
            speechText: "Nice to meet you",
          }),
          correct: "Nice to meet you",
          distractors: ["Goodbye", "Take care", "See you"],
        },
        listenIndex: 0,
        gapSentences: [
          { text: "Hi, I'm Ken. ___.", blankWord: "Nice to meet you", speechText: "Hi, I'm Ken. Nice to meet you." },
          { text: "___. I'm Mai.", blankWord: "Hello", speechText: "Hello. I'm Mai." },
        ],
        aiQuestion: {
          en: "What can you say right after exchanging names?",
          vi: "Bạn có thể nói gì ngay sau khi đổi tên?",
          ja: "名前を交わした直後に何と言えますか？",
          ko: "이름을 나눈 직후에 뭐라고 말할 수 있나요?",
          zh: "交换名字后你可以立刻说什么？",
        },
      }),
    }),
    makeLesson({
      id: "en-daily-greetings-u1-l6",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 6,
      level: "A0",
      template: "miniTestLesson",
      title: "Unit checkpoint: Hello / goodbye",
      titleVi: "Kiểm tra unit: Hello / goodbye",
      description: "Review hello, time-of-day greetings, and goodbye lines.",
      descriptionVi: "Ôn hello, chào theo thời điểm, và lời tạm biệt.",
      canDoObjective: "I can choose hello and goodbye lines for short daily talks.",
      canDoObjectiveVi: "Tôi có thể chọn lời chào và tạm biệt cho trò chuyện ngắn hàng ngày.",
      estimatedMinutes: 10,
      track: "en-daily_life",
      vocabulary: [hello, goodbye, goodMorning, seeYou, howAreYou, takeCare],
      keyPhrases: [hello, goodbye, howAreYou],
      exercises: buildTenExercises({
        id: "en-daily-greetings-u1-l6",
        vocab: [hello, goodbye, goodMorning, seeYou, howAreYou, takeCare],
        focus: takeCare,
        fill: {
          sentence: "It's late. ___.",
          blankWord: "Take care",
          options: ["Take care", "Good morning", "How are you?", "Nice to meet you"],
          speechText: "It's late. Take care.",
        },
        chooseSentence: {
          prompt: t({
            en: "Pick the best closing line before you leave.",
            vi: "Chọn câu kết tốt nhất trước khi bạn rời đi.",
            ja: "帰る前の締めのあいさつとしていちばん良いのは？",
            ko: "떠나기 전 마무리 인사로 가장 좋은 것은?",
            zh: "离开前最合适的结束语是？",
            displayText: "Closing",
            speechText: "Goodbye",
          }),
          correct: "Goodbye",
          distractors: ["Good morning", "How are you?", "Nice to meet you"],
        },
        listenIndex: 2,
        gapSentences: [
          { text: "___. See you tomorrow.", blankWord: "Goodbye", speechText: "Goodbye. See you tomorrow." },
          { text: "___! Ready for school?", blankWord: "Good morning", speechText: "Good morning! Ready for school?" },
          { text: "___ — text me later.", blankWord: "Take care", speechText: "Take care — text me later." },
        ],
        aiQuestion: {
          en: "Write a 2-line mini dialogue: hello + goodbye.",
          vi: "Viết hội thoại 2 dòng: chào + tạm biệt.",
          ja: "あいさつ＋別れの2行ミニ会話を書いてください。",
          ko: "인사 + 작별 2줄 미니 대화를 쓰세요.",
          zh: "写两行小对话：问候 + 道别。",
        },
      }),
    }),
  ];

  const unit = {
    id: unitId,
    title: "Unit 1: Hello / goodbye",
    titleVi: "Unit 1: Hello / tạm biệt",
    levelCode: "A0",
    trackId: "en-daily_life",
    moduleId: "greetings",
    goal: "Use basic hello and goodbye lines in short daily talks.",
    goalVi: "Dùng lời chào và tạm biệt cơ bản trong trò chuyện ngắn hàng ngày.",
    displayOrder: 1,
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    languageCode,
    nicheId,
    title: "English · Daily Life",
    titleVi: "Tiếng Anh · Đời sống hàng ngày",
    description: "Start with greetings for everyday English.",
    descriptionVi: "Bắt đầu với chào hỏi tiếng Anh hàng ngày.",
    order: 2,
    units: [unit],
    lessons,
  });
}

// ── Japanese Daily Life → Greetings → Unit 1 ────────────────────────

function jaGreetingsUnit1() {
  const languageCode = "ja";
  const nicheId = "daily_life";
  const unitId = "ja-daily_life-greetings-u1";

  const konnichiwa = item("ja-konnichiwa", "こんにちは", {
    en: "Hello",
    vi: "Xin chào",
    ja: "こんにちは",
    ko: "안녕하세요",
    zh: "你好",
  }, { reading: "こんにちは", romanization: "konnichiwa", speechText: "こんにちは" });

  const ohayou = item("ja-ohayou", "おはよう", {
    en: "Good morning (casual)",
    vi: "Chào buổi sáng (thân mật)",
    ja: "おはよう",
    ko: "좋은 아침 (캐주얼)",
    zh: "早上好（随意）",
  }, { reading: "おはよう", romanization: "ohayou", speechText: "おはよう" });

  const ohayouGozaimasu = item("ja-ohayou-gozaimasu", "おはようございます", {
    en: "Good morning (polite)",
    vi: "Chào buổi sáng (lịch sự)",
    ja: "おはようございます",
    ko: "좋은 아침입니다 (공손)",
    zh: "早上好（礼貌）",
  }, { reading: "おはようございます", romanization: "ohayou gozaimasu", speechText: "おはようございます" });

  const konbanwa = item("ja-konbanwa", "こんばんは", {
    en: "Good evening",
    vi: "Chào buổi tối",
    ja: "こんばんは",
    ko: "좋은 저녁이에요",
    zh: "晚上好",
  }, { reading: "こんばんは", romanization: "konbanwa", speechText: "こんばんは" });

  const sayounara = item("ja-sayounara", "さようなら", {
    en: "Goodbye",
    vi: "Tạm biệt",
    ja: "さようなら",
    ko: "안녕히 가세요",
    zh: "再见",
  }, { reading: "さようなら", romanization: "sayounara", speechText: "さようなら" });

  const jaane = item("ja-jaane", "じゃあね", {
    en: "See you (casual)",
    vi: "Hẹn gặp lại (thân mật)",
    ja: "じゃあね",
    ko: "그럼 나중에 (캐주얼)",
    zh: "再见（随意）",
  }, { reading: "じゃあね", romanization: "jaa ne", speechText: "じゃあね" });

  const ogenki = item("ja-ogenki", "お元気ですか", {
    en: "How are you?",
    vi: "Bạn khỏe không?",
    ja: "お元気ですか",
    ko: "잘 지내세요?",
    zh: "你好吗？",
  }, { reading: "おげんきですか", romanization: "ogenki desu ka", speechText: "おげんきですか" });

  const genkiDesu = item("ja-genki-desu", "元気です", {
    en: "I'm fine",
    vi: "Tôi khỏe",
    ja: "元気です",
    ko: "잘 지내요",
    zh: "我很好",
  }, { reading: "げんきです", romanization: "genki desu", speechText: "げんきです" });

  const hajimemashite = item("ja-hajimemashite", "はじめまして", {
    en: "Nice to meet you",
    vi: "Rất vui được gặp bạn",
    ja: "はじめまして",
    ko: "처음 뵙겠습니다",
    zh: "初次见面",
  }, { reading: "はじめまして", romanization: "hajimemashite", speechText: "はじめまして" });

  const kiwotsukete = item("ja-kiwotsukete", "気をつけて", {
    en: "Take care",
    vi: "Bảo trọng / cẩn thận",
    ja: "気をつけて",
    ko: "조심하세요",
    zh: "路上小心",
  }, { reading: "きをつけて", romanization: "ki o tsukete", speechText: "きをつけて" });

  const lessons = [
    makeLesson({
      id: "ja-daily-greetings-u1-l1",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 1,
      level: "A0",
      template: "vocabularyLesson",
      title: "こんにちは",
      titleVi: "こんにちは",
      description: "Dùng こんにちは để chào ban ngày.",
      descriptionVi: "Dùng こんにちは để chào ban ngày.",
      canDoObjective: "I can greet someone with こんにちは.",
      canDoObjectiveVi: "Tôi có thể chào bằng こんにちは.",
      estimatedMinutes: 8,
      track: "ja-daily_life",
      vocabulary: [konnichiwa, ohayou, sayounara, jaane],
      keyPhrases: [konnichiwa],
      exercises: buildTenExercises({
        id: "ja-daily-greetings-u1-l1",
        vocab: [konnichiwa, ohayou, sayounara, jaane],
        focus: konnichiwa,
        fill: {
          sentence: "___。私はノバです。",
          blankWord: "こんにちは",
          options: ["こんにちは", "さようなら", "じゃあね", "こんばんは"],
          speechText: "こんにちは。わたしはノバです。",
        },
        chooseSentence: {
          prompt: t({
            en: "Which line is a daytime hello?",
            vi: "Câu nào là lời chào ban ngày?",
            ja: "日中のあいさつはどれですか？",
            ko: "낮 인사에 해당하는 말은?",
            zh: "哪一句是白天的问候？",
            displayText: "Daytime",
            speechText: "こんにちは",
          }),
          correct: "こんにちは",
          distractors: ["さようなら", "じゃあね", "気をつけて"],
        },
        listenIndex: 0,
        gapSentences: [
          { text: "___。", blankWord: "こんにちは", speechText: "こんにちは。" },
          { text: "___、田中です。", blankWord: "こんにちは", speechText: "こんにちは、たなかです。" },
        ],
        aiQuestion: {
          en: "When do people usually say こんにちは?",
          vi: "Người ta thường nói こんにちは khi nào?",
          ja: "「こんにちは」はどんな時に使いますか？",
          ko: "こんにちは는 보통 언제 말하나요?",
          zh: "人们通常什么时候说 こんにちは？",
        },
      }),
    }),
    makeLesson({
      id: "ja-daily-greetings-u1-l2",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 2,
      level: "A0",
      template: "vocabularyLesson",
      title: "おはよう / おはようございます",
      titleVi: "Chào buổi sáng",
      description: "Phân biệt chào sáng thân mật và lịch sự.",
      descriptionVi: "Phân biệt chào sáng thân mật và lịch sự.",
      canDoObjective: "I can use おはよう and おはようございます.",
      canDoObjectiveVi: "Tôi có thể dùng おはよう và おはようございます.",
      estimatedMinutes: 8,
      track: "ja-daily_life",
      vocabulary: [ohayou, ohayouGozaimasu, konnichiwa, konbanwa],
      keyPhrases: [ohayou, ohayouGozaimasu],
      exercises: buildTenExercises({
        id: "ja-daily-greetings-u1-l2",
        vocab: [ohayou, ohayouGozaimasu, konnichiwa, konbanwa],
        focus: ohayouGozaimasu,
        fill: {
          sentence: "先生、___。",
          blankWord: "おはようございます",
          options: ["おはようございます", "じゃあね", "さようなら", "こんばんは"],
          speechText: "せんせい、おはようございます。",
        },
        chooseSentence: {
          prompt: t({
            en: "Which morning greeting is more polite?",
            vi: "Lời chào sáng nào lịch sự hơn?",
            ja: "より丁寧な朝のあいさつはどれですか？",
            ko: "더 공손한 아침 인사는?",
            zh: "哪句早晨问候更礼貌？",
            displayText: "Polite morning",
            speechText: "おはようございます",
          }),
          correct: "おはようございます",
          distractors: ["おはよう", "じゃあね", "こんにちは"],
        },
        listenIndex: 1,
        gapSentences: [
          { text: "友だち：「___！」", blankWord: "おはよう", speechText: "おはよう！" },
          { text: "会社：「___。」", blankWord: "おはようございます", speechText: "おはようございます。" },
        ],
        aiQuestion: {
          en: "Who might you greet with おはようございます?",
          vi: "Bạn có thể chào おはようございます với ai?",
          ja: "「おはようございます」は誰に使いやすいですか？",
          ko: "おはようございます는 누구에게 쓰기 좋나요?",
          zh: "你可能对谁说 おはようございます？",
        },
      }),
    }),
    makeLesson({
      id: "ja-daily-greetings-u1-l3",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 3,
      level: "A0",
      template: "vocabularyLesson",
      title: "こんばんは / さようなら",
      titleVi: "Buổi tối và tạm biệt",
      description: "Chào tối và kết thúc cuộc nói chuyện.",
      descriptionVi: "Chào tối và kết thúc cuộc nói chuyện.",
      canDoObjective: "I can use こんばんは and さようなら.",
      canDoObjectiveVi: "Tôi có thể dùng こんばんは và さようなら.",
      estimatedMinutes: 8,
      track: "ja-daily_life",
      vocabulary: [konbanwa, sayounara, jaane, konnichiwa],
      keyPhrases: [konbanwa, sayounara],
      exercises: buildTenExercises({
        id: "ja-daily-greetings-u1-l3",
        vocab: [konbanwa, sayounara, jaane, konnichiwa],
        focus: sayounara,
        fill: {
          sentence: "夜です。「___。」",
          blankWord: "こんばんは",
          options: ["こんばんは", "おはよう", "はじめまして", "元気です"],
          speechText: "よるです。こんばんは。",
        },
        chooseSentence: {
          prompt: t({
            en: "Which line is a clear goodbye?",
            vi: "Câu nào là lời tạm biệt rõ ràng?",
            ja: "はっきりした別れのあいさつはどれですか？",
            ko: "분명한 작별 인사는?",
            zh: "哪一句是明确的道别？",
            displayText: "Goodbye",
            speechText: "さようなら",
          }),
          correct: "さようなら",
          distractors: ["こんにちは", "おはよう", "お元気ですか"],
        },
        listenIndex: 0,
        gapSentences: [
          { text: "夜のあいさつ：「___。」", blankWord: "こんばんは", speechText: "こんばんは。" },
          { text: "帰るとき：「___。」", blankWord: "さようなら", speechText: "さようなら。" },
        ],
        aiQuestion: {
          en: "When is こんばんは a better choice than こんにちは?",
          vi: "Khi nào こんばんは phù hợp hơn こんにちは?",
          ja: "「こんにちは」より「こんばんは」が合うのはどんな時ですか？",
          ko: "こんにちは보다 こんばんは가 더 맞는 때는?",
          zh: "什么时候用 こんばんは 比 こんにちは 更合适？",
        },
      }),
    }),
    makeLesson({
      id: "ja-daily-greetings-u1-l4",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 4,
      level: "A0",
      template: "vocabularyLesson",
      title: "お元気ですか",
      titleVi: "Bạn khỏe không?",
      description: "Hỏi thăm ngắn và trả lời 元気です.",
      descriptionVi: "Hỏi thăm ngắn và trả lời 元気です.",
      canDoObjective: "I can ask お元気ですか and answer 元気です.",
      canDoObjectiveVi: "Tôi có thể hỏi お元気ですか và trả lời 元気です.",
      estimatedMinutes: 8,
      track: "ja-daily_life",
      vocabulary: [ogenki, genkiDesu, konnichiwa, sayounara],
      keyPhrases: [ogenki, genkiDesu],
      exercises: buildTenExercises({
        id: "ja-daily-greetings-u1-l4",
        vocab: [ogenki, genkiDesu, konnichiwa, sayounara],
        focus: ogenki,
        fill: {
          sentence: "A: ___。 B: 元気です。",
          blankWord: "お元気ですか",
          options: ["お元気ですか", "さようなら", "じゃあね", "こんばんは"],
          speechText: "おげんきですか。げんきです。",
        },
        chooseSentence: {
          prompt: t({
            en: "What can you answer after お元気ですか?",
            vi: "Sau お元気ですか bạn có thể trả lời gì?",
            ja: "「お元気ですか」の後に何と答えられますか？",
            ko: "お元気ですか 다음에 뭐라고 답할 수 있나요?",
            zh: "听到 お元気ですか 后可以怎么回答？",
            displayText: "Reply",
            speechText: "げんきです",
          }),
          correct: "元気です",
          distractors: ["さようなら", "じゃあね", "こんばんは"],
        },
        listenIndex: 1,
        gapSentences: [
          { text: "___。", blankWord: "お元気ですか", speechText: "おげんきですか。" },
          { text: "はい、___。", blankWord: "元気です", speechText: "はい、げんきです。" },
        ],
        aiQuestion: {
          en: "Write a short reply to お元気ですか.",
          vi: "Viết câu trả lời ngắn cho お元気ですか.",
          ja: "「お元気ですか」への短い返事を書いてください。",
          ko: "お元気ですか에 대한 짧은 답을 쓰세요.",
          zh: "写一句对 お元気ですか 的简短回答。",
        },
      }),
    }),
    makeLesson({
      id: "ja-daily-greetings-u1-l5",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 5,
      level: "A0",
      template: "vocabularyLesson",
      title: "はじめまして",
      titleVi: "Lần đầu gặp",
      description: "Dùng はじめまして khi gặp người mới.",
      descriptionVi: "Dùng はじめまして khi gặp người mới.",
      canDoObjective: "I can say はじめまして in a first meeting.",
      canDoObjectiveVi: "Tôi có thể nói はじめまして khi gặp lần đầu.",
      estimatedMinutes: 8,
      track: "ja-daily_life",
      vocabulary: [hajimemashite, konnichiwa, ohayou, sayounara],
      keyPhrases: [hajimemashite],
      exercises: buildTenExercises({
        id: "ja-daily-greetings-u1-l5",
        vocab: [hajimemashite, konnichiwa, ohayou, sayounara],
        focus: hajimemashite,
        fill: {
          sentence: "こんにちは。___。",
          blankWord: "はじめまして",
          options: ["はじめまして", "じゃあね", "気をつけて", "こんばんは"],
          speechText: "こんにちは。はじめまして。",
        },
        chooseSentence: {
          prompt: t({
            en: "You meet a classmate for the first time. Which fits?",
            vi: "Bạn gặp bạn cùng lớp lần đầu. Câu nào phù hợp?",
            ja: "クラスメイトと初めて会いました。合うのは？",
            ko: "반 친구를 처음 만났습니다. 알맞은 말은?",
            zh: "第一次见到同学时哪一句合适？",
            displayText: "First meeting",
            speechText: "はじめまして",
          }),
          correct: "はじめまして",
          distractors: ["じゃあね", "気をつけて", "さようなら"],
        },
        listenIndex: 0,
        gapSentences: [
          { text: "___。ノバです。", blankWord: "はじめまして", speechText: "はじめまして。ノバです。" },
          { text: "___。", blankWord: "こんにちは", speechText: "こんにちは。" },
        ],
        aiQuestion: {
          en: "When is はじめまして useful?",
          vi: "Khi nào nên dùng はじめまして?",
          ja: "「はじめまして」はどんな時に便利ですか？",
          ko: "はじめまして는 언제 유용한가요?",
          zh: "什么时候适合用 はじめまして？",
        },
      }),
    }),
    makeLesson({
      id: "ja-daily-greetings-u1-l6",
      languageCode,
      nicheId,
      moduleId: "greetings",
      unitId,
      order: 6,
      level: "A0",
      template: "miniTestLesson",
      title: "Unit checkpoint: あいさつ",
      titleVi: "Kiểm tra unit: chào hỏi",
      description: "Ôn chào hỏi và tạm biệt cơ bản.",
      descriptionVi: "Ôn chào hỏi và tạm biệt cơ bản.",
      canDoObjective: "I can choose basic Japanese hello and goodbye lines.",
      canDoObjectiveVi: "Tôi có thể chọn lời chào và tạm biệt tiếng Nhật cơ bản.",
      estimatedMinutes: 10,
      track: "ja-daily_life",
      vocabulary: [konnichiwa, sayounara, ohayouGozaimasu, jaane, ogenki, kiwotsukete],
      keyPhrases: [konnichiwa, sayounara, kiwotsukete],
      exercises: buildTenExercises({
        id: "ja-daily-greetings-u1-l6",
        vocab: [konnichiwa, sayounara, ohayouGozaimasu, jaane, ogenki, kiwotsukete],
        focus: kiwotsukete,
        fill: {
          sentence: "雨ですよ。___。",
          blankWord: "気をつけて",
          options: ["気をつけて", "おはよう", "はじめまして", "お元気ですか"],
          speechText: "あめですよ。きをつけて。",
        },
        chooseSentence: {
          prompt: t({
            en: "Pick a clear goodbye before leaving.",
            vi: "Chọn lời tạm biệt rõ trước khi rời đi.",
            ja: "帰る前のはっきりした別れのあいさつは？",
            ko: "떠나기 전 분명한 작별 인사는?",
            zh: "离开前明确的道别是？",
            displayText: "Closing",
            speechText: "さようなら",
          }),
          correct: "さようなら",
          distractors: ["おはよう", "お元気ですか", "はじめまして"],
        },
        listenIndex: 2,
        gapSentences: [
          { text: "朝：「___。」", blankWord: "おはようございます", speechText: "おはようございます。" },
          { text: "昼：「___。」", blankWord: "こんにちは", speechText: "こんにちは。" },
          { text: "帰る：「___。」", blankWord: "さようなら", speechText: "さようなら。" },
        ],
        aiQuestion: {
          en: "Write a 2-line mini dialogue: こんにちは + さようなら.",
          vi: "Viết hội thoại 2 dòng: こんにちは + さようなら.",
          ja: "「こんにちは」＋「さようなら」の2行会話を書いてください。",
          ko: "こんにちは + さようなら 2줄 대화를 쓰세요.",
          zh: "写两行对话：こんにちは + さようなら。",
        },
      }),
    }),
  ];

  const unit = {
    id: unitId,
    title: "Unit 1: Hello / goodbye",
    titleVi: "Unit 1: Chào / tạm biệt",
    levelCode: "A0",
    trackId: "ja-daily_life",
    moduleId: "greetings",
    goal: "Use basic Japanese hello and goodbye lines.",
    goalVi: "Dùng lời chào và tạm biệt tiếng Nhật cơ bản.",
    displayOrder: 1,
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    languageCode,
    nicheId,
    title: "Japanese · Daily Life",
    titleVi: "Tiếng Nhật · Đời sống hàng ngày",
    description: "Start with greetings for everyday Japanese.",
    descriptionVi: "Bắt đầu với chào hỏi tiếng Nhật hàng ngày.",
    order: 2,
    units: [unit],
    lessons,
  });
}

function letterItem(letter, sound) {
  const lower = letter.toLowerCase();
  const base = item(
    `en-letter-${lower}`,
    letter,
    {
      en: `letter ${letter} (sound ${sound})`,
      vi: `chữ ${letter} (âm ${sound})`,
      ja: `文字 ${letter}（音 ${sound}）`,
      ko: `글자 ${letter} (${sound} 소리)`,
      zh: `字母 ${letter}（音 ${sound}）`,
    },
    { reading: letter, romanization: sound, speechText: letter },
  );
  const order = letter.charCodeAt(0) - 64;
  return {
    ...base,
    characterOrder: order,
    displayOrder: order,
    alphabet: "latin",
  };
}

function buildAlphabetLesson({
  id,
  unitId,
  order,
  title,
  titleVi,
  letters,
  isCheckpoint = false,
}) {
  const vocab = letters.map(([letter, sound]) => letterItem(letter, sound));
  // Exercises use five focus letters; vocabulary may include a sixth (Z).
  const focusVocab = vocab.length >= 5 ? vocab.slice(0, 5) : vocab;
  const all = vocab.map((v) => v.displayText);
  const groupLabel = isCheckpoint
    ? { ja: "アルファベット基礎チェック", ko: "알파벳 기초 확인", zh: "字母基础检查" }
    : order === 1
      ? { ja: "母音", ko: "모음", zh: "元音" }
      : { ja: "子音", ko: "자음", zh: "辅音" };
  const titleByNative = t({
    en: title,
    vi: titleVi,
    ja: `${groupLabel.ja}: ${all.join(" / ")}`,
    ko: `${groupLabel.ko}: ${all.join(" / ")}`,
    zh: `${groupLabel.zh}: ${all.join(" / ")}`,
  });
  const descriptionByNative = t({
    en: `Learn the English letters ${all.join(" / ")}.`,
    vi: `Học các chữ cái tiếng Anh ${all.join(" / ")}.`,
    ja: `英字 ${all.join(" / ")} を学びます。`,
    ko: `영어 알파벳 ${all.join(" / ")}를 배웁니다.`,
    zh: `学习英文字母 ${all.join(" / ")}。`,
  });
  const canDoObjectiveByNative = t({
    en: `I can recognize ${all.join(", ")}.`,
    vi: `Tôi có thể nhận biết ${all.join(", ")}.`,
    ja: `${all.join("、")}を見分けられます。`,
    ko: `${all.join(", ")}를 구별할 수 있습니다.`,
    zh: `我能识别${all.join("、")}。`,
  });
  return makeLesson({
    id,
    languageCode: "en",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId: "alphabet_starter",
    unitId,
    order,
    level: "A0",
    template: isCheckpoint ? "miniTestLesson" : "vocabularyLesson",
    title,
    titleVi,
    titleByNative,
    description: descriptionByNative.en,
    descriptionVi: descriptionByNative.vi,
    descriptionByNative,
    canDoObjective: canDoObjectiveByNative.en,
    canDoObjectiveVi: canDoObjectiveByNative.vi,
    canDoObjectiveByNative,
    estimatedMinutes: isCheckpoint ? 10 : 8,
    track: "en-core_foundation",
    vocabulary: vocab,
    keyPhrases: [],
    exercises: buildFoundationCharacterExercises({
      id,
      vocab: focusVocab,
      scriptLabel: "alphabet",
      scriptLabelVi: "chữ cái",
      aiQuestion: {
        en: `Say these letters in order: ${all.join(", ")}.`,
        vi: `Nêu các chữ cái này theo thứ tự: ${all.join(", ")}.`,
        ja: `この文字を順番に言ってください：${all.join(", ")}。`,
        ko: `이 글자들을 순서대로 말하세요: ${all.join(", ")}.`,
        zh: `按顺序说出这些字母：${all.join(", ")}。`,
      },
    }),
  });
}

function enAlphabetFoundationUnit1() {
  const unitId = "en-core-foundation-alphabet-u1";
  const rows = [
    {
      id: "en-alphabet-u1-l1",
      order: 1,
      title: "Vowels: A / E / I / O / U",
      titleVi: "Nguyên âm: A / E / I / O / U",
      letters: [
        ["A", "a"],
        ["E", "e"],
        ["I", "i"],
        ["O", "o"],
        ["U", "u"],
      ],
    },
    {
      id: "en-alphabet-u1-l2",
      order: 2,
      title: "Consonants: B / C / D / F / G",
      titleVi: "Phụ âm: B / C / D / F / G",
      letters: [
        ["B", "b"],
        ["C", "c"],
        ["D", "d"],
        ["F", "f"],
        ["G", "g"],
      ],
    },
    {
      id: "en-alphabet-u1-l3",
      order: 3,
      title: "Consonants: H / J / K / L / M",
      titleVi: "Phụ âm: H / J / K / L / M",
      letters: [
        ["H", "h"],
        ["J", "j"],
        ["K", "k"],
        ["L", "l"],
        ["M", "m"],
      ],
    },
    {
      id: "en-alphabet-u1-l4",
      order: 4,
      title: "Consonants: N / P / Q / R / S",
      titleVi: "Phụ âm: N / P / Q / R / S",
      letters: [
        ["N", "n"],
        ["P", "p"],
        ["Q", "q"],
        ["R", "r"],
        ["S", "s"],
      ],
    },
    {
      id: "en-alphabet-u1-l5",
      order: 5,
      title: "Consonants: T / V / W / X / Y / Z",
      titleVi: "Phụ âm: T / V / W / X / Y / Z",
      letters: [
        ["T", "t"],
        ["V", "v"],
        ["W", "w"],
        ["X", "x"],
        ["Y", "y"],
        ["Z", "z"],
      ],
    },
  ];

  const lessons = rows.map((row) =>
    buildAlphabetLesson({
      id: row.id,
      unitId,
      order: row.order,
      title: row.title,
      titleVi: row.titleVi,
      letters: row.letters,
    }),
  );

  lessons.push(
    buildAlphabetLesson({
      id: "en-alphabet-u1-l6",
      unitId,
      order: 6,
      title: "Unit checkpoint: Alphabet basics",
      titleVi: "Kiểm tra unit: Alphabet cơ bản",
      letters: [
        ["A", "a"],
        ["M", "m"],
        ["S", "s"],
        ["Y", "y"],
        ["Z", "z"],
      ],
      isCheckpoint: true,
    }),
  );

  const unit = {
    id: unitId,
    title: "Unit 1: Alphabet basics",
    titleVi: "Unit 1: Alphabet cơ bản",
    titleByNative: t({
      en: "Unit 1: Alphabet basics",
      vi: "Bài 1: Bảng chữ cái cơ bản",
      ja: "ユニット1：アルファベットの基礎",
      ko: "유닛 1: 알파벳 기초",
      zh: "单元1：字母基础",
    }),
    levelCode: "A0",
    trackId: "en-core_foundation",
    moduleId: "alphabet_starter",
    goal: "Recognize English vowels and consonants as individual letters.",
    goalVi: "Nhận biết nguyên âm và phụ âm tiếng Anh dưới dạng từng chữ cái.",
    goalByNative: t({
      en: "Recognize English vowels and consonants as individual letters.",
      vi: "Nhận biết nguyên âm và phụ âm tiếng Anh dưới dạng từng chữ cái.",
      ja: "英語の母音と子音を一文字ずつ見分けます。",
      ko: "영어 모음과 자음을 한 글자씩 구별합니다.",
      zh: "逐个识别英语元音和辅音字母。",
    }),
    displayOrder: 1,
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    languageCode: "en",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId: "alphabet_starter",
    moduleTitle: "Alphabet Starter",
    moduleTitleVi: "Alphabet Starter",
    title: "English · Core Foundation",
    titleVi: "Tiếng Anh · Nền tảng",
    description: "Start with individual English letters before phrases.",
    descriptionVi: "Bắt đầu với từng chữ cái tiếng Anh trước khi học cụm từ.",
    order: 0,
    units: [unit],
    lessons,
  });
}

function kanaDef(char, romanization, row, example, extra = {}) {
  return { char, romanization, row, example, ...extra };
}

function orderedKanaDefs(defs) {
  return defs.map((def, index) => ({ ...def, order: index + 1 }));
}

function kanaChars(defs, start, end) {
  return defs
    .slice(start - 1, end)
    .map((def) => [
      def.char,
      def.romanization,
      def.example,
      {
        order: def.order,
        row: def.row,
        meaning: def.meaning,
        idKey: def.idKey,
      },
    ]);
}

function kanaExampleWord(text, romanization, en, vi, ja, ko, zh, extra = {}) {
  return { text, romanization, translations: { en, vi, ja, ko, zh }, ...extra };
}

const HIRAGANA_BASIC_46 = orderedKanaDefs([
  kanaDef("あ", "a", "a-row", kanaExampleWord("あめ（雨）", "ame", "rain", "mưa", "雨", "비", "雨", { reading: "あめ", speechText: "あめ" })),
  kanaDef("い", "i", "a-row", kanaExampleWord("いぬ（犬）", "inu", "dog", "chó", "犬", "개", "狗", { reading: "いぬ", speechText: "いぬ" })),
  kanaDef("う", "u", "a-row", kanaExampleWord("うみ（海）", "umi", "sea", "biển", "海", "바다", "海", { reading: "うみ", speechText: "うみ" })),
  kanaDef("え", "e", "a-row", kanaExampleWord("えき（駅）", "eki", "station", "nhà ga", "駅", "역", "车站", { reading: "えき", speechText: "えき" })),
  kanaDef("お", "o", "a-row", kanaExampleWord("おに（鬼）", "oni", "demon / ogre", "quỷ / yêu quái", "鬼", "도깨비", "鬼", { reading: "おに", speechText: "おに" })),
  kanaDef("か", "ka", "ka-row", kanaExampleWord("かさ（傘）", "kasa", "umbrella", "ô", "傘", "우산", "伞", { reading: "かさ", speechText: "かさ" })),
  kanaDef("き", "ki", "ka-row", kanaExampleWord("きつね（狐）", "kitsune", "fox", "con cáo", "狐", "여우", "狐狸", { reading: "きつね", speechText: "きつね" })),
  kanaDef("く", "ku", "ka-row", kanaExampleWord("くも（雲）", "kumo", "cloud", "mây", "雲", "구름", "云", { reading: "くも", speechText: "くも" })),
  kanaDef("け", "ke", "ka-row", kanaExampleWord("けむり（煙）", "kemuri", "smoke", "khói", "煙", "연기", "烟", { reading: "けむり", speechText: "けむり" })),
  kanaDef("こ", "ko", "ka-row", kanaExampleWord("こえ（声）", "koe", "voice", "giọng nói", "声", "목소리", "声音", { reading: "こえ", speechText: "こえ" })),
  kanaDef("さ", "sa", "sa-row", kanaExampleWord("さくら（桜）", "sakura", "cherry blossom", "hoa anh đào", "桜", "벚꽃", "樱花", { reading: "さくら", speechText: "さくら" })),
  kanaDef("し", "shi", "sa-row", kanaExampleWord("しお（塩）", "shio", "salt", "muối", "塩", "소금", "盐", { reading: "しお", speechText: "しお" })),
  kanaDef("す", "su", "sa-row", kanaExampleWord("すし（寿司）", "sushi", "sushi", "sushi", "寿司", "초밥", "寿司", { reading: "すし", speechText: "すし" })),
  kanaDef("せ", "se", "sa-row", kanaExampleWord("せかい（世界）", "sekai", "world", "thế giới", "世界", "세계", "世界", { reading: "せかい", speechText: "せかい" })),
  kanaDef("そ", "so", "sa-row", kanaExampleWord("そら（空）", "sora", "sky", "bầu trời", "空", "하늘", "天空", { reading: "そら", speechText: "そら" })),
  kanaDef("た", "ta", "ta-row", kanaExampleWord("たこ（蛸）", "tako", "octopus", "bạch tuộc", "蛸", "문어", "章鱼", { reading: "たこ", speechText: "たこ" })),
  kanaDef("ち", "chi", "ta-row", kanaExampleWord("ちず（地図）", "chizu", "map", "bản đồ", "地図", "지도", "地图", { reading: "ちず", speechText: "ちず" })),
  kanaDef("つ", "tsu", "ta-row", kanaExampleWord("つき（月）", "tsuki", "moon", "mặt trăng", "月", "달", "月亮", { reading: "つき", speechText: "つき" })),
  kanaDef("て", "te", "ta-row", kanaExampleWord("て（手）", "te", "hand", "tay", "手", "손", "手", { reading: "て", speechText: "て" })),
  kanaDef("と", "to", "ta-row", kanaExampleWord("とり（鳥）", "tori", "bird", "chim", "鳥", "새", "鸟", { reading: "とり", speechText: "とり" })),
  kanaDef("な", "na", "na-row", kanaExampleWord("なつ（夏）", "natsu", "summer", "mùa hè", "夏", "여름", "夏天", { reading: "なつ", speechText: "なつ" })),
  kanaDef("に", "ni", "na-row", kanaExampleWord("にく（肉）", "niku", "meat", "thịt", "肉", "고기", "肉", { reading: "にく", speechText: "にく" })),
  kanaDef("ぬ", "nu", "na-row", kanaExampleWord("ぬの（布）", "nuno", "cloth", "vải", "布", "천", "布", { reading: "ぬの", speechText: "ぬの" })),
  kanaDef("ね", "ne", "na-row", kanaExampleWord("ねこ（猫）", "neko", "cat", "mèo", "猫", "고양이", "猫", { reading: "ねこ", speechText: "ねこ" })),
  kanaDef("の", "no", "na-row", kanaExampleWord("のり（海苔）", "nori", "seaweed", "rong biển", "海苔", "김", "海苔", { reading: "のり", speechText: "のり" })),
  kanaDef("は", "ha", "ha-row", kanaExampleWord("はな（花）", "hana", "flower", "hoa", "花", "꽃", "花", { reading: "はな", speechText: "はな" })),
  kanaDef("ひ", "hi", "ha-row", kanaExampleWord("ひこうき（飛行機）", "hikouki", "airplane", "máy bay", "飛行機", "비행기", "飞机", { reading: "ひこうき", speechText: "ひこうき" })),
  kanaDef("ふ", "fu", "ha-row", kanaExampleWord("ふね（船）", "fune", "boat", "thuyền", "船", "배", "船", { reading: "ふね", speechText: "ふね" })),
  kanaDef("へ", "he", "ha-row", kanaExampleWord("へや（部屋）", "heya", "room", "căn phòng", "部屋", "방", "房间", { reading: "へや", speechText: "へや" })),
  kanaDef("ほ", "ho", "ha-row", kanaExampleWord("ほし（星）", "hoshi", "star", "ngôi sao", "星", "별", "星星", { reading: "ほし", speechText: "ほし" })),
  kanaDef("ま", "ma", "ma-row", kanaExampleWord("まど（窓）", "mado", "window", "cửa sổ", "窓", "창문", "窗户", { reading: "まど", speechText: "まど" })),
  kanaDef("み", "mi", "ma-row", kanaExampleWord("みず（水）", "mizu", "water", "nước", "水", "물", "水", { reading: "みず", speechText: "みず" })),
  kanaDef("む", "mu", "ma-row", kanaExampleWord("むし（虫）", "mushi", "insect", "côn trùng", "虫", "벌레", "虫子", { reading: "むし", speechText: "むし" })),
  kanaDef("め", "me", "ma-row", kanaExampleWord("め（目）", "me", "eye", "mắt", "目", "눈", "眼睛", { reading: "め", speechText: "め" })),
  kanaDef("も", "mo", "ma-row", kanaExampleWord("もも（桃）", "momo", "peach", "quả đào", "桃", "복숭아", "桃子", { reading: "もも", speechText: "もも" })),
  kanaDef("や", "ya", "ya-row", kanaExampleWord("やま（山）", "yama", "mountain", "núi", "山", "산", "山", { reading: "やま", speechText: "やま" })),
  kanaDef("ゆ", "yu", "ya-row", kanaExampleWord("ゆき（雪）", "yuki", "snow", "tuyết", "雪", "눈", "雪", { reading: "ゆき", speechText: "ゆき" })),
  kanaDef("よ", "yo", "ya-row", kanaExampleWord("よる（夜）", "yoru", "night", "ban đêm", "夜", "밤", "夜晚", { reading: "よる", speechText: "よる" })),
  kanaDef("ら", "ra", "ra-row", kanaExampleWord("らいねん（来年）", "rainen", "next year", "năm sau", "来年", "내년", "明年", { reading: "らいねん", speechText: "らいねん" })),
  kanaDef("り", "ri", "ra-row", kanaExampleWord("りんご（林檎）", "ringo", "apple", "táo", "林檎", "사과", "苹果", { reading: "りんご", speechText: "りんご" })),
  kanaDef("る", "ru", "ra-row", kanaExampleWord("るす（留守）", "rusu", "not at home", "vắng nhà", "留守", "부재중", "不在家", { reading: "るす", speechText: "るす" })),
  kanaDef("れ", "re", "ra-row", kanaExampleWord("れいぞうこ（冷蔵庫）", "reizouko", "refrigerator", "tủ lạnh", "冷蔵庫", "냉장고", "冰箱", { reading: "れいぞうこ", speechText: "れいぞうこ" })),
  kanaDef("ろ", "ro", "ra-row", kanaExampleWord("ろうそく（蝋燭）", "rousoku", "candle", "nến", "蝋燭", "양초", "蜡烛", { reading: "ろうそく", speechText: "ろうそく" })),
  kanaDef("わ", "wa", "wa-row", kanaExampleWord("わに（鰐）", "wani", "crocodile", "cá sấu", "鰐", "악어", "鳄鱼", { reading: "わに", speechText: "わに" })),
  kanaDef(
    "を",
    "o",
    "wa-row",
    kanaExampleWord("ほんをよむ（本を読む）", "hon o yomu", "read a book", "đọc sách", "本を読む", "책을 읽다", "读书", {
      reading: "ほんをよむ",
      speechText: "ほんをよむ",
    }),
    {
      idKey: "wo",
      meaning: {
        en: "object particle",
        vi: "trợ từ tân ngữ",
        ja: "目的語を表す助詞",
        ko: "목적어 조사",
        zh: "宾语助词",
      },
    },
  ),
  kanaDef("ん", "n", "n-row", kanaExampleWord("ほん（本）", "hon", "book", "sách", "本", "책", "书", { reading: "ほん", speechText: "ほん" })),
]);

const KATAKANA_BASIC_46 = orderedKanaDefs([
  kanaDef("ア", "a", "a-row", kanaExampleWord("アイス", "aisu", "ice cream", "kem", "アイス", "아이스크림", "冰淇淋")),
  kanaDef("イ", "i", "a-row", kanaExampleWord("イス", "isu", "chair", "ghế", "椅子", "의자", "椅子")),
  kanaDef("ウ", "u", "a-row", kanaExampleWord("ウール", "uuru", "wool", "len", "ウール", "울", "羊毛")),
  kanaDef("エ", "e", "a-row", kanaExampleWord("エアコン", "eakon", "air conditioner", "máy lạnh", "エアコン", "에어컨", "空调")),
  kanaDef("オ", "o", "a-row", kanaExampleWord("オレンジ", "orenji", "orange", "cam", "オレンジ", "오렌지", "橙子")),
  kanaDef("カ", "ka", "ka-row", kanaExampleWord("カメラ", "kamera", "camera", "máy ảnh", "カメラ", "카메라", "相机")),
  kanaDef("キ", "ki", "ka-row", kanaExampleWord("キロ", "kiro", "kilo", "ki-lô", "キロ", "킬로", "千克")),
  kanaDef("ク", "ku", "ka-row", kanaExampleWord("クラス", "kurasu", "class", "lớp học", "クラス", "클래스", "班级")),
  kanaDef("ケ", "ke", "ka-row", kanaExampleWord("ケーキ", "keeki", "cake", "bánh ngọt", "ケーキ", "케이크", "蛋糕")),
  kanaDef("コ", "ko", "ka-row", kanaExampleWord("コーヒー", "koohii", "coffee", "cà phê", "コーヒー", "커피", "咖啡")),
  kanaDef("サ", "sa", "sa-row", kanaExampleWord("サラダ", "sarada", "salad", "salad", "サラダ", "샐러드", "沙拉")),
  kanaDef("シ", "shi", "sa-row", kanaExampleWord("シャツ", "shatsu", "shirt", "áo sơ mi", "シャツ", "셔츠", "衬衫")),
  kanaDef("ス", "su", "sa-row", kanaExampleWord("スープ", "suupu", "soup", "súp", "スープ", "수프", "汤")),
  kanaDef("セ", "se", "sa-row", kanaExampleWord("セーター", "seetaa", "sweater", "áo len", "セーター", "스웨터", "毛衣")),
  kanaDef("ソ", "so", "sa-row", kanaExampleWord("ソファ", "sofa", "sofa", "ghế sofa", "ソファ", "소파", "沙发")),
  kanaDef("タ", "ta", "ta-row", kanaExampleWord("タクシー", "takushii", "taxi", "taxi", "タクシー", "택시", "出租车")),
  kanaDef("チ", "chi", "ta-row", kanaExampleWord("チーズ", "chiizu", "cheese", "phô mai", "チーズ", "치즈", "奶酪")),
  kanaDef("ツ", "tsu", "ta-row", kanaExampleWord("ツアー", "tsuaa", "tour", "tour", "ツアー", "투어", "旅行团")),
  kanaDef("テ", "te", "ta-row", kanaExampleWord("テスト", "tesuto", "test", "bài kiểm tra", "テスト", "테스트", "测验")),
  kanaDef("ト", "to", "ta-row", kanaExampleWord("トマト", "tomato", "tomato", "cà chua", "トマト", "토마토", "番茄")),
  kanaDef("ナ", "na", "na-row", kanaExampleWord("ナイフ", "naifu", "knife", "dao", "ナイフ", "나이프", "刀")),
  kanaDef("ニ", "ni", "na-row", kanaExampleWord("ニュース", "nyuusu", "news", "tin tức", "ニュース", "뉴스", "新闻")),
  kanaDef("ヌ", "nu", "na-row", kanaExampleWord("ヌードル", "nuudoru", "noodles", "mì", "ヌードル", "누들", "面条")),
  kanaDef("ネ", "ne", "na-row", kanaExampleWord("ネクタイ", "nekutai", "necktie", "cà vạt", "ネクタイ", "넥타이", "领带")),
  kanaDef("ノ", "no", "na-row", kanaExampleWord("ノート", "nooto", "notebook", "vở", "ノート", "노트", "笔记本")),
  kanaDef("ハ", "ha", "ha-row", kanaExampleWord("ハンバーガー", "hanbaagaa", "hamburger", "hamburger", "ハンバーガー", "햄버거", "汉堡包")),
  kanaDef("ヒ", "hi", "ha-row", kanaExampleWord("ヒーター", "hiitaa", "heater", "máy sưởi", "ヒーター", "히터", "暖气机")),
  kanaDef("フ", "fu", "ha-row", kanaExampleWord("フォーク", "fooku", "fork", "nĩa", "フォーク", "포크", "叉子")),
  kanaDef("ヘ", "he", "ha-row", kanaExampleWord("ヘルメット", "herumetto", "helmet", "mũ bảo hiểm", "ヘルメット", "헬멧", "头盔")),
  kanaDef("ホ", "ho", "ha-row", kanaExampleWord("ホテル", "hoteru", "hotel", "khách sạn", "ホテル", "호텔", "酒店")),
  kanaDef("マ", "ma", "ma-row", kanaExampleWord("マスク", "masuku", "mask", "khẩu trang", "マスク", "마스크", "口罩")),
  kanaDef("ミ", "mi", "ma-row", kanaExampleWord("ミルク", "miruku", "milk", "sữa", "ミルク", "우유", "牛奶")),
  kanaDef("ム", "mu", "ma-row", kanaExampleWord("ムービー", "muubii", "movie", "phim", "ムービー", "무비", "电影")),
  kanaDef("メ", "me", "ma-row", kanaExampleWord("メニュー", "menyuu", "menu", "thực đơn", "メニュー", "메뉴", "菜单")),
  kanaDef("モ", "mo", "ma-row", kanaExampleWord("モデル", "moderu", "model", "mẫu", "モデル", "모델", "模特")),
  kanaDef("ヤ", "ya", "ya-row", kanaExampleWord("ヤード", "yaado", "yard", "thước yard", "ヤード", "야드", "码")),
  kanaDef("ユ", "yu", "ya-row", kanaExampleWord("ユーロ", "yuuro", "euro", "euro", "ユーロ", "유로", "欧元")),
  kanaDef("ヨ", "yo", "ya-row", kanaExampleWord("ヨガ", "yoga", "yoga", "yoga", "ヨガ", "요가", "瑜伽")),
  kanaDef("ラ", "ra", "ra-row", kanaExampleWord("ラジオ", "rajio", "radio", "radio", "ラジオ", "라디오", "收音机")),
  kanaDef("リ", "ri", "ra-row", kanaExampleWord("リモコン", "rimokon", "remote control", "điều khiển từ xa", "リモコン", "리모컨", "遥控器")),
  kanaDef("ル", "ru", "ra-row", kanaExampleWord("ルール", "ruuru", "rule", "quy tắc", "ルール", "규칙", "规则")),
  kanaDef("レ", "re", "ra-row", kanaExampleWord("レモン", "remon", "lemon", "chanh vàng", "レモン", "레몬", "柠檬")),
  kanaDef("ロ", "ro", "ra-row", kanaExampleWord("ロボット", "robotto", "robot", "robot", "ロボット", "로봇", "机器人")),
  kanaDef("ワ", "wa", "wa-row", kanaExampleWord("ワイン", "wain", "wine", "rượu vang", "ワイン", "와인", "葡萄酒")),
  kanaDef("ヲ", "wo", "wa-row", kanaExampleWord("ヲタク", "wotaku", "otaku fan", "người hâm mộ otaku", "ヲタク", "오타쿠 팬", "御宅族粉丝")),
  kanaDef("ン", "n", "n-row", kanaExampleWord("ペン", "pen", "pen", "bút", "ペン", "펜", "笔")),
]);

function jaHiraganaFoundationUnitV2() {
  const unitId = "ja-core-foundation-hiragana-u1";
  const rows = [
    { id: "ja-hiragana-u1-l1", order: 1, title: "Hiragana 1: あいうえお", titleVi: "Hiragana 1: あいうえお", chars: kanaChars(HIRAGANA_BASIC_46, 1, 5) },
    { id: "ja-hiragana-u1-l2", order: 2, title: "Hiragana 2: かきくけこ", titleVi: "Hiragana 2: かきくけこ", chars: kanaChars(HIRAGANA_BASIC_46, 6, 10) },
    { id: "ja-hiragana-u1-l3", order: 3, title: "Hiragana 3: さしすせそ", titleVi: "Hiragana 3: さしすせそ", chars: kanaChars(HIRAGANA_BASIC_46, 11, 15) },
    { id: "ja-hiragana-u1-l4", order: 4, title: "Hiragana 4: たちつてと", titleVi: "Hiragana 4: たちつてと", chars: kanaChars(HIRAGANA_BASIC_46, 16, 20) },
    { id: "ja-hiragana-u1-l5", order: 5, title: "Hiragana 5: なにぬねの", titleVi: "Hiragana 5: なにぬねの", chars: kanaChars(HIRAGANA_BASIC_46, 21, 25) },
    { id: "ja-hiragana-u1-l6", order: 6, title: "Hiragana 6: はひふへほ", titleVi: "Hiragana 6: はひふへほ", chars: kanaChars(HIRAGANA_BASIC_46, 26, 30) },
    { id: "ja-hiragana-u1-l7", order: 7, title: "Hiragana 7: まみむめも", titleVi: "Hiragana 7: まみむめも", chars: kanaChars(HIRAGANA_BASIC_46, 31, 35) },
    { id: "ja-hiragana-u1-l8", order: 8, title: "Hiragana 8: やゆよ", titleVi: "Hiragana 8: やゆよ", chars: kanaChars(HIRAGANA_BASIC_46, 36, 38), distractorChars: kanaChars(HIRAGANA_BASIC_46, 35, 35) },
    { id: "ja-hiragana-u1-l9", order: 9, title: "Hiragana 9: らりるれろ", titleVi: "Hiragana 9: らりるれろ", chars: kanaChars(HIRAGANA_BASIC_46, 39, 43) },
    { id: "ja-hiragana-u1-l10", order: 10, title: "Hiragana 10: わをん", titleVi: "Hiragana 10: わをん", chars: kanaChars(HIRAGANA_BASIC_46, 44, 46), distractorChars: kanaChars(HIRAGANA_BASIC_46, 43, 43), isCheckpoint: true },
  ];

  const lessons = rows.map((row) =>
    buildKanaLesson({
      id: row.id,
      unitId,
      order: row.order,
      title: row.title,
      titleVi: row.titleVi,
      chars: row.chars,
      distractorChars: row.distractorChars,
      isCheckpoint: row.isCheckpoint,
      script: "hiragana",
      moduleId: "hiragana_starter",
    }),
  );

  const unit = {
    id: unitId,
    title: "Unit 1: Hiragana basics",
    titleVi: "Unit 1: Hiragana cơ bản",
    titleByNative: t({
      en: "Unit 1: Hiragana basics",
      vi: "Bài 1: Hiragana cơ bản",
      ja: "ユニット1：ひらがな基礎",
      ko: "유닛 1: 히라가나 기초",
      zh: "单元1：平假名基础",
    }),
    levelCode: "A0",
    trackId: "ja-core_foundation",
    moduleId: "hiragana_starter",
    goal: "Recognize all 46 basic hiragana characters in gojuon order.",
    goalVi: "Nhận biết đủ 46 chữ hiragana cơ bản theo thứ tự gojuon.",
    goalByNative: t({
      en: "Recognize all 46 basic hiragana characters in gojūon order.",
      vi: "Nhận biết đủ 46 chữ hiragana cơ bản theo thứ tự gojuon.",
      ja: "五十音順で46字の基本ひらがなを見分けます。",
      ko: "오십음도 순서로 기본 히라가나 46자를 구별합니다.",
      zh: "按五十音顺序识别全部46个基础平假名。",
    }),
    displayOrder: 1,
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    courseId: "ja-core_foundation-hiragana",
    languageCode: "ja",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId: "hiragana_starter",
    moduleTitle: "Hiragana Starter",
    moduleTitleVi: "Hiragana Starter",
    title: "Japanese · Core Foundation · Hiragana",
    titleVi: "Tiếng Nhật · Nền tảng · Hiragana",
    description: "Start with all 46 basic hiragana characters before phrases.",
    descriptionVi: "Bắt đầu với đủ 46 chữ hiragana cơ bản trước khi học cụm từ.",
    order: 0,
    units: [unit],
    lessons,
  });
}

function jaKatakanaFoundationUnitV2() {
  // Keep stable lesson/unit ids (…-u4-…) but display as Core Foundation Unit 2.
  const unitId = "ja-core-foundation-katakana-u4";
  const rows = [
    { id: "ja-katakana-u4-l1", order: 1, title: "Katakana 1: アイウエオ", titleVi: "Katakana 1: アイウエオ", chars: kanaChars(KATAKANA_BASIC_46, 1, 5) },
    { id: "ja-katakana-u4-l2", order: 2, title: "Katakana 2: カキクケコ", titleVi: "Katakana 2: カキクケコ", chars: kanaChars(KATAKANA_BASIC_46, 6, 10) },
    { id: "ja-katakana-u4-l3", order: 3, title: "Katakana 3: サシスセソ", titleVi: "Katakana 3: サシスセソ", chars: kanaChars(KATAKANA_BASIC_46, 11, 15) },
    { id: "ja-katakana-u4-l4", order: 4, title: "Katakana 4: タチツテト", titleVi: "Katakana 4: タチツテト", chars: kanaChars(KATAKANA_BASIC_46, 16, 20) },
    { id: "ja-katakana-u4-l5", order: 5, title: "Katakana 5: ナニヌネノ", titleVi: "Katakana 5: ナニヌネノ", chars: kanaChars(KATAKANA_BASIC_46, 21, 25) },
    { id: "ja-katakana-u4-l6", order: 6, title: "Katakana 6: ハヒフヘホ", titleVi: "Katakana 6: ハヒフヘホ", chars: kanaChars(KATAKANA_BASIC_46, 26, 30) },
    { id: "ja-katakana-u4-l7", order: 7, title: "Katakana 7: マミムメモ", titleVi: "Katakana 7: マミムメモ", chars: kanaChars(KATAKANA_BASIC_46, 31, 35) },
    { id: "ja-katakana-u4-l8", order: 8, title: "Katakana 8: ヤユヨ", titleVi: "Katakana 8: ヤユヨ", chars: kanaChars(KATAKANA_BASIC_46, 36, 38), distractorChars: kanaChars(KATAKANA_BASIC_46, 35, 35) },
    { id: "ja-katakana-u4-l9", order: 9, title: "Katakana 9: ラリルレロ", titleVi: "Katakana 9: ラリルレロ", chars: kanaChars(KATAKANA_BASIC_46, 39, 43) },
    { id: "ja-katakana-u4-l10", order: 10, title: "Katakana 10: ワヲン", titleVi: "Katakana 10: ワヲン", chars: kanaChars(KATAKANA_BASIC_46, 44, 46), distractorChars: kanaChars(KATAKANA_BASIC_46, 43, 43), isCheckpoint: true },
  ];

  const lessons = rows.map((row) =>
    buildKanaLesson({
      id: row.id,
      unitId,
      order: row.order,
      title: row.title,
      titleVi: row.titleVi,
      chars: row.chars,
      distractorChars: row.distractorChars,
      isCheckpoint: row.isCheckpoint,
      script: "katakana",
      moduleId: "katakana_starter",
    }),
  );

  const unit = {
    id: unitId,
    title: "Unit 2: Katakana Basics",
    titleVi: "Unit 2: Katakana cơ bản",
    titleByNative: t({
      en: "Unit 2: Katakana basics",
      vi: "Bài 2: Katakana cơ bản",
      ja: "ユニット2：カタカナ基礎",
      ko: "유닛 2: 가타카나 기초",
      zh: "单元2：片假名基础",
    }),
    levelCode: "A0",
    trackId: "ja-core_foundation",
    moduleId: "katakana_starter",
    goal: "Recognize all 46 basic katakana characters in gojuon order.",
    goalVi: "Nhận biết đủ 46 chữ katakana cơ bản theo thứ tự gojuon.",
    goalByNative: t({
      en: "Recognize all 46 basic katakana characters in gojūon order.",
      vi: "Nhận biết đủ 46 chữ katakana cơ bản theo thứ tự gojuon.",
      ja: "五十音順で46字の基本カタカナを見分けます。",
      ko: "오십음도 순서로 기본 가타카나 46자를 구별합니다.",
      zh: "按五十音顺序识别全部46个基础片假名。",
    }),
    displayOrder: 2,
    order: 2,
    lessonIds: lessons.map((l) => l.id),
  };

  return makeCourse({
    courseId: "ja-core_foundation-katakana",
    languageCode: "ja",
    nicheId: "core_foundation",
    branch: "core_foundation",
    moduleId: "katakana_starter",
    moduleTitle: "Katakana Basics",
    moduleTitleVi: "Katakana cơ bản",
    title: "Japanese · Core Foundation · Katakana",
    titleVi: "Tiếng Nhật · Nền tảng · Katakana",
    description: "Learn all 46 basic katakana characters with short loanword examples.",
    descriptionVi: "Học đủ 46 chữ katakana cơ bản với ví dụ từ mượn ngắn.",
    order: 1,
    units: [unit],
    lessons,
  });
}

async function main() {
  const packs = [
    jaHiraganaFoundationUnitV2(),
    jaKatakanaFoundationUnitV2(),
    enAlphabetFoundationUnit1(),
    enGreetingsUnit1(),
    jaGreetingsUnit1(),
  ];
  const courses = packs.map((p) => p.course);
  const lessons = packs.flatMap((p) => p.lessons);
  const generatedAt = GENERATED_AT;
  const unitCount = courses.reduce((sum, c) => sum + c.units.length, 0);

  const catalog = {
    version: VERSION,
    generatedAt,
    architecture: {
      coreFoundation: {
        status: "partial",
        note: "Japanese Hiragana + Katakana Basics and English Alphabet Starter (A–Z) are playable. A0 users must finish or skip Core Foundation before niche lessons.",
      },
      mainNiches: [
        "daily_life",
        "travel_hotel",
        "restaurant_food_service",
        "it_programming",
        "ai_data_analytics",
        "healthcare",
        "business_office",
        "sales_customer_service",
        "education_school",
        "manufacturing_engineering",
        "construction_real_estate",
        "logistics_delivery",
        "finance_accounting",
        "marketing_content_creation",
        "environment_energy_agriculture",
      ],
      examPreparation: { status: "placeholder", note: "Separate future branch — do not build yet." },
    },
    languages: LEARNING_CATALOG,
    playableLanguages: PLAYABLE_LANGUAGES,
    nichesPlayable: ["core_foundation", "daily_life"],
    modulesPlayable: ["hiragana_starter", "alphabet_starter", "greetings"],
    courseCount: courses.length,
    lessonCount: lessons.length,
    unitCount,
    courses: courses.map((c) => {
      const courseLessons = lessons.filter((l) => c.unitIds.includes(l.unitId));
      return {
        id: c.id,
        languageCode: c.languageCode,
        nicheId: c.nicheId,
        branch: c.branch,
        moduleId: c.moduleId,
        title: c.title,
        lessonCount: courseLessons.length,
        playableLessonCount: courseLessons.filter((l) => !l.comingSoon).length,
      };
    }),
  };

  const coursesPayload = { version: VERSION, generatedAt, courses };
  const lessonsPayload = { version: VERSION, generatedAt, lessons };

  const readme = `# Shared curriculum (${VERSION})

Generated by \`scripts/generate-curriculum.mjs\`.

Current playable scope:
- Core Foundation first for A0: JA hiragana + EN alphabet
- Daily Life → Greetings Unit 1 after foundation complete/skip
- Each lesson: exactly 10 exercises (1–7 free, 8–10 Plus)

\`\`\`bash
npm run generate:curriculum
npm run validate:curriculum
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

  console.log(`Generated ${VERSION}: ${courses.length} courses, ${unitCount} units, ${lessons.length} lessons.`);
  for (const entry of catalog.courses) {
    console.log(`  - ${entry.id}: ${entry.playableLessonCount}/${entry.lessonCount} playable`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
