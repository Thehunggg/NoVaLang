import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 2 / Unit 2 / Lesson 2
// (ja-daily_life-m02-u2-l2, "ちょっとしたお願いをする" / "Nhờ ai đó việc nhỏ").
// Cùng cơ chế với ja-unit2-lesson1-m02-localization.mjs: mọi chuỗi tiếng Việt
// xuất hiện trong ja-unit2-lesson2-m02.mjs PHẢI có dòng add() ở đây (vi/en/ja
// đủ ba), nếu không generate:curriculum sẽ throw loudly.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Xin lỗi & nhờ vả', 'Apologizing & Asking for a Favor', '謝罪とお願い');
add('Nhờ ai đó việc nhỏ', 'Ask Someone for a Small Favor', 'ちょっとしたお願いをする');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');
add('Thân mật.', 'Casual.', 'カジュアル。');
add('Lịch sự.', 'Polite.', '丁寧。');
add('Trang trọng.', 'Formal.', '改まった言い方。');

// ── Intro ────────────────────────────────────────────────────────────────
add('Nhờ vả lịch sự bằng ～てもらえませんか.', 'Ask a favor politely with ～てもらえませんか.', '～てもらえませんかで丁寧にお願いします。');
add('Nhờ vả rất lịch sự bằng ～ていただけますか.', 'Ask a favor very politely with ～ていただけますか.', '～ていただけますかでとても丁寧にお願いします。');
add('Nhờ vả thân mật bằng ～てくれませんか.', 'Ask a favor casually with ～てくれませんか.', '～てくれませんかで気軽にお願いします。');
add('Đồng ý giúp bằng かしこまりました／了解しました／よいですよ (tuỳ mức lịch sự).', 'Agree to help with かしこまりました／了解しました／よいですよ (depending on politeness level).', 'かしこまりました／了解しました／よいですよで承知します（丁寧さによる）。');
add('Phản ứng khi nghe tin vui bằng 本当ですか.', 'React to good news with 本当ですか.', '本当ですかでうれしい知らせに反応します。');
add('Nhờ vả ngắn gọn bằng お願いします.', 'Make a brief request with お願いします.', 'お願いしますで簡潔にお願いします。');
add('Ai đó cần nhờ người khác giúp một việc nhỏ.', 'Someone needs to ask another person for a small favor.', '誰かがちょっとしたお願いをする必要があります。');
add('Bạn chọn đúng mức lịch sự và đúng cách nói theo tình huống.', 'You choose the right politeness level and phrasing for the situation.', '状況に合った丁寧さと言い方を選びます。');
add('Nhờ vả, lịch sự:', 'Asking a favor, polite:', 'お願いする、丁寧：');
add('Nhờ vả, rất lịch sự:', 'Asking a favor, very polite:', 'お願いする、とても丁寧：');
add('Với bạn thân:', 'With a close friend:', '親しい友だちには：');
add('Cho tôi mượn được không?', 'Could you lend it to me?', '貸してもらえませんか。');
add('Làm sashimi giúp tôi được không ạ?', 'Could you make it into sashimi for me?', 'お造りにしていただけますか。');
add('Giúp tôi được không?', 'Could you help me?', '手伝ってくれませんか。');
add('ていただけますか dùng thể khiêm nhường, lịch sự hơn てもらえませんか — mức nào cũng nhờ vả, khác nhau ở đối tượng.', 'ていただけますか uses humble language and is more polite than てもらえませんか — both ask a favor, they differ in who you say them to.', 'ていただけますかは謙譲語でてもらえませんかより丁寧です——どちらもお願いする言葉ですが、相手によって使い分けます。');
add('てくれませんか thân mật hơn てもらえませんか — cùng nhờ vả, khác mức trang trọng.', 'てくれませんか is more casual than てもらえませんか — both ask a favor, they differ in formality.', 'てくれませんかはてもらえませんかより気軽です——どちらもお願いしますが、丁寧さが違います。');
add("かしこまりました／了解しました／よいですよ đều đáp 'được' cho lời nhờ, chỉ khác mức lịch sự.", 'かしこまりました／了解しました／よいですよ all agree to a request, they just differ in politeness.', 'かしこまりました／了解しました／よいですよはすべてお願いを引き受ける言葉で、丁寧さだけが違います。');

