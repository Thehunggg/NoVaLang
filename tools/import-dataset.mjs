#!/usr/bin/env node
// Importer dataset (tái sử dụng cho mọi ngôn ngữ). Sinh *.data.json + cập nhật sources.json.
// Chạy ở Bước 1. Mọi rule sinh từ đây: derived_by=dataset, confidence=high (không vào review).
//
//   node tools/import-dataset.mjs cldr <lang> [--locale <cldrLocale>]
//   node tools/import-dataset.mjs ud   <lang> --url <conllu-url>
//   node tools/import-dataset.mjs wikipron <lang> --url <tsv-url>
//   node tools/import-dataset.mjs lexicon <lang> --url <json-url> --name <out.data.json> [--kind] [--source-id]
//
// CLDR chạy được ngay với URL mặc định. UD/Wikipron cần --url của treebank/tsv cụ thể
// (đường dẫn khác nhau theo ngôn ngữ) — ghi vào sources.json để tái lập.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fetchCached } from './lib/fetch-cache.mjs';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');
const argv = process.argv.slice(2);
const cmd = argv[0];
const lang = argv[1];
const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : null; };
const optAll = (name) => argv.flatMap((a, i) => (a === name ? [argv[i + 1]] : []));

if (!cmd || !lang) {
  console.error('usage: node tools/import-dataset.mjs <cldr|ud|wikipron> <lang> [opts]');
  process.exit(2);
}

const langDir = join(RULES, 'languages', lang);
mkdirSync(langDir, { recursive: true });

function writeData(name, obj) {
  const p = join(langDir, name);
  writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
  console.log(`  wrote ${p}`);
}

function upsertSource(entry) {
  const p = join(langDir, 'sources.json');
  const doc = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : { sources: [] };
  const i = doc.sources.findIndex((s) => s.id === entry.id);
  if (i >= 0) doc.sources[i] = entry; else doc.sources.push(entry);
  writeFileSync(p, JSON.stringify(doc, null, 2) + '\n');
  console.log(`  source ${entry.id} -> sources.json`);
}

const today = new Date().toISOString().slice(0, 10);

async function cldr() {
  const locale = opt('--locale') || lang;
  const url = `https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-misc-full/main/${locale}/characters.json`;
  const doc = await fetchCached(url, `cldr/${locale}-characters.json`, { json: true });
  const chars = doc?.main?.[locale]?.characters || {};
  writeData('orthography.data.json', {
    id: `${lang}/orthography.data`,
    kind: 'charset',
    source: 'CLDR',
    derived_by: 'dataset',
    confidence: 'high',
    data: {
      exemplarCharacters: chars.exemplarCharacters ?? null,
      auxiliary: chars.auxiliary ?? null,
      punctuation: chars.punctuation ?? null,
      numbers: chars.numbers ?? null,
      index: chars.index ?? null,
    },
  });
  upsertSource({ id: 'CLDR', name: `Unicode CLDR exemplar characters (${locale})`, url, consulted: today, derived_by: 'dataset', confidence: 'high', license: 'Unicode-3.0' });
}

async function ud() {
  const url = opt('--url');
  if (!url) { console.error('ud cần --url <conllu-url>'); process.exit(2); }
  const text = await fetchCached(url, `ud/${lang}.conllu`);
  const upos = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const cols = line.split('\t');
    if (cols.length < 5) continue;
    const tag = cols[3];
    if (tag && tag !== '_') upos[tag] = (upos[tag] || 0) + 1;
  }
  writeData('word-class.data.json', {
    id: `${lang}/word-class.data`,
    kind: 'word_class',
    source: 'UD',
    derived_by: 'dataset',
    confidence: 'high',
    data: { uposCounts: upos, uposTags: Object.keys(upos).sort() },
  });
  upsertSource({ id: 'UD', name: 'Universal Dependencies treebank', url, consulted: today, derived_by: 'dataset', confidence: 'high', license: 'CC BY-SA (per treebank)' });
}

async function wikipron() {
  // Nhiều --url cho ngôn ngữ đa hệ chữ (ja: hira/kata/hani...). Nhãn hệ chữ lấy
  // từ tên file (vd jpn_hira_narrow_filtered.tsv -> jpn_hira_narrow_filtered).
  const urls = optAll('--url');
  if (!urls.length) { console.error('wikipron cần ≥1 --url <tsv-url>'); process.exit(2); }
  const byScript = {};
  let total = 0;
  for (const url of urls) {
    const label = (url.split('/').pop() || 'main').replace(/\.tsv$/, '');
    const text = await fetchCached(url, `wikipron/${lang}-${label}.tsv`);
    const pairs = [];
    for (const line of text.split(/\r?\n/)) {
      if (!line) continue;
      const [word, ipa] = line.split('\t');
      if (word && ipa) pairs.push([word, ipa]);
    }
    byScript[label] = { count: pairs.length, sample: pairs.slice(0, 50), url };
    total += pairs.length;
  }
  writeData('grapheme-to-phoneme.data.json', {
    id: `${lang}/grapheme-to-phoneme.data`,
    kind: 'grapheme_to_phoneme',
    source: 'WIKIPRON',
    derived_by: 'dataset',
    confidence: 'high',
    data: { count: total, byScript },
  });
  upsertSource({ id: 'WIKIPRON', name: 'WikiPron grapheme-to-phoneme', url: urls.join(' '), consulted: today, derived_by: 'dataset', confidence: 'high', license: 'Apache-2.0' });
}

async function lexicon() {
  // Import bảng từ vựng đóng (closed-class wordlist) máy đọc được nhưng KHÔNG
  // phải chuẩn cộng đồng như CLDR/UD (vd package của 1 tác giả) — ghi
  // confidence:medium (không phải high), cần cross-check Bước 2 như dataset đơn nguồn.
  //   node tools/import-dataset.mjs lexicon <lang> --url <json-url> --name <out.data.json> --kind <label> --source-id <ID>
  const url = opt('--url');
  const outName = opt('--name');
  const kind = opt('--kind') || 'lexicon';
  const sourceId = opt('--source-id') || 'LEXICON';
  if (!url || !outName) { console.error('lexicon cần --url <json-url> --name <out.data.json> [--kind] [--source-id]'); process.exit(2); }
  const text = await fetchCached(url, `lexicon/${lang}-${outName}`);
  const data = JSON.parse(text);
  writeData(outName, {
    id: `${lang}/${outName.replace(/\.data\.json$/, '')}`,
    kind,
    source: sourceId,
    derived_by: 'dataset',
    confidence: 'medium',
    data: { count: Array.isArray(data) ? data.length : Object.keys(data).length, entries: data },
  });
  upsertSource({ id: sourceId, name: `Lexicon: ${outName} (đơn tác giả, không phải chuẩn cộng đồng)`, url, consulted: today, derived_by: 'dataset', confidence: 'medium', license: 'xem repo nguồn' });
}

const runner = { cldr, ud, wikipron, lexicon }[cmd];
if (!runner) { console.error(`lệnh lạ: ${cmd}`); process.exit(2); }
runner().then(() => console.log('done')).catch((e) => { console.error('LỖI:', e.message); process.exit(1); });
