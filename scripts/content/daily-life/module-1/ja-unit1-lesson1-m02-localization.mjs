import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 2 / Unit 1 / Lesson 1
// (ja-daily_life-m02-u1-l1, "程度に応じたお礼の言い方" / "Cảm ơn theo mức độ").
// Same machinery as U1 L1-L3 / U2 L1-L2: every Vietnamese learner-support
// string used in ja-unit1-lesson1-m02.mjs must have an en/ja row here or
// generation fails loud. Japanese learning content is NGUYÊN VĂN from
// local-sources/ja/ban1.txt + topic1.json/topic2.json/topic3.json (see the
// source header in ja-unit1-lesson1-m02.mjs); only the Vietnamese support
// text is translated here.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Cảm ơn & đáp lại', 'Saying Thanks & Responding', '感謝とその返事');
add('Cảm ơn theo mức độ', 'Thank Someone at Different Levels', '程度に応じたお礼の言い方');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Cảm ơn lịch sự khi việc còn đang xảy ra bằng ありがとうございます.', 'Thank someone politely while something is still happening, with ありがとうございます.', '「ありがとうございます」で、まだ続いていることに丁寧にお礼を言えます。');
add('Cảm ơn lịch sự khi việc đã xong bằng ありがとうございました.', 'Thank someone politely once something is finished, with ありがとうございました.', '「ありがとうございました」で、終わったことに丁寧にお礼を言えます。');
add('Cảm ơn bạn bè bằng thể thường ありがとう.', 'Thank friends with the plain form ありがとう.', '「ありがとう」（普通体）で友達にお礼を言えます。');
add('Cảm ơn ngắn gọn, thân mật bằng どうも.', 'Give a short, casual thanks with どうも.', '「どうも」で気軽に短くお礼を言えます。');
add('Nhấn mạnh lời cảm ơn lịch sự bằng どうもありがとうございます.', 'Emphasize a polite thanks with どうもありがとうございます.', '「どうもありがとうございます」で丁寧なお礼を強調できます。');
add('Nói 助かります／助かりました khi ai đó giúp ích cho mình.', 'Say 助かります／助かりました when someone has helped you.', '助けてもらったときに「助かります／助かりました」と言えます。');
add('Chọn đúng mức lịch sự và đúng thì (đang xảy ra hay đã xong) theo tình huống.', 'Choose the right level of politeness and the right tense (ongoing or finished) for the situation.', '場面に合わせて、丁寧さのレベルと時制（進行中か終わったか）を正しく選べます。');

// ── Intro situation ──────────────────────────────────────────────────────
add('Ai đó vừa giúp bạn một việc, hoặc đang giúp bạn ngay lúc này.', 'Someone has just helped you with something, or is helping you right now.', '誰かが何かを手伝ってくれたところか、今まさに手伝ってくれています。');
add('Bạn cảm ơn theo đúng mức lịch sự và đúng thời điểm của việc đó.', 'You thank them at the right level of politeness and at the right point in time.', 'その状況に合った丁寧さとタイミングでお礼を言います。');

// ── Intro example labels ────────────────────────────────────────────────
add('Việc đang xảy ra, lịch sự:', 'Something ongoing, politely:', '進行中のこと、丁寧に：');
add('Việc đã xong, lịch sự:', 'Something finished, politely:', '終わったこと、丁寧に：');
add('Với bạn thân:', 'With a close friend:', '親しい友達には：');
add('Cảm ơn anh/chị nhiều ạ.', 'Thank you very much.', 'ありがとうございました。');

// ── Intro important note ────────────────────────────────────────────────
add('ございます nói khi việc còn đang xảy ra; ございました (thì quá khứ) nói khi việc đã xong.', 'ございます is said while something is still happening; ございました (past tense) is said once it is finished.', '「ございます」はまだ続いていることに、「ございました」（過去形）は終わったことに使います。');
add('Bỏ ございます／ございました khỏi ありがとう thì thành thể thường, dùng với bạn bè.', 'Drop ございます／ございました from ありがとう and it becomes the plain form, used with friends.', '「ありがとう」から「ございます／ございました」を取ると普通体になり、友達に使います。');
add('どうも có thể đứng riêng (thân mật) hoặc ghép trước ありがとうございます để nhấn mạnh.', 'どうも can stand alone (casual) or be added before ありがとうございます for emphasis.', '「どうも」は単独（カジュアル）でも、「ありがとうございます」の前に付けて強調するのにも使えます。');

