import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 1 / Unit 2 / Lesson 1
// (ja-daily_life-m01-u2-l1, "知り合いにあいさつする" / "Chào người đã quen").
// Same machinery as U1 L1–L3: every Vietnamese learner-support string used in
// ja-unit2-lesson1.mjs must have an en/ja row here or generation fails loud.
// Japanese learning content is NGUYÊN VĂN from Irodori 初級1 L1 (see the source
// header in ja-unit2-lesson1.mjs); only the Vietnamese support text is
// translated here.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Gặp lại người đã quen', 'Meeting Someone You Already Know', '知り合いに再会する');
add('Chào người đã quen', 'Greet Someone You Know', '知り合いにあいさつする');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Chào người lâu ngày không gặp bằng お久しぶりです.', 'Greet someone you have not seen for a long time with お久しぶりです.', '「お久しぶりです」で久しぶりに会った人にあいさつできます。');
add('Chào bạn bè bằng thể thường 久しぶり.', 'Greet friends with the plain form 久しぶり.', '「久しぶり」（普通体）で友達にあいさつできます。');
add('Hỏi thăm sức khoẻ lịch sự bằng お元気ですか.', 'Ask politely how someone is with お元気ですか.', '「お元気ですか」で丁寧に相手の様子をたずねられます。');
add('Hỏi thăm thân mật bằng 元気？.', 'Ask casually how someone is with 元気？.', '「元気？」でカジュアルに相手の様子をたずねられます。');
add('Đáp lịch sự bằng はい。おかげさまで。', 'Reply politely with はい。おかげさまで。', '「はい。おかげさまで。」で丁寧に答えられます。');
add('Đáp thân mật bằng うん。元気。', 'Reply casually with うん。元気。', '「うん。元気。」でカジュアルに答えられます。');
add('Chọn thể lịch sự hay thể thường theo người nghe.', 'Choose the polite or the plain form according to who is listening.', '相手に合わせて丁寧体か普通体かを選べます。');

// ── Intro situation ─────────────────────────────────────────────────────
add('Bạn gặp lại một người đã quen sau lâu ngày không gặp.', 'You meet someone you know again after a long time.', '久しぶりに知り合いと再会します。');
add('Hai người chào hỏi nhau, rồi hỏi thăm sức khoẻ.', 'The two greet each other, then ask how the other has been.', '二人はあいさつをして、そのあと様子をたずね合います。');

// ── Intro example labels ────────────────────────────────────────────────
add('Với người quen, bạn chào:', 'With an acquaintance, you say:', '知り合いには、こう言います。');
add('Với bạn bè, bạn chào:', 'With friends, you say:', '友達には、こう言います。');
add('Khi được hỏi thăm, bạn đáp:', 'When asked how you are, you reply:', '様子をたずねられたら、こう答えます。');

// ── Intro important note ────────────────────────────────────────────────
add('Thể lịch sự có お ở đầu và です ở cuối; bỏ cả hai thì thành thể thường.', 'The polite form has お at the front and です at the end; drop both and it becomes the plain form.', '丁寧体は頭に「お」、終わりに「です」が付きます。両方取ると普通体になります。');
add('Hai bên không bắt buộc dùng cùng một thể — người trên có thể nói thể thường trong khi người dưới đáp thể lịch sự.', 'The two speakers need not use the same form — a senior may speak plainly while a junior replies politely.', '二人が同じ体を使うとはかぎりません。目上の人が普通体で話し、目下の人が丁寧体で答えることもあります。');
add('おかげさまで nghĩa gốc là "nhờ ơn anh/chị" — chỉ đi với câu đáp lịch sự はい, không đi với うん.', 'おかげさまで literally means “thanks to you” — it goes with the polite はい, never with うん.', '「おかげさまで」はもともと「あなたのおかげで」という意味で、丁寧な「はい」と一緒に使い、「うん」とは使いません。');

// ── Vocabulary meanings (Card 2 + overview) ─────────────────────────────
add('Lâu rồi không gặp (lịch sự).', 'It has been a long time (polite).', 'お久しぶりです（丁寧）。');
add('Lâu rồi không gặp (thân mật).', 'It has been a long time (casual).', '久しぶり（カジュアル）。');
add('Anh/chị vẫn khoẻ chứ?', 'How have you been?', 'お元気ですか。');
add('Khoẻ không?', 'How are you?', '元気？');
add('Vâng.', 'Yes.', 'はい。');
add('Nhờ ơn anh/chị (nên tôi vẫn khoẻ).', 'Thanks to you, I am well.', 'おかげさまで元気です。');
add('Ừ.', 'Yeah.', 'うん。');

