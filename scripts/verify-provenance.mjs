#!/usr/bin/env node
// CỔNG NGUYÊN VĂN — kiểm mọi câu khai là "lấy nguyên văn" có THẬT nằm trong
// file nguồn không.
//
// Dùng:  node scripts/verify-provenance.mjs <provenance.json>
//
// Dạng file provenance:
//   { "lessonId": "...",
//     "items": [
//       { "path": "...", "targetText": "...",
//         "source": "<đường dẫn file nguồn>", "line": 4980, "verbatim": true },
//       { "path": "...", "targetText": "...",
//         "authored": true, "reason": "vì sao tự soạn" } ] }
//
// Vì sao phải chuẩn hoá trước khi so — đo thật trên kho (INVENTORY.md):
//   · Kho có ký tự Kangxi Radical (⼀ U+2F00) do bóc PDF   → NFKC
//   · Furigana xuất hiện BA kiểu khác nhau                  → bóc cả ba
//       (1) ngoặc:      社長（しゃちょう）    ← cách NovaLang dùng
//       (2) dòng riêng: dòng kana nằm TRÊN lời thoại (Irodori)
//       (3) dính liền:  社長しゃちょう        ← n3_grammar-list-from-text.md
//   · Collins có dấu cách chen giữa từ ("来まし た")         → bỏ mọi khoảng trắng
//
// Item `authored: true` KHÔNG kiểm — chỉ đếm và in lý do, để thấy rõ phần nào
// của bài là tự soạn.

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readingFromFurigana } from "./lib/japanese-furigana.mjs";
import { walkLessonStrings, buildLessonPathIndex } from "./lib/lesson-walk.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Cửa sổ đọc quanh `line` — furigana Irodori nằm ở dòng riêng phía trên. */
const WINDOW = 3;

const KANJI = /[㐀-鿿豈-﫿]/;
const HIRA = "\\u3041-\\u3096\\u309D\\u309E\\u30FC";

/** (1) furigana kiểu ngoặc: 社長（しゃちょう） hoặc 社長(しゃちょう) */
const stripBracketFurigana = (s) =>
  s.replace(new RegExp(`[（(][${HIRA}]+[）)]`, "gu"), "");

/**
 * (3) furigana DÍNH LIỀN sau cụm kanji: 社長しゃちょう → 社長
 *
 * ⚠ ĐO ĐƯỢC KHI TỰ TEST: bóc kiểu này KHÔNG phân biệt được ruby ép phẳng với
 * okurigana thật. Nó ăn nhầm 行って→行 và になります→ε. Vì vậy KHÔNG áp mặc
 * định — chỉ dùng ở MỨC 2, khi mức 1 đã trượt (nguồn duy nhất cần nó là
 * n3_grammar-list-from-text.md, xem INVENTORY §B3).
 */
const stripInlineFurigana = (s) =>
  s.replace(
    new RegExp(`([\\u3400-\\u9FFF]{1,})([${HIRA}]{2,})`, "gu"),
    (m, kanji, kana) => (kana.length >= kanji.length * 2 ? kanji : m),
  );

/** Bỏ mọi khoảng trắng, kể cả khoảng trắng full-width. */
const stripSpaces = (s) => s.replace(/[\s　]+/gu, "");

/** MỨC 1 — an toàn, dùng cho mọi nguồn. NFKC + furigana-ngoặc + bỏ khoảng trắng. */
export const normalize = (s) =>
  stripSpaces(stripBracketFurigana(String(s ?? "").normalize("NFKC")));

/** MỨC 2 — thêm bóc furigana dính liền. Chỉ dùng khi mức 1 trượt. */
export const normalizeAggressive = (s) =>
  stripSpaces(stripInlineFurigana(stripBracketFurigana(String(s ?? "").normalize("NFKC"))));

/**
 * (2) furigana DÒNG RIÊNG: gom cửa sổ quanh `line` thành một chuỗi, nhưng BỎ
 * những dòng chỉ toàn kana/khoảng trắng — đó chính là dòng ruby của Irodori.
 * Bỏ chúng để chuỗi nối lại không bị chèn kana lạ vào giữa.
 */
const buildHaystack = (lines, lineNo) => {
  const from = Math.max(0, lineNo - 1 - WINDOW);
  const to = Math.min(lines.length, lineNo + WINDOW);
  const kept = [];
  for (let i = from; i < to; i += 1) {
    const raw = lines[i] ?? "";
    const isRubyOnly = raw.trim().length > 0 && new RegExp(`^[\\s\\u3000${HIRA}]+$`, "u").test(raw);
    if (!isRubyOnly) kept.push(raw);
  }
  return kept.join("\n");
};

