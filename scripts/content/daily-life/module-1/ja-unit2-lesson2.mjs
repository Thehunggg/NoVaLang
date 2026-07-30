import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit2-lesson2-localization.mjs';

// Daily Life / Module 1 / Unit 2 / Lesson 2 — "Đáp lời hỏi thăm"
// Tiêu đề/mô tả lấy đúng bản owner đã chốt ở commit 9a8f23e (blueprint).
//
// NGUỒN: sổ chất liệu shared/content/curriculum/provenance/
//        ja-daily_life-m01-u2-l2.provenance.json (commit 2c79faf) là NGUỒN ĐÓNG
//        cho mọi câu tiếng Nhật. Không câu nào nằm ngoài sổ.
//   · Irodori 初級1 第1課 can-do 02 「日本に来てどのぐらいですか？」
//     mã băng 01-06 / 01-07 / 01-08 / 01-09
//   · local-sources/ja/n5/n5_ngu-phap-vi.txt — ví dụ ngữ pháp + bản dịch Việt
//
// Card 3 = 01-06 · 01-08 · 01-09 (ba kiểu đáp: khẳng định trần · khẳng định kèm
// おかげさまで · phủ định まだ). Q14 = 01-07 + 01-09.
const vi = (value) => supportTextByVietnamese.get(value) ?? { vi: value };
const speakerReadings = { '田中': 'たなか', '伊藤': 'いとう', '佐藤': 'さとう', '先生': 'せんせい' };

