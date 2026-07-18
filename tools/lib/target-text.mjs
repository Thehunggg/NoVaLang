// Trích các chuỗi target-language thật từ một object JSON (lesson đã generate),
// dùng cho tools/lesson-check.mjs. Tách riêng khỏi lesson-check.mjs để tái
// dùng được cho các tool khác sau này (đúng tinh thần "importer/derive/corpus/
// validate phải tái dùng được" của /build-language Phần G.3).
//
// Đã kiểm chứng trên Golden Lesson ja-daily_life-m01-u1-l1: heuristic
// script-range cho Jpan trích đúng 1215 chuỗi, 0 false positive (không lẫn
// text hỗ trợ vi/en nào lọt vào vì chúng không chứa ký tự kana/kanji).

const SCRIPT_RANGES = {
  // Hiragana + Katakana + CJK Unified Ideographs — đủ cho nội dung học tiếng
  // Nhật hiện có (không cần phân biệt kanji cổ/hiếm ở tầng này).
  Jpan: /[぀-ヿ一-鿿]/,
};

// Latn (và các writing system khác chưa có script-range riêng): không thể
// phân biệt target-language vs native-language chỉ bằng ký tự (cùng bảng chữ
// Latin). Dùng danh sách tên trường đã biết là target-language trong product
// schema (xem rules/_base/field-naming-crosswalk.md cột B) làm fallback.
const TARGET_FIELD_NAMES = new Set([
  'displayText', 'reading', 'romanization', 'speechText', 'targetText',
  'canonicalText', 'audioText', 'surfaceText', 'ttsText',
]);

function fieldNameOf(path) {
  const m = path.match(/\.([A-Za-z0-9_]+)(\[\d+\])?$/);
  return m ? m[1] : null;
}

/**
 * @param {*} obj cây JSON cần quét
 * @param {string} writingSystem 'Jpan' | 'Latn' | ...
 * @returns {{path: string, text: string}[]}
 */
export function extractTargetStrings(obj, writingSystem) {
  const out = [];
  const scriptRe = SCRIPT_RANGES[writingSystem];
  const walk = (o, path) => {
    if (o == null) return;
    if (typeof o === 'string') {
      if (scriptRe) {
        if (scriptRe.test(o)) out.push({ path, text: o });
      } else if (TARGET_FIELD_NAMES.has(fieldNameOf(path))) {
        out.push({ path, text: o });
      }
      return;
    }
    if (Array.isArray(o)) { o.forEach((v, i) => walk(v, `${path}[${i}]`)); return; }
    if (typeof o === 'object') { for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`); }
  };
  walk(obj, '$');
  return out;
}

export function hasScriptHeuristic(writingSystem) {
  return Boolean(SCRIPT_RANGES[writingSystem]);
}
