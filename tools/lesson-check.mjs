#!/usr/bin/env node
// lesson-check.mjs — chạy MỘT SỐ rule máy-đọc-được thật (rules/_base + rules/languages/<lang>)
// lên MỘT lesson JSON cụ thể, đọc trực tiếp từ shared/**. Đây là công cụ được yêu cầu ở C6
// ("chưa có tool nào chạy rule lên 1 file lesson JSON cụ thể, chỉ có fixture rời rạc") —
// Golden Lesson audit 2026-07-18, việc-kế-tiếp mục 5.
//
// KHÔNG sửa/ghi file lesson (chỉ đọc, read-only) — không đụng shared/, lib/.
// Không phụ thuộc npm ngoài (không có POS tagger thật) nên same_word_class (A2)
// KHÔNG tự kiểm được — báo rõ "not automatically checkable", không giả vờ kiểm được.
//
//   node tools/lesson-check.mjs --lang ja --lesson-id ja-daily_life-m01-u1-l1 \
//     [--file shared/generated/lessons.json] [--assume-provenance auto_generated|hand_authored|owner_approved]
import { join, readJson, existsSync, walk } from './lib/util.mjs';
import { isAbsolute } from 'node:path';

const ROOT = process.cwd();
const RULES = join(ROOT, 'rules');

const argv = process.argv.slice(2);
let lang = null, lessonId = null, file = 'shared/generated/lessons.json', assumeProvenance = 'auto_generated';
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--lang') lang = argv[++i];
  else if (a === '--lesson-id') lessonId = argv[++i];
  else if (a === '--file') file = argv[++i];
  else if (a === '--assume-provenance') assumeProvenance = argv[++i];
}
if (!lang || !lessonId) {
  console.error('usage: node tools/lesson-check.mjs --lang <code> --lesson-id <id> [--file <path>] [--assume-provenance auto_generated|hand_authored|owner_approved]');
  process.exit(2);
}
if (!['auto_generated', 'hand_authored', 'owner_approved'].includes(assumeProvenance)) {
  console.error(`--assume-provenance lạ: ${assumeProvenance}`);
  process.exit(2);
}

// --- load config thật (giống tools/resolve.mjs, không cache/bake) ---
function loadLayer(dir) {
  const map = {};
  if (!existsSync(dir)) return map;
  for (const p of walk(dir).filter((f) => f.endsWith('.rules.json'))) {
    let j;
    try { j = readJson(p); } catch { continue; }
    if (j && j.id) map[j.id] = j;
  }
  return map;
}
function writingSystemFor(code) {
  const cat = join(RULES, 'catalog.json');
  if (!existsSync(cat)) return null;
  const e = (readJson(cat).languages || []).find((l) => l.code === code);
  return e ? e.writingSystem : null;
}
const ws = writingSystemFor(lang);
const baseLayer = loadLayer(join(RULES, '_base'));
const scriptLayer = ws ? loadLayer(join(RULES, '_script', ws)) : {};
const langLayer = loadLayer(join(RULES, 'languages', lang));

// --- load lesson JSON that (chi doc) ---
const filePath = isAbsolute(file) ? file : join(ROOT, file);
if (!existsSync(filePath)) { console.error(`không tìm thấy: ${file}`); process.exit(2); }
const raw = readJson(filePath);
const lessons = Array.isArray(raw) ? raw : raw.lessons || [];
const lesson = lessons.find((l) => l.id === lessonId);
if (!lesson) { console.error(`không tìm thấy lesson id='${lessonId}' trong ${file}`); process.exit(2); }

const findings = { errors: [], warnings: [], info: [] };
const E = (m) => findings.errors.push(m);
const W = (m) => findings.warnings.push(m);
const I = (m) => findings.info.push(m);

console.log(`=== lesson-check: ${lessonId} (lang=${lang}, writingSystem=${ws || '(unknown)'}, giả định provenance=${assumeProvenance}) ===`);

