/**
 * Daily Life Communication curriculum blueprint (source of truth).
 * Skeleton only — no real exercise content / questions / answers.
 */
import { resolveApprovedFiveCardsLesson } from '../content/daily-life/module-1/helpers.mjs';
import { resolveLanguageDisplayName } from './language-names.mjs';
import { NATIVE_CODES } from './native-localization.mjs';

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

// Named EMPTY lesson slot for the 16-module skeleton (owner decision,
// 2026-07-19): `titleByNative` is the real, spelled-out title for this
// lesson (an i18n-key/pair-agnostic 5-locale map built via `L(...)`, never a
// hard-coded target-language sentence — real target-language content is
// written in when this slot is actually authored). `goalByNative`,
// `situationByNative`, and `canSayByNative` are auto-derived from the same
// title via `autoLesson`, the same generic templating already used for
// every other blueprint lesson. A lesson slot meant to resolve through
// FIVE_CARDS_REGISTRY (the Golden Lesson today) is NOT built with this
// helper — it stays a bare `{ order }` object; see
// `resolveApprovedFiveCardsLesson` in helpers.mjs.
function lessonSlot(order, titleByNative) {
  if (!Number.isInteger(order) || order < 1) {
    throw new Error(`lessonSlot: missing/invalid explicit 'order' (got ${order})`);
  }
  const auto = autoLesson(
    titleByNative.en,
    titleByNative.vi,
    titleByNative.ja,
    titleByNative.ko,
    titleByNative.zh,
  );
  return { order, ...auto };
}

// `order` and `tier` are EXPLICIT, stable identity fields carried on the data
// itself — never derived from array position. This is the fix for the
// silent-mismatch risk flagged before this restructure: reordering, adding,
// or removing an entry in DAILY_LIFE_MODULES/units[] must never silently
// change which lessonId a FIVE_CARDS_REGISTRY entry resolves to. `tier` is
// one of 'basic' | 'intermediate' | 'advanced' (Cơ bản / Trung cấp / Cao
// cấp) — each tier is its own block of units, not a sub-division within one
// unit (owner decision, 2026-07-18).
function unit(en, vi, ja, ko, zh, lessons, { order, tier } = {}) {
  if (!Number.isInteger(order) || order < 1) {
    throw new Error(`unit "${en}": missing/invalid explicit 'order'`);
  }
  if (!["basic", "intermediate", "advanced"].includes(tier)) {
    throw new Error(`unit "${en}": missing/invalid 'tier' (must be basic|intermediate|advanced)`);
  }
  return { titleByNative: L(en, vi, ja, ko, zh), lessons, order, tier };
}

// Level range shown per tier. Placeholder mapping for the skeleton — content
// authors may refine per-topic later; not tied to placement_policy.json
// (which maps a placement-test score to a LevelId and has no module/unit
// awareness at all).
const TIER_LEVELS = {
  basic: { levelCode: "A0", levelRange: "A0–A1" },
  intermediate: { levelCode: "A2", levelRange: "A2" },
  advanced: { levelCode: "B1", levelRange: "B1–B2" },
};

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

/**
 * 16-module × 3-tier restructure, Cơ bản tier fully named (owner decision,
 * 2026-07-19; replaces the prior 15-topic × 3-tier empty-shell skeleton).
 * Each entry below is one MODULE (`order` 1–16, matches the approved module
 * list). A module's `units[]` holds actual unit blocks, each tagged with an
 * explicit `tier` ('basic' | 'intermediate' | 'advanced' — Cơ bản/Trung
 * cấp/Cao cấp); a tier is its own unit block, never a sub-division inside
 * one unit. Every module's Cơ bản tier is fully named (real unit/lesson
 * titles) — 16 modules · 33 units · 73 lessons total. Only ONE lesson slot
 * resolves to real five_cards content: Module 1 / Unit 1 / Lesson 1, the
 * Golden Reference Lesson (ADR-008) — marked with a bare `{ order: N }`
 * object (resolved via FIVE_CARDS_REGISTRY, see helpers.mjs). Every other Cơ
 * bản lesson slot is a `lessonSlot(order, titleByNative)` — a NAMED empty
 * placeholder (real title, no real exercise content yet). Module 1's
 * `moduleId` and the Golden Lesson's id (`ja-daily_life-m01-u1-l1`) are
 * UNCHANGED from before this restructure.
 *
 * Trung cấp & Cao cấp are a valid, intentional EMPTY shell for every module
 * (no `unit(...)` entries yet — TIER_LEVELS above already declares all 3
 * tiers structurally, independent of what content exists). Trung cấp & Cao
 * cấp dựa trên cùng chủ đề của Cơ bản, nâng độ mạch lạc/trơn tru (fluently),
 * keigo tăng dần (Cơ bản teineigo → Trung cấp chia thể → Cao cấp đầy đủ + kết
 * hợp). Unit/lesson cụ thể chốt sau khi có nội dung Cơ bản thật.
 * @type {Array<object>}
 */
