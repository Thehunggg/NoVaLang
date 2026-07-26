// Bài tổng hợp cuối Unit 1 — Tiếng Nhật, Daily Life Module 1 (ADR-022).
//
// NỘI DUNG ĐÃ ĐƯỢC OWNER DUYỆT qua 6 vòng rà (đợt 1 sửa 3 lần, đợt 2 sửa 1 lần,
// đợt 3 duyệt thẳng). File này chỉ CHÉP LẠI nội dung đã duyệt vào đúng khuôn
// schema — KHÔNG sáng tác, KHÔNG tự sửa câu chữ (AGENTS.md).
//
// Luật viết: LESSON_AUTHORING_STANDARD §E4 (cấu trúc bài) · §D-Cloze (cách
// chấm) · §B16 (danh sách kiểm) · §G1–G9 (độ tin cậy ngôn ngữ).
//
// 25 câu, hai mức — generator tự ép dải order và số ô:
//   Q1–8   sentence_multi_blank_choice · 2 ô · chọn 1/4
//   Q9–25  dialogue_multi_blank_choice · hội thoại 2–3 lượt · 3 ô · chọn 1/4
//
// Dạng typed_blank (tự gõ) đã BỎ 2026-07-25 — xem SECTION_KINDS trong generator.
//
// LOCALIZE: `resolveUnitComprehensiveTest` KHÔNG chạy qua `localizeSupport`
// (khác đường lesson), nên mọi chuỗi hỗ trợ ở đây phải tự mang `*ByNative` đủ
// vi/en/ja. Không hard-code một ngôn ngữ vào chuỗi trần.

import { blank, blankSeg, choiceOption, dialogueTurn, review, seg } from '../../../lib/unit-comprehensive-helpers.mjs';

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


const PROMPT_DIALOGUE = n(
  'Đọc hội thoại rồi chọn phương án điền đúng cả ba ô.',
  'Read the dialogue, then choose the option that fills all three blanks correctly.',
  '会話を読んで、三つの空欄に正しく入る組み合わせを選んでください。',
);

/* ══ MỨC 2 — Q9–Q18 · dialogue_multi_blank_choice · 3 ô ═════════════════ */

