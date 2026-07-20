// soft-linguistic-checks.mjs — lớp kiểm CẢNH BÁO MỀM dùng chung giữa
// tools/lesson-check.mjs (1 bài) và scripts/validate-curriculum.mjs (toàn bộ).
// Chỉ 2 check đã hiệu chỉnh sau khi chạy thật 506 bài (2026-07-18, xem
// rules/_legacy/golden-lesson-test-2026-07-18.md): text-fields + register.
// Không bao gồm check 2 (_base/distractor) — provenance suy tại chỗ luôn là
// owner_approved cho nội dung literal (quyết định owner), nên check đó luôn
// miễn, không sinh cảnh báo nào; bỏ hẳn ra khỏi lớp mềm cho gọn.
//
// KHÔNG BAO GIỜ throw/exit — chỉ trả về mảng warning string. Người gọi
// (validate-curriculum.mjs) chịu trách nhiệm không cho các warning này ảnh
// hưởng tới pass/fail của chính nó.
import { join, readJson, existsSync, walk } from './util.mjs';

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

function writingSystemFor(rulesRoot, code) {
  const cat = join(rulesRoot, 'catalog.json');
  if (!existsSync(cat)) return null;
  const e = (readJson(cat).languages || []).find((l) => l.code === code);
  return e ? e.writingSystem : null;
}

/**
 * Chạy check text-fields + register (cảnh báo mềm) lên toàn bộ `lessons`.
 * @param {Array} lessons - mảng lesson JSON thật (đã load sẵn, không đọc lại file).
 * @param {string} rulesRoot - đường dẫn tuyệt đối tới thư mục rules/.
 * @returns {string[]} mảng warning, mỗi phần tử đã có tiền tố "<lessonId>: ".
 */
export function runSoftLinguisticChecks(lessons, rulesRoot) {
  const warnings = [];
  const baseLayer = loadLayer(join(rulesRoot, '_base'));
  const langLayerCache = {};
  const scriptLayerCache = {};
  const langOf = (id) => id.split('-')[0];

  const tf = baseLayer['_base/text-fields'];
  const latnScript = loadLayer(join(rulesRoot, '_script', 'Latn'))['_script/Latn/script'];

  for (const lesson of lessons) {
    const lang = langOf(lesson.id);
    if (!(lang in scriptLayerCache)) {
      const ws = writingSystemFor(rulesRoot, lang);
      scriptLayerCache[lang] = { ws, cfg: ws === 'Latn' ? latnScript : null };
    }
    if (!(lang in langLayerCache)) {
      langLayerCache[lang] = loadLayer(join(rulesRoot, 'languages', lang));
    }

    // --- Check 1: text-fields (reading/romanization cho vocabulary từ-đơn) ---
    if (tf) {
      const { cfg } = scriptLayerCache[lang];
      const readingAidsApplicable = cfg && cfg.config && cfg.config.reading_aids
        ? cfg.config.reading_aids.applicable !== false
        : true;
      for (const v of lesson.vocabulary || []) {
        const isDialogueExample = 'targetText' in v;
        const checkReadingAids = lang !== 'en' && readingAidsApplicable && !isDialogueExample;
        if (checkReadingAids) {
          if (v.reading === undefined) warnings.push(`${lesson.id}: vocabulary[${v.id}] thiếu 'reading' (đọc bản ngữ) — rules/ text-fields`);
          if (v.romanization === undefined) warnings.push(`${lesson.id}: vocabulary[${v.id}] thiếu 'romanization' (La-tinh hoá) — rules/ text-fields`);
        }
      }
    }

    // --- Check 3 (chỉ ja): baseline-polite-sentence-ends-desu-masu ---
    if (lang === 'ja') {
      const prag = langLayerCache[lang]['ja/pragmatics.rules'];
      const check = prag && Array.isArray(prag.checks) && prag.checks.find((c) => c.id === 'baseline-polite-sentence-ends-desu-masu');
      if (check) {
        const exemptions = [...new Set(check.fixed_expression_exemptions || [])];
        const endersSource = check.enders_regex_source || '(です|ます|でした|ました|ません|ましょう)(か)?(ね|よ)?|ください|は';
        const enders = new RegExp(`(${endersSource})[。！？]?$`);
        const skipSingle = check.skip_single_character !== false;
        // v1.3.0 (owner-approved, rules/decisions.md D-92): the register check
        // validates SENTENCES. A vocab card's main headword (v.displayText) is a
        // lexical dictionary entry — a word/phrase, not a sentence — so it is
        // exempt when the rule sets skip_vocabulary_card_headword. This is the
        // only field the soft layer feeds this check (dialogue was already
        // excluded per G-04, no machine-readable register field), so the check
        // emits no headword false-positives once the flag is on.
        const skipVocabHeadword = check.skip_vocabulary_card_headword === true;
        if (!skipVocabHeadword) {
          for (const v of lesson.vocabulary || []) {
            if (!v.displayText) continue;
            const t = v.displayText;
            const stripped = t.replace(/^[～\s]+/, '').replace(/[。！？]+$/, '');
            if (skipSingle && [...stripped].length <= 1) continue;
            if (exemptions.some((ex) => stripped.endsWith(ex))) continue;
            if (!enders.test(t)) {
              warnings.push(`${lesson.id}: vocabulary[${v.id}] '${t}' không kết bằng です/ます-family/ください/は？ và không trong fixed_expression_exemptions — rules/ ja register (baseline-polite-sentence-ends-desu-masu)`);
            }
          }
        }
      }
    }
  }

  return warnings;
}
