import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 2 / Unit 1 / Lesson 2
// (ja-daily_life-m02-u1-l2, "お礼を言われたときの返事" / "Đáp khi được cảm ơn").
// Same machinery as m02-u1-l1: every Vietnamese learner-support string used
// in ja-unit1-lesson2-m02.mjs must have an en/ja row here or generation
// fails loud. Japanese learning content is NGUYÊN VĂN from local-sources/ja/
// topic2.json, topic3.json, ban1.txt, and Irodori (So_cap_1_A2.md) — see the
// source header in ja-unit1-lesson2-m02.mjs; only Vietnamese support text is
// translated here.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Cảm ơn & đáp lại', 'Saying Thanks & Responding', '感謝とその返事');
add('Đáp khi được cảm ơn', 'Reply When Someone Thanks You', 'お礼を言われたときの返事');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Đáp lại lời cảm ơn một cách lịch sự bằng どういたしまして.', 'Reply to thanks politely with どういたしまして.', '「どういたしまして」で丁寧にお礼の返事ができます。');
add('Đáp lại lời cảm ơn một cách thân mật, giản dị bằng いえいえ.', 'Reply to thanks casually and simply with いえいえ.', '「いえいえ」でカジュアルにお礼の返事ができます。');
add('Khiêm tốn từ chối lời khen bằng とんでもございません.', 'Humbly deflect a compliment with とんでもございません.', '「とんでもございません」で褒め言葉を謙遜して打ち消せます。');
add('Trấn an người khác rằng không cần bận tâm bằng 気にしないでください.', 'Reassure someone not to worry, with 気にしないでください.', '「気にしないでください」で相手を安心させられます。');
add('Bày tỏ vui vì đã giúp được bằng お役に立てて良かったです.', 'Express that you are glad to have helped, with お役に立てて良かったです.', '「お役に立てて良かったです」で、役に立てたことへの喜びを伝えられます。');
add('Dùng こちらこそ để đáp lễ khi ai đó bày tỏ lòng biết ơn với mình — cách dùng khác của từ đã học ở bài chào hỏi.', 'Use こちらこそ to reciprocate when someone expresses gratitude toward you — a different use of a word already learned in the greetings lesson.', '「こちらこそ」で相手の感謝の気持ちに応えられます — 挨拶のレッスンで習った使い方とは別の使い方です。');
add('Chọn đúng cách đáp theo mức lịch sự và lý do được cảm ơn.', 'Choose the right reply based on politeness level and the reason for the thanks.', '丁寧さのレベルと感謝された理由に合わせて、正しい返事を選べます。');

// ── Intro situation ──────────────────────────────────────────────────────
add('Ai đó vừa cảm ơn bạn, hoặc bày tỏ lòng biết ơn với bạn.', 'Someone has just thanked you, or expressed gratitude toward you.', '誰かがあなたにお礼を言った、または感謝の気持ちを伝えたところです。');
add('Bạn đáp lại theo đúng mức lịch sự và đúng lý do được cảm ơn.', 'You reply at the right level of politeness and for the right reason.', 'その丁寧さのレベルと感謝された理由に合わせて返事をします。');

// ── Intro example labels ────────────────────────────────────────────────
add('Lịch sự, chung chung:', 'Politely, in general:', '丁寧に、一般的に：');
add('Thân mật:', 'Casually:', 'カジュアルに：');
add('Khi mình vừa giúp được việc:', 'When you have just helped with something:', '何かを手伝えたとき：');

// ── Intro important note ────────────────────────────────────────────────
add('どういたしまして dùng chung, không nói cụ thể vì sao được cảm ơn.', 'どういたしまして is generic — it does not name the specific reason for the thanks.', '「どういたしまして」は一般的な表現で、感謝された具体的な理由には触れません。');
add('とんでもございません dùng khi lời khen/cảm ơn có vẻ quá lời — bạn khiêm tốn từ chối.', 'とんでもございません is for when a compliment or thanks feels excessive — you humbly deflect it.', '「とんでもございません」は褒め言葉やお礼が大げさに感じられるときに、謙遜して打ち消す表現です。');
add('気にしないでください dùng khi có chút phiền phức mà bạn muốn người kia đừng bận tâm.', '気にしないでください is for when there was some minor trouble and you want the other person not to worry about it.', '「気にしないでください」は、多少の面倒があったときに相手を安心させる表現です。');

// ── Vocabulary meanings (Card 2 + overview) ─────────────────────────────
add('Đáp lại lời cảm ơn (lịch sự, chung chung).', 'Reply to thanks (polite, generic).', 'お礼への返事（丁寧、一般的）。');
add('Đáp lại lời cảm ơn (thân mật).', 'Reply to thanks (casual).', 'お礼への返事（カジュアル）。');
add('Từ chối lời khen/cảm ơn quá lời (thân mật).', 'Deflect excessive praise or thanks (casual).', '大げさな褒め言葉やお礼を打ち消す（カジュアル）。');
add('Từ chối lời khen/cảm ơn quá lời (lịch sự).', 'Deflect excessive praise or thanks (polite).', '大げさな褒め言葉やお礼を打ち消す（丁寧）。');
add('Đừng bận tâm về việc đó (lịch sự).', 'Please do not worry about it (polite).', 'そのことを気にしないでほしい（丁寧）。');
add('Vui vì đã giúp được (lịch sự).', 'Glad to have been able to help (polite).', '役に立てて嬉しい（丁寧）。');

// ── Register labels (§B2e — từ vựng ĐÓNG, đúng ba mức) ──────────────────
add('Lịch sự.', 'Polite.', '丁寧。');
add('Trang trọng.', 'Formal.', '改まった言い方。');
add('Thân mật.', 'Casual.', 'カジュアル。');

