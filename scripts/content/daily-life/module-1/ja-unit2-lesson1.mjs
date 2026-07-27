import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit2-lesson1-localization.mjs';

// Daily Life / Module 1 / Unit 2 / Lesson 1 — "知り合いにあいさつする"
// (Greet someone you know). Same five_cards schema as U1 L1–L3. Q1–Q9 Free,
// Q10–Q14 Plus. Builds on U1: おはようございます・こんにちは・さようなら (L1),
// ～さん・～ですね (L2), また＋[mốc thời gian]・じゃあ、また・じゃあね (L3).
//
// NGUYÊN TẮC NGUỒN (owner nhắc 2026-07-27): mọi CỤM dạy trong bài phải có
// NGUYÊN VĂN trong local-sources; không tự ghép từ mảnh, không tự chia lại
// dạng. Vì vậy:
//   · 「また会いましょう」 ĐÃ BỎ — quét local-sources: 0 lượt (tôi tự ghép
//     また + 会いましょう). Thay bằng 「また会おう。」 [hanabira, nguyên văn].
//   · 「どうも」 làm lời chào đứng một mình ĐÃ BỎ — nguồn chỉ có
//     「どうもありがとうございます」.
//   · 「お久しぶりです」 KHÔNG đưa vào — 0 lượt trong mọi nguồn local.
//   · 「久しぶり！元気だった？」 giữ NGUYÊN CỤM [hanabira, nguyên văn]; 元気
//     KHÔNG tách thành thẻ riêng (owner chốt).
const vi = (value) => supportTextByVietnamese.get(value) ?? { vi: value };
const speakerReadings = { '田中': 'たなか', '伊藤': 'いとう', '佐藤': 'さとう', '先生': 'せんせい' };

const approvedCharacterNamePool = [
  { id: 'tanaka', displayName: '田中（たなか）', canonicalName: '田中', audioName: 'たなか' },
  { id: 'ito', displayName: '伊藤（いとう）', canonicalName: '伊藤', audioName: 'いとう' },
  { id: 'sato', displayName: '佐藤（さとう）', canonicalName: '佐藤', audioName: 'さとう' },
  { id: 'sensei', displayName: '先生（せんせい）', canonicalName: '先生', audioName: 'せんせい' },
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
  ...line(characterById[speakerId].canonicalName, text, reading, translation, speechText),
  speakerId,
  speaker: undefined,
  speakerReading: undefined,
});

const example = (text, reading, translation, speechText = reading) => ({ text, reading, translation, speechText });
const option = (id, text, canonicalText = text, audioText = canonicalText) => ({ id, text, canonicalText, audioText });
const token = (id, text, canonicalText = text, audioText = canonicalText) => ({ id, text, canonicalText, audioText });