const DIALOGUE_QUESTIONS = [
  question({
    order: 9,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi giao lưu. Satō và Smith gặp nhau lần đầu.',
      'A meet-up. Satō and Smith meet for the first time.',
      '交流会。佐藤さんとスミスさんが初めて会います。',
    ),
    dialogue: [
      dialogueTurn('q9t1', '佐藤', [blankSeg('q9b1'), seg('。佐藤です。')]),
      dialogueTurn('q9t2', 'スミス', [
        seg('私'),
        blankSeg('q9b2'),
        seg('スミスです。よろしくお願いします。'),
      ]),
      dialogueTurn('q9t3', '佐藤', [
        seg('スミス'),
        blankSeg('q9b3'),
        seg('。こちらこそ、よろしくお願いします。'),
      ]),
    ],
    blanks: [
      choiceBlank('q9b1', 'はじめまして', 'はじめまして'),
      choiceBlank('q9b2', 'は', 'は'),
      choiceBlank('q9b3', 'さんですね', 'さんですね'),
    ],
    options: [
      choiceOption('q9a', 'はじめまして / も / さんですね', {
        q9b1: 'はじめまして', q9b2: 'も', q9b3: 'さんですね',
      }),
      choiceOption('q9b', 'はじめまして / は / ですね', {
        q9b1: 'はじめまして', q9b2: 'は', q9b3: 'ですね',
      }),
      choiceOption('q9c', 'はじめまして / は / さんですね', {
        q9b1: 'はじめまして', q9b2: 'は', q9b3: 'さんですね',
      }),
      choiceOption('q9d', 'そうですか / は / さんですね', {
        q9b1: 'そうですか', q9b2: 'は', q9b3: 'さんですね',
      }),
    ],
    correctOptionId: 'q9c',
    reviews: [
      review(L1, 'vocabulary', 'hajimemashite'),
      review(L1, 'grammar', '私は[名前]です'),
      review(L2, 'grammar', '～ですね'),
    ],
    explanation: n(
      '「私もスミスです」 nghĩa là "tôi CŨNG là Smith", nhưng chưa ai tên Smith trước đó — nêu tên mình phải dùng は. Thiếu さん sau tên người khác là bất lịch sự. そうですか để tiếp nhận thông tin, mà đây là câu mở lời đầu tiên.',
      '「私もスミスです」 means "I am Smith TOO", but nobody before was called Smith — giving your own name takes は. Dropping さん after another person’s name is impolite. そうですか takes in information, yet this is the opening line.',
      '「私もスミスです」は「私もスミス」という意味になりますが、前にスミスという人はいません。自分の名前を言うときは「は」を使います。相手の名前に「さん」を付けないのは失礼です。「そうですか」は情報を受け止める言葉ですが、ここは最初の一言です。',
    ),
  }),

  question({
    order: 10,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Bàn đăng ký buổi giao lưu. Nhân viên hỏi tên nhưng nghe không rõ.',
      'The registration desk at a meet-up. The staff member asks a name but does not catch it.',
      '交流会の受付。係の人が名前を尋ねますが、聞き取れませんでした。',
    ),
    dialogue: [
      dialogueTurn('q10t1', '受付', [
        blankSeg('q10b1'), seg('、'), blankSeg('q10b2'), seg('は何ですか。'),
      ]),
      dialogueTurn('q10t2', 'スミス', [seg('スミスです。')]),
      dialogueTurn('q10t3', '受付', [
        seg('すみません、'), blankSeg('q10b3'), seg('お願いします。'),
      ]),
    ],
    blanks: [
      choiceBlank('q10b1', '失礼ですが', 'しつれいですが'),
      choiceBlank('q10b2', 'お名前', 'おなまえ'),
      choiceBlank('q10b3', 'もう一度', 'もういちど'),
    ],
    options: [
      choiceOption('q10a', '失礼ですが / お名前 / もう一度', {
        q10b1: '失礼ですが', q10b2: 'お名前', q10b3: 'もう一度',
      }),
      choiceOption('q10b', '失礼ですが / 私のお名前 / もう一度', {
        q10b1: '失礼ですが', q10b2: '私のお名前', q10b3: 'もう一度',
      }),
      choiceOption('q10c', 'お先に失礼します / お名前 / もう一度', {
        q10b1: 'お先に失礼します', q10b2: 'お名前', q10b3: 'もう一度',
      }),
      choiceOption('q10d', '失礼ですが / お名前 / さようなら', {
        q10b1: '失礼ですが', q10b2: 'お名前', q10b3: 'さようなら',
      }),
    ],
    correctOptionId: 'q10a',
    reviews: [
      review(L2, 'vocabulary', 'shitsurei-desu-ga'),
      review(L2, 'vocabulary', 'onamae'),
      review(L2, 'vocabulary', 'mou-ichido'),
    ],
    explanation: n(
      '私のお名前 là dạng L2 cấm rõ, và ở đây còn thành ra nhân viên hỏi tên của chính mình. お先に失礼します là xin phép rời đi, xin đi rồi lại hỏi tên là mâu thuẫn. さようなら là lời tạm biệt, không thành một lời nhờ.',
      '私のお名前 is the form L2 explicitly forbids, and here it would have the staff asking their own name. お先に失礼します excuses you to leave, contradicting then asking a name. さようなら is a goodbye and cannot form a request.',
      '「私のお名前」はL2が明確に禁じている形で、ここでは係の人が自分の名前を尋ねることになります。「お先に失礼します」は先に帰る言葉で、その後に名前を尋ねるのは矛盾します。「さようなら」は別れの言葉で、依頼の言葉にはなりません。',
    ),
  }),

  question({
    order: 11,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Cổng trường sau buổi học. Anna và bạn cùng lớp Itō chia tay; tuần sau mới có buổi học tiếp.',
      'At the school gate after class. Anna and her classmate Itō part; the next class is next week.',
      '授業のあとの校門。アンナさんとクラスメートの伊藤さんが別れます。次の授業は来週です。',
    ),
    dialogue: [
      dialogueTurn('q11t1', 'アンナ', [
        seg('伊藤'), blankSeg('q11b1'), seg('、'), blankSeg('q11b2'), seg('。'),
      ]),
      dialogueTurn('q11t2', '伊藤', [
        seg('また'), blankSeg('q11b3'), seg('。さようなら。'),
      ]),
    ],
    blanks: [
      choiceBlank('q11b1', 'さん', 'さん'),
      choiceBlank('q11b2', 'じゃあ、また', 'じゃあ、また'),
      choiceBlank('q11b3', '来週', 'らいしゅう'),
    ],
    options: [
      choiceOption('q11a', 'さん / じゃあ、また / 明日', {
        q11b1: 'さん', q11b2: 'じゃあ、また', q11b3: '明日',
      }),
      choiceOption('q11b', 'さんですね / じゃあ、また / 来週', {
        q11b1: 'さんですね', q11b2: 'じゃあ、また', q11b3: '来週',
      }),
      choiceOption('q11c', 'さん / はじめまして / 来週', {
        q11b1: 'さん', q11b2: 'はじめまして', q11b3: '来週',
      }),
      choiceOption('q11d', 'さん / じゃあ、また / 来週', {
        q11b1: 'さん', q11b2: 'じゃあ、また', q11b3: '来週',
      }),
    ],
    correctOptionId: 'q11d',
    reviews: [
      review(L2, 'vocabulary', 'san'),
      review(L3, 'vocabulary', 'jaa-mata'),
      review(L3, 'vocabulary', 'raishuu'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ tuần sau mới có buổi học tiếp, nên また明日 mâu thuẫn với chính thông tin đã cho. 「伊藤さんですね」 là câu xác nhận tên người mới biết, còn đây là bạn cùng lớp đã quen. はじめまして dùng khi gặp lần đầu, không phải lúc chia tay.',
      'The setting says the next class is next week, so また明日 contradicts the given information. 「伊藤さんですね」 confirms the name of someone newly met, but this is a familiar classmate. はじめまして is for a first meeting, not a parting.',
      '次の授業は来週だと場面に書かれているので、「また明日」は与えられた情報と矛盾します。「伊藤さんですね」は知り合ったばかりの人の名前を確認する言葉ですが、相手はよく知っているクラスメートです。「はじめまして」は初対面のときで、別れ際には使いません。',
    ),
  }),

  question({
    order: 12,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi giao lưu. Smith tự giới thiệu với cả nhóm; Anna đáp lại; Itō cũng đáp theo.',
      'A meet-up. Smith introduces himself to the group; Anna replies; Itō follows.',
      '交流会。スミスさんがみんなに自己紹介し、アンナさんが返し、伊藤さんも続きます。',
    ),
    dialogue: [
      dialogueTurn('q12t1', 'スミス', [
        seg('はじめまして。スミスです。'), blankSeg('q12b1'), seg('。'),
      ]),
      dialogueTurn('q12t2', 'アンナ', [
        blankSeg('q12b2'), seg('、よろしくお願いします。'),
      ]),
      dialogueTurn('q12t3', '伊藤', [
        blankSeg('q12b3'), seg('、よろしくお願いします。'),
      ]),
    ],
    blanks: [
      choiceBlank('q12b1', 'よろしくお願いします', 'よろしくおねがいします'),
      choiceBlank('q12b2', 'こちらこそ', 'こちらこそ'),
      choiceBlank('q12b3', '私も', 'わたしも'),
    ],
    options: [
      choiceOption('q12a', 'よろしくお願いします / こちらこそ / 私は', {
        q12b1: 'よろしくお願いします', q12b2: 'こちらこそ', q12b3: '私は',
      }),
      choiceOption('q12b', 'よろしくお願いします / こちらこそ / 私も', {
        q12b1: 'よろしくお願いします', q12b2: 'こちらこそ', q12b3: '私も',
      }),
      choiceOption('q12c', 'よろしくお願いします / お元気で / 私も', {
        q12b1: 'よろしくお願いします', q12b2: 'お元気で', q12b3: '私も',
      }),
      choiceOption('q12d', 'お先に失礼します / こちらこそ / 私も', {
        q12b1: 'お先に失礼します', q12b2: 'こちらこそ', q12b3: '私も',
      }),
    ],
    correctOptionId: 'q12b',
    reviews: [
      review(L1, 'vocabulary', 'yoroshiku-onegaishimasu'),
      review(L3, 'vocabulary', 'kochira-koso'),
      review(L3, 'grammar', '～も'),
    ],
    explanation: n(
      '私は nêu chủ đề, không diễn đạt "tôi cũng vậy" — L3 dạy ～も cho nghĩa đó. お元気で là lời chia tay khi lâu mới gặp lại, còn đây là lúc vừa làm quen và cả nhóm còn đang ở đó. お先に失礼します là xin phép về trước, vừa xưng tên đã xin về là mâu thuẫn.',
      '私は marks a topic; it does not mean "me too" — L3 teaches ～も for that. お元気で is a goodbye for a long parting, but everyone has just met and is still there. お先に失礼します excuses you to leave, contradicting having just given your name.',
      '「私は」は主題を示す言い方で、「私も」の意味にはなりません。L3で「～も」を学びました。「お元気で」はしばらく会わないときの別れの言葉ですが、ここは知り合ったばかりで皆その場にいます。「お先に失礼します」は先に帰る言葉で、名乗った直後には矛盾します。',
    ),
  }),

  question({
    order: 13,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi sáng ở lớp. Anna chào bạn cùng lớp Tanaka, đi cùng bạn học mới là Smith.',
      'Morning in class. Anna greets her classmate Tanaka, with the new student Smith beside her.',
      '朝の教室。アンナさんがクラスメートの田中さんにあいさつします。新しい学習者のスミスさんも一緒です。',
    ),
    dialogue: [
      dialogueTurn('q13t1', 'アンナ', [
        blankSeg('q13b1'), seg('、田中'), blankSeg('q13b2'), seg('。'),
      ]),
      dialogueTurn('q13t2', '田中', [seg('おはようございます。')]),
      dialogueTurn('q13t3', 'スミス', [
        blankSeg('q13b3'), seg('。スミスです。よろしくお願いします。'),
      ]),
    ],
    blanks: [
      choiceBlank('q13b1', 'おはようございます', 'おはようございます'),
      choiceBlank('q13b2', 'さん', 'さん'),
      choiceBlank('q13b3', 'はじめまして', 'はじめまして'),
    ],
    options: [
      choiceOption('q13a', 'おはようございます / さん / はじめまして', {
        q13b1: 'おはようございます', q13b2: 'さん', q13b3: 'はじめまして',
      }),
      choiceOption('q13b', 'こんばんは / さん / はじめまして', {
        q13b1: 'こんばんは', q13b2: 'さん', q13b3: 'はじめまして',
      }),
      choiceOption('q13c', 'おはようございます / さん / そうですか', {
        q13b1: 'おはようございます', q13b2: 'さん', q13b3: 'そうですか',
      }),
      choiceOption('q13d', 'おはようございます / も / はじめまして', {
        q13b1: 'おはようございます', q13b2: 'も', q13b3: 'はじめまして',
      }),
    ],
    correctOptionId: 'q13a',
    reviews: [
      review(L1, 'vocabulary', 'ohayo-gozaimasu'),
      review(L2, 'vocabulary', 'san'),
      review(L1, 'vocabulary', 'hajimemashite'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ buổi sáng, mà chính L1 liệt kê "không dùng vào buổi sáng" cho こんばんは. そうですか để tiếp nhận thông tin, nhưng đây là câu đầu tiên Smith nói. 「田中も」 nghĩa là "Tanaka cũng vậy", mà không có ai khác được chào trước đó.',
      'The setting is morning, and L1 itself lists "not in the morning" for こんばんは. そうですか takes in information, but this is Smith’s first line. 「田中も」 means "Tanaka too", yet nobody else was greeted before.',
      '場面は朝で、L1でも「こんばんは」について「朝には使わない」と示しています。「そうですか」は情報を受け止める言葉ですが、ここはスミスさんの最初の一言です。「田中も」は「田中さんも」という意味になりますが、前に他の人にあいさつしていません。',
    ),
  }),

  question({
    order: 14,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Phòng chờ trước giờ học. Hai học viên chưa quen nhau hỏi tên nhau.',
      'The waiting room before class. Two learners who have not met ask each other’s names.',
      '授業前の待合室。初対面の学習者どうしが名前を尋ね合います。',
    ),
    dialogue: [
      dialogueTurn('q14t1', '田中', [
        seg('失礼ですが、'), blankSeg('q14b1'), seg('は何ですか。'),
      ]),
      dialogueTurn('q14t2', 'スミス', [
        seg('私の'), blankSeg('q14b2'), seg('はスミスです。'),
        blankSeg('q14b3'), seg('は？'),
      ]),
      dialogueTurn('q14t3', '田中', [seg('田中です。')]),
    ],
    blanks: [
      choiceBlank('q14b1', 'お名前', 'おなまえ'),
      choiceBlank('q14b2', '名前', 'なまえ'),
      choiceBlank('q14b3', 'お名前', 'おなまえ'),
    ],
    options: [
      choiceOption('q14a', 'お名前 / お名前 / お名前', {
        q14b1: 'お名前', q14b2: 'お名前', q14b3: 'お名前',
      }),
      choiceOption('q14b', 'お名前 / 名前 / 何ですか', {
        q14b1: 'お名前', q14b2: '名前', q14b3: '何ですか',
      }),
      choiceOption('q14c', 'お名前 / 名前 / お名前', {
        q14b1: 'お名前', q14b2: '名前', q14b3: 'お名前',
      }),
      choiceOption('q14d', '私のお名前 / 名前 / お名前', {
        q14b1: '私のお名前', q14b2: '名前', q14b3: 'お名前',
      }),
    ],
    correctOptionId: 'q14c',
    reviews: [
      review(L2, 'vocabulary', 'onamae'),
      review(L2, 'vocabulary', 'namae'),
      review(L2, 'vocabulary', 'onamae-wa'),
    ],
    explanation: n(
      '「私のお名前はスミスです」 chính là câu L2 cấm rõ — thêm お cho tên của chính mình là tự nâng mình lên. 「何ですか」 đứng một mình dùng để hỏi VẬT là gì, hỏi tên người phải là 「お名前は？」. Ô đầu điền 私のお名前 thì thành ra người hỏi đang hỏi tên chính mình.',
      '「私のお名前はスミスです」 is exactly what L2 forbids — adding お to your own name raises yourself. A bare 「何ですか」 asks what an object is; a person’s name takes 「お名前は？」. Putting 私のお名前 in the first blank has the asker asking their own name.',
      '「私のお名前はスミスです」はL2が明確に禁じている形で、自分の名前に「お」を付けるのは自分を高めることになります。「何ですか」だけでは物が何かを尋ねる言い方で、人の名前は「お名前は？」で尋ねます。最初の空欄に「私のお名前」を入れると、尋ねる側が自分の名前を尋ねることになります。',
    ),
  }),

  question({
    order: 15,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Cuối giờ làm ở công ty. Satō về trước Tanaka; mai hai người vẫn gặp nhau.',
      'End of the working day. Satō leaves before Tanaka; they will see each other tomorrow.',
      '会社の終業時。佐藤さんは田中さんより先に帰ります。明日また会います。',
    ),
    dialogue: [
      dialogueTurn('q15t1', '佐藤', [
        seg('田中'), blankSeg('q15b1'), seg('、'), blankSeg('q15b2'), seg('。'),
      ]),
      dialogueTurn('q15t2', '田中', [blankSeg('q15b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q15b1', 'さん', 'さん'),
      choiceBlank('q15b2', 'お先に失礼します', 'おさきにしつれいします'),
      choiceBlank('q15b3', 'また明日', 'またあした'),
    ],
    options: [
      choiceOption('q15a', 'さん / お先に失礼します / お元気で', {
        q15b1: 'さん', q15b2: 'お先に失礼します', q15b3: 'お元気で',
      }),
      choiceOption('q15b', 'さん / お先に失礼します / また明日', {
        q15b1: 'さん', q15b2: 'お先に失礼します', q15b3: 'また明日',
      }),
      choiceOption('q15c', 'さん / はじめまして / また明日', {
        q15b1: 'さん', q15b2: 'はじめまして', q15b3: 'また明日',
      }),
      choiceOption('q15d', 'ですね / お先に失礼します / また明日', {
        q15b1: 'ですね', q15b2: 'お先に失礼します', q15b3: 'また明日',
      }),
    ],
    correctOptionId: 'q15b',
    reviews: [
      review(L2, 'vocabulary', 'san'),
      review(L3, 'vocabulary', 'osaki-ni-shitsurei'),
      review(L3, 'grammar', 'また＋[mốc thời gian]'),
    ],
    explanation: n(
      'お元気で dùng khi chia tay từ một tuần trở lên, mà bối cảnh ghi rõ mai hai người vẫn gặp — mốc quá gần. はじめまして dùng khi gặp lần đầu, đây là lúc chia tay cuối ngày giữa hai đồng nghiệp đã quen. 「田中ですね」 thiếu さん sau tên người khác.',
      'お元気で is for a parting of a week or more, but the setting says they meet again tomorrow — far too near. はじめまして is for a first meeting, yet this is two familiar colleagues parting. 「田中ですね」 drops the さん after another person’s name.',
      '「お元気で」は一週間以上会わないときの言葉ですが、場面では明日また会うと書かれていて近すぎます。「はじめまして」は初対面のときですが、ここは知り合いの同僚どうしの終業時の別れです。「田中ですね」は相手の名前に「さん」が抜けています。',
    ),
  }),

  question({
    order: 16,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Satō sắp chuyển đi xa, lâu mới gặp lại. Chia tay bạn cùng lớp Itō ở cổng trường.',
      'Satō is moving away and they will not meet again for a long while. Parting from classmate Itō at the school gate.',
      '佐藤さんは遠くへ引っ越し、しばらく会えません。校門でクラスメートの伊藤さんと別れます。',
    ),
    dialogue: [
      dialogueTurn('q16t1', '佐藤', [
        seg('伊藤'), blankSeg('q16b1'), seg('、'), blankSeg('q16b2'), seg('。'),
      ]),
      dialogueTurn('q16t2', '伊藤', [
        seg('さようなら。'), blankSeg('q16b3'), seg('。'),
      ]),
    ],
    blanks: [
      choiceBlank('q16b1', 'さん', 'さん'),
      choiceBlank('q16b2', 'さようなら', 'さようなら'),
      choiceBlank('q16b3', 'お元気で', 'おげんきで'),
    ],
    options: [
      choiceOption('q16a', 'さん / さようなら / また来週', {
        q16b1: 'さん', q16b2: 'さようなら', q16b3: 'また来週',
      }),
      choiceOption('q16b', 'さん / じゃあ、また / お元気で', {
        q16b1: 'さん', q16b2: 'じゃあ、また', q16b3: 'お元気で',
      }),
      choiceOption('q16c', 'さんですね / さようなら / お元気で', {
        q16b1: 'さんですね', q16b2: 'さようなら', q16b3: 'お元気で',
      }),
      choiceOption('q16d', 'さん / さようなら / お元気で', {
        q16b1: 'さん', q16b2: 'さようなら', q16b3: 'お元気で',
      }),
    ],
    correctOptionId: 'q16d',
    reviews: [
      review(L2, 'vocabulary', 'san'),
      review(L1, 'vocabulary', 'sayounara'),
      review(L3, 'vocabulary', 'ogenki-de'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ Satō chuyển đi xa, nên hẹn また来週 là mâu thuẫn với chính thông tin đã cho. じゃあ、また là lời chia tay ngắn hạn, không hợp mốc từ một tuần trở lên. 「伊藤さんですね」 là câu xác nhận tên người mới biết, còn đây là bạn đã quen.',
      'The setting says Satō is moving away, so また来週 contradicts the given information. じゃあ、また is a short-term goodbye and does not fit a parting of a week or more. 「伊藤さんですね」 confirms the name of someone newly met, but this friend is already known.',
      '佐藤さんが遠くへ引っ越すと場面に書かれているので、「また来週」は与えられた情報と矛盾します。「じゃあ、また」は近いうちに会うときの別れの言葉で、一週間以上先には合いません。「伊藤さんですね」は知り合ったばかりの人の名前を確認する言葉ですが、相手はよく知っている友達です。',
    ),
  }),

  question({
    order: 17,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi giao lưu. Satō nhớ nhầm tên Smith thành Itō; Smith sửa lại.',
      'A meet-up. Satō misremembers Smith’s name as Itō; Smith corrects it.',
      '交流会。佐藤さんがスミスさんの名前を伊藤さんと勘違いし、スミスさんが訂正します。',
    ),
    dialogue: [
      dialogueTurn('q17t1', '佐藤', [seg('伊藤'), blankSeg('q17b1'), seg('。')]),
      dialogueTurn('q17t2', 'スミス', [
        seg('すみません、私'), blankSeg('q17b2'), seg('スミスです。'),
      ]),
      dialogueTurn('q17t3', '佐藤', [
        blankSeg('q17b3'), seg('。スミスさんですね。'),
      ]),
    ],
    blanks: [
      choiceBlank('q17b1', 'さんですね', 'さんですね'),
      choiceBlank('q17b2', 'は', 'は'),
      choiceBlank('q17b3', 'そうですか', 'そうですか'),
    ],
    options: [
      choiceOption('q17a', 'さんですね / は / そうですか', {
        q17b1: 'さんですね', q17b2: 'は', q17b3: 'そうですか',
      }),
      choiceOption('q17b', 'さんです / は / そうですか', {
        q17b1: 'さんです', q17b2: 'は', q17b3: 'そうですか',
      }),
      choiceOption('q17c', 'さんですね / は / さようなら', {
        q17b1: 'さんですね', q17b2: 'は', q17b3: 'さようなら',
      }),
      choiceOption('q17d', 'さんですね / の / そうですか', {
        q17b1: 'さんですね', q17b2: 'の', q17b3: 'そうですか',
      }),
    ],
    correctOptionId: 'q17a',
    reviews: [
      review(L2, 'grammar', '～ですね'),
      review(L1, 'grammar', '私は[名前]です'),
      review(L3, 'vocabulary', 'sou-desu-ka'),
    ],
    explanation: n(
      '「伊藤さんです」 là câu giới thiệu hoặc kể về người thứ ba; nói thẳng với chính người đó để xác nhận thì phải dùng ですね. さようなら là lời tạm biệt, đang giữa lúc xác minh lại tên mà chào tạm biệt là ngược trình tự. の là trợ từ sở hữu, không nêu chủ đề — nêu tên mình phải dùng は.',
      '「伊藤さんです」 introduces or describes a third person; confirming with the person themselves takes ですね. さようなら is a goodbye, so saying it mid-clarification reverses the order. の marks possession, not topic — giving your own name takes は.',
      '「伊藤さんです」は第三者を紹介したり説明したりする言い方で、本人に確認するときは「ですね」を使います。「さようなら」は別れの言葉で、名前を確かめている途中に言うのは順序が逆です。「の」は所有を示す助詞で主題は示しません。自分の名前を言うときは「は」を使います。',
    ),
  }),

  question({
    order: 18,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Cuối buổi học. Smith và Anna chào thầy rồi ra về; tuần sau lại có buổi học.',
      'End of class. Smith and Anna say goodbye to the teacher and leave; there is another class next week.',
      '授業の終わり。スミスさんとアンナさんが先生にあいさつして帰ります。来週も授業があります。',
    ),
    dialogue: [
      dialogueTurn('q18t1', 'スミス', [seg('先生、'), blankSeg('q18b1'), seg('。')]),
      dialogueTurn('q18t2', '先生', [blankSeg('q18b2'), seg('。')]),
      dialogueTurn('q18t3', 'アンナ', [
        seg('私'), blankSeg('q18b3'), seg('。また来週。'),
      ]),
    ],
    blanks: [
      choiceBlank('q18b1', '失礼します', 'しつれいします'),
      choiceBlank('q18b2', 'さようなら', 'さようなら'),
      choiceBlank('q18b3', 'も', 'も'),
    ],
    options: [
      choiceOption('q18a', '失礼します / さようなら / は', {
        q18b1: '失礼します', q18b2: 'さようなら', q18b3: 'は',
      }),
      choiceOption('q18b', 'じゃあ、また / さようなら / も', {
        q18b1: 'じゃあ、また', q18b2: 'さようなら', q18b3: 'も',
      }),
      choiceOption('q18c', '失礼します / さようなら / も', {
        q18b1: '失礼します', q18b2: 'さようなら', q18b3: 'も',
      }),
      choiceOption('q18d', '失礼します / こちらこそ / も', {
        q18b1: '失礼します', q18b2: 'こちらこそ', q18b3: 'も',
      }),
    ],
    correctOptionId: 'q18c',
    reviews: [
      review(L3, 'vocabulary', 'shitsurei-shimasu'),
      review(L1, 'vocabulary', 'sayounara'),
      review(L3, 'grammar', '～も'),
    ],
    explanation: n(
      'L3 ghi rõ: không dùng じゃあ、また với thầy cô — đó là cách nói thân mật dành cho bạn bè, còn 失礼します mới dùng được với người trên. 「私は」 nêu chủ đề rồi bỏ lửng, không diễn đạt "tôi cũng vậy". こちらこそ dùng để đáp lại thiện chí, mà học viên chỉ đang chào ra về.',
      'L3 states outright that じゃあ、また is not used with teachers — it is the casual form for friends, while 失礼します is the one that works upward. 「私は」 opens a topic and leaves it hanging; it does not mean "me too". こちらこそ answers goodwill, but the learners are simply saying goodbye.',
      'L3では「じゃあ、また」を先生には使わないと明記しています。友達に使うカジュアルな言い方で、目上の人には「失礼します」を使います。「私は」は主題を示したまま途中で終わり、「私も」の意味にはなりません。「こちらこそ」は好意に返す言葉ですが、学習者は帰りのあいさつをしているだけです。',
    ),
  }),
];


