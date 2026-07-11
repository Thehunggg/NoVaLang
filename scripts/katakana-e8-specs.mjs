/**
 * Katakana Foundation Exercise 8 specs.
 * Same schema as Hiragana plusListeningVocabularyChallenge (subQuestions + reveal).
 */

const firstCharPrompt = {
  en: "Listen to the word and choose the first Katakana character you hear.",
  vi: "Nghe từ và chọn chữ Katakana đầu tiên bạn nghe thấy.",
  ja: "単語を聞いて、最初に聞こえるカタカナを選びましょう。",
  ko: "단어를 듣고 처음 들리는 가타카나를 고르세요.",
  zh: "听单词，选择你听到的第一个片假名。",
};

const targetCharPrompt = {
  en: "Listen to the word or phrase and choose the target Katakana you hear.",
  vi: "Nghe từ/cụm từ và chọn chữ Katakana mục tiêu bạn nghe thấy.",
  ja: "単語やフレーズを聞いて、聞こえたカタカナを選びましょう。",
  ko: "단어나 표현을 듣고 들리는 가타카나를 고르세요.",
  zh: "听单词或短语，选择你听到的目标片假名。",
};

const firstCharSubPrompt = {
  en: "Choose the first Katakana character.",
  vi: "Chọn chữ Katakana đầu tiên.",
  ja: "最初のカタカナを選んでください。",
  ko: "첫 가타카나를 고르세요.",
  zh: "选择第一个片假名。",
};

const targetCharSubPrompt = {
  en: "Choose the target Katakana character.",
  vi: "Chọn chữ Katakana mục tiêu.",
  ja: "目標のカタカナを選んでください。",
  ko: "목표 가타카나를 고르세요.",
  zh: "选择目标片假名。",
};

function item(speechText, options, correctAnswer, reveal) {
  return { speechText, options, correctAnswer, reveal };
}

