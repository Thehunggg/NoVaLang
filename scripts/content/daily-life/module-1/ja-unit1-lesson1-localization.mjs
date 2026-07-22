import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Dev affordance: with GOLDEN_COLLECT_MISSING=1 the generator collects every
// missing Vietnamese support string instead of throwing on the first one, so
// the full set of rows to add can be enumerated in a single pass.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

add('Chào và nói tên', 'Greetings and names', 'あいさつと名前');
add('Xin chào, tôi là…', 'Hello, I’m…', 'こんにちは、〜です');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');
add('Chọn lời chào phù hợp với thời điểm và quan hệ.', 'Choose a greeting that fits the time and relationship.', '時間帯や相手との関係に合うあいさつを選べます。');
add('Phân biệt cách nói lịch sự, trung tính và thân mật.', 'Distinguish polite, neutral, and casual speech.', '丁寧な言い方、中立的な言い方、カジュアルな言い方を区別できます。');
add('Nói tên của mình.', 'Say their own name.', '自分の名前を言えます。');
add('Thực hiện một lượt tự giới thiệu ngắn.', 'Give a short self-introduction.', '短い自己紹介ができます。');
add('Tránh dùng lời chào thân mật với sai đối tượng.', 'Avoid using a casual greeting with the wrong person.', '相手に合わないカジュアルなあいさつを避けられます。');
add('Người học vừa đến một lớp học tiếng Nhật.', 'The learner has just arrived at a Japanese class.', '学習者は日本語のクラスに来たところです。');
add('Đây là lần đầu gặp giáo viên và các bạn cùng lớp.', 'This is the first time they meet the teacher and classmates.', '先生やクラスメートと初めて会います。');
add('Giáo viên nói:', 'The teacher says:', '先生の言葉：');
add('Giáo viên:\nChào buổi sáng.', 'Teacher:\nGood morning.', '先生：\nおはようございます。');
add('Người học đáp:', 'The learner replies:', '学習者の返事：');
add('Chào buổi sáng.', 'Good morning.', 'おはようございます。');
add('Khi làm quen với một người mới, người học có thể nói:', 'When meeting someone new, the learner can say:', '初対面の人には、次のように言えます。');
add('Rất vui được gặp bạn lần đầu.\nTôi là Tanaka.\nRất mong được làm quen.', 'Nice to meet you.\nI’m Tanaka.\nI look forward to getting to know you.', 'はじめまして。\n田中です。\nよろしくお願いします。');
add('Trong tiếng Nhật, cách nói lịch sự và thân mật không phải lúc nào cũng có quan hệ một-một.', 'In Japanese, polite and casual expressions don’t always correspond one-to-one.', '日本語では、丁寧な表現とカジュアルな表現が常に一対一で対応するとは限りません。');
add('おはようございます có dạng thân mật rõ ràng là おはよう。', 'The clear casual form of おはようございます is おはよう。', '「おはようございます」の明確なカジュアル形は「おはよう」です。');
add('よろしくお願いします có thể rút gọn thành よろしく。', 'よろしくお願いします can be shortened to よろしく。', '「よろしくお願いします」は「よろしく」と短くできます。');
add('こんにちは không có một cách nói thân mật cố định tương đương.', 'こんにちは has no single fixed casual equivalent.', '「こんにちは」には、決まった一つのカジュアル形はありません。');
add('はじめまして thường vẫn được dùng ngay cả khi hai người cùng tuổi.', 'はじめまして is commonly used even when both people are the same age.', '同年代同士でも、通常は「はじめまして」を使います。');
add('Dùng vào buổi sáng.', 'Use it in the morning.', '朝に使います。');
add('Gặp giáo viên.', 'When meeting a teacher.', '先生に会うとき。');
add('Gặp cấp trên.', 'When meeting a supervisor.', '上司に会うとき。');
add('Gặp đồng nghiệp.', 'When meeting a coworker.', '同僚に会うとき。');
add('Gặp người chưa thân.', 'When meeting someone you don’t know well.', 'まだ親しくない人に会うとき。');
add('Bắt đầu buổi học hoặc ca làm việc.', 'At the start of a class or work shift.', '授業や勤務を始めるとき。');
add('Giáo viên', 'Teachers', '先生');
add('Người lớn tuổi', 'Older people', '年上の人');
add('Người mới gặp', 'People you’ve just met', '初対面の人');
add('Đồng nghiệp', 'Coworkers', '同僚');
add('Khách hàng', 'Customers', '顧客');
add('Không dùng như lời chào buổi chiều.', 'Don’t use it as an afternoon greeting.', '午後のあいさつとしては使いません。');
add('Không dùng như lời chào buổi tối.', 'Don’t use it as an evening greeting.', '夜のあいさつとしては使いません。');
add('Không dùng trước khi đi ngủ.', 'Don’t use it before going to sleep.', '寝る前には使いません。');
add('Lịch sự.', 'Polite.', '丁寧。');
add('Cách thân mật chuẩn:', 'Standard casual form:', '標準的なカジュアル形：');
add('Dùng với:', 'Use with:', '使える相手：');
add('Bạn bè', 'Friends', '友達');
add('Anh chị em', 'Siblings', 'きょうだい');
add('Người trong gia đình', 'Family members', '家族');
add('Người ngang tuổi đã thân', 'Close peers of the same age', '親しい同年代の人');
add('Không nên dùng おはよう trống với cấp trên hoặc khách hàng khi quan hệ chưa đủ gần.', 'Don’t use bare おはよう with supervisors or customers unless the relationship is close enough.', '十分に親しい関係でない上司や顧客には、「おはよう」だけを使わない方が安全です。');
add('Chào buổi sáng, thầy/cô.', 'Good morning, teacher.', '先生、おはようございます。');
add('Sato, chào buổi sáng!', 'Good morning, Sato!', '佐藤さん、おはよう！');
add('Lời chào thường dùng sau khoảng thời gian chào buổi sáng và trước khi chuyển sang lời chào buổi tối.', 'A greeting commonly used after the morning-greeting period and before evening greetings become natural.', '朝のあいさつを使う時間帯の後から、夜のあいさつに切り替わる前までによく使うあいさつです。');
add('Gặp người khác sau phần đầu của buổi sáng.', 'When meeting someone after the early part of the morning.', '朝の早い時間帯を過ぎてから人に会うとき。');
add('Gặp người khác trước khi trời tối hoặc trước khoảng thời gian thường dùng こんばんは。', 'When meeting someone before it gets dark or before こんばんは is normally used.', '暗くなる前、または通常「こんばんは」を使う時間帯になる前に人に会うとき。');
add('Gặp hàng xóm.', 'When meeting a neighbor.', '近所の人に会うとき。');
add('Gặp người mới.', 'When meeting someone new.', '初めて会う人と話すとき。');
add('Gặp người quen không quá thân.', 'When meeting an acquaintance you’re not very close to.', 'あまり親しくない知人に会うとき。');
add('Không ghi mốc giờ cứng như 11:00, 12:00 hoặc 17:00.', 'Don’t treat times such as 11:00, 12:00, or 17:00 as fixed boundaries.', '11時、12時、17時などを固定的な境目として覚えないでください。');
add('Việc lựa chọn lời chào phụ thuộc thời điểm, bối cảnh và thói quen.', 'The greeting depends on the time, context, and customary usage.', 'あいさつの選び方は、時間帯、状況、習慣によって変わります。');
add('Hàng xóm', 'Neighbors', '近所の人');
add('Nhân viên cửa hàng', 'Store staff', '店員');
add('Người quen không quá thân', 'Acquaintances you don’t know well', 'あまり親しくない知人');
add('Bạn bè trong một số tình huống', 'Friends in some situations', '場面によっては友達');
add('Không dùng thay lời chào buổi sáng khi おはようございます tự nhiên hơn.', 'Don’t use it instead of a morning greeting when おはようございます is more natural.', '「おはようございます」の方が自然な朝の場面では、代わりに使いません。');
add('Không dùng sau khi chuyển sang buổi tối khi こんばんは tự nhiên hơn.', 'Don’t use it once evening has begun and こんばんは is more natural.', '夜になり「こんばんは」の方が自然な場面では使いません。');
add('Không dùng như lời tạm biệt.', 'Don’t use it as a farewell.', '別れのあいさつとしては使いません。');
add('Trung tính, lịch sự an toàn.', 'Neutral and safely polite.', '中立的で、無難な丁寧さ。');
add('Cách mở đầu thân mật theo ngữ cảnh', 'Context-dependent casual openings', '状況に応じたカジュアルな話し始め方');
add('こんにちは không có một cách nói thân mật cố định tương đương.\n\nKhi nói với bạn bè hoặc người quen thân, tùy người và tình huống, người nói có thể:', 'こんにちは has no single fixed casual equivalent.\n\nWith friends or close acquaintances, depending on the person and situation, a speaker may:', '「こんにちは」には、決まった一つのカジュアル形はありません。\n\n友達や親しい知人には、相手や状況に応じて次のように話し始めることがあります。');
add('gọi tên người kia;', 'call the other person by name;', '相手の名前を呼ぶ。');
add('hỏi ngay 元気？;', 'ask 元気？ right away;', 'すぐに「元気？」と聞く。');
add('dùng よっ！ hoặc おっ！ trong một số nhóm bạn thân;', 'use よっ！ or おっ！ in some close friend groups;', '親しい友人同士では「よっ！」や「おっ！」を使う。');
add('bắt đầu trực tiếp câu chuyện.', 'start the conversation directly.', 'そのまま本題から話し始める。');
add('Đây là các cách mở đầu hội thoại thân mật theo ngữ cảnh.', 'These are context-dependent ways to begin a casual conversation.', 'これらは状況に応じたカジュアルな会話の始め方です。');
add('Chúng không phải bản thay thế một-một của こんにちは.', 'They’re not one-to-one replacements for こんにちは.', '「こんにちは」と一対一で置き換えられる表現ではありません。');
add('Xin chào, anh/chị Tanaka.', 'Hello, Tanaka.', 'こんにちは、田中さん。');
add('Dùng khi gặp người khác vào buổi tối.', 'Use it when meeting someone in the evening.', '夜に人と会うときに使います。');
add('Thường dùng sau khi trời đã tối.', 'It’s commonly used after it gets dark.', '一般に、暗くなってから使います。');
add('Người quen', 'Acquaintances', '知人');
add('Không dùng để nói “chúc ngủ ngon”.', 'Don’t use it to say “good night.”', '「おやすみなさい」の意味では使いません。');
add('Không dùng khi chia tay.', 'Don’t use it when saying goodbye.', '別れるときには使いません。');
add('Không dùng vào buổi sáng.', 'Don’t use it in the morning.', '朝には使いません。');
add('Không dùng giữa ban ngày.', 'Don’t use it during the daytime.', '日中には使いません。');
add('Cách thân mật:', 'Casual usage:', 'カジュアルな言い方：');
add('Không có một dạng thân mật chuẩn duy nhất.', 'There’s no single standard casual form.', '標準的なカジュアル形は一つに決まっていません。');
add('Với bạn thân vào buổi tối, người nói có thể:', 'With close friends in the evening, a speaker may:', '夜に親しい友達と会ったときは、次のように話し始めることがあります。');
add('Vẫn dùng こんばんは。', 'Still use こんばんは。', 'そのまま「こんばんは」を使う。');
add('Gọi tên người kia.', 'Call the other person by name.', '相手の名前を呼ぶ。');
add('Dùng một lời mở đầu thân mật khác.', 'Use another casual opener.', '別のカジュアルな言葉で始める。');
add('Bắt đầu trực tiếp cuộc trò chuyện.', 'Start the conversation directly.', 'そのまま会話を始める。');
add('Chào buổi tối. Hôm nay lạnh nhỉ.', 'Good evening. It’s cold today, isn’t it?', 'こんばんは。今日は寒いですね。');
add('Chính thức làm quen lần đầu.', 'When formally meeting for the first time.', '初めて正式に自己紹介するとき。');
add('Gặp bạn học mới.', 'When meeting a new classmate.', '新しいクラスメートに会うとき。');
add('Gặp đồng nghiệp mới.', 'When meeting a new coworker.', '新しい同僚に会うとき。');
add('Gặp giáo viên mới.', 'When meeting a new teacher.', '新しい先生に会うとき。');
add('Gặp thành viên mới trong nhóm.', 'When meeting a new group member.', 'グループの新しいメンバーに会うとき。');
add('Không dùng mỗi ngày với cùng một người.', 'Don’t use it every day with the same person.', '同じ相手に毎日使う表現ではありません。');
add('Không dùng từ lần gặp thứ hai trở đi.', 'Don’t use it from the second meeting onward.', '二回目以降に会うときは使いません。');
add('Không dùng chỉ vì nhìn thấy một người lạ nhưng không làm quen.', 'Don’t use it merely because you see a stranger without introducing yourself.', '知らない人を見かけただけで、自己紹介をしない場合には使いません。');
add('Không dùng thay lời chào buổi sáng, ban ngày hoặc buổi tối.', 'Don’t use it instead of a morning, daytime, or evening greeting.', '朝・昼・夜のあいさつの代わりには使いません。');
add('Trung tính và lịch sự trong lần đầu gặp.', 'Neutral and polite for a first meeting.', '初対面で使える中立的で丁寧な表現。');
add('Không có dạng thân mật chuẩn bắt buộc.', 'There’s no mandatory standard casual form.', '必ず使う標準的なカジュアル形はありません。');
add('Ngay cả hai người cùng tuổi gặp lần đầu vẫn có thể dùng:', 'Even two people of the same age can use:', '同年代同士の初対面でも使えます。');
add('Trong tình huống rất thoải mái có thể bỏ qua cụm này và nói tên trực tiếp, nhưng không được dạy đó là cách thay thế mặc định.', 'In a very relaxed situation, people may omit it and say their name directly, but this isn’t the default replacement.', 'とてもくだけた場面では省略して名前から言うこともありますが、標準的な代わりとして教えてはいけません。');
add('Rất vui được gặp bạn lần đầu. Tôi là Tanaka.', 'Nice to meet you. I’m Tanaka.', 'はじめまして。田中です。');

