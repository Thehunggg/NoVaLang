#!/usr/bin/env node
// check-hardcoded-ui.mjs — detector for hard-coded user-facing UI strings that
// bypass the i18n system (web `t(...)` / Flutter `L10n.text(...)`).
//
// WEB: STRICT_WEB=true → exit 1 when web findings remain (hard gate).
// MOBILE: STRICT_MOBILE=false → warn-only until mobile cleanup lands.
//
// Heuristic line scanner (no full TS/Dart parse); some false positives still
// possible. Target-language learning content under data/ dirs is skipped.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const STRICT_WEB = true;
const STRICT_MOBILE = false;

const WEB_DIR = path.join(ROOT, "frontend", "src");
const MOBILE_DIR = path.join(ROOT, "mobile", "novalang_flutter", "lib");

const SKIP_PATH = /(^|\/)(data|generated|test|assets)(\/|$)|\.g\.dart$|content\.mjs$/;

const hasLetter = (s) => /[A-Za-zÀ-ỹ぀-ヿ㐀-鿿가-힯]/.test(s);
const SAFE = [
  /^NovaLang$/i, /^Nova$/i, /^Lang$/i,
  /^[\s\d.,:/%+\-–—·|()#*]+$/,
  /^\$?\{?[a-zA-Z0-9_.]+\}?$/,
];
const isSafe = (s) => {
  const t = s.trim();
  if (t.length < 2 || !hasLetter(t)) return true;
  return SAFE.some((re) => re.test(t));
};

/** Real UI copy vs ternary/JS crumbs between sibling JSX tags. */
function looksLikeUiText(text) {
  if (!/[A-Za-zÀ-ỹ鿿].*[A-Za-zÀ-ỹ鿿 ]/.test(text)) return false;
  if (/^[?:|&!=.()\[\]{};,\s]+/.test(text)) return false;
  if (/\b(useState|useEffect|===|!==)\b/.test(text)) return false;
  if (/^(null|undefined|true|false)\b/.test(text)) return false;
  if (/^\s*:\s*\w/.test(text)) return false; // ternary arm ": nextLesson ?"
  if (/\?\s*$/.test(text)) return false;
  return true;
}

async function walk(dir, exts) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full);
    if (SKIP_PATH.test(`/${rel.replace(/\\/g, "/")}`)) continue;
    if (e.isDirectory()) out.push(...(await walk(full, exts)));
    else if (exts.some((x) => e.name.endsWith(x))) out.push(full);
  }
  return out;
}

function scanWebLine(line) {
  const hits = [];
  if (/^\s*(import|\/\/|\*)/.test(line)) return hits;
  for (const m of line.matchAll(/\b(placeholder|aria-label|alt|title)\s*=\s*"([^"]+)"/g)) {
    if (!isSafe(m[2])) hits.push(`${m[1]}="${m[2]}"`);
  }
  for (const m of line.matchAll(/>\s*([^<>{}]*?[A-Za-zÀ-ỹ鿿][^<>{}]*?)\s*</g)) {
    const text = m[1].trim();
    if (!isSafe(text) && looksLikeUiText(text)) {
      hits.push(`JSX: ${text.length > 60 ? text.slice(0, 57) + "…" : text}`);
    }
  }
  return hits;
}

function scanDartLine(line) {
  const hits = [];
  if (/^\s*(import|\/\/|\*)/.test(line)) return hits;
  if (/L10n\.text|MobileUiStrings|kDebugMode/.test(line)) return hits;
  for (const m of line.matchAll(/\bText\(\s*(['"])(.+?)\1/g)) {
    if (!isSafe(m[2])) hits.push(`Text('${m[2].length > 50 ? m[2].slice(0, 47) + "…" : m[2]}')`);
  }
  for (const m of line.matchAll(/\b(hintText|labelText|title|tooltip)\s*:\s*(['"])(.+?)\2/g)) {
    if (!isSafe(m[3])) hits.push(`${m[1]}: '${m[3].length > 50 ? m[3].slice(0, 47) + "…" : m[3]}'`);
  }
  return hits;
}

async function scan(dir, exts, lineScanner) {
  const files = await walk(dir, exts);
  const findings = [];
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, i) => {
      for (const hit of lineScanner(line)) findings.push({ rel, line: i + 1, hit });
    });
  }
  return findings;
}

function report(label, findings, strict) {
  const byFile = new Map();
  for (const f of findings) {
    if (!byFile.has(f.rel)) byFile.set(f.rel, []);
    byFile.get(f.rel).push(f);
  }
  console.log(`\n=== ${label} — ${findings.length} possible hard-coded UI string(s) in ${byFile.size} file(s) [${strict ? "STRICT" : "WARN"}] ===`);
  const MAX_PER_FILE = 8;
  for (const [rel, list] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n  ${rel}  (${list.length})`);
    for (const f of list.slice(0, MAX_PER_FILE)) console.log(`    L${f.line}: ${f.hit}`);
    if (list.length > MAX_PER_FILE) console.log(`    … +${list.length - MAX_PER_FILE} more`);
  }
  return findings.length;
}

async function main() {
  console.log(
    `check-hardcoded-ui — web=${STRICT_WEB ? "STRICT" : "WARN"}, mobile=${STRICT_MOBILE ? "STRICT" : "WARN"}`,
  );

  const web = await scan(WEB_DIR, [".tsx"], scanWebLine);
  const mobile = await scan(MOBILE_DIR, [".dart"], scanDartLine);

  const webCount = report("WEB (React, frontend/src)", web, STRICT_WEB);
  const mobileCount = report("MOBILE (Flutter, lib/)", mobile, STRICT_MOBILE);

  console.log(`\n──────── TOTAL: ${webCount + mobileCount} possible hard-coded UI string(s) (web ${webCount}, mobile ${mobileCount}) ────────`);

  if (STRICT_WEB && webCount > 0) {
    console.error(`STRICT_WEB: failing with ${webCount} web finding(s).`);
    process.exit(1);
  }
  if (STRICT_MOBILE && mobileCount > 0) {
    console.error(`STRICT_MOBILE: failing with ${mobileCount} mobile finding(s).`);
    process.exit(1);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(`check-hardcoded-ui: ${error.message}`);
  process.exit(STRICT_WEB || STRICT_MOBILE ? 1 : 0);
});
