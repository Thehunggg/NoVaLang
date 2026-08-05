import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 2 / Unit 2 / Lesson 1
// (ja-daily_life-m02-u2-l1, "謝ることと許可を求めること" / "Xin lỗi & xin phép").
// Cùng cơ chế với các bài m02-u1-l1/l2: mọi chuỗi tiếng Việt xuất hiện trong
// ja-unit2-lesson1-m02.mjs PHẢI có dòng add() ở đây (vi/en/ja đủ ba), nếu
// không generate:curriculum sẽ throw loudly.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Xin lỗi & nhờ vả', 'Apologizing & Asking for a Favor', '謝罪とお願い');
add('Xin lỗi & xin phép', 'Apologize & Ask Permission', '謝ることと許可を求めること');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');
add('Thân mật.', 'Casual.', 'カジュアル。');
add('Lịch sự.', 'Polite.', '丁寧。');
add('Trang trọng.', 'Formal.', '改まった言い方。');

// ── Intro ────────────────────────────────────────────────────────────────
add('Xin lỗi thân mật bằng ごめんなさい.', 'Apologize casually with ごめんなさい.', 'ごめんなさいで気軽に謝ります。');
add('Xin lỗi lịch sự bằng 申し訳ありません／申し訳ございません.', 'Apologize politely with 申し訳ありません／申し訳ございません.', '申し訳ありません／申し訳ございませんで丁寧に謝ります。');
add('Xin phép làm việc gì đó bằng ～てもいいですか／～てもよろしいですか.', 'Ask permission to do something with ～てもいいですか／～てもよろしいですか.', '～てもいいですか／～てもよろしいですかで許可を求めます。');
add('Đồng ý cho phép bằng もちろんです／大丈夫です／構いません.', 'Grant permission with もちろんです／大丈夫です／構いません.', 'もちろんです／大丈夫です／構いませんで許可を出します。');
add('Trấn an/thông cảm khi ai đó gặp chuyện không hay bằng 仕方ありません.', 'Reassure someone about a mishap with 仕方ありません.', '仕方ありませんで相手を気遣います。');
add('Hứa sẽ cẩn thận hơn sau khi xin lỗi bằng 気を付けます.', 'Promise to be more careful after apologizing with 気を付けます.', '謝った後、気を付けますと約束します。');
add('Ai đó cần xin lỗi hoặc xin phép làm một việc gì đó.', 'Someone needs to apologize, or ask permission to do something.', '誰かが謝る、または何かをする許可を求める必要があります。');
add('Bạn chọn đúng mức lịch sự và đúng cách nói theo tình huống.', 'You choose the right politeness level and phrasing for the situation.', '状況に合った丁寧さと言い方を選びます。');
add('Xin lỗi, lịch sự:', 'Apologizing, polite:', '謝る、丁寧：');
add('Xin phép, lịch sự hơn:', 'Asking permission, more polite:', '許可を求める、より丁寧：');
add('Với bạn thân:', 'With a close friend:', '親しい友だちには：');
add('Xin lỗi vì đã hủy hẹn ạ.', 'Sorry for canceling our plans.', '約束をキャンセルして申し訳ありません。');
add('Thử áo được không ạ?', 'May I try this on?', '試着してもよろしいですか。');
add('Xin lỗi nhé.', 'Sorry.', 'ごめんなさい。');
add('申し訳ありません／申し訳ございません dùng thể lịch sự hơn ごめんなさい — mức nào cũng xin lỗi, khác nhau ở đối tượng.', '申し訳ありません／申し訳ございません are more polite than ごめんなさい — both apologize, they differ in who you say them to.', '申し訳ありません／申し訳ございませんはごめんなさいより丁寧です——どちらも謝る言葉ですが、相手によって使い分けます。');
add('てもよろしいですか lịch sự hơn てもいいですか — cùng xin phép, khác mức trang trọng.', 'てもよろしいですか is more polite than てもいいですか — both ask permission, they differ in formality.', 'てもよろしいですかはてもいいですかより丁寧です——どちらも許可を求めますが、丁寧さが違います。');
add('Bỏ ですか khỏi ごめんなさい／申し訳ありません thì mức lịch sự đổi nhưng nghĩa xin lỗi vẫn giữ nguyên.', 'Dropping ですか from ごめんなさい／申し訳ありません changes the politeness but the apologetic meaning stays the same.', 'ごめんなさい／申し訳ありませんから「ですか」を取っても、丁寧さは変わりますが謝る意味は同じです。');

// ── Vocabulary details ──────────────────────────────────────────────────
add('Xin lỗi (thân mật).', 'Sorry (casual).', 'ごめんなさい（気軽）。');
add('Xin lỗi (lịch sự).', 'Sorry (polite).', '申し訳ありません（丁寧）。');
add('Xin lỗi (rất lịch sự, trang trọng).', 'Sorry (very polite, formal).', '申し訳ございません（とても丁寧）。');
add('...được không? (xin phép, trung tính).', '...is that okay? (asking permission, neutral).', '～てもいいですか（許可を求める、中立）。');
add('...được không ạ? (xin phép, lịch sự hơn).', '...would that be all right? (asking permission, more polite).', '～てもよろしいですか（許可を求める、より丁寧）。');
add('Tất nhiên rồi (đồng ý cho phép).', 'Of course (granting permission).', 'もちろんです（許可）。');
add('Được mà, không sao (đồng ý/trấn an).', "It's fine, no problem (granting/reassuring).", '大丈夫です（許可・安心させる）。');
add('Không sao, được (đồng ý cho phép).', "That's fine, go ahead (granting permission).", '構いません（許可）。');
add('Không sao đâu, chuyện đó chịu thôi (thông cảm).', "It can't be helped, that's okay (sympathy).", '仕方ありません（同情）。');
add('Tôi sẽ cẩn thận hơn (hứa hẹn sau khi xin lỗi).', "I'll be more careful (promise after apologizing).", '気を付けます（謝った後の約束）。');