// ── Vocabulary meanings (Card 2 + overview) ─────────────────────────────
add('Cảm ơn (thân mật, ngắn gọn).', 'Thanks (casual, brief).', 'どうも（カジュアルで短い）。');
add('Cảm ơn (thân mật).', 'Thanks (casual).', 'ありがとう（カジュアル）。');
add('Cảm ơn (lịch sự, việc đang xảy ra).', 'Thank you (polite, ongoing).', 'ありがとうございます（丁寧、進行中）。');
add('Cảm ơn (lịch sự, việc đã xong).', 'Thank you (polite, finished).', 'ありがとうございました（丁寧、終わったこと）。');
add('Cảm ơn rất nhiều (lịch sự, nhấn mạnh).', 'Thank you very much (polite, emphatic).', 'どうもありがとうございます（丁寧、強調）。');
add('Việc đó giúp ích cho tôi (đang/sắp xảy ra).', 'That helps me (ongoing/about to happen).', '助かります（進行中・これから）。');
add('Việc đó đã giúp ích cho tôi (đã xong).', 'That helped me (already finished).', '助かりました（終わったこと）。');

// ── Register labels (§B2e — từ vựng ĐÓNG, đúng ba mức) ──────────────────
add('Lịch sự.', 'Polite.', '丁寧。');
add('Thân mật.', 'Casual.', 'カジュアル。');

// ── Vocabulary detail fields (§B2c) ─────────────────────────────────────
add('Cảm ơn ngắn gọn, thân mật, thường sau khi được giúp một việc nhỏ.', 'A short, casual thanks, usually after being helped with something small.', '小さなことを手伝ってもらったあと、気軽に短くお礼を言うとき。');
add('Cảm ơn thân mật, giữa những người đã thân.', 'A casual thanks, between people who are close.', '親しい相手同士で、カジュアルにお礼を言うとき。');
add('Cảm ơn lịch sự khi việc còn đang xảy ra hoặc nói chung.', 'A polite thanks while something is still happening, or in general.', '物事が進行中のとき、または一般的に丁寧にお礼を言うとき。');
add('Cảm ơn lịch sự khi việc đã xong, đã hoàn tất.', 'A polite thanks once something is finished, completed.', '物事が終わった、完了したときに丁寧にお礼を言うとき。');
add('Cảm ơn lịch sự, nhấn mạnh hơn ありがとうございます thông thường.', 'A polite thanks, more emphatic than the plain ありがとうございます.', '通常の「ありがとうございます」より強調した丁寧なお礼。');
add('Nói khi ai đó đang hoặc sắp giúp ích cho mình, lịch sự.', 'Said when someone is helping or about to help you, politely.', '誰かが手伝ってくれている、またはこれから手伝ってくれるときに、丁寧に。');
add('Nói khi việc giúp ích đó ĐÃ xảy ra, đã xong, lịch sự.', 'Said when that help has ALREADY happened, is finished, politely.', 'その助けがすでに起こった、終わったときに、丁寧に。');
add('Bạn bè', 'Friends', '友達');
add('Người ngang hàng đã thân', 'Close peers', '親しい同等の相手');
add('Thầy cô', 'Teachers', '先生');
add('Người trên', 'Seniors', '目上の人');
add('Người quen', 'Acquaintances', '知り合い');
add('Đồng nghiệp', 'Colleagues', '同僚');
add('Không dùng với thầy cô hoặc người trên.', 'Do not use it with a teacher or a senior.', '先生や目上の人には使いません。');
add('Không dùng dạng trần này với thầy cô hoặc người trên.', 'Do not use this plain form with a teacher or a senior.', 'この普通体は先生や目上の人には使いません。');
add('Không dùng khi việc chưa xảy ra hoặc còn đang diễn ra.', 'Do not use it when something has not happened yet or is still ongoing.', 'まだ起きていない、または進行中のことには使いません。');
add('Cách trang trọng hơn:', 'More formal form:', 'より改まった言い方：');
add('Cách thân mật chuẩn:', 'Standard casual form:', 'カジュアルな言い方：');
add('Dùng với:', 'Use with:', '使う相手：');
add('Khác ありがとうございました: câu này dùng khi việc CHƯA/ĐANG xảy ra, không phải đã xong.', 'Different from ありがとうございました: this one is used when something has NOT happened yet or is ONGOING, not finished.', '「ありがとうございました」とは違い、これはまだ起きていない、または進行中のことに使い、終わったことには使いません。');
add('Thì quá khứ ました đánh dấu việc đã hoàn tất — khác ありがとうございます.', 'The past-tense ました marks completion — different from ありがとうございます.', '過去形の「ました」は完了を表します。「ありがとうございます」とは違います。');
add('どうも ghép thêm vào trước ありがとうございます để nhấn mạnh — không tạo thể mới, chỉ thêm mức nhấn.', 'どうも is added before ありがとうございます for emphasis — it does not create a new form, only adds emphasis.', '「どうも」は「ありがとうございます」の前に付けて強調するもので、新しい体を作るのではなく強調を加えるだけです。');
add('Cùng cặp thì đang xảy ra/đã xong như ありがとうございます／ました.', 'The same ongoing/finished pair as ありがとうございます／ました.', '「ありがとうございます／ました」と同じ、進行中・終了の対です。');

