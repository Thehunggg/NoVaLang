/**
 * JapanesePronunciationProfile — token-based learner-facing romanization.
 *
 * Source of truth for the rule this implements:
 * rules/languages/ja/README.md (canonical detailed Japanese source)
 *
 * Architecture (revision 2 — replaces the character-level lexical-exception
 * approach after Project Owner rejection on 2026-07-16):
 *
 * A default-particle-transformation-plus-growing-exception-list is not a
 * reliable general architecture: kana text has no orthographic word
 * boundaries, so any purely character-adjacent heuristic can always be
 * defeated by a new sentence the exception list has not seen yet (proven
 * repeatedly in this project's own history: はな, はこ, はい, はっきり,
 * はじまる, はん, はやく, よこはま all had to be discovered and patched one
 * at a time from real data).
 *
 * This revision instead uses a real Japanese morphological analyzer
 * (`kuromoji`, IPADIC dictionary — pure JS, no native bindings) to tokenize
 * the ORIGINAL kanji+kana surface text and read each token's genuine
 * part-of-speech tag. は/へ/を are romanized as the particle form (wa/e/o)
 * only when the tokenizer itself tags that exact token as 助詞 (a particle)
 * — never by character-adjacency guessing. This generalizes to lessons this
 * module has never seen, because the disambiguation signal comes from a
 * real grammatical analysis of each new sentence, not from a lookup table
 * that must be manually extended per collision.
 *
 * Tokenizing the KANJI surface text (not the pre-extracted kana `reading`)
 * matters: kanji gives the analyzer far more disambiguating signal (e.g.
 * "お名前" tokenizes correctly as prefix+noun; the all-kana "おなまえ" does
 * not, because kana-only input is inherently more ambiguous to any
 * tokenizer, human or machine).
 *
 * A small, explicit whole-word pronunciation override table remains for
 * cases no tokenizer/POS analysis can resolve, because they are genuine
 * historical/irregular pronunciations rather than a segmentation ambiguity
 * (こんにちは/こんばんは are still pronounced "wa" even though they
 * etymologically contain the topic particle は). This table is checked by
 * exact whole-token surface form, so it can never partially match inside a
 * longer word or misfire on unrelated text — it is fundamentally different
 * from the rejected per-character lexical-exception list.
 */

import kuromoji from 'kuromoji';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// ---------------------------------------------------------------------------
// Mora tables — Modified Hepburn, per-mora romanization of a single token's
// own kana reading. Reused across every token; long-vowel merging below is
// applied only within one token's mora sequence, never across token
// boundaries (kuromoji tokens ARE the word boundaries this project lacked
// before).
// ---------------------------------------------------------------------------

const HIRAGANA_MORA = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', ゐ: 'i', ゑ: 'e', を: 'wo', ん: 'n',
};

const YOUON = {
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  ぢゃ: 'ja', ぢゅ: 'ju', ぢょ: 'jo',
  にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
};

const KATAKANA_TO_HIRAGANA_OFFSET = 0x30a1 - 0x3041; // 'ァ' - 'ぁ'
function katakanaToHiragana(char) {
  const code = char.codePointAt(0);
  if (code >= 0x30a1 && code <= 0x30f6) {
    return String.fromCodePoint(code - KATAKANA_TO_HIRAGANA_OFFSET);
  }
  return char;
}
function katakanaStringToHiragana(text) {
  return Array.from(text).map(katakanaToHiragana).join('');
}

function isKanaChar(char) {
  const code = char.codePointAt(0);
  return (code >= 0x3041 && code <= 0x3096) || (code >= 0x30a1 && code <= 0x30ff);
}

const SMALL_TSU = 'っ';
const LONG_VOWEL_MARK = 'ー';
const PLAIN_VOWELS = new Set(['あ', 'い', 'う', 'え', 'お']);
const Y_SOUNDS = new Set(['や', 'ゆ', 'よ']);
const MACRON = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };
const VOWEL_FOR_ENDING = { a: 'a', i: 'i', u: 'u', e: 'e', o: 'o' };

