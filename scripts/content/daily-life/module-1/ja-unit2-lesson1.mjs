import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit2-lesson1-localization.mjs';

// Daily Life / Module 1 / Unit 2 / Lesson 1 — "知り合いにあいさつする"
// (Greet someone you know). Same five_cards schema as U1 L1–L3.
// Q1–Q9 Free, Q10–Q14 Plus.
//
// NGUỒN HỘI THOẠI (§G10 — LẤY NGUYÊN ĐOẠN, KHÔNG TỰ XẾP):
//   local-sources/ja/irodori/markdown/IRODORI_So_cap_1_A2.md
//   初級1 第1課 · can-do 01「お久しぶりです」
//   · Trang PDF 42 — tình huống: 「久しぶりに会った 2 人が、あいさつをしています。」
//   · Trang PDF 43 — 3 kịch bản, mã băng 01-01 / 01-02 / 01-03
//   · Trang PDF 38 — 文法ノート➊ 丁寧体・普通体: cặp đối chiếu của CHÍNH giáo trình
//   · Trang PDF 44 — hoạt động nói, liệt kê đối tượng: 友だち・先輩や先生・知り合い
//
// CẢ 3 ĐOẠN LẤY NGUYÊN VĂN — không cắt, không nối, không đổi một chữ.
// Card 3 dùng cả ba; Q14 cũng dùng cả ba (2 dải phân cảnh).
// Đây là bài ĐẦU TIÊN của dự án có card 3 hoàn toàn nguyên văn từ nguồn V1,
// thay cho bản tự xếp trước đó (3 vòng sửa mạch đều là lỗi XẾP, §G10).
//
// KHÔNG GÁN QUAN HỆ CỤ THỂ cho từng đoạn: giáo trình để người học TỰ GHÉP
// ①②③ với a.友だち / b.先輩と後輩 / c.知り合い và KHÔNG in đáp án. Gán bừa là
// tự suy diễn (§G4). Vì vậy tiêu đề/tình huống mỗi nhóm chỉ mô tả cái QUAN SÁT
// ĐƯỢC trong chính lời thoại: bên nào dùng thể lịch sự, bên nào dùng thể thường.
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
    context: 'Bạn gặp lại một người quen sau lâu ngày, trong tình huống cần lịch sự.',
    prompt: 'Bạn gặp lại một người quen sau lâu ngày, trong tình huống cần lịch sự. Nói gì?',
    options: [option('o_hisashiburi', 'お久（ひさ）しぶりです。', 'お久しぶりです。', 'おひさしぶりです'), option('hisashiburi', '久（ひさ）しぶり。', '久しぶり。', 'ひさしぶり'), option('ohayo', 'おはようございます。'), option('sayounara', 'さようなら。')],
    correctOptionId: 'o_hisashiburi',
    feedback: { correctAnswer: 'お久（ひさ）しぶりです。', canonicalAnswer: 'お久しぶりです。', audioText: 'おひさしぶりです', explanation: 'お久しぶりです là thể lịch sự; 久しぶり là thể thường, chỉ dùng với bạn bè.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    context: 'Bạn gặp lại một người bạn thân sau lâu ngày.',
    prompt: 'Bạn gặp lại một người bạn thân sau lâu ngày. Nói gì?',
    options: [option('hisashiburi', '久（ひさ）しぶり。', '久しぶり。', 'ひさしぶり'), option('o_hisashiburi', 'お久（ひさ）しぶりです。', 'お久しぶりです。', 'おひさしぶりです'), option('o_genki_desu_ka', 'お元気（げんき）ですか？', 'お元気ですか？', 'おげんきですか'), option('okagesama', 'おかげさまで。')],
    correctOptionId: 'hisashiburi',
    feedback: { correctAnswer: '久（ひさ）しぶり。', canonicalAnswer: '久しぶり。', audioText: 'ひさしぶり', explanation: 'Với bạn bè dùng thể thường 久しぶり, bỏ お và bỏ です.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với thể của nó.',
    pairs: [
      { id: 'o_hisashiburi', left: { id: 'o_hisashiburi_l', text: 'お久（ひさ）しぶりです' }, right: { id: 'o_hisashiburi_r', text: 'Lâu rồi không gặp (lịch sự)' } },
      { id: 'hisashiburi', left: { id: 'hisashiburi_l', text: '久（ひさ）しぶり' }, right: { id: 'hisashiburi_r', text: 'Lâu rồi không gặp (thân mật)' } },
      { id: 'o_genki', left: { id: 'o_genki_l', text: 'お元気（げんき）ですか' }, right: { id: 'o_genki_r', text: 'Anh/chị vẫn khoẻ chứ (lịch sự)' } },
      { id: 'genki', left: { id: 'genki_l', text: '元気（げんき）？' }, right: { id: 'genki_r', text: 'Khoẻ không (thân mật)' } },
    ],
    feedback: { explanation: 'Cùng một ý, hai thể — chọn theo người nghe.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu hỏi thăm sức khoẻ lịch sự.',
    tokens: [token('o_genki', 'お元気（げんき）', 'お元気', 'おげんき'), token('desu', 'です'), token('ka', 'か'), token('hisashiburi', '久（ひさ）しぶり', '久しぶり', 'ひさしぶり'), token('un', 'うん')],
    correctTokenIds: ['o_genki', 'desu', 'ka'],
    feedback: { correctAnswer: 'お元気（げんき）ですか？', canonicalAnswer: 'お元気ですか？', audioText: 'おげんきですか', explanation: 'お元気 + です + か → お元気ですか？ 久しぶり và うん không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    context: 'Hai người bạn thân tình cờ gặp lại nhau sau lâu ngày. Tanaka chào trước bằng thể thân mật; đến lượt Sato đáp lại.',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['田中: あ、久（ひさ）しぶり。', '佐藤: {{slot_1}}。'],
    slots: [{ id: 'slot_1', answerId: 'hisashiburi', placeholder: '________' }],
    wordBank: [option('hisashiburi', '久（ひさ）しぶり', '久しぶり', 'ひさしぶり'), option('okagesama', 'おかげさまで'), option('o_genki_desu_ka', 'お元気（げんき）ですか', 'お元気ですか', 'おげんきですか')],
    feedback: { correctAnswer: '久（ひさ）しぶり。', canonicalAnswer: '久しぶり。', audioText: 'ひさしぶり', explanation: 'Bạn bè chào nhau bằng thể thường, hai bên cùng nói 久しぶり.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'おひさしぶりです',
    options: [option('long_time_polite', 'Lâu rồi không gặp (lịch sự)'), option('long_time_casual', 'Lâu rồi không gặp (thân mật)'), option('how_are_you', 'Anh/chị vẫn khoẻ chứ'), option('good_morning', 'Chào buổi sáng')],
    correctOptionId: 'long_time_polite',
    feedback: { correctAnswer: 'Lâu rồi không gặp (lịch sự)', explanation: 'Câu nghe được là お久しぶりです — có お và có です nên là thể lịch sự.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Một người quen hỏi bạn 「お元気ですか？」.',
    prompt: 'Một người quen hỏi bạn 「お元気ですか？」. Đáp lịch sự thế nào?',
    options: [option('hai_okagesama', 'はい。おかげさまで。'), option('un_genki', 'うん。元気（げんき）。', 'うん。元気。', 'うん。げんき'), option('hisashiburi', '久（ひさ）しぶり。', '久しぶり。', 'ひさしぶり'), option('sumimasen', 'すみません。')],
    correctOptionId: 'hai_okagesama',
    feedback: { correctAnswer: 'はい。おかげさまで。', explanation: 'はい。おかげさまで。 là câu đáp lịch sự; うん。元気。 là thể thường, dùng với bạn bè.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    prompt: '「元気（げんき）？」 dùng với ai?',
    options: [option('friends', 'Bạn bè và người ngang hàng đã thân'), option('teacher', 'Thầy cô và người trên'), option('stranger', 'Người mới gặp lần đầu'), option('customer', 'Khách hàng')],
    correctOptionId: 'friends',
    feedback: { correctAnswer: 'Bạn bè và người ngang hàng đã thân', explanation: '元気？ là thể thường; với thầy cô và người trên dùng お元気ですか？.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'お久（ひさ）しぶりです thuộc thể nào?', options: [option('polite', 'Thể lịch sự'), option('casual', 'Thể thường'), option('both', 'Cả hai như nhau'), option('none', 'Không thuộc thể nào')], correctOptionId: 'polite', feedback: { correctAnswer: 'Thể lịch sự', explanation: 'Có お ở đầu và です ở cuối — dấu hiệu của thể lịch sự.' } },
      { id: 'q9_2', prompt: 'Bỏ お và です khỏi お久（ひさ）しぶりです thì còn gì?', options: [option('hisashiburi', '久しぶり'), option('genki', '元気'), option('okagesama', 'おかげさまで'), option('hai', 'はい')], correctOptionId: 'hisashiburi', feedback: { correctAnswer: '久しぶり', explanation: 'お久しぶりです → 久しぶり là cặp lịch sự ↔ thân mật.' } },
      { id: 'q9_3', prompt: 'Đáp thân mật cho câu 「元気（げんき）？」 là gì?', options: [option('un_genki', 'うん。元気。'), option('hai_okagesama', 'はい。おかげさまで。'), option('sumimasen', 'すみません。'), option('sayounara', 'さようなら。')], correctOptionId: 'un_genki', feedback: { correctAnswer: 'うん。元気。', explanation: 'うん là はい ở thể thường; đi cùng 元気 không có です.' } },
      { id: 'q9_4', prompt: 'おかげさまで đi cùng từ nào ở đầu câu?', options: [option('hai', 'はい'), option('un', 'うん'), option('a', 'あ'), option('mou_ichido', 'もう一度')], correctOptionId: 'hai', feedback: { correctAnswer: 'はい', explanation: 'Trong nguồn, câu đáp lịch sự là はい。おかげさまで。' } },
      { id: 'q9_5', prompt: 'Với thầy cô thì câu nào KHÔNG dùng được?', options: [option('genki', '元気（げんき）？'), option('o_genki', 'お元気（げんき）ですか？'), option('o_hisashiburi', 'お久（ひさ）しぶりです。'), option('hai_okagesama', 'はい。おかげさまで。')], correctOptionId: 'genki', feedback: { correctAnswer: '元気（げんき）？', explanation: '元気？ là thể thường, không dùng với thầy cô.' } },
    ],
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '10:20',
      context: 'Hai người quen lâu ngày không gặp nhắn tin cho nhau: chào hỏi rồi hỏi thăm sức khoẻ nhau, cả hai đều dùng thể lịch sự. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: 'あ、お久（ひさ）しぶりです。', canonicalText: 'あ、お久しぶりです。', audioText: 'あ、おひさしぶりです' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ slotId: 'chat_hisashiburi_slot' }, { displayText: '。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'お元気（げんき）ですか？', canonicalText: 'お元気ですか？', audioText: 'おげんきですか' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ displayText: 'はい。' }, { slotId: 'chat_okagesama_slot' }, { displayText: '。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ displayText: 'そうですか。' }] },
        { id: 'message_6', speakerId: 'b', segments: [{ displayText: 'お元気（げんき）ですか？', canonicalText: 'お元気ですか？', audioText: 'おげんきですか' }] },
      ],
    },
    slots: [
      { id: 'chat_hisashiburi_slot', displayText: 'お久（ひさ）しぶりです', canonicalText: 'お久しぶりです', audioText: 'おひさしぶりです', acceptedAnswers: ['お久しぶりです', 'おひさしぶりです'] },
      { id: 'chat_okagesama_slot', displayText: 'おかげさまで', canonicalText: 'おかげさまで', audioText: 'おかげさまで', acceptedAnswers: ['おかげさまで'] },
    ],
    feedback: { correctAnswer: 'お久（ひさ）しぶりです\nおかげさまで', canonicalAnswer: 'お久しぶりです／おかげさまで', audioText: 'おひさしぶりです／おかげさまで', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_hisashiburi_slot: { incorrectMessage: 'Ô này đáp lại lời chào lâu ngày không gặp, ở thể lịch sự.', correctAnswer: 'お久しぶりです', explanation: 'Được chào お久しぶりです thì đáp lại đúng câu đó.' }, chat_okagesama_slot: { incorrectMessage: 'Ô này là phần sau của câu đáp lịch sự はい。___。', correctAnswer: 'おかげさまで', explanation: 'はい。おかげさまで。 là câu đáp lịch sự cho お元気ですか？.' } } },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu đáp thân mật. Có thẻ không cần dùng.',
    tokens: [token('un', 'うん'), token('genki', '元気（げんき）', '元気', 'げんき'), token('hai_distractor', 'はい'), token('okagesama_distractor', 'おかげさまで')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'un', afterText: '。' },
      { id: 's2', expectedTokenId: 'genki', afterText: '。' },
    ],
    unusedTokenIds: ['hai_distractor', 'okagesama_distractor'],
    feedback: { correctAnswer: 'うん。元気（げんき）。', canonicalAnswer: 'うん。元気。', audioText: 'うん。げんき', explanation: 'うん + 元気 → うん。元気。 はい và おかげさまで là thể lịch sự, không đi với thể thường.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', 'A: あ、久しぶり。\nB: 久しぶり。'),
      option('mixed_down', 'A: お久しぶりです。\nB: うん。元気。'),
      option('mixed_up', 'A: 元気？\nB: はい。おかげさまで。ありがとうございました。'),
      option('wrong_answer', 'A: お元気ですか？\nB: 久しぶり。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: 'A: あ、久しぶり。\nB: 久しぶり。', explanation: 'A tự nhiên: hai bên cùng thể thường. B lệch vì đáp câu lịch sự bằng thể thường. C thừa và lệch thể. D sai vì được hỏi sức khoẻ mà lại đáp bằng lời chào.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l1-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành lời chào và hỏi thăm lịch sự. Có thẻ không cần dùng.',
    tokens: [token('a', 'あ'), token('o_hisashiburi', 'お久（ひさ）しぶり', 'お久しぶり', 'おひさしぶり'), token('desu', 'です'), token('o_genki', 'お元気（げんき）', 'お元気', 'おげんき'), token('desu2', 'です'), token('ka', 'か'), token('un_distractor', 'うん'), token('genki_distractor', '元気（げんき）', '元気', 'げんき')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'a', afterText: '、' },
      { id: 's2', expectedTokenId: 'o_hisashiburi' },
      { id: 's3', expectedTokenId: 'desu', afterText: '。' },
      { id: 's4', expectedTokenId: 'o_genki' },
      { id: 's5', expectedTokenId: 'desu2' },
      { id: 's6', expectedTokenId: 'ka', afterText: '？' },
    ],
    unusedTokenIds: ['un_distractor', 'genki_distractor'],
    feedback: { correctAnswer: 'あ、お久（ひさ）しぶりです。お元気（げんき）ですか？', canonicalAnswer: 'あ、お久しぶりです。お元気ですか？', audioText: 'あ、おひさしぶりです。おげんきですか', explanation: 'あ + お久しぶり + です + お元気 + です + か → あ、お久しぶりです。お元気ですか？ うん và 元気 là thể thường, không đi với thể lịch sự.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // ĐỦ BA đoạn NGUYÊN VĂN Irodori 初級1 L1 (Trang PDF 43), mã băng
    // 01-01 (lịch sự ↔ lịch sự) · 01-02 (thường ↔ thường) · 01-03 (lệch thể).
    // Không thêm chữ nào ngoài nguồn.
    //
    // Bản trước chỉ đưa được 2/3 vì validator ép Q14 có ĐÚNG MỘT dải phân
    // cảnh — đúng loại "số chép từ Golden" mà §D6c nay đã bỏ (sceneDividers
    // thành khoảng 0–5). Nội dung không còn phải bẻ cho vừa con số nữa.
    id: 'ja-daily_life-m01-u2-l1-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Ba lần gặp lại sau lâu ngày',
    scenarioDescription: 'Ba cuộc chào hỏi giữa hai người lâu ngày không gặp. Cùng một việc, nhưng thể lịch sự và thể thường được chọn khác nhau ở từng cuộc.',
    characterIds: ['sato', 'ito', 'tanaka', 'sensei'],
    dialogueLines: [
      dialogueLine('sato', 'あ、お久しぶりです。', 'あ、おひさしぶりです。', 'À, lâu rồi không gặp ạ.', 'あ、おひさしぶりです'),
      dialogueLine('ito', 'お久しぶりです。', 'おひさしぶりです。', 'Lâu rồi không gặp ạ.', 'おひさしぶりです'),
      dialogueLine('sato', 'お元気ですか？', 'おげんきですか？', 'Anh/chị vẫn khoẻ chứ ạ?', 'おげんきですか'),
      dialogueLine('ito', 'はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.', 'はい。おかげさまで'),
      dialogueLine('tanaka', 'あ、久しぶり。', 'あ、ひさしぶり。', 'À, lâu rồi không gặp!', 'あ、ひさしぶり'),
      dialogueLine('sato', '久しぶり。', 'ひさしぶり。', 'Lâu rồi không gặp!', 'ひさしぶり'),
      dialogueLine('tanaka', '元気？', 'げんき？', 'Khoẻ không?', 'げんき'),
      dialogueLine('sato', 'うん。元気。', 'うん。げんき。', 'Ừ, khoẻ.', 'うん。げんき'),
      dialogueLine('sensei', 'あ、久しぶり。', 'あ、ひさしぶり。', 'À, lâu rồi không gặp.', 'あ、ひさしぶり'),
      dialogueLine('sato', 'お久しぶりです。', 'おひさしぶりです。', 'Lâu rồi không gặp ạ.', 'おひさしぶりです'),
      dialogueLine('sensei', '元気？', 'げんき？', 'Khoẻ không?', 'げんき'),
      dialogueLine('sato', 'はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ thầy, em vẫn khoẻ.', 'はい。おかげさまで'),
    ],
    sceneDividers: [
      { afterDialogueLine: 4, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
      { afterDialogueLine: 8, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
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
          'Chào người lâu ngày không gặp bằng お久しぶりです.',
          'Chào bạn bè bằng thể thường 久しぶり.',
          'Hỏi thăm sức khoẻ lịch sự bằng お元気ですか.',
          'Hỏi thăm thân mật bằng 元気？.',
          'Đáp lịch sự bằng はい。おかげさまで。',
          'Đáp thân mật bằng うん。元気。',
          'Chọn thể lịch sự hay thể thường theo người nghe.',
        ],
        situation: [
          'Bạn gặp lại một người đã quen sau lâu ngày không gặp.',
          'Hai người chào hỏi nhau, rồi hỏi thăm sức khoẻ.',
        ],
        examples: [
          { label: 'Với người quen, bạn chào:', ...line('', 'あ、お久しぶりです。', 'あ、おひさしぶりです。', 'À, lâu rồi không gặp ạ.', 'あ、おひさしぶりです') },
          { label: 'Với bạn bè, bạn chào:', ...line('', 'あ、久しぶり。', 'あ、ひさしぶり。', 'À, lâu rồi không gặp!', 'あ、ひさしぶり') },
          { label: 'Khi được hỏi thăm, bạn đáp:', ...line('', 'はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.', 'はい。おかげさまで') },
        ],
        importantNote: [
          'Thể lịch sự có お ở đầu và です ở cuối; bỏ cả hai thì thành thể thường.',
          'Hai bên không bắt buộc dùng cùng một thể — người trên có thể nói thể thường trong khi người dưới đáp thể lịch sự.',
          'おかげさまで nghĩa gốc là "nhờ ơn anh/chị" — chỉ đi với câu đáp lịch sự はい, không đi với うん.',
        ],
      },
      vocabularyDetails: [
        { id: 'o-hisashiburi-desu', timingAndContext: ['Gặp lại người đã lâu không gặp, trong tình huống cần lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: ['Không dùng với người vừa gặp hôm qua.'], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', '久しぶり', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Lâu rồi không gặp (lịch sự).', examples: [example('あ、お久しぶりです。', 'あ、おひさしぶりです。', 'À, lâu rồi không gặp ạ.')] },
        { id: 'hisashiburi', timingAndContext: ['Gặp lại người đã lâu không gặp, giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng trần này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'お久しぶりです', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Lâu rồi không gặp (thân mật).', examples: [example('あ、久しぶり。', 'あ、ひさしぶり。', 'À, lâu rồi không gặp!')] },
        { id: 'o-genki-desu-ka', timingAndContext: ['Hỏi thăm sức khoẻ ngay sau lời chào lâu ngày không gặp.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: ['Không dùng với người ngày nào cũng gặp.'], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', '元気？', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Anh/chị vẫn khoẻ chứ?', examples: [example('お元気ですか？', 'おげんきですか？', 'Anh/chị vẫn khoẻ chứ ạ?')], notes: ['Khác お元気で (lời chia tay đã học ở bài trước): câu này là lời HỎI khi gặp.'] },
        { id: 'genki', timingAndContext: ['Hỏi thăm sức khoẻ giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'お元気ですか', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Khoẻ không?', examples: [example('元気？', 'げんき？', 'Khoẻ không?')] },
        { id: 'hai', timingAndContext: ['Đáp "vâng" một cách lịch sự.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', 'うん', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Vâng.', examples: [example('はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.')] },
        { id: 'okagesama-de', timingAndContext: ['Đáp lại lời hỏi thăm sức khoẻ, một cách lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: ['Không ghép với うん — おかげさまで chỉ đi với はい.'], register: 'Lịch sự.', formal: [], casual: [], overview: 'Nhờ ơn anh/chị (nên tôi vẫn khoẻ).', examples: [example('はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.')] },
        { id: 'un', timingAndContext: ['Đáp "ừ" giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'はい', 'Dùng với:', 'Mọi đối tượng'], casual: [], overview: 'Ừ.', examples: [example('うん。元気。', 'うん。げんき。', 'Ừ, khoẻ.')] },
      ],
      // "Tham khảo thêm" (§B2b) — hai danh từ chỉ QUAN HỆ mà chính giáo trình
      // dùng để hỏi người học nên chọn thể nào (Trang PDF 42 và 44). FREE, không
      // tính ngân sách từ mới, không dùng ở Q1–Q13.
      vocabularyReferences: [
        { term: '先輩（せんぱい）', reading: 'せんぱい', speechText: 'せんぱい', meaning: 'Tiền bối (người vào trước ở trường hoặc chỗ làm).', register: 'Lịch sự.', example: example('先輩（せんぱい）と後輩（こうはい）', 'せんぱいとこうはい', 'Tiền bối và hậu bối.') },
        { term: '知（し）り合（あ）い', reading: 'しりあい', speechText: 'しりあい', meaning: 'Người quen.', register: 'Lịch sự.', example: example('知（し）り合（あ）い', 'しりあい', 'Người quen.') },
      ],
      dialogueGroups: [
        {
          id: 'both-polite', title: 'Cả hai dùng thể lịch sự', situation: 'Hai người lâu ngày không gặp đang chào hỏi nhau. Cả hai đều dùng thể lịch sự.',
          lines: [
            dialogueLine('sato', 'あ、お久しぶりです。', 'あ、おひさしぶりです。', 'À, lâu rồi không gặp ạ.', 'あ、おひさしぶりです'),
            dialogueLine('ito', 'お久しぶりです。', 'おひさしぶりです。', 'Lâu rồi không gặp ạ.', 'おひさしぶりです'),
            dialogueLine('sato', 'お元気ですか？', 'おげんきですか？', 'Anh/chị vẫn khoẻ chứ ạ?', 'おげんきですか'),
            dialogueLine('ito', 'はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.', 'はい。おかげさまで'),
          ],
          explanation: ['Cả hai câu đều có お ở đầu và です ở cuối — dấu hiệu thể lịch sự.', 'Câu đáp lịch sự là はい。おかげさまで。'],
        },
        {
          id: 'both-casual', title: 'Cả hai dùng thể thường', situation: 'Hai người lâu ngày không gặp đang chào hỏi nhau. Cả hai đều dùng thể thường.',
          lines: [
            dialogueLine('tanaka', 'あ、久しぶり。', 'あ、ひさしぶり。', 'À, lâu rồi không gặp!', 'あ、ひさしぶり'),
            dialogueLine('sato', '久しぶり。', 'ひさしぶり。', 'Lâu rồi không gặp!', 'ひさしぶり'),
            dialogueLine('tanaka', '元気？', 'げんき？', 'Khoẻ không?', 'げんき'),
            dialogueLine('sato', 'うん。元気。', 'うん。げんき。', 'Ừ, khoẻ.', 'うん。げんき'),
          ],
          explanation: ['Bỏ お và bỏ です là thành thể thường.', 'Câu đáp thân mật là うん。元気。'],
        },
        {
          id: 'mixed-register', title: 'Hai bên dùng hai thể khác nhau', situation: 'Hai người lâu ngày không gặp đang chào hỏi nhau. Một bên dùng thể thường, bên kia đáp bằng thể lịch sự.',
          lines: [
            dialogueLine('sensei', 'あ、久しぶり。', 'あ、ひさしぶり。', 'À, lâu rồi không gặp.', 'あ、ひさしぶり'),
            dialogueLine('sato', 'お久しぶりです。', 'おひさしぶりです。', 'Lâu rồi không gặp ạ.', 'おひさしぶりです'),
            dialogueLine('sensei', '元気？', 'げんき？', 'Khoẻ không?', 'げんき'),
            dialogueLine('sato', 'はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ thầy, em vẫn khoẻ.', 'はい。おかげさまで'),
          ],
          explanation: ['Hai bên KHÔNG bắt buộc dùng cùng một thể.', 'Người ở vai trên nói thể thường, người ở vai dưới đáp bằng thể lịch sự.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'お久しぶりです ↔ 久しぶり', formula: 'お ＋ 久（ひさ）しぶり ＋ です', formulaReading: 'お ＋ ひさしぶり ＋ です', meaning: 'Cùng lời chào lâu ngày không gặp, hai thể.',
          examples: [example('お久しぶりです。', 'おひさしぶりです。', 'Lâu rồi không gặp ạ.'), example('久しぶり。', 'ひさしぶり。', 'Lâu rồi không gặp!')],
          explanation: ['Thêm お ở đầu và です ở cuối là thể lịch sự; bỏ cả hai là thể thường.'],
        },
        {
          title: 'お元気ですか ↔ 元気？', formula: 'お ＋ 元気（げんき） ＋ ですか', formulaReading: 'お ＋ げんき ＋ ですか', meaning: 'Cùng câu hỏi thăm sức khoẻ, hai thể.',
          examples: [example('お元気ですか？', 'おげんきですか？', 'Anh/chị vẫn khoẻ chứ ạ?'), example('元気？', 'げんき？', 'Khoẻ không?')],
          explanation: ['Cùng cơ chế: bỏ お và bỏ ですか thì còn 元気？ ở thể thường.'],
        },
        {
          title: 'はい。おかげさまで。↔ うん。元気。', formula: 'はい ／ うん ＋ [câu đáp]', formulaReading: 'はい ／ うん ＋ [こたえ]', meaning: 'Cùng câu đáp lời hỏi thăm, hai thể.',
          examples: [example('はい。おかげさまで。', 'はい。おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.'), example('うん。元気。', 'うん。げんき。', 'Ừ, khoẻ.')],
          explanation: ['はい đi với おかげさまで; うん đi với 元気。 Không trộn hai vế của hai thể.'],
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
    { id: 'o-hisashiburi-desu', displayText: 'お久（ひさ）しぶりです', reading: 'おひさしぶりです', romanization: 'o-hisashiburi desu', speechText: 'おひさしぶりです', meaningVi: 'Lâu rồi không gặp (lịch sự).', translationByNative: vi('Lâu rồi không gặp (lịch sự).'), translations: vi('Lâu rồi không gặp (lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'hisashiburi', displayText: '久（ひさ）しぶり', reading: 'ひさしぶり', romanization: 'hisashiburi', speechText: 'ひさしぶり', meaningVi: 'Lâu rồi không gặp (thân mật).', translationByNative: vi('Lâu rồi không gặp (thân mật).'), translations: vi('Lâu rồi không gặp (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'o-genki-desu-ka', displayText: 'お元気（げんき）ですか', reading: 'おげんきですか', romanization: 'o-genki desu ka', speechText: 'おげんきですか', meaningVi: 'Anh/chị vẫn khoẻ chứ?', translationByNative: vi('Anh/chị vẫn khoẻ chứ?'), translations: vi('Anh/chị vẫn khoẻ chứ?'), audioLocale: 'ja-JP' },
    { id: 'genki', displayText: '元気（げんき）？', reading: 'げんき', romanization: 'genki?', speechText: 'げんき', meaningVi: 'Khoẻ không?', translationByNative: vi('Khoẻ không?'), translations: vi('Khoẻ không?'), audioLocale: 'ja-JP' },
    { id: 'hai', displayText: 'はい', reading: 'はい', romanization: 'hai', speechText: 'はい', meaningVi: 'Vâng.', translationByNative: vi('Vâng.'), translations: vi('Vâng.'), audioLocale: 'ja-JP' },
    { id: 'okagesama-de', displayText: 'おかげさまで', reading: 'おかげさまで', romanization: 'okagesama de', speechText: 'おかげさまで', meaningVi: 'Nhờ ơn anh/chị (nên tôi vẫn khoẻ).', translationByNative: vi('Nhờ ơn anh/chị (nên tôi vẫn khoẻ).'), translations: vi('Nhờ ơn anh/chị (nên tôi vẫn khoẻ).'), audioLocale: 'ja-JP' },
    { id: 'un', displayText: 'うん', reading: 'うん', romanization: 'un', speechText: 'うん', meaningVi: 'Ừ.', translationByNative: vi('Ừ.'), translations: vi('Ừ.'), audioLocale: 'ja-JP' },
  ],
};

export const JA_UNIT2_LESSON1 = localizeSupport(JA_UNIT2_LESSON1_SOURCE);
