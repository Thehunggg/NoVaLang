import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map — Daily Life / Module 1 / Unit 2 / Lesson 2
// (ja-daily_life-m01-u2-l2, "Đáp lời hỏi thăm"). Mọi chuỗi hỗ trợ tiếng Việt
// dùng trong ja-unit2-lesson2.mjs phải có dòng en/ja ở đây, không thì generate
// fail loud. Câu tiếng Nhật là NGUYÊN VĂN theo sổ chất liệu (commit 2c79faf).
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Meta ────────────────────────────────────────────────────────────────
add('Gặp lại người đã quen', 'Meeting Someone You Already Know', '知り合いに再会する');
add('Đáp lời hỏi thăm', 'Reply When Asked How You Are', '近況を聞かれて答える');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Hỏi người khác đã ở Nhật bao lâu bằng どのぐらい.', 'Ask how long someone has been in Japan with どのぐらい.', '「どのぐらい」で日本に来てからの期間をたずねられます。');
add('Trả lời bằng mốc thời gian + になります.', 'Answer with a time span + になります.', '「期間＋になります」で答えられます。');
add('Hỏi đã quen chưa bằng もう慣れましたか.', 'Ask whether someone has settled in with もう慣れましたか.', '「もう慣れましたか」で慣れたかどうかをたずねられます。');
add('Đáp khẳng định bằng はい、おかげさまで.', 'Answer yes politely with はい、おかげさまで.', '「はい、おかげさまで」で丁寧に肯定できます。');
add('Đáp phủ định nhẹ nhàng bằng まだ、ちょっと.', 'Decline gently with まだ、ちょっと.', '「まだ、ちょっと」でやわらかく否定できます。');
add('Kể mốc thời gian đã đến bằng 去年 và 先月.', 'Say when you arrived using 去年 and 先月.', '「去年」「先月」で来た時期を言えます。');

// ── Intro situation ─────────────────────────────────────────────────────
add('Bạn gặp lại người quen và được hỏi thăm về cuộc sống dạo này.', 'You meet an acquaintance again and are asked how life has been.', '知り合いに再会し、近況をたずねられます。');
add('Bạn kể mình đến Nhật bao lâu rồi và đã quen hay chưa.', 'You say how long you have been in Japan and whether you have settled in.', '日本に来てどのぐらいか、慣れたかどうかを話します。');

// ── Intro example labels ────────────────────────────────────────────────
add('Người ta hỏi bạn:', 'You are asked:', 'こうたずねられます。');
add('Bạn đáp bằng mốc thời gian:', 'You answer with a time span:', '期間で答えます。');
add('Được hỏi đã quen chưa, bạn đáp:', 'Asked whether you have settled in, you answer:', '慣れたかたずねられたら、こう答えます。');

// ── Intro important note ────────────────────────────────────────────────
add('どのぐらい hỏi ĐỘ DÀI thời gian, khác với いつ hỏi thời điểm.', 'どのぐらい asks about a LENGTH of time; いつ asks about a point in time.', '「どのぐらい」は期間の長さ、「いつ」は時点をたずねます。');
add('もう đi với câu hỏi nghĩa "đã… chưa"; まだ là câu đáp "vẫn chưa".', 'もう makes the question “已 already…?”; まだ is the answer “not yet”.', '「もう」は「もう〜しましたか」の質問、「まだ」はその否定の答えです。');
add('まだ、ちょっと…… bỏ lửng cuối câu là cách từ chối/phủ định nhẹ nhàng, rất thường gặp.', 'Trailing off after まだ、ちょっと…… is a very common, gentle way to say no.', '「まだ、ちょっと……」と言いさすのは、やわらかい否定のよくある言い方です。');

// ── Register (§B2e) ─────────────────────────────────────────────────────
add('Lịch sự.', 'Polite.', '丁寧。');
add('Thân mật.', 'Casual.', 'カジュアル。');