const readSource = (rel) => {
  const abs = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, "utf8").split(/\r?\n/);
};

// ── R9: BLOCKLIST ────────────────────────────────────────────────────────
const BLOCKED = (() => {
  const p = path.join(ROOT, "scripts/content/sources/blocked-sources.json");
  if (!existsSync(p)) return new Map();
  const doc = JSON.parse(readFileSync(p, "utf8"));
  return new Map((doc.blocked ?? []).map((e) => [e.path.replace(/\\/g, "/"), e]));
})();

export const blockedEntry = (src) => BLOCKED.get(String(src ?? "").replace(/\\/g, "/"));

// ── R12a: FURIGANA đối chiếu JMdict ──────────────────────────────────────
// Validator cũ chỉ bắt THIẾU reading, không bắt SAI. Ở đây đối chiếu mọi
// reading với danh sách kana của chính từ đó trong JMdict.
// Từ đa-âm đã biết → FLAG (vào mục CẦN MẮT NGƯỜI, R10), không FAIL.
// 日本 nằm đây vì lý do KHÁC các chữ còn lại: cả にほん lẫn にっぽん đều hợp lệ
// trong JMdict nên R12a KHÔNG FAIL được cách đọc sai. Quy ước của khoá học là
// にほん (đo 2026-07-29: generator từng tự gắn にっぽん cho option Q12 của
// u2-l2). Đưa vào đây để mọi lần xuất hiện đều lên mục CẦN MẮT NGƯỜI.
export const POLYPHONIC = new Set(["何", "人", "日", "中", "方", "行", "日本"]);

let JMDICT_INDEX = null;
export function loadJmdictIndex(file = "local-sources/ja/jmdict/jmdict-eng-3.6.2.json") {
  if (JMDICT_INDEX) return JMDICT_INDEX;
  const abs = path.join(ROOT, file);
  if (!existsSync(abs)) return (JMDICT_INDEX = null);
  const words = JSON.parse(readFileSync(abs, "utf8")).words ?? [];
  const idx = new Map();
  for (const w of words) {
    const kana = (w.kana ?? []).map((k) => k.text).filter(Boolean);
    if (!kana.length) continue;
    for (const k of w.kanji ?? []) {
      if (!k.text) continue;
      if (!idx.has(k.text)) idx.set(k.text, new Set());
      for (const r of kana) idx.get(k.text).add(r);
    }
    for (const k of kana) {
      if (!idx.has(k)) idx.set(k, new Set());
      idx.get(k).add(k);
    }
  }
  return (JMDICT_INDEX = idx);
}

const KATA_TO_HIRA = (s) =>
  s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/**
 * @returns {{verdict:'PASS'|'FAIL'|'FLAG'|'SKIP', why?:string}}
 *   PASS = reading nằm trong danh sách kana JMdict của từ
 *   FAIL = từ CÓ trong JMdict nhưng reading không nằm trong danh sách
 *   FLAG = từ thuộc danh sách đa-âm → cần mắt người
 *   SKIP = không tra được (từ không có trong JMdict, hoặc chưa nạp index)
 */
export function checkReadingAgainstJmdict(word, reading, idx = JMDICT_INDEX) {
  if (!idx) return { verdict: "SKIP", why: "chưa nạp JMdict" };
  const w = String(word ?? "").trim();
  const r = KATA_TO_HIRA(String(reading ?? "").trim());
  if (!w || !r) return { verdict: "SKIP", why: "thiếu word/reading" };
  const set = idx.get(w);
  if (!set) return { verdict: "SKIP", why: `JMdict không có mục "${w}"` };
  const ok = [...set].some((k) => KATA_TO_HIRA(k) === r);
  if (ok) {
    if ([...w].some((c) => POLYPHONIC.has(c))) {
      return { verdict: "FLAG", why: `chứa chữ đa-âm — cần mắt người` };
    }
    return { verdict: "PASS" };
  }
  if ([...w].some((c) => POLYPHONIC.has(c))) {
    return { verdict: "FLAG", why: `đa-âm, reading "${r}" ngoài danh sách JMdict` };
  }
  return { verdict: "FAIL", why: `reading "${r}" KHÔNG có trong JMdict cho "${w}" (JMdict: ${[...set].join(", ")})` };
}