export const DAILY_LIFE_MODULES = [
  {
    moduleId: 'daily_life_m01_basic_social_survival',
    order: 1,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Greetings & Getting Acquainted',
      'Chào hỏi & làm quen',
      'あいさつと知り合い',
      '인사와 안면 트기',
      '问候与结识',
    ),
    goalByNative: L(
      'Learn time-based greetings, self-introduction, meeting someone for the first time, and greeting people you already know.',
      'Học chào hỏi theo thời điểm, tự giới thiệu, làm quen lần đầu và chào lại người đã quen.',
      '時間帯に応じたあいさつ、自己紹介、初対面でのやり取り、知り合いへのあいさつを学びます。',
      '시간대별 인사, 자기소개, 첫 만남, 아는 사람에게 인사하는 법을 배웁니다.',
      '学习按时间问候、自我介绍、初次见面交流以及向熟人问候。',
    ),
    units: [
      unit(
        'Meeting for the First Time',
        'Làm quen lần đầu',
        '初めて知り合う',
        '처음 만나 인사 나누기',
        '初次见面认识',
        [
          // GOLDEN for ja (resolved via FIVE_CARDS_REGISTRY, real content).
          // For every OTHER language (today: en), the registry has no
          // entry, so this titleByNative is used as a named placeholder
          // instead — same fallback rule as any other lesson slot, not a
          // special case (owner decision, 2026-07-19).
          lessonSlot(1, L(
              'Greet & Introduce Yourself',
              'Chào hỏi & tự giới thiệu',
              'あいさつして自己紹介する',
              '인사하고 자기소개하기',
              '问候并自我介绍',
            )),
          lessonSlot(2, L(
              'Ask the Other Person\'s Name',
              'Hỏi tên người đối diện',
              '相手の名前を聞く',
              '상대방 이름 묻기',
              '询问对方的名字',
            )),
          lessonSlot(3, L(
              'Respond When Introduced & Say Goodbye',
              'Đáp làm quen & tạm biệt',
              '自己紹介への返事とお別れのあいさつ',
              '인사에 답하고 작별 인사하기',
              '回应认识并道别',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Meeting Someone You Already Know',
        'Gặp lại người đã quen',
        '知り合いに再会する',
        '아는 사람을 다시 만나기',
        '再次遇见认识的人',
        [
          lessonSlot(1, L(
              'Greet Someone You Know',
              'Chào người đã quen',
              '知り合いにあいさつする',
              '아는 사람에게 인사하기',
              '向认识的人问候',
            )),
          lessonSlot(2, L(
              'Ask How Someone Is Doing & Reply',
              'Hỏi thăm và đáp',
              '様子を尋ねて答える',
              '안부를 묻고 답하기',
              '问候近况并回应',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m02_thanks_apology_politeness',
    order: 2,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Thanks, Apologies & Politeness',
      'Cảm ơn, xin lỗi, lịch sự',
      '感謝・謝罪・丁寧さ',
      '감사, 사과, 공손함',
      '感谢、道歉与礼貌',
    ),
    goalByNative: L(
      'Learn to thank, apologize, ask permission, and make polite requests.',
      'Học cách cảm ơn, xin lỗi, xin phép và nhờ vả một cách lịch sự.',
      '感謝、謝罪、許可を求めること、丁寧にお願いすることを学びます。',
      '감사, 사과, 허락 구하기, 정중하게 부탁하는 법을 배웁니다.',
      '学习感谢、道歉、请求许可以及礼貌地请求帮助。',
    ),
    units: [
      unit(
        'Saying Thanks & Responding',
        'Cảm ơn & đáp lại',
        '感謝とその返事',
        '감사 표현과 답하기',
        '表达感谢与回应',
        [
          lessonSlot(1, L(
              'Thank Someone at Different Levels',
              'Cảm ơn theo mức độ',
              '程度に応じたお礼の言い方',
              '정도에 따라 감사 표현하기',
              '按程度表达感谢',
            )),
          lessonSlot(2, L(
              'Reply When Someone Thanks You',
              'Đáp khi được cảm ơn',
              'お礼を言われたときの返事',
              '감사 인사를 받았을 때 답하기',
              '被感谢时如何回应',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Apologizing & Asking for a Favor',
        'Xin lỗi & nhờ vả',
        '謝罪とお願い',
        '사과와 부탁하기',
        '道歉与请求帮忙',
        [
          lessonSlot(1, L(
              'Apologize & Ask Permission',
              'Xin lỗi & xin phép',
              '謝ることと許可を求めること',
              '사과하고 허락 구하기',
              '道歉与请求许可',
            )),
          lessonSlot(2, L(
              'Ask Someone for a Small Favor',
              'Nhờ ai đó việc nhỏ',
              'ちょっとしたお願いをする',
              '작은 부탁하기',
              '请人帮个小忙',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m03_self_family',
    order: 3,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Myself & Family',
      'Bản thân & gia đình',
      '自分と家族',
      '나와 가족',
      '自己与家庭',
    ),
    goalByNative: L(
      'Talk about yourself, your hometown, your job, and your family.',
      'Nói về bản thân, quê quán, nghề nghiệp và gia đình.',
      '自分自身、出身地、仕事、家族について話します。',
      '자신, 고향, 직업, 가족에 대해 이야기합니다.',
      '谈论自己、家乡、职业与家人。',
    ),
    units: [
      unit(
        'Talking About Yourself',
        'Nói về mình',
        '自分について話す',
        '자신에 대해 말하기',
        '谈论自己',
        [
          lessonSlot(1, L(
              'Hometown & Nationality',
              'Quê quán & quốc tịch',
              '出身地と国籍',
              '고향과 국적',
              '家乡与国籍',
            )),
          lessonSlot(2, L(
              'Job & School',
              'Nghề nghiệp & trường lớp',
              '仕事と学校',
              '직업과 학교',
              '职业与学校',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'My Family',
        'Gia đình mình',
        '自分の家族',
        '우리 가족',
        '我的家人',
        [
          lessonSlot(1, L(
              'Talk About Family Members',
              'Kể các thành viên',
              '家族について話す',
              '가족 구성원 소개하기',
              '介绍家庭成员',
            )),
          lessonSlot(2, L(
              'Their Age & Occupation',
              'Tuổi & nghề của họ',
              '家族の年齢と仕事',
              '가족의 나이와 직업',
              '他们的年龄与职业',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m04_communication_breakdown',
    order: 4,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'When Communication Breaks Down',
      'Khi giao tiếp gặp trục trặc',
      'コミュニケーションがうまくいかないとき',
      '의사소통이 어려울 때',
      '沟通遇到障碍时',
    ),
    goalByNative: L(
      'Handle situations where you can\'t hear or understand, and ask for clarification.',
      'Xử lý khi không nghe rõ, không hiểu, và xin giải thích rõ hơn.',
      '聞こえない・分からないときの対応や、説明をお願いすることを学びます。',
      '잘 안 들리거나 이해가 안 될 때 대처하고 설명을 요청하는 법을 배웁니다.',
      '处理听不清或听不懂的情况，并请求解释说明。',
    ),
    units: [
      unit(
        'When You Can\'t Hear or Understand',
        'Khi không nghe rõ / không hiểu',
        '聞こえない・分からないとき',
        '잘 안 들리거나 이해가 안 될 때',
        '听不清或听不懂时',
        [
          lessonSlot(1, L(
              'Ask Someone to Repeat or Speak Slowly',
              'Xin nói lại / nói chậm',
              'もう一度言ってもらう・ゆっくり話してもらう',
              '다시 말해달라고 하기 / 천천히 말해달라고 하기',
              '请对方重复或说慢一点',
            )),
          lessonSlot(2, L(
              'Say You Don\'t Understand & Ask Again',
              'Nói "chưa hiểu" & hỏi lại',
              '「分かりません」と言って聞き直す',
              '"이해가 안 돼요"라고 말하고 다시 묻기',
              '说"不明白"并再次询问',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Asking for Clarification',
        'Nhờ làm rõ',
        '説明をお願いする',
        '명확히 해달라고 부탁하기',
        '请求解释清楚',
        [
          lessonSlot(1, L(
              'Ask What Something Means',
              'Hỏi "nghĩa là gì"',
              '「どういう意味ですか」と聞く',
              '"무슨 뜻이에요?"라고 묻기',
              '询问"是什么意思"',
            )),
          lessonSlot(2, L(
              'Ask Someone to Write It Down or Spell It',
              'Xin viết ra / đánh vần',
              '書いてもらう・スペルを教えてもらう',
              '적어 달라고 하기 / 철자를 말해달라고 하기',
              '请对方写下来或拼出来',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m05_objects_demonstratives',
    order: 5,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Objects & Pointing Things Out',
      'Đồ vật & chỉ định',
      'ものと指示表現',
      '물건과 지시 표현',
      '物品与指示表达',
    ),
    goalByNative: L(
      'Point at and ask about objects, and identify who they belong to.',
      'Chỉ và hỏi về đồ vật, xác định đồ của ai.',
      'ものを指して尋ね、誰のものかを確認します。',
      '물건을 가리키며 묻고 누구의 것인지 확인합니다.',
      '指出并询问物品，确认物品的归属。',
    ),
    units: [
      unit(
        'What Is This?',
        'Cái này là gì',
        'これは何ですか',
        '이것은 무엇인가요',
        '这是什么',
        [
          lessonSlot(1, L(
              'Point & Ask About Nearby/Far Objects',
              'Chỉ & hỏi đồ gần/xa',
              '近く・遠くのものを指して尋ねる',
              '가까운/먼 물건을 가리키며 묻기',
              '指出并询问远近的物品',
            )),
          lessonSlot(2, L(
              'Listen to the Answer & Confirm',
              'Nghe đáp & xác nhận lại',
              '答えを聞いて確認する',
              '대답을 듣고 다시 확인하기',
              '听懂回答并再次确认',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Whose Is This?',
        'Đồ của ai',
        '誰のものか',
        '누구의 물건인가요',
        '这是谁的东西',
        [
          lessonSlot(1, L(
              'Mine or Yours',
              'Đồ của mình / của bạn',
              '自分のもの・相手のもの',
              '내 것 / 네 것',
              '我的东西/你的东西',
            )),
          lessonSlot(2, L(
              'Ask & Answer About Ownership',
              'Hỏi & đáp về sở hữu',
              '所有について尋ねて答える',
              '소유에 대해 묻고 답하기',
              '询问并回答所属关系',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m06_numbers_prices_money',
    order: 6,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Numbers, Prices & Money',
      'Số đếm, giá cả, tiền',
      '数字・値段・お金',
      '숫자, 가격, 돈',
      '数字、价格与金钱',
    ),
    goalByNative: L(
      'Count numbers, ask prices, and handle payment.',
      'Đếm số, hỏi giá và xử lý việc trả tiền.',
      '数を数え、値段を尋ね、支払いを行います。',
      '숫자를 세고 가격을 물으며 결제를 처리합니다.',
      '数数、问价并处理付款。',
    ),
    units: [
      unit(
        'Counting',
        'Số đếm',
        '数を数える',
        '숫자 세기',
        '数数',
        [
          lessonSlot(1, L(
              'Small Numbers (1–10)',
              'Số nhỏ (1-10)',
              '小さい数字（1〜10）',
              '작은 숫자 (1-10)',
              '小数字（1-10）',
            )),
          lessonSlot(2, L(
              'Large Numbers (Tens/Hundreds/Thousands)',
              'Số lớn (chục/trăm/nghìn)',
              '大きい数字（十・百・千）',
              '큰 숫자 (십/백/천)',
              '大数字（十/百/千）',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Asking Prices & Paying',
        'Hỏi giá & trả tiền',
        '値段を聞いて支払う',
        '가격 묻고 돈 내기',
        '问价与付款',
        [
          lessonSlot(1, L(
              'Ask How Much It Costs',
              'Hỏi bao nhiêu tiền',
              'いくらか尋ねる',
              '얼마인지 묻기',
              '询问多少钱',
            )),
          lessonSlot(2, L(
              'Understand the Price You Hear',
              'Nghe hiểu giá',
              '値段を聞き取る',
              '가격을 듣고 이해하기',
              '听懂价格',
            )),
          lessonSlot(3, L(
              'Pay & Receive Change',
              'Trả tiền & nhận tiền thừa',
              '支払っておつりを受け取る',
              '돈을 내고 거스름돈 받기',
              '付款并收取找零',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m07_time_date',
    order: 7,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Time & Dates',
      'Thời gian & ngày tháng',
      '時間と日付',
      '시간과 날짜',
      '时间与日期',
    ),
    goalByNative: L(
      'Ask and tell the time, dates, and days of the week.',
      'Hỏi và nói giờ, ngày tháng, thứ trong tuần.',
      '時間、日付、曜日を尋ねて答えます。',
      '시간, 날짜, 요일을 묻고 답합니다.',
      '询问并说出时间、日期与星期。',
    ),
    units: [
      unit(
        'Telling Time',
        'Giờ giấc',
        '時間',
        '시간',
        '时刻',
        [
          lessonSlot(1, L(
              'Ask & Tell the Time',
              'Hỏi & nói giờ',
              '時間を尋ねて答える',
              '시간 묻고 말하기',
              '询问并说出时间',
            )),
          lessonSlot(2, L(
              'Talk About a Duration',
              'Nói khoảng thời gian',
              '時間の長さについて話す',
              '시간의 길이 말하기',
              '谈论时间长度',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Dates & Weekdays',
        'Ngày tháng & thứ',
        '日付と曜日',
        '날짜와 요일',
        '日期与星期',
        [
          lessonSlot(1, L(
              'Days of the Week',
              'Thứ trong tuần',
              '曜日',
              '요일',
              '星期',
            )),
          lessonSlot(2, L(
              'Day & Month',
              'Ngày & tháng',
              '日にちと月',
              '날짜와 월',
              '日期与月份',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m08_shopping',
    order: 8,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Shopping',
      'Mua sắm',
      '買い物',
      '쇼핑',
      '购物',
    ),
    goalByNative: L(
      'Shop at a convenience store, supermarket, and clothing store.',
      'Mua đồ ở cửa hàng tiện lợi, siêu thị và cửa hàng quần áo.',
      'コンビニ、スーパー、洋服店で買い物をします。',
      '편의점, 슈퍼마켓, 옷 가게에서 쇼핑합니다.',
      '在便利店、超市和服装店购物。',
    ),
    units: [
      unit(
        'Convenience Store',
        'Cửa hàng tiện lợi',
        'コンビニ',
        '편의점',
        '便利店',
        [
          lessonSlot(1, L(
              'Look For & Ask If They Sell It',
              'Tìm & hỏi có bán không',
              '探して売っているか尋ねる',
              '찾아보고 파는지 묻기',
              '寻找并询问是否有卖',
            )),
          lessonSlot(2, L(
              'Buy & Pay',
              'Mua & thanh toán',
              '買って支払う',
              '구매하고 결제하기',
              '购买并付款',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Supermarket',
        'Siêu thị',
        'スーパー',
        '슈퍼마켓',
        '超市',
        [
          lessonSlot(1, L(
              'Ask Where an Item Is',
              'Hỏi đồ ở đâu',
              '商品がどこにあるか尋ねる',
              '물건이 어디 있는지 묻기',
              '询问商品位置',
            )),
          lessonSlot(2, L(
              'Ask About Quantity or Weight',
              'Hỏi số lượng / cân đo',
              '数量や重さを尋ねる',
              '수량이나 무게 묻기',
              '询问数量或重量',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
      unit(
        'Clothing Store',
        'Cửa hàng quần áo',
        '洋服店',
        '옷 가게',
        '服装店',
        [
          lessonSlot(1, L(
              'Ask About Size & Color',
              'Hỏi size & màu',
              'サイズと色を尋ねる',
              '사이즈와 색상 묻기',
              '询问尺码与颜色',
            )),
          lessonSlot(2, L(
              'Ask to Try It On',
              'Xin thử đồ',
              '試着をお願いする',
              '입어봐도 되는지 묻기',
              '请求试穿',
            )),
          lessonSlot(3, L(
              'Decide Whether to Buy',
              'Quyết mua hay không',
              '買うかどうか決める',
              '살지 말지 결정하기',
              '决定是否购买',
            )),
        ],
        { order: 3, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m09_food_ordering',
    order: 9,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Eating & Ordering Food',
      'Ăn uống & gọi món',
      '食事と注文',
      '식사와 주문',
      '用餐与点菜',
    ),
    goalByNative: L(
      'Order food at a restaurant and talk about food preferences.',
      'Gọi món ở quán ăn và nói về sở thích món ăn.',
      'お店で注文し、料理の好みについて話します。',
      '식당에서 주문하고 음식 취향에 대해 이야기합니다.',
      '在餐厅点菜并谈论饮食喜好。',
    ),
    units: [
      unit(
        'Ordering at a Restaurant',
        'Gọi món ở quán',
        'お店で注文する',
        '식당에서 주문하기',
        '在餐厅点菜',
        [
          lessonSlot(1, L(
              'Ask for a Menu & Order',
              'Xin menu & gọi món',
              'メニューをもらって注文する',
              '메뉴판 요청하고 주문하기',
              '索要菜单并点菜',
            )),
          lessonSlot(2, L(
              'Order More or Change an Order',
              'Gọi thêm / thay đổi',
              '追加注文・注文の変更',
              '추가 주문 / 주문 변경하기',
              '加点或更改点单',
            )),
          lessonSlot(3, L(
              'Ask for the Bill',
              'Xin tính tiền',
              'お会計をお願いする',
              '계산 요청하기',
              '请求结账',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Talking About Food',
        'Nói về món ăn',
        '料理について話す',
        '음식에 대해 말하기',
        '谈论食物',
        [
          lessonSlot(1, L(
              'Like or Dislike',
              'Thích / không thích',
              '好き・嫌い',
              '좋아함 / 싫어함',
              '喜欢/不喜欢',
            )),
          lessonSlot(2, L(
              'Ask What a Dish Is or If It\'s Spicy',
              'Hỏi món này là gì / có cay không',
              'この料理は何か・辛いかを尋ねる',
              '이 음식이 무엇인지 / 매운지 묻기',
              '询问这是什么菜/是否辣',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m10_directions_places',
    order: 10,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Directions & Places',
      'Chỉ đường & nơi chốn',
      '道案内と場所',
      '길 안내와 장소',
      '问路与地点',
    ),
    goalByNative: L(
      'Ask for directions, understand directions, and find nearby places.',
      'Hỏi đường, nghe hiểu chỉ dẫn và tìm nơi gần đây.',
      '道を尋ね、案内を理解し、近くの場所を探します。',
      '길을 묻고 안내를 이해하며 근처 장소를 찾습니다.',
      '问路、听懂指路并寻找附近地点。',
    ),
    units: [
      unit(
        'Asking for Directions',
        'Hỏi đường',
        '道を尋ねる',
        '길 묻기',
        '问路',
        [
          lessonSlot(1, L(
              'Ask "Where Is X?"',
              'Hỏi "X ở đâu"',
              '「Xはどこですか」と尋ねる',
              '"X는 어디에 있어요?" 묻기',
              '询问"X在哪里"',
            )),
          lessonSlot(2, L(
              'Understand Directions',
              'Nghe hiểu chỉ dẫn',
              '案内を聞き取る',
              '안내를 듣고 이해하기',
              '听懂指路',
            )),
          lessonSlot(3, L(
              'Confirm When Not Sure',
              'Xác nhận lại khi chưa rõ',
              '分からないときに確認し直す',
              '확실하지 않을 때 다시 확인하기',
              '不确定时再次确认',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Finding Nearby Places',
        'Tìm nơi gần đây',
        '近くの場所を探す',
        '근처 장소 찾기',
        '寻找附近的地方',
        [
          lessonSlot(1, L(
              'Ask "Is There a ... Nearby?"',
              'Hỏi "gần đây có... không"',
              '「近くに〜はありますか」と尋ねる',
              '"근처에 ~있어요?" 묻기',
              '询问"附近有没有..."',
            )),
          lessonSlot(2, L(
              'Ask How Far or How Long',
              'Hỏi xa/gần, bao lâu',
              '遠さ・近さ、かかる時間を尋ねる',
              '얼마나 멀고 가까운지, 얼마나 걸리는지 묻기',
              '询问远近与所需时间',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m11_transport_trains',
    order: 11,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Getting Around & Trains',
      'Đi lại & tàu điện',
      '移動と電車',
      '이동과 지하철',
      '出行与电车',
    ),
    goalByNative: L(
      'Take the train, bus, or taxi, and ask about times and prices.',
      'Đi tàu, xe buýt, taxi và hỏi giờ giấc, giá cả.',
      '電車・バス・タクシーを利用し、時刻や料金を尋ねます。',
      '지하철, 버스, 택시를 이용하고 시간과 요금을 묻습니다.',
      '乘坐电车、公交车、出租车并询问时间与价格。',
    ),
    units: [
      unit(
        'Train / Bus',
        'Tàu / xe buýt',
        '電車・バス',
        '지하철 / 버스',
        '电车/公交车',
        [
          lessonSlot(1, L(
              'Buy a Ticket & Ask the Price',
              'Mua vé & hỏi giá',
              '切符を買って値段を尋ねる',
              '표 사고 가격 묻기',
              '买票并询问价格',
            )),
          lessonSlot(2, L(
              'Ask Which Line Goes There',
              'Hỏi tuyến nào tới nơi',
              'どの路線で行けるか尋ねる',
              '어느 노선으로 가는지 묻기',
              '询问乘哪条线路到达',
            )),
          lessonSlot(3, L(
              'Ask About Times & Where to Get On/Off',
              'Hỏi giờ & nơi lên xuống',
              '時刻と乗り降りする場所を尋ねる',
              '시간과 승하차 장소 묻기',
              '询问时间与上下车地点',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Taxi',
        'Taxi',
        'タクシー',
        '택시',
        '出租车',
        [
          lessonSlot(1, L(
              'Say Your Destination',
              'Nói điểm đến',
              '行き先を伝える',
              '목적지 말하기',
              '说出目的地',
            )),
          lessonSlot(2, L(
              'Ask How Long or How Much',
              'Hỏi bao lâu / bao nhiêu tiền',
              'かかる時間や料金を尋ねる',
              '얼마나 걸리는지 / 얼마인지 묻기',
              '询问需要多久/多少钱',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m12_home_daily_living',
    order: 12,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Home & Daily Living',
      'Nhà cửa & đời sống hàng ngày',
      '家と日常生活',
      '집과 일상생활',
      '家居与日常生活',
    ),
    goalByNative: L(
      'Talk about your home and daily routines.',
      'Nói về nhà ở và sinh hoạt hằng ngày.',
      '住まいと日常生活について話します。',
      '거주지와 일상생활에 대해 이야기합니다.',
      '谈论住所与日常生活。',
    ),
    units: [
      unit(
        'Talking About Your Home',
        'Nói về nhà mình',
        '自分の家について話す',
        '우리 집에 대해 말하기',
        '谈论自己的家',
        [
          lessonSlot(1, L(
              'Where You Live & What Kind of Home',
              'Sống ở đâu / kiểu nhà gì',
              'どこに住んでいるか・どんな家か',
              '어디에 사는지 / 어떤 집인지',
              '住在哪里/什么样的房子',
            )),
          lessonSlot(2, L(
              'Describe Rooms & Things in Your Home',
              'Kể phòng & đồ trong nhà',
              '部屋や家にあるものを説明する',
              '방과 집안 물건 설명하기',
              '介绍房间与家中物品',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'A Typical Day',
        'Sinh hoạt một ngày',
        '一日の生活',
        '하루 일과',
        '一天的生活',
        [
          lessonSlot(1, L(
              'Morning & Evening Routines',
              'Việc sáng / tối',
              '朝と夜にすること',
              '아침/저녁 일과',
              '早晚活动',
            )),
          lessonSlot(2, L(
              'What You Do at What Time',
              'Mấy giờ làm gì',
              '何時に何をするか',
              '몇 시에 무엇을 하는지',
              '几点做什么',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m13_hobbies_free_time',
    order: 13,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Hobbies & Free Time',
      'Sở thích & thời gian rảnh',
      '趣味と自由時間',
      '취미와 여가',
      '爱好与空闲时间',
    ),
    goalByNative: L(
      'Talk about hobbies and how you spend free time and weekends.',
      'Nói về sở thích và cách dùng thời gian rảnh, cuối tuần.',
      '趣味や自由時間・週末の過ごし方について話します。',
      '취미와 여가·주말을 보내는 방법에 대해 이야기합니다.',
      '谈论爱好以及空闲时间与周末的安排。',
    ),
    units: [
      unit(
        'Talking About Hobbies',
        'Nói sở thích',
        '趣味について話す',
        '취미에 대해 말하기',
        '谈论爱好',
        [
          lessonSlot(1, L(
              'What You Like Doing in Your Free Time',
              'Thích làm gì lúc rảnh',
              '暇なときに何をするのが好きか',
              '여가 시간에 좋아하는 일',
              '空闲时喜欢做什么',
            )),
          lessonSlot(2, L(
              'How Often (Often / Sometimes)',
              'Mức độ (hay / thỉnh thoảng)',
              '頻度（よく・時々）',
              '빈도 (자주/가끔)',
              '频率（经常/偶尔）',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Talking About the Weekend',
        'Nói về cuối tuần',
        '週末について話す',
        '주말에 대해 말하기',
        '谈论周末',
        [
          lessonSlot(1, L(
              'Tell What You Did on the Weekend',
              'Kể cuối tuần làm gì',
              '週末にしたことを話す',
              '주말에 한 일 이야기하기',
              '讲述周末做的事',
            )),
          lessonSlot(2, L(
              'Ask & Answer About Plans',
              'Hỏi & đáp kế hoạch',
              '予定について尋ねて答える',
              '계획 묻고 답하기',
              '询问并回答计划',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m14_meetups_invitations',
    order: 14,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Making Plans & Invitations',
      'Hẹn gặp & rủ rê',
      '約束と誘い',
      '약속과 초대',
      '约定与邀约',
    ),
    goalByNative: L(
      'Invite someone out, confirm plans, and handle rescheduling.',
      'Rủ ai đó đi chơi, chốt hẹn và xử lý khi cần đổi hẹn.',
      '人を誘い、約束を決め、変更にも対応します。',
      '사람을 초대하고 약속을 정하며 일정 변경에도 대응합니다.',
      '邀请他人、确定约会并处理改期。',
    ),
    units: [
      unit(
        'Inviting Someone Out',
        'Rủ đi chơi',
        '遊びに誘う',
        '놀러 가자고 하기',
        '邀请出去玩',
        [
          lessonSlot(1, L(
              'Ask "Do You Want to Go...?"',
              'Rủ "đi... không?"',
              '「〜に行きませんか」と誘う',
              '"~하러 갈래요?" 묻기',
              '邀约"要不要一起去..."',
            )),
          lessonSlot(2, L(
              'Accept or Politely Decline',
              'Nhận / từ chối khéo',
              '受ける・上手に断る',
              '수락하거나 정중히 거절하기',
              '接受或委婉拒绝',
            )),
          lessonSlot(3, L(
              'Confirm Time & Place',
              'Chốt giờ & chỗ',
              '時間と場所を決める',
              '시간과 장소 정하기',
              '确定时间与地点',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Changing Plans',
        'Đổi hẹn',
        '約束の変更',
        '약속 변경하기',
        '更改约定',
        [
          lessonSlot(1, L(
              'Ask to Reschedule or Postpone',
              'Xin đổi / hoãn',
              '変更や延期をお願いする',
              '변경/연기 요청하기',
              '请求改期或延后',
            )),
          lessonSlot(2, L(
              'Apologize for Being Late',
              'Xin lỗi đến muộn',
              '遅刻を謝る',
              '늦은 것에 대해 사과하기',
              '为迟到道歉',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m15_description_feelings',
    order: 15,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Describing Things & Feelings',
      'Mô tả & cảm nghĩ',
      '描写と感想',
      '묘사와 느낌',
      '描述与感受',
    ),
    goalByNative: L(
      'Describe objects and places, and express simple feelings.',
      'Mô tả đồ vật, nơi chốn và nói cảm nghĩ đơn giản.',
      'ものや場所を描写し、簡単な感想を伝えます。',
      '물건과 장소를 묘사하고 간단한 느낌을 말합니다.',
      '描述物品与地点并表达简单感受。',
    ),
    units: [
      unit(
        'Describing Objects & Places',
        'Tả đồ vật / nơi chốn',
        'ものや場所を描写する',
        '물건과 장소 묘사하기',
        '描述物品与地点',
        [
          lessonSlot(1, L(
              'Big/Small, New/Old, Pretty',
              'To/nhỏ, mới/cũ, đẹp',
              '大きい・小さい、新しい・古い、きれい',
              '크다/작다, 새것/헌것, 예쁘다',
              '大/小、新/旧、漂亮',
            )),
          lessonSlot(2, L(
              'Simple Comparisons',
              'So sánh đơn giản',
              '簡単な比較',
              '간단한 비교',
              '简单比较',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'Expressing Feelings',
        'Nói cảm nghĩ',
        '感想を伝える',
        '느낌 말하기',
        '表达感受',
        [
          lessonSlot(1, L(
              'Happy / Tired / Like It / Bored',
              'Vui / mệt / thích / chán',
              'うれしい・疲れた・好き・つまらない',
              '기쁘다/피곤하다/좋아하다/지루하다',
              '开心/累/喜欢/无聊',
            )),
          lessonSlot(2, L(
              'Simple Impressions & Compliments',
              'Ấn tượng & khen đơn giản',
              '簡単な感想とほめ言葉',
              '간단한 인상과 칭찬',
              '简单印象与夸奖',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
  {
    moduleId: 'daily_life_m16_health_problems',
    order: 16,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: 'daily_life_basic',
    titleByNative: L(
      'Health & When Something Goes Wrong',
      'Sức khỏe & khi gặp rắc rối',
      '健康とトラブル',
      '건강과 문제 상황',
      '健康与突发状况',
    ),
    goalByNative: L(
      'Talk about your health and handle everyday problems.',
      'Nói về sức khỏe và xử lý khi gặp rắc rối trong đời sống.',
      '健康について話し、日常のトラブルに対応します。',
      '건강에 대해 말하고 일상 속 문제 상황에 대응합니다.',
      '谈论健康并应对日常生活中的突发状况。',
    ),
    units: [
      unit(
        'Talking About Health',
        'Nói về sức khỏe',
        '健康について話す',
        '건강에 대해 말하기',
        '谈论健康',
        [
          lessonSlot(1, L(
              'Say You\'re Tired or Where It Hurts',
              'Nói mệt / đau ở đâu',
              '疲れていることやどこが痛いか伝える',
              '피곤하거나 아픈 곳 말하기',
              '说累了或哪里疼',
            )),
          lessonSlot(2, L(
              'Buy Medicine or Ask for Time Off',
              'Mua thuốc / xin nghỉ',
              '薬を買う・休みをお願いする',
              '약 사기 / 휴가 요청하기',
              '买药或请假',
            )),
        ],
        { order: 1, tier: 'basic' },
      ),
      unit(
        'When Something Goes Wrong',
        'Khi gặp rắc rối',
        'トラブルにあったとき',
        '문제가 생겼을 때',
        '遇到麻烦时',
        [
          lessonSlot(1, L(
              'Ask for Help',
              'Nhờ giúp đỡ',
              '助けを求める',
              '도움 요청하기',
              '请求帮助',
            )),
          lessonSlot(2, L(
              'Report a Lost or Forgotten Item',
              'Báo mất đồ / quên đồ',
              '物をなくした・忘れたことを伝える',
              '물건을 잃어버리거나 두고 온 것 신고하기',
              '报告丢失或遗忘物品',
            )),
        ],
        { order: 2, tier: 'basic' },
      ),
    ],
  },
];


const VALID_TIERS = new Set(["basic", "intermediate", "advanced"]);

/**
 * Structural shape check for the 16-module × 3-tier blueprint (owner
 * decision, 2026-07-19). An EMPTY `units: []` on a tier (Trung cấp/Cao cấp,
 * every module) is VALID — content is written in later, separately
 * authorized tasks. What this still enforces hard (throws on violation):
 * exactly 16 modules, unique module order 1–16, unique moduleId per module,
 * and — for whatever units/lessons DO exist — every `order` field is an
 * explicit positive integer, unique within its own parent (never inferred
 * from array position), and every unit's `tier` is one of
 * basic/intermediate/advanced.
 */
export function assertDailyLifeBlueprintShape() {
  if (DAILY_LIFE_MODULES.length !== 16) {
    throw new Error(`Expected 16 Daily Life modules, got ${DAILY_LIFE_MODULES.length}`);
  }
  const seenTopicOrders = new Set();
  const seenModuleIds = new Set();
  let lessonCount = 0;
  let unitCount = 0;
  for (const mod of DAILY_LIFE_MODULES) {
    if (!Number.isInteger(mod.order) || mod.order < 1 || mod.order > 16) {
      throw new Error(`${mod.moduleId}: module 'order' must be an integer 1–16, got ${mod.order}`);
    }
    if (seenTopicOrders.has(mod.order)) {
      throw new Error(`Duplicate topic order ${mod.order} (moduleId=${mod.moduleId})`);
    }
    seenTopicOrders.add(mod.order);
    if (!mod.moduleId) {
      throw new Error(`Topic order ${mod.order}: missing moduleId`);
    }
    if (seenModuleIds.has(mod.moduleId)) {
      throw new Error(`Duplicate moduleId '${mod.moduleId}'`);
    }
    seenModuleIds.add(mod.moduleId);

    const seenUnitOrders = new Set();
    for (const u of mod.units ?? []) {
      unitCount += 1;
      if (!Number.isInteger(u.order) || u.order < 1) {
        throw new Error(`${mod.moduleId}: unit missing/invalid explicit numeric 'order'`);
      }
      if (seenUnitOrders.has(u.order)) {
        throw new Error(`${mod.moduleId}: duplicate unit order ${u.order}`);
      }
      seenUnitOrders.add(u.order);
      if (!VALID_TIERS.has(u.tier)) {
        throw new Error(`${mod.moduleId} unit ${u.order}: invalid tier '${u.tier}'`);
      }
      const seenLessonOrders = new Set();
      for (const l of u.lessons ?? []) {
        if (!Number.isInteger(l.order) || l.order < 1) {
          throw new Error(`${mod.moduleId} unit ${u.order}: lesson slot missing/invalid explicit numeric 'order'`);
        }
        if (seenLessonOrders.has(l.order)) {
          throw new Error(`${mod.moduleId} unit ${u.order}: duplicate lesson order ${l.order}`);
        }
        seenLessonOrders.add(l.order);
        lessonCount += 1;
      }
    }
  }
  return { topicCount: DAILY_LIFE_MODULES.length, unitCount, lessonSlotCount: lessonCount };
}

/**
 * Build one course pack per module for a learning language. Unified loop
 * (owner decision, 2026-07-19): every module — including Module 1 — runs
 * through the same code path. Per lesson slot, `resolveApprovedFiveCardsLesson`
 * is tried first (real, ready content — today only the Golden Lesson
 * resolves); when it returns `null`, a named BLUEPRINT/placeholder lesson is
 * built instead (playable=false, placeholder exercises, no real Q&A
 * content). This replaces the prior `mod.order === 1` special case that
 * routed Module 1 through a separate function
 * (`buildReadyModuleOne`, now superseded/unreferenced) and silently skipped
 * any Module 1 lesson slot with no registry match — the unified loop never
 * skips a slot: it always builds either real or placeholder content, so a
 * registry key that stops resolving (a typo, a reordered lesson) fails
 * loudly instead of silently dropping the Golden Lesson from the generated
 * output.
 */
export function buildDailyLifeCourses(languageCode, { makeCourse, makeLesson }) {
  assertDailyLifeBlueprintShape();
  const packs = [];

  for (const mod of DAILY_LIFE_MODULES) {
    const moduleOrder = 10 + Number(mod.order); // after Core Foundation (0+)
    const courseId = `${languageCode}-daily_life-m${String(mod.order).padStart(2, "0")}`;
    const trackId = `${languageCode}-daily_life`;
    const units = [];
    const lessons = [];

    // unitOrder/lessonOrder come from the EXPLICIT `order` field on the data
    // (see the `unit()` helper), never from array position — this is the
    // ID-stability fix (owner decision, 2026-07-18): reordering entries in
    // DAILY_LIFE_MODULES/units[] must never silently renumber an id.
    //
    // A lesson slot meant to resolve through FIVE_CARDS_REGISTRY (the Golden
    // Lesson today) is a bare `{ order }` object in the source data; every
    // other lesson slot is a `lessonSlot(order, titleByNative)` object
    // (autoLesson()-shaped: titleByNative/goalByNative/situationByNative/
    // canSayByNative).
    for (const unitDef of mod.units) {
      const unitOrder = unitDef.order;
      const unitId = `${languageCode}-daily_life-m${String(mod.order).padStart(2, "0")}-u${unitOrder}`;
      const unitLevel = TIER_LEVELS[unitDef.tier];
      const lessonIds = [];

      for (const lessonDef of unitDef.lessons) {
        const lessonOrder = lessonDef.order;
        const lessonId = `${unitId}-l${lessonOrder}`;
        lessonIds.push(lessonId);

        const approvedLesson = resolveApprovedFiveCardsLesson(languageCode, lessonId, {
          unitId,
          lessonOrder,
          moduleId: mod.moduleId,
          makeLesson,
        });
        if (approvedLesson) {
          lessons.push(approvedLesson);
          continue;
        }
        if (!lessonDef.titleByNative) {
          throw new Error(
            `${mod.moduleId} unit ${unitOrder} lesson ${lessonOrder} ('${lessonId}'): no FIVE_CARDS_REGISTRY ` +
            `entry for this language and no titleByNative placeholder — this lesson slot resolved to nothing. ` +
            `A bare { order } slot must have a matching FIVE_CARDS_REGISTRY entry; every other slot must be a ` +
            `lessonSlot(order, titleByNative).`,
          );
        }

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
            level: unitLevel.levelCode,
            levelRange: unitLevel.levelRange,
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
        levelCode: unitLevel.levelCode,
        levelRange: unitLevel.levelRange,
        tier: unitDef.tier,
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

    // A course is ready/playable when it contains at least one real,
    // playable lesson (today: only Module 1's Golden Lesson) — not merely
    // when it has units. Every module now has named Cơ bản units full of
    // placeholder lessons, so "has units" alone no longer distinguishes
    // real content from a fully-placeholder module (owner decision,
    // 2026-07-19; this is the ID/status fix required by unifying Module 1
    // into this same loop).
    const hasReadyLesson = lessons.some((l) => l.playable === true);

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
        title: `${resolveLanguageDisplayName(languageCode, "en")} · ${DAILY_LIFE_COURSE_META.titleByNative.en} · ${mod.titleByNative.en}`,
        titleVi: `${resolveLanguageDisplayName(languageCode, "vi")} · ${DAILY_LIFE_COURSE_META.titleByNative.vi} · ${mod.titleByNative.vi}`,
        titleByNative: Object.fromEntries(
          NATIVE_CODES.map((code) => {
            const langLabel = resolveLanguageDisplayName(languageCode, code);
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
        contentStatus: hasReadyLesson ? "ready" : "blueprint",
        playable: hasReadyLesson,
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
