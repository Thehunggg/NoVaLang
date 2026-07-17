#!/usr/bin/env node
// G2P check (Bước 3, mục "đo tỷ lệ khớp với Wikipron"). Tái sử dụng cho mọi ngôn ngữ.
// Chạy các phép kiểm dạng "nếu chữ khớp regex G thì chuỗi âm phải khớp regex P"
// trên file TSV word<TAB>phones của WikiPron, và (tuỳ chọn) kiểm coverage charset.
//
//   node tools/g2p-check.mjs <tsv> [<tsv2> ...] \
//     --imply "<graphemeRegex>=><phoneRegex>" [--imply ...] \
//     [--charset-file <orthography.data.json>] [--sample N]
//
// Vi phạm hàng loạt (>20%) = RULE NGHI NGỜ SAI (giống corpus-check).
import { readFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const tsvs = [];
const implications = [];
let charsetFile = null;
let sampleN = 5;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--imply') implications.push(argv[++i]);
  else if (a === '--charset-file') charsetFile = argv[++i];
  else if (a === '--sample') sampleN = Number(argv[++i]) || 5;
  else tsvs.push(a);
}
if (!tsvs.length) { console.error('usage: g2p-check.mjs <tsv...> --imply "G=>P" [--charset-file f] [--sample N]'); process.exit(2); }

const pairs = [];
for (const t of tsvs) {
  for (const line of readFileSync(t, 'utf8').split(/\r?\n/)) {
    if (!line) continue;
    const [w, p] = line.split('\t');
    if (w && p) pairs.push([w, p]);
  }
}
console.log(`G2P entries: ${pairs.length} (từ ${tsvs.length} tsv)`);

for (const spec of implications) {
  const idx = spec.indexOf('=>');
  if (idx < 0) { console.error(`--imply sai định dạng (cần G=>P): ${spec}`); process.exit(2); }
  const G = new RegExp(spec.slice(0, idx), 'u');
  const P = new RegExp(spec.slice(idx + 2), 'u');
  let applicable = 0, violations = 0;
  const samples = [];
  for (const [w, p] of pairs) {
    if (!G.test(w)) continue;
    applicable++;
    if (!P.test(p)) { violations++; if (samples.length < sampleN) samples.push(`${w} → ${p}`); }
  }
  const rate = applicable ? ((violations / applicable) * 100).toFixed(2) : 'n/a';
  const verdict = applicable && violations / applicable > 0.2 ? 'RULE NGHI NGỜ SAI (vi phạm hàng loạt)' : 'ok';
  console.log(`\n[imply ${spec}] áp dụng ${applicable} · vi phạm ${violations} (${rate}%) — ${verdict}`);
  for (const s of samples) console.log('    · ' + s);
}

if (charsetFile) {
  const doc = JSON.parse(readFileSync(charsetFile, 'utf8'));
  const specs = [doc?.data?.exemplarCharacters, doc?.data?.auxiliary, doc?.data?.punctuation].filter(Boolean).join('');
  // Bỏ cú pháp UnicodeSet của CLDR ({...} cụm nhiều ký tự tách riêng, [ ] \ khoảng trắng, escape \uXXXX đã là ký tự thật trong JSON)
  const allow = new Set();
  for (const cluster of specs.match(/\{[^}]*\}/g) || []) for (const ch of cluster.replace(/[{}]/g, '')) allow.add(ch);
  for (const ch of specs.replace(/\{[^}]*\}/g, '').replace(/[\[\]\\\s-]/g, '')) allow.add(ch);
  let covered = 0, uncovered = 0;
  const badChars = new Map();
  for (const [w] of pairs) {
    let ok = true;
    for (const ch of w) if (!allow.has(ch)) { ok = false; badChars.set(ch, (badChars.get(ch) || 0) + 1); }
    if (ok) covered++; else uncovered++;
  }
  const rate = ((covered / pairs.length) * 100).toFixed(2);
  console.log(`\n[charset coverage] ${covered}/${pairs.length} từ nằm trọn trong charset (${rate}%)`);
  const top = [...badChars.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  if (top.length) console.log('  ký tự ngoài charset gặp nhiều nhất: ' + top.map(([c, n]) => `${c}(${n})`).join(' '));
}