// ── Register labels (§B2e — từ vựng ĐÓNG, đúng ba mức) ──────────────────
add('Lịch sự.', 'Polite.', '丁寧。');
add('Thân mật.', 'Casual.', 'カジュアル。');

// ── Vocabulary detail fields (§B2c) ─────────────────────────────────────
add('Gặp lại người đã lâu không gặp, trong tình huống cần lịch sự.', 'Meeting again after a long time, in a situation that calls for politeness.', '丁寧さが必要な場面で、久しぶりに再会するとき。');
add('Gặp lại người đã lâu không gặp, giữa những người đã thân.', 'Meeting again after a long time, between people who are close.', '親しい相手と久しぶりに再会するとき。');
add('Hỏi thăm sức khoẻ ngay sau lời chào lâu ngày không gặp.', 'Asking how someone has been, right after the reunion greeting.', '久しぶりのあいさつのすぐあとで、様子をたずねるとき。');
add('Hỏi thăm sức khoẻ giữa những người đã thân.', 'Asking how someone is, between people who are close.', '親しい相手に様子をたずねるとき。');
add('Đáp "vâng" một cách lịch sự.', 'Answering “yes” politely.', '丁寧に「はい」と答えるとき。');
add('Đáp lại lời hỏi thăm sức khoẻ, một cách lịch sự.', 'Replying politely when asked how you have been.', '様子をたずねられて、丁寧に答えるとき。');
add('Đáp "ừ" giữa những người đã thân.', 'Answering “yeah” between people who are close.', '親しい相手に「うん」と答えるとき。');
add('Bạn bè', 'Friends', '友達');
add('Người ngang hàng đã thân', 'Close peers', '親しい同等の相手');
add('Thầy cô', 'Teachers', '先生');
add('Người trên', 'Seniors', '目上の人');
add('Người quen', 'Acquaintances', '知り合い');
add('Đồng nghiệp', 'Colleagues', '同僚');
add('Mọi đối tượng', 'Anyone', '誰にでも');
add('Không dùng với người vừa gặp hôm qua.', 'Do not use it with someone you met just yesterday.', '昨日会ったばかりの人には使いません。');
add('Không dùng dạng trần này với thầy cô hoặc người trên.', 'Do not use this plain form with a teacher or a senior.', 'この普通体は先生や目上の人には使いません。');
add('Không dùng với người ngày nào cũng gặp.', 'Do not use it with someone you see every day.', '毎日会う人には使いません。');
add('Không dùng với thầy cô hoặc người trên.', 'Do not use it with a teacher or a senior.', '先生や目上の人には使いません。');
add('Không ghép với うん — おかげさまで chỉ đi với はい.', 'Do not pair it with うん — おかげさまで goes only with はい.', '「うん」とは組み合わせません。「おかげさまで」は「はい」とだけ使います。');
add('Cách thân mật chuẩn:', 'Standard casual form:', 'カジュアルな言い方：');
add('Cách trang trọng hơn:', 'More formal form:', 'より改まった言い方：');
add('Dùng với:', 'Use with:', '使う相手：');
add('Khác お元気で (lời chia tay đã học ở bài trước): câu này là lời HỎI khi gặp.', 'Different from お元気で (the farewell learned earlier): this one is a QUESTION asked on meeting.', '前のレッスンで学んだ別れの言葉「お元気で」とは違い、これは会ったときにたずねる言い方です。');

// ── Vocabulary references (§B2b) ────────────────────────────────────────
add('Tiền bối (người vào trước ở trường hoặc chỗ làm).', 'Senpai — someone who joined the school or workplace before you.', '先輩（学校や職場で自分より先に入った人）。');
add('Tiền bối và hậu bối.', 'Senpai and kohai.', '先輩と後輩。');
add('Người quen.', 'An acquaintance.', '知り合い。');