// ── Vocabulary detail fields (§B2c) ─────────────────────────────────────
add('Đáp lại lời cảm ơn một cách lịch sự, không nói rõ vì sao.', 'Reply to thanks politely, without specifying the reason.', '理由を言わずに、丁寧にお礼の返事をするとき。');
add('Đáp lại lời cảm ơn một cách thân mật, giữa những người đã thân.', 'Reply to thanks casually, between people who already know each other well.', '親しい間柄で、カジュアルにお礼の返事をするとき。');
add('Nhẹ nhàng từ chối lời khen hoặc lời cảm ơn quá lời, thân mật.', 'Casually and gently deflect a compliment or excessive thanks.', '褒め言葉や大げさなお礼を、カジュアルに軽く打ち消すとき。');
add('Khiêm tốn từ chối lời khen hoặc lời cảm ơn quá lời, lịch sự.', 'Humbly deflect a compliment or excessive thanks, politely.', '褒め言葉や大げさなお礼を、丁寧に謙遜して打ち消すとき。');
add('Trấn an người khác rằng một chút phiền phức không đáng bận tâm.', 'Reassure someone that a minor inconvenience is not worth worrying about.', '多少の面倒は気にしなくていいと相手を安心させるとき。');
add('Bày tỏ niềm vui vì vừa giúp được ai đó việc gì, lịch sự.', 'Express happiness at having just been able to help someone, politely.', '誰かの役に立てたことへの喜びを、丁寧に伝えるとき。');
add('Không dùng khi bản thân vừa được người khác giúp — đây là câu MÌNH nói khi MÌNH giúp được người khác.', 'Not used when you were the one helped — this is what YOU say when YOU helped someone else.', '自分が助けてもらったときには使わない — これは自分が誰かの役に立てたときに言う言葉です。');

// ── Vocabulary references (こちらこそ — cách dùng mới của từ đã học) ─────
add('Cách dùng MỚI của từ đã học ở bài chào hỏi (Golden L1): đáp lễ khi ai đó bày tỏ lòng biết ơn với mình, không chỉ dùng khi đáp lễ よろしくお願いします.', 'A NEW use of a word already learned in the greetings lesson (Golden L1): reciprocating when someone expresses gratitude toward you, not only when reciprocating よろしくお願いします.', '挨拶のレッスン（Golden L1）で習った言葉のMORE使い方 — よろしくお願いしますへの返事だけでなく、相手が感謝の気持ちを伝えてきたときに、それに応える使い方もあります。');

// ── Dialogue groups ──────────────────────────────────────────────────────
add('Vai vế: hai bạn học cùng lớp, chưa thân — giữ thể lịch sự. Bối cảnh: 佐藤 làm rơi cục tẩy, 伊藤 giúp tìm và tìm thấy.', 'Relationship: two classmates who are not yet close — keeping the polite register. Situation: Sato dropped an eraser, and Ito helps look and finds it.', '関係性：まだ親しくないクラスメート同士 — 丁寧体を保っています。場面：佐藤が消しゴムを落とし、伊藤が捜すのを手伝って見つけます。');
add('Việc đã giúp xong, đáp lại bằng thể lịch sự tiêu chuẩn どういたしまして — không cần nói rõ đã giúp việc gì.', 'The help is finished; the reply uses the standard polite どういたしまして — no need to name what was helped with.', '手伝いは終わっており、標準的な丁寧語「どういたしまして」で返事をします — 何を手伝ったかを言う必要はありません。');
add('Vai vế: như đã thiết lập ở bài trước (m02-u1-l1) — hai người ngang vai trong chuyến du lịch, giữ thể lịch sự. Bối cảnh: nối tiếp NGAY SAU đoạn đã học ở bài trước, bắt đầu từ lượt nhận lời chụp — 佐藤 vừa chụp ảnh xong cho 田中, được cảm ơn, và LẦN NÀY đáp lại どういたしまして (câu đáp còn thiếu ở bài trước).', 'Relationship: as already established in the previous lesson (m02-u1-l1) — two people of equal standing on a trip, keeping the polite register. Situation: this continues RIGHT AFTER the passage already taught in the previous lesson, starting from the turn where Sato agrees to take the photo — Sato has just finished taking a photo for Tanaka, is thanked, and THIS TIME replies with どういたしまして (the reply that lesson left out).', '関係性：前のレッスン（m02-u1-l1）ですでに設定した通り — 旅行中の対等な二人、丁寧体を保っています。場面：前のレッスンで習った箇所のすぐ続き、写真撮影を引き受けるところから始まります — 佐藤が田中の写真を撮り終えてお礼を言われ、今回は「どういたしまして」と返事をします（前のレッスンでは抜けていた返事）。');
add('Vai vế: hai đồng nghiệp/người quen đã biết nhau lâu. Bối cảnh: KHÔNG PHẢI đáp lại một lời cảm ơn cụ thể vừa xảy ra như hai nhóm trên — đây là cách bày tỏ lòng biết ơn/thiện chí CHUNG khi nhắc tới mối quan hệ đôi bên, một tình huống KHÁC. こちらこそ ở đây KHÔNG phải đáp lễ lời chào よろしくお願いします như đã học ở bài chào hỏi.', 'Relationship: two colleagues/acquaintances who have known each other for a long time. Situation: this is NOT a reply to a specific thanks that just happened, unlike the two groups above — this is a general way of expressing mutual gratitude/goodwill when the relationship itself comes up, a DIFFERENT situation. こちらこそ here is NOT reciprocating a よろしくお願いします greeting like in the greetings lesson.', '関係性：長年の付き合いがある同僚・知人同士。場面：上の二つのグループのように、今起きた具体的なお礼への返事ではありません — これは、間柄そのものに触れたときにお互いへの感謝や好意を伝える、別の場面です。ここでの「こちらこそ」は、挨拶のレッスンで習った「よろしくお願いします」への返事ではありません。');