add('Không cần gọi “Sato-san”, gọi Sato thôi được chứ?', 'You don’t need to call me “Sato-san”; is just “Sato” okay?', '「佐藤さん」ではなく、「佐藤」だけでいいですか。');
add('こんにちは có nghĩa phù hợp nhất là gì?', 'What is the most appropriate meaning of こんにちは?', '「こんにちは」の最も適切な意味は何ですか。');
add('Câu nào có nghĩa là “Chào buổi tối”?', 'Which expression means “Good evening”?', '「こんばんは」という意味の表現はどれですか。');
add('Bạn vừa nghe thấy câu nào?', 'Which sentence did you just hear?', '今聞いた文はどれですか。');
add('Bạn nên trả lời thế nào?', 'How should you respond?', 'どのように返事をすればよいですか。');
add('おはようございます thường dùng khi nào?', 'When is おはようございます usually used?', '「おはようございます」は通常いつ使いますか。');
add('こんにちは phù hợp nhất trong tình huống nào?', 'In which situation is こんにちは most appropriate?', '「こんにちは」が最も適切なのはどのような場面ですか。');
add('こんばんは có nghĩa là gì?', 'What does こんばんは mean?', '「こんばんは」はどういう意味ですか。');
add('Khi gặp một người lần đầu, nên dùng câu nào?', 'Which expression should you use when meeting someone for the first time?', '初めて会う人には、どの表現を使いますか。');
add('さん được dùng như thế nào?', 'How is さん used?', '「さん」はどのように使いますか。');
add('Buổi sáng, bạn gặp giáo viên lần đầu. Cách nói nào tự nhiên và lịch sự nhất?', 'You meet a teacher for the first time in the morning. Which expression is the most natural and polite?', '朝、先生に初めて会います。最も自然で丁寧な言い方はどれですか。');
add('Câu nào là một lời tự giới thiệu hoàn chỉnh và tự nhiên?', 'Which sentence is a complete and natural self-introduction?', '完全で自然な自己紹介はどれですか。');
add('Rất vui được gặp bạn. Tôi là Sato. Bạn tên là gì?', 'Nice to meet you. I’m Sato. What is your name?', 'はじめまして。佐藤です。お名前は何ですか。');
add('Tanaka, hôm nay cũng cùng cố gắng nhé.', 'Tanaka, let’s do our best again today.', '田中さん、今日も一緒に頑張りましょう。');
add('Vâng, mong thầy/cô giúp đỡ.', 'Yes, I look forward to learning from you.', 'はい、よろしくお願いします。');
add('Xin chào. Rất vui được gặp bạn lần đầu. Mình là Tanaka.', 'Hello. Nice to meet you. I’m Tanaka.', 'こんにちは。はじめまして。田中です。');
add('Rất vui được gặp bạn lần đầu. Mình là Sato.', 'Nice to meet you. I’m Sato.', 'はじめまして。佐藤です。');
add('Rất mong được làm quen.', 'I look forward to getting to know you.', 'よろしくお願いします。');
add('Mình cũng rất mong được làm quen.', 'Likewise, I look forward to getting to know you.', 'こちらこそ、よろしくお願いします。');
add('Nói lại nhé, mình là Tanaka. Làm quen nhé!', 'Let me introduce myself again: I’m Tanaka. Nice to meet you!', 'あらためて、田中。よろしく！');
add('Mình là Sato. Làm quen nhé!', 'I’m Sato. Nice to meet you!', '佐藤。よろしく！');
add('Ừ, được. Tanaka cũng vậy nhé!', 'Yeah, sure! You too, Tanaka!', 'うん、いいよ。田中もよろしく！');
add('Vậy mai gặp lại nhé!', 'Then, see you tomorrow!', 'じゃあ、また明日！');
add('Gặp lại nhé!', 'See you!', 'またね！');
add('Xin chào.', 'Hello.', 'こんにちは。');
add('Chào buổi tối.', 'Good evening.', 'こんばんは。');
add('Rất vui được gặp bạn lần đầu.', 'Nice to meet you.', 'はじめまして。');
add('Trong bài này: Tôi là Tanaka.', 'In this lesson: I’m Tanaka.', 'このレッスンでは「田中です」という意味です。');
add('Rất mong được làm quen.\nMong được giúp đỡ.\nMong chúng ta sẽ hợp tác tốt.', 'I look forward to getting to know you.\nI appreciate your support.\nI hope we will work well together.', 'これからよろしくお願いします。\nご支援をお願いします。\n今後ともよろしくお願いします。');
add('Chính tôi cũng rất mong được làm quen.', 'Likewise, I look forward to getting to know you.', 'こちらこそ、よろしくお願いします。');
add('Tạm biệt.', 'Goodbye.', 'さようなら。');
add('Lịch sự cơ bản.', 'Standard polite form.', '基本的な丁寧表現。');
add('Cách thân mật có thể gặp:', 'Possible casual forms:', 'カジュアルな言い方：');
add('Nghĩa:\nTanaka.', 'Meaning:\nTanaka.', '意味：\n田中。');
add('Hoặc:', 'Or:', 'または：');
add('Nghĩa:\nTớ là Tanaka đấy.', 'Meaning:\nI’m Tanaka.', '意味：\n田中だよ。');
add('Chỉ nói tên là cách ngắn và thân mật.', 'Saying only the name is brief and casual.', '名前だけを言うのは、短くカジュアルな言い方です。');
add('～だよ có sắc thái thông báo hoặc giải thích.', '～だよ adds a nuance of informing or explaining.', '「～だよ」には、伝えたり説明したりするニュアンスがあります。');
add('Không được dạy ～だよ như bản thay thế bắt buộc của ～です。', 'Don’t teach ～だよ as a required replacement for ～です。', '「～だよ」を「～です」の必須の置き換えとして教えてはいけません。');
add('Với giáo viên, người lớn hơn hoặc người mới gặp, dùng ～です。', 'Use ～です with teachers, older people, or people you’ve just met.', '先生、年上の人、初対面の人には「～です」を使います。');
add('Tôi là Tanaka.', 'I’m Tanaka.', '田中です。');
add('Tôi là Sato.', 'I’m Sato.', '佐藤です。');
add('Không dịch máy móc câu này trong mọi trường hợp thành “Nice to meet you”.\n\nNghĩa thay đổi theo ngữ cảnh.', 'Don’t mechanically translate this expression as “Nice to meet you” in every situation.\n\nIts meaning changes with context.', 'どの場面でも機械的に「Nice to meet you」と訳してはいけません。\n\n意味は文脈によって変わります。');
add('Sau khi nói tên trong lần đầu làm quen.', 'After saying your name when meeting for the first time.', '初対面で名前を言った後。');
add('Khi bắt đầu học cùng.', 'When starting to study together.', '一緒に勉強を始めるとき。');
add('Khi bắt đầu làm việc cùng.', 'When starting to work together.', '一緒に仕事を始めるとき。');
add('Khi bắt đầu hợp tác.', 'When beginning a collaboration.', '協力を始めるとき。');
add('Sau một lời nhờ vả trong ngữ cảnh phù hợp.', 'After making a request in an appropriate context.', '適切な場面でお願いをした後。');
add('Rất vui được gặp bạn lần đầu. Tôi là Tanaka. Rất mong được làm quen.', 'Nice to meet you. I’m Tanaka. I look forward to getting to know you.', 'はじめまして。田中です。よろしくお願いします。');
add('Tớ là Tanaka. Làm quen nhé!', 'I’m Tanaka. Nice to meet you!', '田中。よろしく！');
add('Đáp lại:', 'In response:', '返答：');
add('Biến thể thân mật:', 'Casual variation:', 'カジュアルな言い方：');
add('Trong một số hoàn cảnh rất thoải mái có thể đáp ngắn:', 'In some very relaxed situations, a shorter reply is possible:', 'とても気楽な場面では、短く返事をすることもできます：');
add('Mục đích đưa vào lesson:\n\nPhân biệt:\n- Lời nói khi gặp\n- Lời nói khi làm quen lần đầu\n- Lời nói khi rời đi', 'Purpose in this lesson:\n\nDistinguish between:\n- What to say when meeting\n- What to say when meeting for the first time\n- What to say when leaving', 'このレッスンで扱う目的：\n\n次の表現を区別します：\n- 会ったときの言葉\n- 初対面のときの言葉\n- 別れるときの言葉');
add('Chia tay.', 'When saying goodbye.', '別れるとき。');
add('Một số bối cảnh trường học.', 'In some school contexts.', '学校での一部の場面。');
add('Khi dự kiến một khoảng thời gian mới gặp lại.', 'When you don’t expect to meet again for some time.', 'しばらく会わないと予想されるとき。');
add('Không dùng khi vừa gặp.', 'Don’t use it when you’ve just met.', '会ったばかりのときには使いません。');
add('Không dùng thay こんにちは。', 'Don’t use it instead of こんにちは。', '「こんにちは」の代わりには使いません。');
add('Không dùng thay lời tự giới thiệu.', 'Don’t use it instead of a self-introduction.', '自己紹介の代わりには使いません。');
add('Cách thân mật thường gặp khi chia tay:', 'Common casual expressions when parting:', '別れ際によく使うカジュアルな表現：');
add('じゃあ、また。\n→ Vậy nhé, gặp lại sau.', 'じゃあ、また。\n→ Well then, see you later.', 'じゃあ、また。\n→ それでは、また。');
add('またね！\n→ Gặp lại nhé!', 'またね！\n→ See you!', 'またね！\n→ また会おうね！');
add('Không mở rộng chủ đề chia tay quá sâu trong Lesson 1.', 'Don’t explore parting expressions in depth in Lesson 1.', 'レッスン1では、別れの表現を深く扱いすぎません。');
add('Buổi sáng trong lớp học', 'Morning in the classroom', '教室での朝');
add('Một học sinh gặp giáo viên vào buổi sáng.', 'A student meets a teacher in the morning.', '生徒が朝、先生に会います。');
add('Dùng おはようございます vì đây là buổi sáng.', 'Use おはようございます because it’s morning.', '朝なので「おはようございます」を使います。');
add('Học sinh nói với giáo viên nên không dùng おはよう！', 'The student is speaking to a teacher, so おはよう！ isn’t appropriate.', '生徒が先生に話すため、「おはよう！」は使いません。');
add('よろしくお願いします ở đây thể hiện thiện chí học tập và hợp tác, không chỉ dùng khi mới gặp.', 'Here, よろしくお願いします expresses willingness to learn and cooperate; it’s not limited to first meetings.', 'ここでの「よろしくお願いします」は、学習や協力への前向きな気持ちを表し、初対面だけに使う表現ではありません。');
add('Hai người cùng tuổi gặp lần đầu', 'Two peers meet for the first time', '同年代の二人が初めて会う');
add('Hai sinh viên ngồi cạnh nhau trong buổi định hướng.', 'Two students sit next to each other during orientation.', 'オリエンテーションで二人の学生が隣同士に座っています。');
add('Hai người cùng tuổi nhưng mới gặp nên dùng cách lịch sự cơ bản.', 'They’re the same age, but have just met, so they use standard polite speech.', '同年代でも初対面なので、基本的な丁寧表現を使います。');
add('Không cần chuyển ngay sang cách quá thân mật.', 'There’s no need to switch immediately to overly casual speech.', 'すぐにくだけすぎた話し方へ変える必要はありません。');
add('Khi quan hệ thoải mái hơn, họ có thể dùng cách nói ngắn hơn.', 'When they become more comfortable with each other, they can use shorter expressions.', '関係がより気楽になれば、短い言い方を使えます。');
add('Chuyển sang cách nói thân mật', 'Switching to casual speech', 'カジュアルな話し方への切り替え');
add('Tanaka và Sato đã trò chuyện một lúc và đồng ý nói chuyện thoải mái hơn.', 'Tanaka and Sato have talked for a while and agree to speak more casually.', '田中さんと佐藤さんはしばらく話し、もっと気楽に話すことにしました。');
add('よろしく！ là dạng thân mật của よろしくお願いします trong quan hệ phù hợp.', 'よろしく！ is a casual form of よろしくお願いします when the relationship is appropriate.', '「よろしく！」は、関係が適切な場合に使う「よろしくお願いします」のカジュアルな形です。');
add('Không phải cứ gặp lần đầu là dùng ngay よろしく！', 'Don’t use よろしく！ immediately in every first meeting.', '初対面だからといって、すぐに「よろしく！」を使うわけではありません。');
add('Việc chuyển sang cách nói thân mật cần dựa vào mức độ thoải mái, tuổi tác, quan hệ và bối cảnh.', 'The switch to casual speech depends on comfort, age, relationship, and context.', 'カジュアルな話し方への切り替えは、親しさ、年齢、関係、状況によって判断します。');
add('Tôi là [tên].', 'I’m [name].', '私は［名前］です。');
add('Có thể nói:\n私は田中です。\n\nNhưng khi bối cảnh đã rõ là đang tự giới thiệu, tiếng Nhật thường bỏ chủ ngữ:\n田中です。', 'You can say:\n私は田中です。\n\nHowever, when it’s clear that you’re introducing yourself, Japanese often omits the subject:\n田中です。', '次のように言えます：\n私は田中です。\n\nただし、自己紹介だと明らかな場合、日本語では主語を省くことがよくあります：\n田中です。');
add('Tự giới thiệu', 'Introducing yourself', '自己紹介するとき');
add('Trả lời tên', 'Answering with your name', '名前を答えるとき');
add('Nói với giáo viên', 'Speaking with a teacher', '先生に話すとき');
add('Nói với người mới gặp', 'Speaking with someone you’ve just met', '初対面の人に話すとき');
add('Môi trường học tập hoặc công việc', 'In study or work settings', '学習や仕事の場面');
add('Không được giải thích rằng です luôn đổi thành だよ。\n\nだよ có thêm sắc thái thông báo hoặc nhấn mạnh.', 'Don’t explain that です always changes to だよ。\n\nだよ adds a nuance of informing or emphasis.', '「です」が常に「だよ」に変わると説明してはいけません。\n\n「だよ」には、伝達や強調のニュアンスが加わります。');
add('Rất vui được gặp bạn lần đầu. Tôi là Sato.', 'Nice to meet you. I’m Sato.', 'はじめまして。佐藤です。');
add('Chỉ trong lần chính thức làm quen đầu tiên.', 'Only when formally meeting for the first time.', '正式に初めて知り合うときだけ使います。');
add('Sai:\nNgày hôm sau lại nói はじめまして。', 'Incorrect:\nSaying はじめまして again the next day.', '誤り：\n翌日も「はじめまして」と言う。');
add('Đúng:\nNgày hôm sau dùng おはようございます hoặc こんにちは tùy hoàn cảnh.', 'Correct:\nThe next day, use おはようございます or こんにちは depending on the situation.', '正しい例：\n翌日は状況に応じて「おはようございます」または「こんにちは」を使う。');
add('Cách thân mật trong quan hệ phù hợp:\n田中。よろしく！', 'Casual form in an appropriate relationship:\n田中。よろしく！', '適切な関係でのカジュアルな言い方：\n田中。よろしく！');
add('どうぞよろしくお願いいたします\n→ Rất trang trọng', 'どうぞよろしくお願いいたします\n→ Very formal', 'どうぞよろしくお願いいたします\n→ とても丁寧');
add('どうぞよろしくお願いします\n→ Lịch sự hơn một chút', 'どうぞよろしくお願いします\n→ Slightly more polite', 'どうぞよろしくお願いします\n→ 少し丁寧');
add('よろしくお願いします\n→ Lịch sự tiêu chuẩn', 'よろしくお願いします\n→ Standard polite form', 'よろしくお願いします\n→ 標準的な丁寧表現');
add('よろしく\n→ Thân mật', 'よろしく\n→ Casual', 'よろしく\n→ カジュアル');
add('Không được dạy các mức này như có thể thay thế tự do mà không xét quan hệ và tình huống.', 'Don’t teach these levels as freely interchangeable without considering the relationship and situation.', '関係や状況を考えずに、これらを自由に置き換えられるものとして教えてはいけません。');
add('Lời chào sau khoảng chào buổi sáng và trước buổi tối.', 'A greeting used after the morning-greeting period and before evening.', '朝のあいさつの時間帯の後から、夜になる前までに使うあいさつ。');
add('Có thể dùng nhiều lần với cùng một người.', 'It can be used more than once with the same person.', '同じ人に複数回使うこともできます。');
add('Dùng khi chính thức làm quen lần đầu.', 'Use it when formally meeting for the first time.', '正式に初めて知り合うときに使います。');
add('Chỉ dùng lần đầu.', 'Use it only the first time.', '初回だけ使います。');
add('Dùng khi gặp ai đó vào buổi tối.', 'Use it when meeting someone in the evening.', '夜に人と会ったときに使います。');
add('Dùng trước khi đi ngủ hoặc khi kết thúc buổi tối để nghỉ.', 'Use it before going to sleep or when ending the evening to rest.', '寝る前や、夜の活動を終えて休むときに使います。');
add('Không phải lời chào khi vừa gặp.', 'It’s not a greeting used when you’ve just met.', '会ったときのあいさつではありません。');
add('Gặp lại nhé.', 'See you.', 'またね。');
add('Thân mật, thường dùng với bạn bè.', 'Casual; commonly used with friends.', 'カジュアルで、友達によく使います。');
add('Bài tập', 'Exercises', '練習');
add('Khoảng 8–10 phút', 'About 8–10 minutes', '約8～10分');
add('Từ vựng · Nghe · Hội thoại · Ngữ pháp', 'Vocabulary · Listening · Dialogue · Grammar', '語彙・リスニング・会話・文法');
add('Luyện tập cơ bản', 'Core Practice', '基本練習');
add('Câu 1–9', 'Questions 1–9', '第1問～第9問');
add('Từ vựng · Nghe · Ngữ pháp\nHội thoại · Sắp xếp câu', 'Vocabulary · Listening · Grammar\nDialogue · Sentence ordering', '語彙・リスニング・文法\n会話・語順並べ替え');
add('Luyện tập nâng cao', 'Advanced Practice', '発展練習');
add('Câu 10–14', 'Questions 10–14', '第10問～第14問');
add('Tình huống thực tế\nBài nâng cao · Luyện tập với AI', 'Real-world situations\nAdvanced exercises · AI practice', '実際の場面\n発展問題・AI練習');
add('Mở thử nghiệm', 'Trial access', 'トライアル公開');
add('Xin chào', 'Hello', 'こんにちは');
add('Chào buổi sáng', 'Good morning', 'おはようございます');
add('Chào buổi tối', 'Good evening', 'こんばんは');
add('Tạm biệt', 'Goodbye', 'さようなら');
add('こんにちは là lời chào thường dùng vào ban ngày.', 'こんにちは is a greeting commonly used during the day.', '「こんにちは」は日中によく使うあいさつです。');
add('こんばんは được dùng để chào vào buổi tối.', 'こんばんは is used as an evening greeting.', '「こんばんは」は夜のあいさつに使います。');
add('Nối mỗi câu tiếng Nhật với nghĩa phù hợp.', 'Match each Japanese expression with the appropriate meaning.', 'それぞれの日本語表現を適切な意味と結び付けてください。');
add('Lời chào khi gặp ai đó lần đầu', 'A greeting used when meeting someone for the first time', '初対面の人に会ったときのあいさつ');
add('Mỗi lời chào gắn với một thời điểm hoặc tình huống làm quen cụ thể.', 'Each greeting is associated with a particular time or first-meeting situation.', 'それぞれのあいさつは、特定の時間帯や初対面の場面と結び付いています。');
add('Sắp xếp các thẻ thành câu “Tôi là Tanaka.”', 'Arrange the cards to form the sentence “I’m Tanaka.”', 'カードを並べて「私は田中です」という文を作ってください。');
add('私（わたし）は “tôi”. は đánh dấu chủ đề. です kết thúc câu một cách lịch sự.', '私（わたし） means “I”. は marks the topic. です ends the sentence politely.', '「私（わたし）」は自分を指します。「は」は主題を示し、「です」は文を丁寧に終えます。');
add('Điền hai chỗ trống để hoàn thành hội thoại.', 'Fill in the two blanks to complete the dialogue.', '二つの空欄を埋めて会話を完成させてください。');
add('Khi gặp nhau lần đầu, cả hai người đều có thể nói はじめまして。 Sau khi giới thiệu tên, よろしくお願（ねが）いします là câu kết tự nhiên và lịch sự.', 'When meeting for the first time, both people can say はじめまして。 After introducing their names, よろしくお願（ねが）いします is a natural and polite closing.', '初対面では、二人とも「はじめまして」と言えます。名前を紹介した後は、「よろしくお願（ねが）いします」が自然で丁寧な結びです。');
add('Audio gồm: おはようございます。 Chào buổi sáng. 私（わたし）は田中（たなか）です。 Tôi là Tanaka.', 'The audio says: おはようございます。 Good morning. 私（わたし）は田中（たなか）です。 I’m Tanaka.', '音声の内容は「おはようございます。私（わたし）は田中（たなか）です。」です。');
add('Chọn từ phù hợp:\n\n私（わたし）は田中（たなか） ______。', 'Choose the appropriate word:\n\n私（わたし）は田中（たなか） ______。', '適切な語を選んでください：\n\n私（わたし）は田中（たなか） ______。');
add('です đứng cuối câu để nói “là…” một cách lịch sự.', 'です appears at the end of the sentence to express “am/is/are” politely.', '「です」は文末に置き、「～です」と丁寧に述べます。');
add('Người đối diện nói:\n\nはじめまして。私（わたし）は田中（たなか）です。', 'The other person says:\n\nはじめまして。私（わたし）は田中（たなか）です。', '相手が次のように言います：\n\nはじめまして。私（わたし）は田中（たなか）です。');
add('Người đối diện đang gặp bạn lần đầu và giới thiệu tên. Câu trả lời phù hợp là chào lại, giới thiệu tên và kết thúc bằng よろしくお願（ねが）いします。', 'The other person is meeting you for the first time and introduces their name. An appropriate response is to greet them, introduce your name, and end with よろしくお願（ねが）いします。', '相手は初対面で名前を紹介しています。適切な返答は、あいさつを返し、自分の名前を紹介して、「よろしくお願（ねが）いします」で結ぶことです。');
add('Checkpoint 5 câu nhỏ', 'Five-question checkpoint', '5問チェックポイント');
add('Buổi sáng', 'Morning', '朝');
add('Buổi tối', 'Evening', '夜');
add('Khi tạm biệt', 'When saying goodbye', '別れるとき');
add('Trước khi đi ngủ', 'Before going to sleep', '寝る前');
add('おはようございます là lời chào lịch sự vào buổi sáng.', 'おはようございます is a polite morning greeting.', '「おはようございます」は丁寧な朝のあいさつです。');
add('Chào ai đó vào ban ngày', 'Greet someone during the day', '日中に人へあいさつする');
add('Chúc ai đó ngủ ngon', 'Wish someone good night', 'おやすみを言う');
add('Cảm ơn sau bữa ăn', 'Give thanks after a meal', '食後に感謝を伝える');
add('Gọi điện thoại', 'Make a phone call', '電話をかける');
add('Hẹn gặp lại', 'See you again', 'また会いましょう');
add('Xin lỗi', 'Sorry', 'すみません');
add('はじめまして được dùng khi bắt đầu làm quen với ai đó lần đầu.', 'はじめまして is used when beginning an introduction with someone for the first time.', '「はじめまして」は、初めて会う人と自己紹介を始めるときに使います。');
add('Đặt sau tên người khác để gọi một cách lịch sự', 'Place it after another person’s name to address them politely', '相手の名前の後に付けて丁寧に呼ぶ');
add('Đặt trước tên của chính mình', 'Place it before your own name', '自分の名前の前に付ける');
add('Dùng để chào buổi sáng', 'Use it as a morning greeting', '朝のあいさつに使う');
add('Dùng để kết thúc mọi câu', 'Use it to end every sentence', 'すべての文末に使う');
add('さん thường được đặt sau tên người khác. Ví dụ: 佐藤（さとう）さん. Thông thường không tự thêm さん vào tên của chính mình khi giới thiệu.', 'さん is usually placed after another person’s name. For example: 佐藤（さとう）さん. You normally don’t add さん to your own name when introducing yourself.', '「さん」は通常、相手の名前の後に付けます。例：佐藤（さとう）さん。自己紹介では、通常、自分の名前に「さん」を付けません。');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させる');
add('Hai người gặp nhau lần đầu. Hãy nhập từ phù hợp vào hai ô trống để hoàn thành cuộc trò chuyện.', 'Two people are meeting for the first time. Enter the appropriate expressions in the two blanks to complete the conversation.', '二人は初対面です。二つの空欄に適切な表現を入力して会話を完成させてください。');
add('Bạn làm tốt lắm!\nHãy tiếp tục cố gắng ở phần tiếp theo nhé.', 'Great job!\nKeep doing your best in the next section.', 'よくできました！\n次のセクションも頑張りましょう。');
add('Ô đầu tiên chưa phù hợp với thời điểm của cuộc trò chuyện.', 'The first blank doesn’t fit the time of the conversation.', '最初の空欄は、会話の時間帯に合っていません。');
add('Cuộc trò chuyện diễn ra lúc 11:00. Trong tình huống này, こんにちは là lời chào phù hợp.', 'The conversation takes place at 11:00. In this situation, こんにちは is the appropriate greeting.', '会話は11時に行われます。この場面では「こんにちは」が適切なあいさつです。');
add('Câu kết của đoạn làm quen chưa chính xác.', 'The closing expression in the introduction isn’t correct.', '初対面の会話の結びが正しくありません。');
add('Sau khi hai người giới thiệu tên, よろしくお願（ねが）いします được dùng để kết thúc phần làm quen một cách lịch sự.', 'After both people introduce their names, よろしくお願（ねが）いします is used to close the introduction politely.', '二人が名前を紹介した後、「よろしくお願（ねが）いします」を使って初対面の会話を丁寧に結びます。');
add('Chọn câu phù hợp nhất.', 'Choose the most appropriate sentence.', '最も適切な文を選んでください。');
add('Đây là buổi sáng nên bắt đầu bằng おはようございます。 Vì gặp lần đầu nên dùng はじめまして, sau đó giới thiệu tên và kết thúc bằng よろしくお願（ねが）いします。', 'It’s morning, so begin with おはようございます。 Because this is a first meeting, use はじめまして, then introduce your name and close with よろしくお願（ねが）いします。', '朝なので「おはようございます」で始めます。初対面なので「はじめまして」を使い、名前を紹介して「よろしくお願（ねが）いします」で結びます。');
add('Một lời tự giới thiệu cơ bản gồm: 1. はじめまして。 2. 私（わたし）は田中（たなか）です。 3. よろしくお願（ねが）いします。', 'A basic self-introduction consists of: 1. はじめまして。 2. 私（わたし）は田中（たなか）です。 3. よろしくお願（ねが）いします。', '基本的な自己紹介は、1. はじめまして。2. 私（わたし）は田中（たなか）です。3. よろしくお願（ねが）いします。で構成されます。');
add('Hoàn thành lời tự giới thiệu. Chọn từng ô trống, rồi chọn thẻ phù hợp. Có một thẻ không cần dùng.', 'Complete the self-introduction. Select each blank, then choose the appropriate card. One card isn’t needed.', '自己紹介を完成させてください。各空欄を選び、適切なカードを選んでください。使わないカードが一枚あります。');
add('こんばんは là lời chào buổi tối, nhưng không cần thiết trong lời tự giới thiệu được yêu cầu ở câu này. Câu hoàn chỉnh gồm lời chào khi gặp lần đầu, tên người nói và câu kết lịch sự.', 'こんばんは is an evening greeting, but it’s not needed in the self-introduction requested here. The complete answer includes a first-meeting greeting, the speaker’s name, and a polite closing.', '「こんばんは」は夜のあいさつですが、この問題で求める自己紹介には不要です。完成した文には、初対面のあいさつ、話者の名前、丁寧な結びが含まれます。');
add('Hãy chào, giới thiệu tên và kết thúc lời làm quen một cách lịch sự bằng tiếng Nhật.', 'In Japanese, greet the person, introduce your name, and close the introduction politely.', '日本語であいさつをし、名前を紹介して、初対面の会話を丁寧に結んでください。');
add('Có lời chào khi gặp lần đầu.', 'Includes a first-meeting greeting.', '初対面のあいさつがある。');
add('Có phần giới thiệu tên.', 'Includes a name introduction.', '名前の紹介がある。');
add('Có câu kết lịch sự.', 'Includes a polite closing.', '丁寧な結びがある。');
add('Phù hợp tình huống.', 'Fits the situation.', '状況に合っている。');
add('AI set còn lại hôm nay: {remaining}/5', 'AI sets remaining today: {remaining}/5', '本日残っているAIセット：{remaining}/5');
add('Bạn đã sử dụng hết 5 AI set hôm nay.\n\nAI Practice sẽ mở lại vào ngày mai, hoặc bạn có thể nâng cấp lên plan cao hơn.', 'You’ve used all 5 AI sets for today.\n\nAI Practice will be available again tomorrow, or you can upgrade to a higher plan.', '本日のAIセット5回分をすべて使用しました。\n\nAI練習は明日再び利用できます。または、上位プランへアップグレードできます。');
add('Tiếp tục không dùng AI', 'Continue without AI', 'AIを使わずに続ける');
add('Xem các gói', 'View plans', 'プランを見る');

