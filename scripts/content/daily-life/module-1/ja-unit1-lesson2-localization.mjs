import { looksVietnamese } from '../../../lib/native-localization.mjs';

// Localization support map for Daily Life / Module 1 / Unit 1 / Lesson 2
// (ja-daily_life-m01-u1-l2, "お名前を聞く" / "Hỏi tên người đối diện").
// Same machinery as the Golden Lesson's localization module: every Vietnamese
// learner-support string used in ja-unit1-lesson2.mjs must have an en/ja
// translation row here, or generation fails loud (localizeSupport throws on a
// Vietnamese-looking string with no row). Target-language tokens (Japanese,
// punctuation, proper nouns) legitimately pass through unchanged.
//
// The Japanese *learning* content (target sentences, readings, dialogue) is the
// owner-approved source from the L2 markdown and is NOT translated here — only
// the Vietnamese learner-support text (meanings, explanations, prompts,
// feedback) is given its en/ja equivalents.
const COLLECT_MISSING = process.env.GOLDEN_COLLECT_MISSING === '1';
export const collectedMissingSupport = new Set();

const rows = [];
const add = (vi, en, ja) => rows.push([vi, { vi, en, ja }]);

// ── Lesson / unit meta ──────────────────────────────────────────────────
add('Làm quen lần đầu', 'Getting Acquainted', 'はじめての出会い');
add('Hỏi tên người đối diện', "Asking Someone's Name", 'お名前を聞く');
add('Sau bài học này, người học có thể:', 'After this lesson, learners can:', 'このレッスンの後、次のことができるようになります。');

// ── Intro objectives ────────────────────────────────────────────────────
add('Hiểu sự khác nhau cơ bản giữa 名前 và お名前.', 'Understand the basic difference between 名前 and お名前.', '「名前」と「お名前」の基本的な違いを理解できます。');
add('Hỏi tên người đối diện bằng お名前は？', 'Ask the other person’s name with お名前は？', '「お名前は？」で相手の名前を聞けます。');
add('Hỏi đầy đủ hơn bằng お名前は何ですか。', 'Ask more fully with お名前は何ですか。', '「お名前は何ですか。」でより丁寧に聞けます。');
add('Dùng 失礼ですが khi muốn mở đầu câu hỏi một cách lịch sự hơn.', 'Use 失礼ですが to open a question more politely.', '「失礼ですが」を使って、より丁寧に質問を切り出せます。');
add('Dùng すみません để thu hút sự chú ý hoặc mở đầu một câu hỏi.', 'Use すみません to get attention or begin a question.', '「すみません」で注意を引いたり、質問を始めたりできます。');
add('Xác nhận tên vừa nghe bằng [Tên]さんですね.', 'Confirm the name you just heard with [Name]さんですね.', '「〜さんですね」で聞いた名前を確認できます。');
add('Yêu cầu người đối diện nói lại bằng もう一度お願いします.', 'Ask the other person to repeat with もう一度お願いします.', '「もう一度お願いします」で言い直してもらえます。');
add('Không thêm さん hoặc お vào tên của chính mình khi tự giới thiệu.', 'Don’t add さん or お to your own name when introducing yourself.', '自己紹介では、自分の名前に「さん」や「お」を付けません。');

// ── Intro situation ─────────────────────────────────────────────────────
add('Bạn vừa gặp một người mới và đã giới thiệu tên mình.', 'You have just met someone new and introduced your own name.', 'あなたは新しい人に会い、自分の名前を伝えたところです。');
add('Bây giờ bạn muốn hỏi tên của người đối diện.', 'Now you want to ask the other person’s name.', '次に、相手の名前を聞きたいと思っています。');

// ── Intro examples (labels + translations) ──────────────────────────────
add('Bạn có thể hỏi:', 'You can ask:', '次のように聞けます。');
add('Sau khi nghe tên, bạn xác nhận:', 'After hearing the name, you confirm:', '名前を聞いた後、確認します。');
add('Nếu không nghe rõ, bạn nói:', 'If you didn’t hear clearly, you say:', '聞き取れなかったときは、次のように言います。');