add('Xin lỗi vì đã hủy hẹn ạ.', 'Sorry for canceling our plans.', '約束をキャンセルして申し訳ありません。');
add('Xin lỗi nhé, tôi sai rồi.', "Sorry, I was wrong.", 'ごめんなさい、私が悪かったです。');
add('Rất xin lỗi, chúng tôi đã hết hàng.', "We're very sorry, we're out of stock.", '大変申し訳ございません、品切れでございます。');
add('Ăn cái bánh này được không?', 'May I eat this cake?', 'このケーキを食べてもいいですか。');
add('Thử áo được không ạ?', 'May I try this on?', '試着してもよろしいですか。');
add('Tất nhiên rồi. Phòng thử đồ ở đằng kia ạ.', "Of course. The fitting room is over there.", 'もちろんです。あちらが試着室です。');
add('Được mà. Chân, tay cũng dễ ngứa nên cứ thoa cho kỹ.', "It's fine. Arms and legs get itchy easily too, so apply it well.", '大丈夫です。足や、腕も痒くなりやすいので十分に塗ってください。');
add('Dùng tối đa 3 cái cũng không sao.', "It's fine to use up to 3.", '3つまででしたら使っても構いません。');
add('Việc đó cũng đành chịu thôi. Bị cảm à?', "That can't be helped. Are you catching a cold?", 'それは仕方ありませんね。風邪ですか。');
add('Xin lỗi nhé. Từ giờ tôi sẽ cẩn thận hơn.', "Sorry. I'll be more careful from now on.", 'ごめんなさい、今度からは気を付けます。');

// ── Dialogue groups ──────────────────────────────────────────────────────
add(
  'Vai vế: hai người bạn, đã hẹn đi chơi cùng nhau nhưng vẫn giữ thể lịch sự. 佐藤 thấy không khỏe nên xin hủy hẹn.',
  'Roles: two friends who had made plans together but still keep polite form. Satō feels unwell and cancels the plan.',
  '関係：一緒に出かける約束をした友だちですが、丁寧体を保っています。佐藤さんは体調が悪く、約束をキャンセルします。',
);
add(
  '申し訳ありませんが dùng để mở đầu một lời xin lỗi lịch sự trước khi nói lý do.',
  '申し訳ありませんが opens a polite apology before giving the reason.',
  '申し訳ありませんがは、理由を言う前に丁寧に謝るときに使います。',
);
add(
  '仕方ありませんね là cách 伊藤 thông cảm, không trách móc — khác với việc xin lỗi, đây là câu ĐÁP LẠI một lời xin lỗi/tin không hay.',
  '仕方ありませんね is how Itō shows understanding without blame — unlike apologizing, this is a REPLY to an apology or bad news.',
  '仕方ありませんねは伊藤さんが責めずに理解を示す言い方です——謝る言葉とは違い、謝罪や悪い知らせへの返事です。',
);
add(
  'Vai vế: khách và nhân viên cửa hàng quần áo, chưa quen biết — cả hai giữ thể lịch sự. Khách xin phép thử áo.',
  'Roles: a customer and a clothing store employee, strangers — both keep polite form. The customer asks to try something on.',
  '関係：洋服店の客と店員で、初対面です。二人とも丁寧体を保ちます。客は試着の許可を求めます。',
);
add(
  '試着してもよろしいですか lịch sự hơn てもいいですか — hợp với quan hệ khách hàng/nhân viên chưa quen biết.',
  '試着してもよろしいですか is more polite than てもいいですか — it fits a stranger customer/employee relationship.',
  '試着してもよろしいですかはてもいいですかより丁寧です——初対面の客と店員の関係に合います。',
);
add(
  'もちろんです đáp lại lời xin phép một cách dứt khoát, thân thiện — khác とんでもございません (đã học ở bài trước, dùng để từ chối lời KHEN, không phải cấp phép).',
  'もちろんです answers a request for permission decisively and warmly — different from とんでもございません (learned before, used to deflect a COMPLIMENT, not to grant permission).',
  'もちろんですは許可の求めにきっぱりと親しみを込めて答えます——前のレッスンで学んだとんでもございません（褒め言葉を断るときに使う、許可とは違う）とは異なります。',
);
add(
  'Vai vế: 伊藤 và bố (佐藤), gia đình — thân mật, xưng お父さん. 伊藤 xin phép dùng vỏ sò để trang trí.',
  'Roles: Itō and their father (Satō), family — casual, addressed as お父さん. Itō asks permission to use seashells for decoration.',
  '関係：伊藤さんと父親（佐藤さん）、家族——気軽な間柄で「お父さん」と呼びます。伊藤さんは貝殻を飾りに使う許可を求めます。',
);
add(
  'てよいですか (thân mật) khác てもよろしいですか (lịch sự, dùng ở nhóm trước) — gia đình thân mật thì dùng thể ngắn gọn hơn.',
  'てよいですか (casual) differs from てもよろしいですか (polite, used in the earlier group) — a close family uses the shorter, more casual form.',
  'てよいですか（気軽）は前のグループで使ったてもよろしいですか（丁寧）とは違います——親しい家族では、より気軽な形を使います。',
);

