#!/usr/bin/env node
// resolve <lang> [--effective]
// In ra config đã merge theo thứ tự _base -> _script/<writingSystem> -> languages/<lang>.
import { join, walk, readJson, existsSync } from './lib/util.mjs';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');

function layerConfigs(dir) {
  const map = {};
  if (!existsSync(dir)) return map;
  for (const p of walk(dir).filter((f) => f.endsWith('.rules.json'))) {
    let j;
    try { j = readJson(p); } catch { continue; }
    if (j && j.config) map[j.id || p] = j.config;
  }
  return map;
}

function deepMerge(a, b) {
  if (Array.isArray(b)) return b.slice();
  if (b && typeof b === 'object') {
    const out = a && typeof a === 'object' && !Array.isArray(a) ? { ...a } : {};
    for (const k of Object.keys(b)) out[k] = deepMerge(out[k], b[k]);
    return out;
  }
  return b;
}

function writingSystemFor(lang) {
  const cat = join(RULES, 'catalog.json');
  if (!existsSync(cat)) return null;
  const e = (readJson(cat).languages || []).find((l) => l.code === lang);
  return e ? e.writingSystem : null;
}

const lang = process.argv[2];
const effective = process.argv.includes('--effective');
if (!lang) {
  console.error('usage: node tools/resolve.mjs <lang> [--effective]');
  process.exit(2);
}

const ws = writingSystemFor(lang);
const layers = [
  ['_base', layerConfigs(join(RULES, '_base'))],
  [ws ? `_script/${ws}` : '_script/(none)', ws ? layerConfigs(join(RULES, '_script', ws)) : {}],
  [`languages/${lang}`, layerConfigs(join(RULES, 'languages', lang))],
];

const merged = {};
for (const [, cfgs] of layers) {
  for (const [id, cfg] of Object.entries(cfgs)) merged[id] = deepMerge(merged[id], cfg);
}

if (effective) {
  console.log(JSON.stringify({
    language: lang,
    writingSystem: ws,
    layers: layers.map(([n, c]) => ({ layer: n, ids: Object.keys(c) })),
    effectiveConfig: merged,
  }, null, 2));
} else {
  console.log(`Language: ${lang}  writingSystem: ${ws || '(unknown)'}`);
  for (const [n, c] of layers) {
    console.log(`  layer ${n}: ${Object.keys(c).join(', ') || '(empty)'}`);
  }
}