// Lesson Format 3.0 — Q14 Real-World Practice redesign (Tanaka–Sato dialogue).
// Owner-approved 2026-07-15. See ARCHITECTURE_DECISIONS.md and
// .cursor/rules/04_novalang_lesson_format_3_0.mdc.
add(
  'Tình huống thực tế\nHội thoại thực hành nâng cao',
  'Real-world situations\nAdvanced practice dialogue',
  '実際の場面\n発展会話練習',
);
add('Hỏi đường đến ký túc xá', 'Asking the Way to the Dormitory', '寮までの道を尋ねる');
add(
  'Buổi tối, du học sinh Tanaka không dùng được điện thoại nên không biết đường đến ký túc xá Sakura. Tanaka gặp Sato và hỏi đường. Sato dẫn Tanaka đến nơi.',
  'One evening, exchange student Tanaka can’t use their phone and doesn’t know the way to Sakura Dormitory. Tanaka meets Sato and asks for directions. Sato guides Tanaka there.',
  'ある夜、留学生の田中さんはスマホが使えず、さくら寮への道が分かりません。田中さんは佐藤さんに会って道を尋ね、佐藤さんが寮まで案内します。',
);
add(
  'Chào buổi tối. Xin lỗi, tôi có thể hỏi bạn một chút được không?',
  'Good evening. Excuse me, may I ask you something?',
  'こんばんは。すみません、少しお尋ねしてもよろしいですか。',
);
add(
  'Chào buổi tối. Vâng, có chuyện gì vậy?',
  'Good evening. Yes, what happened?',
  'こんばんは。はい、どうされましたか。',
);
add(
  'Rất vui được gặp bạn. Tôi là Tanaka, du học sinh. Xin lỗi, thật ra điện thoại của tôi không dùng được nên tôi không biết đường.',
  "Nice to meet you. I'm Tanaka, an international student. Excuse me, but my phone isn't working, so I don't know the way.",
  'はじめまして。留学生の田中です。すみませんが、実はスマホが使えなくて、道が分からないんです。',
);
add(
  'À, bạn là du học sinh à. Rất vui được gặp bạn. Tôi là Sato.',
  "Oh, you're an international student. Nice to meet you. I'm Sato.",
  'あ、留学生なんですね。はじめまして。佐藤です。',
);
add(
  'Thế thì khó khăn quá. Bạn muốn đi đâu?',
  'That sounds difficult. Where would you like to go?',
  'それは大変ですね。どこへ行きたいんですか。',
);
add(
  'Tôi muốn đến ký túc xá Sakura. Bạn có biết chỗ đó không?',
  'Sakura Dormitory. Do you know where it is?',
  'さくら寮です。場所は分かりますか。',
);
add(
  'Vâng, tôi biết. Từ đây gần lắm.',
  "Yes, I know. It's close from here.",
  'はい、分かりますよ。ここから近いですよ。',
);
add(
  'Chúng ta cùng đi nhé?',
  'Shall we go together?',
  '一緒に行きましょうか。',
);
add(
  'Ơ, được thật sao? Cảm ơn bạn rất nhiều.',
  'Oh, really? Thank you so much.',
  'え、いいんですか。本当にありがとうございます。',
);
add(
  'Không có gì đâu.',
  'Not at all.',
  'いえいえ。どういたしまして。',
);
add(
  'Khi đến nơi',
  'Upon arrival',
  '到着したとき',
);
add(
  'Đến nơi rồi. Ở đây này.',
  "We've arrived. This is it.",
  '着きましたよ。ここです。',
);
add(
  'Bạn đã giúp tôi rất nhiều. Sato, cảm ơn bạn.',
  'You really helped me. Thank you, Sato.',
  '助かりました。佐藤さん、ありがとうございました。',
);
add(
  'Tanaka, hãy cố gắng học nhé. Tạm biệt.',
  'Tanaka, please keep up your studies. Goodbye.',
  '田中さん、勉強を頑張ってくださいね。さようなら。',
);

