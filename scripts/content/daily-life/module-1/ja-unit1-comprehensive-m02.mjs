// Bài tổng hợp cuối Unit 1, Module 2 — Tiếng Nhật, Daily Life (ADR-022).
//
// Nguồn: TÁI DÙNG (G14-R3 bậc 1) từ vựng + mẫu ngữ pháp + câu đã duyệt của
// chính hai lesson trong unit (m02-u1-l1 "Cảm ơn theo mức độ", m02-u1-l2
// "Đáp khi được cảm ơn") — không mở nguồn ngoài. §G7 vùng A: mọi ô CHẤM ĐIỂM
// chỉ dùng vốn đã dạy trong hai bài này; reviews[] trỏ đúng lessonId + kind +
// ref. Cầu nối chủ đề tự nhiên giữa hai bài: L1 dạy CÁCH CẢM ƠN, L2 dạy CÁCH
// ĐÁP LẠI lời cảm ơn — nhiều câu hội thoại ở đây vì vậy trỏ tới CẢ HAI bài
// trong cùng một lượt trao đổi (một người cảm ơn bằng vốn L1, người kia đáp
// bằng vốn L2), đúng luồng thật của hai bài.
//
// CHỈ dùng THẺ TỪ VỰNG CHÍNH (`vocabulary[].id`) và `grammarPatterns[].title`
// làm mục `review()` — KHÔNG dùng `vocabularyReferences[]` (すみません／
// おかげさまで ở L1; こちらこそ／こちらこそよろしく／見つける／足元／はず／
// シャッター／ハチ公／もらえる ở L2): các mục đó không có `id` để review trỏ
// tới, và thuộc §G7 vùng B (từ lạ có chú nghĩa để ĐỌC HIỂU, không phải vốn
// vùng A để CHẤM ĐIỂM sản sinh). Các từ đó vẫn xuất hiện tự do trong `context`
// (tiếng Việt, không chấm điểm) và trong đoạn hội thoại cố định (`seg`, không
// phải ô trống) khi trích lại nguyên văn từ hai bài.
//
// 18 câu, hai mức — generator tự ép dải order và số ô (2 lesson →
// SECTION_PLANS[2], xem scripts/lib/unit-comprehensive-test.mjs):
//   Q1–6   sentence_multi_blank_choice · 2 ô · chọn 1/4
//   Q7–18  dialogue_multi_blank_choice · hội thoại 2–3 lượt · 3 ô · chọn 1/4
//
// Miễn cổng CÂN NGUỒN (KHÔNG miễn provenance — scope 'provenance' đã ĐÓNG cho
// m01, owner chốt 2026-07-30; bài này build sau mốc đó nên phải có provenance
// thật). Lý do miễn 'source-balance': nội dung 100% dẫn xuất từ_bài (from_lesson)
// hai lesson đã cân nguồn thật (m02-u1-l1 scope=source-balance, m02-u1-l2 đủ
// cân nguồn+scan.json) — không mở nguồn ngoài mới nên không có scan.json riêng
// cho ID này. Xem scripts/content/sources/provenance-exemptions.json.
//
// LOCALIZE: `resolveUnitComprehensiveTest` KHÔNG chạy qua `localizeSupport`
// (khác đường lesson), nên mọi chuỗi hỗ trợ ở đây tự mang `*ByNative` đủ
// vi/en/ja — không hard-code một ngôn ngữ vào chuỗi trần.

import { blank, blankSeg, choiceOption, dialogueTurn, review, seg } from '../../../lib/unit-comprehensive-helpers.mjs';

const L1 = 'ja-daily_life-m02-u1-l1';
const L2 = 'ja-daily_life-m02-u1-l2';

