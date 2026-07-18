// Registry cho check kiểu "custom" trong *.rules.json (assert.type === 'custom').
// Regex đơn giản không đủ diễn tả một số luật (vd "câu baseline phải kết
// bằng です/ます, TRỪ các cụm chào cố định") — impl JS đầy đủ nằm ở đây, khớp
// theo `check.id` trong rules.json. Check không có impl ở đây → lesson-check.mjs
// báo SKIPPED (không tự PASS/FAIL im lặng).
//
// Mỗi impl: (lesson, targetStrings, check, config, fixtureItem?) => { violations: [...] }
// - lesson: object lesson JSON thật (null ở self-test/fixture mode).
// - targetStrings: [{path, text}] — chuỗi target-language đã trích (rỗng/1 phần
//   tử giả ở self-test cho check hoạt động theo string).
// - check: chính object check trong rules.json (có .assert, .fixtures...).
// - config: config của FILE rules.json chứa check này (vd _base/distractor.config).
// - fixtureItem: item fixture gốc (string hoặc object) — dùng cho check hoạt
//   động theo cấu trúc (không theo từng chuỗi), xem distractor-length-ratio.

const TERMINAL_PUNCT = /[。！？]$/;

// です/ます-family kết câu baseline, cho phép trợ từ cuối câu tuỳ chọn
// (か/よ/ね/わ) chen giữa dạng chia và dấu câu kết — vd 「どうしましたか。」
// 「近いですよ。」「頑張ってくださいね。」
const BASELINE_ENDING = /(です|ます|でした|ました|ません|ましょう|ください)(か|よ|ね|わ)?[。！？]?$/;

function lastClause(text) {
  // Chuỗi ghép nhiều câu (vd "こんばんは。はい、どうしましたか。") chỉ cần
  // MỆNH ĐỀ CUỐI đúng — tách theo dấu kết câu, lấy đoạn sau dấu kết câu áp
  // chót (bỏ chuỗi rỗng cuối cùng nếu chuỗi kết bằng dấu câu).
  const parts = text.split(/(?<=[。！？])/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : text;
}

function baselinePoliteSentenceEndsDesuMasu(_lesson, targetStrings, check) {
  const a = check.assert || {};
  const fixed = a.fixedExpressions || [];
  const violations = [];
  for (const { path, text } of targetStrings) {
    if (a.sentenceOnly && !TERMINAL_PUNCT.test(text.trim())) continue; // không phải câu hoàn chỉnh — bỏ qua (nhãn/từ vựng rời)
    const clause = lastClause(text.trim());
    const bare = clause.replace(TERMINAL_PUNCT, '');
    if (fixed.some((fx) => bare.endsWith(fx))) continue; // cụm chào cố định — miễn trừ
    if (BASELINE_ENDING.test(clause)) continue; // です/ます-family đúng chuẩn
    violations.push({ path, text, detail: `mệnh đề cuối '${clause}' không phải です/ます-family và không phải cụm chào cố định` });
  }
  return { violations };
}

// ---- distractor-length-ratio (G-01/A1) ----

function optText(o) { return (o && (o.text || o.label)) || ''; }

function ratioOf(a, b) {
  const la = [...a].length; // đếm theo code point, không theo UTF-16 code unit
  const lb = [...b].length;
  if (la === 0 || lb === 0) return Infinity;
  return Math.max(la, lb) / Math.min(la, lb);
}

function distractorRatioViolation(answer, distractor, maxRatio, curated) {
  if (curated) return null;
  const r = ratioOf(answer, distractor);
  if (r > maxRatio) return `ratio ${r.toFixed(2)} > ${maxRatio} và không phải nội dung curated (length_ratio_exempt_if_curated)`;
  return null;
}

function collectLeafStrings(obj, path, excludePrefix) {
  const out = new Set();
  const walk = (o, p) => {
    if (o == null) return;
    if (typeof o === 'string') { if (!p.startsWith(excludePrefix)) out.add(o); return; }
    if (Array.isArray(o)) { o.forEach((v, i) => walk(v, `${p}[${i}]`)); return; }
    if (typeof o === 'object') { for (const [k, v] of Object.entries(o)) walk(v, `${p}.${k}`); }
  };
  walk(obj, path);
  return out;
}

function distractorLengthRatio(lesson, _targetStrings, check, config, fixtureItem) {
  const maxRatio = (config && config.length_ratio_max) || 1.5;
  const exemptCfg = (config && config.length_ratio_exempt_if_curated) || {};
  const violations = [];

  if (!lesson) {
    // self-test / fixture mode: fixtureItem cấu trúc {kind:'distractor_ratio', answer, distractor, curated_elsewhere}
    if (fixtureItem && fixtureItem.kind === 'distractor_ratio') {
      const detail = distractorRatioViolation(fixtureItem.answer, fixtureItem.distractor, maxRatio, fixtureItem.curated_elsewhere);
      if (detail) violations.push({ path: '$.fixture', text: fixtureItem.distractor, detail });
    }
    return { violations };
  }

  const excludedPrefix = '$.' + (exemptCfg.excluded_subtree || 'fiveCardContent.practice');
  const curatedSet = exemptCfg.value ? collectLeafStrings(lesson, '$', excludedPrefix) : null;
  const exercises = (lesson.fiveCardContent && lesson.fiveCardContent.practice && lesson.fiveCardContent.practice.exercises) || [];
  for (const ex of exercises) {
    if (!Array.isArray(ex.options) || !ex.correctOptionId) continue;
    const answerOpt = ex.options.find((o) => o.id === ex.correctOptionId);
    if (!answerOpt) continue;
    const answerText = optText(answerOpt);
    for (const opt of ex.options) {
      if (opt.id === ex.correctOptionId) continue;
      const distText = optText(opt);
      const curated = Boolean(curatedSet) && curatedSet.has(distText) && curatedSet.has(answerText);
      const detail = distractorRatioViolation(answerText, distText, maxRatio, curated);
      if (detail) violations.push({ path: `$.fiveCardContent.practice.exercises[id=${ex.id}].options[id=${opt.id}]`, text: distText, detail });
    }
  }
  return { violations };
}

export const CUSTOM_CHECKS = {
  'baseline-polite-sentence-ends-desu-masu': baselinePoliteSentenceEndsDesuMasu,
  'distractor-length-ratio': distractorLengthRatio,
};
