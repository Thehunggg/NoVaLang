#!/usr/bin/env node
/**
 * Exact-string fixture tests for scripts/lib/japanese-pronunciation.mjs
 * (JapanesePronunciationProfile — token-based Modified Hepburn romanization
 * via kuromoji morphological analysis).
 *
 * Run: node scripts/test-japanese-pronunciation.mjs
 *
 * Every case asserts the COMPLETE expected romanization string (spacing,
 * macrons, capitalization included) — a test that only checked "no kana
 * remains" would not prove romanization correctness (see Project Owner
 * review, 2026-07-16). containsKana() is still exercised at the end as a
 * cheap regression net, but it is not treated as sufficient on its own.
 *
 * This script only exercises the pure functions romanizeNow/containsKana.
 * It does not read or write curriculum content.
 */

import { romanizeNow, containsKana, _internal } from './lib/japanese-pronunciation.mjs';

const failures = [];

async function check(label, input, expected) {
  let actual;
  try {
    actual = await romanizeNow(input);
  } catch (error) {
    failures.push(`${label}: input ${JSON.stringify(input)} threw unexpectedly: ${error.message}`);
    return;
  }
  if (actual !== expected) {
    failures.push(
      `${label}: input ${JSON.stringify(input)} -> ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`,
    );
  }
}

async function checkThrows(label, input) {
  try {
    const actual = await romanizeNow(input);
    failures.push(`${label}: input ${JSON.stringify(input)} should have thrown, got ${JSON.stringify(actual)}`);
  } catch {
    // expected
  }
}

// --- Project-Owner-required exact examples (2026-07-16 rejection) ----------
await check('PO example 1 — direction particle spacing/macron', '町へようこそ', 'machi e yōkoso');
await check('PO example 2 — topic particle + proper noun + te-form spacing', '今は東京に住んでいます', 'ima wa Tōkyō ni sunde imasu');
await check('PO example 3 — topic particle + euphonic nan + copula spacing', 'これは何ですか', 'kore wa nan desu ka');

// --- は: topic particle (wa) vs lexical word (ha), decided by real POS tag,
// not character adjacency ----------------------------------------------------
await check('ha particle — kore wa', 'これは何ですか。', 'kore wa nan desu ka.');
await check('ha particle — onamae wa (was はな lexical-exception false positive under the old architecture)', 'お名前はなんですか。', 'onamae wa nan desu ka.');
await check('ha particle — ima wa (was はこ false positive under the old architecture)', 'いまはここにすんでいますか。', 'ima wa koko ni sunde imasu ka.');
await check('ha lexical — inside はっきり (adverb), not a particle', 'はっきり話してください。', 'hakkiri hanashite kudasai.');
await check('ha lexical — inside はじめまして (interjection)', 'はじめまして。', 'hajimemashite.');
await check('ha whole-word override — こんにちは stays wa despite being tagged one interjection token', 'こんにちは', 'konnichiwa');
await check('ha whole-word override — こんばんは', 'こんばんは', 'konbanwa');
await check('ha whole-word override — 実は is a single conjunction token', '実は、', 'jitsu wa,');

// --- へ: direction particle (e) vs lexical word (he) ------------------------
await check('e particle — doko e', 'どこへ行きたいんですか。', 'doko e ikitai n desu ka.');
await check('he lexical — inside たいへん (adverb), not a particle', 'それはたいへんですね。', 'sore wa taihen desu ne.');

// --- を: always the object particle (o) -------------------------------------
await check('o particle', 'お水をください。', 'omizu o kudasai.');

// --- Proper-noun capitalization ---------------------------------------------
await check('proper noun — Tōkyō', '東京はどこですか。', 'Tōkyō wa doko desu ka.');
await check('proper noun — Tanaka', '田中です。', 'Tanaka desu.');
await check('proper noun in a longer sentence stays capitalized mid-sentence', 'いいえ、大阪から来ました。', 'iie, Ōsaka kara kimashita.');

// --- Long-vowel / macron policy ---------------------------------------------
await check('macron — おう merge (o-row + u)', 'おはようございます', 'ohayō gozaimasu');
await check('macron — おお merge (o-row + o)', '遠いですか。', 'tōi desu ka.');
await check('no merge — えい stays literal "ei" (not macron)', 'せんせい', 'sensei');
await check('no merge — いい stays literal "ii" (not macron)', 'いいですね。', 'ii desu ne.');
await check('macron via explicit chōonpu', 'コーヒーをください。', 'kōhī o kudasai.');

