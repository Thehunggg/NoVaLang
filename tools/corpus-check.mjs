#!/usr/bin/env node
// Corpus check (Bước 3). Chạy các assert dạng văn bản của rule lên corpus thật.
// Rule bị vi phạm hàng loạt trên văn bản thật = rule SAI, không phải văn bản sai.
//
//   node tools/corpus-check.mjs <corpusFile> <rulesJson|langDir> [--sample 5]
//
// Hỗ trợ assert dạng text trong checks[].assert:
//   { "type": "charset",       "allow": "<chuỗi/án cho phép>" }   # mọi ký tự phải thuộc allow
//   { "type": "regex_absent",  "pattern": "..." }                 # dòng KHÔNG được khớp
//   { "type": "regex_present", "pattern": "..." }                 # dòng PHẢI khớp
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const corpusPath = argv[0];
const target = argv[1];
const sampleN = Number((argv.indexOf('--sample') >= 0 ? argv[argv.indexOf('--sample') + 1 : ''] : '') || 5);

if (!corpusPath || !target) { console.error('usage: node tools/corpus-check.mjs <corpusFile> <rulesJson|langDir> [--sample N]'); process.exit(2); }
if (!existsSync(corpusPath)) { console.error(`corpus không tồn tại: ${corpusPath}`); process.exit(2); }

function collectRules(t) {
  const out = [];
  const add = (p) => { try { out.push(JSON.parse(readFileSync(p, 'utf8'))); } catch {} };
  if (statSync(t).isDirectory()) {
    for (const f of readdirSync(t)) if (f.endsWith('.rules.json')) add(join(t, f));
  } else add(t);
  return out;
}

function charsetAllowSet(spec) {
  // "spec" đơn giản: chuỗi các ký tự cho phép (đã bỏ [ ] khoảng trắng). Đủ cho kiểm sơ bộ.
  return new Set([...spec.replace(/[\[\]\s]/g, '')]);
}

const lines = readFileSync(corpusPath, 'utf8').split(/\r?\n/).filter((l) => l.trim());
console.log(`Corpus: ${lines.length} dòng`);
if (lines.length < 2000) console.log('  ⚠ Dưới 2000 dòng — corpus check của ngôn ngữ này YẾU (ghi rõ ở báo cáo).');

let totalChecks = 0;
for (const rf of collectRules(target)) {
  for (const chk of rf.checks || []) {
    const a = chk.assert || {};
    if (!['charset', 'regex_absent', 'regex_present'].includes(a.type)) continue;
    totalChecks++;
    let violations = 0;
    const samples = [];
    let re = null;
    let allow = null;
    if (a.type === 'charset') allow = charsetAllowSet(a.allow || '');
    else re = new RegExp(a.pattern, 'u');
    for (const line of lines) {
      let bad = false;
      if (a.type === 'charset') { for (const ch of line) if (!allow.has(ch)) { bad = true; break; } }
      else if (a.type === 'regex_absent') bad = re.test(line);
      else if (a.type === 'regex_present') bad = !re.test(line);
      if (bad) { violations++; if (samples.length < sampleN) samples.push(line); }
    }
    const rate = ((violations / lines.length) * 100).toFixed(2);
    const verdict = violations / lines.length > 0.2 ? 'RULE NGHI NGỜ SAI (vi phạm hàng loạt)' : 'ok';
    console.log(`\n[${rf.id} · ${chk.id}] ${a.type} → vi phạm ${violations}/${lines.length} (${rate}%) — ${verdict}`);
    for (const s of samples) console.log('    · ' + s.slice(0, 80));
  }
}
if (totalChecks === 0) console.log('Không có assert dạng văn bản (charset/regex) để chạy trên corpus.');