// ── Grammar patterns ─────────────────────────────────────────────────────
add('ごめんなさい ↔ 申し訳ありません ↔ 申し訳ございません', 'ごめんなさい ↔ 申し訳ありません ↔ 申し訳ございません', 'ごめんなさい ↔ 申し訳ありません ↔ 申し訳ございません');
add('Cùng ý xin lỗi, ba mức lịch sự khác nhau.', 'Same apologetic meaning, three different politeness levels.', '同じ謝る意味で、丁寧さが三段階違います。');
add('ごめんなさい dùng với bạn bè/người thân; 申し訳ありません dùng khi cần lịch sự; 申し訳ございません lịch sự nhất, hay dùng trong dịch vụ khách hàng/nơi làm việc.', 'ごめんなさい is for friends/family; 申し訳ありません is used when politeness is needed; 申し訳ございません is the most polite, common in customer service/workplace settings.', 'ごめんなさいは友だち・家族に、申し訳ありませんは丁寧さが必要なときに、申し訳ございませんは最も丁寧で接客・職場でよく使われます。');
add('～てもいいですか (đứng riêng, xin phép)', '～てもいいですか (standalone, asking permission)', '～てもいいですか（単独、許可を求める）');
add('Xin phép làm một việc gì đó, mức trung tính.', 'Asking permission to do something, neutral level.', '何かをする許可を求める、中立的なレベル。');
add('Đây là ĐỘNG TỪ THỂ て + もいいですか — hỏi xem hành động có được phép hay không.', 'This is VERB て-FORM + もいいですか — asking whether an action is allowed.', 'これは動詞の「て形」＋もいいですかです——その行動が許されるかどうかをたずねます。');
add('てもいいですか ↔ てもよろしいですか', 'てもいいですか ↔ てもよろしいですか', 'てもいいですか ↔ てもよろしいですか');
add('Cùng ý xin phép, khác mức lịch sự.', 'Same permission-asking meaning, different politeness.', '同じ許可を求める意味で、丁寧さが違います。');
add('よろしい lịch sự hơn いい — dùng てもよろしいですか khi cần trang trọng hơn, ví dụ với người lạ/khách hàng.', 'よろしい is more polite than いい — use てもよろしいですか when more formality is needed, such as with a stranger or customer.', 'よろしいはいいより丁寧です——見知らぬ人や客など、より丁寧さが必要なときはてもよろしいですかを使います。');
add('もちろんです ↔ 大丈夫です ↔ 構いません', 'もちろんです ↔ 大丈夫です ↔ 構いません', 'もちろんです ↔ 大丈夫です ↔ 構いません');
add('Ba cách đồng ý cho phép, cùng ý nghĩa chấp thuận.', 'Three ways to grant permission, all meaning approval.', '許可を出す三つの言い方、どれも承諾の意味です。');
add('Cả ba đều đáp \'được\' cho một lời xin phép — もちろんです nhấn mạnh sự dứt khoát, 大丈夫です mang thêm ý trấn an, 構いません trung tính.', "All three answer 'yes' to a request for permission — もちろんです emphasizes certainty, 大丈夫です adds a reassuring tone, 構いません is neutral.", '三つとも許可の求めに「いいですよ」と答えます——もちろんですは確実さを強調し、大丈夫ですは安心させる響きがあり、構いませんは中立的です。');
add('仕方ありません (đứng riêng, thông cảm)', '仕方ありません (standalone, sympathy)', '仕方ありません（単独、同情）');
add('Đáp lại một lời xin lỗi/tin không hay bằng sự thông cảm, không trách móc.', 'Replies to an apology or bad news with understanding, without blame.', '謝罪や悪い知らせに、責めずに理解を示して答えます。');
add('Khác với các cụm XIN LỖI — 仕方ありません là câu người NGHE lời xin lỗi nói, không phải người xin lỗi.', 'Unlike the APOLOGY phrases, 仕方ありません is said by the person HEARING the apology, not the one apologizing.', '謝る言葉とは違い、仕方ありませんは謝罪を聞いた側が言う言葉で、謝る側の言葉ではありません。');