// --- Check 1: _base/text-fields (fieldNameMapping)
// Sửa 2026-07-18 sau khi chạy thật 506 bài (rules/_legacy/golden-lesson-test-2026-07-18.md):
// reading/romanization CHỈ áp cho vocabulary là từ/cụm-từ HEADWORD (flashcard) —
// KHÔNG áp khi item có field 'targetText' (dấu hiệu cấu trúc: đây là câu hội thoại mẫu,
// không phải headword — vd en-daily_life). Và CHỈ áp khi lớp script của ngôn ngữ này
// thật sự cần reading-aid (_script/<ws>.config.reading_aids.applicable !== false) —
// owner quyết định 2026-07-18: en bỏ qua hoàn toàn (D-40's field 'pronunciation' là
// gap khác, ghi nợ riêng, KHÔNG map vào reading/romanization). ---
const tf = baseLayer['_base/text-fields'];
if (tf) {
  I(`_base/text-fields v${tf.version || '?'}: đối chiếu vocabulary[] theo fieldNameMapping (displayText/reading/romanization/speechText)`);
  const scriptCfg = scriptLayer[`_script/${ws}/script`];
  const readingAidsApplicable = scriptCfg && scriptCfg.config && scriptCfg.config.reading_aids
    ? scriptCfg.config.reading_aids.applicable !== false
    : true; // mặc định true khi không có layer script khai báo gì (vd Jpan — ja luôn cần)
  const readingAidsSkipReason = !readingAidsApplicable
    ? `_script/${ws}/script.config.reading_aids.applicable=false`
    : null;
  if (lang === 'en') {
    I("Owner quyết định 2026-07-18: bỏ qua reading/romanization cho en hoàn toàn ở check này — D-40 (FROZEN) nói en cần IPA nhưng field đúng là 'pronunciation' (ADR-015), không phải reading/romanization; 0/506 bài có field 'pronunciation' — ghi nợ riêng, không map vào đây.");
  } else if (readingAidsSkipReason) {
    I(`Bỏ qua reading/romanization cho ${lang}: ${readingAidsSkipReason}`);
  }
  for (const v of lesson.vocabulary || []) {
    if (!v.displayText) E(`vocabulary[${v.id}]: thiếu displayText`);
    const isDialogueExample = 'targetText' in v;
    const checkReadingAids = lang !== 'en' && readingAidsApplicable && !isDialogueExample;
    if (checkReadingAids) {
      if (v.reading === undefined) W(`vocabulary[${v.id}]: thiếu 'reading' (đọc bản ngữ) — xem C7/B2`);
      if (v.romanization === undefined) W(`vocabulary[${v.id}]: thiếu 'romanization' (La-tinh hoá) — xem C7/B1`);
    } else if (isDialogueExample && (v.reading === undefined || v.romanization === undefined)) {
      I(`vocabulary[${v.id}]: bỏ qua reading/romanization — có 'targetText' (câu hội thoại mẫu, không phải headword từ-đơn)`);
    }
    if (v.speechText === undefined) W(`vocabulary[${v.id}]: thiếu 'speechText' (TTS) — xem C7 (audioText/speechText)`);
  }
  const exercises = (lesson.fiveCardContent && lesson.fiveCardContent.practice && lesson.fiveCardContent.practice.exercises) || [];
  for (const ex of exercises) {
    for (const opt of ex.options || []) {
      if (opt.text === undefined) E(`${ex.id || ex.order}: option[${opt.id}] thiếu 'text' (UI hiển thị)`);
      if (opt.canonicalText === undefined) W(`${ex.id || ex.order}: option[${opt.id}] thiếu 'canonicalText' (máy chấm)`);
      if (opt.audioText === undefined) W(`${ex.id || ex.order}: option[${opt.id}] thiếu 'audioText' (TTS)`);
    }
  }
} else {
  W('_base/text-fields không có trong layer đã merge — bỏ qua check 1');
}

// --- Check 2: _base/distractor — length_ratio_max (G-01, provenance-scoped); same_word_class KHÔNG tự kiểm được ---
const dr = baseLayer['_base/distractor'];
if (dr) {
  const cfg = dr.config || {};
  const scoped = new Set(cfg.provenanceScopedKeys || []);
  const exempt = (cfg.provenanceExemptValues || []).includes(assumeProvenance);
  I(`_base/distractor v${dr.version || '?'}: length_ratio_max=${cfg.length_ratio_max} áp dụng=${scoped.has('length_ratio_max') && !exempt} (provenance giả định='${assumeProvenance}')`);
  I(`_base/distractor: same_word_class KHÔNG tự kiểm được ở tool này (cần POS tagger thật, không có npm dep) — xem A2 để đánh giá thủ công.`);
  const exercises = (lesson.fiveCardContent && lesson.fiveCardContent.practice && lesson.fiveCardContent.practice.exercises) || [];
  for (const ex of exercises) {
    const opts = ex.options || [];
    const correct = opts.find((o) => o.id === ex.correctOptionId);
    if (!correct || !opts.length) continue;
    const answerLen = [...(correct.canonicalText || correct.text || '')].length;
    if (!answerLen) continue;
    for (const opt of opts) {
      if (opt.id === ex.correctOptionId) continue;
      const dLen = [...(opt.canonicalText || opt.text || '')].length;
      const ratio = Math.max(dLen, answerLen) / Math.min(dLen, answerLen);
      const max = cfg.length_ratio_max;
      if (scoped.has('length_ratio_max') && !exempt && max && ratio > max) {
        E(`${ex.id || ex.order}: distractor '${opt.id}' length_ratio=${ratio.toFixed(2)} > ${max} (answer='${correct.text}', distractor='${opt.text}') — vi phạm length_ratio_max (provenance='${assumeProvenance}', KHÔNG miễn)`);
      } else if (max && ratio > max) {
        I(`${ex.id || ex.order}: distractor '${opt.id}' length_ratio=${ratio.toFixed(2)} > ${max} nhưng MIỄN vì provenance='${assumeProvenance}' (G-01)`);
      }
    }
  }
} else {
  W('_base/distractor không có trong layer đã merge — bỏ qua check 2');
}

