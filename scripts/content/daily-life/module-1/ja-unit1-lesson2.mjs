import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit1-lesson2-localization.mjs';

// Daily Life / Module 1 / Unit 1 / Lesson 2 — "お名前を聞く" (Asking someone's
// name). Owner-approved Japanese source assembled from the L2 markdown into
// the same five_cards schema as the Golden Reference Lesson
// (ja-unit1-lesson1.mjs). Q1–Q9 Free, Q10–Q14 Plus (owner rule 2026-07-19,
// LESSON_AUTHORING_STANDARD.md §B5/§D5). The Japanese learning content is the
// approved source; only Vietnamese learner-support is localized to en/ja via
// ja-unit1-lesson2-localization.mjs.
const vi = (value) => supportTextByVietnamese.get(value) ?? { vi: value };
const speakerReadings = { '田中': 'たなか', '伊藤': 'いとう', '佐藤': 'さとう' };

const approvedCharacterNamePool = [
  { id: 'tanaka', displayName: '田中（たなか）', canonicalName: '田中', audioName: 'たなか' },
  { id: 'ito', displayName: '伊藤（いとう）', canonicalName: '伊藤', audioName: 'いとう' },
  { id: 'sato', displayName: '佐藤（さとう）', canonicalName: '佐藤', audioName: 'さとう' },
];
const characterById = Object.fromEntries(approvedCharacterNamePool.map((character) => [character.id, character]));

const line = (speaker, text, reading, translation, speechText = text) => ({
  speaker,
  speakerReading: speakerReadings[speaker],
  targetText: text,
  displayText: text,
  reading,
  speechText,
  translationByNative: vi(translation),
  translations: vi(translation),
  meaningVi: translation,
  audioLocale: 'ja-JP',
});

const dialogueLine = (speakerId, text, reading, translation, speechText) => ({
  ...line(
    characterById[speakerId].canonicalName,
    text,
    reading,
    translation,
    speechText,
  ),
  speakerId,
  speaker: undefined,
  speakerReading: undefined,
});

const example = (text, reading, translation, speechText = reading) => ({ text, reading, translation, speechText });
const option = (id, text, canonicalText = text, audioText = canonicalText) => ({ id, text, canonicalText, audioText });
const token = (id, text, canonicalText = text, audioText = canonicalText) => ({ id, text, canonicalText, audioText });