// ── Practice exercises ───────────────────────────────────────────────────
add('Bạn vừa hủy hẹn với một người quen, trong tình huống cần lịch sự. Nói gì?', 'You just canceled plans with an acquaintance, in a situation that calls for politeness. What do you say?', '知り合いとの約束をキャンセルしたばかりで、丁寧な場面です。何と言いますか。');
add('申し訳ありません。', "I'm sorry.", '申し訳ありません。');
add('Một người bạn thân vô tình làm bạn khó chịu một chút. Bạn xin lỗi, thân mật. Nói gì?', 'A close friend accidentally annoyed you a little. You apologize, casually. What do you say?', '親しい友だちが少し困らせてしまいました。気軽に謝ります。何と言いますか。');
add('ごめんなさい。', 'Sorry.', 'ごめんなさい。');
add('Nối mỗi câu với mức lịch sự của nó.', 'Match each phrase with its politeness level.', 'それぞれの言葉を丁寧さのレベルと結び付けてください。');
add('Xin lỗi — rất lịch sự, trang trọng', 'Apology — very polite, formal', '謝る——とても丁寧、フォーマル');
add('Xin lỗi — thân mật', 'Apology — casual', '謝る——気軽');
add('Xin phép — lịch sự hơn', 'Asking permission — more polite', '許可を求める——より丁寧');
add('Đồng ý cho phép — trung tính', 'Granting permission — neutral', '許可を出す——中立');
add('Cùng ý xin lỗi nhưng khác nhau ở mức lịch sự cần dùng theo đối tượng.', 'Same apologetic meaning but differing in the politeness level needed for the listener.', '同じ謝る意味ですが、相手に応じて必要な丁寧さが違います。');
add('Sắp xếp thành câu xin phép ăn bánh.', 'Arrange into a sentence asking permission to eat cake.', 'ケーキを食べる許可を求める文に並べ替えてください。');
add('このケーキを食べてもいいですか。', 'May I eat this cake?', 'このケーキを食べてもいいですか。');
add('もいい + ですか → てもいいですか. も／てis không dùng ở đây.', 'もいい + ですか → てもいいですか. も／て is not used here.', 'もいい＋ですか→てもいいですか。も／てはここでは使いません。');
add('Hai người bạn thân: một người xin phép mượn đồ.', 'Two close friends: one asks permission to borrow something.', '親しい友だち二人：一人が物を借りる許可を求めます。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄を埋めて会話を完成させてください。');
add('借りてもいい？', 'Can I borrow it?', '借りてもいい？');
add('もちろん。', 'Of course.', 'もちろん。');
add('Bạn thân dùng thể thân mật, không thêm ですか.', 'Close friends use the casual form, without adding ですか.', '親しい友だちは丁寧な「ですか」を付けない気軽な形を使います。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今聞いた文はどれですか。');
add('Xin lỗi — rất lịch sự', 'Apology — very polite', '謝る——とても丁寧');
add('Xin lỗi — lịch sự', 'Apology — polite', '謝る——丁寧');
add('Xin lỗi — thân mật', 'Apology — casual', '謝る——気軽');
add('Xin phép', 'Asking permission', '許可を求める');
add('Câu nghe được là 申し訳ございません — mức lịch sự cao nhất trong ba cách xin lỗi.', 'The sentence heard was 申し訳ございません — the most polite of the three apology forms.', '聞こえた文は申し訳ございません——三つの謝り方の中で最も丁寧です。');
add('Bạn muốn hỏi mượn bút của đồng nghiệp chưa thân, lịch sự hơn てもいいですか. Nói gì?', "You want to ask a not-yet-close colleague to borrow a pen, more politely than てもいいですか. What do you say?", 'まだ親しくない同僚にペンを借りたいです。てもいいですかより丁寧に。何と言いますか。');
add('てもよろしいですか。', 'Would that be all right?', 'てもよろしいですか。');
add('てもいいですか。', 'Is that okay?', 'てもいいですか。');
add('てもかまいませんか。', 'Would you mind if...?', 'てもかまいませんか。');
add('もいいですか。', 'Is it good?', 'もいいですか。');
add('てもよろしいですか lịch sự hơn てもいいですか, đúng mức cần cho đồng nghiệp chưa thân. もいいですか thiếu て, sai ngữ pháp. てもかまいませんか cũng xin phép nhưng KHÔNG phải cụm chính đã dạy ở bài này.', 'てもよろしいですか is more polite than てもいいですか, matching the politeness needed for a not-yet-close colleague. もいいですか is missing て and is ungrammatical. てもかまいませんか also asks permission but is NOT the main phrase taught in this lesson.', 'てもよろしいですかはてもいいですかより丁寧で、まだ親しくない同僚に必要な丁寧さです。もいいですかは「て」が抜けていて文法的に誤りです。てもかまいませんかも許可を求めますが、このレッスンで学んだ主要な表現ではありません。');
add('仕方ありません dùng khi nào?', 'When is 仕方ありません used?', '仕方ありませんはいつ使いますか。');
add('Đáp lại lời xin lỗi/tin không hay của người khác, thông cảm', "Replying to someone else's apology/bad news, with sympathy", '相手の謝罪や悪い知らせに、同情して答えるとき');
add('Khi tự mình xin lỗi', 'When apologizing yourself', '自分が謝るとき');
add('Khi xin phép làm việc gì đó', 'When asking permission to do something', '何かをする許可を求めるとき');
add('Khi đồng ý cho phép', 'When granting permission', '許可を出すとき');
add('仕方ありません là câu người NGHE nói để thông cảm, không phải câu xin lỗi hay xin phép hay cấp phép.', '仕方ありません is said by the LISTENER to show sympathy — not an apology, a permission request, or a grant of permission.', '仕方ありませんは聞いた側が同情を示すために言う言葉で、謝罪でも許可を求める言葉でも許可を出す言葉でもありません。');
add('Checkpoint 5 câu nhỏ', 'Checkpoint, 5 short questions', 'チェックポイント、5つの小問');
add('ごめんなさい thuộc thể nào?', 'What register is ごめんなさい?', 'ごめんなさいはどの文体ですか。');
add('Thể thân mật', 'Casual form', '普通体');
add('Thể lịch sự', 'Polite form', '丁寧体');
add('Cả hai như nhau', 'Both the same', 'どちらも同じ');
add('Không thuộc thể nào', "Neither register", 'どちらでもない');
add('Không có です／ます ở cuối — dấu hiệu của thể thân mật.', 'No です／ます at the end — a sign of the casual register.', '最後にです／ますがない——普通体の印です。');
add('申し訳ございません lịch sự hơn hay kém lịch sự hơn 申し訳ありません?', 'Is 申し訳ございません more or less polite than 申し訳ありません?', '申し訳ございませんは申し訳ありませんより丁寧ですか、それとも丁寧ではないですか。');
add('Lịch sự hơn', 'More polite', 'より丁寧');
add('Kém lịch sự hơn', 'Less polite', 'あまり丁寧ではない');
add('Bằng nhau', 'The same', '同じ');
add('Không so sánh được', 'Not comparable', '比較できない');
add('ございます／ございません lịch sự hơn あります／ありません — đúng cho cả cặp này.', 'ございます／ございません is more polite than あります／ありません — true for this pair too.', 'ございます／ございませんはあります／ありませんより丁寧です——このペアにも当てはまります。');
add('もちろんです và 大丈夫です khác nhau ở điểm nào?', 'How do もちろんです and 大丈夫です differ?', 'もちろんですと大丈夫ですはどう違いますか。');
add('もちろんです nhấn sự dứt khoát; 大丈夫です thêm ý trấn an', 'もちろんです emphasizes certainty; 大丈夫です adds a reassuring tone', 'もちろんですは確実さを強調し、大丈夫ですは安心させる響きを加える');
add('Nghĩa hoàn toàn khác nhau', 'Completely different meanings', '意味が全く違う');
add('もちろんです lịch sự hơn', 'もちろんです is more polite', 'もちろんですの方が丁寧');
add('Không dùng để đồng ý cho phép', 'Not used to grant permission', '許可を出すのには使わない');
add('Cả hai đều đáp \'được\' cho lời xin phép, chỉ khác sắc thái nhấn mạnh/trấn an.', "Both answer 'yes' to a permission request, differing only in emphasis/reassurance nuance.", 'どちらも許可の求めに「いいですよ」と答えますが、強調・安心させるニュアンスが違うだけです。');
add('気を付けます thường nói SAU khi làm gì?', 'What do you usually say 気を付けます AFTER doing?', '気を付けますは通常何をした後に言いますか。');
add('Xin lỗi vì một lỗi/sơ suất', 'Apologizing for a mistake/oversight', 'ミス・不注意を謝った後');
add('Xin phép làm việc gì đó', 'Asking permission to do something', '何かをする許可を求めた後');
add('Đồng ý cho phép', 'Granting permission', '許可を出した後');
add('Khen ai đó', 'Complimenting someone', '誰かを褒めた後');
add('気を付けます là lời hứa sẽ cẩn thận hơn — thường nói tiếp sau một lời xin lỗi.', '気を付けます is a promise to be more careful — usually said right after an apology.', '気を付けますは今後気をつけるという約束です——通常、謝った後に続けて言います。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させてください');
add('Hai đồng nghiệp nhắn tin, một người xin phép về sớm, người kia đồng ý lịch sự. Nhập từ phù hợp vào hai ô trống.', 'Two colleagues are texting; one asks permission to leave early, the other agrees politely. Type the right words into the two blanks.', '同僚二人がメッセージのやり取りをしています。一人が早退の許可を求め、もう一人が丁寧に応じます。二つの空欄に適切な言葉を入力してください。');
add('今日は用事がありまして、少し早く帰ってもよろしいですか。', 'I have something to attend to today — would it be all right if I left a bit early?', '今日は用事がありまして、少し早く帰ってもよろしいですか。');
add('大丈夫ですよ。お気を付けて。', "That's fine. Take care.", '大丈夫ですよ。お気を付けて。');
add('ありがとうございます。', 'Thank you.', 'ありがとうございます。');
add('Bạn làm tốt lắm!', 'Well done!', 'よくできました！');
add('Ô này xin phép về sớm, lịch sự, dùng thể てもよろしいですか vì đồng nghiệp chưa thân.', 'This blank asks permission to leave early, politely, using てもよろしいですか since the colleague is not yet close.', 'このマスは早退の許可を求めるもので、同僚がまだ親しくないので丁寧なてもよろしいですかを使います。');
add('Ô này đồng ý cho phép, thêm ý trấn an bằng 大丈夫です.', 'This blank grants permission, with a reassuring 大丈夫です.', 'このマスは許可を出すもので、大丈夫ですで安心させます。');
add('Sắp xếp thành câu xin phép dùng máy tính, thân mật. Có thẻ không cần dùng.', 'Arrange into a sentence casually asking permission to use the computer. There are extra tiles you do not need.', 'パソコンを使う許可を気軽に求める文に並べ替えてください。使わない札もあります。');
add('パソコンを使ってもいい？', 'Can I use the computer?', 'パソコンを使ってもいい？');
add('Xin phép thân mật bỏ ですか, chỉ giữ てもいい. よろしい quá lịch sự cho bạn thân, ございません không hợp câu xin phép.', 'A casual request drops ですか, keeping just てもいい. よろしい is too polite for a close friend; ございません does not fit a permission request.', '気軽な求めでは「ですか」を省き、てもいいだけを残します。よろしいは親しい友だちには丁寧すぎ、ございませんは許可を求める文には合いません。');
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural exchange.', '最も自然な会話を選んでください。');
add('A: 借りてもいい？\nB: もちろん。', 'A: Can I borrow it?\nB: Of course.', 'A：借りてもいい？\nB：もちろん。');
add('A: 借りてもよろしいですか。\nB: もちろん。', 'A: Would it be all right if I borrowed it?\nB: Of course.', 'A：借りてもよろしいですか。\nB：もちろん。');
add('A: 借りてもいい？\nB: 大丈夫ですよ。', 'A: Can I borrow it?\nB: That is fine.', 'A：借りてもいい？\nB：大丈夫ですよ。');
add('A: 申し訳ございません。\nB: もちろん。', 'A: I am very sorry.\nB: Of course.', 'A：申し訳ございません。\nB：もちろん。');
add('A tự nhiên: cả hai giữ thể thân mật xuyên suốt. B lệch vì A hỏi thân mật mà B đáp lịch sự. C lệch tương tự, ngược lại. D sai chức năng hoàn toàn — A đang xin lỗi chứ không xin phép.', 'A is natural: both stay casual throughout. B is mismatched because A asks casually but B answers politely. C mismatches the same way, reversed. D is entirely the wrong function — A is apologizing, not asking permission.', 'Aは自然：二人とも気軽な文体を保っています。Bは、Aが気軽に聞いているのにBが丁寧に答えていて合いません。Cも同様に逆方向で合いません。Dは機能が完全に違います——Aは許可を求めているのではなく謝っています。');
add('Sắp xếp thành câu xin lỗi rất lịch sự. Có thẻ không cần dùng.', 'Arrange into a very polite apology sentence. There are extra tiles you do not need.', 'とても丁寧な謝罪の文に並べ替えてください。使わない札もあります。');
add('申し訳ございません。', 'I am very sorry.', '申し訳ございません。');
add('申し訳 + ございません → 申し訳ございません. ありません lịch sự kém hơn, なさい không đi cùng 申し訳.', '申し訳 + ございません → 申し訳ございません. ありません is less polite; なさい does not combine with 申し訳.', '申し訳＋ございません→申し訳ございません。ありませんは丁寧さが劣り、なさいは申し訳とは結びつきません。');
add('Vai vế: hai bạn học, 佐藤 vừa xin phép mượn ghi chú của 伊藤 và được đồng ý, sau đó 佐藤 hủy hẹn hôm sau vì bận — điền đúng câu 佐藤 THẬT đã nói khi hủy hẹn.', 'Roles: two classmates; Satō just asked to borrow Itō’s notes and was granted permission, then Satō cancels tomorrow’s plan due to being busy — fill in the exact line Satō really said when canceling.', '関係：クラスメート二人。佐藤さんは伊藤さんのノートを借りる許可を求めて了承され、その後忙しくて明日の約束をキャンセルします——佐藤さんがキャンセルするときに実際に言った文を入力してください。');
add('明日は用事がありまして、', 'I have something to attend to tomorrow, so', '明日は用事がありまして、');
add('申し訳ありませんが、', "I'm terribly sorry, but", '申し訳ありませんが、');
add('また今度お願いします。', 'Let\'s do it another time, please.', 'また今度お願いします。');
add('明日は用事がありまして、申し訳ありませんが、また今度お願いします。', 'I have something to attend to tomorrow, so I am terribly sorry, but let us do it another time.', '明日は用事がありまして、申し訳ありませんが、また今度お願いします。');
add('Xin lỗi hủy hẹn ĐÚNG mức lịch sự đã giữ suốt cuộc trò chuyện (mượn ghi chú lịch sự → hủy hẹn cũng lịch sự).', 'The cancellation apology matches the polite register kept throughout the conversation (polite borrowing request → polite cancellation too).', 'キャンセルの謝罪は会話全体で保たれた丁寧さと一致します（丁寧な依頼→丁寧なキャンセルも）。');
add('Ba cách xin lỗi & xin phép khác mức độ', 'Three ways to apologize & ask permission, at different levels', '三つのレベルの謝り方・許可の求め方');
add('Vai vế: ba tình huống khác nhau — một lần với người chưa thân (cửa hàng), một lần với bạn bè đã hẹn trước, và một lần trong gia đình thân mật. Cùng là xin lỗi/xin phép, nhưng mức lịch sự khác nhau tùy quan hệ.', 'Roles: three different situations — once with someone not yet close (a store), once with a friend you had made plans with, and once within a close family. Same acts of apologizing/asking permission, but the politeness level differs by relationship.', '関係：三つの異なる場面——まだ親しくない相手（店）、約束していた友だち、そして親しい家族。同じ謝罪・許可の求めでも、関係によって丁寧さが違います。');
add('Một ngày khác', 'A different day', '別の日');

