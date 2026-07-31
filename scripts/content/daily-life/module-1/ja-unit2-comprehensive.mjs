// Bài tổng hợp cuối Unit 2 — Tiếng Nhật, Daily Life Module 1 (ADR-022).
//
// Nguồn: TÁI DÙNG (G14-R3 bậc 1) từ vựng + mẫu ngữ pháp + câu đã duyệt của
// chính hai lesson trong unit (u2-l1 "Chào người đã quen", u2-l2 "Đáp lời
// hỏi thăm) — không mở nguồn ngoài. §G7 vùng A: mọi ô CHẤM ĐIỂM chỉ dùng
// vốn đã dạy trong hai bài này; reviews[] trỏ đúng lessonId + kind + ref.
//
// 18 câu, hai mức — generator tự ép dải order và số ô (2 lesson →
// SECTION_PLANS[2], xem scripts/lib/unit-comprehensive-test.mjs):
//   Q1–6   sentence_multi_blank_choice · 2 ô · chọn 1/4
//   Q7–18  dialogue_multi_blank_choice · hội thoại 2–3 lượt · 3 ô · chọn 1/4
//
// Miễn provenance riêng (G14-R2b, owner chốt 2026-07-30) — dẫn xuất từ u2-l1
// (miễn) + u2-l2 (có provenance thật). Xem scripts/content/sources/
// provenance-exemptions.json.
//
// LOCALIZE: `resolveUnitComprehensiveTest` KHÔNG chạy qua `localizeSupport`
// (khác đường lesson), nên mọi chuỗi hỗ trợ ở đây tự mang `*ByNative` đủ
// vi/en/ja — không hard-code một ngôn ngữ vào chuỗi trần.

import { blank, blankSeg, choiceOption, dialogueTurn, review, seg } from '../../../lib/unit-comprehensive-helpers.mjs';

const L1 = 'ja-daily_life-m01-u2-l1';
const L2 = 'ja-daily_life-m01-u2-l2';

