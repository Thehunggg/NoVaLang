// Bài tổng hợp cuối Unit 1 — Tiếng Nhật, Daily Life Module 1 (ADR-022).
//
// NỘI DUNG ĐÃ ĐƯỢC OWNER DUYỆT qua 6 vòng rà (đợt 1 sửa 3 lần, đợt 2 sửa 1 lần,
// đợt 3 duyệt thẳng). File này chỉ CHÉP LẠI nội dung đã duyệt vào đúng khuôn
// schema — KHÔNG sáng tác, KHÔNG tự sửa câu chữ (AGENTS.md).
//
// Luật viết: LESSON_AUTHORING_STANDARD §E4 (cấu trúc bài) · §D-Cloze (cách
// chấm) · §B16 (danh sách kiểm) · §G1–G9 (độ tin cậy ngôn ngữ).
//
// 25 câu, ba mức — generator tự ép dải order và số ô:
//   Q1–8   sentence_multi_blank_choice · 2 ô · chọn 1/4
//   Q9–18  dialogue_multi_blank_choice · hội thoại 2–3 lượt · 3 ô · chọn 1/4
//   Q19–25 typed_blank · người học TỰ GÕ
//
// LOCALIZE: `resolveUnitComprehensiveTest` KHÔNG chạy qua `localizeSupport`
// (khác đường lesson), nên mọi chuỗi hỗ trợ ở đây phải tự mang `*ByNative` đủ
// vi/en/ja. Không hard-code một ngôn ngữ vào chuỗi trần.

import { blank, blankSeg, choiceOption, dialogueTurn, review, seg } from '../../../lib/unit-comprehensive-test.mjs';

const L1 = 'ja-daily_life-m01-u1-l1';
const L2 = 'ja-daily_life-m01-u1-l2';
const L3 = 'ja-daily_life-m01-u1-l3';

const ID = 'ja-daily_life-m01-u1-comprehensive';
const qid = (order) => `${ID}-q${order}`;

/** Một chuỗi hỗ trợ đủ ba locale. */
const n = (vi, en, ja) => ({ vi, en, ja });

/**
 * Gói một câu: nhận chuỗi hỗ trợ dạng `n(...)` rồi tách thành giá trị mặc định
 * (vi) + bản `*ByNative`, để không chỗ nào hard-code một ngôn ngữ.
 */
const question = ({ order, kind, prompt, context, explanation, ...rest }) => ({
  id: qid(order),
  order,
  kind,
  prompt: prompt.vi,
  promptByNative: prompt,
  ...(context ? { context: context.vi, contextByNative: context } : {}),
  ...rest,
  explanation: explanation.vi,
  explanationByNative: explanation,
});

/** Ô của câu CHỌN phương án: `acceptedAnswers` chỉ phục vụ hiển thị + đối chiếu. */
const choiceBlank = (id, answer, audio) =>
  blank(id, {
    displayAnswer: answer,
    canonicalAnswer: answer,
    audioText: audio,
    acceptedAnswers: [answer],
  });

const PROMPT_SENTENCE = n(
  'Chọn phương án điền đúng cả hai ô.',
  'Choose the option that fills both blanks correctly.',
  '二つの空欄に正しく入る組み合わせを選んでください。',
);

/* ══ MỨC 1 — Q1–Q8 · sentence_multi_blank_choice · 2 ô ══════════════════ */