// ── Card 3 · dialogue groups ────────────────────────────────────────────
add('Cả hai dùng thể lịch sự', 'Both use the polite form', '二人とも丁寧体を使う');
add('Hai người lâu ngày không gặp đang chào hỏi nhau. Cả hai đều dùng thể lịch sự.', 'Two people who have not met for a long time are greeting each other. Both use the polite form.', '久しぶりに会った二人があいさつをしています。二人とも丁寧体を使っています。');
add('Cả hai dùng thể thường', 'Both use the plain form', '二人とも普通体を使う');
add('Hai người lâu ngày không gặp đang chào hỏi nhau. Cả hai đều dùng thể thường.', 'Two people who have not met for a long time are greeting each other. Both use the plain form.', '久しぶりに会った二人があいさつをしています。二人とも普通体を使っています。');
add('Hai bên dùng hai thể khác nhau', 'The two use different forms', '二人が違う体を使う');
add('Hai người lâu ngày không gặp đang chào hỏi nhau. Một bên dùng thể thường, bên kia đáp bằng thể lịch sự.', 'Two people who have not met for a long time are greeting each other. One uses the plain form and the other replies in the polite form.', '久しぶりに会った二人があいさつをしています。一方は普通体、もう一方は丁寧体で答えています。');
add('Cả hai câu đều có お ở đầu và です ở cuối — dấu hiệu thể lịch sự.', 'Both sentences have お at the front and です at the end — the marks of the polite form.', 'どちらの文も頭に「お」、終わりに「です」があります。丁寧体のしるしです。');
add('Câu đáp lịch sự là はい。おかげさまで。', 'The polite reply is はい。おかげさまで。', '丁寧な答えは「はい。おかげさまで。」です。');
add('Bỏ お và bỏ です là thành thể thường.', 'Dropping お and です makes it the plain form.', '「お」と「です」を取ると普通体になります。');
add('Câu đáp thân mật là うん。元気。', 'The casual reply is うん。元気。', 'カジュアルな答えは「うん。元気。」です。');
add('Hai bên KHÔNG bắt buộc dùng cùng một thể.', 'The two speakers do NOT have to use the same form.', '二人が同じ体を使う必要はありません。');
add('Người ở vai trên nói thể thường, người ở vai dưới đáp bằng thể lịch sự.', 'The senior speaks in the plain form and the junior replies in the polite form.', '目上の人が普通体で話し、目下の人が丁寧体で答えます。');