const ID = 'ja-daily_life-m01-u2-comprehensive';
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
      'Satō và Itō quen nhau nhưng chưa thân. Họ tình cờ gặp lại sau một thời gian dài, dùng thể lịch sự.',
      'Satō and Itō are acquainted but not close. They run into each other after a long time and use polite form.',
      '佐藤さんと伊藤さんは知り合いですが親しくはありません。久しぶりに会い、丁寧体を使います。',
    ),
    segments: [seg('あ、'), blankSeg('q1b1'), seg('。'), blankSeg('q1b2'), seg('。')],
    blanks: [
      choiceBlank('q1b1', 'お久しぶりです', 'おひさしぶりです'),
      choiceBlank('q1b2', 'お元気ですか', 'おげんきですか'),
    ],
    options: [
      choiceOption('q1a', 'お久しぶりです / お元気ですか', {
        q1b1: 'お久しぶりです', q1b2: 'お元気ですか',
      }),
      choiceOption('q1b', '久しぶり / お元気ですか', {
        q1b1: '久しぶり', q1b2: 'お元気ですか',
      }),
      choiceOption('q1c', 'お久しぶりです / 元気？', {
        q1b1: 'お久しぶりです', q1b2: '元気？',
      }),
      choiceOption('q1d', 'お久しぶりです / おかげさまで', {
        q1b1: 'お久しぶりです', q1b2: 'おかげさまで',
      }),
    ],
    correctOptionId: 'q1a',
    reviews: [
      review(L1, 'vocabulary', 'o-hisashiburi-desu'),
      review(L1, 'vocabulary', 'o-genki-desu-ka'),
    ],
    explanation: n(
      '久しぶり là thể thường, không hợp khi hai người cùng dùng thể lịch sự. 元気？ cũng là thể thường — hỏi thăm lịch sự phải dùng お元気ですか. おかげさまで là câu ĐÁP lại lời hỏi thăm, không phải câu hỏi.',
      '久しぶり is plain form, which does not fit when both sides use polite form. 元気？ is likewise plain — asking politely takes お元気ですか. おかげさまで is the REPLY to being asked, not the question itself.',
      '「久しぶり」は普通体なので、丁寧体同士のやりとりには合いません。「元気？」も普通体です。丁寧にたずねるときは「お元気ですか」を使います。「おかげさまで」は尋ねられたときの返事であり、質問ではありません。',
    ),
  }),

  question({
    order: 2,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Tanaka và Satō là bạn thân. Họ tình cờ gặp lại sau một thời gian dài, dùng thể thường.',
      'Tanaka and Satō are close friends. They run into each other after a long time and use plain form.',
      '田中さんと佐藤さんは親しい友だちです。久しぶりに会い、普通体を使います。',
    ),
    segments: [seg('あ、'), blankSeg('q2b1'), seg('。'), blankSeg('q2b2'), seg('？')],
    blanks: [
      choiceBlank('q2b1', '久しぶり', 'ひさしぶり'),
      choiceBlank('q2b2', '元気', 'げんき'),
    ],
    options: [
      choiceOption('q2a', '久しぶり / 元気？', { q2b1: '久しぶり', q2b2: '元気' }),
      choiceOption('q2b', 'お久しぶりです / 元気？', {
        q2b1: 'お久しぶりです', q2b2: '元気',
      }),
      choiceOption('q2c', '久しぶり / お元気ですか', {
        q2b1: '久しぶり', q2b2: 'お元気ですか',
      }),
      choiceOption('q2d', '久しぶり / おかげさまで', {
        q2b1: '久しぶり', q2b2: 'おかげさまで',
      }),
    ],
    correctOptionId: 'q2a',
    reviews: [
      review(L1, 'vocabulary', 'hisashiburi'),
      review(L1, 'vocabulary', 'genki'),
    ],
    explanation: n(
      'お久しぶりです là thể lịch sự, lệch với bạn thân dùng thể thường. お元気ですか cũng lịch sự — hỏi thăm thân mật phải dùng 元気？. おかげさまで là câu đáp, không phải câu hỏi.',
      'お久しぶりです is polite form, which clashes with close friends using plain form. お元気ですか is likewise polite — asking casually takes 元気？. おかげさまで is a reply, not a question.',
      '「お久しぶりです」は丁寧体なので、普通体で話す親しい友だちには合いません。「お元気ですか」も丁寧です。気軽にたずねるときは「元気？」を使います。「おかげさまで」は返事であり、質問ではありません。',
    ),
  }),

  question({
    order: 3,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Satō vừa được hỏi お元気ですか một cách lịch sự. Satō đáp lại đúng mức.',
      'Satō has just been politely asked お元気ですか and replies at the same level.',
      '佐藤さんは丁寧に「お元気ですか」と聞かれたばかりです。同じ丁寧さで返事をします。',
    ),
    segments: [blankSeg('q3b1'), seg('。'), blankSeg('q3b2'), seg('。')],
    blanks: [
      choiceBlank('q3b1', 'はい', 'はい'),
      choiceBlank('q3b2', 'おかげさまで', 'おかげさまで'),
    ],
    options: [
      choiceOption('q3a', 'はい / おかげさまで', { q3b1: 'はい', q3b2: 'おかげさまで' }),
      choiceOption('q3b', 'うん / おかげさまで', { q3b1: 'うん', q3b2: 'おかげさまで' }),
      choiceOption('q3c', 'はい / 元気', { q3b1: 'はい', q3b2: '元気' }),
      choiceOption('q3d', 'お元気ですか / おかげさまで', {
        q3b1: 'お元気ですか', q3b2: 'おかげさまで',
      }),
    ],
    correctOptionId: 'q3a',
    reviews: [
      review(L1, 'vocabulary', 'hai'),
      review(L1, 'vocabulary', 'okagesama-de'),
    ],
    explanation: n(
      'うん là thể thường, lệch với người hỏi đã dùng thể lịch sự. 元気 (không kèm おかげさまで) là câu đáp kiểu thân mật, không hợp cảnh lịch sự. お元気ですか là lặp lại câu hỏi thay vì trả lời.',
      'うん is plain form, mismatched with a polite question. 元気 alone answers casually, which does not fit a polite exchange. お元気ですか repeats the question instead of answering it.',
      '「うん」は普通体で、丁寧に聞かれたのと合いません。「元気」だけではカジュアルな返事になり、丁寧な場面には合いません。「お元気ですか」は質問を繰り返しているだけで、答えになっていません。',
    ),
  }),

  question({
    order: 4,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Satō hỏi Itō đã đến Nhật được bao lâu, dùng cách hỏi theo mốc tròn thời gian.',
      'Satō asks Itō how long they have been in Japan, using the rounded-duration phrasing.',
      '佐藤さんは伊藤さんに、日本に来てどのぐらいになるかをたずねます。',
    ),
    segments: [blankSeg('q4b1'), seg('に来（き）て、'), blankSeg('q4b2'), seg('になりますか。')],
    blanks: [
      choiceBlank('q4b1', '日本', 'にほん'),
      choiceBlank('q4b2', 'どのぐらい', 'どのぐらい'),
    ],
    options: [
      choiceOption('q4a', '日本 / どのぐらい', { q4b1: '日本', q4b2: 'どのぐらい' }),
      choiceOption('q4b', '生活 / どのぐらい', { q4b1: '生活', q4b2: 'どのぐらい' }),
      choiceOption('q4c', '日本 / もう', { q4b1: '日本', q4b2: 'もう' }),
      choiceOption('q4d', '日本 / まだ', { q4b1: '日本', q4b2: 'まだ' }),
    ],
    correctOptionId: 'q4a',
    reviews: [
      review(L2, 'vocabulary', 'nihon'),
      review(L2, 'vocabulary', 'dono-gurai'),
    ],
    explanation: n(
      '生活 nghĩa là "cuộc sống", không phải một nơi chốn nên không đi được với に来て. もう và まだ là trạng từ chỉ mức đã/chưa hoàn thành, không hỏi được "bao lâu" — phải dùng どのぐらい.',
      '生活 means "life/living", not a place, so it cannot take に来て. もう and まだ mark whether something is already/not yet done — they cannot ask "how long"; どのぐらい does that.',
      '「生活」は「くらし」という意味で場所ではないため、「に来て」とは結びつきません。「もう」と「まだ」は完了したかどうかを表す言葉で、「どのぐらい」のように期間をたずねることはできません。',
    ),
  }),

  question({
    order: 5,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Satō vừa được Tanaka hỏi 元気？ theo kiểu thân mật. Satō đáp lại đúng mức, nguyên văn cuộc trò chuyện của hai người.',
      'Satō has just been casually asked 元気？ by Tanaka and replies at the same level, in their own words.',
      '佐藤さんは田中さんに「元気？」と気軽に聞かれたばかりです。同じ調子で、二人の会話そのままに返事をします。',
    ),
    segments: [blankSeg('q5b1'), seg('。'), blankSeg('q5b2'), seg('。')],
    blanks: [
      choiceBlank('q5b1', 'うん', 'うん'),
      choiceBlank('q5b2', '元気', 'げんき'),
    ],
    options: [
      choiceOption('q5a', 'うん / 元気', { q5b1: 'うん', q5b2: '元気' }),
      choiceOption('q5b', 'はい / 元気', { q5b1: 'はい', q5b2: '元気' }),
      choiceOption('q5c', 'うん / おかげさまで', { q5b1: 'うん', q5b2: 'おかげさまで' }),
      choiceOption('q5d', 'うん / お元気ですか', { q5b1: 'うん', q5b2: 'お元気ですか' }),
    ],
    correctOptionId: 'q5a',
    reviews: [
      review(L1, 'vocabulary', 'un'),
      review(L1, 'vocabulary', 'genki'),
    ],
    explanation: n(
      'はい và おかげさまで đều là thể lịch sự, lệch với cuộc trò chuyện thân mật này. お元気ですか lặp lại câu hỏi lịch sự thay vì đáp thân mật.',
      'はい and おかげさまで are both polite, mismatched with this casual exchange. お元気ですか repeats the question in polite form instead of answering casually.',
      '「はい」と「おかげさまで」はどちらも丁寧体で、この気軽な会話には合いません。「お元気ですか」は丁寧な質問を繰り返しているだけで、気軽な返事になっていません。',
    ),
  }),

  question({
    order: 6,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Tanaka đáp lại câu hỏi đã ở Nhật bao lâu bằng MỐC THỜI ĐIỂM đã đến, thay vì độ dài thời gian — nguyên văn câu Tanaka đã nói.',
      'Tanaka answers how long they have been in Japan by giving the ARRIVAL TIME rather than a duration — Tanaka’s own words.',
      '田中さんは日本にどのぐらいかという質問に、期間ではなく来た時期で、田中さん自身の言葉のとおりに答えます。',
    ),
    segments: [blankSeg('q6b1'), seg('の9月に'), blankSeg('q6b2'), seg('。')],
    blanks: [
      choiceBlank('q6b1', '去年', 'きょねん'),
      choiceBlank('q6b2', '来ました', 'きました'),
    ],
    options: [
      choiceOption('q6a', '去年 / 来ました', { q6b1: '去年', q6b2: '来ました' }),
      choiceOption('q6b', '先月 / 来ました', { q6b1: '先月', q6b2: '来ました' }),
      choiceOption('q6c', '去年 / 来ます', { q6b1: '去年', q6b2: '来ます' }),
      choiceOption('q6d', '去年 / なります', { q6b1: '去年', q6b2: 'なります' }),
    ],
    correctOptionId: 'q6a',
    reviews: [
      review(L2, 'vocabulary', 'kyonen'),
      review(L2, 'grammar', '[動詞]＋ました — quá khứ lịch sự'),
    ],
    explanation: n(
      '「先月の9月」mâu thuẫn — 先月 (tháng trước) không thể là "tháng 9" cụ thể trừ phi đang ở tháng 10. 来ます là thì hiện tại/tương lai, sai vì việc đến đã xảy ra rồi. なります nghĩa là "trở thành", không phải "đến".',
      '「先月の9月」is contradictory — 先月 (last month) can only literally be September if the current month is October. 来ます is present/future tense, wrong because the arrival already happened. なります means "becomes", not "arrived".',
      '「先月の9月」は矛盾しています。今が10月でない限り、先月が9月とは限りません。「来ます」は現在・未来形で、すでに起きたことには合いません。「なります」は「〜になる」という意味で、「来た」ことを表しません。',
    ),
  }),
];