function lastRomajiVowel(romaji) {
  const last = romaji[romaji.length - 1];
  return VOWEL_FOR_ENDING[last] ?? null;
}

/**
 * Long-vowel merge policy (Modified Hepburn, evidence-anchored against this
 * project's own already-approved hand-authored data):
 *   - Explicit chōonpu (ー): always merges into a macron (unambiguous).
 *   - お-row ending + う OR + お: merges into a macron (standard long-o
 *     rule; matches the approved Golden Lesson value "ohayō gozaimasu"
 *     from お+は+よ+う, and real curriculum words that need お+お merging,
 *     e.g. 大阪 -> "Ōsaka", 遠い -> "tōi").
 *   - う-row ending + う, あ-row ending + あ, え-row ending + え: merge
 *     (standard rule for genuine doubled vowels).
 *   - え-row ending + い: does NOT merge — stays literal "ei". This matches
 *     the approved hand-authored kana-chart value "sensei" for せんせい
 *     (せ=se + ん=n + せ=se + い=i), never "sensē". This is the well-known
 *     real-world Hepburn convention: -ei endings from historical /e/+/i/
 *     sequences are conventionally kept as "ei" in common nouns/adjectives,
 *     unlike the -ou -> ō merger.
 *   - い-row ending + い: does NOT merge — stays literal "ii" (matches
 *     common convention, e.g. おにいさん -> "oniisan", not "onīsan").
 * Only applied within a single token's own mora sequence (see
 * tokenReadingToRomaji below) — never across token boundaries.
 */
const VOWEL_MERGE_TRIGGERS = {
  o: new Set(['う', 'お']),
  u: new Set(['う']),
  a: new Set(['あ']),
  e: new Set(['え']),
};
function mergeVowelIfNeeded(romajiParts, currentChar) {
  const prevVowel = lastRomajiVowel(romajiParts[romajiParts.length - 1] ?? '');
  if (!prevVowel) return false;
  if (VOWEL_MERGE_TRIGGERS[prevVowel]?.has(currentChar)) {
    const prev = romajiParts[romajiParts.length - 1];
    romajiParts[romajiParts.length - 1] = prev.slice(0, -1) + MACRON[prevVowel];
    return true;
  }
  return false;
}

/**
 * Converts ONE token's own hiragana reading (already katakana-normalized)
 * into Modified Hepburn romaji: dakuten/handakuten table lookup, youon
 * digraphs, small-tsu (sokuon) gemination, the explicit chōonpu mark, safe
 * intra-token long-vowel merging (see mergeVowelIfNeeded), and the
 * syllabic-ん apostrophe rule (ん directly followed by a vowel or
 * や/ゆ/よ within the same token gets an apostrophe, so 田中 style names
 * and words like 順位 are never misread against a な/に/ぬ/ね/の or
 * にゃ/にゅ/にょ mora).
 *
 * This function does not know about grammatical particles — particle
 * romanization (は->wa, へ->e, を->o) is decided one level up, per-token,
 * using the token's real part-of-speech tag (see tokenToRomaji).
 */