const ID = 'ja-daily_life-m02-u1-comprehensive';
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
      'Một người quen vừa giúp bạn NGAY BÂY GIỜ (việc đang xảy ra). Bạn cảm ơn thật lịch sự và nhấn mạnh.',
      'An acquaintance is helping you RIGHT NOW (still in progress). You thank them very politely and with emphasis.',
      '知り合いが今まさに手伝ってくれています（まだ終わっていません）。とても丁寧に、強調して感謝を伝えます。',
    ),
    segments: [blankSeg('q1b1'), blankSeg('q1b2'), seg('。')],
    blanks: [
      choiceBlank('q1b1', 'どうも', 'どうも'),
      choiceBlank('q1b2', 'ありがとうございます', 'ありがとうございます'),
    ],
    options: [
      choiceOption('q1a', 'どうも / ありがとうございます', { q1b1: 'どうも', q1b2: 'ありがとうございます' }),
      choiceOption('q1b', 'どうも / ありがとうございました', { q1b1: 'どうも', q1b2: 'ありがとうございました' }),
      choiceOption('q1c', 'どうも / ありがとう', { q1b1: 'どうも', q1b2: 'ありがとう' }),
      choiceOption('q1d', 'それなら / ありがとうございます', { q1b1: 'それなら', q1b2: 'ありがとうございます' }),
    ],
    correctOptionId: 'q1a',
    reviews: [review(L1, 'vocabulary', 'doumo'), review(L1, 'vocabulary', 'arigatou-gozaimasu')],
    explanation: n(
      'ありがとうございました là thì quá khứ, sai vì việc còn đang xảy ra. ありがとう là thể thân mật, lệch mức lịch sự đang cần. それなら là từ nối "nếu vậy thì" (học ở bài Đáp khi được cảm ơn) — không đứng được ở vị trí nhấn mạnh trước lời cảm ơn.',
      'ありがとうございました is past tense, wrong because the help is still ongoing. ありがとう is plain/casual form, mismatched with the politeness this situation needs. それなら is the connector "in that case" (from the Responding to Thanks lesson) — it cannot stand in the emphasis slot before a thank-you.',
      '「ありがとうございました」は過去形で、まだ終わっていないことには合いません。「ありがとう」は普通体で、必要な丁寧さに合いません。「それなら」（「お礼を言われたときの返事」のレッスンで学習）は「そういうことなら」という意味の接続語で、お礼を強調する位置には入りません。',
    ),
  }),

  question({
    order: 2,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Ai đó vừa giúp XONG một việc quan trọng cho bạn, tình huống cần lịch sự. Bạn cảm ơn và nói thêm rằng việc đó đã giúp ích cho bạn.',
      'Someone has just FINISHED helping you with something important, in a situation that calls for politeness. You thank them and add that it really helped you.',
      '誰かが大事な用事を丁寧な場面で手伝い終えたばかりです。お礼を言い、それが助かったと付け加えます。',
    ),
    segments: [blankSeg('q2b1'), seg('。'), blankSeg('q2b2'), seg('。')],
    blanks: [
      choiceBlank('q2b1', 'ありがとうございました', 'ありがとうございました'),
      choiceBlank('q2b2', '助かりました', 'たすかりました'),
    ],
    options: [
      choiceOption('q2a', 'ありがとうございました / 助かりました', { q2b1: 'ありがとうございました', q2b2: '助かりました' }),
      choiceOption('q2b', 'ありがとうございます / 助かりました', { q2b1: 'ありがとうございます', q2b2: '助かりました' }),
      choiceOption('q2c', 'ありがとうございました / 助かります', { q2b1: 'ありがとうございました', q2b2: '助かります' }),
      choiceOption('q2d', 'ありがとう / 助かりました', { q2b1: 'ありがとう', q2b2: '助かりました' }),
    ],
    correctOptionId: 'q2a',
    reviews: [review(L1, 'vocabulary', 'arigatou-gozaimashita'), review(L1, 'vocabulary', 'tasukarimashita')],
    explanation: n(
      'Việc ĐÃ xong nên cả hai câu phải cùng giữ thì quá khứ ました. ありがとうございます (b) và 助かります (c) đều là thì đang xảy ra, sai vì việc đã hoàn tất. ありがとう (d) là thể thân mật, lệch mức lịch sự.',
      'Since the help is already finished, both sentences must stay in the past ました form. ありがとうございます (b) and 助かります (c) are both present/ongoing tense, wrong because it is already done. ありがとう (d) is plain/casual, mismatched with the politeness needed.',
      'すでに終わったことなので、両方とも過去形「ました」を保つ必要があります。「ありがとうございます」(b)と「助かります」(c)はどちらも現在形で、すでに終わったこととは合いません。「ありがとう」(d)は普通体で、必要な丁寧さに合いません。',
    ),
  }),

  question({
    order: 3,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Một người bạn thân vừa giúp bạn một việc nhỏ. Thân mật.',
      'A close friend has just helped you with a small favor. Casual/close.',
      '親しい友だちがちょっとした用事を手伝ってくれたばかりです。気軽な間柄です。',
    ),
    segments: [seg('あ、'), blankSeg('q3b1'), seg('。'), blankSeg('q3b2'), seg('。')],
    blanks: [
      choiceBlank('q3b1', 'どうも', 'どうも'),
      choiceBlank('q3b2', 'ありがとう', 'ありがとう'),
    ],
    options: [
      choiceOption('q3a', 'どうも / ありがとう', { q3b1: 'どうも', q3b2: 'ありがとう' }),
      choiceOption('q3b', 'どうもありがとうございます / ありがとう', { q3b1: 'どうもありがとうございます', q3b2: 'ありがとう' }),
      choiceOption('q3c', 'どうも / ありがとうございます', { q3b1: 'どうも', q3b2: 'ありがとうございます' }),
      choiceOption('q3d', 'それなら / ありがとう', { q3b1: 'それなら', q3b2: 'ありがとう' }),
    ],
    correctOptionId: 'q3a',
    reviews: [review(L1, 'vocabulary', 'doumo'), review(L1, 'vocabulary', 'arigatou')],
    explanation: n(
      'どうもありがとうございます (b) là cụm lịch sự nhấn mạnh, lệch với bạn thân đang dùng thể thường. ありがとうございます (c) cũng là thể lịch sự. それなら (d) là từ nối "nếu vậy thì", không hợp vị trí một lời cảm ơn ngắn.',
      'どうもありがとうございます (b) is the emphasized polite phrase, mismatched with a close friend using plain form. ありがとうございます (c) is likewise polite. それなら (d) is the connector "in that case" and does not fit the slot for a short thank-you.',
      '「どうもありがとうございます」(b)は強調した丁寧な言い方で、普通体で話す親しい友だちには合いません。「ありがとうございます」(c)も丁寧体です。「それなら」(d)は「そういうことなら」という接続語で、短いお礼の位置には入りません。',
    ),
  }),

  question({
    order: 4,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Đồng nghiệp chưa thân vừa cảm ơn bạn vì một việc bình thường. Bạn đáp lại lịch sự, rồi nói thêm rằng bạn vui vì đã giúp được.',
      'A not-yet-close colleague has just thanked you for something ordinary. You reply politely, then add that you are glad you could help.',
      'まだ親しくない同僚が普通のことでお礼を言ってくれました。丁寧に返事をし、役に立ててよかったと付け加えます。',
    ),
    segments: [blankSeg('q4b1'), seg('。'), blankSeg('q4b2'), seg('。')],
    blanks: [
      choiceBlank('q4b1', 'どういたしまして', 'どういたしまして'),
      choiceBlank('q4b2', 'お役に立てて良かったです', 'おやくにたててよかったです'),
    ],
    options: [
      choiceOption('q4a', 'どういたしまして / お役に立てて良かったです', { q4b1: 'どういたしまして', q4b2: 'お役に立てて良かったです' }),
      choiceOption('q4b', 'いえいえ / お役に立てて良かったです', { q4b1: 'いえいえ', q4b2: 'お役に立てて良かったです' }),
      choiceOption('q4c', 'どういたしまして / 気にしないでください', { q4b1: 'どういたしまして', q4b2: '気にしないでください' }),
      choiceOption('q4d', 'とんでもございません / お役に立てて良かったです', { q4b1: 'とんでもございません', q4b2: 'お役に立てて良かったです' }),
    ],
    correctOptionId: 'q4a',
    reviews: [review(L2, 'vocabulary', 'douitashimashite'), review(L2, 'vocabulary', 'oyakunitatete')],
    explanation: n(
      'いえいえ (b) là thể thân mật, lệch với đồng nghiệp chưa thân. 気にしないでください (c) dùng khi có phiền phức cụ thể, không phải câu đáp chung cho lời cảm ơn. とんでもございません (d) dùng để khiêm tốn từ chối lời KHEN, không phải đáp một lời cảm ơn bình thường.',
      'いえいえ (b) is casual, mismatched with a not-yet-close colleague. 気にしないでください (c) is for a specific inconvenience, not a general reply to thanks. とんでもございません (d) humbly deflects a COMPLIMENT, not an ordinary thank-you.',
      '「いえいえ」(b)は気軽な言い方で、まだ親しくない同僚には合いません。「気にしないでください」(c)は具体的な迷惑があったときに使うもので、お礼への一般的な返事ではありません。「とんでもございません」(d)は褒め言葉を謙遜して断るときに使うもので、普通のお礼への返事ではありません。',
    ),
  }),

  question({
    order: 5,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Ai đó vừa khen bạn, tình huống lịch sự. Bạn khiêm tốn từ chối lời khen, rồi trấn an rằng đừng bận tâm.',
      'Someone has just complimented you, a polite situation. You humbly deflect the compliment, then reassure them not to worry about it.',
      '誰かに丁寧な場面で褒められました。謙遜して褒め言葉を断り、気にしないでほしいと伝えます。',
    ),
    segments: [blankSeg('q5b1'), seg('。'), blankSeg('q5b2'), seg('。')],
    blanks: [
      choiceBlank('q5b1', 'とんでもございません', 'とんでもございません'),
      choiceBlank('q5b2', '気にしないでください', 'きにしないでください'),
    ],
    options: [
      choiceOption('q5a', 'とんでもございません / 気にしないでください', { q5b1: 'とんでもございません', q5b2: '気にしないでください' }),
      choiceOption('q5b', 'とんでもない / 気にしないでください', { q5b1: 'とんでもない', q5b2: '気にしないでください' }),
      choiceOption('q5c', 'とんでもございません / お役に立てて良かったです', { q5b1: 'とんでもございません', q5b2: 'お役に立てて良かったです' }),
      choiceOption('q5d', 'どういたしまして / 気にしないでください', { q5b1: 'どういたしまして', q5b2: '気にしないでください' }),
    ],
    correctOptionId: 'q5a',
    reviews: [review(L2, 'vocabulary', 'tondemogozaimasen'), review(L2, 'vocabulary', 'kininaide')],
    explanation: n(
      'とんでもない (b) là thể thân mật, lệch mức lịch sự cần có. お役に立てて良かったです (c) là câu MÌNH nói khi MÌNH vừa giúp được, không hợp khi đang được khen. どういたしまして (d) đáp lại lời CẢM ƠN, không phải lời KHEN.',
      'とんでもない (b) is casual, mismatched with the politeness needed. お役に立てて良かったです (c) is said by the person who just helped, not by someone deflecting a compliment. どういたしまして (d) replies to THANKS, not to a COMPLIMENT.',
      '「とんでもない」(b)は普通体で、必要な丁寧さに合いません。「お役に立てて良かったです」(c)は自分が手伝ったときに言う言葉で、褒められたときには合いません。「どういたしまして」(d)は「お礼」への返事であり、「褒め言葉」への返事ではありません。',
    ),
  }),

  question({
    order: 6,
    kind: 'sentence_multi_blank_choice',
    prompt: PROMPT_SENTENCE,
    context: n(
      'Bạn nghe nói bạn học vừa làm rơi đồ trong lớp. Bạn nói "nếu vậy thì" và đề nghị cùng tìm giúp — lịch sự vì hai người chưa thân.',
      'You hear that a classmate just dropped something in the classroom. You say "in that case" and offer to help look — politely, since the two of you are not close.',
      'クラスメートが教室で物を落としたと聞きました。「それなら」と言い、丁寧に一緒に探すと申し出ます。まだ親しくないので丁寧体です。',
    ),
    segments: [blankSeg('q6b1'), seg('、近くにあるはずですね。私も'), blankSeg('q6b2'), seg('。')],
    blanks: [
      choiceBlank('q6b1', 'それなら', 'それなら'),
      choiceBlank('q6b2', '探します', 'さがします'),
    ],
    options: [
      choiceOption('q6a', 'それなら / 探します', { q6b1: 'それなら', q6b2: '探します' }),
      choiceOption('q6b', 'それなら / 探す', { q6b1: 'それなら', q6b2: '探す' }),
      choiceOption('q6c', 'それなら / 探した', { q6b1: 'それなら', q6b2: '探した' }),
      choiceOption('q6d', '感じ / 探します', { q6b1: '感じ', q6b2: '探します' }),
    ],
    correctOptionId: 'q6a',
    reviews: [review(L2, 'vocabulary', 'sorenara'), review(L2, 'vocabulary', 'sagasu')],
    explanation: n(
      '探す (b) là dạng từ điển, thể thân mật, lệch mức lịch sự cần có với người chưa thân. 探した (c) là thì quá khứ, sai vì việc tìm còn CHƯA xảy ra. 感じ (d) là danh từ khác đã dạy trong bài (nghĩa "cảm giác, kiểu"), không đứng được ở vị trí liên từ đầu câu.',
      '探す (b) is the dictionary/plain form, mismatched with the politeness needed for someone not yet close. 探した (c) is past tense, wrong because the search has not happened yet. 感じ (d) is another taught word (meaning "a feeling/style") and cannot stand in the connector slot at the start of the sentence.',
      '「探す」(b)は辞書形・普通体で、まだ親しくない相手に必要な丁寧さに合いません。「探した」(c)は過去形で、まだ探していないことには合いません。「感じ」(d)はレッスンで学んだ別の単語（「感覚・様子」という意味）で、文頭の接続語の位置には入りません。',
    ),
  }),
];