// ── Card 4 · grammar patterns ───────────────────────────────────────────
add('Cùng lời chào lâu ngày không gặp, hai thể.', 'The same reunion greeting, in two forms.', '同じ久しぶりのあいさつを、二つの体で。');
add('Thêm お ở đầu và です ở cuối là thể lịch sự; bỏ cả hai là thể thường.', 'Adding お at the front and です at the end gives the polite form; dropping both gives the plain form.', '頭に「お」、終わりに「です」を足すと丁寧体、両方取ると普通体です。');
add('Cùng câu hỏi thăm sức khoẻ, hai thể.', 'The same “how are you” question, in two forms.', '同じ様子をたずねる質問を、二つの体で。');
add('Cùng cơ chế: bỏ お và bỏ ですか thì còn 元気？ ở thể thường.', 'Same mechanism: drop お and ですか and 元気？ remains, in the plain form.', '同じしくみです。「お」と「ですか」を取ると、普通体の「元気？」が残ります。');
add('はい ／ うん ＋ [câu đáp]', 'はい / うん + [reply]', 'はい／うん ＋ ［こたえ］');
add('Cùng câu đáp lời hỏi thăm, hai thể.', 'The same reply to “how are you”, in two forms.', '同じ答え方を、二つの体で。');
add('はい đi với おかげさまで; うん đi với 元気。 Không trộn hai vế của hai thể.', 'はい goes with おかげさまで; うん goes with 元気。 Do not mix halves from the two forms.', '「はい」は「おかげさまで」と、「うん」は「元気」と組みます。二つの体を混ぜません。');

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
add('Bạn gặp lại một người quen sau lâu ngày, trong tình huống cần lịch sự.', 'You meet an acquaintance again after a long time, in a situation that calls for politeness.', '丁寧さが必要な場面で、久しぶりに知り合いに会います。');
add('Bạn gặp lại một người quen sau lâu ngày, trong tình huống cần lịch sự. Nói gì?', 'You meet an acquaintance again after a long time, in a situation that calls for politeness. What do you say?', '丁寧さが必要な場面で、久しぶりに知り合いに会います。何と言いますか。');
add('お久しぶりです là thể lịch sự; 久しぶり là thể thường, chỉ dùng với bạn bè.', 'お久しぶりです is the polite form; 久しぶり is the plain form, used only with friends.', '「お久しぶりです」は丁寧体、「久しぶり」は普通体で友達にだけ使います。');
add('Bạn gặp lại một người bạn thân sau lâu ngày.', 'You meet a close friend again after a long time.', '久しぶりに親しい友達に会います。');
add('Bạn gặp lại một người bạn thân sau lâu ngày. Nói gì?', 'You meet a close friend again after a long time. What do you say?', '久しぶりに親しい友達に会います。何と言いますか。');
add('Với bạn bè dùng thể thường 久しぶり, bỏ お và bỏ です.', 'With friends use the plain form 久しぶり — drop お and です.', '友達には「お」と「です」を取った普通体「久しぶり」を使います。');
add('Nối mỗi câu với thể của nó.', 'Match each phrase with its form.', 'それぞれの表現と体を結んでください。');
add('Lâu rồi không gặp (lịch sự)', 'Long time no see (polite)', 'お久しぶりです（丁寧）');
add('Lâu rồi không gặp (thân mật)', 'Long time no see (casual)', '久しぶり（カジュアル）');
add('Anh/chị vẫn khoẻ chứ (lịch sự)', 'How have you been (polite)', 'お元気ですか（丁寧）');
add('Khoẻ không (thân mật)', 'How are you (casual)', '元気？（カジュアル）');
add('Cùng một ý, hai thể — chọn theo người nghe.', 'The same meaning in two forms — choose by the listener.', '意味は同じで体が違います。相手で選びます。');
add('Sắp xếp thành câu hỏi thăm sức khoẻ lịch sự.', 'Arrange the polite “how have you been” question.', '丁寧に様子をたずねる文に並べかえてください。');
add('お元気 + です + か → お元気ですか？ 久しぶり và うん không dùng ở đây.', 'お元気 + です + か → お元気ですか？ 久しぶり and うん are not used here.', '「お元気」＋「です」＋「か」→「お元気ですか？」「久しぶり」と「うん」はここでは使いません。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄をうめて会話を完成させてください。');
add('Bạn bè chào nhau bằng thể thường, hai bên cùng nói 久しぶり.', 'Friends greet each other in the plain form; both say 久しぶり.', '友達同士は普通体であいさつし、どちらも「久しぶり」と言います。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今、どの文を聞きましたか。');
add('Anh/chị vẫn khoẻ chứ', 'How have you been', 'お元気ですか');
add('Chào buổi sáng', 'Good morning', 'おはようございます');
add('Câu nghe được là お久しぶりです — có お và có です nên là thể lịch sự.', 'The sentence you heard is お久しぶりです — it has お and です, so it is the polite form.', '聞こえた文は「お久しぶりです」です。「お」と「です」があるので丁寧体です。');
add('Một người quen hỏi bạn 「お元気ですか？」.', 'An acquaintance asks you 「お元気ですか？」.', '知り合いに「お元気ですか？」とたずねられます。');
add('Một người quen hỏi bạn 「お元気ですか？」. Đáp lịch sự thế nào?', 'An acquaintance asks you 「お元気ですか？」. How do you reply politely?', '知り合いに「お元気ですか？」とたずねられます。丁寧にどう答えますか。');
add('はい。おかげさまで。 là câu đáp lịch sự; うん。元気。 là thể thường, dùng với bạn bè.', 'はい。おかげさまで。 is the polite reply; うん。元気。 is the plain form, used with friends.', '「はい。おかげさまで。」は丁寧な答え、「うん。元気。」は友達に使う普通体です。');
add('「元気（げんき）？」 dùng với ai?', 'Who do you use 「元気？」 with?', '「元気？」は誰に使いますか。');
add('Bạn bè và người ngang hàng đã thân', 'Friends and close peers', '友達や親しい同等の相手');
add('Thầy cô và người trên', 'Teachers and seniors', '先生や目上の人');
add('Người mới gặp lần đầu', 'Someone you are meeting for the first time', '初めて会う人');
add('Khách hàng', 'Customers', 'お客さん');
add('元気？ là thể thường; với thầy cô và người trên dùng お元気ですか？.', '元気？ is the plain form; with teachers and seniors use お元気ですか？.', '「元気？」は普通体です。先生や目上の人には「お元気ですか？」を使います。');
add('Checkpoint 5 câu nhỏ', 'Checkpoint: 5 short questions', 'チェックポイント：小問5つ');
add('お久（ひさ）しぶりです thuộc thể nào?', 'Which form is お久しぶりです?', '「お久しぶりです」はどの体ですか。');
add('Thể lịch sự', 'The polite form', '丁寧体');
add('Thể thường', 'The plain form', '普通体');
add('Cả hai như nhau', 'Both are the same', 'どちらも同じ');
add('Không thuộc thể nào', 'Neither form', 'どちらでもない');
add('Có お ở đầu và です ở cuối — dấu hiệu của thể lịch sự.', 'It has お at the front and です at the end — the marks of the polite form.', '頭に「お」、終わりに「です」があります。丁寧体のしるしです。');
add('Bỏ お và です khỏi お久（ひさ）しぶりです thì còn gì?', 'What remains when you drop お and です from お久しぶりです?', '「お久しぶりです」から「お」と「です」を取ると何が残りますか。');
add('お久しぶりです → 久しぶり là cặp lịch sự ↔ thân mật.', 'お久しぶりです → 久しぶり is the polite ↔ casual pair.', '「お久しぶりです」→「久しぶり」は丁寧とカジュアルの対です。');
add('Đáp thân mật cho câu 「元気（げんき）？」 là gì?', 'What is the casual reply to 「元気？」?', '「元気？」へのカジュアルな答えは何ですか。');
add('うん là はい ở thể thường; đi cùng 元気 không có です.', 'うん is はい in the plain form; it goes with 元気 without です.', '「うん」は「はい」の普通体で、「です」の付かない「元気」と一緒に使います。');
add('おかげさまで đi cùng từ nào ở đầu câu?', 'Which word comes before おかげさまで?', '「おかげさまで」の前にはどの言葉が来ますか。');
add('Trong nguồn, câu đáp lịch sự là はい。おかげさまで。', 'In the source, the polite reply is はい。おかげさまで。', '出典では、丁寧な答えは「はい。おかげさまで。」です。');
add('Với thầy cô thì câu nào KHÔNG dùng được?', 'Which sentence can NOT be used with a teacher?', '先生に使えない文はどれですか。');
add('元気？ là thể thường, không dùng với thầy cô.', '元気？ is the plain form and is not used with a teacher.', '「元気？」は普通体なので、先生には使いません。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させてください');
add('Hai người quen gặp lại nhau sau lâu ngày, cả hai đều dùng thể lịch sự. Nhập từ phù hợp vào hai ô trống.', 'Two acquaintances meet again after a long time, both using the polite form. Type the right words in the two blanks.', '久しぶりに再会した知り合い二人が、どちらも丁寧体で話します。二つの空欄に合う言葉を入力してください。');
add('Bạn làm tốt lắm!', 'Well done!', 'よくできました！');
add('Ô này đáp lại lời chào lâu ngày không gặp, ở thể lịch sự.', 'This blank replies to the reunion greeting, in the polite form.', 'この空欄は、久しぶりのあいさつへの丁寧体の返事です。');
add('Được chào お久しぶりです thì đáp lại đúng câu đó.', 'When greeted with お久しぶりです, reply with the same phrase.', '「お久しぶりです」と言われたら、同じ言葉で返します。');
add('Ô này là phần sau của câu đáp lịch sự はい。___。', 'This blank is the second half of the polite reply はい。___。', 'この空欄は、丁寧な答え「はい。___。」の後半です。');
add('はい。おかげさまで。 là câu đáp lịch sự cho お元気ですか？.', 'はい。おかげさまで。 is the polite reply to お元気ですか？.', '「はい。おかげさまで。」は「お元気ですか？」への丁寧な答えです。');
add('Sắp xếp thành câu đáp thân mật. Có thẻ không cần dùng.', 'Arrange the casual reply. Some cards are not needed.', 'カジュアルな答えに並べかえてください。使わないカードがあります。');
add('うん + 元気 → うん。元気。 はい và おかげさまで là thể lịch sự, không đi với thể thường.', 'うん + 元気 → うん。元気。 はい and おかげさまで are polite forms and do not go with the plain form.', '「うん」＋「元気」→「うん。元気。」「はい」と「おかげさまで」は丁寧体なので、普通体には合いません。');
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '一番自然な会話を選んでください。');
add('A tự nhiên: hai bên cùng thể thường. B lệch vì đáp câu lịch sự bằng thể thường. C thừa và lệch thể. D sai vì được hỏi sức khoẻ mà lại đáp bằng lời chào.', 'A is natural: both use the plain form. B is off because it answers a polite greeting in the plain form. C is padded and mixes forms. D is wrong because it answers a “how are you” with a greeting.', 'Aが自然です。二人とも普通体です。Bは丁寧なあいさつに普通体で答えているのでずれます。Cは余計で体も混ざっています。Dは様子をたずねられたのにあいさつで答えているので誤りです。');
add('Sắp xếp thành lời chào và hỏi thăm lịch sự. Có thẻ không cần dùng.', 'Arrange the polite greeting and “how have you been” question. Some cards are not needed.', '丁寧なあいさつと様子をたずねる文に並べかえてください。使わないカードがあります。');
add('あ + お久しぶり + です + お元気 + です + か → あ、お久しぶりです。お元気ですか？ うん và 元気 là thể thường, không đi với thể lịch sự.', 'あ + お久しぶり + です + お元気 + です + か → あ、お久しぶりです。お元気ですか？ うん and 元気 are plain forms and do not go with the polite form.', '「あ」＋「お久しぶり」＋「です」＋「お元気」＋「です」＋「か」→「あ、お久しぶりです。お元気ですか？」「うん」と「元気」は普通体なので丁寧体には合いません。');

