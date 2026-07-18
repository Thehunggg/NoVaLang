#!/usr/bin/env node
// lesson-check <lang> (--lesson <id> | --all | --self-test) [--file <path>] [--verbose]
//
// Chạy các *.rules.json.checks (regex_absent / regex_present / custom) của
// một ngôn ngữ lên một bài học JSON THẬT (đã generate) — thứ mà
// tools/validate.mjs KHÔNG làm (validate.mjs chỉ kiểm hạ tầng rule, không
// đụng vào nội dung bài học). Đây là công cụ dùng cho phép thử "rule ja có
// khớp Golden Lesson không" và mọi phép thử tương tự sau này cho ngôn ngữ
// khác — CHỈ ĐỌC, không sửa lesson JSON, không sửa shared/.
//
// Mặc định đọc shared/generated/lessons.json (generated output — chỉ đọc,
// không hand-edit theo AGENTS.md). Có thể trỏ --file sang file khác (vd một
// bản lesson JSON độc lập khi debug).
import { join, readJson, existsSync } from './lib/util.mjs';
import { rulesFilesFor, writingSystemFor } from './lib/resolve-config.mjs';
import { extractTargetStrings, hasScriptHeuristic } from './lib/target-text.mjs';
import { CUSTOM_CHECKS } from './lib/custom-checks.mjs';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');

function usage() {
  console.error('usage: node tools/lesson-check.mjs <lang> (--lesson <id> | --all | --self-test) [--file <path>] [--verbose]');
  process.exit(2);
}

const args = process.argv.slice(2);
const lang = args[0];
if (!lang || lang.startsWith('--')) usage();
const lessonIdIdx = args.indexOf('--lesson');
const lessonId = lessonIdIdx !== -1 ? args[lessonIdIdx + 1] : null;
const all = args.includes('--all');
const selfTest = args.includes('--self-test');
const fileIdx = args.indexOf('--file');
const filePath = fileIdx !== -1 ? args[fileIdx + 1] : join(ROOT, 'shared', 'generated', 'lessons.json');
const verbose = args.includes('--verbose');
if (!lessonId && !all && !selfTest) usage();

if (selfTest) {
  // Chạy impl custom-check trong tools/lib/custom-checks.mjs lên đúng
  // fixtures.pass/fail khai báo NGAY TRONG rules.json của chính check đó —
  // fixture pass phải cho 0 vi phạm, mỗi fixture fail phải tự nó là 1 vi
  // phạm khi đứng riêng. Đây là bằng chứng impl khớp ví dụ đã khai, khác với
  // validate.mjs (chỉ đếm fixtures tồn tại, không chạy impl).
  const ruleFiles = rulesFilesFor(RULES, lang).map((p) => readJson(p)).filter((j) => Array.isArray(j.checks) && j.checks.length);
  let anyFail = false;
  console.log(`\n=== lesson-check --self-test: ${lang} — chạy custom-check impl lên fixtures của chính nó ===`);
  for (const rf of ruleFiles) {
    for (const check of rf.checks) {
      if ((check.assert || {}).type !== 'custom') continue;
      const impl = CUSTOM_CHECKS[check.id];
      const key = `${rf.id} :: ${check.id}`;
      if (!impl) { console.log(`\n[SKIPPED] ${key} — chưa có impl`); continue; }
      const fx = check.fixtures || {};
      let ok = true;
      const badPass = [];
      for (const text of fx.pass || []) {
        const { violations } = impl(null, [{ path: '$.fixture.pass', text }], check);
        if (violations.length) { ok = false; badPass.push(text); }
      }
      const badFail = [];
      for (const text of fx.fail || []) {
        const { violations } = impl(null, [{ path: '$.fixture.fail', text }], check);
        if (!violations.length) { ok = false; badFail.push(text); }
      }
      if (!ok) anyFail = true;
      console.log(`\n[${ok ? 'PASS' : 'FAIL'}] ${key} (self-test: ${(fx.pass || []).length} fixture pass, ${(fx.fail || []).length} fixture fail)`);
      for (const t of badPass) console.log(`   fixture PASS nhưng impl báo vi phạm: ${JSON.stringify(t)}`);
      for (const t of badFail) console.log(`   fixture FAIL nhưng impl không báo vi phạm: ${JSON.stringify(t)}`);
    }
  }
  console.log(`\n${anyFail ? 'FAIL' : 'PASS'} (self-test)`);
  process.exit(anyFail ? 1 : 0);
}

