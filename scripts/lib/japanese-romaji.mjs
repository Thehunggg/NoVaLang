/**
 * KANA → ROMAJI (Modified Hepburn) — bản Node.
 *
 * Bản thứ BA của cùng một phép, ngang hàng với
 * `frontend/src/utils/japaneseText.ts` (web) và
 * `mobile/novalang_flutter/lib/core/japanese_text.dart` (Flutter).
 * Cả ba phải cho ra ĐÚNG cùng kết quả; bộ chứng dùng chung là
 * `shared/config/japanese_text_fixtures.json`, kiểm bằng
 * `scripts/test-japanese-text-parity.mjs`.
 *
 * Đây là CHUYỂN TỰ CƠ HỌC 1-1 từ kana, KHÔNG phải đoán âm đọc kanji — không
 * dính lệnh cấm ở G14-R14 [JA]. Kana mỗi ký tự một âm, không có chỗ để đoán.
 *
 * Sửa luật ở đây thì phải sửa cả 3 nơi + cập nhật fixtures.
 */

import { readingFromFurigana } from './japanese-furigana.mjs';

const DIGRAPHS = {
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  ぢゃ: 'ja', ぢゅ: 'ju', ぢょ: 'jo',
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
};

const MONOGRAPHS = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', ゐ: 'i', ゑ: 'e', を: 'o',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o',
  ゃ: 'ya', ゅ: 'yu', ょ: 'yo',
};

const MACRON = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };

/** Dấu câu Nhật → dấu Latin, kèm dấu cách sau. Ánh xạ 1-1 cơ học. */
const PUNCT = { '、': ', ', '。': '. ', '？': '? ', '！': '! ', '　': ' ', '・': ' ' };

const toHiragana = (s) =>
  String(s ?? '').replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

const tidy = (s) => s.replace(/\s+([,.?!])/g, '$1').replace(/ {2,}/g, ' ').trim();

const peekSyllable = (s, i) => {
  if (i >= s.length) return undefined;
  const two = s.slice(i, i + 2);
  if (DIGRAPHS[two]) return DIGRAPHS[two];
  return MONOGRAPHS[s[i]];
};

export function kanaToRomaji(source) {
  const s = toHiragana(String(source ?? ''));
  if (!s) return '';
  let out = '';
  let i = 0;
  while (i < s.length) {
    const ch = s[i];

    if (ch === 'っ') {
      const rest = peekSyllable(s, i + 1);
      if (!rest) { i += 1; continue; }
      out += rest.startsWith('ch') ? 't' : rest[0];
      i += 1;
      continue;
    }
    if (ch === 'ん') {
      out += 'n';
      const next = peekSyllable(s, i + 1);
      if (next && /^[aiueoy]/.test(next)) out += "'";
      i += 1;
      continue;
    }
    if (ch === 'ー') {
      const prev = out.slice(-1);
      if (MACRON[prev]) out = out.slice(0, -1) + MACRON[prev];
      i += 1;
      continue;
    }

    let unit;
    const two = s.slice(i, i + 2);
    if (DIGRAPHS[two]) { unit = DIGRAPHS[two]; i += 2; }
    else if (MONOGRAPHS[ch]) { unit = MONOGRAPHS[ch]; i += 1; }
    else { out += PUNCT[ch] ?? ch; i += 1; continue; }

    const vowel = unit[unit.length - 1];
    if (i < s.length) {
      const next = s[i];
      const merge =
        (vowel === 'o' && (next === 'う' || next === 'お')) ||
        (vowel === 'u' && next === 'う') ||
        (vowel === 'a' && next === 'あ');
      if (merge) { unit = unit.slice(0, -1) + MACRON[vowel]; i += 1; }
    }
    out += unit;
  }
  return tidy(out);
}

/**
 * Dòng romaji của cả câu: chuyển tự TỪNG KHỐI rồi nối bằng dấu cách, dùng ĐÚNG
 * ranh giới khối của dòng wakachigaki nên hai dòng luôn thẳng hàng nhau.
 */
export function romajiLine(displayText, reading) {
  const blocks = readingFromFurigana(displayText).blocks;
  if (blocks.length > 1) return tidy(blocks.map(kanaToRomaji).filter(Boolean).join(' '));
  return tidy(kanaToRomaji(reading ?? displayText));
}