function tokenReadingToRomaji(hiraganaReading, originalSurface) {
  const chars = Array.from(hiraganaReading);
  const romajiParts = [];
  let i = 0;
  while (i < chars.length) {
    const char = chars[i];
    const next = chars[i + 1];

    if (char === SMALL_TSU) {
      const followingKey = next && chars[i + 2] && YOUON[next + chars[i + 2]]
        ? YOUON[next + chars[i + 2]]
        : next
          ? HIRAGANA_MORA[next]
          : null;
      if (followingKey && /^[bcdfghjklmnpqrstvwyz]/.test(followingKey)) {
        romajiParts.push(followingKey[0]);
        i += 1;
        continue;
      }
      i += 1;
      continue;
    }

    if (next && YOUON[char + next]) {
      romajiParts.push(YOUON[char + next]);
      i += 2;
      continue;
    }

    if (char === LONG_VOWEL_MARK) {
      const prevVowel = lastRomajiVowel(romajiParts[romajiParts.length - 1] ?? '');
      if (prevVowel) {
        const prev = romajiParts[romajiParts.length - 1];
        romajiParts[romajiParts.length - 1] = prev.slice(0, -1) + MACRON[prevVowel];
      }
      i += 1;
      continue;
    }

    if (char === 'ん') {
      const nextIsVowelOrY = next && (PLAIN_VOWELS.has(next) || Y_SOUNDS.has(next));
      romajiParts.push(nextIsVowelOrY ? "n'" : 'n');
      i += 1;
      continue;
    }

    if (PLAIN_VOWELS.has(char) && mergeVowelIfNeeded(romajiParts, char)) {
      i += 1;
      continue;
    }

    const mora = HIRAGANA_MORA[char];
    if (mora === undefined) {
      if (isKanaChar(char)) {
        throw new Error(
          `japanese-pronunciation: no romanization mapping for character "${char}" ` +
            `(U+${char.codePointAt(0).toString(16).toUpperCase()}) in token "${originalSurface}"`,
        );
      }
      romajiParts.push(char);
      i += 1;
      continue;
    }
    romajiParts.push(mora);
    i += 1;
  }
  return romajiParts.join('');
}

// ---------------------------------------------------------------------------
// Contextual reading overrides — real Japanese euphonic-assimilation
// alternations, where a token's dictionary citation reading differs from
// its actual pronunciation depending on the token immediately following
// it. This is phonology, not tokenizer error: kuromoji correctly tokenizes
// 何 as one word with dictionary reading なに; the なに->なん shift before
// a copula is a genuine spoken-language rule (何ですか is "nan desu ka" in
// standard speech, matching the Project-Owner-approved example). Each rule
// is keyed by the token's own basic_form and the set of following tokens'
// basic_form that trigger the alternation — deliberately narrow and
// evidence-anchored, not a general "guess the reading" mechanism.
// ---------------------------------------------------------------------------
const CONTEXTUAL_READING_OVERRIDES = [
  { basicForm: '何', beforeBasicForms: new Set(['です', 'だ', 'でした', 'でしょう']), reading: 'なん' },
];

function contextualReadingOverride(token, nextToken) {
  const rule = CONTEXTUAL_READING_OVERRIDES.find((r) => r.basicForm === token.basic_form);
  if (!rule) return null;
  if (!nextToken || !rule.beforeBasicForms.has(nextToken.basic_form)) return null;
  return rule.reading;
}

// ---------------------------------------------------------------------------
// Known-reading normalization — 日本 has two valid dictionary readings
// (にほん, the common everyday reading, and にっぽん, a more formal/
// ceremonial reading used for e.g. the country's official name or sports
// contexts). IPADIC's statistical model picks between them per compound and
// is inconsistent for this beginner daily-life content (correctly picks
// にほん for 日本語 "nihongo", but にっぽん for standalone 日本 and for the
// compound 日本人). This content's register is consistently the everyday
// "nihon" reading, confirmed by the already-correct にほんご case, so any
// token reading beginning with ニッポン is normalized to ニホン. This is a
// content-register decision (see Section K of the governance report) — a
// future lesson that specifically needs the formal にっぽん reading (e.g.
// quoting the country's formal name) would need an explicit content
// override, not a change to this default.
// ---------------------------------------------------------------------------
function normalizeKnownReadingAmbiguity(katakanaReading) {
  if (katakanaReading && katakanaReading.startsWith('ニッポン')) {
    return 'ニホン' + katakanaReading.slice('ニッポン'.length);
  }
  return katakanaReading;
}