/* ══ MỨC 2 — Q7–Q18 · dialogue_multi_blank_choice · 3 ô ═══════════════════ */

const DIALOGUE_QUESTIONS = [
  // ── Khối 1 (Q7–9) — u2-l1, 3 cảnh gốc, biến thể thứ nhất ──────────────
  question({
    order: 7,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: Satō và Itō ngang vai, quen nhau nhưng chưa thân — cả hai giữ thể lịch sự khi chào lại nhau sau một thời gian dài.',
      'Roles: Satō and Itō are equal in standing, acquainted but not close — both keep polite form when greeting each other again after a long time.',
      '関係：佐藤さんと伊藤さんは対等で、知り合いですが親しくはありません。久しぶりに会い、二人とも丁寧体を保ちます。',
    ),
    dialogue: [
      dialogueTurn('q7t1', 'sato', [seg('あ、'), blankSeg('q7b1'), seg('。')]),
      dialogueTurn('q7t2', 'ito', [blankSeg('q7b2'), seg('。')]),
      dialogueTurn('q7t3', 'sato', [blankSeg('q7b3'), seg('？')]),
    ],
    blanks: [
      choiceBlank('q7b1', 'お久しぶりです', 'おひさしぶりです'),
      choiceBlank('q7b2', 'お久しぶりです', 'おひさしぶりです'),
      choiceBlank('q7b3', 'お元気ですか', 'おげんきですか'),
    ],
    options: [
      choiceOption('q7a', 'お久しぶりです / お久しぶりです / お元気ですか', {
        q7b1: 'お久しぶりです', q7b2: 'お久しぶりです', q7b3: 'お元気ですか',
      }),
      choiceOption('q7b', '久しぶり / お久しぶりです / お元気ですか', {
        q7b1: '久しぶり', q7b2: 'お久しぶりです', q7b3: 'お元気ですか',
      }),
      choiceOption('q7c', 'お久しぶりです / 久しぶり / お元気ですか', {
        q7b1: 'お久しぶりです', q7b2: '久しぶり', q7b3: 'お元気ですか',
      }),
      choiceOption('q7d', 'お久しぶりです / お久しぶりです / 元気？', {
        q7b1: 'お久しぶりです', q7b2: 'お久しぶりです', q7b3: '元気？',
      }),
    ],
    correctOptionId: 'q7a',
    reviews: [
      review(L1, 'vocabulary', 'o-hisashiburi-desu'),
      review(L1, 'vocabulary', 'o-genki-desu-ka'),
    ],
    explanation: n(
      'Mỗi phương án sai đổi ĐÚNG một ô sang thể thường (久しぶり / 元気？), lệch với cả cuộc trò chuyện đang giữ thể lịch sự.',
      'Each wrong option changes exactly one blank to plain form (久しぶり / 元気？), clashing with the rest of the polite exchange.',
      '誤答はそれぞれ一つの空欄だけを普通体（久しぶり／元気？）に変えており、丁寧体で進む会話全体と合いません。',
    ),
  }),

  question({
    order: 8,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn Satō và Itō, cùng cảnh lịch sự như câu trước — Itō vừa được hỏi thăm và đáp lại.',
      'Roles: still Satō and Itō, the same polite setting as the previous question — Itō has just been asked and replies.',
      '関係：引き続き佐藤さんと伊藤さんの丁寧な場面です。伊藤さんが尋ねられて答えます。',
    ),
    dialogue: [
      dialogueTurn('q8t1', 'sato', [blankSeg('q8b1'), seg('？')]),
      dialogueTurn('q8t2', 'ito', [blankSeg('q8b2'), seg('。'), blankSeg('q8b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q8b1', 'お元気ですか', 'おげんきですか'),
      choiceBlank('q8b2', 'はい', 'はい'),
      choiceBlank('q8b3', 'おかげさまで', 'おかげさまで'),
    ],
    options: [
      choiceOption('q8a', 'お元気ですか / はい / おかげさまで', {
        q8b1: 'お元気ですか', q8b2: 'はい', q8b3: 'おかげさまで',
      }),
      choiceOption('q8b', '元気？ / はい / おかげさまで', {
        q8b1: '元気？', q8b2: 'はい', q8b3: 'おかげさまで',
      }),
      choiceOption('q8c', 'お元気ですか / うん / おかげさまで', {
        q8b1: 'お元気ですか', q8b2: 'うん', q8b3: 'おかげさまで',
      }),
      choiceOption('q8d', 'お元気ですか / はい / 元気', {
        q8b1: 'お元気ですか', q8b2: 'はい', q8b3: '元気',
      }),
    ],
    correctOptionId: 'q8a',
    reviews: [
      review(L1, 'vocabulary', 'o-genki-desu-ka'),
      review(L1, 'vocabulary', 'hai'),
      review(L1, 'vocabulary', 'okagesama-de'),
    ],
    explanation: n(
      'Mỗi phương án sai đổi đúng một ô sang thể thường (元気？ / うん / 元気), lệch với cả hai bên đang dùng thể lịch sự.',
      'Each wrong option changes exactly one blank to plain form (元気？ / うん / 元気), clashing with both sides using polite form.',
      '誤答はそれぞれ一つの空欄だけを普通体（元気？／うん／元気）に変えており、両者が丁寧体を使っているのと合いません。',
    ),
  }),

  question({
    order: 9,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: giáo viên và Satō — quan hệ trên–dưới. Người trên hỏi bằng thể thường, người dưới đáp bằng thể lịch sự — thể nói do vai vế quyết định, không do độ thân.',
      'Roles: the teacher and Satō — an unequal, senior-to-junior relationship. The senior asks in plain form, the junior replies in polite form — speech style is decided by standing, not closeness.',
      '関係：先生と佐藤さんは上下関係です。目上の人は普通体でたずね、目下の人は丁寧体で答えます。話し方は親しさではなく立場で決まります。',
    ),
    dialogue: [
      dialogueTurn('q9t1', 'sensei', [seg('あ、'), blankSeg('q9b1'), seg('。')]),
      dialogueTurn('q9t2', 'sato', [blankSeg('q9b2'), seg('。')]),
      dialogueTurn('q9t3', 'sensei', [blankSeg('q9b3'), seg('？')]),
    ],
    blanks: [
      choiceBlank('q9b1', '久しぶり', 'ひさしぶり'),
      choiceBlank('q9b2', 'お久しぶりです', 'おひさしぶりです'),
      choiceBlank('q9b3', '元気', 'げんき'),
    ],
    options: [
      choiceOption('q9a', '久しぶり / お久しぶりです / 元気？', {
        q9b1: '久しぶり', q9b2: 'お久しぶりです', q9b3: '元気',
      }),
      choiceOption('q9b', 'お久しぶりです / お久しぶりです / 元気？', {
        q9b1: 'お久しぶりです', q9b2: 'お久しぶりです', q9b3: '元気',
      }),
      choiceOption('q9c', '久しぶり / 久しぶり / 元気？', {
        q9b1: '久しぶり', q9b2: '久しぶり', q9b3: '元気',
      }),
      choiceOption('q9d', '久しぶり / お久しぶりです / お元気ですか', {
        q9b1: '久しぶり', q9b2: 'お久しぶりです', q9b3: 'お元気ですか',
      }),
    ],
    correctOptionId: 'q9a',
    reviews: [
      review(L1, 'vocabulary', 'hisashiburi'),
      review(L1, 'vocabulary', 'o-hisashiburi-desu'),
      review(L1, 'vocabulary', 'genki'),
    ],
    explanation: n(
      'Giáo viên là người trên nên giữ thể thường suốt lượt nói — đổi sang お久しぶりです (phương án b) làm mất khoảng cách vai vế. Satō là người dưới nên phải giữ thể lịch sự — đổi thành 久しぶり (phương án c) làm mất phép lịch sự cần có. お元気ですか (phương án d) lại là thể lịch sự trong khi giáo viên đang dùng thể thường.',
      'The teacher is senior and keeps plain form throughout — switching to お久しぶりです (option b) erases that gap in standing. Satō is junior and must stay polite — switching to 久しぶり (option c) drops the required politeness. お元気ですか (option d) is polite form where the teacher has been using plain form.',
      '先生は目上なので、最初から最後まで普通体を保ちます。「お久しぶりです」（選択肢b）に変えると立場の差が消えてしまいます。佐藤さんは目下なので丁寧体を保つ必要があり、「久しぶり」（選択肢c）にすると必要な丁寧さが失われます。「お元気ですか」（選択肢d）は、先生が普通体を使っているのに丁寧体になっています。',
    ),
  }),

  // ── Khối 2 (Q10–12) — u2-l2, 3 cảnh gốc, biến thể thứ nhất ─────────────
  question({
    order: 10,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: Satō và Itō ngang vai, quen nhau nhưng chưa thân — Satō hỏi Itō đã ở Nhật bao lâu và đã quen chưa, giữ thể lịch sự.',
      'Roles: Satō and Itō are equal in standing, acquainted but not close — Satō asks Itō how long they have been in Japan and whether they have settled in, keeping polite form.',
      '関係：佐藤さんと伊藤さんは対等で、知り合いですが親しくはありません。佐藤さんは伊藤さんに日本にどのぐらいか、もう慣れたかをたずね、丁寧体を保ちます。',
    ),
    dialogue: [
      dialogueTurn('q10t1', 'sato', [
        blankSeg('q10b1'), seg('に来（き）て、'), blankSeg('q10b2'), seg('になりますか。'),
      ]),
      dialogueTurn('q10t2', 'ito', [seg('1年になります。')]),
      dialogueTurn('q10t3', 'sato', [
        seg('そうですか。日本の生活に、'), blankSeg('q10b3'), seg('慣れましたか。'),
      ]),
    ],
    blanks: [
      choiceBlank('q10b1', '日本', 'にほん'),
      choiceBlank('q10b2', 'どのぐらい', 'どのぐらい'),
      choiceBlank('q10b3', 'もう', 'もう'),
    ],
    options: [
      choiceOption('q10a', '日本 / どのぐらい / もう', {
        q10b1: '日本', q10b2: 'どのぐらい', q10b3: 'もう',
      }),
      choiceOption('q10b', '生活 / どのぐらい / もう', {
        q10b1: '生活', q10b2: 'どのぐらい', q10b3: 'もう',
      }),
      choiceOption('q10c', '日本 / もう / もう', {
        q10b1: '日本', q10b2: 'もう', q10b3: 'もう',
      }),
      choiceOption('q10d', '日本 / どのぐらい / まだ', {
        q10b1: '日本', q10b2: 'どのぐらい', q10b3: 'まだ',
      }),
    ],
    correctOptionId: 'q10a',
    reviews: [
      review(L2, 'vocabulary', 'nihon'),
      review(L2, 'vocabulary', 'dono-gurai'),
      review(L2, 'vocabulary', 'mou'),
    ],
    explanation: n(
      '生活 nghĩa là "cuộc sống", không phải nơi chốn nên không đi được với に来て. もう ở ô thứ hai không hỏi được "bao lâu". まだ ở câu hỏi "___慣れましたか" sai — まだ dùng trong câu ĐÁP ("vẫn chưa"), câu hỏi phải dùng もう ("đã… chưa").',
      '生活 means "life", not a place, so it cannot take に来て. もう in the second blank cannot ask "how long". まだ is wrong in the question "___慣れましたか" — まだ belongs in an ANSWER ("not yet"); the question needs もう ("have you already…").',
      '「生活」は「くらし」という意味で場所ではないため、「に来て」とは結びつきません。二つ目の空欄に「もう」を入れると「どのぐらい」の代わりにならず、期間をたずねられません。「___慣れましたか」という質問に「まだ」を使うのは誤りです。「まだ」は「まだです」のような返事に使う言葉で、質問には「もう」を使います。',
    ),
  }),

  question({
    order: 11,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: Satō và Tanaka ngang vai, quen nhau nhưng chưa thân, giữ thể lịch sự — Tanaka trả lời bằng THỜI ĐIỂM đã đến thay vì độ dài thời gian.',
      'Roles: Satō and Tanaka are equal in standing, acquainted but not close, polite form — Tanaka answers with the ARRIVAL TIME rather than a duration.',
      '関係：佐藤さんと田中さんは対等で、知り合いですが親しくはありません。丁寧体を保ちます。田中さんは期間ではなく来た時期で答えます。',
    ),
    dialogue: [
      dialogueTurn('q11t1', 'sato', [seg('日本に来（き）て、'), blankSeg('q11b1'), seg('ですか。')]),
      dialogueTurn('q11t2', 'tanaka', [blankSeg('q11b2'), seg('の9月に'), blankSeg('q11b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q11b1', 'どのぐらい', 'どのぐらい'),
      choiceBlank('q11b2', '去年', 'きょねん'),
      choiceBlank('q11b3', '来ました', 'きました'),
    ],
    options: [
      choiceOption('q11a', 'どのぐらい / 去年 / 来ました', {
        q11b1: 'どのぐらい', q11b2: '去年', q11b3: '来ました',
      }),
      choiceOption('q11b', 'もう / 去年 / 来ました', {
        q11b1: 'もう', q11b2: '去年', q11b3: '来ました',
      }),
      choiceOption('q11c', 'どのぐらい / 先月 / 来ました', {
        q11b1: 'どのぐらい', q11b2: '先月', q11b3: '来ました',
      }),
      choiceOption('q11d', 'どのぐらい / 去年 / なります', {
        q11b1: 'どのぐらい', q11b2: '去年', q11b3: 'なります',
      }),
    ],
    correctOptionId: 'q11a',
    reviews: [
      review(L2, 'vocabulary', 'dono-gurai'),
      review(L2, 'vocabulary', 'kyonen'),
      review(L2, 'grammar', '[động từ] ＋ ました — quá khứ lịch sự'),
    ],
    explanation: n(
      'もう không hỏi được "bao lâu". 「先月の9月」mâu thuẫn về mốc thời gian. なります nghĩa là "trở thành", không phải "đến".',
      'もう cannot ask "how long". 「先月の9月」is a contradictory time reference. なります means "becomes", not "arrived".',
      '「もう」では期間をたずねられません。「先月の9月」は時期が矛盾しています。「なります」は「〜になる」という意味で、「来た」ことを表しません。',
    ),
  }),

  question({
    order: 12,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: giáo viên và Satō — quan hệ trên–dưới, nhưng ở bài này người trên vẫn hỏi bằng thể lịch sự (miễn trừ G6, owner chốt 2026-07-30 cho u2-l2 — không phải hạn chế kỹ thuật). Satō vừa đến tháng trước.',
      'Roles: the teacher and Satō — senior-to-junior, but in this lesson the senior still asks in polite form (G6 exemption, owner decision 2026-07-30 for u2-l2 — not a technical limitation). Satō arrived only last month.',
      '関係：先生と佐藤さんは上下関係ですが、このレッスンでは目上の人も丁寧体でたずねます（G6の適用除外、owner決定2026-07-30、技術的制約ではありません）。佐藤さんは先月来たばかりです。',
    ),
    dialogue: [
      dialogueTurn('q12t1', 'sensei', [blankSeg('q12b1'), seg('に来（き）て、どのぐらいになりますか。')]),
      dialogueTurn('q12t2', 'sato', [seg('私は、'), blankSeg('q12b2'), seg('、来ました。')]),
      dialogueTurn('q12t3', 'sensei', [seg('そうですか。'), blankSeg('q12b3'), seg('慣れましたか。')]),
    ],
    blanks: [
      choiceBlank('q12b1', '日本', 'にほん'),
      choiceBlank('q12b2', '先月', 'せんげつ'),
      choiceBlank('q12b3', 'もう', 'もう'),
    ],
    options: [
      choiceOption('q12a', '日本 / 先月 / もう', {
        q12b1: '日本', q12b2: '先月', q12b3: 'もう',
      }),
      choiceOption('q12b', '生活 / 先月 / もう', {
        q12b1: '生活', q12b2: '先月', q12b3: 'もう',
      }),
      choiceOption('q12c', '日本 / 去年 / もう', {
        q12b1: '日本', q12b2: '去年', q12b3: 'もう',
      }),
      choiceOption('q12d', '日本 / 先月 / まだ', {
        q12b1: '日本', q12b2: '先月', q12b3: 'まだ',
      }),
    ],
    correctOptionId: 'q12a',
    reviews: [
      review(L2, 'vocabulary', 'nihon'),
      review(L2, 'vocabulary', 'sengetsu'),
      review(L2, 'vocabulary', 'mou'),
    ],
    explanation: n(
      '生活 không phải nơi chốn nên không đi được với に来て. 去年 lệch với tình huống đã nêu (Satō mới đến tháng trước, không phải năm ngoái). まだ trong câu hỏi "___慣れましたか" sai — まだ dùng trong câu đáp, câu hỏi cần もう.',
      '生活 is not a place, so it cannot take に来て. 去年 clashes with the stated situation (Satō arrived only last month, not last year). まだ is wrong in the question "___慣れましたか" — まだ belongs in an answer; the question needs もう.',
      '「生活」は場所ではないため「に来て」とは結びつきません。「去年」は場面設定（佐藤さんは先月来たばかり）と矛盾します。「___慣れましたか」という質問に「まだ」を使うのは誤りです。「まだ」は返事に使う言葉で、質問には「もう」を使います。',
    ),
  }),

  // ── Khối 3 (Q13–15) — u2-l1, biến thể thứ hai ──────────────────────────
  question({
    order: 13,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn Satō và Itō, ngang vai chưa thân, thể lịch sự — lần này Itō là người mở lời trước.',
      'Roles: still Satō and Itō, equal standing, not close, polite form — this time Itō speaks first.',
      '関係：引き続き対等で親しくない佐藤さんと伊藤さんです。今回は伊藤さんが先に声をかけます。',
    ),
    dialogue: [
      dialogueTurn('q13t1', 'ito', [seg('あ、'), blankSeg('q13b1'), seg('。'), blankSeg('q13b2'), seg('？')]),
      dialogueTurn('q13t2', 'sato', [blankSeg('q13b3'), seg('。おかげさまで。')]),
    ],
    blanks: [
      choiceBlank('q13b1', 'お久しぶりです', 'おひさしぶりです'),
      choiceBlank('q13b2', 'お元気ですか', 'おげんきですか'),
      choiceBlank('q13b3', 'はい', 'はい'),
    ],
    options: [
      choiceOption('q13a', 'お久しぶりです / お元気ですか / はい', {
        q13b1: 'お久しぶりです', q13b2: 'お元気ですか', q13b3: 'はい',
      }),
      choiceOption('q13b', '久しぶり / お元気ですか / はい', {
        q13b1: '久しぶり', q13b2: 'お元気ですか', q13b3: 'はい',
      }),
      choiceOption('q13c', 'お久しぶりです / 元気？ / はい', {
        q13b1: 'お久しぶりです', q13b2: '元気？', q13b3: 'はい',
      }),
      choiceOption('q13d', 'お久しぶりです / お元気ですか / うん', {
        q13b1: 'お久しぶりです', q13b2: 'お元気ですか', q13b3: 'うん',
      }),
    ],
    correctOptionId: 'q13a',
    reviews: [
      review(L1, 'vocabulary', 'o-hisashiburi-desu'),
      review(L1, 'vocabulary', 'o-genki-desu-ka'),
      review(L1, 'vocabulary', 'hai'),
    ],
    explanation: n(
      'Mỗi phương án sai đổi đúng một ô sang thể thường (久しぶり / 元気？ / うん), lệch với cả cuộc trò chuyện lịch sự.',
      'Each wrong option changes exactly one blank to plain form (久しぶり / 元気？ / うん), clashing with the polite exchange.',
      '誤答はそれぞれ一つの空欄だけを普通体（久しぶり／元気？／うん）に変えており、丁寧な会話と合いません。',
    ),
  }),

  question({
    order: 14,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn Tanaka và Satō, hai người bạn thân, thể thường — lần này Satō là người mở lời trước.',
      'Roles: still Tanaka and Satō, close friends, plain form — this time Satō speaks first.',
      '関係：引き続き親しい友だちの田中さんと佐藤さんです。今回は佐藤さんが先に声をかけます。',
    ),
    dialogue: [
      dialogueTurn('q14t1', 'sato', [seg('あ、'), blankSeg('q14b1'), seg('。'), blankSeg('q14b2'), seg('？')]),
      dialogueTurn('q14t2', 'tanaka', [blankSeg('q14b3'), seg('。元気。')]),
    ],
    blanks: [
      choiceBlank('q14b1', '久しぶり', 'ひさしぶり'),
      choiceBlank('q14b2', '元気', 'げんき'),
      choiceBlank('q14b3', 'うん', 'うん'),
    ],
    options: [
      choiceOption('q14a', '久しぶり / 元気？ / うん', {
        q14b1: '久しぶり', q14b2: '元気', q14b3: 'うん',
      }),
      choiceOption('q14b', 'お久しぶりです / 元気？ / うん', {
        q14b1: 'お久しぶりです', q14b2: '元気', q14b3: 'うん',
      }),
      choiceOption('q14c', '久しぶり / お元気ですか / うん', {
        q14b1: '久しぶり', q14b2: 'お元気ですか', q14b3: 'うん',
      }),
      choiceOption('q14d', '久しぶり / 元気？ / はい', {
        q14b1: '久しぶり', q14b2: '元気', q14b3: 'はい',
      }),
    ],
    correctOptionId: 'q14a',
    reviews: [
      review(L1, 'vocabulary', 'hisashiburi'),
      review(L1, 'vocabulary', 'genki'),
      review(L1, 'vocabulary', 'un'),
    ],
    explanation: n(
      'Mỗi phương án sai đổi đúng một ô sang thể lịch sự (お久しぶりです / お元気ですか / はい), lệch với cả cuộc trò chuyện thân mật.',
      'Each wrong option changes exactly one blank to polite form (お久しぶりです / お元気ですか / はい), clashing with the casual exchange.',
      '誤答はそれぞれ一つの空欄だけを丁寧体（お久しぶりです／お元気ですか／はい）に変えており、気軽な会話と合いません。',
    ),
  }),

  question({
    order: 15,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn giáo viên và Satō, quan hệ trên–dưới — lần này là phần giáo viên hỏi thăm thân mật và Satō đáp lại lịch sự.',
      'Roles: still the teacher and Satō, senior-to-junior — this time the teacher asks casually and Satō replies politely.',
      '関係：引き続き先生と佐藤さんの上下関係です。今回は先生が気軽にたずね、佐藤さんが丁寧に答えます。',
    ),
    dialogue: [
      dialogueTurn('q15t1', 'sensei', [blankSeg('q15b1'), seg('？')]),
      dialogueTurn('q15t2', 'sato', [blankSeg('q15b2'), seg('。'), blankSeg('q15b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q15b1', '元気', 'げんき'),
      choiceBlank('q15b2', 'はい', 'はい'),
      choiceBlank('q15b3', 'おかげさまで', 'おかげさまで'),
    ],
    options: [
      choiceOption('q15a', '元気？ / はい / おかげさまで', {
        q15b1: '元気', q15b2: 'はい', q15b3: 'おかげさまで',
      }),
      choiceOption('q15b', 'お元気ですか / はい / おかげさまで', {
        q15b1: 'お元気ですか', q15b2: 'はい', q15b3: 'おかげさまで',
      }),
      choiceOption('q15c', '元気？ / うん / おかげさまで', {
        q15b1: '元気', q15b2: 'うん', q15b3: 'おかげさまで',
      }),
      choiceOption('q15d', '元気？ / はい / 元気', {
        q15b1: '元気', q15b2: 'はい', q15b3: '元気',
      }),
    ],
    correctOptionId: 'q15a',
    reviews: [
      review(L1, 'vocabulary', 'genki'),
      review(L1, 'vocabulary', 'hai'),
      review(L1, 'vocabulary', 'okagesama-de'),
    ],
    explanation: n(
      'Giáo viên là người trên nên giữ thể thường — đổi thành お元気ですか (phương án b) làm mất khoảng cách vai vế. Satō là người dưới nên phải giữ thể lịch sự — うん (phương án c) và 元気 (phương án d) đều làm mất phép lịch sự cần có.',
      'The teacher is senior and keeps plain form — switching to お元気ですか (option b) erases that gap in standing. Satō is junior and must stay polite — both うん (option c) and 元気 (option d) drop the required politeness.',
      '先生は目上なので普通体を保ちます。「お元気ですか」（選択肢b）に変えると立場の差が消えます。佐藤さんは目下なので丁寧体を保つ必要があり、「うん」（選択肢c）も「元気」（選択肢d）も必要な丁寧さを失わせます。',
    ),
  }),

  // ── Khối 4 (Q16–18) — u2-l2, biến thể thứ hai ──────────────────────────
  question({
    order: 16,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn Satō và Itō, ngang vai chưa thân, thể lịch sự — lần này là phần đáp lại câu hỏi đã quen chưa.',
      'Roles: still Satō and Itō, equal standing, not close, polite form — this time the part where the question about settling in is answered.',
      '関係：引き続き対等で親しくない佐藤さんと伊藤さんです。今回は慣れたかという質問に答える部分です。',
    ),
    dialogue: [
      dialogueTurn('q16t1', 'sato', [
        seg('そうですか。日本の'), blankSeg('q16b1'), seg('に、もう'), blankSeg('q16b2'), seg('か。'),
      ]),
      dialogueTurn('q16t2', 'ito', [blankSeg('q16b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q16b1', '生活', 'せいかつ'),
      choiceBlank('q16b2', '慣れました', 'なれました'),
      choiceBlank('q16b3', 'はい', 'はい'),
    ],
    options: [
      choiceOption('q16a', '生活 / 慣れました / はい', {
        q16b1: '生活', q16b2: '慣れました', q16b3: 'はい',
      }),
      choiceOption('q16b', 'どのぐらい / 慣れました / はい', {
        q16b1: 'どのぐらい', q16b2: '慣れました', q16b3: 'はい',
      }),
      choiceOption('q16c', '生活 / 慣れます / はい', {
        q16b1: '生活', q16b2: '慣れます', q16b3: 'はい',
      }),
      choiceOption('q16d', '生活 / 慣れました / まだ', {
        q16b1: '生活', q16b2: '慣れました', q16b3: 'まだ',
      }),
    ],
    correctOptionId: 'q16a',
    reviews: [
      review(L2, 'vocabulary', 'seikatsu'),
      review(L2, 'vocabulary', 'nareru'),
      review(L1, 'vocabulary', 'hai'),
    ],
    explanation: n(
      'どのぐらい là từ để hỏi, không lắp được vào cụm "日本の___に". 慣れます là thì hiện tại/tương lai, sai vì câu hỏi đã dùng もう (đã…chưa) chỉ việc đã xảy ra. まだ đứng một mình không đáp trọn câu hỏi ngắn kiểu này — câu trả lời ngắn ở cảnh này là はい.',
      'どのぐらい is a question word and cannot fill "日本の___に". 慣れます is present/future tense, wrong because the question already used もう (have… already) for something that has happened. まだ alone does not answer this short-question pattern — the short answer in this scene is はい.',
      '「どのぐらい」は疑問詞なので「日本の___に」には入りません。「慣れます」は現在・未来形で、質問はすでに「もう」（もう〜したか）を使っているので合いません。「まだ」だけではこの短い質問への答えになりません。この場面での短い答えは「はい」です。',
    ),
  }),

  question({
    order: 17,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn Satō và Tanaka, ngang vai chưa thân, thể lịch sự — lần này là phần Tanaka đáp đã quen chưa.',
      'Roles: still Satō and Tanaka, equal standing, not close, polite form — this time the part where Tanaka answers whether they have settled in.',
      '関係：引き続き対等で親しくない佐藤さんと田中さんです。今回は慣れたかに田中さんが答える部分です。',
    ),
    dialogue: [
      dialogueTurn('q17t1', 'sato', [seg('そうですか。'), blankSeg('q17b1'), seg('慣れましたか。')]),
      dialogueTurn('q17t2', 'tanaka', [blankSeg('q17b2'), seg('、'), blankSeg('q17b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q17b1', 'もう', 'もう'),
      choiceBlank('q17b2', 'はい', 'はい'),
      choiceBlank('q17b3', 'おかげさまで', 'おかげさまで'),
    ],
    options: [
      choiceOption('q17a', 'もう / はい / おかげさまで', {
        q17b1: 'もう', q17b2: 'はい', q17b3: 'おかげさまで',
      }),
      choiceOption('q17b', 'まだ / はい / おかげさまで', {
        q17b1: 'まだ', q17b2: 'はい', q17b3: 'おかげさまで',
      }),
      choiceOption('q17c', 'もう / うん / おかげさまで', {
        q17b1: 'もう', q17b2: 'うん', q17b3: 'おかげさまで',
      }),
      choiceOption('q17d', 'もう / はい / 元気', {
        q17b1: 'もう', q17b2: 'はい', q17b3: '元気',
      }),
    ],
    correctOptionId: 'q17a',
    reviews: [
      review(L2, 'vocabulary', 'mou'),
      review(L1, 'vocabulary', 'hai'),
      review(L1, 'vocabulary', 'okagesama-de'),
    ],
    explanation: n(
      'まだ trong câu hỏi "___慣れましたか" sai — まだ dùng trong câu đáp, câu hỏi cần もう. うん là thể thường, lệch với cả hai bên đang lịch sự. 元気 đáp cho câu hỏi sức khoẻ, không đáp cho câu hỏi đã quen chưa.',
      'まだ is wrong in the question "___慣れましたか" — まだ belongs in an answer; the question needs もう. うん is plain form, mismatched with both sides being polite. 元気 answers a question about health, not about settling in.',
      '「___慣れましたか」という質問に「まだ」を使うのは誤りです。「まだ」は返事に使う言葉で、質問には「もう」を使います。「うん」は普通体で、両者が丁寧体を使っているのと合いません。「元気」は体調をたずねる質問への返事で、慣れたかどうかの質問には合いません。',
    ),
  }),

  question({
    order: 18,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: vẫn giáo viên và Satō — quan hệ trên–dưới, cả hai giữ thể lịch sự (miễn trừ G6, xem câu 12) — hỏi lại đầy đủ và nghe câu trả lời.',
      'Roles: still the teacher and Satō — senior-to-junior, both keep polite form (G6 exemption, see question 12) — asking again in full and hearing the answer.',
      '関係：引き続き先生と佐藤さんの上下関係です。両方とも丁寧体を保ちます（G6の適用除外、12問目参照）。もう一度たずねて、答えを聞きます。',
    ),
    dialogue: [
      dialogueTurn('q18t1', 'sensei', [
        blankSeg('q18b1'), seg('に来（き）て、'), blankSeg('q18b2'), seg('になりますか。'),
      ]),
      dialogueTurn('q18t2', 'sato', [blankSeg('q18b3'), seg('、来ました。')]),
    ],
    blanks: [
      choiceBlank('q18b1', '日本', 'にほん'),
      choiceBlank('q18b2', 'どのぐらい', 'どのぐらい'),
      choiceBlank('q18b3', '先月', 'せんげつ'),
    ],
    options: [
      choiceOption('q18a', '日本 / どのぐらい / 先月', {
        q18b1: '日本', q18b2: 'どのぐらい', q18b3: '先月',
      }),
      choiceOption('q18b', '生活 / どのぐらい / 先月', {
        q18b1: '生活', q18b2: 'どのぐらい', q18b3: '先月',
      }),
      choiceOption('q18c', '日本 / もう / 先月', {
        q18b1: '日本', q18b2: 'もう', q18b3: '先月',
      }),
      choiceOption('q18d', '日本 / どのぐらい / まだ', {
        q18b1: '日本', q18b2: 'どのぐらい', q18b3: 'まだ',
      }),
    ],
    correctOptionId: 'q18a',
    reviews: [
      review(L2, 'vocabulary', 'nihon'),
      review(L2, 'vocabulary', 'dono-gurai'),
      review(L2, 'vocabulary', 'sengetsu'),
    ],
    explanation: n(
      '生活 không phải nơi chốn nên không đi được với に来て. もう ở ô thứ hai không hỏi được "bao lâu". まだ không phải một mốc thời gian nên không lắp được vào "___、来ました".',
      '生活 is not a place, so it cannot take に来て. もう in the second blank cannot ask "how long". まだ is not a point in time, so it cannot fill "___、来ました".',
      '「生活」は場所ではないため「に来て」とは結びつきません。二つ目の空欄に「もう」を入れると期間をたずねられません。「まだ」は時点を表す言葉ではないため、「___、来ました」には入りません。',
    ),
  }),
];

export const JA_M01_U2_COMPREHENSIVE = {
  title: 'Bài tổng hợp Unit 2',
  titleByNative: n('Bài tổng hợp Unit 2', 'Unit 2 Comprehensive Test', '第2ユニット総合テスト'),
  description: 'Ôn lại toàn bộ Unit 2: chào người đã quen theo đúng vai vế, và đáp lời hỏi thăm đã ở Nhật bao lâu.',
  descriptionByNative: n(
    'Ôn lại toàn bộ Unit 2: chào người đã quen theo đúng vai vế, và đáp lời hỏi thăm đã ở Nhật bao lâu.',
    'Reviews all of Unit 2: greeting someone you already know at the right register, and answering how long you have been in Japan.',
    '第2ユニット全体の復習：立場に合ったあいさつと、日本にどのぐらいいるかへの答え方。',
  ),
  estimatedMinutes: '12',
  questions: [...SENTENCE_QUESTIONS, ...DIALOGUE_QUESTIONS],
};
