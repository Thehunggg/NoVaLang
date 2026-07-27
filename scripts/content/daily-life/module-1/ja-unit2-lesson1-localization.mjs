import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 1 / Unit 2 / Lesson 1
// (ja-daily_life-m01-u2-l1, "知り合いにあいさつする" / "Chào người đã quen").
// Same machinery as U1 L1–L3: every Vietnamese learner-support string used in
// ja-unit2-lesson1.mjs must have an en/ja row here or generation fails loud.
// Japanese learning content is the authored source (mọi cụm đều lấy NGUYÊN VĂN
// từ local-sources); only the Vietnamese support text is translated.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Gặp lại người đã quen', 'Meeting Someone You Already Know', '知り合いに再会する');
add('Chào người đã quen', 'Greet Someone You Know', '知り合いにあいさつする');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Chào lại người đã lâu không gặp bằng 久しぶり.', 'Greet someone you have not seen in a while with 久しぶり.', '「久しぶり」で久しく会っていない人にあいさつできます。');
add('Nâng lên mức lịch sự bằng ひさしぶりですね.', 'Raise it to the polite level with ひさしぶりですね.', '「ひさしぶりですね」で丁寧な言い方にできます。');
add('Chào buổi sáng thân mật bằng おはよう.', 'Say a casual good morning with おはよう.', '「おはよう」でカジュアルに朝のあいさつができます。');
add('Đáp lại thân mật bằng ええ.', 'Reply casually with ええ.', '「ええ」でカジュアルに相づちが打てます。');
add('Rủ gặp lại thân mật bằng また会おう.', 'Suggest meeting again casually with また会おう.', '「また会おう」でカジュアルに再会をさそえます。');
add('Chia tay lịch sự bằng ではまた.', 'Say a polite goodbye with ではまた.', '「ではまた」で丁寧にお別れができます。');
add('Chọn mức lịch sự theo người nghe, không theo thói quen.', 'Choose the politeness level by who is listening, not by habit.', '相手に合わせて丁寧さを選べます。習慣で選びません。');

// ── Intro situation ─────────────────────────────────────────────────────
add('Bạn gặp lại một người đã quen sau một thời gian dài.', 'You meet someone you already know after a long time.', '久しぶりに知り合いと会います。');
add('Bạn chào hỏi rồi hẹn gặp lại, chọn cách nói hợp với người đối diện.', 'You greet them and arrange to meet again, choosing wording that fits the person.', 'あいさつをして再会の約束をします。相手に合った言い方を選びます。');

// ── Intro examples (labels) ─────────────────────────────────────────────
add('Với bạn bè, bạn chào:', 'With friends, you say:', '友達には、こう言います。');
add('Với thầy cô, bạn chào:', 'With a teacher, you say:', '先生には、こう言います。');
add('Khi chia tay, bạn nói:', 'When you part, you say:', '別れるとき、こう言います。');

// ── Intro important note ────────────────────────────────────────────────
add('久しぶり là dạng trần, chỉ dùng với bạn bè và người ngang hàng đã thân.', '久しぶり is the plain form, used only with friends and close peers.', '「久しぶり」は普通体で、友達や親しい同等の人にだけ使います。');
add('Thêm ですね thành ひさしぶりですね là nâng lên mức lịch sự, dùng được với thầy cô.', 'Adding ですね to make ひさしぶりですね raises it to the polite level, usable with a teacher.', '「ですね」を足して「ひさしぶりですね」にすると丁寧になり、先生にも使えます。');
add('Không dùng おはよう với thầy cô — với thầy cô dùng おはようございます.', 'Do not use おはよう with a teacher — use おはようございます instead.', '先生に「おはよう」は使いません。「おはようございます」を使います。');

// ── Vocabulary meanings (Card 2 + overview) ─────────────────────────────
add('Lâu rồi không gặp.', 'It has been a long time.', '久しぶりです。');
add('Lâu rồi không gặp nhỉ.', 'It has been a long time, hasn’t it.', 'ひさしぶりですね。');
add('Chào buổi sáng (thân mật).', 'Good morning (casual).', 'おはよう（カジュアル）。');
add('Ừ. / Vâng.', 'Yeah. / Yes.', 'ええ。／うん。');
add('Hẹn gặp lại nhé (thân mật).', 'Let’s meet again (casual).', 'また会おう（カジュアル）。');
add('Thôi, hẹn gặp lại.', 'Well then, see you again.', 'ではまた。');