// ── Vocabulary details ──────────────────────────────────────────────────
add('...được không? (nhờ vả, lịch sự).', '...could you? (asking a favor, polite).', '～てもらえませんか（お願い、丁寧）。');
add('...được không ạ? (nhờ vả, rất lịch sự).', '...could you please? (asking a favor, very polite).', '～ていただけますか（お願い、とても丁寧）。');
add('...được không? (nhờ vả, thân mật).', '...could you? (asking a favor, casual).', '～てくれませんか（お願い、気軽）。');
add('Vâng ạ, tôi hiểu rồi (đồng ý giúp, rất lịch sự).', 'Certainly, understood (agreeing to help, very polite).', 'かしこまりました（承知、とても丁寧）。');
add('Được, tôi hiểu rồi (đồng ý giúp, thân mật/thông thường).', 'Got it, understood (agreeing to help, casual/ordinary).', '了解しました（承知、気軽・普通）。');
add('Được đấy (đồng ý giúp, trung tính).', "Sure (agreeing to help, neutral).", 'よいですよ（承知、中立）。');
add('Thật à? (phản ứng ngạc nhiên/vui).', 'Really? (surprised/happy reaction).', '本当ですか（驚き・うれしい反応）。');
add('Xin nhờ / làm ơn (nhờ vả ngắn gọn).', 'Please (a brief request).', 'お願いします（簡潔なお願い）。');
add('Cho mượn (dạng từ điển).', 'To lend (dictionary form).', '貸す（辞書形）。');
add('Giúp đỡ (dạng từ điển).', 'To help (dictionary form).', '手伝う（辞書形）。');
add('Xin thêm cả phần xương vào. Tôi định nấu canh xương cá.', "Please add the fish bones too. I'm planning to make fish bone soup.", 'アラも付けてください。アラ汁にしようと思います。');
add('Vậy giúp tôi làm rượu mơ được không?', 'So, could you help me make plum wine?', 'では、梅酒づくりを手伝ってくれませんか。');
add('Được thôi. Mai tôi mang đĩa CD tới nhé.', "Sure. I'll bring the CD tomorrow.", 'よいですよ。明日、CDを持ってきますね。');
add('Thật à? Cho tôi mượn được không?', 'Really? Could you lend it to me?', '本当ですか？貸してもらえませんか？');
add('Xin nhờ nhé.', "Please.", 'お願いします。');
add('Giúp tôi làm rượu mơ được không?', 'Could you help me make plum wine?', '梅酒づくりを手伝ってくれませんか。');
add('Bài hát, bản nhạc.', 'A song, a piece of music.', '曲、音楽の一曲。');
add('Bài này thì nhà tôi có đĩa CD đấy.', 'If it is this song, I have the CD at home.', 'この曲なら、家にCDがありますよ。');
add('Cách làm, món ăn được làm (trong お造り = món sashimi).', 'The way something is made, a prepared dish (in お造り = sashimi dish).', '作り方、作られた料理（お造り＝刺身の料理）。');
add('Canh, nước dùng.', 'Soup, broth.', '汁、スープ。');
add('Tôi định nấu canh xương cá.', "I'm planning to make fish bone soup.", 'アラ汁にしようと思います。');
add('Nghĩ, định (trong 思います = tôi nghĩ/tôi định).', 'To think, to intend (in 思います = I think/I intend).', '思う、つもりだ（思います＝そう考えている）。');
add('Rượu mơ.', 'Plum wine.', '梅酒。');
add('Việc làm/chế biến ra (hậu tố ghép sau danh từ, như 梅酒づくり = làm rượu mơ).', 'Making/producing (a suffix attached after a noun, as in 梅酒づくり = making plum wine).', '作ること（名詞の後に付く接尾語、梅酒づくり＝梅酒を作ること）。');
add('Nếu... thì (thể giả định).', 'If... then (conditional form).', 'もし～なら（仮定形）。');
add('Tôi nên làm gì vậy?', 'What should I do?', '何をすればよいのですか。');