// ── Vocabulary references (§B2b — cách dùng MỚI của từ đã dạy) ─────────
add('Cách dùng MỚI của từ đã học ở bài trước: cảm ơn vì đã làm phiền người khác (khác nghĩa xin lỗi đã học). ありがとうございます thuần cảm ơn; すみません pha thêm ý áy náy vì làm phiền.', 'A NEW usage of a word learned earlier: thanking someone for the trouble you caused them (different from the apology sense learned before). ありがとうございます is thanks alone; すみません adds a sense of being sorry for the trouble.', '以前学んだ言葉の新しい使い方：相手に迷惑をかけたことへのお礼（以前学んだ謝罪の意味とは違います）。「ありがとうございます」は純粋なお礼、「すみません」は迷惑をかけた申し訳なさが加わります。');
add('Cảm ơn vì đã làm phiền anh/chị.', 'Thanks for the trouble.', 'ご面倒をおかけしてすみません。');
add('Cách dùng MỚI của từ đã học ở bài trước: cảm ơn tổng quát nhờ có sự giúp đỡ (khác câu đáp hỏi thăm sức khoẻ đã học). Nhấn vào công của người kia, mạnh hơn 助かりました.', 'A NEW usage of a word learned earlier: a general thanks for someone’s help (different from the “how are you” reply learned before). It emphasizes the other person’s contribution, stronger than 助かりました.', '以前学んだ言葉の新しい使い方：助けてもらったことへの一般的なお礼（以前学んだ安否確認への返事とは違います）。相手の働きを強調し、「助かりました」より強い言い方です。');
add('Nhờ anh/chị mà tôi đỡ vất vả hơn nhiều.', 'Thanks to you, it was much easier for me.', 'おかげさまで、だいぶ楽になりました。');