// ── Intro important note ────────────────────────────────────────────────
add('Trong tình huống đã rõ là đang hỏi người đối diện, không cần thêm あなた.', 'When it’s clear you’re asking the other person, you don’t need to add あなた.', '相手に尋ねているのが明らかな場面では、「あなた」を付ける必要はありません。');
add('私は田中です。 và 私の名前は田中です。 đều đúng.', 'Both 私は田中です。 and 私の名前は田中です。 are correct.', '「私は田中です。」も「私の名前は田中です。」も正しい言い方です。');
add('Không nói 私のお名前は田中です。', 'Don’t say 私のお名前は田中です。', '「私のお名前は田中です。」とは言いません。');

// ── Shared translations (vocab meanings, dialogue lines, feedback) ───────
add('Tên.', 'Name.', '名前。');
add('Tên', 'Name', '名前');
add('Tên — cách nói lịch sự hơn.', 'Name — a more polite way to say it.', '名前（より丁寧な言い方）。');
add('Là gì?', 'What is it?', '何ですか。');
add('Tên bạn là gì?', 'What is your name?', 'お名前は何ですか。');
add('Còn tên bạn là...? / Tên bạn là gì?', 'And your name is…? / What is your name?', 'お名前は？（あなたのお名前は？）');
add('Xin phép cho tôi hỏi...', 'Excuse me for asking…', '失礼ですが…（お尋ねします）。');
add('Xin lỗi / Cho hỏi...', 'Excuse me. / Sorry.', 'すみません（あのう、失礼します）。');
add('Một lần nữa.', 'One more time.', 'もう一度。');
add('Cách gọi lịch sự đặt sau tên người khác.', 'A polite suffix placed after another person’s name.', '相手の名前の後に付ける丁寧な呼び方。');
add('Dùng để xác nhận thông tin vừa nghe.', 'Used to confirm information you just heard.', '聞いた情報を確認するときに使います。');
add('Xin chào.', 'Hello.', 'こんにちは。');
add('Tôi là Itō.', 'I’m Itō.', '伊藤です。');
add('Tôi là Tanaka.', 'I’m Tanaka.', '田中です。');
add('Tôi là Satō.', 'I’m Satō.', '佐藤です。');
add('Rất vui được gặp bạn.', 'Nice to meet you.', 'はじめまして。');
add('Rất vui được gặp bạn. Tôi là Satō.', 'Nice to meet you. I’m Satō.', 'はじめまして。佐藤です。');
add('Rất mong được làm quen.', 'I look forward to getting to know you.', 'よろしくお願いします。');
add('Bạn là Itō phải không.', 'You’re Itō, right?', '伊藤さんですね。');
add('Bạn là Itō phải không. Tôi là Tanaka.', 'You’re Itō, right? I’m Tanaka.', '伊藤さんですね。私は田中です。');
add('Bạn là Tanaka phải không. Rất mong được làm quen.', 'You’re Tanaka, right? I look forward to getting to know you.', '田中さんですね。よろしくお願いします。');
add('Tôi là Itō. I-tô-u ạ.', 'I’m Itō. I-to-u.', '伊藤です。い・と・う、です。');
add('Xin lỗi, làm ơn nói lại một lần nữa.', 'Sorry, could you say that once more?', 'すみません、もう一度お願いします。');
add('Xin lỗi, tên bạn là gì?', 'Excuse me, what is your name?', '失礼ですが、お名前は何ですか。');

