import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit1-lesson2-m02-localization.mjs';

// Daily Life / Module 2 / Unit 1 / Lesson 2 — "お礼を言われたときの返事"
// (Reply When Someone Thanks You / Đáp khi được cảm ơn).
// Same five_cards schema as U1 L1-L3 / U2 L1-L2 / m02-u1-l1. Q1-Q9 Free,
// Q10-Q14 Plus.
//
// NGUỒN (PHA A, /build-lesson, xem scripts/content/sources/INVENTORY.md
// mục "ĐO TRƯỚC KHI VIẾT — m02-u1-l2" + scripts/content/sources/scan/
// ja-daily_life-m02-u1-l2.scan.json cho toàn bộ kết quả quét CÂN NGUỒN):
//   - local-sources/ja/topic2.json dialogue_id 502 (turns 6-8) và 575
//     (turns 5-8) — hội thoại thật, roster gốc đã là 田中/佐藤/伊藤 (không cần
//     đổi tên).
//   - local-sources/ja/topic3.json dialogue_id 31 (turns 3-6) — NỐI TIẾP
//     đoạn đã dùng ở Q14/dialogueGroup 'polite-done' của m02-u1-l1 (turns
//     1-5 của CÙNG hội thoại này); turns 3-5 khai from_lesson trỏ về
//     m02-u1-l1, turn 6 (どういたしまして) là verbatim MỚI, topic3.json:1191.
//   - local-sources/ja/ban1.txt:448 (どういたしまして) — owner xác nhận nguồn
//     tự viết, 2026-07-30.
//   - local-sources/ja/irodori/markdown/IRODORI_So_cap_1_A2.md:23239-23243
//     — cụm こちらこそ + お世話になっています (KHÔNG dùng nguyên nhân vật gốc
//     トアン/福田 — đó không thuộc roster đã duyệt của khoá này; trích Ở MỨC
//     TOKEN hai cụm rồi ghép vào lời thoại roster 田中/伊藤, xem dialogueGroups
//     nhóm 3 + provenance `token:true`).
//   - New Tài liệu văn bản.txt (敬語の指針, văn bản chính thức 文化審議会答申)
//     dòng 2236/2246 — giải thích register とんでもない/とんでもございません.
//
// CÂN NGUỒN (G14-R3b, owner chốt 2026-08-01): mọi nguồn coHang=true trong
// scan.json đều đóng góp câu mẹ ở bài này — xem BẢNG CÂN NGUỒN trong báo cáo
// cuối lượt, không lặp lại ở đây.
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
    id: 'ja-daily_life-m02-u1-l2-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    context: 'Một người bạn thân vừa giúp bạn một việc nhỏ và bạn cảm ơn. Người đó đáp lại thế nào (thân mật)?',
    prompt: 'Một người bạn thân vừa giúp bạn một việc nhỏ và bạn cảm ơn. Người đó đáp lại thế nào (thân mật)?',
    options: [option('ieie', 'いえいえ。'), option('douitashimashite', 'どういたしまして。'), option('tondemogozaimasen', 'とんでもございません。'), option('oyakunitatete', 'お役に立てて良かったです。')],
    correctOptionId: 'ieie',
    feedback: { correctAnswer: 'いえいえ。', canonicalAnswer: 'いえいえ。', audioText: 'いえいえ', explanation: 'いえいえ là thể thân mật, hợp với bạn thân. どういたしまして／とんでもございません là thể lịch sự, không hợp bạn thân. お役に立てて良かったです cũng lịch sự và dài hơn mức cần cho một việc nhỏ giữa bạn bè.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    context: 'Đồng nghiệp chưa thân vừa cảm ơn bạn vì một việc bình thường (không phải lời khen). Bạn đáp lại thế nào (lịch sự)?',
    prompt: 'Đồng nghiệp chưa thân vừa cảm ơn bạn vì một việc bình thường (không phải lời khen). Bạn đáp lại thế nào (lịch sự)?',
    options: [option('douitashimashite', 'どういたしまして。'), option('ieie', 'いえいえ。'), option('tondemonai', 'とんでもない。'), option('kininai', '気にしないでください。')],
    correctOptionId: 'douitashimashite',
    feedback: { correctAnswer: 'どういたしまして。', canonicalAnswer: 'どういたしまして。', audioText: 'どういたしまして', explanation: 'どういたしまして đúng cả về mức lịch sự lẫn tình huống (đáp lại lời cảm ơn bình thường). いえいえ／とんでもない là thể thân mật, sai trục lịch sự. 気にしないでください dùng khi có phiền phức cụ thể, không phải câu đáp chung cho lời cảm ơn.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với cách dùng của nó.',
    pairs: [
      { id: 'douitashimashite', left: { id: 'douitashimashite_l', text: 'どういたしまして' }, right: { id: 'douitashimashite_r', text: 'Đáp lại lời cảm ơn — lịch sự, chung chung' } },
      { id: 'ieie', left: { id: 'ieie_l', text: 'いえいえ' }, right: { id: 'ieie_r', text: 'Đáp lại lời cảm ơn — thân mật' } },
      { id: 'tondemogozaimasen', left: { id: 'tondemogozaimasen_l', text: 'とんでもございません' }, right: { id: 'tondemogozaimasen_r', text: 'Khiêm tốn từ chối lời khen — lịch sự' } },
      { id: 'kininaide', left: { id: 'kininaide_l', text: '気にしないでください' }, right: { id: 'kininaide_r', text: 'Trấn an đừng bận tâm — lịch sự' } },
    ],
    feedback: { explanation: 'Bốn câu cùng thuộc nhóm "đáp lễ" nhưng khác nhau ở mức lịch sự và điều được đáp lại: lời cảm ơn, lời khen, hay một chút phiền phức.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu trấn an lịch sự.',
    tokens: [token('kini', '気に'), token('shinaide', 'しないで'), token('kudasai', 'ください'), token('gozaimasen', 'ございません'), token('yokatta', '良かった')],
    correctTokenIds: ['kini', 'shinaide', 'kudasai'],
    feedback: { correctAnswer: '気にしないでください。', canonicalAnswer: '気にしないでください。', audioText: 'きにしないでください', explanation: '気に + しないで + ください → 気にしないでください。 ございません／良かった là mảnh của とんでもございません／お役に立てて良かったです, không thuộc câu này.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    context: 'Vai vế: hai bạn học, 田中 vừa nhờ 佐藤 cho mượn tài liệu và cảm ơn bằng thể lịch sự, nhưng 佐藤 đáp lại thân mật (giống mẫu vai vế đã học ở dialogueGroup 1) — điền đúng câu 佐藤 THẬT đã nói.',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['田中: それは助かります。どうもありがとうございます。', '佐藤: {{slot_1}}'],
    slots: [{ id: 'slot_1', answerId: 'ieie', placeholder: '________' }],
    wordBank: [option('ieie', 'いえいえ、お安い御用ですよ。'), option('douitashimashite', 'どういたしまして。'), option('tondemogozaimasen', 'とんでもございません。')],
    feedback: { correctAnswer: 'いえいえ、お安い御用ですよ。', canonicalAnswer: 'いえいえ、お安い御用ですよ。', audioText: 'いえいえ、おやすいごようですよ', explanation: '佐藤 đáp lại thân mật bằng いえいえ dù 田中 vừa nói lịch sự — đúng vai vế đã thiết lập ở dialogueGroup 1. どういたしまして／とんでもございません đều là thể lịch sự, không khớp câu佐藤 thật đã nói.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'とんでもございません',
    options: [option('deflect_polite', 'Khiêm tốn từ chối lời khen, lịch sự'), option('reply_polite', 'Đáp lại lời cảm ơn, lịch sự'), option('reassure', 'Trấn an đừng bận tâm'), option('glad_helped', 'Vui vì đã giúp được')],
    correctOptionId: 'deflect_polite',
    feedback: { correctAnswer: 'Khiêm tốn từ chối lời khen, lịch sự', explanation: 'Câu nghe được là とんでもございません — dùng khi khiêm tốn từ chối lời khen, không phải câu đáp chung cho lời cảm ơn.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Thầy/cô vừa khen bạn làm bài tốt (không phải cảm ơn vì việc gì). Bạn khiêm tốn đáp lại thế nào (lịch sự)?',
    prompt: 'Thầy/cô vừa khen bạn làm bài tốt (không phải cảm ơn vì việc gì). Bạn khiêm tốn đáp lại thế nào (lịch sự)?',
    options: [option('tondemogozaimasen', 'とんでもございません。'), option('douitashimashite', 'どういたしまして。'), option('ieie', 'いえいえ。'), option('kininaide', '気にしないでください。')],
    correctOptionId: 'tondemogozaimasen',
    feedback: { correctAnswer: 'とんでもございません。', explanation: 'とんでもございません đúng chức năng (đáp lại lời KHEN, không phải lời cảm ơn cụ thể). どういたしまして đáp lại lời CẢM ƠN, không phải lời khen. いえいえ sai cả trục lịch sự lẫn chức năng. 気にしないでください dùng khi có phiền phức, không phải khi được khen.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    context: 'Bạn vô tình làm phiền một chút (đến muộn), người kia nói không sao. Bạn muốn nói người đó đừng bận tâm (lịch sự). Nói gì?',
    prompt: 'Bạn vô tình làm phiền một chút (đến muộn), người kia nói không sao. Bạn muốn nói người đó đừng bận tâm (lịch sự). Nói gì?',
    options: [option('kininaide', '気にしないでください。'), option('tondemogozaimasen', 'とんでもございません。'), option('douitashimashite', 'どういたしまして。'), option('oyakunitatete', 'お役に立てて良かったです。')],
    correctOptionId: 'kininaide',
    feedback: { correctAnswer: '気にしないでください。', explanation: '気にしないでください đúng chức năng (có phiền phức cụ thể, muốn người kia đừng bận tâm). とんでもございません dùng khi khiêm tốn từ chối KHEN, không phải trấn an. どういたしまして đáp lại lời cảm ơn, không phải trấn an. お役に立てて良かったです là câu MÌNH nói khi MÌNH giúp được — ở đây bạn là người gây phiền, không phải người giúp.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'どういたしまして thuộc thể nào?', options: [option('polite', 'Thể lịch sự'), option('casual', 'Thể thường'), option('both', 'Cả hai như nhau'), option('none', 'Không thuộc thể nào')], correctOptionId: 'polite', feedback: { correctAnswer: 'Thể lịch sự', explanation: 'Đây là câu đáp lịch sự tiêu chuẩn, dùng chung cho hầu hết mọi lời cảm ơn.' } },
      { id: 'q9_2', prompt: 'Bỏ ございません khỏi とんでもございません thì gần nghĩa với cụm nào?', options: [option('tondemonai', 'とんでもない'), option('douitashimashite', 'どういたしまして'), option('ieie', 'いえいえ'), option('kininaide', '気にしないでください')], correctOptionId: 'tondemonai', feedback: { correctAnswer: 'とんでもない', explanation: 'とんでもない → とんでもございません là cặp lịch sự ↔ thân mật, cùng ý khiêm tốn từ chối lời khen.' } },
      { id: 'q9_3', prompt: 'Được KHEN (không phải được cảm ơn vì một việc cụ thể) thì khiêm tốn đáp bằng gì, lịch sự?', options: [option('tondemogozaimasen', 'とんでもございません'), option('douitashimashite', 'どういたしまして'), option('ieie', 'いえいえ'), option('kininaide', '気にしないでください')], correctOptionId: 'tondemogozaimasen', feedback: { correctAnswer: 'とんでもございません', explanation: 'とんでもございません dùng đúng khi lời khen có vẻ quá lời; どういたしまして／いえいえ dùng cho lời CẢM ƠN, không phải lời KHEN; 気にしないでください dùng khi có phiền phức, không phải khi được khen.' } },
      { id: 'q9_4', prompt: 'お役に立てて良かったです dùng khi nào, lịch sự?', options: [option('helped', 'Khi mình vừa giúp được việc gì đó cho người khác'), option('was_helped', 'Khi mình vừa được người khác giúp'), option('apology', 'Khi mình xin lỗi vì đã làm phiền'), option('farewell', 'Khi mình chào tạm biệt')], correctOptionId: 'helped', feedback: { correctAnswer: 'Khi mình vừa giúp được việc gì đó cho người khác', explanation: 'Đây là câu MÌNH nói khi MÌNH giúp được người khác, không phải câu đáp khi được người khác giúp.' } },
      { id: 'q9_5', prompt: 'こちらこそ ở bài này khác こちらこそ đã học ở bài chào hỏi thế nào?', options: [option('reciprocate_gratitude', 'Đáp lễ khi được bày tỏ lòng biết ơn, không phải đáp lễ lời chào よろしくお願いします'), option('same', 'Hai cách dùng giống hệt nhau, không có gì khác'), option('strangers_only', 'Chỉ dùng được với người lạ'), option('farewell_only', 'Chỉ dùng được khi chia tay')], correctOptionId: 'reciprocate_gratitude', feedback: { correctAnswer: 'Đáp lễ khi được bày tỏ lòng biết ơn, không phải đáp lễ lời chào よろしくお願いします', explanation: 'こちらこそ luôn mang nghĩa gốc "đáp lễ" nhưng ĐIỀU ĐƯỢC ĐÁP LỄ khác nhau theo tình huống — lời chào hay lời cảm ơn.' } },
    ],
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '16:20',
      context: 'Hai đồng nghiệp nhắn tin: một người vừa giúp việc, người kia cảm ơn và được đáp lại lịch sự. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: '明日（あした）にでも、実験結果（じっけんけっか）をまとめたレポートを貸（か）しましょうか？' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ displayText: 'それは助かります。' }, { slotId: 'chat_douitashimashite_setup_slot' }, { displayText: '。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ slotId: 'chat_oyakunitatete_slot' }, { displayText: '。' }] },
      ],
    },
    slots: [
      { id: 'chat_douitashimashite_setup_slot', displayText: 'どうもありがとうございます', canonicalText: 'どうもありがとうございます', audioText: 'どうもありがとうございます', acceptedAnswers: ['どうもありがとうございます'] },
      { id: 'chat_oyakunitatete_slot', displayText: 'お役に立てて良かったです', canonicalText: 'お役に立てて良かったです', audioText: 'おやくにたててよかったです', acceptedAnswers: ['お役に立てて良かったです'] },
    ],
    feedback: { correctAnswer: 'どうもありがとうございます\nお役に立てて良かったです', canonicalAnswer: 'どうもありがとうございます／お役に立てて良かったです', audioText: 'どうもありがとうございます／おやくにたててよかったです', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_douitashimashite_setup_slot: { incorrectMessage: 'Ô này cảm ơn lịch sự, nhấn mạnh.', correctAnswer: 'どうもありがとうございます', explanation: 'Nhắc lại mẫu cảm ơn lịch sự đã học ở bài trước, để có lời cảm ơn cho B đáp lại.' }, chat_oyakunitatete_slot: { incorrectMessage: 'Ô này bày tỏ vui vì đã giúp được, lịch sự.', correctAnswer: 'お役に立てて良かったです', explanation: 'A vừa giúp (cho mượn báo cáo) nên đáp lại bằng câu bày tỏ niềm vui đã giúp được, không phải どういたしまして (câu đó dành cho B, người ĐƯỢC giúp).' } } },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu đáp lại lời cảm ơn thân mật. Có thẻ không cần dùng.',
    tokens: [token('ieie', 'いえいえ'), token('gozaimasen_distractor', 'ございません'), token('yokatta_distractor', '良かったです')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'ieie', afterText: '。' },
    ],
    unusedTokenIds: ['gozaimasen_distractor', 'yokatta_distractor'],
    feedback: { correctAnswer: 'いえいえ。', canonicalAnswer: 'いえいえ。', audioText: 'いえいえ', explanation: 'いえいえ đứng riêng là câu đáp thân mật đầy đủ. ございません／良かったです là mảnh của とんでもございません／お役に立てて良かったです, không đi cùng câu ngắn này.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', 'A: どうもありがとうございます。\nB: どういたしまして。'),
      option('register_mismatch', 'A: ありがとう。\nB: とんでもございません。'),
      option('malformed', 'A: 助かります。\nB: いえいえ、とんでもございませんです。'),
      option('wrong_function', 'A: （とても上手（じょうず）ですね！）\nB: どういたしまして。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: 'A: どうもありがとうございます。\nB: どういたしまして。', explanation: 'A tự nhiên: lời cảm ơn lịch sự được đáp lại lịch sự, đúng chức năng. B lệch trục lịch sự: A nói thân mật mà B lại đáp quá trang trọng. C ghép sai (ございませんです không tồn tại — とんでもございません đã đủ lịch sự, không thêm です). D sai chức năng: lời trong ngoặc là LỜI KHEN, nhưng どういたしまして chỉ đáp lại lời CẢM ƠN.' },
  },
  {
    id: 'ja-daily_life-m02-u1-l2-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu bày tỏ vui vì đã giúp được, lịch sự. Có thẻ không cần dùng.',
    tokens: [token('oyakunitatete', 'お役に立てて'), token('yokatta', '良かった'), token('desu', 'です'), token('gozaimasen_distractor', 'ございません'), token('kininaide_distractor', '気にしないで')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'oyakunitatete' },
      { id: 's2', expectedTokenId: 'yokatta' },
      { id: 's3', expectedTokenId: 'desu', afterText: '。' },
    ],
    unusedTokenIds: ['gozaimasen_distractor', 'kininaide_distractor'],
    feedback: { correctAnswer: 'お役に立てて良かったです。', canonicalAnswer: 'お役に立てて良かったです。', audioText: 'おやくにたててよかったです', explanation: 'お役に立てて + 良かった + です → お役に立てて良かったです。 ございません là mảnh của とんでもございません, 気にしないで là mảnh của 気にしないでください — cả hai không thuộc câu này.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // Nối tiếp CHÍNH đoạn topic3.json:31 đã dùng ở Q14 m02-u1-l1 (turns 1-5,
    // from_lesson) — thêm turn 6 (どういたしまして, verbatim MỚI, dòng 1191)
    // rồi mở rộng bằng một lượt cảm ơn+đáp khác (topic2.json dialogue 575,
    // verbatim) để đủ 6-8 lượt theo G14-R7.
    id: 'ja-daily_life-m02-u1-l2-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Đáp lại lời cảm ơn trong hai tình huống',
    scenarioDescription: 'Vai vế: nối tiếp bài trước (chuyến du lịch, hai người ngang vai, lịch sự) rồi chuyển sang một tình huống khác (bạn học giúp tìm đồ, lịch sự vì chưa thân). Cùng là đáp lại lời cảm ơn lịch sự, nhưng câu đáp chuẩn dùng chung được cho cả hai, không cần nêu cụ thể đã giúp gì.',
    characterIds: ['tanaka', 'sato', 'ito'],
    dialogueLines: [
      dialogueLine('tanaka', 'ハチ公と一緒に写真を撮ってもらえませんか？', 'ハチこうといっしょにしゃしんをとってもらえませんか？', 'Anh/chị chụp giúp tôi một tấm ảnh với tượng Hachiko được không?', 'ハチこうといっしょにしゃしんをとってもらえませんか'),
      dialogueLine('sato', 'よいですよ。シャッターはどこですか？', 'よいですよ。シャッターはどこですか？', 'Được chứ. Nút chụp ở đâu vậy?', 'よいですよ。シャッターはどこですか'),
      dialogueLine('tanaka', '右上にあります。', 'みぎうえにあります。', 'Ở phía trên bên phải.', 'みぎうえにあります'),
      dialogueLine('sato', '右上ですね。では撮りますよ。このような感じでどうですか？', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか？', 'Phía trên bên phải, rõ rồi. Tôi chụp đây. Kiểu này được không?', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか'),
      dialogueLine('tanaka', 'はい、ありがとうございました。', 'はい、ありがとうございました。', 'Vâng, cảm ơn anh/chị nhiều ạ.', 'はい、ありがとうございました'),
      dialogueLine('sato', 'どういたしまして。', 'どういたしまして。', 'Không có gì đâu.', 'どういたしまして'),
      dialogueLine('sato', 'あ、見つけました。私の足元にありましたよ。', 'あ、みつけました。わたしのあしもとにありましたよ。', 'À, tìm thấy rồi. Nó ở dưới chân tôi này.', 'あ、みつけました。わたしのあしもとにありましたよ'),
      dialogueLine('ito', 'どうもありがとうございます。', 'どうもありがとうございます。', 'Cảm ơn chị nhiều ạ.', 'どうもありがとうございます'),
      dialogueLine('sato', 'どういたしまして。', 'どういたしまして。', 'Không có gì đâu.', 'どういたしまして'),
    ],
    sceneDividers: [
      { afterDialogueLine: 6, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
    ],
  },
];

