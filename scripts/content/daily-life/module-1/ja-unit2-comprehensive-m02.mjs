// Bài tổng hợp cuối Unit 2, Module 2 — Tiếng Nhật, Daily Life (ADR-022).
//
// Nguồn: TÁI DÙNG (G14-R3 bậc 1) từ vựng + mẫu ngữ pháp + câu đã duyệt của
// chính hai lesson trong unit (m02-u2-l1 "Xin lỗi & xin phép", m02-u2-l2
// "Nhờ ai đó việc nhỏ") — không mở nguồn ngoài. §G7 vùng A: mọi ô CHẤM ĐIỂM
// chỉ dùng vốn đã dạy trong hai bài này; reviews[] trỏ đúng lessonId + kind +
// ref. Cầu nối chủ đề tự nhiên giữa hai bài: L1 dạy xin lỗi/xin phép CHO
// CHÍNH MÌNH, L2 dạy nhờ NGƯỜI KHÁC giúp — cả hai đều xoay quanh "chọn đúng
// mức lịch sự theo quan hệ"; 3 câu hội thoại (Q11, Q14, Q17) trỏ tới CẢ HAI
// bài trong cùng một lượt trao đổi.
//
// CHỈ dùng THẺ TỪ VỰNG CHÍNH (`vocabulary[].id`) làm mục `review()` — KHÔNG
// dùng `vocabularyReferences[]` (từ lạ có chú nghĩa để ĐỌC HIỂU, không phải
// vốn vùng A để CHẤM ĐIỂM sản sinh — đúng tiền lệ m02-u1-comprehensive).
//
// TRÁNH CÁC BẪY TOOLING đã gặp ở 2 bài m02-u2 (không mở nguồn ngoài nên
// không cần né kuromoji-Latin/katakana-đứng-riêng của Q14 romaji, nhưng
// PASS CHUNG cho generate-curriculum.mjs vẫn quét furigana toàn kho):
//  - KHÔNG dùng 何 (kanji đa âm なん/なに xung đột sổ tra furigana dùng
//    chung toàn kho với m01-u1-l2 — xem INVENTORY.md mục LÀM SAU).
//  - KHÔNG dùng 楽しみ (romaji tự sinh "tanoshimi" khớp nhầm guard tên
//    nháp "Tanos", §G5) — L1 tự thân đã né trong Q14 của chính nó, ở đây
//    cũng không trích lại cụm này.
//  - KHÔNG dùng CD (Latin) hay アラ (katakana đứng riêng) — cả hai đều
//    không nằm trong vốn CHÍNH (`vocabulary[].id`) của hai bài này nên
//    không có lý do xuất hiện ở đây.
//
// 18 câu, hai mức — generator tự ép dải order và số ô (2 lesson →
// SECTION_PLANS[2], xem scripts/lib/unit-comprehensive-test.mjs):
//   Q1–6   sentence_multi_blank_choice · 2 ô · chọn 1/4
//   Q7–18  dialogue_multi_blank_choice · hội thoại 2–3 lượt · 3 ô · chọn 1/4
//
// Miễn cổng CÂN NGUỒN (KHÔNG miễn provenance — scope 'provenance' đã ĐÓNG cho
// m01). Lý do miễn 'source-balance': nội dung 100% dẫn xuất từ_bài
// (from_lesson) hai lesson đã cân nguồn thật (cả hai đều có scan.json thật,
// xây sau mốc 2026-08-01) — không mở nguồn ngoài mới nên không có scan.json
// riêng cho ID này. Xem scripts/content/sources/provenance-exemptions.json.
//
// LOCALIZE: `resolveUnitComprehensiveTest` KHÔNG chạy qua `localizeSupport`
// (khác đường lesson), nên mọi chuỗi hỗ trợ ở đây tự mang `*ByNative` đủ
// vi/en/ja — không hard-code một ngôn ngữ vào chuỗi trần.

import { blank, blankSeg, choiceOption, dialogueTurn, review, seg } from '../../../lib/unit-comprehensive-helpers.mjs';

const L1 = 'ja-daily_life-m02-u2-l1';
const L2 = 'ja-daily_life-m02-u2-l2';

const ID = 'ja-daily_life-m02-u2-comprehensive';
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
const PROMPT_DIALOGUE = n(
  'Chọn phương án điền đúng cả ba ô.',
  'Choose the option that fills all three blanks correctly.',
  '三つの空欄に正しく入る組み合わせを選んでください。',
);

/* ══ MỨC 1 — Q1–Q6 · sentence_multi_blank_choice · 2 ô ═══════════════════ */