// ── R12b: KIỂM MUTATION ──────────────────────────────────────────────────
export const MUTATION_OPS = new Set([
  "particle_swap", "form_swap", "conj_error",
  "san_drop", "san_add", "o_prefix_self", "particle_dup",
]);
const PARTICLES = new Set(["は", "が", "を", "も", "の", "に", "へ", "で", "と"]);

/** Diff hai chuỗi → danh sách vị trí khác nhau (so ký tự, chỉ dùng khi cùng độ dài). */
const diffPositions = (a, b) => {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) if (a[i] !== b[i]) out.push(i);
  return out;
};

export function checkMutation(mutation, text, corpus) {
  if (!mutation || typeof mutation !== "object") return { ok: false, why: "thiếu khối mutation" };
  const { from, op } = mutation;
  if (!MUTATION_OPS.has(op)) return { ok: false, why: `op không hợp lệ: ${JSON.stringify(op)}` };
  if (!from) return { ok: false, why: "thiếu mutation.from" };
  const nFrom = normalize(from);
  const nText = normalize(text);
  if (nFrom === nText) return { ok: false, why: "text TRÙNG from — không phải biến thể" };
  if (!corpus.has(nFrom)) return { ok: false, why: `mutation.from KHÔNG xuất hiện trong bài: ${from}` };

  // particle_swap / particle_dup: kiểm CHẶT — diff phải đúng một vị trí thuộc bộ trợ từ
  if (op === "particle_swap") {
    if (nFrom.length !== nText.length) return { ok: false, why: "particle_swap phải giữ nguyên độ dài" };
    const d = diffPositions(nFrom, nText);
    if (d.length !== 1) return { ok: false, why: `particle_swap phải khác ĐÚNG 1 vị trí, đang khác ${d.length}` };
    const a = nFrom[d[0]], b = nText[d[0]];
    if (!PARTICLES.has(a) || !PARTICLES.has(b)) {
      return { ok: false, why: `vị trí đổi (${a}→${b}) không thuộc bộ trợ từ` };
    }
    return { ok: true };
  }
  if (op === "particle_dup") {
    if (nText.length !== nFrom.length + 1) return { ok: false, why: "particle_dup phải dài hơn from đúng 1 ký tự" };
    const d = diffPositions(nFrom, nText);
    const c = nText[d[0] ?? 0];
    if (!PARTICLES.has(c)) return { ok: false, why: `ký tự thêm (${c}) không phải trợ từ` };
    return { ok: true };
  }
  // các op còn lại: kiểm mềm (khác from + op hợp lệ + from có trong bài) — đã xong ở trên
  return { ok: true };
}

// ── R12c: VÍ DỤ ĐÚNG MẪU ─────────────────────────────────────────────────
/** Câu ví dụ của grammarPattern phải CHỨA chuỗi bề mặt của mẫu (hoặc biến thể đã khai). */
// ── KIỂM PHỦ — mọi trường tiếng Nhật HIỂN THỊ phải có item khai ──────────
// Nhập thẳng vào cổng: nó đã bắt 2 lỗi mà cổng không thấy (câu ngoài sổ, và
// furigana generator đoán sai) — để rời thành script thì sang batch sau sẽ quên.
// SUY TỪ REGISTRY, không khai tay. Trước 2026-07-30 hằng này khai tay 5 trường
// trong khi render-coverage.json khai 17 trường display — hai danh sách lệch
// nhau, nên tiếng Nhật ở `prompt`/`context`/`correctAnswer` chưa bao giờ bị soi.
// Giờ chỉ còn MỘT nguồn: shared/config/render-coverage.json.
const REGISTRY = JSON.parse(
  readFileSync(path.join(ROOT, "shared", "config", "render-coverage.json"), "utf8"),
).fields;

/** Trường phải khai nguồn (cờ mustDeclareProvenance trong registry). */
export const COVERAGE_FIELDS = Object.entries(REGISTRY)
  .filter(([, d]) => d.mustDeclareProvenance === true)
  .map(([k]) => k);

/** Trường có mặt trong registry nhưng được miễn khai — kèm lý do. */
export const COVERAGE_WAIVED = Object.entries(REGISTRY)
  .filter(([, d]) => d.mustDeclareProvenance !== true)
  .map(([k, d]) => [k, d.waivedReason ?? "(THIẾU LÝ DO)"]);

