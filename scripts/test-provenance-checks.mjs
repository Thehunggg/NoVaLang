#!/usr/bin/env node
// Tự-test cho R12 (a/b/c) + R9 blocklist trong verify-provenance.mjs.
// Mỗi phép kiểm: ÍT NHẤT 1 ca PASS + 1 ca FAIL, chạy trên dữ liệu THẬT.
// Dùng: node scripts/test-provenance-checks.mjs

import {
  normalize, blockedEntry,
  loadJmdictIndex, checkReadingAgainstJmdict,
  checkMutation, checkExampleMatchesPattern,
} from "./verify-provenance.mjs";

let pass = 0;
let fail = 0;
const t = (name, got, want) => {
  const ok = got === want;
  ok ? (pass += 1) : (fail += 1);
  console.log(`  ${ok ? "OK  " : "SAI "} ${name}`);
  if (!ok) console.log(`         mong: ${want} · nhận: ${got}`);
};

console.log("=== R9 · BLOCKLIST ===");
t("FAIL: nguồn n5 OCR 23% bị chặn",
  Boolean(blockedEntry("local-sources/ja/n5/n5_bai-tap-tieng-Nhat-so-cap-1.md")), true);
t("PASS: Irodori KHÔNG bị chặn",
  Boolean(blockedEntry("local-sources/ja/irodori/markdown/IRODORI_So_cap_1_A2.md")), false);

console.log("");
console.log("=== R12a · FURIGANA đối chiếu JMdict ===");
const idx = loadJmdictIndex();
if (!idx) {
  console.log("  BỎ QUA — không mở được JMdict");
} else {
  console.log(`  (đã nạp ${idx.size} khoá tra)`);
  t("PASS: 元気 → げんき (đúng)",
    checkReadingAgainstJmdict("元気", "げんき", idx).verdict, "PASS");
  t("FAIL: 元気 → もとき (sai)",
    checkReadingAgainstJmdict("元気", "もとき", idx).verdict, "FAIL");
  t("FLAG: 何 → なん (đa-âm, cần mắt người)",
    checkReadingAgainstJmdict("何", "なん", idx).verdict, "FLAG");
  t("SKIP: từ không có trong JMdict",
    checkReadingAgainstJmdict("ゑゐ絋", "あいう", idx).verdict, "SKIP");
}

console.log("");
console.log("=== R12b · KIỂM MUTATION ===");
const corpus = new Set(["わたしはがくせいです。", "おなまえはなんですか。"].map(normalize));
t("PASS: particle_swap は→が (đổi đúng 1 vị trí, đúng bộ trợ từ)",
  checkMutation({ from: "わたしはがくせいです。", op: "particle_swap" }, "わたしががくせいです。", corpus).ok, true);
t("FAIL: particle_swap đổi chữ KHÔNG phải trợ từ",
  checkMutation({ from: "わたしはがくせいです。", op: "particle_swap" }, "わたしはがくせいでした", corpus).ok, false);
t("FAIL: from KHÔNG có trong bài",
  checkMutation({ from: "そんなぶんはない。", op: "particle_swap" }, "そんなぶんもない。", corpus).ok, false);
t("FAIL: text TRÙNG from",
  checkMutation({ from: "わたしはがくせいです。", op: "particle_swap" }, "わたしはがくせいです。", corpus).ok, false);
t("FAIL: op ngoài whitelist",
  checkMutation({ from: "わたしはがくせいです。", op: "bịa_ra" }, "わたしががくせいです。", corpus).ok, false);
t("PASS: particle_dup thêm đúng 1 trợ từ",
  checkMutation({ from: "わたしはがくせいです。", op: "particle_dup" }, "わたしははがくせいです。", corpus).ok, true);

console.log("");
console.log("=== R12c · VÍ DỤ ĐÚNG MẪU ===");
t("PASS: ví dụ chứa chuỗi bề mặt của mẫu",
  checkExampleMatchesPattern("かんがえてから、いってください。", ["てから"]).ok, true);
t("FAIL: ví dụ KHÔNG chứa mẫu nào",
  checkExampleMatchesPattern("わたしはがくせいです。", ["てから"]).ok, false);
t("PASS: khớp qua biến thể thứ hai đã khai",
  checkExampleMatchesPattern("あのひとはゆうめいになりました。", ["になる", "になりまし"]).ok, true);

console.log("");
console.log(`TỔNG — OK ${pass} · SAI ${fail}`);
process.exit(fail > 0 ? 1 : 0);
