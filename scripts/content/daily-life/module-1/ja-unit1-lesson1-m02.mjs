import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit1-lesson1-m02-localization.mjs';

// Daily Life / Module 2 / Unit 1 / Lesson 1 — "程度に応じたお礼の言い方"
// (Thank Someone at Different Levels / Cảm ơn theo mức độ).
// Same five_cards schema as U1 L1-L3 / U2 L1-L2. Q1-Q9 Free, Q10-Q14 Plus.
//
// NGUỒN (PHA A + PHA A', xem scripts/content/sources/INVENTORY.md mục
// "ĐO TRƯỚC KHI VIẾT — m02-u1-l1"):
//   - local-sources/ja/ban1.txt (owner xác nhận nguồn tự viết, 2026-07-30)
//     dòng 374-401 "Offering and Accepting, Thanking" — giải thích register
//     THẬT, trích nguyên văn trong comment dưới. Dòng 4975-4991 hội thoại
//     mẫu (Dialogue 2) — cả hai speaker đều nằm trong roster đã duyệt.
//   - local-sources/ja/topic1.json, topic2.json, topic3.json (owner xác
//     nhận nội dung owner tự viết + tên nhân vật đã đổi về roster
//     田中/佐藤/伊藤/先生, 2026-07-30) — mọi trích dẫn đã lọc qua
//     scripts/content/sources/ten-lech-nhan.json (không hội thoại nào dùng
//     ở đây nằm trong danh sách bị cờ).
//
// Giải thích register CHỈ mô tả cái quan sát được trong nguồn (LUẬT CHỐNG
// BẪY, owner nhắc lại 2026-07-31) — trích nguyên văn ban1.txt:
//   "Arigatou (gozaimasu) expresses thanks in general. You should never
//   use the short form with your superiors... Doumo expresses gratitude or
//   apology. It can also be combined with arigatou gozaimasu ('Thank you
//   very much') or sumimasen ('I'm very sorry'). Gozaimashita indicates
//   past and is used when the act is completed."
// Không suy ra quy tắc sinh nào ngoài câu trên — đây CHÍNH LÀ điểm mấu chốt
// "cảm ơn theo mức độ": ba trục quan sát được là (1) lịch sự/thân mật,
// (2) việc đang xảy ra/đã xong, (3) mức nhấn mạnh (どうも ghép thêm).
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
    id: 'ja-daily_life-m02-u1-l1-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    context: 'Một người quen đang giúp bạn NGAY BÂY GIỜ (việc chưa xong), trong tình huống cần lịch sự.',
    prompt: 'Một người quen đang giúp bạn NGAY BÂY GIỜ, trong tình huống cần lịch sự. Nói gì?',
    options: [option('arigatou_gozaimasu', 'ありがとうございます。'), option('arigatou_gozaimashita', 'ありがとうございました。'), option('arigatou', 'ありがとう。'), option('doumo', 'どうも。')],
    correctOptionId: 'arigatou_gozaimasu',
    feedback: { correctAnswer: 'ありがとうございます。', canonicalAnswer: 'ありがとうございます。', audioText: 'ありがとうございます', explanation: 'ありがとうございます dùng khi việc còn đang diễn ra; ありがとうございました dùng khi việc đã xong. ありがとう và どうも là thể thân mật, không hợp tình huống cần lịch sự.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    context: 'Một người bạn thân vừa giúp bạn xong, trong tình huống thân mật.',
    prompt: 'Một người bạn thân vừa giúp bạn xong, trong tình huống thân mật. Nói gì?',
    options: [option('arigatou', 'ありがとう。'), option('arigatou_gozaimasu', 'ありがとうございます。'), option('arigatou_gozaimashita', 'ありがとうございました。'), option('tasukarimashita', '助かりました。')],
    correctOptionId: 'arigatou',
    feedback: { correctAnswer: 'ありがとう。', canonicalAnswer: 'ありがとう。', audioText: 'ありがとう', explanation: 'Với bạn thân dùng thể thường ありがとう. ありがとうございます／ございました là thể lịch sự. 助かりました cũng là thể lịch sự.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với thể của nó.',
    pairs: [
      { id: 'arigatou_gozaimasu', left: { id: 'arigatou_gozaimasu_l', text: 'ありがとうございます' }, right: { id: 'arigatou_gozaimasu_r', text: 'Cảm ơn — việc đang xảy ra, lịch sự' } },
      { id: 'arigatou', left: { id: 'arigatou_l', text: 'ありがとう' }, right: { id: 'arigatou_r', text: 'Cảm ơn — thân mật' } },
      { id: 'arigatou_gozaimashita', left: { id: 'arigatou_gozaimashita_l', text: 'ありがとうございました' }, right: { id: 'arigatou_gozaimashita_r', text: 'Cảm ơn — việc đã xong, lịch sự' } },
      { id: 'doumo', left: { id: 'doumo_l', text: 'どうも' }, right: { id: 'doumo_r', text: 'Cảm ơn — thân mật, đứng riêng' } },
    ],
    feedback: { explanation: 'Cùng ý cảm ơn nhưng khác nhau ở mức lịch sự và ở việc còn đang xảy ra hay đã xong.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu cảm ơn lịch sự, nhấn mạnh.',
    tokens: [token('doumo', 'どうも'), token('arigatou', 'ありがとう'), token('gozaimasu', 'ございます'), token('un', 'うん'), token('mou', 'もう')],
    correctTokenIds: ['doumo', 'arigatou', 'gozaimasu'],
    feedback: { correctAnswer: 'どうもありがとうございます。', canonicalAnswer: 'どうもありがとうございます。', audioText: 'どうもありがとうございます', explanation: 'どうも + ありがとう + ございます → どうもありがとうございます。 うん và もう không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    context: 'Hai người bạn thân: một người vừa giúp việc nhỏ, người kia cảm ơn thân mật.',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['伊藤: 手伝いますよ。', '佐藤: {{slot_1}}。'],
    slots: [{ id: 'slot_1', answerId: 'arigatou', placeholder: '________' }],
    wordBank: [option('arigatou', 'ありがとう'), option('arigatou_gozaimashita', 'ありがとうございました'), option('tasukarimasu', '助かります')],
    feedback: { correctAnswer: 'ありがとう。', canonicalAnswer: 'ありがとう。', audioText: 'ありがとう', explanation: 'Bạn thân đáp lại bằng thể thường ありがとう, không dùng thể lịch sự.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'ありがとうございました',
    options: [option('done_polite', 'Cảm ơn — việc đã xong, lịch sự'), option('ongoing_polite', 'Cảm ơn — việc đang xảy ra, lịch sự'), option('casual', 'Cảm ơn — thân mật'), option('sorry', 'Xin lỗi')],
    correctOptionId: 'done_polite',
    feedback: { correctAnswer: 'Cảm ơn — việc đã xong, lịch sự', explanation: 'Câu nghe được là ありがとうございました — thì quá khứ nghĩa là việc đã xong.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Một người quen vừa giúp xong một việc cho bạn (việc đã hoàn tất), trong tình huống cần lịch sự.',
    prompt: 'Một người quen vừa giúp xong một việc cho bạn, trong tình huống cần lịch sự. Nói gì?',
    options: [option('arigatou_gozaimashita', 'ありがとうございました。'), option('arigatou_gozaimasu', 'ありがとうございます。'), option('arigatou', 'ありがとう。'), option('doumo', 'どうも。')],
    correctOptionId: 'arigatou_gozaimashita',
    feedback: { correctAnswer: 'ありがとうございました。', explanation: 'Việc đã xong thì dùng thì quá khứ ありがとうございました. ありがとうございます hợp khi việc còn đang xảy ra. ありがとう／どうも là thể thân mật.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    prompt: '「助かります」 dùng khi nào?',
    options: [option('being_helped_polite', 'Khi ai đó đang/sắp giúp bạn một việc, lịch sự'), option('greeting', 'Khi chào hỏi lần đầu'), option('apology', 'Khi xin lỗi'), option('farewell', 'Khi chia tay')],
    correctOptionId: 'being_helped_polite',
    feedback: { correctAnswer: 'Khi ai đó đang/sắp giúp bạn một việc, lịch sự', explanation: '助かります nghĩa là việc đó giúp ích cho bạn — nói khi ai đó đang hoặc sắp giúp bạn.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'ありがとうございます thuộc thể nào?', options: [option('polite', 'Thể lịch sự'), option('casual', 'Thể thường'), option('both', 'Cả hai như nhau'), option('none', 'Không thuộc thể nào')], correctOptionId: 'polite', feedback: { correctAnswer: 'Thể lịch sự', explanation: 'Có ございます ở cuối — dấu hiệu của thể lịch sự.' } },
      { id: 'q9_2', prompt: 'Bỏ ございます khỏi ありがとうございます thì còn gì?', options: [option('arigatou', 'ありがとう'), option('doumo', 'どうも'), option('un', 'うん'), option('hai', 'はい')], correctOptionId: 'arigatou', feedback: { correctAnswer: 'ありがとう', explanation: 'ありがとうございます → ありがとう là cặp lịch sự ↔ thân mật.' } },
      { id: 'q9_3', prompt: 'Việc đã xong, lịch sự thì nói gì?', options: [option('gozaimashita', 'ありがとうございました'), option('gozaimasu', 'ありがとうございます'), option('arigatou', 'ありがとう'), option('doumo', 'どうも')], correctOptionId: 'gozaimashita', feedback: { correctAnswer: 'ありがとうございました', explanation: 'Thì quá khứ ました đánh dấu việc đã hoàn tất.' } },
      { id: 'q9_4', prompt: 'どうもありがとうございます ghép từ mấy phần?', options: [option('three', '3 phần: どうも + ありがとう + ございます'), option('two', '2 phần'), option('one', '1 phần, không ghép được'), option('four', '4 phần')], correctOptionId: 'three', feedback: { correctAnswer: '3 phần: どうも + ありがとう + ございます', explanation: 'どうも ghép thêm vào ありがとうございます để nhấn mạnh.' } },
      { id: 'q9_5', prompt: '助かりました khác 助かります ở điểm nào?', options: [option('tense', '助かりました là việc đã xong (quá khứ)'), option('register', '助かりました lịch sự hơn'), option('meaning', 'Nghĩa hoàn toàn khác nhau'), option('none', 'Không khác gì')], correctOptionId: 'tense', feedback: { correctAnswer: '助かりました là việc đã xong (quá khứ)', explanation: 'ました đánh dấu việc đã hoàn tất, giống cặp ございます/ございました.' } },
    ],
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '14:05',
      context: 'Hai người quen nhắn tin cho nhau, cả hai đều dùng thể lịch sự: một người nhờ giúp việc, người kia đồng ý và được cảm ơn. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: '今、地図をお持ちしますね。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ slotId: 'chat_arigatou_slot' }, { displayText: '。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'これでよろしいでしょうか？' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ slotId: 'chat_tasukarimasu_slot' }, { displayText: '。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ displayText: 'どういたしまして。' }] },
      ],
    },
    slots: [
      { id: 'chat_arigatou_slot', displayText: 'ありがとうございます', canonicalText: 'ありがとうございます', audioText: 'ありがとうございます', acceptedAnswers: ['ありがとうございます'] },
      { id: 'chat_tasukarimasu_slot', displayText: '助かります', canonicalText: '助かります', audioText: 'たすかります', acceptedAnswers: ['助かります'] },
    ],
    feedback: { correctAnswer: 'ありがとうございます\n助かります', canonicalAnswer: 'ありがとうございます／助かります', audioText: 'ありがとうございます／たすかります', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_arigatou_slot: { incorrectMessage: 'Ô này đáp lại việc đang được giúp, ở thể lịch sự.', correctAnswer: 'ありがとうございます', explanation: 'Được giúp ngay lúc đó thì đáp lịch sự bằng ありがとうございます.' }, chat_tasukarimasu_slot: { incorrectMessage: 'Ô này nói việc đó giúp ích cho mình, ở thể lịch sự.', correctAnswer: '助かります', explanation: '助かります nhấn thêm rằng việc đó thực sự giúp ích.' } } },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu cảm ơn thân mật. Có thẻ không cần dùng.',
    tokens: [token('doumo', 'どうも'), token('gozaimasu_distractor', 'ございます'), token('gozaimashita_distractor', 'ございました')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'doumo', afterText: '。' },
    ],
    unusedTokenIds: ['gozaimasu_distractor', 'gozaimashita_distractor'],
    feedback: { correctAnswer: 'どうも。', canonicalAnswer: 'どうも。', audioText: 'どうも', explanation: 'どうも đứng riêng là câu cảm ơn thân mật đầy đủ. ございます／ございました là thể lịch sự, không đi cùng câu ngắn này.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', 'A: 手伝いますよ。\nB: ありがとう。'),
      option('mixed_down', 'A: ありがとうございます。\nB: どうも。'),
      option('mixed_up', 'A: 助かります。\nB: ありがとうございました。ございます。'),
      option('wrong_tense', 'A: （まだ手伝（てつだ）っていない）\nB: ありがとうございました。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: 'A: 手伝いますよ。\nB: ありがとう。', explanation: 'A tự nhiên: được giúp thì cảm ơn thân mật ngay. B lệch vì A hỏi/nói lịch sự mà B lại đáp thân mật. C thừa và ghép sai (ございました + ございます không đi cùng nhau). D sai thì: việc CHƯA xảy ra mà đã dùng quá khứ.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l1-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu cảm ơn lịch sự, việc đã xong. Có thẻ không cần dùng.',
    tokens: [token('arigatou', 'ありがとう'), token('gozaimashita', 'ございました'), token('un_distractor', 'うん'), token('gozaimasu_distractor', 'ございます')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'arigatou' },
      { id: 's2', expectedTokenId: 'gozaimashita', afterText: '。' },
    ],
    unusedTokenIds: ['un_distractor', 'gozaimasu_distractor'],
    feedback: { correctAnswer: 'ありがとうございました。', canonicalAnswer: 'ありがとうございました。', audioText: 'ありがとうございました', explanation: 'ありがとう + ございました → ありがとうございました。 うん là thể thường, ございます là việc đang xảy ra — cả hai không hợp câu này.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // BA đoạn NGUYÊN VĂN: nhóm 1 + nhóm 2 (topic3.json:524 t3-5 · ban1.txt
    // dòng 4981-4991) LẤY LẠI nguyên câu đã dùng ở Card 3; thêm 2 lượt mới
    // (topic3.json:31 t1-2) để nhóm 3 đủ ngữ cảnh trước khi vào t3-5 đã
    // dùng ở Card 3 — tổng 3 nhóm x nhiều lượt = 8 lượt, trong khoảng 6-8
    // của G14-R7 Q14.
    id: 'ja-daily_life-m02-u1-l1-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Ba cách cảm ơn khác mức độ',
    scenarioDescription: 'Vai vế: ba tình huống khác nhau — hai lần với người chưa thân (khách sạn, ngoài đường) và một lần với bạn thân. Cùng là được giúp, nhưng mức lịch sự và việc đang xảy ra hay đã xong khiến câu cảm ơn khác nhau.',
    characterIds: ['sato', 'ito', 'tanaka'],
    dialogueLines: [
      dialogueLine('ito', '今、地図をお持ちしますね。', 'いま、ちずをおもちしますね。', 'Tôi mang bản đồ tới ngay đây ạ.', 'いま、ちずをおもちしますね'),
      dialogueLine('sato', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn chị.', 'ありがとうございます'),
      dialogueLine('ito', '手伝いますよ。', 'てつだいますよ。', 'Để tôi giúp cho.', 'てつだいますよ'),
      dialogueLine('sato', 'ありがとう。', 'ありがとう。', 'Cảm ơn nhé.', 'ありがとう'),
      dialogueLine('tanaka', 'ハチ公と一緒に写真を撮ってもらえませんか？', 'ハチこうといっしょにしゃしんをとってもらえませんか？', 'Anh/chị chụp giúp tôi một tấm ảnh với tượng Hachiko được không?', 'ハチこうといっしょにしゃしんをとってもらえませんか'),
      dialogueLine('sato', 'よいですよ。シャッターはどこですか？', 'よいですよ。シャッターはどこですか？', 'Được chứ. Nút chụp ở đâu vậy?', 'よいですよ。シャッターはどこですか'),
      dialogueLine('tanaka', '右上にあります。', 'みぎうえにあります。', 'Ở phía trên bên phải.', 'みぎうえにあります'),
      dialogueLine('sato', '右上ですね。では撮りますよ。このような感じでどうですか？', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか？', 'Phía trên bên phải, rõ rồi. Tôi chụp đây. Kiểu này được không?', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか'),
      dialogueLine('tanaka', 'はい、ありがとうございました。', 'はい、ありがとうございました。', 'Vâng, cảm ơn anh/chị nhiều ạ.', 'はい、ありがとうございました'),
    ],
    sceneDividers: [
      { afterDialogueLine: 2, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
      { afterDialogueLine: 4, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
    ],
  },
];

const JA_M02_UNIT1_LESSON1_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Cảm ơn & đáp lại',
    titleByNative: vi('Cảm ơn & đáp lại'),
  },
  lesson: {
    title: 'Cảm ơn theo mức độ',
    titleByNative: vi('Cảm ơn theo mức độ'),
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
          'Cảm ơn lịch sự khi việc còn đang xảy ra bằng ありがとうございます.',
          'Cảm ơn lịch sự khi việc đã xong bằng ありがとうございました.',
          'Cảm ơn bạn bè bằng thể thường ありがとう.',
          'Cảm ơn ngắn gọn, thân mật bằng どうも.',
          'Nhấn mạnh lời cảm ơn lịch sự bằng どうもありがとうございます.',
          'Nói 助かります／助かりました khi ai đó giúp ích cho mình.',
          'Chọn đúng mức lịch sự và đúng thì (đang xảy ra hay đã xong) theo tình huống.',
        ],
        situation: [
          'Ai đó vừa giúp bạn một việc, hoặc đang giúp bạn ngay lúc này.',
          'Bạn cảm ơn theo đúng mức lịch sự và đúng thời điểm của việc đó.',
        ],
        examples: [
          { label: 'Việc đang xảy ra, lịch sự:', ...line('', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn chị.', 'ありがとうございます') },
          { label: 'Việc đã xong, lịch sự:', ...line('', 'ありがとうございました。', 'ありがとうございました。', 'Cảm ơn anh/chị nhiều ạ.', 'ありがとうございました') },
          { label: 'Với bạn thân:', ...line('', 'ありがとう。', 'ありがとう。', 'Cảm ơn nhé.', 'ありがとう') },
        ],
        importantNote: [
          'ございます nói khi việc còn đang xảy ra; ございました (thì quá khứ) nói khi việc đã xong.',
          'Bỏ ございます／ございました khỏi ありがとう thì thành thể thường, dùng với bạn bè.',
          'どうも có thể đứng riêng (thân mật) hoặc ghép trước ありがとうございます để nhấn mạnh.',
        ],
      },
      vocabularyDetails: [
        { id: 'doumo', timingAndContext: ['Cảm ơn ngắn gọn, thân mật, thường sau khi được giúp một việc nhỏ.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'どうもありがとうございます', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Cảm ơn (thân mật, ngắn gọn).', examples: [example('あ、どうも。', 'あ、どうも。', 'À, cảm ơn nhé.')] },
        { id: 'arigatou', timingAndContext: ['Cảm ơn thân mật, giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng trần này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'ありがとうございます', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Cảm ơn (thân mật).', examples: [example('ありがとう。', 'ありがとう。', 'Cảm ơn nhé.')] },
        { id: 'arigatou-gozaimasu', timingAndContext: ['Cảm ơn lịch sự khi việc còn đang xảy ra hoặc nói chung.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', 'ありがとう', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Cảm ơn (lịch sự, việc đang xảy ra).', examples: [example('ありがとうございます。', 'ありがとうございます。', 'Cảm ơn chị.')], notes: ['Khác ありがとうございました: câu này dùng khi việc CHƯA/ĐANG xảy ra, không phải đã xong.'] },
        { id: 'arigatou-gozaimashita', timingAndContext: ['Cảm ơn lịch sự khi việc đã xong, đã hoàn tất.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: ['Không dùng khi việc chưa xảy ra hoặc còn đang diễn ra.'], register: 'Lịch sự.', formal: [], casual: [], overview: 'Cảm ơn (lịch sự, việc đã xong).', examples: [example('はい、ありがとうございました。', 'はい、ありがとうございました。', 'Vâng, cảm ơn anh/chị nhiều ạ.')], notes: ['Thì quá khứ ました đánh dấu việc đã hoàn tất — khác ありがとうございます.'] },
        { id: 'doumo-arigatou-gozaimasu', timingAndContext: ['Cảm ơn lịch sự, nhấn mạnh hơn ありがとうございます thông thường.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: [], casual: [], overview: 'Cảm ơn rất nhiều (lịch sự, nhấn mạnh).', examples: [example('どうもありがとうございます。', 'どうもありがとうございます。', 'Cảm ơn cô rất nhiều ạ.')], notes: ['どうも ghép thêm vào trước ありがとうございます để nhấn mạnh — không tạo thể mới, chỉ thêm mức nhấn.'] },
        { id: 'tasukarimasu', timingAndContext: ['Nói khi ai đó đang hoặc sắp giúp ích cho mình, lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: [], casual: [], overview: 'Việc đó giúp ích cho tôi (đang/sắp xảy ra).', examples: [example('助かります。', 'たすかります。', 'Vậy thì đỡ cho tôi quá.')] },
        { id: 'tasukarimashita', timingAndContext: ['Nói khi việc giúp ích đó ĐÃ xảy ra, đã xong, lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: ['Không dùng khi việc chưa xảy ra hoặc còn đang diễn ra.'], register: 'Lịch sự.', formal: [], casual: [], overview: 'Việc đó đã giúp ích cho tôi (đã xong).', examples: [example('助かりました。', 'たすかりました。', 'Việc đó đã giúp tôi nhiều lắm.')], notes: ['Cùng cặp thì đang xảy ra/đã xong như ありがとうございます／ました.'] },
      ],
      // "Tham khảo thêm" (§B2b) — HAI TỪ ĐÃ DẠY TRƯỚC (u1-l2, u2-l1), ở đây
      // dạy CÁCH DÙNG MỚI (thuộc trục "cảm ơn theo mức độ"), không tính vào
      // ngân sách từ mới của bài này (owner chốt PHA B, mục B2).
      vocabularyReferences: [
        { term: 'すみません', reading: 'すみません', speechText: 'すみません', meaning: 'Cách dùng MỚI của từ đã học ở bài trước: cảm ơn vì đã làm phiền người khác (khác nghĩa xin lỗi đã học). ありがとうございます thuần cảm ơn; すみません pha thêm ý áy náy vì làm phiền.', register: 'Lịch sự.', example: example('すみません。', 'すみません。', 'Cảm ơn vì đã làm phiền anh/chị.') },
        { term: 'おかげさまで', reading: 'おかげさまで', speechText: 'おかげさまで', meaning: 'Cách dùng MỚI của từ đã học ở bài trước: cảm ơn tổng quát nhờ có sự giúp đỡ (khác câu đáp hỏi thăm sức khoẻ đã học). Nhấn vào công của người kia, mạnh hơn 助かりました.', register: 'Lịch sự.', example: example('おかげさまで、助かりました。', 'おかげさまで、たすかりました。', 'Nhờ anh/chị mà tôi đỡ vất vả hơn nhiều.') },
      ],
      dialogueGroups: [
        {
          id: 'polite-ongoing', title: 'Lịch sự — việc đang xảy ra', situation: 'Vai vế: khách và nhân viên khách sạn, chưa quen biết trước — quan hệ mang tính công việc nên cả hai giữ thể lịch sự. Bối cảnh: khách hỏi đường tới nhà hàng, nhân viên đang tìm bản đồ giúp khách NGAY LÚC ĐÓ (việc chưa xong).',
          lines: [
            dialogueLine('sato', 'はい。教えてください。', 'はい。おしえてください。', 'Vâng, xin chị chỉ giúp tôi.', 'はい。おしえてください'),
            dialogueLine('ito', '今、地図をお持ちしますね。', 'いま、ちずをおもちしますね。', 'Tôi mang bản đồ tới ngay đây ạ.', 'いま、ちずをおもちしますね'),
            dialogueLine('sato', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn chị.', 'ありがとうございます'),
          ],
          explanation: ['Nhân viên ĐANG đi lấy bản đồ, việc còn chưa xong — khách cảm ơn bằng ありがとうございます, không phải ありがとうございました.', 'Cả hai giữ thể lịch sự vì là quan hệ khách – nhân viên, không quen biết trước.'],
        },
        {
          id: 'casual', title: 'Thân mật', situation: 'Vai vế: khách hàng và nhân viên cửa hàng. Nhân viên luôn giữ thể lịch sự vì tính chất công việc, nhưng khách hàng có thể đáp lại bằng thể thân mật — đây là vai vế xã hội của khách hàng, không phải mức độ thân quen. Bối cảnh: nhân viên vừa đưa xong món hàng cho khách.',
          lines: [
            dialogueLine('tanaka', 'かしこまりました。こちらになります。', 'かしこまりました。こちらになります。', 'Vâng ạ, đây ạ.', 'かしこまりました。こちらになります'),
            dialogueLine('sato', 'ありがとう。', 'ありがとう。', 'Cảm ơn nhé.', 'ありがとう'),
          ],
          explanation: ['Khách hàng dùng thể thân mật ありがとう dù nhân viên vẫn giữ thể lịch sự かしこまりました.', 'Vai vế của khách hàng cho phép thân mật hơn, khác với vai vế ngang hàng đã học ở bài trước.'],
        },
        {
          id: 'polite-done', title: 'Lịch sự — việc đã xong', situation: 'Vai vế: hai người ngang vai trong chuyến du lịch, giữ thể lịch sự — theo logic đã dùng ở các bài trước (thể lịch sự quan sát được ⇒ chưa đủ thân để chuyển sang thể thường). Bối cảnh: một người vừa nhờ người kia chụp ảnh xong.',
          lines: [
            dialogueLine('tanaka', '右上にあります。', 'みぎうえにあります。', 'Ở phía trên bên phải.', 'みぎうえにあります'),
            dialogueLine('sato', '右上ですね。では撮りますよ。このような感じでどうですか？', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか？', 'Phía trên bên phải, rõ rồi. Tôi chụp đây. Kiểu này được không?', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか'),
            dialogueLine('tanaka', 'はい、ありがとうございました。', 'はい、ありがとうございました。', 'Vâng, cảm ơn anh/chị nhiều ạ.', 'はい、ありがとうございました'),
          ],
          explanation: ['Ảnh đã chụp XONG nên 田中 cảm ơn bằng ありがとうございました (thì quá khứ), không phải ありがとうございます.', 'Cùng là thể lịch sự nhưng khác nhóm đầu ở chỗ việc đã hoàn tất.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'ありがとう ↔ ありがとうございます', formula: 'ありがとう ＋ ございます', formulaReading: 'ありがとう ＋ ございます', meaning: 'Cùng lời cảm ơn, hai thể.',
          examples: [example('ありがとうございます。', 'ありがとうございます。', 'Cảm ơn chị.'), example('ありがとう。', 'ありがとう。', 'Cảm ơn nhé.')],
          explanation: ['Thêm ございます ở cuối là thể lịch sự; bỏ đi là thể thường.'],
        },
        {
          title: 'ありがとうございます ↔ ありがとうございました', formula: 'ありがとうございます ／ ありがとうございました', formulaReading: 'ありがとうございます ／ ありがとうございました', meaning: 'Cùng lời cảm ơn lịch sự, khác ở việc đang xảy ra hay đã xong.',
          examples: [example('ありがとうございます。', 'ありがとうございます。', 'Cảm ơn chị.'), example('ありがとうございました。', 'ありがとうございました。', 'Cảm ơn anh/chị nhiều ạ.')],
          explanation: ['ございます dùng khi việc còn đang xảy ra; ございました (thì quá khứ) dùng khi việc đã xong.'],
        },
        {
          title: 'どうも (đứng riêng)', formula: 'どうも', formulaReading: 'どうも', meaning: 'Cảm ơn ngắn gọn, thân mật, đứng một mình.',
          examples: [example('あ、どうも。', 'あ、どうも。', 'À, cảm ơn nhé.')],
          explanation: ['どうも có thể đứng riêng làm câu cảm ơn đầy đủ, không cần thêm từ khác.'],
        },
        {
          title: 'どうも ＋ ありがとうございます → どうもありがとうございます', formula: 'どうも ＋ ありがとうございます', formulaReading: 'どうも ＋ ありがとうございます', meaning: 'Ghép どうも vào trước câu cảm ơn lịch sự để nhấn mạnh.',
          examples: [example('どうもありがとうございます。', 'どうもありがとうございます。', 'Cảm ơn cô rất nhiều ạ.')],
          explanation: ['どうも ghép thêm vào KHÔNG đổi thể của ありがとうございます, chỉ thêm mức nhấn mạnh.'],
        },
        {
          title: '助かります ↔ 助かりました', formula: '助（たす）かります ／ 助（たす）かりました', formulaReading: 'たすかります ／ たすかりました', meaning: 'Cùng ý việc đó giúp ích, khác ở việc đang xảy ra hay đã xong.',
          examples: [example('助かります。', 'たすかります。', 'Vậy thì đỡ cho tôi quá.'), example('助かりました。', 'たすかりました。', 'Việc đó đã giúp tôi nhiều lắm.')],
          explanation: ['Cùng cơ chế với ありがとうございます／ました: ます là đang xảy ra, ました là đã xong.'],
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
    { id: 'doumo', displayText: 'どうも', reading: 'どうも', romanization: 'doumo', speechText: 'どうも', meaningVi: 'Cảm ơn (thân mật, ngắn gọn).', translationByNative: vi('Cảm ơn (thân mật, ngắn gọn).'), translations: vi('Cảm ơn (thân mật, ngắn gọn).'), audioLocale: 'ja-JP' },
    { id: 'arigatou', displayText: 'ありがとう', reading: 'ありがとう', romanization: 'arigatou', speechText: 'ありがとう', meaningVi: 'Cảm ơn (thân mật).', translationByNative: vi('Cảm ơn (thân mật).'), translations: vi('Cảm ơn (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'arigatou-gozaimasu', displayText: 'ありがとうございます', reading: 'ありがとうございます', romanization: 'arigatou gozaimasu', speechText: 'ありがとうございます', meaningVi: 'Cảm ơn (lịch sự, việc đang xảy ra).', translationByNative: vi('Cảm ơn (lịch sự, việc đang xảy ra).'), translations: vi('Cảm ơn (lịch sự, việc đang xảy ra).'), audioLocale: 'ja-JP' },
    { id: 'arigatou-gozaimashita', displayText: 'ありがとうございました', reading: 'ありがとうございました', romanization: 'arigatou gozaimashita', speechText: 'ありがとうございました', meaningVi: 'Cảm ơn (lịch sự, việc đã xong).', translationByNative: vi('Cảm ơn (lịch sự, việc đã xong).'), translations: vi('Cảm ơn (lịch sự, việc đã xong).'), audioLocale: 'ja-JP' },
    { id: 'doumo-arigatou-gozaimasu', displayText: 'どうもありがとうございます', reading: 'どうもありがとうございます', romanization: 'doumo arigatou gozaimasu', speechText: 'どうもありがとうございます', meaningVi: 'Cảm ơn rất nhiều (lịch sự, nhấn mạnh).', translationByNative: vi('Cảm ơn rất nhiều (lịch sự, nhấn mạnh).'), translations: vi('Cảm ơn rất nhiều (lịch sự, nhấn mạnh).'), audioLocale: 'ja-JP' },
    { id: 'tasukarimasu', displayText: '助（たす）かります', reading: 'たすかります', romanization: 'tasukarimasu', speechText: 'たすかります', meaningVi: 'Việc đó giúp ích cho tôi (đang/sắp xảy ra).', translationByNative: vi('Việc đó giúp ích cho tôi (đang/sắp xảy ra).'), translations: vi('Việc đó giúp ích cho tôi (đang/sắp xảy ra).'), audioLocale: 'ja-JP' },
    { id: 'tasukarimashita', displayText: '助（たす）かりました', reading: 'たすかりました', romanization: 'tasukarimashita', speechText: 'たすかりました', meaningVi: 'Việc đó đã giúp ích cho tôi (đã xong).', translationByNative: vi('Việc đó đã giúp ích cho tôi (đã xong).'), translations: vi('Việc đó đã giúp ích cho tôi (đã xong).'), audioLocale: 'ja-JP' },
  ],
};

export const JA_M02_UNIT1_LESSON1 = localizeSupport(JA_M02_UNIT1_LESSON1_SOURCE);