// ── Dialogue group explanations ─────────────────────────────────────────
add('どういたしまして là câu đáp lịch sự tiêu chuẩn, dùng được cho hầu hết mọi lời cảm ơn, không cần nêu cụ thể.', 'どういたしまして is the standard polite reply, usable for almost any thanks, without needing to specify anything.', '「どういたしまして」は標準的な丁寧な返事で、具体的な内容を言わなくても、ほとんどのお礼に使えます。');
add('Đây là đoạn nối tiếp bài trước — 4 lượt đầu (シャッターはどこですか／右上にあります／では撮りますよ／ありがとうございました) đã học ở m02-u1-l1, câu どういたしまして là câu MỚI của bài này.', 'This continues the previous lesson — the first turns (シャッターはどこですか／右上にあります／では撮りますよ／ありがとうございました) were already taught in m02-u1-l1; どういたしまして is new in this lesson.', 'これは前のレッスンの続きです — 最初のやり取り（シャッターはどこですか／右上にあります／では撮りますよ／ありがとうございました）はm02-u1-l1ですでに習っており、「どういたしまして」がこのレッスンの新しい部分です。');
add('こちらこそ ở đây đáp lại một câu bày tỏ lòng biết ơn về MỐI QUAN HỆ nói chung (お世話になっています), khác với こちらこそ đáp lễ lời chào ở bài trước.', 'Here こちらこそ replies to a statement expressing gratitude about the RELATIONSHIP in general (お世話になっています), unlike the こちらこそ that reciprocated a greeting in the earlier lesson.', 'ここでの「こちらこそ」は、間柄全体への感謝の言葉（お世話になっています）への返事であり、前のレッスンで挨拶に返事をした「こちらこそ」とは異なります。');

// ── Grammar patterns ─────────────────────────────────────────────────────
add('Đáp lại lời cảm ơn, lịch sự, chung chung.', 'Reply to thanks, polite, generic.', 'お礼への返事、丁寧、一般的。');
add('Dùng được cho hầu hết mọi tình huống lịch sự, không cần nêu cụ thể đã giúp gì.', 'Usable in almost any polite situation, without specifying what was helped with.', 'ほとんどの丁寧な場面で使え、何を手伝ったか言う必要はありません。');
add('Đáp lại lời cảm ơn, thân mật.', 'Reply to thanks, casual.', 'お礼への返事、カジュアル。');
add('Thể thân mật của どういたしまして; có thể thêm câu sau để nhẹ nhàng hơn.', 'The casual counterpart of どういたしまして; a follow-up sentence can be added to soften it further.', '「どういたしまして」のカジュアル版。後に一言添えると、より柔らかくなります。');
add('Cùng ý khiêm tốn từ chối lời khen/cảm ơn, hai thể.', 'The same idea of humbly deflecting praise or thanks, in two registers.', '褒め言葉やお礼を謙遜して打ち消す、同じ意味の二つの丁寧さ。');
add('とんでもない vốn là MỘT tính từ trọn vẹn, nên とんでもございません (đổi phần ない) tuy phổ biến nhưng bị coi là chưa chuẩn; dạng CHUẨN là とんでもないです／とんでもないことでございます.', 'とんでもない is originally ONE whole adjective, so とんでもございません (replacing just the ない part) is widely used but considered not strictly standard; the STANDARD forms are とんでもないです／とんでもないことでございます.', '「とんでもない」はもともと一語の形容詞なので、「ない」の部分だけを変えた「とんでもございません」は広く使われているものの、厳密には標準的ではないとされます。標準的な形は「とんでもないです」「とんでもないことでございます」です。');
add('Trấn an người khác đừng bận tâm/lo lắng, lịch sự.', 'Reassure someone not to worry, politely.', '相手に気にしないでほしいと、丁寧に伝える。');

