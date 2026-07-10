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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIRS = [
  path.join(ROOT, "shared", "generated"),
  path.join(ROOT, "shared", "content", "curriculum"),
];

const VERSION = "curriculum-v3";
const NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];
const LEARNING_CATALOG = [
  "en", "ja", "es", "ko", "zh", "fr", "de", "it", "pt", "vi",
  "th", "id", "ms", "tl", "hi", "ar", "ru", "nl", "sv", "tr",
];
const PLAYABLE_LANGUAGES = ["en", "ja"];
const FREE_TYPES = [
  "chooseMeaning",
  "chooseVocabulary",
  "matchPairs",
  "fillBlank",
  "chooseCorrectAnswer",
  "listenAndChoose",
  "typeAnswer",
];
const PLUS_TYPES = ["listeningGapFill", "controlledAiQa", "aiFeedbackReview"];

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
  const selected = entries.slice(0, Math.min(4, entries.length));
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
  return baseExercise(
    id,
    "fillBlank",
    "free",
    promptMap(
      "Fill in the missing word.",
      "Điền từ còn thiếu.",
      "空欄に入る語を選んでください。",
      "빈칸에 알맞은 말을 고르세요.",
      "填入缺少的词。",
    ),
    {
      displayText: sentence,
      speechText: speechText ?? sentence.replace("___", blankWord),
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
    },
  );
}

function exChooseCorrectAnswer(id, promptTarget, correct, distractors) {
  const options = rotated([correct, ...distractors.slice(0, 3)], id);
  assertUnique(options, `chooseCorrectAnswer ${id}`);
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
    {
      displayText: promptTarget.displayText,
      speechText: promptTarget.speechText,
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
    },
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
      reading: target.reading,
      romanization: target.romanization,
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
  const gaps = sentences.map((s) => s.blankWord);
  return baseExercise(
    id,
    "listeningGapFill",
    "plus",
    promptMap(
      "Listen to the short lines and fill the missing words.",
      "Nghe các câu ngắn và điền từ còn thiếu.",
      "短い文を聞いて空欄を埋めてください。",
      "짧은 문장을 듣고 빈칸을 채우세요.",
      "听短句并填入缺少的词。",
    ),
    {
      displayText: sentences.map((s) => s.text).join("\n"),
      speechText: sentences.map((s) => s.speechText).join("。"),
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

function makeLesson(fields) {
  return {
    ...fields,
    moduleId: fields.moduleId ?? "greetings",
    branch: "niche",
    comingSoon: false,
  };
}

function makeCourse({ languageCode, nicheId, title, titleVi, description, descriptionVi, units, lessons }) {
  return {
    course: {
      id: `${languageCode}-${nicheId}`,
      languageCode,
      nicheId,
      branch: "niche",
      moduleId: "greetings",
      moduleTitle: "Greetings",
      moduleTitleVi: "Chào hỏi",
      title,
      titleVi,
      description,
      descriptionVi,
      levelCode: "A0",
      order: 1,
      unitIds: units.map((u) => u.id),
      isComingSoon: false,
      units,
    },
    lessons,
  };
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
    units: [unit],
    lessons,
  });
}

async function main() {
  const packs = [enGreetingsUnit1(), jaGreetingsUnit1()];
  const courses = packs.map((p) => p.course);
  const lessons = packs.flatMap((p) => p.lessons);
  const generatedAt = new Date().toISOString();
  const unitCount = courses.reduce((sum, c) => sum + c.units.length, 0);

  const catalog = {
    version: VERSION,
    generatedAt,
    architecture: {
      coreFoundation: { status: "placeholder", note: "Alphabet/script basics by language — not built yet." },
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
    nichesPlayable: ["daily_life"],
    modulesPlayable: ["greetings"],
    courseCount: courses.length,
    lessonCount: lessons.length,
    unitCount,
    courses: courses.map((c) => {
      const courseLessons = lessons.filter((l) => c.unitIds.includes(l.unitId));
      return {
        id: c.id,
        languageCode: c.languageCode,
        nicheId: c.nicheId,
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

Current playable scope (review before expanding):
- Learning languages available: en, ja
- Other 18 catalog languages: comingSoon only
- Niche: daily_life → module greetings → Unit 1 only
- Each lesson: exactly 10 exercises (1–7 free, 8–10 Plus)
- Exam Preparation: placeholder only

Do not hand-edit JSON under \`shared/generated/\`.
Edit the generator, then run:

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