// ── Vocabulary meanings ─────────────────────────────────────────────────
add('Bao lâu.', 'How long.', 'どのぐらい。');
add('Quen với.', 'To get used to.', '慣れる。');
add('Nhật Bản.', 'Japan.', '日本。');
add('Cuộc sống, sinh hoạt.', 'Life, daily living.', '生活。');
add('Tròn / được (bao lâu).', 'It has been (a period).', '〜になります。');
add('Đã… rồi.', 'Already.', 'もう。');
add('Vẫn chưa.', 'Not yet.', 'まだ。');
add('Năm ngoái.', 'Last year.', '去年。');
add('Tháng trước.', 'Last month.', '先月。');
add('Nửa năm.', 'Half a year.', '半年。');
add('Cũng tạm, xoay xở được.', 'Somehow, managing.', 'なんとか。');

// ── Vocabulary detail fields (§B2c) ─────────────────────────────────────
add('Hỏi độ dài thời gian.', 'Asking about a length of time.', '期間の長さをたずねるとき。');
add('Nói về việc đã quen với nơi ở hoặc công việc mới.', 'Talking about getting used to a new place or job.', '新しい場所や仕事に慣れることについて話すとき。');
add('Tên nước Nhật Bản.', 'The name of the country Japan.', '国の名前「日本」。');
add('Nói về cuộc sống, sinh hoạt hằng ngày.', 'Talking about daily life.', '日々の生活について話すとき。');
add('Nói mốc thời gian đã tròn bao lâu.', 'Saying how long a period has become.', '期間がどのぐらいになったかを言うとき。');
add('Hỏi hoặc nói việc gì đó đã xong.', 'Asking or saying that something is already done.', 'すでに終わったことをたずねる・言うとき。');
add('Đáp rằng việc gì đó vẫn chưa xong.', 'Answering that something is not done yet.', 'まだ終わっていないと答えるとき。');
add('Chỉ mốc thời gian năm ngoái.', 'The time point “last year”.', '「去年」という時点。');
add('Chỉ mốc thời gian tháng trước.', 'The time point “last month”.', '「先月」という時点。');
add('Mọi đối tượng', 'Anyone', '誰にでも');
add('Không dùng để hỏi thời điểm — đó là いつ.', 'Do not use it to ask a point in time — that is いつ.', '時点をたずねるときには使いません。それは「いつ」です。');
add('Không đổi trợ từ に thành が hay を.', 'Do not change the particle に to が or を.', '助詞「に」を「が」や「を」に変えません。');
add('Cách lịch sự:', 'Polite form:', '丁寧な言い方：');
add('Dùng với:', 'Use with:', '使う相手：');
add('Dạng từ điển; trong hội thoại thường gặp ở dạng 慣れました.', 'Dictionary form; in conversation it usually appears as 慣れました.', '辞書形です。会話では「慣れました」の形でよく出ます。');