// ---------------------------------------------------------------------------
// Whole-word pronunciation overrides — NOT a particle-collision patch list.
// Each entry is a genuine historical/irregular pronunciation that no
// tokenizer POS tag can resolve, matched only against a token's EXACT full
// surface form (so it can never partially match inside unrelated text).
// Values are the already project-owner-approved hand-authored romanization
// (ja-unit1-lesson1.mjs Golden Lesson vocabulary).
// ---------------------------------------------------------------------------
const WHOLE_WORD_PRONUNCIATION_OVERRIDES = new Map([
  ['こんにちは', 'konnichiwa'],
  ['こんばんは', 'konbanwa'],
  // IPADIC treats this lexicalized conjunction as one token, so its final
  // historical topic particle cannot be recovered from a separate POS tag.
  ['実は', 'jitsu wa'],
]);

// Exact lexical overrides approved by the Project Owner. These are used only
// when kuromoji/IPADIC cannot provide a trustworthy reading for the complete
// token. They must never partially match a longer token.
const EXACT_LEXICAL_ROMANIZATION_OVERRIDES = new Map([
  [
    'スマホ',
    {
      reading: 'すまほ',
      romanization: 'sumaho',
      scope: 'EXACT_JAPANESE_LEXICAL_TOKEN',
      evidenceType: 'PROJECT_OWNER_DECISION',
      status: 'APPROVED_LEXICAL_OVERRIDE',
    },
  ],
]);

// ---------------------------------------------------------------------------
// Punctuation/symbol handling — 記号-tagged tokens. Known punctuation maps
// to its conventional romanized form; anything else passes through
// literally (structural characters like "+", "／", "→", "〜" used in
// template/grammar-pattern strings must not crash generation).
// ---------------------------------------------------------------------------
const SYMBOL_MAP = {
  '。': '.', '、': ',', '？': '?', '！': '!',
  '「': '"', '」': '"', '・': '-',
};

/**
 * Romanizes one kuromoji token, applying (in order): whole-word irregular
 * pronunciation override, grammatical-particle exception (は/へ/を, only
 * when this exact token is tagged 助詞 by the analyzer), contextual reading
 * override (euphonic alternation depending on the next token), standard
 * per-mora conversion, then proper-noun capitalization.
 *
 * @param {object} token
 * @param {object|undefined} nextToken
 */
function tokenToRomaji(token, nextToken) {
  if (WHOLE_WORD_PRONUNCIATION_OVERRIDES.has(token.surface_form)) {
    return WHOLE_WORD_PRONUNCIATION_OVERRIDES.get(token.surface_form);
  }
  if (EXACT_LEXICAL_ROMANIZATION_OVERRIDES.has(token.surface_form)) {
    return EXACT_LEXICAL_ROMANIZATION_OVERRIDES.get(
      token.surface_form,
    ).romanization;
  }
  if (token.pos === '記号') {
    return SYMBOL_MAP[token.surface_form] ?? token.surface_form;
  }
  if (
    token.pos === '助詞' &&
    (token.surface_form === 'は' || token.surface_form === 'へ' || token.surface_form === 'を')
  ) {
    return { は: 'wa', へ: 'e', を: 'o' }[token.surface_form];
  }
  if (token.reading === '*' || !token.reading) {
    throw new Error(
      `japanese-pronunciation: kuromoji could not analyze token "${token.surface_form}" ` +
        `(pos=${token.pos}) — refusing to guess. Add an explicit content override or a ` +
        'whole-word pronunciation override if this is a genuine irregular case.',
    );
  }
  const overrideReading = contextualReadingOverride(token, nextToken);
  const normalizedKatakana = normalizeKnownReadingAmbiguity(token.reading);
  const hiraganaReading = overrideReading ?? katakanaStringToHiragana(normalizedKatakana);
  let romaji = tokenReadingToRomaji(hiraganaReading, token.surface_form);
  if (token.pos_detail_1 === '固有名詞') {
    romaji = romaji.charAt(0).toUpperCase() + romaji.slice(1);
  }
  return romaji;
}