// ── Card 3 · dialogue groups ────────────────────────────────────────────
add('Lịch sự — việc đang xảy ra', 'Polite — ongoing', '丁寧——進行中');
add('Vai vế: khách và nhân viên khách sạn, chưa quen biết trước — quan hệ mang tính công việc nên cả hai giữ thể lịch sự. Bối cảnh: khách hỏi đường tới nhà hàng, nhân viên đang tìm bản đồ giúp khách NGAY LÚC ĐÓ (việc chưa xong).', 'Roles: a guest and a hotel staff member, not previously acquainted — a service relationship, so both keep the polite form. Setting: the guest asks about a restaurant, and the staff member is fetching a map RIGHT THEN (not yet finished).', '関係：ホテルの客とスタッフで、以前からの知り合いではありません。仕事上の関係なので、二人とも丁寧体を使います。場面：客がレストランへの道をたずね、スタッフがちょうど地図を持ってきているところです（まだ終わっていません）。');
add('Vâng, xin chị chỉ giúp tôi.', 'Yes, please tell me.', 'はい、教えてください。');
add('Tôi mang bản đồ tới ngay đây ạ.', 'I will bring the map right now.', '今、地図をお持ちしますね。');
add('Cảm ơn chị.', 'Thank you.', 'ありがとうございます。');
add('Nhân viên ĐANG đi lấy bản đồ, việc còn chưa xong — khách cảm ơn bằng ありがとうございます, không phải ありがとうございました.', 'The staff member is STILL fetching the map — it is not finished yet, so the guest thanks them with ありがとうございます, not ありがとうございました.', 'スタッフはまだ地図を持ってきている途中で、終わっていません。だから客は「ありがとうございました」ではなく「ありがとうございます」でお礼を言います。');
add('Cả hai giữ thể lịch sự vì là quan hệ khách – nhân viên, không quen biết trước.', 'Both keep the polite form because it is a guest–staff relationship, with no prior acquaintance.', '客とスタッフの関係で、以前からの知り合いではないため、二人とも丁寧体を保ちます。');
add('Thân mật', 'Casual', 'カジュアル');
add('Vai vế: khách hàng và nhân viên cửa hàng. Nhân viên luôn giữ thể lịch sự vì tính chất công việc, nhưng khách hàng có thể đáp lại bằng thể thân mật — đây là vai vế xã hội của khách hàng, không phải mức độ thân quen. Bối cảnh: nhân viên vừa đưa xong món hàng cho khách.', 'Roles: a customer and a shop clerk. The clerk always keeps the polite form because of the job, but the customer may reply casually — this is the customer’s social standing, not a matter of closeness. Setting: the clerk has just handed the item to the customer.', '関係：客と店員です。店員は仕事の性質上、常に丁寧体を使いますが、客はカジュアルに返すことがあります——これは客という社会的立場によるもので、親しさとは関係ありません。場面：店員がちょうど客に商品を渡したところです。');
add('Vâng ạ, đây ạ.', 'Certainly, here you are.', 'かしこまりました。こちらになります。');
add('Cảm ơn nhé.', 'Thanks.', 'ありがとう。');
add('Khách hàng dùng thể thân mật ありがとう dù nhân viên vẫn giữ thể lịch sự かしこまりました.', 'The customer uses the casual ありがとう even though the clerk keeps the polite かしこまりました.', '店員が丁寧な「かしこまりました」を使っていても、客はカジュアルな「ありがとう」を使います。');
add('Vai vế của khách hàng cho phép thân mật hơn, khác với vai vế ngang hàng đã học ở bài trước.', 'The customer’s standing allows for more casualness, unlike the equal-standing relationship learned in an earlier lesson.', '客という立場は、より気軽な話し方を許します。以前学んだ対等な関係とは異なります。');
add('Lịch sự — việc đã xong', 'Polite — finished', '丁寧——完了');
add('Vai vế: hai người ngang vai trong chuyến du lịch, giữ thể lịch sự — theo logic đã dùng ở các bài trước (thể lịch sự quan sát được ⇒ chưa đủ thân để chuyển sang thể thường). Bối cảnh: một người vừa nhờ người kia chụp ảnh xong.', 'Roles: two people of equal standing on a trip, keeping the polite form — following the same logic used in earlier lessons (polite form observed ⇒ not yet close enough to switch to the plain form). Setting: one has just finished asking the other to take a photo.', '関係：旅行中の対等な二人で、丁寧体を使っています——以前のレッスンと同じ考え方です（丁寧体が見られる＝普通体に変えるほど親しくはない）。場面：一方がもう一方に写真を撮ってもらい、ちょうど終わったところです。');
add('Ở phía trên bên phải.', 'It is at the top right.', '右上にあります。');
add('Phía trên bên phải, rõ rồi. Tôi chụp đây. Kiểu này được không?', 'Top right, got it. I will take it now. How does this look?', '右上ですね。では撮りますよ。このような感じでどうですか？');
add('Vâng, cảm ơn anh/chị nhiều ạ.', 'Yes, thank you very much.', 'はい、ありがとうございました。');
add('Ảnh đã chụp XONG nên 田中 cảm ơn bằng ありがとうございました (thì quá khứ), không phải ありがとうございます.', 'The photo is FINISHED, so 田中 thanks them with ありがとうございました (past tense), not ありがとうございます.', '写真はもう撮り終わったので、田中さんは「ありがとうございます」ではなく「ありがとうございました」（過去形）でお礼を言います。');
add('Cùng là thể lịch sự nhưng khác nhóm đầu ở chỗ việc đã hoàn tất.', 'Still the polite form, but unlike the first group, the matter here is already completed.', '同じ丁寧体ですが、最初のグループとは違い、こちらは物事がすでに完了しています。');

