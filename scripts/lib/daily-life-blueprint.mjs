/**
 * Daily Life Communication curriculum blueprint (source of truth).
 * Skeleton only — no real exercise content / questions / answers.
 */
import { buildReadyModuleOne } from '../content/daily-life/module-1/helpers.mjs';
import { resolveLanguageDisplayName } from './language-names.mjs';

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
 * 15-topic × 3-tier restructure (owner decision, 2026-07-18; replaces the
 * prior 10-module × 8-unit × 3-lesson blueprint entirely). Each entry below
 * is one TOPIC (`order` 1–15, matches the approved topic list). A topic's
 * `units[]` holds actual unit blocks, each tagged with an explicit `tier`
 * ('basic' | 'intermediate' | 'advanced' — Cơ bản/Trung cấp/Cao cấp); a tier
 * is its own unit block, never a sub-division inside one unit. An empty
 * `units: []` is a VALID, intentional state — it means no content has been
 * written for that topic yet, not an error. Only Topic 1 / Cơ bản has a real
 * unit right now, containing the Golden Reference Lesson (ADR-008) — its
 * `moduleId` and the resulting lesson id (`ja-daily_life-m01-u1-l1`) are
 * UNCHANGED from before this restructure (owner decision: keep the ID
 * string, reinterpret "module" as "topic 1"). Topics 2–15 intentionally have
 * no units yet; content is written in later, separately authorized tasks.
 * @type {Array<object>}
 */