// ── Practice exercises ───────────────────────────────────────────────────
add('Một người bạn thân vừa giúp bạn một việc nhỏ và bạn cảm ơn. Người đó đáp lại thế nào (thân mật)?', 'A close friend just helped you with something small and you thanked them. How do they reply (casually)?', '親しい友達が小さなことを手伝ってくれて、あなたがお礼を言いました。相手はどう返事しますか（カジュアルに）？');
add('Đồng nghiệp chưa thân vừa cảm ơn bạn vì một việc bình thường (không phải lời khen). Bạn đáp lại thế nào (lịch sự)?', 'A colleague you are not yet close with just thanked you for something ordinary (not a compliment). How do you reply (politely)?', 'まだ親しくない同僚が、普通のことでお礼を言ってくれました（褒め言葉ではありません）。どう返事しますか（丁寧に）？');
add('Nối mỗi câu với cách dùng của nó.', 'Match each phrase with its use.', 'それぞれの表現を使い方と結びつけましょう。');
add('Sắp xếp thành câu trấn an lịch sự.', 'Arrange into a polite reassurance sentence.', '丁寧な安心させる文を組み立てましょう。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄を埋めて会話を完成させましょう。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今、どの文を聞きましたか？');
add('Thầy/cô vừa khen bạn làm bài tốt (không phải cảm ơn vì việc gì). Bạn khiêm tốn đáp lại thế nào (lịch sự)?', 'Your teacher just complimented your good work (not thanking you for a favor). How do you humbly reply (politely)?', '先生があなたの良い出来を褒めてくれました（何かのお礼ではありません）。どう謙遜して返事しますか（丁寧に）？');
add('Bạn vô tình làm phiền một chút (đến muộn), người kia không sao cả. Bạn muốn nói người đó đừng bận tâm (lịch sự). Nói gì?', 'You caused a little trouble by accident (arriving late), and the other person says it is fine. You want to tell them not to worry (politely). What do you say?', 'ちょっとした迷惑をかけてしまい（遅刻など）、相手は大丈夫だと言っています。相手に気にしないでほしいと伝えたいです（丁寧に）。何と言いますか？');
add('Checkpoint 5 câu nhỏ', 'Checkpoint, 5 short questions', 'チェックポイント、5つの小問');
add('どういたしまして thuộc thể nào?', 'What register is どういたしまして?', '「どういたしまして」はどの丁寧さですか？');
add('Thể lịch sự', 'Polite register', '丁寧');
add('Thể thường', 'Casual register', '普通体');
add('Cả hai như nhau', 'Both the same', 'どちらも同じ');
add('Không thuộc thể nào', 'Neither register', 'どちらでもない');
add('Có ございます/ございません ở cuối — dấu hiệu của thể lịch sự.', 'It ends in ございます／ございません — a sign of the polite register.', '最後に「ございます／ございません」がある — 丁寧体のしるしです。');
add('Bỏ ございません khỏi とんでもございません thì gần nghĩa với cụm nào?', 'Remove ございません from とんでもございません — which phrase is it closest to?', '「とんでもございません」から「ございません」を取ると、どの表現に近くなりますか？');
add('とんでもない → とんでもございません là cặp lịch sự ↔ thân mật.', 'とんでもない → とんでもございません is a casual ↔ polite pair.', '「とんでもない」→「とんでもございません」はカジュアル↔丁寧のペアです。');
add('Được KHEN (không phải được cảm ơn vì một việc cụ thể) thì khiêm tốn đáp bằng gì, lịch sự?', 'When you are complimented (not thanked for a specific favor), how do you humbly reply, politely?', '（何かのお礼ではなく）褒められたとき、丁寧にどう謙遜して返事しますか？');
add('とんでもございません dùng đúng khi lời khen có vẻ quá lời; どういたしまして／いえいえ dùng cho lời CẢM ƠN, không phải lời KHEN; 気にしないでください dùng khi có phiền phức, không phải khi được khen.', 'とんでもございません fits when a compliment feels excessive; どういたしまして／いえいえ are for THANKS, not compliments; 気にしないでください is for when there was trouble, not when complimented.', '「とんでもございません」は褒め言葉が大げさに感じられるときに合います。「どういたしまして」「いえいえ」は感謝への返事であり、褒め言葉への返事ではありません。「気にしないでください」は面倒があったときのもので、褒められたときのものではありません。');
add('お役に立てて良かったです dùng khi nào, lịch sự?', 'When is お役に立てて良かったです used, politely?', '「お役に立てて良かったです」はいつ、丁寧に使いますか？');
add('Khi mình vừa giúp được việc gì đó cho người khác', 'When you have just been able to help someone with something', '自分が誰かの役に立てたとき');
add('Khi mình vừa được người khác giúp', 'When you have just been helped by someone', '自分が誰かに助けてもらったとき');
add('Khi mình xin lỗi vì đã làm phiền', 'When you are apologizing for causing trouble', '迷惑をかけたことを謝るとき');
add('Khi mình chào tạm biệt', 'When you are saying goodbye', 'お別れの挨拶をするとき');
add('Đây là câu MÌNH nói khi MÌNH giúp được người khác, không phải câu đáp khi được người khác giúp.', 'This is what YOU say when YOU helped someone else, not a reply for when you were helped.', 'これは自分が誰かの役に立てたときに言う言葉であり、自分が助けてもらったときの返事ではありません。');
add('こちらこそ ở bài này khác こちらこそ đã học ở bài chào hỏi thế nào?', 'How does こちらこそ in this lesson differ from the こちらこそ learned in the greetings lesson?', 'このレッスンの「こちらこそ」は、挨拶のレッスンで習った「こちらこそ」とどう違いますか？');
add('Đáp lễ khi được bày tỏ lòng biết ơn, không phải đáp lễ lời chào よろしくお願いします', 'Reciprocating when gratitude is expressed toward you, not reciprocating a よろしくお願いします greeting', '感謝の気持ちを伝えられたときに応える — 「よろしくお願いします」という挨拶に応えるのではない');
add('Hai cách dùng giống hệt nhau, không có gì khác', 'The two uses are identical, no difference', '二つの使い方はまったく同じで、違いはない');
add('Chỉ dùng được với người lạ', 'Only usable with strangers', '見知らぬ人にしか使えない');
add('Chỉ dùng được khi chia tay', 'Only usable when saying goodbye', 'お別れのときにしか使えない');
add('こちらこそ luôn mang nghĩa gốc "đáp lễ" nhưng ĐIỀU ĐƯỢC ĐÁP LỄ khác nhau theo tình huống — lời chào hay lời cảm ơn.', 'こちらこそ always carries the base meaning of "reciprocating," but WHAT is being reciprocated differs by situation — a greeting or an expression of gratitude.', '「こちらこそ」は常に「お返しする」という基本の意味を持ちますが、場面によって何に対してお返しするか（挨拶か、感謝の言葉か）が異なります。');

// ── Q10 chat ──────────────────────────────────────────────────────────────
add('Hai đồng nghiệp nhắn tin: một người vừa giúp việc, người kia cảm ơn và được đáp lại lịch sự. Nhập từ phù hợp vào hai ô trống.', 'Two colleagues are texting: one just helped with something, the other thanks them and is replied to politely. Type the right word into the two blanks.', '同僚同士がメッセージのやり取りをしています：一方が手伝い、もう一方がお礼を言い、丁寧に返事をされます。二つの空欄に合う言葉を入力してください。');
add('明日にでも、実験結果をまとめたレポートを貸しましょうか？', 'Shall I lend you the report summarizing the experiment results tomorrow?', '明日にでも、実験結果をまとめたレポートを貸しましょうか？');
add('それは助かります。', 'That would help a lot.', 'それは助かります。');
add('Ô này đáp lại lời cảm ơn, lịch sự, chung chung.', 'This blank replies to thanks, politely, generically.', 'このマス目は、お礼に丁寧に一般的な返事をします。');
add('Ô này bày tỏ vui vì đã giúp được, lịch sự.', 'This blank expresses being glad to have helped, politely.', 'このマス目は、役に立てて嬉しいという気持ちを丁寧に伝えます。');