// ── Card 4 · grammar patterns ───────────────────────────────────────────
add('ありがとう ↔ ありがとうございます', 'ありがとう ↔ ありがとうございます', 'ありがとう ↔ ありがとうございます');
add('Cùng lời cảm ơn, hai thể.', 'The same thanks, in two forms.', '同じお礼を、二つの体で。');
add('Thêm ございます ở cuối là thể lịch sự; bỏ đi là thể thường.', 'Adding ございます at the end gives the polite form; dropping it gives the plain form.', '終わりに「ございます」を足すと丁寧体、取ると普通体です。');
add('ありがとうございます ↔ ありがとうございました', 'ありがとうございます ↔ ありがとうございました', 'ありがとうございます ↔ ありがとうございました');
add('Cùng lời cảm ơn lịch sự, khác ở việc đang xảy ra hay đã xong.', 'The same polite thanks, differing in whether something is ongoing or finished.', '同じ丁寧なお礼ですが、進行中か終わったかで違います。');
add('ございます dùng khi việc còn đang xảy ra; ございました (thì quá khứ) dùng khi việc đã xong.', 'ございます is used while something is still happening; ございました (past tense) is used once it is finished.', '「ございます」は進行中のことに、「ございました」（過去形）は終わったことに使います。');
add('どうも (đứng riêng)', 'どうも (standing alone)', 'どうも（単独）');
add('Cảm ơn ngắn gọn, thân mật, đứng một mình.', 'A short, casual thanks, standing alone.', '短くカジュアルなお礼で、単独で使います。');
add('À, cảm ơn nhé.', 'Ah, thanks.', 'あ、どうも。');
add('どうも có thể đứng riêng làm câu cảm ơn đầy đủ, không cần thêm từ khác.', 'どうも can stand alone as a complete thanks, with no other words needed.', '「どうも」は単独で完全なお礼の文になり、他の言葉を足す必要はありません。');
add('どうも ＋ ありがとうございます → どうもありがとうございます', 'どうも ＋ ありがとうございます → どうもありがとうございます', 'どうも ＋ ありがとうございます → どうもありがとうございます');
add('Ghép どうも vào trước câu cảm ơn lịch sự để nhấn mạnh.', 'Add どうも before a polite thanks to emphasize it.', '丁寧なお礼の前に「どうも」を付けて強調します。');
add('Cảm ơn cô rất nhiều ạ.', 'Thank you very much.', 'どうもありがとうございます。');
add('どうも ghép thêm vào KHÔNG đổi thể của ありがとうございます, chỉ thêm mức nhấn mạnh.', 'Adding どうも does NOT change the form of ありがとうございます, it only adds emphasis.', '「どうも」を足しても「ありがとうございます」の体は変わらず、強調が加わるだけです。');
add('助かります ↔ 助かりました', '助かります ↔ 助かりました', '助かります ↔ 助かりました');
add('Cùng ý việc đó giúp ích, khác ở việc đang xảy ra hay đã xong.', 'The same sense of being helped, differing in whether it is ongoing or finished.', '助けになるという同じ意味ですが、進行中か終わったかで違います。');
add('Vậy thì đỡ cho tôi quá.', 'That really helps me.', '助かります。');
add('Việc đó đã giúp tôi nhiều lắm.', 'That really helped me a lot.', '助かりました。');
add('Cùng cơ chế với ありがとうございます／ました: ます là đang xảy ra, ました là đã xong.', 'The same mechanism as ありがとうございます／ました: ます for ongoing, ました for finished.', '「ありがとうございます／ました」と同じしくみです。「ます」は進行中、「ました」は終了を表します。');

// ── Card 5 · practice shell ─────────────────────────────────────────────
add('Bài tập', 'Practice', '練習');
add('Khoảng 8–10 phút', 'About 8–10 minutes', '約8〜10分');
add('Từ vựng · Hội thoại · Ngữ pháp', 'Vocabulary · Dialogue · Grammar', '語彙・会話・文法');
add('Luyện tập cơ bản', 'Basic practice', '基本練習');
add('Câu 1–9', 'Questions 1–9', '第1問〜第9問');
add('Từ vựng · Nghe · Ngữ pháp\nHội thoại', 'Vocabulary · Listening · Grammar\nDialogue', '語彙・聴解・文法\n会話');
add('Luyện tập nâng cao', 'Advanced practice', '応用練習');
add('Câu 10–14', 'Questions 10–14', '第10問〜第14問');
add('Tình huống thực tế\nHội thoại thực hành nâng cao', 'Real situations\nAdvanced practice dialogue', '実際の場面\n応用会話練習');

