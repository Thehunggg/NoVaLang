const N = (en, vi, ja) => ({ en, vi, ja, ko: en, zh: en });
const L = (speaker, en, ja, reading, vi) => ({ speaker, en, ja, reading, vi });
const D = (title, situation, lines) => ({
  titleByNative: N(...title),
  situationByNative: N(...situation),
  lines: lines.map((line) => L(...line)),
});

export const MODULE_ONE_DIALOGUES = {
  'hello-im': [
    D(['A friendly hello', 'Lời chào thân thiện', '気軽なあいさつ'], ['Two classmates meet before class.', 'Hai bạn học gặp nhau trước giờ học.', '授業の前にクラスメートが会います。'], [
      ['A', 'Hello! Are you here for the Japanese class?', 'こんにちは。日本語のクラスですか。', 'こんにちは。にほんごのくらすですか。', 'Xin chào! Bạn đến lớp tiếng Nhật phải không?'],
      ['B', 'Yes, I am. It is my first class.', 'はい、そうです。初めてのクラスです。', 'はい、そうです。はじめてのくらすです。', 'Vâng. Đây là buổi học đầu tiên của tôi.'],
      ['A', 'Me too. I am a little nervous.', '私もです。少し緊張しています。', 'わたしもです。すこしきんちょうしています。', 'Tôi cũng vậy. Tôi hơi hồi hộp.'],
      ['B', 'Don’t worry. Let’s sit together.', '大丈夫です。一緒に座りましょう。', 'だいじょうぶです。いっしょにすわりましょう。', 'Đừng lo. Chúng ta ngồi cùng nhau nhé.'],
    ]),
    D(['Greeting and names', 'Chào hỏi và tên', 'あいさつと名前'], ['Two people introduce themselves at a class.', 'Hai người giới thiệu ở lớp học.', 'クラスで二人が自己紹介します。'], [
      ['A', 'Hello, I’m Emma.', 'こんにちは、田中です。', 'こんにちは、たなかです。', 'Xin chào, tôi là Emma.'],
      ['B', 'Hello, I’m David.', 'こんにちは、佐藤です。', 'こんにちは、さとうです。', 'Xin chào, tôi là David.'],
      ['A', 'Nice to meet you, David.', '佐藤さん、よろしくお願いします。', 'さとうさん、よろしくおねがいします。', 'Rất vui được gặp bạn, David.'],
      ['B', 'Nice to meet you too, Emma.', '田中さん、こちらこそよろしくお願いします。', 'たなかさん、こちらこそよろしくおねがいします。', 'Tôi cũng rất vui được gặp bạn, Emma.'],
    ]),
    D(['First meeting', 'Lần gặp đầu tiên', '初対面'], ['You meet a new coworker at work.', 'Bạn gặp đồng nghiệp mới tại nơi làm việc.', '職場で新しい同僚に会います。'], [
      ['A', 'Hello. I’m Anna from the design team.', 'こんにちは。デザインチームの山田です。', 'こんにちは。でざいんちーむのやまだです。', 'Xin chào. Tôi là Anna từ nhóm thiết kế.'],
      ['B', 'I’m John from sales. Nice to meet you.', '営業の鈴木です。はじめまして。', 'えいぎょうのすずきです。はじめまして。', 'Tôi là John từ bộ phận kinh doanh. Rất vui được gặp bạn.'],
      ['A', 'Nice to meet you too. Please call me Anna.', 'こちらこそ、よろしくお願いします。山田と呼んでください。', 'こちらこそ、よろしくおねがいします。やまだとよんでください。', 'Tôi cũng rất vui được gặp bạn. Hãy gọi tôi là Anna.'],
      ['B', 'Thank you, Anna. I hope we work well together.', 'ありがとうございます、山田さん。一緒に頑張りましょう。', 'ありがとうございます、やまださん。いっしょにがんばりましょう。', 'Cảm ơn Anna. Mong chúng ta làm việc tốt cùng nhau.'],
    ]),
  ],
  'whats-your-name': [
    D(['Asking a name', 'Hỏi tên', '名前を聞く'], ['You meet someone at a language club.', 'Bạn gặp ai đó ở câu lạc bộ ngôn ngữ.', '語学クラブで人に会います。'], [
      ['A', 'Hello. What’s your name?', 'こんにちは。お名前は？', 'こんにちは。おなまえは？', 'Xin chào. Tên bạn là gì?'],
      ['B', 'I’m Sarah.', '高橋です。', 'たかはしです。', 'Tôi là Sarah.'],
      ['A', 'Nice to meet you, Sarah.', '高橋さん、よろしくお願いします。', 'たかはしさん、よろしくおねがいします。', 'Rất vui được gặp bạn, Sarah.'],
      ['B', 'Nice to meet you too.', 'こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Tôi cũng rất vui được gặp bạn.'],
    ]),
    D(['At registration', 'Tại quầy đăng ký', '受付で'], ['A staff member checks your registration.', 'Nhân viên kiểm tra đăng ký của bạn.', '受付で登録を確認します。'], [
      ['A', 'May I ask your name?', 'お名前を伺ってもいいですか。', 'おなまえをうかがってもいいですか。', 'Tôi có thể hỏi tên bạn không?'],
      ['B', 'My name is Anna Johnson.', '山田アンナです。', 'やまだあんなです。', 'Tên tôi là Anna Johnson.'],
      ['A', 'Thank you. How do you spell your family name?', 'ありがとうございます。お名前の漢字はどう書きますか。', 'ありがとうございます。おなまえのかんじはどうかきますか。', 'Cảm ơn. Bạn đánh vần họ của mình thế nào?'],
      ['B', 'J-O-H-N-S-O-N.', 'やまだです。', 'やまだです。', 'J-O-H-N-S-O-N.'],
    ]),
    D(['Finding a friend', 'Tìm bạn', '友達を探す'], ['You are looking for someone at an event.', 'Bạn đang tìm ai đó ở sự kiện.', 'イベントで人を探しています。'], [
      ['A', 'Excuse me, what’s your name?', 'すみません。お名前は何ですか。', 'すみません。おなまえはなんですか。', 'Xin lỗi, tên bạn là gì?'],
      ['B', 'I’m David. Are you looking for me?', '佐藤です。私を探していますか。', 'さとうです。わたしをさがしていますか。', 'Tôi là David. Bạn đang tìm tôi à?'],
      ['A', 'Yes, John told me to meet you here.', 'はい。鈴木さんがここで会うと言いました。', 'はい。すずきさんがここであうといいました。', 'Vâng. John bảo tôi gặp bạn ở đây.'],
      ['B', 'Great. I’m glad you found me.', 'よかったです。会えてうれしいです。', 'よかったです。あえてうれしいです。', 'Tuyệt. Tôi mừng vì bạn đã tìm được tôi.'],
    ]),
  ],
  'nice-to-meet-you': [
    D(['After introductions', 'Sau khi giới thiệu', '自己紹介の後'], ['Two new classmates finish introducing themselves.', 'Hai bạn học mới kết thúc phần giới thiệu.', '新しいクラスメートが自己紹介を終えます。'], [
      ['A', 'I’m Emma.', '田中です。', 'たなかです。', 'Tôi là Emma.'],
      ['B', 'I’m Sarah.', '高橋です。', 'たかはしです。', 'Tôi là Sarah.'],
      ['A', 'Nice to meet you.', 'はじめまして。', 'はじめまして。', 'Rất vui được gặp bạn.'],
      ['B', 'Nice to meet you too.', 'こちらこそ、よろしくお願いします。', 'こちらこそ、よろしくおねがいします。', 'Tôi cũng rất vui được gặp bạn.'],
    ]),
    D(['New colleague', 'Đồng nghiệp mới', '新しい同僚'], ['You welcome a new colleague.', 'Bạn chào đón đồng nghiệp mới.', '新しい同僚を迎えます。'], [
      ['A', 'Welcome to the team, David.', 'チームへようこそ、佐藤さん。', 'ちーむへようこそ、さとうさん。', 'Chào mừng đến với nhóm, David.'],
      ['B', 'Thank you. It is a pleasure to meet you.', 'ありがとうございます。お会いできてうれしいです。', 'ありがとうございます。おあいできてうれしいです。', 'Cảm ơn. Rất hân hạnh được gặp bạn.'],
      ['A', 'We are happy to have you here.', '来てくれてうれしいです。', 'きてくれてうれしいです。', 'Chúng tôi rất vui khi bạn ở đây.'],
      ['B', 'I look forward to working with everyone.', '皆さんと働くのを楽しみにしています。', 'みなさんとはたらくのをたのしみにしています。', 'Tôi mong được làm việc cùng mọi người.'],
    ]),
    D(['Leaving a first meeting', 'Rời buổi gặp đầu tiên', '初対面の別れ'], ['You end a friendly first conversation.', 'Bạn kết thúc cuộc trò chuyện đầu tiên thân thiện.', '初対面の会話を気持ちよく終えます。'], [
      ['A', 'It was nice to meet you, Anna.', '山田さん、お会いできてよかったです。', 'やまださん、おあいできてよかったです。', 'Rất vui được gặp bạn, Anna.'],
      ['B', 'It was nice to meet you too.', 'こちらこそ、お会いできてうれしかったです。', 'こちらこそ、おあいできてうれしかったです。', 'Tôi cũng rất vui được gặp bạn.'],
      ['A', 'See you at the next class.', '次のクラスで会いましょう。', 'つぎのくらすであいましょう。', 'Hẹn gặp bạn ở buổi học tiếp theo.'],
      ['B', 'See you soon.', 'また会いましょう。', 'またあいましょう。', 'Hẹn sớm gặp lại.'],
    ]),
  ],
  'come-from': [
    D(['Saying where you come from', 'Nói nơi bạn đến', '出身を言う'], ['Two students talk before class.', 'Hai học viên nói chuyện trước giờ học.', '授業の前に生徒が話します。'], [
      ['A', 'I come from Vietnam.', 'ベトナムから来ました。', 'べとなむからきました。', 'Tôi đến từ Việt Nam.'],
      ['B', 'I come from Japan.', '日本から来ました。', 'にほんからきました。', 'Tôi đến từ Nhật Bản.'],
      ['A', 'Do you live here now?', '今はここに住んでいますか。', 'いまはここにすんでいますか。', 'Bây giờ bạn sống ở đây à?'],
      ['B', 'Yes, I live here now.', 'はい、今はここに住んでいます。', 'はい、いまはここにすんでいます。', 'Vâng, bây giờ tôi sống ở đây.'],
    ]),
    D(['At an event', 'Tại sự kiện', 'イベントで'], ['You make small talk with a visitor.', 'Bạn trò chuyện xã giao với khách tham quan.', '来場者と軽く話します。'], [
      ['A', 'Where did you come from today?', '今日はどこから来ましたか。', 'きょうはどこからきましたか。', 'Hôm nay bạn đến từ đâu?'],
      ['B', 'I came from Osaka this morning.', '今朝、大阪から来ました。', 'けさ、おおさかからきました。', 'Sáng nay tôi đến từ Osaka.'],
      ['A', 'That is a long trip.', '長い旅ですね。', 'ながいたびですね。', 'Chuyến đi dài nhỉ.'],
      ['B', 'Yes, but I am happy to be here.', 'はい。でも、ここに来られてうれしいです。', 'はい。でも、ここにこられてうれしいです。', 'Vâng, nhưng tôi rất vui được ở đây.'],
    ]),
    D(['Welcome to town', 'Chào mừng đến thành phố', '町へようこそ'], ['A visitor asks about your hometown.', 'Một vị khách hỏi về quê hương của bạn.', '旅行者が出身を聞きます。'], [
      ['A', 'I come from Canada, but I live in Tokyo.', 'カナダから来ましたが、東京に住んでいます。', 'かなだからきましたが、とうきょうにすんでいます。', 'Tôi đến từ Canada, nhưng sống ở Tokyo.'],
      ['B', 'How long have you lived in Tokyo?', '東京にどのくらい住んでいますか。', 'とうきょうにどのくらいすんでいますか。', 'Bạn đã sống ở Tokyo bao lâu rồi?'],
      ['A', 'For two years.', '二年住んでいます。', 'にねんすんでいます。', 'Được hai năm rồi.'],
      ['B', 'Welcome to our town.', '町へようこそ。', 'まちへようこそ。', 'Chào mừng đến thành phố của chúng tôi.'],
    ]),
  ],
  'where-from': [
    D(['A simple question', 'Câu hỏi đơn giản', '簡単な質問'], ['You meet another student.', 'Bạn gặp một học viên khác.', '別の生徒に会います。'], [
      ['A', 'Where are you from?', 'どこから来ましたか。', 'どこからきましたか。', 'Bạn đến từ đâu?'],
      ['B', 'I’m from Korea.', '韓国から来ました。', 'かんこくからきました。', 'Tôi đến từ Hàn Quốc.'],
      ['A', 'Oh, I see.', 'そうですか。', 'そうですか。', 'À, vậy à.'],
      ['B', 'How about you?', 'あなたは？', 'あなたは？', 'Còn bạn thì sao?'],
    ]),
    D(['City or country', 'Thành phố hay quốc gia', '町か国か'], ['You ask for more detail politely.', 'Bạn lịch sự hỏi thêm chi tiết.', 'もう少し詳しく聞きます。'], [
      ['A', 'Where are you from?', 'どこから来ましたか。', 'どこからきましたか。', 'Bạn đến từ đâu?'],
      ['B', 'I’m from Japan.', '日本から来ました。', 'にほんからきました。', 'Tôi đến từ Nhật Bản.'],
      ['A', 'Which city are you from?', 'どの町から来ましたか。', 'どのまちからきましたか。', 'Bạn đến từ thành phố nào?'],
      ['B', 'I’m from Kyoto.', '京都から来ました。', 'きょうとからきました。', 'Tôi đến từ Kyoto.'],
    ]),
    D(['At a meetup', 'Tại buổi gặp gỡ', '交流会で'], ['A conversation continues after the answer.', 'Cuộc trò chuyện tiếp tục sau câu trả lời.', '答えの後に会話を続けます。'], [
      ['A', 'Are you from Tokyo?', '東京から来ましたか。', 'とうきょうからきましたか。', 'Bạn đến từ Tokyo phải không?'],
      ['B', 'No, I’m from Yokohama.', 'いいえ、横浜から来ました。', 'いいえ、よこはまからきました。', 'Không, tôi đến từ Yokohama.'],
      ['A', 'Is it close to Tokyo?', '東京の近くですか。', 'とうきょうのちかくですか。', 'Nó gần Tokyo không?'],
      ['B', 'Yes, it is quite close.', 'はい、とても近いです。', 'はい、とてもちかいです。', 'Vâng, khá gần.'],
    ]),
  ],
  'nationality': [
    D(['Sharing nationality', 'Nói về quốc tịch', '国籍を言う'], ['Students introduce themselves.', 'Các học viên giới thiệu bản thân.', '生徒が自己紹介します。'], [
      ['A', 'I am Vietnamese.', 'ベトナム人です。', 'べとなむじんです。', 'Tôi là người Việt Nam.'],
      ['B', 'I am Japanese.', '日本人です。', 'にほんじんです。', 'Tôi là người Nhật.'],
      ['A', 'We are in the same class.', '私たちは同じクラスです。', 'わたしたちはおなじくらすです。', 'Chúng ta cùng một lớp.'],
      ['B', 'Yes, nice to meet you.', 'はい、よろしくお願いします。', 'はい、よろしくおねがいします。', 'Vâng, rất vui được gặp bạn.'],
    ]),
    D(['Class profile', 'Hồ sơ lớp học', 'クラスのプロフィール'], ['You complete a profile with a teacher.', 'Bạn hoàn thành hồ sơ với giáo viên.', '先生とプロフィールを書きます。'], [
      ['A', 'What is your nationality?', '国籍は何ですか。', 'こくせきはなんですか。', 'Quốc tịch của bạn là gì?'],
      ['B', 'I am Canadian.', 'カナダ人です。', 'かなだじんです。', 'Tôi là người Canada.'],
      ['A', 'Thank you. Please write it here.', 'ありがとうございます。ここに書いてください。', 'ありがとうございます。ここにかいてください。', 'Cảm ơn. Hãy viết vào đây.'],
      ['B', 'Okay, I will write it.', 'はい、書きます。', 'はい、かきます。', 'Được, tôi sẽ viết.'],
    ]),
    D(['International group', 'Nhóm quốc tế', '国際グループ'], ['People compare their backgrounds at a workshop.', 'Mọi người nói về xuất thân trong buổi hội thảo.', 'ワークショップで出身を話します。'], [
      ['A', 'Is Sarah American?', '高橋さんはアメリカ人ですか。', 'たかはしさんはあめりかじんですか。', 'Sarah là người Mỹ phải không?'],
      ['B', 'No, she is Australian.', 'いいえ、オーストラリア人です。', 'いいえ、おーすとらりあじんです。', 'Không, cô ấy là người Úc.'],
      ['A', 'There are many nationalities here.', 'ここにはいろいろな国の人がいますね。', 'ここにはいろいろなくにのひとがいますね。', 'Ở đây có nhiều quốc tịch khác nhau nhỉ.'],
      ['B', 'Yes, it is an international group.', 'はい、国際的なグループです。', 'はい、こくさいてきなぐるーぷです。', 'Vâng, đây là một nhóm quốc tế.'],
    ]),
  ],
  'learning-language': [
    D(['What are you learning?', 'Bạn đang học gì?', '何を勉強していますか'], ['Classmates talk about languages.', 'Bạn học nói về ngôn ngữ.', 'クラスメートが言語について話します。'], [
      ['A', 'I’m learning Japanese.', '日本語を勉強しています。', 'にほんごをべんきょうしています。', 'Tôi đang học tiếng Nhật.'],
      ['B', 'I’m learning English.', '英語を勉強しています。', 'えいごをべんきょうしています。', 'Tôi đang học tiếng Anh.'],
      ['A', 'Do you study every day?', '毎日勉強していますか。', 'まいにちべんきょうしていますか。', 'Bạn học mỗi ngày không?'],
      ['B', 'Yes, a little every day.', 'はい、毎日少し勉強しています。', 'はい、まいにちすこしべんきょうしています。', 'Vâng, mỗi ngày một chút.'],
    ]),
    D(['Why study?', 'Tại sao học?', '勉強の理由'], ['You ask a friend about their goal.', 'Bạn hỏi bạn bè về mục tiêu của họ.', '友達に目標を聞きます。'], [
      ['A', 'Why are you learning Japanese?', 'どうして日本語を勉強していますか。', 'どうしてにほんごをべんきょうしていますか。', 'Tại sao bạn học tiếng Nhật?'],
      ['B', 'I like Japanese movies.', '日本の映画が好きです。', 'にほんのえいががすきです。', 'Tôi thích phim Nhật.'],
      ['A', 'Is Japanese difficult?', '日本語は難しいですか。', 'にほんごはむずかしいですか。', 'Tiếng Nhật có khó không?'],
      ['B', 'Yes, but it is fun.', 'はい。でも、楽しいです。', 'はい。でも、たのしいです。', 'Có, nhưng rất vui.'],
    ]),
    D(['Practice partner', 'Bạn luyện tập', '練習相手'], ['You arrange a short study session.', 'Bạn sắp xếp buổi học ngắn.', '短い勉強会を約束します。'], [
      ['A', 'I’m learning English. Can we practice?', '英語を勉強しています。一緒に練習できますか。', 'えいごをべんきょうしています。いっしょにれんしゅうできますか。', 'Tôi đang học tiếng Anh. Chúng ta có thể luyện cùng nhau không?'],
      ['B', 'Sure. I’m learning Japanese.', 'もちろんです。私は日本語を勉強しています。', 'もちろんです。わたしはにほんごをべんきょうしています。', 'Được chứ. Tôi đang học tiếng Nhật.'],
      ['A', 'Let’s help each other.', 'お互いに手伝いましょう。', 'おたがいにてつだいましょう。', 'Chúng ta hãy giúp nhau nhé.'],
      ['B', 'That sounds great.', 'いいですね。', 'いいですね。', 'Nghe hay đấy.'],
    ]),
  ],
  'understand-dont-understand': [
    D(['I understand', 'Tôi hiểu', '分かります'], ['A teacher checks a simple instruction.', 'Giáo viên kiểm tra một hướng dẫn đơn giản.', '先生が簡単な説明を確認します。'], [
      ['A', 'Do you understand?', '分かりますか。', 'わかりますか。', 'Bạn hiểu không?'],
      ['B', 'Yes, I understand.', 'はい、分かります。', 'はい、わかります。', 'Vâng, tôi hiểu.'],
      ['A', 'Please open your book.', '本を開いてください。', 'ほんをひらいてください。', 'Hãy mở sách của bạn.'],
      ['B', 'Okay.', 'はい。', 'はい。', 'Vâng.'],
    ]),
    D(['I do not understand', 'Tôi không hiểu', '分かりません'], ['You need a teacher to explain again.', 'Bạn cần giáo viên giải thích lại.', '先生にもう一度説明してもらいます。'], [
      ['A', 'Do you understand this word?', 'この言葉は分かりますか。', 'このことばはわかりますか。', 'Bạn hiểu từ này không?'],
      ['B', 'No, I don’t understand.', 'いいえ、分かりません。', 'いいえ、わかりません。', 'Không, tôi không hiểu.'],
      ['A', 'I will explain it.', '説明します。', 'せつめいします。', 'Tôi sẽ giải thích.'],
      ['B', 'Thank you very much.', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn bạn rất nhiều.'],
    ]),
    D(['Understanding a little', 'Hiểu một chút', '少し分かる'], ['You ask for help during a real lesson.', 'Bạn nhờ giúp trong giờ học thật.', '実際の授業で助けを求めます。'], [
      ['A', 'Can you follow the lesson?', '授業は分かりますか。', 'じゅぎょうはわかりますか。', 'Bạn theo kịp bài học không?'],
      ['B', 'I understand a little, but not everything.', '少し分かりますが、全部は分かりません。', 'すこしわかりますが、ぜんぶはわかりません。', 'Tôi hiểu một chút, nhưng không phải tất cả.'],
      ['A', 'Please ask questions anytime.', 'いつでも質問してください。', 'いつでもしつもんしてください。', 'Hãy hỏi bất cứ lúc nào.'],
      ['B', 'Thank you. That helps me.', 'ありがとうございます。助かります。', 'ありがとうございます。たすかります。', 'Cảm ơn. Điều đó giúp tôi.'],
    ]),
  ],
  'say-again': [
    D(['A polite repeat request', 'Yêu cầu nói lại lịch sự', '丁寧な聞き返し'], ['You did not hear a classmate.', 'Bạn không nghe rõ bạn học.', 'クラスメートの言葉が聞こえません。'], [
      ['A', 'My name is David.', '佐藤です。', 'さとうです。', 'Tôi là David.'],
      ['B', 'Sorry, can you say that again?', 'すみません。もう一度お願いします。', 'すみません。もういちどおねがいします。', 'Xin lỗi, bạn có thể nói lại không?'],
      ['A', 'My name is David.', '佐藤です。', 'さとうです。', 'Tôi là David.'],
      ['B', 'Thank you, David.', 'ありがとうございます、佐藤さん。', 'ありがとうございます、さとうさん。', 'Cảm ơn bạn, David.'],
    ]),
    D(['At a counter', 'Tại quầy', 'カウンターで'], ['A cashier says the total too quickly.', 'Thu ngân nói tổng tiền quá nhanh.', '店員が合計を速く言います。'], [
      ['A', 'It is eight hundred yen.', '八百円です。', 'はっぴゃくえんです。', 'Là tám trăm yên.'],
      ['B', 'I didn’t hear that. Please repeat it.', '聞こえませんでした。もう一度言ってください。', 'きこえませんでした。もういちどいってください。', 'Tôi không nghe được. Làm ơn nói lại.'],
      ['A', 'Eight hundred yen.', '八百円です。', 'はっぴゃくえんです。', 'Tám trăm yên.'],
      ['B', 'Thank you.', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn.'],
    ]),
    D(['Important directions', 'Chỉ đường quan trọng', '大事な案内'], ['You repeat directions to make sure you heard them.', 'Bạn xin nhắc lại chỉ đường để chắc chắn đã nghe đúng.', '道案内を確認します。'], [
      ['A', 'Turn right at the next corner.', '次の角を右に曲がってください。', 'つぎのかどをみぎにまがってください。', 'Hãy rẽ phải ở góc tiếp theo.'],
      ['B', 'Could you say that again slowly?', 'もう一度、ゆっくり言っていただけますか。', 'もういちど、ゆっくりいっていただけますか。', 'Bạn có thể nói lại chậm được không?'],
      ['A', 'Turn right at the next corner.', '次の角を右に曲がってください。', 'つぎのかどをみぎにまがってください。', 'Hãy rẽ phải ở góc tiếp theo.'],
      ['B', 'Thank you. I understand now.', 'ありがとうございます。今、分かりました。', 'ありがとうございます。いま、わかりました。', 'Cảm ơn. Bây giờ tôi hiểu rồi.'],
    ]),
  ],
  'how-are-you': [
    D(['Morning greeting', 'Lời chào buổi sáng', '朝のあいさつ'], ['You see a neighbor in the morning.', 'Bạn gặp hàng xóm vào buổi sáng.', '朝に近所の人に会います。'], [
      ['A', 'Good morning. How are you?', 'おはようございます。お元気ですか。', 'おはようございます。おげんきですか。', 'Chào buổi sáng. Bạn có khỏe không?'],
      ['B', 'I’m fine, thank you.', '元気です。ありがとうございます。', 'げんきです。ありがとうございます。', 'Tôi khỏe, cảm ơn.'],
      ['A', 'Have a nice day.', 'よい一日を。', 'よいいちにちを。', 'Chúc bạn một ngày tốt lành.'],
      ['B', 'You too.', 'あなたも。', 'あなたも。', 'Bạn cũng vậy nhé.'],
    ]),
    D(['A tired friend', 'Bạn đang mệt', '疲れた友達'], ['You notice your friend looks tired.', 'Bạn thấy bạn mình có vẻ mệt.', '友達が疲れて見えます。'], [
      ['A', 'How are you today?', '今日はお元気ですか。', 'きょうはおげんきですか。', 'Hôm nay bạn thế nào?'],
      ['B', 'I’m a little tired.', '少し疲れています。', 'すこしつかれています。', 'Tôi hơi mệt.'],
      ['A', 'I hope you can rest soon.', '早く休めるといいですね。', 'はやくやすめるといいですね。', 'Tôi mong bạn sớm được nghỉ ngơi.'],
      ['B', 'Thank you. I will.', 'ありがとう。そうします。', 'ありがとう。そうします。', 'Cảm ơn. Tôi sẽ làm vậy.'],
    ]),
    D(['Checking in at work', 'Hỏi thăm ở nơi làm việc', '職場での声かけ'], ['You greet a colleague after a busy week.', 'Bạn chào đồng nghiệp sau tuần bận rộn.', '忙しい週の後に同僚に会います。'], [
      ['A', 'Hi Sarah, how have you been?', '高橋さん、最近どうですか。', 'たかはしさん、さいきんどうですか。', 'Chào Sarah, dạo này bạn thế nào?'],
      ['B', 'I’m good, just busy.', '元気です。ただ、忙しいです。', 'げんきです。ただ、いそがしいです。', 'Tôi khỏe, chỉ là hơi bận.'],
      ['A', 'I understand. Take care of yourself.', '分かります。無理しないでください。', 'わかります。むりしないでください。', 'Tôi hiểu. Hãy giữ gìn sức khỏe nhé.'],
      ['B', 'Thanks for asking.', '聞いてくれてありがとう。', 'きいてくれてありがとう。', 'Cảm ơn vì đã hỏi.'],
    ]),
  ],
  'fine-thank-you': [
    D(['A short answer', 'Câu trả lời ngắn', '短い返事'], ['A friend asks how you are.', 'Một người bạn hỏi thăm bạn.', '友達が元気を聞きます。'], [
      ['A', 'How are you?', 'お元気ですか。', 'おげんきですか。', 'Bạn có khỏe không?'],
      ['B', 'I’m fine, thank you.', '元気です。ありがとう。', 'げんきです。ありがとう。', 'Tôi khỏe, cảm ơn.'],
      ['A', 'That is good.', 'それはよかったです。', 'それはよかったです。', 'Thế thì tốt.'],
      ['B', 'How about you?', 'あなたは？', 'あなたは？', 'Còn bạn thì sao?'],
    ]),
    D(['A polite workplace answer', 'Trả lời lịch sự ở nơi làm việc', '職場で丁寧に答える'], ['A coworker checks on you at work.', 'Đồng nghiệp hỏi thăm bạn tại nơi làm việc.', '同僚が職場で体調を聞きます。'], [
      ['A', 'Are you okay today?', '今日は大丈夫ですか。', 'きょうはだいじょうぶですか。', 'Hôm nay bạn ổn chứ?'],
      ['B', 'I’m good, thanks for asking.', '元気です。聞いてくれてありがとうございます。', 'げんきです。きいてくれてありがとうございます。', 'Tôi khỏe, cảm ơn vì đã hỏi.'],
      ['A', 'I’m glad to hear that.', 'それを聞いて安心しました。', 'それをきいてあんしんしました。', 'Tôi mừng khi nghe vậy.'],
      ['B', 'Thank you for your concern.', '気にかけてくれてありがとうございます。', 'きにかけてくれてありがとうございます。', 'Cảm ơn vì đã quan tâm.'],
    ]),
    D(['Not perfect, but okay', 'Không hoàn hảo nhưng ổn', '完璧ではないけれど大丈夫'], ['You give an honest but friendly answer.', 'Bạn trả lời chân thành nhưng thân thiện.', '正直でやさしい返事をします。'], [
      ['A', 'How are you?', 'お元気ですか。', 'おげんきですか。', 'Bạn có khỏe không?'],
      ['B', 'I’m a little tired, but I’m okay. Thank you.', '少し疲れていますが、大丈夫です。ありがとうございます。', 'すこしつかれていますが、だいじょうぶです。ありがとうございます。', 'Tôi hơi mệt nhưng ổn. Cảm ơn bạn.'],
      ['A', 'Please take it easy today.', '今日はゆっくりしてください。', 'きょうはゆっくりしてください。', 'Hôm nay hãy nghỉ ngơi nhé.'],
      ['B', 'I will. Thanks.', 'そうします。ありがとう。', 'そうします。ありがとう。', 'Tôi sẽ làm vậy. Cảm ơn.'],
    ]),
  ],
  'and-you': [
    D(['Returning the question', 'Hỏi lại', '質問を返す'], ['You continue a greeting naturally.', 'Bạn tiếp tục lời chào một cách tự nhiên.', 'あいさつを自然に続けます。'], [
      ['A', 'I’m fine, thank you. And you?', '元気です。ありがとう。あなたは？', 'げんきです。ありがとう。あなたは？', 'Tôi khỏe, cảm ơn. Còn bạn thì sao?'],
      ['B', 'I’m good too.', '私も元気です。', 'わたしもげんきです。', 'Tôi cũng khỏe.'],
      ['A', 'That’s nice.', 'いいですね。', 'いいですね。', 'Hay quá.'],
      ['B', 'Yes, it is a good day.', 'はい、いい日です。', 'はい、いいひです。', 'Vâng, hôm nay là một ngày đẹp trời.'],
    ]),
    D(['Same hobby', 'Cùng sở thích', '同じ趣味'], ['You ask the same question back about a hobby.', 'Bạn hỏi lại cùng câu hỏi về sở thích.', '趣味について聞き返します。'], [
      ['A', 'I like Japanese movies. How about you?', '日本の映画が好きです。あなたはどうですか。', 'にほんのえいががすきです。あなたはどうですか。', 'Tôi thích phim Nhật. Còn bạn thì sao?'],
      ['B', 'I like them too.', '私も好きです。', 'わたしもすきです。', 'Tôi cũng thích.'],
      ['A', 'What is your favorite movie?', '好きな映画は何ですか。', 'すきなえいがはなんですか。', 'Bộ phim bạn thích nhất là gì?'],
      ['B', 'I like this new movie.', 'この新しい映画が好きです。', 'このあたらしいえいががすきです。', 'Tôi thích bộ phim mới này.'],
    ]),
    D(['A longer exchange', 'Trao đổi dài hơn', '少し長い会話'], ['You keep a first chat balanced.', 'Bạn giữ cuộc trò chuyện đầu tiên cân bằng.', '初対面の会話をバランスよく続けます。'], [
      ['A', 'I’m learning Japanese. And you?', '私は日本語を勉強しています。あなたは？', 'わたしはにほんごをべんきょうしています。あなたは？', 'Tôi đang học tiếng Nhật. Còn bạn thì sao?'],
      ['B', 'I’m learning English.', '私は英語を勉強しています。', 'わたしはえいごをべんきょうしています。', 'Tôi đang học tiếng Anh.'],
      ['A', 'Maybe we can practice together.', '一緒に練習できるかもしれませんね。', 'いっしょにれんしゅうできるかもしれませんね。', 'Có lẽ chúng ta có thể luyện cùng nhau.'],
      ['B', 'Yes, that would be great.', 'はい、それはいいですね。', 'はい、それはいいですね。', 'Vâng, như vậy thì tuyệt.'],
    ]),
  ],
  'sorry-dont-understand': [
    D(['A word you do not know', 'Từ bạn không biết', '分からない言葉'], ['You ask about an unfamiliar word.', 'Bạn hỏi về một từ lạ.', '知らない言葉について聞きます。'], [
      ['A', 'Please read this word.', 'この言葉を読んでください。', 'このことばをよんでください。', 'Hãy đọc từ này.'],
      ['B', 'Sorry, I don’t understand this word.', 'すみません。この言葉が分かりません。', 'すみません。このことばがわかりません。', 'Xin lỗi, tôi không hiểu từ này.'],
      ['A', 'It means “station.”', '駅という意味です。', 'えきといういみです。', 'Nó nghĩa là “ga”.'],
      ['B', 'Thank you for explaining.', '説明してくれてありがとうございます。', 'せつめいしてくれてありがとうございます。', 'Cảm ơn vì đã giải thích.'],
    ]),
    D(['At a shop', 'Tại cửa hàng', '店で'], ['A cashier speaks too quickly.', 'Thu ngân nói quá nhanh.', '店員が速く話します。'], [
      ['A', 'Do you need a bag?', '袋は必要ですか。', 'ふくろはひつようですか。', 'Bạn có cần túi không?'],
      ['B', 'Sorry, I don’t understand.', 'すみません、分かりません。', 'すみません、わかりません。', 'Xin lỗi, tôi không hiểu.'],
      ['A', 'A bag. Do you need one?', '袋です。必要ですか。', 'ふくろです。ひつようですか。', 'Túi. Bạn có cần một cái không?'],
      ['B', 'Yes, please.', 'はい、お願いします。', 'はい、おねがいします。', 'Vâng, làm ơn.'],
    ]),
    D(['Asking for help', 'Nhờ giúp đỡ', '助けを求める'], ['You need clarification in a public place.', 'Bạn cần làm rõ ở nơi công cộng.', '公共の場所で説明を求めます。'], [
      ['A', 'The bus leaves from platform three.', 'バスは三番乗り場から出ます。', 'ばすはさんばんのりばからでます。', 'Xe buýt khởi hành từ sân số ba.'],
      ['B', 'Sorry, I don’t understand. Could you help me?', 'すみません、分かりません。手伝っていただけますか。', 'すみません、わかりません。てつだっていただけますか。', 'Xin lỗi, tôi không hiểu. Bạn có thể giúp tôi không?'],
      ['A', 'Platform three is over there.', '三番乗り場はあちらです。', 'さんばんのりばはあちらです。', 'Sân số ba ở đằng kia.'],
      ['B', 'Thank you very much.', 'どうもありがとうございます。', 'どうもありがとうございます。', 'Cảm ơn bạn rất nhiều.'],
    ]),
  ],
  'speak-slowly': [
    D(['A simple request', 'Yêu cầu đơn giản', '簡単なお願い'], ['A friend speaks fast during practice.', 'Một người bạn nói nhanh khi luyện tập.', '友達が練習中に速く話します。'], [
      ['A', 'Please speak slowly.', 'ゆっくり話してください。', 'ゆっくりはなしてください。', 'Làm ơn nói chậm lại.'],
      ['B', 'Okay, I will speak slowly.', 'はい、ゆっくり話します。', 'はい、ゆっくりはなします。', 'Được, tôi sẽ nói chậm.'],
      ['A', 'Thank you.', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn.'],
      ['B', 'You’re welcome.', 'どういたしまして。', 'どういたしまして。', 'Không có gì.'],
    ]),
    D(['Still learning', 'Vẫn đang học', 'まだ勉強中'], ['You explain why you need slower speech.', 'Bạn giải thích tại sao cần nói chậm hơn.', 'ゆっくり話してほしい理由を伝えます。'], [
      ['A', 'Could you speak a little more slowly?', 'もう少しゆっくり話していただけますか。', 'もうすこしゆっくりはなしていただけますか。', 'Bạn có thể nói chậm hơn một chút không?'],
      ['B', 'Of course. Are you learning Japanese?', 'もちろんです。日本語を勉強していますか。', 'もちろんです。にほんごをべんきょうしていますか。', 'Tất nhiên. Bạn đang học tiếng Nhật à?'],
      ['A', 'Yes, I’m still learning.', 'はい、まだ勉強中です。', 'はい、まだべんきょうちゅうです。', 'Vâng, tôi vẫn đang học.'],
      ['B', 'Then I will speak clearly.', 'では、はっきり話します。', 'では、はっきりはなします。', 'Vậy tôi sẽ nói rõ ràng.'],
    ]),
    D(['At the station', 'Ở nhà ga', '駅で'], ['A station worker gives fast directions.', 'Nhân viên ga chỉ đường nhanh.', '駅員が速く道を案内します。'], [
      ['A', 'Take the train on platform four.', '四番線の電車に乗ってください。', 'よんばんせんのでんしゃにのってください。', 'Hãy lên tàu ở sân số bốn.'],
      ['B', 'Sorry, please speak slowly.', 'すみません、ゆっくり話してください。', 'すみません、ゆっくりはなしてください。', 'Xin lỗi, làm ơn nói chậm lại.'],
      ['A', 'Platform four. Take the train there.', '四番線です。そこで電車に乗ってください。', 'よんばんせんです。そこででんしゃにのってください。', 'Sân số bốn. Hãy lên tàu ở đó.'],
      ['B', 'Thank you. That helps a lot.', 'ありがとうございます。とても助かります。', 'ありがとうございます。とてもたすかります。', 'Cảm ơn. Điều đó giúp tôi rất nhiều.'],
    ]),
  ],
  'write-it': [
    D(['Write a name', 'Viết tên', '名前を書く'], ['You need a name written down.', 'Bạn cần ghi lại một cái tên.', '名前を書いてもらいます。'], [
      ['A', 'Can you write your name for me?', 'お名前を書いてくれますか。', 'おなまえをかいてくれますか。', 'Bạn có thể viết tên cho tôi không?'],
      ['B', 'Sure. My name is David.', 'はい。佐藤です。', 'はい。さとうです。', 'Được. Tên tôi là David.'],
      ['A', 'Thank you. Is that correct?', 'ありがとうございます。これで合っていますか。', 'ありがとうございます。これであっていますか。', 'Cảm ơn. Như vậy đúng không?'],
      ['B', 'Yes, that is correct.', 'はい、合っています。', 'はい、あっています。', 'Vâng, đúng rồi.'],
    ]),
    D(['Write the address', 'Viết địa chỉ', '住所を書く'], ['You ask for an address at a hotel.', 'Bạn hỏi địa chỉ ở khách sạn.', 'ホテルで住所を書いてもらいます。'], [
      ['A', 'Can you write the address for me?', '住所を書いてくれますか。', 'じゅうしょをかいてくれますか。', 'Bạn có thể viết địa chỉ cho tôi không?'],
      ['B', 'Yes. Here is a pen.', 'はい。ペンをどうぞ。', 'はい。ぺんをどうぞ。', 'Vâng. Đây là bút.'],
      ['A', 'Thank you. Please write it slowly.', 'ありがとうございます。ゆっくり書いてください。', 'ありがとうございます。ゆっくりかいてください。', 'Cảm ơn. Hãy viết chậm nhé.'],
      ['B', 'Of course.', 'もちろんです。', 'もちろんです。', 'Tất nhiên.'],
    ]),
    D(['Spelling an email', 'Đánh vần email', 'メールをつづる'], ['You need contact information written clearly.', 'Bạn cần thông tin liên lạc được viết rõ ràng.', '連絡先を書いてもらいます。'], [
      ['A', 'Could you write your email address?', 'メールアドレスを書いていただけますか。', 'めーるあどれすをかいていただけますか。', 'Bạn có thể viết địa chỉ email của bạn không?'],
      ['B', 'Sure. Please check it carefully.', 'もちろんです。よく確認してください。', 'もちろんです。よくかくにんしてください。', 'Được. Hãy kiểm tra kỹ nhé.'],
      ['A', 'Can you spell the last part?', '最後の部分をつづってくれますか。', 'さいごのぶぶんをつづってくれますか。', 'Bạn có thể đánh vần phần cuối không?'],
      ['B', 'Yes, I will write it again.', 'はい、もう一度書きます。', 'はい、もういちどかきます。', 'Vâng, tôi sẽ viết lại.'],
    ]),
  ],
  'thanks-reply': [
    D(['A small favor', 'Một giúp đỡ nhỏ', '小さな親切'], ['Someone holds the door for you.', 'Ai đó giữ cửa cho bạn.', '誰かがドアを押さえてくれます。'], [
      ['A', 'Here you are.', 'どうぞ。', 'どうぞ。', 'Mời bạn.'],
      ['B', 'Thank you.', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn.'],
      ['A', 'You’re welcome.', 'どういたしまして。', 'どういたしまして。', 'Không có gì.'],
      ['B', 'That was very kind.', 'とても親切ですね。', 'とてもしんせつですね。', 'Bạn thật tốt bụng.'],
    ]),
    D(['Help with a bag', 'Giúp mang túi', 'かばんを手伝う'], ['A friend helps you carry something.', 'Một người bạn giúp bạn mang đồ.', '友達が荷物を運ぶのを手伝います。'], [
      ['A', 'Let me help you with that bag.', 'そのかばんを持ちますよ。', 'そのかばんをもちますよ。', 'Để tôi giúp bạn mang túi đó.'],
      ['B', 'Thanks a lot.', 'どうもありがとうございます。', 'どうもありがとうございます。', 'Cảm ơn rất nhiều.'],
      ['A', 'No problem.', '大丈夫です。', 'だいじょうぶです。', 'Không sao đâu.'],
      ['B', 'I really appreciate it.', '本当に助かります。', 'ほんとうにたすかります。', 'Tôi thực sự cảm kích.'],
    ]),
    D(['Thanking a teacher', 'Cảm ơn giáo viên', '先生に感謝する'], ['You thank a teacher after getting help.', 'Bạn cảm ơn giáo viên sau khi được giúp.', '先生に助けてもらった後で感謝します。'], [
      ['A', 'Thank you for explaining the lesson.', '授業を説明してくれてありがとうございます。', 'じゅぎょうをせつめいしてくれてありがとうございます。', 'Cảm ơn vì đã giải thích bài học.'],
      ['B', 'You’re welcome. Did you understand?', 'どういたしまして。分かりましたか。', 'どういたしまして。わかりましたか。', 'Không có gì. Bạn đã hiểu chưa?'],
      ['A', 'Yes, I understand now.', 'はい、今は分かります。', 'はい、いまはわかります。', 'Vâng, bây giờ tôi hiểu rồi.'],
      ['B', 'I’m happy to help.', '手伝えてうれしいです。', 'てつだえてうれしいです。', 'Tôi rất vui được giúp.'],
    ]),
  ],
  'sorry-okay': [
    D(['A small bump', 'Va chạm nhẹ', '軽くぶつかる'], ['You bump into someone lightly.', 'Bạn va nhẹ vào ai đó.', '人に軽くぶつかります。'], [
      ['A', 'Sorry.', 'すみません。', 'すみません。', 'Xin lỗi.'],
      ['B', 'It’s okay.', '大丈夫です。', 'だいじょうぶです。', 'Không sao.'],
      ['A', 'Are you okay?', '大丈夫ですか。', 'だいじょうぶですか。', 'Bạn ổn chứ?'],
      ['B', 'Yes, I’m fine.', 'はい、元気です。', 'はい、げんきです。', 'Vâng, tôi ổn.'],
    ]),
    D(['Running late', 'Đến muộn', '遅刻する'], ['You arrive a few minutes late to class.', 'Bạn đến lớp muộn vài phút.', 'クラスに少し遅れます。'], [
      ['A', 'Sorry I’m late.', '遅れてすみません。', 'おくれてすみません。', 'Xin lỗi vì tôi đến muộn.'],
      ['B', 'It’s okay. Please sit down.', '大丈夫です。座ってください。', 'だいじょうぶです。すわってください。', 'Không sao. Hãy ngồi xuống.'],
      ['A', 'Thank you for waiting.', '待ってくれてありがとうございます。', 'まってくれてありがとうございます。', 'Cảm ơn vì đã đợi.'],
      ['B', 'No problem.', '問題ありません。', 'もんだいありません。', 'Không vấn đề gì.'],
    ]),
    D(['A mistaken seat', 'Ngồi nhầm chỗ', '席を間違える'], ['You realize you are in someone else’s seat.', 'Bạn nhận ra mình ngồi nhầm chỗ của người khác.', 'ほかの人の席に座っていました。'], [
      ['A', 'Excuse me, I think this is my seat.', 'すみません、ここは私の席だと思います。', 'すみません、ここはわたしのせきだとおもいます。', 'Xin lỗi, tôi nghĩ đây là chỗ của tôi.'],
      ['B', 'Oh, I’m sorry. I made a mistake.', 'あ、すみません。間違えました。', 'あ、すみません。まちがえました。', 'Ôi, xin lỗi. Tôi đã nhầm.'],
      ['A', 'It’s okay. That happens.', '大丈夫です。よくあります。', 'だいじょうぶです。よくあります。', 'Không sao. Chuyện đó thường xảy ra.'],
      ['B', 'Thank you for understanding.', '分かってくれてありがとうございます。', 'わかってくれてありがとうございます。', 'Cảm ơn vì đã thông cảm.'],
    ]),
  ],
  'please-help-me': [
    D(['Finding the station', 'Tìm nhà ga', '駅を探す'], ['You cannot find the station entrance.', 'Bạn không tìm thấy lối vào ga.', '駅の入口が見つかりません。'], [
      ['A', 'Excuse me, please help me.', 'すみません、手伝ってください。', 'すみません、てつだってください。', 'Xin lỗi, làm ơn giúp tôi.'],
      ['B', 'Sure. What do you need?', 'はい。何が必要ですか。', 'はい。なにがひつようですか。', 'Được. Bạn cần gì?'],
      ['A', 'I’m looking for the station.', '駅を探しています。', 'えきをさがしています。', 'Tôi đang tìm nhà ga.'],
      ['B', 'It is over there.', 'あちらです。', 'あちらです。', 'Nó ở đằng kia.'],
    ]),
    D(['A lost item', 'Đồ bị mất', 'なくした物'], ['You ask for help after losing your bag.', 'Bạn nhờ giúp sau khi mất túi.', 'かばんをなくして助けを求めます。'], [
      ['A', 'Could you help me, please?', '手伝っていただけますか。', 'てつだっていただけますか。', 'Bạn có thể giúp tôi không?'],
      ['B', 'Of course. What happened?', 'もちろんです。どうしましたか。', 'もちろんです。どうしましたか。', 'Tất nhiên. Có chuyện gì vậy?'],
      ['A', 'I can’t find my bag.', '私のかばんが見つかりません。', 'わたしのかばんがみつかりません。', 'Tôi không tìm thấy túi của mình.'],
      ['B', 'Let’s look for it together.', '一緒に探しましょう。', 'いっしょにさがしましょう。', 'Chúng ta cùng tìm nhé.'],
    ]),
    D(['Asking for directions', 'Hỏi đường', '道を聞く'], ['You need help finding a restaurant.', 'Bạn cần giúp tìm nhà hàng.', 'レストランへの道を聞きます。'], [
      ['A', 'Excuse me, can you help me?', 'すみません。手伝っていただけますか。', 'すみません。てつだっていただけますか。', 'Xin lỗi, bạn có thể giúp tôi không?'],
      ['B', 'Yes. Where do you want to go?', 'はい。どこへ行きたいですか。', 'はい。どこへいきたいですか。', 'Được. Bạn muốn đi đâu?'],
      ['A', 'I’m looking for this restaurant.', 'このレストランを探しています。', 'このれすとらんをさがしています。', 'Tôi đang tìm nhà hàng này.'],
      ['B', 'Go straight, then turn left.', 'まっすぐ行って、左に曲がってください。', 'まっすぐいって、ひだりにまがってください。', 'Đi thẳng, rồi rẽ trái.'],
    ]),
  ],
  'what-is-this': [
    D(['An object in class', 'Đồ vật trong lớp', '教室の物'], ['You see an unfamiliar object on a desk.', 'Bạn thấy một vật lạ trên bàn.', '机の上に知らない物があります。'], [
      ['A', 'What is this?', 'これは何ですか。', 'これはなんですか。', 'Đây là gì?'],
      ['B', 'It is a pen.', 'ペンです。', 'ぺんです。', 'Đó là bút.'],
      ['A', 'Is it yours?', 'あなたのですか。', 'あなたのですか。', 'Nó là của bạn à?'],
      ['B', 'Yes, it is mine.', 'はい、私のです。', 'はい、わたしのです。', 'Vâng, là của tôi.'],
    ]),
    D(['At a shop', 'Tại cửa hàng', '店で'], ['You ask a clerk about an unfamiliar item.', 'Bạn hỏi nhân viên về món hàng lạ.', '店員に知らない商品を聞きます。'], [
      ['A', 'Excuse me, what is this?', 'すみません、これは何ですか。', 'すみません、これはなんですか。', 'Xin lỗi, đây là gì?'],
      ['B', 'It is a local snack.', '地元のお菓子です。', 'じもとのおかしです。', 'Đó là đặc sản địa phương.'],
      ['A', 'Is it sweet?', '甘いですか。', 'あまいですか。', 'Nó có ngọt không?'],
      ['B', 'Yes, it is sweet and popular.', 'はい、甘くて人気があります。', 'はい、あまくてにんきがあります。', 'Vâng, nó ngọt và phổ biến.'],
    ]),
    D(['A sign at the station', 'Biển báo ở nhà ga', '駅の表示'], ['You ask about a sign while traveling.', 'Bạn hỏi về biển báo khi đi du lịch.', '旅行中に表示について聞きます。'], [
      ['A', 'What is that sign?', 'あの表示は何ですか。', 'あのひょうじはなんですか。', 'Biển báo kia là gì?'],
      ['B', 'It is the exit sign.', '出口の表示です。', 'でぐちのひょうじです。', 'Đó là biển chỉ lối ra.'],
      ['A', 'Thank you. Where is the exit?', 'ありがとうございます。出口はどこですか。', 'ありがとうございます。でぐちはどこですか。', 'Cảm ơn. Lối ra ở đâu?'],
      ['B', 'Go straight from here.', 'ここからまっすぐ行ってください。', 'ここからまっすぐいってください。', 'Hãy đi thẳng từ đây.'],
    ]),
  ],
  'where-is-it': [
    D(['Finding the restroom', 'Tìm nhà vệ sinh', 'トイレを探す'], ['You need to find a restroom.', 'Bạn cần tìm nhà vệ sinh.', 'トイレを探しています。'], [
      ['A', 'Excuse me, where is the restroom?', 'すみません、トイレはどこですか。', 'すみません、といれはどこですか。', 'Xin lỗi, nhà vệ sinh ở đâu?'],
      ['B', 'It is over there.', 'あちらです。', 'あちらです。', 'Ở đằng kia.'],
      ['A', 'Thank you.', 'ありがとうございます。', 'ありがとうございます。', 'Cảm ơn.'],
      ['B', 'You’re welcome.', 'どういたしまして。', 'どういたしまして。', 'Không có gì.'],
    ]),
    D(['Finding the station', 'Tìm nhà ga', '駅を探す'], ['You ask for a nearby station.', 'Bạn hỏi về nhà ga gần đó.', '近くの駅を聞きます。'], [
      ['A', 'Where is the station?', '駅はどこですか。', 'えきはどこですか。', 'Ga ở đâu?'],
      ['B', 'It is on the right.', '右です。', 'みぎです。', 'Ở bên phải.'],
      ['A', 'Is it far?', '遠いですか。', 'とおいですか。', 'Có xa không?'],
      ['B', 'No, it is very close.', 'いいえ、とても近いです。', 'いいえ、とてもちかいです。', 'Không, rất gần.'],
    ]),
    D(['At a large building', 'Trong tòa nhà lớn', '大きな建物で'], ['You need to find the correct office.', 'Bạn cần tìm đúng văn phòng.', '目的の事務所を探します。'], [
      ['A', 'Excuse me, where is room 302?', 'すみません、三〇二号室はどこですか。', 'すみません、さんまるにごうしつはどこですか。', 'Xin lỗi, phòng 302 ở đâu?'],
      ['B', 'It is on the third floor.', '三階です。', 'さんがいです。', 'Ở tầng ba.'],
      ['A', 'Which way is the elevator?', 'エレベーターはどちらですか。', 'えれべーたーはどちらですか。', 'Thang máy ở hướng nào?'],
      ['B', 'It is around that corner.', 'あの角の向こうです。', 'あのかどのむこうです。', 'Nó ở qua góc kia.'],
    ]),
  ],
  'when-what-time': [
    D(['Asking the time', 'Hỏi giờ', '時間を聞く'], ['You check the time before class.', 'Bạn xem giờ trước khi vào lớp.', '授業の前に時間を確認します。'], [
      ['A', 'What time is it?', '何時ですか。', 'なんじですか。', 'Mấy giờ rồi?'],
      ['B', 'It is three o’clock.', '三時です。', 'さんじです。', 'Bây giờ là ba giờ.'],
      ['A', 'Is class at three?', '授業は三時ですか。', 'じゅぎょうはさんじですか。', 'Lớp học lúc ba giờ phải không?'],
      ['B', 'Yes, it starts now.', 'はい、今始まります。', 'はい、いまはじまります。', 'Vâng, bắt đầu bây giờ.'],
    ]),
    D(['Meeting time', 'Giờ hẹn gặp', '待ち合わせの時間'], ['You arrange a time to meet a friend.', 'Bạn hẹn giờ gặp bạn.', '友達と会う時間を決めます。'], [
      ['A', 'When does the movie start?', '映画はいつ始まりますか。', 'えいがはいつはじまりますか。', 'Phim bắt đầu khi nào?'],
      ['B', 'It starts at seven.', '七時に始まります。', 'しちじにはじまります。', 'Nó bắt đầu lúc bảy giờ.'],
      ['A', 'What time should we meet?', '何時に会いますか。', 'なんじにあいますか。', 'Chúng ta nên gặp lúc mấy giờ?'],
      ['B', 'Let’s meet at six thirty.', '六時半に会いましょう。', 'ろくじはんにあいましょう。', 'Hãy gặp lúc sáu rưỡi.'],
    ]),
    D(['Confirming an appointment', 'Xác nhận cuộc hẹn', '予定を確認する'], ['You confirm a time at a reception desk.', 'Bạn xác nhận giờ hẹn tại quầy lễ tân.', '受付で予定の時間を確認します。'], [
      ['A', 'What time is my appointment?', '私の予約は何時ですか。', 'わたしのよやくはなんじですか。', 'Cuộc hẹn của tôi lúc mấy giờ?'],
      ['B', 'Your appointment is at ten thirty.', '予約は十時半です。', 'よやくはじゅうじはんです。', 'Cuộc hẹn của bạn lúc mười giờ rưỡi.'],
      ['A', 'Is that today?', '今日ですか。', 'きょうですか。', 'Hôm nay phải không?'],
      ['B', 'Yes, please come ten minutes early.', 'はい、十分早く来てください。', 'はい、じゅっぷんはやくきてください。', 'Vâng, hãy đến sớm mười phút.'],
    ]),
  ],
  'ill-take-this': [
    D(['Choosing a drink', 'Chọn đồ uống', '飲み物を選ぶ'], ['You buy a drink at a counter.', 'Bạn mua đồ uống ở quầy.', 'カウンターで飲み物を買います。'], [
      ['A', 'I’ll take this.', 'これをください。', 'これをください。', 'Cho tôi cái này.'],
      ['B', 'This tea?', 'このお茶ですか。', 'このおちゃですか。', 'Trà này phải không?'],
      ['A', 'Yes, please.', 'はい、お願いします。', 'はい、おねがいします。', 'Vâng, làm ơn.'],
      ['B', 'Here you are.', 'どうぞ。', 'どうぞ。', 'Của bạn đây.'],
    ]),
    D(['Ordering at a café', 'Gọi món ở quán cà phê', 'カフェで注文する'], ['You choose an item from a menu.', 'Bạn chọn món từ thực đơn.', 'メニューから注文します。'], [
      ['A', 'I’d like this sandwich.', 'このサンドイッチをください。', 'このさんどいっちをください。', 'Tôi muốn bánh sandwich này.'],
      ['B', 'Would you like a drink too?', '飲み物もいかがですか。', 'のみものもいかがですか。', 'Bạn có muốn uống gì nữa không?'],
      ['A', 'Yes, I’ll take water.', 'はい、お水をください。', 'はい、おみずをください。', 'Vâng, cho tôi nước.'],
      ['B', 'Okay. Please wait a moment.', 'かしこまりました。少々お待ちください。', 'かしこまりました。しょうしょうおまちください。', 'Vâng. Xin vui lòng đợi một chút.'],
    ]),
    D(['Buying tickets', 'Mua vé', '切符を買う'], ['You purchase tickets at a ticket office.', 'Bạn mua vé tại quầy bán vé.', '切符売り場でチケットを買います。'], [
      ['A', 'One ticket to Kyoto, please.', '京都までの切符を一枚ください。', 'きょうとまでのきっぷをいちまいください。', 'Cho tôi một vé đến Kyoto.'],
      ['B', 'One ticket to Kyoto.', '京都まで一枚ですね。', 'きょうとまでいちまいですね。', 'Một vé đến Kyoto phải không?'],
      ['A', 'Yes, I’ll take this one.', 'はい、これをお願いします。', 'はい、これをおねがいします。', 'Vâng, tôi lấy cái này.'],
      ['B', 'Here is your ticket.', 'こちらが切符です。', 'こちらがきっぷです。', 'Đây là vé của bạn.'],
    ]),
  ],
  'how-much': [
    D(['A simple price', 'Giá đơn giản', '簡単な値段'], ['You ask the price of a souvenir.', 'Bạn hỏi giá món quà lưu niệm.', 'お土産の値段を聞きます。'], [
      ['A', 'How much is it?', 'いくらですか。', 'いくらですか。', 'Bao nhiêu tiền?'],
      ['B', 'It is 500 yen.', '五百円です。', 'ごひゃくえんです。', 'Nó là 500 yên.'],
      ['A', 'Okay, thank you.', '分かりました。ありがとうございます。', 'わかりました。ありがとうございます。', 'Được, cảm ơn.'],
      ['B', 'You’re welcome.', 'どういたしまして。', 'どういたしまして。', 'Không có gì.'],
    ]),
    D(['Comparing prices', 'So sánh giá', '値段を比べる'], ['You compare two items in a shop.', 'Bạn so sánh hai món đồ trong cửa hàng.', '店で二つの物を比べます。'], [
      ['A', 'How much is this bag?', 'このかばんはいくらですか。', 'このかばんはいくらですか。', 'Túi này bao nhiêu tiền?'],
      ['B', 'It is two thousand yen.', '二千円です。', 'にせんえんです。', 'Nó là hai nghìn yên.'],
      ['A', 'That is a little expensive.', '少し高いですね。', 'すこしたかいですね。', 'Hơi đắt nhỉ.'],
      ['B', 'This smaller one is cheaper.', 'この小さい方はもっと安いです。', 'このちいさいほうはもっとやすいです。', 'Cái nhỏ hơn này rẻ hơn.'],
    ]),
    D(['Paying at the counter', 'Thanh toán tại quầy', 'レジで支払う'], ['You check payment options before buying.', 'Bạn hỏi cách thanh toán trước khi mua.', '買う前に支払い方法を聞きます。'], [
      ['A', 'How much is the total?', '全部でいくらですか。', 'ぜんぶでいくらですか。', 'Tổng cộng bao nhiêu tiền?'],
      ['B', 'It is one thousand two hundred yen.', '千二百円です。', 'せんにひゃくえんです。', 'Là một nghìn hai trăm yên.'],
      ['A', 'Can I pay by card?', 'カードで払えますか。', 'かーどではらえますか。', 'Tôi trả bằng thẻ được không?'],
      ['B', 'Yes, you can.', 'はい、使えます。', 'はい、つかえます。', 'Vâng, được.'],
    ]),
  ],
  'first-conversation': [
    D(['A complete first chat', 'Cuộc trò chuyện đầu tiên hoàn chỉnh', '初めての短い会話'], ['You meet a classmate for the first time.', 'Bạn gặp bạn học lần đầu.', '初めてクラスメートに会います。'], [
      ['A', 'Hello, I’m Emma.', 'こんにちは、田中です。', 'こんにちは、たなかです。', 'Xin chào, tôi là Emma.'],
      ['B', 'I’m David. Nice to meet you.', '佐藤です。はじめまして。', 'さとうです。はじめまして。', 'Tôi là David. Rất vui được gặp bạn.'],
      ['A', 'Nice to meet you too. Where are you from?', 'こちらこそ。どこから来ましたか。', 'こちらこそ。どこからきましたか。', 'Tôi cũng rất vui được gặp bạn. Bạn đến từ đâu?'],
      ['B', 'I’m from Japan.', '日本から来ました。', 'にほんからきました。', 'Tôi đến từ Nhật Bản.'],
    ]),
    D(['Repairing the conversation', 'Sửa lại cuộc trò chuyện', '聞き返しを入れる'], ['You ask for repetition, then continue.', 'Bạn xin nói lại rồi tiếp tục trò chuyện.', '聞き返してから会話を続けます。'], [
      ['A', 'Hello, I’m Anna. Where are you from?', 'こんにちは、山田です。どこから来ましたか。', 'こんにちは、やまだです。どこからきましたか。', 'Xin chào, tôi là Anna. Bạn đến từ đâu?'],
      ['B', 'I’m from Canada.', 'カナダから来ました。', 'かなだからきました。', 'Tôi đến từ Canada.'],
      ['A', 'Sorry, please say that again.', 'すみません、もう一度お願いします。', 'すみません、もういちどおねがいします。', 'Xin lỗi, làm ơn nói lại.'],
      ['B', 'Canada. I’m learning Japanese now.', 'カナダです。今、日本語を勉強しています。', 'かなだです。いま、にほんごをべんきょうしています。', 'Canada. Bây giờ tôi đang học tiếng Nhật.'],
    ]),
    D(['Meeting at a café', 'Gặp ở quán cà phê', 'カフェで会う'], ['You combine greeting, help, and a polite closing.', 'Bạn kết hợp chào hỏi, giúp đỡ và lời kết lịch sự.', 'あいさつ、助け、別れをつなげます。'], [
      ['A', 'Hello, are you Sarah?', 'こんにちは。高橋さんですか。', 'こんにちは。たかはしさんですか。', 'Xin chào, bạn là Sarah phải không?'],
      ['B', 'Yes, I am. Nice to meet you.', 'はい、そうです。はじめまして。', 'はい、そうです。はじめまして。', 'Vâng, đúng vậy. Rất vui được gặp bạn.'],
      ['A', 'Nice to meet you too. I’m John. Can you speak slowly? I’m learning Japanese.', 'こちらこそ。鈴木です。ゆっくり話してください。日本語を勉強しています。', 'こちらこそ。すずきです。ゆっくりはなしてください。にほんごをべんきょうしています。', 'Tôi cũng rất vui được gặp bạn. Tôi là John. Bạn có thể nói chậm không? Tôi đang học tiếng Nhật.'],
      ['B', 'Of course. Let’s practice together. See you next time.', 'もちろんです。一緒に練習しましょう。また会いましょう。', 'もちろんです。いっしょにれんしゅうしましょう。またあいましょう。', 'Tất nhiên. Chúng ta cùng luyện nhé. Hẹn gặp lại lần sau.'],
    ]),
  ],
};