// ── Register labels (§B2e — từ vựng ĐÓNG, đúng ba mức) ──────────────────
add('Thân mật.', 'Casual.', 'カジュアル。');
add('Lịch sự.', 'Polite.', '丁寧。');

// ── Vocabulary detail fields (§B2c) ─────────────────────────────────────
add('Gặp lại người đã lâu không gặp.', 'Meeting again someone you have not seen for a long time.', '久しく会っていなかった人と再会するとき。');
add('Mở đầu cuộc trò chuyện sau một thời gian dài.', 'Opening a conversation after a long gap.', '長く間があいたあと、会話を切り出すとき。');
add('Gặp lại người đã lâu không gặp, trong tình huống cần lịch sự.', 'Meeting again after a long time, in a situation that calls for politeness.', '丁寧さが必要な場面で、久しぶりに再会するとき。');
add('Chào buổi sáng người đã thân.', 'Greeting someone close to you in the morning.', '親しい人に朝のあいさつをするとき。');
add('Đáp "ừ / vâng" trong hội thoại đời thường.', 'Answering “yeah / yes” in everyday conversation.', '日常会話で「ええ」と受け答えするとき。');
add('Rủ gặp lại khi chưa hẹn được ngày cụ thể.', 'Suggesting to meet again when no date has been set.', '日にちを決めずに再会をさそうとき。');
add('Chia tay khi chưa hẹn được ngày gặp lại.', 'Parting when the next meeting has not been arranged.', '次に会う日を決めずに別れるとき。');
add('Bạn bè', 'Friends', '友達');
add('Người ngang hàng đã thân', 'Close peers', '親しい同等の相手');
add('Người ngang hàng', 'Peers', '同等の相手');
add('Người trong gia đình', 'Family members', '家族');
add('Người ngang tuổi đã thân', 'Close people of the same age', '親しい同年代の相手');
add('Thầy cô', 'Teachers', '先生');
add('Người trên', 'Seniors', '目上の人');
add('Đồng nghiệp', 'Colleagues', '同僚');
add('Không dùng dạng trần này với thầy cô hoặc người trên.', 'Do not use this plain form with a teacher or a senior.', 'この普通体は先生や目上の人には使いません。');
add('Không dùng với người vừa gặp hôm qua.', 'Do not use it with someone you met just yesterday.', '昨日会ったばかりの人には使いません。');
add('Không dùng với thầy cô hoặc người trên.', 'Do not use it with a teacher or a senior.', '先生や目上の人には使いません。');
add('Không dùng vào buổi chiều hoặc buổi tối.', 'Do not use it in the afternoon or the evening.', '昼や夜には使いません。');
add('Không dùng thay cho một câu trả lời đầy đủ khi người hỏi cần thông tin.', 'Do not use it in place of a full answer when the other person needs information.', '相手が情報を求めているときは、これだけで答えません。');
add('Không dùng khi đã biết rõ ngày gặp lại.', 'Do not use it when the next meeting date is already known.', '次に会う日がはっきりしているときには使いません。');
add('Cách thân mật chuẩn:', 'Standard casual form:', 'カジュアルな言い方：');
add('Cách trang trọng hơn:', 'More formal form:', 'より改まった言い方：');
add('Dùng với:', 'Use with:', '使う相手：');
add('Dạng lịch sự tương ứng là ひさしぶりですね.', 'The matching polite form is ひさしぶりですね.', '対応する丁寧な言い方は「ひさしぶりですね」です。');

// ── Vocabulary references (§B2b) ────────────────────────────────────────
add('Vậy thì hẹn gặp lại (trang trọng hơn ではまた).', 'Well then, see you again (more formal than ではまた).', 'それではまた（「ではまた」より改まった言い方）。');
add('Vậy thì hẹn gặp lại.', 'Well then, see you again.', 'それではまた。');
add('Ừ (thân mật hơn ええ).', 'Yeah (more casual than ええ).', 'うん（「ええ」よりカジュアル）。');

