import type { ContentItem, Course, CourseLevel, DialogueLine, Exercise, GrammarPoint, Language, LanguageCode, Lesson, LessonType, LevelId, MicroLesson, PlacementQuestion, PracticeSet, PronunciationItem, QuizQuestion, Unit, VocabularyItem } from "./types.js";

import type { ExamLevel, ExamTrackOption, TrackSkill } from "./types.js";
import { getLevelDisplayName, levelOrder } from "./levelDisplay.js";
import examTracksConfig from "./config/exam_tracks.json" with { type: "json" };
import {
  allLearningLanguages,
  learningLanguages,
} from "./languageOptions.js";
import {
  curriculumCourses,
  curriculumLessons,
  getCurriculumLessonById,
} from "./curriculumJson.js";

export { nativeLanguages } from "./nativeLanguages.js";
export {
  languageOptions,
  learningLanguages,
  allLearningLanguageOptions,
  allLearningLanguages,
  getLanguageOption,
  getLearningLanguage,
  getLearningLanguageLabel,
  isCourseAvailable,
} from "./languageOptions.js";

/** Available playable learning languages — sourced from courseStatus in config. */
export const languages: Language[] = learningLanguages;

type PronSeed = [symbol: string, pronunciation: string, word: string, meaning: string, sentence: string, translation: string];
const enAlphabet: PronSeed[] = [
  ["A a", "ay / common sound /æ/", "apple", "a fruit", "I eat an apple.", "I eat an apple."], ["B b", "bee /b/", "book", "something you read", "This is a book.", "This is a book."], ["C c", "see /k/", "cat", "a small animal", "The cat is here.", "The cat is here."], ["D d", "dee /d/", "dog", "a common pet", "I see a dog.", "I see a dog."], ["E e", "ee /e/", "egg", "a food", "The egg is hot.", "The egg is hot."],
  ["F f", "ef /f/", "fish", "an animal in water", "The fish is blue.", "The fish is blue."], ["G g", "gee /g/", "girl", "a young female person", "The girl reads.", "The girl reads."], ["H h", "aitch /h/", "house", "a home", "My house is small.", "My house is small."], ["I i", "eye /ɪ/", "ice", "frozen water", "The ice is cold.", "The ice is cold."], ["J j", "jay /dʒ/", "juice", "a fruit drink", "I like juice.", "I like juice."],
  ["K k", "kay /k/", "key", "opens a lock", "This is my key.", "This is my key."], ["L l", "el /l/", "lemon", "a yellow fruit", "The lemon is yellow.", "The lemon is yellow."], ["M m", "em /m/", "milk", "a white drink", "I drink milk.", "I drink milk."], ["N n", "en /n/", "nose", "part of the face", "This is my nose.", "This is my nose."], ["O o", "oh /ɒ/", "orange", "a fruit and color", "The orange is sweet.", "The orange is sweet."],
  ["P p", "pee /p/", "pen", "a writing tool", "I have a pen.", "I have a pen."], ["Q q", "cue /kw/", "queen", "a female monarch", "The queen smiles.", "The queen smiles."], ["R r", "ar /r/", "red", "a color", "The bag is red.", "The bag is red."], ["S s", "ess /s/", "sun", "the star in our sky", "The sun is warm.", "The sun is warm."], ["T t", "tee /t/", "table", "a piece of furniture", "The book is on the table.", "The book is on the table."],
  ["U u", "you /ʌ/", "umbrella", "keeps rain off", "I have an umbrella.", "I have an umbrella."], ["V v", "vee /v/", "van", "a road vehicle", "The van is white.", "The van is white."], ["W w", "double-u /w/", "water", "a clear drink", "I drink water.", "I drink water."], ["X x", "ex /ks/", "box", "a container", "The box is open.", "The box is open."], ["Y y", "why /j/", "yellow", "a color", "The sun is yellow.", "The sun is yellow."], ["Z z", "zee /z/", "zoo", "a place with animals", "We go to the zoo.", "We go to the zoo."]
];

const esAlphabet: PronSeed[] = [
  ["A a", "a", "agua", "water", "Bebo agua.", "I drink water."], ["B b", "be", "bebé", "baby", "El bebé duerme.", "The baby sleeps."], ["C c", "ce", "casa", "house", "Mi casa es pequeña.", "My house is small."], ["D d", "de", "día", "day", "Es un buen día.", "It is a good day."], ["E e", "e", "elefante", "elephant", "El elefante es grande.", "The elephant is big."],
  ["F f", "efe", "familia", "family", "Mi familia está aquí.", "My family is here."], ["G g", "ge", "gato", "cat", "El gato duerme.", "The cat sleeps."], ["H h", "hache (silent)", "hola", "hello", "Hola, Ana.", "Hello, Ana."], ["I i", "i", "isla", "island", "La isla es bonita.", "The island is pretty."], ["J j", "jota", "jugo", "juice", "Quiero jugo.", "I want juice."],
  ["K k", "ka", "kilo", "kilogram", "Es un kilo.", "It is one kilogram."], ["L l", "ele", "libro", "book", "Leo un libro.", "I read a book."], ["M m", "eme", "mesa", "table", "El pan está en la mesa.", "The bread is on the table."], ["N n", "ene", "noche", "night", "Buenas noches.", "Good night."], ["Ñ ñ", "eñe", "niño", "child / boy", "El niño juega.", "The boy plays."],
  ["O o", "o", "oso", "bear", "El oso es grande.", "The bear is big."], ["P p", "pe", "pan", "bread", "Como pan.", "I eat bread."], ["Q q", "cu", "queso", "cheese", "Me gusta el queso.", "I like cheese."], ["R r", "erre", "rojo", "red", "El libro es rojo.", "The book is red."], ["S s", "ese", "sol", "sun", "El sol brilla.", "The sun shines."],
  ["T t", "te", "taza", "cup", "La taza es azul.", "The cup is blue."], ["U u", "u", "uno", "one", "Tengo uno.", "I have one."], ["V v", "uve", "vaso", "glass", "El vaso tiene agua.", "The glass has water."], ["W w", "uve doble", "wifi", "wireless internet", "El wifi funciona.", "The wifi works."], ["X x", "equis", "taxi", "taxi", "El taxi está aquí.", "The taxi is here."], ["Y y", "ye", "yo", "I", "Yo soy Ana.", "I am Ana."], ["Z z", "zeta", "zapato", "shoe", "El zapato es negro.", "The shoe is black."]
];

const jaKana: PronSeed[] = [
  ["あ", "a", "雨（あめ）", "rain", "雨（あめ）です。", "It is rain."], ["い", "i", "いぬ", "dog", "いぬです。", "It is a dog."], ["う", "u", "うみ", "sea", "うみです。", "It is the sea."], ["え", "e", "えき", "station", "えきです。", "It is a station."], ["お", "o", "おに", "ogre", "おにです。", "It is an ogre."],
  ["か", "ka", "かさ", "umbrella", "かさです。", "It is an umbrella."], ["き", "ki", "き", "tree", "きです。", "It is a tree."], ["く", "ku", "くつ", "shoes", "くつです。", "They are shoes."], ["け", "ke", "けさ", "this morning", "けさです。", "It is this morning."], ["こ", "ko", "こえ", "voice", "こえです。", "It is a voice."],
  ["さ", "sa", "さかな", "fish", "さかなです。", "It is a fish."], ["し", "shi", "しお", "salt", "しおです。", "It is salt."], ["す", "su", "すし", "sushi", "すしです。", "It is sushi."], ["せ", "se", "せかい", "world", "せかいです。", "It is the world."], ["そ", "so", "そら", "sky", "そらです。", "It is the sky."],
  ["た", "ta", "たこ", "octopus", "たこです。", "It is an octopus."], ["ち", "chi", "ちず", "map", "ちずです。", "It is a map."], ["つ", "tsu", "つき", "moon", "つきです。", "It is the moon."], ["て", "te", "て", "hand", "てです。", "It is a hand."], ["と", "to", "とり", "bird", "とりです。", "It is a bird."],
  ["な", "na", "なつ", "summer", "なつです。", "It is summer."], ["に", "ni", "にく", "meat", "にくです。", "It is meat."], ["ぬ", "nu", "ぬの", "cloth", "ぬのです。", "It is cloth."], ["ね", "ne", "ねこ", "cat", "ねこです。", "It is a cat."], ["の", "no", "のり", "seaweed", "のりです。", "It is seaweed."],
  ["は", "ha", "はな", "flower", "はなです。", "It is a flower."], ["ひ", "hi", "ひと", "person", "ひとです。", "It is a person."], ["ふ", "fu", "ふね", "boat", "ふねです。", "It is a boat."], ["へ", "he", "へや", "room", "へやです。", "It is a room."], ["ほ", "ho", "ほし", "star", "ほしです。", "It is a star."],
  ["ま", "ma", "まど", "window", "まどです。", "It is a window."], ["み", "mi", "みず", "water", "みずです。", "It is water."], ["む", "mu", "むし", "insect", "むしです。", "It is an insect."], ["め", "me", "め", "eye", "めです。", "It is an eye."], ["も", "mo", "もも", "peach", "ももです。", "It is a peach."],
  ["や", "ya", "やま", "mountain", "やまです。", "It is a mountain."], ["ゆ", "yu", "ゆき", "snow", "ゆきです。", "It is snow."], ["よ", "yo", "よる", "night", "よるです。", "It is night."], ["ら", "ra", "らいおん", "lion", "らいおんです。", "It is a lion."], ["り", "ri", "りす", "squirrel", "りすです。", "It is a squirrel."], ["る", "ru", "るす", "absence", "るすです。", "No one is home."], ["れ", "re", "れきし", "history", "れきしです。", "It is history."], ["ろ", "ro", "ろく", "six", "ろくです。", "It is six."], ["わ", "wa", "わに", "crocodile", "わにです。", "It is a crocodile."], ["を", "o", "を", "object particle", "みずをのみます。", "I drink water."], ["ん", "n", "ほん", "book", "ほんです。", "It is a book."]
];

