#!/usr/bin/env node
// ƯỚC LƯỢNG PHỦ NGUỒN + LỌC VỐN TỪ G14-R5 (vùng B) — CÔNG CỤ TIỀN-BUILD.
//
// Vì sao file này tồn tại: lượt rà 2026-07-30 dùng một script viết tạm ở
// scratchpad để đo độ phủ topic1-5 cho bài kế tiếp. Script đó chỉ bắt CỤM
// KANJI liên tiếp (regex [一-鿿]+) làm đơn vị "từ" — từ THUẦN KANA/KATAKANA
// (もちろん・コンビニ・ちょっと…) lọt qua hoàn toàn, nên số "0 từ lạ" là nới
// tay, không phải số thật. Owner chốt vá ngay và giữ lại thành công cụ dùng
// lại được cho bài sau, không phải chạy một lần rồi bỏ.
//
// CÁCH VÁ: dùng kuromoji thật (cùng tokenizer đã chạy trong
// japanese-pronunciation.mjs, không cài thêm gì) để tách TỪNG TOKEN — bắt
// được cả từ thuần kana/katakana, đúng đơn vị "token" mà G14-R5 nói tới.
//
// TẬP "ĐÃ BIẾT" = token xuất hiện khi tokenize (Tanos N5 ∪ taught-vocabulary
// tới bài cuối cùng đã viết). Tokenize CẢ vốn đã dạy (không chỉ so chuỗi
// nguyên khối) vì đo được: 13/13 trợ từ thường gặp (は・が・を・に・で・と・も・
// の・へ・や・か・ね・よ) đã xuất hiện đâu đó trong 134 cụm đã dạy dưới dạng
// token con — người học đã THẤY chúng trong câu thật dù chưa từng là thẻ từ
// vựng riêng. Không tự đặt danh sách trợ từ miễn trừ (tránh lỗi "tự nghĩ luật"
// đã gặp ở u2-l1 với また＋ましょう) — để tokenizer đo, không đoán.
//
// Dùng:
//   node scripts/estimate-source-coverage.mjs            (bảng so trước/sau
//                                                          cho 3 bài m02 kế)
//   node scripts/estimate-source-coverage.mjs --self-test (chỉ chạy phá thật)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { _internal } from "./lib/japanese-pronunciation.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { getTokenizer } = _internal;

const SYMBOL_POS = new Set(["記号", "空白"]);
// Nhân vật đã duyệt trong roster — tên riêng không tính là "từ mới" (R4).
const ROSTER = ["田中", "佐藤", "伊藤", "先生"];

/** Tokenize một chuỗi, trả về mảng surface_form (bỏ dấu câu/khoảng trắng). */
function tokenizeWords(text, tokenizer) {
  return tokenizer
    .tokenize(text)
    .filter((t) => !SYMBOL_POS.has(t.pos))
    .map((t) => ({ surface: t.surface_form, basic: t.basic_form }));
}

/**
 * Tập token "ĐÃ BIẾT" = tokenize(Tanos N5 gộp cả hai cột) ∪
 * tokenize(mọi cụm trong taught-vocabulary.json, tới bài cuối `_order.ja`).
 * Trả về Set<string> gồm cả surface_form và basic_form (bắt được chia động từ).
 */
export async function buildKnownTokenSet() {
  const tokenizer = await getTokenizer();
  const known = new Set();

  const tanosPath = path.join(
    ROOT,
    "local-sources/ja/hanabira.org-main/backend/express/json_data/wordsTanos_openai_JLPT_N5_tanos_vocab_list.json",
  );
  const tanos = JSON.parse(fs.readFileSync(tanosPath, "utf8"));
  for (const entry of tanos) {
    for (const form of [entry.vocabulary_original, entry.vocabulary_simplified]) {
      if (!form) continue;
      for (const { surface, basic } of tokenizeWords(form, tokenizer)) {
        known.add(surface);
        known.add(basic);
      }
    }
  }

  const ledgerPath = path.join(ROOT, "shared/content/curriculum/taught-vocabulary.json");
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
  const taughtPhrases = (ledger._order?.ja ?? []).flatMap((id) => ledger.ja[id] ?? []);
  for (const phrase of taughtPhrases) {
    for (const { surface, basic } of tokenizeWords(phrase, tokenizer)) {
      known.add(surface);
      known.add(basic);
    }
  }

  return known;
}

/**
 * Đếm token LẠ trong một câu — token không có trong `known`, không phải dấu
 * câu, không phải tên trong roster.
 * @returns {string[]} danh sách surface_form lạ (có thể rỗng)
 */
export function unknownTokensIn(text, tokenizer, known) {
  const out = [];
  for (const { surface, basic } of tokenizeWords(text, tokenizer)) {
    if (ROSTER.some((r) => surface.includes(r))) continue;
    if (known.has(surface) || known.has(basic)) continue;
    out.push(surface);
  }
  return out;
}