// ── Card 3 · dialogue groups ────────────────────────────────────────────
add('Gặp lại thầy ở hành lang', 'Meeting the teacher again in the hallway', '廊下で先生と再会する');
add('Sau kỳ nghỉ dài, hai người gặp nhau chốc lát ở hành lang rồi ai vào lớp nấy.', 'After a long break, the two meet briefly in the hallway and then head to their own classrooms.', '長い休みのあと、二人は廊下で少し会い、それぞれの教室へ向かいます。');
add('Hai bạn cùng lớp gặp lại', 'Two classmates meet again', 'クラスメイト二人が再会する');
add('Hai bạn cùng lớp gặp nhau ở sân trường sau kỳ nghỉ.', 'Two classmates meet in the schoolyard after the break.', '休みのあと、クラスメイト二人が校庭で会います。');
add('Chào nhanh rồi hẹn gặp lại', 'A quick greeting, then arranging to meet again', '手短にあいさつして再会の約束をする');
add('Hai bạn gặp nhau chốc lát ở hành lang, cả hai đang vội.', 'Two friends meet briefly in the hallway; both are in a hurry.', '二人は廊下で少しだけ会います。どちらも急いでいます。');
add('Với thầy cô dùng おはようございます, không dùng おはよう.', 'With a teacher use おはようございます, not おはよう.', '先生には「おはようございます」を使い、「おはよう」は使いません。');
add('Gọi thầy là 先生, không gắn さん.', 'Address the teacher as 先生, without adding さん.', '先生は「先生」と呼び、「さん」は付けません。');
add('ひさしぶりですね dùng được cả hai chiều vì đã ở mức lịch sự.', 'ひさしぶりですね works in both directions because it is already polite.', '「ひさしぶりですね」は丁寧なので、どちらからでも使えます。');
add('Giữa bạn cùng lớp dùng dạng thân mật おはよう và 久しぶり.', 'Between classmates use the casual forms おはよう and 久しぶり.', 'クラスメイト同士では「おはよう」「久しぶり」を使います。');
add('ええ là cách đáp thân mật, đi cùng dạng trần.', 'ええ is a casual reply and goes with the plain form.', '「ええ」はカジュアルな相づちで、普通体と一緒に使います。');
add('また会おう dùng khi chưa hẹn được ngày — khác また明日 và また来週 đã học.', 'また会おう is used when no date is set — unlike また明日 and また来週 learned earlier.', '「また会おう」は日にちが決まっていないときに使い、既習の「また明日」「また来週」とは違います。');
add('Giữa bạn bè, cả lời chào lẫn lời chia tay đều ở mức thân mật.', 'Between friends, both the greeting and the farewell stay casual.', '友達同士では、あいさつも別れの言葉もカジュアルにします。');

// ── Card 4 · grammar patterns ───────────────────────────────────────────
add('Cùng một ý "lâu rồi không gặp", đổi mức theo người nghe.', 'The same idea “long time no see”, with the level changed to fit the listener.', '同じ「久しぶり」の意味で、相手に合わせて丁寧さを変えます。');
add('Lâu rồi không gặp!', 'Long time no see!', '久しぶり！');
add('Bỏ ございます là hạ từ mức lịch sự xuống mức thân mật.', 'Dropping ございます lowers it from polite to casual.', '「ございます」を取ると、丁寧からカジュアルになります。');
add('Hai cách chia tay khi chưa hẹn được ngày gặp lại.', 'Two ways to part when no next meeting has been arranged.', '次に会う日を決めていないときの、二通りの別れ方。');
add('Dạng trần dùng với người ngang hàng đã thân; thêm ですね là nâng lên mức lịch sự, dùng được với thầy cô.', 'The plain form is for close peers; adding ですね raises it to polite, usable with a teacher.', '普通体は親しい同等の相手に使い、「ですね」を足すと丁寧になり先生にも使えます。');
add('Đây là cùng mẫu ～ですね đã học ở bài Hỏi tên người đối diện.', 'This is the same ～ですね pattern learned in “Ask the Other Person’s Name”.', 'これは「相手の名前を聞く」で学んだ「～ですね」と同じ形です。');
add('Cùng một lời chào, hai mức. Chọn theo người nghe, không theo thói quen.', 'One greeting, two levels. Choose by the listener, not by habit.', '同じあいさつに二つの丁寧さがあります。習慣ではなく相手で選びます。');
add('ではまた dùng được với thầy cô và người trên; また会おう chỉ dùng với bạn bè.', 'ではまた works with teachers and seniors; また会おう is only for friends.', '「ではまた」は先生や目上の人にも使えます。「また会おう」は友達だけです。');
add('Khi đã biết rõ ngày gặp lại thì dùng また明日 hoặc また来週 đã học ở bài trước.', 'When the next meeting date is known, use また明日 or また来週 from the earlier lesson.', '次に会う日が決まっているときは、前のレッスンの「また明日」「また来週」を使います。');

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