// --- Check 3 (chỉ ja): baseline-polite-sentence-ends-desu-masu, có fixed_expression_exemptions (A3)
// Sửa 2026-07-18 sau khi chạy thật 506 bài (rules/_legacy/golden-lesson-test-2026-07-18.md):
// enders_regex mở rộng (ですか/ましたか/ね/よ), thêm lớp ください + N+は？, exemption khớp
// endsWith thay vì nguyên văn, bỏ qua chuỗi 1 ký tự (bảng chữ cái). ---
if (lang === 'ja') {
  const prag = langLayer['ja/pragmatics.rules'];
  const check = prag && Array.isArray(prag.checks) && prag.checks.find((c) => c.id === 'baseline-polite-sentence-ends-desu-masu');
  if (check) {
    const exemptions = [...new Set(check.fixed_expression_exemptions || [])];
    I(`ja/pragmatics check '${check.id}': fixed_expression_exemptions=[${exemptions.join(', ')}] (endsWith, A3)`);
    I("G-04 (C3): KHÔNG áp check này lên lesson.dialogueGroups — chưa có trường register máy-đọc-được để phân biệt nhóm hội thoại casual có chủ ý.");
    const endersSource = check.enders_regex_source || '(です|ます|でした|ました|ません|ましょう)(か)?(ね|よ)?|ください|は';
    const enders = new RegExp(`(${endersSource})[。！？]?$`);
    const skipSingle = check.skip_single_character !== false;
    // v1.3.0 (owner-approved, rules/decisions.md D-92): a vocab card headword is
    // a lexical entry, not a sentence — exempt from the register check when the
    // rule sets skip_vocabulary_card_headword. With dialogue already excluded
    // (G-04), the check then has no headword input to false-positive on.
    const skipVocabHeadword = check.skip_vocabulary_card_headword === true;
    const texts = [];
    if (skipVocabHeadword) {
      I("v1.3.0 (D-92): KHÔNG áp check register lên headword vocab card (mục từ điển, không phải câu) — MỌI headword vocab tự động miễn.");
    } else {
      for (const v of lesson.vocabulary || []) if (v.displayText) texts.push({ src: `vocabulary[${v.id}]`, text: v.displayText });
    }
    for (const t of texts) {
      const stripped = t.text.replace(/^[～\s]+/, '').replace(/[。！？]+$/, '');
      if (skipSingle && [...stripped].length <= 1) { I(`${t.src}: '${t.text}' — bỏ qua (skip_single_character)`); continue; }
      if (exemptions.some((ex) => stripped.endsWith(ex))) { I(`${t.src}: '${t.text}' — MIỄN (fixed_expression_exemptions endsWith, A3)`); continue; }
      if (!enders.test(t.text)) W(`${t.src}: '${t.text}' — không kết bằng です/ます-family/ください/は？ và không trong fixed_expression_exemptions (baseline-polite-sentence-ends-desu-masu)`);
    }
  } else {
    W("ja/pragmatics.rules không có check 'baseline-polite-sentence-ends-desu-masu' — bỏ qua check 3");
  }
}

console.log(`\n-- INFO (${findings.info.length}) --`);
for (const m of findings.info) console.log('   i  ' + m);
console.log(`\n-- CẢNH BÁO (${findings.warnings.length}) --`);
for (const m of findings.warnings) console.log('   !  ' + m);
console.log(`\n-- LỖI (${findings.errors.length}) --`);
for (const m of findings.errors) console.log('   X  ' + m);
console.log(`\n${findings.errors.length} lỗi, ${findings.warnings.length} cảnh báo.`);
process.exit(findings.errors.length ? 1 : 0);