// ── Q1-Q13 prompts, options, feedback ───────────────────────────────────
add('Một người quen đang giúp bạn NGAY BÂY GIỜ (việc chưa xong), trong tình huống cần lịch sự.', 'An acquaintance is helping you RIGHT NOW (not yet finished), in a situation that calls for politeness.', '知り合いが今まさに（まだ終わっていないことを）手伝ってくれています。丁寧さが必要な場面です。');
add('Một người quen đang giúp bạn NGAY BÂY GIỜ, trong tình huống cần lịch sự. Nói gì?', 'An acquaintance is helping you RIGHT NOW, in a situation that calls for politeness. What do you say?', '知り合いが今まさに手伝ってくれています。丁寧さが必要な場面です。何と言いますか。');
add('ありがとうございます dùng khi việc còn đang diễn ra; ありがとうございました dùng khi việc đã xong. ありがとう và どうも là thể thân mật, không hợp tình huống cần lịch sự.', 'ありがとうございます is used while something is still happening; ありがとうございました is used once it is finished. ありがとう and どうも are casual forms, not suited to a situation that calls for politeness.', '「ありがとうございます」は進行中のことに、「ありがとうございました」は終わったことに使います。「ありがとう」と「どうも」はカジュアルな形で、丁寧さが必要な場面には合いません。');
add('Một người bạn thân vừa giúp bạn xong, trong tình huống thân mật.', 'A close friend has just finished helping you, in a casual situation.', '親しい友達が手伝い終えたところです。カジュアルな場面です。');
add('Một người bạn thân vừa giúp bạn xong, trong tình huống thân mật. Nói gì?', 'A close friend has just finished helping you, in a casual situation. What do you say?', '親しい友達が手伝い終えたところです。カジュアルな場面です。何と言いますか。');
add('Với bạn thân dùng thể thường ありがとう. ありがとうございます／ございました là thể lịch sự. 助かりました cũng là thể lịch sự.', 'With a close friend, use the plain form ありがとう. ありがとうございます／ございました are polite forms. 助かりました is also polite.', '親しい友達には普通体の「ありがとう」を使います。「ありがとうございます／ございました」は丁寧体です。「助かりました」も丁寧体です。');
add('Nối mỗi câu với thể của nó.', 'Match each phrase with its form.', 'それぞれの表現と体を結んでください。');
add('Cảm ơn — việc đang xảy ra, lịch sự', 'Thanks — ongoing, polite', 'お礼——進行中、丁寧');
add('Cảm ơn — thân mật', 'Thanks — casual', 'お礼——カジュアル');
add('Cảm ơn — việc đã xong, lịch sự', 'Thanks — finished, polite', 'お礼——完了、丁寧');
add('Cảm ơn — thân mật, đứng riêng', 'Thanks — casual, standing alone', 'お礼——カジュアル、単独');
add('Cùng ý cảm ơn nhưng khác nhau ở mức lịch sự và ở việc còn đang xảy ra hay đã xong.', 'The same idea of thanks, differing in politeness level and in whether something is ongoing or finished.', 'お礼という同じ意味ですが、丁寧さのレベルと、進行中か終わったかが違います。');
add('Sắp xếp thành câu cảm ơn lịch sự, nhấn mạnh.', 'Arrange the emphatic, polite thanks.', '強調した丁寧なお礼の文に並べかえてください。');
add('どうも + ありがとう + ございます → どうもありがとうございます。 うん và もう không dùng ở đây.', 'どうも + ありがとう + ございます → どうもありがとうございます。 うん and もう are not used here.', '「どうも」＋「ありがとう」＋「ございます」→「どうもありがとうございます」。「うん」と「もう」はここでは使いません。');
add('Hai người bạn thân: một người vừa giúp việc nhỏ, người kia cảm ơn thân mật.', 'Two close friends: one has just helped with something small, and the other thanks them casually.', '親しい友達二人：一方が小さなことを手伝ってくれたところで、もう一方がカジュアルにお礼を言います。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄をうめて会話を完成させてください。');
add('Bạn thân đáp lại bằng thể thường ありがとう, không dùng thể lịch sự.', 'A close friend replies with the plain form ありがとう, not the polite form.', '親しい友達は普通体の「ありがとう」で返し、丁寧体は使いません。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今、どの文を聞きましたか。');
add('Xin lỗi', 'Sorry', 'すみません');
add('Câu nghe được là ありがとうございました — thì quá khứ nghĩa là việc đã xong.', 'The sentence you heard is ありがとうございました — the past tense means it is finished.', '聞こえた文は「ありがとうございました」です。過去形なので終わったことを意味します。');
add('Một người quen vừa giúp xong một việc cho bạn (việc đã hoàn tất), trong tình huống cần lịch sự.', 'An acquaintance has just finished helping you with something (already completed), in a situation that calls for politeness.', '知り合いが何かを手伝い終えたところです（完了しています）。丁寧さが必要な場面です。');
add('Một người quen vừa giúp xong một việc cho bạn, trong tình huống cần lịch sự. Nói gì?', 'An acquaintance has just finished helping you with something, in a situation that calls for politeness. What do you say?', '知り合いが何かを手伝い終えたところです。丁寧さが必要な場面です。何と言いますか。');
add('Việc đã xong thì dùng thì quá khứ ありがとうございました. ありがとうございます hợp khi việc còn đang xảy ra. ありがとう／どうも là thể thân mật.', 'Once something is finished, use the past tense ありがとうございました. ありがとうございます fits while it is still ongoing. ありがとう／どうも are casual forms.', '終わったことには過去形の「ありがとうございました」を使います。「ありがとうございます」は進行中のことに合います。「ありがとう／どうも」はカジュアルな形です。');
add('「助かります」 dùng khi nào?', 'When is 「助かります」 used?', '「助かります」はいつ使いますか。');
add('Khi ai đó đang/sắp giúp bạn một việc, lịch sự', 'When someone is helping or about to help you with something, politely', '誰かが何かを手伝ってくれている、またはこれから手伝ってくれるとき、丁寧に');
add('Khi chào hỏi lần đầu', 'When greeting someone for the first time', '初めて会ってあいさつするとき');
add('Khi xin lỗi', 'When apologizing', '謝るとき');
add('Khi chia tay', 'When saying goodbye', '別れるとき');
add('助かります nghĩa là việc đó giúp ích cho bạn — nói khi ai đó đang hoặc sắp giúp bạn.', '助かります means that something is helpful to you — said when someone is helping or about to help you.', '「助かります」はそのことが自分の助けになるという意味です。誰かが手伝ってくれている、またはこれから手伝ってくれるときに使います。');
add('Checkpoint 5 câu nhỏ', 'Checkpoint: 5 short questions', 'チェックポイント：小問5つ');
add('ありがとうございます thuộc thể nào?', 'Which form is ありがとうございます?', '「ありがとうございます」はどの体ですか。');
add('Thể lịch sự', 'The polite form', '丁寧体');
add('Thể thường', 'The plain form', '普通体');
add('Cả hai như nhau', 'Both are the same', 'どちらも同じ');
add('Không thuộc thể nào', 'Neither form', 'どちらでもない');
add('Có ございます ở cuối — dấu hiệu của thể lịch sự.', 'It has ございます at the end — the mark of the polite form.', '終わりに「ございます」があります。丁寧体のしるしです。');
add('Bỏ ございます khỏi ありがとうございます thì còn gì?', 'What remains when you drop ございます from ありがとうございます?', '「ありがとうございます」から「ございます」を取ると何が残りますか。');
add('ありがとうございます → ありがとう là cặp lịch sự ↔ thân mật.', 'ありがとうございます → ありがとう is the polite ↔ casual pair.', '「ありがとうございます」→「ありがとう」は丁寧とカジュアルの対です。');
add('Việc đã xong, lịch sự thì nói gì?', 'What do you say when something is finished, politely?', '終わったことを丁寧に言うとどうなりますか。');
add('Thì quá khứ ました đánh dấu việc đã hoàn tất.', 'The past-tense ました marks that something is completed.', '過去形の「ました」は完了を表します。');
add('どうもありがとうございます ghép từ mấy phần?', 'How many parts make up どうもありがとうございます?', '「どうもありがとうございます」はいくつの部分からできていますか。');
add('3 phần: どうも + ありがとう + ございます', '3 parts: どうも + ありがとう + ございます', '3つの部分：どうも＋ありがとう＋ございます');
add('2 phần', '2 parts', '2つの部分');
add('1 phần, không ghép được', '1 part, it cannot be split', '1つの部分、分けられない');
add('4 phần', '4 parts', '4つの部分');
add('どうも ghép thêm vào ありがとうございます để nhấn mạnh.', 'どうも is added to ありがとうございます for emphasis.', '「どうも」は「ありがとうございます」に足して強調します。');
add('助かりました khác 助かります ở điểm nào?', 'How does 助かりました differ from 助かります?', '「助かりました」は「助かります」とどう違いますか。');
add('助かりました là việc đã xong (quá khứ)', '助かりました is something finished (past tense)', '「助かりました」は終わったこと（過去形）');
add('助かりました lịch sự hơn', '助かりました is more polite', '「助かりました」の方が丁寧');
add('Nghĩa hoàn toàn khác nhau', 'The meanings are completely different', '意味がまったく違う');
add('Không khác gì', 'There is no difference', '違いはない');
add('ました đánh dấu việc đã hoàn tất, giống cặp ございます/ございました.', 'ました marks completion, like the ございます/ございました pair.', '「ました」は完了を表します。「ございます／ございました」の対と同じです。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させてください');
add('Hai người quen nhắn tin cho nhau, cả hai đều dùng thể lịch sự: một người nhờ giúp việc, người kia đồng ý và được cảm ơn. Nhập từ phù hợp vào hai ô trống.', 'Two acquaintances are messaging, both using the polite form: one asks for help, the other agrees and is thanked. Type the right words in the two blanks.', '知り合い二人がメッセージをやりとりします。二人とも丁寧体を使います。一方が手伝いを頼み、もう一方が引き受けてお礼を言われます。二つの空欄に合う言葉を入力してください。');
add('Bạn làm tốt lắm!', 'Well done!', 'よくできました！');
add('Ô này đáp lại việc đang được giúp, ở thể lịch sự.', 'This blank replies to being helped right now, in the polite form.', 'この空欄は、今手伝ってもらっていることへの丁寧な返事です。');
add('Được giúp ngay lúc đó thì đáp lịch sự bằng ありがとうございます.', 'Being helped right then calls for a polite ありがとうございます.', 'その場で手伝ってもらったら、丁寧に「ありがとうございます」と答えます。');
add('Ô này nói việc đó giúp ích cho mình, ở thể lịch sự.', 'This blank says that it helps you, in the polite form.', 'この空欄は、それが自分の助けになることを丁寧に言います。');
add('助かります nhấn thêm rằng việc đó thực sự giúp ích.', '助かります further emphasizes that it truly helps.', '「助かります」は本当に助けになることをさらに強調します。');
add('Sắp xếp thành câu cảm ơn thân mật. Có thẻ không cần dùng.', 'Arrange the casual thanks. Some cards are not needed.', 'カジュアルなお礼の文に並べかえてください。使わないカードがあります。');
add('どうも đứng riêng là câu cảm ơn thân mật đầy đủ. ございます／ございました là thể lịch sự, không đi cùng câu ngắn này.', 'どうも standing alone is a complete casual thanks. ございます／ございました are polite forms and do not belong in this short sentence.', '「どうも」は単独で完全なカジュアルなお礼になります。「ございます／ございました」は丁寧体で、この短い文には合いません。');
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '一番自然な会話を選んでください。');
add('A tự nhiên: được giúp thì cảm ơn thân mật ngay. B lệch vì A hỏi/nói lịch sự mà B lại đáp thân mật. C thừa và ghép sai (ございました + ございます không đi cùng nhau). D sai thì: việc CHƯA xảy ra mà đã dùng quá khứ.', 'A is natural: being helped is met with an immediate casual thanks. B is off because A speaks politely while B replies casually. C is padded and wrongly combined (ございました + ございます do not go together). D has the wrong tense: something has NOT happened yet, but the past tense is used.', 'Aは自然です。手伝ってもらったらすぐカジュアルにお礼を言います。Bはずれます。Aが丁寧に話しているのにBがカジュアルに答えているからです。Cは余計で組み合わせも誤りです（「ございました」＋「ございます」は一緒に使いません）。Dは時制が誤りです。まだ起きていないのに過去形を使っています。');
add('Sắp xếp thành câu cảm ơn lịch sự, việc đã xong. Có thẻ không cần dùng.', 'Arrange the polite thanks for something finished. Some cards are not needed.', '終わったことへの丁寧なお礼の文に並べかえてください。使わないカードがあります。');
add('ありがとう + ございました → ありがとうございました。 うん là thể thường, ございます là việc đang xảy ra — cả hai không hợp câu này.', 'ありがとう + ございました → ありがとうございました。 うん is the plain form, and ございます marks something ongoing — neither fits this sentence.', '「ありがとう」＋「ございました」→「ありがとうございました」。「うん」は普通体、「ございます」は進行中のことを表すので、どちらもこの文には合いません。');