export const DAILY_LIFE_MODULES = [
  {
    moduleId: "daily_life_m01_basic_social_survival",
    order: 1,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Greetings & Getting Acquainted",
      "Chào hỏi & làm quen",
      "あいさつと知り合い",
      "인사와 안면 트기",
      "问候与结识",
    ),
    goalByNative: L(
      "Learn greetings, self-introduction, and basic first-meeting conversation.",
      "Học chào hỏi, tự giới thiệu và hội thoại cơ bản khi gặp lần đầu.",
      "あいさつ、自己紹介、初対面での基本会話を学びます。",
      "인사, 자기소개, 첫 만남에서의 기본 회화를 배웁니다.",
      "学习问候、自我介绍与初次见面的基础对话。",
    ),
    units: [
      unit(
        "Greetings and names",
        "Chào và nói tên",
        "あいさつと名前",
        "인사와 이름",
        "问候与姓名",
        [{ order: 1 }],
        { order: 1, tier: "basic" },
      ),
    ],
  },
  {
    moduleId: "daily_life_topic02_self_family",
    order: 2,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Myself & Family", "Bản thân & gia đình", "自分と家族", "나와 가족", "自己与家庭"),
    goalByNative: L(
      "Talk about yourself and your family.",
      "Nói về bản thân và gia đình.",
      "自分自身と家族について話します。",
      "자신과 가족에 대해 이야기합니다.",
      "谈论自己与家人。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic03_objects_demonstratives",
    order: 3,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Objects & Pointing Things Out",
      "Đồ vật & chỉ định",
      "ものと指示表現",
      "물건과 지시 표현",
      "物品与指示表达",
    ),
    goalByNative: L(
      "Identify and point out everyday objects.",
      "Gọi tên và chỉ vào các đồ vật hằng ngày.",
      "身の回りのものを特定し、指し示します。",
      "일상 물건을 가리키고 이름을 말합니다.",
      "识别并指出日常物品。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic04_numbers_prices_money",
    order: 4,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Numbers, Prices & Money",
      "Số đếm, giá cả, tiền",
      "数字・値段・お金",
      "숫자, 가격, 돈",
      "数字、价格与金钱",
    ),
    goalByNative: L(
      "Count, ask prices, and handle money in daily situations.",
      "Đếm số, hỏi giá và dùng tiền trong tình huống hằng ngày.",
      "数を数え、値段を尋ね、日常でお金を扱います。",
      "수를 세고 가격을 묻고 일상에서 돈을 씁니다.",
      "数数、问价并在日常情境中使用金钱。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic05_time_date",
    order: 5,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Time & Dates", "Thời gian & ngày tháng", "時間と日付", "시간과 날짜", "时间与日期"),
    goalByNative: L(
      "Tell time and talk about dates and schedules.",
      "Nói giờ và nói về ngày tháng, lịch trình.",
      "時間を言い、日付や予定について話します。",
      "시간을 말하고 날짜와 일정에 대해 이야기합니다.",
      "报时并谈论日期与日程。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic06_shopping",
    order: 6,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Shopping", "Mua sắm", "買い物", "쇼핑", "购物"),
    goalByNative: L(
      "Shop for everyday items and handle simple transactions.",
      "Mua đồ hằng ngày và thực hiện giao dịch đơn giản.",
      "日用品を買い、簡単な買い物のやり取りをします。",
      "일상용품을 사고 간단한 거래를 합니다.",
      "购买日常用品并完成简单交易。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic07_food_ordering",
    order: 7,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Eating & Ordering Food", "Ăn uống & gọi món", "食事と注文", "식사와 주문", "用餐与点菜"),
    goalByNative: L(
      "Order food and talk about meals.",
      "Gọi món và nói về bữa ăn.",
      "料理を注文し、食事について話します。",
      "음식을 주문하고 식사에 대해 이야기합니다.",
      "点菜并谈论用餐。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic08_directions_places",
    order: 8,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Directions & Places", "Chỉ đường & nơi chốn", "道案内と場所", "길 안내와 장소", "问路与地点"),
    goalByNative: L(
      "Ask for and give directions to places.",
      "Hỏi đường và chỉ đường đến nơi cần đến.",
      "場所への行き方を尋ね、案内します。",
      "장소로 가는 길을 묻고 안내합니다.",
      "问路并为他人指路。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic09_transport_trains",
    order: 9,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Getting Around & Trains", "Đi lại & tàu điện", "移動と電車", "이동과 지하철", "出行与电车"),
    goalByNative: L(
      "Get around by train and other everyday transport.",
      "Đi lại bằng tàu điện và các phương tiện hằng ngày.",
      "電車など日常の交通手段で移動します。",
      "지하철 등 일상 교통수단으로 이동합니다.",
      "乘坐电车等日常交通工具出行。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic10_home_daily_living",
    order: 10,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Home & Daily Living",
      "Nhà cửa & đời sống hàng ngày",
      "家と日常生活",
      "집과 일상생활",
      "家居与日常生活",
    ),
    goalByNative: L(
      "Talk about your home and everyday routines.",
      "Nói về nhà cửa và sinh hoạt hằng ngày.",
      "自分の家や日常の暮らしについて話します。",
      "집과 일상생활에 대해 이야기합니다.",
      "谈论住所与日常生活。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic11_hobbies_free_time",
    order: 11,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Hobbies & Free Time",
      "Sở thích & thời gian rảnh",
      "趣味と自由時間",
      "취미와 여가",
      "爱好与空闲时间",
    ),
    goalByNative: L(
      "Talk about hobbies and how you spend free time.",
      "Nói về sở thích và cách dùng thời gian rảnh.",
      "趣味や自由時間の過ごし方について話します。",
      "취미와 여가 시간에 대해 이야기합니다.",
      "谈论爱好与空闲时间的安排。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic12_meetups_invitations",
    order: 12,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L("Making Plans & Invitations", "Hẹn gặp & rủ rê", "約束と誘い", "약속과 초대", "约定与邀约"),
    goalByNative: L(
      "Make plans, invite someone, and arrange to meet.",
      "Hẹn gặp, rủ ai đó đi cùng và sắp xếp gặp mặt.",
      "予定を立て、人を誘い、会う約束をします。",
      "약속을 정하고 사람을 초대하며 만남을 준비합니다.",
      "约定计划、邀请他人并安排见面。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic13_description_feelings",
    order: 13,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Describing Things & Feelings",
      "Mô tả & cảm nghĩ",
      "描写と感想",
      "묘사와 느낌",
      "描述与感受",
    ),
    goalByNative: L(
      "Describe people, things, and how you feel about them.",
      "Mô tả người, sự vật và cảm nghĩ về chúng.",
      "人やものを描写し、それについての感想を伝えます。",
      "사람과 사물을 묘사하고 느낌을 말합니다.",
      "描述人与事物并表达感受。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic14_health_problems",
    order: 14,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Health & When Something Goes Wrong",
      "Sức khỏe & khi gặp vấn đề",
      "健康とトラブル",
      "건강과 문제 상황",
      "健康与突发状况",
    ),
    goalByNative: L(
      "Talk about health and handle everyday problems.",
      "Nói về sức khỏe và xử lý các vấn đề thường gặp.",
      "健康について話し、日常のトラブルに対応します。",
      "건강에 대해 말하고 일상 속 문제 상황에 대응합니다.",
      "谈论健康并应对日常突发状况。",
    ),
    units: [],
  },
  {
    moduleId: "daily_life_topic15_thanks_apology_politeness",
    order: 15,
    levelRange: TIER_LEVELS.basic.levelRange,
    levelCode: TIER_LEVELS.basic.levelCode,
    placementTag: "daily_life_basic",
    titleByNative: L(
      "Thanks, Apologies & Politeness",
      "Cảm ơn, xin lỗi, lịch sự",
      "感謝・謝罪・丁寧さ",
      "감사, 사과, 공손함",
      "感谢、道歉与礼貌",
    ),
    goalByNative: L(
      "Thank, apologize, and speak politely in daily situations.",
      "Cảm ơn, xin lỗi và nói lịch sự trong tình huống hằng ngày.",
      "感謝や謝罪を伝え、日常で丁寧に話します。",
      "감사와 사과를 표현하고 일상에서 공손하게 말합니다.",
      "在日常情境中表达感谢、道歉并礼貌交流。",
    ),
    units: [],
  },
];

const VALID_TIERS = new Set(["basic", "intermediate", "advanced"]);

/**
 * Structural shape check for the 15-topic × 3-tier blueprint (owner
 * decision, 2026-07-18). Unlike the old 10×8×3 assertion, an EMPTY
 * `units: []` on a topic, or a topic missing a tier entirely, is VALID —
 * content is written in later, separately authorized tasks. What this still
 * enforces hard (throws on violation, same as before): exactly 15 topics,
 * unique topic order 1–15, unique moduleId per topic, and — for whatever
 * units/lessons DO exist — every `order` field is an explicit positive
 * integer, unique within its own parent (never inferred from array
 * position), and every unit's `tier` is one of basic/intermediate/advanced.
 */
export function assertDailyLifeBlueprintShape() {
  if (DAILY_LIFE_MODULES.length !== 15) {
    throw new Error(`Expected 15 Daily Life topics, got ${DAILY_LIFE_MODULES.length}`);
  }
  const seenTopicOrders = new Set();
  const seenModuleIds = new Set();
  let lessonCount = 0;
  let unitCount = 0;
  for (const mod of DAILY_LIFE_MODULES) {
    if (!Number.isInteger(mod.order) || mod.order < 1 || mod.order > 15) {
      throw new Error(`${mod.moduleId}: topic 'order' must be an integer 1–15, got ${mod.order}`);
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

    // unitOrder/lessonOrder come from the EXPLICIT `order` field on the data
    // (see the `unit()` helper), never from array position — this is the
    // ID-stability fix (owner decision, 2026-07-18): reordering entries in
    // DAILY_LIFE_MODULES/units[] must never silently renumber an id.
    //
    // NOTE for future content authors: this loop builds BLUEPRINT/placeholder
    // lessons and expects each `lessonDef` to be an `autoLesson()`-shaped
    // object (titleByNative/goalByNative/situationByNative/canSayByNative).
    // A lesson slot meant to resolve through FIVE_CARDS_REGISTRY (like Topic
    // 1's Golden slot) is NOT built here — it is built by
    // `buildReadyModuleOne`, which only needs `{ order }`. Do not mix the two
    // shapes in the same `unit(...)` lessons array.
    for (const unitDef of mod.units) {
      const unitOrder = unitDef.order;
      const unitId = `${languageCode}-daily_life-m${String(mod.order).padStart(2, "0")}-u${unitOrder}`;
      const unitLevel = TIER_LEVELS[unitDef.tier];
      const lessonIds = [];

      for (const lessonDef of unitDef.lessons) {
        const lessonOrder = lessonDef.order;
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