const topicLexicon: Record<LanguageCode, Record<string, [string, string, string, string][]>> = {
  en: { greeting: [["hello", "hello", "Hello, Maya.", "Hello, Maya."], ["goodbye", "farewell", "Goodbye, Leo.", "Goodbye, Leo."], ["please", "polite request", "Water, please.", "Water, please."], ["thank you", "gratitude", "Thank you, Ana.", "Thank you, Ana."]], name: [["my name is", "introduction phrase", "My name is Kai.", "My name is Kai."], ["I am", "identity phrase", "I am Maya.", "I am Maya."], ["from", "origin word", "I am from Japan.", "I am from Japan."], ["meet", "encounter someone", "Nice to meet you.", "Nice to meet you."]], number: [["one", "1", "I have one book.", "I have one book."], ["five", "5", "I see five pens.", "I see five pens."], ["ten", "10", "I count to ten.", "I count to ten."], ["twenty", "20", "There are twenty chairs.", "There are twenty chairs."]], family: [["mother", "female parent", "My mother is kind.", "My mother is kind."], ["father", "male parent", "My father is here.", "My father is here."], ["sister", "female sibling", "My sister reads.", "My sister reads."], ["brother", "male sibling", "My brother smiles.", "My brother smiles."]], food: [["water", "clear drink", "I drink water.", "I drink water."], ["bread", "baked food", "I eat bread.", "I eat bread."], ["rice", "grain food", "I like rice.", "I like rice."], ["apple", "a fruit", "The apple is red.", "The apple is red."]], place: [["station", "transport place", "The station is here.", "The station is here."], ["bank", "money place", "The bank is there.", "The bank is there."], ["left", "left direction", "Turn left.", "Turn left."], ["right", "right direction", "Turn right.", "Turn right."]], time: [["morning", "early part of day", "I study in the morning.", "I study in the morning."], ["today", "this day", "I work today.", "I work today."], ["tomorrow", "next day", "I travel tomorrow.", "I travel tomorrow."], ["yesterday", "previous day", "I studied yesterday.", "I studied yesterday."]], default: [["book", "something to read", "This is a book.", "This is a book."], ["student", "a learner", "I am a student.", "I am a student."], ["ready", "prepared", "I am ready.", "I am ready."], ["question", "something you ask", "I have a question.", "I have a question."]] },
  ja: { greeting: [["こんにちは", "hello", "こんにちは、マヤさん。", "Hello, Maya."], ["さようなら", "goodbye", "さようなら、レオさん。", "Goodbye, Leo."], ["ありがとう", "thank you", "ありがとうございます。", "Thank you."], ["おねがいします", "please", "みずをおねがいします。", "Water, please."]], name: [["わたし", "I / me", "わたしはケンです。", "I am Ken."], ["なまえ", "name", "なまえはユキです。", "The name is Yuki."], ["から", "from", "ベトナムからきました。", "I came from Vietnam."], ["はじめまして", "nice to meet you", "はじめまして。", "Nice to meet you."]], number: [["いち", "one", "りんごがいちです。", "There is one apple."], ["ご", "five", "ほんがごさつあります。", "There are five books."], ["じゅう", "ten", "じゅうまでかぞえます。", "I count to ten."], ["にじゅう", "twenty", "にじゅうです。", "It is twenty."]], family: [["おかあさん", "mother", "おかあさんはやさしいです。", "My mother is kind."], ["おとうさん", "father", "おとうさんはここです。", "My father is here."], ["おねえさん", "older sister", "おねえさんはよみます。", "My older sister reads."], ["おにいさん", "older brother", "おにいさんはわらいます。", "My older brother smiles."]], food: [["みず", "water", "みずをのみます。", "I drink water."], ["パン", "bread", "パンをたべます。", "I eat bread."], ["ごはん", "rice / meal", "ごはんがすきです。", "I like rice."], ["りんご", "apple", "りんごはあかいです。", "The apple is red."]], place: [["えき", "station", "えきはここです。", "The station is here."], ["ぎんこう", "bank", "ぎんこうはそこです。", "The bank is there."], ["ひだり", "left", "ひだりへまがります。", "Turn left."], ["みぎ", "right", "みぎへまがります。", "Turn right."]], time: [["あさ", "morning", "あさにべんきょうします。", "I study in the morning."], ["きょう", "today", "きょうはたらきます。", "I work today."], ["あした", "tomorrow", "あしたいきます。", "I go tomorrow."], ["きのう", "yesterday", "きのうべんきょうしました。", "I studied yesterday."]], default: [["ほん", "book", "これはほんです。", "This is a book."], ["がくせい", "student", "わたしはがくせいです。", "I am a student."], ["はい", "yes", "はい、そうです。", "Yes, that is right."], ["なに", "what", "これはなんですか。", "What is this?"]] }
};

