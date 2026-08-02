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

/**
 * Token LẠ DUY NHẤT trên CẢ MỘT ĐOẠN nhiều lượt — khử trùng lặp qua UNION,
 * KHÁC `unknownTokensIn` (đếm riêng từng lượt rồi cộng). Owner chỉ ra
 * 2026-07-31: đếm theo lượt khiến một khối 4 lượt có thể mang tới 8 từ lạ
 * (2/lượt × 4) trong khi bài chỉ dạy 7 cụm — số theo-lượt không phản ánh
 * đúng gánh nặng từ vựng của CẢ khối.
 * @param {string[]} texts mảng câu trong đoạn (theo thứ tự lượt)
 * @returns {string[]} token lạ duy nhất, khử trùng lặp
 */
export function uniqueUnknownInSpan(texts, tokenizer, known) {
  const set = new Set();
  for (const text of texts) {
    for (const w of unknownTokensIn(text, tokenizer, known)) set.add(w);
  }
  return [...set];
}

/**
 * Với một hội thoại, tìm ĐOẠN LIÊN TIẾP DÀI NHẤT bắt đầu từ mỗi lượt mà
 * UNION từ lạ (khử trùng lặp, `uniqueUnknownInSpan`) không vượt `threshold`
 * VÀ đoạn đó chứa ít nhất một lượt khớp `keywordRe`. Union chỉ tăng hoặc
 * giữ nguyên khi mở rộng đoạn (đơn điệu) nên vừa vượt ngưỡng thì dừng mở
 * rộng từ điểm bắt đầu đó — không cần thử lại.
 * @returns {{len:number, start:number, end:number, unk:string[]}|null} đoạn tốt nhất
 *   (chứa từ khoá, dài nhất) toàn hội thoại, hoặc null nếu không đoạn nào đạt.
 */
