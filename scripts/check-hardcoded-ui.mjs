#!/usr/bin/env node
// check-hardcoded-ui.mjs — WARN-MODE detector for hard-coded user-facing UI
// strings that bypass the i18n system (web `t(...)` / Flutter `L10n.text(...)`).
//
// ─────────────────────────────────────────────────────────────────────────
// MODE: WARN / REPORT ONLY. This script ALWAYS exits 0. It never fails a
// build. It exists to LIST hard-coded UI strings so the debt can be tracked.
//
// WHY WARN (not error) FOR NOW: the React web app still has widespread
// hard-coded UI (PracticePage results/intro, AchievementBadge, LessonPage
// inline text, NativeLanguageSelector, raw enum labels, `⟦missing:…⟧`
// sentinels). Turning this into a hard failure today would flood the build
// with red. See docs/ai/ACTIVE_TASK.md — the web i18n cleanup is assigned to
// Codex (needs an env where `frontend/node_modules` is installed to build).
//
// REMINDER FOR CODEX / whoever finishes the web i18n pass:
//   → After the web hard-coded strings are cleaned up, FLIP THIS TO ERROR
//     MODE for web: set STRICT_WEB = true below (and/or make CI run this and
//     fail on web findings). Keep mobile in whichever mode matches its state.
//
// This is a heuristic line scanner (no full TS/Dart parse), so expect some
// false positives — it is a tracking aid, not a precise linter. Target-
// language learning content (files under data/ dirs, *content*.mjs, JSON) is
// intentionally NOT scanned: e.g. Japanese vocabulary being taught is not UI
// chrome.
// ─────────────────────────────────────────────────────────────────────────
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// When the web i18n cleanup is done, set this true so a future CI wrapper can
// treat web findings as an error. This script itself still exits 0; flipping
// the switch is a signal + lets a CI job decide. (Kept here so the decision
// lives next to the reminder above.)
const STRICT_WEB = false;
const STRICT_MOBILE = false;

const WEB_DIR = path.join(ROOT, "frontend", "src");
const MOBILE_DIR = path.join(ROOT, "mobile", "novalang_flutter", "lib");

// Directories/paths whose literals are target content, data, or generated —
// not UI chrome. Skipped entirely.
const SKIP_PATH = /(^|\/)(data|generated|test|assets)(\/|$)|\.g\.dart$|content\.mjs$/;

const hasLetter = (s) => /[A-Za-zÀ-ỹ぀-ヿ㐀-鿿가-힯]/.test(s);
// Obvious non-UI or safe literals to ignore.
const SAFE = [
  /^NovaLang$/i, /^Nova$/i, /^Lang$/i,
  /^[\s\d.,:/%+\-–—·|()#*]+$/,      // punctuation/numbers only
  /^\$?\{?[a-zA-Z0-9_.]+\}?$/,      // a bare identifier / interpolation
];
const isSafe = (s) => {
  const t = s.trim();
  if (t.length < 2 || !hasLetter(t)) return true;
  return SAFE.some((re) => re.test(t));
};

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
    if (SKIP_PATH.test(`/${rel}`)) continue;
    if (e.isDirectory()) out.push(...(await walk(full, exts)));
    else if (exts.some((x) => e.name.endsWith(x))) out.push(full);
  }
  return out;
}

// ── Web (.tsx): JSX text nodes + a few user-facing attributes ──────────────
function scanWebLine(line) {
  const hits = [];
  if (/^\s*(import|\/\/|\*)/.test(line)) return hits;
  // Attribute literals that render to users.
  for (const m of line.matchAll(/\b(placeholder|aria-label|alt|title)\s*=\s*"([^"]+)"/g)) {
    if (!isSafe(m[2])) hits.push(`${m[1]}="${m[2]}"`);
  }
  // JSX text nodes: > words < (no braces/tags inside).
  for (const m of line.matchAll(/>\s*([^<>{}]*?[A-Za-zÀ-ỹ぀-鿿][^<>{}]*?)\s*</g)) {
    const text = m[1].trim();
    if (!isSafe(text) && /[A-Za-zÀ-ỹ぀-鿿].*[A-Za-zÀ-ỹ぀-鿿 ]/.test(text)) {
      hits.push(`JSX: ${text.length > 60 ? text.slice(0, 57) + "…" : text}`);
    }
  }
  return hits;
}

// ── Mobile (.dart): Text('literal') / hintText/labelText/title: 'literal' ──
function scanDartLine(line) {
  const hits = [];
  if (/^\s*(import|\/\/|\*)/.test(line)) return hits;
  if (/L10n\.text|MobileUiStrings|kDebugMode/.test(line)) return hits;
  // Text('...') or Text("...") with a string literal first arg.
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
  console.log("check-hardcoded-ui — WARN MODE (report only, always exits 0).");
  console.log("Heuristic scan; some false positives expected. See script header +");
  console.log("docs/ai/ACTIVE_TASK.md (web i18n cleanup → Codex, then flip to error).");

  const web = await scan(WEB_DIR, [".tsx"], scanWebLine);
  const mobile = await scan(MOBILE_DIR, [".dart"], scanDartLine);

  const webCount = report("WEB (React, frontend/src)", web, STRICT_WEB);
  const mobileCount = report("MOBILE (Flutter, lib/)", mobile, STRICT_MOBILE);

  console.log(`\n──────── TOTAL: ${webCount + mobileCount} possible hard-coded UI string(s) (web ${webCount}, mobile ${mobileCount}) ────────`);
  console.log("WARN MODE: not failing the build. Flip STRICT_WEB=true after Codex finishes the web i18n pass.");
  // Always succeed — warn mode.
  process.exit(0);
}

main().catch((error) => {
  // Even on internal error, do not fail a build in warn mode.
  console.warn(`check-hardcoded-ui: internal error (ignored in warn mode): ${error.message}`);
  process.exit(0);
});