/**
 * Word/particle spacing policy — decides whether a token glues to the
 * previous one (no space) or starts a new space-separated word, based on
 * its part-of-speech tag. Verified against the Project-Owner-approved
 * examples:
 *   町(machi) へ(e, 助詞/格助詞: own space) ようこそ(yōkoso)
 *     -> "machi e yōkoso"
 *   今(ima) は(wa, 助詞/係助詞: own space) 東京(Tōkyō, proper noun)
 *     に(ni, 助詞/格助詞: own space) 住ん(sun)+で(接続助詞て/で: glues)
 *     "sunde" い(非自立 auxiliary verb: own space) +ます(助動詞, not
 *     です: glues) -> "ima wa Tōkyō ni sunde imasu"
 *   これ(kore) は(wa: own space) 何(nan) です(copula, own space even
 *     though tagged 助動詞) か(ka, own space, sentence-final particle)
 *     -> "kore wa nan desu ka"
 * and against real curriculum sentences found during validation:
 *   何(nan)+時(ji, 名詞/接尾: glues) -> "nanji"; 五(go)+百(hyaku, both
 *     名詞/数: glue to each other)+円(en, 接尾: glues) -> "gohyakuen";
 *   難しいです+が(but, 助詞/接続助詞 but NOT て/で: own space, not glued)
 *     -> "muzukashii desu ga" (not the wrongly-glued "desuga").
 *
 * Rules:
 *   - 助動詞 (auxiliary verb suffix: ます/た/ない/たい/よう/れる...) glues
 *     to the previous token, EXCEPT です/でした/でしょう (the copula "to
 *     be" functions as its own word, not a verb-inflection suffix).
 *   - 助詞/接続助詞 glues to the previous token ONLY for surface forms て
 *     and で (the true te-form conjunctive particles, forming the
 *     standard te-form spelling "yonde"/"tabete"). Other 接続助詞
 *     (が/けど/し/ので/のに used as clause connectives, and
 *     ながら/たら/ば, which have no confirmed example in this content
 *     yet) default to their own space rather than guessing they behave
 *     like て/で.
 *   - 名詞/接尾 (suffix noun: time/counter units like 時/枚/円, and name
 *     honorifics like さん) glues to the previous token.
 *   - Consecutive 名詞/数 (number) tokens glue to each other, so a
 *     multi-digit spoken number romanizes as one word (五+百 -> "gohyaku").
 *   - 記号 (punctuation/symbols) glues to the previous token.
 *   - 接頭詞 (prefix: お/ご honorific prefixes) has the FOLLOWING token
 *     glue to it, since a prefix binds forward to its noun (お名前 ->
 *     "onamae", one word, not "o namae").
 *   - Every other token (nouns, independent verbs/adjectives/adverbs,
 *     interjections, case/binding/adverbial/final particles, dependent
 *     auxiliary-use verbs like いる/ある/くる/おく/くださる after a
 *     te-form, and the copula です) starts a new space-separated word —
 *     this last group is deliberately NOT glued despite being
 *     grammatically "dependent" (非自立), because learner-facing
 *     romanization conventionally keeps the te-form + auxiliary
 *     construction as two words ("tabete imasu", "yonde kudasai").
 */
function isGlueBackward(token, previousToken, nextToken) {
  if (token.pos === '記号') return true;
  if (token.pos === '助動詞') {
    // Explanatory のだ/んだ after a noun is tokenized as な + ん by IPADIC.
    // The copular な starts the learner-facing word "nan" and therefore must
    // not glue backward to the preceding noun/adjective.
    if (
      token.surface_form === 'な' &&
      token.basic_form === 'だ' &&
      nextToken?.surface_form === 'ん' &&
      nextToken?.pos === '名詞' &&
      nextToken?.pos_detail_1 === '非自立'
    ) {
      return false;
    }
    // です/でした/でしょう (copula) and ござい.../ございました (polite
    // existential "gozaru", e.g. ありがとうございます -> "arigatō
    // gozaimasu") both function as their own word, not a bare
    // verb-inflection suffix like ます/た/ない alone.
    return !['です', 'でした', 'でしょう', 'ござる'].includes(token.basic_form);
  }
  if (
    token.surface_form === 'ん' &&
    token.pos === '名詞' &&
    token.pos_detail_1 === '非自立' &&
    previousToken?.surface_form === 'な' &&
    previousToken?.basic_form === 'だ'
  ) {
    return true;
  }
  if (token.pos === '助詞' && token.pos_detail_1 === '接続助詞') {
    return token.surface_form === 'て' || token.surface_form === 'で';
  }
  if (token.pos === '名詞' && token.pos_detail_1 === '接尾') return true;
  if (token.pos === '名詞' && token.pos_detail_1 === '数' && previousToken?.pos === '名詞' && previousToken?.pos_detail_1 === '数') {
    return true;
  }
  return false;
}

