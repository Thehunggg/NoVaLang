/**
 * FURIGANA — gắn cách đọc hiragana cho MỌI kanji hiển thị cho người học.
 *
 * Luật owner (2026-07-25): kanji hiện ra cho người học thì **bắt buộc** kèm
 * hiragana — sơ cấp, trung cấp, và cả cao cấp. Không ngoại lệ.
 *
 * Quy ước hiển thị của repo — giữ nguyên, KHÔNG chế kiểu mới:
 *
 *     お名前（なまえ）      お先（さき）に失礼（しつれい）します
 *
 * tức ngoặc tròn **full-width** ngay sau đúng cụm kanji, kana đi kèm nằm ngoài
 * ngoặc.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 2026-07-29 — BỎ HẲN kuromoji khỏi đường furigana (owner chốt).
 *
 * Bản cũ hỏi từ điển IPADIC lấy cách đọc. Từ điển ĐOÁN, và đoán sai lặng lẽ:
 * đo được 日本 → にっぽん (phải là にほん) và 9月 → つき (phải là くがつ).
 * Cả hai lọt mọi cổng vì furigana bị chuẩn hoá bỏ đi trước khi so nguyên văn.
 *
 * Bản này KHÔNG hỏi từ điển nữa. Cách đọc lấy từ ĐÚNG dòng kana mà người
 * viết đã tự tra và đã qua duyệt (`reading` / `audioText` của chính câu đó).
 * Máy chỉ làm một việc cơ học: RÁP mặt chữ với dòng kana đó để biết cụm kana
 * nào thuộc cụm kanji nào. Ráp không ra đúng MỘT cách → THROW, không chọn
 * bừa. Nên máy không còn "biết" âm đọc của bất kỳ chữ nào — nó chỉ cắt một
 * chuỗi mà người viết đã cung cấp.
 *
 * Mỏ neo để ráp là các ký tự XUẤT HIỆN NGUYÊN DẠNG trong dòng kana:
 * hiragana, dấu câu, khoảng trắng. Katakana quy về hiragana rồi cũng làm mỏ
 * neo (すまほ ↔ スマホ). Kanji · CHỮ SỐ · chữ Latin là phần MANG âm đọc —
 * chữ số nằm cùng nhóm với kanji vì 9月 đọc liền là くがつ, không tách được.
 */

const KANJI = /[一-龯㐀-䶿々]/;
const HIRAGANA = /[぀-ゟ]/;
const KATAKANA = /[゠-ヿ]/;
// CHỮ SỐ mang âm đọc: 9月 đọc liền là くがつ, không tách 9 ra được.
// CHỮ LATIN thì KHÔNG — trong nội dung này Latin chỉ là nhãn người nói
// (「A:」「B:」), hiện nguyên dạng, nên nó là mỏ neo như dấu câu.
const BEARING = /[一-龯㐀-䶿々0-9０-９]/;

/** Katakana → hiragana, để katakana làm mỏ neo được. */
const toHiragana = (s) =>
  String(s ?? '').replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

export const hasKanji = (text) => KANJI.test(text ?? '');

/** Chuỗi đã có furigana kiểu 「〜（かな）」 chưa? */
export const hasFurigana = (text) => /（[぀-ゟー]+）/.test(text ?? '');

/** Bỏ ngoặc furigana, trả lại mặt chữ sạch. */
export const stripFurigana = (text) => String(text ?? '').replace(/（[぀-ゟー]+）/g, '');

/**
 * Cắt mặt chữ thành các đoạn xen kẽ:
 *   { bearing: true }  — kanji/số/Latin, phải tra kana từ dòng đọc
 *   { bearing: false } — hiragana/katakana/dấu câu, khớp nguyên dạng
 */