const PRACTICE_EXERCISES = [
  {
    id: 'ja-daily_life-m01-u1-l2-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    prompt: 'お名前は？ có nghĩa là gì?',
    options: [option('meaning_your_name', 'Tên bạn là gì?'), option('meaning_im_tanaka', 'Tôi là Tanaka.'), option('meaning_see_you', 'Hẹn gặp lại.'), option('meaning_thanks', 'Xin cảm ơn.')],
    correctOptionId: 'meaning_your_name',
    feedback: { correctAnswer: 'Tên bạn là gì?', explanation: 'お名前は？ là cách hỏi tên ngắn gọn.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    prompt: 'Bạn muốn hỏi một cách lịch sự: “Tên bạn là gì?”',
    options: [option('ask_full', 'お名前は何ですか。'), option('self_intro', '私は田中です。'), option('confirm', '伊藤さんですね。'), option('closing', 'よろしくお願いします。')],
    correctOptionId: 'ask_full',
    feedback: { correctAnswer: 'お名前は何ですか。', explanation: 'お名前は何ですか。 là cách hỏi tên đầy đủ và lịch sự.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi mục với nghĩa phù hợp.',
    pairs: [
      { id: 'namae', left: { id: 'namae_l', text: '名前' }, right: { id: 'namae_r', text: 'Tên' } },
      { id: 'onamae_wa', left: { id: 'onamae_wa_l', text: 'お名前は？' }, right: { id: 'onamae_wa_r', text: 'Tên bạn là gì?' } },
      { id: 'mou_ichido', left: { id: 'mou_l', text: 'もう一度お願いします' }, right: { id: 'mou_r', text: 'Vui lòng nói lại một lần nữa' } },
      { id: 'san_desu_ne', left: { id: 'sdn_l', text: '～さんですね' }, right: { id: 'sdn_r', text: 'Xác nhận tên vừa nghe' } },
    ],
    feedback: { explanation: 'Mỗi mục gắn với một chức năng giao tiếp cụ thể.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp các thẻ thành câu “Tên bạn là gì?”',
    tokens: [token('onamae', 'お名前（なまえ）', 'お名前', 'おなまえ'), token('wa', 'は'), token('nan', '何（なん）', '何', 'なん'), token('desuka', 'ですか'), token('san', 'さん'), token('kochirakoso', 'こちらこそ')],
    correctTokenIds: ['onamae', 'wa', 'nan', 'desuka'],
    feedback: { correctAnswer: 'お名前（なまえ）は何（なん）ですか。', canonicalAnswer: 'お名前は何ですか。', audioText: 'おなまえはなんですか。', explanation: 'お名前 + は + 何 + ですか → お名前は何ですか。 さん và こちらこそ không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['田中: すみません、お名前（なまえ）は？', '伊藤: 伊藤（いとう）です。', '田中: すみません、{{slot_1}}。'],
    slots: [{ id: 'slot_1', answerId: 'mou_ichido', placeholder: '________' }],
    wordBank: [option('mou_ichido', 'もう一度（いちど）お願（ねが）いします', 'もう一度お願いします', 'もういちどおねがいします'), option('mata_ashita', 'また明日（あした）', 'また明日', 'またあした'), option('kochira_koso', 'こちらこそ')],
    feedback: { correctAnswer: 'すみません、もう一度（いちど）お願（ねが）いします。', canonicalAnswer: 'すみません、もう一度お願いします。', audioText: 'すみません、もういちどおねがいします。', explanation: 'Khi chưa nghe rõ, dùng もう一度お願いします để nhờ nói lại.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'おなまえはなんですか。',
    options: [option('ask_name', 'Hỏi tên người đối diện'), option('self_name', 'Tự giới thiệu tên mình'), option('confirm_name', 'Xác nhận tên vừa nghe'), option('farewell', 'Nói lời tạm biệt')],
    correctOptionId: 'ask_name',
    feedback: { correctAnswer: 'Hỏi tên người đối diện', explanation: 'Câu nghe được là お名前は何ですか。 — một câu hỏi tên.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    prompt: 'Chọn từ điền vào chỗ trống: 伊藤さん___。',
    options: [option('desu_ne', 'ですね'), option('nan_desu_ka', '何ですか'), option('mou_ichido', 'もう一度'), option('onamae_wa', 'お名前は')],
    correctOptionId: 'desu_ne',
    feedback: { correctAnswer: 'ですね', explanation: '～さんですね dùng để xác nhận tên vừa nghe.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    context: 'Người đối diện vừa nói tên nhưng bạn không nghe rõ.',
    prompt: 'Bạn nên nói gì?',
    options: [option('ask_repeat', 'すみません、もう一度お願いします。'), option('wrong_self', 'お名前は田中です。'), option('wrong_kochira', 'こちらこそ。'), option('wrong_bye', 'さようなら。')],
    correctOptionId: 'ask_repeat',
    feedback: { correctAnswer: 'すみません、もう一度お願いします。', explanation: 'Khi không nghe rõ, nhờ nói lại bằng すみません、もう一度お願いします。' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'お名前 có nghĩa gì?', options: [option('polite_name', 'Tên (cách nói lịch sự)'), option('goodbye', 'Lời tạm biệt'), option('thanks', 'Lời cảm ơn'), option('sorry', 'Lời xin lỗi')], correctOptionId: 'polite_name', feedback: { correctAnswer: 'Tên (cách nói lịch sự)', explanation: 'お名前 là cách nói lịch sự của 名前.' } },
      { id: 'q9_2', prompt: 'Tự giới thiệu “Tôi là Tanaka” nói thế nào?', options: [option('self_tanaka', '私は田中です。'), option('ask_name', 'お名前は？'), option('ito', '伊藤です。'), option('bye', 'さようなら。')], correctOptionId: 'self_tanaka', feedback: { correctAnswer: '私は田中です。', explanation: '私は田中です。 dùng để tự giới thiệu tên mình.' } },
      { id: 'q9_3', prompt: 'Xác nhận “佐藤です” thì nói gì?', options: [option('confirm_sato', '佐藤さんですね。'), option('self_sato', '佐藤です。'), option('ask', 'お名前は？'), option('repeat', 'もう一度お願いします。')], correctOptionId: 'confirm_sato', feedback: { correctAnswer: '佐藤さんですね。', explanation: '～さんですね dùng để xác nhận tên.' } },
      { id: 'q9_4', prompt: 'Trong お名前は何ですか, 何 đọc là gì?', options: [option('nan', 'なん'), option('nani', 'なに'), option('nanno', 'なんの'), option('itsu', 'いつ')], correctOptionId: 'nan', feedback: { correctAnswer: 'なん', explanation: 'Trong ～は何ですか, 何 được đọc là なん.' } },
      { id: 'q9_5', prompt: 'Yêu cầu nói lại thì nói gì?', options: [option('repeat', 'もう一度お願いします。'), option('closing', 'よろしくお願いします。'), option('kochira', 'こちらこそ。'), option('first', 'はじめまして。')], correctOptionId: 'repeat', feedback: { correctAnswer: 'もう一度お願いします。', explanation: 'もう一度お願いします dùng để nhờ nói lại.' } },
    ],
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '14:00',
      context: 'Hai người gặp nhau. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: 'こんにちは。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ displayText: 'こんにちは。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'すみません、' }, { slotId: 'chat_ask_name_slot' }, { displayText: '？' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ displayText: '伊藤（いとう）です。', canonicalText: '伊藤です。', audioText: 'いとうです。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ slotId: 'chat_confirm_name_slot' }, { displayText: 'さんですね。' }] },
        { id: 'message_6', speakerId: 'b', segments: [{ displayText: 'はい。\nよろしくお願（ねが）いします。', canonicalText: 'はい。よろしくお願いします。', audioText: 'はい。よろしくおねがいします。' }] },
      ],
    },
    slots: [
      { id: 'chat_ask_name_slot', displayText: 'お名前（なまえ）は', canonicalText: 'お名前は', audioText: 'おなまえは', acceptedAnswers: ['お名前は', 'おなまえは', 'お名前は？', 'おなまえは？'] },
      { id: 'chat_confirm_name_slot', displayText: '伊藤（いとう）', canonicalText: '伊藤', audioText: 'いとう', acceptedAnswers: ['伊藤', 'いとう', 'イトウ'] },
    ],
    feedback: { correctAnswer: 'お名前（なまえ）は？\n伊藤（いとう）さんですね。', canonicalAnswer: 'お名前は？ 伊藤さんですね。', audioText: 'おなまえは？ いとうさんですね。', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_ask_name_slot: { incorrectMessage: 'Ô này chưa phải là câu hỏi tên.', correctAnswer: 'お名前は', explanation: 'Dùng お名前は để hỏi tên người đối diện.' }, chat_confirm_name_slot: { incorrectMessage: 'Tên vừa nghe chưa đúng.', correctAnswer: '伊藤', explanation: 'Người kia nói 伊藤です nên xác nhận 伊藤さんですね。' } } },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-11', order: 11, plan: 'plus', type: 'multiple_choice',
    context: 'Bạn muốn hỏi tên một cách đầy đủ và lịch sự hơn.',
    prompt: 'Chọn câu phù hợp nhất.',
    options: [option('full_polite', '失礼ですが、お名前は何ですか。'), option('short', 'お名前は？'), option('self', '私は田中です。'), option('repeat', 'もう一度お願いします。')],
    correctOptionId: 'full_polite',
    feedback: { correctAnswer: '失礼ですが、お名前は何ですか。', explanation: '失礼ですが、お名前は何ですか。 là cách hỏi tên đầy đủ và lịch sự nhất.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', '田中: すみません、お名前は？\n伊藤: 伊藤です。\n田中: 伊藤さんですね。私は田中です。'),
      option('wrong_ono', '田中: すみません、お名前は？\n伊藤: 伊藤です。\n田中: 私のお名前は田中です。'),
      option('wrong_self_san', '田中: お名前は？\n伊藤: 伊藤です。\n田中: 私は田中さんです。'),
      option('wrong_loop', '田中: すみません、もう一度お願いします。\n伊藤: 伊藤です。\n田中: お名前は何ですか。\n伊藤: 伊藤です。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: '田中: すみません、お名前は？\n伊藤: 伊藤です。\n田中: 伊藤さんですね。私は田中です。', explanation: 'A tự nhiên: hỏi tên, nghe, xác nhận rồi giới thiệu mình. B sai vì 私のお名前, C sai vì tự thêm さん cho mình, D lặp vòng không tự nhiên.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l2-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Hoàn thành câu hỏi tên lịch sự. Chọn từng ô trống, rồi chọn thẻ phù hợp. Có thẻ không cần dùng.',
    tokens: [token('shitsurei', '失礼（しつれい）', '失礼', 'しつれい'), token('desuga', 'ですが'), token('onamae', 'お名前（なまえ）', 'お名前', 'おなまえ'), token('wa', 'は'), token('nan', '何（なん）', '何', 'なん'), token('desuka', 'ですか'), token('san_distractor', 'さん'), token('mou_ichido_distractor', 'もう一度（いちど）', 'もう一度', 'もういちど')],
    answerSlots: [
      { id: 'intro', expectedTokenId: 'shitsurei' },
      { id: 'connector', expectedTokenId: 'desuga', afterText: '、' },
      { id: 'topic_word', expectedTokenId: 'onamae' },
      { id: 'topic', expectedTokenId: 'wa' },
      { id: 'question_word', expectedTokenId: 'nan' },
      { id: 'copula', expectedTokenId: 'desuka', afterText: '。' },
    ],
    unusedTokenIds: ['san_distractor', 'mou_ichido_distractor'],
    feedback: { correctAnswer: '失礼（しつれい）ですが、お名前（なまえ）は何（なん）ですか。', canonicalAnswer: '失礼ですが、お名前は何ですか。', audioText: 'しつれいですが、おなまえはなんですか。', explanation: 'Câu đầy đủ: 失礼ですが、お名前は何ですか。 さん và もう一度 không dùng ở đây.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue
    // (read, listen, repeat). See .cursor/rules/04_novalang_lesson_format_3_0.mdc
    // and ADR-012. Three-way meeting: Satō + Tanaka, then Itō joins; names are
    // asked, confirmed, and re-asked when misheard.
    id: 'ja-daily_life-m01-u1-l2-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Làm quen và hỏi tên trong nhóm',
    scenarioDescription: 'Ba người gặp nhau. Satō và Tanaka chào nhau, rồi Itō đến. Họ hỏi tên, xác nhận, và khi nghe chưa rõ thì nhờ nói lại.',
    characterIds: ['sato', 'tanaka', 'ito'],
    dialogueLines: [
      dialogueLine('sato', 'こんにちは。はじめまして。佐藤です。', 'こんにちは。はじめまして。さとうです。', 'Xin chào. Rất vui được gặp bạn. Tôi là Satō.', 'こんにちは。はじめまして。さとうです'),
      dialogueLine('tanaka', 'こんにちは。田中です。よろしくお願いします。', 'こんにちは。たなかです。よろしくおねがいします。', 'Xin chào. Tôi là Tanaka. Rất mong được làm quen.', 'こんにちは。たなかです。よろしくおねがいします'),
      dialogueLine('sato', 'よろしくお願いします。', 'よろしくおねがいします。', 'Rất mong được làm quen.', 'よろしくおねがいします'),
      dialogueLine('ito', 'こんにちは。', 'こんにちは。', 'Xin chào.', 'こんにちは'),
      dialogueLine('tanaka', 'こんにちは。すみません、お名前は？', 'こんにちは。すみません、おなまえは？', 'Xin chào. Xin lỗi, tên bạn là gì?', 'こんにちは。すみません、おなまえは'),
      dialogueLine('ito', '伊藤です。', 'いとうです。', 'Tôi là Itō.', 'いとうです'),
      dialogueLine('tanaka', 'すみません、もう一度お願いします。', 'すみません、もういちどおねがいします。', 'Xin lỗi, làm ơn nói lại một lần nữa.', 'すみません、もういちどおねがいします'),
      dialogueLine('ito', '伊藤です。い・と・う、です。', 'いとうです。い・と・う、です。', 'Tôi là Itō. I-tô-u ạ.', 'いとうです。い、と、う、です'),
      dialogueLine('tanaka', 'あ、伊藤さんですね。', 'あ、いとうさんですね。', 'À, bạn là Itō phải không.', 'あ、いとうさんですね'),
      dialogueLine('ito', 'はい。お名前は？', 'はい。おなまえは？', 'Vâng. Còn tên bạn là gì?', 'はい。おなまえは'),
      dialogueLine('tanaka', '田中です。', 'たなかです。', 'Tôi là Tanaka.', 'たなかです'),
      dialogueLine('ito', '田中さんですね。よろしくお願いします。', 'たなかさんですね。よろしくおねがいします。', 'Bạn là Tanaka phải không. Rất mong được làm quen.', 'たなかさんですね。よろしくおねがいします'),
      dialogueLine('tanaka', 'はい。よろしくお願いします。', 'はい。よろしくおねがいします。', 'Vâng. Rất mong được làm quen.', 'はい。よろしくおねがいします'),
    ],
    sceneDividers: [
      {
        afterDialogueLine: 3,
        targetText: '別の人が来たとき',
        translationByNative: vi('Khi có người khác đến'),
      },
    ],
  },
];

const JA_UNIT1_LESSON2_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Làm quen lần đầu',
    titleByNative: vi('Làm quen lần đầu'),
  },
  lesson: {
    title: 'Hỏi tên người đối diện',
    titleByNative: vi('Hỏi tên người đối diện'),
    description: 'Sau bài học này, người học có thể:',
    descriptionByNative: vi('Sau bài học này, người học có thể:'),
    content: {
      mainCards: ['intro', 'vocabulary', 'dialogue', 'grammar', 'practice'],
      targetLanguage: 'ja',
      targetLocale: 'ja-JP',
      cultureContext: 'Japan',
      approvedCharacterNamePool,
      intro: {
        objectives: [
          'Hiểu sự khác nhau cơ bản giữa 名前 và お名前.',
          'Hỏi tên người đối diện bằng お名前は？',
          'Hỏi đầy đủ hơn bằng お名前は何ですか。',
          'Dùng 失礼ですが khi muốn mở đầu câu hỏi một cách lịch sự hơn.',
          'Dùng すみません để thu hút sự chú ý hoặc mở đầu một câu hỏi.',
          'Xác nhận tên vừa nghe bằng [Tên]さんですね.',
          'Yêu cầu người đối diện nói lại bằng もう一度お願いします.',
          'Không thêm さん hoặc お vào tên của chính mình khi tự giới thiệu.',
        ],
        situation: [
          'Bạn vừa gặp một người mới và đã giới thiệu tên mình.',
          'Bây giờ bạn muốn hỏi tên của người đối diện.',
        ],
        examples: [
          { label: 'Bạn có thể hỏi:', ...line('', 'お名前は？', 'おなまえは？', 'Tên bạn là gì?', 'おなまえは') },
          { label: 'Sau khi nghe tên, bạn xác nhận:', ...line('', '伊藤さんですね。', 'いとうさんですね。', 'Bạn là Itō phải không.', 'いとうさんですね') },
          { label: 'Nếu không nghe rõ, bạn nói:', ...line('', 'すみません、もう一度お願いします。', 'すみません、もういちどおねがいします。', 'Xin lỗi, làm ơn nói lại một lần nữa.', 'すみません、もういちどおねがいします') },
        ],
        importantNote: [
          'Trong tình huống đã rõ là đang hỏi người đối diện, không cần thêm あなた.',
          '私は田中です。 và 私の名前は田中です。 đều đúng.',
          'Không nói 私のお名前は田中です。',
        ],
      },
      vocabularyDetails: [
        { id: 'namae', overview: 'Tên.', examples: [example('私の名前は田中です。', 'わたしのなまえはたなかです。', 'Tên tôi là Tanaka.')], notes: ['Không nên hiểu 名前 = tên mình và お名前 = tên người khác như một quy tắc tuyệt đối.'] },
        { id: 'onamae', overview: 'Tên — cách nói lịch sự hơn.', examples: [example('お名前は？', 'おなまえは？', 'Tên bạn là gì?')] },
        { id: 'nan-desu-ka', overview: 'Là gì?', examples: [example('これは何ですか。', 'これはなんですか。', 'Cái này là gì?')], notes: ['Trong ～は何ですか, 何 được đọc là なん.'] },
        { id: 'onamae-wa-nan-desu-ka', overview: 'Tên bạn là gì?', examples: [example('失礼ですが、お名前は何ですか。', 'しつれいですが、おなまえはなんですか。', 'Xin lỗi, tên bạn là gì?')] },
        { id: 'onamae-wa', overview: 'Còn tên bạn là...? / Tên bạn là gì?' },
        { id: 'shitsurei-desu-ga', overview: 'Xin phép cho tôi hỏi...' },
        { id: 'sumimasen', overview: 'Xin lỗi / Cho hỏi...' },
        { id: 'mou-ichido', overview: 'Một lần nữa.', examples: [example('すみません、もう一度お願いします。', 'すみません、もういちどおねがいします。', 'Xin lỗi, làm ơn nói lại một lần nữa.')] },
        { id: 'san', overview: 'Cách gọi lịch sự đặt sau tên người khác.', notes: ['Thường không thêm さん vào tên của chính mình.'] },
        { id: 'desu-ne', overview: 'Dùng để xác nhận thông tin vừa nghe.', notes: ['Dùng để xác nhận, không phải để hỏi lại.'] },
      ],
      dialogueGroups: [
        {
          id: 'ask-name-short', title: 'Hỏi tên một cách ngắn gọn', situation: 'Hai người vừa gặp, một người hỏi tên ngắn gọn.',
          lines: [
            dialogueLine('tanaka', 'こんにちは。', 'こんにちは。', 'Xin chào.', 'こんにちは'),
            dialogueLine('ito', 'こんにちは。', 'こんにちは。', 'Xin chào.', 'こんにちは'),
            dialogueLine('tanaka', 'すみません、お名前は？', 'すみません、おなまえは？', 'Xin lỗi, tên bạn là gì?', 'すみません、おなまえは'),
            dialogueLine('ito', '伊藤です。', 'いとうです。', 'Tôi là Itō.', 'いとうです'),
            dialogueLine('tanaka', '伊藤さんですね。私は田中です。', 'いとうさんですね。わたしはたなかです。', 'Bạn là Itō phải không. Tôi là Tanaka.', 'いとうさんですね。わたしはたなかです'),
          ],
          explanation: ['お名前は？ là cách hỏi tên ngắn gọn, tự nhiên khi ngữ cảnh đã rõ.', '～さんですね dùng để xác nhận tên vừa nghe.'],
        },
        {
          id: 'ask-name-polite', title: 'Hỏi tên lịch sự hơn', situation: 'Hai người gặp nhau lần đầu và nói chuyện lịch sự.',
          lines: [
            dialogueLine('sato', 'はじめまして。佐藤です。', 'はじめまして。さとうです。', 'Rất vui được gặp bạn. Tôi là Satō.', 'はじめまして。さとうです'),
            dialogueLine('tanaka', 'はじめまして。', 'はじめまして。', 'Rất vui được gặp bạn.', 'はじめまして'),
            dialogueLine('sato', '失礼ですが、お名前は何ですか。', 'しつれいですが、おなまえはなんですか。', 'Xin lỗi, tên bạn là gì?', 'しつれいですが、おなまえはなんですか'),
            dialogueLine('tanaka', '田中です。', 'たなかです。', 'Tôi là Tanaka.', 'たなかです'),
            dialogueLine('sato', '田中さんですね。よろしくお願いします。', 'たなかさんですね。よろしくおねがいします。', 'Bạn là Tanaka phải không. Rất mong được làm quen.', 'たなかさんですね。よろしくおねがいします'),
          ],
          explanation: ['失礼ですが làm cho câu hỏi lịch sự hơn.', 'お名前は何ですか。 là cách hỏi tên đầy đủ và lịch sự.'],
        },
        {
          id: 'ask-name-repeat', title: 'Khi không nghe rõ tên', situation: 'Người nghe không nghe rõ tên và nhờ nói lại.',
          lines: [
            dialogueLine('sato', 'すみません、お名前は？', 'すみません、おなまえは？', 'Xin lỗi, tên bạn là gì?', 'すみません、おなまえは'),
            dialogueLine('ito', '伊藤です。', 'いとうです。', 'Tôi là Itō.', 'いとうです'),
            dialogueLine('sato', 'すみません、もう一度お願いします。', 'すみません、もういちどおねがいします。', 'Xin lỗi, làm ơn nói lại một lần nữa.', 'すみません、もういちどおねがいします'),
            dialogueLine('ito', '伊藤です。い・と・う、です。', 'いとうです。い・と・う、です。', 'Tôi là Itō. I-tô-u ạ.', 'いとうです。い、と、う、です'),
            dialogueLine('sato', '伊藤さんですね。', 'いとうさんですね。', 'Bạn là Itō phải không.', 'いとうさんですね'),
          ],
          explanation: ['もう一度お願いします dùng để nhờ nói lại.', 'Có thể đánh vần từng âm để người nghe nghe rõ.'],
        },
      ],
      grammarPatterns: [
        {
          title: '名前 và お名前', formula: 'お名前は？ / 私は[名前]です。', formulaReading: 'おなまえは？ / わたしは[なまえ]です。', meaning: 'Cách dùng lịch sự theo ngữ cảnh, không phải quy tắc mình/người khác.',
          examples: [example('お名前は？', 'おなまえは？', 'Tên bạn là gì? (hỏi người khác)'), example('私は田中です。', 'わたしはたなかです。', 'Tôi là Tanaka. (nói tên mình)')],
          explanation: ['Hỏi người khác: お名前は？ Tự nói tên mình: 私は田中です。 Không nói 私のお名前は田中です。'],
        },
        {
          title: '～は何ですか', formula: '[名詞] + は + 何ですか', formulaReading: '[めいし] + は + なんですか', meaning: 'Hỏi “…là gì?”',
          examples: [example('お名前は何ですか。', 'おなまえはなんですか。', 'Tên bạn là gì?')],
          explanation: ['Trong cấu trúc này 何 đọc là なん. Dạng ngắn: お名前は？'],
        },
        {
          title: '～ですね', formula: '[名前] + さん + ですね', formulaReading: '[なまえ] + さん + ですね', meaning: 'Xác nhận thông tin vừa nghe.',
          examples: [example('伊藤さんですね。', 'いとうさんですね。', 'Bạn là Itō phải không.')],
          explanation: ['Dùng để xác nhận tên vừa nghe, không phải hỏi tên lại.'],
        },
      ],
      practice: {
        title: 'Bài tập',
        japaneseTitle: '練習（れんしゅう）',
        totalQuestions: 14,
        estimatedMinutes: 'Khoảng 8–10 phút',
        reviewTopics: 'Từ vựng · Hội thoại · Ngữ pháp',
        groups: [
          { id: 'free', number: '01', title: 'Luyện tập cơ bản', titleByNative: vi('Luyện tập cơ bản'), range: 'Câu 1–9', rangeByNative: vi('Câu 1–9'), details: 'Từ vựng · Nghe · Ngữ pháp\nHội thoại', detailsByNative: vi('Từ vựng · Nghe · Ngữ pháp\nHội thoại'), start: 1, end: 9, plan: 'free' },
          { id: 'plus', number: '02', title: 'Luyện tập nâng cao', titleByNative: vi('Luyện tập nâng cao'), range: 'Câu 10–14', rangeByNative: vi('Câu 10–14'), details: 'Tình huống thực tế\nHội thoại thực hành nâng cao', detailsByNative: vi('Tình huống thực tế\nHội thoại thực hành nâng cao'), start: 10, end: 14, plan: 'plus' },
        ],
        exercises: PRACTICE_EXERCISES,
      },
    },
  },
  vocabulary: [
    { id: 'namae', displayText: '名前（なまえ）', reading: 'なまえ', romanization: 'namae', speechText: 'なまえ', meaningVi: 'Tên.', translationByNative: vi('Tên.'), translations: vi('Tên.'), audioLocale: 'ja-JP' },
    { id: 'onamae', displayText: 'お名前（なまえ）', reading: 'おなまえ', romanization: 'onamae', speechText: 'おなまえ', meaningVi: 'Tên — cách nói lịch sự hơn.', translationByNative: vi('Tên — cách nói lịch sự hơn.'), translations: vi('Tên — cách nói lịch sự hơn.'), audioLocale: 'ja-JP' },
    { id: 'nan-desu-ka', displayText: '何（なん）ですか', reading: 'なんですか', romanization: 'nan desu ka', speechText: 'なんですか', meaningVi: 'Là gì?', translationByNative: vi('Là gì?'), translations: vi('Là gì?'), audioLocale: 'ja-JP' },
    { id: 'onamae-wa-nan-desu-ka', displayText: 'お名前（なまえ）は何（なん）ですか', reading: 'おなまえはなんですか', romanization: 'onamae wa nan desu ka', speechText: 'おなまえはなんですか', meaningVi: 'Tên bạn là gì?', translationByNative: vi('Tên bạn là gì?'), translations: vi('Tên bạn là gì?'), audioLocale: 'ja-JP' },
    { id: 'onamae-wa', displayText: 'お名前（なまえ）は？', reading: 'おなまえは？', romanization: 'onamae wa?', speechText: 'おなまえは', meaningVi: 'Còn tên bạn là...? / Tên bạn là gì?', translationByNative: vi('Còn tên bạn là...? / Tên bạn là gì?'), translations: vi('Còn tên bạn là...? / Tên bạn là gì?'), audioLocale: 'ja-JP' },
    { id: 'shitsurei-desu-ga', displayText: '失礼（しつれい）ですが', reading: 'しつれいですが', romanization: 'shitsurei desu ga', speechText: 'しつれいですが', meaningVi: 'Xin phép cho tôi hỏi...', translationByNative: vi('Xin phép cho tôi hỏi...'), translations: vi('Xin phép cho tôi hỏi...'), audioLocale: 'ja-JP' },
    { id: 'sumimasen', displayText: 'すみません', reading: 'すみません', romanization: 'sumimasen', speechText: 'すみません', meaningVi: 'Xin lỗi / Cho hỏi...', translationByNative: vi('Xin lỗi / Cho hỏi...'), translations: vi('Xin lỗi / Cho hỏi...'), audioLocale: 'ja-JP' },
    { id: 'mou-ichido', displayText: 'もう一度（いちど）', reading: 'もういちど', romanization: 'mō ichido', speechText: 'もういちど', meaningVi: 'Một lần nữa.', translationByNative: vi('Một lần nữa.'), translations: vi('Một lần nữa.'), audioLocale: 'ja-JP' },
    { id: 'san', displayText: '～さん', reading: '～さん', romanization: '~san', speechText: 'さん', meaningVi: 'Cách gọi lịch sự đặt sau tên người khác.', translationByNative: vi('Cách gọi lịch sự đặt sau tên người khác.'), translations: vi('Cách gọi lịch sự đặt sau tên người khác.'), audioLocale: 'ja-JP' },
    { id: 'desu-ne', displayText: '～ですね', reading: '～ですね', romanization: '~desu ne', speechText: 'ですね', meaningVi: 'Dùng để xác nhận thông tin vừa nghe.', translationByNative: vi('Dùng để xác nhận thông tin vừa nghe.'), translations: vi('Dùng để xác nhận thông tin vừa nghe.'), audioLocale: 'ja-JP' },
  ],
};

export const JA_UNIT1_LESSON2 = localizeSupport(JA_UNIT1_LESSON2_SOURCE);