/* ══ MỨC 2 — Q7–Q18 · dialogue_multi_blank_choice · 3 ô ═══════════════════ */

const DIALOGUE_QUESTIONS = [
  // Q7 — L1 (どうもありがとうございます, nhấn mạnh) + L2 (どういたしまして/お役に立てて良かったです).
  question({
    order: 7,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai bạn học cùng lớp, chưa thân — cả hai giữ thể lịch sự. 伊藤 vừa giúp 佐藤 tìm được cục tẩy bị rơi.',
      'Roles: two classmates, not yet close — both keep polite form. Itō has just helped Satō find a dropped eraser.',
      '関係：クラスメート同士で、まだ親しくありません。二人とも丁寧体を保ちます。伊藤さんは佐藤さんが落とした消しゴムを見つけたところです。',
    ),
    dialogue: [
      dialogueTurn('q7t1', 'ito', [seg('あ、見つけました。私の足元にありましたよ。')]),
      dialogueTurn('q7t2', 'sato', [blankSeg('q7b1'), seg('。')]),
      dialogueTurn('q7t3', 'ito', [blankSeg('q7b2'), seg('。'), blankSeg('q7b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q7b1', 'どうもありがとうございます', 'どうもありがとうございます'),
      choiceBlank('q7b2', 'どういたしまして', 'どういたしまして'),
      choiceBlank('q7b3', 'お役に立てて良かったです', 'おやくにたててよかったです'),
    ],
    options: [
      choiceOption('q7a', 'どうもありがとうございます / どういたしまして / お役に立てて良かったです', {
        q7b1: 'どうもありがとうございます', q7b2: 'どういたしまして', q7b3: 'お役に立てて良かったです',
      }),
      choiceOption('q7b', 'ありがとう / どういたしまして / お役に立てて良かったです', {
        q7b1: 'ありがとう', q7b2: 'どういたしまして', q7b3: 'お役に立てて良かったです',
      }),
      choiceOption('q7c', 'どうもありがとうございます / いえいえ / お役に立てて良かったです', {
        q7b1: 'どうもありがとうございます', q7b2: 'いえいえ', q7b3: 'お役に立てて良かったです',
      }),
      choiceOption('q7d', 'どうもありがとうございます / どういたしまして / 気にしないでください', {
        q7b1: 'どうもありがとうございます', q7b2: 'どういたしまして', q7b3: '気にしないでください',
      }),
    ],
    correctOptionId: 'q7a',
    reviews: [
      review(L1, 'vocabulary', 'doumo-arigatou-gozaimasu'),
      review(L2, 'vocabulary', 'douitashimashite'),
      review(L2, 'vocabulary', 'oyakunitatete'),
    ],
    explanation: n(
      'ありがとう (b) là thể thân mật, lệch với hai bạn học chưa thân đang giữ thể lịch sự. いえいえ (c) cũng là thể thân mật. 気にしないでください (d) dùng khi có phiền phức cụ thể, không phải câu tiếp nối sau khi vừa giúp xong.',
      'ありがとう (b) is casual, mismatched with two not-yet-close classmates keeping polite form. いえいえ (c) is likewise casual. 気にしないでください (d) is for a specific inconvenience, not a natural follow-up after just having helped.',
      '「ありがとう」(b)は普通体で、丁寧体を保つまだ親しくないクラスメートには合いません。「いえいえ」(c)も普通体です。「気にしないでください」(d)は具体的な迷惑があったときに使うもので、手伝った直後の言葉としては合いません。',
    ),
  }),

  // Q8 — L1 (ありがとうございます, đang xảy ra) + L2 (どういたしまして/お役に立てて良かったです).
  question({
    order: 8,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: khách và nhân viên khách sạn, chưa quen biết — cả hai giữ thể lịch sự. Nhân viên đang tìm bản đồ giúp khách NGAY LÚC NÀY (việc chưa xong).',
      'Roles: a guest and a hotel staff member, strangers — both keep polite form. The staff member is fetching a map for the guest RIGHT NOW (not yet finished).',
      '関係：ホテルの客と従業員で、初対面です。二人とも丁寧体を保ちます。従業員は今まさに客のために地図を探しています（まだ終わっていません）。',
    ),
    dialogue: [
      dialogueTurn('q8t1', 'ito', [seg('今、地図をお持ちしますね。')]),
      dialogueTurn('q8t2', 'sato', [blankSeg('q8b1'), seg('。')]),
      dialogueTurn('q8t3', 'ito', [blankSeg('q8b2'), seg('。'), blankSeg('q8b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q8b1', 'ありがとうございます', 'ありがとうございます'),
      choiceBlank('q8b2', 'どういたしまして', 'どういたしまして'),
      choiceBlank('q8b3', 'お役に立てて良かったです', 'おやくにたててよかったです'),
    ],
    options: [
      choiceOption('q8a', 'ありがとうございます / どういたしまして / お役に立てて良かったです', {
        q8b1: 'ありがとうございます', q8b2: 'どういたしまして', q8b3: 'お役に立てて良かったです',
      }),
      choiceOption('q8b', 'ありがとうございました / どういたしまして / お役に立てて良かったです', {
        q8b1: 'ありがとうございました', q8b2: 'どういたしまして', q8b3: 'お役に立てて良かったです',
      }),
      choiceOption('q8c', 'ありがとうございます / いえいえ / お役に立てて良かったです', {
        q8b1: 'ありがとうございます', q8b2: 'いえいえ', q8b3: 'お役に立てて良かったです',
      }),
      choiceOption('q8d', 'ありがとうございます / どういたしまして / 気にしないでください', {
        q8b1: 'ありがとうございます', q8b2: 'どういたしまして', q8b3: '気にしないでください',
      }),
    ],
    correctOptionId: 'q8a',
    reviews: [
      review(L1, 'vocabulary', 'arigatou-gozaimasu'),
      review(L2, 'vocabulary', 'douitashimashite'),
      review(L2, 'vocabulary', 'oyakunitatete'),
    ],
    explanation: n(
      'ありがとうございました (b) là thì quá khứ, sai vì nhân viên còn đang đi lấy bản đồ, việc chưa xong. いえいえ (c) là thể thân mật, lệch với quan hệ khách – nhân viên. 気にしないでください (d) dùng khi có phiền phức cụ thể, không hợp làm câu đáp ở đây.',
      'ありがとうございました (b) is past tense, wrong because the staff member is still fetching the map — it is not done yet. いえいえ (c) is casual, mismatched with a guest–staff relationship. 気にしないでください (d) is for a specific inconvenience, not a fitting reply here.',
      '「ありがとうございました」(b)は過去形で、従業員がまだ地図を取りに行っている最中（未完了）なので合いません。「いえいえ」(c)は普通体で、客と従業員の関係には合いません。「気にしないでください」(d)は具体的な迷惑があったときに使うもので、ここでの返事には合いません。',
    ),
  }),

  // Q9 — L1 (ありがとう, thân mật của khách) + L2 (どういたしまして, lịch sự của nhân viên) + L2 (お役に立てて良かったです).
  question({
    order: 9,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: khách hàng và nhân viên cửa hàng. Nhân viên luôn giữ thể lịch sự vì tính chất công việc; khách hàng có thể đáp lại bằng thể thân mật.',
      'Roles: a customer and a shop employee. The employee always keeps polite form due to the nature of the job; the customer may reply casually.',
      '関係：客と店員です。店員は仕事の性質上、常に丁寧体を保ちます。客は気軽な言い方で返してもかまいません。',
    ),
    dialogue: [
      dialogueTurn('q9t1', 'tanaka', [seg('かしこまりました。こちらになります。')]),
      dialogueTurn('q9t2', 'sato', [blankSeg('q9b1'), seg('。')]),
      dialogueTurn('q9t3', 'tanaka', [blankSeg('q9b2'), seg('。'), blankSeg('q9b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q9b1', 'ありがとう', 'ありがとう'),
      choiceBlank('q9b2', 'どういたしまして', 'どういたしまして'),
      choiceBlank('q9b3', 'お役に立てて良かったです', 'おやくにたててよかったです'),
    ],
    options: [
      choiceOption('q9a', 'ありがとう / どういたしまして / お役に立てて良かったです', {
        q9b1: 'ありがとう', q9b2: 'どういたしまして', q9b3: 'お役に立てて良かったです',
      }),
      choiceOption('q9b', 'ありがとうございます / どういたしまして / お役に立てて良かったです', {
        q9b1: 'ありがとうございます', q9b2: 'どういたしまして', q9b3: 'お役に立てて良かったです',
      }),
      choiceOption('q9c', 'ありがとう / いえいえ / お役に立てて良かったです', {
        q9b1: 'ありがとう', q9b2: 'いえいえ', q9b3: 'お役に立てて良かったです',
      }),
      choiceOption('q9d', 'ありがとう / どういたしまして / 気にしないでください', {
        q9b1: 'ありがとう', q9b2: 'どういたしまして', q9b3: '気にしないでください',
      }),
    ],
    correctOptionId: 'q9a',
    reviews: [
      review(L1, 'vocabulary', 'arigatou'),
      review(L2, 'vocabulary', 'douitashimashite'),
      review(L2, 'vocabulary', 'oyakunitatete'),
    ],
    explanation: n(
      'ありがとうございます (b) không sai ngữ pháp nhưng lệch với vai vế khách hàng đã thiết lập (được phép thân mật). いえいえ (c) là thể thân mật, lệch với nhân viên luôn giữ lịch sự vì công việc. 気にしないでください (d) dùng khi có phiền phức cụ thể.',
      'ありがとうございます (b) is not ungrammatical, but it clashes with the customer role already established (allowed to be casual). いえいえ (c) is casual, mismatched with the employee who always stays polite for work. 気にしないでください (d) is for a specific inconvenience.',
      '「ありがとうございます」(b)は文法的には誤りではありませんが、すでに設定された客の立場（気軽でよい）と合いません。「いえいえ」(c)は普通体で、仕事上常に丁寧な店員には合いません。「気にしないでください」(d)は具体的な迷惑があったときに使う言葉です。',
    ),
  }),

  // Q10 — L1 (ありがとうございました/助かりました, đã xong) + L2 (どういたしまして).
  question({
    order: 10,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai người ngang vai trong chuyến du lịch, giữ thể lịch sự. 佐藤 vừa chụp ảnh xong giúp 田中.',
      'Roles: two travel companions of equal standing, keeping polite form. Satō has just finished taking a photo for Tanaka.',
      '関係：旅行中の対等な二人で、丁寧体を保ちます。佐藤さんは田中さんのために写真を撮り終えたところです。',
    ),
    dialogue: [
      dialogueTurn('q10t1', 'sato', [seg('右上ですね。では撮りますよ。このような感じでどうですか？')]),
      dialogueTurn('q10t2', 'tanaka', [seg('はい、'), blankSeg('q10b1'), seg('。'), blankSeg('q10b2'), seg('。')]),
      dialogueTurn('q10t3', 'sato', [blankSeg('q10b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q10b1', 'ありがとうございました', 'ありがとうございました'),
      choiceBlank('q10b2', '助かりました', 'たすかりました'),
      choiceBlank('q10b3', 'どういたしまして', 'どういたしまして'),
    ],
    options: [
      choiceOption('q10a', 'ありがとうございました / 助かりました / どういたしまして', {
        q10b1: 'ありがとうございました', q10b2: '助かりました', q10b3: 'どういたしまして',
      }),
      choiceOption('q10b', 'ありがとうございます / 助かりました / どういたしまして', {
        q10b1: 'ありがとうございます', q10b2: '助かりました', q10b3: 'どういたしまして',
      }),
      choiceOption('q10c', 'ありがとうございました / 助かります / どういたしまして', {
        q10b1: 'ありがとうございました', q10b2: '助かります', q10b3: 'どういたしまして',
      }),
      choiceOption('q10d', 'ありがとうございました / 助かりました / いえいえ', {
        q10b1: 'ありがとうございました', q10b2: '助かりました', q10b3: 'いえいえ',
      }),
    ],
    correctOptionId: 'q10a',
    reviews: [
      review(L1, 'vocabulary', 'arigatou-gozaimashita'),
      review(L1, 'vocabulary', 'tasukarimashita'),
      review(L2, 'vocabulary', 'douitashimashite'),
    ],
    explanation: n(
      'ありがとうございます (b) và 助かります (c) đều là thì đang xảy ra, sai vì ảnh đã chụp XONG. いえいえ (d) là thể thân mật — hai người "chưa đủ thân để chuyển sang thể thường" (vai vế đã thiết lập ở dialogueGroup này).',
      'ありがとうございます (b) and 助かります (c) are both present/ongoing tense, wrong because the photo is already DONE. いえいえ (d) is casual — the two are "not yet close enough to switch to plain form" (the register established for this scene).',
      '「ありがとうございます」(b)と「助かります」(c)はどちらも現在形で、写真はすでに撮り終わっているので合いません。「いえいえ」(d)は普通体ですが、この場面で設定された二人の関係は「まだ普通体に切り替えるほど親しくない」というものです。',
    ),
  }),

  // Q11 — L1 (どうもありがとうございます, nhấn mạnh) → L2 (とんでもございません, khiêm tốn) + L2 (お役に立てて良かったです).
  question({
    order: 11,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: như đã thiết lập ở bài trước — 伊藤 và 佐藤 là bạn học cùng lớp, chưa thân, giữ thể lịch sự. 佐藤 cảm ơn 伊藤 thật nhiều vì đã giúp đỡ — lời cảm ơn có vẻ hơi quá lời.',
      'Roles: as established before — Itō and Satō are classmates, not yet close, keeping polite form. Satō thanks Itō profusely for the help — the thanks sounds a bit over the top.',
      '関係：以前と同じ設定です。伊藤さんと佐藤さんはクラスメートで、まだ親しくなく、丁寧体を保ちます。佐藤さんは伊藤さんの手伝いに何度もお礼を言い、少し大げさに聞こえます。',
    ),
    dialogue: [
      dialogueTurn('q11t1', 'sato', [blankSeg('q11b1'), seg('。')]),
      dialogueTurn('q11t2', 'ito', [blankSeg('q11b2'), seg('。'), blankSeg('q11b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q11b1', 'どうもありがとうございます', 'どうもありがとうございます'),
      choiceBlank('q11b2', 'とんでもございません', 'とんでもございません'),
      choiceBlank('q11b3', 'お役に立てて良かったです', 'おやくにたててよかったです'),
    ],
    options: [
      choiceOption('q11a', 'どうもありがとうございます / とんでもございません / お役に立てて良かったです', {
        q11b1: 'どうもありがとうございます', q11b2: 'とんでもございません', q11b3: 'お役に立てて良かったです',
      }),
      choiceOption('q11b', 'どうもありがとうございます / とんでもない / お役に立てて良かったです', {
        q11b1: 'どうもありがとうございます', q11b2: 'とんでもない', q11b3: 'お役に立てて良かったです',
      }),
      choiceOption('q11c', 'ありがとう / とんでもございません / お役に立てて良かったです', {
        q11b1: 'ありがとう', q11b2: 'とんでもございません', q11b3: 'お役に立てて良かったです',
      }),
      choiceOption('q11d', 'どうもありがとうございます / とんでもございません / どういたしまして', {
        q11b1: 'どうもありがとうございます', q11b2: 'とんでもございません', q11b3: 'どういたしまして',
      }),
    ],
    correctOptionId: 'q11a',
    reviews: [
      review(L1, 'vocabulary', 'doumo-arigatou-gozaimasu'),
      review(L2, 'vocabulary', 'tondemogozaimasen'),
      review(L2, 'vocabulary', 'oyakunitatete'),
    ],
    explanation: n(
      'とんでもない (b) là thể thân mật, lệch với hai người chưa thân đang giữ lịch sự. ありがとう (c) là thể thân mật, cùng lý do. どういたしまして (d) đáp lại lời cảm ơn thường, không hợp làm câu tiếp sau lời từ chối một lời cảm ơn quá lời — お役に立てて良かったです mới đúng ý "thêm rằng mình vui vì giúp được".',
      'とんでもない (b) is casual, mismatched with two not-yet-close people keeping polite form. ありがとう (c) is casual for the same reason. どういたしまして (d) replies to an ordinary thank-you and does not fit as the follow-up after deflecting an over-the-top one — お役に立てて良かったです is the one that actually adds "glad I could help".',
      '「とんでもない」(b)は普通体で、丁寧体を保つまだ親しくない二人には合いません。「ありがとう」(c)も同じ理由で普通体です。「どういたしまして」(d)は普通のお礼への返事で、大げさなお礼を謙遜して断った後に続く言葉としては合いません——「お役に立てて良かったです」こそ「役に立ててうれしい」という意味を付け加えます。',
    ),
  }),

  // Q12 — L1 (どうも, thân mật của khách) → L2 (とんでもございません, nhân viên giữ lịch sự) + L2 (お役に立てて良かったです).
  question({
    order: 12,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: như đã thiết lập ở bài trước — khách hàng và nhân viên cửa hàng. Khách hàng khen ngợi nhân viên nhiệt tình, thân mật; nhân viên vẫn giữ thể lịch sự vì công việc.',
      'Roles: as before — a customer and a shop employee. The customer casually praises how attentive the employee was; the employee still keeps polite form for work.',
      '関係：以前と同じく、客と店員です。客は気軽な調子で店員の対応を褒めます。店員は仕事上、丁寧体を保ちます。',
    ),
    dialogue: [
      dialogueTurn('q12t1', 'sato', [seg('あ、'), blankSeg('q12b1'), seg('。')]),
      dialogueTurn('q12t2', 'tanaka', [blankSeg('q12b2'), seg('。'), blankSeg('q12b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q12b1', 'どうも', 'どうも'),
      choiceBlank('q12b2', 'とんでもございません', 'とんでもございません'),
      choiceBlank('q12b3', 'お役に立てて良かったです', 'おやくにたててよかったです'),
    ],
    options: [
      choiceOption('q12a', 'どうも / とんでもございません / お役に立てて良かったです', {
        q12b1: 'どうも', q12b2: 'とんでもございません', q12b3: 'お役に立てて良かったです',
      }),
      choiceOption('q12b', 'どうも / とんでもない / お役に立てて良かったです', {
        q12b1: 'どうも', q12b2: 'とんでもない', q12b3: 'お役に立てて良かったです',
      }),
      choiceOption('q12c', 'ありがとうございます / とんでもございません / お役に立てて良かったです', {
        q12b1: 'ありがとうございます', q12b2: 'とんでもございません', q12b3: 'お役に立てて良かったです',
      }),
      choiceOption('q12d', 'どうも / とんでもございません / 気にしないでください', {
        q12b1: 'どうも', q12b2: 'とんでもございません', q12b3: '気にしないでください',
      }),
    ],
    correctOptionId: 'q12a',
    reviews: [
      review(L1, 'vocabulary', 'doumo'),
      review(L2, 'vocabulary', 'tondemogozaimasen'),
      review(L2, 'vocabulary', 'oyakunitatete'),
    ],
    explanation: n(
      'とんでもない (b) là thể thân mật — nhân viên phải giữ lịch sự dù khách thân mật, đổi sang とんでもない làm mất vai vế công việc. ありがとうございます (c) không sai ngữ pháp nhưng lệch với vai vế khách hàng đã thiết lập (được phép thân mật). 気にしないでください (d) dùng khi có phiền phức cụ thể, không phải lời khen.',
      'とんでもない (b) is casual — the employee must stay polite even when the customer is casual, so switching to とんでもない breaks the work register. ありがとうございます (c) is not ungrammatical, but it clashes with the customer role already established (allowed to be casual). 気にしないでください (d) is for a specific inconvenience, not a compliment.',
      '「とんでもない」(b)は普通体です——客が気軽でも店員は丁寧さを保つ必要があり、「とんでもない」に変えると仕事上の立場が崩れます。「ありがとうございます」(c)は文法的には誤りではありませんが、すでに設定された客の立場（気軽でよい）と合いません。「気にしないでください」(d)は具体的な迷惑があったときに使うもので、褒め言葉には合いません。',
    ),
  }),

  // Q13 — L2 (それなら/探します, tiếp nối cảnh làm rơi đồ) → L1 (どうもありがとうございます).
  question({
    order: 13,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: 伊藤 và 佐藤, bạn học cùng lớp chưa thân, giữ thể lịch sự. 佐藤 vừa làm rơi một thứ trong lớp.',
      'Roles: Itō and Satō, classmates not yet close, keeping polite form. Satō has just dropped something in the classroom.',
      '関係：伊藤さんと佐藤さんはクラスメートで、まだ親しくなく、丁寧体を保ちます。佐藤さんは教室で何かを落としたところです。',
    ),
    dialogue: [
      dialogueTurn('q13t1', 'sato', [seg('すみません。')]),
      dialogueTurn('q13t2', 'ito', [blankSeg('q13b1'), seg('、近くにあるはずですね。私も'), blankSeg('q13b2'), seg('。')]),
      dialogueTurn('q13t3', 'sato', [blankSeg('q13b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q13b1', 'それなら', 'それなら'),
      choiceBlank('q13b2', '探します', 'さがします'),
      choiceBlank('q13b3', 'どうもありがとうございます', 'どうもありがとうございます'),
    ],
    options: [
      choiceOption('q13a', 'それなら / 探します / どうもありがとうございます', {
        q13b1: 'それなら', q13b2: '探します', q13b3: 'どうもありがとうございます',
      }),
      choiceOption('q13b', 'それなら / 探す / どうもありがとうございます', {
        q13b1: 'それなら', q13b2: '探す', q13b3: 'どうもありがとうございます',
      }),
      choiceOption('q13c', '感じ / 探します / どうもありがとうございます', {
        q13b1: '感じ', q13b2: '探します', q13b3: 'どうもありがとうございます',
      }),
      choiceOption('q13d', 'それなら / 探します / ありがとう', {
        q13b1: 'それなら', q13b2: '探します', q13b3: 'ありがとう',
      }),
    ],
    correctOptionId: 'q13a',
    reviews: [
      review(L2, 'vocabulary', 'sorenara'),
      review(L2, 'vocabulary', 'sagasu'),
      review(L1, 'vocabulary', 'doumo-arigatou-gozaimasu'),
    ],
    explanation: n(
      '探す (b) là dạng từ điển, thể thân mật, lệch với hai người chưa thân đang giữ lịch sự. 感じ (c) là danh từ khác đã dạy trong bài, không hợp vị trí liên từ đầu câu. ありがとう (d) là thể thân mật, lệch mức lịch sự.',
      '探す (b) is the dictionary/plain form, mismatched with two not-yet-close people keeping polite form. 感じ (c) is another taught word and does not fit the connector slot at the start. ありがとう (d) is casual, mismatched with the politeness needed.',
      '「探す」(b)は辞書形・普通体で、丁寧体を保つまだ親しくない二人には合いません。「感じ」(c)はレッスンで学んだ別の単語で、文頭の接続語の位置には入りません。「ありがとう」(d)は普通体で、必要な丁寧さに合いません。',
    ),
  }),

  // Q14 — L2 (感じ, tiếp nối cảnh chụp ảnh) + L1 (ありがとうございました) + L2 (どういたしまして).
  question({
    order: 14,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: như đã thiết lập ở bài trước — hai người ngang vai trong chuyến du lịch, giữ thể lịch sự. 佐藤 đang chụp ảnh giúp 田中.',
      'Roles: as before — two travel companions of equal standing, keeping polite form. Satō is taking a photo for Tanaka.',
      '関係：以前と同じく、旅行中の対等な二人で、丁寧体を保ちます。佐藤さんは田中さんのために写真を撮っています。',
    ),
    dialogue: [
      dialogueTurn('q14t1', 'sato', [seg('右上ですね。では撮りますよ。このような'), blankSeg('q14b1'), seg('でどうですか？')]),
      dialogueTurn('q14t2', 'tanaka', [seg('はい、'), blankSeg('q14b2'), seg('。')]),
      dialogueTurn('q14t3', 'sato', [blankSeg('q14b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q14b1', '感じ', 'かんじ'),
      choiceBlank('q14b2', 'ありがとうございました', 'ありがとうございました'),
      choiceBlank('q14b3', 'どういたしまして', 'どういたしまして'),
    ],
    options: [
      choiceOption('q14a', '感じ / ありがとうございました / どういたしまして', {
        q14b1: '感じ', q14b2: 'ありがとうございました', q14b3: 'どういたしまして',
      }),
      choiceOption('q14b', 'お世話 / ありがとうございました / どういたしまして', {
        q14b1: 'お世話', q14b2: 'ありがとうございました', q14b3: 'どういたしまして',
      }),
      choiceOption('q14c', '感じ / ありがとうございます / どういたしまして', {
        q14b1: '感じ', q14b2: 'ありがとうございます', q14b3: 'どういたしまして',
      }),
      choiceOption('q14d', '感じ / ありがとうございました / いえいえ', {
        q14b1: '感じ', q14b2: 'ありがとうございました', q14b3: 'いえいえ',
      }),
    ],
    correctOptionId: 'q14a',
    reviews: [
      review(L2, 'vocabulary', 'kanji'),
      review(L1, 'vocabulary', 'arigatou-gozaimashita'),
      review(L2, 'vocabulary', 'douitashimashite'),
    ],
    explanation: n(
      'お世話 (b) là danh từ khác đã dạy trong bài (nghĩa "sự giúp đỡ"), không hợp nghĩa "kiểu/dáng vẻ chụp ảnh". ありがとうございます (c) là thì đang xảy ra, sai vì ảnh đã chụp XONG. いえいえ (d) là thể thân mật, lệch vai vế lịch sự đã thiết lập.',
      'お世話 (b) is another taught noun (meaning "help/care") and does not fit the meaning "a look/style" for the photo. ありがとうございます (c) is present/ongoing tense, wrong because the photo is already DONE. いえいえ (d) is casual, mismatched with the polite register already established.',
      '「お世話」(b)はレッスンで学んだ別の名詞（「助け・世話」という意味）で、写真の「様子・感じ」という意味には合いません。「ありがとうございます」(c)は現在形で、写真はすでに撮り終わっているので合いません。「いえいえ」(d)は普通体で、すでに設定された丁寧な関係に合いません。',
    ),
  }),

  // Q15 — L2 (気にしないでください) + L1 (どうもありがとうございます/助かりました).
  question({
    order: 15,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: 田中 và 佐藤, giữ thể lịch sự. 田中 lỡ làm phiền 佐藤 một chút. 佐藤 trấn an đừng bận tâm, 田中 cảm ơn và nói thêm rằng việc đó đã giúp ích.',
      'Roles: Tanaka and Satō, keeping polite form. Tanaka has slightly inconvenienced Satō. Satō reassures them not to worry, and Tanaka thanks them and adds that it really helped.',
      '関係：田中さんと佐藤さんは丁寧体を保ちます。田中さんが佐藤さんに少し迷惑をかけました。佐藤さんは気にしないでほしいと伝え、田中さんはお礼を言い、助かったと付け加えます。',
    ),
    dialogue: [
      dialogueTurn('q15t1', 'tanaka', [seg('すみません。')]),
      dialogueTurn('q15t2', 'sato', [blankSeg('q15b1'), seg('。')]),
      dialogueTurn('q15t3', 'tanaka', [blankSeg('q15b2'), seg('。'), blankSeg('q15b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q15b1', '気にしないでください', 'きにしないでください'),
      choiceBlank('q15b2', 'どうもありがとうございます', 'どうもありがとうございます'),
      choiceBlank('q15b3', '助かりました', 'たすかりました'),
    ],
    options: [
      choiceOption('q15a', '気にしないでください / どうもありがとうございます / 助かりました', {
        q15b1: '気にしないでください', q15b2: 'どうもありがとうございます', q15b3: '助かりました',
      }),
      choiceOption('q15b', 'とんでもございません / どうもありがとうございます / 助かりました', {
        q15b1: 'とんでもございません', q15b2: 'どうもありがとうございます', q15b3: '助かりました',
      }),
      choiceOption('q15c', '気にしないでください / どうもありがとうございます / 助かります', {
        q15b1: '気にしないでください', q15b2: 'どうもありがとうございます', q15b3: '助かります',
      }),
      choiceOption('q15d', '気にしないでください / ありがとう / 助かりました', {
        q15b1: '気にしないでください', q15b2: 'ありがとう', q15b3: '助かりました',
      }),
    ],
    correctOptionId: 'q15a',
    reviews: [
      review(L2, 'vocabulary', 'kininaide'),
      review(L1, 'vocabulary', 'doumo-arigatou-gozaimasu'),
      review(L1, 'vocabulary', 'tasukarimashita'),
    ],
    explanation: n(
      'とんでもございません (b) dùng để khiêm tốn từ chối lời KHEN, không phải trấn an một chút phiền phức. 助かります (c) là thì đang xảy ra, sai vì việc phiền phức đã qua. ありがとう (d) là thể thân mật, lệch mức lịch sự.',
      'とんでもございません (b) humbly deflects a COMPLIMENT, not a reassurance about a small inconvenience. 助かります (c) is present/ongoing tense, wrong because the inconvenience is already past. ありがとう (d) is casual, mismatched with the politeness needed.',
      '「とんでもございません」(b)は褒め言葉を謙遜して断るときに使うもので、ちょっとした迷惑への「気にしないで」という言葉ではありません。「助かります」(c)は現在形で、迷惑はすでに過ぎたことなので合いません。「ありがとう」(d)は普通体で、必要な丁寧さに合いません。',
    ),
  }),

  // Q16 — L2 (お世話, đáp lễ lòng biết ơn chung) + L1 (どうもありがとうございます, cảm ơn cụ thể thêm).
  question({
    order: 16,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai đồng nghiệp/người quen đã biết nhau lâu, giữ thể lịch sự. Đây KHÔNG phải đáp lại một lời cảm ơn cụ thể — là cách bày tỏ lòng biết ơn CHUNG về mối quan hệ. 伊藤 nhắc lại luôn được 田中 giúp đỡ, rồi cảm ơn thêm một lần cụ thể vì việc gần đây.',
      'Roles: two colleagues/acquaintances who have known each other a long time, keeping polite form. This is NOT a reply to one specific thank-you — it is a way of expressing GENERAL gratitude about the relationship. Itō mentions always being helped by Tanaka, then adds one more specific thanks for something recent.',
      '関係：長い付き合いの同僚・知り合いで、丁寧体を保ちます。これは特定のお礼への返事ではなく、関係全体への一般的な感謝の表し方です。伊藤さんはいつも田中さんに世話になっていると述べ、さらに最近の具体的なことでもお礼を言います。',
    ),
    dialogue: [
      dialogueTurn('q16t1', 'ito', [seg('田中さんには、いつも'), blankSeg('q16b1'), seg('になっています。')]),
      dialogueTurn('q16t2', 'tanaka', [seg('こちらこそ、'), blankSeg('q16b2'), seg('になっています。')]),
      dialogueTurn('q16t3', 'ito', [blankSeg('q16b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q16b1', 'お世話', 'おせわ'),
      choiceBlank('q16b2', 'お世話', 'おせわ'),
      choiceBlank('q16b3', 'どうもありがとうございます', 'どうもありがとうございます'),
    ],
    options: [
      choiceOption('q16a', 'お世話 / お世話 / どうもありがとうございます', {
        q16b1: 'お世話', q16b2: 'お世話', q16b3: 'どうもありがとうございます',
      }),
      choiceOption('q16b', '感じ / お世話 / どうもありがとうございます', {
        q16b1: '感じ', q16b2: 'お世話', q16b3: 'どうもありがとうございます',
      }),
      choiceOption('q16c', 'お世話 / 感じ / どうもありがとうございます', {
        q16b1: 'お世話', q16b2: '感じ', q16b3: 'どうもありがとうございます',
      }),
      choiceOption('q16d', 'お世話 / お世話 / ありがとう', {
        q16b1: 'お世話', q16b2: 'お世話', q16b3: 'ありがとう',
      }),
    ],
    correctOptionId: 'q16a',
    reviews: [
      review(L2, 'vocabulary', 'osewa'),
      review(L1, 'vocabulary', 'doumo-arigatou-gozaimasu'),
    ],
    explanation: n(
      '感じ (b, c) là danh từ khác đã dạy trong bài (nghĩa "cảm giác, kiểu"), không hợp nghĩa "sự giúp đỡ" của cụm お世話になっています. ありがとう (d) là thể thân mật, lệch với hai người vẫn giữ lịch sự dù đã quen lâu.',
      '感じ (b, c) is another taught noun (meaning "a feeling/style") and does not fit the "help/care" meaning of お世話になっています. ありがとう (d) is casual, mismatched with the two keeping polite form despite knowing each other a long time.',
      '「感じ」(b, c)はレッスンで学んだ別の名詞（「感覚・様子」という意味）で、「お世話になっています」の「助け・世話」という意味には合いません。「ありがとう」(d)は普通体で、長い付き合いでも丁寧体を保つ二人には合いません。',
    ),
  }),

  // Q17 — L1 (ありがとう) → L2 (いえいえ) → L1 (どうも), thân mật.
  question({
    order: 17,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai người bạn thân. Một người vừa giúp bạn kia một việc nhỏ. Thân mật.',
      'Roles: two close friends. One has just helped the other with a small favor. Casual.',
      '関係：親しい友だち二人です。一方がもう一方のちょっとした用事を手伝ったところです。気軽な間柄です。',
    ),
    dialogue: [
      dialogueTurn('q17t1', 'sato', [blankSeg('q17b1'), seg('。')]),
      dialogueTurn('q17t2', 'ito', [blankSeg('q17b2'), seg('。')]),
      dialogueTurn('q17t3', 'sato', [blankSeg('q17b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q17b1', 'ありがとう', 'ありがとう'),
      choiceBlank('q17b2', 'いえいえ', 'いえいえ'),
      choiceBlank('q17b3', 'どうも', 'どうも'),
    ],
    options: [
      choiceOption('q17a', 'ありがとう / いえいえ / どうも', { q17b1: 'ありがとう', q17b2: 'いえいえ', q17b3: 'どうも' }),
      choiceOption('q17b', 'ありがとうございます / いえいえ / どうも', {
        q17b1: 'ありがとうございます', q17b2: 'いえいえ', q17b3: 'どうも',
      }),
      choiceOption('q17c', 'ありがとう / どういたしまして / どうも', {
        q17b1: 'ありがとう', q17b2: 'どういたしまして', q17b3: 'どうも',
      }),
      choiceOption('q17d', 'ありがとう / いえいえ / 助かりました', {
        q17b1: 'ありがとう', q17b2: 'いえいえ', q17b3: '助かりました',
      }),
    ],
    correctOptionId: 'q17a',
    reviews: [
      review(L1, 'vocabulary', 'arigatou'),
      review(L2, 'vocabulary', 'ieie'),
      review(L1, 'vocabulary', 'doumo'),
    ],
    explanation: n(
      'ありがとうございます (b) là thể lịch sự, lệch với hai bạn thân đang dùng thể thường. どういたしまして (c) cũng là thể lịch sự. 助かりました (d) cũng là thể lịch sự, và là câu MÌNH nói khi MÌNH vừa giúp được, không phải câu SATO nói thêm ở đây.',
      'ありがとうございます (b) is polite, mismatched with two close friends using plain form. どういたしまして (c) is likewise polite. 助かりました (d) is also polite, and is said by the person who just helped — not what Satō would add here.',
      '「ありがとうございます」(b)は丁寧体で、普通体で話す親しい友だち二人には合いません。「どういたしまして」(c)も丁寧体です。「助かりました」(d)も丁寧体で、しかも自分が手伝ったときに言う言葉であり、ここで佐藤さんが付け加える言葉ではありません。',
    ),
  }),

  // Q18 — L1 (どうも, thân mật) → L2 (とんでもない, khiêm tốn thân mật) → L1 (どうも, khép lại).
  question({
    order: 18,
    kind: 'dialogue_multi_blank_choice',
    prompt: PROMPT_DIALOGUE,
    context: n(
      'Vai vế: hai người bạn thân. Một người khen bạn kia làm tốt việc gì đó — bạn kia khiêm tốn từ chối, thân mật.',
      'Roles: two close friends. One compliments the other on doing something well — the other humbly deflects, casually.',
      '関係：親しい友だち二人です。一方がもう一方の頑張りを褒め、もう一方は気軽に謙遜します。',
    ),
    dialogue: [
      dialogueTurn('q18t1', 'tanaka', [seg('あ、'), blankSeg('q18b1'), seg('。')]),
      dialogueTurn('q18t2', 'sato', [blankSeg('q18b2'), seg('。')]),
      dialogueTurn('q18t3', 'tanaka', [blankSeg('q18b3'), seg('。')]),
    ],
    blanks: [
      choiceBlank('q18b1', 'どうも', 'どうも'),
      choiceBlank('q18b2', 'とんでもない', 'とんでもない'),
      choiceBlank('q18b3', 'どうも', 'どうも'),
    ],
    options: [
      choiceOption('q18a', 'どうも / とんでもない / どうも', { q18b1: 'どうも', q18b2: 'とんでもない', q18b3: 'どうも' }),
      choiceOption('q18b', 'どうもありがとうございます / とんでもない / どうも', {
        q18b1: 'どうもありがとうございます', q18b2: 'とんでもない', q18b3: 'どうも',
      }),
      choiceOption('q18c', 'どうも / とんでもございません / どうも', {
        q18b1: 'どうも', q18b2: 'とんでもございません', q18b3: 'どうも',
      }),
      choiceOption('q18d', 'どうも / とんでもない / ありがとうございます', {
        q18b1: 'どうも', q18b2: 'とんでもない', q18b3: 'ありがとうございます',
      }),
    ],
    correctOptionId: 'q18a',
    reviews: [review(L1, 'vocabulary', 'doumo'), review(L2, 'vocabulary', 'tondemonai')],
    explanation: n(
      'どうもありがとうございます (b) là cụm lịch sự nhấn mạnh, lệch với hai bạn thân đang thân mật. とんでもございません (c) là thể lịch sự. ありがとうございます (d) cũng là thể lịch sự — cả ba đều lệch mức thân mật đã thiết lập.',
      'どうもありがとうございます (b) is the emphasized polite phrase, mismatched with two casual close friends. とんでもございません (c) is polite. ありがとうございます (d) is likewise polite — all three clash with the casual register established here.',
      '「どうもありがとうございます」(b)は強調した丁寧な言い方で、気軽な親しい友だち二人には合いません。「とんでもございません」(c)は丁寧体です。「ありがとうございます」(d)も丁寧体です——三つとも、ここで設定された気軽な関係に合いません。',
    ),
  }),
];

export const JA_M02_U1_COMPREHENSIVE = {
  title: 'Bài tổng hợp Unit 1',
  titleByNative: n('Bài tổng hợp Unit 1', 'Unit 1 Comprehensive Test', '第1ユニット総合テスト'),
  description: 'Ôn lại toàn bộ Unit 1 của Module 2: cảm ơn đúng mức độ, và đáp lại lời cảm ơn đúng tình huống.',
  descriptionByNative: n(
    'Ôn lại toàn bộ Unit 1 của Module 2: cảm ơn đúng mức độ, và đáp lại lời cảm ơn đúng tình huống.',
    'Reviews all of Module 2 Unit 1: thanking at the right level, and replying to thanks in the right situation.',
    'モジュール2・第1ユニット全体の復習：適切な度合いでのお礼の言い方と、状況に合った返事の仕方。',
  ),
  estimatedMinutes: '12',
  questions: [...SENTENCE_QUESTIONS, ...DIALOGUE_QUESTIONS],
};
