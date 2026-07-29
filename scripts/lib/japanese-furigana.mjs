/**
 * FURIGANA — gắn cách đọc hiragana cho MỌI kanji hiển thị cho người học.
 *
 * Luật owner (2026-07-25): kanji hiện ra cho người học thì **bắt buộc** kèm
 * hiragana — sơ cấp, trung cấp, và cả cao cấp (cao cấp thì kanji chưa học vẫn
 * phải có). Không ngoại lệ.
 *
 * Quy ước hiển thị của repo — giữ nguyên, KHÔNG chế kiểu mới:
 *
 *     お名前（なまえ）      お先（さき）に失礼（しつれい）します
 *
 * tức ngoặc tròn **full-width** ngay sau đúng cụm kanji, kana đi kèm nằm ngoài
 * ngoặc. Đây đúng khuôn Golden đang dùng ở những chỗ ĐÃ có furigana.
 *
 * CÁCH ĐỌC KHÔNG ĐOÁN: tách hình vị bằng `kuromoji` (IPADIC) rồi lấy đúng
 * `reading` của từng token — cùng bộ phân tích mà `japanese-pronunciation.mjs`
 * đang dùng cho La-tinh hoá, nên hai đường không lệch nhau. Token nào kuromoji
 * không cho reading thì **fail loud**, không tự chế (G4/G8).
 */

import kuromoji from 'kuromoji';
import path from 'node:path';
import { createRequire } from 'node:module';
import { normalizeKnownReadingAmbiguity } from './japanese-pronunciation.mjs';

const require = createRequire(import.meta.url);

const KANJI = /[一-龯㐀-䶿]/;
const KANA = /[぀-ゟ゠-ヿ]/;

let tokenizer = null;

/** Dựng tokenizer một lần; dùng chung từ điển với pipeline phát âm. */
export async function initFurigana() {
  if (tokenizer) return tokenizer;
  const dicPath = path.join(path.dirname(require.resolve('kuromoji')), '..', 'dict');
  tokenizer = await new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath }).build((err, built) => {
      if (err) reject(err);
      else resolve(built);
    });
  });
  return tokenizer;
}

// Biến âm theo NGỮ CẢNH — cùng bộ luật mà `japanese-pronunciation.mjs` dùng,
// giữ hai đường không lệch nhau. kuromoji tách 何 đúng, nhưng cách đọc từ điển
// là なに; chuyển thành なん trước hệ từ là quy tắc phát âm thật, và chính L2
// ghi rõ "trong ～は何ですか, 何 được đọc là なん". Luật hẹp, có bằng chứng —
// KHÔNG phải cơ chế đoán cách đọc chung.
const CONTEXTUAL_READINGS = [
  { basicForm: '何', before: new Set(['です', 'だ', 'でした', 'でしょう']), reading: 'なん' },
];

const contextualReading = (token, next) => {
  const rule = CONTEXTUAL_READINGS.find((r) => r.basicForm === token.basic_form);
  if (!rule || !next || !rule.before.has(next.basic_form)) return null;
  return rule.reading;
};

/** Katakana → hiragana (kuromoji trả reading dạng katakana). */
const toHiragana = (katakana) =>
  katakana.replace(/[ァ-ヶ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60),
  );

export const hasKanji = (text) => KANJI.test(text ?? '');

/** Chuỗi đã có furigana kiểu 「〜（かな）」 chưa? */
export const hasFurigana = (text) => /（[぀-ゟー]+）/.test(text ?? '');

/**
 * Gắn furigana cho MỘT token: cắt phần kana chung ở đầu và cuối giữa mặt chữ
 * và cách đọc, chỉ phần lõi kanji còn lại mới vào ngoặc.
 *
 *   お先 / おさき      → お + 先（さき）
 *   失礼します/しつれいします → 失礼（しつれい） + します
 */
function annotateToken(surface, reading) {
  if (!KANJI.test(surface)) return surface;
  if (!reading) return null; // gọi bên ngoài xử — fail loud, không đoán.

  let head = 0;
  while (
    head < surface.length &&
    head < reading.length &&
    surface[head] === reading[head] &&
    KANA.test(surface[head])
  ) {
    head += 1;
  }

  let tail = 0;
  while (
    tail < surface.length - head &&
    tail < reading.length - head &&
    surface[surface.length - 1 - tail] === reading[reading.length - 1 - tail] &&
    KANA.test(surface[surface.length - 1 - tail])
  ) {
    tail += 1;
  }

  const prefix = surface.slice(0, head);
  const core = surface.slice(head, surface.length - tail);
  const suffix = surface.slice(surface.length - tail);
  const coreReading = reading.slice(head, reading.length - tail);

  if (!core || !coreReading) return surface;
  if (!KANJI.test(core)) return surface;
  return `${prefix}${core}（${coreReading}）${suffix}`;
}

/**
 * Gắn furigana cho cả câu. Chuỗi ĐÃ có furigana thì trả nguyên — không gắn
 * chồng. Token có kanji mà kuromoji không cho reading thì THROW, kèm đúng chỗ
 * hỏng, để người viết tự tra chứ máy không đoán.
 */
export function addFurigana(text) {
  if (!text || !hasKanji(text)) return text;
  if (hasFurigana(text)) return text;
  if (!tokenizer) throw new Error('[furigana] chưa gọi initFurigana()');

  return tokenizer
    .tokenize(text)
    .map((token, index, tokens) => {
      const surface = token.surface_form;
      if (!KANJI.test(surface)) return surface;
      // Chuẩn hoá cách đọc nhập nhằng (日本 → にほん, không phải にっぽん)
      // bằng ĐÚNG hàm mà đường La-tinh hoá dùng. Trước 2026-07-29 chỉ
      // đường La-tinh hoá gọi, nên chú âm hiển thị nói にっぽん trong khi
      // reading/romanization của cùng câu nói にほん.
      const reading =
        contextualReading(token, tokens[index + 1]) ??
        (token.reading ? toHiragana(normalizeKnownReadingAmbiguity(token.reading)) : null);
      const annotated = annotateToken(surface, reading);
      if (annotated === null) {
        throw new Error(
          `[furigana] kuromoji không có cách đọc cho token '${surface}' ` +
            `trong '${text}' — KHÔNG đoán. Thêm cách đọc thủ công cho chuỗi này.`,
        );
      }
      return annotated;
    })
    .join('');
}