/**
 * Gom mọi chuỗi tiếng Nhật hiển thị trong một lesson đã sinh.
 * Dùng walk CHUNG với check-render-coverage.mjs (scripts/lib/lesson-walk.mjs)
 * — trước 2026-07-30 đây là một vòng walk-cây-JSON riêng, cùng việc nhưng
 * khác bản với collectFields() bên check-render-coverage.mjs.
 */
export function collectDisplayedJapanese(lesson) {
  const out = new Map();
  const JP = /[぀-ヿ一-鿿]/;
  for (const { path: p, key, value } of walkLessonStrings(lesson.fiveCardContent, "fiveCardContent")) {
    if (JP.test(value) && COVERAGE_FIELDS.includes(key)) out.set(p, value);
  }
  for (const { path: p, key, value } of walkLessonStrings({ vocabulary: lesson.vocabulary }, "")) {
    if (JP.test(value) && COVERAGE_FIELDS.includes(key)) out.set(p, value);
  }
  return out;
}

// ───────────────────────────────────────────────────────────────────────────
// WALK PATH — phá thật 2026-07-30 đo được: `path` trong provenance CHƯA BAO
// GIỜ được đối chiếu với dữ liệu thật. Ba ca:
//   CA2 — đổi path thành một chuỗi không tồn tại, giữ nguyên targetText/
//         source/line → PASS, FAIL 0. path là nhãn thuần tuý, không tra cứu.
//   CA1 — sửa lessons.json tại đúng path (giữ nguyên provenance) → mục TỰ NÓ
//         vẫn "PASS ← source:line" (so với nguồn, không so với lessons.json);
//         cổng tổng vẫn thấy FAIL nhưng qua đường KIỂM PHỦ (checkCoverage) —
//         một tác dụng PHỤ dựa trên "giá trị mới có nằm trong tập targetText
//         đã khai hay không", không phải xác minh ĐÚNG PATH ĐÓ. Hoán đổi hai
//         câu đã khai giữa hai path sẽ lọt qua cả hai cơ chế cũ.
// Vá: tra `item.path` thẳng vào lessons.json, so targetText với giá trị THẬT
// tại đúng path đó — không qua trung gian "có nằm trong tập nào đó".
// ───────────────────────────────────────────────────────────────────────────

/**
 * @param {Map<string,string>} pathIndex  từ buildLessonPathIndex(lesson)
 * @param {{path:string, targetText:string}} item
 * @returns {{ok:true}|{ok:false, why:string, want?:string, got?:string}}
 */
export function checkPathMatches(pathIndex, item) {
  if (!pathIndex.has(item.path)) {
    return { ok: false, why: "path không tồn tại trong lessons.json" };
  }
  const want = normalize(item.targetText);
  const got = normalize(pathIndex.get(item.path));
  if (want !== got) {
    return { ok: false, why: "targetText KHÁC giá trị thật tại path", want, got };
  }
  return { ok: true };
}

/** @returns {{total:number, exempt:number, missing:Array<[string,string]>}} */
export function checkCoverage(lessonId, items, lessonsFile = "shared/generated/lessons.json") {
  const abs = path.join(ROOT, lessonsFile);
  if (!existsSync(abs)) return null;
  const all = JSON.parse(readFileSync(abs, "utf8"));
  const lesson = (all.lessons ?? all).find((l) => l.id === lessonId);
  if (!lesson) return null;
  const declared = new Set(items.map((i) => normalize(i.targetText)));
  const found = collectDisplayedJapanese(lesson);
  let exempt = 0;
  const missing = [];
  for (const [p, v] of found) {
    // Miễn khai giờ do REGISTRY quyết (cờ mustDeclareProvenance=false), không
    // còn regex path khai tay. collectDisplayedJapanese đã lọc theo registry
    // nên tới đây không còn trường miễn — giữ biến đếm để báo cáo không đổi hình.
    if (!declared.has(normalize(v))) missing.push([p, v]);
  }
  return { total: found.size, exempt, missing };
}

// ───────────────────────────────────────────────────────────────────────────
// R12d — FURIGANA phải khớp DÒNG ĐỌC của chính câu đó.
//
// Vì sao cần: cổng nguyên văn CHUẨN HOÁ BỎ furigana trước khi so, nên một chú
// âm sai vẫn PASS. Đo được hai ca lọt hết mọi cổng: 日本（にっぽん） và
// 9月（つき）. Kiểm này ráp ngược chú âm trong ngoặc + phần chữ thường thành
// một dòng kana, rồi so với dòng đọc người viết. Lệch là FAIL.
//
// So phần KANA thôi (bỏ dấu câu, khoảng trắng, chữ Latin): dấu câu giữa mặt
// chữ và dòng đọc hay lệch nhau vô hại, còn trợ từ thì đều là kana nên vẫn
// bị bắt đầy đủ.
// ───────────────────────────────────────────────────────────────────────────
const kanaOnly = (s) =>
  String(s ?? "")
    .replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .replace(/[^぀-ゟー]/g, "");