function isPersonNameSuffix(token, previousToken) {
  return (
    token.surface_form === 'さん' &&
    token.pos === '名詞' &&
    token.pos_detail_1 === '接尾' &&
    token.pos_detail_2 === '人名' &&
    previousToken?.pos === '名詞' &&
    previousToken?.pos_detail_1 === '固有名詞' &&
    previousToken?.pos_detail_2 === '人名'
  );
}

function mergeLongVowelAcrossGluedTokens(parts, romaji, token) {
  if (parts.length === 0 || !token.reading || token.reading === '*') {
    return romaji;
  }
  const firstReadingChar = katakanaStringToHiragana(token.reading)[0];
  const previous = parts[parts.length - 1];
  const previousVowel = lastRomajiVowel(previous);
  if (
    !previousVowel ||
    !VOWEL_MERGE_TRIGGERS[previousVowel]?.has(firstReadingChar)
  ) {
    return romaji;
  }
  const firstRomajiVowel = HIRAGANA_MORA[firstReadingChar];
  if (romaji[0] !== firstRomajiVowel) return romaji;
  parts[parts.length - 1] =
    previous.slice(0, -1) + MACRON[previousVowel];
  return romaji.slice(1);
}

/**
 * True if this token's own reading ends in an unresolved small tsu (っ) —
 * i.e. kuromoji split a verb's conjugation exactly at the gemination mark
 * (e.g. 伺って tokenized as 伺っ + て), so the doubled-consonant effect
 * that small tsu marks must carry over to the NEXT token's first sound
 * instead of being resolved within this token alone (どうがっ + て ->
 * "ukagatte", not the previously-broken "ukagate").
 */
function endsInUnresolvedSokuon(token) {
  if (!token.reading || token.reading === '*') return false;
  return katakanaStringToHiragana(token.reading).endsWith(SMALL_TSU);
}

function geminateFirstConsonant(romaji) {
  if (!romaji) return romaji;
  const firstChar = romaji[0];
  if (/[bcdfghjklmnpqrstvwyz]/i.test(firstChar)) {
    return firstChar + romaji;
  }
  return romaji;
}

async function tokenizeAndRomanize(surfaceText, tokenizer) {
  const tokens = tokenizer.tokenize(surfaceText);
  const parts = [];
  let suppressNextLeadingSpace = false;
  let pendingGemination = false;
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    let romaji = tokenToRomaji(token, tokens[i + 1]);
    if (pendingGemination) {
      romaji = geminateFirstConsonant(romaji);
      pendingGemination = false;
    }
    const previousToken = tokens[i - 1];
    const glueBackward = isGlueBackward(token, previousToken, tokens[i + 1]);
    const nameSuffix = isPersonNameSuffix(token, previousToken);
    const needsLeadingSpace =
      parts.length > 0 &&
      !glueBackward &&
      !nameSuffix &&
      !suppressNextLeadingSpace;
    if (nameSuffix) {
      parts.push('-');
    } else if (needsLeadingSpace) {
      parts.push(' ');
    }
    if (glueBackward && !nameSuffix) {
      romaji = mergeLongVowelAcrossGluedTokens(parts, romaji, token);
    }
    parts.push(romaji);
    suppressNextLeadingSpace = token.pos === '接頭詞';
    if (endsInUnresolvedSokuon(token)) pendingGemination = true;
  }
  return parts.join('');
}