const SENTENCE_QUESTIONS = [
  question({
    order: 1,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Bạn vô tình làm ồn ảnh hưởng bạn thân đang học bài. Bạn xin lỗi thân mật, rồi hứa sẽ cẩn thận hơn.',
      "You've accidentally made noise that disturbed a close friend who is studying. You apologize casually, then promise to be more careful.",
      '親しい友だちが勉強しているときに、うっかり音を立てて邪魔してしまいました。気軽に謝り、これから気を付けると約束します。',
    ),
    segments: [blankSeg('q1b1'), seg('。'), blankSeg('q1b2'), seg('。')],
    blanks: [
      choiceBlank('q1b1', 'ごめんなさい', 'ごめんなさい'),
      choiceBlank('q1b2', '気を付けます', 'きをつけます'),
    ],
    options: [
      choiceOption('q1a', 'ごめんなさい / 気を付けます', { q1b1: 'ごめんなさい', q1b2: '気を付けます' }),
      choiceOption('q1b', '申し訳ありません / 気を付けます', { q1b1: '申し訳ありません', q1b2: '気を付けます' }),
      choiceOption('q1c', 'ごめんなさい / 仕方ありません', { q1b1: 'ごめんなさい', q1b2: '仕方ありません' }),
      choiceOption('q1d', 'ごめんなさい / 大丈夫です', { q1b1: 'ごめんなさい', q1b2: '大丈夫です' }),
    ],
    correctOptionId: 'q1a',
    reviews: [review(L1, 'vocabulary', 'gomennasai'), review(L1, 'vocabulary', 'ki-wo-tsukemasu')],
    explanation: n(
      '申し訳ありません (b) là thể lịch sự, lệch với bạn thân đang dùng thể thân mật. 仕方ありません (c) là câu người NGHE nói để thông cảm, không phải lời hứa của người xin lỗi. 大丈夫です (d) dùng để đồng ý cho phép/trấn an, không phải lời hứa cẩn thận hơn.',
      '申し訳ありません (b) is polite, mismatched with a close friend using the casual form. 仕方ありません (c) is said by the LISTENER to show sympathy, not a promise from the apologizer. 大丈夫です (d) grants permission/reassures, it is not a promise to be careful.',
      '「申し訳ありません」(b)は丁寧体で、気軽な言葉を使う親しい友だちには合いません。「仕方ありません」(c)は聞き手が同情を示すために言う言葉で、謝る人の約束ではありません。「大丈夫です」(d)は許可を出す・安心させるときの言葉で、気を付けるという約束ではありません。',
    ),
  }),

  question({
    order: 2,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Đồng nghiệp vừa khoe có một cuốn sách hay. Bạn ngạc nhiên, rồi hỏi mượn một cách lịch sự.',
      'A colleague has just mentioned having a great book. You react with surprise, then politely ask to borrow it.',
      '同僚がいい本を持っていると話してくれました。驚いた様子を見せ、丁寧に貸してほしいと頼みます。',
    ),
    segments: [blankSeg('q2b1'), seg('？この本（ほん）、貸して'), blankSeg('q2b2'), seg('？')],
    blanks: [
      choiceBlank('q2b1', '本当ですか', 'ほんとうですか'),
      choiceBlank('q2b2', 'もらえませんか', 'もらえませんか'),
    ],
    options: [
      choiceOption('q2a', '本当ですか / もらえませんか', { q2b1: '本当ですか', q2b2: 'もらえませんか' }),
      choiceOption('q2b', 'かしこまりました / もらえませんか', { q2b1: 'かしこまりました', q2b2: 'もらえませんか' }),
      choiceOption('q2c', '本当ですか / いただけますか', { q2b1: '本当ですか', q2b2: 'いただけますか' }),
      choiceOption('q2d', '本当ですか / くれませんか', { q2b1: '本当ですか', q2b2: 'くれませんか' }),
    ],
    correctOptionId: 'q2a',
    reviews: [review(L2, 'vocabulary', 'hontou-desu-ka'), review(L2, 'vocabulary', 'temo-moraemasenka')],
    explanation: n(
      'かしこまりました (b) là câu người ĐƯỢC nhờ nói để đồng ý, không phải phản ứng ngạc nhiên. いただけますか (c) lịch sự hơn mức cần với đồng nghiệp. くれませんか (d) là thể thân mật, cũng lệch mức lịch sự cần cho đồng nghiệp.',
      'かしこまりました (b) is said by the person being asked to agree, not a reaction of surprise. いただけますか (c) is more polite than needed with a colleague. くれませんか (d) is casual, also mismatched with the politeness needed for a colleague.',
      '「かしこまりました」(b)は頼まれた人が承諾するときの言葉で、驚きの反応ではありません。「いただけますか」(c)は同僚に必要な丁寧さより丁寧すぎます。「くれませんか」(d)は気軽な言い方で、これも同僚に必要な丁寧さに合いません。',
    ),
  }),

  question({
    order: 3,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Bạn ở cửa hàng quần áo, hỏi nhân viên (người lạ) rất lịch sự xem có được thử đồ không, rồi hỏi thêm liệu có được chụp ảnh không.',
      "You're at a clothing shop, very politely asking the staff (a stranger) if you may try something on, then also asking if you may take a photo.",
      '洋服店で、店員（初対面）にとても丁寧に試着してもよいか尋ね、さらに写真を撮ってもよいか尋ねます。',
    ),
    segments: [seg('試着'), blankSeg('q3b1'), seg('。写真も'), blankSeg('q3b2'), seg('。')],
    blanks: [
      choiceBlank('q3b1', 'してもよろしいですか', 'してもよろしいですか'),
      choiceBlank('q3b2', 'よろしいですか', 'よろしいですか'),
    ],
    options: [
      choiceOption('q3a', 'してもよろしいですか / よろしいですか', { q3b1: 'してもよろしいですか', q3b2: 'よろしいですか' }),
      choiceOption('q3b', 'してもいいですか / よろしいですか', { q3b1: 'してもいいですか', q3b2: 'よろしいですか' }),
      choiceOption('q3c', 'してもよろしいですか / いいですか', { q3b1: 'してもよろしいですか', q3b2: 'いいですか' }),
      choiceOption('q3d', 'してもらえませんか / よろしいですか', { q3b1: 'してもらえませんか', q3b2: 'よろしいですか' }),
    ],
    correctOptionId: 'q3a',
    reviews: [review(L1, 'vocabulary', 'temo-yoroshii-desu-ka')],
    explanation: n(
      'してもいいですか (b) chưa đủ lịch sự cho người lạ ở cửa hàng — lệch mức với ô đầu cần dùng. いいですか (c) cũng chưa đủ lịch sự, không khớp mức đã chọn ở ô đầu. してもらえませんか (d) là NHỜ NGƯỜI KHÁC làm gì đó, không phải XIN PHÉP cho CHÍNH MÌNH làm gì.',
      'してもいいですか (b) is not polite enough for a stranger at a shop — it mismatches the level needed at the first blank. いいですか (c) is likewise not polite enough, inconsistent with the level chosen at the first blank. してもらえませんか (d) is asking SOMEONE ELSE to do something, not asking PERMISSION for yourself.',
      '「してもいいですか」(b)は初対面の店員に必要な丁寧さが足りません——最初の空欄で選んだレベルと合いません。「いいですか」(c)も丁寧さが足りず、最初の空欄で選んだレベルと一致しません。「してもらえませんか」(d)は他の人に何かをしてもらうお願いで、自分がすることの許可を求める言葉ではありません。',
    ),
  }),

  question({
    order: 4,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Bạn bè xin phép mượn đồ. Bạn đồng ý dứt khoát, rồi trấn an thêm rằng không sao cả.',
      'A friend asks permission to borrow something. You agree decisively, then reassure them it is no problem at all.',
      '友だちが物を借りる許可を求めています。はっきりと同意し、さらに全く問題ないと安心させます。',
    ),
    segments: [blankSeg('q4b1'), seg('。'), blankSeg('q4b2'), seg('、心配（しんぱい）しないで。')],
    blanks: [
      choiceBlank('q4b1', 'もちろんです', 'もちろんです'),
      choiceBlank('q4b2', '大丈夫です', 'だいじょうぶです'),
    ],
    options: [
      choiceOption('q4a', 'もちろんです / 大丈夫です', { q4b1: 'もちろんです', q4b2: '大丈夫です' }),
      choiceOption('q4b', '構いません / 大丈夫です', { q4b1: '構いません', q4b2: '大丈夫です' }),
      choiceOption('q4c', 'もちろんです / 仕方ありません', { q4b1: 'もちろんです', q4b2: '仕方ありません' }),
      choiceOption('q4d', 'もちろんです / かしこまりました', { q4b1: 'もちろんです', q4b2: 'かしこまりました' }),
    ],
    correctOptionId: 'q4a',
    reviews: [review(L1, 'vocabulary', 'mochiron-desu'), review(L1, 'vocabulary', 'daijoubu-desu')],
    explanation: n(
      '構いません (b) không sai nghĩa nhưng thiếu sự DỨT KHOÁT mà もちろんです có — đề bài cần nhấn mạnh. 仕方ありません (c) dùng để thông cảm một chuyện không hay, không phải trấn an một lời xin phép bình thường. かしこまりました (d) là cách nhân viên/dịch vụ đồng ý rất lịch sự, không hợp giữa bạn bè.',
      '構いません (b) is not wrong in meaning but lacks the DECISIVENESS that もちろんです has — the situation calls for emphasis. 仕方ありません (c) is for sympathizing about something unfortunate, not reassuring an ordinary request. かしこまりました (d) is how service staff agree very formally, not fitting between friends.',
      '「構いません」(b)は意味は間違っていませんが、「もちろんです」にある「はっきりとした」感じがありません——この場面は強調が必要です。「仕方ありません」(c)は良くないことに同情するときに使うもので、普通のお願いを安心させる言葉ではありません。「かしこまりました」(d)は店員・接客業がとても丁寧に承諾する言い方で、友だち同士には合いません。',
    ),
  }),

  question({
    order: 5,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Bạn cùng lớp, mức lịch sự trung tính (không quá thân, không cần trang trọng), nhờ bạn giúp một việc nhỏ. Bạn phản ứng ngạc nhiên nhẹ, rồi đồng ý giúp.',
      'A classmate at a neutral politeness level (not too close, no need to be very formal) asks you for a small favor. You react with mild surprise, then agree to help.',
      'あまり親しくなく、丁寧さも中立的なクラスメートが、ちょっとしたお願いをしてきました。少し驚いた様子を見せてから、手伝うことに同意します。',
    ),
    segments: [blankSeg('q5b1'), seg('？'), blankSeg('q5b2'), seg('。')],
    blanks: [
      choiceBlank('q5b1', '本当ですか', 'ほんとうですか'),
      choiceBlank('q5b2', 'よいですよ', 'よいですよ'),
    ],
    options: [
      choiceOption('q5a', '本当ですか / よいですよ', { q5b1: '本当ですか', q5b2: 'よいですよ' }),
      choiceOption('q5b', 'かしこまりました / よいですよ', { q5b1: 'かしこまりました', q5b2: 'よいですよ' }),
      choiceOption('q5c', '本当ですか / かしこまりました', { q5b1: '本当ですか', q5b2: 'かしこまりました' }),
      choiceOption('q5d', '本当ですか / 了解しました', { q5b1: '本当ですか', q5b2: '了解しました' }),
    ],
    correctOptionId: 'q5a',
    reviews: [review(L2, 'vocabulary', 'hontou-desu-ka'), review(L2, 'vocabulary', 'yoi-desu-yo')],
    explanation: n(
      'かしこまりました (b) là câu ĐỒNG Ý giúp, không phải phản ứng ngạc nhiên trước lý do — đặt sai vị trí ô đầu. かしこまりました (c) rất lịch sự kiểu dịch vụ, lệch với mức trung tính giữa hai bạn cùng lớp. 了解しました (d) thân mật/thông thường hơn mức trung tính đã thiết lập.',
      'かしこまりました (b) is a reply that AGREES to help, not a reaction of surprise at the reason — wrong fit for the first blank. かしこまりました (c) is very polite, service-style, mismatched with the neutral level between two classmates. 了解しました (d) is more casual/ordinary than the neutral level established here.',
      '「かしこまりました」(b)は手伝うことに同意する返事で、理由への驚きの反応ではありません——最初の空欄には合いません。「かしこまりました」(c)は接客業のようなとても丁寧な言い方で、クラスメート同士の中立的なレベルには合いません。「了解しました」(d)はここで設定された中立的なレベルより気軽・普通です。',
    ),
  }),

  question({
    order: 6,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Trời đang mưa to, bạn hỏi mượn ô của một người lạ, rất lịch sự, rồi kết thúc lời nhờ bằng một câu ngắn gọn.',
      "It's raining hard, and you very politely ask a stranger to lend you an umbrella, then close the request with a short phrase.",
      '雨が強く降っていて、初対面の人にとても丁寧に傘を貸してほしいと頼み、短い言葉でお願いを締めくくります。',
    ),
    segments: [seg('傘（かさ）を貸して'), blankSeg('q6b1'), seg('。'), blankSeg('q6b2'), seg('。')],
    blanks: [
      choiceBlank('q6b1', 'いただけますか', 'いただけますか'),
      choiceBlank('q6b2', 'お願いします', 'おねがいします'),
    ],
    options: [
      choiceOption('q6a', 'いただけますか / お願いします', { q6b1: 'いただけますか', q6b2: 'お願いします' }),
      choiceOption('q6b', 'くれませんか / お願いします', { q6b1: 'くれませんか', q6b2: 'お願いします' }),
      choiceOption('q6c', 'いただけますか / 本当ですか', { q6b1: 'いただけますか', q6b2: '本当ですか' }),
      choiceOption('q6d', 'いただけますか / かしこまりました', { q6b1: 'いただけますか', q6b2: 'かしこまりました' }),
    ],
    correctOptionId: 'q6a',
    reviews: [review(L2, 'vocabulary', 'teitadakemasu-ka'), review(L2, 'vocabulary', 'onegai-shimasu')],
    explanation: n(
      'くれませんか (b) là thể thân mật, lệch với người lạ cần mức rất lịch sự. 本当ですか (c) là phản ứng ngạc nhiên, không hợp làm câu kết thúc lời nhờ. かしこまりました (d) là câu người ĐƯỢC nhờ nói để đồng ý, không phải câu người ĐI nhờ dùng để kết lời.',
      'くれませんか (b) is casual, mismatched with a stranger who needs a very polite level. 本当ですか (c) is a reaction of surprise, not fitting as a closing to a request. かしこまりました (d) is said by the person being asked to agree, not by the requester closing their request.',
      '「くれませんか」(b)は気軽な言い方で、とても丁寧さが必要な初対面の人には合いません。「本当ですか」(c)は驚きの反応で、お願いを締めくくる言葉としては合いません。「かしこまりました」(d)は頼まれた人が承諾するときの言葉で、お願いする人が締めくくりに使う言葉ではありません。',
    ),
  }),
];