function segment(surface) {
  const out = [];
  let inParen = false;
  for (const ch of surface) {
    if (ch === '（') inParen = true;
    // Kanji NẰM TRONG ngoặc tròn full-width là chú giải đang được TRÍCH DẪN
    // (bài kana viết 「あめ（雨）— mưa」 để chỉ "あめ viết là 雨"), không phải
    // kanji thiếu chú âm. Gắn furigana vào đó ra 「あめ（雨（あめ））」 — đúng
    // thứ bản cũ đã sinh ra và đang ship. Coi như chữ thường, không gắn.
    const bearing = !inParen && BEARING.test(ch);
    const last = out[out.length - 1];
    if (last && last.bearing === bearing) last.text += ch;
    else out.push({ bearing, text: ch });
    if (ch === '）') inParen = false;
  }
  return out;
}

/**
 * Ráp mặt chữ với dòng kana. Trả về MẢNG các cách ráp hợp lệ (dừng ở 2 —
 * chỉ cần biết "duy nhất" hay "nhập nhằng"). Mỗi cách ráp là mảng kana
 * tương ứng từng đoạn `bearing`.
 *
 * Ràng buộc: mỗi đoạn bearing phải nhận ÍT NHẤT 1 ký tự kana (một cụm kanji
 * không thể đọc thành rỗng) — chính ràng buộc này loại được cách ráp sai
 * trong 「日本に来て」/「にほんにきて」 (nếu mỏ neo「に」khớp vào に của にほん
 * thì 日本 phải đọc rỗng → loại).
 */
function align(segments, reading) {
  const solutions = [];
  const kana = toHiragana(reading);

  const walk = (si, ri, acc) => {
    if (solutions.length >= 2) return;
    if (si === segments.length) {
      if (ri === kana.length) solutions.push([...acc]);
      return;
    }
    const seg = segments[si];
    if (!seg.bearing) {
      const want = toHiragana(seg.text);
      if (kana.startsWith(want, ri)) walk(si + 1, ri + want.length, acc);
      return;
    }
    // Đoạn mang âm đọc: thử mọi độ dài ≥1 tới hết phần còn lại.
    const nextAnchor = segments[si + 1];
    for (let len = 1; ri + len <= kana.length; len += 1) {
      // Cắt tỉa: nếu đoạn sau là mỏ neo thì kana ngay sau phải khớp mỏ neo đó.
      if (nextAnchor && !nextAnchor.bearing) {
        const want = toHiragana(nextAnchor.text);
        if (!kana.startsWith(want, ri + len)) continue;
      }
      acc.push(kana.slice(ri, ri + len));
      walk(si + 1, ri + len, acc);
      acc.pop();
      if (solutions.length >= 2) return;
    }
  };

  walk(0, 0, []);
  return solutions;
}

/**
 * Gắn furigana cho một chuỗi, lấy kana từ `reading` mà người viết đã cung cấp.
 *
 *   deriveFurigana('去年の9月に来ました。', 'きょねんのくがつにきました。')
 *     → '去年（きょねん）の9月（くがつ）に来（き）ました。'
 *
 * Chuỗi đã có furigana → trả nguyên. Không có kanji → trả nguyên.
 * Thiếu `reading`, ráp 0 cách, hoặc ráp >1 cách → THROW.
 */
export function deriveFurigana(surface, reading, where = '') {
  const text = String(surface ?? '');
  if (!text || !hasKanji(text)) return text;
  if (hasFurigana(text)) return text;

  const at = where ? ` (${where})` : '';
  if (typeof reading !== 'string' || !reading.trim()) {
    throw new Error(
      `[furigana] '${text}'${at} có kanji nhưng KHÔNG có dòng đọc kana đi kèm.\n` +
        `  Máy không tra từ điển nữa (owner chốt 2026-07-29). Viết 'reading' cho câu này,\n` +
        `  hoặc gõ thẳng furigana kiểu 漢字（かんじ） vào mặt chữ.`,
    );
  }

  const segments = segment(text);
  const solutions = align(segments, reading);

  if (solutions.length === 0) {
    throw new Error(
      `[furigana] KHÔNG ráp được mặt chữ với dòng đọc${at}:\n` +
        `  mặt chữ : ${text}\n` +
        `  dòng đọc: ${reading}\n` +
        `  Hai chuỗi không khớp nhau (thiếu/thừa chữ, hoặc dòng đọc sai). Sửa 'reading',\n` +
        `  hoặc gõ thẳng furigana vào mặt chữ nếu đây là ca đọc đặc biệt.`,
    );
  }
  if (solutions.length > 1) {
    throw new Error(
      `[furigana] ráp được NHIỀU cách, không chọn bừa${at}:\n` +
        `  mặt chữ : ${text}\n` +
        `  dòng đọc: ${reading}\n` +
        `  Gõ thẳng furigana kiểu 漢字（かんじ） vào mặt chữ để chốt cách đọc.`,
    );
  }

  const kanaFor = solutions[0];
  let k = 0;
  return segments
    .map((seg) => (seg.bearing ? `${seg.text}（${kanaFor[k++]}）` : seg.text))
    .join('');
}

