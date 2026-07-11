/**
 * Legacy detailed exercise specs from the former six-lesson Hiragana layout.
 * The active one-row-per-lesson Foundation flow is generated from canonical
 * row definitions in generate-curriculum.mjs; this file remains as review history.
 */

const fb = (viC, enC, jaC, koC, zhC, viW, enW, jaW, koW, zhW) => ({
  feedbackCorrect: { vi: viC, en: enC, ja: jaC, ko: koC, zh: zhC },
  feedbackWrong: { vi: viW, en: enW, ja: jaW, ko: koW, zh: zhW },
});

/** Convert plain maps into the shape buildHiraganaLessonExercisesFromSpec expects. */
function withFb(block, correctMsg, wrongMsg) {
  return {
    ...block,
    feedbackCorrect: correctMsg,
    feedbackWrong: wrongMsg,
  };
}

export const HIRAGANA_LESSON_SPECS = {
  "ja-hiragana-u1-l2": {
    requiredChars: ["か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ"],
    listen: withFb(
      { speechText: "し", options: ["さ", "し", "す", "せ"], correct: "し" },
      {
        vi: "Đúng rồi. Âm bạn nghe là 'shi', viết bằng Hiragana là し. Ví dụ: しお（塩） nghĩa là muối.",
        en: "Correct. The sound is 'shi', written as し. Example: しお（塩） means salt.",
        ja: "正解です。聞こえた音は「shi」で、ひらがなでは し です。例：しお（塩）。",
        ko: "맞아요. 들은 소리는 'shi'이고 히라가나로 し입니다. 예: しお（塩）.",
        zh: "正确。你听到的音是“shi”，平假名写作 し。例：しお（塩）。",
      },
      {
        vi: "Chưa đúng. Hãy nghe lại âm 'shi'. Chữ đúng là し.",
        en: "Not yet. Listen again for 'shi'. The correct character is し.",
        ja: "まだ違います。「shi」の音をもう一度聞きましょう。正解は し です。",
        ko: "아직 아니에요. 'shi' 소리를 다시 들어 보세요. 정답은 し입니다.",
        zh: "还不对。再听一次“shi”的音。正确答案是 し。",
      },
    ),
    chooseReading: withFb(
      { visible: "く", options: ["ka", "ki", "ku", "ke"], correct: "ku" },
      {
        vi: "Đúng rồi. く đọc là 'ku'. Ví dụ: くも（雲） nghĩa là mây.",
        en: "Correct. く is read as 'ku'. Example: くも（雲） means cloud.",
        ja: "正解です。く は「ku」と読みます。例：くも（雲）。",
        ko: "맞아요. く는 'ku'로 읽습니다. 예: くも（雲）.",
        zh: "正确。く 读作“ku”。例：くも（雲）。",
      },
      {
        vi: "Chưa đúng. く đọc là 'ku'.",
        en: "Not yet. く is read as 'ku'.",
        ja: "まだ違います。く は「ku」と読みます。",
        ko: "아직 아니에요. く는 'ku'로 읽습니다.",
        zh: "还不对。く 读作“ku”。",
      },
    ),
    fillMissing: withFb(
      { visible: "か き _ け こ", options: ["く", "さ", "こ", "き"], correct: "く" },
      {
        vi: "Đúng rồi. Thứ tự là か → き → く → け → こ.",
        en: "Correct. The order is か → き → く → け → こ.",
        ja: "正解です。順番は か → き → く → け → こ です。",
        ko: "맞아요. 순서는 か → き → く → け → こ입니다.",
        zh: "正确。顺序是 か → き → く → け → こ。",
      },
      {
        vi: "Chưa đúng. Sau か き là く.",
        en: "Not yet. After か き comes く.",
        ja: "まだ違います。か、き の次は く です。",
        ko: "아직 아니에요. か き 다음은 く입니다.",
        zh: "还不对。か き 后面是 く。",
      },
    ),
    soundToCharacter: withFb(
      { clue: "se", options: ["し", "す", "せ", "そ"], correct: "せ" },
      {
        vi: "Đúng rồi. Âm 'se' viết là せ. Ví dụ: せかい（世界） nghĩa là thế giới.",
        en: "Correct. The sound 'se' is written as せ. Example: せかい（世界） means world.",
        ja: "正解です。「se」の音は せ です。例：せかい（世界）。",
        ko: "맞아요. 'se' 소리는 せ입니다. 예: せかい（世界）.",
        zh: "正确。“se”写作 せ。例：せかい（世界）。",
      },
      {
        vi: "Chưa đúng. Âm 'se' tương ứng với せ.",
        en: "Not yet. The sound 'se' matches せ.",
        ja: "まだ違います。「se」の音は せ です。",
        ko: "아직 아니에요. 'se' 소리는 せ입니다.",
        zh: "还不对。“se”对应 せ。",
      },
    ),
    nextInSequence: withFb(
      { visible: "さ → し → ?", options: ["す", "せ", "そ", "か"], correct: "す" },
      {
        vi: "Đúng rồi. Thứ tự là さ → し → す.",
        en: "Correct. The order is さ → し → す.",
        ja: "正解です。順番は さ → し → す です。",
        ko: "맞아요. 순서는 さ → し → す입니다.",
        zh: "正确。顺序是 さ → し → す。",
      },
      {
        vi: "Chưa đúng. Sau さ và し là す.",
        en: "Not yet. After さ and し comes す.",
        ja: "まだ違います。さ、し の次は す です。",
        ko: "아직 아니에요. さ와 し 다음은 す입니다.",
        zh: "还不对。さ 和 し 后面是 す。",
      },
    ),
    chooseCorrectPair: withFb(
      {
        displayText: "か / し / く / そ",
        options: ["か → sa", "し → shi", "く → ke", "そ → su"],
        correct: "し → shi",
      },
      {
        vi: "Đúng rồi. し đọc là 'shi'.",
        en: "Correct. し is read as 'shi'.",
        ja: "正解です。し は「shi」と読みます。",
        ko: "맞아요. し는 'shi'로 읽습니다.",
        zh: "正确。し 读作“shi”。",
      },
      {
        vi: "Chưa đúng. Cặp đúng là し → shi.",
        en: "Not yet. The correct pair is し → shi.",
        ja: "まだ違います。正しい組み合わせは し → shi です。",
        ko: "아직 아니에요. 올바른 짝은 し → shi입니다.",
        zh: "还不对。正确组合是 し → shi。",
      },
    ),
    listeningItems: [
      { speechText: "かさ", correct: "か", options: ["か", "き", "く", "け"] },
      { speechText: "きつね", correct: "き", options: ["か", "き", "こ", "さ"] },
      { speechText: "くも", correct: "く", options: ["く", "け", "こ", "す"] },
      { speechText: "せかい", correct: "せ", options: ["し", "す", "せ", "そ"] },
      { speechText: "そら", correct: "そ", options: ["さ", "し", "せ", "そ"] },
    ],
    aiQa: {
      questionByNative: {
        en: "Among か き く け こ さ し す せ そ, which character is read as 'so'?",
        vi: "Trong các chữ か き く け こ さ し す せ そ, chữ nào đọc là 'so'?",
        ja: "か き く け こ さ し す せ そ の中で「so」と読む文字はどれですか？",
        ko: "か き く け こ さ し す せ そ 중에서 'so'로 읽는 글자는 무엇인가요?",
        zh: "在 か き く け こ さ し す せ そ 中，哪个字符读作“so”？",
      },
      expectedAnswer: "そ",
      feedbackByNative: {
        vi: "Đúng rồi. そ đọc là 'so'. Ví dụ: そら（空） nghĩa là bầu trời.",
        en: "Correct. そ is read as 'so'. Example: そら（空） means sky.",
        ja: "正解です。そ は「so」と読みます。例：そら（空）。",
        ko: "맞아요. そ는 'so'로 읽습니다. 예: そら（空）.",
        zh: "正确。そ 读作“so”。例：そら（空）。",
      },
    },
    review: {
      displayTextByNative: {
        en: "か き く け こ\nさ し す せ そ\nかさ（傘）— umbrella\nきつね（狐）— fox\nくも（雲）— cloud\nせかい（世界）— world\nそら（空）— sky",
        vi: "か き く け こ\nさ し す せ そ\nかさ（傘）— ô\nきつね（狐）— con cáo\nくも（雲）— mây\nせかい（世界）— thế giới\nそら（空）— bầu trời",
        ja: "か き く け こ\nさ し す せ そ\nかさ（傘）\nきつね（狐）\nくも（雲）\nせかい（世界）\nそら（空）",
        ko: "か き く け こ\nさ し す せ そ\nかさ（傘）— 우산\nきつね（狐）— 여우\nくも（雲）— 구름\nせかい（世界）— 세계\nそら（空）— 하늘",
        zh: "か き く け こ\nさ し す せ そ\nかさ（傘）— 伞\nきつね（狐）— 狐狸\nくも（雲）— 云\nせかい（世界）— 世界\nそら（空）— 天空",
      },
      reviewPointsByNative: {
        en: ["Review: かきくけこ and さしすせそ", "Order follows gojūon rows"],
        vi: ["Nhắc lại: かきくけこ và さしすせそ", "Thứ tự theo hàng gojūon"],
        ja: ["復習：かきくけこ と さしすせそ", "五十音の行の順番"],
        ko: ["복습: かきくけこ와 さしすせそ", "오십음 행 순서"],
        zh: ["复习：かきくけこ 与 さしすせそ", "按五十音行顺序"],
      },
    },
  },

  "ja-hiragana-u1-l3": {
    requiredChars: ["た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の"],
    listen: withFb(
      { speechText: "ち", options: ["た", "ち", "つ", "て"], correct: "ち" },
      {
        vi: "Đúng rồi. Âm 'chi' viết là ち. Ví dụ: ちず（地図） nghĩa là bản đồ.",
        en: "Correct. The sound 'chi' is written as ち. Example: ちず（地図） means map.",
        ja: "正解です。「chi」の音は ち です。例：ちず（地図）。",
        ko: "맞아요. 'chi' 소리는 ち입니다. 예: ちず（地図）.",
        zh: "正确。“chi”写作 ち。例：ちず（地図）。",
      },
      {
        vi: "Chưa đúng. Âm 'chi' tương ứng với ち.",
        en: "Not yet. The sound 'chi' matches ち.",
        ja: "まだ違います。「chi」の音は ち です。",
        ko: "아직 아니에요. 'chi' 소리는 ち입니다.",
        zh: "还不对。“chi”对应 ち。",
      },
    ),
    chooseReading: withFb(
      { visible: "ぬ", options: ["na", "ni", "nu", "ne"], correct: "nu" },
      {
        vi: "Đúng rồi. ぬ đọc là 'nu'. Ví dụ: ぬの（布） nghĩa là vải.",
        en: "Correct. ぬ is read as 'nu'. Example: ぬの（布） means cloth.",
        ja: "正解です。ぬ は「nu」と読みます。例：ぬの（布）。",
        ko: "맞아요. ぬ는 'nu'로 읽습니다. 예: ぬの（布）.",
        zh: "正确。ぬ 读作“nu”。例：ぬの（布）。",
      },
      {
        vi: "Chưa đúng. ぬ đọc là 'nu'.",
        en: "Not yet. ぬ is read as 'nu'.",
        ja: "まだ違います。ぬ は「nu」と読みます。",
        ko: "아직 아니에요. ぬ는 'nu'로 읽습니다.",
        zh: "还不对。ぬ 读作“nu”。",
      },
    ),
    fillMissing: withFb(
      { visible: "た ち _ て と", options: ["つ", "な", "と", "ち"], correct: "つ" },
      {
        vi: "Đúng rồi. Thứ tự là た → ち → つ → て → と.",
        en: "Correct. The order is た → ち → つ → て → と.",
        ja: "正解です。順番は た → ち → つ → て → と です。",
        ko: "맞아요. 순서는 た → ち → つ → て → と입니다.",
        zh: "正确。顺序是 た → ち → つ → て → と。",
      },
      {
        vi: "Chưa đúng. Sau た ち là つ.",
        en: "Not yet. After た ち comes つ.",
        ja: "まだ違います。た、ち の次は つ です。",
        ko: "아직 아니에요. た ち 다음은 つ입니다.",
        zh: "还不对。た ち 后面是 つ。",
      },
    ),
    soundToCharacter: withFb(
      { clue: "ne", options: ["な", "に", "ね", "の"], correct: "ね" },
      {
        vi: "Đúng rồi. Âm 'ne' viết là ね. Ví dụ: ねこ（猫） nghĩa là mèo.",
        en: "Correct. The sound 'ne' is written as ね. Example: ねこ（猫） means cat.",
        ja: "正解です。「ne」の音は ね です。例：ねこ（猫）。",
        ko: "맞아요. 'ne' 소리는 ね입니다. 예: ねこ（猫）.",
        zh: "正确。“ne”写作 ね。例：ねこ（猫）。",
      },
      {
        vi: "Chưa đúng. Âm 'ne' tương ứng với ね.",
        en: "Not yet. The sound 'ne' matches ね.",
        ja: "まだ違います。「ne」の音は ね です。",
        ko: "아직 아니에요. 'ne' 소리는 ね입니다.",
        zh: "还不对。“ne”对应 ね。",
      },
    ),
    nextInSequence: withFb(
      { visible: "な → に → ?", options: ["ぬ", "ね", "の", "た"], correct: "ぬ" },
      {
        vi: "Đúng rồi. Thứ tự là な → に → ぬ.",
        en: "Correct. The order is な → に → ぬ.",
        ja: "正解です。順番は な → に → ぬ です。",
        ko: "맞아요. 순서는 な → に → ぬ입니다.",
        zh: "正确。顺序是 な → に → ぬ。",
      },
      {
        vi: "Chưa đúng. Sau な và に là ぬ.",
        en: "Not yet. After な and に comes ぬ.",
        ja: "まだ違います。な、に の次は ぬ です。",
        ko: "아직 아니에요. な와 に 다음은 ぬ입니다.",
        zh: "还不对。な 和 に 后面是 ぬ。",
      },
    ),
    chooseCorrectPair: withFb(
      {
        displayText: "た / ち / と / ぬ",
        options: ["た → na", "ち → tsu", "と → to", "ぬ → ne"],
        correct: "と → to",
      },
      {
        vi: "Đúng rồi. と đọc là 'to'.",
        en: "Correct. と is read as 'to'.",
        ja: "正解です。と は「to」と読みます。",
        ko: "맞아요. と는 'to'로 읽습니다.",
        zh: "正确。と 读作“to”。",
      },
      {
        vi: "Chưa đúng. Cặp đúng là と → to.",
        en: "Not yet. The correct pair is と → to.",
        ja: "まだ違います。正しい組み合わせは と → to です。",
        ko: "아직 아니에요. 올바른 짝은 と → to입니다.",
        zh: "还不对。正确组合是 と → to。",
      },
    ),
    listeningItems: [
      { speechText: "たこ", correct: "た", options: ["た", "ち", "つ", "て"] },
      { speechText: "ちず", correct: "ち", options: ["た", "ち", "と", "な"] },
      { speechText: "つき", correct: "つ", options: ["ち", "つ", "て", "と"] },
      { speechText: "とり", correct: "と", options: ["た", "て", "と", "の"] },
      { speechText: "ねこ", correct: "ね", options: ["な", "に", "ね", "の"] },
    ],
    aiQa: {
      questionByNative: {
        en: "Among た ち つ て と な に ぬ ね の, which character is read as 'nu'?",
        vi: "Trong các chữ た ち つ て と な に ぬ ね の, chữ nào đọc là 'nu'?",
        ja: "た ち つ て と な に ぬ ね の の中で「nu」と読む文字はどれですか？",
        ko: "た ち つ て と な に ぬ ね の 중에서 'nu'로 읽는 글자는 무엇인가요?",
        zh: "在 た ち つ て と な に ぬ ね の 中，哪个字符读作“nu”？",
      },
      expectedAnswer: "ぬ",
      feedbackByNative: {
        vi: "Đúng rồi. ぬ đọc là 'nu'. Ví dụ: ぬの（布） nghĩa là vải.",
        en: "Correct. ぬ is read as 'nu'. Example: ぬの（布） means cloth.",
        ja: "正解です。ぬ は「nu」と読みます。例：ぬの（布）。",
        ko: "맞아요. ぬ는 'nu'로 읽습니다. 예: ぬの（布）.",
        zh: "正确。ぬ 读作“nu”。例：ぬの（布）。",
      },
    },
    review: {
      displayTextByNative: {
        en: "た ち つ て と\nな に ぬ ね の\nたこ（蛸）— octopus\nちず（地図）— map\nつき（月）— moon\nとり（鳥）— bird\nねこ（猫）— cat",
        vi: "た ち つ て と\nな に ぬ ね の\nたこ（蛸）— bạch tuộc\nちず（地図）— bản đồ\nつき（月）— mặt trăng\nとり（鳥）— chim\nねこ（猫）— mèo",
        ja: "た ち つ て と\nな に ぬ ね の\nたこ（蛸）\nちず（地図）\nつき（月）\nとり（鳥）\nねこ（猫）",
        ko: "た ち つ て と\nな に ぬ ね の\nたこ（蛸）— 문어\nちず（地図）— 지도\nつき（月）— 달\nとり（鳥）— 새\nねこ（猫）— 고양이",
        zh: "た ち つ て と\nな に ぬ ね の\nたこ（蛸）— 章鱼\nちず（地図）— 地图\nつき（月）— 月亮\nとり（鳥）— 鸟\nねこ（猫）— 猫",
      },
      reviewPointsByNative: {
        en: ["Review: たちつてと and なにぬねの"],
        vi: ["Nhắc lại: たちつてと và なにぬねの"],
        ja: ["復習：たちつてと と なにぬねの"],
        ko: ["복습: たちつてと와 なにぬねの"],
        zh: ["复习：たちつてと 与 なにぬねの"],
      },
    },
  },

  "ja-hiragana-u1-l4": {
    requiredChars: ["は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も"],
    listen: withFb(
      { speechText: "ふ", options: ["は", "ひ", "ふ", "へ"], correct: "ふ" },
      {
        vi: "Đúng rồi. Âm 'fu' viết là ふ. Ví dụ: ふね（船） nghĩa là thuyền.",
        en: "Correct. The sound 'fu' is written as ふ. Example: ふね（船） means boat.",
        ja: "正解です。「fu」の音は ふ です。例：ふね（船）。",
        ko: "맞아요. 'fu' 소리는 ふ입니다. 예: ふね（船）.",
        zh: "正确。“fu”写作 ふ。例：ふね（船）。",
      },
      {
        vi: "Chưa đúng. Âm 'fu' tương ứng với ふ.",
        en: "Not yet. The sound 'fu' matches ふ.",
        ja: "まだ違います。「fu」の音は ふ です。",
        ko: "아직 아니에요. 'fu' 소리는 ふ입니다.",
        zh: "还不对。“fu”对应 ふ。",
      },
    ),
    chooseReading: withFb(
      { visible: "ま", options: ["ha", "ma", "mi", "mo"], correct: "ma" },
      {
        vi: "Đúng rồi. ま đọc là 'ma'. Ví dụ: まど（窓） nghĩa là cửa sổ.",
        en: "Correct. ま is read as 'ma'. Example: まど（窓） means window.",
        ja: "正解です。ま は「ma」と読みます。例：まど（窓）。",
        ko: "맞아요. ま는 'ma'로 읽습니다. 예: まど（窓）.",
        zh: "正确。ま 读作“ma”。例：まど（窓）。",
      },
      {
        vi: "Chưa đúng. ま đọc là 'ma'.",
        en: "Not yet. ま is read as 'ma'.",
        ja: "まだ違います。ま は「ma」と読みます。",
        ko: "아직 아니에요. ま는 'ma'로 읽습니다.",
        zh: "还不对。ま 读作“ma”。",
      },
    ),
    fillMissing: withFb(
      { visible: "は ひ _ へ ほ", options: ["ふ", "ま", "ほ", "ひ"], correct: "ふ" },
      {
        vi: "Đúng rồi. Thứ tự là は → ひ → ふ → へ → ほ.",
        en: "Correct. The order is は → ひ → ふ → へ → ほ.",
        ja: "正解です。順番は は → ひ → ふ → へ → ほ です。",
        ko: "맞아요. 순서는 は → ひ → ふ → へ → ほ입니다.",
        zh: "正确。顺序是 は → ひ → ふ → へ → ほ。",
      },
      {
        vi: "Chưa đúng. Sau は ひ là ふ.",
        en: "Not yet. After は ひ comes ふ.",
        ja: "まだ違います。は、ひ の次は ふ です。",
        ko: "아직 아니에요. は ひ 다음은 ふ입니다.",
        zh: "还不对。は ひ 后面是 ふ。",
      },
    ),
    soundToCharacter: withFb(
      { clue: "me", options: ["ま", "み", "め", "も"], correct: "め" },
      {
        vi: "Đúng rồi. Âm 'me' viết là め. Ví dụ: め（目） nghĩa là mắt.",
        en: "Correct. The sound 'me' is written as め. Example: め（目） means eye.",
        ja: "正解です。「me」の音は め です。例：め（目）。",
        ko: "맞아요. 'me' 소리는 め입니다. 예: め（目）.",
        zh: "正确。“me”写作 め。例：め（目）。",
      },
      {
        vi: "Chưa đúng. Âm 'me' tương ứng với め.",
        en: "Not yet. The sound 'me' matches め.",
        ja: "まだ違います。「me」の音は め です。",
        ko: "아직 아니에요. 'me' 소리는 め입니다.",
        zh: "还不对。“me”对应 め。",
      },
    ),
    nextInSequence: withFb(
      { visible: "ま → み → ?", options: ["む", "め", "も", "は"], correct: "む" },
      {
        vi: "Đúng rồi. Thứ tự là ま → み → む.",
        en: "Correct. The order is ま → み → む.",
        ja: "正解です。順番は ま → み → む です。",
        ko: "맞아요. 순서는 ま → み → む입니다.",
        zh: "正确。顺序是 ま → み → む。",
      },
      {
        vi: "Chưa đúng. Sau ま và み là む.",
        en: "Not yet. After ま and み comes む.",
        ja: "まだ違います。ま、み の次は む です。",
        ko: "아직 아니에요. ま와 み 다음은 む입니다.",
        zh: "还不对。ま 和 み 后面是 む。",
      },
    ),
    chooseCorrectPair: withFb(
      {
        displayText: "は / ひ / ほ / む",
        options: ["は → ma", "ひ → fu", "ほ → ho", "む → me"],
        correct: "ほ → ho",
      },
      {
        vi: "Đúng rồi. ほ đọc là 'ho'.",
        en: "Correct. ほ is read as 'ho'.",
        ja: "正解です。ほ は「ho」と読みます。",
        ko: "맞아요. ほ는 'ho'로 읽습니다.",
        zh: "正确。ほ 读作“ho”。",
      },
      {
        vi: "Chưa đúng. Cặp đúng là ほ → ho.",
        en: "Not yet. The correct pair is ほ → ho.",
        ja: "まだ違います。正しい組み合わせは ほ → ho です。",
        ko: "아직 아니에요. 올바른 짝은 ほ → ho입니다.",
        zh: "还不对。正确组合是 ほ → ho。",
      },
    ),
    listeningItems: [
      { speechText: "はな", correct: "は", options: ["は", "ひ", "ふ", "へ"] },
      { speechText: "ひこうき", correct: "ひ", options: ["は", "ひ", "ほ", "ま"] },
      { speechText: "ふね", correct: "ふ", options: ["ひ", "ふ", "へ", "ほ"] },
      { speechText: "みず", correct: "み", options: ["ま", "み", "む", "め"] },
      { speechText: "もも", correct: "も", options: ["ま", "み", "め", "も"] },
    ],
    aiQa: {
      questionByNative: {
        en: "Among は ひ ふ へ ほ ま み む め も, which character is read as 'he'?",
        vi: "Trong các chữ は ひ ふ へ ほ ま み む め も, chữ nào đọc là 'he'?",
        ja: "は ひ ふ へ ほ ま み む め も の中で「he」と読む文字はどれですか？",
        ko: "は ひ ふ へ ほ ま み む め も 중에서 'he'로 읽는 글자는 무엇인가요?",
        zh: "在 は ひ ふ へ ほ ま み む め も 中，哪个字符读作“he”？",
      },
      expectedAnswer: "へ",
      feedbackByNative: {
        vi: "Đúng rồi. へ đọc là 'he'. Ví dụ: へや（部屋） nghĩa là căn phòng.",
        en: "Correct. へ is read as 'he'. Example: へや（部屋） means room.",
        ja: "正解です。へ は「he」と読みます。例：へや（部屋）。",
        ko: "맞아요. へ는 'he'로 읽습니다. 예: へや（部屋）.",
        zh: "正确。へ 读作“he”。例：へや（部屋）。",
      },
    },
    review: {
      displayTextByNative: {
        en: "は ひ ふ へ ほ\nま み む め も\nはな（花）— flower\nひこうき（飛行機）— airplane\nふね（船）— boat\nみず（水）— water\nもも（桃）— peach",
        vi: "は ひ ふ へ ほ\nま み む め も\nはな（花）— hoa\nひこうき（飛行機）— máy bay\nふね（船）— thuyền\nみず（水）— nước\nもも（桃）— quả đào",
        ja: "は ひ ふ へ ほ\nま み む め も\nはな（花）\nひこうき（飛行機）\nふね（船）\nみず（水）\nもも（桃）",
        ko: "は ひ ふ へ ほ\nま み む め も\nはな（花）— 꽃\nひこうき（飛行機）— 비행기\nふね（船）— 배\nみず（水）— 물\nもも（桃）— 복숭아",
        zh: "は ひ ふ へ ほ\nま み む め も\nはな（花）— 花\nひこうき（飛行機）— 飞机\nふね（船）— 船\nみず（水）— 水\nもも（桃）— 桃子",
      },
      reviewPointsByNative: {
        en: ["Review: はひふへほ and まみむめも"],
        vi: ["Nhắc lại: はひふへほ và まみむめも"],
        ja: ["復習：はひふへほ と まみむめも"],
        ko: ["복습: はひふへほ와 まみむめも"],
        zh: ["复习：はひふへほ 与 まみむめも"],
      },
    },
  },

  "ja-hiragana-u1-l5": {
    requiredChars: ["や", "ゆ", "よ", "ら", "り", "る"],
    listen: withFb(
      { speechText: "ゆ", options: ["や", "ゆ", "よ", "ら"], correct: "ゆ" },
      {
        vi: "Đúng rồi. Âm 'yu' viết là ゆ. Ví dụ: ゆき（雪） nghĩa là tuyết.",
        en: "Correct. The sound 'yu' is written as ゆ. Example: ゆき（雪） means snow.",
        ja: "正解です。「yu」の音は ゆ です。例：ゆき（雪）。",
        ko: "맞아요. 'yu' 소리는 ゆ입니다. 예: ゆき（雪）.",
        zh: "正确。“yu”写作 ゆ。例：ゆき（雪）。",
      },
      {
        vi: "Chưa đúng. Âm 'yu' tương ứng với ゆ.",
        en: "Not yet. The sound 'yu' matches ゆ.",
        ja: "まだ違います。「yu」の音は ゆ です。",
        ko: "아직 아니에요. 'yu' 소리는 ゆ입니다.",
        zh: "还不对。“yu”对应 ゆ。",
      },
    ),
    chooseReading: withFb(
      { visible: "ら", options: ["ya", "ra", "ri", "ru"], correct: "ra" },
      {
        vi: "Đúng rồi. ら đọc là 'ra'. Ví dụ: らいねん（来年） nghĩa là năm sau.",
        en: "Correct. ら is read as 'ra'. Example: らいねん（来年） means next year.",
        ja: "正解です。ら は「ra」と読みます。例：らいねん（来年）。",
        ko: "맞아요. らは 'ra'로 읽습니다. 예: らいねん（来年）.",
        zh: "正确。ら 读作“ra”。例：らいねん（来年）。",
      },
      {
        vi: "Chưa đúng. ら đọc là 'ra'.",
        en: "Not yet. ら is read as 'ra'.",
        ja: "まだ違います。ら は「ra」と読みます。",
        ko: "아직 아니에요. 라는 'ra'로 읽습니다.",
        zh: "还不对。ら 读作“ra”。",
      },
    ),
    fillMissing: withFb(
      { visible: "や _ よ", options: ["ゆ", "ら", "よ", "や"], correct: "ゆ" },
      {
        vi: "Đúng rồi. Thứ tự là や → ゆ → よ.",
        en: "Correct. The order is や → ゆ → よ.",
        ja: "正解です。順番は や → ゆ → よ です。",
        ko: "맞아요. 순서는 や → ゆ → よ입니다.",
        zh: "正确。顺序是 や → ゆ → よ。",
      },
      {
        vi: "Chưa đúng. Sau や là ゆ.",
        en: "Not yet. After や comes ゆ.",
        ja: "まだ違います。や の次は ゆ です。",
        ko: "아직 아니에요. や 다음은 ゆ입니다.",
        zh: "还不对。や 后面是 ゆ。",
      },
    ),
    soundToCharacter: withFb(
      { clue: "ri", options: ["ら", "り", "る", "よ"], correct: "り" },
      {
        vi: "Đúng rồi. Âm 'ri' viết là り. Ví dụ: りんご（林檎） nghĩa là táo.",
        en: "Correct. The sound 'ri' is written as り. Example: りんご（林檎） means apple.",
        ja: "正解です。「ri」の音は り です。例：りんご（林檎）。",
        ko: "맞아요. 'ri' 소리는 り입니다. 예: りんご（林檎）.",
        zh: "正确。“ri”写作 り。例：りんご（林檎）。",
      },
      {
        vi: "Chưa đúng. Âm 'ri' tương ứng với り.",
        en: "Not yet. The sound 'ri' matches り.",
        ja: "まだ違います。「ri」の音は り です。",
        ko: "아직 아니에요. 'ri' 소리는 り입니다.",
        zh: "还不对。“ri”对应 り。",
      },
    ),
    nextInSequence: withFb(
      { visible: "ら → り → ?", options: ["る", "れ", "ろ", "や"], correct: "る" },
      {
        vi: "Đúng rồi. Thứ tự là ら → り → る.",
        en: "Correct. The order is ら → り → る.",
        ja: "正解です。順番は ら → り → る です。",
        ko: "맞아요. 순서는 ら → り → る입니다.",
        zh: "正确。顺序是 ら → り → る。",
      },
      {
        vi: "Chưa đúng. Sau ら và り là る.",
        en: "Not yet. After ら and り comes る.",
        ja: "まだ違います。ら、り の次は る です。",
        ko: "아직 아니에요. ら와 り 다음은 る입니다.",
        zh: "还不对。ら 和 り 后面是 る。",
      },
    ),
    chooseCorrectPair: withFb(
      {
        displayText: "や / ゆ / ら / る",
        options: ["や → ya", "ゆ → yo", "ら → ri", "る → ra"],
        correct: "や → ya",
      },
      {
        vi: "Đúng rồi. や đọc là 'ya'.",
        en: "Correct. や is read as 'ya'.",
        ja: "正解です。や は「ya」と読みます。",
        ko: "맞아요. や는 'ya'로 읽습니다.",
        zh: "正确。や 读作“ya”。",
      },
      {
        vi: "Chưa đúng. Cặp đúng là や → ya.",
        en: "Not yet. The correct pair is や → ya.",
        ja: "まだ違います。正しい組み合わせは や → ya です。",
        ko: "아직 아니에요. 올바른 짝은 や → ya입니다.",
        zh: "还不对。正确组合是 や → ya。",
      },
    ),
    listeningItems: [
      { speechText: "やま", correct: "や", options: ["や", "ゆ", "よ", "ら"] },
      { speechText: "ゆき", correct: "ゆ", options: ["や", "ゆ", "よ", "り"] },
      { speechText: "よる", correct: "よ", options: ["ゆ", "よ", "ら", "る"] },
      { speechText: "りんご", correct: "り", options: ["ら", "り", "る", "や"] },
      { speechText: "るす", correct: "る", options: ["ら", "り", "る", "よ"] },
    ],
    aiQa: {
      questionByNative: {
        en: "Among や ゆ よ ら り る, which character is read as 'yo'?",
        vi: "Trong các chữ や ゆ よ ら り る, chữ nào đọc là 'yo'?",
        ja: "や ゆ よ ら り る の中で「yo」と読む文字はどれですか？",
        ko: "や ゆ よ ら り る 중에서 'yo'로 읽는 글자는 무엇인가요?",
        zh: "在 や ゆ よ ら り る 中，哪个字符读作“yo”？",
      },
      expectedAnswer: "よ",
      feedbackByNative: {
        vi: "Đúng rồi. よ đọc là 'yo'. Ví dụ: よる（夜） nghĩa là ban đêm.",
        en: "Correct. よ is read as 'yo'. Example: よる（夜） means night.",
        ja: "正解です。よ は「yo」と読みます。例：よる（夜）。",
        ko: "맞아요. よ는 'yo'로 읽습니다. 예: よる（夜）.",
        zh: "正确。よ 读作“yo”。例：よる（夜）。",
      },
    },
    review: {
      displayTextByNative: {
        en: "や ゆ よ\nら り る\nやま（山）— mountain\nゆき（雪）— snow\nよる（夜）— night\nりんご（林檎）— apple\nるす（留守）— not at home",
        vi: "や ゆ よ\nら り る\nやま（山）— núi\nゆき（雪）— tuyết\nよる（夜）— ban đêm\nりんご（林檎）— táo\nるす（留守）— vắng nhà",
        ja: "や ゆ よ\nら り る\nやま（山）\nゆき（雪）\nよる（夜）\nりんご（林檎）\nるす（留守）",
        ko: "や ゆ よ\nら り る\nやま（山）— 산\nゆき（雪）— 눈\nよる（夜）— 밤\nりんご（林檎）— 사과\nるす（留守）— 부재중",
        zh: "や ゆ よ\nら り る\nやま（山）— 山\nゆき（雪）— 雪\nよる（夜）— 夜晚\nりんご（林檎）— 苹果\nるす（留守）— 不在家",
      },
      reviewPointsByNative: {
        en: ["Review: やゆよ and らりる"],
        vi: ["Nhắc lại: やゆよ và らりる"],
        ja: ["復習：やゆよ と らりる"],
        ko: ["복습: やゆよ와 らりる"],
        zh: ["复习：やゆよ 与 らりる"],
      },
    },
  },

  "ja-hiragana-u1-l6": {
    requiredChars: ["れ", "ろ", "わ", "を", "ん"],
    listeningTargetMode: "target",
    listen: withFb(
      { speechText: "れ", options: ["れ", "ろ", "わ", "を"], correct: "れ" },
      {
        vi: "Đúng rồi. Âm 're' viết là れ. Ví dụ: れいぞうこ（冷蔵庫） nghĩa là tủ lạnh.",
        en: "Correct. The sound 're' is written as れ. Example: れいぞうこ（冷蔵庫） means refrigerator.",
        ja: "正解です。「re」の音は れ です。例：れいぞうこ（冷蔵庫）。",
        ko: "맞아요. 're' 소리는 れ입니다. 예: れいぞうこ（冷蔵庫）.",
        zh: "正确。“re”写作 れ。例：れいぞうこ（冷蔵庫）。",
      },
      {
        vi: "Chưa đúng. Âm 're' tương ứng với れ.",
        en: "Not yet. The sound 're' matches れ.",
        ja: "まだ違います。「re」の音は れ です。",
        ko: "아직 아니에요. 're' 소리는 れ입니다.",
        zh: "还不对。“re”对应 れ。",
      },
    ),
    chooseReading: withFb(
      { visible: "を", options: ["wa", "o", "n", "ro"], correct: "o" },
      {
        vi: "Đúng rồi. を đọc là 'o' và thường dùng làm trợ từ tân ngữ.",
        en: "Correct. を is read as 'o' and is usually an object particle.",
        ja: "正解です。を は「o」と読み、目的語の助詞として使います。",
        ko: "맞아요. を는 'o'로 읽고 보통 목적어 조사로 씁니다.",
        zh: "正确。を 读作“o”，通常用作宾语助词。",
      },
      {
        vi: "Chưa đúng. を đọc là 'o'.",
        en: "Not yet. を is read as 'o'.",
        ja: "まだ違います。を は「o」と読みます。",
        ko: "아직 아니에요. を는 'o'로 읽습니다.",
        zh: "还不对。を 读作“o”。",
      },
    ),
    fillMissing: withFb(
      { visible: "れ ろ _ を ん", options: ["わ", "を", "ん", "ろ"], correct: "わ" },
      {
        vi: "Đúng rồi. Thứ tự là れ → ろ → わ → を → ん.",
        en: "Correct. The order is れ → ろ → わ → を → ん.",
        ja: "正解です。順番は れ → ろ → わ → を → ん です。",
        ko: "맞아요. 순서는 れ → ろ → わ → を → ん입니다.",
        zh: "正确。顺序是 れ → ろ → わ → を → ん。",
      },
      {
        vi: "Chưa đúng. Sau れ ろ là わ.",
        en: "Not yet. After れ ろ comes わ.",
        ja: "まだ違います。れ、ろ の次は わ です。",
        ko: "아직 아니에요. れ ろ 다음은 わ입니다.",
        zh: "还不对。れ ろ 后面是 わ。",
      },
    ),
    soundToCharacter: withFb(
      { clue: "n", options: ["れ", "ろ", "を", "ん"], correct: "ん" },
      {
        vi: "Đúng rồi. Âm 'n' viết là ん. Ví dụ: ほん（本） nghĩa là sách.",
        en: "Correct. The sound 'n' is written as ん. Example: ほん（本） means book.",
        ja: "正解です。「n」の音は ん です。例：ほん（本）。",
        ko: "맞아요. 'n' 소리는 ん입니다. 예: ほん（本）.",
        zh: "正确。“n”写作 ん。例：ほん（本）。",
      },
      {
        vi: "Chưa đúng. Âm 'n' tương ứng với ん.",
        en: "Not yet. The sound 'n' matches ん.",
        ja: "まだ違います。「n」の音は ん です。",
        ko: "아직 아니에요. 'n' 소리는 ん입니다.",
        zh: "还不对。“n”对应 ん。",
      },
    ),
    nextInSequence: withFb(
      { visible: "れ → ろ → ?", options: ["わ", "を", "ん", "ら"], correct: "わ" },
      {
        vi: "Đúng rồi. Thứ tự là れ → ろ → わ.",
        en: "Correct. The order is れ → ろ → わ.",
        ja: "正解です。順番は れ → ろ → わ です。",
        ko: "맞아요. 순서는 れ → ろ → わ입니다.",
        zh: "正确。顺序是 れ → ろ → わ。",
      },
      {
        vi: "Chưa đúng. Sau れ và ろ là わ.",
        en: "Not yet. After れ and ろ comes わ.",
        ja: "まだ違います。れ、ろ の次は わ です。",
        ko: "아직 아니에요. れ와 ろ 다음은 わ입니다.",
        zh: "还不对。れ 和 ろ 后面是 わ。",
      },
    ),
    chooseCorrectPair: withFb(
      {
        displayText: "れ / わ / を / ん",
        options: ["れ → ro", "わ → wa", "を → n", "ん → o"],
        correct: "わ → wa",
      },
      {
        vi: "Đúng rồi. わ đọc là 'wa'.",
        en: "Correct. わ is read as 'wa'.",
        ja: "正解です。わ は「wa」と読みます。",
        ko: "맞아요. わ는 'wa'로 읽습니다.",
        zh: "正确。わ 读作“wa”。",
      },
      {
        vi: "Chưa đúng. Cặp đúng là わ → wa.",
        en: "Not yet. The correct pair is わ → wa.",
        ja: "まだ違います。正しい組み合わせは わ → wa です。",
        ko: "아직 아니에요. 올바른 짝은 わ → wa입니다.",
        zh: "还不对。正确组合是 わ → wa。",
      },
    ),
    listeningItems: [
      { speechText: "れいぞうこ", correct: "れ", options: ["れ", "ろ", "わ", "を"] },
      { speechText: "ろうそく", correct: "ろ", options: ["れ", "ろ", "わ", "ん"] },
      { speechText: "わに", correct: "わ", options: ["ろ", "わ", "を", "ん"] },
      { speechText: "ほんをよむ", correct: "を", options: ["わ", "を", "ん", "れ"] },
      { speechText: "ほん", correct: "ん", options: ["れ", "ろ", "を", "ん"] },
    ],
    aiQa: {
      questionByNative: {
        en: "Among れ ろ わ を ん, which character is usually an object particle and is read as 'o'?",
        vi: "Trong các chữ れ ろ わ を ん, chữ nào thường dùng làm trợ từ tân ngữ và đọc là 'o'?",
        ja: "れ ろ わ を ん の中で、目的語の助詞として使い「o」と読む文字はどれですか？",
        ko: "れ ろ わ を ん 중에서 목적어 조사로 쓰이며 'o'로 읽는 글자는 무엇인가요?",
        zh: "在 れ ろ わ を ん 中，哪个字符通常用作宾语助词并读作“o”？",
      },
      expectedAnswer: "を",
      feedbackByNative: {
        vi: "Đúng rồi. を đọc là 'o' và thường là trợ từ tân ngữ. ん thường nằm trong/cuối từ.",
        en: "Correct. を is read as 'o' and is usually an object particle. ん usually appears inside or at the end of words.",
        ja: "正解です。を は「o」と読み、目的語の助詞です。ん は語中・語末に来ることが多いです。",
        ko: "맞아요. を는 'o'로 읽고 목적어 조사입니다. ん은 보통 단어 안/끝에 옵니다.",
        zh: "正确。を 读作“o”，通常是宾语助词。ん 多出现在词中或词尾。",
      },
    },
    review: {
      displayTextByNative: {
        en: "れ ろ わ を ん\nを = object particle (read 'o')\nん usually appears inside/end of words\nれいぞうこ（冷蔵庫）— refrigerator\nろうそく（蝋燭）— candle\nわに（鰐）— crocodile\nほんをよむ（本を読む）— read a book\nほん（本）— book",
        vi: "れ ろ わ を ん\nを = trợ từ tân ngữ (đọc 'o')\nん thường nằm trong/cuối từ\nれいぞうこ（冷蔵庫）— tủ lạnh\nろうそく（蝋燭）— nến\nわに（鰐）— cá sấu\nほんをよむ（本を読む）— đọc sách\nほん（本）— sách",
        ja: "れ ろ わ を ん\nを＝目的語の助詞（読みは o）\nんは語中・語末に多い\nれいぞうこ（冷蔵庫）\nろうそく（蝋燭）\nわに（鰐）\nほんをよむ（本を読む）\nほん（本）",
        ko: "れ ろ わ を ん\nを = 목적어 조사 (읽기 'o')\nん은 보통 단어 안/끝\nれいぞうこ（冷蔵庫）— 냉장고\nろうそく（蝋燭）— 양초\nわに（鰐）— 악어\nほんをよむ（本を読む）— 책을 읽다\nほん（本）— 책",
        zh: "れ ろ わ を ん\nを＝宾语助词（读 o）\nん多在词中/词尾\nれいぞうこ（冷蔵庫）— 冰箱\nろうそく（蝋燭）— 蜡烛\nわに（鰐）— 鳄鱼\nほんをよむ（本を読む）— 读书\nほん（本）— 书",
      },
      reviewPointsByNative: {
        en: [
          "Review: れろわをん",
          "を is usually a particle read as 'o'",
          "ん usually appears inside or at the end of words",
        ],
        vi: [
          "Nhắc lại: れろわをん",
          "を thường là trợ từ, đọc 'o'",
          "ん thường nằm trong hoặc cuối từ",
        ],
        ja: [
          "復習：れろわをん",
          "をは目的語の助詞で「o」と読む",
          "んは語中・語末に来ることが多い",
        ],
        ko: [
          "복습: れろわをん",
          "を는 보통 조사이며 'o'로 읽음",
          "ん은 보통 단어 안/끝에 옴",
        ],
        zh: [
          "复习：れろわをん",
          "を 通常是助词，读作 o",
          "ん 多出现在词中或词尾",
        ],
      },
    },
  },
};