// ── Vocabulary detail examples & notes ──────────────────────────────────
add('Tên tôi là Tanaka.', 'My name is Tanaka.', '私の名前は田中です。');
add('Không nên hiểu 名前 = tên mình và お名前 = tên người khác như một quy tắc tuyệt đối.', 'Don’t treat 名前 = your name and お名前 = someone else’s name as an absolute rule.', '「名前＝自分の名前」「お名前＝相手の名前」という絶対的な規則として覚えないでください。');
add('Cái này là gì?', 'What is this?', 'これは何ですか。');
add('Trong ～は何ですか, 何 được đọc là なん.', 'In ～は何ですか, 何 is read なん.', '「～は何ですか」では、「何」は「なん」と読みます。');
add('Thường không thêm さん vào tên của chính mình.', 'You usually don’t add さん to your own name.', '自分の名前には、ふつう「さん」を付けません。');
add('Dùng để xác nhận, không phải để hỏi lại.', 'Used to confirm, not to ask again.', '確認のために使い、聞き直すためではありません。');

// ── Dialogue group titles / situations / explanations ───────────────────
add('Hỏi tên một cách ngắn gọn', 'Asking a name briefly', '短く名前を聞く');
add('Hai người vừa gặp, một người hỏi tên ngắn gọn.', 'Two people have just met; one asks the name briefly.', '初対面の二人。一方が短く名前を聞きます。');
add('お名前は？ là cách hỏi tên ngắn gọn, tự nhiên khi ngữ cảnh đã rõ.', 'お名前は？ is a short, natural way to ask a name when the context is clear.', '「お名前は？」は、場面が明らかなときに使える、短く自然な聞き方です。');
add('～さんですね dùng để xác nhận tên vừa nghe.', '～さんですね is used to confirm the name you just heard.', '「～さんですね」は、聞いた名前を確認するために使います。');
add('Hỏi tên lịch sự hơn', 'Asking a name more politely', 'より丁寧に名前を聞く');
add('Hai người gặp nhau lần đầu và nói chuyện lịch sự.', 'Two people meet for the first time and speak politely.', '初対面の二人が丁寧に話します。');
add('失礼ですが làm cho câu hỏi lịch sự hơn.', '失礼ですが makes the question more polite.', '「失礼ですが」は、質問をより丁寧にします。');
add('お名前は何ですか。 là cách hỏi tên đầy đủ và lịch sự.', 'お名前は何ですか。 is a full, polite way to ask a name.', '「お名前は何ですか。」は、丁寧で完全な聞き方です。');
add('Khi không nghe rõ tên', 'When you can’t hear the name clearly', '名前が聞き取れないとき');
add('Người nghe không nghe rõ tên và nhờ nói lại.', 'The listener can’t catch the name and asks for it again.', '聞き手が名前を聞き取れず、言い直しをお願いします。');
add('もう一度お願いします dùng để nhờ nói lại.', 'もう一度お願いします is used to ask someone to repeat.', '「もう一度お願いします」は、言い直しをお願いするときに使います。');
add('Có thể đánh vần từng âm để người nghe nghe rõ.', 'You can spell out each sound so the listener can hear clearly.', '一音ずつ区切って言うと、相手が聞き取りやすくなります。');