// ---------------------------------------------------------------------------
// Async tokenizer bootstrap + synchronous lookup cache.
//
// kuromoji's dictionary build is asynchronous, but the existing curriculum
// generator (scripts/content/daily-life/module-1/helpers.mjs and everything
// it calls) is a large, synchronous call graph. Rather than threading async
// through that entire generator, this module exposes an async "prepare"
// step that must be called with every surface text that will need
// romanization BEFORE generation starts; toReadableRomaji() itself is a
// synchronous cache lookup that throws if a text was not pre-tokenized,
// instead of silently returning something unromanized.
// ---------------------------------------------------------------------------

let tokenizerPromise = null;
function getTokenizer() {
  if (!tokenizerPromise) {
    const dicPath = path.join(path.dirname(require.resolve('kuromoji/package.json')), 'dict');
    tokenizerPromise = new Promise((resolve, reject) => {
      kuromoji.builder({ dicPath }).build((err, tokenizer) => {
        if (err) reject(err);
        else resolve(tokenizer);
      });
    });
  }
  return tokenizerPromise;
}

const romajiCache = new Map();

/**
 * Tokenizes and romanizes every unique surface text up front, populating the
 * synchronous lookup cache used by toReadableRomaji(). Call once, with every
 * Japanese surfaceText the current generation run will need, before calling
 * toReadableRomaji(). Safe to call multiple times / with overlapping input;
 * already-cached texts are skipped.
 *
 * @param {string[]} surfaceTexts
 */
export async function prepareJapaneseRomanization(surfaceTexts) {
  const unique = [...new Set(surfaceTexts.filter((text) => typeof text === 'string' && text.length > 0))];
  const pending = unique.filter((text) => !romajiCache.has(text));
  if (pending.length === 0) return;
  const tokenizer = await getTokenizer();
  for (const text of pending) {
    romajiCache.set(text, await tokenizeAndRomanize(text, tokenizer));
  }
}

/**
 * Synchronous lookup of a previously-prepared romanization. Throws if
 * `surfaceText` was not passed to prepareJapaneseRomanization() first —
 * this is intentional: a cache miss here means a generator added new
 * Japanese content without updating its pre-tokenization call, which is a
 * real bug to surface immediately rather than silently skip.
 *
 * @param {string} surfaceText
 * @returns {string | undefined}
 */
export function toReadableRomaji(surfaceText) {
  if (surfaceText == null || surfaceText === '') return undefined;
  if (!romajiCache.has(surfaceText)) {
    throw new Error(
      `toReadableRomaji: "${surfaceText}" was not pre-tokenized. Call ` +
        'prepareJapaneseRomanization() with every needed surfaceText before generation.',
    );
  }
  return romajiCache.get(surfaceText);
}

/**
 * Directly tokenizes and romanizes one surface text, bypassing the cache.
 * For tests and one-off tooling; generator code should use
 * prepareJapaneseRomanization() + toReadableRomaji() instead so the
 * synchronous generator call graph is unaffected.
 *
 * @param {string} surfaceText
 * @returns {Promise<string>}
 */
export async function romanizeNow(surfaceText) {
  if (surfaceText == null || surfaceText === '') return '';
  const tokenizer = await getTokenizer();
  return tokenizeAndRomanize(surfaceText, tokenizer);
}

/**
 * True if `text` contains any hiragana or katakana characters. Used by the
 * validator to catch a "romanization" field that is actually still raw
 * kana. Necessary but not sufficient on its own — see the exact-string
 * fixture tests in scripts/test-japanese-pronunciation.mjs for correctness
 * beyond "contains no kana".
 */
export function containsKana(text) {
  if (!text) return false;
  return /[ぁ-ゖァ-ヺー]/u.test(text);
}

export const _internal = {
  HIRAGANA_MORA,
  YOUON,
  WHOLE_WORD_PRONUNCIATION_OVERRIDES,
  EXACT_LEXICAL_ROMANIZATION_OVERRIDES,
  tokenToRomaji,
  isGlueBackward,
  isPersonNameSuffix,
  getTokenizer,
  tokenReadingToRomaji,
};