const categoryFor = (title: string) => /hello|greet|adi|salud|あいさつ|meet|please|thank|gracias|request/i.test(title) ? "greeting" : /name|introdu|from|present|sentences|です/i.test(title) ? "name" : /number|数字|número/i.test(title) ? "number" : /family|people|家族/i.test(title) ? "family" : /food|restaurant|comida|食|drink|preference/i.test(title) ? "food" : /place|direction|transport|shopping|restaurant|場所|行き|dónde/i.test(title) ? "place" : /time|day|date|past|future|routine|yesterday|plans|時|日/i.test(title) ? "time" : "default";
const slug = (value: string) => value.normalize("NFKD").replace(/[^a-zA-Z0-9\u3040-\u30ff\u4e00-\u9faf]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "lesson";
const shuffled = <T>(items: T[]) => [...items].sort((a, b) => String(a).localeCompare(String(b)));
const unique = <T>(items: T[], key: (item: T) => string = (item) => String(item)) => {
  const seen = new Set<string>();
  return items.filter((item) => { const value = key(item); if (seen.has(value)) return false; seen.add(value); return true; });
};
const fourUniqueOptions = (correct: string, candidates: string[], fallback: string[]) => unique([correct, ...candidates, ...fallback].filter(Boolean)).slice(0, 4);
const tokenizeSentenceForBuilder = (sentence: string, language: LanguageCode) => {
  const clean = sentence.replace(/[.!?¡¿。！？]/g, "").trim();
  if (language !== "ja") return clean.split(/\s+/).filter(Boolean);
  return clean.match(/[一-龯々〆ヵヶ]+（[^）]+）|[ぁ-んァ-ンー]+|[A-Za-z0-9]+/g) ?? [clean];
};

type LocalMap = { en: string; vi?: string; ja?: string; es?: string };
const meaningCatalog: Record<string, LocalMap> = {
  rain: { en: "rain", vi: "mưa", ja: "雨", es: "lluvia" }, candy: { en: "candy", vi: "kẹo", ja: "飴", es: "caramelo" }, bridge: { en: "bridge", vi: "cây cầu", ja: "橋", es: "puente" }, chopsticks: { en: "chopsticks", vi: "đũa", ja: "箸", es: "palillos" }, flower: { en: "flower", vi: "hoa", ja: "花", es: "flor" }, nose: { en: "nose", vi: "mũi", ja: "鼻", es: "nariz" },
  dog: { en: "dog", vi: "chó", ja: "犬", es: "perro" }, sea: { en: "sea", vi: "biển", ja: "海", es: "mar" }, station: { en: "station", vi: "nhà ga", ja: "駅", es: "estación" }, ogre: { en: "ogre", vi: "quỷ", ja: "鬼", es: "ogro" }, umbrella: { en: "umbrella", vi: "ô", ja: "傘", es: "paraguas" }, tree: { en: "tree", vi: "cây", ja: "木", es: "árbol" }, shoes: { en: "shoes", vi: "giày", ja: "靴", es: "zapatos" }, fish: { en: "fish", vi: "cá", ja: "魚", es: "pez" }, water: { en: "water", vi: "nước", ja: "水", es: "agua" }, book: { en: "book", vi: "sách", ja: "本", es: "libro" }, student: { en: "student", vi: "học sinh", ja: "学生", es: "estudiante" }, hello: { en: "hello", vi: "xin chào", ja: "こんにちは", es: "hola" }, goodbye: { en: "goodbye", vi: "tạm biệt", ja: "さようなら", es: "adiós" }, "thank you": { en: "thank you", vi: "cảm ơn", ja: "ありがとう", es: "gracias" },
  one: { en: "one", vi: "một", ja: "一", es: "uno" }, five: { en: "five", vi: "năm", ja: "五", es: "cinco" }, ten: { en: "ten", vi: "mười", ja: "十", es: "diez" }, twenty: { en: "twenty", vi: "hai mươi", ja: "二十", es: "veinte" }, mother: { en: "mother", vi: "mẹ", ja: "母", es: "madre" }, father: { en: "father", vi: "bố", ja: "父", es: "padre" }, apple: { en: "apple", vi: "táo", ja: "りんご", es: "manzana" }, bread: { en: "bread", vi: "bánh mì", ja: "パン", es: "pan" }, rice: { en: "rice", vi: "cơm", ja: "ごはん", es: "arroz" }
};
const localizedMeanings = (meaning: string, target = meaning): { en: string[]; vi: string[]; ja: string[]; es: string[] } => {
  const base = meaningCatalog[meaning.toLowerCase()] ?? { en: meaning };
  const vi = base.vi ?? meaning; const ja = base.ja ?? target; const es = base.es ?? meaning;
  const extraVi = meaning === "rain" ? ["mua"] : meaning === "candy" ? ["kẹo ngọt", "keo"] : meaning === "bridge" ? ["cầu", "cay cau", "cau"] : meaning === "chopsticks" ? ["dua"] : meaning === "station" ? ["ga", "nha ga"] : meaning === "nose" ? ["mui"] : [];
  const extraEn = meaning === "candy" ? ["sweet"] : [];
  return { en: [base.en, ...extraEn], vi: [vi, ...extraVi], ja: [ja], es: [es] };
};
const localizedSentence = (english: string, meaning?: string): { en: string; vi: string; ja?: string; es: string } => {
  const known: Record<string, { vi: string; es: string }> = {
    "It is rain.": { vi: "Đây là mưa.", es: "Es lluvia." }, "It is candy.": { vi: "Đây là kẹo.", es: "Es caramelo." }, "It is a dog.": { vi: "Đây là con chó.", es: "Es un perro." }, "It is the sea.": { vi: "Đây là biển.", es: "Es el mar." }, "It is a station.": { vi: "Đây là nhà ga.", es: "Es una estación." }, "It is a flower.": { vi: "Đây là một bông hoa.", es: "Es una flor." }
  };
  const match = known[english]; const fallbackMeaning = meaning ? localizedMeanings(meaning).vi[0] : "nội dung này";
  return { en: english, vi: match?.vi ?? (english.startsWith("It is") ? `Đây là ${fallbackMeaning}.` : english), es: match?.es ?? english };
};
const speechOnly = (text: string) => text.replace(/([一-龯々〆ヵヶぁ-んァ-ンー]+)?（([^）]+)）/g, "$2");
const translatedLabel = (value: string): LocalMap => ({
  en: value,
  vi: ({ "What is Hiragana?": "Hiragana là gì?", "Hiragana is a sound script": "Hiragana là chữ biểu âm", "One symbol, one beat": "Mỗi ký tự, một nhịp", "Read left to right": "Đọc từ trái sang phải", "First recognition": "Nhận biết đầu tiên", "Hiragana Foundation": "Nền tảng Hiragana", "Alphabet and First Sounds": "Bảng chữ cái và âm đầu tiên" } as Record<string, string>)[value] ?? value,
  ja: value,
  es: value
});
const translatedGoal = (value: string): LocalMap => ({ en: value, vi: ({ "Recognize the first hiragana rows and their sounds.": "Nhận biết các hàng hiragana đầu tiên và cách phát âm.", "Recognize English letters, sounds, and survival words.": "Nhận biết chữ cái, âm và từ tiếng Anh cơ bản.", "Recognize Spanish letters, vowels, and first words.": "Nhận biết chữ cái, nguyên âm và những từ tiếng Tây Ban Nha đầu tiên." } as Record<string, string>)[value] ?? `Học và sử dụng nội dung: ${value}`, ja: value, es: value });

const makeAmbiguousJapaneseVocabulary = (id: string, pairIndex: number): VocabularyItem[] => {
  const pairs = [
    [["雨（あめ）", "あめ", "雨", "rain", "雨（あめ）です。", "It is rain."], ["飴（あめ）", "あめ", "飴", "candy", "飴（あめ）です。", "It is candy."]],
    [["橋（はし）", "はし", "橋", "bridge", "橋（はし）です。", "It is a bridge."], ["箸（はし）", "はし", "箸", "chopsticks", "箸（はし）です。", "They are chopsticks."]],
    [["花（はな）", "はな", "花", "flower", "花（はな）です。", "It is a flower."], ["鼻（はな）", "はな", "鼻", "nose", "鼻（はな）です。", "It is a nose."]]
  ];
  return (pairs[pairIndex] ?? []).map(([displayText, reading, kanji, meaning, exampleDisplay, english], index) => {
    const meanings = localizedMeanings(meaning, kanji); const exampleTranslations = localizedSentence(english, meaning);
    return { kind: "vocabulary", id: `${id}-amb${index + 1}`, word: displayText, target: displayText, displayText, reading, pronunciation: reading, kanji, kana: reading, speechText: reading, meaning, meanings, acceptedAnswers: meanings, exampleSentence: exampleDisplay, exampleDisplay, exampleSpeechText: speechOnly(exampleDisplay), sentenceTranslation: english, exampleTranslations, term: displayText, translation: meaning, example: exampleDisplay, note: "Kanji keeps this homophone meaning clear." };
  });
};

const makePronunciationItem = (seed: PronSeed, id: string, language: LanguageCode, level: LevelId): PronunciationItem => {
  const [symbol, pronunciation, exampleWord, meaning, exampleSentence, sentenceTranslation] = seed;
  const meanings = localizedMeanings(meaning, speechOnly(exampleWord)); const exampleTranslations = localizedSentence(sentenceTranslation, meaning); const readingMatch = exampleWord.match(/（([^）]+)）/); const kanji = language === "ja" && readingMatch ? exampleWord.split("（")[0] : undefined;
  const practice: Exercise = { id: `${id}-practice`, type: "choose_correct_letter", level, question: `Which symbol matches “${pronunciation}”?`, questionTranslations: { vi: `Ký tự nào có cách đọc “${pronunciation}”?`, ja: `「${pronunciation}」と読む文字はどれですか？`, es: `¿Qué símbolo se pronuncia “${pronunciation}”?` }, options: [symbol, "?", "#", "*"], correctAnswer: symbol, explanation: `${symbol} is pronounced ${pronunciation}.`, explanationTranslations: { vi: `${symbol} được đọc là ${pronunciation}.`, ja: `${symbol}は${pronunciation}と読みます。`, es: `${symbol} se pronuncia ${pronunciation}.` }, hint: `Look for the symbol used in ${exampleWord}.`, hintTranslations: { vi: `Hãy tìm ký tự xuất hiện cùng ${exampleWord}.`, ja: `${exampleWord}と一緒に使われる文字を探しましょう。`, es: `Busca el símbolo usado con ${exampleWord}.` }, targetLanguage: language, nativeTranslation: meaning, difficulty: "easy", relatedIds: [id], relatedPronunciationIds: [id] };
  return { kind: "pronunciation", id, symbol, pronunciation, exampleWord, displayText: symbol, reading: pronunciation, kanji, kana: readingMatch?.[1], speechText: symbol, meaning, meanings, exampleSentence, exampleDisplay: exampleSentence, exampleSpeechText: speechOnly(exampleSentence), sentenceTranslation, exampleTranslations, note: `${exampleWord} is a beginner-friendly example for ${symbol}.`, practice };
};

const makeVocabularyItems = (language: LanguageCode, title: string, id: string): VocabularyItem[] => topicLexicon[language][categoryFor(title)].map(([word, meaning, exampleSentence, sentenceTranslation], index) => { const meanings = localizedMeanings(meaning, word); return { kind: "vocabulary", id: `${id}-v${index + 1}`, word, target: word, displayText: word, speechText: speechOnly(word), meaning, meanings, acceptedAnswers: meanings, exampleSentence, exampleDisplay: exampleSentence, exampleSpeechText: speechOnly(exampleSentence), sentenceTranslation, exampleTranslations: localizedSentence(sentenceTranslation, meaning), pronunciation: language === "ja" ? word : undefined, term: word, translation: meaning, example: exampleSentence, tags: [categoryFor(title)] }; });

const contentLabel = (item: ContentItem) => item.kind === "pronunciation" ? item.symbol : item.kind === "vocabulary" ? item.word : item.kind === "grammar" ? item.pattern : item.text;
const contentMeaning = (item: ContentItem) => item.kind === "pronunciation" ? item.pronunciation : item.kind === "vocabulary" ? item.meaning : item.kind === "grammar" ? item.explanation : item.translation;
const contentSentence = (item: ContentItem) => item.kind === "pronunciation" ? item.exampleSentence : item.kind === "vocabulary" ? item.exampleSentence : item.kind === "grammar" ? item.examples[0].text : item.text;
const contentTranslation = (item: ContentItem) => item.kind === "pronunciation" ? item.sentenceTranslation : item.kind === "vocabulary" ? item.sentenceTranslation : item.kind === "grammar" ? item.examples[0].translation : item.translation;
const contentMeanings = (item: ContentItem): { en: string[]; vi: string[]; ja: string[]; es: string[] } => { const fallback = localizedMeanings(contentMeaning(item), contentLabel(item)); const value = item.kind === "pronunciation" || item.kind === "vocabulary" ? item.meanings : undefined; return { en: value?.en ?? fallback.en, vi: value?.vi ?? fallback.vi, ja: value?.ja ?? fallback.ja, es: value?.es ?? fallback.es }; };
const contentTranslations = (item: ContentItem): { en: string; vi: string; ja: string; es: string } => { const fallback = localizedSentence(contentTranslation(item), item.kind === "pronunciation" || item.kind === "vocabulary" ? item.meaning : undefined); const value = item.kind === "pronunciation" || item.kind === "vocabulary" ? item.exampleTranslations : undefined; return { en: value?.en ?? fallback.en, vi: value?.vi ?? fallback.vi, ja: value?.ja ?? fallback.ja ?? fallback.en, es: value?.es ?? fallback.es }; };
const readingOrText = (value: string) => value.match(/（([^）]+)）/)?.[1] ?? value;
const startsWithKana = (value: string, kana: string) => readingOrText(value).startsWith(kana);
const kanaStartOptions = (targetKana: string, correctWord: string) => {
  const distractors = jaKana.map((seed) => seed[2]).filter((word) => !startsWithKana(word, targetKana));
  return shuffled(unique([correctWord, ...distractors.slice(0, 3)], speechOnly));
};
const kanaReadingPairs = (items: ContentItem[]) => unique([...items.filter((item): item is PronunciationItem => item.kind === "pronunciation").map((item) => ({ left: item.symbol, right: item.pronunciation })), ...jaKana.map((seed) => ({ left: seed[0], right: seed[1] }))], (pair) => pair.left).slice(0, 4);
const vocabularyPairs = (items: ContentItem[], locale: "en" | "vi" | "ja" | "es") => unique(items.filter((item): item is VocabularyItem => item.kind === "vocabulary").slice(0, 5).map((item) => ({ left: item.displayText ?? item.word, right: contentMeanings(item)[locale]?.[0] ?? item.meaning })), (pair) => pair.left);

const makeVocabularyMatchExercise = (items: VocabularyItem[], language: LanguageCode, level: LevelId, id: string): Exercise | null => {
  const uniqueItems = unique(items, (item) => item.displayText ?? item.word).slice(0, 5);
  if (uniqueItems.length < 2) return null;
  const pairs = vocabularyPairs(uniqueItems, "en");
  const pairTranslations = { en: pairs, vi: vocabularyPairs(uniqueItems, "vi"), ja: vocabularyPairs(uniqueItems, "ja"), es: vocabularyPairs(uniqueItems, "es") };
  return { id: `${id}-vocab-match`, type: language === "ja" ? "match_vocab_meaning" : "match_pairs", level, question: "Match each word with its meaning.", questionTranslations: { vi: "Ghép mỗi từ với nghĩa phù hợp.", ja: "それぞれの単語と意味を組み合わせてください。", es: "Relaciona cada palabra con su significado." }, pairs, pairTranslations, correctAnswer: pairs.map((pair) => `${pair.left}=${pair.right}`), acceptedAnswers: { en: pairTranslations.en.map((pair) => `${pair.left}=${pair.right}`), vi: pairTranslations.vi.map((pair) => `${pair.left}=${pair.right}`), ja: pairTranslations.ja.map((pair) => `${pair.left}=${pair.right}`), es: pairTranslations.es.map((pair) => `${pair.left}=${pair.right}`) }, explanation: "Each word has one matching meaning.", explanationTranslations: { vi: "Mỗi từ chỉ khớp với một nghĩa phù hợp.", ja: "各単語には対応する意味が一つあります。", es: "Cada palabra tiene un significado correspondiente." }, hint: "Match the exact word, not just a sound.", hintTranslations: { vi: "Hãy ghép đúng từng từ, không chỉ dựa vào âm giống nhau.", ja: "音だけでなく、単語そのものを確認しましょう。", es: "Relaciona la palabra exacta, no solo el sonido." }, targetLanguage: language, nativeTranslation: "Match vocabulary meanings", difficulty: "medium", relatedIds: uniqueItems.map((item) => item.id), nativeLanguageMode: true, matchPairMode: "vocabulary_meaning" };
};

const makeExercises = (items: ContentItem[], language: LanguageCode, level: LevelId, id: string): Exercise[] => {
  const first = items[0]; const second = items[1] ?? first;
  const labels = items.map(contentLabel); const meanings = items.map(contentMeaning);
  while (labels.length < 4) { labels.push(topicLexicon[language].default[labels.length % 4][0]); meanings.push(topicLexicon[language].default[meanings.length % 4][1]); }
  const firstLabel = contentLabel(first); const firstMeaning = contentMeaning(first); const sentence = contentSentence(first); const translation = contentTranslation(first);
  const words = tokenizeSentenceForBuilder(sentence, language);
  const related = items.map((item) => item.id); const pronunciation = first.kind === "pronunciation"; const firstAnswers = contentMeanings(first); const secondAnswers = contentMeanings(second); const firstTranslations = contentTranslations(first);
  const localizedMeaningOptions = (locale: "en" | "vi" | "ja" | "es") => fourUniqueOptions(contentMeanings(first)[locale]?.[0] ?? contentMeaning(first), items.map((item) => contentMeanings(item)[locale]?.[0] ?? contentMeaning(item)), topicLexicon[language].default.map((item) => localizedMeanings(item[1], item[0])[locale][0]));
  const localizedPairs = (locale: "en" | "vi" | "ja" | "es") => unique(items.filter((item) => item.kind !== "pronunciation").slice(0, 4).map((item) => ({ left: contentLabel(item), right: contentMeanings(item)[locale]?.[0] ?? contentMeaning(item) })), (pair) => pair.left);
  const targetKana = pronunciation && first.kind === "pronunciation" ? first.symbol : undefined;
  const correctStartingWord = pronunciation && first.kind === "pronunciation" ? first.exampleWord : firstLabel;
  const wordStartOptions = targetKana && language === "ja" ? kanaStartOptions(targetKana, correctStartingWord) : shuffled(unique(pronunciation ? items.map((item) => item.kind === "pronunciation" ? item.exampleWord : contentLabel(item)) : labels));
  const matchPairs = pronunciation ? kanaReadingPairs(items) : localizedPairs("en");
  const matchPairTranslations = pronunciation ? { en: matchPairs, vi: matchPairs, ja: matchPairs, es: matchPairs } : { en: localizedPairs("en"), vi: localizedPairs("vi"), ja: localizedPairs("ja"), es: localizedPairs("es") };
  const matchMode = pronunciation ? "kana_reading" as const : "vocabulary_meaning" as const;
  const readingOptions = pronunciation ? shuffled(fourUniqueOptions(firstMeaning, items.filter((item): item is PronunciationItem => item.kind === "pronunciation").map((item) => item.pronunciation), jaKana.map((seed) => seed[1]))) : [];
  const soundOptions = pronunciation ? shuffled(fourUniqueOptions(contentMeaning(second), items.filter((item): item is PronunciationItem => item.kind === "pronunciation").map((item) => item.pronunciation), jaKana.map((seed) => seed[1]))) : shuffled(fourUniqueOptions(contentMeaning(second), meanings, topicLexicon[language].default.map((item) => item[1])));
  const choiceType = pronunciation && language === "ja" ? "choose_correct_reading" : pronunciation ? "choose_correct_letter" : language === "ja" ? "choose_meaning" : "multiple_choice";
  const startType = pronunciation && language === "ja" ? "choose_word_starting_with_kana" : pronunciation ? "choose_word_starting_with_letter" : "fill_blank";
  const pairType = pronunciation && language === "ja" ? "match_kana_reading" : !pronunciation && language === "ja" ? "match_vocab_meaning" : "match_pairs";
  const textAnswerType = !pronunciation && language === "ja" ? "type_meaning" : "translation";
  return [
    { id: `${id}-e1`, type: choiceType, level, question: pronunciation && language === "ja" ? `${firstLabel} is read as:` : pronunciation ? `Choose the symbol pronounced “${firstMeaning}”.` : `What does “${firstLabel}” mean?`, questionTranslations: { vi: pronunciation && language === "ja" ? `${firstLabel} được đọc là:` : pronunciation ? `Chọn ký tự được đọc là “${firstMeaning}”.` : `“${firstLabel}” nghĩa là gì?`, ja: pronunciation && language === "ja" ? `${firstLabel}の読み方はどれですか？` : pronunciation ? `「${firstMeaning}」と読む文字を選んでください。` : `「${firstLabel}」の意味は？`, es: pronunciation && language === "ja" ? `${firstLabel} se lee:` : pronunciation ? `Elige el símbolo pronunciado “${firstMeaning}”.` : `¿Qué significa “${firstLabel}”?` }, options: pronunciation && language === "ja" ? readingOptions : pronunciation ? shuffled(labels) : shuffled(meanings), optionTranslations: pronunciation ? undefined : { en: shuffled(localizedMeaningOptions("en")), vi: shuffled(localizedMeaningOptions("vi")), ja: shuffled(localizedMeaningOptions("ja")), es: shuffled(localizedMeaningOptions("es")) }, correctAnswer: pronunciation && language === "ja" ? firstMeaning : pronunciation ? firstLabel : firstMeaning, acceptedAnswers: pronunciation && language === "ja" ? { en: [firstMeaning], vi: [firstMeaning], ja: [firstMeaning], es: [firstMeaning] } : pronunciation ? { en: [firstLabel], vi: [firstLabel], ja: [firstLabel], es: [firstLabel] } : firstAnswers, explanation: pronunciation && language === "ja" ? `${firstLabel} is pronounced ${firstMeaning}.` : `${firstLabel} connects to ${firstMeaning}.`, explanationTranslations: { vi: pronunciation && language === "ja" ? `${firstLabel} là một chữ Hiragana, đọc là "${firstMeaning}".` : `${firstLabel} có nghĩa là ${firstAnswers.vi[0]}.`, ja: pronunciation && language === "ja" ? `${firstLabel}は${firstMeaning}と読みます。` : `${firstLabel}は${firstAnswers.ja[0]}という意味です。`, es: pronunciation && language === "ja" ? `${firstLabel} se pronuncia ${firstMeaning}.` : `${firstLabel} significa ${firstAnswers.es[0]}.` }, hint: `Review the first content card.`, hintTranslations: { vi: "Hãy xem lại thẻ nội dung đầu tiên.", ja: "最初のカードを見直しましょう。", es: "Revisa la primera tarjeta." }, targetLanguage: language, nativeTranslation: firstMeaning, difficulty: "easy", relatedIds: related, nativeLanguageMode: true },
    { id: `${id}-e2`, type: startType, level, question: pronunciation ? `Which word starts with ${firstLabel}?` : `${sentence.replace(firstLabel, "___")}`, questionTranslations: { vi: pronunciation ? `Từ nào bắt đầu bằng ${firstLabel}?` : `${sentence.replace(firstLabel, "___")}`, ja: pronunciation ? `${firstLabel}で始まる言葉はどれですか？` : `${sentence.replace(firstLabel, "___")}`, es: pronunciation ? `¿Qué palabra empieza con ${firstLabel}?` : `${sentence.replace(firstLabel, "___")}` }, options: wordStartOptions, correctAnswer: correctStartingWord, explanation: `${firstLabel}: ${firstMeaning}.`, explanationTranslations: { vi: `${firstLabel}: ${firstAnswers.vi[0]}.`, ja: `${firstLabel}: ${firstAnswers.ja[0]}。`, es: `${firstLabel}: ${firstAnswers.es[0]}.` }, hint: `The answer appears in this micro-lesson.`, hintTranslations: { vi: "Đáp án nằm trong bài học nhỏ này.", ja: "答えはこのマイクロレッスンにあります。", es: "La respuesta aparece en esta microlección." }, targetLanguage: language, nativeTranslation: translation, difficulty: "easy", relatedIds: related, targetKana },
    { id: `${id}-e3`, type: pairType, level, question: pronunciation ? "Match each kana with its reading." : "Match each word with its meaning.", questionTranslations: { vi: pronunciation ? "Ghép mỗi kana với cách đọc phù hợp." : "Ghép mỗi từ với nghĩa phù hợp.", ja: pronunciation ? "それぞれのかなと読み方を組み合わせてください。" : "それぞれの単語と意味を組み合わせてください。", es: pronunciation ? "Relaciona cada kana con su lectura." : "Relaciona cada palabra con su significado." }, pairs: matchPairs, pairTranslations: matchPairTranslations, correctAnswer: matchPairs.map((pair) => `${pair.left}=${pair.right}`), acceptedAnswers: { en: matchPairTranslations.en.map((pair) => `${pair.left}=${pair.right}`), vi: matchPairTranslations.vi.map((pair) => `${pair.left}=${pair.right}`), ja: matchPairTranslations.ja.map((pair) => `${pair.left}=${pair.right}`), es: matchPairTranslations.es.map((pair) => `${pair.left}=${pair.right}`) }, explanation: "Each pair comes from the new content.", explanationTranslations: { vi: "Mỗi cặp đều đến từ nội dung vừa học.", ja: "すべて新しい学習内容から出題されています。", es: "Cada par procede del contenido nuevo." }, hint: "Start with the pair you recognize best.", hintTranslations: { vi: "Hãy bắt đầu với cặp bạn nhận ra rõ nhất.", ja: "一番分かる組み合わせから始めましょう。", es: "Empieza por el par que mejor reconozcas." }, targetLanguage: language, nativeTranslation: "Match the new items", difficulty: "medium", relatedIds: related, nativeLanguageMode: !pronunciation, matchPairMode: matchMode },
    { id: `${id}-e4`, type: textAnswerType, level, question: `Translate into English: ${sentence}`, questionTranslations: { vi: !pronunciation && language === "ja" ? `${firstLabel} nghĩa là gì?` : `Dịch sang tiếng Việt: ${sentence}`, ja: !pronunciation && language === "ja" ? `${firstLabel}の意味は何ですか？` : `日本語に訳してください: ${sentence}`, es: !pronunciation && language === "ja" ? `¿Qué significa ${firstLabel}?` : `Traduce al español: ${sentence}` }, correctAnswer: translation, acceptedAnswers: !pronunciation && language === "ja" ? firstAnswers : { en: [firstTranslations.en, ...firstAnswers.en], vi: [firstTranslations.vi, ...firstAnswers.vi], ja: [firstTranslations.ja ?? sentence, ...firstAnswers.ja], es: [firstTranslations.es, ...firstAnswers.es] }, explanation: `${sentence} means “${translation}”.`, explanationTranslations: { vi: !pronunciation && language === "ja" ? `${firstLabel} có nghĩa là “${firstAnswers.vi[0]}”.` : `${sentence} có nghĩa là “${firstTranslations.vi}”`, ja: !pronunciation && language === "ja" ? `${firstLabel}は${firstAnswers.ja[0]}という意味です。` : `${sentence}の意味は「${firstTranslations.ja ?? sentence}」です。`, es: !pronunciation && language === "ja" ? `${firstLabel} significa “${firstAnswers.es[0]}”.` : `${sentence} significa “${firstTranslations.es}”.` }, hint: `Use the content card meaning.`, hintTranslations: { vi: "Hãy dùng nghĩa trên thẻ nội dung.", ja: "内容カードの意味を使いましょう。", es: "Usa el significado de la tarjeta." }, targetLanguage: language, nativeTranslation: translation, difficulty: "medium", relatedIds: related, nativeLanguageMode: true },
    { id: `${id}-e5`, type: "sentence_builder", level, question: `Build: “${translation}”`, questionTranslations: { vi: `Sắp xếp câu: “${firstTranslations.vi}”`, ja: `文を作ってください: 「${firstTranslations.ja ?? translation}」`, es: `Construye: “${firstTranslations.es}”` }, words: shuffled(words), correctAnswer: language === "ja" ? words.join("") : words.join(" "), explanation: `The complete sentence is ${sentence}`, explanationTranslations: { vi: `Câu hoàn chỉnh là ${sentence}`, ja: `正しい文は${sentence}`, es: `La oración completa es ${sentence}` }, hint: "Begin with the subject or topic.", hintTranslations: { vi: "Bắt đầu bằng chủ ngữ hoặc chủ đề.", ja: "主語またはトピックから始めましょう。", es: "Empieza por el sujeto o tema." }, targetLanguage: language, nativeTranslation: translation, difficulty: "hard", relatedIds: related },
    { id: `${id}-e6`, type: pronunciation ? "choose_correct_sound" : "listening_placeholder", level, question: pronunciation ? `Which sound belongs to ${contentLabel(second)}?` : "Listen and choose the correct meaning.", questionTranslations: { vi: pronunciation ? `Âm nào thuộc về ${contentLabel(second)}?` : "Nghe và chọn nghĩa đúng.", ja: pronunciation ? `${contentLabel(second)}の音はどれですか？` : "音声を聞いて正しい意味を選んでください。", es: pronunciation ? `¿Qué sonido corresponde a ${contentLabel(second)}?` : "Escucha y elige el significado correcto." }, options: pronunciation ? soundOptions : shuffled(meanings), optionTranslations: pronunciation ? undefined : { en: shuffled(localizedMeaningOptions("en")), vi: shuffled(localizedMeaningOptions("vi")), ja: shuffled(localizedMeaningOptions("ja")), es: shuffled(localizedMeaningOptions("es")) }, audioText: second.kind === "pronunciation" ? second.speechText ?? second.symbol : second.kind === "vocabulary" ? second.speechText ?? second.word : contentLabel(second), correctAnswer: contentMeaning(second), acceptedAnswers: pronunciation ? { en: [contentMeaning(second)], vi: [contentMeaning(second)], ja: [contentMeaning(second)], es: [contentMeaning(second)] } : secondAnswers, explanation: `${contentLabel(second)} connects to ${contentMeaning(second)}.`, explanationTranslations: { vi: pronunciation ? `${contentLabel(second)} được đọc là ${contentMeaning(second)}.` : `${contentLabel(second)} có nghĩa là ${secondAnswers.vi[0]}.`, ja: pronunciation ? `${contentLabel(second)}は${contentMeaning(second)}と読みます。` : `${contentLabel(second)}は${secondAnswers.ja[0]}という意味です。`, es: pronunciation ? `${contentLabel(second)} se pronuncia ${contentMeaning(second)}.` : `${contentLabel(second)} significa ${secondAnswers.es[0]}.` }, hint: "Say the item slowly.", hintTranslations: { vi: "Hãy đọc nội dung thật chậm.", ja: "ゆっくり発音しましょう。", es: "Pronuncia el elemento lentamente." }, targetLanguage: language, nativeTranslation: contentMeaning(second), difficulty: "medium", relatedIds: related, nativeLanguageMode: true }
  ];
};

interface LessonBlueprint { title: string; type?: LessonType; skill?: TrackSkill; }
interface UnitBlueprint { levelId: LevelId; title: string; goal: string; lessons: LessonBlueprint[]; skill?: TrackSkill; reviewedStatus?: "reviewed" | "draft" | "needs_review"; }
const L = (title: string, type?: LessonType, skill?: TrackSkill): LessonBlueprint => ({ title, type, skill });

const examLevelFor = (language: LanguageCode, levelId: LevelId): ExamLevel | undefined => {
  if (language === "ja") {
    if (levelId === "A0") return "KANA_STARTER";
    if (levelId === "A1_1" || levelId === "A1_2") return "JLPT_N5";
    if (levelId === "A2_1" || levelId === "A2_2") return "JLPT_N4";
    if (levelId === "B1_1" || levelId === "B1_2") return "JLPT_N3";
    if (levelId === "B2") return "JLPT_N2";
  }
  if (language === "en") return "GENERAL_ENGLISH";
  return undefined;
};
const skillForLesson = (title: string, type: LessonType, fallback?: TrackSkill): TrackSkill => fallback ?? (/kanji/i.test(title) ? "kanji" : /reading|notice|passage/i.test(title) ? "reading" : /listening|sound|audio|picture/i.test(title) ? "listening" : /test|checkpoint|review/i.test(title) ? "mock_test" : type === "pronunciation" ? "kana" : type === "grammar" ? "grammar" : type === "vocabulary" ? "vocabulary" : "general");

const blueprints: Record<LanguageCode, UnitBlueprint[]> = {
  en: [
    { levelId: "A0", title: "Alphabet and First Sounds", goal: "Recognize English letters, sounds, and survival words.", lessons: [L("Alphabet A–Z", "pronunciation"), L("Basic English Sounds", "pronunciation"), L("Capital and Small Letters", "pronunciation"), L("First Words: I, You, Yes, No, Hello"), L("Unit Review", "review"), L("Checkpoint", "checkpoint")] },
    { levelId: "A1_1", title: "Greetings and Introductions", goal: "Greet someone and give a simple introduction.", lessons: [L("Hello and Goodbye"), L("My Name Is..."), L("I Am From..."), L("Nice to Meet You", "dialogue"), L("Unit Review", "review"), L("Checkpoint", "checkpoint")] },
    { levelId: "A1_1", title: "Basic Survival English", goal: "Handle numbers, classroom instructions, and polite requests.", lessons: [L("Numbers 1–20"), L("Classroom Words"), L("Simple Questions", "grammar"), L("Please and Thank You", "dialogue"), L("Unit Review", "review"), L("Checkpoint", "checkpoint")] },
    { levelId: "A1_2", title: "People and Things", goal: "Describe family, objects, and possession.", lessons: [L("Family", "vocabulary")] },
    { levelId: "A1_2", title: "Food and Preferences", goal: "Talk about food and basic preferences.", lessons: [L("Food and Drinks", "vocabulary")] },
    { levelId: "A2_1", title: "Daily Routine", goal: "Describe time, dates, and a normal day.", lessons: [L("Time and Daily Actions", "grammar")] },
    { levelId: "A2_1", title: "Places and Directions", goal: "Find places and follow simple directions.", lessons: [L("Places in Town", "vocabulary")] },
    { levelId: "A2_2", title: "Shopping and Restaurant", goal: "Manage prices, orders, and simple problems.", lessons: [L("Shopping and Restaurant Phrases", "dialogue")] },
    { levelId: "A2_2", title: "Past and Future Basics", goal: "Share a simple past event and future plan.", lessons: [L("Yesterday, Today, and Tomorrow", "grammar")] },
    { levelId: "B1_1", title: "Opinions and Experiences", goal: "Give opinions, explain experiences, and connect longer sentences.", lessons: [L("Giving Opinions", "grammar"), L("Past Experiences", "dialogue")] },
    { levelId: "B1_2", title: "Reading and Repair", goal: "Read short texts, explain reasons, and repair conversations.", lessons: [L("Short Reading: Daily Choices", "vocabulary"), L("Clarifying and Repairing", "dialogue")] },
    { levelId: "B2", title: "Workplace and Academic Communication", goal: "Handle nuanced expressions, longer reading, and work or academic tasks.", lessons: [L("Nuanced Workplace Requests", "dialogue"), L("Longer Reading: Project Brief", "grammar")] }
  ],
  ja: [
    { levelId: "A0", title: "Kana Starter: Hiragana", goal: "Recognize hiragana as characters and sounds, then connect them to clear example words.", skill: "kana", reviewedStatus: "reviewed", lessons: [L("What is Hiragana?", "pronunciation", "kana"), L("あいうえお", "pronunciation", "kana"), L("かきくけこ / さしすせそ", "pronunciation", "kana"), L("First Greetings", "vocabulary", "vocabulary"), L("Kana Starter Checkpoint", "checkpoint", "mock_test")] },
    { levelId: "A0", title: "Kana Starter: Katakana and Core Sounds", goal: "Complete core kana recognition, first katakana signals, and clean sound review.", skill: "kana", reviewedStatus: "reviewed", lessons: [L("Katakana First Look", "pronunciation", "kana"), L("はひふへほ / まみむめも", "pronunciation", "kana"), L("やゆよ / らりるれろ / わをん", "pronunciation", "kana"), L("Basic Sound Review", "review", "kana"), L("Hiragana Mini Reading", "pronunciation", "reading")] },
    { levelId: "A1_1", title: "JLPT N5: Vocabulary", goal: "Build a reviewed N5 sample vocabulary base for greetings, classroom words, nouns, verbs, adjectives, places, and objects.", skill: "vocabulary", reviewedStatus: "reviewed", lessons: [L("Greetings and classroom words", "vocabulary", "vocabulary"), L("Daily nouns", "vocabulary", "vocabulary"), L("Basic verbs", "vocabulary", "vocabulary"), L("Basic adjectives", "vocabulary", "vocabulary"), L("Places and objects", "vocabulary", "vocabulary")] },
    { levelId: "A1_1", title: "JLPT N5: Kanji", goal: "Recognize original sample N5-style kanji for numbers, days, people, places, and common beginner words.", skill: "kanji", reviewedStatus: "reviewed", lessons: [L("Numbers", "vocabulary", "kanji"), L("Days and time", "vocabulary", "kanji"), L("People", "vocabulary", "kanji"), L("Basic places", "vocabulary", "kanji"), L("Common N5 kanji", "vocabulary", "kanji")] },
    { levelId: "A1_1", title: "JLPT N5: Grammar", goal: "Practice core N5 grammar patterns in short original sentences.", skill: "grammar", reviewedStatus: "reviewed", lessons: [L("A は B です", "grammar", "grammar"), L("これ / それ / あれ", "grammar", "grammar"), L("の", "grammar", "grammar"), L("を / に / へ", "grammar", "grammar"), L("あります / います", "grammar", "grammar"), L("ます / ません / ました", "grammar", "grammar")] },
    { levelId: "A1_2", title: "JLPT N5: Reading", goal: "Read short original N5-style sentences, notices, dialogues, and passages.", skill: "reading", reviewedStatus: "reviewed", lessons: [L("Short sentence reading", "vocabulary", "reading"), L("Simple notice reading", "vocabulary", "reading"), L("Short dialogue reading", "dialogue", "reading"), L("Short passage reading", "vocabulary", "reading")] },
    { levelId: "A1_2", title: "JLPT N5: Listening", goal: "Use browser TTS for sound recognition, short Q&A, daily conversation, and picture-style placeholders.", skill: "listening", reviewedStatus: "reviewed", lessons: [L("Sound recognition", "pronunciation", "listening"), L("Short Q&A", "listening_placeholder", "listening"), L("Daily conversation", "dialogue", "listening"), L("Picture-style listening placeholder", "listening_placeholder", "listening")] },
    { levelId: "A1_2", title: "JLPT N5: Mini Test", goal: "Check N5 vocabulary, grammar, reading, and listening with short original review sets.", skill: "mock_test", reviewedStatus: "reviewed", lessons: [L("Vocabulary test", "checkpoint", "mock_test"), L("Grammar test", "checkpoint", "mock_test"), L("Reading mini test", "checkpoint", "mock_test"), L("Listening mini test", "checkpoint", "mock_test"), L("Section review", "review", "mock_test")] },
    { levelId: "A1_2", title: "JLPT N5: Mistake Review", goal: "Review wrong vocabulary, wrong grammar, weak kanji, and due review items.", skill: "mistake_review", reviewedStatus: "reviewed", lessons: [L("Wrong vocabulary", "review", "mistake_review"), L("Wrong grammar", "review", "mistake_review"), L("Weak kanji", "review", "mistake_review"), L("Due review items", "review", "mistake_review")] }
  ]
};

const specialPronunciationGroups = (language: LanguageCode, lessonTitle: string): { title: string; seeds: PronSeed[] }[] | null => {
  if (language === "en" && lessonTitle === "Alphabet A–Z") return [["A–E", 0, 5], ["F–J", 5, 10], ["K–O", 10, 15], ["P–T", 15, 20], ["U–Z", 20, 26], ["Alphabet Review", 0, 26]].map(([title, start, end]) => ({ title: String(title), seeds: enAlphabet.slice(Number(start), Number(end)) }));
  if (language === "ja" && lessonTitle === "あいうえお") return [...jaKana.slice(0, 5).map((seed) => ({ title: seed[0], seeds: [seed] })), { title: "あいうえお Review", seeds: jaKana.slice(0, 5) }];
  if (language === "ja" && /かき|たち|はひ|やゆ/.test(lessonTitle)) {
    const chars = [...lessonTitle].filter((char) => /[ぁ-ん]/.test(char));
    const seeds = chars.map((char) => jaKana.find((item) => item[0] === char)).filter(Boolean) as PronSeed[];
    const groups: { title: string; seeds: PronSeed[] }[] = [];
    for (let index = 0; index < seeds.length; index += 2) groups.push({ title: seeds.slice(index, index + 2).map((item) => item[0]).join("・"), seeds: seeds.slice(index, index + 2) });
    groups.push({ title: "Sound Review", seeds });
    return groups.slice(0, 6);
  }
  if (language === "ja" && lessonTitle === "What is Hiragana?") return [{ title: "Hiragana is a sound script", seeds: [] }];
  return null;
};

const makeMicroLessons = (language: LanguageCode, level: LevelId, lessonId: string, title: string, type: LessonType): MicroLesson[] => {
  const special = specialPronunciationGroups(language, title);
  const count = type === "checkpoint" ? 1 : type === "review" ? 3 : type === "pronunciation" ? 4 : 3;
  const groups = special ?? Array.from({ length: count }, (_, index) => ({ title: type === "checkpoint" ? "Checkpoint Test" : type === "review" ? ["Recall", "Mixed Practice", "Challenge"][index] : [`${title}: Recognize`, `${title}: Guided Practice`, `${title}: Use It`, `${title}: Review Sounds`][index], seeds: [] as PronSeed[] }));
  return groups.map((group, index) => {
    const id = `${lessonId}-m${index + 1}`;
    let items: ContentItem[];
    if (language === "ja" && title === "What is Hiragana?") items = [];
    else if (group.seeds.length) items = group.seeds.map((seed, itemIndex) => makePronunciationItem(seed, `${id}-p${itemIndex + 1}`, language, level));
    else if (type === "grammar") {
      const vocab = makeVocabularyItems(language, title, id);
      const grammar: GrammarPoint = { kind: "grammar", id: `${id}-g1`, title, pattern: title, explanation: `Use the ${title} pattern in a short, clear beginner sentence.`, examples: [{ text: vocab[0].exampleSentence, translation: vocab[0].sentenceTranslation }] };
      items = [grammar, ...vocab.slice(0, 3)];
    } else if (type === "dialogue") {
      const vocab = makeVocabularyItems(language, title, id);
      const lines: DialogueLine[] = vocab.slice(0, 2).map((item, lineIndex) => ({ kind: "dialogue", id: `${id}-d${lineIndex + 1}`, speaker: lineIndex ? "Nova" : "You", text: item.exampleSentence, speechText: item.exampleSpeechText ?? item.exampleSentence, translation: item.sentenceTranslation, translations: item.exampleTranslations, audioPlaceholder: item.word }));
      items = [...lines, ...vocab.slice(0, 2)];
    } else items = makeVocabularyItems(language, title, id);
    const exercises = language === "ja" && title === "What is Hiragana?" ? [] : makeExercises(items, language, level, id); const ambiguityItems = items.filter((item): item is VocabularyItem => item.kind === "vocabulary" && item.id.includes("-amb"));
    ambiguityItems.forEach((item, ambiguityIndex) => { const meanings = item.meanings!; exercises[3 + ambiguityIndex] = { id: `${id}-ambiguity-${ambiguityIndex + 1}`, type: language === "ja" ? "type_meaning" : "translation", level, question: `What does ${item.displayText ?? item.word} mean?`, questionTranslations: { vi: `${item.displayText ?? item.word} nghĩa là gì?`, ja: `${item.displayText ?? item.word}の意味は何ですか？`, es: `¿Qué significa ${item.displayText ?? item.word}?` }, correctAnswer: meanings.en![0], acceptedAnswers: meanings, meanings, explanation: `${item.displayText ?? item.word} means ${meanings.en![0]}.`, explanationTranslations: { vi: `${item.displayText ?? item.word} có nghĩa là ${meanings.vi![0]}.`, ja: `${item.displayText ?? item.word}は${meanings.ja![0]}という意味です。`, es: `${item.displayText ?? item.word} significa ${meanings.es![0]}.` }, hint: `Use the kanji context and reading ${item.reading}.`, hintTranslations: { vi: `Hãy dựa vào chữ kanji và cách đọc ${item.reading}.`, ja: `漢字と読み方${item.reading}を確認しましょう。`, es: `Usa el kanji y la lectura ${item.reading}.` }, targetLanguage: language, nativeTranslation: meanings.en![0], difficulty: "easy", relatedIds: [item.id], nativeLanguageMode: true, trackType: language === "ja" ? "exam" : "general", examTrack: language === "ja" ? "JLPT" : undefined, examLevel: examLevelFor(language, level), skill: "vocabulary", reviewedStatus: "reviewed" }; });
    const vocabularyMatch = makeVocabularyMatchExercise(ambiguityItems, language, level, id);
    if (vocabularyMatch) exercises.push(vocabularyMatch);
    const titleTranslations = translatedLabel(group.title); const lessonTitleTranslations = translatedLabel(title);
    const isHiraganaIntro = language === "ja" && title === "What is Hiragana?";
    return { id, lessonId, title: group.title, titleTranslations, objective: isHiraganaIntro ? "Understand what Hiragana is before practicing kana." : `Complete a small step in ${title}.`, objectiveTranslations: isHiraganaIntro ? { en: "Understand what Hiragana is before practicing kana.", vi: "Hiểu Hiragana là gì trước khi luyện từng chữ Kana.", ja: "かなを練習する前に、ひらがなとは何かを理解しましょう。", es: "Comprende qué es Hiragana antes de practicar kana." } : { en: `Complete a small step in ${title}.`, vi: `Hoàn thành một bước nhỏ trong bài “${lessonTitleTranslations.vi}”.`, ja: `${title}の小さなステップを完了しましょう。`, es: `Completa un pequeño paso de ${title}.` }, explanation: isHiraganaIntro ? "Hiragana is a Japanese phonetic script. Each character represents a sound rather than a meaning by itself. The next lesson teaches あ, い, う, え, and お." : group.seeds.length ? `Focus on the sound, example word, and recognition of ${group.title}.` : `Learn this part through recognition, guided practice, and recall.`, explanationTranslations: isHiraganaIntro ? { en: "Hiragana is a Japanese phonetic script. Each character represents a sound rather than a meaning by itself. The next lesson teaches あ, い, う, え, and お.", vi: "Hiragana là hệ chữ biểu âm của tiếng Nhật. Mỗi chữ biểu thị một âm và tự nó không mang nghĩa. Bài tiếp theo sẽ dạy あ, い, う, え và お.", ja: "ひらがなは日本語の表音文字です。一文字ずつ音を表し、文字だけでは意味を持ちません。次のレッスンでは、あ・い・う・え・おを学びます。", es: "Hiragana es una escritura fonética japonesa. Cada carácter representa un sonido, no un significado por sí solo. La siguiente lección enseña あ, い, う, え y お." } : { en: group.seeds.length ? `Focus on the sound, example word, and recognition of ${group.title}.` : `Learn this part through recognition, guided practice, and recall.`, vi: group.seeds.length ? `Tập trung vào âm, từ ví dụ và cách nhận biết ${titleTranslations.vi}.` : "Học phần này qua nhận biết, luyện tập có hướng dẫn và ghi nhớ.", ja: group.seeds.length ? `${group.title}の音、例の単語、見分け方に集中しましょう。` : "認識、ガイド練習、復習で学びましょう。", es: group.seeds.length ? `Concéntrate en el sonido, la palabra de ejemplo y el reconocimiento de ${group.title}.` : "Aprende mediante reconocimiento, práctica guiada y recuerdo." }, contentItems: items, exercises, xpReward: 8 + Math.min(index, 3), order: index + 1, estimatedMinutes: 3 + Math.min(index, 2), unlockStatus: index === 0 ? "available" : "locked" };
  });
};

const quizFromExercise = (exercise: Exercise): QuizQuestion => ({ id: exercise.id, prompt: exercise.question, options: exercise.options ?? exercise.pairs?.map((pair) => pair.right) ?? [String(exercise.correctAnswer)], correctAnswer: Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer.join(" | ") : exercise.correctAnswer, explanation: exercise.explanation, wrongAnswerExplanation: exercise.hint ?? exercise.explanation });

const levelMeta: Record<LevelId, { title: string; description: string; cefr: string; jlpt?: string }> = {
  A0: { title: "Absolute Beginner", description: "Writing system, sounds, recognition, and first survival words.", cefr: "Pre-A1", jlpt: "Kana Starter" },
  A1_1: { title: "First Communication", description: "Early greetings, introductions, questions, and survival language.", cefr: "CEFR A1 Early", jlpt: "JLPT N5 Early" },
  A1_2: { title: "Everyday Basics", description: "People, everyday objects, food, and simple patterns.", cefr: "CEFR A1", jlpt: "JLPT N5" },
  A2_1: { title: "Daily Life", description: "Routine, time, places, directions, and movement.", cefr: "CEFR A2 Early", jlpt: "JLPT N4 Early" },
  A2_2: { title: "Real-life Communication", description: "Shopping, requests, past events, and future plans.", cefr: "CEFR A2", jlpt: "JLPT N4" },
  B1_1: { title: "Independent Communication", description: "Longer sentences, opinions, experiences, and style control.", cefr: "CEFR B1 Early", jlpt: "JLPT N3 Early" },
  B1_2: { title: "Connected Communication", description: "Short reading, reason-giving, and conversation repair.", cefr: "CEFR B1", jlpt: "JLPT N3" },
  B2: { title: "Advanced Communication", description: "Nuance, longer reading, academic, and workplace communication.", cefr: "CEFR B2", jlpt: "JLPT N2" }
};

const examTracksFor = (language: LanguageCode): ExamTrackOption[] => {
  const raw = (examTracksConfig as Record<string, Array<Record<string, unknown>>>)[language] ?? [];
  return raw
    .filter((track) => track.enabled !== false)
    .slice()
    .sort((a, b) => Number(a.displayOrder ?? 0) - Number(b.displayOrder ?? 0))
    .slice(0, 3)
    .map((track) => {
      const examCode = String(track.examCode ?? track.examTrack ?? track.id ?? "");
      const titleRaw = track.title;
      const descRaw = track.shortDescription ?? track.description;
      const title =
        typeof titleRaw === "string"
          ? titleRaw
          : (titleRaw as Record<string, string> | undefined)?.en ?? examCode;
      const description =
        typeof descRaw === "string"
          ? descRaw
          : (descRaw as Record<string, string> | undefined)?.en ?? title;
      return {
        id: String(track.id ?? examCode),
        language: String(track.learningLanguage ?? track.language ?? language),
        learningLanguage: String(track.learningLanguage ?? track.language ?? language),
        examCode,
        title,
        description,
        titleByNative: typeof titleRaw === "object" ? (titleRaw as Record<string, string>) : undefined,
        shortDescriptionByNative:
          typeof descRaw === "object" ? (descRaw as Record<string, string>) : undefined,
        iconKey: track.iconKey as string | undefined,
        displayOrder: track.displayOrder as number | undefined,
        enabled: (track.enabled as boolean | undefined) ?? true,
        trackType: (track.trackType as ExamTrackOption["trackType"]) ?? "exam",
        examTrack: examCode as ExamTrackOption["examTrack"],
        examLevel: track.examLevel as ExamTrackOption["examLevel"],
        levelId: track.levelId as ExamTrackOption["levelId"],
        comingSoon: (track.comingSoon as boolean | undefined) ?? false,
      } satisfies ExamTrackOption;
    });
};

const makeCourse = (language: LanguageCode): Course => {
  let lessonOrder = 0;
  const units = blueprints[language].map((blueprint, unitIndex): Unit => {
    const unitId = `${language}-${blueprint.levelId.toLowerCase()}-u${unitIndex + 1}`;
    const lessons = blueprint.lessons.map((blueprintLesson, localIndex): Lesson => {
      const order = ++lessonOrder;
      const type = blueprintLesson.type ?? "vocabulary";
      const skill = skillForLesson(blueprintLesson.title, type, blueprintLesson.skill ?? blueprint.skill);
      const examLevel = examLevelFor(language, blueprint.levelId);
      const id = `${unitId}-l${localIndex + 1}`;
      const microLessons = makeMicroLessons(language, blueprint.levelId, id, blueprintLesson.title, type);
      const content = microLessons.flatMap((micro) => micro.contentItems);
      const vocabulary = content.filter((item): item is VocabularyItem => item.kind === "vocabulary");
      const pronunciationItems = content.filter((item): item is PronunciationItem => item.kind === "pronunciation");
      const grammarPoints = content.filter((item): item is GrammarPoint => item.kind === "grammar");
      const dialogue = content.filter((item): item is DialogueLine => item.kind === "dialogue");
      const exercises = microLessons.flatMap((micro) => micro.exercises);
      const examples = content.slice(0, 4).map((item) => ({ text: contentSentence(item), translation: contentTranslation(item) }));
      const xpReward = microLessons.reduce((sum, micro) => sum + micro.xpReward, 0) + 15;
      const broadLevel = blueprint.levelId === "A0" || blueprint.levelId.startsWith("A1") ? "Beginner" : blueprint.levelId.startsWith("A2") ? "Elementary" : blueprint.levelId.startsWith("B1") ? "Intermediate" : "Upper Intermediate";
      return { id, language, levelId: blueprint.levelId, unitId, type, title: blueprintLesson.title, titleTranslations: translatedLabel(blueprintLesson.title), objective: blueprint.goal, objectiveTranslations: translatedGoal(blueprint.goal), canDo: `I can complete a beginner task about ${blueprintLesson.title}.`, canDoTranslations: { en: `I can complete a beginner task about ${blueprintLesson.title}.`, vi: `Tôi có thể hoàn thành một nhiệm vụ cơ bản về ${translatedLabel(blueprintLesson.title).vi}.`, ja: `${blueprintLesson.title}についての初級タスクができます。`, es: `Puedo completar una tarea inicial sobre ${blueprintLesson.title}.` }, description: `${blueprintLesson.title} is divided into short micro-lessons so each new signal stays manageable.`, descriptionTranslations: { en: `${blueprintLesson.title} is divided into short micro-lessons so each new signal stays manageable.`, vi: `Bài ${translatedLabel(blueprintLesson.title).vi} được chia thành các bài học nhỏ để bạn dễ ghi nhớ từng nội dung.`, ja: `${blueprintLesson.title}は覚えやすい短いマイクロレッスンに分かれています。`, es: `${blueprintLesson.title} se divide en microlecciones breves para facilitar el aprendizaje.` }, microLessons, pronunciationItems: pronunciationItems.length ? pronunciationItems : undefined, vocabulary, grammarPoints: grammarPoints.length ? grammarPoints : undefined, dialogue: dialogue.length ? dialogue : undefined, examples, exercises: exercises.map((exercise) => ({ ...exercise, trackType: language === "ja" ? "exam" as const : "general" as const, examTrack: language === "ja" ? "JLPT" as const : undefined, examLevel, skill, reviewedStatus: blueprint.reviewedStatus ?? "reviewed" as const })), xpReward, order, unlockRule: unitIndex === 0 && order === 1 ? "Unlocked by default" : "Complete the previous lesson", requiredHearts: 1, durationMinutes: microLessons.reduce((sum, micro) => sum + micro.estimatedMinutes, 0), level: broadLevel, subtitle: blueprint.goal, explanation: microLessons[0].explanation, quiz: exercises.slice(0, 5).map(quizFromExercise), trackType: language === "ja" ? "exam" : "general", examTrack: language === "ja" ? "JLPT" : undefined, examLevel, skill, reviewedStatus: blueprint.reviewedStatus ?? "reviewed" };
    });
    const examLevel = examLevelFor(language, blueprint.levelId);
    return { id: unitId, language, levelId: blueprint.levelId, title: blueprint.title, communicationGoal: blueprint.goal, description: `A focused ${getLevelDisplayName(blueprint.levelId, language)} unit: ${blueprint.goal}`, estimatedMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0), order: unitIndex + 1, lessons, trackType: language === "ja" ? "exam" : "general", examTrack: language === "ja" ? "JLPT" : undefined, examLevel, skill: blueprint.skill ?? "general", reviewedStatus: blueprint.reviewedStatus ?? "reviewed" };
  });
  const levels: CourseLevel[] = levelOrder.map((levelId) => {
    const levelUnits = units.filter((unit) => unit.levelId === levelId);
    const examLevel = examLevelFor(language, levelId);
    const comingSoon = language === "ja" && levelUnits.length === 0;
    return { id: levelId, title: language === "ja" ? getLevelDisplayName(levelId, language) : levelMeta[levelId].title, description: comingSoon ? "Coming soon after the JLPT N5 sample track is stable." : levelMeta[levelId].description, cefr: language === "ja" ? undefined : levelMeta[levelId].cefr, jlpt: language === "ja" ? levelMeta[levelId].jlpt : undefined, units: levelUnits, trackType: language === "ja" ? "exam" as const : "general" as const, examTrack: language === "ja" ? "JLPT" as const : undefined, examLevel, reviewedStatus: comingSoon ? "draft" as const : "reviewed" as const, comingSoon, comingSoonLabel: comingSoon ? "Coming soon" : undefined };
  });
  const meta = languages.find((item) => item.code === language)!;
  const course: Course = { id: `${language}-complete-course`, language, title: `${meta.name} Complete Path`, description: meta.description, nativeLanguageSupport: ["en", "vi", "ja", "es"], mapping: language === "ja" ? "Kana Starter to JLPT N5, with JLPT N4-N1 roadmap" : "CEFR-inspired A0 to B2", levels, units, placementTest: [], examTracks: examTracksFor(language) };
  course.placementTest = makePlacementTest(course);
  return course;
};