// --- Small tsu (sokuon) gemination, including across a kuromoji token
// boundary (て-form split exactly at the small tsu) --------------------------
await check('sokuon within one token', '学校はどこですか。', 'gakkō wa doko desu ka.');
await check('sokuon carried across a token boundary — 伺って', 'お名前を伺ってもいいですか。', 'onamae o ukagatte mo ii desu ka.');
await check('sokuon carried across a token boundary — 手伝って', '手伝ってください。', 'tetsudatte kudasai.');

// --- Youon (contracted sounds) ----------------------------------------------
await check('youon きょ (+ macron merge)', '今日は東京から来ました。', 'kyō wa Tōkyō kara kimashita.');
await check('youon じゅ (+ macron merge)', '住所を書いてください。', 'jūsho o kaite kudasai.');

// --- Syllabic ん + apostrophe before a vowel or y ---------------------------
await check('ん apostrophe before や', '本屋はどこですか。', "hon'ya wa doko desu ka.");
if (_internal.tokenReadingToRomaji('じゅんい', 'test') !== "jun'i") {
  failures.push('ん apostrophe before い (direct mora check): expected "jun\'i"');
}
if (_internal.tokenReadingToRomaji('せんぱい', 'test') !== 'senpai') {
  failures.push('ん before a full consonant mora (ぱ) must not get an apostrophe: expected "senpai"');
}

// --- Word/particle spacing: prefix binds forward, suffix binds backward,
// auxiliary verbs glue, copula and ございます stay separate words -----------
await check('prefix お binds forward to its noun', 'お名前は？', 'onamae wa?');
await check('suffix 接尾 (time counter) binds backward', '何時ですか。', 'nanji desu ka.');
await check('consecutive number tokens glue to each other', '五百円です。', 'gohyakuen desu.');
await check('auxiliary ます glues to the verb, but the いる-family stays its own word', '今は東京に住んでいます。', 'ima wa Tōkyō ni sunde imasu.');
await check('copula です stays its own word despite being tagged 助動詞', 'これは何ですか。', 'kore wa nan desu ka.');
await check('approved person-name suffix policy uses a hyphen', '高橋さん、ありがとうございます。', 'Takahashi-san, arigatō gozaimasu.');
await check('connective が (but) stays its own word, unlike て/で', '難しいですが、楽しいです。', 'muzukashii desu ga, tanoshii desu.');

// --- Q14 systemic pipeline rules -------------------------------------------
await check('approved exact lexical override — スマホ', 'スマホ', 'sumaho');
await check('explanatory な + ん joins as nan without gluing to the noun', '留学生なんですね。', 'ryūgakusei nan desu ne.');
await check('long-o macron merges across glued auxiliary token boundary', '行きましょうか。', 'ikimashō ka.');
await check('person-name suffix — 佐藤さん', '佐藤さん', 'Satō-san');
await check('person-name suffix — 田中さん', '田中さん', 'Tanaka-san');

// --- Contextual reading override (euphonic alternation) ---------------------
await check('何 -> nan before a copula (euphonic alternation)', 'これは何ですか。', 'kore wa nan desu ka.');

// --- Known-reading normalization (dictionary ambiguity) ---------------------
await check('日本 normalized to nihon (not nippon) — matches the already-correct 日本語 reading', '日本へようこそ。', 'Nihon e yōkoso.');
await check('日本語 was already correct on its own', '日本語を勉強しています。', 'nihongo o benkyō shite imasu.');

// --- Punctuation / structural characters must not crash ---------------------
await check('sentence punctuation maps to ascii equivalents', 'これは何ですか。', 'kore wa nan desu ka.');
await check('comma', 'すみません、分かりません。', 'sumimasen, wakarimasen.');
await checkThrows('genuinely unmapped kana still fails loudly', 'ヴ');

// --- Dialogue-line-shaped input (no romanization field is required here by
// design — this just confirms the function itself does not crash on
// natural dialogue sentences containing quotation-like structure) ----------
await check('question mark, no trailing period', 'あなたは？', 'anata wa?');

// --- Empty / null-ish input ---------------------------------------------------
await check('empty string', '', '');

// --- containsKana() — necessary but not sufficient on its own --------------
if (!containsKana('にほんご')) failures.push('containsKana: should detect hiragana');
if (!containsKana('ニホンゴ')) failures.push('containsKana: should detect katakana');
if (containsKana('nihongo')) failures.push('containsKana: plain romaji must not be flagged');
if (containsKana('')) failures.push('containsKana: empty string must not be flagged');

if (failures.length) {
  console.error(`test:japanese-pronunciation FAILED (${failures.length} failure(s)):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log('PASS: japanese-pronunciation exact-string fixture tests completed successfully.');