const approvedCharacterNamePool = [
  { id: 'tanaka', displayName: '田中（たなか）', canonicalName: '田中', audioName: 'たなか' },
  { id: 'ito', displayName: '伊藤（いとう）', canonicalName: '伊藤', audioName: 'いとう' },
  { id: 'sato', displayName: '佐藤（さとう）', canonicalName: '佐藤', audioName: 'さとう' },
  { id: 'sensei', displayName: '先生（せんせい）', canonicalName: '先生', audioName: 'せんせい' },
];
const characterById = Object.fromEntries(approvedCharacterNamePool.map((c) => [c.id, c]));

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
    id: 'ja-daily_life-m01-u2-l2-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    prompt: '「日本（にほん）に来（き）て、どのぐらいですか？」 hỏi điều gì?',
    options: [option('how_long', 'Bạn đến Nhật được bao lâu rồi?'), option('where_from', 'Bạn đến từ đâu?'), option('what_job', 'Bạn làm nghề gì?'), option('how_old', 'Bạn bao nhiêu tuổi?')],
    correctOptionId: 'how_long',
    feedback: { correctAnswer: 'Bạn đến Nhật được bao lâu rồi?', explanation: 'どのぐらい hỏi độ dài thời gian; ghép với 来て thành câu hỏi đã ở Nhật bao lâu.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    context: 'Bạn đã ở Nhật tròn một năm.',
    prompt: 'Bạn đã ở Nhật tròn một năm. Đáp thế nào?',
    options: [option('correct', '1年（いちねん）になります。', '1年になります。', 'いちねんになります'), option('ga', '1年（いちねん）がなります。', '1年がなります。', 'いちねんがなります'), option('wo', '1年（いちねん）をなります。', '1年をなります。', 'いちねんをなります'), option('dup', '1年（いちねん）にになります。', '1年にになります。', 'いちねんにになります')],
    correctOptionId: 'correct',
    feedback: { correctAnswer: '1年（いちねん）になります。', canonicalAnswer: '1年になります。', audioText: 'いちねんになります', explanation: 'Mốc thời gian đi với trợ từ に: 1年になります。 Các phương án khác sai trợ từ hoặc lặp trợ từ.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi từ với nghĩa của nó.',
    pairs: [
      { id: 'dono', left: { id: 'dono_l', text: 'どのぐらい' }, right: { id: 'dono_r', text: 'Bao lâu' } },
      { id: 'nareru', left: { id: 'nareru_l', text: '慣（な）れる' }, right: { id: 'nareru_r', text: 'Quen với' } },
      { id: 'mou', left: { id: 'mou_l', text: 'もう' }, right: { id: 'mou_r', text: 'Đã… rồi' } },
      { id: 'mada', left: { id: 'mada_l', text: 'まだ' }, right: { id: 'mada_r', text: 'Vẫn chưa' } },
    ],
    feedback: { explanation: 'もう và まだ là cặp đối nhau: đã rồi ↔ vẫn chưa.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu trả lời "tròn một năm".',
    tokens: [token('ichinen', '1年（いちねん）', '1年', 'いちねん'), token('ni', 'に'), token('narimasu', 'なります'), token('mou', 'もう'), token('mada', 'まだ')],
    correctTokenIds: ['ichinen', 'ni', 'narimasu'],
    feedback: { correctAnswer: '1年（いちねん）になります。', canonicalAnswer: '1年になります。', audioText: 'いちねんになります', explanation: '1年 + に + なります → 1年になります。 もう và まだ không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    context: 'Sato gặp Ito — người mới sang Nhật — và hỏi thăm đã ở đây bao lâu. Đến lượt Ito trả lời.',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['佐藤: 日本（にほん）に来（き）て、どのぐらいですか？', '伊藤: {{slot_1}}。'],
    slots: [{ id: 'slot_1', answerId: 'ichinen', placeholder: '________' }],
    wordBank: [option('ichinen', '1年（いちねん）になります', '1年になります', 'いちねんになります'), option('mada', 'まだ、ちょっと'), option('mou', 'もう慣（な）れました', 'もう慣れました', 'もうなれました')],
    feedback: { correctAnswer: '1年（いちねん）になります。', canonicalAnswer: '1年になります。', audioText: 'いちねんになります', explanation: 'Được hỏi đã ở bao lâu thì đáp bằng mốc thời gian + になります.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'そうですか。もうなれましたか',
    options: [option('used_to', 'Vậy à. Bạn quen chưa?'), option('how_long', 'Vậy à. Bạn đến bao lâu rồi?'), option('where', 'Vậy à. Bạn ở đâu?'), option('fine', 'Vậy à. Bạn khoẻ không?')],
    correctOptionId: 'used_to',
    feedback: { correctAnswer: 'Vậy à. Bạn quen chưa?', explanation: 'もう慣れましたか？ hỏi đã quen với cuộc sống ở đây chưa.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Được hỏi 「もう慣（な）れましたか？」 nhưng bạn vẫn CHƯA quen.',
    prompt: 'Được hỏi 「もう慣（な）れましたか？」 nhưng bạn vẫn CHƯA quen. Đáp thế nào?',
    options: [option('mada', 'まだ、ちょっと……。'), option('hai_okage', 'はい、おかげさまで。'), option('hai', 'はい。'), option('ichinen', '1年（いちねん）になります。', '1年になります。', 'いちねんになります')],
    correctOptionId: 'mada',
    feedback: { correctAnswer: 'まだ、ちょっと……。', explanation: 'まだ、ちょっと…… là cách đáp "vẫn chưa" một cách nhẹ nhàng. はい nghĩa là ĐÃ quen; 1年になります trả lời câu hỏi khác.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    prompt: '「はい、おかげさまで。」 dùng khi nào?',
    options: [option('yes_thanks', 'Đáp khẳng định một cách lịch sự và biết ơn'), option('refuse', 'Từ chối lời mời'), option('apologize', 'Xin lỗi vì đến muộn'), option('ask_again', 'Hỏi lại vì chưa nghe rõ')],
    correctOptionId: 'yes_thanks',
    feedback: { correctAnswer: 'Đáp khẳng định một cách lịch sự và biết ơn', explanation: 'おかげさまで đã học ở bài trước — đáp có, kèm ý nhờ ơn người hỏi.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'どのぐらい hỏi về điều gì?', options: [option('duration', 'Độ dài thời gian'), option('place', 'Nơi chốn'), option('reason', 'Lý do'), option('person', 'Người')], correctOptionId: 'duration', feedback: { correctAnswer: 'Độ dài thời gian', explanation: 'どのぐらい = bao lâu / bao nhiêu.' } },
      { id: 'q9_2', prompt: 'もう đi với câu hỏi mang nghĩa gì?', options: [option('already', 'Đã… chưa?'), option('not_yet', 'Vẫn chưa'), option('never', 'Chưa bao giờ'), option('again', 'Lại lần nữa')], correctOptionId: 'already', feedback: { correctAnswer: 'Đã… chưa?', explanation: 'もう慣れましたか？ = đã quen chưa?' } },
      { id: 'q9_3', prompt: 'まだ nghĩa là gì?', options: [option('not_yet', 'Vẫn chưa'), option('already', 'Đã rồi'), option('very', 'Rất'), option('maybe', 'Có lẽ')], correctOptionId: 'not_yet', feedback: { correctAnswer: 'Vẫn chưa', explanation: 'まだ、ちょっと…… = vẫn chưa, hơi khó một chút.' } },
      { id: 'q9_4', prompt: 'Mốc thời gian đi với trợ từ nào trong 「1年＿なります」?', options: [option('ni', 'に'), option('ga', 'が'), option('wo', 'を'), option('mo', 'も')], correctOptionId: 'ni', feedback: { correctAnswer: 'に', explanation: '1年になります — mốc thời gian đi với に.' } },
      { id: 'q9_5', prompt: '「去年（きょねん）」 nghĩa là gì?', options: [option('last_year', 'Năm ngoái'), option('last_month', 'Tháng trước'), option('this_year', 'Năm nay'), option('next_year', 'Năm sau')], correctOptionId: 'last_year', feedback: { correctAnswer: 'Năm ngoái', explanation: '去年 = năm ngoái; 先月 = tháng trước.' } },
    ],
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '19:30',
      context: 'Sato nhắn tin cho Ito lúc 19:30, hỏi thăm Ito sang Nhật được bao lâu rồi và đã quen với cuộc sống ở đây chưa. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: '日本（にほん）に来（き）て、どのぐらいですか？', canonicalText: '日本に来て、どのぐらいですか？', audioText: 'にほんにきて、どのぐらいですか' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ slotId: 'chat_kikan_slot' }, { displayText: '。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'そうですか。もう慣（な）れましたか？', canonicalText: 'そうですか。もう慣れましたか？', audioText: 'そうですか。もうなれましたか' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ displayText: 'はい、' }, { slotId: 'chat_okage_slot' }, { displayText: '。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ displayText: 'そうですか。' }] },
        { id: 'message_6', speakerId: 'b', segments: [{ displayText: 'はい。' }] },
      ],
    },
    slots: [
      { id: 'chat_kikan_slot', displayText: '1年（いちねん）になります', canonicalText: '1年になります', audioText: 'いちねんになります', acceptedAnswers: ['1年になります', 'いちねんになります', '一年になります'] },
      { id: 'chat_okage_slot', displayText: 'おかげさまで', canonicalText: 'おかげさまで', audioText: 'おかげさまで', acceptedAnswers: ['おかげさまで'] },
    ],
    feedback: { correctAnswer: '1年（いちねん）になります\nおかげさまで', canonicalAnswer: '1年になります／おかげさまで', audioText: 'いちねんになります／おかげさまで', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_kikan_slot: { incorrectMessage: 'Ô này trả lời câu hỏi đã ở bao lâu.', correctAnswer: '1年になります', explanation: 'Mốc thời gian + になります.' }, chat_okage_slot: { incorrectMessage: 'Ô này là phần sau của câu đáp lịch sự はい、___。', correctAnswer: 'おかげさまで', explanation: 'はい、おかげさまで。 là câu đáp khẳng định lịch sự đã học ở bài trước.' } } },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu đáp "vẫn chưa quen lắm". Có thẻ không cần dùng.',
    tokens: [token('mada', 'まだ'), token('chotto', 'ちょっと'), token('mou_d', 'もう'), token('hai_d', 'はい')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'mada', afterText: '、' },
      { id: 's2', expectedTokenId: 'chotto', afterText: '……。' },
    ],
    unusedTokenIds: ['mou_d', 'hai_d'],
    feedback: { correctAnswer: 'まだ、ちょっと……。', canonicalAnswer: 'まだ、ちょっと……。', audioText: 'まだ、ちょっと', explanation: 'まだ + ちょっと → まだ、ちょっと……。 もう và はい mang nghĩa ngược lại.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      // Furigana viết TAY ở đây: generator tự gắn thì đoán sai
      // 日本→にっぽん và 9月→つき (đo được ở lượt kiểm phủ). Chuỗi đã có
      // furigana thì generator bỏ qua, nên phải chú đủ MỌI kanji trong chuỗi.
      option('natural', 'A: 日本（にほん）に来（き）て、どのぐらいですか？\nB: 去年（きょねん）の9月（くがつ）に来（き）ました。', 'A: 日本に来て、どのぐらいですか？\nB: 去年の9月に来ました。'),
      option('wrong_particle', 'A: 日本（にほん）で来（き）て、どのぐらいですか？\nB: 去年（きょねん）の9月（くがつ）に来（き）ました。', 'A: 日本で来て、どのぐらいですか？\nB: 去年の9月に来ました。'),
      option('mismatch', 'A: 日本（にほん）に来（き）て、どのぐらいですか？\nB: はい、おかげさまで。', 'A: 日本に来て、どのぐらいですか？\nB: はい、おかげさまで。'),
      option('dup_particle', 'A: 日本（にほん）に来（き）て、どのぐらいですか？\nB: 1年（いちねん）にになります。', 'A: 日本に来て、どのぐらいですか？\nB: 1年にになります。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: 'A: 日本に来て、どのぐらいですか？\nB: 去年の9月に来ました。', explanation: 'A đúng: hỏi bao lâu, đáp bằng mốc thời gian. B sai trợ từ 来る đi với に không phải で. C đáp có/không cho câu hỏi bao lâu. D lặp trợ từ に.' },
  },
  {
    id: 'ja-daily_life-m01-u2-l2-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu hỏi đã ở Nhật bao lâu. Có thẻ không cần dùng.',
    tokens: [token('nihon', '日本（にほん）', '日本', 'にほん'), token('ni', 'に'), token('kite', '来（き）て', '来て', 'きて'), token('dono', 'どのぐらい'), token('desu', 'です'), token('ka', 'か'), token('de_d', 'で'), token('mada_d', 'まだ')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'nihon' },
      { id: 's2', expectedTokenId: 'ni' },
      { id: 's3', expectedTokenId: 'kite', afterText: '、' },
      { id: 's4', expectedTokenId: 'dono' },
      { id: 's5', expectedTokenId: 'desu' },
      { id: 's6', expectedTokenId: 'ka', afterText: '？' },
    ],
    unusedTokenIds: ['de_d', 'mada_d'],
    feedback: { correctAnswer: '日本（にほん）に来（き）て、どのぐらいですか？', canonicalAnswer: '日本に来て、どのぐらいですか？', audioText: 'にほんにきて、どのぐらいですか', explanation: '日本 + に + 来て + どのぐらい + です + か → 日本に来て、どのぐらいですか？ 来る đi với に, không phải で.' },
  },
  {
    // Lesson Format 3.0 — non-graded. Chất liệu pha A: Irodori 01-07 + 01-09.
    id: 'ja-daily_life-m01-u2-l2-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Hai lần được hỏi thăm',
    scenarioDescription: 'Hai cuộc hỏi thăm khác nhau. Cùng một câu hỏi, hai người trả lời theo hai cách: một người đã quen, một người thì chưa.',
    characterIds: ['sato', 'ito', 'sensei'],
    dialogueLines: [
      dialogueLine('sato', '日本に来て、どのぐらいですか？', 'にほんにきて、どのぐらいですか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいですか'),
      dialogueLine('ito', 'ちょうど半年です。', 'ちょうどはんとしです。', 'Đúng tròn nửa năm.', 'ちょうどはんとしです'),
      dialogueLine('sato', 'そうですか。日本に慣れましたか？', 'そうですか。にほんになれましたか？', 'Vậy à. Bạn quen với Nhật chưa?', 'そうですか。にほんになれましたか'),
      dialogueLine('ito', 'はい、なんとか。', 'はい、なんとか。', 'Vâng, cũng tạm ạ.', 'はい、なんとか'),
      dialogueLine('sensei', '日本に来て、どのぐらいになりますか？', 'にほんにきて、どのぐらいになりますか？', 'Em đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいになりますか'),
      dialogueLine('sato', '私は、先月、来ました。', 'わたしは、せんげつ、きました。', 'Em mới đến tháng trước ạ.', 'わたしは、せんげつ、きました'),
      dialogueLine('sensei', 'そうですか。少し慣れましたか？', 'そうですか。すこしなれましたか？', 'Vậy à. Em quen được một chút chưa?', 'そうですか。すこしなれましたか'),
      dialogueLine('sato', 'まだ、ちょっと……。', 'まだ、ちょっと……。', 'Dạ vẫn chưa, hơi khó một chút ạ.', 'まだ、ちょっと'),
    ],
    sceneDividers: [
      { afterDialogueLine: 4, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
    ],
  },
];

const JA_UNIT2_LESSON2_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Gặp lại người đã quen',
    titleByNative: vi('Gặp lại người đã quen'),
  },
  lesson: {
    title: 'Đáp lời hỏi thăm',
    titleByNative: vi('Đáp lời hỏi thăm'),
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
          'Hỏi người khác đã ở Nhật bao lâu bằng どのぐらい.',
          'Trả lời bằng mốc thời gian + になります.',
          'Hỏi đã quen chưa bằng もう慣れましたか.',
          'Đáp khẳng định bằng はい、おかげさまで.',
          'Đáp phủ định nhẹ nhàng bằng まだ、ちょっと.',
          'Kể mốc thời gian đã đến bằng 去年 và 先月.',
        ],
        situation: [
          'Bạn gặp lại người quen và được hỏi thăm về cuộc sống dạo này.',
          'Bạn kể mình đến Nhật bao lâu rồi và đã quen hay chưa.',
        ],
        examples: [
          { label: 'Người ta hỏi bạn:', ...line('', '日本に来て、どのぐらいになりますか？', 'にほんにきて、どのぐらいになりますか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいになりますか') },
          { label: 'Bạn đáp bằng mốc thời gian:', ...line('', '1年になります。', 'いちねんになります。', 'Được tròn một năm rồi ạ.', 'いちねんになります') },
          { label: 'Được hỏi đã quen chưa, bạn đáp:', ...line('', 'はい、おかげさまで。', 'はい、おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi quen rồi.', 'はい、おかげさまで') },
        ],
        importantNote: [
          'どのぐらい hỏi ĐỘ DÀI thời gian, khác với いつ hỏi thời điểm.',
          'もう đi với câu hỏi nghĩa "đã… chưa"; まだ là câu đáp "vẫn chưa".',
          'まだ、ちょっと…… bỏ lửng cuối câu là cách từ chối/phủ định nhẹ nhàng, rất thường gặp.',
        ],
      },
      vocabularyDetails: [
        { id: 'dono-gurai', timingAndContext: ['Hỏi độ dài thời gian.'], appropriateFor: ['Mọi đối tượng'], avoid: ['Không dùng để hỏi thời điểm — đó là いつ.'], register: '', formal: [], casual: [], overview: 'Bao lâu.', examples: [example('日本に来て、どのぐらいになりますか？', 'にほんにきて、どのぐらいになりますか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいになりますか')] },
        { id: 'nareru', timingAndContext: ['Nói về việc đã quen với nơi ở hoặc công việc mới.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: ['Cách lịch sự:', '慣れました', 'Dùng với:', 'Mọi đối tượng'], casual: [], overview: 'Quen với.', examples: [example('そうですか。もう慣れましたか？', 'そうですか。もうなれましたか？', 'Vậy à. Bạn quen chưa?', 'そうですか。もうなれましたか')], notes: ['Dạng từ điển — mức lịch sự nằm ở cách chia: 慣れます (lịch sự) ・ 慣れる／慣れた (thân mật).'] },
        { id: 'nihon', timingAndContext: ['Tên nước Nhật Bản.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Nhật Bản.', examples: [example('日本に来て、どのぐらいですか？', 'にほんにきて、どのぐらいですか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいですか')] },
        { id: 'seikatsu', timingAndContext: ['Nói về cuộc sống, sinh hoạt hằng ngày.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Cuộc sống, sinh hoạt.', examples: [example('そうですか。日本の生活に、もう慣れましたか？', 'そうですか。にほんのせいかつに、もうなれましたか？', 'Vậy à. Bạn quen với cuộc sống ở Nhật chưa?', 'そうですか。にほんのせいかつに、もうなれましたか')] },
        { id: 'ni-narimasu', timingAndContext: ['Nói mốc thời gian đã tròn bao lâu.'], appropriateFor: ['Mọi đối tượng'], avoid: ['Không đổi trợ từ に thành が hay を.'], register: '', formal: [], casual: [], overview: 'Tròn / được (bao lâu).', examples: [example('1年になります。', 'いちねんになります。', 'Được tròn một năm rồi ạ.', 'いちねんになります')] },
        { id: 'mou', timingAndContext: ['Hỏi hoặc nói việc gì đó đã xong.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Đã… rồi.', examples: [example('そうですか。もう慣れましたか？', 'そうですか。もうなれましたか？', 'Vậy à. Bạn quen chưa?', 'そうですか。もうなれましたか')] },
        { id: 'mada', timingAndContext: ['Đáp rằng việc gì đó vẫn chưa xong.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Vẫn chưa.', examples: [example('まだ、ちょっと……。', 'まだ、ちょっと……。', 'Vẫn chưa, hơi khó một chút.', 'まだ、ちょっと')] },
        { id: 'kyonen', timingAndContext: ['Chỉ mốc thời gian năm ngoái.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Năm ngoái.', examples: [example('去年の9月に来ました。', 'きょねんのくがつにきました。', 'Tôi đến vào tháng 9 năm ngoái.', 'きょねんのくがつにきました')] },
        { id: 'sengetsu', timingAndContext: ['Chỉ mốc thời gian tháng trước.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Tháng trước.', examples: [example('私は、先月、来ました。', 'わたしは、せんげつ、きました。', 'Tôi mới đến tháng trước.', 'わたしは、せんげつ、きました')] },
      ],
      // "Tham khảo thêm" (§B2b) — hai từ xuất hiện ở Q14, đúng mức "dư 1–2 từ
      // mới" mà §G14-R5 cho phép. FREE, không dùng ở Q1–Q13.
      vocabularyReferences: [
        { term: '半年（はんとし）', reading: 'はんとし', speechText: 'はんとし', meaning: 'Nửa năm.', register: '', example: example('ちょうど半年です。', 'ちょうどはんとしです。', 'Đúng tròn nửa năm.') },
        { term: 'なんとか', reading: 'なんとか', speechText: 'なんとか', meaning: 'Cũng tạm, xoay xở được.', register: '', example: example('はい、なんとか。', 'はい、なんとか。', 'Vâng, cũng tạm ạ.') },
      ],
      dialogueGroups: [
        {
          id: 'one-year', title: 'Đã ở một năm, đã quen', situation: 'Hai người quen gặp nhau. Một người hỏi thăm người kia đã ở Nhật bao lâu và đã quen chưa.',
          lines: [
            dialogueLine('sato', '日本に来て、どのぐらいになりますか？', 'にほんにきて、どのぐらいになりますか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいになりますか'),
            dialogueLine('ito', '1年になります。', 'いちねんになります。', 'Được tròn một năm rồi ạ.', 'いちねんになります'),
            dialogueLine('sato', 'そうですか。日本の生活に、もう慣れましたか？', 'そうですか。にほんのせいかつに、もうなれましたか？', 'Vậy à. Bạn quen với cuộc sống ở Nhật chưa?', 'そうですか。にほんのせいかつに、もうなれましたか'),
            dialogueLine('ito', 'はい。', 'はい。', 'Vâng, quen rồi ạ.', 'はい'),
          ],
          explanation: ['どのぐらいになりますか hỏi đã được bao lâu; đáp bằng mốc thời gian + になります.', 'もう慣れましたか hỏi đã quen chưa; đáp はい là đã quen.'],
        },
        {
          id: 'last-september', title: 'Đến từ tháng 9 năm ngoái', situation: 'Cùng câu hỏi, nhưng người này trả lời bằng thời điểm đã đến thay vì độ dài thời gian.',
          lines: [
            dialogueLine('sato', '日本に来て、どのぐらいですか？', 'にほんにきて、どのぐらいですか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいですか'),
            dialogueLine('tanaka', '去年の9月に来ました。', 'きょねんのくがつにきました。', 'Tôi đến vào tháng 9 năm ngoái.', 'きょねんのくがつにきました'),
            dialogueLine('sato', 'そうですか。もう慣れましたか？', 'そうですか。もうなれましたか？', 'Vậy à. Bạn quen chưa?', 'そうですか。もうなれましたか'),
            dialogueLine('tanaka', 'はい、おかげさまで。', 'はい、おかげさまで。', 'Vâng, nhờ ơn anh/chị, tôi quen rồi.', 'はい、おかげさまで'),
          ],
          explanation: ['Câu hỏi どのぐらい có thể đáp bằng ĐỘ DÀI (1年) hoặc bằng THỜI ĐIỂM đã đến (去年の9月).', 'はい、おかげさまで lịch sự hơn はい trần — cụm này đã học ở bài trước.'],
        },
        {
          id: 'not-yet', title: 'Mới đến, chưa quen', situation: 'Người vừa đến tháng trước, được hỏi đã quen chưa và đáp là vẫn chưa.',
          lines: [
            dialogueLine('sensei', '日本に来て、どのぐらいになりますか？', 'にほんにきて、どのぐらいになりますか？', 'Em đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいになりますか'),
            dialogueLine('sato', '私は、先月、来ました。', 'わたしは、せんげつ、きました。', 'Em mới đến tháng trước ạ.', 'わたしは、せんげつ、きました'),
            dialogueLine('sensei', 'そうですか。少し慣れましたか？', 'そうですか。すこしなれましたか？', 'Vậy à. Em quen được một chút chưa?', 'そうですか。すこしなれましたか'),
            dialogueLine('sato', 'まだ、ちょっと……。', 'まだ、ちょっと……。', 'Dạ vẫn chưa, hơi khó một chút ạ.', 'まだ、ちょっと'),
          ],
          explanation: ['まだ、ちょっと…… bỏ lửng cuối câu là cách đáp phủ định nhẹ nhàng, không nói thẳng "chưa quen".', '少し慣れましたか hỏi đã quen được một chút chưa — nhẹ hơn もう慣れましたか.'],
        },
      ],
      grammarPatterns: [
        {
          title: '〜に来（き）て、どのぐらいですか', formula: '[nơi] ＋ に来（き）て、どのぐらいですか', formulaReading: '[ばしょ] ＋ にきて、どのぐらいですか', meaning: 'Hỏi đã đến nơi đó được bao lâu.',
          examples: [example('日本に来て、どのぐらいになりますか？', 'にほんにきて、どのぐらいになりますか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいになりますか'), example('日本に来て、どのぐらいですか？', 'にほんにきて、どのぐらいですか？', 'Bạn đến Nhật được bao lâu rồi?', 'にほんにきて、どのぐらいですか')],
          explanation: ['来る đi với trợ từ に chỉ nơi đến, không dùng で.', 'Có thể nói どのぐらいですか hoặc どのぐらいになりますか, nghĩa như nhau.'],
        },
        {
          title: '[mốc thời gian] ＋ になります', formula: '[時（とき）] ＋ に ＋ なります', formulaReading: '[とき] ＋ に ＋ なります', meaning: 'Tròn / được bao lâu.',
          examples: [example('1年になります。', 'いちねんになります。', 'Được tròn một năm rồi ạ.', 'いちねんになります'), example('あのひとは ゆうめいになりました。', 'あのひとはゆうめいになりました。', 'Người kia đã trở nên nổi tiếng rồi.', 'あのひとはゆうめいになりました')],
          explanation: ['になります dùng cho cả mốc thời gian lẫn sự thay đổi trạng thái.', 'Trợ từ luôn là に — đổi sang が hay を là sai.'],
        },
        {
          title: 'もう ＋ [động từ] ＋ ましたか', formula: 'もう ＋ [動詞（どうし）] ＋ ましたか', formulaReading: 'もう ＋ [どうし] ＋ ましたか', meaning: 'Đã… chưa?',
          examples: [example('そうですか。もう慣れましたか？', 'そうですか。もうなれましたか？', 'Vậy à. Bạn quen chưa?', 'そうですか。もうなれましたか'), example('くすりを のみましたから、もうだいじょうぶです。', 'くすりをのみましたから、もうだいじょうぶです。', 'Tôi đã uống thuốc rồi nên bây giờ không sao.', 'くすりをのみましたから、もうだいじょうぶです')],
          explanation: ['もう đặt trước động từ, mang nghĩa "đã… rồi".', 'Câu đáp khẳng định là はい; đáp phủ định dùng まだ.'],
        },
        {
          title: 'まだ — đáp "vẫn chưa"', formula: 'まだ ＋ [phần bỏ lửng hoặc ていません]', formulaReading: 'まだ ＋ […]', meaning: 'Vẫn chưa.',
          examples: [example('まだ、ちょっと……。', 'まだ、ちょっと……。', 'Vẫn chưa, hơi khó một chút.', 'まだ、ちょっと'), example('あさごはんを まだたべていません。', 'あさごはんをまだたべていません。', 'Tôi vẫn chưa ăn sáng.', 'あさごはんをまだたべていません')],
          explanation: ['まだ là câu đáp đối lại もう.', 'Bỏ lửng sau ちょっと là cách nói giảm nhẹ, lịch sự hơn nói thẳng.'],
        },
        {
          title: '[động từ] ＋ ました — quá khứ lịch sự', formula: '[動詞（どうし）] ＋ ました', formulaReading: '[どうし] ＋ ました', meaning: 'Đã làm gì đó (lịch sự).',
          examples: [example('去年の9月に来ました。', 'きょねんのくがつにきました。', 'Tôi đến vào tháng 9 năm ngoái.', 'きょねんのくがつにきました'), example('わたしは ケーキを たべました。', 'わたしはケーキをたべました。', 'Tôi đã ăn bánh ngọt.', 'わたしはケーキをたべました')],
          explanation: ['ました là dạng quá khứ của ます.', 'Dùng để kể mốc thời gian đã đến hoặc việc đã làm.'],
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
    { id: 'dono-gurai', displayText: 'どのぐらい', reading: 'どのぐらい', romanization: 'dono gurai', speechText: 'どのぐらい', meaningVi: 'Bao lâu.', translationByNative: vi('Bao lâu.'), translations: vi('Bao lâu.'), audioLocale: 'ja-JP' },
    { id: 'nareru', displayText: '慣（な）れる', reading: 'なれる', romanization: 'nareru', speechText: 'なれる', meaningVi: 'Quen với.', translationByNative: vi('Quen với.'), translations: vi('Quen với.'), audioLocale: 'ja-JP' },
    { id: 'nihon', displayText: '日本（にほん）', reading: 'にほん', romanization: 'Nihon', speechText: 'にほん', meaningVi: 'Nhật Bản.', translationByNative: vi('Nhật Bản.'), translations: vi('Nhật Bản.'), audioLocale: 'ja-JP' },
    { id: 'seikatsu', displayText: '生活（せいかつ）', reading: 'せいかつ', romanization: 'seikatsu', speechText: 'せいかつ', meaningVi: 'Cuộc sống, sinh hoạt.', translationByNative: vi('Cuộc sống, sinh hoạt.'), translations: vi('Cuộc sống, sinh hoạt.'), audioLocale: 'ja-JP' },
    { id: 'ni-narimasu', displayText: '～になります', reading: 'になります', romanization: 'ni narimasu', speechText: 'になります', meaningVi: 'Tròn / được (bao lâu).', translationByNative: vi('Tròn / được (bao lâu).'), translations: vi('Tròn / được (bao lâu).'), audioLocale: 'ja-JP' },
    { id: 'mou', displayText: 'もう', reading: 'もう', romanization: 'mō', speechText: 'もう', meaningVi: 'Đã… rồi.', translationByNative: vi('Đã… rồi.'), translations: vi('Đã… rồi.'), audioLocale: 'ja-JP' },
    { id: 'mada', displayText: 'まだ', reading: 'まだ', romanization: 'mada', speechText: 'まだ', meaningVi: 'Vẫn chưa.', translationByNative: vi('Vẫn chưa.'), translations: vi('Vẫn chưa.'), audioLocale: 'ja-JP' },
    { id: 'kyonen', displayText: '去年（きょねん）', reading: 'きょねん', romanization: 'kyonen', speechText: 'きょねん', meaningVi: 'Năm ngoái.', translationByNative: vi('Năm ngoái.'), translations: vi('Năm ngoái.'), audioLocale: 'ja-JP' },
    { id: 'sengetsu', displayText: '先月（せんげつ）', reading: 'せんげつ', romanization: 'sengetsu', speechText: 'せんげつ', meaningVi: 'Tháng trước.', translationByNative: vi('Tháng trước.'), translations: vi('Tháng trước.'), audioLocale: 'ja-JP' },
  ],
};

export const JA_UNIT2_LESSON2 = localizeSupport(JA_UNIT2_LESSON2_SOURCE);