// ── Q12 dialogue options ─────────────────────────────────────────────────
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural exchange.', '最も自然な会話を選びましょう。');

// ── Dialogue line translations (Card 3 + Q14) ───────────────────────────
add('Không có gì đâu.', "You're welcome.", 'どういたしまして。');
add('Không sao mà.', "It's nothing.", 'いえいえ。');
add('Tôi vui vì đã giúp được ạ.', "I'm glad I could help.", 'お役に立てて良かったです。');
add('Đâu có, có gì đâu.', "Not at all.", 'とんでもない。');
add('Đâu có ạ, không có gì đâu ạ.', 'Not at all.', 'とんでもございません。');
add('Xin đừng bận tâm ạ.', "Please don't worry about it.", '気にしないでください。');
add('Phiền chị quá.', 'Sorry to trouble you.', 'すみません。');
add('À, tìm thấy rồi. Nó ở dưới chân tôi này.', 'Oh, I found it. It was under my feet.', 'あ、見つけました。私の足元にありましたよ。');
add('Không, chính tôi mới là người phải cảm ơn anh/chị.', "No, it is I who should be thanking you.", 'こちらこそ、お世話になっています。');
add('Tôi luôn được anh Tanaka giúp đỡ nhiều.', "I'm always in Tanaka's debt.", '田中さんには、いつもお世話になっています。');
add('Không, chính tôi mới là người phải cảm ơn chị.', 'No, it is I who should be thanking you.', 'こちらこそ、お世話になっています。');