// ── vocabularyReferences (§G7 vùng B — từ lạ trong hội thoại) ──────────────
add('Việc ra ngoài, đi chơi.', 'Going out, an outing.', '出かけること。');
add('Hủy (lịch hẹn, đặt chỗ).', 'To cancel (plans, a reservation).', 'キャンセルすること。');
add('Sự mong chờ, háo hức.', 'Looking forward to something.', '楽しみにしていること。');
add('Trong khi, vậy mà (dùng khi có điều bất ngờ/đáng tiếc).', 'Even though, and yet (used for something surprising/regrettable).', '意外なこと・残念なことを表す「のに」。');
add('Tình trạng sức khỏe.', "One's physical condition.", '体の具合。');
add('Hệ, dòng (màu sắc).', 'A family/range (of colors).', '色の系統。');
add('Màu xanh navy.', 'Navy blue.', '紺色。');
add('Mặc, mang vào (trong 試着 = thử mặc).', 'To wear, put on (in 試着 = to try on).', '着ること（試着＝試しに着ること）。');
add('Phòng (trong 試着室 = phòng thử đồ).', 'A room (in 試着室 = fitting room).', '部屋（試着室＝試着するための部屋）。');
add('Nhặt được.', 'To pick up, find.', '拾うこと。');
add('Vỏ sò.', 'A seashell.', '貝殻。');
add('Chỗ, vị trí (đơn vị đếm nơi chốn).', 'A spot, place (counter for locations).', '場所を数える単位。');
add('Cô đơn, trống trải, đơn điệu.', 'Lonely, sparse, plain-looking.', '寂しい、物足りない感じ。');
add('Vì, do (lý do).', 'Because, since (a reason).', '理由を表す「ので」。');