// ── Card 3 · dialogue groups ────────────────────────────────────────────
add('Đã ở một năm, đã quen', 'One year in, already settled', '一年たって、もう慣れた');
add('Hai người quen gặp nhau. Một người hỏi thăm người kia đã ở Nhật bao lâu và đã quen chưa.', 'Two acquaintances meet. One asks how long the other has been in Japan and whether they have settled in.', '知り合い二人が会います。一方が、日本に来てどのぐらいか、慣れたかをたずねます。');
add('Đến từ tháng 9 năm ngoái', 'Arrived last September', '去年の9月に来た');
add('Cùng câu hỏi, nhưng người này trả lời bằng thời điểm đã đến thay vì độ dài thời gian.', 'The same question, but this person answers with the arrival date instead of a length of time.', '同じ質問ですが、この人は期間ではなく来た時期で答えます。');
add('Mới đến, chưa quen', 'Just arrived, not settled yet', '来たばかりで、まだ慣れない');
add('Người vừa đến tháng trước, được hỏi đã quen chưa và đáp là vẫn chưa.', 'Someone who arrived last month is asked whether they have settled in, and says not yet.', '先月来たばかりの人が、慣れたかたずねられて「まだ」と答えます。');
add('どのぐらいになりますか hỏi đã được bao lâu; đáp bằng mốc thời gian + になります.', 'どのぐらいになりますか asks how long it has been; answer with a time span + になります.', '「どのぐらいになりますか」は期間をたずねます。「期間＋になります」で答えます。');
add('もう慣れましたか hỏi đã quen chưa; đáp はい là đã quen.', 'もう慣れましたか asks whether you have settled in; はい means you have.', '「もう慣れましたか」は慣れたかをたずねます。「はい」なら慣れたという意味です。');
add('Câu hỏi どのぐらい có thể đáp bằng ĐỘ DÀI (1年) hoặc bằng THỜI ĐIỂM đã đến (去年の9月).', 'A どのぐらい question can be answered with a LENGTH (1年) or with the ARRIVAL time (去年の9月).', '「どのぐらい」の質問には、期間（1年）でも、来た時期（去年の9月）でも答えられます。');
add('はい、おかげさまで lịch sự hơn はい trần — cụm này đã học ở bài trước.', 'はい、おかげさまで is more polite than plain はい — learned in the previous lesson.', '「はい、おかげさまで」は「はい」より丁寧です。前のレッスンで学びました。');
add('まだ、ちょっと…… bỏ lửng cuối câu là cách đáp phủ định nhẹ nhàng, không nói thẳng "chưa quen".', 'Trailing off with まだ、ちょっと…… is a gentle way to say no without stating “not used to it yet”.', '「まだ、ちょっと……」と言いさすのは、「慣れていない」と直接言わないやわらかい否定です。');
add('少し慣れましたか hỏi đã quen được một chút chưa — nhẹ hơn もう慣れましたか.', '少し慣れましたか asks whether you have settled in a little — softer than もう慣れましたか.', '「少し慣れましたか」は少し慣れたかをたずねます。「もう慣れましたか」よりやわらかいです。');

// ── Card 4 · grammar patterns ───────────────────────────────────────────
add('[nơi] ＋ に来（き）て、どのぐらいですか', '[place] ＋ に来て、どのぐらいですか', '［場所］＋に来て、どのぐらいですか');
add('Hỏi đã đến nơi đó được bao lâu.', 'Asking how long since you came to that place.', 'その場所に来てからどのぐらいかをたずねます。');
add('来る đi với trợ từ に chỉ nơi đến, không dùng で.', '来る takes the particle に for the destination, never で.', '「来る」は行き先に助詞「に」を使い、「で」は使いません。');
add('Có thể nói どのぐらいですか hoặc どのぐらいになりますか, nghĩa như nhau.', 'You may say どのぐらいですか or どのぐらいになりますか — same meaning.', '「どのぐらいですか」でも「どのぐらいになりますか」でも、意味は同じです。');
add('[mốc thời gian] ＋ になります', '[time span] ＋ になります', '［期間］＋になります');
add('Tròn / được bao lâu.', 'It has been (a period).', '〜になります。');
add('Người kia đã trở nên nổi tiếng rồi.', 'That person has become famous.', 'あの人は有名になりました。');
add('になります dùng cho cả mốc thời gian lẫn sự thay đổi trạng thái.', 'になります works for both a time span and a change of state.', '「になります」は期間にも、状態の変化にも使えます。');
add('Trợ từ luôn là に — đổi sang が hay を là sai.', 'The particle is always に — changing it to が or を is wrong.', '助詞は必ず「に」です。「が」や「を」に変えると誤りです。');
add('もう ＋ [động từ] ＋ ましたか', 'もう ＋ [verb] ＋ ましたか', 'もう＋［動詞］＋ましたか');
add('Đã… chưa?', 'Have you already…?', 'もう〜しましたか。');
// Bản dịch LẤY TỪ NGUỒN n5_ngu-phap-vi.txt:927-928, nối lại hai dòng bị ngắt
// khi bóc PDF → authored, reason "hiệu đính từ <file>:<dòng>" (§G14-R1).
add('Tôi đã uống thuốc rồi nên bây giờ không sao.', 'I took the medicine, so I am fine now.', '薬を飲んだので、もう大丈夫です。');
add('もう đặt trước động từ, mang nghĩa "đã… rồi".', 'もう goes before the verb and means “already”.', '「もう」は動詞の前に置き、「すでに」の意味です。');
add('Câu đáp khẳng định là はい; đáp phủ định dùng まだ.', 'The affirmative answer is はい; the negative uses まだ.', '肯定の答えは「はい」、否定は「まだ」を使います。');
add('まだ — đáp "vẫn chưa"', 'まだ — answering “not yet”', 'まだ — 「まだ」で答える');
add('まだ ＋ [phần bỏ lửng hoặc ていません]', 'まだ ＋ [trailing off or ていません]', 'まだ＋［言いさし または ていません］');
add('Tôi vẫn chưa ăn sáng.', 'I have not eaten breakfast yet.', 'まだ朝ごはんを食べていません。');
add('まだ là câu đáp đối lại もう.', 'まだ is the answer that opposes もう.', '「まだ」は「もう」に対する答えです。');
add('Bỏ lửng sau ちょっと là cách nói giảm nhẹ, lịch sự hơn nói thẳng.', 'Trailing off after ちょっと softens the reply and is politer than saying it outright.', '「ちょっと」のあとを言いさすと、直接言うよりやわらかく丁寧になります。');
add('[động từ] ＋ ました — quá khứ lịch sự', '[verb] ＋ ました — polite past', '［動詞］＋ました — 丁寧な過去');
add('Đã làm gì đó (lịch sự).', 'Did something (polite).', '〜しました（丁寧）。');
add('Tôi đã ăn bánh ngọt.', 'I ate cake.', 'わたしはケーキを食べました。');
add('ました là dạng quá khứ của ます.', 'ました is the past form of ます.', '「ました」は「ます」の過去形です。');
add('Dùng để kể mốc thời gian đã đến hoặc việc đã làm.', 'Used to say when you arrived or what you did.', '来た時期や、したことを言うのに使います。');

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