export function bestQualifyingSpan(dialogue, tokenizer, known, threshold, keywordRe) {
  const utterances = dialogue.utterances;
  const n = utterances.length;
  let best = null;
  for (let i = 0; i < n; i++) {
    const unionSet = new Set();
    let hasKw = false;
    for (let j = i; j < n; j++) {
      const u = utterances[j];
      if (keywordRe.test(u.utterance)) hasKw = true;
      for (const w of unknownTokensIn(u.utterance, tokenizer, known)) unionSet.add(w);
      if (unionSet.size > threshold) break; // đơn điệu — mở xa hơn cũng sẽ vượt
      const len = j - i + 1;
      if (hasKw && (!best || len > best.len)) {
        best = { len, start: i, end: j, unk: [...unionSet] };
      }
    }
  }
  return best;
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
  "m02-u1-l2 · Đáp khi được cảm ơn": [/どういたしまして/, /こちらこそ/, /お役に立て/, /とんでもな/, /いえいえ/],
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

  console.log("── PHÁ THẬT MỨC KHỐI — union từ lạ, không phải cộng theo lượt ──");
  // 3 lượt, MỖI lượt chỉ 1 từ lạ RIÊNG (khác nhau cả 3) — kiểu đếm CŨ (mỗi
  // lượt ≤2) sẽ nói "cả 3 lượt đều ổn". Union đúng phải thấy 3 từ lạ khác
  // nhau khi gộp cả khối → ngưỡng 2 phải TỪ CHỐI lượt thứ 3, ngưỡng 3 mới
  // nhận đủ. Đây đúng lỗ hổng owner chỉ ra 2026-07-31.
  const blockDialogue = {
    utterances: [
      { turn_num: 1, speaker: "田中", utterance: "もちろんです。" },
      { turn_num: 2, speaker: "佐藤", utterance: "コンビニで買います。" },
      { turn_num: 3, speaker: "田中", utterance: "パスポートを見せます。" },
    ],
  };
  const anyText = /./; // cô lập phép đếm union, không lẫn logic khớp từ khoá
  const span2 = bestQualifyingSpan(blockDialogue, tokenizer, known, 2, anyText);
  const okReject3rd = !!span2 && span2.len === 2;
  console.log(
    `  ${okReject3rd ? "OK  " : "FAIL"} ngưỡng≤2, 3 lượt (mỗi lượt 1 từ lạ RIÊNG) -> đoạn dài nhất = ${span2?.len ?? 0} lượt` +
      ` [${span2?.unk.join(", ") ?? ""}] (phải DỪNG ở 2, không nhận lượt 3 dù riêng lượt 3 chỉ có 1 từ lạ)`,
  );
  if (!okReject3rd) allOk = false;

  const span3 = bestQualifyingSpan(blockDialogue, tokenizer, known, 3, anyText);
  const okAccept3 = !!span3 && span3.len === 3 && span3.unk.length === 3;
  console.log(
    `  ${okAccept3 ? "OK  " : "FAIL"} ngưỡng≤3, cùng 3 lượt -> đoạn dài nhất = ${span3?.len ?? 0} lượt` +
      ` [${span3?.unk.join(", ") ?? ""}] (phải nhận đủ cả 3, union đúng 3 từ lạ)`,
  );
  if (!okAccept3) allOk = false;

  // Ngưỡng ≤4 (G14-R5, owner chốt 2026-08-02) — nối thêm lượt 4, MỖI lượt vẫn
  // 1 từ lạ RIÊNG (khác cả 4). ≤3 phải TỪ CHỐI lượt 4 (dừng ở 3, giống hệt
  // test ngay trên); ≤4 phải NHẬN đủ cả 4. Đây là phép đối chứng "1 PASS ở
  // ≤4 nhưng FAIL ở ≤3" mà owner yêu cầu khi nâng ngưỡng.
  const blockDialogue4 = {
    utterances: [
      ...blockDialogue.utterances,
      { turn_num: 4, speaker: "佐藤", utterance: "新幹線で行きます。" },
    ],
  };
  const span3of4 = bestQualifyingSpan(blockDialogue4, tokenizer, known, 3, anyText);
  const okReject4th = !!span3of4 && span3of4.len === 3;
  console.log(
    `  ${okReject4th ? "OK  " : "FAIL"} ngưỡng≤3, 4 lượt (mỗi lượt 1 từ lạ RIÊNG) -> đoạn dài nhất = ${span3of4?.len ?? 0} lượt` +
      ` [${span3of4?.unk.join(", ") ?? ""}] (phải DỪNG ở 3, từ chối lượt 4 — ca FAIL đối chứng cho ngưỡng ≤4 bên dưới)`,
  );
  if (!okReject4th) allOk = false;

  const span4 = bestQualifyingSpan(blockDialogue4, tokenizer, known, 4, anyText);
  const okAccept4 = !!span4 && span4.len === 4 && span4.unk.length === 4;
  console.log(
    `  ${okAccept4 ? "OK  " : "FAIL"} ngưỡng≤4, cùng 4 lượt -> đoạn dài nhất = ${span4?.len ?? 0} lượt` +
      ` [${span4?.unk.join(", ") ?? ""}] (phải nhận đủ cả 4, union đúng 4 từ lạ — ca PASS nhờ nâng ngưỡng)`,
  );
  if (!okAccept4) allOk = false;

  // đối chứng khử trùng lặp: 2 lượt CÙNG NHẮC một từ lạ phải tính là 1, không phải 2.
  const dupDialogue = {
    utterances: [
      { turn_num: 1, speaker: "田中", utterance: "もちろんです。" },
      { turn_num: 2, speaker: "佐藤", utterance: "もちろん、いいですよ。" },
    ],
  };
  const spanDup = bestQualifyingSpan(dupDialogue, tokenizer, known, 1, anyText);
  const okDedupe = !!spanDup && spanDup.len === 2 && spanDup.unk.length === 1;
  console.log(
    `  ${okDedupe ? "OK  " : "FAIL"} 2 lượt cùng nhắc "もちろん", ngưỡng≤1 -> union = [${spanDup?.unk.join(", ") ?? ""}]` +
      ` (phải khử trùng lặp còn 1, không phải 2 — nếu không cả đoạn sẽ bị từ chối oan)`,
  );
  if (!okDedupe) allOk = false;

  console.log(
    allOk
      ? "  => PHÁ THẬT MỨC KHỐI: union đúng, khử trùng lặp đúng, bắt đúng ca đếm-theo-lượt sẽ bỏ sót."
      : "  => CÓ CA SAI Ở MỨC KHỐI, xem lại.",
  );
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
    console.log(`   MỚI-THEO-LƯỢT (token thật, kèm kana): 0 lạ=${newClean}  dư1-2=${newOne2}  dư>2=${newMany}`);
    console.log("   (số theo-lượt ở trên KHÔNG dùng để quyết định khối — xem báo cáo MỨC KHỐI bên dưới, owner chốt 2026-07-31)");
    console.log("");
  }

  // Chủ đề đã cần báo cáo MỨC KHỐI thật (không phải mọi PROBES — chỉ bài
  // đang đo trong lượt build hiện tại). Danh sách nối dần từng bài, không
  // xoá bài cũ (owner đối chiếu lại được số cũ bất cứ lúc nào).
  const BLOCK_LEVEL_TOPICS = [
    { label: "m02-u1-l1 · Cảm ơn theo mức độ", keyword: /ありがとう|どうも|恐れ入り|恐縮|助かり|感謝/ },
    { label: "m02-u1-l2 · Đáp khi được cảm ơn", keyword: /どういたしまして|こちらこそ|お役に立て|とんでもな|いえいえ/ },
  ];
  for (const { label, keyword } of BLOCK_LEVEL_TOPICS) {
    await blockLevelReport(tokenizer, known, dialogues, label, keyword);
  }
}