// ── Q14 scenario + dialogue line translations ───────────────────────────
add('Ba lần gặp lại sau lâu ngày', 'Three reunions after a long time', '久しぶりの再会、三つの場面');
add('Ba cuộc chào hỏi giữa hai người lâu ngày không gặp. Cùng một việc, nhưng thể lịch sự và thể thường được chọn khác nhau ở từng cuộc.', 'Three greetings between people who have not met for a long time. The same act, but the polite and plain forms are chosen differently each time.', '久しぶりに会った二人のあいさつが三つ。同じことをしていますが、丁寧体と普通体の選び方が場面ごとに違います。');
add('Một ngày khác', 'Another day', 'べつの日');
add('À, lâu rồi không gặp ạ.', 'Ah, it has been a long time.', 'あ、お久しぶりです。');
add('Lâu rồi không gặp ạ.', 'It has been a long time.', 'お久しぶりです。');
add('Anh/chị vẫn khoẻ chứ ạ?', 'How have you been?', 'お元気ですか。');
add('Vâng, nhờ ơn anh/chị, tôi vẫn khoẻ.', 'Yes, thanks to you, I am well.', 'はい。おかげさまで。');
add('À, lâu rồi không gặp!', 'Ah, long time no see!', 'あ、久しぶり。');
add('Lâu rồi không gặp!', 'Long time no see!', '久しぶり。');
add('À, lâu rồi không gặp.', 'Ah, long time no see.', 'あ、久しぶり。');
add('Ừ, khoẻ.', 'Yeah, I am fine.', 'うん。元気。');
add('Vâng, nhờ thầy, em vẫn khoẻ.', 'Yes, thanks to you, I am well.', 'はい。おかげさまで。');

// Ngữ cảnh bài tập (owner chốt 2026-07-30).
add(
  'Hai người bạn thân tình cờ gặp lại nhau sau lâu ngày. Tanaka chào trước bằng thể thân mật; đến lượt Sato đáp lại.',
  'Two close friends run into each other again after a long time. Tanaka greets first in the casual form; now it is Sato’s turn to reply.',
  '仲のいい友だち二人が久しぶりに偶然会います。田中さんがくだけた言い方で先にあいさつしました。次は佐藤さんが返事をします。',
);
add(
  'Hai người quen lâu ngày không gặp nhắn tin cho nhau: chào hỏi rồi hỏi thăm sức khoẻ nhau, cả hai đều dùng thể lịch sự. Nhập từ phù hợp vào hai ô trống.',
  'Two acquaintances who have not met for a long time are messaging: they greet, then ask after each other’s health, both using the polite form. Type the right words in the two blanks.',
  '久しぶりの知り合い二人がメッセージをやりとりします。あいさつをして、おたがいの様子をたずね合います。二人とも丁寧な言い方を使います。二つの空欄に合う言葉を入力してください。',
);

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