// ── Batch 2: strings discovered via GOLDEN_COLLECT_MISSING sweep ────────
add('Không sao, chuyện nhỏ mà.', "It's nothing.", '大丈夫、ちょっとしたことだよ。');
add('Cách dùng MỚI của từ đã học ở bài chào hỏi: đáp lễ khi ai đó bày tỏ lòng biết ơn với mình, không chỉ dùng khi đáp lễ よろしくお願いします. Khác どういたしまして／いえいえ ở chỗ: こちらこそ ngụ ý "chính TÔI mới là người phải cảm ơn/mang ơn BẠN".', 'A NEW use of a word already learned in the greetings lesson: reciprocating when someone expresses gratitude toward you, not only when reciprocating よろしくお願いします. Unlike どういたしまして／いえいえ, こちらこそ implies "it is actually I who owe YOU thanks."', '挨拶のレッスンで習った言葉の新しい使い方 — 「よろしくお願いします」への返事だけでなく、相手が感謝の気持ちを伝えてきたときに応える使い方です。「どういたしまして」「いえいえ」と違い、「こちらこそ」は「感謝すべきなのはむしろ自分の方だ」という意味合いを持ちます。');
add('Lịch sự/trung tính, tuỳ ngữ cảnh.', 'Polite/neutral, depending on context.', '丁寧・中立、文脈による。');
add('Lịch sự — được giúp tìm đồ', 'Polite — helped find something', '丁寧 — 物を探すのを手伝ってもらう');
add('Cả hai giữ thể lịch sự vì là bạn học chưa thân.', 'Both keep the polite register since they are classmates who are not yet close.', '二人ともまだ親しくないクラスメートなので丁寧体を保っています。');
add('Lịch sự — việc đã xong (nối tiếp bài trước)', 'Polite — something finished (continuing the previous lesson)', '丁寧 — 終わったこと（前のレッスンの続き）');
add('Cùng là どういたしまして nhưng ngữ cảnh khác nhóm 1 (một bên là du lịch/chụp ảnh, một bên là giúp tìm đồ trong lớp) — cho thấy câu này dùng chung được cho nhiều tình huống.', 'The same どういたしまして, but a different situation from group 1 (one is travel/photos, the other is helping find something in class) — showing this phrase works across many situations.', '同じ「どういたしまして」ですが、グループ1とは場面が異なります（一方は旅行・写真、もう一方は教室で物を探す手伝い）— この表現が様々な場面で使えることが分かります。');
add('こちらこそ — đáp lễ lòng biết ơn (KHÁC bài trước)', 'こちらこそ — reciprocating gratitude (DIFFERENT from the previous lesson)', '「こちらこそ」— 感謝の気持ちに応える（前のレッスンとは別の使い方）');
add('Không có lời cảm ơn CỤ THỂ vừa xảy ra (như "cảm ơn vì đã giúp tìm đồ") — đây là cách hai người quen biết lâu bày tỏ thiện ý với nhau.', 'There is no SPECIFIC thanks that just happened (like "thanks for helping find something") — this is how two long-time acquaintances express goodwill toward each other.', '（「探すのを手伝ってくれてありがとう」のような）具体的なお礼が今起きたわけではありません — これは長い付き合いのある二人がお互いへの好意を伝える方法です。');
add('どういたしまして (đứng riêng)', 'どういたしまして (standalone)', '「どういたしまして」（単独）');
add('いえいえ (đứng riêng)', 'いえいえ (standalone)', '「いえいえ」（単独）');
add('Đâu có.', 'Not at all.', 'とんでもない。');
add('Đâu có ạ.', 'Not at all.', 'とんでもございません。');
add('気にしないでください (đứng riêng)', '気にしないでください (standalone)', '「気にしないでください」（単独）');
add('Bài tập', 'Exercises', '練習');
add('Khoảng 8–10 phút', 'About 8–10 minutes', '約8〜10分');
add('Từ vựng · Hội thoại · Ngữ pháp', 'Vocabulary · Dialogue · Grammar', '語彙・会話・文法');
add('Luyện tập cơ bản', 'Basic practice', '基本練習');
add('Câu 1–9', 'Questions 1–9', '問題1〜9');
add('Từ vựng · Nghe · Ngữ pháp\nHội thoại', 'Vocabulary · Listening · Grammar\nDialogue', '語彙・リスニング・文法\n会話');
add('Luyện tập nâng cao', 'Advanced practice', '応用練習');
add('Câu 10–14', 'Questions 10–14', '問題10〜14');
add('Tình huống thực tế\nHội thoại thực hành nâng cao', 'Real-world situations\nAdvanced practice dialogue', '実践的な場面\n応用練習会話');
add('いえいえ là thể thân mật, hợp với bạn thân. どういたしまして／とんでもございません là thể lịch sự, không hợp bạn thân. お役に立てて良かったです cũng lịch sự và dài hơn mức cần cho một việc nhỏ giữa bạn bè.', 'いえいえ is the casual register, fitting a close friend. どういたしまして／とんでもございません are polite and do not fit a close friend. お役に立てて良かったです is also polite and longer than needed for something small between friends.', '「いえいえ」はカジュアルで、親しい友達に合います。「どういたしまして」「とんでもございません」は丁寧体で、親しい友達には合いません。「お役に立てて良かったです」も丁寧で、友達同士の小さなことには長すぎます。');
add('どういたしまして đúng cả về mức lịch sự lẫn tình huống (đáp lại lời cảm ơn bình thường). いえいえ／とんでもない là thể thân mật, sai trục lịch sự. 気にしないでください dùng khi có phiền phức cụ thể, không phải câu đáp chung cho lời cảm ơn.', 'どういたしまして is correct both in register and situation (replying to ordinary thanks). いえいえ／とんでもない are casual, wrong on the register axis. 気にしないでください is for a specific inconvenience, not a generic reply to thanks.', '「どういたしまして」は丁寧さの面でも場面の面でも正しいです（普通のお礼への返事）。「いえいえ」「とんでもない」はカジュアルで、丁寧さの軸で誤りです。「気にしないでください」は具体的な面倒があるときのもので、お礼への一般的な返事ではありません。');
add('Đáp lại lời cảm ơn — lịch sự, chung chung', 'Reply to thanks — polite, generic', 'お礼への返事 — 丁寧、一般的');
add('Đáp lại lời cảm ơn — thân mật', 'Reply to thanks — casual', 'お礼への返事 — カジュアル');
add('Khiêm tốn từ chối lời khen — lịch sự', 'Humbly deflect a compliment — polite', '褒め言葉を謙遜して打ち消す — 丁寧');
add('Trấn an đừng bận tâm — lịch sự', 'Reassure not to worry — polite', '気にしないでほしいと伝える — 丁寧');
add('Bốn câu cùng thuộc nhóm "đáp lễ" nhưng khác nhau ở mức lịch sự và điều được đáp lại: lời cảm ơn, lời khen, hay một chút phiền phức.', 'All four phrases belong to the "reciprocating" group but differ in register and in what is being replied to: thanks, a compliment, or a minor inconvenience.', '四つの表現はすべて「お返しする」グループに属しますが、丁寧さのレベルと、何に対する返事か（お礼、褒め言葉、ちょっとした面倒）が異なります。');
add('気に + しないで + ください → 気にしないでください。 ございません／良かった là mảnh của とんでもございません／お役に立てて良かったです, không thuộc câu này.', '気に + しないで + ください → 気にしないでください。 ございません／良かった are fragments of とんでもございません／お役に立てて良かったです and do not belong in this sentence.', '気に＋しないで＋ください→気にしないでください。「ございません」「良かった」は「とんでもございません」「お役に立てて良かったです」の一部で、この文には属しません。');
add('Vai vế: hai bạn học, 田中 vừa nhờ 佐藤 cho mượn tài liệu và cảm ơn bằng thể lịch sự, nhưng 佐藤 đáp lại thân mật (giống mẫu vai vế đã học ở dialogueGroup 1) — điền đúng câu 佐藤 THẬT đã nói.', 'Relationship: two classmates — Tanaka just asked Sato to lend notes and thanked them politely, but Sato replies casually (matching the relationship pattern from dialogueGroup 1) — fill in the exact line Sato really said.', '関係性：クラスメート同士 — 田中が佐藤にノートを借りたいと頼んでお礼を丁寧に言いましたが、佐藤はカジュアルに返事をします（dialogueGroup 1で習った関係性のパターンと同じ）— 佐藤が実際に言った文をそのまま入力してください。');
add('佐藤 đáp lại thân mật bằng いえいえ dù 田中 vừa nói lịch sự — đúng vai vế đã thiết lập ở dialogueGroup 1. どういたしまして／とんでもございません đều là thể lịch sự, không khớp câu佐藤 thật đã nói.', 'Sato replies casually with いえいえ even though Tanaka just spoke politely — matching the relationship established in dialogueGroup 1. どういたしまして／とんでもございません are both polite and do not match what Sato actually said.', '田中が丁寧に話したのに対し、佐藤は「いえいえ」とカジュアルに返事をします — dialogueGroup 1で設定した関係性のとおりです。「どういたしまして」「とんでもございません」はどちらも丁寧体で、佐藤が実際に言った文とは一致しません。');
add('Khiêm tốn từ chối lời khen, lịch sự', 'Humbly deflect a compliment, polite', '褒め言葉を謙遜して打ち消す、丁寧');
add('Đáp lại lời cảm ơn, lịch sự', 'Reply to thanks, polite', 'お礼への返事、丁寧');
add('Trấn an đừng bận tâm', 'Reassure not to worry', '気にしないでほしいと伝える');
add('Vui vì đã giúp được', 'Glad to have helped', '役に立てて嬉しい');
add('Câu nghe được là とんでもございません — dùng khi khiêm tốn từ chối lời khen, không phải câu đáp chung cho lời cảm ơn.', 'The sentence heard is とんでもございません — used to humbly deflect a compliment, not a generic reply to thanks.', '聞こえた文は「とんでもございません」— 褒め言葉を謙遜して打ち消すときのもので、お礼への一般的な返事ではありません。');
add('とんでもございません đúng chức năng (đáp lại lời KHEN, không phải lời cảm ơn cụ thể). どういたしまして đáp lại lời CẢM ƠN, không phải lời khen. いえいえ sai cả trục lịch sự lẫn chức năng. 気にしないでください dùng khi có phiền phức, không phải khi được khen.', 'とんでもございません has the right function (replying to a COMPLIMENT, not specific thanks). どういたしまして replies to THANKS, not a compliment. いえいえ is wrong on both register and function. 気にしないでください is for when there is trouble, not when complimented.', '「とんでもございません」は機能が正しいです（褒め言葉への返事で、具体的なお礼ではない）。「どういたしまして」はお礼への返事で、褒め言葉へのものではありません。「いえいえ」は丁寧さも機能も誤りです。「気にしないでください」は面倒があるときのもので、褒められたときのものではありません。');
add('Bạn vô tình làm phiền một chút (đến muộn), người kia nói không sao. Bạn muốn nói người đó đừng bận tâm (lịch sự). Nói gì?', 'You accidentally caused a little trouble (arriving late), and the other person says it is fine. You want to tell them not to worry (politely). What do you say?', 'ちょっとした迷惑をかけてしまい（遅刻など）、相手は大丈夫だと言っています。相手に気にしないでほしいと伝えたいです（丁寧に）。何と言いますか？');
add('気にしないでください đúng chức năng (có phiền phức cụ thể, muốn người kia đừng bận tâm). とんでもございません dùng khi khiêm tốn từ chối KHEN, không phải trấn an. どういたしまして đáp lại lời cảm ơn, không phải trấn an. お役に立てて良かったです là câu MÌNH nói khi MÌNH giúp được — ở đây bạn là người gây phiền, không phải người giúp.', '気にしないでください has the right function (there is specific trouble, and you want them not to worry). とんでもございません is for humbly deflecting a COMPLIMENT, not reassuring. どういたしまして replies to thanks, not for reassuring. お役に立てて良かったです is what YOU say when YOU helped — here you are the one who caused the trouble, not the one who helped.', '「気にしないでください」は機能が正しいです（具体的な面倒があり、相手に気にしないでほしい）。「とんでもございません」は褒め言葉を謙遜して打ち消すためのもので、安心させるためのものではありません。「どういたしまして」はお礼への返事で、安心させるためのものではありません。「お役に立てて良かったです」は自分が役に立てたときに言う言葉です — ここではあなたが迷惑をかけた側で、助けた側ではありません。');
add('Đây là câu đáp lịch sự tiêu chuẩn, dùng chung cho hầu hết mọi lời cảm ơn.', 'This is the standard polite reply, usable for almost any thanks.', 'これは標準的な丁寧な返事で、ほとんどのお礼に使えます。');
add('とんでもない → とんでもございません là cặp lịch sự ↔ thân mật, cùng ý khiêm tốn từ chối lời khen.', 'とんでもない → とんでもございません is a casual ↔ polite pair, both meaning to humbly deflect a compliment.', '「とんでもない」→「とんでもございません」はカジュアル↔丁寧のペアで、どちらも褒め言葉を謙遜して打ち消す意味です。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させましょう');
add('Bạn làm tốt lắm!', 'You did great!', 'よくできました！');
add('Ô này cảm ơn lịch sự, nhấn mạnh.', 'This blank gives polite, emphatic thanks.', 'このマス目は丁寧に強調してお礼を言います。');
add('Nhắc lại mẫu cảm ơn lịch sự đã học ở bài trước, để có lời cảm ơn cho B đáp lại.', 'Recalls the polite thanks pattern from the previous lesson, giving B something to reply to.', '前のレッスンで習った丁寧なお礼のパターンを思い出させ、Bが返事できるお礼の言葉を作ります。');
add('A vừa giúp (cho mượn báo cáo) nên đáp lại bằng câu bày tỏ niềm vui đã giúp được, không phải どういたしまして (câu đó dành cho B, người ĐƯỢC giúp).', 'A just helped (by lending the report), so A replies with a phrase expressing joy at having helped, not どういたしまして (that phrase is for B, the one who WAS helped).', 'Aは手伝ったばかりなので（レポートを貸した）、役に立てた喜びを表す言葉で返事をします。「どういたしまして」ではありません（それは助けてもらったBのための言葉です）。');
add('Sắp xếp thành câu đáp lại lời cảm ơn thân mật. Có thẻ không cần dùng.', 'Arrange into a casual reply to thanks. Some cards are not needed.', 'カジュアルなお礼への返事に並べかえてください。使わないカードがあります。');
add('いえいえ đứng riêng là câu đáp thân mật đầy đủ. ございません／良かったです là mảnh của とんでもございません／お役に立てて良かったです, không đi cùng câu ngắn này.', 'いえいえ standing alone is a complete casual reply. ございません／良かったです are fragments of とんでもございません／お役に立てて良かったです and do not belong in this short sentence.', '「いえいえ」は単独で完全なカジュアルな返事になります。「ございません」「良かったです」は「とんでもございません」「お役に立てて良かったです」の一部で、この短い文には合いません。');
add('A tự nhiên: lời cảm ơn lịch sự được đáp lại lịch sự, đúng chức năng. B lệch trục lịch sự: A nói thân mật mà B lại đáp quá trang trọng. C ghép sai (ございませんです không tồn tại — とんでもございません đã đủ lịch sự, không thêm です). D sai chức năng: lời trong ngoặc là LỜI KHEN, nhưng どういたしまして chỉ đáp lại lời CẢM ƠN.', 'A is natural: polite thanks is met with a polite, correctly-functioning reply. B is off on register: A speaks casually but B replies overly formally. C is wrongly combined (ございませんです does not exist — とんでもございません is already polite enough without adding です). D has the wrong function: the bracketed line is a COMPLIMENT, but どういたしまして only replies to THANKS.', 'Aは自然です。丁寧なお礼に丁寧に、正しい機能で返事をしています。Bは丁寧さの軸がずれています。Aはカジュアルに話しているのに、Bが丁寧すぎる返事をしています。Cは組み合わせが誤りです（「ございませんです」は存在しません — 「とんでもございません」ですでに十分丁寧で、「です」を足す必要はありません）。Dは機能が誤りです。かっこ内の言葉は褒め言葉ですが、「どういたしまして」はお礼にしか返事をしません。');
add('Sắp xếp thành câu bày tỏ vui vì đã giúp được, lịch sự. Có thẻ không cần dùng.', 'Arrange into a polite phrase expressing joy at having helped. Some cards are not needed.', '役に立てて嬉しいという丁寧な文に並べかえてください。使わないカードがあります。');
add('お役に立てて + 良かった + です → お役に立てて良かったです。 ございません là mảnh của とんでもございません, 気にしないで là mảnh của 気にしないでください — cả hai không thuộc câu này.', 'お役に立てて + 良かった + です → お役に立てて良かったです。 ございません is a fragment of とんでもございません, and 気にしないで is a fragment of 気にしないでください — neither belongs in this sentence.', 'お役に立てて＋良かった＋です→お役に立てて良かったです。「ございません」は「とんでもございません」の一部、「気にしないで」は「気にしないでください」の一部で、どちらもこの文には属しません。');
add('Đáp lại lời cảm ơn trong hai tình huống', 'Replying to thanks in two situations', '二つの場面でお礼に返事をする');
add('Vai vế: nối tiếp bài trước (chuyến du lịch, hai người ngang vai, lịch sự) rồi chuyển sang một tình huống khác (bạn học giúp tìm đồ, lịch sự vì chưa thân). Cùng là đáp lại lời cảm ơn lịch sự, nhưng câu đáp chuẩn dùng chung được cho cả hai, không cần nêu cụ thể đã giúp gì.', 'Relationship: continues the previous lesson (a trip, two people of equal standing, polite) then moves to a different situation (a classmate helping find something, polite since not yet close). Both are polite replies to thanks, but the standard reply works for both without needing to name what was helped with.', '関係性：前のレッスンの続き（旅行、対等な二人、丁寧）から、別の場面（クラスメートが物を探すのを手伝う、まだ親しくないので丁寧）に移ります。どちらも丁寧なお礼への返事ですが、標準的な返事はどちらにも使え、何を手伝ったか言う必要はありません。');

