// Logic merge config _base -> _script/<writingSystem> -> languages/<lang>.
// Tách khỏi tools/resolve.mjs để tools/lesson-check.mjs dùng lại được (không
// lặp code merge riêng cho từng tool).
import { join, walk, readJson, existsSync } from './util.mjs';

export function layerConfigs(dir) {
  const map = {};
  if (!existsSync(dir)) return map;
  for (const p of walk(dir).filter((f) => f.endsWith('.rules.json'))) {
    let j;
    try { j = readJson(p); } catch { continue; }
    if (j && j.config) map[j.id || p] = j.config;
  }
  return map;
}

export function deepMerge(a, b) {
  if (Array.isArray(b)) return b.slice();
  if (b && typeof b === 'object') {
    const out = a && typeof a === 'object' && !Array.isArray(a) ? { ...a } : {};
    for (const k of Object.keys(b)) out[k] = deepMerge(out[k], b[k]);
    return out;
  }
  return b;
}

export function writingSystemFor(rulesDir, lang) {
  const cat = join(rulesDir, 'catalog.json');
  if (!existsSync(cat)) return null;
  const e = (readJson(cat).languages || []).find((l) => l.code === lang);
  return e ? e.writingSystem : null;
}

/** Trả về { writingSystem, layers: [[name, cfgMap], ...], effectiveConfig } */
export function resolveLanguage(rulesDir, lang) {
  const ws = writingSystemFor(rulesDir, lang);
  const layers = [
    ['_base', layerConfigs(join(rulesDir, '_base'))],
    [ws ? `_script/${ws}` : '_script/(none)', ws ? layerConfigs(join(rulesDir, '_script', ws)) : {}],
    [`languages/${lang}`, layerConfigs(join(rulesDir, 'languages', lang))],
  ];
  const effectiveConfig = {};
  for (const [, cfgs] of layers) {
    for (const [id, cfg] of Object.entries(cfgs)) effectiveConfig[id] = deepMerge(effectiveConfig[id], cfg);
  }
  return { writingSystem: ws, layers, effectiveConfig };
}

/** Trả về mọi *.rules.json (đường dẫn tuyệt đối) áp dụng cho 1 ngôn ngữ, theo đúng layer order. */
export function rulesFilesFor(rulesDir, lang) {
  const ws = writingSystemFor(rulesDir, lang);
  const dirs = [join(rulesDir, '_base'), ws ? join(rulesDir, '_script', ws) : null, join(rulesDir, 'languages', lang)];
  const out = [];
  for (const d of dirs) {
    if (!d || !existsSync(d)) continue;
    for (const p of walk(d).filter((f) => f.endsWith('.rules.json'))) out.push(p);
  }
  return out;
}
