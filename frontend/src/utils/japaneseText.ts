/**
 * Phép hiển thị tiếng Nhật dùng chung — G14-R14 [JA].
 *
 * Bản TypeScript của cùng một phép mà `scripts/lib/japanese-furigana.mjs`
 * (Node, lúc sinh dữ liệu) và `mobile/novalang_flutter/lib/core/japanese_text.dart`
 * (Flutter) làm. Ba nơi phải cho ra ĐÚNG cùng kết quả; bộ chứng nằm ở
 * `shared/config/japanese_text_fixtures.json` và cả hai nền cùng chạy nó.
 *
 * Sửa luật ở đây thì phải sửa cả 3 nơi + cập nhật fixtures, không sửa lẻ.
 */

/** Ngoặc tròn full-width chứa TOÀN kana = chú âm. Ngoặc chứa kanji là chú giải — giữ. */
const FURIGANA = /（([ぁ-ゟー]+)）/g;
/** Ký tự MANG âm đọc: kanji + chữ số. Latin không (chỉ là nhãn 「A:」). */
const BEARING = /[一-龯㐀-䶿々0-9０-９]/;
const KANJI = /[一-龯㐀-䶿々]/;

export const hasKanji = (s?: string | null): boolean => KANJI.test(s ?? "");

export const hasFurigana = (s?: string | null): boolean =>
  /（[ぁ-ゟー]+）/.test(s ?? "");

/** Bỏ ngoặc chú âm. DÒNG CHÍNH LUÔN DÙNG HÀM NÀY (R14 [JA] a). */
export const stripFurigana = (s?: string | null): string =>
  String(s ?? "").replace(FURIGANA, "");

/** Katakana → hiragana. */
export const toHiragana = (s: string): string =>
  s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

/**
 * Ranh giới khối để vẽ wakachigaki. Mỗi cụm mang-âm-đọc + kana trong ngoặc của
 * nó là một khối; chữ thường giữa các khối là khối riêng.
 * KHÔNG đoán ranh giới từ — chỉ đọc lại dữ liệu ngoặc đã có.
 */
export function furiganaBlocks(source?: string | null): string[] {
  const s = String(source ?? "");
  if (!s) return [];
  const blocks: string[] = [];
  let buf = "";
  let last = 0;
  const re = new RegExp(FURIGANA.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    const before = s.slice(last, m.index);
    let cut = before.length;
    while (cut > 0 && BEARING.test(before[cut - 1])) cut -= 1;
    const plain = before.slice(0, cut);
    if (plain) buf += toHiragana(plain);
    if (buf) {
      blocks.push(buf);
      buf = "";
    }
    blocks.push(m[1]);
    last = m.index + m[0].length;
  }
  const tail = s.slice(last);
  if (tail) buf += toHiragana(tail);
  if (buf) blocks.push(buf);
  return blocks.filter(Boolean);
}

/** Dòng kana wakachigaki. Câu không có chú âm → chuỗi rỗng (không chèn gì). */
export const wakachigaki = (source?: string | null): string =>
  hasFurigana(source) ? furiganaBlocks(source).join(" ") : "";

// ───────────────────────── KANA → ROMAJI ─────────────────────────
// Modified Hepburn. CHỈ nhận kana vào — chuyển tự cơ học 1-1, KHÔNG phải đoán
// âm đọc kanji, nên không dính lệnh cấm ở G14-R14 [JA].

const DIGRAPHS: Record<string, string> = {
  きゃ: "kya", きゅ: "kyu", きょ: "kyo",
  しゃ: "sha", しゅ: "shu", しょ: "sho",
  ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
  にゃ: "nya", にゅ: "nyu", にょ: "nyo",
  ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
  みゃ: "mya", みゅ: "myu", みょ: "myo",
  りゃ: "rya", りゅ: "ryu", りょ: "ryo",
  ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
  じゃ: "ja", じゅ: "ju", じょ: "jo",
  ぢゃ: "ja", ぢゅ: "ju", ぢょ: "jo",
  びゃ: "bya", びゅ: "byu", びょ: "byo",
  ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
};

const MONOGRAPHS: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", ゐ: "i", ゑ: "e", を: "o",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o",
  ゃ: "ya", ゅ: "yu", ょ: "yo",
};