// ── Q1–Q13 ──────────────────────────────────────────────────────────────
add('「日本（にほん）に来（き）て、どのぐらいですか？」 hỏi điều gì?', 'What does 「日本に来て、どのぐらいですか？」 ask?', '「日本に来て、どのぐらいですか？」は何をたずねていますか。');
add('Bạn đến Nhật được bao lâu rồi?', 'How long have you been in Japan?', '日本に来て、どのぐらいですか。');
add('Bạn đến từ đâu?', 'Where are you from?', 'どこから来ましたか。');
add('Bạn làm nghề gì?', 'What is your job?', 'どんな仕事をしていますか。');
add('Bạn bao nhiêu tuổi?', 'How old are you?', '何歳ですか。');
add('どのぐらい hỏi độ dài thời gian; ghép với 来て thành câu hỏi đã ở Nhật bao lâu.', 'どのぐらい asks a length of time; with 来て it asks how long you have been in Japan.', '「どのぐらい」は期間をたずねます。「来て」と合わせて、日本に来てからの期間をたずねます。');
add('Bạn đã ở Nhật tròn một năm.', 'You have been in Japan for exactly one year.', '日本に来てちょうど一年です。');
add('Bạn đã ở Nhật tròn một năm. Đáp thế nào?', 'You have been in Japan for exactly one year. How do you answer?', '日本に来てちょうど一年です。どう答えますか。');
add('Mốc thời gian đi với trợ từ に: 1年になります。 Các phương án khác sai trợ từ hoặc lặp trợ từ.', 'A time span takes the particle に: 1年になります。 The others use the wrong particle or repeat it.', '期間には助詞「に」を使います。ほかの選択肢は助詞が違うか、助詞が重なっています。');
add('Nối mỗi từ với nghĩa của nó.', 'Match each word with its meaning.', 'それぞれの言葉と意味を結んでください。');
add('Bao lâu', 'How long', 'どのぐらい');
add('Quen với', 'Get used to', '慣れる');
add('Đã… rồi', 'Already', 'もう');
add('Vẫn chưa', 'Not yet', 'まだ');
add('もう và まだ là cặp đối nhau: đã rồi ↔ vẫn chưa.', 'もう and まだ are an opposing pair: already ↔ not yet.', '「もう」と「まだ」は対になります。');
add('Sắp xếp thành câu trả lời "tròn một năm".', 'Arrange the answer meaning “exactly one year”.', '「ちょうど一年」という答えに並べかえてください。');
add('1年 + に + なります → 1年になります。 もう và まだ không dùng ở đây.', '1年 + に + なります → 1年になります。 もう and まだ are not used here.', '「1年」＋「に」＋「なります」→「1年になります。」「もう」と「まだ」はここでは使いません。');
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄をうめて会話を完成させてください。');
add('Được hỏi đã ở bao lâu thì đáp bằng mốc thời gian + になります.', 'When asked how long, answer with a time span + になります.', '期間をたずねられたら「期間＋になります」で答えます。');
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今、どの文を聞きましたか。');
add('Vậy à. Bạn quen chưa?', 'I see. Have you settled in?', 'そうですか。もう慣れましたか。');
add('Vậy à. Bạn đến bao lâu rồi?', 'I see. How long have you been here?', 'そうですか。どのぐらいですか。');
add('Vậy à. Bạn ở đâu?', 'I see. Where do you live?', 'そうですか。どこに住んでいますか。');
add('Vậy à. Bạn khoẻ không?', 'I see. How are you?', 'そうですか。お元気ですか。');
add('もう慣れましたか？ hỏi đã quen với cuộc sống ở đây chưa.', 'もう慣れましたか？ asks whether you have settled into life here.', '「もう慣れましたか？」は、ここでの生活に慣れたかをたずねます。');
add('Được hỏi 「もう慣（な）れましたか？」 nhưng bạn vẫn CHƯA quen.', 'You are asked 「もう慣れましたか？」 but you have NOT settled in yet.', '「もう慣れましたか？」とたずねられましたが、まだ慣れていません。');
add('Được hỏi 「もう慣（な）れましたか？」 nhưng bạn vẫn CHƯA quen. Đáp thế nào?', 'You are asked 「もう慣れましたか？」 but have NOT settled in yet. How do you answer?', '「もう慣れましたか？」とたずねられましたが、まだ慣れていません。どう答えますか。');
add('まだ、ちょっと…… là cách đáp "vẫn chưa" một cách nhẹ nhàng. はい nghĩa là ĐÃ quen; 1年になります trả lời câu hỏi khác.', 'まだ、ちょっと…… is the gentle “not yet”. はい means you HAVE settled in; 1年になります answers a different question.', '「まだ、ちょっと……」はやわらかい「まだ」です。「はい」は慣れたという意味、「1年になります」は別の質問への答えです。');
add('「はい、おかげさまで。」 dùng khi nào?', 'When do you use 「はい、おかげさまで。」?', '「はい、おかげさまで。」はどんなときに使いますか。');
add('Đáp khẳng định một cách lịch sự và biết ơn', 'Answering yes politely and with gratitude', '丁寧に、感謝をこめて肯定するとき');
add('Từ chối lời mời', 'Turning down an invitation', 'さそいを断るとき');
add('Xin lỗi vì đến muộn', 'Apologising for being late', '遅れたことをあやまるとき');
add('Hỏi lại vì chưa nghe rõ', 'Asking again because you did not hear', '聞こえなかったので聞き返すとき');
add('おかげさまで đã học ở bài trước — đáp có, kèm ý nhờ ơn người hỏi.', 'おかげさまで was learned last lesson — yes, thanks to you.', '「おかげさまで」は前のレッスンで学びました。相手のおかげという気持ちをこめた肯定です。');
add('Checkpoint 5 câu nhỏ', 'Checkpoint: 5 short questions', 'チェックポイント：小問5つ');
add('どのぐらい hỏi về điều gì?', 'What does どのぐらい ask about?', '「どのぐらい」は何をたずねますか。');
add('Độ dài thời gian', 'A length of time', '期間の長さ');
add('Nơi chốn', 'A place', '場所');
add('Lý do', 'A reason', '理由');
add('Người', 'A person', '人');
add('どのぐらい = bao lâu / bao nhiêu.', 'どのぐらい = how long / how much.', '「どのぐらい」＝どれくらいの長さ・量。');
add('もう đi với câu hỏi mang nghĩa gì?', 'What does もう mean in a question?', '質問の中の「もう」はどんな意味ですか。');
add('Đã… chưa?', 'Already…?', 'もう〜しましたか。');
add('Chưa bao giờ', 'Never', '一度も〜ない');
add('Lại lần nữa', 'Once more', 'もう一度');
add('もう慣れましたか？ = đã quen chưa?', 'もう慣れましたか？ = have you settled in yet?', '「もう慣れましたか？」＝もう慣れましたか。');
add('まだ nghĩa là gì?', 'What does まだ mean?', '「まだ」はどんな意味ですか。');
add('Đã rồi', 'Already', 'もう');
add('Rất', 'Very', 'とても');
add('Có lẽ', 'Maybe', 'たぶん');
add('まだ、ちょっと…… = vẫn chưa, hơi khó một chút.', 'まだ、ちょっと…… = not yet, it is still a bit hard.', '「まだ、ちょっと……」＝まだ慣れていない、少し難しい。');
add('Mốc thời gian đi với trợ từ nào trong 「1年＿なります」?', 'Which particle goes in 「1年＿なります」?', '「1年＿なります」にはどの助詞が入りますか。');
add('1年になります — mốc thời gian đi với に.', '1年になります — a time span takes に.', '「1年になります」— 期間には「に」を使います。');
add('「去年（きょねん）」 nghĩa là gì?', 'What does 「去年」 mean?', '「去年」はどんな意味ですか。');
add('Năm ngoái', 'Last year', '去年');
add('Tháng trước', 'Last month', '先月');
add('Năm nay', 'This year', '今年');
add('Năm sau', 'Next year', '来年');
add('去年 = năm ngoái; 先月 = tháng trước.', '去年 = last year; 先月 = last month.', '「去年」＝去年、「先月」＝先月。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させてください');
add('Hai người quen nhắn tin hỏi thăm nhau. Nhập từ phù hợp vào hai ô trống.', 'Two acquaintances message each other. Type the right words in the two blanks.', '知り合い二人がメッセージで近況をたずね合います。二つの空欄に合う言葉を入力してください。');
add('Bạn làm tốt lắm!', 'Well done!', 'よくできました！');
add('Ô này trả lời câu hỏi đã ở bao lâu.', 'This blank answers how long you have been here.', 'この空欄は、どのぐらいかという質問への答えです。');
add('Mốc thời gian + になります.', 'A time span + になります.', '期間＋になります。');
add('Ô này là phần sau của câu đáp lịch sự はい、___。', 'This blank is the second half of the polite reply はい、___。', 'この空欄は、丁寧な答え「はい、___。」の後半です。');
add('はい、おかげさまで。 là câu đáp khẳng định lịch sự đã học ở bài trước.', 'はい、おかげさまで。 is the polite yes learned in the previous lesson.', '「はい、おかげさまで。」は前のレッスンで学んだ丁寧な肯定です。');
add('Sắp xếp thành câu đáp "vẫn chưa quen lắm". Có thẻ không cần dùng.', 'Arrange the answer “not quite settled in yet”. Some cards are not needed.', '「まだあまり慣れていない」という答えに並べかえてください。使わないカードがあります。');
add('まだ + ちょっと → まだ、ちょっと……。 もう và はい mang nghĩa ngược lại.', 'まだ + ちょっと → まだ、ちょっと……。 もう and はい mean the opposite.', '「まだ」＋「ちょっと」→「まだ、ちょっと……。」「もう」と「はい」は反対の意味です。');
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '一番自然な会話を選んでください。');
add('A đúng: hỏi bao lâu, đáp bằng mốc thời gian. B sai trợ từ 来る đi với に không phải で. C đáp có/không cho câu hỏi bao lâu. D lặp trợ từ に.', 'A is right: asks how long, answers with a time. B uses the wrong particle — 来る takes に, not で. C answers yes/no to a how-long question. D repeats the particle に.', 'Aが正しいです。期間をたずね、時期で答えています。Bは助詞が誤りで、「来る」は「に」を使います。Cは期間の質問に「はい」で答えています。Dは助詞「に」が重なっています。');
add('Sắp xếp thành câu hỏi đã ở Nhật bao lâu. Có thẻ không cần dùng.', 'Arrange the question asking how long someone has been in Japan. Some cards are not needed.', '日本に来てどのぐらいかをたずねる文に並べかえてください。使わないカードがあります。');
add('日本 + に + 来て + どのぐらい + です + か → 日本に来て、どのぐらいですか？ 来る đi với に, không phải で.', '日本 + に + 来て + どのぐらい + です + か → 日本に来て、どのぐらいですか？ 来る takes に, not で.', '「日本」＋「に」＋「来て」＋「どのぐらい」＋「です」＋「か」→「日本に来て、どのぐらいですか？」「来る」は「に」を使い、「で」は使いません。');