/** Đếm kiểu CŨ (chỉ cụm kanji liên tiếp) — giữ lại để in bảng so sánh. */
function unknownKanjiOnly(text, taughtPhrases) {
  const out = new Set();
  for (const m of text.match(/[一-鿿]+/g) ?? []) {
    if (ROSTER.some((r) => m.includes(r))) continue;
    if (taughtPhrases.some((v) => v.includes(m))) continue;
    out.add(m);
  }
  return [...out];
}

function loadCleanDialogues() {
  const flagRaw = JSON.parse(
    fs.readFileSync(path.join(ROOT, "scripts/content/sources/ten-lech-nhan.json"), "utf8"),
  );
  const flagged = new Set(flagRaw.items.map((x) => `${x.file}:${x.dialogue_id}`));
  const dialogues = [];
  for (let i = 1; i <= 5; i++) {
    const file = `topic${i}.json`;
    for (const d of JSON.parse(fs.readFileSync(path.join(ROOT, `local-sources/ja/${file}`), "utf8"))) {
      if (!flagged.has(`${file}:${d.dialogue_id}`)) dialogues.push({ ...d, _file: file });
    }
  }
  return dialogues;
}

const PROBES = {
  "m02-u1-l1 · Cảm ơn theo mức độ": [
    /ありがとうございました/, /ありがとうございます/, /どうもありがとう/, /ありがとう/, /恐れ入ります/, /助かりました/,
  ],
  "m02-u1-l2 · Đáp khi được cảm ơn": [/どういたしまして/, /こちらこそ/, /お役に立て/, /とんでもな/],
  "m02-u2-l1 · Xin lỗi & xin phép": [
    /すみません/, /申し訳(あり|ござ)/, /ごめんなさい/, /失礼します/, /よろしいですか/,
  ],
};

async function selfTest(tokenizer, known) {
  console.log("── PHÁ THẬT — câu có từ kana chắc chắn chưa dạy phải bị bắt ──");
  const cases = [
    { text: "もちろんです。", mustFlag: "もちろん" },
    { text: "コンビニで買います。", mustFlag: "コンビニ" },
  ];
  let allOk = true;
  for (const c of cases) {
    const unk = unknownTokensIn(c.text, tokenizer, known);
    const caught = unk.includes(c.mustFlag);
    console.log(`  ${caught ? "OK  " : "FAIL"} "${c.text}" -> token lạ: [${unk.join(", ")}] (phải chứa "${c.mustFlag}")`);
    if (!caught) allOk = false;
  }
  // đối chứng: câu N5 quen thuộc phải sạch hoàn toàn.
  const clean = "すみません、これは何ですか。";
  const unkClean = unknownTokensIn(clean, tokenizer, known);
  console.log(`  ${unkClean.length === 0 ? "OK  " : "FAIL"} "${clean}" -> token lạ: [${unkClean.join(", ")}] (phải rỗng)`);
  if (unkClean.length !== 0) allOk = false;
  console.log(allOk ? "  => PHÁ THẬT: bộ đếm mới bắt đúng, không báo động nhầm câu sạch." : "  => CÓ CA SAI, xem lại.");
  console.log("");
  return allOk;
}

async function main() {
  const tokenizer = await getTokenizer();
  const known = await buildKnownTokenSet();

  const selfTestOnly = process.argv.includes("--self-test");
  const ok = await selfTest(tokenizer, known);
  if (selfTestOnly) process.exit(ok ? 0 : 1);

  const ledger = JSON.parse(
    fs.readFileSync(path.join(ROOT, "shared/content/curriculum/taught-vocabulary.json"), "utf8"),
  );
  const taughtPhrases = (ledger._order?.ja ?? []).flatMap((id) => ledger.ja[id] ?? []);
  const dialogues = loadCleanDialogues();
  console.log(`KHO SẠCH: ${dialogues.length} hội thoại (đã bỏ hội thoại bị cờ ten-lech-nhan.json)`);
  console.log("");

  for (const [name, patterns] of Object.entries(PROBES)) {
    const hit = dialogues.filter((d) => d.utterances.some((u) => patterns.some((p) => p.test(u.utterance))));
    const turns = hit.flatMap((d) => d.utterances);

    let oldClean = 0, oldOne2 = 0, oldMany = 0;
    let newClean = 0, newOne2 = 0, newMany = 0;
    for (const t of turns) {
      const nOld = unknownKanjiOnly(t.utterance, taughtPhrases).length;
      if (nOld === 0) oldClean++; else if (nOld <= 2) oldOne2++; else oldMany++;

      const nNew = unknownTokensIn(t.utterance, tokenizer, known).length;
      if (nNew === 0) newClean++; else if (nNew <= 2) newOne2++; else newMany++;
    }

    console.log(`══ ${name}`);
    console.log(`   hội thoại khớp chủ đề: ${hit.length} / ${dialogues.length}  ·  tổng lượt: ${turns.length}`);
    console.log(`   CŨ (chỉ đếm cụm kanji)   : 0 lạ=${oldClean}  dư1-2=${oldOne2}  dư>2=${oldMany}`);
    console.log(`   MỚI (token thật, kèm kana): 0 lạ=${newClean}  dư1-2=${newOne2}  dư>2=${newMany}`);
    console.log("");
  }
}

const isMain = path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url);
if (isMain) main();