// ── Q1–Q13 prompts, options, feedback ───────────────────────────────────
add('Buổi sáng gặp thầy cô ở lớp. Bạn chào thế nào?', 'You meet your teacher in class in the morning. How do you greet them?', '朝、教室で先生に会います。どうあいさつしますか。');
add('Với thầy cô dùng おはようございます; おはよう chỉ dùng với bạn bè.', 'With a teacher use おはようございます; おはよう is only for friends.', '先生には「おはようございます」を使います。「おはよう」は友達だけです。');
add('Gặp lại bạn thân sau một thời gian dài. Bạn nói gì?', 'You meet a close friend again after a long time. What do you say?', '久しぶりに親しい友達に会います。何と言いますか。');
add('久しぶり là dạng trần, dùng với bạn bè và người ngang hàng đã thân.', '久しぶり is the plain form, used with friends and close peers.', '「久しぶり」は普通体で、友達や親しい同等の相手に使います。');
add('Nối mỗi câu với tình huống dùng.', 'Match each phrase with the situation where it is used.', 'それぞれの表現と使う場面を結んでください。');
add('Lâu rồi không gặp (thân mật)', 'Long time no see (casual)', '久しぶり（カジュアル）');
add('Lâu rồi không gặp (lịch sự)', 'Long time no see (polite)', 'ひさしぶりですね（丁寧）');
add('Chào buổi sáng (thân mật)', 'Good morning (casual)', 'おはよう（カジュアル）');
add('Hẹn gặp lại (lịch sự)', 'See you again (polite)', 'ではまた（丁寧）');
add('Cùng một ý nhưng khác mức lịch sự — chọn theo người nghe.', 'The same meaning at different politeness levels — choose by the listener.', '意味は同じで丁寧さが違います。相手で選びます。');
add('Sắp xếp thành câu chào lịch sự khi lâu rồi mới gặp lại.', 'Arrange the polite greeting used when meeting again after a long time.', '久しぶりに会ったときの丁寧なあいさつに並べかえてください。');
add('ひさしぶり + です + ね → ひさしぶりですね。 おはよう và また không dùng ở đây.', 'ひさしぶり + です + ね → ひさしぶりですね。 おはよう and また are not used here.', '「ひさしぶり」＋「です」＋「ね」→「ひさしぶりですね。」「おはよう」と「また」はここでは使いません。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄をうめて会話を完成させてください。');
add('Hai bạn cùng lớp chào nhau buổi sáng bằng おはよう.', 'Two classmates greet each other in the morning with おはよう.', 'クラスメイト同士は朝「おはよう」であいさつします。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今、どの文を聞きましたか。');
add('Lâu rồi không gặp nhỉ', 'Long time no see, isn’t it', 'ひさしぶりですね');
add('Chào buổi sáng', 'Good morning', 'おはようございます');
add('Hẹn gặp lại', 'See you again', 'また会いましょう');
add('Hỏi tên', 'Asking a name', '名前を聞く');
add('Câu nghe được là ひさしぶりですね — lâu rồi không gặp nhỉ.', 'The sentence you heard is ひさしぶりですね — long time no see.', '聞こえた文は「ひさしぶりですね」です。');
add('Bạn chia tay một người bạn cùng lớp, chưa hẹn được ngày gặp lại.', 'You are parting from a classmate with no next meeting arranged.', '次に会う日を決めずにクラスメイトと別れます。');
add('Bạn chia tay một người bạn cùng lớp, chưa hẹn được ngày gặp lại. Nói gì?', 'You are parting from a classmate with no next meeting arranged. What do you say?', '次に会う日を決めずにクラスメイトと別れます。何と言いますか。');
add('また会おう là cách rủ gặp lại thân mật khi chưa có mốc cụ thể.', 'また会おう casually suggests meeting again when no date is set.', '「また会おう」は日にちが決まっていないときの、カジュアルなさそい方です。');
add('Sắp xếp thành câu chào bạn cùng lớp một cách lịch sự.', 'Arrange a polite greeting for a classmate.', 'クラスメイトへの丁寧なあいさつに並べかえてください。');
add('佐藤 + さん + ひさしぶり + ですね → 佐藤さんひさしぶりですね。 おはよう và また không dùng ở đây.', '佐藤 + さん + ひさしぶり + ですね → 佐藤さんひさしぶりですね。 おはよう and また are not used here.', '「佐藤」＋「さん」＋「ひさしぶり」＋「ですね」→「佐藤さんひさしぶりですね。」「おはよう」と「また」はここでは使いません。');
add('Checkpoint 5 câu nhỏ', 'Checkpoint: 5 short questions', 'チェックポイント：小問5つ');
add('久しぶり dùng với ai?', 'Who do you use 久しぶり with?', '「久しぶり」は誰に使いますか。');
add('Bạn bè và người ngang hàng đã thân', 'Friends and close peers', '友達や親しい同等の相手');
add('Người mới gặp lần đầu', 'Someone you are meeting for the first time', '初めて会う人');
add('Mọi đối tượng', 'Anyone', '誰にでも');
add('久しぶり là dạng trần; với thầy cô dùng ひさしぶりですね.', '久しぶり is the plain form; with a teacher use ひさしぶりですね.', '「久しぶり」は普通体です。先生には「ひさしぶりですね」を使います。');
add('Chào buổi sáng với thầy cô là câu nào?', 'Which sentence is the morning greeting for a teacher?', '先生への朝のあいさつはどれですか。');
add('Bỏ ございます là hạ xuống mức thân mật, không dùng với thầy cô.', 'Dropping ございます lowers it to casual, which is not used with a teacher.', '「ございます」を取るとカジュアルになり、先生には使いません。');
add('ええ nghĩa là gì?', 'What does ええ mean?', '「ええ」はどんな意味ですか。');
add('Không.', 'No.', 'いいえ。');
add('Tạm biệt.', 'Goodbye.', 'さようなら。');
add('Cảm ơn.', 'Thank you.', 'ありがとうございます。');
add('ええ là cách đáp "ừ/vâng" trong hội thoại đời thường.', 'ええ is the “yeah/yes” reply in everyday conversation.', '「ええ」は日常会話の「はい」にあたる相づちです。');
add('Chia tay lịch sự, chưa hẹn ngày gặp lại?', 'A polite farewell with no next meeting arranged?', '次に会う日を決めていない、丁寧な別れの言葉は。');
add('ではまた là lời chia tay lịch sự khi chưa hẹn được ngày.', 'ではまた is the polite farewell when no date has been set.', '「ではまた」は日にちを決めていないときの丁寧な別れの言葉です。');
add('Câu nào KHÔNG dùng được với thầy cô?', 'Which sentence can NOT be used with a teacher?', '先生に使えない文はどれですか。');
add('おはよう là dạng thân mật, chỉ dùng với bạn bè và người trong gia đình.', 'おはよう is casual, used only with friends and family.', '「おはよう」はカジュアルで、友達や家族にだけ使います。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させてください');
add('Hai người quen gặp lại nhau sau kỳ nghỉ rồi chia tay lịch sự. Nhập từ phù hợp vào hai ô trống.', 'Two acquaintances meet again after the break and part politely. Type the right words in the two blanks.', '休みのあとに知り合い二人が再会し、丁寧に別れます。二つの空欄に合う言葉を入力してください。');
add('Bạn làm tốt lắm!', 'Well done!', 'よくできました！');
add('Ô này là câu chào khi lâu rồi mới gặp lại.', 'This blank is the greeting used when meeting again after a long time.', 'この空欄は、久しぶりに会ったときのあいさつです。');
add('Thêm ですね là nâng 久しぶり lên mức lịch sự.', 'Adding ですね raises 久しぶり to the polite level.', '「ですね」を足すと「久しぶり」が丁寧になります。');
add('Ô này là lời chia tay lịch sự.', 'This blank is the polite farewell.', 'この空欄は、丁寧な別れの言葉です。');
add('ではまた dùng khi chia tay mà chưa hẹn được ngày gặp lại.', 'ではまた is used when parting without arranging the next meeting.', '「ではまた」は次に会う日を決めずに別れるときに使います。');
add('Sắp xếp thành lời chào thầy cô đầu buổi học sau kỳ nghỉ. Có thẻ không cần dùng.', 'Arrange the greeting for a teacher at the start of class after the break. Some cards are not needed.', '休み明けの授業のはじめに先生へするあいさつに並べかえてください。使わないカードがあります。');
add('先生 + おはよう + ございます + ひさしぶり + です + ね → 先生、おはようございます。ひさしぶりですね。 Không gắn さん sau 先生, và また không dùng ở đây.', '先生 + おはよう + ございます + ひさしぶり + です + ね → 先生、おはようございます。ひさしぶりですね。 Do not add さん after 先生, and また is not used here.', '「先生」＋「おはよう」＋「ございます」＋「ひさしぶり」＋「です」＋「ね」→「先生、おはようございます。ひさしぶりですね。」「先生」に「さん」は付けません。「また」はここでは使いません。');
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '一番自然な会話を選んでください。');
add('A tự nhiên: hai bạn cùng lớp cùng dùng mức thân mật. B sai vì đáp thầy cô bằng おはよう. C sai vì vừa chào đã chia tay ngay. D sai vì gắn さん sau 先生.', 'A is natural: both classmates stay casual. B is wrong because it answers a teacher with おはよう. C is wrong because it says goodbye right after the greeting. D is wrong because it adds さん after 先生.', 'Aが自然です。クラスメイト同士がどちらもカジュアルです。Bは先生に「おはよう」で答えているので誤りです。Cはあいさつしてすぐ別れているので誤りです。Dは「先生」に「さん」を付けているので誤りです。');
add('Sắp xếp thành câu rủ bạn gặp lại. Có thẻ không cần dùng.', 'Arrange the sentence that invites a friend to meet again. Some cards are not needed.', '友達を再会にさそう文に並べかえてください。使わないカードがあります。');
add('佐藤さん + また + 会おう → 佐藤さん、また会おう。 ですね và ございます là mức lịch sự, không đi với dạng thân mật này.', '佐藤さん + また + 会おう → 佐藤さん、また会おう。 ですね and ございます are polite forms and do not go with this casual wording.', '「佐藤さん」＋「また」＋「会おう」→「佐藤さん、また会おう。」「ですね」と「ございます」は丁寧な形なので、このカジュアルな言い方には合いません。');