const placementCounts: Partial<Record<LevelId, number>> = { A0: 3, A1_1: 3, A1_2: 3, A2_1: 3, A2_2: 3 };
function makePlacementTest(course: Course): PlacementQuestion[] {
  return course.levels.filter((level) => level.units.length && placementCounts[level.id]).flatMap((level) => {
    const pool = level.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
    if (!pool.length) return [];
    return Array.from({ length: placementCounts[level.id] ?? 0 }, (_, index) => ({ ...pool[index % pool.length], id: `${course.language}-placement-${level.id}-${index + 1}`, placementScore: 1 }));
  }).slice(0, 15);
}

/** Legacy blueprint-generated courses (kept for ID fallback / placement depth). */
const legacyCourses: Course[] = (["en", "ja"] as LanguageCode[]).map(makeCourse);
const legacyLessons: Lesson[] = legacyCourses.flatMap((course) =>
  course.units.flatMap((unit) => unit.lessons),
);

/**
 * Shared source of truth: shared/generated/*.json via curriculumJson.ts.
 * Legacy blueprint lessons remain as lookup fallback so old IDs still resolve.
 */
export const courses: Course[] =
  curriculumCourses.length > 0 ? curriculumCourses : legacyCourses;
export const lessons: Lesson[] = (() => {
  const byId = new Map<string, Lesson>();
  for (const lesson of curriculumLessons) byId.set(lesson.id, lesson);
  for (const lesson of legacyLessons) {
    if (!byId.has(lesson.id)) byId.set(lesson.id, lesson);
  }
  return [...byId.values()];
})();
export const microLessons: MicroLesson[] = lessons.flatMap((lesson) => lesson.microLessons);
export const getCourseByLanguage = (language: string) =>
  courses.find((course) => course.language === language) ??
  legacyCourses.find((course) => course.language === language);