/**
 * Báo cáo MỨC KHỐI, tổng quát cho MỌI chủ đề (owner chốt 2026-07-31 cho cơ
 * chế; tổng quát hoá 2026-08-02 khi build m02-u1-l2 — bản trước hoá cứng
 * riêng cho m02-u1-l1, không gọi lại được cho bài khác). Với MỖI hội thoại
 * khớp `keywordRe`, tìm đoạn liên tiếp dài nhất mà UNION từ lạ (khử trùng
 * lặp) không vượt ngưỡng, cho cả ba ngưỡng ≤2, ≤3 và ≤4 (≤4 thêm 2026-08-02,
 * G14-R5 — ngưỡng LÀM VIỆC hiện tại; ≤2/≤3 giữ lại để owner thấy đánh đổi
 * giữa các mức). In histogram độ dài đoạn tốt nhất mỗi hội thoại + đúc kết
 * theo 3 cỡ khối (cặp/khối 3-4/đoạn ≥4) mà B4 cần.
 */
async function blockLevelReport(tokenizer, known, dialogues, label, keywordRe) {
  const hit = dialogues.filter((d) => d.utterances.some((u) => keywordRe.test(u.utterance)));

  console.log(`══ MỨC KHỐI (union, khử trùng lặp) — ${label}`);
  console.log(`   hội thoại có từ khoá chủ đề (đã lọc ten-lech-nhan.json): ${hit.length} / ${dialogues.length}`);
  console.log("");

  for (const threshold of [2, 3, 4]) {
    const histogram = {};
    const examples = {};
    for (const d of hit) {
      const best = bestQualifyingSpan(d, tokenizer, known, threshold, keywordRe);
      const len = best ? best.len : 0;
      histogram[len] = (histogram[len] ?? 0) + 1;
      if (best && !examples[len]) examples[len] = { file: d._file, dialogue_id: d.dialogue_id, best };
    }
    const total = hit.length;
    const lens = Object.keys(histogram).map(Number).sort((a, b) => a - b);
    console.log(`  ── ngưỡng ≤${threshold} từ lạ DUY NHẤT trên cả đoạn ──`);
    console.log(`     phân bố đoạn tốt nhất mỗi hội thoại: ${lens.map((l) => `${l}=${histogram[l]}`).join("  ")}`);

    const dialoguesWithPair = lens.filter((l) => l >= 2).reduce((a, l) => a + histogram[l], 0);
    const dialoguesWithBlock34 = lens.filter((l) => l >= 3).reduce((a, l) => a + histogram[l], 0);
    const dialoguesWithRun4 = lens.filter((l) => l >= 4).reduce((a, l) => a + histogram[l], 0);
    console.log(`     cặp 2 lượt (đoạn tốt nhất ≥2)      : ${dialoguesWithPair} hội thoại`);
    console.log(`     khối 3-4 lượt (đoạn tốt nhất ≥3)    : ${dialoguesWithBlock34} hội thoại`);
    console.log(`     đoạn ≥4 lượt liên tiếp — Q14 (≥4)   : ${dialoguesWithRun4} hội thoại`);
    if (examples[4]) {
      const e = examples[4];
      console.log(`     ví dụ đoạn=4 (${e.file}:${e.dialogue_id}, lượt ${e.best.start + 1}-${e.best.end + 1}, union=[${e.best.unk.join(", ")}])`);
    }
    console.log("");
  }
}

const isMain = path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url);
if (isMain) main();