export function checkFuriganaAgainstReading(displayText, reading) {
  const text = String(displayText ?? "");
  if (!/（[぀-ゟー]+）/.test(text)) return { ok: true, skipped: "không có furigana" };
  if (typeof reading !== "string" || !reading.trim()) {
    return { ok: true, skipped: "không có dòng đọc để so" };
  }
  const { kana } = readingFromFurigana(text);
  const got = kanaOnly(kana);
  const want = kanaOnly(reading);
  if (got === want) return { ok: true, kana: got };
  return { ok: false, got, want };
}

/**
 * Chạy R12d cho CẢ BÀI: mọi node vừa có trường hiển thị đã gắn furigana, vừa
 * có dòng đọc kana (reading / audioText).
 */
export function checkLessonFurigana(lessonId, lessonsFile = "shared/generated/lessons.json") {
  const abs = path.join(ROOT, lessonsFile);
  if (!existsSync(abs)) return null;
  const all = JSON.parse(readFileSync(abs, "utf8"));
  const lesson = (all.lessons ?? all).find((l) => l.id === lessonId);
  if (!lesson) return null;

  const KANA_LINE = /^[぀-ゟ゠-ヿー、。！？\s]+$/;
  const checked = [];
  const failed = [];
  const walk = (n, p) => {
    if (Array.isArray(n)) return n.forEach((v, i) => walk(v, `${p}[${i}]`));
    if (!n || typeof n !== "object") return;
    const line =
      (typeof n.reading === "string" && n.reading.trim() && n.reading) ||
      (typeof n.audioText === "string" && KANA_LINE.test(n.audioText) && n.audioText) ||
      null;
    for (const [k, v] of Object.entries(n)) {
      const here = p ? `${p}.${k}` : k;
      if (typeof v === "string") {
        if (!COVERAGE_FIELDS.includes(k) || !line) continue;
        const r = checkFuriganaAgainstReading(v, line);
        if (r.skipped) continue;
        checked.push(here);
        if (!r.ok) failed.push([here, v, line, r.got, r.want]);
      } else walk(v, here);
    }
  };
  walk(lesson, "");
  return { checked: checked.length, failed };
}

export function checkExampleMatchesPattern(example, surfaces) {
  const e = normalize(example);
  const list = (Array.isArray(surfaces) ? surfaces : [surfaces]).filter(Boolean).map(normalize);
  if (!list.length) return { ok: false, why: "mẫu không khai chuỗi bề mặt nào" };
  const hit = list.find((s) => e.includes(s));
  return hit ? { ok: true, hit } : { ok: false, why: `ví dụ không chứa mẫu nào trong [${list.join(" · ")}]` };
}

/**
 * Tách một khối nguồn thành PHÂN ĐOẠN — đơn vị mà một câu đích được phép bằng.
 *
 * Ranh giới, đủ cả ba loại kho đang có:
 *  1. dấu kết câu 。？！ (giữ dấu lại trong phân đoạn);
 *  2. nhãn người nói — ĐỦ 5 QUY ƯỚC của G14-R4:
 *       Ａ：/A:  ·  - **A:**  ·  A␣(không dấu hai chấm)  ·  Tên Latin:
 *       (quy ước 5 là trường JSON, xử ở (3));
 *  3. ranh giới trường JSON — "utterance": "…" của topic1-5.
 *
 * KHÔNG tách theo 、 — dấu phẩy nằm GIỮA câu, tách theo nó là tự chẻ nhỏ câu
 * rồi cho câu cắt cụt PASS trở lại, đúng cái luật này muốn chặn.
 */