export const getLessonsByLanguage = (language: string) =>
  getCourseByLanguage(language)?.units.flatMap((unit) => unit.lessons) ?? [];
export const getLessonById = (lessonId: string) =>
  getCurriculumLessonById(lessonId) ??
  lessons.find((lesson) => lesson.id === lessonId) ??
  legacyLessons.find((lesson) => lesson.id === lessonId);
export const getPlacementByLanguage = (language: string) => {
  const fromCurriculum = getCourseByLanguage(language)?.placementTest ?? [];
  if (fromCurriculum.length > 0) return fromCurriculum;
  return legacyCourses.find((course) => course.language === language)?.placementTest ?? [];
};
export const isLanguageCode = (value: string): value is LanguageCode =>
  allLearningLanguages.some((language) => language.code === value) ||
  languages.some((language) => language.code === value);

export {
  curriculumCatalog,
  flatCourses,
  flatLessons,
  getFlatCoursesByNiche,
} from "./curriculumJson.js";

export const makePracticeSet = (language: LanguageCode, completedLessonIds?: string[]): PracticeSet => {
  const languageLessons = getLessonsByLanguage(language);
  const available = completedLessonIds?.length ? languageLessons.filter((lesson) => completedLessonIds.includes(lesson.id)) : languageLessons.filter((lesson) => lesson.levelId === "A0").slice(0, 1);
  const exercises = available.flatMap((lesson) => lesson.exercises).slice(0, 10);
  return { language, title: language === "ja" ? "Japanese JLPT practice set" : `${languages.find((item) => item.code === language)?.name} review quest`, exercises, questions: exercises.map(quizFromExercise), potentialXp: 15, dataVersion: "exam-track-v1" };
};

export const getReviewCatalog = (language: LanguageCode) => getLessonsByLanguage(language).flatMap((lesson) => lesson.microLessons.flatMap((micro) => micro.contentItems.map((item) => ({ id: item.id, itemType: item.kind === "dialogue" ? "sentence" as const : item.kind, label: contentLabel(item), meaning: contentMeaning(item), meaningTranslations: item.kind === "vocabulary" || item.kind === "pronunciation" ? contentMeanings(item) : undefined, speechText: item.kind === "vocabulary" ? item.speechText ?? item.reading ?? item.kana ?? item.word : item.kind === "pronunciation" ? item.speechText ?? item.reading ?? item.kana ?? item.symbol : item.kind === "dialogue" ? item.speechText ?? item.text : item.kind === "grammar" ? item.pattern : undefined, lessonId: lesson.id, microLessonId: micro.id }))));