// ── Q14 scenario + dialogue line translations ───────────────────────────
add('Ba cách cảm ơn khác mức độ', 'Three thanks at different levels', 'レベルの違う三つのお礼');
add('Vai vế: ba tình huống khác nhau — hai lần với người chưa thân (khách sạn, ngoài đường) và một lần với bạn thân. Cùng là được giúp, nhưng mức lịch sự và việc đang xảy ra hay đã xong khiến câu cảm ơn khác nhau.', 'Roles: three different situations — twice with people who are not close (a hotel, outdoors) and once with a close friend. The same act of being helped, but the level of politeness and whether something is ongoing or finished make the thanks different.', '関係：三つの異なる場面です。親しくない相手が二回（ホテル、外）、親しい友達が一回。同じ「助けてもらう」ことでも、丁寧さのレベルと進行中か終わったかでお礼の言い方が変わります。');
add('Để tôi giúp cho.', 'Let me help you.', '手伝いますよ。');
add('Anh/chị chụp giúp tôi một tấm ảnh với tượng Hachiko được không?', 'Could you take a photo of me with the Hachiko statue?', 'ハチ公と一緒に写真を撮ってもらえませんか？');
add('Được chứ. Nút chụp ở đâu vậy?', 'Sure. Where is the shutter button?', 'よいですよ。シャッターはどこですか？');
add('Một ngày khác', 'Another day', 'べつの日');

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
            `[m02u1l1-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[m02u1l1-support] missing en/ja translation for Vietnamese support ` +
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