const MACRON: Record<string, string> = { a: "ā", i: "ī", u: "ū", e: "ē", o: "ō" };

/** Dấu câu Nhật → dấu câu Latin, kèm dấu cách sau theo lối viết Latin.
 *  Vẫn là ánh xạ 1-1 cơ học, không phải chia từ. */
const PUNCT: Record<string, string> = {
  "、": ", ", "。": ". ", "？": "? ", "！": "! ", "　": " ", "・": " ",
};

const peekSyllable = (s: string, i: number): string | undefined => {
  if (i >= s.length) return undefined;
  const two = s.slice(i, i + 2);
  if (DIGRAPHS[two]) return DIGRAPHS[two];
  return MONOGRAPHS[s[i]];
};

/**
 * Chuyển tự kana → Modified Hepburn.
 *
 * Trường âm: お-row + う và お-row + お gộp thành macron (ō); え-row + い và
 * い-row + い KHÔNG gộp (sensei, ii) — theo ADR-015, khớp bản Node đang dùng.
 */
export function kanaToRomaji(source?: string | null): string {
  const s = toHiragana(String(source ?? ""));
  if (!s) return "";
  let out = "";
  let i = 0;
  while (i < s.length) {
    const ch = s[i];

    // 「っ」 gấp đôi phụ âm của âm tiết sau; trước ch → tch.
    if (ch === "っ") {
      const rest = peekSyllable(s, i + 1);
      if (!rest) {
        i += 1;
        continue;
      }
      out += rest.startsWith("ch") ? "t" : rest[0];
      i += 1;
      continue;
    }

    // 「ん」 → n, thêm ' khi đứng trước nguyên âm hoặc y (kin'yōbi, han'i).
    if (ch === "ん") {
      out += "n";
      const next = peekSyllable(s, i + 1);
      if (next && /^[aiueoy]/.test(next)) out += "'";
      i += 1;
      continue;
    }

    // 「ー」 kéo dài nguyên âm trước đó.
    if (ch === "ー") {
      const prev = out.slice(-1);
      if (MACRON[prev]) out = out.slice(0, -1) + MACRON[prev];
      i += 1;
      continue;
    }

    let unit: string | undefined;
    const two = s.slice(i, i + 2);
    if (DIGRAPHS[two]) {
      unit = DIGRAPHS[two];
      i += 2;
    } else if (MONOGRAPHS[ch]) {
      unit = MONOGRAPHS[ch];
      i += 1;
    } else {
      out += PUNCT[ch] ?? ch; // dấu câu → dấu Latin; còn lại giữ nguyên
      i += 1;
      continue;
    }

    // Gộp trường âm: nguyên âm cuối của unit + kana kế tiếp.
    const vowel = unit[unit.length - 1];
    if (i < s.length) {
      const next = s[i];
      const merge =
        (vowel === "o" && (next === "う" || next === "お")) ||
        (vowel === "u" && next === "う") ||
        (vowel === "a" && next === "あ");
      if (merge) {
        unit = unit.slice(0, -1) + MACRON[vowel];
        i += 1;
      }
    }
    out += unit;
  }
  return tidy(out);
}

/** Bỏ dấu cách thừa trước dấu câu (do ghép khối) và gộp dấu cách lặp. */
const tidy = (s: string): string =>
  s.replace(/\s+([,.?!])/g, "$1").replace(/ {2,}/g, " ").trim();

/**
 * Dòng romaji của cả câu.
 *
 * Có chú âm → chuyển tự TỪNG KHỐI rồi nối bằng dấu cách, dùng ĐÚNG ranh giới
 * khối của dòng wakachigaki, nên hai dòng luôn thẳng hàng nhau.
 * Không có chú âm → chuyển tự thẳng dòng đọc (không có ranh giới để chia).
 */
export function romajiLine(displayText?: string | null, reading?: string | null): string {
  if (hasFurigana(displayText)) {
    return tidy(
      furiganaBlocks(displayText)
        .map(kanaToRomaji)
        .filter(Boolean)
        .join(" "),
    );
  }
  return tidy(kanaToRomaji(reading ?? displayText));
}
