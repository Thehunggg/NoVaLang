import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit2-lesson2-m02-localization.mjs';

// Daily Life / Module 2 / Unit 2 / Lesson 2 — "ちょっとしたお願いをする"
// (Ask Someone for a Small Favor / Nhờ ai đó việc nhỏ).
// Same five_cards schema as m02-u1-l1/l2, m02-u2-l1. Q1-Q9 Free, Q10-Q14 Plus.
//
// NGUỒN (PHA A, xem scripts/content/sources/INVENTORY.md mục
// "ĐO TRƯỚC KHI VIẾT — m02-u2-l2" + scripts/content/sources/scan/
// ja-daily_life-m02-u2-l2.scan.json):
//   - local-sources/ja/topic2.json dialogue_id 378 (nhờ vả lịch sự, mượn CD)
//   - local-sources/ja/topic1.json dialogue_id 882 (nhờ vả rất lịch sự, cửa hàng cá)
//   - local-sources/ja/topic1.json dialogue_id 839 (nhờ vả thân mật, làm rượu mơ)
//   - local-sources/ja/n5/n5_ngu-phap-vi.txt dòng 291-304 (ngữ pháp てくれる)
//   - local-sources/ja/topic5.json dialogue_id 229 (お願いします)
//   - hanabira Verb_ていただく_(〜te_itadaku).md (bảng so sánh てもらう/てくれる/ていただく)
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
    id: 'ja-daily_life-m02-u2-l2-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    context: 'Bạn muốn mượn một cuốn sách của đồng nghiệp, lịch sự.',
    prompt: 'Bạn muốn mượn một cuốn sách của đồng nghiệp, lịch sự. Nói gì?',
    options: [option('temo_moraemasenka', '貸してもらえませんか。'), option('teitadakemasuka', '貸していただけますか。'), option('tekuremasenka', '貸してくれませんか。'), option('onegai', 'お願いします。')],
    correctOptionId: 'temo_moraemasenka',
    feedback: { correctAnswer: '貸してもらえませんか。', canonicalAnswer: '貸してもらえませんか。', audioText: 'かしてもらえませんか', explanation: '～てもらえませんか đúng mức lịch sự với đồng nghiệp. ～ていただけますか lịch sự hơn mức cần. ～てくれませんか là thể thân mật. お願いします đứng riêng không nêu rõ việc nhờ là gì.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    context: 'Một người bạn thân. Bạn nhờ bạn ấy giúp một việc nhỏ, thân mật.',
    prompt: 'Một người bạn thân. Bạn nhờ bạn ấy giúp một việc nhỏ, thân mật. Nói gì?',
    options: [option('tekuremasenka', '手伝ってくれませんか。'), option('temo_moraemasenka', '手伝ってもらえませんか。'), option('teitadakemasuka', '手伝っていただけますか。'), option('kashikomarimashita', 'かしこまりました。')],
    correctOptionId: 'tekuremasenka',
    feedback: { correctAnswer: '手伝ってくれませんか。', canonicalAnswer: '手伝ってくれませんか。', audioText: 'てつだってくれませんか', explanation: 'Với bạn thân dùng thể thân mật ～てくれませんか. ～てもらえませんか／～ていただけますか đều lịch sự hơn mức cần. かしこまりました là câu người ĐƯỢC nhờ nói, không phải câu đi nhờ.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với mức lịch sự của nó.',
    pairs: [
      { id: 'teitadakemasuka', left: { id: 'teitadakemasuka_l', text: 'ていただけますか' }, right: { id: 'teitadakemasuka_r', text: 'Nhờ vả — rất lịch sự' } },
      { id: 'temo_moraemasenka', left: { id: 'temo_moraemasenka_l', text: 'てもらえませんか' }, right: { id: 'temo_moraemasenka_r', text: 'Nhờ vả — lịch sự' } },
      { id: 'tekuremasenka', left: { id: 'tekuremasenka_l', text: 'てくれませんか' }, right: { id: 'tekuremasenka_r', text: 'Nhờ vả — thân mật' } },
      { id: 'kashikomarimashita', left: { id: 'kashikomarimashita_l', text: 'かしこまりました' }, right: { id: 'kashikomarimashita_r', text: 'Đồng ý giúp — rất lịch sự' } },
    ],
    feedback: { explanation: 'Cùng ý nhờ vả nhưng khác nhau ở mức lịch sự cần dùng theo đối tượng.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu nhờ mượn đồ.',
    tokens: [token('kore_wo', 'これを'), token('kashite', '貸して'), token('moraemasen', 'もらえません'), token('ka', 'か')],
    correctTokenIds: ['kore_wo', 'kashite', 'moraemasen', 'ka'],
    feedback: { correctAnswer: 'これを貸してもらえませんか。', canonicalAnswer: 'これを貸してもらえませんか。', audioText: 'これをかしてもらえませんか', explanation: '貸して + もらえません + か → 貸してもらえませんか, câu nhờ vả lịch sự.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    context: 'Hai người bạn thân: một người nhờ giúp một việc.',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['伊藤: 手伝（てつだ）ってくれない？', '田中: {{slot_1}}。'],
    slots: [{ id: 'slot_1', answerId: 'yoi', placeholder: '________' }],
    wordBank: [option('yoi', 'いいよ'), option('kashikomarimashita', 'かしこまりました'), option('teitadakemasuka', 'いただけますか')],
    feedback: { correctAnswer: 'いいよ。', canonicalAnswer: 'いいよ。', audioText: 'いいよ', explanation: 'Bạn thân đáp thân mật いいよ, không dùng かしこまりました (quá lịch sự) hay いただけますか (đó là câu ĐI nhờ, không phải câu đồng ý).' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'かしこまりました',
    options: [option('very_polite', 'Đồng ý giúp — rất lịch sự'), option('polite', 'Đồng ý giúp — lịch sự'), option('casual', 'Đồng ý giúp — thân mật'), option('ask', 'Nhờ vả')],
    correctOptionId: 'very_polite',
    feedback: { correctAnswer: 'Đồng ý giúp — rất lịch sự', explanation: 'Câu nghe được là かしこまりました — mức lịch sự cao nhất khi đồng ý giúp, hay dùng trong dịch vụ.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    context: 'Bạn muốn nhờ nhân viên cửa hàng làm gì đó cho mình, rất lịch sự.',
    prompt: 'Bạn muốn nhờ nhân viên cửa hàng làm gì đó cho mình, rất lịch sự. Nói gì?',
    options: [option('teitadakemasuka', 'していただけますか。'), option('temo_moraemasenka', 'してもらえませんか。'), option('tekuremasenka', 'してくれませんか。'), option('shite_ii', 'してもいいですか。')],
    correctOptionId: 'teitadakemasuka',
    feedback: { correctAnswer: 'していただけますか。', explanation: 'していただけますか lịch sự nhất trong ba cách nhờ, đúng mức cần cho nhân viên cửa hàng. してもいいですか dùng để XIN PHÉP cho CHÍNH MÌNH làm gì, không phải nhờ NGƯỜI KHÁC làm.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    prompt: '本当ですか dùng khi nào?',
    options: [option('surprise', 'Phản ứng khi nghe tin bất ngờ/vui, xác nhận lại'), option('ask', 'Khi nhờ vả ai đó'), option('grant', 'Khi đồng ý giúp'), option('apologize', 'Khi xin lỗi')],
    correctOptionId: 'surprise',
    feedback: { correctAnswer: 'Phản ứng khi nghe tin bất ngờ/vui, xác nhận lại', explanation: '本当ですか là câu người NGHE nói để xác nhận lại một tin bất ngờ/vui, không phải câu nhờ vả hay xin lỗi.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'てくれませんか thuộc mức nào?', options: [option('casual', 'Thân mật'), option('polite', 'Lịch sự'), option('very_polite', 'Rất lịch sự'), option('none', 'Không thuộc mức nào')], correctOptionId: 'casual', feedback: { correctAnswer: 'Thân mật', explanation: 'てくれませんか là mức thân mật trong ba cách nhờ vả.' } },
      { id: 'q9_2', prompt: 'ていただけますか lịch sự hơn hay kém lịch sự hơn てもらえませんか?', options: [option('more', 'Lịch sự hơn'), option('less', 'Kém lịch sự hơn'), option('same', 'Bằng nhau'), option('none', 'Không so sánh được')], correctOptionId: 'more', feedback: { correctAnswer: 'Lịch sự hơn', explanation: 'いただく là thể khiêm nhường, lịch sự hơn もらう — đúng cho cả cặp này.' } },
      { id: 'q9_3', prompt: 'かしこまりました và 了解しました khác nhau ở điểm nào?', options: [option('nuance', 'かしこまりました rất lịch sự (dịch vụ); 了解しました thân mật/thông thường hơn'), option('meaning', 'Nghĩa hoàn toàn khác nhau'), option('polite_less', '了解しました lịch sự hơn'), option('not_grant', 'Không dùng để đồng ý giúp')], correctOptionId: 'nuance', feedback: { correctAnswer: 'かしこまりました rất lịch sự (dịch vụ); 了解しました thân mật/thông thường hơn', explanation: 'Cả hai đều đáp \'được\' cho lời nhờ vả, chỉ khác mức lịch sự.' } },
      { id: 'q9_4', prompt: 'お願いします thường nói khi nào?', options: [option('after_ask', 'Kèm/kết thúc một lượt nhờ vả'), option('apologize', 'Khi xin lỗi'), option('grant', 'Khi đồng ý giúp'), option('surprise', 'Khi ngạc nhiên')], correctOptionId: 'after_ask', feedback: { correctAnswer: 'Kèm/kết thúc một lượt nhờ vả', explanation: 'お願いします là câu nhờ vả ngắn gọn, hay đi kèm hoặc kết thúc một lượt nhờ.' } },
      { id: 'q9_5', prompt: 'てくれませんか thuộc mức nào?', options: [option('casual2', 'Thân mật'), option('polite2', 'Lịch sự'), option('very_polite2', 'Rất lịch sự'), option('none2', 'Không thuộc mức nào')], correctOptionId: 'casual2', feedback: { correctAnswer: 'Thân mật', explanation: 'てくれませんか là mức thân mật trong ba cách nhờ vả.' } },
    ],
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '14:05',
      context: 'Hai đồng nghiệp nhắn tin, một người nhờ việc lịch sự, người kia đồng ý rất lịch sự. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ slotId: 'chat_moraemasenka_slot' }, { displayText: '。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ slotId: 'chat_kashikomari_slot' }, { displayText: '。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'ありがとうございます。' }] },
      ],
    },
    slots: [
      { id: 'chat_moraemasenka_slot', displayText: '資料（しりょう）を明日（あした）までに送（おく）ってもらえませんか', canonicalText: '資料を明日までに送ってもらえませんか', audioText: 'しりょうをあしたまでにおくってもらえませんか', acceptedAnswers: ['資料を明日までに送ってもらえませんか'] },
      { id: 'chat_kashikomari_slot', displayText: 'かしこまりました', canonicalText: 'かしこまりました', audioText: 'かしこまりました', acceptedAnswers: ['かしこまりました'] },
    ],
    feedback: { correctAnswer: '資料を明日までに送ってもらえませんか\nかしこまりました', canonicalAnswer: '資料を明日までに送ってもらえませんか／かしこまりました', audioText: 'しりょうをあしたまでに…／かしこまりました', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_moraemasenka_slot: { incorrectMessage: 'Ô này nhờ gửi tài liệu, lịch sự.', correctAnswer: '資料を明日までに送ってもらえませんか', explanation: 'Ô này nhờ gửi tài liệu, dùng thể てもらえませんか vì đồng nghiệp.' }, chat_kashikomari_slot: { incorrectMessage: 'Ô này đồng ý giúp, rất lịch sự.', correctAnswer: 'かしこまりました', explanation: 'Ô này đồng ý giúp, mức rất lịch sự bằng かしこまりました.' } } },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-11', order: 11, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu nhờ giúp mang đồ, thân mật. Có thẻ không cần dùng.',
    tokens: [token('nimotsu_wo', '荷物（にもつ）を', '荷物を'), token('hakonde', '運（はこ）んで', '運んで'), token('kurenai', 'くれない'), token('itadake_distractor', 'いただけ'), token('kashikomari_distractor', 'かしこまり')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'nimotsu_wo' },
      { id: 's2', expectedTokenId: 'hakonde' },
      { id: 's3', expectedTokenId: 'kurenai', afterText: '？' },
    ],
    unusedTokenIds: ['itadake_distractor', 'kashikomari_distractor'],
    feedback: { correctAnswer: '荷物を運んでくれない？', canonicalAnswer: '荷物を運んでくれない？', audioText: 'にもつをはこんでくれない', explanation: 'Nhờ vả thân mật dùng てくれない. いただけ quá lịch sự cho bạn thân, かしこまり không hợp câu nhờ (đó là câu ĐÁP).' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', 'A: 貸（か）してくれない？\nB: いいよ。'),
      option('mixed_up', 'A: 貸（か）していただけますか。\nB: いいよ。'),
      option('mixed_down', 'A: 貸（か）してくれない？\nB: かしこまりました。'),
      option('wrong_function', 'A: 本当（ほんとう）ですか。\nB: いいよ。'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: 'A: 貸（か）してくれない？\nB: いいよ。', explanation: 'A tự nhiên: cả hai giữ thể thân mật xuyên suốt. B lệch vì A hỏi rất lịch sự mà B đáp thân mật. C lệch tương tự, ngược lại. D sai chức năng hoàn toàn — A đang xác nhận tin bất ngờ chứ không nhờ vả.' },
  },
  {
    id: 'ja-daily_life-m02-u2-l2-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu nhờ vả rất lịch sự. Có thẻ không cần dùng.',
    tokens: [token('oshiete', '教えて'), token('itadakemasu', 'いただけます'), token('ka', 'か'), token('kurenai_distractor', 'くれない'), token('kashikomari_distractor', 'かしこまり')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'oshiete' },
      { id: 's2', expectedTokenId: 'itadakemasu' },
      { id: 's3', expectedTokenId: 'ka', afterText: '。' },
    ],
    unusedTokenIds: ['kurenai_distractor', 'kashikomari_distractor'],
    feedback: { correctAnswer: '教えていただけますか。', canonicalAnswer: '教えていただけますか。', audioText: 'おしえていただけますか', explanation: '教えて + いただけます + か → 教えていただけますか. くれない thân mật kém hơn, かしこまり không đi cùng câu nhờ.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // BA đoạn NGUYÊN VĂN: nhóm 1 turn6 (topic2.json:378, đã dùng ở Card 3) +
    // nhóm 2 turn5 (topic1.json:882, đã dùng ở Card 3) + nhóm 3 turns1-4
    // (topic1.json:839, đã dùng trọn ở Card 3) — tổng 1+1+4 = 6 lượt, trong
    // khoảng 6-8 của G14-R7. TRÁNH các lượt còn lại của nhóm 1/2 (この曲な
    // ら…CD…／…CDを持ってきます…／…アラはどうしますか…／…アラ汁…): dòng đọc
    // romaji tự sinh của Q14 (scripts/lib/japanese-pronunciation.mjs, độc
    // lập với furigana) không phân tích được token Latin đứng riêng "CD"
    // hoặc từ mượn katakana đứng riêng "アラ" (throw "could not analyze
    // token") — ngoài phạm vi sửa của PHA B (không tự sửa japanese-
    // pronunciation.mjs), nên chỉ lấy đúng 1 lượt sạch từ mỗi nhóm 1/2 thay
    // vì vá tooling. Card 3 dialogueGroups KHÔNG qua cùng pipeline này nên
    // vẫn giữ nguyên đủ cả 3 nhóm với "CD"/"アラ".
    id: 'ja-daily_life-m02-u2-l2-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Ba cách nhờ vả khác mức độ',
    scenarioDescription: 'Vai vế: ba tình huống khác nhau — một lần với đồng nghiệp, lịch sự; một lần với nhân viên cửa hàng cá, rất lịch sự; và một lần với bạn bè nhờ giúp làm rượu mơ, thân mật. Cùng là nhờ vả, nhưng mức lịch sự khác nhau tùy quan hệ.',
    characterIds: ['tanaka', 'ito', 'sato'],
    dialogueLines: [
      dialogueLine('tanaka', '本当ですか？貸してもらえませんか？', 'ほんとうですか？かしてもらえませんか？', 'Thật à? Cho tôi mượn được không?', 'ほんとうですか かしてもらえませんか'),
      dialogueLine('ito', 'お造りにしていただけますか？', 'おつくりにしていただけますか？', 'Làm sashimi giúp tôi được không ạ?', 'おつくりにしていただけますか'),
      dialogueLine('sato', '今日は暇ですか？', 'きょうはひまですか？', 'Hôm nay bạn rảnh không?', 'きょうはひまですか'),
      dialogueLine('ito', '休みですから暇ですよ。', 'やすみですからひまですよ。', 'Tôi nghỉ nên rảnh đấy.', 'やすみですから ひまですよ'),
      dialogueLine('sato', 'では、梅酒づくりを手伝ってくれませんか？', 'では、うめしゅづくりをてつだってくれませんか？', 'Vậy giúp tôi làm rượu mơ được không?', 'では うめしゅづくりを てつだってくれませんか'),
      dialogueLine('ito', 'もちろんです。なにをすればよいのですか？', 'もちろんです。なにをすればよいのですか？', 'Tất nhiên rồi. Tôi nên làm gì vậy?', 'もちろんです なにをすればよいのですか'),
    ],
    sceneDividers: [
      { afterDialogueLine: 1, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
      { afterDialogueLine: 2, targetText: 'べつの日（ひ）', translationByNative: vi('Một ngày khác') },
    ],
  },
];

const JA_M02_UNIT2_LESSON2_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Xin lỗi & nhờ vả',
    titleByNative: vi('Xin lỗi & nhờ vả'),
  },
  lesson: {
    title: 'Nhờ ai đó việc nhỏ',
    titleByNative: vi('Nhờ ai đó việc nhỏ'),
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
          'Nhờ vả lịch sự bằng ～てもらえませんか.',
          'Nhờ vả rất lịch sự bằng ～ていただけますか.',
          'Nhờ vả thân mật bằng ～てくれませんか.',
          'Đồng ý giúp bằng かしこまりました／了解しました／よいですよ (tuỳ mức lịch sự).',
          'Phản ứng khi nghe tin vui bằng 本当ですか.',
          'Nhờ vả ngắn gọn bằng お願いします.',
        ],
        situation: [
          'Ai đó cần nhờ người khác giúp một việc nhỏ.',
          'Bạn chọn đúng mức lịch sự và đúng cách nói theo tình huống.',
        ],
        examples: [
          { label: 'Nhờ vả, lịch sự:', ...line('', '貸してもらえませんか。', 'かしてもらえませんか。', 'Cho tôi mượn được không?', 'かしてもらえませんか') },
          { label: 'Nhờ vả, rất lịch sự:', ...line('', 'お造りにしていただけますか。', 'おつくりにしていただけますか。', 'Làm sashimi giúp tôi được không ạ?', 'おつくりにしていただけますか') },
          { label: 'Với bạn thân:', ...line('', '手伝ってくれませんか。', 'てつだってくれませんか。', 'Giúp tôi được không?', 'てつだってくれませんか') },
        ],
        importantNote: [
          'ていただけますか dùng thể khiêm nhường, lịch sự hơn てもらえませんか — mức nào cũng nhờ vả, khác nhau ở đối tượng.',
          'てくれませんか thân mật hơn てもらえませんか — cùng nhờ vả, khác mức trang trọng.',
          'かしこまりました／了解しました／よいですよ đều đáp \'được\' cho lời nhờ, chỉ khác mức lịch sự.',
        ],
      },
      vocabularyDetails: [
        { id: 'temo-moraemasenka', timingAndContext: ['Nhờ ai đó làm gì đó cho mình, mức lịch sự, thường dùng với đồng nghiệp/người quen.'], appropriateFor: ['Đồng nghiệp', 'Người quen', 'Bạn bè chưa quá thân'], avoid: [], register: 'Lịch sự.', formal: ['Cách trang trọng hơn:', '～ていただけますか', 'Dùng với:', 'Khách hàng', 'Cấp trên trong công việc'], casual: ['Cách thân mật:', '～てくれませんか', 'Dùng với:', 'Bạn bè', 'Gia đình'], overview: '...được không? (nhờ vả, lịch sự).', examples: [example('貸してもらえませんか。', 'かしてもらえませんか。', 'Cho tôi mượn được không?')] },
        { id: 'teitadakemasu-ka', timingAndContext: ['Nhờ ai đó làm gì đó cho mình, mức rất lịch sự — hợp khi nói với người lạ, khách hàng, cấp trên.'], appropriateFor: ['Người lạ', 'Khách hàng', 'Cấp trên'], avoid: ['Không dùng với bạn bè/gia đình — nghe quá xa cách.'], register: 'Trang trọng.', formal: [], casual: ['Cách trung tính hơn:', '～てもらえませんか', 'Dùng với:', 'Người đã quen'], overview: '...được không ạ? (nhờ vả, rất lịch sự).', examples: [example('お造りにしていただけますか。', 'おつくりにしていただけますか。', 'Làm sashimi giúp tôi được không ạ?')] },
        { id: 'tekuremasenka', timingAndContext: ['Nhờ ai đó làm gì đó cho mình, mức thân mật, giữa những người đã thân.'], appropriateFor: ['Bạn bè', 'Gia đình', 'Người ngang hàng đã thân'], avoid: ['Không dùng dạng thân mật này với thầy cô hoặc người trên.'], register: 'Thân mật.', formal: ['Cách trang trọng hơn:', '～てもらえませんか', 'Dùng với:', 'Đồng nghiệp', 'Người quen'], casual: [], overview: '...được không? (nhờ vả, thân mật).', examples: [example('梅酒づくりを手伝ってくれませんか。', 'うめしゅづくりをてつだってくれませんか。', 'Giúp tôi làm rượu mơ được không?')] },
        { id: 'kashikomarimashita', timingAndContext: ['Đồng ý giúp một cách rất lịch sự, thường dùng trong dịch vụ khách hàng, nơi làm việc.'], appropriateFor: ['Khách hàng', 'Cấp trên trong công việc', 'Tình huống trang trọng'], avoid: ['Không dùng với bạn bè/gia đình — nghe quá xa cách.'], register: 'Trang trọng.', formal: [], casual: ['Cách thân mật:', '了解しました', 'Dùng với:', 'Bạn bè', 'Gia đình'], overview: 'Vâng ạ, tôi hiểu rồi (đồng ý giúp, rất lịch sự).', examples: [example('アラも付けてください。アラ汁にしようと思います。', 'あらもつけてください。あらじるにしようとおもいます。', 'Xin thêm cả phần xương vào. Tôi định nấu canh xương cá.')], notes: ['Câu đáp かしこまりました của nhân viên nằm ngay sau lượt yêu cầu này trong hội thoại.'] },
        { id: 'ryoukai-shimashita', timingAndContext: ['Đồng ý giúp một cách thân mật/thông thường, không quá trang trọng cũng không quá suồng sã.'], appropriateFor: ['Bạn bè', 'Đồng nghiệp ngang hàng', 'Người quen'], avoid: [], register: '', formal: ['Cách trang trọng hơn:', 'かしこまりました', 'Dùng với:', 'Khách hàng', 'Cấp trên'], casual: [], overview: 'Được, tôi hiểu rồi (đồng ý giúp, thân mật/thông thường).', examples: [example('では、梅酒づくりを手伝ってくれませんか。', 'では、うめしゅづくりをてつだってくれませんか。', 'Vậy giúp tôi làm rượu mơ được không?')], notes: ['Câu đáp 了解しました của 伊藤 nằm ngay sau lượt hướng dẫn cụ thể trong hội thoại gốc.'] },
        { id: 'yoi-desu-yo', timingAndContext: ['Đồng ý giúp một cách trung tính, dứt khoát.'], appropriateFor: ['Mọi đối tượng ở mức trung tính'], avoid: [], register: '', formal: [], casual: [], overview: 'Được đấy (đồng ý giúp, trung tính).', examples: [example('よいですよ。明日、CDを持ってきますね。', 'よいですよ。あした、CDをもってきますね。', 'Được thôi. Mai tôi mang đĩa CD tới nhé.', 'よいですよ。あした、シーディーをもってきますね。')] },
        { id: 'hontou-desu-ka', timingAndContext: ['Phản ứng khi nghe một tin bất ngờ/vui, xác nhận lại.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Thật à? (phản ứng ngạc nhiên/vui).', examples: [example('本当ですか？貸してもらえませんか？', 'ほんとうですか？かしてもらえませんか？', 'Thật à? Cho tôi mượn được không?')] },
        { id: 'onegai-shimasu', timingAndContext: ['Câu nhờ vả ngắn gọn, hay đi kèm hoặc kết thúc một lượt nhờ.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Xin nhờ / làm ơn (nhờ vả ngắn gọn).', examples: [example('お願いします。', 'おねがいします。', 'Xin nhờ nhé.')] },
        { id: 'kasu', timingAndContext: ['Cho ai đó mượn một vật gì đó — dạng từ điển của động từ.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Cho mượn (dạng từ điển).', examples: [example('貸してもらえませんか。', 'かしてもらえませんか。', 'Cho tôi mượn được không?')], notes: ['Dạng từ điển 貸す — mức lịch sự nằm ở cách chia đi kèm: 貸してもらえませんか (lịch sự) ・ 貸してくれない？ (thân mật).'] },
        { id: 'tetsudau', timingAndContext: ['Giúp ai đó làm một việc gì đó — dạng từ điển của động từ.'], appropriateFor: ['Mọi đối tượng'], avoid: [], register: '', formal: [], casual: [], overview: 'Giúp đỡ (dạng từ điển).', examples: [example('梅酒づくりを手伝ってくれませんか。', 'うめしゅづくりをてつだってくれませんか。', 'Giúp tôi làm rượu mơ được không?')], notes: ['Dạng từ điển 手伝う — mức lịch sự nằm ở cách chia đi kèm: 手伝ってもらえませんか (lịch sự) ・ 手伝ってくれませんか (thân mật).'] },
      ],
      vocabularyReferences: [
        { term: '曲（きょく）', reading: 'きょく', speechText: 'きょく', meaning: 'Bài hát, bản nhạc.', register: '', example: example('この曲なら、家にCDがありますよ。', 'このきょくなら、いえにCDがありますよ。', 'Bài này thì nhà tôi có đĩa CD đấy.', 'このきょくなら、いえにシーディーがありますよ。') },
        { term: '造（つく）り', reading: 'つくり', speechText: 'つくり', meaning: 'Cách làm, món ăn được làm (trong お造り = món sashimi).', register: '', example: example('お造りにしていただけますか。', 'おつくりにしていただけますか。', 'Làm sashimi giúp tôi được không ạ?') },
        { term: '汁（じる）', reading: 'じる', speechText: 'じる', meaning: 'Canh, nước dùng.', register: '', example: example('アラ汁にしようと思います。', 'あらじるにしようとおもいます。', 'Tôi định nấu canh xương cá.') },
        { term: '思（おも）い', reading: 'おもい', speechText: 'おもい', meaning: 'Nghĩ, định (trong 思います = tôi nghĩ/tôi định).', register: '', example: example('アラ汁にしようと思います。', 'あらじるにしようとおもいます。', 'Tôi định nấu canh xương cá.') },
        { term: '梅酒（うめしゅ）', reading: 'うめしゅ', speechText: 'うめしゅ', meaning: 'Rượu mơ.', register: '', example: example('梅酒づくりを手伝ってくれませんか。', 'うめしゅづくりをてつだってくれませんか。', 'Giúp tôi làm rượu mơ được không?') },
        { term: 'づくり', reading: 'づくり', speechText: 'づくり', meaning: 'Việc làm/chế biến ra (hậu tố ghép sau danh từ, như 梅酒づくり = làm rượu mơ).', register: '', example: example('梅酒づくりを手伝ってくれませんか。', 'うめしゅづくりをてつだってくれませんか。', 'Giúp tôi làm rượu mơ được không?') },
        { term: 'ば', reading: 'ば', speechText: 'ば', meaning: 'Nếu... thì (thể giả định).', register: '', example: example('なにをすればよいのですか。', 'なにをすればよいのですか。', 'Tôi nên làm gì vậy?') },
      ],
      dialogueGroups: [
        {
          id: 'favor-polite', title: 'Lịch sự — nhờ mượn CD', situation: 'Vai vế: hai người quen (đồng nghiệp/bạn), giữ thể lịch sự. 田中 muốn mượn đĩa CD từ 伊藤.',
          lines: [
            dialogueLine('ito', 'この曲なら、家にCDがありますよ。', 'このきょくなら、いえにCDがありますよ。', 'Bài này thì nhà tôi có đĩa CD đấy.', 'このきょくなら、いえにシーディーがありますよ'),
            dialogueLine('tanaka', '本当ですか？貸してもらえませんか？', 'ほんとうですか？かしてもらえませんか？', 'Thật à? Cho tôi mượn được không?', 'ほんとうですか かしてもらえませんか'),
            dialogueLine('ito', 'よいですよ。明日、CDを持ってきますね。', 'よいですよ。あした、CDをもってきますね。', 'Được thôi. Mai tôi mang đĩa CD tới nhé.', 'よいですよ あした シーディーをもってきますね'),
            dialogueLine('tanaka', 'ありがとうございます。助かります。', 'ありがとうございます。たすかります。', 'Cảm ơn bạn. Giúp mình nhiều lắm.', 'ありがとうございます たすかります'),
          ],
          explanation: ['貸してもらえませんか dùng để nhờ vả lịch sự — hợp với quan hệ đồng nghiệp/bạn bè chưa quá thân.', '助かります là câu cảm ơn khi được giúp — đã học ở bài trước (m02-u1-l1), tái dùng ở đây để đáp lại lời nhờ được đồng ý.'],
        },
        {
          id: 'favor-very-polite', title: 'Rất lịch sự — nhờ nhân viên cửa hàng cá', situation: 'Vai vế: khách và nhân viên cửa hàng cá, chưa quen biết — cả hai giữ thể rất lịch sự. Khách nhờ nhân viên làm sashimi.',
          lines: [
            dialogueLine('ito', 'お造りにしていただけますか？', 'おつくりにしていただけますか？', 'Làm sashimi giúp tôi được không ạ?', 'おつくりにしていただけますか'),
            dialogueLine('tanaka', 'はい。アラはどうしますか？', 'はい。あらはどうしますか？', 'Vâng. Phần xương thì làm sao ạ?', 'はい あらはどうしますか'),
            dialogueLine('ito', 'アラも付けてください。アラ汁にしようと思います。', 'あらもつけてください。あらじるにしようとおもいます。', 'Xin thêm cả phần xương vào. Tôi định nấu canh xương cá.', 'あらもつけてください あらじるにしようとおもいます'),
            dialogueLine('tanaka', 'かしこまりました。', 'かしこまりました。', 'Vâng ạ, tôi hiểu rồi.', 'かしこまりました'),
          ],
          explanation: ['お造りにしていただけますか rất lịch sự — hợp với quan hệ khách hàng/nhân viên chưa quen biết.', 'かしこまりました là cách nhân viên đồng ý một cách rất lịch sự — mức lịch sự cao nhất trong ba cách đồng ý giúp đã học ở bài này.'],
        },
        {
          id: 'favor-casual', title: 'Thân mật — nhờ bạn giúp làm rượu mơ', situation: 'Vai vế: hai người bạn thân — thân mật. 佐藤 nhờ 伊藤 giúp làm rượu mơ.',
          lines: [
            dialogueLine('sato', '今日は暇ですか？', 'きょうはひまですか？', 'Hôm nay bạn rảnh không?', 'きょうはひまですか'),
            dialogueLine('ito', '休みですから暇ですよ。', 'やすみですからひまですよ。', 'Tôi nghỉ nên rảnh đấy.', 'やすみですから ひまですよ'),
            dialogueLine('sato', 'では、梅酒づくりを手伝ってくれませんか？', 'では、うめしゅづくりをてつだってくれませんか？', 'Vậy giúp tôi làm rượu mơ được không?', 'では うめしゅづくりを てつだってくれませんか'),
            dialogueLine('ito', 'もちろんです。なにをすればよいのですか？', 'もちろんです。なにをすればよいのですか？', 'Tất nhiên rồi. Tôi nên làm gì vậy?', 'もちろんです なにをすればよいのですか'),
          ],
          explanation: ['手伝ってくれませんか (thân mật) khác 手伝っていただけますか (rất lịch sự, dùng ở nhóm trước) — bạn bè thân mật thì dùng thể ngắn gọn hơn.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'てもらえませんか ↔ ていただけますか ↔ てくれませんか', formula: '［どうしのてけい］＋ もらえませんか ／ いただけますか ／ くれませんか', formulaReading: '［どうしのてけい］＋ もらえませんか ／ いただけますか ／ くれませんか', meaning: 'Cùng ý nhờ vả, ba mức lịch sự khác nhau.',
          examples: [example('貸してもらえませんか。', 'かしてもらえませんか。', 'Cho tôi mượn được không?'), example('お造りにしていただけますか。', 'おつくりにしていただけますか。', 'Làm sashimi giúp tôi được không ạ?'), example('手伝ってくれませんか。', 'てつだってくれませんか。', 'Giúp tôi được không?')],
          explanation: ['てくれませんか dùng với bạn bè/người thân; てもらえませんか dùng khi cần lịch sự; ていただけますか lịch sự nhất, hay dùng với người lạ/khách hàng/cấp trên.'],
        },
        {
          title: '～てくれる (đứng riêng, ai đó làm gì cho mình)', formula: '［người khác］が＋［động từ thể て］＋ くれる', formulaReading: '［ひと］が＋［どうしのてけい］＋ くれる', meaning: 'Ai đó làm một việc gì đó cho mình (câu kể, không phải câu hỏi).',
          examples: [example('母がお弁当を作ってくれた。', 'ははがおべんとうをつくってくれた。', 'Mẹ đã làm cơm hộp cho tôi.'), example('友達が買い物をしてくれました。', 'ともだちがかいものをしてくれました。', 'Bạn tôi đã đi chợ giúp tôi.')],
          explanation: ['Đây là câu KỂ về việc ai đó làm giúp mình — khác với てくれませんか, vốn là câu HỎI để nhờ vả.'],
        },
        {
          title: 'かしこまりました ↔ 了解しました ↔ よいですよ', formula: 'かしこまりました ／ 了解（りょうかい）しました ／ よいですよ', formulaReading: 'かしこまりました ／ りょうかいしました ／ よいですよ', meaning: 'Ba cách đồng ý giúp, cùng ý nghĩa chấp thuận.',
          examples: [example('かしこまりました。', 'かしこまりました。', 'Vâng ạ, tôi hiểu rồi.'), example('了解しました。', 'りょうかいしました。', 'Được, tôi hiểu rồi.'), example('よいですよ。', 'よいですよ。', 'Được đấy.')],
          explanation: ['Cả ba đều đáp \'được\' cho một lời nhờ vả — かしこまりました rất lịch sự (dịch vụ), 了解しました thân mật/thông thường hơn, よいですよ trung tính.'],
        },
        {
          title: '本当ですか (đứng riêng, phản ứng ngạc nhiên)', formula: '本当（ほんとう）ですか', formulaReading: 'ほんとうですか', meaning: 'Phản ứng khi nghe một tin bất ngờ/vui, xác nhận lại.',
          examples: [example('本当ですか？貸してもらえませんか？', 'ほんとうですか？かしてもらえませんか？', 'Thật à? Cho tôi mượn được không?')],
          explanation: ['本当ですか thường đứng ở đầu câu, trước khi nói tiếp — không phải câu nhờ vả hay xin lỗi.'],
        },
        {
          title: 'お願いします (đứng riêng, nhờ vả ngắn gọn)', formula: 'お願（ねが）いします', formulaReading: 'おねがいします', meaning: 'Câu nhờ vả ngắn gọn, hay đi kèm hoặc kết thúc một lượt nhờ.',
          examples: [example('お願いします。', 'おねがいします。', 'Xin nhờ nhé.')],
          explanation: ['お願いします không nêu rõ việc nhờ là gì — thường dùng SAU khi đã nói rõ việc cần nhờ, hoặc khi ngữ cảnh đã đủ rõ.'],
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
    { id: 'temo-moraemasenka', displayText: '～てもらえませんか', reading: 'てもらえませんか', romanization: 'temoraemasenka', speechText: 'てもらえませんか', meaningVi: '...được không? (nhờ vả, lịch sự).', translationByNative: vi('...được không? (nhờ vả, lịch sự).'), translations: vi('...được không? (nhờ vả, lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'teitadakemasu-ka', displayText: '～ていただけますか', reading: 'ていただけますか', romanization: 'teitadakemasu ka', speechText: 'ていただけますか', meaningVi: '...được không ạ? (nhờ vả, rất lịch sự).', translationByNative: vi('...được không ạ? (nhờ vả, rất lịch sự).'), translations: vi('...được không ạ? (nhờ vả, rất lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'tekuremasenka', displayText: '～てくれませんか', reading: 'てくれませんか', romanization: 'tekuremasen ka', speechText: 'てくれませんか', meaningVi: '...được không? (nhờ vả, thân mật).', translationByNative: vi('...được không? (nhờ vả, thân mật).'), translations: vi('...được không? (nhờ vả, thân mật).'), audioLocale: 'ja-JP' },
    { id: 'kashikomarimashita', displayText: 'かしこまりました', reading: 'かしこまりました', romanization: 'kashikomarimashita', speechText: 'かしこまりました', meaningVi: 'Vâng ạ, tôi hiểu rồi (đồng ý giúp, rất lịch sự).', translationByNative: vi('Vâng ạ, tôi hiểu rồi (đồng ý giúp, rất lịch sự).'), translations: vi('Vâng ạ, tôi hiểu rồi (đồng ý giúp, rất lịch sự).'), audioLocale: 'ja-JP' },
    { id: 'ryoukai-shimashita', displayText: '了解（りょうかい）しました', reading: 'りょうかいしました', romanization: 'ryoukai shimashita', speechText: 'りょうかいしました', meaningVi: 'Được, tôi hiểu rồi (đồng ý giúp, thân mật/thông thường).', translationByNative: vi('Được, tôi hiểu rồi (đồng ý giúp, thân mật/thông thường).'), translations: vi('Được, tôi hiểu rồi (đồng ý giúp, thân mật/thông thường).'), audioLocale: 'ja-JP' },
    { id: 'yoi-desu-yo', displayText: 'よいですよ', reading: 'よいですよ', romanization: 'yoi desu yo', speechText: 'よいですよ', meaningVi: 'Được đấy (đồng ý giúp, trung tính).', translationByNative: vi('Được đấy (đồng ý giúp, trung tính).'), translations: vi('Được đấy (đồng ý giúp, trung tính).'), audioLocale: 'ja-JP' },
    { id: 'hontou-desu-ka', displayText: '本当（ほんとう）ですか', reading: 'ほんとうですか', romanization: 'hontou desu ka', speechText: 'ほんとうですか', meaningVi: 'Thật à? (phản ứng ngạc nhiên/vui).', translationByNative: vi('Thật à? (phản ứng ngạc nhiên/vui).'), translations: vi('Thật à? (phản ứng ngạc nhiên/vui).'), audioLocale: 'ja-JP' },
    { id: 'onegai-shimasu', displayText: 'お願（ねが）いします', reading: 'おねがいします', romanization: 'onegai shimasu', speechText: 'おねがいします', meaningVi: 'Xin nhờ / làm ơn (nhờ vả ngắn gọn).', translationByNative: vi('Xin nhờ / làm ơn (nhờ vả ngắn gọn).'), translations: vi('Xin nhờ / làm ơn (nhờ vả ngắn gọn).'), audioLocale: 'ja-JP' },
    { id: 'kasu', displayText: '貸（か）す', reading: 'かす', romanization: 'kasu', speechText: 'かす', meaningVi: 'Cho mượn (dạng từ điển).', translationByNative: vi('Cho mượn (dạng từ điển).'), translations: vi('Cho mượn (dạng từ điển).'), audioLocale: 'ja-JP' },
    { id: 'tetsudau', displayText: '手伝（てつだ）う', reading: 'てつだう', romanization: 'tetsudau', speechText: 'てつだう', meaningVi: 'Giúp đỡ (dạng từ điển).', translationByNative: vi('Giúp đỡ (dạng từ điển).'), translations: vi('Giúp đỡ (dạng từ điển).'), audioLocale: 'ja-JP' },
  ],
};

export const JA_M02_UNIT2_LESSON2 = localizeSupport(JA_M02_UNIT2_LESSON2_SOURCE);