// ── Batch 3: Q14 dialogue line translations reused/continued from
// m02-u1-l1 (own translations, not required to byte-match that lesson's
// localization file — only the JAPANESE source text must match verbatim).
add('Anh/chị chụp giúp tôi một tấm ảnh với tượng Hachiko được không?', 'Could you take a photo of me with the Hachiko statue?', 'ハチ公と一緒に写真を撮ってもらえませんか？');
add('Được chứ. Nút chụp ở đâu vậy?', 'Sure. Where is the shutter button?', 'よいですよ。シャッターはどこですか？');
add('Ở phía trên bên phải.', 'It is on the upper right.', '右上にあります。');
add('Phía trên bên phải, rõ rồi. Tôi chụp đây. Kiểu này được không?', 'Upper right, got it. I will take the photo now. How does this look?', '右上ですね。では撮りますよ。このような感じでどうですか？');
add('Vâng, cảm ơn anh/chị nhiều ạ.', 'Yes, thank you very much.', 'はい、ありがとうございました。');
add('Cảm ơn chị nhiều ạ.', 'Thank you very much.', 'どうもありがとうございます。');
add('Một ngày khác', 'Another day', 'べつの日');
add('Đâu có, còn kém lắm.', "Not at all, I still have a long way to go.", 'いえいえ、まだまだです。');
add('Đối chiếu: đây LÀ cách dùng こちらこそ đã học ở bài chào hỏi (đáp lễ よろしくお願いします) — khác với cách dùng MỚI ở bài này (đáp lễ lòng biết ơn お世話になっています, không có よろしく).', 'For contrast: this IS the こちらこそ usage already learned in the greetings lesson (reciprocating よろしくお願いします) — different from the NEW usage in this lesson (reciprocating gratitude お世話になっています, without よろしく).', '比較のため：これは挨拶のレッスンですでに習った「こちらこそ」の使い方（「よろしくお願いします」への返事）です — このレッスンの新しい使い方（「よろしく」を伴わない、感謝「お世話になっています」への返事）とは異なります。');
add('Chính tôi mới là người phải nhờ anh/chị giúp đỡ.', 'It is I who should be asking for your favor.', 'こちらこそよろしく。');
add('Không có gì đâu, đó là nhờ chị Uchiyama đã cố gắng thôi.', "It's nothing, that's thanks to Uchiyama's hard work.", 'いえいえ、内山さんの頑張りのおかげですよ。');

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
            `[m02u1l2-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[m02u1l2-support] missing en/ja translation for Vietnamese support ` +
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
