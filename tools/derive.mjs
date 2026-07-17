#!/usr/bin/env node
// Derivation runner (Bước 2). Hai lượt derive ĐỘC LẬP do subagent chạy — mỗi lượt
// CHỈ đọc MỘT nguồn — được lưu thành 2 file JSON; công cụ này DIFF chúng.
//   - Trùng nhau  -> confidence: medium, derived_by: ai-cross-checked
//   - Lệch nhau   -> đưa đúng điểm lệch vào hàng đợi review (Bước 4)
//
//   node tools/derive.mjs queue <lang>              # liệt kê hiện tượng confidence:none
//   node tools/derive.mjs diff <passA.json> <passB.json> [--out review.json]
//
// Định dạng mỗi pass: { "<phenomenonId>": { "claim": <giá trị máy so được>, "note": "..." }, ... }
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');
const argv = process.argv.slice(2);
const cmd = argv[0];
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };

function queue(lang) {
  const cov = join(RULES, 'languages', lang, 'coverage.json');
  if (!existsSync(cov)) { console.error(`không có ${cov}`); process.exit(2); }
  const c = readJson(cov);
  const out = [];
  for (const [pid, ph] of Object.entries(c)) {
    if (pid === '_meta') continue;
    for (const lvl of ['rule_level', 'lexical_level']) {
      if (ph[lvl] && ph[lvl].confidence === 'none') out.push(`${pid} · ${lvl}`);
    }
  }
  console.log(`Hàng chờ derive cho ${lang} (confidence:none):`);
  for (const o of out) console.log('  - ' + o);
  console.log(`Tổng: ${out.length}`);
}

function stable(v) { return JSON.stringify(v); }

function diff(aPath, bPath) {
  const A = readJson(aPath);
  const B = readJson(bPath);
  const keys = [...new Set([...Object.keys(A), ...Object.keys(B)])].sort();
  const agree = [];
  const conflict = [];
  const onlyOne = [];
  for (const k of keys) {
    const a = A[k];
    const b = B[k];
    if (a === undefined || b === undefined) { onlyOne.push({ phenomenon: k, a: a ?? null, b: b ?? null }); continue; }
    if (stable(a.claim) === stable(b.claim)) agree.push({ phenomenon: k, claim: a.claim, confidence: 'medium', derived_by: 'ai-cross-checked' });
    else conflict.push({ phenomenon: k, sourceA: a, sourceB: b, action: 'review' });
  }
  const review = { generatedAt: new Date().toISOString(), agree, conflict, onlyOne };
  const outPath = opt('--out');
  if (outPath) { writeFileSync(outPath, JSON.stringify(review, null, 2) + '\n'); console.log(`review -> ${outPath}`); }
  console.log(`Trùng (medium): ${agree.length} · Lệch (review): ${conflict.length} · Chỉ 1 nguồn: ${onlyOne.length}`);
  for (const c of conflict) console.log(`  ⚠ ${c.phenomenon}: A=${stable(c.sourceA.claim)} vs B=${stable(c.sourceB.claim)}`);
}

if (cmd === 'queue') queue(argv[1]);
else if (cmd === 'diff') diff(argv[1], argv[2]);
else { console.error('usage: derive.mjs <queue <lang> | diff <A.json> <B.json> [--out review.json]>'); process.exit(2); }
