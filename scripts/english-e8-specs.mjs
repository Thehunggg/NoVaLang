/**
 * English Core Foundation Exercise 8 specs.
 * Same schema as Hiragana/Katakana plusListeningVocabularyChallenge.
 */

const firstLetterPrompt = {
  en: "Listen to the word and choose the first letter you hear.",
  vi: "Nghe từ và chọn chữ cái đầu tiên bạn nghe thấy.",
  ja: "単語を聞いて、最初に聞こえる文字を選びましょう。",
  ko: "단어를 듣고 처음 들리는 글자를 고르세요.",
  zh: "听单词，选择你听到的第一个字母。",
};

const firstOrTargetPrompt = {
  en: "Listen to the word and choose the first or target letter you hear.",
  vi: "Nghe từ và chọn chữ cái đầu tiên hoặc chữ cái mục tiêu bạn nghe thấy.",
  ja: "単語を聞いて、最初または目標の文字を選びましょう。",
  ko: "단어를 듣고 처음 또는 목표 글자를 고르세요.",
  zh: "听单词，选择你听到的第一个或目标字母。",
};

const firstLetterSubPrompt = {
  en: "Choose the first letter.",
  vi: "Chọn chữ cái đầu tiên.",
  ja: "最初の文字を選んでください。",
  ko: "첫 글자를 고르세요.",
  zh: "选择第一个字母。",
};

const firstOrTargetSubPrompt = {
  en: "Choose the first or target letter.",
  vi: "Chọn chữ cái đầu tiên hoặc chữ cái mục tiêu.",
  ja: "最初または目標の文字を選んでください。",
  ko: "처음 또는 목표 글자를 고르세요.",
  zh: "选择第一个或目标字母。",
};

function item(speechText, options, correctAnswer, reveal) {
  return { speechText, options, correctAnswer, reveal };
}

const VOWELS = ["A", "E", "I", "O", "U"];
const BCDFG = ["B", "C", "D", "F", "G"];
const HJKLM = ["H", "J", "K", "L", "M"];
const NPQRS = ["N", "P", "Q", "R", "S"];
const TVWXYZ = ["T", "V", "W", "X", "Y", "Z"];
const CHECKPOINT = ["A", "B", "C", "D", "M", "P", "T", "W", "Z"];

