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
export const POLYPHONIC = new Set(["何", "人", "日", "中", "方", "行"]);

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
export function checkExampleMatchesPattern(example, surfaces) {
  const e = normalize(example);
  const list = (Array.isArray(surfaces) ? surfaces : [surfaces]).filter(Boolean).map(normalize);
  if (!list.length) return { ok: false, why: "mẫu không khai chuỗi bề mặt nào" };
  const hit = list.find((s) => e.includes(s));
  return hit ? { ok: true, hit } : { ok: false, why: `ví dụ không chứa mẫu nào trong [${list.join(" · ")}]` };
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

  // MỨC 1 trước — an toàn. Chỉ hạ xuống MỨC 2 khi mức 1 trượt.
  const want1 = normalize(item.targetText);
  const got1 = normalize(raw);
  if (got1.includes(want1)) return { ok: true, level: 1 };

  const want2 = normalizeAggressive(item.targetText);
  const got2 = normalizeAggressive(raw);
  if (got2.includes(want2)) return { ok: true, level: 2 };

  return { ok: false, why: "không khớp", want: want1, got: got1 };
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

  console.log(`CỔNG NGUYÊN VĂN — ${doc.lessonId ?? "(không có lessonId)"} · ${items.length} mục`);
  console.log("");

  for (const item of items) {
    if (item.authored) {
      authored += 1;
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
  console.log(`TỔNG — nguyên văn PASS ${pass} · FAIL ${fail} · tự soạn ${authored}`);
  if (fail > 0) process.exit(1);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  main();
} else if (process.argv[2]) {
  main();
}