// ── Grammar patterns ────────────────────────────────────────────────────
add('名前 và お名前', '名前 and お名前', '「名前」と「お名前」');
add('Cách dùng lịch sự theo ngữ cảnh, không phải quy tắc mình/người khác.', 'Polite usage depends on context, not a “my name / your name” rule.', '丁寧さは場面によって決まり、「自分／相手」の規則ではありません。');
add('Tên bạn là gì? (hỏi người khác)', 'What is your name? (asking someone)', 'お名前は？（相手に聞く）');
add('Tôi là Tanaka. (nói tên mình)', 'I’m Tanaka. (saying your own name)', '私は田中です。（自分の名前を言う）');
add('Hỏi người khác: お名前は？ Tự nói tên mình: 私は田中です。 Không nói 私のお名前は田中です。', 'Ask others: お名前は？ Say your own name: 私は田中です。 Don’t say 私のお名前は田中です。', '相手に聞くとき：お名前は？ 自分の名前を言うとき：私は田中です。「私のお名前は田中です。」とは言いません。');
add('～は何ですか', '～は何ですか', '「～は何ですか」');
add('Hỏi “…là gì?”', 'Ask “What is …?”', '「～は何ですか」と尋ねます。');
add('Trong cấu trúc này 何 đọc là なん. Dạng ngắn: お名前は？', 'In this pattern 何 is read なん. Short form: お名前は？', 'この構文では「何」は「なん」と読みます。短い形：お名前は？');
add('～ですね', '～ですね', '「～ですね」');
add('Xác nhận thông tin vừa nghe.', 'Confirm information you just heard.', '聞いた情報を確認します。');
add('Dùng để xác nhận tên vừa nghe, không phải hỏi tên lại.', 'Used to confirm the name you heard, not to ask again.', '聞いた名前を確認するために使い、名前を聞き直すためではありません。');

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
add('お名前は？ có nghĩa là gì?', 'What does お名前は？ mean?', '「お名前は？」はどういう意味ですか。');
add('Hẹn gặp lại.', 'See you again.', 'また会いましょう。');
add('Xin cảm ơn.', 'Thank you.', 'ありがとうございます。');
add('お名前は？ là cách hỏi tên ngắn gọn.', 'お名前は？ is a short way to ask someone’s name.', '「お名前は？」は、名前を短く聞く言い方です。');
// Q2
add('Bạn muốn hỏi một cách lịch sự: “Tên bạn là gì?”', 'You want to ask politely: “What is your name?”', '丁寧に「お名前は何ですか。」と聞きたいとき、どれを使いますか。');
// Q3
add('Nối mỗi mục với nghĩa phù hợp.', 'Match each item with its meaning.', 'それぞれの項目を正しい意味と結び付けてください。');
add('Vui lòng nói lại một lần nữa', 'Please say it once more', 'もう一度お願いします');
add('Xác nhận tên vừa nghe', 'Confirming the name you just heard', '聞いた名前の確認');
add('Mỗi mục gắn với một chức năng giao tiếp cụ thể.', 'Each item maps to a specific communicative function.', 'それぞれの項目は、特定のコミュニケーション機能に対応しています。');
// Q4
add('Sắp xếp các thẻ thành câu “Tên bạn là gì?”', 'Arrange the cards to form “What is your name?”', 'カードを並べて「お名前は何ですか」という文を作ってください。');
add('お名前 + は + 何 + ですか → お名前は何ですか。 さん và こちらこそ không dùng ở đây.', 'お名前 + は + 何 + ですか → お名前は何ですか。 さん and こちらこそ aren’t used here.', '「お名前」＋「は」＋「何」＋「ですか」→「お名前は何ですか。」「さん」と「こちらこそ」はここでは使いません。');
// Q5
add('Điền chỗ trống để hoàn thành hội thoại.', 'Fill in the blank to complete the dialogue.', '空欄を埋めて会話を完成させてください。');
add('Khi chưa nghe rõ, dùng もう一度お願いします để nhờ nói lại.', 'When you didn’t hear clearly, use もう一度お願いします to ask them to repeat.', '聞き取れなかったときは、「もう一度お願いします」で言い直しをお願いします。');
// Q6
add('Bạn vừa nghe câu nào?', 'Which sentence did you just hear?', '今聞いた文はどれですか。');
add('Hỏi tên người đối diện', 'Asking the other person’s name', '相手の名前を聞く');
add('Tự giới thiệu tên mình', 'Introducing your own name', '自分の名前を名乗る');
add('Nói lời tạm biệt', 'Saying goodbye', '別れのあいさつをする');
add('Câu nghe được là お名前は何ですか。 — một câu hỏi tên.', 'The audio is お名前は何ですか。 — a question asking for a name.', '音声は「お名前は何ですか。」で、名前を尋ねる文です。');
// Q7
add('Chọn từ điền vào chỗ trống: 伊藤さん___。', 'Choose the word for the blank: 伊藤さん___。', '空欄に入る語を選んでください：伊藤さん___。');
// Q8
add('Người đối diện vừa nói tên nhưng bạn không nghe rõ.', 'The other person just said their name, but you didn’t hear it clearly.', '相手が名前を言いましたが、聞き取れませんでした。');
add('Bạn nên nói gì?', 'What should you say?', 'どう言えばよいですか。');
add('Khi không nghe rõ, nhờ nói lại bằng すみません、もう一度お願いします。', 'When you can’t hear clearly, ask them to repeat with すみません、もう一度お願いします。', '聞き取れないときは、「すみません、もう一度お願いします。」で言い直しをお願いします。');
// Q9 checkpoint
add('お名前 có nghĩa gì?', 'What does お名前 mean?', '「お名前」はどういう意味ですか。');
add('Tên (cách nói lịch sự)', 'Name (polite)', '名前（丁寧な言い方）');
add('Lời tạm biệt', 'A goodbye', '別れのあいさつ');
add('Lời cảm ơn', 'A thank-you', 'お礼の言葉');
add('Lời xin lỗi', 'An apology', 'おわびの言葉');
add('お名前 là cách nói lịch sự của 名前.', 'お名前 is the polite form of 名前.', '「お名前」は「名前」の丁寧な言い方です。');
add('Tự giới thiệu “Tôi là Tanaka” nói thế nào?', 'How do you say “I’m Tanaka”?', '「私は田中です」はどう言いますか。');
add('私は田中です。 dùng để tự giới thiệu tên mình.', '私は田中です。 introduces your own name.', '「私は田中です。」は自分の名前を名乗る言い方です。');
add('Xác nhận “佐藤です” thì nói gì?', 'How do you confirm “佐藤です”?', '「佐藤です」をどう確認しますか。');
add('～さんですね dùng để xác nhận tên.', '～さんですね confirms the name.', '「～さんですね」で名前を確認します。');
add('Trong お名前は何ですか, 何 đọc là gì?', 'In お名前は何ですか, how is 何 read?', '「お名前は何ですか」で「何」はどう読みますか。');
add('Yêu cầu nói lại thì nói gì?', 'How do you ask someone to repeat?', '言い直しをお願いするとき、どう言いますか。');
add('もう一度お願いします dùng để nhờ nói lại.', 'もう一度お願いします is used to ask someone to repeat.', '「もう一度お願いします」は、言い直しをお願いするときに使います。');
// Q10 chat_text_fill
add('Hai người gặp nhau. Nhập từ phù hợp vào hai ô trống.', 'Two people meet. Enter the right words in the two blanks.', '二人が出会います。二つの空欄に適切な語を入力してください。');
add('Bạn làm tốt lắm!', 'Great job!', 'よくできました！');
add('Ô này chưa phải là câu hỏi tên.', 'This blank isn’t the way to ask a name.', 'この空欄は、名前の聞き方になっていません。');
add('Dùng お名前は để hỏi tên người đối diện.', 'Use お名前は to ask the other person’s name.', '相手の名前を聞くには「お名前は」を使います。');
add('Tên vừa nghe chưa đúng.', 'The name you heard isn’t right.', '聞いた名前が正しくありません。');
add('Người kia nói 伊藤です nên xác nhận 伊藤さんですね。', 'They said 伊藤です, so confirm with 伊藤さんですね。', '相手は「伊藤です」と言ったので、「伊藤さんですね。」と確認します。');
// Q11
add('Bạn muốn hỏi tên một cách đầy đủ và lịch sự hơn.', 'You want to ask someone’s name more fully and politely.', 'より丁寧に、きちんと名前を聞きたいとき。');
add('Chọn câu phù hợp nhất.', 'Choose the most appropriate sentence.', '最も適切な文を選んでください。');
add('失礼ですが、お名前は何ですか。 là cách hỏi tên đầy đủ và lịch sự nhất.', '失礼ですが、お名前は何ですか。 is the fullest, most polite way to ask a name.', '「失礼ですが、お名前は何ですか。」は、最も丁寧で完全な名前の聞き方です。');
// Q12
add('Chọn đoạn hội thoại tự nhiên nhất.', 'Choose the most natural dialogue.', '最も自然な会話を選んでください。');
add('A tự nhiên: hỏi tên, nghe, xác nhận rồi giới thiệu mình. B sai vì 私のお名前, C sai vì tự thêm さん cho mình, D lặp vòng không tự nhiên.', 'A is natural: ask, listen, confirm, then introduce yourself. B is wrong (私のお名前), C is wrong (adding さん to your own name), D loops unnaturally.', '自然なのはA：名前を聞き、聞き取り、確認してから自分を名乗ります。Bは「私のお名前」が誤り、Cは自分に「さん」を付けるのが誤り、Dは同じやり取りを繰り返して不自然です。');
// Q13
add('Câu đầy đủ: 失礼ですが、お名前は何ですか。 さん và もう一度 không dùng ở đây.', 'Full sentence: 失礼ですが、お名前は何ですか。 さん and もう一度 aren’t used here.', '完成文：失礼ですが、お名前は何ですか。「さん」と「もう一度」はここでは使いません。');
// Q14 scenario + divider
add('Làm quen và hỏi tên trong nhóm', 'Meeting and asking names in a group', 'グループでの自己紹介と名前の確認');
add('Ba người gặp nhau. Satō và Tanaka chào nhau, rồi Itō đến. Họ hỏi tên, xác nhận, và khi nghe chưa rõ thì nhờ nói lại.', 'Three people meet. Satō and Tanaka greet each other, then Itō arrives. They ask names, confirm them, and ask for a repeat when they can’t hear clearly.', '三人が出会います。佐藤さんと田中さんがあいさつをした後、伊藤さんが来ます。名前を聞き、確認し、聞き取れないときは言い直しをお願いします。');
add('Khi có người khác đến', 'When another person arrives', '別の人が来たとき');
// Q14 line translations
add('Xin chào. Rất vui được gặp bạn. Tôi là Satō.', 'Hello. Nice to meet you. I’m Satō.', 'こんにちは。はじめまして。佐藤です。');
add('Xin chào. Tôi là Tanaka. Rất mong được làm quen.', 'Hello. I’m Tanaka. I look forward to getting to know you.', 'こんにちは。田中です。よろしくお願いします。');
add('Xin chào. Xin lỗi, tên bạn là gì?', 'Hello. Excuse me, what is your name?', 'こんにちは。すみません、お名前は何ですか。');
add('À, bạn là Itō phải không.', 'Ah, you’re Itō, right?', 'あ、伊藤さんですね。');
add('Vâng. Còn tên bạn là gì?', 'Yes. And your name is?', 'はい。お名前は？');
add('Vâng. Rất mong được làm quen.', 'Yes. I look forward to getting to know you.', 'はい。よろしくお願いします。');
// Exercise prompts (Q9/Q10/Q13)
add('Checkpoint 5 câu nhỏ', 'Five-question checkpoint', '5問チェックポイント');
add('Hoàn thành đoạn chat', 'Complete the chat', 'チャットを完成させる');
add('Hoàn thành câu hỏi tên lịch sự. Chọn từng ô trống, rồi chọn thẻ phù hợp. Có thẻ không cần dùng.', 'Complete the polite name question. Select each blank, then choose the right card. One card isn’t needed.', '丁寧な名前の質問を完成させてください。各空欄を選び、適切なカードを選んでください。使わないカードがあります。');

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
            `[l2-support] missing ${locale} translation for Vietnamese support string: ` +
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
            `[l2-support] missing en/ja translation for Vietnamese support ` +
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
