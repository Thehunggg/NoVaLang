import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 1 / Unit 1 / Lesson 3
// (ja-daily_life-m01-u1-l3, "自己紹介への返事とお別れのあいさつ" / "Đáp làm
// quen & tạm biệt"). Same machinery as L1/L2: every Vietnamese learner-support
// string used in ja-unit1-lesson3.mjs must have an en/ja row here or generation
// fails loud. Japanese learning content is the authored source (bám giáo trình
// sơ cấp Minna/Genki/Marugoto); only the Vietnamese support text is translated.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Làm quen lần đầu', 'Meeting for the First Time', '初めて知り合う');
add('Đáp làm quen & tạm biệt', 'Respond When Introduced & Say Goodbye', '自己紹介への返事とお別れのあいさつ');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Đáp lại lời làm quen bằng こちらこそ.', 'Respond to an introduction with こちらこそ.', '「こちらこそ」で自己紹介に返事ができます。');
add('Nói tôi cũng vậy bằng 私も.', 'Say “me too” with 私も.', '「私も」で「自分も同じ」と言えます。');
add('Xác nhận điều vừa nghe bằng そうですか.', 'Acknowledge what you heard with そうですか.', '「そうですか」で聞いたことに相づちを打てます。');
add('Rời đi một cách lịch sự bằng 失礼します.', 'Leave politely with 失礼します.', '「失礼します」で丁寧にその場を離れられます。');
add('Nói xin phép về trước bằng お先に失礼します.', 'Say you are leaving first with お先に失礼します.', '「お先に失礼します」で先に帰ると伝えられます。');
add('Hẹn gặp lại bằng mẫu また＋[mốc thời gian].', 'Arrange to meet again with また＋[time].', '「また＋[時]」で次に会う約束ができます。');
add('Chào tạm biệt thân mật bằng じゃあ、また và dặn お元気で.', 'Say a casual goodbye with じゃあ、また and お元気で.', '「じゃあ、また」「お元気で」でカジュアルにお別れできます。');
add('Chọn cách tạm biệt phù hợp với quan hệ và tình huống.', 'Choose a farewell that fits the relationship and situation.', '相手や場面に合ったお別れのあいさつを選べます。');

// ── Intro situation ─────────────────────────────────────────────────────
add('Bạn vừa làm quen xong với một người mới.', 'You have just finished getting acquainted with someone new.', '新しい人と知り合ったところです。');
add('Bây giờ bạn đáp lại lời làm quen rồi chào tạm biệt cho phù hợp.', 'Now you respond to the introduction and say goodbye appropriately.', '次に、自己紹介に返事をして、場面に合ったお別れのあいさつをします。');

// ── Intro examples (labels + translations) ──────────────────────────────
add('Khi được làm quen, bạn đáp:', 'When introduced, you respond:', '自己紹介をされたら、こう返します。');
add('Khi rời đi, bạn nói:', 'When you leave, you say:', 'その場を離れるとき、こう言います。');
add('Với bạn bè, bạn chào:', 'With friends, you say:', '友達には、こう言います。');

// ── Intro important note ────────────────────────────────────────────────
add('こちらこそ nghĩa là "chính tôi mới là người nên nói vậy" — dùng để đáp lại thiện chí.', 'こちらこそ means “I’m the one who should say that” — used to return goodwill.', '「こちらこそ」は「言うのは自分の方だ」という意味で、相手の気持ちに返すときに使います。');
add('失礼します lịch sự và dùng được với người trên; じゃあ、また thân mật, dùng với bạn bè.', '失礼します is polite and works with superiors; じゃあ、また is casual, for friends.', '「失礼します」は丁寧で目上にも使えます。「じゃあ、また」はカジュアルで友達に使います。');
add('Không dùng じゃあ、また với thầy cô hoặc người mới quen trong hoàn cảnh trang trọng.', 'Don’t use じゃあ、また with teachers or new acquaintances in a formal setting.', '先生や、改まった場面で初対面の人には「じゃあ、また」を使いません。');