/* ══ MỨC 2 (tiếp) — Q19–Q25 · dialogue_multi_blank_choice · 3 ô ═════════
 *
 * Bảy câu này TRƯỚC ĐÂY là `typed_blank`. Owner bỏ dạng tự gõ 2026-07-25: câu
 * tự gõ không nêu đủ tình huống thì nhiều đáp án khác đáp án chuẩn VẪN ĐÚNG,
 * nên bộ chấm cố định chấm sai người trả lời đúng. Chất liệu (cụm, nguồn đã
 * đối chiếu) giữ nguyên; chỉ dựng lại thành hội thoại 3 ô + 4 phương án, và
 * mỗi `context` nay nêu RÕ tình huống đủ để loại trừ các phương án kia.
 */

const CLOSING_QUESTIONS = [
  question({
    order: 19,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi sáng, hành lang trường tiếng Nhật. Anna chào thầy, rồi giới thiệu Smith — hôm nay là buổi học đầu tiên của Smith, thầy chưa từng gặp.',
      'Morning in the corridor of the Japanese school. Anna greets the teacher, then introduces Smith — today is Smith’s first class and the teacher has never met him.',
      '朝、日本語学校の廊下。アンナさんが先生にあいさつし、スミスさんを紹介します。今日がスミスさんの初日で、先生は初対面です。',
    ),
    dialogue: [
      dialogueTurn('q19t1', 'アンナ', [seg('先生、'), blankSeg('q19b1'), seg('。')]),
      dialogueTurn('q19t2', '先生', [seg('おはようございます。')]),
      dialogueTurn('q19t3', 'スミス', [
        blankSeg('q19b2'), seg('。スミスです。'), blankSeg('q19b3'), seg('。'),
      ]),
    ],
    blanks: [
      choiceBlank('q19b1', 'おはようございます', 'おはようございます'),
      choiceBlank('q19b2', 'はじめまして', 'はじめまして'),
      choiceBlank('q19b3', 'よろしくお願いします', 'よろしくおねがいします'),
    ],
    options: [
      choiceOption('q19a', 'こんばんは / はじめまして / よろしくお願いします', {
        q19b1: 'こんばんは', q19b2: 'はじめまして', q19b3: 'よろしくお願いします',
      }),
      choiceOption('q19b', 'おはようございます / 失礼します / よろしくお願いします', {
        q19b1: 'おはようございます', q19b2: '失礼します', q19b3: 'よろしくお願いします',
      }),
      choiceOption('q19c', 'おはようございます / はじめまして / じゃあ、また', {
        q19b1: 'おはようございます', q19b2: 'はじめまして', q19b3: 'じゃあ、また',
      }),
      choiceOption('q19d', 'おはようございます / はじめまして / よろしくお願いします', {
        q19b1: 'おはようございます', q19b2: 'はじめまして', q19b3: 'よろしくお願いします',
      }),
    ],
    correctOptionId: 'q19d',
    reviews: [
      review(L1, 'vocabulary', 'ohayo-gozaimasu'),
      review(L1, 'vocabulary', 'hajimemashite'),
      review(L1, 'vocabulary', 'yoroshiku-onegaishimasu'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ buổi sáng, mà chính L1 liệt kê "không dùng vào buổi sáng" cho こんばんは. 失礼します là lời xin phép RỜI ĐI, mà Smith vừa mới mở lời chào thầy. L3 ghi rõ không dùng じゃあ、また với thầy cô — đó là cách nói thân mật dành cho bạn bè.',
      'The setting is morning, and L1 itself lists "not in the morning" for こんばんは. 失礼します excuses you to LEAVE, yet Smith has only just opened his greeting to the teacher. L3 states outright that じゃあ、また is not used with teachers — it is the casual form for friends.',
      '場面は朝で、L1でも「こんばんは」について「朝には使わない」と示しています。「失礼します」は立ち去るときの言葉ですが、スミスさんは先生にあいさつを始めたところです。L3では「じゃあ、また」を先生には使わないと明記しています。友達に使うカジュアルな言い方です。',
    ),
  }),

  question({
    order: 20,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Bàn đăng ký lớp học. Nhân viên hỏi tên học viên rồi nhắc lại để xác nhận trước khi ghi vào danh sách.',
      'The class registration desk. A staff member asks a learner’s name, then repeats it back to confirm before writing it on the list.',
      'クラスの受付。係の人が学習者の名前を尋ね、名簿に書く前に復唱して確認します。',
    ),
    dialogue: [
      dialogueTurn('q20t1', '受付', [
        blankSeg('q20b1'), seg('、'), blankSeg('q20b2'), seg('は？'),
      ]),
      dialogueTurn('q20t2', '伊藤', [seg('伊藤です。')]),
      dialogueTurn('q20t3', '受付', [seg('伊藤'), blankSeg('q20b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q20b1', '失礼ですが', 'しつれいですが'),
      choiceBlank('q20b2', 'お名前', 'おなまえ'),
      choiceBlank('q20b3', 'さんですね', 'さんですね'),
    ],
    options: [
      choiceOption('q20a', '失礼ですが / お名前 / さんですね', {
        q20b1: '失礼ですが', q20b2: 'お名前', q20b3: 'さんですね',
      }),
      choiceOption('q20b', '失礼ですが / 私のお名前 / さんですね', {
        q20b1: '失礼ですが', q20b2: '私のお名前', q20b3: 'さんですね',
      }),
      choiceOption('q20c', '失礼ですが / お名前 / さんです', {
        q20b1: '失礼ですが', q20b2: 'お名前', q20b3: 'さんです',
      }),
      choiceOption('q20d', 'もう一度 / お名前 / さんですね', {
        q20b1: 'もう一度', q20b2: 'お名前', q20b3: 'さんですね',
      }),
    ],
    correctOptionId: 'q20a',
    reviews: [
      review(L2, 'vocabulary', 'shitsurei-desu-ga'),
      review(L2, 'vocabulary', 'onamae'),
      review(L2, 'grammar', '～ですね'),
    ],
    explanation: n(
      '私のお名前 là dạng L2 cấm rõ, và ở đây còn thành ra nhân viên hỏi tên của chính mình. 「伊藤さんです」 là câu giới thiệu người thứ ba; nhắc lại để xác nhận với chính người đó thì phải dùng ですね. もう一度 dùng khi nhờ nhắc lại điều đã nghe, mà đây là câu hỏi đầu tiên.',
      '私のお名前 is the form L2 explicitly forbids, and here it would have the staff asking their own name. 「伊藤さんです」 introduces a third person; repeating a name back to confirm with the person themselves takes ですね. もう一度 asks for a repeat of something already heard, but this is the opening question.',
      '「私のお名前」はL2が明確に禁じている形で、ここでは係の人が自分の名前を尋ねることになります。「伊藤さんです」は第三者を紹介する言い方で、本人に復唱して確認するときは「ですね」を使います。「もう一度」は聞いたことをもう一度頼む言葉ですが、ここは最初の質問です。',
    ),
  }),

  question({
    order: 21,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Đầu giờ chiều ở trung tâm tiếng Nhật. Anna gặp Itō — học viên vừa chuyển vào lớp, hai người chưa từng gặp nhau.',
      'Early afternoon at the Japanese centre. Anna meets Itō, a learner who has just transferred into the class; they have never met.',
      '午後の初め、日本語センター。アンナさんが、クラスに移ってきたばかりで初対面の伊藤さんに会います。',
    ),
    dialogue: [
      dialogueTurn('q21t1', 'アンナ', [blankSeg('q21b1'), seg('。アンナです。')]),
      dialogueTurn('q21t2', '伊藤', [
        blankSeg('q21b2'), seg('。伊藤です。よろしくお願いします。'),
      ]),
      dialogueTurn('q21t3', 'アンナ', [
        blankSeg('q21b3'), seg('、よろしくお願いします。'),
      ]),
    ],
    blanks: [
      choiceBlank('q21b1', 'こんにちは', 'こんにちは'),
      choiceBlank('q21b2', 'はじめまして', 'はじめまして'),
      choiceBlank('q21b3', 'こちらこそ', 'こちらこそ'),
    ],
    options: [
      choiceOption('q21a', 'おはようございます / はじめまして / こちらこそ', {
        q21b1: 'おはようございます', q21b2: 'はじめまして', q21b3: 'こちらこそ',
      }),
      choiceOption('q21b', 'こんにちは / はじめまして / こちらこそ', {
        q21b1: 'こんにちは', q21b2: 'はじめまして', q21b3: 'こちらこそ',
      }),
      choiceOption('q21c', 'こんにちは / お元気で / こちらこそ', {
        q21b1: 'こんにちは', q21b2: 'お元気で', q21b3: 'こちらこそ',
      }),
      choiceOption('q21d', 'こんにちは / はじめまして / 失礼します', {
        q21b1: 'こんにちは', q21b2: 'はじめまして', q21b3: '失礼します',
      }),
    ],
    correctOptionId: 'q21b',
    reviews: [
      review(L1, 'vocabulary', 'konnichiwa'),
      review(L1, 'vocabulary', 'hajimemashite'),
      review(L3, 'vocabulary', 'kochira-koso'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ đầu giờ chiều, mà おはようございます là chào buổi sáng. お元気で là lời chia tay khi lâu mới gặp lại, mà Itō đang MỞ LỜI làm quen. 失礼します là lời xin phép rời đi, vừa được làm quen đã xin đi là mâu thuẫn.',
      'The setting is early afternoon, and おはようございます is a morning greeting. お元気で is a goodbye for a long parting, yet Itō is OPENING an introduction. 失礼します excuses you to leave, which contradicts having just been introduced.',
      '場面は午後の初めで、「おはようございます」は朝のあいさつです。「お元気で」はしばらく会わないときの別れの言葉ですが、伊藤さんは自己紹介を切り出しているところです。「失礼します」は立ち去る言葉で、紹介された直後には矛盾します。',
    ),
  }),

  question({
    order: 22,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi học cuối của khoá. Satō về nước tuần sau và chưa hẹn ngày quay lại. Itō chào tạm biệt.',
      'The last class of the course. Satō flies home next week with no date set for returning. Itō says goodbye.',
      'コースの最終日。佐藤さんは来週帰国し、いつ戻るかは決まっていません。伊藤さんが別れのあいさつをします。',
    ),
    dialogue: [
      dialogueTurn('q22t1', '伊藤', [
        seg('佐藤'), blankSeg('q22b1'), seg('、'), blankSeg('q22b2'), seg('。'),
      ]),
      dialogueTurn('q22t2', '佐藤', [blankSeg('q22b3'), seg('。さようなら。')]),
    ],
    blanks: [
      choiceBlank('q22b1', 'さん', 'さん'),
      choiceBlank('q22b2', 'お元気で', 'おげんきで'),
      choiceBlank('q22b3', 'こちらこそ', 'こちらこそ'),
    ],
    options: [
      choiceOption('q22a', 'さん / また来週 / こちらこそ', {
        q22b1: 'さん', q22b2: 'また来週', q22b3: 'こちらこそ',
      }),
      choiceOption('q22b', 'さん / じゃあ、また / こちらこそ', {
        q22b1: 'さん', q22b2: 'じゃあ、また', q22b3: 'こちらこそ',
      }),
      choiceOption('q22c', 'さんですね / お元気で / こちらこそ', {
        q22b1: 'さんですね', q22b2: 'お元気で', q22b3: 'こちらこそ',
      }),
      choiceOption('q22d', 'さん / お元気で / こちらこそ', {
        q22b1: 'さん', q22b2: 'お元気で', q22b3: 'こちらこそ',
      }),
    ],
    correctOptionId: 'q22d',
    reviews: [
      review(L2, 'vocabulary', 'san'),
      review(L3, 'vocabulary', 'ogenki-de'),
      review(L3, 'vocabulary', 'kochira-koso'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ Satō về nước và chưa hẹn ngày quay lại, nên また来週 mâu thuẫn với chính thông tin đã cho. じゃあ、また là lời chia tay ngắn hạn, không hợp mốc từ một tuần trở lên. 「佐藤さんですね」 là câu xác nhận tên người mới biết, còn đây là bạn học cả khoá.',
      'The setting says Satō is flying home with no return date, so また来週 contradicts the given information. じゃあ、また is a short-term goodbye and does not fit a parting of a week or more. 「佐藤さんですね」 confirms the name of someone newly met, but they have studied together all course.',
      '佐藤さんは帰国し、戻る日も決まっていないと場面に書かれているので、「また来週」は与えられた情報と矛盾します。「じゃあ、また」は近いうちに会うときの別れの言葉で、一週間以上先には合いません。「佐藤さんですね」は知り合ったばかりの人の名前を確認する言葉ですが、二人はコースの間ずっと一緒に学んできました。',
    ),
  }),

  question({
    order: 23,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi giao lưu đông và ồn. Tanaka nghe không rõ tên Smith vừa nói, nhờ nhắc lại, rồi tiếp nhận và xác nhận lại.',
      'A crowded, noisy meet-up. Tanaka did not catch the name Smith just said, asks for it again, then takes it in and confirms.',
      '人が多くてうるさい交流会。田中さんはスミスさんが言った名前が聞き取れず、もう一度頼んでから受け止めて確認します。',
    ),
    dialogue: [
      dialogueTurn('q23t1', '田中', [
        blankSeg('q23b1'), seg('、もう一度お願いします。'),
      ]),
      dialogueTurn('q23t2', 'スミス', [seg('スミスです。')]),
      dialogueTurn('q23t3', '田中', [
        blankSeg('q23b2'), seg('。スミス'), blankSeg('q23b3'), seg('。'),
      ]),
    ],
    blanks: [
      choiceBlank('q23b1', 'すみません', 'すみません'),
      choiceBlank('q23b2', 'そうですか', 'そうですか'),
      choiceBlank('q23b3', 'さんですね', 'さんですね'),
    ],
    options: [
      choiceOption('q23a', '失礼ですが / そうですか / さんですね', {
        q23b1: '失礼ですが', q23b2: 'そうですか', q23b3: 'さんですね',
      }),
      choiceOption('q23b', 'すみません / こちらこそ / さんですね', {
        q23b1: 'すみません', q23b2: 'こちらこそ', q23b3: 'さんですね',
      }),
      choiceOption('q23c', 'すみません / そうですか / さんですね', {
        q23b1: 'すみません', q23b2: 'そうですか', q23b3: 'さんですね',
      }),
      choiceOption('q23d', 'すみません / そうですか / ですね', {
        q23b1: 'すみません', q23b2: 'そうですか', q23b3: 'ですね',
      }),
    ],
    correctOptionId: 'q23c',
    reviews: [
      review(L2, 'vocabulary', 'sumimasen'),
      review(L3, 'vocabulary', 'sou-desu-ka'),
      review(L2, 'grammar', '～ですね'),
    ],
    explanation: n(
      '失礼ですが mở đầu một câu HỎI lịch sự, còn đây là lời NHỜ nhắc lại. こちらこそ chỉ dùng để đáp lại thiện chí ai đó vừa bày tỏ, mà Smith chỉ đang nói tên. Thiếu さん sau tên người khác là bất lịch sự.',
      '失礼ですが opens a polite QUESTION, but this is a REQUEST for a repeat. こちらこそ only answers goodwill someone has just expressed, yet Smith is simply stating a name. Dropping さん after another person’s name is impolite.',
      '「失礼ですが」は丁寧に質問を切り出す言葉ですが、ここは繰り返しを頼む言葉です。「こちらこそ」は相手が示した好意に返す言葉ですが、スミスさんは名前を言っているだけです。相手の名前に「さん」を付けないのは失礼です。',
    ),
  }),

  question({
    order: 24,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Buổi giao lưu, ba người ngồi cùng bàn. Tanaka xưng tên trước, Anna đáp lại, rồi Itō nói mình cũng muốn nói điều tương tự.',
      'A meet-up, three people at one table. Tanaka gives his name first, Anna answers, then Itō says the same goes for him.',
      '交流会、同じテーブルの三人。田中さんが先に名乗り、アンナさんが返し、伊藤さんも同じ気持ちだと言います。',
    ),
    dialogue: [
      dialogueTurn('q24t1', '田中', [
        seg('私'), blankSeg('q24b1'), seg('田中です。よろしくお願いします。'),
      ]),
      dialogueTurn('q24t2', 'アンナ', [
        blankSeg('q24b2'), seg('、アンナです。'),
      ]),
      dialogueTurn('q24t3', '伊藤', [
        blankSeg('q24b3'), seg('、よろしくお願いします。'),
      ]),
    ],
    blanks: [
      choiceBlank('q24b1', 'は', 'は'),
      choiceBlank('q24b2', 'こちらこそ', 'こちらこそ'),
      choiceBlank('q24b3', '私も', 'わたしも'),
    ],
    options: [
      choiceOption('q24a', 'も / こちらこそ / 私も', {
        q24b1: 'も', q24b2: 'こちらこそ', q24b3: '私も',
      }),
      choiceOption('q24b', 'は / こちらこそ / 私も', {
        q24b1: 'は', q24b2: 'こちらこそ', q24b3: '私も',
      }),
      choiceOption('q24c', 'は / 失礼します / 私も', {
        q24b1: 'は', q24b2: '失礼します', q24b3: '私も',
      }),
      choiceOption('q24d', 'は / こちらこそ / 私は', {
        q24b1: 'は', q24b2: 'こちらこそ', q24b3: '私は',
      }),
    ],
    correctOptionId: 'q24b',
    reviews: [
      review(L1, 'grammar', '私は[名前]です'),
      review(L3, 'vocabulary', 'kochira-koso'),
      review(L3, 'grammar', '～も'),
    ],
    explanation: n(
      '「私も田中です」 nghĩa là "tôi CŨNG là Tanaka", nhưng Tanaka là người nói đầu tiên, chưa ai tên đó — nêu tên mình phải dùng は. 失礼します là lời xin phép rời đi, nói xong lại xưng tên là ngược trình tự. 「私は」 nêu chủ đề rồi bỏ lửng, không diễn đạt "tôi cũng vậy" — L3 dạy ～も cho nghĩa đó.',
      '「私も田中です」 means "I am Tanaka TOO", but Tanaka speaks first and nobody bears that name yet — giving your own name takes は. 失礼します excuses you to leave; giving your name straight after reverses the order. 「私は」 opens a topic and leaves it hanging; it does not mean "me too" — L3 teaches ～も for that.',
      '「私も田中です」は「私も田中」という意味になりますが、田中さんは最初に話す人で、まだその名前の人はいません。自分の名前を言うときは「は」を使います。「失礼します」は立ち去る言葉で、その直後に名乗るのは順序が逆です。「私は」は主題を示したまま途中で終わり、「私も」の意味にはなりません。L3で「～も」を学びました。',
    ),
  }),

  question({
    order: 25,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Cuối buổi học tối thứ Sáu. Anna phải về trước vì có hẹn; lớp chỉ học tiếp vào tuần sau.',
      'The end of Friday evening class. Anna has to leave before the others because of an appointment; the class next meets next week.',
      '金曜の夜の授業の終わり。アンナさんは約束があって先に帰ります。次の授業は来週です。',
    ),
    dialogue: [
      dialogueTurn('q25t1', 'アンナ', [
        seg('伊藤'), blankSeg('q25b1'), seg('、'), blankSeg('q25b2'), seg('。'),
      ]),
      dialogueTurn('q25t2', '伊藤', [blankSeg('q25b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q25b1', 'さん', 'さん'),
      choiceBlank('q25b2', 'お先に失礼します', 'おさきにしつれいします'),
      choiceBlank('q25b3', 'また来週', 'またらいしゅう'),
    ],
    options: [
      choiceOption('q25a', 'さん / お先に失礼します / また明日', {
        q25b1: 'さん', q25b2: 'お先に失礼します', q25b3: 'また明日',
      }),
      choiceOption('q25b', 'さん / こんばんは / また来週', {
        q25b1: 'さん', q25b2: 'こんばんは', q25b3: 'また来週',
      }),
      choiceOption('q25c', 'さんですね / お先に失礼します / また来週', {
        q25b1: 'さんですね', q25b2: 'お先に失礼します', q25b3: 'また来週',
      }),
      choiceOption('q25d', 'さん / お先に失礼します / また来週', {
        q25b1: 'さん', q25b2: 'お先に失礼します', q25b3: 'また来週',
      }),
    ],
    correctOptionId: 'q25d',
    reviews: [
      review(L2, 'vocabulary', 'san'),
      review(L3, 'vocabulary', 'osaki-ni-shitsurei'),
      review(L3, 'grammar', 'また＋[mốc thời gian]'),
    ],
    explanation: n(
      'Bối cảnh ghi rõ lớp chỉ học tiếp vào tuần sau, nên また明日 mâu thuẫn với chính thông tin đã cho. こんばんは là lời CHÀO KHI GẶP — chính L1 liệt kê "không dùng khi chia tay". 「伊藤さんですね」 là câu xác nhận tên người mới biết, còn đây là bạn cùng lớp đã quen.',
      'The setting says the class next meets next week, so また明日 contradicts the given information. こんばんは is a greeting on ARRIVAL — L1 itself lists "not when parting". 「伊藤さんですね」 confirms the name of someone newly met, but this is a familiar classmate.',
      '次の授業は来週だと場面に書かれているので、「また明日」は与えられた情報と矛盾します。「こんばんは」は会ったときのあいさつで、L1でも「別れるときには使わない」と示しています。「伊藤さんですね」は知り合ったばかりの人の名前を確認する言葉ですが、相手はよく知っているクラスメートです。',
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
  questions: [...SENTENCE_QUESTIONS, ...DIALOGUE_QUESTIONS, ...CLOSING_QUESTIONS],
};