// ── Q14 + dòng thoại ────────────────────────────────────────────────────
add('Hai lần được hỏi thăm', 'Asked twice about how you have been', '近況を二度たずねられる');
add('Hai cuộc hỏi thăm khác nhau. Cùng một câu hỏi, hai người trả lời theo hai cách: một người đã quen, một người thì chưa.', 'Two different exchanges. The same question, two answers: one person has settled in, the other has not.', '二つの場面。同じ質問に、一人は慣れたと答え、もう一人はまだと答えます。');
add('Một ngày khác', 'Another day', 'べつの日');
add('Được tròn một năm rồi ạ.', 'It has been one year.', '一年になります。');
add('Vậy à. Bạn quen với cuộc sống ở Nhật chưa?', 'I see. Have you got used to life in Japan?', 'そうですか。日本の生活に、もう慣れましたか。');
add('Vâng, quen rồi ạ.', 'Yes, I have.', 'はい。');
add('Tôi đến vào tháng 9 năm ngoái.', 'I came last September.', '去年の9月に来ました。');
add('Vâng, nhờ ơn anh/chị, tôi quen rồi.', 'Yes, thanks to you, I have.', 'はい、おかげさまで。');
add('Em đến Nhật được bao lâu rồi?', 'How long have you been in Japan?', '日本に来て、どのぐらいになりますか。');
add('Em mới đến tháng trước ạ.', 'I came last month.', '私は、先月、来ました。');
add('Vậy à. Em quen được một chút chưa?', 'I see. Have you got used to it a little?', 'そうですか。少し慣れましたか。');
add('Dạ vẫn chưa, hơi khó một chút ạ.', 'Not yet, it is still a bit hard.', 'まだ、ちょっと……。');
add('Đúng tròn nửa năm.', 'Exactly half a year.', 'ちょうど半年です。');
add('Vậy à. Bạn quen với Nhật chưa?', 'I see. Have you got used to Japan?', 'そうですか。日本に慣れましたか。');
add('Vâng, cũng tạm ạ.', 'Yes, more or less.', 'はい、なんとか。');
add('Vẫn chưa, hơi khó một chút.', 'Not yet, it is still a bit hard.', 'まだ、ちょっと……。');
add('Tôi mới đến tháng trước.', 'I came last month.', '私は、先月、来ました。');

// Ngữ cảnh bài tập (owner chốt 2026-07-30).
add(
  'Sato gặp Ito — người mới sang Nhật — và hỏi thăm đã ở đây bao lâu. Đến lượt Ito trả lời.',
  'Sato meets Ito, who recently came to Japan, and asks how long they have been here. Now it is Ito’s turn to answer.',
  '佐藤さんが、日本に来たばかりの伊藤さんに会い、日本に来てどのぐらいかをたずねます。次は伊藤さんが答えます。',
);
add(
  'Sato nhắn tin cho Ito lúc 19:30, hỏi thăm Ito sang Nhật được bao lâu rồi và đã quen với cuộc sống ở đây chưa. Nhập từ phù hợp vào hai ô trống.',
  'Sato messages Ito at 19:30, asking how long Ito has been in Japan and whether they have settled into life here. Type the right words in the two blanks.',
  '佐藤さんが19時30分に伊藤さんへメッセージを送り、日本に来てどのぐらいか、こちらの生活に慣れたかをたずねます。二つの空欄に合う言葉を入力してください。',
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
            `[u2l2-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[u2l2-support] missing en/ja translation for Vietnamese support ` +
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