export function splitSegments(block) {
  const out = [];
  for (let line of String(block ?? "").split(/\r?\n/)) {
    // (3) trường JSON: lấy đúng phần trong ngoặc kép của "utterance"/"text"…
    const j = line.match(/"(?:utterance|text|displayText|targetText)"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (j) line = j[1].replace(/\\"/g, '"');

    // NỚI 1 — có lý do: Irodori đặt TIỀN TỐ trước nhãn người nói, dạng
    //   「①     01-06       Ａ：日本に来て、…」
    // (số khoanh tròn = số kịch bản, 01-06 = mã track audio). Không bóc tiền
    // tố này thì nhãn không nằm ở đầu dòng và câu thoại không bao giờ tách ra
    // được. Chỉ bóc đúng hình đó, không bóc chữ bất kỳ.
    line = line.replace(/^\s*[①-⑳]?\s*\d{2}-\d{2}\s+/, '');

    // NỚI 1b — cùng loại: `n5_ngu-phap-vi` đánh mục trước câu Nhật, dạng
    //   「a. あさごはんを まだたべていません。Tôi vẫn chưa ăn sáng.」
    // Bóc đúng dấu đánh mục (một-hai ký tự + . hoặc ）), không bóc chữ bất kỳ.
    line = line.replace(/^\s*[a-zA-Z0-9]{1,2}\s*[.)．）]\s+/, '');

    // (2) bỏ nhãn người nói ở đầu dòng, giữ lại lời thoại — đủ 5 quy ước R4
    line = line
      .replace(/^\s*[-*]\s*\*\*[^*]{1,20}\*\*\s*[:：]?\s*/, '')
      .replace(/^\s*[①-⑳]?\s*[Ａ-Ｚア-ヴA-Za-z一-龯]{1,12}\s*[:：]\s*/, '')
      .replace(/^\s*[A-ZＡ-Ｚ]\s+(?=[぀-ヿ一-鿿])/, '');

    const turn = line.trim();
    if (!turn) continue;

    // NỚI 2 — có lý do: MỘT LƯỢT NÓI có thể gồm NHIỀU CÂU
    //   「そうですか。日本の生活に、もう慣れましたか？」 = 1 lượt, 2 câu.
    // Nên phát ra CẢ HAI mức: trọn lượt, và từng câu trong lượt. Câu đích được
    // bằng một trong hai. Vẫn chặn cắt cụt: 「日本に来て」 không bằng mức nào.
    out.push(turn);
    const sentences = turn.split(/(?<=[。！？])/).map((s) => s.trim()).filter(Boolean);
    if (sentences.length > 1) out.push(...sentences);
  }
  return out;
}

function checkItem(item) {
  const blocked = blockedEntry(item.source);
  if (blocked) {
    return { ok: false, why: `NGUỒN BỊ CHẶN (${blocked["mức"]}): ${blocked.reason}` };
  }
  const lines = readSource(item.source);
  if (!lines) return { ok: false, why: `không mở được nguồn: ${item.source}` };
  if (!Number.isInteger(item.line) || item.line < 1 || item.line > lines.length) {
    return { ok: false, why: `số dòng ngoài phạm vi: ${item.line} (file có ${lines.length} dòng)` };
  }
  const raw = buildHaystack(lines, item.line);

  // KHỚP PHÂN ĐOẠN TRỌN VẸN (LS-4, siết 2026-07-30) — thay cho so-substring cũ.
  // targetText phải BẰNG một phân đoạn của nguồn, không phải nằm-lọt-trong.
  // Câu cắt cụt («日本に来て» lấy từ «日本に来て、どのぐらいですか？») hết đường PASS.
  const segs1 = splitSegments(raw).map(normalize).filter(Boolean);
  const want1 = normalize(item.targetText);
  if (segs1.includes(want1)) return { ok: true, level: 1 };

  const segs2 = splitSegments(raw).map(normalizeAggressive).filter(Boolean);
  const want2 = normalizeAggressive(item.targetText);
  if (segs2.includes(want2)) return { ok: true, level: 2 };

  // NỚI 3 — có lý do, và phải KHAI TƯỜNG MINH `token: true`.
  // Thẻ token / ô ghép / từ ở mục tham khảo là MẢNH cắt từ một câu nguồn
  // (1年 · に · なります cắt từ 「1年になります。」). Mảnh thì không bao giờ
  // bằng trọn một phân đoạn — đó là bản chất, không phải lỗi khai.
  // Vẫn CHẶT hơn bản cũ: mảnh phải nằm trong ĐÚNG một phân đoạn tại ĐÚNG dòng
  // đã khai, không phải "ở đâu đó trong cửa sổ ±3 dòng".
  if (item.token === true) {
    const hit = segs1.find((s) => s.includes(want1));
    if (hit) return { ok: true, level: 1, token: hit };
    const hit2 = segs2.find((s) => s.includes(want2));
    if (hit2) return { ok: true, level: 2, token: hit2 };
    return { ok: false, why: "khai token nhưng KHÔNG nằm trong phân đoạn nào ở dòng đã khai", want: want1, got: normalize(raw) };
  }

  // Vì sao trượt: nằm-lọt-trong (cắt cụt) hay không có mặt?
  const inside = normalize(raw).includes(want1);
  return {
    ok: false,
    why: inside
      ? "CẮT CỤT — có mặt trong nguồn nhưng KHÔNG bằng trọn một phân đoạn"
      : "không khớp",
    want: want1,
    got: normalize(raw),
  };
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("dùng: node scripts/verify-provenance.mjs <provenance.json>");
    process.exit(2);
  }
  const doc = JSON.parse(readFileSync(file, "utf8"));
  const items = doc.items ?? [];
  let pass = 0;
  let fail = 0;
  let authored = 0;
  let mutations = 0;
  const bySource = new Map();
  const uniqBySource = new Map();
  const weak = [];
  const needEyes = [];

  console.log(`CỔNG NGUYÊN VĂN — ${doc.lessonId ?? "(không có lessonId)"} · ${items.length} mục`);
  console.log("");

  // WALK PATH (vá 2026-07-30, xem checkPathMatches) — path phải trỏ tới một
  // giá trị THẬT trong lessons.json, đúng bằng targetText đã khai. Áp cho MỌI
  // loại item (verbatim/authored/mutation) vì path+targetText mô tả nội dung
  // đang hiện Ở ĐÂU, không phụ thuộc câu đó lấy từ đâu.
  let pathIndex = null;
  const lessonsPath = path.join(ROOT, "shared", "generated", "lessons.json");
  if (doc.lessonId && existsSync(lessonsPath)) {
    const allLessons = JSON.parse(readFileSync(lessonsPath, "utf8"));
    const lesson = (allLessons.lessons ?? allLessons).find((l) => l.id === doc.lessonId);
    if (lesson) pathIndex = buildLessonPathIndex(lesson);
  }
  let pathFail = 0;

  // Corpus để R12b kiểm `mutation.from` có thật trong bài không.
  const corpus = new Set(items.map((i) => normalize(i.targetText)));
  const mutationByOp = new Map();
  const authoredByReason = new Map();

  for (const item of items) {
    if (pathIndex) {
      const pr = checkPathMatches(pathIndex, item);
      if (!pr.ok) {
        fail += 1;
        pathFail += 1;
        console.log(`  FAIL     ${item.path} — WALK PATH: ${pr.why}`);
        if (pr.want !== undefined) {
          console.log(`             khai (đã chuẩn hoá): ${pr.want}`);
          console.log(`             thật (đã chuẩn hoá): ${pr.got}`);
        }
        continue;
      }
    }
    if (item.mutation) {
      const r = checkMutation(item.mutation, item.targetText, corpus);
      if (r.ok) {
        mutations += 1;
        mutationByOp.set(item.mutation.op, (mutationByOp.get(item.mutation.op) ?? 0) + 1);
        console.log(`  MUTATION ${item.path} — ${item.mutation.op}`);
      } else {
        fail += 1;
        console.log(`  FAIL     ${item.path} — mutation không hợp lệ: ${r.why}`);
      }
      continue;
    }
    if (item.authored) {
      authored += 1;
      // Gom theo CHUỖI reason ĐẦY ĐỦ. Bản cũ cắt ở dấu ':' nên
      // "ghép hai câu verbatim ...md:5000" bị xé thành 2 nhóm.
      const key = String(item.reason ?? "(không ghi lý do)").trim();
      authoredByReason.set(key, (authoredByReason.get(key) ?? 0) + 1);
      console.log(`  TỰ SOẠN  ${item.path} — ${item.reason ?? "(không ghi lý do)"}`);
      continue;
    }
    if (!item.verbatim) {
      fail += 1;
      console.log(`  FAIL     ${item.path} — mục không khai verbatim cũng không khai authored`);
      continue;
    }
    const r = checkItem(item);
    if (r.ok) {
      pass += 1;
      bySource.set(item.source, (bySource.get(item.source) ?? 0) + 1);
      if (!uniqBySource.has(item.source)) uniqBySource.set(item.source, new Set());
      // Dedupe theo CÂU MẸ (source+line): mảnh token/canonicalText trỏ cùng
      // câu nên không đếm riêng — nếu không, tỉ lệ bị mảnh làm lệch.
      uniqBySource.get(item.source).add(`${item.source}:${item.line}`);
      if (r.level === 2) { weak.push(item.path + " (mức 2)"); needEyes.push([4, item.path, item.targetText, "PASS qua chuẩn hoá MỨC 2"]); }
      const lv = r.level === 2 ? " [chuẩn hoá MỨC 2]" : "";
      console.log(`  PASS     ${item.path}  ←  ${item.source}:${item.line}${lv}`);
    } else {
      fail += 1;
      console.log(`  FAIL     ${item.path}  ←  ${item.source}:${item.line} — ${r.why}`);
      if (r.want !== undefined) {
        console.log(`             bài (đã chuẩn hoá) : ${r.want}`);
        console.log(`             nguồn (đã chuẩn hoá): ${String(r.got).slice(0, 300)}`);
      }
    }
  }

  console.log("");
  console.log("── TỈ LỆ NGUỒN (G14-R10) ──");
  const totU = [...uniqBySource.values()].reduce((a, s) => a + s.size, 0);
  const totF = [...bySource.values()].reduce((a, n) => a + n, 0);
  for (const [src, n] of bySource) {
    const u = uniqBySource.get(src).size;
    console.log(
      `  ${src.split("/").pop().padEnd(28)} câu mẹ ${String(u).padStart(3)} (${Math.round((u * 100) / totU)}%)` +
        ` · trường ${String(n).padStart(3)} (${Math.round((n * 100) / totF)}%)`,
    );
  }
  console.log("── AUTHORED theo reason ──");
  for (const [r, n] of [...authoredByReason].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${r}`);
  }
  console.log("── MUTATION theo op ──");
  for (const [op, n] of mutationByOp) console.log(`  ${String(n).padStart(3)}  ${op}`);
  console.log(`── PASS-YẾU ── ${weak.length ? weak.join(", ") : "0"}`);

  const cov = checkCoverage(doc.lessonId, items);
  if (cov) {
    const need = cov.total - cov.exempt;
    console.log("── KIỂM PHỦ ──");
    console.log(
      `  trường hiển thị ${cov.total} · miễn khai ${cov.exempt} · phải khai ${need}` +
        ` · item ${items.length} · THIẾU ${cov.missing.length}`,
    );
    for (const [p, v] of cov.missing.slice(0, 20)) {
      console.log(`  THIẾU  ${p} = ${JSON.stringify(v)}`);
    }
    fail += cov.missing.length;
  } else {
    console.log("── KIỂM PHỦ ── BỎ QUA (chưa có bài trong lessons.json)");
  }

  const furi = checkLessonFurigana(doc.lessonId);
  if (furi) {
    console.log("── R12d FURIGANA ↔ DÒNG ĐỌC ──");
    console.log(`  kiểm ${furi.checked} chuỗi · LỆCH ${furi.failed.length}`);
    for (const [p, text, line, got, want] of furi.failed) {
      console.log(`  FAIL  ${p}`);
      console.log(`          mặt chữ  : ${text}`);
      console.log(`          ráp ngược: ${got}`);
      console.log(`          dòng đọc : ${want}   (${line})`);
    }
    fail += furi.failed.length;
  } else {
    console.log("── R12d FURIGANA ↔ DÒNG ĐỌC ── BỎ QUA (chưa có bài trong lessons.json)");
  }

  if (needEyes.length) {
    console.log("── CẦN MẮT NGƯỜI ──");
    needEyes
      .sort((a, b) => a[0] - b[0])
      .forEach(([, p, t, why], i) => console.log(`  ${i + 1}. [${why}] ${p} = ${JSON.stringify(t)}`));
  }

  console.log("");
  console.log(
    `TỔNG — nguyên văn PASS ${pass} · FAIL ${fail} · tự soạn ${authored} · mutation ${mutations}` +
      (pathIndex ? ` · WALK PATH lệch ${pathFail}` : " · WALK PATH BỎ QUA (chưa có bài trong lessons.json)"),
  );
  if (fail > 0) process.exit(1);
}

// Chỉ chạy khi ĐÚNG file này là entry point. Bản cũ có nhánh
// `else if (process.argv[2]) main()` → module khác import vào mà có sẵn
// tham số dòng lệnh là main() tự chạy. So sánh đường dẫn đã resolve cho
// khỏi lệch vì Windows dùng '\' còn import.meta.url dùng '/'.
if (process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])) {
  main();
}