// ── Q14 scenario + dialogue line translations ───────────────────────────
add('Ngày đầu đi học lại sau kỳ nghỉ', 'The first day back at school after the break', '休み明け、学校に戻る初日');
add('Sau kỳ nghỉ dài, Satō gặp lại thầy ở hành lang rồi gặp lại hai bạn cùng lớp ở sân trường. Cùng một ý chào, hai mức lịch sự khác nhau.', 'After a long break, Satō meets the teacher again in the hallway and then two classmates in the schoolyard. The same greeting, at two different politeness levels.', '長い休みのあと、佐藤さんは廊下で先生に、そのあと校庭でクラスメイト二人に再会します。同じあいさつを、二つの丁寧さで使います。');
add('Sau đó', 'After that', 'そのあと');
add('Thưa thầy, em chào thầy ạ.', 'Good morning, sensei.', '先生、おはようございます。');
add('Chào em.', 'Good morning.', 'おはようございます。');
add('Chào em, Satō.', 'Good morning, Satō.', 'おはようございます、佐藤さん。');
add('Lâu rồi không gặp nhỉ. Hẹn gặp lại.', 'Long time no see. See you again.', 'ひさしぶりですね。ではまた。');
add('Vậy hẹn gặp lại thầy ạ.', 'See you again, sensei.', 'ではまた。');
add('Mong thầy giúp đỡ ạ.', 'I look forward to your guidance.', 'よろしくお願いします。');
add('Thầy cũng vậy, mong em cố gắng.', 'Likewise — I look forward to working with you.', 'こちらこそ、よろしくお願いします。');
add('Satō ơi, chào buổi sáng!', 'Good morning, Satō!', '佐藤さん、おはよう！');
add('Chào buổi sáng.', 'Good morning.', 'おはよう。');
add('Lâu rồi không gặp! Dạo này khoẻ không?', 'Long time no see! How have you been?', '久しぶり！元気だった？');
add('Ừ, lâu rồi không gặp.', 'Yeah, long time no see.', 'ええ、久しぶり。');
add('Satō ơi, lâu rồi không gặp!', 'Satō, long time no see!', '佐藤さん、久しぶり！');
add('Thôi nhé.', 'See ya.', 'じゃあね。');
add('Hẹn gặp lại nhé.', 'Let’s meet again.', 'また会おう。');

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
            `[u2l1-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[u2l1-support] missing en/ja translation for Vietnamese support ` +
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
