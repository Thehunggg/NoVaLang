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
add('Giữ sức khỏe nhé (khi chia tay từ một tuần trở lên).', 'Take care (when parting for a week or more).', 'お元気で（一週間以上会わないときに使います）。');
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
add('お元気で dùng khi chia tay từ một tuần trở lên.', 'お元気で is used when parting for a week or more.', '「お元気で」は、一週間以上会わないときに使います。');
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
add('Thôi nhé. Hẹn mai gặp.', 'Well then. See you tomorrow.', 'じゃあね。また明日。');
add('Đi cẩn thận nhé.', 'Take care on your way.', '気をつけて。');
add('Vâng. Hẹn tuần sau.', 'Sure. See you next week.', 'はい。また来週。');
add('Vâng, hẹn tuần sau.', 'Sure, see you next week.', 'はい、また来週。');
add('Hẹn tuần sau. Giữ sức khỏe nhé.', 'See you next week. Take care.', 'また来週。お元気で。');
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

// ── Source-verification pass 2026-07-25: replaced unverified 私も+phrase
// combos with source-confirmed forms (hanabira/JMdict); new strings below. ──
add('Sắp xếp thành câu đáp lại lời làm quen.', 'Arrange the cards into a response to an introduction.', 'カードを並べて、自己紹介への返事の文を作ってください。');
add('こちらこそ + よろしく + お願いします → こちらこそよろしくお願いします。 私、も、さん không dùng ở đây.', 'こちらこそ + よろしく + お願いします → こちらこそよろしくお願いします。 私, も, and さん aren’t used here.', '「こちらこそ」＋「よろしく」＋「お願いします」→「こちらこそよろしくお願いします。」「私」「も」「さん」は使いません。');
add('田中さん + それでは + お先に + 失礼します → 田中さん、それではお先に失礼します。 私も、こちらこそ và また không dùng ở đây.', '田中さん + それでは + お先に + 失礼します → 田中さん、それではお先に失礼します。 私も, こちらこそ, and また aren’t used here.', '「田中さん」＋「それでは」＋「お先に」＋「失礼します」→「田中さん、それではお先に失礼します。」「私も」「こちらこそ」「また」は使いません。');
add('Satō, tôi xin phép về trước.', 'Satō, I’ll be leaving first.', '佐藤さん、お先に失礼します。');
add('Vâng. Rất mong được làm quen.', 'Sure. Pleased to meet you.', 'はい。よろしくお願いします。');
add('Ngắn gọn hơn じゃあ、また, nhấn ở "じゃあ" khi kết thúc; không trang trọng.', 'Shorter than じゃあ、また, emphasizing “じゃあ” at the end; not formal.', '「じゃあ、また」より短く、最後の「じゃあ」を強調。改まりません。');
add('Tuần sau.', 'Next week.', '来週。');

