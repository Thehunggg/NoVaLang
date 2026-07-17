/**
 * Daily Life Communication curriculum blueprint (source of truth).
 * Skeleton only — no real exercise content / questions / answers.
 */
import { buildReadyModuleOne } from '../content/daily-life/module-1/helpers.mjs';

const NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];

function t(map) {
  for (const code of NATIVE_CODES) {
    if (!map[code] || String(map[code]).trim() === "") {
      throw new Error(`Missing translation for ${code}: ${JSON.stringify(map)}`);
    }
  }
  return map;
}

function L(en, vi, ja, ko, zh) {
  return t({ en, vi, ja, ko, zh });
}

function autoLesson(en, vi, ja, ko, zh) {
  return {
    titleByNative: L(en, vi, ja, ko, zh),
    goalByNative: L(
      `Learn to use "${en}" naturally in daily conversation.`,
      `Học cách dùng "${vi}" một cách tự nhiên trong giao tiếp hằng ngày.`,
      `日常会話で「${ja}」を自然に使えるようになります。`,
      `일상 대화에서 "${ko}"를 자연스럽게 사용합니다.`,
      `在日常交流中自然使用“${zh}”。`,
    ),
    situationByNative: L(
      `A real-life moment where you need "${en}".`,
      `Tình huống thật khi bạn cần dùng "${vi}".`,
      `「${ja}」が必要な実生活の場面。`,
      `"${ko}"가 필요한 실제 상황.`,
      `需要用到“${zh}”的真实场景。`,
    ),
    canSayByNative: L(
      `After this lesson, you can handle "${en}" in simple conversations.`,
      `Sau bài này, bạn có thể dùng "${vi}" trong hội thoại đơn giản.`,
      `このレッスンの後、「${ja}」を簡単な会話で使えます。`,
      `이 레슨 후 간단한 대화에서 "${ko}"를 사용할 수 있습니다.`,
      `学完本课后，你可以在简单对话中使用“${zh}”。`,
    ),
  };
}

function unit(en, vi, ja, ko, zh, lessons) {
  return { titleByNative: L(en, vi, ja, ko, zh), lessons };
}

export const DAILY_LIFE_COURSE_META = {
  courseId: "daily_life",
  type: "communication",
  status: "blueprint",
  playable: false,
  unlockRequirement: "core_foundation_completed",
  titleByNative: L(
    "Daily Life Communication",
    "Giao tiếp hằng ngày",
    "日常会話",
    "일상 회화",
    "日常交流",
  ),
  goalByNative: L(
    "Learn everyday communication through real situations — not disconnected quizzes.",
    "Học giao tiếp đời sống hằng ngày theo tình huống thật. Không học quiz rời rạc.",
    "バラバラのクイズではなく、実生活の場面で日常会話を学びます。",
    "단편 퀴즈가 아니라 실제 상황으로 일상 회화를 배웁니다.",
    "通过真实情境学习日常交流，而不是零散测验。",
  ),
};

export const LEARN_SECTION_PLACEHOLDER = {
  vocabularyPhraseCards: { status: "placeholder" },
  grammarSentencePatterns: { status: "placeholder" },
  miniDialogue: { status: "placeholder" },
  cultureNuanceNote: { status: "placeholder" },
  contextualVariations: { status: "placeholder" },
  communicationStrategy: { status: "placeholder" },
};

export const PRACTICE_STAGE_DEFS = [
  {
    key: "warmup",
    labelByNative: L("Warm-up", "Khởi động", "ウォームアップ", "워밍업", "热身"),
    exerciseOrders: [1, 2, 3, 4, 5],
    goalByNative: L(
      "Recognize phrases, listen basically, understand meaning, and use simple patterns.",
      "Nhận diện từ/cụm câu, nghe cơ bản, hiểu nghĩa, dùng mẫu câu đơn giản.",
      "フレーズを認識し、基本の聞き取りと意味理解、簡単な文型を使います。",
      "표현을 인식하고 기본 듣기·의미 이해·간단한 문형을 사용합니다.",
      "识别短语，进行基础听力与意义理解，并使用简单句型。",
    ),
  },
  {
    key: "real_world",
    labelByNative: L(
      "Real-world Practice",
      "Thực chiến",
      "実践練習",
      "실전 연습",
      "实战练习",
    ),
    exerciseOrders: [6, 7, 8, 9, 10],
    goalByNative: L(
      "Use sentences in dialogue, choose natural responses, advanced listening, AI Q&A, and checkpoint.",
      "Dùng câu trong hội thoại, chọn phản hồi tự nhiên, nghe nâng cao, AI Q&A và checkpoint.",
      "会話で文を使い、自然な返事を選び、高度な聞き取り・AI質問・チェックを行います。",
      "대화에서 문장을 쓰고 자연스러운 대답을 고르며 심화 듣기·AI Q&A·체크포인트를 합니다.",
      "在对话中用句，选择自然回应，完成进阶听力、AI问答与检查点。",
    ),
  },
];

export const EXERCISE_PLACEHOLDER_DEFS = [
  {
    order: 1,
    type: "matchPairs",
    plan: "free",
    stage: "warmup",
    titleByNative: L(
      "Match phrase and meaning",
      "Nối cụm câu với nghĩa",
      "フレーズと意味をつなげる",
      "표현과 뜻 연결하기",
      "匹配短语和意思",
    ),
  },
  {
    order: 2,
    type: "listenAndChoose",
    plan: "free",
    stage: "warmup",
    titleByNative: L(
      "Listen and choose",
      "Nghe và chọn",
      "聞いて選ぶ",
      "듣고 고르기",
      "听音选择",
    ),
  },
  {
    order: 3,
    type: "multipleChoiceMeaning",
    plan: "free",
    stage: "warmup",
    titleByNative: L(
      "Choose the correct meaning",
      "Chọn nghĩa đúng",
      "正しい意味を選ぶ",
      "맞는 뜻 고르기",
      "选择正确意思",
    ),
  },
  {
    order: 4,
    type: "fillBlank",
    plan: "free",
    stage: "warmup",
    titleByNative: L(
      "Fill the missing word",
      "Điền từ còn thiếu",
      "空欄を埋める",
      "빈칸 채우기",
      "填空",
    ),
  },
  {
    order: 5,
    type: "arrangeWords",
    plan: "free",
    stage: "warmup",
    titleByNative: L(
      "Arrange the sentence",
      "Sắp xếp câu",
      "文を並べる",
      "문장 배열하기",
      "排列句子",
    ),
  },
  {
    order: 6,
    type: "dialogueCompletion",
    plan: "free",
    stage: "real_world",
    titleByNative: L(
      "Complete the dialogue",
      "Hoàn thành hội thoại",
      "会話を完成させる",
      "대화 완성하기",
      "完成对话",
    ),
  },
  {
    order: 7,
    type: "naturalResponseChoice",
    plan: "free",
    stage: "real_world",
    titleByNative: L(
      "Choose a natural response",
      "Chọn phản hồi tự nhiên",
      "自然な返事を選ぶ",
      "자연스러운 대답 고르기",
      "选择自然回应",
    ),
  },
  {
    order: 8,
    type: "plusListeningVocabularyChallenge",
    plan: "plus",
    stage: "real_world",
    titleByNative: L(
      "Plus · Listening challenge",
      "Plus · Thử thách nghe",
      "Plus・リスニングチャレンジ",
      "Plus · 듣기 챌린지",
      "Plus · 听力挑战",
    ),
  },
  {
    order: 9,
    type: "controlledAiQa",
    plan: "plus",
    stage: "real_world",
    titleByNative: L(
      "Plus · AI Q&A practice",
      "Plus · Luyện hỏi đáp AI",
      "Plus・AI質問練習",
      "Plus · AI 질의응답 연습",
      "Plus · AI问答练习",
    ),
  },
  {
    order: 10,
    type: "reviewCheckpoint",
    plan: "plus",
    stage: "real_world",
    titleByNative: L(
      "Plus · Review checkpoint",
      "Plus · Kiểm tra tổng hợp",
      "Plus・復習チェック",
      "Plus · 복습 체크",
      "Plus · 复习检查",
    ),
  },
];