// ── Bổ sung — chuỗi dialogueLine (không đi qua GOLDEN_COLLECT_MISSING, tự dò) ──
add('Vậy thì đành chịu thôi. Bị cảm à?', "That can't be helped. Are you catching a cold?", 'それは仕方ありませんね。風邪ですか。');
add('Bố ơi, con gắn cả vỏ sò con nhặt được vào được không?', 'Dad, can I attach the seashell I picked up too?', 'お父さん、私の拾ってきた貝殻も付けてよいですか。');
add('Được, nhưng con muốn gắn ở đâu?', "Sure, but where do you want to attach it?", 'よいですが、どこに付けたいのですか。');
add('Ở đây ạ.', 'Right here.', 'ここです。');
add('Vậy ạ. Vậy chiếc áo khoác này thì sao ạ?', 'I see. Then how about this coat?', 'そうなのですね。それでは、こちらのコートはいかがですか。');
add('Màu xanh navy đẹp quá. Thử áo được không ạ?', 'That navy blue is lovely. May I try it on?', 'きれいな紺色ですね。試着してもよろしいですか。');
add('Được đấy. Nhưng nếu chỉ một chỗ thì trông hơi trống, gắn ở đây và cả chỗ kia nữa chắc sẽ đẹp hơn.', "That's nice. But if it's just one spot it looks a bit sparse — attaching it here and over there too would probably look better.", 'いいですね。でも、1カ所だと寂しい気がするので、こことそこの2カ所に付けると良さそうです。');