/* ══ MỨC 2 — Q7–Q18 · dialogue_multi_blank_choice · 3 ô ═══════════════════ */

const DIALOGUE_QUESTIONS = [
  // Q7 — L1 only: xin lỗi lịch sự (đến muộn) → thông cảm → hứa cẩn thận.
  question({
    order: 7,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai đồng nghiệp chưa thân, giữ thể lịch sự. 伊藤 vừa đến muộn cuộc họp.',
      'Roles: two not-yet-close colleagues, keeping polite form. Itō has just arrived late to a meeting.',
      '関係：まだ親しくない同僚同士で、丁寧体を保ちます。伊藤さんは会議に遅れて来たところです。',
    ),
    dialogue: [
      dialogueTurn('q7t1', 'ito', [blankSeg('q7b1'), seg('、電車（でんしゃ）が遅（おく）れました。')]),
      dialogueTurn('q7t2', 'sato', [blankSeg('q7b2'), seg('。今から始（はじ）めましょう。')]),
      dialogueTurn('q7t3', 'ito', [seg('はい、'), blankSeg('q7b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q7b1', '申し訳ありません', 'もうしわけありません'),
      choiceBlank('q7b2', '仕方ありませんね', 'しかたありませんね'),
      choiceBlank('q7b3', '気を付けます', 'きをつけます'),
    ],
    options: [
      choiceOption('q7a', '申し訳ありません / 仕方ありませんね / 気を付けます', {
        q7b1: '申し訳ありません', q7b2: '仕方ありませんね', q7b3: '気を付けます',
      }),
      choiceOption('q7b', 'ごめんなさい / 仕方ありませんね / 気を付けます', {
        q7b1: 'ごめんなさい', q7b2: '仕方ありませんね', q7b3: '気を付けます',
      }),
      choiceOption('q7c', '申し訳ありません / 大丈夫です / 気を付けます', {
        q7b1: '申し訳ありません', q7b2: '大丈夫です', q7b3: '気を付けます',
      }),
      choiceOption('q7d', '申し訳ありません / 仕方ありませんね / もちろんです', {
        q7b1: '申し訳ありません', q7b2: '仕方ありませんね', q7b3: 'もちろんです',
      }),
    ],
    correctOptionId: 'q7a',
    reviews: [
      review(L1, 'vocabulary', 'moushiwake-arimasen'),
      review(L1, 'vocabulary', 'shikata-arimasen'),
      review(L1, 'vocabulary', 'ki-wo-tsukemasu'),
    ],
    explanation: n(
      'ごめんなさい (b) là thể thân mật, lệch với hai đồng nghiệp chưa thân đang giữ lịch sự. 大丈夫です (c) dùng để đồng ý cho phép/trấn an, không phải câu thông cảm cho một lời xin lỗi. もちろんです (d) là câu đồng ý dứt khoát, không phải lời hứa cẩn thận hơn.',
      'ごめんなさい (b) is casual, mismatched with two not-yet-close colleagues keeping polite form. 大丈夫です (c) grants permission/reassures, it is not a sympathetic reply to an apology. もちろんです (d) is a decisive agreement, not a promise to be more careful.',
      '「ごめんなさい」(b)は気軽な言い方で、丁寧体を保つまだ親しくない同僚には合いません。「大丈夫です」(c)は許可を出す・安心させる言葉で、謝罪への同情の返事ではありません。「もちろんです」(d)ははっきりとした同意の言葉で、気を付けるという約束ではありません。',
    ),
  }),

  // Q8 — L2 only: nhờ gói quà rất lịch sự → nhờ vả ngắn gọn → nhân viên đồng ý rất lịch sự.
  question({
    order: 8,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: khách hàng và nhân viên cửa hàng, chưa quen biết — cả hai giữ thể rất lịch sự. Khách nhờ nhân viên gói quà.',
      'Roles: a customer and a shop employee, strangers — both keep the very polite register. The customer asks the employee to wrap a gift.',
      '関係：客と店員で、初対面です。二人ともとても丁寧な言葉遣いを保ちます。客は店員に贈り物を包んでもらうようお願いします。',
    ),
    dialogue: [
      dialogueTurn('q8t1', 'sato', [seg('これを包（つつ）んで'), blankSeg('q8b1'), seg('。'), blankSeg('q8b2'), seg('。')]),
      dialogueTurn('q8t2', 'tanaka', [blankSeg('q8b3'), seg('。少々（しょうしょう）お待（ま）ちください。')]),
    ],
    blanks: [
      choiceBlank('q8b1', 'いただけますか', 'いただけますか'),
      choiceBlank('q8b2', 'お願いします', 'おねがいします'),
      choiceBlank('q8b3', 'かしこまりました', 'かしこまりました'),
    ],
    options: [
      choiceOption('q8a', 'いただけますか / お願いします / かしこまりました', {
        q8b1: 'いただけますか', q8b2: 'お願いします', q8b3: 'かしこまりました',
      }),
      choiceOption('q8b', 'くれますか / お願いします / かしこまりました', {
        q8b1: 'くれますか', q8b2: 'お願いします', q8b3: 'かしこまりました',
      }),
      choiceOption('q8c', 'いただけますか / 本当ですか / かしこまりました', {
        q8b1: 'いただけますか', q8b2: '本当ですか', q8b3: 'かしこまりました',
      }),
      choiceOption('q8d', 'いただけますか / お願いします / 了解しました', {
        q8b1: 'いただけますか', q8b2: 'お願いします', q8b3: '了解しました',
      }),
    ],
    correctOptionId: 'q8a',
    reviews: [
      review(L2, 'vocabulary', 'teitadakemasu-ka'),
      review(L2, 'vocabulary', 'onegai-shimasu'),
      review(L2, 'vocabulary', 'kashikomarimashita'),
    ],
    explanation: n(
      'くれますか (b) là thể thân mật, lệch với khách hàng đang giữ thể rất lịch sự với người lạ. 本当ですか (c) là phản ứng ngạc nhiên, không hợp làm câu kết thúc lời nhờ. 了解しました (d) là cách đồng ý thân mật/thông thường, không đúng mức rất lịch sự mà nhân viên cần giữ.',
      'くれますか (b) is casual, mismatched with a customer keeping a very polite register with a stranger. 本当ですか (c) is a reaction of surprise, not fitting as a closing to a request. 了解しました (d) is a casual/ordinary way to agree, not the very polite level the employee needs to keep.',
      '「くれますか」(b)は気軽な言い方で、初対面の相手にとても丁寧な言葉遣いを保つ客には合いません。「本当ですか」(c)は驚きの反応で、お願いを締めくくる言葉としては合いません。「了解しました」(d)は気軽・普通の同意の言い方で、店員が保つべきとても丁寧なレベルとは合いません。',
    ),
  }),

  // Q9 — L1 only: xin phép ăn bánh thân mật → bạn đồng ý dứt khoát + trấn an thêm.
  question({
    order: 9,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai bạn thân, thân mật. 伊藤 muốn ăn một miếng bánh của 田中.',
      "Roles: two close friends, casual. Itō wants to eat a piece of Tanaka's cake.",
      '関係：親しい友だち同士で、気軽な間柄です。伊藤さんは田中さんのケーキを一切れ食べたいと思っています。',
    ),
    dialogue: [
      dialogueTurn('q9t1', 'ito', [seg('このケーキ、食（た）べても'), blankSeg('q9b1'), seg('？')]),
      dialogueTurn('q9t2', 'tanaka', [blankSeg('q9b2'), seg('。'), blankSeg('q9b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q9b1', 'いいですか', 'いいですか'),
      choiceBlank('q9b2', 'もちろんです', 'もちろんです'),
      choiceBlank('q9b3', '構いません', 'かまいません'),
    ],
    options: [
      choiceOption('q9a', 'いいですか / もちろんです / 構いません', { q9b1: 'いいですか', q9b2: 'もちろんです', q9b3: '構いません' }),
      choiceOption('q9b', 'よろしいですか / もちろんです / 構いません', { q9b1: 'よろしいですか', q9b2: 'もちろんです', q9b3: '構いません' }),
      choiceOption('q9c', 'いいですか / もちろんです / 仕方ありません', { q9b1: 'いいですか', q9b2: 'もちろんです', q9b3: '仕方ありません' }),
      choiceOption('q9d', 'いいですか / かしこまりました / 構いません', { q9b1: 'いいですか', q9b2: 'かしこまりました', q9b3: '構いません' }),
    ],
    correctOptionId: 'q9a',
    reviews: [
      review(L1, 'vocabulary', 'temo-ii-desu-ka'),
      review(L1, 'vocabulary', 'mochiron-desu'),
      review(L1, 'vocabulary', 'kamaimasen'),
    ],
    explanation: n(
      'よろしいですか (b) lịch sự hơn mức cần giữa hai bạn thân — mức trung tính (いいですか) đã đủ. 仕方ありません (c) dùng để thông cảm một chuyện không hay, không phải lời trấn an cho một lời xin phép bình thường. かしこまりました (d) là cách nhân viên/dịch vụ đồng ý rất lịch sự, không hợp giữa bạn bè.',
      'よろしいですか (b) is more polite than needed between close friends — the neutral level (いいですか) is already enough. 仕方ありません (c) is for sympathizing about something unfortunate, not reassurance for an ordinary request. かしこまりました (d) is how service staff agree very formally, not fitting between friends.',
      '「よろしいですか」(b)は親しい友だち同士に必要な丁寧さより丁寧すぎます——中立的な「いいですか」で十分です。「仕方ありません」(c)は良くないことに同情するときに使うもので、普通のお願いを安心させる言葉ではありません。「かしこまりました」(d)は店員・接客業がとても丁寧に承諾する言い方で、友だち同士には合いません。',
    ),
  }),

  // Q10 — L2 only: nhờ mang đồ lịch sự → nhờ vả ngắn gọn → đồng nghiệp đồng ý trung tính.
  question({
    order: 10,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai đồng nghiệp ngang hàng, lịch sự nhưng không quá thân. 田中 nhờ 伊藤 giúp mang đồ.',
      'Roles: two colleagues of equal standing, polite but not too close. Tanaka asks Itō to help carry something.',
      '関係：対等な同僚同士で、丁寧ですがあまり親しくありません。田中さんは伊藤さんに荷物を運んでもらうよう頼みます。',
    ),
    dialogue: [
      dialogueTurn('q10t1', 'tanaka', [seg('荷物を運んで'), blankSeg('q10b1'), seg('。'), blankSeg('q10b2'), seg('。')]),
      dialogueTurn('q10t2', 'ito', [blankSeg('q10b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q10b1', 'もらえませんか', 'もらえませんか'),
      choiceBlank('q10b2', 'お願いします', 'おねがいします'),
      choiceBlank('q10b3', 'よいですよ', 'よいですよ'),
    ],
    options: [
      choiceOption('q10a', 'もらえませんか / お願いします / よいですよ', {
        q10b1: 'もらえませんか', q10b2: 'お願いします', q10b3: 'よいですよ',
      }),
      choiceOption('q10b', 'いただけますか / お願いします / よいですよ', {
        q10b1: 'いただけますか', q10b2: 'お願いします', q10b3: 'よいですよ',
      }),
      choiceOption('q10c', 'もらえませんか / 本当ですか / よいですよ', {
        q10b1: 'もらえませんか', q10b2: '本当ですか', q10b3: 'よいですよ',
      }),
      choiceOption('q10d', 'もらえませんか / お願いします / かしこまりました', {
        q10b1: 'もらえませんか', q10b2: 'お願いします', q10b3: 'かしこまりました',
      }),
    ],
    correctOptionId: 'q10a',
    reviews: [
      review(L2, 'vocabulary', 'temo-moraemasenka'),
      review(L2, 'vocabulary', 'onegai-shimasu'),
      review(L2, 'vocabulary', 'yoi-desu-yo'),
    ],
    explanation: n(
      'いただけますか (b) lịch sự hơn mức cần giữa hai đồng nghiệp ngang hàng. 本当ですか (c) là phản ứng ngạc nhiên, không hợp làm câu kết thúc lời nhờ. かしこまりました (d) là cách đồng ý rất lịch sự kiểu dịch vụ, lệch với quan hệ đồng nghiệp ngang hàng đã thiết lập.',
      'いただけますか (b) is more polite than needed between two equal-standing colleagues. 本当ですか (c) is a reaction of surprise, not fitting as a closing to a request. かしこまりました (d) is a very polite service-style agreement, mismatched with the equal-colleague relationship already established.',
      '「いただけますか」(b)は対等な同僚同士に必要な丁寧さより丁寧すぎます。「本当ですか」(c)は驚きの反応で、お願いを締めくくる言葉としては合いません。「かしこまりました」(d)は接客業のようなとても丁寧な同意の仕方で、すでに設定された対等な同僚の関係には合いません。',
    ),
  }),

  // Q11 — L1+L2 bridge: xin lỗi thân mật → trấn an → nhờ vả thân mật.
  question({
    order: 11,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai bạn thân, thân mật. 佐藤 đến muộn, rồi nhờ 伊藤 giúp một việc nhỏ.',
      'Roles: two close friends, casual. Satō has arrived late, then asks Itō for a small favor.',
      '関係：親しい友だち同士で、気軽な間柄です。佐藤さんは遅れて来て、伊藤さんにちょっとしたお願いをします。',
    ),
    dialogue: [
      dialogueTurn('q11t1', 'sato', [blankSeg('q11b1'), seg('、遅（おそ）くなった。')]),
      dialogueTurn('q11t2', 'ito', [blankSeg('q11b2'), seg('。')]),
      dialogueTurn('q11t3', 'sato', [seg('ちょっと手伝って'), blankSeg('q11b3'), seg('？')]),
    ],
    blanks: [
      choiceBlank('q11b1', 'ごめんなさい', 'ごめんなさい'),
      choiceBlank('q11b2', '大丈夫です', 'だいじょうぶです'),
      choiceBlank('q11b3', 'くれませんか', 'くれませんか'),
    ],
    options: [
      choiceOption('q11a', 'ごめんなさい / 大丈夫です / くれませんか', { q11b1: 'ごめんなさい', q11b2: '大丈夫です', q11b3: 'くれませんか' }),
      choiceOption('q11b', '申し訳ありません / 大丈夫です / くれませんか', { q11b1: '申し訳ありません', q11b2: '大丈夫です', q11b3: 'くれませんか' }),
      choiceOption('q11c', 'ごめんなさい / 仕方ありません / くれませんか', { q11b1: 'ごめんなさい', q11b2: '仕方ありません', q11b3: 'くれませんか' }),
      choiceOption('q11d', 'ごめんなさい / 大丈夫です / いただけますか', { q11b1: 'ごめんなさい', q11b2: '大丈夫です', q11b3: 'いただけますか' }),
    ],
    correctOptionId: 'q11a',
    reviews: [
      review(L1, 'vocabulary', 'gomennasai'),
      review(L1, 'vocabulary', 'daijoubu-desu'),
      review(L2, 'vocabulary', 'tekuremasenka'),
    ],
    explanation: n(
      '申し訳ありません (b) là thể lịch sự, lệch với hai bạn thân đang dùng thể thân mật. 仕方ありません (c) dùng để thông cảm một chuyện không hay, không phải lời trấn an nhẹ nhàng "không sao đâu" giữa bạn bè. いただけますか (d) rất lịch sự, lệch hẳn với mức thân mật "くれませんか？" đã dùng trong cùng lượt.',
      "申し訳ありません (b) is polite, mismatched with two close friends using casual form. 仕方ありません (c) is for sympathizing about something unfortunate, not a light \"it's fine\" reassurance between friends. いただけますか (d) is very polite, clashing with the casual \"くれませんか？\" level already used in the same exchange.",
      '「申し訳ありません」(b)は丁寧体で、気軽な言葉を使う親しい友だち同士には合いません。「仕方ありません」(c)は良くないことに同情するときに使うもので、友だち同士の軽い「大丈夫だよ」という言葉ではありません。「いただけますか」(d)はとても丁寧で、同じやり取りの中ですでに使われている気軽な「くれませんか？」のレベルと合いません。',
    ),
  }),

  // Q12 — L1 only: xin phép đổi trả rất lịch sự → nhân viên đồng ý gấp đôi.
  question({
    order: 12,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: khách hàng và nhân viên cửa hàng, chưa quen biết — cả hai giữ thể rất lịch sự. Khách xin phép đổi một món đồ.',
      'Roles: a customer and a shop employee, strangers — both keep the very polite register. The customer asks permission to exchange an item.',
      '関係：客と店員で、初対面です。二人ともとても丁寧な言葉遣いを保ちます。客は品物の交換の許可を求めます。',
    ),
    dialogue: [
      dialogueTurn('q12t1', 'sato', [seg('これ、交換（こうかん）して'), blankSeg('q12b1'), seg('。')]),
      dialogueTurn('q12t2', 'tanaka', [blankSeg('q12b2'), seg('。'), blankSeg('q12b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q12b1', 'もよろしいですか', 'もよろしいですか'),
      choiceBlank('q12b2', '大丈夫です', 'だいじょうぶです'),
      choiceBlank('q12b3', '構いません', 'かまいません'),
    ],
    options: [
      choiceOption('q12a', 'もよろしいですか / 大丈夫です / 構いません', {
        q12b1: 'もよろしいですか', q12b2: '大丈夫です', q12b3: '構いません',
      }),
      choiceOption('q12b', 'もいいですか / 大丈夫です / 構いません', {
        q12b1: 'もいいですか', q12b2: '大丈夫です', q12b3: '構いません',
      }),
      choiceOption('q12c', 'もよろしいですか / 仕方ありません / 構いません', {
        q12b1: 'もよろしいですか', q12b2: '仕方ありません', q12b3: '構いません',
      }),
      choiceOption('q12d', 'もよろしいですか / 大丈夫です / かしこまりました', {
        q12b1: 'もよろしいですか', q12b2: '大丈夫です', q12b3: 'かしこまりました',
      }),
    ],
    correctOptionId: 'q12a',
    reviews: [
      review(L1, 'vocabulary', 'temo-yoroshii-desu-ka'),
      review(L1, 'vocabulary', 'daijoubu-desu'),
      review(L1, 'vocabulary', 'kamaimasen'),
    ],
    explanation: n(
      'もいいですか (b) chưa đủ lịch sự cho quan hệ khách hàng/nhân viên mới gặp. 仕方ありません (c) dùng để thông cảm một chuyện không hay, không phải câu đồng ý cho một lời xin phép bình thường. かしこまりました (d) hợp nhưng ở đây cần từ khác đã dạy trong CHÍNH câu này để tránh lặp — 構いません mới đúng cụm còn lại của bài.',
      'もいいですか (b) is not polite enough for a new customer/employee relationship. 仕方ありません (c) is for sympathizing about something unfortunate, not agreeing to an ordinary request. かしこまりました (d) would fit in general, but this slot needs the OTHER taught word from this same question to avoid repetition — 構いません is the correct remaining item.',
      '「もいいですか」(b)は初対面の客と店員の関係には丁寧さが足りません。「仕方ありません」(c)は良くないことに同情するときに使うもので、普通のお願いに同意する言葉ではありません。「かしこまりました」(d)は一般には合いますが、この空欄にはこの問題で学んだもう一つの語が必要です——正しくは「構いません」です。',
    ),
  }),

  // Q13 — L2 only: ngạc nhiên nghe bạn rảnh → nhờ mượn lịch sự → đồng ý trung tính.
  question({
    order: 13,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai đồng nghiệp, mức lịch sự bình thường — không quá xa lạ, không quá thân. 田中 vừa nói rảnh hôm nay.',
      'Roles: two colleagues, ordinary politeness — not too distant, not too close. Tanaka has just said they are free today.',
      '関係：普通の丁寧さの同僚同士で、遠すぎず親しすぎません。田中さんは今日暇だと言ったところです。',
    ),
    dialogue: [
      dialogueTurn('q13t1', 'ito', [blankSeg('q13b1'), seg('？暇なんですか？')]),
      dialogueTurn('q13t2', 'ito', [seg('では、これ、貸して'), blankSeg('q13b2'), seg('？')]),
      dialogueTurn('q13t3', 'tanaka', [blankSeg('q13b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q13b1', '本当ですか', 'ほんとうですか'),
      choiceBlank('q13b2', 'もらえませんか', 'もらえませんか'),
      choiceBlank('q13b3', 'よいですよ', 'よいですよ'),
    ],
    options: [
      choiceOption('q13a', '本当ですか / もらえませんか / よいですよ', {
        q13b1: '本当ですか', q13b2: 'もらえませんか', q13b3: 'よいですよ',
      }),
      choiceOption('q13b', 'かしこまりました / もらえませんか / よいですよ', {
        q13b1: 'かしこまりました', q13b2: 'もらえませんか', q13b3: 'よいですよ',
      }),
      choiceOption('q13c', '本当ですか / いただけますか / よいですよ', {
        q13b1: '本当ですか', q13b2: 'いただけますか', q13b3: 'よいですよ',
      }),
      choiceOption('q13d', '本当ですか / もらえませんか / かしこまりました', {
        q13b1: '本当ですか', q13b2: 'もらえませんか', q13b3: 'かしこまりました',
      }),
    ],
    correctOptionId: 'q13a',
    reviews: [
      review(L2, 'vocabulary', 'hontou-desu-ka'),
      review(L2, 'vocabulary', 'temo-moraemasenka'),
      review(L2, 'vocabulary', 'yoi-desu-yo'),
    ],
    explanation: n(
      'かしこまりました (b) là câu người ĐƯỢC nhờ nói để đồng ý, không phải phản ứng ngạc nhiên. いただけますか (c) lịch sự hơn mức cần giữa hai đồng nghiệp bình thường. かしこまりました (d) lại là cách đồng ý rất lịch sự kiểu dịch vụ, lệch với mức bình thường đã thiết lập.',
      'かしこまりました (b) is said by the person being asked to agree, not a reaction of surprise. いただけますか (c) is more polite than needed between two ordinary colleagues. かしこまりました (d) is again a very polite service-style agreement, mismatched with the ordinary level established here.',
      '「かしこまりました」(b)は頼まれた人が承諾するときの言葉で、驚きの反応ではありません。「いただけますか」(c)は普通の同僚同士に必要な丁寧さより丁寧すぎます。「かしこまりました」(d)もまた接客業のようなとても丁寧な同意の仕方で、ここで設定された普通のレベルとは合いません。',
    ),
  }),

  // Q14 — L1+L2 bridge: xin lỗi làm phiền rất lịch sự → xin phép rất lịch sự → nhân viên đồng ý rất lịch sự.
  question({
    order: 14,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: khách hàng và nhân viên cửa hàng, chưa quen biết — cả hai giữ thể rất lịch sự. Khách xin lỗi vì làm phiền, rồi xin phép thử đồ.',
      'Roles: a customer and a shop employee, strangers — both keep the very polite register. The customer apologizes for the trouble, then asks permission to try something on.',
      '関係：客と店員で、初対面です。二人ともとても丁寧な言葉遣いを保ちます。客は迷惑をかけることを謝り、試着の許可を求めます。',
    ),
    dialogue: [
      dialogueTurn('q14t1', 'sato', [blankSeg('q14b1'), seg('が、試着して'), blankSeg('q14b2'), seg('。')]),
      dialogueTurn('q14t2', 'tanaka', [blankSeg('q14b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q14b1', '申し訳ございません', 'もうしわけございません'),
      choiceBlank('q14b2', 'もよろしいですか', 'もよろしいですか'),
      choiceBlank('q14b3', 'かしこまりました', 'かしこまりました'),
    ],
    options: [
      choiceOption('q14a', '申し訳ございません / もよろしいですか / かしこまりました', {
        q14b1: '申し訳ございません', q14b2: 'もよろしいですか', q14b3: 'かしこまりました',
      }),
      choiceOption('q14b', 'ごめんなさい / もよろしいですか / かしこまりました', {
        q14b1: 'ごめんなさい', q14b2: 'もよろしいですか', q14b3: 'かしこまりました',
      }),
      choiceOption('q14c', '申し訳ございません / もいいですか / かしこまりました', {
        q14b1: '申し訳ございません', q14b2: 'もいいですか', q14b3: 'かしこまりました',
      }),
      choiceOption('q14d', '申し訳ございません / もよろしいですか / 了解しました', {
        q14b1: '申し訳ございません', q14b2: 'もよろしいですか', q14b3: '了解しました',
      }),
    ],
    correctOptionId: 'q14a',
    reviews: [
      review(L1, 'vocabulary', 'moushiwake-gozaimasen'),
      review(L1, 'vocabulary', 'temo-yoroshii-desu-ka'),
      review(L2, 'vocabulary', 'kashikomarimashita'),
    ],
    explanation: n(
      'ごめんなさい (b) là thể thân mật, lệch hẳn với quan hệ khách hàng/nhân viên mới gặp cần rất lịch sự. もいいですか (c) chưa đủ lịch sự so với mức đã thiết lập ở ô đầu. 了解しました (d) là cách đồng ý thân mật/thông thường, không đúng mức rất lịch sự mà nhân viên cần giữ.',
      'ごめんなさい (b) is casual, clashing badly with a brand-new customer/employee relationship that needs to be very polite. もいいですか (c) is not polite enough compared to the level established at the first blank. 了解しました (d) is a casual/ordinary way to agree, not the very polite level the employee needs to keep.',
      '「ごめんなさい」(b)は気軽な言い方で、とても丁寧さが必要な初対面の客と店員の関係には全く合いません。「もいいですか」(c)は最初の空欄で設定されたレベルに比べて丁寧さが足りません。「了解しました」(d)は気軽・普通の同意の言い方で、店員が保つべきとても丁寧なレベルとは合いません。',
    ),
  }),

  // Q15 — L1 only: xin phép mượn thân mật → bạn đồng ý dứt khoát → người mượn hứa cẩn thận.
  question({
    order: 15,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai bạn thân, thân mật. 伊藤 muốn mượn một món đồ của 田中.',
      'Roles: two close friends, casual. Itō wants to borrow something from Tanaka.',
      '関係：親しい友だち同士で、気軽な間柄です。伊藤さんは田中さんの物を借りたいと思っています。',
    ),
    dialogue: [
      dialogueTurn('q15t1', 'ito', [seg('これ、借りても'), blankSeg('q15b1'), seg('？')]),
      dialogueTurn('q15t2', 'tanaka', [blankSeg('q15b2'), seg('。')]),
      dialogueTurn('q15t3', 'ito', [blankSeg('q15b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q15b1', 'いいですか', 'いいですか'),
      choiceBlank('q15b2', 'もちろんです', 'もちろんです'),
      choiceBlank('q15b3', '気を付けます', 'きをつけます'),
    ],
    options: [
      choiceOption('q15a', 'いいですか / もちろんです / 気を付けます', { q15b1: 'いいですか', q15b2: 'もちろんです', q15b3: '気を付けます' }),
      choiceOption('q15b', 'よろしいですか / もちろんです / 気を付けます', { q15b1: 'よろしいですか', q15b2: 'もちろんです', q15b3: '気を付けます' }),
      choiceOption('q15c', 'いいですか / 構いません / 気を付けます', { q15b1: 'いいですか', q15b2: '構いません', q15b3: '気を付けます' }),
      choiceOption('q15d', 'いいですか / もちろんです / 仕方ありません', { q15b1: 'いいですか', q15b2: 'もちろんです', q15b3: '仕方ありません' }),
    ],
    correctOptionId: 'q15a',
    reviews: [
      review(L1, 'vocabulary', 'temo-ii-desu-ka'),
      review(L1, 'vocabulary', 'mochiron-desu'),
      review(L1, 'vocabulary', 'ki-wo-tsukemasu'),
    ],
    explanation: n(
      'よろしいですか (b) lịch sự hơn mức cần giữa hai bạn thân — mức trung tính (いいですか) đã đủ. 構いません (c) không sai nghĩa nhưng thiếu sự DỨT KHOÁT mà もちろんです có ở vị trí này. 仕方ありません (d) dùng để thông cảm một chuyện không hay, không phải lời hứa cẩn thận hơn với đồ mượn.',
      'よろしいですか (b) is more polite than needed between close friends — the neutral level (いいですか) is already enough. 構いません (c) is not wrong in meaning but lacks the DECISIVENESS that もちろんです has in this slot. 仕方ありません (d) is for sympathizing about something unfortunate, not a promise to be careful with a borrowed item.',
      '「よろしいですか」(b)は親しい友だち同士に必要な丁寧さより丁寧すぎます——中立的な「いいですか」で十分です。「構いません」(c)は意味は間違っていませんが、この位置に必要な「もちろんです」のはっきりとした感じがありません。「仕方ありません」(d)は良くないことに同情するときに使うもので、借りた物を大切にするという約束ではありません。',
    ),
  }),

  // Q16 — L2 only: nhờ giúp bài tập lịch sự bình thường → nhờ vả ngắn gọn → bạn đồng ý thông thường.
  question({
    order: 16,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai bạn cùng lớp, chưa thân lắm, mức lịch sự bình thường. 佐藤 nhờ 田中 giúp bài tập.',
      'Roles: two classmates, not very close yet, ordinary politeness. Satō asks Tanaka for help with homework.',
      '関係：まだあまり親しくないクラスメート同士で、普通の丁寧さです。佐藤さんは田中さんに宿題を手伝ってもらうよう頼みます。',
    ),
    dialogue: [
      dialogueTurn('q16t1', 'sato', [seg('宿題（しゅくだい）を手伝って'), blankSeg('q16b1'), seg('。'), blankSeg('q16b2'), seg('。')]),
      dialogueTurn('q16t2', 'tanaka', [blankSeg('q16b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q16b1', 'もらえませんか', 'もらえませんか'),
      choiceBlank('q16b2', 'お願いします', 'おねがいします'),
      choiceBlank('q16b3', '了解しました', 'りょうかいしました'),
    ],
    options: [
      choiceOption('q16a', 'もらえませんか / お願いします / 了解しました', {
        q16b1: 'もらえませんか', q16b2: 'お願いします', q16b3: '了解しました',
      }),
      choiceOption('q16b', 'いただけますか / お願いします / 了解しました', {
        q16b1: 'いただけますか', q16b2: 'お願いします', q16b3: '了解しました',
      }),
      choiceOption('q16c', 'もらえませんか / 本当ですか / 了解しました', {
        q16b1: 'もらえませんか', q16b2: '本当ですか', q16b3: '了解しました',
      }),
      choiceOption('q16d', 'もらえませんか / お願いします / かしこまりました', {
        q16b1: 'もらえませんか', q16b2: 'お願いします', q16b3: 'かしこまりました',
      }),
    ],
    correctOptionId: 'q16a',
    reviews: [
      review(L2, 'vocabulary', 'temo-moraemasenka'),
      review(L2, 'vocabulary', 'onegai-shimasu'),
      review(L2, 'vocabulary', 'ryoukai-shimashita'),
    ],
    explanation: n(
      'いただけますか (b) lịch sự hơn mức cần giữa hai bạn cùng lớp chưa thân lắm. 本当ですか (c) là phản ứng ngạc nhiên, không hợp làm câu kết thúc lời nhờ. かしこまりました (d) là cách đồng ý rất lịch sự kiểu dịch vụ, lệch với quan hệ bạn học đã thiết lập.',
      'いただけますか (b) is more polite than needed between two not-very-close classmates. 本当ですか (c) is a reaction of surprise, not fitting as a closing to a request. かしこまりました (d) is a very polite service-style agreement, mismatched with the classmate relationship already established.',
      '「いただけますか」(b)はまだあまり親しくないクラスメート同士に必要な丁寧さより丁寧すぎます。「本当ですか」(c)は驚きの反応で、お願いを締めくくる言葉としては合いません。「かしこまりました」(d)は接客業のようなとても丁寧な同意の仕方で、すでに設定されたクラスメートの関係には合いません。',
    ),
  }),

  // Q17 — L1+L2 bridge: xin lỗi lịch sự (đến muộn) → thông cảm → nhờ vả lịch sự.
  question({
    order: 17,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai đồng nghiệp bình thường, giữ thể lịch sự vừa phải. 田中 xin lỗi vì đến muộn cuộc họp, rồi nhờ 伊藤 gửi giúp tài liệu.',
      'Roles: two ordinary colleagues, keeping a moderately polite register. Tanaka apologizes for being late to a meeting, then asks Itō to send some materials.',
      '関係：普通の丁寧さを保つ普通の同僚同士です。田中さんは会議に遅れたことを謝り、伊藤さんに資料を送ってもらうよう頼みます。',
    ),
    dialogue: [
      dialogueTurn('q17t1', 'tanaka', [blankSeg('q17b1'), seg('。会議（かいぎ）に遅（おく）れてしまいました。')]),
      dialogueTurn('q17t2', 'ito', [blankSeg('q17b2'), seg('。始（はじ）めましょう。')]),
      dialogueTurn('q17t3', 'tanaka', [seg('それから、資料を送って'), blankSeg('q17b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q17b1', '申し訳ありません', 'もうしわけありません'),
      choiceBlank('q17b2', '仕方ありませんね', 'しかたありませんね'),
      choiceBlank('q17b3', 'もらえませんか', 'もらえませんか'),
    ],
    options: [
      choiceOption('q17a', '申し訳ありません / 仕方ありませんね / もらえませんか', {
        q17b1: '申し訳ありません', q17b2: '仕方ありませんね', q17b3: 'もらえませんか',
      }),
      choiceOption('q17b', 'ごめんなさい / 仕方ありませんね / もらえませんか', {
        q17b1: 'ごめんなさい', q17b2: '仕方ありませんね', q17b3: 'もらえませんか',
      }),
      choiceOption('q17c', '申し訳ありません / 大丈夫です / もらえませんか', {
        q17b1: '申し訳ありません', q17b2: '大丈夫です', q17b3: 'もらえませんか',
      }),
      choiceOption('q17d', '申し訳ありません / 仕方ありませんね / くれませんか', {
        q17b1: '申し訳ありません', q17b2: '仕方ありませんね', q17b3: 'くれませんか',
      }),
    ],
    correctOptionId: 'q17a',
    reviews: [
      review(L1, 'vocabulary', 'moushiwake-arimasen'),
      review(L1, 'vocabulary', 'shikata-arimasen'),
      review(L2, 'vocabulary', 'temo-moraemasenka'),
    ],
    explanation: n(
      'ごめんなさい (b) là thể thân mật, lệch với hai đồng nghiệp đang giữ thể lịch sự. 大丈夫です (c) dùng để đồng ý cho phép/trấn an, không phải câu thông cảm cho một lời xin lỗi. くれませんか (d) là thể thân mật, lệch với mức lịch sự đã giữ suốt cuộc hội thoại.',
      'ごめんなさい (b) is casual, mismatched with two colleagues keeping polite form. 大丈夫です (c) grants permission/reassures, it is not a sympathetic reply to an apology. くれませんか (d) is casual, mismatched with the polite level kept throughout the exchange.',
      '「ごめんなさい」(b)は気軽な言い方で、丁寧体を保つ同僚同士には合いません。「大丈夫です」(c)は許可を出す・安心させる言葉で、謝罪への同情の返事ではありません。「くれませんか」(d)は気軽な言い方で、この会話全体で保たれている丁寧さのレベルに合いません。',
    ),
  }),

  // Q18 — L2 only: xin phép rất lịch sự (dịch vụ cao cấp) → nhân viên đồng ý → khách kết lời.
  question({
    order: 18,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: khách hàng và nhân viên trong một dịch vụ trịnh trọng, chưa quen biết — cả hai giữ thể rất lịch sự. Khách nhờ nhân viên sửa một món đồ.',
      'Roles: a customer and an employee in a formal service, strangers — both keep the very polite register. The customer asks the employee to fix an item.',
      '関係：改まったサービスの客と店員で、初対面です。二人ともとても丁寧な言葉遣いを保ちます。客は店員に品物を直してもらうよう頼みます。',
    ),
    dialogue: [
      dialogueTurn('q18t1', 'sato', [seg('これを直（なお）して'), blankSeg('q18b1'), seg('。')]),
      dialogueTurn('q18t2', 'tanaka', [blankSeg('q18b2'), seg('。')]),
      dialogueTurn('q18t3', 'sato', [blankSeg('q18b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q18b1', 'いただけますか', 'いただけますか'),
      choiceBlank('q18b2', 'かしこまりました', 'かしこまりました'),
      choiceBlank('q18b3', 'お願いします', 'おねがいします'),
    ],
    options: [
      choiceOption('q18a', 'いただけますか / かしこまりました / お願いします', {
        q18b1: 'いただけますか', q18b2: 'かしこまりました', q18b3: 'お願いします',
      }),
      choiceOption('q18b', 'もらえますか / かしこまりました / お願いします', {
        q18b1: 'もらえますか', q18b2: 'かしこまりました', q18b3: 'お願いします',
      }),
      choiceOption('q18c', 'いただけますか / 了解しました / お願いします', {
        q18b1: 'いただけますか', q18b2: '了解しました', q18b3: 'お願いします',
      }),
      choiceOption('q18d', 'いただけますか / かしこまりました / 本当ですか', {
        q18b1: 'いただけますか', q18b2: 'かしこまりました', q18b3: '本当ですか',
      }),
    ],
    correctOptionId: 'q18a',
    reviews: [
      review(L2, 'vocabulary', 'teitadakemasu-ka'),
      review(L2, 'vocabulary', 'kashikomarimashita'),
      review(L2, 'vocabulary', 'onegai-shimasu'),
    ],
    explanation: n(
      'もらえますか (b) chưa đủ lịch sự cho dịch vụ trịnh trọng với người lạ. 了解しました (c) là cách đồng ý thân mật/thông thường, không đúng mức rất lịch sự cần giữ trong dịch vụ trang trọng. 本当ですか (d) là phản ứng ngạc nhiên, không hợp làm câu kết lời sau khi được đồng ý giúp.',
      'もらえますか (b) is not polite enough for a formal service with a stranger. 了解しました (c) is a casual/ordinary way to agree, not the very polite level needed in a formal service. 本当ですか (d) is a reaction of surprise, not fitting as a closing after being agreed to help.',
      '「もらえますか」(b)は初対面の相手への改まったサービスには丁寧さが足りません。「了解しました」(c)は気軽・普通の同意の言い方で、改まったサービスで保つべきとても丁寧なレベルとは合いません。「本当ですか」(d)は驚きの反応で、手伝ってもらえることに同意された後の締めくくりの言葉としては合いません。',
    ),
  }),
];

export const JA_M02_U2_COMPREHENSIVE = {
  title: 'Bài tổng hợp Unit 2',
  titleByNative: n('Bài tổng hợp Unit 2', 'Unit 2 Comprehensive Test', '第2ユニット総合テスト'),
  description: 'Ôn lại toàn bộ Unit 2 của Module 2: xin lỗi/xin phép đúng mức độ, và nhờ vả người khác đúng tình huống.',
  descriptionByNative: n(
    'Ôn lại toàn bộ Unit 2 của Module 2: xin lỗi/xin phép đúng mức độ, và nhờ vả người khác đúng tình huống.',
    'Reviews all of Module 2 Unit 2: apologizing/asking permission at the right level, and asking others for favors in the right situation.',
    'モジュール2・第2ユニット全体の復習：適切な度合いでの謝罪・許可の求め方と、状況に合ったお願いの仕方。',
  ),
  estimatedMinutes: '12',
  questions: [...SENTENCE_QUESTIONS, ...DIALOGUE_QUESTIONS],
};