export const ENGLISH_E8_SPECS = {
  "en-alphabet-u1-l1": {
    listeningTargetMode: "first",
    prompt: firstLetterPrompt,
    subPrompt: firstLetterSubPrompt,
    items: [
      item("apple", VOWELS, "A", {
        vi: "apple — quả táo",
        en: "apple — apple",
        ja: "apple — りんご",
        ko: "apple — 사과",
        zh: "apple — 苹果",
      }),
      item("egg", VOWELS, "E", {
        vi: "egg — quả trứng",
        en: "egg — egg",
        ja: "egg — 卵",
        ko: "egg — 달걀",
        zh: "egg — 鸡蛋",
      }),
      item("ice", VOWELS, "I", {
        vi: "ice — đá",
        en: "ice — ice",
        ja: "ice — 氷",
        ko: "ice — 얼음",
        zh: "ice — 冰",
      }),
      item("orange", VOWELS, "O", {
        vi: "orange — quả cam",
        en: "orange — orange",
        ja: "orange — オレンジ",
        ko: "orange — 오렌지",
        zh: "orange — 橙子",
      }),
      item("umbrella", VOWELS, "U", {
        vi: "umbrella — cái ô",
        en: "umbrella — umbrella",
        ja: "umbrella — 傘",
        ko: "umbrella — 우산",
        zh: "umbrella — 伞",
      }),
    ],
  },
  "en-alphabet-u1-l2": {
    listeningTargetMode: "first",
    prompt: firstLetterPrompt,
    subPrompt: firstLetterSubPrompt,
    items: [
      item("book", BCDFG, "B", {
        vi: "book — sách",
        en: "book — book",
        ja: "book — 本",
        ko: "book — 책",
        zh: "book — 书",
      }),
      item("cat", BCDFG, "C", {
        vi: "cat — mèo",
        en: "cat — cat",
        ja: "cat — 猫",
        ko: "cat — 고양이",
        zh: "cat — 猫",
      }),
      item("dog", BCDFG, "D", {
        vi: "dog — chó",
        en: "dog — dog",
        ja: "dog — 犬",
        ko: "dog — 개",
        zh: "dog — 狗",
      }),
      item("fish", BCDFG, "F", {
        vi: "fish — cá",
        en: "fish — fish",
        ja: "fish — 魚",
        ko: "fish — 물고기",
        zh: "fish — 鱼",
      }),
      item("game", BCDFG, "G", {
        vi: "game — trò chơi",
        en: "game — game",
        ja: "game — ゲーム",
        ko: "game — 게임",
        zh: "game — 游戏",
      }),
    ],
  },
  "en-alphabet-u1-l3": {
    listeningTargetMode: "first",
    prompt: firstLetterPrompt,
    subPrompt: firstLetterSubPrompt,
    items: [
      item("hotel", HJKLM, "H", {
        vi: "hotel — khách sạn",
        en: "hotel — hotel",
        ja: "hotel — ホテル",
        ko: "hotel — 호텔",
        zh: "hotel — 酒店",
      }),
      item("juice", HJKLM, "J", {
        vi: "juice — nước ép",
        en: "juice — juice",
        ja: "juice — ジュース",
        ko: "juice — 주스",
        zh: "juice — 果汁",
      }),
      item("key", HJKLM, "K", {
        vi: "key — chìa khóa",
        en: "key — key",
        ja: "key — 鍵",
        ko: "key — 열쇠",
        zh: "key — 钥匙",
      }),
      item("lemon", HJKLM, "L", {
        vi: "lemon — quả chanh",
        en: "lemon — lemon",
        ja: "lemon — レモン",
        ko: "lemon — 레몬",
        zh: "lemon — 柠檬",
      }),
      item("milk", HJKLM, "M", {
        vi: "milk — sữa",
        en: "milk — milk",
        ja: "milk — 牛乳",
        ko: "milk — 우유",
        zh: "milk — 牛奶",
      }),
    ],
  },
  "en-alphabet-u1-l4": {
    listeningTargetMode: "first",
    prompt: firstLetterPrompt,
    subPrompt: firstLetterSubPrompt,
    items: [
      item("notebook", NPQRS, "N", {
        vi: "notebook — vở / sổ ghi chép",
        en: "notebook — notebook",
        ja: "notebook — ノート",
        ko: "notebook — 노트",
        zh: "notebook — 笔记本",
      }),
      item("pen", NPQRS, "P", {
        vi: "pen — bút",
        en: "pen — pen",
        ja: "pen — ペン",
        ko: "pen — 펜",
        zh: "pen — 笔",
      }),
      item("queen", NPQRS, "Q", {
        vi: "queen — nữ hoàng",
        en: "queen — queen",
        ja: "queen — 女王",
        ko: "queen — 여왕",
        zh: "queen — 女王",
      }),
      item("robot", NPQRS, "R", {
        vi: "robot — robot",
        en: "robot — robot",
        ja: "robot — ロボット",
        ko: "robot — 로봇",
        zh: "robot — 机器人",
      }),
      item("soccer", NPQRS, "S", {
        vi: "soccer — bóng đá",
        en: "soccer — soccer",
        ja: "soccer — サッカー",
        ko: "soccer — 축구",
        zh: "soccer — 足球",
      }),
    ],
  },
  "en-alphabet-u1-l5": {
    listeningTargetMode: "target",
    prompt: firstOrTargetPrompt,
    subPrompt: firstOrTargetSubPrompt,
    items: [
      item("taxi", TVWXYZ, "T", {
        vi: "taxi — taxi",
        en: "taxi — taxi",
        ja: "taxi — タクシー",
        ko: "taxi — 택시",
        zh: "taxi — 出租车",
      }),
      item("video", TVWXYZ, "V", {
        vi: "video — video",
        en: "video — video",
        ja: "video — ビデオ",
        ko: "video — 비디오",
        zh: "video — 视频",
      }),
      item("web", TVWXYZ, "W", {
        vi: "web — web",
        en: "web — web",
        ja: "web — ウェブ",
        ko: "web — 웹",
        zh: "web — 网页",
      }),
      item("box", TVWXYZ, "X", {
        vi: "box — hộp",
        en: "box — box",
        ja: "box — 箱",
        ko: "box — 상자",
        zh: "box — 盒子",
      }),
      item("yogurt", TVWXYZ, "Y", {
        vi: "yogurt — sữa chua",
        en: "yogurt — yogurt",
        ja: "yogurt — ヨーグルト",
        ko: "yogurt — 요구르트",
        zh: "yogurt — 酸奶",
      }),
      item("zoo", TVWXYZ, "Z", {
        vi: "zoo — sở thú",
        en: "zoo — zoo",
        ja: "zoo — 動物園",
        ko: "zoo — 동물원",
        zh: "zoo — 动物园",
      }),
    ],
  },
  "en-alphabet-u1-l6": {
    listeningTargetMode: "first",
    prompt: firstLetterPrompt,
    subPrompt: firstLetterSubPrompt,
    items: [
      item("apple", CHECKPOINT, "A", {
        vi: "apple — quả táo",
        en: "apple — apple",
        ja: "apple — りんご",
        ko: "apple — 사과",
        zh: "apple — 苹果",
      }),
      item("book", CHECKPOINT, "B", {
        vi: "book — sách",
        en: "book — book",
        ja: "book — 本",
        ko: "book — 책",
        zh: "book — 书",
      }),
      item("cat", CHECKPOINT, "C", {
        vi: "cat — mèo",
        en: "cat — cat",
        ja: "cat — 猫",
        ko: "cat — 고양이",
        zh: "cat — 猫",
      }),
      item("dog", CHECKPOINT, "D", {
        vi: "dog — chó",
        en: "dog — dog",
        ja: "dog — 犬",
        ko: "dog — 개",
        zh: "dog — 狗",
      }),
      item("milk", CHECKPOINT, "M", {
        vi: "milk — sữa",
        en: "milk — milk",
        ja: "milk — 牛乳",
        ko: "milk — 우유",
        zh: "milk — 牛奶",
      }),
      item("pen", CHECKPOINT, "P", {
        vi: "pen — bút",
        en: "pen — pen",
        ja: "pen — ペン",
        ko: "pen — 펜",
        zh: "pen — 笔",
      }),
      item("taxi", CHECKPOINT, "T", {
        vi: "taxi — taxi",
        en: "taxi — taxi",
        ja: "taxi — タクシー",
        ko: "taxi — 택시",
        zh: "taxi — 出租车",
      }),
      item("web", CHECKPOINT, "W", {
        vi: "web — web",
        en: "web — web",
        ja: "web — ウェブ",
        ko: "web — 웹",
        zh: "web — 网页",
      }),
      item("zoo", CHECKPOINT, "Z", {
        vi: "zoo — sở thú",
        en: "zoo — zoo",
        ja: "zoo — 動物園",
        ko: "zoo — 동물원",
        zh: "zoo — 动物园",
      }),
    ],
  },
};