// ── Bổ sung — chuỗi bị thiếu (phát hiện qua GOLDEN_COLLECT_MISSING) ────────
add('Xin lỗi nhưng tôi phải hủy hẹn đi chơi hôm nay.', "I'm sorry, but I have to cancel our plans today.", '申し訳ありませんが、今日の出かける約束をキャンセルします。');
add('Cho tôi hủy việc đi chơi hôm nay.', 'Please let me cancel today\'s outing.', '今日のお出かけをキャンセルさせてください。');
add('Cho tôi hủy nhé.', 'Please let me cancel.', 'キャンセルさせてください。');
add('Tôi đang mong chờ mà.', 'I was looking forward to it.', '楽しみにしていたのに。');
add('Tôi đang mong chờ mà, có chuyện gì vậy?', 'I was looking forward to it — what happened?', '楽しみにしていたのに、どうされたのですか。');
add('Tôi thấy hơi không khỏe.', "I'm feeling a bit unwell.", '少し具合が悪いのです。');
add('Tôi thích quần áo dòng màu xanh.', 'I like blue-toned clothes.', '青系統のお洋服が好きです。');
add('Màu xanh navy đẹp quá.', 'That navy blue is lovely.', 'きれいな紺色ですね。');
add('Phòng thử đồ ở đằng kia.', 'The fitting room is over there.', 'あちらが試着室です。');
add('Vỏ sò tôi nhặt được.', 'The seashell I picked up.', '私の拾ってきた貝殻。');
add('Gắn cả vỏ sò vào được không?', 'Can I attach the seashell too?', '貝殻も付けてよいですか。');
add('Nếu chỉ một chỗ thì trông hơi trống.', 'If it is just one spot, it looks a bit sparse.', '1カ所だと寂しい気がします。');
add('Vì trông hơi trống nên gắn ở 2 chỗ.', "Since it looks a bit sparse, I'll attach it in 2 spots.", '寂しい気がするので、2カ所に付けます。');
add('Lịch sự — xin lỗi vì hủy hẹn', 'Polite — apologizing for canceling plans', '丁寧——約束のキャンセルを謝る');
add('Lịch sự — xin phép thử áo', 'Polite — asking permission to try something on', '丁寧——試着の許可を求める');
add('Thân mật — xin phép trong gia đình', 'Casual — asking permission within the family', '気軽——家族の中で許可を求める');
add('Tôi xin lỗi.', "I'm sorry.", '申し訳ありません。');
add('Tôi thành thật xin lỗi.', 'I am truly sorry.', '申し訳ございません。');
add('［động từ thể て］＋ もいいですか', '[verb て-form] + もいいですか', '［動詞のて形］＋もいいですか');
add('Tôi ngồi ở đây được không?', 'May I sit here?', 'ここで座ってもいいですか。');
add('Ăn được không?', 'May I eat it?', '食べてもいいですか。');
add('Tất nhiên rồi.', 'Of course.', 'もちろんです。');
add('Được mà.', "It's fine.", '大丈夫です。');
add('Không sao.', "That's fine.", '構いません。');
add('Vậy thì đành chịu thôi.', "Well, that can't be helped.", 'それは仕方ありませんね。');
add('Bài tập', 'Exercises', '練習');
add('Khoảng 8–10 phút', 'About 8–10 minutes', '約8〜10分');
add('Từ vựng · Hội thoại · Ngữ pháp', 'Vocabulary · Dialogue · Grammar', '語彙・会話・文法');
add('Luyện tập cơ bản', 'Basic practice', '基本練習');
add('Câu 1–9', 'Questions 1–9', '問題1〜9');
add('Từ vựng · Nghe · Ngữ pháp\nHội thoại', 'Vocabulary · Listening · Grammar\nDialogue', '語彙・リスニング・文法\n会話');
add('Luyện tập nâng cao', 'Advanced practice', '応用練習');
add('Câu 10–14', 'Questions 10–14', '問題10〜14');
add('Tình huống thực tế\nHội thoại thực hành nâng cao', 'Real-world situations\nAdvanced practice dialogue', '実際の場面\n応用会話練習');
add('Bạn vừa hủy hẹn với một người quen, trong tình huống cần lịch sự.', 'You just canceled plans with an acquaintance, in a situation that calls for politeness.', '知り合いとの約束をキャンセルしたばかりで、丁寧な場面です。');
add('申し訳ありません đúng mức lịch sự cần có. ごめんなさい là thể thân mật. 構いません dùng để CHO PHÉP, không phải xin lỗi. てもいいですか dùng để XIN PHÉP, không phải xin lỗi.', '申し訳ありません matches the politeness needed. ごめんなさい is casual. 構いません is used to GRANT permission, not apologize. てもいいですか is used to ASK permission, not apologize.', '申し訳ありませんは必要な丁寧さに合います。ごめんなさいは気軽な形です。構いませんは許可を出すときに使うもので、謝る言葉ではありません。てもいいですかは許可を求めるときに使うもので、謝る言葉ではありません。');
add('Một người bạn thân vô tình làm bạn khó chịu một chút. Bạn xin lỗi, thân mật.', 'A close friend accidentally annoyed you a little. You apologize, casually.', '親しい友だちが少し困らせてしまいました。気軽に謝ります。');
add('Với bạn thân dùng thể thân mật ごめんなさい. 申し訳ありません／ございません đều là thể lịch sự. 仕方ありません là câu người NGHE nói, không phải câu xin lỗi.', "With a close friend, use the casual ごめんなさい. 申し訳ありません／ございません are both polite. 仕方ありません is said by the LISTENER, not an apology.", '親しい友だちには気軽なごめんなさいを使います。申し訳ありません／ございませんはどちらも丁寧体です。仕方ありませんは聞いた側が言う言葉で、謝る言葉ではありません。');
add('Bạn muốn hỏi mượn bút của đồng nghiệp chưa thân, lịch sự hơn てもいいですか.', 'You want to ask a not-yet-close colleague to borrow a pen, more politely than てもいいですか.', 'まだ親しくない同僚にペンを借りたいです。てもいいですかより丁寧に。');
add('Ô này xin phép về sớm, lịch sự.', 'This blank asks permission to leave early, politely.', 'このマスは早退の許可を丁寧に求めます。');
add('Ô này đồng ý cho phép, trấn an.', 'This blank grants permission, reassuringly.', 'このマスは安心させながら許可を出します。');

