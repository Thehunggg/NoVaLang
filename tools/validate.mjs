#!/usr/bin/env node
// Validator 9 invariant của pipeline /build-language. Không phụ thuộc npm ngoài.
// Chạy: node tools/validate.mjs   (từ gốc repo)
import { join, walk, readText, readJson, existsSync, repoRel, basename } from './lib/util.mjs';
import { extractFrontMatter } from './lib/frontmatter.mjs';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');
const errors = [];
const warnings = [];
const oks = [];
const E = (inv, m) => errors.push(`INV-${inv}: ${m}`);
const W = (inv, m) => warnings.push(`INV-${inv}: ${m}`);
const OK = (m) => oks.push(m);
const hadErr = (prefix) => errors.some((e) => e.startsWith(prefix));

if (!existsSync(RULES)) { console.error('rules/ không tồn tại'); process.exit(2); }

let allow = [];
const alPath = join(RULES, '_schema', 'narrative-allowlist.json');
if (existsSync(alPath)) { try { allow = readJson(alPath).narrative || []; } catch {} }

const FM = {
  status: ['DRAFT', 'REVIEW_CANDIDATE', 'PROVISIONAL', 'VALIDATED', 'FROZEN', 'DEFERRED'],
  tier: ['t1', 't3'],
  role: ['native', 'target', 'both'],
};

const files = walk(RULES, { skipDirs: ['corpus'] }).map((p) => ({ abs: p, rel: repoRel(p, ROOT) }));

// pre-0: JSON parse
for (const f of files) {
  if (f.rel.endsWith('.json')) {
    try { readJson(f.abs); } catch (e) { E(0, `JSON lỗi: ${f.rel} — ${e.message}`); }
  }
}
if (!hadErr('INV-0')) OK(`JSON: ${files.filter((f) => f.rel.endsWith('.json')).length} file parse được`);

const catalog = existsSync(join(RULES, 'catalog.json')) ? readJson(join(RULES, 'catalog.json')) : { languages: [] };
const codes = (catalog.languages || []).map((l) => l.code);

// INV-2: front-matter cho .md pipeline-managed dưới languages/** (narrative allowlist bỏ qua)
const PROCESS_FILES = ['README.md', 'pipeline-log.md', 'review-checklist.md'];
const isNarrative = (rel) =>
  PROCESS_FILES.includes(basename(rel)) ||
  basename(rel).startsWith('native-review') ||
  rel.includes('/_template/') ||
  allow.includes(rel);
const managedMd = files.filter(
  (f) => f.rel.endsWith('.md') && f.rel.startsWith('rules/languages/') && !isNarrative(f.rel),
);
const mdMeta = {};
for (const f of managedMd) {
  const fm = extractFrontMatter(readText(f.abs));
  if (!fm.has) { E(2, `thiếu front-matter: ${f.rel}`); continue; }
  const d = fm.data;
  for (const k of ['id', 'version', 'status', 'tier', 'role', 'enforced_by', 'depends_on', 'sources']) {
    if (!(k in d)) E(2, `thiếu khoá '${k}': ${f.rel}`);
  }
  if (d.version && !/^\d+\.\d+\.\d+$/.test(d.version)) E(2, `version không phải semver: ${f.rel}`);
  if (d.status && !FM.status.includes(d.status)) E(2, `status lạ '${d.status}': ${f.rel}`);
  if (Array.isArray(d.tier)) for (const t of d.tier) if (!FM.tier.includes(t)) E(2, `tier lạ '${t}': ${f.rel}`);
  if (Array.isArray(d.role)) for (const r of d.role) if (!FM.role.includes(r)) E(2, `role lạ '${r}': ${f.rel}`);
  if (d.enforced_by && d.enforced_by !== 'guidance-only' && !/\.rules\.json$/.test(d.enforced_by)) {
    E(2, `enforced_by phải là .rules.json hoặc 'guidance-only': ${f.rel}`);
  }
  if (fm.has) mdMeta[d.id] = { ...d, rel: f.rel };
}
if (!hadErr('INV-2')) OK(`INV-2 front-matter: ${managedMd.length} file .md pipeline hợp lệ (narrative bỏ qua)`);

// INV-1: languages/<lang>/** không tham chiếu ngôn ngữ khác (trừ language-profile.md)
for (const f of managedMd) {
  if (basename(f.rel) === 'language-profile.md') continue;
  const lang = f.rel.split('/')[2];
  const text = readText(f.abs);
  for (const c of codes) {
    if (c === lang) continue;
    if (text.includes(`rules/languages/${c}/`)) {
      E(1, `${f.rel} trỏ tới ngôn ngữ khác (${c}); bẫy dịch phải nằm ở rules/pairs/`);
    }
  }
}
if (!hadErr('INV-1')) OK('INV-1 cô lập ngôn ngữ: không phát hiện tham chiếu chéo trong file pipeline');