// ── Vocabulary meanings (headwords) ─────────────────────────────────────
add('Tôi cũng vậy / Chính tôi mới phải nói thế.', 'Likewise. / I’m the one who should say that.', 'こちらこそ。（言うのは自分の方です。）');
add('Rất mong được làm quen (thân thiện hơn một chút).', 'Nice to meet you (a little warmer).', 'どうぞよろしく。（少し親しみを込めた言い方。）');
add('Vậy à. / Ra vậy.', 'I see. / Is that so.', 'そうですか。');
add('Tôi cũng vậy.', 'Me too. / I also.', '私も。');
add('Tôi xin phép. / Xin lỗi (khi rời đi).', 'Excuse me. / I’ll be going.', '失礼します。（その場を離れるとき。）');
add('Tôi xin phép về trước.', 'Excuse me for leaving before you.', 'お先に失礼します。');
add('Giữ sức khỏe nhé (khi lâu mới gặp lại).', 'Take care (until we meet again).', 'お元気で。');
add('Thôi, hẹn gặp lại (thân mật).', 'Well, see you (casual).', 'じゃあ、また。');

// ── Vocabulary "tham khảo thêm" (reference — optional, §B2b) ─────────────
add('Dạng đầy đủ: こちらこそ、よろしくお願いします。', 'Full form: こちらこそ、よろしくお願いします。', '丁寧な形：こちらこそ、よろしくお願いします。');
add('Thân mật hơn nữa: またね！ / じゃあね。', 'Even more casual: またね！ / じゃあね。', 'もっとカジュアル：またね！／じゃあね。');
add('Khi ai đó đi đường xa: 気をつけて。 (Đi cẩn thận nhé.)', 'When someone is traveling: 気をつけて。 (Take care on your way.)', '出かける相手に：気をつけて。');
add('Cách nói lịch sự khác khi chia tay: では、また。', 'Another polite parting: では、また。', '別の丁寧なお別れ：では、また。');

// ── Vocabulary detail examples & notes ──────────────────────────────────
add('Tôi cũng rất mong được làm quen.', 'Likewise, I look forward to getting to know you.', 'こちらこそ、よろしくお願いします。');
add('Rất vui được gặp. Tôi là Tanaka. Rất mong được làm quen.', 'Nice to meet you. I’m Tanaka. Pleased to meet you.', 'はじめまして。田中です。どうぞよろしく。');
add('Ra vậy. Bạn là Tanaka nhỉ.', 'I see. You’re Tanaka, right?', 'そうですか。田中さんですね。');
add('Tôi cũng mong được làm quen.', 'I look forward to it too.', '私もよろしくお願いします。');
add('Vậy, tôi xin phép.', 'Well then, I’ll be going.', 'では、失礼します。');
add('Tôi xin phép về trước.', 'Excuse me for leaving first.', 'お先に失礼します。');
add('Vậy, giữ sức khỏe nhé.', 'Well then, take care.', 'では、お元気で。');
add('Thôi, hẹn mai gặp.', 'Well, see you tomorrow.', 'じゃあ、また明日。');
add('Trong tình huống thân mật, thường bỏ chủ ngữ và nói ngắn.', 'In casual situations, the subject is often dropped and speech is short.', 'カジュアルな場面では、主語を省いて短く言うことが多いです。');

// ── Dialogue group titles / situations / explanations ───────────────────
add('Đáp lại khi được làm quen', 'Responding when introduced', '自己紹介に返事をする');
add('Hai người vừa giới thiệu tên, một người đáp lại thiện chí.', 'Two people have just given their names; one returns the goodwill.', '二人が名前を伝え、一方が返事をします。');
add('こちらこそ đáp lại lời chúc よろしくお願いします.', 'こちらこそ returns the sentiment of よろしくお願いします.', '「こちらこそ」は「よろしくお願いします」への返事です。');
add('そうですか thể hiện mình đã nghe và tiếp nhận thông tin.', 'そうですか shows you heard and took in the information.', '「そうですか」は、聞いて受け止めたことを表します。');
add('Rời lớp một cách lịch sự', 'Leaving class politely', '丁寧に退出する');
add('Hết buổi, một người xin phép về trước.', 'At the end, one person excuses themselves to leave first.', '終わりに、一人が先に失礼します。');
add('お先に失礼します dùng khi rời đi trước người khác.', 'お先に失礼します is used when leaving before others.', '「お先に失礼します」は、人より先に帰るときに使います。');
add('お元気で dùng khi sẽ lâu mới gặp lại.', 'お元気で is used when you won’t meet again for a while.', '「お元気で」は、しばらく会わないときに使います。');
add('Bạn bè chào tạm biệt', 'Friends saying goodbye', '友達同士のお別れ');
add('Hai người bạn chia tay, hẹn tuần sau.', 'Two friends part, planning to meet next week.', '友達二人が、また来週と言って別れます。');
add('じゃあ、また và また来週 là cách chào thân mật giữa bạn bè.', 'じゃあ、また and また来週 are casual farewells between friends.', '「じゃあ、また」「また来週」は友達同士のカジュアルなお別れです。');

