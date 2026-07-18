// Registry cho check kiểu "custom" trong *.rules.json (assert.type === 'custom').
// Regex đơn giản không đủ diễn tả một số luật (vd "câu baseline phải kết
// bằng です/ます, TRỪ các cụm chào cố định") — impl JS đầy đủ nằm ở đây, khớp
// theo `check.id` trong rules.json. Check không có impl ở đây → lesson-check.mjs
// báo SKIPPED (không tự PASS/FAIL im lặng).
//
// Mỗi impl: (lesson, targetStrings, check) => { violations: [{path, detail}] }
// targetStrings: [{path, text}] — danh sách chuỗi target-language đã trích.

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

export const CUSTOM_CHECKS = {
  'baseline-polite-sentence-ends-desu-masu': baselinePoliteSentenceEndsDesuMasu,
};