// INV-3: FROZEN => version>=1.0.0 và depends_on cũng FROZEN
// (D-49, 2026-07-18: Gate 5 — chờ 48h giữa VALIDATED và FROZEN — đã BỎ cho
// phạm vi build rule ngôn ngữ. Review thật đến từ native review + corpus
// check, không từ thời gian chờ. Không có kiểm 48h nào ở đây trước đây ngoài
// dòng thông báo dưới; sửa lại cho khớp chính sách hiện hành.)
for (const meta of Object.values(mdMeta)) {
  if (meta.status !== 'FROZEN') continue;
  if (!/^[1-9]\d*\.\d+\.\d+$/.test(meta.version || '')) E(3, `FROZEN cần version>=1.0.0: ${meta.rel}`);
  for (const dep of meta.depends_on || []) {
    const dm = mdMeta[dep];
    if (dm && dm.status !== 'FROZEN') E(3, `${meta.rel} FROZEN nhưng depends_on '${dep}' chưa FROZEN`);
  }
}

// INV-3 (mở rộng, Golden Lesson audit 2026-07-18, item 2 việc-kế-tiếp):
// mdMeta ở trên chỉ phủ file .md pipeline-managed — hiện KHÔNG có file nào
// (16 file ja FROZEN đều nằm trong narrative-allowlist, được miễn INV-2/3).
// Trạng thái FROZEN THẬT nằm ở *.rules.json (version/status) + catalog.json
// (ruleStatus) + coverage.json (_meta.stage/frozenAt) — layer trước đây
// KHÔNG được INV-3 kiểm. Bổ sung: (a) mọi *.rules.json dưới _base/ và
// _script/** cũng phải có version/status hợp lệ nếu tự nhận FROZEN; (b) mọi
// ngôn ngữ đang FROZEN (catalog ruleStatus bắt đầu bằng FROZEN, hoặc
// coverage._meta.stage chứa 'frozen') phải có coverage._meta.baseDependencies
// khớp với version HIỆN TẠI trên đĩa của từng _base/_script layer nó phụ
// thuộc — nếu lệch (ai đó sửa _base/_script mà không qua change control cho
// ngôn ngữ phụ thuộc) → CHẶN (lỗi), không tự hạ trạng thái ngôn ngữ.
const baseScriptJsonFiles = rulesFilesForInv3();
function rulesFilesForInv3() {
  return files.filter(
    (f) => f.rel.endsWith('.rules.json') && (f.rel.startsWith('rules/_base/') || f.rel.startsWith('rules/_script/')),
  );
}
const liveLayerVersions = {}; // id -> version (chỉ file có version/status hợp lệ)
for (const f of baseScriptJsonFiles) {
  let j;
  try { j = readJson(f.abs); } catch { continue; }
  if (!j.id) continue;
  if (j.status !== undefined || j.version !== undefined) {
    if (j.status && !FM.status.includes(j.status)) E(3, `status lạ '${j.status}': ${f.rel}`);
    if (j.status === 'FROZEN' && !/^[1-9]\d*\.\d+\.\d+$/.test(j.version || '')) {
      E(3, `${f.rel} status FROZEN nhưng version không phải semver >=1.0.0`);
    }
  }
  if (j.version) liveLayerVersions[j.id] = j.version;
}
for (const l of catalog.languages || []) {
  const frozenByCatalog = typeof l.ruleStatus === 'string' && l.ruleStatus.startsWith('FROZEN');
  const covPath = join(RULES, 'languages', l.code, 'coverage.json');
  if (!existsSync(covPath)) continue;
  const cov = readJson(covPath);
  const stage = cov._meta && cov._meta.stage;
  const frozenByCoverage = typeof stage === 'string' && stage.includes('frozen');
  if (!frozenByCatalog && !frozenByCoverage) continue;
  const pinned = (cov._meta && cov._meta.baseDependencies) || null;
  if (!pinned) {
    W(3, `${l.code} FROZEN nhưng coverage._meta.baseDependencies chưa có — không đối chiếu được version _base/_script`);
    continue;
  }
  for (const [id, pinnedVersion] of Object.entries(pinned)) {
    const liveVersion = liveLayerVersions[id];
    if (!liveVersion) { W(3, `${l.code}: lớp phụ thuộc '${id}' (pin ${pinnedVersion}) không còn tồn tại/không có version`); continue; }
    if (liveVersion !== pinnedVersion) {
      E(3, `${l.code} đang khai FROZEN nhưng lớp phụ thuộc '${id}' đã đổi version kể từ lúc freeze (pin ${pinnedVersion} -> hiện tại ${liveVersion}) — cần re-validate ngôn ngữ này trước khi coi FROZEN hợp lệ`);
    }
  }
}
if (!hadErr('INV-3')) OK('INV-3 FROZEN: hợp lệ (D-49: không còn yêu cầu chờ 48h; đã đối chiếu version _base/_script với bản chụp lúc freeze)');