/** @type {Array<object>} */
export const DAILY_LIFE_MODULES = [
  {
    moduleId: "daily_life_m01_basic_social_survival",
    order: 1,
    levelRange: "A0–A1",
    levelCode: "A0",
    placementTag: "daily_life_basic",
    titleByNative: L(
      "First Conversations",
      "Những cuộc trò chuyện đầu tiên",
      "はじめての会話",
      "기본 사회생활 회화",
      "基础社交生存会话",
    ),
    goalByNative: L(
      "Learn greetings, thanks, apologies, asking again, and basic survival communication.",
      "Chào hỏi, cảm ơn, xin lỗi, hỏi lại khi không hiểu và giảm sợ khi giao tiếp lần đầu.",
      "あいさつ・感謝・謝罪・聞き返しなど、基本の会話サバイバルを学びます。",
      "인사, 감사, 사과, 다시 묻기 등 기본 생존 회화를 배웁니다.",
      "学习打招呼、感谢、道歉、请对方再说一遍等基础社交生存会话。",
    ),
    units: [
      unit("Greetings and names", "Chào và nói tên", "あいさつと名前", "인사와 이름", "问候与姓名", [
        autoLesson("Hello, I’m…", "Xin chào, tôi là…", "こんにちは、〜です", "안녕하세요, 저는…", "你好，我是…"),
        autoLesson("What’s your name?", "Tên bạn là gì?", "お名前は？", "이름이 뭐예요?", "你叫什么名字？"),
        autoLesson("Nice to meet you", "Rất vui được gặp bạn", "はじめまして", "만나서 반가워요", "很高兴认识你"),
      ]),
      unit("Where you are from", "Nói mình đến từ đâu", "出身を伝える", "어디에서 왔는지 말하기", "说明来自哪里", [
        autoLesson("I come from…", "Tôi đến từ…", "〜から来ました", "…에서 왔어요", "我来自…"),
        autoLesson("Where are you from?", "Bạn đến từ đâu?", "どこから来ましたか", "어디에서 왔어요?", "你来自哪里？"),
        autoLesson("I am… (nationality)", "Tôi là người…", "〜人です", "… 사람입니다", "我是…人"),
      ]),
      unit("Talking about language learning", "Nói về việc học ngôn ngữ", "言語学習について話す", "언어 학습에 대해 말하기", "谈论学习语言", [
        autoLesson("I’m learning…", "Tôi đang học…", "〜を勉強しています", "…를 공부하고 있어요", "我在学…"),
        autoLesson("I understand / don’t understand", "Tôi hiểu / không hiểu", "分かります・分かりません", "이해해요 / 이해 못해요", "我明白 / 不明白"),
        autoLesson("Can you say that again?", "Bạn nói lại được không?", "もう一度お願いします", "다시 말해 주시겠어요?", "请再说一遍好吗？"),
      ]),
      unit("Simple check-ins", "Hỏi thăm đơn giản", "簡単な様子の聞き方", "간단한 안부 묻기", "简单问候近况", [
        autoLesson("How are you?", "Bạn có khỏe không?", "お元気ですか", "잘 지내세요?", "你好吗？"),
        autoLesson("I’m fine, thank you", "Tôi khỏe, cảm ơn", "元気です。ありがとう", "잘 지내요, 고마워요", "我很好，谢谢"),
        autoLesson("And you?", "Còn bạn thì sao?", "あなたは？", "당신은요?", "你呢？"),
      ]),
      unit("When you do not understand", "Khi không hiểu", "分からないとき", "이해하지 못할 때", "听不懂时", [
        autoLesson("Sorry, I don’t understand", "Xin lỗi, tôi không hiểu", "すみません、分かりません", "죄송하지만 이해하지 못해요", "对不起，我不明白"),
        autoLesson("Please speak slowly", "Làm ơn nói chậm lại", "ゆっくり話してください", "천천히 말해 주세요", "请说慢一点"),
        autoLesson("Can you write it for me?", "Viết giúp tôi được không?", "書いてくれますか", "써 주실 수 있나요?", "可以帮我写下来吗？"),
      ]),
      unit("Thanks, sorry, and politeness", "Cảm ơn, xin lỗi, lịch sự", "感謝・謝罪・丁寧さ", "감사, 사과, 공손함", "感谢、道歉与礼貌", [
        autoLesson("Thanks and reply", "Cảm ơn và đáp lại", "ありがとうと返事", "감사와 응답", "感谢与回应"),
        autoLesson("Sorry / It’s okay", "Xin lỗi / Không sao", "すみません・大丈夫", "미안해요 / 괜찮아요", "对不起 / 没关系"),
        autoLesson("Please help me", "Làm ơn giúp tôi", "手伝ってください", "도와주세요", "请帮帮我"),
      ]),
      unit("Asking simple information", "Hỏi thông tin đơn giản", "簡単な情報を聞く", "간단한 정보 묻기", "询问简单信息", [
        autoLesson("What is this?", "Đây là gì?", "これは何ですか", "이것은 뭐예요?", "这是什么？"),
        autoLesson("Where is it?", "Ở đâu?", "どこですか", "어디예요?", "在哪里？"),
        autoLesson("When / what time?", "Khi nào / mấy giờ?", "何時ですか", "언제 / 몇 시예요?", "什么时候 / 几点？"),
      ]),
      unit("First daily-life conversation", "Hội thoại đời sống đầu tiên", "初めての会話", "첫 일상 대화", "第一次日常对话", [
        autoLesson("I’ll take this", "Cho tôi cái này", "これをください", "이것 주세요", "我要这个"),
        autoLesson("How much is it?", "Bao nhiêu tiền?", "いくらですか", "얼마예요?", "多少钱？"),
        autoLesson("First conversation", "Cuộc trò chuyện đầu tiên", "初めての会話", "첫 대화", "第一次对话"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m02_self_introduction_identity",
    order: 2,
    levelRange: "A0–A1",
    levelCode: "A0",
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Self Introduction & Identity",
      "Tự giới thiệu & thông tin cá nhân",
      "自己紹介と基本情報",
      "자기소개와 기본 정보",
      "自我介绍与个人信息",
    ),
    goalByNative: L(
      "Introduce your name, age, country, job/status, hobbies, and answer simple questions about yourself.",
      "Tự giới thiệu tên, tuổi, quốc tịch, nghề nghiệp, sở thích và trả lời câu hỏi đơn giản về bản thân.",
      "名前・年齢・国籍・職業・趣味などを自己紹介し、簡単な質問に答えます。",
      "이름, 나이, 국적, 직업, 취미를 소개하고 간단한 질문에 답합니다.",
      "介绍姓名、年龄、国籍、职业与爱好，并回答关于自己的简单问题。",
    ),
    units: [
      unit("Name", "Tên", "名前", "이름", "姓名", [
        autoLesson("My name is...", "Tên tôi là...", "私の名前は…です", "제 이름은…입니다", "我叫…"),
        autoLesson("What's your name?", "Bạn tên gì?", "お名前は？", "이름이 뭐예요?", "你叫什么名字？"),
        autoLesson("Name conversation", "Hội thoại về tên", "名前の会話", "이름 대화", "姓名对话"),
      ]),
      unit("Country & Nationality", "Quốc gia & quốc tịch", "国と国籍", "국가와 국적", "国家与国籍", [
        autoLesson("I am from...", "Tôi đến từ...", "〜から来ました", "…에서 왔어요", "我来自…"),
        autoLesson("I am Vietnamese / Japanese / Korean...", "Tôi là người Việt / Nhật / Hàn...", "ベトナム人／日本人／韓国人です", "베트남/일본/한국 사람입니다", "我是越南人 / 日本人 / 韩国人…"),
        autoLesson("Where are you from?", "Bạn đến từ đâu?", "どちらから来ましたか？", "어디에서 왔어요?", "你来自哪里？"),
      ]),
      unit("Age & Birthday", "Tuổi & sinh nhật", "年齢と誕生日", "나이와 생일", "年龄与生日", [
        autoLesson("I am ... years old", "Tôi ... tuổi", "〜歳です", "…살이에요", "我…岁"),
        autoLesson("My birthday is...", "Sinh nhật tôi là...", "誕生日は…です", "제 생일은…이에요", "我的生日是…"),
        autoLesson("Asking age politely", "Hỏi tuổi lịch sự", "丁寧に年齢を聞く", "공손하게 나이 묻기", "礼貌地询问年龄"),
      ]),
      unit("Languages", "Ngôn ngữ", "言語", "언어", "语言", [
        autoLesson("I speak...", "Tôi nói...", "〜を話します", "…를 해요", "我说…"),
        autoLesson("I am learning...", "Tôi đang học...", "〜を勉強しています", "…를 배우고 있어요", "我在学…"),
        autoLesson("My language level", "Trình độ ngôn ngữ của tôi", "自分の語学レベル", "내 언어 수준", "我的语言水平"),
      ]),
      unit("Job / Student Status", "Nghề nghiệp / Sinh viên", "仕事・学生", "직업 / 학생", "工作 / 学生身份", [
        autoLesson("I am a student", "Tôi là sinh viên", "学生です", "학생이에요", "我是学生"),
        autoLesson("I work at...", "Tôi làm việc tại...", "〜で働いています", "…에서 일해요", "我在…工作"),
        autoLesson("What do you do?", "Bạn làm nghề gì?", "お仕事は何ですか？", "무슨 일 하세요?", "你做什么工作？"),
      ]),
      unit("Hobbies", "Sở thích", "趣味", "취미", "爱好", [
        autoLesson("I like...", "Tôi thích...", "〜が好きです", "…를 좋아해요", "我喜欢…"),
        autoLesson("My hobby is...", "Sở thích của tôi là...", "趣味は…です", "제 취미는…이에요", "我的爱好是…"),
        autoLesson("Talking about hobbies", "Nói về sở thích", "趣味の話", "취미 이야기", "谈论爱好"),
      ]),
      unit("Personality", "Tính cách", "性格", "성격", "性格", [
        autoLesson("I am friendly / quiet", "Tôi thân thiện / trầm tính", "社交的／静かです", "친근해요 / 조용해요", "我很友好 / 安静"),
        autoLesson("I like meeting people", "Tôi thích gặp gỡ mọi người", "人と会うのが好きです", "사람 만나는 걸 좋아해요", "我喜欢认识人"),
        autoLesson("Describing yourself simply", "Mô tả bản thân đơn giản", "自分を簡単に説明する", "나를 간단히 설명하기", "简单描述自己"),
      ]),
      unit("Full Self Introduction", "Tự giới thiệu đầy đủ", "自己紹介まとめ", "전체 자기소개", "完整自我介绍", [
        autoLesson("Short self-introduction", "Tự giới thiệu ngắn", "短い自己紹介", "짧은 자기소개", "简短自我介绍"),
        autoLesson("Self-introduction with questions", "Tự giới thiệu kèm câu hỏi", "質問つき自己紹介", "질문이 있는 자기소개", "带提问的自我介绍"),
        autoLesson("Self-introduction checkpoint", "Checkpoint tự giới thiệu", "自己紹介チェック", "자기소개 체크포인트", "自我介绍检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m03_daily_routine_time",
    order: 3,
    levelRange: "A1",
    levelCode: "A1",
    placementTag: "daily_life_routine",
    titleByNative: L(
      "Daily Routine & Time",
      "Lịch trình hằng ngày & thời gian",
      "毎日の生活と時間",
      "일상 루틴과 시간",
      "日常作息与时间",
    ),
    goalByNative: L(
      "Talk about time, routines, habits, frequency, and a normal day.",
      "Nói giờ giấc, thói quen, tần suất và kể một ngày bình thường.",
      "時間・ルーチン・習慣・頻度、そして普通の一日について話します。",
      "시간, 루틴, 습관, 빈도, 평범한 하루에 대해 말합니다.",
      "谈论时间、作息、习惯、频率以及平常的一天。",
    ),
    units: [
      unit("Time Basics", "Giờ giấc cơ bản", "時間の基礎", "시간 기초", "时间基础", [
        autoLesson("Numbers and time", "Số và giờ", "数字と時間", "숫자와 시간", "数字与时间"),
        autoLesson("What time is it?", "Mấy giờ rồi?", "今何時ですか？", "지금 몇 시예요?", "现在几点？"),
        autoLesson("Time mini dialogue", "Hội thoại ngắn về giờ", "時間のミニ会話", "시간 짧은 대화", "时间小对话"),
      ]),
      unit("Morning Routine", "Thói quen buổi sáng", "朝のルーチン", "아침 루틴", "早晨作息", [
        autoLesson("I wake up at...", "Tôi thức dậy lúc...", "〜に起きます", "…에 일어나요", "我在…起床"),
        autoLesson("I brush my teeth / get dressed", "Tôi đánh răng / mặc đồ", "歯を磨く／服を着る", "양치해요 / 옷을 입어요", "我刷牙 / 穿衣服"),
        autoLesson("Morning routine dialogue", "Hội thoại thói quen sáng", "朝のルーチン会話", "아침 루틴 대화", "早晨作息对话"),
      ]),
      unit("Breakfast", "Bữa sáng", "朝食", "아침 식사", "早餐", [
        autoLesson("I eat breakfast", "Tôi ăn sáng", "朝ごはんを食べます", "아침을 먹어요", "我吃早餐"),
        autoLesson("I drink coffee / tea", "Tôi uống cà phê / trà", "コーヒー／お茶を飲みます", "커피/차를 마셔요", "我喝咖啡 / 茶"),
        autoLesson("Talking about breakfast", "Nói về bữa sáng", "朝食の話", "아침 식사 이야기", "谈论早餐"),
      ]),
      unit("Going to School / Work", "Đi học / Đi làm", "通学・通勤", "등교 / 출근", "上学 / 上班", [
        autoLesson("I go to school / work", "Tôi đi học / đi làm", "学校／仕事に行きます", "학교/직장에 가요", "我去学校 / 上班"),
        autoLesson("I take the train / bus", "Tôi đi tàu / xe buýt", "電車／バスに乗ります", "지하철/버스를 타요", "我坐火车 / 公交"),
        autoLesson("Morning commute dialogue", "Hội thoại đi làm/học buổi sáng", "朝の通勤会話", "아침 통근 대화", "晨间通勤对话"),
      ]),
      unit("Lunch Break", "Giờ nghỉ trưa", "昼休み", "점심시간", "午休", [
        autoLesson("I have lunch at...", "Tôi ăn trưa lúc...", "〜に昼ごはんを食べます", "…에 점심을 먹어요", "我在…吃午饭"),
        autoLesson("I eat with friends", "Tôi ăn với bạn", "友達と食べます", "친구와 먹어요", "我和朋友一起吃"),
        autoLesson("Lunch break conversation", "Hội thoại giờ nghỉ trưa", "昼休みの会話", "점심시간 대화", "午休对话"),
      ]),
      unit("Evening Routine", "Thói quen buổi tối", "夜のルーチン", "저녁 루틴", "晚间作息", [
        autoLesson("I go home", "Tôi về nhà", "家に帰ります", "집에 가요", "我回家"),
        autoLesson("I cook / study / relax", "Tôi nấu ăn / học / thư giãn", "料理／勉強／リラックスします", "요리/공부/휴식을 해요", "我做饭 / 学习 / 放松"),
        autoLesson("Evening routine dialogue", "Hội thoại thói quen tối", "夜のルーチン会話", "저녁 루틴 대화", "晚间作息对话"),
      ]),
      unit("Frequency", "Tần suất", "頻度", "빈도", "频率", [
        autoLesson("every day / sometimes / never", "mỗi ngày / đôi khi / không bao giờ", "毎日／ときどき／全然", "매일 / 가끔 / 전혀", "每天 / 有时 / 从不"),
        autoLesson("I usually...", "Tôi thường...", "普通は〜します", "보통 …해요", "我通常…"),
        autoLesson("Talking about habits", "Nói về thói quen", "習慣の話", "습관 이야기", "谈论习惯"),
      ]),
      unit("My Normal Day", "Một ngày bình thường", "普通の一日", "평범한 하루", "平常的一天", [
        autoLesson("My day in order", "Một ngày theo thứ tự", "一日の流れ", "하루 순서", "按顺序说一天"),
        autoLesson("Asking about someone's day", "Hỏi về ngày của ai đó", "相手の一日を聞く", "상대의 하루 묻기", "询问对方的一天"),
        autoLesson("Daily routine checkpoint", "Checkpoint lịch trình hằng ngày", "日常ルーチンチェック", "일상 루틴 체크포인트", "日常作息检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m04_home_family",
    order: 4,
    levelRange: "A1",
    levelCode: "A1",
    placementTag: "daily_life_routine",
    titleByNative: L(
      "Home & Family",
      "Nhà cửa & gia đình",
      "家と家族",
      "집과 가족",
      "家庭与家人",
    ),
    goalByNative: L(
      "Talk about family, home, rooms, objects, chores, and inviting someone home.",
      "Nói về gia đình, nhà cửa, phòng, đồ vật, việc nhà và mời người khác đến nhà.",
      "家族・家・部屋・物・家事、そして家への招待について話します。",
      "가족, 집, 방, 물건, 집안일, 집 초대에 대해 말합니다.",
      "谈论家人、住房、房间、物品、家务并邀请他人到家。",
    ),
    units: [
      unit("Family Members", "Thành viên gia đình", "家族の呼び方", "가족 구성원", "家庭成员", [
        autoLesson("mother / father / parents", "mẹ / bố / bố mẹ", "母／父／両親", "어머니 / 아버지 / 부모님", "母亲 / 父亲 / 父母"),
        autoLesson("brother / sister / grandparents", "anh/em trai / chị/em gái / ông bà", "兄弟／姉妹／祖父母", "형제 / 자매 / 조부모", "兄弟 / 姐妹 / 祖父母"),
        autoLesson("My family dialogue", "Hội thoại về gia đình", "家族の会話", "가족 대화", "家庭对话"),
      ]),
      unit("My Home", "Nhà của tôi", "私の家", "내 집", "我的家", [
        autoLesson("I live in...", "Tôi sống ở...", "〜に住んでいます", "…에 살아요", "我住在…"),
        autoLesson("apartment / house / room", "căn hộ / nhà / phòng", "アパート／家／部屋", "아파트 / 집 / 방", "公寓 / 房子 / 房间"),
        autoLesson("Describing home", "Mô tả nhà", "家の説明", "집 설명하기", "描述住所"),
      ]),
      unit("Rooms", "Các phòng", "部屋", "방", "房间", [
        autoLesson("kitchen / bedroom / bathroom", "bếp / phòng ngủ / phòng tắm", "台所／寝室／浴室", "부엌 / 침실 / 욕실", "厨房 / 卧室 / 浴室"),
        autoLesson("living room / study room", "phòng khách / phòng học", "居間／勉強部屋", "거실 / 공부방", "客厅 / 书房"),
        autoLesson("Where is it at home?", "Nó ở đâu trong nhà?", "家のどこにありますか？", "집에 어디에 있어요?", "它在家里哪里？"),
      ]),
      unit("Furniture & Items", "Nội thất & đồ vật", "家具と物", "가구와 물건", "家具与物品", [
        autoLesson("table / chair / bed", "bàn / ghế / giường", "テーブル／椅子／ベッド", "테이블 / 의자 / 침대", "桌子 / 椅子 / 床"),
        autoLesson("phone / computer / bag", "điện thoại / máy tính / túi", "電話／パソコン／かばん", "전화 / 컴퓨터 / 가방", "手机 / 电脑 / 包"),
        autoLesson("Describing objects", "Mô tả đồ vật", "物の説明", "물건 설명하기", "描述物品"),
      ]),
      unit("Chores", "Việc nhà", "家事", "집안일", "家务", [
        autoLesson("clean / wash / cook", "dọn / giặt / nấu", "掃除／洗濯／料理", "청소 / 세탁 / 요리", "打扫 / 洗衣 / 做饭"),
        autoLesson("I have to...", "Tôi phải...", "〜しなければなりません", "…해야 해요", "我必须…"),
        autoLesson("Housework conversation", "Hội thoại việc nhà", "家事の会話", "집안일 대화", "家务对话"),
      ]),
      unit("Family Conversation", "Hội thoại gia đình", "家族との会話", "가족 대화", "家人对话", [
        autoLesson("Talking with family", "Nói chuyện với gia đình", "家族と話す", "가족과 이야기하기", "与家人交谈"),
        autoLesson("Asking for help at home", "Xin giúp ở nhà", "家で助けを頼む", "집에서 도움 요청하기", "在家求助"),
        autoLesson("Family mini dialogue", "Hội thoại gia đình ngắn", "家族のミニ会話", "가족 짧은 대화", "家庭小对话"),
      ]),
      unit("Inviting Someone Home", "Mời đến nhà", "家に招く", "집에 초대하기", "邀请到家", [
        autoLesson("Come to my house", "Đến nhà tôi nhé", "うちに来てください", "우리 집에 와요", "来我家吧"),
        autoLesson("Would you like to...?", "Bạn có muốn... không?", "〜しませんか？", "…하실래요?", "你想…吗？"),
        autoLesson("Invitation dialogue", "Hội thoại mời", "招待の会話", "초대 대화", "邀请对话"),
      ]),
      unit("Family Life Checkpoint", "Checkpoint đời sống gia đình", "家族生活チェック", "가족 생활 체크포인트", "家庭生活检查点", [
        autoLesson("Describe your family", "Mô tả gia đình bạn", "家族を説明する", "가족을 설명하기", "描述你的家人"),
        autoLesson("Describe your home", "Mô tả nhà bạn", "家を説明する", "집을 설명하기", "描述你的家"),
        autoLesson("Home & family checkpoint", "Checkpoint nhà & gia đình", "家と家族チェック", "집과 가족 체크포인트", "家庭与家人检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m05_food_eating_out",
    order: 5,
    levelRange: "A1–A2",
    levelCode: "A1",
    placementTag: "daily_life_situation",
    titleByNative: L(
      "Food & Eating Out",
      "Ăn uống & đi ăn ngoài",
      "食事と外食",
      "음식과 외식",
      "食物与外出就餐",
    ),
    goalByNative: L(
      "Talk about food, drinks, ordering, asking about food, prices, and payment.",
      "Nói về đồ ăn, đồ uống, gọi món, hỏi món, hỏi giá và thanh toán.",
      "食べ物・飲み物・注文・料理の質問・値段・支払いについて話します。",
      "음식, 음료, 주문, 메뉴 질문, 가격, 계산에 대해 말합니다.",
      "谈论食物、饮料、点餐、询问菜品、价格与付款。",
    ),
    units: [
      unit("Common Foods", "Đồ ăn thường gặp", "よくある食べ物", "흔한 음식", "常见食物", [
        autoLesson("rice / bread / noodles", "cơm / bánh mì / mì", "ごはん／パン／麺", "밥 / 빵 / 면", "米饭 / 面包 / 面条"),
        autoLesson("meat / fish / vegetables", "thịt / cá / rau", "肉／魚／野菜", "고기 / 생선 / 채소", "肉 / 鱼 / 蔬菜"),
        autoLesson("Talking about food", "Nói về đồ ăn", "食べ物の話", "음식 이야기", "谈论食物"),
      ]),
      unit("Drinks", "Đồ uống", "飲み物", "음료", "饮料", [
        autoLesson("water / coffee / tea", "nước / cà phê / trà", "水／コーヒー／お茶", "물 / 커피 / 차", "水 / 咖啡 / 茶"),
        autoLesson("juice / milk / soda", "nước ép / sữa / nước ngọt", "ジュース／牛乳／ソーダ", "주스 / 우유 / 탄산음료", "果汁 / 牛奶 / 汽水"),
        autoLesson("Ordering drinks", "Gọi đồ uống", "飲み物を注文する", "음료 주문하기", "点饮料"),
      ]),
      unit("Cafe Phrases", "Cụm câu quán cà phê", "カフェのフレーズ", "카페 표현", "咖啡店用语", [
        autoLesson("I'd like coffee", "Tôi muốn cà phê", "コーヒーをお願いします", "커피 주세요", "我想要咖啡"),
        autoLesson("hot / iced / small / large", "nóng / đá / nhỏ / lớn", "ホット／アイス／S／L", "따뜻한 / 아이스 / 작은 / 큰", "热 / 冰 / 小 / 大"),
        autoLesson("Cafe dialogue", "Hội thoại quán cà phê", "カフェの会話", "카페 대화", "咖啡店对话"),
      ]),
      unit("Restaurant Phrases", "Cụm câu nhà hàng", "レストランのフレーズ", "식당 표현", "餐厅用语", [
        autoLesson("table for one/two", "bàn một/hai người", "一人／二人席", "1인/2인석", "一人 / 二人桌"),
        autoLesson("menu / order / waiter", "thực đơn / gọi món / phục vụ", "メニュー／注文／店員", "메뉴 / 주문 / 직원", "菜单 / 点餐 / 服务员"),
        autoLesson("Restaurant arrival dialogue", "Hội thoại khi đến nhà hàng", "来店の会話", "식당 도착 대화", "到店对话"),
      ]),
      unit("Ordering Food", "Gọi món", "料理を注文する", "음식 주문", "点餐", [
        autoLesson("I'd like...", "Tôi muốn...", "〜をお願いします", "… 주세요", "我想要…"),
        autoLesson("Can I have...?", "Cho tôi ... được không?", "〜をいただけますか？", "… 주시겠어요?", "可以给我…吗？"),
        autoLesson("Ordering food dialogue", "Hội thoại gọi món", "注文の会話", "주문 대화", "点餐对话"),
      ]),
      unit("Asking About Food", "Hỏi về món ăn", "料理について聞く", "음식 묻기", "询问菜品", [
        autoLesson("What is this?", "Đây là gì?", "これは何ですか？", "이게 뭐예요?", "这是什么？"),
        autoLesson("Is it spicy?", "Có cay không?", "辛いですか？", "매워요?", "辣吗？"),
        autoLesson("Food question dialogue", "Hội thoại hỏi món", "料理質問の会話", "음식 질문 대화", "询问菜品对话"),
      ]),
      unit("Paying the Bill", "Thanh toán", "お会計", "계산", "结账", [
        autoLesson("The bill, please", "Tính tiền giúp tôi", "お会計をお願いします", "계산해 주세요", "请结账"),
        autoLesson("cash / card / receipt", "tiền mặt / thẻ / hóa đơn", "現金／カード／レシート", "현금 / 카드 / 영수증", "现金 / 卡 / 收据"),
        autoLesson("Payment dialogue", "Hội thoại thanh toán", "支払いの会話", "결제 대화", "付款对话"),
      ]),
      unit("Food Conversation Checkpoint", "Checkpoint ăn uống", "食事会話チェック", "음식 대화 체크포인트", "餐饮对话检查点", [
        autoLesson("Cafe conversation", "Hội thoại quán cà phê", "カフェ会話", "카페 대화", "咖啡店会话"),
        autoLesson("Restaurant conversation", "Hội thoại nhà hàng", "レストラン会話", "식당 대화", "餐厅会话"),
        autoLesson("Food & eating out checkpoint", "Checkpoint ăn uống & đi ăn ngoài", "食事と外食チェック", "음식과 외식 체크포인트", "食物与外出就餐检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m06_shopping_money",
    order: 6,
    levelRange: "A1–A2",
    levelCode: "A1",
    placementTag: "daily_life_situation",
    titleByNative: L(
      "Shopping & Money",
      "Mua sắm & tiền bạc",
      "買い物とお金",
      "쇼핑과 돈",
      "购物与金钱",
    ),
    goalByNative: L(
      "Buy things, ask about price, size, quantity, pay, and handle simple returns/problems.",
      "Mua đồ ở cửa hàng, hỏi giá, kích cỡ, số lượng, thanh toán và xử lý đổi trả đơn giản.",
      "買い物・値段・サイズ・数量・支払い、簡単な返品やトラブル対応を学びます。",
      "물건 사기, 가격·사이즈·수량 묻기, 결제, 간단한 반품/문제를 처리합니다.",
      "购物、询问价格/尺码/数量、付款，并处理简单退换与问题。",
    ),
    units: [
      unit("Convenience Store", "Cửa hàng tiện lợi", "コンビニ", "편의점", "便利店", [
        autoLesson("Common store items", "Đồ thường mua ở cửa hàng", "よく買うもの", "자주 사는 물건", "常见店内商品"),
        autoLesson("I want this", "Tôi muốn cái này", "これが欲しいです", "이거 원해요", "我要这个"),
        autoLesson("Convenience store dialogue", "Hội thoại cửa hàng tiện lợi", "コンビニの会話", "편의점 대화", "便利店对话"),
      ]),
      unit("Supermarket", "Siêu thị", "スーパー", "슈퍼마켓", "超市", [
        autoLesson("fruits / vegetables / meat", "trái cây / rau / thịt", "果物／野菜／肉", "과일 / 채소 / 고기", "水果 / 蔬菜 / 肉"),
        autoLesson("Where is...?", "... ở đâu?", "〜はどこですか？", "… 어디예요?", "…在哪里？"),
        autoLesson("Supermarket dialogue", "Hội thoại siêu thị", "スーパーの会話", "슈퍼 대화", "超市对话"),
      ]),
      unit("Clothes Shopping", "Mua quần áo", "服の買い物", "옷 쇼핑", "买衣服", [
        autoLesson("shirt / pants / shoes", "áo / quần / giày", "シャツ／ズボン／靴", "셔츠 / 바지 / 신발", "衬衫 / 裤子 / 鞋子"),
        autoLesson("size / color", "kích cỡ / màu", "サイズ／色", "사이즈 / 색", "尺码 / 颜色"),
        autoLesson("Clothes shop dialogue", "Hội thoại cửa hàng quần áo", "服屋の会話", "옷가게 대화", "服装店对话"),
      ]),
      unit("Asking Price", "Hỏi giá", "値段を聞く", "가격 묻기", "询问价格", [
        autoLesson("How much is this?", "Cái này bao nhiêu tiền?", "これはいくらですか？", "이거 얼마예요?", "这个多少钱？"),
        autoLesson("cheap / expensive", "rẻ / đắt", "安い／高い", "싸요 / 비싸요", "便宜 / 贵"),
        autoLesson("Price conversation", "Hội thoại về giá", "値段の会話", "가격 대화", "价格对话"),
      ]),
      unit("Quantity", "Số lượng", "数量", "수량", "数量", [
        autoLesson("one / two / three", "một / hai / ba", "一つ／二つ／三つ", "하나 / 둘 / 셋", "一 / 二 / 三"),
        autoLesson("a little / many / enough", "một chút / nhiều / đủ", "少し／たくさん／十分", "조금 / 많이 / 충분", "一点 / 很多 / 足够"),
        autoLesson("Quantity dialogue", "Hội thoại về số lượng", "数量の会話", "수량 대화", "数量对话"),
      ]),
      unit("Payment", "Thanh toán", "支払い", "결제", "付款", [
        autoLesson("cash / card", "tiền mặt / thẻ", "現金／カード", "현금 / 카드", "现金 / 卡"),
        autoLesson("receipt / change", "hóa đơn / tiền thừa", "レシート／おつり", "영수증 / 거스름돈", "收据 / 找零"),
        autoLesson("Payment conversation", "Hội thoại thanh toán", "支払いの会話", "결제 대화", "付款对话"),
      ]),
      unit("Returns & Problems", "Đổi trả & sự cố", "返品とトラブル", "반품과 문제", "退换与问题", [
        autoLesson("This is broken", "Cái này bị hỏng", "壊れています", "이게 고장났어요", "这个坏了"),
        autoLesson("Can I return this?", "Tôi có thể trả lại không?", "返品できますか？", "반품할 수 있나요?", "我可以退货吗？"),
        autoLesson("Return dialogue", "Hội thoại đổi trả", "返品の会話", "반품 대화", "退货对话"),
      ]),
      unit("Shopping Checkpoint", "Checkpoint mua sắm", "買い物チェック", "쇼핑 체크포인트", "购物检查点", [
        autoLesson("Buying items", "Mua đồ", "商品を買う", "물건 사기", "购买商品"),
        autoLesson("Asking price and paying", "Hỏi giá và thanh toán", "値段を聞いて払う", "가격 묻고 결제하기", "询价与付款"),
        autoLesson("Shopping checkpoint", "Checkpoint mua sắm", "買い物チェック", "쇼핑 체크포인트", "购物检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m07_transportation_directions",
    order: 7,
    levelRange: "A2",
    levelCode: "A2",
    placementTag: "daily_life_situation",
    titleByNative: L(
      "Transportation & Directions",
      "Phương tiện & hỏi đường",
      "交通と道案内",
      "교통과 길 찾기",
      "交通与问路",
    ),
    goalByNative: L(
      "Ask for directions, use trains, buses, taxis, talk about places, directions, time, and getting lost.",
      "Hỏi đường, đi tàu, xe bus, taxi, nói địa điểm, hướng đi, thời gian và xử lý khi bị lạc.",
      "道案内・電車・バス・タクシー、場所・方向・時間、道に迷ったときの対応を学びます。",
      "길 묻기, 기차·버스·택시 이용, 장소·방향·시간, 길을 잃었을 때 대처합니다.",
      "问路、乘坐火车/公交/出租车，谈论地点、方向、时间并应对迷路。",
    ),
    units: [
      unit("Places in Town", "Địa điểm trong phố", "街の場所", "시내 장소", "城里地点", [
        autoLesson("station / school / hospital", "ga / trường / bệnh viện", "駅／学校／病院", "역 / 학교 / 병원", "车站 / 学校 / 医院"),
        autoLesson("bank / supermarket / restaurant", "ngân hàng / siêu thị / nhà hàng", "銀行／スーパー／レストラン", "은행 / 슈퍼 / 식당", "银行 / 超市 / 餐厅"),
        autoLesson("Places dialogue", "Hội thoại về địa điểm", "場所の会話", "장소 대화", "地点对话"),
      ]),
      unit("Asking Directions", "Hỏi đường", "道を聞く", "길 묻기", "问路", [
        autoLesson("Where is...?", "... ở đâu?", "〜はどこですか？", "… 어디예요?", "…在哪里？"),
        autoLesson("left / right / straight", "trái / phải / thẳng", "左／右／まっすぐ", "왼쪽 / 오른쪽 / 직진", "左 / 右 / 直走"),
        autoLesson("Direction dialogue", "Hội thoại chỉ đường", "道案内の会話", "길 안내 대화", "指路对话"),
      ]),
      unit("Train Station", "Ga tàu", "駅", "기차역", "火车站", [
        autoLesson("ticket / platform / train", "vé / sân ga / tàu", "切符／ホーム／電車", "표 / 승강장 / 기차", "票 / 站台 / 火车"),
        autoLesson("Which train?", "Tàu nào?", "どの電車ですか？", "어느 기차예요?", "哪一班车？"),
        autoLesson("Train station dialogue", "Hội thoại ở ga", "駅の会話", "역 대화", "车站对话"),
      ]),
      unit("Bus", "Xe buýt", "バス", "버스", "公交", [
        autoLesson("bus stop / bus number", "trạm xe / số xe", "バス停／バス番号", "버스 정류장 / 버스 번호", "公交站 / 线路号"),
        autoLesson("Does this bus go to...?", "Xe này có đi ... không?", "このバスは〜に行きますか？", "이 버스 …에 가요?", "这班车去…吗？"),
        autoLesson("Bus dialogue", "Hội thoại xe buýt", "バスの会話", "버스 대화", "公交对话"),
      ]),
      unit("Taxi", "Taxi", "タクシー", "택시", "出租车", [
        autoLesson("Please go to...", "Làm ơn đến...", "〜までお願いします", "…까지 가 주세요", "请去…"),
        autoLesson("How much will it cost?", "Bao nhiêu tiền?", "いくらぐらいかかりますか？", "얼마 정도 나와요?", "大概多少钱？"),
        autoLesson("Taxi dialogue", "Hội thoại taxi", "タクシーの会話", "택시 대화", "出租车对话"),
      ]),
      unit("Time & Schedule", "Giờ & lịch trình", "時間と時刻表", "시간과 시간표", "时间与时刻表", [
        autoLesson("departure / arrival", "khởi hành / đến nơi", "出発／到着", "출발 / 도착", "出发 / 到达"),
        autoLesson("What time does it leave?", "Mấy giờ khởi hành?", "何時に出発しますか？", "몇 시에 출발해요?", "几点出发？"),
        autoLesson("Schedule dialogue", "Hội thoại lịch trình", "時刻表の会話", "시간표 대화", "时刻表对话"),
      ]),
      unit("Getting Lost", "Bị lạc", "道に迷う", "길을 잃다", "迷路", [
        autoLesson("I'm lost", "Tôi bị lạc", "道に迷いました", "길을 잃었어요", "我迷路了"),
        autoLesson("Can you help me?", "Bạn giúp tôi được không?", "助けてくれますか？", "도와주시겠어요?", "你能帮我吗？"),
        autoLesson("Lost conversation", "Hội thoại khi lạc", "迷子の会話", "길 잃음 대화", "迷路对话"),
      ]),
      unit("Travel Mini Dialogue", "Hội thoại di chuyển ngắn", "移動ミニ会話", "이동 짧은 대화", "出行小对话", [
        autoLesson("From home to station", "Từ nhà đến ga", "家から駅まで", "집에서 역까지", "从家到车站"),
        autoLesson("Station to destination", "Từ ga đến nơi đến", "駅から目的地まで", "역에서 목적지까지", "从车站到目的地"),
        autoLesson("Transportation checkpoint", "Checkpoint phương tiện", "交通チェック", "교통 체크포인트", "交通检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m08_school_work_life",
    order: 8,
    levelRange: "A2",
    levelCode: "A2",
    placementTag: "daily_life_conversation",
    titleByNative: L(
      "School & Work Life",
      "Trường học & công việc",
      "学校と仕事の生活",
      "학교와 직장 생활",
      "学校与工作生活",
    ),
    goalByNative: L(
      "Communicate at school or work, ask questions, talk about tasks, report simple progress, and ask for help.",
      "Giao tiếp ở trường hoặc nơi làm việc, hỏi bài, hỏi nhiệm vụ, báo cáo việc đơn giản và xin giúp đỡ.",
      "学校や職場で質問し、タスクを話し、簡単な進捗を伝え、助けを求めます。",
      "학교/직장에서 질문하고 업무를 말하며 간단한 진행을 보고하고 도움을 요청합니다.",
      "在学校或职场沟通、提问、谈任务、简单汇报进度并求助。",
    ),
    units: [
      unit("Classroom / Office Words", "Từ lớp học / văn phòng", "教室・オフィスの言葉", "교실/사무실 단어", "教室 / 办公室用语", [
        autoLesson("teacher / student / class", "giáo viên / học sinh / lớp", "先生／生徒／授業", "선생님 / 학생 / 수업", "老师 / 学生 / 课"),
        autoLesson("desk / computer / meeting", "bàn / máy tính / họp", "机／パソコン／会議", "책상 / 컴퓨터 / 회의", "桌子 / 电脑 / 会议"),
        autoLesson("School/workplace vocabulary", "Từ vựng trường/nơi làm", "学校・職場の語彙", "학교/직장 어휘", "学校/职场词汇"),
      ]),
      unit("Simple Instructions", "Hướng dẫn đơn giản", "簡単な指示", "간단한 지시", "简单指示", [
        autoLesson("listen / write / read", "nghe / viết / đọc", "聞く／書く／読む", "듣기 / 쓰기 / 읽기", "听 / 写 / 读"),
        autoLesson("open / close / check", "mở / đóng / kiểm tra", "開ける／閉じる／確認する", "열기 / 닫기 / 확인", "打开 / 关闭 / 检查"),
        autoLesson("Instruction dialogue", "Hội thoại hướng dẫn", "指示の会話", "지시 대화", "指示对话"),
      ]),
      unit("Asking Questions", "Đặt câu hỏi", "質問する", "질문하기", "提问", [
        autoLesson("I have a question", "Tôi có câu hỏi", "質問があります", "질문이 있어요", "我有个问题"),
        autoLesson("Can you explain?", "Bạn giải thích được không?", "説明してくれますか？", "설명해 주시겠어요?", "你能解释一下吗？"),
        autoLesson("Asking in class/work", "Hỏi ở lớp/nơi làm", "授業・仕事で質問する", "수업/직장에서 묻기", "在课堂/职场提问"),
      ]),
      unit("Talking About Tasks", "Nói về nhiệm vụ", "タスクの話", "업무 이야기", "谈论任务", [
        autoLesson("I need to...", "Tôi cần...", "〜する必要があります", "…해야 해요", "我需要…"),
        autoLesson("I finished...", "Tôi đã xong...", "〜を終えました", "… 끝냈어요", "我做完了…"),
        autoLesson("Task report dialogue", "Hội thoại báo cáo việc", "進捗報告の会話", "업무 보고 대화", "任务汇报对话"),
      ]),
      unit("Time Management", "Quản lý thời gian", "時間管理", "시간 관리", "时间管理", [
        autoLesson("deadline / today / tomorrow", "hạn / hôm nay / ngày mai", "締切／今日／明日", "마감 / 오늘 / 내일", "截止日期 / 今天 / 明天"),
        autoLesson("I'm busy", "Tôi bận", "忙しいです", "바빠요", "我很忙"),
        autoLesson("Schedule at school/work", "Lịch ở trường/nơi làm", "学校・仕事の予定", "학교/직장 일정", "学校/职场日程"),
      ]),
      unit("Group Work", "Làm việc nhóm", "グループワーク", "팀 작업", "小组合作", [
        autoLesson("Let's do this", "Chúng ta làm cái này nhé", "これをやりましょう", "이거 해요", "我们做这个吧"),
        autoLesson("What do you think?", "Bạn nghĩ sao?", "どう思いますか？", "어떻게 생각해요?", "你觉得呢？"),
        autoLesson("Group work dialogue", "Hội thoại làm nhóm", "グループワークの会話", "팀 작업 대화", "小组合作对话"),
      ]),
      unit("Problems at School / Work", "Vấn đề ở trường / nơi làm", "学校・仕事の困りごと", "학교/직장 문제", "学校/职场问题", [
        autoLesson("I don't understand", "Tôi không hiểu", "わかりません", "이해가 안 돼요", "我不明白"),
        autoLesson("I need help", "Tôi cần giúp đỡ", "助けが必要です", "도움이 필요해요", "我需要帮助"),
        autoLesson("Problem-solving dialogue", "Hội thoại giải quyết vấn đề", "問題解決の会話", "문제 해결 대화", "解决问题对话"),
      ]),
      unit("School / Work Checkpoint", "Checkpoint trường / việc", "学校・仕事チェック", "학교/직장 체크포인트", "学校/工作检查点", [
        autoLesson("Classroom conversation", "Hội thoại lớp học", "教室の会話", "교실 대화", "课堂会话"),
        autoLesson("Office conversation", "Hội thoại văn phòng", "オフィスの会話", "사무실 대화", "办公室会话"),
        autoLesson("School/work checkpoint", "Checkpoint trường/việc", "学校・仕事チェック", "학교/직장 체크포인트", "学校/工作检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m09_health_feelings",
    order: 9,
    levelRange: "A2",
    levelCode: "A2",
    placementTag: "daily_life_conversation",
    titleByNative: L(
      "Health & Feelings",
      "Sức khỏe & cảm xúc",
      "健康と気持ち",
      "건강과 감정",
      "健康与感受",
    ),
    goalByNative: L(
      "Talk about feelings, health, simple symptoms, and ask for help at a pharmacy or in public.",
      "Nói cảm xúc, tình trạng sức khỏe, triệu chứng đơn giản và xin giúp đỡ ở hiệu thuốc hoặc nơi công cộng.",
      "気持ち・健康・簡単な症状を話し、薬局や公共の場で助けを求めます。",
      "감정, 건강, 간단한 증상을 말하고 약국이나 공공장소에서 도움을 요청합니다.",
      "谈论感受、健康与简单症状，并在药店或公共场合求助。",
    ),
    units: [
      unit("Feelings", "Cảm xúc", "気持ち", "감정", "感受", [
        autoLesson("happy / sad / tired", "vui / buồn / mệt", "嬉しい／悲しい／疲れた", "행복해요 / 슬퍼요 / 피곤해요", "开心 / 难过 / 累"),
        autoLesson("nervous / excited / worried", "lo / hào hứng / lo lắng", "緊張／ワクワク／心配", "긴장 / 설렘 / 걱정", "紧张 / 兴奋 / 担心"),
        autoLesson("Talking about feelings", "Nói về cảm xúc", "気持ちの話", "감정 이야기", "谈论感受"),
      ]),
      unit("Body Parts", "Bộ phận cơ thể", "体の部位", "신체 부위", "身体部位", [
        autoLesson("head / stomach / hand", "đầu / bụng / tay", "頭／お腹／手", "머리 / 배 / 손", "头 / 肚子 / 手"),
        autoLesson("back / leg / throat", "lưng / chân / họng", "背／足／のど", "등 / 다리 / 목", "背 / 腿 / 嗓子"),
        autoLesson("Body parts dialogue", "Hội thoại bộ phận cơ thể", "体の部位の会話", "신체 부위 대화", "身体部位对话"),
      ]),
      unit("Simple Symptoms", "Triệu chứng đơn giản", "簡単な症状", "간단한 증상", "简单症状", [
        autoLesson("I have a headache", "Tôi bị đau đầu", "頭が痛いです", "머리가 아파요", "我头疼"),
        autoLesson("I feel sick", "Tôi cảm thấy ốm", "気持ちが悪いです", "몸이 안 좋아요요", "我感觉不舒服"),
        autoLesson("Symptom dialogue", "Hội thoại triệu chứng", "症状の会話", "증상 대화", "症状对话"),
      ]),
      unit("At the Pharmacy", "Ở hiệu thuốc", "薬局で", "약국에서", "在药店", [
        autoLesson("medicine / pain / cold", "thuốc / đau / cảm", "薬／痛み／かぜ", "약 / 통증 / 감기", "药 / 疼痛 / 感冒"),
        autoLesson("Do you have...?", "Bạn có ... không?", "〜はありますか？", "… 있나요?", "有…吗？"),
        autoLesson("Pharmacy dialogue", "Hội thoại hiệu thuốc", "薬局の会話", "약국 대화", "药店对话"),
      ]),
      unit("Asking for Help", "Xin giúp đỡ", "助けを求める", "도움 요청", "求助", [
        autoLesson("Help me, please", "Làm ơn giúp tôi", "助けてください", "도와주세요", "请帮帮我"),
        autoLesson("I need a doctor", "Tôi cần bác sĩ", "医者が必要です", "의사가 필요해요", "我需要医生"),
        autoLesson("Help request dialogue", "Hội thoại xin giúp", "助けを求める会話", "도움 요청 대화", "求助对话"),
      ]),
      unit("Stress & Tiredness", "Căng thẳng & mệt mỏi", "ストレスと疲れ", "스트레스와 피로", "压力与疲劳", [
        autoLesson("I'm tired", "Tôi mệt", "疲れています", "피곤해요", "我累了"),
        autoLesson("I'm stressed", "Tôi đang căng thẳng", "ストレスです", "스트레스받아요", "我压力很大"),
        autoLesson("Talking about stress", "Nói về căng thẳng", "ストレスの話", "스트레스 이야기", "谈论压力"),
      ]),
      unit("Giving Simple Advice", "Đưa lời khuyên đơn giản", "簡単なアドバイス", "간단한 조언", "简单建议", [
        autoLesson("You should rest", "Bạn nên nghỉ ngơi", "休んだ方がいいです", "쉬는 게 좋아요요", "你应该休息"),
        autoLesson("Drink water / sleep early", "Uống nước / ngủ sớm", "水を飲む／早く寝る", "물 마시기 / 일찍 자기", "喝水 / 早睡"),
        autoLesson("Advice dialogue", "Hội thoại lời khuyên", "アドバイスの会話", "조언 대화", "建议对话"),
      ]),
      unit("Health Checkpoint", "Checkpoint sức khỏe", "健康チェック", "건강 체크포인트", "健康检查点", [
        autoLesson("Feelings conversation", "Hội thoại cảm xúc", "気持ちの会話", "감정 대화", "感受会话"),
        autoLesson("Pharmacy/help conversation", "Hội thoại hiệu thuốc/xin giúp", "薬局・助けの会話", "약국/도움 대화", "药店/求助会话"),
        autoLesson("Health checkpoint", "Checkpoint sức khỏe", "健康チェック", "건강 체크포인트", "健康检查点"),
      ]),
    ],
  },
  {
    moduleId: "daily_life_m10_small_talk_daily_problems",
    order: 10,
    levelRange: "A2–B1",
    levelCode: "A2",
    placementTag: "daily_life_conversation",
    titleByNative: L(
      "Small Talk & Daily Problems",
      "Nói chuyện xã giao & vấn đề hằng ngày",
      "雑談と日常の困りごと",
      "스몰토크와 일상 문제",
      "闲聊与日常问题",
    ),
    goalByNative: L(
      "Make natural small talk, discuss weather, weekends, hobbies, daily problems, and keep conversations going.",
      "Nói chuyện xã giao tự nhiên, nói về thời tiết, cuối tuần, sở thích, xử lý vấn đề hằng ngày và giữ hội thoại không bị im lặng.",
      "自然な雑談、天気・週末・趣味・日常の困りごと、会話を続ける技術を学びます。",
      "자연스러운 스몰토크, 날씨·주말·취미·일상 문제, 대화를 이어가는 법을 배웁니다.",
      "进行自然闲聊，谈论天气、周末、爱好与日常问题，并保持对话不中断。",
    ),
    units: [
      unit("Weather", "Thời tiết", "天気", "날씨", "天气", [
        autoLesson("sunny / rainy / cold", "nắng / mưa / lạnh", "晴れ／雨／寒い", "맑음 / 비 / 추움", "晴 / 雨 / 冷"),
        autoLesson("It's hot today", "Hôm nay nóng", "今日は暑いです", "오늘 더워요", "今天很热"),
        autoLesson("Weather small talk", "Tán gẫu về thời tiết", "天気の雑談", "날씨 스몰토크", "天气闲聊"),
      ]),
      unit("Weekend Plans", "Kế hoạch cuối tuần", "週末の予定", "주말 계획", "周末计划", [
        autoLesson("What are you doing this weekend?", "Cuối tuần bạn làm gì?", "今週末は何をしますか？", "이번 주말에 뭐 해요?", "这周末你做什么？"),
        autoLesson("I'm going to...", "Tôi sẽ đi...", "〜に行きます", "…에 갈 거예요", "我要去…"),
        autoLesson("Weekend plan dialogue", "Hội thoại kế hoạch cuối tuần", "週末予定の会話", "주말 계획 대화", "周末计划对话"),
      ]),
      unit("Hobbies", "Sở thích", "趣味", "취미", "爱好", [
        autoLesson("sports / music / movies", "thể thao / nhạc / phim", "スポーツ／音楽／映画", "스포츠 / 음악 / 영화", "运动 / 音乐 / 电影"),
        autoLesson("I like playing...", "Tôi thích chơi...", "〜をするのが好きです", "…하는 걸 좋아해요", "我喜欢玩/做…"),
        autoLesson("Hobby conversation", "Hội thoại sở thích", "趣味の会話", "취미 대화", "爱好对话"),
      ]),
      unit("Likes & Dislikes", "Thích & không thích", "好き嫌い", "좋아함과 싫어함", "喜好与厌恶", [
        autoLesson("I like...", "Tôi thích...", "〜が好きです", "…를 좋아해요", "我喜欢…"),
        autoLesson("I don't like...", "Tôi không thích...", "〜が好きではありません", "…를 싫어해요", "我不喜欢…"),
        autoLesson("Likes/dislikes dialogue", "Hội thoại thích/không thích", "好き嫌いの会話", "호불호 대화", "喜好对话"),
      ]),
      unit("Phone / Chat Phrases", "Cụm câu điện thoại / chat", "電話・チャット", "전화 / 채팅", "电话 / 聊天用语", [
        autoLesson("Can you hear me?", "Bạn nghe được không?", "聞こえますか？", "들려요?", "你听得到吗？"),
        autoLesson("I'll message you", "Tôi sẽ nhắn bạn", "メッセージします", "메시지 보낼게요", "我会给你发消息"),
        autoLesson("Phone/chat dialogue", "Hội thoại điện thoại/chat", "電話・チャットの会話", "전화/채팅 대화", "电话/聊天对话"),
      ]),
      unit("Simple Problems", "Vấn đề đơn giản", "簡単な困りごと", "간단한 문제", "简单问题", [
        autoLesson("I forgot...", "Tôi quên...", "忘れました", "잊어버렸어요", "我忘了…"),
        autoLesson("I lost...", "Tôi làm mất...", "なくしました", "잃어버렸어요", "我丢了…"),
        autoLesson("Problem explanation dialogue", "Hội thoại giải thích vấn đề", "困りごとの説明会話", "문제 설명 대화", "说明问题对话"),
      ]),
      unit("Making Plans", "Lên kế hoạch", "予定を立てる", "약속 잡기", "制定计划", [
        autoLesson("Let's meet", "Chúng ta gặp nhau nhé", "会いましょう", "만나요", "我们见面吧"),
        autoLesson("What time works for you?", "Bạn rảnh lúc nào?", "何時がいいですか？", "몇 시가 괜찮아요?", "你什么时间方便？"),
        autoLesson("Making plans dialogue", "Hội thoại lên kế hoạch", "予定作りの会話", "약속 잡기 대화", "约计划对话"),
      ]),
      unit("Natural Daily Conversation", "Hội thoại hằng ngày tự nhiên", "自然な日常会話", "자연스러운 일상 대화", "自然的日常对话", [
        autoLesson("Small talk flow", "Luồng tán gẫu", "雑談の流れ", "스몰토크 흐름", "闲聊流程"),
        autoLesson("Keeping conversation going", "Giữ hội thoại tiếp tục", "会話を続ける", "대화 이어가기", "保持对话继续"),
        autoLesson("Daily Life final checkpoint", "Checkpoint cuối Daily Life", "日常会話最終チェック", "일상 회화 최종 체크포인트", "日常交流最终检查点"),
      ]),
    ],
  },
];

export function assertDailyLifeBlueprintShape() {
  if (DAILY_LIFE_MODULES.length !== 10) {
    throw new Error(`Expected 10 Daily Life modules, got ${DAILY_LIFE_MODULES.length}`);
  }
  let lessonCount = 0;
  for (const mod of DAILY_LIFE_MODULES) {
    if (mod.units.length !== 8) {
      throw new Error(`${mod.moduleId}: expected 8 units, got ${mod.units.length}`);
    }
    for (const u of mod.units) {
      if (u.lessons.length !== 3) {
        throw new Error(`${mod.moduleId}: unit must have 3 lessons`);
      }
      lessonCount += u.lessons.length;
    }
  }
  if (lessonCount !== 240) {
    throw new Error(`Expected 240 Daily Life lessons in blueprint, got ${lessonCount}`);
  }
}

/**
 * Build one course pack per module for a learning language.
 * Lessons are blueprint-only: playable=false, placeholder exercises, no real Q&A content.
 */
export function buildDailyLifeCourses(languageCode, { makeCourse, makeLesson }) {
  assertDailyLifeBlueprintShape();
  const packs = [];

  for (const mod of DAILY_LIFE_MODULES) {
    const moduleOrder = 10 + Number(mod.order); // after Core Foundation (0+)
    if (mod.order === 1) {
      packs.push(buildReadyModuleOne(languageCode, {
        makeCourse,
        makeLesson,
        moduleDef: mod,
        courseOrder: moduleOrder,
      }));
      continue;
    }
    const courseId = `${languageCode}-daily_life-m${String(mod.order).padStart(2, "0")}`;
    const trackId = `${languageCode}-daily_life`;
    const units = [];
    const lessons = [];

    for (const [unitIndex, unitDef] of mod.units.entries()) {
      const unitOrder = unitIndex + 1;
      const unitId = `${languageCode}-daily_life-m${String(mod.order).padStart(2, "0")}-u${unitOrder}`;
      const lessonIds = [];

      for (const [lessonIndex, lessonDef] of unitDef.lessons.entries()) {
        const lessonOrder = lessonIndex + 1;
        const lessonId = `${unitId}-l${lessonOrder}`;
        lessonIds.push(lessonId);

        const exercises = EXERCISE_PLACEHOLDER_DEFS.map((ex) => ({
          id: `${lessonId}-e${ex.order}`,
          order: ex.order,
          type: ex.type,
          titleByNative: ex.titleByNative,
          plan: ex.plan,
          access: ex.plan,
          plusOnly: ex.plan === "plus",
          stage: ex.stage,
          status: "placeholder",
          // Explicitly no real content fields:
          // question / options / correctAnswer / prompts must not appear.
        }));

        const practiceStages = PRACTICE_STAGE_DEFS.map((stage) => ({
          key: stage.key,
          labelByNative: stage.labelByNative,
          goalByNative: stage.goalByNative,
          exerciseOrders: stage.exerciseOrders,
          exercises: exercises
            .filter((ex) => stage.exerciseOrders.includes(ex.order))
            .map((ex) => ({
              order: ex.order,
              type: ex.type,
              plan: ex.plan,
              status: "placeholder",
            })),
        }));

        lessons.push(
          makeLesson({
            id: lessonId,
            languageCode,
            nicheId: "daily_life",
            branch: "niche",
            moduleId: mod.moduleId,
            unitId,
            order: lessonOrder,
            level: mod.levelCode,
            levelRange: mod.levelRange,
            placementTag: mod.placementTag,
            template: "vocabularyLesson",
            title: lessonDef.titleByNative.en,
            titleVi: lessonDef.titleByNative.vi,
            titleByNative: lessonDef.titleByNative,
            description: lessonDef.goalByNative.en,
            descriptionVi: lessonDef.goalByNative.vi,
            descriptionByNative: lessonDef.goalByNative,
            canDoObjective: lessonDef.goalByNative.en,
            canDoObjectiveVi: lessonDef.goalByNative.vi,
            canDoObjectiveByNative: lessonDef.goalByNative,
            goalByNative: lessonDef.goalByNative,
            situationByNative: lessonDef.situationByNative,
            canSayByNative: lessonDef.canSayByNative,
            objectives: [lessonDef.goalByNative.en],
            objectivesVi: [lessonDef.goalByNative.vi],
            introPoints: [
              lessonDef.situationByNative.en,
              lessonDef.canSayByNative.en,
            ],
            introPointsVi: [
              lessonDef.situationByNative.vi,
              lessonDef.canSayByNative.vi,
            ],
            introPointsByNative: Object.fromEntries(
              NATIVE_CODES.map((code) => [
                code,
                [lessonDef.situationByNative[code], lessonDef.canSayByNative[code]],
              ]),
            ),
            estimatedMinutes: 8,
            track: trackId,
            vocabulary: [],
            keyPhrases: [],
            dialogue: [],
            reviewItems: [],
            grammarFocus: null,
            grammarFocusVi: null,
            cultureNote: null,
            cultureNoteVi: null,
            contentStatus: "blueprint",
            playable: false,
            comingSoon: true,
            canSkip: true,
            exerciseStatus: "placeholder",
            learnSection: LEARN_SECTION_PLACEHOLDER,
            practiceStages,
            saveToReview: { status: "placeholder" },
            unlockRequirement: DAILY_LIFE_COURSE_META.unlockRequirement,
            courseType: DAILY_LIFE_COURSE_META.type,
            exercises,
          }),
        );
      }

      units.push({
        id: unitId,
        title: `Unit ${unitOrder}: ${unitDef.titleByNative.en}`,
        titleVi: `Bài ${unitOrder}: ${unitDef.titleByNative.vi}`,
        titleByNative: Object.fromEntries(
          NATIVE_CODES.map((code) => {
            const prefix =
              code === "vi"
                ? `Bài ${unitOrder}`
                : code === "ja"
                  ? `ユニット${unitOrder}`
                  : code === "ko"
                    ? `유닛 ${unitOrder}`
                    : code === "zh"
                      ? `单元${unitOrder}`
                      : `Unit ${unitOrder}`;
            return [code, `${prefix}: ${unitDef.titleByNative[code]}`];
          }),
        ),
        levelCode: mod.levelCode,
        levelRange: mod.levelRange,
        trackId,
        moduleId: mod.moduleId,
        goal: mod.goalByNative.en,
        goalVi: mod.goalByNative.vi,
        goalByNative: mod.goalByNative,
        displayOrder: unitOrder,
        order: unitOrder,
        lessonIds,
      });
    }

    packs.push(
      makeCourse({
        courseId,
        languageCode,
        nicheId: "daily_life",
        branch: "niche",
        moduleId: mod.moduleId,
        moduleTitle: mod.titleByNative.en,
        moduleTitleVi: mod.titleByNative.vi,
        moduleTitleByNative: mod.titleByNative,
        title: `${languageCode === "ja" ? "Japanese" : "English"} · ${DAILY_LIFE_COURSE_META.titleByNative.en} · ${mod.titleByNative.en}`,
        titleVi: `${languageCode === "ja" ? "Tiếng Nhật" : "Tiếng Anh"} · ${DAILY_LIFE_COURSE_META.titleByNative.vi} · ${mod.titleByNative.vi}`,
        titleByNative: Object.fromEntries(
          NATIVE_CODES.map((code) => {
            const langLabel =
              languageCode === "ja"
                ? { vi: "Tiếng Nhật", en: "Japanese", ja: "日本語", ko: "일본어", zh: "日语" }[code]
                : { vi: "Tiếng Anh", en: "English", ja: "英語", ko: "영어", zh: "英语" }[code];
            return [
              code,
              `${langLabel} · ${DAILY_LIFE_COURSE_META.titleByNative[code]} · ${mod.titleByNative[code]}`,
            ];
          }),
        ),
        description: mod.goalByNative.en,
        descriptionVi: mod.goalByNative.vi,
        descriptionByNative: mod.goalByNative,
        order: moduleOrder,
        levelCode: mod.levelCode,
        contentStatus: "blueprint",
        playable: false,
        type: DAILY_LIFE_COURSE_META.type,
        unlockRequirement: DAILY_LIFE_COURSE_META.unlockRequirement,
        levelRange: mod.levelRange,
        placementTag: mod.placementTag,
        units,
        lessons,
      }),
    );
  }

  return packs;
}
