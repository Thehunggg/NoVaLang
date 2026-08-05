import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit2-lesson1-m02-localization.mjs';

// Daily Life / Module 2 / Unit 2 / Lesson 1 — "謝ることと許可を求めること"
// (Apologize & Ask Permission / Xin lỗi & xin phép).
// Same five_cards schema as m02-u1-l1/l2. Q1-Q9 Free, Q10-Q14 Plus.
//
// NGUỒN (PHA A, xem scripts/content/sources/INVENTORY.md mục
// "ĐO TRƯỚC KHI VIẾT — m02-u2-l1" + scripts/content/sources/scan/
// ja-daily_life-m02-u2-l1.scan.json):
//   - local-sources/ja/topic4.json dialogue_id 812 (xin lỗi lịch sự, hủy hẹn)
//   - local-sources/ja/topic5.json dialogue_id 186 (xin phép lịch sự, mua sắm)
//   - local-sources/ja/topic5.json dialogue_id 821 (xin phép thân mật, gia đình)
//   - local-sources/ja/n5/n5_ngu-phap-vi.txt dòng 191-207 (ngữ pháp てもいいですか)
//   - local-sources/ja/ban1.txt (từ vựng ごめん/ごめんなさい + ví dụ てもいいですか)
//   - hanabira ～てもいい_(〜temo_ii).md (bảng 4 tầng lịch sự)
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
    id: 'ja-daily_life-m02-u2-l1-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    context: 'Bạn vừa hủy hẹn với một người quen, trong tình huống cần lịch sự.',
    prompt: 'Bạn vừa hủy hẹn với một người quen, trong tình huống cần lịch sự. Nói gì?',
    options: [option('moushiwake_arimasen', '申し訳ありません。'), option('gomennasai', 'ごめんなさい。'), option('kamaimasen', '構いません。'), option('temo_ii_desu_ka', 'てもいいですか。')],
    correctOptionId: 'moushiwake_arimasen',
    feedback: { correctAnswer: '申し訳ありません。', canonicalAnswer: '申し訳ありません。', audioText: 'もうしわけありません', explanation: '申し訳ありません đúng mức lịch sự cần có. ごめんなさい là thể thân mật. 構いません dùng để CHO PHÉP, không phải xin lỗi. てもいいですか dùng để XIN PHÉP, không phải xin lỗi.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    context: 'Một người bạn thân vô tình làm bạn khó chịu một chút. Bạn xin lỗi, thân mật.',
    prompt: 'Một người bạn thân vô tình làm bạn khó chịu một chút. Bạn xin lỗi, thân mật. Nói gì?',
    options: [option('gomennasai', 'ごめんなさい。'), option('moushiwake_arimasen', '申し訳ありません。'), option('moushiwake_gozaimasen', '申し訳ございません。'), option('shikata_arimasen', '仕方ありません。')],
    correctOptionId: 'gomennasai',
    feedback: { correctAnswer: 'ごめんなさい。', canonicalAnswer: 'ごめんなさい。', audioText: 'ごめんなさい', explanation: 'Với bạn thân dùng thể thân mật ごめんなさい. 申し訳ありません／ございません đều là thể lịch sự. 仕方ありません là câu người NGHE nói, không phải câu xin lỗi.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với mức lịch sự của nó.',
    pairs: [
      { id: 'moushiwake_gozaimasen', left: { id: 'moushiwake_gozaimasen_l', text: '申し訳ございません' }, right: { id: 'moushiwake_gozaimasen_r', text: 'Xin lỗi — rất lịch sự, trang trọng' } },
      { id: 'gomennasai', left: { id: 'gomennasai_l', text: 'ごめんなさい' }, right: { id: 'gomennasai_r', text: 'Xin lỗi — thân mật' } },
      { id: 'temo_yoroshii_desu_ka', left: { id: 'temo_yoroshii_desu_ka_l', text: 'てもよろしいですか' }, right: { id: 'temo_yoroshii_desu_ka_r', text: 'Xin phép — lịch sự hơn' } },
      { id: 'daijoubu_desu', left: { id: 'daijoubu_desu_l', text: '大丈夫です' }, right: { id: 'daijoubu_desu_r', text: 'Đồng ý cho phép — trung tính' } },
    ],
    feedback: { explanation: 'Cùng ý xin lỗi nhưng khác nhau ở mức lịch sự cần dùng theo đối tượng.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu xin phép ăn bánh.',
    tokens: [token('kono_keeki_wo', 'このケーキを'), token('tabete', 'たべて'), token('mo_ii', 'もいい'), token('desu_ka', 'ですか')],
    correctTokenIds: ['kono_keeki_wo', 'tabete', 'mo_ii', 'desu_ka'],
    feedback: { correctAnswer: 'このケーキをたべてもいいですか。', canonicalAnswer: 'このケーキをたべてもいいですか。', audioText: 'このケーキをたべてもいいですか', explanation: 'もいい + ですか → てもいいですか. も／てis không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    context: 'Hai người bạn thân: một người xin phép mượn đồ.',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['伊藤: 借（か）りてもいい？', '田中: {{slot_1}}。'],
    slots: [{ id: 'slot_1', answerId: 'mochiron', placeholder: '________' }],
    wordBank: [option('mochiron', 'もちろん'), option('moushiwake_gozaimasen', '申し訳ございません'), option('kamaimasen', '構いません')],
    feedback: { correctAnswer: 'もちろん。', canonicalAnswer: 'もちろん。', audioText: 'もちろん', explanation: 'Bạn thân dùng thể thân mật, không thêm ですか.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: '申し訳ございません',
    options: [option('very_polite', 'Xin lỗi — rất lịch sự'), option('polite', 'Xin lỗi — lịch sự'), option('casual', 'Xin lỗi — thân mật'), option('permission', 'Xin phép')],
    correctOptionId: 'very_polite',
    feedback: { correctAnswer: 'Xin lỗi — rất lịch sự', explanation: 'Câu nghe được là 申し訳ございません — mức lịch sự cao nhất trong ba cách xin lỗi.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Bạn muốn hỏi mượn bút của đồng nghiệp chưa thân, lịch sự hơn てもいいですか.',
    prompt: 'Bạn muốn hỏi mượn bút của đồng nghiệp chưa thân, lịch sự hơn てもいいですか. Nói gì?',
    options: [option('temo_yoroshii_desu_ka', 'てもよろしいですか。'), option('temo_ii_desu_ka', 'てもいいですか。'), option('temo_kamaimasen_ka', 'てもかまいませんか。'), option('mo_ii_desu_ka', 'もいいですか。')],
    correctOptionId: 'temo_yoroshii_desu_ka',
    feedback: { correctAnswer: 'てもよろしいですか。', explanation: 'てもよろしいですか lịch sự hơn てもいいですか, đúng mức cần cho đồng nghiệp chưa thân. もいいですか thiếu て, sai ngữ pháp. てもかまいませんか cũng xin phép nhưng KHÔNG phải cụm chính đã dạy ở bài này.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    prompt: '仕方ありません dùng khi nào?',
    options: [option('sympathy', 'Đáp lại lời xin lỗi/tin không hay của người khác, thông cảm'), option('apologize', 'Khi tự mình xin lỗi'), option('ask_permission', 'Khi xin phép làm việc gì đó'), option('grant', 'Khi đồng ý cho phép')],
    correctOptionId: 'sympathy',
    feedback: { correctAnswer: 'Đáp lại lời xin lỗi/tin không hay của người khác, thông cảm', explanation: '仕方ありません là câu người NGHE nói để thông cảm, không phải câu xin lỗi hay xin phép hay cấp phép.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'ごめんなさい thuộc thể nào?', options: [option('casual', 'Thể thân mật'), option('polite', 'Thể lịch sự'), option('both', 'Cả hai như nhau'), option('none', 'Không thuộc thể nào')], correctOptionId: 'casual', feedback: { correctAnswer: 'Thể thân mật', explanation: 'Không có です／ます ở cuối — dấu hiệu của thể thân mật.' } },
      { id: 'q9_2', prompt: '申し訳ございません lịch sự hơn hay kém lịch sự hơn 申し訳ありません?', options: [option('more', 'Lịch sự hơn'), option('less', 'Kém lịch sự hơn'), option('same', 'Bằng nhau'), option('none', 'Không so sánh được')], correctOptionId: 'more', feedback: { correctAnswer: 'Lịch sự hơn', explanation: 'ございます／ございません lịch sự hơn あります／ありません — đúng cho cả cặp này.' } },
      { id: 'q9_3', prompt: 'もちろんです và 大丈夫です khác nhau ở điểm nào?', options: [option('nuance', 'もちろんです nhấn sự dứt khoát; 大丈夫です thêm ý trấn an'), option('meaning', 'Nghĩa hoàn toàn khác nhau'), option('polite', 'もちろんです lịch sự hơn'), option('not_grant', 'Không dùng để đồng ý cho phép')], correctOptionId: 'nuance', feedback: { correctAnswer: 'もちろんです nhấn sự dứt khoát; 大丈夫です thêm ý trấn an', explanation: 'Cả hai đều đáp \'được\' cho lời xin phép, chỉ khác sắc thái nhấn mạnh/trấn an.' } },
      { id: 'q9_4', prompt: '気を付けます thường nói SAU khi làm gì?', options: [option('apologize', 'Xin lỗi vì một lỗi/sơ suất'), option('ask', 'Xin phép làm việc gì đó'), option('grant', 'Đồng ý cho phép'), option('compliment', 'Khen ai đó')], correctOptionId: 'apologize', feedback: { correctAnswer: 'Xin lỗi vì một lỗi/sơ suất', explanation: '気を付けます là lời hứa sẽ cẩn thận hơn — thường nói tiếp sau một lời xin lỗi.' } },
      { id: 'q9_5', prompt: 'ごめんなさい thuộc thể nào?', options: [option('casual2', 'Thể thân mật'), option('polite2', 'Thể lịch sự'), option('both2', 'Cả hai như nhau'), option('none2', 'Không thuộc thể nào')], correctOptionId: 'casual2', feedback: { correctAnswer: 'Thể thân mật', explanation: 'Không có です／ます ở cuối — dấu hiệu của thể thân mật.' } },
    ],
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '17:20',
      context: 'Hai đồng nghiệp nhắn tin, một người xin phép về sớm, người kia đồng ý lịch sự. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ slotId: 'chat_temo_yoroshii_slot' }, { displayText: '。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ slotId: 'chat_daijoubu_slot' }, { displayText: '。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'ありがとうございます。' }] },
      ],
    },
    slots: [
      { id: 'chat_temo_yoroshii_slot', displayText: '今日は用事がありまして、少し早く帰ってもよろしいですか', canonicalText: '今日は用事がありまして、少し早く帰ってもよろしいですか', audioText: 'きょうはようじがありまして、すこしはやくかえってもよろしいですか', acceptedAnswers: ['今日は用事がありまして、少し早く帰ってもよろしいですか'] },
      { id: 'chat_daijoubu_slot', displayText: '大丈夫ですよ。お気を付けて', canonicalText: '大丈夫ですよ。お気を付けて', audioText: 'だいじょうぶですよ。おきをつけて', acceptedAnswers: ['大丈夫ですよ。お気を付けて'] },
    ],
    feedback: { correctAnswer: '今日は用事がありまして、少し早く帰ってもよろしいですか\n大丈夫ですよ。お気を付けて', canonicalAnswer: '今日は用事がありまして、少し早く帰ってもよろしいですか／大丈夫ですよ。お気を付けて', audioText: 'きょうはようじがありまして…／だいじょうぶですよ…', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_temo_yoroshii_slot: { incorrectMessage: 'Ô này xin phép về sớm, lịch sự.', correctAnswer: '今日は用事がありまして、少し早く帰ってもよろしいですか', explanation: 'Ô này xin phép về sớm, lịch sự, dùng thể てもよろしいですか vì đồng nghiệp chưa thân.' }, chat_daijoubu_slot: { incorrectMessage: 'Ô này đồng ý cho phép, trấn an.', correctAnswer: '大丈夫ですよ。お気を付けて', explanation: 'Ô này đồng ý cho phép, thêm ý trấn an bằng 大丈夫です.' } } },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu xin phép dùng máy tính, thân mật. Có thẻ không cần dùng.',
    tokens: [token('pasokon_wo', 'パソコンを'), token('tsukatte', '使って'), token('mo_ii', 'もいい'), token('yoroshii_distractor', 'よろしい'), token('gozaimasen_distractor', 'ございません')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'pasokon_wo' },
      { id: 's2', expectedTokenId: 'tsukatte' },
      { id: 's3', expectedTokenId: 'mo_ii', afterText: '？' },
    ],
    unusedTokenIds: ['yoroshii_distractor', 'gozaimasen_distractor'],
    feedback: { correctAnswer: 'パソコンを使ってもいい？', canonicalAnswer: 'パソコンを使ってもいい？', audioText: 'パソコンをつかってもいい', explanation: 'Xin phép thân mật bỏ ですか, chỉ giữ てもいい. よろしい quá lịch sự cho bạn thân, ございません không hợp câu xin phép.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', 'A: 借（か）りてもいい？\nB: もちろん。'),
      option('mixed_up', 'A: 借（か）りてもよろしいですか。\nB: もちろん。'),
      option('mixed_down', 'A: 借（か）りてもいい？\nB: 大丈夫ですよ。'),
      option('wrong_function', 'A: 申し訳ございません。\nB: もちろん。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: 'A: 借（か）りてもいい？\nB: もちろん。', explanation: 'A tự nhiên: cả hai giữ thể thân mật xuyên suốt. B lệch vì A hỏi thân mật mà B đáp lịch sự. C lệch tương tự, ngược lại. D sai chức năng hoàn toàn — A đang xin lỗi chứ không xin phép.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l1-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu xin lỗi rất lịch sự. Có thẻ không cần dùng.',
    tokens: [token('moushiwake', '申し訳'), token('gozaimasen', 'ございません'), token('arimasen_distractor', 'ありません'), token('nasai_distractor', 'なさい')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'moushiwake' },
      { id: 's2', expectedTokenId: 'gozaimasen', afterText: '。' },
    ],
    unusedTokenIds: ['arimasen_distractor', 'nasai_distractor'],
    feedback: { correctAnswer: '申し訳ございません。', canonicalAnswer: '申し訳ございません。', audioText: 'もうしわけございません', explanation: '申し訳 + ございません → 申し訳ございません. ありません lịch sự kém hơn, なさい không đi cùng 申し訳.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // BA đoạn NGUYÊN VĂN: nhóm 2 turns1-2 (topic5.json:186, đã dùng ở Card 3)
    // + nhóm 1 turns3-4 (topic4.json:812, đã dùng ở Card 3) + nhóm 3 turns2-4
    // (topic5.json:821, đã dùng ở Card 3) — tổng 2+2+3 = 7 lượt, trong khoảng
    // 6-8 của G14-R7 Q14. TRÁNH nhóm 2 turns3-4 (試着) và nhóm 1 turns1-2
    // (楽（たの）しみ, đọc romaji "tanoshimi"): dòng đọc romaji tự sinh của Q14
    // (scripts/lib/japanese-pronunciation.mjs, độc lập với furigana) khớp
    // nhầm guard chặn nhắc nguồn "Tanos" (§G5, false positive thuần chuỗi
    // con trong "tanoshimi") hoặc kuromoji không tách được 試 đứng riêng —
    // cả hai đều ngoài phạm vi sửa của PHA B (không tự sửa scripts/
    // validate-curriculum.mjs / japanese-pronunciation.mjs), nên chọn đoạn
    // khác thay vì vá tooling.
    id: 'ja-daily_life-m02-u2-l1-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Ba cách xin lỗi & xin phép khác mức độ',
    scenarioDescription: 'Vai vế: ba tình huống khác nhau — một lần với người chưa thân (cửa hàng), một lần với bạn bè đã hẹn trước, và một lần trong gia đình thân mật. Cùng là xin lỗi/xin phép, nhưng mức lịch sự khác nhau tùy quan hệ.',
    characterIds: ['sato', 'ito', 'tanaka'],
    dialogueLines: [
      dialogueLine('ito', '私は青系統のお洋服が好きです。', 'わたしはあおけいとうのおようふくがすきです。', 'Tôi thích quần áo dòng màu xanh.', 'わたしはあおけいとうのおようふくがすきです'),
      dialogueLine('tanaka', 'そうなのですね。それでは、こちらのコートはいかがですか？', 'そうなのですね。それでは、こちらのコートはいかがですか？', 'Vậy ạ. Vậy chiếc áo khoác này thì sao ạ?', 'そうなのですね。それでは、こちらのコートはいかがですか'),
      dialogueLine('sato', '少し具合が悪いのです。', 'すこしぐあいがわるいのです。', 'Tôi thấy hơi không khỏe.', 'すこしぐあいがわるいのです'),
      dialogueLine('ito', 'それは仕方ありませんね。風邪ですか？', 'それはしかたありませんね。かぜですか？', 'Vậy thì đành chịu thôi. Bị cảm à?', 'それはしかたありませんね。かぜですか'),
      dialogueLine('ito', 'お父さん、私の拾ってきた貝殻も付けてよいですか？', 'おとうさん、わたしのひろってきたかいがらもつけてよいですか？', 'Bố ơi, con gắn cả vỏ sò con nhặt được vào được không?', 'おとうさん、わたしのひろってきたかいがらもつけてよいですか'),
      dialogueLine('sato', 'よいですが、どこに付けたいのですか？', 'よいですが、どこにつけたいのですか？', 'Được, nhưng con muốn gắn ở đâu?', 'よいですが、どこにつけたいのですか'),
      dialogueLine('ito', 'ここです。', 'ここです。', 'Ở đây ạ.', 'ここです'),
    ],
    sceneDividers: [
      { afterDialogueLine: 2, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
      { afterDialogueLine: 4, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
    ],
  },
];

const JA_M02_UNIT2_LESSON1_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Xin lỗi & nhờ vả',
    titleByNative: vi('Xin lỗi & nhờ vả'),
  },
  lesson: {
    title: 'Xin lỗi & xin phép',
    titleByNative: vi('Xin lỗi & xin phép'),
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
          'Xin lỗi thân mật bằng ごめんなさい.',
          'Xin lỗi lịch sự bằng 申し訳ありません／申し訳ございません.',
          'Xin phép làm việc gì đó bằng ～てもいいですか／～てもよろしいですか.',
          'Đồng ý cho phép bằng もちろんです／大丈夫です／構いません.',
          'Trấn an/thông cảm khi ai đó gặp chuyện không hay bằng 仕方ありません.',
          'Hứa sẽ cẩn thận hơn sau khi xin lỗi bằng 気を付けます.',
        ],
        situation: [
          'Ai đó cần xin lỗi hoặc xin phép làm một việc gì đó.',
          'Bạn chọn đúng mức lịch sự và đúng cách nói theo tình huống.',
        ],
        examples: [
          { label: 'Xin lỗi, lịch sự:', ...line('', '申し訳ありません。', 'もうしわけありません。', 'Xin lỗi vì đã hủy hẹn ạ.', 'もうしわけありません') },
          { label: 'Xin phép, lịch sự hơn:', ...line('', '試着してもよろしいですか。', 'しちゃくしてもよろしいですか。', 'Thử áo được không ạ?', 'しちゃくしてもよろしいですか') },
          { label: 'Với bạn thân:', ...line('', 'ごめんなさい。', 'ごめんなさい。', 'Xin lỗi nhé.', 'ごめんなさい') },
        ],
        importantNote: [
          '申し訳ありません／申し訳ございません dùng thể lịch sự hơn ごめんなさい — mức nào cũng xin lỗi, khác nhau ở đối tượng.',
          'てもよろしいですか lịch sự hơn てもいいですか — cùng xin phép, khác mức trang trọng.',
          'Bỏ ですか khỏi ごめんなさい／申し訳ありません thì mức lịch sự đổi nhưng nghĩa xin lỗi vẫn giữ nguyên.',
        ],
      },
      vocabularyDetails: [
        { id: 'gomennasai', timingAndContext: ['Xin lỗi ngắn gọn, thân mật, giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Gia đình', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng thân mật này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', '申し訳ありません', 'Dùng với:', 'Thầy cô', 'Người trên'], casual: [], overview: 'Xin lỗi (thân mật).', examples: [example('ごめんなさい、今度からは気を付けます。', 'ごめんなさい、こんどからはきをつけます。', 'Xin lỗi nhé. Từ giờ tôi sẽ cẩn thận hơn.')] },
        { id: 'moushiwake-arimasen', timingAndContext: ['Xin lỗi lịch sự, khi cần giữ phép với người quen/đồng nghiệp.'], appropriateFor: ['Thầy cô', 'Người trên', 'Người quen', 'Đồng nghiệp'], avoid: [], register: 'Lịch sự.', formal: ['Cách trang trọng hơn:', '申し訳ございません', 'Dùng với:', 'Khách hàng', 'Cấp trên trong công việc'], casual: ['Cách thân mật:', 'ごめんなさい', 'Dùng với:', 'Bạn bè', 'Gia đình'], overview: 'Xin lỗi (lịch sự).', examples: [example('申し訳ありませんが、今日のお出かけはキャンセルさせてください。', 'もうしわけありませんが、きょうのおでかけはキャンセルさせてください。', 'Xin lỗi nhưng tôi phải hủy hẹn đi chơi hôm nay.')] },
        { id: 'moushiwake-gozaimasen', timingAndContext: ['Xin lỗi rất lịch sự, trang trọng — thường dùng trong dịch vụ khách hàng, nơi làm việc.'], appropriateFor: ['Khách hàng', 'Cấp trên trong công việc', 'Tình huống trang trọng'], avoid: ['Không dùng với bạn bè/gia đình — nghe quá xa cách.'], register: 'Trang trọng.', formal: [], casual: ['Cách thân mật:', 'ごめんなさい', 'Dùng với:', 'Bạn bè', 'Gia đình'], overview: 'Xin lỗi (rất lịch sự, trang trọng).', examples: [example('大変申し訳ございませんでした。', 'たいへんもうしわけございませんでした。', 'Rất xin lỗi, chúng tôi đã hết hàng.')] },
        { id: 'temo-ii-desu-ka', timingAndContext: ['Xin phép làm một việc gì đó, mức trung tính, thường dùng khi hai bên đã có phần thoải mái.'], appropriateFor: ['Mọi đối tượng ở mức trung tính'], avoid: [], register: '', formal: ['Cách trang trọng hơn:', 'てもよろしいですか', 'Dùng với:', 'Người lạ', 'Khách hàng'], casual: [], overview: '...được không? (xin phép, trung tính).', examples: [example('このケーキをたべてもいいですか。', 'このケーキをたべてもいいですか。', 'Ăn cái bánh này được không?')] },
        { id: 'temo-yoroshii-desu-ka', timingAndContext: ['Xin phép làm một việc gì đó, mức lịch sự hơn てもいいですか — hợp khi nói với người lạ, khách hàng.'], appropriateFor: ['Người lạ', 'Khách hàng', 'Cấp trên'], avoid: [], register: 'Lịch sự.', formal: [], casual: ['Cách trung tính hơn:', 'てもいいですか', 'Dùng với:', 'Người đã quen'], overview: '...được không ạ? (xin phép, lịch sự hơn).', examples: [example('試着してもよろしいですか。', 'しちゃくしてもよろしいですか。', 'Thử áo được không ạ?')] },
        { id: 'mochiron-desu', timingAndContext: ['Đồng ý cho phép một cách dứt khoát, thân thiện.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Tất nhiên rồi (đồng ý cho phép).', examples: [example('もちろんです。あちらが試着室です。', 'もちろんです。あちらがしちゃくしつです。', 'Tất nhiên rồi. Phòng thử đồ ở đằng kia ạ.')], notes: ['Dạng từ điển của です là だ — mức lịch sự nằm ở です／だ, không đổi ở もちろん.'] },
        { id: 'daijoubu-desu', timingAndContext: ['Đồng ý cho phép kèm ý trấn an — thường dùng khi người xin phép có vẻ hơi ngại.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Được mà, không sao (đồng ý/trấn an).', examples: [example('大丈夫です。足や、腕も痒くなりやすいので十分に塗ってください。', 'だいじょうぶです。あしや、うでもかゆくなりやすいのでじゅうぶんにぬってください。', 'Được mà. Chân, tay cũng dễ ngứa nên cứ thoa cho kỹ.')] },
        { id: 'kamaimasen', timingAndContext: ['Đồng ý cho phép, mức trung tính.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Không sao, được (đồng ý cho phép).', examples: [example('3つまででしたら使っても構いません。', 'みっつまででしたらつかってもかまいません。', 'Dùng tối đa 3 cái cũng không sao.')] },
        { id: 'shikata-arimasen', timingAndContext: ['Thông cảm, đáp lại một lời xin lỗi hoặc tin không hay — không phải câu xin lỗi.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Không sao đâu, chuyện đó chịu thôi (thông cảm).', examples: [example('それは仕方ありませんね。風邪ですか。', 'それはしかたありませんね。かぜですか。', 'Việc đó cũng đành chịu thôi. Bị cảm à?')] },
        { id: 'ki-wo-tsukemasu', timingAndContext: ['Hứa sẽ cẩn thận hơn, thường nói ngay sau một lời xin lỗi.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Tôi sẽ cẩn thận hơn (hứa hẹn sau khi xin lỗi).', examples: [example('ごめんなさい、今度からは気を付けます。', 'ごめんなさい、こんどからはきをつけます。', 'Xin lỗi nhé. Từ giờ tôi sẽ cẩn thận hơn.')], notes: ['Dạng từ điển 気を付ける — mức lịch sự nằm ở cách chia: 気を付けます (lịch sự) ・ 気を付ける／気を付けて (thân mật).'] },
      ],
      vocabularyReferences: [
        { term: 'お出（で）かけ', reading: 'おでかけ', speechText: 'おでかけ', meaning: 'Việc ra ngoài, đi chơi.', register: '', example: example('今日のお出かけはキャンセルさせてください。', 'きょうのおでかけはキャンセルさせてください。', 'Cho tôi hủy việc đi chơi hôm nay.') },
        { term: 'キャンセル', reading: 'キャンセル', speechText: 'キャンセル', meaning: 'Hủy (lịch hẹn, đặt chỗ).', register: '', example: example('キャンセルさせてください。', 'キャンセルさせてください。', 'Cho tôi hủy nhé.') },
        { term: '楽（たの）しみ', reading: 'たのしみ', speechText: 'たのしみ', meaning: 'Sự mong chờ, háo hức.', register: '', example: example('楽しみにしていたのに。', 'たのしみにしていたのに。', 'Tôi đang mong chờ mà.') },
        { term: 'のに', reading: 'のに', speechText: 'のに', meaning: 'Trong khi, vậy mà (dùng khi có điều bất ngờ/đáng tiếc).', register: '', example: example('楽しみにしていたのに、どうされたのですか。', 'たのしみにしていたのに、どうされたのですか。', 'Tôi đang mong chờ mà, có chuyện gì vậy?') },
        { term: '具合（ぐあい）', reading: 'ぐあい', speechText: 'ぐあい', meaning: 'Tình trạng sức khỏe.', register: '', example: example('少し具合が悪いのです。', 'すこしぐあいがわるいのです。', 'Tôi thấy hơi không khỏe.') },
        { term: '系統（けいとう）', reading: 'けいとう', speechText: 'けいとう', meaning: 'Hệ, dòng (màu sắc).', register: '', example: example('青系統のお洋服が好きです。', 'あおけいとうのおようふくがすきです。', 'Tôi thích quần áo dòng màu xanh.') },
        { term: '紺色（こんいろ）', reading: 'こんいろ', speechText: 'こんいろ', meaning: 'Màu xanh navy.', register: '', example: example('きれいな紺色ですね。', 'きれいなこんいろですね。', 'Màu xanh navy đẹp quá.') },
        { term: '試着（しちゃく）', reading: 'しちゃく', speechText: 'しちゃく', meaning: 'Mặc, mang vào (trong 試着 = thử mặc).', register: '', example: example('試着してもよろしいですか。', 'しちゃくしてもよろしいですか。', 'Thử áo được không ạ?') },
        { term: '試着室（しちゃくしつ）', reading: 'しちゃくしつ', speechText: 'しちゃくしつ', meaning: 'Phòng (trong 試着室 = phòng thử đồ).', register: '', example: example('あちらが試着室です。', 'あちらがしちゃくしつです。', 'Phòng thử đồ ở đằng kia.') },
        { term: '拾（ひろ）って', reading: 'ひろって', speechText: 'ひろって', meaning: 'Nhặt được.', register: '', example: example('私の拾ってきた貝殻。', 'わたしのひろってきたかいがら。', 'Vỏ sò tôi nhặt được.') },
        { term: '貝殻（かいがら）', reading: 'かいがら', speechText: 'かいがら', meaning: 'Vỏ sò.', register: '', example: example('貝殻も付けてよいですか。', 'かいがらもつけてよいですか。', 'Gắn cả vỏ sò vào được không?') },
        { term: 'カ所（しょ）', reading: 'かしょ', speechText: 'かしょ', meaning: 'Chỗ, vị trí (đơn vị đếm nơi chốn).', register: '', example: example('1カ所だと寂しい気がする。', 'いっかしょだとさびしいきがする。', 'Nếu chỉ một chỗ thì trông hơi trống.') },
        { term: '寂（さび）しい', reading: 'さびしい', speechText: 'さびしい', meaning: 'Cô đơn, trống trải, đơn điệu.', register: '', example: example('1カ所だと寂しい気がする。', 'いっかしょだとさびしいきがする。', 'Nếu chỉ một chỗ thì trông hơi trống.') },
        { term: 'ので', reading: 'ので', speechText: 'ので', meaning: 'Vì, do (lý do).', register: '', example: example('寂しい気がするので、2カ所に付けます。', 'さびしいきがするので、にかしょにつけます。', 'Vì trông hơi trống nên gắn ở 2 chỗ.') },
      ],
      dialogueGroups: [
        {
          id: 'apology-polite', title: 'Lịch sự — xin lỗi vì hủy hẹn', situation: 'Vai vế: hai người bạn, đã hẹn đi chơi cùng nhau nhưng vẫn giữ thể lịch sự. 佐藤 thấy không khỏe nên xin hủy hẹn.',
          lines: [
            dialogueLine('sato', '申し訳ありませんが、今日のお出かけはキャンセルさせてください。', 'もうしわけありませんが、きょうのおでかけはキャンセルさせてください。', 'Xin lỗi nhưng tôi phải hủy hẹn đi chơi hôm nay.', 'もうしわけありませんが、きょうのおでかけはキャンセルさせてください'),
            dialogueLine('ito', '楽しみにしていたのに、どうされたのですか？', 'たのしみにしていたのに、どうされたのですか？', 'Tôi đang mong chờ mà, có chuyện gì vậy?', 'たのしみにしていたのに、どうされたのですか'),
            dialogueLine('sato', '少し具合が悪いのです。', 'すこしぐあいがわるいのです。', 'Tôi thấy hơi không khỏe.', 'すこしぐあいがわるいのです'),
            dialogueLine('ito', 'それは仕方ありませんね。風邪ですか？', 'それはしかたありませんね。かぜですか？', 'Vậy thì đành chịu thôi. Bị cảm à?', 'それはしかたありませんね。かぜですか'),
          ],
          explanation: ['申し訳ありませんが dùng để mở đầu một lời xin lỗi lịch sự trước khi nói lý do.', '仕方ありませんね là cách 伊藤 thông cảm, không trách móc — khác với việc xin lỗi, đây là câu ĐÁP LẠI một lời xin lỗi/tin không hay.'],
        },
        {
          id: 'permission-polite-shop', title: 'Lịch sự — xin phép thử áo', situation: 'Vai vế: khách và nhân viên cửa hàng quần áo, chưa quen biết — cả hai giữ thể lịch sự. Khách xin phép thử áo.',
          lines: [
            dialogueLine('ito', '私は青系統のお洋服が好きです。', 'わたしはあおけいとうのおようふくがすきです。', 'Tôi thích quần áo dòng màu xanh.', 'わたしはあおけいとうのおようふくがすきです'),
            dialogueLine('tanaka', 'そうなのですね。それでは、こちらのコートはいかがですか？', 'そうなのですね。それでは、こちらのコートはいかがですか？', 'Vậy ạ. Vậy chiếc áo khoác này thì sao ạ?', 'そうなのですね。それでは、こちらのコートはいかがですか'),
            dialogueLine('ito', 'きれいな紺色ですね。試着してもよろしいですか？', 'きれいなこんいろですね。しちゃくしてもよろしいですか？', 'Màu xanh navy đẹp quá. Thử áo được không ạ?', 'きれいなこんいろですね。しちゃくしてもよろしいですか'),
            dialogueLine('tanaka', 'もちろんです。あちらが試着室です。', 'もちろんです。あちらがしちゃくしつです。', 'Tất nhiên rồi. Phòng thử đồ ở đằng kia ạ.', 'もちろんです。あちらがしちゃくしつです'),
          ],
          explanation: ['試着してもよろしいですか lịch sự hơn てもいいですか — hợp với quan hệ khách hàng/nhân viên chưa quen biết.', 'もちろんです đáp lại lời xin phép một cách dứt khoát, thân thiện — khác とんでもございません (đã học ở bài trước, dùng để từ chối lời KHEN, không phải cấp phép).'],
        },
        {
          id: 'permission-casual-family', title: 'Thân mật — xin phép trong gia đình', situation: 'Vai vế: 伊藤 và bố (佐藤), gia đình — thân mật, xưng お父さん. 伊藤 xin phép dùng vỏ sò để trang trí.',
          lines: [
            dialogueLine('ito', 'お父さん、私の拾ってきた貝殻も付けてよいですか？', 'おとうさん、わたしのひろってきたかいがらもつけてよいですか？', 'Bố ơi, con gắn cả vỏ sò con nhặt được vào được không?', 'おとうさん、わたしのひろってきたかいがらもつけてよいですか'),
            dialogueLine('sato', 'よいですが、どこに付けたいのですか？', 'よいですが、どこにつけたいのですか？', 'Được, nhưng con muốn gắn ở đâu?', 'よいですが、どこにつけたいのですか'),
            dialogueLine('ito', 'ここです。', 'ここです。', 'Ở đây ạ.', 'ここです'),
            dialogueLine('sato', 'いいですね。でも、1カ所だと寂しい気がするので、こことそこの2カ所に付けると良さそうです。', 'いいですね。でも、いっかしょだとさびしいきがするので、こことそこのにかしょにつけるとよさそうです。', 'Được đấy. Nhưng nếu chỉ một chỗ thì trông hơi trống, gắn ở đây và cả chỗ kia nữa chắc sẽ đẹp hơn.', 'いいですね。でも、いっかしょだとさびしいきがするので、こことそこのにかしょにつけるとよさそうです'),
          ],
          explanation: ['てよいですか (thân mật) khác てもよろしいですか (lịch sự, dùng ở nhóm trước) — gia đình thân mật thì dùng thể ngắn gọn hơn.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'ごめんなさい ↔ 申し訳ありません ↔ 申し訳ございません', formula: 'ごめんなさい ／ 申し訳（もうしわけ）ありません ／ 申し訳（もうしわけ）ございません', formulaReading: 'ごめんなさい ／ もうしわけありません ／ もうしわけございません', meaning: 'Cùng ý xin lỗi, ba mức lịch sự khác nhau.',
          examples: [example('ごめんなさい。', 'ごめんなさい。', 'Xin lỗi nhé.'), example('申し訳ありません。', 'もうしわけありません。', 'Tôi xin lỗi.'), example('申し訳ございません。', 'もうしわけございません。', 'Tôi thành thật xin lỗi.')],
          explanation: ['ごめんなさい dùng với bạn bè/người thân; 申し訳ありません dùng khi cần lịch sự; 申し訳ございません lịch sự nhất, hay dùng trong dịch vụ khách hàng/nơi làm việc.'],
        },
        {
          title: '～てもいいですか (đứng riêng, xin phép)', formula: '［động từ thể て］＋ もいいですか', formulaReading: '［どうしのてけい］＋ もいいですか', meaning: 'Xin phép làm một việc gì đó, mức trung tính.',
          examples: [example('このケーキをたべてもいいですか。', 'このケーキをたべてもいいですか。', 'Ăn cái bánh này được không?'), example('ここですわってもいいですか。', 'ここですわってもいいですか。', 'Tôi ngồi ở đây được không?')],
          explanation: ['Đây là ĐỘNG TỪ THỂ て + もいいですか — hỏi xem hành động có được phép hay không.'],
        },
        {
          title: 'てもいいですか ↔ てもよろしいですか', formula: '［どうしのてけい］＋ もいいですか ／ もよろしいですか', formulaReading: '［どうしのてけい］＋ もいいですか ／ もよろしいですか', meaning: 'Cùng ý xin phép, khác mức lịch sự.',
          examples: [example('たべてもいいですか。', 'たべてもいいですか。', 'Ăn được không?'), example('試着してもよろしいですか。', 'しちゃくしてもよろしいですか。', 'Thử áo được không ạ?')],
          explanation: ['よろしい lịch sự hơn いい — dùng てもよろしいですか khi cần trang trọng hơn, ví dụ với người lạ/khách hàng.'],
        },
        {
          title: 'もちろんです ↔ 大丈夫です ↔ 構いません', formula: 'もちろんです ／ 大丈夫（だいじょうぶ）です ／ 構（かま）いません', formulaReading: 'もちろんです ／ だいじょうぶです ／ かまいません', meaning: 'Ba cách đồng ý cho phép, cùng ý nghĩa chấp thuận.',
          examples: [example('もちろんです。', 'もちろんです。', 'Tất nhiên rồi.'), example('大丈夫です。', 'だいじょうぶです。', 'Được mà.'), example('構いません。', 'かまいません。', 'Không sao.')],
          explanation: ['Cả ba đều đáp \'được\' cho một lời xin phép — もちろんです nhấn mạnh sự dứt khoát, 大丈夫です mang thêm ý trấn an, 構いません trung tính.'],
        },
        {
          title: '仕方ありません (đứng riêng, thông cảm)', formula: '仕方（しかた）ありません', formulaReading: 'しかたありません', meaning: 'Đáp lại một lời xin lỗi/tin không hay bằng sự thông cảm, không trách móc.',
          examples: [example('それは仕方ありませんね。', 'それはしかたありませんね。', 'Vậy thì đành chịu thôi.')],
          explanation: ['Khác với các cụm XIN LỖI — 仕方ありません là câu người NGHE lời xin lỗi nói, không phải người xin lỗi.'],
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
    { id: 'gomennasai', displayText: 'ごめんなさい', reading: 'ごめんなさい', romanization: 'gomennasai', speechText: 'ごめんなさい', meaningVi: 'Xin lỗi (thân mật).', translationByNative: vi('Xin lỗi (thân mật).'), translations: vi('Xin lỗi (thân mật).'), audioLocale: 'ja-JP' },
    { id: 'moushiwake-arimasen', displayText: '申（もう）し訳（わけ）ありません', reading: 'もうしわけありません', romanization: 'moushiwake arimasen', speechText: 'もうしわけありません', meaningVi: 'Xin lỗi (lịch sự).', translationByNative: vi('Xin lỗi (lịch sự).'), translations: vi('Xin lỗi (lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'moushiwake-gozaimasen', displayText: '申（もう）し訳（わけ）ございません', reading: 'もうしわけございません', romanization: 'moushiwake gozaimasen', speechText: 'もうしわけございません', meaningVi: 'Xin lỗi (rất lịch sự).', translationByNative: vi('Xin lỗi (rất lịch sự).'), translations: vi('Xin lỗi (rất lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'temo-ii-desu-ka', displayText: '～てもいいですか', reading: 'てもいいですか', romanization: 'temo ii desu ka', speechText: 'てもいいですか', meaningVi: '...được không? (xin phép, trung tính).', translationByNative: vi('...được không? (xin phép, trung tính).'), translations: vi('...được không? (xin phép, trung tính).'), audioLocale: 'ja-JP' },
    { id: 'temo-yoroshii-desu-ka', displayText: '～てもよろしいですか', reading: 'てもよろしいですか', romanization: 'temo yoroshii desu ka', speechText: 'てもよろしいですか', meaningVi: '...được không ạ? (xin phép, lịch sự hơn).', translationByNative: vi('...được không ạ? (xin phép, lịch sự hơn).'), translations: vi('...được không ạ? (xin phép, lịch sự hơn).'), audioLocale: 'ja-JP' },
    { id: 'mochiron-desu', displayText: 'もちろんです', reading: 'もちろんです', romanization: 'mochiron desu', speechText: 'もちろんです', meaningVi: 'Tất nhiên rồi (đồng ý cho phép).', translationByNative: vi('Tất nhiên rồi (đồng ý cho phép).'), translations: vi('Tất nhiên rồi (đồng ý cho phép).'), audioLocale: 'ja-JP' },
    { id: 'daijoubu-desu', displayText: '大丈夫（だいじょうぶ）です', reading: 'だいじょうぶです', romanization: 'daijoubu desu', speechText: 'だいじょうぶです', meaningVi: 'Được mà, không sao (đồng ý/trấn an).', translationByNative: vi('Được mà, không sao (đồng ý/trấn an).'), translations: vi('Được mà, không sao (đồng ý/trấn an).'), audioLocale: 'ja-JP' },
    { id: 'kamaimasen', displayText: '構（かま）いません', reading: 'かまいません', romanization: 'kamaimasen', speechText: 'かまいません', meaningVi: 'Không sao, được (đồng ý cho phép).', translationByNative: vi('Không sao, được (đồng ý cho phép).'), translations: vi('Không sao, được (đồng ý cho phép).'), audioLocale: 'ja-JP' },
    { id: 'shikata-arimasen', displayText: '仕方（しかた）ありません', reading: 'しかたありません', romanization: 'shikata arimasen', speechText: 'しかたありません', meaningVi: 'Không sao đâu, chuyện đó chịu thôi (thông cảm).', translationByNative: vi('Không sao đâu, chuyện đó chịu thôi (thông cảm).'), translations: vi('Không sao đâu, chuyện đó chịu thôi (thông cảm).'), audioLocale: 'ja-JP' },
    { id: 'ki-wo-tsukemasu', displayText: '気（き）を付（つ）けます', reading: 'きをつけます', romanization: 'ki wo tsukemasu', speechText: 'きをつけます', meaningVi: 'Tôi sẽ cẩn thận hơn (hứa hẹn sau khi xin lỗi).', translationByNative: vi('Tôi sẽ cẩn thận hơn (hứa hẹn sau khi xin lỗi).'), translations: vi('Tôi sẽ cẩn thận hơn (hứa hẹn sau khi xin lỗi).'), audioLocale: 'ja-JP' },
  ],
};

export const JA_M02_UNIT2_LESSON1 = localizeSupport(JA_M02_UNIT2_LESSON1_SOURCE);