// ── Dialogue groups ──────────────────────────────────────────────────────
add('Lịch sự — nhờ mượn CD', 'Polite — asking to borrow a CD', '丁寧——CDを借りるお願い');
add('Vai vế: hai người quen (đồng nghiệp/bạn), giữ thể lịch sự. 田中 muốn mượn đĩa CD từ 伊藤.', 'Relationship: two acquaintances (colleagues/friends), keeping the polite register. 田中 wants to borrow a CD from 伊藤.', '関係性：知人同士（同僚・友人）、丁寧体を保つ。田中さんは伊藤さんからCDを借りたいと思っています。');
add('Rất lịch sự — nhờ nhân viên cửa hàng cá', 'Very polite — asking a fishmonger for a favor', 'とても丁寧——魚屋の店員へのお願い');
add('Vai vế: khách và nhân viên cửa hàng cá, chưa quen biết — cả hai giữ thể rất lịch sự. Khách nhờ nhân viên làm sashimi.', 'Relationship: a customer and a fishmonger, not previously acquainted — both keep the very polite register. The customer asks the staff to make sashimi.', '関係性：客と魚屋の店員、初対面——両方ともとても丁寧な言葉遣いを保つ。客は店員に刺身にしてもらうようお願いします。');
add('Thân mật — nhờ bạn giúp làm rượu mơ', 'Casual — asking a friend to help make plum wine', '気軽——梅酒作りを手伝ってもらうお願い');
add('Vai vế: hai người bạn thân — thân mật. 佐藤 nhờ 伊藤 giúp làm rượu mơ.', 'Relationship: two close friends — casual. 佐藤 asks 伊藤 to help make plum wine.', '関係性：親しい友人同士——気軽。佐藤さんは伊藤さんに梅酒作りを手伝ってもらうようお願いします。');
add('貸してもらえませんか dùng để nhờ vả lịch sự — hợp với quan hệ đồng nghiệp/bạn bè chưa quá thân.', '貸してもらえませんか is used to ask a favor politely — fitting for colleagues/friends who are not extremely close.', '貸してもらえませんかは丁寧にお願いする表現——あまり親しくない同僚・友人に合います。');
add('助かります là câu cảm ơn khi được giúp — đã học ở bài trước (m02-u1-l1), tái dùng ở đây để đáp lại lời nhờ được đồng ý.', '助かります is a thank-you phrase for being helped — learned in the previous lesson (m02-u1-l1), reused here to respond after a favor is granted.', '助かりますは助けてもらった時のお礼の言葉——前のレッスン（m02-u1-l1）で学んだ表現を、お願いが受け入れられた後の返事として再利用しています。');
add('お造りにしていただけますか rất lịch sự — hợp với quan hệ khách hàng/nhân viên chưa quen biết.', 'お造りにしていただけますか is very polite — fitting for a customer/staff relationship between strangers.', 'お造りにしていただけますかはとても丁寧——初対面の客と店員の関係に合います。');
add('毎度ありがとうございます là câu chào quen thuộc của nhân viên cửa hàng với khách quen, khác với lời cảm ơn thông thường ありがとうございます (đã học ở bài trước, dùng ngoài ngữ cảnh mua bán).', '毎度ありがとうございます is a familiar greeting shop staff use with regular customers, different from the ordinary thank-you ありがとうございます (learned in an earlier lesson, used outside a shopping context).', '毎度ありがとうございますは店員が常連客に使うおなじみの挨拶で、通常のお礼の言葉ありがとうございます（前のレッスンで学んだ、買い物以外の場面で使う表現）とは異なります。');
add('手伝ってくれませんか (thân mật) khác 手伝っていただけますか (rất lịch sự, dùng ở nhóm trước) — bạn bè thân mật thì dùng thể ngắn gọn hơn.', '手伝ってくれませんか (casual) differs from 手伝っていただけますか (very polite, used in the earlier group) — close friends use the shorter, casual form.', '手伝ってくれませんか（気軽）は手伝っていただけますか（とても丁寧、前のグループで使用）とは異なります——親しい友人には短い気軽な形を使います。');

// ── Grammar patterns ──────────────────────────────────────────────────────
add('Cùng ý nhờ vả, ba mức lịch sự khác nhau.', 'Same meaning of asking a favor, three different politeness levels.', 'お願いするという同じ意味で、丁寧さが三段階違います。');
add('てくれませんか dùng với bạn bè/người thân; てもらえませんか dùng khi cần lịch sự; ていただけますか lịch sự nhất, hay dùng với người lạ/khách hàng/cấp trên.', 'てくれませんか is used with friends/family; てもらえませんか is used when politeness is needed; ていただけますか is the most polite, often used with strangers/customers/superiors.', 'てくれませんかは友人・家族に、てもらえませんかは丁寧さが必要な時に、ていただけますかは最も丁寧で初対面の人・客・目上の人によく使います。');
add('～てくれる (đứng riêng, ai đó làm gì cho mình)', '～てくれる (standalone, someone does something for you)', '～てくれる（単独、誰かが自分のために何かをする）');
add('Ai đó làm một việc gì đó cho mình (câu kể, không phải câu hỏi).', 'Someone does something for you (a statement, not a question).', '誰かが自分のために何かをする（質問ではなく叙述文）。');
add('Đây là câu KỂ về việc ai đó làm giúp mình — khác với てくれませんか, vốn là câu HỎI để nhờ vả.', 'This is a STATEMENT about someone doing something to help you — different from てくれませんか, which is a QUESTION used to ask a favor.', 'これは誰かが助けてくれたことについての叙述文——お願いするための疑問文てくれませんかとは異なります。');
add('Mẹ đã làm cơm hộp cho tôi.', 'My mother made a bento box for me.', '母がお弁当を作ってくれた。');
add('Bạn tôi đã đi chợ giúp tôi.', 'My friend went shopping for me.', '友達が買い物をしてくれました。');
add('かしこまりました ↔ 了解しました ↔ よいですよ', 'かしこまりました ↔ 了解しました ↔ よいですよ', 'かしこまりました ↔ 了解しました ↔ よいですよ');
add('Ba cách đồng ý giúp, cùng ý nghĩa chấp thuận.', 'Three ways to agree to help, all meaning acceptance.', '手伝うことに同意する三つの言い方、同じ承諾の意味。');
add('Vâng ạ, tôi hiểu rồi.', 'Certainly, understood.', 'かしこまりました。');
add('Được, tôi hiểu rồi.', 'Got it, understood.', '了解しました。');
add('Được đấy.', 'Sure.', 'よいですよ。');
add("Cả ba đều đáp 'được' cho một lời nhờ vả — かしこまりました rất lịch sự (dịch vụ), 了解しました thân mật/thông thường hơn, よいですよ trung tính.", "All three agree to a request — かしこまりました is very polite (service context), 了解しました is more casual/ordinary, よいですよ is neutral.", '三つとも依頼を引き受ける言葉です——かしこまりましたはとても丁寧（接客場面）、了解しましたはより気軽・普通、よいですよは中立です。');
add('本当ですか (đứng riêng, phản ứng ngạc nhiên)', '本当ですか (standalone, a surprised reaction)', '本当ですか（単独、驚きの反応）');
add('Phản ứng khi nghe một tin bất ngờ/vui, xác nhận lại.', 'A reaction to hearing surprising/happy news, confirming it.', '驚き・うれしい知らせを聞いた時の反応、確認する。');
add('本当ですか thường đứng ở đầu câu, trước khi nói tiếp — không phải câu nhờ vả hay xin lỗi.', '本当ですか usually stands at the start of a sentence, before continuing — it is not a request or an apology.', '本当ですかは通常文の初めに置かれ、その後に続けます——お願いや謝罪の言葉ではありません。');
add('お願いします (đứng riêng, nhờ vả ngắn gọn)', 'お願いします (standalone, a brief request)', 'お願いします（単独、簡潔なお願い）');
add('Câu nhờ vả ngắn gọn, hay đi kèm hoặc kết thúc một lượt nhờ.', 'A brief request phrase, often accompanying or closing a request turn.', '簡潔なお願いの言葉、お願いの発話に添えたり締めくくったりします。');
add('お願いします không nêu rõ việc nhờ là gì — thường dùng SAU khi đã nói rõ việc cần nhờ, hoặc khi ngữ cảnh đã đủ rõ.', 'お願いします does not specify what the favor is — usually used AFTER the request has already been stated, or when the context is already clear.', 'お願いしますは何を頼むのか明示しません——通常、お願いの内容を述べた後、または文脈が十分に明らかな時に使います。');

