// Registry cho check kiểu "custom" trong *.rules.json (assert.type === 'custom').
// Regex đơn giản không đủ diễn tả một số luật (vd "câu baseline phải kết
// bằng です/ます, TRỪ các cụm chào cố định") — impl JS đầy đủ nằm ở đây, khớp
// theo `check.id` trong rules.json. Check không có impl ở đây → lesson-check.mjs
// báo SKIPPED (không tự PASS/FAIL im lặng).
//
// Mỗi impl: (lesson, targetStrings, check) => { violations: [{path, detail}] }

export const CUSTOM_CHECKS = {};