// NOVALANG-VOCABULARY-RUNTIME-REMEDIATION-01: previously-missing vocabulary
// support-field rows. Their absence made the generator emit the raw
// Vietnamese into the en/ja slots (see resolveKnownList). Localization-only:
// no target-language token, meaning, answer, or ordering changes.
add('Trả lời khi được hỏi tên.', 'Answer when asked their name.', '名前を聞かれたときに答えます。');
add('Tự giới thiệu ngắn gọn.', 'Give a brief self-introduction.', '簡単に自己紹介をします。');
add('Biến thể:', 'Variations:', 'バリエーション：');
add(
  'どうぞよろしくお願いします。\n→ Lịch sự và nhấn mạnh thiện chí hơn một chút.',
  'どうぞよろしくお願いします。\n→ Polite, and emphasizes goodwill a little more.',
  'どうぞよろしくお願いします。\n→ 丁寧で、気持ちを少し強調します。',
);
add(
  'よろしくお願いします。\n→ Lịch sự tiêu chuẩn.',
  'よろしくお願いします。\n→ Standard polite form.',
  'よろしくお願いします。\n→ 標準的な丁寧な言い方です。',
);
add(
  'よろしく！\n→ Thân mật, dùng với bạn bè hoặc người ngang hàng khi quan hệ thoải mái.',
  'よろしく！\n→ Casual; use it with friends or peers when the relationship is relaxed.',
  'よろしく！\n→ カジュアルで、親しい友達や同年代の人に使います。',
);
add('Không dùng よろしく！ với:', 'Don’t use よろしく！ with:', 'よろしく！を使わない相手：');
add('Cấp trên', 'Supervisors', '上司');
add(
  'Người mới gặp trong hoàn cảnh trang trọng',
  'People you’ve just met in a formal setting',
  '改まった場面で初めて会う人',
);
add(
  'Có thể tạo cảm giác chia tay rõ hơn hoặc lâu hơn.',
  'It can create a stronger or more lasting sense of parting.',
  '別れの感じをより強く、または長く感じさせることがあります。',
);
// Grammar-pattern formula templates: only the Vietnamese placeholder "Tên"
// ("name") is localized; every target-language token (です, はじめまして,
// よろしくお願いします) is preserved unchanged.
add('Tên + です', 'Name + です', '名前 + です');
add('はじめまして + Tên + です', 'はじめまして + Name + です', 'はじめまして + 名前 + です');
add(
  'はじめまして。\n＋\nTên + です。\n＋\nよろしくお願いします。',
  'はじめまして。\n＋\nName + です。\n＋\nよろしくお願いします。',
  'はじめまして。\n＋\n名前 + です。\n＋\nよろしくお願いします。',
);
add(
  'はじめまして。\n＋\nTên + です。\n＋\nよろしくおねがいします。',
  'はじめまして。\n＋\nName + です。\n＋\nよろしくおねがいします。',
  'はじめまして。\n＋\n名前 + です。\n＋\nよろしくおねがいします。',
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
        // No translation row for this item. Target-language tokens (Japanese,
        // punctuation, proper nouns) legitimately pass through unchanged, but
        // a Vietnamese support string must never leak into en/ja — fail loud
        // so the missing row is added instead of silently emitting Vietnamese.
        if (locale !== 'vi' && typeof value === 'string' && looksVietnamese(value)) {
          if (COLLECT_MISSING) {
            collectedMissingSupport.add(value);
            return value;
          }
          throw new Error(
            `[golden-support] missing ${locale} translation for Vietnamese support string: ` +
              JSON.stringify(value),
          );
        }
        return value;
      }),
    ]),
  );
};

export function localizeGoldenSupport(value) {
  if (Array.isArray(value)) return value.map(localizeGoldenSupport);
  if (!value || typeof value !== 'object') return value;

  const localeKeys = Object.keys(value);
  if (localeKeys.includes('vi') && localeKeys.every((key) => localeCodes.includes(key))) {
    const known = supportTextByVietnamese.get(value.vi);
    return known ?? value;
  }

  const result = {};
  for (const [key, item] of Object.entries(value)) {
    result[key] = localizeGoldenSupport(item);
    if (key.endsWith('ByNative') || key.endsWith('Vi')) continue;
    if (typeof item === 'string') {
      const known = supportTextByVietnamese.get(item);
      if (known) {
        result[`${key}ByNative`] = known;
      } else if (looksVietnamese(item)) {
        // A Vietnamese support scalar with no translation row would otherwise
        // reach the Flutter renderer as raw Vietnamese in en/ja. Fail loud.
        if (COLLECT_MISSING) {
          collectedMissingSupport.add(item);
        } else {
          throw new Error(
            `[golden-support] missing en/ja translation for Vietnamese support ` +
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