// INV-4 + INV-5: *.rules.json có id + >=1 fixture pass và >=1 fail
const rulesFiles = files.filter((f) => f.rel.endsWith('.rules.json'));
for (const f of rulesFiles) {
  let j;
  try { j = readJson(f.abs); } catch { continue; }
  if (!j.id) E(4, `rules.json thiếu id: ${f.rel}`);
  const fx = [];
  if (j.fixtures) fx.push(j.fixtures);
  if (Array.isArray(j.checks)) for (const c of j.checks) if (c.fixtures) fx.push(c.fixtures);
  const pass = fx.reduce((n, x) => n + (Array.isArray(x.pass) ? x.pass.length : 0), 0);
  const fail = fx.reduce((n, x) => n + (Array.isArray(x.fail) ? x.fail.length : 0), 0);
  if (pass < 1) E(5, `thiếu fixture pass: ${f.rel}`);
  if (fail < 1) E(5, `thiếu fixture fail: ${f.rel}`);
}
if (!hadErr('INV-4') && !hadErr('INV-5')) OK(`INV-4/5 rules.json: ${rulesFiles.length} file có id + fixture pass/fail`);

// INV-6: file-set khớp template — BOOTSTRAP nếu _template chưa có manifest
if (!existsSync(join(RULES, '_template', 't1.files.json'))) {
  OK('INV-6 file-set: BOOTSTRAP (rules/_template/ chưa có manifest → bỏ qua đúng theo Phần G)');
} else {
  const t1 = readJson(join(RULES, '_template', 't1.files.json')).files || [];
  const t3 = existsSync(join(RULES, '_template', 't3.files.json')) ? (readJson(join(RULES, '_template', 't3.files.json')).files || []) : [];
  for (const l of catalog.languages || []) {
    if (l.ruleStatus === 'NOT_STARTED' || l.ruleStatus === 'EXISTS_FROZEN_NARRATIVE' || l.ruleStatus === 'DRAFT_STYLE_ONLY') continue;
    const req = (l.tier || []).includes('t1') ? t1 : t3;
    for (const fn of req) {
      if (!existsSync(join(RULES, 'languages', l.code, fn))) W(6, `${l.code} thiếu file template '${fn}'`);
    }
  }
}

// INV-7: T1 cần confidence>=medium cho lexicon & pronunciation ở rule_level
const rank = { none: 0, low: 1, medium: 2, high: 3 };
for (const l of catalog.languages || []) {
  const cov = join(RULES, 'languages', l.code, 'coverage.json');
  if (!existsSync(cov)) continue;
  if (!(l.tier || []).includes('t1')) continue;
  const c = readJson(cov);
  if (!(c._meta && c._meta.stage === 'validated')) continue; // INV-7 chỉ áp khi đề xuất VALIDATED; giữa pipeline thì bỏ qua
  for (const [pid, ph] of Object.entries(c)) {
    if (pid === '_meta') continue;
    if (/pronunciation|lexic|vocab/i.test(pid)) {
      const conf = ph.rule_level && ph.rule_level.confidence;
      if (conf && rank[conf] < rank.medium) {
        E(7, `${l.code} (t1) hiện tượng '${pid}' rule_level confidence=${conf} < medium`);
      }
    }
  }
}
if (!hadErr('INV-7')) OK('INV-7 T1 confidence: không có T1 nào vi phạm (chưa có coverage T1 hoàn chỉnh là bình thường ở scaffold)');

// INV-8: sources trong front-matter trỏ tới entry tồn tại
for (const f of managedMd) {
  const fm = extractFrontMatter(readText(f.abs));
  if (!fm.has) continue;
  const lang = f.rel.split('/')[2];
  const sp = join(RULES, 'languages', lang, 'sources.json');
  const known = existsSync(sp) ? new Set((readJson(sp).sources || []).map((s) => s.id)) : new Set();
  for (const s of fm.data.sources || []) if (!known.has(s)) E(8, `${f.rel} sources '${s}' không có trong sources.json`);
}
if (!hadErr('INV-8')) OK('INV-8 sources: mọi tham chiếu nguồn hợp lệ');