const PRACTICE_EXERCISES = [
  {
    id: 'ja-daily_life-m01-u2-l1-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    prompt: 'Buổi sáng gặp thầy cô ở lớp. Bạn chào thế nào?',
    options: [option('ohayo_gozaimasu', 'おはようございます。'), option('ohayo', 'おはよう。'), option('hisashiburi', '久（ひさ）しぶり。', '久しぶり。', 'ひさしぶり'), option('dewa_mata', 'ではまた。')],
    correctOptionId: 'ohayo_gozaimasu',
    feedback: { correctAnswer: 'おはようございます。', explanation: 'Với thầy cô dùng おはようございます; おはよう chỉ dùng với bạn bè.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    prompt: 'Gặp lại bạn thân sau một thời gian dài. Bạn nói gì?',
    options: [option('hisashiburi', '久（ひさ）しぶり！', '久しぶり！', 'ひさしぶり'), option('hisashiburi_desu_ne', 'ひさしぶりですね。'), option('ohayo_gozaimasu', 'おはようございます。'), option('dewa_mata', 'ではまた。')],
    correctOptionId: 'hisashiburi',
    feedback: { correctAnswer: '久（ひさ）しぶり！', canonicalAnswer: '久しぶり！', audioText: 'ひさしぶり', explanation: '久しぶり là dạng trần, dùng với bạn bè và người ngang hàng đã thân.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với tình huống dùng.',
    pairs: [
      { id: 'hisashiburi', left: { id: 'hisashiburi_l', text: '久（ひさ）しぶり' }, right: { id: 'hisashiburi_r', text: 'Lâu rồi không gặp (thân mật)' } },
      { id: 'hisashiburi_ne', left: { id: 'hisashiburi_ne_l', text: 'ひさしぶりですね' }, right: { id: 'hisashiburi_ne_r', text: 'Lâu rồi không gặp (lịch sự)' } },
      { id: 'ohayo', left: { id: 'ohayo_l', text: 'おはよう' }, right: { id: 'ohayo_r', text: 'Chào buổi sáng (thân mật)' } },
      { id: 'dewa_mata', left: { id: 'dewa_mata_l', text: 'ではまた' }, right: { id: 'dewa_mata_r', text: 'Hẹn gặp lại (lịch sự)' } },
    ],
    feedback: { explanation: 'Cùng một ý nhưng khác mức lịch sự — chọn theo người nghe.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu chào lịch sự khi lâu rồi mới gặp lại.',
    tokens: [token('hisashiburi', 'ひさしぶり'), token('desu', 'です'), token('ne', 'ね'), token('ohayo', 'おはよう'), token('mata', 'また')],
    correctTokenIds: ['hisashiburi', 'desu', 'ne'],
    feedback: { correctAnswer: 'ひさしぶりですね。', canonicalAnswer: 'ひさしぶりですね。', audioText: 'ひさしぶりですね', explanation: 'ひさしぶり + です + ね → ひさしぶりですね。 おはよう và また không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['田中: 佐藤（さとう）さん、{{slot_1}}！', '佐藤: おはよう。'],
    slots: [{ id: 'slot_1', answerId: 'ohayo', placeholder: '________' }],
    wordBank: [option('ohayo', 'おはよう'), option('dewa_mata', 'ではまた'), option('hisashiburi_desu_ne', 'ひさしぶりですね')],
    feedback: { correctAnswer: '佐藤（さとう）さん、おはよう！', canonicalAnswer: '佐藤さん、おはよう！', audioText: 'さとうさん、おはよう', explanation: 'Hai bạn cùng lớp chào nhau buổi sáng bằng おはよう.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'ひさしぶりですね',
    options: [option('long_time', 'Lâu rồi không gặp nhỉ'), option('good_morning', 'Chào buổi sáng'), option('see_you', 'Hẹn gặp lại'), option('ask_name', 'Hỏi tên')],
    correctOptionId: 'long_time',
    feedback: { correctAnswer: 'Lâu rồi không gặp nhỉ', explanation: 'Câu nghe được là ひさしぶりですね — lâu rồi không gặp nhỉ.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Bạn chia tay một người bạn cùng lớp, chưa hẹn được ngày gặp lại.',
    prompt: 'Bạn chia tay một người bạn cùng lớp, chưa hẹn được ngày gặp lại. Nói gì?',
    options: [option('mata_aou', 'また会（あ）おう。', 'また会おう。', 'またあおう'), option('ohayo', 'おはよう。'), option('hisashiburi_desu_ne', 'ひさしぶりですね。'), option('onamae_wa', 'お名前（なまえ）は？', 'お名前は？', 'おなまえは')],
    correctOptionId: 'mata_aou',
    feedback: { correctAnswer: 'また会（あ）おう。', canonicalAnswer: 'また会おう。', audioText: 'またあおう', explanation: 'また会おう là cách rủ gặp lại thân mật khi chưa có mốc cụ thể.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-8', order: 8, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu chào bạn cùng lớp một cách lịch sự.',
    tokens: [token('satou', '佐藤（さとう）', '佐藤', 'さとう'), token('san', 'さん'), token('hisashiburi', 'ひさしぶり'), token('desune', 'ですね'), token('ohayo', 'おはよう'), token('mata', 'また')],
    correctTokenIds: ['satou', 'san', 'hisashiburi', 'desune'],
    feedback: { correctAnswer: '佐藤（さとう）さんひさしぶりですね。', canonicalAnswer: '佐藤さんひさしぶりですね。', audioText: 'さとうさんひさしぶりですね', explanation: '佐藤 + さん + ひさしぶり + ですね → 佐藤さんひさしぶりですね。 おはよう và また không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: '久しぶり dùng với ai?', options: [option('friends', 'Bạn bè và người ngang hàng đã thân'), option('teacher', 'Thầy cô'), option('stranger', 'Người mới gặp lần đầu'), option('anyone', 'Mọi đối tượng')], correctOptionId: 'friends', feedback: { correctAnswer: 'Bạn bè và người ngang hàng đã thân', explanation: '久しぶり là dạng trần; với thầy cô dùng ひさしぶりですね.' } },
      { id: 'q9_2', prompt: 'Chào buổi sáng với thầy cô là câu nào?', options: [option('gozaimasu', 'おはようございます。'), option('ohayo', 'おはよう。'), option('dewa_mata', 'ではまた。'), option('mata_aou', 'また会おう。')], correctOptionId: 'gozaimasu', feedback: { correctAnswer: 'おはようございます。', explanation: 'Bỏ ございます là hạ xuống mức thân mật, không dùng với thầy cô.' } },
      { id: 'q9_3', prompt: 'ええ nghĩa là gì?', options: [option('yes', 'Ừ. / Vâng.'), option('no', 'Không.'), option('goodbye', 'Tạm biệt.'), option('thanks', 'Cảm ơn.')], correctOptionId: 'yes', feedback: { correctAnswer: 'Ừ. / Vâng.', explanation: 'ええ là cách đáp "ừ/vâng" trong hội thoại đời thường.' } },
      { id: 'q9_4', prompt: 'Chia tay lịch sự, chưa hẹn ngày gặp lại?', options: [option('dewa_mata', 'ではまた。'), option('ohayo', 'おはよう。'), option('hisashiburi', '久しぶり。'), option('ee', 'ええ。')], correctOptionId: 'dewa_mata', feedback: { correctAnswer: 'ではまた。', explanation: 'ではまた là lời chia tay lịch sự khi chưa hẹn được ngày.' } },
      { id: 'q9_5', prompt: 'Câu nào KHÔNG dùng được với thầy cô?', options: [option('ohayo', 'おはよう。'), option('gozaimasu', 'おはようございます。'), option('hisashiburi_ne', 'ひさしぶりですね。'), option('dewa_mata', 'ではまた。')], correctOptionId: 'ohayo', feedback: { correctAnswer: 'おはよう。', explanation: 'おはよう là dạng thân mật, chỉ dùng với bạn bè và người trong gia đình.' } },
    ],
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '08:10',
      context: 'Hai người quen gặp lại nhau sau kỳ nghỉ rồi chia tay lịch sự. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: 'おはようございます。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ displayText: 'おはようございます。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ slotId: 'chat_hisashiburi_slot' }, { displayText: '。' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ displayText: 'ええ、ひさしぶりですね。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ slotId: 'chat_farewell_slot' }, { displayText: '。' }] },
        { id: 'message_6', speakerId: 'b', segments: [{ displayText: 'ではまた。' }] },
      ],
    },
    slots: [
      { id: 'chat_hisashiburi_slot', displayText: 'ひさしぶりですね', canonicalText: 'ひさしぶりですね', audioText: 'ひさしぶりですね', acceptedAnswers: ['ひさしぶりですね', '久しぶりですね'] },
      { id: 'chat_farewell_slot', displayText: 'ではまた', canonicalText: 'ではまた', audioText: 'ではまた', acceptedAnswers: ['ではまた', 'それではまた'] },
    ],
    feedback: { correctAnswer: 'ひさしぶりですね\nではまた', canonicalAnswer: 'ひさしぶりですね／ではまた', audioText: 'ひさしぶりですね／ではまた', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_hisashiburi_slot: { incorrectMessage: 'Ô này là câu chào khi lâu rồi mới gặp lại.', correctAnswer: 'ひさしぶりですね', explanation: 'Thêm ですね là nâng 久しぶり lên mức lịch sự.' }, chat_farewell_slot: { incorrectMessage: 'Ô này là lời chia tay lịch sự.', correctAnswer: 'ではまた', explanation: 'ではまた dùng khi chia tay mà chưa hẹn được ngày gặp lại.' } } },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu rủ bạn gặp lại. Có thẻ không cần dùng.',
    tokens: [token('satousan', '佐藤（さとう）さん', '佐藤さん', 'さとうさん'), token('mata', 'また'), token('aou', '会（あ）おう', '会おう', 'あおう'), token('desune_distractor', 'ですね'), token('gozaimasu_distractor', 'ございます')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'satousan', afterText: '、' },
      { id: 's2', expectedTokenId: 'mata' },
      { id: 's3', expectedTokenId: 'aou', afterText: '。' },
    ],
    unusedTokenIds: ['desune_distractor', 'gozaimasu_distractor'],
    feedback: { correctAnswer: '佐藤（さとう）さん、また会（あ）おう。', canonicalAnswer: '佐藤さん、また会おう。', audioText: 'さとうさん、またあおう', explanation: '佐藤さん + また + 会おう → 佐藤さん、また会おう。 ですね và ございます là mức lịch sự, không đi với dạng thân mật này.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', '田中: 佐藤さん、おはよう！\n佐藤: おはよう。'),
      option('teacher_casual', '先生: おはようございます。\n佐藤: おはよう。'),
      option('mixed_level', '田中: 久しぶり！\n佐藤: ひさしぶりですね。ではまた。'),
      option('teacher_san', '佐藤: 先生さん、ひさしぶりですね。\n先生: ひさしぶりですね。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: '田中: 佐藤さん、おはよう！\n佐藤: おはよう。', explanation: 'A tự nhiên: hai bạn cùng lớp cùng dùng mức thân mật. B sai vì đáp thầy cô bằng おはよう. C sai vì vừa chào đã chia tay ngay. D sai vì gắn さん sau 先生.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành lời chào thầy cô đầu buổi học sau kỳ nghỉ. Có thẻ không cần dùng.',
    tokens: [token('sensei', '先生（せんせい）', '先生', 'せんせい'), token('ohayo', 'おはよう'), token('gozaimasu', 'ございます'), token('hisashiburi', 'ひさしぶり'), token('desu', 'です'), token('ne', 'ね'), token('san_distractor', 'さん'), token('mata_distractor', 'また')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'sensei', afterText: '、' },
      { id: 's2', expectedTokenId: 'ohayo' },
      { id: 's3', expectedTokenId: 'gozaimasu', afterText: '。' },
      { id: 's4', expectedTokenId: 'hisashiburi' },
      { id: 's5', expectedTokenId: 'desu' },
      { id: 's6', expectedTokenId: 'ne', afterText: '。' },
    ],
    unusedTokenIds: ['san_distractor', 'mata_distractor'],
    feedback: { correctAnswer: '先生（せんせい）、おはようございます。ひさしぶりですね。', canonicalAnswer: '先生、おはようございます。ひさしぶりですね。', audioText: 'せんせい、おはようございます。ひさしぶりですね', explanation: '先生 + おはよう + ございます + ひさしぶり + です + ね → 先生、おはようございます。ひさしぶりですね。 Không gắn さん sau 先生, và また không dùng ở đây.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // See .cursor/rules/04_novalang_lesson_format_3_0.mdc and ADR-012. Cùng một
    // người gặp lại THẦY (lịch sự) rồi gặp lại BẠN (thân mật) — hai mức cạnh
    // nhau để thấy rõ lựa chọn theo người nghe.
    id: 'ja-daily_life-m01-u2-l1-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Ngày đầu đi học lại sau kỳ nghỉ',
    scenarioDescription: 'Sau kỳ nghỉ dài, Satō gặp lại thầy ở hành lang rồi gặp lại hai bạn cùng lớp ở sân trường. Cùng một ý chào, hai mức lịch sự khác nhau.',
    characterIds: ['sato', 'sensei', 'tanaka', 'ito'],
    dialogueLines: [
      dialogueLine('sato', '先生、おはようございます。', 'せんせい、おはようございます。', 'Thưa thầy, em chào thầy ạ.', 'せんせい、おはようございます'),
      dialogueLine('sensei', 'おはようございます、佐藤さん。', 'おはようございます、さとうさん。', 'Chào em, Satō.', 'おはようございます、さとうさん'),
      dialogueLine('sato', 'ひさしぶりですね。', 'ひさしぶりですね。', 'Lâu rồi không gặp nhỉ.', 'ひさしぶりですね'),
      dialogueLine('sensei', 'ひさしぶりですね。', 'ひさしぶりですね。', 'Lâu rồi không gặp nhỉ.', 'ひさしぶりですね'),
      dialogueLine('sato', 'よろしくお願いします。', 'よろしくおねがいします。', 'Mong thầy giúp đỡ ạ.', 'よろしくおねがいします'),
      dialogueLine('sensei', 'こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Thầy cũng vậy, mong em cố gắng.', 'こちらこそ、よろしくおねがいします'),
      dialogueLine('sato', 'ではまた。', 'ではまた。', 'Vậy hẹn gặp lại thầy ạ.', 'ではまた'),
      dialogueLine('tanaka', '佐藤さん、おはよう！', 'さとうさん、おはよう！', 'Satō ơi, chào buổi sáng!', 'さとうさん、おはよう'),
      dialogueLine('sato', 'おはよう。', 'おはよう。', 'Chào buổi sáng.', 'おはよう'),
      dialogueLine('tanaka', '久しぶり！元気だった？', 'ひさしぶり！げんきだった？', 'Lâu rồi không gặp! Dạo này khoẻ không?', 'ひさしぶり。げんきだった'),
      dialogueLine('sato', 'ええ、久しぶり。', 'ええ、ひさしぶり。', 'Ừ, lâu rồi không gặp.', 'ええ、ひさしぶり'),
      dialogueLine('ito', '佐藤さん、久しぶり！', 'さとうさん、ひさしぶり！', 'Satō ơi, lâu rồi không gặp!', 'さとうさん、ひさしぶり'),
      dialogueLine('tanaka', 'じゃあね。', 'じゃあね。', 'Thôi nhé.', 'じゃあね'),
      dialogueLine('sato', 'また会おう。', 'またあおう。', 'Hẹn gặp lại nhé.', 'またあおう'),
    ],
    sceneDividers: [
      {
        afterDialogueLine: 7,
        targetText: 'そのあと',
        translationByNative: vi('Sau đó'),
      },
    ],
  },
];

const JA_UNIT2_LESSON1_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Gặp lại người đã quen',
    titleByNative: vi('Gặp lại người đã quen'),
  },
  lesson: {
    title: 'Chào người đã quen',
    titleByNative: vi('Chào người đã quen'),
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
          'Chào lại người đã lâu không gặp bằng 久しぶり.',
          'Nâng lên mức lịch sự bằng ひさしぶりですね.',
          'Chào buổi sáng thân mật bằng おはよう.',
          'Đáp lại thân mật bằng ええ.',
          'Rủ gặp lại thân mật bằng また会おう.',
          'Chia tay lịch sự bằng ではまた.',
          'Chọn mức lịch sự theo người nghe, không theo thói quen.',
        ],
        situation: [
          'Bạn gặp lại một người đã quen sau một thời gian dài.',
          'Bạn chào hỏi rồi hẹn gặp lại, chọn cách nói hợp với người đối diện.',
        ],
        examples: [
          { label: 'Với bạn bè, bạn chào:', ...line('', '久しぶり！元気だった？', 'ひさしぶり！げんきだった？', 'Lâu rồi không gặp! Dạo này khoẻ không?', 'ひさしぶり。げんきだった') },
          { label: 'Với thầy cô, bạn chào:', ...line('', 'ひさしぶりですね。', 'ひさしぶりですね。', 'Lâu rồi không gặp nhỉ.', 'ひさしぶりですね') },
          { label: 'Khi chia tay, bạn nói:', ...line('', 'ではまた。', 'ではまた。', 'Thôi, hẹn gặp lại.', 'ではまた') },
        ],
        importantNote: [
          '久しぶり là dạng trần, chỉ dùng với bạn bè và người ngang hàng đã thân.',
          'Thêm ですね thành ひさしぶりですね là nâng lên mức lịch sự, dùng được với thầy cô.',
          'Không dùng おはよう với thầy cô — với thầy cô dùng おはようございます.',
        ],
      },
      vocabularyDetails: [
        { id: 'hisashiburi', timingAndContext: ['Gặp lại người đã lâu không gặp.', 'Mở đầu cuộc trò chuyện sau một thời gian dài.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng trần này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: [], casual: [], overview: 'Lâu rồi không gặp.', examples: [example('久しぶり！元気だった？', 'ひさしぶり！げんきだった？', 'Lâu rồi không gặp! Dạo này khoẻ không?', 'ひさしぶり。げんきだった')], notes: ['Dạng lịch sự tương ứng là ひさしぶりですね.'] },
        { id: 'hisashiburi-desu-ne', timingAndContext: ['Gặp lại người đã lâu không gặp, trong tình huống cần lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Đồng nghiệp'], avoid: ['Không dùng với người vừa gặp hôm qua.'], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', '久しぶり', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Lâu rồi không gặp nhỉ.', examples: [example('ひさしぶりですね。', 'ひさしぶりですね。', 'Lâu rồi không gặp nhỉ.')] },
        { id: 'ohayo', timingAndContext: ['Chào buổi sáng người đã thân.'], appropriateFor: ['Bạn bè', 'Người trong gia đình', 'Người ngang tuổi đã thân'], avoid: ['Không dùng với thầy cô hoặc người trên.', 'Không dùng vào buổi chiều hoặc buổi tối.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'おはようございます', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Chào buổi sáng (thân mật).', examples: [example('佐藤さん、おはよう！', 'さとうさん、おはよう！', 'Satō ơi, chào buổi sáng!', 'さとうさん、おはよう')] },
        { id: 'ee', timingAndContext: ['Đáp "ừ / vâng" trong hội thoại đời thường.'], appropriateFor: ['Bạn bè', 'Người ngang hàng'], avoid: ['Không dùng thay cho một câu trả lời đầy đủ khi người hỏi cần thông tin.'], register: 'Thân mật.', formal: [], casual: [], overview: 'Ừ. / Vâng.', examples: [example('ええ、久しぶり。', 'ええ、ひさしぶり。', 'Ừ, lâu rồi không gặp.')] },
        { id: 'mata-aou', timingAndContext: ['Rủ gặp lại khi chưa hẹn được ngày cụ thể.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng với thầy cô hoặc người trên.', 'Không dùng khi đã biết rõ ngày gặp lại.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'ではまた', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Hẹn gặp lại nhé (thân mật).', examples: [example('また会おう。', 'またあおう。', 'Hẹn gặp lại nhé.')] },
        { id: 'dewa-mata', timingAndContext: ['Chia tay khi chưa hẹn được ngày gặp lại.'], appropriateFor: ['Thầy cô', 'Người trên', 'Đồng nghiệp', 'Bạn bè'], avoid: ['Không dùng khi đã biết rõ ngày gặp lại.'], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', 'また会おう', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Thôi, hẹn gặp lại.', examples: [example('ではまた。', 'ではまた。', 'Thôi, hẹn gặp lại.')] },
      ],
      // "Tham khảo thêm" (§B2b) — biến thể của lời chia tay. FREE, không tính
      // ngân sách từ mới, không dùng ở Q1–Q13. Cả hai đều có NGUYÊN VĂN trong
      // nguồn local (hanabira).
      vocabularyReferences: [
        { term: 'それではまた', reading: 'それではまた', speechText: 'それではまた', meaning: 'Vậy thì hẹn gặp lại (trang trọng hơn ではまた).', register: 'Lịch sự.', example: example('それではまた。', 'それではまた。', 'Vậy thì hẹn gặp lại.') },
        { term: 'うん', reading: 'うん', speechText: 'うん', meaning: 'Ừ (thân mật hơn ええ).', register: 'Thân mật.', example: example('うん、久しぶり。', 'うん、ひさしぶり。', 'Ừ, lâu rồi không gặp.') },
      ],
      dialogueGroups: [
        {
          id: 'greet-teacher', title: 'Gặp lại thầy ở hành lang', situation: 'Sau kỳ nghỉ dài, hai người gặp nhau chốc lát ở hành lang rồi ai vào lớp nấy.',
          lines: [
            dialogueLine('sato', '先生、おはようございます。', 'せんせい、おはようございます。', 'Thưa thầy, em chào thầy ạ.', 'せんせい、おはようございます'),
            dialogueLine('sensei', 'おはようございます。', 'おはようございます。', 'Chào em.', 'おはようございます'),
            dialogueLine('sato', 'ひさしぶりですね。', 'ひさしぶりですね。', 'Lâu rồi không gặp nhỉ.', 'ひさしぶりですね'),
            dialogueLine('sensei', 'ひさしぶりですね。ではまた。', 'ひさしぶりですね。ではまた。', 'Lâu rồi không gặp nhỉ. Hẹn gặp lại.', 'ひさしぶりですね。ではまた'),
            dialogueLine('sato', 'ではまた。', 'ではまた。', 'Vậy hẹn gặp lại thầy ạ.', 'ではまた'),
          ],
          explanation: ['Với thầy cô dùng おはようございます, không dùng おはよう.', 'Gọi thầy là 先生, không gắn さん.', 'ひさしぶりですね dùng được cả hai chiều vì đã ở mức lịch sự.'],
        },
        {
          id: 'greet-classmate', title: 'Hai bạn cùng lớp gặp lại', situation: 'Hai bạn cùng lớp gặp nhau ở sân trường sau kỳ nghỉ.',
          lines: [
            dialogueLine('tanaka', '佐藤さん、おはよう！', 'さとうさん、おはよう！', 'Satō ơi, chào buổi sáng!', 'さとうさん、おはよう'),
            dialogueLine('sato', 'おはよう。', 'おはよう。', 'Chào buổi sáng.', 'おはよう'),
            dialogueLine('tanaka', '久しぶり！元気だった？', 'ひさしぶり！げんきだった？', 'Lâu rồi không gặp! Dạo này khoẻ không?', 'ひさしぶり。げんきだった'),
            dialogueLine('sato', 'ええ、久しぶり。', 'ええ、ひさしぶり。', 'Ừ, lâu rồi không gặp.', 'ええ、ひさしぶり'),
          ],
          explanation: ['Giữa bạn cùng lớp dùng dạng thân mật おはよう và 久しぶり.', 'ええ là cách đáp thân mật, đi cùng dạng trần.'],
        },
        {
          id: 'casual-see-you', title: 'Chào nhanh rồi hẹn gặp lại', situation: 'Hai bạn gặp nhau chốc lát ở hành lang, cả hai đang vội.',
          lines: [
            dialogueLine('ito', '佐藤さん、久しぶり！', 'さとうさん、ひさしぶり！', 'Satō ơi, lâu rồi không gặp!', 'さとうさん、ひさしぶり'),
            dialogueLine('sato', 'ええ、久しぶり。', 'ええ、ひさしぶり。', 'Ừ, lâu rồi không gặp.', 'ええ、ひさしぶり'),
            dialogueLine('ito', 'じゃあね。', 'じゃあね。', 'Thôi nhé.', 'じゃあね'),
            dialogueLine('sato', 'また会おう。', 'またあおう。', 'Hẹn gặp lại nhé.', 'またあおう'),
          ],
          explanation: ['また会おう dùng khi chưa hẹn được ngày — khác また明日 và また来週 đã học.', 'Giữa bạn bè, cả lời chào lẫn lời chia tay đều ở mức thân mật.'],
        },
      ],
      grammarPatterns: [
        {
          title: '久しぶり ↔ ひさしぶりですね', formula: '久（ひさ）しぶり ＋ ですね', formulaReading: 'ひさしぶり ＋ ですね', meaning: 'Cùng một ý "lâu rồi không gặp", đổi mức theo người nghe.',
          examples: [example('久しぶり！', 'ひさしぶり！', 'Lâu rồi không gặp!', 'ひさしぶり'), example('ひさしぶりですね。', 'ひさしぶりですね。', 'Lâu rồi không gặp nhỉ.')],
          explanation: ['Dạng trần dùng với người ngang hàng đã thân; thêm ですね là nâng lên mức lịch sự, dùng được với thầy cô.', 'Đây là cùng mẫu ～ですね đã học ở bài Hỏi tên người đối diện.'],
        },
        {
          title: 'おはようございます ↔ おはよう', formula: 'おはよう ＋ ございます', formulaReading: 'おはよう ＋ ございます', meaning: 'Bỏ ございます là hạ từ mức lịch sự xuống mức thân mật.',
          examples: [example('先生、おはようございます。', 'せんせい、おはようございます。', 'Thưa thầy, em chào thầy ạ.', 'せんせい、おはようございます'), example('佐藤さん、おはよう！', 'さとうさん、おはよう！', 'Satō ơi, chào buổi sáng!', 'さとうさん、おはよう')],
          explanation: ['Cùng một lời chào, hai mức. Chọn theo người nghe, không theo thói quen.'],
        },
        {
          title: 'ではまた ↔ また会おう', formula: 'ではまた ／ また会（あ）おう', formulaReading: 'ではまた ／ またあおう', meaning: 'Hai cách chia tay khi chưa hẹn được ngày gặp lại.',
          examples: [example('ではまた。', 'ではまた。', 'Thôi, hẹn gặp lại.'), example('また会おう。', 'またあおう。', 'Hẹn gặp lại nhé.')],
          explanation: ['ではまた dùng được với thầy cô và người trên; また会おう chỉ dùng với bạn bè.', 'Khi đã biết rõ ngày gặp lại thì dùng また明日 hoặc また来週 đã học ở bài trước.'],
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
    { id: 'hisashiburi', displayText: '久（ひさ）しぶり', reading: 'ひさしぶり', romanization: 'hisashiburi', speechText: 'ひさしぶり', meaningVi: 'Lâu rồi không gặp.', translationByNative: vi('Lâu rồi không gặp.'), translations: vi('Lâu rồi không gặp.'), audioLocale: 'ja-JP' },
    { id: 'hisashiburi-desu-ne', displayText: 'ひさしぶりですね', reading: 'ひさしぶりですね', romanization: 'hisashiburi desu ne', speechText: 'ひさしぶりですね', meaningVi: 'Lâu rồi không gặp nhỉ.', translationByNative: vi('Lâu rồi không gặp nhỉ.'), translations: vi('Lâu rồi không gặp nhỉ.'), audioLocale: 'ja-JP' },
    { id: 'ohayo', displayText: 'おはよう', reading: 'おはよう', romanization: 'ohayō', speechText: 'おはよう', meaningVi: 'Chào buổi sáng (thân mật).', translationByNative: vi('Chào buổi sáng (thân mật).'), translations: vi('Chào buổi sáng (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'ee', displayText: 'ええ', reading: 'ええ', romanization: 'ē', speechText: 'ええ', meaningVi: 'Ừ. / Vâng.', translationByNative: vi('Ừ. / Vâng.'), translations: vi('Ừ. / Vâng.'), audioLocale: 'ja-JP' },
    { id: 'mata-aou', displayText: 'また会（あ）おう', reading: 'またあおう', romanization: 'mata aō', speechText: 'またあおう', meaningVi: 'Hẹn gặp lại nhé (thân mật).', translationByNative: vi('Hẹn gặp lại nhé (thân mật).'), translations: vi('Hẹn gặp lại nhé (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'dewa-mata', displayText: 'ではまた', reading: 'ではまた', romanization: 'dewa mata', speechText: 'ではまた', meaningVi: 'Thôi, hẹn gặp lại.', translationByNative: vi('Thôi, hẹn gặp lại.'), translations: vi('Thôi, hẹn gặp lại.'), audioLocale: 'ja-JP' },
  ],
};

export const JA_UNIT2_LESSON1 = localizeSupport(JA_UNIT2_LESSON1_SOURCE);
