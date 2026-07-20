import {
  localizeGoldenSupport,
  supportTextByVietnamese,
} from './ja-unit1-lesson1-localization.mjs';

const vi = (value) => supportTextByVietnamese.get(value) ?? { vi: value };
const speakerReadings = { '先生': 'せんせい', '田中': 'たなか', '佐藤': 'さとう' };

// Card 3 names are source data. Future lessons must supply locale and cultural
// context explicitly; a renderer must never infer a country from a language.
const approvedCharacterNamePool = [
  { id: 'teacher', displayName: '先生（せんせい）', canonicalName: '先生', audioName: 'せんせい' },
  { id: 'tanaka', displayName: '田中（たなか）', canonicalName: '田中', audioName: 'たなか' },
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
  // The Flutter dialogue renderer resolves this ID through
  // approvedCharacterNamePool rather than owning character names.
  speaker: undefined,
  speakerReading: undefined,
});

// Owner decision (2026-07-19): every vocabulary example must carry audio
// (speech) so the UI can render a per-example speaker button (LESSON_AUTHORING_
// STANDARD.md §C1/§D8). speechText defaults to the example's already-authored
// kana `reading` (pure kana is the safe TTS surface for Japanese) — no reading
// is invented here; each call already supplies its kana reading.
const example = (text, reading, translation, speechText = reading) => ({ text, reading, translation, speechText });
const option = (id, text, canonicalText = text, audioText = canonicalText) => ({ id, text, canonicalText, audioText });
const token = (id, text, canonicalText = text, audioText = canonicalText) => ({ id, text, canonicalText, audioText });