// ── Practice ────────────────────────────────────────────────────────────
add('Bạn muốn mượn một cuốn sách của đồng nghiệp, lịch sự.', 'You want to borrow a book from a colleague, politely.', '同僚から本を借りたい、丁寧に。');
add('Bạn muốn mượn một cuốn sách của đồng nghiệp, lịch sự. Nói gì?', 'You want to borrow a book from a colleague, politely. What do you say?', '同僚から本を借りたい、丁寧に。何と言いますか？');
add('～てもらえませんか đúng mức lịch sự với đồng nghiệp. ～ていただけますか lịch sự hơn mức cần. ～てくれませんか là thể thân mật. お願いします đứng riêng không nêu rõ việc nhờ là gì.', '～てもらえませんか is the right politeness level with a colleague. ～ていただけますか is more polite than needed. ～てくれませんか is casual. お願いします alone does not specify what the favor is.', '～てもらえませんかは同僚にちょうど良い丁寧さです。～ていただけますかは必要以上に丁寧です。～てくれませんかは気軽な形です。お願いしますは単独では何を頼むのか明示しません。');
add('Một người bạn thân. Bạn nhờ bạn ấy giúp một việc nhỏ, thân mật.', 'A close friend. You ask them to help with a small favor, casually.', '親しい友人。ちょっとしたことを気軽に手伝ってもらいます。');
add('Một người bạn thân. Bạn nhờ bạn ấy giúp một việc nhỏ, thân mật. Nói gì?', 'A close friend. You ask them to help with a small favor, casually. What do you say?', '親しい友人。ちょっとしたことを気軽に手伝ってもらいます。何と言いますか？');
add('Với bạn thân dùng thể thân mật ～てくれませんか. ～てもらえませんか／～ていただけますか đều lịch sự hơn mức cần. かしこまりました là câu người ĐƯỢC nhờ nói, không phải câu đi nhờ.', 'With a close friend, use the casual form ～てくれませんか. ～てもらえませんか／～ていただけますか are both more polite than needed. かしこまりました is what the PERSON BEING ASKED says, not the requester.', '親しい友人には気軽な形～てくれませんかを使います。～てもらえませんか／～ていただけますかはどちらも必要以上に丁寧です。かしこまりましたは頼まれた人が言う言葉で、頼む人の言葉ではありません。');
add('Nối mỗi câu với mức lịch sự của nó.', 'Match each sentence with its politeness level.', 'それぞれの文をその丁寧さのレベルと結び付けてください。');
add('Nhờ vả — rất lịch sự', 'Asking a favor — very polite', 'お願い——とても丁寧');
add('Nhờ vả — lịch sự', 'Asking a favor — polite', 'お願い——丁寧');
add('Nhờ vả — thân mật', 'Asking a favor — casual', 'お願い——気軽');
add('Đồng ý giúp — rất lịch sự', 'Agreeing to help — very polite', '承諾——とても丁寧');
add('Cùng ý nhờ vả nhưng khác nhau ở mức lịch sự cần dùng theo đối tượng.', 'Same meaning of asking a favor but differ in the politeness level needed for the listener.', 'お願いするという同じ意味ですが、相手によって必要な丁寧さが違います。');
add('Sắp xếp thành câu nhờ mượn đồ.', 'Arrange into a sentence asking to borrow something.', '物を借りるお願いの文に並べ替えてください。');
add('貸して + もらえません + か → 貸してもらえませんか, câu nhờ vả lịch sự.', '貸して + もらえません + か → 貸してもらえませんか, a polite request sentence.', '貸して + もらえません + か → 貸してもらえませんか、丁寧なお願いの文。');
add('Hai người bạn thân: một người nhờ giúp một việc.', 'Two close friends: one asks the other for help.', '親しい友人二人：一人がもう一人に手伝いを頼みます。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄を埋めて会話を完成させてください。');
add('Bạn thân đáp thân mật いいよ, không dùng かしこまりました (quá lịch sự) hay いただけますか (đó là câu ĐI nhờ, không phải câu đồng ý).', "A close friend replies casually with いいよ, not かしこまりました (too polite) or いただけますか (that's the request itself, not an agreement).", '親しい友人は気軽にいいよと答えます。かしこまりました（丁寧すぎる）やいただけますか（それはお願いする側の言葉で、承諾の言葉ではない）は使いません。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今、どの文が聞こえましたか？');
add('Đồng ý giúp — lịch sự', 'Agreeing to help — polite', '承諾——丁寧');
add('Đồng ý giúp — thân mật', 'Agreeing to help — casual', '承諾——気軽');
add('Nhờ vả', 'Asking a favor', 'お願い');
add('Câu nghe được là かしこまりました — mức lịch sự cao nhất khi đồng ý giúp, hay dùng trong dịch vụ.', 'The sentence you heard was かしこまりました — the most polite way to agree to help, often used in service contexts.', '聞こえた文はかしこまりました——手伝うことに同意する最も丁寧な言い方で、接客でよく使います。');
add('Bạn muốn nhờ nhân viên cửa hàng làm gì đó cho mình, rất lịch sự.', 'You want to ask a shop employee to do something for you, very politely.', '店員に何かをしてもらいたい、とても丁寧に。');
add('Bạn muốn nhờ nhân viên cửa hàng làm gì đó cho mình, rất lịch sự. Nói gì?', 'You want to ask a shop employee to do something for you, very politely. What do you say?', '店員に何かをしてもらいたい、とても丁寧に。何と言いますか？');
add('していただけますか lịch sự nhất trong ba cách nhờ, đúng mức cần cho nhân viên cửa hàng. してもいいですか dùng để XIN PHÉP cho CHÍNH MÌNH làm gì, không phải nhờ NGƯỜI KHÁC làm.', 'していただけますか is the most polite of the three ways to ask, the right level for a shop employee. してもいいですか is used to ask PERMISSION for YOURSELF to do something, not to ask SOMEONE ELSE to do it.', 'していただけますかは三つの頼み方の中で最も丁寧で、店員に合ったレベルです。してもいいですかは自分が何かをする許可を求める表現で、他の人に頼むものではありません。');
add('本当ですか dùng khi nào?', 'When is 本当ですか used?', '本当ですかはいつ使いますか？');
add('Phản ứng khi nghe tin bất ngờ/vui, xác nhận lại', 'A reaction to hearing surprising/happy news, confirming it', '驚き・うれしい知らせを聞いた時の反応、確認する');
add('Khi nhờ vả ai đó', 'When asking someone a favor', '誰かにお願いする時');
add('Khi đồng ý giúp', 'When agreeing to help', '手伝うことに同意する時');
add('Khi xin lỗi', 'When apologizing', '謝る時');
add('本当ですか là câu người NGHE nói để xác nhận lại một tin bất ngờ/vui, không phải câu nhờ vả hay xin lỗi.', '本当ですか is said by the LISTENER to confirm surprising/happy news, not a request or an apology.', '本当ですかは聞き手が驚き・うれしい知らせを確認するために言う言葉で、お願いや謝罪の言葉ではありません。');
add('Checkpoint 5 câu nhỏ', 'Checkpoint: 5 short questions', 'チェックポイント5問');
add('てくれませんか thuộc mức nào?', 'What level does てくれませんか belong to?', 'てくれませんかはどのレベルに属しますか？');
add('Thân mật', 'Casual', '気軽');
add('Lịch sự', 'Polite', '丁寧');
add('Rất lịch sự', 'Very polite', 'とても丁寧');
add('Không thuộc mức nào', 'None of these levels', 'どのレベルにも属さない');
add('てくれませんか là mức thân mật trong ba cách nhờ vả.', 'てくれませんか is the casual level among the three ways to ask a favor.', 'てくれませんかは三つのお願いの言い方の中で気軽なレベルです。');
add('ていただけますか lịch sự hơn hay kém lịch sự hơn てもらえませんか?', 'Is ていただけますか more polite or less polite than てもらえませんか?', 'ていただけますかはてもらえませんかより丁寧ですか、それとも丁寧さが低いですか？');
add('Lịch sự hơn', 'More polite', 'より丁寧');
add('Kém lịch sự hơn', 'Less polite', '丁寧さが低い');
add('Bằng nhau', 'The same', '同じ');
add('Không so sánh được', 'Cannot be compared', '比較できない');
add('いただく là thể khiêm nhường, lịch sự hơn もらう — đúng cho cả cặp này.', 'いただく is a humble form, more polite than もらう — this holds true for this pair too.', 'いただくは謙譲語で、もらうより丁寧です——このペアにも当てはまります。');
add('かしこまりました và 了解しました khác nhau ở điểm nào?', 'How do かしこまりました and 了解しました differ?', 'かしこまりましたと了解しましたはどこが違いますか？');
add('かしこまりました rất lịch sự (dịch vụ); 了解しました thân mật/thông thường hơn', 'かしこまりました is very polite (service context); 了解しました is more casual/ordinary', 'かしこまりましたはとても丁寧（接客場面）；了解しましたはより気軽・普通');
add('Nghĩa hoàn toàn khác nhau', 'Completely different meanings', '意味が全く違う');
add('了解しました lịch sự hơn', '了解しました is more polite', '了解しましたの方が丁寧');
add('Không dùng để đồng ý giúp', 'Not used to agree to help', '手伝うことに同意する時には使わない');
add("Cả hai đều đáp 'được' cho lời nhờ vả, chỉ khác mức lịch sự.", 'Both agree to a request, they just differ in politeness.', 'どちらも依頼を引き受ける言葉で、丁寧さだけが違います。');
add('お願いします thường nói khi nào?', 'When is お願いします usually said?', 'お願いしますは普通いつ言いますか？');
add('Kèm/kết thúc một lượt nhờ vả', 'Accompanying/closing a request turn', 'お願いの発話に添える・締めくくる');
add('Khi ngạc nhiên', 'When surprised', '驚いた時');
add('お願いします là câu nhờ vả ngắn gọn, hay đi kèm hoặc kết thúc một lượt nhờ.', 'お願いします is a brief request phrase, often accompanying or closing a request turn.', 'お願いしますは簡潔なお願いの言葉で、お願いの発話に添えたり締めくくったりします。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させてください');
add('Hai đồng nghiệp nhắn tin, một người nhờ việc lịch sự, người kia đồng ý rất lịch sự. Nhập từ phù hợp vào hai ô trống.', 'Two colleagues are texting, one politely asks a favor, the other agrees very politely. Fill in the two blanks with the right words.', '同僚二人がメッセージのやり取りをしています。一人が丁寧にお願いし、もう一人がとても丁寧に承諾します。二つの空欄に合う言葉を入れてください。');
add('Bạn làm tốt lắm!', 'Great job!', 'よくできました！');
add('Ô này nhờ gửi tài liệu, lịch sự.', 'This blank asks to send materials, politely.', 'このマスは資料を送ってもらうことを丁寧に頼みます。');
add('Ô này nhờ gửi tài liệu, dùng thể てもらえませんか vì đồng nghiệp.', 'This blank asks to send materials, using てもらえませんか because it is a colleague.', 'このマスは資料を送ってもらうことを頼み、同僚なのでてもらえませんかを使います。');
add('Ô này đồng ý giúp, rất lịch sự.', 'This blank agrees to help, very politely.', 'このマスはとても丁寧に手伝うことを承諾します。');
add('Ô này đồng ý giúp, mức rất lịch sự bằng かしこまりました.', 'This blank agrees to help, at the very polite level with かしこまりました.', 'このマスはかしこまりましたでとても丁寧に手伝うことを承諾します。');
add('Sắp xếp thành câu nhờ giúp mang đồ, thân mật. Có thẻ không cần dùng.', 'Arrange into a casual sentence asking for help carrying something. There are unused tiles.', '物を運んでもらう気軽なお願いの文に並べ替えてください。使わない札があります。');
add('Nhờ vả thân mật dùng てくれない. いただけ quá lịch sự cho bạn thân, かしこまり không hợp câu nhờ (đó là câu ĐÁP).', 'A casual request uses てくれない. いただけ is too polite for a close friend, かしこまり does not fit a request (that is the RESPONSE).', '気軽なお願いにはてくれないを使います。いただけは親しい友人には丁寧すぎ、かしこまりはお願いの文には合いません（それは返事の言葉です）。');
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '最も自然な会話を選んでください。');
add('A tự nhiên: cả hai giữ thể thân mật xuyên suốt. B lệch vì A hỏi rất lịch sự mà B đáp thân mật. C lệch tương tự, ngược lại. D sai chức năng hoàn toàn — A đang xác nhận tin bất ngờ chứ không nhờ vả.', 'A is natural: both keep the casual register throughout. B is off because A asks very politely but B replies casually. C is similarly off, in reverse. D is completely wrong in function — A is confirming surprising news, not asking a favor.', 'Aは自然です：両方とも気軽な言葉遣いを保っています。Bはずれています。Aはとても丁寧に尋ねているのにBが気軽に答えています。Cも同様に逆方向でずれています。Dは機能が全く違います——Aは驚きの知らせを確認しているのであってお願いしているのではありません。');
add('Sắp xếp thành câu nhờ vả rất lịch sự. Có thẻ không cần dùng.', 'Arrange into a very polite request sentence. There are unused tiles.', 'とても丁寧なお願いの文に並べ替えてください。使わない札があります。');
add('教えて + いただけます + か → 教えていただけますか. くれない thân mật kém hơn, かしこまり không đi cùng câu nhờ.', '教えて + いただけます + か → 教えていただけますか. くれない is less polite (casual), かしこまり does not go with a request sentence.', '教えて + いただけます + か → 教えていただけますか。くれないは気軽で丁寧さが低く、かしこまりはお願いの文には合いません。');