// ── Grammar patterns ────────────────────────────────────────────────────
add('こちらこそ — đáp lại cùng thiện chí', 'こちらこそ — returning the same sentiment', '「こちらこそ」— 気持ちを返す');
add('Đáp lại lời chúc/thiện chí — "chính tôi mới phải nói vậy".', 'Return a greeting or goodwill — “I’m the one who should say that”.', 'あいさつや気持ちに返す—「言うのは自分の方です」。');
add('Đáp lại lời làm quen: A nói よろしくお願いします, B đáp こちらこそ.', 'Responding to an introduction: A says よろしくお願いします, B replies こちらこそ.', '自己紹介への返事：Aが「よろしくお願いします」、Bが「こちらこそ」。');
add('また＋[mốc thời gian]', 'また＋[time]', 'また＋[時]');
add('Hẹn gặp lại vào thời điểm nào đó.', 'Arrange to meet again at some time.', 'いつまた会うかを言います。');
add('Hẹn mai gặp.', 'See you tomorrow.', 'また明日。');
add('Hẹn tuần sau.', 'See you next week.', 'また来週。');
add('Hẹn lát nữa.', 'See you later.', 'また後で。');
add('～も (…cũng…)', '～も (also / too)', '「～も」（…も）');
add('Thêm も sau danh từ để nói "…cũng vậy".', 'Add も after a noun to say “… too”.', '名詞の後に「も」を付けて「…も」と言います。');
add('Tôi cũng xin phép.', 'I’ll be going too.', '私も失礼します。');

// ── Practice meta ───────────────────────────────────────────────────────
add('Bài tập', 'Exercises', '練習');
add('Khoảng 8–10 phút', 'About 8–10 minutes', '約8～10分');
add('Từ vựng · Hội thoại · Ngữ pháp', 'Vocabulary · Dialogue · Grammar', '語彙・会話・文法');
add('Luyện tập cơ bản', 'Core Practice', '基本練習');
add('Câu 1–9', 'Questions 1–9', '第1問～第9問');
add('Từ vựng · Nghe · Ngữ pháp\nHội thoại', 'Vocabulary · Listening · Grammar\nDialogue', '語彙・リスニング・文法\n会話');
add('Luyện tập nâng cao', 'Advanced Practice', '発展練習');
add('Câu 10–14', 'Questions 10–14', '第10問～第14問');
add('Tình huống thực tế\nHội thoại thực hành nâng cao', 'Real-world situations\nAdvanced practice dialogue', '実際の場面\n発展会話練習');

