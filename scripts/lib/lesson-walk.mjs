// WALK CHUNG cho cây dữ liệu lesson — MỘT bản duy nhất.
//
// Trước 2026-07-30, verify-provenance.mjs và check-render-coverage.mjs mỗi
// script tự viết một hàm walk-cây-JSON riêng để bóc chuỗi (collectDisplayedJapanese
// và collectFields) — cùng việc, hai bản. Phá thật 2026-07-30 lộ ra một lỗ
// khác cần vá bằng cách WALK PATH thật (xem verify-provenance.mjs), và thay vì
// viết thêm một bộ walk thứ ba, gộp về đây — dùng chung cho cả bóc-theo-tên-
// trường (check-render-coverage) lẫn bóc-theo-path-để-tra-cứu (verify-provenance).
//
// QUY ƯỚC PATH — khớp NGUYÊN VĂN với path đã ghi trong các file provenance
// hiện có (vd "fiveCardContent.dialogueGroups[0].lines[0].targetText",
// "vocabulary[0].displayText"): tên trường nối bằng ".", chỉ số mảng bằng
// "[n]" ngay sau tên. Không đổi quy ước này — provenance file đang tồn tại
// dùng đúng format này, đổi format là hỏng mọi item đã khai.

/**
 * Walk `root`, trả về mọi trường KIỂU CHUỖI dưới dạng {path, key, value}.
 * `path` theo đúng quy ước ở trên. `prefix` là tiền tố ghép vào đầu (dùng khi
 * gọi trên một nhánh con, vd `lesson.fiveCardContent` với prefix
 * "fiveCardContent").
 *
 * @param {unknown} root
 * @param {string} [prefix]
 * @returns {Array<{path: string, key: string, value: string}>}
 */
export function walkLessonStrings(root, prefix = "") {
  const out = [];
  const walk = (node, p) => {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${p}[${i}]`));
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      const here = p ? `${p}.${key}` : key;
      if (typeof value === "string") out.push({ path: here, key, value });
      else walk(value, here);
    }
  };
  walk(root, prefix);
  return out;
}

/**
 * Walk `root`, trả về MỌI NODE (object/phần tử mảng) dưới dạng {path, node}
 * — kể cả root. Dùng khi cần xét CẢ node (vd "node này có `reading`/
 * `audioText` không") thay vì chỉ bóc chuỗi lá, như R12d (furigana ↔ dòng
 * đọc): mỗi node tự có "dòng đọc của chính nó" trong `reading`/`audioText`,
 * áp cho các trường chuỗi NGAY TRONG node đó.
 *
 * @param {unknown} root
 * @param {string} [prefix]
 * @returns {Array<{path: string, node: object}>}
 */
export function walkNodes(root, prefix = "") {
  const out = [];
  const walk = (node, p) => {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${p}[${i}]`));
    if (!node || typeof node !== "object") return;
    out.push({ path: p, node });
    for (const [key, value] of Object.entries(node)) {
      if (typeof value !== "string") walk(value, p ? `${p}.${key}` : key);
    }
  };
  walk(root, prefix);
  return out;
}

/**
 * Bản đồ path → giá trị THẬT cho MỘT lesson — dùng để tra cứu `item.path`
 * của một provenance item và so với `item.targetText`.
 *
 * Đi đúng HAI gốc mà provenance file đang dùng (đo được, không suy diễn):
 * `fiveCardContent` (tiền tố "fiveCardContent") và `vocabulary` (tiền tố
 * rỗng, ra path "vocabulary[n]..."). Path nào không thuộc hai gốc này thì
 * bản đồ không có — tra sẽ ra `undefined`, đúng ý "path không tồn tại".
 *
 * @param {object} lesson
 * @returns {Map<string, string>}
 */
export function buildLessonPathIndex(lesson) {
  const map = new Map();
  for (const { path, value } of walkLessonStrings(lesson.fiveCardContent, "fiveCardContent")) {
    map.set(path, value);
  }
  for (const { path, value } of walkLessonStrings({ vocabulary: lesson.vocabulary }, "")) {
    map.set(path, value);
  }
  return map;
}

/**
 * Bản đồ path → giá trị THẬT cho bài tổng hợp cuối Unit (`Unit.comprehensiveTest`,
 * courses.json) — cùng việc với buildLessonPathIndex nhưng KHÔNG có gốc
 * fiveCardContent/vocabulary: comprehensiveTest không chia hai nhánh đó, nên
 * walk THẲNG cả object, path sinh ra khớp nguyên văn đường dẫn thật trong
 * courses.json (vd "questions[0].blanks[0].displayAnswer").
 *
 * @param {object} comprehensiveTest
 * @returns {Map<string, string>}
 */
export function buildUnitPathIndex(comprehensiveTest) {
  const map = new Map();
  for (const { path, value } of walkLessonStrings(comprehensiveTest, "")) {
    map.set(path, value);
  }
  return map;
}