/**
 * Bóc các cặp (cụm mang âm đọc → kana) từ một chuỗi ĐÃ gắn furigana.
 *
 *   '去年（きょねん）の9月（くがつ）に来（き）ました。'
 *     → [['去年','きょねん'], ['9月','くがつ'], ['来','き']]
 */
/**
 * Cắt chuỗi ĐÃ gắn furigana thành các phần để vẽ:
 *   [{ text:'去年', kana:'きょねん' }, { text:'の', kana:null }, …]
 * Dùng cho trang duyệt vẽ <ruby> mà không phải tự bóc ngoặc lần nữa.
 */
export function splitFurigana(annotated) {
  const s = String(annotated ?? '');
  const parts = [];
  const re = /（([぀-ゟー]+)）/g;
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    const before = s.slice(last, m.index);
    let cut = before.length;
    while (cut > 0 && BEARING.test(before[cut - 1])) cut -= 1;
    if (before.slice(0, cut)) parts.push({ text: before.slice(0, cut), kana: null });
    const run = before.slice(cut);
    if (run) parts.push({ text: run, kana: m[1] });
    else parts.push({ text: m[0], kana: null }); // ngoặc không bám cụm nào → chữ thường
    last = m.index + m[0].length;
  }
  const tail = s.slice(last);
  if (tail) parts.push({ text: tail, kana: null });
  return parts;
}

export function furiganaPairs(annotated) {
  const s = String(annotated ?? '');
  const pairs = [];
  const re = /（([぀-ゟー]+)）/g;
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    const before = s.slice(last, m.index);
    let cut = before.length;
    while (cut > 0 && BEARING.test(before[cut - 1])) cut -= 1;
    const run = before.slice(cut);
    if (run) pairs.push([run, m[1]]);
    last = m.index + m[0].length;
  }
  return pairs;
}

/**
 * Gắn furigana cho một MẢNH câu (chat segment, nhãn phương án…) không có dòng
 * đọc riêng, bằng SỔ TRA CỦA CHÍNH BÀI ĐÓ — tức những cặp kanji→kana mà người
 * viết đã cung cấp ở câu khác trong cùng bài (qua `reading`), đã ráp ở lượt 1.
 *
 * Không tra từ điển. Cụm nào sổ chưa có, hoặc bài ghi cụm đó bằng HAI cách đọc
 * khác nhau (何 → なに ở câu này, なん ở câu kia), thì THROW — máy không chọn hộ.
 */