// ── Practice exercises: prompts, options, feedback ──────────────────────
// Q1
add('こちらこそ dùng để làm gì?', 'What is こちらこそ used for?', '「こちらこそ」は何のために使いますか。');
add('Đáp lại lời làm quen với cùng thiện chí', 'To return goodwill when introduced', '自己紹介に同じ気持ちで返す');
add('Hỏi tên người khác', 'To ask someone’s name', '相手の名前を聞く');
add('Chào buổi sáng', 'To say good morning', '朝のあいさつをする');
add('Xin lỗi vì đến muộn', 'To apologize for being late', '遅れたことを謝る');
add('こちらこそ đáp lại lời よろしくお願いします với cùng thiện chí.', 'こちらこそ returns the goodwill of よろしくお願いします.', '「こちらこそ」は「よろしくお願いします」に同じ気持ちで返します。');
// Q2
add('Bạn muốn xin phép về trước. Nói thế nào?', 'You want to excuse yourself to leave first. What do you say?', '先に帰りたいとき、どう言いますか。');
add('お先に失礼します dùng khi rời đi trước người khác.', 'お先に失礼します is used when leaving before others.', '「お先に失礼します」は人より先に帰るときに使います。');
// Q3
add('Nối mỗi câu với tình huống dùng.', 'Match each phrase with its situation.', 'それぞれの表現を使う場面と結び付けてください。');
add('Đáp lại khi được làm quen', 'Responding when introduced', '自己紹介への返事');
add('Xin phép về trước', 'Leaving before others', '先に帰るとき');
add('Chào tạm biệt thân mật', 'A casual goodbye', 'カジュアルなお別れ');
add('Dặn giữ sức khỏe', 'Telling someone to take care', '体に気をつけてと伝える');
add('Mỗi câu chào gắn với một tình huống cụ thể.', 'Each expression fits a specific situation.', 'それぞれの表現は特定の場面に対応します。');
// Q4
add('Sắp xếp thành câu “Tôi cũng mong được làm quen.”', 'Arrange the cards into “I look forward to it too.”', 'カードを並べて「私もよろしくお願いします」という文を作ってください。');
add('私 + も + よろしく + お願いします → 私もよろしくお願いします。 さん và ですね không dùng ở đây.', '私 + も + よろしく + お願いします → 私もよろしくお願いします。 さん and ですね aren’t used here.', '「私」＋「も」＋「よろしく」＋「お願いします」→「私もよろしくお願いします。」「さん」と「ですね」は使いません。');
// Q5
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄を埋めて会話を完成させてください。');
add('Khi được chào よろしくお願いします, đáp lại tự nhiên bằng こちらこそ.', 'When greeted with よろしくお願いします, respond naturally with こちらこそ.', '「よろしくお願いします」と言われたら、「こちらこそ」で自然に返します。');
// Q6
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今聞いた文はどれですか。');
add('Xin phép về trước', 'Excusing yourself to leave first', '先に失礼する');
add('Hỏi tên', 'Asking a name', '名前を聞く');
add('Chào buổi tối', 'Saying good evening', '夜のあいさつ');
add('Cảm ơn', 'Saying thanks', 'お礼を言う');
add('Câu nghe được là お先に失礼します — xin phép về trước.', 'The audio is お先に失礼します — excusing yourself to leave first.', '音声は「お先に失礼します」で、先に帰るときの表現です。');
// Q7
add('Chọn từ điền vào chỗ trống: また___。（hẹn tuần sau）', 'Choose the word for the blank: また___。 (see you next week)', '空欄に入る語を選んでください：また___。（また来週の意味）');
add('また＋[mốc thời gian] để hẹn gặp lại; 来週 = tuần sau.', 'また＋[time] arranges to meet again; 来週 = next week.', '「また＋[時]」で次に会う約束をします。「来週」は次の週です。');
// Q8
add('Cuối buổi học, bạn muốn chào thầy/cô rồi về. Nói gì?', 'At the end of class, you want to greet the teacher and leave. What do you say?', '授業の終わりに、先生にあいさつして帰ります。何と言いますか。');
add('Với thầy cô, dùng cách lịch sự 失礼します, không dùng じゃあ、また.', 'With a teacher, use the polite 失礼します, not じゃあ、また.', '先生には、カジュアルな「じゃあ、また」ではなく丁寧な「失礼します」を使います。');
// Q9 checkpoint
add('Checkpoint 5 câu nhỏ', 'Five-question checkpoint', '5問チェックポイント');
add('こちらこそ nghĩa là gì?', 'What does こちらこそ mean?', '「こちらこそ」はどういう意味ですか。');
add('Tôi cũng vậy (đáp lại)', 'Likewise (in response)', 'こちらこそ（返事）');
add('Hẹn gặp lại', 'See you again', 'また会いましょう');
add('Không có gì', 'You’re welcome', 'どういたしまして');
add('こちらこそ dùng để đáp lại thiện chí.', 'こちらこそ returns goodwill.', '「こちらこそ」は気持ちに返す表現です。');
add('Hẹn gặp tuần sau nói thế nào?', 'How do you say “see you next week”?', '「また来週」はどう言いますか。');
add('また来週 = hẹn tuần sau.', 'また来週 means “see you next week.”', '「また来週」は次の週に会う約束です。');
add('Xin phép về trước nói thế nào?', 'How do you say you’re leaving first?', '先に帰るとき、どう言いますか。');
add('お先に失礼します = xin phép về trước.', 'お先に失礼します means “excuse me for leaving first.”', '「お先に失礼します」は先に帰るときの表現です。');
add('私も nghĩa là gì?', 'What does 私も mean?', '「私も」はどういう意味ですか。');
add('Tôi cũng vậy', 'Me too', '私も');
add('私も dùng để nói mình cũng giống như vậy.', '私も says you are the same as well.', '「私も」は自分も同じだと言う表現です。');
add('Với bạn bè, chào tạm biệt thân mật là?', 'With friends, the casual goodbye is?', '友達へのカジュアルなお別れは？');
add('じゃあ、また là cách chào thân mật.', 'じゃあ、また is a casual goodbye.', '「じゃあ、また」はカジュアルなお別れです。');
// Q10 chat_text_fill
add('Hai người vừa làm quen rồi tạm biệt. Nhập từ phù hợp vào hai ô trống.', 'Two people meet and then part. Enter the right words in the two blanks.', '二人が知り合って別れます。二つの空欄に適切な語を入力してください。');
add('Ô này là câu đáp lại lời làm quen.', 'This blank is the response to an introduction.', 'この空欄は自己紹介への返事です。');
add('Được chào よろしくお願いします thì đáp こちらこそ.', 'Greeted with よろしくお願いします, respond with こちらこそ.', '「よろしくお願いします」には「こちらこそ」で返します。');
add('Ô này là lời chào tạm biệt.', 'This blank is a goodbye.', 'この空欄はお別れのあいさつです。');
add('Cuối buổi, chào tạm biệt bằng また明日.', 'At the end, say goodbye with また明日.', '終わりに「また明日」でお別れします。');
// Q11
add('Bạn về trước đồng nghiệp ở công ty. Cách nói lịch sự nhất là?', 'You’re leaving before your coworkers at work. What is the most polite thing to say?', '会社で同僚より先に帰ります。最も丁寧な言い方は？');
add('Chọn câu phù hợp nhất.', 'Choose the most appropriate sentence.', '最も適切な文を選んでください。');
add('お先に失礼します là cách lịch sự để xin phép về trước.', 'お先に失礼します is the polite way to excuse yourself to leave first.', '「お先に失礼します」は先に帰るときの丁寧な言い方です。');
// Q12
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '最も自然な会話を選んでください。');
add('A tự nhiên: được chào thì đáp こちらこそ. B sai vì lặp lại y nguyên, C sai vì dùng じゃあ、また với thầy cô, D sai vì xin phép về nhưng lại hỏi tên.', 'A is natural: greeted, you reply こちらこそ. B just repeats it, C uses じゃあ、また with a teacher, D says goodbye then asks a name.', '自然なのはA：あいさつに「こちらこそ」で返します。Bはそのまま繰り返し、Cは先生に「じゃあ、また」、Dは帰るのに名前を聞いていて不自然です。');
// Q13
add('Sắp xếp thành câu xin phép về trước lịch sự. Có thẻ không cần dùng.', 'Arrange the polite “leaving first” sentence. One card isn’t needed.', '先に帰る丁寧な文を並べてください。使わないカードがあります。');
add('Câu đầy đủ: お先に失礼します。 こちらこそ và また không dùng ở đây.', 'Full sentence: お先に失礼します。 こちらこそ and また aren’t used here.', '完成文：お先に失礼します。「こちらこそ」と「また」は使いません。');
// Q14 scenario + divider
add('Chào tạm biệt sau khi làm quen', 'Saying goodbye after getting acquainted', '知り合った後のお別れ');
add('Ba người vừa làm quen. Cuối buổi, họ đáp lời làm quen rồi lần lượt xin phép về, hẹn gặp lại và dặn nhau giữ sức khỏe.', 'Three people have just met. At the end they respond to the introductions, excuse themselves one by one, arrange to meet again, and tell each other to take care.', '三人が知り合いました。終わりに、自己紹介に返事をし、一人ずつ失礼して、また会う約束をし、体に気をつけてと言い合います。');
add('Sau đó', 'A little later', 'そのあと');
// Q14 line translations
add('Tanaka, tôi xin phép về trước đây.', 'Tanaka, I’ll be heading off first.', '田中さん、そろそろ失礼します。');
add('À, vậy à.', 'Oh, I see.', 'あ、そうですか。');
add('Hôm nay xin phép ở đây thôi.', 'I’ll say goodbye here for today.', '今日はここで失礼します。');
add('Vâng. Hẹn mai gặp.', 'Sure. See you tomorrow.', 'はい。また明日。');
add('Hẹn mai gặp. Giữ sức khỏe nhé.', 'See you tomorrow. Take care.', 'また明日。お元気で。');
add('Giữ sức khỏe nhé.', 'Take care.', 'お元気で。');
add('Satō, tôi cũng xin phép về trước.', 'Satō, I’ll be leaving first too.', '佐藤さん、私もお先に失礼します。');
add('Vâng, thôi, hẹn tuần sau.', 'Sure — well, see you next week.', 'はい、じゃあ、また来週。');
add('Hẹn tuần sau. Tôi xin phép.', 'See you next week. Excuse me.', 'また来週。失礼します。');
add('Thôi, hẹn gặp lại.', 'Well, see you.', 'じゃあ、また。');
// Exercise contexts / prompts (Q8/Q10/Q11)
add('Cuối buổi học, bạn muốn chào thầy/cô rồi về.', 'At the end of class, you want to greet the teacher and leave.', '授業の終わりに、先生にあいさつして帰りたいとき。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させる');
add('Bạn làm tốt lắm!', 'Great job!', 'よくできました！');
add('Bạn về trước đồng nghiệp ở công ty.', 'You are leaving before your coworkers at work.', '会社で同僚より先に帰るとき。');
// "Tham khảo thêm" (§B2b) — 4 biến thể của お別れ, mỗi mục đủ trường.
add('Hẹn gặp lại nhé (rất thân mật).', 'See you (very casual).', 'またね。（とてもカジュアル。）');
add('Bạn bè thân, người ngang hàng.', 'Close friends and peers.', '親しい友達や同年代の人。');
add('Chia tay bạn bè trong sinh hoạt hằng ngày, không trang trọng.', 'Parting from friends in everyday life, not formal.', '日常で友達と別れるとき、改まらない場面。');
add('Ngắn và thân mật hơn じゃあ、また; không dùng với thầy cô hay người trên.', 'Shorter and more casual than じゃあ、また; not for teachers or superiors.', '「じゃあ、また」より短くカジュアル。先生や目上には使いません。');
add('Thôi nhé (chào tạm biệt thân mật).', 'Bye then (casual goodbye).', 'じゃあね。（カジュアルなお別れ。）');
add('Bạn bè thân.', 'Close friends.', '親しい友達。');
add('Kết thúc cuộc trò chuyện thân mật rồi rời đi.', 'Ending a casual conversation before leaving.', 'カジュアルな会話を終えて立ち去るとき。');
add('Cũng thân mật như またね; nhấn "じゃあ" khi kết thúc, không trang trọng.', 'As casual as またね; emphasizes “じゃあ” at the end, not formal.', '「またね」同様カジュアル。最後に「じゃあ」を強調。改まりません。');
add('Đi cẩn thận nhé / Giữ gìn nhé.', 'Take care (on your way).', '気をつけて。');
add('Bạn bè, người thân, đồng nghiệp.', 'Friends, family, coworkers.', '友達、家族、同僚。');
add('Khi ai đó sắp lên đường (về nhà, đi xa).', 'When someone is about to set off (heading home, traveling).', '相手が出かける・帰るとき。');
add('お元気で dặn giữ sức khỏe khi lâu mới gặp; 気をつけて dặn an toàn ngay trên đường đi.', 'お元気で wishes lasting good health when you won’t meet for a while; 気をつけて is about being safe right now on the way.', '「お元気で」はしばらく会わないときの健康を願う言葉。「気をつけて」は今この道中の安全を願う言葉。');
add('Vậy, hẹn gặp lại (lịch sự hơn じゃあ、また).', 'Well then, see you (more polite than じゃあ、また).', 'では、また。（「じゃあ、また」より丁寧。）');
add('Người trên, đồng nghiệp, hoàn cảnh cần lịch sự vừa phải.', 'Superiors, coworkers, situations needing moderate politeness.', '目上、同僚、適度な丁寧さが必要な場面。');
add('Chia tay khi cần lịch sự hơn mức nói với bạn bè.', 'Parting when you need to be more polite than with friends.', '友達より丁寧にすべき場面での別れ。');
add('では trang trọng hơn じゃあ; dùng được với người trên, còn じゃあ、また chỉ hợp bạn bè.', 'では is more formal than じゃあ; usable with superiors, while じゃあ、また suits friends only.', '「では」は「じゃあ」より改まった言い方で目上にも使えます。「じゃあ、また」は友達向けです。');

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
            `[l3-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[l3-support] missing en/ja translation for Vietnamese support ` +
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
