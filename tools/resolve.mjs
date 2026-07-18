#!/usr/bin/env node
// resolve <lang> [--effective]
// In ra config đã merge theo thứ tự _base -> _script/<writingSystem> -> languages/<lang>.
import { join } from './lib/util.mjs';
import { resolveLanguage } from './lib/resolve-config.mjs';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');

const lang = process.argv[2];
const effective = process.argv.includes('--effective');
if (!lang) {
  console.error('usage: node tools/resolve.mjs <lang> [--effective]');
  process.exit(2);
}

const { writingSystem, layers, effectiveConfig } = resolveLanguage(RULES, lang);

if (effective) {
  console.log(JSON.stringify({
    language: lang,
    writingSystem,
    layers: layers.map(([n, c]) => ({ layer: n, ids: Object.keys(c) })),
    effectiveConfig,
  }, null, 2));
} else {
  console.log(`Language: ${lang}  writingSystem: ${writingSystem || '(unknown)'}`);
  for (const [n, c] of layers) {
    console.log(`  layer ${n}: ${Object.keys(c).join(', ') || '(empty)'}`);
  }
}