// Approved trial data for Card 5 only. It is intentionally scoped to this
// Japanese Daily Life lesson and is not a default exercise format.
const PRACTICE_EXERCISES = [
  {
    id: 'ja-daily_life-m01-u1-l1-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    prompt: 'こんにちは có nghĩa phù hợp nhất là gì?',
    options: [option('hello_daytime', 'Xin chào'), option('good_morning', 'Chào buổi sáng'), option('good_evening', 'Chào buổi tối'), option('goodbye', 'Tạm biệt')],
    correctOptionId: 'hello_daytime',
    feedback: { correctAnswer: 'Xin chào', explanation: 'こんにちは là lời chào thường dùng vào ban ngày.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    prompt: 'Câu nào có nghĩa là “Chào buổi tối”?',
    options: [option('good_evening', 'こんばんは'), option('hello_daytime', 'こんにちは'), option('good_morning', 'おはようございます'), option('first_meeting', 'はじめまして')],
    correctOptionId: 'good_evening',
    feedback: { correctAnswer: 'こんばんは', explanation: 'こんばんは được dùng để chào vào buổi tối.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu tiếng Nhật với nghĩa phù hợp.',
    pairs: [
      { id: 'morning', left: { id: 'ohayo', text: 'おはようございます' }, right: { id: 'morning_meaning', text: 'Chào buổi sáng' } },
      { id: 'daytime', left: { id: 'konnichiwa', text: 'こんにちは' }, right: { id: 'daytime_meaning', text: 'Xin chào' } },
      { id: 'evening', left: { id: 'konbanwa', text: 'こんばんは' }, right: { id: 'evening_meaning', text: 'Chào buổi tối' } },
      { id: 'first_meeting', left: { id: 'hajimemashite', text: 'はじめまして' }, right: { id: 'first_meeting_meaning', text: 'Lời chào khi gặp ai đó lần đầu' } },
    ],
    feedback: { explanation: 'Mỗi lời chào gắn với một thời điểm hoặc tình huống làm quen cụ thể.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp các thẻ thành câu “Tôi là Tanaka.”',
    tokens: [token('watashi', '私（わたし）', '私', 'わたし'), token('topic_wa', 'は'), token('tanaka', '田中（たなか）', '田中', 'たなか'), token('desu', 'です'), token('period', '。')],
    correctTokenIds: ['watashi', 'topic_wa', 'tanaka', 'desu', 'period'],
    feedback: { correctAnswer: '私（わたし）は田中（たなか）です。', canonicalAnswer: '私は田中です。', audioText: 'わたしはたなかです。', explanation: '私（わたし）は “tôi”. は đánh dấu chủ đề. です kết thúc câu một cách lịch sự.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    prompt: 'Điền hai chỗ trống để hoàn thành hội thoại.',
    dialogue: ['A: はじめまして。私（わたし）は田中（たなか）です。', 'B: {{slot_1}}。私（わたし）は佐藤（さとう）です。{{slot_2}}。'],
    slots: [
      { id: 'slot_1', answerId: 'hajimemashite', placeholder: '________' },
      { id: 'slot_2', answerId: 'yoroshiku_onegaishimasu', placeholder: '________' },
    ],
    wordBank: [option('yoroshiku_onegaishimasu', 'よろしくお願（ねが）いします', 'よろしくお願いします', 'よろしくおねがいします'), option('konbanwa', 'こんばんは'), option('hajimemashite', 'はじめまして')],
    feedback: { correctAnswer: 'はじめまして。私（わたし）は佐藤（さとう）です。よろしくお願（ねが）いします。', canonicalAnswer: 'はじめまして。私は佐藤です。よろしくお願いします。', audioText: 'はじめまして。わたしはさとうです。よろしくおねがいします。', explanation: 'Khi gặp nhau lần đầu, cả hai người đều có thể nói はじめまして。 Sau khi giới thiệu tên, よろしくお願（ねが）いします là câu kết tự nhiên và lịch sự.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe thấy câu nào?', audioText: 'おはようございます。わたしはたなかです。',
    options: [
      option('audio_morning_tanaka', 'おはようございます。私（わたし）は田中（たなか）です。'),
      option('audio_daytime_sato', 'こんにちは。私（わたし）は佐藤（さとう）です。'),
      option('audio_evening_tanaka', 'こんばんは。田中（たなか）さんです。'),
      option('audio_first_tanaka', 'はじめまして。私（わたし）は田中（たなか）さんです。'),
    ],
    correctOptionId: 'audio_morning_tanaka',
    feedback: { correctAnswer: 'おはようございます。私（わたし）は田中（たなか）です。', canonicalAnswer: 'おはようございます。私は田中です。', audioText: 'おはようございます。わたしはたなかです。', explanation: 'Audio gồm: おはようございます。 Chào buổi sáng. 私（わたし）は田中（たなか）です。 Tôi là Tanaka.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    prompt: 'Chọn từ phù hợp:\n\n私（わたし）は田中（たなか） ______。',
    options: [option('desu', 'です'), option('san', 'さん'), option('topic_wa', 'は'), option('konnichiwa', 'こんにちは')],
    correctOptionId: 'desu',
    feedback: { correctAnswer: '私（わたし）は田中（たなか）です。', canonicalAnswer: '私は田中です。', audioText: 'わたしはたなかです。', explanation: 'です đứng cuối câu để nói “là…” một cách lịch sự.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    context: 'Người đối diện nói:\n\nはじめまして。私（わたし）は田中（たなか）です。',
    prompt: 'Bạn nên trả lời thế nào?',
    options: [
      option('first_meeting_reply', 'はじめまして。私（わたし）は佐藤（さとう）です。よろしくお願（ねが）いします。'),
      option('good_night', 'おやすみなさい。'),
      option('meal_start', 'いただきます。'),
      option('goodbye', 'さようなら。'),
    ],
    correctOptionId: 'first_meeting_reply',
    feedback: { correctAnswer: 'はじめまして。私（わたし）は佐藤（さとう）です。よろしくお願（ねが）いします。', canonicalAnswer: 'はじめまして。私は佐藤です。よろしくお願いします。', audioText: 'はじめまして。わたしはさとうです。よろしくおねがいします。', explanation: 'Người đối diện đang gặp bạn lần đầu và giới thiệu tên. Câu trả lời phù hợp là chào lại, giới thiệu tên và kết thúc bằng よろしくお願（ねが）いします。' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'おはようございます thường dùng khi nào?', options: [option('morning', 'Buổi sáng'), option('evening', 'Buổi tối'), option('goodbye', 'Khi tạm biệt'), option('sleep', 'Trước khi đi ngủ')], correctOptionId: 'morning', feedback: { correctAnswer: 'Buổi sáng', explanation: 'おはようございます là lời chào lịch sự vào buổi sáng.' } },
      { id: 'q9_2', prompt: 'こんにちは phù hợp nhất trong tình huống nào?', options: [option('daytime_greeting', 'Chào ai đó vào ban ngày'), option('sleep_wish', 'Chúc ai đó ngủ ngon'), option('meal_thanks', 'Cảm ơn sau bữa ăn'), option('phone_call', 'Gọi điện thoại')], correctOptionId: 'daytime_greeting', feedback: { correctAnswer: 'Chào ai đó vào ban ngày', explanation: 'こんにちは là lời chào thường dùng vào ban ngày.' } },
      { id: 'q9_3', prompt: 'こんばんは có nghĩa là gì?', options: [option('evening_greeting', 'Chào buổi tối'), option('morning_greeting', 'Chào buổi sáng'), option('see_you', 'Hẹn gặp lại'), option('sorry', 'Xin lỗi')], correctOptionId: 'evening_greeting', feedback: { correctAnswer: 'Chào buổi tối', explanation: 'こんばんは được dùng để chào vào buổi tối.' } },
      { id: 'q9_4', prompt: 'Khi gặp một người lần đầu, nên dùng câu nào?', options: [option('first_meeting', 'はじめまして'), option('good_night', 'おやすみなさい'), option('goodbye', 'さようなら'), option('meal_start', 'いただきます')], correctOptionId: 'first_meeting', feedback: { correctAnswer: 'はじめまして', explanation: 'はじめまして được dùng khi bắt đầu làm quen với ai đó lần đầu.' } },
      { id: 'q9_5', prompt: 'さん được dùng như thế nào?', options: [option('after_other_name', 'Đặt sau tên người khác để gọi một cách lịch sự'), option('before_own_name', 'Đặt trước tên của chính mình'), option('morning_greeting', 'Dùng để chào buổi sáng'), option('end_every_sentence', 'Dùng để kết thúc mọi câu')], correctOptionId: 'after_other_name', feedback: { correctAnswer: 'Đặt sau tên người khác để gọi một cách lịch sự', explanation: 'さん thường được đặt sau tên người khác. Ví dụ: 佐藤（さとう）さん. Thông thường không tự thêm さん vào tên của chính mình khi giới thiệu.' } },
    ],
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '11:00',
      context: 'Hai người gặp nhau lần đầu. Hãy nhập từ phù hợp vào hai ô trống để hoàn thành cuộc trò chuyện.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ slotId: 'chat_greeting_slot' }, { displayText: '。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ displayText: 'こんにちは。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'はじめまして。\n私（わたし）は田中（たなか）です。', canonicalText: 'はじめまして。私は田中です。', audioText: 'はじめまして。わたしはたなかです。' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ displayText: 'はじめまして。\n私（わたし）は佐藤（さとう）です。', canonicalText: 'はじめまして。私は佐藤です。', audioText: 'はじめまして。わたしはさとうです。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ displayText: '佐藤（さとう）さん、\nよろしくお願（ねが）いします。', canonicalText: '佐藤さん、よろしくお願いします。', audioText: 'さとうさん、よろしくおねがいします。' }] },
        { id: 'message_6', speakerId: 'b', segments: [{ displayText: '田中（たなか）さん、\n' }, { slotId: 'chat_closing_slot' }, { displayText: '。' }] },
      ],
    },
    slots: [
      { id: 'chat_greeting_slot', displayText: 'こんにちは', canonicalText: 'こんにちは', audioText: 'こんにちは', acceptedAnswers: ['こんにちは', 'コンニチハ', 'konnichiwa'] },
      { id: 'chat_closing_slot', displayText: 'よろしくお願（ねが）いします', canonicalText: 'よろしくお願いします', audioText: 'よろしくおねがいします', acceptedAnswers: ['よろしくお願いします', 'よろしくおねがいします', '宜しくお願いします', 'yoroshiku onegaishimasu', 'yoroshiku onegai shimasu'] },
    ],
    feedback: { correctAnswer: 'こんにちは。\nよろしくお願（ねが）いします。', canonicalAnswer: 'こんにちは。\nよろしくお願いします。', audioText: 'こんにちは。\nよろしくおねがいします。', correctMessage: 'Bạn làm tốt lắm!\nHãy tiếp tục cố gắng ở phần tiếp theo nhé.', slotFeedback: { chat_greeting_slot: { incorrectMessage: 'Ô đầu tiên chưa phù hợp với thời điểm của cuộc trò chuyện.', correctAnswer: 'こんにちは', explanation: 'Cuộc trò chuyện diễn ra lúc 11:00. Trong tình huống này, こんにちは là lời chào phù hợp.' }, chat_closing_slot: { incorrectMessage: 'Câu kết của đoạn làm quen chưa chính xác.', correctAnswer: 'よろしくお願（ねが）いします', canonicalAnswer: 'よろしくお願いします', audioText: 'よろしくおねがいします', explanation: 'Sau khi hai người giới thiệu tên, よろしくお願（ねが）いします được dùng để kết thúc phần làm quen một cách lịch sự.' } } },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-11', order: 11, plan: 'plus', type: 'multiple_choice',
    context: 'Buổi sáng, bạn gặp giáo viên lần đầu. Cách nói nào tự nhiên và lịch sự nhất?',
    prompt: 'Chọn câu phù hợp nhất.',
    options: [
      option('morning_first_meeting_full', 'おはようございます。はじめまして。私（わたし）は田中（たなか）です。よろしくお願（ねが）いします。'),
      option('evening_name', 'こんばんは。私（わたし）は田中（たなか）です。'),
      option('goodbye_san', 'さようなら。田中（たなか）さんです。'),
      option('daytime_goodnight', 'こんにちは。おやすみなさい。'),
    ],
    correctOptionId: 'morning_first_meeting_full',
    feedback: { correctAnswer: 'おはようございます。はじめまして。私（わたし）は田中（たなか）です。よろしくお願（ねが）いします。', canonicalAnswer: 'おはようございます。はじめまして。私は田中です。よろしくお願いします。', audioText: 'おはようございます。はじめまして。わたしはたなかです。よろしくおねがいします。', explanation: 'Đây là buổi sáng nên bắt đầu bằng おはようございます。 Vì gặp lần đầu nên dùng はじめまして, sau đó giới thiệu tên và kết thúc bằng よろしくお願（ねが）いします。' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Câu nào là một lời tự giới thiệu hoàn chỉnh và tự nhiên?',
    options: [
      option('natural_self_introduction', 'はじめまして。私（わたし）は田中（たなか）です。よろしくお願（ねが）いします。'),
      option('unnatural_order', 'よろしくお願いします。私はです田中。'),
      option('name_reversal', '田中（たなか）さんは私（わたし）です。'),
      option('unrelated_greetings', 'こんばんは。はじめまして。さようなら。'),
    ],
    correctOptionId: 'natural_self_introduction',
    feedback: { correctAnswer: 'はじめまして。私（わたし）は田中（たなか）です。よろしくお願（ねが）いします。', canonicalAnswer: 'はじめまして。私は田中です。よろしくお願いします。', audioText: 'はじめまして。わたしはたなかです。よろしくおねがいします。', explanation: 'Một lời tự giới thiệu cơ bản gồm: 1. はじめまして。 2. 私（わたし）は田中（たなか）です。 3. よろしくお願（ねが）いします。' },
  },
  {
    id: 'ja-daily_life-m01-u1-l1-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Hoàn thành lời tự giới thiệu. Chọn từng ô trống, rồi chọn thẻ phù hợp. Có một thẻ không cần dùng.',
    tokens: [token('hajimemashite', 'はじめまして'), token('watashi', '私（わたし）', '私', 'わたし'), token('topic_wa', 'は'), token('tanaka', '田中（たなか）', '田中', 'たなか'), token('desu', 'です'), token('yoroshiku_onegaishimasu', 'よろしくお願（ねが）いします', 'よろしくお願いします', 'よろしくおねがいします'), token('konbanwa_distractor', 'こんばんは')],
    answerSlots: [
      { id: 'intro', expectedTokenId: 'hajimemashite', afterText: '。' },
      { id: 'subject', expectedTokenId: 'watashi' },
      { id: 'topic', expectedTokenId: 'topic_wa' },
      { id: 'name', expectedTokenId: 'tanaka' },
      { id: 'copula', expectedTokenId: 'desu', afterText: '。' },
      { id: 'closing', expectedTokenId: 'yoroshiku_onegaishimasu', afterText: '。' },
    ],
    unusedTokenIds: ['konbanwa_distractor'],
    feedback: { correctAnswer: 'はじめまして。私（わたし）は田中（たなか）です。よろしくお願（ねが）いします。', canonicalAnswer: 'はじめまして。私は田中です。よろしくお願いします。', audioText: 'はじめまして。わたしはたなかです。よろしくおねがいします。', explanation: 'こんばんは là lời chào buổi tối, nhưng không cần thiết trong lời tự giới thiệu được yêu cầu ở câu này. Câu hoàn chỉnh gồm lời chào khi gặp lần đầu, tên người nói và câu kết lịch sự.' },
  },
  {
    // Lesson Format 3.0 — breaking change for Q14 only (Owner-approved
    // 2026-07-15). Non-graded advanced dialogue: read, listen, repeat.
    // Q1–Q13 above are unchanged Format 2.0 content. See
    // .cursor/rules/04_novalang_lesson_format_3_0.mdc and ADR-012.
    id: 'ja-daily_life-m01-u1-l1-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Hỏi đường đến ký túc xá',
    scenarioDescription: 'Buổi tối, du học sinh Tanaka không dùng được điện thoại nên không biết đường đến ký túc xá Sakura. Tanaka gặp Sato và hỏi đường. Sato dẫn Tanaka đến nơi.',
    characterIds: ['tanaka', 'sato'],
    dialogueLines: [
      dialogueLine('tanaka', 'こんばんは。すみません、ちょっとよろしいですか。', 'こんばんは。すみません、ちょっとよろしいですか。', 'Chào buổi tối. Xin lỗi, tôi có thể hỏi bạn một chút được không?', 'こんばんは。すみません、ちょっとよろしいですか。'),
      dialogueLine('sato', 'こんばんは。はい、どうしましたか。', 'こんばんは。はい、どうしましたか。', 'Chào buổi tối. Vâng, có chuyện gì vậy?', 'こんばんは。はい、どうしましたか。'),
      dialogueLine('tanaka', 'はじめまして。留学生の田中です。すみませんが、実は、スマホが使えなくて、道がわからないんです。', 'はじめまして。りゅうがくせいのたなかです。すみませんが、じつは、スマホがつかえなくて、みちがわからないんです。', 'Rất vui được gặp bạn. Tôi là Tanaka, du học sinh. Xin lỗi, thật ra điện thoại của tôi không dùng được nên tôi không biết đường.', 'はじめまして。りゅうがくせいのたなかです。すみませんが、じつは、スマホがつかえなくて、みちがわからないんです。'),
      dialogueLine('sato', 'あ、留学生なんですね。はじめまして。佐藤です。', 'あ、りゅうがくせいなんですね。はじめまして。さとうです。', 'À, bạn là du học sinh à. Rất vui được gặp bạn. Tôi là Sato.', 'あ、りゅうがくせいなんですね。はじめまして。さとうです。'),
      dialogueLine('sato', 'それは大変ですね。どこへ行きたいんですか。', 'それはたいへんですね。どこへいきたいんですか。', 'Thế thì khó khăn quá. Bạn muốn đi đâu?', 'それはたいへんですね。どこへいきたいんですか。'),
      dialogueLine('tanaka', 'さくら寮です。場所、わかりますか。', 'さくらりょうです。ばしょ、わかりますか。', 'Tôi muốn đến ký túc xá Sakura. Bạn có biết chỗ đó không?', 'さくらりょうです。ばしょ、わかりますか。'),
      dialogueLine('sato', 'はい、わかりますよ。ここから近いですよ。', 'はい、わかりますよ。ここからちかいですよ。', 'Vâng, tôi biết. Từ đây gần lắm.', 'はい、わかりますよ。ここからちかいですよ。'),
      dialogueLine('sato', '一緒に行きましょうか。', 'いっしょにいきましょうか。', 'Chúng ta cùng đi nhé?', 'いっしょにいきましょうか。'),
      dialogueLine('tanaka', 'え、いいんですか。本当にありがとうございます。', 'え、いいんですか。ほんとうにありがとうございます。', 'Ơ, được thật sao? Cảm ơn bạn rất nhiều.', 'え、いいんですか。ほんとうにありがとうございます。'),
      dialogueLine('sato', 'いえいえ。なんでもないです。', 'いえいえ。なんでもないです。', 'Không có gì đâu.', 'いえいえ。なんでもないです。'),
      dialogueLine('sato', '着きましたよ。ここです。', 'つきましたよ。ここです。', 'Đến nơi rồi. Ở đây này.', 'つきましたよ。ここです。'),
      dialogueLine('tanaka', '助かりました。佐藤さん、ありがとうございました。', 'たすかりました。さとうさん、ありがとうございました。', 'Bạn đã giúp tôi rất nhiều. Sato, cảm ơn bạn.', 'たすかりました。さとうさん、ありがとうございました。'),
      dialogueLine('sato', 'なんでもないです。', 'なんでもないです。', 'Không có gì đâu.', 'なんでもないです。'),
      dialogueLine('sato', '田中さん、勉強を頑張ってくださいね。さようなら。', 'たなかさん、べんきょうをがんばってくださいね。さようなら。', 'Tanaka, hãy cố gắng học nhé. Tạm biệt.', 'たなかさん、べんきょうをがんばってくださいね。さようなら。'),
    ],
    sceneDividers: [
      {
        afterDialogueLine: 10,
        targetText: '着いた時',
        translationByNative: vi('Khi đến nơi'),
      },
    ],
  },
];

// This is the approved Japanese-only source for Daily Life / Module 1 / Unit 1 / Lesson 1.
// Do not use it to synthesize English or other language content.
const JA_UNIT1_LESSON1_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Chào và nói tên',
    titleByNative: vi('Chào và nói tên'),
  },
  lesson: {
    title: 'Xin chào, tôi là…',
    titleByNative: vi('Xin chào, tôi là…'),
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
          'Chọn lời chào phù hợp với thời điểm và quan hệ.',
          'Phân biệt cách nói lịch sự, trung tính và thân mật.',
          'Nói tên của mình.',
          'Thực hiện một lượt tự giới thiệu ngắn.',
          'Tránh dùng lời chào thân mật với sai đối tượng.',
        ],
        situation: [
          'Người học vừa đến một lớp học tiếng Nhật.',
          'Đây là lần đầu gặp giáo viên và các bạn cùng lớp.',
        ],
        examples: [
          { label: 'Giáo viên nói:', ...line('先生', 'おはようございます。', 'おはようございます。', 'Giáo viên:\nChào buổi sáng.') },
          { label: 'Người học đáp:', ...line('', 'おはようございます。', 'おはようございます。', 'Chào buổi sáng.') },
          { label: 'Khi làm quen với một người mới, người học có thể nói:', ...line('', 'はじめまして。田中です。よろしくお願いします。', 'はじめまして。たなかです。よろしくおねがいします。', 'Rất vui được gặp bạn lần đầu.\nTôi là Tanaka.\nRất mong được làm quen.') },
        ],
        importantNote: [
          'Trong tiếng Nhật, cách nói lịch sự và thân mật không phải lúc nào cũng có quan hệ một-một.',
          'おはようございます có dạng thân mật rõ ràng là おはよう。',
          'よろしくお願いします có thể rút gọn thành よろしく。',
          'こんにちは không có một cách nói thân mật cố định tương đương.',
          'はじめまして thường vẫn được dùng ngay cả khi hai người cùng tuổi.',
        ],
      },
      vocabularyDetails: [
        {
          id: 'ohayo-gozaimasu',
          timingAndContext: ['Dùng vào buổi sáng.', 'Gặp giáo viên.', 'Gặp cấp trên.', 'Gặp đồng nghiệp.', 'Gặp người chưa thân.', 'Bắt đầu buổi học hoặc ca làm việc.'],
          appropriateFor: ['Giáo viên', 'Người lớn tuổi', 'Người mới gặp', 'Đồng nghiệp', 'Khách hàng'],
          avoid: ['Không dùng như lời chào buổi chiều.', 'Không dùng như lời chào buổi tối.', 'Không dùng trước khi đi ngủ.'],
          register: 'Lịch sự.',
          casual: ['Cách thân mật chuẩn:', 'おはよう！', 'Dùng với:', 'Bạn bè', 'Anh chị em', 'Người trong gia đình', 'Người ngang tuổi đã thân', 'Không nên dùng おはよう trống với cấp trên hoặc khách hàng khi quan hệ chưa đủ gần.'],
          examples: [example('先生、おはようございます。', 'せんせい、おはようございます。', 'Chào buổi sáng, thầy/cô.'), example('佐藤さん、おはよう！', 'さとうさん、おはよう！', 'Sato, chào buổi sáng!')],
        },
        {
          id: 'konnichiwa',
          overview: 'Lời chào thường dùng sau khoảng thời gian chào buổi sáng và trước khi chuyển sang lời chào buổi tối.',
          timingAndContext: ['Gặp người khác sau phần đầu của buổi sáng.', 'Gặp người khác trước khi trời tối hoặc trước khoảng thời gian thường dùng こんばんは。', 'Gặp hàng xóm.', 'Gặp người mới.', 'Gặp giáo viên.', 'Gặp đồng nghiệp.', 'Gặp người quen không quá thân.', 'Không ghi mốc giờ cứng như 11:00, 12:00 hoặc 17:00.', 'Việc lựa chọn lời chào phụ thuộc thời điểm, bối cảnh và thói quen.'],
          appropriateFor: ['Người mới gặp', 'Hàng xóm', 'Giáo viên', 'Nhân viên cửa hàng', 'Đồng nghiệp', 'Người quen không quá thân', 'Bạn bè trong một số tình huống'],
          avoid: ['Không dùng thay lời chào buổi sáng khi おはようございます tự nhiên hơn.', 'Không dùng sau khi chuyển sang buổi tối khi こんばんは tự nhiên hơn.', 'Không dùng trước khi đi ngủ.', 'Không dùng như lời tạm biệt.'],
          register: 'Trung tính, lịch sự an toàn.',
          casualTitle: 'Cách mở đầu thân mật theo ngữ cảnh',
          casualIntro: 'こんにちは không có một cách nói thân mật cố định tương đương.\n\nKhi nói với bạn bè hoặc người quen thân, tùy người và tình huống, người nói có thể:',
          casual: ['gọi tên người kia;', 'hỏi ngay 元気？;', 'dùng よっ！ hoặc おっ！ trong một số nhóm bạn thân;', 'bắt đầu trực tiếp câu chuyện.'],
          casualNotes: ['Đây là các cách mở đầu hội thoại thân mật theo ngữ cảnh.', 'Chúng không phải bản thay thế một-một của こんにちは.'],
          examples: [example('こんにちは、田中さん。', 'こんにちは、たなかさん。', 'Xin chào, anh/chị Tanaka.')],
        },
        {
          id: 'konbanwa',
          timingAndContext: ['Dùng khi gặp người khác vào buổi tối.', 'Thường dùng sau khi trời đã tối.'],
          appropriateFor: ['Hàng xóm', 'Giáo viên', 'Đồng nghiệp', 'Người mới gặp', 'Người quen'],
          avoid: ['Không dùng để nói “chúc ngủ ngon”.', 'Không dùng khi chia tay.', 'Không dùng vào buổi sáng.', 'Không dùng giữa ban ngày.'],
          register: 'Trung tính, lịch sự an toàn.',
          casual: ['Cách thân mật:', 'Không có một dạng thân mật chuẩn duy nhất.', 'Với bạn thân vào buổi tối, người nói có thể:', 'Vẫn dùng こんばんは。', 'Gọi tên người kia.', 'Dùng một lời mở đầu thân mật khác.', 'Bắt đầu trực tiếp cuộc trò chuyện.'],
          examples: [example('こんばんは。今日は寒いですね。', 'こんばんは。きょうはさむいですね。', 'Chào buổi tối. Hôm nay lạnh nhỉ.')],
        },
        {
          id: 'hajimemashite',
          timingAndContext: ['Chính thức làm quen lần đầu.', 'Gặp bạn học mới.', 'Gặp đồng nghiệp mới.', 'Gặp giáo viên mới.', 'Gặp thành viên mới trong nhóm.'],
          avoid: ['Không dùng mỗi ngày với cùng một người.', 'Không dùng từ lần gặp thứ hai trở đi.', 'Không dùng chỉ vì nhìn thấy một người lạ nhưng không làm quen.', 'Không dùng thay lời chào buổi sáng, ban ngày hoặc buổi tối.'],
          register: 'Trung tính và lịch sự trong lần đầu gặp.',
          casual: ['Cách thân mật:', 'Không có dạng thân mật chuẩn bắt buộc.', 'Ngay cả hai người cùng tuổi gặp lần đầu vẫn có thể dùng:', 'はじめまして。', 'Trong tình huống rất thoải mái có thể bỏ qua cụm này và nói tên trực tiếp, nhưng không được dạy đó là cách thay thế mặc định.'],
          examples: [example('はじめまして。田中です。', 'はじめまして。たなかです。', 'Rất vui được gặp bạn lần đầu. Tôi là Tanaka.')],
        },
        {
          id: 'desu',
          timingAndContext: ['Nói tên của mình.', 'Trả lời khi được hỏi tên.', 'Tự giới thiệu ngắn gọn.'],
          register: 'Lịch sự cơ bản.',
          casual: ['Cách thân mật có thể gặp:', '田中。', 'Nghĩa:\nTanaka.', 'Hoặc:', '田中だよ。', 'Nghĩa:\nTớ là Tanaka đấy.'],
          notes: ['Chỉ nói tên là cách ngắn và thân mật.', '～だよ có sắc thái thông báo hoặc giải thích.', 'Không được dạy ～だよ như bản thay thế bắt buộc của ～です。', 'Với giáo viên, người lớn hơn hoặc người mới gặp, dùng ～です。'],
          examples: [example('田中です。', 'たなかです。', 'Tôi là Tanaka.'), example('佐藤です。', 'さとうです。', 'Tôi là Sato.')],
        },
        {
          id: 'yoroshiku-onegaishimasu',
          overview: 'Không dịch máy móc câu này trong mọi trường hợp thành “Nice to meet you”.\n\nNghĩa thay đổi theo ngữ cảnh.',
          timingAndContext: ['Sau khi nói tên trong lần đầu làm quen.', 'Khi bắt đầu học cùng.', 'Khi bắt đầu làm việc cùng.', 'Khi bắt đầu hợp tác.', 'Sau một lời nhờ vả trong ngữ cảnh phù hợp.'],
          register: 'Lịch sự.',
          casual: ['Biến thể:', 'どうぞよろしくお願いします。\n→ Lịch sự và nhấn mạnh thiện chí hơn một chút.', 'よろしくお願いします。\n→ Lịch sự tiêu chuẩn.', 'よろしく！\n→ Thân mật, dùng với bạn bè hoặc người ngang hàng khi quan hệ thoải mái.', 'Không dùng よろしく！ với:', 'Khách hàng', 'Giáo viên', 'Cấp trên', 'Người mới gặp trong hoàn cảnh trang trọng'],
          examples: [example('はじめまして。田中です。よろしくお願いします。', 'はじめまして。たなかです。よろしくおねがいします。', 'Rất vui được gặp bạn lần đầu. Tôi là Tanaka. Rất mong được làm quen.'), example('田中。よろしく！', 'たなか。よろしく！', 'Tớ là Tanaka. Làm quen nhé!')],
        },
        {
          id: 'kochira-koso',
          timingAndContext: ['Đáp lại:', 'よろしくお願いします。'],
          register: 'Lịch sự.',
          casual: ['Biến thể thân mật:', 'こちらこそ、よろしく！', 'Trong một số hoàn cảnh rất thoải mái có thể đáp ngắn:', 'よろしく！'],
          examples: [example('A:\nよろしくお願いします。\n\nB:\nこちらこそ、よろしくお願いします。', 'よろしくおねがいします。\n\nこちらこそ、よろしくおねがいします。', '')],
        },
        {
          id: 'sayounara',
          overview: 'Mục đích đưa vào lesson:\n\nPhân biệt:\n- Lời nói khi gặp\n- Lời nói khi làm quen lần đầu\n- Lời nói khi rời đi',
          timingAndContext: ['Chia tay.', 'Một số bối cảnh trường học.', 'Khi dự kiến một khoảng thời gian mới gặp lại.'],
          avoid: ['Không dùng khi vừa gặp.', 'Không dùng thay こんにちは。', 'Không dùng thay lời tự giới thiệu.'],
          casual: ['Cách thân mật thường gặp khi chia tay:', 'じゃあ、また。\n→ Vậy nhé, gặp lại sau.', 'またね！\n→ Gặp lại nhé!', 'Không mở rộng chủ đề chia tay quá sâu trong Lesson 1.'],
        },
      ],
      dialogueGroups: [
        {
          id: 'morning-classroom', title: 'Buổi sáng trong lớp học', situation: 'Một học sinh gặp giáo viên vào buổi sáng.',
          lines: [dialogueLine('teacher', 'おはようございます。', 'おはようございます。', 'Chào buổi sáng.'), dialogueLine('tanaka', 'おはようございます。', 'おはようございます。', 'Chào buổi sáng.'), dialogueLine('teacher', '田中さん、今日もよろしくお願いします。', 'たなかさん、きょうもよろしくおねがいします。', 'Tanaka, hôm nay cũng cùng cố gắng nhé.'), dialogueLine('tanaka', 'はい、よろしくお願いします。', 'はい、よろしくおねがいします。', 'Vâng, mong thầy/cô giúp đỡ.')],
          explanation: ['Dùng おはようございます vì đây là buổi sáng.', 'Học sinh nói với giáo viên nên không dùng おはよう！', 'よろしくお願いします ở đây thể hiện thiện chí học tập và hợp tác, không chỉ dùng khi mới gặp.'],
        },
        {
          id: 'same-age-first-meeting', title: 'Hai người cùng tuổi gặp lần đầu', situation: 'Hai sinh viên ngồi cạnh nhau trong buổi định hướng.',
          lines: [dialogueLine('tanaka', 'こんにちは。はじめまして。田中です。', 'こんにちは。はじめまして。たなかです。', 'Xin chào. Rất vui được gặp bạn lần đầu. Mình là Tanaka.'), dialogueLine('sato', 'はじめまして。佐藤です。', 'はじめまして。さとうです。', 'Rất vui được gặp bạn lần đầu. Mình là Sato.'), dialogueLine('tanaka', 'よろしくお願いします。', 'よろしくおねがいします。', 'Rất mong được làm quen.'), dialogueLine('sato', 'こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Mình cũng rất mong được làm quen.')],
          explanation: ['Hai người cùng tuổi nhưng mới gặp nên dùng cách lịch sự cơ bản.', 'Không cần chuyển ngay sang cách quá thân mật.', 'Khi quan hệ thoải mái hơn, họ có thể dùng cách nói ngắn hơn.'],
        },
        {
          id: 'move-to-casual', title: 'Chuyển sang cách nói thân mật', situation: 'Tanaka và Sato đã trò chuyện một lúc và đồng ý nói chuyện thoải mái hơn.',
          lines: [dialogueLine('tanaka', 'あらためて、田中。よろしく！', 'あらためて、たなか。よろしく！', 'Nói lại nhé, mình là Tanaka. Làm quen nhé!'), dialogueLine('sato', '佐藤。よろしく！', 'さとう。よろしく！', 'Mình là Sato. Làm quen nhé!'), dialogueLine('tanaka', '佐藤さんじゃなくて、佐藤でいい？', 'さとうさんじゃなくて、さとうでいい？', 'Không cần gọi “Sato-san”, gọi Sato thôi được chứ?'), dialogueLine('sato', 'うん、いいよ。田中もよろしく！', 'うん、いいよ。たなかもよろしく！', 'Ừ, được. Tanaka cũng vậy nhé!'), dialogueLine('tanaka', 'じゃあ、また明日！', 'じゃあ、またあした！', 'Vậy mai gặp lại nhé!'), dialogueLine('sato', 'またね！', 'またね！', 'Gặp lại nhé!')],
          explanation: ['よろしく！ là dạng thân mật của よろしくお願いします trong quan hệ phù hợp.', 'Không phải cứ gặp lần đầu là dùng ngay よろしく！', 'Việc chuyển sang cách nói thân mật cần dựa vào mức độ thoải mái, tuổi tác, quan hệ và bối cảnh.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'Tên + です', formula: '[名前] + です。', formulaReading: '[なまえ] + です。', meaning: 'Tôi là [tên].',
          examples: [example('田中です。', 'たなかです。', 'Tôi là Tanaka.'), example('私は田中です。', 'わたしはたなかです。', '')],
          explanation: ['Có thể nói:\n私は田中です。\n\nNhưng khi bối cảnh đã rõ là đang tự giới thiệu, tiếng Nhật thường bỏ chủ ngữ:\n田中です。'],
          whenToUse: ['Tự giới thiệu', 'Trả lời tên', 'Nói với giáo viên', 'Nói với người mới gặp', 'Môi trường học tập hoặc công việc'],
          casual: ['田中。', '田中だよ。'],
          notes: ['Không được giải thích rằng です luôn đổi thành だよ。\n\nだよ có thêm sắc thái thông báo hoặc nhấn mạnh.'],
        },
        {
          title: 'はじめまして + Tên + です', formula: 'はじめまして。[名前]です。', formulaReading: 'はじめまして。[なまえ]です。',
          examples: [example('はじめまして。佐藤です。', 'はじめまして。さとうです。', 'Rất vui được gặp bạn lần đầu. Tôi là Sato.')],
          whenToUse: ['Chỉ trong lần chính thức làm quen đầu tiên.'],
          commonMistake: ['Sai:\nNgày hôm sau lại nói はじめまして。', 'Đúng:\nNgày hôm sau dùng おはようございます hoặc こんにちは tùy hoàn cảnh.'],
        },
        {
          title: 'よろしくお願いします', formula: 'はじめまして。\n＋\nTên + です。\n＋\nよろしくお願いします。', formulaReading: 'はじめまして。\n＋\nTên + です。\n＋\nよろしくおねがいします。',
          examples: [example('はじめまして。田中です。よろしくお願いします。', 'はじめまして。たなかです。よろしくおねがいします。', ''), example('田中。よろしく！', 'たなか。よろしく！', '')],
          casual: ['Cách thân mật trong quan hệ phù hợp:\n田中。よろしく！'],
          comparison: ['どうぞよろしくお願いいたします\n→ Rất trang trọng', 'どうぞよろしくお願いします\n→ Lịch sự hơn một chút', 'よろしくお願いします\n→ Lịch sự tiêu chuẩn', 'よろしく\n→ Thân mật'],
          notes: ['Không được dạy các mức này như có thể thay thế tự do mà không xét quan hệ và tình huống.'],
        },
      ],
      distinctions: [
        { term: 'こんにちは', points: ['Lời chào sau khoảng chào buổi sáng và trước buổi tối.', 'Có thể dùng nhiều lần với cùng một người.'] },
        { term: 'はじめまして', points: ['Dùng khi chính thức làm quen lần đầu.', 'Chỉ dùng lần đầu.'] },
        { term: 'こんばんは', points: ['Dùng khi gặp ai đó vào buổi tối.'] },
        { term: 'おやすみなさい', points: ['Dùng trước khi đi ngủ hoặc khi kết thúc buổi tối để nghỉ.', 'Không phải lời chào khi vừa gặp.'] },
        { term: 'さようなら', points: ['Tạm biệt.', 'Có thể tạo cảm giác chia tay rõ hơn hoặc lâu hơn.'] },
        { term: 'またね', points: ['Gặp lại nhé.', 'Thân mật, thường dùng với bạn bè.'] },
      ],
      practice: {
        title: 'Bài tập',
        japaneseTitle: '練習（れんしゅう）',
        totalQuestions: 14,
        estimatedMinutes: 'Khoảng 8–10 phút',
        reviewTopics: 'Từ vựng · Nghe · Hội thoại · Ngữ pháp',
        groups: [
          { id: 'free', number: '01', title: 'Luyện tập cơ bản', titleByNative: vi('Luyện tập cơ bản'), range: 'Câu 1–9', rangeByNative: vi('Câu 1–9'), details: 'Từ vựng · Nghe · Ngữ pháp\nHội thoại · Sắp xếp câu', detailsByNative: vi('Từ vựng · Nghe · Ngữ pháp\nHội thoại · Sắp xếp câu'), start: 1, end: 9, plan: 'free' },
          { id: 'plus', number: '02', title: 'Luyện tập nâng cao', titleByNative: vi('Luyện tập nâng cao'), range: 'Câu 10–14', rangeByNative: vi('Câu 10–14'), details: 'Tình huống thực tế\nHội thoại thực hành nâng cao', detailsByNative: vi('Tình huống thực tế\nHội thoại thực hành nâng cao'), start: 10, end: 14, plan: 'plus' },
        ],
        exercises: PRACTICE_EXERCISES,
      },
    },
  },
  vocabulary: [
    { id: 'ohayo-gozaimasu', displayText: 'おはようございます', reading: 'おはようございます', romanization: 'ohayō gozaimasu', speechText: 'おはようございます', meaningVi: 'Chào buổi sáng.', translationByNative: vi('Chào buổi sáng.'), translations: vi('Chào buổi sáng.'), audioLocale: 'ja-JP' },
    { id: 'konnichiwa', displayText: 'こんにちは', reading: 'こんにちは', romanization: 'konnichiwa', speechText: 'こんにちは', meaningVi: 'Xin chào.', translationByNative: vi('Xin chào.'), translations: vi('Xin chào.'), audioLocale: 'ja-JP' },
    { id: 'konbanwa', displayText: 'こんばんは', reading: 'こんばんは', romanization: 'konbanwa', speechText: 'こんばんは', meaningVi: 'Chào buổi tối.', translationByNative: vi('Chào buổi tối.'), translations: vi('Chào buổi tối.'), audioLocale: 'ja-JP' },
    { id: 'hajimemashite', displayText: 'はじめまして', reading: 'はじめまして', romanization: 'hajimemashite', speechText: 'はじめまして', meaningVi: 'Rất vui được gặp bạn lần đầu.', translationByNative: vi('Rất vui được gặp bạn lần đầu.'), translations: vi('Rất vui được gặp bạn lần đầu.'), audioLocale: 'ja-JP' },
    { id: 'desu', displayText: '～です', speechText: '田中です。', meaningVi: 'Trong bài này: Tôi là Tanaka.', translationByNative: vi('Trong bài này: Tôi là Tanaka.'), translations: vi('Trong bài này: Tôi là Tanaka.'), exampleText: '田中です。', exampleReading: 'たなかです。', exampleSpeechText: '田中です。', audioLocale: 'ja-JP' },
    { id: 'yoroshiku-onegaishimasu', displayText: 'よろしくお願いします', reading: 'よろしくおねがいします', romanization: 'yoroshiku onegaishimasu', speechText: 'よろしくお願いします', meaningVi: 'Rất mong được làm quen.\nMong được giúp đỡ.\nMong chúng ta sẽ hợp tác tốt.', translationByNative: vi('Rất mong được làm quen.\nMong được giúp đỡ.\nMong chúng ta sẽ hợp tác tốt.'), translations: vi('Rất mong được làm quen.\nMong được giúp đỡ.\nMong chúng ta sẽ hợp tác tốt.'), audioLocale: 'ja-JP' },
    { id: 'kochira-koso', displayText: 'こちらこそ、よろしくお願いします', reading: 'こちらこそ、よろしくおねがいします', speechText: 'こちらこそ、よろしくお願いします', meaningVi: 'Chính tôi cũng rất mong được làm quen.', translationByNative: vi('Chính tôi cũng rất mong được làm quen.'), translations: vi('Chính tôi cũng rất mong được làm quen.'), audioLocale: 'ja-JP' },
    { id: 'sayounara', displayText: 'さようなら', reading: 'さようなら', speechText: 'さようなら', meaningVi: 'Tạm biệt.', translationByNative: vi('Tạm biệt.'), translations: vi('Tạm biệt.'), audioLocale: 'ja-JP' },
  ],
};

export const JA_UNIT1_LESSON1 = localizeGoldenSupport(
  JA_UNIT1_LESSON1_SOURCE,
);