export function annotateFromIndex(surface, index, where = '') {
  const text = String(surface ?? '');
  if (!text || !hasKanji(text)) return text;
  if (hasFurigana(text)) return text;

  const at = where ? ` (${where})` : '';
  const segments = segment(text);
  const unknown = [];
  const ambiguous = [];
  const out = segments.map((seg) => {
    if (!seg.bearing) return seg.text;
    const readings = index.get(seg.text);
    if (!readings || readings.size === 0) {
      unknown.push(seg.text);
      return seg.text;
    }
    if (readings.size > 1) {
      ambiguous.push(`${seg.text} → ${[...readings].join(' / ')}`);
      return seg.text;
    }
    return `${seg.text}（${[...readings][0]}）`;
  });

  if (unknown.length) {
    throw new Error(
      `[furigana] '${text}'${at} không có dòng đọc riêng, và bài này chưa từng\n` +
        `  cung cấp cách đọc cho: ${[...new Set(unknown)].join(' · ')}\n` +
        `  Máy không tra từ điển (owner chốt 2026-07-29). Thêm 'reading' cho mảnh này,\n` +
        `  hoặc gõ thẳng furigana kiểu 漢字（かんじ） vào mặt chữ.`,
    );
  }
  if (ambiguous.length) {
    throw new Error(
      `[furigana] '${text}'${at} — bài này ghi cụm đó bằng NHIỀU cách đọc, không chọn hộ:\n` +
        `  ${ambiguous.join('\n  ')}\n` +
        `  Gõ thẳng furigana vào mặt chữ để chốt cách đọc cho đúng ngữ cảnh này.`,
    );
  }
  return out.join('');
}

/**
 * RÁP NGƯỢC — dùng chung cho cổng (R12d) và trang duyệt.
 * Từ chuỗi ĐÃ có furigana, dựng lại dòng đọc kana: lấy kana trong ngoặc thay
 * cho cụm kanji đứng trước, giữ nguyên phần còn lại.
 *
 *   '去年（きょねん）の9月（つき）に来（き）ました。' → 'きょねんのつきにきました。'
 *
 * Trả về `{ kana, blocks }`; `blocks` là các khối theo ranh giới từ, để trang
 * duyệt vẽ wakachigaki mà KHÔNG phải đoán ranh giới.
 */
/**
 * BẢNG TRỢ TỪ ĐÓNG — owner chốt 2026-07-29 (phương án A).
 *
 * Chỉ những chuỗi trong bảng này mới được đứng RIÊNG thành một khối. Khối chữ
 * thường ngay sau khối ngoặc mà KHÔNG có trong bảng thì là okurigana, dính vào
 * khối trước: 来（き）ました → きました.
 *
 * Bảng ĐÓNG, không suy đoán: không có bộ tách từ ở đây. Chuỗi không khớp bảng
 * thì giữ nguyên khối, KHÔNG bao giờ cắt trong lòng nó (とても không thành
 * とて も).
 */
export const PARTICLE_BLOCKS = new Set([
  'は', 'が', 'を', 'に', 'で', 'と', 'も', 'の', 'へ', 'や', 'か', 'ね', 'よ',
  'から', 'まで',
  // ghép — phải xét trước dạng đơn vì dài hơn
  'には', 'では', 'とは', 'にも', 'でも',
]);

export function readingFromFurigana(text) {
  const s = String(text ?? '');
  /** @type {{kana:string, fromBracket:boolean}[]} */
  const raw = [];
  let out = '';
  const re = /（([぀-ゟー]+)）/g;
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    const before = s.slice(last, m.index);
    // Cụm mang âm đọc là phần bearing NGAY TRƯỚC ngoặc; phần trước nữa là
    // chữ thường, thuộc khối riêng.
    let cut = before.length;
    while (cut > 0 && BEARING.test(before[cut - 1])) cut -= 1;
    const plain = before.slice(0, cut);
    if (plain) {
      raw.push({ kana: toHiragana(plain), fromBracket: false });
      out += toHiragana(plain);
    }
    raw.push({ kana: m[1], fromBracket: true });
    out += m[1];
    last = m.index + m[0].length;
  }
  const tail = s.slice(last);
  if (tail) {
    raw.push({ kana: toHiragana(tail), fromBracket: false });
    out += toHiragana(tail);
  }

  // Gộp okurigana: khối THƯỜNG ngay sau khối NGOẶC, không phải trợ từ → dính.
  const blocks = [];
  for (const b of raw) {
    if (!b.kana) continue;
    const prev = blocks[blocks.length - 1];
    if (!b.fromBracket && prev && prev.fromBracket && !PARTICLE_BLOCKS.has(b.kana)) {
      prev.kana += b.kana;
      continue;
    }
    blocks.push({ ...b });
  }
  return { kana: out, blocks: blocks.map((b) => b.kana) };
}