// ── Q14 ─────────────────────────────────────────────────────────────────
add('Ba cách nhờ vả khác mức độ', 'Three ways to ask a favor at different levels', '違うレベルの三つのお願いの仕方');
add('Vai vế: ba tình huống khác nhau — một lần với đồng nghiệp, lịch sự; một lần với nhân viên cửa hàng cá, rất lịch sự; và một lần với bạn bè nhờ giúp làm rượu mơ, thân mật. Cùng là nhờ vả, nhưng mức lịch sự khác nhau tùy quan hệ.', 'Relationship: three different situations — once with a colleague, politely; once with a fishmonger, very politely; and once with a friend asking for help making plum wine, casually. Same act of asking a favor, but the politeness level differs by relationship.', '関係性：三つの異なる場面——同僚にお願いする場面（丁寧）、魚屋の店員にお願いする場面（とても丁寧）、友人に梅酒作りを手伝ってもらう場面（気軽）。同じお願いですが、関係によって丁寧さが違います。');

add('［người khác］が＋［động từ thể て］＋ くれる', '［someone else］が＋［verb て-form］＋ くれる', '［他の人］が＋［動詞のて形］＋ くれる');
add('Bài tập', 'Exercises', '練習');
add('Khoảng 8–10 phút', 'About 8–10 minutes', '約8〜10分');
add('Từ vựng · Hội thoại · Ngữ pháp', 'Vocabulary · Dialogue · Grammar', '語彙・会話・文法');
add('Luyện tập cơ bản', 'Basic practice', '基本練習');
add('Câu 1–9', 'Questions 1–9', '問題1〜9');
add('Từ vựng · Nghe · Ngữ pháp\nHội thoại', 'Vocabulary · Listening · Grammar\nDialogue', '語彙・リスニング・文法\n会話');
add('Luyện tập nâng cao', 'Advanced practice', '応用練習');
add('Câu 10–14', 'Questions 10–14', '問題10〜14');
add('Tình huống thực tế\nHội thoại thực hành nâng cao', 'Real-world situations\nAdvanced practice dialogue', '実際の場面\n応用会話練習');