// INV-9: exercise-phenomena.map.json hợp lệ VÀ khớp coverage.json THẬT
// (Golden Lesson audit 2026-07-18, C6 + việc-kế-tiếp mục 3: trước đây chỉ
// đối chiếu tự tham chiếu với chính phenomenaVocabulary — không bao giờ
// phát hiện được register/naturalness/reading_aid/audio_playback... không
// khớp register_taxonomy/naturalness_translation/reading_aid_policy/
// tts_audio_policy... trong coverage.json thật. Nay dùng
// phenomenaVocabulary[name].coveragePhenomena (+ perLanguage override) để
// đối chiếu với coverage.json của từng ngôn ngữ có trong catalog.)
const mapPath = join(RULES, 'exercise-phenomena.map.json');
if (!existsSync(mapPath)) E(9, 'thiếu rules/exercise-phenomena.map.json');
else {
  const map = readJson(mapPath);
  const vocab = (map._meta && map._meta.phenomenaVocabulary) || {};
  const vocabIsObject = vocab && typeof vocab === 'object' && !Array.isArray(vocab);
  if (!vocabIsObject) {
    E(9, 'phenomenaVocabulary phải là object {tên: {coveragePhenomena, perLanguage?}}, không phải mảng phẳng (tự tham chiếu cũ)');
  }
  const coverageCache = {};
  const covOf = (lang) => {
    if (lang in coverageCache) return coverageCache[lang];
    const p = join(RULES, 'languages', lang, 'coverage.json');
    coverageCache[lang] = existsSync(p) ? readJson(p) : null;
    return coverageCache[lang];
  };
  const langsWithCoverage = (catalog.languages || []).map((l) => l.code).filter((c) => existsSync(join(RULES, 'languages', c, 'coverage.json')));

  for (const ex of map.exercises || []) {
    if (!ex.questionId || !ex.type) E(9, 'exercise thiếu questionId/type');
    for (const p of ex.requiredPhenomena || []) {
      const entry = vocabIsObject ? vocab[p] : undefined;
      if (!entry) { E(9, `${ex.questionId} dùng phenomenon '${p}' không có trong phenomenaVocabulary`); continue; }
      for (const lang of langsWithCoverage) {
        const effective = (entry.perLanguage && entry.perLanguage[lang]) || entry.coveragePhenomena;
        if (!effective) continue; // null = khái niệm curriculum hoặc không áp dụng cho ngôn ngữ này — không phải lỗi
        const cov = covOf(lang);
        if (!cov) continue;
        const covStage = cov._meta && cov._meta.stage;
        const isUsable = typeof covStage === 'string' && (covStage.includes('frozen') || covStage === 'validated');
        for (const rawId of effective) {
          const covId = rawId.replace('{lang}', lang);
          const ph = cov[covId];
          if (!ph) {
            W(9, `${ex.questionId} ('${p}') -> '${covId}' không có trong coverage.json của ${lang}`);
            continue;
          }
          const conf = ph.rule_level && ph.rule_level.confidence;
          if (conf === 'none') {
            const msg = `${ex.questionId} ('${p}') -> '${covId}' trong coverage.json của ${lang} có rule_level.confidence=none — không đủ căn cứ để generator sinh bài`;
            if (isUsable) E(9, msg); else W(9, msg);
          }
        }
      }
    }
  }
  if (!hadErr('INV-9')) OK(`INV-9 map: ${(map.exercises || []).length} bài, phenomena khớp coverage.json thật của ${langsWithCoverage.length} ngôn ngữ`);
}

// Extra: catalog
if (catalog.languages) {
  const n = catalog.languages.length;
  const target = (catalog._meta && catalog._meta.targetCount) || 60;
  if (n !== target) W('CATALOG', `catalog có ${n} ngôn ngữ, target ${target}`);
  else OK(`catalog: ${n} ngôn ngữ (khớp target ${target})`);
  const seen = new Set();
  for (const l of catalog.languages) { if (seen.has(l.code)) E('CATALOG', `code trùng: ${l.code}`); seen.add(l.code); }
}

// Report
console.log('\n=== NovaLang rules validator (9 invariants) ===');
for (const o of oks) console.log('  OK  ' + o);
if (warnings.length) { console.log('\n-- Cảnh báo (không chặn) --'); for (const w of warnings) console.log('   !  ' + w); }
if (errors.length) {
  console.log('\n-- LỖI --');
  for (const e of errors) console.log('   X  ' + e);
  console.log(`\n${errors.length} lỗi → FAIL`);
  process.exit(1);
}
console.log(`\nPASS (${warnings.length} cảnh báo)`);