if (!existsSync(filePath)) { console.error(`Không tìm thấy file lesson: ${filePath}`); process.exit(2); }
const data = readJson(filePath);
const allLessons = Array.isArray(data.lessons) ? data.lessons : Array.isArray(data) ? data : [];
if (!allLessons.length) { console.error(`File ${filePath} không có mảng lessons nào đọc được.`); process.exit(2); }

let targetLessons;
if (lessonId) {
  const found = allLessons.find((l) => l.id === lessonId);
  if (!found) { console.error(`Không tìm thấy lesson id='${lessonId}' trong ${filePath}`); process.exit(2); }
  targetLessons = [found];
} else {
  targetLessons = allLessons.filter((l) => l.languageCode === lang);
  if (!targetLessons.length) { console.error(`Không có lesson nào languageCode='${lang}' trong ${filePath}`); process.exit(2); }
}

const ws = writingSystemFor(RULES, lang);
if (!ws) console.error(`(cảnh báo) không tìm thấy writingSystem cho '${lang}' trong catalog.json — trích chuỗi target-language có thể không chính xác`);
if (!hasScriptHeuristic(ws)) {
  console.error(`(cảnh báo) chưa có script-range heuristic cho writingSystem='${ws}' — dùng fallback theo tên trường (kém chính xác hơn, xem tools/lib/target-text.mjs)`);
}

const ruleFiles = rulesFilesFor(RULES, lang).map((p) => readJson(p)).filter((j) => Array.isArray(j.checks) && j.checks.length);

console.log(`\n=== lesson-check: ${lang} (writingSystem=${ws || '?'}) — ${targetLessons.length} bài, ${ruleFiles.length} file rule có checks ===`);

let anyFail = false;
// Rollup: checkKey -> { pass, fail, skip, examples: [] }
const rollup = new Map();

for (const lesson of targetLessons) {
  const strings = extractTargetStrings(lesson, ws);
  if (verbose || targetLessons.length === 1) {
    console.log(`\n-- ${lesson.id} — ${strings.length} chuỗi target-language trích được --`);
  }
  for (const rf of ruleFiles) {
    for (const check of rf.checks) {
      const key = `${rf.id} :: ${check.id}`;
      if (!rollup.has(key)) rollup.set(key, { pass: 0, fail: 0, skip: 0, violations: [] });
      const bucket = rollup.get(key);
      const a = check.assert || {};
      if (a.type === 'regex_absent' || a.type === 'regex_present') {
        const re = new RegExp(a.pattern);
        const viol = strings.filter(({ text }) => (a.type === 'regex_absent' ? re.test(text) : !re.test(text)));
        if (viol.length) { bucket.fail++; bucket.violations.push(...viol.map((v) => ({ lesson: lesson.id, ...v }))); }
        else bucket.pass++;
      } else if (a.type === 'custom') {
        const impl = CUSTOM_CHECKS[check.id];
        if (!impl) { bucket.skip++; continue; }
        const result = impl(lesson, strings, check);
        if (result.violations.length) { bucket.fail++; bucket.violations.push(...result.violations.map((v) => ({ lesson: lesson.id, ...v }))); }
        else bucket.pass++;
      } else {
        bucket.skip++;
      }
    }
  }
}

for (const rf of ruleFiles) {
  for (const check of rf.checks) {
    const key = `${rf.id} :: ${check.id}`;
    const b = rollup.get(key);
    const status = b.fail > 0 ? 'FAIL' : b.skip > 0 && b.pass === 0 ? 'SKIPPED (chưa có custom-check impl)' : 'PASS';
    if (b.fail > 0) anyFail = true;
    console.log(`\n[${status}] ${key}`);
    console.log(`   ${check.description || ''}`);
    if (b.violations.length) {
      console.log(`   ${b.violations.length} vi phạm, vd:`);
      for (const v of b.violations.slice(0, 5)) console.log(`     - ${v.lesson} ${v.path}: ${JSON.stringify(v.text ?? v.detail)}`);
      if (b.violations.length > 5) console.log(`     ... còn ${b.violations.length - 5} nữa`);
    }
  }
}

console.log(`\n${anyFail ? 'FAIL' : 'PASS'} — ${targetLessons.length} bài, ${ruleFiles.reduce((n, r) => n + r.checks.length, 0)} lượt check/bài`);
process.exit(anyFail ? 1 : 0);