export const KATAKANA_E8_SPECS = {
  "ja-katakana-u4-l1": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("アニメ", ["ア", "イ", "ウ", "エ", "オ"], "ア", {
        vi: "アニメ — phim hoạt hình / anime",
        en: "アニメ — anime",
        ja: "アニメ — アニメ",
        ko: "アニメ — 애니메이션",
        zh: "アニメ — 动漫",
      }),
      item("インターネット", ["ア", "イ", "ウ", "エ", "オ"], "イ", {
        vi: "インターネット — Internet",
        en: "インターネット — Internet",
        ja: "インターネット — インターネット",
        ko: "インターネット — 인터넷",
        zh: "インターネット — 互联网",
      }),
      item("ウェブ", ["ア", "イ", "ウ", "エ", "オ"], "ウ", {
        vi: "ウェブ — web",
        en: "ウェブ — web",
        ja: "ウェブ — ウェブ",
        ko: "ウェブ — 웹",
        zh: "ウェブ — 网页",
      }),
      item("エアコン", ["ア", "イ", "ウ", "エ", "オ"], "エ", {
        vi: "エアコン — điều hòa",
        en: "エアコン — air conditioner",
        ja: "エアコン — エアコン",
        ko: "エアコン — 에어컨",
        zh: "エアコン — 空调",
      }),
      item("オレンジ", ["ア", "イ", "ウ", "エ", "オ"], "オ", {
        vi: "オレンジ — quả cam / màu cam",
        en: "オレンジ — orange",
        ja: "オレンジ — オレンジ",
        ko: "オレンジ — 오렌지",
        zh: "オレンジ — 橙子 / 橙色",
      }),
    ],
  },
  "ja-katakana-u4-l2": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("カメラ", ["カ", "キ", "ク", "ケ", "コ"], "カ", {
        vi: "カメラ — máy ảnh / camera",
        en: "カメラ — camera",
        ja: "カメラ — カメラ",
        ko: "カメラ — 카메라",
        zh: "カメラ — 相机",
      }),
      item("キッチン", ["カ", "キ", "ク", "ケ", "コ"], "キ", {
        vi: "キッチン — nhà bếp",
        en: "キッチン — kitchen",
        ja: "キッチン — キッチン",
        ko: "キッチン — 주방",
        zh: "キッチン — 厨房",
      }),
      item("クラス", ["カ", "キ", "ク", "ケ", "コ"], "ク", {
        vi: "クラス — lớp học",
        en: "クラス — class",
        ja: "クラス — クラス",
        ko: "クラス — 수업 / 반",
        zh: "クラス — 班级 / 课程",
      }),
      item("ケーキ", ["カ", "キ", "ク", "ケ", "コ"], "ケ", {
        vi: "ケーキ — bánh kem",
        en: "ケーキ — cake",
        ja: "ケーキ — ケーキ",
        ko: "ケーキ — 케이크",
        zh: "ケーキ — 蛋糕",
      }),
      item("コーヒー", ["カ", "キ", "ク", "ケ", "コ"], "コ", {
        vi: "コーヒー — cà phê",
        en: "コーヒー — coffee",
        ja: "コーヒー — コーヒー",
        ko: "コーヒー — 커피",
        zh: "コーヒー — 咖啡",
      }),
    ],
  },
  "ja-katakana-u4-l3": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("サッカー", ["サ", "シ", "ス", "セ", "ソ"], "サ", {
        vi: "サッカー — bóng đá",
        en: "サッカー — soccer / football",
        ja: "サッカー — サッカー",
        ko: "サッカー — 축구",
        zh: "サッカー — 足球",
      }),
      item("シャツ", ["サ", "シ", "ス", "セ", "ソ"], "シ", {
        vi: "シャツ — áo sơ mi",
        en: "シャツ — shirt",
        ja: "シャツ — シャツ",
        ko: "シャツ — 셔츠",
        zh: "シャツ — 衬衫",
      }),
      item("スマホ", ["サ", "シ", "ス", "セ", "ソ"], "ス", {
        vi: "スマホ — điện thoại thông minh",
        en: "スマホ — smartphone",
        ja: "スマホ — スマホ",
        ko: "スマホ — 스마트폰",
        zh: "スマホ — 智能手机",
      }),
      item("セーター", ["サ", "シ", "ス", "セ", "ソ"], "セ", {
        vi: "セーター — áo len",
        en: "セーター — sweater",
        ja: "セーター — セーター",
        ko: "セーター — 스웨터",
        zh: "セーター — 毛衣",
      }),
      item("ソファ", ["サ", "シ", "ス", "セ", "ソ"], "ソ", {
        vi: "ソファ — ghế sofa",
        en: "ソファ — sofa",
        ja: "ソファ — ソファ",
        ko: "ソファ — 소파",
        zh: "ソファ — 沙发",
      }),
    ],
  },
  "ja-katakana-u4-l4": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("タクシー", ["タ", "チ", "ツ", "テ", "ト"], "タ", {
        vi: "タクシー — taxi",
        en: "タクシー — taxi",
        ja: "タクシー — タクシー",
        ko: "タクシー — 택시",
        zh: "タクシー — 出租车",
      }),
      item("チーズ", ["タ", "チ", "ツ", "テ", "ト"], "チ", {
        vi: "チーズ — phô mai",
        en: "チーズ — cheese",
        ja: "チーズ — チーズ",
        ko: "チーズ — 치즈",
        zh: "チーズ — 奶酪",
      }),
      item("ツアー", ["タ", "チ", "ツ", "テ", "ト"], "ツ", {
        vi: "ツアー — tour / chuyến tham quan",
        en: "ツアー — tour",
        ja: "ツアー — ツアー",
        ko: "ツアー — 투어",
        zh: "ツアー — 旅行团 / 游览",
      }),
      item("テレビ", ["タ", "チ", "ツ", "テ", "ト"], "テ", {
        vi: "テレビ — tivi",
        en: "テレビ — television",
        ja: "テレビ — テレビ",
        ko: "テレビ — 텔레비전",
        zh: "テレビ — 电视",
      }),
      item("トイレ", ["タ", "チ", "ツ", "テ", "ト"], "ト", {
        vi: "トイレ — nhà vệ sinh",
        en: "トイレ — toilet / restroom",
        ja: "トイレ — トイレ",
        ko: "トイレ — 화장실",
        zh: "トイレ — 洗手间",
      }),
    ],
  },
  "ja-katakana-u4-l5": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("ナイフ", ["ナ", "ニ", "ヌ", "ネ", "ノ"], "ナ", {
        vi: "ナイフ — dao",
        en: "ナイフ — knife",
        ja: "ナイフ — ナイフ",
        ko: "ナイフ — 나이프",
        zh: "ナイフ — 刀",
      }),
      item("ニュース", ["ナ", "ニ", "ヌ", "ネ", "ノ"], "ニ", {
        vi: "ニュース — tin tức",
        en: "ニュース — news",
        ja: "ニュース — ニュース",
        ko: "ニュース — 뉴스",
        zh: "ニュース — 新闻",
      }),
      item("ヌードル", ["ナ", "ニ", "ヌ", "ネ", "ノ"], "ヌ", {
        vi: "ヌードル — mì",
        en: "ヌードル — noodle",
        ja: "ヌードル — ヌードル",
        ko: "ヌードル — 누들 / 면",
        zh: "ヌードル — 面条",
      }),
      item("ネット", ["ナ", "ニ", "ヌ", "ネ", "ノ"], "ネ", {
        vi: "ネット — mạng / Internet",
        en: "ネット — net / internet",
        ja: "ネット — ネット",
        ko: "ネット — 인터넷 / 네트",
        zh: "ネット — 网络",
      }),
      item("ノート", ["ナ", "ニ", "ヌ", "ネ", "ノ"], "ノ", {
        vi: "ノート — vở / sổ ghi chép",
        en: "ノート — notebook",
        ja: "ノート — ノート",
        ko: "ノート — 노트",
        zh: "ノート — 笔记本",
      }),
    ],
  },
  "ja-katakana-u4-l6": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("ハンバーガー", ["ハ", "ヒ", "フ", "ヘ", "ホ"], "ハ", {
        vi: "ハンバーガー — hamburger",
        en: "ハンバーガー — hamburger",
        ja: "ハンバーガー — ハンバーガー",
        ko: "ハンバーガー — 햄버거",
        zh: "ハンバーガー — 汉堡包",
      }),
      item("ヒーロー", ["ハ", "ヒ", "フ", "ヘ", "ホ"], "ヒ", {
        vi: "ヒーロー — anh hùng",
        en: "ヒーロー — hero",
        ja: "ヒーロー — ヒーロー",
        ko: "ヒーロー — 영웅",
        zh: "ヒーロー — 英雄",
      }),
      item("フォーク", ["ハ", "ヒ", "フ", "ヘ", "ホ"], "フ", {
        vi: "フォーク — cái nĩa",
        en: "フォーク — fork",
        ja: "フォーク — フォーク",
        ko: "フォーク — 포크",
        zh: "フォーク — 叉子",
      }),
      item("ヘルメット", ["ハ", "ヒ", "フ", "ヘ", "ホ"], "ヘ", {
        vi: "ヘルメット — mũ bảo hiểm",
        en: "ヘルメット — helmet",
        ja: "ヘルメット — ヘルメット",
        ko: "ヘルメット — 헬멧",
        zh: "ヘルメット — 头盔",
      }),
      item("ホテル", ["ハ", "ヒ", "フ", "ヘ", "ホ"], "ホ", {
        vi: "ホテル — khách sạn",
        en: "ホテル — hotel",
        ja: "ホテル — ホテル",
        ko: "ホテル — 호텔",
        zh: "ホテル — 酒店",
      }),
    ],
  },
  "ja-katakana-u4-l7": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("マンガ", ["マ", "ミ", "ム", "メ", "モ"], "マ", {
        vi: "マンガ — truyện tranh / manga",
        en: "マンガ — manga",
        ja: "マンガ — マンガ",
        ko: "マンガ — 만화",
        zh: "マンガ — 漫画",
      }),
      item("ミルク", ["マ", "ミ", "ム", "メ", "モ"], "ミ", {
        vi: "ミルク — sữa",
        en: "ミルク — milk",
        ja: "ミルク — ミルク",
        ko: "ミルク — 우유 / 밀크",
        zh: "ミルク — 牛奶",
      }),
      item("ムービー", ["マ", "ミ", "ム", "メ", "モ"], "ム", {
        vi: "ムービー — phim",
        en: "ムービー — movie",
        ja: "ムービー — ムービー",
        ko: "ムービー — 영화",
        zh: "ムービー — 电影",
      }),
      item("メニュー", ["マ", "ミ", "ム", "メ", "モ"], "メ", {
        vi: "メニュー — thực đơn",
        en: "メニュー — menu",
        ja: "メニュー — メニュー",
        ko: "メニュー — 메뉴",
        zh: "メニュー — 菜单",
      }),
      item("モデル", ["マ", "ミ", "ム", "メ", "モ"], "モ", {
        vi: "モデル — người mẫu / model",
        en: "モデル — model",
        ja: "モデル — モデル",
        ko: "モデル — 모델",
        zh: "モデル — 模特 / 模型",
      }),
    ],
  },
  "ja-katakana-u4-l8": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("ヤング", ["ヤ", "ユ", "ヨ"], "ヤ", {
        vi: "ヤング — trẻ / young",
        en: "ヤング — young",
        ja: "ヤング — ヤング",
        ko: "ヤング — 젊은",
        zh: "ヤング — 年轻的",
      }),
      item("ユニフォーム", ["ヤ", "ユ", "ヨ"], "ユ", {
        vi: "ユニフォーム — đồng phục",
        en: "ユニフォーム — uniform",
        ja: "ユニフォーム — ユニフォーム",
        ko: "ユニフォーム — 유니폼",
        zh: "ユニフォーム — 制服",
      }),
      item("ヨーグルト", ["ヤ", "ユ", "ヨ"], "ヨ", {
        vi: "ヨーグルト — sữa chua",
        en: "ヨーグルト — yogurt",
        ja: "ヨーグルト — ヨーグルト",
        ko: "ヨーグルト — 요구르트",
        zh: "ヨーグルト — 酸奶",
      }),
    ],
  },
  "ja-katakana-u4-l9": {
    listeningTargetMode: "first",
    prompt: firstCharPrompt,
    subPrompt: firstCharSubPrompt,
    items: [
      item("ラーメン", ["ラ", "リ", "ル", "レ", "ロ"], "ラ", {
        vi: "ラーメン — mì ramen",
        en: "ラーメン — ramen",
        ja: "ラーメン — ラーメン",
        ko: "ラーメン — 라멘",
        zh: "ラーメン — 拉面",
      }),
      item("リモコン", ["ラ", "リ", "ル", "レ", "ロ"], "リ", {
        vi: "リモコン — điều khiển từ xa",
        en: "リモコン — remote control",
        ja: "リモコン — リモコン",
        ko: "リモコン — 리모컨",
        zh: "リモコン — 遥控器",
      }),
      item("ルール", ["ラ", "リ", "ル", "レ", "ロ"], "ル", {
        vi: "ルール — quy tắc",
        en: "ルール — rule",
        ja: "ルール — ルール",
        ko: "ルール — 규칙",
        zh: "ルール — 规则",
      }),
      item("レストラン", ["ラ", "リ", "ル", "レ", "ロ"], "レ", {
        vi: "レストラン — nhà hàng",
        en: "レストラン — restaurant",
        ja: "レストラン — レストラン",
        ko: "レストラン — 레스토랑",
        zh: "レストラン — 餐厅",
      }),
      item("ロボット", ["ラ", "リ", "ル", "レ", "ロ"], "ロ", {
        vi: "ロボット — robot",
        en: "ロボット — robot",
        ja: "ロボット — ロボット",
        ko: "ロボット — 로봇",
        zh: "ロボット — 机器人",
      }),
    ],
  },
  "ja-katakana-u4-l10": {
    listeningTargetMode: "target",
    prompt: targetCharPrompt,
    subPrompt: targetCharSubPrompt,
    items: [
      item("ワイン", ["ワ", "ヲ", "ン"], "ワ", {
        vi: "ワイン — rượu vang",
        en: "ワイン — wine",
        ja: "ワイン — ワイン",
        ko: "ワイン — 와인",
        zh: "ワイン — 葡萄酒",
      }),
      item("ヲタク", ["ワ", "ヲ", "ン"], "ヲ", {
        vi: "ヲタク — otaku / người rất mê một lĩnh vực",
        en: "ヲタク — otaku",
        ja: "ヲタク — ヲタク",
        ko: "ヲタク — 오타쿠",
        zh: "ヲタク — 御宅族",
      }),
      item("コンビニ", ["ワ", "ヲ", "ン"], "ン", {
        vi: "コンビニ — cửa hàng tiện lợi",
        en: "コンビニ — convenience store",
        ja: "コンビニ — コンビニ",
        ko: "コンビニ — 편의점",
        zh: "コンビニ — 便利店",
      }),
    ],
  },
};
