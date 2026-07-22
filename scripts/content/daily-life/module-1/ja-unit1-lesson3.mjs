import {
  localizeSupport,
  supportTextByVietnamese,
} from './ja-unit1-lesson3-localization.mjs';

// Daily Life / Module 1 / Unit 1 / Lesson 3 — "自己紹介への返事とお別れのあいさつ"
// (Respond when introduced & say goodbye). Same five_cards schema as the Golden
// Lesson / L2. Q1–Q9 Free, Q10–Q14 Plus. Beginner content (Minna/Genki/Marugoto
// sơ cấp); builds on L1 (greet/introduce) + L2 (ask names). New focus: respond
// to an introduction (こちらこそ/私も/そうですか) and part (失礼します family / また＋time
// / じゃあ、また / お元気で). Planned review of L1/L2 items in dialogue + Q14.
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
    id: 'ja-daily_life-m01-u1-l3-practice-1', order: 1, plan: 'free', type: 'multiple_choice',
    prompt: 'こちらこそ dùng để làm gì?',
    options: [option('respond_goodwill', 'Đáp lại lời làm quen với cùng thiện chí'), option('ask_name', 'Hỏi tên người khác'), option('morning', 'Chào buổi sáng'), option('apologize_late', 'Xin lỗi vì đến muộn')],
    correctOptionId: 'respond_goodwill',
    feedback: { correctAnswer: 'Đáp lại lời làm quen với cùng thiện chí', explanation: 'こちらこそ đáp lại lời よろしくお願いします với cùng thiện chí.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-2', order: 2, plan: 'free', type: 'multiple_choice',
    prompt: 'Bạn muốn xin phép về trước. Nói thế nào?',
    options: [option('osaki', 'お先に失礼します。'), option('hajimemashite', 'はじめまして。'), option('onamae', 'お名前は？'), option('kochira', 'こちらこそ。')],
    correctOptionId: 'osaki',
    feedback: { correctAnswer: 'お先に失礼します。', explanation: 'お先に失礼します dùng khi rời đi trước người khác.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-3', order: 3, plan: 'free', type: 'matching',
    prompt: 'Nối mỗi câu với tình huống dùng.',
    pairs: [
      { id: 'kochira', left: { id: 'kochira_l', text: 'こちらこそ' }, right: { id: 'kochira_r', text: 'Đáp lại khi được làm quen' } },
      { id: 'osaki', left: { id: 'osaki_l', text: 'お先に失礼します' }, right: { id: 'osaki_r', text: 'Xin phép về trước' } },
      { id: 'jaa', left: { id: 'jaa_l', text: 'じゃあ、また' }, right: { id: 'jaa_r', text: 'Chào tạm biệt thân mật' } },
      { id: 'genki', left: { id: 'genki_l', text: 'お元気で' }, right: { id: 'genki_r', text: 'Dặn giữ sức khỏe' } },
    ],
    feedback: { explanation: 'Mỗi câu chào gắn với một tình huống cụ thể.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-4', order: 4, plan: 'free', type: 'sentence_ordering',
    prompt: 'Sắp xếp thành câu “Tôi cũng mong được làm quen.”',
    tokens: [token('watashi', '私（わたし）', '私', 'わたし'), token('mo', 'も'), token('yoroshiku', 'よろしく'), token('onegai', 'お願（ねが）いします', 'お願いします', 'おねがいします'), token('san', 'さん'), token('desune', 'ですね')],
    correctTokenIds: ['watashi', 'mo', 'yoroshiku', 'onegai'],
    feedback: { correctAnswer: '私（わたし）もよろしくお願（ねが）いします。', canonicalAnswer: '私もよろしくお願いします。', audioText: 'わたしもよろしくおねがいします。', explanation: '私 + も + よろしく + お願いします → 私もよろしくお願いします。 さん và ですね không dùng ở đây.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-5', order: 5, plan: 'free', type: 'dialogue_fill',
    prompt: 'Điền chỗ trống để hoàn thành hội thoại.',
    dialogue: ['佐藤: はじめまして。よろしくお願（ねが）いします。', '田中: {{slot_1}}、よろしくお願（ねが）いします。'],
    slots: [{ id: 'slot_1', answerId: 'kochira_koso', placeholder: '________' }],
    wordBank: [option('kochira_koso', 'こちらこそ'), option('sayounara', 'さようなら'), option('onamae_wa', 'お名前（なまえ）は？', 'お名前は？', 'おなまえは')],
    feedback: { correctAnswer: 'こちらこそ、よろしくお願（ねが）いします。', canonicalAnswer: 'こちらこそ、よろしくお願いします。', audioText: 'こちらこそ、よろしくおねがいします。', explanation: 'Khi được chào よろしくお願いします, đáp lại tự nhiên bằng こちらこそ.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-6', order: 6, plan: 'free', type: 'listening_multiple_choice',
    prompt: 'Bạn vừa nghe câu nào?', audioText: 'おさきにしつれいします。',
    options: [option('leave_first', 'Xin phép về trước'), option('ask_name', 'Hỏi tên'), option('evening', 'Chào buổi tối'), option('thanks', 'Cảm ơn')],
    correctOptionId: 'leave_first',
    feedback: { correctAnswer: 'Xin phép về trước', explanation: 'Câu nghe được là お先に失礼します — xin phép về trước.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-7', order: 7, plan: 'free', type: 'multiple_choice',
    prompt: 'Chọn từ điền vào chỗ trống: また___。（hẹn tuần sau）',
    options: [option('raishuu', '来週（らいしゅう）', '来週', 'らいしゅう'), option('ashita', '明日（あした）', '明日', 'あした'), option('shitsurei', '失礼'), option('kochira', 'こちらこそ')],
    correctOptionId: 'raishuu',
    feedback: { correctAnswer: '来週（らいしゅう）', explanation: 'また＋[mốc thời gian] để hẹn gặp lại; 来週 = tuần sau.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-8', order: 8, plan: 'free', type: 'multiple_choice',
    context: 'Cuối buổi học, bạn muốn chào thầy/cô rồi về.',
    prompt: 'Cuối buổi học, bạn muốn chào thầy/cô rồi về. Nói gì?',
    options: [option('shitsurei', '失礼します。'), option('jaa_mata', 'じゃあ、また。'), option('onamae', 'お名前は？'), option('kochira', 'こちらこそ。')],
    correctOptionId: 'shitsurei',
    feedback: { correctAnswer: '失礼します。', explanation: 'Với thầy cô, dùng cách lịch sự 失礼します, không dùng じゃあ、また.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-9', order: 9, plan: 'free', type: 'checkpoint',
    prompt: 'Checkpoint 5 câu nhỏ',
    subQuestions: [
      { id: 'q9_1', prompt: 'こちらこそ nghĩa là gì?', options: [option('likewise', 'Tôi cũng vậy (đáp lại)'), option('see_again', 'Hẹn gặp lại'), option('welcome', 'Không có gì'), option('morning', 'Chào buổi sáng')], correctOptionId: 'likewise', feedback: { correctAnswer: 'Tôi cũng vậy (đáp lại)', explanation: 'こちらこそ dùng để đáp lại thiện chí.' } },
      { id: 'q9_2', prompt: 'Hẹn gặp tuần sau nói thế nào?', options: [option('raishuu', 'また来週。'), option('ashita', 'また明日。'), option('shitsurei', '失礼します。'), option('kochira', 'こちらこそ。')], correctOptionId: 'raishuu', feedback: { correctAnswer: 'また来週。', explanation: 'また来週 = hẹn tuần sau.' } },
      { id: 'q9_3', prompt: 'Xin phép về trước nói thế nào?', options: [option('osaki', 'お先に失礼します。'), option('hajimemashite', 'はじめまして。'), option('onamae', 'お名前は？'), option('kochira', 'こちらこそ。')], correctOptionId: 'osaki', feedback: { correctAnswer: 'お先に失礼します。', explanation: 'お先に失礼します = xin phép về trước.' } },
      { id: 'q9_4', prompt: '私も nghĩa là gì?', options: [option('me_too', 'Tôi cũng vậy'), option('see_again', 'Hẹn gặp lại'), option('morning', 'Chào buổi sáng'), option('welcome', 'Không có gì')], correctOptionId: 'me_too', feedback: { correctAnswer: 'Tôi cũng vậy', explanation: '私も dùng để nói mình cũng giống như vậy.' } },
      { id: 'q9_5', prompt: 'Với bạn bè, chào tạm biệt thân mật là?', options: [option('jaa', 'じゃあ、また。'), option('shitsurei', '失礼します。'), option('osaki', 'お先に失礼します。'), option('hajimemashite', 'はじめまして。')], correctOptionId: 'jaa', feedback: { correctAnswer: 'じゃあ、また。', explanation: 'じゃあ、また là cách chào thân mật.' } },
    ],
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-10', order: 10, plan: 'plus', type: 'chat_text_fill',
    prompt: 'Hoàn thành đoạn chat',
    chat: {
      timestamp: '17:00',
      context: 'Hai người vừa làm quen rồi tạm biệt. Nhập từ phù hợp vào hai ô trống.',
      speakers: [{ id: 'a', label: 'A', alignment: 'right' }, { id: 'b', label: 'B', alignment: 'left' }],
      messages: [
        { id: 'message_1', speakerId: 'a', segments: [{ displayText: 'はじめまして。\nよろしくお願（ねが）いします。', canonicalText: 'はじめまして。よろしくお願いします。', audioText: 'はじめまして。よろしくおねがいします。' }] },
        { id: 'message_2', speakerId: 'b', segments: [{ slotId: 'chat_kochira_slot' }, { displayText: '、\nよろしくお願（ねが）いします。', canonicalText: '、よろしくお願いします。', audioText: 'よろしくおねがいします。' }] },
        { id: 'message_3', speakerId: 'a', segments: [{ displayText: 'そうですか。' }] },
        { id: 'message_4', speakerId: 'b', segments: [{ displayText: 'じゃあ、また明日（あした）。', canonicalText: 'じゃあ、また明日。', audioText: 'じゃあ、またあした。' }] },
        { id: 'message_5', speakerId: 'a', segments: [{ displayText: 'また明日（あした）。', canonicalText: 'また明日。', audioText: 'またあした。' }, { slotId: 'chat_farewell_slot' }, { displayText: '。' }] },
        { id: 'message_6', speakerId: 'b', segments: [{ displayText: 'お元気（げんき）で。', canonicalText: 'お元気で。', audioText: 'おげんきで。' }] },
      ],
    },
    slots: [
      { id: 'chat_kochira_slot', displayText: 'こちらこそ', canonicalText: 'こちらこそ', audioText: 'こちらこそ', acceptedAnswers: ['こちらこそ'] },
      { id: 'chat_farewell_slot', displayText: 'お元気（げんき）で', canonicalText: 'お元気で', audioText: 'おげんきで', acceptedAnswers: ['お元気で', 'おげんきで'] },
    ],
    feedback: { correctAnswer: 'こちらこそ\nお元気（げんき）で', canonicalAnswer: 'こちらこそ／お元気で', audioText: 'こちらこそ／おげんきで', correctMessage: 'Bạn làm tốt lắm!', slotFeedback: { chat_kochira_slot: { incorrectMessage: 'Ô này là câu đáp lại lời làm quen.', correctAnswer: 'こちらこそ', explanation: 'Được chào よろしくお願いします thì đáp こちらこそ.' }, chat_farewell_slot: { incorrectMessage: 'Ô này là lời chào tạm biệt.', correctAnswer: 'お元気で', explanation: 'お元気で dùng khi sẽ lâu mới gặp lại.' } } },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-11', order: 11, plan: 'plus', type: 'multiple_choice',
    context: 'Bạn về trước đồng nghiệp ở công ty.',
    prompt: 'Bạn về trước đồng nghiệp ở công ty. Cách nói lịch sự nhất là?',
    options: [option('osaki', 'お先に失礼します。'), option('jaa', 'じゃあ、また。'), option('kochira', 'こちらこそ。'), option('onamae', 'お名前は？')],
    correctOptionId: 'osaki',
    feedback: { correctAnswer: 'お先に失礼します。', explanation: 'お先に失礼します là cách lịch sự để xin phép về trước.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-12', order: 12, plan: 'plus', type: 'multiple_choice',
    prompt: 'Chọn đoạn hội thoại tự nhiên nhất.',
    options: [
      option('natural', '佐藤: よろしくお願いします。\n田中: こちらこそ、よろしくお願いします。'),
      option('repeat', '佐藤: よろしくお願いします。\n田中: よろしくお願いします、よろしくお願いします。'),
      option('teacher_casual', '先生: さようなら。\n田中: じゃあ、また！'),
      option('leave_then_ask', '佐藤: お先に失礼します。\n田中: お名前は？'),
    ],
    correctOptionId: 'natural',
    feedback: { correctAnswer: '佐藤: よろしくお願いします。\n田中: こちらこそ、よろしくお願いします。', explanation: 'A tự nhiên: được chào thì đáp こちらこそ. B sai vì lặp lại y nguyên, C sai vì dùng じゃあ、また với thầy cô, D sai vì xin phép về nhưng lại hỏi tên.' },
  },
  {
    id: 'ja-daily_life-m01-u1-l3-practice-13', order: 13, plan: 'plus', type: 'slot_ordering',
    prompt: 'Sắp xếp thành câu xin phép về trước lịch sự. Có thẻ không cần dùng.',
    tokens: [token('watashi', '私（わたし）', '私', 'わたし'), token('mo', 'も'), token('o', 'お'), token('sakini', '先（さき）に', '先に', 'さきに'), token('shitsurei', '失礼（しつれい）', '失礼', 'しつれい'), token('shimasu', 'します'), token('kochira_distractor', 'こちらこそ'), token('mata_distractor', 'また')],
    answerSlots: [
      { id: 's1', expectedTokenId: 'watashi' },
      { id: 's2', expectedTokenId: 'mo', afterText: '、' },
      { id: 's3', expectedTokenId: 'o' },
      { id: 's4', expectedTokenId: 'sakini' },
      { id: 's5', expectedTokenId: 'shitsurei' },
      { id: 's6', expectedTokenId: 'shimasu', afterText: '。' },
    ],
    unusedTokenIds: ['kochira_distractor', 'mata_distractor'],
    feedback: { correctAnswer: '私（わたし）も、お先（さき）に失礼（しつれい）します。', canonicalAnswer: '私も、お先に失礼します。', audioText: 'わたしも、おさきにしつれいします。', explanation: 'Câu đầy đủ: お先に失礼します。 こちらこそ và また không dùng ở đây.' },
  },
  {
    // Lesson Format 3.0 — non-graded advanced Real-World Practice dialogue.
    // See .cursor/rules/04_novalang_lesson_format_3_0.mdc and ADR-012. Parting
    // scene combining L1 intro + L2 names + L3 responses/farewells; 1–2 tiny
    // guessable-from-context new words (そろそろ) per §B14.
    id: 'ja-daily_life-m01-u1-l3-practice-14', order: 14, plan: 'plus', type: 'real_world_practice_dialogue',
    nonGraded: true,
    scenarioTitle: 'Chào tạm biệt sau khi làm quen',
    scenarioDescription: 'Ba người vừa làm quen. Cuối buổi, họ đáp lời làm quen rồi lần lượt xin phép về, hẹn gặp lại và dặn nhau giữ sức khỏe.',
    characterIds: ['tanaka', 'sato', 'ito'],
    dialogueLines: [
      dialogueLine('sato', '田中さん、そろそろ失礼します。', 'たなかさん、そろそろしつれいします。', 'Tanaka, tôi xin phép về trước đây.', 'たなかさん、そろそろしつれいします'),
      dialogueLine('tanaka', 'あ、そうですか。', 'あ、そうですか。', 'À, vậy à.', 'あ、そうですか'),
      dialogueLine('sato', '今日はここで失礼します。', 'きょうはここでしつれいします。', 'Hôm nay xin phép ở đây thôi.', 'きょうはここでしつれいします'),
      dialogueLine('tanaka', 'はい。また明日。', 'はい。またあした。', 'Vâng. Hẹn mai gặp.', 'はい。またあした'),
      dialogueLine('sato', 'また明日。お元気で。', 'またあした。おげんきで。', 'Hẹn mai gặp. Giữ sức khỏe nhé.', 'またあした。おげんきで'),
      dialogueLine('tanaka', 'お元気で。', 'おげんきで。', 'Giữ sức khỏe nhé.', 'おげんきで'),
      dialogueLine('ito', '佐藤さん、私もお先に失礼します。', 'さとうさん、わたしもおさきにしつれいします。', 'Satō, tôi cũng xin phép về trước.', 'さとうさん、わたしもおさきにしつれいします'),
      dialogueLine('sato', 'はい、じゃあ、また来週。', 'はい、じゃあ、またらいしゅう。', 'Vâng, thôi, hẹn tuần sau.', 'はい、じゃあ、またらいしゅう'),
      dialogueLine('ito', 'また来週。失礼します。', 'またらいしゅう。しつれいします。', 'Hẹn tuần sau. Tôi xin phép.', 'またらいしゅう。しつれいします'),
      dialogueLine('tanaka', 'じゃあ、また。', 'じゃあ、また。', 'Thôi, hẹn gặp lại.', 'じゃあ、また'),
    ],
    sceneDividers: [
      {
        afterDialogueLine: 6,
        targetText: 'そのあと',
        translationByNative: vi('Sau đó'),
      },
    ],
  },
];

const JA_UNIT1_LESSON3_SOURCE = {
  lessonFormat: 'five_cards',
  unit: {
    title: 'Làm quen lần đầu',
    titleByNative: vi('Làm quen lần đầu'),
  },
  lesson: {
    title: 'Đáp làm quen & tạm biệt',
    titleByNative: vi('Đáp làm quen & tạm biệt'),
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
          'Đáp lại lời làm quen bằng こちらこそ.',
          'Nói tôi cũng vậy bằng 私も.',
          'Xác nhận điều vừa nghe bằng そうですか.',
          'Rời đi một cách lịch sự bằng 失礼します.',
          'Nói xin phép về trước bằng お先に失礼します.',
          'Hẹn gặp lại bằng mẫu また＋[mốc thời gian].',
          'Chào tạm biệt thân mật bằng じゃあ、また và dặn お元気で.',
          'Chọn cách tạm biệt phù hợp với quan hệ và tình huống.',
        ],
        situation: [
          'Bạn vừa làm quen xong với một người mới.',
          'Bây giờ bạn đáp lại lời làm quen rồi chào tạm biệt cho phù hợp.',
        ],
        examples: [
          { label: 'Khi được làm quen, bạn đáp:', ...line('', 'こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Tôi cũng rất mong được làm quen.', 'こちらこそ、よろしくおねがいします') },
          { label: 'Khi rời đi, bạn nói:', ...line('', 'お先に失礼します。', 'おさきにしつれいします。', 'Tôi xin phép về trước.', 'おさきにしつれいします') },
          { label: 'Với bạn bè, bạn chào:', ...line('', 'じゃあ、また来週。', 'じゃあ、またらいしゅう。', 'Thôi, hẹn tuần sau.', 'じゃあ、またらいしゅう') },
        ],
        importantNote: [
          'こちらこそ nghĩa là "chính tôi mới là người nên nói vậy" — dùng để đáp lại thiện chí.',
          '失礼します lịch sự và dùng được với người trên; じゃあ、また thân mật, dùng với bạn bè.',
          'Không dùng じゃあ、また với thầy cô hoặc người mới quen trong hoàn cảnh trang trọng.',
        ],
      },
      vocabularyDetails: [
        { id: 'kochira-koso', overview: 'Tôi cũng vậy / Chính tôi mới phải nói thế.', examples: [example('こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Tôi cũng rất mong được làm quen.')] },
        { id: 'douzo-yoroshiku', overview: 'Rất mong được làm quen (thân thiện hơn một chút).', examples: [example('はじめまして。田中です。どうぞよろしく。', 'はじめまして。たなかです。どうぞよろしく。', 'Rất vui được gặp. Tôi là Tanaka. Rất mong được làm quen.')] },
        { id: 'sou-desu-ka', overview: 'Vậy à. / Ra vậy.', examples: [example('そうですか。田中さんですね。', 'そうですか。たなかさんですね。', 'Ra vậy. Bạn là Tanaka nhỉ.')] },
        { id: 'watashi-mo', overview: 'Tôi cũng vậy.', examples: [example('私もよろしくお願いします。', 'わたしもよろしくおねがいします。', 'Tôi cũng mong được làm quen.')] },
        { id: 'shitsurei-shimasu', overview: 'Tôi xin phép. / Xin lỗi (khi rời đi).', examples: [example('では、失礼します。', 'では、しつれいします。', 'Vậy, tôi xin phép.')] },
        { id: 'osaki-ni-shitsurei', overview: 'Tôi xin phép về trước.', examples: [example('お先に失礼します。', 'おさきにしつれいします。', 'Tôi xin phép về trước.')] },
        { id: 'ogenki-de', overview: 'Giữ sức khỏe nhé (khi lâu mới gặp lại).', examples: [example('では、お元気で。', 'では、おげんきで。', 'Vậy, giữ sức khỏe nhé.')] },
        { id: 'jaa-mata', overview: 'Thôi, hẹn gặp lại (thân mật).', examples: [example('じゃあ、また明日。', 'じゃあ、またあした。', 'Thôi, hẹn mai gặp.')], notes: ['Trong tình huống thân mật, thường bỏ chủ ngữ và nói ngắn.'] },
      ],
      // "Tham khảo thêm" (§B2b) — biến thể của お別れ (じゃあ、また / お元気で). FREE,
      // không tính ngân sách từ mới, không dùng ở Q1–Q13. Mỗi mục đủ trường.
      vocabularyReferences: [
        { term: 'またね', reading: 'またね', speechText: 'またね', meaning: 'Hẹn gặp lại nhé (rất thân mật).', forWord: 'じゃあ、また', forWho: 'Bạn bè thân, người ngang hàng.', whenToUse: 'Chia tay bạn bè trong sinh hoạt hằng ngày, không trang trọng.', difference: 'Ngắn và thân mật hơn じゃあ、また; không dùng với thầy cô hay người trên.' },
        { term: 'じゃあね', reading: 'じゃあね', speechText: 'じゃあね', meaning: 'Thôi nhé (chào tạm biệt thân mật).', forWord: 'じゃあ、また', forWho: 'Bạn bè thân.', whenToUse: 'Kết thúc cuộc trò chuyện thân mật rồi rời đi.', difference: 'Cũng thân mật như またね; nhấn "じゃあ" khi kết thúc, không trang trọng.' },
        { term: '気（き）をつけて', reading: 'きをつけて', speechText: 'きをつけて', meaning: 'Đi cẩn thận nhé / Giữ gìn nhé.', forWord: 'お元気で', forWho: 'Bạn bè, người thân, đồng nghiệp.', whenToUse: 'Khi ai đó sắp lên đường (về nhà, đi xa).', difference: 'お元気で dặn giữ sức khỏe khi lâu mới gặp; 気をつけて dặn an toàn ngay trên đường đi.' },
        { term: 'では、また', reading: 'では、また', speechText: 'では、また', meaning: 'Vậy, hẹn gặp lại (lịch sự hơn じゃあ、また).', forWord: 'じゃあ、また', forWho: 'Người trên, đồng nghiệp, hoàn cảnh cần lịch sự vừa phải.', whenToUse: 'Chia tay khi cần lịch sự hơn mức nói với bạn bè.', difference: 'では trang trọng hơn じゃあ; dùng được với người trên, còn じゃあ、また chỉ hợp bạn bè.' },
      ],
      dialogueGroups: [
        {
          id: 'respond-intro', title: 'Đáp lại khi được làm quen', situation: 'Hai người vừa giới thiệu tên, một người đáp lại thiện chí.',
          lines: [
            dialogueLine('sato', 'はじめまして。佐藤です。よろしくお願いします。', 'はじめまして。さとうです。よろしくおねがいします。', 'Rất vui được gặp. Tôi là Satō. Rất mong được làm quen.', 'はじめまして。さとうです。よろしくおねがいします'),
            dialogueLine('tanaka', 'こちらこそ。田中です。どうぞよろしく。', 'こちらこそ。たなかです。どうぞよろしく。', 'Tôi cũng vậy. Tôi là Tanaka. Rất mong được làm quen.', 'こちらこそ。たなかです。どうぞよろしく'),
            dialogueLine('sato', 'そうですか。田中さんですね。', 'そうですか。たなかさんですね。', 'Ra vậy. Bạn là Tanaka nhỉ.', 'そうですか。たなかさんですね'),
            dialogueLine('tanaka', 'はい。私もよろしくお願いします。', 'はい。わたしもよろしくおねがいします。', 'Vâng. Tôi cũng mong được làm quen.', 'はい。わたしもよろしくおねがいします'),
          ],
          explanation: ['こちらこそ đáp lại lời chúc よろしくお願いします.', 'そうですか thể hiện mình đã nghe và tiếp nhận thông tin.'],
        },
        {
          id: 'leave-polite', title: 'Rời lớp một cách lịch sự', situation: 'Hết buổi, một người xin phép về trước.',
          lines: [
            dialogueLine('tanaka', 'じゃあ、お先に失礼します。', 'じゃあ、おさきにしつれいします。', 'Vậy, tôi xin phép về trước.', 'じゃあ、おさきにしつれいします'),
            dialogueLine('sato', 'はい、また明日。', 'はい、またあした。', 'Vâng, hẹn mai gặp.', 'はい、またあした'),
            dialogueLine('tanaka', 'また明日。お元気で。', 'またあした。おげんきで。', 'Hẹn mai gặp. Giữ sức khỏe nhé.', 'またあした。おげんきで'),
            dialogueLine('sato', 'お元気で。失礼します。', 'おげんきで。しつれいします。', 'Giữ sức khỏe nhé. Tôi xin phép.', 'おげんきで。しつれいします'),
          ],
          explanation: ['お先に失礼します dùng khi rời đi trước người khác.', 'お元気で dùng khi sẽ lâu mới gặp lại.'],
        },
        {
          id: 'casual-bye', title: 'Bạn bè chào tạm biệt', situation: 'Hai người bạn chia tay, hẹn tuần sau.',
          lines: [
            dialogueLine('ito', 'じゃあ、また来週。', 'じゃあ、またらいしゅう。', 'Thôi, hẹn tuần sau.', 'じゃあ、またらいしゅう'),
            dialogueLine('tanaka', 'また来週。お元気で。', 'またらいしゅう。おげんきで。', 'Hẹn tuần sau. Giữ sức khỏe nhé.', 'またらいしゅう。おげんきで'),
            dialogueLine('ito', 'うん、お元気で。', 'うん、おげんきで。', 'Ừ, giữ sức khỏe nhé.', 'うん、おげんきで'),
            dialogueLine('tanaka', 'じゃあ、また。', 'じゃあ、また。', 'Thôi, hẹn gặp lại.', 'じゃあ、また'),
          ],
          explanation: ['じゃあ、また và また来週 là cách chào thân mật giữa bạn bè.', 'Trong tình huống thân mật, thường bỏ chủ ngữ và nói ngắn.'],
        },
      ],
      grammarPatterns: [
        {
          title: 'こちらこそ — đáp lại cùng thiện chí', formula: 'よろしくお願（ねが）いします。→ こちらこそ。', formulaReading: 'よろしくおねがいします。→ こちらこそ。', meaning: 'Đáp lại lời chúc/thiện chí — "chính tôi mới phải nói vậy".',
          examples: [example('こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Tôi cũng rất mong được làm quen.')],
          explanation: ['Đáp lại lời làm quen: A nói よろしくお願いします, B đáp こちらこそ.'],
        },
        {
          title: 'また＋[mốc thời gian]', formula: 'また ＋ [時（とき）]', formulaReading: 'また ＋ [とき]', meaning: 'Hẹn gặp lại vào thời điểm nào đó.',
          examples: [example('また明日。', 'またあした。', 'Hẹn mai gặp.'), example('また来週。', 'またらいしゅう。', 'Hẹn tuần sau.'), example('また後で。', 'またあとで。', 'Hẹn lát nữa.')],
          explanation: ['また明日 = hẹn mai gặp; また来週 = hẹn tuần sau. Thay [時] bằng mốc thời gian phù hợp.'],
        },
        {
          title: '～も (…cũng…)', formula: '[名詞] ＋ も', formulaReading: '[めいし] ＋ も', meaning: 'Thêm も sau danh từ để nói "…cũng vậy".',
          examples: [example('私（わたし）も。', 'わたしも。', 'Tôi cũng vậy.'), example('私も失礼します。', 'わたしもしつれいします。', 'Tôi cũng xin phép.')],
          explanation: ['Thêm も sau danh từ để nói "…cũng vậy". Ví dụ: 私も = tôi cũng vậy.'],
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
    { id: 'kochira-koso', displayText: 'こちらこそ', reading: 'こちらこそ', romanization: 'kochira koso', speechText: 'こちらこそ', meaningVi: 'Tôi cũng vậy / Chính tôi mới phải nói thế.', translationByNative: vi('Tôi cũng vậy / Chính tôi mới phải nói thế.'), translations: vi('Tôi cũng vậy / Chính tôi mới phải nói thế.'), audioLocale: 'ja-JP' },
    { id: 'douzo-yoroshiku', displayText: 'どうぞよろしく', reading: 'どうぞよろしく', romanization: 'dōzo yoroshiku', speechText: 'どうぞよろしく', meaningVi: 'Rất mong được làm quen (thân thiện hơn một chút).', translationByNative: vi('Rất mong được làm quen (thân thiện hơn một chút).'), translations: vi('Rất mong được làm quen (thân thiện hơn một chút).'), audioLocale: 'ja-JP' },
    { id: 'sou-desu-ka', displayText: 'そうですか', reading: 'そうですか', romanization: 'sō desu ka', speechText: 'そうですか', meaningVi: 'Vậy à. / Ra vậy.', translationByNative: vi('Vậy à. / Ra vậy.'), translations: vi('Vậy à. / Ra vậy.'), audioLocale: 'ja-JP' },
    { id: 'watashi-mo', displayText: '私（わたし）も', reading: 'わたしも', romanization: 'watashi mo', speechText: 'わたしも', meaningVi: 'Tôi cũng vậy.', translationByNative: vi('Tôi cũng vậy.'), translations: vi('Tôi cũng vậy.'), audioLocale: 'ja-JP' },
    { id: 'shitsurei-shimasu', displayText: '失礼（しつれい）します', reading: 'しつれいします', romanization: 'shitsurei shimasu', speechText: 'しつれいします', meaningVi: 'Tôi xin phép. / Xin lỗi (khi rời đi).', translationByNative: vi('Tôi xin phép. / Xin lỗi (khi rời đi).'), translations: vi('Tôi xin phép. / Xin lỗi (khi rời đi).'), audioLocale: 'ja-JP' },
    { id: 'osaki-ni-shitsurei', displayText: 'お先（さき）に失礼（しつれい）します', reading: 'おさきにしつれいします', romanization: 'osaki ni shitsurei shimasu', speechText: 'おさきにしつれいします', meaningVi: 'Tôi xin phép về trước.', translationByNative: vi('Tôi xin phép về trước.'), translations: vi('Tôi xin phép về trước.'), audioLocale: 'ja-JP' },
    { id: 'ogenki-de', displayText: 'お元気（げんき）で', reading: 'おげんきで', romanization: 'o-genki de', speechText: 'おげんきで', meaningVi: 'Giữ sức khỏe nhé (khi lâu mới gặp lại).', translationByNative: vi('Giữ sức khỏe nhé (khi lâu mới gặp lại).'), translations: vi('Giữ sức khỏe nhé (khi lâu mới gặp lại).'), audioLocale: 'ja-JP' },
    { id: 'jaa-mata', displayText: 'じゃあ、また', reading: 'じゃあ、また', romanization: 'jā, mata', speechText: 'じゃあ、また', meaningVi: 'Thôi, hẹn gặp lại (thân mật).', translationByNative: vi('Thôi, hẹn gặp lại (thân mật).'), translations: vi('Thôi, hẹn gặp lại (thân mật).'), audioLocale: 'ja-JP' },
  ],
};

export const JA_UNIT1_LESSON3 = localizeSupport(JA_UNIT1_LESSON3_SOURCE);