// ── Bổ sung — chuỗi trong dialogueLine()/vocabularyDetails arrays không đi
// qua localizeSupport tree-walker (vi() trực tiếp, hoặc mảng mà MỌI phần tử
// đều chưa có bản dịch — resolveKnownList() bỏ qua kiểm tra khi cả mảng
// không khớp phần tử nào, không throw) ──
add('Vâng. Phần xương thì làm sao ạ?', 'Understood. What should we do with the bones?', 'かしこまりました。アラはどうしますか。');
add('Hôm nay bạn rảnh không?', 'Are you free today?', '今日は暇ですか。');
add('Tôi nghỉ nên rảnh đấy.', "I'm off work, so I'm free.", '休みですから暇ですよ。');
add('Một ngày khác', 'Another day', '別の日');
add('Nhờ ai đó làm gì đó cho mình, mức lịch sự, thường dùng với đồng nghiệp/người quen.', 'Asking someone to do something for you, polite level, usually used with colleagues/acquaintances.', '誰かに何かをしてもらう、丁寧なレベル、同僚・知人によく使う。');
add('Đồng nghiệp', 'Colleague', '同僚');
add('Người quen', 'Acquaintance', '知人');
add('Bạn bè chưa quá thân', 'Friends who are not extremely close', 'あまり親しくない友人');
add('Cách trang trọng hơn:', 'A more formal way:', 'より丁寧な言い方：');
add('Dùng với:', 'Used with:', '使う相手：');
add('Khách hàng', 'Customer', '客');
add('Cấp trên trong công việc', 'A superior at work', '仕事の上司');
add('Cách thân mật:', 'A casual way:', '気軽な言い方：');
add('Bạn bè', 'Friends', '友人');
add('Gia đình', 'Family', '家族');
add('Nhờ ai đó làm gì đó cho mình, mức rất lịch sự — hợp khi nói với người lạ, khách hàng, cấp trên.', 'Asking someone to do something for you, very polite level — fitting when speaking with strangers, customers, or superiors.', '誰かに何かをしてもらう、とても丁寧なレベル——初対面の人、客、目上の人に話す時に合う。');
add('Người lạ', 'A stranger', '初対面の人');
add('Cấp trên', 'A superior', '目上の人');
add('Không dùng với bạn bè/gia đình — nghe quá xa cách.', 'Not used with friends/family — it sounds too distant.', '友人・家族には使わない——よそよそしく聞こえる。');
add('Cách trung tính hơn:', 'A more neutral way:', 'より中立的な言い方：');
add('Người đã quen', 'Someone you already know', '知り合いの人');
add('Nhờ ai đó làm gì đó cho mình, mức thân mật, giữa những người đã thân.', 'Asking someone to do something for you, casual level, between people who are already close.', '誰かに何かをしてもらう、気軽なレベル、親しい間柄で使う。');
add('Người ngang hàng đã thân', 'A close peer', '親しい同等の相手');
add('Không dùng dạng thân mật này với thầy cô hoặc người trên.', 'Do not use this casual form with teachers or superiors.', 'この気軽な形は先生や目上の人には使わない。');
add('Đồng ý giúp một cách rất lịch sự, thường dùng trong dịch vụ khách hàng, nơi làm việc.', 'Agreeing to help very politely, often used in customer service, at work.', 'とても丁寧に手伝うことを承諾する、接客や職場でよく使う。');
add('Tình huống trang trọng', 'A formal situation', '改まった場面');
add('Câu đáp かしこまりました của nhân viên nằm ngay sau lượt yêu cầu này trong hội thoại.', "The staff's かしこまりました reply comes right after this request turn in the dialogue.", '店員の「かしこまりました」という返事は、この会話の依頼の発話のすぐ後にあります。');
add('Đồng ý giúp một cách thân mật/thông thường, không quá trang trọng cũng không quá suồng sã.', 'Agreeing to help casually/ordinarily, neither too formal nor too rough.', '気軽・普通に手伝うことを承諾する、丁寧すぎず砕けすぎない。');
add('Đồng nghiệp ngang hàng', 'A peer colleague', '同等の同僚');
add('Câu đáp 了解しました của 伊藤 nằm ngay sau lượt hướng dẫn cụ thể trong hội thoại gốc.', "伊藤's 了解しました reply comes right after the specific instruction turn in the original dialogue.", '伊藤さんの「了解しました」という返事は、元の会話の具体的な指示の発話のすぐ後にあります。');
add('Đồng ý giúp một cách trung tính, dứt khoát.', 'Agreeing to help neutrally and decisively.', '中立的に、はっきりと手伝うことを承諾する。');
add('Mọi đối tượng ở mức trung tính', 'Anyone, at a neutral level', '中立的なレベルで誰にでも');
add('Mọi đối tượng', 'Anyone', '誰にでも');
add('Cho ai đó mượn một vật gì đó — dạng từ điển của động từ.', 'Lending something to someone — the dictionary form of the verb.', '誰かに物を貸す——動詞の辞書形。');
add('Dạng từ điển 貸す — mức lịch sự nằm ở cách chia đi kèm: 貸してもらえませんか (lịch sự) ・ 貸してくれない？ (thân mật).', 'The dictionary form 貸す — the politeness level lies in the conjugation used with it: 貸してもらえませんか (polite) ・ 貸してくれない？ (casual).', '辞書形の貸す——丁寧さは一緒に使う活用形にあります：貸してもらえませんか（丁寧）・貸してくれない？（気軽）。');
add('Giúp ai đó làm một việc gì đó — dạng từ điển của động từ.', 'Helping someone do something — the dictionary form of the verb.', '誰かが何かをするのを手伝う——動詞の辞書形。');
add('Dạng từ điển 手伝う — mức lịch sự nằm ở cách chia đi kèm: 手伝ってもらえませんか (lịch sự) ・ 手伝ってくれませんか (thân mật).', 'The dictionary form 手伝う — the politeness level lies in the conjugation used with it: 手伝ってもらえませんか (polite) ・ 手伝ってくれませんか (casual).', '辞書形の手伝う——丁寧さは一緒に使う活用形にあります：手伝ってもらえませんか（丁寧）・手伝ってくれませんか（気軽）。');
add('Cảm ơn bạn. Giúp mình nhiều lắm.', 'Thank you. That helps me a lot.', 'ありがとうございます。助かります。');
add('Vâng, cảm ơn quý khách luôn ghé qua. Ạ có cần lọc thành mấy miếng không?', 'Yes, thank you for always coming by. Would you like it cut into fillets?', 'はい、毎度ありがとうございます。何枚かにおろしますか。');
add('かしこまりました là cách nhân viên đồng ý một cách rất lịch sự — mức lịch sự cao nhất trong ba cách đồng ý giúp đã học ở bài này.', 'かしこまりました is how the staff agrees very politely — the most polite of the three ways to agree to help learned in this lesson.', 'かしこまりましたは店員がとても丁寧に承諾する言い方——このレッスンで学んだ三つの承諾の言い方の中で最も丁寧です。');
add('Tất nhiên rồi. Tôi nên làm gì vậy?', 'Of course. What should I do?', 'もちろんです。何をすればよいのですか。');

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
            `[m02u2l2-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[m02u2l2-support] missing en/ja translation for Vietnamese support ` +
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