add('Nói về tên nói chung.', 'Talking about names in general.', '名前について一般的に話すとき。');
add('Nói tên của chính mình.', 'Giving your own name.', '自分の名前を言うとき。');
add('Mọi đối tượng', 'Anyone', '相手を選びません');
add('Không thêm お cho tên của chính mình.', 'Do not add お to your own name.', '自分の名前に「お」を付けません。');
add('Trung tính.', 'Neutral.', '中立的。');
add('Hỏi tên người đối diện.', 'Asking the other person’s name.', '相手の名前を尋ねるとき。');
add('Nhắc tới tên người khác một cách lịch sự.', 'Referring politely to someone else’s name.', '相手の名前に丁寧に触れるとき。');
add('Người mới gặp', 'Someone you have just met', '初対面の人');
add('Khách', 'Customers', 'お客様');
add('Người trên', 'People senior to you', '目上の人');
add('Lịch sự.', 'Polite.', '丁寧。');
add('Hỏi một vật hoặc một khái niệm là gì.', 'Asking what an object or an idea is.', '物事が何かを尋ねるとき。');
add('Không dùng một mình để hỏi tên người.', 'Do not use it on its own to ask a person’s name.', '人の名前を尋ねるのに単独では使いません。');
add('Hỏi tên đầy đủ khi mới gặp.', 'Asking for a name in full at a first meeting.', '初対面で名前をきちんと尋ねるとき。');
add('Trong hội thoại thân mật thì dài hơn cần thiết.', 'Longer than needed in casual conversation.', 'カジュアルな会話では長すぎます。');
add('Cách thân mật chuẩn:', 'Standard casual form:', '標準的なカジュアル形：');
add('Dùng với:', 'Use with:', '使う相手：');
add('Người ngang hàng', 'Peers', '同等の相手');
add('Hỏi tên ngắn gọn khi đã rõ là đang hỏi người đối diện.', 'Asking a name briefly when it is clear you mean the listener.', '相手のことだと明らかなとき、短く名前を尋ねるとき。');
add('Không cần thêm あなた.', 'There is no need to add あなた.', '「あなた」を足す必要はありません。');
add('Cách trang trọng hơn:', 'More formal form:', 'より改まった言い方：');
add('Mở đầu một câu hỏi có thể hơi riêng tư.', 'Opening a question that may be a little personal.', '少し立ち入った質問を切り出すとき。');
add('Không dùng để xin lỗi.', 'Do not use it to apologise.', 'あやまるときには使いません。');
add('Không dùng để đáp lại lời chúc.', 'Do not use it to answer a good wish.', '好意の言葉に返すときには使いません。');
add('Gọi sự chú ý trước khi hỏi hoặc nhờ.', 'Getting attention before asking or making a request.', '尋ねる前・頼む前に呼びかけるとき。');
add('Xin lỗi nhẹ.', 'A light apology.', '軽くあやまるとき。');
add('Nhờ nhắc lại điều vừa nói.', 'Asking for something just said to be repeated.', '今言われたことをもう一度頼むとき。');
add('Không dùng khi chưa nghe gì.', 'Do not use it before you have heard anything.', 'まだ何も聞いていないときには使いません。');
add('Đặt sau tên người khác khi gọi hoặc nhắc tới.', 'Placed after another person’s name when addressing or mentioning them.', '相手の名前の後に付けて呼ぶとき。');
add('Đồng nghiệp', 'Colleagues', '同僚');
add('Không gắn さん vào tên của chính mình.', 'Do not attach さん to your own name.', '自分の名前に「さん」を付けません。');
add('Không dùng さん với thầy cô — gọi bằng 先生.', 'Do not use さん for a teacher — use 先生.', '先生には「さん」ではなく「先生」を使います。');
add('Gọi trống tên, bỏ さん', 'Use the bare name, dropping さん', '「さん」を外して名前だけで呼ぶ');
add('Bạn bè', 'Friends', '友達');
add('Chỉ sau khi hai bên đồng ý.', 'Only after both sides have agreed to it.', 'お互いに了解したあとだけ。');
add('Xác nhận lại thông tin vừa nghe.', 'Confirming information you have just heard.', '今聞いた情報を確認するとき。');
add('Không dùng ～です trống để xác nhận với chính người đó.', 'Do not use a bare ～です to confirm with the person themselves.', '本人に確認するのに「です」だけは使いません。');
add('Đáp lại khi người kia vừa bày tỏ thiện chí.', 'Answering when the other person has just expressed goodwill.', '相手が好意を示した直後に返すとき。');
add('Bạn cùng lớp', 'Classmates', 'クラスメート');
add('Thầy cô', 'Teachers', '先生');
add('Không dùng để mở đầu — đây là câu đáp.', 'Do not use it to open a conversation — it is a reply.', '切り出しには使いません。返す言葉です。');
add('Tiếp nhận một thông tin vừa nghe.', 'Taking in information you have just heard.', '今聞いた情報を受け止めるとき。');
add('Không dùng khi chưa ai nói gì.', 'Do not use it before anyone has said anything.', 'まだ誰も何も言っていないときには使いません。');
add('Không dùng để tự giới thiệu.', 'Do not use it to introduce yourself.', '自己紹介には使いません。');
add('Nói mình cũng như người vừa nói.', 'Saying you are the same as the person who just spoke.', '前の人と同じだと言うとき。');
add('Không thay bằng 私は — は không diễn đạt "cũng vậy".', 'Do not swap in 私は — は does not carry the meaning “too”.', '「私は」には替えられません。「は」は「も」の意味になりません。');
add('Xin phép rời đi.', 'Excusing yourself in order to leave.', '立ち去る許しを言うとき。');
add('Rời khỏi phòng hoặc kết thúc cuộc gặp.', 'Leaving a room or ending a meeting.', '部屋を出るとき・面会を終えるとき。');
add('Người mới quen trong hoàn cảnh trang trọng', 'Someone you have just met in a formal setting', '改まった場面で知り合ったばかりの人');
add('Quá trang trọng khi chỉ chia tay bạn bè ngang hàng.', 'Too formal for simply parting from a friend of equal standing.', '同等の友達と別れるだけなら硬すぎます。');
add('Không dùng với thầy cô.', 'Do not use it with teachers.', '先生には使いません。');
add('Rời đi trước người khác ở một nơi chung.', 'Leaving a shared place before the others do.', '共有の場を人より先に出るとき。');
add('Không dùng khi không có ai ở lại.', 'Do not use it when nobody is staying behind.', '残る人がいないときには使いません。');
add('Chia tay khi lần gặp lại cách nhau từ một tuần trở lên.', 'Parting when the next meeting is a week or more away.', '次に会うのが一週間以上先のとき。');
add('Người quen', 'Acquaintances', '知り合い');
add('Không dùng khi mai hoặc vài ngày nữa đã gặp lại.', 'Do not use it when you meet again tomorrow or within a few days.', '明日や数日以内にまた会うときには使いません。');
add('Chia tay bạn bè, hẹn gặp lại trong thời gian gần.', 'Parting from friends with the next meeting soon.', '近いうちにまた会う友達と別れるとき。');
add('Không dùng với người mới quen trong hoàn cảnh trang trọng.', 'Do not use it with someone you have just met in a formal setting.', '改まった場面で知り合ったばかりの人には使いません。');
add('Thân mật.', 'Casual.', 'カジュアル。');
add('Chỉ mốc thời gian tuần sau, thường đi với また.', 'The time point “next week”, usually paired with また.', '「次の週」を指し、多くは「また」と一緒に使います。');
add('Không dùng khi mốc gặp lại không phải tuần sau.', 'Do not use it when the next meeting is not next week.', '次に会うのが来週でないときには使いません。');

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