export const supportTextByVietnamese = new Map(rows);

const localeCodes = ['vi', 'en', 'ja'];

const resolveKnownList = (values) => {
  const localized = values.map((value) =>
    typeof value === 'string' ? supportTextByVietnamese.get(value) : null,
  );
  if (!localized.some(Boolean)) return null;
  return Object.fromEntries(
    localeCodes.map((locale) => [
      locale,
      values.map((value, index) => {
        const hit = localized[index];
        if (hit) return hit[locale];
        if (locale !== 'vi' && typeof value === 'string' && looksVietnamese(value)) {
          if (COLLECT_MISSING) {
            collectedMissingSupport.add(value);
            return value;
          }
          throw new Error(
            `[m02u2l1-support] missing ${locale} translation for Vietnamese support string: ` +
              JSON.stringify(value),
          );
        }
        return value;
      }),
    ]),
  );
};

export function localizeSupport(value) {
  if (Array.isArray(value)) return value.map(localizeSupport);
  if (!value || typeof value !== 'object') return value;

  const localeKeys = Object.keys(value);
  if (localeKeys.includes('vi') && localeKeys.every((key) => localeCodes.includes(key))) {
    const known = supportTextByVietnamese.get(value.vi);
    return known ?? value;
  }

  const result = {};
  for (const [key, item] of Object.entries(value)) {
    result[key] = localizeSupport(item);
    if (key.endsWith('ByNative') || key.endsWith('Vi')) continue;
    if (typeof item === 'string') {
      const known = supportTextByVietnamese.get(item);
      if (known) {
        result[`${key}ByNative`] = known;
      } else if (looksVietnamese(item)) {
        if (COLLECT_MISSING) {
          collectedMissingSupport.add(item);
        } else {
          throw new Error(
            `[m02u2l1-support] missing en/ja translation for Vietnamese support ` +
              `string at "${key}": ${JSON.stringify(item)}`,
          );
        }
      }
    } else if (Array.isArray(item) && item.every((entry) => typeof entry === 'string')) {
      const localized = resolveKnownList(item);
      if (localized) result[`${key}ByNative`] = localized;
    }
  }
  return result;
}