const SENTENCE_QUESTIONS = [
  question({
    order: 1,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Buổi sáng ở trường tiếng Nhật. Anna gặp Tanaka lần đầu và tự giới thiệu.',
      'Morning at the Japanese school. Anna meets Tanaka for the first time and introduces herself.',
      '日本語学校の朝。アンナさんは田中さんと初めて会い、自己紹介します。',
    ),
    segments: [
      seg('おはようございます。'),
      blankSeg('q1b1'),
      seg('、アンナです。'),
      blankSeg('q1b2'),
      seg('。'),
    ],
    blanks: [
      choiceBlank('q1b1', 'はじめまして', 'はじめまして'),
      choiceBlank('q1b2', 'よろしくお願いします', 'よろしくおねがいします'),
    ],
    options: [
      choiceOption('q1a', 'そうですか / よろしくお願いします', {
        q1b1: 'そうですか',
        q1b2: 'よろしくお願いします',
      }),
      choiceOption('q1b', 'はじめまして / よろしくお願いします', {
        q1b1: 'はじめまして',
        q1b2: 'よろしくお願いします',
      }),
      choiceOption('q1c', 'はじめまして / さようなら', {
        q1b1: 'はじめまして',
        q1b2: 'さようなら',
      }),
      choiceOption('q1d', 'はじめまして / 失礼します', {
        q1b1: 'はじめまして',
        q1b2: '失礼します',
      }),
    ],
    correctOptionId: 'q1b',
    reviews: [
      review(L1, 'vocabulary', 'hajimemashite'),
      review(L1, 'vocabulary', 'yoroshiku-onegaishimasu'),
    ],
    explanation: n(
      'そうですか dùng để tiếp nhận thông tin vừa nghe — đây là câu mở lời, chưa ai nói gì. さようなら là lời tạm biệt, vừa gặp mà chào tạm biệt là ngược giai đoạn. 失礼します là lời xin phép rời đi, vừa xưng tên xong đã xin đi là mâu thuẫn.',
      'そうですか takes in information you have just heard, but this is the opening line — nothing has been said yet. さようなら is a goodbye, so using it at a first meeting is out of order. 失礼します excuses you to leave, which contradicts having just given your name.',
      '「そうですか」は聞いた情報を受け止める言葉ですが、ここは最初の一言でまだ何も聞いていません。「さようなら」は別れのあいさつなので初対面の場面には合いません。「失礼します」は立ち去る言葉で、名乗った直後に言うのは矛盾します。',
    ),
  }),

  question({
    order: 2,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Bàn đăng ký buổi giao lưu. Nhân viên hỏi tên người đến dự.',
      'The registration desk at a meet-up. A staff member asks a guest’s name.',
      '交流会の受付。係の人が参加者の名前を尋ねます。',
    ),
    segments: [blankSeg('q2b1'), seg('、'), blankSeg('q2b2'), seg('は何ですか。')],
    blanks: [
      choiceBlank('q2b1', '失礼ですが', 'しつれいですが'),
      choiceBlank('q2b2', 'お名前', 'おなまえ'),
    ],
    options: [
      choiceOption('q2a', 'もう一度 / お名前', { q2b1: 'もう一度', q2b2: 'お名前' }),
      choiceOption('q2b', 'お先に失礼します / お名前', {
        q2b1: 'お先に失礼します',
        q2b2: 'お名前',
      }),
      choiceOption('q2c', '失礼ですが / お名前', { q2b1: '失礼ですが', q2b2: 'お名前' }),
      choiceOption('q2d', '失礼ですが / お名前は', {
        q2b1: '失礼ですが',
        q2b2: 'お名前は',
      }),
    ],
    correctOptionId: 'q2c',
    reviews: [
      review(L2, 'vocabulary', 'shitsurei-desu-ga'),
      review(L2, 'vocabulary', 'onamae'),
    ],
    explanation: n(
      'もう一度 dùng khi nhờ nhắc lại điều đã nói, mà ở đây chưa nghe gì. お先に失礼します là xin phép rời đi, xin đi rồi lại hỏi tên là mâu thuẫn. Ô thứ hai đã có sẵn は phía sau, điền お名前は thành 「お名前はは何ですか」, lặp trợ từ.',
      'もう一度 asks for something to be repeated, but nothing has been said yet. お先に失礼します excuses you to leave, which contradicts then asking for a name. The second blank is already followed by は, so お名前は would produce 「お名前はは何ですか」 with the particle twice.',
      '「もう一度」は言われたことを繰り返してもらうときの言葉ですが、まだ何も聞いていません。「お先に失礼します」は先に帰る言葉で、その後に名前を尋ねるのは矛盾します。二つ目の空欄の後にはすでに「は」があるため、「お名前は」を入れると「お名前はは何ですか」となり助詞が重なります。',
    ),
  }),

  question({
    order: 3,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Tanaka vừa tự giới thiệu và nói よろしくお願いします. Smith đáp lại.',
      'Tanaka has just introduced himself and said よろしくお願いします. Smith replies.',
      '田中さんが自己紹介して「よろしくお願いします」と言いました。スミスさんが返します。',
    ),
    segments: [seg('スミスです。'), blankSeg('q3b1'), seg('、'), blankSeg('q3b2'), seg('。')],
    blanks: [
      choiceBlank('q3b1', 'こちらこそ', 'こちらこそ'),
      choiceBlank('q3b2', 'よろしくお願いします', 'よろしくおねがいします'),
    ],
    options: [
      choiceOption('q3a', 'こちらこそ / よろしくお願いします', {
        q3b1: 'こちらこそ',
        q3b2: 'よろしくお願いします',
      }),
      choiceOption('q3b', '失礼ですが / よろしくお願いします', {
        q3b1: '失礼ですが',
        q3b2: 'よろしくお願いします',
      }),
      choiceOption('q3c', 'お先に失礼します / よろしくお願いします', {
        q3b1: 'お先に失礼します',
        q3b2: 'よろしくお願いします',
      }),
      choiceOption('q3d', 'こちらこそ / また来週', {
        q3b1: 'こちらこそ',
        q3b2: 'また来週',
      }),
    ],
    correctOptionId: 'q3a',
    reviews: [
      review(L3, 'vocabulary', 'kochira-koso'),
      review(L1, 'vocabulary', 'yoroshiku-onegaishimasu'),
    ],
    explanation: n(
      '失礼ですが mở đầu một câu hỏi lịch sự, không dùng để đáp lại lời chúc. お先に失礼します là xin phép rời đi, vừa được làm quen đã xin đi là mâu thuẫn. また来週 kết thúc cuộc gặp, trong khi hai người vừa mới làm quen.',
      '失礼ですが opens a polite question; it does not answer a good wish. お先に失礼します excuses you to leave, which contradicts having just been introduced. また来週 closes the encounter just as it begins.',
      '「失礼ですが」は丁寧に質問を切り出す言葉で、好意の言葉に返すものではありません。「お先に失礼します」は先に帰る言葉で、紹介された直後には合いません。「また来週」は出会ったばかりの場面を終わらせてしまいます。',
    ),
  }),

  question({
    order: 4,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Người đối diện vừa xưng 「伊藤です」. Tanaka xác nhận lại rồi tự giới thiệu.',
      'The other person has just said 「伊藤です」. Tanaka confirms the name, then introduces himself.',
      '相手が「伊藤です」と名乗りました。田中さんは名前を確認してから自己紹介します。',
    ),
    segments: [
      seg('あ、伊藤'),
      blankSeg('q4b1'),
      seg('。'),
      blankSeg('q4b2'),
      seg('、田中です。'),
    ],
    blanks: [
      choiceBlank('q4b1', 'さんですね', 'さんですね'),
      choiceBlank('q4b2', 'はじめまして', 'はじめまして'),
    ],
    options: [
      choiceOption('q4a', 'ですね / はじめまして', {
        q4b1: 'ですね',
        q4b2: 'はじめまして',
      }),
      choiceOption('q4b', 'さんですね / そうですか', {
        q4b1: 'さんですね',
        q4b2: 'そうですか',
      }),
      choiceOption('q4c', 'さんですね / さようなら', {
        q4b1: 'さんですね',
        q4b2: 'さようなら',
      }),
      choiceOption('q4d', 'さんですね / はじめまして', {
        q4b1: 'さんですね',
        q4b2: 'はじめまして',
      }),
    ],
    correctOptionId: 'q4d',
    reviews: [
      review(L2, 'grammar', '～ですね'),
      review(L1, 'vocabulary', 'hajimemashite'),
    ],
    explanation: n(
      'Thiếu さん sau tên người khác là bất lịch sự — L2 dạy ～さん đặt sau tên người khác. そうですか là câu tiếp nhận thông tin, không dùng để tự giới thiệu tên mình. さようなら là lời tạm biệt, chào tạm biệt rồi mới tự giới thiệu là ngược hẳn trình tự.',
      'Dropping さん after someone else’s name is impolite — L2 teaches ～さん for other people’s names. そうですか takes in information; it does not introduce yourself. さようなら is a goodbye, so saying it before introducing yourself reverses the order.',
      '相手の名前に「さん」を付けないのは失礼です。L2で「～さん」は相手の名前に付けると学びました。「そうですか」は情報を受け止める言葉で、自分の名前を名乗るものではありません。「さようなら」は別れの言葉なので、その後に名乗るのは順序が逆です。',
    ),
  }),

  question({
    order: 5,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Lần đầu gặp ở buổi giao lưu. Bạn xưng tên mình rồi hỏi lại tên của họ một cách lịch sự.',
      'A first meeting at a meet-up. You give your own name, then politely ask for theirs.',
      '交流会での初対面。自分の名前を言ってから、相手の名前を丁寧に尋ねます。',
    ),
    segments: [seg('私の'), blankSeg('q5b1'), seg('は田中です。'), blankSeg('q5b2'), seg('は？')],
    blanks: [
      choiceBlank('q5b1', '名前', 'なまえ'),
      choiceBlank('q5b2', 'お名前', 'おなまえ'),
    ],
    options: [
      choiceOption('q5a', 'お名前 / お名前', { q5b1: 'お名前', q5b2: 'お名前' }),
      choiceOption('q5b', '名前 / お名前', { q5b1: '名前', q5b2: 'お名前' }),
      choiceOption('q5c', '名前 / お名前は', { q5b1: '名前', q5b2: 'お名前は' }),
      choiceOption('q5d', '名前 / 名前', { q5b1: '名前', q5b2: '名前' }),
    ],
    correctOptionId: 'q5b',
    reviews: [
      review(L2, 'vocabulary', 'namae'),
      review(L2, 'vocabulary', 'onamae-wa'),
    ],
    explanation: n(
      'Thêm お cho tên của chính mình là tự nâng mình lên — L2 ghi rõ trong phần lưu ý: không nói 私のお名前は田中です. Ô thứ hai đã có sẵn は phía sau nên お名前は thành 「お名前はは？」, lặp trợ từ. Hỏi tên người mới gặp bằng 名前 trống thì cộc lốc.',
      'Adding お to your own name raises yourself — L2 states outright that you do not say 私のお名前は田中です. The second blank is already followed by は, so お名前は gives 「お名前はは？」 with the particle twice. Asking a stranger with a bare 名前 is blunt.',
      '自分の名前に「お」を付けるのは自分を高めることになります。L2でも「私のお名前は田中です」とは言わないと明記しています。二つ目の空欄の後にはすでに「は」があるため、「お名前は」だと「お名前はは？」となり助詞が重なります。初対面の相手に「名前」だけで尋ねるのはぶっきらぼうです。',
    ),
  }),

  question({
    order: 6,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Cuối giờ làm ở công ty. Satō về trước Tanaka; tuần sau hai người vẫn gặp nhau.',
      'End of the working day. Satō is leaving before Tanaka; they will see each other again next week.',
      '会社の終業時。佐藤さんは田中さんより先に帰ります。来週また会います。',
    ),
    segments: [seg('田中さん、'), blankSeg('q6b1'), seg('。'), blankSeg('q6b2'), seg('。')],
    blanks: [
      choiceBlank('q6b1', 'お先に失礼します', 'おさきにしつれいします'),
      choiceBlank('q6b2', 'また来週', 'またらいしゅう'),
    ],
    options: [
      choiceOption('q6a', 'お先に失礼します / また来週', {
        q6b1: 'お先に失礼します',
        q6b2: 'また来週',
      }),
      choiceOption('q6b', 'よろしくお願いします / また来週', {
        q6b1: 'よろしくお願いします',
        q6b2: 'また来週',
      }),
      choiceOption('q6c', 'お先に失礼します / はじめまして', {
        q6b1: 'お先に失礼します',
        q6b2: 'はじめまして',
      }),
      choiceOption('q6d', 'お先に失礼します / お名前は？', {
        q6b1: 'お先に失礼します',
        q6b2: 'お名前は？',
      }),
    ],
    correctOptionId: 'q6a',
    reviews: [
      review(L3, 'vocabulary', 'osaki-ni-shitsurei'),
      review(L3, 'grammar', 'また＋[mốc thời gian]'),
    ],
    explanation: n(
      'よろしくお願いします là lời chúc lúc làm quen, không phải lời xin phép rời đi. はじめまして dùng khi gặp lần đầu, còn đây là lúc chia tay giữa hai đồng nghiệp đã quen. Hỏi tên đồng nghiệp đã quen ngay lúc chia tay là lạc mạch.',
      'よろしくお願いします is said when meeting someone, not when excusing yourself to leave. はじめまして is for a first meeting, but this is two colleagues parting. Asking a familiar colleague’s name as you leave is off-topic.',
      '「よろしくお願いします」は知り合うときの言葉で、先に帰る許しを言うものではありません。「はじめまして」は初対面のときですが、ここは知り合いの同僚どうしの別れ際です。よく知っている同僚に別れ際に名前を尋ねるのは話の流れに合いません。',
    ),
  }),

  question({
    order: 7,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Buổi tối, Anna về tới sảnh chung cư thì gặp bà Tanaka — hàng xóm đã quen. Anna chào rồi xin phép đi tiếp.',
      'In the evening Anna reaches her apartment lobby and meets Mrs Tanaka, a neighbour she knows. Anna greets her, then excuses herself.',
      '夜、アンナさんがマンションのロビーで顔なじみの田中さんに会います。あいさつをして、その場を離れます。',
    ),
    segments: [
      blankSeg('q7b1'),
      seg('、田中さん。'),
      blankSeg('q7b2'),
      seg('。また明日。'),
    ],
    blanks: [
      choiceBlank('q7b1', 'こんばんは', 'こんばんは'),
      choiceBlank('q7b2', '失礼します', 'しつれいします'),
    ],
    options: [
      choiceOption('q7a', 'おはようございます / 失礼します', {
        q7b1: 'おはようございます',
        q7b2: '失礼します',
      }),
      choiceOption('q7b', 'こんばんは / はじめまして', {
        q7b1: 'こんばんは',
        q7b2: 'はじめまして',
      }),
      choiceOption('q7c', 'こんばんは / お名前は何ですか', {
        q7b1: 'こんばんは',
        q7b2: 'お名前は何ですか',
      }),
      choiceOption('q7d', 'こんばんは / 失礼します', {
        q7b1: 'こんばんは',
        q7b2: '失礼します',
      }),
    ],
    correctOptionId: 'q7d',
    reviews: [
      review(L1, 'vocabulary', 'konbanwa'),
      review(L3, 'vocabulary', 'shitsurei-shimasu'),
    ],
    explanation: n(
      'おはようございます là chào buổi sáng, mà bối cảnh ghi rõ buổi tối — chính L1 liệt kê "không dùng vào buổi sáng" cho こんばんは. はじめまして dùng khi gặp lần đầu, đây là hàng xóm đã quen. Hỏi tên hàng xóm đã quen là lạc mạch.',
      'おはようございます is a morning greeting, but the setting is evening — L1 itself lists “not in the morning” for こんばんは. はじめまして is for a first meeting, yet this neighbour is already known. Asking a familiar neighbour’s name is off-topic.',
      '「おはようございます」は朝のあいさつですが、場面は夜です。L1でも「こんばんは」について「朝には使わない」と示しています。「はじめまして」は初対面のときですが、相手は顔なじみの隣人です。よく知っている隣人に名前を尋ねるのは話の流れに合いません。',
    ),
  }),

  question({
    order: 8,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Đồng nghiệp báo tuần sau chuyển đến Tokyo, lâu mới gặp lại. Bạn tiếp nhận tin rồi chào tạm biệt.',
      'A colleague says they are moving to Tokyo next week and you will not meet again for a long while. You take the news in, then say goodbye.',
      '同僚が来週から東京に引っ越すと言いました。しばらく会えません。その知らせを受け止めて、別れのあいさつをします。',
    ),
    segments: [blankSeg('q8b1'), seg('。じゃあ、'), blankSeg('q8b2'), seg('。')],
    blanks: [
      choiceBlank('q8b1', 'そうですか', 'そうですか'),
      choiceBlank('q8b2', 'お元気で', 'おげんきで'),
    ],
    options: [
      choiceOption('q8a', 'こちらこそ / お元気で', {
        q8b1: 'こちらこそ',
        q8b2: 'お元気で',
      }),
      choiceOption('q8b', 'そうですか / よろしくお願いします', {
        q8b1: 'そうですか',
        q8b2: 'よろしくお願いします',
      }),
      choiceOption('q8c', 'そうですか / お元気で', {
        q8b1: 'そうですか',
        q8b2: 'お元気で',
      }),
      choiceOption('q8d', 'そうですか / また来週', {
        q8b1: 'そうですか',
        q8b2: 'また来週',
      }),
    ],
    correctOptionId: 'q8c',
    reviews: [
      review(L3, 'vocabulary', 'sou-desu-ka'),
      review(L3, 'vocabulary', 'ogenki-de'),
    ],
    explanation: n(
      'こちらこそ chỉ dùng để đáp lại thiện chí ai đó vừa bày tỏ, còn ở đây đối phương đang báo tin. よろしくお願いします là lời chúc lúc làm quen, không phải lời dặn khi chia tay xa. Đối phương chuyển đi từ tuần sau nên hẹn また来週 là tự mâu thuẫn. お元気で đúng vì mốc gặp lại từ một tuần trở lên.',
      'こちらこそ only answers goodwill someone has just expressed, but here they are delivering news. よろしくお願いします belongs to a first meeting, not to a long goodbye. They are moving away next week, so また来週 contradicts the news. お元気で fits because the next meeting is a week or more away.',
      '「こちらこそ」は相手が示した好意に返す言葉ですが、ここでは相手が知らせを伝えています。「よろしくお願いします」は知り合うときの言葉で、長い別れの言葉ではありません。相手は来週から引っ越すので「また来週」は矛盾します。次に会うのが一週間以上先なので「お元気で」が合います。',
    ),
  }),
];

/* ══ Bài tổng hợp ══════════════════════════════════════════════════════ */

export const JA_M01_U1_COMPREHENSIVE = {
  title: 'Bài tổng hợp Unit 1',
  titleByNative: n('Bài tổng hợp Unit 1', 'Unit 1 Comprehensive Test', '第1ユニット総合テスト'),
  description: 'Ôn lại toàn bộ Unit 1: chào hỏi, hỏi tên, đáp lại và chào tạm biệt.',
  descriptionByNative: n(
    'Ôn lại toàn bộ Unit 1: chào hỏi, hỏi tên, đáp lại và chào tạm biệt.',
    'Reviews all of Unit 1: greetings, asking names, replying, and saying goodbye.',
    '第1ユニット全体の復習：あいさつ、名前の尋ね方、返し方、別れのあいさつ。',
  ),
  estimatedMinutes: '15',
  questions: [...SENTENCE_QUESTIONS],
};