const JA_M02_UNIT1_LESSON2_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Cảm ơn & đáp lại',
    titleByNative: vi('Cảm ơn & đáp lại'),
  },
  lesson: {
    title: 'Đáp khi được cảm ơn',
    titleByNative: vi('Đáp khi được cảm ơn'),
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
          'Đáp lại lời cảm ơn một cách lịch sự bằng どういたしまして.',
          'Đáp lại lời cảm ơn một cách thân mật, giản dị bằng いえいえ.',
          'Khiêm tốn từ chối lời khen bằng とんでもございません.',
          'Trấn an người khác rằng không cần bận tâm bằng 気にしないでください.',
          'Bày tỏ vui vì đã giúp được bằng お役に立てて良かったです.',
          'Dùng こちらこそ để đáp lễ khi ai đó bày tỏ lòng biết ơn với mình — cách dùng khác của từ đã học ở bài chào hỏi.',
          'Chọn đúng cách đáp theo mức lịch sự và lý do được cảm ơn.',
        ],
        situation: [
          'Ai đó vừa cảm ơn bạn, hoặc bày tỏ lòng biết ơn với bạn.',
          'Bạn đáp lại theo đúng mức lịch sự và đúng lý do được cảm ơn.',
        ],
        examples: [
          { label: 'Lịch sự, chung chung:', ...line('', 'どういたしまして。', 'どういたしまして。', 'Không có gì đâu.', 'どういたしまして') },
          { label: 'Thân mật:', ...line('', 'いえいえ。', 'いえいえ。', 'Không sao mà.', 'いえいえ') },
          { label: 'Khi mình vừa giúp được việc:', ...line('', 'お役に立てて良かったです。', 'おやくにたててよかったです。', 'Tôi vui vì đã giúp được ạ.', 'おやくにたててよかったです') },
        ],
        importantNote: [
          'どういたしまして dùng chung, không nói cụ thể vì sao được cảm ơn.',
          'とんでもございません dùng khi lời khen/cảm ơn có vẻ quá lời — bạn khiêm tốn từ chối.',
          '気にしないでください dùng khi có chút phiền phức mà bạn muốn người kia đừng bận tâm.',
        ],
      },
      vocabularyDetails: [
        { id: 'douitashimashite', timingAndContext: ['Đáp lại lời cảm ơn một cách lịch sự, không nói rõ vì sao.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', 'いえいえ', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Đáp lại lời cảm ơn (lịch sự, chung chung).', examples: [example('どういたしまして。', 'どういたしまして。', 'Không có gì đâu.')] },
        { id: 'ieie', timingAndContext: ['Đáp lại lời cảm ơn một cách thân mật, giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'どういたしまして', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Đáp lại lời cảm ơn (thân mật).', examples: [example('いえいえ、お安い御用ですよ。', 'いえいえ、おやすいごようですよ。', 'Không sao, chuyện nhỏ mà.'), example('いえいえ、まだまだです。', 'いえいえ、まだまだです。', 'Đâu có, còn kém lắm.'), example('いえいえ、内山（うちやま）さんの頑張（がんば）りのおかげですよ。', 'いえいえ、うちやまさんのがんばりのおかげですよ。', 'Không có gì đâu, đó là nhờ chị Uchiyama đã cố gắng thôi.')] },
        { id: 'tondemonai', timingAndContext: ['Nhẹ nhàng từ chối lời khen hoặc lời cảm ơn quá lời, thân mật.'], appropriateFor: ['Bạn bè', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', 'とんでもございません', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Từ chối lời khen/cảm ơn quá lời (thân mật).', examples: [example('とんでもない', 'とんでもない', 'Đâu có, có gì đâu.')] },
        { id: 'tondemogozaimasen', timingAndContext: ['Khiêm tốn từ chối lời khen hoặc lời cảm ơn quá lời, lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: [], casual: ['Cách thân mật chuẩn:', 'とんでもない', 'Dùng với:', 'Bạn bè', 'Người ngang hàng đã thân'], overview: 'Từ chối lời khen/cảm ơn quá lời (lịch sự).', examples: [example('とんでもございません', 'とんでもございません', 'Đâu có ạ, không có gì đâu ạ.')], notes: ['とんでもない vốn là MỘT tính từ trọn vẹn, nên とんでもございません (đổi phần ない) tuy phổ biến nhưng bị coi là chưa chuẩn; dạng CHUẨN là とんでもないです／とんでもないことでございます.'] },
        { id: 'kininaide', timingAndContext: ['Trấn an người khác rằng một chút phiền phức không đáng bận tâm.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: [], casual: [], overview: 'Đừng bận tâm về việc đó (lịch sự).', examples: [example('気にしないでください。', 'きにしないでください。', 'Xin đừng bận tâm ạ.')] },
        { id: 'oyakunitatete', timingAndContext: ['Bày tỏ niềm vui vì vừa giúp được ai đó việc gì, lịch sự.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: ['Không dùng khi bản thân vừa được người khác giúp — đây là câu MÌNH nói khi MÌNH giúp được người khác.'], register: 'Lịch sự.', formal: [], casual: [], overview: 'Vui vì đã giúp được (lịch sự).', examples: [example('お役に立てて良かったです。', 'おやくにたててよかったです。', 'Tôi vui vì đã giúp được ạ.')] },
      ],
      // "Tham khảo thêm" (§B2b) — こちらこそ ĐÃ DẠY TRƯỚC (Golden L1), ở đây
      // dạy CÁCH DÙNG MỚI (đáp lễ lòng biết ơn, không phải đáp lễ lời chào),
      // không tính vào ngân sách từ mới của bài này (owner chốt PHA B).
      vocabularyReferences: [
        { term: 'こちらこそ', reading: 'こちらこそ', speechText: 'こちらこそ', meaning: 'Cách dùng MỚI của từ đã học ở bài chào hỏi: đáp lễ khi ai đó bày tỏ lòng biết ơn với mình, không chỉ dùng khi đáp lễ よろしくお願いします. Khác どういたしまして／いえいえ ở chỗ: こちらこそ ngụ ý "chính TÔI mới là người phải cảm ơn/mang ơn BẠN".', register: 'Lịch sự.', example: example('こちらこそ、お世話になっています。', 'こちらこそ、おせわになっています。', 'Không, chính tôi mới là người phải cảm ơn anh/chị.') },
        { term: 'こちらこそよろしく', reading: 'こちらこそよろしく', speechText: 'こちらこそよろしく', meaning: 'Đối chiếu: đây LÀ cách dùng こちらこそ đã học ở bài chào hỏi (đáp lễ よろしくお願いします) — khác với cách dùng MỚI ở bài này (đáp lễ lòng biết ơn お世話になっています, không có よろしく).', register: 'Trang trọng.', example: example('こちらこそよろしく。', 'こちらこそよろしく。', 'Chính tôi mới là người phải nhờ anh/chị giúp đỡ.') },
      ],
      dialogueGroups: [
        {
          id: 'lost-eraser-help', title: 'Lịch sự — được giúp tìm đồ', situation: 'Vai vế: hai bạn học cùng lớp, chưa thân — giữ thể lịch sự. Bối cảnh: 佐藤 làm rơi cục tẩy, 伊藤 giúp tìm và tìm thấy.',
          lines: [
            dialogueLine('sato', 'すみません。', 'すみません。', 'Phiền chị quá.', 'すみません'),
            dialogueLine('ito', 'あ、見つけました。私の足元にありましたよ。', 'あ、みつけました。わたしのあしもとにありましたよ。', 'À, tìm thấy rồi. Nó ở dưới chân tôi này.', 'あ、みつけました。わたしのあしもとにありましたよ'),
            dialogueLine('sato', 'どうもありがとうございます。', 'どうもありがとうございます。', 'Cảm ơn chị nhiều ạ.', 'どうもありがとうございます'),
            dialogueLine('ito', 'どういたしまして。', 'どういたしまして。', 'Không có gì đâu.', 'どういたしまして'),
          ],
          explanation: ['どういたしまして là câu đáp lịch sự tiêu chuẩn, dùng được cho hầu hết mọi lời cảm ơn, không cần nêu cụ thể.', 'Cả hai giữ thể lịch sự vì là bạn học chưa thân.'],
        },
        {
          id: 'photo-help-done', title: 'Lịch sự — việc đã xong (nối tiếp bài trước)', situation: 'Vai vế: như đã thiết lập ở bài trước (m02-u1-l1) — hai người ngang vai trong chuyến du lịch, giữ thể lịch sự. Bối cảnh: nối tiếp NGAY SAU đoạn đã học ở bài trước, bắt đầu từ lượt nhận lời chụp — 佐藤 vừa chụp ảnh xong cho 田中, được cảm ơn, và LẦN NÀY đáp lại どういたしまして (câu đáp còn thiếu ở bài trước).',
          lines: [
            dialogueLine('sato', 'よいですよ。シャッターはどこですか？', 'よいですよ。シャッターはどこですか？', 'Được chứ. Nút chụp ở đâu vậy?', 'よいですよ。シャッターはどこですか'),
            dialogueLine('tanaka', '右上にあります。', 'みぎうえにあります。', 'Ở phía trên bên phải.', 'みぎうえにあります'),
            dialogueLine('sato', '右上ですね。では撮りますよ。このような感じでどうですか？', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか？', 'Phía trên bên phải, rõ rồi. Tôi chụp đây. Kiểu này được không?', 'みぎうえですね。ではとりますよ。このようなかんじでどうですか'),
            dialogueLine('tanaka', 'はい、ありがとうございました。', 'はい、ありがとうございました。', 'Vâng, cảm ơn anh/chị nhiều ạ.', 'はい、ありがとうございました'),
            dialogueLine('sato', 'どういたしまして。', 'どういたしまして。', 'Không có gì đâu.', 'どういたしまして'),
          ],
          explanation: ['Đây là đoạn nối tiếp bài trước — 4 lượt đầu (シャッターはどこですか／右上にあります／では撮りますよ／ありがとうございました) đã học ở m02-u1-l1, câu どういたしまして là câu MỚI của bài này.', 'Cùng là どういたしまして nhưng ngữ cảnh khác nhóm 1 (một bên là du lịch/chụp ảnh, một bên là giúp tìm đồ trong lớp) — cho thấy câu này dùng chung được cho nhiều tình huống.'],
        },
        {
          id: 'ongoing-gratitude', title: 'こちらこそ — đáp lễ lòng biết ơn (KHÁC bài trước)', situation: 'Vai vế: hai đồng nghiệp/người quen đã biết nhau lâu. Bối cảnh: KHÔNG PHẢI đáp lại một lời cảm ơn cụ thể vừa xảy ra như hai nhóm trên — đây là cách bày tỏ lòng biết ơn/thiện chí CHUNG khi nhắc tới mối quan hệ đôi bên, một tình huống KHÁC. こちらこそ ở đây KHÔNG phải đáp lễ lời chào よろしくお願いします như đã học ở bài chào hỏi.',
          lines: [
            dialogueLine('ito', '田中さんには、いつもお世話になっています。', 'たなかさんには、いつもおせわになっています。', 'Tôi luôn được anh Tanaka giúp đỡ nhiều.', 'たなかさんには、いつもおせわになっています'),
            dialogueLine('tanaka', 'こちらこそ、お世話になっています。', 'こちらこそ、おせわになっています。', 'Không, chính tôi mới là người phải cảm ơn chị.', 'こちらこそ、おせわになっています'),
          ],
          explanation: ['こちらこそ ở đây đáp lại một câu bày tỏ lòng biết ơn về MỐI QUAN HỆ nói chung (お世話になっています), khác với こちらこそ đáp lễ lời chào ở bài trước.', 'Không có lời cảm ơn CỤ THỂ vừa xảy ra (như "cảm ơn vì đã giúp tìm đồ") — đây là cách hai người quen biết lâu bày tỏ thiện ý với nhau.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'どういたしまして (đứng riêng)', formula: 'どういたしまして', formulaReading: 'どういたしまして', meaning: 'Đáp lại lời cảm ơn, lịch sự, chung chung.',
          examples: [example('どういたしまして。', 'どういたしまして。', 'Không có gì đâu.')],
          explanation: ['Dùng được cho hầu hết mọi tình huống lịch sự, không cần nêu cụ thể đã giúp gì.'],
        },
        {
          title: 'いえいえ (đứng riêng)', formula: 'いえいえ', formulaReading: 'いえいえ', meaning: 'Đáp lại lời cảm ơn, thân mật.',
          examples: [example('いえいえ、お安い御用ですよ。', 'いえいえ、おやすいごようですよ。', 'Không sao, chuyện nhỏ mà.')],
          explanation: ['Thể thân mật của どういたしまして; có thể thêm câu sau để nhẹ nhàng hơn.'],
        },
        {
          title: 'とんでもない ↔ とんでもございません', formula: 'とんでもない ／ とんでもございません', formulaReading: 'とんでもない ／ とんでもございません', meaning: 'Cùng ý khiêm tốn từ chối lời khen/cảm ơn, hai thể.',
          examples: [example('とんでもない', 'とんでもない', 'Đâu có.'), example('とんでもございません', 'とんでもございません', 'Đâu có ạ.')],
          explanation: ['とんでもない vốn là MỘT tính từ trọn vẹn, nên とんでもございません (đổi phần ない) tuy phổ biến nhưng bị coi là chưa chuẩn; dạng CHUẨN là とんでもないです／とんでもないことでございます.'],
        },
        {
          title: '気にしないでください (đứng riêng)', formula: '気にしないでください', formulaReading: 'きにしないでください', meaning: 'Trấn an người khác đừng bận tâm/lo lắng, lịch sự.',
          examples: [example('気にしないでください。', 'きにしないでください。', 'Xin đừng bận tâm ạ.')],
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
    { id: 'douitashimashite', displayText: 'どういたしまして', reading: 'どういたしまして', romanization: 'dou itashimashite', speechText: 'どういたしまして', meaningVi: 'Đáp lại lời cảm ơn (lịch sự, chung chung).', translationByNative: vi('Đáp lại lời cảm ơn (lịch sự, chung chung).'), translations: vi('Đáp lại lời cảm ơn (lịch sự, chung chung).'), audioLocale: 'ja-JP' },
    { id: 'ieie', displayText: 'いえいえ', reading: 'いえいえ', romanization: 'ie ie', speechText: 'いえいえ', meaningVi: 'Đáp lại lời cảm ơn (thân mật).', translationByNative: vi('Đáp lại lời cảm ơn (thân mật).'), translations: vi('Đáp lại lời cảm ơn (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'tondemonai', displayText: 'とんでもない', reading: 'とんでもない', romanization: 'tondemonai', speechText: 'とんでもない', meaningVi: 'Từ chối lời khen/cảm ơn quá lời (thân mật).', translationByNative: vi('Từ chối lời khen/cảm ơn quá lời (thân mật).'), translations: vi('Từ chối lời khen/cảm ơn quá lời (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'tondemogozaimasen', displayText: 'とんでもございません', reading: 'とんでもございません', romanization: 'tondemo gozaimasen', speechText: 'とんでもございません', meaningVi: 'Từ chối lời khen/cảm ơn quá lời (lịch sự).', translationByNative: vi('Từ chối lời khen/cảm ơn quá lời (lịch sự).'), translations: vi('Từ chối lời khen/cảm ơn quá lời (lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'kininaide', displayText: '気にしないでください', reading: 'きにしないでください', romanization: 'ki ni shinaide kudasai', speechText: 'きにしないでください', meaningVi: 'Đừng bận tâm về việc đó (lịch sự).', translationByNative: vi('Đừng bận tâm về việc đó (lịch sự).'), translations: vi('Đừng bận tâm về việc đó (lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'oyakunitatete', displayText: 'お役に立てて良かったです', reading: 'おやくにたててよかったです', romanization: 'oyaku ni tatete yokatta desu', speechText: 'おやくにたててよかったです', meaningVi: 'Vui vì đã giúp được (lịch sự).', translationByNative: vi('Vui vì đã giúp được (lịch sự).'), translations: vi('Vui vì đã giúp được (lịch sự).'), audioLocale: 'ja-JP' },
  ],
};

export const JA_M02_UNIT1_LESSON2 = localizeSupport(JA_M02_UNIT1_LESSON2_SOURCE);
